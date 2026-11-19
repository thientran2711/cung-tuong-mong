/* ================= jbalpt: ONE CORE (OD:L1267) numbers of the Phù Tang princess branch and its four roads (jrd_pt.js, jrd_pt2.js; ROAD_MAP §4.5c) =================
   Loads right after jbalbd.js (before jroad.js / jrd_*): branch numbers (BAL.orig.pf, the roll share BAL.orig.br.nc.pf, the family letter BAL.m72.pfOk,
   the home-phase row BAL.kcv.pf is in jkc2.js beside nc/bd), .4 premise numbers in BAL.arc.fx / BAL.arc.rare (shape of jbalarc.js), .5–.11 in
   BAL.road.fx / BAL.road.rare (shape of jbalroad.js), chapter constants in BAL.road.pt. One block per writer. */
/* the third country branch of hòa thân: start stats o, rank r (Quý nhân, like Ba Tư), Thái hậu favour th (a ruler who writes as an equal: cool, not hostile) */
BAL.orig.pf={r:2,o:{danh:20,suc:80,bac:110},th:-15};
BAL.orig.br.nc.pf=0;/* SCAFFOLD: 0 until the four pt roads exist (no empty premise pool); set to 1 with the roads */
BAL.m72.pfOk={danh:3};/* family letter fam_pf (the Phù Tang father asks for the ship of the next embassy): Danh on success */
BAL.road.pt=BAL.road.pt||{};
/* ---- shared (lead E21): the option shapes (law 2 / 3: every option of a beat has a cost and a level gain; odds harder with rank, law 5: −rk per rank step) ---- */
BAL.road.pt.rk=1;
/* Phù Tang / sea men while they are in the capital (S.men; jmen schedule) — ages and traits per PTP id, d = default */
BAL.road.pt.man={age:{d:34,kimthanh:46,trongla:22,thanlao:61,namlao:55,huuthanh:40,ocuu:38,tinhvien:36,trivien:63},
 trait:{kimthanh:"cẩn trọng",trongla:"trung hậu",huuthanh:"tham vọng",ocuu:"tham vọng",tinhvien:"trung hậu"},loyal:60,away:1e9};
BAL.road.pt.conf={hai10:2,su7:2};/* months of cấm túc a lost chapter puts her under (S.confined) */
BAL.road.pt.def={c:{suc:-2},cx:{suc:-3},mid:{duc:1},sc:1,b:45,d:5,f:10};/* default cost / climax cost / mid ending / Lợi thế / base odds / stat divisor / flag bonus */
const P_=BAL.road.pt.def;
const ptR=(st,w,l,c,b)=>({c:c||P_.c,o:[b||P_.b,["d",st,P_.d],["-m","rank",BAL.road.pt.rk]],w,l,sc:P_.sc});/* risky: odds on one stat */
const ptS=(c,w)=>({c,w});/* sure: a cost and a smaller gain */
/* climax: base + stat + the chapter's flag. Rule (bd r1 fix 1): the option whose fail is soft (mid) gets the LOWER base, so no option is better on odds AND cost AND fail */
const ptX=(b,st,f,c)=>({c:c||P_.cx,o:[b,["d",st,P_.d],["f",f,P_.f,0],["-m","rank",BAL.road.pt.rk]]});
const ptE=(w,l)=>({win:{fx:w,k:1},mid:{fx:P_.mid,k:0},lose:{fx:l,k:-1}});
const ptG=(o,g)=>Object.assign(o,{g});
/* ---- lead block (E21): pt_hai, pt_su ---- */

/* ---- writer-2 block: pt_tang, pt_dang ---- */
