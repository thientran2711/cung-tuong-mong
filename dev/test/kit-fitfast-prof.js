/* review/opt-card-short — scan every dialog option card: height, picture box, text height. usage: node dev/test/opt-card-scan.js <url> <outdir> <tag> [WxH,..] [variant:none|A|B|C] [shots:all|none|case,..] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,TAG,SIZES,VAR,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const CASES=(process.env.ONLY||'many,choice,visit,two,night,fest').split(',');const RATE=+(process.env.RATE||1);
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const ALL=[];
 for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  if(process.env.HH)await p.addInitScript(()=>{window.__HH=1});await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.__ctmBuilt);await sleep(2500);
  await p.evaluate(v=>{try{kitReward=()=>{}}catch(e){}try{window.kitReward=()=>{}}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.th=Math.max(S.th||0,40);S.bac=500;render()},VAR);
  await sleep(800);const rows=[];
    const cdp=await ctx.newCDPSession(p);if(RATE>1)await cdp.send('Emulation.setCPUThrottlingRate',{rate:RATE});
  await p.evaluate(()=>{window.__T={};window.__LT=[];try{new PerformanceObserver(l=>{for(const e of l.getEntries())window.__LT.push(Math.round(e.duration))}).observe({type:'longtask',buffered:true})}catch(e){}
   const wrap=n=>{const f=window[n];if(typeof f!=='function'||f.__w)return;const g=function(){const t=performance.now();try{return f.apply(this,arguments)}finally{const T=window.__T[n]=window.__T[n]||{n:0,ms:0};T.n++;T.ms+=performance.now()-t}};g.__w=1;window[n]=g};
   window.__ST={};window.__SG=[];{const f0=window.kszSig3;}{const f=window.kszLivePick3;window.kszLivePick3=function(){const st=(new Error().stack||'').split('\n').slice(2,4).map(x=>x.trim().replace(/\(.*[\/]/,'(').slice(0,60)).join(' < ');window.__ST[st]=(window.__ST[st]||0)+1;return f.apply(this,arguments)}}
   ['kszLivePick3','kszLiveLay3','kitFrameApplyLive3','kszBtnGridLive3','kitOptTier','kitOdFit1'].forEach(wrap);
   window.__fl=0;const gb=Element.prototype.getBoundingClientRect;});
  const res=[];
  for(const k of CASES){const ok=await p.evaluate(async k=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const md=document.getElementById('modal');md.hidden=true;
    const R0=liveRivals(true).filter(v=>!v.queen);R0.slice(0,3).forEach(v=>S.met[v.id]=1);const QQ=liveRivals(true).find(x=>x.queen);const v=(window.__HH&&QQ)?QQ:R0[0],v2=R0[1]||R0[0];
    const o=[{n:'Tiếp',fx:{suc:-3},x:'thân +3',go:()=>{}},{n:'Từ chối khéo rồi lui về cung',fx:{suc:3},x:'thân -3',hint:'giữ được thể diện',go:()=>{}}];/* law 2 + 3 (law3-cost-only): demo pair symmetric, same as choice-value-audit's shot-script fixtures */
    const many=[1,2,3,4,5].map(i=>({n:'Cách thứ '+i+' để đối đáp cho phải lẽ',fx:{suc:-i},hint:'thành bại khó đoán, hỏng thì càng phật ý người trên',risk:'có rủi ro',go:()=>{}}));
    const j24=re=>{for(let i=0;i<400;i++){let m=null;try{m=approachOne()}catch(e){}if(m&&re.test(String(m.t||''))&&kitStagePeople(m).length)return m}return null};
    const pv=x=>x;const mR=j24(/Có người đến/),realH=(mR&&mR.h)||'<p>Nàng đến thỉnh an, dáng vẻ ngập ngừng như có điều muốn nói.</p>';
    /* OD 21:20Z: samples = REAL events (real title, description and options with their real costs / gains), never placeholder lines */
    const POOL=window.__POOL||(window.__POOL=(()=>{const o={};for(let i=0;i<700;i++){let m=null;try{m=approachOne()}catch(e){}if(!m||!m.opts||!m.opts.length)continue;let st=[];try{st=kitStagePeople(m)||[]}catch(e){}if(!st.length)continue;const k=String(m.t||'');(o[k]=o[k]||m)}return Object.values(o)})());
    const realEv=(n,skip)=>{const l=POOL.filter(m=>!(skip||[]).includes(m)).sort((a,b)=>Math.abs(a.opts.length-n)-Math.abs(b.opts.length-n));return l[0]||mR};
    const realOpts=m=>m.opts.map(o=>Object.assign({},o,{go:o.go||(()=>{})}));
    if(k==='mat'||k==='mat2'){const arts=ARTS.filter(a=>wkKindsOf(a.k).some(x=>WKR[x]));const a=arts[k==='mat'?0:Math.min(2,arts.length-1)];if(!a)return'none';S.arts[a.k]=S.arts[a.k]||1;const kind=wkKindsOf(a.k).find(x=>WKR[x]);Object.assign(KWR,{k:a.k,mode:'self',run:()=>{},kind});wkrMat(kind,WKR[kind][0].id)}
    else if(k==='dress'){tsDressAnnounce()}
    else if(k==='info'){kitModal({kind:'info',title:'Thông tin ngắn',sub:'',sections:[{h:'',html:'<p>Nội dung ngắn.</p>'}],btn:'Đã rõ'});return document.getElementById('modal').hidden?'hidden':true}
    else if(k==='result'){kitModal({kind:'result',title:'Kết quả',sub:'',sections:[{h:'',html:'<p>Đã xong.</p>'}],btn:'Tiếp'});return document.getElementById('modal').hidden?'hidden':true}
    else if(k==='choice'){const m=realEv(2);Q.push(Object.assign({},m,{kit:{kind:'choice'}}))}
    else if(k==='short'){const m=realEv(3);Q.push(Object.assign({},m,{kit:{kind:'choice'}}))}
    else if(k==='many'){const m=realEv(9);Q.push(m)}
    else if(k==='night'){const m=realEv(2);Q.push(Object.assign({},m,{kit:{kind:'night'}}))}
    else if(k==='fest'){Q.push(Object.assign({who:pEmp(),ev:'fest',evId:'fest:thanhminh',headArt:{src:'img/ev-fest-thanhminh-b.webp',label:'Tiết Thanh minh'}},AS_LIGHT.thanhminh()))}
    else if(k==='thtrieu'||k==='visit'){const m=j24(k==='thtrieu'?/Thái hậu triệu/:/Có người đến/);if(!m)return'none';Q.push(m)}
    else if(k==='two'){const m=realEv(2);Q.push(Object.assign({},m,{stage:[v,v2],who:v}))}
    else if(k==='man'){const m=realEv(3);Q.push(Object.assign({},m,{stage:[{__fig:'img/fig-eunuch-ndp-tray.webp',__cap:'Tiểu Lý Tử',__role:'Thái giám Nội vụ phủ',age:28,sex:'m'}]}))}
    else if(k==='child'){const m=realEv(2);Q.push(Object.assign({},m,{stage:[{__fig:'img/fig-eunuch-ndp-tray.webp',__cap:'Tiểu hoàng tử',__role:'Hoàng tử',age:7,sex:'m'}]}))}
    Q.forEach(m=>m.must=1);showModal();await W(900);return document.getElementById('modal').hidden?'hidden':true},k).catch(e=>'ERR '+e.message.slice(0,160));

   if(ok!==true){res.push({k,skip:String(ok)});continue}
   await sleep(2500);const r=await p.evaluate(()=>{const o={ST:window.__ST,T:window.__T,LT:window.__LT.slice()};window.__T={};window.__LT=[];return o});r.k=k;res.push(r);}
  const sum={};let lt=[];for(const r of res){if(r.skip)continue;lt=lt.concat(r.LT);for(const n in r.T){const T=sum[n]=sum[n]||{n:0,ms:0};T.n+=r.T[n].n;T.ms+=r.T[n].ms}}
  console.log(sz,'rate',RATE,'skipped',await p.evaluate(()=>window.__kszSkip3||0),'longtasks',lt.length,'sumLT',lt.reduce((a,c)=>a+c,0),'max',Math.max(0,...lt),JSON.stringify(Object.fromEntries(Object.entries(sum).map(([k,v])=>[k,v.n+'x '+Math.round(v.ms)+'ms']))));
  await ctx.close()}
 await b.close()})();
