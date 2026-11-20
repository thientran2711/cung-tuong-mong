/* PALACE CHATTER where jerr's stage layer (.kmerr-lay, errSync) never exists: the servant-road life (S.srv via srvInit) and a co-op GUEST seat
   (errSync idle; jerr layer removed + ERR.sync stubbed, COOPW seat "b"). jchat must still show its lines through the kit part kitSay, in the
   kit's OWN layer #stage > .ksay-lay (KIT §78.z "say", K-HEAD-SAY), and the guest seat writes no S.pcx (display only, syncs nothing).
   usage: node dev/test/palace-chatter-host.js <baseURL e.g. file:///home/user/wt/x/> [W=755] [H=1000] */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,W0,H0]=process.argv;const W=+W0||755,H=+H0||1000;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let all=[];
 for(const life of ['servant','coop-guest']){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<900});
  await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
  for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
  await sleep(800);
  const R=await p.evaluate(async life=>{const Wt=t=>new Promise(r=>setTimeout(r,t));const C=[];const ck=(n,ok,d)=>C.push([n,!!ok,d===undefined?'':d]);
   SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
   document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());
   const clr=()=>{Q.length=0;try{closeModal()}catch(e){}const md=document.getElementById('modal');if(md)md.hidden=true};
   S.buoi=0;used=0;deal();render();await Wt(1500);clr();
   const noJerr=()=>{document.querySelectorAll('.kmerr-lay').forEach(e=>e.remove())};
   if(window.ERR&&typeof ERR.sync==='function')ERR.sync=function(){};noJerr();
   if(life==='servant'){S.srv=null;srvInit();S.dead=false;render();await Wt(1200);clr()}
   let pcx0=null;if(life==='coop-guest'){window.COOPW=window.COOPW||{};COOPW.on=true;COOPW.seat='b';pcx0=JSON.stringify(S.pcx||null);
    const k=places().find(x=>x.k==='vuon')?'vuon':places()[0].k;try{goTo(k)}catch(e){}clr();if(S.place!==k){S.place=k;S.visit={k,people:[],talked:false,tk:{},msg:''}}
    const P=S.visit.people;const L=liveRivals(true).filter(v=>!v.out&&!P.some(x=>x.ref===v)&&!sameHouse(S,v));let n=0;while(P.filter(x=>x.kind==='rival').length<3&&L[n])P.push(rp(L[n++]));render()}
   await Promise.race([Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),Wt(9000)]);await Wt(800);noJerr();
   const st=document.getElementById('stage');let got=null,n0=CHAT.log.length,tries=0,pres=[];
   for(;tries<10&&!got;tries++){CHAT.run=0;try{kitSayClear(st)}catch(e){}pres=CHAT.present().map(x=>x.p.name);CHAT.tick();
    for(let w=0;w<12&&!got;w++){await Wt(150);const e=st.querySelector(':scope>.ksay-lay .ksay');if(e&&e.style.visibility!=='hidden'){const t=(e.querySelector('.ksay-t')||{}).textContent||'';if(t)got={txt:t,who:(CHAT.log.slice(n0).find(x=>x.txt===t)||{}).who}}}
    if(!got)await Wt(400)}
   ck(life+': present people on the stage',pres.length>=1,pres);
   ck(life+': jerr layer absent',!document.querySelector('.kmerr-lay'));
   ck(life+': a chatter line shows in the kit layer #stage>.ksay-lay',!!got,{tries,log:CHAT.log.slice(n0).slice(0,3),stat:CHAT.stat,errs:CHAT.errs});
   ck(life+': the bubble text = the line said by a person on the stage',got&&got.who&&pres.includes(got.who),got);
   if(life==='coop-guest')ck('coop-guest: no S.pcx written (display only)',JSON.stringify(S.pcx||null)===pcx0,{before:pcx0,after:JSON.stringify(S.pcx||null).slice(0,120)});
   return C},life);
  for(const [n,ok,d] of R){console.log((ok?'ok  ':'FAIL')+' '+n+(ok?'':' '+JSON.stringify(d).slice(0,500)));all.push(ok)}
  if(errs.length)console.log('pageerrors',life,errs.slice(0,3));
  await ctx.close()}
 await b.close();const pass=all.filter(Boolean).length;console.log(`PALACE-CHATTER-HOST ${W}x${H}: ${pass}/${all.length} ${pass===all.length?'PASS':'FAIL'}`);process.exit(pass===all.length?0:1)})();
