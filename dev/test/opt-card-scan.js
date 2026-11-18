/* review/opt-card-short — scan every dialog option card: height, picture box, text height. usage: node dev/test/opt-card-scan.js <url> <outdir> <tag> [WxH,..] [variant:none|A|B|C] [shots:all|none|case,..] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,TAG,SIZES,VAR,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const CASES=(process.env.ONLY||'mat,mat2,dress,choice,many,visit,two,thtrieu,night,fest,man,child').split(',');
const MEAS=`(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return{nomodal:true};const d=M.querySelector('.dlg');const R=e=>e.getBoundingClientRect();
 const lines=e=>{const r=document.createRange();r.selectNodeContents(e);return new Set([...r.getClientRects()].filter(q=>q.width>0).map(q=>Math.round(q.top/4))).size};
 return{title:((d.querySelector('.kpt,.kpttl,h2')||{}).textContent||'').slice(0,40),subj:!!d.querySelector('.kpsubj,.kszfig')||d.classList.contains('kdper'),
 opts:[...d.querySelectorAll('.opts > button.ka, .kpscopts > button.ka')].filter(b=>b.offsetParent).map(b=>{const a=b.querySelector(':scope > .kaart'),t=b.querySelector(':scope > .kabody')||b;const A=a?R(a):{width:0,height:0},B=R(b);const kn=b.querySelector('.kan');const fs=kn?parseFloat(getComputedStyle(kn).fontSize)||16:16;
  const rows=[...b.querySelectorAll('small.kb > .kr')].map(r=>({l:(r.querySelector('.krl')||{}).textContent,n:lines(r.querySelector('.krv')||r)}));
  return{t:((kn||t).textContent||'').trim().slice(0,30),pic:a&&getComputedStyle(a).display!=='none'?Math.round(A.width)+'x'+Math.round(A.height):'NONE',ch:Math.round(B.height),text:Math.round(R(t).height),titleEm:kn?+(R(kn).width/fs).toFixed(1):0,rows:rows.map(r=>r.l+':'+r.n).join(' '),dlgH:Math.round(R(d).height)}})}})()`;
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const ALL=[];
 for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.__ctmBuilt);await sleep(2500);
  await p.evaluate(v=>{try{kitReward=()=>{}}catch(e){}try{window.kitReward=()=>{}}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.th=Math.max(S.th||0,40);S.bac=500;if(v&&v!=='none')kitOptVarSet(v);render()},VAR);
  await sleep(800);const rows=[];
  for(const k of CASES){const ok=await p.evaluate(async k=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const md=document.getElementById('modal');md.hidden=true;
    const R0=liveRivals(true).filter(v=>!v.queen);R0.slice(0,3).forEach(v=>S.met[v.id]=1);const v=R0[0],v2=R0[1]||R0[0];
    const o=[{n:'Tiếp',fx:{},x:'thân +3',go:()=>{}},{n:'Từ chối khéo rồi lui về cung',fx:{bac:-10},x:'thân -3',hint:'giữ được thể diện',go:()=>{}}];
    const many=[1,2,3,4,5].map(i=>({n:'Cách thứ '+i+' để đối đáp cho phải lẽ',fx:{suc:-i},hint:'thành bại khó đoán, hỏng thì càng phật ý người trên',risk:'có rủi ro',go:()=>{}}));
    const j24=re=>{for(let i=0;i<400;i++){let m=null;try{m=approachOne()}catch(e){}if(m&&re.test(String(m.t||''))&&kitStagePeople(m).length)return m}return null};
    const pv=x=>x;
    if(k==='mat'||k==='mat2'){const arts=ARTS.filter(a=>wkKindsOf(a.k).some(x=>WKR[x]));const a=arts[k==='mat'?0:Math.min(2,arts.length-1)];if(!a)return'none';S.arts[a.k]=S.arts[a.k]||1;const kind=wkKindsOf(a.k).find(x=>WKR[x]);Object.assign(KWR,{k:a.k,mode:'self',run:()=>{},kind});wkrMat(kind,WKR[kind][0].id)}
    else if(k==='dress'){tsDressAnnounce()}
    else if(k==='choice')Q.push({t:'Mẫu khung choice',kit:{kind:'choice'},who:pv(v),h:'<p>Có việc cần bẩm.</p>',opts:o});
    else if(k==='many')Q.push({t:'Việc khó xử',who:v,h:'<p>Hỏi khó.</p>',opts:many});
    else if(k==='night')Q.push({t:'Mẫu khung night',kit:{kind:'night'},who:pEmp(),h:'<p>Đêm khuya.</p>',opts:o});
    else if(k==='fest'){Q.push(Object.assign({who:pEmp(),ev:'fest',evId:'fest:thanhminh',headArt:{src:'img/ev-fest-thanhminh-b.webp',label:'Tiết Thanh minh'}},AS_LIGHT.thanhminh()))}
    else if(k==='thtrieu'||k==='visit'){const m=j24(k==='thtrieu'?/Thái hậu triệu/:/Có người đến/);if(!m)return'none';Q.push(m)}
    else if(k==='two')Q.push({t:'Có người đến',stage:[v,v2],who:v,h:'<p>Sang thăm.</p>',opts:o});
    else if(k==='man')Q.push({t:'Có người đến',stage:[{__fig:'img/fig-eunuch-ndp-tray.webp',__cap:'Tiểu Lý Tử',__role:'Thái giám Nội vụ phủ',age:28,sex:'m'}],h:'<p>Thái giám đến bẩm việc.</p>',opts:o});
    else if(k==='child')Q.push({t:'Hoàng tử đến thỉnh an',stage:[{__fig:'img/fig-eunuch-ndp-tray.webp',__cap:'Tiểu hoàng tử',__role:'Hoàng tử',age:7,sex:'m'}],h:'<p>Thỉnh an.</p>',opts:o});
    Q.forEach(m=>m.must=1);showModal();await W(900);return document.getElementById('modal').hidden?'hidden':true},k).catch(e=>'ERR '+e.message.slice(0,160));
   if(ok!==true){rows.push({k,skip:String(ok)});continue}
   await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,15000)}))));await sleep(1800);
   await p.evaluate(()=>{const o=document.querySelector('#modal .opts, #modal .kpscopts');if(o)o.scrollIntoView({block:'start'})});await sleep(300);
   const r=await p.evaluate(MEAS);r.k=k;rows.push(r);
   if(SHOTS==='all'||(SHOTS||'').split(',').includes(k))await p.screenshot({path:`${OUT}/${TAG}-${k}-${sz}.jpg`,type:'jpeg',quality:80});
   await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');md.hidden=true});}
  ALL.push({sz,rows,errs});await ctx.close()}
 for(const s of ALL){console.log(`== ${s.sz} errors ${s.errs.length} ${s.errs.slice(0,2).join('|')}`);for(const r of s.rows){if(r.skip){console.log(`  ${r.k.padEnd(8)} skip ${r.skip}`);continue}
  console.log(`  ${r.k.padEnd(8)} dlg ${r.opts[0]?r.opts[0].dlgH:'-'} subj ${r.subj?1:0} cards ${r.opts.length} ch ${r.opts.map(o=>o.ch).join('/')} pic ${r.opts.map(o=>o.pic).join('/')} titEm ${r.opts.map(o=>o.titleEm).join('/')} text ${r.opts.map(o=>o.text).join('/')}`)}}
 fs.writeFileSync(`${OUT}/${TAG}.json`,JSON.stringify(ALL,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
