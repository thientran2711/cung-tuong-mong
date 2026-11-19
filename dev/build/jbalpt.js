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
/* pt_hai · Vượt bể */
Object.assign(BAL.arc.fx,{
 pt_hai:{s1:[ptR("danh",{sung:3,danh:2},{danh:-3}),ptS({tamco:-1},{duc:2}),ptR("sung",{duc:2,danh:2},{sung:-2},{bac:-40})],
  s2:[ptS({tamco:-1},{duc:2}),ptS({bac:-40},{danh:1,duc:1}),ptS({suc:-1},{mat:1,tamco:1})],
  c1:[ptG(ptR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptS({sung:-1},{duc:2})],
  c2:[ptS({danh:-1},{mat:1,tamco:1}),ptS({tamco:-1},{duc:2}),ptR("tamco",{mat:1,danh:1},{danh:-2},{bac:-30})],
  t1:[ptR("sung",{sung:4},{sung:-3}),ptS({sung:-1},{duc:2,tamco:1}),ptS({tamco:-1},{duc:2,th:1})],
  x1:[ptX(45,"danh","tim"),ptX(30,"duc","cho",{bac:-60}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{sung:5,danh:4},k:1},win2:{fx:{duc:4,danh:3},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}}});
BAL.arc.rare.pt_hai={p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{danh:12,sung:6}};
Object.assign(BAL.road.fx,{
 pt_hai_5:{s1:[ptS({tamco:-1},{sung:3}),ptS({sung:-1},{mat:1,tamco:1}),ptS({suc:-1},{mat:1,duc:1})],
  s2:[ptR("tamco",{mat:1,danh:1},{danh:-2},{suc:-1}),ptS({danh:-1},{sung:2,duc:1}),ptS({bac:-40},{mat:1,tamco:1})],
  s3:[ptS({bac:-40},{duc:3}),ptS({tamco:-1},{duc:2}),ptS({suc:-1},{duc:1,tamco:1})],
  c1:[ptS({bac:-50},{duc:2,danh:1}),ptR("tamco",{duc:2},{danh:-1},{suc:-1}),ptR("danh",{duc:2,danh:1},{danh:-2},{suc:-1})],
  c2:[ptG(ptR("danh",{danh:3},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptG(ptS({bac:-30},{duc:2}),[2])],
  t1:[ptS({sung:-1},{tamco:2,duc:1}),ptR("sung",{sung:3,danh:1},{sung:-2},{suc:-1}),ptS({tamco:-1},{duc:2})],
  x1:[ptX(45,"sung","cuu"),ptX(30,"tamco","giu",{suc:-2}),{c:{bac:-40},w:{duc:1}}],
  E:ptE({sung:4,danh:3},{sung:-3,danh:-2})},
 pt_hai_6:{s1:[ptR("tamco",{mat:1,danh:2},{danh:-2},{suc:-1}),ptS({danh:-1},{duc:3}),ptS({tamco:-1},{mat:1,tamco:1})],
  s2:[ptS({sung:-1},{duc:2,danh:1}),ptS({duc:-1},{tamco:2,danh:1}),ptS({bac:-40},{duc:2})],
  c1:[ptG(ptR("duc",{th:2,duc:1},{th:-1},{suc:-1}),[3,-2]),ptG(ptS({th:-1},{danh:3}),[2]),ptS({danh:-1},{tamco:2})],
  c2:[ptS({tamco:-1},{duc:2}),ptS({suc:-1},{mat:1,tamco:1}),ptS({duc:-1},{tamco:2})],
  t1:[ptS({sung:-1},{duc:2,danh:1}),ptS({tamco:-1},{duc:2,mat:1}),ptS({duc:-1},{tamco:2,sung:1})],
  x1:[ptX(45,"duc","luat"),ptX(30,"tamco","le",{suc:-2}),{c:{duc:-3},w:{tamco:2,danh:1}}],
  E:{win:{fx:{duc:5,danh:3},k:1},win2:{fx:{duc:3,tamco:3},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-4,duc:-1},k:-1}}},
 pt_hai_7:{s1:[ptS({tamco:-1},{mat:1,danh:1}),ptS({danh:-1},{mat:2}),ptS({sung:-1},{mat:1,tamco:1})],
  s2:[ptS({tamco:-1},{mat:1,tamco:1}),ptS({danh:-1},{mat:1,tamco:1}),ptS({suc:-1},{mat:1,duc:1})],
  c1:[ptS({bac:-60},{mat:2}),ptS({danh:-1},{mat:2}),ptR("tamco",{mat:1,tamco:1},{danh:-2},{suc:-1})],
  c2:[ptG(ptR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptS({bac:-40},{duc:2})],
  t1:[ptS({tamco:-1},{sung:3}),ptS({sung:-1},{duc:2,mat:1}),ptS({suc:-1},{tamco:3})],
  x1:[ptX(45,"danh","tra"),ptX(30,"tamco","mua",{bac:-50}),{c:{danh:-2},w:{duc:1}}],
  E:ptE({mat:2,danh:3},{danh:-3,sung:-2})},
 pt_hai_8:{s1:[ptS({sung:-1},{mat:1,tamco:1}),ptS({tamco:-1},{duc:2}),ptS({danh:-1},{mat:1,duc:1})],
  s2:[ptS({tamco:-1},{mat:1,tamco:1}),ptS({sung:-1},{sung:2,danh:1}),ptS({suc:-1},{duc:2})],
  c1:[ptS({bac:-60},{duc:3}),ptR("danh",{duc:2},{danh:-2},{suc:-1}),ptS({danh:-1},{duc:2})],
  c2:[ptG(ptR("duc",{th:2},{th:-2},{suc:-1}),[3,-2]),ptG(ptS({th:-1},{danh:2}),[2]),ptS({danh:-1},{th:1,tamco:1})],
  t1:[ptS({tamco:-1},{duc:2}),ptR("tamco",{danh:3},{danh:-2},{suc:-1}),ptS({sung:-1},{tamco:2})],
  x1:[ptX(45,"suc","danh"),ptX(30,"duc","chuoc",{bac:-60}),{c:{duc:-3},w:{tamco:2,danh:1}}],
  E:{win:{fx:{danh:6,sung:3},k:1},win2:{fx:{duc:5,danh:2},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-4,duc:-2},k:-1}}},
 pt_hai_9:{s1:[ptR("sung",{tamco:2,duc:1},{sung:-2},{suc:-1}),ptS({bac:-40},{duc:3}),ptS({tamco:-1},{duc:2})],
  s2:[ptS({suc:-1},{mat:1,duc:1}),ptS({th:-1},{duc:3}),ptS({danh:-1},{duc:2})],
  c1:[ptS({tamco:-1},{mat:2}),ptR("tamco",{mat:1,danh:1},{danh:-2},{suc:-1}),ptS({danh:-1},{duc:1,tamco:1})],
  c2:[ptG(ptR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({sung:-1},{tamco:2}),[2]),ptS({bac:-40},{duc:2})],
  t1:[ptS({tamco:-1},{duc:2,mat:1}),ptS({danh:-1},{duc:2}),ptS({suc:-1},{mat:1,duc:1})],
  x1:[ptX(45,"duc","dua"),ptX(30,"tamco","giu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:ptE({danh:4,duc:2},{danh:-3,sung:-2})},
 pt_hai_10:{s1:[ptS({tamco:-1},{danh:3}),ptS({suc:-1},{danh:2,duc:1}),ptS({danh:-1},{mat:1,tamco:1})],
  s2:[ptS({tamco:-1},{danh:2}),ptS({sung:-1},{danh:2}),ptS({danh:-1},{duc:2})],
  c1:[ptG(ptR("tamco",{danh:3},{danh:-3},{suc:-1}),[3]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptS({danh:-1},{tamco:2})],
  c2:[ptS({bac:-60},{danh:3}),ptS({danh:-1},{duc:2}),ptR("sung",{danh:3},{sung:-2},{suc:-1})],
  t1:[ptS({tamco:-1},{danh:3}),ptS({suc:-1},{mat:1,tamco:1}),ptS({danh:-1},{duc:2})],
  x1:[ptX(45,"tamco","chung"),ptX(30,"duc","nhuong",{bac:-60}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:3},k:1},win2:{fx:{duc:4,danh:2},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-5,sung:-2},k:-1}}},
 pt_hai_11:{s1:[ptS({tamco:-1},{duc:2,sung:1}),ptS({sung:-1},{duc:3}),ptS({danh:-1},{duc:2,tamco:1})],
  s2:[ptS({suc:-1},{duc:3}),ptS({duc:-1},{tamco:2,danh:1}),ptS({tamco:-1},{duc:2})],
  c1:[ptS({tamco:-1},{duc:2}),ptS({bac:-30},{duc:2}),ptS({danh:-1},{duc:2})],
  c2:[ptS({duc:-1},{danh:3}),ptS({danh:-1},{duc:2,tamco:1}),ptS({th:-1},{tamco:2,duc:1})],
  c3:[ptS({tamco:-1},{duc:2}),ptS({duc:-1},{tamco:2}),ptS({sung:-1},{duc:3})],
  t1:[ptS({tamco:-1},{duc:2}),ptS({bac:-40},{mat:1,duc:1}),ptS({sung:-1},{mat:1,tamco:1})],
  x1:[ptX(45,"duc","that"),ptX(30,"tamco","an",{suc:-2}),{c:{bac:-50},w:{duc:1}}],
  E:{win:{fx:{duc:6,danh:4},k:1},win2:{fx:{danh:5,tamco:3},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-4,duc:-2},k:-1,g:[-3]}}}});
BAL.road.rare.pt_hai_11={p:.12,np:2,sc:2,c:{suc:-4},fx:{danh:12,duc:6},bar:45,g:[8]};

/* pt_su · Khiển Đường sứ */
BAL.road.pt.bien=3;/* Biên cương lost when the Tân La envoy leaves the New Year banquet (pt_su .6 lose) */
Object.assign(BAL.arc.fx,{
 pt_su:{s1:[ptR("tamco",{danh:4,sung:2},{danh:-3}),ptS({tamco:-1},{danh:2,duc:1}),ptS({danh:-1},{sung:3})],
  s2:[ptS({tamco:-1},{mat:1,tamco:1}),ptS({sung:-1},{duc:2,danh:1}),ptS({danh:-1},{sung:2,th:1})],
  c1:[ptG(ptS({tamco:-1},{danh:3}),[2]),ptG(ptR("tamco",{danh:2,tamco:1},{danh:-2},{suc:-1}),[3,-2]),ptS({sung:-1},{duc:2})],
  c2:[ptR("danh",{th:3},{th:-2},{suc:-1}),ptS({danh:-1},{th:2}),ptS({suc:-2},{th:2,duc:1})],
  t1:[ptR("sung",{sung:4},{sung:-3}),ptS({tamco:-1},{sung:2,duc:1}),ptS({duc:-1},{sung:3})],
  x1:[ptX(45,"tamco","doc"),ptX(30,"duc","dich",{bac:-60}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:3},k:1},win2:{fx:{duc:4,sung:3},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}}});
BAL.arc.rare.pt_su={p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{danh:12,sung:6}};
Object.assign(BAL.road.fx,{
 pt_su_5:{s1:[ptR("tamco",{duc:2,danh:2},{danh:-2},{suc:-1}),ptS({tamco:-1},{danh:2,th:1}),ptS({sung:-1},{duc:3})],
  s2:[ptS({tamco:-1},{duc:2,mat:1}),ptS({duc:-1},{sung:2,danh:1}),ptS({suc:-1},{duc:2})],
  c1:[ptG(ptR("tamco",{duc:3},{danh:-2},{suc:-1}),[3]),ptG(ptR("tamco",{danh:2,tamco:1},{danh:-2},{suc:-1}),[3,-2]),ptS({duc:-1},{danh:2})],
  c2:[ptR("danh",{duc:2,mat:1},{danh:-2},{suc:-1}),ptS({danh:-1},{duc:2}),ptS({tamco:-1},{duc:1,mat:1})],
  t1:[ptS({tamco:-1},{duc:2,danh:1}),ptS({duc:-1},{sung:2,danh:1}),ptS({danh:-1},{duc:2,tamco:1})],
  x1:[ptX(45,"duc","giu"),ptX(30,"tamco","thang",{suc:-2}),{c:{duc:-2},w:{sung:2}}],
  E:ptE({duc:4,danh:3},{danh:-3,sung:-2})},
 pt_su_6:{s1:[ptR("danh",{danh:3,mat:1},{danh:-2},{suc:-1}),ptS({tamco:-1},{duc:2,danh:1}),ptS({danh:-1},{duc:2})],
  s2:[ptR("sung",{sung:3,danh:1},{sung:-2},{suc:-1}),ptS({danh:-1},{duc:2}),ptS({tamco:-1},{mat:1,tamco:1})],
  c1:[ptG(ptR("tamco",{danh:2,sung:1},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptS({sung:-1},{duc:2})],
  c2:[ptS({bac:-30},{duc:2,mat:1}),ptS({danh:-1},{tamco:2}),ptS({tamco:-1},{mat:1,duc:1})],
  t1:[ptS({danh:-1},{duc:3}),ptS({sung:-1},{sung:2,danh:1}),ptS({tamco:-1},{tamco:2})],
  x1:[ptX(45,"danh","tranh"),ptX(30,"duc","nhuong",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:2},k:1},win2:{fx:{duc:4,danh:2},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}},
 pt_su_7:{s1:[ptS({tamco:-1},{sung:2,duc:1}),ptS({suc:-1},{tamco:2,duc:1}),ptS({danh:-1},{duc:2})],
  s2:[ptS({danh:-1},{duc:2,tamco:1}),ptS({suc:-1},{duc:2}),ptS({tamco:-1},{sung:2})],
  c1:[ptG(ptR("duc",{th:2,danh:1},{th:-2},{suc:-1}),[3,-2]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptS({suc:-1},{tamco:2})],
  c2:[ptS({bac:-30},{duc:2}),ptR("sung",{duc:2,sung:1},{sung:-2},{suc:-1}),ptS({duc:-1},{tamco:2})],
  t1:[ptS({tamco:-1},{sung:3}),ptR("sung",{sung:3,duc:1},{sung:-2},{suc:-1}),ptS({sung:-1},{tamco:2})],
  x1:[ptX(45,"duc","day"),ptX(30,"tamco","che",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:5,duc:3},k:1},win2:{fx:{sung:4,danh:2},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}},
 pt_su_8:{s1:[ptS({tamco:-1},{duc:3}),ptS({duc:-1},{sung:2,danh:1}),ptS({suc:-1},{duc:2})],
  s2:[ptR("sung",{mat:1,duc:2},{sung:-2},{suc:-1}),ptS({tamco:-1},{mat:1,duc:1}),ptS({bac:-40},{mat:2})],
  c1:[ptR("danh",{sung:4},{danh:-3},{suc:-1}),ptS({sung:-1},{danh:2,duc:1}),ptS({danh:-1},{sung:2,duc:1})],
  c2:[ptG(ptS({tamco:-1},{duc:2}),[2]),ptG(ptR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),ptS({duc:-1},{tamco:2})],
  t1:[ptS({danh:-1},{sung:3}),ptS({tamco:-1},{duc:2}),ptS({duc:-1},{danh:2,th:1})],
  x1:[ptX(45,"sung","sach"),ptX(30,"tamco","bac",{bac:-50}),{c:{duc:-2},w:{danh:2}}],
  E:{win:{fx:{duc:5,danh:3},k:1},win2:{fx:{duc:4,sung:2},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-3,sung:-2},k:-1}}},
 pt_su_9:{s1:[ptS({tamco:-1},{sung:2,duc:1}),ptS({suc:-1},{duc:2}),ptS({danh:-1},{mat:1,tamco:1})],
  s2:[ptR("sung",{duc:2,danh:1},{sung:-2},{suc:-1}),ptS({tamco:-1},{duc:2}),ptS({bac:-40},{duc:2,mat:1})],
  c1:[ptG(ptS({tamco:-1},{danh:2}),[2]),ptG(ptR("tamco",{duc:2,danh:1},{danh:-2},{suc:-1}),[3,-2]),ptS({sung:-1},{duc:2})],
  c2:[ptS({tamco:-1},{duc:3}),ptS({bac:-30},{duc:2,danh:1}),ptS({danh:-1},{tamco:2})],
  t1:[ptS({danh:-1},{tamco:2,mat:1}),ptS({sung:-1},{duc:2,danh:1}),ptS({tamco:-1},{duc:2})],
  x1:[ptX(45,"tamco","o"),ptX(30,"duc","ve",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:2},k:1},win2:{fx:{duc:5,danh:1},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-4,sung:-1},k:-1}}},
 pt_su_10:{s1:[ptS({tamco:-1},{mat:2}),ptS({danh:-1},{duc:2,mat:1}),ptS({sung:-1},{danh:2,duc:1})],
  s2:[ptS({bac:-40},{duc:3}),ptS({tamco:-1},{mat:2}),ptS({danh:-1},{duc:2})],
  c1:[ptG(ptR("tamco",{danh:3,mat:1},{danh:-2},{suc:-1}),[3]),ptG(ptR("tamco",{mat:2},{danh:-2},{suc:-1}),[3,-2]),ptS({duc:-1},{tamco:2})],
  c2:[ptS({tamco:-1},{duc:2}),ptR("sung",{duc:2,danh:1},{sung:-2},{suc:-1}),ptS({danh:-1},{duc:2})],
  t1:[ptS({tamco:-1},{mat:1,danh:1}),ptS({danh:-1},{duc:2}),ptS({suc:-1},{mat:1,tamco:1})],
  x1:[ptX(45,"tamco","tra"),ptX(30,"duc","cho",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:3},k:1},win2:{fx:{duc:4,danh:2},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-5,sung:-2},k:-1}}},
 pt_su_11:{s1:[ptS({tamco:-1},{duc:2,danh:1}),ptS({sung:-1},{duc:3}),ptS({danh:-1},{tamco:2,duc:1})],
  s2:[ptS({bac:-30},{duc:3}),ptS({sung:-1},{duc:2,tamco:1}),ptS({danh:-1},{tamco:2})],
  c1:[ptG(ptR("tamco",{danh:2,tamco:1},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptS({sung:-1},{duc:2})],
  c2:[ptS({tamco:-1},{duc:2,danh:1}),ptS({suc:-1},{duc:2}),ptS({danh:-1},{tamco:2})],
  t1:[ptS({danh:-1},{duc:3}),ptS({tamco:-1},{duc:2}),ptS({bac:-30},{duc:2,danh:1})],
  x1:[ptX(45,"sung","tien"),ptX(30,"duc","giu",{suc:-2}),{c:{bac:-50},w:{duc:1}}],
  E:{win:{fx:{danh:8,sung:4},k:1},win2:{fx:{duc:5,danh:3},k:1},mid:{fx:P_.mid,k:0},lose:{fx:{danh:-4,sung:-2},k:-1,g:[-3]}}}});
BAL.road.rare.pt_su_11={p:.12,np:2,sc:2,c:{suc:-4},fx:{danh:12,sung:6},bar:45,g:[6]};
/* ---- writer-2 block: pt_tang, pt_dang ---- */
