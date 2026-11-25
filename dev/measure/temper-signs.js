/* TEMPER F1 family scan (LUẬT SỬA CẢ NHÓM): every outburst option label (jemoact R_ rows + jfeel acts, via eaPx / eaOptX) — the sign printed
   in the option text must be the sign applied: a loss that RAISES another's Oán / ghen prints «+n», a loss that lowers a feeling / stat prints «−n».
   Also F2: «Mắng cung nữ cung khác» when the other outranks her = «… sẽ đến hỏi tội» (the branch eaDo takes), never «oán ngươi».
   usage: node dev/measure/temper-signs.js [dev/index.html] → table, exit 1 on any wrong sign */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const rows=[],seen={};const R=window.EA_REACT.filter(x=>x.who==="c");const EO=/^(Bạc|Sức|Danh|Đức|Sủng|Tài)$/;
  const scan=(x,tag)=>{let P,X;try{P=eaPx(S,x);X=eaOptX(S,x)}catch(e){rows.push({k:x.k,tag,lab:"ERR "+e.message,ok:false});return}
   for(const y of P.L){if(EO.test(y[0])||(!y[1]&&!y[6]))continue;const up=/oán|ganh ghen/.test(y[0]);const want=up?`${y[0]} +${y[1]}`:`${y[0]} −${y[1]}`;
    const shown=(X.match(new RegExp(y[0].replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"[^,·]*"))||[""])[0].trim();rows.push({k:x.k,tag,lab:y[0],applied:y[6]?"hỏi tội":up?"+"+y[1]:"−"+y[1],shown,ok:/hỏi tội/.test(y[0])?/hỏi tội/.test(shown):shown===want})}};
  /* a fixed rival (the start palace often has none): the consort with maids that she resents most (S.ro), at her rank → the oán branch */
  const riv=(rivals||[]).find(v=>v.alive&&!v.out&&!v.queen&&(v.staff||[]).length);const rk0=riv?riv.rank:0;if(riv){S.ro=S.ro||{};S.ro[riv.id]=60;riv.rank=S.rank}
  for(const x of R){if(seen[x.k])continue;seen[x.k]=1;scan(x,riv?"rival at her rank":"no rival")}
  /* F2: the same rival outranks her (the hỏi tội branch of eaDo) */
  const kx=R.find(x=>x.k==="khac");
  if(kx&&riv){riv.rank=Math.min(7,S.rank+2);let X="";try{X=eaOptX(S,kx)}catch(e){X="ERR "+e.message}
   rows.push({k:"khac",tag:"rival outranks ("+riv.rank+" vs "+S.rank+")",lab:"(whole text)",applied:"hỏi tội",shown:X.slice(0,160),ok:/hỏi tội/.test(X)&&!/oán ngươi/.test(X)});riv.rank=rk0}
  else rows.push({k:"khac",tag:"rival outranks",lab:"no consort with maids",ok:false});
  return rows});
 console.log('| key | case | label | applied | shown | ok |');console.log('|---|---|---|---|---|---|');for(const x of r)console.log(`| ${x.k} | ${x.tag} | ${x.lab} | ${x.applied||""} | ${x.shown||""} | ${x.ok?"OK":"WRONG"} |`);
 const bad=r.filter(x=>!x.ok).length;console.log(`rows ${r.length} · wrong ${bad}`);await b.close();process.exit(bad?1:0)})();
