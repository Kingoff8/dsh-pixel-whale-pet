# Клиентские API DSH для стадий чата и todo — бриф

Проверено по установленному Harness **0.2.2-rc.1** (только чтение).
`$DSH = /usr/lib/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai`, `$PROF = /root/.dsh/profiles/web/node_modules`.
`lib/*.js` — собранный JS (исходников .ts нет), `lib/types/**/*.d.ts` — типы; строки — по установленным файлам.

Итог: клиентский плагин в `shell.overlay` официально получает `ctx.sessions` → `binding(id)` →
`binding.eventSource` (durable + live) и `binding.session.projections.faceOf('todos')`; плюс root-пропсы
`useSessions`/`useSessionStatus`. DOM-атрибуты чата — не контракт, только fallback.

## 1. Доступ к сервису sessions

`ctx.sessions` объявлен в `$DSH/dsh-api-session-controller/lib/types/client/index.d.ts:27-30`; сервис есть в
курируемом каталоге клиентских сервисов (`$DSH/dsh-cordis-client-runner/lib/client.js:1422`).

| Способ | Поведение |
|---|---|
| `ctx.get('sessions')` | читает без объявления зависимости; пока провайдер неактивен — `undefined` (`$DSH/cordis/lib/types/reflect.d.ts:8-16`), плагин деградирует |
| `inject:['sessions']` / `ctx.inject(['sessions'], cb)` | cb **не запускается** без сервиса и перезапускается при его смене (`$DSH/cordis/lib/types/registry.d.ts:103-116`); проверено на cordis 4.1.0 |

Рекомендация: `inject: ['slots']` на плагине + `ctx.inject(['sessions'], cb)` внутри монитора — декорация не
отвалится при переименовании/выключении сервиса, а монитор поднимется сам, без поллинга.

Методы `ISessions` (`.../client/contract/sessions.d.ts`): `retain:52`, `using:59`, `retainInfo:68`
(`ObservableSnapshot<{referenceCount,retainedBy}>`), `create/fork/search/refresh:93+`, `scope:140`,
`scopeOf:147`, `sessionOf:153`, **`binding(id):159`** (`SessionBinding|undefined` — одолжить без удержания).
`SessionBinding` (`.../client/sessions/service.d.ts:83-89`): `{sessionId, session:SessionFace, eventSource, ctx}`.

**`binding(id)` для отрисованной сессии достаточно**: видимую сессию удерживает main-view —
`$DSH/dsh-client-ui-workspace/lib/client.js:1663` (`retain(target,{source:"mainView"})`). Пока `undefined`
(переключение/старт) — подписка на `sessions.list`: его снапшот меняется при изменении `retainedBy`
(`$DSH/dsh-api-session-controller/lib/client.js:4107-4118`), затем повторный `binding()`. Своё удержание не делать.

## 2. id видимой сессии и DOM-контракт

Контрактного DOM-API у чата нет: в README/типах `dsh-client-ui-conversation` атрибуты не описаны. Таблица — по коду.

| Атрибут | Где ставится | Статус |
|---|---|---|
| `data-conversation-content` | `$DSH/dsh-client-ui-conversation/lib/client.js:20602` (body) | не контракт |
| **`data-conversation-session="<id>"`** | :20603; **нет**, если сессия не выбрана | **подтверждён**, не контракт |
| `data-content-phase` (`blank`/`engaging`/`active`) | :20605 (`conversationPhase` :20052-54) | не контракт |
| `data-conversation-region="chat"` / `"composer"` | :20604 / :20596 | не контракт |
| `data-conversation-scroll` | :20608 (используют и свои пакеты: session-inspector :3793) | не контракт |
| `data-composer-seat` | :20595 (`ui-chat :828`) | не контракт |
| `data-shell-overlay` | `$DSH/dsh-client-ui-layout/lib/client.js:403` (CSS :74) | не контракт |
| `data-chat-running` / `data-streaming` | `ui-chat :6405` / :8218,:8372 | fallback running/writing |
| `data-approval-key` / `data-question-key` | approval :81 / user-questions :1043 | fallback waiting |

id: `document.querySelector('[data-conversation-content][data-conversation-session]')?.getAttribute('data-conversation-session')`
— так читает и сам DSH (`client.js:22440-52`). Primary без DOM:
`useSessions((s) => Object.values(s.byId).find(r => (r.retainedBy.mainView ?? 0) > 0)?.id)` (так: `ui-cordis :741`,
`ui-workspace :100`) — это **выбранная**, но не обязательно видимая сессия (может быть открыта панель Plugins).
Поэтому DOM — приоритет, список — bootstrap-fallback.

Слой `shell.overlay`: `z-index:20; pointer-events:none`, **но** `.overlayLayer>*{pointer-events:auto}`
(layout `:74`) — корень записи обязан быть `pointer-events:none`, интерактивным детям — `auto`.

## 3. `SessionBinding.eventSource`

`SessionEventSource = ObservableSnapshot<SessionEventWindow>` (`.../contract/events.d.ts:56-63`):

```ts
Window = { entries: (|{type:'event',event:SessionEvent}|{type:'transient',event:AssistantLiveChunkEvent})[],
           hasMore: boolean, revision: number, change: SessionEventChange }
Change = {kind:'replace'|'prepend'|'append'; entries} | {kind:'settle-assistant'; attemptId; entry?}
```

* durable — реальные `SessionEvent` (`$DSH/dsh-session/lib/types/types.d.ts:497`);
* transient — только `assistant/live-chunk`: `{type,seq,time,data:{attemptId,turn,step,chunk:StreamChunk}}`
  (events.d.ts:6-15), `seq` **дробный**: `durableCursor + 1 - 1/(n+1)` (`.../client.js:2026,2089`; комментарий :5),
  т.е. между крайним durable и следующим durable; `settle-assistant` удаляет transient-строки attempt и вставляет
  durable settlement (`client.js:1804-1820`);
* `revision` растёт на **каждую** мутацию окна, включая каждый live-chunk: `publish()` (`client.js:1757-1812`)
  зовёт подписчиков на каждый append → поток на частоте токенов; подписка одна на приложение + throttle;
* окно: `HISTORY_PAGE_OPTIONS={maxMessages:500,turnWindow:{minMessages:50,minTurns:2}}` (`client.js:2164-70`) —
  ≤500 сообщений + служебные события (`step/*`,`turn/*`,`request/*`…), обычно сотни…~1.5–2k entries, `hasMore`=есть старое.

```js
const b = ctx.get('sessions').binding(id)          // undefined → ждать событие sessions.list
const off = b.eventSource.subscribe(() => {
  const win = b.eventSource.getSnapshot()          // читать только внутри listener
  const ch = win.change
  if (ch.kind === 'replace') rebaseline(win.entries)          // открытие/реконнект
  else if (ch.kind === 'prepend') { /* старая история */ }
  else if (ch.kind === 'append') applyEntry(ch.entries[0])
  else if (ch.kind === 'settle-assistant') { st.live = null; if (ch.entry) applyEntry(ch.entry) }
})
// off()
```

## 4. `deriveStage`: правила и edge cases

`StreamChunk` (`$DSH/dsh-llm/lib/types/types.d.ts:458-488`): `text-delta{index,text}`,
`reasoning-delta{index,text}`, `tool-call-delta{index,id,name?,argumentsDelta}`, `block-start{index,blockType}`,
`block-end{index,block}`, `usage`, `finish{reason}`; `blockType`/`ContentBlock.type` = `text|reasoning|tool-call|image|file|…`.

| Событие / chunk | Вклад |
|---|---|
| `turn/start` | открыть турн, очистить tools → `thinking` |
| `step/start` | `thinking` |
| live-chunk `text-delta` (непустой не-пробельный) | `writing` |
| live-chunk `reasoning-delta` | `thinking` |
| live-chunk `tool-call-delta`, `block-start/end tool-call` | `tool` (стрим аргументов ≠ writing) |
| live-chunk `finish`/`usage` | не менять (ждём settlement) |
| `assistant/message{interrupted?}`, `assistant/attempt` | settlement; transient-строки этого attempt уже удалены → `thinking`; `attempt` — не error |
| `tool/call{callId,name}` | `tools.set(callId,name)` → `tool` |
| `tool/result{message.toolCallId,isError?}` | `tools.delete`; остались → `tool`, иначе `thinking`; `isError` — **не** error-стадия |
| `turn/end{reason.kind}` | `completed→done`, `error|max-tokens→error`, `blocked→waiting`, `aborted|interrupted|forked→idle` |
| `approval/asked` / `approval/decided` | fallback-детект `waiting` (set id’ов) |
| `todo/write` | не стадия (todo — из проекции §5) |
| `compaction/*` (`turn:null`) | при `running` → `thinking`; `compaction/end.error` → `errorText` |
| `subagent/*`,`team/*`,`job/*` | стадию не меняют; делегирование — это `tool/call`+`tool/result` |

Приоритет: `pending`→`waiting`; свежий `turn/end`→`done`/`error` (одноразово); live text при `running`→`writing`;
live reasoning→`thinking`; `tools.size>0`→`tool`; `running`→`thinking`; иначе `idle`. `error` — только
`turn/end.reason.kind==='error'|'max-tokens'` либо `SessionSnapshot.lastAgentError/openError/promptError`.

Edge cases:
* **История при open/reconnect**: `change.kind==='replace'` → полный рескан и база `endSeq` хвостового `turn/end`,
  иначе при открытии «празднуется» старый `done`.
* **Прерванные турны**: `interrupted:true` на `assistant/message` — сохранённый префикс, не error; `aborted|interrupted|forked`→`idle`.
* **`tool/result.isError`**: стадия остаётся `tool`/`thinking`, текст ошибки не подменяет `errorText` турна.
* **Параллельные tool/call**: набор по `callId`, `tool` пока непуст; результат по callId вне окна — no-op.
* **Реконнект посреди стрима**: transient-префикс восстанавливается (`client.js:2025-2046`), затем снова `append`.
* **`assistant/attempt`/`llm/retry*`**: очистить live, `thinking` (не error).
* **compaction**: `turn:null`, идёт между турнами; `running` может быть true → `thinking`; `compaction/end.error` — в `errorText`.
* **Сабагент** — отдельная сессия/binding; в родителе это `tool`.
* **Пустой turn** (отказ/пустой ввод/cancel): `turn/start`→`turn/end` без step → `idle`.
* **`openState:'loading'`**, entries пусты, `running:true` → `thinking`.

## 5. Todo: проекция `todos`

Объявление — `$DSH/dsh-tool-todo/lib/types/types.d.ts:36-44`:

```ts
'todo/write': { todos: TodoItem[] }                                               // :27-31
SessionProjectionMap: { todos: SessionProjectionSummaryExcluded<TodoItem[]> | null }  // :43
TodoItem = { content: string; status: 'pending'|'in_progress'|'completed' }          // :20-25
```

`binding.session.projections.faceOf('todos')` (`.../client/contract/session.d.ts:60,67`) →
`ObservableSnapshot<unknown>`: `getSnapshot()` = `TodoItem[]` | **`null`** (до первого `todo/write`) |
**`undefined`** (ключ недоступен / baseline не пришёл) (`.../sessions/projection-store.d.ts:70-79`). Face
identity-stable, подписка/отписка обычные.

```js
const face = binding.session.projections.faceOf('todos')
const read = () => { const v = face.getSnapshot(); return Array.isArray(v) ? v : null }
const off = face.subscribe(() => { /* read() */ })       // off()
```

`useProjection('todos')` из root-слота **недоступен**: он объявлен только в `SessionStandardProps`/
`SessionMaybeStandardProps` (`$DSH/dsh-client-ui-session/.../index.d.ts:80-98`), а `shell.overlay` получает
только root-пропсы (`runner client.js:5975-5983`). Чат читает так: `client.js:22347` (`useProjection("todos") ?? []`).

## 6. Root-пропсы `shell.overlay`: `useSessions`, `useSessionStatus`

Слот документирован: `$DSH/dsh-client-ui-layout/lib/types/client/index.d.ts:86-99` — `kind:'list'`, `scope:'root'`,
аддитивный по `id`, `order` (asc), `label`, click-through. Пропсы записи (каталог рантайма `runner client.js:5975-5983`):
`useSessions`, `useSessionStatus`, `useSessionRetainInfo`, `useSessionAccess`, `useRemoteAccess`, `useResource`,
`useContextMenu`, `useWorkspaces`, `usePanelInfo`, `useWorkspaceAccess`.
**`useSession`/`useProjection`/`sessionId`/`useAccess` — нет** (Session-скоуп, ui-session index.d.ts:80-98).

`SnapshotSelectorHook<T> = <S>(sel:(s:T)=>S, eq?:(a:S,b:S)=>boolean) => S` (`runner client.js:2441`), селектор
**обязателен**; реализация — `bindSnapshotSelector` → `useSyncExternalStoreWithSelector(subscribe,getSnapshot,undefined,sel,eq)`
(`$DSH/dsh-client-ui-renderer/lib/client.js:155-160`), `eq` = `Object.is`. В компоненте это **пропсы**:
`function WhaleOverlay({useSessionStatus, useSessions, useSessionRetainInfo}) {…}`.

```js
const running  = useSessions((s) => s.byId[id]?.running)
const status   = useSessionStatus((m) => m.get(id))                 // SessionStatus | undefined
const waiting  = useSessionStatus((m) => (m.get(id)?.pendingInteraction?.kind) ?? null)
const isMain   = useSessionRetainInfo(id, (i) => (i?.retainedBy.mainView ?? 0) > 0)
```

`SessionStatus` (`ui-session index.d.ts:30-37`): `running:boolean|undefined` (undefined — базы нет),
`pendingInteraction?: SessionPendingInteraction`, `completionUnread:boolean` (турн завершился, пока сессия была
**не** в main-view; для видимой снимается всегда, `client.js:964-990`). `pendingInteraction.kind`:
`'approval'` (approval `contract/slots.d.ts:70`), `'question'|'plan-review'` (user-questions `slots.d.ts:139`),
карта расширяется плагинами (`:7` / `:8`) → любую непустую трактуйте как `waiting`, `kind` — подсказка для анимации.

Plain-JS: `ctx.get('uiSession').sessionStatus` — `HostObservable<ReadonlyMap<SessionId,SessionStatus>>`
(`ui-session index.d.ts:149`, реализация `client.js:782-790`). **Но** `uiSession` нет в курируемом каталоге
сервисов (`runner client.js:1422` — только layout, locale, sessions, slots, theme, timer, uiWorkspace, workspaces):
путь типизирован, но не официальный контракт → используем как primary с резервом `setStatus()` из `useSessionStatus`.

## 7. Производительность и жизненный цикл

* `binding === undefined`: подписка на `sessions.list` + повторный `binding()`; никаких `setInterval`.
* Все `subscribe()` → `() => void` (eventSource, face, `session`, `list`, `sessionStatus`); `ctx.inject(...)` → fiber → `fiber.dispose()`.
* Одна подписка eventSource на приложение, throttle 100 мс (≤10 emit/с), форс на `turn/end`, дедуп по сигнатуре;
  O(1) на `append`, полный рескан только на `replace`.

## 8. Готовый `createSessionMonitor` (plain JS, без React/TS)

```js
/* createSessionMonitor(ctx, onUpdate) → { setSessionId(id), setStatus({running,pending}|null), dispose() }
   emit: { stage, running, pending, todos, todosDone, todosTotal, errorText, endKind, endSeq } */
function createSessionMonitor(ctx, onUpdate) {
  const THROTTLE = 100
  let service, binding, sessionId, fiber, timer, disposed = false, lastSig = ''
  let unsubList, unsubEvents, unsubTodos, unsubSession, unsubStatus, statusMap, external
  let st = fresh()
  const safe = (fn, d) => { try { const v = fn(); return v === undefined ? d : v } catch { return d } }
  function fresh() { return { turnOpen: null, tools: new Map(), asked: new Set(), live: null, endKind: null, endSeq: -1, seenEnd: -1, turnError: null } }
  /* --- окно событий --- */
  function rebaseline() {
    st = fresh()
    for (const entry of (safe(() => binding.eventSource.getSnapshot(), null) || {}).entries || []) apply(entry)
    st.seenEnd = st.endSeq                              // исторический turn/end не празднуем
    schedule(true)
  }
  function onWindow() {
    if (!binding || disposed) return
    const ch = (safe(() => binding.eventSource.getSnapshot(), null) || {}).change
    if (!ch || ch.kind === 'replace') return rebaseline()          // open/reconnect
    if (ch.kind === 'append') { apply(ch.entries[0]); return schedule(false) }
    if (ch.kind === 'settle-assistant') { st.live = null; if (ch.entry) apply(ch.entry); return schedule(false) }
  }
  function apply(entry) {
    if (!entry || !entry.event) return
    const ev = entry.event, d = ev.data || {}
    if (entry.type === 'transient') { st.live = ev; return }
    st.live = null
    if (ev.type === 'turn/start') { st.turnOpen = d.turn; st.tools.clear(); st.turnError = null }
    else if (ev.type === 'turn/end') {
      st.turnOpen = null; st.tools.clear(); st.asked.clear()
      st.endKind = d.reason ? d.reason.kind : null; st.endSeq = ev.seq
      if (d.reason && d.reason.kind === 'error' && d.reason.error) st.turnError = d.reason.error.message || 'error'
    } else if (ev.type === 'tool/call') st.tools.set(d.callId, d.name)
    else if (ev.type === 'tool/result') st.tools.delete(d.message ? d.message.toolCallId : d.callId)
    else if (ev.type === 'approval/asked') st.asked.add(d.id)
    else if (ev.type === 'approval/decided') st.asked.delete(d.id)
    else if (ev.type === 'compaction/end' && d.error) st.turnError = String(d.error)
  }
  /* --- чтение --- */
  function liveStage(ev) {
    const c = ev && ev.data && ev.data.chunk
    if (!c) return 'thinking'
    if (c.type === 'text-delta') return c.text && c.text.trim() ? 'writing' : 'thinking'
    if (c.type === 'reasoning-delta') return 'thinking'
    if (c.type === 'tool-call-delta') return 'tool'
    if (c.type === 'block-start') return c.blockType === 'text' ? 'writing' : c.blockType === 'tool-call' ? 'tool' : 'thinking'
    if (c.type === 'block-end') return c.block && c.block.type === 'tool-call' ? 'tool' : 'thinking'
    return 'thinking'
  }
  function derive() {
    const sess = binding ? safe(() => binding.session.getSnapshot(), null) : null
    const status = external || (statusMap && sessionId ? statusMap.get(sessionId) : null)
    const running = status && status.running !== undefined ? !!status.running : !!(sess && sess.running)
    const pending = !!((status && (status.pendingInteraction || status.pending)) || st.asked.size > 0 || [...st.tools.values()].includes('ask_user_question'))
    let stage = pending ? 'waiting'
      : running && st.live ? liveStage(st.live)
      : running && st.tools.size > 0 ? 'tool'
      : running ? 'thinking' : 'idle'
    let freshEnd = false
    if (st.endSeq > st.seenEnd) {
      st.seenEnd = st.endSeq; freshEnd = true
      stage = st.endKind === 'completed' ? 'done'
        : st.endKind === 'error' || st.endKind === 'max-tokens' ? 'error'
        : st.endKind === 'blocked' ? 'waiting' : 'idle'
    }
    const raw = binding ? safe(() => binding.session.projections.faceOf('todos').getSnapshot(), undefined) : undefined
    const todos = Array.isArray(raw) ? raw : []
    const errorText = (sess && sess.lastAgentError) ||
      (sess && sess.promptError && sess.promptError.error && sess.promptError.error.message) ||
      (sess && sess.openError && sess.openError.message) || st.turnError || null
    return { stage, running, pending, todos, todosDone: todos.filter((t) => t && t.status === 'completed').length,
      todosTotal: todos.length, errorText, endKind: freshEnd ? st.endKind : null, endSeq: freshEnd ? st.endSeq : null }
  }
  /* --- эмит --- */
  function schedule(force) { if (!disposed && timer === null) timer = setTimeout(flush, force ? 0 : THROTTLE) }
  function flush() {
    timer = null
    if (disposed || !binding) return
    const out = derive()
    const sig = [out.stage, out.running, out.pending, out.todosDone, out.todosTotal, out.errorText, out.endSeq].join('|')
    if (sig === lastSig) return
    lastSig = sig
    onUpdate(out)
  }
  /* --- binding + сервис --- */
  function unbind() {
    if (unsubEvents) { unsubEvents(); unsubEvents = null }
    if (unsubTodos) { unsubTodos(); unsubTodos = null }
    if (unsubSession) { unsubSession(); unsubSession = null }
    binding = null
  }
  function bind() {
    unbind()
    if (disposed || !service || !sessionId) return
    const b = safe(() => service.binding(sessionId), undefined)
    if (!b) { lastSig = ''; return }                    // ждём: sessions.list сообщит о retention
    binding = b
    unsubEvents = b.eventSource.subscribe(onWindow)
    unsubTodos = b.session.projections.faceOf('todos').subscribe(() => schedule(false))
    unsubSession = b.session.subscribe(() => schedule(true))
    rebaseline()
  }
  fiber = ctx.inject(['sessions'], (scope) => {
    service = scope.get('sessions')
    unsubList = service.list.subscribe(() => { if (!binding || binding.sessionId !== sessionId) bind(); else schedule(false) })
    bind()
    return () => { unbind(); if (unsubList) { unsubList(); unsubList = null } service = null }
  })
  const ui = safe(() => ctx.get('uiSession'), undefined)
  if (ui && ui.sessionStatus) {
    statusMap = ui.sessionStatus.getSnapshot()
    unsubStatus = ui.sessionStatus.subscribe(() => { statusMap = ui.sessionStatus.getSnapshot(); schedule(true) })
  }
  return {
    setSessionId(id) {
      if (id === sessionId) return
      sessionId = id || null; st = fresh(); lastSig = ''
      unbind(); bind(); schedule(true)
    },
    setStatus(s) { external = s || null; schedule(true) },
    dispose() {
      disposed = true
      if (timer !== null) { clearTimeout(timer); timer = null }
      if (unsubStatus) { unsubStatus(); unsubStatus = null }
      unbind()
      if (fiber) { const f = fiber; fiber = null; f.dispose().catch(() => {}) }
    },
  }
}
```

## 9. Риски и fallback-план

| Риск | Вероятность | Fallback |
|---|---|---|
| `binding()`/`eventSource` изменят/уберут (это `lib/types`, не стабильный wire) | средняя | stage из `useSessionStatus` + DOM `data-chat-running`/`data-streaming`/`[data-approval-key]`/`[data-question-key]` |
| `faceOf('todos')`/ключ `todos` изменятся | средняя | `todosDone/Total=0` (нейтральный вид), стадия не страдает |
| `uiSession.sessionStatus` пропадёт (не курируемый сервис) | средняя | `setStatus()` из `useSessionStatus`, иначе `sessions.list.byId[id].running` + эвристика по `approval/asked`/`ask_user_question` |
| дробный `seq` transient — реализационная деталь | низкая | не полагаться на `seq`, фильтровать по `entry.type==='transient'` |
| `data-conversation-session` переедет / `shell.overlay` переименуют | низкая | `useSessions` mainView-поиск (§2) + `MutationObserver`; слот документирован (layout d.ts:96) |
| `pointer-events` слоя | — | корень записи `pointer-events:none`, иначе перекрывает UI (layout css `:74`) |

**Отличие от `dsh-pet`** (`$PROF/dsh-pet/src`): то же решается на Host-половине — `ctx.on('session/event', …)`
(`host/plugin/session-watch.ts:148-160`), стадии в `host/work-status.ts:36-70` (`turn/start→thinking`, `tool/call→working`,
`tool/result→result`, `approval/asked→waiting`, `turn/end→success/error/waiting`), доставка — свой HTTP long-poll
`/state` (`client/pet/multi.ts:175-215`). Нам из него полезны только идеи приоритетов (`waiting>error>working>thinking>result>success`)
и `currentTaskFromTodo` (последний `in_progress`, иначе первый `pending`); данные берём из `binding`, без Host-половины.
