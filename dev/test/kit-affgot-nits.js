/* kit-affgot-nits (K-AFFGOT-NITS, RV-180 nits on kk68-ringdup; kit keeper KK74 28/11; laws 3 / 4 / 11):
   (a) a measured thiện cảm change that is capped / rescaled to 0 prints «thiện cảm không đổi», never «thiện cảm +0» — one helper affTxt(d) (j9) for the whole group
       of affGot prints: giveTo (j8, gift), wkGive (j83, handmade work), jemoact «tiec» guests;
   (b) affGot measures, then RETHROWS an error from inside fn (giveTo used to throw; affGot had swallowed it).
   node dev/test/kit-affgot-nits.js [dev/index.html]     KMUT=1 → affTxt = the old «+0» printer → must FAIL. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const U0=process.argv[2]||'dev/index.html';const URL='file://'+path.resolve(U0);const KMUT=process.env.KMUT==='1';
const out=[];const ok=(c,m)=>out.push([!!c,m]);
/* static group scan: no «thiện cảm ${d<0?"":"+"}${d}» printer left in dev/build (the +0 pattern) */
{const D=path.join(__dirname,'..','build');const bad=[];for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f))){const s=fs.readFileSync(path.join(D,f),'utf8');const re=/thiện cảm \$\{([\w.\[\]]+)<0\?"":"\+"\}\$\{\1\}/g;let m;while((m=re.exec(s)))bad.push(f+': '+m[0])}
 ok(!bad.length,`static: no «thiện cảm \${d<0?"":"+"}\${d}» printer in dev/build/j*.js (${bad.length}) ${bad.slice(0,3).join(' | ')}`)}
(async()=>{const b=await chromium.launch();
 for(const [W,H] of [[755,1000],[1180,820]]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&!!window.__ctmBuilt,null,{timeout:180000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0});await p.waitForTimeout(7000);
  const R=await p.evaluate(KMUT=>{const r={};if(KMUT)window.affTxt=d=>(d<0?"":"+")+d;
   r.t0=affTxt(0);r.tp=affTxt(3);r.tn=affTxt(-2);
   /* (b) rethrow after measuring */
   const C=(liveRivals(true)||[]).filter(v=>v&&v!==S&&v.alive!==false&&!v.coop);const x=C[0],y=S;let thrown=null,moved=null;try{affGot(x,y,()=>{affAdd(x,y,5);throw new Error("probe")})}catch(e){thrown=e.message}moved=aff(x,y);r.thrown=thrown;r.moved=moved;
   /* (a) the real gift line when the rise is rescaled to 0 (relAdd held still) */
   const q=C.find(c=>c&&c!==S&&!c.queen)||C[1];const k=Object.keys(IT).find(k=>IT[k]&&IT[k].pr>0&&!IT[k].h&&Array.isArray(IT[k].tg));
   S.inv=S.inv||[];S.inv.push({k});const ix=S.inv.length-1;const RA=window.relAdd,AP=window.ap;let line="";
   try{window.relAdd=()=>{};window.ap=(o,d)=>{if(d&&"hh" in d)return;return AP(o,d)};line=giveTo(S,q,ix)||""}catch(e){line="ERR "+e.message}finally{window.relAdd=RA;window.ap=AP}
   r.line=line;r.q=q&&q.name;
   /* the same gift with the real rise: a signed number */
   S.inv.push({k});let line2="";try{line2=giveTo(S,q,S.inv.length-1)||""}catch(e){line2="ERR "+e.message}r.line2=line2;
   return r},KMUT);
  const tag=`${W}x${H}`;
  ok(R.t0==="không đổi",`${tag} affTxt(0) = «${R.t0}» (want «không đổi»)`);ok(R.tp==="+3"&&R.tn==="-2",`${tag} affTxt(3)/(-2) = «${R.tp}» «${R.tn}»`);
  ok(R.thrown==="probe",`${tag} affGot rethrows the error from fn after measuring («${R.thrown}»)`);
  ok(/thiện cảm không đổi/.test(R.line)&&!/thiện cảm \+0/.test(R.line),`${tag} gift with the rise held at 0 → «${R.line.trim()}»`);
  ok(/thiện cảm (?:[+-]\d+|không đổi)\./.test(R.line2)&&!/thiện cảm \+0/.test(R.line2),`${tag} real gift → «${R.line2.trim()}»`);
  ok(!errs.length,`${tag} page errors ${errs.length} ${errs.slice(0,2).join(' | ')}`);
  await p.close()}
 await b.close();let f=0;for(const [c,m] of out){console.log((c?'PASS ':'FAIL ')+m);if(!c)f++}
 console.log(`KIT-AFFGOT-NITS${KMUT?' (KMUT)':''}: ${f?'FAIL '+(out.length-f)+'/'+out.length:'ALL OK '+out.length}`);process.exit(f?1:0)})();
