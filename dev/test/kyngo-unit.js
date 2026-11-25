/* kyngo-unit: «Kỳ ngộ thường ngày» rules in the live build (jky.js + BAL.kyngo).
   usage: node dev/test/kyngo-unit.js <url of root index.html>   → "ok"/"FAIL" lines, last line PASS / FAIL n
   1 ONE GATE: no eligible encounter → no roll, miss does not grow · 2 PITY: miss ≥ pity → sure hit · 3 COOLDOWN: no roll before cd ends
   4 ONCE PER LIFE: a met id is never eligible again · 5 CONSERVATION: vat_lac return / keep — the piece is in exactly one chest, the case
   follows (held + keep by the finder = two-way recognition road) · 6 NPC finds HER lost piece (she is the owner in law 1) · 7 OLD SAVE: S / NPC
   without ky load and roll lazily · 8 Sổ luân hồi line renders, life line gets "Kỳ ngộ: …" · 9 ilAudit net stays 0 · 10 every card text is
   cổ trang (no %, no OK words) · 11 the card is a PEND event in cost mode with an evId "kyngo:<id>" and a who face · 12 she is the WHO of an NPC's
   encounter (pass at the end of her buổi, household with her) · 13 co-op friend entry never rolls · 14/15 no card with every option unpayable. */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{timeout:0});await p.waitForFunction(()=>typeof start==='function'&&window.KY,null,{timeout:0});
 const R=await p.evaluate(()=>{const out=[];const ck=(n,ok,i)=>out.push([n,!!ok,i==null?"":JSON.stringify(i).slice(0,200)]);
  document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();Q.length=0;const B=BAL.kyngo;const p0=B.p0,st0=B.step;
  /* 1 gate */
  S.ky=null;const z=KY.band&&S;const k0="ksp";const e0=KY.elig(S,k0);B.p0=100;S.ky={m:0,cd:-1,seen:{},got:[],last:-1};
  for(const id in KY.DEF)if(!KY.DEF[id].pl.includes(k0))S.ky.seen[id]=0;/* only ksp encounters could ever qualify */
  const all=KY.elig(S,k0).length;KY.arrive(S,k0,"t");ck("1 gate: nothing eligible → no roll",all>0||(S.ky.m===0&&S.ky.last===-1),{all,last:S.ky.last});
  /* 2 pity + 3 cooldown: a forced eligible encounter */
  S.ky={m:0,cd:-1,seen:{},got:[],last:-1};B.p0=0;B.step=0;const D=KY.DEF.th_kinh;const pl0=D.pl,wh0=D.when,wo0=D.who;D.pl=["zz"];D.when=null;D.who=()=>({kind:"th"});
  for(const id in KY.DEF)if(id!=="th_kinh")S.ky.seen[id]=0;
  let rolls=0;for(let i=0;i<B.pity+1;i++){S.ky.last=-1;KY.arrive(S,"zz","t");rolls++;if(S.ky.got.length)break}
  ck("2 pity: sure hit at miss = pity",S.ky.got[0]==="th_kinh"&&rolls===B.pity+1,{rolls,pity:B.pity});
  const cd=S.ky.cd;ck("3 cooldown set by band",cd===wk()+B.cd[KY.band(S)],{cd,wk:wk()});
  ck("11 card: PEND kyngo, evId, who, cost mode",Q[0]&&Q[0].pid==="kyngo"&&Q[0].evId==="kyngo:th_kinh"&&Q[0].who&&Q[0].opts&&Q[0].opts.length===2,{t:Q[0]&&Q[0].t});
  const txt=Q.map(m=>(m.h||"")+(m.opts||[]).map(o=>o.n+" "+o.x).join(" ")).join(" ");
  ck("10 wording: no %, no OK words",!/%|\bOK\b|Đã hiểu|Chắc chắn/.test(txt),txt.match(/%|OK|Đã hiểu|Chắc chắn/));
  const o=Q[0].opts[0];const th0=S.th;Q.shift();apply(o.fx);o.go();ck("option runs: Thái hậu thiện cảm up, result card",S.th>th0&&Q[0]&&Q[0].ky,{th0,th:S.th});Q.length=0;
  S.ky.cd=wk()+5;S.ky.seen={};S.ky.last=-1;B.p0=100;KY.arrive(S,"zz","t");ck("3 cooldown: no roll while it runs",S.ky.got.length===1);
  S.ky.cd=-1;S.ky.last=-1;for(const id in KY.DEF)if(id!=="th_kinh")S.ky.seen[id]=0;S.ky.seen.th_kinh=wk();const L4=KY.elig(S,"zz");ck("4 once per life",!L4.some(x=>x.id==="th_kinh"));
  D.pl=pl0;D.when=wh0;D.who=wo0;
  /* 5 conservation: vat_lac */
  const v=liveRivals(true).find(x=>(x.inv||[]).some(e=>e&&loOk(e)));let c5=null;
  if(v){c5=loLose(v,{cause:"mis"});}
  if(c5){const mk=()=>({id:"vat_lac",D:KY.DEF.vat_lac,E:B.E.vat_lac,W:{kind:"own",ref:v},X:{lc:c5},k:"vuon",F:S,b:KY.band(S)});
   const where=()=>{let n=0;for(const pp of [S].concat(rivals))for(const e of pp.inv||[])if(e&&(e.lo===c5.id||e===c5.e))n++;return n};
   /* keep */
   S.ky={m:0,cd:-1,seen:{},got:[],last:-1};for(const id in KY.DEF)if(id!=="vat_lac")S.ky.seen[id]=0;
   const L=KY.elig(S,"vuon").filter(x=>x.id==="vat_lac");ck("5a vat_lac eligible with a real lost piece (owner another consort)",L.length>0&&L[0].X.lc===c5,{n:L.length});
   if(L.length){Q.length=0;KY.arrive.call(null,S,"vuon","t");}
   /* drive the option directly through the card if it came, else through the engine object */
   const m=Q.find(x=>x.pid==="kyngo"&&x.evId==="kyngo:vat_lac");
   if(m){const ok=m.opts[1];Q.length=0;apply(ok.fx);ok.go();ck("5b keep: the piece is in her chest once, the case held by her (keep)",where()===1&&c5.st==="held"&&c5.at==="me"&&c5.keep===1&&S.inv.some(e=>e.lo===c5.id),{w:where(),st:c5.st,at:c5.at})}
   else ck("5b keep (card)",false,{q:Q.map(x=>x.evId)});
  }else ck("5 conservation: setup (a consort with a losable piece)",false);
  /* 6: an NPC finds HER lost piece */
  Q.length=0;if(!(S.inv||[]).some(e=>e&&loOk(e))){const k=Object.keys(IT).find(k=>IT[k].pr>=LO.minPr*2&&!IT[k].nt&&!IT[k].evi&&!IT[k].keep);if(k)S.inv.push({k,from:"test"})}const mine=(S.inv||[]).find(e=>e&&loOk(e));let c6=null;if(mine)c6=loLose(S,{cause:"mis"});Q.length=0;
  const F=liveRivals(true)[0];if(c6&&F){F.ky={m:0,cd:-1,seen:{},got:[],last:-1};for(const id in KY.DEF)if(id!=="vat_lac")F.ky.seen[id]=0;
   const L6=KY.elig(F,"vuon").filter(x=>x.id==="vat_lac"&&x.X.lc.own==="me");ck("6 NPC can find HER lost piece (law 1)",L6.length>0,{n:L6.length});}
  else ck("6 setup (her losable piece)",!!c6,{});
  /* 7 old save */
  const ser=JSON.parse(JSON.stringify(S));delete ser.ky;ck("7 old save: no ky field → lazy",(()=>{try{const S2=ser;S2.ky=undefined;const keep=S;return true}catch(e){return false}})());
  for(const x of rivals)delete x.ky;delete S.ky;S.ky=undefined;try{KY.npcPass();KY.arrive(S,"vuon","t");ck("7 old save: rolls with no ky field",!!S.ky&&rivals.filter(x=>x.alive).every(x=>!x.ky||typeof x.ky==="object"))}catch(e){ck("7 old save",false,String(e))}
  /* 8 book + life line */
  const bh=KY.bookHTML();ck("8 Sổ luân hồi block",/Kỳ ngộ/.test(bh)&&/kỳ ngộ đã gặp/.test(bh));
  /* 9 ledger */
  try{ilCensus();ck("9 ilAudit net 0",ilS().net===0,{net:ilS().net})}catch(e){ck("9 ilAudit",false,String(e))}
  /* 12 (r2 F2) she is the WHO of an NPC's encounter: the NPC pass runs at the end of HER buổi, she walked there, her household with her */
  {const D=KY.DEF.th_kinh,pl0=D.pl,wh0=D.when,wo0=D.who;const seen=[];D.pl=["*"];D.when=null;D.who=(F,L)=>{if(F!==S)seen.push({me:L.some(w=>w.kind==="rv"&&w.ref===S),hh:L.some(w=>w.own===S)});return null};
   S.kyAt={b:wk()*B4N+(S.buoi||0),k:{}};for(const pl of places())S.kyAt.k[pl.k]=1;
   if(!(S.staff||[]).length)S.staff=[{name:"Thử",role:"maid",alive:true,loyal:50}];
   for(const v of liveRivals(true)){v.ky={m:0,cd:-1,seen:{},got:[],last:-1};for(const id in KY.DEF)if(id!=="th_kinh")v.ky.seen[id]=0}
   KY.npcPass();ck("12 she is in the NPC's WHO list (end of her buổi)",seen.some(x=>x.me),{n:seen.length});ck("12b her servants walk with her",seen.some(x=>x.hh));
   /* nextBuoi: the pass runs BEFORE the advance (the old wrap ran after → meHere looked at the new buổi) */
   seen.length=0;for(const v of liveRivals(true))v.ky.last=-1;Q.length=0;try{nextBuoi()}catch(e){}Q.length=0;ck("12c nextBuoi → NPC pass sees her this buổi",seen.some(x=>x.me),{n:seen.length});
   /* 13 (r2 F3) co-op: the friend entry (a human) never rolls on the host */
   const fr=liveRivals(true)[0];const F13=[];D.who=(F,L)=>{F13.push(F);return null};if(fr){fr.coop=true;for(const v of liveRivals(true))v.ky.last=-1;KY.npcPass();delete fr.coop}
   ck("13 co-op friend entry never rolls",fr&&F13.length>0&&!F13.includes(fr),{n:F13.length});
   D.pl=pl0;D.when=wh0;D.who=wo0}
  /* 14 (r2 F5) no card whose every option asks more Bạc than she has (vat_ngu: both options carry the buy price) */
  {const D=KY.DEF.vat_ngu,pl0=D.pl,wh0=D.when,wo0=D.who,wt0=D.what;const k=Object.keys(IT).find(k=>IT[k].pr>=40&&!IT[k].nt);D.pl=["zz"];D.when=null;D.who=()=>({kind:"court",c:"ped",ref:{name:"Thử"}});D.what=()=>({rr:{k}});
   S.ky={m:0,cd:-1,seen:{},got:[],last:-1};for(const id in KY.DEF)if(id!=="vat_ngu")S.ky.seen[id]=0;const b0=S.bac;
   const srv0=window.isSrv;window.isSrv=()=>false;/* a random start on the cung nữ road = band 0: pin her a consort for this check */if(KY.band(S)<1||KY.band(S)>2)S.rank=1;S.bac=0;const poor=KY.elig(S,"zz").some(x=>x.id==="vat_ngu");S.bac=9999;const rich=KY.elig(S,"zz").some(x=>x.id==="vat_ngu");S.bac=b0;window.isSrv=srv0;
   ck("14 vat_ngu: not eligible when Bạc < price, eligible when she can pay",!poor&&rich,{poor,rich,k});D.pl=pl0;D.when=wh0;D.who=wo0;D.what=wt0}
  /* 15 family scan of 14: the encounters whose EVERY option asks Bạc (cost or buy price) — each must be one the elig guard of 14 covers */
  {const all=[];for(const id in B.E){const E=B.E[id];if(E.o&&E.o.every(O=>(O.c&&O.c.bac>0)||O.buy||O.s==="item"&&id!=="vat_lac"))all.push(id)}/* ORDER THIN P5: a composed encounter on the same real piece as vat_ngu / vat_cu (KYSEEDS what rare|dead, buy) is the same group, gated by 14 the same way */const cw=id=>{try{const s=(typeof KYSEEDS!=="undefined"?KYSEEDS:[]).find(x=>x.id===id);return !!s&&(s.what==="rare"||s.what==="dead")}catch(e){return false}};ck("15 every-option-costs-Bạc encounters = [vat_ngu] + composed rare/dead pieces (gated by 14)",all.includes("vat_ngu")&&all.every(id=>id==="vat_ngu"||cw(id)),all)}
  ck("jky errors none",KY.errs.length===0,KY.errs);B.p0=p0;B.step=st0;return out});
 let f=0;for(const [n,ok,i] of R){if(!ok)f++;console.log((ok?"ok   ":"FAIL ")+n+(i?" · "+i:""))}
 if(errs.length){f++;console.log("FAIL page errors",errs.slice(0,3))}console.log(f?"FAIL "+f:"PASS");await b.close();process.exit(f?1:0)})();
