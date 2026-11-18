/* owner 17/11 03:58Z: the makeup layer follows HER picture, never the stage (it must never land on another person).
   Sets a vụng day, then moves around (place chips, people tokens, tabs) and after every move checks EVERY visible .kfxf: its own picture must be shown and the layer must sit on it.
   usage: node dev/test/toil-overlay.js <url> <WxH@dpr>   (exit 1 on any overlay not on its own picture) */
const {chromium}=require('playwright');const [,,URL,VP]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@1');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof toilMakeup==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true});start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});await p.waitForTimeout(3000);
 await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const c=toilColFix(null);c.seed=toilWk();S.toilette={day:toilWk()*10,wk:toilWk(),score:30,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:'vung',col:c};TOIL.prev=null;toilMkPre();render()});await p.waitForTimeout(3000);
 const scan=()=>p.evaluate(()=>{const bad=[];let shown=0;document.querySelectorAll('.kfxf').forEach(s=>{const cs=getComputedStyle(s);if(cs.display==='none')return;const i=s.__img;const r=s.getBoundingClientRect();if(!r.width)return;shown++;
   if(!i||!i.isConnected){bad.push('no picture');return}const ic=getComputedStyle(i);const q=i.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;
   if(ic.display==='none'||ic.visibility==='hidden'||!q.width)bad.push('picture hidden');else if(cx<q.left-6||cx>q.right+6||cy<q.top-6||cy>q.bottom+6)bad.push('off picture '+(i.id||i.className)+' d='+Math.round(Math.hypot(cx-(q.left+q.width/2),cy-(q.top+q.height/2))))});return{shown,bad}});
 const out=[];out.push(['start',await scan()]);
 /* her figure slides to another slot (j59: CSS translate) and is switched off (j59off): the layer must follow / hide */
 await p.evaluate(()=>{const m=document.getElementById('mefig');if(m)m.style.translate='150px 20px'});await p.waitForTimeout(400);out.push(['mefig translated',await scan()]);
 await p.evaluate(()=>{const m=document.getElementById('mefig');if(m){m.style.translate='';m.style.scale='1.1'}});await p.waitForTimeout(400);out.push(['mefig scaled',await scan()]);
 await p.evaluate(()=>{const m=document.getElementById('mefig');if(m){m.style.scale='';m.style.display='none'}});await p.waitForTimeout(400);const r0=await scan();out.push(['mefig hidden (layer must be gone)',r0]);if(r0.shown){r0.bad.push('layer shown while her picture is hidden')}
 await p.evaluate(()=>{const m=document.getElementById('mefig');if(m)m.style.display=''});await p.waitForTimeout(400);out.push(['mefig back',await scan()]);
 for(let k=0;k<14;k++){
  const act=await p.evaluate(k=>{const c=[...document.querySelectorAll('#tokens .tok, .kplace button, .kpl button, #places button, .kmap button, [data-place]')].filter(e=>e.offsetParent);if(!c.length)return'none';const e=c[k%c.length];e.click();return(e.className||e.tagName)+':'+(e.textContent||'').trim().slice(0,12)},k);
  await p.waitForTimeout(300);console.log(k,act);out.push([k+' '+act+' mid',await scan()]);await p.waitForTimeout(1200);out.push([k+' settled',await scan()])}
 let nbad=0;out.forEach(([t,r])=>{if(r.bad.length){nbad++;console.log('BAD',t,JSON.stringify(r))}});console.log('checks',out.length,'with layers',out.filter(o=>o[1].shown).length,'bad',nbad,'errs',JSON.stringify(errs));await b.close();process.exit(nbad?1:0)})();
