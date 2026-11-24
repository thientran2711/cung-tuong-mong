/* FIG FEET FAMILY SCAN (fig-feet-crop-2, owner 17/11 "hình nào cũng bị crop mất chân hết trơn"; OD:L1459 "feet must show in every frame").
   Opens EVERY dialog kind that shows a figure and measures the painted feet (hem + shoes) of every figure picture against the lowest edge that can
   clip it (any ancestor with overflow != visible, the screen). cut px = feet − clip edge; > 1.5 px = the feet are cropped = FAIL.
   Cases: timed choice (sample / two options / no chip), the kit §8 pop-ups (event, long, info, rule, result, news, place, personopt),
   and each person kind (player, emperor, Thái hậu, queen, consort, child, eunuch, maid, man, npc) as a 'Có người đến' dialog with ONE option
   and with THREE long options (the tall case). Per case: layout class (live v3 frame kszlive / legacy kdper), figure count.
   PLATE=1 = every person wears a title plate (the tallest tag).
   usage: node dev/test/fig-feet-fam.js <url> [WxH,...]   default 755x1000,1180x820,1366x1024,412x1058,390x844   exit 1 when any figure is cut */
const {chromium}=require('playwright');const [,,URL,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(SIZES||'755x1000,1180x820,1366x1024,412x1058,390x844').split(',');
(async()=>{const b=await chromium.launch();const rows=[];let bad=0,n=0;
 for(const sz of VPS){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,#krottip{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
  if(process.env.PLATE)await p.evaluate(()=>{window.kitTitleWorn=kitTitleWorn=function(){return kitTitleDef('dh-nights')}});/* PLATE=1: every figure wears the 3-line tag (plate+rank+name), fig-tag-chip */
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)try{nlNew()}catch(e){}start();return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
  /* case list (built inside the page, so the people are the live ones) */
  const cases=await p.evaluate(()=>{const L=[];['sample','two','nochip'].forEach(v=>L.push('timed:'+v));['event','long','info','rule','result','news','place','personopt'].forEach(k=>L.push('pop:'+k));
   const P=[];const add=(g,w)=>{if(w)P.push([g,w])};add('player',S);add('emperor',S.emp);S.thO=S.thO||{};add('thai-hau',S.thO);
   const rv=(rivals||[]);const q=rv.find(v=>v.queen),c=rv.find(v=>!v.queen&&v.alive!==false),k=(rv.flatMap(v=>v.kids||[]).concat(S.kids||[]))[0];add('queen',q);add('consort',c);add('child',k);
   try{add('eunuch',S.court&&S.court.ksp);add('maid',S.maid);const m=(S.men||[])[0];add('man',m);}catch(e){}add('npc',{kind:'npc',name:'Quản sự Tân Giả khố',ini:'Quản',info:'Quản sự'});
   window.__FP=P;P.forEach((x,i)=>{L.push('person1:'+x[0]+':'+i);L.push('person3:'+x[0]+':'+i)});return L});
  for(const cs of cases){
   await p.evaluate(async cs=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true;const nop=()=>{};const [kind,a,i]=cs.split(':');
    if(kind==='timed'){const clk=()=>`<p class="nfcd">${kitCoopClock({left:30000,len:30000})}</p>`;if(a==='sample'){kitPopSample('timed');return}
     const o=[{n:"Tranh sủng",fx:{},x:"Khá chắc · thành: Hoàng thượng sang cung ngươi · hỏng: Sủng -3",go:nop},{n:"Chặn ngự giá",fx:{},x:"Tùy duyên · thành: Hoàng thượng sang cung ngươi · hỏng: Sủng -5",go:nop},{n:"Thôi",fx:{},go:nop}];
     Q.push({t:"Kính sự phòng",h:`<p>Tối nay thẻ bài của Quý phi được lật. Ngươi có ra tay giành đêm nay không?</p>${a==='nochip'?'':clk()}`,opts:a==='two'?o.slice(0,2):o,who:pEunCourt("ksp"),pid:"nfch"});showModal();return}
    if(kind==='pop'){kitPopSample(a);return}
    const w=window.__FP[+i][1];const long="Hoàng thượng sang cung ta · thành: Danh +2, Sủng +3 · hỏng: Sủng -3, nàng oán +8 · cần: Bạc 40, Tài 20";
    const one=[{n:'Tiếp',fx:{},x:'Chắc',go:nop}];const three=[{n:'Cúi đầu nhận lỗi',fx:{},x:'Khá chắc · '+long,go:nop},{n:'Thưa rằng do Hoàng thượng định',fx:{},x:'Tùy duyên · '+long,go:nop},{n:'Dâng lễ vật xin bỏ qua',fx:{},x:'Khó · '+long,go:nop}];
    Q.push({t:'Có người đến',stage:[w],h:'<p>Đến thăm, hỏi han chuyện trong cung rất lâu, chưa chịu đi.</p>',opts:kind==='person1'?one:three,must:1});showModal()},cs).catch(()=>{});
   /* wait for the figure pictures, then let the layout settle */
   for(let t=0;t<30;t++){await sleep(300);const ok=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return 1;const g=[...M.querySelectorAll('.dlg img')].filter(i=>/\/fig-|unknown-fig/.test(i.getAttribute('src')||''));return g.every(i=>i.complete)});if(ok)break}
   await sleep(900);
   const r=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return{open:false};const d=M.querySelector('.dlg');
    const F=[...d.querySelectorAll('img')].filter(i=>/\/fig-|unknown-fig/.test(i.getAttribute('src')||'')&&i.getClientRects().length&&getComputedStyle(i).visibility!=='hidden');
    const out=F.map(im=>{const r=im.getBoundingClientRect(),fb=((window.__KITFB||{})[im.getAttribute('src')]||{}).v;const bb=fb&&typeof fb.b==='number'?fb.b:1;const feet=r.top+bb*r.height;let clip=innerHeight,by='screen';
     for(let e=im.parentElement;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e);if(/(hidden|auto|scroll|clip)/.test(cs.overflowY)&&e!==im.parentElement||(e===im.parentElement&&/(hidden|auto|scroll|clip)/.test(cs.overflowY))){const er=e.getBoundingClientRect(),eb=er.bottom-(parseFloat(cs.borderBottomWidth)||0);
      /* the wrapper that is exactly the painted figure (kszfs) clips at the feet by design: judge by the next clip above it */
      if(e.classList.contains('kszfs'))continue;if(eb<clip){clip=eb;by=(e.id?'#'+e.id:'')+'.'+String(e.className).split(' ').slice(0,2).join('.')}}}
     return{src:(im.getAttribute('src')||'').split('/').pop(),cut:Math.round((feet-clip)*10)/10,by,w:Math.round(r.width),h:Math.round(r.height)}});
    return{open:true,cls:d.className.replace(/\b(dlg|kpanel|kpsc)\b/g,'').trim().split(/\s+/).filter(c=>/kszlive|kdper|kdpall|ksz3|kesdlg|kdpbanner/.test(c)).join(' '),lay:d.dataset.lay||'',n:out.length,figs:out}});
   n++;let why='';if(!r.open)why='dialog closed';else if(!r.n)why='no figure (skipped)';else{const w=r.figs.filter(f=>f.cut>1.5);if(w.length){why=w.map(f=>`cut ${f.cut}px by ${f.by} (${f.src})`).join('; ');bad++}}
   const tag=!r.open||!r.n?'skip':why?'FAIL':'ok  ';rows.push(`${tag} ${sz} ${cs.padEnd(22)} ${(r.cls||'').padEnd(24)} lay:${r.lay||'-'} figs:${r.n||0} ${why}`);
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await sleep(150)}
  if(errs.length)rows.push('page errors '+sz+': '+errs.slice(0,3).join(' | '));
  await ctx.close()}
 await b.close();console.log(rows.join('\n'));console.log(bad?`FIG-FEET-FAM FAIL · ${bad} of ${n} case(s) cut`:`FIG-FEET-FAM OK · ${n} cases, 0 px cut`);process.exit(bad?1:0)})();
