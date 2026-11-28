/* F-TIER-B5 (law 2 / 11, batch 5 exit marks): builds the exit-mixed choice cards of the audit batch 5 on the real page and reads what the player SEES:
   the «Cẩn thận khi lựa chọn» line, each option's name, odds word and visible rows. usage: WT=<worktree> node probe.js <outdir> [fold|ipad] [shots=1]  → <outdir>/probe-<dev>.json */
const {open}=require('../firstcard/lib.js');const fs=require('fs'),path=require('path');const OUT=process.argv[2]||'.';const DEV=process.argv[3]||'fold';const SHOT=process.argv[4]==='1';
fs.mkdirSync(OUT,{recursive:true});const VP={fold:{width:755,height:1000},ipad:{width:1180,height:820}}[DEV];
const CARDS=require('./cards.js').filter(c=>!process.env.ONLY||process.env.ONLY.split(',').includes(c.id));
(async()=>{const {b,p}=await open(VP,{ctx:{deviceScaleFactor:SHOT?2:1}});const res=[];
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 for(const c of CARDS){let r;try{
  r=await p.evaluate(({src,og})=>{try{Q.length=0;try{closeModal()}catch(e){}Q.length=0;
    if(og){for(let i=0;i<900;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k===og)break}S.kcPick=/^(cnv|nc|bd|pf)$/.test(og)?'cung':'nha';try{nlAccept()}catch(e){}Q.length=0;
     if(!S.kc||!S.kc.fam){try{window.__bot=1;kcInit()}catch(e){}delete window.__bot}Q.length=0}
    S.dead=false;const err=(0,eval)('(function(){'+src+'})')();if(err)return{err:String(err)};
    document.querySelectorAll('[id^="kroul"],.kroul,.kroul-ov,#kload').forEach(x=>x.remove());showModal();return{ok:1}}catch(e){return{err:String(e&&e.stack||e).slice(0,300)}}},{src:c.build,og:c.og});
  if(r.err){res.push({id:c.id,err:r.err});console.log(c.id,'ERR',r.err);continue}
  for(let t=0;t<8;t++){await p.waitForTimeout(500);const vis=await p.evaluate(()=>{for(let i=0;i<8;i++){const e=typeof dqActEl==='function'&&dqActEl();if(!e)break;e.remove()}document.querySelectorAll('.kmov,.kmrew,[id^="kroul"],.kroul-ov,#kprevov,.kroul,#kload').forEach(x=>x.remove());try{showModal()}catch(e){}return !document.getElementById('modal').hidden});if(vis)break}
  await p.waitForTimeout(500);
  r=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return{err:'no modal'};const w=[...M.querySelectorAll('.kwarnl,.kwarnline,.kwarn')].map(x=>x.textContent.trim());
   return{title:(document.getElementById('mt')||{}).textContent,warn:w,opts:[...M.querySelectorAll('button[data-m]')].map(x=>({n:((x.querySelector('.kan')||x).firstChild||{}).textContent||(x.querySelector('.kan')||x).textContent.trim().slice(0,60),
    odds:((x.querySelector('.kodds')||{}).textContent||'').trim(),dis:x.disabled,rows:[...x.querySelectorAll('.kr')].map(k=>k.textContent.replace(/\s+/g,' ').trim()).join(' | ')})),
    model:(Q[0].opts||[]).map(o=>({n:o.n,life:!!(typeof kitLifeOpt==='function'&&kitLifeOpt(o)),hint:typeof o.hint==='function'?o.hint(1):o.hint||'',j67:o.j67||'',x:o.x||''}))}});
  r.id=c.id;res.push(r);console.log(c.id,JSON.stringify(r).slice(0,600));
  if(SHOT&&c.shot){await p.screenshot({path:path.join(OUT,`${c.id}-${DEV}.png`)})}
 }catch(e){res.push({id:c.id,err:String(e).slice(0,200)});console.log(c.id,'EXC',String(e).slice(0,200))}}
 fs.writeFileSync(path.join(OUT,`probe-${DEV}.json`),JSON.stringify({errs:p.errs,res},null,1));console.log('page errors',p.errs.length,p.errs.slice(0,3));await b.close()})();
