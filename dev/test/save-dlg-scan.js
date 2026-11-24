/* save-dlg-fix: Chọn sổ + every kit dialog with picture/info columns and button rows: counts broken words / squeezed columns / cut pictures / "???" in slot summaries.
   usage: python3 dev/build/assemble.py && node dev/test/save-dlg-scan.js <outdir> [shots] */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');const path=require('path');
const OUT=process.argv[2]||'/tmp/sdf';const SHOTS=process.argv[3]==='shots';fs.mkdirSync(OUT,{recursive:true});
const VPS=[[755,1000,2],[412,1058,2],[1180,820,2],[1366,1024,2],[390,844,3]];
const res=[];
/* page-side scan of the open modal: broken words in buttons/labels, label column squeeze, cut pictures */
const SCAN=()=>{const M=document.querySelector('#modal:not([hidden])');if(!M)return{none:1};const out={broken:[],narrow:[],cut:[],qqq:[],off:[]};
 const vis=e=>e.offsetParent!==null||getComputedStyle(e).position==='fixed';
 /* broken word = a word whose own range spans more than one line */
 const walker=document.createTreeWalker(M,NodeFilter.SHOW_TEXT);let n;
 while(n=walker.nextNode()){const el=n.parentElement;if(!el||!vis(el))continue;const t=n.textContent;if(!t.trim())continue;
  const re=/\S+/g;let m;while(m=re.exec(t)){if(m[0].length<2)continue;const r=document.createRange();r.setStart(n,m.index);r.setEnd(n,m.index+m[0].length);const rs=[...r.getClientRects()].filter(q=>q.width>0);
   if(rs.length>1){const ys=new Set(rs.map(q=>Math.round(q.top/4)));if(ys.size>1)out.broken.push(m[0]+' @'+(el.closest('button')?'btn':el.className||el.tagName))}}}
 const d=M.querySelector('.dlg');const dr=d?d.getBoundingClientRect():null;
 M.querySelectorAll('.kslot').forEach(s=>{const sr=s.getBoundingClientRect();const cols=getComputedStyle(s).gridTemplateColumns.split(' ').map(parseFloat);
  const info=s.querySelector('.kb,.krows');const ir=info?info.getBoundingClientRect():null;
  if(ir&&ir.width<120)out.narrow.push((s.querySelector('.kpst')||{}).textContent+':'+Math.round(ir.width));
  s.querySelectorAll('.kslot-a .kbtn').forEach(b=>{const q=b.getBoundingClientRect();if(q.width<64)out.narrow.push('btn '+b.textContent.trim().slice(0,14)+':'+Math.round(q.width));if(b.scrollHeight>b.clientHeight+2)out.cut.push('btn '+b.textContent.trim().slice(0,14))})});
 M.querySelectorAll('img').forEach(im=>{if(!vis(im)||!im.naturalWidth)return;const q=im.getBoundingClientRect();let p=im.parentElement;while(p&&p!==M){const cs=getComputedStyle(p);if(/hidden|clip/.test(cs.overflow+cs.overflowY)){const pr=p.getBoundingClientRect();if(q.bottom>pr.bottom+2||q.top<pr.top-2){out.cut.push('img '+(im.className||im.src.slice(-20)));break}}p=p.parentElement}});
 if(/\?\?\?/.test(M.innerText)){const mm=M.innerText.match(/[^\n]*\?\?\?[^\n]*/g);out.qqq=mm}
 if(dr){out.dlg=[Math.round(dr.width),Math.round(dr.height)];if(dr.right>innerWidth+1||dr.left<-1)out.off.push('dlg')}
 out.ovx=document.documentElement.scrollWidth>innerWidth+1;out.scroll=d?d.scrollHeight>d.clientHeight+2:0;return out};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 for(const [w,h,dpr] of VPS){const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr,hasTouch:true,isMobile:w<1100,reducedMotion:'reduce'});await serve(ctx);
  await ctx.route(/\/(img|audio)\//,r=>r.abort());
  const p=await ctx.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message.slice(0,160)));
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
  await p.addStyleTag({content:'#kroul,#kroulw,.kmov.kcf{display:none!important}'});
  /* make two lives: slot 1 servant (cung nữ origin), slot 2 a consort; slot 3 empty */
  for(const n of [1,2]){await p.evaluate(n=>{SLOT=n;$("title").hidden=true;start()},n);await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:60000});await p.waitForTimeout(400);
   await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());try{nlAccept()}catch(e){}while(Q.length)Q.shift();try{closeModal()}catch(e){}try{render()}catch(e){}save()});}
  /* ??? trap: slot 1 carries the name of a palace person the life now loaded does not know yet (j61 name mask must not touch a slot summary) */
  await p.evaluate(()=>{const r=rivals.find(v=>v.alive)||rivals[0];const k=SK(1);const d=JSON.parse((window.slotGet?slotGet(k):localStorage.getItem(k)));d.S.name="Bạch "+r.name.split(" ").slice(-2).join(" ");localStorage.setItem(k,JSON.stringify(d));try{S.known=S.known||{};for(const v of rivals)delete S.known[v.id]}catch(e){}});
  const info=await p.evaluate(()=>[1,2].map(n=>{const d=loadSlot(n);return d&&{name:d.S.name,rank:d.S.rank,srv:!!d.S.srv,who:window.CTM_SLOTWHO&&CTM_SLOTWHO(d.S)}}));
  await p.evaluate(()=>{while(Q.length)Q.shift();try{closeModal()}catch(e){}$("title").hidden=false;showTitle()});await p.waitForTimeout(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-tgo="slots"]');if(b)b.click()});await p.waitForSelector('#modal #slots .kslot',{timeout:10000});await p.waitForTimeout(500);
  const sz=`${w}x${h}@${dpr}`;
  for(const tab of ['solo','coop']){await p.evaluate(t=>{const b=document.querySelector(`#slots [data-kcs="${t}"]`);if(b)b.click()},tab);await p.waitForTimeout(400);
   const r=await p.evaluate(SCAN);r.tab=tab;r.sz=sz;r.info=info;res.push(r);console.log(sz,tab,JSON.stringify(r));
   if(SHOTS)await p.screenshot({path:`${OUT}/chonso-${tab}-${w}x${h}.png`,animations:'disabled'})}
  /* the other title pages (same .kpt-mount part): Thiết lập, Sổ luân hồi; the live-frame (picture column) must never wrap them */
  for(const pg of ['opt','past']){await p.evaluate(()=>{const b=document.querySelector('#modal #mr [data-tgo="home"]');if(b)b.click()});await p.waitForSelector('#modal [data-tgo="'+pg+'"]');await p.evaluate(g=>document.querySelector('#modal [data-tgo="'+g+'"]').click(),pg);await p.waitForTimeout(500);
   const r=await p.evaluate(SCAN);r.tab=pg;r.sz=sz;r.live=await p.evaluate(()=>!!document.querySelector('#modal .dlg.kszlive,#modal .k3mpic'));if(r.live)r.cut=(r.cut||[]).concat(['live picture column']);res.push(r);console.log(sz,pg,JSON.stringify(r));
   if(SHOTS)await p.screenshot({path:`${OUT}/chonso-${pg}-${w}x${h}.png`,animations:'disabled'})}
  console.log(sz,'errs',JSON.stringify(p.errs));await ctx.close()}
 let bad=0;for(const r of res)bad+=(r.broken||[]).length+(r.narrow||[]).length+(r.cut||[]).length+(r.qqq||[]).length+(r.off||[]).length;console.log('TOTAL bad:',bad);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
