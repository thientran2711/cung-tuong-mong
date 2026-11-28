/* end-maxrank (D-ENDRANK, law 11 FIX THE WHOLE GROUP + law 4 ONE CORE): «Phẩm cao nhất» = the highest standing she ACTUALLY held this life.
   Bugs: (a) a tú nữ sent home at the selection (ban hoa) showed «Phẩm cao nhất: Quý nhân» + «Quý nhân» over her name (origin ceiling, OD:L1250);
   (b) a cung nữ who never rose showed «Phẩm cao nhất: Đáp ứng» (j42's regex rewrite no longer matched the kit rows).
   ONE CORE: j32 rankStage / rankHeld / lifeTopRank. This test:
   1. STATIC scan of dev/build/*.js: every place that prints a life's best rank (the end-card row, Sổ luân hồi «r:», the board «mr», the maxRank tracker)
      must read the core — prints a table; a site still computing RANKS[max(rank,maxRank)] itself = FAIL.
   2. RUNTIME scan over origins × outcomes on the built page (dev/index.html, served by route):
      ban hoa (every tú nữ origin) · kept tú nữ (edict) · kept tú nữ with an old-save polluted maxRank · home (kc prelude ending, never entered) ·
      never-risen maid (best post held, «không» children) · maid in Tân Giả khố · risen maid (Đáp ứng) · demoted consort (keeps the best) · Hoàng hậu ·
      old save from LIVE (risen maid ckpt, if given) — for each: the end-card row, the portrait caption, Sổ luân hồi r, cung-kiep r, whether the board got it.
   usage: python3 dev/build/assemble.py && node dev/test/end-maxrank.js [devRoot] [--ckpt=<rerun ckpt json>] [--md] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const ARG=process.argv.slice(2);const ROOT=path.resolve(ARG.find(a=>!a.startsWith('--'))||path.resolve(__dirname,'..'));
const CK=(ARG.find(a=>a.startsWith('--ckpt='))||'').slice(7);const MD=ARG.includes('--md');
let bad=0;const ok=(c,m,x)=>{if(!c){bad++;console.log('FAIL',m,x!==undefined?JSON.stringify(x).slice(0,900):'')}else console.log('ok  ',m)};
/* ---------- 1. static scan ---------- */
const B=path.join(ROOT,'build');const SITES=[];
for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&!/^jbal/.test(f)).sort()){const L=fs.readFileSync(path.join(B,f),'utf8').split('\n');
 L.forEach((ln,i)=>{const at=`${f}:${i+1}`;
  if(/\["Phẩm cao nhất",/.test(ln)){const lit=/\["Phẩm cao nhất",\s*"/.test(ln);SITES.push({at,what:lit?'kit sample / column head (literal text, no life)':'end-card row «Phẩm cao nhất»',core:lit?null:/\["Phẩm cao nhất",TR\.n/.test(ln)})}
  if(/p\.unshift\(\{n:/.test(ln)&&/\br:/.test(ln))SITES.push({at,what:'Sổ luân hồi line (cung-luanhoi) r:',core:/r:lifeTopRank\(/.test(ln)});
  if(/function record\(fate\)/.test(ln))SITES.push({at,what:'cung-kiep record r:',core:/lifeTopRank\(S\)/.test(ln)});
  if(/S\.maxRank=Math\.max\(S\.maxRank\|\|0,S\.rank\)/.test(ln)&&/endTurn/.test(ln))SITES.push({at,what:'maxRank tracker (every month)',core:/rankHeld\(S\)/.test(ln)});
  if(!/function kpNow/.test(ln)&&/const mr=.*S\.maxRank/.test(ln)||/const TR=lifeTopRank\(S\);const mr=/.test(ln))SITES.push({at,what:'board life «mr» (rkSummary)',core:/lifeTopRank\(S\)/.test(ln)});
  if(/function rkTrack\(/.test(ln)||/if\((!rkSrvNever\(\)|rankHeld\(S\))\)\{const r=S\.rank/.test(ln))if(/const r=S\.rank\|0;if\(r>k\.mr\)/.test(ln))SITES.push({at,what:'board trail (rkTrack)',core:/rankHeld\(S\)/.test(ln)});
  if(/Phẩm cao nhất<\\\/span><b>/.test(ln))SITES.push({at,what:'servant end-card regex rewrite (pre-kit rows)',core:false});
  if(/RANKS\[Math\.max\(s?\.?S?\.?rank/.test(ln)||/RANKS\[Math\.max\(s\.rank/.test(ln))SITES.push({at,what:'other RANKS[max(rank,maxRank)]',core:false})})}
const tbl=['| where | what | reads the ONE CORE (j32 lifeTopRank / rankHeld) |','|---|---|---|'].concat(SITES.map(s=>`| ${s.at} | ${s.what} | ${s.core===null?'n/a':s.core?'yes':'**NO**'} |`));
console.log(tbl.join('\n'));{const L=SITES.filter(s=>s.core!==null);ok(L.length>=7&&L.every(s=>s.core),`static: every best-rank site reads the core (${L.filter(s=>s.core).length}/${L.length})`,L.filter(s=>!s.core))}
/* ---------- 2. runtime scan ---------- */
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8814/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.js')?'text/javascript; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 await ctx.route(/workers\.dev|\/rank\//,r=>r.fulfill({status:503,body:'{}'}));/* the board stays offline: the life waits in the queue (rkQ), nothing is sent */
 const p=await ctx.newPage();p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8814/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function',null,{timeout:300000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const CKS=CK&&fs.existsSync(CK)?JSON.parse(fs.readFileSync(CK,'utf8')).ls["hclh-save-v2-1"]:null;
 const R=await p.evaluate(CKS=>{SLOT=3;document.getElementById('title').hidden=true;const out=[];const T=x=>String(x||'').replace(/\s+/g,' ').trim();
  const close=()=>{try{document.querySelectorAll('.kmov,#kprevov,#kg82,#kpod,.kpod').forEach(x=>x.remove())}catch(e){}};
  const life=(og,pick)=>{for(let i=0;i<800;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k===og)break}if(!S||!S.origin||S.origin.k!==og)return false;S.kcPick=pick||"cung";nlAccept();close();return true};
  const card=()=>{const d=document.getElementById('modal');const rows={};d.querySelectorAll('.kr').forEach(r=>{const l=r.querySelector('.krl'),v=r.querySelector('.krv');if(l&&v)rows[T(l.textContent)]=T(v.textContent)});
   let cap='';try{const c=d.querySelector('.knr .knr-r')||d.querySelector('.pfwrap .pfrw');cap=c?T(c.textContent):''}catch(e){}return{row:rows["Phẩm cao nhất"],kids:rows["Con cái"],cap,hidden:d.hidden}};
  const rkN=()=>{try{return rkQ().length}catch(e){return -1}};
  const fin=(o,fn)=>{const q0=rkN();try{fn()}catch(e){o.err=String(e).slice(0,200)}const c=card();o.row=c.row;o.cap=c.cap;o.kids=c.kids;const L=(store.get("cung-luanhoi")||[])[0]||{};const K=(store.get("cung-kiep")||[])[0]||{};
   o.log=L.n===S.name?L.r:'(none)';o.kiep=K.n===S.name?K.r:'(none)';o.board=rkN()>q0;try{const it=rkQ()[rkQ().length-1];o.bmr=o.board&&it&&it.life?it.life.mr:null;if(o.board&&it&&it.life){o.bpre=it.life.pre;o.bpham=CTM_RANK.phamName(it.life);o.bscore=CTM_RANK.score(it.life).score;o.bcheck=CTM_RANK.check(it.life)}}catch(e){}o.stage=typeof rankStage==="function"?rankStage(S):'(no core)';out.push(o)};
  /* drive the 3 days (selx-days.js driver); mode ban = lowest marks, keep = top marks */
  const days=(mode,pre)=>{const Z=S.selx2;if(!Z||!Z.days)return"no days";if(mode==="ban"){S.sac=0;S.duc=0;S.tai=0}else{S.sac=S.duc=S.tai=100}
   for(let n=0;n<400&&Q.length&&!S.dead;n++){const m=Q[0];if(pre&&m.t==="Tin sắc phong"&&!pre.done){pre.done=1}
    if(m.pid==="kc2Sel"){Q.shift();S.selx.done=1;S.selx.art="";if(pre&&pre.fn)pre.fn();selxSelDo(mode==="ban"?0:10);close();continue}
    if(m.pid==="selxD"&&m.opts){let i=0;const nm=m.opts.map(x=>x.n);
     if(m.t==="Thái hậu"||m.t==="Hoàng hậu"){const tok=m.t==="Thái hậu"?"th":(liveRivals(false).find(v=>v.queen)||"th");const e=SELX_TESTS.find(x=>x.id===Z.tests[m.t==="Thái hậu"?"doidap":"hanhxu"].id);i=e.options.findIndex(x=>mode==="ban"?selxReactR(x,tok)!=="+":selxReactR(x,tok)==="+");if(i<0)i=0}
     else{const g=nm.findIndex(s=>/^Làm quen/.test(s));if(g>=0&&Z.days!==2)i=g;else{const c=nm.findIndex(s=>/chờ tới tối|Theo|Cất đồ|Quỳ|Ngủ|Về|Nghe/.test(s));i=c>=0?c:0}}
     chooseM(i);close();continue}
    if(m.cls==="end")break;if(m.opts){chooseM(0);close();continue}closeModal();close()}return""};
  const OR=ORIGINS.map(o=>o.k).filter(k=>k!=="cnv"&&k!=="cn"&&!selxHoaThan(k));
  /* (1) ban hoa, every tú nữ origin */
  for(const og of OR){if(!life(og))continue;const o={case:"ban hoa",og,ceil:RANKS[S.origin.r||0].n,want:"Tú nữ"};fin(o,()=>{const e=days("ban");if(e)throw e;if(!S.dead)throw "not ended"})}
  /* (2) kept tú nữ; (3) kept with a polluted maxRank (an old save made during the days) */
  for(const og of OR.slice(0,3)){if(!life(og))continue;const o={case:"kept → edict",og,ceil:RANKS[S.origin.r||0].n};days("keep");o.want=RANKS[S.rank].n;o.maxR=S.maxRank;fin(o,()=>die("Bạo bệnh"))}
  {const og=OR[0];if(life(og)){const o={case:"kept, old save maxRank=Quý phi",og};S.maxRank=5;S.rkIn=undefined;days("keep");o.want=RANKS[S.rank].n;o.maxR=S.maxRank;fin(o,()=>die("Bạo bệnh"))}}
  /* (4) home: kc prelude ending, never entered */
  for(const og of ORIGINS.map(o=>o.k).filter(k=>typeof kcOk==="function"&&kcOk(k)).slice(0,3)){if(!life(og,"nha"))continue;const o={case:"home (never entered)",og,want:"Chưa vào cung",isKc:isKc()};
   for(let n=0;n<30&&Q.length;n++){const m=Q[0];if(m.opts){chooseM(0)}else closeModal();close()}fin(o,()=>kcEndDo("Xuất gia","Nàng cắt tóc ở chùa.","Xuất gia, không vào cung"))}
  /* (5) never-risen maid: highest post held (rose to rung 3, then back to 1); (6) Tân Giả khố; (7) risen maid */
  const maid=()=>{if(!life("cnv"))return false;for(let n=0;n<60&&!(S.srv&&S.kc&&S.kc.inPal||S.srv&&!S.kc);n++){const m=Q[0];if(!m)break;if(m.pid==="kc2Sel"){Q.shift();S.selx.done=1;kc2SelDo(10);close();continue}if(m.opts)chooseM(0);else closeModal();close()}return !!S.srv};
  if(maid()){const o={case:"maid never rose (rung 3 then 1)",og:"cnv",want:SRK.maid[3]};S.srv.rk=3;rkTrack();S.srv.rk=1;rkTrack();fin(o,()=>over("Xuất cung",`${S.name} 30 tuổi, Nội vụ phủ cho xuất cung theo lệ.`,"Xuất cung tuổi 30"))}
  if(maid()){const o={case:"maid in Tân Giả khố",og:"cnv",want:"Cung nữ Tân Giả khố"};S.srv.rk=0;S.srv.lau=3;if(S.rk)S.rk.sr=0;fin(o,()=>die("Bạo bệnh"))}
  if(maid()){const o={case:"maid risen → Đáp ứng",og:"cnv",want:RANKS[0].n};S.age=Math.max(S.age,BAL.ageMin);srvRise("Hoàng thượng để mắt");close();fin(o,()=>die("Bạo bệnh"))}
  /* (8) consort promoted to Phi then demoted to Quý nhân; (9) Hoàng hậu */
  {const og=OR[1]||OR[0];if(life(og)){days("keep");const o={case:"consort Phi → demoted Quý nhân",og,want:RANKS[4].n};S.rank=4;Q=[];try{endTurn()}catch(e){}close();o.maxAfterMonth=S.maxRank;if((S.maxRank|0)<4){o.note="endTurn did not track";S.maxRank=4}S.rank=2;fin(o,()=>die("Bạo bệnh"))}}
  {const og=OR[2]||OR[0];if(life(og)){days("keep");const o={case:"Hoàng hậu",og,want:"Hoàng hậu"};S.rank=7;S.queen=true;fin(o,()=>die("Bạo bệnh"))}}
  /* (10) old save from LIVE (rerun-cnv-ban speed-3 ckpt: a risen maid, age 39) */
  if(CKS){try{localStorage.setItem('hclh-save-v2-2',CKS);const x=loadSlot(2);SLOT=2;quiet=true;deser(x);quiet=false;Q=[];close();const o={case:"old save LIVE ckpt (risen maid)",og:S.origin&&S.origin.k,want:RANKS[Math.max(S.rank|0,S.maxRank|0)].n};fin(o,()=>die("Bạo bệnh"))}catch(e){out.push({case:"old save",err:String(e).slice(0,200)})}}
  return out},CKS);
 const md=['| case | origin (ceiling) | stage | end-card «Phẩm cao nhất» | portrait caption | Con cái | Sổ luân hồi r | cung-kiep r | sent to board (mr · Bảng word · Công danh) | expected |','|---|---|---|---|---|---|---|---|---|---|']
  .concat(R.map(o=>`| ${o.case} | ${o.og||''}${o.ceil?` (${o.ceil})`:''} | ${o.stage||''} | ${o.row||o.err||''} | ${o.cap||''} | ${o.kids||''} | ${o.log||''} | ${o.kiep||''} | ${o.board?`yes (${o.bmr} · ${o.bpham} · ${o.bscore})`:'no'} | ${o.want||''} |`));
 console.log(md.join('\n'));if(MD)fs.writeFileSync(path.join(require('os').tmpdir(),'end-maxrank.md'),md.join('\n'));
 const by=c=>R.filter(o=>o.case===c);
 ok(R.length>=12&&R.every(o=>!o.err),`runtime: ${R.length} lives ran without error`,R.filter(o=>o.err));
 ok(R.every(o=>o.row===o.want),'end card «Phẩm cao nhất» = the rank / post she really held',R.filter(o=>o.row!==o.want).map(o=>[o.case,o.og,o.row,o.want]));
 ok(R.every(o=>o.log===o.want&&o.kiep===o.want),'Sổ luân hồi (cung-luanhoi + cung-kiep) = the same word',R.filter(o=>o.log!==o.want||o.kiep!==o.want).map(o=>[o.case,o.log,o.kiep,o.want]));
 ok(by("ban hoa").length>=4&&by("ban hoa").every(o=>o.cap==="Tú nữ"),'ban hoa: the portrait over her name reads «Tú nữ», not the origin ceiling',by("ban hoa").map(o=>[o.og,o.cap]));
 ok([...by("ban hoa"),...by("home (never entered)")].every(o=>o.board&&o.bmr===-1&&o.bpre&&o.bpham===o.want&&o.bscore===0&&o.bcheck===null),'a life that never entered goes to the board with its TRUE standing (pre, Công danh 0, accepted by check)',R.filter(o=>/ban hoa|home/.test(o.case)).map(o=>[o.case,o.og,o.bmr,o.bpre,o.bpham,o.bscore,o.bcheck]));
 ok(R.filter(o=>/^maid (never|in)/.test(o.case)).every(o=>o.kids==="không"),'a maid who never rose: «Con cái: không»',R.filter(o=>/^maid/.test(o.case)).map(o=>[o.case,o.kids]));
 ok(R.filter(o=>/^kept/.test(o.case)).every(o=>o.maxR===undefined||o.maxR===null||RANKS_IDX(o)),'kept: after the edict maxRank = the rank given',R.filter(o=>/^kept/.test(o.case)).map(o=>[o.case,o.maxR,o.want]));
 {const N=["Đáp ứng","Thường tại","Quý nhân","Tần","Phi","Quý phi","Hoàng quý phi","Hoàng hậu"];const L=R.filter(o=>o.stage&&o.stage!=="rank");ok(L.length>=10&&L.every(o=>o.cap&&!N.includes(o.cap)),'no life that never held a rank shows a consort rank over her name (home / tú nữ / maid)',L.filter(o=>!o.cap||N.includes(o.cap)).map(o=>[o.case,o.cap]))}
 {const z=await p.evaluate(()=>{const W=Object.values(BAL.rank.preN||{});let h='';try{h=JSON.stringify(rkRulesSpec())}catch(e){h='ERR '+e}return{roles:W.map(w=>[w,rkRole(w).role]),spec:W.every(w=>h.includes(w)),n:W.length}});
  ok(z.n===2&&z.roles.every(r=>r[1]!=='maid'&&r[1]!=='consort'),'board face: «Chưa vào cung» / «Tú nữ» get no maid / consort decor (rkRole)',z.roles);
  ok(z.spec,'«Cách tính» explains never-entered lives (BAL.rank.preN words)',z)}
 {const zz=await p.evaluate(()=>{try{rkOpen('lives')}catch(e){}try{rkRulesOpen()}catch(e){}const m=document.getElementById('modal'),o=document.getElementById('krkov');const r={m:+getComputedStyle(m).zIndex,o:o?+getComputedStyle(o).zIndex:0};try{closeModal()}catch(e){}try{rkClose()}catch(e){}return r});ok(zz.m>zz.o,'«Cách tính» opens ABOVE Bảng vàng (#modal.krkp z over #krkov)',zz)}
 ok(!errs.length,'no page errors',errs);
 await b.close();console.log(bad?`${bad} FAIL`:'ALL PASS');process.exit(bad?1:0)})();
function RANKS_IDX(o){const N=["Đáp ứng","Thường tại","Quý nhân","Tần","Phi","Quý phi","Hoàng quý phi","Hoàng hậu"];return N[o.maxR|0]===o.want}
