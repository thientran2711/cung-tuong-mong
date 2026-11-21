/* story-voice: real Chính tuyến hồi (j67 fireBeat67) and every road chapter's hồi texts through svFrame — every choice dialog ends framing her choice.
   usage: node dev/test/story-voice/j67frame.js [url] */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const url=process.argv[2]||'file://'+path.join(__dirname,'../../index.html');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(url);await p.waitForFunction(()=>typeof start==='function'&&typeof fireBeat67==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 const r=await p.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  const out={shown:[],bad:[],arcs:0,beats:0,unframed:0,skipHTML:0};
  for(let g=0;g<6;g++){start();Q.length=0;const A=S.st&&S.st.M;if(!A)continue;
   for(let k=0;k<4;k++){if(!A.nb&&!pickNext67(A))break;Q.length=0;fireBeat67(A);if(!Q.length)break;showModal();await new Promise(z=>setTimeout(z,120));
    const m=Q[0];const txt=document.querySelector('#modal').innerText;out.shown.push(m.t+' :: …'+m.h.replace(/<[^>]*>/g,'').slice(-90));
    if(m.opts&&m.opts.length>1&&!svFramed(m.h))out.bad.push(m.t+': '+m.h.slice(-120));try{chooseM(0)}catch(e){}Q.length=0;$("modal").hidden=true}}
  /* static: every arc beat text through fill67 + svFrame */
  for(const id in ARC67){const a=ARC67[id];out.arcs++;let A;try{A=newThread67(id,"x")}catch(e){continue}for(const bk in (a.B||{})){const bd=a.B[bk];if(!bd||!bd.t)continue;let h;try{h=fill67(bd.t,A)}catch(e){continue}out.beats++;if(/\{\w+\}|undefined/.test(h))out.bad.push(id+'.'+bk+': token left: '+h.slice(0,90));for(const o of [].concat(bd.o||[])){if(!o||typeof o!=='object')continue;for(const k of ['n','rt','rf','wx','lx']){if(typeof o[k]!=='string')continue;let x;try{x=fill67(o[k],A)}catch(e){continue}if(/\{\w+\}|undefined/.test(x))out.bad.push(id+'.'+bk+'.'+k+': '+x.slice(0,90))}}
   const f=svFrame(h);if(f===h&&!svFramed(h)){if(/<(?:div|p|table|ul|ol|h\d)\b/i.test(h))out.skipHTML++;else out.unframed++}}}
  return out});
 console.log(r.shown.slice(0,8).join('\n'));console.log(`arcs ${r.arcs} beats ${r.beats} unframed ${r.unframed} skipHTML ${r.skipHTML} live-bad ${r.bad.length} errors ${errs.length}`);
 const fail=r.bad.length||r.unframed||errs.length;if(r.bad.length)console.log(r.bad.slice(0,5).join('\n'));if(errs.length)console.log(errs.slice(0,3).join('\n'));
 console.log(fail?'FAIL':'PASS');await b.close();process.exit(fail?1:0)})();
