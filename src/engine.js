/**
 * src/engine.js — overlay behaviour fragment (concatenated into client.js by
 * scripts/build.mjs; runs inside the module factory scope, so `React`, `h` and
 * `ART` (from src/art.js) are already defined).
 *
 * Responsibilities:
 *  - mount one frame-wide, click-through stage in the shell.overlay slot;
 *  - swim the whale through the conversation column's empty space with a small
 *    steering simulation, fleeing text and the composer;
 *  - translate chat/task state into pose classes (idle, thinking, writing,
 *    tool, waiting, done, error, sleeping, splash, poke);
 *  - emit short-lived water/confetti/spark particles for the mischief moments.
 *
 * Everything is imperative DOM + one rAF loop: React only mounts the host.
 */

const NAMESPACE = 'dsh-pixel-whale-pet'
const PET_SIZE = 96
const PET_HALF_X = 44
const PET_HALF_Y = 36

const IDLE_SPEED = 13
const ACTIVE_SPEED = 88
const FLEE_SPEED = 240
const TARGET_REACHED = 26
const TARGET_MAX_MS = 9000
const IDLE_SLEEP_MS = 90000
const IDLE_DROWSY_MS = 25000
const OBSTACLE_MARGIN = 10
const AVOID_RADIUS = 104

/* ---------------------------------------------------------------- utilities */

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)
const rand = (lo, hi) => lo + Math.random() * (hi - lo)
const dist2 = (ax, ay, bx, by) => {
  const dx = ax - bx
  const dy = ay - by
  return dx * dx + dy * dy
}
const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())
const el = (tag, cls) => {
  const node = document.createElement(tag)
  if (cls) node.className = cls
  return node
}

/** Structural styles the engine owns; ART.css supplies the artwork itself. */
const ENGINE_CSS = String.raw`
.dsh-whale-root{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:30}
.dsh-whale-stage{position:absolute;inset:0;pointer-events:none}
.dsh-whale{position:absolute;left:0;top:0;width:${PET_SIZE}px;height:${PET_SIZE}px;pointer-events:none;will-change:transform;transform:translate3d(-999px,-999px,0)}
.dsh-whale-flip{width:100%;height:100%;transform:scaleX(1);transition:transform .32s cubic-bezier(.16,1,.3,1)}
.dsh-whale.is-fast .dsh-whale-flip{transition-duration:.09s}
.dsh-whale-art{width:100%;height:100%;user-select:none;-webkit-user-select:none}
.dsh-whale-art svg{display:block;width:100%;height:100%;overflow:visible;pointer-events:auto;cursor:pointer}
.dsh-whale-hit{position:absolute;left:13px;top:22px;width:70px;height:50px;border-radius:50%;background:transparent;pointer-events:auto;cursor:grab}
.dsh-whale-fx{position:absolute;inset:0;pointer-events:none;overflow:visible}
@media (prefers-reduced-motion:reduce){.dsh-whale-flip{transition:none}}
`

/* ------------------------------------------------------- conversation facts */

/**
 * The rect the whale is allowed to swim in: the conversation body. `null`
 * means the visible surface is not a chat (settings, other panels), so the
 * whale stays hidden instead of roaming over unrelated controls.
 */
function measureArea() {
  const candidates = ['[data-conversation-content]', '[data-slot="main.conversation"]']
  for (let i = 0; i < candidates.length; i++) {
    const node = document.querySelector(candidates[i])
    if (!node) continue
    const r = node.getBoundingClientRect()
    if (r.width > 180 && r.height > 180) {
      return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }
    }
  }
  return null
}

function rectObstacle(r) {
  return { left: r.left, top: r.top, right: r.right, bottom: r.bottom }
}

/**
 * Text and chrome the whale should not cover, measured as line boxes. The
 * indexed path only measures text parents the IntersectionObserver reports
 * as visible (fast); the full walk is the fallback when that index is not
 * ready yet.
 */
function collectObstacles(area, index) {
  const list = []
  const composer = document.querySelector('[data-composer-seat]')
  if (composer) {
    const r = composer.getBoundingClientRect()
    if (r.width > 20 && r.height > 20) list.push(rectObstacle(r))
  }
  const root = document.querySelector('[data-conversation-content]')
  if (!root) return list

  if (index && index.visible.size > 0) {
    const range = document.createRange()
    for (const parent of index.visible) {
      const nodes = index.byParent.get(parent)
      if (!nodes) continue
      for (let k = 0; k < nodes.length; k++) {
        const text = nodes[k].nodeValue
        if (!text || !text.trim()) continue
        range.setStart(nodes[k], 0)
        range.setEnd(nodes[k], text.length)
        const rects = range.getClientRects()
        for (let i = 0; i < rects.length; i++) {
          const r = rects[i]
          if (r.width < 3 || r.height < 3) continue
          if (r.bottom < area.top || r.top > area.bottom) continue
          list.push({ left: r.left, top: r.top, right: r.right, bottom: r.bottom })
        }
      }
    }
    return list
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null)
  const parentRects = new Map()
  const range = document.createRange()
  let node
  let guard = 0
  while ((node = walker.nextNode()) && guard < 4000) {
    guard++
    const text = node.nodeValue
    if (!text || !text.trim()) continue
    const parent = node.parentElement
    if (!parent || parent.closest('.dsh-whale-root')) continue
    let pr = parentRects.get(parent)
    if (!pr) {
      pr = parent.getBoundingClientRect()
      parentRects.set(parent, pr)
    }
    // Cheap viewport reject before paying for a Range.
    if (pr.bottom < area.top - 32 || pr.top > area.bottom + 32) continue
    range.setStart(node, 0)
    range.setEnd(node, text.length)
    const rects = range.getClientRects()
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i]
      if (r.width < 3 || r.height < 3) continue
      if (r.bottom < area.top || r.top > area.bottom) continue
      list.push({ left: r.left, top: r.top, right: r.right, bottom: r.bottom })
    }
  }
  return list
}

/** true when the pet box intersects an obstacle inflated by `pad`. */
function blocked(cx, cy, list, pad) {
  const left = cx - PET_HALF_X
  const right = cx + PET_HALF_X
  const top = cy - PET_HALF_Y
  const bottom = cy + PET_HALF_Y
  for (let i = 0; i < list.length; i++) {
    const o = list[i]
    if (right + pad < o.left || left - pad > o.right || bottom + pad < o.top || top - pad > o.bottom) continue
    return true
  }
  return false
}

/* ---------------------------------------------------------- session monitor */

/**
 * Derives the chat working stage and the todo list of one Session from the
 * Client-side Session binding: the event window (durable + live chunks), the
 * `todos` projection, and the Session status face. Everything degrades to a
 * neutral state when an API is unavailable, so the whale never breaks the page.
 *
 * Returns { setSessionId(id), setStatuses(map), dispose() } and emits
 * { stage, running, pending, todos, todosDone, todosTotal, endKind, endSeq }.
 */
function createMonitor(ctx, onUpdate) {
  const THROTTLE = 100
  let service = null
  let binding = null
  let sessionId = null
  let unsubList = null
  let unsubEvents = null
  let unsubTodos = null
  let unsubSession = null
  let unsubStatus = null
  let statusMap = null
  let hasUiStatus = false
  let fiber = null
  let timer = null
  let disposed = false
  let lastSig = ''
  let st = fresh()

  const uiSession = () => {
    try {
      return ctx.get ? ctx.get('uiSession') : undefined
    } catch {
      return undefined
    }
  }
  const safeRead = (fn, fallback) => {
    try {
      const value = fn()
      return value === undefined || value === null ? fallback : value
    } catch {
      return fallback
    }
  }
  function fresh() {
    return {
      turnOpen: null,
      tools: new Map(),
      asked: new Set(),
      live: null,
      endKind: null,
      endSeq: -1,
      seenEnd: -1,
    }
  }

  /* ---- event window -> folded stage facts ---- */

  function rebaseline() {
    st = fresh()
    const win = safeRead(() => binding.eventSource.getSnapshot(), null)
    const entries = win && win.entries ? win.entries : []
    for (let i = 0; i < entries.length; i++) apply(entries[i])
    st.seenEnd = st.endSeq
    schedule(true)
  }

  function onWindow() {
    if (!binding || disposed) return
    const win = safeRead(() => binding.eventSource.getSnapshot(), null)
    const change = win && win.change
    if (!change || change.kind === 'replace') {
      rebaseline()
      return
    }
    if (change.kind === 'append') {
      const entries = change.entries || []
      for (let i = 0; i < entries.length; i++) apply(entries[i])
      schedule(false)
      return
    }
    if (change.kind === 'settle-assistant') {
      st.live = null
      if (change.entry) apply(change.entry)
      schedule(false)
    }
    /* prepend: older history, the tail state is unchanged */
  }

  function apply(entry) {
    if (!entry || !entry.event) return
    const ev = entry.event
    if (entry.type === 'transient') {
      st.live = ev
      return
    }
    st.live = null
    const d = ev.data || {}
    switch (ev.type) {
      case 'turn/start':
        st.turnOpen = d.turn
        st.tools.clear()
        break
      case 'turn/end':
        st.turnOpen = null
        st.tools.clear()
        st.asked.clear()
        st.endKind = d.reason ? d.reason.kind : null
        st.endSeq = ev.seq
        break
      case 'tool/call':
        st.tools.set(d.callId, d.name)
        break
      case 'tool/result':
        st.tools.delete(d.message ? d.message.toolCallId : d.callId)
        break
      case 'approval/asked':
        st.asked.add(d.id)
        break
      case 'approval/decided':
        st.asked.delete(d.id)
        break
      default:
        break
    }
  }

  function liveStage(ev) {
    const chunk = ev && ev.data ? ev.data.chunk : null
    if (!chunk) return 'thinking'
    if (chunk.type === 'text-delta') return chunk.text && chunk.text.trim() ? 'writing' : 'thinking'
    if (chunk.type === 'reasoning-delta') return 'thinking'
    if (chunk.type === 'tool-call-delta') return 'tool'
    if (chunk.type === 'block-start') {
      return chunk.blockType === 'text' ? 'writing' : chunk.blockType === 'tool-call' ? 'tool' : 'thinking'
    }
    if (chunk.type === 'block-end') {
      return chunk.block && chunk.block.type === 'tool-call' ? 'tool' : 'thinking'
    }
    return 'thinking'
  }

  function derive() {
    const sess = binding ? safeRead(() => binding.session.getSnapshot(), null) : null
    const status = statusMap && sessionId ? statusMap.get(sessionId) : null
    const running = status && status.running !== undefined ? !!status.running : !!(sess && sess.running)
    let pending = !!(status && status.pendingInteraction) || st.asked.size > 0
    if (!pending) {
      for (const name of st.tools.values()) {
        if (name === 'ask_user_question') {
          pending = true
          break
        }
      }
    }
    let stage = 'idle'
    if (pending) stage = 'waiting'
    else if (running && st.live) stage = liveStage(st.live)
    else if (running && st.tools.size > 0) {
      let commandTool = false
      for (const name of st.tools.values()) {
        if (/bash|shell|terminal|pwsh|run|exec|command/i.test(String(name || ''))) {
          commandTool = true
          break
        }
      }
      stage = commandTool ? 'writing' : 'tool'
    } else if (running) stage = 'thinking'

    let freshEnd = false
    if (st.endSeq > st.seenEnd) {
      st.seenEnd = st.endSeq
      freshEnd = true
      stage =
        st.endKind === 'completed'
          ? 'done'
          : st.endKind === 'error' || st.endKind === 'max-tokens'
            ? 'error'
            : st.endKind === 'blocked'
              ? 'waiting'
              : 'idle'
    }

    const rawTodos = binding ? safeRead(() => binding.session.projections.faceOf('todos').getSnapshot(), []) : []
    const todos = Array.isArray(rawTodos) ? rawTodos : []
    return {
      stage: stage,
      running: running,
      pending: pending,
      todos: todos,
      todosDone: todos.filter((item) => item && item.status === 'completed').length,
      todosTotal: todos.length,
      endKind: freshEnd ? st.endKind : null,
      endSeq: freshEnd ? st.endSeq : null,
    }
  }

  /* ---- throttled emit ---- */

  function schedule(force) {
    if (disposed || timer !== null) return
    timer = setTimeout(flush, force ? 0 : THROTTLE)
  }
  function flush() {
    timer = null
    if (disposed || !binding) return
    const out = derive()
    const sig = [out.stage, out.running, out.pending, out.todosDone, out.todosTotal, out.endSeq].join('|')
    if (sig === lastSig) return
    lastSig = sig
    onUpdate(out)
  }

  /* ---- binding lifecycle ---- */

  function unbind() {
    if (unsubEvents) {
      unsubEvents()
      unsubEvents = null
    }
    if (unsubTodos) {
      unsubTodos()
      unsubTodos = null
    }
    if (unsubSession) {
      unsubSession()
      unsubSession = null
    }
    binding = null
  }

  function bind() {
    unbind()
    if (disposed || !service || !sessionId) return
    const next = safeRead(() => service.binding(sessionId), undefined)
    if (!next) {
      lastSig = ''
      return
    }
    binding = next
    unsubEvents = binding.eventSource.subscribe(onWindow)
    unsubTodos = binding.session.projections.faceOf('todos').subscribe(() => schedule(false))
    unsubSession = binding.session.subscribe(() => schedule(true))
    rebaseline()
  }

  /* ---- start: follow the sessions service without polling ---- */

  if (typeof ctx.inject === 'function') {
    fiber = ctx.inject(['sessions'], (scope) => {
      service = safeRead(() => scope.get('sessions'), null)
      if (!service || !service.list) return undefined
      unsubList = service.list.subscribe(() => {
        if (!binding || binding.sessionId !== sessionId) bind()
        else schedule(false)
      })
      bind()
      return () => {
        unbind()
        if (unsubList) {
          unsubList()
          unsubList = null
        }
        service = null
      }
    })
  }

  const ui = uiSession()
  if (ui && ui.sessionStatus && ui.sessionStatus.subscribe) {
    hasUiStatus = true
    statusMap = ui.sessionStatus.getSnapshot()
    unsubStatus = ui.sessionStatus.subscribe(() => {
      statusMap = ui.sessionStatus.getSnapshot()
      schedule(true)
    })
  }

  return {
    setSessionId(id) {
      if (id === sessionId) return
      sessionId = id || null
      st = fresh()
      lastSig = ''
      unbind()
      bind()
      schedule(true)
    },
    setStatuses(map) {
      // The session face is the primary source; root props are the guaranteed
      // fallback when the plugin cannot reach `uiSession`.
      if (!hasUiStatus && map) statusMap = map
      schedule(true)
    },
    refreshBinding() {
      if (!binding) bind()
    },
    dispose() {
      disposed = true
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
      if (unsubStatus) {
        unsubStatus()
        unsubStatus = null
      }
      unbind()
      if (fiber) {
        const pendingFiber = fiber
        fiber = null
        if (pendingFiber.dispose) {
          // Cordis versions differ: dispose may return a promise or nothing.
          const result = pendingFiber.dispose()
          if (result && typeof result.catch === 'function') result.catch(() => {})
        }
      }
    },
  }
}

/* ---------------------------------------------------------- whale engine */

/**
 * @param host - the React-owned root div inside shell.overlay.
 * @param ctx - plugin context (for the optional sessions service).
 */
function createWhaleEngine(host, ctx) {
  const stageEl = el('div', 'dsh-whale-stage')
  const whaleEl = el('div', 'dsh-whale is-idle')
  whaleEl.setAttribute('aria-hidden', 'true')
  whaleEl.innerHTML =
    '<div class="dsh-whale-flip"><div class="dsh-whale-art">' +
    ART.svg +
    '</div></div><div class="dsh-whale-hit"></div><div class="dsh-whale-fx"></div>' +
    '<div class="dsh-whale-tasks" hidden></div>'
  stageEl.appendChild(whaleEl)
  host.appendChild(stageEl)

  const flipEl = whaleEl.firstChild
  const hitEl = whaleEl.querySelector('.dsh-whale-hit')
  const fxEl = whaleEl.querySelector('.dsh-whale-fx')
  const tasksEl = whaleEl.querySelector('.dsh-whale-tasks')

  let disposed = false
  let rafId = 0
  let lastFrame = 0
  let area = measureArea()
  let obstacles = []
  let obstacleTimer = null
  let obstacleDirty = true
  /** Text-parent index: IntersectionObserver tracks which parents are visible. */
  const obstacleIndex = { visible: new Set(), byParent: new Map() }
  let obstacleObserver = null
  let indexTimer = null
  let indexReady = false
  let mutationObserver = null
  let resizeObserver = null
  let areaTimer = null
  let reduced =
    typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)').matches : false
  let visible = typeof document !== 'undefined' ? document.visibilityState !== 'hidden' : true
  let sessionId = null

  // Physics state. (x, y) is the pet box's top-left corner.
  const pet = {
    x: (area ? area.left + area.width * 0.5 : 0),
    y: (area ? area.top + area.height * 0.4 : 0),
    vx: 0,
    vy: 0,
    tx: (area ? area.left + area.width * 0.6 : 0),
    ty: (area ? area.top + area.height * 0.5 : 0),
    targetAt: now() + TARGET_MAX_MS,
    facing: 1,
    dragging: false,
    dragOffX: 0,
    dragOffY: 0,
    flipHoldMs: 0,
    lastFlipAt: 0,
  }
  const pointer = { x: -9999, y: -9999, inside: false }

  let currentStage = 'idle'
  let isFast = false
  let tempStage = null
  let tempUntil = 0
  let lastActiveAt = now()
  let lastMischiefAt = now() + rand(9000, 16000)
  let lastMusicAt = now() + rand(28000, 65000)
  let mischiefCount = 0
  let lastWallBump = 0
  let previousEndSeq = null
  let sparkTimer = 0
  let glowTimer = 0
  let todos = { done: 0, total: 0 }

  // Keep continuity across HMR/reloads: a re-created engine resumes where the
  // whale was, instead of popping up in a new random place.
  const POS_KEY = 'dsh-pixel-whale-pet:pos'
  try {
    const saved = window.sessionStorage && window.sessionStorage.getItem(POS_KEY)
    if (saved) {
      const pos = JSON.parse(saved)
      if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) {
        const bx = area ? clamp(pos.x, area.left + 4, area.right - PET_SIZE - 4) : pos.x
        const by = area ? clamp(pos.y, area.top + 4, area.bottom - PET_SIZE - 4) : pos.y
        pet.x = bx
        pet.y = by
        pet.tx = bx
        pet.ty = by
        if (pos.facing === -1) pet.facing = -1
      }
    }
  } catch {}
  let posSavedAt = 0

  const monitor = createMonitor(ctx, onMonitorUpdate)

  /* ------------------------------------------------------------- rendering */

  function setStage(next) {
    if (next === currentStage) return
    const previous = currentStage
    currentStage = next
    whaleEl.className = 'dsh-whale is-' + next + (isFast ? ' is-fast' : '') + (now() < wakeGlowUntil ? ' is-wake' : '')
    if (next === 'thinking' || next === 'writing' || next === 'tool' ||
        next === 'waiting' || next === 'done' || next === 'error' ||
        next === 'drag' || next === 'poke') lastActiveAt = now()
    if (next === 'done' && previous !== 'done') {
      spawnBurst('spark', 9)
      spawnBurst('bubble', 4)
    } else if (next === 'waiting') {
      spawnBurst('drop', 2)
    } else if (next === 'error') {
      spawnBurst('drop', 3)
    } else if (next === 'sleeping') {
      spawnZ()
    } else if (next === 'music') {
      spawnBurst('note', 3)
    }
  }

  function baseStage() {
    if (pet.dragging) return 'drag'
    if (tempStage && now() < tempUntil) return tempStage
    if (tempStage && now() >= tempUntil) tempStage = null
    if (monitorState.pending) return 'waiting'
    if (monitorState.running) {
      if (monitorState.stage === 'writing') return 'writing'
      if (monitorState.stage === 'tool') return 'tool'
      return 'thinking'
    }
    const idleMs = now() - lastActiveAt
    if (idleMs > IDLE_SLEEP_MS) return 'sleeping'
    if (idleMs > IDLE_DROWSY_MS) return 'drowsy'
    return 'idle'
  }

  function refreshStage() {
    setStage(baseStage())
  }

  function triggerTemp(name, ms) {
    tempStage = name
    tempUntil = now() + ms
    setStage(name)
    if (name === 'done' || name === 'error' || name === 'poke' || name === 'waiting') {
      lastActiveAt = now()
    }
  }

  /* -------------------------------------------------------------- particles */

  function spawnParticle(kind, options) {
    if (disposed || reduced) return
    if (fxEl.childElementCount > 24) return
    const node = el('span', 'dsh-whale-' + kind)
    const originX = (options && options.x) || PET_SIZE * 0.5
    const originY = (options && options.y) || PET_SIZE * 0.28
    node.style.left = originX + 'px'
    node.style.top = originY + 'px'
    node.style.animationDelay = ((options && options.delay) || 0) + 'ms'
    const life = (options && options.life) || 1400
    node.addEventListener('animationend', () => node.remove(), { once: true })
    setTimeout(() => {
      if (node.isConnected) node.remove()
    }, life + 200)
    fxEl.appendChild(node)
  }

  function spawnBurst(kind, count) {
    const n = Math.max(1, Math.round(count * (reduced ? 0 : 1)))
    for (let i = 0; i < n; i++) {
      spawnParticle(kind, {
        dx: rand(-22, 26),
        dy: kind === 'drop' ? rand(-36, -12) : rand(-48, -22),
        scale: rand(0.55, 1.25),
        delay: rand(0, 160),
        life: kind === 'spark' ? 900 : 1500,
      })
    }
  }

  function spawnZ() {
    if (disposed || reduced) return
    for (let i = 0; i < 2; i++) {
      spawnParticle('z', { dx: rand(8, 26), dy: rand(-38, -20), scale: rand(0.7, 1.1), delay: i * 260, life: 2100 })
    }
  }

  function spawnSpout() {
    if (disposed) return
    // One authored mischief beat: a water column plus droplets and bubbles.
    for (let i = 0; i < 7; i++) {
      spawnParticle('drop', {
        x: PET_SIZE * 0.46,
        y: PET_SIZE * 0.18,
        dx: rand(-20, 22),
        dy: rand(-62, -30),
        scale: rand(0.6, 1.3),
        delay: rand(0, 220),
        life: 1200,
      })
    }
    for (let i = 0; i < 4; i++) {
      spawnParticle('bubble', {
        x: PET_SIZE * 0.5,
        y: PET_SIZE * 0.24,
        dx: rand(-26, 26),
        dy: rand(-58, -28),
        scale: rand(0.5, 1.1),
        delay: rand(120, 420),
        life: 1600,
      })
    }
  }

  /* ---------------------------------------------------------------- tasks */

  function renderTasks() {
    const total = todos.total
    if (!total) {
      tasksEl.hidden = true
      tasksEl.textContent = ''
      return
    }
    const shown = Math.min(total, 8)
    if (tasksEl.childElementCount !== shown || tasksEl.hidden) {
      tasksEl.textContent = ''
      for (let i = 0; i < shown; i++) tasksEl.appendChild(el('i'))
      tasksEl.hidden = false
    }
    const donePips = Math.round((Math.min(todos.done, total) / total) * shown)
    const pips = tasksEl.children
    for (let i = 0; i < pips.length; i++) {
      pips[i].className = i < donePips ? 'is-done' : ''
    }
  }

  /* ---------------------------------------------------------------- monitor */

  const monitorState = {
    running: false,
    pending: false,
    stage: 'idle',
  }

  function onMonitorUpdate(state) {
    const wasRunning = monitorState.running
    const previousTodos = todos
    monitorState.running = state.running
    monitorState.pending = state.pending
    monitorState.stage = state.stage
    todos = { done: state.todosDone, total: state.todosTotal }
    renderTasks()
    if (state.running) lastActiveAt = now()
    // A finished turn earns one authored celebration; failures get a slump.
    if (state.endSeq !== null && state.endSeq !== previousEndSeq) {
      previousEndSeq = state.endSeq
      if (state.endKind === 'error' || state.endKind === 'max-tokens') triggerTemp('error', 3200)
      else if (state.endKind === 'completed') {
        triggerTemp('done', 3600)
        spawnBurst('spark', 12)
      }
    }
    // Every completed todo earns a small sparkle, all done earns a burst.
    if (todos.total > 0 && todos.done > previousTodos.done) {
      if (todos.done === todos.total) spawnBurst('spark', 8)
      else spawnBurst('spark', 3)
    }
    if (wasRunning && !state.running) refreshStage()
    refreshStage()
  }

  /* ------------------------------------------------------------------- text */

  let lastTextSignature = ''

  function refreshObstacles() {
    if (disposed) return
    if (!area) {
      obstacles = []
      obstacleDirty = false
      return
    }
    obstacles = collectObstacles(area, indexReady ? obstacleIndex : null)
    obstacleDirty = false
  }

  /** Rebuild the text-parent index and let the observer keep it current. */
  function rebuildObstacleIndex() {
    if (disposed) return
    const root = document.querySelector('[data-conversation-content]')
    if (!root) {
      obstacleIndex.visible.clear()
      obstacleIndex.byParent.clear()
      indexReady = false
      return
    }
    const byParent = new Map()
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null)
    let node
    let guard = 0
    while ((node = walker.nextNode()) && guard < 6000) {
      guard++
      if (!node.nodeValue || !node.nodeValue.trim()) continue
      const parent = node.parentElement
      if (!parent || parent.closest('.dsh-whale-root')) continue
      const bucket = byParent.get(parent)
      if (bucket) bucket.push(node)
      else byParent.set(parent, [node])
    }
    obstacleIndex.byParent = byParent
    if (typeof IntersectionObserver !== 'function') {
      indexReady = false
      return
    }
    if (!obstacleObserver) {
      obstacleObserver = new IntersectionObserver(
        (entries) => {
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i]
            if (entry.isIntersecting) obstacleIndex.visible.add(entry.target)
            else obstacleIndex.visible.delete(entry.target)
          }
          scheduleObstacles(0)
        },
        { rootMargin: '420px 0px 420px 0px' },
      )
    }
    for (const parent of obstacleIndex.visible) {
      if (!byParent.has(parent)) {
        obstacleObserver.unobserve(parent)
        obstacleIndex.visible.delete(parent)
      }
    }
    for (const parent of byParent.keys()) obstacleObserver.observe(parent)
    indexReady = true
  }

  function scheduleIndex() {
    if (indexTimer !== null) return
    indexTimer = setTimeout(() => {
      indexTimer = null
      if (!visible) return
      rebuildObstacleIndex()
      scheduleObstacles(0)
    }, 420)
  }

  function scheduleObstacles(delay) {
    obstacleDirty = true
    if (obstacleTimer !== null) return
    obstacleTimer = setTimeout(() => {
      obstacleTimer = null
      if (!visible) return
      refreshObstacles()
    }, delay === undefined ? 160 : delay)
  }

  function scheduleArea() {
    if (areaTimer !== null) return
    areaTimer = setTimeout(() => {
      areaTimer = null
      const next = measureArea()
      stageEl.hidden = next === null
      if (next === null) {
        area = null
        return
      }
      const changed = !area || next.left !== area.left || next.top !== area.top || next.width !== area.width || next.height !== area.height
      area = next
      if (changed) {
        clampIntoTargets()
        refreshObstacles()
      }
      scheduleObstacles(0)
    }, 180)
  }

  function clampIntoTargets() {
    if (!area) return
    pet.tx = clamp(pet.tx, area.left + 12, area.right - 12)
    pet.ty = clamp(pet.ty, area.top + 12, area.bottom - 12)
  }

  /* -------------------------------------------------------------- movement */

  function pickTarget() {
    const minX = area.left + PET_HALF_X + 6
    const maxX = area.right - PET_HALF_X - 6
    const minY = area.top + PET_HALF_Y + 6
    const maxY = area.bottom - PET_HALF_Y - 6
    if (maxX <= minX || maxY <= minY) {
      pet.tx = clamp(pet.x, area.left, area.right)
      pet.ty = clamp(pet.y, area.top, area.bottom)
      pet.targetAt = now() + TARGET_MAX_MS
      return
    }
    for (let attempt = 0; attempt < 26; attempt++) {
      const tx = rand(minX, maxX)
      const ty = rand(minY, maxY)
      if (!blocked(tx, ty, obstacles, OBSTACLE_MARGIN)) {
        pet.tx = tx
        pet.ty = ty
        pet.targetAt = now() + TARGET_MAX_MS
        return
      }
    }
    pet.tx = rand(minX, maxX)
    pet.ty = rand(minY, maxY)
    pet.targetAt = now() + TARGET_MAX_MS
  }

  /**
   * One step of a small steering simulation: seek a clear target, then let
   * text/composer obstacles push the whale out with a soft exponential field.
   */
  /** Nearest pocket where the whole pet box fits without touching text. */
  function findClearSpot(cx, cy) {
    // Text forms horizontal bands, so try a vertical exit first: up, down,
    // then diagonals, then the remaining directions.
    const angleOf = [270, 90, 240, 120, 300, 60, 210, 150, 330, 30, 180, 0]
    for (let radius = 70; radius <= 620; radius += 34) {
      for (let step = 0; step < angleOf.length; step++) {
        const angle = (angleOf[step] / 180) * Math.PI
        const tx = cx + Math.cos(angle) * radius
        const ty = cy + Math.sin(angle) * radius
        if (tx < area.left + PET_HALF_X + 6 || tx > area.right - PET_HALF_X - 6) continue
        if (ty < area.top + PET_HALF_Y + 6 || ty > area.bottom - PET_HALF_Y - 6) continue
        if (!blocked(tx, ty, obstacles, OBSTACLE_MARGIN)) return { x: tx, y: ty }
      }
    }
    return null
  }

  function stepPhysics(dt) {
    const cx = pet.x + PET_HALF_X
    const cy = pet.y + PET_HALF_Y

    // Dragging: the cursor owns the pose; physics resumes on release.
    if (pet.dragging) {
      pet.vx = 0
      pet.vy = 0
      whaleEl.style.transform =
        'translate3d(' + pet.x.toFixed(2) + 'px,' + pet.y.toFixed(2) + 'px,0)'
      return
    }

    const overlapping = blocked(cx, cy, obstacles, 0)
    const cursorDx = cx - pointer.x
    const cursorDy = cy - pointer.y
    const cursorD2 = cursorDx * cursorDx + cursorDy * cursorDy
    const cursorNear = pointer.inside && cursorD2 < 110 * 110
    let targetX = pet.tx
    let targetY = pet.ty
    let fleeing = false
    if (overlapping || cursorNear) {
      if (!pet.escape || blocked(pet.escape.x, pet.escape.y, obstacles, 0)) pet.escape = findClearSpot(cx, cy)
      if (pet.escape) {
        targetX = pet.escape.x
        targetY = pet.escape.y
        fleeing = true
      }
    } else {
      pet.escape = null
    }
    if (!fleeing && (dist2(cx, cy, pet.tx, pet.ty) < TARGET_REACHED * TARGET_REACHED || now() > pet.targetAt)) pickTarget()

    const speed = fleeing ? FLEE_SPEED : (monitorState.running || tempStage === 'done') ? ACTIVE_SPEED : IDLE_SPEED
    // Drowsy/sleeping barely move — the whale drifts off.
    const stageSpeed = currentStage === 'drowsy' ? speed * 0.4 : currentStage === 'sleeping' ? 0 : speed
    const dx = targetX - cx
    const dy = targetY - cy
    const distance = Math.sqrt(dx * dx + dy * dy) || 1
    const drive = fleeing ? speed * 1.9 : stageSpeed
    let ax = (dx / distance) * drive
    let ay = (dy / distance) * drive

    // Cursor bubble: a light repel so the whale slips away from the pointer.
    if (pointer.inside && cursorD2 < 150 * 150) {
      const cd = Math.sqrt(cursorD2) || 1
      const influence = 1 - cd / 150
      const force = influence * influence * 1100
      ax += (cursorDx / cd) * force
      ay += (cursorDy / cd) * force
    }

    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i]
      const nx = clamp(cx, o.left, o.right)
      const ny = clamp(cy, o.top, o.bottom)
      let ox = cx - nx
      let oy = cy - ny
      let d = Math.sqrt(ox * ox + oy * oy)
      if (d > AVOID_RADIUS) continue
      if (d < 0.5) {
        // Centre is inside the rect: escape along the shortest edge.
        const left = cx - o.left
        const right = o.right - cx
        const top = cy - o.top
        const bottom = o.bottom - cy
        const min = Math.min(left, right, top, bottom)
        if (min === left) {
          ox = -1
          oy = 0
        } else if (min === right) {
          ox = 1
          oy = 0
        } else if (min === top) {
          ox = 0
          oy = -1
        } else {
          ox = 0
          oy = 1
        }
        d = 0.5
      }
      const influence = 1 - d / AVOID_RADIUS
      const force = influence * influence * 1500
      const nxv = ox / d
      const nyv = oy / d
      ax += nxv * force
      ay += nyv * force
      // Tangent slide: without it a whale pinned between a text line and the
      // frame edge can cancel its normal push and freeze in place.
      const txv = -nyv
      const tyv = nxv
      const tangentSign = pet.vx * txv + pet.vy * tyv >= 0 ? 1 : -1
      ax += txv * tangentSign * force * 0.15
      ay += tyv * tangentSign * force * 0.15
      if (d < PET_HALF_X * 0.6 && now() > sparkTimer) {
        sparkTimer = now() + 900
        spawnParticle('bubble', { x: PET_SIZE * 0.5, y: PET_SIZE * 0.4, life: 1100 })
      }
    }

    // Soft bounds so the whale never leaves the chat column.
    const minX = area.left + 4
    const maxX = area.right - PET_SIZE - 4
    const minY = area.top + 4
    const maxY = area.bottom - PET_SIZE - 4
    if (cx < area.left + PET_HALF_X + 10) ax += (area.left + PET_HALF_X + 10 - cx) * 26
    if (cx > area.right - PET_HALF_X - 10) ax -= (cx - (area.right - PET_HALF_X - 10)) * 26
    if (cy < area.top + PET_HALF_Y + 10) ay += (area.top + PET_HALF_Y + 10 - cy) * 26
    if (cy > area.bottom - PET_HALF_Y - 10) ay -= (cy - (area.bottom - PET_HALF_Y - 10)) * 26

    const responsiveness = monitorState.running ? 3.4 : 2.2
    const blend = Math.min(1, dt * responsiveness)
    pet.vx += (ax - pet.vx) * blend
    pet.vy += (ay - pet.vy) * blend
    // Stuck rescue: a drifting whale that stops far from its target re-picks a
    // clear spot and gets an impulse, instead of sitting still in a pocket.
    const speedNow = Math.sqrt(pet.vx * pet.vx + pet.vy * pet.vy)
    if (speedNow < 8 && distance > 70) {
      pet.stuckMs = (pet.stuckMs || 0) + dt * 1000
      if (pet.stuckMs > 700) {
        pet.stuckMs = 0
        pickTarget()
        pet.vx += rand(-70, 70)
        pet.vy += rand(-50, 50)
      }
    } else {
      pet.stuckMs = 0
    }
    const nextFast = fleeing || speedNow > 55
    if (nextFast !== isFast) {
      isFast = nextFast
      whaleEl.classList.toggle('is-fast', isFast)
    }
    const maxSpeed = speed * 2.4 + 60
    const v = Math.sqrt(pet.vx * pet.vx + pet.vy * pet.vy)
    if (v > maxSpeed) {
      pet.vx = (pet.vx / v) * maxSpeed
      pet.vy = (pet.vy / v) * maxSpeed
    }
    pet.x += pet.vx * dt
    pet.y += pet.vy * dt
    // Bump the frame edge: bounce back with a playful hop, so walls feel solid.
    if (pet.x < minX || pet.x > maxX) {
      pet.vx = -pet.vx * 0.55 + (pet.x < minX ? 30 : -30)
      if (!reduced && currentStage === 'idle' && now() - lastWallBump > 1600) {
        lastWallBump = now()
        triggerTemp('hop', 1200)
      }
    }
    if (pet.y < minY || pet.y > maxY) {
      pet.vy = -pet.vy * 0.55 + (pet.y < minY ? 26 : -26)
      if (!reduced && currentStage === 'idle' && now() - lastWallBump > 1600) {
        lastWallBump = now()
        triggerTemp('hop', 1200)
      }
    }
    // When the chat area changes size (sidebar toggles, window zoom, composer
    // growth, session switch) glide back inside instead of snapping — a hard
    // clamp looked like a teleport across the screen.
    const clampedX = clamp(pet.x, minX, maxX)
    const clampedY = clamp(pet.y, minY, maxY)
    if (clampedX !== pet.x || clampedY !== pet.y) {
      // Swim back inside at a bounded speed: a layout change (sidebar, zoom,
      // composer) must never look like a teleport.
      const gx = clampedX - pet.x
      const gy = clampedY - pet.y
      const gd = Math.sqrt(gx * gx + gy * gy) || 1
      const returnSpeed = Math.min(gd / Math.max(dt, 0.001), 260)
      pet.x += (gx / gd) * returnSpeed * dt
      pet.y += (gy / gd) * returnSpeed * dt
      pet.vx *= 0.8
      pet.vy *= 0.8
      if (gd < 2) {
        pet.x = clampedX
        pet.y = clampedY
      }
    }

    // Turn the head into the direction of travel, but rarely: the whale has to
    // keep the new heading for a while, then waits out a cooldown before it
    // flips back. Fleeing stays responsive; idle turning is ~4x rarer.
    const threshold = fleeing ? 3 : 10
    let desiredFacing = pet.facing
    if (pet.vx < -threshold) desiredFacing = -1
    else if (pet.vx > threshold) desiredFacing = 1
    if (desiredFacing !== pet.facing) {
      pet.flipHoldMs += dt * 1000
      const holdNeeded = fleeing ? 240 : 800
      const cooldown = fleeing ? 2500 : 10000
      if (pet.flipHoldMs >= holdNeeded && now() - pet.lastFlipAt >= cooldown) {
        pet.facing = desiredFacing
        pet.flipHoldMs = 0
        pet.lastFlipAt = now()
        flipEl.style.transform = desiredFacing < 0 ? 'scaleX(-1)' : 'scaleX(1)'
      }
    } else {
      pet.flipHoldMs = 0
    }

    const tilt = reduced ? 0 : clamp(pet.vy * 0.07, -7, 7)
    whaleEl.style.transform =
      'translate3d(' + pet.x.toFixed(2) + 'px,' + pet.y.toFixed(2) + 'px,0) rotate(' + tilt.toFixed(2) + 'deg)'
  }

  /* ------------------------------------------------------------------ loop */

  let lastStageEval = 0

  function frame(timestamp) {
    if (disposed) return
    rafId = requestAnimationFrame(frame)
    if (!visible) return
    // Re-derive the stage even when the chat is silent, otherwise the whale
    // gets stuck in "drowsy" and never reaches "sleeping".
    if (now() - lastStageEval > 400) {
      lastStageEval = now()
      refreshStage()
    }
    const dt = Math.min(0.05, Math.max(0.001, (timestamp - lastFrame) / 1000 || 0.016))
    lastFrame = timestamp

    if (!area) {
      if (obstacleDirty) refreshObstacles()
      return
    }
    if (obstacleDirty) refreshObstacles()
    stepPhysics(dt)
    if (now() - posSavedAt > 900) {
      posSavedAt = now()
      try {
        window.sessionStorage.setItem(POS_KEY, JSON.stringify({ x: pet.x, y: pet.y, facing: pet.facing }))
      } catch {}
    }

    // Writing: the artwork already animates its own code sparks at the laptop,
    // so the engine stays quiet here (a periodic yellow plus above the whale
    // read as a static dot).
    // Tool: bubbles from the working spot.
    // Fast swim: a short bubble trail from the tail.
    if (isFast && now() > glowTimer) {
      glowTimer = now() + 260
      spawnParticle('bubble', {
        x: pet.facing > 0 ? PET_SIZE * 0.78 : PET_SIZE * 0.22,
        y: PET_SIZE * 0.55,
        life: 700,
      })
    }
    // Tool: sparks fly where the hammer meets the wall panel.
    if (currentStage === 'tool' && now() > glowTimer) {
      glowTimer = now() + 1100
      // The art's wall face sits just outside the left edge of the viewBox
      // (and mirrors to the right when the whale turns around).
      const wallX = pet.facing > 0 ? PET_SIZE * 0.05 : PET_SIZE * 0.95
      for (let i = 0; i < 3; i++) {
        spawnParticle('spark', {
          x: wallX,
          y: PET_SIZE * 0.75,
          dx: rand(-14, 14),
          dy: rand(-18, -6),
          life: 620,
          delay: i * 45,
        })
      }
    }
    // Chill: now and then the idle whale puts its headphones on.
    if (
      currentStage === 'idle' &&
      !monitorState.running &&
      !monitorState.pending &&
      now() > lastMusicAt
    ) {
      lastMusicAt = now() + rand(38000, 90000)
      triggerTemp('music', rand(5200, 8200))
    }
    if (currentStage === 'music' && now() > glowTimer) {
      glowTimer = now() + 900
      spawnParticle('note', { x: PET_SIZE * 0.55, y: PET_SIZE * 0.3, life: 1900 })
    }
    // Mischief: an idle whale alternates — a water spout or a happy hop.
    if (
      currentStage === 'idle' &&
      !monitorState.running &&
      !monitorState.pending &&
      now() > lastMischiefAt
    ) {
      lastMischiefAt = now() + rand(13000, 28000)
      mischiefCount = (mischiefCount + 1) % 4
      // Spout every fourth mischief, hops on the other three: half as often.
      if (mischiefCount === 3) {
        triggerTemp('splash', 3200)
        spawnSpout()
      } else {
        triggerTemp('hop', 1400)
        spawnBurst('bubble', 4)
        spawnBurst('spark', 3)
        spawnParticle('ripple', { x: PET_SIZE * 0.5, y: PET_SIZE * 0.78, life: 1100 })
      }
    }
    // Done/error/splash/poke are temporary; fall back to the derived stage.
    if (tempStage && now() >= tempUntil) {
      tempStage = null
      setStage(baseStage())
    }
  }

  /* --------------------------------------------------------------- events */

  let dragMoved = false
  let dragStartX = 0
  let dragStartY = 0
  let wasSleeping = false
  let wakeGlowUntil = 0

  function onPointerDown(event) {
    if (disposed) return
    event.stopPropagation()
    pet.dragging = true
    dragMoved = false
    wasSleeping = currentStage === 'sleeping'
    dragStartX = event.clientX
    dragStartY = event.clientY
    pet.dragOffX = event.clientX - pet.x
    pet.dragOffY = event.clientY - pet.y
    if (hitEl) hitEl.style.cursor = 'grabbing'
    try {
      whaleEl.setPointerCapture(event.pointerId)
    } catch {}
    setStage('drag')
  }

  function onPointerMove(event) {
    pointer.x = event.clientX
    pointer.y = event.clientY
    if (!pet.dragging) return
    event.stopPropagation()
    const moved = Math.abs(event.clientX - dragStartX) + Math.abs(event.clientY - dragStartY)
    if (moved > 6) dragMoved = true
    const minX = area ? area.left + 4 : 0
    const maxX = area ? area.right - PET_SIZE - 4 : window.innerWidth
    const minY = area ? area.top + 4 : 0
    const maxY = area ? area.bottom - PET_SIZE - 4 : window.innerHeight
    pet.x = clamp(event.clientX - pet.dragOffX, minX, maxX)
    pet.y = clamp(event.clientY - pet.dragOffY, minY, maxY)
  }

  function onPointerUp(event) {
    if (!pet.dragging) return
    pet.dragging = false
    if (hitEl) hitEl.style.cursor = ''
    if (!dragMoved) {
      // Waking up from sleep is a happy moment: hearts and a warm glow.
      if (wasSleeping) {
        wakeGlowUntil = now() + 1900
        triggerTemp('poke', 1900)
        spawnBurst('heart', 8)
        spawnBurst('spark', 4)
        spawnBurst('bubble', 3)
        spawnBurst('note', 2)
      } else {
        triggerTemp('poke', 950)
        spawnBurst('bubble', 5)
      }
    } else {
      // A real drag ends here; the poke temp stage must survive the click case.
      tempStage = null
      setStage(baseStage())
    }
  }

  function onPointerEnter(event) {
    pointer.inside = true
    pointer.x = event.clientX
    pointer.y = event.clientY
  }
  function onPointerLeave() {
    pointer.inside = false
  }

  function readSessionId() {
    const node = document.querySelector('[data-conversation-content]')
    const id = node ? node.getAttribute('data-conversation-session') : null
    if (id && id !== sessionId) {
      sessionId = id
      monitor.setSessionId(id)
    }
  }

  function onVisibility() {
    visible = document.visibilityState !== 'hidden'
    if (visible) {
      lastFrame = now()
      scheduleObstacles(0)
    }
  }

  whaleEl.addEventListener('pointerdown', onPointerDown)
  whaleEl.addEventListener('pointermove', onPointerMove)
  whaleEl.addEventListener('pointerup', onPointerUp)
  whaleEl.addEventListener('pointercancel', onPointerUp)
  if (hitEl) {
    hitEl.addEventListener('pointerenter', onPointerEnter)
    hitEl.addEventListener('pointerleave', onPointerLeave)
  }
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('resize', scheduleArea)
  const onScroll = () => scheduleObstacles(120)
  document.addEventListener('scroll', onScroll, { capture: true, passive: true })

  if (typeof MutationObserver === 'function') {
    mutationObserver = new MutationObserver(() => {
      readSessionId()
      scheduleIndex()
      scheduleObstacles(220)
    })
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['data-conversation-session'],
    })
  }
  if (typeof ResizeObserver === 'function') {
    resizeObserver = new ResizeObserver(scheduleArea)
    const content = document.querySelector('[data-conversation-content]')
    if (content) resizeObserver.observe(content)
  }

  const sessionPoll = setInterval(() => {
    readSessionId()
    monitor.refreshBinding()
    scheduleArea()
  }, 1500)

  readSessionId()
  rebuildObstacleIndex()
  refreshObstacles()
  refreshStage()
  lastFrame = now()
  rafId = requestAnimationFrame(frame)

  // Debug handle used by the plugin's own verification; harmless in production.
  window.__dshWhalePet = {
    get state() {
      return {
        stage: currentStage,
        x: pet.x,
        y: pet.y,
        running: monitorState.running,
        pending: monitorState.pending,
        idleMs: Math.round(now() - lastActiveAt),
        temp: tempStage,
        todos: todos,
        obstacles: obstacles.length,
      }
    },
    setStage(name, ms) {
      triggerTemp(name, ms || 6000)
    },
    rescan() {
      refreshObstacles()
    },
  }

  return {
    setStatuses(map) {
      monitor.setStatuses(map)
    },
    setActiveSession(id) {
      if (id) {
        if (id !== sessionId) {
          sessionId = id
          monitor.setSessionId(id)
          lastActiveAt = now()
        }
        return
      }
      readSessionId()
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(rafId)
      clearInterval(sessionPoll)
      if (obstacleTimer !== null) clearTimeout(obstacleTimer)
      if (areaTimer !== null) clearTimeout(areaTimer)
      if (mutationObserver) mutationObserver.disconnect()
      if (obstacleObserver) obstacleObserver.disconnect()
      if (indexTimer !== null) clearTimeout(indexTimer)
      if (resizeObserver) resizeObserver.disconnect()
      document.removeEventListener('scroll', onScroll, { capture: true })
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', scheduleArea)
      whaleEl.removeEventListener('pointerdown', onPointerDown)
      whaleEl.removeEventListener('pointermove', onPointerMove)
      whaleEl.removeEventListener('pointerup', onPointerUp)
      whaleEl.removeEventListener('pointercancel', onPointerUp)
      if (hitEl) {
        hitEl.removeEventListener('pointerenter', onPointerEnter)
        hitEl.removeEventListener('pointerleave', onPointerLeave)
      }
      monitor.dispose()
      if (window.__dshWhalePet) delete window.__dshWhalePet
      stageEl.remove()
    },
  }
}

/* ------------------------------------------------------------ React shell */

const selectStatusMap = (snapshot) => snapshot

/** The Session currently retained by the main view (the visible chat). */
function selectActiveSession(state) {
  if (!state || !state.byId) return null
  const ids = state.ids || Object.keys(state.byId)
  for (let i = 0; i < ids.length; i++) {
    const row = state.byId[ids[i]]
    const retained = row && row.retainedBy
    if (retained && (retained.mainView || 0) > 0) return ids[i]
  }
  return null
}

function WhaleOverlay(props) {
  const hostRef = React.useRef(null)
  const engineRef = React.useRef(null)
  const statuses = props.useSessionStatus(selectStatusMap)
  const activeId = props.useSessions(selectActiveSession)

  React.useEffect(() => {
    if (!hostRef.current) return undefined
    const engine = createWhaleEngine(hostRef.current, pluginContext)
    engineRef.current = engine
    return () => {
      engine.dispose()
      engineRef.current = null
    }
  }, [])

  React.useEffect(() => {
    if (engineRef.current) engineRef.current.setStatuses(statuses)
  }, [statuses])

  React.useEffect(() => {
    if (engineRef.current) engineRef.current.setActiveSession(activeId)
  }, [activeId])

  return h('div', { ref: hostRef, className: 'dsh-whale-root', style: { pointerEvents: 'none' } })
}

/* --------------------------------------------------------------- plugin */

let pluginContext = null

const plugin = {
  inject: ['slots'],
  apply(ctx) {
    pluginContext = ctx
    ctx.effect(() => {
      const style = document.createElement('style')
      style.dataset.plugin = NAMESPACE
      style.textContent = ENGINE_CSS + '\n' + ART.css
      document.head.appendChild(style)
      return () => style.remove()
    }, NAMESPACE + ': styles')

    ctx.slots.inject('shell.overlay', () => {
      return ctx.slots.register(
        {
          name: 'shell.overlay',
          id: NAMESPACE,
          order: 1200,
        },
        WhaleOverlay,
      )
    })
  },
}

return plugin
