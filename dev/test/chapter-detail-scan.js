/* LUẬT SỬA CẢ NHÓM scan for owner 15/11 "Bấm vào báo thù cho nhà không có thông tin gì hiện ra": every tappable-looking element on the Mệnh truyện group
   (Mệnh truyện · Việc nhờ · Sổ ghi, every sub tab) is clicked in the live page in three story states (milestone chapter, arc chapter, old v1 save);
   a tap is DEAD when nothing observable changes (no panel/modal/popup/tab/state change). Empty-state illustrations (data-skill empty) and the mood emoji of a log row (kemo) are decorative and skipped. Elements inside real action cards (.pcb, .kpanec, buttons
   that act) are skipped: their tap does the action. Candidate = kit chip, skill card/head/picture, kit row, check line, person line, pager card,
   anything with cursor:pointer.  usage: NODE_PATH=$(npm root -g) node dev/test/chapter-detail-scan.js <url> [WxH] [out.json]   exit 1 if any dead tap (CHECK=1) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw,#ktut,.kmov{display:none!important}'});
 const reset=()=>p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kpop,.kmov').forEach(e=>e.remove());const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}Q.length=0});
 const states={
  milestone:()=>{},
  arc:()=>{const A=newThread67('td_an','m');S.st.ch.n=2;A.chap=2;A.i=1;pickNext67(A);A.due=0;A.dl=S.turn+6;A.hist.push('Hồi một: chọn đường');A.used.push(A.nb);S.st.M=A;S.st.ms=null},
  v1:()=>{S.st={step:1,done:0,tag:''};S.caseEv=2;S.foe='Lý Mai';S.foeDad='Thượng thư Lý';S.rank=1}};
 const SEL='.kchip,.kskill,.kskh2,.ksart,.kb .kr,.kchk,.kpl,.ktprow,.pgcard,.pgwrap [class*=card],[class*=kcard]';
 const rows=[];
 for(const [sn,setup] of Object.entries(states)){
  for(const [t,sub] of [['story','now'],['story','rank'],['story','past'],['q72','now'],['q72','debt'],['q72','news'],['log','']]){
   await reset();await p.evaluate(([setup,sn])=>{const f=new Function('return '+setup)();f();},[states[sn].toString(),sn]).catch(()=>{});
   const view=async()=>{await p.evaluate(([t,sub])=>{tab=t;render();if(sub){const bt=document.querySelector('#panel [data-ktsv="'+sub+'"]');if(bt)bt.click()}},[t,sub]);await p.waitForTimeout(900)};
   await view();
   const n=await p.evaluate(sel=>{const out=[];document.querySelectorAll('#panel *').forEach(e=>{if(e.closest('.kpbar,.ksub,.pctabs,.pcb,.kpanec,.opts,[data-skill^="empty"],[class*=kemo]'))return;if(e.matches('button,a,input,select,textarea'))return;const cur=getComputedStyle(e).cursor==='pointer';if(!(e.matches(sel)||cur))return;if(e.querySelector(sel)&&!cur)return;const r=e.getBoundingClientRect();if(r.width<8||r.height<8)return;out.push(1)});return out.length},SEL);
   for(let i=0;i<n;i++){await reset();await view();
    const info=await p.evaluate(([sel,i])=>{const out=[];document.querySelectorAll('#panel *').forEach(e=>{if(e.closest('.kpbar,.ksub,.pctabs,.pcb,.kpanec,.opts,[data-skill^="empty"],[class*=kemo]'))return;if(e.matches('button,a,input,select,textarea'))return;const cur=getComputedStyle(e).cursor==='pointer';if(!(e.matches(sel)||cur))return;if(e.querySelector(sel)&&!cur)return;const r=e.getBoundingClientRect();if(r.width<8||r.height<8)return;out.push(e)});
     const e=out[i];if(!e)return null;document.querySelectorAll('[data-scan]').forEach(x=>x.removeAttribute('data-scan'));e.setAttribute('data-scan','1');window.__sig=()=>JSON.stringify([Q.length,document.getElementById('modal').hidden,tab,document.getElementById('panel').innerHTML.length,!!document.getElementById('kpop'),S.logs.length,S.bac,S.suc]);window.__s0=window.__sig();
     return{label:(e.className||e.tagName)+' | '+(e.innerText||'').replace(/\s+/g,' ').trim().slice(0,50)}},[SEL,i]);
    if(!info)continue;try{await p.locator('[data-scan="1"]').first().click({timeout:40000})}catch(e){rows.push({state:sn,view:t+(sub?'/'+sub:''),el:info.label+' (not clickable: '+e.message.split('\n')[0].slice(0,60)+')',tapped:false});continue}await p.waitForTimeout(250);
    const ch=await p.evaluate(()=>window.__sig()!==window.__s0);rows.push({state:sn,view:t+(sub?'/'+sub:''),el:info.label,tapped:ch})}}}
 const dead=rows.filter(r=>!r.tapped);const out={total:rows.length,dead:dead.length,deadList:dead,errs};
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({rows,...out},null,1));
 console.log(`tappable-looking: ${rows.length}, dead: ${dead.length}`);const g={};dead.forEach(d=>{const k=d.view+' | '+d.el.split(' | ')[0];g[k]=(g[k]||0)+1});Object.entries(g).forEach(([k,v])=>console.log(String(v).padStart(3),k));if(errs.length)console.log('ERRS',errs);
 await b.close();process.exit(process.env.CHECK==='1'&&dead.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
