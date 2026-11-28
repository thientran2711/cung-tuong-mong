/* review/sideq-trim fix 3 (MAIN 162 LOOK): scan EVERY Việc nhờ / Phụ tuyến offer card the game can make — the ask, «Nhận lời» and «Khéo từ chối»
   Được / Mất / Tốn text — for leaks: a letter / object label standing in for a person («Thư nhà (do … mang vào)», «(do »), raw slots «{», «undefined»,
   «null», «NaN». Fresh lives at ranks 1 / 3 / 5, every template tried with any asker (window.__sqoff) so the text of every card is seen.
   node dev/test/sideq-optscan.js [index.html] [lives=3]   exit 1 on any leak. env VAGUE=1 also lists vague gain words left in option rows
   (owner 26/11 ~18:50Z (7) — the WORDING-GAIN helper kitHintPhrase/kitMk owns those words; this only counts them). */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');const ROOT=path.resolve(__dirname,'../..');
const PAGE=process.argv[2]||path.join(ROOT,'index.html');const LIVES=+(process.argv[3]||3);
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const VG=process.env.VAGUE?1:0;
 const r=await p.evaluate(([LIVES,VG])=>{const VAG=/chút ít|\(nhiều\)|tình nghĩa|tiếng hiền|thể diện|hên xui|được lòng|bớt tin|thêm oán|ân sủng nhạt/;const vag=[];const BAD=/\(do |Thư nhà|\{[A-Za-z]+\}|undefined|\bnull\b|NaN/;const seen=new Set(),leaks=[];let cards=0;
  for(let l=0;l<LIVES;l++)for(const rk of [1,3,5]){window.__bot=1;quiet=true;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();quiet=false;Q.length=0;S.rank=rk;
   window.__sqoff=1;for(const T of T72){let x=null;try{x=q72Make(T)}catch(e){}if(!x)continue;let d=null;try{d=PEND.q72o({x,how:""})}catch(e){}if(!d)continue;cards++;seen.add(T.id);
    let shown="";if(VG&&cards%4===0){try{Q.length=0;q72Offer(x,"");showModal();shown=document.getElementById("modal").innerText;$("modal").hidden=true;Q.length=0}catch(e){}}
    const parts=[["ask",plain(d.t)],["shown",shown]].concat(d.o.map(o=>[o.n,plain(o.x||"")]));for(const [k,t] of parts){const m=k==="shown"?null:t.match(BAD);if(m)leaks.push(`${T.id} [${q72X(x).A.k}] ${k}: …${t.slice(Math.max(0,m.index-40),m.index+50)}…`);if(VG&&k==="shown"){const v=t.match(VAG);if(v)vag.push(`${T.id} ${k}: …${t.slice(Math.max(0,v.index-30),v.index+40)}…`)}}}
   window.__sqoff=0}
  return{cards,templates:seen.size,total:T72.length,leaks:[...new Set(leaks)],vag:[...new Set(vag)]}},[LIVES,VG]);
 if(VG){console.log(`VAGUE gain words in option rows: ${r.vag.length}`);const vw={};for(const l of r.vag){const m=l.match(/chút ít|\(nhiều\)|tình nghĩa|tiếng hiền|thể diện|hên xui|được lòng|bớt tin|thêm oán|ân sủng nhạt/);vw[m?m[0]:"?"]=(vw[m?m[0]:"?"]||0)+1}console.log("  by word "+JSON.stringify(vw));for(const l of r.vag.slice(0,6))console.log('  VAGUE '+l)}
 console.log(`cards ${r.cards} · templates seen ${r.templates}/${r.total} · leaks ${r.leaks.length}`);for(const l of r.leaks.slice(0,40))console.log('  LEAK '+l);
 console.log('page errors',errs.length,errs[0]||'');await b.close();console.log(r.leaks.length||errs.length?'FAIL':'PASS');process.exit(r.leaks.length||errs.length?1:0)})();
