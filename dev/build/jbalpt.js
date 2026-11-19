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
/* pt_tang · Tăng sư vượt biển (jrd_pt2.js). Faith beats pay in Đức, court beats in Danh / Sủng, quiet beats in Tâm cơ / Mật.
   Climax rule (bd r1 fix 1): the win/mid option has the LOWER base and a cheaper cost, the sure mid option pays a small Đức — dominance 0. */
const pt2E=(w,l,w2)=>Object.assign(ptE(w,l),{win2:{fx:w2,k:1}});
Object.assign(BAL.arc.fx,{
 pt_tang:{s1:[ptR("duc",{duc:3,danh:1},{danh:-2}),ptS({tamco:-1},{duc:2}),ptS({danh:-1},{danh:1,tamco:1})],
  s2:[ptS({tamco:-1},{duc:2}),ptR("sung",{sung:4},{sung:-2}),ptS({suc:-1},{mat:1,tamco:1})],
  c1:[ptG(ptR("tamco",{duc:2},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({danh:-1},{tamco:2}),[2]),ptG(ptS({tamco:-1},{danh:2}),[3])],
  c2:[ptS({bac:-40},{duc:2}),ptR("danh",{danh:3},{danh:-2},{tamco:-1}),ptS({suc:-1},{duc:1,tamco:1})],
  t1:[ptR("duc",{duc:4},{duc:-2}),ptS({tamco:-1},{danh:2}),ptS({bac:-20},{mat:1,duc:1})],
  x1:[ptX(45,"duc","phap"),ptX(30,"tamco","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:5,duc:3},k:1},win2:{fx:{duc:4,tamco:2},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}}});
BAL.arc.rare.pt_tang={p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{duc:10,danh:8},g:[8]};
Object.assign(BAL.road.fx,{
 pt_tang_5:{s1:[ptS({suc:-2},{duc:3}),ptS({tamco:-1},{duc:1,danh:1}),ptR("suc",{duc:3,mat:1},{suc:-2},{suc:-1})],
  s2:[ptS({tamco:-1},{duc:2}),ptS({danh:-1},{danh:1,duc:1}),ptS({bac:-20},{tamco:2})],
  s3:[ptS({suc:-1},{duc:2}),ptS({tamco:-1},{mat:1,duc:1}),ptS({danh:-1},{tamco:2})],
  c1:[ptG(ptS({duc:-1},{danh:2}),[3]),ptG(ptS({danh:-1},{duc:2}),[2]),ptG(ptR("tamco",{danh:2,duc:1},{danh:-2},{suc:-1}),[3,-2])],
  c2:[ptR("sung",{sung:3,duc:1},{sung:-2}),ptS({bac:-50},{danh:2}),ptS({tamco:-1},{duc:2})],
  t1:[ptR("sung",{sung:4},{sung:-3}),ptS({tamco:-1},{duc:2}),ptS({danh:-1},{sung:2})],
  x1:[ptX(45,"duc","phap"),ptX(30,"tamco","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({duc:4,danh:3},{danh:-3,sung:-2},{duc:3,tamco:2})},
 pt_tang_6:{s1:[ptS({bac:-30},{duc:2}),ptR("sung",{sung:3,danh:1},{sung:-3}),ptS({tamco:-1},{mat:1})],
  s2:[ptS({bac:-50},{duc:2,tamco:1}),ptS({danh:-1},{duc:2}),ptR("danh",{danh:3},{danh:-2},{tamco:-1})],
  c1:[ptS({danh:-1},{duc:3}),ptR("tamco",{mat:2},{duc:-1},{suc:-1}),ptS({bac:-30},{tamco:2})],
  c2:[ptG(ptR("tamco",{danh:3},{danh:-2},{suc:-1}),[2,3]),ptS({danh:-1},{duc:2}),ptG(ptR("tamco",{tamco:2,danh:1},{duc:-2},{duc:-1}),[3])],
  t1:[ptR("duc",{duc:3,sung:1},{sung:-3}),ptS({danh:-2},{sung:3}),ptR("tamco",{mat:1,tamco:2},{sung:-2},{suc:-1})],
  x1:[ptX(45,"duc","phap"),ptX(30,"sung","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({duc:4,danh:3},{danh:-4,duc:-1},{danh:3,duc:2})},
 pt_tang_7:{s1:[ptS({suc:-2},{duc:3}),ptR("sung",{duc:2,sung:2},{sung:-2}),ptS({tamco:-1},{duc:2})],
  s2:[ptR("danh",{duc:2,danh:1},{danh:-2},{tamco:-1}),ptS({tamco:-1},{duc:2}),ptS({danh:-1},{duc:2,danh:1})],
  c1:[ptR("duc",{duc:3,mat:1},{duc:-2}),ptS({tamco:-1},{danh:2}),ptS({bac:-30},{duc:2})],
  c2:[ptG(ptR("tamco",{duc:2},{danh:-1},{suc:-1}),[3,-1]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptG(ptS({duc:-1},{tamco:2}),[2])],
  t1:[ptS({tamco:-1},{duc:3}),ptS({danh:-1},{duc:2}),ptS({suc:-1},{mat:1,tamco:1})],
  x1:[ptX(45,"duc","phap"),ptX(30,"tamco","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({duc:5,danh:2},{danh:-3,duc:-2},{duc:4,tamco:1})},
 pt_tang_8:{s1:[ptS({duc:-1},{tamco:2}),ptS({danh:-1},{duc:2}),ptR("tamco",{mat:2,tamco:1},{danh:-2},{suc:-1})],
  s2:[ptS({danh:-1},{duc:2}),ptS({tamco:-1},{mat:1,tamco:1}),ptS({suc:-2},{danh:2,duc:1})],
  c1:[ptG(ptS({tamco:-1},{duc:2}),[2]),ptG(ptR("tamco",{danh:2,tamco:1},{danh:-2},{suc:-1}),[3]),ptG(ptS({danh:-1},{tamco:2}),[1])],
  c2:[ptR("duc",{mat:2,duc:1},{duc:-2}),ptR("tamco",{mat:2,tamco:2},{duc:-3},{duc:-2}),ptS({duc:-1},{tamco:2})],
  t1:[ptR("duc",{duc:3,danh:2},{danh:-3}),ptS({tamco:-1},{danh:2}),ptR("mat",{tamco:2,danh:2},{danh:-3},{suc:-1}),ptR("tamco",{tamco:2,danh:1},{danh:-2},{suc:-1})],
  x1:[ptX(45,"duc","phap"),ptX(30,"danh","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({duc:4,danh:4},{danh:-4,duc:-2},{danh:3,tamco:2})},
 pt_tang_9:{s1:[ptS({tamco:-1},{mat:2}),ptR("tamco",{mat:2,tamco:1},{danh:-2},{suc:-1}),ptS({suc:-2},{mat:1,duc:1})],
  s2:[ptS({danh:-1},{duc:2}),ptS({tamco:-1},{tamco:2}),ptR("danh",{danh:3,duc:1},{danh:-3})],
  c1:[ptG(ptR("tamco",{mat:2},{danh:-2},{suc:-1}),[3,2]),ptG(ptS({danh:-2},{duc:2}),[2]),ptS({tamco:-1},{danh:2})],
  c2:[ptS({tamco:-1},{mat:1}),ptR("tamco",{mat:2,tamco:1},{tamco:-2},{bac:-30}),ptS({tamco:-1},{duc:2,tamco:1})],
  t1:[ptR("sung",{duc:3,sung:1},{sung:-3}),ptS({duc:-1},{sung:2,danh:1}),ptS({tamco:-1},{mat:1,tamco:1})],
  x1:[ptX(45,"tamco","le|tu"),ptX(45,"danh","le|tu"),ptX(30,"duc","phap",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(pt2E({duc:4,danh:4},{danh:-4,sung:-2},{duc:3,tamco:2}),{win:{fx:{duc:4,danh:4},k:1,g:[3]}})},
 pt_tang_10:{s1:[ptS({suc:-1},{duc:2,danh:1}),ptR("duc",{duc:3},{duc:-2},{tamco:-1}),ptS({tamco:-1},{tamco:2})],
  s2:[ptS({danh:-1},{tamco:2}),ptS({suc:-1},{duc:2}),ptR("tamco",{tamco:3},{danh:-3})],
  c1:[ptG(ptR("danh",{danh:3},{danh:-2},{suc:-1}),[2,3]),ptG(ptS({danh:-1},{tamco:2}),[3]),ptS({tamco:-1},{danh:2})],
  c2:[ptS({suc:-1},{duc:3}),ptS({danh:-1},{duc:2,danh:1}),ptS({tamco:-1},{duc:2,tamco:1})],
  t1:[ptS({danh:-1},{duc:3}),ptS({tamco:-1},{sung:3}),ptS({sung:-1},{tamco:2,duc:1})],
  x1:[ptX(45,"duc","phap"),ptX(30,"sung","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({duc:5,danh:3},{danh:-4,sung:-2},{sung:4,danh:2})},
 pt_tang_11:{s1:[ptS({suc:-2},{duc:3}),ptS({tamco:-1},{duc:2,tamco:1}),ptS({danh:-1},{duc:2,mat:1})],
  s2:[ptR("danh",{danh:3,duc:1},{danh:-3},{suc:-1}),ptS({duc:-1},{danh:2}),ptS({tamco:-1},{mat:1})],
  c1:[ptG(ptR("danh",{danh:3},{danh:-2},{suc:-1}),[3,2]),ptG(ptS({bac:-40},{duc:2}),[3]),ptG(ptS({duc:-1},{danh:3}),[4])],
  c2:[ptR("danh",{duc:3},{danh:-2},{tamco:-1}),ptS({bac:-50},{duc:2,mat:1}),ptS({tamco:-1},{duc:2})],
  c3:[ptR("danh",{duc:3},{danh:-2},{tamco:-1}),ptS({bac:-50},{duc:2,mat:1}),ptS({tamco:-1},{duc:2})],
  t1:[ptR("sung",{sung:4,duc:1},{sung:-3}),ptS({tamco:-1},{danh:3}),ptS({danh:-1},{tamco:2,sung:1})],
  x1:[ptX(40,"duc","phap"),ptX(30,"danh","le",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(pt2E({duc:8,danh:5},{danh:-5,sung:-3},{duc:6,danh:4}),{win:{fx:{duc:8,danh:5},k:1,g:[6]},lose:{fx:{danh:-5,sung:-3},k:-1,g:[-3]}})}});
BAL.road.rare.pt_tang_11={p:.12,np:2,sc:2,c:{suc:-4},fx:{duc:12,danh:6},bar:45,g:[8]};
/* pt_dang · Hải tặc và thương nhân (jrd_pt2.js). Sea beats pay in Danh / Bạc, law beats in Danh / Sủng, scheme beats in Tâm cơ / Mật.
   A bạc option always has a non-bạc option of equal weight in the same beat (law 2: «bạc road has an equal-cost road»). */
Object.assign(BAL.arc.fx,{
 pt_dang:{s1:[ptR("tamco",{tamco:2,danh:1},{danh:-2},{suc:-1}),ptS({danh:-1},{danh:1,duc:1}),ptS({tamco:-1},{mat:1})],
  s2:[ptS({bac:-40},{duc:2}),ptS({tamco:-1},{danh:2}),ptR("tamco",{mat:1,tamco:1},{tamco:-1},{suc:-1})],
  c1:[ptG(ptR("danh",{danh:3},{danh:-2},{tamco:-1}),[3,-2]),ptG(ptS({danh:-1},{tamco:2}),[2]),ptG(ptS({tamco:-1},{danh:2}),[3])],
  c2:[ptS({bac:-40},{danh:2}),ptR("danh",{danh:3},{danh:-2},{tamco:-1}),ptS({danh:-1},{tamco:2})],
  t1:[ptS({tamco:-1},{sung:3}),ptS({suc:-1},{tamco:2,danh:1}),ptS({danh:-1},{mat:1,tamco:1})],
  x1:[ptX(45,"danh","phep"),ptX(30,"tamco","bien",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:5,sung:3},k:1},win2:{fx:{tamco:4,danh:2},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-4,sung:-2},k:-1}}}});
BAL.arc.rare.pt_dang={p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{danh:10,tamco:8},g:[8]};
Object.assign(BAL.road.fx,{
 pt_dang_5:{s1:[ptS({suc:-1},{danh:2,sung:1}),ptS({tamco:-1},{mat:1}),ptS({danh:-1},{sung:2,duc:1})],
  s2:[ptS({bac:-40},{danh:2}),ptR("danh",{danh:3},{danh:-2},{tamco:-1}),ptR("tamco",{tamco:3,danh:1},{danh:-3},{suc:-1}),ptS({suc:-1},{tamco:2})],
  c1:[ptS({bac:-60},{danh:2,duc:1}),ptR("tamco",{mat:1,tamco:1},{danh:-2},{suc:-1}),ptS({danh:-1},{tamco:2,mat:1})],
  c2:[ptG(ptS({danh:-1},{tamco:2}),[3]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptG(ptR("tamco",{tamco:2},{danh:-2},{suc:-1}),[2,-2])],
  t1:[ptS({tamco:-1},{sung:3}),ptR("sung",{sung:3,tamco:1},{sung:-3}),ptS({danh:-1},{sung:2})],
  x1:[ptX(45,"sung","phep"),ptX(30,"tamco","bien|muu",{suc:-2}),ptX(30,"tamco","bien|muu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({sung:4,danh:3},{danh:-3,sung:-2},{tamco:3,danh:2})},
 pt_dang_6:{s1:[ptS({tamco:-1},{danh:2}),ptS({danh:-1},{duc:2,tamco:1}),ptR("tamco",{danh:3,tamco:1},{duc:-3},{suc:-1})],
  s2:[ptS({bac:-60},{danh:2,duc:1}),ptS({tamco:-1},{danh:2}),ptS({suc:-1},{danh:2}),ptR("tamco",{tamco:3},{danh:-2},{suc:-1})],
  c1:[ptS({bac:-40},{duc:2}),ptR("tamco",{tamco:2,mat:1},{danh:-2},{suc:-1}),ptR("tamco",{mat:1,tamco:1},{tamco:-1},{suc:-1})],
  c2:[ptG(ptR("danh",{danh:3},{danh:-2},{tamco:-1}),[3,-2]),ptS({danh:-1},{tamco:2}),ptG(ptR("tamco",{tamco:2,danh:1},{danh:-2},{suc:-1}),[3])],
  t1:[ptS({tamco:-1},{danh:2}),ptR("sung",{sung:3,danh:1},{sung:-3}),ptR("sung",{sung:3,danh:1},{sung:-3}),ptS({danh:-1},{tamco:2})],
  x1:[ptX(45,"danh","phep"),ptX(30,"tamco","bien",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({danh:4,duc:2},{danh:-4,duc:-1},{duc:3,tamco:2})},
 pt_dang_7:{s1:[ptS({tamco:-1},{duc:3}),ptR("danh",{danh:3},{danh:-2},{tamco:-1}),ptS({bac:-30},{tamco:2})],
  s2:[ptS({bac:-50},{duc:2,danh:1}),ptS({danh:-1},{duc:2}),ptR("tamco",{tamco:3},{danh:-3},{suc:-1})],
  c1:[ptR("sung",{duc:2,danh:1},{danh:-2},{tamco:-1}),ptS({danh:-1},{tamco:2}),ptS({bac:-50},{duc:2,danh:1})],
  c2:[ptG(ptR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({bac:-20},{duc:2}),[2]),ptS({tamco:-1},{danh:1,mat:1})],
  t1:[ptS({tamco:-1},{duc:3}),ptR("sung",{sung:3,danh:1},{sung:-3}),ptS({danh:-1},{tamco:2,sung:1})],
  x1:[ptX(45,"duc","bien"),ptX(45,"duc","bien"),ptX(30,"tamco","muu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({duc:5,danh:3},{danh:-4,duc:-2},{tamco:3,danh:2})},
 pt_dang_8:{s1:[ptR("tamco",{mat:2},{danh:-2},{suc:-1}),ptS({danh:-1},{mat:1,danh:1}),ptS({bac:-40},{duc:2})],
  s2:[ptS({duc:-1},{tamco:2}),ptS({tamco:-1},{duc:2}),ptS({danh:-1},{mat:1,tamco:1})],
  c1:[ptR("danh",{danh:3},{danh:-2},{tamco:-1}),ptS({tamco:-1},{danh:2}),ptS({bac:-40},{duc:2,danh:1})],
  c2:[ptG(ptR("tamco",{mat:1,tamco:1},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({tamco:-1},{duc:2}),[2]),ptS({danh:-1},{tamco:2})],
  t1:[ptS({duc:-2},{mat:1,tamco:1}),ptR("danh",{danh:3,duc:1},{danh:-3},{tamco:-1}),ptS({tamco:-1},{mat:1}),ptS({tamco:-1},{mat:1})],
  x1:[ptX(45,"danh","phep"),ptX(30,"tamco","muu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:pt2E({danh:5,sung:2},{danh:-4,sung:-2},{tamco:5})},
 pt_dang_9:{s1:[ptR("danh",{danh:3,duc:1},{danh:-2},{tamco:-1}),ptS({danh:-1},{tamco:2}),ptS({tamco:-1},{danh:2})],
  s2:[ptS({suc:-1},{danh:2}),ptS({tamco:-1},{danh:2}),ptR("tamco",{tamco:3},{danh:-2},{suc:-1})],
  c1:[ptG(ptR("danh",{danh:3},{danh:-2},{tamco:-1}),[3,-2]),ptG(ptS({tamco:-1},{danh:2}),[3]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptS({danh:-1},{tamco:2})],
  c2:[ptR("danh",{danh:3},{danh:-2},{tamco:-1}),ptS({tamco:-1},{mat:1}),ptS({bac:-40},{danh:2})],
  t1:[ptS({tamco:-1},{sung:3}),ptS({danh:-1},{duc:2,danh:1}),ptS({sung:-1},{tamco:2,danh:1})],
  x1:[ptX(45,"danh","phep|bien"),ptX(45,"danh","phep|bien"),ptX(30,"sung","muu",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(pt2E({danh:5,sung:3},{danh:-4,sung:-2},{sung:4,danh:1}),{win:{fx:{danh:5,sung:3},k:1,g:[3]}})},
 pt_dang_10:{s1:[ptS({danh:-1},{duc:2,tamco:1}),ptS({tamco:-1},{danh:2}),ptR("tamco",{tamco:2,mat:1},{duc:-3},{duc:-1})],
  s2:[ptS({tamco:-1},{duc:2}),ptS({danh:-1},{duc:2,danh:1}),ptS({duc:-1},{tamco:2})],
  c1:[ptS({danh:-1},{tamco:2,danh:1}),ptS({tamco:-1},{danh:2}),ptS({duc:-2},{bac:60})],
  c2:[ptG(ptS({mat:-1},{tamco:3}),[4]),ptG(ptR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3,-2]),ptG(ptS({tamco:-1},{danh:2}),[2]),ptG(ptS({duc:-1},{tamco:2}),[2]),ptS({tamco:-1},{duc:1,danh:1})],
  t1:[ptR("sung",{duc:3,sung:1},{sung:-3}),ptS({tamco:-1},{danh:2}),ptS({duc:-1},{tamco:2,danh:1})],
  x1:[ptX(45,"duc","bien"),ptX(30,"danh","phep|muu",{suc:-2}),{c:{duc:-2},w:{danh:1}}],
  E:pt2E({duc:5,danh:3},{danh:-4,sung:-2},{danh:3,tamco:2})},
 pt_dang_11:{s1:[ptS({bac:-40},{duc:2,danh:1}),ptS({tamco:-1},{danh:2}),ptS({danh:-1},{tamco:2,mat:1})],
  s2:[ptS({suc:-2},{danh:3}),ptS({tamco:-1},{danh:2}),ptS({bac:-50},{danh:2,tamco:1})],
  c1:[ptS({danh:-1},{duc:3}),ptS({duc:-1},{danh:2}),ptS({bac:-40},{danh:2,duc:1})],
  c2:[ptS({danh:-1},{duc:3}),ptS({duc:-1},{danh:2}),ptS({bac:-40},{duc:2,danh:1})],
  c3:[ptS({danh:-1},{duc:3}),ptS({bac:-60},{danh:3}),ptS({bac:-40},{tamco:2,danh:1})],
  c4:[ptG(ptR("danh",{danh:3},{danh:-2},{suc:-1}),[3,2]),ptG(ptS({tamco:-1},{danh:2}),[3]),ptG(ptS({duc:-1},{tamco:2}),[4])],
  t1:[ptR("sung",{sung:4,duc:1},{sung:-3}),ptS({tamco:-1},{sung:3}),ptS({danh:-1},{tamco:2,sung:1})],
  x1:[ptX(40,"duc","bien"),ptX(30,"tamco","muu|phep",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(pt2E({danh:8,duc:5},{danh:-5,sung:-3},{tamco:6,danh:4}),{win:{fx:{danh:8,duc:5},k:1,g:[6]},lose:{fx:{danh:-5,sung:-3},k:-1,g:[-3]}})}});
BAL.road.rare.pt_dang_11={p:.12,np:2,sc:2,c:{suc:-4},fx:{danh:12,tamco:6},bar:45,g:[8]};
