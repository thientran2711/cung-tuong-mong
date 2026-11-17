/* review/kit-fig2: Giao tình › Ân oán — two pager strips (X "Xem quan hệ của", Y "với"), heading "Quan hệ giữa X và Y", X | kitRelRow rows | Y,
   "Đã biết về X"; strangers (not met) = grey silhouette with their name. KIT §49.1 / §49.2 / §49.3.
   usage: node dev/test/rel-row.js <build url> <outdir> <tag> [WxH@dpr,...]
   Views shot: ta (X = Ta, Y = Hoàng thượng), ta-hh (Ta ↔ Hoàng hậu), hh (X = Hoàng hậu, Y = Ta), unmet (X = a consort Ta has not met), emp (X = Hoàng thượng).
   Measures: all rows of a view share bar x / width (±1 px), marker centre-y = bar centre-y, word · number + bar on ONE line, label one line,
   heading names = the two side blocks' names, every X in strip 1: portrait id (data-fk) == person id (data-pid), unmet → silhouette.
   On the OLD build (before) only the shots are useful. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,844x390@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  const unmet=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
   /* every consort listed (face level 3), all met except the last one (the owner's case: listed, "chưa gặp") */
   const L=liveRivals(true);S.met=S.met||{};tmPlace(S,0);L.forEach((v,i)=>{S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}v.rel=[-5,40,-60,12][i%4];v.oan=[4,0,35,72][i%4];S.rl[v.id]=[10,-20,0,55][i%4];S.ro[v.id]=[0,12,50,3][i%4]});
   const u=L.filter(v=>!v.queen&&!sameHouse(S,v)).pop();if(u){delete S.met[u.id];u.ev=0}
   tab="rel";relSel="me";PG.rel=null;PG.relY=null;render();return u?u.name:''});
  await sleep(1500);
  const shot=async n=>{await p.evaluate(()=>Promise.all([...document.querySelectorAll('#panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,6000)}))));await sleep(400);
   for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/rel-${TAG}-${n}-${wh}.jpg`,type:'jpeg',quality:72,timeout:120000});break}catch(e){await sleep(2000)}}};
  const meas=()=>p.evaluate(()=>{const P=document.getElementById('panel');const R=e=>e.getBoundingClientRect();
   const rows=[...P.querySelectorAll('.krr')].filter(e=>e.offsetParent);
   const out=rows.map(r=>{const bar=r.querySelector('.krrbar>.ksbar'),val=r.querySelector('.krrv'),lab=r.querySelector('.krrl');const br=R(bar),vr=R(val);const mk=bar.querySelector('.ksb-mk');const mr=mk?R(mk):null;
    return{lab:lab.textContent,val:val.textContent,x:+br.left.toFixed(1),w:+br.width.toFixed(1),cy:+((br.top+br.bottom)/2).toFixed(1),mcy:mr?+((mr.top+mr.bottom)/2).toFixed(1):null,
     oneLine:Math.abs((vr.top+vr.bottom)/2-(br.top+br.bottom)/2)<=3&&val.scrollWidth<=val.clientWidth+1,labOneLine:R(lab).height<parseFloat(getComputedStyle(lab).lineHeight)*1.6,mid:!!bar.querySelector('.ksb-mid')}});
   const sp=a=>a.length?+(Math.max(...a)-Math.min(...a)).toFixed(1):0;const sides=[...P.querySelectorAll('.krpair>.kr3p')];
   const kn=P.querySelector('.krelpair>.kr3r .kr3h');
   return{head:(P.querySelector('.krelh')||{}).textContent,sides:sides.map(s=>({pid:s.dataset.pid,fk:s.dataset.fk,name:s.querySelector('.knr').textContent.trim(),sil:!!s.querySelector('img[src*="unknown-"]')||/\?/.test(s.querySelector('.kr3f').textContent),
     nameAbove:R(s.querySelector('.knr')).bottom<=R(s.querySelector('.kr3f')).top+2})),known:kn?kn.textContent:null,
    count:[...P.querySelectorAll('.pcount')].map(e=>e.textContent),nrows:out.length,barXSpread:sp(out.map(o=>o.x)),barWSpread:sp(out.map(o=>o.w)),
    markerOff:Math.max(0,...out.filter(o=>o.mcy!=null).map(o=>Math.abs(o.mcy-o.cy))),wrapped:out.filter(o=>!o.oneLine||!o.labOneLine).map(o=>o.lab+' '+o.val),rows:out.map(o=>o.lab+' | '+o.val+(o.mid?' |mid':'')),
    hovf:document.documentElement.scrollWidth>innerWidth+1}});
  const pick=(strip,k)=>p.evaluate(([strip,k])=>{PG[strip]=k;render()},[strip,k]);
  const idxOf=(strip,name)=>p.evaluate(([strip,name])=>{const b=[...document.querySelectorAll(`#panel .pface[data-pg="${strip}"]`)];return b.findIndex(x=>(x.querySelector(":scope>span:last-child")||x).textContent.trim()===name)},[strip,name]);
  const old=await p.evaluate(()=>!document.querySelector('#panel .krelpair'));const res={unmet};
  await shot('ta');if(old){/* before: the old picker — shoot the Hoàng hậu, an unmet consort and the Emperor through it */
   for(const [n,f] of [['hh',()=>{const q=queenP();return q&&q.id}],['unmet',null],['emp',()=>'emp']]){await p.evaluate(([n,u])=>{const q=queenP();relSel=n==='hh'?q.id:n==='emp'?'emp':(liveRivals(true).find(v=>v.name===u)||{}).id;render()},[n,unmet]);await sleep(800);await shot(n)}
   R.push({sz,old:true,errs});await ctx.close();continue}
  res.ta=await meas();
  const hh=await p.evaluate(()=>{const q=queenP();return q&&q!==S?q.name:''});
  if(hh){await pick('relY',await idxOf('relY',hh));await sleep(800);await shot('ta-hh');res.taHH=await meas();
   await pick('rel',await idxOf('rel',hh));await sleep(800);await shot('hh');res.hh=await meas()}
  if(unmet){await pick('rel',await idxOf('rel',unmet));await sleep(800);await shot('unmet');res.unmet=await meas();
   res.unmetStrip=await p.evaluate(n=>{const b=[...document.querySelectorAll('#panel .pface[data-pg="rel"]')].find(x=>x.textContent.trim()===n);return b?{dim:b.classList.contains('dim'),sil:!!b.querySelector('img[src*="unknown-"]')||/\?/.test(b.textContent)}:null},unmet)}
  await pick('rel',1);await sleep(800);await shot('emp');res.emp=await meas();
  /* every X: portrait id == person id; side name == strip label */
  res.ids=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const n=document.querySelectorAll('#panel .pface[data-pg="rel"]').length;const bad=[];
   for(let i=0;i<n;i++){PG.rel=i;render();await W(60);const s=document.querySelector('#panel .krpair>.kr3p');if(!s){bad.push(i+':no side');continue}
    const bt=[...document.querySelectorAll('#panel .pface[data-pg="rel"]')][i];const lab=(bt.querySelector(':scope>span:last-child')||bt).textContent.trim();const nm=s.querySelector('.knr-n').textContent.trim();
    if(s.dataset.pid!==s.dataset.fk)bad.push(`${lab}: face ${s.dataset.fk} ≠ ${s.dataset.pid}`);if(nm!==lab)bad.push(`${lab}: side name ${nm}`)}return{n,bad}});
  R.push({sz,res,errs});await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
