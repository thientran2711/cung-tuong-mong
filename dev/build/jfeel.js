/* ================= jfeel: 18 CẢM XÚC × 3 BẬC · Ý ĐỒ · VẺ MẶT (owner OD 17/11 ~19:10Z "Cả bộ này thì ok rồi đó" + ~19:25Z "giao làm theo cách
   này với một dấu vẻ mặt"; model dev/handover/research/feelings-18-model.md on the docs branch; FEELINGS-18) =================
   ONE feeling system, converted (not rebuilt): jemo p.emo / emoSet / emoEv, jmoodknow causes p.mk (khắc timers, summed seal), jmood her bar S.mood.v,
   jemoact outbursts. This piece:
   1. THE SET: 18 kinds (Sims 16 renamed + Hờn dỗi + Chạnh lòng). Old keys are converted at the ONE entry point (emoSet) and in stored causes
      (mkSync): dau → buon at the heavy level, muu → no feeling (scheming is an INTENT now, see 4), ghen → chanh, khoc → buon (crying is an ACT).
   2. LEVELS: the level of a kind = the summed strength of that kind's live causes (≥ BAL.feel.lv[0] nhẹ, [1] vừa, [2] nặng); heavy names (Hân hoan,
      Đau khổ, Phẫn nộ, Bấn loạn, Khiếp đảm, Nhục nhã) are the VANPHONG words of the heavy level.
   3. EFFECTS per kind per level (numbers BAL.feel): odds of acts by the act's kit category (kitActCat) for her deck cards and every runAct (NPCs too),
      act weights (jemo EMO_W shape), the Emperor's tablet (tinhtu), thiện cảm gains (vui), a sulk's drift (hon). Her bar push per feeling (BAL.mood.emo).
   4. INTENT (ý đồ, hidden): born from Chạnh lòng / Giận / Hờn dỗi at a high level + a low bar + traits, aimed at the person who caused it; lasts until
      acted on (a harm act at that person), exposed (punished), or faded (the feeling gone + BAL.feel.intent.fade khắc). It shows on the face as
      "Toan tính" only by odds against Tâm cơ (one hashed draw per viewer per day). A clue, NEVER evidence: nothing here writes chứng cứ.
   5. API for the kit seal (main's kit-figure-mood wires it; this piece draws NO UI): faceKeyFor(pid, viewer) → {kind:'act'|'intent'|'feel', key,
      level, fb (existing art key while the new seal art is missing), name, lines:[card lines]} with priority act > visible intent > feeling.
   NPC parity: every rule reads p.mk / p.emo of anyone (her, consorts, servants, Emperor, Thái hậu, men, court, kids). Co-op: intents (p.fi) and acts
   (p.fa) of NPCs are world facts → written on the host only (feelWorld). Off switch for measuring: window.__feelOff = 1.
   ===================================================================================================================== */
Object.assign(BAL,{feel:{
 /* level bands on the summed strength of one kind's live causes: nhẹ ≥ lv[0], vừa ≥ lv[1], nặng ≥ lv[2] */
 lv:[15,40,70],
 /* sign of each kind on the mood bar (good +, bad −); NPC bar = Σ sign × strength × bar.k, clamped ±100 (her bar is S.mood.v, jmood) */
 sg:{vui:1,tutin:1,hanghai:1,tinhtu:1,chuyentam:1,hungkhoi:1,tinhnghich:1,binh:0,buon:-1,gian:-1,lo:-1,so:-1,hothen:-1,chan:-1,khochiu:-1,choang:-1,hon:-1,chanh:-1},
 bar:{k:.6},
 /* her bar push per feeling point for the new kinds (extends BAL.mood.emo; old kinds keep their numbers) */
 mood:{tutin:.25,hanghai:.25,tinhtu:.3,chuyentam:.2,hungkhoi:.25,tinhnghich:.25,hothen:-.3,chan:-.15,khochiu:-.15,choang:-.1,hon:-.2,chanh:-.2},
 /* ODDS of acts by kit category (kitActCat): c = categories, p = points at [nhẹ, vừa, nặng] (bad kinds negative); all feelings together capped ±max */
 od:{max:6,
  vui:{c:["giao-thiep","ban-thuong"],p:[1,2,3]},
  tutin:{c:["trieu-chinh","le-nghi","trung-phat","hai-nguoi"],p:[1,2,4]},
  hanghai:{c:["hau-ha","di-lai","buon-ban"],p:[1,2,4]},
  tinhtu:{c:["sung-ai"],p:[1,3,4]},
  chuyentam:{c:["hoc-tap"],p:[1,2,4]},
  hungkhoi:{c:["hoc-tap"],p:[1,2,3]},
  tinhnghich:{c:["cham-con","giao-thiep"],p:[1,2,3]},
  buon:{c:["giao-thiep","sung-ai"],p:[-1,-2,-3]},
  gian:{c:["giao-thiep","le-nghi"],p:[-1,-2,-4]},
  lo:{c:["hoc-tap","muu-ke"],p:[-1,-2,-3]},
  so:{c:["hai-nguoi","trung-phat","trieu-chinh"],p:[-1,-3,-4]},
  hothen:{c:["giao-thiep","le-nghi","sung-ai"],p:[-1,-2,-3]},
  chan:{c:["hoc-tap","hau-ha"],p:[-1,-2,-3]},
  khochiu:{c:["hau-ha","hoc-tap","giao-thiep"],p:[0,-1,-2]},
  choang:{c:["hoc-tap","giao-thiep","muu-ke"],p:[-1,-2,-3]},
  hon:{c:["giao-thiep"],p:[-1,-2,-3]},
  chanh:{c:["giao-thiep"],p:[0,-1,-2]}},
 /* act weights of NPCs (jemo EMO_W shape: harm / kind / idle / an act key), scaled by strength like every feeling */
 w:{tutin:{kind:1.2,ally:1.3,accuse:1.3},hanghai:{idle:.7,kind:1.1},tinhtu:{kind:1.2,visit:1.4},chuyentam:{idle:.9,harm:.8},hungkhoi:{kind:1.2,idle:.9},
  tinhnghich:{kind:1.3,visit:1.3,harm:.8},hothen:{visit:.5,idle:1.4,kind:.8,harm:.8},chan:{idle:1.3,visit:1.2},khochiu:{harm:1.1,idle:1.3,kind:.9},
  choang:{harm:.7,kind:.8,idle:1.5},chanh:{harm:1.3,steal:1.6,block:1.6,trip:1.4,rumor:1.4,kind:.8}},
 /* odds points of any act at strength 100 (jemo EMO_OD shape, "a little") and servants' Lòng a month by their own feeling (EMO_LOY shape) */
 odAll:{tutin:1,hanghai:1,tinhtu:0,chuyentam:1,hungkhoi:0,tinhnghich:0,hothen:-1,chan:0,khochiu:-1,choang:-1,chanh:0},
 loy:{tutin:1,hanghai:2,tinhtu:0,chuyentam:1,hungkhoi:1,tinhnghich:1,hothen:-1,chan:-1,khochiu:-1,choang:0,chanh:-1},
 /* the Emperor's tablet chance × (Tình tứ of the consort, by level) */
 night:{tinhtu:[1.03,1.06,1.1]},
 /* thiện cảm gains of others toward a joyful person × (1 + this, by level); a sulk drifts the sulker's thiện cảm toward its target by this a day */
 aff:{vui:[.05,.1,.15]},honDrift:[0,-1,-2],
 /* old keys → the set (owner 19:10Z: muu→binh, dau→buon heavy; ghen = the short jealousy feeling Chạnh lòng; khóc is an act) */
 old:{dau:"buon",ghen:"chanh",khoc:"buon",muu:null},
 /* timers in khắc of the new kinds when a cause has no event key (BAL.mood2.dur.k shape) */
 dur:{tutin:12,hanghai:8,tinhtu:12,chuyentam:8,hungkhoi:8,tinhnghich:6,hothen:16,chan:12,khochiu:6,choang:3,chanh:12},
 /* event → feeling of the new kinds (jemo EMO_EV shape [kind, strength]); a trait filter on top (EMO_TR shape) */
 ev:{night:["tinhtu",35],contestWin:["tutin",45],studyOk:["chuyentam",20],artOk:["hungkhoi",25],kidPlay:["tinhnghich",25],restOk:["hanghai",20],
  slap:["hothen",45],shamed:["hothen",40],confinedLong:["chan",30],idle:["chan",15],sick:["khochiu",30],weatherBad:["khochiu",15],dazed:["choang",40]},
 tr:{"Kiêu ngạo":{selfUp:["tutin",1.2]},"Tham vọng":{selfUp:["tutin",1.3],rivalUp:["chanh",1.3],otherKid:["chanh",1.2]},"Xảo quyệt":{rivalUp:["chanh",1.2],otherKid:["chanh",1.3]},
  "Nóng nảy":{rivalUp:["chanh",1.6],otherKid:["chanh",1.6]},"Thật thà":{rivalUp:["chanh",.6]},"Kín đáo":{selfUp:["chuyentam",.8]}},
 /* a consort's quiet life: chance % a tuần of one small feeling by trait (true cause words; SECRET class) */
 life:{o:30,v:22,by:{"Ân cần":["tinhnghich","chơi đùa với cung nữ trong vườn"],"Kín đáo":["chuyentam","chép kinh trọn một quyển"],"Khiêm nhường":["chuyentam","thêu xong bức hoa"],
  "Kiêu ngạo":["tutin","được khen dung mạo trong buổi thỉnh an"],"Tham vọng":["hanghai","lo liệu việc cung đâu ra đấy"],"Trọng nghĩa":["vui","được bạn cũ gửi thư"],
  "Mê tín":["lo","nằm mộng thấy điềm lạ"],"Nóng nảy":["khochiu","trời oi bức khó ngủ"],"Ham lợi":["vui","được nhà gửi bạc vào"],def:["hungkhoi","ngắm hoa trong vườn"]}},
 /* INTENT (ý đồ). from = min level of a source kind; bar = the person's bar at or under this; o = odds a buổi (+ trait points tr), clamped BAL.odds;
    dur = khắc it lasts, renewed while the source holds; fade = khắc after the source is gone; show: face odds = o − Tâm cơ × tc (clamped BAL.odds,
    one hashed draw per viewer per day); w = act weights while it lasts (the old Toan tính weights), danger = added to danger toward the target */
 intent:{from:{chanh:2,gian:2,hon:2},bar:-25,o:25,
  tr:{"Xảo quyệt":20,"Tham vọng":15,"Thù dai":15,"Kiêu ngạo":5,"Nóng nảy":5,"Ân cần":-25,"Khiêm nhường":-15,"Trọng nghĩa":-15,"Thật thà":-10,"Rộng lượng":-20},
  dur:48,fade:16,show:{o:70,tc:.6},w:{frame:1.5,plant:1.5,ally:1.3,bribe:1.5,bribeksp:1.5,feign:1.6,rumor:1.3,provoke:.8},danger:8}
,
 /* ACTS (outbursts, owner 19:25Z): fire when ONE kind is at the heavy level AND the bar is past the line on its side (hers: |S.mood.v| ≥ BAL.ea.out.v;
    others: their moodBar past BAL.ea.npc.bar.out — the jemoact lines, one source), odds o % a buổi × temper (BAL.ea.out.t), cooldown cd khắc per
    group, at most meWk of hers a tuần. g = feeling → reaction group of the ONE reaction table (jemoact R_, EA_REACT); kh = khắc an act lasts (the face shows
    it), by reaction key, "buoi" = to the end of the buổi, def = any other; face = seal art key of an act (else the feeling's). fx = the new reactions' gain / loss. */
 act:{o:35,meWk:2,def:2,
  /* the owner's own pairs (OD 18:33Z: "giận thì đập đồ ... buồn thì ... khóc"): the main act of a kind is taken with odds mainP % when the person's nết allows it, else the nết picks */
  main:{buon:"khoc",gian:"dapdo",lo:"matngu",so:"tron",hothen:"caobenh",chan:"bodo",hon:"bove",vui:"thuong",tinhtu:"moi"},mainP:60,cd:{def:24,buon:24,gian:24,so:36,tron:36,hothen:48,chan:24,hon:24,ghen:24,vui:48,tinhtu:72},
  g:{buon:"buon",gian:"gian",lo:"so",so:"tron",hothen:"hothen",chan:"chan",hon:"hon",chanh:"ghen",vui:"vui",tinhtu:"tinhtu"},
  kh:{khoc:1,tui:1,sk:1,dapdo:1,mang:1,danh:1,khac:1,pham:1,noi:1,quo:1,boan:4,thu:1,matngu:"buoi",emat:"buoi",soat:2,cau:2,cham:1,thuong:1,khoe:1,tiec:2,hat:2,ban:1,eyen:2,
   tron:"buoi",caobenh:"buoi",bodo:2,bove:2,moi:2,okhoc:1,kquay:1,kbo:2},
  face:{khoc:"khoc",tui:"khoc",okhoc:"khoc",kquay:"khoc",dapdo:"phanno",mang:"phanno",danh:"phanno",khac:"phanno",pham:"phanno",noi:"phanno",quo:"phanno",cai:"phanno",
   qgian:"phanno",matngu:"matngu",emat:"matngu",tron:"runso",soat:"runso"},
  fx:{tron:{vent:12,danh:1},caobenh:{vent:12,danh:1},bodo:{vent:10,tai:1},bove:{vent:12,rel:5},moi:{vent:8,sung:2,ghen:2,oan:2}}}}});
const FEEL_KEY_CHANH="chanh";
/* VANPHONG names (player words): light / middle name, heavy-level name, level words */
const FEEL_N={vui:"Vui",tutin:"Tự tin",hanghai:"Hăng hái",tinhtu:"Tình tứ",chuyentam:"Chuyên tâm",hungkhoi:"Hứng khởi",tinhnghich:"Tinh nghịch",binh:"Bình thản",
 buon:"Buồn",gian:"Giận",lo:"Lo âu",so:"Sợ",hothen:"Hổ thẹn",chan:"Chán chường",khochiu:"Khó chịu",choang:"Choáng váng",hon:"Hờn dỗi",chanh:"Chạnh lòng"};
const FEEL_HEAVY={vui:"Hân hoan",buon:"Đau khổ",gian:"Phẫn nộ",lo:"Bấn loạn",so:"Khiếp đảm",hothen:"Nhục nhã"};
const FEEL_LVN=["","nhẹ","vừa","nặng"];
const FEEL_INTENT_N="Toan tính";
/* seal art keys while the new paintings are missing (Foreman C ROOT-8 order 19:26Z): new key → an existing seal (never drawn here) */
const FEEL_FB={tutin:"vui",hanghai:"vui",tinhtu:"vui",chuyentam:"binh",hungkhoi:"vui",tinhnghich:"vui",hothen:"buon",chan:"buon",khochiu:"lo",choang:"lo",
 hon:"gian",chanh:"ghen",khoc:"dau",phanno:"gian",runso:"so",matngu:"lo",toantinh:"muu"};
/* ONE group map for every older table keyed by the old 9 kinds (EMO_* shapes, reaction groups, colours, flavours, trong/why factors):
   a new kind reads the table entry of its nearest old kind. feelGrp(k) → that key; feelIn(T,k) → k when T has it, else its group key. */
const FEEL_G={tutin:"vui",hanghai:"vui",tinhtu:"vui",hungkhoi:"vui",tinhnghich:"vui",chuyentam:"binh",hothen:"buon",chan:"buon",khochiu:"gian",choang:"so",hon:"gian",chanh:"ghen"};
function feelGrp(k){return FEEL_G[k]||k}
function feelIn(T,k){return T&&k in T?k:feelGrp(k)}
function feelBad(k){try{return (BAL.feel.sg[k]||0)<0}catch(e){return false}}
function feelGood(k){try{return (BAL.feel.sg[k]||0)>0}catch(e){return false}}
window.feelGrp=feelGrp;window.feelIn=feelIn;window.feelBad=feelBad;window.feelGood=feelGood;
const FEEL={stat:{conv:{},mig:0,lvl:[0,0,0,0],od:0,odSum:0,fiBorn:0,fiEnd:{acted:0,exposed:0,faded:0},fiSeen:0,life:0,ev:{}},cur:null};
function feelOn(){try{return !!(typeof S!=="undefined"&&S&&BAL.feel&&!window.__feelOff)}catch(e){return false}}
function feelWorld(){try{return typeof worldOn!=="function"||!!worldOn()}catch(e){return true}}
const fB=()=>BAL.feel;
/* ---------- 1. THE SET ---------- */
(function(){try{
 for(const k of ["dau","muu","khoc"])delete EMO[k];if(FEEL_KEY_CHANH!=="ghen")delete EMO.ghen;
 Object.assign(EMO,FEEL_N);
 const B=fB();Object.assign(EMO_W,B.w);Object.assign(EMO_OD,B.odAll);Object.assign(EMO_LOY,B.loy);for(const k in FEEL_N){if(EMO_NIGHT[k]==null)EMO_NIGHT[k]=1;if(EMO_DECAY[k]==null)EMO_DECAY[k]=Number.MIN_VALUE}
 if(BAL.mood&&BAL.mood.emo)for(const k in B.mood)if(BAL.mood.emo[k]==null)BAL.mood.emo[k]=B.mood[k];
 if(BAL.mood&&BAL.mood.emo&&BAL.mood.emo[FEEL_KEY_CHANH]==null)BAL.mood.emo[FEEL_KEY_CHANH]=BAL.mood.emo.ghen!=null?BAL.mood.emo.ghen:-.2;
 if(BAL.mood2&&BAL.mood2.dur)for(const k in B.dur)if(BAL.mood2.dur.k[k]==null)BAL.mood2.dur.k[k]=B.dur[k];
 if(BAL.mood2&&BAL.mood2.dur&&BAL.mood2.dur.k[FEEL_KEY_CHANH]==null)BAL.mood2.dur.k[FEEL_KEY_CHANH]=BAL.mood2.dur.k.ghen||12;
 Object.assign(EMO_EV,B.ev);
 for(const t in B.tr)EMO_TR[t]=Object.assign(EMO_TR[t]||{},B.tr[t]);
}catch(e){console.error("jfeel set",e)}})();
/* an old key → the set: [key, strength] or null (no feeling) */
function feelConv(k,v){const O=fB().old;if(!(k in O))return[k,v];const n=O[k];FEEL.stat.conv[k]=(FEEL.stat.conv[k]||0)+1;if(!n)return null;
 if(k==="dau")return[n,Math.max(v,fB().lv[2])];return[n,v]}
/* the ONE entry point: every emoSet of every module (old keys too) lands in the set */
(function(){if(typeof emoSet!=="function")return;const s0=emoSet;emoSet=function(p,k,v,why,t){try{if(feelOn()&&k in fB().old){const c=feelConv(k,v);if(!c)return;arguments[1]=c[0];arguments[2]=c[1]}}catch(e){}return s0.apply(this,arguments)}})();
/* stored causes (old saves, legacy writers of p.emo): converted once per person */
function feelMig(p){if(!p||p.__feelMig)return;p.__feelMig=1;FEEL.stat.mig++;const O=fB().old;
 if(Array.isArray(p.mk))p.mk=p.mk.filter(m=>{if(!m||!m.k||!(m.k in O))return true;const c=feelConv(m.k,m.s||0);if(!c)return false;m.k=c[0];m.s=c[1];return true});
 if(Array.isArray(p.emoH))for(const h of p.emoH)if(h&&h.k in O){const c=feelConv(h.k,h.v||0);h.k=c?c[0]:"binh";if(c)h.v=c[1]}
 const e=p.emo;if(e&&e.k in O){const c=feelConv(e.k,e.v||0);if(!c)p.emo=null;else{e.k=c[0];e.v=c[1]}}
 if(p.__mkL&&p.__mkL.k in O)p.__mkL=null;p.__mkAt=undefined/* re-sum the seal on the next read */}
(function(){if(typeof mkSync!=="function")return;const m0=mkSync;mkSync=function(p){try{if(feelOn()&&p&&!p.__feelMig)feelMig(p)}catch(e){}return m0.apply(this,arguments)}})();
(function(){if(typeof emoGet!=="function")return;const g0=emoGet;emoGet=function(p){try{if(feelOn()){const q=emoRes(p);if(q&&!q.__feelMig)feelMig(q)}}catch(e){}return g0.apply(this,arguments)}})();
/* ---------- 2. LEVELS ---------- */
function feelSums(p){const q=emoRes(p);const o={};if(!q)return o;try{if(typeof mkOn==="function"&&mkOn()){mkSync(q);const now=mkNow();for(const m of q.mk||[])if(m.k&&EMO[m.k]&&m.s>0&&m.k1>now)o[m.k]=(o[m.k]||0)+m.s}
 else{const e=q.emo;if(e&&EMO[e.k]&&e.v>0)o[e.k]=e.v}}catch(e){}for(const k in o)o[k]=Math.min(100,Math.round(o[k]));return o}
function feelLvOf(s){const L=fB().lv;return s>=L[2]?3:s>=L[1]?2:s>=L[0]?1:0}
function feelLv(p,k){return feelLvOf(feelSums(p)[k]||0)}
function feelName(k,lv){return lv>=3&&FEEL_HEAVY[k]?FEEL_HEAVY[k]:FEEL_N[k]||EMO[k]||""}
/* the bar of anyone: hers = S.mood.v (jmood); others = Σ sign × summed strength × bar.k */
function feelBar(p){const q=emoRes(p);if(!q)return 0;if(typeof moodBar==="function"){try{return moodBar(q)}catch(e){}}/* MOOD-MEM step 0: ONE signed bar for everyone */if(q===S)return S.mood&&typeof S.mood.v==="number"?S.mood.v:0;const B=fB();let b=0;const o=feelSums(q);for(const k in o)b+=(B.sg[k]||0)*o[k];return Math.max(-100,Math.min(100,Math.round(b*B.bar.k)))}
window.feelSums=feelSums;window.feelLv=feelLv;window.feelBar=feelBar;window.feelName=feelName;
/* ---------- 3. EFFECTS ---------- */
/* odds points of p for an act named n (kit category); every feeling of p with a level, capped ±od.max */
function feelOdPts(p,n){if(!feelOn()||!p||!n)return 0;let c="";try{c=kitActCat(String(n).replace(/<[^>]+>/g,""))}catch(e){return 0}const D=fB().od,o=feelSums(p);let s=0;
 for(const k in o){const d=D[k];if(!d||!d.c.includes(c))continue;const lv=feelLvOf(o[k]);if(lv)s+=d.p[lv-1]}return Math.max(-D.max,Math.min(D.max,s))}
window.feelOdPts=feelOdPts;
/* NPC (and her ACT-table) acts: runAct names the act for odA */
(function(){if(typeof runAct!=="function")return;const r0=runAct;runAct=function(a,t,k){const o=FEEL.cur;try{FEEL.cur={a,n:(ACT[k]||{}).n||"",k,t}}catch(e){}try{const r=r0.apply(this,arguments);try{feelActed(a,t,k)}catch(e){}return r}finally{FEEL.cur=o}}})();
(function(){if(typeof odA!=="function")return;const o0=odA;odA=function(a,b){const r=o0.apply(this,arguments);try{const C=FEEL.cur;if(C&&C.a===a&&a){const m=feelOdPts(a,C.n);if(m){FEEL.stat.od++;FEEL.stat.odSum+=m;return Math.max(BAL.odds.lo,Math.min(BAL.odds.hi,r+m))}}}catch(e){}return r}})();
/* her deck cards: the static odds a.o carry the feeling points (shown = rolled; re-done when her feelings change) */
function feelDeck(){if(!feelOn()||!Array.isArray(typeof deck!=="undefined"?deck:null))return;for(const a of deck){if(!a||a.o==null||a.o>=100||a.exam)continue;const m=feelOdPts(S,a.n);const f=a.__fo||0;if(m===f)continue;
 a.o=Math.max(BAL.odds.lo,Math.min(BAL.odds.hi,a.o-f+m));a.__fo=m}}
(function(){if(typeof render==="function"){const r0=render;render=function(){try{feelDeck()}catch(e){}return r0.apply(this,arguments)}}})();
/* "Vì sao <bậc>?": one row naming her feelings that move this card */
(function(){if(typeof kitWhyHtml!=="function")return;const k0=kitWhyHtml;kitWhyHtml=function(b,lv){let h=k0.apply(this,arguments);try{if(!h||!feelOn()||!b||!b.dataset||b.dataset.i==null)return h;const a=deck[+b.dataset.i];if(!a||!a.__fo)return h;
  const o=feelSums(S),D=fB().od;let c="";try{c=kitActCat(String(a.n).replace(/<[^>]+>/g,""))}catch(e){}const names=Object.keys(o).filter(k=>D[k]&&D[k].c.includes(c)&&feelLvOf(o[k])).map(k=>feelName(k,feelLvOf(o[k])).toLowerCase());
  const row=`<div class="kpopx"><span class="ef ${a.__fo>0?"g":"r"}">Cảm xúc ngươi: ${names.join(", ")}: ${whyStep(a.__fo)}</span></div>`;const i=h.indexOf("</div>");return i<0?h+row:h.slice(0,i+6)+row+h.slice(i+6)}catch(e){}return h}})();
/* Tình tứ: the Emperor's tablet chance; joy: thiện cảm gains toward the joyful one */
(function(){if(typeof nightCh!=="function")return;const n0=nightCh;nightCh=function(p){const c=n0.apply(this,arguments);try{if(feelOn()&&c){const lv=feelLv(p||S,"tinhtu");if(lv)return Math.max(1,Math.round(c*fB().night.tinhtu[lv-1]))}}catch(e){}return c}})();
(function(){if(typeof affAdd!=="function")return;const a0=affAdd;affAdd=function(x,y,n){try{if(feelOn()&&y&&x&&x!==y&&n>0){const lv=feelLv(y,"vui");if(lv){arguments[2]=Math.round(n*(1+fB().aff.vui[lv-1]))}}}catch(e){}return a0.apply(this,arguments)}})();
/* ---------- new feelings from real events (her acts; slaps; illness; long confinement; a consort's quiet life) ---------- */
function feelEv(p,ev,why,t){try{if(feelOn()&&typeof emoEv==="function"){FEEL.stat.ev[ev]=(FEEL.stat.ev[ev]||0)+1;emoEv(p,ev,why,t)}}catch(e){}}
(function(){if(typeof runOpt!=="function")return;const r0=runOpt;runOpt=function(a){const rolled=!!(a&&a.o!=null&&a.o<100&&!a.exam);const r=r0.apply(this,arguments);
 try{if(rolled&&(r===true||r===false)&&feelOn()){const n=String(a.n||"").replace(/<[^>]+>/g,"").slice(0,40);let c="";try{c=kitActCat(n)}catch(e){}
  if(r){if(c==="hoc-tap")feelEv(S,/đàn|thơ|vẽ|họa|múa|ca|hát/i.test(n)?"artOk":"studyOk",`${n} thuận lợi`);else if(c==="cham-con")feelEv(S,"kidPlay",`${n} vui vẻ`);
   else if(c==="nghi-ngoi")feelEv(S,"restOk",`${n}, người khỏe khoắn`)}
  else if(/thi |đối đáp|tranh|trước mặt/i.test(n))feelEv(S,"shamed",`${n} thất bại trước mặt người khác`)}}catch(e){}return r}})();
(function(){if(typeof slapGive!=="function")return;const g0=slapGive;slapGive=function(p,by){const r=g0.apply(this,arguments);try{if(r&&p&&feelOn()){feelEv(p,"slap",`bị ${by?emoName(by):"người ta"} tát`,by?emoKey(by):null);feelEv(p,"dazed",`bị ${by?emoName(by):"người ta"} tát`)}}catch(e){}return r}})();
function feelLife(){if(!feelOn()||!feelWorld())return;const L=fB().life;for(const v of (typeof liveRivals==="function"?liveRivals(true):[])){if(!v||!v.alive||v.out||v.coop)continue;
  if(!roll(L.o))continue;const T=emoTraits(v);let d=null;for(const t of T)if(L.by[t]){d=L.by[t];break}d=d||L.by.def;emoSet(v,d[0],L.v,d[1]);FEEL.stat.life++}}
/* ---------- 4. INTENT (ý đồ) ---------- */
function feelTc(p){try{if(p===S)return S.tamco||0;return p.tamco!=null?p.tamco:typeof nv==="function"?nv(p,"tamco")||0:0}catch(e){return 0}}
function feelIntentOn(p){const f=p&&p.fi;if(!f)return null;const now=mkNow();if(f.k1<=now){feelIntentEnd(p,"faded");return null}return f}
function feelIntentEnd(p,why){if(!p||!p.fi)return;FEEL.stat.fiEnd[why]=(FEEL.stat.fiEnd[why]||0)+1;p.fi=null}
/* a buổi: is an intent born / renewed / fading? NPCs only (her schemes are the player's own choices) */
function feelIntentTick(p){if(!p||p===S)return;const B=fB().intent,now=mkNow();const o=feelSums(p);let src=null,lv=0;
 for(const k in B.from){const l=feelLvOf(o[k]||0);if(l>=B.from[k]&&l>lv){lv=l;src=k}}
 const f=feelIntentOn(p);
 if(f){if(src&&f.from===src){f.k1=Math.max(f.k1,now+B.dur);return}if(!src&&!f.gone){f.gone=1;f.k1=Math.min(f.k1,now+B.fade)}return}
 if(!src||feelBar(p)>B.bar)return;let t=null;try{const now2=mkNow();const c=(p.mk||[]).filter(m=>m.k===src&&m.t!=null&&m.k1>now2).sort((a,b)=>b.s-a.s)[0];if(c)t=c.t}catch(e){}if(t==null)return;
 const tp=emoByKey(String(t));if(!tp||tp===p)return;
 let od=B.o;for(const tr of emoTraits(p))od+=B.tr[tr]||0;if(!roll(Math.max(BAL.odds.lo,Math.min(BAL.odds.hi,od))))return;
 p.fi={id:(S.fiN=(S.fiN||0)+1),t:String(t),from:src,k0:now,k1:now+B.dur};FEEL.stat.fiBorn++}
/* acted on: a harm act at the target ends it */
function feelActed(a,t,k){if(!a||!a.fi||!t)return;if(typeof EMO_HARM!=="undefined"&&EMO_HARM.includes(k)&&a.fi.t===emoKey(t))feelIntentEnd(a,"acted")}
/* exposed: punished */
(function(){if(typeof punish!=="function")return;const p0=punish;punish=function(p){const r=p0.apply(this,arguments);try{const q=typeof p==="string"?S:p;if(q&&q.fi&&feelWorld())feelIntentEnd(q,"exposed")}catch(e){}return r}})();
/* while it lasts: the old scheming weights and danger toward the target */
(function(){if(typeof persW!=="function")return;const w0=persW;persW=function(p,act){const w=w0.apply(this,arguments);try{if(feelOn()&&p&&p!==S&&feelIntentOn(p)){const m=fB().intent.w[act];if(m)return w*m}}catch(e){}return w}})();
(function(){if(typeof danger!=="function")return;const d0=danger;danger=function(v,t){const d=d0.apply(this,arguments);try{if(feelOn()&&v&&t){const f=feelIntentOn(v);if(f&&f.t===emoKey(t))return d+fB().intent.danger}}catch(e){}return d}})();
/* does viewer x see it on p's face? odds vs p's Tâm cơ, one hashed draw per viewer per intent per day */
function feelIntentSeen(p,x){const f=feelIntentOn(p);if(!f)return false;x=x||S;if(x===p)return true;const B=fB().intent.show;const o=Math.max(BAL.odds.lo,Math.min(BAL.odds.hi,Math.round(B.o-feelTc(p)*B.tc)));
 let hit=false;try{hit=knHit("fi|"+emoKey(x)+"|"+emoKey(p)+"|"+f.id+"|"+emoW(),o)}catch(e){hit=roll(o)}if(hit)FEEL.stat.fiSeen++;return hit}
window.feelIntentSeen=feelIntentSeen;
/* ---------- the clock: a buổi tick (intents, sulks) and a tuần tick (quiet life) ---------- */
function feelPeople(){try{return typeof mkAll==="function"?mkAll():[]}catch(e){return[]}}
function feelBuoi(){if(!feelOn()||S.dead)return;try{feelActTick(S)}catch(e){console.error(e)}if(!feelWorld())return;for(const p of feelPeople()){if(p!==S)try{feelActTick(p)}catch(e){}try{feelIntentTick(p)}catch(e){}
  try{const lv=feelLv(p,"hon");if(lv&&p!==S){const now=mkNow();const m=(p.mk||[]).find(x=>x.k==="hon"&&x.t!=null&&x.k1>now);const t=m&&emoByKey(String(m.t));const d=fB().honDrift[lv-1];if(t&&t!==p&&d&&typeof affAdd==="function")affAdd(p,t,d)}}catch(e){}}}
/* one tick a buổi (render sees the buổi change; host / single player only) and the quiet life once a tuần */
(function(){if(typeof render!=="function")return;const r0=render;render=function(){try{if(feelOn()&&!S.dead){const w=emoW(),b=w*10+(S.buoi||0);if(FEEL.b==null)FEEL.b=b;else if(FEEL.b!==b){const wOld=Math.floor(FEEL.b/10);FEEL.b=b;feelBuoi();if(w!==wOld)feelLife()}}}catch(e){console.error("jfeel",e)}return r0.apply(this,arguments)}})();
/* ---------- ACTS: heavy level + bar past the line → one act from the ONE reaction table; a short khắc timer (the face shows it) + cooldown ---------- */
(function(){try{const R=window.EA_REACT;if(!Array.isArray(R))return;const has=k=>R.some(r=>r.k===k&&r.who==="c");
 if(!has("tron"))R.push({k:"tron",g:"tron",who:"c",n:"Trốn trong phòng",art:"xa-huong",ok:()=>true,w:()=>1},{k:"caobenh",g:"hothen",who:"c",n:"Cáo bệnh không dự",art:"xa-huong",ok:()=>true,w:()=>1},
  {k:"bodo",g:"chan",who:"c",n:"Bỏ dở việc đang làm",art:"xa-huong",ok:()=>true,w:()=>1},{k:"bove",g:"hon",who:"c",n:"Bỏ về, không tiếp",art:"dap-tra-mia-h",ok:p=>!!feelHonT(p),w:()=>1},
  {k:"moi",g:"tinhtu",who:"c",n:"Mời Hoàng thượng ghé cung",art:"dang-tra",ok:p=>!!S.emp&&!(p===S?S.confined:p.confined),w:()=>1})}catch(e){}})();
function feelHonT(p){try{const now=mkNow();const m=(p.mk||[]).filter(x=>x.k==="hon"&&x.t!=null&&x.k1>now).sort((a,b)=>b.s-a.s)[0];const t=m&&emoByKey(String(m.t));return t&&t!==p?t:null}catch(e){return null}}
function feelLine(p,good){const L=p===S?(BAL.ea.out.v||45):((BAL.ea.npc&&BAL.ea.npc.bar&&BAL.ea.npc.bar.out)||25);return good?L:-L}
function feelActDur(k,g){const A=fB().act,now=mkNow();let d=A.kh[k];if(d==null)d=A.def;if(d==="buoi"){const KH=J95.KH;return KH-(now%KH)}return d}
/* the gains / losses of the new reactions (the old ones: jemoact eaDo) */
function feelDo(p,r){const me=p===S,F=fB().act.fx[r.k];if(!F)return window.eaDo(p,r);const res=[];let h="",target=null;const add=t=>res.push(t);
 const pay=o=>{if(me)apply(o);else ap(p,o);for(const k in o){const lb={danh:"Danh",tai:"Tài",sung:"Sủng",bac:"Bạc",suc:"Sức"}[k];if(o[k]&&lb)add(me?`${lb} ${o[k]>0?"+":"−"}${Math.abs(o[k])}`:"")}};
 switch(r.k){
 case"tron":pay({danh:-F.danh});h=me?"Lòng sợ hãi chưa yên, ngươi đóng cửa tẩm cung, cả buổi không dám bước ra.":`${emoName(p)} đóng cửa trốn trong phòng cả buổi.`;break;
 case"caobenh":pay({danh:-F.danh});h=me?"Xấu hổ chẳng dám nhìn ai, ngươi sai người báo bệnh, không đến thỉnh an.":`${emoName(p)} cáo bệnh, không đến thỉnh an.`;break;
 case"bodo":pay({tai:-F.tai});h=me?"Lòng chán chường, việc đang làm dở ngươi cũng bỏ ngang.":`${emoName(p)} bỏ dở việc đang làm.`;break;
 case"bove":{const t=feelHonT(p);if(!t)return null;target=t;try{relAdd(p,t,-F.rel)}catch(e){}if(me)add(`${t===S.emp?"Hoàng thượng":emoName(t)} thiện cảm −${F.rel}`);
  h=me?`Còn hờn ${t===S.emp?"Hoàng thượng":emoName(t)}, ngươi bỏ về, không muốn tiếp.`:`${emoName(p)} còn hờn ${t===S?"ngươi":emoName(t)}, bỏ về không tiếp.`;break}
 case"moi":pay({sung:F.sung});if(me){try{ghenAll(F.ghen)}catch(e){}add("các phi tần ganh ghét thêm")}else{try{for(const x of liveRivals(true))if(x!==p&&x.alive)oanAdd(x,p,F.oan)}catch(e){}}
  h=me?"Lòng xao xuyến, ngươi sai người dâng trà mời Hoàng thượng ghé cung.":`${emoName(p)} sai người mời Hoàng thượng ghé cung.`;break}
 try{if(me)ventMe((S.mood&&S.mood.v>0?-1:1)*F.vent,r.n);else ventNpc(p,F.vent)}catch(e){}
 return{h,res:res.filter(Boolean),target}}
function feelActTick(p){const A=fB().act;if(!p||feelActNow(p))return;const me=p===S;if(!me&&!feelWorld())return;
 const o=feelSums(p);let k=null;for(const x in A.g)if(feelLvOf(o[x]||0)>=3&&(!k||o[x]>o[k]))k=x;if(!k)return;
 const good=feelGood(k),bar=feelBar(p),L=feelLine(p,good);if(good?bar<L:bar>L)return;
 const g=A.g[k],now=mkNow();p.fcd=p.fcd||{};if((p.fcd[g]||-1)>now)return;
 if(me){const E=eaS2(),w=emoW();if(E.w!==w){E.w=w;E.n=0}if(E.n>=A.meWk)return;if(typeof isSrv==="function"&&isSrv())return}
 let T={k:"even"};try{T=eaTemper(p)}catch(e){}if(!roll(A.o*((BAL.ea.out.t||{})[T.k]||1)))return;
 let P=null;try{const mk=A.main[k];const mr=mk&&window.EA_REACT.find(r=>r.k===mk&&r.g===g&&r.who===eaKind(p)&&r.ok(p,T));if(mr&&roll(A.mainP))P={r:mr,T}}catch(e){}try{P=P||eaPick(p,g)||(g!==feelGrp(k)?eaPick(p,feelGrp(k)):null)||eaPick(p,{tron:"so",hothen:"buon",chan:"buon",hon:"ghen",tinhtu:"vui"}[g]||g)}catch(e){}if(!P)return;
 const r=P.r;let out=null;try{out=feelDo(p,r)}catch(e){console.error("feelDo",e)}if(!out)return;
 p.fa={k:r.k,n:r.n,g,face:A.face[r.k]||null,k0:now,k1:now+feelActDur(r.k,g)};p.fcd[g]=now+(A.cd[g]||A.cd.def);FEEL.stat.act=FEEL.stat.act||{};FEEL.stat.act[r.k]=(FEEL.stat.act[r.k]||0)+1;
 if(me){eaS2().n++;feelMeShow(r,out,k)}else try{eaSay(p,out.h,out.target===S)}catch(e){}}
function eaS2(){S.fa2=S.fa2||{w:-1,n:0};return S.fa2}
/* her act: the kit event frame (the same shape as every jemoact outburst) with only "Tiếp tục" */
function feelMeShow(r,o,k){try{log(`${r.n}: ${o.h}${o.res.length?` (${o.res.join(", ")})`:""}`)}catch(e){}if(window.__bot||typeof Q==="undefined")return;
 Q.push({t:r.n,art:`img/act-${r.art||"xa-huong"}.webp`,hideOut:true,h:`<p>${o.h}</p><p>Vì ${feelName(k,3).toLowerCase()} quá nên lòng không giữ được; muốn tránh thì nên giữ lòng bình thản từ sớm.</p>${o.res.length?`<p class="past">${o.res.join(" · ")}</p>`:""}`,
  opts:[{n:"Tiếp tục",fx:{},hideOut:true,hint:"không đổi gì thêm",risk:"an toàn",go:()=>{}}]})}
window.feelActTick=feelActTick;
/* ---------- 5. VẺ MẶT: the ONE seal key (act > visible intent > feeling) + the tap-card lines ---------- */
function feelActNow(p){const a=p&&p.fa;if(!a)return null;try{if(a.k1<=mkNow()){p.fa=null;return null}}catch(e){return null}return a}
function faceKeyFor(pid,viewer){try{if(!S)return null;const p=typeof mckRes==="function"?mckRes(pid):emoRes(pid);if(!p)return null;const x=viewer||S;
 const e=emoGet(p);const k=e&&e.k||"binh";const lv=k==="binh"?0:feelLv(p,k);const lines=[];
 const act=feelActNow(p),fi=p!==S&&feelIntentSeen(p,x);
 if(act)lines.push(`Đang: ${act.n}`);if(k!=="binh"&&lv)lines.push(`Cảm xúc: ${feelName(k,lv)} (${FEEL_LVN[lv]})`);if(fi)lines.push(`Vẻ mặt: ${FEEL_INTENT_N}`);
 let r;if(act)r={kind:"act",key:act.face||k,level:lv,name:act.n};else if(fi)r={kind:"intent",key:"toantinh",level:0,name:FEEL_INTENT_N};else r={kind:"feel",key:k,level:lv,name:k==="binh"?FEEL_N.binh:feelName(k,lv)};
 r.fb=FEEL_FB[r.key]||null;r.lines=lines;FEEL.stat.lvl[lv]++;return r}catch(er){return null}}
window.faceKeyFor=faceKeyFor;window.FEEL_N=FEEL_N;window.FEEL_FB=FEEL_FB;
window.feelStat=()=>JSON.parse(JSON.stringify(FEEL.stat));
