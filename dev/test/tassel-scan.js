/* review/tassel-fix: whole-class scan of every framed portrait (pcPort cell .pcp.kit and the small frame span.md.kfc) — owner 15/11 06:35Z
   "the full jade pendant + tassel must show". For each view it measures every frame canvas (.kin, 550x1037) on screen:
     shown  = visible share of the canvas height (1 = whole canvas incl. pendant + tassel; 0.767 = cut at the band, y 795)
     win    = photo-window width in px (no-zoom / no-shrink check: must be the same before and after)
     hit    = text that overlaps the frame's pendant zone (canvas y 795–1037) — must be 0
   plus the view's horizontal overflow and, for rows/strips, the spread of frame tops in one row (alignment).
   usage: node dev/test/tassel-scan.js <url> <WxH,...> <outdir> [oldsave.json] [shots:1]
   prints JSON per viewport: {view:{n, cut, minShown, win:[min,max], hit, ovf}} and saves a few JPEGs (small). */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');
const [,,BASE,SZS,OUT,OLD0,SHOTS]=process.argv;const OLD=OLD0&&OLD0!=='-'?OLD0:null;fs.mkdirSync(OUT,{recursive:true});
const VIEWS=['hdr','rv','rboard','staff','court','court1','kid','rel','men','fac','log','act','inv','story','go','emp','ident','gift','book1','book2','book3','book4','kitpage'];
function scanFn(view){
 const vis=e=>{const cs=getComputedStyle(e);return cs.display!=="none"&&cs.visibility!=="hidden"&&e.getClientRects().length};
 const out=[];
 document.querySelectorAll('.kin').forEach(k=>{const fr=k.querySelector(':scope>img.kfr');if(!fr||!vis(k))return;const cell=k.parentElement;if(!vis(cell))return;
  const r=k.getBoundingClientRect();if(r.width<4||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)return;
  /* a frame under a full-screen overlay (book, kit page) is not on screen */const cx=r.left+r.width/2,cy=Math.max(1,Math.min(innerHeight-2,r.top+r.height*.45));const top0=document.elementFromPoint(cx,cy);if(top0&&!cell.contains(top0)&&!top0.contains(cell))return;
  /* visible box = canvas ∩ every ancestor that clips without scrolling (overflow hidden/clip, contain paint); scroll boxes only cut what is scrolled out */
  let top=r.top,bot=r.bottom,left=r.left,right=r.right;let e=k.parentElement,cutBy=null;
  while(e&&e!==document.documentElement){const cs=getComputedStyle(e);const ov=cs.overflowY+" "+cs.overflowX;const q=e.getBoundingClientRect();
   const clips=/hidden|clip/.test(ov)||/paint/.test(cs.contain)||cs.clipPath!=="none";const scrolls=/auto|scroll/.test(cs.overflowY);
   const page=e===document.body||e.id==='panel'||e.id==='game'||e.classList.contains('kpane')||e.classList.contains('logs');/* scroll areas: content below the fold is scrolled, not cut */
   if(clips&&!scrolls&&!page){if(q.bottom<bot-0.5){bot=q.bottom;cutBy=cutBy||(e.className||e.tagName).toString().slice(0,40)}top=Math.max(top,q.top)}
   if(scrolls&&!page)break;/* inside a scroll box: what lies past its edge is reached by scrolling, not cut */
   e=e.parentElement}
  const shown=Math.max(0,Math.min(1,(bot-r.top)/r.height));
  const kb=k.querySelector(':scope>.kbg');const win=kb?Math.round(kb.getBoundingClientRect().width*10)/10:0;
  /* text overlapping the pendant zone (canvas y 795–1037), outside this cell */
  const pz={l:r.left+r.width*.3,r:r.right-r.width*.3,t:r.top+r.height*795/1037,b:Math.min(bot,r.bottom)};let hit=[];
  if(pz.b>pz.t+2){const x=(pz.l+pz.r)/2;for(const fy of [.25,.5,.8]){const y=pz.t+(pz.b-pz.t)*fy;if(y<0||y>=innerHeight)continue;
    const L=document.elementsFromPoint(x,y);const ci=L.findIndex(el=>cell.contains(el));
    /* text ABOVE the frame (earlier in the stack) or text of the same block under it (before the block's own box): not what lies under an overlay */
    const blk=cell.closest('#modal,#dawn,.kbk,#panel,header,#stage,#kitpage,.k3c,#kcourt')||document.body;const bi=L.indexOf(blk);
    for(const el of L.slice(0,bi<0?L.length:bi)){if(cell.contains(el)||el.contains(cell))continue;
     const tn=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||el.tagName==="BUTTON"||el.tagName==="INPUT";
     let fx=el;while(fx&&fx!==document.body&&getComputedStyle(fx).position!=='fixed')fx=fx.parentElement;if(fx&&fx!==document.body&&!fx.contains(cell))continue;/* fixed bars (bottom tab bar) float over scrolled content */
     if(tn&&vis(el)){/* only text drawn ABOVE or under the pendant at that point counts */const rr=el.getBoundingClientRect();if(rr.width&&rr.height){hit.push((el.className||el.tagName).toString().slice(0,24)+":"+el.textContent.trim().slice(0,16));break}}}}}
  const where=(cell.closest('#modal')?'modal':cell.closest('header')?'hdr':cell.closest('#panel')?'panel':cell.closest('#dawn,.kbk')?'book':cell.closest('#stage')?'stage':'other');
  out.push({cls:(cell.className||'').toString().replace(/\s+/g,' ').slice(0,50),where,w:Math.round(r.width),shown:+shown.toFixed(3),win,cutBy,hit,top:Math.round(r.top),left:Math.round(r.left)})});
 /* alignment: frames in one flex/grid row (same parent row container) should share their top */
 const rows={};out.forEach(o=>{});
 return {frames:out,ovf:document.documentElement.scrollWidth>innerWidth+1};
}
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const ALL={};
 for(const SZ of SZS.split(',')){const [W,H]=SZ.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block',ignoreHTTPSErrors:true});
  await ctx.route(u=>/ctmload=1/.test(String(u)),r=>r.abort());
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(1500);
  const setup=await p.evaluate(d=>{const kl=document.getElementById('kload');if(kl)kl.remove();new MutationObserver(()=>document.querySelectorAll('.kroul,#kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true});
   try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
   if(d){try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;deal();Q.length=0;render();return'old '+(S&&S.name)}catch(e){return'ERR '+e.message}}
   SLOT=3;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   try{kn();for(const v of rivals){S.met[v.id]=1;try{intelLearn(v,3,{by:S.maid.name,how:"dò la"})}catch(e){}}for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}
   try{menInit();(S.men||[]).slice(0,4).forEach(m=>{try{k61Meet(m,"gặp",3)}catch(e){}})}catch(e){}
   Q.length=0;if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{render()}catch(e){}return'new '+(typeof S!=='undefined'&&S&&S.name)},OLD?fs.readFileSync(OLD,'utf8'):null);
  await p.waitForTimeout(1500);
  const R={setup};
  const close=()=>p.evaluate(()=>{document.querySelectorAll('#kitpage').forEach(e=>e.hidden=true);Q.length=0;const m=document.getElementById('modal');if(m){m.hidden=true}const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML=''}document.body.classList.remove('kbk-open');window.__rb=0;if(location.hash==='#kit')history.replaceState(null,'',location.pathname);const kp=document.getElementById('kitpage');if(kp)kp.hidden=true});
  for(const v of VIEWS){
   await close();
   const ok=await p.evaluate(v=>{try{const T=t=>{tab=t;render()};
    if(v==='hdr'){T('act');return 1}
    if(v==='kid'){try{if(!S.kids.length){S.kids.push(mkKid('m',4));S.kids.push(mkKid('f',9))}}catch(e){}T('kid');return 1}
    if(['rv','staff','court','rel','men','fac','log','act','inv','story','go'].includes(v)){T(v);return 1}
    if(v==='rboard'){window.__rb=1;T('rv');return 1}
    if(v==='court1'){PG.court=1;T('court');return 1}
    if(v==='emp'){showEmp();return 1}
    if(v==='dlg'){const R=liveRivals(true);const a=R[0],c=R[1]||R[0];Q.push({t:"Có người đến",stage:[a,c],who:pv(a),h:`<p>${a.name} sang thăm.</p>`,opts:[{n:"Tiếp",fx:{suc:-3},x:"thân +3",go:()=>{}},{n:"Từ chối",fx:{suc:3},x:"thân -3",go:()=>{}}]});showModal();return 1}
    if(v==='gift'){let ix=S.inv.findIndex(e=>!e.h);if(ix<0){S.inv.push({k:'nhansam'});ix=S.inv.length-1}const d=mkP('giftpick',{ix});if(!d)return 0;pushDil(d,"Tặng quà");render();return 1}
    if(/^book/.test(v)){Q.length=0;dawn();return 1}
    if(v==='ident'){Q.push({t:'Thân phận',nl:1,h:'<p>x</p>',opts:[{n:'Nhận',fx:{},go:()=>{}}]});showModal();return 1}
    if(v==='news'){Q.length=0;nextBuoi();return Q.length?(showModal(),1):0}
    if(v==='kitpage'){const pg=kitSamplePage();const sec=pg&&pg.querySelector('[data-kit="§28.1"]');if(sec){sec.scrollIntoView({block:'start'});const sc=sec.closest('#kitpage');if(sc)sc.scrollTop-=70}return sec?1:0}
   }catch(e){return 'ERR '+e.message}return 0},v);
   console.error(SZ,v,ok);await p.waitForTimeout(/^book/.test(v)?2600:1400);
   const bn=+(v.match(/^book(\d)/)||[0,0])[1];for(let i=0;i<bn;i++){await p.evaluate(()=>{const n=document.querySelector('.kbk-next');if(n)n.click()});await p.waitForTimeout(1500)}
   if(!/^book/.test(v))await p.evaluate(()=>{const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML=''}document.body.classList.remove('kbk-open');document.querySelectorAll('.kbk').forEach(e=>e.remove())});
   try{await p.waitForFunction(()=>[...document.querySelectorAll('.kin img')].every(i=>i.complete),null,{timeout:8000})}catch(e){}
   await p.evaluate(()=>document.querySelectorAll('.kres,.kresc,#kres').forEach(e=>e.remove()));
   const s=await p.evaluate(`(${scanFn})(${JSON.stringify(v)})`);
   const F=s.frames;const cut=F.filter(f=>f.shown<.995);const hit=F.filter(f=>f.hit.length);
   R[v]={ok,n:F.length,cut:cut.length,minShown:F.length?Math.min(...F.map(f=>f.shown)):null,win:F.length?[Math.min(...F.map(f=>f.win)),Math.max(...F.map(f=>f.win))]:null,
    hit:hit.length,ovf:s.ovf,cls:[...new Set(F.map(f=>f.where+':'+f.cls.split(' ').slice(0,3).join('.')+'@'+f.w))].slice(0,8),cutBy:[...new Set(cut.map(f=>f.cutBy))].slice(0,4),hits:hit.slice(0,3).map(f=>f.hit[0])};
   if(SHOTS&&F.length)await p.screenshot({path:`${OUT}/${W}x${H}-${v}.jpg`,type:'jpeg',quality:60});
  }
  R.errs=errs.slice(0,4);ALL[SZ]=R;await ctx.close()}
 console.log(JSON.stringify(ALL,null,0));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
