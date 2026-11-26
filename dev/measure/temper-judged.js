/* REVIEW temper-perception B1 (LUẬT SỬA CẢ NHÓM): every outburst reaction of every kind of person (jemoact EA_REACT rows of who c/e/t/s/m/o/q/k
   + jfeel BAL.feel.act) → the deed it is judged as (BAL.tp base / map / jfeel use, tpDeedOf) and a LIVE check: the reaction is fired through the
   one hook (window.tpOut) by a real doer of that kind with two onlookers standing there (her + a consort, or two consorts), and the scan counts
   what LANDS (round 3, RV3 B1-R): tpJudge runs (TP.stat eye/up/hear delta) and numbers landed (runs − TP.stat.zero delta, i.e. a non-zero
   thiện cảm / Sủng / th / hh change), not the it.j marks tpDeed writes before judging. Also: every global function jtperc calls must exist
   in the page (a closure-only helper = the B1-R fault family). Self-only reactions (no one hurt or helped) are listed as «self».
   usage: node dev/measure/temper-judged.js [dev/index.html] → table; exit 1 when a harmful / kind reaction is not judged */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
/* the reactions that touch nobody else (her / his own fast, prayer, letter, sleepless night, work, retreat, sulking at home): never judged */
const SELF=new Set(["nuot","boan","thu","huong","matngu","trang","hat","tho","theu","eruou","emat","tkinh","hang","mbo","mruou","ole","qbo","kbo",
 "tron","caobenh","bodo","moi","ngoithu","mach","quengio","sangtac","khoc","tui"].filter(k=>!["khoc","tui"].includes(k)));
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(SELF=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const FX=(BAL.feel.act||{}).fx||{},has=typeof tpDeedOf==="function";const deedOf=k=>has?tpDeedOf(k):(BAL.tp.base[k]?k:(FX[k]&&FX[k].use&&BAL.tp.base[FX[k].use]?FX[k].use:null));
  const cons=(rivals||[]).filter(v=>v.alive&&!v.out);const allS=typeof allServ==="function"?allServ():[];
  const doer={c:cons[0],e:S.emp,t:S.thO,s:S.maid||allS[0],m:(S.men||[])[0],o:S.court?Object.values(S.court).find(x=>x&&typeof x==="object"):null,
   q:(()=>{try{return (S.mins||S.court2||[]).find?null:null}catch(e){return null}})(),k:(()=>{try{return (allKids()[0]||[])[0]}catch(e){return null}})()};
  if(!doer.q){/* a minister: the court houses (j55 S.trieu.H, made on the first court day — made here through the game's own maker when absent) */try{const T=typeof trS==="function"?trS():S.trieu;doer.q=Object.values((T||{}).H||{}).find(h=>h&&h.isMin)||null}catch(e){}}
  if(!doer.k){/* no child at the start: give the first consort one through the game's own birth record shape, for the scan only */try{const c=cons[1]||cons[0];c.kids=c.kids||[];if(!c.kids.length)c.kids.push({name:"Tiểu hoàng tử",age:5,alive:true,sex:"m",__scan:1});doer.k=c.kids[0]}catch(e){}}
  const rows=[],seen={};const L=[];for(const x of EA_REACT){const id=x.who+":"+x.k;if(seen[id])continue;seen[id]=1;L.push({who:x.who,k:x.k,n:x.n})}
  for(const k in FX){if(seen["c:"+k])continue;seen["c:"+k]=1;L.push({who:"c",k,n:k,feel:1})}
  for(const x of L){const d=deedOf(x.k),self=SELF.includes(x.k);let j=0,ran=0,land=0,carry=0,place=null,err="";const X=doer[x.who];
   if(d&&X){try{const eyes=[S,cons[1]||cons[0],cons[2]].filter(o=>o&&o!==X);const n0=S.tp&&S.tp.n||0;const st0=JSON.parse(JSON.stringify(TP.stat));const r0=Object.assign({},(S.tp&&S.tp.r)||{});
     window.tpOut(X,{k:has?x.k:d,n:x.n},{target:null},{pl:"scan",kh:0,eyes},x.feel?1:0);const it=S.tp&&S.tp.n>n0?S.tp.q[S.tp.q.length-1]:null;j=it?Object.keys(it.j).length:0;
     ran=(TP.stat.eye-st0.eye)+(TP.stat.up-st0.up)+(TP.stat.hear-st0.hear);land=ran-(TP.stat.zero-st0.zero);{const r1=(S.tp&&S.tp.r)||{};for(const k of new Set([...Object.keys(r0),...Object.keys(r1)]))carry+=Math.abs((r1[k]||0)-(r0[k]||0));carry=+carry.toFixed(2)}
     try{place=typeof tpWhere==="function"?tpWhere(X):null}catch(e){}}catch(e){err=e.message}}
   rows.push({who:x.who,k:x.k,n:x.n,deed:d||"",self,doer:!!X,j,ran,land,carry,place:place?String(place).slice(0,20):"",err,ok:self?!d:(!!d&&(!X||land>0||carry>0))})}
  /* B1-R family: every helper jtperc calls by name is reachable from the page (none hidden inside another module's closure) */
  const need=["relMS","relKey","relMSOf","memKey","RV","emoGet","motiveOK","j95whereId","j95id","whereOf","eaKind","relOwner","allKids","agRec","j95at","liveRivals","trongOf","aff","netTh","oan","memList","affAdd","apply","ap","oanAdd","knwSee","hostility","kOf61","isSrv","wk","j95kh","log"];
  const miss=need.filter(n=>typeof window[n]!=="function"&&(()=>{try{return typeof eval(n)!=="function"}catch(e){return true}})());
  /* B2 (D 11:12Z): the mood term counts for the gây sự kinds only, same for her and an NPC (an angry consort + her, anger at the heavy level) */
  const mq=[];try{const v=cons[0];for(const P of [S,v]){for(const kd of ["a","b","c"])mkAdd(P,{kd:"mq-"+kd,k:"gian",s:95,why:"thử"},60);try{mkSync(P)}catch(e){}
    for(const kind of ["provoke","rumor","frame","poison","bribe","harm","plot"])mq.push({who:P===S?"her":"NPC",kind,m:tpMoodM(P,kind)})}}catch(e){mq.push({err:e.message})}
  rows.miss=miss;return {rows,miss,mq}},[...SELF]);
 const miss=r.miss;const R2=r.rows;const MQ=r.mq||[];
 console.log('| kind | key | reaction | judged as | it.j marks | tpJudge ran | numbers landed | fraction carried | doer stands at | ok |');console.log('|---|---|---|---|---|---|---|---|---|---|');
 for(const x of R2)console.log(`| ${x.who} | ${x.k} | ${x.n} | ${x.self?"self (no one)":x.deed||"NOT JUDGED"} | ${x.self?"":x.doer?x.j:"(no doer at start)"} | ${x.self||!x.doer?"":x.ran} | ${x.self||!x.doer?"":x.land} | ${x.self||!x.doer?"":x.carry} | ${x.self?"":x.place||"–"} | ${x.ok?"OK":"FAIL"}${x.err?" "+x.err:""} |`);
 const bad=R2.filter(x=>!x.ok);const notJ=R2.filter(x=>!x.self&&!x.deed).length,j0=R2.filter(x=>!x.self&&x.deed&&x.doer&&!x.land&&!x.carry).length;
 const byK={};for(const x of R2.filter(x=>!x.self&&x.deed&&x.doer)){const o=byK[x.who]=byK[x.who]||{rows:0,ran:0,land:0,zeroRows:0};o.rows++;o.ran+=x.ran;o.land+=x.land;if(!x.land&&!x.carry)o.zeroRows++}
 console.log('\n| doer kind | judged rows | tpJudge ran | numbers landed | rows with no effect (nothing landed, nothing carried) |');console.log('|---|---|---|---|---|');for(const k in byK)console.log(`| ${k} | ${byK[k].rows} | ${byK[k].ran} | ${byK[k].land} | ${byK[k].zeroRows} |`);
 const want=k=>["provoke","vent","humil","gossip","rumor"].includes(k);const mqBad=MQ.filter(x=>x.err||(want(x.kind)?x.m<=0:x.m!==0));
 console.log('\n| mood term (B2) | '+[...new Set(MQ.map(x=>x.kind))].join(' | ')+' |');console.log('|---|'+[...new Set(MQ.map(x=>x.kind))].map(()=>'---').join('|')+'|');
 for(const w of ["her","NPC"])console.log(`| ${w} | `+MQ.filter(x=>x.who===w).map(x=>x.m).join(' | ')+' |');console.log(`mood term outside gây sự: ${mqBad.length} wrong`);
 console.log(`helpers jtperc calls missing from the page: ${miss.length?miss.join(", "):"none"}`);
 console.log(`rows ${R2.length} · self ${R2.filter(x=>x.self).length} · judged-kind rows ${R2.filter(x=>!x.self).length} · not judged ${notJ} · judged but no effect live ${j0} · page errors ${errs.length}`);
 await b.close();process.exit(bad.length||errs.length||miss.length||mqBad.length?1:0)})();
