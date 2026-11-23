/* ui-tour-states capture: FILLED states of every tab / sub-tab / popup, one device per run.
   usage: node dev/test/ui-tour-states/cap.js <fold|ipad> <outdir> [section,...]
   Writes <outdir>/<dev>/<id>.jpg + <outdir>/<dev>/manifest.json [{id,group,title,note}]. Read-only (no game code change). */
const {chromium,openPage,gameFrame}=require('./lib');const seed=require('./seed');const walk=require('./walk');const fs=require('fs');
const [,,DEV,OUT,SECS]=process.argv;const [W,H]=DEV==='fold'?[755,1000]:[1180,820];const DIR=`${OUT}/${DEV}`;fs.mkdirSync(DIR,{recursive:true});
const MAN=[];let N=0;const only=SECS?SECS.split(','):null;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1,ctm.local'}}:{});
 const S=require('./sections');
 for(const sec of S.list){if(only&&!only.includes(sec.k))continue;
  const {ctx,p}=await openPage(b,W,H,{seed:sec.seed||20261121,init:sec.init});const f=await gameFrame(p);await p.waitForTimeout(2500);
  const shot=async(group,title,note,tab)=>{N++;const id=`${sec.k}-${String(N).padStart(3,'0')}`;await settle(p);
   /* plain tab views (tab=1): a popup that arrived during the settle (servant/reward cards) is dismissed and the view is retaken (22/11 refresh) */
   if(tab)for(let k=0;k<4&&await f.evaluate(S.h.DISMISS);k++){await p.waitForTimeout(500);await settle(p)}
   await p.screenshot({path:`${DIR}/${id}.jpg`,type:'jpeg',quality:72});MAN.push({id,sec:sec.k,group,title,note:note||''});return id};
  try{await sec.run({p,f,shot,walk,seed,W,H,DEV})}catch(e){console.error(sec.k,e.message)}
  console.log(sec.k,'done',N,'errs',JSON.stringify(p.errs.slice(0,3)));await ctx.close()}
 fs.writeFileSync(`${DIR}/manifest${only?'-'+only.join('_'):''}.json`,JSON.stringify(MAN,null,0));await b.close()})();
async function settle(p){await p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent&&i.getBoundingClientRect().width>30).every(i=>i.complete),null,{timeout:8000}).catch(()=>{});await p.waitForTimeout(250)}
