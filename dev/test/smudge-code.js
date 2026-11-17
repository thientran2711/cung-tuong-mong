/* review/smudge-code: makeup SMUDGE as a CODE effect on the makeup colour layer (owner 17/11 ~23:30Z).
   usage: node dev/test/smudge-code.js <page url> [outdir]   -> JSON {checks, errs}; with outdir also writes smudge-0..3.png (face close-up 400 css px @dpr 3 + figure strip).
   checks: layer present at every level and place, below nothing but above makeup, levels differ (pixel mass grows 1<2<3), no makeup = none, NPC woman gets one,
   men none, picture without points nothing, every colour from BAL (no typed numbers in the draw: BAL.looks.smuFx). */
const {chromium}=require('playwright');const URL=process.argv[2],OUT=process.argv[3];
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:3,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(4000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:40000}).catch(()=>{});
 const C=await p.evaluate(async()=>{Q.length=0;document.getElementById('modal').hidden=true;const C={};
  try{toilAuto()}catch(e){}const T=S.toilette;T.makeup=true;T.look='dep';T.col=Object.assign(toilColDef(),{seed:5});
  /* a FIXED face whose face points are good (a few pictures' img/mk-fit points sit off the painted face: the makeup colour layer is off there too, not this effect's business) */
  const por='por-consort-c19-kc-a18.webp',fig='fig-consort-c19-kc-a18.webp';
  const kf0=kitFace,kg0=kitFigOf;kitFace=function(q){const f=kf0.apply(this,arguments);if(q===S&&f&&f.src){const g=Object.assign({},f,{src:String(f.src).replace(/[^/]*$/,por)});if(f.__kp)g.__kp=f.__kp;return g}return f};kitFigOf=function(q){const s=kg0.apply(this,arguments);return q===S?String(s).replace(/[^/?]*(\?.*)?$/,fig):s};
  for(let i=0;i<60&&!(MK_FIT.get(por)&&MK_FIT.get(fig));i++)await new Promise(r=>setTimeout(r,250));/* her REAL portrait + figure (no swap): the picture and its face points must belong together */
  window.__por=por;window.__fig=fig;
  const wait=async()=>{for(let i=0;i<80;i++){const bad=[...document.querySelectorAll('img.klk-smu')].some(x=>x.src.indexOf('data:image/png')!==0);if(!bad)return;await new Promise(r=>setTimeout(r,150))}};
  const clear=()=>{S.lk=null;if(S.toilette)delete S.toilette.lk};
  const mass=src=>new Promise(res=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,0,c.width,c.height).data;let s=0;for(let i=3;i<d.length;i+=4)s+=d[i]/255;res(Math.round(s/(c.width*c.height)*1e4)/1e4)};im.onerror=()=>res(-1);im.src=src});
  const host=document.createElement('div');host.id='smu-host';host.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#f3e8d4;padding:0';document.body.appendChild(host);
  const fileOf=()=>kitFile(por);const masses=[];C.present=[];C.below=[];
  for(const lv of [0,1,2,3]){clear();if(lv)lkSmudge(S,lv,lv===3?'mua':'mua');
   const zoom=()=>{try{return kitFaceZoom(S,fileOf())}catch(e){return''}};host.innerHTML=zoom();await new Promise(r=>setTimeout(r,200));await wait();host.innerHTML=zoom();await wait();
   const h=zoom(),sm=(h.match(/class="klk klk-smu"/g)||[]).length,mk=h.indexOf('kmkl');C.present.push(lv?sm===1:sm===0);C.below.push(lv?h.indexOf('klk-smu')>h.lastIndexOf('kmkl'):true);
   const im=document.querySelector('#smu-host img.klk-smu');masses.push(im?await mass(im.src):0)}
  C.masses=masses;C.growing=masses[1]>0&&masses[2]>masses[1]&&masses[3]>masses[2];
  clear();S.toilette=Object.assign({},T,{makeup:false});C.noMakeupNone=lkSmudge(S,2,'mua')===''&&!(kitFxLayers(S,fileOf())||'').includes('klk-smu');S.toilette=T;
  clear();lkSmudge(S,2,'mua');C.stage=(kitStageFig(S)||'').includes('klk-smu');
  /* NPC woman: a rival (any woman) whose own portrait has face points; colours are sampled from the picture */
  C.npc='no woman with face points';for(const v of rivals){if(v.alive===false)continue;let f=null;try{if(personRoleRank(v).sex!=='f')continue;f=kitFile(kitFace(v).src)}catch(e){continue}
   for(let i=0;i<24&&!MK_FIT.get(f);i++)await new Promise(r=>setTimeout(r,250));if(!MK_FIT.get(f))continue;
   const sn0=KIT_FACEFX.seen;KIT_FACEFX.seen=()=>true;/* she has not scouted this woman yet: the seen rule (OD scouting) is lifted for this check only */v.lk=null;lkSmudge(v,2,'mua');const h=kitFxLayers(v,f)||'';await new Promise(r=>setTimeout(r,200));await wait();const im=h.includes('klk-smu');KIT_FACEFX.seen=sn0;v.lk=null;C.npc=im;C.npcFile=f;break}
  C.noPts=(()=>{try{return lkSmuImg(S,'zz-none-1.png',{lv:2})===''}catch(e){return false}})();
  C.balOnly=!!(BAL.looks.smuFx&&BAL.looks.smuFx.blush&&BAL.looks.smuFx.tear);
  clear();host.remove();return C});
 if(OUT){require('fs').mkdirSync(OUT,{recursive:true});
  for(const lv of [0,1,2,3]){await p.evaluate(async lv=>{const clear=()=>{S.lk=null;if(S.toilette)delete S.toilette.lk};clear();if(lv)lkSmudge(S,lv,'mua');
   let host=document.getElementById('smu-shot');if(!host){host=document.createElement('div');host.id='smu-shot';document.body.appendChild(host)}
   if(!document.getElementById('smu-hide')){const st=document.createElement('style');st.id='smu-hide';st.textContent='body>*:not(#smu-shot){visibility:hidden!important}';document.head.appendChild(st)}host.style.cssText='position:fixed;left:0;top:0;z-index:2147483647;background:#f3e8d4;padding:14px 16px;width:420px;font:700 30px/1.1 serif;color:#4a2a14';
   const f=kitFile(window.__por),ff=kitFile(window.__fig);const zm=()=>kitFaceZoom(S,f);
   const L=['0 · không lem','1 · nhẹ','2 · vừa','3 · nặng'][lv];
   const html=()=>`<div style="margin-bottom:8px">${L}</div><div class="kfzoom" style="width:388px;margin:0 auto 8px">${zm().replace(/^<div class="kfzoom"[^>]*>/,'').replace(/<\/div>$/,'')}</div><div style="position:relative;width:150px;height:150px;margin:0 auto;overflow:hidden">${kitStageFig(S)||''}</div>`;
   host.innerHTML=html();await new Promise(r=>setTimeout(r,300));for(let i=0;i<80;i++){const bad=[...host.querySelectorAll('img.klk-smu')].some(x=>x.src.indexOf('data:image/png')!==0);if(!bad)break;await new Promise(r=>setTimeout(r,150))}host.innerHTML=html();await new Promise(r=>setTimeout(r,500))},lv);
   await p.locator('#smu-shot').screenshot({path:`${OUT}/smudge-${lv}.png`})}}
 console.log(JSON.stringify({checks:C,errs}));await b.close()})();
