/* review/sideq-trim fix 3 (MAIN 162 LOOK): scan EVERY Việc nhờ / Phụ tuyến offer card the game can make — the ask, «Nhận lời» and «Khéo từ chối»
   Được / Mất / Tốn text — for leaks: a letter / object label standing in for a person («Thư nhà (do … mang vào)», «(do »), raw slots «{», «undefined»,
   «null», «NaN». Fresh lives at ranks 1 / 3 / 5, every template tried with any asker (window.__sqoff) so the text of every card is seen.
   node dev/test/sideq-optscan.js [index.html] [lives=3]   exit 1 on any leak. */
const {chromium}=require('playwright');const path=require('path');const ROOT=path.resolve(__dirname,'../..');
const PAGE=process.argv[2]||path.join(ROOT,'index.html');const LIVES=+(process.argv[3]||3);
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(LIVES=>{const BAD=/\(do |Thư nhà|\{[A-Za-z]+\}|undefined|\bnull\b|NaN/;const seen=new Set(),leaks=[];let cards=0;
  for(let l=0;l<LIVES;l++)for(const rk of [1,3,5]){window.__bot=1;quiet=true;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();quiet=false;Q.length=0;S.rank=rk;
   window.__sqoff=1;for(const T of T72){let x=null;try{x=q72Make(T)}catch(e){}if(!x)continue;let d=null;try{d=PEND.q72o({x,how:""})}catch(e){}if(!d)continue;cards++;seen.add(T.id);
    const parts=[["ask",plain(d.t)]].concat(d.o.map(o=>[o.n,plain(o.x||"")]));for(const [k,t] of parts){const m=t.match(BAD);if(m)leaks.push(`${T.id} [${q72X(x).A.k}] ${k}: …${t.slice(Math.max(0,m.index-40),m.index+50)}…`)}}
   window.__sqoff=0}
  return{cards,templates:seen.size,total:T72.length,leaks:[...new Set(leaks)]}},LIVES);
 console.log(`cards ${r.cards} · templates seen ${r.templates}/${r.total} · leaks ${r.leaks.length}`);for(const l of r.leaks.slice(0,40))console.log('  LEAK '+l);
 console.log('page errors',errs.length,errs[0]||'');await b.close();console.log(r.leaks.length||errs.length?'FAIL':'PASS');process.exit(r.leaks.length||errs.length?1:0)})();
