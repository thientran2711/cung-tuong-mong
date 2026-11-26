/* kit-home-frame.js — KIT §4.3a (pre-palace portrait, OB-NGOAICUNG; MAIN 156 queue): before the palace (isKc: Tiểu thư / Thôn nữ at home) HER portrait
   frame shows NO consort rank sign (frame by home kind: Công chúa → frame-princess) — no rank crest (.kcrest), no rank gem (.kgem) — in the header and her identity card; once she is in the palace
   (S.kc.inPal) the crest + gem come back. Fold 755x1000 + iPad 1180x820, a real «Ở nhà» start (origin tt), real click on her header portrait.
   usage: node dev/test/kit-home-frame.js <index.html> [shotdir]   exit 1 on a FAIL */
const {chromium}=require('playwright');const path=require('path');const F=path.resolve(process.argv[2]);const SH=process.argv[3];const ORG='tt';let bad=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();for(const [W,H] of [[755,1000],[1180,820]]){const D=W+'x'+H;const c=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce'});
 await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());document.querySelectorAll('[data-km-close]').forEach(b=>{if(b.offsetParent)b.click()})},300)});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
 await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());
 await p.goto('file://'+F);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await sleep(3500);
 const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
 await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
 await p.evaluate(o=>{for(let i=0;i<200&&S.origin.k!==o;i++){try{store.set(NL_KEY,null)}catch(e){}start()}if(S.origin.k!==o){S.origin=ORIGINS.find(x=>x.k===o);nlCard()}},ORG);await sleep(700);await skip();
 await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(800);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
 await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(1500);
 await p.evaluate(()=>{for(let i=0;i<12&&Q.length;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}tab='act';render()});await sleep(1500);
 await p.evaluate(()=>{for(let i=0;i<12&&Q.length;i++){closeModal()}document.querySelectorAll('#dawn,#kdaytc,#kboot,#kcover').forEach(e=>e.remove());const t=document.getElementById('title');if(t)t.hidden=true;render()});await sleep(2500);
 const info=await p.evaluate(()=>{const me=[...document.querySelectorAll('.pcp.kit,.md.kit')].filter(e=>e.offsetParent);return {kc:typeof isKc==='function'&&isKc(),road:typeof road8==='function'?road8():'',rank:S.rank,
   frames:me.slice(0,12).map(e=>{const f=e.querySelector('img.kfr');const cr=e.querySelector('.kcrest');const g=e.querySelector('[src*="gem-"],[style*="gem-"]');return {where:(e.closest('[id]')||{}).id,fr:f&&f.src.split('/').pop(),crest:!!cr,gem:!!g}})}});
 ok(info.kc,`${D}: the life starts at home (isKc)`);const me=info.frames.filter(x=>x.where==='me-p');ok(me.length&&me.every(x=>!x.crest&&!x.gem),`${D}: header portrait at home: no crest, no gem ${JSON.stringify(me)}`);
 if(SH)await p.screenshot({path:`${SH}/home-${W}.png`});
 await p.evaluate(()=>{const e=document.getElementById('me-p');if(e)e.click()});await sleep(2500);
 const id=await p.evaluate(()=>{const M=document.getElementById('modal');return {open:!M.hidden,fr:[...M.querySelectorAll('img.kfr')].filter(f=>/consort/.test(f.src)).map(f=>({crest:!!f.parentElement.querySelector('.kcrest'),gem:!!f.parentElement.querySelector('.kgem')}))}});
 ok(id.open&&id.fr.length&&id.fr.every(x=>!x.crest&&!x.gem),`${D}: identity card at home: her frame has no crest, no gem ${JSON.stringify(id)}`);if(SH)await p.screenshot({path:`${SH}/home-id-${W}.png`});
 /* home kinds (KIT_HOME_FRAME by kc2D): a foreign princess at her own court → frame-princess; thôn nữ → plain consort-0; never a crest / gem */
 for(const [kd,want] of [["nc","frame-princess"],["dan","frame-consort-0"],["","frame-consort-0"]]){const r=await p.evaluate(kd=>{for(let i=0;i<6&&Q.length;i++)closeModal();const M=document.getElementById('modal');if(M)M.hidden=true;const k0=S.kc.kd;S.kc.kd=kd;render();
   const e=document.getElementById('me-p');const f=e&&e.querySelector('img.kfr');const o={fr:f&&f.src.split('/').pop(),crest:!!(e&&e.querySelector('.kcrest')),gem:!!(e&&e.querySelector('.kgem'))};S.kc.kd=k0;return o},kd);
  ok(r.fr===want+'.webp'&&!r.crest&&!r.gem,`${D}: home kind «${kd||'tiểu thư'}» → ${want}, no crest/gem ${JSON.stringify(r)}`)}
 await p.evaluate(()=>{for(let i=0;i<6&&Q.length;i++)closeModal();const M=document.getElementById('modal');if(M)M.hidden=true;window.__kcdbg=JSON.stringify(Object.keys(S.kc||{})).slice(0,80)+' isKc='+isKc();if(S.kc)S.kc.inPal=true;render()});await sleep(1500);
 const pal=await p.evaluate(()=>{const e=document.getElementById('me-p');return {kc:isKc(),crest:!!(e&&e.querySelector('.kcrest')),gem:!!(e&&e.querySelector('.kgem'))}});
 if(pal.kc!==false)console.log('DBG',await p.evaluate(()=>window.__kcdbg));ok(!pal.kc&&pal.crest&&pal.gem,`${D}: in the palace: crest + gem back ${JSON.stringify(pal)}`);
 ok(!errs.length,`${D}: no page error ${JSON.stringify(errs.slice(0,2))}`);await c.close()}
 await b.close();console.log(bad?`KIT-HOME-FRAME FAIL (${bad})`:'KIT-HOME-FRAME PASS');process.exit(bad?1:0)})();
