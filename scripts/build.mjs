/**
 * Concatenates the authored fragments into the single browser bundle the
 * module loader serves: `src/art.js` (pixel artwork + CSS) and
 * `src/engine.js` (overlay behaviour) share one factory scope, so neither
 * needs a bundler or a runtime import.
 *
 * Usage: node scripts/build.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const id = pkg.name
const art = readFileSync(join(root, 'src/art.js'), 'utf8')
const engine = readFileSync(join(root, 'src/engine.js'), 'utf8')

const bundle = `/**
 * ${id} — browser half (generated; edit src/art.js and src/engine.js,
 * then run \`node scripts/build.mjs\`).
 */
window.__ModuleLoader__.load({
  id: ${JSON.stringify(id)},
  factory(require) {
    const React = require('react')
    const h = React.createElement

${art}

${engine}
  },
})
`

writeFileSync(join(root, 'client.js'), bundle)
console.log('wrote client.js (%d KiB)', (bundle.length / 1024).toFixed(1))
