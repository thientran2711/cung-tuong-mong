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
   Pictures: Foreman C (Magnific gpt-2-6, OD:L1196). A slot draws NOTHING until its file is in LOOKS_ART; hair / clothes slots also wait for the body-fit
   KIT REQUEST. LAYER LAW: the last kitFxLayers wrap puts every makeup tag (img.kmkl) under every mark. ================= */
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
 /* the level of a kind when C-AG gives none (lv 0); windUp = chance a windy spell is gió lớn (vừa) */
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
 pox:{thuydau:{sea:["Xuân"],cont:1,die:0},sac:{thuydau:[0,3,5,8],daumua:[0,6,10,14]},spread:35,spreadWk:3,scar:[0,1,1,2]}}});
window.LOOKS_ART={};
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
 let lv=c.lv|0;if(!lv){lv=lkB().wxLv[k]||0;if(k==="wind"&&roll(lkB().windUp))lv=2}if(k==="sun"&&c.f!==2)lv=0;return{k,lv:cl(lv,0,3)}}catch(e){return null}}
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
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{const b=bandOf(danger(v,t));
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
  tsOpt({n:"Đứng yên",odds:null,kem:["dính trọn"],go:()=>{const r=fin(sev);if(r){log(r);pushModal({t:D.n,who,h:`<p>${r}</p>`})}}})]});
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
/* ---------- face-fx entries: pictures wait for Foreman C; chips + Sắc work now ---------- */
function lkFaceImg(cls,f,st){return st&&lkArt(f)?`<img class="${cls}" src="img/${f}" alt="" aria-hidden="true" style="${kitFxVars(st)}" onerror="this.remove()">`:""}
function lkSquare(file){try{return KIT_RASH.style(file)}catch(e){return""}}
const lkChips=L=>L.map(([id,x])=>lkWord(id,x.lv)).join(" · ");
const lkSac=L=>L.reduce((s,[id,x])=>s+Math.round((lkB().cat[id].sac||0)*x.lv),0);
KIT_FACEFX.add({id:"pox",z:22,ready:true,
 state:p=>{const i=fxIll(p);return i&&(i.k==="thuydau"||i.k==="daumua")?{k:i.k,st:cl(i.st|0,1,3)}:null},
 seen:(p,st)=>p===S||fxIllSeen(p)&&fxSeen(p),sac:(p,st)=>(lkB().pox.sac[st.k]||[])[st.st]||0,chip:()=>null,
 html:(p,file,st)=>lkFaceImg("kpox",`fx-pox-${st.k}-${st.st}.png`,lkSquare(file))});
KIT_FACEFX.add({id:"lkface",z:24,ready:true,state:p=>{const L=lkItems(p,LK_FACE);return L.length?{L}:null},seen:p=>fxSeen(p),sac:(p,z)=>lkSac(z.L),chip:(p,z)=>[lkChips(z.L),"hot"],
 html:(p,file,z)=>{const sq=lkSquare(file);return z.L.map(([id,x])=>lkFaceImg("klk klk-"+id,`fx-${id}-${x.lv}.png`,sq)).join("")}});
KIT_FACEFX.add({id:"lkhair",z:27,ready:true,state:p=>{const L=lkItems(p,LK_HAIR);return L.length?{L}:null},seen:p=>fxSeen(p),sac:(p,z)=>lkSac(z.L),chip:(p,z)=>[lkChips(z.L),"hot"],html:()=>""});
KIT_FACEFX.add({id:"lkcloth",z:80,ready:true,state:p=>{const L=lkItems(p,LK_CLOTH);return L.length?{L}:null},seen:p=>fxSeen(p),sac:(p,z)=>lkSac(z.L),chip:(p,z)=>[lkChips(z.L),"hot"],html:()=>""});
for(const k in LK_ACT)KIT_FACEFX.deny[k]={emp:1,thaihau:1};
/* ---------- LAYER LAW: one last wrap — every makeup tag under every mark ---------- */
(function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){const h=f0.apply(this,arguments);
 if(!h||h.indexOf("kmkl")<0)return h;const M=[];const rest=h.replace(/<img class="kmkl[^>]*>/g,m=>{M.push(m);return""});return M.join("")+rest}})();
/* co-op: marks the friend's seat put on HER entry arrive in the act's res message (jcoopworld resApply) → merged into her own bags (higher level wins) */
function lkMergeIn(p,key,bag){if(!p||!bag||!bag.it)return;const part=key==="stain"?"cloth":"face";const T=lkBag(p,part);
 for(const id in bag.it){const n=bag.it[id],c=lkB().cat[id];if(!c||!n||!(n.lv>0))continue;const dst=c.part==="cloth"?lkBag(p,"cloth"):T;const o=dst.it[id];if(!o||o.lv<n.lv)dst.it[id]=Object.assign({},n,{at:lkNow()})}
 try{if(p===S&&window.COOPW&&COOPW.on&&typeof sendPos==="function")sendPos()}catch(e){}}
window.lkMergeIn=lkMergeIn;window.lkGive=lkGive;window.lkItem=lkItem;window.lkOutdoor=lkOutdoor;window.lkSmudge=lkSmudge;window.lkStain=lkStain;window.lkInk=lkInk;window.lkCry=lkCry;
window.lkSmuOf=lkSmuOf;window.lkInkOf=lkInkOf;window.lkStainOf=lkStainOf;window.lkPoxScar=lkPoxScar;window.LK_ACT=LK_ACT;
