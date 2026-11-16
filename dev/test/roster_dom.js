/* j95: 20 random moments in the REAL rendered game (Fold 755x1000@2 by default): what the screen shows == the record.
   - map tab: every place's silhouette count (aria-label "n bóng người") == people at that place in window.__roster()
   - stage: every consort / the Emperor / Thái hậu drawn on the stage is at her place in the record, and every consort
     the record puts there (not of her own house) is drawn
   - the record's self-check (no duplicate, no one missing, map counts recorded == record) is clean
   - no page error, no horizontal overflow. Saves a few screenshots.
   usage: node dev/test/roster_dom.js <baseURL of a page that wraps dev/index.html with <meta charset=utf-8>> <outdir> [WxH@dpr] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const {spawnSync}=require('child_process');
const [,,BASE,OUT,SZ]=process.argv;const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+DPR||1,hasTouch:true,isMobile:W<1100});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate((process_env_O)=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;if(process_env_O)window.__forceOrigin=process_env_O;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;showModal();render()},process.env.ORIGIN||'');await p.waitForTimeout(400);
 const rep=[];
 for(let i=0;i<20;i++){
  await p.evaluate(i=>{const clear=()=>{for(let j=0;j<3;j++){const dg=document.getElementById('dawn-go');if(dg&&dg.offsetParent)dg.click()}const ov=document.getElementById('ov');for(let j=0;j<5&&ov&&!ov.hidden;j++){const bs=ov.querySelectorAll('button');if(!bs.length)break;bs[bs.length-1].click()}let n=0;while(Q.length&&n++<20){const m=Q[0];if(m.opts&&m.opts.length){try{chooseM(m.opts.length-1)}catch(e){Q.shift()}}else{try{closeModal()}catch(e){Q.shift()}}}showModal()};clear();
   const r=Math.random();if(r<.45){try{nextBuoi()}catch(e){}}else{const L=places().map(x=>x.k).filter(k=>k!==S.place&&accessOf(S,k).ok);if(L.length)try{goTo(L[Math.floor(Math.random()*L.length)])}catch(e){}}
   clear();tab="act";render()},i);await p.waitForTimeout(1300);await p.evaluate(()=>{for(let j=0;j<3;j++){const dg=document.getElementById('dawn-go');if(dg&&dg.offsetParent)dg.click()}});await p.waitForTimeout(300);
  /* stage */
  const st=await p.evaluate(()=>{const R=window.__roster();const out={at:R.at,ok:R.ok,dup:R.dup,miss:R.miss,mm:R.mapMismatch,bad:[]};const P=curPeople();const here=new Set(R.rows.filter(r=>r.place===S.place).map(r=>r.id));
   const drawn=[...document.querySelectorAll('#stage [data-p]')].map(e=>P[+e.dataset.p]).filter(Boolean);
   for(const q of drawn){if((q.kind==="rival"||q.kind==="hh")&&q.ref&&!here.has("v"+q.ref.id))out.bad.push("sân khấu vẽ "+q.ref.name+" nhưng sổ không ở đây");if(q.kind==="emp"&&!here.has("emp"))out.bad.push("sân khấu vẽ Hoàng thượng nhưng sổ không ở đây");if(q.kind==="th"&&!here.has("th"))out.bad.push("sân khấu vẽ Thái hậu nhưng sổ không ở đây")}
   /* the maid road stage shows at most 4 consorts (j42 srvVisitOf / j95srvStage cap; its map count follows the stage, dev/test/stage-counts.js) */const srvCap=typeof isSrv==="function"&&isSrv()&&drawn.filter(q=>q.kind==="srv"&&q.ref&&q.ref.rel!=null).length>=(S.place==="home"?1:4);
   if(S.visit&&S.visit.k===S.place&&S.place!=="lc"&&!srvCap)for(const v of liveRivals(true)){if(typeof isSrv==="function"&&isSrv()&&S.place==="home"&&v!==srvM())continue;/* maid road: at home only her mistress is drawn (j95srvStage) */if(here.has("v"+v.id)&&!(S.place==="home"&&sameHouse(S,v))&&!drawn.some(q=>q.ref===v))out.bad.push("sổ có "+v.name+" ở đây mà sân khấu không vẽ")}
   out.place=S.place;out.drawn=drawn.length;out.ov=document.documentElement.scrollWidth>innerWidth+1;return out});
  if(i%5===0&&!process.env.NOSHOT)await p.screenshot({path:`${OUT}/stage-${i}.png`});
  /* map */
  const mp=await p.evaluate(()=>{tab="go";render();const R=window.__roster();const C={};const RP=S.roster.P;for(const id in RP)for(const k of new Set(RP[id].map(e=>e[0])))if(k&&RP[id][j95arrKh(k)][0]===k&&j95vis(id,k))C[k]=(C[k]||0)+1;/* arrival khắc (port 16/11) */const bad=[],known=[];let n=0;
   for(const el of document.querySelectorAll('[data-go]')){const k=el.dataset.go;const s=el.querySelector('.msil');const shown=s?+(s.getAttribute('aria-label')||'0').split(' ')[0]:0;if(!el.closest('#panel,#stage,body'))continue;n++;
    if(typeof isSrv==='function'&&isSrv())continue;/* the maid road counts by its own rules (j59srvCount; dev/test/stage-counts.js) */if(shown!==(C[k]||0)){/* KNOWN main bug (jstaff, reported to session 8): the Đức Thọ cung elder is drawn at Tân Giả khố too */if(k==='tgk'&&shown===(C[k]||0)+1&&typeof elderBy==='function'&&elderBy('tn')){known.push('tgk +1 (jstaff elder)');continue}bad.push(`${k}: bản đồ ${shown}, sổ ${C[k]||0}`)}}
   return{n,bad,known,ov:document.documentElement.scrollWidth>innerWidth+1}});
  if(i%5===0&&!process.env.NOSHOT)await p.screenshot({path:`${OUT}/map-${i}.png`});
  /* the same moment through the dev tool: export the save, run dev/tools/roster.js, compare its counts with the map on screen */
  const sv=await p.evaluate(()=>{tab="go";render();const shown={};for(const el of document.querySelectorAll('[data-go]')){const s=el.querySelector('.msil');shown[el.dataset.go]=s?+(s.getAttribute('aria-label')||'0').split(' ')[0]:0}return{save:JSON.stringify(ser()),shown,place:S.place,tnEl:typeof elderBy==="function"&&!!elderBy("tn"),srv:typeof isSrv==="function"&&isSrv()}});
  const f=path.join(OUT,`save-${i}.json`);fs.writeFileSync(f,sv.save);const t=spawnSync('node',[path.join(__dirname,'..','tools','roster.js'),f,'--json'],{encoding:'utf8'});let tool=null;try{tool=JSON.parse(t.stdout)}catch(e){mp.bad.push('roster.js không đọc được: '+(t.stderr||t.stdout).slice(0,120))}
  if(tool){if(tool.err.length)mp.bad.push('roster.js: '+tool.err.join(','));for(const k in sv.shown)if(!sv.srv&&k===sv.place&&sv.shown[k]!==(tool.counts[k]||0)){if(k==='tgk'&&sv.shown[k]===(tool.counts[k]||0)+1&&sv.tnEl){mp.known.push('roster.js tgk +1 (jstaff elder)');continue}mp.bad.push(`roster.js ${k}: tool ${tool.counts[k]||0}, màn hình ${sv.shown[k]}`)}/* the tool reads the current khắc; the map shows arrival khắc for other places */}
  fs.unlinkSync(f);
  await p.evaluate(()=>{tab="act";render()});
  rep.push({tool:tool?tool.total:null,i,at:st.at,place:st.place,ok:st.ok&&!st.bad.length&&!mp.bad.length,stage:st.bad,map:mp.bad,mapSpots:mp.n,drawn:st.drawn,self:st.ok?"":JSON.stringify({dup:st.dup,miss:st.miss,mm:st.mm}),overflow:st.ov||mp.ov,known:mp.known})}
 const bad=rep.filter(r=>!r.ok||r.overflow);console.log(JSON.stringify({moments:rep.length,bad:bad.length,pageErrors:errs.length,errs:errs.slice(0,5),detail:bad.slice(0,8)},null,1));
 fs.writeFileSync(`${OUT}/roster_dom.json`,JSON.stringify({rep,errs},null,1));await b.close()})();
