/* review/errand-scene: every errand x device. usage: node dev/test/errand-scene.js <baseURL> <outdir> [W H]
   Boots a life, then for each errand flow (ACT spy/ally/rumor/plant…, scout, invite) runs it the way the button does and captures the four beats:
   off (figure leaving) / beat (pill + clock) / on (figure returning) / report (card). Also checks: tap = skip, ONE khắc charged (no double charge),
   render() held during the scene (the report is not on screen yet), ledger "errand", reduced motion = no walk, no page errors. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,BASE,OUT,W0,H0]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const W=+W0||755,H=+H0||1000,tag=`${W}x${H}`;const SLOW=+process.env.SLOW||1;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<900});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(1500)}
 await sleep(1200);
 const setup=()=>p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));
  SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;
  try{OPT.fxon=true}catch(e){}S.buoi=0;used=0;deal();render();await Wt(1800);return{staff:(S.staff||[]).map(s=>s.name),maid:S.maid.name}});
 const info=await setup();const R={tag,info,flows:{}};
 const FL=(process.env.FLOWS||'').split(',').filter(Boolean);const flows0=[["spy",i=>doAct(i,'spy')],["ally",i=>doAct(i,'ally')],["rumor",i=>doAct(i,'rumor')],["scout",i=>scout(rivals[i].id)],["invite",i=>invite(rivals[i].id)]];
 const flows=flows0.filter(f=>!FL.length||FL.includes(f[0]));for(const [name,fn] of flows){
  const res=await p.evaluate(async([name,fnS,SLOWK])=>{const Wt=t=>new Promise(r=>setTimeout(r,t));
   Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.buoi=0;used=0;S.bac=Math.max(S.bac,500);const rt=document.getElementById('rtoast');if(rt)rt.classList.remove('on');ERR.slow=SLOWK;OPT.fxon=true;render();await Wt(1800);
   const i=rivals.findIndex(v=>v.alive&&!v.out&&!sameHouse(S,v)&&!together(S,v));if(i<0)return{skip:'no rival'};
   if(name==='scout'){const v=rivals[i];try{delete S.seen[v.id]}catch(e){}}
   const tk=[...document.querySelectorAll('#tokens .tok.fig')].map(t=>t.innerText.replace(/\s+/g,' ').slice(0,24));const runner=(bestSent(S)||S.maid||{}).name,staffN=(S.staff||[]).map(s=>s.name);
   const u0=used,bac0=S.bac,rn0=window.__rn=0;const rr=window.render;let rc=0;
   const f=new Function('i','return ('+fnS+')(i)');f(i);
   const heldAt0={used:used,layer:!!document.querySelector('.kmerr-lay'),shield:!!document.querySelector('.kmerr-shield'),toast:!!document.getElementById('rtoast'),line:(document.getElementById('kupdline')||{}).innerText||''};
   return{i,tk,runner,staffN,u0,u1:used,bac0,heldAt0,live:!!(window.ERR&&ERR.live),n:ERR.n,roster:(S.roster&&S.roster.P)?JSON.stringify(Object.entries(S.roster.P).filter(([k,v])=>v.some(e=>e&&e[1]==='errand')).map(([k,v])=>[k,v.map(e=>e&&e[1])])):''}
  },[name,fn.toString(),SLOW]);
  R.flows[name]=res;if(res.skip)continue;
  /* beats */
  await sleep(300*SLOW);await p.screenshot({path:`${OUT}/${name}-1off-${tag}.jpg`,type:'jpeg',quality:70});
  await sleep(650*SLOW);const beat=await p.evaluate(()=>({line:(document.getElementById('kupdline')||{}).innerText||'',hud:(document.getElementById('me-d')||{}).innerText||'',away:[...document.querySelectorAll('#tokens .tok.fig')].map(t=>t.innerText.replace(/\s+/g,' ').slice(0,20)+(t.style.visibility==='hidden'?'(hidden)':'')),toast:!!document.getElementById('rtoast')}));
  await p.screenshot({path:`${OUT}/${name}-2beat-${tag}.jpg`,type:'jpeg',quality:70});R.flows[name].beat=beat;
  await sleep(900*SLOW);await p.screenshot({path:`${OUT}/${name}-3on-${tag}.jpg`,type:'jpeg',quality:70});
  await sleep(1000*SLOW);R.flows[name].after=await p.evaluate(()=>({live:!!ERR.live,layer:!!document.querySelector('.kmerr-lay'),shield:!!document.querySelector('.kmerr-shield'),toast:!!document.getElementById('rtoast'),used,tokVis:[...document.querySelectorAll('#tokens .tok.fig')].every(t=>t.style.visibility!=='hidden'),Q:Q.length,dlg:!document.getElementById('modal').hidden}));
  await p.screenshot({path:`${OUT}/${name}-4report-${tag}.jpg`,type:'jpeg',quality:70});
 }
 /* tap = skip */
 R.skip=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.buoi=0;used=0;render();await Wt(400);
  const i=rivals.findIndex(v=>v.alive&&!v.out&&!sameHouse(S,v)&&!together(S,v));const s0=ERR.skips;doAct(i,'spy');await Wt(150);const live1=!!ERR.live;document.querySelector('.kmerr-shield').click();await Wt(60);
  return{live1,live2:!!ERR.live,skips:ERR.skips-s0,layer:!!document.querySelector('.kmerr-lay'),rbd:RB.d,used}});
 /* reduced motion: no walking layer, still a beat */
 R.reduced=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.buoi=0;used=0;render();await Wt(400);OPT.fxon=false;
  const i=rivals.findIndex(v=>v.alive&&!v.out&&!sameHouse(S,v)&&!together(S,v));doAct(i,'spy');await Wt(150);const r={live:!!ERR.live,layer:!!document.querySelector('.kmerr-lay'),shield:!!document.querySelector('.kmerr-shield')};await Wt(1100);r.after=!!ERR.live;OPT.fxon=true;return r});
 R.rbd=await p.evaluate(()=>RB.d);R.errs=errs;console.log(JSON.stringify(R,null,1));await b.close()})();
