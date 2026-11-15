/* cdn-overlay-serve.js — test a build made with relative picture paths (CTM_IMG_BASE= python3 dev/build/assemble.py) against the CDN,
   with a few local pictures that are not pushed yet (art under review).
   usage: node dev/test/cdn-overlay-serve.js <port> <site root> <list file of img/… paths served locally> [overlay dir name=dir …]
   GET img/… : in the list → the local file; otherwise 302 to the CDN (IMG_BASE of dev/build/jcdn.js, or CTM_IMG_BASE).
   Everything else (index.html, sw.js, assets.json, audio…) from <site root>, or from the first overlay dir that has it. */
const http=require('http'),fs=require('fs'),path=require('path');
const [,,PORT,ROOT,LIST,...OV]=process.argv;
const BASE=process.env.CTM_IMG_BASE||(/const IMG_BASE="([^"]*)"/.exec(fs.readFileSync(path.join(ROOT,'dev/build/jcdn.js'),'utf8'))||[])[1];
const LOCAL=new Set(fs.readFileSync(LIST,'utf8').split('\n').map(s=>s.trim()).filter(Boolean));
const DIRS=OV.map(s=>s.split('=')[1]);
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.webmanifest':'application/manifest+json'};
http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname).replace(/^\/+/,'');if(!p||p.endsWith('/'))p+='index.html';if(p.includes('..')){r.statusCode=400;return r.end()}
 if(p.startsWith('img/')&&!LOCAL.has(p)){r.statusCode=302;r.setHeader('Location',BASE+p);r.setHeader('Access-Control-Allow-Origin','*');return r.end()}
 let f=path.join(ROOT,p);for(const d of DIRS){if(d&&fs.existsSync(path.join(d,p))){f=path.join(d,p);break}}
 fs.readFile(f,(e,b)=>{if(e){r.statusCode=404;return r.end('404')}r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-cache');r.end(b)})
}).listen(+PORT,()=>console.log('serving',ROOT,'on',PORT,'local',LOCAL.size,'CDN',BASE));
