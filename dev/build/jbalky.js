/* ================= jbalky: BAL.kyngo — every number of «Kỳ ngộ thường ngày» (jky.js; design dev/design/KYNGO.md; law 4 ONE CORE) =================
   Gate/roll: p = min(pMax, p0 + step × miss) + fest / wx bonus; miss ≥ pity → sure; a hit resets miss and starts cd[band] tuần.
   Bands: 0 S (cung nữ road) · 1 L (Đáp ứng–Quý nhân) · 2 M (Tần–Phi) · 3 H (Quý phi–Hoàng hậu). V[band] scales every gain AND cost of an option
   (bigger reward higher up, law 5), hard[band] lowers the odds of any roll inside an option (law 5), cd[band] = longer wait higher up.
   vw = the ONE value table that prices an option (law 2 check: dev/test/kyngo-eq.js; options of one encounter within eqTol; law 3: every
   option of a choice has a gain AND a loss, «plain» encounters are gain-only read cards). sv = value of the special gains.
   E[id] = {w weight, b allowed bands, o:[{g gains, c costs, s special, od base odds of the option's roll}] | plain:{g,s}}.
   Measured / tuned by dev/measure/kyngo-bot.js (OD 19/11 ~03:25Z: the roll is set FROM the measured eligibility, no double gate). */
Object.assign(BAL,{kyngo:{on:1,
 p0:85,step:15,pMax:95,pity:2,festP:4,wxP:2,cd:[2,2,3,3],/* stat-pace (OD 26/11 ~04:20Z «sự kiện diễn ra liên tục»): wait after a hit 2 / 2 / 3 / 3 tuần by band (was 1 each); one a day at most (BAL.evc.q.ky) */V:[1,1,1.4,1.8],hard:[0,0,8,16],
 eqTol:1.25,zeroMax:5,parTol:.35,
 pw:{vuon:1.4,lc:1,tn:1,kn:.8,thu:.8,dtd:.8,tyv:1,nvp:1,ksp:.8},fest:1.8,wx:1.4,world:1.5,
 seenOd:62,seenDanh:4,  /* «seen with a man / at the cold palace» roll inside an option: odds she is NOT seen; Danh lost when seen */
 gm:[1,1.15,1.35,1.6,1.9],   /* a found piece: gains of both options scale with its grade (lost jade vs lost hairpin), keeps them equal */
 cuPr:60,nguPr:55,      /* share (per hundred) of the piece's price paid to buy back a dead woman's effects / take the week's rare piece early */
 sucRest:30,evStep:1,intelN:1,thiOd:4,rkStep:1,bandR:[3,5],            /* sv_tuyet: Sức given back */
 loiK:"theu",loiArt:20, /* ma_giao «chép một lối» when every lối is known (or an NPC): art points of loiK instead */
 kidAge:12,             /* a child older than this no longer walks with the mother (kyPpl) */
 relSung:4,relLoyal:50,relLoyK:3, /* regard → Sủng with Hoàng thượng = rel / relSung; a servant's loyalty starts at relLoyal, moves rel / relLoyK */
 vw:{danh:2,sung:2,bac:.1,suc:.5,duc:2,tamco:1.5,th:.6,rel:.4,oan:.4,art:.5,kh:1.5,seen:.8,relM:.4,sucR:.5},
 sv:{loi:18,spy:20,ev:14,intel:14,cure:16,item:22,kn:14,rk:20,ret:0,give:0},
 E:{
  ma_phe:{w:1,b:"0123",o:[{g:{art:52},c:{kh:2,seen:1},a:"y",od:1},{g:{rel:30},c:{kh:2,seen:1},s:"intel",od:1}]},
  ma_giao:{w:1,b:"012",o:[{g:{},c:{suc:4,kh:1},s:"loi"},{g:{rel:16,art:28},c:{bac:30},a:"theu"}]},
  ma_nhac:{w:1,b:"123",o:[{g:{art:44},c:{kh:2,seen:1},a:"cam",od:1},{g:{art:24,sung:4},c:{bac:30,kh:1},a:"cam"}]},
  ma_hoa:{w:1,b:"123",o:[{g:{sung:8,rel:10},c:{bac:30,kh:1}},{g:{art:44},c:{kh:2,seen:1},a:"hoa",od:1}]},
  ma_ty:{w:1,b:"0123",o:[{g:{},c:{bac:20},s:"cure"},{g:{art:30,rel:16},c:{suc:8,kh:1},a:"y"}]},
  ma_co:{w:1,b:"23",o:[{g:{art:30,rel:20},c:{kh:2,suc:6},a:"ky"},{g:{rel:44,art:8},c:{danh:3,kh:1},a:"ky"}]},
  ma_lao:{w:1,b:"23",o:[{g:{art:26,rel:36},c:{kh:2,suc:6},a:"ky"},{g:{danh:6},c:{oan:10,kh:1},s:"intel"}]},
  vat_lac:{w:1.2,b:"0123",o:[{g:{rel:34,danh:5},c:{kh:1},s:"ret"},{g:{},c:{kh:1},s:"item"}]},
  vat_minh:{w:1,b:"0123",plain:{g:{},s:"ev"}},
  vat_cu:{w:.8,b:"23",o:[{g:{},c:{},s:"item",buy:1},{g:{th:30,duc:4},c:{kh:1},s:"give"}]},
  vat_thu:{w:.8,b:"0123",plain:{g:{rel:30,danh:2}}},
  vat_chung:{w:.9,b:"23",o:[{g:{tamco:4},c:{kh:1,oan:12},s:"ev"},{g:{rel:40},c:{kh:1}}]},
  vat_ngu:{w:.7,b:"123",o:[{g:{},c:{},s:"item",buy:1},{g:{th:30},c:{},buy:1}]},
  de_mua:{w:1.2,b:"123",o:[{g:{sung:12},c:{suc:6,oan:8}},{g:{danh:5,th:12,sung:2},c:{kh:1,suc:2}}]},
  de_but:{w:1,b:"23",o:[{g:{art:34,sung:3},c:{kh:2},a:"thi"},{g:{sung:12},c:{kh:2,suc:4}}]},
  de_den:{w:1.2,b:"123",o:[{g:{danh:11},c:{bac:20,kh:1}},{g:{sung:12},c:{oan:10,kh:1}}]},
  de_su:{w:.8,b:"23",o:[{g:{danh:6,th:14},c:{kh:2}},{g:{art:20,danh:6},c:{kh:2,seen:1},a:"thi",od:1,seenW:"thi"}]},
  th_kinh:{w:1,b:"0123",o:[{g:{th:40},c:{suc:8,kh:2}},{g:{duc:6,rel:20,th:6},c:{kh:2}}]},
  th_tham:{w:.8,b:"123",plain:{g:{},s:"kn"}},
  th_chi:{w:.8,b:"0123",plain:{g:{art:24,rel:16},a:"y"}},
  th_sao:{w:1,b:"123",o:[{g:{rel:56},c:{oan:10,kh:1}},{g:{art:26,danh:4},c:{kh:2},a:"thi"}]},
  sv_den:{w:1,b:"0123",o:[{g:{},c:{kh:1}/* TAI-MAT-KNOW: no oán here — her master does not know (OD 27/11 ~04:16Z) */,s:"spy"},{g:{rel:30,danh:3},c:{kh:2}}]},
  sv_tuyet:{w:.9,b:"0123",plain:{g:{rel:20,sucR:1}}},
  sv_co:{w:1,b:"0",o:[{g:{},c:{suc:8,kh:2},s:"rk"},{g:{th:30},c:{relM:8,kh:1}}]},
  sv_tre:{w:.8,b:"123",plain:{g:{rel:34}}}
 }}});
/* ORDER THIN P5 (jkyc.js composed Kỳ ngộ): on = cross-life memory live; seen = weight factor of an encounter (old 25 + composed) that a past life met
   (P0 family "ky"; fresh-first). The composed encounters' own rows (w, b, o / plain) are written into BAL.kyngo.E by jbalkyc.js (built). */
BAL.kyc={on:1,seen:.15};
