/* review/kit-opt-title-wrap (MAIN 94 order 21/11 12:47Z; owner OD 18/11 ~09:02Z «title never squeezed by the odds chip» + OD 21/11 ~04:00Z #49a «the odds sit ON THE TITLE ROW»):
   on a narrow card the title of an option / act card wrapped ONE WORD PER LINE beside the odds meter («Nhờ / người / quen / nói / giúp / một / lời», Fold).
   Whole group = EVERY button.ka that carries a meter (.kat > .kodds): dialog option cards (.kopt), act cards (.kart, Hành sự / person card / staff / rv), compact pane cards.
   For every visible card with a meter, at Fold 755x1000 + iPad 1180x820:
   (1) ROW    the meter sits beside the title (its height overlaps the title's lines; never a row of its own above / below) — except .kodrow on a title row narrower than meter + 7.5 em (counted as fallback);
   (2) ROOM   the title box is at least min(its one-line width, 7.5 em) wide;
   (3) WORDS  a title of >= 3 words has no line holding ONE word except its last line;
   (4) INSIDE the meter stays inside the card and does not cover the title.
   Scenes: (A) two REAL option dialogs (Q + showModal), 4 options each, every odds word Liều … Nắm chắc, long and short titles, option column auto/560/460/380/320/280 px;
           (B) Hành sự act tab, pop-maid person card, tab staff, tab rv.
   usage: [REP=5] [DEVS=412x1058,390x844] node dev/test/kit-opt-title-wrap.js <url> <outdir>   (writes <outdir>/<W>-opt.png, <W>-opt320.png) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const CHECK=`(root=>{const o={n:0,bad:[],minRoom:1e9,maxLines:0};const cv=document.createElement('canvas').getContext('2d');
 root.querySelectorAll('button.ka').forEach(b=>{const kat=b.querySelector('.kat');if(!kat)return;const od=kat.querySelector(':scope>.kodds');const kan=kat.querySelector(':scope>.kan');if(!od||!kan||!od.textContent.trim()||!b.getClientRects().length||!b.offsetParent)return;
  const t=kan.textContent.replace(/\\s+/g,' ').trim();if(!t)return;o.n++;const cs=getComputedStyle(kan);const fs=parseFloat(cs.fontSize);cv.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;const nat=cv.measureText(t).width;
  const K=kan.getBoundingClientRect(),O=od.getBoundingClientRect(),B=b.getBoundingClientRect();const lh=parseFloat(cs.lineHeight)||fs*1.2;
  /* words per line */const lines=new Map();const tw=document.createTreeWalker(kan,NodeFilter.SHOW_TEXT);let n,nw=0;while(n=tw.nextNode()){const s=n.data;const re=/\\S+/g;let m;while(m=re.exec(s)){const r=document.createRange();r.setStart(n,m.index);r.setEnd(n,m.index+m[0].length);const rs=[...r.getClientRects()].filter(x=>x.width>0);if(!rs.length)continue;nw++;const k=Math.round(rs[0].top/ (lh*0.6));lines.set(k,(lines.get(k)||0)+1)}}
  const L=[...lines.keys()].sort((a,b)=>a-b);o.maxLines=Math.max(o.maxLines,L.length);const lone=L.slice(0,-1).filter(k=>lines.get(k)===1).length;
  const tag=(b.classList.contains('kopt')?'opt':'act')+' «'+t.slice(0,34)+'» ['+od.textContent.trim()+']'+(window.__kotwDbg?' {'+b.className+' in '+(b.parentElement.className||b.parentElement.tagName)+' kat '+Math.round(kat.getBoundingClientRect().width)+' meter '+Math.round(O.width)+'x'+Math.round(O.height)+' hist '+(b.__kodHist||[]).slice(-8).join(' / ')+' kot '+((b.parentElement.dataset||{}).kol||'')+(b.parentElement.dataset||{}).kot+'}':'');
  const own=O.top>=K.bottom-2||O.bottom<=K.top+2;const kw=kat.clientWidth;
  if(own&&b.classList.contains('kodrow')&&kw<O.width+6+24+7.5*fs+2){o.fb=(o.fb||0)+1}/* kodrow: the title row cannot hold the stacked meter + 7.5 em (tiny pane) — the allowed fallback */
  else if(own)o.bad.push(tag+' meter on its own row');
  const need=Math.min(nat,7.5*fs);o.minRoom=Math.min(o.minRoom,Math.round(K.width/fs*10)/10);if(K.width+1<need)if(!b.classList.contains('kodrow')||!own)o.bad.push(tag+' title box '+Math.round(K.width)+'px < '+Math.round(need)+'px');
  if(nw>=3&&lone)o.bad.push(tag+' '+lone+' one-word line(s) of '+L.length);
  if(O.right>B.right+1||O.left<B.left-1)o.bad.push(tag+' meter sticks out');
  if(O.left<K.right-1&&O.right>K.left+1&&O.top<K.bottom-1&&O.bottom>K.top+1)o.bad.push(tag+' meter covers the title')});return o})`;
const DLG=[
 {t:'Mua chuộc người Nội vụ phủ',opts:[['Đưa bạc cho người Nội vụ phủ','Khá chắc · tốn: Bạc -94 · 2 khắc · thành: Sức 80→98 (+18) · Sủng +2 · Danh +1'],['Nhờ người quen nói giúp một lời','Năm phần · tốn: Tâm cơ -3 · 1 khắc · thành: Sủng +2 · Danh +1 · hỏng: Danh -2'],['Lén vào kho lấy sổ sách','Liều · tốn: 2 khắc · thành: Danh +2 · hỏng: Danh -4'],['Thôi, để lúc khác','tốn: 1 khắc · thành: Tâm cơ +1 · Sủng +1']]},
 {t:'Hội phối đồ: báo đề',opts:[['Sai tai mắt dò bên chủ hội','Khó · tốn: Bạc -20 · 1 khắc · thành: Danh +1'],['Tự mình đến xin chỉ giáo','Chắc · tốn: 2 khắc · thành: Tài +1'],['Đem lễ vật đến tạ ơn ma ma','Nắm chắc · tốn: Bạc -30 · thành: Thiện cảm +3'],['Đã hiểu, sẽ chuẩn bị','Nắm chắc · tốn: 1 khắc · thành: Tâm cơ +1']]}];
(async()=>{const b=await chromium.launch();let bad=0;const TAB=[];
 const DEV=process.env.DEVS?process.env.DEVS.split(',').map(x=>x.split('x').map(Number)):[[755,1000],[1180,820]];/* DEVS=412x1058,390x844 for the secondary devices */
 for(const [W,H] of DEV){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});
  if(process.env.KOTW_DBG)await p.evaluate(()=>{window.__kotwDbg=1});await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,.kroul,#kroulw,#curtain,#buoitr,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof kaRowH==='function'&&typeof start==='function'&&typeof showModal==='function',null,{timeout:240000});await sleep(1500);
  await p.evaluate(()=>{const R0=Math.random;let sd=20261121;Math.random=()=>{sd=(sd*1103515245+12345)%2147483648;return sd/2147483648};/* same world in the before and after runs */try{window.kitReward=()=>{}}catch(e){}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}window.__nlInner=0;Math.random=R0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.bac=500;render()});
  await sleep(800);const e=[];
  /* (A) real option dialogs */
  const REP=+(process.env.REP||5);let repBad=0;/* rv round 1: every dialog is opened REP times per device and each width measured after a different delay, so a timing-dependent fit cannot pass by luck; each measure waits for the settled layout (same boxes for 150 ms) */
  for(let rep=0;rep<REP;rep++){const DL=[250,0,60,150,400][rep%5];
  for(let d=0;d<DLG.length;d++){await p.evaluate(D=>{Q.length=0;Q.push({t:D.t,h:'<p>Tiểu Lý Tử ở Nội vụ phủ ngập ngừng, như chờ ngươi mở lời.</p>',opts:D.opts.map(([n,x])=>({n,x,go:()=>{}}))});showModal()},DLG[d]);await sleep(1500);
   for(const w of [0,560,460,380,320,280]){const r=await p.evaluate(([w,C,DL])=>{const M=document.getElementById('modal');if(!M||M.hidden)return{nomodal:1};const op=M.querySelector('.opts');if(op){if(w)op.style.setProperty('width',w+'px','important');else op.style.removeProperty('width')}
     /* measure the SETTLED layout: after DL ms, wait until the cards (classes + title / meter boxes) stay the same for 150 ms (kitOptTier re-picks 50 ms after a resize; a busy CPU stretches that), max 4 s */
     const sig=()=>[...M.querySelectorAll('button.ka')].map(b=>{const k=b.querySelector('.kat');const R=e=>{if(!e)return'';const r=e.getBoundingClientRect();return Math.round(r.left)+','+Math.round(r.top)+','+Math.round(r.width)+','+Math.round(r.height)};return b.className+'|'+R(k&&k.querySelector(':scope>.kan'))+'|'+R(k&&k.querySelector(':scope>.kodds'))}).join(';');
     return new Promise(res=>{const t0=performance.now();let last=null,since=0;const tick=()=>{const now=performance.now(),g=sig();if(g!==last){last=g;since=now}if((now-since>=150&&now-t0>=DL)||now-t0>4000)return res(Object.assign({kopt:M.querySelectorAll('button.ka.kopt').length,kol:op&&op.dataset.kol,wait:Math.round(now-t0)},eval(C)(M)));requestAnimationFrame(tick)};requestAnimationFrame(tick)})},[w,CHECK,DL]);
    if(r.nomodal){e.push('opt: no modal');break}if(!r.n)e.push('dlg'+d+' w'+w+': no card with a meter');if(r.bad.length){repBad++;e.push('rep'+rep+' dlg'+d+' w'+(w||'auto')+': '+r.bad.slice(0,3).join(' | '))}
    if(rep)continue;
    TAB.push([W,'dlg'+d+' col '+(w||'auto'),r.n,r.bad.length,r.minRoom,r.maxLines]);console.log(`${W} dlg${d} w=${w||'auto'} kol=${r.kol} cards=${r.n} bad=${r.bad.length} fallback=${r.fb||0} minRoom=${r.minRoom}em maxLines=${r.maxLines}`);
    if(d===0&&!w)await p.screenshot({path:`${OUT}/${W}-opt.png`});if(d===1&&w===320)await p.screenshot({path:`${OUT}/${W}-opt320.png`})}
   await p.evaluate(()=>{const M=document.getElementById('modal');const op=M&&M.querySelector('.opts');if(op)op.style.removeProperty('width');Q.length=0;if(M)M.hidden=true;try{render()}catch(e){}});await sleep(500)}}
  console.log(`${W} dialogs x${REP} (delays 250/0/60/150/400 ms, then settled 150 ms): ${repBad} bad measurements`);
  /* (B) act cards */
  await p.evaluate(()=>{window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}};
   window.popKind=k=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';S.out=0;S.confined=0;render();const ps=curPeople();const i=ps.findIndex(x=>x.kind===k);if(i<0)throw 'no '+k;popIdx=i;popMsg='';renderStage()}});
  for(const [nm,go] of [['act',"tabGo('act')"],['pop-maid',"popKind('maid')"],['tab-staff',"tabGo('staff')"],['tab-rv',"tabGo('rv')"]]){const ok=await p.evaluate(g=>{try{(0,eval)(g);return true}catch(x){return String(x).slice(0,80)}},go);await sleep(1500);
   if(ok!==true){console.log(W,nm,'skip',ok);continue}
   const r=await p.evaluate(C=>eval(C)(document),CHECK);console.log(`${W} ${nm} cards=${r.n} bad=${r.bad.length} fallback=${r.fb||0} minRoom=${r.n?r.minRoom:'-'}em maxLines=${r.maxLines}`);if(r.bad.length)e.push(nm+': '+r.bad.slice(0,3).join(' | '));
   TAB.push([W,nm,r.n,r.bad.length,r.n?r.minRoom:'-',r.maxLines]);if(nm==='act')await p.screenshot({path:`${OUT}/${W}-act.png`});
   await p.evaluate(()=>{const M=document.getElementById('modal');if(M)M.hidden=true;Q.length=0})}
  if(errs.length)e.push('errors '+errs.slice(0,3).join('|'));
  if(e.length)bad++;console.log(`${W}x${H}`,e.length?'FAIL '+e.join('; '):'PASS');await ctx.close()}
 fs.writeFileSync(OUT+'/table.md','| device | scene | cards with meter | bad | narrowest title (em) | most title lines |\n|---|---|---|---|---|---|\n'+TAB.map(r=>'| '+r.join(' | ')+' |').join('\n')+'\n');
 await b.close();process.exit(bad?1:0)})();
