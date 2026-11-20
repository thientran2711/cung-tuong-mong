/* Item-ledger tracer (reviewer item-ledger-r1): finds every place a durable piece leaves a person WITHOUT ilGone.
   Proxies each person's inv array (splice/pop/shift/index set/length) and the inv/wd.tram/wd.y/vl assignments, recording the call stack
   for every durable piece removed; at each census "net" line it prints the recorded stack of that piece.
   usage: node dev/measure/iltrace.js <url> [lives=3] [weeks=200] */
const {chromium}=require('playwright');const [,,URL,LIVES,WEEKS]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof ilAudit==='function',null,{timeout:0});
 const r=await p.evaluate(([L,W])=>{document.getElementById('title').hidden=true;
  const ST=new Map();const stk=()=>String(new Error().stack).split("\n").slice(3,9).map(s=>s.trim().replace(/\(http[^)]*:(\d+):\d+\)/,"L$1")).join(" < ");
    const T={lives:0,weeks:0,net:[],netStacks:{},unr:{},dup:{},errs:0};const PEND=[];const mark=(e)=>{if(e&&typeof e==="object"&&e.k&&ilDur(e)){ilUid(e);PEND.push([e,stk()])}};
  const wrapA=(a)=>{if(!Array.isArray(a)||a.__tr)return a;const P=new Proxy(a,{get(t,k){if(k==="__tr")return 1;if(k==="push")return function(){for(const e of arguments)if(e&&typeof e==="object"&&e.iu){let tw=null;for(const pp of ilPeople())for(const a of ilSlots(pp))if(a!==e&&a.iu===e.iu)tw=ilKey(pp);if(!tw&&ilS().box.some(x=>x.e!==e&&x.e.iu===e.iu))tw="box";if(tw){const kk="DUP "+e.k.replace(/_.*/,"")+" twin@"+(tw==="me"||tw==="box"?tw:"npc")+": "+stk().replace(/L\d+/g,"");T.dup[kk]=(T.dup[kk]||0)+1}}return Array.prototype.push.apply(t,arguments)};if(k==="splice"||k==="pop"||k==="shift")return function(){const r=Array.prototype[k].apply(t,arguments);for(const e of (k==="splice"?r:[r]))mark(e);return r};return t[k]},
   set(t,k,v){if(/^\d+$/.test(k)){const o=t[k];t[k]=v;if(o&&o!==v&&t.indexOf(o)<0)mark(o)}else if(k==="length"){const cut=t.slice(v);t.length=v;for(const o of cut)if(t.indexOf(o)<0)mark(o)}else t[k]=v;return true}});return P};
  /* after every step: a removed piece that is nowhere now = unrouted (stack kept); found only through a same-id twin = masked */
  const chk=()=>{for(const [e,s] of PEND.splice(0)){let held=false;for(const pp of ilPeople())if(ilSlots(pp).indexOf(e)>=0)held=true;if(held)continue;const inBox=ilS().box.some(x=>x.e===e),inCase=(S.lost||[]).some(c=>c&&c.e===e);if(inBox||inCase)continue;const w=ilWhere(e);const v=(w?"MASKED by twin at "+String(w).replace(/\d+/g,"#")+": ":"UNROUTED: ")+s;ST.set(e.iu,v);const kk=v.replace(/L\d+/g,"");T.unr[kk]=(T.unr[kk]||[]).concat(e.k).slice(0,8)}};
  const inst=(o)=>{if(!o||typeof o!=="object"||o.__trI)return;let v=wrapA(o.inv||[]);Object.defineProperty(o,"inv",{configurable:true,enumerable:true,get(){return v},set(n){const keep=new Set(n||[]);for(const e of v||[])if(!keep.has(e))mark(e);v=wrapA(n)}});
   Object.defineProperty(o,"__trI",{value:1,enumerable:false,configurable:true});
   const instW=(w)=>{if(!w||typeof w!=="object"||w.__trW)return w;for(const sl of ["tram","y"]){let s=w[sl];Object.defineProperty(w,sl,{configurable:true,enumerable:true,get(){return s},set(n){if(s&&s!==n)mark(s);s=n}})}Object.defineProperty(w,"__trW",{value:1,enumerable:false});return w};
   let w=instW(o.wd);Object.defineProperty(o,"wd",{configurable:true,enumerable:true,get(){return w},set(n){if(w&&w!==n){mark(w.tram);mark(w.y)}w=instW(n)}});
   let vl=o.vl;Object.defineProperty(o,"vl",{configurable:true,enumerable:true,get(){return vl},set(n){if(vl&&vl!==n)mark(vl);vl=n}})};
  
  const c0=ilCensus;ilCensus=window.ilCensus=function(){const I=ilS();const n0=I.net,l0=I.log.length;const r=c0.apply(this,arguments);if(I.net>n0)for(const l of I.log.slice(l0))if(l[5]==="net"){const s=ST.get(l[1])||"(no stack: not removed from a traced array; holder "+l[3]+")";T.net.push(l[2]+"@"+l[3]);T.netStacks[s]=(T.netStacks[s]||[]).concat(l[2])}return r};
  for(let l=0;l<L;l++){for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();let ok=false;try{ok=!isSrv()}catch(e){}if(ok)break}T.lives++;S.bac=Math.max(S.bac,200);
   for(let w=0;w<W&&!S.dead;w++){for(const pp of ilPeople())inst(pp);
    for(const m of Q.slice())if(m&&(m.pid==="giftin"||m.pid==="pgin")&&m.opts&&m.opts[0]&&m.opts[0].go){try{m.opts[0].go()}catch(e){}}Q.length=0;try{
     if(w%6===3){const ix=S.inv.findIndex(e=>e&&!e.h&&!e.w&&ilDur(e)&&!e.nt&&!(IT[e.k]&&IT[e.k].keep));if(ix>=0){if(typeof econSell==="function"&&Math.random()<.5)econSell(S,ix);else sellItem(S,ix)}}
     if(w%9===5){const v=liveRivals(true)[0];const ix=S.inv.findIndex(e=>e&&!e.h&&!e.w&&!e.t&&IT[e.k]);if(v&&ix>=0)giveTo(S,v,ix)}
     for(const t of ilShopTiles())if(Math.random()<.5)t.onBuy();if(S.bac<60)S.bac+=60;chk();endTurn();chk()}catch(e){T.errs++;if(!T.err1)T.err1=String(e&&e.stack||e).slice(0,300)}T.weeks++}
   ilCensus();Q.length=0}
  return T},[+(LIVES||3),+(WEEKS||200)]);
 console.log(JSON.stringify({r,errs:errs.slice(0,8)},null,1));await b.close()})();
