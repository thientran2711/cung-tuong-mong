/* kit-modal-spin (review/kit-modal-spin) — node dev/test/kit-modal-spin.js [dev/index.html] [outdir]
   KP18  a kitConfirm / kitModal opened while the title screen is up sits on the title layer (class kptitle, z 55): the topmost element at the dialog button is in #modal and the button works;
         opened in play (title hidden) it does NOT get kptitle
   KP16  kitSpin(): 28 px / 18 px ring, turning (animation kspin), still breath under reduced motion; the dialog wait (#modal.klifewait::after) draws the same ring
   KP06  «Y dược»: every act name of dev/test/acts-names.json (the 337 of img/ACTS.json): the medicine / pregnancy / physician acts → y-duoc (label «Y dược»), every other act keeps its old category; before/after table */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';
const NAMES=JSON.parse(fs.readFileSync(path.join(__dirname,'acts-names.json'),'utf8'));
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const WANT=['Giả mang thai','Chữa bệnh cho con','Tự bào chế thuốc an thai','An thai','Báo tin có thai','Xin chữa bệnh','Truyền thái y','Mời làm thái y tâm phúc','Bài thuốc dễ thụ thai','Tự bốc thuốc','Mua thuốc bổ','Uống thuốc phá thai','Đến Thái y viện','Mời thái y bắt mạch','Sang Thái y viện xin bắt mạch'];
const STAY=['Hầu thuốc Hoàng thượng','Mang chăn ấm, thuốc men'];
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:OUT?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
  /* KP18 on the title */
  const t1=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const T=document.getElementById('title');const o={titleUp:!!T&&!T.hidden};
   let yes=0;kitConfirm({title:"Thử trên màn tên",lines:["Hộp này mở từ màn tên."],yes:"Đồng ý",no:"Thôi",onYes:()=>{yes++}});await sleep(500);
   const M=document.getElementById('modal');o.cls=M.className;o.z=getComputedStyle(M).zIndex;const b=M.querySelector('.dlg button, .dlg .kbtn');o.btn=!!b;
   if(b){const r=b.getBoundingClientRect(),el=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);o.top=!!el&&M.contains(el)}
   o.qtitle=/kptitle/.test((Q[0]||{}).cls||'');try{closeModal()}catch(e){}await sleep(200);return o});
  ok(t1.titleUp&&/kptitle/.test(t1.cls)&&+t1.z>=55&&t1.top,`${tag} KP18 dialog from the title is on the title layer and clickable`,t1);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}});
  await p.waitForTimeout(800);
  const t2=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));kitConfirm({title:"Trong ván",lines:["x"],yes:"Ok",no:"Thôi",onYes:()=>{}});await sleep(400);const o={cls:(Q[0]||{}).cls||''};try{closeModal()}catch(e){}return o});
  ok(!/kptitle/.test(t2.cls),`${tag} KP18 in play the dialog does NOT get kptitle`,t2);
  /* KP16 */
  const sp=await p.evaluate(async()=>{const o={};const h=document.createElement('div');h.style.cssText='position:fixed;left:10px;top:10px;z-index:2147483000;background:#fffaf0;padding:10px;display:flex;gap:10px';h.innerHTML=kitSpin()+kitSpin({s:true});document.body.appendChild(h);
   const a=h.children[0],s=h.children[1];const ca=getComputedStyle(a),cs=getComputedStyle(s);o.big=[ca.width,ca.animationName];o.small=[cs.width,cs.animationName];o.lab=a.getAttribute('aria-label');
   const M=document.getElementById('modal');M.hidden=false;M.classList.add('klifewait');const af=getComputedStyle(M,'::after');o.wait=[af.content,af.width,af.animationName,af.borderTopColor];M.classList.remove('klifewait');M.hidden=true;h.remove();return o});
  ok(sp.big[0]==='28px'&&sp.big[1]==='kspin'&&sp.small[0]==='18px'&&sp.small[1]==='kspin'&&/Đang/.test(sp.lab),`${tag} KP16 kitSpin big/small ring, turning, labelled`,sp);
  ok(sp.wait[1]==='28px'&&sp.wait[2]==='kspin',`${tag} KP16 the dialog wait draws the same ring`,sp.wait);
  await p.emulateMedia({reducedMotion:'reduce'});
  const rm=await p.evaluate(()=>{const h=document.createElement('div');h.innerHTML=kitSpin();document.body.appendChild(h);const n=getComputedStyle(h.firstChild).animationName;h.remove();return n});
  ok(rm==='kspinb'||rm==='none',`${tag} KP16 not turning under reduced motion (global rule or the breath)`,rm);await p.emulateMedia({reducedMotion:'no-preference'});
  /* KP06 */
  const ac=await p.evaluate(names=>{const old=KIT_ACT_CATS.filter(x=>x[0]!=='y-duoc');const oldCat=n=>{for(const [c,re] of old)if(re.test(n))return c;return'giao-thiep'};
   return names.map(n=>[n,oldCat(n),kitActCat(n),(KIT_CAT[kitActCat(n)]||[])[0]||''])},NAMES.concat(['Hầu thuốc Hoàng thượng']));
  const nw=ac.filter(x=>x[2]==='y-duoc'),changed=ac.filter(x=>x[1]!==x[2]);
  if(tag==='fold'){console.log('before → after (acts whose group changed):');changed.forEach(x=>console.log('  '+x[0]+': '+x[1]+' → '+x[2]))}
  ok(WANT.every(n=>ac.find(x=>x[0]===n&&x[2]==='y-duoc')),`${tag} KP06 every medicine / pregnancy / physician act is «Y dược»`,WANT.filter(n=>!ac.find(x=>x[0]===n&&x[2]==='y-duoc')));
  ok(STAY.every(n=>{const x=ac.find(v=>v[0]===n);return !x||x[2]!=='y-duoc'}),`${tag} KP06 serving medicine to the Emperor stays Hầu hạ`);
  ok(changed.every(x=>x[2]==='y-duoc')&&nw.every(x=>WANT.includes(x[0])),`${tag} KP06 only those acts changed group, nothing else moved`,changed.filter(x=>x[2]!=='y-duoc').slice(0,5));
  ok(nw.every(x=>x[3]==='Y dược'),`${tag} KP06 label «Y dược»`);
  if(OUT){fs.mkdirSync(OUT,{recursive:true});await p.screenshot({path:`${OUT}/kit-modal-spin-${tag}.png`})}
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,3));await p.close()}
 console.log(res.every(x=>x)?'KIT-MODAL-SPIN PASS':'KIT-MODAL-SPIN FAIL '+res.filter(x=>!x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})();
