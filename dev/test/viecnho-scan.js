/* review/viecnho-fix family scans (LUẬT SỬA CẢ NHÓM): node dev/test/viecnho-scan.js <outdir>
   A) every tab / sub-tab: is an «open new …» act (.ktacts/.kpanec outside a person card) rendered ABOVE the main content (.pgwrap / .pc / list)?  B) every person card (.pc[data-k2]) on every tab: kit §6.4 shape (kpwide ⇒ .kplscr, card never scrolls, fixed height). Prints before/after-style table. */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const ROOT=path.resolve(__dirname,'../..');const OUT=process.argv[2]||'/tmp/viecnho-scan';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const rows=[];
 for(const [name,w,h] of [['fold',755,1000],['ipad',1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
  await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(2500);
  await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}S.rank=Math.max(S.rank,3);S.sung=Math.max(S.sung,60);
   try{kn();for(const v of rivals)S.met[v.id]=1;for(const v of rivals)k61Meet(v,"gặp",3)}catch(e){}Q.length=0;
   const f0=j72cFit,n0=j72cNeed,p0=q72PlOk;j72cFit=()=>true;j72cNeed=()=>true;q72PlOk=()=>true;try{const q=q72();q.cd={};q.a=[];q72Test('c:j72c-court-005',1)}finally{j72cFit=f0;j72cNeed=n0;q72PlOk=p0}
   try{const it=Q[0];if(it&&it.opts)chooseM(0)}catch(e){}try{$("modal").hidden=true}catch(e){}Q.length=0;render()});await p.waitForTimeout(800);
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('[data-tab]')].map(e=>e.dataset.tab).filter((v,i,a)=>a.indexOf(v)===i));
  for(const t of tabs){await p.evaluate(t=>{Q.length=0;try{$("modal").hidden=true}catch(e){}tab=t;try{render()}catch(e){}},t);await p.waitForTimeout(900);
   const subs=await p.evaluate(()=>[...document.querySelectorAll('#panel [data-ktsub] [data-ktsv]')].map(e=>[e.closest('[data-ktsub]').dataset.ktsub,e.dataset.ktsv]));
   const cases=[[null,null],...subs];
   for(const [key,val] of cases){if(key){await p.evaluate(([k,v])=>{KTSUB[k]=v;render()},[key,val]);await p.waitForTimeout(500)}
    const r=await p.evaluate(()=>{const P=document.getElementById('panel');const acts=[...P.querySelectorAll('.ktacts,.kskacts')].filter(e=>!e.closest('.pc'));const main=P.querySelector('.pgwrap,.pc,.ktpeople,.kslide,.logs');
     const above=acts.some(a=>main&&(a.compareDocumentPosition(main)&Node.DOCUMENT_POSITION_FOLLOWING));
     const pcs=[...P.querySelectorAll('.pc[data-k2]')].map(pc=>({wide:pc.classList.contains('kpwide'),scr:!!pc.querySelector(':scope>.pcl>.kplscr'),fixed:!!pc.style.getPropertyValue('--kpcmax'),cardScroll:pc.scrollHeight-pc.clientHeight>1,rOv:getComputedStyle(pc.querySelector(':scope>.pcr')).overflowY}));
     return{acts:acts.length,above,pcs}});
    rows.push({dev:name,tab:t,sub:key?key+'='+val:'-',...r})}}
  await p.close()}
 await b.close();
 console.log('dev  tab   sub   openActsOutsideCard  actAboveMain  personCards  cardsOk');
 let bad=0;for(const r of rows){const cardsOk=r.pcs.every(c=>!c.wide||(c.scr&&c.fixed&&!c.cardScroll));if(!cardsOk||r.above&&r.pcs.length)bad++;console.log([r.dev,r.tab,r.sub,r.acts,r.above?'ABOVE':'-',r.pcs.length,cardsOk?'ok':'BAD '+JSON.stringify(r.pcs)].join('\t'))}
 console.log(bad?`SCAN FOUND ${bad} issue(s)`:'SCAN CLEAN');process.exit(bad?1:0)})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
