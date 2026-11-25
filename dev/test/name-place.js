/* button-crawl-fix-7 (robot s10 «Hà cô cô ở Tổng quản thái giám ??? cung»): the j61 name mask must never hide a PLACE whose first words equal an unknown
   person's name variant («Vĩnh Thọ cung» vs a servant «Trần Vĩnh Thọ»), and must still hide that person in a sentence. Whole family: every palace /
   place name (BAL.banCung.danh + PLNAME) × the mask, Fold page. usage: node dev/test/name-place.js [index.html|URL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const GAME=process.argv[2]||path.join(__dirname,'../../index.html');
function serve(file){const root=path.dirname(path.resolve(file)),idx=path.basename(file);return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);if(!f.startsWith(root)){r.writeHead(403);return r.end()}fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':/\.html$/.test(f)?'text/html; charset=utf-8':'application/octet-stream'});r.end(d)})});sv.listen(0,'127.0.0.1',()=>{sv.unref();res('http://127.0.0.1:'+sv.address().port+'/'+idx)})})}
(async()=>{const URL=/^https?:/.test(GAME)?GAME:await serve(GAME);const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();
 await p.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm|wav)(\?|$)/i,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function'&&typeof k61Scrub==='function',null,{timeout:180000});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;
  const places=[...new Set([...Object.keys((BAL.banCung||{}).danh||{}),...Object.values(PLNAME).map(v=>v[0])])].filter(x=>/ (cung|điện|viện|hiên|các|phủ|uyển)$/.test(x));
  /* an unknown servant whose name ends with the place stem (setup: the name is set, nothing else) */
  const e=k61All().find(x=>!k61Named(x)&&k61Kind(x)==='tq')||k61All().find(x=>!k61Named(x));const n0=e.name;const rows=[];
  for(const P of places){const stem=P.replace(/ \S+$/,'');e.name='Trần '+stem;K61VER++;K61RX=null;
   const a=k61Scrub(`Hà cô cô ở ${P} chờ ngươi.`,true,'',null,false);const c=k61Scrub(`Trần ${stem} sang thăm ngươi.`,true,'',null,true);const d=k61Scrub(`Ngươi gặp Trần ${stem} cung kính dâng trà.`,true,'',null,true);
   /* r2 (BIG REVIEWER #5): a place word that does NOT make a real place name with the stem must NOT unmask the person */
   const PL=new Set(places.map(x=>x.toLowerCase()));const extra=[[`Trần ${stem} các cung nữ đều sợ.`,'các'],[`Ngươi thấy ${stem} các phi tần đứng hầu.`,'các'],[`Tin rằng Trần ${stem} phủ đầu ngươi.`,'phủ'],[`Trần ${stem} điện hạ cho gọi.`,'điện']].filter(([t,w])=>!PL.has((stem+' '+w).toLowerCase()))
    /* a bare stem counts only when the mask hides it on its own (a one-word stem like «Đông» is not a name variant: nothing to leak) */
    .filter(([t])=>/Trần /.test(t)||!k61Scrub(`Ngươi thấy ${stem} sang thăm.`,true,'',null,true).includes(stem));
   const leak=extra.map(([t])=>k61Scrub(t,true,'',null,true)).filter(x=>x.includes(stem));
   rows.push({P,place:a.includes(P),masked:!c.includes(stem),masked2:!d.includes(stem),masked3:!leak.length,n3:extra.length,a,c,d,leak})}
  e.name=n0;K61VER++;K61RX=null;return rows});
 let fails=0;console.log('| place | place kept | person still masked | «cung kính» still masked | «các/phủ đầu/điện hạ» still masked |');console.log('|---|---|---|---|---|');
 for(const r of R){const ok=r.place&&r.masked&&r.masked2&&r.masked3;if(!ok)fails++;console.log(`| ${r.P} | ${r.place?'yes':'NO: '+r.a} | ${r.masked?'yes':'NO: '+r.c} | ${r.masked2?'yes':'NO: '+r.d} | ${r.masked3?'yes ('+r.n3+')':'NO: '+r.leak.join(' / ')} |`)}
 console.log(fails?`NAME-PLACE FAIL ${fails}/${R.length}`:`NAME-PLACE PASS ${R.length}/${R.length}`);await b.close();process.exit(fails?1:0)})();
