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
 const stake=cl(b0+pr*rank+(o.big?B.big:0),0,B.stakeMax);const d=o.d!=null&&isFinite(+o.d)?+o.d:stake-lv;/* o.d: a fixed gap (jmgcal rounds) */
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
/* ===== AG-ALL-2b mg2 · NPC MINI-GAMES = ONE DRAW FROM HER OWN CURVE (owner OD 17/11 ~15:25Z (3): "lúc nào tôi có thì NPC cũng phải có …
   đổ xí ngầu cho nó … lỡ như nó chơi khôn quá … coi lại như thế nào để cho nó công bằng với tôi"). ONE CORE for every tiered game an NPC takes part in:
     t   = mgNpcTier(kind, p, o): mgTier with HIS/HER own rank and art level (o.occ, o.big, o.rank, o.lv as the player's call would pass them)
           = the very board the player would get in that seat (same stake, same gap d = stake − level);
     med = mgMedD(t.d): the median graded play of the skilled bot at that gap (BAL.ag.mg2.med, the measured Dễ / Vừa / Khó rows of
           dev/PROGRESS_mg-balance.md + _mg-balance-2.md), linear between the points and beyond them;
     raw = clamp(round(med + (u − .5)·BAL.ag.mg2.w), 0, 10), u = mean of 3 draws of o.rnd (default Math.random; seeded for odds / co-op).
   So an NPC plays like a good player of her level on that board: never a perfect player, never a sure win (spread ±w/2 round the median).
   mgSkipRaw(t) = the median at her own gap = "Để tài nghệ quyết định". Switch: mg2On() = agOn() && BAL.ag.mg2.on; off (co-op guest,
   BAL.ag.on 0) = the old kg82NpcMean (BAL.mgTier.npc) paths, untouched. MGX.o = the occasion of the NPC rows being scored (mgWith; j71 contests). */
const MGX={o:null,n:0};
function mg2On(){try{return typeof agOn==="function"&&agOn()&&!!(BAL.ag&&BAL.ag.mg2&&BAL.ag.mg2.on)}catch(e){return false}}
function mgWith(o,f){const k=MGX.o;MGX.o=o;try{return f()}finally{MGX.o=k}}
function mgMedD(d){const P=BAL.ag.mg2.med;d=+d||0;let i=0;while(i<P.length-2&&d>P[i+1][0])i++;const [a,ma]=P[i],[b,mb]=P[i+1];return cl(ma+(mb-ma)*(d-a)/(b-a),0,10)}
function mgNpcTier(kind,p,o){o=o||{};return mgTier(kind,{occ:o.occ,big:!!o.big,rank:o.rank!=null?o.rank:mgRankOf(p),lv:o.lv,p})}
function mgNpcRaw(kind,p,o){o=Object.assign({},MGX.o||{},o||{});const r=o.rnd||Math.random,u=(r()+r()+r())/3;MGX.n++;const d=o.d!=null?o.d:mgNpcTier(kind,p,o).d;
 const H=BAL.ag.mg2.hand;if(H&&H.on&&p!==S){/* AG-ALL-2d HAND CEILING: a roll under her own ceiling, then the board's ease (the same gap shift the player's board gives) */
  const c=mgHand(kind,p);return cl(Math.round(c-(1-u)*H.w+(mgMedD(d)-mgMedD(0))),0,10)}
 return cl(Math.round(mgMedD(d)+(u-.5)*BAL.ag.mg2.w),0,10)}/* o.d: a known gap (no person: the matching level 0) */
/* ===== AG-ALL-2d · MINIGAME HAND CEILING (owner OD 17/11 ~16:00Z L1640, verbatim key words: "tất cả NPC đều phải có một cái mức trần chơi game, rồi
   sau đó là mới được cộng thêm dựa theo cái tài, cái phẩm ... mỗi game mỗi người sẽ có một cái mức trần khác nhau ... Có người chơi giỏi, người chơi dở").
   Her Tài never adds points: her art level only eases the BOARD (mgTier gap d). So every NPC has a hidden HAND per minigame kind = the best graded play her
   hands reach on a matching board, drawn ONCE per NPC per kind between BAL.ag.mg2.hand.lo (a clumsy hand) and .hi (the measured skilled human bot of
   dev/measure/mg-bots.js: median 7.5 at the matching board ⇒ hi − w/2 = 7.5), mean of two draws raised to BAL.ag.mg2.hand.skew (most hands weak-to-middling, strong hands rare — owner ~16:20Z (f)).
   Her play = a roll UNDER that ceiling (c − (1 − u)·w, u = mean of 3 draws), THEN the same board ease the player gets from her own art level / rank /
   occasion (mgMedD(d) − mgMedD(0): the skilled bot's measured shift between an easy / matching / hard board). Never a perfect player: even the best hand
   rolls below its ceiling most of the time. Saved on the person (p.mgH[kind]); the draw is hashed on the person + kind, so an old save (no p.mgH) and a
   co-op guest roll the very same hand lazily. Off: BAL.ag.mg2.hand.on = 0 (one skilled-bot curve for everyone, as part 2b). */
function mgHashU(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}h^=h>>>13;h=Math.imul(h,0x5bd1e995);h^=h>>>15;return (h>>>0)/4294967296}
function mgHand(kind,p){const H=BAL.ag.mg2.hand;if(!p||typeof p!=="object"){const Bd=typeof mgCalBand==="function"?mgCalBand(kind):H;return Bd.lo+(Bd.hi-Bd.lo)*Math.pow(.5,H.skew||1)}let M=p.mgH;if(!M||typeof M!=="object")M=p.mgH={};
 /* AG-ALL-2d2: the band per kind comes from the owner's calibration (jmgcal mgCalBand: BAL.ag.mg2.cal.k) or the BAL default; p.mgHv[kind] = the band it was
    rolled in — a changed band re-rolls the SAME hash draw inside the new band (old saves without p.mgHv re-roll identically under the default band) */
 const Bd=typeof mgCalBand==="function"?mgCalBand(kind):{lo:H.lo,hi:H.hi,sig:H.lo+"/"+H.hi};let V=p.mgHv;if(!V||typeof V!=="object")V=p.mgHv={};
 if(M[kind]==null||V[kind]!==Bd.sig){const id=(p.name||"")+"|"+(p.id!=null?p.id:p.sid!=null?"s"+p.sid:"")+"|"+kind;const b=(mgHashU(id+"|a")+mgHashU(id+"|b"))/2;M[kind]=Math.round((Bd.lo+(Bd.hi-Bd.lo)*Math.pow(b,H.skew||1))*100)/100;V[kind]=Bd.sig;MGX.hand=(MGX.hand||0)+1}
 return M[kind]}
window.mgHand=mgHand;
function mgSkipRaw(t){return cl(Math.round(mgMedD(t&&t.d!=null?t.d:0)),0,10)}
window.mg2On=mg2On;window.mgWith=mgWith;window.mgMedD=mgMedD;window.mgNpcTier=mgNpcTier;window.mgNpcRaw=mgNpcRaw;window.mgSkipRaw=mgSkipRaw;window.MGX=MGX;
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
