/* REVIEW temper-perception B1 (LUẬT SỬA CẢ NHÓM): every outburst reaction of every kind of person (jemoact EA_REACT rows of who c/e/t/s/m/o/q/k
   + jfeel BAL.feel.act) → the deed it is judged as (BAL.tp base / map / jfeel use, tpDeedOf) and a LIVE check: the reaction is fired through the
   one hook (window.tpOut) by a real doer of that kind with two onlookers standing there (her + a consort, or two consorts), and the scan counts
   the judgments made (it.j) and the place the doer stands (tpWhere). Self-only reactions (no one hurt or helped) are listed as «self».
   usage: node dev/measure/temper-judged.js [dev/index.html] → table; exit 1 when a harmful / kind reaction is not judged */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
/* the reactions that touch nobody else (her / his own fast, prayer, letter, sleepless night, work, retreat, sulking at home): never judged */
const SELF=new Set(["nuot","boan","thu","huong","matngu","cau","trang","hat","tho","theu","eruou","emat","tkinh","hang","mbo","mruou","ole","qbo","kbo",
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
  for(const x of L){const d=deedOf(x.k),self=SELF.includes(x.k);let j=0,place=null,err="";const X=doer[x.who];
   if(d&&X){try{const eyes=[S,cons[1]||cons[0],cons[2]].filter(o=>o&&o!==X);const n0=S.tp&&S.tp.n||0;
     window.tpOut(X,{k:has?x.k:d,n:x.n},{target:null},{pl:"scan",kh:0,eyes},x.feel?1:0);const it=S.tp&&S.tp.n>n0?S.tp.q[S.tp.q.length-1]:null;j=it?Object.keys(it.j).length:0;
     try{place=typeof tpWhere==="function"?tpWhere(X):null}catch(e){}}catch(e){err=e.message}}
   rows.push({who:x.who,k:x.k,n:x.n,deed:d||"",self,doer:!!X,j,place:place?String(place).slice(0,20):"",err,ok:self?!d:(!!d&&(!X||j>0))})}
  return rows},[...SELF]);
 console.log('| kind | key | reaction | judged as | onlookers who judged | doer stands at | ok |');console.log('|---|---|---|---|---|---|---|');
 for(const x of r)console.log(`| ${x.who} | ${x.k} | ${x.n} | ${x.self?"self (no one)":x.deed||"NOT JUDGED"} | ${x.self?"":x.doer?x.j:"(no doer at start)"} | ${x.self?"":x.place||"–"} | ${x.ok?"OK":"FAIL"}${x.err?" "+x.err:""} |`);
 const bad=r.filter(x=>!x.ok);const notJ=r.filter(x=>!x.self&&!x.deed).length,j0=r.filter(x=>!x.self&&x.deed&&x.doer&&!x.j).length;
 console.log(`rows ${r.length} · self ${r.filter(x=>x.self).length} · judged-kind rows ${r.filter(x=>!x.self).length} · not judged ${notJ} · judged but nobody judged it live ${j0} · page errors ${errs.length}`);
 await b.close();process.exit(bad.length||errs.length?1:0)})();
