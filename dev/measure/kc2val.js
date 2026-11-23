// Round 3 (owner OD:L1288): is "Chờ" (the home road) worth as much as the same months lived in the palace? node dev/measure/kc2val.js <livesPerArm> [origins] [out.json]
// Two arms per origin, same seedless random play quality: CUNG = "Vào cung ngay" (selection card, then the inpage6 SENSIBLE palace bot) played
// for exactly the months the home road lasts (kc2Due: to the tuyển tú month); NHA = the home road played by a sensible home policy (below)
// to the palace entry. Each life is snapshotted at that calendar point: rank / servant standing, Sủng, Danh, Bạc, Sắc+Tài+Tâm cơ+Đức,
// tài nghệ levels, harem people known, death. Serves the built site (index.html) from the repo root; pictures are not loaded.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'../..');const GAME='http://game.local/'+(process.env.GF||'index.html');const M=__dirname;
const N=+process.argv[2]||4,ORIG=(process.argv[3]||'cnv,nc').split(','),OUT=process.argv[4]||path.join(M,'kc2val.json'),ARMS=(process.argv[5]||'cung,nha').split(',');
const HOME=`/* F1 (review-oi-r1): the home bot self-studies like main's palace bot (inpage6 diff-remeasure: free Tài nghệ "Tự học" of the lowest art
   and Tứ đức self-study, Sức >= 60, off with window.__noSelf for BOTH arms). The pick dialog and the minigame are asynchronous, so this
   step is awaited: press the kit pick "Làm" ([data-kwrgo]) and the minigame #mgok / #kg92ok / #mgskip, as inpage6 modalStep does (#kg82ok / #kg82skip of the kit minigame; a plain «dùng vật liệu gì?» dialog: the first affordable option, as the sens bot). */
window.__kc2SelfN=0;
window.__kc2Self=async function(fn){const q=s=>document.querySelector(s);const n0=Q.length;fn();let k=0;
 while(k++<400){const ov=q('#ov');const ovOn=ov&&!ov.hidden;
  const k8=q('#kg82ok');if(k8&&(k8.offsetParent!==null||(k8.isConnected&&ovOn))){k8.click()}
  else if(q('#kg82skip')&&q('#kg82skip').offsetParent!==null)q('#kg82skip').click();
  else if(ovOn){const ok=q('#mgok')||q('#kg92ok');if(ok)ok.click();else{const sk=q('#mgskip');if(sk&&!sk.hidden)sk.click()}}
  else if(Q.length>n0&&Q[0].kit&&Q[0].kit.pick){try{showModal()}catch(e){}const b=[...document.querySelectorAll('[data-kwrgo]')].find(x=>!x.disabled&&x.offsetParent!==null);if(b)b.click();else{Q.shift();break}}
  else if(Q.length>n0&&Q[0].opts&&Q[0].opts.length){const i=Q[0].opts.findIndex(c=>c&&!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)&&c.n!=="Thôi");if(i<0){Q.shift();break}chooseM(i)}
  else if(!S.mg)break;
  await new Promise(r=>setTimeout(r,40))}
 if(S.mg&&k>=400)S.mg=null;window.__kc2SelfN++};
window.__kc2Home=async function(){const P=kc2Pre();const pri=S.kc.kd==="dan"?[/^Thêu khăn$/,/^Học lễ nghi với bà Tư/,/^Gánh nước, quét nhà/,/^Dệt vải/,/^Trả bớt nợ/,/^Làm không công/,/^Biếu quà lý trưởng/,/^Thêu khăn biếu/,/^Hỏi han/,/^Ra ruộng/,/^Giặt áo/,/^Dạy Xuân Đào/,/^Bán vải/,/^Mua thuốc|^Hái lá/,/^Nghe bà Tư/,/^Học chữ/,/^Lễ chùa/]
 :[/^Học lễ nghi Đại Hy/,/^Tự học lễ nghi/,/^Tiếp sứ thần/,/^Hầu .* nghe chính sự/,/^Gửi lễ vật|^Đánh cờ/,/^Vấn an/,/^Xin thêm hồi môn/,/^Cùng .* may áo/,/^Trò chuyện với/,/^Kết thân|^Dạy .* một điệu/,/^Dò ý/,/^Đọc sách/,/^Múa điệu|^Cưỡi ngựa/,/^Cầu phúc/,/^Ra chợ/];
 const bad=/Ở lại quê|Nhận lời làm thiếp|Theo họ về|đi thay|Mời thầy cúng|Tự mình chống trả/;let g=0,mv=0;
 while(g++<20000&&isKc()&&!S.dead){
  if(Q.length){const m=Q[0];if(m.opts&&m.opts.length){const O=m.opts.map((c,i)=>[c,i]).filter(([c])=>!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));let L=O.filter(([c])=>!bad.test(c.n));if(!L.length)L=O;if(!L.length){Q.shift();continue}chooseM(L[Math.random()<.65?0:Math.floor(Math.random()*L.length)][1])}else Q.shift();continue}
  if(S.mg){S.mg=null;continue}
  if(S.suc<35){if(S.place!==P+(S.kc.kd==="dan"?"nha":"tam")&&!kcGoWhy(P+(S.kc.kd==="dan"?"nha":"tam"))){kcGo(P+(S.kc.kd==="dan"?"nha":"tam"));continue}const r=deck.findIndex(a=>/^Nghỉ ngơi/.test(a.n)&&!a.lock&&can(cardCost(a)));if(r>=0){act(r);continue}nextBuoi();continue}
  if(used>=4){mv=0;nextBuoi();continue}
  if(!window.__noSelf&&!S.mg&&!Q.length&&can(2)&&S.suc>=60){const A=typeof lessonMode==="function"?ARTS.filter(a=>S.arts[a.k]<5).sort((a,b)=>S.arts[a.k]-S.arts[b.k]):[];
   const V=typeof lessonVir==="function"&&typeof VIR!=="undefined"&&S.vir?VIR.filter(v=>(S.vir[v.k]||0)<5).sort((a,b)=>(S.vir[a.k]||0)-(S.vir[b.k]||0)):[];
   if(A.length&&(Math.random()<.55||!V.length)){await window.__kc2Self(()=>lessonMode(A[0].k,"self"));continue}if(V.length){await window.__kc2Self(()=>lessonVir(V[0].k,"self"));continue}}
  const ok=a=>!a.done&&!a.lock&&can(cardCost(a))&&canPay(a);let done=false;
  {const k=kcBestArt();const l=S.arts[k]||0,cost=5+l*5;if(l<5&&can(2)&&S.bac>=cost+40&&Math.random()<.5){apply({suc:-10,bac:-cost});spend(2);addArt(k,2+R(2));continue}}
  for(const re of pri){const i=deck.findIndex(a=>re.test(a.n)&&ok(a));if(i>=0){act(i);done=true;break}}if(done)continue;
  {const k=kcBestArt();const l=S.arts[k]||0,cost=5+l*5;if(l<4&&can(2)&&S.bac>=cost+15){apply({suc:-10,bac:-cost});spend(2);addArt(k,2+R(2));continue}}
  if(mv++<3){const ks=Object.keys(KCPL).filter(k=>kc2Mine(k)&&!kcGoWhy(k));if(ks.length){kcGo(ks[Math.floor(Math.random()*ks.length)]);continue}}
  mv=0;nextBuoi()}
 return g};`;
const SNAP=`window.__kc2Snap=function(t0){const ar=Object.values(S.arts||{});let known=0;try{known=liveRivals(true).filter(v=>k61St(v)>=2).length}catch(e){}
 return{o:S.origin.k,dead:!!S.dead,mo:S.turn-t0,rank:S.rank,srv:!!(S.srv&&!S.srv.risen),risen:!!(S.srv&&S.srv.risen),srk:S.srv?S.srv.rk:null,lau:S.srv?S.srv.lau:null,tin:S.tin,out:!!S.out,maxRank:window.__maxRank,home:!!(S.kc&&!S.kc.inPal),end:S.kc&&S.kc.end,sung:S.sung,danh:S.danh,bac:S.bac,stats:S.sac+S.tai+S.tamco+S.duc,capCut:S.kc&&S.kc.cap?Object.values(S.kc.cap).reduce((a,b)=>a+b,0):0,/* jkcg OR08: Tư chất cut by the +cap rule at entry */arts:ar.reduce((a,x)=>a+x,0),known,sc:(S.kc&&S.kc.ex&&S.kc.ex.sc!=null)?S.kc.ex.sc:(S.selx&&S.selx.sc),tier:(S.kc&&S.kc.ex&&S.kc.ex.tier)!=null?S.kc.ex.tier:(S.selx&&S.selx.tier)}}`;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const c=await b.newContext({viewport:{width:390,height:844}});
 await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:/\.html$/.test(f)?'text/html':/\.json$/.test(f)?'application/json':'text/plain'})});
 const rows=[],errs=[];const t0=Date.now();
 async function life(o,arm,i){const p=await c.newPage();
  /* fix2: SEED=<n> makes every life reproducible (seeded Math.random per life: seed, life index, origin, arm) */
  if(process.env.SEED){const s=(+process.env.SEED*100003+i*7919+[...o].reduce((a,ch)=>a*31+ch.charCodeAt(0),0)+(arm==='nha'?17:0))>>>0;
   await p.addInitScript(s=>{let a=s>>>0;Math.random=function(){a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},s)}p.on('pageerror',e=>errs.push(String(e.message).slice(0,160)));
  await p.goto(GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(800);
  await p.evaluate(`window.__noSelf=${process.env.NOSELF?1:0};window.__noPick=${process.env.NOSELF?1:0};window.__origO=${JSON.stringify(o)};window.__hhStop=1;try{PX.app.ticker.stop()}catch(e){}`);
  await p.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));await p.evaluate(fs.readFileSync(path.join(M,'inkc.js'),'utf8'));await p.evaluate(HOME+SNAP);
  const r=await p.evaluate(async arm=>{window.__bot=window.__bot||{};start();Q=[];try{$("modal").hidden=true}catch(e){}const t0=S.turn;const D=kc2Due()-t0;
   if(arm==='nha'){if(S.origin.k==='cnv')S.srv=null;kcInit();Q=[];if(S.kc.kd)await window.__kc2Home();else window.__kcRun('sens');Q=[];}
   else{S.selx={};const d=mkP("kc2Sel",{});if(d){Q.unshift({t:"Tuyển chọn",h:d.t,opts:d.o,who:d.who,pid:"kc2Sel",pp:{}});chooseM(0)}Q=[];
    let k=0;while(!S.dead&&S.turn-t0<D+1&&k++<4000){window.__bot.step("sens",40);if(window.__res.length)break}}
   const s=window.__kc2Snap(t0);s.D=D;s.arm=arm;s.res=window.__res.length?window.__res[0].title:null;s.self=window.__kc2SelfN||0;return s},arm);
  try{await p.close()}catch(e){}return r}
 for(let i=0;i<N;i++)for(const o of ORIG)for(const arm of ARMS){let r;try{r=await life(o,arm,i)}catch(e){errs.push('life '+String(e).slice(0,160));continue}rows.push(r);fs.writeFileSync(OUT,JSON.stringify({rows,errs}));process.stderr.write(`${o} ${arm} ${JSON.stringify(r)}\n`)}
 const avg=(L,k)=>+(L.reduce((a,x)=>a+(+x[k]||0),0)/Math.max(1,L.length)).toFixed(1);const sum={};
 for(const o of ORIG)for(const arm of ['cung','nha']){const L=rows.filter(r=>r.o===o&&r.arm===arm);const al=L.filter(r=>!r.dead&&!r.res&&!r.home&&!r.end);sum[o+'/'+arm]={n:L.length,dead:L.filter(r=>r.dead||r.res).length,outside:L.filter(r=>r.end&&!r.dead).length,mo:avg(al,'mo'),rank:avg(al,'rank'),risen:al.filter(r=>r.risen).length,srk:avg(al,'srk'),sung:avg(al,'sung'),danh:avg(al,'danh'),bac:avg(al,'bac'),stats:avg(al,'stats'),arts:avg(al,'arts'),known:avg(al,'known')}}
 console.log(JSON.stringify({sum,errs:errs.slice(0,5),secs:Math.round((Date.now()-t0)/1000)},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
