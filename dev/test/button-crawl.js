/* BUTTON CRAWLER (owner 25/11 ~05:10Z, verbatim in dev/OWNER_DECISIONS.md: "cho robot đi bấm từng cái nút cho tôi, make sure là cái nút nào
   cũng work. Và nó phải đưa đến ... nó work cho đúng nha" + "Giống như là người bấm thật chứ không phải là máy bấm").
   A robot REAL-TAPS every visible button of every screen it can reach (dev/test/realtap.js: elementFromPoint hit-check, then a touch /
   mouse tap at the button's on-screen centre; never .click()/dispatchEvent/game functions to PRESS a button) and checks each one:
     hit    — the button's centre point really is the button (not covered by another layer, not off-screen)
     effect — something happened after the tap (a layer opened/closed, the tab changed, the panel/stage text changed, the game state changed)
     right  — the effect matches the label: ✕/Đóng/Thôi… closes its own layer; a tab button shows that tab; nothing throws a JS error
   Screens are explored breadth-first from each START (title screen, a fresh life's home): every button that opens a NEW screen
   (new layer or tab) is followed, up to DEPTH taps deep. Between taps the harness puts the game back (deser(snapshot) + replaying the
   path with real taps) — harness setup only, never a button press.
   usage: node dev/test/button-crawl.js [--dev fold,ipad] [--depth 3] [--start title,home,tour,save] [--save robot-dump.json] [--fast] [--out dir] [--game index.html|URL] [--max N]
     --fast  = gate mode for dev/tools/quickcheck.sh: depth 1 from home + title, Fold only; exit 1 on any FAIL
   output: <out>/crawl-<dev>.json (every tap) + <out>/shots/*.jpg (every FAIL; shots never go in git) ; summary line last.
   Report table: node dev/test/button-crawl.js --report <out> > dev/handover/reports/button-crawl.md */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const RT=require('./realtap.js'); /* the ONE shared real-tap lib (review/robot-realtap); no private copy (laws 9/11) */
/* adapter: the crawler's call shape tap(page,target,{screen,label,shot,log}) → RT.make(page).tap(target,{screen,label});
   a refused tap is reported to the caller as «DEAD BUTTON {json}» (why = covered / clipped / gone / disabled / popup) */
const RTS=new WeakMap();
async function tap(p,target,o={}){let rt=RTS.get(p);if(!rt){rt={cur:null};rt.rt=RT.make(p,{log:d=>{if(rt.cur)rt.cur(d)}});RTS.set(p,rt)}
 try{const el0=target&&target.asElement?target.asElement():null;if(el0)await el0.evaluate(e=>{window.__bcLast=e})}catch(e){}
 let got=null;rt.cur=d=>{if(d&&d.k!=='tap')got=d};let ok=await rt.rt.tap(target,{screen:o.screen,label:o.label});
 /* a button clipped by a HORIZONTAL kit tab row (Tư trang sub-tabs, Sổ ghi origin rows): a person swipes the row with a finger until it shows — real touch gesture (CDP), up to 6 swipes, then tap again */
 for(let sw=0;!ok&&got&&got.k==='clipped'&&sw<6;sw++){
  const info=await p.evaluate(()=>{const e=window.__bcLast;if(!e||!e.isConnected)return null;const r=e.getBoundingClientRect();for(let s=e.parentElement;s&&s!==document.body;s=s.parentElement){const cs=getComputedStyle(s);if(/(auto|scroll)/.test(cs.overflowX)&&s.scrollWidth>s.clientWidth+2){const q=s.getBoundingClientRect();if(q.height<1||q.top>innerHeight||q.bottom<0)return null;const left=r.left<q.left+4;return{x:Math.max(1,Math.min(innerWidth-1,q.left+q.width/2)),y:Math.max(1,Math.min(innerHeight-1,q.top+Math.min(q.height,innerHeight-q.top)/2)),dx:left?-Math.min(q.width*.6,Math.abs(r.left-q.left)+40):Math.min(q.width*.6,r.right-q.right+40)}}}return null}).catch(()=>null);
  if(process.env.BCDBG)console.log('SWIPE?',o.label,JSON.stringify(info),JSON.stringify(await p.evaluate(()=>{const e=window.__bcLast;const o=[];for(let s=e&&e.parentElement;s&&s!==document.body;s=s.parentElement){const cs=getComputedStyle(s),q=s.getBoundingClientRect();o.push(s.tagName+'.'+String(s.className).slice(0,30)+' ox='+cs.overflowX+' oy='+cs.overflowY+' sw='+s.scrollWidth+'/'+s.clientWidth+' sh='+s.scrollHeight+'/'+s.clientHeight+' top='+Math.round(q.top)+' bot='+Math.round(q.bottom))}const r=e.getBoundingClientRect();return{r:[r.left,r.top,r.right,r.bottom].map(Math.round),o:o.slice(0,6)}}).catch(er=>String(er).slice(0,200))));
  if(!info)break;
  try{const cdp=await p.context().newCDPSession(p);await cdp.send('Input.synthesizeScrollGesture',{x:info.x,y:info.y,xDistance:-info.dx,gestureSourceType:'touch',speed:700});await cdp.detach()}catch(e){break}
  await p.waitForTimeout(350);got=null;ok=await rt.rt.tap(target,{screen:o.screen,label:o.label})}
 rt.cur=null;
 if(!ok){const why=!got?'not tappable':got.k==='DEAD BUTTON'?(got.cover==='not in page'?'not found':'covered'):got.k;
  if(o.shot)await p.screenshot({path:o.shot,type:'jpeg',quality:55}).catch(()=>{});
  (o.log||(m=>console.log(m)))('DEAD BUTTON '+JSON.stringify({screen:o.screen||'',label:o.label||'',why,cover:got&&got.cover||''}))}
 return ok}
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]&&!A[i+1].startsWith('--')?A[i+1]:true)};
const REPO=path.join(__dirname,'..','..');
const FAST=!!opt('fast',false);
const OUT=path.resolve(opt('out','/home/user/wt/bc-out/run'));
const DEVS={fold:[755,1000],ipad:[1180,820]};
const DEV=String(opt('dev',FAST?'fold':'fold,ipad')).split(',').filter(d=>DEVS[d]);
const DEPTH=+opt('depth',FAST?1:3),MAXTAPS=+opt('max',FAST?80:100000);
const STARTS=String(opt('start',FAST?'home':'title,home,tour')).split(',');
const GAME=opt('game',path.join(REPO,'index.html'));
/* pictures load as she sees them (layout depends on them; --noimg blocks them for speed); sound/video are blocked */
const BLOCK=opt('noimg',false)?/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i:/\.(mp3|ogg|m4a|mp4|webm)(\?|$)/i;
const NOISE=/Failed to load resource|net::ERR_|Fetch API cannot load|ERR_FAILED|ERR_ABORTED/;
if(opt('report',false))return report(path.resolve(opt('report')));
fs.mkdirSync(path.join(OUT,'shots'),{recursive:true});
function serve(file){const http=require('http');const root=path.dirname(path.resolve(file)),idx=path.basename(file);
 const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css','.webmanifest':'application/manifest+json'};
 return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);
  if(!f.startsWith(root)){r.writeHead(403);return r.end()}fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})});
  sv.listen(0,'127.0.0.1',()=>{sv.unref();res('http://127.0.0.1:'+sv.address().port+'/'+idx)})})}

/* ---------- in-page helpers (read-only: they look, they never press) ---------- */
const INPAGE=()=>{
 const W=window;
 W.__bc={
  isFixedRoot(e){const cs=getComputedStyle(e);return cs.position==='fixed'||e.id==='modal'||e.id==='title'||e.tagName==='DIALOG'},
  root(e){let x=e;while(x&&x!==document.body){if(this.isFixedRoot(x))return x;x=x.parentElement}return document.body},
  vis(e){if(!e.isConnected||e.closest('[hidden]'))return false;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0)return false;
   const r=e.getBoundingClientRect();return r.width>=4&&r.height>=4},
  desc(e){return e?(e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(typeof e.className==='string'&&e.className.trim()?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):'')):'none'},
  label(e){let t=(e.getAttribute('aria-label')||'').trim();if(!t)t=(e.innerText||e.textContent||'').replace(/\s+/g,' ').trim();if(!t)t=e.title||'';
   if(!t){const im=e.querySelector('img[alt]');if(im)t=im.alt}return t.slice(0,48)},
  /* a layer is LIVE when the player can see/touch it: most of its on-screen sample points hit the layer itself */
  live(root){const r=root===document.body?{left:0,top:0,right:innerWidth,bottom:innerHeight}:root.getBoundingClientRect();
   const x0=Math.max(0,r.left),x1=Math.min(innerWidth,r.right),y0=Math.max(0,r.top),y1=Math.min(innerHeight,r.bottom);if(x1-x0<4||y1-y0<4)return false;
   let n=0,h=0;for(const fx of [.1,.3,.5,.7,.9])for(const fy of [.1,.3,.5,.7,.9]){const t=document.elementFromPoint(x0+(x1-x0)*fx,y0+(y1-y0)*fy);if(!t)continue;n++;if(this.root(t)===root)h++}
   return n>0&&h/n>=.3},
  cands(){const sel='button,[role=button],a[href],[onclick],[data-tab],input[type=checkbox],input[type=radio],select,summary';
   const out=[];const seen=new Set();this.fixed=[];
   for(const e of document.querySelectorAll('body *')){
    if(this.isFixedRoot(e)&&this.vis(e)&&(e.innerText||'').trim()&&getComputedStyle(e).pointerEvents!=='none'&&!this.root(e.parentElement||document.body).hidden)this.fixed.push(e);
    let ok=e.matches(sel);
    if(!ok){const cs=getComputedStyle(e);ok=cs.cursor==='pointer'&&e.parentElement&&getComputedStyle(e.parentElement).cursor!=='pointer'}
    if(!ok||!this.vis(e))continue;
    if(e.disabled||e.getAttribute('aria-disabled')==='true')continue;
    /* a pointer child of a button is the button */
    /* a pointer child of a real button is that button (a big clickable container such as #panel is not a button: its buttons count one by one) */
    const up=e.parentElement&&e.parentElement.closest('button,[role=button],a[href],summary');if(up&&up!==e&&this.vis(up))continue;
    {const r=e.getBoundingClientRect();if(!e.matches('button,[role=button],a[href],input,select,summary')&&r.width*r.height>innerWidth*innerHeight*.35)continue}
    if(seen.has(e))continue;seen.add(e);out.push(e)}
   return out},
  liveRoots(){const roots=new Set(this.cands().map(e=>this.root(e)));for(const f of this.fixed)if(this.root(f)===f)roots.add(f);return [...roots].filter(r=>this.live(r))},
  /* the buttons on screen now: in a live layer (a button behind an open dialog is not on screen) */
  list(){document.querySelectorAll('[data-bc]').forEach(e=>e.removeAttribute('data-bc'));const lr=new Set(this.liveRoots());const L=[];const cnt={};
   for(const e of this.cands()){const rt=this.root(e);if(!lr.has(rt))continue;
    const rd=rt===document.body?'body':rt.tagName.toLowerCase()+(rt.id?'#'+rt.id:(typeof rt.className==='string'&&rt.className.trim()?'.'+rt.className.trim().split(/\s+/)[0]:''));
    const key=rd+'|'+e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+'|'+this.label(e);cnt[key]=(cnt[key]||0)+1;
    e.setAttribute('data-bc',key+'#'+cnt[key]);L.push({key:key+'#'+cnt[key],label:this.label(e),el:this.desc(e),layer:rd,tab:e.getAttribute('data-tab')||'',on:e.matches('.on,.sel,.active,[aria-selected=true],[aria-pressed=true]'),inPanel:!!e.closest('#panel,#stage,.stage'),rk:rt===document.body?'body':this.rootKey(rt),x:e.matches('.kit-x')||/^(✕|×|x)$/i.test(this.label(e))})}
   return L},
  /* a loading / scene veil the player waits for (not a button layer) */
  busy(){return [...document.querySelectorAll('#klife,#kload,#kroul,#kroulw,#dawn,.kload')].some(e=>this.vis(e))},
  /* the same button after a restore: exact key, else the same layer/element with the label's numbers and «(có mới)» ignored */
  find(key){const A=[...document.querySelectorAll('[data-bc]')].filter(e=>this.vis(e));const ex=A.find(e=>e.getAttribute('data-bc')===key);if(ex)return ex;
   const norm=k=>k.replace(/#\d+$/,'').replace(/\(có mới\)/g,'').replace(/[\d.,/]+/g,'9').replace(/\s+/g,' ').trim();const nk=norm(key),n=+(key.match(/#(\d+)$/)||[0,1])[1];
   const M=A.filter(e=>norm(e.getAttribute('data-bc'))===nk);return M[n-1]||M[0]||null},
  rootKey(r){const h=r.querySelector('h1,h2,h3,.kt,.ttl,.title,header');return this.desc(r)+':'+((h&&h.innerText)||r.innerText||'').replace(/\s+/g,' ').trim().slice(0,40)},
  sig(){const roots=this.liveRoots().map(r=>this.rootKey(r));
   const tab=(document.querySelector('#tabs .on,#tabs [aria-selected=true]')||{}).getAttribute?.('data-tab')||'';
   let sh='';try{if(typeof S!=='undefined'&&S){const s=JSON.stringify(S);let h=0;for(let i=0;i<s.length;i+=7)h=(h*31+s.charCodeAt(i))|0;sh=s.length+':'+h}}catch(e){}
   /* whole page text + which things are marked on/selected (a filter tab, a picked card) */
   const onS=[...document.querySelectorAll('.on,.sel,.active,.picked,[aria-selected=true],[aria-pressed=true],:checked')].filter(e=>this.vis(e)).map(e=>this.desc(e)+(e.innerText||'').slice(0,12)).join(',');
   const txt=(document.body.innerText||'')+onS;let th=0;for(let i=0;i<txt.length;i++)th=(th*31+txt.charCodeAt(i))|0;
   const pn=document.getElementById('panel');let panel='';if(pn&&this.vis(pn)){const t=(pn.className+'|'+(pn.firstElementChild?pn.firstElementChild.className:'')+'|'+(pn.innerText||'').slice(0,80));let h=0;for(let i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))|0;panel=String(h)}
   /* moved / zoomed / resized things (a map zoom, a slider) show only in inline styles */
   let sty=0;{const R=[document.getElementById('panel'),...this.liveRoots().filter(r=>r!==document.body)].filter(Boolean);let n=0;for(const r of R)for(const e of r.querySelectorAll('[style]')){if(++n>600)break;const t=e.getAttribute('style');for(let i=0;i<t.length;i++)sty=(sty*31+t.charCodeAt(i))|0}}
   let kg='';try{const g=document.getElementById('kg82')||document.querySelector('#ov .kgame');if(typeof KG82!=='undefined'&&g&&this.vis(g))kg=KG82.phase||(KG82.setup?'setup':'intro')}catch(e){}
   return{roots:roots.sort(),tab,panel,kg,sty,S:sh,txt:txt.length+':'+th,title:!!(document.getElementById('title')&&!document.getElementById('title').hidden),q:(typeof Q!=='undefined'&&Q||[]).length}},
  baseline(){this.base=new Set([...document.body.children]);this.hid=[...document.querySelectorAll('[id]')].filter(e=>this.isFixedRoot(e)).map(e=>[e,e.hidden])},
  /* the sub-tab picks of the panes (Tư trang / Dư đồ / Tài nghệ… : KTSUB + localStorage ctm-ktsub-*, KINV_SUB hclh-inv-sub, hclh-kcat-*) are
     viewer memory, not the save: a restore puts them back too, so a path through a sub-tab replays (fix-1-r3, the SKIP gap of full6) */
  UIK:/^(ctm-ktsub-|hclh-inv-sub|hclh-kcat-|hclh-kinv-|hclh-kg-|ctm-chonso-tab)/,
  uiSnap(){const o={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(this.UIK.test(k))o[k]=localStorage.getItem(k)}}catch(e){}
   let kt=null,ki=null;try{kt=JSON.stringify(KTSUB)}catch(e){}try{ki=KINV_SUB}catch(e){}this.ui={ls:o,kt,ki}},
  uiRestore(){const u=this.ui;if(!u)return;try{const del=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(this.UIK.test(k)&&!(k in u.ls))del.push(k)}del.forEach(k=>localStorage.removeItem(k));for(const k in u.ls)localStorage.setItem(k,u.ls[k])}catch(e){}
   try{if(u.kt!=null){const o=JSON.parse(u.kt);for(const k of Object.keys(KTSUB))if(!(k in o))delete KTSUB[k];Object.assign(KTSUB,o)}}catch(e){}try{if(u.ki!=null)KINV_SUB=u.ki}catch(e){}},
  snap(){this.sv=JSON.stringify(ser());this.uiSnap();this.baseline();this.list();this.homeLive=new Set(this.liveRoots());this.homeSig=JSON.stringify(this.sig().roots.map(r=>r.split(':')[0]))},
  /* after a restore: the screen must look like the snapshot's (same live layers) */
  isHome(){this.list();return JSON.stringify(this.sig().roots.map(r=>r.split(':')[0]))===this.homeSig},
  /* harness restore (setup, not a tap): state back to the snapshot, extra layers gone */
  restore(withTitle){try{Q.length=0}catch(e){}
   for(const c of [...document.body.children])if(!this.base.has(c)&&c.tagName!=='SCRIPT')c.remove();
   for(const [e,h] of this.hid)e.hidden=h;
   document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul').forEach(e=>e.remove());
   document.querySelectorAll('.kpop').forEach(e=>{if(this.base.has(e))e.hidden=true;else e.remove()});
   this.uiRestore();
   if(this.sv){deser(JSON.parse(this.sv));try{if(S)S.mg=null}catch(e){}}
   try{tab='act';K3SH.home=true}catch(e){}
   document.getElementById('modal').hidden=true;
   const T=document.getElementById('title');if(T)T.hidden=!withTitle;if(withTitle&&window.showTitle)showTitle();if(typeof S!=='undefined'&&S){render();try{k3Home()}catch(e){}}window.scrollTo(0,0);
   /* any other frame still showing (one the game re-uses, not removed above) is put away */
   if(!withTitle&&this.homeLive){this.list();for(const r of this.liveRoots())if(!this.homeLive.has(r)&&r!==document.body){if(this.base.has(r)||r.id)r.hidden=true;else r.remove()}}}
 }};

/* ---------- node side ---------- */
async function settle(p,ms=8000){const t=Date.now();while(Date.now()-t<ms){const b=await p.evaluate(()=>__bc.busy()).catch(()=>false);if(!b)return Date.now()-t;await p.waitForTimeout(250)}return -1}
const rows=[];let taps=0,hard=0;
function verdict(b,pre,post,errs,closedOwn,par){
 if(errs.length)return['FAIL','JS error: '+errs[0].slice(0,120)];
 const changed=JSON.stringify(pre)!==JSON.stringify(post);
 const closeLike=b.x||/^(Đóng|Thôi|Bỏ qua|Quay lại|Trở về|Về|Hủy|Huỷ|Để sau|Xong|Đã hiểu|Biết rồi|Lui)$/i.test(b.label);
 const backTo=par&&JSON.stringify(post.roots)===JSON.stringify(par.roots);
 /* KIT §13.9: the ✕ «Quay lại» of a mini-game frame gives up = the caller's own lose RESULT; it must never start the board / open the next screen */
 if(closeLike&&!closedOwn&&pre.kg!==''&&(post.kg==='result'||post.S!==pre.S))return['PASS','gave up → the game ended with its lose result (KIT §13.9)'];
 if(closeLike)return closedOwn?['PASS','closed its layer']:backTo?['PASS','back to the screen before']:(changed?['FAIL','close button did not close its layer (something else changed)']:['FAIL','close button: nothing happened']);
 if(b.tab)return post.tab===b.tab||pre.tab===b.tab&&changed?['PASS','tab '+b.tab+' shown']:changed?['WARN','tab button changed the screen but tab '+b.tab+' not marked on']:['FAIL','tab button: nothing happened'];
 if(!changed&&b.on)return['PASS','already on (tapping the shown tab/choice again changes nothing)'];
 if(!changed)return['FAIL','no effect (screen and state unchanged)'];
 const what=[];if(JSON.stringify(pre.roots)!==JSON.stringify(post.roots))what.push('layer');if(pre.tab!==post.tab)what.push('tab');if(pre.txt!==post.txt)what.push('text');if(pre.S!==post.S)what.push('state');if(pre.sty!==post.sty)what.push('moved');if(post.self)what.push('toggled');if(pre.title!==post.title)what.push('title');
 return['PASS',what.join('+')]}

/* START tour: a brand-new player's first life — the 12-step LỜI DẶN tour. Every «Tiếp»/«Đã hiểu» must turn the page; a step with no
   «Tiếp» waits for her to tap the lit spot: the robot taps the centre of the hole (the lit button must be reachable there). Then a second
   fresh life checks «Bỏ qua lời dặn» closes the tour. */
async function crawlTour(p,dev,ER){
 /* a brand-new player: title → «Chơi một mình» → every first-life screen, by real taps on the main button of each screen; every tap logged */
 const fresh=async(log)=>{await p.evaluate(()=>{try{localStorage.clear();localStorage.setItem('hclh-tut-test','1')/* jtut autoOk(): a webdriver page gets the tour only with the test flag (a real phone has no webdriver) */}catch(e){}try{REC.tour='';REC.asked=0}catch(e){}document.querySelectorAll('#kload,#klife').forEach(e=>e.remove());
   document.getElementById('modal').hidden=true;const T=document.getElementById('title');T.hidden=false;showTitle()});
  const PRIM=/^(Chơi một mình|Tiếp|Vào cung|Nhập cung|Bắt đầu|Quay|Gieo|Xem|Được|Đã hiểu|Nhận|Đi|Vào)/;
  let last='';const tried={};for(let k=0;k<90;k++){await settle(p,6000);await p.waitForTimeout(300);
   if(await p.evaluate(()=>{const t=document.getElementById('ktut');return !!t&&!t.hidden&&!!t.querySelector('.ktut-card')}))return true;
   let L=await p.evaluate(()=>__bc.list());
   /* a screen one tap deeper: tap only what is NEW on it (the new frame's buttons; for a new tab, the buttons of its panel) —
      the buttons it shares with the screen it came from were tapped there already */
   const roots=await p.evaluate(()=>__bc.sig().roots);
   const atHome=async()=>p.evaluate(()=>{const m=document.getElementById('modal'),T=document.getElementById('title'),n=document.getElementById('next');
    return m.hidden&&T.hidden&&!(typeof Q!=='undefined'&&Q||[]).length&&(typeof S!=='undefined'&&!!S)&&!!n&&__bc.vis(n)&&![...document.querySelectorAll('#kroul,#ov,.kmov,#kprevov,#klife,#kload')].some(e=>__bc.vis(e))});
   if(process.env.BCDBG)console.log('ATHOME?',JSON.stringify(await p.evaluate(()=>{const m=document.getElementById('modal'),T=document.getElementById('title'),n=document.getElementById('next');return{m:m.hidden,T:T.hidden,Q:(typeof Q!=='undefined'&&Q||[]).length,S:(typeof S!=='undefined'&&!!S),n:!!n&&__bc.vis(n),ov:[...document.querySelectorAll('#kroul,#ov,.kmov,#kprevov,#klife,#kload')].filter(e=>__bc.vis(e)).map(e=>__bc.desc(e))}})));
   if(await atHome()&&(await p.waitForTimeout(2000),await atHome())){ /* home reached: the tour comes by itself for a new player, else ☰ → «Xem lại lời dặn» */
    for(let i=0;i<24;i++){if(await p.evaluate(()=>{const t=document.getElementById('ktut');return !!t&&!t.hidden&&!!t.querySelector('.ktut-card')}))return true;await p.waitForTimeout(250)}
    if(log)rows.push({dev,start:'newlife',screen:'first life · home',label:'(LỜI DẶN tour)',hit:'-',verdict:'WARN',why:'the tour did not open by itself on a new player\'s first home screen (6 s) — opened from ☰ «Xem lại lời dặn»'});
    await tap(p,'#menu',{log:()=>{}});await p.waitForTimeout(600);
    const xb=await p.evaluateHandle(()=>[...document.querySelectorAll('#modal button')].find(b=>/Xem lại lời dặn/.test(b.innerText)));
    if(xb.asElement()){const pre=await p.evaluate(()=>__bc.sig());let dm='';const ok=await tap(p,xb.asElement(),{log:m=>dm=m});let t=false;
     for(let i=0;i<30&&!t;i++){await p.waitForTimeout(250);t=await p.evaluate(()=>{const t=document.getElementById('ktut');return !!t&&!t.hidden&&!!t.querySelector('.ktut-card')})}
     if(!t)await p.screenshot({path:path.join(OUT,'shots',dev+'-tour-replay.jpg'),type:'jpeg',quality:50});
     if(log)rows.push({dev,start:'newlife',screen:'☰ menu',label:'Xem lại lời dặn',hit:ok?'ok':'DEAD',verdict:t?'PASS':'FAIL',why:t?'tour opened':ok?'tour did not open':dm});return t}
    return false}
   if(!L.length){await p.waitForTimeout(500);continue}
   const sk=roots.join();tried[sk]=tried[sk]||new Set();const U=L.filter(b=>!tried[sk].has(b.key));if(!U.length)break;
   const CLOSE=/^(✕|Lui|Đóng|Quay lại|Xong)$/;const pick=U.find(b=>/^Nhận thân phận/.test(b.label))||U.find(b=>PRIM.test(b.label)&&b.layer!=='body')||U.find(b=>PRIM.test(b.label))||U.find(b=>CLOSE.test(b.label)&&b.layer!=='body')||U.find(b=>b.layer!=='body'&&b.label)||U.find(b=>b.layer!=='body')||U[0]; /* a look-up dialog opened by the way is closed like a player does, so the first home screen is reached */tried[sk].add(pick.key);
   if(roots.join()===last&&pick.label==='Sang buổi'){break}
   const h=await p.evaluateHandle(k=>__bc.find(k),pick.key);const screen='first life · '+(roots[roots.length-1]||'').slice(0,50);
   const pre=await p.evaluate(()=>__bc.sig());ER.clr();let dm='';const shot=path.join(OUT,'shots',`${dev}-new-${k}.jpg`);
   const ok=await tap(p,h.asElement(),{screen,label:pick.label,shot,log:m=>dm=m});taps++;await p.waitForTimeout(600);await settle(p,6000);
   const post=await p.evaluate(()=>__bc.sig());const ch=JSON.stringify(pre)!==JSON.stringify(post);const er=ER.get();
   if(log)rows.push({dev,start:'newlife',screen,label:pick.label,hit:ok?'ok':'DEAD',verdict:!ok||er.length||!ch?'FAIL':'PASS',why:!ok?dm:er.length?'JS error: '+er[0]:ch?'next screen':'no effect',shot:ok&&ch&&!er.length?'':shot});
   if((!ok||!ch)&&log)await p.screenshot({path:shot,type:'jpeg',quality:55});
   last=roots.join()}
  return false};
 const card=()=>p.evaluate(()=>{const t=document.getElementById('ktut');if(!t||t.hidden)return null;const c=t.querySelector('.ktut-card');if(!c)return null;
  const h=(c.querySelector('h1,h2,h3,.kt,.ttl')||c).innerText.replace(/\s+/g,' ').trim().slice(0,60);const sub=(c.innerText.match(/lời dặn \d+\/\d+|trang \d+\/\d+/g)||[]).join(' ');
  const hole=t.querySelector('.ktut-hole:not([hidden])');const hr=hole&&hole.getBoundingClientRect();
  return{h,sub,btns:[...c.querySelectorAll('button')].filter(b=>__bc.vis(b)).map(b=>b.innerText.trim()),hole:hr&&hr.width>4?{x:hr.left+hr.width/2,y:hr.top+hr.height/2}:null}});
 if(!(await fresh(true))){await p.screenshot({path:path.join(OUT,'shots',dev+'-tour-none.jpg'),type:'jpeg',quality:50});rows.push({dev,start:'tour',screen:'LỜI DẶN tour',label:'(tour start)',verdict:'FAIL',why:'tour did not open on a first life'});return}
 for(let i=0;i<60;i++){await settle(p,4000);let c=await card();/* between two lessons the card is down for a short pause (lesson 4/12 → 5/12 on Fold): wait ≤4.2 s */for(let w=0;w<14&&!c;w++){await p.waitForTimeout(300);c=await card()}if(!c)break;ER.clr();const screen='LỜI DẶN · '+c.h+' · '+c.sub;
  const nx=c.btns.find(t=>/^(Tiếp|Đã hiểu)$/.test(t));
  if(nx){const h=await p.evaluateHandle(t=>[...document.querySelectorAll('#ktut .ktut-card button')].find(b=>b.innerText.trim()===t),nx);
   const shot=path.join(OUT,'shots',`${dev}-tour-${i}.jpg`);let dm='';const ok=await tap(p,h.asElement(),{screen,label:nx,shot,log:m=>dm=m});taps++;
   if(!ok){rows.push({dev,start:'tour',screen,label:nx,hit:'DEAD',verdict:'FAIL',why:dm,shot});break}
   let c2=null,moved=false;for(let w=0;w<12&&!moved;w++){await p.waitForTimeout(300);c2=await card();moved=!c2||c2.h!==c.h||c2.sub!==c.sub}const er=ER.get(); /* the last page of a lesson closes the card and the next lesson comes after a short pause */
   rows.push({dev,start:'tour',screen,label:nx,hit:'ok',verdict:er.length?'FAIL':moved?'PASS':'FAIL',why:er.length?'JS error: '+er[0]:moved?(c2?'next page':'tour closed'):'page did not turn',shot:moved&&!er.length?'':shot});
   if(!moved&&!er.length)await p.screenshot({path:shot,type:'jpeg',quality:55});if(!moved)break;continue}
  /* a tap lesson (no Tiếp): the lit hole grows from 0×0 to the target over its .28 s move after the lesson scrolls the target in —
     read it again until it has a size (fix-1-r3: iPad lesson 5/12 «Làm thử một việc» was read mid-move and called «no lit spot») */
  for(let w=0;w<10&&!c.hole;w++){await p.waitForTimeout(300);const c2=await card();if(!c2||c2.h!==c.h||c2.sub!==c.sub)break;c=c2}
  if(c.hole){for(let w=0;w<8;w++){await p.waitForTimeout(350);const c2=await card();if(!c2||!c2.hole||c2.h!==c.h||c2.sub!==c.sub)break;const same=JSON.stringify(c2.hole)===JSON.stringify(c.hole);c=c2;if(same)break}} /* hole still moving (.28 s grow from its old spot): read it again until it holds still */
  if(c.hole){ /* tap the lit spot like a player */
   const hit=await p.evaluate(({x,y})=>{const t=document.elementFromPoint(x,y);return t?__bc.desc(t)+' «'+(t.innerText||'').replace(/\s+/g,' ').trim().slice(0,30)+'»':'none'},c.hole);
   const blocked=/ktut-blk|ktut-dim|#ktut/.test(hit);const shot=path.join(OUT,'shots',`${dev}-tour-${i}.jpg`);
   if(blocked){await p.screenshot({path:shot,type:'jpeg',quality:55});rows.push({dev,start:'tour',screen,label:'(lit spot)',hit:'DEAD',verdict:'FAIL',why:'the lit spot is covered: '+hit,shot});break}
   await p.touchscreen.tap(c.hole.x,c.hole.y);taps++;await p.waitForTimeout(700);const c2=await card();const moved=!c2||c2.h!==c.h||c2.sub!==c.sub;
   rows.push({dev,start:'tour',screen,label:'(lit spot) '+hit,hit:'ok',verdict:moved?'PASS':'FAIL',why:moved?'tour went on':'tapping the lit spot did not move the tour',shot:moved?'':shot});
   if(!moved){await p.screenshot({path:shot,type:'jpeg',quality:55});break}continue}
  const dbg=await p.evaluate(()=>{const t=document.getElementById('ktut');const h=t&&t.querySelector('.ktut-hole');const acts=[...document.querySelectorAll('#panel .cards button.ka')];
   return {hole:h?(h.hidden?'hidden':JSON.stringify(h.getBoundingClientRect())):'none',acts:acts.length,visActs:acts.filter(b=>__bc.vis(b)).length,dis:acts.filter(b=>b.disabled||b.classList.contains('kdis')).length,tab:(document.querySelector('.tabs .on,.ktab.on,[aria-selected=true]')||{}).textContent}});
  const shot=path.join(OUT,'shots',`${dev}-tour-${i}.jpg`);await p.screenshot({path:shot,type:'jpeg',quality:55});
  rows.push({dev,start:'tour',screen,label:'(none)',verdict:'FAIL',why:'tour card with no Tiếp and no lit spot: '+c.btns.join(',')+' · '+JSON.stringify(dbg),shot});break}
 /* Bỏ qua lời dặn closes it */
 if(await fresh()){const h=await p.evaluateHandle(()=>[...document.querySelectorAll('#ktut .ktut-card button')].find(b=>/Bỏ qua/.test(b.innerText)));const shot=path.join(OUT,'shots',`${dev}-tour-skip.jpg`);
  let dm='';const ok=await tap(p,h.asElement(),{screen:'LỜI DẶN',label:'Bỏ qua lời dặn',shot,log:m=>dm=m});taps++;await p.waitForTimeout(600);const c2=await card();
  rows.push({dev,start:'tour',screen:'LỜI DẶN · first page',label:'Bỏ qua lời dặn',hit:ok?'ok':'DEAD',verdict:ok&&!c2?'PASS':'FAIL',why:!ok?dm:c2?'tour still open':'tour closed',shot:ok&&!c2?'':shot})}
}
async function crawlDev(b,URL,dev){
 const [w,h]=DEVS[dev];
 const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:dev==='fold',deviceScaleFactor:1,serviceWorkers:'block'});
 let p,errs=[];const errsRef={get:()=>errs,clr:()=>{errs=[]}};
 async function open(){p=await ctx.newPage();await p.route(BLOCK,r=>r.abort());
  p.on('pageerror',e=>errs.push(e.message+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(0,80)));
  p.on('console',m=>{if(m.type()==='error'&&!NOISE.test(m.text()))errs.push('console.error: '+m.text().slice(0,150))});
  p.on('dialog',d=>d.dismiss().catch(()=>{}));p.on('crash',()=>console.log('PAGE CRASH ('+dev+')'));p.on('close',()=>{if(!global.__bcEnd)console.log('PAGE CLOSED ('+dev+')')});/* ROLE B #6: the crawler's own ctx.close() at the end is not a fault */
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof showTitle==='function',null,{timeout:180000});
  await p.waitForTimeout(1500);await p.evaluate(INPAGE)}
 await open();
 const startState={};
 /* START title: the title screen as she sees it on opening (first-load picture dialog removed = second visit) */
 startState.title=async()=>{await p.evaluate(()=>{if(window.__tRoul0){kitRoulette=window.__tRoul0;window.__tRoul0=null}/* the title crawl starts lives by real taps: the real roulette is part of what is checked */try{localStorage.clear()}catch(e){}document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());__bc.sv=null;__bc.baseline();__bc.restore(true)})};
 /* START home: a fresh life (solo), first buổi, home screen */
 startState.home=async()=>{await p.evaluate(()=>{if(typeof kitRoulette==='function'&&!window.__tRoul0){window.__tRoul0=kitRoulette;kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}/* TEST SETUP ONLY (lc15 QC, #kroul race): the new-life roulette waits for its pictures (≤8 s) before it builds #kroul, so under CPU load it landed AFTER this setup removed the veils and covered the home screen (false «dead button under div#kroul»); a JS-started life skips it */try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  /* the first-life LỜI DẶN tour is crawled on its own (START tour); here it counts as already seen */
  try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}
  for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}try{S.tutTour=1;coachOff&&coachOff()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;
  document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());render()});
  /* the life-start veils (roulette, «Sửa soạn nhập cung») can come a moment later: wait for them, take them down, then snapshot */
  await p.waitForTimeout(2500);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render();__bc.snap()})};
 /* START save (--save <robot dump with .ls>): a mid-life robot save (later ranks, more tabs) loaded through the game's own slot loader */
 const SAVE=opt('save',false);const SAVELS=SAVE?JSON.parse(fs.readFileSync(path.resolve(SAVE),'utf8')).ls:null;
 startState.save=SAVELS&&(async()=>{await p.evaluate(ls=>{try{localStorage.clear();for(const k in ls)localStorage.setItem(k,ls[k])}catch(e){}try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}
  const n=+(ls['hclh-slot']||1)||1;const d=loadSlot(n);SLOT=n;try{kmReset&&kmReset()}catch(e){}quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;deal();render();if(S.mg)S.mg=null;/* = j6 data-load handler (setup only) */try{S.tutTour=1;coachOff&&coachOff()}catch(e){}},SAVELS);
  await p.waitForTimeout(3000);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,.kmov').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render();try{k3Home()}catch(e){}__bc.snap()})});
 for(const st of STARTS){if(st==='tour'){await crawlTour(p,dev,errsRef);continue}if(!startState[st])continue;
  await startState[st]();await p.waitForTimeout(600);
  const withTitle=st==='title';
  const goto=async(pathK)=>{ /* restore + replay a path of real taps */
   if(p.isClosed()||!(await p.evaluate(()=>!!window.__bc).catch(()=>false))){await open();await startState[st]()}
   if(withTitle){await p.reload({waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof showTitle==='function',null,{timeout:180000});await p.waitForTimeout(1200);await p.evaluate(INPAGE);await startState.title()}
   else{await p.evaluate(t=>__bc.restore(t),withTitle);await p.waitForTimeout(150);await settle(p);
    if(!(await p.evaluate(()=>__bc.isHome()))){ /* soft restore left a frame up: reload the page and load the same snapshot (harness) */
     const sv=await p.evaluate(()=>__bc.sv);hard++;
     await p.reload({waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof deser==='function',null,{timeout:180000});await p.waitForTimeout(1200);await p.evaluate(INPAGE);
     await p.evaluate(sv=>{try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}document.getElementById('title').hidden=true;document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());
      deser(JSON.parse(sv));try{S.tutTour=1}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;render();try{k3Home()}catch(e){}},sv);
     await p.waitForTimeout(2500);await p.evaluate(sv=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render();__bc.sv=sv;__bc.snap();__bc.sv=sv},sv)}}
   await p.waitForTimeout(150);await settle(p);
   /* back to the room the way she does it: tap «Về phòng» when the restore left a panel open */
   if(!withTitle&&await p.evaluate(()=>{const e=document.getElementById('k3room');return !!e&&__bc.vis(e)}))await tap(p,'#k3room',{log:()=>{}});
   for(const k of pathK){await p.evaluate(()=>__bc.list());const h=await p.evaluateHandle(k=>__bc.find(k),k);const el=h.asElement();
    const fsh=path.join(OUT,'shots',`${dev}-replay-${rows.length}.jpg`);
    if(!el){await p.screenshot({path:fsh,type:'jpeg',quality:50}).catch(()=>{});const vis=await p.evaluate(()=>__bc.list().map(x=>x.label).slice(0,12).join(' ; '));return 'path button gone: '+k+' · on screen: '+vis+' · '+fsh}
    let dm='';const ok=await tap(p,el,{screen:dev,label:k,shot:fsh,log:m=>{dm=m}});if(!ok)return 'path button not tappable: '+k+' '+dm;await p.waitForTimeout(700);await settle(p)}
   return ''};
  const seen=new Set();const queue=[[]];const parentOf=new Map();
  while(queue.length&&taps<MAXTAPS){const pathK=queue.shift();const par=parentOf.get(pathK.join('>'))||null;
   const g=await goto(pathK);if(g){rows.push({dev,start:st,path:pathK,label:'(replay)',verdict:'SKIP',why:g});continue}
   const sig0=await p.evaluate(()=>__bc.sig());const topL=sig0.roots.filter(r=>!r.startsWith('body'));const sk=topL.length?JSON.stringify(topL):JSON.stringify([sig0.roots.map(r=>r.startsWith('body')?'body':r),sig0.tab,sig0.panel,sig0.title]);/* a frame on top = the same screen whatever tab lies under it */
   if(seen.has(sk)&&pathK.length){continue}seen.add(sk);
   let L=await p.evaluate(()=>__bc.list());
   /* a screen one tap deeper: tap only what is NEW on it (the new frame's buttons; for a new tab, the buttons of its panel) —
      the buttons it shares with the screen it came from were tapped there already */
   if(par){const pd=new Set(par.roots.map(r=>r.startsWith('body')?'body':r));const tabNew=par.tab!==sig0.tab||par.panel!==sig0.panel;
    if(process.env.BCDBG)console.log('FILTER',JSON.stringify({pd:[...pd],tabNew,pp:par.panel,sp:sig0.panel,sample:L.slice(0,40).map(b=>[b.label.slice(0,12),b.rk.slice(0,30),b.inPanel])}));
    L=L.filter(b=>!pd.has(b.rk)||(b.rk==='body'&&tabNew&&b.inPanel))}
   const screen=(pathK.length?pathK.map(k=>k.split('|').pop().replace(/#\d+$/,'')).join(' › '):st)+' ['+(sig0.roots[sig0.roots.length-1]||'').slice(0,60)+']';
   console.log(`[${dev}] ${st} depth ${pathK.length} · ${L.length} buttons · ${screen}`);
   /* what moves by itself on this screen (an animation, a clock) is not an effect of a tap */
   const nz=await p.evaluate(async()=>{const a=__bc.sig();await new Promise(r=>setTimeout(r,700));const b=__bc.sig();return Object.keys(a).filter(k=>JSON.stringify(a[k])!==JSON.stringify(b[k]))});
   const strip=o=>{if(!o||o.nav)return o;const c=Object.assign({},o);for(const k of nz)delete c[k];return c};
   let dirty=false;
   for(const bt of L){if(taps>=MAXTAPS)break;
    if(dirty){const g2=await goto(pathK);if(g2){rows.push({dev,start:st,path:pathK,screen,label:bt.label,verdict:'SKIP',why:g2});continue}dirty=false}
    await settle(p);await p.evaluate(()=>__bc.list());
    const pre=await p.evaluate(()=>__bc.sig());errs=[];
    const h=await p.evaluateHandle(k=>__bc.find(k),bt.key);const el=h.asElement();
    if(!el){if(process.env.BCDBG){const now=await p.evaluate(()=>__bc.list().map(x=>x.key));console.log('GONE',bt.key,'\n NOW',now.filter(k=>!L.some(x=>x.key===k)).join(' ;; '));await p.screenshot({path:path.join(OUT,'gone.jpg')})}
     rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,verdict:'SKIP',why:'button gone before its tap'});continue}
    const rootH=await el.evaluateHandle(e=>__bc.root(e));const selfSt=e=>e.isConnected?e.className+'|'+(e.getAttribute('aria-pressed')||'')+'|'+(e.getAttribute('aria-expanded')||'')+'|'+(e.innerText||'').slice(0,40):'gone';
    const self0=await el.evaluate(e=>e.isConnected?e.className+'|'+(e.getAttribute('aria-pressed')||'')+'|'+(e.getAttribute('aria-expanded')||'')+'|'+(e.innerText||'').slice(0,40):'gone').catch(()=>'');
    const shot=path.join(OUT,'shots',`${dev}-${String(rows.length).padStart(4,'0')}.jpg`);
    let waited=0;const isDis=()=>el.evaluate(e=>e.isConnected&&(getComputedStyle(e).pointerEvents==='none'||e.disabled||e.getAttribute('aria-disabled')==='true'||/(^|\s)(kdis|disabled)(\s|$)/.test(e.className))).catch(()=>false);
    for(;waited<3200&&await isDis();waited+=400)await p.waitForTimeout(400); /* a short lock after a card opens is not a dead Lui: wait up to 3.2 s */
    let dead=null;const ok=await tap(p,el,{screen,label:bt.label,shot,log:m=>{dead=m}});taps++;
    if(!ok){const d=JSON.parse(dead.replace(/^DEAD BUTTON /,''));if(/^(disabled|gone|popup)$/.test(d.why)){rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:d.why,verdict:'WARN',why:d.why==='disabled'?'greyed out for '+(waited+400)+' ms+ (not tappable now)':d.why==='gone'?'left the page before the tap':'under a hint popup '+d.cover});continue}rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:'DEAD',verdict:'FAIL',why:'dead button: '+d.why+(d.cover?' under '+d.cover+(d.coverText?' «'+d.coverText+'»':''):''),shot});continue}
    await p.waitForTimeout(450);await settle(p,4000);
    let post,closedOwn=false;
    try{const isClose=bt.x||/^(Đóng|Thôi|Bỏ qua|Quay lại|Trở về|Về|Hủy|Huỷ|Để sau|Xong|Đã hiểu|Biết rồi|Lui)$/i.test(bt.label);
     for(let i=0;i<(isClose?8:1);i++){closedOwn=await rootH.evaluate(r=>r===document.body?false:(!r.isConnected||!__bc.vis(r)||!__bc.live(r)));if(closedOwn||!isClose)break;await p.waitForTimeout(250)}
     post=await p.evaluate(()=>__bc.sig())}
    catch(e){post={nav:'page navigated/reloaded'};}
    if(post.nav){rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:'ok',verdict:'WARN',why:'page reloaded/navigated'});dirty=true;await open().catch(()=>{});await startState[st]();continue}
    const self1=await el.evaluate(e=>e.isConnected?e.className+'|'+(e.getAttribute('aria-pressed')||'')+'|'+(e.getAttribute('aria-expanded')||'')+'|'+(e.innerText||'').slice(0,40):'gone').catch(()=>'gone');
    if(self1!==self0)post.self=1;
    const [v,why]=verdict(bt,strip(pre),strip(post),errs,closedOwn,par);
    if(v==='FAIL')await p.screenshot({path:shot,type:'jpeg',quality:55}).catch(()=>{});
    rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:'ok',verdict:v,why,shot:v==='FAIL'?shot:''});
    const changed=JSON.stringify(pre)!==JSON.stringify(post);if(changed)dirty=true;
    const newScreen=JSON.stringify(pre.roots)!==JSON.stringify(post.roots)||pre.tab!==post.tab||pre.panel!==post.panel||pre.title!==post.title;
    if(newScreen&&pathK.length<DEPTH){const tl=post.roots.filter(r=>!r.startsWith('body'));const nk=tl.length?JSON.stringify(tl):JSON.stringify([post.roots.map(r=>r.startsWith('body')?'body':r),post.tab,post.panel,post.title]);if(!seen.has(nk)){const np=pathK.concat([bt.key]);parentOf.set(np.join('>'),pre);queue.push(np)}}
   }
   fs.writeFileSync(path.join(OUT,`crawl-${dev}.json`),JSON.stringify(rows.filter(r=>r.dev===dev)))}
 }
 global.__bcEnd=1;await ctx.close();global.__bcEnd=0}

(async()=>{const URL=/^https?:/.test(GAME)?GAME:await serve(GAME);const b=await chromium.launch();const t0=Date.now();
 await Promise.all(DEV.map(d=>crawlDev(b,URL,d).catch(e=>{console.log('CRAWL CRASH',d,e.message);rows.push({dev:d,label:'(crawler)',verdict:'FAIL',why:'crawler crashed: '+e.message.slice(0,120)})})));
 await b.close();fs.writeFileSync(path.join(OUT,'crawl-all.json'),JSON.stringify(rows));
 const n=k=>rows.filter(r=>r.verdict===k).length;
 console.log(`BUTTON CRAWL ${n('FAIL')?'FAIL':'PASS'} · ${DEV.join('+')} · taps ${taps} · PASS ${n('PASS')} · FAIL ${n('FAIL')} (dead ${rows.filter(r=>r.hit==='DEAD').length}) · WARN ${n('WARN')} · SKIP ${n('SKIP')} · hard restores ${hard} · ${Math.round((Date.now()-t0)/1000)} s`);
 /* gate (fast) fails on the sure faults only: a dead (covered/off-screen) button, a JS error on a tap, a ✕/close that does not close */
 /* faults already filed and owned (dev/tools/quickcheck.d/button-crawl-known.txt: «regex<TAB>owner/request») are listed, not gating */
 let known=[];try{known=fs.readFileSync(path.join(REPO,'dev','tools','quickcheck.d','button-crawl-known.txt'),'utf8').split('\n').filter(l=>l.trim()&&!l.startsWith('#')).map(l=>{const [re,why]=l.split('\t');return{re:new RegExp(re),why:why||''}})}catch(e){}
 const isKnown=r=>known.find(k=>k.re.test((r.screen||'')+' · '+(r.label||'')+' · '+(r.why||'')));
 const sure0=rows.filter(r=>r.verdict==='FAIL'&&(r.hit==='DEAD'||/^JS error|^close button|crawler crashed/.test(r.why||'')));
 const sure=sure0.filter(r=>!isKnown(r));if(FAST)for(const r of sure0.filter(isKnown))console.log('  KNOWN',r.dev,'·',r.label,'·',isKnown(r).why);
 if(FAST){for(const r of sure.slice(0,12))console.log('  FAIL',r.dev,'·',(r.screen||'').slice(0,50),'·',r.label,'·',r.why.slice(0,140));console.log(`BUTTON CRAWL GATE ${sure.length?'FAIL':'PASS'} · ${sure.length} sure faults (dead/JS error/close) · ${n('FAIL')-sure.length} soft «no effect» rows not gating`)}
 process.exit(FAST&&sure.length?1:0)})();

function report(dir){const all=path.join(dir,'crawl-all.json');const R=fs.existsSync(all)?JSON.parse(fs.readFileSync(all,'utf8')):fs.readdirSync(dir).filter(f=>/^crawl-.*\.json$/.test(f)).flatMap(f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')));
 const e=s=>String(s||'').replace(/\|/g,'¦').replace(/\s+/g,' ').trim();
 const n=(k,d)=>R.filter(r=>r.verdict===k&&(!d||r.dev===d)).length;const devs=[...new Set(R.map(r=>r.dev))];
 const L=[];const o=x=>L.push(x);
 o('Devices: '+devs.join(' + ')+' · rows '+R.length+' · PASS '+n('PASS')+' · FAIL '+n('FAIL')+' (dead '+R.filter(r=>r.hit==='DEAD').length+') · WARN '+n('WARN')+' · SKIP '+n('SKIP')+' (harness could not bring the screen back; not a game verdict)');
 for(const d of devs)o(`- ${d}: PASS ${n('PASS',d)} · FAIL ${n('FAIL',d)} · WARN ${n('WARN',d)} · SKIP ${n('SKIP',d)}`);
 o('\n### FAIL + WARN (every row)\n\n| dev | screen | button | hit | effect | verdict |\n|---|---|---|---|---|---|');
 for(const r of R.filter(r=>r.verdict==='FAIL'||r.verdict==='WARN'))o(`| ${r.dev} | ${e(r.screen||r.start).slice(0,70)} | ${e(r.label).slice(0,50)} | ${r.hit||'-'} | ${e(r.why).slice(0,160)} | ${r.verdict} |`);
 o('\n### PASS (per screen: buttons that hit and did the right thing)\n\n| dev | screen | buttons PASS |\n|---|---|---|');
 const G={};for(const r of R.filter(r=>r.verdict==='PASS')){const k=r.dev+'\u0001'+e(r.screen||r.start).slice(0,70);(G[k]=G[k]||[]).push(e(r.label).slice(0,24))}
 for(const k in G){const [d,sc]=k.split('\u0001');o(`| ${d} | ${sc} | ${G[k].length}: ${G[k].join(' · ').slice(0,400)} |`)}
 console.log(L.join('\n'))}
