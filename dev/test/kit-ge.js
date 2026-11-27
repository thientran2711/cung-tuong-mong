/* kit-ge (review/kit-ge, KIT_REQUESTS K-GE-1/2/3) — node dev/test/kit-ge.js [dev/index.html] [outdir]
   K-GE-2 the «Thiên mệnh» plate in two tones (thiện gold-white / ác gold-crimson, same shape as the plain tier-8 plate; tone from sh or the ge_..._<n>t|a key)
   K-GE-3 a kitRows row whose LABEL is a title plate: the plate sits on its own line above the value (value column full width, no letter-per-line text) at 755x1000, 1180x820, 412x1058, 390x844
   K-GE-1 kitBranchMap: spine + rare + 4 ends + counts from the sample data AND from a real geMap(branch); her chip on the chapter she is in; solid/dotted rail; end states; tap = kit card;
          no horizontal overflow; 4 ends in one row on html.kv2, 2 columns on a phone / Fold. Shots go to <outdir> (outside git). */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad'],[412,1058,'cover'],[390,844,'phone']]){
  const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:OUT?2:1});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}});
  const r=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};
   const host=document.createElement('div');host.id='kgeh';host.style.cssText='position:fixed;inset:0;z-index:2147483647;overflow:auto;background:var(--bg,#f5ecdc);padding:10px';document.body.appendChild(host);
   const plT=kitTitlePlate({id:"ge_x_1t",name:"Phượng triều",tier:8},{id:false}),plA=kitTitlePlate({id:"x",name:"Phượng triều",tier:8,sh:"a"},{id:false}),plN=kitTitlePlate({id:"s8",name:"Phượng triều",tier:8},{id:false});
   host.innerHTML=`<div id="kgp" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px">${plT}${plA}${plN}</div><div class="kpb" id="kgr">${kitRows([[plT,["Đạt được khi nàng ngồi vững ngôi Hoàng hậu và giữ trọn phận mình"],"t"],["Trên đầu","chưa mang danh hiệu nào"]])}</div><div id="kgm"></div>`;
   const pl=[...host.querySelectorAll('#kgp .kdh')];const cs=pl.map(e=>({cls:e.className,bg:getComputedStyle(e).backgroundImage,col:getComputedStyle(e).color,w:Math.round(e.getBoundingClientRect().width),h:Math.round(e.getBoundingClientRect().height)}));
   o.tone=cs;
   const row=host.querySelector('#kgr .kr'),lab=row.querySelector('.krl'),val=row.querySelector('.krv'),lr=lab.getBoundingClientRect(),vr=val.getBoundingClientRect(),hr=host.querySelector('#kgr').getBoundingClientRect();
   o.row={labBottom:Math.round(lr.bottom),valTop:Math.round(vr.top),valW:Math.round(vr.width),boxW:Math.round(hr.width),valH:Math.round(vr.height),fs:parseFloat(getComputedStyle(val).fontSize)};
   kitBranchMapMount(host.querySelector('#kgm'),window.KBM_SAMPLE);await sleep(100);
   const m=host.querySelector('.kbm');o.kbm={nodes:m.querySelectorAll('.kbm-n').length,here:m.querySelectorAll('.kbm-n.here .kbm-me').length,past:m.querySelectorAll('.kbm-n.past').length,ahead:m.querySelectorAll('.kbm-n.ahead').length,rare:m.querySelectorAll('.kbm-r').length,ends:m.querySelectorAll('.kbm-e').length,
    states:[...m.querySelectorAll('.kbm-e')].map(e=>e.className.replace('kbm-e ','').replace(' unk','')),words:[...m.querySelectorAll('.kbm-es')].map(e=>e.textContent),plates:m.querySelectorAll('.kbm-sl .kdh').length,qslots:m.querySelectorAll('.kbm-slq').length,count:m.querySelector('.kbm-c').textContent,
    railPast:getComputedStyle(m.querySelector('.kbm-n.past'),'::before').borderLeftStyle,railAhead:getComputedStyle(m.querySelector('.kbm-n.ahead'),'::before').borderLeftStyle,
    cols:getComputedStyle(m.querySelector('.kbm-es4')).gridTemplateColumns.split(' ').length,ow:document.documentElement.scrollWidth-innerWidth,hostOw:host.scrollWidth-host.clientWidth,bodyTxt:m.textContent};
   /* tap: an open end with data -> kit card; a «?» end -> «Chưa ai biết…» */
   m.querySelector('.kbm-e[data-kbm="e:0"]').click();await sleep(400);const md=document.getElementById('modal');o.card1=md&&!md.hidden?md.innerText:'';
   try{kitModalClose()}catch(e){}await sleep(200);
   m.querySelector('.kbm-e[data-kbm="e:1"]').click();await sleep(400);o.card2=document.getElementById('modal')&&!document.getElementById('modal').hidden?document.getElementById('modal').innerText:'';
   try{kitModalClose()}catch(e){}
   /* the real data API */
   try{const k=Object.keys(GE_CAT)[0];const gm=geMap(k);o.real={k,ok:!!gm,spine:gm&&gm.spine.length,ends:gm&&gm.ends.length};const h2=document.createElement('div');host.appendChild(h2);kitBranchMapMount(h2,gm);o.real.nodes=h2.querySelectorAll('.kbm-n').length;o.real.ends2=h2.querySelectorAll('.kbm-e').length;o.real.txt=h2.querySelector('.kbm-c').textContent}catch(e){o.real={err:String(e.message||e)}}
   try{const bk=Object.keys(GE_CAT)[0];S.dh=S.dh||{};['t','a'].forEach(x=>{S.dh['ge_'+bk+'_1'+x]={i:0}});const ot=dhObj(S,'ge_'+bk+'_1t'),oa=dhObj(S,'ge_'+bk+'_1a');o.engine={t:!!ot&&/kdh-shT/.test(kitTitlePlate(ot)),a:!!oa&&/kdh-shA/.test(kitTitlePlate(oa)),tier:ot&&ot.tier}}catch(e){o.engine={err:String(e.message||e)}}
   return o});
  const t=r.tone;ok(t.length===3&&t[0].cls.includes('kdh-shT')&&t[1].cls.includes('kdh-shA')&&!/kdh-sh[TA]/.test(t[2].cls),`${tag} K-GE-2 tones by key suffix / sh / plain`,t.map(x=>x.cls));
  ok(t[0].bg!==t[1].bg&&t[0].bg!==t[2].bg&&t[1].bg!==t[2].bg,`${tag} K-GE-2 three distinct looks`);
  ok(Math.abs(t[0].h-t[2].h)<=1&&Math.abs(t[1].h-t[2].h)<=1,`${tag} K-GE-2 same shape/height as the plain plate`,t.map(x=>x.h));
  ok(r.row.valTop>=r.row.labBottom-1&&r.row.valW>=r.row.boxW*.9,`${tag} K-GE-3 plate on its own line, value full width`,r.row);
  ok(r.engine&&r.engine.t&&r.engine.a,`${tag} K-GE-2 real engine titles (dhObj ge_…t / ge_…a) get their tone`,r.engine);
  const k=r.kbm;ok(k.nodes===13&&k.here===1&&k.past===4&&k.ahead===8&&k.rare===2&&k.ends===4,`${tag} K-GE-1 spine 13 · here 1 · past/ahead · rare 2 · ends 4`,[k.nodes,k.here,k.past,k.ahead,k.rare,k.ends]);
  ok(k.railPast==='solid'&&k.railAhead==='dotted',`${tag} K-GE-1 rail solid behind / dotted ahead`,[k.railPast,k.railAhead]);
  ok(k.states.join()==='open,crack,shut,open'&&/Còn mở/.test(k.words[0])&&/Chỉ còn đường thua/.test(k.words[1])&&/Đã khép · chương 8/.test(k.words[2]),`${tag} K-GE-1 end states + words`,k.words);
  ok(k.plates===1&&k.qslots===7,`${tag} K-GE-1 title slots: earned plate / «?»`,[k.plates,k.qslots]);
  ok(/Đại kết cục 1\/4/.test(k.count)&&!/%/.test(k.bodyTxt),`${tag} K-GE-1 counts, no %`);
  ok(k.cols===(W>=1100?4:2),`${tag} K-GE-1 end columns ${W>=1100?4:2}`,k.cols);
  ok(k.ow<=1&&k.hostOw<=1,`${tag} no horizontal overflow`,[k.ow,k.hostOw]);
  ok(/Ở lại, giữ trọn phận mình/.test(r.card1)&&/Lấy ân mà đối đãi/.test(r.card1)&&/kiếp 2/.test(r.card1)&&/Còn mở/.test(r.card1),`${tag} K-GE-1 tap → kit card (pair, condition words, lives)`,r.card1.slice(0,160));
  ok(/Chưa ai biết ngả này dẫn tới đâu/.test(r.card2),`${tag} K-GE-1 tap «?» → «Chưa ai biết…»`);
  ok(r.real&&r.real.ok&&r.real.nodes===r.real.spine&&r.real.ends2===r.real.ends,`${tag} K-GE-1 real geMap data renders`,r.real);
  if(OUT){fs.mkdirSync(OUT,{recursive:true});await p.screenshot({path:`${OUT}/kit-ge-${tag}.png`})}
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,3));
  await p.close()}
 console.log(res.every(x=>x)?'KIT-GE PASS':'KIT-GE FAIL '+res.filter(x=>!x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})();
