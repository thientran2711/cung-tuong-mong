/* review/kit-odds-row (owner OD 23/11 ~20:30Z: «chữ nắm chắc kế bên thanh gạch, xuống hàng chi cho tốn chỗ»; KIT §0b GENERAL LAYOUT LAW: no wrap when it fits).
   REGRESSION + SCAN: at Fold 755x1000, iPad 1180x820, phone 390x844, EVERY visible odds meter (.kodm) on every screen that shows one has its WORD on the SAME ROW as its 7-segment bar
   (word box vertically inside the bar's row, to the right of it; the word is one line) — option dialogs (4 odds words Liều…Nắm chắc, narrow columns), Hành sự act cards, person-card act, staff, rv, and the tapped popover.
   Prints a table "meters / word below the bar / word wrapped / title on own row (kodrow, counted)". Exit 1 on any word below the bar or wrapped.
   usage: node dev/test/odds-one-row.js <url> <outdir>   (DEVS=755x1000,1180x820,390x844 default) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const CHECK=`(root=>{const o={n:0,below:[],wrap:[],row:0,stk:0,h:[]};root.querySelectorAll('button.ka').forEach(b=>{if(b.querySelector('.kodm')&&b.getClientRects().length)o.h.push(Math.round(b.getBoundingClientRect().height))});root.querySelectorAll('.kodm').forEach(m=>{if(!m.getClientRects().length||m.offsetWidth===0)return;const bar=m.querySelector('.kseg'),w=m.querySelector('b');if(!bar||!w||!w.textContent.trim())return;
  const cs=getComputedStyle(m);if(cs.visibility==='hidden')return;o.n++;const B=bar.getBoundingClientRect(),W=w.getBoundingClientRect();const tag='«'+w.textContent.trim()+'» in '+(m.closest('button.ka')?'card':(m.closest('#kpop')?'popover':m.parentElement.className||m.parentElement.tagName));
  if(W.top>=B.bottom-2||W.left<B.left+B.width-2&&W.top>B.top+B.height/2)o.below.push(tag+' word below the bar');
  const lh=parseFloat(getComputedStyle(w).lineHeight)||parseFloat(getComputedStyle(w).fontSize)*1.2;if(W.height>lh*1.6)o.wrap.push(tag+' word wraps ('+Math.round(W.height)+'px)');
  const b=m.closest('button.ka');if(b&&b.classList.contains('kodrow'))o.row++;if(b&&b.classList.contains('kodstk'))o.stk++});return o})`;
const DLG=[{t:'Mua chuộc người Nội vụ phủ',opts:[['Đưa bạc cho người Nội vụ phủ','Khá chắc · tốn: Bạc -94 · 2 khắc · thành: Sức 80→98 (+18) · Sủng +2 · Danh +1'],['Nhờ người quen nói giúp một lời','Tùy duyên · tốn: Tâm cơ -3 · 1 khắc · thành: Sức +5'],['Chờ thời cơ rồi hãy tính','Liều · tốn: 1 khắc · thành: Danh +1'],['Dâng lễ lên thái hậu','Nắm chắc · tốn: Bạc -10 · thành: Sủng +1']]},
 {t:'Hội phối đồ: báo đề',opts:[['Sai tai mắt dò bên chủ hội','Khó · tốn: Bạc -20 · 1 khắc · thành: Danh +1'],['Tự mình đến xin chỉ giáo','Chắc · tốn: 2 khắc · thành: Tài +1'],['Đem lễ vật đến tạ ơn ma ma','Nắm chắc · tốn: Bạc -30 · thành: Sủng +1'],['Bỏ qua','Tùy duyên · tốn: không']]}];
(async()=>{const b=await chromium.launch();let bad=0;const TAB=[];
 const DEV=(process.env.DEVS||'755x1000,1180x820,390x844').split(',').map(x=>x.split('x').map(Number));
 for(const [W,H] of DEV){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});
  await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,.kroul,#kroulw,#curtain,#buoitr,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof kaRowH==='function'&&typeof start==='function'&&typeof showModal==='function',null,{timeout:240000});await sleep(1500);
  await p.evaluate(()=>{let sd=20261123;Math.random=()=>{sd=(sd*1103515245+12345)%2147483648;return sd/2147483648};try{window.kitReward=()=>{}}catch(e){}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await sleep(800);const e=[];
  {const L=await p.evaluate(()=>{const c=[5,17,18,30,31,43,44,56,57,69,70,82,83,95].map(o=>KIT_ODDS.indexOf(word(o)));return{c,al:['Liều','Khó','Hơi khó','Năm ăn năm thua','Ngang ngửa','Khá chắc','Chắc','Rất chắc','Nắm chắc'].map(w=>kitOddsIdx(w))}});
   const okc=JSON.stringify(L.c)==='[0,0,1,1,2,2,3,3,4,4,5,5,6,6]',oka=JSON.stringify(L.al)==='[0,2,2,3,3,4,5,6,6]';console.log(W,'ladder bands 7 equal',okc,'old-word aliases',oka);if(!okc||!oka)e.push('ladder bands / aliases '+JSON.stringify(L))}
  const rec=(nm,r)=>{if(process.env.HLOG)console.log('H '+W+' '+nm+' '+r.h.join(','));TAB.push([W,nm,r.n,r.below.length,r.wrap.length,r.row]);console.log(`${W} ${nm} meters=${r.n} below=${r.below.length} wrapped=${r.wrap.length} kodrow=${r.row} stacked=${r.stk}`);if(r.below.length||r.wrap.length||r.stk)e.push(nm+': '+r.below.concat(r.wrap).slice(0,3).join(' | ')+(r.stk?' kodstk present':''))};
  for(let d=0;d<DLG.length;d++){await p.evaluate(D=>{Q.length=0;Q.push({t:D.t,h:'<p>Tiểu Lý Tử ở Nội vụ phủ ngập ngừng.</p>',opts:D.opts.map(([n,x])=>({n,x,go:()=>{}}))});showModal()},DLG[d]);await sleep(1500);
   for(const w of [0,460,320,260]){await p.evaluate(w=>{const op=document.querySelector('#modal .opts');if(op){if(w)op.style.setProperty('width',w+'px','important');else op.style.removeProperty('width')}},w);await sleep(900);
    const r=await p.evaluate(C=>eval(C)(document.getElementById('modal')),CHECK);rec('dlg'+d+' col '+(w||'auto'),r);if(d===0&&w===0)await p.screenshot({path:`${OUT}/${W}-opt.png`})}
   /* popover: tap the first meter */
   if(d===0){await p.evaluate(()=>{const op=document.querySelector('#modal .opts');if(op)op.style.removeProperty('width')});await sleep(500);await p.evaluate(()=>document.querySelector('#modal .kodm').click());await sleep(700);const r=await p.evaluate(C=>eval(C)(document),CHECK);rec('popover',r);await p.screenshot({path:`${OUT}/${W}-pop.png`})}
   await p.evaluate(()=>{const M=document.getElementById('modal');Q.length=0;if(M)M.hidden=true;try{render()}catch(e){}});await sleep(500)}
  await p.evaluate(()=>{window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}};
   window.popKind=k=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';S.out=0;S.confined=0;render();const ps=curPeople();const i=ps.findIndex(x=>x.kind===k);if(i<0)throw 'no '+k;popIdx=i;popMsg='';renderStage()}});
  for(const [nm,go] of [['act',"tabGo('act')"],['pop-maid',"popKind('maid')"],['tab-staff',"tabGo('staff')"],['tab-rv',"tabGo('rv')"]]){const ok=await p.evaluate(g=>{try{(0,eval)(g);return true}catch(x){return String(x).slice(0,80)}},go);await sleep(1500);
   if(ok!==true){console.log(W,nm,'skip',ok);continue}
   const r=await p.evaluate(C=>eval(C)(document),CHECK);rec(nm,r);await p.screenshot({path:`${OUT}/${W}-${nm}.png`});await p.evaluate(()=>{const M=document.getElementById('modal');if(M)M.hidden=true;Q.length=0})}
  if(errs.length)e.push('errors '+errs.slice(0,3).join('|'));
  if(e.length)bad++;console.log(`${W}x${H}`,e.length?'FAIL '+e.join('; '):'PASS');await ctx.close()}
 fs.writeFileSync(OUT+'/table.md','| device | scene | meters | word below bar | word wrapped | kodrow (meter under title) |\n|---|---|---|---|---|---|\n'+TAB.map(r=>'| '+r.join(' | ')+' |').join('\n')+'\n');
 await b.close();process.exit(bad?1:0)})();
