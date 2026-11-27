/* review/sub-odds: the act ladder (Liều … Nắm chắc) only for the act's own odds; every side chance reads Rất thấp … Rất cao.
   usage: node dev/test/sub-odds.js <baseURL of the site root> <page: index.html|before.html> <outdir> <tag>
   Fold 755x1000@2 + iPad 1180x820@2: Hành sự buổi tối (Chặn ngự giá, Tranh sủng), the result card, Đêm thị tẩm (prep + night1), HUD.
   Checks: page errors, text clipped in the cards, and the word detector: no ladder word after a label colon / bracket (side chance). */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,BASE,PAGE,OUT,TAG]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
/* a ladder word right after ':' or '(' = a side chance written on the act ladder (the act's own odds stand alone in the chip) */
const BAD=/[:(]\s*(Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững|Liều|Khó|Khá chắc|Nắm chắc|Chắc)(?![a-zà-ỹđ]| chắn)/i;
const badLines=t=>String(t).split(/\n| · /).filter(s=>BAD.test(s));/* «Khó lường» retired (review/odds-no-unknown) */
async function skipLoader(p){for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return 'skip'}
  return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')return;await sleep(500)}}
function clipCheck(sel){return `(()=>{const bad=[];document.querySelectorAll(${JSON.stringify(sel)}).forEach(r=>r.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width||!e.childNodes.length)return;
  const cs=getComputedStyle(e);if((cs.overflow==='hidden'||cs.textOverflow==='ellipsis')&&(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+2)&&e.textContent.trim())bad.push(e.className+': '+e.textContent.trim().slice(0,40))}));return bad})()`}
(async()=>{const b=await chromium.launch();const R={};
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100});
  const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));const r=R[W]={};
  await p.goto(BASE+PAGE,{waitUntil:'domcontentloaded'});await skipLoader(p);await sleep(1500);
  /* old save: a life started on the build being tested, written to a slot, read back */
  await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});await sleep(1500);
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   const v=liveRivals(true)[0];S.tonight=v;S.buoi=2;S.preg=0;S.suc=Math.max(S.suc,80);deal();render()});
  await p.locator('[data-tab="act"]:visible').first().click().catch(()=>{});await sleep(1500);
  r.cards=await p.evaluate(()=>[...document.querySelectorAll('.kcard,.card')].filter(c=>c.offsetParent&&/Chặn ngự giá|Tranh sủng/.test(c.textContent)).map(c=>c.innerText.replace(/\s+\n/g,'\n')));
  const card=await p.$$('.kcard');let shot=null;for(const c of card){if(/Chặn ngự giá/.test(await c.textContent())&&await c.isVisible()){shot=c;break}}
  if(shot){await shot.scrollIntoViewIfNeeded();await sleep(400);await shot.screenshot({path:`${OUT}/${TAG}-chan-ngu-gia-${W}x${H}.png`,animations:'disabled',timeout:120000})}
  await p.screenshot({path:`${OUT}/${TAG}-hanh-su-toi-${W}x${H}.png`,animations:'disabled',timeout:120000});
  /* KIT 31.19: doable acts first, then time-blocked, then other-blocked; re-render after an act keeps the order */
  r.order=await p.evaluate(()=>{const G=[...document.querySelectorAll('#panel .cards')].find(g=>g.offsetParent);if(!G||typeof kitActGroup!=='function')return null;
   const L=[...G.children].filter(b=>b.matches('button.ka'));const g=L.map(kitActGroup);const keys=L.map(kitActKey);
   const i=deck.findIndex((a,j)=>!a.done&&(a.b==null||a.b===(S.buoi||0))&&a.n!=="Chặn ngự giá");if(i>=0){deck[i].o=100;{const r0=window.roll;window.roll=()=>true;try{act(i)}finally{window.roll=r0}}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()}
   return new Promise(res=>setTimeout(()=>{const G2=[...document.querySelectorAll('#panel .cards')].find(x=>x.offsetParent);const k2=G2?[...G2.children].filter(b=>b.matches('button.ka')).map(kitActKey):[];
    res({first:L.slice(0,2).map(b=>kitActKey(b)+' :: '+[...b.querySelectorAll('.kr-why .kchip, .kr-why .kwhy')].map(e=>e.textContent).join('|')+' dis='+b.disabled+b.classList.contains('kdis')),groups:g.join(''),sorted:g.every((x,j)=>!j||g[j-1]<=x),stable:JSON.stringify(k2.map(k=>k.split('|').pop()))===JSON.stringify(keys.map(k=>k.split('|').pop())),n:L.length})},1200))});
  r.actText=await p.evaluate(()=>{const e=document.getElementById('panel')||document.body;return e.innerText});
  r.hud=await p.evaluate(()=>{const e=document.getElementById('hud2');return e?[...e.querySelectorAll('.hc[data-hx="con"],.hc[data-hx="dem"],.hc[data-hx="birth"]')].map(x=>x.innerText.replace(/\s+/g,' ')):[]});
  r.clipAct=await p.evaluate(clipCheck('.kcard'));
  /* result card of Chặn ngự giá */
  await p.evaluate(()=>{const i=deck.findIndex(a=>a.n==="Chặn ngự giá");used=0;S.suc=80;if(i>=0)act(i)});await sleep(1800);
  r.result=await p.evaluate(()=>{const t=document.getElementById('rtoast'),m=document.getElementById('modal');return (t&&t.offsetParent?t.innerText:'')+(m&&!m.hidden?'\n'+m.innerText:'')});
  await p.screenshot({path:`${OUT}/${TAG}-ket-qua-${W}x${H}.png`,animations:'disabled',timeout:120000});
  /* Đêm thị tẩm: prep options, then night1 */
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.dead=false;nightScene();showModal()});await sleep(1500);
  r.prep=await p.evaluate(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.innerText:''});r.clipPrep=await p.evaluate(clipCheck('#modal'));
  await p.screenshot({path:`${OUT}/${TAG}-dem-chuan-bi-${W}x${H}.png`,animations:'disabled',timeout:120000});
  await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button')].find(x=>/Điểm trang|Để mộc/.test(x.textContent));if(b)b.click()});await sleep(1500);
  r.night=await p.evaluate(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.innerText:''});
  await p.screenshot({path:`${OUT}/${TAG}-dem-thi-tam-${W}x${H}.png`,animations:'disabled',timeout:120000});
  /* old save reads back */
  r.save=await p.evaluate(()=>{Q.length=0;quiet=false;S.dead=false;save();const raw=localStorage.getItem(SK(3));const ok=!!raw;try{loadSlot(3)}catch(e){return 'load error '+e.message}render();return ok?'ok':'no save'});
  r.bad=[...badLines(r.cards.join('\n')),...badLines(r.actText),...badLines(r.result),...badLines(r.prep),...badLines(r.night),...badLines(r.hud.join('\n'))];
  r.hasLieu=/Liều/.test(r.cards.join(' ')+r.hud.join(' '));r.errs=errs;await ctx.close()}
 /* static: the built page, every template "<label>: ${word(" left would be a side chance on the ladder */
 const src=fs.readFileSync(require('path').join(__dirname,'../build/all.js'),'utf8');R.staticLeft=(src.match(/: \$\{word\(/g)||[]).length;
 fs.writeFileSync(`${OUT}/${TAG}-report.json`,JSON.stringify(R,null,1));
 for(const W of [755,1180])console.log(W,JSON.stringify({bad:R[W].bad,hasLieu:R[W].hasLieu,errs:R[W].errs,clip:[...R[W].clipAct,...R[W].clipPrep],hud:R[W].hud,save:R[W].save,order:R[W].order,result:R[W].result.slice(0,300),cards:R[W].cards}));
 console.log('static ": ${word(" left:',R.staticLeft);await b.close()})();
