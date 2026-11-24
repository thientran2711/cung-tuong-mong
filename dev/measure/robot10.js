/* ROBOT-10 — robots play whole lives and report every bug (owner OD 23/11 ~19:20Z «ROBOT PLAYTEST BEFORE SHE PLAYS»).
 USAGE
   node dev/measure/robot10.js <origin> <branch|all|spread> <bots> <lives> [out]
     origin  tt dtq muoi cn nc td ch thd cnv (the 9 roulette origins) or bd pf (hòa-thân country branches, ORIGIN_BR; bd = the 10th thân phận
             group in BAL.orig.art). "list" prints every origin + road id the game has.
     branch  a road id (premise arc, S.st.f14.road: tt_co tt_oan …), 1-4 (the origin's n-th road), "all" (every road × every bot) or
             "spread" (bot i plays road i mod 4: 10 bots cover all 4 roads in one pass)
     bots    1-10 (the first N of: skilled random greedy cautious schemer lover scholar rebel lazy speed) or a comma list of names
     lives   kiếp per bot per road
     out     output folder (default dev/handover/robot). Writes <origin>-<yyyymmdd-hhmm>.md (THE bug file of the run), results JSON,
             saves/ (repro saves), shots/ (first screenshot of each UI bug; shots never go in git — upload with dev/site/cdn_sync.py if needed)
   env GAME=<index.html path or https URL> (default: this checkout's index.html = LIVE when on main) · PAR=2 parallel browsers (a life peaks ~5 GB RSS; 15 GB box)
       CAP=1800 s wall cap per life · UIEVERY=150 buổi between UI checkpoints (0 = off) · DEV=fold,ipad · SEED=<n> base seed
       LAGMS=1500 lag flag per buổi in the bot page · UILAG=400 long-task flag (ms) in the real pages · OLDSAVE=<file.json,...> extra old saves
       MEMEVERY=30 s between memory samples (JS heap / DOM nodes / listeners per page + renderer RSS) · RECYCLE=0 keeps the real pages open across
       UI checkpoints (default re-opens them each checkpoint, harness side; the bot page is never recycled, so its growth is the game's own)
 OUTPUTS (besides the bug file): <out>/catalog.json = every death cause / ending of the game (robot10-cat.js: code scan + the game's ending tables),
   read by robot10-agg.js · per life in the results JSON: life{… m:{die, framed, family, favor, economy, mini-games, kỳ ngộ, option pick counts,
   events, pace counters, rankAt}} (OWNER ORDER #4 metric set) + mem{bot, ui, rss} samples. Round report: node dev/measure/robot10-agg.js <folders> → rates-*.md/.csv
 ODDS WORDS: the act-odds ladder is read from the game (window.KIT_ODDS), never typed here; «khả năng vừa/cao/thấp» is the side-chance scale (OD:L221)
 WHAT ONE LIFE DOES
   fast bot page (inpage6.js bot + inty.js + robot10-in.js; render off, seeded Math.random) plays one whole kiếp of the forced origin + road with
   one personality, until the game's own ending (over()) or the cap. Checks: JS errors (pageerror + console.error the game swallows), stuck /
   no progress (inpage6 TIMEOUT, wall cap), crash, stat sanity (NaN / negative / over cap), save→load→save round-trip each buổi, one-core
   number audit (number printed on an option vs the effect it applies), cổ-trang wording (no %, odds words only from the VANPHONG ladder,
   journal + ending text too), lag per buổi, ending reached, forced road really played.
   Every UIEVERY buổi the bot's save is loaded through the title slot (the real load path) into real-render pages at Fold 755x1000 and iPad
   1180x820; every tab (+ the open card) is scanned: horizontal overflow, cut text, off-screen buttons, covered / overlapping buttons,
   % and off-ladder odds words, HUD numbers = state, long tasks. At the first checkpoint the same save is also loaded as old versions
   (v5 / v4 / v3 headers, the life's first save, OLDSAVE files). Character portraits are not checked (images are blocked).
 ADD A CHECK
   in-game rule → robot10-in.js: call R.bug(type,msg,detail) (one entry per type+msg; repeats count n; the buổi's save is attached).
   UI rule → uiScan() below: push {k,msg,ex} into out. Node-side rule → bug(job,type,msg,detail).
*/
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const M=__dirname,REPO=path.join(M,'..','..');
const BOTS=['skilled','random','greedy','cautious','schemer','lover','scholar','rebel','lazy','speed'];
const [ORIGIN,BR,BOTA,LIVES,OUT0]=process.argv.slice(2);
const OUT=path.resolve(OUT0||path.join(REPO,'dev','handover','robot'));
const GAME=process.env.GAME||path.join(REPO,'index.html');let URL=/^https?:/.test(GAME)?GAME:null;
/* a local game is served over http (as on LIVE), never file:// (fetch() of json/audio fails on file://) */
function serve(file){const http=require('http');const root=path.dirname(path.resolve(file)),idx=path.basename(file);const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css','.webmanifest':'application/manifest+json'};
 return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);
  if(!f.startsWith(root)){r.writeHead(403);return r.end()}fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})});
  sv.listen(0,'127.0.0.1',()=>{sv.unref();res('http://127.0.0.1:'+sv.address().port+'/'+idx)})})}
/* noise that is the harness, not the game: blocked pictures/sounds */
const NOISE=/Failed to load resource|net::ERR_|Fetch API cannot load|ERR_FAILED|ERR_ABORTED/;
const PAR=+process.env.PAR||2,CAP=(+process.env.CAP||1800)*1e3,UIEVERY=process.env.UIEVERY==null?150:+process.env.UIEVERY,SEED=+process.env.SEED||1;
const DEVS={fold:[755,1000],ipad:[1180,820]};const DEV=(process.env.DEV||'fold,ipad').split(',').filter(d=>DEVS[d]);
const RECYCLE=process.env.RECYCLE!=='0';/* default on (part 2, (C)): each real-page load of a save leaves ~5k DOM nodes + ~600 listeners behind (game finding); re-opening the pages keeps a 30-min life inside the box's RAM */
const UILAG=+process.env.UILAG||400,UILOAD=+process.env.UILOAD||5000;
const rd=f=>fs.readFileSync(path.join(M,f),'utf8');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const BLOCK=/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i;
async function boot(b,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},reducedMotion:'reduce'});await ctx.addInitScript(require('./robot10-lag.js').REAL_INIT);const p=await ctx.newPage();
 await p.route(BLOCK,r=>r.abort());p.__errs=[];p.on('pageerror',e=>p.__errs.push(e.message+' '+(e.stack||'').split('\n').slice(1,2).join('').trim()));
 p.on('console',m=>{if(m.type()==='error'&&!NOISE.test(m.text())){const i=p.__errs.push('console.error: '+m.text())-1;
  /* E-FIX-4: where it fired — the Error's top frames + the checkpoint (and its save) being checked, so the row carries a repro */
  p.__eAt=p.__eAt||{};p.__eAt[i]={at:p.__at||'',save:p.__cpSave||null,stk:''};const a=m.args()[0];if(a)a.evaluate(e=>e&&e.stack?String(e.stack).split('\n').slice(1,4).map(x=>x.trim()).join(' | '):'').then(x=>{if(x)p.__eAt[i].stk=x}).catch(()=>{})}});
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof showTitle==='function',null,{timeout:120000});
 await p.waitForTimeout(800);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});return p}
const clean=()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove())};

/* ---- list: every origin + road the game has ---- */
async function list(){const b=await chromium.launch();const p=await boot(b,[390,844]);
 const r=await p.evaluate(()=>{const ks=ORIGINS.map(o=>o.k).concat(Object.keys(ORIGIN_BR));const o={};ks.forEach(k=>o[k]=arcIds67(k).map(id=>({id,n:ARC67[id].n,ok:arcOk67(ARC67[id])})));return o});
 /* the catalogue of every death cause / ending (robot10-cat.js: code scan + the game's own ending tables) → <out>/catalog.json, read by robot10-agg.js */
 try{const CAT=require('./robot10-cat.js');const rt=await p.evaluate(CAT.RUNTIME);const c=CAT.build(CAT.staticScan(REPO),rt);c.roads=r;c.game=URL;
  fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'catalog.json'),JSON.stringify(c,null,1))}catch(e){console.error('catalog: '+e.message)}
 await b.close();return r}

/* ---- the UI scan (runs in a real-render page) ---- */
function uiScan(opt){const W=innerWidth,H=innerHeight,out=[];const strip=s=>String(s||'').replace(/\s+/g,' ').trim();
 const cs=e=>getComputedStyle(e);
 const vis=e=>{if(!e.isConnected)return false;const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return false;for(let x=e;x&&x!==document.body;x=x.parentElement){const s=cs(x);if(s.display==='none'||s.visibility==='hidden'||+s.opacity<.05||x.hidden)return false}return true};
 const name=e=>{let s=e.tagName.toLowerCase();if(e.id)s+='#'+e.id;else if(e.className&&typeof e.className==='string')s+='.'+e.className.trim().split(/\s+/).slice(0,2).join('.');const p=e.parentElement;return (p&&p.id?'#'+p.id+' > ':'')+s};
 const ov=document.getElementById('ov'),md=document.getElementById('modal');
 /* scan the layer she actually sees: the body child under the screen centre (a flip scene, a card, a mini-game or the game itself) */
 let top=document.elementFromPoint(W/2,H/2);while(top&&top.parentElement&&top.parentElement!==document.body)top=top.parentElement;
 const root=(top&&top!==document.body&&top!==document.documentElement)?top:(ov&&!ov.hidden&&vis(ov))?ov:(md&&!md.hidden&&vis(md))?md:document.getElementById('game')||document.body;
 if(document.documentElement.scrollWidth>W+2)out.push({k:'overflow',msg:'page scrolls sideways',ex:document.documentElement.scrollWidth+'px > '+W+'px'});
 const els=[...root.querySelectorAll('*')].filter(e=>!/^(svg|path|g|img|canvas|video|picture|source|use|defs|clippath|lineargradient|stop|filter)$/i.test(e.tagName));
 const scrollAnc=e=>{for(let x=e.parentElement;x&&x!==document.documentElement;x=x.parentElement){const s=cs(x);if(/(auto|scroll)/.test(s.overflowY+s.overflowX)&&(x.scrollHeight>x.clientHeight+1||x.scrollWidth>x.clientWidth+1))return x}return null};
 const pageScrollsY=document.documentElement.scrollHeight>H+2;
 /* E-FIX-4 (R3 kgl.kfx «text off screen» x 318..1007): the part of a text she can SEE = its box cut by every clipping ancestor (overflow hidden / clip,
    e.g. the kit one-line person row KIT §6.3h: cut with «…» + a «!» that opens the full text). Text clipped by a box that ends INSIDE the screen is not
    off screen; a clip at the screen edge (a screen-wide wrapper) still counts: there the screen cuts her text. */
 const seen=e=>{const r=e.getBoundingClientRect();let L=-1e9,R=1e9;for(let x=e.parentElement;x&&x!==document.documentElement;x=x.parentElement){const s=cs(x);if(/(hidden|clip)/.test(s.overflowX)&&!/(auto|scroll)/.test(s.overflowX)){const q=x.getBoundingClientRect();L=Math.max(L,q.left);R=Math.min(R,q.right)}}
  return {left:L>2?Math.max(r.left,L):r.left,right:R<W-2?Math.min(r.right,R):r.right}};
 for(const e of els){if(!vis(e))continue;const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
  if(own){const s=cs(e);const clip=/(hidden|clip)/.test(s.overflowX+s.overflowY)||s.textOverflow==='ellipsis'||s.webkitLineClamp!=='none';
   if(clip&&!/(auto|scroll)/.test(s.overflowX+s.overflowY)&&(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+3))out.push({k:'cut',msg:'text cut: '+name(e),ex:strip(e.textContent).slice(0,80)});
   const r=seen(e);if((r.right>W+2||r.left<-2)&&!scrollAnc(e))out.push({k:'offscreen-text',msg:'text off screen: '+name(e),ex:strip(e.textContent).slice(0,60)+' x '+Math.round(r.left)+'..'+Math.round(r.right)})}}
 const label=e=>strip([...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join(' ')||e.innerText||'');
 const layer=e=>{for(let x=e.parentElement;x&&x!==document.body;x=x.parentElement){const p=cs(x).position;if(p==='absolute'||p==='fixed'||p==='sticky')return x}return document.body};
 /* labelled buttons only (a figure / portrait / icon with role=button is art, not a control label) */
 const btns=[...root.querySelectorAll('button,[role=button],a[href]')].filter(e=>vis(e)&&/\p{L}{2}/u.test(e.innerText||''));
 /* E-FIX-4 (R8 cautious-3 «div.kmrow under button.kmtake» on every Fold tab): a row of a scrolling list passing under a STICKY bar of that same list
    (the reward list's «Nhận», j93 .km-done .kmlist>.kmtake position:sticky) is not covered: she scrolls it out from under the bar */
 const stuck=(t,sa)=>{if(!sa)return false;for(let x=t;x&&x!==sa;x=x.parentElement)if(cs(x).position==='sticky')return sa.contains(x);return false};
 for(const e of btns){const r=e.getBoundingClientRect();const sa=scrollAnc(e);
  if(!sa&&(r.left<-2||r.right>W+2||(!pageScrollsY&&(r.top<-2||r.bottom>H+2))))out.push({k:'offscreen-btn',msg:'button off screen: '+name(e),ex:strip(e.textContent).slice(0,40)+' @'+[r.left,r.top,r.right,r.bottom].map(Math.round).join(',')});
  if(sa){const ar=sa.getBoundingClientRect();if(r.bottom<ar.top||r.top>ar.bottom||r.right<ar.left||r.left>ar.right)continue}
  /* a button scrolled under a fixed bar of another scroll context is not a layout fault (she scrolls it out) */
  const cx=Math.min(W-1,Math.max(0,r.left+r.width/2)),cy=Math.min(H-1,Math.max(0,r.top+r.height/2));const t=document.elementFromPoint(cx,cy);
  if(t&&!e.contains(t)&&!t.contains(e)&&root.contains(t)&&scrollAnc(t)===sa&&layer(t.closest('button,[role=button]')||t)===layer(e)&&!/^(IMG|CANVAS|SVG|VIDEO)$/i.test(t.tagName)&&cx===r.left+r.width/2&&cy===r.top+r.height/2&&!stuck(t,sa)){const tb=t.closest('button,[role=button],.btn');if(!(tb&&(tb.contains(e)||e.contains(tb))))out.push({k:'covered-btn',msg:'button covered: '+name(e)+' under '+name(t),ex:strip(e.textContent).slice(0,40)})}}
 for(let i=0;i<btns.length;i++)for(let j=i+1;j<btns.length;j++){const a=btns[i],b=btns[j];if(a.contains(b)||b.contains(a)||scrollAnc(a)!==scrollAnc(b)||layer(a)!==layer(b))continue;const r1=a.getBoundingClientRect(),r2=b.getBoundingClientRect();
  const ix=Math.min(r1.right,r2.right)-Math.max(r1.left,r2.left),iy=Math.min(r1.bottom,r2.bottom)-Math.max(r1.top,r2.top);if(ix<=2||iy<=2)continue;
  const sm=Math.min(r1.width*r1.height,r2.width*r2.height);if(ix*iy>.25*sm)out.push({k:'overlap',msg:'buttons overlap: '+name(a)+' × '+name(b),ex:strip(a.textContent).slice(0,30)+' × '+strip(b.textContent).slice(0,30)})}
 /* text over text: two words-bearing leaves drawn on top of each other (e.g. a chip over a title) */
 {const deco=e=>{for(let x=e;x&&x!==document.body;x=x.parentElement){const s=cs(x);if(s.pointerEvents==='none'&&s.position!=='static')return true}return false};
  /* picture placeholders (pictures are blocked: portraits are not checked) and pointer-events:none floaters (stat pops) are not layout */
  const T=els.filter(e=>vis(e)&&!/Đang thỉnh tranh/.test(e.textContent)&&!deco(e)&&[...e.childNodes].some(n=>n.nodeType===3&&/\p{L}{2}/u.test(n.textContent))).slice(0,600).map(e=>{const rg=document.createRange();rg.selectNodeContents(e);/* per line box: a wrapped inline chip is two boxes, not one tall rectangle */
   return{e,rs:[...rg.getClientRects()].filter(r=>r.width>4&&r.height>4)}}).filter(x=>x.rs.length);
  /* E-FIX-2 (E round 1 «kbk-rh × kbk-rh» on every Fold tab): a text she cannot see is not «text over text» — the Tuần lục flip-book stacks its
     leaves, so each header lies on the same header of the leaves under it. Seen = at one of 5 points of one of its line boxes the top element is it (a text partly covered by another text is still seen and reported;
     one covered at every point — a leaf under the open page — is not) */
  /* flip-book leaves (kitBook .kbk-sheet, 3D faces): each leaf is a whole opaque page laid on the others; hit-testing inside preserve-3d is not reliable
     (a leaf under the spread can answer elementFromPoint), so two texts on DIFFERENT leaves are never «text over text» */
  const leaves=(x,y)=>{const a=x.closest('.kbk-sheet'),b=y.closest('.kbk-sheet');return !!(a&&b&&a!==b)||!!(a&&b&&a===b&&x.closest('.kbk-face')!==y.closest('.kbk-face'))};
  /* E-FIX-4 (R2 rebel-3 «kmchip.kmck Thường tại × Thường tại» on every Fold tab): a decorative COPY of the same words laid on purpose
     (aria-hidden, e.g. the j93 rank chip cracking in two clip-path halves kmck-a / kmck-b over its own label) is not «text over text» */
  const copy=(x,y)=>{const ah=e=>!!e.closest('[aria-hidden="true"]');return (ah(x)||ah(y))&&strip(x.textContent)===strip(y.textContent)};
  const seenT=x=>{if(x.__seen!=null)return x.__seen;for(const r of x.rs){for(const [fx,fy] of [[.5,.5],[.15,.3],[.85,.3],[.15,.7],[.85,.7]]){const cx=r.left+r.width*fx,cy=r.top+r.height*fy;if(cx<0||cy<0||cx>=W||cy>=H)continue;
   const t=document.elementFromPoint(cx,cy);if(!t||t===x.e||x.e.contains(t))return x.__seen=true}}return x.__seen=false};
  for(let i=0;i<T.length;i++)for(let j=i+1;j<T.length;j++){const a=T[i],b=T[j];if(a.e.contains(b.e)||b.e.contains(a.e))continue;let hit=false;
   for(const r1 of a.rs){for(const r2 of b.rs){const ix=Math.min(r1.right,r2.right)-Math.max(r1.left,r2.left),iy=Math.min(r1.bottom,r2.bottom)-Math.max(r1.top,r2.top);
    if(ix>3&&iy>3&&ix*iy>.2*Math.min(r1.width*r1.height,r2.width*r2.height)){hit=true;break}}if(hit)break}
   if(hit&&scrollAnc(a.e)===scrollAnc(b.e)&&seenT(a)&&seenT(b)&&!leaves(a.e,b.e)&&!copy(a.e,b.e))out.push({k:'text-overlap',msg:'text over text: '+name(a.e)+' × '+name(b.e),ex:label(a.e).slice(0,30)+' × '+label(b.e).slice(0,30)})}}
 const txt=strip(root.innerText||'');
 if(/%/.test(txt)){const i=txt.indexOf('%');out.push({k:'word',msg:'% shown to the player',ex:txt.slice(Math.max(0,i-60),i+10)})}
 /* odds words: the ladder is READ from the game (KIT_ODDS: top-level const of j79, not a window property), never typed here */
 const KO=((typeof KIT_ODDS!=='undefined'&&Array.isArray(KIT_ODDS))?KIT_ODDS:Array.isArray(window.KIT_ODDS)?window.KIT_ODDS:[]).map(w=>String(w).trim()).filter(Boolean);
 if(KO.length){const esc=w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const RXO=new RegExp('khả năng\\s*:?\\s*('+KO.slice().sort((a,b)=>b.length-a.length).map(esc).join('|')+')(?![\\p{L}])','giu');
  txt.replace(RXO,(a)=>{out.push({k:'word',msg:'two odds scales mixed «'+a.trim()+'»',ex:txt.slice(Math.max(0,txt.indexOf(a)-60),txt.indexOf(a)+a.length+10)});return a});
  /* every kit odds chip (kitOdds → .kodm[data-kodds] b) must print KIT_ODDS[level] */
  root.querySelectorAll('.kodm[data-kodds]').forEach(e=>{if(!vis(e))return;const lv=+e.dataset.kodds,w=strip((e.querySelector('b')||e).textContent);
   if(lv>=0&&w!==KO[lv])out.push({k:'word',msg:'odds chip word is not KIT_ODDS[level]',ex:'level '+lv+' shows «'+w+'», ladder says «'+KO[lv]+'»'});
   else if(lv>=0&&!KO.includes(w))out.push({k:'word',msg:'odds chip word off the ladder',ex:'«'+w+'»'})})}
 else out.push({k:'harness',msg:'KIT_ODDS not found in the game (odds checks off)',ex:''});
 const m=txt.match(/tỉ lệ|xác suất|phần trăm/i);if(m)out.push({k:'word',msg:'machine odds word «'+m[0]+'»',ex:txt.slice(0,80)});
 /* HUD numbers = state (law 4: what she reads is the number the rules use) */
 try{const hud=document.querySelector('.hud');if(hud&&vis(hud)&&typeof S!=='undefined'&&S){const ht=strip(hud.innerText);const MAP={'Sủng':['sung'],'Danh':['danh'],'Đức':['duc'],'Bạc':['bac'],'Sức':['suc'],'Tài':['tai'],'Tâm cơ':['tamco'],'Sắc':['sac']};
  for(const lab in MAP){const re=new RegExp('(^|\\s)'+lab+'\\s+(-?\\d+)');const mm=ht.match(re);if(!mm)continue;const shown=+mm[2];const vals=MAP[lab].map(k=>S[k]).concat(lab==='Sắc'&&typeof effSac==='function'?[effSac(S)]:[]).concat(lab==='Tài'&&typeof effTai==='function'?[effTai(S)]:[]).filter(v=>typeof v==='number').map(Math.round);
   if(vals.length&&!vals.includes(shown)&&!vals.some(v=>Math.abs(v-shown)<=0))out.push({k:'number',msg:'HUD '+lab+' shows '+shown+' but the state is '+vals.join('/'),ex:ht.slice(0,120)})}}}catch(e){}
 return out}

/* ---- one life ---- */
async function life(job){const t0=Date.now();const R={job,bugs:[],cps:0,ui:{scans:0,long:[]},t:{},life:{id:'HARNESS',type:'harness',group:'no ending',death:false,maxRank:-1}};
 const b=await chromium.launch();const bugs=new Map();
 const bug=(type,msg,detail,extra)=>{const k=type+'|'+String(msg).slice(0,160);const x=bugs.get(k);if(x){x.n++;return x}const y=Object.assign({type,msg:String(msg).slice(0,300),detail:String(detail||'').slice(0,600),n:1},extra||{});bugs.set(k,y);return y};
 try{
 /* fast bot page */
 const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){}});
 await ctx.addInitScript(require('./robot10-lag.js').BOT_INIT);
 await ctx.addInitScript(`window.__seed=${job.seed};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();await p.route(BLOCK,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(['pageerror',e.message,(e.stack||'').split('\n').slice(1,3).join(' ')]));
 p.on('console',m=>{if(m.type()==='error'&&!NOISE.test(m.text()))errs.push(['console.error',m.text(),'']);});
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(()=>localStorage.clear());
 await p.evaluate(`window.__r10cfg=${JSON.stringify({origin:job.origin,road:job.road,locked:!!job.locked,pers:job.bot,uiEvery:UIEVERY,lagMs:+process.env.LAGMS||1500,rtEvery:+process.env.RTEVERY||1})}`);
 await p.evaluate(rd('inpage6.js'));await p.evaluate(rd('inty.js'));await p.evaluate(rd('robot10-in.js'));
 const mode=await p.evaluate(()=>window.__r10.mode);
 await p.evaluate(()=>{clean0();document.getElementById('title').hidden=true;SLOT=1;Q=[];start();function clean0(){document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove())}});
 R.t.boot=Date.now()-t0;
 /* real-render pages for the UI checks */
 const ui={};for(const d of DEV)ui[d]=await boot(b,DEVS[d]);
 let oldDone=false;const t1=Date.now();let cap=false;
 /* (C) memory over a long life: JS heap / DOM nodes / listeners of the bot page and of each real page (CDP Performance metrics) + the RSS of every
    renderer process on the box (exact for PAR=1) every MEMEVERY s → R.mem; growth is judged in the bug file. RECYCLE=1 re-opens the real pages at every
    checkpoint (harness side) so a leak in those pages cannot kill the life; the bot page is never recycled (its growth = the game's) */
 const cdp=await ctx.newCDPSession(p).catch(()=>null);if(cdp)await cdp.send('Performance.enable').catch(()=>{});
 R.mem={bot:[],ui:{},rss:[]};let memT=0;const MEMEVERY=(+process.env.MEMEVERY||30)*1e3;
 const metr=async(c)=>{try{const m=(await c.send('Performance.getMetrics')).metrics;const g=k=>(m.find(x=>x.name===k)||{}).value||0;return [Math.round(g('JSHeapUsedSize')/1048576),g('Nodes'),g('JSEventListeners'),g('Documents')]}catch(e){return null}};
 const rss=()=>{try{return Math.round(require('child_process').execSync("ps -eo rss,args | grep -- '--type=renderer' | grep -v grep | awk '{s+=$1} END {print s+0}'").toString()/1024)}catch(e){return null}};
 const memSample=async()=>{const sec=Math.round((Date.now()-t1)/1e3);const m=cdp&&await metr(cdp);if(m){const yr=await p.evaluate(()=>{try{return S&&S.year||0}catch(e){return 0}}).catch(()=>0);R.mem.bot.push([sec,...m,yr])}/* [s, heap MB, nodes, listeners, docs, game year] */
  /* E-FIX-2 (E round 1 «bot page memory keeps growing»): WHERE the nodes are — nodes IN the document (by top-level holder) vs the CDP count (which also
     holds detached nodes still referenced from JS) → R.mem.census [s, docNodes, cdpNodes, [[holder, n]×5], logs, Q] */
  if(m){const c=await p.evaluate(()=>{const tops=[...document.body.children].map(e=>[(e.id?'#'+e.id:e.tagName.toLowerCase()+'.'+String(e.className).split(' ')[0]),e.getElementsByTagName('*').length+1]).sort((a,b)=>b[1]-a[1]).slice(0,5);
   let L=0,q=0;try{L=(S.logs||[]).length;q=Q.length}catch(e){}return [document.getElementsByTagName('*').length,tops,L,q]}).catch(()=>null);if(c)(R.mem.census=R.mem.census||[]).push([sec,c[0],m[1],c[1],c[2],c[3]])}
  for(const d of DEV){if(!ui[d].__cdp){ui[d].__cdp=await ui[d].context().newCDPSession(ui[d]).catch(()=>null);if(ui[d].__cdp)await ui[d].__cdp.send('Performance.enable').catch(()=>{})}
   const u=ui[d].__cdp&&await metr(ui[d].__cdp);if(u)(R.mem.ui[d]=R.mem.ui[d]||[]).push([sec,...u])}
  const r=rss();if(r!=null)R.mem.rss.push([sec,r])};
 while(true){if(Date.now()-memT>MEMEVERY){memT=Date.now();await memSample()}
  const n=await p.evaluate(([m])=>window.__bot.step(m,300),[mode]);
  const cps=await p.evaluate(()=>window.__r10.cps.splice(0));
  for(const cp of cps){R.cps++;if(RECYCLE&&R.cps>1)for(const d of DEV){(R.uiErrs=R.uiErrs||[]).push(...ui[d].__errs.map(m=>[d,m]));await ui[d].context().close().catch(()=>{});ui[d]=await boot(b,DEVS[d])}
   for(const d of DEV)await uiCheck(ui[d],d,cp,job,bug,R);
   if(!oldDone){oldDone=true;const first=await p.evaluate(()=>window.__r10.firstSave);for(const d of DEV.slice(0,1))await oldSaves(ui[d],d,cp.save,first,bug)}}
  if(n>=1||await p.evaluate(()=>!!window.__r10.halt))break;if(Date.now()-t1>CAP){cap=true;break}}
 R.t.play=Date.now()-t1;
 const st=await p.evaluate(()=>({res:window.__res,r:{bugs:window.__r10.bugs,buoi:window.__r10.buoi,rt:window.__r10.rt,rtMs:Math.round(window.__r10.rtMs),nbMs:window.__r10.nbMs,nbY:window.__r10.nbY||[],lt:window.__r10lt||[],road:window.__r10.road,origin:window.__r10.origin,ending:window.__r10.ending,words:window.__r10.words,opts:window.__r10.opts,lastSave:window.__r10.lastSave,life:window.__r10.life||null,lock:window.__r10.lock||null,halt:window.__r10.halt||null,calls:window.__r10.calls,steps:window.__r10.steps,m:window.__r10.mSnap?window.__r10.mSnap():null,kitOdds:window.__r10.KIT_ODDS},x:window.__bot.extra(),state:S?{year:S.year,rank:S.rank,age:S.age,dead:S.dead}:null}));
 const res=st.res[0]||null;R.res=res&&{title:res.title,fate:res.fate,rank:res.rank,maxRank:res.maxRank,years:res.years,age:res.age,origin:res.origin,lb:res.lb,stuck:res.stuck,state:res.state,ring:res.ring};
 R.buoi=st.r.buoi;R.calls=st.r.calls;R.kitOdds=st.r.kitOdds;R.halt=st.r.halt;R.lock=st.r.lock;
 /* the owner's tally fields (same JSON from every runner; robot10-agg.js reads them) */
 R.life=st.r.life||{id:st.r.halt?'SOFTLOCK':cap?'CAP':(res&&res.title)||'?',type:st.r.halt?'softlock':cap?'cap':(res&&res.title==='TIMEOUT')?'stuck':(res&&res.title==='CRASH')?'crash':'?',group:'no ending',death:false,
  maxRank:Math.max(-1,...(st.r.steps||[]).map(x=>x.r)),steps:st.r.steps,age:st.state&&st.state.age,year:st.state&&st.state.year};if(!R.life.m)R.life.m=st.r.m;R.life.botMin=+(R.t.play/6e4).toFixed(2);R.road=st.r.road;R.origin=st.r.origin;R.rt={n:st.r.rt,ms:st.r.rtMs};R.words=st.r.words;R.opts=st.r.opts;
 R.lag=R.lag||{};R.lag.bot={nbY:st.r.nbY,lt:st.r.lt,playMs:R.t.play,mem:R.mem.bot};
 const nb=st.r.nbMs.slice().sort((a,b)=>a-b);R.nb={n:nb.length,p50:nb[nb.length>>1]||0,p95:nb[Math.floor(nb.length*.95)]||0,max:nb[nb.length-1]||0};
 for(const x of st.r.bugs)bug(x.type,x.msg,x.detail+(x.at?' @ '+x.at:''),{n:x.n,save:x.save});
 if(cap)bug('stuck','no ending within the wall cap ('+CAP/1e3+' s)','state '+JSON.stringify(st.state),{save:st.r.lastSave});
 if(res&&res.title==='TIMEOUT')bug('stuck','life stuck (inpage6 TIMEOUT'+(res.stuck?': no progress in one buổi':': 60000 steps')+')',(res.state||'')+' ring '+JSON.stringify(res.ring||[]),{save:st.r.lastSave});
 if(res&&res.title==='CRASH')bug('crash','bot step threw: '+res.fate,'',{save:st.r.lastSave});
 if(job.road&&!job.locked&&R.road!==job.road)bug('harness','forced road '+job.road+' not played (life got '+R.road+')','arcOk67 false at start? (road locked)');
 if(R.origin&&R.origin!==job.origin)bug('harness','forced origin '+job.origin+' not played (life got '+R.origin+')','');
 for(const s of (st.x.bad||[]))bug('number','stat out of range: '+s.replace(/ \w+$/,'').replace(/=.*/,''),s,{save:st.r.lastSave});
 for(const s of (st.x.saveFail||[]))bug('save','inpage6 save round-trip failed',s);
 for(const [k,m,s] of errs)bug('js',k+': '+m.split('\n')[0].slice(0,200),s,{save:st.r.lastSave});
 for(const d of DEV)ui[d].__errs.forEach((m,i)=>{const w=(ui[d].__eAt||{})[i]||{};bug('js','['+d+' real page] '+m.split('\n')[0].slice(0,200),[w.stk,w.at?'@ '+w.at:''].filter(Boolean).join(' '),w.save?{save:w.save}:undefined)});
 for(const [d,m] of (R.uiErrs||[]))bug('js','['+d+' real page] '+m.split('\n')[0].slice(0,200),'');delete R.uiErrs;await memSample().catch(()=>{});
 /* a page whose JS heap or DOM keeps growing over the life (last samples ≥ 2× the early ones and +150 MB heap / +20000 nodes) = a leak finding */
 const grow=(S0,lab)=>{if(!S0||S0.length<6)return;const a=S0.slice(1,4),z=S0.slice(-3);const av=(x,i)=>x.reduce((s,r)=>s+r[i],0)/x.length;
  const h0=av(a,1),h1=av(z,1),n0=av(a,2),n1=av(z,2);if((h1>2*h0&&h1-h0>150)||(n1>2*n0&&n1-n0>20000))bug('mem',lab+' memory keeps growing over the life (leak)','JS heap '+Math.round(h0)+' → '+Math.round(h1)+' MB · DOM nodes '+Math.round(n0)+' → '+Math.round(n1)+' · listeners '+Math.round(av(a,3))+' → '+Math.round(av(z,3))+' over '+z[z.length-1][0]+' s'+(/bot page/.test(lab)&&R.mem.census&&R.mem.census.length?(()=>{const c0=R.mem.census[0],c1=R.mem.census[R.mem.census.length-1];return ' · in the document '+c0[1]+' → '+c1[1]+' nodes (rest = detached, held by JS) · biggest holder '+JSON.stringify(c1[3][0])+' · S.logs '+c0[4]+' → '+c1[4]})():''),{save:st.r.lastSave})};
 grow(R.mem.bot,'bot page (game, render off)');for(const d of DEV)grow(R.mem.ui[d],'['+d+'] real page');
 }catch(e){const m=String(e.message).split('\n')[0];/* a tab that dies mid-life (Target crashed: renderer out of memory) is a game finding (memory growth over a long life), not a runner fault */
  if(/Target crashed|Page crashed/i.test(m)){const mb=R.mem&&R.mem.bot||[],rs=R.mem&&R.mem.rss||[];bug('crash','browser tab crashed mid-life (renderer out of memory?)','after '+Math.round((Date.now()-t0)/1e3)+' s of play · last bot-page sample [s, heap MB, nodes, listeners, docs] '+JSON.stringify(mb.slice(-1)[0]||null)+' (first '+JSON.stringify(mb[1]||mb[0]||null)+') · renderer RSS MB '+JSON.stringify(rs.slice(-1)[0]||null))}else bug('harness','runner error: '+m,String(e.stack).slice(0,400))}
 finally{await b.close().catch(()=>{})}
 R.bugs=[...bugs.values()];R.t.total=Date.now()-t0;return R}

/* load a save through the title slot (her real load path) */
async function loadSave(p,save){return p.evaluate(s=>{try{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());localStorage.setItem(SK(1),s);localStorage.setItem('hclh-slot','1');document.getElementById('title').hidden=false;showTitle();
  const btn=document.querySelector('#slots button[data-load="1"]');if(!btn)return 'no load button (save rejected by loadSlot)';btn.click();return S&&S.name?'':'no state after load'}catch(e){return 'throws: '+e.message}},save)}
async function uiCheck(p,d,cp,job,bug,R){const e0=p.__errs.length;const t0=Date.now();p.__at=cp.at;p.__cpSave=cp.save;
 await p.evaluate(()=>{window.__lt=[];try{if(!window.__ltObs){window.__ltObs=new PerformanceObserver(l=>l.getEntries().forEach(x=>window.__lt.push(Math.round(x.duration))));window.__ltObs.observe({entryTypes:['longtask']})}}catch(e){}});
 const tl=Date.now();const r=await loadSave(p,cp.save);if(r)bug('save','['+d+'] save does not load in the real game: '+r,cp.at,{save:cp.save});
 await p.waitForTimeout(700);{const lt=await p.evaluate(()=>window.__lt.splice(0));const mx=Math.max(0,...lt);(R.ui.load=R.ui.load||[]).push(Date.now()-tl-700);
  if(mx>UILOAD)bug('lag','['+d+'] loading a save freezes the game over '+UILOAD/1e3+' s (longest task)',mx+' ms @ '+cp.at,{save:cp.save})}await p.evaluate(()=>document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove()));
 const scan=async(label)=>{const out=await p.evaluate(uiScan);R.ui.scans++;for(const x of out){const y=bug('ui-'+x.k,'['+d+'] '+label.replace(/«.*»/,'')+': '+x.msg,x.ex+' @ '+cp.at,{save:cp.save});
   if(y.n===1&&!y.shot){const f=path.join(OUT,'shots',`${job.id}-${d}-${R.ui.scans}.png`);fs.mkdirSync(path.dirname(f),{recursive:true});await p.screenshot({path:f}).catch(()=>{});y.shot=path.relative(OUT,f)}}};
 /* the open card first (as she would see it on load), then every tab */
 if(await p.evaluate(()=>!document.getElementById('modal').hidden))await scan('card «'+cp.q+'»');
 await p.evaluate(()=>{try{Q.length=0;closeModal();document.getElementById('ov').hidden=true}catch(e){}});
 if(d===DEV[0])await nightAfterLoad(p,d,cp,bug);
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('.bar [data-tab]')].filter(e=>e.offsetParent!==null).map(e=>e.dataset.tab));
 for(const t of tabs){const ok=await p.evaluate(t=>{const b=document.querySelector('.bar [data-tab="'+t+'"]');if(!b||b.disabled)return false;b.click();return true},t);if(!ok)continue;
  await p.waitForTimeout(250);await p.evaluate(()=>document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove()));
  if(await p.evaluate(()=>!document.getElementById('modal').hidden||!document.getElementById('ov').hidden)){await scan('tab '+t+' (opened a card)');await p.evaluate(()=>{try{Q.length=0;closeModal();document.getElementById('ov').hidden=true}catch(e){}})}
  await scan('tab '+t)}
 const lt=await p.evaluate(()=>window.__lt.splice(0));R.ui.long.push(...lt);const big=lt.filter(x=>x>UILAG_);
 if(big.length)bug('lag','['+d+'] tab switch freezes over '+UILAG+' ms',Math.max(...big)+' ms longest · '+big.length+' long tasks @ '+cp.at,{save:cp.save});

 /* ORDER #7 LAG probe goes LAST (it throttles the CPU ×4 and acts on the page: its long tasks must not reach the UI-scan checks above) */
 if(process.env.LAG!=='0')await require('./robot10-lag.js').probe(p,d,cp,R).catch(e=>bug('harness','lag probe failed: '+String(e.message).split('\n')[0],''));
 R.ui.ms=(R.ui.ms||0)+Date.now()-t0}
const UILAG_=UILAG;
/* after a real load, she must be able to play on: «Sang ngày mới» (kit card buttons closed as she would) must move the clock within 12 presses */
async function nightAfterLoad(p,d,cp,bug){const r=await p.evaluate(()=>{const gt=()=>((S.turn||0)*3+(S.tuan||0))*10+(S.buoi||0);const g=gt();let n=0;
  for(;n<12&&gt()===g&&!S.dead;n++){let k=0;while(k++<20&&(!document.getElementById('modal').hidden||!document.getElementById('ov').hidden)){
    const b=[...document.querySelectorAll('#ov button,#modal button')].filter(x=>x.offsetParent!==null&&!x.disabled);const pick=b.find(x=>!/kit-x/.test(x.className))||b[0];if(!pick)break;pick.click()}
   const nx=document.getElementById('next');if(nx&&!nx.disabled)nx.click();else nextBuoi()}
  return{moved:gt()!==g||S.dead,n,nf:S.nfX&&S.nfX.st}});
 if(!r.moved)bug('stuck','['+d+'] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)','12 presses, night flip S.nfX '+r.nf+' @ '+cp.at,{save:cp.save})}
/* old saves: the same life saved under older headers + the life's first save + OLDSAVE files; each must load and render with no error */
async function oldSaves(p,d,save,first,bug){const v=JSON.parse(save);const L=[];
 for(const ver of [5,4,3]){const x=JSON.parse(save);x.v=ver;L.push(['v'+ver+' header',JSON.stringify(x)])}
 if(first)L.push(['first save of this life',first]);
 for(const f of (process.env.OLDSAVE||'').split(',').filter(Boolean)){try{L.push(['file '+path.basename(f),fs.readFileSync(f,'utf8')])}catch(e){}}
 for(const [lab,s] of L){const e0=p.__errs.length;const r=await loadSave(p,s);await p.waitForTimeout(500);
  const ok=await p.evaluate(()=>!!(S&&S.name&&document.querySelector('.hud')&&document.querySelector('.hud').innerText.includes(S.name)));
  if(r||!ok)bug('save','['+d+'] old save ('+lab+') does not load: '+(r||'HUD does not show her'),'',{save:s});
  const ne=p.__errs.slice(e0);for(const m of ne)bug('save','['+d+'] old save ('+lab+') load error: '+m.split('\n')[0].slice(0,160),'',{save:s})}
 void v}

/* ---- run ---- */
function hash(s){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
(async()=>{
 if(!URL)URL=await serve(GAME);
 if(ORIGIN==='list'||!ORIGIN){const l=await list();for(const k in l)console.log(k.padEnd(5),l[k].map(x=>x.id+(x.ok?'':'(locked at start)')).join('  '));if(!ORIGIN)console.log('\nusage: node dev/measure/robot10.js <origin> <branch|all|spread> <bots> <lives> [out]');return}
 const L=await list();if(!L[ORIGIN]){console.error('unknown origin '+ORIGIN+'; the game has: '+Object.keys(L).join(' '));process.exit(2)}
 const roads=L[ORIGIN].map(x=>x.id);
 const bots=/^\d+$/.test(BOTA||'10')?BOTS.slice(0,Math.min(10,+(BOTA||10))):BOTA.split(',').filter(x=>BOTS.includes(x));
 const lives=+LIVES||1;const jobs=[];const LK=Object.fromEntries(L[ORIGIN].map(x=>[x.id,!x.ok]));
 const roadOf=(i)=>BR==='all'?null:BR==='spread'?roads[i%roads.length]:/^\d$/.test(BR)?roads[+BR-1]:BR;
 if(BR!=='all'&&BR!=='spread'&&!roads.includes(roadOf(0))){console.error('unknown branch '+BR+' for '+ORIGIN+'; roads: '+roads.join(' '));process.exit(2)}
 const RS=BR==='all'?roads:[null];
 for(const r of RS)bots.forEach((bot,i)=>{for(let l=1;l<=lives;l++){const road=r||roadOf(i);const id=`${ORIGIN}-${road}-${bot}-${l}`;jobs.push({id,origin:ORIGIN,road,locked:!!LK[road],bot,life:l,seed:hash(id+':'+SEED)})}});
 const d=new Date(),stamp=d.toISOString().slice(0,16).replace(/[-:]/g,'').replace('T','-');
 fs.mkdirSync(path.join(OUT,'saves'),{recursive:true});const T0=Date.now();
 console.log(`ROBOT-10 ${ORIGIN} ${BR} · ${bots.length} bots × ${lives} kiếp → ${jobs.length} lives, ${PAR} in parallel · game ${URL}`);
 const done=[];let k=0;
 /* (C) one life peaks at ~5 GB renderer RSS (bot page up to ~3.6 GB + two real pages): never start a life while the box has < 2.5 GB free (PAR=3 on a
   15 GB box ran it out of memory: «Target crashed» at ~14 min in the part-1 proof) */
 const os=require('os');const roomy=async()=>{for(let w=0;w<60&&os.freemem()<2.5e9;w++)await sleep(5000)};
 await Promise.all(Array.from({length:Math.min(PAR,jobs.length)},async(_,wi)=>{if(wi)await sleep(wi*20000);while(k<jobs.length){await roomy();const j=jobs[k++];let r;try{r=await life(j)}catch(e){r={job:j,bugs:[{type:'harness',msg:'runner error: '+String(e.message).split('\n')[0],detail:String(e.stack).slice(0,300),n:1}],cps:0,ui:{scans:0,long:[]},t:{total:0},life:{id:'HARNESS',type:'harness',group:'no ending',death:false,maxRank:-1}}}done.push(r);
  console.log(`  ${j.id}: ${r.life.id} [${r.life.group}] · max ${r.life.maxRankN||r.life.maxRank} · ${r.life.years!=null?r.life.years:'?'} y · ${r.buoi} buổi · ${r.bugs.length} bugs · ${(r.t.total/1e3).toFixed(0)} s`);
  fs.writeFileSync(path.join(OUT,`${ORIGIN}-${stamp}.json`),JSON.stringify(done.map(x=>Object.assign({},x,{bugs:x.bugs.map(b=>Object.assign({},b,{save:undefined}))})),null,1))}}));
 report(done,jobs,stamp,Date.now()-T0)})().catch(e=>{console.error(e);process.exit(1)});

function report(done,jobs,stamp,ms){done.sort((a,b)=>jobs.indexOf(a.job)-jobs.indexOf(b.job));
 const all=new Map();for(const r of done)for(const b of r.bugs){const k=b.type+'|'+b.msg.replace(/^\[(fold|ipad)\] /,'');const x=all.get(k)||{type:b.type,msg:b.msg,lives:[],n:0,ex:b};if(!x.lives.includes(r.job.id))x.lives.push(r.job.id);x.n+=b.n;all.set(k,x)}
 const ORDER=['crash','mem','stuck','js','save','number','word','harness','lag','ui-overflow','ui-offscreen-btn','ui-covered-btn','ui-overlap','ui-cut','ui-offscreen-text','ui-word','ui-number'];
 const bl=[...all.values()].sort((a,b)=>(ORDER.indexOf(a.type)+1||99)-(ORDER.indexOf(b.type)+1||99)||b.lives.length-a.lives.length);
 let i=0;const saveOf=(x)=>{if(!x.ex.save)return '';const f=path.join('saves',`${stamp}-${String(++i).padStart(3,'0')}.json`);fs.writeFileSync(path.join(OUT,f),typeof x.ex.save==='string'?x.ex.save:JSON.stringify(x.ex.save));return f};
 const per=done.map(r=>`| ${r.job.id} | ${r.job.bot} | ${r.road||'?'}${r.lock?' (locked: opens '+(r.lock.openAt?'y'+r.lock.openAt.year+' age '+r.lock.openAt.age:'never')+', played '+(r.lock.playAt?'y'+r.lock.playAt.year:'no')+')':''} | ${r.life.id} [${r.life.group}${r.life.cause?': '+r.life.cause.slice(0,50):''}] | ${r.life.maxRankN||r.life.maxRank} | ${r.life.years!=null?r.life.years:''} (age ${r.life.age}) | ${r.buoi} | ${r.cps} | ${r.bugs.length} | ${(r.t.total/1e3).toFixed(0)} s (play ${((r.t.play||0)/1e3).toFixed(0)}, UI ${((r.ui.ms||0)/1e3).toFixed(0)}) | buổi p50/p95/max ${r.nb?r.nb.p50+'/'+r.nb.p95+'/'+r.nb.max:''} ms · save rt ${r.rt?r.rt.n+'×, '+(r.rt.ms/Math.max(1,r.rt.n)).toFixed(1)+' ms':''} | ${r.job.seed} |`).join('\n');
 const md=[`# ROBOT-10 run ${ORIGIN} · ${BR} · ${stamp} (UTC)`,'',`Game: ${URL} · ${done.length} lives (${jobs.length} planned) · ${PAR} parallel · wall ${(ms/6e4).toFixed(1)} min · UI checkpoints every ${UIEVERY} buổi at ${DEV.map(d=>d+' '+DEVS[d].join('x')).join(' + ')}`,
  `Runner: node dev/measure/robot10.js ${process.argv.slice(2).join(' ')} · repro: put saves/<file> into localStorage "hclh-save-v2-1", open the game, «Tiếp tục kiếp này» (Ô 1); seed = SEED for the bot page`,'',
  `## Bugs (${bl.length} distinct; one row per bug, lives = how many lives hit it)`,'',
  bl.length?bl.map((x,j)=>`${j+1}. **${x.type}** — ${x.msg}\n   - lives ${x.lives.length}/${done.length} (${[...new Set(x.lives)].slice(0,4).join(', ')}${x.lives.length>4?' …':''}) · hits ${x.n}\n   - ${(x.ex.detail||'').replace(/\n/g,' ').slice(0,400)}\n`+(x.ex.save?`   - repro save: ${saveOf(x)}\n`:'')+(x.ex.shot?`   - screenshot: ${x.ex.shot} (not in git)\n`:'')).join('\n'):'None.','',
  '## Lives','','| life | bot | road | ending | max rank | years | buổi | UI cps | bugs | time | perf | seed |','|---|---|---|---|---|---|---|---|---|---|---|---|',per,''].join('\n');
 const f=path.join(OUT,`${ORIGIN}-${stamp}.md`);fs.writeFileSync(f,md);console.log('bug file: '+f+' · '+bl.length+' distinct bugs')}
