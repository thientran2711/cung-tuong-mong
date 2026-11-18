const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;
const CASES=[['td_song_8','rv'],['cnv_ban_7','maid']];
(async()=>{const b=await chromium.launch();
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof nrMaidL==='function',null,{timeout:0});await p.waitForTimeout(2000);
  if(!(await p.evaluate(()=>typeof nrAskFill==='function')))await p.addScriptTag({path:__dirname+'/hook-local.js'});
  await p.evaluate(()=>{try{KLIFE.off=true}catch(e){};const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;for(let i=0;i<20;i++){quiet=true;window.__forceOrigin='muoi';start();quiet=false;if(S&&S.origin&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;$("modal").hidden=true});
  await p.addStyleTag({content:'#kroul,#kroulw,.kmov,#klife,#kboot{display:none!important}'});await p.waitForTimeout(1500);
  for(const [id,who] of CASES){const r=await p.evaluate(([id,who])=>{const md=$("modal");md.hidden=true;md.className='modal';Q.length=0;
    let r0,n0;for(const r in ROAD14)for(const n in ROAD14[r])if(ROAD14[r][n]===id){r0=r;n0=+n}
    const o=who==='maid'?S.maid:liveRivals(true).find(v=>!v.queen&&!v.coop);const rk=who==='maid'?'maid':'rv',ri=who==='maid'?null:o.id;
    o.nr={o:r0.split('_')[0],r:r0,n:n0,k:0,t:S.turn,h:n0,hs:0,hb:0,c:null,e:'',x:0,l:[]};const AA=q72A(rk,ri);const x=q72Make(T72I['nr_'+NRASK[id].k],AA);x.p={nr:r0,nn:n0};
    if(who!=='maid'){const B=liveRivals(true).find(v=>v!==o&&!v.queen&&!v.coop);if(B){x.bk='rv';x.bi=B.id}}
    q72Offer(x,'fu');showModal();$('modal').classList.remove('klifewait');return{t:Q[0]&&Q[0].t,h:plain(Q[0]&&Q[0].h||'').slice(0,200)}},[id,who]);
   console.log(W,id,JSON.stringify(r));console.log(await p.evaluate(()=>{const m=$('modal');const d=m.querySelector('.dlg,.kpanel');return JSON.stringify({hid:m.hidden,cls:m.className,disp:getComputedStyle(m).display,op:getComputedStyle(m).opacity,dlg:d?JSON.stringify(d.getBoundingClientRect()):null,dop:d?getComputedStyle(d).opacity:null})}));await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}/${id}-${W}x${H}.png`});
   const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(ov)console.log('OVERFLOW',W,id)}
  if(errs.length)console.log('errors',errs.slice(0,3));await ctx.close()}
 await b.close()})();
