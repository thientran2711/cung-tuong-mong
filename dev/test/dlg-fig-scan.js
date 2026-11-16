/* review/dlg-fig-ph (D50) — scan: EVERY person kind that can stand in a dialog person column / stage figure / book page and
   whether it ends with a real figure picture, the kit silhouette (unknown-fig-f|m|k), or NOTHING (the empty frame bug).
   Per person: kitFigOf(p) src (what kitStageFig draws), whether the image really loads (Image onload), the rendered kitStageFig html,
   and a live dialog (kitEventStage) probe: after load, the figure column must hold >= 1 visible .kesf with a loaded image.
   usage: node dev/test/dlg-fig-scan.js <url> [json-out]     exit 1 when any person ends with an empty frame */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
 await p.addStyleTag({content:'#kroul{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.th=Math.max(S.th||0,40);render()});
 await sleep(1500);
 const list=await p.evaluate(()=>{const L=[];const add=(grp,label,who)=>{if(who)L.push({grp,label,who})};
  const rv=(rivals||[]);
  add('player','S (her)',S);add('emperor','Hoàng thượng',S.emp);S.thO=S.thO||{};add('thai-hau','Thái hậu',S.thO);
  add('thai-hau','Thái hậu {kind:th}',{kind:'th'});add('emperor','{kind:emp}',{kind:'emp'});
  rv.forEach((v,i)=>add(v.queen?'queen':v.out?'consort-cold':v.alive?'consort':'consort-dead',(v.queen?'Hoàng hậu ':'phi ')+v.name+' r'+v.rank,v));
  rv.forEach(v=>(v.kids||[]).forEach(k=>add('child',(k.name||'kid')+' (kid of '+v.name+')',k)));(S.kids||[]).forEach(k=>add('child',(k.name||'kid')+' (hers)',k));
  try{allServ().forEach(s=>add(s.eid?'staff':s.role==='maid'?'maid':'eunuch',(s.name||'?')+' ['+(s.eid||s.role)+']',s))}catch(e){}
  const C=S.court||{};['tq','ksp','ped','ty'].forEach(k=>add('court-'+k,C[k]&&C[k].name,C[k]));add('maid-S.maid','S.maid',S.maid);
  (S.men||[]).forEach(m=>add('man',m.name+' ('+m.rw+')',m));
  add('npc','{kind:npc} Quản sự Tân Giả khố',{kind:'npc',name:'Quản sự Tân Giả khố',ini:'Quản',info:'Quản sự'});
  add('npc','{kind:npc} Phế phi họ Lý',{kind:'npc',name:'Phế phi họ Lý',ini:'Lý',info:'Phế phi'});
  add('npc','{kind:npc} Thầy dạy Thượng thư phòng',{kind:'npc',name:'Thầy dạy Thượng thư phòng',ini:'Thầy'});
  add('npc','{name only} Người lạ',{name:'Người lạ'});
  add('npc','{__cap,__role,sex:m,age:28}',{__cap:'Tiểu Lý Tử',__role:'Thái giám',age:28,sex:'m'});
  add('npc','{__cap,__role,sex:f}',{__cap:'Cung nữ',__role:'Cung nữ',age:20,sex:'f'});
  add('child','{age:7,sex:m} no ref',{name:'Tiểu hoàng tử',age:7,sex:'m',kind:'kid'});
  window.__SC=L;return L.map((x,i)=>({i,grp:x.grp,label:x.label}))});
 const res=[];
 for(const it of list){const r=await p.evaluate(async i=>{const x=window.__SC[i];const who=x.who;let src="",html="",err="";
   try{src=kitFigOf(who)||""}catch(e){err=e.message}
   try{html=kitStageFig(who,{cap:false})||""}catch(e){err=err||e.message}
   const ok=src?await new Promise(r=>{const im=new Image();im.onload=()=>r(1);im.onerror=()=>r(0);im.src=src;setTimeout(()=>r(0),20000)}):0;
   return{src:src.split('/').pop(),sil:/unknown-fig/.test(src),html:!!html,load:ok,err}},it.i).catch(e=>({err:e.message}));
  const state=!r.html||!r.src?'EMPTY':!r.load?'BROKEN':r.sil?'silhouette':'figure';res.push(Object.assign({},it,r,{state}))}
 /* live dialog probe: each person as the subject of a kit event dialog, figure column must show a loaded picture */
 for(const it of list){const r=await p.evaluate(async i=>{const W=t=>new Promise(r=>setTimeout(r,t));const x=window.__SC[i];Q.length=0;const md=document.getElementById('modal');md.hidden=true;
   try{Q.push({t:'Có người đến',stage:[x.who],h:'<p>Đến thăm.</p>',opts:[{n:'Tiếp',fx:{},x:'',go:()=>{}}],must:1});showModal()}catch(e){return{dlg:'ERR '+e.message.slice(0,80)}}
   const M=document.getElementById('modal');for(let t=0;t<48;t++){await W(250);if(M.hidden)return{dlg:'hidden'};const g=[...M.querySelectorAll('#mb .kesf img')];if(g.length&&g.every(im=>im.complete&&im.naturalWidth>0))break}
   if(M.hidden)return{dlg:'hidden'};
   const F=[...M.querySelectorAll('#mb .kesf')];const vis=F.filter(f=>!f.classList.contains('kesno')&&f.getBoundingClientRect().height>20);
   const good=vis.filter(f=>{const im=f.querySelector('img');return im&&im.complete&&im.naturalWidth>0});
   const col=!!M.querySelector('#mb .kpsubj.kes');const pf=!!M.querySelector('#mb .kpsubj:not(.kes)');
   let out;if(good.length)out={dlg:'ok'};else if(col&&F.length){/* still loading after 12 s: slow CDN, or a missing file (HEAD 404) */const im=F[0].querySelector('img');const u=im&&im.getAttribute('src');let st=0;try{st=(await fetch(u,{method:'HEAD',mode:'no-cors'})).status}catch(e){st=-1}
    out={dlg:vis.length&&st!==404?'ok(slow CDN, requested '+u.split('/').pop()+')':'EMPTY-FRAME(unloaded) '+(u||'NOSRC').split('/').pop()+' head='+st}}
   else out={dlg:col?'EMPTY-FRAME(no kesf)':pf?'portrait-frame':'no-column'};
   Q.length=0;M.hidden=true;return out},it.i).catch(e=>({dlg:'ERR '+e.message.slice(0,80)}));
  Object.assign(res[it.i],r)}
 const tab={};res.forEach(r=>{const k=r.grp+' | '+r.state+' | '+r.dlg;tab[k]=(tab[k]||0)+1});
 console.log('per person:');res.forEach(r=>console.log([r.grp,r.label,r.state,r.dlg,r.src].join(' | ')));
 console.log('\nsummary (group | figure state | dialog result : count)');Object.entries(tab).sort().forEach(([k,v])=>console.log(v+'  '+k));
 const bad=res.filter(r=>r.state==='EMPTY'||r.state==='BROKEN'||/EMPTY-FRAME|ERR|no-column|hidden/.test(r.dlg||''));
 console.log('\nBAD:',bad.length,'of',res.length,'page errors:',errs.length,errs.slice(0,3));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(res,null,1));await b.close();process.exit(bad.length?1:0)})();
