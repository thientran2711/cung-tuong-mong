/* fixback-2111: AFTER shots for the owner's 21/11 marks (dev/handover/OWNER_MARKS_2111.md), Fold 755x1000 + iPad 1180x820.
   usage: CTM_ROOT=<built checkout> node dev/test/fixback-2111.js <label> <outdir> [mark,mark,...]
   Writes <outdir>/<label>/<mark>-<fold|ipad>-<n>.jpg + <outdir>/<label>/shots.json. Read-only: no game code change.
   Reuses the ui-tour-states helpers (copied into dev/test/fixback-2111/: lib.js serve-from-disk, seed.js rich life, sections.js clean/dismiss). */
const {chromium,openPage,gameFrame}=require('./fixback-2111/lib');const seed=require('./fixback-2111/seed');const SEC=require('./fixback-2111/sections');
const fs=require('fs');const [,,LABEL,OUT,ONLY]=process.argv;const DIR=`${OUT}/${LABEL}`;fs.mkdirSync(DIR,{recursive:true});
const DEVS=[['fold',755,1000],['ipad',1180,820]];
const sub=(t,s,ktsv)=>async f=>{await f.evaluate(([t,s,ktsv])=>{tab=t;render();if(s){const b=[...document.querySelectorAll('#panel .ksubb')].find(e=>e.dataset.ksub===s||e.dataset.kinvsub===s);if(b)b.click()}
  if(ktsv){const b=[...document.querySelectorAll('#panel [data-ktsv]')].find(e=>e.dataset.ktsv===ktsv||e.textContent.trim().startsWith(ktsv));if(b)b.click()}const p=document.getElementById('panel');if(p)p.scrollTop=0},[t,s,ktsv]);await f.waitForTimeout(600)};
const scrollDown=async f=>{await f.evaluate(`(()=>{const e=(${SEC.SCR})();if(e)e.scrollTop=e.scrollHeight})()`);await f.waitForTimeout(400)};
const click=(css,re)=>async f=>{await f.evaluate(([css,re])=>{const R=re?new RegExp(re):null;const A=[...document.querySelectorAll(css)].filter(e=>!R||R.test(e.textContent.trim()));const b=A.find(e=>e.getClientRects().length)||A[0];if(b)b.click()},[css,re]);await f.waitForTimeout(900)};
/* each mark: opt = seed options, steps = list of shots; a shot = list of actions run in order, then screenshot */
const M={
 5:{steps:[[sub('court','court')]]},
 6:{steps:[[sub('court','rv')]]},
 7:{steps:[[sub('court','staff')]]},
 8:{steps:[[sub('court','staff')]]},
 9:{steps:[[sub('court','staff')]]},
 10:{steps:[[sub('rel','rel')]]},
 11:{steps:[[sub('rel','rel')]]},
 12:{keep:1,steps:[[sub('rel','rel'),async f=>{const nm=await f.evaluate(()=>{const R=rivals.filter(v=>v!==S&&v.alive&&!v.out);const hl=v=>{try{return houseLine(v)}catch(e){return ''}};const v=R.find(v=>/Chủ vị/.test(hl(v)))||R.find(v=>/Cùng|Ở /.test(hl(v)))||R[0];return v.name});
   console.log('#12 target',nm);await f.evaluate(()=>document.querySelector('#panel [data-relslot=y]').click());await f.waitForTimeout(700);
   const ok=await f.evaluate(async nm=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const pop=()=>document.querySelector('#modal .krpop');if(!pop())return 'nopop';
    const tabs=[...pop().querySelectorAll('[data-ktsv]')].map(t=>t.dataset.ktsv);for(const t of [null,...tabs]){if(t){const b=pop()&&pop().querySelector(`[data-ktsv="${t}"]`);if(b)b.click();await sl(300)}
     for(let pg=0;pg<12;pg++){const th=pop()&&[...pop().querySelectorAll('[data-pg]')].find(e=>e.textContent.includes(nm.split(' ').pop())&&e.getClientRects().length);if(th){th.click();await sl(400);return 'picked'}
      const nx=pop()&&[...pop().querySelectorAll('button')].find(b=>/›|▶|Sau/.test(b.textContent)&&b.getClientRects().length&&!b.disabled);if(!nx)break;nx.click();await sl(250)}}return 'notfound'},nm);
   console.log('#12',ok);await f.evaluate(()=>{const m=document.getElementById('modal');if(m&&!m.hidden){const x=m.querySelector('[data-km-close]');if(x)x.click()}});await f.waitForTimeout(400);
   await f.evaluate(()=>{const b=document.querySelector('#panel [data-relswap]');if(b)b.click()});await f.waitForTimeout(600);await f.evaluate(()=>{const m=document.getElementById('modal');if(m&&!m.hidden){const x=m.querySelector('[data-km-close]');if(x)x.click()}});await f.waitForTimeout(600)}]]},
 17:{steps:[[sub('kid','kin')]]},
 18:{steps:[[sub('kid','kin'),scrollDown]]},
 20:{steps:[[sub('kid','qt')]]},
 21:{keep:1,steps:[[sub('inv','tui'),click('#panel [data-kinvi]'),scrollDown]]},
 23:{steps:[[sub('inv','viec'),async f=>{await f.evaluate(()=>{const e=[...document.querySelectorAll('#panel *')].find(e=>e.childElementCount===0&&/Nhờ thái giám|Soát đồ/.test(e.textContent)&&e.getClientRects().length);if(e)e.scrollIntoView({block:'center'});else{const d=document.getElementById('panel');d.scrollTop=d.scrollHeight}});await f.waitForTimeout(400)}]]},
 37:{keep:1,steps:[[click('button.menu'),click('button','^Chọn sổ')],[click('button.menu'),click('button','^Cùng hảo hữu')],[click('button.menu'),click('button','^Sổ luân hồi')]]},
 /* marks fixed only on a review branch («bản đang duyệt») */
 3:{steps:[[sub('court','court')]]},4:{steps:[[sub('court','rv')]]},40:{steps:[[sub('court','staff')]]},41:{steps:[[sub('court','rv')]]},
 25:{steps:[[sub('art')]]},13:{steps:[[sub('court','rv')]]},
 15:{opt:{nofac:1},steps:[[sub('rel','fac')]]},16:{opt:{nofac:1},steps:[[sub('rel','fac')]]},
 22:{opt:{nopet:1},steps:[[sub('inv','thu')]]},30:{opt:{noq72:1},steps:[[sub('story','q72')]]},
 26:{steps:[[sub('story','story')]]},27:{steps:[[sub('story','story')],[sub('story','story','Sắc phong')]]},28:{steps:[[sub('story','story')]]},29:{steps:[[sub('story','story')]]},
 38:{keep:1,steps:[[sub('act'),click('button.tok.fig[data-p="0"]')]]},
 39:{keep:1,steps:[[sub('act'),async f=>{await f.evaluate(()=>{const K=[...document.querySelectorAll('img.kemo')];const k=K.find(e=>e.dataset.kemop&&e.dataset.kemop!=='me'&&e.getClientRects().length)||K.find(e=>e.dataset.kemop!=='me')||K[0];if(k)k.click()});await f.waitForTimeout(900)}]]},
 46:{keep:1,steps:[[sub('act'),click('button.tok.fig[data-p="0"]'),async f=>{await f.evaluate(()=>{try{die('Bệnh nặng')}catch(e){console.log(e.message)}});await f.waitForTimeout(2500);await f.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>{e.hidden=true;e.classList.remove('on')})});await f.waitForTimeout(800)}]]},
 42:{keep:1,steps:[[sub('act'),click('button[aria-label="Lịch tháng"]')]]},
};
/* the flat 16-button bottom bar (Chí tôn … Sổ ghi as top tabs) sometimes shows instead of the 8 group tabs: retake */
const FLAT=()=>{const v=[...document.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.closest('#panel,#modal,.kmbox')&&/^(Ân oán|Phe|Nhà|Sổ ghi|Chí tôn|Cung nhân)$/.test(b.textContent.trim()));return v.length>=4};
const NOMOV=()=>{[...document.querySelectorAll('body *')].filter(e=>e.childElementCount===0&&e.textContent.trim()==='KẾT QUẢ'&&e.getClientRects().length&&!e.closest('#panel')).forEach(e=>{let a=e;while(a&&a!==document.body&&!/fixed|absolute/.test(getComputedStyle(a).position))a=a.parentElement;if(a&&a!==document.body)a.style.display='none'});document.querySelectorAll('.kmov,#dawn,#klife').forEach(e=>{if(e.getClientRects().length){e.hidden=true;e.classList.remove('on')}});document.querySelectorAll('.kroul,#kroul,#kroulw,#kmrew').forEach(e=>e.remove());
 [...document.querySelectorAll('button')].filter(b=>b.getClientRects().length&&/^(Đã hiểu|Tiếp theo)$/.test(b.textContent.trim())&&!b.closest('#panel')).forEach(b=>b.click())};
/* let late popups (birth movie, reward card, result toast) show, close them, wait for pictures; the menu marks keep their own panel */
async function quiet(p,f,keep){for(let r=0;r<3;r++){await f.waitForTimeout(900);if(!keep){await f.evaluate(NOMOV);await f.evaluate(SEC.DISMISS)}}
 await f.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent&&i.getBoundingClientRect().width>30).every(i=>i.complete),null,{timeout:12000}).catch(()=>{});await f.waitForTimeout(600)}
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1,ctm.local'}}:{});
 const keys=(ONLY?ONLY.split(','):Object.keys(M)).filter(k=>M[k]);const LIST=fs.existsSync(DIR+'/shots.json')?JSON.parse(fs.readFileSync(DIR+'/shots.json')):{};
 for(const k of keys){const m=M[k];LIST[k]={};
  for(const [dev,W,H] of DEVS)for(let tr=0;tr<4;tr++){const {ctx,p}=await openPage(b,W,H,{seed:20261121+tr*7});let flat=false;
   try{const f=await gameFrame(p);await p.waitForTimeout(2500);await f.evaluate(`(${seed.rich})(${JSON.stringify(Object.assign({org:'tt',rank:2},m.opt||{}))})`);
    for(let r=0;r<4;r++){await f.evaluate(SEC.DISMISS);await SEC.h.clean(f);await f.waitForTimeout(400)}
    LIST[k][dev]=[];let n=0;
    for(const st of m.steps){n++;await SEC.h.clean(f);await f.evaluate(SEC.DISMISS);await quiet(p,f);for(const a of st)await a(f);
     await quiet(p,f,m.keep);if(await f.evaluate(FLAT)){flat=true;break}const fn=`${DIR}/${k}-${dev}-${n}.jpg`;await p.screenshot({path:fn,type:'jpeg',quality:80});LIST[k][dev].push(fn)}
    if(p.errs.length)console.log(k,dev,'errs',JSON.stringify(p.errs.slice(0,2)))}catch(e){console.log('FAIL',k,dev,e.message.split('\n')[0])}
   await ctx.close();if(!flat)break;console.log('flat nav, retry',k,dev,tr)}
  console.log('mark',k,JSON.stringify(LIST[k]));fs.writeFileSync(DIR+'/shots.json',JSON.stringify(LIST,null,1))}
 await b.close()})();
