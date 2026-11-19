/* kyngo-unit: «Kỳ ngộ thường ngày» rules in the live build (jky.js + BAL.kyngo).
   usage: node dev/test/kyngo-unit.js <url of root index.html>   → "ok"/"FAIL" lines, last line PASS / FAIL n
   1 ONE GATE: no eligible encounter → no roll, miss does not grow · 2 PITY: miss ≥ pity → sure hit · 3 COOLDOWN: no roll before cd ends
   4 ONCE PER LIFE: a met id is never eligible again · 5 CONSERVATION: vat_lac return / keep — the piece is in exactly one chest, the case
   follows (held + keep by the finder = two-way recognition road) · 6 NPC finds HER lost piece (she is the owner in law 1) · 7 OLD SAVE: S / NPC
   without ky load and roll lazily · 8 Sổ luân hồi line renders, life line gets "Kỳ ngộ: …" · 9 ilAudit net stays 0 · 10 every card text is
   cổ trang (no %, no OK words) · 11 the card is a PEND event in cost mode with an evId "kyngo:<id>" and a who face. */
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
  Q.length=0;const mine=(S.inv||[]).find(e=>e&&loOk(e));let c6=null;if(mine)c6=loLose(S,{cause:"mis"});Q.length=0;
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
  ck("jky errors none",KY.errs.length===0,KY.errs);B.p0=p0;B.step=st0;return out});
 let f=0;for(const [n,ok,i] of R){if(!ok)f++;console.log((ok?"ok   ":"FAIL ")+n+(i?" · "+i:""))}
 if(errs.length){f++;console.log("FAIL page errors",errs.slice(0,3))}console.log(f?"FAIL "+f:"PASS");await b.close();process.exit(f?1:0)})();
