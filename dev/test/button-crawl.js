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
   usage: node dev/test/button-crawl.js [--dev fold,ipad] [--depth 3] [--start title,home,tour,selx,talk,save] [--selx-max N] [--talk-max N] [--save robot-dump.json] [--fast] [--out dir] [--game index.html|URL] [--max N]
     --fast  = gate mode for dev/tools/quickcheck.sh: depth 1 from home + title, Fold only; exit 1 on any FAIL
     (FIXER #17) --fast starts = home,selx,talk: the ring UI (selection days, kitScene talk, Bàn bài hand cards, thẻ gỗ plaques) is walked with two real taps per card (lift → ✓ / «Chọn» chip)
   output: <out>/crawl-<dev>.json (every tap) + <out>/shots/*.jpg (every FAIL; shots never go in git) ; summary line last.
   Report table: node dev/test/button-crawl.js --report <out> > dev/handover/reports/button-crawl.md */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const RT=require('./realtap.js'); /* the ONE shared real-tap lib (review/robot-realtap); no private copy (laws 9/11) */
/* adapter: the crawler's call shape tap(page,target,{screen,label,shot,log}) → RT.make(page).tap(target,{screen,label});
   a refused tap is reported to the caller as «DEAD BUTTON {json}» (why = covered / clipped / gone / disabled / popup) */
const RTS=new WeakMap();
async function tap(p,target,o={}){let rt=RTS.get(p);if(!rt){rt={cur:null};rt.rt=RT.make(p,{log:d=>{if(rt.cur)rt.cur(d)}});RTS.set(p,rt)}
 let got=null;rt.cur=d=>{if(d&&d.k!=='tap')got=d};const ok=await rt.rt.tap(target,{screen:o.screen,label:o.label});rt.cur=null;
 if(!ok){const why=!got?'not tappable':got.k==='DEAD BUTTON'?(got.cover==='not in page'?'not found':'covered'):got.k;
  if(o.shot)await p.screenshot({path:o.shot,type:'jpeg',quality:55}).catch(()=>{});
  (o.log||(m=>console.log(m)))('DEAD BUTTON '+JSON.stringify({screen:o.screen||'',label:o.label||'',why,cover:got&&got.cover||''}))}
 return ok}
/* FIXER #17 (RV-165: --fast drove 1/80 taps on the ring UI): press = what her finger does on a two-tap kit part — a REAL tap on the card / plaque (it lifts),
   then a REAL tap on the chip that appears (hand ✓ «khok» / plaque «Chọn» .kpk-gob). Plain buttons: one tap, as before. Returns {ok, two, why}:
   two = 'lift+chip' (chosen), 'lift' (lifted, no chip came = fault), '' (not a two-tap part, or it acted at once). Never .click()/dispatch. */
/* FIXER #18 JOB 2b (BIG #18 F1/F2): (F2) the lift is read on the TAPPED part — exactly one lifted card / plaque and it is the one tapped (label) —
   so «the next card moves the lift» is checked; (F1) «chosen» is judged against the screen AFTER the lift (mid sig), not before it: PASS only when the
   chip tap changes the screen AND the lift is gone (or the frame changed) — a no-op ✓ / «Chọn» now FAILS. o.liftOnly: first tap only (a card that is
   lifted, not chosen). Used by the BFS, the selx / talk walk, the path replay, the tour — and ported to robot-rt.js's picker (JOB 4). */
async function press(p,el,o={}){/* FIXER #21 (BIG #20 N2): she waits for the person ring's own move (focus / back / turn: kring R.busy ignores every tap) before she taps — a ✕ tapped mid-move «did nothing» */await p.waitForFunction(()=>!(window.kitRing&&kitRing.cur&&kitRing.cur.busy),null,{timeout:2500}).catch(()=>{});const k=await el.evaluate(e=>window.__bc?__bc.kind2(e):'').catch(()=>'');const lab=k?await el.evaluate((e,k)=>__bc.lkey(e,k),k).catch(()=>''):'';const off=k?await el.evaluate(e=>__bc.off(e)).catch(()=>false):false;const ok=await tap(p,el,o);if(!ok||!k)return{ok,two:'',k};
 let L={n:0,mine:false},ch=null;for(let i=0;i<14;i++){await p.waitForTimeout(150);L=await p.evaluate(([k,lab])=>__bc.liftOf(k,lab),[k,lab]).catch(()=>({n:0,mine:false}));const h=await p.evaluateHandle(k=>__bc.chip(k),k).catch(()=>null);ch=h&&h.asElement();if(L.mine&&ch)break;if(!L.n&&i>=4)break}
 const w0=L.mine?'':L.n?'the tapped '+(k==='hand'?'card':'plaque')+' did not take the lift (another one is lifted)':'';
 if(off){const chs=!!ch&&L.mine;/* FIXER #23 F3: locked = lifts (the tapped one), shows its reason, NO chip — PASS; a chip on a locked part, a foreign lift or no lift at all = FAIL */return{ok,k,two:'locked',up:L.mine,ch:chs,locked:L.mine&&!chs,why:L.mine&&!chs?'locked: lifts, shows its reason, no Chọn':chs?'locked part shows its «Chọn» chip (a.off must hide it)':w0||'locked part: the tap lifted nothing (its reason is never shown)'}}
 if(o.liftOnly)return{ok,k,two:'lift-only',up:L.mine,ch:!!ch,why:w0||(L.mine&&!ch?'lifted, but no '+(k==='hand'?'✓':'«Chọn»')+' chip came':L.mine?'':'the tapped card did not lift')};
 if(!L.n&&!ch)return{ok,k,two:''};/* acted at once (no lift): judged by the caller like a one-tap button */
 if(!L.mine)return{ok,k,two:'lift',why:w0};
 if(!ch)return{ok,k,two:'lift',why:'lifted, but no '+(k==='hand'?'✓':'«Chọn»')+' chip came'};
 const mid=await p.evaluate(()=>JSON.stringify(__bc.sig())).catch(()=>'');
 const ok2=await tap(p,ch,Object.assign({},o,{label:(o.label||'')+' › '+(k==='hand'?'✓':'Chọn')}));if(!ok2)return{ok:false,k,two:'lift',why:'chip not tappable'};
 let chosen=false;for(let i=0;i<20&&!chosen;i++){await p.waitForTimeout(200);const st=await p.evaluate(([k,mid])=>{const s=__bc.sig();const m=mid?JSON.parse(mid):null;return{chg:JSON.stringify(s)!==mid,gone:!__bc.lifted(null,k),frame:!m||JSON.stringify(s.roots)!==JSON.stringify(m.roots),moved:!m||s.S!==m.S||s.roots.some(r=>!m.roots.includes(r)&&/^div(#modal|\.dlg|\.kscn|#kpop)/.test(r))}},[k,mid]).catch(()=>({chg:true,gone:true,frame:true,moved:true}));chosen=st.chg&&(st.gone||st.frame)&&st.moved}/* FIXER #22 (BIG #21 N1, M7): «chosen» also needs the choice to TAKE — the game state moved or a next frame / title came; a ✓ that only closes the frame = does nothing (the room coming back is not a next frame: M7 brought only room roots) */
 return{ok:true,k,two:'lift+chip',chosen,why:chosen?'':(k==='hand'?'✓':'«Chọn»')+' does nothing (the screen after the lift did not move on / the lift stays)'}}
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]&&!A[i+1].startsWith('--')?A[i+1]:true)};
const REPO=path.join(__dirname,'..','..');
const FAST=!!opt('fast',false);
const OUT=path.resolve(opt('out','/home/user/wt/bc-out/run'));
const DEVS={fold:[755,1000],ipad:[1180,820]};
const DEV=String(opt('dev',FAST?'fold':'fold,ipad')).split(',').filter(d=>DEVS[d]);
const DEPTH=+opt('depth',FAST?1:3),MAXTAPS=+opt('max',FAST?80:100000);
const STARTS=String(opt('start',FAST?'home,selx,talk':'title,home,tour,selx,talk')).split(',');
/* FIXER #17 (RV-165 ring blind spot): the first-life SELECTION DAYS (jselxday: «Ngày thứ nhất — Nhập cung» … kitScene talk, Bàn bài hand cards, thẻ lụa plaques)
   are walked as their own start «selx» with their own tap budget (fast 30), so they never eat the home budget and home never sits under them */
const SELXMAX=+opt('selx-max',FAST?60:400),TALKMAX=+opt('talk-max',FAST?24:60);
const GAME=opt('game',path.join(REPO,'index.html'));
/* pictures load as she sees them (layout depends on them; --noimg blocks them for speed); sound/video are blocked */
/* FIXER #20 G2 ROOT (BIG #19 «first home pass vacuous on both devices»): this route ABORTED every .mp3 — but the first-load 'core' set (jload.js runCore, assets.json)
   holds 97 mp3 (1.7 MB of 434 MB): each aborted file failed its 4 tries, so 'core' NEVER completed on a crawl profile → #kload («Lần đầu nhập cung») came back on every
   page / reload (runCore → screen()), and the life gate (#klife) re-covered the room; the CDN pictures ARE served (probe: 200 in 0.27 s). Audio is no longer blocked (as robot-rt);
   only video loops (mp4 / webm, never in 'core') stay off. --noimg keeps its old meaning. */
const BLOCK=opt('noimg',false)?/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i:/\.(mp4|webm)(\?|$)/i;
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
 /* FIXER #17: TEST SETUP ONLY — while window.__bcNoSelx is set (START home), accepting the life does not start the multi-day selection (jselxday nlAccept hook reads BAL.selx.days):
    home = the room, as LIVE's crawl sees it; the selection days are walked by START selx */
 try{if(typeof nlAccept==='function'&&!W.__bcSelxW){const a0=nlAccept;W.__bcSelxW=1;nlAccept=function(){if(!W.__bcNoSelx||!W.BAL||!BAL.selx)return a0.apply(this,arguments);const d=BAL.selx.days;BAL.selx.days=1;try{return a0.apply(this,arguments)}finally{BAL.selx.days=d}}}}catch(e){}
 W.__bc={
  isFixedRoot(e){const cs=getComputedStyle(e);return cs.position==='fixed'||e.id==='modal'||e.id==='title'||e.tagName==='DIALOG'||e.classList.contains('kfoc')},/* FIXER #22: the person focus (.kfoc, absolute in #game) is its own layer — else the body buttons under its veil were listed with it and read DEAD (iPad Phẩm Nhi, 13 rows) */
  root(e){let x=e;while(x&&x!==document.body){if(this.isFixedRoot(x))return x;x=x.parentElement}return document.body},
  vis(e){if(!e.isConnected||e.closest('[hidden]'))return false;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0)return false;
   const r=e.getBoundingClientRect();return r.width>=4&&r.height>=4},
  desc(e){return e?(e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(typeof e.className==='string'&&e.className.trim()?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):'')):'none'},
  label(e){if(e.__bcTalk)return '(Chạm để tiếp) talk';if(e.matches('.kdv-box'))return '(Chạm để tiếp) '+((e.querySelector('.kptitle')||{}).textContent||'').trim().slice(0,24);let t=(e.getAttribute('aria-label')||'').trim();if(!t)t=(e.innerText||e.textContent||'').replace(/\s+/g,' ').trim();if(!t)t=e.title||'';
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
    if(e.matches('.kpk-gob,.khconf button,.kpk-conf button'))continue;/* FIXER #17: the «Chọn» chip of a lifted plaque / the ✓ of a lifted hand card = the SECOND tap of press(), never a button of its own */
    if(seen.has(e))continue;seen.add(e);out.push(e)}
   /* FIXER #17: a kitScene talk line (kitDialogue «Chạm để tiếp ▸») is tapped like a player taps the box: one target per open line */
   /* a kitStage TALK frame (KIT §98 stage talk: one line at a time, a tap on the stage = the next line, then thẻ gỗ plaques): the bubble is the target until the answers hang */
   for(const dl of document.querySelectorAll('#modal .dlg.kstalk')){const T=dl.__kstT;if(T&&T.asked)continue;const bb=dl.querySelector('.ksay')||dl.querySelector('.kstg-sp')||dl;if(this.vis(bb)&&!seen.has(bb)){seen.add(bb);bb.__bcTalk=1;out.push(bb)}}
   for(const bx of document.querySelectorAll('.kscn .kdv-box')){const nx=bx.querySelector('.kdv-next');/* the hint may blink / wait for the typing: its presence is enough */if(nx&&this.vis(bx)&&!seen.has(bx)){seen.add(bx);out.push(bx)}}
   return out},
  /* FIXER #17 two-tap kit parts: «hand» = a Bàn bài card (KIT kitHand: 1st real tap lifts, its ✓ chooses), «plaque» = a thẻ lụa plaque (KIT §98.1 kitPick: 1st tap lifts, the in-plaque «Chọn» chip chooses) */
  off(e){const n=e.closest&&e.closest('.kpk-n');return !!(e.matches&&(e.matches('.kitoff,.kfoc-off')||(n&&n.querySelector('.kitoff,.kfoc-off'))))},/* FIXER #23 F3 (BIG #21): a LOCKED part (act.off → .kfoc-b.kfoc-off.kitoff): its tap lifts it and shows its reason; kitPick conf() hides «Chọn» by design */
  kind2(e){return e.matches('#modal .opts.khand>button.kopt:not(.kcard):not(.kbare)')?'hand':e.closest('.kpk-n')?'plaque':''},/* = jkhand kitHandCards (a .kcard / .kbare row in the hand box is a plain button) */
  /* the card / plaque may be re-laid (a new node) by the lift: read the lift on the part, not on the old handle */
  /* FIXER #18 F2: the lifted parts now, and whether the ONE lifted part is the tapped one (by its label, the node may be re-laid) */
  /* FIXER #21: a lift counts only while she can SEE it (LIVE f28d28b9 hides #modal on a choice and leaves the chosen card's .klift in the hidden DOM); liftOf compares the FULL label (BIG #19 N3) */
  /* FIXER #22 F1 (BIG #21): «gone» ONLY when the node is disconnected, under [hidden] / display:none (no client rects), or lost its lift class (the selector) —
     NEVER by opacity / rect: kitHandChoose flies EVERY chosen card to opacity 0 (WAAPI fill forwards) before go(), so an opacity read called a ✓ whose go() never ran «chosen» (M8) */
  liftSeen(x){return x.isConnected&&!x.closest('[hidden]')&&x.getClientRects().length>0},
  /* FIXER #22 F2 (BIG #21): the lift key = the plaque's data-id (.kpk-n[data-id]: the tapped .kpk-b carries «name · odds · Tốn» as aria-label, the lifted .kpk-n has none → a label compare never matched);
     hand cards keep the full label (the tapped node IS the lifted node) */
  lkey(e,k){if(k==='plaque'){const n=e.closest('.kpk-n');const id=n&&n.getAttribute('data-id');if(id!=null&&id!=='')return 'id:'+id}return this.label(e)},
  lifts(k){return(k==='hand'?[...document.querySelectorAll('#modal .opts>button.kopt.klift')]:k==='plaque'?[...document.querySelectorAll('.kpk-n.kpk-up')]:[]).filter(x=>this.liftSeen(x))},
  liftOf(k,lab){const U=this.lifts(k);const t=String(lab||'');return{n:U.length,mine:U.length===1&&!!t&&this.lkey(U[0],k)===t}},
  lifted(e,k){return this.lifts(k).length>0},
  chip(k){const C=k==='hand'?[...document.querySelectorAll('#modal .dlg>.khconf>button.khok')]:[...document.querySelectorAll('.kpk-conf>button.kpk-gob,.kpk-go>button')];return C.find(x=>this.vis(x)&&!x.disabled)||null},
  liveRoots(){const roots=new Set(this.cands().map(e=>this.root(e)));for(const f of this.fixed)if(this.root(f)===f)roots.add(f);return [...roots].filter(r=>this.live(r))},
  /* the buttons on screen now: in a live layer (a button behind an open dialog is not on screen) */
  list(){document.querySelectorAll('[data-bc]').forEach(e=>e.removeAttribute('data-bc'));const lr=new Set(this.liveRoots());const L=[];const cnt={};
   for(const e of this.cands()){const rt=this.root(e);if(!lr.has(rt))continue;
    const rd=rt===document.body?'body':rt.tagName.toLowerCase()+(rt.id?'#'+rt.id:(typeof rt.className==='string'&&rt.className.trim()?'.'+rt.className.trim().split(/\s+/)[0]:''));
    const key=rd+'|'+e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+'|'+this.label(e);cnt[key]=(cnt[key]||0)+1;
    e.setAttribute('data-bc',key+'#'+cnt[key]);L.push({key:key+'#'+cnt[key],label:this.label(e),el:this.desc(e),layer:rd,tab:e.getAttribute('data-tab')||'',on:e.matches('.on,.sel,.active,[aria-selected=true],[aria-pressed=true]'),inPanel:!!e.closest('#panel,#stage,.stage'),rk:rt===document.body?'body':this.rootKey(rt),x:e.matches('.kit-x')||/^(✕|×|x)$/i.test(this.label(e)),rx:!!e.closest('.kring-x')/* FIXER #22 (BIG #21 N3): the ring's own ✕ */})}
   return L},
  /* a loading / scene veil the player waits for (not a button layer) */
  busy(){return [...document.querySelectorAll('#klife,#kload,#kroul,#kroulw,#dawn,.kload')].some(e=>this.vis(e))},
  /* the same button after a restore: exact key, else the same layer/element with the label's numbers and «(có mới)» ignored */
  find(key){const A=[...document.querySelectorAll('[data-bc]')].filter(e=>this.vis(e));const ex=A.find(e=>e.getAttribute('data-bc')===key);if(ex)return ex;
   const norm=k=>k.replace(/#\d+$/,'').replace(/\(có mới\)/g,'').replace(/[\d.,/]+/g,'9').replace(/\s+/g,' ').trim();const nk=norm(key),n=+(key.match(/#(\d+)$/)||[0,1])[1];
   const M=A.filter(e=>norm(e.getAttribute('data-bc'))===nk);return M[n-1]||M[0]||null},
  rootKey(r){const h=r.querySelector('h1,h2,h3,.kt,.ttl,.title,header');return this.desc(r)+':'+((h&&h.innerText)||r.innerText||'').replace(/\s+/g,' ').trim().slice(0,40)},
  sig(){const roots=this.liveRoots().map(r=>this.rootKey(r));
   /* FIXER #21 (BIG #20 N2): the person ring's own level — sel ≥ 0 = one person stepped forward (focus); ✕ «Lui» there goes ONE step back to the ring (game rule: kring ✕ handler `if(R.sel>=0)return back(R)`), the next ✕ closes */
   let ring=null;try{const C=window.kitRing&&kitRing.cur;if(C)ring=C.sel}catch(e){}
   const tab=(document.querySelector('#tabs .on,#tabs [aria-selected=true]')||{}).getAttribute?.('data-tab')||'';
   let sh='';try{if(typeof S!=='undefined'&&S){const s=JSON.stringify(S);let h=0;for(let i=0;i<s.length;i+=7)h=(h*31+s.charCodeAt(i))|0;sh=s.length+':'+h}}catch(e){}
   /* whole page text + which things are marked on/selected (a filter tab, a picked card) */
   const onS=[...document.querySelectorAll('.on,.sel,.active,.picked,[aria-selected=true],[aria-pressed=true],:checked')].filter(e=>this.vis(e)).map(e=>this.desc(e)+(e.innerText||'').slice(0,12)).join(',');
   const txt=(document.body.innerText||'')+onS;let th=0;for(let i=0;i<txt.length;i++)th=(th*31+txt.charCodeAt(i))|0;
   const pn=document.getElementById('panel');let panel='';if(pn&&this.vis(pn)){const t=(pn.className+'|'+(pn.firstElementChild?pn.firstElementChild.className:'')+'|'+(pn.innerText||'').slice(0,80));let h=0;for(let i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))|0;panel=String(h)}
   /* moved / zoomed / resized things (a map zoom, a slider) show only in inline styles */
   let sty=0;{const R=[document.getElementById('panel'),...this.liveRoots().filter(r=>r!==document.body)].filter(Boolean);let n=0;for(const r of R)for(const e of r.querySelectorAll('[style]')){if(++n>600)break;const t=e.getAttribute('style');for(let i=0;i<t.length;i++)sty=(sty*31+t.charCodeAt(i))|0}}
   let kg='';try{const g=document.getElementById('kg82')||document.querySelector('#ov .kgame');if(typeof KG82!=='undefined'&&g&&this.vis(g))kg=KG82.phase||(KG82.setup?'setup':'intro')}catch(e){}
   return{roots:roots.sort(),tab,panel,kg,sty,S:sh,txt:txt.length+':'+th,title:!!(document.getElementById('title')&&!document.getElementById('title').hidden),q:(typeof Q!=='undefined'&&Q||[]).length,ring}},
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
const rows=[];let taps=0,hard=0;const vHome={};
function verdict(b,pre,post,errs,closedOwn,par){
 if(errs.length)return['FAIL','JS error: '+errs[0].slice(0,120)];
 const changed=JSON.stringify(pre)!==JSON.stringify(post);
 const closeLike=b.x||/^(Đóng|Thôi|Bỏ qua|Quay lại|Trở về|Về|Hủy|Huỷ|Để sau|Xong|Đã hiểu|Biết rồi|Lui)$/i.test(b.label);
 const backTo=par&&JSON.stringify(post.roots)===JSON.stringify(par.roots);
 /* KIT §13.9: the ✕ «Quay lại» of a mini-game frame gives up = the caller's own lose RESULT; it must never start the board / open the next screen */
 if(closeLike&&!closedOwn&&pre.kg!==''&&(post.kg==='result'||post.S!==pre.S))return['PASS','gave up → the game ended with its lose result (KIT §13.9)'];
 if(closeLike)return closedOwn?['PASS','closed its layer']:backTo?['PASS','back to the screen before']:(b.rx&&pre.ring!=null&&pre.ring>=0&&post.ring!=null&&post.ring<0)?['PASS','stepped back from the person to the ring (ring ✕ «Lui» = one step back; the next ✕ closes)']:(changed?['FAIL','close button did not close its layer (something else changed)']:['FAIL','close button: nothing happened']);
 if(b.tab)return post.tab===b.tab||pre.tab===b.tab&&changed?['PASS','tab '+b.tab+' shown']:changed?['WARN','tab button changed the screen but tab '+b.tab+' not marked on']:['FAIL','tab button: nothing happened'];
 if(!changed&&b.on)return['PASS','already on (tapping the shown tab/choice again changes nothing)'];
 if(!changed)return['FAIL','no effect (screen and state unchanged)'];
 const what=[];if(JSON.stringify(pre.roots)!==JSON.stringify(post.roots))what.push('layer');if(pre.tab!==post.tab)what.push('tab');if(pre.txt!==post.txt)what.push('text');if(pre.S!==post.S)what.push('state');if(pre.sty!==post.sty)what.push('moved');if(post.self)what.push('toggled');if(pre.title!==post.title)what.push('title');
 return['PASS',what.join('+')]}

/* START tour: a brand-new player's first life — the 12-step LỜI DẶN tour. Every «Tiếp»/«Đã hiểu» must turn the page; a step with no
   «Tiếp» waits for her to tap the lit spot: the robot taps the centre of the hole (the lit button must be reachable there). Then a second
   fresh life checks «Bỏ qua lời dặn» closes the tour. */
/* START selx (FIXER #17): a fresh Tú nữ life whose selection days start (accepted the way her «Nhập cung» does), walked screen by screen like a player:
   a talk line → tap the box (Chạm để tiếp); a screen with Bàn bài cards / thẻ lụa plaques → every card but the last is LIFTED by a real tap (its ✓ / «Chọn» chip must show;
   a tap on the next card moves the lift), the last is pressed (lift + chip = chosen); any other frame → its first option / main button. Every tap is a row. Ends at the room. */
/* FIXER #19 G2 ROOT (BIG #19 «first home pass vacuous on both devices, the re-crawl saves it»): #kload is the game's FIRST-LOAD asset screen (jload.js: the
   'core' set, ~80 MB, blocks entry until cached). Every crawl is a fresh browser profile → the first page downloads core while the crawl runs; two devices at
   once make it slower than the setup's veil waits, so the screen (div#kload.modal.kpscene) covered the room for the whole first home pass (every button «gone»)
   and came back after each hard-restore reload; the re-crawl ran on a filled cache. A player waits for that screen: wait ≤ 30 s for it to go before any START and after every reload;
   still up (core never completes when CDN art is not served — measured: KLOAD stays «core» > 4 min) → taken down as the setup does. */
const WL=[],RB={};/* RB: this build has the ring UI (kitHand / kitPick) — FIXER #20 ring floor *//* waitLoad log: written to the result JSON (wl) */
async function waitLoad(p,dev,why){const t=Date.now();
 /* FIXER #20 G2: a player waits for the first-load screen to finish (KLOAD.phase leaves check / core: 'Đã thỉnh đủ · mời nhập cung') — on a fresh crawl profile that is the
    one real core download (≈ 434 MB, measured below), later pages / reloads find it cached and runCore closes at once. Then the life gate (#klife, jload lifeGate: the
    pictures of THIS life) — it lifts by itself when they are in (≤ 25 s cap in the game). Only past these waits is a veil taken down (setup, logged). */
 const T1=why==='open'?300000:90000;
 /* jload shows its screen a moment after the page (caches.has → screen(), ≈ 2 s): first wait ≤ 5 s for the screen or for the check to end; then wait while the screen is up
    or 'core' still runs. A page left in 'check' with NO screen (seen: the 2nd page of a context, plan() pending > 5 min) shows her nothing → nothing to wait for. */
 await p.waitForFunction(()=>{const e=document.getElementById('kload');const ph=window.KLOAD&&KLOAD.phase;return !!(e&&e.isConnected)||(ph&&ph!=='check')},null,{timeout:5000,polling:250}).catch(()=>{});
 await p.waitForFunction(()=>{const e=document.getElementById('kload');const ph=window.KLOAD&&KLOAD.phase;return (!e||!e.isConnected||e.hidden||getComputedStyle(e).display==='none')&&ph!=='core'},null,{timeout:T1,polling:500}).catch(()=>{});const ms=Date.now()-t;
 const rm=await p.evaluate(()=>{const e=document.getElementById('kload');if(!e)return '';const ph=window.KLOAD?KLOAD.phase:'?';e.remove();return ph}).catch(()=>'');
 const t2=Date.now();await p.waitForFunction(()=>{const e=document.getElementById('klife');return !e||!e.isConnected||e.classList.contains('out')},null,{timeout:30000,polling:300}).catch(()=>{});const ms2=Date.now()-t2;
 const rl=await p.evaluate(()=>{const e=document.getElementById('klife');if(!e||e.classList.contains('out'))return '';e.remove();return 'up'}).catch(()=>'');
 const core=await p.evaluate(()=>window.KLOAD?KLOAD.phase+' '+Math.round((KLOAD.core&&KLOAD.core.have||0)/1e6)+'/'+Math.round((KLOAD.core&&KLOAD.core.total||0)/1e6)+' MB':'?').catch(()=>'?');
 /* FIXER #20 H1 (BIG #20 M6: jload core never resolves → the crawl took the veil down by script and the gate PASSED): a first-load screen (#kload) or a life gate
    (#klife) STILL UP after the player's wait is what a real player meets = a SURE FAIL row («(first load)», gating), never hidden. The crawl then goes on (setup) so the
    rest of the run is still measured — but the run cannot pass. */
 if(rm)rows.push({dev,start:why,label:'(first load)',verdict:'FAIL',why:`first-load screen «Lần đầu nhập cung» still up after ${Math.round(ms/1000)} s (KLOAD ${rm}, ${core}) — a player is stuck there`});
 if(rl)rows.push({dev,start:why,label:'(first load)',verdict:'FAIL',why:`life gate (#klife) still up after ${Math.round(ms2/1000)} s more — a player is stuck behind it`});
 WL.push({dev,why,ms,ms2,rm,rl,core});
 if(ms>3000||rm||ms2>3000||rl)console.log(`[${dev}] first-load screen (${why}): ${Math.round(ms/1000)} s${rm?' → STILL UP (KLOAD '+rm+'), taken down (setup)':' → done'} (${core}) · life gate ${Math.round(ms2/1000)} s${rl?' → STILL UP, taken down (setup)':''}`);return ms}
async function walkSelx(p,dev,ER,setup,NM='selx',MAXW=SELXMAX){const SELXMAX=MAXW;let wt=0,ended=false;/* FIXER #19 G1 (BIG #19): the walk budget counts THIS walk's own taps on THIS device (wt) — the global `taps` is shared by every device crawled in parallel (two-device ring run: Fold selx cut at 16 rows, talk at 7, before any hand card, no end row) */
 /* the life is drawn at random: only some origins / ranks go through the selection days (jselxday selxDaysFit) → draw again (≤ 6 lives, setup only) */
 let upAny=false;for(let n=0;n<(NM==='talk'?1:12);n++){/* FIXER #18: the start check read window.S — S is a top-level «let» (j1.js), never on window → «not started» after 1.2 s on EVERY draw; the walk ran only when the frame happened to be up after the last draw (selx SKIP 3 runs in 4). Now typeof S; 12 draws (setup only) */await setup();let up=false;for(let i=0;i<30&&!up;i++){if(NM!=='talk'&&i>=3&&!(await p.evaluate(()=>!!(typeof S!=='undefined'&&S&&S.selx2&&S.selx2.days)).catch(()=>false)))break;/* the selection days start inside nlAccept (sync): not started = draw again at once */up=await p.evaluate(nm=>{const M=document.getElementById('modal');return nm==='talk'?!M.hidden&&!!M.querySelector('.dlg.kstalk'):(!M.hidden||!!document.querySelector('.kscn'))&&!!(typeof S!=='undefined'&&S&&S.selx2&&S.selx2.days)},NM);if(!up)await p.waitForTimeout(400)}if(up){upAny=true;break}}
 /* FIXER #25 F5 law 11 (BIG #22): a selx START that drew no selection day on a build that HAS them (selxDaysOn) = sure FAIL «(selx floor)», never a silent SKIP (the vacuous start hid M1 / M7 / M8 / M13 from quickcheck) */
 if(NM==='selx'&&!upAny&&(await p.evaluate(()=>typeof selxDaysOn==='function').catch(()=>false))){rows.push({dev,start:NM,screen:NM,label:'(selx floor)',verdict:'FAIL',why:'selx start drew no selection day in 12 lives — this build has selxDaysOn, so the selection days were never walked (harness setup ended them, or the game no longer starts them)'});return}
 if(!(await p.evaluate(()=>{const M=document.getElementById('modal');return !M.hidden||!!document.querySelector('.kscn')}))){rows.push({dev,start:NM,screen:NM,label:'(start)',verdict:'SKIP',why:NM==='talk'?'no talk frame came (this build has no kitStage talk)':'no selection-day screen came (this build has no multi-day selection for this life)'});return}
 let same=0,last='',noT=0;
 while(wt<SELXMAX){await settle(p,6000);await p.waitForTimeout(500);
  const S0=await p.evaluate(()=>{const L=__bc.list();const sg=__bc.sig();const top=L.filter(b=>b.layer!=='body');const M=document.getElementById('modal');
   const home=M.hidden&&!document.querySelector('.kscn')&&!!document.getElementById('next')&&__bc.vis(document.getElementById('next'));
   const two=top.filter(b=>{const e=document.querySelector('[data-bc="'+CSS.escape(b.key)+'"]');return e&&__bc.kind2(e)}).sort((a,b)=>{const o=x=>{const e=document.querySelector('[data-bc="'+CSS.escape(x.key)+'"]');return e&&__bc.off(e)?0:1};return o(a)-o(b)})/* FIXER #23 F3: locked parts first, an OPEN one last = the one fully chosen */;return{L:top,two:two.map(b=>b.key),home,scr:(sg.roots[sg.roots.length-1]||'').slice(0,60)}});
  /* FIXER #20 (M1 passed on LIVE 0562e15f): the LIVE opening days put the room up BETWEEN beats («Cất đồ, ra Tiền sảnh» → the room → the Tiền sảnh lesson, a kitHand of 3),
     so the walk ended at the room before any hand card (0 two-tap rows). While the selection days run and no hand card was driven yet, she goes on as a player does:
     waits for the next beat (≤ 4 s), else taps the room's «next» for real; the walk ends at the room once a hand was driven or the days are over. */
  if(S0.home&&NM==='selx'&&!rows.some(r=>r.dev===dev&&r.start===NM&&r.kind==='hand')&&(await p.evaluate(()=>typeof selxDaysOn==='function'&&selxDaysOn()).catch(()=>false))){
   const nx=await p.waitForFunction(()=>!document.getElementById('modal').hidden||!!document.querySelector('.kscn'),null,{timeout:4000}).then(()=>false).catch(()=>true);
   /* (s1 run: #next is DISABLED there — the room holds the KẾT QUẢ result card #rtoast of «Cất đồ, ra Tiền sảnh» with its «Tiếp ▸»: that is what she taps) */
   let went=!nx;if(nx&&wt<SELXMAX){const eh=await p.evaluateHandle(()=>{const v=e=>e&&__bc.vis(e)&&!e.disabled;const t=[...document.querySelectorAll('#rtoast button')].filter(v);return t[t.length-1]||(v(document.getElementById('next'))?document.getElementById('next'):null)});const el=eh.asElement();if(el){went=true;const pre=await p.evaluate(()=>__bc.sig());let dm='';const r=await press(p,el,{screen:NM+' · room',label:(await el.evaluate(e=>(e.id?'#'+e.id+' ':'')+e.textContent.trim().slice(0,20)).catch(()=>'next'))+' (room, opening days)',shot:path.join(OUT,'shots',`${dev}-${NM}-next-${rows.length}.jpg`),log:m=>dm=m,liftOnly:false});taps++;wt++;await p.waitForTimeout(600);await settle(p,6000);const post=await p.evaluate(()=>__bc.sig());const ch=JSON.stringify(pre)!==JSON.stringify(post);
     rows.push({dev,start:NM,screen:NM+' · room',label:'room → next beat (opening days)',hit:r.ok?'ok':'DEAD',verdict:r.ok&&ch?'PASS':'FAIL',why:!r.ok?(dm||r.why||'not tappable'):ch?'next beat':'no effect'})}}
   if(went)continue}
  if(S0.home){rows.push({dev,start:NM,screen:NM,label:'(end)',verdict:'PASS',why:'back to the room after '+wt+' taps'});ended=true;break}
  if(!S0.L.length&&++noT<10)continue;/* between two talk lines / two scenes the box is rebuilt: look again (≤ ~10 s) before calling it a fault */
  if(S0.L.length)noT=0;else{rows.push({dev,start:NM,screen:S0.scr,label:'(no target)',verdict:'FAIL',why:'a selection-day screen with nothing to tap (no button, no talk box)'});await p.screenshot({path:path.join(OUT,'shots',dev+'-selx-none.jpg'),type:'jpeg',quality:50});ended=true;break}
  const sk=S0.scr+'|'+S0.L.map(b=>b.label).join('|').slice(0,400);/* a talk line / a new card set on the same frame is a new step */
  if(sk===last){if(++same>=6){rows.push({dev,start:NM,screen:S0.scr,label:'(loop)',verdict:'FAIL',why:'the same screen after 6 taps'});ended=true;break}}else{same=0;last=sk}
  const screen=NM+' · '+S0.scr;const doTap=async(key,lbl,full)=>{const h=await p.evaluateHandle(k=>__bc.find(k),key);const el=h.asElement();if(!el){rows.push({dev,start:NM,screen,label:lbl,verdict:'SKIP',why:'button gone before its tap'});return null}
   const pre=await p.evaluate(()=>__bc.sig());ER.clr();let dm='';const shot=path.join(OUT,'shots',`${dev}-${NM}-${rows.length}.jpg`);let r;
   await p.waitForFunction(k=>{const e=__bc.find(k);return !__bc.busy()||!!(e&&e.closest('#klife,#kload,#kroul,#kroulw,#dawn,.kload'))},key,{timeout:8000}).catch(()=>{});/* (not when the target sits IN that veil: the #kload «BÁO … Vào cung ngay» page is the screen itself) *//* FIXER #18: a fresh-page draw brings the #kload veil back a moment after the snapshot (iPad «Theo thái giám…» covered by div.kpnote in #kload) — a player waits for it */
   r=await press(p,el,{screen,label:lbl,shot,log:m=>dm=m,liftOnly:!full});
   /* FIXER #19 N1 (BIG #19): under load the scene veil (#kload.kpscene) stays past the 8 s wait → a legit talk line read DEAD «covered by div#kload»; a player waits for the veil to go: wait (≤ 20 s more) and tap once more before judging */
   if(!r.ok&&/#kload|\.kload|#klife|#dawn/.test(dm)&&!(await el.evaluate(e=>!!e.closest('#klife,#kload,#kroul,#kroulw,#dawn,.kload')).catch(()=>true))){await p.waitForFunction(()=>!__bc.busy(),null,{timeout:20000}).catch(()=>{});await p.waitForTimeout(300);const h2=await p.evaluateHandle(k=>__bc.find(k),key);const el2=h2.asElement();if(el2){dm='';r=await press(p,el2,{screen,label:lbl,shot,log:m=>dm=m,liftOnly:!full});if(r.ok)rows.push({dev,start:NM,screen,label:lbl,verdict:'WARN',why:'veil (#kload) over the target past 8 s — waited for it, tapped again'})}}
   const n2=r.two==='lift+chip'?2:1;taps+=n2;wt+=n2;await p.waitForTimeout(500);await settle(p,6000);const post=await p.evaluate(()=>__bc.sig());const er=ER.get();const ch=JSON.stringify(pre)!==JSON.stringify(post);
   const v=!r.ok?'FAIL':er.length?'FAIL':r.two==='locked'?(r.locked?'PASS':'FAIL'):r.two==='lift-only'?(r.up&&r.ch?'PASS':'FAIL'):r.two==='lift'?'FAIL':r.two==='lift+chip'?(r.chosen?'PASS':'FAIL'):ch?'PASS':'FAIL';
   const why=!r.ok?(dm||r.why||'not tappable'):er.length?'JS error: '+er[0]:r.two==='locked'?r.why:r.two==='lift-only'?(r.up&&r.ch?'lifts (the tapped card), its chip shows':'1st tap: '+(r.why||'lifted '+r.up+', chip '+r.ch)):r.two==='lift'?r.why:r.two==='lift+chip'&&!r.chosen?r.why:(r.two?r.two+': ':'')+(ch?'next':'no effect');
   if(v==='FAIL')await p.screenshot({path:shot,type:'jpeg',quality:55}).catch(()=>{});rows.push({dev,start:NM,screen,label:lbl,el:'',hit:r.ok?'ok':'DEAD',two:r.two||undefined,kind:r.k||undefined,verdict:v,why,shot:v==='FAIL'?shot:''});return r};
  const box=S0.L.find(b=>/^\(Chạm để tiếp\)/.test(b.label));
  if(box){await doTap(box.key,box.label,true);continue}
  if(S0.two.length){const T=S0.two.map(k=>S0.L.find(b=>b.key===k)).filter(Boolean);/* FIXER #23: in S0.two order (locked first, an open part last) */for(const b of T.slice(0,-1)){await doTap(b.key,b.label,false);if(wt>=SELXMAX)break}const z=T[T.length-1];await doTap(z.key,z.label,true);continue}
  const PRIM=/^(Tiếp|Đi|Vào|Được|Nhận|Xong|Đã hiểu|Ngủ|Theo|Cất|Ra)/;const b=S0.L.find(b=>b.el.startsWith('button')&&!b.x&&PRIM.test(b.label))||S0.L.find(b=>/kopt|opt/.test(b.el))||S0.L.find(b=>!b.x)||S0.L[0];await doTap(b.key,b.label,true)}
 if(!ended)rows.push({dev,start:NM,screen:NM,label:'(budget)',verdict:'FAIL',why:'walk cut by budget at '+wt+' taps (no end: the room was never reached) — raise --'+NM+'-max'});
 console.log(`[${dev}] ${NM} · ${wt} taps${ended?'':' (cut by budget)'}`)}
async function crawlTour(p,dev,ER){
 /* a brand-new player: title → «Chơi một mình» → every first-life screen, by real taps on the main button of each screen; every tap logged */
 const fresh=async(log)=>{await p.evaluate(()=>{try{localStorage.clear();localStorage.setItem('hclh-tut-test','1')/* jtut autoOk(): a webdriver page gets the tour only with the test flag (a real phone has no webdriver) */}catch(e){}try{REC.tour='';REC.asked=0}catch(e){}document.querySelectorAll('#kload,#klife').forEach(e=>e.remove());
   document.getElementById('modal').hidden=true;const T=document.getElementById('title');T.hidden=false;showTitle()});
  const PRIM=/^(Chơi một mình|Tiếp|Vào cung|Nhập cung|Bắt đầu|Quay|Gieo|Xem|Được|Đã hiểu|Nhận|Đi|Vào)/;
  let last='';const tried={};for(let k=0;k<40;k++){await settle(p,6000);await p.waitForTimeout(300);
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
   const ok=(await press(p,h.asElement(),{screen,label:pick.label,shot,log:m=>dm=m})).ok;taps++;await p.waitForTimeout(600);await settle(p,6000);
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
 if(process.env.BCPROBE)await ctx.addInitScript(()=>{const t0=Date.now(),a=Node.prototype.appendChild;Node.prototype.appendChild=function(n){if(n&&(n.id==='kload'||n.id==='klife'))console.log('BCPROBE add #'+n.id+' +'+(Date.now()-t0)+'ms '+(new Error().stack||'').split('\n').slice(2,6).join(' | '));return a.call(this,n)}});
 let p,errs=[];const errsRef={get:()=>errs,clr:()=>{errs=[]}};
 async function open(){p=await ctx.newPage();await p.route(BLOCK,r=>r.abort());
  p.on('pageerror',e=>errs.push(e.message+' @'+((e.stack||'').split('\n')[1]||'').trim().slice(0,80)));
  p.on('console',m=>{if(process.env.BCPROBE&&/^BCPROBE/.test(m.text()))console.log('['+dev+'] '+new Date().toISOString().slice(11,19)+' '+m.text().slice(0,400));if(m.type()==='error'&&!NOISE.test(m.text()))errs.push('console.error: '+m.text().slice(0,150))});
  p.on('dialog',d=>d.dismiss().catch(()=>{}));p.on('crash',()=>console.log('PAGE CRASH ('+dev+')'));p.on('close',()=>console.log('PAGE CLOSED ('+dev+')'));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof showTitle==='function',null,{timeout:180000});
  await waitLoad(p,dev,'open');
  await p.waitForTimeout(1500);await p.evaluate(INPAGE);RB[dev]=await p.evaluate(()=>typeof kitHandLift==='function'||typeof window.kitPick==='function').catch(()=>false)}
 await open();
 const startState={};
 /* START title: the title screen as she sees it on opening (first-load picture dialog removed = second visit) */
 startState.title=async()=>{await p.evaluate(()=>{if(window.__tRoul0){kitRoulette=window.__tRoul0;window.__tRoul0=null}/* the title crawl starts lives by real taps: the real roulette is part of what is checked */try{localStorage.clear()}catch(e){}document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());__bc.sv=null;__bc.baseline();__bc.restore(true)})};
 /* START home: a fresh life (solo), first buổi, home screen */
 startState.home=async()=>{await p.evaluate(()=>{if(typeof kitRoulette==='function'&&!window.__tRoul0){window.__tRoul0=kitRoulette;kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}/* TEST SETUP ONLY (lc15 QC, #kroul race): the new-life roulette waits for its pictures (≤8 s) before it builds #kroul, so under CPU load it landed AFTER this setup removed the veils and covered the home screen (false «dead button under div#kroul»); a JS-started life skips it */try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  /* the first-life LỜI DẶN tour is crawled on its own (START tour); here it counts as already seen */
  try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}
  for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
  /* save-fix-stack rv23: «Nhận thân phận» as a player (as look-dedupe / save-boundary-reload): with the save stack the sổ is written while the identity card
     is open (unseen card kept), so ☰ → ✕ rightly resumed THAT card (G4 90 «Ô lưu · Lui» FAIL); a tú nữ life's 3 selection days are ended for the harness.
     rv24 merge with LIVE KK35: the life is accepted (NLP cleared → save() writes the sổ, ☰ → ✕ resumes a real saved life), then saved after the selx end,
     and «Điều mới trong cung» is marked seen (it pops once a sổ exists; second visit) */
  try{if(typeof nlAccept==='function'&&typeof NLP!=='undefined'&&NLP)nlAccept(false)}catch(e){}try{/* FIXER #25 F5 (BIG #22): only START home ends the selection days — START selx calls this same setup (h0) with __bcNoSelx=0 and must SEE them */if(window.__bcNoSelx&&S.selx2&&S.selx2.days){S.selx2.days=0;S.selx2.done=1}}catch(e){}
  try{S.tutTour=1;coachOff&&coachOff()}catch(e){}
  try{save();/* rv27: CTM_NOTES is a top-level const (not on window) → the old window.CTM_NOTES check never marked; CTM_NOTES_UI is the window handle */if(window.CTM_NOTES_UI&&CTM_NOTES_UI.list.length)localStorage.setItem('ctm-notes-seen',CTM_NOTES_UI.list[0].id)}catch(e){}
  Q.length=0;document.getElementById('modal').hidden=true;
  document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());render()});
  /* the life-start veils (roulette, «Sửa soạn nhập cung») can come a moment later: wait for them, take them down, then snapshot */
  await p.waitForTimeout(2500);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render();__bc.snap()})};
 {const h0=startState.home;startState.home=async()=>{await p.evaluate(()=>{window.__bcNoSelx=1}).catch(()=>{});try{await h0()}finally{await p.evaluate(()=>{window.__bcNoSelx=0}).catch(()=>{})}
   /* a frame that pops a moment after the snapshot («Điều mới trong cung», ring build Fold) would cover every home button («gone»): wait, put it away, snapshot again (setup only) */
   for(let i=0;i<3;i++){await p.waitForTimeout(1500);const late=await p.evaluate(()=>{const M=document.getElementById('modal');return !M.hidden||__bc.liveRoots().some(r=>r!==document.body&&!__bc.homeLive.has(r))}).catch(()=>false);if(!late)break;
    await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());render();__bc.snap()}).catch(()=>{})}}; /* FIXER #17: home = the room (selection days off, setup only) */
  /* START talk (FIXER #17): the room, then ONE real game event shown as a kitStage talk (the way dev/test/kit-stage.js fires it: rgFire('c2a') + talk:1), so the thẻ gỗ plaques (kitPick) are pressed */
  startState.talk=async()=>{await startState.home();await p.evaluate(async()=>{for(let k=0;k<6;k++){try{S.evc=null;EVCW.length=0}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;try{if(typeof rgFire==='function'&&rgFire('c2a')){Q.length=1;Q[0].__ks='c2a';Q[0].talk=1;showModal();return}}catch(e){}window.__nlInner=1;try{start()}catch(e){}window.__nlInner=0;Q.length=0;await new Promise(r=>setTimeout(r,1500))}}).catch(()=>{})};
  startState.selx=async()=>{await p.evaluate(()=>{window.__bcNoSelx=0;try{if(window.CTM_NOTES&&CTM_NOTES.length)localStorage.setItem('ctm-notes-seen',CTM_NOTES[0].id)}catch(e){}}).catch(()=>{});await h0()}}
 /* START save (--save <robot dump with .ls>): a mid-life robot save (later ranks, more tabs) loaded through the game's own slot loader */
 const SAVE=opt('save',false);const SAVELS=SAVE?JSON.parse(fs.readFileSync(path.resolve(SAVE),'utf8')).ls:null;
 startState.save=SAVELS&&(async()=>{await p.evaluate(ls=>{try{localStorage.clear();for(const k in ls)localStorage.setItem(k,ls[k])}catch(e){}try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}
  const n=+(ls['hclh-slot']||1)||1;const d=loadSlot(n);SLOT=n;try{kmReset&&kmReset()}catch(e){}quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;deal();render();if(S.mg)S.mg=null;/* = j6 data-load handler (setup only) */try{S.tutTour=1;coachOff&&coachOff()}catch(e){}},SAVELS);
  await p.waitForTimeout(3000);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,.kmov').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render();try{k3Home()}catch(e){}__bc.snap()})});
 const SL=STARTS.concat(['__chk']);let hRetry=0;/* FIXER #18 F3: a vacuous START home (below --home-floor, or more «gone» than taps: iPad «1 tap, 25 gone» under load) is crawled ONCE more on this device; the gate floor judges the second pass */
 for(const st of SL){if(st==='__chk'){const H=rows.filter(r=>r.dev===dev&&r.start==='home'),tp=H.filter(r=>r.verdict!=='SKIP').length,gone=H.filter(r=>/gone before its tap/.test(r.why||'')).length;
   if(FAST&&STARTS.includes('home')&&!hRetry&&(tp<+opt('home-floor',40)||gone>tp)){hRetry=1;for(let i=rows.length-1;i>=0;i--)if(rows[i].dev===dev&&rows[i].start==='home')rows.splice(i,1);rows.push({dev,start:'home-retry',label:'(home re-crawl)',verdict:'WARN',why:'first START home pass was vacuous ('+tp+' taps, '+gone+' gone) — crawled once more'});console.log(`[${dev}] home vacuous (${tp} taps, ${gone} gone) → re-crawl once`);await p.close().catch(()=>{});await open().catch(()=>{});SL.push('home','__chk')}continue}
  if(st==='tour'){await crawlTour(p,dev,errsRef);continue}if(st==='talk'){await walkSelx(p,dev,errsRef,startState.talk,'talk',TALKMAX);continue}if(st==='selx'){/* a fresh page per drawn life: after a long home crawl the in-memory game state no longer starts the selection days */await walkSelx(p,dev,errsRef,async()=>{await p.reload({waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof deser==='function',null,{timeout:180000});await waitLoad(p,dev,'reload');await p.waitForTimeout(1200);await p.evaluate(INPAGE);await startState.selx()});continue}if(!startState[st])continue;
  await startState[st]();await p.waitForTimeout(600);
  const withTitle=st==='title';
  const goto=async(pathK)=>{ /* restore + replay a path of real taps */
   if(p.isClosed()||!(await p.evaluate(()=>!!window.__bc).catch(()=>false))){await open();await startState[st]()}
   if(withTitle){await p.reload({waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof showTitle==='function',null,{timeout:180000});await waitLoad(p,dev,'reload');await p.waitForTimeout(1200);await p.evaluate(INPAGE);await startState.title()}
   else{await p.evaluate(t=>__bc.restore(t),withTitle);await p.waitForTimeout(150);await settle(p);
    if(!(await p.evaluate(()=>__bc.isHome()))||(await p.waitForTimeout(700),!(await p.evaluate(()=>__bc.isHome())))){ /* FIXER #17: also a frame that comes BACK just after the restore (ring build iPad: the ☰ «Lui» frame re-opened → 36 home buttons «gone») */ /* soft restore left a frame up: reload the page and load the same snapshot (harness) */
     const sv=await p.evaluate(()=>__bc.sv);hard++;
     await p.reload({waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof deser==='function',null,{timeout:180000});await waitLoad(p,dev,'reload');await p.waitForTimeout(1200);await p.evaluate(INPAGE);
     await p.evaluate(sv=>{try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}document.getElementById('title').hidden=true;document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());
      deser(JSON.parse(sv));try{S.tutTour=1}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;render();try{k3Home()}catch(e){}},sv);
     await p.waitForTimeout(2500);await p.evaluate(sv=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render();__bc.sv=sv;__bc.snap();__bc.sv=sv},sv)}}
   await p.waitForTimeout(150);await settle(p);
   /* back to the room the way she does it: tap «Về phòng» when the restore left a panel open */
   if(!withTitle&&await p.evaluate(()=>{const e=document.getElementById('k3room');return !!e&&__bc.vis(e)}))await tap(p,'#k3room',{log:()=>{}});
   for(const k of pathK){await p.evaluate(()=>__bc.list());const h=await p.evaluateHandle(k=>__bc.find(k),k);const el=h.asElement();
    const fsh=path.join(OUT,'shots',`${dev}-replay-${rows.length}.jpg`);
    if(!el){await p.screenshot({path:fsh,type:'jpeg',quality:50}).catch(()=>{});const vis=await p.evaluate(()=>__bc.list().map(x=>x.label).slice(0,12).join(' ; '));return 'path button gone: '+k+' · on screen: '+vis+' · '+fsh}
    let dm='';const ok=(await press(p,el,{screen:dev,label:k,shot:fsh,log:m=>{dm=m}})).ok;if(!ok)return 'path button not tappable: '+k+' '+dm;await p.waitForTimeout(700);await settle(p)}
   return ''};
  const seen=new Set();const queue=[[]];const parentOf=new Map();
  const used=()=>rows.filter(r=>r.dev===dev&&r.start===st&&r.verdict!=='SKIP').length;/* FIXER #18 F3 ROOT: the --max budget was the GLOBAL tap count of every device crawled in parallel (+ selx / talk taps): Fold's home used it up and iPad's home got the rest (BIG #18 iPad «0 taps», here «1» / «8») — now per device and START */
  while(queue.length&&used()<MAXTAPS){const pathK=queue.shift();const par=parentOf.get(pathK.join('>'))||null;
   const g=await goto(pathK);if(g){rows.push({dev,start:st,path:pathK,label:'(replay)',verdict:'SKIP',why:g});continue}
   const sig0=await p.evaluate(()=>__bc.sig());const topL=sig0.roots.filter(r=>!r.startsWith('body'));const sk=topL.length?JSON.stringify(topL):JSON.stringify([sig0.roots.map(r=>r.startsWith('body')?'body':r),sig0.tab,sig0.panel,sig0.title]);/* a frame on top = the same screen whatever tab lies under it */
   if(seen.has(sk)&&pathK.length){continue}seen.add(sk);
   let L=await p.evaluate(()=>__bc.list());
   /* a screen one tap deeper: tap only what is NEW on it (the new frame's buttons; for a new tab, the buttons of its panel) —
      the buttons it shares with the screen it came from were tapped there already */
   if(par){const pd=new Set(par.roots.map(r=>r.startsWith('body')?'body':r));const tabNew=par.tab!==sig0.tab||par.panel!==sig0.panel;
    if(process.env.BCDBG)console.log('FILTER',JSON.stringify({pd:[...pd],tabNew,pp:par.panel,sp:sig0.panel,sample:L.slice(0,40).map(b=>[b.label.slice(0,12),b.rk.slice(0,30),b.inPanel])}));
    L=L.filter(b=>!pd.has(b.rk)||(b.rk==='body'&&tabNew&&b.inPanel))}
   /* FIXER #20 N3 (BIG #20: iPad 22–23 SKIP «gone … live div#kpop» each run): on a POPOVER screen (#kpop «sương sớm» weather, a non-modal kpPop over the room) the
      room's own panel buttons were re-listed as «new» (the popover changes the panel sig) — they are the home buttons already tapped at depth 0, and after the replay
      they read «gone». A popover screen = only the popover's own buttons. */
   if(topL.some(r=>/kpop/.test(r)))L=L.filter(b=>b.rk!=='body');
   const screen=(pathK.length?pathK.map(k=>k.split('|').pop().replace(/#\d+$/,'')).join(' › '):st)+' ['+(sig0.roots[sig0.roots.length-1]||'').slice(0,60)+']';
   console.log(`[${dev}] ${st} depth ${pathK.length} · ${L.length} buttons · ${screen}`);
   /* what moves by itself on this screen (an animation, a clock) is not an effect of a tap */
   const nz=await p.evaluate(async()=>{const a=__bc.sig();await new Promise(r=>setTimeout(r,700));const b=__bc.sig();return Object.keys(a).filter(k=>JSON.stringify(a[k])!==JSON.stringify(b[k]))});
   const strip=o=>{if(!o||o.nav)return o;const c=Object.assign({},o);for(const k of nz)delete c[k];return c};
   let dirty=false;
   for(const bt of L){if(used()>=MAXTAPS)break;
    if(dirty){const g2=await goto(pathK);if(g2){rows.push({dev,start:st,path:pathK,screen,label:bt.label,verdict:'SKIP',why:g2});continue}dirty=false}
    await settle(p);await p.evaluate(()=>__bc.list());
    const pre=await p.evaluate(()=>__bc.sig());errs=[];
    let h=await p.evaluateHandle(k=>__bc.find(k),bt.key);let el=h.asElement();
    /* FIXER #19 G2 ROOT (BIG #19, two-device ring run: first home pass 0 / 1 taps, every row «gone» with «live div#kload.modal.kpscene · busy true»): the life-start scene veil
       (#kload .kpscene «nhập cung») comes back AFTER the setup's late-frame checks (≈4.5 s) under load, and after every hard restore (page reload) — it covers the whole room, so
       list() tags nothing under it. A player waits for the veil: wait ≤ 15 s; still up = the setup veil (the same one startState.home removes; it also comes back after a restore under a frame: iPad «sương sớm» › kpop, 33 rows) → take it
       down, list again, find the button. Not when the button sits IN that veil. */
    if(!el&&await p.evaluate(()=>__bc.busy()).catch(()=>false)){await p.waitForFunction(()=>!__bc.busy(),null,{timeout:15000}).catch(()=>{});
     const rm=await p.evaluate(()=>{const b=__bc.busy();if(b)document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());__bc.list();return b}).catch(()=>false);
     h=await p.evaluateHandle(k=>__bc.find(k),bt.key);el=h.asElement();vHome[dev]=(vHome[dev]||0)+1;if(vHome[dev]===1)rows.push({dev,start:st,path:pathK,label:'(home veil)',verdict:'WARN',why:'the life-start veil (#kload) came back over the room after the setup / a restore — '+(rm?'still up after 15 s: taken down (setup)':'waited for it')+(el?', the button is back':', the button is still gone')})}
    if(!el){if(process.env.BCDBG){const now=await p.evaluate(()=>__bc.list().map(x=>x.key));console.log('GONE',bt.key,'\n NOW',now.filter(k=>!L.some(x=>x.key===k)).join(' ;; '));await p.screenshot({path:path.join(OUT,'gone.jpg')})}
     const gw=await p.evaluate(k=>{const n=document.querySelectorAll('[data-bc]').length;const R=__bc.liveRoots().map(r=>r===document.body?'body':__bc.desc(r));const nk=k.replace(/#\d+$/,'').split('|').pop();const same=[...__bc.cands()].filter(e=>__bc.label(e)===nk).map(e=>(__bc.vis(e)?'vis ':'hidden ')+__bc.desc(__bc.root(e))).slice(0,2);return 'live '+R.join(',')+' · busy '+__bc.busy()+' · modal '+(document.getElementById('modal').hidden?'off':'on')+' · tagged '+n+' · same label: '+(same.join(' / ')||'none')},bt.key).catch(e=>'probe failed');
     rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,verdict:'SKIP',why:'button gone before its tap ('+gw+')'});continue} /* FIXER #19 G2: what the page held when the button was «gone» (the root of the vacuous first home pass) */
    const rootH=await el.evaluateHandle(e=>__bc.root(e));const selfSt=e=>e.isConnected?e.className+'|'+(e.getAttribute('aria-pressed')||'')+'|'+(e.getAttribute('aria-expanded')||'')+'|'+(e.innerText||'').slice(0,40):'gone';
    const self0=await el.evaluate(e=>e.isConnected?e.className+'|'+(e.getAttribute('aria-pressed')||'')+'|'+(e.getAttribute('aria-expanded')||'')+'|'+(e.innerText||'').slice(0,40):'gone').catch(()=>'');
    const shot=path.join(OUT,'shots',`${dev}-${String(rows.length).padStart(4,'0')}.jpg`);
    let dead=null;const pr=await press(p,el,{screen,label:bt.label,shot,log:m=>{dead=m}});const ok=pr.ok;taps+=pr.two==='lift+chip'?2:1;
    if(pr.two==='locked'){rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:'ok',two:'locked',verdict:pr.locked?'PASS':'FAIL',why:'two-tap part: '+pr.why,shot:pr.locked?'':shot});if(!pr.locked)await p.screenshot({path:shot,type:'jpeg',quality:55}).catch(()=>{});dirty=true;continue} /* FIXER #23 F3 */
    if(pr.two==='lift'){rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:'ok',two:'lift',verdict:'FAIL',why:'two-tap part: '+pr.why,shot});await p.screenshot({path:shot,type:'jpeg',quality:55}).catch(()=>{});dirty=true;continue}
    if(pr.two==='lift+chip'&&!pr.chosen){rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:'ok',two:'lift+chip',verdict:'FAIL',why:'two-tap part: '+pr.why,shot});await p.screenshot({path:shot,type:'jpeg',quality:55}).catch(()=>{});dirty=true;continue} /* FIXER #18 F1: judged after the lift, never against the pre-lift screen */
    if(!ok&&!dead)dead='DEAD BUTTON '+JSON.stringify({why:'chip not tappable'});
    if(!ok){const d=JSON.parse(dead.replace(/^DEAD BUTTON /,''));if(/^(disabled|gone|popup)$/.test(d.why)){rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:d.why,verdict:'WARN',why:d.why==='disabled'?'greyed out (not tappable now)':d.why==='gone'?'left the page before the tap':'under a hint popup '+d.cover});continue}rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:'DEAD',verdict:'FAIL',why:'dead button: '+d.why+(d.cover?' under '+d.cover+(d.coverText?' «'+d.coverText+'»':''):''),shot});continue}
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
    rows.push({dev,start:st,path:pathK,screen,label:bt.label,el:bt.el,hit:'ok',two:pr.two||undefined,verdict:v,why:(pr.two?pr.two+': ':'')+why,shot:v==='FAIL'?shot:''});
    const changed=JSON.stringify(pre)!==JSON.stringify(post);if(changed)dirty=true;
    const newScreen=JSON.stringify(pre.roots)!==JSON.stringify(post.roots)||pre.tab!==post.tab||pre.panel!==post.panel||pre.title!==post.title;
    if(newScreen&&pathK.length<DEPTH){const tl=post.roots.filter(r=>!r.startsWith('body'));const nk=tl.length?JSON.stringify(tl):JSON.stringify([post.roots.map(r=>r.startsWith('body')?'body':r),post.tab,post.panel,post.title]);if(!seen.has(nk)){const np=pathK.concat([bt.key]);parentOf.set(np.join('>'),pre);queue.push(np)}}
   }
   fs.writeFileSync(path.join(OUT,`crawl-${dev}.json`),JSON.stringify(rows.filter(r=>r.dev===dev)))}
 }
 await ctx.close()}

(async()=>{const URL=/^https?:/.test(GAME)?GAME:await serve(GAME);const b=await chromium.launch();const t0=Date.now();
 await Promise.all(DEV.map(d=>crawlDev(b,URL,d).catch(e=>{console.log('CRAWL CRASH',d,e.message);rows.push({dev:d,label:'(crawler)',verdict:'FAIL',why:'crawler crashed: '+e.message.slice(0,120)})})));
 await b.close();fs.writeFileSync(path.join(OUT,'crawl-all.json'),JSON.stringify(rows));fs.writeFileSync(path.join(OUT,'crawl-load.json'),JSON.stringify(WL));/* FIXER #20: every first-load / life-gate wait (dev, why, ms, still up?) */
 const n=k=>rows.filter(r=>r.verdict===k).length;
 console.log(`BUTTON CRAWL ${n('FAIL')?'FAIL':'PASS'} · ${DEV.join('+')} · taps ${taps} · PASS ${n('PASS')} · FAIL ${n('FAIL')} (dead ${rows.filter(r=>r.hit==='DEAD').length}) · WARN ${n('WARN')} · SKIP ${n('SKIP')} · hard restores ${hard} · ${Math.round((Date.now()-t0)/1000)} s`);
 /* gate (fast) fails on the sure faults only: a dead (covered/off-screen) button, a JS error on a tap, a ✕/close that does not close */
 /* faults already filed and owned (dev/tools/quickcheck.d/button-crawl-known.txt: «regex<TAB>owner/request») are listed, not gating */
 let known=[];try{known=fs.readFileSync(path.join(REPO,'dev','tools','quickcheck.d','button-crawl-known.txt'),'utf8').split('\n').filter(l=>l.trim()&&!l.startsWith('#')).map(l=>{const [re,why]=l.split('\t');return{re:new RegExp(re),why:why||''}})}catch(e){}
 const isKnown=r=>known.find(k=>k.re.test((r.screen||'')+' · '+(r.label||'')+' · '+(r.why||'')));
 const sure0=rows.filter(r=>r.verdict==='FAIL'&&(r.hit==='DEAD'||/^JS error|^close button|crawler crashed/.test(r.why||'')||!!r.two)); /* FIXER #18 F1/F2: a two-tap part that does not lift the tapped card / whose ✓ «Chọn» does nothing is a sure fault too */
 /* FIXER #18 F3 (BIG #18, RV-165 lesson): a vacuous home is a gate FAIL — START home with fewer than --home-floor tapped rows (fast 40), or more «gone» SKIPs than taps */
 if(FAST&&STARTS.includes('home'))for(const d of DEV){const H=rows.filter(r=>r.dev===d&&r.start==='home'),tp=H.filter(r=>r.verdict!=='SKIP').length,gone=H.filter(r=>/gone before its tap/.test(r.why||'')).length,fl=+opt('home-floor',40);
  if(tp<fl||gone>tp)rows.push({dev:d,start:'home',label:'(home floor)',verdict:'FAIL',why:'vacuous home: '+tp+' home taps (floor '+fl+'), '+gone+' «button gone before its tap» SKIPs — the room was not crawled'})}
 /* FIXER #19 G1 (BIG #19): ring UI seen on ANY device (a two-tap row) ⇒ EVERY device crawled must have driven ≥ 1 two-tap part (selx / talk / home) — the two-device run where Fold drove 0 hand cards read PASS */
 /* FIXER #20 (M1 on LIVE 0562e15f passed: the LIVE selection days end in the room before any hand — 0 two-tap rows on EVERY device, so the rule below never fired):
    a ring build (kitHand / kitPick present) whose selx / talk walk drove NO two-tap row on ANY device = sure FAIL too */
 if(!rows.some(r=>r.two)&&(STARTS.includes('selx')||STARTS.includes('talk'))&&DEV.some(d=>RB[d]))for(const d of DEV)rows.push({dev:d,start:'ring',label:'(ring floor)',verdict:'FAIL',why:'ring UI not driven: this build has kitHand / kitPick but the selx / talk walk made 0 two-tap rows on every device'});
 else if(rows.some(r=>r.two)&&(STARTS.includes('selx')||STARTS.includes('talk')))for(const d of DEV)if(!rows.some(r=>r.dev===d&&r.two))rows.push({dev:d,start:'ring',label:'(ring floor)',verdict:'FAIL',why:'ring UI not driven: 0 two-tap rows on this device (another device drove '+rows.filter(r=>r.two).length+')'});
 const sure=sure0.concat(rows.filter(r=>r.label==='(home floor)'||r.label==='(ring floor)'||r.label==='(selx floor)'||r.label==='(budget)'||r.label==='(first load)'||r.label==='(no target)'||r.label==='(loop)'/* (loop) = the same selx screen after 6 taps (M7: a ✓ that drops the choice brings the same hand back) */ /* FIXER #22 F1b (BIG #21): a selection-day screen with nothing to tap = a player stuck there */)).filter(r=>!isKnown(r));if(FAST)for(const r of sure0.filter(isKnown))console.log('  KNOWN',r.dev,'·',r.label,'·',isKnown(r).why);
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
