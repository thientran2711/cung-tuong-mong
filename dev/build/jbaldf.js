/* ================= jbaldf: BAL.df — the knobs of the Dư đồ focus view + on-figure act games (review/duodo-focus; owner OD 21/11 ~06:20Z / ~06:50Z / ~06:55Z) =================
   ONE CORE (law 4): every number the focus view or an on-figure game reads lives here or in an existing BAL block it points to.
   Outcomes are NOT here: a rolled act moves ONE ladder step (jsgame sgShift + BAL.cut.sgStep), a tiered act uses BAL.slap, a sure act keeps its numbers.
   Difficulty (law 5) = jmgt mgTier(kind,{occ:"df"}): stake = BAL.mgTier.occ.df [base, perRank] by HER rank (the attacker's rank for a dodge), ease per kind = BAL.mgTier.kAdj.
   Source of each block: plan dev/handover/reports/duodo-focus.md §PLAN 2 (act table) — first values, calibrated with dev/measure/df-bots.js. */
Object.assign(BAL,{df:{
 on:1,                 /* 0 = the stage tap opens the old person pop-up (rollback / tests) */
 npc:1,                /* 0 = NPC-initiated cards keep the centre card (row 15 off) */
 inPerson:["tat","phatquy","nuoc","tea","ink"],/* Hậu cung acts that need her THERE, offered in the focus view too (ONE act, same lock: doAct) */
 art:0,                /* 1 when Foreman C's hand / prop sprites are on the CDN (ART REQUEST df-hand / df-props / df-npc-hand) */
 /* engine knobs: ms = play time; zone = target size as a share of the figure height at ease 0 → 5 (lerp); spd = target drift in figure-heights per second at ease 0 → 5 */
 swipe:{ms:3200,zone:[.10,.18],spd:[.9,.25],fast:[1.6,.9],slow:[.5,.3]},/* fast/slow: stroke speed in figure-heights per second for raw 10 / raw 4 (ease 0 → 5) */
 tug:{ms:5000,push:[.055,.085],back:[.30,.12]},/* push = meter gained per tap, back = meter lost per second (ease 0 → 5) */
 bow:{beats:3,gap:900,win:[110,240]},/* gap between beats ms, win = ± ms of a full-mark tap (ease 0 → 5) */
 drag:{ms:4000,zone:[.12,.22],spd:[.6,.15]},
 ear:{ms:5000,need:2200,glance:[.9,.4],hot:.6},/* need = ms of safe holding for raw 10; glance = how often the onlooker looks (per s); hot = glance level that catches her */
 words:{ms:6000,n:6,good:[.4,.65],spd:[.35,.15]},/* n bubbles at once; good = share of the fitting ones (ease 0 → 5) */
 stare:{ms:4000,band:[.16,.30],push:[.9,.4]},/* band = width of the hold band; push = her gaze push-back per s */
 walk:{in:700,out:600,veil:360,stagger:40},/* motion ms (MOTION.md: 0.3–2 s); the kit part kitFocus owns its own timings, these feed the fallback */
 react:1600}});
/* the new occasion + kinds in the ONE tier table (jmgt): her rank raises the stake like the slap occasion */
try{BAL.mgTier.occ.df=BAL.mgTier.occ.df||[1,.5];for(const k of ["df_swipe","df_tug","df_bow","df_drag","df_ear","df_words","df_stare"])if(BAL.mgTier.kAdj[k]==null)BAL.mgTier.kAdj[k]=0}catch(e){}
