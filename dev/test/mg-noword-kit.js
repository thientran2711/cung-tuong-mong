/* mg-noword-kit (owner OD 20/11 ~05:10Z: NO TEXT in mini-game play) — node dev/test/mg-noword-kit.js [dev/index.html] [WxH] [--scan]
   KIT-wide: for EVERY KG82 kind, press «Sẵn sàng» and scan the WHOLE game frame (.kgame: header, how row, clock chip, HUD, board, buttons, canvas fillText) for visible words
   (a text node with a letter) outside the rules block (.kgr), the guided bar (.kgt-bar) and the frame TITLE line (.kph / .kpht: the name of the game, kit header).
   Prints kind | words. --scan prints only. */
const {chromium}=require('playwright');const path=require('path');
const A=process.argv.slice(2);const scan=A.includes('--scan');const pos=A.filter(a=>!a.startsWith('--'));
const URL0=pos[0]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(pos[1]||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__ct=null;const ok=t=>/^[^\p{L}]*$/u.test(t);for(const f of['fillText','strokeText']){const o=CanvasRenderingContext2D.prototype[f];CanvasRenderingContext2D.prototype[f]=function(t){if(window.__ct&&!ok(String(t).trim()))window.__ct.add(String(t).trim());return o.apply(this,arguments)}}});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  window.__words=root=>{const out=[];const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
   while(n=w.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t||/^[^\p{L}]*$/u.test(t))continue;const el=n.parentElement;if(!el)continue;
    if(el.closest('.kgr,.kgt-bar,script,style')||(el.closest('.kph,.kpht')&&!el.closest('.kgclk')))continue;const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')continue;const r=el.getBoundingClientRect();if(!r.width&&!r.height)continue;
    let h=el;while(h&&h!==root){if(h.hidden||getComputedStyle(h).display==='none'){el=null;break}h=h.parentElement}if(!el)continue;
    out.push(t+'  «'+(el.className||el.tagName)+'»')}return out};
  window.__nk=async(src)=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const r={};try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   try{(0,eval)(src)}catch(e){r.err=String(e.message||e);return r}await sleep(900);const box=kg82Box();if(!box){r.nobox=1;return r}const go=box.querySelector('.kgr-go');if(!go){r.nogo=1;return r}
   window.__ct=new Set();go.click();await sleep(1800);const fr=document.querySelector('.kgame')||box;r.play=[...new Set(__words(fr))];
   for(let i=0;i<3;i++){await sleep(800);for(const t of __words(fr))if(!r.play.includes(t))r.play.push(t)}
   r.play.push(...[...window.__ct].map(t=>t+'  «canvas»'));window.__ct=null;try{kg82Close()}catch(e){}return r}});
 await p.waitForTimeout(3500);
 const kinds=await p.evaluate(()=>Object.keys(KG82_KIND).filter(k=>typeof KG82_ENG[KG82_KIND[k].e]==='function'));
 const rows=[];
 for(const k of kinds){const src=k==='hoa'?`startContest({art:"hoa",title:"Hội thi",onDone:()=>{}})`:`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`;
  let r;try{r=await p.evaluate(s=>window.__nk(s),src)}catch(e){r={err:String(e.message).slice(0,120)}}rows.push([k,r]);
  console.log(k.padEnd(9),(r.play||[]).length?'WORDS '+JSON.stringify(r.play):'0 words'+(r.err||r.nobox||r.nogo?' '+JSON.stringify(r):''))}
 console.log('errors',errs.slice(0,3));
 const kitW=r=>(r.play||[]).filter(t=>!/«canvas»$/.test(t));/* kit elements fail here; canvas words are each group's own job (mg-noword-a / b) and are listed only */
 const KNOWN={td_hanh:1};/* names + one-line descriptions of the people to feed: group b (td) needs portraits instead — listed in the report */
 const bad=rows.filter(([k,r])=>(kitW(r).length&&!KNOWN[k])||r.err||r.nobox||r.nogo);console.log(bad.length?'FAIL '+bad.length+' kinds':'PASS '+rows.length+' kinds, 0 words');
 await b.close();process.exit(scan||!bad.length&&!errs.length?0:1)})();
