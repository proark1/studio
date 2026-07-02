/* ===========================================================
   NFT Gym — Server
   - serves the static SPA (index.html + assets)
   - Bild-Studio image API backed by Postgres (Railway)
   Env:
     DATABASE_URL   Postgres connection string (Railway provides it)
     ADMIN_TOKEN    optional shared secret required for write endpoints
     PORT           provided by Railway (defaults to 3000 locally)
   Without DATABASE_URL the API replies 503 and the frontend
   automatically falls back to localStorage-only mode.
   =========================================================== */
const path = require('path');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const ROOT = __dirname;

app.use(express.json({ limit: '16mb' })); // base64 images can be large

/* ---------- Postgres ---------- */
// SSL for hosted DBs (Railway); disabled for local/docker Postgres.
const DB_URL = process.env.DATABASE_URL || '';
const useSsl = process.env.PGSSL === 'disable' ? false
  : /localhost|127\.0\.0\.1/.test(DB_URL) ? false
  : { rejectUnauthorized: false };
const pool = DB_URL ? new Pool({ connectionString: DB_URL, ssl: useSsl }) : null;

async function initDb() {
  if (!pool) { console.log('No DATABASE_URL — running in static/localStorage-only mode.'); return; }
  await pool.query(`CREATE TABLE IF NOT EXISTS studio_images (
    id text PRIMARY KEY,
    data_url text NOT NULL,
    mime text,
    width int,
    height int,
    bytes int,
    prompt text,
    model text,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`);
  console.log('Postgres connected — studio_images ready.');
}

/* ---------- write auth (optional) ---------- */
function requireToken(req, res, next) {
  if (!ADMIN_TOKEN) return next();                       // open if no token configured
  if (req.get('x-admin-token') === ADMIN_TOKEN) return next();
  return res.status(401).json({ error: 'invalid or missing admin token' });
}
const noDb = (res) => res.status(503).json({ error: 'no database configured' });

/* ---------- API ---------- */
app.get('/api/health', async (req, res) => {
  let db = false;
  try { if (pool) { await pool.query('SELECT 1'); db = true; } } catch (e) { /* db down */ }
  res.json({ ok: true, db, tokenRequired: !!ADMIN_TOKEN });
});

app.get('/api/images', async (req, res) => {
  if (!pool) return noDb(res);
  try {
    const { rows } = await pool.query(
      'SELECT id,data_url,mime,width,height,bytes,prompt,model,updated_at FROM studio_images');
    const images = {};
    for (const r of rows) images[r.id] = r;
    res.json({ images });
  } catch (e) { res.status(500).json({ error: String(e.message || e) }); }
});

app.put('/api/images/:id', requireToken, async (req, res) => {
  if (!pool) return noDb(res);
  const { id } = req.params;
  const { data_url, mime, width, height, bytes, prompt, model } = req.body || {};
  if (!data_url || !/^data:image\//.test(data_url))
    return res.status(400).json({ error: 'data_url (image data URI) required' });
  try {
    await pool.query(
      `INSERT INTO studio_images (id,data_url,mime,width,height,bytes,prompt,model,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,now())
       ON CONFLICT (id) DO UPDATE SET
         data_url=EXCLUDED.data_url, mime=EXCLUDED.mime, width=EXCLUDED.width,
         height=EXCLUDED.height, bytes=EXCLUDED.bytes, prompt=EXCLUDED.prompt,
         model=EXCLUDED.model, updated_at=now()`,
      [id, data_url, mime || null, width || null, height || null, bytes || null, prompt || null, model || null]);
    res.json({ ok: true, id });
  } catch (e) { res.status(500).json({ error: String(e.message || e) }); }
});

app.delete('/api/images/:id', requireToken, async (req, res) => {
  if (!pool) return noDb(res);
  try { await pool.query('DELETE FROM studio_images WHERE id=$1', [req.params.id]); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ error: String(e.message || e) }); }
});

// unknown API route -> JSON 404 (so it never falls through to index.html)
app.use('/api', (req, res) => res.status(404).json({ error: 'not found' }));

/* ---------- static SPA ---------- */
app.use(express.static(ROOT, { extensions: ['html'] }));
app.get('*', (req, res) => res.sendFile(path.join(ROOT, 'index.html')));

initDb()
  .catch(err => console.error('DB init failed (API will return 503):', err.message))
  .finally(() => app.listen(PORT, () => console.log('NFT Gym server listening on :' + PORT)));
