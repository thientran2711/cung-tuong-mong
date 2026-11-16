/* weather-video: record a ~10 s clip of one weather kind in her room with the real painted backdrop (CDN).
   usage: node dev/test/weather-video.js <url> <outdir> <snow|fly|...> <WxH> [dpr] [seconds] [shotOnly] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,KIND,VP,DPR,SEC,SHOT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const CFG={snow:{month:12,buoi:0,wx:{n:"tuyết rơi",k:"snow",f:1}},fly:{month:5,buoi:3,wx:{n:"đom đóm",k:"dust",f:0}}}[KIT_OR(KIND)];
function KIT_OR(k){return k}
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});const [W,H]=VP.split('x').map(Number);
 const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',recordVideo:SHOT?undefined:{dir:OUT,size:{width:W,height:H}}});
 const p=await c.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const t0=Date.now();
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
 await p.addStyleTag({content:'#kload{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}});
 for(let i=0;i<60&&await p.evaluate(()=>typeof NLP!=='undefined'&&!!NLP);i++){await p.evaluate(()=>{const b=document.querySelector('button[data-nl="ok"]');if(b)b.click()});await sleep(300)}
 for(let i=0;i<40;i++){const k=await p.evaluate(()=>{const r=document.querySelector('#kroul,.kroul');if(r){const bs=[...r.querySelectorAll('button')];const b=bs.find(x=>/Bỏ qua/.test(x.textContent))||bs.find(x=>/Tiếp|Vào|Nhập/.test(x.textContent))||bs[0];if(b)b.click();else r.click()}const o=document.querySelector('.kmov');if(o){o.click();const kb=o.querySelector('.kmend');if(kb)kb.click()}const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}return !!r||!!o||(typeof kmBusy!=='undefined'&&kmBusy)});if(!k)break;await sleep(600)}
 await p.evaluate(cfg=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kmov').forEach(e=>e.remove());document.querySelectorAll('#kroul').forEach(e=>e.remove());S.place="home";S.month=cfg.month;S.buoi=cfg.buoi;S.wx=cfg.wx;render()},CFG);
 await sleep(1500);await p.evaluate(()=>{document.getElementById('modal').hidden=true;document.querySelectorAll('.kmov,#kload').forEach(e=>e.remove());render()});
 await p.evaluate(()=>{setInterval(()=>{KFX.q=1;KFX.slow=0},100)});/* recording: a real device runs the particle layer at full quality; the software-GL box would drop it */
 const tS=Date.now()-t0;
 if(SHOT){await sleep(7000);console.log("parts",await p.evaluate(()=>KFX.parts.length));await p.screenshot({path:OUT+'/shot-'+KIND+'-'+VP+'.jpg',type:'jpeg',quality:80});}
 else await sleep(1000*(+SEC||11));
 const info=await p.evaluate(()=>{const px={failed:PX.failed,app:!!PX.app,bg:!!PX.bg,bgSrc:PX.bgSrc&&PX.bgSrc.slice(-30),tick:PX.app&&PX.app.ticker.started,cv:PX.app&&[PX.app.canvas.style.display,PX.app.canvas.width,PX.app.canvas.height],RM:typeof RM!=='undefined'&&RM,fxon:OPT.fxon};const e=document.getElementById('scimg'),cs=getComputedStyle(e),r=e.getBoundingClientRect();return({px,dbg:[cs.opacity,cs.visibility,cs.display,Math.round(r.width),Math.round(r.height),cs.filter,e.className,e.parentElement.id,getComputedStyle(e.parentElement).opacity],buoi:S.buoi,month:S.month,wx:S.wx&&S.wx.k,place:S.place,live:window.KFX&&KFX.live,amb:window.KFX&&KFX.amb,sc:placeOf(S.place).sc,bg:document.getElementById("scimg").style.backgroundImage.slice(0,160),cls:document.getElementById("stage").className})});
 console.log(JSON.stringify({KIND,VP,startMs:tS,info,errs:errs.slice(0,3)}));
 await c.close();if(!SHOT){const vp=await p.video().path();fs.writeFileSync(OUT+'/'+KIND+'-'+VP+'.meta',JSON.stringify({vp,startMs:tS}))}await b.close()})();
