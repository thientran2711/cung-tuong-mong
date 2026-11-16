/* ================= jmgt: MINIGAME DIFFICULTY TIERS (owner 16/11 07:10Z "lên chơi càng cao thì nó khó hơn", 07:25Z "mức vừa", ONE CORE) =================
   ONE function for every minigame family (j82 / j91 / jts / jwkg engines and the no-word replacements of review/nw-*):
     mgTier(kind, o) -> {occ, stake, lv, d, tier 0|1|2, word "Dễ"|"Vừa"|"Khó", ease 0..5, occName}
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
 const ease=cl(B.mid-B.slope*d+((B.kAdj||{})[kind]||0),0,5);
 const tier=d<=-B.band?0:d>=B.band?2:1;
 return{occ,occName:MGT_OCCN[occ],rank,stake,lv,d,tier,word:["Dễ","Vừa","Khó"][tier],ease:Math.round(ease*10)/10}}
/* set the board ease for the next kg82Play (callers: startContest, playArt, jexam, jts, kg82Lesson) */
function mgSet(kind,o){const t=mgTier(kind,o);KG82.occ=t.occ;KG82.tier=t;KG82.lv=t.ease;return t}
/* the intro row "Độ khó" (player text, VANPHONG: no numbers of odds) */
function mgDiffTxt(t,kind){const hint=kind&&typeof kg82Know==="function"&&kg82Know(kind)?[" · có gợi ý ngay trên bàn"," · gợi ý bớt đi"," · gợi ý ở nút Gợi ý"][t.tier]:"";
 return `${t.word}${hint} · ${t.occName}, tài nghệ bậc ${t.lv}`}
function mgWord(raw){const W=BAL.mgTier.word;return raw>=W[3]?"Xuất sắc":raw>=W[2]?"Giỏi":raw>=W[1]?"Khá":raw>=W[0]?"Tạm được":"Vụng"}
window.mgTier=mgTier;window.mgSet=mgSet;window.mgWord=mgWord;
/* wiring (edited in place, 16/11): j82 startContest (occ "hoi" / o.occ, o.big), playArt (occ "hoc" / o.occ), kg82Lesson (lessons), kg82Word → mgWord,
   jexam exRun (occ "exam", rank = target), jts tsGame (occ "trieu" / o.occ), jkc Phúc tuyển (playArt occ "tuyen"). Skip / "để tài nghệ quyết định"
   values keep using her real art level (KG82.tier.lv) through kg82NpcMean. */
