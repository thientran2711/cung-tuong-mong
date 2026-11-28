/* picker-dom: frame timeline probe (rv picker-dom R5 FAIL 1 gate).
   usage: node dev/test/picker-dom-frames.js <built root> [chest sizes, default 5,6,7,10,11,12,30] > out.json   (run on the LIVE tree and on the branch)
          node dev/test/picker-dom-frames.js --cmp live.json branch.json                                       (table + PASS / FAIL)
   Needs dev/index.html (assemble.py). Every (device, chest size N, picker) opens in a FRESH page (no state carried from the previous row), on F's s7 save
   with S.inv cut to N, once the game has SETTLED (the event-art manifest answers: kitEvArt gives the gift dialog its picture — a dialog opened in the
   first seconds after boot is drawn before that and takes a different frame, LIVE too). The dialog's frame classes are sampled every 1 s for
   SAMPLE s, then (paged build) one page turn and SAMPLE s more. Givable pieces: on the s7 save no servant can be sent (jptime bestSent), so the
   by-hand Tặng quà / Cài đồ lists hold no item; the probe builds those dialogs with ptOn() off (the list she gets when she can send someone; the
   same stub on both trees). Gate: every sample of the branch (page 1 and page 2) = LIVE's settled frame, and LIVE's own samples never change —
   except K-PICK-SHORT (a) (KK63 ruling): where LIVE's box could not show ONE whole row, the branch's frame is LIVE's stepped down (+ .kdnopic,
   the text cap .kdtx may differ), the same on every sample and page.
   Also logged per row: tiles in view, the §23 pager over a tile (must be 0), .kipshort (fallback (d): even the stepped frame is shorter than one row + pager). */
const fs=require('fs'),path=require('path');
if(process.argv[2]==='--cmp'){const L=JSON.parse(fs.readFileSync(process.argv[3])),B=JSON.parse(fs.readFileSync(process.argv[4]));let bad=0,n=0;
 for(const dv in B)for(const r of B[dv]){const l=(L[dv]||[]).find(x=>x.N===r.N&&x.n===r.n);n++;if(!l||l.none||r.none||l.err||r.err){const ok=!!(l&&l.none&&r.none);if(!ok)bad++;console.log((ok?'ok  ':'FAIL')+` ${dv} ${r.n} chest ${r.N}: ${l&&l.none?'LIVE none':l&&l.err?'LIVE err':'LIVE has it'} / ${r.none?'branch none':r.err?'branch err':'branch has it'}`);continue}
  const lf=[...new Set(l.t1)],sx=c=>c.split(' ').filter(k=>k!=='kdnopic'&&k!=='kdtx').join(' '),lshort=(l.clr!=null?l.clr:l.full|0)<(r.row|0);/* K-PICK-SHORT (a): LIVE could not show one whole row clear of its sticky confirm / pager */
  const ok=lf.length===1&&r.t1.concat(r.t2||[]).every(c=>c===lf[0]||(lshort&&/\bkdnopic\b/.test(c)&&sx(c)===sx(lf[0])))&&!r.over;if(!ok)bad++;
  console.log((ok?'ok  ':'FAIL')+` ${dv} ${r.n} chest ${r.N} (${r.ent} entries${r.turned?', turned':''}): LIVE [${lf.join(' / ')}] · branch p1 ${[...new Set(r.t1)].join(' / ')}${r.turned?' · p2 '+[...new Set(r.t2)].join(' / '):''} · pagerOverTiles ${r.over} · tiles in view ${r.full}/${r.tiles}${r.short?' · kipshort (fallback d)':''}${lshort?' · LIVE short ('+(l.clr!=null?l.clr:l.full|0)+' whole clear tiles) → stepped frame allowed':''}`)}
 console.log(bad?`picker-dom-frames FAIL ${bad}/${n}`:`picker-dom-frames PASS ${n}/${n}`);process.exit(bad?1:0)}
const ROOT=path.resolve(process.argv[2]);const NS=(process.argv[3]||'5,6,7,10,11,12,30').split(',').map(Number);const SAMPLE=+process.env.SAMPLE||10;
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const cp=require('child_process'),zlib=require('zlib');
const D=JSON.parse(zlib.gunzipSync(cp.execSync('git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz',{cwd:__dirname,maxBuffer:1<<28})).toString());
const PK=[['giftpick','giftpick','v'],['giftto','giftto','emp'],['plantpick','plantpick','v'],['tsgiftpick-it','tsgiftpick','vit']].filter(x=>!process.env.ONLY||process.env.ONLY.split(',').includes(x[0]));/* ONLY=a,b: those pickers only */
(async()=>{const b=await chromium.launch();const out={};for(const [vw,vh] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:vw,height:vh},reducedMotion:'reduce'});await serve(ctx,ROOT);
 await ctx.addInitScript(()=>{window.__kriOff=1/* LIVE's «Vòng bảo vật» ring would take the dialog over (its own gate: picker-dom-ring.js) */});await ctx.addInitScript(d=>{if(!sessionStorage.getItem('pdm')){for(const k in d)localStorage.setItem(k,d[k]);sessionStorage.setItem('pdm','1')}},D);
 const R=[];for(const N of NS)for(const [n,pid,kind] of PK){const p=await ctx.newPage();try{await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:300000});await p.waitForFunction(()=>typeof deser==='function'&&window.COOPW,null,{timeout:300000});
  await p.addStyleTag({content:'#klife{display:none!important}'});/* the load layer covers the dialog in headless runs */
  await p.evaluate(()=>{const d=loadSlot(1);SLOT=1;quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;while(Q.length)Q.shift();try{deal();render()}catch(e){}});
  await p.waitForFunction(()=>{try{return !!kitEvArt(Object.assign({kind:'choice'},mkP('giftto',{t:'emp'})))}catch(e){return false}},null,{timeout:90000,polling:1000}).catch(()=>{});
  const r=await p.evaluate(async([N,n,pid,kind,SAMPLE])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const v=liveRivals(true).filter(x=>x.alive!==false&&!x.out)[0];S.inv=S.inv.slice(0,N);
   const pp=kind==='emp'?{t:'emp'}:kind==='vit'?{v:v.id,k:'it'}:{v:v.id};while(Q.length)Q.shift();try{closeModal()}catch(e){}
   const po=typeof ptOn==='function'?ptOn:null;let it=null;try{if(po)ptOn=()=>false;it=mkP(pid,pp)}finally{if(po)ptOn=po}if(!it)return{N,n,none:1};
   pushDil(it,n);{const j=Q.indexOf(it);if(j>0){Q.splice(j,1);Q.unshift(it)}}showModal();
   const cls=()=>{const d=document.querySelector('#modal .dlg');return d?[...d.classList].filter(c=>!/^(kfit|kv\d|kpanel|kipdlg)$/.test(c)).sort().join(' '):''};
   const geo=()=>{const M=document.getElementById('modal'),o=M.querySelector('.opts'),pg=M.querySelector('.kipw>.kippg'),t=[...M.querySelectorAll('.kipc')];if(!o)return{};const b=o.getBoundingClientRect(),bot=Math.min(b.top+o.clientHeight,innerHeight),pr=pg&&pg.getBoundingClientRect();
    return{tiles:t.length,over:pr?t.filter(x=>{const r=x.getBoundingClientRect();return r.bottom>pr.top+1&&r.top<pr.bottom-1}).length:0,full:t.filter(x=>{const r=x.getBoundingClientRect();return r.top>=b.top-1&&r.bottom<=bot+1}).length,row:t.length?t.filter(x=>Math.abs(x.getBoundingClientRect().top-t[0].getBoundingClientRect().top)<3).length:0,clr:(()=>{const r0=t.filter(x=>Math.abs(x.getBoundingClientRect().top-t[0].getBoundingClientRect().top)<3),st=[...M.querySelectorAll('.kipw>.kippg,.kipw>.kipgo')].filter(e=>e.offsetParent&&getComputedStyle(e).position==='sticky').map(e=>e.getBoundingClientRect());return r0.filter(x=>{const r=x.getBoundingClientRect();return r.top>=b.top-1&&r.bottom<=bot+1&&!st.some(s=>r.bottom>s.top+1&&r.top<s.bottom-1&&r.right>s.left+1&&r.left<s.right-1)}).length})(),short:!!M.querySelector('.kipw.kipshort')}};
   const t1=[],t2=[];for(let i=0;i<SAMPLE;i++){await w(1000);t1.push(Q[0]&&Q[0].pid===pid?cls():'(not '+pid+')')}const g1=geo();let turned=0;const nx=document.querySelector('#modal .kipw .kpkpg[data-kippg="1"]');
   if(nx&&!nx.disabled){nx.click();turned=1;for(let i=0;i<SAMPLE;i++){await w(1000);t2.push(Q[0]&&Q[0].pid===pid?cls():'(not '+pid+')')}}const g2=turned?geo():g1;
   return{N,n,ent:(it.opts||it.o||[]).filter(c=>c&&c.ik!=null).length,turned,t1,t2,tiles:g1.tiles,full:g1.full,row:g1.row,clr:g1.clr,over:(g1.over||0)+(turned?g2.over||0:0),short:g1.short||g2.short}},[N,n,pid,kind,SAMPLE]);
  R.push(r);console.error(vw+'x'+vh,JSON.stringify(r))}catch(e){R.push({N,n,err:String(e)});console.error('ERR',N,n,String(e))}finally{await p.close()}}
 out[vw+'x'+vh]=R;await ctx.close()}await b.close();console.log(JSON.stringify(out))})();
