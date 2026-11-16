/* review/kit-fit — KIT §32.2b (figure gaps) + §6.2b (option picture form by content), owner 16/11 s21 (VIỆC "Tiết Thanh minh",
   dev/handover/refs/owner-viec-thanhminh.jpg on the docs branch).
   Opens every frame kind that shows a full-body figure (the 14 KP_SEAL kinds with a person, the stage-fig-size person dialogs, the festival
   VIỆC) and measures, with its OWN code (works on an old build too, for before/after):
     gapTop  header rule (.kph bottom) → top of the name chip / painted head (px)
     gapBot  lowest painted feet → the frame's inner bottom edge (px)        rule: |gapTop − gapBot| ≤ 2 and both ≥ 14 (full figures)
     opt     every compact act/option card in the dialog: empty px under the text (card content bottom − text bottom) and picture form
             rule: empty ≤ 2 px, except a square already at its minimum side (text shorter than KIT_OPT_SQ.min × w)
   usage: node dev/test/kit-fit.js <url> <outdir> <tag> [WxH,...] [shots: all|none|<case,..>]    exit 1 on any violation
   CDN pictures go through the session proxy (HTTPS_PROXY). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,TAG,SIZES,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const KINDS=['coach','tip','court0','court1','court2','fest','choice','news','result','notice','night','info','rule','intel','evidence','reward','threat','person','end','toil','thtrieu','visit','emp','man','two','child','many','ban','scroll','shop','pet'];
const MEAS=`(()=>{const M=document.getElementById('modal');let d;const vis=e=>e&&e.getClientRects().length>0;const pd=[...document.querySelectorAll('.dlg.kpdlg')].find(vis);if(pd)d=pd;else if(!M||M.hidden){d=document.getElementById('panel');if(!d)return{nomodal:true}}else d=M.querySelector('.dlg');if(!d)return{nodlg:true};const R=e=>e.getBoundingClientRect();
 const out={kind:d.dataset&&d.dataset.kind||'',seal:(d.querySelector('.kseal')||{}).textContent||'',kdper:d.classList.contains('kdper')};
 const col=d.querySelector(pd?'.kpsubj.kes':'#mb .kpsubj.kes');
 if(col){const D=R(d),C=R(col),ph=d.querySelector(':scope > .kph'),cs=getComputedStyle(d);const lt=ph&&ph.offsetParent?R(ph).bottom:D.top+(parseFloat(cs.borderTopWidth)||0),lb=pd&&d.querySelector('.kpdb')?R(d.querySelector('.kpdb')).bottom:D.bottom-(parseFloat(cs.borderBottomWidth)||0);
  const F=[...col.querySelectorAll(pd?'.kesf:not(.kesno) .kesimg':':scope > .kesf:not(.kesno) .kesimg')].filter(im=>vis(im)&&getComputedStyle(im.closest('.kesf')).visibility!=='hidden'&&im.naturalWidth);
  if(F.length){let head=1e9,feet=-1e9,full=true;F.forEach(im=>{const r=R(im);const b=(window.__KITFB||{})[im.getAttribute('src')];const v=b&&b.v||{t:0,b:1};head=Math.min(head,r.top+v.t*r.height);const f=r.top+v.b*r.height;feet=Math.max(feet,f);if(f>C.bottom+1)full=false});
   const caps=[...col.querySelectorAll('.kpsn')].filter(vis).map(c=>R(c).top);const top=caps.length?Math.min(head,...caps):head;
   Object.assign(out,{gapTop:Math.round(top-lt),gapBot:Math.round(lb-Math.min(feet,C.bottom)),full,n:F.length,figH:Math.round(Math.min(feet,C.bottom)-head)})}}
 out.opts=[...d.querySelectorAll('button.ka.kart')].filter(b=>b.offsetParent).map(b=>{const a=b.querySelector(':scope > .kaart'),t=b.querySelector(':scope > .kabody');if(!a||!t)return null;
  const A=R(a),T=R(t),B=R(b),cs=getComputedStyle(b);if(getComputedStyle(a).display==='none'||A.width>112)return null;const cb=B.bottom-(parseFloat(cs.paddingBottom)||0)-(parseFloat(cs.borderBottomWidth)||0);
  const sq=Math.abs(A.width-A.height)<2;const lo=Math.round(((window.KIT_OPT_SQ||{}).min||.45)*(b.closest('.kpanec,.pc>.pcr')&&A.width<=72?72:84));
  return{t:(t.querySelector('.kan')||t).textContent.trim().slice(0,28),pic:Math.round(A.width)+'x'+Math.round(A.height),form:sq?'sq':'tall',text:Math.round(T.height),empty:Math.max(0,Math.round(cb-T.bottom)),atMin:sq&&A.width<=lo+1}}).filter(Boolean);
 return out})()`;
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const ALL=[];let bad=0;
 for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.__ctmBuilt);await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.th=Math.max(S.th||0,40);render()});
  await sleep(800);const rows=[];
  for(const k of (process.env.ONLY?process.env.ONLY.split(','):KINDS)){const ok=await p.evaluate(async k=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const md=document.getElementById('modal');md.hidden=true;
    const R0=liveRivals(true).filter(v=>!v.queen);R0.slice(0,3).forEach(v=>S.met[v.id]=1);const v=R0[0],v2=R0[1]||R0[0];
    const o=[{n:'Tiếp',fx:{},x:'thân +3',go:()=>{}},{n:'Từ chối khéo rồi lui về cung',fx:{bac:-10},x:'thân -3',hint:'giữ được thể diện',go:()=>{}}];
    const many=[1,2,3,4,5].map(i=>({n:'Cách thứ '+i+' để đối đáp cho phải lẽ',fx:{suc:-i},hint:'thành bại khó đoán, hỏng thì càng phật ý người trên',risk:'có rủi ro',go:()=>{}}));
    const j24=re=>{for(let i=0;i<400;i++){let m=null;try{m=approachOne()}catch(e){}if(m&&re.test(String(m.t||''))&&kitStagePeople(m).length)return m}return null};
    const seal={choice:1,news:1,result:1,notice:1,night:1,info:1,rule:1,intel:1,evidence:1,reward:1,threat:1,person:1,end:1};
    if(k==='coach'){kitCoach({title:'Lời dặn',html:'<p>Ma ma dặn một câu ngắn.</p>'});await W(1500);return true}
    if(k==='tip'){kitTip({title:'Lời dặn',html:'<p>Ma ma dặn một câu ngắn.</p>'});await W(1500);return true}
    if(/^court/.test(k)){tab='court';PG.court=+k.slice(5);render();await W(1500);return true}
    if(k==='fest'){Q.push(Object.assign({who:pEmp(),ev:'fest',evId:'fest:thanhminh',headArt:{src:'img/ev-fest-thanhminh-b.webp',label:'Tiết Thanh minh'}},AS_LIGHT.thanhminh()))}
    else if(seal[k]){const who=k==='night'||k==='reward'?pEmp():k==='rule'||k==='info'?pTH():pv(v);Q.push({t:'Mẫu khung '+k,kit:{kind:k},who,h:`<p>${who.name||'Người'} có việc cần bẩm. Một câu ngắn.</p>`,opts:k==='notice'||k==='news'||k==='info'||k==='rule'?undefined:o})}
    else if(k==='toil'){const tm=j24(/Thái hậu triệu/);const thw=tm?kitStagePeople(tm)[0]:pTH();Q.length=0;toilReact({k:'th-scold',who:Object.assign(pTH(),{__kp:thw}),host:'th',n:-1,name:'Thái hậu',line:'trang điểm đẹp: Thái hậu thiện cảm -1',ctx:{mk:'dep',dress:'photruong'}});await W(60);if(!Q.length)return'none';if(tm)Q.forEach(m=>m.stage=kitStagePeople(tm))}
    else if(k==='thtrieu'||k==='visit'||k==='emp'){const m=j24(k==='thtrieu'?/Thái hậu triệu/:k==='visit'?/Có người đến/:/Hoàng thượng/);if(!m)return'none';Q.push(m)}
    else if(k==='man')Q.push({t:'Có người đến',stage:[{__fig:'img/fig-eunuch-ndp-tray.webp',__cap:'Tiểu Lý Tử',__role:'Thái giám Nội vụ phủ',age:28,sex:'m'}],h:'<p>Thái giám Nội vụ phủ đến bẩm việc.</p>',opts:o});
    else if(k==='two')Q.push({t:'Có người đến',stage:[v,v2],who:pv(v),h:`<p>${v.name} cùng ${v2.name} sang thăm.</p>`,opts:o});
    else if(k==='child')Q.push({t:'Hoàng tử đến thỉnh an',stage:[{__fig:'img/fig-eunuch-ndp-tray.webp',__cap:'Tiểu hoàng tử',__role:'Hoàng tử',age:7,sex:'m'}],h:'<p>Tiểu hoàng tử đến thỉnh an.</p>',opts:o});
    else if(k==='many')Q.push({t:'Việc khó xử',who:pv(v),h:`<p>${v.name} hỏi khó.</p>`,opts:many});
    else if(k==='scroll')Q.push({t:'Hoàng thượng',who:pEmp(),h:'<p>Hoàng thượng ghé qua, hỏi chuyện bếp núc.</p>',opts:many.concat(many).map((o,i)=>Object.assign({},o,{n:o.n+' '+i,hint:o.hint+'; lâu dần bệ hạ để mắt hơn, thêm tình nghĩa với bệ hạ'})),art:'img/ev-toil-th-scold.webp'});
    else if(k==='ban')Q.push({t:'Thái hậu chê dung nhan',who:pTH(),h:'<p>“Ăn vận phô trương quá.”</p>',opts:o,art:'img/ev-toil-th-scold.webp'});
    else if(k==='shop'){S.shop=Object.keys(IT).filter(k=>IT[k].pr>0&&IT[k].pr<200).slice(0,8);S.bac=70;invAct('shop');return true}
    else if(k==='pet'){try{const P=tsbPets(S);if(!P.length)return'none';petcOpen(0)}catch(e){return'none'}return true}
    Q.forEach(m=>m.must=1);showModal();await W(900);return document.getElementById('modal').hidden?'hidden':true},k).catch(e=>'ERR '+e.message.slice(0,160));
   if(ok!==true){rows.push({k,skip:String(ok)});continue}
   await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,15000)}))));await sleep(1800);
   const r=await p.evaluate(MEAS);r.k=k;if(process.env.DBG){const g=await p.evaluate(()=>{const a=kitFrameGaps();const c=document.querySelector('#mb .kpsubj.kes');const h=c&&c.clientHeight;const cls=document.querySelector('#modal .dlg').className;kitDpFit();return{a,h,cls,b:kitFrameGaps(),h2:c&&c.clientHeight,mb:document.getElementById('mb').clientHeight}});console.log('DBG',k,JSON.stringify(g))}
   const v=[];if(r.gapTop!=null&&r.full){if(Math.abs(r.gapTop-r.gapBot)>2)v.push(`gaps ${r.gapTop}/${r.gapBot} unequal`);if(Math.min(r.gapTop,r.gapBot)<14)v.push(`gap < 14`)}
   (r.opts||[]).forEach(o=>{if(o.empty>2&&!o.atMin)v.push(`opt "${o.t}" empty ${o.empty}px (${o.form} ${o.pic}, text ${o.text})`)});r.viol=v;bad+=v.length;rows.push(r);
   if(SHOTS==='all'||(SHOTS||'').split(',').includes(k))await p.screenshot({path:`${OUT}/${TAG}-${k}-${sz}.jpg`,type:'jpeg',quality:70});
   await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');md.hidden=true;try{kitCoachOff();kitTipOff()}catch(e){}});}
  ALL.push({sz,rows,errs});await ctx.close()}
 for(const s of ALL){console.log(`== ${s.sz}  page errors: ${s.errs.length}${s.errs.length?' '+s.errs.slice(0,3).join(' | '):''}`);
  for(const r of s.rows){if(r.skip){console.log(`  ${r.k.padEnd(8)} skip ${r.skip}`);continue}
   const os=(r.opts||[]);const emp=os.map(o=>o.empty);console.log(`  ${r.k.padEnd(8)} ${(r.seal||'').padEnd(10)} fig ${r.gapTop==null?'-':`gap top ${r.gapTop} / bot ${r.gapBot}${r.full?'':' (cut)'}`.padEnd(20)} opts ${os.length} forms ${os.map(o=>o.form).join(',')||'-'} empty ${emp.join(',')||'-'}${r.viol.length?'  VIOL: '+r.viol.join('; '):''}`)}}
 fs.writeFileSync(`${OUT}/${TAG}.json`,JSON.stringify(ALL,null,1));const pe=ALL.reduce((a,s)=>a+s.errs.length,0);console.log(`violations ${bad} · page errors ${pe}`);await b.close();process.exit(bad||pe?1:0)})().catch(e=>{console.error(e);process.exit(2)});
