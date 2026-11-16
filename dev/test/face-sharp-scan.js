/* review/face-sharp CLASS SCAN: every people picture (fig-/por-/face-/unknown-fig, <img> or CSS background) that is drawn while a
   CONTINUOUS (infinite) animation runs on it or on one of its ancestors. Such a picture is re-sampled by the compositor every frame
   (animated transform / filter = second bilinear pass or a filter render surface): measured -8..-13% fine detail in the face
   (dev/test/face-sharp.js + face-sharp-cmp.py), and on the owner's phone her animated figure read as a hazy face next to a crisp maid.
   usage: node dev/test/face-sharp-scan.js <site url> <WxH@dpr> <out.json>   (LOCAL_IMG=<dir> serves CDN pictures from disk)
   Screens: stage at home (her + maid), stage with 3 consorts selected / not, Hậu cung, Giao tình, an event dialog with people. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'},args:['--ignore-certificate-errors']}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block'});
 const LOC=process.env.LOCAL_IMG;if(LOC)await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev\/img\/[^?]*/,async r=>{const f=LOC+'/'+r.request().url().split('/img/')[1].split('?')[0];if(fs.existsSync(f))return r.fulfill({path:f,headers:{'access-control-allow-origin':'*','content-type':f.endsWith('.json')?'application/json':'image/webp'}});return r.continue()});
 const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof figPick==='function'&&FIGS.length>0,null,{timeout:180000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;Q.length=0;try{NLP=null}catch(e){}
  const s=document.createElement('style');s.textContent='.kroul{display:none!important}';document.head.appendChild(s);try{kitKnown=()=>true}catch(e){}S.rank=1;S.age=20;S.toilette=null;
  S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};S.buoi=0;used=0;tab='act';render()});
 const clear=()=>p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md&&!window.__keepModal)md.hidden=true;document.querySelectorAll('.kmov').forEach(e=>e.remove())});
 const scan=(name)=>p.evaluate((name)=>{const re=/(?:^|\/)(fig-|por-|face-|unknown-fig|kit\/unknown)[^"')\s]*\.webp/;const out=[];const seen=new Set();
  const anim=e=>{const L=[];for(let n=e;n&&n.nodeType===1;n=n.parentElement){const a=(n.getAnimations?n.getAnimations():[]).filter(x=>x.playState==='running'&&x.effect&&x.effect.getComputedTiming().iterations===Infinity);
    a.forEach(x=>L.push((n===e?'self':(n.id?'#'+n.id:n.className&&typeof n.className==='string'?'.'+n.className.split(' ')[0]:n.tagName))+':'+(x.animationName||x.id||'anim')))}return L};
  document.querySelectorAll('img,[style*="background"],.md,.figimg').forEach(e=>{if(e.closest('[hidden]'))return;const r=e.getBoundingClientRect();if(r.width<8||r.height<8||r.bottom<0||r.top>innerHeight)return;
   const s=e.tagName==='IMG'?(e.currentSrc||e.getAttribute('src')||''):(getComputedStyle(e).backgroundImage||'');const m=re.exec(s);if(!m)return;
   const f=s.slice(m.index).split(/[?"')]/)[0].split('/').pop();const A=anim(e);const k=f+'|'+A.join(',');if(seen.has(k))return;seen.add(k);
   out.push({screen:name,file:f,el:(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).join('.'):'')+'<'+e.tagName.toLowerCase(),w:Math.round(r.width),anim:A})});return out},name);
 const R=[];const wait=t=>p.waitForTimeout(t);
 await clear();await wait(3500);R.push(...await scan('stage-home'));
 /* stage with consorts */
 await p.evaluate(()=>{const W=S.where=S.where||{};liveRivals(true).slice(0,3).forEach(v=>W[v.id]='vuon');S.place='home';used=0;tab='act';goTo('vuon')});await clear();await wait(3500);R.push(...await scan('stage-vuon'));
 await p.evaluate(()=>{const t=document.querySelector('#tokens .tok.fig');if(t)t.click()});await wait(1500);R.push(...await scan('stage-vuon-selected'));
 await p.evaluate(()=>{const me=document.getElementById('mefig');if(me)me.click()});await wait(1500);R.push(...await scan('stage-me-selected'));
 for(const [t,nm] of [['hc','haucung'],['soc','giaotinh'],['wd','tutrang']]){await p.evaluate(t=>{try{const m=document.getElementById('modal');if(m)m.hidden=true;tab=t;render()}catch(e){}},t);await wait(2500);R.push(...await scan('tab-'+nm))}
 /* an event dialog with people on its stage */
 await p.evaluate(()=>{try{tab='act';const v=liveRivals(true)[0];Q.push({t:'Thử',who:pv(v),h:'<p>Thử.</p>',stage:[v],opts:[{n:'Được',fx:{}}]});render()}catch(e){}});await wait(2500);R.push(...await scan('dialog'));
 const bad=R.filter(x=>x.anim.length);const by={};bad.forEach(x=>{const k=x.screen;by[k]=(by[k]||0)+1});
 fs.writeFileSync(OUT,JSON.stringify({vp:SZ,total:R.length,animated:bad.length,byScreen:by,bad,all:R,errs:errs.slice(0,5)},null,1));
 console.log(JSON.stringify({vp:SZ,total:R.length,animated:bad.length,byScreen:by,kinds:[...new Set(bad.map(x=>x.anim.join('+')+' @'+x.el.split('<')[0].slice(0,40)))]}));await b.close()})();
