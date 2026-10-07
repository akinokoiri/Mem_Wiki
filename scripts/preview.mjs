import { parseArgs } from 'node:util'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'

const root = fileURLToPath(new URL('../', import.meta.url))

// Vite's preview checks the filesystem per request. VitePress 1.6's preview
// snapshots file names at startup and cannot serve new hashed assets after a build.
export function startWikiPreview({ outDir = '.vitepress/dist', host = '127.0.0.1', port = 4173 } = {}) {
  return preview({
    configFile: false,
    root,
    appType: 'mpa',
    build: { outDir },
    preview: { host, port, strictPort: true, headers: { 'Cache-Control': 'no-cache' } },
  })
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({ options: { host: { type: 'string' }, port: { type: 'string' } } })
  const port = values.port === undefined ? 4173 : Number(values.port)
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid preview port')
  const server = await startWikiPreview({ host: values.host, port })
  server.printUrls()
}
