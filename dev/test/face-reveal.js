/* review/face-reveal-anim: kitReveal (jreveal.js, KIT §79). usage: node dev/test/face-reveal.js <page url> [shotdir]
   asserts: a stranger frame/avatar/figure is marked grey (data-krvs 0); learning the face (k61Meet) makes each place play ONE veil (.krvg) that is removed after
   BAL.faceReveal.ms; Gọn (OPT.fxon=false) plays the lite fade; a second look plays nothing; old/loaded known people play nothing. */
const {chromium}=require('playwright');const URL=process.argv[2],SH=process.argv[3]||'';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:SH?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 const R=await p.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start();
  const W=t=>new Promise(r=>setTimeout(r,t));await W(1500);Q.length=0;document.getElementById('modal').hidden=true;const out={};
  const mk=v=>{const f=kitFace(v);const host=document.createElement('div');host.id='krvhost';host.style.cssText='position:fixed;left:10px;top:10px;z-index:9999;display:flex;gap:10px;background:#222;padding:8px;width:520px;height:420px';
   host.innerHTML='<div style="height:400px;aspect-ratio:480/1037">'+pcPort(f,'#c9a0e0')+'</div>'+mdH(f,'sm')+mdH(f,'')+'<div style="height:400px;width:140px;display:flex">'+kitStageFig(v,{cap:false})+'</div>';document.body.appendChild(host);return host};
  const v=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x)&&!(S.met&&S.met[x.id]!=null)&&k61St(x)<1)[0];if(!v)return{err:'no stranger'};
  let host=mk(v);await W(300);const kinds=[...host.querySelectorAll('[data-krv]')].map(e=>e.dataset.krvk+':'+e.dataset.krvs);out.before=kinds;out.krvBefore=host.querySelectorAll('.krvg').length;
  k61Meet(v,'test',1);host.remove();host=mk(v);await W(120);
  out.afterKinds=[...host.querySelectorAll('[data-krv]')].map(e=>e.dataset.krvk+':'+e.dataset.krvs);
  await W(350);out.veils=[...host.querySelectorAll('.krvg')].length;out.veilKinds=[...host.querySelectorAll('.krvg')].map(g=>g.parentNode.dataset.krvk||g.parentNode.className.slice(0,20));
  out.ev=Object.keys(kitReveal.KRV.ev).length;await W(BAL.faceReveal.ms+900);out.veilsAfter=host.querySelectorAll('.krvg').length;
  host.remove();host=mk(v);await W(500);out.second=host.querySelectorAll('.krvg').length;host.remove();
  /* Gọn: a second stranger, short fade (class krvlite, no mask) */
  OPT.fxon=false;const v2=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x)&&k61St(x)<1&&x!==v)[0];if(v2){let h2=mk(v2);await W(100);k61Meet(v2,'test',1);h2.remove();h2=mk(v2);await W(100);out.lite=[...h2.querySelectorAll('.krvg')].map(g=>g.classList.contains('krvlite'));out.liteMs=BAL.faceReveal.lite;await W(BAL.faceReveal.lite+900);out.liteAfter=h2.querySelectorAll('.krvg').length;h2.remove()}OPT.fxon=true;
  /* a person known from the start never plays (loading / old saves) */
  const kn=S.maid;if(kn){const h3=document.createElement('div');h3.style.cssText='position:fixed;left:0;top:0;z-index:9999';h3.innerHTML=mdH(kitFace(kn),'sm');document.body.appendChild(h3);await W(200);out.knownVeils=h3.querySelectorAll('.krvg').length;h3.remove()}
  return out});
 const ok=R&&!R.err&&R.before.every(x=>/:0$/.test(x))&&R.afterKinds.every(x=>/:1$/.test(x))&&R.veils>=3&&R.veilsAfter===0&&R.second===0&&R.lite&&R.lite.length>0&&R.lite.every(Boolean)&&R.liteAfter===0&&R.knownVeils===0&&!errs.length;
 console.log(JSON.stringify({R,errs}));console.log(ok?'PASS':'FAIL');await b.close();process.exit(ok?0:1)})();
