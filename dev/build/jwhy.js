/* ================= jwhy — "Vì sao <bậc>?" (owner 11/15 05:55Z: no luck without cause) =================
   1. ONE spy formula (dò la) for everyone: the player, her maid, NPC consorts and their servants. The odds come from real,
      visible factors: who spies (her Tai mắt, Tâm cơ, Tài), who goes (the servant's Lòng, nết, rank, whether she knows people
      in the target's palace), who is watched (Tâm cơ, nết Đa nghi, eunuch guards, the target's own Tai mắt), Hoàng thượng
      đa nghi, Sức, Quẻ tuần. spyFactors() returns the factor list; spyRaw() the number (no Quẻ); the card shows it with Quẻ.
   2. kitWhy: tapping the odds meter on any act card / option opens the kit popover with "Vì sao <bậc>?" — the factors that
      raised or lowered it, in words with +/− steps (never %), then the 7-step ladder. Explicit factor lists where an act
      has one (a.why / ACT[k].why); otherwise the real formula is re-evaluated with each stat set to a neutral value, so the
      list is always the formula's own inputs. KIT.md §11.1. ================= */
/* spy knobs (balance: the average odds over all consort pairs stays where oSpy+sentPen had it; dev/test/act-audit.js --spy) */
Object.assign(BAL,{spyBase:58,spyMat:6,spySent:0,spyNoAgent:20,spyKnow:10,spyCnv:6});
const WHYSTEP=12;/* ≈ one ladder step (31/46/56/66/81/91) */
function whyStep(pts){const a=Math.abs(pts);if(a<1)return"";const n=Math.round(a/WHYSTEP);return `${pts>0?"dễ hơn":"khó hơn"}${n>=1?` ${n} bậc`:" chút"}`}
function whyNm(p){if(!p)return"";if(p===S)return"ngươi";const q=p.queen?"Hoàng hậu":"";return q||p.name||""}
function whyPal(t){try{if(t!==S&&typeof kitKnownName==="function"&&!kitKnownName(t))return "một thiên điện";/* unmet: palName would print "thiên điện của <name>" (reign-road-fix-r1) */return t===S?"cung ngươi":(typeof palName==="function"&&palName("r"+t.id))||`cung ${t.name}`}catch(e){return `cung ${t.name}`}}
/* her trusted maid (S.maid): a nết and acquaintances like every other servant, assigned once, kept in the save */
function whyMaidInit(m){if(!m)return m;
 if(!m.af){m.af={};try{const L=allServ().filter(s=>ownerOf(s)!==S);for(let i=0;i<2&&L.length;i++){const s=L.splice(Math.floor(Math.random()*L.length),1)[0];m.af[s.sid]=30}}catch(e){}}return m}
function whyKnows(ag,t){if(!ag||!ag.af||!t||!t.staff)return null;return t.staff.find(s=>(ag.af[s.sid]||0)>=20)||null}
/* the agent who goes: herself when together, else the best servant (bestSent) or, for the player at home, her maid */
function spyAgent(a,t,ag){if(ag!==undefined)return ag;if(together(a,t))return null;return bestSent(a)||false}
function spyFactors(a,t,ag){const F=[],me=a===S;ag=spyAgent(a,t,ag);
 F.push(["Tai mắt "+(me?"ngươi ":"")+(a.mat||0),eyes(a)*BAL.spyMat]);
 F.push(["Tâm cơ "+(me?"ngươi ":"")+(a.tamco||0),(a.tamco||0)/5]);
 F.push(["Tài "+(me?"ngươi ":"")+(a.tai||0),(a.tai||0)/10]);
 if(ag===false)F.push(["Không có kẻ hầu đáng tin để sai đi",-BAL.spyNoAgent]);
 else if(ag){const nm=ag.name||"kẻ hầu";F.push([`Phải sai ${nm} đi, không tận mắt`,-BAL.spySent]);
  F.push([`Thiện cảm ${nm} ${ag.loyal}`,((ag.loyal||0)-50)/5]);
  const tb=qv({lanh:8,chuyen:5,trung:2,tham:0,nhat:-5},ag,0);if(tb)F.push([ag.kn||ag===S.maid?`${nm} ${netTxt(ag)}`:`Nết ${nm} (ngươi chưa rõ)`,tb]);
  if(ag.rk)F.push([`${nm} bậc ${srk(ag)}`,srk(ag)*3-3]);
  const f=whyKnows(ag,t);if(f)F.push([`${nm} quen người ${whyPal(t)}`,BAL.spyKnow])}
 else F.push(["Tự tay dò xét, tận mắt",0]);
 const tn=whyNm(t);if(t){F.push([`Tâm cơ ${tn}`,-(t.tamco||0)/8]);
  const dn=(typeof traitsOf==="function"?traitsOf(t):[]).includes("Kín đáo");if(dn){const known=t===S||(typeof trKnown==="function"&&trKnown(t).includes("Kín đáo"));F.push([known?`${tn} đa nghi`:`Nết ${tn} (ngươi chưa rõ)`,-8])}
  const eu=(t.staff||[]).filter(s=>s.role==="eunuch").length;if(eu)F.push([`${eu} thái giám canh ${whyPal(t)}`,-3*eu]);
  if(t.mat)F.push([`Tai mắt ${tn}`,-eyes(t)*3])}
 if(DG())F.push(["Hoàng thượng đa nghi",-6]);
 if((a.suc||0)<30)F.push(["Sức "+(me?"ngươi ":"")+(a.suc||0)+" (dưới 30)",-15]);
 return F.filter(x=>x[1]||/Tự tay/.test(x[0]))}
function spyRaw(a,t,ag){return BAL.spyBase+spyFactors(a,t,ag).reduce((s,x)=>s+x[1],0)}
function spyO(a,t,ag){return oddsCl(Math.round(spyRaw(a,t,ag)))}
function spyRoll(a,t,ag){return oddsCl(Math.round(spyRaw(a,t,ag)+lotB(a,"Mưu kế")))}
/* consort act "Dò la" (everyone, two-way): the formula above; the servant penalty is inside it (no second sentPen) */
(function(){const A0=ACT.spy;if(!A0)return;A0.o=(a,t)=>t?spyRoll(a,t):oSpy(a);/* the roll's own odds (lá số included; review/shown-odds-one-path) */A0.why=(a,t)=>spyFactors(a,t);
 A0.f=(a,t)=>{ap(a,{bac:-actBac("spy",a,t)})/* one core: the jecon §5 price the card shows (was a flat 15) */;const o=spyRoll(a,t);if(aRoll(o,a)){ap(a,{tamco:2});return spyFind(a,t)}relAdd(a,t,BAL.eff.jwhy.f);return `${NMc(a)} dò la ${NM(t)}: <span class="r">bị phát hiện</span>. `};})();
/* NPC small act "người của X dò hỏi" (j28): same formula instead of a flat 40 */
(function(){try{if(typeof SOC==="object"&&SOC.spy){SOC.spy.run=(v,t)=>{evA(v,t,roll(spyRoll(v,t))?BAL.eff.jwhy.evRun[0]:BAL.eff.jwhy.evRun[1]);return `Người của ${v.name} dò hỏi giờ giấc của ${NM(t)}`}}}catch(e){}})();
/* her maid at home: "Sai đi dò la" — SHE chooses whom (owner 08:45Z: never a silent random target for a player act).
   The card names the current target ("nhắm: …", her last choice, else the one most hostile to her that she knows); tapping it
   opens a kit dialog with every consort she can send the maid to, each with its own odds word and "Vì sao…?" from the same
   formula. j78's knowledge (2 true facts, chứng cứ +1) and failure (maid caught: lòng -5, target oán +5) are kept. */
function spyKnown(v){try{return typeof k61Named==="function"?k61Named(v):knows(v)}catch(e){return true}}
function spyWho(v){const r=v.queen?"Hoàng hậu":RANKS[v.rank].n;return spyKnown(v)?`${r} ${v.name}`:`${r} ở ${whyPal(v)} (chưa quen)`}
function spyList(){return liveRivals(true).filter(v=>!sameHouse(S,v))}
function spyBk(){try{return typeof bkey==="function"?bkey():0}catch(e){return 0}}
function spyTarget(){S.mspy=S.mspy||{};const L=spyList();if(!L.length)return null;let t=L.find(v=>v.id===S.mspy.id);
 if(!t){const K=L.filter(spyKnown);t=(K.length?K:L).slice().sort((x,y)=>(danger(y,S)-danger(x,S))||(y.sung-x.sung))[0];S.mspy={b:spyBk(),id:t.id}}
 S.mspy.b=spyBk();return t}
function spyMaidRun(t,ag){const m=ag||whyMaidInit(S.maid);S.mspy={b:spyBk(),id:t.id};const o=spyRoll(S,t,m);const ok=aRoll(o);
 if(ok){if(typeof j78maidSpy==="function")j78maidSpy(ag);else{log(evA(S,t,BAL.eff.jwhy.evSpyMaidRun)?`${m.name} dò la ${spyWho(t)}: chứng cứ ${balSg(BAL.eff.jwhy.evSpyMaidRun)}.`:`${m.name} dò la ${spyWho(t)}: không tìm ra điều gì sai trái.`)}}
 else{if(ag)ag.loyal=cl((ag.loyal||0)-BAL.eff.jwhy.loyalSpyMaidRun,0,100);else apply({maid:-5});if(typeof j78maidFail==="function")j78maidFail(ag);else log(`${m.name} bị bắt gặp khi dò la ${spyWho(t)}: thiện cảm -${balAb(BAL.eff.jwhy.loyalSpyMaidRun)}.`)}
 window.__lastOk=ok;return ok}
/* review/pick-hint (owner 15/11 "Giải thích khó hiểu quá"): the picker's "what decides the odds" line is ONE short sentence — who raises it
   (the servant's skill, people she knows there), who lowers it (how watchful the target's palace is); the full list stays in "Vì sao…?" */
function spyHint(m){return `Thành hay bại tùy: Tai mắt của ngươi, ${m.name} khéo hay vụng, có quen ai bên ấy không; bên ấy càng đa nghi, canh giữ càng chặt thì càng khó.`}
/* ag: the servant sent (any maid / eunuch of her household, review/servant-system); none = her trusted maid */
function spyPick(refund,ag){const m=ag||whyMaidInit(S.maid),L=spyList();const cur=spyTarget();
 const opts=L.map(v=>{const fz=spyRoll(S,v,m);/* the odds printed = the odds rolled after the pay (j9 fzRun) */return{kgt:v,n:`${mdH(pv(v),"xs")}${spyWho(v)}${v===cur?" · đang nhắm":""}`,x:`${word(fz)} · thành: biết 2 điều thật về nàng, chứng cứ ${balSg(BAL.eff.j78.evN)} · hỏng: Thiện cảm ${m.name} -5, nàng đoán ra: ${typeof pvOan==="function"?pvOan(v,BAL.eff.j78.j78maidFail):`oán ta ${balSg(BAL.eff.j78.j78maidFail)}`}`,
  why:()=>spyFactors(S,v,m),dom:"Mưu kế",o:spyO(S,v,m),go:()=>{/* review/servant-system: the khắc is paid when a target is chosen (j25 payOnPick: the card is an "open" act); before, nothing was paid and "Thôi" gave 2 khắc back */if(S.payOnPick){spend(S.payOnPick);S.payOnPick=0}const b=rsnap();const ok=fzRun(fz,null,()=>spyMaidRun(v,ag));try{if(S.visit){S.visit.tk=S.visit.tk||{};if(popIdx!=null)S.visit.tk[popIdx]=1}}catch(e){}setTimeout(()=>{try{resultShow(`Sai ${m.name} dò la ${spyWho(v)}`,b,ok)}catch(e){}},0)}}});
 opts.push({n:"Thôi, để sau",x:"không sai đi (khắc vừa tốn được trả lại)",go:()=>{if(S.payOnPick)S.payOnPick=0;else if(refund)used=Math.max(0,used-refund)}});
 Q.push({t:`Sai ${m.name} đi dò la`,ownAct:1,/* dialog-person (owner 21/11): the choice is HERS alone — her own figure stands on the left (jk4 kitStagePeople); `who` stays only to name the servant she sends (no chip of her inside the text) */who:ag&&typeof pServ==="function"?pServ(ag):typeof pMaid==="function"?pMaid():null,h:`<p>Ngươi muốn ${m.name} dò la ai? ${spyHint(m)}</p>`,opts});showModal()}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(!p||p.kind!=="maid"||!S.maid)return A;const i=A.findIndex(a=>a.n==="Sai đi dò la");if(i<0)return A;
 const m=whyMaidInit(S.maid),t=spyTarget();if(!t){A[i]=Object.assign({},A[i],{lock:true,t:"không còn phi tần nào để dò"});return A}
 A[i]={n:"Sai đi dò la",dom:"Mưu kế",o:spyO(S,t,m),x:`nhắm: ${spyWho(t)} (chạm để đổi) · biết 2 điều thật về nàng · chứng cứ ${balSg(BAL.eff.j78.evN)}`,/* previews: j78maidSpy */l:{maid:-5},risk:`nàng đoán ra: ${typeof pvOan==="function"?pvOan(t,BAL.eff.j78.j78maidFail):`oán ta ${balSg(BAL.eff.j78.j78maidFail)}`}`,
  why:()=>spyFactors(S,t,m),act:1,open:()=>spyPick(2)};
 /* (2) "Nghe ngóng chung": no target, 1 khắc, one true piece of palace news; who it is about is weighted by real causes */
 A.splice(i+1,0,{n:"Nghe ngóng chung",o:100,x:`${m.name} đi nghe ngóng: biết 1 điều thật trong cung (về kẻ gây chuyện hoặc người ${m.name} quen)${eyes(S)>=3?" · Tai mắt nhiều: thêm 1 điều":""}`,
  run:()=>{const r=spyNews(m);return r}});return A}})();
function spyNewsW(v,m){return 1+Math.max(0,danger(v,S))/15+(whyKnows(m,v)?3:0)+((v.sung||0)>=50?1:0)+(v.preg?1:0)+((S.met&&S.met[v.id]!=null)?0:.5)}
function spyNews(m){const L=spyList();if(!L.length)return`${m.name} đi một vòng, trong cung yên ắng.`;const W=L.map(v=>spyNewsW(v,m));let r=Math.random()*W.reduce((a,b)=>a+b,0),i=0;while(r>W[i]&&i<L.length-1){r-=W[i];i++}
 const v=L[i];const n=eyes(S)>=3?2:1;let f="";try{f=typeof intelLearn==="function"?intelLearn(v,n,{by:m.name,how:"Nghe ngóng"}):""}catch(e){}
 const why=whyKnows(m,v)?`${m.name} quen người ${whyPal(v)}`:danger(v,S)>=netTh(v,"act")?"nàng đang có chuyện với ngươi":(v.sung||0)>=50?"nàng đang được sủng, ai cũng bàn":"chuyện nghe được ngoài hành lang";
 const t=`${m.name} nghe ngóng được về ${spyWho(v)} (${why}): ${f||"nàng dạo này ít ra ngoài, chưa có gì mới."}`;return t}
/* servant start (j42): the mistress's order "dò la" weighs the target too */
(function(){if(typeof ordOdds!=="function")return;const o0=ordOdds;ordOdds=function(k,t){if(k!=="spy"||!t)return o0.apply(this,arguments);return oddsCl(Math.round(o0.apply(this,arguments)+BAL.spyCnv+cnvSpyF(t).reduce((s,x)=>s+x[1],0)))}})();
function cnvSpyF(t){const F=[];const tn=whyNm(t);F.push([`Tâm cơ ${tn}`,-(t.tamco||0)/8]);if((typeof traitsOf==="function"?traitsOf(t):[]).includes("Kín đáo"))F.push([trKnown(t).includes("Kín đáo")?`${tn} đa nghi`:`Nết ${tn} (ngươi chưa rõ)`,-8]);
 const eu=(t.staff||[]).filter(s=>s.role==="eunuch").length;if(eu)F.push([`${eu} thái giám canh ${whyPal(t)}`,-3*eu]);if(t.mat)F.push([`Tai mắt ${tn}`,-eyes(t)*3]);
 const f=(t.staff||[]).find(s=>S.srv&&(S.srv.af[s.sid]||0)>=30);if(f)F.push([`Ngươi quen ${f.name} ở ${whyPal(t)}`,BAL.spyKnow]);return F}
(function(){if(typeof srvDoOrder!=="function")return;const d0=srvDoOrder;srvDoOrder=function(k,t){if(k!=="spy")return d0.apply(this,arguments);const o0=ordOdds;ordOdds=kk=>o0(kk,t);try{return d0.apply(this,arguments)}finally{ordOdds=o0}}})();

/* ---------- the breakdown: explicit lists, or the real formula re-evaluated with each input set to neutral ---------- */
const WHYK=[["mat","Tai mắt",0],["tamco","Tâm cơ",0],["tai","Tài",0],["sac","Sắc",0],["danh","Danh",0],["sung","Sủng",0],["duc","Đức",0],["th","Thái hậu quý",0],["hh","Hoàng hậu quý",0],["an","Ân tình",0],["suc","Sức",100],["thu","Thủ hạ",0]];
function whyDiff(fn,subj){const L=[];let o0;try{o0=fn()}catch(e){return L}if(o0==null)return L;
 for(const [p,who] of subj){if(!p)continue;for(const [k,lab,ref] of WHYK){if(typeof p[k]!=="number"||p[k]===ref)continue;const v=p[k];let o1;try{p[k]=ref;o1=fn()}catch(e){o1=o0}finally{p[k]=v}
   if(o1!=null&&o1!==o0)L.push([who===S?`${lab} ngươi ${v}`:`${lab} ${whyNm(who)}`,o0-o1])}
  if(p.maid&&typeof p.maid.loyal==="number"){const v=p.maid.loyal;let o1;try{p.maid.loyal=50;o1=fn()}catch(e){o1=o0}finally{p.maid.loyal=v}if(o1!=null&&o1!==o0)L.push([who===S?`Thiện cảm ${p.maid.name||"cung nữ"} ${v}`:`Thiện cảm của cung nữ của ${whyNm(who)}`,o0-o1])}
  if(p.arts)for(const k in p.arts){if(typeof p.arts[k]!=="number"||!p.arts[k])continue;const v=p.arts[k];let o1;try{p.arts[k]=0;o1=fn()}catch(e){o1=o0}finally{p.arts[k]=v}
   if(o1!=null&&o1!==o0)L.push([`${(typeof ARTS!=="undefined"&&(ARTS.find?((ARTS.find(x=>x.k===k)||{}).n):ARTS[k]&&ARTS[k].n))||"Tài nghệ"} ${who===S?"ngươi":whyNm(who)} bậc ${v}`,o0-o1])}}
 if(S&&S.emp&&typeof S.emp.mood==="number"){const v=S.emp.mood;let o1;try{S.emp.mood=1;o1=fn()}catch(e){o1=o0}finally{S.emp.mood=v}if(o1!=null&&o1!==o0)L.push([`Hoàng thượng ${String(MOODS[v][0]).toLowerCase()}`,o0-o1])}
 return L}
function whyOfBtn(b){if(!b||!S)return null;const d=b.dataset||{};
 try{if(d.r!=null&&d.a){const k=d.a,v=rivals[+d.r],A=ACT[k];if(!A||!v||!A.o)return null;const F=(A.why?A.why(S,v):whyDiff(()=>A.o(S,v),[[S,S],[v,v]])).concat(whyKnow(v,k));return{F,dom:ACTDOM[k],base:k==="spy"?BAL.spyBase:null,o:actOdds(S,v,k)}}
  if(d.o!=null&&b.classList.contains("opt")&&typeof popIdx!=="undefined"&&popIdx!=null){const p=curPeople()[popIdx];const opts=talkOpts(p);const a=opts[+d.o];if(!a||a.o==null||a.o>=100)return null;
   const F=a.why?a.why():whyDiff(()=>{const x=talkOpts(p).find(y=>y.n===a.n);return x?x.o:null},[[S,S],[p.ref||null,p.ref||null]]);return{F,dom:a.dom,base:a.why?BAL.spyBase:null,o:a.o}}
  if(d.m!=null&&Q[0]&&Q[0].opts){const a=Q[0].opts[+d.m];if(a&&a.why)return{F:a.why(),dom:a.dom,base:a.base!==undefined?a.base:BAL.spyBase,o:a.o}}
  if(d.i!=null&&typeof deck!=="undefined"){const a=deck[+d.i];if(!a||a.o==null||a.o>=100)return null;return{F:a.why?a.why():[],dom:a.dom,o:a.o,deck:1}}}catch(e){console.error(e)}return null}
/* spy knowledge of the target (spyKnowB, jtruth; odA adds it inside actCtx): a factor line on "Vì sao" (review r1 of shown-odds-one-path);
   the step = actOdds with the knowledge minus without it, so the line never claims more than the roll gets */
function whyKnow(v,k){try{const K=S.know||{},kk=key(v);if(K[kk]==null||!spyKnowB(S,v))return[];const o0=actOdds(S,v,k);const w=K[kk];delete K[kk];let o1;try{o1=actOdds(S,v,k)}finally{K[kk]=w}
 return o0!=null&&o1!=null&&o0!==o1?[["Đã dò la, biết giờ giấc của nàng",o0-o1]]:[]}catch(e){return[]}}
function kitWhyHtml(b,lv){const W=whyOfBtn(b);if(!W)return"";const q=lotB(S,W.dom);const word=KIT_ODDS[lv]||"";
 const F=W.F.filter(x=>Math.abs(x[1])>=1||/Tự tay/.test(x[0])).sort((x,y)=>Math.abs(y[1])-Math.abs(x[1]));
 const row=(t,p)=>`<div class="kpopx"><span class="ef ${p>0?"g":p<0?"r":"n"}">${t}${p?": "+whyStep(p):""}</span></div>`;
 let h=`<div class="kpopt">Vì sao ${word}?</div>`;if(W.base!=null)h+=row(`Việc này vốn: ${word_(W.base)}`,0);
 h+=F.map(x=>row(x[0],x[1])).join("");if(q)h+=row("Quẻ tuần",q);
 if(!F.length&&!q)h+=row(W.deck?"Cơ may của việc này không đổi theo tư chất: chỉ Quẻ tuần và Sức mới làm khác đi":"Không có yếu tố nào làm dễ hay khó hơn",0);
 return h}
function word_(o){return word(oddsCl(Math.round(o)))}
document.addEventListener("click",e=>{const od=e.target.closest(".kodm");if(!od)return;const b=od.closest("button");if(!b)return;const lv=+od.dataset.kodds;
 const h=kitWhyHtml(b,lv);if(!h)return;e.stopPropagation();e.preventDefault();setTimeout(()=>kpPop(od,h+`<div class="kpwl">${kitOddsLadder(lv)}</div>`),0)},true);
/* act-audit fix: the odds word on a consort-act card left out the penalty of sending a servant (runAct: ACTX.pen = sentPen − rank×3),
   so the card read easier than the roll. Her cards now show the odds the roll will use (spy has it inside its own formula). */
const WHY_NOSEND=["accuse","vp","gift","steal","road","takeaway","spy"];
function sentPenNow(a,t,k){return WHY_NOSEND.includes(k)?0:actCtx(a,t,k).pen}/* the pen runAct uses (actCtx, j9: one no-send list) */
(function(){for(const k in ACT){const A=ACT[k];if(!A||typeof A.o!=="function"||k==="spy")continue;const o0=A.o;
 A.o=function(a,t){const o=o0.apply(this,arguments);if(o==null||a!==S||!t||ACTX.a||o>=100)return o;const p=sentPenNow(a,t,k);return p?oddsCl(o-p):o};
 if(!A.why)A.why=function(a,t){const F=whyDiff(()=>o0(a,t),[[a,a],[t,t]]);const p=sentPenNow(a,t,k);if(p){const sv=bestSent(a);F.push([sv?`Phải sai ${sv.name} đi, không tận mắt`:"Không có kẻ hầu đáng tin để sai đi",-p])}return F}}})();
