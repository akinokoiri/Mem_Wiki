import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, unlink, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { startWikiPreview } from '../scripts/preview.mjs'

test('preview serves rebuilt HTML and new hashed assets without restarting', async t => {
  const outDir = await mkdtemp(path.join(tmpdir(), 'mem-wiki-preview-'))
  t.after(() => rm(outDir, { recursive: true, force: true }))
  await mkdir(path.join(outDir, 'assets'))
  await mkdir(path.join(outDir, 'mechanics'))
  const page = path.join(outDir, 'mechanics/skilltree.html')
  await writeFile(page, '<script type="module" src="/assets/app.old.js"></script>')
  await writeFile(path.join(outDir, 'assets/app.old.js'), 'export default "old"')
  const server = await startWikiPreview({ outDir, port: 0 })
  t.after(async () => {
    server.httpServer.closeAllConnections()
    await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()))
  })
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`
  const first = await fetch(`${origin}/mechanics/skilltree`)
  assert.equal(first.status, 200)
  assert.match(await first.text(), /app\.old\.js/)
  assert.equal(first.headers.get('cache-control'), 'no-cache')

  // A subsequent build replaces the document and creates a new asset name.
  await unlink(path.join(outDir, 'assets/app.old.js'))
  await writeFile(path.join(outDir, 'assets/app.new.js'), 'export default "new"')
  await writeFile(page, '<script type="module" src="/assets/app.new.js"></script>')
  const rebuilt = await fetch(`${origin}/mechanics/skilltree.html`)
  assert.match(await rebuilt.text(), /app\.new\.js/)
  const asset = await fetch(`${origin}/assets/app.new.js`)
  assert.equal(asset.status, 200)
  assert.match(asset.headers.get('content-type'), /javascript/)
  assert.equal(await asset.text(), 'export default "new"')
  assert.equal((await fetch(`${origin}/assets/app.old.js`)).status, 404)
  assert.equal((await fetch(`${origin}/missing-page`)).status, 404)
})
