/* fig-bg samples: composite candidate backgrounds behind real figures in the Tuần lục person page + kitEventDp dialog (CSS injected, game untouched).
   usage: node shoot.js <base url> <outdir> <jobs json>   jobs: [{id, bg, fig, kind:'book'|'dlg', who:'rival'|'emp'|'man', W,H, pos}] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,JOBS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const jobs=JSON.parse(fs.readFileSync(JOBS,'utf8'));const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();
 const groups={};for(const j of jobs){const k=j.W+'x'+j.H;(groups[k]=groups[k]||[]).push(j)}
 for(const k of Object.keys(groups)){const [W,H]=k.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{window.__bot=1});
  const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
  const init=async()=>{
  await p.goto(URL+'index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitBook==='function'&&typeof showModal==='function');
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;
   window.__nlInner=1;for(let i=0;i<400;i++){start();if(typeof isSrv!=='function'||!isSrv())break}window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;render();
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}});
  await p.evaluate(()=>document.fonts&&document.fonts.ready);await sleep(2500);
  };await init();let shown=false;
  for(const j of groups[k]){
   if(j.kind!=='book'&&shown){await init()}if(j.kind!=='book')shown=true;
   for(let att=0,ok=false;att<4&&!ok;att++){if(att>0)await init();ok=j.kind==='book';
   await p.evaluate(j=>{let st=document.getElementById('figbgcss');if(!st){st=document.createElement('style');st.id='figbgcss';document.head.appendChild(st)}
    const bg=j.bg?`background:url(${j.bg}) ${j.pos||'center top'}/${j.size||'cover'} no-repeat;`:'';
    st.textContent=j.bg?`.kbk-por{${bg}border-radius:3px;box-shadow:inset 0 0 0 1px rgba(120,80,40,.18)} .kbk-por .kesf{background:none}
     #modal .kpsubj.kes{${bg}border-radius:6px;box-shadow:inset 0 0 0 1px rgba(120,80,40,.18)}`:'';
    const k0=window.__k0||(window.__k0=kitFigOf);
    try{window.k61Named=k61Named=()=>true;window.kitKnown=kitKnown=()=>true;window.kitKnownName=kitKnownName=()=>true}catch(e){}
    const R0=liveRivals(true);let who;
    if(j.who==='emp')who=S.emp;else if(j.who==='hau')who=R0.find(v=>v.queen);else if(j.who==='maid')who=S.maid;
    else if(j.who==='man'){who=(S.men||[]).find(m=>m.role===(j.role||'Vương gia'))||(S.men||[])[0]}
    else who=R0.find(v=>!v.queen&&v.rank===(j.rank==null?3:j.rank))||R0[1];
    try{kn&&kn()}catch(e){}if(who&&who.id!=null){S.met=S.met||{};S.met[who.id]=1}if(who)who.met=1;
    window.kitFigOf=kitFigOf=function(q){if(j.fig&&q&&(q===who||q.__kp===who))return IMG_BASE+'img/'+j.fig;return k0.apply(this,arguments)};window.__fig=kitFigOf(who);
    window.__who=who},j);
   if(j.kind==='book'){
    await p.evaluate(()=>{let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
     const who=window.__who;const facts=[];const T=['Tranh sủng. Được thị tẩm đêm nay, Sủng +3, Ân tình +2.','Ban thưởng một hộp trâm ngọc, cả cung bàn tán.','Gặp ngươi ở ngự hoa viên, nói vài câu khách sáo.','Sai người đưa chè hạt sen sang cung ngươi.'];
     for(let i=0;i<4;i++)facts.push({text:T[i],kind:'world',auto:false});
     window.__bk=kitBook({pages:[{kind:'person',who,title:'x',blocks:[{facts}],n:4,chips:[['thiện cảm','+5']]}],head:'Tuần lục · Tháng sáu, năm thứ nhất, thượng tuần',host:w,label:'Tuần lục',onClose:()=>{}})});
   }else{
    await p.evaluate(()=>{const w=document.getElementById('dawn');if(w){w.innerHTML='';w.hidden=true}Q.length=0;document.getElementById('modal').hidden=true;const who=window.__who;
     const o2=[{n:"Nhịn",fx:{duc:2},x:"giữ lễ",go:()=>{}},{n:"Đáp lời khéo léo",fx:{danh:1},x:"được tiếng khéo",go:()=>{}}];
     const isEmp=who===S.emp;
     Q.push({t:isEmp?"Thánh giá đến":"Có người đến",who:isEmp?pEmp():who===S.maid?pMaid():(S.men||[]).includes(who)?pMan(who):pv(who),stage:[who],headArt:{src:isEmp?"img/ev-hoang-de-vui.webp":"img/ev-khach-den.webp"},
      h:`<p>${isEmp?'Hoàng thượng ghé cung ngươi.':(who.name||'')+' đến tận cửa cung, muốn gặp ngươi.'}</p>`,opts:o2});showModal()});
    const st=await p.evaluate(()=>({hid:document.getElementById('modal').hidden,q:Q.length,t:(document.querySelector('#modal .dlg h3, #modal .dlg')||{}).textContent?.slice(0,60)}));console.log(j.id,att,JSON.stringify(st));ok=!st.hid&&/Có người đến|Thánh giá đến/.test(st.t||'');
   }
   }
   await sleep(1500);
   await p.evaluate(()=>Promise.all([...document.querySelectorAll('img')].filter(i=>i.offsetParent).map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,10000)}))));
   await p.evaluate(src=>new Promise(r=>{if(!src)return r();const i=new Image();i.onload=i.onerror=r;i.src=src;setTimeout(r,8000)}),j.bg||'');await sleep(1200);
   const sel=j.kind==='book'?'#dawn .kbk-book':'#modal .dlg';const el=await p.$(sel);
   const bb=el&&await el.boundingBox();if(bb&&bb.width>50)await p.screenshot({path:`${OUT}/${j.id}.jpg`,type:'jpeg',quality:85,clip:{x:Math.max(0,bb.x-4),y:Math.max(0,bb.y-4),width:bb.width+8,height:bb.height+8}});else{console.log('no el',j.id,JSON.stringify(bb));await p.screenshot({path:`${OUT}/${j.id}.jpg`,type:'jpeg',quality:80})}
   if(j.kind!=='book')await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
  }
  if(errs.length)console.log(k,'errs',errs.slice(0,5));await ctx.close()}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
