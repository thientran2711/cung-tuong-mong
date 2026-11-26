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
 const stake=cl(b0+pr*rank+(o.big?B.big:0),0,B.stakeMax);let d=o.d!=null&&isFinite(+o.d)?+o.d:stake-lv;/* o.d: a fixed gap (jmgcal rounds) */
 /* dauho-lv5 (owner 21/11): a kind with BAL.mgTier.base starts its real-play board at that Thử tay round's gap for everyone, then climbs with rank to the gap of ease lo */
 const bs=(B.base||{})[kind];if(bs&&!(o.d!=null&&isFinite(+o.d))){const D=BAL.ag.mg2.cal.d,dR=D[cl(Math.round(bs.r),1,D.length)-1],dLo=(B.mid+((B.kAdj||{})[kind]||0)-bs.lo)/B.slope;
  d=dR+(dLo-dR)*cl((rank+(o.big?B.big:0))/bs.n,0,1)}
 const ease=cl(B.mid-B.slope*d+((B.kAdj||{})[kind]||0),B.easeMin,5);
 const tier=d<=-B.band?0:d>=B.band?2:1;
 return{kind,occ,occName:MGT_OCCN[occ],rank,stake,lv,d,tier,word:["Dễ","Vừa","Khó"][tier],ease:Math.round(ease*10)/10}}
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
/* ===== ONE GRADING PATH for the board and the result (review/mg-score-same, owner bug 20/11 ~06:50Z: "lúc mà tôi vào … tôi chơi tôi thấy cái nào cũng
   là kiểu như là đạt hết. Đến lúc tính điểm toàn 9 trên 10 không"). The board's score cell never shows a raw count again: every engine (31 kinds)
   writes mgLive(env, x) = the MARK IN HER HAND = mgGrade(x, kind) — the very function kg82Play grades the result with — where x = the engine's raw
   float if the rest of the play goes perfectly (points lost so far stay lost, rounds not played yet count whole; mgReach). A slow answer (mgPace time
   part) or a miss lowers the mark the moment it happens; at the end x = the raw passed to env.end, so the last board mark = the result mark
   (kg82Play also writes the given mark on the board when the play ends). */
function mgReach(got,done,of){return cl((+got||0)+10*Math.max(0,(+of||0)-(+done||0))/Math.max(1,+of||1),0,10)}
function mgLive(env,x){return `${mgGrade(x,env&&env.kind)}/10`}
window.mgReach=mgReach;window.mgLive=mgLive;
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
/* mgFast(env,kind) = the FULL-MARKS WINDOW of the time part: the share of the round time (kind's lev[kind].fast, by the board ease) in which a finish still keeps the whole score;
   null for a kind with no time part (no lev[kind].fast). Read by mgPace below AND by the kit clock (kitGameClock turns amber once the window is passed, review/kit-mark). */
function mgFast(env,kind){const v=mgLev(env,kind,"fast");return v==null?null:cl(v,0,.99)}
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
function mgMedP(P,d){let i=0;while(i<P.length-2&&d>P[i+1][0])i++;const [a,ma]=P[i],[b,mb]=P[i+1];return ma+(mb-ma)*(d-a)/(b-a)}
/* dauho-lv5: a kind with its own measured rows BAL.ag.mg2.medK[kind] keeps the shared level at the matching board (med at gap 0) but moves with ITS OWN board shift (skilled bot, n ≥ 300 per gap) */
function mgMedD(d,kind){const M=BAL.ag.mg2,P=M.med,K=kind&&(M.medK||{})[kind];d=+d||0;return cl(K?mgMedP(P,0)+mgMedP(K,d)-mgMedP(K,0):mgMedP(P,d),0,10)}
function mgNpcTier(kind,p,o){o=o||{};return mgTier(kind,{occ:o.occ,big:!!o.big,rank:o.rank!=null?o.rank:mgRankOf(p),lv:o.lv,p})}
function mgNpcRaw(kind,p,o){o=Object.assign({},MGX.o||{},o||{});const r=o.rnd||Math.random,u=(r()+r()+r())/3;MGX.n++;const H=BAL.ag.mg2.hand;if(H&&H.on&&o.lv==null&&p&&typeof p==="object"&&p!==S&&typeof mgOrgLv==="function"){const ol=mgOrgLv(p,kind);if(ol){let v=0;try{v=kg82LvFor(p,kind)}catch(e){}if(ol>v)o.lv=ol}}/* upbringing start bậc (OD 20/11 ~01:50Z): her board as the player's, whose arts hold it; part of the hand rule, so off with BAL.ag.mg2.hand.on = 0 (rv) */
 const d=o.d!=null?o.d:mgNpcTier(kind,p,o).d;
 if(H&&H.on&&p!==S){/* AG-ALL-2d HAND CEILING: a roll under her own ceiling (her hand + her art / upbringing lift, mgHandEff), then the board's ease (the same gap shift the player's board gives) */
  const c=mgHandEff(kind,p,o);return cl(Math.round(c-(1-u)*H.w+(mgMedD(d,kind)-mgMedD(0,kind))+mgIdSh(kind,p)),0,10)}
 return cl(Math.round(mgMedD(d,kind)+(u-.5)*BAL.ag.mg2.w+mgIdSh(kind,p)),0,10)}
/* cal-p2c (law 1): the identity class shift of a person's play (sở trường / sở đoản, jmgid mgIdShift; 0 for no person / off) */
function mgIdSh(kind,p){try{return p&&typeof p==="object"&&typeof mgIdShift==="function"?mgIdShift(kind,p):0}catch(e){return 0}}/* o.d: a known gap (no person: the matching level 0) */
/* ===== AG-ALL-2d · MINIGAME HAND CEILING (owner OD 17/11 ~16:00Z L1640, verbatim key words: "tất cả NPC đều phải có một cái mức trần chơi game, rồi
   sau đó là mới được cộng thêm dựa theo cái tài, cái phẩm ... mỗi game mỗi người sẽ có một cái mức trần khác nhau ... Có người chơi giỏi, người chơi dở").
   FAIR SPREAD (owner OD 20/11 ~01:10Z, verbatim: "Không phải, tôi nói test tay xong, rồi đa số npc chơi dở hơn tôi, tôi thấy không fair" → "Duyệt cả 3 ý,
   làm luôn đi"): (1) every NPC has a hidden HAND per minigame kind = the best graded play her hands reach on a matching board, drawn ONCE per NPC per kind
   on the CURVE of jmgcal mgCalBand(kind) — BELL CURVE (owner OD 20/11 ~06:40Z, verbatim: "ở ngoài đời mình có thật sự là mình sẽ gặp 1/3 những người
   mình gặp là sẽ là những người giỏi, hoặc là 1/3 người mình gặp là những người bình thường, hoặc 1/3 người gặp là những người dở hay không á" → OWNER OK
   ~07:15Z; overwrites the thirds of ~01:18Z): the average play (hand − w/2) of the real adult population = Normal(ctr, sd) per kind (BAL.ag.mg2.hand ctr / sd
   / grp), hand = c + sd·z, c = ctr + w/2, z = mgZ (one standard-normal draw hashed on person + kind, ± zMax). NOT centred on her: her calibrated b only places
   her on the curve (mgCalShare), so better / equal / worse fall out of her real standing in each kind.
   (2) ART: mgHandEff adds BAL.ag.mg2.hand.art per art level of that kind above
   the player's own level (kg82LvFor; minus below): a trained NPC clearly beats her, an untrained one is weak. (3) UPBRINGING (owner OD 20/11 ~01:50Z,
   verbatim: "tiểu thư khuê các ngày xưa đã được học từ, nên vào cung đã giỏi mà, chỉ có nhà nghèo mới yếu"; OD ~02:05Z: the per-identity start-arts
   table): a person's art level for the lift = max(her own level, the start art bậc of her IDENTITY for that kind = origin × her road (v.nr.r) in
   BAL.orig.art via j1 originArts; no road known = the origin's own row; mgOrgLv). Her origin key: mgOrgOf (S.origin; a consort's v.nr.o / v.ag.o / jagent agOrg; a servant "srv";
   unknown "_" = none). Rank itself gives NO skill — law 5 comes from her harder board as she climbs and from who she meets. Art / upbringing are read live (never saved), measured against the player of seat a (mgRefP: S; a co-op guest reads
   the host's person) so both co-op seats roll the same play.
   Her play = a roll UNDER that ceiling (c − (1 − u)·w, u = mean of 3 draws), THEN the same board ease the player gets from her own art level / rank /
   occasion (mgMedD(d) − mgMedD(0): the skilled bot's measured shift between an easy / matching / hard board). Never a perfect player: even the best hand
   rolls below its ceiling most of the time. Saved on the person (p.mgH[kind]); the draw is hashed on the person + kind, so an old save (no p.mgH) and a
   co-op guest roll the very same hand lazily. Off: BAL.ag.mg2.hand.on = 0 (one skilled-bot curve for everyone, as part 2b). */
function mgHashU(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}h^=h>>>13;h=Math.imul(h,0x5bd1e995);h^=h>>>15;return (h>>>0)/4294967296}
/* the curve of a kind: ONE formula, jmgcal mgCalBand (BAL.ag.mg2.hand; no private centre / spread here — law 4, rv) */
function mgBand(kind){return mgCalBand(kind)}
/* the offset of a person's hand from the curve centre, in sd: one standard-normal draw hashed on the person + kind (Box–Muller of two hashes), clamped ± BAL.ag.mg2.hand.zMax */
function mgZ(id){const u=Math.max(1e-9,mgHashU(id+"|a")),v=mgHashU(id+"|b"),Z=BAL.ag.mg2.hand.zMax;return cl(Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v),-Z,Z)}
function mgHand(kind,p){const H=BAL.ag.mg2.hand,Bd=mgBand(kind);if(!p||typeof p!=="object")return Bd.c;
 /* co-op law (both seats read the same number): in co-op a world person's hand is the same hash draw on both seats, read but never stored on a READ
    (a lazy store lands on one seat only, after the week is cut: coop-e2e R#*.mgH.hoadien / mgHv on one seat only); a stored hand (save / single player) is read */
 try{if(p!==S&&window.COOPW&&COOPW.on&&!(p.mgH&&p.mgH[kind]!=null&&p.mgHv&&p.mgHv[kind]===Bd.sig)){const id=(p.name||"")+"|"+(p.id!=null?p.id:p.sid!=null?"s"+p.sid:"")+"|"+kind;return Math.round((Bd.c+Bd.sd*mgZ(id))*100)/100}}catch(e){}
 let M=p.mgH;if(!M||typeof M!=="object")M=p.mgH={};
 /* AG-ALL-2d2: p.mgHv[kind] = the band it was rolled in — a changed band re-rolls the SAME hash draw inside the new band (old saves rolled in the old
    skewed / half-half bands carry another sig and re-roll here) */
 let V=p.mgHv;if(!V||typeof V!=="object")V=p.mgHv={};
 if(M[kind]==null||V[kind]!==Bd.sig){const id=(p.name||"")+"|"+(p.id!=null?p.id:p.sid!=null?"s"+p.sid:"")+"|"+kind;M[kind]=Math.round((Bd.c+Bd.sd*mgZ(id))*100)/100;V[kind]=Bd.sig;MGX.hand=(MGX.hand||0)+1}
 return M[kind]}
/* the player the art / rank lift is measured against: seat a (S; on a co-op guest the host's person, so both seats agree) */
function mgRefP(){try{if(typeof agGuest==="function"&&agGuest()&&typeof consorts==="function"){const h=consorts().find(x=>x&&x.coop);if(h)return h}}catch(e){}return S}
/* the upbringing key of a person (j1 ORIGINS key; "srv" a servant from ORIGINS_S; "_" unknown). A consort without a road yet gets one from jagent agOrg
   (saved on her, host / solo only — a co-op guest reads what the host saved) */
function mgOrgOf(p){try{if(!p||typeof p!=="object")return"_";if(p===S)return(S.origin&&S.origin.k)||"_";if(p.nr&&p.nr.o)return p.nr.o;if(p.ag&&p.ag.o)return p.ag.o;
 if(typeof p.org==="string")return"srv";if(p.rank!=null&&typeof agOrg==="function"&&!(typeof agGuest==="function"&&agGuest())&&typeof consorts==="function"&&consorts().includes(p)){const o=agOrg(p);if(o)return o}}catch(e){}return"_"}
/* the start art bậc her upbringing gave her for this kind: her identity row (origin × road, BAL.orig.art via originArts), the highest over the kind's
   stats as kg82LvFor reads arts (a Tứ đức board td_<k> reads the virtue k). The player herself: 0 — her start row is already in her own arts (new game, j2
   start), and an old save keeps the arts it had (never lifted by a table it did not start with). */
function mgOrgLv(p,kind){try{if(!p||typeof p!=="object"||p===S||typeof originArts!=="function")return 0;const A=originArts(mgOrgOf(p),p.nr&&p.nr.r);let m=0;
 (/^td_/.test(kind)?[[kind.slice(3)]]:kg82FormulaOf(kind)).forEach(([s])=>{if(s!=="help"&&A[s])m=Math.max(m,+A[s]||0)});return cl(m,0,5)}catch(e){return 0}}
/* (2) + (3): the hand an NPC plays with now = her hand + art lift, her art level = max(her own level, her upbringing's start bậc) (o.lv: the level the caller
   already knows for this kind) */
function mgHandEff(kind,p,o){const h=mgHand(kind,p);if(!p||typeof p!=="object")return h;const H=BAL.ag.mg2.hand,R=mgRefP();if(!R||p===R)return h;
 const lv=x=>{let v=0;try{v=kg82LvFor(x,kind)}catch(e){}return Math.max(v,mgOrgLv(x,kind))};const lp=Math.max(o&&o.lv!=null&&isFinite(+o.lv)?cl(+o.lv,0,5):lv(p),mgOrgLv(p,kind));
 return Math.round((h+(H.art||0)*(lp-lv(R)))*100)/100}
window.mgHandEff=mgHandEff;window.mgBand=mgBand;window.mgRefP=mgRefP;window.mgOrgOf=mgOrgOf;window.mgOrgLv=mgOrgLv;
window.mgHand=mgHand;
function mgSkipRaw(t){const k=t&&t.kind,sh=k&&typeof mgIdShift==="function"?mgIdShift(k,S):0;return cl(Math.round(mgMedD(t&&t.d!=null?t.d:0,k)+sh),0,10)}/* cal-p2c: her skip = her identity level on this board (law 2: equal to her expected play, jmgid) */
window.mg2On=mg2On;window.mgWith=mgWith;window.mgMedD=mgMedD;window.mgNpcTier=mgNpcTier;window.mgNpcRaw=mgNpcRaw;window.mgSkipRaw=mgSkipRaw;window.MGX=MGX;
/* the ONE trace score (review/mg-snap, owner 17/11 07:10Z: a traced line is judged by where HER finger went, never snapped onto the guide):
   G = the guide path (dense points), U = her line (points [x,y,…]), tol = px. coverage = share of the guide within tol of her line; accuracy = share of
   her line within tol of the guide; score 0..1 = coverage × (1 − a + a·accuracy), a = BAL.mgTier.trace.acc (was a typed .5: a scribble
   over the guide covered it and kept half the score; now the share of her line OFF the guide costs as much as the share of the guide missed). Read by j91 trace (Đồ nét bút, Chép kinh, May áo) and jtd Thêu theo nét. */
function mgTraceScore(G,U,tol){if(!G||!U||U.length<2)return 0;const t2=tol*tol;let cov=0;for(const p of G){let m=1e9;for(const q of U){const d=(p[0]-q[0])**2+(p[1]-q[1])**2;if(d<m)m=d}if(m<t2)cov++}
 let acc=0;for(const q of U){let m=1e9;for(const p of G){const d=(p[0]-q[0])**2+(p[1]-q[1])**2;if(d<m)m=d}if(m<t2)acc++}const a=BAL.mgTier.trace.acc;return(cov/G.length)*(1-a+a*acc/U.length)}
window.mgTraceScore=mgTraceScore;window.mgTier=mgTier;window.mgPace=mgPace;window.mgFast=mgFast;window.mgLev=mgLev;window.mgFull=mgFull;window.mgTol=mgTol;window.mgMore=mgMore;window.mgGrade=mgGrade;window.mgSet=mgSet;window.mgWord=mgWord;window.mgTierOf=mgTierOf;
/* wiring (edited in place, 16/11): j82 startContest (occ "hoi" / o.occ, o.big), playArt (occ "hoc" / o.occ), kg82Lesson (lessons), kg82Word → mgWord,
   jexam exRun (occ "exam", rank = target), jts tsGame (occ "trieu" / o.occ), jkc Phúc tuyển (playArt occ "tuyen"). Skip / "để tài nghệ quyết định"
   values keep using her real art level (KG82.tier.lv) through kg82NpcMean. */
