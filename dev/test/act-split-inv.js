/* ACT SPLIT W2/W3 INVENTORY: festival days, outings and the night (buổi tối). Dumps, per state x festival x buổi: the Hành sự deck,
   every place's person options (talkOpts), the festival dialogs that fire that day (j31 FESTEV light event, j71 fDay7 variants,
   jts đố đèn), the "!" happenings, and the night-only differences. usage: node dev/test/act-split-inv.js <url> <out.json> */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:"load",timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==="function",null,{timeout:120000});await p.waitForTimeout(3000);
 await p.evaluate(LIB);
 const out=await p.evaluate(()=>{const R={fest:{},night:{},keys:Object.keys(FEST)};
  const nm=o=>(o&&(o.n||o.name||o.t))||"";
  const optsOf=m=>{if(!m)return null;const L=m.opts||m.o||[];return{t:String(m.t||m.title||"").replace(/<[^>]+>/g,"").slice(0,80),o:L.map(x=>String(nm(x)).replace(/<[^>]+>/g,""))}};
  const deckNames=()=>{try{deal()}catch(e){}return(deck||[]).map(a=>a&&a.n).filter(Boolean)};
  const placeOpts=()=>{const P={};for(const pl of places()){try{goTo(pl.k)}catch(e){}const ppl=(S.visit&&S.visit.people)||[];P[pl.k]=ppl.map(x=>({who:x.name||x.kind,kind:x.kind,o:(()=>{try{return talkOpts(x).map(a=>a&&a.n).filter(Boolean)}catch(e){return["ERR "+e.message]}})()}));try{goTo("home")}catch(e){}}return P};
  for(const sc of ["dau","cao"]){AA.scen(sc);const base=JSON.stringify(ser?ser():{});
   for(const k of Object.keys(FEST)){const F=FEST[k];
    for(const bu of [0,1,2]){AA.restore();S.month=F.m;S.tuan=F.t[0];S.buoi=bu;used=0;Q.length=0;
     const row={deck:deckNames(),hap:(()=>{try{S.adHap=null;return adHapNow().map(h=>h.k+":"+h.id)}catch(e){return["ERR "+e.message]}})()};
     if(bu===0){row.festev=typeof FESTEV!=="undefined"&&FESTEV[k]?optsOf(FESTEV[k]()):null;
      row.j71=(typeof FV7!=="undefined"&&FV7[k]||[]).map((V,vi)=>{try{const m=fMake7(k,vi);return optsOf(m)}catch(e){return{t:"ERR "+e.message,o:[]}}});
      try{row.tsden=typeof tsDenFest==="function"&&tsDenFest()?"đố đèn minigame":null}catch(e){}
      row.places=placeOpts()}
     (R.fest[sc]=R.fest[sc]||{})[k+":"+bu]=row}}
   /* a plain day (month 4, tuần 1): day vs night */
   for(const bu of [0,1,2]){AA.restore();S.month=4;S.tuan=1;S.buoi=bu;used=0;Q.length=0;(R.night[sc]=R.night[sc]||{})[bu]={deck:deckNames(),places:placeOpts(),
     lock:places().map(pl=>{try{const a=accessOf(S,pl.k);return a.ok?null:pl.k+": "+a.why}catch(e){return null}}).filter(Boolean)}}}
  return R});
 fs.writeFileSync(OUT,JSON.stringify({out,perr}));console.log('ok errs',perr.length,perr.slice(0,5));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
