/* TITLE-BAL robot (owner OD 26/11 ~18:20Z «TITLE REBALANCE» + ~18:50Z (8)): plays whole lives at JS level (no real taps) and measures how often
   every «Danh hiệu» act really happens in a life and when titles open.
   The player: each buổi she makes up to BOT.acts tries; a try = one random surface the player can see (Hành sự tab, Tài nghệ tab, Tư trang,
   Mệnh truyện, a place on Dư đồ and a person met there, home), one random ENABLED button on it; every dialog / mini-game that opens is answered
   with a random enabled option (mini-games: the quick / «tài nghệ quyết định» road when offered, else random taps until it closes).
   Roads: palace = an origin that enters the palace at once (__forceOrigin from ROADS.palace); home = an origin with the khuê các home road.
   Hooks (read only, no game change): dhSync gains for her (key, step, buổi index), the raw act counts at the end of the life
   (S.dh[k].n, nights, kids, art levels), works made (wkMake, tier), contests (cFin7: entered / place), every runOpt name that succeeded.
   usage: node dev/measure/title-bal-bot.js <url of the build> <out.json> [lives per road=3] [roads=palace,home] [maxBuoi=4000] [seed=1]
   prints a per-life table; dev/measure/title-bal-sum.py turns out.json into the before/after table. */
const {chromium}=require('../test/lib/pw-roulette');const fs=require('fs');
const [,,URL,OUT,LIVES,ROADS0,MAXB,SEED]=process.argv;
const T0=Date.now(),lg=m=>console.error('['+Math.round((Date.now()-T0)/1000)+'s] '+m);
const LIB=String.raw`
window.TB={};window.__bot=1;
(function(){
let seed=1;const rng=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
Math.random=()=>rng();TB.reseed=s=>{seed=s};
const T=e=>(e&&e.innerText||"").replace(/\s+/g," ").trim();
const vis=e=>!!(e&&e.offsetParent!==null&&!e.disabled&&!e.classList.contains("kdis"));
const pick=a=>a[Math.floor(Math.random()*a.length)];
let R=null;TB.R=()=>R;
/* hooks */
/* title steps opened: scanned after every try and every buổi (dhInc calls jdh's own closure dhSync, so no wrapper sees it) */
TB.scan=()=>{if(!R)return;const D=S.dh||{};for(const k in D){const i=D[k]&&D[k].i;if(i==null||i<0||D[k].carry)continue;const was=R.seen[k]==null?-1:R.seen[k];if(i>was){const ns=(k.startsWith("l_")?BAL.dh.artLv:((BAL.dh.T[k]||{}).n||BAL.dh.n0)).length;for(let j=was+1;j<=i;j++)R.gain.push([k,j,R.b,S.rank,typeof isKc==="function"&&isKc()?1:0,ns]);R.seen[k]=i}}};
const w0=wkMake;wkMake=window.wkMake=function(p){const r=w0.apply(this,arguments);try{if(R&&p===S&&r&&r.wk){const k=r.wk.kind;(R.wk[k]=R.wk[k]||[0,0,0,0])[r.wk.ti]++}}catch(e){}return r};
const c0=cFin7;cFin7=window.cFin7=function(k,kind,L){const r=c0.apply(this,arguments);try{if(R){const i=(L||[]).findIndex(x=>x&&x.p===S);const c=R.ct[kind]=R.ct[kind]||{n:0,in:0,p1:0,p3:0};c.n++;if(i>=0){c.in++;if(i===0)c.p1++;if(i<3)c.p3++}}}catch(e){}return r};
const r0=runOpt;runOpt=window.runOpt=function(a){const r=r0.apply(this,arguments);try{if(R&&a&&a.n&&r===true){const n=String(a.n).slice(0,40);R.acts[n]=(R.acts[n]||0)+1}}catch(e){}return r};
/* DEATH SHIELD: a real player avoids deadly choices the random bot takes; a death before the life's natural end is counted (R.deaths) and
   cancelled (Sức back to a floor) so the life runs its whole length; living endings (lãnh cung at 40, rare endings, the throne) end it as usual. */
const o0=over;over=window.over=function(h,t,fate,alive){try{if(R&&TB.shield&&S&&!S.dead&&(!overAlive(fate,alive)||(TB.EXIT.test(String(fate||""))&&!/ban hoa/i.test(String(fate||""))))){R.deaths++;R.dw.push(String(fate).slice(0,40));S.suc=Math.max(S.suc||0,40);return ""}}catch(e){}return o0.apply(this,arguments)};
TB.shield=1;TB.EXIT=/xuất gia|trốn|xuất cung|về quê|ẩn cư|tự do|ra khỏi cung/i;/* a player's own early exit (a random pick) is shielded too */TB.errs=[];window.addEventListener("error",e=>TB.errs.push(String(e.message).slice(0,160)));
/* the dialog / overlay answerer */
const QUICK=/tài nghệ quyết định|Học nhanh|Bỏ qua|nhanh|Để sau|Đã hiểu|Tiếp tục|Ta biết rồi|Lui|Đóng/;
function modalBtns(){const m=document.getElementById("modal");if(!m||m.hidden)return null;return [...m.querySelectorAll(".opts button, button.opt, .dlg button")].filter(vis)}
function overlay(){for(const id of ["ov","kg82","kroul","klife"]){const e=document.getElementById(id);if(e&&!e.hidden&&e.offsetParent!==null)return e}const g=document.querySelector(".kgame:not([hidden]),#kxcatch:not([hidden])");return g&&g.offsetParent!==null?g:null}
TB.settle=()=>{for(let n=0;n<40;n++){if(S.dead)return;
  const o=overlay();if(o){const B=[...o.querySelectorAll("button")].filter(vis);const q=B.filter(b=>QUICK.test(T(b)));const b=q.length?q[0]:B.length?pick(B):null;if(b){try{b.click()}catch(e){}continue}
   try{if(S.mg){S.mg=null}o.hidden=true}catch(e){}continue}
  if(Q.length){try{if(document.getElementById("modal").hidden)showModal();render()}catch(e){}const B=modalBtns();if(B&&B.length){/* never the save / quit / new life buttons */const ok=B.filter(b=>!/Kiếp mới|Thoát|Lưu|Chơi lại|Về màn hình/.test(T(b)));try{pick(ok.length?ok:B).click()}catch(e){Q.shift()}continue}
   Q.shift();continue}
  return}};
/* surfaces the player sees */
const panelBtns=()=>[...document.querySelectorAll("#panel button.ka, #panel .pcb button, #panel .rbtn button, #panel button.card, #panel [data-learndoor]")].filter(vis);
const popBtns=()=>[...document.querySelectorAll("#popw button.opt, #popw .opts button, #popw button.ka")].filter(b=>vis(b)&&!/^✕/.test(T(b)));
function surfaces(){const L=[["tab","act"],["tab","act"],["tab","art"],["tab","inv"],["tab","story"],["home"]];try{if(typeof isKc==="function"&&isKc()){for(const k of Object.keys(KCPL))if(!(typeof kcGoWhy==="function"&&kcGoWhy(k)))L.push(["place",k])}else for(const p of places())L.push(["place",p.k])}catch(e){}return L}
TB.tryOne=()=>{const sf=pick(surfaces());let B=[];
 try{if(sf[0]==="tab"){tab=sf[1];popIdx=null;render();B=panelBtns()}
  else{const k=sf[0]==="home"?(typeof isKc==="function"&&isKc()?"kc_khue":"home"):sf[1];tab="act";try{goTo(k)}catch(e){}TB.settle();render();const P=S.visit&&S.visit.people||[];if(P.length){popIdx=Math.floor(Math.random()*P.length);render();B=popBtns()}else B=panelBtns()}}catch(e){TB.errs.push("sf "+e.message)}
 if(!B.length)return 0;const b=pick(B);try{b.click()}catch(e){TB.errs.push("click "+e.message)}TB.settle();return 1};
TB.begin=(origin,lost0)=>{const o00=origin;try{localStorage.clear()}catch(e){}document.getElementById("title").hidden=true;const kc=String(origin).split("/");origin=kc[0];window.__kcO=kc[1]||"cung";window.__forceOrigin=origin||null;
 let lost=0;for(let t=0;t<15;t++){for(let i=0;i<8;i++){try{nlNew()}catch(e){}start();if(!origin||S.origin.k===origin)break}
  R={origin:S.origin.k,home:0,b:0,deaths:0,dw:[],gain:[],seen:{},wk:{},ct:{},acts:{}};TB.shield=0;TB.settle();TB.shield=1;if(!S.dead)break;lost++}/* the selection days: a random bot that is sent home (Bị ban hoa) re-rolls the life */
 R.home=S.kc?1:0;R.selLost=lost+(lost0||0);R.o0=o00;
 return R.origin};
const banHoa=()=>{if(S.dead&&/ban hoa/i.test(S.fate||"")&&R.b<300){TB.begin(R.o0,(R.selLost||0)+1);return 1}return 0};
/* page recycling: the renderer grows over a long palace life (not the JS heap); every so often the life is saved with the game's own
   ser() and loaded into a fresh page with deser() (the same pair the act-audit harness uses), the robot's record R carried over */
TB.dump=()=>JSON.stringify({s:ser(),R,used,kcO:window.__kcO});
TB.load=j=>{const o=JSON.parse(j);try{localStorage.clear()}catch(e){}document.getElementById("title").hidden=true;window.__kcO=o.kcO;quiet=true;deser(o.s);used=o.used||0;quiet=false;R=o.R;Q.length=0;popIdx=null;try{deal()}catch(e){}try{render()}catch(e){}return S.turn};
TB.run=(n,maxB,acts)=>{const stop=Math.min(maxB,R.b+n);
 banHoa();/* sent home in the selection days: re-roll the life (a player who fails the draft starts again) */
 while(R.b<stop){if(S.dead&&!banHoa())break;for(let a=0;a<acts&&!S.dead;a++){TB.tryOne();if(Q.length)TB.settle();TB.scan()}
  TB.settle();if(S.dead){if(banHoa())continue;break}popIdx=null;const b0=(S.turn||0)*100+(S.tuan||0)*10+(S.buoi||0);try{nextBuoi()}catch(e){TB.errs.push("nb "+e.message)}TB.settle();
  const b1=(S.turn||0)*100+(S.tuan||0)*10+(S.buoi||0);if(b1===b0){/* stuck: drop the queue and force */Q.length=0;S.mg=null;try{nextBuoi()}catch(e){}}TB.scan();R.b++}
 try{if(Array.isArray(S.logs)&&S.logs.length>300)S.logs.splice(0,S.logs.length-300)}catch(e){}/* memory: the robot keeps the last log lines only */
 const D=S.dh||{};R.end={dead:!!S.dead,why:String(S.fate||"").slice(0,60),age:S.age,year:S.year,rank:S.rank,out:!!S.out,srv:typeof isSrv==="function"&&isSrv()?1:0,nights:S.nights||0,kids:(S.kids||[]).length,
  arts:Object.assign({},S.arts),dh:Object.fromEntries(Object.keys(D).map(k=>[k,{n:D[k].n||0,i:D[k].i}])),
  titles:Object.keys(D).filter(k=>D[k].i!=null&&D[k].i>=0).length,top:Object.keys(D).filter(k=>D[k].i!=null&&D[k].i>=((BAL.dh.T[k]&&BAL.dh.T[k].n)||BAL.dh.n0).length-1&&((BAL.dh.T[k]&&BAL.dh.T[k].n)||BAL.dh.n0).length>1).length};
 return R};
})();`;
const perr=[];let b=null,p=null;
async function fresh(){if(b)await b.close();b=await chromium.launch({args:['--js-flags=--max-old-space-size=2500']});const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.addInitScript(`HTMLElement.prototype.focus=function(){};`);
 p=await ctx.newPage();p.setDefaultTimeout(0);p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof dhSync==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.addStyleTag({content:'#kroul,#kroulw,#kload,.krbox,#dawn,#curtain,.fxo{display:none!important}'});
 await p.evaluate(LIB)}
(async()=>{await fresh();
 const ROADS={palace:['tt/cung','cnv/cung','thd/cung','dtq/cung'],home:['tt/nha','thd/nha','dtq/nha','muoi/nha']};
 const avail=await p.evaluate(()=>ORIGINS.map(o=>o.k));lg('origins '+avail.join(','));
 const out={url:URL,lives:[],perr};let first=1;const N=+(LIVES||3);let s=+(SEED||1);
 for(const road of (ROADS0||'palace,home').split(',')){const L=(ROADS[road]||[road]).filter(k=>avail.includes(k.split('/')[0]));
  for(let i=0;i<N;i++){const o=L[(i+(+process.env.OFF||0))%L.length];if(!first)await fresh();first=0;await p.evaluate(x=>TB.reseed(x),s++);
   await p.evaluate(o=>TB.begin(o),o);let r=null;const M=+(MAXB||4000);
   let k=0;while(true){try{r=await p.evaluate(([m])=>TB.run(10,m,3),[M]);await p.waitForTimeout(5)}/* small chunks: Blink frees DOM garbage only between tasks */catch(e){lg('crash '+e.message.slice(0,80));r=r||{gain:[],end:{}};r.crash=1;break}
    r.road=road;if(r.end.dead||r.b>=M)break;if(k%12===11){try{const j=await p.evaluate(()=>TB.dump());await fresh();await p.evaluate(j=>TB.load(j),j)}catch(e){lg('recycle '+e.message.slice(0,80))}}if(++k%15)continue;out.lives[out.lives.length]=r;fs.writeFileSync(OUT,JSON.stringify(out));out.lives.pop()}
   r.road=road;out.lives.push(r);
   lg(`${road} ${o}: deaths ${r.deaths} buổi ${r.b} age ${r.end.age} rank ${r.end.rank} dead ${r.end.dead} titles ${r.end.titles} top ${r.end.top} first@${r.gain.length?r.gain[0][2]:'-'} gains ${r.gain.length}`);
   fs.writeFileSync(OUT,JSON.stringify(out))}}
 try{out.errs=await p.evaluate(()=>TB.errs.slice(0,30))}catch(e){}fs.writeFileSync(OUT,JSON.stringify(out));lg('done');await b.close()})().catch(e=>{console.error(e);process.exit(2)});
