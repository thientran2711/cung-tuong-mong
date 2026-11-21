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
 /* engine knobs (all lerp pairs are [at ease 0, at ease 5]; ease = mgTier(kind,{occ:"df"}).ease clamped 0..5). ms = play time.
    geo = where on the figure box each target sits (share of the figure height from its top; x share of the height from the centre line). */
 easeTop:5,rawTop:10,/* the mgTier ease scale (0..5) and the raw mark scale (0..10) every game shares (jmgt / jsgame BAL.cut.sgStep) */
 geo:{face:.11,faceX:0,ear:.10,earX:.075,chest:.30,hands:.47,feet:.93,amp:.12,side:1.4,thin:.25}/* side / thin: gauge placement beside a target (layout) */,
 swipe:{ms:3200,zone:[.10,.18],spd:[.9,.25],fast:[1.6,.9],slow:[.5,.3],miss:0,low:3,mid:[5,8],top:10,dodgeMs:[900,1600]},/* dodgeMs = time the NPC's hand takes to land (ease 0 → 5) *//* fast / slow = stroke speed (figure-heights per s) for raw top / raw mid[0]; below slow = low; no hit = miss */
 tug:{ms:5000,start:.3,push:[.055,.085],back:[.30,.12]},/* push = meter per tap, back = meter lost per second */
 bow:{beats:3,gap:900,lead:600,r0:.45,r1:.07,win:[110,240],zero:3},/* ring from r0 to r1 (shares of figure height) in gap ms; full marks within ± win ms, nothing beyond zero × win */
 drag:{ms:4000,zone:[.12,.22],spd:[.6,.15],near:2,nearRaw:2,inMin:5,grab:1.6},/* drop inside the zone = inMin..10 by distance; within near × radius = nearRaw */
 ear:{ms:5000,need:2200,glance:[.9,.4],hot:.6,pen:3,zone:.09,mix:.37,grip:1.5},/* need = ms of safe holding for raw 10; glance = speed of the onlooker's look (per s); hot = look level that catches her; pen = raw lost when caught */
 words:{ms:6000,n:6,good:[.4,.65],spd:[.35,.15],goal:5,size:.07,hit:.75,spread:2.5}/* spread = how wide around her the signs rise (× amp) */,/* n glyphs at once; good = share of fitting ones; goal = good taps for raw 10 (2 per tap, −2 per wrong) */
 stare:{ms:4000,band:[.16,.30],mid:.6,rise:.6,fall:.5,push:[.9,.4],wob:1.3},/* hold = rise per s, release = fall per s; her push-back amplitude; raw = share of time in the band */
 walk:{in:700,out:600,veil:360,stagger:40},/* motion ms (MOTION.md: 0.3–2 s); the kit part kitFocus owns its own timings, these feed the fallback */
 react:1600,reactChars:60,/* the reaction line on the figure: the first sentence of the result, at most this many letters */
 idle:{every:[20000,40000],first:8000}/* mood bubble on the place stage: one person, at most once per this many ms (random in range); first = earliest after arriving */}});
/* the new occasion + kinds in the ONE tier table (jmgt): her rank raises the stake (0 at Đáp ứng … 2.1 at the top: ease 2 → about 0.3, spread over the whole climb) */
try{BAL.mgTier.occ.df=BAL.mgTier.occ.df||[0,.3];for(const k of ["df_swipe","df_tug","df_bow","df_drag","df_ear","df_words","df_stare"])if(BAL.mgTier.kAdj[k]==null)BAL.mgTier.kAdj[k]=0}catch(e){}
