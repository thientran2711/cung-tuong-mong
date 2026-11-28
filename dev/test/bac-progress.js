/* bac-progress (owner OD 26/11 ~08:05Z «để một trong hai thôi, hoặc là bậc, hoặc là tiến bộ … tiến bộ là tiến bộ của cái bậc đó, chứ ai là để tiến bộ của cả tổng 5 bậc»; KIT §21.2).
   Whole family on the Tài nghệ tab (Tứ đức · Cầm kỳ thi họa · Vũ Y Nữ công · Tác phẩm, at several bậc incl. mid-bậc progress): every skill card with a progress bar
   (.kskp) shows numbers = phần inside the bậc (crsProg), never the raw 0-100 points (label / rank word = KIT-STAGE-R11, OD 27/11 07:10Z, not tested here).
   Also crsAfterW: «+g · c/n» dry run (no state change), a bậc gained reads «lên …». Fold 755x1000 + iPad 1180x820.
   usage: node dev/test/bac-progress.js <index.html> [WxH,...]   exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const A=process.argv.slice(2);const SRC=path.resolve(A[0]);const SIZES=(A[1]||'755x1000,1180x820').split(',');
(async()=>{const b=await chromium.launch();let bad=0;const chk=(n,ok,x)=>{console.log((ok?'ok   ':'FAIL ')+n+(ok?'':' '+JSON.stringify(x||'').slice(0,240)));if(!ok)bad++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const dev=W<H?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.addStyleTag({content:'#kload,#klife,#kroulw,.kroul,#curtain,#dawn,#kdaytc{display:none!important}'});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;document.getElementById('modal').hidden=true;
   const ks=Object.keys(S.arts);ks.forEach((k,i)=>{S.arts[k]=i%5;S.artp[k]=Math.round(artNeed(i%5)*.4*10)/10});Object.keys(S.vir).forEach((k,i)=>{S.vir[k]=(i+1)%5;S.virp[k]=Math.round(artNeed((i+1)%5)*.6*10)/10})});
  for(const sub of ['duc','cktt','nc','wk']){const r=await p.evaluate(sub=>{try{KTSUB.art=sub}catch(e){}tab='art';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}
    return [...document.querySelectorAll('#panel .kskill')].map(c=>{const bar=c.querySelector('.kskp');const k=(c.dataset.skill||'').split('-');const kind=k[0],key=k.slice(1).join('-');
     const isV=kind==='vir'||(kind==='wk'&&key in S.vir);const lv=isV?S.vir:S.arts,pt=isV?S.virp:S.artp;const want=key in lv?crsProg(lv,pt,key):null;const kk=c.querySelector('.kskk');
     return {skill:c.dataset.skill,bar:!!bar,steps:!!c.querySelector('.ksteps'),lab:bar?bar.querySelector('span').textContent:'',num:bar?bar.querySelector('b').textContent:'',want:want?want.join('/'):'',lvN:key in lv?artNm(lv[key]):'',kick:kk?kk.textContent:''}})},sub);
   const withBar=r.filter(x=>x.bar);chk(`${dev} ${sub}: cards ${r.length}, with a bar ${withBar.length}`,r.length>0,r);
   for(const x of withBar){chk(`${dev} ${sub} ${x.skill}: ${x.num} = phần inside the bậc`,!x.want||x.num===x.want,x)}}
  const w=await p.evaluate(()=>{const k=Object.keys(S.arts)[0];S.arts[k]=1;S.artp[k]=0;const a=crsAfterW(S.arts,S.artp,k,2),same=S.artp[k]===0&&S.arts[k]===1;const up=crsAfterW(S.arts,S.artp,k,99);return {a,same,up,need:crsNeedP(1)}});
  chk(`${dev} crsAfterW «+2» reads c/n of the bậc, state untouched`,/^\d+\/\d+$/.test(w.a)&&w.same&&w.a.endsWith('/'+w.need),w);chk(`${dev} crsAfterW big gain reads «lên …»`,/^lên /.test(w.up)||/Tông sư/.test(w.up),w);
  chk(`${dev} no page errors`,!errs.length,errs);await ctx.close()}
 console.log(bad?`BAC-PROGRESS FAIL ${bad}`:'BAC-PROGRESS PASS');await b.close();process.exit(bad?1:0)})();
