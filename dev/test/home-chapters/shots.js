/* review/home-chapters: screenshots + layout checks of the new home parts on Fold 755x1000@2 and iPad 1180x820@2 (owner devices first).
   Screens: Mệnh truyện (chapters), a home chapter dialog, Tài nghệ (teachers pager), Giao du (bà mối + suitor people), E9 «Lời trăng trối»,
   «Thái hậu triệu» (ch), «Thánh chỉ» (vi hành). Fails on page error, horizontal overflow, clipped text, '???' / undefined / NaN, a '%' sign.
   usage: node dev/test/home-chapters/shots.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');
const [URL,OUT]=process.argv.slice(2);fs.mkdirSync(OUT,{recursive:true});const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();let bad=0;const rep=[];
 for(const [W,H] of [[755,1000],[1180,820]]){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block',hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce'});
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(5000);
  const skip=async()=>{for(let i=0;i<8;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}o.remove();return 1}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>{const b=document.querySelector('#slots button[data-new="1"]');if(b)b.click()});await sleep(3000);await skip();
  const life=async(o)=>{await p.evaluate(o=>{for(let i=0;i<80;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!S.srv&&!(typeof isSrv==='function'&&isSrv()))break}
    S.origin=ORIGINS.find(x=>x.k===o);S.kcPick='nha';Q=[];window.__bot=1;kcInit();delete window.__bot;Q=[];for(const id of ['title','curtain','kload','kroul']){const e=document.getElementById(id);if(e){e.hidden=true;e.style.display='none'}}document.getElementById('modal').hidden=true;tab='act';render()},o);await sleep(800);for(let i=0;i<4;i++){const n=await p.evaluate(()=>{const B=[...document.querySelectorAll('button')].filter(b=>/^(Nhận|Bỏ qua)$/.test(b.textContent.trim())&&b.offsetParent);B.forEach(b=>b.click());return B.length});if(!n)break;await sleep(700)}await p.evaluate(()=>{document.getElementById('modal').hidden=true;Q=[];render()})};
  const meas=()=>p.evaluate(()=>{const root=[document.getElementById('panel'),document.getElementById('modal')].filter(Boolean);const cut=[];
   root.forEach(r=>r.querySelectorAll('*').forEach(e=>{if(!e.offsetParent||e.children.length||!e.textContent.trim())return;const cs=getComputedStyle(e);if(e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(cs.overflowX)&&cs.textOverflow!=='ellipsis')cut.push(e.textContent.slice(0,30))}));
   const txt=root.map(r=>r.offsetParent||r.id==='panel'?r.innerText:'').join('\n');const m=txt.match(/\?\?\?|undefined|NaN|\[object|%/);
   return{ovf:document.documentElement.scrollWidth>innerWidth+1,cut:cut.slice(0,4),bad:m?txt.slice(Math.max(0,m.index-50),m.index+10).replace(/\s+/g,' '):''}});
  const shot=async(n)=>{await sleep(700);await p.evaluate(()=>{document.querySelectorAll('.kload,#kroul').forEach(e=>e.remove());for(const id of ['title','curtain']){const e=document.getElementById(id);if(e)e.style.display='none'}});await sleep(300);const m=await meas();if(m.ovf||m.cut.length||m.bad){bad++;rep.push({W,n,m})}await p.screenshot({path:`${OUT}/${W}-${n}.jpg`,type:'jpeg',quality:70})};
  const tabTo=async(t)=>{await p.evaluate(t=>{document.getElementById('modal').hidden=true;Q=[];tab=t;render()},t);await sleep(500)};
  const dlg=async(f)=>{await p.evaluate(f=>{Q=[];document.getElementById('modal').hidden=true;(new Function(f))();if(Q.length)showModal()},f);await sleep(900)};
  await life('ch');
  await p.evaluate(()=>{S.kc.ar.due=0;S.turn=3});await dlg('kc3Fire()');await shot('chapter-dialog');
  await p.evaluate(()=>{const ar=S.kc.ar;if(ar.A){ar.A.i=ar.A.seq.length;}try{kc3End(ar.A,"win",1)}catch(e){}});await tabTo('story');await shot('story');
  await p.evaluate(()=>{S.place='kc_hoc';kcWhere();for(const m of S.kc.fam)if(m.grp==='thay')S.kc.at[m.id]='kc_hoc';deal()});await tabTo('art');await shot('teachers');
  await p.evaluate(()=>{S.kc.suit.push(kcSuitor());S.place='kc_sanh';deal()});await tabTo('staff');await shot('matchmaker');
  await dlg('pushDil(mkP("kcE",{e:"divat"}),"Lời trăng trối")');await shot('e9-keepsake');
  await dlg('pushDil(mkP("kcE",{e:"thtrieu"}),"Thái hậu triệu")');await shot('th-trieu');
  await dlg('pushDil(mkP("kcE",{e:"vhtrieu"}),"Thánh chỉ")');await shot('vh-trieu');
  await dlg('pushDil(mkP("kcE",{e:"xemmat"}),"Nhà trai thử dung mạo")');await shot('e15-xemmat');
  await life('tt');await dlg('pushDil(mkP("kcE",{e:"hac"}),"Cha bị hặc tội")');await shot('e28-hac');
  await p.evaluate(()=>{const ar=S.kc.ar;ar.A=null;ar.plan=['kc_ke'];ar.i=0;ar.due=0;ar.done=[]});await dlg('kc3Fire()');await shot('chapter-ke');
  if(errs.length){bad++;rep.push({W,errs})}await c.close()}
 console.log(JSON.stringify({bad,rep}));await b.close();process.exit(bad?1:0)})();
