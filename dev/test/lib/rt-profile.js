/* dev/test/lib/rt-profile.js — FIXER #24 (Foreman E 19:25Z item vii): a FRESH (non-resume) life must not inherit the old
   <out>/profile-<life> localStorage (the old save came back → «LIFE VOID identity change»). freshProfile(dir) empties the
   profile before the browser opens it. Default keeps ONLY Chromium's HTTP cache (Default/Cache, Default/Code Cache, so
   pictures / music are not fetched again — the CDN 429 reason for one profile per life); every storage area (Local
   Storage, Session Storage, IndexedDB, Cookies, Service Worker, Preferences …) goes. RT_PROFILE_WIPE=all removes the
   whole folder; RT_PROFILE_WIPE=0 keeps it (old behaviour, for a proof only). A resume from ckpt never calls this. */
const fs = require('fs'), path = require('path');
const KEEP = new Set(['Default/Cache', 'Default/Code Cache']);
function freshProfile(dir) {
  const mode = process.env.RT_PROFILE_WIPE || 'storage';
  if (mode === '0' || !fs.existsSync(dir)) return { dir, mode, wiped: 0, kept: 0, existed: fs.existsSync(dir) };
  if (mode === 'all') { fs.rmSync(dir, { recursive: true, force: true }); return { dir, mode, wiped: 1, kept: 0, existed: true } }
  let wiped = 0, kept = 0;
  for (const e of fs.readdirSync(dir)) {
    const f = path.join(dir, e);
    if (e === 'Default' && fs.statSync(f).isDirectory()) { for (const d of fs.readdirSync(f)) { if (KEEP.has('Default/' + d)) { kept++; continue } fs.rmSync(path.join(f, d), { recursive: true, force: true }); wiped++ } continue }
    fs.rmSync(f, { recursive: true, force: true }); wiped++ }
  return { dir, mode, wiped, kept, existed: true };
}
module.exports = { freshProfile };
