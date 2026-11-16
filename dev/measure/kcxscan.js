// kc-roads-cn-nc-fix (LUẬT SỬA CẢ NHÓM, OD:L908): every home-road card (kcCard in jkc.js + jkc2.js) — the colour each word of its
// Được (Thành) / Kèm rows really gets from the game's own colour rule (j19 kcls / effList / kemCol), and effects that never apply
// (l:{...} on a card whose odds o is 100). usage: node dev/measure/kcxscan.js [out.json]   (serves the built index.html, no pictures)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const ROOT=path.resolve(__dirname,'../..');
function cards(src,file){const out=[];let i=0;while((i=src.indexOf('kcCard({',i))>=0){let d=0,j=i+7;for(;j<src.length;j++){const c=src[j];if(c==='{')d++;else if(c==='}'){d--;if(!d)break}}
  const body=src.slice(i+7,j+1);const line=src.slice(0,i).split('\n').length;i=j;
  const g=re=>{const m=body.match(re);return m?m[1]:null};
  const xm=body.match(/(?:^|[,{])x:(?:"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)/);
  out.push({file,line,n:g(/\bn:"([^"]*)"/)||g(/\bn:`([^`]*)`/)||'?',o:g(/\bo:([^,}]+)/),l:g(/\bl:(\{[^}]*\})/),w:g(/\bw:(\{[^}]*\})/),c:g(/\bc:(\{[^}]*\})/),
   x:xm?(xm[1]!=null?xm[1]:xm[2]).replace(/\$\{[^}]*\}/g,'X'):''})}return out}
const L=[].concat(...['jkc.js','jkc2.js'].map(f=>cards(fs.readFileSync(path.join(ROOT,'dev/build',f),'utf8'),f)));
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.route('http://g.local/**',r=>{const u=new URL(r.request().url()).pathname;if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u==='/'?'index.html':u);if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:/\.html$/.test(f)?'text/html':/\.json$/.test(f)?'application/json':'text/javascript'})});
 await p.goto('http://g.local/');await p.waitForTimeout(2500);
 const R=await p.evaluate(L=>L.map(a=>{const [th,km]=String(a.x).split(/ · kèm: /);const tok=(h)=>[...h.matchAll(/<span class="ef ([grn])">([\s\S]*?)<\/span>/g)].map(m=>[m[1],m[2].replace(/<[^>]+>/g,'')]);
  const T=th?tok(effList([th],'g')):[];const K=km?tok(kemCol(effList(km,'r'))):[];
  let wfx=[];try{wfx=tok(effList([fmt(eval('('+(a.w||'{}')+')'))],'g'))}catch(e){}
  const flags=[];for(const [c,t] of T)if(c==='r')flags.push('red under Được: '+t);for(const [c,t] of K)if(c==='g')flags.push('green under Kèm: '+t);
  for(const [c,t] of wfx)if(c==='r')flags.push('w effect red: '+t);
  const o=String(a.o||'100').trim();if(a.l&&a.l!=='{}'&&o==='100')flags.push('l never applies (o 100): '+a.l);
  return Object.assign({},a,{T,K,flags})}),L);
 const bad=R.filter(r=>r.flags.length);fs.writeFileSync(process.argv[2]||path.join(ROOT,'.tmp/kcxscan.json'),JSON.stringify(R,null,1));
 console.log(`cards ${R.length} · flagged ${bad.length}`);for(const r of bad)console.log(`${r.file}:${r.line} ${r.n} | ${r.flags.join(' ; ')}`);await b.close()})();
