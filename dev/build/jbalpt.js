/* ================= jbalpt: ONE CORE (OD:L1267) numbers of the Phù Tang princess branch and its four roads (jrd_pt.js, jrd_pt2.js; ROAD_MAP §4.5c) =================
   Loads right after jbalbd.js (before jroad.js / jrd_*): branch numbers (BAL.orig.pf, the roll share BAL.orig.br.nc.pf, the family letter BAL.m72.pfOk,
   the home-phase row BAL.kcv.pf is in jkc2.js beside nc/bd), .4 premise numbers in BAL.arc.fx / BAL.arc.rare (shape of jbalarc.js), .5–.11 in
   BAL.road.fx / BAL.road.rare (shape of jbalroad.js), chapter constants in BAL.road.pt. One block per writer. */
/* the third country branch of hòa thân: start stats o, rank r (Quý nhân, like Ba Tư), Thái hậu favour th (a ruler who writes as an equal: cool, not hostile) */
BAL.orig.pf={r:2,o:{danh:20,suc:80,bac:110},th:-15};
BAL.orig.br.nc.pf=1;
BAL.m72.pfOk={danh:3};/* family letter fam_pf (the Phù Tang father asks for the ship of the next embassy): Danh on success */
BAL.road.pt=BAL.road.pt||{};
/* ---- shared (lead E21): the option shapes (law 2 / 3: every option of a beat has a cost and a level gain; odds harder with rank, law 5: −rk per rank step) ---- */
BAL.road.pt.rk=1;
/* Phù Tang / sea men while they are in the capital (S.men; jmen schedule) — ages and traits per PFP id, d = default */
BAL.road.pt.man={age:{d:34,kimthanh:46,trongla:22,thanlao:61,namlao:55,huuthanh:40,ocuu:38,tinhvien:36,trivien:63},
 trait:{kimthanh:"cẩn trọng",trongla:"trung hậu",huuthanh:"tham vọng",ocuu:"tham vọng",tinhvien:"trung hậu"},loyal:60,away:1e9};
BAL.road.pt.conf={hai10:2,su7:2};/* months of cấm túc a lost chapter puts her under (S.confined) */
BAL.road.pt.def={c:{suc:-2},cx:{suc:-3},mid:{duc:1},sc:1,b:45,d:5,f:10};/* default cost / climax cost / mid ending / Lợi thế / base odds / stat divisor / flag bonus */
const PFD=BAL.road.pt.def;
const pfR=(st,w,l,c,b)=>({c:c||PFD.c,o:[b||PFD.b,["d",st,PFD.d],["-m","rank",BAL.road.pt.rk]],w,l,sc:PFD.sc});/* risky: odds on one stat */
const pfS=(c,w)=>({c,w});/* sure: a cost and a smaller gain */
/* climax: base + stat + the chapter's flag. Rule (bd r1 fix 1): the option whose fail is soft (mid) gets the LOWER base, so no option is better on odds AND cost AND fail */
const pfX=(b,st,f,c)=>({c:c||PFD.cx,o:[b,["d",st,PFD.d],["f",f,PFD.f,0],["-m","rank",BAL.road.pt.rk]]});
const pfE=(w,l)=>({win:{fx:w,k:1},mid:{fx:PFD.mid,k:0},lose:{fx:l,k:-1}});
const pfG=(o,g)=>Object.assign(o,{g});
/* ---- lead block (E21): pt_hai, pt_su ---- */
/* pt_hai · Vượt bể */
Object.assign(BAL.arc.fx,{
 pt_hai:{s1:[pfR("danh",{sung:3,danh:2},{danh:-3}),pfS({tamco:-1},{duc:2}),pfR("sung",{duc:2,danh:2},{sung:-2},{bac:-40})],
  s2:[pfS({tamco:-1},{duc:2}),pfS({bac:-40},{danh:1,duc:1}),pfS({suc:-1},{mat:1,tamco:1})],
  c1:[pfG(pfR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfS({sung:-1},{duc:2}),pfG(pfR("tamco",{tamco:2,danh:2},{danh:-3},{duc:-2}),[3])],
  c2:[pfS({danh:-1},{mat:1,tamco:1}),pfS({tamco:-1},{duc:2}),pfR("tamco",{mat:1,danh:1},{danh:-2},{bac:-30})],
  t1:[pfR("sung",{sung:4},{sung:-3}),pfS({sung:-1},{duc:2,tamco:1}),pfS({tamco:-1},{duc:2,th:1})],
  x1:[pfX(45,"danh","tim"),pfX(30,"duc","cho",{bac:-60}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{sung:5,danh:4},k:1},win2:{fx:{duc:4,danh:3},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}}});
BAL.arc.rare.pt_hai={p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{danh:12,sung:6}};
Object.assign(BAL.road.fx,{
 pt_hai_5:{s1:[pfS({tamco:-1},{sung:3}),pfS({sung:-1},{mat:1,tamco:1}),pfS({suc:-1},{mat:1,duc:1})],
  s2:[pfR("tamco",{mat:1,danh:1},{danh:-2},{suc:-1}),pfS({danh:-1},{sung:2,duc:1}),pfS({bac:-40},{mat:1,tamco:1})],
  s3:[pfS({bac:-40},{duc:3}),pfS({tamco:-1},{duc:2}),pfS({suc:-1},{duc:1,tamco:1})],
  c1:[pfS({bac:-50},{duc:2,danh:1}),pfR("tamco",{duc:2},{danh:-1},{suc:-1}),pfR("danh",{duc:2,danh:1},{danh:-2},{suc:-1})],
  c2:[pfG(pfR("danh",{danh:3},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfG(pfS({bac:-30},{duc:2}),[2])],
  t1:[pfS({sung:-1},{tamco:2,duc:1}),pfR("sung",{sung:3,danh:1},{sung:-2},{suc:-1}),pfS({tamco:-1},{duc:2})],
  x1:[pfX(45,"sung","cuu"),pfX(30,"tamco","giu",{suc:-2}),{c:{bac:-40},w:{duc:1}}],
  E:pfE({sung:4,danh:3},{sung:-3,danh:-2})},
 pt_hai_6:{s1:[pfR("tamco",{mat:1,danh:2},{danh:-2},{suc:-1}),pfS({danh:-1},{duc:3}),pfS({tamco:-1},{mat:1,tamco:1})],
  s2:[pfS({sung:-1},{duc:2,danh:1}),pfS({duc:-1},{tamco:2,danh:1}),pfS({bac:-40},{duc:2})],
  c1:[pfG(pfR("duc",{th:2,duc:1},{th:-1},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:4},{danh:-2},{th:-1}),[2]),pfS({danh:-1},{tamco:2})],
  c2:[pfS({tamco:-1},{duc:2}),pfS({suc:-1},{mat:1,tamco:1}),pfS({duc:-1},{tamco:2})],
  t1:[pfS({sung:-1},{duc:2,danh:1}),pfS({tamco:-1},{duc:2,mat:1}),pfS({duc:-1},{tamco:2,sung:1})],
  x1:[pfX(45,"duc","luat"),pfX(30,"tamco","le",{suc:-2}),{c:{duc:-3},w:{tamco:2,danh:1}}],
  E:{win:{fx:{duc:5,danh:3},k:1},win2:{fx:{duc:3,tamco:3},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-4,duc:-1},k:-1}}},
 pt_hai_7:{s1:[pfS({tamco:-1},{mat:1,danh:1}),pfS({danh:-1},{mat:2}),pfS({sung:-1},{mat:1,tamco:1})],
  s2:[pfS({tamco:-1},{mat:1,tamco:1}),pfS({danh:-1},{mat:1,tamco:1}),pfS({suc:-1},{mat:1,duc:1})],
  c1:[pfS({bac:-50},{mat:2}),pfS({danh:-1,tamco:-1},{mat:2}),pfR("tamco",{mat:2,danh:1},{danh:-2},{suc:-1})],
  c2:[pfG(pfR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfS({bac:-40},{duc:2})],
  t1:[pfS({tamco:-1},{sung:3}),pfS({sung:-1},{duc:2,mat:1}),pfS({suc:-1},{tamco:3})],
  x1:[pfX(45,"danh","tra"),pfX(30,"tamco","mua",{bac:-50}),{c:{danh:-2},w:{duc:1}}],
  E:pfE({mat:2,danh:3},{danh:-3,sung:-2})},
 pt_hai_8:{s1:[pfS({sung:-1},{mat:1,tamco:1}),pfS({tamco:-1},{duc:2}),pfS({danh:-1},{mat:1,duc:1})],
  s2:[pfS({tamco:-1},{mat:1,tamco:1}),pfS({sung:-1},{sung:2,danh:1}),pfS({suc:-1},{duc:2})],
  c1:[pfS({bac:-60},{duc:3}),pfR("danh",{duc:2},{danh:-2},{suc:-1}),pfS({danh:-1},{duc:2})],
  c2:[pfG(pfR("duc",{th:2},{th:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{th:-1}),[2]),pfS({danh:-1},{th:1,tamco:1})],
  t1:[pfS({tamco:-1},{duc:2}),pfR("tamco",{danh:3},{danh:-2},{suc:-1}),pfS({sung:-1},{tamco:2})],
  x1:[pfX(45,"suc","danh"),pfX(30,"duc","chuoc",{bac:-60}),{c:{duc:-3},w:{tamco:2,danh:1}}],
  E:{win:{fx:{danh:6,sung:3},k:1},win2:{fx:{duc:5,danh:2},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-4,duc:-2},k:-1}}},
 pt_hai_9:{s1:[pfR("sung",{tamco:2,duc:1},{sung:-2},{suc:-1}),pfS({bac:-40},{duc:3}),pfS({tamco:-1},{duc:2})],
  s2:[pfS({suc:-1},{mat:1,duc:1}),pfS({th:-1},{duc:3}),pfS({danh:-1},{duc:2})],
  c1:[pfS({tamco:-1},{mat:1,tamco:1}),pfR("tamco",{mat:2,danh:1},{danh:-2},{suc:-1}),pfS({danh:-1},{duc:2,tamco:1})],
  c2:[pfG(pfR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("danh",{tamco:3},{danh:-2},{sung:-1}),[2]),pfS({bac:-40},{duc:2})],
  t1:[pfS({tamco:-1},{duc:2,mat:1}),pfS({danh:-1},{duc:2}),pfS({suc:-1},{mat:1,duc:1})],
  x1:[pfX(45,"duc","dua"),pfX(30,"tamco","giu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pfE({danh:4,duc:2},{danh:-3,sung:-2})},
 pt_hai_10:{s1:[pfS({tamco:-1},{danh:3}),pfS({suc:-1},{danh:2,duc:1}),pfS({danh:-1},{mat:1,tamco:1})],
  s2:[pfS({tamco:-1},{danh:2}),pfS({sung:-1},{danh:2}),pfS({danh:-1},{duc:2})],
  c1:[pfG(pfR("tamco",{danh:3},{danh:-3},{suc:-1}),[3]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfS({danh:-1},{tamco:2})],
  c2:[pfS({bac:-60},{danh:3}),pfS({danh:-1},{duc:2}),pfR("sung",{danh:3},{sung:-2},{suc:-1})],
  t1:[pfS({tamco:-1},{danh:3}),pfS({suc:-1},{mat:1,tamco:1}),pfS({danh:-1},{duc:2})],
  x1:[pfX(45,"tamco","chung"),pfX(30,"duc","nhuong",{bac:-60}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:3},k:1},win2:{fx:{duc:4,danh:2},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-5,sung:-2},k:-1}}},
 pt_hai_11:{s1:[pfS({tamco:-1},{duc:2,sung:1}),pfS({sung:-1},{duc:3}),pfS({danh:-1},{duc:2,tamco:1})],
  s2:[pfS({suc:-1},{duc:3}),pfS({duc:-1},{tamco:2,danh:1}),pfS({tamco:-1},{duc:2})],
  c1:[pfS({tamco:-1},{duc:2}),pfS({bac:-30},{duc:2}),pfS({danh:-1},{duc:2})],
  c2:[pfS({duc:-1},{danh:3}),pfS({danh:-1},{duc:2,tamco:1}),pfS({th:-1},{tamco:2,duc:1})],
  c3:[pfS({tamco:-1},{duc:2}),pfS({duc:-1},{tamco:2}),pfS({sung:-1},{duc:3})],
  t1:[pfS({tamco:-1},{duc:2}),pfS({bac:-40},{mat:1,duc:1}),pfS({sung:-1},{mat:1,tamco:1})],
  x1:[pfX(45,"duc","that"),pfX(30,"tamco","an",{suc:-2}),{c:{bac:-50},w:{duc:1}}],
  E:{win:{fx:{duc:6,danh:4},k:1},win2:{fx:{danh:5,tamco:3},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-4,duc:-2},k:-1,g:[-3]}}}});
BAL.road.rare.pt_hai_11={p:.12,np:2,sc:2,c:{suc:-4},fx:{danh:12,duc:6},bar:45,g:[8]};

/* pt_su · Khiển Đường sứ */
BAL.road.pt.bien=3;/* Biên cương lost when the Tân La envoy leaves the New Year banquet (pt_su .6 lose) */
Object.assign(BAL.arc.fx,{
 pt_su:{s1:[pfR("tamco",{danh:4,sung:2},{danh:-3}),pfS({tamco:-1},{danh:2,duc:1}),pfS({danh:-1},{sung:3})],
  s2:[pfS({tamco:-1},{mat:1,tamco:1}),pfS({sung:-1},{duc:2,danh:1}),pfS({danh:-1},{sung:2,th:1})],
  c1:[pfG(pfR("tamco",{danh:4},{danh:-2},{tamco:-1}),[2]),pfG(pfR("tamco",{danh:2,tamco:1},{danh:-2},{suc:-1}),[3,-2]),pfS({sung:-1},{duc:2})],
  c2:[pfR("danh",{th:3},{th:-2},{suc:-1}),pfS({danh:-1},{th:2}),pfS({suc:-2},{th:2,duc:1})],
  t1:[pfR("sung",{sung:4},{sung:-3}),pfS({tamco:-1},{sung:2,duc:1}),pfS({duc:-1},{sung:3})],
  x1:[pfX(45,"tamco","doc"),pfX(30,"duc","dich",{bac:-60}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:3},k:1},win2:{fx:{duc:4,sung:3},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}}});
BAL.arc.rare.pt_su={p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{danh:12,sung:6}};
Object.assign(BAL.road.fx,{
 pt_su_5:{s1:[pfR("tamco",{duc:2,danh:2},{danh:-2},{suc:-1}),pfS({tamco:-1},{danh:2,th:1}),pfS({sung:-1},{duc:3})],
  s2:[pfS({tamco:-1},{duc:2,mat:1}),pfS({duc:-1},{sung:2,danh:1}),pfS({suc:-1},{duc:2})],
  c1:[pfG(pfR("tamco",{duc:3},{danh:-2},{suc:-1}),[3]),pfG(pfR("tamco",{danh:2,tamco:1},{danh:-2},{suc:-1}),[3,-2]),pfS({duc:-1},{danh:2}),pfG(pfR("tamco",{tamco:2,danh:2},{danh:-3},{duc:-2}),[3])],
  c2:[pfR("danh",{duc:2,mat:1},{danh:-2},{suc:-1}),pfS({danh:-1},{duc:2}),pfS({tamco:-1},{duc:1,mat:1})],
  t1:[pfS({tamco:-1},{duc:2,danh:1}),pfS({duc:-1},{sung:2,danh:1}),pfS({danh:-1},{duc:2,tamco:1})],
  x1:[pfX(45,"duc","giu"),pfX(30,"tamco","thang",{suc:-2}),{c:{duc:-2},w:{sung:2}}],
  E:pfE({duc:4,danh:3},{danh:-3,sung:-2})},
 pt_su_6:{s1:[pfR("danh",{danh:3,mat:1},{danh:-2},{suc:-1}),pfS({tamco:-1},{duc:2,danh:1}),pfS({danh:-1},{duc:2})],
  s2:[pfR("sung",{sung:3,danh:1},{sung:-2},{suc:-1}),pfS({danh:-1},{duc:2}),pfS({tamco:-1},{mat:1,tamco:1})],
  c1:[pfG(pfR("tamco",{danh:2,sung:1},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfS({sung:-1},{duc:2}),pfG(pfR("tamco",{tamco:2,danh:2},{danh:-3},{duc:-2}),[3])],
  c2:[pfS({bac:-30},{duc:2,mat:1}),pfS({danh:-1},{tamco:2}),pfS({tamco:-1},{mat:1,duc:1})],
  t1:[pfS({danh:-1},{duc:3}),pfS({sung:-1},{sung:2,danh:1}),pfS({tamco:-1},{tamco:2})],
  x1:[pfX(45,"danh","tranh"),pfX(30,"duc","nhuong",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:2},k:1},win2:{fx:{duc:4,danh:2},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}},
 pt_su_7:{s1:[pfS({tamco:-1},{sung:2,duc:1}),pfS({suc:-1},{tamco:2,duc:1}),pfS({danh:-1},{duc:2})],
  s2:[pfS({danh:-1},{duc:2,tamco:1}),pfS({suc:-1},{duc:2}),pfS({tamco:-1},{sung:2})],
  c1:[pfG(pfR("duc",{th:2,danh:1},{th:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfS({suc:-1},{tamco:2}),pfG(pfR("tamco",{tamco:2,danh:2},{danh:-3},{duc:-2}),[3])],
  c2:[pfS({bac:-30},{duc:2}),pfR("sung",{duc:2,sung:1},{sung:-2},{suc:-1}),pfS({duc:-1},{tamco:2})],
  t1:[pfS({tamco:-1},{sung:3}),pfR("sung",{sung:3,duc:1},{sung:-2},{suc:-1}),pfS({sung:-1},{tamco:2})],
  x1:[pfX(45,"duc","day"),pfX(30,"tamco","che",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:5,duc:3},k:1},win2:{fx:{sung:4,danh:2},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}},
 pt_su_8:{s1:[pfS({tamco:-1},{duc:3}),pfS({duc:-1},{sung:2,danh:1}),pfS({suc:-1},{duc:2})],
  s2:[pfR("sung",{mat:1,duc:2},{sung:-2},{suc:-1}),pfS({tamco:-1},{mat:1,duc:1}),pfS({bac:-40},{mat:2})],
  c1:[pfR("danh",{sung:4},{danh:-3},{suc:-1}),pfS({sung:-1},{danh:2,duc:1}),pfS({danh:-1},{sung:2,duc:1})],
  c2:[pfG(pfR("tamco",{duc:3},{danh:-2},{tamco:-1}),[2]),pfG(pfR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),pfS({duc:-1},{tamco:2})],
  t1:[pfS({danh:-1},{sung:3}),pfS({tamco:-1},{duc:2}),pfS({duc:-1},{danh:2,th:1})],
  x1:[pfX(45,"sung","sach"),pfX(30,"tamco","bac",{bac:-50}),{c:{duc:-2},w:{danh:2}}],
  E:{win:{fx:{duc:5,danh:3},k:1},win2:{fx:{duc:4,sung:2},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-3,sung:-2},k:-1}}},
 pt_su_9:{s1:[pfS({tamco:-1},{sung:2,duc:1}),pfS({suc:-1},{duc:2}),pfS({danh:-1},{mat:1,tamco:1})],
  s2:[pfR("sung",{duc:2,danh:1},{sung:-2},{suc:-1}),pfS({tamco:-1},{duc:2}),pfS({bac:-40},{duc:2,mat:1})],
  c1:[pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfG(pfR("tamco",{duc:2,danh:1},{danh:-2},{suc:-1}),[3,-2]),pfS({sung:-1},{duc:2}),pfG(pfR("tamco",{tamco:2,danh:2},{danh:-3},{duc:-2}),[3])],
  c2:[pfS({tamco:-1},{duc:3}),pfS({bac:-30},{duc:2,danh:1}),pfS({danh:-1},{tamco:2})],
  t1:[pfS({danh:-1},{tamco:2,mat:1}),pfS({sung:-1},{duc:2,danh:1}),pfS({tamco:-1},{duc:2})],
  x1:[pfX(45,"tamco","o"),pfX(30,"duc","ve",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:2},k:1},win2:{fx:{duc:5,danh:1},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-4,sung:-1},k:-1}}},
 pt_su_10:{s1:[pfS({tamco:-1},{mat:2}),pfS({danh:-1},{duc:2,mat:1}),pfS({sung:-1},{danh:2,duc:1})],
  s2:[pfS({bac:-40},{duc:3}),pfS({tamco:-1},{mat:2}),pfS({danh:-1},{duc:2})],
  c1:[pfG(pfR("tamco",{danh:3,mat:1},{danh:-2},{suc:-1}),[3]),pfG(pfR("tamco",{mat:2},{danh:-2},{suc:-1}),[3,-2]),pfS({duc:-1},{tamco:2})],
  c2:[pfS({tamco:-1},{duc:2}),pfR("sung",{duc:2,danh:1},{sung:-2},{suc:-1}),pfS({danh:-1},{duc:2})],
  t1:[pfS({tamco:-1},{mat:1,danh:1}),pfS({danh:-1},{duc:2}),pfS({suc:-1},{mat:1,tamco:1})],
  x1:[pfX(45,"tamco","tra"),pfX(30,"duc","cho",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:6,sung:3},k:1},win2:{fx:{duc:4,danh:2},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-5,sung:-2},k:-1}}},
 pt_su_11:{s1:[pfS({tamco:-1},{duc:2,danh:1}),pfS({sung:-1},{duc:3}),pfS({danh:-1},{tamco:2,duc:1})],
  s2:[pfS({bac:-30},{duc:3}),pfS({sung:-1},{duc:2,tamco:1}),pfS({danh:-1},{tamco:2})],
  c1:[pfG(pfR("tamco",{danh:2,tamco:1},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfS({sung:-1},{duc:2}),pfG(pfR("tamco",{tamco:2,danh:2},{danh:-3},{duc:-2}),[3])],
  c2:[pfS({tamco:-1},{duc:2,danh:1}),pfS({suc:-1},{duc:2}),pfS({danh:-1},{tamco:2})],
  t1:[pfS({danh:-1},{duc:3}),pfS({tamco:-1},{duc:2}),pfS({bac:-30},{duc:2,danh:1})],
  x1:[pfX(45,"sung","tien"),pfX(30,"duc","giu",{suc:-2}),{c:{bac:-50},w:{duc:1}}],
  E:{win:{fx:{danh:8,sung:4},k:1},win2:{fx:{duc:5,danh:3},k:1},mid:{fx:PFD.mid,k:0},lose:{fx:{danh:-4,sung:-2},k:-1,g:[-3]}}}});
BAL.road.rare.pt_su_11={p:.12,np:2,sc:2,c:{suc:-4},fx:{danh:12,sung:6},bar:45,g:[6]};
/* ---- writer-2 block: pt_tang, pt_dang ---- */
/* pt_tang · Tăng sư vượt biển (jrd_pt2.js). Faith beats pay in Đức, court beats in Danh / Sủng, quiet beats in Tâm cơ / Mật.
   Climax rule (bd r1 fix 1): the win/mid option has the LOWER base and a cheaper cost, the sure mid option pays a small Đức — dominance 0. */
const pf2E=(w,l,w2)=>Object.assign(pfE(w,l),{win2:{fx:w2,k:1}});
Object.assign(BAL.arc.fx,{
 pt_tang:{s1:[pfR("duc",{duc:3,danh:1},{danh:-2}),pfS({tamco:-1},{duc:2}),pfS({danh:-1},{danh:1,tamco:1})],
  s2:[pfS({tamco:-1},{duc:2}),pfR("sung",{sung:4},{sung:-2}),pfS({suc:-1},{mat:1,tamco:1})],
  c1:[pfG(pfR("tamco",{duc:2},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{tamco:3},{danh:-2},{danh:-1}),[2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[3]),pfG(pfR("tamco",{tamco:3},{danh:-3},{suc:-1}),[3,2])],
  c2:[pfS({bac:-40},{duc:2}),pfR("danh",{danh:3},{danh:-2},{tamco:-1}),pfS({suc:-1},{duc:1,tamco:1})],
  t1:[pfR("duc",{duc:4},{duc:-2}),pfS({tamco:-1},{danh:2}),pfS({bac:-20},{mat:1,duc:1})],
  x1:[pfX(45,"duc","phap"),pfX(30,"tamco","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:5,duc:3},k:1},win2:{fx:{duc:4,tamco:2},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}}});
BAL.arc.rare.pt_tang={p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{duc:10,danh:8},g:[8]};
Object.assign(BAL.road.fx,{
 pt_tang_5:{s1:[pfS({suc:-2},{duc:3}),pfS({tamco:-1},{duc:1,danh:1}),pfR("suc",{duc:3,mat:1},{suc:-2},{suc:-1})],
  s2:[pfS({tamco:-1},{duc:2}),pfS({danh:-1},{danh:1,duc:1}),pfS({bac:-20},{tamco:2})],
  s3:[pfS({suc:-1},{duc:2}),pfS({tamco:-1},{mat:1,duc:1}),pfS({danh:-1},{tamco:2})],
  c1:[pfG(pfS({duc:-1},{danh:2}),[3]),pfG(pfR("duc",{duc:3},{danh:-2},{danh:-1}),[2]),pfG(pfR("tamco",{danh:2,duc:1},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{tamco:3},{danh:-3},{suc:-1}),[3,2])],
  c2:[pfR("sung",{sung:3,duc:1},{sung:-2}),pfS({bac:-50},{danh:2}),pfS({tamco:-1},{duc:2})],
  t1:[pfR("sung",{sung:4},{sung:-3}),pfS({tamco:-1},{duc:2}),pfS({danh:-1},{sung:2})],
  x1:[pfX(45,"duc","phap"),pfX(30,"tamco","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({duc:4,danh:3},{danh:-3,sung:-2},{duc:3,tamco:2})},
 pt_tang_6:{s1:[pfS({bac:-30},{duc:2}),pfR("sung",{sung:3,danh:1},{sung:-3}),pfS({tamco:-1},{mat:1})],
  s2:[pfS({bac:-50},{duc:2,tamco:1}),pfS({danh:-1},{duc:2}),pfR("danh",{danh:3},{danh:-2},{tamco:-1})],
  c1:[pfS({danh:-1},{duc:3}),pfR("tamco",{mat:2},{duc:-1},{suc:-1}),pfS({bac:-30},{tamco:2})],
  c2:[pfG(pfR("tamco",{danh:3},{danh:-2},{suc:-1}),[2,3]),pfS({danh:-1},{duc:2}),pfG(pfR("tamco",{tamco:2,danh:1},{duc:-2},{duc:-1}),[3])],
  t1:[pfR("duc",{duc:3,sung:1},{sung:-3}),pfS({danh:-2},{sung:3}),pfR("tamco",{mat:1,tamco:2},{sung:-2},{suc:-1})],
  x1:[pfX(45,"duc","phap"),pfX(30,"sung","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({duc:4,danh:3},{danh:-4,duc:-1},{danh:3,duc:2})},
 pt_tang_7:{s1:[pfS({suc:-2},{duc:3}),pfR("sung",{duc:2,sung:2},{sung:-2}),pfS({tamco:-1},{duc:2})],
  s2:[pfR("danh",{duc:2,danh:1},{danh:-2},{tamco:-1}),pfS({tamco:-1},{duc:2}),pfS({danh:-1},{duc:2,danh:1})],
  c1:[pfR("duc",{duc:3,mat:1},{duc:-2}),pfS({tamco:-1},{danh:2}),pfS({bac:-30},{duc:2})],
  c2:[pfG(pfR("tamco",{duc:2},{danh:-1},{suc:-1}),[3,-1]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfG(pfR("tamco",{tamco:3},{danh:-2},{duc:-1}),[2])],
  t1:[pfS({tamco:-1},{duc:3}),pfS({danh:-1},{duc:2}),pfS({suc:-1},{mat:1,tamco:1})],
  x1:[pfX(45,"duc","phap"),pfX(30,"tamco","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({duc:5,danh:2},{danh:-3,duc:-2},{duc:4,tamco:1})},
 pt_tang_8:{s1:[pfS({duc:-1},{tamco:2}),pfS({danh:-1},{duc:2}),pfR("tamco",{mat:2,tamco:1},{danh:-2},{suc:-1})],
  s2:[pfS({danh:-1},{duc:2}),pfS({tamco:-1},{mat:1,tamco:1}),pfS({suc:-2},{danh:2,duc:1})],
  c1:[pfG(pfS({tamco:-1},{duc:2}),[2]),pfG(pfR("tamco",{danh:2,tamco:1},{danh:-2},{suc:-1}),[3]),pfG(pfS({danh:-1},{tamco:2}),[1])],
  c2:[pfR("duc",{mat:2,duc:1},{duc:-2}),pfR("tamco",{mat:2,tamco:2},{duc:-3},{duc:-2}),pfS({duc:-1},{tamco:2})],
  t1:[pfR("duc",{duc:3,danh:2},{danh:-3}),pfS({tamco:-1},{danh:2}),pfR("mat",{tamco:2,danh:2},{danh:-3},{suc:-1}),pfR("tamco",{tamco:2,danh:1},{danh:-2},{suc:-1})],
  x1:[pfX(45,"duc","phap"),pfX(30,"danh","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({duc:4,danh:4},{danh:-4,duc:-2},{danh:3,tamco:2})},
 pt_tang_9:{s1:[pfS({tamco:-1},{mat:2}),pfR("tamco",{mat:2,tamco:1},{danh:-2},{suc:-1}),pfS({suc:-2},{mat:1,duc:1})],
  s2:[pfS({danh:-1},{duc:2}),pfS({tamco:-1},{tamco:2}),pfR("danh",{danh:3,duc:1},{danh:-3})],
  c1:[pfG(pfR("tamco",{mat:2},{danh:-2},{suc:-1}),[3,2]),pfG(pfS({danh:-2},{duc:2}),[2]),pfS({tamco:-1},{danh:2}),pfG(pfR("tamco",{mat:3},{danh:-3},{suc:-1}),[3,2])],
  c2:[pfS({tamco:-1},{mat:1}),pfR("tamco",{mat:2,tamco:1},{tamco:-2},{bac:-30}),pfS({tamco:-1},{duc:2,tamco:1})],
  t1:[pfR("sung",{duc:3,sung:1},{sung:-3}),pfS({duc:-1},{sung:2,danh:1}),pfS({tamco:-1},{mat:1,tamco:1})],
  x1:[pfX(45,"tamco","le|tu"),pfX(45,"danh","le|tu"),pfX(30,"duc","phap",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(pf2E({duc:4,danh:4},{danh:-4,sung:-2},{duc:3,tamco:2}),{win:{fx:{duc:4,danh:4},k:1,g:[3]}})},
 pt_tang_10:{s1:[pfS({suc:-1},{duc:2,danh:1}),pfR("duc",{duc:3},{duc:-2},{tamco:-1}),pfS({tamco:-1},{tamco:2})],
  s2:[pfS({danh:-1},{tamco:2}),pfS({suc:-1},{duc:2}),pfR("tamco",{tamco:3},{danh:-3})],
  c1:[pfG(pfR("danh",{danh:3},{danh:-2},{suc:-1}),[2,3]),pfG(pfR("tamco",{tamco:3},{danh:-2},{danh:-1}),[3]),pfS({tamco:-1},{danh:2})],
  c2:[pfS({suc:-1},{duc:3}),pfS({danh:-1},{duc:2,danh:1}),pfS({tamco:-1},{duc:2,tamco:1})],
  t1:[pfS({danh:-1},{duc:3}),pfS({tamco:-1},{sung:3}),pfS({sung:-1},{tamco:2,duc:1})],
  x1:[pfX(45,"duc","phap"),pfX(30,"sung","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({duc:5,danh:3},{danh:-4,sung:-2},{sung:4,danh:2})},
 pt_tang_11:{s1:[pfS({suc:-2},{duc:3}),pfS({tamco:-1},{duc:2,tamco:1}),pfS({danh:-1},{duc:2,mat:1})],
  s2:[pfR("danh",{danh:3,duc:1},{danh:-3},{suc:-1}),pfS({duc:-1},{danh:2}),pfS({tamco:-1},{mat:1})],
  c1:[pfG(pfR("danh",{danh:3},{danh:-2},{suc:-1}),[3,2]),pfG(pfS({bac:-40},{duc:2}),[3]),pfG(pfR("danh",{danh:4},{danh:-2},{duc:-1}),[4])],
  c2:[pfR("danh",{duc:3},{danh:-2},{tamco:-1}),pfS({bac:-50},{duc:2,mat:1}),pfS({tamco:-1},{duc:2})],
  c3:[pfR("danh",{duc:3},{danh:-2},{tamco:-1}),pfS({bac:-50},{duc:2,mat:1}),pfS({tamco:-1},{duc:2})],
  t1:[pfR("sung",{sung:4,duc:1},{sung:-3}),pfS({tamco:-1},{danh:3}),pfS({danh:-1},{tamco:2,sung:1})],
  x1:[pfX(40,"duc","phap"),pfX(30,"danh","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(pf2E({duc:8,danh:5},{danh:-5,sung:-3},{duc:6,danh:4}),{win:{fx:{duc:8,danh:5},k:1,g:[6]},lose:{fx:{danh:-5,sung:-3},k:-1,g:[-3]}})}});
BAL.road.rare.pt_tang_11={p:.12,np:2,sc:2,c:{suc:-4},fx:{duc:12,danh:6},bar:45,g:[8]};
/* pt_dang · Hải tặc và thương nhân (jrd_pt2.js). Sea beats pay in Danh / Bạc, law beats in Danh / Sủng, scheme beats in Tâm cơ / Mật.
   A bạc option always has a non-bạc option of equal weight in the same beat (law 2: «bạc road has an equal-cost road»). */
Object.assign(BAL.arc.fx,{
 pt_dang:{s1:[pfR("tamco",{tamco:2,danh:1},{danh:-2},{suc:-1}),pfS({danh:-1},{danh:1,duc:1}),pfS({tamco:-1},{mat:1})],
  s2:[pfS({bac:-40},{duc:2}),pfS({tamco:-1},{danh:2}),pfR("tamco",{mat:1,tamco:1},{tamco:-1},{suc:-1})],
  c1:[pfG(pfR("danh",{danh:3},{danh:-2},{tamco:-1}),[3,-2]),pfG(pfS({danh:-1},{tamco:2}),[2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[3])],
  c2:[pfS({bac:-40},{danh:2}),pfR("danh",{danh:3},{danh:-2},{tamco:-1}),pfS({danh:-1},{tamco:2})],
  t1:[pfS({tamco:-1},{sung:3}),pfS({suc:-1},{tamco:2,danh:1}),pfS({danh:-1},{mat:1,tamco:1})],
  x1:[pfX(45,"danh","phep"),pfX(30,"tamco","bien",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:5,sung:3},k:1},win2:{fx:{tamco:4,danh:2},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}}});
BAL.arc.rare.pt_dang={p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{danh:10,tamco:8},g:[8]};
Object.assign(BAL.road.fx,{
 pt_dang_5:{s1:[pfS({suc:-1},{danh:2,sung:1}),pfS({tamco:-1},{mat:1}),pfS({danh:-1},{sung:2,duc:1})],
  s2:[pfS({bac:-40},{danh:2}),pfR("danh",{danh:3},{danh:-2},{tamco:-1}),pfR("tamco",{tamco:3,danh:1},{danh:-3},{suc:-1}),pfS({suc:-1},{tamco:2})],
  c1:[pfS({bac:-60},{danh:2,duc:1}),pfR("tamco",{mat:1,tamco:1},{danh:-2},{suc:-1}),pfS({danh:-1},{tamco:2,mat:1})],
  c2:[pfG(pfS({danh:-1},{tamco:2}),[3]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfG(pfR("tamco",{tamco:2},{danh:-2},{suc:-1}),[2,-2])],
  t1:[pfS({tamco:-1},{sung:3}),pfR("sung",{sung:3,tamco:1},{sung:-3}),pfS({danh:-1},{sung:2})],
  x1:[pfX(45,"sung","phep"),pfX(30,"tamco","bien|muu",{suc:-2}),pfX(30,"tamco","bien|muu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({sung:4,danh:3},{danh:-3,sung:-2},{tamco:3,danh:2})},
 pt_dang_6:{s1:[pfS({tamco:-1},{danh:2}),pfS({danh:-1},{duc:2,tamco:1}),pfR("tamco",{danh:3,tamco:1},{duc:-3},{suc:-1})],
  s2:[pfS({bac:-60},{danh:2,duc:1}),pfS({tamco:-1},{danh:2}),pfS({suc:-1},{danh:2}),pfR("tamco",{tamco:3},{danh:-2},{suc:-1})],
  c1:[pfS({bac:-40},{duc:2}),pfR("tamco",{tamco:2,mat:1},{danh:-2},{suc:-1}),pfR("tamco",{mat:1,tamco:1},{tamco:-1},{suc:-1})],
  c2:[pfG(pfR("danh",{danh:3},{danh:-2},{tamco:-1}),[3,-2]),pfS({danh:-1},{tamco:2}),pfG(pfR("tamco",{tamco:2,danh:1},{danh:-2},{suc:-1}),[3])],
  t1:[pfS({tamco:-1},{danh:2}),pfR("sung",{sung:3,danh:1},{sung:-3}),pfR("sung",{sung:3,danh:1},{sung:-3}),pfS({danh:-1},{tamco:2})],
  x1:[pfX(45,"danh","phep"),pfX(30,"tamco","bien",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({danh:4,duc:2},{danh:-4,duc:-1},{duc:3,tamco:2})},
 pt_dang_7:{s1:[pfS({tamco:-1},{duc:3}),pfR("danh",{danh:3},{danh:-2},{tamco:-1}),pfS({bac:-30},{tamco:2})],
  s2:[pfS({bac:-50},{duc:2,danh:1}),pfS({danh:-1},{duc:2}),pfR("tamco",{tamco:3},{danh:-3},{suc:-1})],
  c1:[pfR("sung",{duc:2,danh:1},{danh:-2},{tamco:-1}),pfS({danh:-1},{tamco:2}),pfS({bac:-50},{duc:2,danh:1})],
  c2:[pfG(pfR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),pfG(pfS({bac:-20},{duc:2}),[2]),pfS({tamco:-1},{danh:1,mat:1}),pfG(pfR("tamco",{tamco:3},{danh:-3},{suc:-1}),[3,2])],
  t1:[pfS({tamco:-1},{duc:3}),pfR("sung",{sung:3,danh:1},{sung:-3}),pfS({danh:-1},{tamco:2,sung:1})],
  x1:[pfX(45,"duc","bien"),pfX(45,"duc","bien"),pfX(30,"tamco","muu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({duc:5,danh:3},{danh:-4,duc:-2},{tamco:3,danh:2})},
 pt_dang_8:{s1:[pfR("tamco",{mat:2},{danh:-2},{suc:-1}),pfS({danh:-1},{mat:1,danh:1}),pfS({bac:-40},{duc:2})],
  s2:[pfS({duc:-1},{tamco:2}),pfS({tamco:-1},{duc:2}),pfS({danh:-1},{mat:1,tamco:1})],
  c1:[pfR("danh",{danh:3},{danh:-2},{tamco:-1}),pfS({tamco:-1},{danh:2}),pfS({bac:-40},{duc:2,danh:1})],
  c2:[pfG(pfR("tamco",{mat:1,tamco:1},{danh:-2},{suc:-1}),[3,-2]),pfG(pfS({tamco:-1},{duc:2}),[2]),pfS({danh:-1},{tamco:2})],
  t1:[pfS({duc:-2},{mat:1,tamco:1}),pfR("danh",{danh:3,duc:1},{danh:-3},{tamco:-1}),pfS({tamco:-1},{mat:1}),pfS({tamco:-1},{mat:1})],
  x1:[pfX(45,"danh","phep"),pfX(30,"tamco","muu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pf2E({danh:5,sung:2},{danh:-4,sung:-2},{tamco:5})},
 pt_dang_9:{s1:[pfR("danh",{danh:3,duc:1},{danh:-2},{tamco:-1}),pfS({danh:-1},{tamco:2}),pfS({tamco:-1},{danh:2})],
  s2:[pfS({suc:-1},{danh:2}),pfS({tamco:-1},{danh:2}),pfR("tamco",{tamco:3},{danh:-2},{suc:-1})],
  c1:[pfG(pfR("danh",{danh:3},{danh:-2},{tamco:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[3]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfS({danh:-1},{tamco:2})],
  c2:[pfR("danh",{danh:3},{danh:-2},{tamco:-1}),pfS({tamco:-1},{mat:1}),pfS({bac:-40},{danh:2})],
  t1:[pfS({tamco:-1},{sung:3}),pfS({danh:-1},{duc:2,danh:1}),pfS({sung:-1},{tamco:2,danh:1})],
  x1:[pfX(45,"danh","phep|bien"),pfX(45,"danh","phep|bien"),pfX(30,"sung","muu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(pf2E({danh:5,sung:3},{danh:-4,sung:-2},{sung:4,danh:1}),{win:{fx:{danh:5,sung:3},k:1,g:[3]}})},
 pt_dang_10:{s1:[pfS({danh:-1},{duc:2,tamco:1}),pfS({tamco:-1},{danh:2}),pfR("tamco",{tamco:2,mat:1},{duc:-3},{duc:-1})],
  s2:[pfS({tamco:-1},{duc:2}),pfS({danh:-1},{duc:2,danh:1}),pfS({duc:-1},{tamco:2})],
  c1:[pfS({danh:-1},{tamco:2,danh:1}),pfS({tamco:-1},{danh:2}),pfS({duc:-2},{bac:60})],
  c2:[pfG(pfS({mat:-1},{tamco:3}),[4]),pfG(pfR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),pfG(pfR("tamco",{danh:3},{danh:-2},{tamco:-1}),[2]),pfG(pfS({duc:-1},{tamco:2}),[2]),pfS({tamco:-1},{duc:1,danh:1})],
  t1:[pfR("sung",{duc:3,sung:1},{sung:-3}),pfS({tamco:-1},{danh:2}),pfS({duc:-1},{tamco:2,danh:1})],
  x1:[pfX(45,"duc","bien"),pfX(30,"danh","phep|muu",{suc:-2}),{c:{duc:-2},w:{danh:1}}],
  E:pf2E({duc:5,danh:3},{danh:-4,sung:-2},{danh:3,tamco:2})},
 pt_dang_11:{s1:[pfS({bac:-40},{duc:2,danh:1}),pfS({tamco:-1},{danh:2}),pfS({danh:-1},{tamco:2,mat:1})],
  s2:[pfS({suc:-2},{danh:3}),pfS({tamco:-1},{danh:2}),pfS({bac:-50},{danh:2,tamco:1})],
  c1:[pfS({danh:-1},{duc:3}),pfS({duc:-1},{danh:2}),pfS({bac:-40},{danh:2,duc:1})],
  c2:[pfS({danh:-1},{duc:3}),pfS({duc:-1},{danh:2}),pfS({bac:-40},{duc:2,danh:1})],
  c3:[pfS({danh:-1},{duc:3}),pfS({bac:-60},{danh:3}),pfS({bac:-40},{tamco:2,danh:1})],
  c4:[pfG(pfR("danh",{danh:3},{danh:-2},{suc:-1}),[3,2]),pfG(pfS({tamco:-1},{danh:2}),[3]),pfG(pfR("tamco",{tamco:3},{danh:-2},{duc:-1}),[4])],
  t1:[pfR("sung",{sung:4,duc:1},{sung:-3}),pfS({tamco:-1},{sung:3}),pfS({danh:-1},{tamco:2,sung:1})],
  x1:[pfX(40,"duc","bien"),pfX(30,"tamco","muu|phep",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(pf2E({danh:8,duc:5},{danh:-5,sung:-3},{tamco:6,danh:4}),{win:{fx:{danh:8,duc:5},k:1,g:[6]},lose:{fx:{danh:-5,sung:-3},k:-1,g:[-3]}})}});
BAL.road.rare.pt_dang_11={p:.12,np:2,sc:2,c:{suc:-4},fx:{danh:12,tamco:6},bar:45,g:[8]};
