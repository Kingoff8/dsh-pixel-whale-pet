// src/art.js — artwork fragment for the dsh-pixel-whale-pet client bundle.
// Redrawn to match the DSH Go "Deepy" sprite family (one logical sprite pixel = 2px).
// Concatenated into client.js inside the module factory scope: plain script
// fragment, no module syntax, declares only `ART`.
const ART = {
  css: `/* ==========================================================================
   dsh-pixel-whale-pet · Deepy-style pixel whale — artwork skin & state choreography
   --------------------------------------------------------------------------
   Redrawn against the DSH Go sprite family: 1 logical sprite pixel = 2x2 px,
   96x96 viewBox. The engine owns the .dsh-whale box (position, translate,
   scaleX flip) and inserts ART.svg into .dsh-whale-art; only inner groups are
   animated here. Animated groups are laid out in viewBox coordinates and are
   driven around explicit pivots (translate/rotate/translate chains).
   Palette: #4E6FFF body · #142660 ink · #FFFFFF/#BEE1FF belly · #FFD447
            yellow · #F2A20C amber · #FF8A3D orange · #FF4D5E red
            #FF8FB8 pink · #9D7BFF notes · #35D07F green · #7FDBFF water
            #A7B0CC/#5B6488 grey chrome · #222A4E screen · #B81E36 dark red
   ========================================================================== */

/* --- 1. frame, svg, deterministic pivots -------------------------------- */
.dsh-whale .dsh-whale-art { display: block; width: 100%; height: 100%; overflow: visible; }
.dsh-whale .dsh-whale-art svg {
  display: block; width: 100%; height: 100%; overflow: visible; image-rendering: pixelated;
}
.dsh-whale .dsh-whale-art [id^="dw-"] { transform-box: view-box; transform-origin: 0 0; }

/* --- 2. layer routing: which pixels belong to which pose ----------------- */
.dsh-whale .dw-only,
.dsh-whale .dw-alt { display: none; }
.dsh-whale.is-idle .dw-on-idle,
.dsh-whale.is-thinking .dw-on-thinking,
.dsh-whale.is-writing .dw-on-writing,
.dsh-whale.is-tool .dw-on-tool,
.dsh-whale.is-waiting .dw-on-waiting,
.dsh-whale.is-done .dw-on-done,
.dsh-whale.is-error .dw-on-error,
.dsh-whale.is-sleeping .dw-on-sleeping,
.dsh-whale.is-splash .dw-on-splash,
.dsh-whale.is-poke .dw-on-poke,
.dsh-whale.is-music .dw-on-music,
.dsh-whale.is-hop .dw-on-hop,
.dsh-whale.is-drag .dw-on-drag,
.dsh-whale.is-drowsy .dw-on-drowsy,
.dsh-whale.is-fast .dw-on-fast { display: inline; }
/* expression states replace the neutral dot-eyes face */
.dsh-whale.is-thinking #dw-face,
.dsh-whale.is-tool #dw-face,
.dsh-whale.is-done #dw-face,
.dsh-whale.is-error #dw-face,
.dsh-whale.is-sleeping #dw-face,
.dsh-whale.is-splash #dw-face,
.dsh-whale.is-poke #dw-face,
.dsh-whale.is-music #dw-face,
.dsh-whale.is-hop #dw-face,
.dsh-whale.is-drag #dw-face,
.dsh-whale.is-drowsy #dw-face { display: none; }
.dsh-whale.is-done #dw-mouth-smile,
.dsh-whale.is-error #dw-mouth-smile,
.dsh-whale.is-splash #dw-mouth-smile,
.dsh-whale.is-poke #dw-mouth-smile,
.dsh-whale.is-music #dw-mouth-smile,
.dsh-whale.is-hop #dw-mouth-smile,
.dsh-whale.is-drag #dw-mouth-smile { display: none; }

/* --- 3. idle (ref: idle): very slow float, slow tail, rare blink --------- */
.dsh-whale.is-idle #dw-bob { animation: dw-bob 5.6s ease-in-out infinite; }
.dsh-whale.is-idle #dw-tail-blades { animation: dw-tail 3.8s ease-in-out infinite; }
/* idle keeps the neutral reference face: eyes + blink, no mouth */
.dsh-whale.is-idle #dw-mouth-smile { display: none; }
.dsh-whale.is-idle #dw-face { animation: dw-blink-open 6s steps(1, end) infinite; }
.dsh-whale.is-idle #dw-face-blink { animation: dw-blink-shut 6s steps(1, end) infinite; }
@keyframes dw-bob {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -2px); }
}
@keyframes dw-tail {
  0%, 100% { transform: translate(56px, 80px) rotate(10deg) translate(-56px, -80px); }
  50% { transform: translate(56px, 80px) rotate(-10deg) translate(-56px, -80px); }
}
@keyframes dw-blink-open {
  0%, 93%, 100% { opacity: 1; }
  95%, 97% { opacity: 0; }
}
@keyframes dw-blink-shut {
  0%, 93%, 100% { opacity: 0; }
  95%, 97% { opacity: 1; }
}

/* --- 4. drowsy (half-lidded eyes, very slow sway) ------------------------ */
.dsh-whale.is-drowsy #dw-bob { animation: dw-bob 5.2s ease-in-out infinite; }
.dsh-whale.is-drowsy #dw-tail-blades { animation: dw-tail 4s ease-in-out infinite; }

/* --- 5. thinking (ref: thinking): same calm face as idle + thought cloud -- */
.dsh-whale.is-thinking #dw-bob { animation: dw-bob-think 4.2s ease-in-out infinite; }
/* Reference thinking frame keeps the neutral dot eyes and the small smile:
   the up-looking dashes + animated mouth made the white chin read as a beard. */
.dsh-whale.is-thinking #dw-face { display: inline; animation: dw-blink-open 4s steps(1, end) infinite; }
.dsh-whale.is-thinking #dw-face-up { display: none; }
.dsh-whale.is-thinking #dw-face-up-blink { animation: dw-blink-shut 4s steps(1, end) infinite; }
.dsh-whale.is-thinking #dw-mouth-smile { display: none; }
/* quiet talking: small smile that briefly opens (never wide) */
/* quiet talking: open/close, open/close, then hold the smile for a beat */
.dsh-whale.is-thinking #dw-mouth-think-closed { display: inline; animation: dw-think-smile 4.8s steps(1, end) infinite; }
.dsh-whale.is-thinking #dw-mouth-think-open { display: inline; animation: dw-think-open 4.8s steps(1, end) infinite; }
.dsh-whale.is-thinking #dw-mouth-think-line { display: inline; animation: dw-think-line 4.8s steps(1, end) infinite; }
/* three open/close beats, then a longer smile */
@keyframes dw-think-smile {
  0%, 47% { opacity: 0; }
  48%, 100% { opacity: 1; }
}
@keyframes dw-think-open {
  0%, 7% { opacity: 1; }
  8%, 15% { opacity: 0; }
  16%, 23% { opacity: 1; }
  24%, 31% { opacity: 0; }
  32%, 39% { opacity: 1; }
  40%, 100% { opacity: 0; }
}
@keyframes dw-think-line {
  0%, 7% { opacity: 0; }
  8%, 15% { opacity: 1; }
  16%, 23% { opacity: 0; }
  24%, 31% { opacity: 1; }
  32%, 39% { opacity: 0; }
  40%, 47% { opacity: 1; }
  48%, 100% { opacity: 0; }
}
.dsh-whale.is-thinking #dw-cloud { animation: dw-cloud-float 3.2s ease-in-out infinite; }
.dsh-whale.is-thinking #dw-formula1 { animation: dw-formula 2.8s ease-in-out 0.00s infinite; }
.dsh-whale.is-thinking #dw-formula2 { animation: dw-formula 2.8s ease-in-out 0.38s infinite; }
.dsh-whale.is-thinking #dw-formula3 { animation: dw-formula 2.8s ease-in-out 0.76s infinite; }
.dsh-whale.is-thinking #dw-formula4 { animation: dw-formula 2.8s ease-in-out 1.14s infinite; }
.dsh-whale.is-thinking #dw-formula5 { animation: dw-formula 2.8s ease-in-out 1.52s infinite; }
.dsh-whale.is-thinking #dw-formula6 { animation: dw-formula 2.8s ease-in-out 1.90s infinite; }
.dsh-whale.is-thinking #dw-formula7 { animation: dw-formula 2.8s ease-in-out 2.28s infinite; }
@keyframes dw-formula {
  0% { transform: translate(0, 6px); opacity: 0; }
  15% { opacity: 1; }
  50% { transform: translate(-2px, -5px); opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(2px, -16px); opacity: 0; }
}
@keyframes dw-bob-think {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -1px); }
}
@keyframes dw-cloud-float {
  0%, 100% { transform: translate(0, 0); opacity: 0.9; }
  50% { transform: translate(0, -2px); opacity: 1; }
}
@keyframes dw-float {
  0%, 100% { transform: translate(0, 0); opacity: 0.5; }
  50% { transform: translate(0, -3px); opacity: 1; }
}

/* --- 6. writing (ref: typing): open laptop + typing flippers -------------- */
.dsh-whale.is-writing #dw-bob { animation: dw-typing 0.5s steps(2, end) infinite; }
.dsh-whale.is-writing #dw-tail-blades { animation: dw-tail-soft 1.6s ease-in-out infinite; }
.dsh-whale.is-writing #dw-fin-l { animation: dw-type-fin 0.36s steps(1, end) infinite; }
.dsh-whale.is-writing #dw-fin-r { animation: dw-type-fin 0.36s steps(1, end) 0.18s infinite; }
.dsh-whale.is-writing #dw-code-a { animation: dw-flicker 0.9s steps(1, end) infinite; }
.dsh-whale.is-writing #dw-code-b { animation: dw-flicker 0.8s steps(1, end) 0.15s infinite; }
.dsh-whale.is-writing #dw-code-c { animation: dw-flicker 0.7s steps(1, end) 0.3s infinite; }
.dsh-whale.is-writing #dw-cursor { animation: dw-cursor 0.8s steps(1, end) infinite; }
.dsh-whale.is-writing #dw-spark1 { animation: dw-spark-up 1.6s linear infinite; }
.dsh-whale.is-writing #dw-spark2 { animation: dw-spark-up 1.6s linear 0.4s infinite; }
.dsh-whale.is-writing #dw-spark3 { animation: dw-spark-up 1.6s linear 0.8s infinite; }
@keyframes dw-typing {
  0% { transform: translate(12px, 0); }
  100% { transform: translate(12px, -2px); }
}
@keyframes dw-type-fin {
  0%, 49% { transform: translate(0, 0); }
  50%, 100% { transform: translate(0, -2px); }
}
@keyframes dw-tail-soft {
  0%, 100% { transform: translate(56px, 80px) rotate(7deg) translate(-56px, -80px); }
  50% { transform: translate(56px, 80px) rotate(-7deg) translate(-56px, -80px); }
}
@keyframes dw-flicker {
  0%, 100% { opacity: 1; }
  55% { opacity: 0.25; }
}
@keyframes dw-cursor {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes dw-spark-up {
  0% { transform: translate(0, 2px); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translate(-4px, -12px); opacity: 0; }
}

/* --- 7. tool (wall + hammer): the calf hammers the striped wall ------- */
.dsh-whale.is-tool #dw-bob { animation: dw-tool-lean 1.1s ease-in-out infinite; }
.dsh-whale.is-tool #dw-chart { animation: dw-tool-wall 1.1s ease-in-out infinite; }
.dsh-whale.is-tool #dw-hammer { animation: dw-tool-hammer 0.18s linear infinite; }
.dsh-whale.is-tool #dw-tool-sparks { animation: dw-tool-flash 1.1s steps(1, end) infinite; }
.dsh-whale.is-tool #dw-mouth-smile { display: none; }
@keyframes dw-tool-lean {
  0%, 26%, 52%, 100% { transform: translate(0, 0) rotate(0deg); }
  32%, 42% { transform: translate(48px, 80px) translate(-1px, 1px) rotate(-1.2deg) translate(-48px, -80px); }
}
@keyframes dw-tool-wall {
  0%, 28%, 50%, 100% { transform: translate(0, 0); }
  32%, 42% { transform: translate(-2px, 0); }
}
@keyframes dw-tool-hammer {
  0%, 100% { transform: translate(8px, 72px) rotate(0.9deg) translate(-8px, -72px); }
  25% { transform: translate(8px, 72px) rotate(-1.1deg) translate(-8px, -72px); }
  50% { transform: translate(8px, 72px) rotate(1.3deg) translate(-8px, -72px); }
  75% { transform: translate(8px, 72px) rotate(-0.7deg) translate(-8px, -72px); }
}
@keyframes dw-tool-flash {
  0%, 26% { opacity: 0; }
  30%, 40% { opacity: 1; }
  46%, 100% { opacity: 0; }
}

/* --- 8. waiting (ref: notification): big "!" bubble + waving flipper ---- */
.dsh-whale.is-waiting #dw-bob { animation: dw-bob 2.6s ease-in-out infinite; }
.dsh-whale.is-waiting #dw-bubble { animation: dw-bubble-bounce 1.4s ease-in-out infinite; }
.dsh-whale.is-waiting #dw-tick1 { animation: dw-flicker 1.2s steps(1, end) infinite; }
.dsh-whale.is-waiting #dw-tick2 { animation: dw-flicker 1.2s steps(1, end) 0.4s infinite; }
.dsh-whale.is-waiting #dw-tick3 { animation: dw-flicker 1.2s steps(1, end) 0.8s infinite; }
.dsh-whale.is-waiting #dw-wavefin { animation: dw-wave 0.8s ease-in-out infinite; }
@keyframes dw-bubble-bounce {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -6px); }
}
@keyframes dw-wave {
  0%, 100% { transform: translate(44px, 70px) rotate(-14deg) translate(-44px, -70px); }
  50% { transform: translate(44px, 70px) rotate(8deg) translate(-44px, -70px); }
}

/* --- 9. done (ref: happy): squint eyes, blush, sparkles ------------------ */
.dsh-whale.is-done #dw-bob { animation: dw-hop 1s ease-in-out infinite; }
.dsh-whale.is-done #dw-tail-blades { animation: dw-tail-soft 0.9s ease-in-out infinite; }
.dsh-whale.is-done #dw-sparkle1 { animation: dw-twinkle 1.6s steps(1, end) infinite; }
.dsh-whale.is-done #dw-sparkle2 { animation: dw-twinkle 1.6s steps(1, end) 0.3s infinite; }
.dsh-whale.is-done #dw-sparkle3 { animation: dw-twinkle 1.6s steps(1, end) 0.6s infinite; }
.dsh-whale.is-done #dw-sparkle4 { animation: dw-twinkle 1.6s steps(1, end) 0.9s infinite; }
.dsh-whale.is-done #dw-confetti { animation: dw-twinkle 1.2s steps(1, end) infinite; }
/* one big multi-coloured salute: rises, bangs and scatters */
.dsh-whale.is-done #dw-fw-launch { animation: dw-fw-launch 2.8s ease-out both; transform-box: fill-box; transform-origin: center; }
.dsh-whale.is-done #dw-fw-flash { animation: dw-fw-flash 2.8s steps(1, end) both; transform-box: fill-box; transform-origin: center; }
.dsh-whale.is-done .dw-fw-ray { animation: dw-fw-ray 2.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.dsh-whale.is-done .dw-fw-ray2 { animation: dw-fw-ray 2.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
@keyframes dw-fw-launch {
  0% { transform: translate(0, 34px) rotate(0deg); opacity: 0; }
  6% { opacity: 1; }
  30% { transform: translate(0, 2px) rotate(170deg); opacity: 0; }
  100% { transform: translate(0, 2px) rotate(170deg); opacity: 0; }
}
@keyframes dw-fw-flash {
  0%, 29% { opacity: 0; transform: scale(0.2); }
  33% { opacity: 1; transform: scale(2.2); }
  43% { opacity: 0; transform: scale(2.8); }
  100% { opacity: 0; }
}
@keyframes dw-fw-ray {
  0%, 29% { transform: translate(0, 0); opacity: 0; }
  34% { opacity: 1; }
  56% { transform: translate(var(--fw-dx), var(--fw-dy)); opacity: 1; }
  100% { transform: translate(calc(var(--fw-dx) * 1.06), calc(var(--fw-dy) + 18px)); opacity: 0; }
}
@keyframes dw-hop {
  0%, 100% { transform: translate(0, 0) scale(1); }
  30% { transform: translate(0, -3px) scale(1); }
  60% { transform: translate(0, 0) scale(1.03, 0.97); }
}
@keyframes dw-twinkle {
  0%, 100% { opacity: 1; transform: translate(0, 0); }
  50% { opacity: 0.2; transform: translate(0, -2px); }
}

/* --- 10. error (ref: error): grey rain cloud, falling drops, sad face ---- */
.dsh-whale.is-error #dw-bob { animation: dw-sad 3.6s ease-in-out infinite; }
.dsh-whale.is-error #dw-err-cloud { animation: dw-cloud-float 4s ease-in-out infinite; }
.dsh-whale.is-error #dw-drop1 { animation: dw-drop-fall 2.4s ease-in infinite; }
.dsh-whale.is-error #dw-drop2 { animation: dw-drop-fall 2.4s ease-in 0.5s infinite; }
.dsh-whale.is-error #dw-drop3 { animation: dw-drop-fall 2.4s ease-in 1s infinite; }
@keyframes dw-sad {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(0, 2px) rotate(1deg); }
}
@keyframes dw-drop-fall {
  0% { transform: translate(0, 0); opacity: 0; }
  20% { opacity: 1; }
  85% { transform: translate(0, 8px); opacity: 1; }
  100% { transform: translate(0, 11px); opacity: 0; }
}

/* --- 11. sleeping (no cap by request): closed eyes + Zzz ---------------- */
.dsh-whale.is-sleeping #dw-bob { animation: dw-sleep 4.2s ease-in-out infinite; }
.dsh-whale.is-sleeping #dw-tail-blades { animation: dw-tail-sleep 4s ease-in-out infinite; }
.dsh-whale.is-sleeping #dw-z1 { animation: dw-z-rise 3.4s linear infinite; }
.dsh-whale.is-sleeping #dw-z2 { animation: dw-z-rise 3.4s linear 0.7s infinite; }
.dsh-whale.is-sleeping #dw-z3 { animation: dw-z-rise 3.8s linear 1.4s infinite; }
/* no mouth while asleep, and one eye occasionally peeks open */
.dsh-whale.is-sleeping #dw-mouth-smile { display: none; }
/* one eye open, the other closed for 5s, then open for 5s */
.dsh-whale.is-drowsy #dw-drowsy-eye-closed { animation: dw-eye-cycle-closed 10s steps(1, end) infinite; }
.dsh-whale.is-drowsy #dw-drowsy-eye-open { animation: dw-eye-cycle-open 10s steps(1, end) infinite; }
@keyframes dw-eye-cycle-closed {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes dw-eye-cycle-open {
  0%, 49% { opacity: 0; }
  50%, 100% { opacity: 1; }
}
@keyframes dw-sleep {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, 2px); }
}
@keyframes dw-tail-sleep {
  0%, 100% { transform: translate(56px, 80px) rotate(4deg) translate(-56px, -80px); }
  50% { transform: translate(56px, 80px) rotate(-4deg) translate(-56px, -80px); }
}
@keyframes dw-z-rise {
  0% { transform: translate(0, 4px); opacity: 0; }
  15% { opacity: 1; }
  100% { transform: translate(4px, -10px); opacity: 0; }
}

/* --- 12. splash (ref: idle-spout): two diverging water jets + crown ----- */
.dsh-whale.is-splash #dw-bob { animation: dw-splash-tilt 2.6s ease-in-out infinite; }
/* fountain: a short puff, then a tall willow-like spout that bursts up */
.dsh-whale.is-splash #dw-spout { animation: none; }
.dsh-whale.is-splash #dw-spout-small { animation: dw-spout-small 3.2s steps(1, end) both; }
.dsh-whale.is-splash #dw-spout-big { animation: dw-spout-big 3.2s ease-out both; transform-box: fill-box; transform-origin: 34px 56px; }
.dsh-whale.is-splash #dw-sdrop1 { animation: dw-sdrop 3.2s ease-out both; }
.dsh-whale.is-splash #dw-sdrop2 { animation: dw-sdrop 3.2s ease-out 0.15s both; }
.dsh-whale.is-splash #dw-sdrop3 { animation: dw-sdrop 3.2s ease-out 0.3s both; }
.dsh-whale.is-splash #dw-sdrop4 { animation: dw-sdrop 3.2s ease-out 0.45s both; }
.dsh-whale.is-splash #dw-sdrop5 { animation: dw-sdrop 3.2s ease-out 0.6s both; }
.dsh-whale.is-splash #dw-sdrop6 { animation: dw-sdrop 3.2s ease-out 0.75s both; }
@keyframes dw-spout-small {
  0%, 14% { opacity: 1; }
  18%, 100% { opacity: 0; }
}
@keyframes dw-spout-big {
  0%, 14% { opacity: 0; transform: scale(0.15, 0.12); }
  24% { opacity: 1; transform: scale(0.72, 0.55); }
  38%, 80% { opacity: 1; transform: scale(1, 1); }
  92%, 100% { opacity: 0; transform: scale(1.06, 1.02); }
}
@keyframes dw-splash-tilt {
  0%, 100% { transform: translate(48px, 80px) rotate(-1.5deg) translate(-48px, -80px); }
  50% { transform: translate(48px, 80px) rotate(1.5deg) translate(-48px, -80px); }
}

@keyframes dw-sdrop {
  0% { transform: translate(0, 4px); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translate(-3px, -14px); opacity: 0; }
}

/* --- 13. poke (ref: react-double): hearts, blush, fluster ---------------- */
.dsh-whale.is-poke #dw-bob { animation: dw-jolt 1s steps(2, end) infinite; }
.dsh-whale.is-poke #dw-heart1 { animation: dw-heart-float 1.8s ease-out infinite; }
.dsh-whale.is-poke #dw-heart2 { animation: dw-heart-float 1.8s ease-out 0.5s infinite; }
.dsh-whale.is-poke #dw-heart3 { animation: dw-heart-float 1.8s ease-out 1s infinite; }
/* the warm halo only appears when the whale wakes up from sleep */
.dsh-whale.is-poke #dw-glow { display: none; }
.dsh-whale.is-wake #dw-glow { display: inline; animation: dw-glow-pulse 1.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes dw-glow-pulse {
  0%, 100% { opacity: 0.25; transform: scale(0.98); }
  50% { opacity: 0.85; transform: scale(1.03); }
}
.dsh-whale.is-poke #dw-flust1 { animation: dw-flicker 0.9s steps(1, end) infinite; }
.dsh-whale.is-poke #dw-flust2 { animation: dw-flicker 0.9s steps(1, end) 0.3s infinite; }
.dsh-whale.is-poke #dw-flust3 { animation: dw-flicker 0.9s steps(1, end) 0.6s infinite; }
@keyframes dw-jolt {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-2px, -2px); }
  40% { transform: translate(1px, 1px); }
  100% { transform: translate(0, 0); }
}
@keyframes dw-heart-float {
  0% { transform: translate(0, 2px) scale(0.7); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translate(3px, -14px) scale(1.1); opacity: 0; }
}

/* --- 14. music (ref: music): headphones, notes, swaying ----------------- */
.dsh-whale.is-music #dw-bob { animation: dw-sway 3s ease-in-out infinite; }
.dsh-whale.is-music #dw-tail-blades { animation: dw-tail-sleep 3s ease-in-out infinite; }
.dsh-whale.is-music #dw-note1 { animation: dw-note-float 2.4s ease-out infinite; }
.dsh-whale.is-music #dw-note2 { animation: dw-note-float 2.4s ease-out 0.6s infinite; }
.dsh-whale.is-music #dw-note3 { animation: dw-note-float 2.4s ease-out 1.2s infinite; }
@keyframes dw-sway {
  0%, 100% { transform: translate(48px, 80px) rotate(-1.5deg) translate(-48px, -80px); }
  50% { transform: translate(48px, 80px) rotate(1.5deg) translate(-48px, -80px); }
}
@keyframes dw-note-float {
  0% { transform: translate(0, 2px); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translate(2px, -12px); opacity: 0; }
}

/* --- 15. hop: jump with stretch + landing squash ------------------------ */
.dsh-whale.is-hop #dw-bob { animation: dw-jump 1.05s cubic-bezier(.3, 0, .4, 1) infinite; }
.dsh-whale.is-hop #dw-tail-blades { animation: dw-tail-soft 0.7s ease-in-out infinite; }
@keyframes dw-jump {
  0% { transform: translate(48px, 84px) translateY(0) scale(1, 1) translate(-48px, -84px); }
  18% { transform: translate(48px, 84px) translateY(1px) scale(1.06, 0.94) translate(-48px, -84px); }
  42% { transform: translate(48px, 84px) translateY(-8px) scale(0.95, 1.05) translate(-48px, -84px); }
  62% { transform: translate(48px, 84px) translateY(-1px) scale(1.01, 0.99) translate(-48px, -84px); }
  78% { transform: translate(48px, 84px) translateY(0) scale(1.07, 0.93) translate(-48px, -84px); }
  100% { transform: translate(48px, 84px) translateY(0) scale(1, 1) translate(-48px, -84px); }
}

/* --- 16. drag: startled face, spread flippers, nervous shake ------------- */
.dsh-whale.is-drag #dw-bob { animation: dw-drag-bob 0.5s steps(2, end) infinite; }
.dsh-whale.is-drag #dw-rig { animation: dw-drag-shake 0.24s steps(2, end) infinite; }
.dsh-whale.is-drag #dw-mouth-smile { display: none; }
.dsh-whale.is-drag #dw-mouth-drag-closed { animation: dw-drag-mouth-closed 0.8s steps(1, end) infinite; }
.dsh-whale.is-drag #dw-mouth-drag-open { animation: dw-drag-mouth-open 0.8s steps(1, end) infinite; }
@keyframes dw-drag-mouth-closed {
  0%, 42% { opacity: 1; }
  47%, 92% { opacity: 0; }
  97%, 100% { opacity: 1; }
}
@keyframes dw-drag-mouth-open {
  0%, 42% { opacity: 0; }
  47%, 92% { opacity: 1; }
  97%, 100% { opacity: 0; }
}
@keyframes dw-drag-bob {
  0% { transform: translate(0, -1px); }
  100% { transform: translate(0, 1px); }
}
@keyframes dw-drag-shake {
  0% { transform: translate(-2px, 0); }
  50% { transform: translate(2px, -1px); }
  100% { transform: translate(-2px, 0); }
}
@keyframes dw-flail {
  0%, 100% { transform: translate(48px, 70px) rotate(-6deg) translate(-48px, -70px); }
  50% { transform: translate(48px, 70px) rotate(6deg) translate(-48px, -70px); }
}

/* --- 17. fast: nose tilt + very quick tail wag (composes with a state) --- */
.dsh-whale.is-fast #dw-rig {
  animation: dw-fast-tilt 0.7s ease-in-out infinite alternate;
}
.dsh-whale.is-fast #dw-tail-blades {
  animation: dw-tail-fast 0.35s ease-in-out infinite;
}
.dsh-whale.is-fast #dw-wake1 { animation: dw-wake 0.8s linear infinite; }
.dsh-whale.is-fast #dw-wake2 { animation: dw-wake 0.8s linear 0.2s infinite; }
.dsh-whale.is-fast #dw-wake3 { animation: dw-wake 0.8s linear 0.4s infinite; }
@keyframes dw-fast-tilt {
  0% { transform: translate(48px, 80px) rotate(-6deg) translate(-48px, -80px); }
  100% { transform: translate(48px, 80px) rotate(-3.5deg) translate(-48px, -80px); }
}
@keyframes dw-tail-fast {
  0%, 100% { transform: translate(56px, 80px) rotate(14deg) translate(-56px, -80px); }
  50% { transform: translate(56px, 80px) rotate(-14deg) translate(-56px, -80px); }
}
@keyframes dw-wake {
  0% { transform: translate(0, 0); opacity: 0; }
  30% { opacity: 0.9; }
  100% { transform: translate(-10px, 0); opacity: 0; }
}

/* --- 18. particle layer (engine-appended spans) ------------------------- */
.dsh-whale .dsh-whale-fx {
  position: absolute; left: 0; top: 0; width: 100%; height: 100%;
  overflow: visible; pointer-events: none;
}
.dsh-whale .dsh-whale-fx > span {
  position: absolute; display: block; width: 2px; height: 2px;
  animation-duration: 1.4s; animation-timing-function: ease-out;
  animation-fill-mode: both; animation-iteration-count: 1;
}
.dsh-whale .dsh-whale-bubble {
  background: #BEE1FF;
  box-shadow: 2px 0 0 #7FDBFF, -2px 0 0 #7FDBFF, 0 2px 0 #7FDBFF, 0 -2px 0 #7FDBFF;
  animation-name: dw-fx-bubble; animation-duration: 1.5s;
}
.dsh-whale .dsh-whale-drop {
  background: #7FDBFF;
  box-shadow: 0 -2px 0 #BEE1FF, 0 2px 0 #7FDBFF;
  animation-name: dw-fx-drop; animation-duration: 1.2s;
}
.dsh-whale .dsh-whale-spark {
  background: #FFFFFF;
  box-shadow: 2px 0 0 #FFD447, -2px 0 0 #FFD447, 0 2px 0 #FFD447, 0 -2px 0 #FFD447;
  animation-name: dw-fx-spark; animation-duration: 0.9s;
}
.dsh-whale .dsh-whale-z {
  background: #A7B0CC;
  box-shadow: 2px 0 0 #A7B0CC, 4px 0 0 #A7B0CC, 2px 2px 0 #A7B0CC,
    0 4px 0 #A7B0CC, 2px 4px 0 #A7B0CC, 4px 4px 0 #A7B0CC;
  animation-name: dw-fx-z; animation-duration: 1.8s;
}
.dsh-whale .dsh-whale-z2 {
  background: #5B6488;
  box-shadow: 2px 0 0 #5B6488, 4px 0 0 #5B6488, 2px 2px 0 #5B6488,
    0 4px 0 #5B6488, 2px 4px 0 #5B6488, 4px 4px 0 #5B6488;
  animation-name: dw-fx-z; animation-duration: 2.1s;
}
.dsh-whale .dsh-whale-note {
  background: #9D7BFF;
  box-shadow: 2px 0 0 #9D7BFF, 0 2px 0 #9D7BFF, 2px 2px 0 #9D7BFF,
    4px -2px 0 #9D7BFF, 4px 0 0 #9D7BFF, 6px -2px 0 #FF8FB8;
  animation-name: dw-fx-note; animation-duration: 2s;
}
.dsh-whale .dsh-whale-ripple {
  width: 10px; height: 10px; border: 2px solid #7FDBFF;
  box-sizing: border-box; background: transparent;
  animation-name: dw-fx-ripple; animation-duration: 1.1s;
}
@keyframes dw-fx-bubble {
  0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
  15% { opacity: 1; }
  100% { transform: translate(2px, -16px) scale(1.1); opacity: 0; }
}
@keyframes dw-fx-drop {
  0% { transform: translate(0, 0); opacity: 0; }
  15% { opacity: 1; }
  100% { transform: translate(1px, 14px); opacity: 0; }
}
@keyframes dw-fx-spark {
  0% { transform: scale(0.4); opacity: 0; }
  25% { transform: scale(1); opacity: 1; }
  70% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(0.2) translate(0, -6px); opacity: 0; }
}
@keyframes dw-fx-z {
  0% { transform: translate(0, 2px) scale(0.7); opacity: 0; }
  20% { opacity: 0.9; }
  100% { transform: translate(6px, -18px) scale(1.15); opacity: 0; }
}
.dsh-whale .dsh-whale-heart {
  background: #FF8FB8;
  box-shadow: -2px -2px 0 #FF8FB8, 2px -2px 0 #FF8FB8,
    -4px 0 0 #FF8FB8, -2px 0 0 #FF8FB8, 0 0 0 #FF8FB8, 2px 0 0 #FF8FB8, 4px 0 0 #FF8FB8,
    -2px 2px 0 #FF8FB8, 0 2px 0 #FF8FB8, 2px 2px 0 #FF8FB8, 0 4px 0 #FF8FB8;
  animation-name: dw-fx-heart; animation-duration: 1.8s;
}
@keyframes dw-fx-heart {
  0% { transform: translate(0, 4px) scale(0.5); opacity: 0; }
  18% { opacity: 1; }
  100% { transform: translate(4px, -26px) scale(1.15); opacity: 0; }
}
@keyframes dw-fx-note {
  0% { transform: translate(0, 2px) scale(0.7); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translate(8px, -22px) scale(1.1); opacity: 0; }
}
@keyframes dw-fx-ripple {
  0% { transform: scale(0.35); opacity: 0.9; }
  100% { transform: scale(1.8); opacity: 0; }
}

/* --- 19. task progress badge (small carried card) ----------------------- */
.dsh-whale .dsh-whale-tasks {
  position: absolute; right: 0; bottom: 0;
  display: flex; gap: 2px; padding: 2px;
  background: #FFFFFF; border: 2px solid #142660;
  box-shadow: 2px 2px 0 rgba(20, 38, 96, 0.25);
}
.dsh-whale .dsh-whale-tasks[hidden] { display: none; }
.dsh-whale .dsh-whale-tasks i {
  display: block; width: 4px; height: 7px; background: #BEE1FF;
}
.dsh-whale .dsh-whale-tasks i.is-done {
  background: #35D07F;
  animation: dw-pip 2.4s steps(1, end) infinite;
}
@keyframes dw-pip {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* --- 20. reduced motion: freeze every loop, keep the static poses ------- */
@media (prefers-reduced-motion: reduce) {
  .dsh-whale,
  .dsh-whale * { animation: none !important; transition: none !important; }
  .dsh-whale .dsh-whale-fx > span { opacity: 0 !important; }
  .dsh-whale .dsh-whale-art #dw-face-blink { opacity: 0 !important; }
  .dsh-whale .dsh-whale-art #dw-firework { opacity: 0 !important; }
  .dsh-whale .dsh-whale-art #dw-spout-big { opacity: 0 !important; }
  .dsh-whale .dsh-whale-art #dw-glow { opacity: 0 !important; }
  .dsh-whale .dsh-whale-art #dw-face-up-blink, .dsh-whale .dsh-whale-art #dw-mouth-think-open { opacity: 0 !important; }
  .dsh-whale .dsh-whale-art #dw-mouth-think-line { opacity: 0 !important; }
  .dsh-whale .dsh-whale-art #dw-drowsy-eye-closed { opacity: 0 !important; }
}`,
  svg: ` <svg class="dsh-whale-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" shape-rendering="auto" aria-hidden="true" focusable="false">
  <g id="dw-bob">
  <g id="dw-rig">
    
    <g id="dw-body"><path d="M24 56h18v2h-18zM22 58h2v2h-2zM42 58h4v2h-4zM20 60h2v2h-2zM46 60h4v2h-4zM18 62h2v2h-2zM50 62h4v2h-4zM16 64h4v2h-4zM16 66h2v2h-2zM16 68h2v2h-2zM16 70h2v2h-2zM16 72h2v2h-2zM16 74h2v2h-2zM16 76h4v2h-4zM18 78h2v2h-2zM48 78h2v2h-2zM20 80h2v2h-2zM48 80h2v2h-2zM22 82h4v2h-4zM50 82h2v2h-2zM26 84h2v2h-2zM50 84h4v2h-4zM26 86h28v2h-28z" fill="#142660"/><path d="M24 58h18v2h-18zM22 60h24v2h-24zM20 62h30v2h-30zM20 64h34v2h-34zM18 66h36v2h-36zM18 68h36v2h-36zM18 70h36v2h-36zM18 72h36v2h-36zM18 74h8v2h-8zM40 74h14v2h-14zM20 76h2v2h-2zM46 76h8v2h-8zM50 78h4v2h-4zM50 80h4v2h-4zM52 82h2v2h-2z" fill="#4E6FFF"/><path d="M26 74h14v2h-14zM22 76h24v2h-24zM24 78h24v2h-24zM28 80h20v2h-20zM32 82h12v2h-12z" fill="#FFFFFF"/><path d="M20 78h4v2h-4zM22 80h6v2h-6zM26 82h6v2h-6zM44 82h6v2h-6zM28 84h22v2h-22z" fill="#BEE1FF"/></g><g id="dw-tail"><g id="dw-tail-blades"><path d="M58 46h2v2h-2zM56 48h2v2h-2zM60 48h2v2h-2zM76 48h2v2h-2zM56 50h2v2h-2zM62 50h2v2h-2zM74 50h2v2h-2zM78 50h2v2h-2zM56 52h2v2h-2zM64 52h2v2h-2zM70 52h4v2h-4zM78 52h2v2h-2zM56 54h2v2h-2zM66 54h4v2h-4zM78 54h2v2h-2zM58 56h2v2h-2zM76 56h2v2h-2zM60 58h2v2h-2zM76 58h2v2h-2zM60 60h2v2h-2zM72 60h4v2h-4zM62 62h2v2h-2zM70 62h2v2h-2zM54 64h2v2h-2zM60 64h2v2h-2zM70 64h2v2h-2zM56 66h4v2h-4zM70 66h2v2h-2zM70 68h2v2h-2zM68 70h2v2h-2zM68 72h2v2h-2zM56 74h2v2h-2zM66 74h2v2h-2zM58 76h2v2h-2zM66 76h2v2h-2zM58 78h4v2h-4zM64 78h2v2h-2zM60 80h4v2h-4zM62 82h4v2h-4zM66 84h2v2h-2z" fill="#142660"/><path d="M58 48h2v2h-2zM58 50h4v2h-4zM76 50h2v2h-2zM58 52h6v2h-6zM74 52h4v2h-4zM58 54h8v2h-8zM70 54h8v2h-8zM60 56h16v2h-16zM62 58h14v2h-14zM62 60h10v2h-10zM64 62h6v2h-6zM62 64h8v2h-8zM54 66h2v2h-2zM60 66h10v2h-10zM54 68h16v2h-16zM54 70h14v2h-14zM54 72h14v2h-14zM54 74h2v2h-2zM58 74h8v2h-8zM54 76h4v2h-4zM60 76h6v2h-6zM54 78h4v2h-4zM62 78h2v2h-2zM54 80h6v2h-6zM54 82h8v2h-8zM54 84h12v2h-12z" fill="#4E6FFF"/></g></g><g id="dw-tail-fill"><rect x="62" y="58" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="58" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="58" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="60" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="60" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="60" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="60" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="80" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="80" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="80" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="80" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="82" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="82" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="82" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="82" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="82" width="2" height="2" fill="#4E6FFF"/></g>
    <g id="dw-hammer" class="dw-only dw-on-tool"><rect x="4" y="76" width="18" height="8" fill="#142660"/><rect x="6" y="78" width="14" height="4" fill="#A7B0CC"/><rect x="6" y="78" width="8" height="2" fill="#FFFFFF"/><rect x="18" y="80" width="4" height="2" fill="#5B6488"/><rect x="18" y="72" width="10" height="16" fill="#142660"/><rect x="20" y="74" width="6" height="12" fill="#5B6488"/><rect x="20" y="74" width="4" height="2" fill="#A7B0CC"/><rect x="28" y="70" width="18" height="20" fill="#142660"/><rect x="30" y="72" width="14" height="16" fill="#5B6488"/><rect x="30" y="72" width="14" height="4" fill="#A7B0CC"/><rect x="32" y="73" width="6" height="2" fill="#FFFFFF"/><rect x="30" y="82" width="14" height="6" fill="#222A4E"/><rect x="32" y="84" width="4" height="2" fill="#5B6488"/><g id="dw-handle-loop"><rect x="50" y="68" width="2" height="2" fill="#142660"/><rect x="52" y="68" width="2" height="2" fill="#142660"/><rect x="54" y="68" width="2" height="2" fill="#142660"/><rect x="56" y="68" width="2" height="2" fill="#142660"/><rect x="46" y="70" width="2" height="2" fill="#142660"/><rect x="48" y="70" width="2" height="2" fill="#142660"/><rect x="50" y="70" width="2" height="2" fill="#5B6488"/><rect x="52" y="70" width="2" height="2" fill="#5B6488"/><rect x="54" y="70" width="2" height="2" fill="#5B6488"/><rect x="56" y="70" width="2" height="2" fill="#5B6488"/><rect x="58" y="70" width="2" height="2" fill="#142660"/><rect x="60" y="70" width="2" height="2" fill="#142660"/><rect x="46" y="72" width="2" height="2" fill="#142660"/><rect x="48" y="72" width="2" height="2" fill="#5B6488"/><rect x="50" y="72" width="2" height="2" fill="#5B6488"/><rect x="52" y="72" width="2" height="2" fill="#5B6488"/><rect x="54" y="72" width="2" height="2" fill="#5B6488"/><rect x="56" y="72" width="2" height="2" fill="#5B6488"/><rect x="58" y="72" width="2" height="2" fill="#5B6488"/><rect x="60" y="72" width="2" height="2" fill="#142660"/><rect x="44" y="74" width="2" height="2" fill="#142660"/><rect x="46" y="74" width="2" height="2" fill="#5B6488"/><rect x="48" y="74" width="2" height="2" fill="#5B6488"/><rect x="58" y="74" width="2" height="2" fill="#5B6488"/><rect x="60" y="74" width="2" height="2" fill="#5B6488"/><rect x="62" y="74" width="2" height="2" fill="#142660"/><rect x="44" y="76" width="2" height="2" fill="#142660"/><rect x="46" y="76" width="2" height="2" fill="#5B6488"/><rect x="48" y="76" width="2" height="2" fill="#5B6488"/><rect x="58" y="76" width="2" height="2" fill="#5B6488"/><rect x="60" y="76" width="2" height="2" fill="#5B6488"/><rect x="62" y="76" width="2" height="2" fill="#142660"/><rect x="44" y="78" width="2" height="2" fill="#142660"/><rect x="46" y="78" width="2" height="2" fill="#5B6488"/><rect x="48" y="78" width="2" height="2" fill="#5B6488"/><rect x="58" y="78" width="2" height="2" fill="#5B6488"/><rect x="60" y="78" width="2" height="2" fill="#5B6488"/><rect x="62" y="78" width="2" height="2" fill="#142660"/><rect x="44" y="80" width="2" height="2" fill="#142660"/><rect x="46" y="80" width="2" height="2" fill="#5B6488"/><rect x="48" y="80" width="2" height="2" fill="#5B6488"/><rect x="58" y="80" width="2" height="2" fill="#5B6488"/><rect x="60" y="80" width="2" height="2" fill="#5B6488"/><rect x="62" y="80" width="2" height="2" fill="#142660"/><rect x="46" y="82" width="2" height="2" fill="#142660"/><rect x="48" y="82" width="2" height="2" fill="#5B6488"/><rect x="50" y="82" width="2" height="2" fill="#5B6488"/><rect x="52" y="82" width="2" height="2" fill="#5B6488"/><rect x="54" y="82" width="2" height="2" fill="#5B6488"/><rect x="56" y="82" width="2" height="2" fill="#5B6488"/><rect x="58" y="82" width="2" height="2" fill="#5B6488"/><rect x="60" y="82" width="2" height="2" fill="#142660"/><rect x="46" y="84" width="2" height="2" fill="#142660"/><rect x="48" y="84" width="2" height="2" fill="#142660"/><rect x="50" y="84" width="2" height="2" fill="#5B6488"/><rect x="52" y="84" width="2" height="2" fill="#5B6488"/><rect x="54" y="84" width="2" height="2" fill="#5B6488"/><rect x="56" y="84" width="2" height="2" fill="#5B6488"/><rect x="58" y="84" width="2" height="2" fill="#142660"/><rect x="60" y="84" width="2" height="2" fill="#142660"/><rect x="50" y="86" width="2" height="2" fill="#142660"/><rect x="52" y="86" width="2" height="2" fill="#142660"/><rect x="54" y="86" width="2" height="2" fill="#142660"/><rect x="56" y="86" width="2" height="2" fill="#142660"/><rect x="46" y="70" width="2" height="2" fill="#A7B0CC"/><rect x="48" y="68" width="2" height="2" fill="#A7B0CC"/><rect x="50" y="74" width="2" height="2" fill="#142660"/><rect x="50" y="76" width="2" height="2" fill="#142660"/><rect x="50" y="78" width="2" height="2" fill="#142660"/><rect x="50" y="80" width="2" height="2" fill="#142660"/><rect x="52" y="74" width="2" height="2" fill="#142660"/><rect x="52" y="76" width="2" height="2" fill="#142660"/><rect x="52" y="78" width="2" height="2" fill="#142660"/><rect x="52" y="80" width="2" height="2" fill="#142660"/><rect x="54" y="74" width="2" height="2" fill="#142660"/><rect x="54" y="76" width="2" height="2" fill="#142660"/><rect x="54" y="78" width="2" height="2" fill="#142660"/><rect x="54" y="80" width="2" height="2" fill="#142660"/><rect x="56" y="74" width="2" height="2" fill="#142660"/><rect x="56" y="76" width="2" height="2" fill="#142660"/><rect x="56" y="78" width="2" height="2" fill="#142660"/><rect x="56" y="80" width="2" height="2" fill="#142660"/><rect x="58" y="74" width="2" height="2" fill="#142660"/><rect x="58" y="76" width="2" height="2" fill="#142660"/><rect x="58" y="78" width="2" height="2" fill="#142660"/><rect x="58" y="80" width="2" height="2" fill="#142660"/></g></g><g id="dw-face"><rect x="24" y="68" width="2" height="4" fill="#142660"/><rect x="38" y="68" width="2" height="4" fill="#142660"/></g>
    <g id="dw-face-blink" class="dw-alt dw-on-idle"><rect x="24" y="70" width="4" height="2" fill="#142660"/><rect x="38" y="70" width="4" height="2" fill="#142660"/></g>
    <g id="dw-face-up" class="dw-alt dw-on-thinking"><rect x="24" y="66" width="2" height="4" fill="#142660"/><rect x="38" y="66" width="2" height="4" fill="#142660"/></g><g id="dw-face-up-blink" class="dw-alt dw-on-thinking"><rect x="22" y="68" width="4" height="2" fill="#142660"/><rect x="38" y="68" width="4" height="2" fill="#142660"/></g>
    <g id="dw-face-happy" class="dw-alt dw-on-done dw-on-music dw-on-splash dw-on-hop"><rect x="24" y="68" width="2" height="2" fill="#142660"/><rect x="26" y="70" width="2" height="2" fill="#142660"/><rect x="28" y="68" width="2" height="2" fill="#142660"/><rect x="36" y="68" width="2" height="2" fill="#142660"/><rect x="38" y="70" width="2" height="2" fill="#142660"/><rect x="40" y="68" width="2" height="2" fill="#142660"/></g>
    <g id="dw-face-sad" class="dw-alt dw-on-error"><rect x="24" y="68" width="4" height="4" fill="#142660"/><rect x="24" y="68" width="2" height="2" fill="#FFFFFF"/><rect x="38" y="68" width="4" height="4" fill="#142660"/><rect x="38" y="68" width="2" height="2" fill="#FFFFFF"/><rect x="22" y="64" width="4" height="2" fill="#142660"/><rect x="38" y="64" width="4" height="2" fill="#142660"/></g>
    <g id="dw-drowsy-eye-closed" class="dw-alt dw-on-drowsy"><rect x="36" y="70" width="2" height="2" fill="#142660"/><rect x="40" y="70" width="2" height="2" fill="#142660"/></g><g id="dw-drowsy-eye-open" class="dw-alt dw-on-drowsy"><rect x="38" y="68" width="2" height="4" fill="#142660"/></g><g id="dw-face-sleep" class="dw-alt dw-on-sleeping"><rect x="22" y="70" width="8" height="2" fill="#142660"/><rect x="36" y="70" width="8" height="2" fill="#142660"/></g>
    <g id="dw-face-odd" class="dw-alt dw-on-poke"><rect x="24" y="68" width="2" height="2" fill="#142660"/><rect x="26" y="70" width="2" height="2" fill="#142660"/><rect x="24" y="72" width="2" height="2" fill="#142660"/><rect x="40" y="68" width="2" height="2" fill="#142660"/><rect x="38" y="70" width="2" height="2" fill="#142660"/><rect x="40" y="72" width="2" height="2" fill="#142660"/></g>
    <g id="dw-face-focus" class="dw-alt dw-on-tool"><rect x="24" y="68" width="2" height="4" fill="#142660"/><rect x="38" y="68" width="2" height="4" fill="#142660"/><rect x="22" y="66" width="4" height="2" fill="#142660"/><rect x="38" y="66" width="4" height="2" fill="#142660"/></g>
    <g id="dw-face-drowsy" class="dw-alt dw-on-drowsy"><rect x="24" y="68" width="2" height="4" fill="#142660"/></g>
    <g id="dw-face-drag" class="dw-alt dw-on-drag"><rect x="22" y="64" width="4" height="2" fill="#142660"/><rect x="38" y="64" width="4" height="2" fill="#142660"/><rect x="22" y="66" width="6" height="6" fill="#FFFFFF"/><rect x="24" y="68" width="2" height="2" fill="#142660"/><rect x="36" y="66" width="6" height="6" fill="#FFFFFF"/><rect x="38" y="68" width="2" height="2" fill="#142660"/><rect x="46" y="68" width="2" height="4" fill="#7FDBFF"/><rect x="46" y="68" width="2" height="2" fill="#142660"/></g>
    <g id="dw-blush" class="dw-alt dw-on-done dw-on-music dw-on-splash dw-on-poke dw-on-hop dw-on-drag"><rect x="20" y="74" width="4" height="2" fill="#FF8FB8"/><rect x="40" y="74" width="4" height="2" fill="#FF8FB8"/></g>
    <g id="dw-mouth-smile"><rect x="30" y="76" width="4" height="2" fill="#142660"/></g><g id="dw-mouth-drag-closed" class="dw-alt dw-on-drag"><rect x="28" y="76" width="10" height="2" fill="#142660"/></g><g id="dw-mouth-drag-open" class="dw-alt dw-on-drag"><rect x="26" y="72" width="14" height="10" fill="#142660"/><rect x="28" y="74" width="10" height="6" fill="#222A4E"/><rect x="28" y="74" width="10" height="2" fill="#FFFFFF"/><rect x="30" y="78" width="6" height="2" fill="#FF4D5E"/></g><g id="dw-mouth-think-closed" class="dw-alt dw-on-thinking"><rect x="30" y="74" width="2" height="2" fill="#142660"/><rect x="32" y="76" width="2" height="2" fill="#142660"/><rect x="34" y="76" width="2" height="2" fill="#142660"/><rect x="36" y="74" width="2" height="2" fill="#142660"/></g><g id="dw-mouth-think-line" class="dw-alt dw-on-thinking"><rect x="30" y="76" width="6" height="2" fill="#142660"/></g><g id="dw-mouth-think-open" class="dw-alt dw-on-thinking"><rect x="30" y="74" width="6" height="4" fill="#142660"/><rect x="32" y="76" width="2" height="2" fill="#FF8FB8"/></g>
    <g id="dw-mouth-happy" class="dw-alt dw-on-done dw-on-music dw-on-splash dw-on-hop"><rect x="30" y="76" width="2" height="2" fill="#142660"/><rect x="32" y="78" width="2" height="2" fill="#142660"/><rect x="34" y="76" width="2" height="2" fill="#142660"/></g>
    <g id="dw-mouth-frown" class="dw-alt dw-on-error"><rect x="28" y="78" width="2" height="2" fill="#142660"/><rect x="30" y="76" width="4" height="2" fill="#142660"/><rect x="34" y="78" width="2" height="2" fill="#142660"/></g>
    <g id="dw-mouth-o" class="dw-alt dw-on-poke"><rect x="30" y="76" width="4" height="4" fill="#142660"/></g>
    <g id="dw-wavefin" class="dw-only dw-on-waiting"><path d="M52 58h6v2h-6zM50 60h2v2h-2zM56 60h4v6h-4zM48 62h2v2h-2zM46 64h2v4h-2zM54 66h4v2h-4zM48 68h8v2h-8zM50 70h6v2h-6z" fill="#142660"/><path d="M52 60h4v6h-4zM50 62h2v6h-2zM48 64h2v4h-2zM52 66h2v2h-2z" fill="#4E6FFF"/></g>
    
    <g id="dw-wake" class="dw-only dw-on-fast"><g id="dw-wake1"><rect x="86" y="60" width="4" height="4" fill="#7FDBFF"/><rect x="86" y="60" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-wake2"><rect x="90" y="72" width="2" height="4" fill="#BEE1FF"/></g><g id="dw-wake3"><rect x="80" y="84" width="4" height="2" fill="#7FDBFF"/></g></g>
    <g id="dw-hat" class="dw-only dw-on-tool"><path d="M30 36h10v20h-10zM26 38h4v18h-4zM40 38h4v18h-4zM22 40h4v16h-4zM44 40h2v16h-2zM18 42h4v14h-4zM46 42h2v14h-2zM16 44h2v12h-2zM48 44h2v12h-2zM14 48h2v8h-2zM50 48h2v8h-2zM12 52h2v4h-2zM52 52h2v4h-2z" fill="#FFFFFF"/><path d="M30 38h10v16h-10zM26 40h4v14h-4zM40 40h4v14h-4zM22 42h4v12h-4zM44 42h2v12h-2zM18 44h4v10h-4zM46 44h2v10h-2zM16 48h2v6h-2zM48 48h2v6h-2zM14 52h2v2h-2zM50 52h2v2h-2z" fill="#FFD447"/><rect x="30" y="38" width="4" height="10" fill="#FFFFFF"/><rect x="42" y="44" width="4" height="8" fill="#F2A20C"/><rect x="14" y="52" width="10" height="2" fill="#F2A20C"/><rect x="14" y="54" width="2" height="2" fill="#F2A20C"/><rect x="48" y="54" width="2" height="2" fill="#F2A20C"/></g>
    <g id="dw-phones" class="dw-only dw-on-music"><path d="M24 52h2v2h-2zM22 54h2v2h-2zM20 56h2v2h-2zM18 58h2v2h-2zM26 52h2v2h-2zM28 52h2v2h-2zM30 52h2v2h-2zM32 52h2v2h-2zM34 52h2v2h-2zM36 52h2v2h-2zM38 52h2v2h-2zM40 52h2v2h-2zM42 54h2v2h-2zM44 56h2v2h-2zM46 58h2v2h-2z" fill="#222A4E"/><path d="M26 54h2v2h-2zM24 54h2v2h-2zM28 54h2v2h-2zM30 54h2v2h-2zM32 54h2v2h-2zM34 54h2v2h-2zM36 54h2v2h-2zM38 54h2v2h-2zM40 54h2v2h-2z" fill="#5B6488"/><rect x="12" y="58" width="8" height="14" fill="#142660"/><rect x="14" y="60" width="4" height="10" fill="#FF4D5E"/><rect x="14" y="60" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="66" width="2" height="2" fill="#B81E36"/><rect x="42" y="58" width="8" height="14" fill="#142660"/><rect x="44" y="60" width="4" height="10" fill="#FF4D5E"/><rect x="44" y="60" width="2" height="2" fill="#FFFFFF"/><rect x="46" y="66" width="2" height="2" fill="#B81E36"/></g>
    <g id="dw-spout" class="dw-only dw-on-splash"><g id="dw-spout-small"><rect x="30" y="46" width="2" height="10" fill="#FFFFFF"/><rect x="34" y="48" width="2" height="8" fill="#BEE1FF"/><rect x="32" y="44" width="2" height="6" fill="#FFFFFF"/><rect x="28" y="42" width="2" height="2" fill="#7FDBFF"/><rect x="38" y="42" width="2" height="2" fill="#7FDBFF"/><rect x="32" y="40" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-spout-big"><rect x="28" y="-12" width="2" height="2" fill="#7FDBFF"/><rect x="26" y="-10" width="2" height="2" fill="#7FDBFF"/><rect x="32" y="-10" width="2" height="2" fill="#FFFFFF"/><rect x="42" y="-10" width="2" height="2" fill="#BEE1FF"/><rect x="52" y="-10" width="2" height="2" fill="#FFFFFF"/><rect x="14" y="-8" width="2" height="2" fill="#FFFFFF"/><rect x="32" y="-8" width="2" height="2" fill="#BEE1FF"/><rect x="52" y="-8" width="2" height="2" fill="#BEE1FF"/><rect x="8" y="-6" width="2" height="2" fill="#BEE1FF"/><rect x="24" y="-6" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="-6" width="2" height="2" fill="#FFFFFF"/><rect x="46" y="-6" width="2" height="2" fill="#BEE1FF"/><rect x="30" y="-4" width="2" height="2" fill="#7FDBFF"/><rect x="32" y="-4" width="2" height="2" fill="#FFFFFF"/><rect x="46" y="-4" width="2" height="2" fill="#BEE1FF"/><rect x="40" y="-2" width="2" height="2" fill="#7FDBFF"/><rect x="58" y="-2" width="2" height="2" fill="#BEE1FF"/><rect x="10" y="0" width="2" height="2" fill="#BEE1FF"/><rect x="24" y="0" width="2" height="2" fill="#7FDBFF"/><rect x="30" y="0" width="2" height="2" fill="#7FDBFF"/><rect x="32" y="0" width="2" height="2" fill="#BEE1FF"/><rect x="44" y="0" width="2" height="2" fill="#BEE1FF"/><rect x="22" y="2" width="2" height="2" fill="#BEE1FF"/><rect x="28" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="48" y="2" width="2" height="2" fill="#BEE1FF"/><rect x="2" y="4" width="2" height="2" fill="#BEE1FF"/><rect x="6" y="4" width="2" height="2" fill="#7FDBFF"/><rect x="12" y="4" width="2" height="2" fill="#BEE1FF"/><rect x="14" y="6" width="2" height="2" fill="#BEE1FF"/><rect x="20" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="24" y="6" width="2" height="2" fill="#7FDBFF"/><rect x="30" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="48" y="6" width="2" height="2" fill="#BEE1FF"/><rect x="62" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="8" width="2" height="2" fill="#BEE1FF"/><rect x="22" y="8" width="2" height="2" fill="#7FDBFF"/><rect x="24" y="8" width="2" height="2" fill="#FFFFFF"/><rect x="56" y="8" width="2" height="2" fill="#BEE1FF"/><rect x="62" y="8" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="12" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="20" y="10" width="2" height="2" fill="#7FDBFF"/><rect x="22" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="24" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="26" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="40" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="42" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="44" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="46" y="10" width="2" height="2" fill="#BEE1FF"/><rect x="52" y="10" width="2" height="2" fill="#BEE1FF"/><rect x="54" y="10" width="2" height="2" fill="#BEE1FF"/><rect x="18" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="20" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="22" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="24" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="26" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="28" y="12" width="2" height="2" fill="#FFFFFF"/><rect x="30" y="12" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="12" width="2" height="2" fill="#FFFFFF"/><rect x="38" y="12" width="2" height="2" fill="#FFFFFF"/><rect x="40" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="42" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="44" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="46" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="48" y="12" width="2" height="2" fill="#BEE1FF"/><rect x="52" y="12" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="10" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="12" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="16" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="18" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="26" y="14" width="2" height="2" fill="#7FDBFF"/><rect x="28" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="30" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="14" width="2" height="2" fill="#FFFFFF"/><rect x="34" y="14" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="38" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="40" y="14" width="2" height="2" fill="#7FDBFF"/><rect x="48" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="50" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="56" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="62" y="14" width="2" height="2" fill="#BEE1FF"/><rect x="12" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="14" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="16" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="24" y="16" width="2" height="2" fill="#7FDBFF"/><rect x="26" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="28" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="30" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="36" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="38" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="40" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="42" y="16" width="2" height="2" fill="#7FDBFF"/><rect x="50" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="52" y="16" width="2" height="2" fill="#BEE1FF"/><rect x="8" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="12" y="18" width="2" height="2" fill="#FFFFFF"/><rect x="14" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="22" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="24" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="30" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="36" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="42" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="44" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="48" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="52" y="18" width="2" height="2" fill="#BEE1FF"/><rect x="54" y="18" width="2" height="2" fill="#FFFFFF"/><rect x="12" y="20" width="2" height="2" fill="#BEE1FF"/><rect x="20" y="20" width="2" height="2" fill="#BEE1FF"/><rect x="22" y="20" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="20" width="2" height="2" fill="#BEE1FF"/><rect x="36" y="20" width="2" height="2" fill="#BEE1FF"/><rect x="44" y="20" width="2" height="2" fill="#BEE1FF"/><rect x="46" y="20" width="2" height="2" fill="#BEE1FF"/><rect x="54" y="20" width="2" height="2" fill="#BEE1FF"/><rect x="8" y="22" width="2" height="2" fill="#FFFFFF"/><rect x="20" y="22" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="22" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="22" width="2" height="2" fill="#BEE1FF"/><rect x="46" y="22" width="2" height="2" fill="#BEE1FF"/><rect x="58" y="22" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="24" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="24" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="24" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="24" width="2" height="2" fill="#BEE1FF"/><rect x="58" y="24" width="2" height="2" fill="#BEE1FF"/><rect x="60" y="24" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="26" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="26" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="26" width="2" height="2" fill="#BEE1FF"/><rect x="48" y="26" width="2" height="2" fill="#BEE1FF"/><rect x="60" y="26" width="2" height="2" fill="#BEE1FF"/><rect x="20" y="28" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="28" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="28" width="2" height="2" fill="#BEE1FF"/><rect x="48" y="28" width="2" height="2" fill="#7FDBFF"/><rect x="20" y="30" width="2" height="2" fill="#7FDBFF"/><rect x="34" y="30" width="2" height="2" fill="#BEE1FF"/><rect x="36" y="30" width="2" height="2" fill="#BEE1FF"/><rect x="14" y="32" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="32" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="32" width="2" height="2" fill="#7FDBFF"/><rect x="10" y="34" width="2" height="2" fill="#BEE1FF"/><rect x="14" y="34" width="2" height="2" fill="#7FDBFF"/><rect x="30" y="34" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="34" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="34" width="2" height="2" fill="#BEE1FF"/><rect x="10" y="36" width="2" height="2" fill="#7FDBFF"/><rect x="30" y="36" width="2" height="2" fill="#7FDBFF"/><rect x="34" y="36" width="2" height="2" fill="#BEE1FF"/><rect x="36" y="36" width="2" height="2" fill="#BEE1FF"/><rect x="56" y="36" width="2" height="2" fill="#BEE1FF"/><rect x="10" y="38" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="38" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="38" width="2" height="2" fill="#BEE1FF"/><rect x="40" y="38" width="2" height="2" fill="#BEE1FF"/><rect x="56" y="38" width="2" height="2" fill="#7FDBFF"/><rect x="10" y="40" width="2" height="2" fill="#7FDBFF"/><rect x="34" y="40" width="2" height="2" fill="#BEE1FF"/><rect x="36" y="40" width="2" height="2" fill="#BEE1FF"/><rect x="40" y="40" width="2" height="2" fill="#7FDBFF"/><rect x="32" y="42" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="42" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="44" width="2" height="2" fill="#FFFFFF"/><rect x="34" y="44" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="46" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="46" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="48" width="2" height="2" fill="#FFFFFF"/><rect x="34" y="48" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="50" width="2" height="2" fill="#FFFFFF"/><rect x="34" y="50" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="52" width="2" height="2" fill="#FFFFFF"/><rect x="34" y="52" width="2" height="2" fill="#BEE1FF"/><rect x="32" y="54" width="2" height="2" fill="#FFFFFF"/><rect x="34" y="54" width="2" height="2" fill="#BEE1FF"/></g></g>
    <g id="dw-sdrop1" class="dw-only dw-on-splash"><rect x="16" y="30" width="2" height="4" fill="#7FDBFF"/><rect x="16" y="30" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-sdrop2" class="dw-only dw-on-splash"><rect x="52" y="26" width="2" height="4" fill="#BEE1FF"/></g><g id="dw-sdrop3" class="dw-only dw-on-splash"><rect x="22" y="14" width="2" height="4" fill="#BEE1FF"/></g><g id="dw-sdrop4" class="dw-only dw-on-splash"><rect x="46" y="12" width="2" height="4" fill="#FFFFFF"/></g><g id="dw-sdrop5" class="dw-only dw-on-splash"><rect x="10" y="36" width="2" height="2" fill="#7FDBFF"/></g><g id="dw-sdrop6" class="dw-only dw-on-splash"><rect x="56" y="36" width="2" height="2" fill="#BEE1FF"/></g>
    <g id="dw-note-a" class="dw-only dw-on-music"><g id="dw-note1"><rect x="10" y="22" width="2" height="12" fill="#9D7BFF"/><rect x="4" y="30" width="6" height="2" fill="#9D7BFF"/><rect x="4" y="32" width="4" height="2" fill="#9D7BFF"/><rect x="12" y="24" width="4" height="2" fill="#9D7BFF"/><rect x="14" y="26" width="2" height="2" fill="#9D7BFF"/></g><g id="dw-note2"><rect x="52" y="26" width="2" height="12" fill="#FF8FB8"/><rect x="46" y="34" width="6" height="2" fill="#FF8FB8"/><rect x="46" y="36" width="4" height="2" fill="#FF8FB8"/><rect x="54" y="28" width="4" height="2" fill="#FF8FB8"/><rect x="56" y="30" width="2" height="2" fill="#FF8FB8"/></g><g id="dw-note3"><rect x="66" y="12" width="2" height="12" fill="#9D7BFF"/><rect x="60" y="20" width="6" height="2" fill="#9D7BFF"/><rect x="60" y="22" width="4" height="2" fill="#9D7BFF"/><rect x="68" y="14" width="4" height="2" fill="#9D7BFF"/><rect x="70" y="16" width="2" height="2" fill="#9D7BFF"/></g></g>
    <g id="dw-heart1" class="dw-only dw-on-poke"><rect x="46" y="24" width="4" height="2" fill="#FF8FB8"/><rect x="52" y="24" width="4" height="2" fill="#FF8FB8"/><rect x="44" y="26" width="6" height="2" fill="#FF8FB8"/><rect x="52" y="26" width="6" height="2" fill="#FF8FB8"/><rect x="44" y="28" width="14" height="2" fill="#FF8FB8"/><rect x="46" y="30" width="10" height="2" fill="#FF8FB8"/><rect x="48" y="32" width="6" height="2" fill="#FF8FB8"/><rect x="50" y="34" width="2" height="2" fill="#FF8FB8"/></g><g id="dw-heart2" class="dw-only dw-on-poke"><rect x="16" y="34" width="4" height="2" fill="#FF8FB8"/><rect x="22" y="34" width="4" height="2" fill="#FF8FB8"/><rect x="14" y="36" width="6" height="2" fill="#FF8FB8"/><rect x="22" y="36" width="6" height="2" fill="#FF8FB8"/><rect x="14" y="38" width="14" height="2" fill="#FF8FB8"/><rect x="16" y="40" width="10" height="2" fill="#FF8FB8"/><rect x="18" y="42" width="6" height="2" fill="#FF8FB8"/><rect x="20" y="44" width="2" height="2" fill="#FF8FB8"/></g><g id="dw-heart3" class="dw-only dw-on-poke"><rect x="62" y="14" width="4" height="2" fill="#FF4D5E"/><rect x="68" y="14" width="4" height="2" fill="#FF4D5E"/><rect x="60" y="16" width="6" height="2" fill="#FF4D5E"/><rect x="68" y="16" width="6" height="2" fill="#FF4D5E"/><rect x="60" y="18" width="14" height="2" fill="#FF4D5E"/><rect x="62" y="20" width="10" height="2" fill="#FF4D5E"/><rect x="64" y="22" width="6" height="2" fill="#FF4D5E"/><rect x="66" y="24" width="2" height="2" fill="#FF4D5E"/></g>
    <g id="dw-sparkle1" class="dw-only dw-on-done"><rect x="16" y="36" width="2" height="2" fill="#FFD447"/><rect x="14" y="38" width="6" height="2" fill="#FFD447"/><rect x="16" y="40" width="2" height="2" fill="#FFD447"/></g><g id="dw-sparkle2" class="dw-only dw-on-done"><rect x="62" y="32" width="2" height="2" fill="#FFFFFF"/><rect x="60" y="34" width="6" height="2" fill="#FFFFFF"/><rect x="62" y="36" width="2" height="2" fill="#FFFFFF"/></g><g id="dw-sparkle3" class="dw-only dw-on-done"><rect x="72" y="60" width="2" height="2" fill="#BEE1FF"/><rect x="70" y="62" width="6" height="2" fill="#BEE1FF"/><rect x="72" y="64" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-sparkle4" class="dw-only dw-on-done"><rect x="12" y="48" width="4" height="2" fill="#FF8FB8"/><rect x="66" y="52" width="2" height="4" fill="#35D07F"/><rect x="56" y="28" width="4" height="2" fill="#FF8FB8"/><rect x="24" y="24" width="2" height="4" fill="#FFD447"/></g>
    <g id="dw-firework" class="dw-only dw-on-done"><g id="dw-fw-launch"><rect x="37" y="10" width="2" height="10" fill="#FFD447"/><rect x="33" y="14" width="10" height="2" fill="#FFD447"/><rect x="35" y="12" width="2" height="2" fill="#FF8A3D"/><rect x="41" y="12" width="2" height="2" fill="#FF8A3D"/><rect x="35" y="16" width="2" height="2" fill="#FF8A3D"/><rect x="41" y="16" width="2" height="2" fill="#FF8A3D"/><rect x="37" y="8" width="2" height="2" fill="#FF8A3D"/><rect x="37" y="20" width="2" height="2" fill="#FF8A3D"/><rect x="31" y="14" width="2" height="2" fill="#FF8A3D"/><rect x="45" y="14" width="2" height="2" fill="#FF8A3D"/><rect x="37" y="14" width="2" height="2" fill="#FFFFFF"/><rect x="37" y="22" width="2" height="2" fill="#FF8A3D"/><rect x="37" y="25" width="2" height="2" fill="#FF4D5E"/><rect x="37" y="28" width="2" height="2" fill="#FF4D5E"/></g><g id="dw-fw-flash"><rect x="22" y="15" width="2" height="2" fill="#FFFFFF"/><rect x="26" y="15" width="4" height="2" fill="#9D7BFF"/><rect x="36" y="15" width="4" height="2" fill="#35D07F"/><rect x="44" y="15" width="6" height="2" fill="#7FDBFF"/><rect x="36" y="2" width="2" height="4" fill="#FFD447"/><rect x="36" y="10" width="2" height="6" fill="#FFFFFF"/><rect x="36" y="18" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="26" width="2" height="4" fill="#FFD447"/><rect x="34" y="12" width="4" height="4" fill="#FFD447"/><rect x="38" y="14" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="16" width="2" height="2" fill="#FFFFFF"/><rect x="32" y="18" width="2" height="2" fill="#FFFFFF"/><rect x="40" y="10" width="2" height="2" fill="#BEE1FF"/><rect x="44" y="10" width="2" height="2" fill="#7FDBFF"/><rect x="44" y="22" width="2" height="2" fill="#9D7BFF"/><rect x="64" y="22" width="2" height="2" fill="#FFFFFF"/><rect x="52" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="60" y="30" width="2" height="2" fill="#FF8FB8"/><rect x="20" y="10" width="2" height="2" fill="#35D07F"/><rect x="64" y="14" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="6" width="2" height="2" fill="#FFD447"/><rect x="12" y="18" width="2" height="2" fill="#9D7BFF"/><rect x="60" y="22" width="2" height="2" fill="#FFFFFF"/><rect x="44" y="18" width="2" height="2" fill="#9D7BFF"/><rect x="52" y="14" width="2" height="2" fill="#9D7BFF"/><rect x="20" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="52" y="14" width="2" height="2" fill="#35D07F"/></g><g class="dw-fw-ray" style="--fw-dx:42px;--fw-dy:2px"><rect x="36" y="16" width="4" height="4" fill="#FFD447"/></g><g class="dw-fw-ray" style="--fw-dx:38px;--fw-dy:18px"><rect x="36" y="16" width="4" height="4" fill="#FF8FB8"/></g><g class="dw-fw-ray" style="--fw-dx:28px;--fw-dy:32px"><rect x="36" y="16" width="4" height="4" fill="#FF4D5E"/></g><g class="dw-fw-ray" style="--fw-dx:14px;--fw-dy:40px"><rect x="36" y="16" width="4" height="4" fill="#9D7BFF"/></g><g class="dw-fw-ray" style="--fw-dx:-2px;--fw-dy:42px"><rect x="36" y="16" width="4" height="4" fill="#35D07F"/></g><g class="dw-fw-ray" style="--fw-dx:-18px;--fw-dy:38px"><rect x="36" y="16" width="4" height="4" fill="#7FDBFF"/></g><g class="dw-fw-ray" style="--fw-dx:-32px;--fw-dy:28px"><rect x="36" y="16" width="4" height="4" fill="#FF8A3D"/></g><g class="dw-fw-ray" style="--fw-dx:-40px;--fw-dy:14px"><rect x="36" y="16" width="4" height="4" fill="#FFFFFF"/></g><g class="dw-fw-ray" style="--fw-dx:-42px;--fw-dy:-2px"><rect x="36" y="16" width="4" height="4" fill="#FFD447"/></g><g class="dw-fw-ray" style="--fw-dx:-38px;--fw-dy:-18px"><rect x="36" y="16" width="4" height="4" fill="#FF8FB8"/></g><g class="dw-fw-ray" style="--fw-dx:-28px;--fw-dy:-32px"><rect x="36" y="16" width="4" height="4" fill="#FF4D5E"/></g><g class="dw-fw-ray" style="--fw-dx:-14px;--fw-dy:-40px"><rect x="36" y="16" width="4" height="4" fill="#9D7BFF"/></g><g class="dw-fw-ray" style="--fw-dx:2px;--fw-dy:-42px"><rect x="36" y="16" width="4" height="4" fill="#35D07F"/></g><g class="dw-fw-ray" style="--fw-dx:18px;--fw-dy:-38px"><rect x="36" y="16" width="4" height="4" fill="#7FDBFF"/></g><g class="dw-fw-ray" style="--fw-dx:32px;--fw-dy:-28px"><rect x="36" y="16" width="4" height="4" fill="#FF8A3D"/></g><g class="dw-fw-ray" style="--fw-dx:40px;--fw-dy:-14px"><rect x="36" y="16" width="4" height="4" fill="#FFFFFF"/></g><g class="dw-fw-ray2" style="--fw-dx:26px;--fw-dy:6px"><rect x="37" y="17" width="2" height="2" fill="#9D7BFF"/></g><g class="dw-fw-ray2" style="--fw-dx:20px;--fw-dy:16px"><rect x="37" y="17" width="2" height="2" fill="#35D07F"/></g><g class="dw-fw-ray2" style="--fw-dx:12px;--fw-dy:24px"><rect x="37" y="17" width="2" height="2" fill="#7FDBFF"/></g><g class="dw-fw-ray2" style="--fw-dx:0px;--fw-dy:26px"><rect x="37" y="17" width="2" height="2" fill="#FF8A3D"/></g><g class="dw-fw-ray2" style="--fw-dx:-10px;--fw-dy:24px"><rect x="37" y="17" width="2" height="2" fill="#FFFFFF"/></g><g class="dw-fw-ray2" style="--fw-dx:-20px;--fw-dy:16px"><rect x="37" y="17" width="2" height="2" fill="#FFD447"/></g><g class="dw-fw-ray2" style="--fw-dx:-26px;--fw-dy:6px"><rect x="37" y="17" width="2" height="2" fill="#FF8FB8"/></g><g class="dw-fw-ray2" style="--fw-dx:-26px;--fw-dy:-6px"><rect x="37" y="17" width="2" height="2" fill="#FF4D5E"/></g><g class="dw-fw-ray2" style="--fw-dx:-20px;--fw-dy:-16px"><rect x="37" y="17" width="2" height="2" fill="#9D7BFF"/></g><g class="dw-fw-ray2" style="--fw-dx:-12px;--fw-dy:-24px"><rect x="37" y="17" width="2" height="2" fill="#35D07F"/></g><g class="dw-fw-ray2" style="--fw-dx:0px;--fw-dy:-26px"><rect x="37" y="17" width="2" height="2" fill="#7FDBFF"/></g><g class="dw-fw-ray2" style="--fw-dx:10px;--fw-dy:-24px"><rect x="37" y="17" width="2" height="2" fill="#FF8A3D"/></g><g class="dw-fw-ray2" style="--fw-dx:20px;--fw-dy:-16px"><rect x="37" y="17" width="2" height="2" fill="#FFFFFF"/></g><g class="dw-fw-ray2" style="--fw-dx:26px;--fw-dy:-6px"><rect x="37" y="17" width="2" height="2" fill="#FFD447"/></g></g><g id="dw-glow" class="dw-only dw-on-poke" opacity="0.9"><rect x="74" y="74" width="2" height="2" fill="#FFD447"/><rect x="74" y="78" width="2" height="2" fill="#FFD447"/><rect x="72" y="80" width="2" height="2" fill="#FFD447"/><rect x="72" y="84" width="2" height="2" fill="#FFD447"/><rect x="70" y="86" width="2" height="2" fill="#FFD447"/><rect x="66" y="88" width="2" height="2" fill="#FFD447"/><rect x="64" y="92" width="2" height="2" fill="#FFD447"/><rect x="60" y="94" width="2" height="2" fill="#FFD447"/><rect x="56" y="96" width="2" height="2" fill="#FFD447"/><rect x="54" y="96" width="2" height="2" fill="#FFD447"/><rect x="48" y="98" width="2" height="2" fill="#FFD447"/><rect x="44" y="98" width="2" height="2" fill="#FFD447"/><rect x="40" y="98" width="2" height="2" fill="#FFD447"/><rect x="36" y="98" width="2" height="2" fill="#FFD447"/><rect x="32" y="98" width="2" height="2" fill="#FFD447"/><rect x="26" y="96" width="2" height="2" fill="#FFD447"/><rect x="24" y="96" width="2" height="2" fill="#FFD447"/><rect x="20" y="94" width="2" height="2" fill="#FFD447"/><rect x="16" y="92" width="2" height="2" fill="#FFD447"/><rect x="14" y="88" width="2" height="2" fill="#FFD447"/><rect x="10" y="86" width="2" height="2" fill="#FFD447"/><rect x="8" y="84" width="2" height="2" fill="#FFD447"/><rect x="8" y="80" width="2" height="2" fill="#FFD447"/><rect x="6" y="78" width="2" height="2" fill="#FFD447"/><rect x="6" y="74" width="2" height="2" fill="#FFD447"/><rect x="6" y="70" width="2" height="2" fill="#FFD447"/><rect x="8" y="68" width="2" height="2" fill="#FFD447"/><rect x="8" y="64" width="2" height="2" fill="#FFD447"/><rect x="10" y="62" width="2" height="2" fill="#FFD447"/><rect x="14" y="60" width="2" height="2" fill="#FFD447"/><rect x="16" y="56" width="2" height="2" fill="#FFD447"/><rect x="20" y="54" width="2" height="2" fill="#FFD447"/><rect x="22" y="52" width="2" height="2" fill="#FFD447"/><rect x="26" y="52" width="2" height="2" fill="#FFD447"/><rect x="32" y="50" width="2" height="2" fill="#FFD447"/><rect x="36" y="50" width="2" height="2" fill="#FFD447"/><rect x="40" y="50" width="2" height="2" fill="#FFD447"/><rect x="44" y="50" width="2" height="2" fill="#FFD447"/><rect x="48" y="50" width="2" height="2" fill="#FFD447"/><rect x="54" y="52" width="2" height="2" fill="#FFD447"/><rect x="56" y="52" width="2" height="2" fill="#FFD447"/><rect x="60" y="54" width="2" height="2" fill="#FFD447"/><rect x="64" y="56" width="2" height="2" fill="#FFD447"/><rect x="66" y="60" width="2" height="2" fill="#FFD447"/><rect x="70" y="62" width="2" height="2" fill="#FFD447"/><rect x="72" y="64" width="2" height="2" fill="#FFD447"/><rect x="72" y="68" width="2" height="2" fill="#FFD447"/><rect x="74" y="70" width="2" height="2" fill="#FFD447"/><rect x="78" y="74" width="2" height="2" fill="#FF8FB8"/><rect x="78" y="78" width="2" height="2" fill="#FF8FB8"/><rect x="76" y="82" width="2" height="2" fill="#FF8FB8"/><rect x="76" y="84" width="2" height="2" fill="#FF8FB8"/><rect x="72" y="88" width="2" height="2" fill="#FF8FB8"/><rect x="70" y="90" width="2" height="2" fill="#FF8FB8"/><rect x="66" y="94" width="2" height="2" fill="#FF8FB8"/><rect x="64" y="96" width="2" height="2" fill="#FF8FB8"/><rect x="60" y="98" width="2" height="2" fill="#FF8FB8"/><rect x="54" y="100" width="2" height="2" fill="#FF8FB8"/><rect x="50" y="100" width="2" height="2" fill="#FF8FB8"/><rect x="44" y="102" width="2" height="2" fill="#FF8FB8"/><rect x="40" y="102" width="2" height="2" fill="#FF8FB8"/><rect x="36" y="102" width="2" height="2" fill="#FF8FB8"/><rect x="30" y="100" width="2" height="2" fill="#FF8FB8"/><rect x="26" y="100" width="2" height="2" fill="#FF8FB8"/><rect x="22" y="98" width="2" height="2" fill="#FF8FB8"/><rect x="16" y="96" width="2" height="2" fill="#FF8FB8"/><rect x="14" y="94" width="2" height="2" fill="#FF8FB8"/><rect x="10" y="90" width="2" height="2" fill="#FF8FB8"/><rect x="8" y="88" width="2" height="2" fill="#FF8FB8"/><rect x="4" y="84" width="2" height="2" fill="#FF8FB8"/><rect x="4" y="82" width="2" height="2" fill="#FF8FB8"/><rect x="2" y="78" width="2" height="2" fill="#FF8FB8"/><rect x="2" y="74" width="2" height="2" fill="#FF8FB8"/><rect x="2" y="70" width="2" height="2" fill="#FF8FB8"/><rect x="4" y="66" width="2" height="2" fill="#FF8FB8"/><rect x="4" y="64" width="2" height="2" fill="#FF8FB8"/><rect x="8" y="60" width="2" height="2" fill="#FF8FB8"/><rect x="10" y="58" width="2" height="2" fill="#FF8FB8"/><rect x="14" y="54" width="2" height="2" fill="#FF8FB8"/><rect x="16" y="52" width="2" height="2" fill="#FF8FB8"/><rect x="20" y="50" width="2" height="2" fill="#FF8FB8"/><rect x="26" y="48" width="2" height="2" fill="#FF8FB8"/><rect x="30" y="48" width="2" height="2" fill="#FF8FB8"/><rect x="36" y="46" width="2" height="2" fill="#FF8FB8"/><rect x="40" y="46" width="2" height="2" fill="#FF8FB8"/><rect x="44" y="46" width="2" height="2" fill="#FF8FB8"/><rect x="50" y="48" width="2" height="2" fill="#FF8FB8"/><rect x="54" y="48" width="2" height="2" fill="#FF8FB8"/><rect x="60" y="50" width="2" height="2" fill="#FF8FB8"/><rect x="64" y="52" width="2" height="2" fill="#FF8FB8"/><rect x="66" y="54" width="2" height="2" fill="#FF8FB8"/><rect x="70" y="58" width="2" height="2" fill="#FF8FB8"/><rect x="72" y="60" width="2" height="2" fill="#FF8FB8"/><rect x="76" y="64" width="2" height="2" fill="#FF8FB8"/><rect x="76" y="66" width="2" height="2" fill="#FF8FB8"/><rect x="78" y="70" width="2" height="2" fill="#FF8FB8"/><rect x="82" y="74" width="2" height="2" fill="#BEE1FF"/><rect x="82" y="78" width="2" height="2" fill="#BEE1FF"/><rect x="80" y="82" width="2" height="2" fill="#BEE1FF"/><rect x="78" y="86" width="2" height="2" fill="#BEE1FF"/><rect x="76" y="90" width="2" height="2" fill="#BEE1FF"/><rect x="74" y="92" width="2" height="2" fill="#BEE1FF"/><rect x="70" y="96" width="2" height="2" fill="#BEE1FF"/><rect x="66" y="98" width="2" height="2" fill="#BEE1FF"/><rect x="60" y="100" width="2" height="2" fill="#BEE1FF"/><rect x="56" y="102" width="2" height="2" fill="#BEE1FF"/><rect x="50" y="104" width="2" height="2" fill="#BEE1FF"/><rect x="46" y="104" width="2" height="2" fill="#BEE1FF"/><rect x="40" y="104" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="104" width="2" height="2" fill="#BEE1FF"/><rect x="30" y="104" width="2" height="2" fill="#BEE1FF"/><rect x="24" y="102" width="2" height="2" fill="#BEE1FF"/><rect x="20" y="100" width="2" height="2" fill="#BEE1FF"/><rect x="14" y="98" width="2" height="2" fill="#BEE1FF"/><rect x="10" y="96" width="2" height="2" fill="#BEE1FF"/><rect x="6" y="92" width="2" height="2" fill="#BEE1FF"/><rect x="4" y="90" width="2" height="2" fill="#BEE1FF"/><rect x="2" y="86" width="2" height="2" fill="#BEE1FF"/><rect x="0" y="82" width="2" height="2" fill="#BEE1FF"/><rect x="-2" y="78" width="2" height="2" fill="#BEE1FF"/><rect x="-2" y="74" width="2" height="2" fill="#BEE1FF"/><rect x="-2" y="70" width="2" height="2" fill="#BEE1FF"/><rect x="0" y="66" width="2" height="2" fill="#BEE1FF"/><rect x="2" y="62" width="2" height="2" fill="#BEE1FF"/><rect x="4" y="58" width="2" height="2" fill="#BEE1FF"/><rect x="6" y="56" width="2" height="2" fill="#BEE1FF"/><rect x="10" y="52" width="2" height="2" fill="#BEE1FF"/><rect x="14" y="50" width="2" height="2" fill="#BEE1FF"/><rect x="18" y="48" width="2" height="2" fill="#BEE1FF"/><rect x="24" y="46" width="2" height="2" fill="#BEE1FF"/><rect x="30" y="44" width="2" height="2" fill="#BEE1FF"/><rect x="34" y="44" width="2" height="2" fill="#BEE1FF"/><rect x="40" y="44" width="2" height="2" fill="#BEE1FF"/><rect x="46" y="44" width="2" height="2" fill="#BEE1FF"/><rect x="50" y="44" width="2" height="2" fill="#BEE1FF"/><rect x="56" y="46" width="2" height="2" fill="#BEE1FF"/><rect x="60" y="48" width="2" height="2" fill="#BEE1FF"/><rect x="66" y="50" width="2" height="2" fill="#BEE1FF"/><rect x="70" y="52" width="2" height="2" fill="#BEE1FF"/><rect x="74" y="56" width="2" height="2" fill="#BEE1FF"/><rect x="76" y="58" width="2" height="2" fill="#BEE1FF"/><rect x="78" y="62" width="2" height="2" fill="#BEE1FF"/><rect x="80" y="66" width="2" height="2" fill="#BEE1FF"/><rect x="82" y="70" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-confetti" class="dw-only dw-on-done"><rect x="8" y="40" width="2" height="4" fill="#FF8FB8"/><rect x="80" y="48" width="2" height="4" fill="#BEE1FF"/><rect x="72" y="40" width="4" height="2" fill="#FFD447"/></g>
  </g>
  </g>
  <g id="dw-props">
    <g id="dw-cloud" class="dw-only dw-on-thinking"><rect x="10" y="14" width="10" height="2" fill="#142660"/><rect x="24" y="14" width="12" height="2" fill="#142660"/><rect x="40" y="14" width="10" height="2" fill="#142660"/><rect x="8" y="16" width="12" height="2" fill="#142660"/><rect x="24" y="16" width="14" height="2" fill="#142660"/><rect x="42" y="16" width="10" height="2" fill="#142660"/><rect x="4" y="18" width="50" height="2" fill="#142660"/><rect x="2" y="20" width="54" height="2" fill="#142660"/><rect x="2" y="22" width="54" height="2" fill="#142660"/><rect x="2" y="24" width="54" height="2" fill="#142660"/><rect x="4" y="26" width="52" height="2" fill="#142660"/><rect x="6" y="28" width="48" height="2" fill="#142660"/><rect x="10" y="30" width="40" height="2" fill="#142660"/><rect x="10" y="16" width="8" height="2" fill="#FFFFFF"/><rect x="26" y="16" width="10" height="2" fill="#FFFFFF"/><rect x="44" y="16" width="6" height="2" fill="#FFFFFF"/><rect x="8" y="18" width="12" height="2" fill="#FFFFFF"/><rect x="24" y="18" width="14" height="2" fill="#FFFFFF"/><rect x="42" y="18" width="10" height="2" fill="#FFFFFF"/><rect x="4" y="20" width="50" height="2" fill="#FFFFFF"/><rect x="4" y="22" width="50" height="2" fill="#FFFFFF"/><rect x="4" y="24" width="50" height="2" fill="#FFFFFF"/><rect x="6" y="26" width="48" height="2" fill="#FFFFFF"/><rect x="10" y="28" width="40" height="2" fill="#FFFFFF"/><rect x="16" y="30" width="28" height="2" fill="#FFFFFF"/><rect x="4" y="30" width="42" height="2" fill="#BEE1FF"/><rect x="8" y="32" width="34" height="2" fill="#BEE1FF"/><rect x="14" y="34" width="22" height="2" fill="#BEE1FF"/></g><g id="dw-formula1" class="dw-only dw-on-thinking"><g transform="translate(8 2)"><rect x="2" y="0" width="2" height="2" fill="#142660"/><rect x="6" y="0" width="2" height="2" fill="#142660"/><rect x="0" y="2" width="4" height="2" fill="#142660"/><rect x="6" y="2" width="6" height="2" fill="#142660"/><rect x="10" y="4" width="2" height="2" fill="#142660"/><rect x="0" y="6" width="4" height="2" fill="#142660"/><rect x="6" y="6" width="6" height="2" fill="#142660"/><rect x="2" y="8" width="2" height="2" fill="#142660"/><rect x="6" y="8" width="2" height="2" fill="#142660"/><rect x="2" y="10" width="6" height="2" fill="#142660"/><rect x="4" y="0" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="0" y="4" width="10" height="2" fill="#FFFFFF"/><rect x="4" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="8" width="2" height="2" fill="#FFFFFF"/></g></g><g id="dw-formula2" class="dw-only dw-on-thinking"><g transform="translate(26 2)"><rect x="2" y="0" width="6" height="2" fill="#142660"/><rect x="10" y="0" width="2" height="2" fill="#142660"/><rect x="0" y="2" width="2" height="2" fill="#142660"/><rect x="4" y="2" width="2" height="2" fill="#142660"/><rect x="8" y="2" width="4" height="2" fill="#142660"/><rect x="0" y="4" width="4" height="2" fill="#142660"/><rect x="6" y="4" width="4" height="2" fill="#142660"/><rect x="0" y="6" width="2" height="2" fill="#142660"/><rect x="4" y="6" width="2" height="2" fill="#142660"/><rect x="8" y="6" width="4" height="2" fill="#142660"/><rect x="2" y="8" width="6" height="2" fill="#142660"/><rect x="10" y="8" width="2" height="2" fill="#142660"/><rect x="0" y="10" width="4" height="2" fill="#142660"/><rect x="6" y="10" width="6" height="2" fill="#142660"/><rect x="0" y="0" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="0" width="2" height="2" fill="#FFFFFF"/><rect x="2" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="4" width="2" height="2" fill="#FFFFFF"/><rect x="2" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="0" y="8" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="8" width="2" height="2" fill="#FFFFFF"/></g></g><g id="dw-formula3" class="dw-only dw-on-thinking"><g transform="translate(44 2)"><rect x="0" y="0" width="12" height="2" fill="#142660"/><rect x="10" y="2" width="2" height="2" fill="#142660"/><rect x="0" y="4" width="12" height="2" fill="#142660"/><rect x="10" y="6" width="2" height="2" fill="#142660"/><rect x="0" y="8" width="12" height="2" fill="#142660"/><rect x="0" y="2" width="10" height="2" fill="#FFFFFF"/><rect x="0" y="6" width="10" height="2" fill="#FFFFFF"/></g></g><g id="dw-formula4" class="dw-only dw-on-thinking"><g transform="translate(60 2)"><rect x="10" y="0" width="2" height="2" fill="#142660"/><rect x="0" y="2" width="6" height="2" fill="#142660"/><rect x="8" y="2" width="4" height="2" fill="#142660"/><rect x="2" y="4" width="2" height="2" fill="#142660"/><rect x="6" y="4" width="4" height="2" fill="#142660"/><rect x="0" y="6" width="6" height="2" fill="#142660"/><rect x="8" y="6" width="4" height="2" fill="#142660"/><rect x="10" y="8" width="2" height="2" fill="#142660"/><rect x="0" y="10" width="12" height="2" fill="#142660"/><rect x="0" y="0" width="10" height="2" fill="#FFFFFF"/><rect x="6" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="4" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="0" y="8" width="10" height="2" fill="#FFFFFF"/></g></g><g id="dw-formula5" class="dw-only dw-on-thinking"><g transform="translate(74 16)"><rect x="2" y="0" width="2" height="2" fill="#142660"/><rect x="10" y="0" width="2" height="2" fill="#142660"/><rect x="2" y="2" width="4" height="2" fill="#142660"/><rect x="8" y="2" width="4" height="2" fill="#142660"/><rect x="0" y="4" width="4" height="2" fill="#142660"/><rect x="6" y="4" width="4" height="2" fill="#142660"/><rect x="4" y="6" width="4" height="2" fill="#142660"/><rect x="2" y="8" width="4" height="2" fill="#142660"/><rect x="0" y="10" width="4" height="2" fill="#142660"/><rect x="4" y="0" width="6" height="2" fill="#BEE1FF"/><rect x="6" y="2" width="2" height="2" fill="#BEE1FF"/><rect x="4" y="4" width="2" height="2" fill="#BEE1FF"/><rect x="0" y="6" width="4" height="2" fill="#BEE1FF"/><rect x="0" y="8" width="2" height="2" fill="#BEE1FF"/></g></g><g id="dw-formula6" class="dw-only dw-on-thinking"><g transform="translate(64 32)"><rect x="10" y="0" width="2" height="2" fill="#142660"/><rect x="2" y="2" width="6" height="2" fill="#142660"/><rect x="10" y="2" width="2" height="2" fill="#142660"/><rect x="2" y="4" width="2" height="2" fill="#142660"/><rect x="6" y="4" width="2" height="2" fill="#142660"/><rect x="10" y="4" width="2" height="2" fill="#142660"/><rect x="2" y="6" width="2" height="2" fill="#142660"/><rect x="6" y="6" width="2" height="2" fill="#142660"/><rect x="10" y="6" width="2" height="2" fill="#142660"/><rect x="0" y="8" width="4" height="2" fill="#142660"/><rect x="6" y="8" width="6" height="2" fill="#142660"/><rect x="0" y="0" width="10" height="2" fill="#FFD447"/><rect x="0" y="2" width="2" height="2" fill="#FFD447"/><rect x="8" y="2" width="2" height="2" fill="#FFD447"/><rect x="0" y="4" width="2" height="2" fill="#FFD447"/><rect x="8" y="4" width="2" height="2" fill="#FFD447"/><rect x="0" y="6" width="2" height="2" fill="#FFD447"/><rect x="8" y="6" width="2" height="2" fill="#FFD447"/></g></g><g id="dw-formula7" class="dw-only dw-on-thinking"><g transform="translate(2 36)"><rect x="4" y="0" width="2" height="2" fill="#142660"/><rect x="4" y="2" width="4" height="2" fill="#142660"/><rect x="0" y="4" width="4" height="2" fill="#142660"/><rect x="6" y="4" width="6" height="2" fill="#142660"/><rect x="2" y="6" width="4" height="2" fill="#142660"/><rect x="10" y="6" width="2" height="2" fill="#142660"/><rect x="4" y="8" width="2" height="2" fill="#142660"/><rect x="10" y="8" width="2" height="2" fill="#142660"/><rect x="4" y="10" width="8" height="2" fill="#142660"/><rect x="0" y="0" width="4" height="2" fill="#FFFFFF"/><rect x="0" y="2" width="4" height="2" fill="#FFFFFF"/><rect x="4" y="4" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="6" width="4" height="2" fill="#FFFFFF"/><rect x="6" y="8" width="4" height="2" fill="#FFFFFF"/></g></g>
    
    <g id="dw-bubble" class="dw-only dw-on-waiting"><path d="M14 12h12v2h-12zM10 14h2v2h-2zM26 14h4v2h-4zM8 16h2v2h-2zM30 16h2v18h-2zM6 18h2v2h-2zM4 20h2v10h-2zM6 30h2v2h-2zM8 32h2v2h-2zM10 34h2v2h-2zM26 34h4v2h-4zM14 36h12v2h-12zM16 38h4v6h-4zM20 40h2v4h-2zM22 42h2v2h-2z" fill="#142660"/><path d="M12 14h14v22h-14zM10 16h2v18h-2zM26 16h4v18h-4zM8 18h2v14h-2zM6 20h2v10h-2z" fill="#FFD447"/><rect x="14" y="16" width="6" height="12" fill="#FF4D5E"/><rect x="14" y="32" width="6" height="4" fill="#FF4D5E"/></g>
    <g id="dw-tick1" class="dw-only dw-on-waiting"><rect x="0" y="8" width="2" height="6" fill="#FFD447"/><rect x="0" y="8" width="8" height="2" fill="#FFD447"/></g><g id="dw-tick2" class="dw-only dw-on-waiting"><rect x="0" y="24" width="2" height="6" fill="#FFD447"/><rect x="0" y="24" width="8" height="2" fill="#FFD447"/></g><g id="dw-tick3" class="dw-only dw-on-waiting"><rect x="34" y="4" width="4" height="2" fill="#FFD447"/><rect x="36" y="2" width="2" height="2" fill="#FFD447"/></g>
    <g id="dw-laptop" class="dw-only dw-on-writing"><rect x="0" y="44" width="24" height="30" fill="#142660"/><rect x="2" y="46" width="20" height="24" fill="#A7B0CC"/><rect x="2" y="46" width="20" height="2" fill="#5B6488"/><rect x="2" y="68" width="20" height="2" fill="#5B6488"/><rect x="2" y="46" width="2" height="24" fill="#BEE1FF"/><rect x="2" y="46" width="2" height="8" fill="#FFFFFF"/><rect x="4" y="48" width="16" height="20" fill="#222A4E"/><rect x="4" y="48" width="16" height="2" fill="#142660"/><rect x="18" y="50" width="2" height="2" fill="#7FDBFF"/><g id="dw-code-a" class="dw-only dw-on-writing"><rect x="6" y="52" width="10" height="2" fill="#9D7BFF"/></g><g id="dw-code-b" class="dw-only dw-on-writing"><rect x="6" y="56" width="6" height="2" fill="#35D07F"/></g><g id="dw-code-c" class="dw-only dw-on-writing"><rect x="6" y="60" width="12" height="2" fill="#FFD447"/></g><g id="dw-cursor" class="dw-only dw-on-writing"><rect x="6" y="64" width="4" height="2" fill="#FFFFFF"/></g><rect x="2" y="72" width="28" height="2" fill="#142660"/><rect x="2" y="74" width="30" height="2" fill="#142660"/><rect x="0" y="76" width="34" height="2" fill="#142660"/><rect x="0" y="78" width="38" height="2" fill="#142660"/><rect x="0" y="80" width="42" height="2" fill="#142660"/><rect x="0" y="82" width="46" height="2" fill="#142660"/><rect x="0" y="84" width="46" height="2" fill="#142660"/><rect x="4" y="74" width="26" height="2" fill="#A7B0CC"/><rect x="2" y="76" width="30" height="2" fill="#A7B0CC"/><rect x="2" y="78" width="34" height="2" fill="#A7B0CC"/><rect x="2" y="80" width="38" height="2" fill="#A7B0CC"/><rect x="2" y="82" width="42" height="2" fill="#5B6488"/><rect x="6" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="14" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="18" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="22" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="26" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="12" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="20" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="24" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="28" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="32" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="12" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="20" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="24" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="28" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="32" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="78" width="2" height="2" fill="#FFD447"/><rect x="26" y="76" width="2" height="2" fill="#9D7BFF"/><rect x="20" y="80" width="2" height="2" fill="#35D07F"/><g id="dw-fin-l"><path d="M20 72h8v2h2v4h-2v2h-8v-2h-2v-4h2z" fill="#142660"/><path d="M22 74h6v2h2v2h-8v-4z" fill="#4E6FFF"/><rect x="24" y="74" width="2" height="2" fill="#FFFFFF"/></g><g id="dw-fin-r"><path d="M28 74h8v2h2v4h-2v2h-8v-2h-2v-4h2z" fill="#142660"/><path d="M30 76h6v2h2v2h-8v-4z" fill="#4E6FFF"/><rect x="32" y="76" width="2" height="2" fill="#FFFFFF"/></g></g>
        <g id="dw-spark1" class="dw-only dw-on-writing"><rect x="10" y="38" width="2" height="2" fill="#FF8A3D"/><rect x="8" y="42" width="2" height="2" fill="#FF8A3D"/></g><g id="dw-spark2" class="dw-only dw-on-writing"><rect x="18" y="30" width="2" height="2" fill="#FF8FB8"/></g><g id="dw-spark3" class="dw-only dw-on-writing"><rect x="22" y="22" width="2" height="2" fill="#9D7BFF"/></g>
    <g id="dw-chart" class="dw-only dw-on-tool"><rect x="-12" y="46" width="18" height="44" fill="#142660"/><rect x="-10" y="48" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="52" width="14" height="4" fill="#FF4D5E"/><rect x="-10" y="56" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="60" width="14" height="4" fill="#FF4D5E"/><rect x="-10" y="64" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="68" width="14" height="4" fill="#FF4D5E"/><rect x="-10" y="72" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="76" width="14" height="4" fill="#FF4D5E"/><rect x="-10" y="80" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="84" width="14" height="4" fill="#FF4D5E"/></g>
    <g id="dw-tool-sparks" class="dw-only dw-on-tool"><rect x="8" y="72" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="72" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="72" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="70" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="74" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="68" width="2" height="2" fill="#FFFFFF"/><rect x="14" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="66" width="2" height="2" fill="#FF8A3D"/><rect x="12" y="68" width="2" height="2" fill="#FF8A3D"/><rect x="4" y="74" width="2" height="2" fill="#FF8A3D"/><rect x="14" y="72" width="2" height="2" fill="#FF8A3D"/><rect x="10" y="80" width="2" height="2" fill="#FF8A3D"/><rect x="6" y="78" width="2" height="2" fill="#FF8A3D"/><rect x="2" y="70" width="2" height="2" fill="#FFD447"/><rect x="12" y="64" width="2" height="2" fill="#FFD447"/><rect x="16" y="78" width="2" height="2" fill="#FFD447"/></g><g id="dw-err-cloud" class="dw-only dw-on-error"><path d="M32 24h10v14h-10zM26 26h6v10h-6zM42 26h6v12h-6zM22 28h4v8h-4zM48 28h6v8h-6zM20 30h2v4h-2zM54 30h4v4h-4zM54 34h2v2h-2zM28 36h4v2h-4zM48 36h4v2h-4z" fill="#FFFFFF"/><path d="M32 26h10v10h-10zM26 28h6v6h-6zM42 28h6v8h-6zM22 30h4v4h-4zM48 30h6v4h-6zM54 32h2v2h-2zM28 34h4v2h-4zM48 34h4v2h-4z" fill="#A7B0CC"/><g id="dw-cloud1"><rect x="22" y="34" width="6" height="2" fill="#5B6488"/><rect x="34" y="36" width="6" height="2" fill="#5B6488"/><rect x="48" y="34" width="4" height="2" fill="#5B6488"/></g><g id="dw-cloud2"><rect x="24" y="30" width="4" height="2" fill="#FFFFFF"/><rect x="40" y="30" width="6" height="2" fill="#FFFFFF"/><rect x="50" y="30" width="2" height="2" fill="#FFFFFF"/></g><g id="dw-cloud3"><rect x="18" y="38" width="4" height="2" fill="#5B6488"/><rect x="54" y="38" width="2" height="2" fill="#5B6488"/></g></g>
    <g id="dw-drop1" class="dw-only dw-on-error"><rect x="30" y="42" width="4" height="6" fill="#7FDBFF"/><rect x="30" y="42" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-drop2" class="dw-only dw-on-error"><rect x="40" y="48" width="4" height="6" fill="#7FDBFF"/><rect x="40" y="48" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-drop3" class="dw-only dw-on-error"><rect x="50" y="42" width="2" height="6" fill="#7FDBFF"/><rect x="24" y="52" width="2" height="4" fill="#7FDBFF"/></g>
    <g id="dw-zzz" class="dw-only dw-on-sleeping"><g id="dw-z1" class="dw-only dw-on-sleeping"><rect x="58" y="8" width="10" height="2" fill="#A7B0CC"/><rect x="64" y="10" width="2" height="2" fill="#A7B0CC"/><rect x="62" y="12" width="2" height="2" fill="#A7B0CC"/><rect x="60" y="14" width="2" height="2" fill="#A7B0CC"/><rect x="58" y="16" width="10" height="2" fill="#A7B0CC"/></g><g id="dw-z2" class="dw-only dw-on-sleeping"><rect x="46" y="20" width="10" height="2" fill="#7B86A8"/><rect x="52" y="22" width="2" height="2" fill="#7B86A8"/><rect x="50" y="24" width="2" height="2" fill="#7B86A8"/><rect x="48" y="26" width="2" height="2" fill="#7B86A8"/><rect x="46" y="28" width="10" height="2" fill="#7B86A8"/></g><g id="dw-z3" class="dw-only dw-on-sleeping"><rect x="62" y="34" width="8" height="2" fill="#5B6488"/><rect x="67" y="36" width="2" height="2" fill="#5B6488"/><rect x="65" y="38" width="2" height="2" fill="#5B6488"/><rect x="62" y="40" width="8" height="2" fill="#5B6488"/></g></g>
    <g id="dw-flust1" class="dw-only dw-on-poke"><rect x="16" y="52" width="2" height="2" fill="#142660"/><rect x="14" y="50" width="2" height="2" fill="#142660"/></g><g id="dw-flust2" class="dw-only dw-on-poke"><rect x="54" y="52" width="2" height="2" fill="#142660"/><rect x="56" y="50" width="2" height="2" fill="#142660"/></g><g id="dw-flust3" class="dw-only dw-on-poke"><rect x="62" y="44" width="2" height="2" fill="#FFD447"/></g>
  </g>
</svg>`,
}
