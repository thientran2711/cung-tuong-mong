/* ================= jbalge: ONE CORE (OD:L1267) rulebook of the GRAND ENDINGS (Đại kết cục, jge.js; design dev/design/GRAND_ENDINGS.md §2.14, r3) =================
   Every number the grand-ending engine uses or a text prints lives here; jge.js / jgedata.js hold words, option names and logic only.
   Loads after jbal2.js (BAL exists), before jgedata.js / jge.js. Set by measurement: dev/measure/ge-measure.js (bands BAL.ge.target).
   OPEN owner decisions (design §8.2) are switches here, so her ruling is one key flip:
     D3 BAL.ge.when       "ch14" (recommended: the Hồi kết nhánh comes right after chapter 14) · alt "r11" (right after the road finale .11)
     D4 BAL.ge.after      "rec"  (recommended: stay-endings continue the life, leave/throne/foreign endings close it) · alt "close" (all close) · "stay" (all continue)
     D5 BAL.ge.title.carry "prev" (recommended: only the previous life's grand title is wearable next life, cosmetic) · alt "any" (any title ever earned)
     D7 BAL.ge.showOdds   false  (recommended: the two last choices show no odds) · alt true (the ladder word on the pair that points to an open ending)
     D8 BAL.ge.quietLoss  false  (recommended: a pair that points at no ending lands on a fail outcome with NO loss) · alt true (with its loss)
   KIT gates: BAL.ge.mapOn = the Sơ đồ nhánh page (kitBranchMap, K-GE-1, landed); the Sơ đồ nhánh data API geMap() works either way. */
BAL.ge={
 on:true,              /* the engine runs for branches with full data (GE_DATA) only; other branches keep today's game */
 n:{grand:4,rare:2},   /* fixed counts per branch (owner L1623 (1)); no normal endings */
 when:"ch14",          /* D3 */
 after:"rec",          /* D4 */
 showOdds:false,       /* D7 */
 quietLoss:false,      /* D8 */
 mapOn:true,           /* K-GE-1 kitBranchMap landed (90b7e797): the Sơ đồ nhánh page in Sổ luân hồi is on */
 pull:{step:1,push:1}, /* a Chuỗi option adds step to its ending's pull; a push option takes push away (never below 0) */
 /* odds of the open ending her pair points to: base + pull × per − rank × her rank step (law 5, harder as she climbs: 0 Đáp ứng … 7 Hoàng hậu,
    ONE key for every branch of every wave, brief E35), clamped [min, max]; its condition not met → capped at noCond */
 odds:{base:22,per:9,rank:2,min:5,max:88,noCond:12},
 /* option C shading lean: lean = Σ option tags × tag + (Đức now − Đức at life start) × duc + Ngã rẽ 2 sign × last; ≥ cut → thiện, ≤ −cut → ác, else natural */
 var:{tag:4,duc:.05,last:3,cut:8},/* run 3 (sensible bot): Đức climbs +19..+70 in every mode, so .25 drowned the arc choices; tag 4 + duc .05 lets the choices lead */
 /* "người ấy" for «Theo người ấy đi»: the strongest real bond — a man's tình ≥ men, or a consort's thiện cảm ≥ sis */
 bond:{men:30,sis:40},
 seat:["NDE","THH","HH","TM"],  /* one per world: taken by anyone → every other ending needing it turns fail-only */
 /* summits that close the life with an epilogue under D4 "rec" (the game cannot simulate the life after) */
 exitSum:["FREE","NUN","FOLLOW","NDE","THH","NV","KING","ANNEX","TM","REUNION"],
 title:{tier:8,carry:"prev"},   /* D5; tier 8 = the top kit plate until K-GE-2 (2-tone Thiên mệnh plate) ships */
 pt:30,                /* leaderboard points of a grand ending (Bảng Thiên mệnh) */
 kimsach:"kimsachtm",  /* the one treasure kind: Kim sách Thiên mệnh (cannot be sold, given or lost, OD:L1314) */
 /* conditions: the gate of each ending (stat floors, relation floors; Tai mắt «mat» is on its own 0–10 scale, every other stat 0–100 — ge-guard checks it); words in jgedata cw print these */
 gate:{
  tt_co_1:{mat:4},tt_co_2:{duc:45,sung:45},tt_co_3:{dad:20},tt_co_4:{sung:50,tamco:40},
  cnv_mat_1:{sung:50},cnv_mat_2:{sung:55,tamco:40},cnv_mat_3:{duc:40,maid:55},cnv_mat_4:{mis:20},
  nc_tuc_1:{tai:55,danh:40},nc_tuc_2:{th:40},nc_tuc_3:{tamco:45,mat:3},nc_tuc_4:{duc:35},
 /* writer wave W1 (brief E11, jgedata_w1.js): tt_oan tt_tranh tt_mat · dtq_* · muoi_* (same scales and sizes as the pilots) */
 tt_oan_1:{duc:45,danh:40},tt_oan_2:{tamco:45,mat:3},tt_oan_3:{tai:50,danh:35},tt_oan_4:{duc:40},
 tt_tranh_1:{dad:30,duc:40},tt_tranh_2:{tamco:45,mat:3},tt_tranh_3:{duc:35,tai:40},tt_tranh_4:{sung:55},
 tt_mat_1:{sung:50},tt_mat_2:{hh:20,duc:35},tt_mat_3:{tamco:45,mat:3},tt_mat_4:{duc:45,hh:10},
 dtq_bien_1:{tai:45,dad:35},dtq_bien_2:{tamco:45,mat:4},dtq_bien_3:{sung:45},dtq_bien_4:{duc:40,suc:45},
 dtq_vu_1:{duc:45,sung:40},dtq_vu_2:{tamco:50,dad:40},dtq_vu_3:{duc:35,dad:20},dtq_vu_4:{tamco:45,danh:35},
 dtq_binh_1:{tamco:50,mat:4},dtq_binh_2:{duc:45,sung:45},dtq_binh_3:{tai:40,duc:35},dtq_binh_4:{dad:20,duc:40},
 dtq_huynh_1:{dad:25,duc:35},dtq_huynh_2:{danh:40,sung:40},dtq_huynh_3:{tamco:45,dad:30},dtq_huynh_4:{sac:50,mat:2},
 muoi_tuoc_1:{tai:40,danh:40},muoi_tuoc_2:{th:30},muoi_tuoc_3:{tamco:45},muoi_tuoc_4:{duc:35,dad:20},
 muoi_lau_1:{duc:40,danh:40},muoi_lau_2:{tamco:45,mat:3},muoi_lau_3:{duc:35,tamco:30},muoi_lau_4:{tamco:40,danh:35},
 muoi_doi_1:{duc:45,danh:35},muoi_doi_2:{tamco:45,dad:35},muoi_doi_3:{sung:45,danh:45},muoi_doi_4:{tamco:40,mat:3},
 muoi_no_1:{tamco:45,mat:4},muoi_no_2:{duc:40,danh:30},muoi_no_3:{duc:35,dad:20},muoi_no_4:{duc:40,tai:35},
 /* writer wave W2 (brief E11, jgedata_w2.js): cn_* · nc_gian nc_su nc_vuong · td_* (same scales and sizes as the pilots) */
 cn_chu_1:{danh:45,maid:50},cn_chu_2:{duc:40,danh:35},cn_chu_3:{duc:40,sung:35},cn_chu_4:{sung:50,tamco:40},
 cn_tinh_1:{tamco:40},cn_tinh_2:{sung:50,tamco:45},cn_tinh_3:{duc:40,danh:40},cn_tinh_4:{duc:45},
 cn_ban_1:{tai:50,danh:40},cn_ban_2:{duc:45,danh:30},cn_ban_3:{duc:40,sung:35},cn_ban_4:{tamco:45,sung:45},
 cn_than_1:{danh:40,duc:35},cn_than_2:{mat:4,danh:50},cn_than_3:{duc:35,tamco:35},cn_than_4:{tamco:45,mat:3},
 nc_gian_1:{tamco:45,mat:4},nc_gian_2:{sung:50,duc:40},nc_gian_3:{duc:35,tamco:40},nc_gian_4:{tai:40,duc:30},
 nc_su_1:{danh:45,sung:40},nc_su_2:{tai:50,mat:3},nc_su_3:{tamco:45,mat:4},nc_su_4:{duc:35},
 nc_vuong_1:{tamco:45,danh:45},nc_vuong_2:{sung:45,duc:40},nc_vuong_3:{sung:50,tamco:40,mat:3},nc_vuong_4:{tamco:35},
 td_an_1:{danh:40,th:35},td_an_2:{tamco:45,sung:50},td_an_3:{tai:55,danh:35},td_an_4:{duc:35,sung:35},
 td_ke_1:{mat:4,tamco:45},td_ke_2:{duc:45,danh:35},td_ke_3:{mat:4,maid:50},td_ke_4:{tamco:35,duc:30},
 td_song_1:{danh:40,sung:45},td_song_2:{tamco:50,mat:4},td_song_3:{duc:35,maid:45},td_song_4:{duc:45,th:30},
 td_tha_1:{duc:45,sung:40},td_tha_2:{tamco:45,mat:3},td_tha_3:{duc:40,th:30},td_tha_4:{danh:30,duc:40},
 /* writer wave W3 (brief E11, jgedata_w3.js): ch_* · thd_* · cnv_chu cnv_ban cnv_ma (same scales and sizes as the pilots) */
 ch_co_1:{mat:4},ch_co_2:{tamco:50,sung:40},ch_co_3:{duc:40,danh:35},ch_co_4:{duc:40},
 ch_benh_1:{tai:50,danh:35},ch_benh_2:{tamco:45,mat:3},ch_benh_3:{duc:40,sung:45},ch_benh_4:{th:30,duc:35},
 ch_ho_1:{duc:40,danh:35},ch_ho_2:{sung:55,tamco:40},ch_ho_3:{duc:40},ch_ho_4:{dad:30,tamco:40},
 ch_bi_1:{duc:45,danh:35},ch_bi_2:{tamco:50,mat:3},ch_bi_3:{th:30,duc:35},ch_bi_4:{tamco:45},
 thd_tho_1:{tai:55,danh:40},thd_tho_2:{tai:45,tamco:45},thd_tho_3:{duc:35,tai:40},thd_tho_4:{sung:50,tai:45},
 thd_sach_1:{tai:50,mat:4},thd_sach_2:{tamco:45,sung:45},thd_sach_3:{duc:40,danh:35},thd_sach_4:{tai:40,dad:25},
 thd_tro_1:{duc:40},thd_tro_2:{tamco:45,danh:40},thd_tro_3:{duc:35,dad:25},thd_tro_4:{duc:40,tamco:40},
 thd_hoc_1:{tai:50,sung:40},thd_hoc_2:{tamco:50,mat:3},thd_hoc_3:{duc:40,tai:35},thd_hoc_4:{duc:40,sung:40},
 cnv_chu_1:{tamco:45,mat:2},cnv_chu_2:{mis:20},cnv_chu_3:{duc:35,tamco:35},cnv_chu_4:{duc:40,mat:2},
 cnv_ban_1:{duc:40},cnv_ban_2:{tamco:45,danh:30},cnv_ban_3:{tai:45,danh:30},cnv_ban_4:{duc:30,sac:40},
 cnv_ma_1:{tai:45,danh:35},cnv_ma_2:{tamco:45,mat:3},cnv_ma_3:{duc:40,danh:30},cnv_ma_4:{duc:40,sung:35},
 /* Ba Tư wave (brief E28, jgedata_bd.js): bd_san bd_soi bd_tuyet bd_hen (same scales and sizes as the pilots) */
 bd_san_1:{tai:50,danh:35},bd_san_2:{sung:50,duc:35},bd_san_3:{tamco:45,mat:2},bd_san_4:{duc:35,suc:40},
 bd_soi_1:{tamco:45,danh:45},bd_soi_2:{sung:45,duc:40},bd_soi_3:{mat:2,tamco:45},bd_soi_4:{sung:45},
 bd_tuyet_1:{duc:45,danh:35},bd_tuyet_2:{tamco:40,danh:40},bd_tuyet_3:{mat:2,tamco:45},bd_tuyet_4:{tai:55},
 bd_hen_1:{duc:40},bd_hen_2:{sung:55,tamco:40},bd_hen_3:{duc:40,danh:35},bd_hen_4:{tamco:45},
 /* Phù Tang wave (brief E35, jgedata_pt.js): pt_hai pt_su pt_tang pt_dang (same scales and sizes as the pilots) */
 pt_hai_1:{duc:40,danh:35},pt_hai_2:{tamco:45,mat:2},pt_hai_3:{sung:45,tamco:40},pt_hai_4:{suc:45,danh:30},
 pt_su_1:{danh:45,duc:35},pt_su_2:{tai:55,danh:30},pt_su_3:{mat:2,tamco:45},pt_su_4:{tamco:40,danh:40},
 pt_tang_1:{duc:45,danh:35},pt_tang_2:{duc:40,sung:40},pt_tang_3:{mat:2,tamco:45},pt_tang_4:{duc:40},
 pt_dang_1:{tamco:45,danh:35},pt_dang_2:{duc:40},pt_dang_3:{mat:2,sung:40},pt_dang_4:{duc:40,tai:40}},
 /* fail-outcome losses (her pair pointed at the ending and missed; none in the quiet form unless quietLoss) */
 fail:{
  tt_co_1:{rank:-1,danh:-12},tt_co_2:{sung:-8,danh:-4},tt_co_3:{sung:-8,danh:-6},tt_co_4:{danh:-10,duc:-6},
  cnv_mat_1:{sung:-8,danh:-6},cnv_mat_2:{rank:-1,danh:-10,mis:-15},cnv_mat_3:{sung:-8},cnv_mat_4:{mis:-15},
  nc_tuc_1:{danh:-8,sung:-4},nc_tuc_2:{th:-12,danh:-6},nc_tuc_3:{danh:-10,duc:-6},nc_tuc_4:{sung:-8,danh:-4},
 /* writer wave W1 (brief E11, jgedata_w1.js): tt_oan tt_tranh tt_mat · dtq_* · muoi_* (same scales and sizes as the pilots) */
 tt_oan_1:{danh:-10,duc:-4},tt_oan_2:{danh:-10,sung:-6},tt_oan_3:{danh:-8,tai:-4},tt_oan_4:{sung:-8,danh:-6},
 tt_tranh_1:{danh:-8,duc:-4},tt_tranh_2:{danh:-10,sung:-8},tt_tranh_3:{sung:-6,danh:-4},tt_tranh_4:{rank:-1,danh:-8},
 tt_mat_1:{rank:-1,danh:-10},tt_mat_2:{hh:-20,danh:-6},tt_mat_3:{danh:-10,hh:-15},tt_mat_4:{sung:-8,danh:-4},
 dtq_bien_1:{danh:-8,sung:-6},dtq_bien_2:{sung:-10,danh:-8},dtq_bien_3:{sung:-6,danh:-6},dtq_bien_4:{sung:-8,danh:-6},
 dtq_vu_1:{danh:-10,duc:-4},dtq_vu_2:{rank:-1,danh:-12},dtq_vu_3:{sung:-8,danh:-6},dtq_vu_4:{danh:-10,tamco:-4},
 dtq_binh_1:{rank:-1,danh:-12},dtq_binh_2:{sung:-8,danh:-4},dtq_binh_3:{sung:-10,danh:-6},dtq_binh_4:{sung:-8,danh:-4},
 dtq_huynh_1:{sung:-8,danh:-6},dtq_huynh_2:{danh:-10,sung:-4},dtq_huynh_3:{danh:-10,duc:-4},dtq_huynh_4:{danh:-12,sung:-6},
 muoi_tuoc_1:{danh:-10,sung:-4},muoi_tuoc_2:{danh:-8,th:-10},muoi_tuoc_3:{th:-12,danh:-6},muoi_tuoc_4:{sung:-6,danh:-6},
 muoi_lau_1:{danh:-8,duc:-4},muoi_lau_2:{rank:-1,danh:-10},muoi_lau_3:{sung:-8,danh:-6},muoi_lau_4:{danh:-8,tamco:-4},
 muoi_doi_1:{sung:-6,danh:-6},muoi_doi_2:{danh:-10,duc:-6},muoi_doi_3:{danh:-10,sung:-4},muoi_doi_4:{danh:-10,duc:-4},
 muoi_no_1:{danh:-8,sung:-6},muoi_no_2:{danh:-6,duc:-4},muoi_no_3:{sung:-6,danh:-6},muoi_no_4:{danh:-10,sung:-4},
 /* writer wave W2 (brief E11, jgedata_w2.js): cn_* · nc_gian nc_su nc_vuong · td_* (same scales and sizes as the pilots) */
 cn_chu_1:{danh:-10,sung:-4},cn_chu_2:{danh:-8},cn_chu_3:{sung:-8,danh:-4},cn_chu_4:{sung:-10,danh:-6},
 cn_tinh_1:{rank:-1,sung:-10},cn_tinh_2:{sung:-10},cn_tinh_3:{rank:-1,danh:-8},cn_tinh_4:{danh:-6},
 cn_ban_1:{danh:-8},cn_ban_2:{danh:-6,duc:-4},cn_ban_3:{sung:-6},cn_ban_4:{danh:-12,duc:-8},
 cn_than_1:{danh:-10},cn_than_2:{rank:-1,danh:-10},cn_than_3:{sung:-6},cn_than_4:{danh:-8,sung:-6},
 nc_gian_1:{rank:-1,danh:-12},nc_gian_2:{sung:-8},nc_gian_3:{sung:-6,danh:-4},nc_gian_4:{sung:-8},
 nc_su_1:{danh:-10},nc_su_2:{danh:-8},nc_su_3:{sung:-8,danh:-6},nc_su_4:{sung:-4},
 nc_vuong_1:{sung:-10,danh:-6},nc_vuong_2:{danh:-8},nc_vuong_3:{sung:-8,danh:-8},nc_vuong_4:{sung:-6},
 td_an_1:{danh:-10},td_an_2:{danh:-8,duc:-4},td_an_3:{danh:-6},td_an_4:{sung:-6},
 td_ke_1:{danh:-10,mat:-2},td_ke_2:{sung:-8},td_ke_3:{mat:-3},td_ke_4:{sung:-8,danh:-4},
 td_song_1:{danh:-8},td_song_2:{rank:-1,danh:-12},td_song_3:{sung:-6},td_song_4:{rank:-1,sung:-8},
 td_tha_1:{danh:-6},td_tha_2:{sung:-8,danh:-6},td_tha_3:{danh:-6},td_tha_4:{danh:-10},
 /* writer wave W3 (brief E11, jgedata_w3.js): ch_* · thd_* · cnv_chu cnv_ban cnv_ma (same scales and sizes as the pilots) */
 ch_co_1:{rank:-1,danh:-12},ch_co_2:{danh:-10,sung:-6},ch_co_3:{sung:-6,danh:-6},ch_co_4:{sung:-8,danh:-4},
 ch_benh_1:{danh:-8,tai:-4},ch_benh_2:{danh:-10,duc:-6},ch_benh_3:{danh:-8,sung:-6},ch_benh_4:{sung:-6,danh:-6},
 ch_ho_1:{danh:-8,sung:-6},ch_ho_2:{rank:-1,danh:-10},ch_ho_3:{sung:-6,danh:-6},ch_ho_4:{danh:-10,sung:-6},
 ch_bi_1:{danh:-10,duc:-4},ch_bi_2:{danh:-10,tamco:-4},ch_bi_3:{danh:-8,sung:-6},ch_bi_4:{rank:-1,danh:-12},
 thd_tho_1:{danh:-8,tai:-4},thd_tho_2:{danh:-10,sung:-6},thd_tho_3:{sung:-6,danh:-6},thd_tho_4:{sung:-8,danh:-4},
 thd_sach_1:{rank:-1,danh:-12},thd_sach_2:{danh:-10,duc:-6},thd_sach_3:{danh:-8,sung:-4},thd_sach_4:{sung:-8,danh:-6},
 thd_tro_1:{danh:-8,sung:-4},thd_tro_2:{danh:-10,sung:-8},thd_tro_3:{sung:-8,danh:-6},thd_tro_4:{danh:-10,sung:-4},
 thd_hoc_1:{danh:-8,sung:-6},thd_hoc_2:{rank:-1,danh:-10},thd_hoc_3:{sung:-6,danh:-6},thd_hoc_4:{sung:-8,danh:-6},
 cnv_chu_1:{danh:-8,mis:-15},cnv_chu_2:{mis:-15,danh:-6},cnv_chu_3:{sung:-6,danh:-6},cnv_chu_4:{danh:-10,duc:-4},
 cnv_ban_1:{sung:-6,danh:-6},cnv_ban_2:{danh:-10,duc:-6},cnv_ban_3:{danh:-8,tai:-4},cnv_ban_4:{sung:-8,danh:-4},
 cnv_ma_1:{danh:-8,sung:-6},cnv_ma_2:{danh:-10,duc:-6},cnv_ma_3:{sung:-6,danh:-6},cnv_ma_4:{danh:-8,sung:-6},
 /* Ba Tư wave (brief E28, jgedata_bd.js): bd_san bd_soi bd_tuyet bd_hen (same scales and sizes as the pilots) */
 bd_san_1:{danh:-8,tai:-4},bd_san_2:{sung:-8,danh:-4},bd_san_3:{danh:-10,duc:-4},bd_san_4:{sung:-8,danh:-6},
 bd_soi_1:{rank:-1,danh:-12},bd_soi_2:{danh:-10,sung:-4},bd_soi_3:{sung:-10,danh:-6},bd_soi_4:{danh:-8,sung:-6},
 bd_tuyet_1:{danh:-8,duc:-4},bd_tuyet_2:{danh:-8,sung:-4},bd_tuyet_3:{rank:-1,danh:-10},bd_tuyet_4:{danh:-6},
 bd_hen_1:{sung:-10,danh:-6},bd_hen_2:{danh:-10,sung:-6},bd_hen_3:{danh:-8},bd_hen_4:{danh:-8,sung:-4},
 /* Phù Tang wave (brief E35, jgedata_pt.js): pt_hai pt_su pt_tang pt_dang (same scales and sizes as the pilots) */
 pt_hai_1:{danh:-8,duc:-4},pt_hai_2:{danh:-10,tamco:-4},pt_hai_3:{sung:-10,danh:-6},pt_hai_4:{sung:-8,danh:-4},
 pt_su_1:{danh:-10,sung:-4},pt_su_2:{danh:-8,tai:-4},pt_su_3:{rank:-1,danh:-10},pt_su_4:{sung:-10,danh:-6},
 pt_tang_1:{danh:-8,duc:-4},pt_tang_2:{danh:-6},pt_tang_3:{sung:-10,danh:-6},pt_tang_4:{danh:-8},
 pt_dang_1:{danh:-8,tamco:-4},pt_dang_2:{danh:-8,duc:-4},pt_dang_3:{sung:-10,danh:-6},pt_dang_4:{danh:-8,sung:-4}},
 /* rewards: the same SIZE for both shadings (fair: no "right" morality); only the sign of everyone's attitude differs (rel thiện → thiện cảm +, ác → oán +).
    rw.mul × the road's RD97L rare fx ≈ the size (start 3×); rank = steps (never above the seat rules: Hoàng hậu only by seat "HH"); mis = the named NPC's attitude */
 rw:{mul:3,
  tt_co_1:{danh:36,sung:18,mat:2,rel:8},tt_co_2:{rank:1,danh:30,sung:18,duc:6,rel:8},tt_co_3:{danh:24,duc:12,rel:6},tt_co_4:{rank:1,danh:30,sung:20,rel:8},
  cnv_mat_1:{rank:1,sung:30,danh:18,rel:6},cnv_mat_2:{seat:"HH",danh:30,sung:15,rel:8},cnv_mat_3:{danh:20,duc:12,bac:300,rel:6},cnv_mat_4:{rank:1,danh:24,sung:15,mis:20,rel:6},
  nc_tuc_1:{rank:1,danh:30,sung:18,tai:10,rel:8},nc_tuc_2:{danh:36,th:20,rel:8},nc_tuc_3:{rank:1,danh:30,tamco:10,rel:10},nc_tuc_4:{danh:24,duc:12,rel:6},
 /* writer wave W1 (brief E11, jgedata_w1.js): tt_oan tt_tranh tt_mat · dtq_* · muoi_* (same scales and sizes as the pilots) */
 tt_oan_1:{rank:1,danh:30,duc:10,sung:12,rel:8},tt_oan_2:{danh:30,tamco:10,mat:2,rel:8},tt_oan_3:{rank:1,danh:30,tai:10,rel:8},tt_oan_4:{danh:24,duc:12,bac:300,rel:6},
 tt_tranh_1:{danh:30,duc:10,sung:12,rel:8},tt_tranh_2:{rank:1,danh:30,tamco:10,rel:8},tt_tranh_3:{danh:24,duc:12,bac:300,rel:6},tt_tranh_4:{seat:"HH",danh:30,sung:15,rel:8},
 tt_mat_1:{seat:"HH",danh:30,sung:15,rel:8},tt_mat_2:{rank:1,danh:24,sung:15,hh:20,rel:6},tt_mat_3:{rank:1,danh:30,tamco:10,rel:10},tt_mat_4:{danh:24,duc:12,rel:6},
 dtq_bien_1:{danh:36,tai:10,sung:12,rel:8},dtq_bien_2:{rank:1,danh:30,mat:2,rel:8},dtq_bien_3:{rank:1,danh:30,sung:18,rel:8},dtq_bien_4:{danh:24,duc:12,bac:300,rel:6},
 dtq_vu_1:{rank:1,danh:30,duc:10,sung:12,rel:8},dtq_vu_2:{danh:36,tamco:10,mat:2,rel:10},dtq_vu_3:{danh:24,duc:12,bac:300,rel:6},dtq_vu_4:{rank:1,danh:30,tamco:10,rel:8},
 dtq_binh_1:{danh:36,sung:18,mat:2,rel:8},dtq_binh_2:{rank:1,danh:30,sung:18,duc:6,rel:8},dtq_binh_3:{danh:24,sung:12,bac:300,rel:6},dtq_binh_4:{danh:24,duc:12,bac:300,rel:6},
 dtq_huynh_1:{danh:24,duc:12,bac:300,rel:6},dtq_huynh_2:{rank:1,danh:30,sung:18,rel:8},dtq_huynh_3:{rank:1,danh:30,tamco:10,rel:8},dtq_huynh_4:{danh:24,sac:10,bac:300,rel:6},
 muoi_tuoc_1:{danh:30,tai:10,bac:300,rel:6},muoi_tuoc_2:{rank:1,danh:30,sung:15,th:20,rel:8},muoi_tuoc_3:{danh:36,th:20,rel:8},muoi_tuoc_4:{danh:24,duc:12,bac:300,rel:6},
 muoi_lau_1:{rank:1,danh:30,duc:10,sung:12,rel:8},muoi_lau_2:{rank:1,danh:30,mat:2,tamco:10,rel:8},muoi_lau_3:{danh:24,duc:12,bac:300,rel:6},muoi_lau_4:{rank:1,danh:30,tamco:10,rel:8},
 muoi_doi_1:{danh:30,duc:12,bac:300,rel:8},muoi_doi_2:{rank:1,danh:30,tamco:10,rel:8},muoi_doi_3:{rank:1,danh:30,sung:18,duc:6,rel:8},muoi_doi_4:{rank:1,danh:30,mat:2,rel:8},
 muoi_no_1:{rank:1,danh:30,mat:2,tamco:10,rel:8},muoi_no_2:{rank:1,danh:24,sung:15,duc:6,rel:6},muoi_no_3:{danh:24,duc:12,bac:300,rel:6},muoi_no_4:{danh:24,duc:12,bac:300,rel:6},
 /* writer wave W2 (brief E11, jgedata_w2.js): cn_* · nc_gian nc_su nc_vuong · td_* (same scales and sizes as the pilots) */
 cn_chu_1:{rank:1,danh:30,sung:18,rel:8},cn_chu_2:{danh:24,duc:12,rel:8},cn_chu_3:{danh:20,duc:12,bac:300,rel:6},cn_chu_4:{seat:"TM",danh:30,sung:15,rel:8},
 cn_tinh_1:{danh:18,duc:10,bac:200,rel:6},cn_tinh_2:{rank:1,sung:30,danh:18,rel:6},cn_tinh_3:{danh:24,sung:20,duc:8,rel:8},cn_tinh_4:{danh:20,duc:15,rel:6},
 cn_ban_1:{rank:1,danh:30,tai:10,rel:8},cn_ban_2:{danh:24,duc:12,rel:8},cn_ban_3:{danh:20,duc:12,bac:300,rel:6},cn_ban_4:{rank:1,danh:24,sung:20,rel:6},
 cn_than_1:{danh:36,duc:10,rel:8},cn_than_2:{danh:36,sung:18,mat:2,rel:8},cn_than_3:{danh:20,duc:12,rel:6},cn_than_4:{danh:30,tamco:10,rel:8},
 nc_gian_1:{danh:30,tamco:10,mat:2,rel:8},nc_gian_2:{rank:1,sung:24,danh:24,rel:8},nc_gian_3:{danh:20,duc:12,bac:300,rel:6},nc_gian_4:{danh:20,duc:10,rel:6},
 nc_su_1:{danh:36,sung:18,rel:8},nc_su_2:{danh:30,tai:10,rel:8},nc_su_3:{danh:30,tamco:10,rel:8},nc_su_4:{danh:20,duc:12,rel:6},
 nc_vuong_1:{danh:36,sung:18,rel:8},nc_vuong_2:{rank:1,danh:30,duc:8,rel:8},nc_vuong_3:{rank:1,danh:30,sung:18,rel:8},nc_vuong_4:{danh:20,duc:12,rel:6},
 td_an_1:{danh:36,duc:10,rel:8},td_an_2:{rank:1,danh:30,tamco:10,rel:8},td_an_3:{danh:30,tai:10,rel:8},td_an_4:{danh:20,duc:12,rel:6},
 td_ke_1:{rank:1,danh:30,mat:2,rel:8},td_ke_2:{danh:24,duc:12,rel:8},td_ke_3:{danh:24,mat:3,rel:8},td_ke_4:{danh:18,duc:10,rel:6},
 td_song_1:{rank:1,danh:30,sung:15,rel:8},td_song_2:{danh:36,sung:18,rel:8},td_song_3:{danh:20,duc:12,bac:300,rel:6},td_song_4:{danh:24,duc:15,rel:8},
 td_tha_1:{danh:24,duc:12,rel:8},td_tha_2:{rank:1,danh:30,tamco:10,rel:8},td_tha_3:{danh:20,duc:15,rel:6},td_tha_4:{danh:20,duc:12,rel:6},
 /* writer wave W3 (brief E11, jgedata_w3.js): ch_* · thd_* · cnv_chu cnv_ban cnv_ma (same scales and sizes as the pilots) */
 ch_co_1:{danh:36,mat:2,tamco:10,rel:8},ch_co_2:{rank:1,danh:30,tamco:10,rel:8},ch_co_3:{danh:24,duc:12,sung:12,rel:6},ch_co_4:{danh:24,duc:12,bac:300,rel:6},
 ch_benh_1:{danh:30,tai:10,bac:300,rel:6},ch_benh_2:{rank:1,danh:30,mat:2,rel:8},ch_benh_3:{rank:1,danh:30,sung:18,rel:8},ch_benh_4:{danh:24,duc:12,th:20,rel:6},
 ch_ho_1:{rank:1,danh:24,duc:6,sung:12,rel:6},ch_ho_2:{seat:"HH",danh:30,sung:15,rel:8},ch_ho_3:{danh:24,duc:12,bac:300,rel:6},ch_ho_4:{rank:1,danh:30,tamco:10,rel:8},
 ch_bi_1:{rank:1,danh:30,duc:10,sung:12,rel:8},ch_bi_2:{rank:1,danh:30,tamco:10,mat:2,rel:8},ch_bi_3:{danh:24,duc:12,bac:300,rel:6},ch_bi_4:{danh:36,sung:18,rel:10},
 thd_tho_1:{danh:30,tai:10,bac:300,rel:6},thd_tho_2:{rank:1,danh:30,tamco:10,rel:8},thd_tho_3:{danh:24,duc:12,bac:300,rel:6},thd_tho_4:{rank:1,sung:30,danh:18,rel:6},
 thd_sach_1:{danh:36,sung:18,mat:2,rel:8},thd_sach_2:{rank:1,danh:30,tamco:10,rel:8},thd_sach_3:{danh:24,duc:12,bac:300,rel:6},thd_sach_4:{danh:24,duc:12,bac:300,rel:6},
 thd_tro_1:{rank:1,danh:30,duc:10,sung:12,rel:8},thd_tro_2:{rank:1,danh:30,mat:2,rel:8},thd_tro_3:{danh:24,duc:12,bac:300,rel:6},thd_tro_4:{rank:1,danh:30,duc:10,rel:8},
 thd_hoc_1:{rank:1,danh:30,tai:10,rel:8},thd_hoc_2:{danh:36,tamco:10,mat:2,rel:10},thd_hoc_3:{danh:24,duc:12,bac:300,rel:6},thd_hoc_4:{rank:1,danh:24,sung:15,duc:6,rel:6},
 cnv_chu_1:{rank:1,danh:30,mat:2,tamco:10,rel:8},cnv_chu_2:{rank:1,danh:24,sung:15,mis:20,rel:6},cnv_chu_3:{danh:20,duc:12,bac:300,rel:6},cnv_chu_4:{rank:1,danh:30,duc:10,rel:8},
 cnv_ban_1:{danh:20,duc:12,bac:300,rel:6},cnv_ban_2:{rank:1,danh:30,tamco:10,rel:8},cnv_ban_3:{rank:1,danh:30,tai:10,rel:8},cnv_ban_4:{danh:24,duc:12,bac:300,rel:6},
 cnv_ma_1:{rank:1,danh:30,tai:10,rel:8},cnv_ma_2:{rank:1,danh:30,mat:2,tamco:10,rel:8},cnv_ma_3:{danh:20,duc:12,bac:300,rel:6},cnv_ma_4:{rank:1,danh:30,duc:10,sung:12,rel:8},
 /* Ba Tư wave (brief E28, jgedata_bd.js): bd_san bd_soi bd_tuyet bd_hen (same scales and sizes as the pilots) */
 bd_san_1:{rank:1,danh:30,tai:10,rel:8},bd_san_2:{rank:1,sung:30,danh:18,rel:6},bd_san_3:{danh:30,tamco:10,mat:2,rel:8},bd_san_4:{danh:20,duc:12,bac:300,rel:6},
 bd_soi_1:{danh:36,sung:18,rel:8},bd_soi_2:{rank:1,danh:30,duc:10,rel:8},bd_soi_3:{rank:1,danh:30,tamco:10,rel:8},bd_soi_4:{seat:"TM",danh:30,sung:15,rel:8},
 bd_tuyet_1:{danh:36,duc:12,rel:8},bd_tuyet_2:{rank:1,danh:30,tamco:10,rel:8},bd_tuyet_3:{danh:30,mat:2,tamco:10,rel:8},bd_tuyet_4:{danh:30,tai:10,rel:8},
 bd_hen_1:{danh:20,duc:12,rel:6},bd_hen_2:{rank:1,sung:24,danh:24,rel:8},bd_hen_3:{danh:24,duc:12,rel:8},bd_hen_4:{danh:30,tamco:10,rel:8},
 /* Phù Tang wave (brief E35, jgedata_pt.js): pt_hai pt_su pt_tang pt_dang (same scales and sizes as the pilots) */
 pt_hai_1:{rank:1,danh:30,duc:10,rel:8},pt_hai_2:{rank:1,danh:30,tamco:10,mat:2,rel:8},pt_hai_3:{rank:1,sung:30,danh:18,rel:6},pt_hai_4:{danh:20,suc:12,bac:300,rel:6},
 pt_su_1:{rank:1,danh:30,duc:10,rel:8},pt_su_2:{rank:1,danh:30,tai:10,rel:8},pt_su_3:{rank:1,danh:30,tamco:10,rel:8},pt_su_4:{danh:36,tamco:12,rel:8},
 pt_tang_1:{rank:1,danh:30,duc:10,rel:8},pt_tang_2:{rank:1,sung:24,danh:24,rel:8},pt_tang_3:{rank:1,danh:30,mat:2,rel:8},pt_tang_4:{danh:24,duc:12,bac:300,rel:6},
 pt_dang_1:{rank:1,danh:30,tamco:10,rel:8},pt_dang_2:{danh:30,duc:12,rel:8},pt_dang_3:{rank:1,danh:30,sung:10,rel:8},pt_dang_4:{danh:36,tai:12,rel:8}},
 /* GE10 (design §2.9 "Helping"): her help on an NPC's road (the jnroad help hồi) moves that NPC's grand ending — help = +pull on the ending
    the NPC leans toward most (it stays open), a betrayal = −push on it (at 0 pull it turns fail-only: sabotage can close one); the rival she
    told gets the same +pull (two-way, laws 1–2, like BAL.nroad.help). rw = her reward when an NPC she helped (no betrayal) then unlocks. */
 help:{rw:{danh:6,duc:3},pull:2,push:2},
 /* GE09 NPC parity (design §2.9, OD:L1386/L1403/L1601 (4)): an NPC consort whose road is a live branch (GE_DATA) gets the same funnel —
    pull / closing / lean from HER choices (each stage of each chapter she plays: she picks one option of that stage, weighted by her nature
    via jmind mindPick, no flat roll) + her own Đức + the chapter ends; at the end of HER road (the chapter that closes it) the Hồi kết nhánh:
    Ngã rẽ 1/2 picked from her nature (nat: trait → [weights of the 4 / 3 answers]) × (1 + pull of the open ending that owns the pair × pw);
    «Theo người ấy» only with a real bond (BAL.ge.bond.sis toward a living consort). Same resolve, odds, shading, seat locks as hers.
    w.lean = weight an option tagged to her nature's side gets; w.pull = weight of an option that pulls an ending her nature points to;
    w.close = factor on an option that would close / doom an open ending her nature points to (she shies away, like a player aiming at it).
    leave = summits after which an NPC leaves the palace (a Hoàng hậu never leaves this way); news = the world news pop-up for an NPC unlock (GE08). */
 npc:{on:true,
  nat:{"Ân cần":{r1:[3,1,1,1],r2:[4,1,1]},"Khiêm nhường":{r1:[3,1,1,1],r2:[3,1,2]},"Tham vọng":{r1:[1,4,1,1],r2:[1,4,1]},
   "Kiêu ngạo":{r1:[2,3,1,1],r2:[1,4,1]},"Xảo quyệt":{r1:[1,3,1,1],r2:[1,4,1]},"Kín đáo":{r1:[1,1,3,1],r2:[1,1,4]}},
  kind:["Ân cần","Khiêm nhường"],cruel:["Xảo quyệt","Kiêu ngạo","Tham vọng"],
  w:{lean:3,pull:3,close:.25},pw:1,bondMul:2,
  leave:["FREE","NUN","FOLLOW","REUNION","NV"],news:true},
 /* measured bands (dev/measure/ge-measure.js): an in-character bot that follows one ending's road reaches a grand ending in about one life of two or three;
    a random bot rarely does; the funnel leaves 1–2 open by .11; a bot that plays kindly / cruelly for most of a life gets that shading */
 target:{inChar:[.30,.60],random:[0,.20],open11:[1,2.6],shade:.70},
 /* the funnel target: open endings by chapter for a consistent player (measured, reported) */
 funnel:{4:4,8:[2,3],11:[1,2]}
};
