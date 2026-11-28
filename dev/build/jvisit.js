/* ================= jvisit: NGỰ GIÁ LÂM CUNG — the Emperor comes to HER palace and stays the night (owner OD:L603, review/emperor-visit) =================
   PRIORITY RULE #1: this is the existing event "empnight" (j7: "Hoàng thượng đứng ngoài rèm cửa cung ngươi … Thắp đèn hầu rượu"), not a second event.
   Before: empnight sat in the generic event pool (Sủng ≥ 20, at most once a year, the same weight whatever her favour), and its night went through
   the Kính sự phòng prep (bath, wrapped in the quilt, carried to Dưỡng Hòa điện) and gave a normal night only.
   Now:
   1. The visit is its own daily roll after the tablet flip: visCh(p) = BAL.visit (base + slope × (Sủng − minSung) + anK × Ân tình) × his nature
      (đa tình / lạnh lùng), capped; rare at low favour, more often at high favour; none within BAL.visit.gap days of the last one, none while she
      is pregnant, in lãnh cung, already has tonight, or he is gravely ill; one night per day (j75 ntTake through nightScene). empnight leaves the pool.
   2. "Thắp đèn hầu rượu": he stays in HER palace — the night cards are the normal night (j8 night1 → night2 → nightFx, BAL.night) with the visit's
      own opening (no bath, no quilt); then on top: Sủng / Danh, every consort's jealousy, the consort whose tablet he left (ghen, quý ngươi −),
      the Hoàng hậu displeased, and the Thái hậu displeased by chance (her archetype, jtrong TH_ARCH.neg) for breaking the Kính sự phòng custom,
      scaled by her trọng (DEED.empvisit offends Lễ). The night's own closing card (jne kitNightEnd, KIT §62/§81) shows the whole night before → after with these extras, and the visit caption (r1: no second modal).
      "Khuyên ngài giữ long thể" is the safe road: Đức, the Thái hậu pleased, a little Sủng lost. "Phô tài" stays as it was.
   3. Co-op: the Emperor is a world person, so ONLY the host rolls (jmort host()), for both seats (her and the friend entry), one visit a day.
      The result is written into the world (S.emp.visit = {w day, pid}); the visited seat plays the card (the guest after the merged week arrives),
      the other seat gets a news line. Numbers: BAL.visit (jbal2). Kit: the existing event card / night cards / modal button only (no new part). */
(function(){if(typeof PEND!=="object"||!EVI||!EVI.empnight)return;const B=()=>BAL.visit;
const cw=()=>!!(window.COOPW&&COOPW.on),host=()=>!cw()||COOPW.seat==="a",myPid=()=>cw()?(COOPW.seat==="a"?901:902):0;
const day=()=>typeof wk==="function"?wk():(S.turn*3+(S.tuan||0));
try{DEED.empvisit={"Lễ":-1}}catch(e){}
/* the generic pool no longer draws it: the daily roll below decides */
EVI.empnight.ok=()=>false;
/* the daily % for one person (her S or the co-op friend entry) */
function visCh(p){const V=B();if(!p||p.dead||p.alive===false||p.out||p.preg||(p.sung||0)<V.minSung)return 0;
 const an=p===S?(S.an||0):(p.an||0);let c=V.base+V.slope*((p.sung||0)-V.minSung)+V.anK*an;
 try{if(has("datinh"))c*=V.datinh;else if(has("lanhlung"))c*=V.lanhlung}catch(e){}return Math.max(0,Math.min(V.cap,c))}
function empOk(){const V=B();if(!S||S.dead||S.mg)return false;const i=S.emp&&S.emp.ill;if(i&&(i.st||0)>=V.illSt)return false;
 const L=S.emp&&S.emp.visit;if(L&&day()-L.w<V.gap)return false;if(S.visW!=null&&day()-S.visW<V.gap)return false;return true}
/* the night already taken today blocks a visit, unless it is only the tablet's pick: the Emperor leaves the tablet for her (that consort loses it) */
function ntOther(){const n=typeof ntTaken==="function"?ntTaken():null;if(!n)return null;const t=S.tonight&&S.tonight!=="me"?S.tonight:null;return t&&n.who===t.id?null:n}
/* her own tablet tonight does not stop him: he comes himself instead of the sedan (the Kính sự phòng card goes) */
function meOk(){let cy=false;try{cy=typeof cyTray==="function"&&!!cyTray(S)}catch(e){}return !S.out&&!S.preg&&!cy&&!ntOther()}
function showFor(now){const t=S.tonight&&S.tonight!=="me"?S.tonight:null,mine=S.tonight==="me";S.visW=day();
 if(mine)for(let i=Q.length-1;i>=0;i--)if(Q[i]&&Q[i].pid==="ksp")Q.splice(i,1);
 const d=mkP("empnight",{v:t&&t.id!=null?t.id:null,mine:mine?1:0});if(d){pushDil(d,"Ngự giá lâm cung");/* he is at her door tonight: never held / dropped by the event pacing gate (j68 evGate) */const m=Q.find(x=>x&&x.pid==="empnight"&&!x.must);if(m)m.must=1;if(now)try{if($("modal").hidden)showModal()}catch(e){}}}
window.visCh=visCh;
/* AG-ALL-2: one visit = visGo(p) for her, the co-op friend AND an NPC consort; WHO and WHETHER is the Emperor's own evening plan (jagacts2 emp:visit)
   while the loop runs (agDOn); the daily roll below is the old path (loop off) */
window.visOk=function(p){if(!host()||!p)return false;if(p===S)return empOk()&&meOk();if(p.alive===false||p.out)return false;if(p.coop)return empOk();
 /* an NPC consort: his own health, her state, her own gap (p.visW); a night already taken by someone other than the tablet's pick stops him */
 const V=B();if(!S||S.dead||S.mg)return false;const i=S.emp&&S.emp.ill;if(i&&(i.st||0)>=V.illSt)return false;if(p.confined||p.preg)return false;
 if(p.visW!=null&&day()-p.visW<V.gap)return false;return !ntOther()};
window.visGo=function(p){const w=day();
 if(p===S||p.coop){if(S.emp)S.emp.visit={w,pid:p===S?(myPid()||"me"):p.id,nm:p===S?(S.name||""):(p.name||"")};
  S.visN=(S.visN||0)+1;if(p===S){showFor();return"me"}S.visW=w;log(`Đêm nay Hoàng thượng ngự giá đến cung ${p.name}, nghỉ lại đến sáng.`);return"friend"}
 /* an NPC consort: the tablet's night is hers (the one flip / resolveTonight → rivalNight path), plus the visit's own Sủng / Danh (BAL.visit, as hers) */
 const V=B();const lost=S.tonight&&S.tonight!=="me"&&S.tonight!==p?S.tonight:null;if(S.tonight==="me")return"";p.visW=w;S.tonight=p;S.visNpc={w,id:p.id};ap(p,{sung:V.sung,danh:V.danh});
 if(lost&&lost.alive){ghenUp(lost,V.lostGhen,`mất đêm thẻ bài vì Hoàng thượng ngự giá đến cung ${p.name}`,p);relAdd(p,lost,-V.lostRel)}
 log(`Đêm nay Hoàng thượng ngự giá đến cung ${p.name}, nghỉ lại đến sáng.`);return"npc"};
window.visRoll=function(){if(!host()||!empOk())return"";if(window.agDOn&&agDOn())return"";const L=[];if(meOk())L.push(S);
 if(cw()){const f=(rivals||[]).find(v=>v&&v.coop&&v.alive!==false&&!v.out);if(f)L.push(f)}
 L.sort(()=>Math.random()-.5);for(const p of L){if(!roll(window.visCh(p)))continue/* jpdist wraps window.visCh (palace distance) */;return visGo(p)}return""};
/* after the tablet flip of each day (j8 flip, wrapped by j55 / j75) */
(function(){const f0=flip;flip=function(){const r=f0.apply(this,arguments);try{const n=S&&S.visNpc;if(n&&n.w===day()&&S.tonight!=="me"){const v=(rivals||[]).find(x=>x&&x.id===n.id&&x.alive&&!x.out);if(v)S.tonight=v}}catch(e){}try{if(S&&!S.dead)visRoll()}catch(e){console.error("visit",e)}return r}})();
/* co-op: the seat the host chose plays its card when the merged world arrives; the other seat reads the news */
function coopSeen(){if(!cw()||host()||!S||S.dead||Q.length||S.mg)return;const v=S.emp&&S.emp.visit;if(!v||S.visSeen===v.w)return;S.visSeen=v.w;
 if(v.pid===myPid()){if(meOk())showFor(1)}else log(`Đêm qua Hoàng thượng ngự giá đến cung ${v.nm||"hảo hữu"}, nghỉ lại đến sáng.`)}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{coopSeen()}catch(e){}return r}})();
/* the card: same event, same words; the night road now really is a visit */
const p0=PEND.empnight;
function thDispl(){const V=B();if(S.thDead||!S.thO)return{p:0,loss:0};let neg=0;try{neg=thArch().neg||0}catch(e){}
 let m=1;try{m=trongMul("th",DEED.empvisit)}catch(e){}return{p:Math.max(0,V.thP+neg*V.thNeg),loss:Math.max(1,Math.round(V.thLoss*(2-m)))}}
PEND.empnight=function(p){p=p||{};const V=B(),d=p0.call(this,Object.assign({o:od(V.show.o+bestArt().w*V.show.w+mm())},p));if(!d||!d.o)return d;
 const lost=p.v!=null?(rivals||[]).find(x=>x&&x.id===p.v&&x.alive):null,T=thDispl(),q=typeof queenP==="function"?queenP():null;
 if(lost)d.t+=`<br>Thẻ bài đêm nay lật tên ${lost.name}, vậy mà ngài lại đến đây.`;
 const mine=!!p.mine&&S.tonight==="me";if(mine)d.t+="<br>Thẻ bài đêm nay lật tên ngươi; chưa đợi kiệu đến đón, ngài đã tự tìm đến.";
 /* the roads that send him away give up her tablet night too (said on the card) */
 if(mine)for(const o of d.o){if(/^Thắp đèn hầu rượu/.test(o.n||""))continue;o.x=(o.x?o.x+" · ":"")+"kèm: nhường đêm thẻ bài hôm nay";const g0=o.go;o.go=function(){S.tonight=null;return g0?g0.apply(this,arguments):undefined}}
 const a=d.o.find(o=>/^Thắp đèn hầu rượu/.test(o.n||""));
 if(a){a.x=`ngài nghỉ lại cung ngươi đến sáng · thành: đêm thị tẩm, thêm Sủng +${V.sung}, Danh +${V.danh} · kèm: phi tần ghen +${ghenN(V.ghen)}${lost?`, ${lost.name} ghen +${V.lostGhen}, quý ngươi ${affSg(lost,S,-V.lostRel)}`:""}${q&&q!==S?`, Hoàng hậu quý ngươi ${balSg(spSee("hh",-V.hh))}`:""}${T.p?` · kèm: Thái hậu phật ý vì ngài bỏ lệ Kính sự phòng, Thái hậu quý ngươi -${T.loss}: ${chanceW(T.p)}`:""}`;
  a.hint=lv=>`ngài nghỉ lại cung ta, được sủng ái và danh tiếng hơn đêm thường; nhưng phi tần ghen${lv>=1?(lost?`, ${lost.name} mất đêm mà oán`:"")+(T.p?", Thái hậu có thể phật ý":""):""}`;a.risk="có rủi ro";
  /* r1: keep the locks other modules put on this road (jcycle: her monthly days) — the cycle test caught them dropped */
  {const lk0=a.lk;a.lk=()=>{const n=ntOther();if(n)return `Đêm nay Hoàng thượng đã ở cung ${n.who==="me"?"ngươi":n.nm}`;return typeof lk0==="function"?lk0():(lk0||"")}}
  a.go=()=>{if(lost&&S.ntk&&S.ntk.who===lost.id)S.ntk=null;S.visNight=day();S.visLost=lost?lost.id:null;S.visQ=q&&q!==S?1:0;nightScene();
   if(Q[0]&&Q[0].pid==="prep"&&S.tonight==="me"){const n=mkP("vnight",{q:V.q});if(n)Q[0]={t:"Ngự giá lâm cung",h:n.t,opts:n.o,who:n.who,pid:n.pid,pp:n.pp}}else S.visNight=null}}
 const c=d.o.find(o=>/^Khuyên ngài giữ long thể/.test(o.n||""));
 if(c){c.fx={duc:V.adviseDuc,sung:-V.adviseSung};if(!S.thDead)c.fx.th=V.adviseTh;c.x=`ngài về Dưỡng Hòa điện nghỉ${S.thDead?"":" · Thái hậu nghe tin, khen ngươi biết giữ lễ"}`;
  c.hint=lv=>`giữ lễ, được tiếng hiền${lv>=1&&!S.thDead?", Thái hậu hài lòng":""}; nhưng bệ hạ hơi cụt hứng`;c.risk="an toàn"}
 return d};
/* the visit's night: the normal night cards (BAL.night), its own opening — no bath, no quilt */
PEND.vnight=function(p){const d=PEND.night1({q:(p&&p.q)||B().q,vp:0});if(!d)return d;const E=S.emp;
 d.t=`<p>Cung nhân lui cả ra ngoài. Hoàng thượng cởi áo choàng, tự tay khép cửa, ngồi xuống bên án của ngươi.</p><p>Ngọn đèn ngươi vừa thắp soi chén rượu ấm${E&&E.mood>=2?"; ngài có vẻ mệt mỏi":""}. Đêm nay ngài nghỉ lại nơi này.</p>`;return d};
/* the visit's extras, once, right after the night itself (nightFx) */
(function(){const n0=nightFx;nightFx=function(s){const vis=S&&S.visNight!=null&&day()-S.visNight<=1;const r=n0.apply(this,arguments);
 if(vis)try{S.visNight=null;visAfter()}catch(e){console.error("visit after",e)}return r}})();
function visAfter(){const V=B();const L=[sgStat(V.sung),`Danh +${V.danh}`];apply({sung:V.sung,danh:V.danh});ghenAll(V.ghen,"Hoàng thượng ngự giá đến cung ngươi");const P=[`Hậu cung hay tin ngài nghỉ lại cung ngươi: phi tần ghen +${ghenN(V.ghen)}.`];
 const lost=S.visLost!=null?(rivals||[]).find(x=>x&&x.id===S.visLost&&x.alive):null;S.visLost=null;
 if(lost){ghenUp(lost,V.lostGhen,"mất đêm thẻ bài vì Hoàng thượng ngự giá đến cung ngươi",S);const d=affGot(lost,S,()=>relAdd(S,lost,-V.lostRel));P.push(`${lost.name} mất đêm thẻ bài đã lật: ghen +${V.lostGhen}, quý ngươi ${balSg(d)}.`)}
 if(S.visQ){S.visQ=0;const dq=affGot(queenP(),S,()=>apply({hh:-V.hh}));P.push(`Hoàng hậu phật ý: quý ngươi ${balSg(dq)}.`)}
 const T=thDispl();/* NPC-PURPOSE G3: the news reaches her through someone — the one who lost the night or another who resents the player (npcTell); nobody → she does not hear */
  const tl=T.p?npcTell(S,{from:(lost?[lost]:[]).concat(liveRivals(true).filter(x=>x!==lost)),to:S.thO||{}}):null;
  if(tl&&roll(T.p)){apply({th:-T.loss});P.push(`Thái hậu nghe ${npwNm(tl.who)} kể, phật ý vì ngài bỏ lệ Kính sự phòng: Thái hậu quý ngươi -${T.loss}.`);try{trongLearn("th",DEED.empvisit,"Ngự giá lâm cung")}catch(e){}}
 else if(tl)P.push(`Thái hậu nghe ${npwNm(tl.who)} kể, không nói gì.`);
 log(`Ngự giá lâm cung: ${L.join(" · ")}. ${P.join(" ")}`);
 /* review r1: no second card. The night's own closing card (jne kitNightEnd, KIT §62 + §81 kit button) already shows the whole night
    before → after (Được / Mất / Kèm rows, real numbers incl. these extras, applied inside nightFx); it gets the visit's caption. */
 S.visMorn=day()}
window.kneLineHook=function(){if(S&&S.visMorn!=null&&day()-S.visMorn<=1){S.visMorn=null;return "Hoàng thượng nghỉ lại tới sáng mới lên triều; cả hậu cung đều hay."}return ""};
window.visAfter=visAfter;
})();
