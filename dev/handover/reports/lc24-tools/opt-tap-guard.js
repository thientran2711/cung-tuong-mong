/* LC24 extra gate (MAIN 161): every KIT_OPT_TAP target chooses on a tap of its odds meter (.kodm) and of a glossary word (.kgl) inside it;
   a glossary word OUTSIDE an option opens #kpop with kitGlossPopHtml; a tap on the pop-up only closes it. Real mouse taps, Fold 755x1000 + iPad 1180x820.
   usage: node opt-tap-guard.js <index.html> */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();let fails=0;
for(const [w,h] of [[755,1000],[1180,820]]){const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(process.argv[2]));await p.waitForTimeout(2500);
 const sels=await p.evaluate(()=>window.KIT_OPT_TAP.split(','));
 for(const s of sels){
  const ok=await p.evaluate(s=>{document.getElementById('lc24box')?.remove();const box=document.createElement('div');box.id='lc24box';box.style.cssText='position:fixed;left:20px;top:200px;z-index:2147483646;background:#fff;padding:8px';document.body.appendChild(box);
   // build a structure matching selector s
   let parent=box,btn;const parts=s.trim().split(/\s+/);
   const mk=(tok)=>{let tag='div';let m=tok.match(/^([a-z]+)?((?:[.#][\w-]+)*)$/i);if(m[1])tag=m[1];const el=document.createElement(tag);(m[2].match(/[.#][\w-]+/g)||[]).forEach(x=>x[0]=='.'?el.classList.add(x.slice(1)):el.id=x.slice(1));return el};
   for(const part of parts){const ch=part.split('>');for(let i=0;i<ch.length;i++){let tok=ch[i];if(i==ch.length-1&&part===parts[parts.length-1]&&!/^button/.test(tok)&&ch.length>1)tok='button'+tok;const el=mk(tok);parent.appendChild(el);parent=el}}
   btn=parent;btn.style.cssText='display:block;width:300px;height:60px';btn.innerHTML='Lựa chọn <span class="kodm" data-kodds="3" style="display:inline-block;width:60px;height:20px;background:#ccc">odds</span> <span class="kgl" data-kgl="Oán" style="background:#eee">Oán</span>';
   window.__lc24hit=0;btn.addEventListener('click',()=>window.__lc24hit++);return btn.matches(s)},s);
  if(!ok){console.log('SKIP build',s);fails++;continue}
  const res={};for(const t of ['.kodm','.kgl']){await p.evaluate(()=>{window.__lc24hit=0;const k=document.getElementById('kpop');if(k)k.hidden=true});const bb=await p.locator('#lc24box '+t).boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(80);
   res[t]=await p.evaluate(()=>({hit:window.__lc24hit,pop:!!(document.getElementById('kpop')&&!document.getElementById('kpop').hidden)}))}
  const good=res['.kodm'].hit==1&&!res['.kodm'].pop&&res['.kgl'].hit==1&&!res['.kgl'].pop;if(!good)fails++;
  console.log(`${w}x${h} ${good?'ok  ':'FAIL'} ${s} meter:${JSON.stringify(res['.kodm'])} gloss:${JSON.stringify(res['.kgl'])}`)}
 // gloss outside an option → kpop with kitGlossPopHtml body; tap on pop closes only
 await p.evaluate(()=>{document.getElementById('lc24box')?.remove();const box=document.createElement('div');box.id='lc24box';box.style.cssText='position:fixed;left:20px;top:200px;z-index:2147483646;background:#fff;padding:8px';box.innerHTML='<span class="kgl" data-kgl="Oán" style="display:inline-block;padding:10px">Oán</span>';box.addEventListener('click',()=>window.__lc24under=(window.__lc24under||0)+1);document.body.appendChild(box)});
 let bb=await p.locator('#lc24box .kgl').boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(150);
 const g=await p.evaluate(()=>{const k=document.getElementById('kpop');const want=typeof kitGlossPopHtml=='function'?kitGlossPopHtml('Oán'):null;return {open:!!(k&&!k.hidden),same:!!(k&&want&&k.innerHTML.includes(want.slice(0,40))),fn:typeof kitGlossPopHtml}});
 let closeOk=false;if(g.open){const kb=await p.locator('#kpop').boundingBox();await p.evaluate(()=>window.__lc24under=0);await p.mouse.click(kb.x+kb.width/2,kb.y+Math.min(10,kb.height/2));await p.waitForTimeout(100);closeOk=await p.evaluate(()=>document.getElementById('kpop').hidden&&!window.__lc24under)}
 const gg=g.open&&g.same&&closeOk;if(!gg)fails++;console.log(`${w}x${h} ${gg?'ok  ':'FAIL'} gloss outside option → kpop kitGlossPopHtml ${JSON.stringify(g)} tapOnPopClosesOnly:${closeOk}`);
 if(errs.length){console.log('pageerrors',errs.slice(0,3));fails++}await p.close()}
await b.close();console.log(fails?`FAIL ${fails}`:'ALL PASS');process.exit(fails?1:0)})();
