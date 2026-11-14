
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
const EMO={vui:"Vui",binh:"Bình thường",buon:"Buồn",gian:"Giận",so:"Sợ",ghen:"Ghen",lo:"Lo âu",dau:"Đau khổ",muu:"Toan tính"};
const EMO_EXPR={vui:"vui",buon:"buon",gian:"gian",dau:"khoc",so:"dau",lo:"buon",ghen:"gian"};/* hook for kitFaceExpr (review/appearance) */
/* default reaction of an event: [emotion, strength]; null = no feeling */
const EMO_EV={selfUp:["vui",60],selfDown:["buon",55],rivalUp:["ghen",30],friendUp:["vui",20],foeDown:["vui",20],gift:["vui",25],slight:["gian",35],
 kidBorn:["vui",70],kidDie:["dau",95],otherKid:["ghen",25],punished:["so",50],cold:["dau",85],night:["vui",35],neglect:["buon",30],ill:["lo",35],
 friendDie:["buon",55],foeDie:["vui",15],mistressUp:["vui",30],mistressDown:["lo",40],loyalUp:["vui",25],loyalDown:["buon",30],motherDie:["dau",90],
 motherCold:["buon",50],clanUp:["vui",35],clanDown:["lo",40]};
/* personality filter: trait → event → [emotion, ×strength] (null emotion = shrugs it off) */
const EMO_TR={
 "Kiêu ngạo":{rivalUp:["gian",1.4],slight:["gian",1.5],punished:["gian",1.2],selfDown:["gian",1.3],gift:["vui",.6],otherKid:["ghen",1.4],selfUp:["vui",1.2]},
 "Nhu mì":{rivalUp:["buon",1],slight:["buon",1],punished:["so",1.4],selfDown:["buon",1.2],gift:["vui",1.2],otherKid:["buon",.8]},
 "Tham vọng":{rivalUp:["muu",1.3],otherKid:["muu",1.2],selfUp:["vui",1.3],punished:["muu",1],selfDown:["muu",1.2],friendDie:["lo",.6]},
 "Hiểm độc":{rivalUp:["muu",1.2],slight:["muu",1.3],punished:["muu",1.1],otherKid:["muu",1.3],foeDown:["vui",1.6],foeDie:["vui",1.5],gift:["vui",.8]},
 "Hiền lành":{rivalUp:["vui",.5],slight:["buon",.6],gift:["vui",1.3],punished:["so",1],otherKid:["vui",.5],foeDown:[null,0],foeDie:["buon",.6],friendDie:["dau",1]},
 "Đa nghi":{rivalUp:["lo",1],slight:["gian",1],gift:["lo",.5],punished:["so",1.2],ill:["lo",1.4],night:["lo",.3]},
 "Ghen tuông":{rivalUp:["ghen",1.6],otherKid:["ghen",1.6]},
 "Thù dai":{slight:["gian",1.4],foeDown:["vui",1.3]},
 "Tham tiền":{gift:["vui",1.6]},
 "Trọng nghĩa":{friendDie:["dau",1.1],friendUp:["vui",1.4]},
 "Cả nể":{slight:["buon",.8]},
 "Thẳng thắn":{slight:["gian",1.1],rivalUp:["ghen",.6]},
 "Mê tín":{ill:["so",1.2],kidDie:["dau",1]},
 /* servants (j10 STR) */
 trung:{mistressDown:["lo",1.4],mistressUp:["vui",1.3]},tham:{gift:["vui",1.6],mistressDown:["muu",.8]},nhat:{punished:["so",1.6],mistressDown:["so",1.3],loyalDown:["so",1.2]},
 lanh:{mistressUp:["vui",1.2],loyalDown:["muu",1]},chuyen:{},
 /* the Emperor */
 nongnay:{slight:["gian",1.5],kidDie:["gian",.8]},nhantu:{slight:["buon",.7]},danghi:{slight:["gian",1.2],ill:["lo",1.3]}};
/* decay per tuần (points); trait multipliers per emotion */
const EMO_DECAY={vui:9,binh:0,buon:6,gian:8,so:9,ghen:6,lo:6,dau:3,muu:5};
const EMO_DK={"Thù dai":{gian:.4,muu:.6},"Hiền lành":{gian:1.6,ghen:1.6,muu:1.5},"Nhu mì":{buon:.7,so:.8},"Kiêu ngạo":{gian:.8},"Ghen tuông":{ghen:.6},"Hiểm độc":{muu:.6},"Trọng nghĩa":{dau:.7}};
/* EFFECTS. persW multipliers at full strength (v=100); scaled linearly by v/100 */
const EMO_HARM=["poison","kpoison","frame","kframe","plant","musk","catswap","pushp","provoke","humiliate","rumor","trip","accuse","block","steal","vp","pond","ksab","takeaway","bribe","spy","punish"];
const EMO_KIND=["help","visit","warn","mediate","apologise","ally","gift","reward","pardon","serveTH"];
const EMO_W={vui:{harm:.75,kind:1.5,idle:.9},gian:{harm:1.6,kind:.6,provoke:1.3,humiliate:1.3,punish:1.4},buon:{harm:.75,kind:.75,idle:1.7,visit:.5},
 so:{harm:.6,kind:.9,apologise:1.8,idle:1.3},ghen:{harm:1.3,steal:1.6,block:1.6,trip:1.4,rumor:1.4,kind:.8},lo:{spy:1.6,check:1.6,test:1.4,harm:.9},
 dau:{harm:.7,kind:.6,idle:2},muu:{frame:1.5,plant:1.5,ally:1.5,bribe:1.5,bribeksp:1.5,feign:1.6,provoke:.7}};
/* odds of any act by the doer's mood (points at v=100; "a little") */
const EMO_OD={vui:3,binh:0,buon:-2,gian:-3,so:-3,ghen:-1,lo:-2,dau:-4,muu:2};
/* the Emperor's tablet chance by her mood */
const EMO_NIGHT={vui:1.15,binh:1,buon:.88,gian:.85,so:.9,ghen:.92,lo:.95,dau:.85,muu:1};
/* servants' Lòng per month by their own mood */
const EMO_LOY={vui:2,binh:0,buon:-1,gian:-2,so:-1,ghen:-1,lo:-1,dau:0,muu:-1};
const EMO_N={set:0,ev:{},motive:0,motiveGate:0,odds:0,kinds:{}};
function emoOn(){return !!(typeof S!=="undefined"&&S&&!window.__emoOff)}
/* ---------- who ---------- */
function emoRes(p){if(!p)return null;if(p.__kp)p=p.__kp;if(p.kind&&!p.name&&typeof p.kind==="string"){if(p.kind==="emp")return S.emp;if(p.kind==="th")return emoTH();if(p.kind==="maid")return S.maid;return p.ref||null}
 if(p.kind==="th"||p===S.thO)return emoTH();return p}
function emoTH(){S.thO=S.thO||{};return S.thO}
function emoKey(p){if(!p)return"";if(p===S)return"me";if(S.emp&&p===S.emp)return"emp";if(p===S.thO)return"th";if(p.id!=null)return String(p.id);if(p.sid!=null)return"s"+p.sid;return p.name||""}
function emoByKey(k){if(k==="me")return S;if(k==="emp")return S.emp;if(k==="th")return emoTH();const v=(rivals||[]).find(x=>String(x.id)===String(k));if(v)return v;
 if(/^s\d+$/.test(k)){try{return allServ().find(s=>"s"+s.sid===k)||null}catch(e){}}return null}
function emoName(p){if(!p)return"";if(p===S)return"ngươi";if(p===S.emp)return"Hoàng thượng";if(p===S.thO)return"Thái hậu";return p.name||""}
function emoTraits(p){try{if(p===S.thO)return traitsOf("th");if(p&&p.tr&&!p.trait)return[p.tr,p.tr2].filter(Boolean);return traitsOf(p)}catch(e){return[]}}
function emoGet(p){p=emoRes(p);if(!p)return{k:"binh",v:0};const e=p.emo;if(!e||!EMO[e.k]||e.v<15)return{k:"binh",v:0,why:""};return e}
/* ---------- set: a stronger feeling replaces a weaker one; the same feeling adds up ---------- */
function emoSet(p,k,v,why,t){if(!emoOn())return;p=emoRes(p);if(!p||!EMO[k]||!(v>0))return;v=Math.round(cl(v,0,100));const e=p.emo;
 if(e&&EMO[e.k]&&e.v>=15&&e.k===k){e.v=cl(Math.round(e.v+v*.5),0,100);e.why=why||e.why;if(t!=null)e.t=t;e.w=emoW();EMO_N.set++;emoSync(p);return}
 if(e&&EMO[e.k]&&e.v>=15&&e.v>v)return;
 p.emo={k,v,why:why||"",t:t==null?null:t,w:emoW()};EMO_N.set++;EMO_N.kinds[k]=(EMO_N.kinds[k]||0)+1;emoSync(p)}
function emoW(){try{return wk()}catch(e){return 0}}
/* an event filtered by personality */
function emoEv(p,ev,why,t,scale){if(!emoOn())return;p=emoRes(p);if(!p)return;const d=EMO_EV[ev];if(!d)return;let k=d[0],v=d[1]*(scale||1);
 for(const tr of emoTraits(p)){const o=EMO_TR[tr]&&EMO_TR[tr][ev];if(o){if(o[0]===null)return;k=o[0];v*=o[1]}}
 EMO_N.ev[ev]=(EMO_N.ev[ev]||0)+1;emoSet(p,k,v,why,["gian","ghen","muu"].includes(k)?t:null)}
/* legacy mood bars stay in step: S.emp.mood (0 vui,1 bình,2 phiền,3 giận) and jcmood th/hh */
function emoLv(k){return k==="vui"?0:k==="gian"?3:["buon","so","lo","dau","ghen"].includes(k)?2:1}
function emoSync(p){try{if(p===S.emp&&p.emo&&p.emo.v>=40){p.mood=emoLv(p.emo.k);p.__emoMood=p.mood}if(p===S.thO&&S.cm&&S.cm.th&&p.emo&&p.emo.v>=40){S.cm.th.lv=emoLv(p.emo.k);S.cm.th.why=p.emo.why;p.__emoLv=S.cm.th.lv}}catch(e){}}
function emoFromLegacy(){try{const E=S.emp;if(E&&E.mood!=null&&E.mood!==E.__emoMood){E.__emoMood=E.mood;const k=["vui","binh","buon","gian"][E.mood]||"binh";
  if(k==="binh"){if(E.emo&&E.emo.v<50)E.emo=null}else{const ex=E.emo;if(!ex||ex.k!==k)E.emo={k,v:50,why:k==="vui"?"long thể khoan khoái":k==="gian"?"việc trong cung làm ngài phật ý":"việc triều đè nặng",t:null,w:emoW()}}}
 const C=S.cm;if(C&&C.th&&!S.thDead){const th=emoTH();if(C.th.lv!==th.__emoLv){th.__emoLv=C.th.lv;const k=["vui","binh","buon","gian"][C.th.lv]||"binh";if(k==="binh"){if(th.emo&&th.emo.v<50)th.emo=null}else th.emo={k,v:50,why:C.th.why||"",t:null,w:emoW()}}}}catch(e){}}
/* ---------- the week: read what really changed ---------- */
function emoPeople(){const L=[S];for(const v of rivals||[])if(v.alive)L.push(v);return L}
function emoSnap(p){let kids=0,kidsAll=0;for(const k of p.kids||[]){kidsAll++;if(k.alive)kids++}return{r:rkOf(p),out:!!p.out,conf:(p.confined||0)>0,kids,kidsAll,n:(p.nightLog||[]).length+(p===S?(S.nights||0):(p.nights||0)),sung:p.sung||0,suc:p.suc||0,alive:p===S?!S.dead:!!p.alive}}
function emoWeek(){if(!emoOn())return;const W=emoW();S.emoSnap=S.emoSnap||{};const P=emoPeople();
 /* decay */
 const decay=p=>{const e=p&&p.emo;if(!e||!EMO[e.k])return;let d=EMO_DECAY[e.k]||6;for(const t of emoTraits(p)){const m=EMO_DK[t]&&EMO_DK[t][e.k];if(m)d*=m}e.v=Math.max(0,Math.round(e.v-d));if(e.v<15)p.emo=null};
 for(const p of P)decay(p);decay(S.emp);decay(S.thO);for(const p of P)for(const s of p.staff||[])decay(s);if(S.maid)decay(S.maid);for(const [k] of (typeof allKids==="function"?allKids():[]))decay(k);for(const m of S.men||[])decay(m);
 if(S.court)for(const c in S.court)decay(S.court[c]);
 emoFromLegacy();
 const others=p=>P.filter(x=>x!==p);
 for(const p of P.concat((rivals||[]).filter(v=>!v.alive))){const k=emoKey(p),o=S.emoSnap[k],n=emoSnap(p);S.emoSnap[k]=n;if(!o)continue;const nm=emoName(p);
  if(!n.alive&&o.alive){for(const x of others(p)){const a=aff(x,p),oa=oan(x,p);if(a>=30)emoEv(x,"friendDie",`${nm} qua đời`);else if(oa>=30||a<=-20)emoEv(x,"foeDie",`${nm} qua đời`)}continue}
  if(!n.alive)continue;
  if(n.r>o.r){emoEv(p,"selfUp",`được tấn phong ${typeof rkName==="function"?rkName(p):""}`.trim());for(const x of others(p)){const a=aff(x,p);if(a>=40)emoEv(x,"friendUp",`${nm} được tấn phong`);else if(a<25)emoEv(x,"rivalUp",`${nm} được tấn phong`,emoKey(p))}}
  if(n.r<o.r&&!n.out){emoEv(p,"selfDown","bị giáng phẩm");for(const x of others(p))if(oan(x,p)>=25||aff(x,p)<=-25)emoEv(x,"foeDown",`${nm} bị giáng`)}
  if(n.out&&!o.out){emoEv(p,"cold","bị đày vào lãnh cung");for(const x of others(p))if(oan(x,p)>=25||aff(x,p)<=-25)emoEv(x,"foeDown",`${nm} vào lãnh cung`)}
  if(n.conf&&!o.conf)emoEv(p,"punished","bị cấm túc");
  if(n.kidsAll>o.kidsAll){emoEv(p,"kidBorn","mẹ tròn con vuông");for(const x of others(p))if(aff(x,p)<25)emoEv(x,"otherKid",`${nm} sinh hạ hoàng tự`,emoKey(p))}
  if(n.kids<o.kids-(n.kidsAll-o.kidsAll)||(n.kids<o.kids&&n.kidsAll===o.kidsAll))emoEv(p,"kidDie","mất con");
  if(n.n>o.n&&!(n.kidsAll>o.kidsAll)){emoEv(p,"night","được Hoàng thượng lật thẻ");for(const x of others(p))if(aff(x,p)<10&&emoTraits(x).includes("Ghen tuông"))emoEv(x,"rivalUp",`${nm} được thị tẩm`,emoKey(p),.6)}
  if(n.sung<=o.sung-6)emoEv(p,"neglect","Hoàng thượng lạnh nhạt");
  if(n.suc<30&&o.suc>=30)emoEv(p,"ill","sức khỏe sa sút")}
 /* servants: by their mistress and by their own Lòng */
 for(const p of P){const e=emoGet(p),tp=S.emoSnap[emoKey(p)];for(const s of p.staff||[]){const k="s"+s.sid,o=S.emoSnap[k],l=s.loyal||0;S.emoSnap[k]={l};
   if(o&&o.l!=null){if(l>=o.l+5)emoEv(s,"loyalUp","được chủ đối đãi tử tế");else if(l<=o.l-5)emoEv(s,"loyalDown","bị chủ hắt hủi")}
   if(e.w===W&&e.v>=40){if(["vui"].includes(e.k))emoEv(s,"mistressUp",`chủ nhân ${e.why||"vui"}`);else if(["dau","so","buon","lo"].includes(e.k)&&/giáng|lãnh cung|cấm túc|mất con/.test(e.why||""))emoEv(s,"mistressDown",`chủ nhân ${e.why}`);
    else if(e.k==="gian"&&roll(30))emoSet(s,"so",30,"chủ nhân đang nổi giận")}}}
 if(S.maid){const e=emoGet(S);if(e.w===W&&e.v>=40&&e.k==="vui")emoEv(S.maid,"mistressUp",`chủ nhân ${e.why||"vui"}`);else if(e.w===W&&/giáng|lãnh cung|cấm túc|mất con/.test(e.why||""))emoEv(S.maid,"mistressDown",`chủ nhân ${e.why}`)}
 /* children: by their mother */
 try{for(const [k,mo] of allKids()){if(!k.alive)continue;const m=mo||S;const mk="k:"+emoKey(m)+":"+(k.name||""),o=S.emoSnap[mk];const n={d:m===S?!!S.dead:!m.alive,c:!!m.out};S.emoSnap[mk]=n;
  if(o&&n.d&&!o.d)emoEv(k,"motherDie","mẫu thân qua đời");else if(o&&n.c&&!o.c)emoEv(k,"motherCold","mẫu thân vào lãnh cung");else if(!k.emo&&roll(8))emoSet(k,"vui",30,"được chơi đùa trong vườn")}}catch(e){}
 /* officials: their house's daughters rise and fall */
 try{if(S.court)for(const c in S.court){const of=S.court[c];if(!of||!of.name)continue;if(!of.emo&&roll(6))emoSet(of,pick(["vui","lo"]),30,pick(["việc triều thuận lợi","việc triều rối ren"]))}}catch(e){}
 for(const m of S.men||[]){if(m.alive&&!m.emo&&roll(5))emoSet(m,pick(["vui","lo","buon"]),25,"chuyện riêng")}
 /* the Emperor grieves a lost child and rejoices at a birth (one rule: same as anyone's child) */
 try{let n=0,a=0;for(const [k] of allKids()){a++;if(k.alive)n++}const o=S.emoSnap.empK;S.emoSnap.empK={n,a};if(o){if(a>o.a)emoSet(S.emp,"vui",55,"mừng có hoàng tự");if(n<o.n-(a-o.a))emoSet(S.emp,"dau",60,"thương xót hoàng tự yểu mệnh")}}catch(e){}}
/* ---------- direct hooks: a slight (oán) and a kindness (thiện cảm) land at once ---------- */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){const r=o0.apply(this,arguments);try{if(emoOn()&&n>=5&&x&&y&&x!==y)emoEv(x,"slight",`bị ${emoName(y)} làm nhục`,emoKey(y),cl(n/10,.6,1.6))}catch(e){}return r}})();
(function(){const a0=affAdd;affAdd=function(x,y,n){const r=a0.apply(this,arguments);try{if(emoOn()&&n>=6&&x&&y&&x!==y&&x!==S.emp)emoEv(x,"gift",`được ${emoName(y)} đối đãi tử tế`,null,cl(n/10,.6,1.6))}catch(e){}return r}})();
(function(){const k0=kidDie;kidDie=function(k,why,mine){const r=k0.apply(this,arguments);try{if(emoOn()){let mo=mine?S:null;if(!mo)for(const v of rivals||[])if((v.kids||[]).includes(k))mo=v;if(mo)emoEv(mo,"kidDie",`mất ${k.name||"con"}`)}}catch(e){}return r}})();
(function(){const p0=punish;punish=function(p,why,sev){const r=p0.apply(this,arguments);try{const q=typeof p==="string"?S:p;if(emoOn()&&q)emoEv(q,"punished",`bị phạt vì ${typeof p==="string"?p:why}`)}catch(e){}return r}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)emoWeek()}catch(e){console.error(e)}return r}})();
/* ---------- effects ---------- */
function emoMul(p,act){const e=emoGet(p);if(e.k==="binh")return 1;const T=EMO_W[e.k];if(!T)return 1;let m=T[act];if(m==null)m=EMO_HARM.includes(act)?T.harm:EMO_KIND.includes(act)?T.kind:null;if(m==null)return 1;return 1+(m-1)*e.v/100}
(function(){const w0=persW;persW=function(p,act){const w=w0.apply(this,arguments);try{if(emoOn()&&p&&p!==S)return w*emoMul(p,act)}catch(e){}return w}})();
/* anger and jealousy aimed at someone raise the danger toward that person (capped: +12) */
(function(){const d0=danger;danger=function(v,t){const d=d0.apply(this,arguments);try{if(emoOn()&&v&&t){const e=emoGet(v);if((e.k==="gian"||e.k==="ghen"||e.k==="muu")&&e.t!=null&&e.t===emoKey(t))return d+Math.min(12,Math.round(e.v/6))}}catch(e){}return d}})();
(function(){const o0=odA;odA=function(a,b){const r=o0.apply(this,arguments);try{if(emoOn()&&a){const e=emoGet(a);const m=Math.round((EMO_OD[e.k]||0)*e.v/100);if(m){EMO_N.odds++;return cl(r+m,5,95)}}}catch(e){}return r}})();
(function(){const t0=odT;odT=function(a,b){const r=t0.apply(this,arguments);try{if(emoOn()&&a){const e=emoGet(a);const m=Math.round((EMO_OD[e.k]||0)*e.v/100);if(m)return cl(r+m,5,95)}}catch(e){}return r}})();
(function(){const n0=nightCh;nightCh=function(p){const c=n0.apply(this,arguments);try{p=p||S;if(emoOn()&&c){const e=emoGet(p);let m=EMO_NIGHT[e.k]||1;if((e.k==="buon"||e.k==="dau")&&(S.emp.traits||[]).includes("nhantu"))m=1.05;if(m!==1)return Math.max(1,Math.round(c*(1+(m-1)*e.v/100)))}}catch(e){}return c}})();
function emoMonth(){if(!emoOn())return;for(const p of emoPeople())for(const s of p.staff||[]){const e=emoGet(s);const d=Math.round((EMO_LOY[e.k]||0)*e.v/60);if(d)s.loyal=cl((s.loyal||0)+d,0,100)}}
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{emoMonth()}catch(e){}return r}})();
/* motive gate (j95): feelings are a recorded motive. Wrapped lazily so it works whatever the load order. */
function emoGateWrap(){if(window.__emoGate||typeof motiveOK!=="function")return;window.__emoGate=1;const g0=motiveOK;
 motiveOK=function(a,t,kind){const g=g0.apply(this,arguments);try{if(!emoOn()||!a||!t||a===S||a===t||typeof a!=="object")return g;const e=emoGet(a);if(e.k==="binh")return g;
  const at=e.t!=null&&e.t===emoKey(t);const H=typeof H95!=="undefined"&&H95.has(kind),F=typeof F95!=="undefined"&&F95.has(kind);
  if(H&&at&&(e.k==="gian"||e.k==="ghen"||e.k==="muu")){const w=`vì đang ${e.k==="gian"?"giận":e.k==="ghen"?"ghen với":"toan tính hạ"} ${emoName(t)} (${e.why})`;
   if(!g.ok&&/động cơ yếu/.test(g.why||"")&&e.v>=50){EMO_N.motive++;return{ok:true,why:w,emo:1}}if(g.ok){EMO_N.motive++;return Object.assign({},g,{why:(g.why?g.why+", ":"")+w})}}
  if(H&&g.ok&&(e.k==="so"||e.k==="dau")&&e.v>=60){EMO_N.motiveGate++;return{ok:false,why:`đang ${EMO[e.k].toLowerCase()} (${e.why}), không còn lòng dạ nào`}}
  if(F&&!g.ok&&e.k==="vui"&&e.v>=60&&aff(a,t)>-30){EMO_N.motive++;return{ok:true,why:`vì đang vui (${e.why})`,emo:1}}
  if(F&&g.ok&&(e.k==="buon"||e.k==="dau")&&e.v>=60&&roll(50)){EMO_N.motiveGate++;return{ok:false,why:`đang ${EMO[e.k].toLowerCase()}, muốn ở một mình`}}}catch(x){}return g}}
(function(){const r0=render;render=function(){try{emoGateWrap();emoSee()}catch(e){}return r0.apply(this,arguments)}})();
try{emoGateWrap()}catch(e){}
/* ---------- fog of knowledge ---------- */
function emoSee(){if(!emoOn())return;const W=emoW();S.emoSeen=S.emoSeen||{};try{for(const x of curPeople()){const p=emoRes(x);if(p)S.emoSeen[emoKey(p)]=W}}catch(e){}}
function emoKnown(p){p=emoRes(p);if(!p)return false;if(p===S)return true;try{if(typeof kitIsKnown==="function"&&!kitIsKnown(p))return false}catch(e){}
 const W=emoW(),k=emoKey(p),s=(S.emoSeen||{})[k];if(s!=null&&W-s<=2)return true;
 if((S.staff||[]).includes(p)||p===S.maid||(S.kids||[]).includes(p))return true;
 try{if(p===S.thO&&typeof cmKnown==="function")return cmKnown("th");const q=typeof queenP==="function"?queenP():null;if(p===q&&typeof cmKnown==="function"&&cmKnown("hh"))return true}catch(e){}
 if((S.mat||0)>=3&&(rivals||[]).includes(p))return true;
 if(p===S.emp&&(S.nightLog||[]).some(w=>W-w<=2))return true;return false}
/* public API (also for kitFaceExpr): null = no badge (stranger); known false = "chưa rõ" */
window.kitEmotion=function(p){try{if(!S)return null;const q=emoRes(p);if(!q)return null;try{if(q!==S&&typeof kitIsKnown==="function"&&!kitIsKnown(q))return null}catch(e){}
 const kn=emoKnown(q);if(!kn)return{k:"an",name:"Chưa rõ",known:false};const e=emoGet(q);return{k:e.k,name:EMO[e.k],v:e.v||0,why:e.why||"",known:true,expr:e.v>=40?EMO_EXPR[e.k]||null:null}}catch(e){return null}};
/* ---------- the badge (KIT.md 31): one layer in pcPort → every frame size ---------- */
function emoBadge(p){const m=window.kitEmotion(p);if(!m)return"";const t=m.known?`Tâm trạng: ${m.name}${m.why&&m.k!=="binh"?" ("+m.why+")":""}`:"Tâm trạng: chưa rõ";
 return `<img class="kemo kemo-${m.k}" src="img/kit/emo-${m.k}.webp" alt="${t}" title="${t}" onerror="this.remove()">`}
(function(){const p0=pcPort;pcPort=function(f){let h=p0.apply(this,arguments);try{if(!emoOn()||!f||!f.__kp||/class="kemo/.test(h))return h;const b=emoBadge(f.__kp);if(!b)return h;
  const i=h.indexOf('<span class="kin">');if(i<0)return h;const j=h.indexOf('<img class="kfr"',i);if(j<0)return h;
  let depth=0,end=-1;const re=/<\/?span\b[^>]*>/g;re.lastIndex=i;let mm;while((mm=re.exec(h))){if(mm[0][1]==="/"){depth--;if(depth===0){end=mm.index;break}}else depth++}
  if(end<0)return h;return h.slice(0,end)+b+h.slice(end)}catch(e){return h}}})();
(function(){const st=document.createElement("style");st.id="kemo-css";st.textContent=`
.kin>img.kemo,.pcp.kit .kin>img.kemo:not(.kfr):not(.kgem):not(.kemb):not(.kpor),span.md.kfc .kin>img.kemo{position:absolute!important;inset:auto!important;left:8.5%!important;top:17.5%!important;right:auto!important;bottom:auto!important;width:22%!important;height:auto!important;aspect-ratio:1;max-width:none!important;max-height:none!important;object-fit:contain!important;border-radius:50%!important;clip-path:none!important;z-index:4!important;pointer-events:auto;filter:drop-shadow(0 1px 1.5px #000a);animation:none!important;transform:none!important;box-shadow:none!important;opacity:1!important}
span.md.kfc.sm .kin>img.kemo{width:30%!important;left:5%!important;top:16%!important}
span.md.kfc.xs .kin>img.kemo{width:38%!important;left:2%!important;top:14%!important}
.kin>img.kemo.kemo-an{opacity:.85!important}
@media (prefers-reduced-motion:no-preference){.kin>img.kemo.kemo-gian,.kin>img.kemo.kemo-dau{animation:kemoPulse 2.4s ease-in-out infinite!important}}
@keyframes kemoPulse{0%,100%{filter:drop-shadow(0 1px 1.5px #000a)}50%{filter:drop-shadow(0 0 4px #ffcf8a) drop-shadow(0 1px 1.5px #000a)}}
`;document.head.appendChild(st)})();
/* measurement hook */
window.emoStat=function(){const c={};for(const p of emoPeople()){const e=emoGet(p);c[e.k]=(c[e.k]||0)+1}return Object.assign({now:c},EMO_N)};
