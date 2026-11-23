/* ONE per-life registry (review/newlife-reset, owner bug 17/11): S and rivals are rebuilt by start() / deser(); every OTHER store that belongs to one
   life (module-level lets, window.* holding people, timers, scenes) registers itself here: lifeStore(name, reset). j93 kmReset runs every reset on
   start() (new game, Luân hồi rebirth, co-op new life), on a slot load and on the title screen. LIFE_STORES = the names (dev/test/newlife-leak.js
   checks no store outside this list still holds the old life). Static caches of art / words (KAK_C, KIT_TONE_CACHE, PETC_CACHE…) need no entry. */
const LIFE_REG=[],LIFE_STORES=window.LIFE_STORES=[];function lifeStore(n,f){LIFE_REG.push([n,f]);LIFE_STORES.push(n)}lifeStore("__kitLastEvArt",()=>{window.__kitLastEvArt=null});
const RANKS=[
 {n:"Đáp ứng",s:0,d:0},{n:"Thường tại",s:15,d:10},{n:"Quý nhân",s:25,d:20},{n:"Tần",s:38,d:30},
 {n:"Phi",s:52,d:42},{n:"Quý phi",s:66,d:55},{n:"Hoàng quý phi",s:78,d:68},{n:"Hoàng hậu",s:85,d:78}];
/* palace heads (chủ vị): Tần, Phi, Quý phi, Hoàng quý phi (owner 11/14, OWNER_DECISIONS) — rank index ≥ PAL_HEAD */
const PAL_HEAD=3;
/* KIT 1.3 · THE ONE RANK PALETTE (owner 11/16 13:00Z "nhạt nhòa quá → tươi hơn"; jewel tones): every rank colour in the game is read from here (ring, halo, chips, card colour, portrait ground
   .rk-cN, text tone via kitToneOf in jk4). Vivid bases, same colour family per rank; text on paper is DERIVED (kitToneOf), never typed again. Nobody keeps a copy. */
const RCOL=["#eae3d0","#7fb394","#7e9ccb","#e3a3b8","#a88bcb","#e3a25b","#d46a64","#efbd69"];/* B24 ONE rank colour system (owner Lượt 726/728): t1 Đáp ứng cream-ivory, t2 Thường tại green, t3 Quý nhân blue, t4 Tần hồng phấn, t5 Phi purple, t6 Quý phi orange, t7 Hoàng quý phi red, t8 Hoàng hậu gold */
const RCOL_COLD="#8fa3b8";/* Lãnh cung / Phế phi: cool steel grey */
window.MRCOL=["#3aa38f","#00bf94","#2f6fff","#ff4a1c","#9b4dff"];/* maids: thô sử grey-jade, cung nữ jade, đại cung nữ blue, chưởng sự cô cô terracotta, nữ quan violet */
window.ERCOL=["#6fb03a","#12b35a","#1f8fe0","#d9601a"];/* eunuchs: tiểu thái giám sage, thái giám green, thủ lĩnh steel blue, tổng quản bronze */
const KIT_IMP="#ffd400";/* ONE imperial yellow token (owner 11/16 16:10Z: "màu vàng của hoàng gia, màu vàng tươi") for Hoàng thượng AND Hoàng thái hậu; kitToneOf keeps it as is, the ink edge is in jk4 */
const KIT_ROLE={emp:KIT_IMP,th:KIT_IMP,ty:"#12b5ac",prince:"#1f9be8",princess:"#f0543c",stranger:"#6e7681",official:"#3a6fe0",guard:"#5879a8",mama:"#b97a2a",slate:"#5a7a9a"};/* non-rank roles (never pink/purple for men) */
const ORIGINS=[
 {k:"tt",n:"Con gái Tể tướng",r:2,o:{danh:25,bac:150},hh:-15,th:5,t:"Nhà quyền thế. Hoàng hậu coi ngươi là mối lo."},
 {k:"dtq",n:"Con gái Đại tướng quân",r:1,o:{danh:15,suc:100,bac:80},hh:0,th:0,t:"Cha giữ binh quyền biên ải. Thân thể khỏe mạnh."},
 {k:"muoi",n:"Con gái nhà buôn muối",r:0,o:{bac:320},hh:0,th:-5,t:"Giàu mà xuất thân thấp. Có bạc để mua lòng người."},
 {k:"cn",n:"Cung nữ được sủng hạnh",r:1,o:{sung:20,bac:60,danh:6,suc:10},hh:0,th:5,ally:1,t:"Từng hầu trà ở Càn Thanh cung. Quen biết khắp đám cung nhân."},
 {k:"nc",on:"Công chúa hòa thân",land:"Cao Ly",n:"Công chúa nước Cao Ly hòa thân",r:3,o:{danh:30,bac:120},hh:0,th:-15,t:"Người nước phiên. Thái hậu không ưa."},
 {k:"td",n:"Con gái tội thần",r:0,o:{bac:70,sung:10,thu:1,tamco:15,tai:15,danh:6},hh:0,th:0,ally:1,t:"Cả nhà bị xử trảm. Ngươi vào cung để báo thù."},
 {k:"ch",n:"Cháu gái Thái hậu",r:2,o:{danh:20,bac:100},hh:-5,th:40,t:"Có Thái hậu chống lưng."},
 {k:"thd",n:"Con gái thầy đồ nghèo",r:0,o:{bac:20,tai:20,duc:10},hh:5,th:0,t:"Thơ văn hơn người, ngoài ra không có gì."}
];
/* HÒA THÂN = ONE origin with COUNTRY BRANCHES (owner OD:L1213–L1216): the roulette and every origin-level table show ONE card, the ORIGINS
   entry nc ("on" = the origin's own name, Công chúa hòa thân). A life plays one country branch: nc itself (Nam Chiếu) or a branch in ORIGIN_BR
   (jorigins adds bd = Bắc Địch). A branch keeps its own key for its own story road (STORY / QUEST67 / ARC67 bd_*, letters, close maid, home money);
   par = the origin it belongs to. The branch is rolled with the origin (j69, weights BAL.orig.br). Old saves with origin "bd" load through originByKey. */
const ORIGIN_BR={};
function originByKey(k){return ORIGINS.find(o=>o.k===k)||ORIGIN_BR[k]||null}
/* her start arts = the identity row (origin × road) of BAL.orig.art (law 4; road "" / unknown = the origin's own row); a fresh copy, never the table */
function originArts(k,road){try{const T=BAL.orig.art[k];if(!T)return{};return Object.assign({},(road&&T[road])||T[""]||{})}catch(e){return{}}}
function originRoot(k){const b=ORIGIN_BR[k];return b?b.par:k}
/* branch of origin k for a roll r in [0,1): weights BAL.orig.br[k] ({branch key: weight}); an origin without branches is itself */
function originBrPick(k,r){try{const W=BAL.orig.br[k];if(!W)return k;const L=Object.keys(W).filter(b=>W[b]>0&&originByKey(b));const tot=L.reduce((a,b)=>a+W[b],0);
 let x=r*tot;for(const b of L){x-=W[b];if(x<0)return b}return L.length?L[L.length-1]:k}catch(e){return k}}
const SURN=NM_SUR;/* one name core: jname.js */
const GIVEN=NM_F;
const MALEN=NM_M;
/* TRAITS = figure LOOK keys only (FIGURES.json trait tags via TRK) + old malice; nết come from the ONE pool BAL.net (jnet.js) */
const TRAITS=[["Xảo quyệt",80],["Kiêu ngạo",55],["Ân cần",15],["Kín đáo",45],["Tham vọng",65],["Khiêm nhường",25]];
/* ONE trait-label map (owner 17/11 05:35Z): "Hiểm độc" renamed "Xảo quyệt" everywhere the player reads it. Old saves/codes store the old word: deser() runs trMigrate() so they load as the new label (behaviour keys unchanged). Add future renames HERE only. */
const TRAIT_OLD={"Hiểm độc":"Xảo quyệt"};
function traitLabel(t){return TRAIT_OLD[t]||t}
function trMigrate(o){const OLD=Object.keys(TRAIT_OLD);const fx=s=>{for(const k of OLD)if(s.indexOf(k)>=0)s=s.split(k).join(TRAIT_OLD[k]);return s};
 const w=(x,d)=>{if(!x||typeof x!=="object"||d>40)return;if(Array.isArray(x)){for(let i=0;i<x.length;i++){const v=x[i];if(typeof v==="string")x[i]=fx(v);else w(v,d+1)}return}
  for(const k0 of Object.keys(x)){let k=k0;if(TRAIT_OLD[k0]&&!(TRAIT_OLD[k0] in x)){x[TRAIT_OLD[k0]]=x[k0];delete x[k0];k=TRAIT_OLD[k0]}const v=x[k];if(typeof v==="string"){const n=fx(v);if(n!==v)x[k]=n}else w(v,d+1)}};w(o,0);return o}
const SEASON=["Xuân","Xuân","Xuân","Hạ","Hạ","Hạ","Thu","Thu","Thu","Đông","Đông","Đông"];
const TUAN=["thượng tuần","trung tuần","hạ tuần"];
const MAIDS=NM_MAID;
const PRINCE=NM_PX;
const PRINCESS=NM_PRINCESS;
const NAMES={sung:"Sủng",danh:"Danh",bac:"Bạc",suc:"Sức",mat:"Tai mắt",th:"Thái hậu → ta: thiện cảm",hh:"Hoàng hậu → ta: thiện cảm",sac:"Sắc",tai:"Tài",tamco:"Tâm cơ",duc:"Đức",maid:"Thiện cảm của cung nữ"};
const ETRAITS={
 danghi:["Đa nghi","Mưu kế dễ bị lộ hơn, nhưng lời vu cáo khó gỡ hơn."],
 mesac:["Mê sắc","Sắc đẹp và tài múa nặng gấp đôi khi chọn thị tẩm."],
 trongtai:["Trọng tài","Cầm, Kỳ, Thi, Họa nặng gấp đôi."],
 hieuthao:["Hiếu thảo","Thái hậu không gật đầu thì không sắc phong."],
 nongnay:["Nóng nảy","Phạt nặng; sủng ái lên xuống thất thường."],
 nhantu:["Nhân từ","Hay khoan thứ; Đức của ngươi được coi trọng."],
 chamchinh:["Chăm chính sự","Ít thị tẩm; thích người bàn việc triều chính."],
 datinh:["Đa tình","Thị tẩm nhiều, rải khắp hậu cung; ai cũng ghen hơn."],
 lanhlung:["Lạnh lùng","Sủng lên chậm, phai cũng chậm."]};
const CLASH=[["nongnay","nhantu"],["chamchinh","datinh"],["datinh","lanhlung"]];
const ERA=["Thừa Bình","Vĩnh An","Khang Định","Hưng Long","Thiên Hựu","Gia Thịnh","Cảnh Hòa","Chính Đức"];
const MOODS=[["Vui","g"],["Bình thường",""],["Phiền muộn","r"],["Giận dữ","r"]];
const LIKES={flower:["mẫu đơn","hoa mai","hoa lan","hoa sen","hoa cúc"],music:["khúc Cao sơn lưu thủy","khúc Bình sa lạc nhạn","khúc Mai hoa tam lộng","khúc Xuân giang hoa nguyệt"],dish:["canh hạt sen","bánh hoa quế","cháo yến","gà hấp lá sen","chè long nhãn"]};
const LIKEN={flower:"Hoa",music:"Nhạc",dish:"Món"};
const ARTS=[
 {k:"cam",n:"Cầm",st:"tai",u:"Bậc 3: khúc Phượng cầu hoàng"},
 {k:"ky",n:"Kỳ",st:"tai",u:"Bậc 3: đánh cờ với Hoàng thượng"},
 {k:"thi",n:"Thi",st:"tai",u:"Bậc 3: mỗi tháng thơ đến tay Hoàng thượng, {sgRaw:tho.sung}"},
 {k:"hoa",n:"Họa",st:"tai",u:"Bậc 3: vẽ chân dung dâng Thái hậu"},
 {k:"vu",n:"Vũ",st:"sac",u:"Bậc 3: điệu Kinh hồng vũ"},
 {k:"y",n:"Y thuật & điều hương",st:"sac",u:"Bậc 2: nhận ra độc, xạ hương · Bậc 4: tự bào chế thuốc, chữa bệnh cho con"}];
ARTS.forEach(a=>sgRuleObj(a,"u"));/* r2 sg-card: «{sgRaw:tho.sung}» read from BAL when shown */
const NIGHTS=["Rèm the buông xuống, nến đỏ cháy đến canh tư. Sáng ra, Hoàng thượng ban cho ngươi một cây trâm ngọc.",
 "Tiếng mưa rơi trên mái ngói. Hoàng thượng ở lại đến khi trời hửng sáng.",
 "Ngài kể chuyện thuở còn là hoàng tử, rồi đèn lụi dần. Sáng hôm sau, cả hậu cung đều biết.",
 "Hương trầm vấn vít. Đêm ấy dài như một khúc đàn chưa dứt."];

const R=n=>Math.floor(Math.random()*n), pick=a=>a[R(a.length)];
const $=id=>document.getElementById(id);
const store={get(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let S,rivals,used=0,deck=[],tab="act",Q=[],rid=0,quiet=true,popIdx=null,popMsg="";
/* time: 3 buổi a tuần, 4 khắc a buổi; 'used' = khắc spent this buổi */
const BUOI=["Buổi sáng","Buổi chiều","Buổi tối"];let advLock=false;
function can(c){return !!S&&!S.dead&&used+c<=BAL.time.khac&&(c<=1||S.suc>=BAL.time.sucMin)}
function spend(c){used=Math.max(0,used+c)}
function pips(n){n=Math.max(0,Math.min(4,n));return `<span class="pip">${"●".repeat(n)}${"○".repeat(4-n)}</span>`}

function word(o){return KIT_ODDS[oddsLv(o)]}
/* TWO scales, never mixed (owner 11/14, coordinator 11/15): word() above = the 7-step ladder, ONLY for the act's own success/failure (the one
   word in the card corner / beside an option). Every side chance of something that comes along (có thai, được ban thưởng, lật thẻ, bị lộ,
   chết… in Được / Mất / Kèm, result cards, Sổ ghi, hints, the HUD) reads on the chance scale Rất thấp / Thấp / Vừa / Cao / Rất cao. Same numbers. */
function chanceLvl(n){return n<=0?"Không có":n<8?"Rất thấp":n<18?"Thấp":n<35?"Vừa":n<60?"Cao":"Rất cao"}
function chanceLo(n){return chanceLvl(n).toLowerCase()}
function chanceW(n){return n<=0?"không có khả năng":"khả năng "+chanceLo(n)}
const CHW=/khả năng (rất thấp|thấp|vừa|cao|rất cao)|không có khả năng/;
function cl(v,a,b){return Math.max(a,Math.min(b,v))}
/* ODDS CAP (owner 17/11 ~17:00Z + 17:35Z "Trần 95%, việc chắc ăn mà hỏng thì chỉ hỏng nhẹ"): nothing rolled is ever sure. ONE cap in BAL:
   BAL.odds.lo / hi (5 / 95). roll(o) = THE roll every chance in the game uses (hers and NPCs'): it never passes above hi. oddsCl(o) = an act's
   odds clamped to [lo, hi] (odA and every act odds). An act that used to be sure (o 100 or no o) now rolls at the cap (oddsOf) and fails
   SOFTLY through ONE path (j63 oddsSoft: khắc and effort spent, bạc kept, nothing gained); pure bookkeeping (oddsSure: a.fix, a shop list,
   opening a panel, an exam / minigame whose own play decides) is never rolled. */
function roll(o){return Math.random()*100<Math.min(o,BAL.odds.hi)}
function oddsCl(o){return cl(o,BAL.odds.lo,BAL.odds.hi)}
/* a.inner = the act's OWN inner roll decides (a cure, a check-up, a side risk): roll() caps that inner roll once, so the act is NOT
   gated again at the cap and shows no false Nắm chắc; a.oi (optional) = the inner odds shown as its word (review r1 2a). */
function oddsSure(a){return !!(a&&(a.fix||a.open||a.adShop||a.exam||a.aaMG||a.inner))}
function oddsCapped(a){return !!a&&(a.o==null||a.o>=100)&&!oddsSure(a)}
/* ONE odds of a card option (review/shown-odds-one-path): the card word (j19 cardH) and the roll (j2 runOpt) both read this */
function optOdds(a){const o=oddsOf(a);return o>=100?o:oddsCl(o+lotB(S,a.dom))}
function oddsOf(a){if(a&&a.inner)return a.oi!=null?oddsCl(+a.oi):100;const o=a.o==null?100:a.o;return o>=100?(oddsSure(a)?100:BAL.odds.hi):o}
/* capRes(ok, o) = a result that came from noise draws (a contest / exam score, not roll) keeps its odds inside the ONE cap: o = the raw odds
   of that result (0..100); above hi a win is undone with the right share, below lo a loss is turned with the right share, so P(ok) = oddsCl(o). */
function capRes(ok,o){o=+o||0;const H=BAL.odds.hi,L=BAL.odds.lo;if(o>H)return !!ok&&Math.random()*o<H;if(o<L)return !!ok||Math.random()*(100-o)<L-o;return !!ok}
function capW(){return word(BAL.odds.hi)}
function has(t){return S.emp.traits.includes(t)}
function mm(){return [10,0,-8,-15][S.emp.mood]}
function sg(n){if(!n)return 0;let f=has("nongnay")?1.3:1;if(n>0&&has("lanhlung"))f*=.7;const r=Math.round(n*f);return n>0?Math.max(1,r):r}
/* SG-CARD (law 4 + law 11, rv kit-opt-kem): HER Sủng written as a literal number in any card / option text («thành: Sủng +4») is drawn as the
   real change, through the same sg() apply() uses (Hoàng thượng nồng nàn ×1.3, lạnh lùng ×.7 on gains). A number already drawn through sg()
   (fmt, or an earlier sgTxt pass) carries a no-break space after «Sủng» and is never scaled twice. Someone else's Sủng — «nàng / nàng ta /
   hắn / <Tên> Sủng …», «của nàng», «nàng mất» — is applied raw (ap(v,…)) and stays raw. ONE rule: read by kitParse (every kit card), the
   hint model (jk2b kitOptModel) and the act lines (jaudit 15). */
const SG_NB="\u00a0";
function sgTxt(h){if(typeof h!=="string"||h.indexOf("Sủng")<0||typeof S!=="object"||!S||!S.emp)return h;
 /* r2: a RANGE «Sủng +2 đến +4» (also «..» / «–») scales BOTH ends — the first build scaled only the number after «Sủng» */
 return h.replace(/(^|[^\p{L}])(Sủng(?: ngươi| ta)?) ([+\-−])(\d+)(?:(\s*(?:đến|\.\.|–)\s*)([+\-−]?)(\d+))?/gu,(m,p,l,g,n,sep,g2,n2,off,all)=>{const pre=all.slice(Math.max(0,off-40),off+p.length);
  if(/nàng(?: ta)? mất|của nàng|nàng ta\s*$/.test(pre))return m;const w=pre.replace(/<[^>]*>/g,"").match(/(\p{L}+)\s*$/u);
  if(w&&(/^(nàng|hắn|y|thị)$/.test(w[1])||/^\p{Lu}/u.test(w[1])))return m;
  const sv=x=>`${x>0?"+":x<0?"-":""}${Math.abs(x)}`,v0=(g==="+"?1:-1)*+n,v=sg(v0);
  if(sep==null)return v===v0?m:`${p}${l}${SG_NB}${sv(v)}`;
  const u0=(g2?(g2==="+"?1:-1):(g==="+"?1:-1))*+n2,u=sg(u0);return v===v0&&u===u0?m:`${p}${l}${SG_NB}${sv(v)}${sep}${sv(u)}`})}
/* KLOW: numbers where a FALL is good for her (Áp lực hôn sự / Nợ nhà / Phe chủ chiến, Lời đồn) — coloured by meaning (OD:L908), here and in the result card (j63) */
const KLOW={kap:1,kld:1};function kGood(k,v){return KLOW[k]?v<=0:v>=0}
/* AG-ALL-2f3: ONE stat-preview text. A Tai mắt GAIN is not a number handed over (OD 17/11 ~16:50Z / ~17:00Z): it is N approaches to real people who each
   decide (jagknow tmTry) → "Tai mắt: ngỏ lời N người"; every other stat (and a Tai mắt loss) keeps "<Tên> ±N". Read by every preview formatter. */
/* AG-ALL-2f3 BALANCE: the eyes a formula reads. Since 2f r2 / 2f2 "Tai mắt" is the count of REAL people (typ. 0–3; NPCs ≈ 0.3 after 30 days,
   dev/measure/tm-count.js) where formulas were tuned on the old 0–10 stat: every odds / gate that weighs Tai mắt reads eyes(p) = count × BAL.ag.eye.w
   (cap BAL.ag.eye.cap). The chip / lists still show the real count (p.mat). window.__tmOff (old-stat test knob) reads the plain number. */
function eyes(p){if(!p)return 0;const n=+p.mat||0;if(window.__tmOff)return n;try{const E=BAL.ag.eye;return Math.min(E.cap,n*E.w)}catch(e){return n}}
function statTxt(k,v,lbl){const n=lbl||NAMES[k]||k;if(k==="mat"&&v>0)return `${n}: ngỏ lời ${v} người`;return `${n} ${v>0?"+":""}${v}`}
/* SG-CARD: her Sủng change v drawn through sg() — the no-break space marks it as already drawn, so sgTxt never scales it again */
/* sgNow(v): sg(v) when a game is loaded; before one (a card getter read at load, title screen) the number as written */
function sgNow(v){return typeof S==="object"&&S&&S.emp?sg(v):v}
function sgStat(v,lbl){const w=sgNow(v),t=statTxt("sung",w,lbl);return w!==v?t.replace(/ (?=[+\-−]?\d+$)/,SG_NB):t}
/* r2 (rv sg-card): the ONE printer of a Sủng change in a result / log line. sgOf(p,v): HER change is applied through sg() (apply / ap(S,…)) →
   print sg(v) (marked); someone else's (ap(v,…) raw) → print v. Never pass a MEASURED delta (S.sung after − before): print that as it is.
   sgRange(a,b): «Sủng +sg(a) đến +sg(b)» — both ends of a range drawn as applied (one number when they meet). */
/* sgFix(v): HER Sủng that is applied AS IS (not through sg — e.g. the monthly thơ, j3) — marked so sgTxt never rescales it */
function sgFix(v,lbl){const t=statTxt("sung",v,lbl);return t.replace(/ (?=[+\-−]?\d+$)/,SG_NB)}
/* sgRule: typed Sủng in a static RULE text (arts tiers ARTFX/ARTMS, ARTS.u) is a token read from BAL when the text is READ (tables load
   before BAL.deck): «{sg:deck.cam.w.sung}» = a change applied through sg (apply), «{sgRaw:tho.sung}» = applied as is, «{n:tho.sung}» = the
   bare signed number. sgRuleArr / sgRuleObj turn every element holding a token into a getter, so every reader gets the live number. */
function sgRule(s){return typeof s!=="string"||s.indexOf("{")<0?s:s.replace(/\{(sg|sgRaw|n):([\w.]+)\}/g,(m,f,p)=>{let v=typeof BAL!=="undefined"?BAL:null;for(const k of p.split("."))v=v&&v[k];v=+v||0;
 return f==="sg"?(typeof S==="object"&&S&&S.emp?sgStat(v):statTxt("sung",v)):f==="sgRaw"?sgFix(v):`${v>0?"+":v<0?"-":""}${Math.abs(v)}`})}
/* typed-stat-bal: the getter keeps a setter (a later module may overwrite the text: it then holds the new plain value) */
function sgRuleSet(o,k){return v=>Object.defineProperty(o,k,{value:v,writable:true,enumerable:true,configurable:true})}
function sgRuleArr(a){if(Array.isArray(a))a.forEach((s,i)=>{if(typeof s==="string"&&/\{(sg|sgRaw|n):/.test(s))Object.defineProperty(a,i,{get:()=>sgRule(s),set:sgRuleSet(a,i),enumerable:true,configurable:true})});return a}
function sgRuleObj(o,k){const dsc=o&&Object.getOwnPropertyDescriptor(o,k);if(!dsc||dsc.get)return o;const s=dsc.value;if(typeof s==="string"&&/\{(sg|sgRaw|n):/.test(s))Object.defineProperty(o,k,{get:()=>sgRule(s),set:sgRuleSet(o,k),enumerable:true,configurable:true});return o}
function sgOf(p,v,lbl){return p===S?sgStat(v,lbl):statTxt("sung",v,lbl)}
function sgRange(a,b,lbl){const x=sgNow(a),y=sgNow(b),sv=z=>`${z>0?"+":z<0?"-":""}${Math.abs(z)}`;if(x===y)return sgStat(a,lbl);return `${lbl||NAMES.sung}${x!==a||y!==b?SG_NB:" "}${sv(x)} đến ${sv(y)}`}
function fmt(o){return Object.entries(o||{}).filter(([k,v])=>NAMES[k]&&v).map(([k,v])=>{const t=k==="sung"?sgStat(v):statTxt(k,v);if(k==="sung")v=sg(v);return `<span class="${kGood(k,v)?"g":"r"}">${t}</span>`}).join(" · ")}
function apply(o){const pops=[];
  for(const k in o){let v=o[k];if(!v)continue;
    if(k==="maid"){S.maid.loyal=cl(S.maid.loyal+v,0,100);pops.push([k,v]);continue}
    if(k==="sung")v=sg(v);S[k]=(S[k]||0)+v;if(NAMES[k])pops.push([k,v])}
  for(const k of ["sung","danh","suc","sac","tai","tamco","duc"])S[k]=cl(S[k],0,100);S.suc=Math.min(S.suc,sucCap(S));
  S.th=cl(S.th,-100,100);S.hh=cl(S.hh,-100,100);S.bac=Math.max(0,S.bac);/* 2f2: mat = the real list (jagknow tmInstall), no clamp */
  if(!quiet)pops.forEach(([k,v],i)=>popNum(k,v,i))}
/* the screen of THIS phone (effects, scenes, sounds, floaters): off for bots, quiet code paths, and while a co-op host runs the other seat's
   turn (COOPW.ctx). coop-thin F2 r2: her intents run on the host with quiet off (her cards reach her through her Q, her floaters / effects are
   captured and play on HER phone, jcoopthin uiCap); every screen gate reads this ONE rule, so nothing of hers draws on the host's screen */
function screenOff(){return !!window.__bot||(typeof quiet!=="undefined"&&quiet)||!!(window.COOPW&&COOPW.ctx)}
function popNum(k,v,i){if(typeof kitStatFx==="function")return kitStatFx([{k,dv:v}],{src:"apply"});/* fallback before jstatfx is loaded */
  const el=$("hud-"+k)||$("stage");if(!el)return;const r=el.getBoundingClientRect();
  const s=document.createElement("span");s.className="fly "+(v>0?"g":"r");s.textContent=`${NAMES[k]} ${v>0?"+":""}${v}`;s.style.left=Math.max(4,r.left)+"px";s.style.top=(r.bottom+4)+"px";document.body.appendChild(s);setTimeout(()=>s.remove(),1900)}
function log(h){S.logSeq=(S.logSeq||0)+1;S.logs.unshift(`<span class="ld">T${S.month}/${S.year} ${TUAN[S.tuan]}</span>${h}`);if(S.logs.length>150)S.logs.length=150}
function when(){return `Năm ${S.year}, tháng ${S.month}, ${TUAN[S.tuan]} (${SEASON[S.month-1]})`}
function fx(cls,el){const e=el||$("game");e.classList.remove(cls);void e.offsetWidth;e.classList.add(cls);setTimeout(()=>e.classList.remove(cls),950)}

/* people helpers */
function allKids(){const a=[];if(S&&S.kids)S.kids.forEach(k=>a.push([k,null]));(rivals||[]).forEach(v=>(v.kids||[]).forEach(k=>a.push([k,v])));return a}
function mkKid(sex,age){const used=allKids().map(([k])=>k.name);const pre=sex==="m"?"Hoàng tử ":"Công chúa ";/* one name core (jname.js) */
  return {name:pre+nmNew(sex==="m"?"prince":"princess"),sex,age,hp:80+R(21),tal:20+R(50),fond:30+R(30),alive:true,heir:false,fv:1+R(2)}}
/* palace-start (owner 16/11 "game starts right after the accession", amended: "about 4 small children, close in age"): a new game seeds
   BAL.ps.kidN-weighted 3–5 children in the whole palace, ages kidAge (1–4), princes and princesses mixed (sonP each, at least one of each),
   mothers in BAL.ps rank ranges; the Hoàng hậu never has a son at the start (no đích tử) and nobody is grown, so the player can still compete.
   A mother has at most two of them, born at least two years apart. New games only (S.ps). */
function psSeedKids(){const P=BAL.ps;let n=0,r=Math.random()*P.kidN.reduce((a,b)=>a+b,0);while(n<P.kidN.length-1&&r>=P.kidN[n]){r-=P.kidN[n];n++}
 const sx=[];for(let i=0;i<n;i++)sx.push(Math.random()<P.sonP?"m":"f");if(n>=2&&!sx.includes("m"))sx[0]="m";if(n>=2&&!sx.includes("f"))sx[n-1]="f";
 for(const x of sx){const age=P.kidAge[0]+R(P.kidAge[1]-P.kidAge[0]+1);const rg=x==="m"?P.sonMom:P.dauMom;
  const M=rivals.filter(v=>v.alive&&!(x==="m"&&v.queen)&&(v.queen?rg[1]>=7:v.rank>=rg[0]&&v.rank<=rg[1])&&(v.kids||[]).length<2&&(v.kids||[]).every(k=>Math.abs(k.age-age)>=2));if(!M.length)continue;
  const v=pick(M);const k=mkKid(x,age);v.kids.push(k);v.lastBirth=Math.max(v.lastBirth==null?-999:v.lastBirth,-12*age-R(6));
  v.age=Math.max(v.age,BAL.ps.momAge+age)}/* review r1: no mother (or Emperor) under momAge at a seeded child's birth */
 if(S&&S.emp){const mx=Math.max(0,...allKids().map(([k])=>k.age||0));if(mx)S.emp.age=Math.max(S.emp.age,BAL.ps.momAge+mx)}}
/* the opening line of a new game (Nhập cung): the Emperor has just taken the throne, the court is weak, the harem young, few children */
function psOpenText(){const E=S.emp,K=allKids().filter(([k])=>k.alive);const ns=K.filter(([k])=>k.sex==="m").length,nd=K.length-ns;
 const kl=!K.length?"Trong cung chưa có hoàng tự nào.":`Trong cung mới có ${[ns?ns+" hoàng tử":"",nd?nd+" công chúa":""].filter(Boolean).join(", ")}, đứa lớn nhất mới ${Math.max(...K.map(([k])=>k.age))} tuổi; Hoàng hậu chưa có con trai.`;
 return `Ngài vừa đăng cơ, nay mới là ${E.era} năm thứ nhất. Triều chính còn non: việc lớn vẫn phải qua Thái hậu và các đại thần phụ chính. Hậu cung còn thưa, phi tần phần nhiều là người cũ từ tiềm để, tuổi còn xanh. ${kl} Ngôi Đông cung còn bỏ trống.`}
function mySons(){return S.kids.filter(k=>k.alive&&k.sex==="m")}
function myDaus(){return S.kids.filter(k=>k.alive&&k.sex==="f")}
function liveRivals(q){return rivals.filter(v=>v.alive&&!v.out&&(q||!v.queen))}
function qOn(){const q=rivals[0];return q.alive&&!q.out&&q.queen}
function momRank(v){return v?(v.alive&&!v.out?(v.queen?7:v.rank):0):S.rank}
function setHeir(k,v){allKids().forEach(([x])=>x.heir=false);k.heir=true;S.heir={k,v}}/* KP03: the mother's Danh (her and an NPC mother, BAL.kid.heirDanh) is jkidlife's setHeir wrap */
function kidDie(k,why,mine){k.alive=false;const wasH=k.heir;if(wasH){k.heir=false;S.heir=null}if(mine)apply({suc:-15});
  return `<span class="r">${k.name} ${why}.</span>${mine?" Ngươi đau đớn khôn nguôi.":""}${wasH?" Ngôi Đông cung bỏ trống.":""} `}
/* ghenN(n) = the jealousy one "every consort ghen +n" really adds (Hoàng thượng đa tình ×BAL.ghen.datinh). ONE CORE (OD:L1267): ghenAll applies it and every text that shows that gain prints ghenN(n). */
function ghenN(n){let k=1;try{if(has("datinh"))k=BAL.ghen.datinh}catch(e){}return Math.round(n*k)}
/* MOODKNOW step 0 (owner s35 Lượt 41 + OD 17/11 ~18:38Z): ONE way to RAISE the jealousy SCORE v.ghen. It adds n (clamped 0–100) and, for the real
   rise, a short Chạnh lòng FEELING cause (jmoodknow ghenFeel: true why, aimed at the one who caused it 'by', khắc timer BAL.mood2.dur.e.ghenUp).
   Lowering stays a plain write; the feeling ending never touches the score. Returns the real rise. */
function ghenUp(v,n,why,by){if(!v||typeof v!=="object"||!(n>0))return 0;const g0=+v.ghen||0;v.ghen=cl(g0+n,0,100);const d=v.ghen-g0;
 if(d>0&&typeof ghenFeel==="function")try{ghenFeel(v,d,why,by===undefined?S:by)}catch(e){}return d}
/* her own jealousy SCORE toward a consort (v.pg, "Ngươi ghen N") — same family as ghenUp: the ONE way to raise it; the real rise also adds a short
   Chạnh lòng FEELING on her (ghenFeel), aimed at that consort. Lowering stays a plain write; the feeling ending never touches the score. */
function pgUp(v,n,why){if(!v||typeof v!=="object"||!(n>0))return 0;const g0=+v.pg||0;v.pg=cl(g0+n,0,100);const d=v.pg-g0;
 if(d>0&&typeof ghenFeel==="function")try{ghenFeel(S,d,why,v)}catch(e){}return d}
function ghenAll(n,why){const d=ghenN(n);liveRivals(true).forEach(v=>ghenUp(v,d,why||"thấy ngươi nổi bật hơn người",S))}
function namesInUse(){const a=[];if(S){a.push(S.name);if(S.maid)a.push(S.maid.name);if(S.foe)a.push(S.foe);if(S.st){if(S.st.guard)a.push(S.st.guard);if(S.st.stu)a.push(S.st.stu)}}(rivals||[]).forEach(v=>a.push(v.name));allKids().forEach(([k])=>a.push(k.name));return a}
function freshName(){return nmNew("f")}/* one name core (jname.js): unique across the save, living + dead */
function ghenNew0(){return R(BAL.ghenNew)}/* ONE CORE: the jealousy a new face starts with (newRival + co-op part B rebase) */
function newRival(rank,isQueen){const t=pick(TRAITS);
  return rstats({id:++rid,name:freshName(),rank,queen:!!isQueen,trait:t[0],malice:t[1]+R(20)-10,sung:20+rank*9+R(10),rel:isQueen?-5:R(20)-10,ev:0,alive:true,out:false,
    kids:[],/* palace-start (owner 16/11): nobody arrives with a child; the few children at a new game are seeded by psSeedKids() */ghen:ghenNew0(),pg:0,nights:0,age:(rank>=5||isQueen?23:18)+R(8)},rank)}
function mkEmp(){const t=[];const ks=Object.keys(ETRAITS);
  while(t.length<2){const k=pick(ks);if(t.includes(k)||CLASH.some(([a,b])=>(a===k&&t.includes(b))||(b===k&&t.includes(a))))continue;t.push(k)}
  return {era:pick(ERA),age:BAL.ps.empAge[0]+R(BAL.ps.empAge[1]+1),reignY:1,traits:t,mood:1,likes:{flower:pick(LIKES.flower),music:pick(LIKES.music),dish:pick(LIKES.dish)},known:{}}}
/* owner 21/11: «Hoàng thượng» is the NAME the game shows (it never tells her his name); the niên hiệu is a detail row (empEra). empName() = the STORY phrase only (băng hà, lên ngôi…) */
function empEra(){return S.emp.era}
function empNm(){return "Hoàng thượng"}
function empName(){return `Hoàng thượng niên hiệu ${S.emp.era}`}
function discover(){const u=Object.keys(LIKES).filter(k=>!S.emp.known[k]);if(!u.length)return false;const k=pick(u);S.emp.known[k]=true;
  log(`<span class="g">Ngươi biết được: Hoàng thượng thích ${S.emp.likes[k]}.</span>`);return true}
function artW(k,l){return l*(((["cam","ky","thi","hoa"].includes(k)&&has("trongtai"))||(k==="vu"&&has("mesac")))?2:1)}
function bestArt(){let b={k:null,n:"giọng hát",l:0,w:0};for(const a of ARTS){const l=S.arts[a.k],w=artW(a.k,l);if(w>b.w)b={k:a.k,n:a.n,l,w}}return b}
function needDuc(){return S.heir&&!S.heir.v?30:40}
const DG=()=>has("danghi");