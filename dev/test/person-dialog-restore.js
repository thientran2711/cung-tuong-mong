/* review/person-dialog-restore (owner 18/11 06:10Z, OD:L1852): scan of EVERY person / subject dialog of the stage pop-up (.pc, popCard):
   consort (met), stranger "Người lạ", Hoàng hậu, maid, elder (Thái hậu's ma ma), Emperor, Thái hậu, kid.
   Per kind, before and after one act: tabs present (.pctabs .pct count + labels), act cards equal height (px spread), empty band between the sticky info block
   and the first act card (px), a result note inside the column (.pcn), the bottom result card (#rtoast) shown after the act.
   usage: node dev/test/person-dialog-restore.js <root dir of a BUILT site> <W>x<H>@dpr <outdir|-> [kinds]
   env NOIMG=1: do not load CDN pictures (fast scan, layout only); default loads them through curl (sandbox) for shots. Prints one JSON line per kind + a table. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const D=require('./lib/device');const {execFileSync}=require('child_process');
const [,,ROOT,SZ,OUT,KINDS]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const kinds=(KINDS||'stranger,consort,queen,maid,elder,serv,kid,ty,fallen,emp,th').split(',');const cache={};
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+DPR,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,r=>{if(process.env.NOIMG)return r.abort();const u=r.request().url();try{if(!cache[u]){const f=process.env.CTM_CACHE?process.env.CTM_CACHE+'/'+require('crypto').createHash('md5').update(u).digest('hex'):'';if(f&&fs.existsSync(f))cache[u]=fs.readFileSync(f);else{cache[u]=execFileSync('curl',['-sSf','-m','30',u],{maxBuffer:60e6,stdio:['ignore','pipe','ignore']});if(f)fs.writeFileSync(f,cache[u])}}r.fulfill({status:200,body:cache[u],contentType:u.endsWith('.json')?'application/json':'image/webp',headers:{'access-control-allow-origin':'*'}})}catch(e){r.abort()}});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
 await g.addStyleTag({content:'#kroul,.kroul,[id^=kroul]{display:none!important}'});
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;document.querySelectorAll('[id^=kroul]').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
 await p.waitForTimeout(2500);
 const rows=[];
 for(const k of kinds){
  const made=await g.evaluate(k=>{try{const R=liveRivals(true);let pe=null;
   if(k==='stranger'){const v=R.find(x=>!x.queen&&!met61(x))||R[1];pe=rp(v)}
   else if(k==='consort'){const v=R.find(x=>!x.queen&&x.alive)||R[1];try{k61Meet(v,"scan",3)}catch(e){}pe=rp(v)}
   else if(k==='queen'){const v=R.find(x=>x.queen);if(!v)return 'no';try{k61Meet(v,"scan",3)}catch(e){}pe=rp(v)}
   else if(k==='emp')pe={kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:`${empName()} · ${MOODS[S.emp.mood][0].toLowerCase()}`};
   else if(k==='th')pe={kind:"th",name:"Thái hậu",ini:"Hậu",col:"#c0a0d0",info:"Thái hậu"};
   else if(k==='kid'){let kk=S.kids.find(x=>x.alive);if(!kk){kk=mkKid("m",8);kk.bt=S.turn-8*12;kk.alive=true;kk.hp=kk.hp||80;S.kids.push(kk)}pe={kind:"kid",ref:kk,name:kk.name,ini:"Tử",col:"#c9a0e0",info:`${kk.age} tuổi · Sức khỏe ${kk.hp} · Tài ${kk.tal} · Hoàng thượng thương ${kk.fond}`}}
   else if(k==='ty')pe={kind:"ty",name:(S.court&&S.court.ty&&S.court.ty.name)||"Thái y",ini:"Y",col:"#8fc38a",info:"Thái y viện"};
   else if(k==='fallen'){const v=R.find(x=>!x.queen&&x.alive);if(!v)return 'no';pe={kind:"fallen",ref:v,name:v.name,ini:"L",col:"#6a7a8a",info:"Phế phi"}}
   else{if(k==='kid'&&!S.kids.some(x=>x.alive)){const kk=mkKid("m",8);kk.bt=S.turn-8*12;kk.alive=true;kk.hp=kk.hp||80;S.kids.push(kk)}S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};renderStage();const L=S.visit.people;const i=L.findIndex(x=>x.kind===k);if(i<0)return 'no:'+L.map(x=>x.kind).join(',');pe=null;S.__scanIdx=i}
   if(pe){S.place="vuon";S.visit={k:"vuon",people:[pe],talked:false,tk:{}};S.__scanIdx=0}
   popIdx=null;popMsg="";renderStage();return 'ok'}catch(e){return 'ERR '+e.message}},k);
  if(made!=='ok'){rows.push({kind:k,skip:made});continue}
  await p.waitForTimeout(1500);
  for(let t=0;t<5;t++){await g.evaluate(()=>{const i=S.__scanIdx;const e=document.querySelector('[data-p="'+i+'"]');if(e)e.click()});await p.waitForTimeout(1200);if(await g.evaluate(()=>!!document.querySelector('.pc .pcr')))break}
  const MEAS=()=>{const R=e=>e.getBoundingClientRect();const pcr=document.querySelector('.pc .pcr');if(!pcr)return {open:false};const st=pcr.querySelector('.kpstick');const tabs=[...pcr.querySelectorAll('.pctabs .pct')].map(x=>x.textContent.trim());
   const vis=[...pcr.querySelectorAll('button.ka')].filter(x=>x.offsetParent&&R(x).height>0);const hs=vis.map(x=>Math.round(R(x).height));
   const top=Math.min(...vis.map(x=>R(x).top),1e9);const sb=st?R(st).bottom:R(pcr).top;const prevBottom=Math.max(st?R(st).bottom:0,...[...pcr.querySelectorAll('.pcn')].map(x=>R(x).bottom));
   const rt=document.getElementById('rtoast');return {open:true,tabs,nTabs:tabs.length,cards:vis.length,hMin:hs.length?Math.min(...hs):0,hMax:hs.length?Math.max(...hs):0,gap:vis.length?Math.round(top-prevBottom):null,note:!!pcr.querySelector('.pcn'),noteTxt:(pcr.querySelector('.pcn')||{}).textContent||'',toast:!!(rt&&rt.classList.contains('on')),pcrH:Math.round(R(pcr).height),bodies:vis.map(x=>(x.querySelector('.kat .kan')||x).textContent.trim().slice(0,18)+'='+Math.round(R(x.querySelector(':scope > .kabody')||x).height)+'/'+Math.round(R(x).height)).join(' ; ')}};
  const before=await g.evaluate(MEAS);
  if(OUT!=='-')await p.screenshot({path:`${OUT}/${k}-1.jpg`,type:'jpeg',quality:72});
  let after={};
  if(before.open&&before.cards){const done=await g.evaluate(()=>{try{const pe=curPeople()[popIdx];const o=talkOpts(pe);const j=o.findIndex(a=>!a.lock&&a.n!=="Dò la");if(j<0)return 'none';const n=o[j].n;talk(j);return n}catch(e){return 'ERR '+e.message}});
   await p.waitForTimeout(1500);after=await g.evaluate(MEAS);after.act=done;if(OUT!=='-')await p.screenshot({path:`${OUT}/${k}-2.jpg`,type:'jpeg',quality:72})}
  rows.push({kind:k,before,after});
  await g.evaluate(()=>{popIdx=null;popMsg="";const t=document.getElementById('rtoast');if(t)t.classList.remove('on')});
 }
 console.log(JSON.stringify({size:SZ,rows,errs}));
 const f=r=>r&&r.open?`tabs=${r.nTabs} cards=${r.cards} h=${r.hMin}-${r.hMax} gap=${r.gap} note=${r.note?'Y':'-'} toast=${r.toast?'Y':'-'}`:'closed';
 for(const r of rows)console.log(String(r.kind).padEnd(9),r.skip?'skip '+r.skip:'BEFORE '+f(r.before)+'  |  AFTER '+f(r.after)+(r.after&&r.after.act?'  ('+r.after.act+')':''));
 await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
