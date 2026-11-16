/* dev/test/pixi-tabs.js — reviewer lag-play-r1: the Pixi room layer after tab switches (lag-play skips 0-px resizes and pauses the
   ticker while the stage is hidden). usage: node dev/test/pixi-tabs.js [--root <built site>] [--shots <dir>]
   Fold 755x1000 + iPad 1180x820, HOST mode: new life, wait for Pixi, then 3 rounds over every tab and back to the room; after each return
   the canvas must match the stage box (CSS px), be visible, and its ticker must run; while another tab hides the stage the ticker may pause. */
const {chromium}=require('playwright');const path=require('path');const D=require('./lib/device');const PP=require('./lib/playperf');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:A[i+1]};const ROOT=path.resolve(opt('root',path.join(__dirname,'../..')));const SH=opt('shots',null);
const sleep=t=>new Promise(r=>setTimeout(r,t));let bad=0;
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch({args:PP.LAUNCH_ARGS});
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev);await ctx.addInitScript(()=>{window.__bot={pre:1}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const f=await D.openHost(p,srv.url,{timeout:300000});await sleep(1500);await PP.newLife(f);await sleep(3000);await f.evaluate(PP.CLEAR);
  const tabs=await f.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.offsetParent!==null).map(x=>x.dataset.tab));
  const home=await f.evaluate(()=>tab);
  for(let i=0;i<120;i++){if(await f.evaluate(()=>!!(window.PX&&PX.app)||!!(window.PX&&PX.failed)))break;await sleep(500)}
  const st=()=>f.evaluate(()=>{const s=document.getElementById('stage'),c=PX&&PX.app&&PX.app.canvas;if(!c)return{nopx:1,failed:!!(PX&&PX.failed)};const r=s.getBoundingClientRect(),q=c.getBoundingClientRect();
    return{tab,sw:Math.round(r.width),sh:Math.round(r.height),cw:Math.round(q.width),ch:Math.round(q.height),vis:c.style.visibility||'',run:PX.app.ticker.started,kids:PX.layer?PX.layer.children.length:-1}});
  const s0=await st();console.log(dev,'home',home,'tabs',tabs.join(','),JSON.stringify(await st()));
  for(let round=0;round<3;round++)for(const k of tabs){if(k===home)continue;
   for(const t of [k,home]){const h=await f.evaluateHandle(t=>[...document.querySelectorAll('#tabs [data-tab="'+t+'"]')].find(x=>x.offsetParent!==null)||null,t);const el=h.asElement();if(!el)continue;await el.click();await sleep(t===home?1600:700)}
   {const rb=await f.$('#k3room');if(rb&&await rb.isVisible()){await rb.click();await sleep(2500)}}/* portrait: the room is the home view (Hành sự = list): the real "Về phòng" button */
   const s=await st();const ok=s.nopx?false:(s.sh>0&&Math.abs(s.cw-s.sw)<=2&&Math.abs(s.ch-s.sh)<=2&&s.vis!=='hidden'&&s.run===s0.run);/* ticker as at the start (Gọn effects may idle it on phones, main too) */if(!ok){bad++;console.log(dev,'after',k,'BAD',JSON.stringify(s))}else if(round===0)console.log(dev,'after',k,'ok',JSON.stringify(s))}
  if(SH)await p.screenshot({path:path.join(SH,`pixi-${dev}.jpg`),type:'jpeg',quality:60});
  if(errs.length){bad++;console.log(dev,'errors',errs.slice(0,3))}await ctx.close()}
 await b.close();srv.close();console.log(bad?'FAIL '+bad:'PASS pixi-tabs');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
