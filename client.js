/**
 * dsh-pixel-whale-pet — browser half (generated; edit src/art.js and src/engine.js,
 * then run `node scripts/build.mjs`).
 */
window.__ModuleLoader__.load({
  id: "dsh-pixel-whale-pet",
  factory(require) {
    const React = require('react')
    const h = React.createElement

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
.dsh-whale.is-thinking #dw-mouth-think-closed { display: inline; animation: dw-think-talk-closed 1.4s steps(1, end) infinite; }
.dsh-whale.is-thinking #dw-mouth-think-open { display: inline; animation: dw-think-talk-open 1.4s steps(1, end) infinite; }
@keyframes dw-think-talk-closed {
  0%, 48% { opacity: 1; }
  53%, 78% { opacity: 0; }
  83%, 100% { opacity: 1; }
}
@keyframes dw-think-talk-open {
  0%, 48% { opacity: 0; }
  53%, 78% { opacity: 1; }
  83%, 100% { opacity: 0; }
}
.dsh-whale.is-thinking #dw-cloud { animation: dw-cloud-float 3.2s ease-in-out infinite; }
.dsh-whale.is-thinking #dw-dot1 { animation: dw-float 2.4s ease-in-out infinite; }
.dsh-whale.is-thinking #dw-dot2 { animation: dw-float 2.4s ease-in-out 0.35s infinite; }
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
.dsh-whale.is-tool #dw-hammer { animation: dw-tool-hammer 1.1s ease-in-out infinite; }
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
  0%, 14%, 72%, 100% { transform: translate(46px, 78px) rotate(18deg) translate(-46px, -78px); }
  26% { transform: translate(46px, 78px) rotate(-2deg) translate(-46px, -78px); }
  32%, 42% { transform: translate(46px, 78px) rotate(-8deg) translate(-46px, -78px); }
  56% { transform: translate(46px, 78px) rotate(6deg) translate(-46px, -78px); }
  66% { transform: translate(46px, 78px) rotate(16deg) translate(-46px, -78px); }
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
  background: #142660;
  box-shadow: 2px 0 0 #142660, 4px 0 0 #142660, 2px 2px 0 #142660,
    0 4px 0 #142660, 2px 4px 0 #142660, 4px 4px 0 #142660;
  animation-name: dw-fx-z; animation-duration: 1.8s;
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
  .dsh-whale .dsh-whale-art #dw-face-up-blink, .dsh-whale .dsh-whale-art #dw-mouth-think-open { opacity: 0 !important; }
}`,
  svg: ` <svg class="dsh-whale-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96" shape-rendering="auto" aria-hidden="true" focusable="false">
  <g id="dw-bob">
  <g id="dw-rig">
    
    <g id="dw-body"><path d="M24 56h18v2h-18zM22 58h2v2h-2zM42 58h4v2h-4zM20 60h2v2h-2zM46 60h4v2h-4zM18 62h2v2h-2zM50 62h4v2h-4zM16 64h4v2h-4zM16 66h2v2h-2zM16 68h2v2h-2zM16 70h2v2h-2zM16 72h2v2h-2zM16 74h2v2h-2zM16 76h4v2h-4zM18 78h2v2h-2zM48 78h2v2h-2zM20 80h2v2h-2zM48 80h2v2h-2zM22 82h4v2h-4zM50 82h2v2h-2zM26 84h2v2h-2zM50 84h4v2h-4zM26 86h28v2h-28z" fill="#142660"/><path d="M24 58h18v2h-18zM22 60h24v2h-24zM20 62h30v2h-30zM20 64h34v2h-34zM18 66h36v2h-36zM18 68h36v2h-36zM18 70h36v2h-36zM18 72h36v2h-36zM18 74h8v2h-8zM40 74h14v2h-14zM20 76h2v2h-2zM46 76h8v2h-8zM50 78h4v2h-4zM50 80h4v2h-4zM52 82h2v2h-2z" fill="#4E6FFF"/><path d="M26 74h14v2h-14zM22 76h24v2h-24zM24 78h24v2h-24zM28 80h20v2h-20zM32 82h12v2h-12z" fill="#FFFFFF"/><path d="M20 78h4v2h-4zM22 80h6v2h-6zM26 82h6v2h-6zM44 82h6v2h-6zM28 84h22v2h-22z" fill="#BEE1FF"/></g><g id="dw-tail"><g id="dw-tail-blades"><path d="M58 46h2v2h-2zM56 48h2v2h-2zM60 48h2v2h-2zM76 48h2v2h-2zM56 50h2v2h-2zM62 50h2v2h-2zM74 50h2v2h-2zM78 50h2v2h-2zM56 52h2v2h-2zM64 52h2v2h-2zM70 52h4v2h-4zM78 52h2v2h-2zM56 54h2v2h-2zM66 54h4v2h-4zM78 54h2v2h-2zM58 56h2v2h-2zM76 56h2v2h-2zM60 58h2v2h-2zM76 58h2v2h-2zM60 60h2v2h-2zM72 60h4v2h-4zM62 62h2v2h-2zM70 62h2v2h-2zM54 64h2v2h-2zM60 64h2v2h-2zM70 64h2v2h-2zM56 66h4v2h-4zM70 66h2v2h-2zM70 68h2v2h-2zM68 70h2v2h-2zM68 72h2v2h-2zM56 74h2v2h-2zM66 74h2v2h-2zM58 76h2v2h-2zM66 76h2v2h-2zM58 78h4v2h-4zM64 78h2v2h-2zM60 80h4v2h-4zM62 82h4v2h-4zM66 84h2v2h-2z" fill="#142660"/><path d="M58 48h2v2h-2zM58 50h4v2h-4zM76 50h2v2h-2zM58 52h6v2h-6zM74 52h4v2h-4zM58 54h8v2h-8zM70 54h8v2h-8zM60 56h16v2h-16zM62 58h14v2h-14zM62 60h10v2h-10zM64 62h6v2h-6zM62 64h8v2h-8zM54 66h2v2h-2zM60 66h10v2h-10zM54 68h16v2h-16zM54 70h14v2h-14zM54 72h14v2h-14zM54 74h2v2h-2zM58 74h8v2h-8zM54 76h4v2h-4zM60 76h6v2h-6zM54 78h4v2h-4zM62 78h2v2h-2zM54 80h6v2h-6zM54 82h8v2h-8zM54 84h12v2h-12z" fill="#4E6FFF"/></g></g><g id="dw-tail-fill"><rect x="62" y="58" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="58" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="58" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="60" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="60" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="60" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="60" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="62" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="64" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="66" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="68" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="70" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="66" y="72" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="74" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="64" y="76" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="78" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="80" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="80" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="80" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="80" width="2" height="2" fill="#4E6FFF"/><rect x="54" y="82" width="2" height="2" fill="#4E6FFF"/><rect x="56" y="82" width="2" height="2" fill="#4E6FFF"/><rect x="58" y="82" width="2" height="2" fill="#4E6FFF"/><rect x="60" y="82" width="2" height="2" fill="#4E6FFF"/><rect x="62" y="82" width="2" height="2" fill="#4E6FFF"/></g>
    <g id="dw-hammer" class="dw-only dw-on-tool"><rect x="6" y="70" width="18" height="12" fill="#142660"/><rect x="8" y="72" width="14" height="8" fill="#A7B0CC"/><rect x="8" y="72" width="8" height="2" fill="#FFFFFF"/><rect x="8" y="74" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="76" width="6" height="4" fill="#5B6488"/><rect x="8" y="78" width="8" height="2" fill="#5B6488"/><rect x="6" y="72" width="2" height="8" fill="#5B6488"/><rect x="22" y="74" width="26" height="8" fill="#142660"/><rect x="24" y="76" width="22" height="4" fill="#222A4E"/><rect x="24" y="76" width="6" height="2" fill="#5B6488"/><rect x="42" y="74" width="6" height="8" fill="#142660"/><g id="dw-hand"><path d="M28 72h8v2h2v4h-2v2h-8v-2h-2v-4h2z" fill="#142660"/><path d="M30 74h6v2h2v2h-8v-4z" fill="#4E6FFF"/><rect x="32" y="74" width="2" height="2" fill="#FFFFFF"/></g></g><g id="dw-face"><rect x="24" y="68" width="2" height="4" fill="#142660"/><rect x="38" y="68" width="2" height="4" fill="#142660"/></g>
    <g id="dw-face-blink" class="dw-alt dw-on-idle"><rect x="24" y="70" width="4" height="2" fill="#142660"/><rect x="38" y="70" width="4" height="2" fill="#142660"/></g>
    <g id="dw-face-up" class="dw-alt dw-on-thinking"><rect x="24" y="66" width="2" height="4" fill="#142660"/><rect x="38" y="66" width="2" height="4" fill="#142660"/></g><g id="dw-face-up-blink" class="dw-alt dw-on-thinking"><rect x="22" y="68" width="4" height="2" fill="#142660"/><rect x="38" y="68" width="4" height="2" fill="#142660"/></g>
    <g id="dw-face-happy" class="dw-alt dw-on-done dw-on-music dw-on-splash dw-on-hop"><rect x="24" y="68" width="2" height="2" fill="#142660"/><rect x="26" y="70" width="2" height="2" fill="#142660"/><rect x="28" y="68" width="2" height="2" fill="#142660"/><rect x="36" y="68" width="2" height="2" fill="#142660"/><rect x="38" y="70" width="2" height="2" fill="#142660"/><rect x="40" y="68" width="2" height="2" fill="#142660"/></g>
    <g id="dw-face-sad" class="dw-alt dw-on-error"><rect x="24" y="68" width="4" height="4" fill="#142660"/><rect x="24" y="68" width="2" height="2" fill="#FFFFFF"/><rect x="38" y="68" width="4" height="4" fill="#142660"/><rect x="38" y="68" width="2" height="2" fill="#FFFFFF"/><rect x="22" y="64" width="4" height="2" fill="#142660"/><rect x="38" y="64" width="4" height="2" fill="#142660"/></g>
    <g id="dw-face-sleep" class="dw-alt dw-on-sleeping"><rect x="24" y="70" width="2" height="2" fill="#142660"/><rect x="28" y="70" width="2" height="2" fill="#142660"/><rect x="36" y="70" width="2" height="2" fill="#142660"/><rect x="40" y="70" width="2" height="2" fill="#142660"/></g>
    <g id="dw-face-odd" class="dw-alt dw-on-poke"><rect x="24" y="68" width="2" height="2" fill="#142660"/><rect x="26" y="70" width="2" height="2" fill="#142660"/><rect x="24" y="72" width="2" height="2" fill="#142660"/><rect x="40" y="68" width="2" height="2" fill="#142660"/><rect x="38" y="70" width="2" height="2" fill="#142660"/><rect x="40" y="72" width="2" height="2" fill="#142660"/></g>
    <g id="dw-face-focus" class="dw-alt dw-on-tool"><rect x="24" y="68" width="2" height="4" fill="#142660"/><rect x="38" y="68" width="2" height="4" fill="#142660"/><rect x="22" y="66" width="4" height="2" fill="#142660"/><rect x="38" y="66" width="4" height="2" fill="#142660"/></g>
    <g id="dw-face-drowsy" class="dw-alt dw-on-drowsy"><rect x="22" y="68" width="6" height="2" fill="#142660"/><rect x="36" y="68" width="6" height="2" fill="#142660"/><rect x="24" y="70" width="2" height="2" fill="#142660"/><rect x="38" y="70" width="2" height="2" fill="#142660"/></g>
    <g id="dw-face-drag" class="dw-alt dw-on-drag"><rect x="22" y="64" width="4" height="2" fill="#142660"/><rect x="38" y="64" width="4" height="2" fill="#142660"/><rect x="22" y="66" width="6" height="6" fill="#FFFFFF"/><rect x="24" y="68" width="2" height="2" fill="#142660"/><rect x="36" y="66" width="6" height="6" fill="#FFFFFF"/><rect x="38" y="68" width="2" height="2" fill="#142660"/><rect x="46" y="68" width="2" height="4" fill="#7FDBFF"/><rect x="46" y="68" width="2" height="2" fill="#142660"/></g>
    <g id="dw-blush" class="dw-alt dw-on-done dw-on-music dw-on-splash dw-on-poke dw-on-hop dw-on-drag"><rect x="20" y="74" width="4" height="2" fill="#FF8FB8"/><rect x="40" y="74" width="4" height="2" fill="#FF8FB8"/></g>
    <g id="dw-mouth-smile"><rect x="30" y="76" width="4" height="2" fill="#142660"/></g><g id="dw-mouth-drag-closed" class="dw-alt dw-on-drag"><rect x="28" y="76" width="10" height="2" fill="#142660"/></g><g id="dw-mouth-drag-open" class="dw-alt dw-on-drag"><rect x="26" y="72" width="14" height="10" fill="#142660"/><rect x="28" y="74" width="10" height="6" fill="#222A4E"/><rect x="28" y="74" width="10" height="2" fill="#FFFFFF"/><rect x="30" y="78" width="6" height="2" fill="#FF4D5E"/></g><g id="dw-mouth-think-closed" class="dw-alt dw-on-thinking"><rect x="28" y="76" width="6" height="2" fill="#142660"/><rect x="26" y="74" width="2" height="2" fill="#142660"/><rect x="36" y="74" width="2" height="2" fill="#142660"/></g><g id="dw-mouth-think-open" class="dw-alt dw-on-thinking"><rect x="30" y="74" width="6" height="4" fill="#142660"/><rect x="32" y="76" width="2" height="2" fill="#FF8FB8"/></g>
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
    <g id="dw-firework" class="dw-only dw-on-done"><g id="dw-fw-launch"><rect x="37" y="10" width="2" height="10" fill="#FFD447"/><rect x="33" y="14" width="10" height="2" fill="#FFD447"/><rect x="35" y="12" width="2" height="2" fill="#FF8A3D"/><rect x="41" y="12" width="2" height="2" fill="#FF8A3D"/><rect x="35" y="16" width="2" height="2" fill="#FF8A3D"/><rect x="41" y="16" width="2" height="2" fill="#FF8A3D"/><rect x="37" y="8" width="2" height="2" fill="#FF8A3D"/><rect x="37" y="20" width="2" height="2" fill="#FF8A3D"/><rect x="31" y="14" width="2" height="2" fill="#FF8A3D"/><rect x="45" y="14" width="2" height="2" fill="#FF8A3D"/><rect x="37" y="14" width="2" height="2" fill="#FFFFFF"/><rect x="37" y="22" width="2" height="2" fill="#FF8A3D"/><rect x="37" y="25" width="2" height="2" fill="#FF4D5E"/><rect x="37" y="28" width="2" height="2" fill="#FF4D5E"/></g><g id="dw-fw-flash"><rect x="22" y="15" width="2" height="2" fill="#FFFFFF"/><rect x="26" y="15" width="4" height="2" fill="#9D7BFF"/><rect x="36" y="15" width="4" height="2" fill="#35D07F"/><rect x="44" y="15" width="6" height="2" fill="#7FDBFF"/><rect x="36" y="2" width="2" height="4" fill="#FFD447"/><rect x="36" y="10" width="2" height="6" fill="#FFFFFF"/><rect x="36" y="18" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="26" width="2" height="4" fill="#FFD447"/><rect x="34" y="12" width="4" height="4" fill="#FFD447"/><rect x="38" y="14" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="16" width="2" height="2" fill="#FFFFFF"/><rect x="32" y="18" width="2" height="2" fill="#FFFFFF"/><rect x="40" y="10" width="2" height="2" fill="#BEE1FF"/><rect x="44" y="10" width="2" height="2" fill="#7FDBFF"/><rect x="44" y="22" width="2" height="2" fill="#9D7BFF"/><rect x="64" y="22" width="2" height="2" fill="#FFFFFF"/><rect x="52" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="60" y="30" width="2" height="2" fill="#FF8FB8"/><rect x="20" y="10" width="2" height="2" fill="#35D07F"/><rect x="64" y="14" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="6" width="2" height="2" fill="#FFD447"/><rect x="12" y="18" width="2" height="2" fill="#9D7BFF"/><rect x="60" y="22" width="2" height="2" fill="#FFFFFF"/><rect x="44" y="18" width="2" height="2" fill="#9D7BFF"/><rect x="52" y="14" width="2" height="2" fill="#9D7BFF"/><rect x="20" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="52" y="14" width="2" height="2" fill="#35D07F"/></g><g class="dw-fw-ray" style="--fw-dx:42px;--fw-dy:2px"><rect x="36" y="16" width="4" height="4" fill="#FFD447"/></g><g class="dw-fw-ray" style="--fw-dx:38px;--fw-dy:18px"><rect x="36" y="16" width="4" height="4" fill="#FF8FB8"/></g><g class="dw-fw-ray" style="--fw-dx:28px;--fw-dy:32px"><rect x="36" y="16" width="4" height="4" fill="#FF4D5E"/></g><g class="dw-fw-ray" style="--fw-dx:14px;--fw-dy:40px"><rect x="36" y="16" width="4" height="4" fill="#9D7BFF"/></g><g class="dw-fw-ray" style="--fw-dx:-2px;--fw-dy:42px"><rect x="36" y="16" width="4" height="4" fill="#35D07F"/></g><g class="dw-fw-ray" style="--fw-dx:-18px;--fw-dy:38px"><rect x="36" y="16" width="4" height="4" fill="#7FDBFF"/></g><g class="dw-fw-ray" style="--fw-dx:-32px;--fw-dy:28px"><rect x="36" y="16" width="4" height="4" fill="#FF8A3D"/></g><g class="dw-fw-ray" style="--fw-dx:-40px;--fw-dy:14px"><rect x="36" y="16" width="4" height="4" fill="#FFFFFF"/></g><g class="dw-fw-ray" style="--fw-dx:-42px;--fw-dy:-2px"><rect x="36" y="16" width="4" height="4" fill="#FFD447"/></g><g class="dw-fw-ray" style="--fw-dx:-38px;--fw-dy:-18px"><rect x="36" y="16" width="4" height="4" fill="#FF8FB8"/></g><g class="dw-fw-ray" style="--fw-dx:-28px;--fw-dy:-32px"><rect x="36" y="16" width="4" height="4" fill="#FF4D5E"/></g><g class="dw-fw-ray" style="--fw-dx:-14px;--fw-dy:-40px"><rect x="36" y="16" width="4" height="4" fill="#9D7BFF"/></g><g class="dw-fw-ray" style="--fw-dx:2px;--fw-dy:-42px"><rect x="36" y="16" width="4" height="4" fill="#35D07F"/></g><g class="dw-fw-ray" style="--fw-dx:18px;--fw-dy:-38px"><rect x="36" y="16" width="4" height="4" fill="#7FDBFF"/></g><g class="dw-fw-ray" style="--fw-dx:32px;--fw-dy:-28px"><rect x="36" y="16" width="4" height="4" fill="#FF8A3D"/></g><g class="dw-fw-ray" style="--fw-dx:40px;--fw-dy:-14px"><rect x="36" y="16" width="4" height="4" fill="#FFFFFF"/></g><g class="dw-fw-ray2" style="--fw-dx:26px;--fw-dy:6px"><rect x="37" y="17" width="2" height="2" fill="#9D7BFF"/></g><g class="dw-fw-ray2" style="--fw-dx:20px;--fw-dy:16px"><rect x="37" y="17" width="2" height="2" fill="#35D07F"/></g><g class="dw-fw-ray2" style="--fw-dx:12px;--fw-dy:24px"><rect x="37" y="17" width="2" height="2" fill="#7FDBFF"/></g><g class="dw-fw-ray2" style="--fw-dx:0px;--fw-dy:26px"><rect x="37" y="17" width="2" height="2" fill="#FF8A3D"/></g><g class="dw-fw-ray2" style="--fw-dx:-10px;--fw-dy:24px"><rect x="37" y="17" width="2" height="2" fill="#FFFFFF"/></g><g class="dw-fw-ray2" style="--fw-dx:-20px;--fw-dy:16px"><rect x="37" y="17" width="2" height="2" fill="#FFD447"/></g><g class="dw-fw-ray2" style="--fw-dx:-26px;--fw-dy:6px"><rect x="37" y="17" width="2" height="2" fill="#FF8FB8"/></g><g class="dw-fw-ray2" style="--fw-dx:-26px;--fw-dy:-6px"><rect x="37" y="17" width="2" height="2" fill="#FF4D5E"/></g><g class="dw-fw-ray2" style="--fw-dx:-20px;--fw-dy:-16px"><rect x="37" y="17" width="2" height="2" fill="#9D7BFF"/></g><g class="dw-fw-ray2" style="--fw-dx:-12px;--fw-dy:-24px"><rect x="37" y="17" width="2" height="2" fill="#35D07F"/></g><g class="dw-fw-ray2" style="--fw-dx:0px;--fw-dy:-26px"><rect x="37" y="17" width="2" height="2" fill="#7FDBFF"/></g><g class="dw-fw-ray2" style="--fw-dx:10px;--fw-dy:-24px"><rect x="37" y="17" width="2" height="2" fill="#FF8A3D"/></g><g class="dw-fw-ray2" style="--fw-dx:20px;--fw-dy:-16px"><rect x="37" y="17" width="2" height="2" fill="#FFFFFF"/></g><g class="dw-fw-ray2" style="--fw-dx:26px;--fw-dy:-6px"><rect x="37" y="17" width="2" height="2" fill="#FFD447"/></g></g><g id="dw-confetti" class="dw-only dw-on-done"><rect x="8" y="40" width="2" height="4" fill="#FF8FB8"/><rect x="80" y="48" width="2" height="4" fill="#BEE1FF"/><rect x="72" y="40" width="4" height="2" fill="#FFD447"/></g>
  </g>
  </g>
  <g id="dw-props">
    <g id="dw-cloud" class="dw-only dw-on-thinking"><rect x="10" y="14" width="10" height="2" fill="#142660"/><rect x="24" y="14" width="12" height="2" fill="#142660"/><rect x="40" y="14" width="10" height="2" fill="#142660"/><rect x="8" y="16" width="12" height="2" fill="#142660"/><rect x="24" y="16" width="14" height="2" fill="#142660"/><rect x="42" y="16" width="10" height="2" fill="#142660"/><rect x="4" y="18" width="50" height="2" fill="#142660"/><rect x="2" y="20" width="54" height="2" fill="#142660"/><rect x="2" y="22" width="54" height="2" fill="#142660"/><rect x="2" y="24" width="54" height="2" fill="#142660"/><rect x="4" y="26" width="52" height="2" fill="#142660"/><rect x="6" y="28" width="48" height="2" fill="#142660"/><rect x="10" y="30" width="40" height="2" fill="#142660"/><rect x="10" y="16" width="8" height="2" fill="#FFFFFF"/><rect x="26" y="16" width="10" height="2" fill="#FFFFFF"/><rect x="44" y="16" width="6" height="2" fill="#FFFFFF"/><rect x="8" y="18" width="12" height="2" fill="#FFFFFF"/><rect x="24" y="18" width="14" height="2" fill="#FFFFFF"/><rect x="42" y="18" width="10" height="2" fill="#FFFFFF"/><rect x="4" y="20" width="50" height="2" fill="#FFFFFF"/><rect x="4" y="22" width="50" height="2" fill="#FFFFFF"/><rect x="4" y="24" width="50" height="2" fill="#FFFFFF"/><rect x="6" y="26" width="48" height="2" fill="#FFFFFF"/><rect x="10" y="28" width="40" height="2" fill="#FFFFFF"/><rect x="16" y="30" width="28" height="2" fill="#FFFFFF"/><rect x="4" y="30" width="42" height="2" fill="#BEE1FF"/><rect x="8" y="32" width="34" height="2" fill="#BEE1FF"/><rect x="14" y="34" width="22" height="2" fill="#BEE1FF"/></g><g id="dw-formula1" class="dw-only dw-on-thinking"><g transform="translate(8 2)"><rect x="2" y="0" width="2" height="2" fill="#142660"/><rect x="6" y="0" width="2" height="2" fill="#142660"/><rect x="0" y="2" width="4" height="2" fill="#142660"/><rect x="6" y="2" width="6" height="2" fill="#142660"/><rect x="10" y="4" width="2" height="2" fill="#142660"/><rect x="0" y="6" width="4" height="2" fill="#142660"/><rect x="6" y="6" width="6" height="2" fill="#142660"/><rect x="2" y="8" width="2" height="2" fill="#142660"/><rect x="6" y="8" width="2" height="2" fill="#142660"/><rect x="2" y="10" width="6" height="2" fill="#142660"/><rect x="4" y="0" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="0" y="4" width="10" height="2" fill="#FFFFFF"/><rect x="4" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="8" width="2" height="2" fill="#FFFFFF"/></g></g><g id="dw-formula2" class="dw-only dw-on-thinking"><g transform="translate(26 2)"><rect x="2" y="0" width="6" height="2" fill="#142660"/><rect x="10" y="0" width="2" height="2" fill="#142660"/><rect x="0" y="2" width="2" height="2" fill="#142660"/><rect x="4" y="2" width="2" height="2" fill="#142660"/><rect x="8" y="2" width="4" height="2" fill="#142660"/><rect x="0" y="4" width="4" height="2" fill="#142660"/><rect x="6" y="4" width="4" height="2" fill="#142660"/><rect x="0" y="6" width="2" height="2" fill="#142660"/><rect x="4" y="6" width="2" height="2" fill="#142660"/><rect x="8" y="6" width="4" height="2" fill="#142660"/><rect x="2" y="8" width="6" height="2" fill="#142660"/><rect x="10" y="8" width="2" height="2" fill="#142660"/><rect x="0" y="10" width="4" height="2" fill="#142660"/><rect x="6" y="10" width="6" height="2" fill="#142660"/><rect x="0" y="0" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="0" width="2" height="2" fill="#FFFFFF"/><rect x="2" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="4" width="2" height="2" fill="#FFFFFF"/><rect x="2" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="0" y="8" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="8" width="2" height="2" fill="#FFFFFF"/></g></g><g id="dw-formula3" class="dw-only dw-on-thinking"><g transform="translate(44 2)"><rect x="0" y="0" width="12" height="2" fill="#142660"/><rect x="10" y="2" width="2" height="2" fill="#142660"/><rect x="0" y="4" width="12" height="2" fill="#142660"/><rect x="10" y="6" width="2" height="2" fill="#142660"/><rect x="0" y="8" width="12" height="2" fill="#142660"/><rect x="0" y="2" width="10" height="2" fill="#FFFFFF"/><rect x="0" y="6" width="10" height="2" fill="#FFFFFF"/></g></g><g id="dw-formula4" class="dw-only dw-on-thinking"><g transform="translate(60 2)"><rect x="10" y="0" width="2" height="2" fill="#142660"/><rect x="0" y="2" width="6" height="2" fill="#142660"/><rect x="8" y="2" width="4" height="2" fill="#142660"/><rect x="2" y="4" width="2" height="2" fill="#142660"/><rect x="6" y="4" width="4" height="2" fill="#142660"/><rect x="0" y="6" width="6" height="2" fill="#142660"/><rect x="8" y="6" width="4" height="2" fill="#142660"/><rect x="10" y="8" width="2" height="2" fill="#142660"/><rect x="0" y="10" width="12" height="2" fill="#142660"/><rect x="0" y="0" width="10" height="2" fill="#FFFFFF"/><rect x="6" y="2" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="4" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="0" y="8" width="10" height="2" fill="#FFFFFF"/></g></g><g id="dw-formula5" class="dw-only dw-on-thinking"><g transform="translate(74 16)"><rect x="2" y="0" width="2" height="2" fill="#142660"/><rect x="10" y="0" width="2" height="2" fill="#142660"/><rect x="2" y="2" width="4" height="2" fill="#142660"/><rect x="8" y="2" width="4" height="2" fill="#142660"/><rect x="0" y="4" width="4" height="2" fill="#142660"/><rect x="6" y="4" width="4" height="2" fill="#142660"/><rect x="4" y="6" width="4" height="2" fill="#142660"/><rect x="2" y="8" width="4" height="2" fill="#142660"/><rect x="0" y="10" width="4" height="2" fill="#142660"/><rect x="4" y="0" width="6" height="2" fill="#BEE1FF"/><rect x="6" y="2" width="2" height="2" fill="#BEE1FF"/><rect x="4" y="4" width="2" height="2" fill="#BEE1FF"/><rect x="0" y="6" width="4" height="2" fill="#BEE1FF"/><rect x="0" y="8" width="2" height="2" fill="#BEE1FF"/></g></g><g id="dw-formula6" class="dw-only dw-on-thinking"><g transform="translate(64 32)"><rect x="10" y="0" width="2" height="2" fill="#142660"/><rect x="2" y="2" width="6" height="2" fill="#142660"/><rect x="10" y="2" width="2" height="2" fill="#142660"/><rect x="2" y="4" width="2" height="2" fill="#142660"/><rect x="6" y="4" width="2" height="2" fill="#142660"/><rect x="10" y="4" width="2" height="2" fill="#142660"/><rect x="2" y="6" width="2" height="2" fill="#142660"/><rect x="6" y="6" width="2" height="2" fill="#142660"/><rect x="10" y="6" width="2" height="2" fill="#142660"/><rect x="0" y="8" width="4" height="2" fill="#142660"/><rect x="6" y="8" width="6" height="2" fill="#142660"/><rect x="0" y="0" width="10" height="2" fill="#FFD447"/><rect x="0" y="2" width="2" height="2" fill="#FFD447"/><rect x="8" y="2" width="2" height="2" fill="#FFD447"/><rect x="0" y="4" width="2" height="2" fill="#FFD447"/><rect x="8" y="4" width="2" height="2" fill="#FFD447"/><rect x="0" y="6" width="2" height="2" fill="#FFD447"/><rect x="8" y="6" width="2" height="2" fill="#FFD447"/></g></g><g id="dw-formula7" class="dw-only dw-on-thinking"><g transform="translate(2 36)"><rect x="4" y="0" width="2" height="2" fill="#142660"/><rect x="4" y="2" width="4" height="2" fill="#142660"/><rect x="0" y="4" width="4" height="2" fill="#142660"/><rect x="6" y="4" width="6" height="2" fill="#142660"/><rect x="2" y="6" width="4" height="2" fill="#142660"/><rect x="10" y="6" width="2" height="2" fill="#142660"/><rect x="4" y="8" width="2" height="2" fill="#142660"/><rect x="10" y="8" width="2" height="2" fill="#142660"/><rect x="4" y="10" width="8" height="2" fill="#142660"/><rect x="0" y="0" width="4" height="2" fill="#FFFFFF"/><rect x="0" y="2" width="4" height="2" fill="#FFFFFF"/><rect x="4" y="4" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="6" width="4" height="2" fill="#FFFFFF"/><rect x="6" y="8" width="4" height="2" fill="#FFFFFF"/></g></g>
    <g id="dw-dot1" class="dw-only dw-on-thinking"><g transform="translate(0 8)"><circle cx="22" cy="32" r="0"/><path d="M18 28h8v2h-8zM18 30h2v6h-2zM24 30h2v6h-2zM20 34h4v2h-4z" fill="#142660"/><path d="M20 30h4v4h-4z" fill="#FFFFFF"/></g></g><g id="dw-dot2" class="dw-only dw-on-thinking"><g transform="translate(0 8)"><path d="M26 36h6v2h-6zM26 38h2v4h-2zM30 38h2v4h-2zM28 40h2v2h-2z" fill="#142660"/><path d="M28 38h2v2h-2z" fill="#FFFFFF"/></g></g>
    <g id="dw-bubble" class="dw-only dw-on-waiting"><path d="M14 12h12v2h-12zM10 14h2v2h-2zM26 14h4v2h-4zM8 16h2v2h-2zM30 16h2v18h-2zM6 18h2v2h-2zM4 20h2v10h-2zM6 30h2v2h-2zM8 32h2v2h-2zM10 34h2v2h-2zM26 34h4v2h-4zM14 36h12v2h-12zM16 38h4v6h-4zM20 40h2v4h-2zM22 42h2v2h-2z" fill="#142660"/><path d="M12 14h14v22h-14zM10 16h2v18h-2zM26 16h4v18h-4zM8 18h2v14h-2zM6 20h2v10h-2z" fill="#FFD447"/><rect x="14" y="16" width="6" height="12" fill="#FF4D5E"/><rect x="14" y="32" width="6" height="4" fill="#FF4D5E"/></g>
    <g id="dw-tick1" class="dw-only dw-on-waiting"><rect x="0" y="8" width="2" height="6" fill="#FFD447"/><rect x="0" y="8" width="8" height="2" fill="#FFD447"/></g><g id="dw-tick2" class="dw-only dw-on-waiting"><rect x="0" y="24" width="2" height="6" fill="#FFD447"/><rect x="0" y="24" width="8" height="2" fill="#FFD447"/></g><g id="dw-tick3" class="dw-only dw-on-waiting"><rect x="34" y="4" width="4" height="2" fill="#FFD447"/><rect x="36" y="2" width="2" height="2" fill="#FFD447"/></g>
    <g id="dw-laptop" class="dw-only dw-on-writing"><rect x="0" y="44" width="24" height="30" fill="#142660"/><rect x="2" y="46" width="20" height="24" fill="#A7B0CC"/><rect x="2" y="46" width="20" height="2" fill="#5B6488"/><rect x="2" y="68" width="20" height="2" fill="#5B6488"/><rect x="2" y="46" width="2" height="24" fill="#BEE1FF"/><rect x="2" y="46" width="2" height="8" fill="#FFFFFF"/><rect x="4" y="48" width="16" height="20" fill="#222A4E"/><rect x="4" y="48" width="16" height="2" fill="#142660"/><rect x="18" y="50" width="2" height="2" fill="#7FDBFF"/><g id="dw-code-a" class="dw-only dw-on-writing"><rect x="6" y="52" width="10" height="2" fill="#9D7BFF"/></g><g id="dw-code-b" class="dw-only dw-on-writing"><rect x="6" y="56" width="6" height="2" fill="#35D07F"/></g><g id="dw-code-c" class="dw-only dw-on-writing"><rect x="6" y="60" width="12" height="2" fill="#FFD447"/></g><g id="dw-cursor" class="dw-only dw-on-writing"><rect x="6" y="64" width="4" height="2" fill="#FFFFFF"/></g><rect x="2" y="72" width="28" height="2" fill="#142660"/><rect x="2" y="74" width="30" height="2" fill="#142660"/><rect x="0" y="76" width="34" height="2" fill="#142660"/><rect x="0" y="78" width="38" height="2" fill="#142660"/><rect x="0" y="80" width="42" height="2" fill="#142660"/><rect x="0" y="82" width="46" height="2" fill="#142660"/><rect x="0" y="84" width="46" height="2" fill="#142660"/><rect x="4" y="74" width="26" height="2" fill="#A7B0CC"/><rect x="2" y="76" width="30" height="2" fill="#A7B0CC"/><rect x="2" y="78" width="34" height="2" fill="#A7B0CC"/><rect x="2" y="80" width="38" height="2" fill="#A7B0CC"/><rect x="2" y="82" width="42" height="2" fill="#5B6488"/><rect x="6" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="14" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="18" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="22" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="26" y="76" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="12" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="20" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="24" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="28" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="32" y="78" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="12" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="16" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="20" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="24" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="28" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="32" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="36" y="80" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="78" width="2" height="2" fill="#FFD447"/><rect x="26" y="76" width="2" height="2" fill="#9D7BFF"/><rect x="20" y="80" width="2" height="2" fill="#35D07F"/><g id="dw-fin-l"><path d="M20 72h8v2h2v4h-2v2h-8v-2h-2v-4h2z" fill="#142660"/><path d="M22 74h6v2h2v2h-8v-4z" fill="#4E6FFF"/><rect x="24" y="74" width="2" height="2" fill="#FFFFFF"/></g><g id="dw-fin-r"><path d="M28 74h8v2h2v4h-2v2h-8v-2h-2v-4h2z" fill="#142660"/><path d="M30 76h6v2h2v2h-8v-4z" fill="#4E6FFF"/><rect x="32" y="76" width="2" height="2" fill="#FFFFFF"/></g></g>
        <g id="dw-spark1" class="dw-only dw-on-writing"><rect x="10" y="38" width="2" height="2" fill="#FF8A3D"/><rect x="8" y="42" width="2" height="2" fill="#FF8A3D"/></g><g id="dw-spark2" class="dw-only dw-on-writing"><rect x="18" y="30" width="2" height="2" fill="#FF8FB8"/></g><g id="dw-spark3" class="dw-only dw-on-writing"><rect x="22" y="22" width="2" height="2" fill="#9D7BFF"/></g>
    <g id="dw-chart" class="dw-only dw-on-tool"><rect x="-12" y="46" width="18" height="44" fill="#142660"/><rect x="-10" y="48" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="52" width="14" height="4" fill="#FF4D5E"/><rect x="-10" y="56" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="60" width="14" height="4" fill="#FF4D5E"/><rect x="-10" y="64" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="68" width="14" height="4" fill="#FF4D5E"/><rect x="-10" y="72" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="76" width="14" height="4" fill="#FF4D5E"/><rect x="-10" y="80" width="14" height="4" fill="#FF8A3D"/><rect x="-10" y="84" width="14" height="4" fill="#FF4D5E"/></g>
    <g id="dw-tool-sparks" class="dw-only dw-on-tool"><rect x="8" y="66" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="66" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="66" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="64" width="2" height="2" fill="#FFFFFF"/><rect x="8" y="68" width="2" height="2" fill="#FFFFFF"/><rect x="4" y="62" width="2" height="2" fill="#FFFFFF"/><rect x="14" y="70" width="2" height="2" fill="#FFFFFF"/><rect x="6" y="60" width="2" height="2" fill="#FF8A3D"/><rect x="12" y="62" width="2" height="2" fill="#FF8A3D"/><rect x="4" y="68" width="2" height="2" fill="#FF8A3D"/><rect x="14" y="66" width="2" height="2" fill="#FF8A3D"/><rect x="10" y="74" width="2" height="2" fill="#FF8A3D"/><rect x="6" y="72" width="2" height="2" fill="#FF8A3D"/><rect x="2" y="64" width="2" height="2" fill="#FFD447"/><rect x="12" y="58" width="2" height="2" fill="#FFD447"/><rect x="16" y="72" width="2" height="2" fill="#FFD447"/></g><g id="dw-err-cloud" class="dw-only dw-on-error"><path d="M32 24h10v14h-10zM26 26h6v10h-6zM42 26h6v12h-6zM22 28h4v8h-4zM48 28h6v8h-6zM20 30h2v4h-2zM54 30h4v4h-4zM54 34h2v2h-2zM28 36h4v2h-4zM48 36h4v2h-4z" fill="#FFFFFF"/><path d="M32 26h10v10h-10zM26 28h6v6h-6zM42 28h6v8h-6zM22 30h4v4h-4zM48 30h6v4h-6zM54 32h2v2h-2zM28 34h4v2h-4zM48 34h4v2h-4z" fill="#A7B0CC"/><g id="dw-cloud1"><rect x="22" y="34" width="6" height="2" fill="#5B6488"/><rect x="34" y="36" width="6" height="2" fill="#5B6488"/><rect x="48" y="34" width="4" height="2" fill="#5B6488"/></g><g id="dw-cloud2"><rect x="24" y="30" width="4" height="2" fill="#FFFFFF"/><rect x="40" y="30" width="6" height="2" fill="#FFFFFF"/><rect x="50" y="30" width="2" height="2" fill="#FFFFFF"/></g><g id="dw-cloud3"><rect x="18" y="38" width="4" height="2" fill="#5B6488"/><rect x="54" y="38" width="2" height="2" fill="#5B6488"/></g></g>
    <g id="dw-drop1" class="dw-only dw-on-error"><rect x="30" y="42" width="4" height="6" fill="#7FDBFF"/><rect x="30" y="42" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-drop2" class="dw-only dw-on-error"><rect x="40" y="48" width="4" height="6" fill="#7FDBFF"/><rect x="40" y="48" width="2" height="2" fill="#BEE1FF"/></g><g id="dw-drop3" class="dw-only dw-on-error"><rect x="50" y="42" width="2" height="6" fill="#7FDBFF"/><rect x="24" y="52" width="2" height="4" fill="#7FDBFF"/></g>
    <g id="dw-zzz" class="dw-only dw-on-sleeping"><g id="dw-z1" class="dw-only dw-on-sleeping"><rect x="58" y="8" width="10" height="2" fill="#A7B0CC"/><rect x="64" y="10" width="2" height="2" fill="#A7B0CC"/><rect x="62" y="12" width="2" height="2" fill="#A7B0CC"/><rect x="60" y="14" width="2" height="2" fill="#A7B0CC"/><rect x="58" y="16" width="10" height="2" fill="#A7B0CC"/></g><g id="dw-z2" class="dw-only dw-on-sleeping"><rect x="46" y="20" width="10" height="2" fill="#142660"/><rect x="52" y="22" width="2" height="2" fill="#142660"/><rect x="50" y="24" width="2" height="2" fill="#142660"/><rect x="48" y="26" width="2" height="2" fill="#142660"/><rect x="46" y="28" width="10" height="2" fill="#142660"/></g></g>
    <g id="dw-flust1" class="dw-only dw-on-poke"><rect x="16" y="52" width="2" height="2" fill="#142660"/><rect x="14" y="50" width="2" height="2" fill="#142660"/></g><g id="dw-flust2" class="dw-only dw-on-poke"><rect x="54" y="52" width="2" height="2" fill="#142660"/><rect x="56" y="50" width="2" height="2" fill="#142660"/></g><g id="dw-flust3" class="dw-only dw-on-poke"><rect x="62" y="44" width="2" height="2" fill="#FFD447"/></g>
  </g>
</svg>`,
}


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
    whaleEl.className = 'dsh-whale is-' + next + (isFast ? ' is-fast' : '')
    if (next !== 'idle' && next !== 'sleeping') lastActiveAt = now()
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
    lastActiveAt = now()
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

  function frame(timestamp) {
    if (disposed) return
    rafId = requestAnimationFrame(frame)
    if (!visible) return
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

  function onPointerDown(event) {
    if (disposed) return
    event.stopPropagation()
    pet.dragging = true
    dragMoved = false
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
      triggerTemp('poke', 950)
      spawnBurst('bubble', 5)
    }
    tempStage = null
    setStage(baseStage())
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

  },
})
