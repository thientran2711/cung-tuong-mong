/* GUEST TRIPWIRE (thin guest progress meter; review/coop-thin-a, audit coop-thin-guest §3 "Progress meter").
   An init script for the GUEST page only (Playwright addInitScript: dev/test/coop-bot.js with TRIP=1). Once the guest's co-op world is on,
   S, rivals and everything under them (world keys of S included) are wrapped in deep Proxies; every write (set / delete / define) made
   while NOT inside jcoopworld fromCanon (COOPW.inFC) is counted with the name of the function that made it (first stack frame outside this
   file) and where it landed: W.<key> (a WORLD key of S), S.<key> (her own person), R.<key> (an NPC / the friend entry), Rarr (the list).
   Only writes that CHANGE a value count (total); raw = every write incl. same-value re-assignments. Thin guest = 0. window.__trip() → {total, raw, byRoot, top:[[fn, root, n]], sReplaced, rReplaced}.
   Limits (reported): a write to an object made by the code itself and written through its own local reference before it is reached
   through S/rivals is not seen; identity: Array indexOf/includes/lastIndexOf and Set/Map keys see through the Proxies. */
(function(){
const RAW=new WeakMap(),PX=new WeakMap();const CNT=new Map();let total=0,raw=0,sRep=0,rRep=0,on=false;const byRoot={};
const unw=x=>(x&&typeof x==="object"&&RAW.has(x))?RAW.get(x):x;
for(const m of ["indexOf","includes","lastIndexOf"]){const f=Array.prototype[m];Array.prototype[m]=function(x,...a){return f.call(unw(this),unw(x),...a)}}
for(const C of [Set,Map])for(const m of ["has","get","delete","add","set"]){const f=C.prototype[m];if(!f)continue;C.prototype[m]=function(k,...a){return f.call(this,unw(k),...a)}}
const plainP=o=>{const p=Object.getPrototypeOf(o);return p===Object.prototype||p===Array.prototype||p===null};
function who(){const st=(new Error().stack||"").split("\n").slice(2);for(const l of st){const m=l.trim().match(/^at (?:Object\.|Proxy\.|Array\.)?([^ (]+)/);const n=m?m[1]:"";
  if(!n||/^(__trip|set|deleteProperty|defineProperty|Reflect\.|new|eval|<anonymous>)/.test(n)||/coop-thin-trip|\(<anonymous>\)|\(native\)/.test(l))continue;
  return /^https?:/.test(n)?"anon@"+(n.match(/:(\d+):\d+$/)||[])[1]:n}return "(top)"}
/* only a write that CHANGES something counts (x.k = the same value is not a guest computation); `raw` counts every write */
function hit(meta,key,same){const C=window.COOPW;if(!on||(C&&C.inFC)||(C&&C.ctx))return;raw++;if(same)return;total++;
 const root=meta.r==="S"&&meta.t===undefined?(WK().includes(key)?"W."+key:"S."+key):meta.r==="S"?(WK().includes(meta.t)?"W."+meta.t:"S."+meta.t):meta.r==="R"?(meta.t===undefined?"Rarr":"R."+(meta.t2||key)):meta.r;
 const k=who()+"|"+root.replace(/\..*$/,m=>m.split(".").slice(0,2).join("."));CNT.set(k,(CNT.get(k)||0)+1);const rk=root.split(".")[0];byRoot[rk]=(byRoot[rk]||0)+1}
let WKc=null;const WK=()=>WKc||(WKc=(window.COOPW&&COOPW.X&&COOPW.X.W_KEYS)||[]);
function px(o,meta){if(!o||typeof o!=="object"||RAW.has(o))return o;if(!plainP(o))return o;let p=PX.get(o);if(p)return p;
 p=new Proxy(o,{get(t,k,rc){const v=Reflect.get(t,k);if(!v||typeof v!=="object"||typeof k==="symbol")return v;
   const d=Reflect.getOwnPropertyDescriptor(t,k);if(d&&!d.configurable&&!d.writable)return v;
   let m;if(meta.r==="S")m=meta.t===undefined?{r:"S",t:k}:meta;else if(meta.r==="R")m=meta.t===undefined?{r:"R",t:k}:(meta.t2===undefined&&!Array.isArray(t)?{r:"R",t:meta.t,t2:k}:meta);else m=meta;
   return px(v,m)},
  set(t,k,v){const u=unw(v),o=t[k];hit(meta,k,(k in t)&&(o===u||(o!==o&&u!==u)));return Reflect.set(t,k,u)},
  deleteProperty(t,k){hit(meta,k,!(k in t));return Reflect.deleteProperty(t,k)},
  defineProperty(t,k,d){if("value" in d)d.value=unw(d.value);hit(meta,k,("value" in d)&&(k in t)&&t[k]===d.value);return Reflect.defineProperty(t,k,d)}});
 RAW.set(p,o);PX.set(o,p);return p}
function wrap(){try{if(typeof S!=="undefined"&&S&&!RAW.has(S)){S=px(S,{r:"S"})}if(typeof rivals!=="undefined"&&rivals&&!RAW.has(rivals)){rivals=px(rivals,{r:"R"})}}catch(e){console.error("trip wrap",e)}}
function check(){const C=window.COOPW;if(!C||!C.on||C.seat!=="b"||C.inFC)return;
 if(!on){on=true;C.afterFC=()=>{wrap()};wrap();return}
 try{if(S&&!RAW.has(S)){sRep++;wrap()}if(rivals&&!RAW.has(rivals)){rRep++;wrap()}}catch(e){}}
setInterval(check,150);
window.__trip=function(){const top=[...CNT.entries()].sort((a,b)=>b[1]-a[1]).map(([k,n])=>{const [f,r]=k.split("|");return [f,r,n]});return {total,raw,byRoot,top:top.slice(0,40),pairs:top.length,sReplaced:sRep,rReplaced:rRep}};
})();
