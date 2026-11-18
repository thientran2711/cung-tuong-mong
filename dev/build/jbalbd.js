/* ================= jbalbd: ONE CORE (OD:L1267) numbers of Bắc Địch's own four roads (jrd_bd.js, jrd_bd2.js; ROAD_MAP §4.5b) =================
   Loads right after jbalroad.js (before jroad.js / jrd_*): .4 premise numbers in BAL.arc.fx / BAL.arc.rare (shape of jbalarc.js), .5–.11 in
   BAL.road.fx / BAL.road.rare (shape of jbalroad.js), chapter constants in BAL.road.bd. One block per writer. */
BAL.road.bd=BAL.road.bd||{};
/* ---- lead block (E14): bd_san, bd_soi ---- */
/* the option shapes (law 2 / 3: every option of a beat has a cost and a level gain; odds harder with rank, law 5: −rk per rank step) */
BAL.road.bd.rk=1;
BAL.road.bd.man={age:{d:30,lie:48,olac:17,thatmoc:32,asnc:58,phong:24},trait:{thatmoc:"tham vọng",phong:"trung hậu",olac:"cẩn trọng"},loyal:60,away:1e9};/* steppe men in the capital (S.men) */
BAL.road.bd.conf={san10:2,soi8:2};/* months of cấm túc a lost chapter puts her under (S.confined) */
const bdR=(st,w,l,c,b)=>({c:c||{suc:-2},o:[b||45,["d",st,5],["-m","rank",BAL.road.bd.rk]],w,l,sc:1});/* risky: odds on one stat */
const bdS=(c,w)=>({c,w});/* sure: a cost and a smaller gain */
const bdX=(b,st,f,c)=>({c:c||{suc:-3},o:[b,["d",st,5],["f",f,10,0],["-m","rank",BAL.road.bd.rk]]});/* climax: base + stat + the chapter's flag */
const bdE=(w,l)=>({win:{fx:w,k:1},mid:{fx:{duc:1},k:0},lose:{fx:l,k:-1}});
const bdG=(o,g)=>Object.assign(o,{g});
Object.assign(BAL.arc.fx,{
 bd_san:{s1:[bdR("suc",{danh:4,sung:2},{danh:-3}),bdS({tamco:-1},{duc:2}),bdS({bac:-40},{danh:2,duc:1})],
  s2:[bdR("tamco",{mat:1,tamco:2},{danh:-2}),bdS({bac:-20},{duc:2}),bdS({tamco:-1},{danh:2})],
  c1:[bdG(bdR("tamco",{duc:2},{sung:-2},{suc:-1}),[3,-2]),bdG(bdS({danh:-1},{tamco:2}),[2]),bdG(bdS({bac:-50},{duc:2}),[3])],
  c2:[bdR("suc",{sung:4},{sung:-2}),bdS({tamco:-1},{duc:3}),bdS({suc:-1},{danh:2})],
  t1:[bdR("suc",{danh:4,sung:2},{sung:-4}),bdS({danh:-1},{sung:2,duc:1}),bdR("tamco",{sung:3,danh:2},{danh:-2},{suc:-1},50)],
  x1:[bdX(35,"suc","ride"),bdX(45,"tamco","share",{suc:-2}),{c:{danh:-2}}],
  E:{win:{fx:{sung:6,danh:4},k:1},win2:{fx:{danh:5,tamco:3},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{sung:-4,danh:-3},k:-1}}}});
Object.assign(BAL.arc.rare,{bd_san:{p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{danh:12,sung:6},g:[8]}});
Object.assign(BAL.road.fx,{
 bd_san_5:{s1:[bdR("tamco",{sung:4},{sung:-3}),bdS({tamco:-1},{duc:2}),bdS({bac:-30},{mat:1})],
  s2:[bdS({suc:-2},{tamco:2,danh:1}),bdR("tamco",{mat:1,danh:2},{danh:-2},{bac:-20}),bdS({tamco:-1},{duc:2})],
  s3:[bdR("sung",{sung:3},{sung:-3}),bdS({bac:-40},{mat:1,duc:1}),bdS({suc:-2},{duc:2,danh:1})],
  c1:[bdS({bac:-50},{mat:1}),bdR("danh",{mat:1,danh:1},{danh:-2},{tamco:-1}),bdS({danh:-1},{duc:1,tamco:1})],
  c2:[bdG(bdS({bac:-40},{duc:2}),[3]),bdG(bdR("tamco",{tamco:2},{danh:-2},{suc:-1}),[3]),bdG(bdS({tamco:-1},{danh:2}),[2])],
  t1:[bdR("danh",{sung:3,duc:2},{danh:-3}),bdS({tamco:-1},{mat:1}),bdS({suc:-1},{tamco:2})],
  x1:[bdX(35,"sung","steppe"),bdX(45,"tamco","keep",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:bdE({mat:2,danh:3},{sung:-3,danh:-2})},
 bd_san_6:{s1:[bdS({suc:-1},{tamco:2}),bdS({suc:-2},{sung:3}),bdR("tamco",{mat:1,tamco:1},{suc:-2},{suc:-2})],
  s2:[bdS({danh:-2},{tamco:2}),bdR("sung",{sung:3},{danh:-2},{tamco:-1}),bdS({suc:-2},{danh:2,duc:1})],
  c1:[bdG(bdR("tamco",{mat:1},{danh:-2},{suc:-1}),[2,4]),bdS({bac:-40},{mat:1}),bdG(bdR("danh",{duc:2},{sung:-2},{tamco:-1}),[2,-3])],
  c2:[bdS({tamco:-1},{mat:1}),bdS({suc:-1},{tamco:2}),bdS({bac:-30},{mat:1})],
  t1:[bdR("sung",{sung:3},{sung:-3}),bdS({tamco:-1},{duc:2}),bdS({suc:-2},{tamco:2})],
  x1:[bdX(35,"tamco","proof"),bdX(35,"tamco","trap",{suc:-3}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(bdE({sung:4,danh:3},{danh:-4,duc:-1}),{win:{fx:{sung:4,danh:3},k:1,g:[3]}})},
 bd_san_7:{s1:[bdR("suc",{sung:5},{danh:-3}),bdS({tamco:-1},{sung:3}),bdS({suc:-1},{duc:2,danh:1})],
  s2:[bdR("suc",{sung:5},{sung:-3}),bdS({bac:-20},{sung:2,duc:1}),bdS({tamco:-1},{duc:2})],
  c1:[bdR("tamco",{danh:3},{danh:-3},{suc:-1}),bdR("danh",{th:4},{th:-2},{bac:-30}),bdS({sung:-2},{duc:2,danh:1})],
  c2:[bdG(bdR("suc",{duc:2},{sung:-2}),[3,-3]),bdG(bdS({sung:-1},{duc:2}),[2]),bdG(bdS({danh:-1},{sung:3}),[3])],
  t1:[bdR("danh",{sung:3,duc:2},{sung:-2},{tamco:-1}),bdS({suc:-2},{duc:3}),bdS({bac:-60},{danh:3,duc:2})],
  x1:[bdX(35,"danh","ride"),bdX(40,"duc","care",{danh:-2}),{c:{sung:-2},w:{duc:1}}],
  E:bdE({sung:6,danh:2},{danh:-4,sung:-2})},
 bd_san_8:{s1:[bdR("tamco",{danh:3,tamco:1},{danh:-2}),bdS({tamco:-1},{tamco:2}),bdS({bac:-20},{duc:1,mat:1})],
  s2:[bdR("sung",{danh:3},{danh:-3}),bdR("tamco",{danh:3,mat:1},{danh:-2},{tamco:-1}),bdS({bac:-80},{duc:2,danh:1})],
  c1:[bdS({tamco:-1},{danh:2}),bdS({suc:-1},{duc:2}),bdS({danh:-1},{tamco:2})],
  c2:[bdG(bdR("danh",{danh:3},{danh:-2},{suc:-1}),[2,3]),bdG(bdS({bac:-20},{duc:2}),[2]),bdS({danh:-1},{tamco:2})],
  t1:[bdR("tamco",{danh:3,sung:2},{danh:-3}),bdS({sung:-1},{duc:2,tamco:1}),bdR("danh",{danh:3},{duc:-2},{tamco:-1})],
  x1:[bdX(35,"tamco","cure"),bdX(45,"duc","slow",{suc:-2}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(bdE({danh:5,sung:3},{danh:-4,sung:-2}),{lose:{fx:{danh:-4,sung:-2},k:-1,g:[-3]}})},
 bd_san_9:{s1:[bdR("suc",{danh:4,sung:2},{danh:-3}),bdS({tamco:-1},{danh:2,duc:1}),bdS({danh:-1},{mat:1,duc:1})],
  s2:[bdR("sung",{danh:3},{sung:-2},{suc:-1}),bdS({tamco:-1},{duc:2}),bdS({bac:-40},{duc:2,mat:1})],
  c1:[bdG(bdS({danh:-2},{duc:2,mat:1}),[3]),bdG(bdS({tamco:-1},{danh:2}),[2]),bdG(bdR("suc",{danh:2,mat:1},{danh:-2},{suc:-1}),[3,-2])],
  c2:[bdR("suc",{sung:4},{sung:-3}),bdS({bac:-30},{duc:2}),bdS({sung:-1},{duc:2,danh:1})],
  t1:[bdS({suc:-1},{danh:2,duc:2}),bdS({duc:-2},{danh:4}),bdS({sung:-1},{duc:3})],
  x1:[bdX(35,"suc","self"),bdX(45,"danh","teach",{suc:-2}),bdG({c:{danh:-2},w:{duc:1}},[3])],
  E:bdE({danh:6,sung:3},{danh:-4})},
 bd_san_10:{s1:[bdS({tamco:-1},{duc:2,th:1}),bdS({sung:-1},{tamco:2}),bdR("sung",{sung:4},{sung:-3},{tamco:-1})],
  s2:[bdS({bac:-60},{duc:2,tamco:1}),bdR("tamco",{mat:1},{danh:-2},{suc:-1}),bdS({suc:-2},{duc:2})],
  c1:[bdS({tamco:-1},{duc:2}),bdR("tamco",{mat:1,tamco:1},{danh:-2},{suc:-1}),bdS({suc:-1},{duc:3})],
  c2:[bdG(bdR("tamco",{tamco:2},{danh:-1},{suc:-1}),[3]),bdG(bdS({danh:-1},{duc:2}),[2]),bdG(bdS({tamco:-1},{mat:1}),[2])],
  t1:[bdS({tamco:-1},{sung:4}),bdR("sung",{duc:3},{sung:-3},{suc:-1}),bdS({bac:-40},{sung:2,danh:1})],
  x1:[bdX(40,"sung","stay",{suc:-2}),bdX(35,"suc","north"),{c:{sung:-2},w:{duc:1}}],
  E:bdE({sung:4,tamco:3},{sung:-4,danh:-2})},
 bd_san_11:{s1:[bdS({suc:-2},{sung:3}),bdS({tamco:-1},{duc:2,danh:1}),bdR("tamco",{mat:1,tamco:1},{suc:-2},{suc:-1})],
  s2:[bdR("sung",{sung:3},{danh:-2},{suc:-1}),bdS({bac:-30},{mat:1}),bdS({tamco:-1},{mat:1})],
  c1:[bdR("danh",{mat:1,danh:2},{danh:-2},{suc:-1}),bdS({tamco:-1},{mat:1}),bdR("suc",{mat:1,danh:2},{suc:-3},{suc:-1})],
  c2:[bdG(bdR("duc",{duc:2},{sung:-1},{tamco:-1}),[3,-2]),bdS({duc:-1},{tamco:2}),bdG(bdS({danh:-1},{sung:2}),[2])],
  t1:[bdS({suc:-1},{sung:3}),bdS({sung:-1},{duc:3}),bdS({tamco:-1},{tamco:3})],
  x1:[bdX(35,"suc","guard"),bdX(35,"tamco","scout",{suc:-2}),bdX(50,"duc","share",{danh:-2})],
  E:Object.assign(bdE({sung:8,danh:5},{danh:-5,sung:-3}),{lose:{fx:{danh:-5,sung:-3},k:-1,g:[-3]}})}});
Object.assign(BAL.road.rare,{bd_san_11:{p:.12,np:2,sc:2,c:{suc:-4},fx:{danh:12,sung:6},bar:45,g:[8]}});
Object.assign(BAL.arc.fx,{
 bd_soi:{s1:[bdR("tamco",{duc:2,sung:2},{sung:-2},{bac:-30}),bdS({duc:-1},{mat:1,tamco:1}),bdS({bac:-40},{duc:3})],
  s2:[bdS({tamco:-1},{mat:1}),bdR("sung",{sung:3,danh:1},{danh:-2},{suc:-1}),bdS({danh:-1},{mat:1,bac:30})],
  c1:[bdR("tamco",{duc:2,danh:2},{danh:-2},{suc:-1}),bdS({tamco:-1},{sung:3}),bdS({bac:-60},{duc:2,danh:1})],
  c2:[bdG(bdS({sung:-1},{danh:3}),[2]),bdS({danh:-1},{duc:2}),bdG(bdR("tamco",{duc:2},{sung:-1},{suc:-1}),[3,-2])],
  t1:[bdR("sung",{sung:4},{sung:-3}),bdS({duc:-2},{tamco:2,mat:1}),bdS({sung:-1},{duc:3})],
  x1:[bdX(40,"tamco","kin",{suc:-2}),bdX(35,"sung","cold"),{c:{danh:-2},w:{duc:1}}],
  E:{win:{fx:{danh:5,sung:3},k:1},win2:{fx:{danh:4,duc:3},k:1},mid:{fx:{duc:1},k:0},lose:{fx:{danh:-3,sung:-3},k:-1,g:[-2]}}}});
Object.assign(BAL.arc.rare,{bd_soi:{p:.15,c:{suc:-4},np:2,sc:2,bar:45,fx:{danh:12,duc:6},g:[8]}});
Object.assign(BAL.road.fx,{
 bd_soi_5:{s1:[bdR("sung",{sung:4},{sung:-3}),bdS({tamco:-1},{mat:1}),bdS({duc:-2},{tamco:3})],
  s2:[bdS({tamco:-1},{duc:3}),bdS({duc:-1},{mat:1,tamco:1}),bdS({bac:-40},{tamco:2,mat:1})],
  s3:[bdR("sung",{danh:3},{sung:-2},{suc:-1}),bdS({tamco:-1},{mat:1}),bdS({bac:-60},{duc:3})],
  c1:[bdS({tamco:-1},{duc:2}),bdS({bac:-30},{mat:1}),bdR("tamco",{tamco:3},{danh:-2},{suc:-1})],
  c2:[bdG(bdS({tamco:-1},{duc:2}),[2]),bdG(bdR("tamco",{mat:1},{danh:-1},{suc:-1}),[3]),bdG(bdS({danh:-1},{duc:2,sung:1}),[2])],
  t1:[bdS({danh:-1},{duc:3}),bdS({suc:-1},{tamco:2}),bdS({duc:-2},{mat:1,tamco:1})],
  x1:[bdX(40,"tamco","hold",{suc:-2}),bdX(35,"tamco","wolf"),bdX(45,"duc","honest",{bac:-40})],
  E:Object.assign(bdE({tamco:3,mat:1},{danh:-4,sung:-2}),{lose:{fx:{danh:-4,sung:-2},k:-1,g:[-2]}})},
 bd_soi_6:{s1:[bdS({bac:-30},{duc:2}),bdR("danh",{danh:3},{danh:-2},{tamco:-1}),bdR("tamco",{mat:1,tamco:1},{suc:-3},{suc:-1})],
  s2:[bdR("duc",{duc:3,danh:1},{danh:-2},{bac:-30}),bdS({tamco:-1},{danh:2}),bdS({suc:-2},{mat:1})],
  c1:[bdS({bac:-50},{mat:1,tamco:1}),bdR("tamco",{tamco:3},{suc:-2},{suc:-1}),bdS({duc:-1},{tamco:1,danh:1})],
  c2:[bdG(bdR("danh",{duc:2},{danh:-1},{tamco:-1}),[3,3]),bdS({tamco:-1},{mat:1}),bdS({danh:-1},{duc:2})],
  t1:[bdS({suc:-2},{mat:1,tamco:1}),bdR("suc",{danh:3,sung:2},{danh:-2},{suc:-1}),bdS({tamco:-1},{duc:2})],
  x1:[bdX(35,"tamco","turn"),bdX(45,"duc","guard",{suc:-2}),bdX(40,"suc","law",{duc:-3})],
  E:Object.assign(bdE({danh:4,mat:1},{danh:-3,sung:-2}),{lose:{fx:{danh:-3,sung:-2},k:-1,g:[-3]}})},
 bd_soi_7:{s1:[bdR("tamco",{tamco:3},{sung:-3},{suc:-1}),bdR("danh",{danh:3,duc:1},{danh:-2},{suc:-1}),bdS({duc:-2},{sung:3})],
  s2:[bdR("danh",{danh:4},{danh:-2},{suc:-1}),bdS({bac:-60},{duc:2,danh:1}),bdS({duc:-2},{sung:3})],
  c1:[bdR("danh",{danh:2,mat:1},{danh:-2},{tamco:-1}),bdS({bac:-60},{mat:1,duc:1}),bdS({sung:-1},{duc:2})],
  c2:[bdG(bdS({danh:-1},{sung:3}),[3]),bdG(bdS({sung:-1},{duc:3}),[3]),bdG(bdR("tamco",{tamco:2},{danh:-1},{suc:-1}),[3,-2])],
  t1:[bdS({duc:-2},{sung:4}),bdS({danh:-1},{duc:2,sung:1}),bdS({tamco:-1},{sung:3})],
  x1:[bdX(40,"tamco","peace",{suc:-2}),bdX(35,"sung","war",{duc:-3}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(bdE({danh:4,bac:80},{danh:-3,sung:-3}),{lose:{fx:{danh:-3,sung:-3},k:-1,g:[-3]}})},
 bd_soi_8:{s1:[bdR("sung",{duc:3,danh:2},{danh:-3}),bdS({bac:-40},{duc:3}),bdS({sung:-1},{tamco:2,duc:1})],
  s2:[bdR("danh",{duc:4},{danh:-3},{suc:-1}),bdS({bac:-30},{duc:2}),bdS({duc:-2},{tamco:3})],
  c1:[bdR("sung",{mat:1,duc:1},{danh:-2},{tamco:-1}),bdS({duc:-1},{tamco:2}),bdS({bac:-60},{duc:2,mat:1})],
  c2:[bdG(bdR("duc",{duc:2},{danh:-1},{tamco:-1}),[2,3]),bdS({duc:-1},{danh:2}),bdG(bdS({danh:-1},{duc:3}),[2])],
  t1:[bdR("sung",{danh:3,duc:2},{danh:-3}),bdS({tamco:-1},{duc:2}),bdS({duc:-3},{tamco:3,mat:1})],
  x1:[bdX(40,"sung","open",{suc:-2}),bdX(35,"tamco","bait",{duc:-3}),bdX(50,"duc","send",{danh:-2})],
  E:Object.assign(bdE({duc:4,danh:3},{danh:-3,sung:-2}),{lose:{fx:{danh:-3,sung:-2},k:-1,g:[-2]}})},
 bd_soi_9:{s1:[bdR("suc",{danh:5},{danh:-3}),bdS({bac:-50},{duc:2,danh:1}),bdS({suc:-2},{duc:3})],
  s2:[bdS({tamco:-1},{duc:2}),bdS({mat:-1},{duc:2,danh:1}),bdS({bac:-40},{duc:3})],
  c1:[bdR("duc",{mat:1,danh:1},{danh:-2},{bac:-50}),bdR("tamco",{tamco:3,mat:1},{danh:-3},{bac:-60}),bdS({tamco:-1},{duc:2})],
  c2:[bdG(bdS({sung:-1},{danh:3}),[2]),bdS({danh:-1},{duc:2}),bdG(bdR("duc",{duc:2},{sung:-1},{tamco:-1}),[2,-1])],
  c3:[bdS({sung:-2},{danh:4}),bdS({tamco:-1},{danh:2,duc:1}),bdS({danh:-1},{sung:3})],
  t1:[bdS({bac:-60},{duc:3}),bdS({tamco:-1},{danh:2}),bdR("danh",{danh:4},{danh:-3},{suc:-1})],
  x1:[bdX(35,"suc","self"),bdX(45,"tamco","champ",{bac:-60}),{c:{danh:-2},w:{duc:1}}],
  E:Object.assign(bdE({danh:6,sung:2},{danh:-3,sung:-2}),{lose:{fx:{danh:-3,sung:-2},k:-1,g:[-2]}})},
 bd_soi_10:{s1:[bdR("sung",{sung:3,duc:1},{sung:-2},{tamco:-1}),bdS({suc:-1},{mat:1,tamco:1}),bdS({duc:-1},{tamco:3})],
  s2:[bdR("danh",{danh:3,duc:1},{danh:-2},{bac:-30}),bdR("tamco",{mat:1,duc:1},{suc:-2},{suc:-1}),bdS({duc:-2},{danh:3})],
  c1:[bdS({danh:-1},{duc:2}),bdS({bac:-80},{danh:2,duc:1}),bdS({duc:-1},{mat:1,danh:1})],
  c2:[bdG(bdS({danh:-1},{duc:3}),[2]),bdG(bdS({duc:-1},{sung:3}),[3]),bdG(bdR("tamco",{tamco:2},{danh:-1},{suc:-1}),[3,-2])],
  c3:[bdS({sung:-2},{danh:4}),bdS({danh:-1},{sung:3}),bdS({tamco:-1},{danh:2,duc:1})],
  t1:[bdS({sung:-1},{duc:3}),bdS({tamco:-1},{duc:2,sung:1}),bdS({duc:-3},{sung:4})],
  x1:[bdX(40,"duc","envoy",{suc:-2}),bdX(40,"tamco","oath",{suc:-2}),bdX(35,"sung","army",{duc:-3})],
  E:Object.assign(bdE({danh:6,sung:3},{danh:-4,sung:-3}),{lose:{fx:{danh:-4,sung:-3},k:-1,g:[-3]}})},
 bd_soi_11:{s1:[bdR("duc",{duc:3,danh:2},{danh:-2},{bac:-40}),bdS({sung:-1},{duc:3}),bdS({tamco:-1},{mat:1,danh:1})],
  s2:[bdR("sung",{danh:3},{danh:-2},{suc:-1}),bdS({tamco:-1},{duc:2,danh:1}),bdS({bac:-40},{mat:1,tamco:1})],
  c1:[bdS({danh:-1},{sung:2,duc:1}),bdS({tamco:-1},{duc:3}),bdS({duc:-2},{tamco:2,danh:1})],
  c2:[bdG(bdS({danh:-1},{duc:3}),[3]),bdG(bdS({duc:-2},{bac:120}),[3]),bdS({tamco:-1},{sung:2})],
  t1:[bdS({sung:-1},{danh:3}),bdS({tamco:-1},{sung:2,duc:1}),bdR("sung",{tamco:3,danh:2},{sung:-4},{suc:-1})],
  x1:[bdX(35,"sung","heir"),bdX(45,"duc","peace",{suc:-2}),bdX(50,"tamco","self",{duc:-3})],
  E:Object.assign(bdE({danh:10,sung:5},{danh:-6,sung:-4}),{lose:{fx:{danh:-6,sung:-4},k:-1,g:[-4]}})}});
Object.assign(BAL.road.rare,{bd_soi_11:{p:.12,np:2,sc:2,c:{suc:-4},fx:{danh:14,duc:6},bar:45,g:[10]}});

/* ---- writer-2 block: bd_tuyet, bd_hen ---- */
