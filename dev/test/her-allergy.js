/* review/ch14-goals (S4-allergy / D39): HER own allergy, two-way with the NPC recipe allergy (jrcp).
   1. a food work (pgin path) and a flower work (giftin path) holding her allergen: accepting makes HER ill (Sức -BAL.rcp.alSuc, jrash rash),
      she learns it (taste card row "Ta"); a non-allergen work does nothing; once known, the "Nhận" option warns.
   2. NPC receivers of an allergen work get the same rash (rcpAllergy). 3. Hỏi thái y lists herself.
   usage: node dev/test/her-allergy.js <game.html> ; exit 1 on any fail or page error. */
const {chromium}=require('playwright');const [,,G]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(p){for(let i=0;i<300;i++){const ok=await p.evaluate(()=>{const g=document.querySelector('#kload [data-kl="go"]');if(g)g.click();return !!document.querySelector('#slots button[data-new]')});if(ok)return;await sleep(200)}}
(async()=>{const b=await chromium.launch();const ctx=await b.newContext();await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const errs=[];const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('file://'+require('path').resolve(G));await boot(p);await p.evaluate(()=>localStorage.clear());await p.reload();await boot(p);
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(1500);
 const out=await p.evaluate(()=>{const F=[];const ok=(c,m)=>{if(!c)F.push(m)};Q.length=0;
  const P=rcpProf(S);P.a="hs";const v=liveRivals(true).find(x=>!x.queen&&x.alive&&!x.out);
  const mk=(kind,r)=>{const w=wkMake(v,kind,0,6);w.kind=kind;w.r=r;w.n=(WKR[kind].find(x=>x.id===r)||{}).n||w.n;return {k:"wk_"+kind,wk:w}};
  /* 1a food, allergen (mon r02 = hải sản), unknown yet: no warning, accepting hurts */
  ok(!rcpKn(S,"a"),"her allergy known at start");const row0=rcpTasteRows()[0];ok(row0[0]==="Ta"&&/chưa rõ/.test(row0[1][0]),"taste card row Ta (unknown) "+JSON.stringify(row0));
  let e=mk("mon","r02");ok(rcpMeAl(e.wk)==="hs","rcpMeAl food");
  let d=PEND.pgin({f:key(v),dn:e.wk.n,pk:null,o:0,e});const take=d.o.find(o=>/^Nhận/.test(o.n));ok(take&&!/kiêng/.test(take.x),"no warning while unknown");
  const s0=S.suc;S.rash=null;take.go();ok(S.suc<s0||S.suc===0,"Sức drop "+s0+"->"+S.suc);ok(S.rash&&S.rash.sev>=1,"rash on her");ok(rcpKn(S,"a"),"she learnt her allergy");
  const row1=rcpTasteRows()[0];ok(/kiêng hải sản/.test(row1[1][0])&&row1[2]==="r","taste row after "+JSON.stringify(row1));
  /* 1b once known: the flower/food dialog warns on Nhận */
  e=mk("mon","r09");d=PEND.giftin({f:key(v),e});const t2=(d.o||[]).find(o=>/^Nhận/.test(o.n));ok(t2&&/ta kiêng hải sản/.test(t2.x),"warning once known: "+(t2&&t2.x));
  /* 1c non-allergen work: nothing */
  P.a="phan";const s1=S.suc;S.rash=null;e=mk("mon","r01");d=PEND.giftin({f:key(v),e});const t3=d.o.find(o=>/^Nhận/.test(o.n));t3.go();ok(S.suc===s1&&!S.rash,"non-allergen hurt her");
  /* 1d flower (giftin path, pollen) */
  e=mk("bhoa","r01");d=PEND.giftin({f:key(v),e});const t4=d.o.find(o=>/^Nhận/.test(o.n));const s2=S.suc;t4.go();ok(S.suc<s2||S.suc===0,"flower pollen Sức");ok(!!S.rash,"flower rash");
  /* 2 NPC receiver gets the rash too (two-way) */
  const v2=liveRivals(true).find(x=>x!==v&&!x.queen&&x.alive&&!x.out)||v;v2.rash=null;const Pv=rcpProf(v2);Pv.a="phan";rcpAllergy(v,v2,e.wk,"phan");ok(!!v2.rash,"NPC rash");
  /* 3 thái y lists herself when unknown */
  S.rcpK.me=[];S.bac=999;Q.length=0;rcpAskQ("ty");const q=Q[Q.length-1];ok(q&&q.opts.some(o=>o.n==="Ta"),"thái y lists Ta");Q.length=0;
  return {F,suc:S.suc}});
 console.log(JSON.stringify({out,errs:errs.slice(0,6)}));await b.close();process.exit(errs.length||out.F.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
