/* review/slap-mg(-r2): tiered Tát (jslap + jface). usage: node dev/test/slap-mg.js <page url> <WxH[@scale]> <outdir> [N slaps for the tier spread, default 0]
   Prints JSON {sizes, checks:{name:true|false|value}, fails:[…], …}. Screenshots: <outdir>/slap-<WxH>-*.jpg (look at 5-marks: the three tiers on ONE known face).
   r2 (reviewer r1 item 5): the person is MET first (k61Meet, KIT §49.3), so her face is real, not the "Người lạ" silhouette; asserts kslap s1/s2/s3 + kswell on nặng only;
   checks the first-time demo, the idle glow, the tier row "Độ khó", the tier moving with her rank (mgTier), Gọn (no pops), the dodge odds per tier.
   Skill rates are measured by dev/measure/mg-bots.js (kinds tat,ne), not here. */
const {chromium}=require('playwright');const [,,URL,SZ0,OUT,NN]=process.argv;const [SZ,SC]=SZ0.split('@');const [W,H]=SZ.split('x').map(Number);const N=+(NN||0);
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(SC||1),serviceWorkers:'block',hasTouch:W<1100,isMobile:W<1100});
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 const R={sizes:SZ0,checks:{}};const C=R.checks;
 if(W<H&&W<500){R.rotateShot=true;await p.screenshot({path:`${OUT}/slap-${SZ}-0-rotate.jpg`,type:'jpeg',quality:60});R.errs=errs;console.log(JSON.stringify(R));await b.close();return}
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(5000);
 await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});
 for(let i=0;i<3;i++){await p.mouse.click(W/2,H/2);await p.waitForTimeout(700)}
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;window.together=()=>true;window.__rkS=6;const rk0=rkOf;window.rkOf=p=>p===S?window.__rkS:rk0(p);S.suc=90;S.duc=60;
  const v=liveRivals(true).sort((a,b)=>rkOf(a)-rkOf(b))[0];window.__v=v;v.rank=1;v.queen=false;k61Meet(v,'gặp mặt',3);render()});
 C.knownFace=await p.evaluate(()=>kitIsKnown(window.__v)&&isKnown61(window.__v)&&!/unknown-/.test(kitFace(window.__v).src||''));
 const idx=await p.evaluate(()=>rivals.indexOf(window.__v));
const endBtn=async()=>{await p.waitForSelector('#kg82ok',{timeout:12000,state:'attached'});const nb=await p.evaluate(()=>{const r=document.getElementById('kg82box-res')||document.getElementById('kg82');return r.querySelectorAll('button').length});if(nb!==1)C.oneEndButton=false;else if(C.oneEndButton!==false)C.oneEndButton=true;if(C.noAutoClose!==false){await p.waitForTimeout(1500);C.noAutoClose=await p.evaluate(()=>!!document.getElementById('kg82ok')&&!!document.getElementById('kg82'))}await p.evaluate(()=>document.getElementById('kg82ok').click());await p.waitForFunction(()=>!document.getElementById('kg82'),null,{timeout:12000})};
 const shot=async n=>{await p.screenshot({path:`${OUT}/slap-${SZ}-${n}.jpg`,type:'jpeg',quality:70})};
 const ov=()=>p.evaluate(()=>{const d=document.getElementById('kg82');const o=[];if(d&&d.scrollWidth>d.clientWidth+2)o.push('kg82-x');if(document.documentElement.scrollWidth>innerWidth+1)o.push('page-x');
  if(d)d.querySelectorAll('.kgbox *').forEach(e=>{if(e.children.length===0&&e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible')o.push('cut:'+e.textContent.slice(0,30))});return o});
 /* tier moves with her rank (mgTier occ "tat"): rank 0 / 3 / 6, art level 0 */
 R.tiers=await p.evaluate(()=>{const o={};for(const r of [0,3,6]){window.__rkS=r;const t=slapMg(false);o['rank'+r]={word:t.word,ease:t.ease}}window.__rkS=6;return o});
 C.tierRises=R.tiers.rank0.ease>R.tiers.rank6.ease;
 /* 1. intro: Độ khó row, left picture slot (painted file may be missing → slot removed by kitGameFrame onerror) */
 await p.evaluate(i=>{window.__rkS=1;window.__v.rank=0;used=0;doAct(i,'tat')},idx);await p.waitForSelector('#kg82go');await p.waitForTimeout(600);await shot('1-intro');
 R.introText=await p.evaluate(()=>document.getElementById('kg82').innerText.slice(0,500));C.tierRow=/Độ khó/i.test(R.introText);C.noPercent=!/%/.test(R.introText);
 R.pic=await p.evaluate(()=>{const i=document.querySelector('#kg82 .kgpic img');return i?{src:i.getAttribute('src').replace(/^.*img\//,'img/'),ok:i.complete&&i.naturalWidth>0}:'slot removed (file not painted yet)'});
 R.introOverflow=await ov();C.introNoOverflow=!R.introOverflow.length;
 /* 2. first play: demo card, then the bar; idle → glow */
 await p.click('#kg82go');await p.waitForSelector('#k91demo',{timeout:6000,state:'attached'}).catch(()=>{});await p.waitForTimeout(300);C.demoShown=await p.evaluate(()=>!!document.getElementById('k91demo')&&KG82.slapDemo===true);await shot('2-demo');
 C.demoBlocksTap=await p.evaluate(()=>{window.__slapTap&&window.__slapTap();return !KG82.slapEnd});
 await p.click('#k91demo');await p.waitForTimeout(400);await shot('3-bar');
 R.barOverflow=await ov();C.barNoOverflow=!R.barOverflow.length;
 C.idleGlow=await p.waitForFunction(()=>KG82.slapHint===true,null,{timeout:3000,polling:30}).then(()=>true,()=>false);await p.waitForTimeout(150);await shot('4-hint');
 await p.evaluate(()=>{window.__slapTap&&window.__slapTap()});C.popMode=await p.evaluate(()=>!!KG82.slapEnd&&KG82.slapEnd.still===false);
 await endBtn();
 C.demoOnce=await p.evaluate(()=>!!(S.mgSeen&&S.mgSeen.tat));await p.evaluate(()=>{window.__rkS=6;window.__v.rank=1});
 /* r3: the game waits on its end control (kit: the "Đã hiểu" button becomes the frame ✕, OD:L331) — never closes by itself (OD:L1261) */
 /* 5. marks: the three tiers on ONE known face (kitPortrait lg) */
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;SLAPG.busy=0});
 R.marks=await p.evaluate(async()=>{const v=window.__v,o=[];const strip=document.createElement('div');strip.id='slapstrip';strip.style.cssText='position:fixed;left:0;top:0;right:0;z-index:99999;background:#f4e6c8;display:flex;gap:8px;padding:8px;justify-content:center';
  for(const s of [0,1,2,3]){v.slap=s?{sev:s,until:wk()+5,by:'me',at:wk()}:null;const h=kitPortrait(v,{size:'lg'});const c=document.createElement('div');c.style.cssText='width:'+Math.min(180,innerWidth/4-12)+'px';c.innerHTML=h+'<div style="text-align:center;font:13px serif">'+['không','nhẹ','vừa','nặng'][s]+'</div>';strip.appendChild(c);
   o.push({s,cls:(h.match(/kslap s\d/g)||[]),swell:/kswell/.test(h),unknown:/unknown-/.test(h)})}
  document.body.appendChild(strip);v.slap=null;await new Promise(r=>setTimeout(r,2500));
  o.forEach((m,i)=>{const im=strip.children[i].querySelectorAll('img.kslap');m.loaded=[...im].map(x=>x.complete&&x.naturalWidth>0)});return o});
 C.marks=R.marks[0].cls.length===0&&[1,2,3].every(s=>R.marks[s].cls.includes('kslap s'+s))&&R.marks[3].swell&&!R.marks[2].swell&&!R.marks[1].swell&&R.marks.every(m=>!m.unknown)&&R.marks.slice(1).every(m=>m.loaded.length&&m.loaded.every(Boolean));
 await shot('5-marks');await p.evaluate(()=>{const e=document.getElementById('slapstrip');e&&e.remove()});
 /* 6. costs per tier from the real act */
 R.costs=await p.evaluate(()=>{const v=window.__v,o=[];for(const s of [1,2,3]){v.slap=null;SLAP.next=s;const d0=S.duc;const rel0=aff(v,S);const r=runAct(S,v,'tat');o.push({s,duc:S.duc-d0,wks:v.slap?v.slap.until-wk():0,sev:v.slap&&v.slap.sev,rel:aff(v,S)-rel0});v.slap=null}return o});
 C.costs=R.costs.every(c=>c.sev===c.s);
 /* 7. Gọn: no pops, the result is a still line */
 await p.evaluate(i=>{OPT.fxon=false;used=0;Q.length=0;document.getElementById('modal').hidden=true;window.__v.slap=null;SLAPG.busy=0;doAct(i,'tat')},idx);await p.waitForSelector('#kg82go');await p.click('#kg82go');await p.waitForFunction(()=>!!window.__slapTap,null,{timeout:6000}).catch(()=>{});await p.waitForTimeout(700);R.gonDemo=await p.evaluate(()=>!!document.getElementById('k91demo'));
 await p.evaluate(()=>{window.__slapTap&&window.__slapTap()});C.gonStill=await p.evaluate(()=>!!KG82.slapEnd&&KG82.slapEnd.still===true);await p.waitForTimeout(200);await shot('6-gon');
 await endBtn();await p.evaluate(()=>{OPT.fxon=true});
 /* 8. NPC dodge: card odds by tier, demo for "ne", game, result */
 await p.evaluate(()=>{used=0;Q.length=0;document.getElementById('modal').hidden=true;const v=window.__v;v.rank=6;window.__rkS=2;S.slap=null;runAct(v,S,'tat');showModal()});
 await p.waitForTimeout(500);await shot('7-dodge-card');R.dodgeCard=await p.evaluate(()=>document.getElementById('modal').innerText.slice(0,300));C.dodgeNoPercent=!/%/.test(R.dodgeCard);
 R.dodgeTier=await p.evaluate(()=>{const t=slapMg(true,window.__v);return{word:t.word,ease:t.ease,odds:BAL.slap.dodgeOdds[t.tier]}});
 await p.evaluate(()=>document.querySelector('#modal .opt[data-m="0"]').click());await p.waitForSelector('#kg82go',{timeout:30000,state:'attached'});await shot('8-dodge-intro');await p.click('#kg82go');await p.waitForTimeout(700);
 /* the demo card waits for the board paintings (kg82Preload, up to 2.5 s on the CDN): wait for it, never tap too early (mg-train-r1) */await p.waitForSelector('#k91demo',{timeout:6000,state:'attached'}).catch(()=>{});C.dodgeDemo=await p.evaluate(()=>!!document.getElementById('k91demo'));if(C.dodgeDemo)await p.click('#k91demo');await p.waitForTimeout(600);await shot('9-dodge-bar');
 await p.waitForSelector('#kg82ok',{timeout:12000,state:'attached'});await p.waitForTimeout(300);await shot('9b-dodge-end');await endBtn();await p.waitForTimeout(400);R.dodgeFig=await p.evaluate(()=>!!document.querySelector('#modal .kevfig, #modal .kevstage, #modal [class*=kevf]'));R.dodgeEnd={slap:await p.evaluate(()=>S.slap?S.slap.sev:0),modal:await p.evaluate(()=>document.getElementById('modal').innerText.slice(0,200))};await shot('10-dodge-result');
 R.npc=await p.evaluate(()=>{const v=window.__v,o={};for(const g of [1,2,3]){window.__rkS=1;v.rank=1+g;const c=[0,0,0,0];for(let i=0;i<2000;i++)c[slapNpcTier(v)]++;o['gap'+g]=c.slice(1).map(x=>Math.round(x/20))}return o});
 if(N){await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__rkS=6;window.__v.rank=1;window.__v.slap=null;S.slap=null});const c={skip:[0,0,0,0],tap:[0,0,0,0]};
  const play=async(mode)=>{await p.evaluate(i=>{used=0;Q.length=0;window.__v.slap=null;SLAPG.busy=0;doAct(i,'tat')},idx);await p.waitForSelector('#kg82go',{timeout:30000,state:'attached'});
   if(mode==='skip')await p.click('#kg82skip');else{await p.click('#kg82go');await p.waitForTimeout(Math.random()*3300);await p.evaluate(()=>{if(window.__slapTap)window.__slapTap()})}
   if(mode==='skip')await p.waitForFunction(()=>!document.getElementById('kg82'),null,{timeout:12000});else await endBtn();await p.waitForTimeout(150);return p.evaluate(()=>({sev:window.__v.slap?window.__v.slap.sev:0}))};
  for(let i=0;i<N;i++){const m=i%5===0?'skip':'tap';const r=await play(m);c[m][r.sev]++}R.spread=c;C.skipIsLight=c.skip[1]===c.skip.reduce((a,x)=>a+x,0)}
 R.errs=errs;C.noErrors=!errs.length;R.fails=Object.entries(C).filter(([k,v])=>v===false).map(([k])=>k);console.log(JSON.stringify(R));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
