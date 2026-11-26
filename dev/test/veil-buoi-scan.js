/* veil-buoi-scan (law 11, owner 26/11 ~18:45Z «mọi màn hình mờ theo buổi»): the computed backdrop colour of EVERY dimmed layer for the 4 buổi (0 sáng 1 trưa 2 chiều 3 tối) + stills of a dialog, a kit scene (visitor
   «giá đáo» uses #modal / kscn) and the stage at each buổi on one device. FAIL: tối differs from the original dark colour, or sáng/trưa/chiều equal tối, or a veil does not read the token.
   usage: node dev/test/veil-buoi-scan.js <url> [WxH] [shotDir] */
const {chromium}=require('playwright');const sl=t=>new Promise(r=>setTimeout(r,t));const [,,URL_,SZ,SHOT]=process.argv;const [W,H]=(SZ||'1180x820').split('x').map(Number);
const LAYERS=[['#modal','id','modal'],['.modal.kload (loading)','cls','modal kload'],['.kscn-veil','cls2','kscn-veil'],['.kidfl','cls','kidfl'],['#kpodov','id','kpodov'],['#krkov','id','krkov'],['#kpzoom','id','kpzoom'],['.ktut-dim','cls3','ktut-dim']];
const ORIG={'#modal':'rgba(42, 26, 18, 0.533)','.modal.kload (loading)':'rgba(42, 26, 18, 0.533)','.kscn-veil':'rgba(20, 12, 8, 0.45)','.kidfl':'rgba(42, 26, 18, 0.333)','#kpodov':'rgba(42, 26, 18, 0.72)','#krkov':'rgba(42, 26, 18, 0.72)','#kpzoom':'rgba(26, 15, 8, 0.8)','.ktut-dim':'rgba(30, 18, 10, 0.58)'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));
 await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
 const boot=async()=>{await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}};
 await boot();
 const rows={};let fail=0;
 for(const bu of [0,1,2,3]){await p.evaluate(bu=>{Q.length=0;document.getElementById('modal').hidden=true;S.buoi=bu;tab='go';render()},bu);await sl(900);
  const r=await p.evaluate(({bu,LAYERS})=>{const o={bu:document.body.dataset.buoi};for(const [n,k,c] of LAYERS){const e=document.createElement('div');if(k==='id')e.id=c;else e.className=c;e.style.cssText='display:none';let host=document.body;if(k==='cls3'){host=document.createElement('div');host.id='ktut';document.body.appendChild(host)}host.appendChild(e);if(k==='id'&&c==='modal'){e.remove();o[n]=getComputedStyle(document.getElementById('modal')).backgroundColor;continue}o[n]=getComputedStyle(e).backgroundColor;e.remove();if(host!==document.body)host.remove()}return o},{bu,LAYERS});rows[bu]=r;
  if(SHOT){require('fs').mkdirSync(SHOT,{recursive:true});
   for(let t=0;t<4;t++){await p.evaluate(()=>{Q.length=0;Q.push({t:'Có người đến',h:'<p>Thử chữ trong hộp thoại: chữ phải đọc rõ trên nền mờ.</p>',opts:[{n:'Mời vào'},{n:'Hẹn lần sau'}]});showModal();const m=document.getElementById('modal');m.hidden=false});await sl(500);if(await p.evaluate(()=>{const m=document.getElementById('modal');return !m.hidden&&/Có người đến/.test(m.textContent)}))break}console.log('b'+bu,'modal shown:',await p.evaluate(()=>!document.getElementById('modal').hidden));await p.screenshot({path:`${SHOT}/${W}x${H}-b${bu}-dialog.png`});
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await sl(300);
   try{await p.evaluate(async()=>{const Sc=kitScene.open({bg:typeof IMG_U==='function'?IMG_U('img/ev-te-le.webp'):'img/ev-te-le.webp',intro:0});const g=Sc.L.g,fh=Math.round(g.H*.8);await Sc.fig(S,{cx:g.w*.5,top:g.H-fh,fh,z:2});Sc.show();window.__sc=Sc});await sl(1200);await p.screenshot({path:`${SHOT}/${W}x${H}-b${bu}-scene.png`});await p.evaluate(()=>{try{window.__sc.close(true)}catch(e){}})}catch(e){console.log('scene err',e.message.slice(0,80))}}
 }
 console.log('| layer | sáng(0) | trưa(1) | chiều(2) | tối(3) | tối = original | 0-2 differ from tối |');
 for(const [n] of LAYERS){const v=[0,1,2,3].map(i=>rows[i][n]);const okT=v[3]===ORIG[n];const okD=[0,1,2].every(i=>v[i]!==v[3]);if(!okT||!okD)fail++;console.log(`| ${n} | ${v.join(' | ')} | ${okT?'ok':'FAIL '+ORIG[n]} | ${okD?'ok':'FAIL'} |`)}
 console.log(fail?'FAIL '+fail:'PASS');if(errs.length)console.log('pageerrors',errs);await b.close()})();
