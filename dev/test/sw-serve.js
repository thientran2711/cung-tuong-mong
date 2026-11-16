/* Local static server for the sw.js update tests, close to GitHub Pages: Cache-Control max-age=600, ETag + 304, Range.
   usage: node dev/test/sw-serve.js <port> <site root> name=<overlay dir> [name=<overlay dir> …]
   Files present in the current overlay dir (index.html, sw.js, assets.json …) win over the site root, so one site can play several builds.
   GET /__ver/<name> switches the overlay (the test "deploys" build B, or the old main build).
   GET /__stale/<name> serves index.html from overlay <name> ONCE more (a stale copy from the HTTP cache / CDN after a deploy). */
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const [,,PORT,ROOT,...OV]=process.argv;const DIRS=Object.fromEntries(OV.map(s=>s.split('=')));let cur=OV.length?OV[0].split('=')[0]:null,stale=null;
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json',
 '.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.webm':'video/webm'};
const etags=new Map();
function etag(f,st){const k=f+':'+st.mtimeMs+':'+st.size;if(!etags.has(k))etags.set(k,'"'+crypto.createHash('sha1').update(k).digest('hex').slice(0,16)+'"');return etags.get(k)}
http.createServer((q,r)=>{const u=new URL(q.url,'http://x');let p=decodeURIComponent(u.pathname);
 if(p.startsWith('/__ver/')){cur=p.slice(7);r.end('ok '+cur);return}
 if(p.startsWith('/__stale/')){stale=p.slice(9);r.end('ok stale '+stale);return}
 if(p.endsWith('/'))p+='index.html';p=p.replace(/^\/+/,'');if(p.includes('..')){r.statusCode=400;r.end();return}
 let f=null;if(stale&&p==='index.html'&&DIRS[stale]){f=path.join(DIRS[stale],p);stale=null;r.setHeader('X-Stale','1')}
 else if(cur&&DIRS[cur]&&fs.existsSync(path.join(DIRS[cur],p)))f=path.join(DIRS[cur],p);else f=path.join(ROOT,p);
 fs.stat(f,(e,st)=>{if(e||!st.isFile()){r.statusCode=404;r.end('404');return}
  const et=etag(f,st);r.setHeader('Cache-Control','max-age=600');r.setHeader('ETag',et);r.setHeader('Accept-Ranges','bytes');
  r.setHeader('Content-Type',TYPES[path.extname(f)]||'application/octet-stream');
  if(q.headers['if-none-match']===et){r.statusCode=304;r.end();return}
  const rg=/bytes=(\d*)-(\d*)/.exec(q.headers.range||'');
  if(rg){const n=st.size,s=rg[1]===''?Math.max(0,n-(+rg[2])):+rg[1],t=rg[2]===''||rg[1]===''?n-1:Math.min(+rg[2],n-1);
   r.statusCode=206;r.setHeader('Content-Range',`bytes ${s}-${t}/${n}`);r.setHeader('Content-Length',t-s+1);fs.createReadStream(f,{start:s,end:t}).pipe(r);return}
  r.setHeader('Content-Length',st.size);fs.createReadStream(f).pipe(r)})}).listen(+PORT,()=>console.log('serving',ROOT,'on',PORT,'overlay',cur));
