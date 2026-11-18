/* review/smudge-code r16 (main s42, owner 18/11 02:35Z): REAL stage screenshots + avatar-frame makeup check on a built page.
   usage: node dev/test/stage4.js <url> <outdir>  (Fold 755x1000@2, herself on the Hành sự stage)
   1) stage4-<dep|tuyet>-<step0|stage>.png : whole viewport; step0 = toilLodStep forced to 0 (the look as in the mirror), stage = the live boosted step.
   2) avatar check (JSON on stdout): herself with makeup on / off, every avatar-class <img> (span.md, .pcp, .kmini, .kfc, img.kpor): src kind, width, makeup layers over it,
      and whether the rendered pixels change with makeup. */
const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;const fs=require('fs');fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(60000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(4000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:40000}).catch(()=>{});
 const clean=()=>p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const M=document.getElementById('modal');if(M){M.hidden=true;M.innerHTML=''}document.querySelectorAll('.kmov,.kroul,.kpscene,#kload').forEach(e=>e.remove())});
 const setLook=(look,on)=>p.evaluate(([look,on])=>{const c=toilColFix(null);c.seed=5;S.toilette={day:toilWk()*10,wk:toilWk(),score:look==='tuyet'?90:70,makeup:!!on,style:'fit',dv:'chinh',F:0,occ:[],look,col:c};for(const q in TOIL_MKC){Reflect.deleteProperty(TOIL_MKC,q)}render()},[look,on]);
 const figOk=()=>p.evaluate(()=>{const f=document.querySelector('main.stage img.kfxon');if(!f)return false;const r=f.getBoundingClientRect();return r.width>100&&f.complete&&r.bottom>0});
 const gotoStage=async()=>{for(let t=0;t<4;t++){await clean();await p.waitForTimeout(1500);if(await figOk())return true;await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()==='Hành sự'&&e.offsetParent);if(b)b.click()});await p.waitForTimeout(2500)}return false};
 await gotoStage();
 const out={errs,stage:{},avatars:[]};
 /* 1) stage shots */
 for(const look of ['dep','tuyet'])for(const mode of ['step0','stage']){
  await setLook(look,true);out.nav=(out.nav||[]).concat(await gotoStage());
  await p.evaluate(m=>{if(m==='step0'){if(!window.__tls)window.__tls=toilLodStep;toilLodStep=()=>0}else if(window.__tls)toilLodStep=window.__tls},mode);
  for(let k=0;k<6;k++){await p.evaluate(()=>{try{toilLodPass()}catch(e){}});await p.waitForTimeout(500)}
  for(let i=0;i<60;i++){const ok=await p.evaluate(()=>{const l=[...document.querySelectorAll('main.stage img.kmkc')];return l.length>0&&l.every(x=>x.src.indexOf('data:image')===0&&x.complete)});if(ok)break;await p.waitForTimeout(250)}
  await p.waitForTimeout(800);
  out.stage[look+'-'+mode]=await p.evaluate(()=>{const l=document.querySelector('main.stage img.kmkc'),f=document.querySelector('main.stage img.kfxon');const w=l?l.getBoundingClientRect().width:0;return{cls:l?l.className:'',layerW:Math.round(w),face:Math.round(w/1.6),step:l?((l.dataset.mkk||'').match(/\|L(\d+)$/)||[])[1]||0:null,figW:f?Math.round(f.getBoundingClientRect().width):null}});
  await p.screenshot({path:`${OUT}/stage4-${look}-${mode}.png`})}
 await p.evaluate(()=>{if(window.__tls)toilLodStep=window.__tls});
 /* 2) avatar check */
 const scan=async on=>{await setLook('dep',on);await gotoStage();await p.waitForTimeout(1500);
  return p.evaluate(async()=>{const sel='span.md img,.pcp img,.kmini img,.kfc img,img.kpor';const ims=[...document.querySelectorAll(sel)].filter(i=>{const r=i.getBoundingClientRect();return r.width>4&&r.height>4});
   const rows=[];for(const i of ims){const r=i.getBoundingClientRect();let lay=0;for(const l of document.querySelectorAll('img.kmkc,img.kmkl,img.klk-smu')){const q=l.getBoundingClientRect(),cx=q.left+q.width/2,cy=q.top+q.height/2;if(cx>=r.left&&cx<=r.right&&cy>=r.top&&cy<=r.bottom&&q.width<=r.width*1.05)lay++}
    rows.push({ctx:((i.parentElement&&i.parentElement.className)||'').toString().slice(0,24),src:/^blob:/.test(i.currentSrc)?'blob':(i.currentSrc||'').split('/').pop().slice(0,28),w:Math.round(r.width),layers:lay,x:Math.round(r.left),y:Math.round(r.top)})}return rows})};
 const A1=await scan(true),A0=await scan(false);out.avatars=A1.map((r,i)=>({...r,layersOff:(A0[i]||{}).layers}));
 /* rendered pixels of the first avatar frames, makeup on vs off */
 for(const on of [true,false]){await setLook('dep',on);await gotoStage();await p.waitForTimeout(1500);const els=await p.$$('span.md img');out['px'+(on?'On':'Off')]=[];for(const e of els.slice(0,6)){try{const buf=await e.screenshot();out['px'+(on?'On':'Off')].push(require('crypto').createHash('md5').update(buf).digest('hex').slice(0,8))}catch(x){out['px'+(on?'On':'Off')].push('-')}}}
 console.log(JSON.stringify(out));await b.close()})();
