/* review/opt-render (owner 11/15 14:30Z / 15:05Z / 15:10Z, KIT 28.6) — EVERY event choice in cost mode, every active act with full numbers.
   usage: node dev/test/opt-render.js <build page url> <outdir> [WxH@dpr] [--bot]      (default 1180x820@2; --bot = a longer play run)
   A  every PEND event dialog (mkP / pushDil): no Được / Mất / Thành / Hỏng / Kèm / Ghi chú row, no odds word, no "Tốn: không" row, ONE kit
      hint row (kitHintRow: words only, no digit, none of the retired phrases) and the kit ODDS METER (kitOdds .kodm in .kat > .kodds) at the
      option's REAL odds (the ladder word of its own line = the roll's odds; a certain option = «Nắm chắc»); NO kitRisk chip (.krisk, retired
      by the owner 19/11 ~01:48Z).
   B  every ACTIVE-act picker (KIT_ACT_PIDS: gift / plant / taint / evidence / shop / veil / runner …): NOT hidden — no hint, no risk chip.
   C  the builders that put an event straight into the queue (approachOne visits incl. Thái hậu triệu / Kẻ hầu xin / Một ánh mắt, all FESTEV
      festivals, servant matters, the palace grant) → cost mode; the act confirms / pickers (Xuất gia?, Nội vụ phủ đưa người) and the shop
      (Hàng chợ đen) → full numbers.
   D  the real night: nightScene → prep "Điểm trang lộng lẫy" (Bạc −5) → night1 → night2 "Im lặng": the night card shows NO Bạc line from the
      prep (its price was its own Tốn — owner 13:30Z); the one Bạc line allowed is Được "Bạc +N" when the night brought Hoàng thượng's ân thưởng
      (j20 BBAC.night = BAL.nightBac, in S.awards — a real reward), seal "KẾT QUẢ" (no roll), the consorts' ghen in ONE collapsed Kèm line.
   E  clarity: the same option at Tâm cơ 5 / 30 / 70 reads vague / plain / sharp; the night talk options are told apart.
   F  the game's own turns: endTurn × 80 (× 240 with --bot) with every module's hooks; each dialog with choices the GAME pushed is classified
      (event / act / shop); one that is neither an event nor flagged act / shop / showOut FAILS (an event that slipped past cost mode).
   Also: no horizontal page overflow, no option wider than its box, no page error. Writes <outdir>/opt-render-<WxH>.json (every dialog). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const args=process.argv.slice(2);const BOT=args.includes('--bot');const [PAGE,OUT,SZ]=args.filter(a=>!a.startsWith('--'));fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const RETIRED=/(^|; )chuyện khác|có cái giá|thế đối thủ|có lợi về|chẳng được gì rõ/;
async function boot(b,W,H,dpr){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof kitHint==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;try{nlNew()}catch(e){}start()})}
 await sleep(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}S.bac=300;S.suc=80;S.th=Math.max(S.th||0,40);render()});
 return {ctx,p,errs}}
(async()=>{const [wh,dpr]=(SZ||"1180x820@2").split("@");const [W,H]=wh.split("x").map(Number);const b=await chromium.launch();
 const {p,errs}=await boot(b,W,H,dpr||2);
 /* the dialog on screen, read against the kit rules */
 await p.evaluate(()=>{window.__aud=()=>{const m=Q[0];const M=document.getElementById('modal');if(!m||M.hidden||!m.opts)return null;
  const T=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();const ev=kitIsEventChoice(m);
  const ovf=document.documentElement.scrollWidth>innerWidth+1;
  return {t:T(m.t),pid:m.pid||"",ev,ovf,opts:m.opts.map((o,i)=>{const b=M.querySelector(`#mb .opt[data-m="${i}"]`);if(!b)return{n:T(o.n),gone:true};
   const rows=[...b.querySelectorAll(".kr")].map(r=>[T((r.querySelector(".krl")||{}).textContent),T((r.querySelector(".krv")||r).textContent)]);
   const rk=b.querySelector(".krisk");const km=b.querySelector(".kat > .kodds .kodm");let want=6;try{const od=kitOptModel(o).odds;want=od?KIT_ODDS.indexOf(od):6}catch(e){}
   return{n:T(o.n).slice(0,48),rows,odds:!!b.querySelector(".kodds"),meter:km?+km.dataset.kodds:null,want,hidden:b.classList.contains("khideout"),hint:T((b.querySelector(".kr-hint .krv")||{}).textContent),
    risk:rk?T(rk.textContent):"",riskKit:!!(rk&&rk.classList.contains("kchip")),wide:b.scrollWidth>b.clientWidth+2,showOut:!!(o.showOut||m.showOut)}})}};
  window.__close=()=>{Q.length=0;const md=document.getElementById('modal');md.hidden=true;try{render()}catch(e){}}});
 const R={sz:SZ||"1180x820@2",fails:[],warn:[],A:{},B:{},C:{},D:null,E:null,F:null};
 const isClose=n=>/^(Thôi|Lui|Đóng|Bỏ qua)\b/.test(n);
 const checkEvent=(where,a)=>{if(!a)return;if(!a.ev)R.fails.push([where,a.t,"not in cost mode (kitIsEventChoice false)"]);if(a.ovf)R.fails.push([where,a.t,"page overflow"]);
  const hs=[];for(const o of a.opts){if(o.gone||o.showOut)continue;if(o.wide)R.fails.push([where,o.n,"option wider than its box"]);
   const out=o.rows.filter(([l])=>/^(Được|Mất|Thành|Hỏng|Kèm|Ghi chú)$/i.test(l));if(out.length)R.fails.push([where,o.n,"outcome row on an event choice",out.join(" / ")]);
   if(o.meter==null)R.fails.push([where,o.n,"no kit odds meter"]);else if(o.want>=0&&o.meter!==o.want)R.fails.push([where,o.n,"meter step ≠ the option's own odds",o.meter+"≠"+o.want]);if(o.rows.some(([l,v])=>/^Tốn$/i.test(l)&&/^không$/i.test(v)))R.fails.push([where,o.n,'"Tốn: không" row']);
   if(isClose(o.n))continue;
   if(!o.hint)R.fails.push([where,o.n,"no hint"]);else{if(/\d/.test(o.hint))R.fails.push([where,o.n,"digit in hint",o.hint]);if(RETIRED.test(o.hint))R.fails.push([where,o.n,"retired hint wording",o.hint])}
   if(o.risk)R.fails.push([where,o.n,"retired kitRisk chip shown",o.risk]);hs.push(o.hint)}
  if(hs.length>1&&new Set(hs).size<hs.length)R.warn.push([where,a.t,"two options with the same hint",hs.join(" | ")])};
 const checkAct=(where,a)=>{if(!a)return;if(a.ev)R.fails.push([where,a.t,"an active act / shop shown in cost mode"]);
  for(const o of a.opts){if(o.gone)continue;if(o.hidden||o.hint||o.risk)R.fails.push([where,o.n,"hint / risk / hidden outcome on an active act",o.hint])}};
 const dump=a=>a&&a.opts?a.opts.map(o=>o.gone?`(${o.n}: ✕)`:`${o.n} [${o.meter==null?"-":o.meter}] | ${o.rows.map(r=>r.join(": ")).join(" / ")}`):a;
 /* ---- A: every PEND event dialog ---- */
 const ACT=await p.evaluate(()=>[...KIT_ACT_PIDS]);
 const ids=(await p.evaluate(()=>Object.keys(PEND))).filter(k=>!ACT.includes(k));
 const PP={night2:{s:5},night1:{q:3,vp:0},tt3:{o:40},ch2:{o:40},thd1:{o1:40,o2:50}};
 const openP=async(id,pp,title)=>{const r=await p.evaluate(async([id,pp,title])=>{try{Q.length=0;const d=mkP(id,pp||{});if(!d||!d.o||!d.o.length)return"no options";pushDil(d,title||id);showModal()}catch(e){return "ERR "+e.message}
   await new Promise(r=>setTimeout(r,350));const a=__aud();__close();return a},[id,pp,title]);return r};
 for(const id of ids){const a=await openP(id,PP[id]);R.A[id]=typeof a==="string"?a:dump(a);if(a&&typeof a==="object")checkEvent("A:"+id,a)}
 /* ---- B: the active-act pickers ---- */
 const BPP=await p.evaluate(()=>{const v=liveRivals(true)[0];const ix=S.inv.findIndex(e=>e&&!e.h);const k=(S.kids||[]).find(x=>x.alive&&x.boy);
  if(!S.shop||!S.shop.length)try{S.shop=Object.keys(IT).filter(k=>IT[k].pr&&!IT[k].il).slice(0,6)}catch(e){}
  return{giftpick:{v:v&&v.id,ix},plantpick:{v:v&&v.id},taintpick:{ix},evpick:{ix},itarget:{ix,k:"botngua"},shop:{},plantsv:{},wkgive:{ix},runner:{},vlget:{},vlcraft:{},vlnvp:{},vlout:{},htban:k?{k:k.name,c:[]}:{},h54ban:k?{k:k.name,c:[]}:{}}});
 for(const id of ACT){const a=await openP(id,BPP[id]);R.B[id]=typeof a==="string"?a:dump(a);if(a&&typeof a==="object")checkAct("B:"+id,a)}
 /* ---- C: builders that push the item straight into the queue ---- */
 const runC=async(name,fn,kind)=>{const got=await p.evaluate(async([fn])=>{const out=[];const r0=roll;try{Q.length=0;(0,eval)(fn)}catch(e){roll=r0;return["ERR "+e.message]}roll=r0;
   const items=Q.slice();for(const m of items){Q.length=0;Q.push(m);m.must=1;/* past the j68 pacing of optional events (OPTT) */document.getElementById('modal').hidden=true;showModal();await new Promise(r=>setTimeout(r,300));const a=__aud();if(a)out.push(a)}__close();return out},[fn]);
  for(const a of got){if(typeof a==="string"){R.fails.push(["C:"+name,a]);continue}const k=kind==="mixed"?(a.t==="Hàng chợ đen"?"act":"event"):kind;(k==="event"?checkEvent:checkAct)("C:"+name,a)}
  return got};
 /* approachOne until every kind came (Thái hậu triệu, Kẻ hầu xin, Một ánh mắt, the visits) */
 const seen={};for(let i=0;i<220&&Object.keys(seen).length<12;i++){const got=await runC("approachOne",`(()=>{S.th=40;S.thDead=false;if(S.men&&S.men.length)S.men.forEach(m=>m.alive=true);const m=approachOne();if(m)Q.push(m)})()`,"event");
  got.forEach(a=>{if(a&&a.t){const k=a.t+" · "+(a.opts[0]&&a.opts[0].n);if(!seen[k])seen[k]={ev:a.ev,o:dump(a)}}})}
 R.C.approachOne=seen;R.approachSeen=[...new Set(Object.keys(seen).map(k=>k.split(" · ")[0]))];
 for(const want of ["Thái hậu triệu","Kẻ hầu xin","Có người đến"])if(!R.approachSeen.includes(want))R.warn.push(["C:approachOne",want,"not met in 220 draws"]);
 const one=async(name,fn,kind)=>{const got=await runC(name,fn,kind);R.C[name]=got.map(a=>typeof a==="string"?a:{t:a.t,ev:a.ev,o:dump(a)});return got};
 for(const k of await p.evaluate(()=>Object.keys(FESTEV)))await one("FESTEV "+k,`Q.push(Object.assign({who:pEmp(),ev:"fest"},FESTEV["${k}"]()))`,"event");
 await one("servCauses",`roll=()=>true;(S.staff||[]).forEach(s=>s.cause=null);servCauses()`,"event");
 await one("palCeremony",`S.pal=S.pal==null?1:S.pal;S.palCer=1;palCeremony()`,"event");
 await one("hireCard",`hireCard("maid")`,"act");
 await one("Hàng chợ đen",`roll=()=>true;(S.staff||[]).forEach(s=>{s.net=null;s.tr="tham";s.spyFor=null;netOf(s)});servTraitMonth()`,"mixed");
 { const c=R.C["Hàng chợ đen"]||[];if(!c.some(x=>x.t==="Hàng chợ đen"))R.warn.push(["C:Hàng chợ đen","not produced"]);}
 /* ---- D: the real night, Bạc −5 of the prep ---- */
 R.D=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;document.getElementById('modal').hidden=true;S.tonight=null;S.bac=300;
  const b0=S.bac,aw0=(S.awards||[]).length;nightScene();if(!Q.length)return{err:"nightScene pushed nothing ("+String(S.logs[0]||"").replace(/<[^>]+>/g,"")+")"};showModal();await W(300);
  const pi=Q[0].opts.findIndex(o=>/^Điểm trang/.test(o.n));if(pi<0)return{err:"no prep option"};chooseM(pi);await W(300);
  if(!Q[0]||Q[0].pid!=="night1")return{err:"night1 not next: "+(Q[0]&&Q[0].pid)};chooseM(3);await W(300);
  if(!Q[0]||Q[0].pid!=="night2")return{err:"night2 not next: "+(Q[0]&&Q[0].pid)};const ii=Q[0].opts.findIndex(o=>/^Im lặng/.test(o.n));chooseM(ii);await W(600);
  const t=document.getElementById('rtoast');if(!t||!t.classList.contains("on"))return{err:"no night card"};
  const k=t.querySelector('.kkem');const lst=k&&k.querySelector('.kkeml');
  const aw=(S.awards||[]).length>aw0?S.awards[0]:null;
  return{paid:b0-S.bac+(aw?aw.bac|0:0),award:aw?{why:aw.why,bac:aw.bac|0}:null,nightBac:typeof BBAC==="object"?BBAC.night:null,cls:t.className,seal:(t.querySelector('.seal')||{}).textContent,stamp:!!t.querySelector('.kmseal'),
   duoc:[...t.querySelectorAll('.kr-duoc .kitem')].map(x=>x.textContent),mat:[...t.querySelectorAll('.kr-mat .kitem')].map(x=>x.textContent),
   kem:k?k.querySelector('.kkems').textContent:"",collapsed:!!lst&&getComputedStyle(lst).display==="none"}});
 await p.screenshot({path:`${OUT}/night-result-${wh}.jpg`,type:'jpeg',quality:70});
 { const d=R.D;if(d.err)R.fails.push(["D:night",d.err]);else{if(d.paid!==5)R.warn.push(["D:night","prep cost paid "+d.paid]);/* the prep's price is its own Tốn: never a Bạc line in Mất. A Bạc line in Được only as the night's real ân thưởng silver
     (j20 BBAC.night = BAL.nightBac, recorded in S.awards) and exactly that amount */
  if(d.mat.some(x=>/^Bạc/.test(x)))R.fails.push(["D:night","Bạc line in Mất on the night card",d.mat.join(" / ")]);
  {const bd=d.duoc.filter(x=>/^Bạc/.test(x));if(bd.length&&!(d.award&&d.award.bac>0&&bd.length===1&&new RegExp("\\(\\+"+d.award.bac+"\\)|\\+"+d.award.bac+"$").test(bd[0])&&d.award.bac===d.nightBac))R.fails.push(["D:night","Bạc line in Được that is not the night's ân thưởng",bd.join(" / "),JSON.stringify(d.award)])}
  if(d.seal!=="KẾT QUẢ"||!/\bsure\b/.test(d.cls)||d.stamp)R.fails.push(["D:night","seal",d.seal,d.cls]);if(d.mat.some(x=>/ghen/.test(x)))R.fails.push(["D:night","ghen in Mất"]);if(!d.kem||!d.collapsed)R.fails.push(["D:night","no collapsed Kèm line"])}}
 await p.evaluate(()=>{const t=document.getElementById('rtoast');if(t)t.classList.remove('on');__close()});
 /* rolled seals still come from the roll */
 R.rolled=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const b=rsnap();S.danh-=3;resultShow("Tung tin đồn",b,false);await W(300);const t=document.getElementById('rtoast');const s1=(t.querySelector('.seal')||{}).textContent;
  const b2=rsnap();S.danh+=3;resultShow("Thỉnh an",b2,true);await W(300);return{fail:s1,ok:(t.querySelector('.seal')||{}).textContent}});
 if(R.rolled.fail!=="BẠI"||R.rolled.ok!=="THÀNH")R.fails.push(["rolled seals",JSON.stringify(R.rolled)]);
 /* ---- E: clarity by Tâm cơ, and the night talk options told apart ---- */
 R.E=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const out={};const t0=S.tamco,m0=S.mat;
  const read=()=>[...document.querySelectorAll('#mb .opt')].map(b=>`${(b.querySelector('.kan')||b).textContent.trim()} — ${(b.querySelector('.kr-hint .krv')||{}).textContent||""} [${((b.querySelector('.kat .kodm b'))||{}).textContent||""}]`);
  for(const [k,tc,mt] of [["vague",5,0],["plain",30,0],["sharp",70,3]]){S.tamco=tc;tmPlace(S,mt);Q.length=0;pushDil(mkP("giu",{}),"Giữ hay không giữ");showModal();await W(350);out["giu "+k]=read();
   Q.length=0;pushDil(mkP("night1",{q:3,vp:0}),"Đêm thị tẩm");showModal();await W(350);out["night1 "+k]=read()}
  S.tamco=t0;tmPlace(S,m0);__close();return out});
 { const E=R.E;const h=k=>E[k].map(s=>s.split(" — ")[1].replace(/ \[[^\]]*\]$/,""));
  if(h("giu vague").join()===h("giu plain").join())R.fails.push(["E:giu","hint does not sharpen from Tâm cơ 5 to 30"]);
  if(!/long thai/.test(h("giu plain")[1]||""))R.fails.push(["E:giu","'Đút bạc xin giữ' does not name keeping the pregnancy",h("giu plain")[1]]);
  if(!/không thể có thai/.test(h("giu plain")[0]||""))R.fails.push(["E:giu","'Cúi đầu tuân lệnh' hides losing the pregnancy",h("giu plain")[0]]);
  const s=h("night1 sharp");if(new Set(s).size<2)R.fails.push(["E:night1","the night talk options all read the same at Tâm cơ 70",s.join(" | ")]);}
 await p.evaluate(()=>{pushDil(mkP("night2",{s:5}),"Gối đầu");showModal()});await sleep(700);await p.screenshot({path:`${OUT}/night2-${wh}.jpg`,type:'jpeg',quality:70});
 await p.evaluate(()=>__close());
 /* ---- F: the game's own turns push the events (endTurn × N, all modules' hooks: weekly events, visits, festivals, story, servants…);
    every dialog with choices the GAME pushed must be an event (or a flagged act / shop) ---- */
 R.F=await p.evaluate(async(N)=>{const met={};const W=t=>new Promise(r=>setTimeout(r,t));const sm0=showModal;showModal=function(){};
  try{for(let i=0;i<N;i++){if(!S||S.dead){start();await W(50)}Q.length=0;try{endTurn()}catch(e){met["ERR "+e.message.slice(0,60)]={n:1,ev:false,flag:"error"}}
   for(const m of Q.slice()){if(!m||!m.opts||!m.opts.length)continue;const ev=kitIsEventChoice(m);const flag=m.act?"act":m.shop?"shop":m.showOut?"showOut":m.pid&&KIT_ACT_PIDS.has(m.pid)?"act-pid":"";
    const key=(m.pid||"")+" · "+String(m.t||"").replace(/<[^>]+>/g,"").slice(0,40);const r=met[key]=met[key]||{n:0,ev,flag,hint:[]};r.n++;
    if(ev&&!r.hint.length)r.hint=m.opts.map(o=>{const h=kitHint(o,m);return `${String(o.n).replace(/<[^>]+>/g,"").slice(0,30)}: ${h.hint} [${(()=>{try{return kitOptModel(o).odds||"Nắm chắc"}catch(e){return""}})()}]`})}
   Q.length=0;if(i%10===9)await W(20)}}finally{showModal=sm0;Q.length=0;document.getElementById('modal').hidden=true}
  return met},BOT?240:80);
 for(const [k,v] of Object.entries(R.F)){if(v.flag==="error"){R.warn.push(["F:play",k]);continue}if(!v.ev&&!v.flag)R.fails.push(["F:play",k,"a dialog with choices the game pushed that is neither an event nor a flagged act / shop"]);
  for(const h of v.hint){const w=h.split(": ").slice(1).join(": ").replace(/ \[[^\]]*\]$/,"");if(/\d/.test(w)||RETIRED.test(w))R.fails.push(["F:play",k,"bad hint",h])}}
 R.errs=errs.slice();
 if(R.errs.length)R.fails.push(["page errors",R.errs.slice(0,5).join(" | ")]);
 fs.writeFileSync(`${OUT}/opt-render-${wh}.json`,JSON.stringify(R,null,1));
 const evN=Object.values(R.A).filter(Array.isArray).length;
 console.log(JSON.stringify({sz:R.sz,fails:R.fails,warn:R.warn.slice(0,12),A_event_dialogs:evN,B_acts:Object.keys(R.B).length,C:Object.keys(R.C).length,approachSeen:R.approachSeen,night:R.D,rolled:R.rolled,E:R.E,
  F:R.F?Object.fromEntries(Object.entries(R.F).map(([k,v])=>[k,`${v.n}× ${v.ev?"EVENT":v.flag}`])):null,errs:R.errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
