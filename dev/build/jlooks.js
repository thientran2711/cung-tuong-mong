/* ================= jlooks: NEW LOOKS — weather + environment + harm looks, 3 levels, pox, LAYER LAW (review/looks-2 → looks-2-2) =================
   Owner (OD tail, read verbatim on the handover branch): 17/11 ~16:20Z (g) smudge / stains / ink / pox / layer law; ~16:40Z smudge nhẹ·vừa·nặng per
   cause, smallpox scar cured by a BOUGHT Thái y ointment through the hủy dung scar path, throw tea / water / ink = MINIGAMES; ~17:40Z (1) emotion faces
   dropped for good, (3) EVERY weather kind has effects; ~17:55Z (2) every environmental look = a PAINTED overlay filter, table A fashion / B gameplay
   (dev/handover/reports/looks-2.md §5). Numbers: BAL.looks. ONE rule for everyone (OD:L1154): her, consorts, servants, court, Thái hậu, Hoàng thượng,
   children; men never get makeup rows; Hoàng thượng / Thái hậu are never the TARGET of the harm acts.
   LOOKS = one catalog (BAL.looks.cat): FACE (lem phấn, bụi, muội, mồ hôi, lạnh, mực) + HAIR (tóc rối/trâm lệch, tóc ẩm, hoa lá vương) live in the
   day's toilette record when there is one (p.toilette.lk), else p.lk for this tuần → redoing hair + makeup (Điểm trang lại) or the next tuần clears
   them; CLOTHES (ẩm/ướt, vết trà, bùn, xốc xếch, ám khói, móc chỉ) live in p.stain → changing clothes or the next tuần clears them. Items with a time
   (BAL.looks.cat[id].t, buổi per level) also wear off by themselves. Level 1..3 = nhẹ / vừa / nặng; a stronger hit raises the level, never lowers it.
   Causes: the weather of the moment (C-AG currentWeather() / .lv when present, else S.wx) whenever someone is OUTDOORS (her outdoor acts — jweather
   wxOutActAny —, NPCs in Ngự hoa viên each buổi); garden branches, mud after rain, kitchen smoke, a fall (jweather slip), crying, and three harm acts
   played as minigames on the slap/dodge kit (jslap slapGame): Hắt nước, Hắt trà, Quạt mực.
   Pictures: Foreman C (Magnific gpt-2-6, OD:L1196). A slot draws NOTHING until its file is in LOOKS_ART; hair / clothes slots are placed by the
   body-fit kit part KIT_BODY (jbody.js, KIT §28.8e). LAYER LAW: the last kitFxLayers wrap puts every makeup tag (img.kmkl) under every mark. ================= */
Object.assign(BAL,{looks:{
 /* catalog: part, sac = Sắc lost per level step (lost = round(sac × level)), t = buổi until it wears off by itself per level (0 = stays until cleared) */
 cat:{smu:{part:"face",sac:2.3,t:[0,0,0,0]},bui:{part:"face",sac:1,t:[0,2,3,4]},muoi:{part:"face",sac:1.4,t:[0,0,0,0]},
  moho:{part:"face",sac:1,t:[0,2,2,3]},lanh:{part:"face",sac:0.6,t:[0,1,2,2]},muc:{part:"face",sac:3,t:[0,0,0,0]},
  toc:{part:"hair",sac:1.7,t:[0,0,0,0]},tocam:{part:"hair",sac:0.6,t:[0,2,3,4]},vuong:{part:"hair",sac:0,t:[0,2,2,2]},
  uot:{part:"cloth",sac:1.3,t:[0,1,2,2]},tra:{part:"cloth",sac:2,t:[0,0,0,0]},bun:{part:"cloth",sac:1,t:[0,0,0,0]},
  xoc:{part:"cloth",sac:1,t:[0,0,0,0]},khoi:{part:"cloth",sac:0.7,t:[0,3,4,4]},moc:{part:"cloth",sac:0.7,t:[0,0,0,0]}},
 /* weather → looks: [item, odds by weather level 0..3, level ("lv" = the weather's level, or a fixed number)]; kinds = j12 WX / WX_KH k */
 wx:{rain:[["smu",[0,100,100,100],"lv"],["uot",[0,60,85,100],"lv"],["tocam",[0,50,70,90],"lv"],["bun",[0,20,35,50],1]],
  storm:[["smu",[0,100,100,100],3],["uot",[0,100,100,100],3],["tocam",[0,100,100,100],3],["toc",[0,60,60,60],2],["bun",[0,70,70,70],2]],
  wind:[["toc",[0,40,70,90],"lv"],["xoc",[0,30,60,80],"lv"],["bui",[0,25,40,60],1]],
  sun:[["moho",[0,0,60,80],1]],mist:[["tocam",[0,40,40,40],1]],
  snow:[["uot",[0,40,40,40],1],["lanh",[0,60,60,60],1],["vuong",[0,30,30,30],1]],snowh:[["uot",[0,80,80,80],2],["lanh",[0,80,80,80],2],["vuong",[0,30,30,30],1]],
  frost:[["lanh",[0,50,50,50],1]],petal:[["vuong",[0,40,40,40],1]],leaf:[["vuong",[0,40,40,40],1]],snowp:[["vuong",[0,40,40,40],1]]},
 /* fallback level of a kind only when C-AG gives neither lv nor kl (old saves without S.wxDay); windUp = chance a windy spell is gió lớn (vừa) */
 wxLv:{rain:1,storm:3,wind:1,sun:2,mist:1,snow:1,snowh:2,frost:1,petal:1,leaf:1,snowp:1},windUp:30,
 /* cover: kiệu almost nothing; dù / lọng / áo tơi = × du[kind] (1 = useless: wind, mist; storm nearly useless); a servant holding it = at most help */
 cover:{kieu:.05,help:.6,du:{rain:.4,storm:.85,wind:1,sun:.5,mist:1,snow:.5,snowh:.6,frost:1,petal:1,leaf:1,snowp:1}},
 /* B gameplay: thunder fright (mood Sợ), heatstroke (Sức), both lowered by cover like the looks */
 b:{fear:{o:40,v:45},heat:{o:12,suc:8}},
 /* environment (no weather): branches in Ngự hoa viên, mud after a rain today, kitchen smoke */
 env:{canh:8,bun:25,khoi:30},
 cry:{o:70,lv:1,lvLong:2},
 /* harm acts as minigames (jslap engine): her level from the game, an NPC's from the slap rank table; dodge lowers one level (nhẹ = miss) */
 act:{nuoc:{duc:-2,ev:-3,w:1},tea:{duc:-3,ev:-4,w:1,hotSuc:5},ink:{duc:-4,ev:-6,w:.8},npcUp:50},
 /* tone = strength of the painted mark (owner picks 18/11: mực 85 %, muội 85 %, vết cào 85 %); opacity x strength + lighter colour, see kitToneCss (jk2b) */
 tone:{muc:.85,muoi:.85,cao:.85},
 /* KEEP-OUT (owner 18/11 standing rule: a face mark NEVER covers the eyes or the lips): ellipses [cx,cy,rx,ry] in VEIL-ROW units (u = x/rowW, v = y/rowH from the row's left/top),
    measured on 158 por pictures (Haar eyes + lip colour, dev/test/look-fx-keepout.py) and constant for every por-/fig- row because every row is cut from the face rect by the same ratios.
    Face-square marks are masked by it (lkKeepCss), the scratch rows (scar-fit) are generated so the box stays inside the cheek zone: cheek = [left,top,w,h,rot offset] of the veil row: the OLD diagonal across the cheek below the eye (owner 18/11: never vertical), ~1.4x the R3 length, as long as the keep-out allows. pad = ONE margin: every ellipse is grown by it (mask, scratch test). */
 keep:{feather:.012,eye:[[.31,.08,.14,.15],[.72,.08,.14,.15]],
 /* PER-PICTURE KEEP-OUT (R9f, owner 18/11 standing rule: never the eyes, never the lips; c30 pits landed on the iris because ONE constant ellipse was wrong for pictures whose eyes sit off it): img/keep-fit.json = { "<por-/fig- file>": [eye1 u, eye1 v, eye2 u, eye2 v, eye half-width, eye half-height, mouth u, mouth v, mouth half-width, mouth half-height, nose u, nose v] } x1000, in VEIL-ROW units, measured from MediaPipe face landmarks (dev/tools/look-fx-eyefit.py: eye CONTOUR + lip outline); an ellipse = half-size x [kx, + ax, ky, + ay]; the nose keeps the constant size, only its centre moves. A picture with no row keeps the constants (eye / mouth / nose above). */
 fit:{eye:[1.35,.042,2.4,.048],mouth:[1.25,.01,1.6,.01]},mouth:[.47,.655,.25,.10],nose:[.51,.36,.11,.2],pad:1.15,cheek:[.08,.30,.28,.20,5],
 /* VẾT CÀO lv1 + lv2 + lv3 (owner 18/11 ~04:50Z + ~05:00Z "chốt bậc 3 cho mức nhẹ luôn"): ladder STEP 3 = 1.6 x the R6 box [.28 x .26] of the veil row, left 0, top .20, old diagonal, flipped, below the eye; it crosses the eye / nose / mouth zones, so the strokes are CUT at the zones by the stroke-level mask (lkKeepScar). lv1 stays the scar-fit row. */
 cheek3:[0,.20,.448,.416,0],
 /* INK PLACEMENT (r11, review look-fx-r10 FAIL: the painted ink head sits at the far left edge of the face square = the temple, so a correct face clip either left it on the hair lock or cut it to nothing):
    the ink layer (fx-muc-N, + -m) is MOVED per picture so the stroke's head lands on the upper cheek just below + outside the viewer-side eye of THAT picture (its keep-fit row, lkKeepFor):
    target = eye centre - at[0] x eye half-width (outward), + at[1] x eye half-height (down), in face-square units; the layer = the face square scaled by k about the art's head point an[lv-1] (art units, per level) and turned rot deg about it (the painted stroke runs eye-level-to-mouth: turned flatter it lies across the cheekbone instead of reaching the lips; LOOK r11);
    box = the main stroke only (art units [x0,y0,x1,y1], clip-path inset; drops the lv3 splash at the chin). A picture whose cheek is narrow (3/4 face, hair lock) carries its own [at0, at1] x1000 as items 13-14 of its keep-fit row (written by the scan --fit, outliers only). Constants from the whole-group scan dev/test/look-fx-inkscan.py (17800 pictures). No keep-fit row = the old square. */
 ink:{at:[.75,1.6],k:[.7,.8,.9],rot:-30,an:[[.086,.507],[.042,.443],[0,.407]],box:[0,.33,.37,.64]},
 /* FACE CLIP (owner 18/11 ~04:58Z: no mark past the face skin onto hair / ear / neck / background): ONE polygon in face-square units (0..1 of the square of lkSquareRect), measured on 180 por pictures (skin segmentation, dev/test/look-fx-faceclip.py); every mark layer (face-square marks, cào, smudge) is clipped to it by lkFaceClipAll */
 face:[[.23,.19],[.5,.14],[.77,.19],[.88,.34],[.90,.52],[.84,.70],[.72,.87],[.5,.96],[.28,.87],[.16,.70],[.10,.52],[.12,.34]]},
 pox:{thuydau:{sea:["Xuân"],cont:1,die:0},sac:{thuydau:[0,3,5,8],daumua:[0,6,10,14]},spread:35,spreadWk:3,scar:[0,1,1,2]},
 /* SMUDGE = a CODE effect on her makeup colours (owner 17/11 ~23:30Z), per level 0..3 = không / nhẹ / vừa / nặng. Lengths in u = the distance between the two eyes
    (so portrait, figure, mirror all match); a = strength of that colour. blush/lid run DOWN the cheek (vertical, gravity), tear = grey lash-run lines, lip = colour
    dragged past the line from a mouth corner + a drip under the lower lip, blot = blotchy blush, streak = how much the runs break into separate streaks, cry = least
    tear-run when the cause is crying. */
 smuFx:{blush:{len:[0,.8,1.15,1.65],a:[0,.34,.4,.48],blot:[0,0,0,0],wash:[0,0,.055,.075],sgain:[0,1,.5,.5]}/* wash = soft diffuse bleed of the blush into the skin (alpha of a wide feathered halo, spreading down / outward) */,lid:{len:[0,.5,.8,1.05],a:[0,.24,0,0]}/* vừa / nặng: no eyeshadow run (it was the pink vertical stripe, owner 01:21Z) */,
  tear:{len:[0,.5,1,1.7],a:[0,.25,.34,.42],dark:1.2/* x on the grey runs' opacity at every level: OWNER PICK 18/11 ~02:05Z "lem phấn 20 %" = 1.2 */,extra:{n:[0,0,0,1],len:.33,off:.075,w:1}/* nặng: ONE extra short grey run per face (about 1/3 of the main run) starting at the lash line beside the main run on a seeded eye; same colour and strength as the main run */,w:[0,.026,.03,.04],n:[0,1,1,1],pair:[0,0,[.55,1.5],0],fine:[0,0,0,1]}/* fine = nặng runs taper (thick at the lash line, thinning), wander and break; pair = vừa: one eye's run SHORT, the other LONG (which eye is seeded per face) *//* pair = vừa: one eye's run SHORT, the other LONG (not mirrored; which one is seeded per face) */,cry:{len:.8,a:.36,w:.03},
  lip:{sm:[0,0,.6,1],a:[0,0,.32,.44]},streak:[0,.35,.3,.3],
  big:{at:100,max:130,boost:1.25,steps:3}/* LARGE faces (face px from `at` up to `max`): the grey runs are up to x boost darker, in `steps` steps, so a big face is not washed (owner 18/11 01:23Z, inverse of the small-size boost) */,pct:{blush:[0,.2,.2,.2],lip:[0,.2,.2,.2]}/* OWNER KNOB (OD 18/11 ~00:58Z): opacity share of the blush smear and of the lip smear at vừa / nặng; she picks 5 / 10 / 15 / 20 % from option images; null = the older wash / lip.a numbers */}}});
/* the 24 owner-approved face finals (384x384 face-square, uploaded to the CDN img/ 18/11, md5 table dev/handover/reports/looks-2-art.md); hair + cloth slots stay empty (not approved) */
window.LOOKS_ART={};for(const f of["bui","moho","muc","muoi"])for(let n=1;n<=3;n++){LOOKS_ART[`fx-${f}-${n}.png`]=1;if(f==="muc")LOOKS_ART[`fx-muc-${n}-m.png`]=1}
for(const k of["thuydau","daumua","scar"])for(let n=1;n<=3;n++)LOOKS_ART[`fx-pox-${k}-${n}.png`]=1;
const LK_N={smu:["","Phấn son lem nhẹ","Phấn son lem nhem","Phấn son lem nhem nặng"],bui:["","Mặt lấm bụi","Bụi bám đầy mặt","Bụi bám đầy mặt"],
 muoi:["","Mặt lấm muội khói","Mặt lấm muội khói","Mặt đen muội khói"],moho:["","Mồ hôi làm phấn trôi","Mồ hôi làm phấn trôi","Mồ hôi đẫm, phấn trôi hết"],
 lanh:["","Má đỏ môi tái vì lạnh","Má đỏ môi tái vì lạnh","Lạnh tím môi"],muc:["","Mặt vấy mực","Mặt lem mực","Mặt lem nhem mực đen"],
 toc:["","Tóc rối","Tóc rối, trâm lệch","Tóc xổ tung, trâm rơi"],tocam:["","Tóc ẩm","Tóc ướt","Tóc ướt bết"],vuong:["","Hoa lá vương tóc","Hoa lá vương tóc","Hoa lá vương tóc"],
 uot:["","Áo ẩm","Áo ướt","Áo ướt sũng"],tra:["","Áo vấy trà","Áo loang vết trà","Áo ướt đẫm nước trà"],bun:["","Gấu áo lấm bùn","Gấu áo lấm bùn","Áo lấm lem bùn đất"],
 xoc:["","Áo xốc xếch","Áo xốc xếch","Áo xộc xệch tả tơi"],khoi:["","Áo ám khói","Áo ám khói","Áo ám khói"],moc:["","Vạt áo móc chỉ","Vạt áo rách chỉ","Vạt áo rách toạc"]};
const LK_FACE=["smu","bui","muoi","moho","lanh","muc"],LK_HAIR=["toc","tocam","vuong"],LK_CLOTH=["uot","tra","bun","xoc","khoi","moc"];
function lkArt(f){return !!(window.LOOKS_ART&&LOOKS_ART[f])}
function lkB(){return BAL.looks}
function lkNow(){try{return typeof bid==="function"?bid():wk()*3+((S&&S.buoi)|0)}catch(e){return 0}}
function lkLive(p){try{return !!p&&KIT_FACEFX.live(p)}catch(e){return false}}
function lkKind(p){return KIT_FACEFX.kind(p)}
function lkFemale(p){try{if(p===S)return true;return personRoleRank(p).sex==="f"}catch(e){return false}}
function lkProtected(p){const k=lkKind(p);return k==="emp"||k==="thaihau"}
/* wearing makeup now: her = today's toilette has makeup; co-op friend = her record; every other woman = painted made-up */
function lkMadeUp(p){if(!lkFemale(p))return false;try{if(p===S||p.coop){const t=p===S?toilToday(S):toilFriendRec(p);return !!(t&&t.makeup)}}catch(e){return false}return true}
const LK_MK={smu:1,moho:1};
/* ---------- storage ---------- */
function lkRec(p){const t=p&&p.toilette;return t&&typeof t==="object"&&t.wk===wk()?t:null}
function lkPeek(p,part){if(!p)return null;if(part==="cloth"){const z=p.stain;return z&&z.w===wk()&&z.it?z:null}const t=lkRec(p);if(t)return t.lk&&t.lk.it?t.lk:null;const L=p.lk;return L&&L.w===wk()&&L.it?L:null}
function lkBag(p,part){const b=lkPeek(p,part);if(b)return b;if(part==="cloth")return p.stain={w:wk(),it:{}};const t=lkRec(p);if(t)return t.lk={it:{}};return p.lk={w:wk(),it:{}}}
function lkItem(p,id){const c=lkB().cat[id];if(!c||!p)return null;const bag=lkPeek(p,c.part);const x=bag&&bag.it[id];if(!x||!(x.lv>0))return null;
 if(LK_MK[id]&&!lkMadeUp(p))return null;const T=c.t[x.lv]|0;if(T&&!p.coop&&lkNow()-(x.at|0)>=T)return null;return x}   /* a co-op friend runs on HER clock: her seat sweeps it, the relay carries it */
/* each new buổi: worn-off items leave the bag, so a co-op friend sees the same (her own seat decides) */
function lkSweep(p){for(const part of ["face","hair","cloth"]){const b=lkPeek(p,part);if(!b)continue;for(const id in b.it){const c=lkB().cat[id],x=b.it[id],T=c&&x?c.t[x.lv]|0:0;if(!c||!x||T&&lkNow()-(x.at|0)>=T)delete b.it[id]}}}
(function(){if(typeof nextBuoi!=="function")return;const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{if(S&&!S.dead)lkSweep(S)}catch(e){}return r}})();
function lkItems(p,ids){const out=[];for(const id of ids){const x=lkItem(p,id);if(x)out.push([id,x])}return out}
/* ---------- give (level only goes up; a fresh hit restarts the clock) ---------- */
function lkGive(p,id,lv,by,why){const c=lkB().cat[id];if(!c||!lkLive(p))return 0;lv=cl(lv|0||1,1,3);if(LK_MK[id]&&!lkMadeUp(p))return 0;
 const old=lkItem(p,id);if(old&&old.lv>=lv){old.at=lkNow();return 0}lkBag(p,c.part).it[id]={lv,at:lkNow(),by:fxKey(by),why:why||""};
 try{if(p===S&&window.COOPW&&COOPW.on&&typeof sendPos==="function")sendPos()}catch(e){}   /* co-op: her new look reaches the friend at once */
 return lv}
function lkWord(id,lv){return (LK_N[id]||[])[lv]||""}
function lkSay(p,L){const W=L.filter(Boolean);if(!W.length)return"";return `${p===S?"Ngươi":fxName(p)}: ${W.join(", ").toLowerCase()}. `}
/* part-1 names kept for callers and tests */
function lkSmudge(p,lv,why,by){const g=lkGive(p,"smu",lv,by,why);return g?lkSay(p,[lkWord("smu",g)]):""}
function lkStain(p,k,by,lv){const id=k==="tra"?"tra":"uot";const g=lkGive(p,id,lv||1,by);return g?lkSay(p,[lkWord(id,g)]):""}
function lkInk(p,by,lv){const g=lkGive(p,"muc",lv||1,by);return g?lkSay(p,[lkWord("muc",g)]):""}
function lkSmuOf(p){return lkItem(p,"smu")}
function lkInkOf(p){return lkItem(p,"muc")}
function lkStainOf(p){const L=lkItems(p,LK_CLOTH);return L.length?Object.assign({k:L[0][0]},L[0][1]):null}
/* ---------- weather of the moment (C-AG jwxk currentWeather when present) ---------- */
function lkWxNow(){try{let c=typeof currentWeather==="function"?currentWeather():null;if(!c&&S&&S.wx)c=S.wx;if(!c||!c.k)return null;const k=c.k;
 let lv=c.lv|0;if(!lv&&c.kl)lv=c.kl|0;   /* dry kinds (wind, heat, fog, frost…): C-AG's own level of that kind (weather-khac-2 kl), the same one she is shown */
 if(!lv){lv=lkB().wxLv[k]||0;if(k==="wind"&&roll(lkB().windUp))lv=2}if(k==="sun"&&c.f!==2)lv=0;return{k,lv:cl(lv,0,3)}}catch(e){return null}}
function lkCover(p){try{if(typeof wxKieuOk==="function"&&wxKieuOk(p))return"kieu";if(typeof wxHasGear==="function"&&wxHasGear(p,"cold"))return"du";if(typeof wxHelper==="function"&&wxHelper(p))return"help"}catch(e){}return""}
function lkCoverX(p,k){const C=lkB().cover,c=lkCover(p),d=C.du[k]==null?1:C.du[k];return c==="kieu"?C.kieu:c==="du"?d:c==="help"?Math.max(C.help,d):1}
/* one person outdoors for a while: roll the weather's looks + the B effects; returns the line for her */
function lkOutdoor(p,o){if(!lkLive(p)||p.coop)return"";   /* a co-op friend's weather is rolled on HER seat only (the relay brings it) */o=o||{};const W=lkWxNow(),B=lkB(),said=[];
 if(W&&W.lv>0){const x=lkCoverX(p,W.k);
  for(const [id,odds,lvR] of B.wx[W.k]||[]){if(roll(Math.round((odds[W.lv]||0)*x))){const g=lkGive(p,id,lvR==="lv"?W.lv:lvR,null,"wx");if(g)said.push(lkWord(id,g))}}
  if(W.k==="storm"&&roll(Math.round(B.b.fear.o*x))){try{if(typeof emoSet==="function")emoSet(p,"so",B.b.fear.v,"sấm sét giữa trời")}catch(e){}said.push("sấm nổ làm giật mình")}
  if(W.k==="sun"&&W.lv>=2&&roll(Math.round(B.b.heat.o*x))){ap(p,{suc:-B.b.heat.suc});said.push(`say nắng, Sức −${B.b.heat.suc}`)}}
 if(o.garden&&roll(B.env.canh)){const g=lkGive(p,"toc",1,null,"canh");lkGive(p,"moc",1,null,"canh");if(g)said.push("cành cây quẹt rối tóc, móc vạt áo")}
 try{if(roll(B.env.bun)&&(typeof wxDayAny==="function"?wxDayAny(1):S.wx&&S.wx.f===1)){const g=lkGive(p,"bun",1,null,"bun");if(g)said.push(lkWord("bun",g))}}catch(e){}
 return said.length?lkSay(p,said):""}
/* her outdoor acts: the same detection as jweather (wxOutActAny), every weather; cooking acts: kitchen smoke */
function lkAfterAct(o){try{if(!S||S.dead||!o)return;const n=String(o.n||"");let t="";
 if(typeof wxOutActAny==="function"&&wxOutActAny(o))t+=lkOutdoor(S,{garden:S.place==="vuon"});
 if(/nấu|bếp|hầm canh|sắc thuốc|nướng/i.test(n)&&roll(lkB().env.khoi)){lkGive(S,"muoi",1,null,"khoi");lkGive(S,"khoi",1,null,"khoi");t+="Khói bếp ám mặt, ám áo. "}
 if(t)log(t)}catch(e){console.error("looks act",e)}}
(function(){if(typeof runOpt!=="function")return;const r0=runOpt;runOpt=function(a){const r=r0.apply(this,arguments);if(r!==null)lkAfterAct(a);return r}})();
(function(){if(typeof chooseM!=="function")return;const c0=chooseM;chooseM=function(i){const m=Q[0];const o=m&&m.opts&&m.opts[i];const r=c0.apply(this,arguments);if(o&&Q[0]!==m)lkAfterAct(o);return r}})();
/* NPCs in Ngự hoa viên each buổi (the same place rule as jweather's NPC weather) */
(function(){if(typeof placeWhere!=="function")return;const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);try{const W=S.where||{};
 for(const v of (typeof liveRivals==="function"?liveRivals(true):rivals)||[]){if(!v||!v.alive||v.out||v.confined||W[v.id]!=="vuon")continue;lkOutdoor(v,{garden:true})}}catch(e){console.error("looks npc",e)}return r}})();
/* a fall in bad weather (jweather wxHit "trượt chân") leaves mud and loose hair */
(function(){if(typeof wxHit!=="function")return;const h0=wxHit;wxHit=function(p,R){const r=h0.apply(this,arguments);try{if(/trượt chân/.test(String(r||""))){lkGive(p,"bun",2,null,"nga");lkGive(p,"toc",2,null,"nga")}}catch(e){}return r}})();
/* ---------- crying smudges the makeup (jemoact eaDo "khóc" for everyone, her "Khóc thầm" ventMe) ---------- */
function lkCry(p,long){if(!lkLive(p)||p.coop)return"";const B=lkB().cry;return roll(B.o)?lkSmudge(p,long?B.lvLong:B.lv,"khoc"):""}
(function(){if(typeof eaDo!=="function")return;const d0=eaDo;eaDo=function(p,r){const out=d0.apply(this,arguments);try{if(p&&r&&/khóc/i.test(String(r.n||""))){const x=lkCry(p,/suốt đêm/.test(String(r.n||"")));if(x&&p===S)log(x)}}catch(e){}return out}})();
(function(){if(typeof ventMe!=="function")return;const v0=ventMe;ventMe=function(n,why){const out=v0.apply(this,arguments);try{if(/khóc/i.test(String(why||""))){const x=lkCry(S);if(x)log(x)}}catch(e){}return out}})();
/* ---------- changing clothes clears the clothes looks ---------- */
(function(){for(const fn of ["wdWearEntry","wdApply"]){if(typeof window[fn]!=="function")continue;const f0=window[fn];
 window[fn]=function(p){const r=f0.apply(this,arguments);try{if(p&&p.stain)p.stain=null}catch(e){}return r}}})();
/* ---------- harm acts as MINIGAMES (jslap engine: her aim = the bar, an NPC's throw on her = the dodge card) ---------- */
const LK_ACT={nuoc:{n:"Hắt nước",art:"Hắt",verb:"hắt nước vào {t}",x:"áo nàng ướt, phấn son lem, tóc ướt; Sắc giảm tới khi thay áo, điểm trang lại",give:(t,lv,a)=>[lkGive(t,"uot",lv,a)&&lkWord("uot",lv),lkGive(t,"smu",lv,a)&&lkWord("smu",lv),lkGive(t,"tocam",lv,a)&&lkWord("tocam",lv)]},
 tea:{n:"Hắt trà",art:"Hắt",verb:"hắt trà vào {t}",x:"áo nàng loang vết trà, phấn son lem; trà nóng làm rát da",give:(t,lv,a)=>{const L=[lkGive(t,"tra",lv,a)&&lkWord("tra",lv),lkGive(t,"smu",lv,a)&&lkWord("smu",lv)];if(lv>=3){ap(t,{suc:-lkB().act.tea.hotSuc});L.push(`trà nóng rát da, Sức −${lkB().act.tea.hotSuc}`)}return L}},
 ink:{n:"Quạt mực",art:"Quạt",verb:"quạt mực lên mặt {t}",x:"mặt nàng lem mực; Sắc giảm tới khi rửa mặt điểm trang lại",give:(t,lv,a)=>[lkGive(t,"muc",lv,a)&&lkWord("muc",lv)]}};
const LKG={next:0,busy:0,npcDone:0};
function lkCanHarm(t){return !!t&&lkLive(t)&&!lkProtected(t)}
for(const k in LK_ACT){const D=LK_ACT[k];
 A(k,D.n,{c:{duc:lkB().act[k].duc},ok:(a,t)=>lkCanHarm(t),o:()=>100,x:D.x,f:(a,t)=>{const B=lkB().act[k];
  if(typeof ducAdd==="function")ducAdd(a,B.duc,D.n.toLowerCase());else ap(a,{duc:B.duc});a.schemes=(a.schemes||0)+1;evA(t,a,B.ev);
  const lv=LKG.next?LKG.next:(t===S&&typeof slapNpcTier==="function"?slapNpcTier(a):1+(roll(lkB().act.npcUp)?1:0));
  if(lv<=0)return `<span class="g">${NMc(a)} ${D.verb.replace("{t}",NM(t))}, nhưng ${t===S?"ngươi":"nàng"} né kịp.</span> `;
  const L=D.give(t,lv,a).filter(Boolean);return `<span class="${t===S?"r":"g"}">${NMc(a)} ${D.verb.replace("{t}",NM(t))} giữa chốn đông người.</span> ${L.length?lkSay(t,L):""}`}});
 try{AOUT[k]=[D.x,"nàng biết là ngươi, oán ngươi"];ACTDOM[k]="Mưu kế";J78VERB[k]=D.verb;HARMK[D.n]=k;if(!BANDS[1][2].includes(k))BANDS[1][2].push(k);const g=RVGRP.find(x=>x[0]==="Hại nhỏ");if(g&&!g[1].includes(k))g[1].push(k)}catch(e){}}
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{const b=bandVT(v,t);
 if(b>=1)for(const k in LK_ACT)if(ACT[k].ok(v,t)){const w=lkB().act[k].w*persW(v,k);if(w>0)O.push([k,w])}}catch(e){}return O}})();
/* her throw: the bar decides the level (skip = nhẹ) */
(function(){if(typeof doAct!=="function")return;const d0=doAct;doAct=function(i,k){
 if(!LK_ACT[k]||LKG.busy||typeof window.__bot!=="undefined"||typeof slapGame!=="function"||typeof kg82Open!=="function")return d0.apply(this,arguments);
 const v=rivals[i],a=ACT[k],self=this,args=arguments;if(!v||!a||S.dead||Q.length||!v.alive||v.out||!a.ok(S,v))return d0.apply(this,arguments);
 const D=LK_ACT[k];LKG.busy=1;
 slapGame({title:D.n,art:D.art,by:S,go:D.art,skip:`${D.n} luôn`,skipSub:"không chơi: nhẹ tay",rows:[["Vùng đỏ","trúng đậm: nặng","r"],["Vùng vàng","trúng vừa","r"],["Ngoài vùng","trúng nhẹ","r"]],
  onDone:res=>{LKG.busy=0;LKG.next=res.skipped?1:slapTierOf(res.raw);try{d0.apply(self,args)}finally{LKG.next=0}}})}})();
/* an NPC throws at her: level rolled (slap rank table), she may dodge (one level less; nhẹ = miss) */
(function(){if(typeof runAct!=="function")return;const r0=runAct;runAct=function(a,t,k,extra){
 if(!LK_ACT[k]||t!==S||!a||a===S||LKG.npcDone)return r0.apply(this,arguments);
 const sev=typeof slapNpcTier==="function"?slapNpcTier(a):1,self=this,D=LK_ACT[k];
 const fin=s=>{let r="";LKG.npcDone=1;LKG.next=s>0?s:-1;try{r=r0.call(self,a,t,k,extra)}finally{LKG.next=0;LKG.npcDone=0}return r};
 const bot=typeof window.__bot!=="undefined"||typeof slapGame!=="function"||typeof kg82Open!=="function"||typeof pushModal!=="function"||typeof tsOpt!=="function";
 if(bot)return fin(sev);
 const who=typeof pv==="function"?pv(a):undefined;const show=r=>{if(r){log(r);pushModal({t:D.n,who,h:`<p>${r}</p>`});showModal();render()}};
 pushModal({t:D.n,who,h:`<p>${a.name||"Nàng"} bước tới, định ${D.verb.replace("{t}","ngươi")}. Ngươi có kịp né không?</p>`,opts:[
  Object.assign(tsOpt({n:"Né",odds:BAL.slap.dodgeOdds[slapMg(true,a).tier],later:1,duoc:["nhẹ đi một bậc","nhẹ thì tránh hẳn"],mat:["dính trọn"],kem:["một ván ngắn"],go:()=>{
   slapGame({dodge:true,by:a,title:"Né",go:"Né",skip:"Đứng yên",skipSub:"không né",rows:[["Né kịp","nhẹ đi một bậc; nhẹ thì tránh hẳn","g"],["Không né","dính trọn","r"]],
    onDone:res=>show(fin(res.skipped||res.raw<BAL.slap.raw[3]?sev:sev-1))})}}),{}),
  tsOpt({n:"Đứng yên",odds:null,duoc:[`nhẫn nhịn: Đức +${BAL.cv.duc}`],kem:["dính trọn"],go:()=>{apply({duc:BAL.cv.duc});const r=fin(sev);if(r){log(r);pushModal({t:D.n,who,h:`<p>${r}</p>`})}}})]});
 return""}})();
/* ---------- thủy đậu + đậu mùa (j13 rulebook) ---------- */
try{const X=lkB().pox.thuydau;if(typeof ILL==="object"&&!ILL.thuydau)ILL.thuydau={n:"Thủy đậu",sea:X.sea,cont:X.cont,die:X.die}}catch(e){}
(function(){if(typeof catchIll!=="function")return;const c0=catchIll;catchIll=function(p,k){const r=c0.apply(this,arguments);
 try{const B=lkB().pox;if(k==="thuydau"&&p&&p.ill&&p.ill.k==="thuydau"&&Array.isArray(p.staff))for(const s of p.staff)if(!s.ill&&roll(B.spread))s.ill={k:"thuydau",st:1,known:true,until:wk()+B.spreadWk}}catch(e){}return r}})();
/* smallpox scars: on recovery the face keeps a pock-mark SCAR on the hủy dung path (j70 p.scar: heals over weeks, the bought Thái y ointments
   Ngọc dung cao / Tuyết liên cure it) instead of the old permanent Sắc −8; no Sủng / Danh loss (an illness is no scandal) */
try{if(ILL.daumua)ILL.daumua.scar=0}catch(e){}
function lkPoxScar(p,st){try{if(!p||p.scar||typeof SCAR70==="undefined")return"";const sev=lkB().pox.scar[cl(st|0,1,3)]||1,L=SCAR70[sev];
 p.scar={sev,d:L.d,need:L.need,pg:0,veil:0,tr:0,cure:0,by:null,at:wk(),how:"daumua"};return `${p===S?"Mặt ngươi":"Mặt "+fxName(p)} để lại sẹo rỗ đậu mùa (${L.n}); phải dùng thuốc Thái y mới mong lành hẳn. `}catch(e){return""}}
(function(){if(typeof illMonthP!=="function")return;const i0=illMonthP;illMonthP=function(p){const i=p&&p.ill;const was=i&&i.k==="daumua"?(i.st|0)||1:0;const r=i0.apply(this,arguments);
 try{if(was&&p&&!p.ill&&p.alive!==false&&!p.dead){const t=lkPoxScar(p,was);if(t&&p===S)return (r||"")+t}}catch(e){}return r}})();
(function(){if(typeof kitScarOf!=="function")return;const k0=kitScarOf;kitScarOf=function(p){const r=k0.apply(this,arguments);try{if(r&&p&&p.scar&&p.scar.how==="daumua"){const f=`fx-pox-scar-${r.sev}.png`;return lkArt(f)?{sev:r.sev,src:"img/"+f}:null}}catch(e){}return r}})();
/* ---------- SMUDGE = CODE on her makeup colours (owner 17/11 ~23:30Z: "phấn son lem nhem ... vẽ được từ code giống như bên trang điểm", NOT Magnific) ----------
   Same recipe as the §60 colour layer (jtoil toilMkDraw): one canvas painted from the picture's own face points (img/mk-fit, read-only), cached per picture + level +
   colours, drawn as ONE <img class="klk klk-smu"> in the face-effects slot (kitFxLayers: stage, portrait, mirror, NPC women), above the makeup (layer law, z24).
   Her colours = her toilette picks (son / má / mắt / mày); every other woman's = sampled from her picture (her makeup is painted in the base art). The runs are DIRECTIONAL
   SMEARS of the makeup's own shapes (blush disc, lid band, lip outline) along gravity (down the cheek), broken into streaks, plus grey lash-run tear lines; levels in BAL.looks.smuFx.
   Needs makeup (lkMadeUp) — no makeup, nothing to smudge. A picture without face points gets nothing (never guessed). */
const LK_SMC={},LK_SMQ=[];
function lkSmuBox(v){const P=toilMkPts(v);let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;P.forEach(([x,y])=>{x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)});
 const w=x1-x0,h=y1-y0;return[x0-.32*w,y0-.06*h,w*1.64,h*1.72].map(n=>+n.toFixed(3))}
function lkSmuCols(p){try{if(p===S||p&&p.coop){const c=toilColOfP(p);return{son:toilColRGB("son",c.son),ma:toilColRGB("ma",c.ma),mat:toilColRGB("mat",c.mat),may:toilColRGB("may",c.may),seed:c.seed|0}}}catch(e){}return null}
const LK_SMA={};/* base key -> [file,lv,why,cols]: the size pass re-fetches the same layer at another strength step */
function lkSmuLayer(file,lv,why,cols,step){const v=MK_FIT.get(file);if(!v)return null;
 const base=[file,lv,why,cols?[cols.son,cols.ma,cols.mat,cols.may,cols.seed].join(","):"npc"].join("|"),key=step?base+"|L"+step:base;LK_SMA[base]=[file,lv,why,cols];
 let e=LK_SMC[key];if(!e){e=LK_SMC[key]={box:lkSmuBox(v),src:""};LK_SMQ.push(key);if(LK_SMQ.length>120)delete LK_SMC[LK_SMQ.shift()];lkSmuPaint(file,v,lv,why,cols,e,key,step||0)}return{e,key}}
function lkSmuImg(p,file,x){try{const cols=lkSmuCols(p),lv=cl(x.lv|0,1,3),why=x.why==="khoc"?"khoc":"";const r=lkSmuLayer(file,lv,why,cols,0);if(!r)return"";
 const b=r.e.box;return `<img class="klk klk-smu" data-lsk="${r.key}" src="${r.e.src||TOIL_BLANK}" alt="" aria-hidden="true" style="--fleft:${b[0]}%;--ftop:${b[1]}%;--fwidth:${b[2]}%;--fheight:${b[3]}%">`}catch(err){return""}}
function lkSmuPaint(file,v,lv,why,cols,e,key,step){const im=new Image();im.crossOrigin="anonymous";im.decoding="async";
 im.onload=()=>{try{const L=window.BAL&&BAL.toil&&BAL.toil.lod;e.src=lkSmuDraw(im,v,lv,why,cols,e.box,lkSmuSeed(file,cols),L&&step<10?(step||0)/L.steps:0,step>=10?(step-10)/lkB().smuFx.big.steps:0)}catch(x){e.src=TOIL_BLANK}document.querySelectorAll("img.klk-smu").forEach(q=>{if(q.dataset.lsk===key)q.src=e.src})};
 im.onerror=()=>{e.src=TOIL_BLANK};im.src=IMG_U("img/"+file)}
/* SIZE-AWARE strength (owner 17/11 ~17:30Z + 17:53Z, 18/11 02:20Z): the SAME curve as the makeup colour layer (jtoil toilLodStep / BAL.toil.lod: face width in px -> step 0..steps; boost, cue per part), never a second table.
   One pass over every smudge layer on screen, run inside toilLodPass (same scheduler). Pink bloom ← cue.bl, lip smear ← cue.lip, grey runs ← cue.eye. No BAL.toil.lod (makeup LOD not in this build) = factor 1. */
function lkLodMul(lod,cue){const L=window.BAL&&BAL.toil&&BAL.toil.lod;if(!L||!lod)return 1;return 1+(L.boost-1)*lod*((L.cue&&L.cue[cue])||1)}
/* face px -> step: 0..steps = small (the makeup layer's own toilLodStep), 10+k = large face (k 1..big.steps, BAL.looks.smuFx.big), 0 = the approved strength in between */
function lkSmuStep(px){const s=window.toilLodStep?toilLodStep(px):0;if(s>0)return s;const B=lkB().smuFx.big;if(!(px>B.at))return 0;return 10+Math.min(B.steps,Math.max(1,Math.round(Math.min(1,(px-B.at)/(B.max-B.at))*B.steps)))}
function lkLodPass(){try{if(typeof toilLodStep!=="function")return;document.querySelectorAll("img.klk-smu").forEach(im=>{const cur=im.dataset.lsk||"",base=cur.replace(/\|L\d+$/,""),A=LK_SMA[base];if(!A)return;const w=im.getBoundingClientRect().width;if(!(w>0))return;
  const st=window.toilStageEl&&toilStageEl(im)?0:lkSmuStep(w/1.6),have=+((/\|L(\d+)$/.exec(cur)||[])[1]||0);if(st===have)return;const r=lkSmuLayer(A[0],A[1],A[2],A[3],st);if(!r)return;im.dataset.lsk=r.key;if(r.e.src)im.src=r.e.src})}catch(x){}}
if(typeof toilLodPass==="function"){const tp0=toilLodPass;toilLodPass=function(){tp0();lkLodPass()};window.toilLodPass=toilLodPass}
function lkSmuSeed(file,cols){let h=cols?cols.seed|0:0;for(let i=0;i<file.length;i++)h=(Math.imul(h,31)+file.charCodeAt(i))|0;return h}
function lkSmuDraw(im,v,lv,why,cols,box,seed,lod,big){lod=lod||0;big=big||0;const W=im.naturalWidth,H=im.naturalHeight,F=lkB().smuFx;
 const bx=box[0]/100*W,by=box[1]/100*H,bw=box[2]/100*W,bh=box[3]/100*H,K=Math.max(1,Math.min(4,420/bw)),cw=Math.max(8,Math.round(bw*K)),ch=Math.max(8,Math.round(bh*K));
 const P=toilMkPts(v).map(([x,y])=>[(x/100*W-bx)*K,(y/100*H-by)*K]);const mkc=()=>{const c=document.createElement("canvas");c.width=cw;c.height=ch;return c};
 const c0=mkc(),g0=c0.getContext("2d",{willReadFrequently:true});g0.setTransform(cw/bw,0,0,ch/bh,-bx*cw/bw,-by*ch/bh);g0.drawImage(im,0,0,W,H);g0.setTransform(1,0,0,1,0,0);
 const D=g0.getImageData(0,0,cw,ch).data,N=cw*ch,cl3=(x,a,b)=>x<a?a:x>b?b:x;
 const cen=a=>a.reduce((s,p)=>[s[0]+p[0]/a.length,s[1]+p[1]/a.length],[0,0]);
 let eA=cen(P.slice(20,30)),eB=cen(P.slice(30,40));let iA=20,iB=30;if(eA[0]>eB[0]){[eA,eB]=[eB,eA];[iA,iB]=[iB,iA]}/* A = the eye on the left of the picture */
 const u=Math.hypot(eA[0]-eB[0],eA[1]-eB[1])||40,lc=cen(P.slice(0,12));const eyes=[[eA,iA,-1],[eB,iB,1]];
 const h1=i=>{let h=(i*374761393+seed*668265263)|0;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};
 const vn=(x,y,s)=>{const fx=x/s,fy=y/s,ix=Math.floor(fx),iy=Math.floor(fy),tx=fx-ix,ty=fy-iy,sx=tx*tx*(3-2*tx),sy=ty*ty*(3-2*ty),q=(a,b)=>h1(a*7919+b*104729+13);
  const a=q(ix,iy),b=q(ix+1,iy),c=q(ix,iy+1),d=q(ix+1,iy+1);return a+(b-a)*sx+(c-a)*sy+(a-b-c+d)*sx*sy};
 const paint=fn=>{const c=mkc(),g=c.getContext("2d");fn(g);const d=g.getImageData(0,0,cw,ch).data,m=new Float32Array(N);for(let i=0;i<N;i++)m[i]=d[i*4+3]/255;return m};
 const blur=(m,r)=>{r=Math.max(1,Math.round(r));const t=new Float32Array(N),o=new Float32Array(N),n=2*r+1;
  for(let y=0;y<ch;y++){let s=0;for(let x=-r;x<=r;x++)s+=m[y*cw+cl3(x,0,cw-1)];for(let x=0;x<cw;x++){t[y*cw+x]=s/n;s+=m[y*cw+cl3(x+r+1,0,cw-1)]-m[y*cw+cl3(x-r,0,cw-1)]}}
  for(let x=0;x<cw;x++){let s=0;for(let y=-r;y<=r;y++)s+=t[cl3(y,0,ch-1)*cw+x];for(let y=0;y<ch;y++){o[y*cw+x]=s/n;s+=t[cl3(y+r+1,0,ch-1)*cw+x]-t[cl3(y-r,0,ch-1)*cw+x]}}return o};
 /* directional smear DOWN (gravity): out[y] = max(m[y], the run carried from above, fading linearly over len), run broken into streaks by a smooth column noise */
 const smear=(m,len,streak,keep)=>{const L=Math.max(2,len),o=new Float32Array(N),sw=Math.max(2,u*.05);
  for(let x=0;x<cw;x++){const sf=1-streak+streak*Math.min(1,vn(x,7,sw)*1.55);let c=0;for(let y=0;y<ch;y++){const a=m[y*cw+x];c=Math.max(a,c-1/L);o[y*cw+x]=Math.max(keep*a,(c-a*.55)*sf)}}return o};
 const add=(a,b)=>{for(let i=0;i<N;i++)a[i]=Math.max(a[i],b[i]);return a};
 /* colours: hers from the toilette, everyone else's sampled from the picture */
 const avg=(m,thr)=>{let r=0,g=0,b=0,n=0;for(let i=0;i<N;i++)if(m[i]>thr){r+=D[i*4];g+=D[i*4+1];b+=D[i*4+2];n++}return n?[r/n,g/n,b/n]:null};
 const mixc=(a,b,t)=>a.map((x,i)=>x+(b[i]-x)*t);
 const rad=u*.5,cheeks=eyes.map(([e,ix,sd])=>[e[0]+sd*u*.12,e[1]+u*.95]);
 let cSon,cMa,cMat,cMay;
 if(cols){cSon=cols.son;cMa=cols.ma;cMat=cols.mat;cMay=cols.may}else{
  const lipM=paint(g=>{g.fillStyle="#000";g.beginPath();toilSmooth(g,P.slice(0,12));toilSmooth(g,P.slice(12,20));g.fill("evenodd")});
  cSon=avg(lipM,.7)||[196,70,84];if(cSon[0]<cSon[1]+25)cSon=mixc(cSon,[196,70,84],.6);
  const chM=paint(g=>{g.fillStyle="#000";cheeks.forEach(c=>{g.beginPath();g.arc(c[0],c[1],rad*.35,0,7);g.fill()})});cMa=mixc(avg(chM,.5)||[232,150,150],[238,128,144],.45);
  cMat=mixc(cMa,[214,124,110],.4);cMay=[84,60,52]}
 const lash=mixc(cMay,[92,88,96],.55).map(x=>Math.round(x*.8));/* grey-brown mascara run, never pure black */
 const fx=(a,k)=>a[lv]*(k||1);
 /* skin shade: every colour takes the picture's own light so it sits IN the face */
 const Lum=i=>.299*D[i*4]+.587*D[i*4+1]+.114*D[i*4+2];let sl=0,sn=0;cheeks.forEach(c=>{const i=Math.round(c[1])*cw+Math.round(c[0]);if(i>=0&&i<N){sl+=Lum(i);sn++}});const Lref=Math.max(90,sn?sl/sn:190);
 const layers=[];
 const sk=new Float32Array(N);for(let i=0;i<N;i++){const r=D[i*4],g=D[i*4+1],b=D[i*4+2];sk[i]=r>140&&r-g>=20&&g>=b&&r-b>=26&&.299*r+.587*g+.114*b>135?1:0}/* skin-coloured pixels */
 /* soft line: dense points [x,y,sigma,alpha] splatted as gaussians, max-combined (no overlap ladders) */
 const soft=(m,pts)=>{for(const[x,y,sg,al]of pts){const R=Math.ceil(sg*2.6),x0=Math.max(0,Math.floor(x-R)),x1=Math.min(cw-1,Math.ceil(x+R)),y0=Math.max(0,Math.floor(y-R)),y1=Math.min(ch-1,Math.ceil(y+R));
   for(let yy=y0;yy<=y1;yy++)for(let xx=x0;xx<=x1;xx++){const d2=(xx-x)*(xx-x)+(yy-y)*(yy-y),v=al*Math.exp(-d2/(2*sg*sg)),i=yy*cw+xx;if(v>m[i])m[i]=v}}return m};
 const along=(P0,P1,st,fn)=>{const n=Math.max(2,Math.round(Math.hypot(P1[0]-P0[0],P1[1]-P0[1])/st)),o=[];for(let i=0;i<=n;i++){const t=i/n;o.push(fn(P0[0]+(P1[0]-P0[0])*t,P0[1]+(P1[1]-P0[1])*t,t))}return o};
 /* 1 blush: the cheek disc dragged down by water, softened; blotchy patches at nặng */
 {let m=new Float32Array(N);cheeks.forEach(([cx,cy])=>{const d=paint(g=>{const gr=g.createRadialGradient(cx,cy,0,cx,cy,rad);gr.addColorStop(0,"rgba(0,0,0,1)");gr.addColorStop(.5,"rgba(0,0,0,.7)");gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.fillRect(cx-rad,cy-rad,2*rad,2*rad)});add(m,d)});
  let sm=lv>=2?new Float32Array(N):smear(m,u*fx(F.blush.len),F.streak[lv],.0);/* vừa / nặng: NO pink run at all, only the diffuse flush below */{const g=F.blush.sgain[lv];for(let i=0;i<N;i++)sm[i]*=g;if(lv>=2)sm=blur(blur(sm,u*.05),u*.03)}/* the pink run: lighter and diffused (wide feather, no band edges) */const bl=fx(F.blush.blot);
  if(bl>0)for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=y*cw+x,n=vn(x,y,u*.2),t=cl3((n-.38)/.3,0,1);sm[i]=Math.max(sm[i],m[i]*bl*t*(.6+.4*vn(x+999,y,u*.5)))}
  const PC=F.pct,wa=(PC?PC.blush[lv]/1.55:fx(F.blush.wash))*lkLodMul(lod,'bl');/* pct = the owner's knob: the smudge's own pink-smear opacity (share) at vừa / nặng; the layer peaks at wash × 1.55 */
  if(wa>0){/* "spread blush" = the SAME soft radial bloom the makeup blush uses (toilMakeupSvg gradient: full at the centre, .55 at .35, 0 at the rim), only a little larger / lower / outward — no stripe, no edge */
   const wm=new Float32Array(N);cheeks.forEach(([cx,cy],ci)=>{const sd=ci?1:-1,wx=cx+sd*rad*.25,wy=cy+rad*.4,R=rad*1.55;add(wm,paint(g=>{const gr=g.createRadialGradient(wx,wy,0,wx,wy,R);gr.addColorStop(0,"rgba(0,0,0,1)");gr.addColorStop(.35,"rgba(0,0,0,.55)");gr.addColorStop(.7,"rgba(0,0,0,.14)");gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.fillRect(wx-R,wy-R,2*R,2*R)}))});
   const wb=blur(blur(wm,u*.05),u*.03);for(let i=0;i<N;i++)sm[i]=Math.max(sm[i],wb[i]*wa/Math.max(.01,fx(F.blush.a)))}
  layers.push([blur(blur(sm,u*.03),u*.012),cMa,fx(F.blush.a)*1.55])}
 /* 2 eyeshadow run from the lower lid */
 {const m=new Float32Array(N);eyes.forEach(([e,ix])=>{const L=[P[ix+6],P[ix+7],P[ix+8],P[ix+9],P[ix]];for(let k=0;k<4;k++)soft(m,along(L[k],L[k+1],u*.03,(x,y)=>[x,y+u*.05,u*.05,1]))});
  layers.push([blur(smear(m,u*fx(F.lid.len),F.streak[lv],.35),u*.014),cMat,fx(F.lid.a)*1.3])}
 /* 3 lipstick smeared past the line: a soft halo along the lower lip, pushed a little toward one corner, + a feathered drag from that corner that fades out; no hard shapes */
 const sm=fx(F.lip.sm);if(sm>0){const side=h1(3)<.5?-1:1,O=P.slice(0,12);let xl=1e9,xr=-1e9,cL,cR;O.forEach(p=>{if(p[0]<xl){xl=p[0];cL=p}if(p[0]>xr){xr=p[0];cR=p}});const cr=side<0?cL:cR;
  const low=O.filter(p=>p[1]>=lc[1]-u*.01).sort((a,b)=>a[0]-b[0]),m=new Float32Array(N);
  for(let i=0;i<low.length-1;i++)soft(m,along(low[i],low[i+1],u*.02,(x,y)=>[x+side*u*.035*sm,y+u*.055*sm,u*.065,.6]));
  soft(m,along(cr,[cr[0]+side*u*.27*sm,cr[1]+u*.16*sm],u*.015,(x,y,t)=>[x,y,u*(.07-.035*t),.65*(1-.85*t)]));
  layers.push([blur(m,u*.03),cSon,Math.min(.9,(F.pct?F.pct.lip[lv]:fx(F.lip.a))*1.7*lkLodMul(lod,'lip'))])}/* lip smear opacity: same knob family (pct.lip) */
 /* 4 lash-run: mascara / liner washed down the cheek from under each eye — thin, wavering, fading, grey-brown (vừa / nặng, or crying) */
 {let len=fx(F.tear.len),a=fx(F.tear.a)*lkLodMul(lod,'eye')*(F.tear.dark||1)*(1+(F.big.boost-1)*big),w=fx(F.tear.w),nn=fx(F.tear.n);if(why==="khoc"){len=Math.max(len,F.cry.len);a=Math.max(a,F.cry.a);w=Math.max(w,F.cry.w);nn=Math.max(nn,1)}
  if(len>0){const m=new Float32Array(N);const pr=why==='khoc'?0:F.tear.pair[lv],swp=h1(13)<.5?0:1;eyes.forEach(([e,ix,sd],ei)=>{const s0=P[ix+8];for(let k=0;k<nn;k++){const off=k?sd*u*.07*k:0,ln=u*(pr?pr[ei===swp?0:1]:len)*[1,.62,.38][k],sx=s0[0]+sd*u*.05+off,sy=s0[1]+u*.04,ph=h1(11+ei*5+k*3)*6,pts=[];
     const fn=F.tear.fine[lv];for(let i=0;i<=Math.round(ln/1.2);i++){const t=i*1.2/ln,wob=fn?(.05*Math.sin(t*4.2+ph)+.035*(vn(t*5+ph,ei*3+k,1)-.5)):.03*Math.sin(t*5.5+ph),x=sx+sd*u*(.09*t+wob),y=sy+ln*t,br=cl3((vn(t*(fn?7:9),ei*7+k*3,1.1)-(fn?.28:.25))*(fn?2.4:2.2),fn?.3:.35,1),al=Math.pow(1-t,fn?.8:.75)*(pr?Math.max(br,.8):br)*(k?.8:1),sg=fn?u*w*(.62-.38*t):u*w*(1.05-.5*t);pts.push([x,y,Math.max(.8,sg),al*(fn?.9:1)])}
     soft(m,pts)}
    /* ONE extra short run per face (nặng; BAL tear.extra): from the lash line beside the main run on the seeded eye, ~1/3 of its length, same width taper and the same strength (solid, no breaks, never fainter than the main run, so it can not read as a pale streak) */
    const X=F.tear.extra;if(X&&fx(X.n)>0&&why!=='khoc'&&ei===swp){const ln=u*len*X.len,sx=s0[0]+sd*u*(.05+X.off),sy=s0[1]+u*.04,ph=h1(41)*6,pts=[];
     for(let i=0;i<=Math.round(ln/1.2);i++){const t=i*1.2/ln,x=sx+sd*u*(.07*t+.02*Math.sin(t*4.2+ph)),y=sy+ln*t,al=Math.pow(1-t,.5);pts.push([x,y,Math.max(1,u*w*X.w*(.9-.5*t)),al])}
     soft(m,pts)}});
   layers.push([blur(m,u*(F.tear.fine[lv]?.022:.016)),lash,a*1.25,1])}}
 /* no hard edges: every mask fades to nothing before the canvas edge (the box is only a bit bigger than the effect) */
 const edge=new Float32Array(N);{const mx=cw*.08,my=ch*.1;for(let y=0;y<ch;y++){const ey=cl3(Math.min(y,ch-1-y)/my,0,1);for(let x=0;x<cw;x++){const ex=cl3(Math.min(x,cw-1-x)/mx,0,1);edge[y*cw+x]=ex*ex*(3-2*ex)*ey*ey*(3-2*ey)}}}
 /* the runs stay INSIDE THE FACE: a face oval built from the face points (outer eye corners at the eyes, the mouth at the lips, narrowing to the chin), inset ≈ 3 % of the face width and feathered —
    not the pixel skin mask (ears, neck and the jaw shadow are skin too). Same clip for the streaks, the wash and the lip drag; every level, NPC path included. */
 const mkFace=(ex,inset,fth)=>{const o=new Float32Array(N);const ey=(eA[1]+eB[1])/2,lipY=lc[1],chin=lc[1]+.62*u,xoL=Math.min(...P.slice(20,30).map(p=>p[0]),...P.slice(30,40).map(p=>p[0])),xoR=Math.max(...P.slice(20,30).map(p=>p[0]),...P.slice(30,40).map(p=>p[0]));
  const bound=(y)=>{/* [left, right] of the face oval at row y */const t1=cl3((y-ey)/(lipY-ey),0,1),t2=cl3((y-lipY)/(chin-lipY),0,1),eL=xoL-ex*u,eR=xoR+ex*u,cL=lc[0]-.2*u,cR=lc[0]+.2*u,mL=eL+(cL-eL)*.25,mR=eR+(cR-eR)*.25;
   const sm1=t=>t*t*(3-2*t);let L,R;if(y<=lipY){const t=sm1(t1);L=eL+(mL-eL)*t;R=eR+(mR-eR)*t}else{const t=Math.pow(t2,1.4);L=mL+(cL-mL)*t;R=mR+(cR-mR)*t}return[L+inset,R-inset]};
  for(let y=0;y<ch;y++){const[L,R]=bound(y),fy=cl3((chin-inset-y)/fth,0,1),fyy=fy*fy*(3-2*fy);
   for(let x=0;x<cw;x++){const d=cl3(Math.min(x-L,R-x)/fth,0,1);o[y*cw+x]=d*d*(3-2*d)*fyy}}return o};
 /* the runs stay INSIDE THE FACE: a face oval built from the face points (eye extents at the eyes, mouth, chin), inset ≈ 3 % of the face width, feathered ≈ 5-7 % (wash, pink run, lip drag);
    not the pixel skin mask (ears, neck, jaw shadow are skin too). The lash runs get a roomier copy of the same oval (the under-eye area of BOTH eyes must be inside). Every level, NPC path included. */
 const face=mkFace(.2,u*.06,u*.3),faceT=mkFace(.55,0,u*.12);
 const out=new Uint8ClampedArray(N*4);
 for(let i=0;i<N;i++){let A=0,R=0,G=0,B=0;const k=cl3(Lum(i)/Lref,.74,1.1);
  for(const[m,c,s,tf]of layers){const a=cl3(m[i]*s*(F.noclip?1:edge[i]*(tf?faceT[i]:face[i])),0,1);if(a<.004)continue;const oa=a+A*(1-a);R=(c[0]*k*a+R*A*(1-a))/oa;G=(c[1]*k*a+G*A*(1-a))/oa;B=(c[2]*k*a+B*A*(1-a))/oa;A=oa}
  out[i*4]=Math.min(255,R);out[i*4+1]=Math.min(255,G);out[i*4+2]=Math.min(255,B);out[i*4+3]=Math.round(A*255)}
 const oc=mkc();oc.getContext("2d").putImageData(new ImageData(out,cw,ch),0,0);return oc.toDataURL("image/png")}
window.lkSmuDraw=lkSmuDraw;
/* ---------- face-fx entries: pictures wait for Foreman C; chips + Sắc work now ---------- */
/* ink faces the other way when the scar-fit cheek (the cheek facing the viewer) lies RIGHT of the face centre: pick the mirrored fx-muc-N-m (same side rule as the scar; today every por/fig row is the viewer-left cheek) */
function lkMirror(file){try{const n=String(file||"").split("/").pop(),s=KIT_SCAR.fit&&KIT_SCAR.fit[n],v=KIT_VEIL.fit&&KIT_VEIL.fit[n];return !!(s&&v&&s[0]+s[2]/2>v[0]+v[2]/2+1)}catch(e){return false}}
/* the first layer (full square) is composited with the ellipse layers BELOW it: xor/exclude = the square minus every ellipse (R7: add/exclude were the wrong way round and the mask did nothing in the browser).
   The mask is opaque (removes the mark) up to the grown ellipse (pad) and only then fades out over the next 22 % (R7: the fade used to start inside the ellipse and left soot on the lash line / lip corner).
   CSS mask (square coordinates) that cuts the eye / mouth / nose keep-out out of a face-square mark; the square = 1.08 x the veil row wide, 1.165 x as tall, its top .3826 rowH above the row top (KIT_RASH.style) */
window.KIT_KEEPFIT={url:"img/keep-fit.json",fit:null,load:function(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.url).then(r=>r.ok?r.json():null).then(j=>{if(j)KIT_KEEPFIT.fit=j}).catch(()=>{})}catch(e){}}};try{KIT_KEEPFIT.load()}catch(e){}
/* the four keep-out ellipses [u,v,ru,rv] (veil-row units) of ONE picture: its keep-fit row, else the constants */
function lkKeepFor(file){const K=BAL.looks.keep,nm=String(file||"").split("/").pop(),r=KIT_KEEPFIT.fit&&KIT_KEEPFIT.fit[nm];if(!r)return[...K.eye,K.mouth,K.nose];
 const F=K.fit,q=x=>x/1000,ex=q(r[4])*F.eye[0]+F.eye[1],ey=q(r[5])*F.eye[2]+F.eye[3];
 return[[q(r[0]),q(r[1]),ex,ey],[q(r[2]),q(r[3]),ex,ey],[q(r[6]),q(r[7]),q(r[8])*F.mouth[0]+F.mouth[1],q(r[9])*F.mouth[2]+F.mouth[3]],[q(r[10]),q(r[11]),K.nose[2],K.nose[3]]]}
window.lkKeepFor=lkKeepFor;
function lkKeepCss(file){try{const K=BAL.looks.keep,E=lkKeepFor(file),gr="radial-gradient(ellipse closest-side,#000 82%,transparent 100%)";const im=[],sz=[],ps=[];
 im.push("linear-gradient(#000,#000)");sz.push("100% 100%");ps.push("0 0");
 for(const [u,v,ru,rv] of E){const s=(u+.04)/1.08,t=(v+.3826)/1.165,hw=ru*(K.pad||1)*1.22/1.08,hh=rv*(K.pad||1)*1.22/1.165,w=hw*200,h=hh*200,l=(s-hw)*100,tp=(t-hh)*100;im.push(gr);sz.push(w.toFixed(2)+"% "+h.toFixed(2)+"%");ps.push((l/(100-w)*100).toFixed(2)+"% "+(tp/(100-h)*100).toFixed(2)+"%")}
 const a=im.join(","),b=sz.join(","),c=ps.join(","),x=im.map((_,i)=>i?"exclude":"add").join(",").replace("add","add"),xw=im.map((_,i)=>i?"source-over":"xor").join(",");
 return `;-webkit-mask-image:${a}!important;mask-image:${a}!important;-webkit-mask-size:${b}!important;mask-size:${b}!important;-webkit-mask-position:${c}!important;mask-position:${c}!important;-webkit-mask-repeat:no-repeat!important;mask-repeat:no-repeat!important;-webkit-mask-composite:${xw}!important;mask-composite:${im.map((_,i)=>i?"add":"exclude").join(",")}!important`}catch(e){return""}}
window.lkKeepCss=lkKeepCss;
/* FACE CLIP: every mark layer (img.kpox / img.klk / img.kscar, incl. the code-drawn smudge) gets clip-path = the BAL.looks.face polygon mapped from the face-square into THAT layer's own box (position, rotation, flip, origin from its --f vars).
   Done once, in the last kitFxLayers wrap below, so stage, portrait, mirror and every avatar frame clip alike. A = picture width / height (por 384x506; stage figures ~384x900): only the small row rotation depends on it. */
/* per-picture face-fit rows (img/face-fit.json, outliers only, scan dev/test/look-fx-facefit.py): { "<por-/fig- file>": [dx,dy,sx,sy] } = the BAL.looks.face polygon scaled by sx,sy about (.5,.55) and moved by dx,dy (face-square units); no row = the polygon as it is */
window.KIT_FACEFIT={url:"img/face-fit.json",fit:null,load:function(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.url).then(r=>r.ok?r.json():null).then(j=>{if(j)KIT_FACEFIT.fit=j}).catch(()=>{})}catch(e){}}};try{KIT_FACEFIT.load()}catch(e){}
function lkFacePts(file,sty){try{const sq=lkSquareRect(file);if(!sq)return"";const g=k=>{const m=new RegExp("--f"+k+":\\s*(-?[\\d.]+)%").exec(sty);return m?+m[1]:null},L=g("left"),T=g("top"),W=g("width"),H=g("height");if(L==null||T==null||W==null||H==null)return"";
 const tf=/--ftf:\s*([^;]*)/.exec(sty),rot=tf&&/rotate\((-?[\d.]+)deg\)/.exec(tf[1]),fl=!!(tf&&/scaleX\(-1\)/.test(tf[1])),to=/--fto:\s*([\d.]+)%\s+([\d.]+)%/.exec(sty);
 const A=/^por-/.test(String(file).split("/").pop())?.759:.43,D=Math.PI/180;
 const e={l:L,t:T,w:W,h:H,r:(rot?+rot[1]:0)*D,ox:to?+to[1]/100:.5,oy:to?+to[2]/100:.5,f:fl},q={l:sq[0],t:sq[1],w:sq[2],h:sq[3],r:sq[4]*D,ox:.5,oy:KIT_RASH.RB,f:false};
 const toPic=(b,s,t)=>{if(b.f)s=2*b.ox-s;const dx=(s-b.ox)*b.w*A,dy=(t-b.oy)*b.h,c=Math.cos(b.r),n=Math.sin(b.r);return[(b.l+b.ox*b.w)*A+dx*c-dy*n,b.t+b.oy*b.h+dx*n+dy*c]};
 const toLoc=(b,X,Y)=>{X-=(b.l+b.ox*b.w)*A;Y-=b.t+b.oy*b.h;const c=Math.cos(b.r),n=Math.sin(b.r),dx=X*c+Y*n,dy=-X*n+Y*c;let s=dx/(b.w*A)+b.ox;if(b.f)s=2*b.ox-s;return[s,dy/b.h+b.oy]};
 const nm=String(file).split("/").pop(),ff=KIT_FACEFIT.fit&&KIT_FACEFIT.fit[nm],fx=ff?ff[0]:0,fy=ff?ff[1]:0,fsx=ff?ff[2]:1,fsy=ff?ff[3]:1,pts=BAL.looks.keep.face.map(([s0,t0])=>{const s=(s0-.5)*fsx+.5+fx,t=(t0-.55)*fsy+.55+fy,P=toPic(q,s,t),Q=toLoc(e,P[0],P[1]);return[Q[0]*100,Q[1]*100]});
 return{pts:pts,sx:BAL.looks.keep.feather/((W/100)*A)*100,sy:BAL.looks.keep.feather/(H/100)*100}}catch(err){return null}}
/* FEATHERED face clip (R9d: the hard clip-path cut the soft glow of the marks with a straight edge = a visible wedge / box): the face polygon as a BLURRED SVG mask (stdDeviation = BAL.looks.keep.feather of the picture height, equal in px on both layer axes) put on TOP of the mark's own keep-out mask list and intersected with it. The svg is padded (viewBox -50..150) so shapes past the layer box still feed the blur. Returns the whole new style string. */
function lkClipFor(file,sty){try{const g=lkFacePts(file,sty);if(!g)return sty;const P=g.pts.map(q=>q[0].toFixed(1)+","+q[1].toFixed(1)).join(" "),Pd=Math.max(50,Math.ceil(3*Math.max(g.sx,g.sy))),Vb=100+2*Pd;/* r11: pad >= 3 blur sigmas, so a SMALL layer (the moved ink box) is not faded by the blur running into the svg edge */
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(-Pd)+' '+(-Pd)+' '+Vb+' '+Vb+'" preserveAspectRatio="none"><defs><filter id="b" filterUnits="userSpaceOnUse" x="'+(-Pd)+'" y="'+(-Pd)+'" width="'+Vb+'" height="'+Vb+'"><feGaussianBlur stdDeviation="'+g.sx.toFixed(2)+' '+g.sy.toFixed(2)+'"/></filter></defs><polygon points="'+P+'" fill="#000" filter="url(#b)"/></svg>';
 const u="url('data:image/svg+xml,"+encodeURIComponent(svg).replace(/'/g,"%27")+"')",G=(re)=>{const m=re.exec(sty);return m?m[1]:null};
 const mi=G(/-webkit-mask-image:\s*([^;]*?)\s*!important/),ms=G(/-webkit-mask-size:\s*([^;]*?)\s*!important/),mp=G(/-webkit-mask-position:\s*([^;]*?)\s*!important/),mc=G(/(?:^|;)\s*mask-composite:\s*([^;]*?)\s*!important/),wc=G(/-webkit-mask-composite:\s*([^;]*?)\s*!important/);
 const o=sty.replace(/(?:^|;)\s*(?:-webkit-)?mask-(?:image|size|position|repeat|composite)\s*:[^;]*/g,"");
 const n=mi?mi.split(/,(?![^(]*\))/).length:0,rep=Array(n+1).fill("no-repeat").join(",");
 const I=mi?u+","+mi:u,S=mi?Vb+"% "+Vb+"%,"+ms:Vb+"% "+Vb+"%",Pp=mi?"50% 50%,"+mp:"50% 50%";
 return o+";-webkit-mask-image:"+I+"!important;mask-image:"+I+"!important;-webkit-mask-size:"+S+"!important;mask-size:"+S+"!important;-webkit-mask-position:"+Pp+"!important;mask-position:"+Pp+"!important;-webkit-mask-repeat:"+rep+"!important;mask-repeat:"+rep+"!important"+(mi?";-webkit-mask-composite:source-in,"+wc+"!important;mask-composite:intersect,"+mc+"!important":"")}catch(err){return sty}}
/* kscar layers: lv2 / lv3 use the ladder STEP 3 box (BAL.looks.keep.cheek3 of the veil row), then ALL levels get the stroke-level keep-out: the eye / nose / mouth ellipses (BAL.looks.keep, same pad + fade as lkKeepCss) mapped from the veil row into THIS layer's own box (position, rotation, flip), cut out with the same xor mask */
/* the keep-out mask (eye / nose / mouth ellipses of lkKeepFor, pad + fade as lkKeepCss) for a layer of ANY box: the ellipses are mapped from the veil row into THIS layer's own box (position, rotation, flip, origin from its --f vars); used by the cào strokes (lkScarFix) and the moved ink layer (lkInkBox) */
function lkKeepBox(file,o){try{const n=String(file).split("/").pop(),v=KIT_VEIL.fit&&KIT_VEIL.fit[n];if(!v)return"";
 const g=k=>{const m=new RegExp("--f"+k+":\\s*(-?[\\d.]+)%").exec(o);return m?+m[1]:null},L=g("left"),T=g("top"),W=g("width"),H=g("height");if(L==null||T==null||W==null||H==null)return"";
 const tf=/--ftf:\s*([^;]*)/.exec(o),rot=tf&&/rotate\((-?[\d.]+)deg\)/.exec(tf[1]),fl=!!(tf&&/scaleX\(-1\)/.test(tf[1])),to=/--fto:\s*([\d.]+)%\s+([\d.]+)%/.exec(o),A=/^por-/.test(n)?.759:.43,D=Math.PI/180;
 const e={l:L,t:T,w:W,h:H,r:(rot?+rot[1]:0)*D,ox:to?+to[1]/100:.5,oy:to?+to[2]/100:.5,f:fl},q={l:v[0],t:v[1],w:v[2],h:v[3],r:v[4]*D,ox:.5,oy:.5,f:false};
 const toPic=(b,s,t)=>{if(b.f)s=2*b.ox-s;const dx=(s-b.ox)*b.w*A,dy=(t-b.oy)*b.h,c=Math.cos(b.r),n=Math.sin(b.r);return[(b.l+b.ox*b.w)*A+dx*c-dy*n,b.t+b.oy*b.h+dx*n+dy*c]};
 const toLoc=(b,X,Y)=>{X-=(b.l+b.ox*b.w)*A;Y-=b.t+b.oy*b.h;const c=Math.cos(b.r),n=Math.sin(b.r),dx=X*c+Y*n,dy=-X*n+Y*c;let s=dx/(b.w*A)+b.ox;if(b.f)s=2*b.ox-s;return[s,dy/b.h+b.oy]};
 const K=BAL.looks.keep,pad=K.pad||1,WA=W*A,f=x=>x.toFixed(2);let el="";
 /* r13: the holes are drawn in ONE svg in the layer's own pixel-true units (x = W*A, y = H, both in % of the container height) and each ellipse is TURNED by (veil rotation - layer rotation), mirrored with the layer: a CSS radial-gradient is always axis-aligned in the layer box, so on a turned layer (the ink at rot -30/-35, the cào boxes) the eye hole lay tilted across the cheek and hid most of the stroke */
 for(const [u,w,ru,rv] of lkKeepFor(file)){const P=toPic(q,u,w),C=toLoc(e,P[0],P[1]),rx=ru*pad*1.22*v[2]*A,ry=rv*pad*1.22*v[3],ang=(e.f?-1:1)*(q.r-e.r)/D;
  el+='<ellipse cx="'+f(C[0]*WA)+'" cy="'+f(C[1]*H)+'" rx="'+f(rx)+'" ry="'+f(ry)+'" transform="rotate('+ang.toFixed(1)+' '+f(C[0]*WA)+' '+f(C[1]*H)+')" fill="url(#g)"/>'}
 const B=4*Math.max(WA,H),svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+f(WA)+' '+f(H)+'" preserveAspectRatio="none"><defs><radialGradient id="g"><stop offset=".82" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient><mask id="m" maskUnits="userSpaceOnUse" x="'+f(-B)+'" y="'+f(-B)+'" width="'+f(2*B+WA)+'" height="'+f(2*B+H)+'"><rect x="'+f(-B)+'" y="'+f(-B)+'" width="'+f(2*B+WA)+'" height="'+f(2*B+H)+'" fill="#fff"/>'+el+'</mask></defs><rect x="'+f(-B)+'" y="'+f(-B)+'" width="'+f(2*B+WA)+'" height="'+f(2*B+H)+'" fill="#000" mask="url(#m)"/></svg>';
 const a="url('data:image/svg+xml,"+encodeURIComponent(svg).replace(/'/g,"%27")+"')";
 return `;-webkit-mask-image:${a}!important;mask-image:${a}!important;-webkit-mask-size:100% 100%!important;mask-size:100% 100%!important;-webkit-mask-position:0 0!important;mask-position:0 0!important;-webkit-mask-repeat:no-repeat!important;mask-repeat:no-repeat!important;-webkit-mask-composite:source-over!important;mask-composite:add!important`}catch(e){return""}}
window.lkKeepBox=lkKeepBox;
function lkScarFix(file,sty,sev){try{const n=String(file).split("/").pop(),v=KIT_VEIL.fit&&KIT_VEIL.fit[n];if(!v)return sty;let o=sty;
 {const c=BAL.looks.keep.cheek3,r=(x,y)=>x+";"+y;const L=v[0]+c[0]*v[2],T=v[1]+c[1]*v[3],W=c[2]*v[2],H=c[3]*v[3],R=v[4]+c[4];
  o=o.replace(/--fleft:[^;]*/,"--fleft:"+L.toFixed(2)+"%").replace(/--ftop:[^;]*/,"--ftop:"+T.toFixed(2)+"%").replace(/--fwidth:[^;]*/,"--fwidth:"+W.toFixed(2)+"%").replace(/--fheight:[^;]*/,"--fheight:"+H.toFixed(2)+"%").replace(/--ftf:\s*rotate\(-?[\d.]+deg\)/,"--ftf:rotate("+R.toFixed(1)+"deg)")}
 return o+lkKeepBox(file,o)}catch(e){return sty}}
window.lkScarFix=lkScarFix;
function lkFaceClipAll(h,file){if(!h||!file)return h;return h.replace(/<img class="((?:kpox|klk|kscar|kveil2)[ "][^>]*?)style="([^"]*)"/g,(m,a,sty)=>{const sc=/^kscar[ "]/.test(a)?/scar-(\d)\.png/.exec(a):null;const o=sc?lkScarFix(file,sty,+sc[1]):sty;return m.slice(0,m.length-sty.length-1)+lkClipFor(file,o)+'"'})}
window.lkFaceClipAll=lkFaceClipAll;window.lkClipFor=lkClipFor;
/* INK placement (BAL.looks.keep.ink {at:[a,b] eye-size units below/outside the eye, k: one number or per level [k1,k2,k3] (lv3 = longest stroke, kept smaller so it fits the cheek), rot deg, an head points, box main stroke}; per-picture override = keep-fit row items 13-16: a, b x1000, k scale x1000, rot x10 deg): the face square moved / scaled so the art's head point an[lv-1] lands below + outside the viewer-side eye of this picture (mir = the -m art, the other eye); "" = no keep-fit row (keep the plain square) */
function lkInkBox(file,lv,mir){try{const nm=String(file||"").split("/").pop();if(!(KIT_KEEPFIT.fit&&KIT_KEEPFIT.fit[nm]))return"";const sq=lkSquareRect(file);if(!sq)return"";
 const I=BAL.looks.keep.ink,R=KIT_KEEPFIT.fit[nm],at0=R.length>=14?[R[12]/1000,R[13]/1000]:I.at,kk=(Array.isArray(I.k)?I.k[cl(lv|0,1,3)-1]:I.k)*(R.length>=15?R[14]/1000:1),ro=R.length>=16?R[15]/10:(I.rot||0),e=lkKeepFor(file)[mir?1:0],an=I.an[cl(lv|0,1,3)-1],as=mir?1-an[0]:an[0],at=an[1];
 const se=(e[0]+.04)/1.08,te=(e[1]+.3826)/1.165,ex=e[2]/1.08,ey=e[3]/1.165,Ts=mir?se+at0[0]*ex:se-at0[0]*ex,Tt=te+at0[1]*ey;
 const A=/^por-/.test(nm)?.759:.43,r=sq[4]*Math.PI/180,c=Math.cos(r),n=Math.sin(r),oy=KIT_RASH.RB,dx=(Ts-.5)*sq[2]*A,dy=(Tt-oy)*sq[3],X=(sq[0]+.5*sq[2])*A+dx*c-dy*n,Y=sq[1]+oy*sq[3]+dx*n+dy*c;
 const W=sq[2]*kk,H=sq[3]*kk,L=X/A-as*W,T=Y-at*H,B=I.box,ins=mir?[B[1],B[0],1-B[3],1-B[2]]:[B[1],1-B[2],1-B[3],B[0]];
 return{st:`left:${L.toFixed(2)}%;top:${T.toFixed(2)}%;width:${W.toFixed(2)}%;height:${H.toFixed(2)}%;transform:rotate(${(sq[4]+(mir?-1:1)*ro).toFixed(1)}deg);transform-origin:${(as*100).toFixed(1)}% ${(at*100).toFixed(1)}%`,clip:`;clip-path:inset(${ins.map(x=>(x*100).toFixed(1)+"%").join(" ")})`}}catch(e){return""}}
window.lkInkBox=lkInkBox;
function lkFaceImg(cls,f,st,file){if(!st)return"";const mi=/^fx-muc-(\d)\.png$/.exec(f),mir=!!(mi&&lkMirror(file));if(mir)f=f.replace(".png","-m.png");const m=/^fx-(muc|muoi)-/.exec(f);if(!lkArt(f))return"";
 const ib=mi?lkInkBox(file,+mi[1],mir):"";if(ib){const v=kitFxVars(ib.st);return `<img class="${cls}" src="img/${f}" alt="" aria-hidden="true" style="${v}${kitToneCss("muc",null)}${lkKeepBox(file,v)}${ib.clip}" onerror="this.remove()">`}
 return `<img class="${cls}" src="img/${f}" alt="" aria-hidden="true" style="${kitFxVars(st)}${m?kitToneCss(m[1],null):""}${lkKeepCss(file)}" onerror="this.remove()">`}
/* the same face-square as KIT_RASH.style as a [l,t,w,h,deg] rect */
function lkSquareRect(file){try{const n=String(file||"").split("/").pop(),r=KIT_VEIL.fit&&KIT_VEIL.fit[n];if(!r)return null;const W=r[2]*KIT_RASH.WX,H=W*(r[3]*480)/(r[2]*445),bandY=r[1]+KIT_VEIL.B0*r[3];return[r[0]+r[2]/2-W/2,bandY-KIT_RASH.RB*H,W,H,r[4]]}catch(e){return null}}
function lkSquare(file){try{return KIT_RASH.style(file)}catch(e){return""}}
const lkChips=L=>L.map(([id,x])=>lkWord(id,x.lv)).join(" · ");
const lkSac=L=>L.reduce((s,[id,x])=>s+Math.round((lkB().cat[id].sac||0)*x.lv),0);
KIT_FACEFX.add({id:"pox",z:22,ready:true,
 state:p=>{const i=fxIll(p);return i&&(i.k==="thuydau"||i.k==="daumua")?{k:i.k,st:cl(i.st|0,1,3)}:null},
 seen:(p,st)=>p===S||fxIllSeen(p)&&fxSeen(p),sac:(p,st)=>(lkB().pox.sac[st.k]||[])[st.st]||0,chip:()=>null,
 html:(p,file,st)=>lkFaceImg("kpox",`fx-pox-${st.k}-${st.st}.png`,lkSquare(file),file)});
KIT_FACEFX.add({id:"lkface",z:24,ready:true,state:p=>{const L=lkItems(p,LK_FACE);return L.length?{L}:null},seen:p=>fxSeen(p),sac:(p,z)=>lkSac(z.L),chip:(p,z)=>[lkChips(z.L),"hot"],
 html:(p,file,z)=>{const sq=lkSquare(file);return z.L.map(([id,x])=>id==="smu"?lkSmuImg(p,file,x):lkFaceImg("klk klk-"+id,`fx-${id}-${x.lv}.png`,sq,file)).join("")}});
KIT_FACEFX.add({id:"lkhair",z:27,ready:true,state:p=>{const L=lkItems(p,LK_HAIR);return L.length?{L}:null},seen:p=>fxSeen(p),sac:(p,z)=>lkSac(z.L),chip:(p,z)=>[lkChips(z.L),"hot"],html:()=>""});
KIT_FACEFX.add({id:"lkcloth",z:80,ready:true,state:p=>{const L=lkItems(p,LK_CLOTH);return L.length?{L}:null},seen:p=>fxSeen(p),sac:(p,z)=>lkSac(z.L),chip:(p,z)=>[lkChips(z.L),"hot"],html:()=>""});
for(const k in LK_ACT)KIT_FACEFX.deny[k]={emp:1,thaihau:1};
/* ---------- LAYER LAW: one last wrap — every makeup tag under every mark ---------- */
(function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){let h=f0.apply(this,arguments);
 if(!h)return h;h=lkFaceClipAll(h,file);if(h.indexOf("kmkl")<0)return h;const M=[];const rest=h.replace(/<img class="kmkl[^>]*>/g,m=>{M.push(m);return""});return M.join("")+rest}})();
/* co-op: marks the friend's seat put on HER entry arrive in the act's res message (jcoopworld resApply) → merged into her own bags (higher level wins) */
function lkMergeIn(p,key,bag){if(!p||!bag||!bag.it)return;const part=key==="stain"?"cloth":"face";const T=lkBag(p,part);
 for(const id in bag.it){const n=bag.it[id],c=lkB().cat[id];if(!c||!n||!(n.lv>0))continue;const dst=c.part==="cloth"?lkBag(p,"cloth"):T;const o=dst.it[id];if(!o||o.lv<n.lv)dst.it[id]=Object.assign({},n,{at:lkNow()})}
 try{if(p===S&&window.COOPW&&COOPW.on&&typeof sendPos==="function")sendPos()}catch(e){}}
window.lkMergeIn=lkMergeIn;window.lkGive=lkGive;window.lkItem=lkItem;window.lkOutdoor=lkOutdoor;window.lkSmudge=lkSmudge;window.lkStain=lkStain;window.lkInk=lkInk;window.lkCry=lkCry;
window.lkSmuOf=lkSmuOf;window.lkInkOf=lkInkOf;window.lkStainOf=lkStainOf;window.lkPoxScar=lkPoxScar;window.LK_ACT=LK_ACT;
