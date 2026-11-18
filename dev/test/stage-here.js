/* review/stage-here (owner OD 18/11 ~19:45Z (5)): every tab x {bedroom, Ngự hoa viên, a palace, a place closing at the next khắc, a place
   already closed (stayed on)} → the stage shows HER place (scimg = placeOf(S.place) picture, never the room while away), the stage is
   visible beside the panel on a two-page screen, the closing alert rail item only when closing next khắc / closed, first-time chip once.
   usage (HOST mode, built root): DEV=fold|ipadAir [SHOTS=outdir] [TABS=act,go,...|all] node dev/test/stage-here.js  → JSON + exit 1 on a fault */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const path=require('path');
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dev=process.env.DEV||'fold';const out=process.env.SHOTS||'';if(out)fs.mkdirSync(out,{recursive:true});
 const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__toastKeep=1;let a=+(new URLSearchParams(location.search).get('seed')||123456789);Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});/* seeded: the same run every time */
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;used=0;S.rank=Math.max(S.rank,2);render();
  const s=document.createElement('style');s.textContent='#kroul,#kload,#klife,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  window.__chips=[];const o=window.kitLineToast;window.kitLineToast=function(t){window.__chips.push(t);return o.apply(this,arguments)}});
 await sleep(1200);
 const ALL=await g.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab));
 const TABS=process.env.TABS&&process.env.TABS!=='all'?process.env.TABS.split(','):ALL;
 const palace=await g.evaluate(()=>{const v=rivals.find(v=>v.alive&&!v.out&&!v.queen&&accessOf(S,'r'+v.id).ok);return v?'r'+v.id:'tn'});
 /* case: [label, place, buoi, used, expect alert] */
 const CASES=[['room','home',0,0,false],['vuon','vuon',0,0,false],['palace',palace,1,0,false],['vuon-closing','vuon',2,3,true],['tn-closing','tn',0,3,true],['vuon-closed','vuon',3,1,true]];
 const rows=[];let bad=0;
 for(const [lab,k,bu,us,want] of CASES){
  await g.evaluate(([k,bu,us])=>{Q.length=0;document.getElementById('modal').hidden=true;S.dead=false;S.confined=0;S.out=0;S.closeSeen=null;window.__chips=[];
   S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=bu;used=0;tab="go";render();
   if(k!=="home"){accGrant(S,k);try{goTo(k)}catch(e){}if(S.place!==k){S.place=k;S.visit={k,people:[],talked:false,tk:{}}}}
   S.acPass={};used=us;Q.length=0;document.getElementById('modal').hidden=true;render()},[k,bu,us]);
  await sleep(900);
  for(const t of TABS){
   await g.evaluate(t=>{Q.length=0;document.getElementById('modal').hidden=true;const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b&&!b.classList.contains('on'))b.click();else if(b&&typeof k3Shell==='function'){}},t);await sleep(700);
   await g.evaluate(()=>{if(Q.length){Q.length=0;document.getElementById('modal').hidden=true}});
   const r=await g.evaluate(([k,t])=>{const st=document.getElementById('stage');const im=(document.getElementById('scimg').style.backgroundImage||'');const P=placeOf(S.place);
    const wantImg=SCIMG[P.sc]||'';const R=st.getBoundingClientRect();const vis=R.height>40&&R.width>40&&getComputedStyle(st).visibility!=='hidden';
    const gm=document.querySelector('.game').className;const pn=document.getElementById('panel');const pr=pn&&pn.getClientRects().length?pn.getBoundingClientRect():null;
    const alert=!!document.querySelector('#krail [data-rail="closing"]');
    return{t,tab,place:S.place,imgOk:!!wantImg&&im.indexOf(wantImg)>=0,roomImg:k!=="home"&&im.indexOf(SCIMG.home||'@@')>=0,stageVis:vis,panelVis:!!pr&&pr.width>40,
     spread:kitView().pages===2,maptab:/maptab/.test(gm),alert,chips:window.__chips.slice(),cs:S.closeSeen,sc:JSON.stringify(stClose()),tst:(()=>{const t=document.getElementById('ktbtoast');return !t||t.classList.contains('out')?'none':getComputedStyle(t).visibility==='hidden'?'waits':'shown'})(),cover:(()=>{const t=document.getElementById('ktbtoast');if(!t||!t.getClientRects().length||t.classList.contains('out')||getComputedStyle(t).visibility==='hidden')return '';const T=t.getBoundingClientRect();const C=kitToastCol();const f=[];if(T.left<C.left-1||T.right>C.right+1||T.top<C.top-1||T.bottom>C.bottom+1)f.push('outside-column');const n=kitToastKeepRects(t).filter(r=>r.left<T.right-1&&r.right>T.left+1&&r.top<T.bottom-1&&r.bottom>T.top+1).length;if(n)f.push(n+' kept');
     /* r3 (ROOT-56/57): measured here on its own (not through the kit list): PERSON = whole figure box (head to feet), face chips, name labels,
        portrait frames, card art; CARD = any action card / tappable row (whole box) */
     const hit=sel=>{let n=0;for(const e of document.querySelectorAll(sel)){if(!e.getClientRects().length||e.closest('#krail,#ktbtoast'))continue;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||+cs.opacity===0)continue;const r=e.getBoundingClientRect();if(r.width<2||r.height<2)continue;if(r.left<T.right-1&&r.right>T.left+1&&r.top<T.bottom-1&&r.bottom>T.top+1)n++}return n};
     const pp=hit('#mefig,.figimg,.tok,.tag,.j59metag,.pface,.kfr,.kpor,.ksart');if(pp)f.push(pp+' person');const cc=hit('.card,.kcard,button,[role=button]');if(cc)f.push(cc+' card');return f.join(',')})(),
     rail:[...document.querySelectorAll('#krail [data-rail]')].map(b=>b.dataset.rail).join(' '),md:!document.getElementById("modal").hidden,ttl:!document.getElementById("title").hidden}},[k,t]);
   r.case=lab;r.want=want;
   /* faults: stage picture is not her place; room picture while away; two-page screen: a panel tab without the stage beside it; alert wrong (only where the stage is visible) */
   r.fault=[];if(!r.imgOk)r.fault.push('img');if(r.roomImg)r.fault.push('room');
   if(r.spread&&!r.maptab&&r.panelVis&&!r.stageVis)r.fault.push('nostage');
   if(r.stageVis&&!r.maptab&&r.alert!==want)r.fault.push('alert');
   if(r.cover)r.fault.push('toast-cover');
   if(r.tst==='waits'&&!/closing|tnote/.test(r.rail))r.fault.push('collapse-no-rail');/* r3: no free spot → the rail «!» carries it (stage rail, or the corner dock on a tab without a stage) *//* r2: the toast never covers a tab row, the place name or a figure name (KIT §42.2 KEEP-CLEAR) */
   if(r.fault.length)bad++;rows.push(r);
   if(out&&(t==='act'||t==='rel'))await p.screenshot({path:`${out}/${dev}-${lab}-${t}.jpg`,type:'jpeg',quality:80});
  }
  const ch=await g.evaluate(()=>window.__chips.filter(x=>/đóng cửa/.test(x)).length);rows.push({case:lab,closeChips:ch,want});if(want&&ch!==1){bad++;rows[rows.length-1].fault=['chipcount']}if(!want&&ch){bad++;rows[rows.length-1].fault=['chipextra']}
 }
 /* old save: a save without S.closeSeen loads, the alert rule reads it as unseen */
 const old=await g.evaluate(()=>{try{delete S.closeSeen;const j=JSON.stringify(S);S=JSON.parse(j);render();return{ok:true}}catch(e){return{ok:false,e:String(e)}}});
 const hovf=await g.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 const sum={dev,cases:CASES.length,tabs:TABS.length,rows:rows.length,faults:bad,old,hovf,errs:errs.slice(0,5)};
 console.log(JSON.stringify({sum,bad:rows.filter(r=>r.fault&&r.fault.length)},null,0));
 if(process.env.ROWS)fs.writeFileSync(process.env.ROWS,JSON.stringify(rows,null,1));
 await b.close();srv.close();process.exit(bad||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
