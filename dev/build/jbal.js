/* ================= BALANCE KNOBS (measured with the sensible / random bots; see the report) ================= */
const BAL={oanLv:[5,20,45,75],/* oán word ladder (VANPHONG): <5 Không oán · <20 Chút oán · <45 Oán · <75 Oán sâu · else Oán hận */outQ:85,hz:3.2,conc:.25,later:6,hhTh:55,birthAdd:4,
 /* ONE SOURCE for every promotion threshold the player sees (checks in promoReqP/candOK and every text read these) */
 hhThNoSon:80,hhThNoSonHieu:70,hhDuc:50,hhDucHeir:40,qBlockHh:-40,qBlockTh:50,hiOppHh:-30,hiOppTh:30,hiOppFac:180,
 /* handmade works (j83), by material 0 thường / 1 tốt / 2 quý: matQ = phần added to the score; cap = highest tier it can reach (only quý makes a
    Tuyệt phẩm); val = gift value added (Sủng / Thái hậu / thiện cảm); sell = share of the material's silver paid back when sold (1: a sale never loses the material's price); tinh = extra
    chân tình for a quý work given to a sincere person. Value check: dev/test/paid-tiers.js */
 wk:{matQ:[0,2,4],cap:[2,2,3],val:[0,1,2],sell:[0,1,1],tinh:[0,0,1]},
 /* paid lessons (owner 14:50Z: paying must be worth it): a teacher always gives at least self-study + tchMin */
 tchMin:1,
 /* event-choice hints (KIT 28.6): Tâm cơ below hintMid → a vague hint; from hintMid → plain; from hintSharp (or Tai mắt ≥ hintMat) → names who reacts */
 hintMid:25,hintSharp:45,hintMat:3,
 /* TRUNG Y (jty, sếp 15/11 09:15Z): the Y phục slot is empty → she is in her inner robe. ONE source for every number of that rule */
 ty:{out:2,crowd:3,crowdN:3,royal:6,royalDuc:1,meet:1,reissueWk:2,   /* Danh lost: out of her palace / extra with ≥crowdN people / extra (tai tiếng) before the Emperor or Thái hậu (+ Đức); a visitor at home */
  robNight:12,robLonely:8,robPlot:45,robThug:3,robDanh:3,robWalk:2,omenWk:2,plotCh:12,plotRel:-30, /* robbery: % parts, Danh lost, omen lasts N weeks, weekly % an enemy plans it, relation that makes an enemy */
  npcOut:2,npcRob:2}};                                                /* NPC: Danh per week seen out in trung y; weekly % an NPC is robbed (night walks) */
/* what the Hoàng hậu seat asks of p (the same numbers the checks use) */
function hhNeed(p){p=p||S;const sn=sonsOf(p).length>0,hieu=typeof has==="function"&&has("hieuthao");const heir=!!(S.heir&&S.heir.k&&S.heir.k.alive&&S.heir.v===(p===S?null:p));
 return{sons:sn,th:sn?BAL.hhTh:(hieu?BAL.hhThNoSonHieu:BAL.hhThNoSon),duc:heir?BAL.hhDucHeir:BAL.hhDuc,heir}}
/* an empty Hoàng hậu seat: the Thái hậu may bring in a girl of a great house instead of holding a contest (same for every candidate) */
(function(){const c0=contestOpen;contestOpen=function(r){if(r===7&&!ct()&&!queenP()&&S.outQv!==S.vacSince&&consorts().some(p=>candOK(p,7))&&(S.outQv=S.vacSince,true)&&roomFor("consort")&&roll(BAL.outQ)){const n=newRival(7,true);Object.assign(n,drawFace());n.rank=6;n.queen=true;n.dad=80;rivals.unshift(n);S.vacSince=null;
  const t=`<b>Thánh chỉ: Thái hậu chọn ${n.name}, con gái danh môn, vào cung lập làm Hoàng hậu.</b> Ghế trống không mở tranh. `;log(t);return t}return c0.apply(this,arguments)}})();
/* fewer births per life: conception (after the ×0.7) scaled; a woman who has borne before is a little safer in labour (everyone alike) */
(function(){const c0=conceiveCh;conceiveCh=function(p){return Math.round(c0.apply(this,arguments)*BAL.conc)}})();
(function(){const b0=birthRisk;birthRisk=function(p){const r=b0.apply(this,arguments);const n=p===S?(S.kids||[]).length:(p.kids||[]).length;if(n>0&&p===S&&S.birthWhy)S.birthWhy=S.birthWhy.concat([]);return cl(r-(n>0?BAL.later:0)+BAL.birthAdd,1.5,60)}})();
/* the Hoàng hậu seat asks more: the Thái hậu's favour 55+ to stand as a candidate (same for every candidate) */
/* (since rules-one-source: promoReqP (j8) and candOK (j34) read BAL.hhTh / hhNeed() directly; no second check here) */
/* every hidden meeting widens the circle that might know: exposure risk grows with the number of trysts (same rule for everyone) */
(function(){const l0=lộRisk;lộRisk=function(k){const n=(S.men||[]).reduce((a,m)=>a+(m.trysts||0),0);return cl(l0.apply(this,arguments)+Math.min(30,n*4),6,92)}})();
/* NAMED PALACE STAFF (owner 16/11, review/elder-staff, jstaff.js): 5 named servants, each with 3–4 duties. 3 women here, real servants in a
   master's household (staff entries: role maid, rank by SRK, capped by srkMax / capOf); the 2 eunuchs are the existing S.court.tq
   (Tổng quản: truyền chỉ, ngự tiền, gọi thị tẩm) and S.court.ksp (Kính sự phòng: sổ thị tẩm, sổ nguyệt tín, mua sắm Nội vụ phủ),
   both of the Emperor's household. Everyone else stays nameless. Change the numbers / names here.
   post: id · title · palace · master ("th" Thái hậu; "hh" Hoàng hậu, kept by Thái hậu while the seat is empty) · rk (SRK maid rank:
   4 ma ma, 3 cô cô) · age range at the start · names (the first holds the post at the start; successors take the next) · call = how
   the palace addresses her · tr (STR temperament key) · duties (shown on her card) */
BAL.staff={retire:[63,68],gift:20,giftAf:10,talk:2,succAge:[46,54],
 posts:[
  {id:"gt",title:"Giáo tập ma ma",palace:"Trữ Tú cung",master:"th",tr:"trung",rk:4,age:[50,55],
   names:[["Tống Quế Chi","Tống ma ma"],["Lạc Ngọc Dung","Lạc ma ma"],["Ôn Tú Hà","Ôn ma ma"]],
   duties:["dạy tú nữ mới vào cung","giữ lễ nghi, cung quy","coi việc tuyển tú","dặn dò người mới"]},
  {id:"tn",title:"Chưởng sự cô cô",palace:"Đức Thọ cung",master:"th",tr:"lanh",rk:3,age:[44,49],
   names:[["Hà Tú Dung","Hà cô cô"],["Mạnh Bích Liên","Mạnh cô cô"],["Kiều Thanh Đào","Kiều cô cô"]],
   duties:["truyền ý chỉ của Thái hậu","giữ cung quy","thi hành hình phạt","coi Tân Giả khố"]},
  {id:"kn",title:"Quản sự ma ma",palace:"Càn Ninh cung",master:"hh",tr:"chuyen",rk:4,age:[54,60],
   names:[["Diệp Thanh Hòa","Diệp ma ma"],["Phùng Thục Trinh","Phùng ma ma"],["Lam Ngọc Hoàn","Lam ma ma"]],
   duties:["chia cung nữ về các cung","phát lệ bạc","coi Thượng cung cục","bẩm sổ tháng của lục cung"]}]};
