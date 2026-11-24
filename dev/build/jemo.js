
/* ================= jemo: CẢM XÚC — một thanh tâm trạng cho mọi người (dev/EMOTION_PLAN.md) =================
   Everyone (her, consorts, servants, Hoàng thượng, Thái hậu, officials, men, children) carries p.emo = {k, v, t, why, w}:
   k = one of EMO keys, v = strength 0–100, t = key of the person it is aimed at (anger / jealousy / scheming), why = true cause, w = week set.
   Causes: real changes read each tuần (rank up/down, child born/lost, punished, lãnh cung, thị tẩm, neglect, illness, deaths of friends/foes)
   + direct hooks (oán gained, kindness/gifts received). The SAME event lands differently by personality (EMO_TR, j28 traits).
   Effects (one rule for everybody, her included): NPC act weights (persW), danger toward the person she is angry with, odds of every
   act through odA (a little), the Emperor's tablet chance (nightCh), servants' Lòng each month, motive gate j95 (motiveOK, lazily wrapped
   when present: "vì đang giận …"). Fog: her own always shown; others only when she has seen them lately / has tai mắt; else "chưa rõ".
   Badge: the painted seal img/kit/emo-<k>.webp drawn by pcPort on every frame size (KIT.md 31). Off switch for measuring: window.__emoOff=1.
   ===================================================================================================================== */
/* the short jealous FEELING has its own name (owner OD 17/11 ~18:38Z "Dùng từ chạnh lòng được á"); the long-term SCORE v.ghen keeps "Ghen". Rename = this one line (VANPHONG). */
const EMO_GHEN="Chạnh lòng";
const EMO={vui:"Vui",binh:"Bình thường",buon:"Buồn",gian:"Giận",so:"Sợ",ghen:EMO_GHEN,lo:"Lo âu"};/* FEELINGS-18 (owner OD 17/11 ~19:10Z): the full 18-kind set, levels, heavy names and the old-key conversion live in jfeel.js (FEEL_N, BAL.feel); Toan tính is an intent there, Đau khổ = Buồn at the heavy level */
/* default reaction of an event: [emotion, strength]; null = no feeling */
const EJ=()=>BAL.eff.jemo;/* jemo-bal: every jemo number reads here */
const EMO_EV=JSON.parse(JSON.stringify(BAL.eff.jemo.ev));/* jemo-bal: BAL.eff.jemo.ev (jbaleff); a copy, jfeel adds its rows at load */
/* personality filter: trait → event → [emotion, ×strength] (null emotion = shrugs it off) */
const EMO_TR=JSON.parse(JSON.stringify(BAL.eff.jemo.tr));/* jemo-bal: BAL.eff.jemo.tr; a copy (jfeel merges its rows into it at load) */
/* decay per tuần (points); trait multipliers per emotion */
const EMO_DECAY=Object.assign({},BAL.eff.jemo.decay);/* jemo-bal: BAL.eff.jemo.decay (jmoodknow zeroes this copy at load: causes end by khắc) */
const EMO_DK=JSON.parse(JSON.stringify(BAL.eff.jemo.dk));
/* EFFECTS. persW multipliers at full strength (v=100); scaled linearly by v/100 */
const EMO_HARM=["poison","kpoison","frame","kframe","plant","musk","catswap","pushp","provoke","humiliate","rumor","trip","accuse","block","steal","vp","pond","ksab","takeaway","bribe","spy","punish"];
const EMO_KIND=["help","visit","warn","mediate","apologise","ally","gift","reward","pardon","serveTH"];
const EMO_W={};/* ONE CORE (emo-balance): every kind's act weights live in BAL.feel.w (jfeel) + BAL.emo2.w (jmoodknow), copied in at load *//* the old Toan tính weights are the INTENT weights now (BAL.feel.intent.w, jfeel) */
/* odds of any act by the doer's mood (points at v=100; "a little") */
const EMO_OD={};/* BAL.feel.odAll (jfeel) + BAL.emo2.od */
/* the Emperor's tablet chance by her mood */
const EMO_NIGHT=Object.assign({},BAL.eff.jemo.night);/* v3: her own mood no longer moves the tablet (it fed a happy → more nights loop); only the Emperor's feelings do */
/* servants' Lòng per month by their own mood */
const EMO_LOY={};/* BAL.feel.loy (jfeel) + BAL.emo2.loy */
const EMO_N={set:0,ev:{},motive:0,motiveGate:0,odds:0,kinds:{}};
function emoOn(){return !!(typeof S!=="undefined"&&S&&!window.__emoOff)}
/* ---------- who ---------- */
function emoRes(p){if(!p)return null;if(p.__kp)p=p.__kp;if(p.kind&&!p.name&&typeof p.kind==="string"){if(p.kind==="emp")return S.emp;if(p.kind==="th")return emoTH();if(p.kind==="maid")return S.maid;return p.ref||null}
 if(p.kind==="th"||p===S.thO)return emoTH();return p}
function emoTH(){S.thO=S.thO||{};return S.thO}
function emoKey(p){if(!p)return"";if(p===S)return"me";if(S.emp&&p===S.emp)return"emp";if(p===S.thO)return"th";if(p.id!=null)return String(p.id);if(p.sid!=null)return"s"+p.sid;return emoRegKey(p)}
/* r1 fix (review/kit-figure-mood): people with no id / sid (maid, ma ma, any NPC) get a registered key, so the tap on their seal resolves in emoByKey (it was a silent dead tap) */
const EMOX=new Map(),EMOXK=new WeakMap();let EMOXN=0;function emoRegKey(p){let k=EMOXK.get(p);if(!k){k="x"+(++EMOXN);EMOXK.set(p,k)}EMOX.set(k,p);if(EMOX.size>600)EMOX.delete(EMOX.keys().next().value);return k}
function emoByKey(k){if(k==="me")return S;if(k==="emp")return S.emp;if(k==="th")return emoTH();const v=(rivals||[]).find(x=>String(x.id)===String(k));if(v)return v;
 if(/^s\d+$/.test(k)){try{const q=allServ().find(s=>"s"+s.sid===k);if(q)return q}catch(e){}}
 const m=(S.men||[]).find(x=>String(x.id)===String(k));if(m)return m;return EMOX.get(String(k))||null}
function emoName(p){if(!p)return"";if(p===S)return"ngươi";if(p===S.emp)return"Hoàng thượng";if(p===S.thO)return"Thái hậu";return p.name||""}
function emoTraits(p){try{if(p===S.thO)return traitsOf("th");return traitsOf(p)}catch(e){return[]}}
function emoGet(p){p=emoRes(p);if(!p)return{k:"binh",v:0};const e=p.emo;if(!e||!EMO[e.k]||e.v<EJ().floor)return{k:"binh",v:0,why:""};return e}
/* ---------- set: a stronger feeling replaces a weaker one; the same feeling adds up ---------- */
function emoSet(p,k,v,why,t){if(!emoOn())return;p=emoRes(p);if(!p||!EMO[k]||!(v>0))return;v=Math.round(cl(v,0,100));const e=p.emo;
 if(e&&EMO[e.k]&&e.v>=EJ().floor&&e.k===k){e.v=cl(Math.round(e.v+v*EJ().stack),0,100);e.why=why||e.why;if(t!=null)e.t=t;e.w=emoW();EMO_N.set++;emoSync(p);return}
 if(e&&EMO[e.k]&&e.v>=EJ().floor&&e.v>v)return;
 p.emo={k,v,why:why||"",t:t==null?null:t,w:emoW()};EMO_N.set++;EMO_N.kinds[k]=(EMO_N.kinds[k]||0)+1;emoSync(p)}
function emoW(){try{return wk()}catch(e){return 0}}
/* an event filtered by personality */
function emoEv(p,ev,why,t,scale){if(!emoOn())return;p=emoRes(p);if(!p)return;const d=EMO_EV[ev];if(!d)return;let k=d[0],v=d[1]*(scale||1);
 for(const tr of emoTraits(p)){const o=EMO_TR[tr]&&EMO_TR[tr][ev];if(o){if(o[0]===null)return;k=o[0];v*=o[1]}}
 EMO_N.ev[ev]=(EMO_N.ev[ev]||0)+1;emoSet(p,k,v,why,["gian","ghen","hon"].includes(k)?t:null)}
/* legacy mood bars stay in step: S.emp.mood (0 vui,1 bình,2 phiền,3 giận) and jcmood th/hh */
function emoLv(k){const g=typeof feelGrp==="function"?feelGrp(k):k;return g==="vui"?0:g==="gian"?3:typeof feelBad==="function"?(feelBad(k)?2:1):["buon","so","lo","ghen"].includes(g)?2:1}
function emoSync(p){try{if(p===S.emp&&p.emo&&p.emo.v>=EJ().legSync){p.mood=emoLv(p.emo.k);p.__emoMood=p.mood}if(p===S.thO&&S.cm&&S.cm.th&&p.emo&&p.emo.v>=EJ().legSync){S.cm.th.lv=emoLv(p.emo.k);S.cm.th.why=p.emo.why;p.__emoLv=S.cm.th.lv}}catch(e){}}
/* the Emperor's / Thái hậu's OLD 4-step bars (S.emp.mood, S.cm.th.lv: 0 vui · 1 bình · 2 phiền · 3 giận) are still written by court code; a change
   lands as ONE cause in the full set (FEELINGS-18: "phiền" = Khó chịu, not Buồn); the seal itself never reads the old bar (kitEmotion). */
const EMO_LEG=["vui","binh","khochiu","gian"];
function emoFromLegacy(){try{const E=S.emp;if(E&&E.mood!=null&&E.mood!==E.__emoMood){E.__emoMood=E.mood;const k=EMO_LEG[E.mood]||"binh";
  if(k==="binh"){if(E.emo&&E.emo.v<EJ().legV)E.emo=null}else{const ex=E.emo;if(!ex||ex.k!==k)E.emo={k,v:EJ().legV,why:k==="vui"?"long thể khoan khoái":k==="gian"?"việc trong cung làm ngài phật ý":"việc triều đè nặng",t:null,w:emoW()}}}
 const C=S.cm;if(C&&C.th&&!S.thDead){const th=emoTH();if(C.th.lv!==th.__emoLv){th.__emoLv=C.th.lv;const k=EMO_LEG[C.th.lv]||"binh";if(k==="binh"){if(th.emo&&th.emo.v<EJ().legV)th.emo=null}else th.emo={k,v:EJ().legV,why:C.th.why||"",t:null,w:emoW()}}}}catch(e){}}
/* ---------- the week: read what really changed ---------- */
function emoPeople(){const L=[S];for(const v of rivals||[])if(v.alive)L.push(v);return L}
function emoSnap(p){let kids=0,kidsAll=0;for(const k of p.kids||[]){kidsAll++;if(k.alive)kids++}return{r:rkOf(p),out:!!p.out,conf:(p.confined||0)>0,kids,kidsAll,n:(p.nightLog||[]).length+(p===S?(S.nights||0):(p.nights||0)),sung:p.sung||0,suc:p.suc||0,alive:p===S?!S.dead:!!p.alive}}
function emoWeek(){if(!emoOn())return;const W=emoW();S.emoSnap=S.emoSnap||{};const P=emoPeople();
 /* decay */
 const decay=p=>{const e=p&&p.emo;if(!e||!EMO[e.k])return;let d=EMO_DECAY[e.k]||EJ().decayDef;for(const t of emoTraits(p)){const m=EMO_DK[t]&&EMO_DK[t][e.k];if(m)d*=m}e.v=Math.max(0,Math.round(e.v-d));if(e.v<EJ().floor)p.emo=null};
 for(const p of P)decay(p);decay(S.emp);decay(S.thO);for(const p of P)for(const s of p.staff||[])decay(s);if(S.maid)decay(S.maid);for(const [k] of (typeof allKids==="function"?allKids():[]))decay(k);for(const m of S.men||[])decay(m);
 if(S.court)for(const c in S.court)decay(S.court[c]);
 emoFromLegacy();
 const others=p=>P.filter(x=>x!==p);
 for(const p of P.concat((rivals||[]).filter(v=>!v.alive))){const k=emoKey(p),o=S.emoSnap[k],n=emoSnap(p);S.emoSnap[k]=n;if(!o)continue;const nm=emoName(p);
  if(!n.alive&&o.alive){for(const x of others(p)){const a=aff(x,p),oa=oan(x,p);if(a>=EJ().wk.friend)emoEv(x,"friendDie",`${nm} qua đời`);else if(oa>=EJ().wk.foeOan||a<=EJ().wk.foeAff)emoEv(x,"foeDie",`${nm} qua đời`)}continue}
  if(!n.alive)continue;
  if(n.r>o.r){emoEv(p,"selfUp",`được tấn phong ${typeof rkName==="function"?rkName(p):""}`.trim());for(const x of others(p)){const a=aff(x,p);if(a>=EJ().wk.upFriend)emoEv(x,"friendUp",`${nm} được tấn phong`);else if(a<EJ().wk.upRival)emoEv(x,"rivalUp",`${nm} được tấn phong`,emoKey(p))}}
  if(n.r<o.r&&!n.out){emoEv(p,"selfDown","bị giáng phẩm");for(const x of others(p))if(oan(x,p)>=EJ().wk.downOan||aff(x,p)<=EJ().wk.downAff)emoEv(x,"foeDown",`${nm} bị giáng`)}
  if(n.out&&!o.out){emoEv(p,"cold","bị đày vào lãnh cung");for(const x of others(p))if(oan(x,p)>=EJ().wk.downOan||aff(x,p)<=EJ().wk.downAff)emoEv(x,"foeDown",`${nm} vào lãnh cung`)}
  if(n.conf&&!o.conf)emoEv(p,"punished","bị cấm túc");
  if(n.kidsAll>o.kidsAll){emoEv(p,"kidBorn","mẹ tròn con vuông");for(const x of others(p))if(aff(x,p)<EJ().wk.kidAff)emoEv(x,"otherKid",`${nm} sinh hạ hoàng tự`,emoKey(p))}
  if(n.kids<o.kids-(n.kidsAll-o.kidsAll)||(n.kids<o.kids&&n.kidsAll===o.kidsAll))emoEv(p,"kidDie","mất con");
  if(n.n>o.n&&!(n.kidsAll>o.kidsAll)){emoEv(p,"night","được Hoàng thượng lật thẻ");if(S.emp&&((p===S?S.lastNightS:p.lastNightS)||0)>=EJ().wk.fondN)S.emp.emoFond={k:emoKey(p),w:W};for(const x of others(p))if(aff(x,p)<EJ().wk.nightAff&&emoTraits(x).includes("Nóng nảy"))emoEv(x,"rivalUp",`${nm} được thị tẩm`,emoKey(p),EJ().wk.nightK)}
  if(n.sung<=o.sung-EJ().wk.neglect)emoEv(p,"neglect","Hoàng thượng lạnh nhạt");
  if(n.suc<EJ().wk.ill&&o.suc>=EJ().wk.ill)emoEv(p,"ill","sức khỏe sa sút")}
 /* servants: by their mistress and by their own Lòng */
 for(const p of P){const e=emoGet(p),tp=S.emoSnap[emoKey(p)];for(const s of p.staff||[]){const k="s"+s.sid,o=S.emoSnap[k],l=s.loyal||0;S.emoSnap[k]={l};
   if(o&&o.l!=null){if(l>=o.l+EJ().wk.loyD)emoEv(s,"loyalUp","được chủ đối đãi tử tế");else if(l<=o.l-EJ().wk.loyD)emoEv(s,"loyalDown","bị chủ hắt hủi")}
   if(e.w===W&&e.v>=EJ().wk.mistress){if(["vui"].includes(e.k))emoEv(s,"mistressUp",`chủ nhân ${e.why||"vui"}`);else if((typeof feelBad==="function"?feelBad(e.k):["so","buon","lo"].includes(e.k))&&/giáng|lãnh cung|cấm túc|mất con/.test(e.why||""))emoEv(s,"mistressDown",`chủ nhân ${e.why}`);
    else if(e.k==="gian"&&npwPick(["so","calm"],q=>emoFearW(s,e,q))==="so")emoSet(s,"so",EJ().wk.fearV,"chủ nhân đang nổi giận")/* npc-purpose G2c: a timid / unloved servant fears her angry mistress; a trusted one does not */}}}
 if(S.maid){const e=emoGet(S);if(e.w===W&&e.v>=EJ().wk.mistress&&e.k==="vui")emoEv(S.maid,"mistressUp",`chủ nhân ${e.why||"vui"}`);else if(e.w===W&&/giáng|lãnh cung|cấm túc|mất con/.test(e.why||""))emoEv(S.maid,"mistressDown",`chủ nhân ${e.why}`)}
 /* children: by their mother */
 try{for(const [k,mo] of allKids()){if(!k.alive)continue;const m=mo||S;const mk="k:"+emoKey(m)+":"+(k.name||""),o=S.emoSnap[mk];const n={d:m===S?!!S.dead:!m.alive,c:!!m.out};S.emoSnap[mk]=n;
  if(o&&n.d&&!o.d)emoEv(k,"motherDie","mẫu thân qua đời");else if(o&&n.c&&!o.c)emoEv(k,"motherCold","mẫu thân vào lãnh cung");else if(!k.emo){const o=npcWhy("emoKid",{p:k,m,W});if(o)emoSet(k,"vui",EJ().wk.kidV,o.why)}/* npc-purpose G2c: a child is glad for a real reason (mother glad, siblings, pets) */}}catch(e){}
 /* officials: their house's daughters rise and fall */
 try{if(S.court)for(const c in S.court){const of=S.court[c];if(!of||!of.name)continue;if(!of.emo){const x=npwPick(emoOffCauses(of,W),y=>y.s);if(x&&roll(BAL.ag.why.emo.ofP))emoSet(of,x.k,EJ().wk.offV,x.why)}/* npc-purpose G2c: the Emperor's temper, the patron she serves */}}catch(e){}
 for(const m of S.men||[]){if(!m.alive)continue;const mk="mn:"+m.id,o=S.emoSnap[mk],n={t:m.tinh||0,l:m.letters||0,y:m.trysts||0};S.emoSnap[mk]=n;if(m.emo||!o)continue;const x=npwPick(emoManCauses(m,o,n),y=>y.s);if(x)emoSet(m,x.k,EJ().wk.manV,x.why)}/* npc-purpose G2c: his mood follows what really passed between him and her */
 /* the Emperor grieves a lost child and rejoices at a birth (one rule: same as anyone's child) */
 try{let n=0,a=0;for(const [k] of allKids()){a++;if(k.alive)n++}const o=S.emoSnap.empK;S.emoSnap.empK={n,a};if(o){if(a>o.a)emoSet(S.emp,"vui",EJ().emp.born,"mừng có hoàng tự");if(n<o.n-(a-o.a))emoSet(S.emp,"buon",EJ().emp.lost,"thương xót hoàng tự yểu mệnh")}}catch(e){}}
/* ---------- direct hooks: a slight (oán) and a kindness (thiện cảm) land at once ---------- */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){const r=o0.apply(this,arguments);try{if(emoOn()&&n>=EJ().hook.oanMin&&x&&y&&x!==y)emoEv(x,"slight",`bị ${emoName(y)} làm nhục`,emoKey(y),cl(n/EJ().hook.div,EJ().hook.lo,EJ().hook.hi))}catch(e){}return r}})();
(function(){const a0=affAdd;affAdd=function(x,y,n){const r=a0.apply(this,arguments);try{if(emoOn()&&n>=EJ().hook.affMin&&x&&y&&x!==y&&x!==S.emp)emoEv(x,"gift",`được ${emoName(y)} đối đãi tử tế`,null,cl(n/EJ().hook.div,EJ().hook.lo,EJ().hook.hi))}catch(e){}return r}})();
(function(){const k0=kidDie;kidDie=function(k,why,mine){const r=k0.apply(this,arguments);try{if(emoOn()){let mo=mine?S:null;if(!mo)for(const v of rivals||[])if((v.kids||[]).includes(k))mo=v;if(mo)emoEv(mo,"kidDie",`mất ${k.name||"con"}`)}}catch(e){}return r}})();
(function(){const p0=punish;punish=function(p,why,sev){const r=p0.apply(this,arguments);try{const q=typeof p==="string"?S:p;if(emoOn()&&q)emoEv(q,"punished",`bị phạt vì ${typeof p==="string"?p:why}`);if(emoOn()&&q&&S.emp)emoSet(S.emp,"gian",EJ().emp.punish,`phật ý ${emoName(q)}`,emoKey(q))}catch(e){}return r}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)emoWeek()}catch(e){console.error(e)}return r}})();
/* ---------- effects ---------- */
/* Đức + personality brake (owner 11/14): anger/jealousy only raise the WISH to harm; how much of it becomes harm depends on Đức and traits.
   f = share of the emotional harm boost that turns into harm acts. High Đức: 0 (anger turns into withdrawing / confronting words), mid: ½, low: 1,
   low Đức + Xảo quyệt / Tham vọng: 1.5. A severe grudge (oán ≥ 60 toward the target) keeps at least ½ even at high Đức. Same rule for everyone. */
const EMO_BRAKE=BAL.eff.jemo.brake;/* jemo-bal: BAL.eff.jemo.brake */
function emoDuc(p){if(!p)return EMO_BRAKE.ducDef;if(p===S)return S.duc||0;let d=p.duc;if(d==null)d=nv(p,"ducDef");for(const t of emoTraits(p))d+=EMO_BRAKE.soft[t]||0;return d}
function emoBrake(p,t){const d=emoDuc(p),B=EMO_BRAKE;let f=d>=B.hi?B.fHi:d>=B.mid?B.fMid:B.fLo;const T=emoTraits(p);if(d<B.mid&&(T.includes("Xảo quyệt")||T.includes("Tham vọng")))f=B.fBad;
 if(t&&f<B.grudgeF){try{if(oan(p,t)>=B.grudge)f=B.grudgeF}catch(e){}}return f}
function emoMul(p,act){const e=emoGet(p);if(e.k==="binh")return 1;const T=EMO_W[e.k];if(!T)return 1;const harm=EMO_HARM.includes(act);let m=T[act];if(m==null)m=harm?T.harm:EMO_KIND.includes(act)?T.kind:null;if(m==null)return 1;
 if(harm&&m>1){const f=emoBrake(p);m=f>0?1+(m-1)*f:EMO_BRAKE.zero}
 if(act==="idle"&&(e.k==="gian"||e.k==="ghen")&&emoBrake(p)===0)m=BAL.feel.wd;/* high Đức: anger makes her withdraw instead */
 return 1+(m-1)*e.v/100}
(function(){const w0=persW;persW=function(p,act){const w=w0.apply(this,arguments);try{if(emoOn()&&p&&p!==S)return w*emoMul(p,act)}catch(e){}return w}})();
/* anger and jealousy aimed at someone raise the danger toward that person: + v/BAL.feel.dg.div × brake, capped at BAL.feel.dg.cap */
(function(){const d0=danger;danger=function(v,t){const d=d0.apply(this,arguments);try{if(emoOn()&&v&&t){const e=emoGet(v);if((e.k==="gian"||e.k==="ghen"||e.k==="hon")&&e.t!=null&&e.t===emoKey(t)){const f=emoBrake(v,t);if(f>0){const G=BAL.feel.dg;return d+Math.min(G.cap,Math.round(e.v/G.div*f))}}}}catch(e){}return d}})();
(function(){const o0=odA;odA=function(a,b){const r=o0.apply(this,arguments);try{if(emoOn()&&a){const e=emoGet(a);const m=Math.round((EMO_OD[e.k]||0)*e.v/100);if(m){EMO_N.odds++;return oddsCl(r+m)}}}catch(e){}return r}})();
(function(){const t0=odT;odT=function(a,b){const r=t0.apply(this,arguments);try{if(emoOn()&&a){const e=emoGet(a);const m=Math.round((EMO_OD[e.k]||0)*e.v/100);if(m)return oddsCl(r+m)}}catch(e){}return r}})();
(function(){const n0=nightCh;nightCh=function(p){const c=n0.apply(this,arguments);try{p=p||S;if(emoOn()&&c){const e=emoGet(p);let m=EMO_NIGHT[e.k]||1;if(e.k==="buon"&&(S.emp.traits||[]).includes("nhantu"))m=EJ().nightK.nhantu;let x=1+(m-1)*e.v/100;
  /* his own mood: who he is angry with / fond of, and in grief or worry he seeks the gentle ones */
  const E=S.emp.emo,k=emoKey(p);if(E&&E.v>=EJ().floor){if(E.k==="gian"&&E.t===k)x*=1-EJ().nightK.angry*E.v/100;else if(["buon","lo"].includes(E.k)&&emoTraits(p).some(t=>t==="Ân cần"||t==="Khiêm nhường"))x*=EJ().nightK.gentle}
  
  if(x!==1)return Math.max(1,Math.round(c*x))}}catch(e){}return c}})();
function emoMonth(){if(!emoOn())return;for(const p of emoPeople())for(const s of p.staff||[]){const e=emoGet(s);const d=Math.round((EMO_LOY[e.k]||0)*e.v/EJ().loyDiv);if(d)s.loyal=cl((s.loyal||0)+d,0,100)}}
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{emoMonth()}catch(e){}return r}})();
/* motive gate (j95): feelings are a recorded motive. Wrapped lazily so it works whatever the load order. */
/* one answer per question (people ledger, owner 16/11 13:40Z: every act has ONE recorded reason): "sad, wants to be alone" holds for half
   of the friendly acts, chosen by the calendar (life seed + buổi + who + whom + what), not a fresh roll — asking the gate again gives the same answer */
function emoHalf(a,t,kind){const M=window.__emoHalf||(window.__emoHalf={b:null,m:{}});const b=typeof j95key==="function"?j95key():wk();if(M.b!==b){M.b=b;M.m={}}
 const q=emoKey(a)+"|"+emoKey(t)+"|"+kind;if(M.m[q]==null)M.m[q]=npwPick(["alone","go"],k=>emoAloneW(a,t,k))!=="go";return M.m[q]}/* npc-purpose G2c: her grief vs her liking for the one asking; one answer per buổi */
function emoAloneW(a,t,k){const B=BAL.ag.why.emo,e=emoGet(a);return k==="alone"?(e.v||0):B.goBase+Math.max(0,aff(a,t))}
function emoFearW(s,e,k){const B=BAL.ag.why.emo;return k==="so"?(e.v||0)*B.angW+Math.max(0,netQ(s,"timid"))*B.timid:B.calm+Math.max(0,(s.loyal||0)-BAL.loy.mid)}
function emoOffCauses(of,W){const B=BAL.ag.why.emo,L=[];try{const em=S.emp?S.emp.mood:null;if(em!=null&&em>=3)L.push({k:"lo",s:B.ofEmp,why:"Hoàng thượng đang nổi giận"});else if(em===0)L.push({k:"vui",s:B.ofEmp,why:"Hoàng thượng vui vẻ"})}catch(e){}
 try{let pt=null,bv=B.ofAf;for(const p of [S].concat(liveRivals(true))){const v=(of.af||{})[key(p)]||0;if(v>=bv){bv=v;pt=p}}if(pt){const e=emoGet(pt);if(e.w===W&&e.v>=EJ().wk.mistress){if(e.k==="vui")L.push({k:"vui",s:bv,why:"mừng cho "+npwNm(pt)});else if((typeof feelBad==="function"?feelBad(e.k):["so","buon","lo"].includes(e.k)))L.push({k:"lo",s:bv,why:"lo cho "+npwNm(pt)})}}}catch(e){}return L}
function emoManCauses(m,o,n){const B=BAL.ag.why.emo,L=[];if(n.t<BAL.tinhLv.known)return L;
 if(n.l>o.l||n.y>o.y)L.push({k:"vui",s:B.manMet+n.t,why:"được ngươi đoái hoài"});if(n.t>=o.t+B.manDt)L.push({k:"vui",s:n.t-o.t+B.manMet,why:"lòng hướng về ngươi"});
 if(n.t<=o.t-B.manDt)L.push({k:"buon",s:o.t-n.t+B.manMet,why:"buồn vì ngươi lạnh nhạt"});return L}
function emoGateWrap(){if(window.__emoGate||typeof motiveOK!=="function")return;window.__emoGate=1;const g0=motiveOK;
 motiveOK=function(a,t,kind){const g=g0.apply(this,arguments);try{if(!emoOn()||!a||!t||a===S||a===t||typeof a!=="object")return g;const e=emoGet(a);if(e.k==="binh")return g;
  const at=e.t!=null&&e.t===emoKey(t);const H=typeof H95!=="undefined"&&H95.has(kind),F=typeof F95!=="undefined"&&F95.has(kind);
  if(H&&at&&(e.k==="gian"||e.k==="ghen")){const w=`vì đang ${e.k==="gian"?"giận":"ghen với"} ${emoName(t)} (${e.why})`;
   if(!g.ok&&/động cơ yếu/.test(g.why||"")&&e.v>=EJ().mot.anger&&emoBrake(a,t)>=1){EMO_N.motive++;return{ok:true,why:w,emo:1}}if(g.ok){EMO_N.motive++;return Object.assign({},g,{why:(g.why?g.why+", ":"")+w})}}
  if(H&&g.ok&&(e.k==="so"||(e.k==="buon"&&typeof feelLv==="function"&&feelLv(a,"buon")>=EJ().mot.lv))&&e.v>=EJ().mot.strong){EMO_N.motiveGate++;return{ok:false,why:`đang ${(typeof feelName==="function"?feelName(e.k,feelLv(a,e.k)):EMO[e.k]).toLowerCase()} (${e.why}), không còn lòng dạ nào`}}
  if(F&&!g.ok&&e.k==="vui"&&e.v>=EJ().mot.strong&&aff(a,t)>EJ().mot.aff){EMO_N.motive++;return{ok:true,why:`vì đang vui (${e.why})`,emo:1}}
  if(F&&g.ok&&e.k==="buon"&&e.v>=EJ().mot.strong&&emoHalf(a,t,kind)){EMO_N.motiveGate++;return{ok:false,why:`đang ${(typeof feelName==="function"?feelName(e.k,feelLv(a,e.k)):EMO[e.k]).toLowerCase()}, muốn ở một mình`}}}catch(x){}return g}}
(function(){const r0=render;render=function(){try{emoGateWrap();emoSee()}catch(e){}return r0.apply(this,arguments)}})();
try{emoGateWrap()}catch(e){}
/* ---------- fog of knowledge ---------- */
function emoSee(){if(!emoOn())return;const W=emoW();S.emoSeen=S.emoSeen||{};try{for(const x of curPeople()){const p=emoRes(x);if(!p)continue;const k=emoKey(p);if(k&&!/^x\d+$/.test(k))S.emoSeen[k]=W}}catch(e){}}
/* robot10 nc-fix (save drift): an «x<n>» key (emoRegKey) names an object for this session only — a new one is made for every rebuilt stage entry and means
   nothing after a reload — so it is never written to the save record; old saves drop the ones they gathered (they grew with every walk) */
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{const E=S&&S.emoSeen;if(E&&typeof E==="object")for(const k of Object.keys(E))if(/^x\d+$/.test(k))delete E[k]}catch(e){}return r}})();
/* owner OD 17/11 ~20:25Z + ~20:35Z: the face (seal) of ANYONE she knows is always shown, updated each khắc (no grey "chưa rõ" seal); a Người lạ (j60
   kitIsKnown false: the unknown silhouette) shows none. Only the CAUSE needs scouting (jmoodknow moodCauseKnown). emoSee keeps S.emoSeen as a record. */
function emoKnown(p){p=emoRes(p);if(!p)return false;if(p===S)return true;try{if(typeof kitIsKnown==="function"&&!kitIsKnown(p))return false}catch(e){}return true}
/* public API — the ONE source of emotion display (owner 22:50Z: no code-drawn face expressions): null = no badge (stranger); known false = "chưa rõ" */
window.kitEmotion=function(p){try{if(!S)return null;const q=emoRes(p);if(!q)return null;try{if(q!==S&&typeof kitIsKnown==="function"&&!kitIsKnown(q))return null}catch(e){}
 const kn=q===S.emp||emoKnown(q);if(!kn)return{k:"an",name:"Chưa rõ",known:false};let e=emoGet(q);
 return{k:e.k,name:typeof feelName==="function"&&e.k!=="binh"?feelName(e.k,feelLv(q,e.k)):EMO[e.k],v:e.v||0,why:e.why||"",known:true}}catch(e){return null}};
/* ---------- the badge (KIT.md 31): one layer in pcPort → every frame size ---------- */
/* men wear the men's seals (owner 11/15, review/emo-men; same 10 moods, same backgrounds and marks): img/kit/emo-m-<k> = a young man
   (Hoàng thượng, hoàng tử, công tử / nam nhân, vương gia, thái giám, thị vệ); img/kit/emo-mo-<k> = a mature man with cap and beard
   (quan, thái y, and any other man of 45+ except Hoàng thượng). Women and girls keep img/kit/emo-<k>. One rule: personRoleRank's sex. */
/* PERSON SET (ACTWIRE, owner OD 23/11 ~03:25Z: the 21 Thái hậu act seals go in as they are): emoArtSet(p,k) with a key k = that person's OWN painted set
   (KIT_EMOSEAL.roleSet[role], e.g. thaihau → "th-") when img/kit/emo-<own><k>.webp is on the CDN index (strict: index loaded), else the base set below. */
function emoArtSet(p,k){const b=emoArtBase(p);if(!k)return b;try{const R=window.KIT_EMOSEAL&&KIT_EMOSEAL.roleSet;if(!R)return b;if(p&&p.__kp)p=p.__kp;const q=emoRes(p)||p;if(!q||q===S)return b;
 const o=R[personRoleRank(p.kind&&!p.name?p:q).role];if(o&&typeof KIT_CDNHAVE!=="undefined"&&KIT_CDNHAVE&&KIT_CDNHAVE.has(`img/kit/emo-${o}${k}.webp`.replace(/^.*?(?=img\/)/,"")))return o}/* the build turns the literal into a full CDN url; the index keys are img/… */catch(e){}return b}
function emoArtBase(p){try{if(p&&p.__kp)p=p.__kp;const q=emoRes(p)||p;if(!q||q===S)return"";const r=personRoleRank(p.kind&&!p.name?p:q);const male=r.sex==="m"||(r.kid&&q.sex==="m");if(!male)return"";
 if(r.role==="emp"||r.role==="heir"||r.role==="prince"||r.role==="eunuch"||r.role==="guard")return"m-";
 return r.role==="official"||r.role==="physician"||(q.age||0)>=45?"mo-":"m-"}catch(e){return""}}
/* ONE source of the seal's picture key (owner 17/11 ~18:40Z: no two-source seal): emoSealKey(p,m) = the key drawn. The Sims model (AG-MOODKNOW, window.sealKeyFor(pid) = strongest summed feeling among live causes) decides it for a person she SEES; an unknown mood stays "an". Never a second source: a new event shows through the causes list, not a pop. */
function emoSealKey(p,m){try{if(!(m&&m.known))return m.k;
  if(typeof window.faceKeyFor==="function"){const f=window.faceKeyFor(p);if(f&&f.key&&f.kind!=="intent")return f.key}/* "vẻ mặt" (owner 19:25Z + 20:15Z): active act > strongest feeling, FEELINGS-18 faceKeyFor; an intent never */
  }catch(e){}return m.k}
window.emoSealKey=emoSealKey;
function emoBadge(p){let m=window.kitEmotion(p);if(!m)return"";const sk=emoSealKey(p,m);let f=null;try{if(m.known&&typeof faceKeyFor==="function")f=faceKeyFor(p)}catch(e){}if(m.known)m=Object.assign({},m,{name:(f&&f.name)||(window.kitSealName?kitSealName(p,m):m.name)});/* alt + data-kemo = the SAME name as the seal and the card (f.name) */const t=m.known?`Tâm trạng: ${m.name}${m.why&&m.k!=="binh"?" ("+m.why+")":""}`:"Tâm trạng: chưa rõ";
 const E=x=>String(x==null?"":x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 /* owner 11/15: no visible label; TAP the seal = the kit popover (kpPop, j79) with the mood word + one-line cause; any other tap closes it */
 /* FEELINGS-18 + kit-figure-mood: the seal = faceKeyFor "vẻ mặt" (active act > strongest feeling; intent never). art = its painting on the CDN (feelArt chain), onerror walks feelFb; name/alt/data-kemo = f.name (same word as the card) */
 const set=f&&f.set!=null?f.set:emoArtSet(p,sk),bset=emoArtSet(p);const art=(f&&f.art)||sk;let fb="";try{if(typeof feelFb==="function")fb=feelFb(art)||""}catch(e){}
 const oe=fb?`if(!this.dataset.fb){this.dataset.fb=1;this.src='img/kit/emo-${bset}${fb}.webp'}else this.remove()`:"this.remove()";
 return `<img class="kemo kemo-${sk}" data-kemop="${E(emoKey(emoRes(p)))}" src="img/kit/emo-${set}${art}.webp" alt="${E(t)}" data-kemo="${E(m.known?m.name:"Chưa rõ")}" data-kemow="${E(m.known&&m.k!=="binh"?m.why:"")}" data-kemoc="${m.causeKnown===false?"0":"1"}" role="button" tabindex="0" onerror="${oe}">`}
/* tap on any seal (hers or an NPC's, any frame size): kit popover; capture phase so the tap never also opens the card/portrait under it */
function emoTipHTML(el){const n=el.dataset.kemo||"",w=el.dataset.kemow||"";const E=x=>String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 if(n==="Chưa rõ")return `<div class="kpopt">Tâm trạng chưa rõ</div><div class="kpopx">Lâu rồi chưa gặp, chưa biết lòng người này ra sao.</div>`;
 /* owner 17/11 ~17:55Z: the seal is seen by anyone who SEES the person; tapping it shows the mood + the cause ONLY if she knows it (kitEmotion().causeKnown, AG-MOODKNOW), else "Nguyên do chưa rõ" */
 const unk=el.dataset.kemoc==="0"&&n!=="Bình thường";
 return `<div class="kpopt">${E(n)}${w&&!unk?": "+E(w):""}</div>${unk?`<div class="kpopx">Nguyên do chưa rõ</div>`:""}`}
function emoTip(el){try{if(typeof kpPop==="function")kpPop(el,emoTipHTML(el))}catch(e){}}
document.addEventListener("click",e=>{const el=e.target&&e.target.closest&&e.target.closest("img.kemo");if(!el)return;e.stopPropagation();e.preventDefault();emoTip(el)},true);
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target&&e.target.matches&&e.target.matches("img.kemo")){e.preventDefault();emoTip(e.target)}},true);
["pointerdown","touchstart","mousedown"].forEach(t=>document.addEventListener(t,e=>{if(e.target&&e.target.closest&&e.target.closest("img.kemo"))e.stopPropagation()},{capture:true,passive:true}));
(function(){const p0=pcPort;pcPort=function(f){let h=p0.apply(this,arguments);try{if(!emoOn()||!f||!f.__kp||/class="kemo/.test(h))return h;const b=emoBadge(f.__kp);if(!b)return h;
  const i=h.indexOf('<span class="kin">');if(i<0)return h;const j=h.indexOf('<img class="kfr"',i);if(j<0)return h;
  let depth=0,end=-1;const re=/<\/?span\b[^>]*>/g;re.lastIndex=i;let mm;while((mm=re.exec(h))){if(mm[0][1]==="/"){depth--;if(depth===0){end=mm.index;break}}else depth++}
  if(end<0)return h;return h.slice(0,end)+b+h.slice(end)}catch(e){return h}}})();
(function(){const st=document.createElement("style");st.id="kemo-css";st.textContent=`
.kin>img.kemo,.pcp.kit .kin>img.kemo:not(.kfr):not(.kgem):not(.kemb):not(.kpor),span.md.kfc .kin>img.kemo{position:absolute!important;inset:auto!important;left:8.5%!important;top:17.5%!important;right:auto!important;bottom:auto!important;width:22%!important;height:auto!important;aspect-ratio:1;max-width:none!important;max-height:none!important;object-fit:contain!important;border-radius:50%!important;clip-path:none!important;z-index:4!important;pointer-events:auto;filter:drop-shadow(0 1px 1.5px #000a);box-shadow:none!important;opacity:1!important}
span.md.kfc.sm .kin>img.kemo{width:30%!important;left:5%!important;top:16%!important}
span.md.kfc.xs .kin>img.kemo{width:38%!important;left:2%!important;top:14%!important}
.kin>img.kemo.kemo-an{opacity:.85!important}
.kin>img.kemo{cursor:pointer;-webkit-tap-highlight-color:transparent}
`;document.head.appendChild(st)})();
/* measurement hook */
window.emoStat=function(){const c={};for(const p of emoPeople()){const e=emoGet(p);c[e.k]=(c[e.k]||0)+1}return Object.assign({now:c},EMO_N)};
/* one source: the Trong cung block's mood words (jcmood kitCourtMood) read the same state and the same fog as the seals */
/* jk2b kitCourtRows calls window.kitCourtMood(who) -> [text, cls] | null ("chưa rõ"); jcmood's object getter never matched that hook */
Object.defineProperty(window,"kitCourtMood",{configurable:true,writable:true,value:function(w){try{if(!S)return null;const q=typeof queenP==="function"?queenP():null;
 const p=w==="emp"?S.emp:w==="th"?emoTH():w==="hh"?q:null;if(!p||p===S)return null;const m=window.kitEmotion(p);if(!m||!m.known)return null;
 return[m.name,window.kitEmoTone?window.kitEmoTone(m.k):""]}catch(e){return null}}});
