/* ================= jmgt: MINIGAME DIFFICULTY TIERS (owner 16/11 07:10Z "lên chơi càng cao thì nó khó hơn", 07:25Z "mức vừa", ONE CORE) =================
   ONE function for every minigame family (j82 / j91 / jts / jwkg engines and the no-word replacements of review/nw-*):
     mgTier(kind, o) -> {occ, stake, lv, d, tier 0|1|2, word "Dễ"|"Vừa"|"Khó", ease −2..5, occName}
       kind : the KG82_KIND key (dan, co, tho, le, …)
       o    : {occ, rank?, lv?, p?, big?}
         occ  : the occasion — "hoc" (lessons, self-practice, works), "hoi" (festival contests j71), "trieu" (the Emperor's private summons jts),
                "exam" (khảo hạch tấn phong jexam; rank = the TARGET rank), "tuyen" (tuyển tú / Phúc tuyển jkc). Unknown → "hoc".
         rank : her rank 0..7 (default: S's rank; exam: the target rank). big: a big contest (+BAL.mgTier.big).
         lv   : her skill level in that art 0..5 (default kg82LvFor(p||S, kind)).
     stake = BAL.mgTier.occ[occ] = [base, perRank]  →  base + perRank·rank (+ big), clamped 0..BAL.mgTier.stakeMax
     d     = stake − lv  (how far the occasion is above her skill; 0 = "matching level")
     ease  = clamp(BAL.mgTier.mid − BAL.mgTier.slope·d + BAL.mgTier.kAdj[kind], 0, 5)   ← what the engines read as env.lv (higher = easier)
     tier  = d ≤ −band → Dễ · d ≥ band → Khó · else Vừa (the word on the intro row "Độ khó").
   The engines already scale with env.lv (wider hit windows, slower notes, more time, fewer pieces); until 16/11 env.lv was her own art level,
   so the better she got the EASIER every game became (the cause of "Tuyệt phẩm almost every time"). Now the board eases only when her skill
   is ABOVE the occasion, and gets harder as she climbs in rank (the stakes rise with rank).
   Result words: mgWord(raw) reads BAL.mgTier.word (Vụng/Tạm được/Khá/Giỏi/Xuất sắc); works (j83) read BAL.mgTier.wk.
   For review/nw-*: call  const t=mgTier(kind,{occ:KG82.occ}); env.lv already equals t.ease inside kg82Play — just read env.lv as the ease.
   Measured with dev/measure/mg-bots.js (skilled + random bots); table in dev/PROGRESS_mg-balance.md. ============================== */
const MGT_OCCN={hoc:"luyện tập",hoi:"hội thi",trieu:"hầu Hoàng thượng",exam:"khảo hạch",tuyen:"tuyển tú"};
function mgRankOf(p){try{p=p||S;if(typeof rkOf==="function")return cl(+rkOf(p)||0,0,7);return cl(+(p.queen?7:p.rank)||0,0,7)}catch(e){return 0}}
function mgTier(kind,o){o=o||{};const B=BAL.mgTier;const occ=B.occ[o.occ]?o.occ:"hoc";const [b0,pr]=B.occ[occ];
 const rank=o.rank!=null?cl(+o.rank||0,0,7):mgRankOf(o.p);
 let lv=o.lv;if(lv==null){try{lv=kg82LvFor(o.p||S,kind)}catch(e){lv=0}}lv=cl(+lv||0,0,5);
 const stake=cl(b0+pr*rank+(o.big?B.big:0),0,B.stakeMax);const d=stake-lv;
 const ease=cl(B.mid-B.slope*d+((B.kAdj||{})[kind]||0),B.easeMin,5);
 const tier=d<=-B.band?0:d>=B.band?2:1;
 return{occ,occName:MGT_OCCN[occ],rank,stake,lv,d,tier,word:["Dễ","Vừa","Khó"][tier],ease:Math.round(ease*10)/10}}
/* set the board ease for the next kg82Play (callers: startContest, playArt, jexam, jts, kg82Lesson) */
function mgSet(kind,o){const t=mgTier(kind,o);KG82.occ=t.occ;KG82.tier=t;KG82.lv=t.ease;return t}
/* the tier 0 Dễ · 1 Vừa · 2 Khó of the board being played (review/mg-train, whole family: jnwp nwTier, jnwq nwqTier, jlant): the tier mgSet() put in
   KG82.tier for this play (it carries the occasion: exam stakes, contest, lesson), else the aid tier of the board ease kg82Tier(env.lv) */
function mgTierOf(env){const T=typeof KG82!=="undefined"&&KG82.tier;const n=T&&typeof T==="object"?T.tier:T;
 return typeof n==="number"&&isFinite(n)?cl(Math.round(n),0,2):kg82Tier(env&&env.lv)}
/* the intro row "Độ khó" (player text, VANPHONG: no numbers of odds) */
function mgDiffTxt(t,kind){const hint=kind&&typeof kg82Know==="function"&&kg82Know(kind)?[" · có gợi ý ngay trên bàn"," · gợi ý bớt đi"," · gợi ý ở nút Gợi ý"][t.tier]:"";
 return `${t.word}${hint} · ${t.occName}, tài nghệ bậc ${t.lv}`}
function mgWord(raw){const W=BAL.mgTier.word;return raw>=W[3]?"Xuất sắc":raw>=W[2]?"Giỏi":raw>=W[1]?"Khá":raw>=W[0]?"Tạm được":"Vụng"}
/* full-marks generosity of an engine (the share of a perfect run that already counts as 10/10): the engine's old value b at ease ≥ BAL.mgTier.fullAt,
   rising to 1 (a full run needed) at ease 0. Read by j91 trace / arrange / hold and jts pluck (whole family of capped scores). */
function mgFull(env,b){const e=env&&env.lv!=null?+env.lv:BAL.mgTier.fullAt,M=BAL.mgTier.fullAt;return Math.min(1,b+(1-b)*cl((M-e)/M,0,1))}
/* the grade of a finished play: engines pass a FLOAT 0..10; the curve BAL.mgTier.gamma (>1 = stricter near the top) turns it into the 0..10 shown */
function mgGrade(raw,kind){const g=(BAL.mgTier.kG||{})[kind]||BAL.mgTier.gamma;const x=cl(+raw||0,0,10)/10;return cl(Math.round(10*Math.pow(x,g)),0,10)}
/* tolerance factor of a board (hit windows, trace width, heat zone, scent match, time): BAL.mgTier.tol[0] at ease 0 → tol[1] at ease 5 */
function mgTol(env){const T=BAL.mgTier.tol,e=env&&env.lv!=null?+env.lv:5;return Math.max(T[2],T[0]+(T[1]-T[0])*cl(e/5,-1,1))}/* below ease 0 it keeps shrinking, floor tol[2] */
/* extra pieces to remember (thêu pattern, múa steps): BAL.mgTier.more at ease 0, none at ease ≥ 5·(1 − 1/(more+1)) */
function mgMore(env){const e=env&&env.lv!=null?+env.lv:5;return Math.max(0,Math.round(BAL.mgTier.more*(1-cl(e/5,-1,1))))}
/* a board lever that moves with the ease (mg-balance-2): BAL.mgTier.lev[kind][name] = [value at ease 0, value at ease 5], linear between, held at the
   ease-0 value below 0 (heat lag / gusts of Nấu ăn, time + decoys of Cờ, beat window of Múa, time + shortage of Làm phúc, aim aid of Đầu hồ, sway of Đi đứng, voice band of Ngôn) */
function mgLev(env,kind,name){const L=((BAL.mgTier.lev||{})[kind]||{})[name];if(!L)return null;const e=cl(env&&env.lv!=null?+env.lv:5,0,5)/5;return L[0]+(L[1]-L[0])*e}
/* the TIME PART of a round (review/mg-tune, owner 16/11 07:25Z "mức vừa", ONE CORE for the whole family): the share of the round's score she keeps
   for the time she took. el = ms from the round's start to its finish, lim = the round's time limit. Kept whole while el ≤ fast·lim, then falls
   linearly to keep at el = lim (time out). fast / keep = BAL.mgTier.lev[kind].fast / .keep through mgLev (by the board ease) when the engine has
   them, else BAL.mgTier.pace.fast / .keep. Read by every engine that scores correctness (jnwp calli / doiline, jnwq lay / sort / seat / clue,
   jlant lamp, j82 go): a right answer found quickly is Tuyệt phẩm, a right answer found slowly is Tinh xảo. */
function mgPace(env,kind,el,lim){const P=BAL.mgTier.pace,e=cl(env&&env.lv!=null?+env.lv:5,0,5)/5,at=(n)=>{const v=mgLev(env,kind,n);return v!=null?v:P[n][0]+(P[n][1]-P[n][0])*e};
 const f=cl(at("fast"),0,.99),k=cl(at("keep"),0,1),u=cl((+el||0)/Math.max(1,+lim||1),0,1);return u<=f?1:1-(1-k)*(u-f)/(1-f)}
/* the ONE trace score (review/mg-snap, owner 17/11 07:10Z: a traced line is judged by where HER finger went, never snapped onto the guide):
   G = the guide path (dense points), U = her line (points [x,y,…]), tol = px. coverage = share of the guide within tol of her line; accuracy = share of
   her line within tol of the guide; score 0..1 = coverage × (1 − a + a·accuracy), a = BAL.mgTier.trace.acc (was a typed .5: a scribble
   over the guide covered it and kept half the score; now the share of her line OFF the guide costs as much as the share of the guide missed). Read by j91 trace (Đồ nét bút, Chép kinh, May áo) and jtd Thêu theo nét. */
function mgTraceScore(G,U,tol){if(!G||!U||U.length<2)return 0;const t2=tol*tol;let cov=0;for(const p of G){let m=1e9;for(const q of U){const d=(p[0]-q[0])**2+(p[1]-q[1])**2;if(d<m)m=d}if(m<t2)cov++}
 let acc=0;for(const q of U){let m=1e9;for(const p of G){const d=(p[0]-q[0])**2+(p[1]-q[1])**2;if(d<m)m=d}if(m<t2)acc++}const a=BAL.mgTier.trace.acc;return(cov/G.length)*(1-a+a*acc/U.length)}
window.mgTraceScore=mgTraceScore;window.mgTier=mgTier;window.mgPace=mgPace;window.mgLev=mgLev;window.mgFull=mgFull;window.mgTol=mgTol;window.mgMore=mgMore;window.mgGrade=mgGrade;window.mgSet=mgSet;window.mgWord=mgWord;window.mgTierOf=mgTierOf;
/* wiring (edited in place, 16/11): j82 startContest (occ "hoi" / o.occ, o.big), playArt (occ "hoc" / o.occ), kg82Lesson (lessons), kg82Word → mgWord,
   jexam exRun (occ "exam", rank = target), jts tsGame (occ "trieu" / o.occ), jkc Phúc tuyển (playArt occ "tuyen"). Skip / "để tài nghệ quyết định"
   values keep using her real art level (KG82.tier.lv) through kg82NpcMean. */
