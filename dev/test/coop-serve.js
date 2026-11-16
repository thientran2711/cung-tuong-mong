/* Serve the repo from disk inside Playwright (no local http server): route http://ctm.local/* to files.
   dev/index.html gets the same charset/viewport wrapper the site adds. */
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
const BASE='http://ctm.local/';
async function serve(ctx,root){const ROOT_=root?path.resolve(root):ROOT;
  await ctx.route(BASE+'**',async route=>{const u=new URL(route.request().url());let p=decodeURIComponent(u.pathname);
    if(p==='/'||p==='/index.html'){const body='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'+fs.readFileSync(path.join(ROOT_,'dev/index.html'),'utf8')+'</body></html>';
      return route.fulfill({status:200,contentType:MIME['.html'],body})}
    const f=path.join(ROOT_,p);if(!f.startsWith(ROOT_)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return route.fulfill({status:404,body:'nf'});
    route.fulfill({status:200,contentType:MIME[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
}
module.exports={serve,BASE};
