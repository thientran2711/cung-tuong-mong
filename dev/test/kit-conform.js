/* KIT CONFORMANCE SCAN (owner 16/11 "Má nó, kit chung đâu", review/kit-sweep; KIT §8.2 frame templates).
   Opens every dialog kind (the panel-size case list + place cards + chapter detail + every PEND event dialog) and checks that each one
   is built from ONE of the approved frame templates, nothing composed by hand:
     T1 PANEL (§8)            .dlg.kpanel > .kph + #mb > .kpb > [.kpsubj] + .kpmain (kit blocks) + .opts.kpopts
     T2 EVENT FRAME (§8.2)    T1 with ONE picture left (.kpsubj.kpiart / .kpev) and kit rows right; no band on top
     T3 PERSON EVENT (§32.7/§50) T1 with the figure column (.kpsubj.kes) [+ ONE banner .kdlgart.kesband/.kdpban in the right column]
     T4 PERSON INFO (§8)      T1 with a 3:4 portrait (.kpsubj > .pfwrap/.pcp) [+ ONE headArt band: look-up panels §28.19b]
     T5 IDENTITY (§28.11)     .kpb.kpid
   It also checks the stage + tab bar for loose floating chips (anything position:fixed over #tabs that is not a kit layer).
   Verdict per case: CONFORMS · MIXED (template frame, but hand-made blocks inside: .kpraw with non-kit classes, inline grid/flex/absolute
   layouts, a second picture) · CUSTOM (not a kit panel at all). Exit 1 when any case is MIXED / CUSTOM, or a float sits over the tabs.
   usage: node dev/test/kit-conform.js <url> <out.json> [WxH,...] [maxPend]   (default 755x1000; maxPend 0 = all) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES,MAXP]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
/* kit block classes allowed inside .kpmain (KIT §9 / §51 / §46 / §49 / §52 / §58 / §70 / §72) */
const KIT_BLOCK=/^(kfacts|kfact|kb|kpkb|kpsec|kpst|kpnote|ktiers|kchips|kchip|kpfaces|faces|kpl|kmlist|krel3|krelt|kreltab|kitrows|kidet|kchecks|kchk|kpidn|kpidt|kstgrid|kpick|kmc|kmc-[a-z]+|kinv[a-z]*|kshg|kshop|kgift[a-z]*|kip[a-z]*|kev[a-z]*|kintel|kevid|kthreat|kwhy|kodm|ktile[s]?|kexam[a-z]*|kpromo[a-z]*|kflip[a-z]*|ksub|kpkf|kbullets|kpicks|kslot[a-z]*|ksl[a-z]*|kpets?|kpet[a-z]*)$/;
const VPS=(SIZES||'755x1000').split(',');
(async()=>{const b=await chromium.launch();const R={};let bad=0;
 for(const sz of VPS){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}tab='act';render()});await sleep(1200);
  const res={};
  const check=async(name)=>{await sleep(450);const r=await p.evaluate(KB=>{const KIT_BLOCK=new RegExp(KB);const kf=document.getElementById('kidfl');const M=kf||document.getElementById('modal');if(!M||(!kf&&M.hidden))return null;const d=M.querySelector('.dlg');if(!d)return{v:'CUSTOM',why:['no .dlg']};
    const why=[];if(!d.classList.contains('kpanel'))return{v:/pcm/.test(M.className+d.className)?'EXEMPT':'CUSTOM',why:['not .kpanel'],cls:d.className};
    if(!d.querySelector(':scope > .kph'))why.push('no kit header .kph');
    const mb=d.querySelector('#mb')||d.querySelector(':scope > .body');if(!mb)return{v:'CUSTOM',why:['no #mb']};
    const kids=[...mb.children].filter(e=>e.getClientRects().length);
    kids.forEach(e=>{if(e.matches('.kpb,.opts,.kpscopts,.kdlgart.kesband,.kdlgart.kdpban,.kpnote,.kpsec'))return;if(e.matches('.kdlgart'))return;why.push('#mb child '+(e.className||e.tagName))});
    const body=mb.querySelector(':scope > .kpb');let tpl='T1';
    if(body){if(body.classList.contains('kpid'))tpl='T5';else{const sj=body.querySelector(':scope > .kpsubj');if(sj){if(sj.matches('.kes'))tpl='T3';else if(sj.matches('.kpiart,.kpev'))tpl='T2';else tpl='T4'}}}
    /* pictures outside the options: T2 = 1, T3 = figure + ≤ 1 banner, T4 = portrait + ≤ 1 band, T1 = ≤ 1 band */
    const pics=[...mb.querySelectorAll('.ksart')].filter(e=>!e.closest('.opts,.kpscopts,.kaart,.kpkgrid,.kshg,.kinv,.kip,.kmc,.kmlist,.kfacts,.kpl')&&e.getClientRects().length);
    const bands=mb.querySelectorAll(':scope > .kdlgart').length;
    const seal0=(d.querySelector('.kpseal')||{}).textContent||'';if(tpl==='T3'&&/^(ĐIỀU|LUẬT)$/.test(seal0.trim()))why.push('loose figure column on an info panel');
    if(tpl==='T2'&&pics.length>1)why.push('two pictures: band + left picture');
    if(tpl==='T1'&&bands&&body&&body.querySelector(':scope > .kpsubj'))why.push('band + subject picture');
    if(tpl!=='T5'&&tpl!=='T3'&&tpl!=='T4'&&bands>1)why.push('two bands');
    /* hand-made blocks inside the main column */
    const main=body&&body.querySelector(':scope > .kpmain');
    if(main){[...main.children].forEach(e=>{const cl=[...e.classList].filter(c=>c!=='kpraw');const raw=e.classList.contains('kpraw');
      if(raw&&!cl.some(c=>KIT_BLOCK.test(c)))why.push('hand-made block .'+(cl.join('.')||e.tagName.toLowerCase()))});
     main.querySelectorAll('[style]').forEach(e=>{const s=e.getAttribute('style')||'';if(/display\s*:\s*(grid|flex)|position\s*:\s*absolute|grid-template/.test(s))why.push('inline layout on .'+(e.className||e.tagName))})}
    return{v:why.length?(d.classList.contains('kpanel')?'MIXED':'CUSTOM'):'CONFORMS',tpl,why:[...new Set(why)].slice(0,6),seal:(d.querySelector('.kpseal')||{}).textContent||'',title:((d.querySelector('.kptitle')||{}).textContent||'').slice(0,50)}},KIT_BLOCK.source);
   res[name]=r||{v:'MISSING'};
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;try{kitItemCardClose&&kitItemCardClose()}catch(e){}})};
  const run=async(name,fn,arg)=>{try{await p.evaluate(fn,arg)}catch(e){errs.push(name+': '+String(e.message).slice(0,120))}await check(name)};
  /* the panel family (panel-size cases) */
  await run('info',()=>kitModal({kind:"info",title:"Điều ngắn",facts:["Một câu ngắn."]}));
  await run('rule',()=>kitModal({kind:"rule",title:"Luật nhỏ",sections:[{h:"Thang",tiers:[{k:"1–3",n:"nhỏ",d:"một",c:"g"}]}]}));
  await run('news',()=>{Q.push({t:"Tin trong cung",h:"<p>Một tin ngắn.</p>"});showModal()});
  await run('notice',()=>{Q.push({t:"Một báo",h:"<p>Ngắn.</p>"});showModal()});
  await run('result',()=>{Q.push({t:"Kết quả: thử",h:"<p>Thành công.</p>"});showModal()});
  await run('night',()=>{Q.push({t:"Đêm",cls:"night",h:"<p>Đêm xuống.</p>"});showModal()});
  await run('choice',()=>{Q.push({t:"Việc khó",h:"<p>Chọn.</p>",opts:[{n:"Một",fx:{}},{n:"Hai",fx:{}}]});showModal()});
  await run('headart-notice',()=>{Q.push({t:"Hỏa hoạn",h:"<p>Lửa bén.</p>",headArt:{src:"img/ev-hoa-hoan.webp",label:"Hỏa hoạn"}});showModal()});
  await run('headart-choice',()=>{Q.push({t:"Điềm lạ quanh cung",h:"<p>Có điềm lạ.</p>",headArt:{src:"img/ev-chuyen-la.webp",label:"Điềm lạ"},opts:[{n:"Xem",fx:{}},{n:"Bỏ qua",fx:{}}]});showModal()});
  await run('intel',()=>kitIntelPanel(liveRivals(true)[0]));
  await run('evidence',()=>kitEvidencePanel(liveRivals(true)[0]));
  await run('item',()=>kinvOpen(kinvItems()[0]));
  await run('item-card',()=>{const e=S.inv.find(x=>x&&IT[x.k]);kitItemCard({e})});
  await p.evaluate(()=>{try{kitItemCardClose()}catch(e){}});
  await run('calendar',()=>kitMonthCalOpen());
  await run('goal-detail',()=>{if(typeof kitGoalDetail==="function")kitGoalDetail()});
  /* place cards (KIT 32.8 → §8.2): every place on the map */
  const places=await p.evaluate(()=>places().map(x=>x.k).filter(k=>k!=="home"));
  for(const k of places.slice(0,+(process.env.KC_PLACES||40)))await run('place:'+k,k=>{document.querySelectorAll(".kroul").forEach(e=>e.remove());S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.out=0;S.confined=0;window.__walkSpill=null;S.wx=S.wx||{};tab="go";S.buoi=0;used=0;Q.length=0;render();j77Tap(k)},k);
  await run('place:etq',()=>{document.querySelectorAll(".kroul").forEach(e=>e.remove());S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.out=0;S.confined=0;window.__walkSpill=null;S.wx=S.wx||{};tab="go";S.buoi=0;used=0;S.wx=S.wx||{};S.wx.f=0;Q.length=0;let pl=places().map(x=>x.k).find(x=>{try{return accEtq(S,x)&&accessOf(S,x).ok}catch(e){return false}});
   if(!pl){const R=liveRivals(false).filter(v=>v.alive&&!v.out&&rkOf(v)>rkOf(S)+1);const h=R[0];if(h){pl=palaceOf(h);S.where[h.id]=pl}}render();j77Tap(pl)});
  await run('place:night',()=>{document.querySelectorAll(".kroul").forEach(e=>e.remove());S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.out=0;S.confined=0;window.__walkSpill=null;S.wx=S.wx||{};tab="go";S.buoi=2;used=3;S.wx.f=1;Q.length=0;render();j77Tap('r5')});
  /* every PEND event dialog */
  const ids=await p.evaluate(()=>Object.keys(PEND));let n=0;
  for(const id of ids){if(+MAXP&&n>=+MAXP)break;
   const ok=await p.evaluate(id=>{const v=liveRivals(true)[0];const iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");for(const pp of [{v:v&&v.id,ix:iix},{ix:iix},{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;try{Q.length=0;pushDil(mkP(id,pp),id);showModal();if(Q.length)return true}catch(e){}}return false},id);
   if(ok){n++;await check('PEND:'+id)}}
  /* loose floats over the tab bar (owner shot faa95830: co-op wait chips) */
  const floats=await p.evaluate(()=>{const t=document.getElementById('tabs');if(!t)return[];const T=t.getBoundingClientRect();
   return [...document.body.querySelectorAll('*')].filter(e=>{const cs=getComputedStyle(e);if(cs.position!=='fixed'||cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<.05||cs.pointerEvents==='none'&&!e.textContent.trim())return false;if(e.matches('#modal,#modal *,#tabs,#tabs *,.modal,.kpscene,#rtoast,#kpop,#ov,.kbd,.kline,#kline,header.hud,header.hud *'))return false;
    const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&r.left<T.right&&r.right>T.left&&r.top<T.bottom&&r.bottom>T.top}).map(e=>e.id||e.className)});
  const retired=await p.evaluate(async()=>{const h=await (await fetch(location.href)).text();return ['EL.id="kctm"','el.id="kgoalst"'].filter(x=>h.includes(x))});
  retired.forEach(x=>floats.push('retired float in code: '+x));
  const cnt={};Object.values(res).forEach(r=>cnt[r.v]=(cnt[r.v]||0)+1);
  R[sz]={count:cnt,floats,res,errs};if((cnt.MIXED||0)+(cnt.CUSTOM||0)+floats.length)bad++;
  console.log(sz,JSON.stringify(cnt),'floats:',floats.join(',')||'none');
  Object.entries(res).filter(([k,r])=>/MIXED|CUSTOM/.test(r.v)).forEach(([k,r])=>console.log('  ',r.v,k,r.tpl||'',r.why.join(' | ')));
  await ctx.close()}
 fs.writeFileSync(OUT,JSON.stringify(R,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
