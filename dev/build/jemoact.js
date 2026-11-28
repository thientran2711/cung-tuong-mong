/* ================= jemoact: HÀNH ĐỘNG THEO CẢM XÚC — emotion acts, extreme mood, forced outbursts (review/emotion-acts) =================
   Owner, verbatim in dev/OWNER_DECISIONS.md (docs branch): "16/11 13:08Z" (emotion acts + extreme-mood consequences, player AND every NPC,
   men and women), "16/11 13:25Z" part B (FORCED events she does not choose; reaction fits PERSONALITY + CURRENT MOOD; scolding any maid
   allowed, beating has consequences; a maid of a HIGHER-rank mistress → that mistress comes to hỏi tội as a daily event), "16/11 13:50Z,
   s17 chat" (3) (outbursts are NOT punishments; every emotion can burst out, positive ones too; no damage-control choice after the fact:
   the way to avoid them is to keep the emotion under the threshold early).
   Reuses: jmood (her mood bar S.mood.v, bands, mbAdd), jemo (p.emo for everyone, EMO, emoGet), j28/jtrong personality (traitsOf / PERS,
   her nết S.pTr), j13 illness (catchIll: Tâm bệnh / Chứng mất ngủ), j8 punish / ap / relAdd / oanAdd, j1 ghenAll, kit act cards (deck
   cards rendered by cardH, the same object shape as j76 standing cards) and the kit event frame (Q items: ev choice / hideOut "Tiếp tục").
   No new UI part. Numbers: BAL.ea (below). Off switch for measuring: window.__eaOff=1. Counters: window.EA_N.
   1. EMOTION ACT CARDS (hers): only in the matching mood band (mbBand i ≥ 1 → vui; i ≤ −1 by the low flavour: gian → giận, so → căng
      thẳng, else buồn), at most 2: giận Đập đồ / Mắng cung nữ · buồn Khóc thầm / Viết thư nhà · vui Đàn hát tự thưởng · căng thẳng Thắp
      hương cầu an. Each has a gain AND a loss. Mắng cung nữ lets her choose the maid (kit event choice, one option per maid).
      NPCs (consorts, servants, the Emperor, Thái hậu, men, officials, children) do the same acts in the life sim when their feeling sits
      when their signed mood bar (moodBar) is past BAL.ea.npc.bar.act on the side of their dominant feeling, by their personality; gains / losses land on them; seen ones go to the news.
   2. EXTREME MOOD held ≥ BAL.ea.ext.wk tuần: buồn → Tâm bệnh · giận → lỡ lời (Danh −) · vui → tự mãn (kẻ ganh ghen hơn) · căng thẳng →
      Chứng mất ngủ. Hers: mood bar at band ±2 (|v| ≥ BAL.mood.band[3]); NPCs: moodBar past BAL.ea.npc.bar.ext on the dominant feeling's side, same group, every tuần.
   3. FORCED OUTBURSTS: past the outburst line (hers and NPCs alike: the signed bar past out.v AND the matching dominant feeling, owner OD 17/11 ~18:33Z (1)) a weekly chance (by temper) that the feeling bursts
      out; the reaction is drawn from the reactions her / his PERSONALITY allows (timid: never phạm thượng, never beats anyone; hot-
      tempered: may smash, scold, beat, phạm thượng) weighted by temper; positive ones too (a generous person in high joy hands out
      silver). Hers shows as a kit event frame with the options her temper allows (TEMPER-OUTBURST, OD 25/11 ~05:45Z (1): up to
      BAL.ea.pick.n, equal value, no hold-back; she must pick one; an NPC consort picks from the same list). A maid of a palace whose mistress
      outranks the doer → that mistress comes to hỏi tội the next tuần (a daily event with real choices, each with gain and loss); two-way:
      a lower-rank consort who beats HER maid → she may go hỏi tội.
   Co-op: S.ea is a personal key of S; NPC (world) changes only on the host (COOPW.seat "a") or single player. ====================== */
Object.assign(BAL,{ea:{
 /* (1) her cards. mood = tâm trạng points the act moves (vent toward calm; vui: the joy settles), emo = points off the matching feeling seal,
    k = khắc; dapdo bạc + Danh; mang lòng of the scolded maid; khoc Sức; thu bạc (a eunuch carries the letter) + (gain) her family's answer
    lifts her ánh a little more; dan Tài + and the rivals hear (Ghen; an NPC's playing: oan Oán of every other consort); huong bạc and Đức (a pious deed). */
 card:{dapdo:{g:"gian",k:1,mood:14,emo:20,bac:8,danh:1},mang:{g:"gian",k:1,mood:10,emo:15,loy:6},
  khoc:{g:"buon",k:1,mood:10,emo:15,suc:5},thu:{g:"buon",k:1,mood:13,emo:15,bac:5},
  dan:{g:"vui",k:1,mood:-6,tai:1,ghen:2,oan:1},huong:{g:"so",k:1,mood:12,emo:15,bac:6,duc:1}},
 /* (2) extreme mood: wk tuần in a row, then cd tuần before the same person can be hit again. danh = lỡ lời Danh −; ghen = jealousy of
    every rival (ghenAll) at once + smugWk tuần of extra jealousy (×smugK on every ghenAll aimed at her); NPC: oan = Oán of every other
    consort toward the smug one, danh the same Danh loss; servants lose loy Lòng toward their master (a sulky / boastful servant). */
 ext:{wk:3,cd:8,danh:4,ghen:8,smugWk:4,smugK:1.5,oan:6,loy:5},
 /* (3) her outbursts: |mood v| ≥ v (inside band ±1 deep end and band ±2; measured r1: at 60 = 0.4 a 100 tuần, too rare to be felt),
    chance ch % a tuần × temper (hot / even / timid), at most one a tuần, then cd tuần of quiet. phamW = weight of Phạm thượng among a
    hot temper's angry reactions (never while cấm túc: no thỉnh an; r2 at .6: 5 in one hot life, each a cấm túc). */
 out:{v:45,ch:30,cd:2,t:{hot:1.6,even:1,timid:.6},phamW:.35},
 /* NPCs (MOODKNOW step 0, owner OD 17/11 ~18:33Z (1)): the signed bar (moodBar = Σ BAL.mood.emo × strength of their causes; an NPC has no act / need
    pushes, so its bar runs smaller than hers) past bar.act / bar.out / bar.ext on the side of the matching dominant feeling (kept at the old
    act / outburst / extreme rates, measure dev/measure/ea-npc-rate.js): chance actCh % a tuần, outburst outCh % × temper;
    meWk = most events a tuần that other people's outbursts bring to her (the rest: log lines). */
 npc:{actCh:25,outCh:20,meWk:1,bar:{act:11,out:25,ext:28}},
 /* what each reaction does (doer = her or the NPC). vent = mood points toward calm (hers) / feeling points off (NPC); bac, suc, danh, duc,
    loy (Lòng of the maid / every servant of the palace), oan (Oán of the wronged), rel (thiện cảm), ghen (ghenAll), aff (two friends' thiện cảm). */
/* TEMPER-OUTBURST (OD 25/11 ~05:45Z (1) + ~08:05Z, laws 2 + 3): a consort's reactions are re-tuned to EQUAL VALUE — every one costs net ≈ BAL.ea.pick.net
    in bạc (BAL.pm.val rates; dev/measure/temper-equal.js keeps each within BAL.pm.eqTol); the gain of each is the vent (BAL.ea.pick.vent, the same for all)
    plus its own line. New rows: nuot (Nuốt giận chép kinh: Sức −, Đức +), huong (Thắp hương tụng kinh: bạc −, Đức +), trang (Trang điểm chờ ngự giá:
    bạc −, Sủng +), kexau (Kể xấu tình địch: the rival's Danh −rd, her Oán +oan, Danh −). pham: cấm túc only on a roll of pick.phamP (no longer sure). */
 fx:{dapdo:{vent:20,bac:6,danh:1},mang:{vent:15,loy:4},danh:{vent:20,loy:5,duc:0,danh:1},khac:{vent:15,oan:10,hiOan:15,punRk:2},pham:{vent:20,rel:2,danh:1},
  khoc:{vent:12,suc:10},boan:{vent:10,suc:12},thu:{vent:15,bac:10},matngu:{vent:8,suc:10},soat:{vent:12,loy:1},cau:{vent:15,bac:10},
  cham:{vent:12,rel:3,oan:3,danh:0},tui:{vent:10,suc:10},thuong:{vent:10,bac:20,loy:1},khoe:{vent:10,danh:2,ghen:6},tiec:{vent:10,bac:25,aff:4,n:2},hat:{vent:8,suc:15,tai:1},
  nuot:{vent:12,suc:13,duc:1},huong:{vent:12,bac:13,duc:1},trang:{vent:10,bac:14,sung:1},tho:{vent:8,suc:15,danh:1},theu:{vent:8,suc:14,sung:1},kexau:{vent:12,rd:1,oan:10,danh:1},
  /* the Emperor / Thái hậu: bestow = bạc to every consort (her too); rage = Sủng of the one he is angry with; scold = Thái hậu regard (th) / an NPC's Danh;
     khac: hiOan = Oán of a higher-rank mistress whose maid an NPC scolded, punRk = ranks above the doer at which she has the doer punished */
  ban:{vent:15,bac:5},noi:{vent:20,sung:4},quo:{vent:15,th:3,danh:1},
  /* servants: quarrel (Lòng both) / cry / work with a will (Lòng +) */
  cai:{vent:15,loy:3},sk:{vent:10,loy:2},hang:{vent:8,loy:2}},
 /* hỏi tội: hitLoy = Lòng her maid loses when another consort scolds her; (a higher-rank mistress whose maid she scolded / beat): bac = the amends, danh = bowing her head, loy = her maid blamed, try =
    odds base of arguing back (+ (her rank − theirs) × rk + Danh / dn), win / lose Danh, oan = their Oán on a lost argument;
    her own maid beaten by a lower-rank consort: go = Danh + and maid Lòng +, their Oán +; let = Đức +, maid Lòng −. */
 hoi:{hitLoy:2,bac:16,danh:1,aff:3,loy:10,try:40,rk:8,dn:4,win:1,lose:3,oan:10,go:{danh:1,loy:5,oan:10},let:{duc:1,loy:5}},
 /* (4) EVERY OTHER KIND OF PERSON (review r1 FAIL #1: men, officials, children, the Emperor, Thái hậu — gain AND loss on that person + a
    line she can see). Each kind pays in its OWN real stat:
    m = men (thị vệ, thái y, vương gia, nhạc sư, sứ thần, họa sư): loy = Lòng (standing in his post), tinh = his regard for her (shown on his
        card), away = tuần he is sent home (off the map, cannot be met), xAway = the same after an extreme; knT / knA = his regard / favour at which he counts as knowing her (a feast lifts his regard);
    o = court eunuchs + Thái y viện (S.court): af = their favour toward the consorts (Tổng quản's help, the Thái y's loyalty);
    q = ministers (Triều đình, S.trieu.H): pow = standing at court, rel = clan relation, dPow = a pow change in a tuần that stirs a
        feeling (v0 + vK × change, at most vMax; bot r1 of this branch at dPow 4 with no fading: 12 extremes a 100 tuần, far too many);
    k = children: hp = health, fond = the Emperor's fondness (heir choice), tal = learning;
    e = the Emperor: sung = Sủng of the consort(s) it lands on, kho = the realm treasury (j55 S.trieu.kho) a bestowal of his / Thái hậu's costs, ill = % a chill after drinking alone, away = his chance to turn a tablet ×
        this in the tuần he vents (acts) / 0 after drinking alone;
    t = Thái hậu: th = the consorts' Thái hậu regard, ill = % she falls ill after a night of chanting, suc / thUp = the favourite she calls
        to chant with her (Sức −, Thái hậu +);
    act = share of the outburst numbers an emotion ACT costs (a calmer vent the person chooses); one = the small step of a light price (ministers / court / children); sick = % a sad / anxious outburst ends in
    illness (the everyone-illness of jface: heals / worsens by the same monthly rule). */
 nk:{m:{loy:6,tinh:5,away:1,xAway:3,knT:10,knA:5},o:{af:5},q:{pow:3,rel:6,dPow:5,vMax:55,v0:20,vK:3},k:{hp:6,fond:4,tal:2},e:{sung:3,ill:10,away:.7,kho:1,khoMin:50},t:{th:3,ill:10,suc:5,thUp:2},act:.5,sick:15,one:1},
 /* (6) QUỞ TRÁCH BY TEMPER + MOOD (audit row built): the Emperor's own feeling when he punishes (cấm túc): angry AT THIS PERSON or at no one (emo gian ≥ v; bot at v 60 with any
    target: +1 on 95 % of all cấm túc, far too many) → +mo month,
    joyful (vui ≥ v) → −mo (never under 1); his words follow his nết. Thái hậu's scolding (outburst quo) hits ×hot / ×timid by her nết;
    hỏi tội: arguing back with a timid mistress is easier (tryT), with a hot one harder; her words follow her nết. */
 quo:{v:75,mo:1,hot:1.5,timid:.5,tryT:{hot:-10,even:0,timid:10}},
 /* (7) PILLOW TALK BY MOOD (audit row built, j8 night1): her mood band moves each answer's grade: joy +up to the lively answers (thơ văn,
    nũng nịu); low mood −dn to every answer but the quiet one (xoa vai), −dn2 at band ±2; a hot temper in a furious anger cannot "Rót rượu,
    nũng nịu" (greyed, like (5)). */
 pillow:{up:1,dn:1,dn2:2},
 /* (9) jemo-bal (law 4): cardMax = her emotion act cards at most; maidN = her maids an outburst may fall on; ventDef = vent of a reaction with no fx row; victimBase = a maid / quarrel partner's
    weight base (base − Lòng); supRank = her rank from which no consort outranks her (Phạm thượng target); rival = grudge minus liking ÷ affDiv must pass min;
    half = the ÷ of a halved number (½ of an oán / Lòng / favour / fondness); ohoiK = × favour lost by the one slandered; extK = an NPC extreme mood costs ×extK the outburst number */
 /* (10) TEMPER-OUTBURST (OD 25/11 ~05:45Z (1): "hiện ra ví dụ như 4 option ... bắt buộc nó phải chọn một trong 4 option đó để cho nó giải tỏa"; ~08:05Z
    "Bộc phát theo tính cách là phải làm"): her forced outburst = a CHOICE of the n reactions her temper ranks highest (no hold-back option), the
    same list an NPC consort picks from (law 1). vent = the tâm trạng / feeling points EVERY option of the choice spends (law 2: the same gain);
    net = the target net price (loss − gain, bạc via BAL.pm.val) of each option, within BAL.pm.eqTol; mainW = the weight of the act jfeel ties to
    the feeling (BAL.feel.act.main) among the options; refN = staff / guests a priced row counts when the measure has no real palace;
    cap = most of a stat outbursts may cost in capWk tuần (G1: once spent, options that pay in it drop out; hh = the Hoàng hậu's thiện cảm);
    phamCd = tuần between two Phạm thượng (G2); phamP = % that Phạm thượng ends in cấm túc (a roll, its word shown), camBac = the bạc value of one
    cấm túc for the price. */
 pick:{n:4,vent:15,net:10,mainW:2.5,refN:4,cap:{danh:6,duc:3,hh:8},capWk:36,phamCd:36,phamP:15,camBac:40},
 cardMax:2,maidN:4,ventDef:10,victimBase:101,supRank:7,rival:{affDiv:2,min:10},half:2,ohoiK:2,extK:2,
 /* (8) jemo-bal (law 4): REACTION WEIGHTS by temper, key who.k.g of the R_ table: the first flag the person has (sus, pious, gen, hot, timid, stingy), else d */
 rw:{"c.dapdo.gian":{hot:2,d:1.5},"c.mang.gian":{timid:.5,d:2},"c.danh.gian":{d:1.2},"c.khac.gian":{d:1.2},"c.khoc.gian":{timid:3,d:.6},"c.khoc.buon":{timid:3,d:1.5},"c.boan.buon":{timid:2,d:1},"c.thu.buon":{hot:1.5,d:1},"c.matngu.so":{timid:2.5,d:1.5},"c.soat.so":{sus:3,hot:1.5,d:.8},"c.cau.so":{pious:3,timid:1.5,d:.8},"c.cham.ghen":{hot:2.5,d:1.2},"c.tui.ghen":{timid:3,d:1},"c.thuong.vui":{gen:3,d:1},"c.khoe.vui":{hot:2.5,stingy:1.5,d:.8},"c.tiec.vui":{gen:1.5,d:1},"c.hat.vui":{timid:2,d:1},"c.nuot.gian":{timid:2.5,pious:2,d:.8},"c.boan.gian":{timid:1.5,d:.6},"c.huong.buon":{pious:3,d:.9},"c.huong.so":{pious:3,timid:1.5,d:.9},"c.huong.ghen":{pious:2.5,timid:1.5,d:.7},"c.trang.ghen":{gen:1.5,d:1.1},"c.kexau.ghen":{sus:2,hot:1.8,d:1},"c.tho.vui":{timid:1.5,d:.9},"c.theu.vui":{timid:1.8,d:.9},"e.ban.vui":{gen:3,d:1},"e.noi.gian":{hot:3,timid:.3,d:1},"e.eruou.buon":{d:1},"e.emat.so":{d:1},"e.nghi.ghen":{d:1},"e.eyen.vui":{d:1},"t.ban.vui":{gen:3,d:1},"t.quo.gian":{d:2},"t.quo.ghen":{d:1},"t.tkinh.buon":{d:1},"t.tkinh.so":{d:1},"s.cai.gian":{d:2},"s.sk.gian":{timid:3,d:1},"s.sk.buon":{d:1},"s.sk.so":{d:1},"s.sk.ghen":{d:1},"s.hang.vui":{d:1},"m.mcai.gian":{hot:3,d:1},"m.mbo.gian":{timid:3,d:1},"m.mruou.buon":{d:1},"m.mbo.so":{d:1},"m.mhoi.ghen":{d:1},"m.mvui.vui":{d:1},"o.okho.gian":{d:1},"o.okhoc.gian":{d:1},"o.ole.buon":{d:1},"o.okhoc.so":{d:1},"o.ohoi.ghen":{d:1},"o.ovui.vui":{d:1},"q.qgian.gian":{hot:3,d:1},"q.qbo.gian":{d:1},"q.qbo.buon":{d:1},"q.qbo.so":{d:1},"q.qhac.ghen":{d:1},"q.qvui.vui":{d:1},"k.kquay.gian":{d:1},"k.kbo.buon":{d:1},"k.kbo.so":{d:1},"k.khon.ghen":{d:1},"k.kvui.vui":{d:1}}
}});
(function(){
const E=()=>BAL.ea;
window.EA_N={cards:{},play:{},out:{},outT:{},npcAct:{},npcOut:{},npcOutT:{},ext:{},npcExt:{},hitMe:{},hoi:0,hoiMe:0,wk:0,outWk:0};
const eaOn=()=>!!(typeof S!=="undefined"&&S&&!S.dead&&!window.__eaOff);
const eaHost=()=>{try{const C=window.COOPW;return !(C&&C.on&&C.seat&&C.seat!=="a")}catch(e){return true}};
const W=()=>{try{return wk()}catch(e){return 0}};
const clp=(x,a,b)=>Math.max(a,Math.min(b,x));
const cnt=(o,k,n)=>{o[k]=(o[k]||0)+(n||1)};
function eaS(){if(!S.ea||typeof S.ea!=="object")S.ea={};const A=S.ea;A.used=A.used||{};A.hoi=A.hoi||[];return A}
/* ---------- temper (one rule for everyone, from the person's own nết) ---------- */
const T_HOT=["Kiêu ngạo","Thật thà","Thù dai","Nóng nảy","nongnay","phong lưu","Cương trực","tham vọng"];
const T_TIMID=["Khiêm nhường","Ân cần","Rộng lượng","nhat","nhantu","cẩn trọng","trung hậu","Cẩn trọng","Trung hậu"];
const T_GEN=["Ân cần","Trọng nghĩa","Rộng lượng","Thực dụng","nhantu","datinh","trung","trung hậu","đa tình"];
const T_STINGY=["Ham lợi","tham","Tham vọng","Xảo quyệt"];
function eaTraits(p){try{if(p===S)return traitsOf(S)||[];if(S.emp&&p===S.emp)return S.emp.traits||[];if(p===S.thO)return traitsOf("th")||[];return traitsOf(p)||[]}catch(e){return[]}}
function eaTemper(p){const T=eaTraits(p);const hot=T.some(t=>T_HOT.includes(t)),tim=T.some(t=>T_TIMID.includes(t));
 return {k:hot&&!tim?"hot":tim&&!hot?"timid":hot&&tim?"even":"even",gen:T.some(t=>T_GEN.includes(t))&&!T.some(t=>T_STINGY.includes(t)),stingy:T.some(t=>T_STINGY.includes(t)),sus:T.includes("Kín đáo")||T.includes("danghi"),pious:T.includes("Mê tín")||T.includes("Vì gia tộc"),tr:T}}
window.eaTemper=eaTemper;
/* the group of a feeling: vui · gian · buon · so (căng thẳng) · ghen (cards: buồn) */
/* the dominant feeling (the seal) of p as an act group, or null */
function eaSealG(p){try{const e=emoGet(p);return e&&e.k!=="binh"?eaGrpK(e.k):null}catch(e){return null}}
/* FEELINGS-18 (owner OD 17/11 ~19:25Z: acts at the HEAVY level + the bar line; reviewer mood-mem step0 note): the level of p's dominant feeling
   (jfeel feelLv: summed strength of its live causes) must reach BAL.feel.gate[w] — "card" for the acts she / an NPC CHOOSES to vent with,
   "force" (heavy) for what the feeling forces (outbursts, the "Nhịn" lock, extreme consequences). No jfeel → true (old rule). */
function eaLvOk(p,w){try{if(typeof feelLv!=="function"||!BAL.feel||!BAL.feel.gate)return true;const e=emoGet(p);if(!e||e.k==="binh")return false;
 /* a feeling written straight into p.emo (legacy writers, old saves) has no causes yet: its own strength counts the same way (feelings18 lv bands) */
 const sum=Math.max((typeof feelSums==="function"?feelSums(p)[e.k]:0)||0,e.v||0);const L=BAL.feel.lv;const lv=sum>=L[2]?3:sum>=L[1]?2:sum>=L[0]?1:0;return lv>=BAL.feel.gate[w]}catch(e){return true}}
window.eaLvOk=eaLvOk;
/* NPC gate (owner OD 17/11 ~18:33Z (1), same lines as hers): the group g of the dominant feeling counts only when the signed mood bar (moodBar) is past
   line L on its side (vui: bar ≥ L; every other group: bar ≤ −L) */
function eaBarOk(p,g,L){try{const b=typeof moodBar==="function"?moodBar(p):0;return g==="vui"?b>=L:b<=-L}catch(e){return false}}
window.eaSealG=eaSealG;window.eaBarOk=eaBarOk;
function eaBarAbs(p){try{return Math.abs(typeof moodBar==="function"?moodBar(p):0)}catch(e){return 0}}
/* FEELINGS-18: a new kind acts in the group of its nearest old kind (jfeel feelGrp: Tự tin/Hăng hái/Tình tứ/Hứng khởi/Tinh nghịch → vui, Hổ thẹn/Chán chường → buồn,
   Khó chịu/Hờn dỗi → giận, Choáng váng → sợ; Chuyên tâm/Bình thản → none); old keys khóc / đau khổ act as buồn, hờn as giận (reviewer mood-mem r1) */
function eaGrpK(k){if(typeof feelGrp==="function")k=feelGrp(k);return k==="vui"?"vui":k==="gian"||k==="hon"?"gian":k==="buon"||k==="dau"||k==="khoc"?"buon":k==="so"||k==="lo"?"so":k==="ghen"?"ghen":null}
/* hers, from the mood bar: band and flavour (jmood mbBand) */
function eaMine(){try{if(typeof mbBand!=="function"||!S.mood)return{i:0,g:null};const b=mbBand();const sg=eaSealG(S);/* owner OD 17/11 ~18:33Z (1): the bar past its line AND the matching dominant feeling */let g=b.i>=1?(sg==="vui"?"vui":null):b.i<=-1?(sg&&sg!=="vui"?sg:null):null;if(g&&!eaLvOk(S,"card"))g=null;return{i:b.i,g,b,hv:!!g&&eaLvOk(S,"force")}}catch(e){return{i:0,g:null}}}
window.eaMine=eaMine;
/* ---------- small helpers ---------- */
function myMaids(){const L=[];try{if(S.maid&&S.maid.name)L.push(S.maid);for(const s of S.staff||[])if(s&&s.role==="maid"&&s!==S.maid&&s.alive!==false)L.push(s)}catch(e){}return L.slice(0,BAL.ea.maidN)}
function maidOf(p){if(p===S)return myMaids();return (p&&p.staff||[]).filter(s=>s&&s.role==="maid"&&s.alive!==false)}
function staffOf(p){if(p===S){const L=(S.staff||[]).slice();if(S.maid&&!L.includes(S.maid))L.push(S.maid);return L}return (p&&p.staff)||[]}
function loyAdd(s,n){if(s)s.loyal=clp((s.loyal||0)+n,0,100)}
function nm(p){try{return p===S?"ngươi":p===S.emp?"Hoàng thượng":p===S.thO?"Thái hậu":(typeof whoOf==="function"&&p.id!=null?whoOf(p.id,p.name):p.name)||""}catch(e){return p&&p.name||""}}
function Nm(p){const s=nm(p);return s.charAt(0).toUpperCase()+s.slice(1)}
function liveC(){try{return liveRivals(true).filter(v=>!v.coop)}catch(e){return[]}}
function byKey(k){try{return typeof emoByKey==="function"?emoByKey(k):null}catch(e){return null}}
function eaWho(p){try{if(p===S)return undefined;if(p===S.maid)return pMaid();if(p&&p.id!=null&&typeof pv==="function"&&(rivals||[]).includes(p))return pv(p)}catch(e){}return undefined}
/* her mood move (+ toward calm for a low mood) and the feeling seal */
/* her mood bar as shown (kitMoodVal = moodBar(S), causes synced) — every outburst text AND effect reads this one number */
function eaMV(){try{if(typeof kitMoodVal==="function")return kitMoodVal()}catch(e){}return S&&S.mood&&typeof S.mood.v==="number"?S.mood.v:0}
window.eaMV=eaMV;
function ventMe(n,why,emoN){let r=0;try{r=typeof mbAdd==="function"?mbAdd(n,why,"ea:"+why):0}catch(e){}
 try{if(emoN){const m=S.emo;if(m&&m.k!=="vui"&&m.v>=BAL.eff.jemo.floor&&n>0){m.v=Math.max(0,m.v-emoN);if(typeof emoSync==="function")emoSync(S)}}}catch(e){}return r}
function ventNpc(p,n){try{const e=p&&p.emo;if(e&&e.v)e.v=Math.max(0,e.v-n);if(e&&e.v<BAL.eff.jemo.floor)p.emo=null}catch(e){}}
const sgn=n=>(n>0?"+":"−")+Math.abs(n);
/* ONE number grammar with the Tuần lục book (j87 WKE_TOK; emotion-acts-3, review r1 FAIL #1): a bare "Danh −n" / "Sủng −n" is HERS; a number of
   another person carries that person's name before it ("<Name> Danh −n", "Sủng của <Name> −n", "Thái hậu thiện cảm" = Thái hậu toward her);
   labels the book does not read (Lòng, được thương, thế ở triều, lòng y…) are plain words. Numbers go at the END of the line after a comma,
   never inside brackets (the book takes the numbers of other people off each page; a bracket would be left empty "()" / "(, )"). */
const EA_TOK=["Danh","Sức","Bạc","Đức","Tai mắt","Ân tình","Tài","Sắc","Tâm cơ","thiện cảm","quý ngươi","oán ngươi"];
const EA_LB={sung:"Sủng",danh:"Danh",bac:"Bạc",suc:"Sức",duc:"Đức",tai:"Tài",sac:"Sắc",mat:"Tai mắt",tamco:"Tâm cơ"};
/* the name before a number: the last two words of a long name ("Hàm Hương" of "Kiều Hàm Hương"; the book finds the person by the end of the name) */
function eaShort(p){const w=String(p&&p.name||"").split(" ").filter(Boolean);return w.length>=3?w.slice(-2).join(" "):w.join(" ")}
function eaN(p,lab,n){if(!n)return"";const v=sgn(n);if(p===S)return lab==="Sủng"?sgStat(n):`${lab} ${v}`;/* her Sủng: apply() scales it by her nết → print the applied amount (sgStat, law 4) */
 /* a person she cannot name: the book's mask hides the name, so the number would read as hers → no number (the mask words stay) */
 if(p!==S.thO&&p!==S.emp&&!eaKnown(p))return"";const who=p===S.thO?"Thái hậu":p&&p!==S.emp&&eaShort(p)||"";
 if(lab==="Sủng")return who?`Sủng của ${who} ${v}`:`Sủng ${v}`;return EA_TOK.includes(lab)&&who?`${who} ${lab} ${v}`:`${lab} ${v}`}
function eaL(h,nums){h=String(h||"").replace(/[.\s]+$/,"");const L=(nums||[]).filter(Boolean);return h+(L.length?", "+L.join(", "):"")+"."}
/* the first letter up, the rest of a reaction name as written (proper names inside stay capital: "làm Hoàng thượng cười") */
const lc1=s=>{s=String(s||"");return s.charAt(0).toLowerCase()+s.slice(1)};
/* ---------- other kinds of people (4): their own stats ---------- */
const NK=()=>BAL.ea.nk,Q6=()=>BAL.ea.quo;
/* the words of a scolding by the scolder's nết (6) */
const QUO_W={hot:"đập tay xuống án, quở mắng nặng lời",even:"nghiêm giọng quở trách",timid:"thở dài, khẽ trách"};
/* illness through the one everyone-illness API (jface; Thái hậu → S.thIll), else j13 catchIll */
function eaIll(p,k){try{if(typeof KIT_FACEFX!=="undefined"&&KIT_FACEFX.api&&KIT_FACEFX.api.ill)return KIT_FACEFX.api.ill(p,k,1,true);if(typeof catchIll==="function"){catchIll(p,k);return true}}catch(e){}return false}
function eaSick(p,k){try{if(typeof illOf==="function"&&illOf(p))return false;if(p===S.thO&&S.thIll)return false;if(!roll(NK().sick))return false;return eaIll(p,k)}catch(e){return false}}
/* a man sent home: off the map (j22 S.menW) until that tuần */
function eaAway(m,n){m.eaAway=Math.max(m.eaAway||0,W()+n)}
/* a court official's favour toward the consorts (S.court[x].af keyed by key(): "me" for her, the consort id) */
function eaAfOne(o,x,n){if(!o||!x)return;o.af=o.af||{};const k=x===S?"me":x.id;o.af[k]=clp((o.af[k]||0)+n,-100,100)}
function eaAfAll(o,n){eaAfOne(o,S,n);for(const x of liveC())eaAfOne(o,x,n)}
function eaAfFav(o){let b=null,bv=-999;const L=[S].concat(liveC());for(const x of L){const v=(o.af||{})[x===S?"me":x.id]||0;if(v>bv){bv=v;b=x}}return b}
/* a minister's clan most hostile (dir −1) / friendliest (dir 1) */
function eaClan(h,dir){try{if(typeof CLANS==="undefined"||typeof tdRel!=="function")return null;let b=null,bv=null;for(const c of CLANS){if(c===h.c)continue;const v=tdRel(h.c,c)*dir;if(bv==null||v>bv){bv=v;b=c}}return b}catch(e){return null}}
function eaMins(){try{return S.trieu&&S.trieu.H?Object.values(S.trieu.H).filter(h=>h&&h.name):[]}catch(e){return[]}}
/* ---------- a line she can see: Sổ ghi (log), which the week card reads ("Chuyện khác"); one rule for every kind ----------
   (S.news "Tin trong cung" is no longer drawn since the kit week card (j79 dawn draws wkSummary groups) — jlost does the same: newsAdd + log.)
   consorts: newsAdd decides whether word reaches her (tai mắt; it also lets her learn their nết), then the log; ministers: the court news
   (tdNews, Triều tab); the Emperor / Thái hậu: public, always; everyone else: when she knows / has seen the person (jface fxSeen, the fog
   rule of every face) or the person is of her own household (her maid / servants / children). */
window.EA_SAY={};
function eaKeyOf(p){try{if(p===S.maid)return"maid";if(p&&p.sid!=null&&p!==S.emp)return"s"+p.sid;const kd=eaKind(p);if(kd==="q")return"q:"+p.c;if(kd==="o"){for(const c in S.court)if(S.court[c]===p)return"o:"+c}if(kd==="m")return"m:"+p.id;if(kd==="k")return"k:"+(p.name||"");return typeof emoKey==="function"?emoKey(p):""}catch(e){return""}}
function eaMine2(p){try{if(p===S.maid||(S.staff||[]).includes(p))return true;return (S.kids||[]).includes(p)}catch(e){return false}}
/* ONE seen rule with the book (emotion-acts-3): a line is written only when she can put a NAME on the person (j61 kitKnownName, the rule the
   book's name-mask uses), so it is filed on that person's page and never masked onto hers ("một vị Thị vệ chưa quen biết…"); toMe = the line
   is about her (her Sủng, her Bạc…): always written. */
function eaKnown(p){try{return typeof kitKnownName!=="function"||kitKnownName(p)}catch(e){return true}}
function eaSay(p,line,toMe){if(!line||!p)return;const kd=eaKind(p);let seen=false;
 try{if(kd==="c"){if(typeof newsAdd==="function"&&p.id!=null){const n0=S.news&&S.news[0];newsAdd(p,"emo",line,!!toMe);seen=!!(S.news&&S.news[0]&&S.news[0]!==n0)&&(toMe||eaKnown(p))}}
  else if(kd==="q"){if(typeof tdNews==="function"&&S.trieu){tdNews(line);seen=true}}
  else seen=kd==="e"||kd==="t"||!!toMe||(eaMine2(p)||(typeof fxSeen==="function"?fxSeen(p):false))&&eaKnown(p);
  if(seen&&kd!=="q")log(line)}catch(e){}
 cnt(EA_SAY,kd+(seen?":seen":":hid"))}
/* ======================= (1) HER EMOTION ACT CARDS ======================= */
const EA_ART={"Đập đồ":"trut-gian-h","Mắng cung nữ":"phat-vo-co-h","Khóc thầm":"nhin-loi-mia-h","Viết thư nhà":"gui-thu-qua-con-h","Đàn hát tự thưởng":"dan-dem-trang","Thắp hương cầu an":"cau-tu"};
/* the card's group label (KIT §6.1 categories) by what the act is, not by the name's words ("tự thưởng" read as Ban thưởng) */
const EA_CAT={"Đập đồ":["nghi-ngoi","Nghỉ ngơi"],"Mắng cung nữ":["giao-thiep","Giao thiệp"],"Khóc thầm":["nghi-ngoi","Nghỉ ngơi"],"Viết thư nhà":["giao-thiep","Giao thiệp"],"Đàn hát tự thưởng":["hoc-tap","Học tập"],"Thắp hương cầu an":["le-nghi","Lễ nghi"]};
(function(){if(typeof kitActArt!=="function")return;const k0=kitActArt;kitActArt=function(name){const r=k0.apply(this,arguments);try{const key=EA_ART[name];if(key){const c=EA_CAT[name];return Object.assign({},r,{src:(KIT_ACTS.acts||{})[name]?r.src:`img/act-${key}.webp`,cat:c[0],label:(KIT_ACTS.cats||{})[c[0]]||c[1]})}}catch(e){}return r}})();
function eaStamp(){return W()*10+(S.buoi||0)}
function eaCards(){const M=eaMine();if(!M.g)return[];const g=M.g==="ghen"?"buon":M.g;const C=E().card,A=[];const mood=n=>`tâm trạng ${sgn(n)}`;
 const emoNm=()=>{try{const e=emoGet(S);return e&&e.k!=="binh"&&e.k!=="vui"?EMO[e.k]:""}catch(e){return""}};
 const mk=(key,o)=>Object.assign({ea:key,o:100,k:C[key].k,dom:o.dom||"Sức khỏe",w:{},c:{},l:{}},o);
 if(g==="gian"){const c=C.dapdo;A.push(mk("dapdo",{n:"Đập đồ",t:"Ném vỡ chén trà, bình hoa cho hả cơn giận.",c:{bac:-c.bac},x:`${mood(c.mood)}${emoNm()?`, bớt ${emoNm()} ${c.emo}`:""} · kèm: cung nhân xì xào, Danh −${c.danh}`,
   go:()=>{apply({danh:-c.danh});const d=ventMe(c.mood,"đập đồ cho hả giận",c.emo);log(`Ngươi ném vỡ chén trà, bình hoa; cơn giận nguôi đi (tâm trạng ${sgn(d||c.mood)}). Cung nhân xì xào (Danh −${c.danh}).`)}}));
  const L=myMaids();if(L.length){const c2=C.mang;const one=L.length===1?L[0]:null;
   A.push(mk("mang",{n:"Mắng cung nữ",dom:"Thưởng phạt",t:one?`Quát mắng ${one.name} một trận cho hả giận.`:"Chọn một cung nữ, quát mắng một trận cho hả giận.",x:`${mood(c2.mood)}${emoNm()?`, bớt ${emoNm()} ${c2.emo}`:""} · kèm: thiện cảm ${one?one.name:"người bị mắng"} −${c2.loy}`,
    go:()=>eaScoldPick(L,c2)}))}}
 else if(g==="buon"){const c=C.khoc,c2=C.thu;
  A.push(mk("khoc",{n:"Khóc thầm",dom:"Sức khỏe",t:"Đóng cửa tẩm cung, một mình khóc cho vơi nỗi lòng.",c:{suc:-c.suc},x:`${mood(c.mood)}${emoNm()?`, bớt ${emoNm()} ${c.emo}`:""}`,go:()=>{const d=ventMe(c.mood,"khóc cho vơi lòng",c.emo);log(`Ngươi khóc một hồi, lòng nhẹ đi (tâm trạng ${sgn(d||c.mood)}).`)}}));
  A.push(mk("thu",{n:"Viết thư nhà",dom:"Giao thiệp",t:"Viết thư gửi về nhà, nhờ thái giám mang ra ngoài cung.",c:{bac:-c2.bac},x:`${mood(c2.mood)}${emoNm()?`, bớt ${emoNm()} ${c2.emo}`:""}`,go:()=>{const d=ventMe(c2.mood,"viết thư nhà",c2.emo);log(`Ngươi viết thư gửi về nhà, kể nỗi nhớ mong; lòng ấm lại (tâm trạng ${sgn(d||c2.mood)}).`)}}))}
 else if(g==="vui"){const c=C.dan;A.push(mk("dan",{n:"Đàn hát tự thưởng",dom:"Tài nghệ",t:"Lòng đang vui, ôm đàn hát một khúc tự thưởng cho mình.",w:{tai:c.tai},x:`kèm: ${mood(c.mood)} (lòng lắng lại) · kẻ ganh ghen +${c.ghen}`,
   go:()=>{try{ghenAll(c.ghen,"nghe tiếng đàn hát tự thưởng của ngươi")}catch(e){}const d=ventMe(c.mood,"đàn hát tự thưởng");log(`Tiếng đàn vọng ra ngoài cung; lòng ngươi lắng lại (tâm trạng ${sgn(d||c.mood)}), kẻ ganh thì ghen thêm.`)}}))}
 else if(g==="so"){const c=C.huong;A.push(mk("huong",{n:"Thắp hương cầu an",dom:"Đức",t:"Thắp hương ở Phật đường, khấn cầu bình an cho lòng yên.",c:{bac:-c.bac},w:{duc:c.duc},x:`${mood(c.mood)}${emoNm()?`, bớt ${emoNm()} ${c.emo}`:""}`,
   go:()=>{const d=ventMe(c.mood,"thắp hương cầu an",c.emo);log(`Khói hương lượn lờ; lòng ngươi yên lại (tâm trạng ${sgn(d||c.mood)}).`)}}))}
 const st=eaStamp(),U=eaS().used;for(const a of A){a.done=U[a.ea]===st?1:0;const g0=a.go;a.go=function(){U[a.ea]=st;cnt(EA_N.play,a.ea);return g0.apply(this,arguments)}}
 return A.slice(0,BAL.ea.cardMax)}
window.eaCards=eaCards;
/* Mắng cung nữ: she chooses the maid (kit event choice; one maid = no question) */
function eaScoldOne(m,c){loyAdd(m,-c.loy);const d=ventMe(c.mood,`mắng ${m.name}`,c.emo);try{if(typeof emoEv==="function")emoEv(m,"loyalDown",`bị chủ nhân quát mắng`)}catch(e){}
 log(`Ngươi quát mắng ${m.name} một trận; cơn giận nguôi đi (tâm trạng ${sgn(d||c.mood)}), ${m.name} cúi đầu chịu mắng (thiện cảm −${c.loy}).`)}
function eaScoldPick(L,c){if(L.length===1)return eaScoldOne(L[0],c);
 Q.push({ev:1,kind:"ring"/* KIT §101.9: which servant = vòng người */,t:"Mắng cung nữ",emoSeal:{k:"gian",who:"me"},art:"img/act-phat-vo-co-h.webp",h:`<p>Cơn giận chưa nguôi. Ngươi gọi cung nữ vào.</p><p>Mắng ai?</p>`,
  opts:L.map(m=>({n:`Mắng ${m.name}`,risk:"an toàn",hint:`hả giận; ${m.name} buồn lòng`,x:`thành: tâm trạng +${c.mood} · kèm: thiện cảm ${m.name} −${c.loy} (nay ${m.loyal||0})`,fx:{},go:()=>eaScoldOne(m,c)}))})}
/* the cards sit after the standing cards (j76), are rebuilt from the live mood on every deal / render, and never on the servant road */
function eaSync(){try{if(!eaOn()||!Array.isArray(deck)||(typeof isSrv==="function"&&isSrv()))return;const want=eaCards();const keys=want.map(a=>a.ea).join(",");
 const have=deck.filter(a=>a&&a.ea);if(have.map(a=>a.ea).join(",")===keys&&have.every((a,i)=>a.done===want[i].done)){for(let i=0;i<have.length;i++){const o=have[i],n=want[i];o.x=n.x;o.t=n.t;o.c=n.c;o.w=n.w;o.go=n.go}return}
 for(let i=deck.length-1;i>=0;i--)if(deck[i]&&deck[i].ea)deck.splice(i,1);if(!want.length)return;let at=0;while(at<deck.length&&deck[at]&&deck[at].j76)at++;deck.splice(at,0,...want);for(const a of want)cnt(EA_N.cards,a.ea)}catch(e){console.error(e)}}
window.eaSync=eaSync;
(function(){if(typeof deal!=="function")return;const d0=deal;deal=function(){const r=d0.apply(this,arguments);eaSync();return r}})();
(function(){if(typeof render!=="function")return;const r0=render;render=function(){eaSync();return r0.apply(this,arguments)}})();
/* ======================= REACTIONS (one table, her and every NPC) ======================= */
/* who: c consort (her too), e Emperor, t Thái hậu, s servant, m man / official / child (self only). ok(p,T) = allowed for this person now.
   w(T) = weight by temper. Timid never: danh, khac, pham, cham, khoe. */
const R_=[
 {k:"dapdo",g:"gian",who:"c",n:"Đập đồ",art:"trut-gian-h",ok:(p,T)=>T.k!=="timid"},
 {k:"mang",g:"gian",who:"c",n:"Mắng cung nữ",art:"phat-vo-co-h",ok:p=>maidOf(p).length>0},
 {k:"danh",g:"gian",who:"c",n:"Đánh cung nữ",art:"tat-h",ok:(p,T)=>T.k==="hot"&&maidOf(p).length>0},
 {k:"khac",g:"gian",who:"c",n:"Mắng cung nữ cung khác",art:"phat-vo-co-h",ok:(p,T)=>T.k==="hot"&&!!eaOtherMaid(p)},
 {k:"pham",g:"gian",who:"c",n:"Phạm thượng",art:"dap-tra-mia-h",ok:(p,T)=>T.k==="hot"&&!((p===S?S.confined:p.confined)>0)&&!!eaSuperior(p),w:()=>BAL.ea.out.phamW},
 {k:"khoc",g:"gian",who:"c",n:"Khóc vì uất ức",art:"nhin-loi-mia-h",ok:(p,T)=>T.k!=="hot"},
 /* TEMPER-OUTBURST (temper-design (b) +rows): every temper × feeling cell has ≥ 3 options where her palace allows */
 {k:"nuot",g:"gian",who:"c",n:"Nuốt giận chép kinh",art:"cau-tu",ok:(p,T)=>T.k!=="hot"},
 {k:"boan",g:"gian",who:"c",n:"Giận đến bỏ bữa",art:"xa-huong",ok:(p,T)=>T.k!=="hot"},
 {k:"khoc",g:"buon",who:"c",n:"Khóc suốt đêm",art:"nhin-loi-mia-h",ok:()=>true},
 {k:"boan",g:"buon",who:"c",n:"Bỏ bữa",art:"xa-huong",ok:()=>true},
 {k:"thu",g:"buon",who:"c",n:"Gửi thư nhà kể khổ",art:"gui-thu-qua-con-h",ok:p=>p===S||(p.bac||0)>=BAL.ea.fx.thu.bac},
 {k:"huong",g:"buon",who:"c",n:"Thắp hương tụng kinh",art:"cau-tu",ok:p=>(p===S?S.bac:(p.bac||0))>=BAL.ea.fx.huong.bac},
 {k:"matngu",g:"so",who:"c",n:"Thức trắng đêm",art:"xa-huong",ok:()=>true},
 {k:"soat",g:"so",who:"c",n:"Lục soát tẩm cung",art:"phat-vo-co-h",ok:(p,T)=>T.k!=="timid"&&staffOf(p).length>0},
 {k:"cau",g:"so",who:"c",n:"Cầu khấn khắp nơi",art:"cau-tu",ok:p=>p===S||(p.bac||0)>=BAL.ea.fx.cau.bac},
 {k:"huong",g:"so",who:"c",n:"Thắp hương cầu an",art:"cau-tu",ok:p=>(p===S?S.bac:(p.bac||0))>=BAL.ea.fx.huong.bac},
 {k:"cham",g:"ghen",who:"c",n:"Châm chọc tình địch",art:"dap-tra-mia-h",ok:(p,T)=>T.k!=="timid"&&!!eaMockT(p)},
 {k:"tui",g:"ghen",who:"c",n:"Tủi thân khóc thầm",art:"nhin-loi-mia-h",ok:()=>true},
 {k:"huong",g:"ghen",who:"c",n:"Tụng kinh cho lòng lắng lại",art:"cau-tu",ok:p=>(p===S?S.bac:(p.bac||0))>=BAL.ea.fx.huong.bac},
 {k:"trang",g:"ghen",who:"c",n:"Trang điểm lộng lẫy chờ ngự giá",art:"dang-tra",ok:p=>!!S.emp&&!((p===S?S.confined:p.confined)>0)&&(p===S?S.bac:(p.bac||0))>=BAL.ea.fx.trang.bac},
 {k:"kexau",g:"ghen",who:"c",n:"Kể xấu tình địch với cung nữ",art:"dap-tra-mia-h",ok:(p,T)=>T.k!=="timid"&&!!eaRival(p)&&maidOf(p).length>0},
 {k:"thuong",g:"vui",who:"c",n:"Ban thưởng cung nhân",art:"phat-bac-cuu-giup",ok:(p,T)=>!T.stingy&&staffOf(p).length>0&&(p===S||(p.bac||0)>=BAL.ea.fx.thuong.bac)},
 {k:"khoe",g:"vui",who:"c",n:"Khoe khoang",art:"dap-tra-mia-h",ok:(p,T)=>T.k!=="timid"},
 {k:"tiec",g:"vui",who:"c",n:"Bày tiệc trà",art:"dang-tra",ok:(p,T)=>!T.stingy&&(p===S||(p.bac||0)>=BAL.ea.fx.tiec.bac)},
 {k:"hat",g:"vui",who:"c",n:"Ca hát thâu đêm",art:"dan-dem-trang",ok:()=>true},
 {k:"tho",g:"vui",who:"c",n:"Ngâm thơ ngắm hoa đến khuya",art:"dan-dem-trang",ok:()=>true},
 {k:"theu",g:"vui",who:"c",n:"Thêu túi thơm dâng Hoàng thượng",art:"dang-tra",ok:p=>!!S.emp&&!((p===S?S.confined:p.confined)>0)},
 /* the Emperor */
 /* emotion-acts-3 (review r1 FAIL #2): a bestowal is paid from the realm treasury (its loss), so it happens only while the treasury stays at or
    above BAL.ea.nk.e.khoMin after paying (j55 / jreign: a treasury under 40 weakens the throne every month → more plots on the Emperor; r1
    let frequent joy drain it); otherwise the joy finds another outlet (Mở yến ngắm hoa) */
 {k:"ban",g:"vui",who:"e",n:"Ban thưởng hậu cung",ok:(p,T)=>!T.tr.includes("lanhlung")&&eaKhoOk()},
 {k:"noi",g:"gian",who:"e",n:"Long nhan đại nộ",ok:p=>!!eaTargetET(p)},
 {k:"eruou",g:"buon",who:"e",n:"Một mình uống rượu",ok:()=>true},{k:"emat",g:"so",who:"e",n:"Mất ngủ, thức phê tấu chương",ok:()=>true},
 {k:"nghi",g:"ghen",who:"e",n:"Nghi kỵ",ok:p=>!!eaTargetET(p)},{k:"eyen",g:"vui",who:"e",n:"Mở yến ngắm hoa",ok:()=>true},
 /* Thái hậu */
 {k:"ban",g:"vui",who:"t",n:"Thái hậu ban thưởng",ok:()=>eaKhoOk()},
 {k:"quo",g:"gian",who:"t",n:"Thái hậu quở trách",ok:p=>!!eaTargetET(p)},{k:"quo",g:"ghen",who:"t",n:"Thái hậu lạnh nhạt",ok:p=>!!eaTargetET(p)},
 {k:"tkinh",g:"buon",who:"t",n:"Tụng kinh suốt đêm",ok:()=>true},{k:"tkinh",g:"so",who:"t",n:"Mất ngủ, tụng kinh cầu an",ok:()=>true},
 /* servants */
 {k:"cai",g:"gian",who:"s",n:"Cãi nhau với cung nhân khác",ok:(p,T)=>T.k!=="timid"},{k:"sk",g:"gian",who:"s",n:"Khóc vì bị oan",ok:()=>true},
 {k:"sk",g:"buon",who:"s",n:"Lơ đễnh việc hầu",ok:()=>true},{k:"sk",g:"so",who:"s",n:"Run sợ lơ đễnh",ok:()=>true},{k:"sk",g:"ghen",who:"s",n:"Hờn dỗi",ok:()=>true},
 {k:"hang",g:"vui",who:"s",n:"Làm việc hăng hái",ok:()=>true},
 /* men (thị vệ, thái y, vương gia, nhạc sư, sứ thần, họa sư): Lòng / regard for her / sent home */
 {k:"mcai",g:"gian",who:"m",n:"Cãi nhau với đồng liêu",ok:(p,T)=>T.k!=="timid"},{k:"mbo",g:"gian",who:"m",n:"Ấm ức cáo bệnh về nhà",ok:(p,T)=>T.k!=="hot"},
 {k:"mruou",g:"buon",who:"m",n:"Uống rượu giải sầu",ok:()=>true},{k:"mbo",g:"so",who:"m",n:"Lo âu cáo bệnh về nhà",ok:()=>true},
 {k:"mhoi",g:"ghen",who:"m",n:"Hậm hực ra mặt",ok:()=>true},{k:"mvui",g:"vui",who:"m",n:"Mở tiệc đãi bằng hữu",ok:()=>true},
 /* court eunuchs + Thái y viện: their favour toward the consorts */
 {k:"okho",g:"gian",who:"o",n:"Làm khó các cung",ok:(p,T)=>T.k!=="timid"},{k:"okhoc",g:"gian",who:"o",n:"Nuốt giận, khóc thầm",ok:(p,T)=>T.k==="timid"},
 {k:"ole",g:"buon",who:"o",n:"Lơ là việc các cung",ok:()=>true},{k:"okhoc",g:"so",who:"o",n:"Lo âu mất ngủ",ok:()=>true},
 {k:"ohoi",g:"ghen",who:"o",n:"Nói xấu người được sủng",ok:()=>!!eaTopSung()},{k:"ovui",g:"vui",who:"o",n:"Vui vẻ nâng đỡ người quen",ok:()=>true},
 /* ministers: standing at court and clan relations (news of the court) */
 {k:"qgian",g:"gian",who:"q",n:"Lớn tiếng trên triều",ok:(p,T)=>T.k!=="timid"},{k:"qbo",g:"gian",who:"q",n:"Cáo bệnh không lên triều",ok:(p,T)=>T.k!=="hot"},
 {k:"qbo",g:"buon",who:"q",n:"Cáo bệnh không lên triều",ok:()=>true},{k:"qbo",g:"so",who:"q",n:"Đóng cửa phủ, cáo bệnh",ok:()=>true},
 {k:"qhac",g:"ghen",who:"q",n:"Dâng sớ hặc phe đối đầu",ok:()=>true},{k:"qvui",g:"vui",who:"q",n:"Mở tiệc mời đồng liêu",ok:()=>true},
 /* children: health, the Emperor's fondness, learning */
 {k:"kquay",g:"gian",who:"k",n:"Khóc quấy, ném đồ chơi",ok:()=>true},{k:"kbo",g:"buon",who:"k",n:"Biếng ăn",ok:()=>true},
 {k:"kbo",g:"so",who:"k",n:"Gặp ác mộng, sốt nhẹ",ok:()=>true},{k:"khon",g:"ghen",who:"k",n:"Hờn dỗi huynh đệ",ok:()=>true},
 {k:"kvui",g:"vui",who:"k",n:"Nô đùa làm Hoàng thượng cười",ok:()=>true}];
for(const r of R_)if(!r.w)r.w=T=>eaRW(r.who+"."+r.k+"."+r.g,T);/* jemo-bal: weight by temper = BAL.ea.rw (data) */
/* jemo-bal (law 4): a reaction's weight by temper from BAL.ea.rw[who.k.g]: the first flag the person has (sus, pious, gen, hot, timid, stingy), else d */
function eaRW(id,T){const W=BAL.ea.rw[id]||{};for(const f of ["sus","pious","gen"])if(T[f]&&W[f]!=null)return W[f];if(W[T.k]!=null)return W[T.k];if(T.stingy&&W.stingy!=null)return W.stingy;return W.d}
window.EA_REACT=R_;
/* FEELINGS-18 (jfeel acts) reuses these helpers of the ONE reaction code (they live inside this closure) */
window.EA_H={staffOf:p=>staffOf(p),maidOf:p=>maidOf(p),rival:p=>eaRival(p),ventMe:(n,w,e)=>ventMe(n,w,e),ventNpc:(p,n)=>ventNpc(p,n),loyAdd:(m,n)=>loyAdd(m,n)};
function eaKhoOk(){try{const T=S.trieu,N=BAL.ea.nk.e;return !(T&&T.kho!=null)||T.kho-N.kho>=N.khoMin}catch(e){return true}}
/* who the person is: c consort (her too), e Emperor, t Thái hậu, s servant, m man of the palace, o court eunuch / Thái y viện, q minister, k child */
function eaKind(p){if(p===S)return"c";if(S.emp&&p===S.emp)return"e";if(p===S.thO)return"t";if((rivals||[]).includes(p))return"c";if(p&&(p.role==="maid"||p.role==="eunuch"||p.sid!=null||p===S.maid))return"s";
 if(p&&p.isMin)return"q";if(S.court&&Object.values(S.court).includes(p))return"o";if((S.men||[]).includes(p))return"m";try{if(allKids().some(a=>a[0]===p))return"k"}catch(e){}return"m"}
window.eaKind=eaKind;
/* the consort the most favoured now (Sủng), her included */
function eaTopSung(){try{const L=[S].concat(liveC()).filter(x=>!(x===S&&(S.out||S.dead)));return L.sort((a,b)=>(b.sung||0)-(a.sung||0))[0]||null}catch(e){return null}}
/* targets: who the angry / jealous one aims at (her feeling's t, else the one she hates most) */
function eaTarget(p){try{const e=p.emo;if(e&&e.t!=null){const t=byKey(e.t);if(t&&t!==p&&(t===S||t.alive))return t}}catch(e){}return null}
/* the Emperor / Thái hậu with no named target: the consort they think least of now (Sủng / Thái hậu regard), her included */
function eaTargetET(p){const t=eaTarget(p);if(t&&(t===S||(rivals||[]).includes(t)))return t;try{const L=[S].concat(liveC()).filter(x=>!(x===S&&(S.out||S.dead)));const f=p===S.thO?"th":"sung";return L.sort((a,b)=>(a[f]||0)-(b[f]||0))[0]||null}catch(e){return null}}
/* rank respect (j8 mockOK): open mockery only toward an equal or lower rank */
function eaMockT(p){const t=eaRival(p);return t&&mockOK(p,t)?t:null}
function eaRival(p){const t=eaTarget(p);if(t&&(t===S||(rivals||[]).includes(t)))return t;try{const L=[S].concat(liveC()).filter(x=>x!==p&&!(x===S&&S.out));let best=null,bv=-1;for(const x of L){const h=(p===S?(S.ro&&S.ro[x.id]||0):oan(p,x))-(p===S?(S.rl&&S.rl[x.id]||0):aff(p,x))/BAL.ea.rival.affDiv;if(h>bv){bv=h;best=x}}return bv>BAL.ea.rival.min?best:null}catch(e){return null}}
function eaOtherMaid(p){const t=eaRival(p);if(t&&t!==p){const L=maidOf(t);if(L.length)return{who:t,m:eaVictim(L)}}return null}
/* G3: the maid an outburst falls on = the one her mistress is least pleased with (lowest lòng), near-best — not a random maid */
function eaVictim(L){return npwPick(L,m=>BAL.ea.victimBase-(m.loyal||0))||L[0]}
function eaSuperior(p){try{const hh=liveC().find(v=>v.queen);if(p===S){if(S.out||S.rank>=BAL.ea.supRank)return null;return hh||null}if(p.queen)return null;if(hh&&hh!==p)return hh;return null}catch(e){return null}}
/* ======================= TEMPER-OUTBURST: the forced choice (OD 25/11 ~05:45Z (1) + ~08:05Z; temper-design (b) + (e) G1 / G2) =======================
   eaOpts(p, fk, g): the options of ONE outburst of consort p (her or an NPC, law 1) for jfeel feeling fk (its act BAL.feel.act.main[fk] + the
   reactions of its group) or, with no fk, the jemoact group g: every R_ row of her kind and group her temper allows (ok) and the caps allow
   (eaCapOk), ranked by temper weight (BAL.ea.rw; the feeling's own act ×mainW), the top BAL.ea.pick.n. No hold-back option.
   eaPx(p, r): the price of an option in ONE unit (bạc, BAL.pm.val): G gains / L losses as [label, n, bạc] and net = ΣL − ΣG (law 2: each net
   within BAL.pm.eqTol of BAL.ea.pick.net; dev/measure/temper-equal.js). The same numbers are shown on the option and applied by eaDo / feelDo. */
function eaS2c(p){const o=p===S?eaS():p;o.eaC=o.eaC&&typeof o.eaC==="object"?o.eaC:{w0:W(),danh:0,duc:0,hh:0};if(W()-o.eaC.w0>=BAL.ea.pick.capWk){const ph=o.eaC.pham;o.eaC={w0:W(),danh:0,duc:0,hh:0};if(ph!=null)o.eaC.pham=ph}return o.eaC}
const PV=()=>BAL.pm.val;
function eaPx(p,r){const K=r.k,F=(BAL.feel&&BAL.feel.act&&BAL.feel.act.fx&&BAL.feel.act.fx[K]&&!BAL.feel.act.fx[K].use?BAL.feel.act.fx[K]:BAL.ea.fx[(BAL.feel&&BAL.feel.act&&BAL.feel.act.fx&&BAL.feel.act.fx[K]&&BAL.feel.act.fx[K].use)||K])||{};const V=PV(),pk=BAL.ea.pick,G=[],L=[];
 const me=p===S,ref=pk.refN;let nSt=ref,nG=F.n||0;try{if(p&&S)nSt=staffOf(p).length}catch(e){}
 const g=(lb,n,u,st)=>{if(n)G.push([lb,n,n*u,st])},l=(lb,n,u,st)=>{if(n)L.push([lb,n,n*u,st])},lu=(lb,n,u)=>{if(n)L.push([lb,n,n*u,"",0,1])};/* lu = a loss that RAISES someone else's Oán / ghen: shown «+n» (TEMPER F1) */
 const riv=()=>{try{return eaRival(p)}catch(e){return null}},nmx=x=>x?(x===S?"ngươi":nm(x)):"tình địch";
 switch(K){
  case"dapdo":l("Bạc",F.bac,1,"bac");l("Danh",F.danh,V.danhBac,"danh");break;
  case"mang":l("thiện cảm cung nữ",F.loy,V.loyBac);break;
  case"danh":l("thiện cảm cung nữ",F.loy,V.loyBac);l("Đức",F.duc,V.ducBac,"duc");l("Danh",F.danh,V.danhBac,"danh");break;
  case"khac":{const o=p&&S?eaOtherMaid(p):null;/* TEMPER F2: priced by the same branch eaDo takes — the other outranks: her → that consort comes to hỏi tội (bill = the Tạ lỗi answer of eaHoi); an NPC → Oán hiOan */
  const hi=o&&o.who!==S&&rkOf(o.who)>rkOf(p);if(hi&&me){const H=E().hoi;L.push([`${nmx(o.who)} sẽ đến hỏi tội`,0,H.bac+H.danh*V.danhBac-H.aff*V.affBac,"",0,0,`${nmx(o.who)} sẽ đến hỏi tội (đền Bạc ${H.bac}, Danh −${H.danh})`])}else lu(`${nmx(o&&o.who)} oán ngươi`,hi?F.hiOan:F.oan,V.oanBac);break}
  case"pham":{const t=p&&S?eaSuperior(p):null;l(`${t&&t.queen?"Hoàng hậu":nmx(t)} thiện cảm`,F.rel,t&&t.queen?V.hhBac:V.affBac,t&&t.queen?"hh":"");l("Danh",F.danh,V.danhBac,"danh");L.push(["cấm túc",0,pk.phamP/100*pk.camBac,"",pk.phamP]);break}
  case"khoc":case"tui":case"boan":case"matngu":case"ngoithu":l("Sức",F.suc,V.sucBac);break;
  case"thu":case"cau":l("Bạc",F.bac,1);break;
  case"soat":l("thiện cảm mỗi cung nhân",F.loy*nSt,V.loyBac);break;
  case"cham":case"noimoc":{const t=riv();l(`${nmx(t)} thiện cảm`,F.rel,V.affBac);lu(`${nmx(t)} oán ngươi`,F.oan,V.oanBac);l("Danh",F.danh,V.danhBac,"danh");break}
  case"thuong":l("Bạc",F.bac,1);g("thiện cảm mỗi cung nhân",F.loy*nSt,V.loyBac);break;
  case"khoe":g("Danh",F.danh,V.danhBac);lu("kẻ ganh ghen",F.ghen,V.ghenBac);break;
  case"tiec":l("Bạc",F.bac,1);g(`thiện cảm ${nG} vị tỷ muội`,F.aff*nG,V.affBac);break;
  case"hat":l("Sức",F.suc,V.sucBac);g("Tài",F.tai,V.taiBac);break;
  case"nuot":l("Sức",F.suc,V.sucBac);g("Đức",F.duc,V.ducBac);break;
  case"huong":l("Bạc",F.bac,1);g("Đức",F.duc,V.ducBac);break;
  case"trang":l("Bạc",F.bac,1);g("Sủng",F.sung,V.sungBac);break;
  case"tho":g("Danh",F.danh,V.danhBac);l("Sức",F.suc,V.sucBac);break;
  case"theu":g("Sủng",F.sung,V.sungBac);l("Sức",F.suc,V.sucBac);break;
  case"kexau":{const t=riv();g(`nàng ${t&&t!==S?nm(t):"tình địch"} Danh −`,F.rd,V.danhBac);lu(`${nmx(t)} oán ngươi`,F.oan,V.oanBac);l("Danh",F.danh,V.danhBac,"danh");break}
  /* jfeel acts (BAL.feel.act.fx) */
  case"tron":case"caobenh":l("Danh",F.danh,V.danhBac,"danh");break;
  case"bodo":l("Tài",F.tai,V.taiBac);break;
  case"bove":l("thiện cảm người kia",F.rel,V.affBac);break;
  case"moi":g("Sủng",F.sung,V.sungBac);lu("kẻ ganh ghen",F.ghen,V.ghenBac);break;
  case"caugat":l("thiện cảm cung nhân",F.loy,V.loyBac);break;
  case"khoetai":g("Danh",F.danh,V.danhBac);lu("kẻ ganh ghen",F.ghen,V.ghenBac);break;
  case"treo":{const t=riv();g("thiện cảm mỗi cung nhân",F.loy*nSt,V.loyBac);if(t)l(`${nmx(t)} thiện cảm`,F.rel,V.affBac);else l("Danh",F.danh,V.danhBac,"danh");break}
  case"mach":case"quengio":g("Tài",F.tai,V.taiBac);l("Sức",F.suc,V.sucBac);break;
  case"sangtac":g("Tài",F.tai,V.taiBac);g("Danh",F.danh,V.danhBac);l("Sức",F.suc,V.sucBac);break}
 const sum=a=>a.reduce((t,x)=>t+x[2],0);return{G,L,net:+(sum(L)-sum(G)).toFixed(1)}}
/* G1 + G2: the option drops out once its stat would pass the yearly cap, or Phạm thượng inside phamCd */
function eaCapOk(p,r){try{const C=eaS2c(p),pk=BAL.ea.pick;if(r.k==="pham"&&C.pham!=null&&W()-C.pham<pk.phamCd)return false;for(const x of eaPx(p,r).L){const st=x[3];if(st&&pk.cap[st]!=null&&(C[st]||0)+x[1]>pk.cap[st])return false}return true}catch(e){return true}}
function eaKhacOk(p,r){if(r.k!=="khac"||p===S)return true;try{const o=eaOtherMaid(p);if(!o||o.who===S)return true;const F=BAL.ea.fx.khac;return !(rkOf(o.who)>rkOf(p)&&(o.who.queen||rkOf(o.who)>=rkOf(p)+F.punRk))}catch(e){return true}}
function eaCapAdd(p,r){try{const C=eaS2c(p);for(const x of eaPx(p,r).L){const st=x[3];if(st&&BAL.ea.pick.cap[st]!=null)C[st]=(C[st]||0)+x[1]}}catch(e){}}
function eaOpts(p,fk,g,T0){/* T0: a temper given by the measure (dev/measure/temper-equal.js); else the person's own */let T=T0;if(!T)try{T=eaTemper(p)}catch(e){T={k:"even",tr:[]}}if(eaKind(p)!=="c")return[];const A=BAL.feel&&BAL.feel.act,pk=BAL.ea.pick;const mk=fk&&A&&A.main?A.main[fk]:null;if(!g)g=fk&&A&&A.g?A.g[fk]:fk;
 const L=[],seen={};const push=(r,w)=>{if(!r||seen[r.k])return;let ok=false;try{ok=!!r.ok(p,T)}catch(e){}if(!ok||!eaCapOk(p,r)||!eaKhacOk(p,r))return;seen[r.k]=1;L.push({r,w})};
 if(mk)push(R_.find(x=>x.k===mk&&x.who==="c"&&x.g===g)||R_.find(x=>x.k===mk&&x.who==="c"),pk.mainW);
 for(const r of R_)if(r.who==="c"&&r.g===g){let w=0;try{w=Math.max(0,r.w(T))}catch(e){}push(r,w)}
 L.sort((a,b)=>b.w-a.w);return L.slice(0,pk.n).map(x=>Object.assign({},x.r,{pv:1,w0:x.w}))}
/* the option row of her choice: gains → thành, losses → kèm (kit kaRows routes them to Được / Tốn / Mất / Kèm), real numbers */
/* her own stats of an option (Bạc, Sức, Danh, Đức, Sủng, Tài) → the option's fx (the kit draws Tốn / Được / Mất from it, j3 chooseM applies it, then
   go runs the reaction with fxPaid so nothing is paid twice); the rest (vent, others' feelings, the cấm túc roll) → x */
const EA_OWN={"Bạc":"bac","Sức":"suc","Danh":"danh","Đức":"duc","Sủng":"sung","Tài":"tai"};
function eaOptFx(p,r){const P=eaPx(p,r),o={};for(const x of P.G)if(EA_OWN[x[0]]&&x[1])o[EA_OWN[x[0]]]=(o[EA_OWN[x[0]]]||0)+x[1];for(const x of P.L)if(EA_OWN[x[0]]&&x[1])o[EA_OWN[x[0]]]=(o[EA_OWN[x[0]]]||0)-x[1];
 if(o.bac&&o.bac<0)o.bac=-Math.min(-o.bac,Math.max(0,S.bac||0));return o}
function eaOptX(p,r){const P=eaPx(p,r),vv=BAL.ea.pick.vent;const up=!(eaMV()>0);/* ONE source (law 3 / law 11): the bar she sees (moodBar via kitMoodVal), never the raw S.mood.v that lags the causes */
 const gs=(up?["giải tỏa tâm trạng"]:[]).concat(P.G.filter(x=>!EA_OWN[x[0]]).map(x=>/−$/.test(x[0])?`${x[0]}${x[1]}`:`${x[0]} +${x[1]}`));
 const ls=(up?[]:["lòng vui lắng xuống"]).concat(P.L.filter(x=>(x[1]||x[6])&&!EA_OWN[x[0]]).map(x=>x[6]||`${x[0]} ${x[5]?"+":"−"}${x[1]}`));const pm=P.L.find(x=>x[0]==="cấm túc");if(pm)ls.push(`có thể bị cấm túc (${chanceW(pm[4])})`);
 return[gs.length?`thành: ${gs.join(", ")}`:"",ls.length?`kèm: ${ls.join(", ")}`:""].filter(Boolean).join(" · ")}
window.eaOpts=eaOpts;window.eaPx=eaPx;window.eaOptX=eaOptX;window.eaOptFx=eaOptFx;window.eaCapAdd=eaCapAdd;
function eaPick(p,g){const T=eaTemper(p),kd=eaKind(p);/* TEMPER-OUTBURST law 1: a consort picks from the SAME option list as hers (temper weight, near-best) */if(kd==="c"){const O=eaOpts(p,null,g);if(!O.length)return null;const i=npwPick(O.map((r,j)=>j),j=>O[j].w0,{all:1});return i==null?null:{r:O[i],T}}
 const L=R_.filter(r=>r.who===kd&&r.g===g&&r.ok(p,T));if(!L.length)return null;const w=L.map(r=>Math.max(0,r.w(T)));/* NPC-PURPOSE G3: the reaction her temper ranks highest, near-best (never a weight-blind draw) */const i=npwPick(L.map((r,j)=>j),j=>w[j],{all:1});return i==null?null:{r:L[i],T}}
window.eaPick=eaPick;
/* ======================= (3) OUTBURSTS: what each reaction does ======================= */
/* returns {h: story lines, past: the real numbers} for her event; NPC: applies and returns a news line */
/* jtperc (temper perception, seat T2): every outburst passes the ONE onlooker rule (window.tpOut) after it lands */
function eaDo(p,r){const at=typeof window.tpAt==="function"?window.tpAt(p,null):null;/* who stood there when it started */const o=eaDo0(p,r);try{if(o&&typeof window.tpOut==="function")window.tpOut(p,r,o,at)}catch(e){}return o}
function eaDo0(p,r){const F=BAL.ea.fx[r.k]||{vent:BAL.ea.ventDef},me=p===S,res=[];let h="",target=null;const add=(t)=>res.push(t);
 /* the outburst spends the feeling: her bar moves toward calm (down from joy, up from a low mood); TEMPER-OUTBURST: an option of the choice (r.pv) vents BAL.ea.pick.vent, the same for all */
 const VV=r.pv?BAL.ea.pick.vent:F.vent;const vent=()=>{if(me){const d=ventMe((eaMV()>0?-1:1)*VV,lc1(r.n));if(d)add(`tâm trạng ${sgn(d)}`)}else ventNpc(p,VV)};
 const pay=(o)=>{if(me){if(!r.fxPaid)apply(o)}else ap(p,o);/* TEMPER-OUTBURST: her option row's fx already paid her own stats (j3 chooseM applies fx, then go) */for(const k in o){const lb=EA_LB[k]||(typeof NAMES!=="undefined"&&NAMES[k]);if(o[k]&&lb)add(me?`${lb} ${sgn(o[k])}`:eaN(p,lb,o[k]))}};
 const ml=maidOf(p);const M=ml.length?eaVictim(ml):null;
 switch(r.k){
 case"dapdo":pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0)),danh:-F.danh});h=me?"Cơn giận dồn nén mấy hôm bỗng trào lên. Ngươi hất tay, chén trà, bình hoa vỡ tan dưới đất; cung nhân sợ hãi quỳ rạp thu dọn.":`${Nm(p)} nổi giận đập vỡ đồ trong cung.`;break;
 case"mang":loyAdd(M,-F.loy);add(`thiện cảm ${me?"cung nữ":M.name} −${F.loy}`);h=me?`Một chuyện nhỏ cũng khiến ngươi phát cáu. Ngươi quát mắng ${M.name} một trận; nàng cúi đầu, mắt đỏ hoe.`:`${Nm(p)} quát mắng cung nữ ${M.name} một trận.`;try{emoEv(M,"loyalDown","bị chủ nhân quát mắng")}catch(e){}break;
 case"danh":loyAdd(M,-F.loy);add(`thiện cảm ${me?"cung nữ":M.name} −${F.loy}`);pay({duc:-F.duc,danh:-F.danh});h=me?`Cơn giận không kìm nổi, ngươi sai người đánh ${M.name} mấy roi vì một lỗi nhỏ. Chuyện lọt ra ngoài, cung nhân các cung bàn tán.`:`${Nm(p)} nổi giận, sai đánh cung nữ ${M.name}.`;try{emoEv(M,"punished","bị chủ nhân đánh")}catch(e){}break;
 case"khac":{const o=eaOtherMaid(p);if(!o)return null;target=o.who;const hi=rkOf(o.who)>rkOf(p);try{emoEv(o.m,"punished",`bị ${nm(p)} mắng`)}catch(e){}
  if(o.who===S){eaHitMine(p,o.m);h=`${Nm(p)} mắng cung nữ ${o.m.name} của cung ngươi.`;break}
  if(hi){if(me){eaS().hoi.push({id:o.who.id,m:o.m.name,w:W()});add(`${nm(o.who)} sẽ đến hỏi tội`)}else{oanAdd(o.who,p,F.hiOan);if(o.who.queen||rkOf(o.who)>=rkOf(p)+F.punRk)punish(p,`mắng cung nữ của ${o.who.name}`,1)}}
  else{oanAdd(o.who,p,F.oan);if(me)add(`${nm(o.who)} ${pvOan(o.who,F.oan,"oán ngươi")}`)/* RV5 (LAW 11): oanAdd scales by her nết slight — print the same preview */}
  h=me?`Gặp một cung nữ của ${nm(o.who)} ở hành lang, ngươi trút cơn giận lên nàng, mắng một trận nặng lời.${hi?` Chủ nhân nàng phẩm vị cao hơn ngươi: “đánh chó phải nhìn mặt chủ”.`:""}`:`${Nm(p)} mắng cung nữ ${o.m.name} của ${o.who.name}.`;break}
 case"pham":{const t=eaSuperior(p);if(!t)return null;target=t;relAdd(p,t,-F.rel);pay({danh:-F.danh});eaS2c(p).pham=W();/* TEMPER-OUTBURST: cấm túc on a roll of BAL.ea.pick.phamP (its word on the option), no longer sure */if(roll(BAL.ea.pick.phamP)){punish(p,`phạm thượng với ${t.queen?"Hoàng hậu":t.name}`,1);if(me)add("bị cấm túc")}if(me)add(`${t.queen?"Hoàng hậu":nm(t)} thiện cảm −${F.rel}`);
  h=me?`Lúc thỉnh an, ${t.queen?"Hoàng hậu":nm(t)} nói một câu, ngươi không nhịn nổi mà cãi lại trước mặt mọi người. Cả điện lặng ngắt.`:`${Nm(p)} cãi lại ${t.queen?"Hoàng hậu":t.name} trước mặt mọi người.`;break}
 case"khoc":case"tui":pay({suc:-F.suc});h=me?(r.g==="ghen"?"Nghĩ đến người kia được sủng, ngươi tủi thân, đóng cửa khóc một mình.":r.g==="gian"?"Uất ức mà chẳng dám nói ra, ngươi chỉ biết khóc.":"Đêm ấy ngươi khóc suốt, gối ướt đẫm."):`${Nm(p)} ${lc1(r.n)}.`;break;
 case"boan":case"matngu":pay({suc:-F.suc});h=me?(r.k==="boan"?"Mấy hôm liền ngươi chẳng buồn ăn uống, cơm canh dọn lên lại dọn xuống.":"Lo âu đè nặng, ngươi trằn trọc thức trắng đêm."):`${Nm(p)} ${lc1(r.n)}.`;break;
 case"thu":pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0))});h=me?"Ngươi ngồi viết một lá thư dài gửi về nhà, kể hết nỗi khổ trong cung, đút bạc cho thái giám mang ra ngoài.":`${Nm(p)} gửi thư về nhà kể khổ.`;break;
 case"soat":for(const s of staffOf(p))loyAdd(s,-F.loy);add(`lòng cung nhân −${F.loy}`);h=me?"Lòng bất an, ngươi sai lục soát khắp tẩm cung, hỏi han từng cung nhân. Ai nấy đều thấy mình bị nghi.":`${Nm(p)} sai lục soát khắp cung mình.`;break;
 case"cau":pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0))});h=me?"Ngươi sai người mang lễ đi khắp các chùa miếu, cầu khấn cho được bình an.":`${Nm(p)} sai người đi cầu khấn khắp nơi.`;break;
 /* emotion-acts-3 (review r1 FAIL #2): the one MOCKED likes the mocker less and bears a grudge; the mocker's own regard does not sink (the
     mocking vents it). r1 used relAdd(mocker, mocked) both ways: every jealous rival who mocked HER (≈3.5 a 100 tuần, she is the favourite they
     envy) liked her 10 less each time → more hatred → more mocking, a loop the OFF arm never had. Gain: vent; loss: Danh + an enemy made. */
  /* TEMPER-OUTBURST new rows (tho / theu: joy that needs no bạc, so a stingy temper also has ≥ 3) */
  case"nuot":pay({suc:-F.suc,duc:F.duc});h=me?"Cơn giận nghẹn nơi cổ, ngươi đóng cửa ngồi chép kinh đến khuya cho lòng dịu xuống; sáng ra người mỏi rã.":`${Nm(p)} nuốt giận, đóng cửa chép kinh.`;break;
  case"huong":pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0)),duc:F.duc});h=me?"Ngươi sai người sắm hương đèn, quỳ trước tượng Phật tụng kinh, mong lòng được lắng lại.":`${Nm(p)} thắp hương tụng kinh cho lòng lắng lại.`;break;
  case"trang":pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0)),sung:F.sung});h=me?"Ngươi sai mở rương lấy xiêm y mới, trâm ngọc mới, trang điểm lộng lẫy ngồi chờ ngự giá. Tin truyền đến tai Hoàng thượng.":`${Nm(p)} trang điểm lộng lẫy chờ ngự giá.`;break;
  case"tho":pay({suc:-F.suc,danh:F.danh});h=me?"Lòng vui, ngươi dạo vườn ngắm hoa, ngâm thơ đến tận khuya; sáng ra mấy câu thơ đã truyền khắp cung, còn người thì mỏi mệt.":`${Nm(p)} ngâm thơ ngắm hoa đến khuya.`;break;
  case"theu":pay({suc:-F.suc,sung:F.sung});h=me?"Lòng vui, ngươi ngồi thêu một chiếc túi thơm đến khuya rồi sai người dâng lên Hoàng thượng. Ngài cầm lên ngắm, khẽ mỉm cười.":`${Nm(p)} thêu túi thơm dâng Hoàng thượng.`;break;
  case"kexau":{const t=eaRival(p);if(!t)return null;target=t;if(t===S)apply({danh:-F.rd});else ap(t,{danh:-F.rd});oanAdd(t,p,F.oan);pay({danh:-F.danh});if(me){add(`${nm(t)} Danh −${F.rd}`);add(`${nm(t)} ${pvOan(t,F.oan,"oán ngươi")}`)}
   h=me?`Ngươi kể với cung nữ mấy chuyện chẳng hay về ${nm(t)}; chẳng mấy hôm lời đồn đã lan ra khỏi cung.`:`${Nm(p)} kể xấu ${t===S?"ngươi":t.name} với cung nữ; lời đồn lan khắp hậu cung.`;break}
  case"cham":{const t=eaMockT(p);if(!t)return null;target=t;affAdd(t,p,-F.rel);oanAdd(t,p,F.oan);if(me)add(`${nm(t)} thiện cảm −${F.rel}`);pay({danh:-F.danh});
  h=me?`Gặp ${nm(t)} ở ngự hoa viên, cơn ghen trào lên, ngươi buông mấy câu châm chọc. Người xung quanh nghe rõ cả.`:`${Nm(p)} châm chọc ${t===S?"ngươi":t.name} trước mặt mọi người.`;
  if(t===S&&!me)eaHitMe(p,"cham");break}
 case"thuong":{const st=staffOf(p);const b=Math.min(F.bac,me?S.bac:(p.bac||0));pay({bac:-b});for(const s of st)loyAdd(s,F.loy);add(`lòng cung nhân +${F.loy}`);h=me?"Lòng vui như mở hội, ngươi mở rương, thưởng bạc cho cả cung. Cung nhân mừng rỡ tạ ơn.":`${Nm(p)} vui vẻ thưởng bạc cho cung nhân.`;break}
 case"khoe":pay({danh:F.danh});try{if(me)ghenAll(F.ghen,"ngươi kể khoe ân sủng");else for(const x of liveC())if(x!==p)oanAdd(x,p,Math.round(F.ghen/BAL.ea.half))}catch(e){}if(me)add(`kẻ ganh ghen +${ghenN(F.ghen)}`);h=me?"Vui quá hóa đắc ý, ngươi kể chuyện ân sủng của mình với các phi tần. Có người cười theo, có người tái mặt.":`${Nm(p)} khoe khoang ân sủng với các phi tần.`;break;
 case"tiec":{pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0))});/* G3: she asks the two she likes best */const fr=[];{const P=liveC().filter(x=>x!==p);for(let n=0;n<F.n&&P.length;n++){const x=npwPick(P,y=>1+Math.max(0,aff(p,y)));if(!x)break;fr.push(x);P.splice(P.indexOf(x),1)}}const fd=fr.map(x=>affGot(x,p,()=>affAdd(x,p,F.aff)))/* the real rise per guest (law 4) */;if(me&&fr.length)add(fr.map((x,i)=>`${nm(x)} thiện cảm ${affTxt(fd[i])}`).join(", "));/* rv-plr4 r8 (undef-scan): x was out of scope here; each friend's gain is scaled by her own trust trait (j28 affAdd), so one line per person */
  h=me?"Lòng vui, ngươi bày tiệc trà, mời mấy vị tỷ muội sang ngắm hoa, chuyện trò đến chiều.":`${Nm(p)} bày tiệc trà mời các phi tần.`;break}
 case"hat":pay({suc:-F.suc,tai:F.tai});h=me?"Vui quá, ngươi ôm đàn ca hát đến tận khuya, sáng ra mệt rã rời.":`${Nm(p)} ca hát thâu đêm.`;break;
 case"ban":{const L=liveC();for(const x of L)ap(x,{bac:F.bac});try{const T=S.trieu,N=NK().e;if(T&&T.kho!=null){T.kho=clp(T.kho-N.kho,0,100);add(`quốc khố −${N.kho}`)}}catch(x){}
  if(!S.out){apply({bac:F.bac});eaHitMe(p,"ban");add(`Bạc +${F.bac}`)}h=`${Nm(p)} vui, ban thưởng khắp hậu cung${S.out?"":", ngươi cũng có phần"}.`;break}
 case"noi":{const t=eaTargetET(p);if(!t)return null;target=t;if(t===S){apply({sung:-F.sung});eaHitMe(p,"noi")}else ap(t,{sung:-F.sung});add(eaN(t,"Sủng",-F.sung));h=`Hoàng thượng nổi giận với ${t===S?"ngươi":t.name}.`;break}
 case"quo":{const t=eaTargetET(p);if(!t)return null;target=t;const Tq=eaTemper(p),Qm=Tq.k==="hot"?Q6().hot:Tq.k==="timid"?Q6().timid:1,th=Math.max(1,Math.round(F.th*Qm)),dn=Math.max(1,Math.round(F.danh*Qm));
  if(t===S){apply({th:-th});eaHitMe(p,"quo",{n:th,tk:Tq.k});add(`Thái hậu thiện cảm −${th}`)}else if((rivals||[]).includes(t)){ap(t,{danh:-dn});add(eaN(t,"Danh",-dn))}h=`Thái hậu ${QUO_W[Tq.k]} ${t===S?"ngươi":t.name}.`;break}
 /* ---- the Emperor ---- */
 case"eruou":{const E=S.emp,N=NK().e;E.eaQ=W();E.eaQx=0;E.mood=Math.max(E.mood||0,2);let ill="";if(!illOf(E)&&roll(N.ill)&&eaIll(E,"phonghan"))ill=", nhiễm phong hàn"
  h=`Hoàng thượng một mình uống rượu đến khuya; đêm ấy không lật thẻ bài${ill}.`;break}
 case"emat":{const E=S.emp;E.mood=Math.max(E.mood||0,2);E.eaQ=W();E.eaQx=NK().e.away;h=`Hoàng thượng mất ngủ, thức phê tấu chương; tuần này long nhan mệt mỏi, ít vào hậu cung.`;break}
 case"nghi":{const t=eaTargetET(p);if(!t)return null;target=t;const n=NK().e.sung;if(t===S){apply({sung:-n});eaHitMe(p,"nghi",{n})}else ap(t,{sung:-n});add(eaN(t,"Sủng",-n));h=`Hoàng thượng sinh lòng nghi kỵ ${t===S?"ngươi":t.name}.`;break}
 /* ---- Thái hậu ---- */
 case"tkinh":{const N=NK().t;let ill="";if(!S.thIll&&roll(N.ill)){eaIll(p,r.g==="so"?"matngu":"phonghan");ill="; sáng ra người nhiễm bệnh"}
  const L=[S].concat(liveC()).filter(x=>!(x===S&&(S.out||S.dead||S.confined)));const f=L.sort((a,b)=>(b.th||0)-(a.th||0))[0];if(f){target=f;ap(f,{suc:-N.suc,th:N.thUp});add(eaN(f,"Sức",-N.suc));add(f===S?`Thái hậu thiện cảm +${N.thUp}`:`Thái hậu quý nàng thêm +${N.thUp}`)}
  h=`Thái hậu ${lc1(r.n)}${f?`, gọi ${f===S?"ngươi":f.name} đến tụng kinh cùng`:""}${ill}.`;break}
 case"eyen":{const f=eaTopSung(),n=NK().e.sung;p.mood=0;if(f){target=f;ap(f,{sung:n});add(eaN(f,"Sủng",n))}for(const x of liveC())if(f&&x!==f)oanAdd(x,f,Math.round(BAL.ea.ext.oan/BAL.ea.half));
  h=`Hoàng thượng vui, mở yến ngắm hoa, chỉ gọi ${f?(f===S?"ngươi":f.name):"vài người"} ngồi gần; các cung khác để bụng.`;break}
 /* ---- men of the palace ---- */
 case"mcai":{const N=NK().m;loyAdd(p,-N.loy);eaAway(p,N.away);h=`${p.name} ${lc1(r.n)}, bị phạt về nhà ${N.away} tuần (Thiện cảm −${N.loy}).`;break}
 case"mbo":{const N=NK().m;eaAway(p,N.away);h=`${p.name} ${lc1(r.n)} ${N.away} tuần, vắng mặt trong cung.`;break}
 case"mruou":{const N=NK().m;loyAdd(p,-N.loy);const s=eaSick(p,"phonghan");h=`${p.name} uống rượu giải sầu, lỡ phiên trực (Thiện cảm −${N.loy})${s?", sinh bệnh":""}.`;break}
 case"mhoi":{const N=NK().m;if((p.tinh||0)>0){p.tinh=Math.max(0,(p.tinh||0)-N.tinh);add(eaN(p,"quý ngươi",-N.tinh));h=`${p.name} hậm hực ra mặt, lạnh nhạt với ngươi.`}else{loyAdd(p,-N.loy);h=`${p.name} hậm hực ra mặt, bị thượng quan trách (Thiện cảm −${N.loy}).`}break}
 case"mvui":{const N=NK().m;const half=Math.ceil(N.loy/BAL.ea.half);loyAdd(p,-half);const kn=(p.tinh||0)>=N.knT||(p.af||0)>=N.knA;if(kn){p.tinh=Math.min(100,(p.tinh||0)+N.tinh);add(eaN(p,"quý ngươi",N.tinh))}
  h=`${p.name} vui, mở tiệc đãi bằng hữu, mải vui lơ là việc (Thiện cảm −${half})${kn?`; gặp ngươi thì niềm nở hơn`:""}.`;break}
 /* ---- court eunuchs / Thái y viện ---- */
 case"okho":{const n=NK().o.af;eaAfAll(p,-n);h=`${p.name} ${lc1(r.n)} (các cung mất lòng y −${n}).`;break}
 case"okhoc":{const s=eaSick(p,r.g==="so"?"matngu":"phonghan");h=`${p.name} ${lc1(r.n)}${s?", sinh bệnh":", mấy hôm phờ phạc"}.`;if(!s)eaAfAll(p,-NK().one);break}
 case"ole":{const n=Math.ceil(NK().o.af/BAL.ea.half);eaAfAll(p,-n);h=`${p.name} ${lc1(r.n)}; việc các cung chậm trễ (các cung mất lòng y −${n}).`;break}
 case"ohoi":{const t=eaTopSung();if(!t)return null;target=t;const n=NK().o.af*BAL.ea.ohoiK;eaAfOne(p,t,-n);h=`${p.name} ${lc1(r.n)}: ${t===S?"ngươi":t.name} mất lòng y (lòng y −${n}).`;break}
 case"ovui":{const n=NK().o.af,half=Math.ceil(n/BAL.ea.half),f=eaAfFav(p);eaAfAll(p,-half);if(f)eaAfOne(p,f,n+half);h=`${p.name} vui, nâng đỡ ${f?(f===S?"ngươi":f.name):"người quen"} (thiện cảm y +${n}); các cung khác thấy y thiên vị (thiện cảm y −${half}).`;break}
 /* ---- ministers (news of the court) ---- */
 case"qgian":{const N=NK().q;p.pow=clp((p.pow||0)-N.pow,0,100);const c=eaClan(p,-1);if(c)tdRelAdd(p.c,c,-N.rel);h=`${p.name} (${p.c}) ${lc1(r.n)}${c?`, đắc tội phe ${c}`:""}: bị Hoàng thượng khiển trách (thế ở triều −${N.pow}).`;break}
 case"qbo":{const N=NK().q;p.pow=clp((p.pow||0)-N.pow,0,100);h=`${p.name} (${p.c}) ${lc1(r.n)}; việc bộ bỏ trễ (thế ở triều −${N.pow}).`;break}
 case"qhac":{const N=NK().q;const c=eaClan(p,-1);if(!c)return null;tdRelAdd(p.c,c,-N.rel);p.pow=clp((p.pow||0)+NK().one,0,100);h=`${p.name} (${p.c}) dâng sớ hặc phe ${c}: hai nhà càng thêm hiềm khích, y được thêm tiếng (thế ở triều +${NK().one}).`;break}
 case"qvui":{const N=NK().q;const c=eaClan(p,1);if(c)tdRelAdd(p.c,c,N.rel);p.pow=clp((p.pow||0)-NK().one,0,100);h=`${p.name} (${p.c}) ${lc1(r.n)}${c?`, thân thêm với phe ${c}`:""}; bị dèm là kết bè (thế ở triều −${NK().one}).`;break}
 /* ---- children ---- */
 case"kquay":{const n=NK().k.fond;p.fond=clp((p.fond||0)-n,0,100);h=`${p.name} ${lc1(r.n)}; Hoàng thượng nghe mà phiền (được thương −${n}).`;break}
 case"kbo":{const n=NK().k.hp;p.hp=clp((p.hp||0)-n,1,100);h=`${p.name} ${lc1(r.n)} (sức khỏe −${n}).`;break}
 case"khon":{const n=Math.ceil(NK().k.fond/BAL.ea.half);p.fond=clp((p.fond||0)-n,0,100);h=`${p.name} ${lc1(r.n)}, bị phụ hoàng chê nhỏ nhen (được thương −${n}).`;break}
 case"kvui":{const K=NK().k;p.fond=clp((p.fond||0)+K.fond,0,100);p.tal=clp((p.tal||0)-K.tal,0,100);add(eaN(p,"Tài",-K.tal));h=`${p.name} ${lc1(r.n)} (được thương +${K.fond}), mải chơi bỏ bài.`;break}
 /* ---- an EMOTION ACT of any non-consort (chosen to calm down): a calmer vent, a small price in the person's own stat ---- */
 case"act":{const kd=eaKind(p),N=NK(),a=N.act;let cost="";
  if(kd==="s"){const n=Math.max(1,Math.round(BAL.ea.fx.sk.loy*a));loyAdd(p,-n);cost=`Thiện cảm −${n}`}
  else if(kd==="m"){const n=Math.max(1,Math.round(N.m.loy*a));loyAdd(p,-n);cost=`bỏ một phiên trực, Thiện cảm −${n}`}
  else if(kd==="o"){eaAfAll(p,-N.one);cost=`việc các cung chậm một buổi, các cung mất lòng y −${N.one}`}
  else if(kd==="q"){p.pow=clp((p.pow||0)-N.one,0,100);cost=`nghỉ triều một buổi, thế ở triều −${N.one}`}
  else if(kd==="k"){p.tal=clp((p.tal||0)-N.one,0,100);cost="bỏ một buổi học";add(eaN(p,"Tài",-N.one))}
  else if(kd==="e"){p.eaQ=W();p.eaQx=N.e.away;cost="tuần này ít vào hậu cung"}
  else if(kd==="t"){if(!S.thIll&&roll(Math.round(N.t.ill*a))){eaIll(p,"phonghan");cost="nhiễm phong hàn"}else cost="miễn thỉnh an một buổi"}
  h=`${Nm(p)} ${lc1(r.n)} cho nguôi lòng${cost?`, ${cost}`:""}.`;break}
 case"cai":{const o=(eaOwner(p)?staffOf(eaOwner(p)):[]).filter(s=>s!==p);/* G3: the quarrel is with the one she gets on worst with */const q=npwPick(o,x=>BAL.ea.victimBase+Math.min(100,-(((p.af||{})[x.sid])||0)))||null;loyAdd(p,-F.loy);loyAdd(q,-F.loy);h=`${p.name} cãi nhau${q?` với ${q.name}`:""}.`;break}
 case"sk":loyAdd(p,-F.loy);h=`${p.name} ${lc1(r.n)}.`;break;
 case"hang":loyAdd(p,F.loy);h=`${p.name} ${lc1(r.n)}.`;break;
 default:h=`${Nm(p)} ${lc1(r.n)}.`}
 vent();if(r.pv)eaCapAdd(p,r);if(!me&&res.length)h=eaL(h,res);return{h,res,target}}
function eaOwner(s){if(s===S.maid||(S.staff||[]).includes(s))return S;for(const v of rivals||[])if((v.staff||[]).includes(s))return v;return null}
/* an NPC's outburst lands on her (her maid, her standing): one event, kit frame */
/* at most ONE event a tuần from other people's outbursts (BAL.ea.npc.meWk); the rest go to the log */
function eaMeSlot(){const A=eaS(),w=W();if(A.hitW===w&&(A.hitN||0)>=E().npc.meWk)return false;if(A.hitW!==w){A.hitW=w;A.hitN=0}A.hitN++;return true}
function eaHitMine(p,m){try{if(!m)return;const lower=rkOf(p)<S.rank&&!S.out;loyAdd(m,-E().hoi.hitLoy);EA_N.hoiMe++;
  if(lower&&eaMeSlot())eaHitMineCard(p,m);
  else{log(`${Nm(p)} mắng cung nữ ${m.name} của ngươi; ${Nm(p)} phẩm vị cao hơn, ngươi đành nuốt giận.`);try{emoEv(S,"slight",`${nm(p)} mắng cung nữ của ngươi`,emoKey(p))}catch(e){}}}catch(e){}}
/* save-unseen-lists r4 (LAW 11 / 6c): the card is BUILT by a registered generator (j3 rcpReg: the scolder + her maid as ids); the maid's loyalty loss
   and the counters happen before, once — it is written into the sổ and made again on load */
const eaHitMineCard=rcpReg("eaHitMine",(p,m)=>{if(!p||!m)return null;const c={ev:1,t:"Cung nữ bị ức hiếp",emoSeal:{k:"gian",who:emoKey(p)},who:eaWho(p),art:"img/act-phat-vo-co-h.webp",h:`<p>${m.name} chạy về, mắt đỏ hoe: ${nm(p)} gặp nàng ở hành lang, trút giận mắng nàng một trận chẳng vì lỗi gì.</p><p>${Nm(p)} phẩm vị thấp hơn ngươi.</p>`,
   opts:[{n:`Sang hỏi tội ${nm(p)}`,risk:"an toàn",hint:"giữ thể diện cho cung mình",x:`thành: Danh +${E().hoi.go.danh}, thiện cảm ${m.name} +${E().hoi.go.loy} · kèm: ${pvOan(p,E().hoi.go.oan,`${nm(p)} oán ngươi`)}`,fx:{danh:E().hoi.go.danh},go:()=>{loyAdd(m,E().hoi.go.loy);oanAdd(p,S,E().hoi.go.oan);log(`Ngươi sang hỏi tội ${nm(p)}; nàng đành cúi đầu nhận lỗi.`)}},
    {n:"Bỏ qua",risk:"an toàn",hint:"giữ hòa khí",x:`thành: Đức +${E().hoi.let.duc} · kèm: thiện cảm ${m.name} −${E().hoi.let.loy}`,fx:{duc:E().hoi.let.duc},go:()=>{loyAdd(m,-E().hoi.let.loy);log(`Ngươi bảo ${m.name} nhịn đi cho êm chuyện.`)}}]};Q.push(c);return c});
function eaHitMe(p,k,o){try{o=o||{};cnt(EA_N.hitMe,k);const F=BAL.ea.fx[k]||{};const tk=o.tk||"even";
 if(!eaMeSlot())return;
 const quoH={hot:"Thái hậu đang giận, lúc thỉnh an đập tay xuống án, quở mắng ngươi nặng lời trước mặt mọi người.",even:"Thái hậu đang không vui, lúc thỉnh an nghiêm giọng quở trách ngươi mấy câu trước mặt mọi người.",timid:"Thái hậu đang không vui, lúc thỉnh an thở dài, khẽ trách ngươi mấy câu."}[tk];
 const T={cham:["Bị châm chọc",`<p>${Nm(p)} gặp ngươi ở ngự hoa viên, buông mấy câu châm chọc chua cay. Người xung quanh nghe rõ cả.</p>`,`${Nm(p)} mất mặt (Danh −${F.danh}); ngươi để bụng`,"img/act-dap-tra-mia-h.webp"],
  ban:[p===S.thO?"Thái hậu ban thưởng":"Hoàng thượng ban thưởng",`<p>${p===S.thO?"Thái hậu":"Hoàng thượng"} đang vui, ban thưởng khắp hậu cung. Thái giám mang bạc đến cung ngươi.</p>`,`Bạc +${F.bac}`,"img/act-thuong.webp"],
  noi:["Long nhan đại nộ",`<p>Hoàng thượng đang giận, một lời của ngươi chạm đúng chỗ phật ý. Ngài phất tay áo bỏ đi.</p>`,sgStat(-F.sung),"img/act-xu-toi-h.webp"],
  quo:["Thái hậu quở trách",`<p>${quoH}</p>`,`Thái hậu thiện cảm −${o.n||F.th}`,"img/act-xu-toi-h.webp"],
  nghi:["Hoàng thượng nghi kỵ",`<p>Hoàng thượng mấy hôm nay nhìn ngươi khác hẳn, hỏi han mấy câu bóng gió rồi lạnh nhạt bỏ đi.</p>`,sgStat(-(o.n||0)),"img/act-xu-toi-h.webp"],
  egian:["Long nhan đại nộ",`<p>Hoàng thượng giận dữ đã mấy tuần, giận lây cả hậu cung: chẳng ai được ngài cho sắc mặt tốt.</p>`,o.past||"","img/act-xu-toi-h.webp"],
  evui:["Hoàng thượng sủng ái ra mặt",`<p>Hoàng thượng vui vẻ mấy tuần liền, ngày nào cũng gọi ngươi bầu bạn, ban thưởng không ngớt. Các cung nhìn ngươi bằng ánh mắt khác.</p>`,o.past||"","img/act-thuong.webp"],
  tgian:["Thái hậu quở cả hậu cung",`<p>Thái hậu giận đã mấy tuần; buổi thỉnh an hôm nay, người ${QUO_W[tk]} cả hậu cung, chẳng ai dám ngẩng đầu.</p>`,o.past||"","img/act-xu-toi-h.webp"],
  tvui:["Thái hậu thiên vị",`<p>Thái hậu vui vẻ mấy tuần liền, buổi thỉnh an nào cũng giữ ngươi lại trò chuyện. Các phi tần khác đứng nhìn, ai nấy đều để bụng.</p>`,o.past||"","img/act-thuong.webp"]}[k];if(!T)return;
  Q.push({t:T[0],emoSeal:{k:{cham:"gian",ban:"vui",noi:"gian",quo:"gian",nghi:"ghen",egian:"gian",evui:"vui",tgian:"gian",tvui:"vui"}[k],who:emoKey(p)},who:p===S.emp||p===S.thO?undefined:eaWho(p),art:T[3],hideOut:true,h:T[1]+(T[2]?`<p class="past">${T[2]}</p>`:""),opts:[{n:"Tiếp tục",fx:{},hideOut:true,hint:"không đổi gì thêm",risk:"an toàn",go:()=>{}}]})}catch(e){}}
/* her outburst: TEMPER-OUTBURST (OD 25/11 ~05:45Z (1), canon overwrite of the old "kit event frame, no choice"): the kit event frame with the
   options of eaOpts (up to BAL.ea.pick.n, no hold-back); each row shows its real gain and loss (eaOptX) and runs the reaction when tapped.
   run(r) = the reaction runner (jemoact eaDo, or jfeel feelDo for its acts); done(r, o) = after it ran (jfeel: the act face + counters).
   bot / no UI: she picks like an NPC (temper weight, near-best). */
function eaMeChoose(O,why,o){o=o||{};const run=o.run||eaDo;const go1=(r,only)=>{let out=null;try{out=run(S,r)}catch(e){console.error("eaMeChoose",e)}
  if(!out&&!only){for(const x of O){if(x.k===r.k)continue;try{out=run(S,x)}catch(e){}if(out){r=x;break}}}if(!out)return null;cnt(EA_N.out,r.k);cnt(EA_N.outT,eaTemper(S).k+":"+(o.g||r.g));
  log(`${r.n}: ${out.h}${out.res.length?` (${out.res.join(", ")})`:""}`);try{if(o.done)o.done(r,out)}catch(e){}return out};
 if(!O||!O.length)return false;
 if(window.__bot||typeof Q==="undefined"){const i=npwPick(O.map((r,j)=>j),j=>O[j].w0,{all:1});return !!go1(O[i==null?0:i])}
 EA_N.choice=(EA_N.choice||0)+1;
 eaMeCard(O.map(r=>[r.k,r.g,r.w0]),why,o.mode||"",o.g||"",o.seal||"",o.t||"");return true}
/* save-unseen-lists r4 (LAW 11 / 6c): her outburst card (made at the turn of a buổi / tuần: jfeel feelActTick, eaWeek) is BUILT by a registered
   generator from plain data — each option as its reaction key + group + weight (the reaction rows R_ are code tables, looked up again), the runner
   by name (mode "feel" = jfeel feelDo + feelActFin, else eaDo) — so it is written into the sổ and made again on load; nothing runs before the pick */
const eaMeCard=rcpReg("eaMe",(K,why,mode,g,seal,t)=>{const O=(K||[]).map(([k,gg,w0])=>{const r=R_.find(x=>x.k===k&&x.who==="c"&&x.g===gg)||R_.find(x=>x.k===k&&x.who==="c");return r?Object.assign({},r,{pv:1,w0}):null}).filter(Boolean);if(!O.length)return null;
 const feel=mode==="feel"&&typeof feelDo==="function"&&typeof window.feelActFin==="function";const run=feel?feelDo:eaDo,done=feel?(r,out)=>window.feelActFin(S,g,r,out):null;
 const go1=(r,only)=>{let out=null;try{out=run(S,r)}catch(e){console.error("eaMeChoose",e)}
  if(!out&&!only){for(const x of O){if(x.k===r.k)continue;try{out=run(S,x)}catch(e){}if(out){r=x;break}}}if(!out)return null;cnt(EA_N.out,r.k);cnt(EA_N.outT,eaTemper(S).k+":"+(g||r.g));
  log(`${r.n}: ${out.h}${out.res.length?` (${out.res.join(", ")})`:""}`);try{if(done)done(r,out)}catch(e){}return out};
 const c={ev:1,eaOut:1,t:t||"Lòng không giữ được",emoSeal:{k:seal||O[0].g,who:"me"},art:`img/act-${O[0].art||"trut-gian-h"}.webp`,
  h:`<p>Vì ${why} quá nên lòng không giữ được, ngươi phải trút ra một cách.</p><p class="past">Chọn một trong ${O.length} cách; muốn tránh thì nên giữ lòng bình thản từ sớm.</p>`,
  opts:O.map(r=>{const fx=eaOptFx(S,r);return{n:r.n,x:eaOptX(S,r),fx,go:()=>{const r2=Object.assign({},r,{fxPaid:1});if(!go1(r2,1)){/* the reaction could not run (its target is gone): her fx back, another option runs */const u={};for(const k in fx)u[k]=-fx[k];apply(u);go1(r)}}}})};Q.push(c);return c});
window.eaMeChoose=eaMeChoose;
function eaMeOut(g){const O=eaOpts(S,null,g);if(!O.length)return false;
 const why={gian:"giận",buon:"buồn",so:"lo âu",ghen:EMO_GHEN.toLowerCase(),vui:"vui"}[g];return eaMeChoose(O,why,{g,seal:g})}
/* hỏi tội: the higher-rank mistress whose maid she scolded comes the next tuần (a real choice, gain and loss each) */
function eaHoi(){const A=eaS();if(!A.hoi.length)return;const x=A.hoi.shift();const v=(rivals||[]).find(r=>r.id===x.id&&r.alive&&!r.out);if(!v||S.out)return;EA_N.hoi++;eaHoiCard(v)}
/* save-unseen-lists r4: «… đến hỏi tội» (made at the turn of the tuần) is BUILT by a registered generator from the visitor (id); the queue entry is
   taken (A.hoi.shift) before, once */
const eaHoiCard=rcpReg("eaHoi",v=>{if(!v||v.alive===false)return null;const H=E().hoi;
 const vk=eaTemper(v).k;const o=oddsCl(H.try+(S.rank-rkOf(v))*H.rk+Math.round((S.danh||0)/H.dn)+(Q6().tryT[vk]||0));const ttl=v.queen?"Hoàng hậu":nm(v);
 const opts=[{n:"Tạ lỗi, đền bạc",risk:"an toàn",hint:"êm chuyện, nhưng mất thể diện",x:`thành: ${ttl} ${pvQuy(v,H.aff,"thiện cảm")}, nguôi giận`,fx:{bac:-H.bac,danh:-H.danh},go:()=>{affAdd(v,S,H.aff);/* fix 2: the same forgiveness rule (netForgive); the silver still pleases her */if(!netForgive(v,S)){/* review/pace-all S2 (jmend family): a refused apology takes no Danh — the bạc stays paid (the maid is compensated), the face is handed back */if(H.danh)apply({danh:H.danh});log(`Ngươi tạ lỗi với ${ttl}, đền bạc cho cung nữ của nàng; nàng nhận bạc nhưng chưa nguôi giận (không mất thể diện).`);return}oanAdd(v,S,-H.oan);log(`Ngươi tạ lỗi với ${ttl}, đền bạc cho cung nữ của nàng.`)}}];
 if(S.maid)opts.push({n:"Đổ lỗi cho cung nữ hỗn hào",risk:"an toàn",hint:"giữ thể diện, cung nữ chịu tội thay",x:`thành: giữ thể diện · kèm: thiện cảm ${S.maid.name} −${H.loy}`,fx:{},go:()=>{loyAdd(S.maid,-H.loy);log(`Ngươi đổ cho ${S.maid.name} hỗn hào; ${S.maid.name} quỳ chịu tội thay.`)}});
 opts.push({n:"Cãi lý",risk:"liều",hint:"có thể giữ được thể diện, có thể chuốc họa",x:`${word(o)} · thành: Danh +${H.win} · hỏng: Danh −${H.lose}, ${pvOan(v,H.oan,`${ttl} oán`)}`,fx:{},go:()=>{if(roll(o)){apply({danh:H.win});log(`Ngươi cãi lý với ${ttl}: cung nữ kia hỗn trước. ${ttl} đành bỏ qua.`)}else{apply({danh:-H.lose});oanAdd(v,S,H.oan);log(`<span class="r">Ngươi cãi lý với ${ttl}, không ai bênh; chuyện lan khắp hậu cung.</span>`)}}});
 const c={ev:1,t:`${ttl} đến hỏi tội`,emoSeal:{k:"gian",who:emoKey(v)},who:eaWho(v),art:"img/act-xu-toi-h.webp",h:`<p>${{hot:`${ttl} dẫn theo cung nữ hôm trước xông vào cung ngươi, đập tay xuống án: “Đánh chó còn phải nhìn mặt chủ. Người của bản cung, muội muội cũng dám mắng?”`,even:`${ttl} dẫn theo cung nữ hôm trước đến cung ngươi, nghiêm giọng: “Đánh chó còn phải nhìn mặt chủ. Người của bản cung làm gì sai mà muội muội phải mắng?”`,timid:`${ttl} dẫn theo cung nữ hôm trước đến cung ngươi, khẽ nói: “Muội muội, người của ta có chỗ nào thất lễ, muội cứ bảo ta dạy lại. Mắng giữa hành lang thế, người ngoài cười cả hai cung.”`}[vk]}</p><p>Cung nữ kia đứng sau, mắt còn đỏ.</p>`,opts};Q.push(c);return c});
window.eaHoi=eaHoi;window.eaHitMe=eaHitMe;window.eaMeOut=eaMeOut;window.eaS=eaS;/* test hooks: dev/test/mood-seal-ev.js */
/* ======================= (2) EXTREME MOOD ======================= */
function eaExtMe(){const M=eaMine(),A=eaS(),X=E().ext,w=W();const ext=Math.abs(M.i)>=2&&M.hv?M.g:null;
 if(ext&&A.xk===ext)A.xn=(A.xn||0)+1;else{A.xk=ext;A.xn=ext?1:0}
 if(!ext||A.xn<X.wk||(A.xcd||0)>w)return false;A.xcd=w+X.cd;A.xn=0;cnt(EA_N.ext,ext);const ui=!window.__bot&&typeof Q!=="undefined";
 let t,h,past,art;
 if(ext==="buon"||ext==="ghen"){catchIll(S,"tambenh");t="Ưu uất thành bệnh";art="img/ev-benh-tat.webp";h=`<p>Nỗi buồn đè nặng mấy tuần liền, ngươi biếng ăn mất ngủ. Thái y bắt mạch, lắc đầu: “Tâm bệnh còn phải tâm dược chữa.”</p>`;past="Mắc Tâm bệnh"}
 else if(ext==="gian"){apply({danh:-X.danh});t="Lỡ lời";art="img/act-dap-tra-mia-h.webp";h=`<p>Cơn giận ủ mấy tuần liền, lúc thỉnh an ngươi buột miệng một câu nặng lời. Lời nói ra như bát nước hắt đi, cả hậu cung truyền tai nhau.</p>`;past=`Danh −${X.danh}`}
 else if(ext==="vui"){try{ghenAll(X.ghen,"ngươi đắc ý ra mặt")}catch(e){}A.smug=w+X.smugWk;t="Đắc ý quên mình";art="img/ev-tin-don.webp";h=`<p>Mấy tuần liền mọi chuyện thuận lợi, ngươi vui ra mặt, nói cười chẳng giữ ý. Kẻ ganh ghét bắt đầu thì thầm sau lưng.</p>`;past=`Kẻ ganh ghen +${ghenN(X.ghen)}; ${X.smugWk} tuần tới kẻ ganh ghen thêm`}
 else if(ext==="so"){catchIll(S,"matngu");t="Lo âu mất ngủ";art="img/act-xa-huong.webp";h=`<p>Lo âu mấy tuần liền, đêm nào ngươi cũng trằn trọc đến canh năm. Thái y nói ngươi mắc chứng mất ngủ.</p>`;past="Mắc Chứng mất ngủ"}
 log(`<span class="r">${t}.</span> ${past}.`);
 if(ui)Q.push({t,emoSeal:{k:ext,who:"me"},art,hideOut:true,h:`${h}<p>Cảm xúc cực độ kéo dài ${X.wk} tuần trở lên thì sinh chuyện.</p><p class="past">${past}</p>`,opts:[{n:"Tiếp tục",fx:{},hideOut:true,hint:"không đổi gì thêm",risk:"an toàn",go:()=>{}}]});return true}
/* smug: rivals grow more jealous of her for smugWk tuần */
(function(){if(typeof ghenAll!=="function")return;const g0=ghenAll;ghenAll=function(n){try{if(n>0&&eaOn()&&S.ea&&S.ea.smug>W()){n=Math.round(n*E().ext.smugK);arguments[0]=n}}catch(e){}return g0.apply(this,arguments)}})();
function eaExtNpc(p,g){const X=E().ext,w=W(),e=p.emo;const ext=e&&g&&eaBarOk(p,g,E().npc.bar.ext)?g:null;
 const z=p.eaX||(p.eaX={});if(ext&&z.k===ext)z.n=(z.n||0)+1;else{z.k=ext;z.n=ext?1:0}
 if(!ext||z.n<X.wk||(z.cd||0)>w)return;z.cd=w+X.cd;z.n=0;const kd=eaKind(p);cnt(EA_N.npcExt,kd+":"+ext);const N=NK();let line="";const sad=ext==="buon"||ext==="ghen";
 if(kd==="c"){
  if(sad){if(typeof catchIll==="function")catchIll(p,"tambenh");line=`${Nm(p)} ưu uất thành bệnh.`}
  else if(ext==="so"){if(typeof catchIll==="function")catchIll(p,"matngu");line=`${Nm(p)} lo âu đến mất ngủ.`}
  else if(ext==="gian"){ap(p,{danh:-X.danh});line=eaL(`${Nm(p)} giận quá lỡ lời`,[eaN(p,"Danh",-X.danh)])}
  else if(ext==="vui"){for(const x of liveC())if(x!==p)oanAdd(x,p,X.oan);line=`${Nm(p)} đắc ý ra mặt, bị người ganh ghét.`}}
 else if(kd==="s"){
  if(sad||ext==="so"){eaIll(p,sad?"tambenh":"matngu");line=`${p.name} ${sad?"ưu uất thành bệnh":"lo âu đến mất ngủ"}, phải nghỉ việc hầu.`}
  else{loyAdd(p,-X.loy);line=ext==="gian"?`${p.name} giận quá cãi lại chủ (Thiện cảm −${X.loy}).`:`${p.name} đắc ý, lười việc (Thiện cảm −${X.loy}).`}}
 else if(kd==="m"){
  if(sad||ext==="so"){eaIll(p,sad?"tambenh":"matngu");eaAway(p,N.m.xAway);line=`${p.name} ${sad?"ưu uất thành bệnh":"lo âu đến mất ngủ"}, cáo bệnh về nhà ${N.m.xAway} tuần.`}
  else if(ext==="gian"){loyAdd(p,-BAL.ea.extK*N.m.loy);eaAway(p,N.m.xAway);line=`${p.name} giận quá lỡ lời với thượng quan, bị phạt về nhà ${N.m.xAway} tuần (Thiện cảm −${BAL.ea.extK*N.m.loy}).`}
  else{loyAdd(p,-BAL.ea.extK*N.m.loy);line=`${p.name} đắc ý ra mặt, bị đồng liêu dèm pha (Thiện cảm −${BAL.ea.extK*N.m.loy}).`}}
 else if(kd==="o"){
  if(sad||ext==="so"){eaIll(p,sad?"tambenh":"matngu");line=`${p.name} ${sad?"ưu uất thành bệnh":"lo âu đến mất ngủ"}.`}
  else if(ext==="gian"){eaAfAll(p,-BAL.ea.extK*N.o.af);line=`${p.name} giận quá, làm khó khắp các cung (các cung mất lòng y −${BAL.ea.extK*N.o.af}).`}
  else{eaAfAll(p,-N.o.af);line=`${p.name} đắc ý, kiêu căng với các cung (các cung mất lòng y −${N.o.af}).`}}
 else if(kd==="q"){
  if(sad||ext==="so"){p.pow=clp((p.pow||0)-BAL.ea.extK*N.q.pow,0,100);line=`${p.name} (${p.c}) ${sad?"ưu uất":"lo âu"} cáo bệnh lâu ngày (thế ở triều −${BAL.ea.extK*N.q.pow}).`}
  else if(ext==="gian"){p.pow=clp((p.pow||0)-BAL.ea.extK*N.q.pow,0,100);const c=eaClan(p,-1);if(c)tdRelAdd(p.c,c,-N.q.rel);line=`${p.name} (${p.c}) giận quá lỡ lời trên triều, bị phạt bổng (thế ở triều −${BAL.ea.extK*N.q.pow}).`}
  else{p.pow=clp((p.pow||0)-BAL.ea.extK*N.q.pow,0,100);line=`${p.name} (${p.c}) tự mãn, bị các nhà dâng sớ hặc (thế ở triều −${BAL.ea.extK*N.q.pow}).`}}
 else if(kd==="k"){
  if(sad||ext==="so"){p.hp=clp((p.hp||0)-BAL.ea.extK*N.k.hp,1,100);if(sad)eaIll(p,"tambenh");line=`${p.name} ${sad?"buồn rầu sinh bệnh":"hoảng sợ, đêm nào cũng giật mình"} (sức khỏe −${BAL.ea.extK*N.k.hp}).`}
  else if(ext==="gian"){p.fond=clp((p.fond||0)-BAL.ea.extK*N.k.fond,0,100);p.tal=clp((p.tal||0)-N.k.tal,0,100);line=eaL(`${p.name} giận quá hỗn với thầy (được thương −${BAL.ea.extK*N.k.fond})`,[eaN(p,"Tài",-N.k.tal)])}
  else{p.fond=clp((p.fond||0)-N.k.fond,0,100);line=`${p.name} được chiều sinh kiêu, bị phụ hoàng răn (được thương −${N.k.fond}).`}}
 else if(kd==="e"){
  if(sad||ext==="so"){if(typeof catchIll==="function")catchIll(p,sad?"tambenh":"matngu");line=`Hoàng thượng ${sad?"ưu uất":"lo âu"} mấy tuần, long thể bất an.`}
  else if(ext==="gian"){const n=BAL.ea.extK*N.e.sung;for(const x of liveC())ap(x,{sung:-n});if(!S.out){apply({sung:-n});eaHitMe(p,"egian",{past:sgStat(-n)})}line=S.out?`Hoàng thượng giận lây cả hậu cung, các phi tần đều bị lạnh nhạt (Sủng của mỗi người −${n}).`:eaL("Hoàng thượng giận lây cả hậu cung, ngươi và các phi tần đều bị lạnh nhạt",[sgStat(-n)])}
  else{const f=eaTopSung(),n=BAL.ea.extK*N.e.sung;if(f){ap(f,{sung:n});if(f===S){try{ghenAll(X.ghen,"ngươi được Hoàng thượng ban thêm sủng ái")}catch(x){}eaHitMe(p,"evui",{past:`${sgStat(n)}; kẻ ganh ghen +${ghenN(X.ghen)}`})}else for(const x of liveC())if(x!==f)oanAdd(x,f,Math.round(X.oan/BAL.ea.half))}
   line=eaL(`Hoàng thượng vui, sủng ái ${f?(f===S?"ngươi":f.name):"người bên cạnh"} ra mặt; các cung ganh ghét`,[f?eaN(f,"Sủng",n):""])}}
 else if(kd==="t"){
  if(sad||ext==="so"){eaIll(p,sad?"tambenh":"matngu");line=`Thái hậu ${sad?"ưu uất":"lo âu"} mấy tuần, phượng thể bất an.`}
  else if(ext==="gian"){const n=BAL.ea.extK*N.t.th,tk=eaTemper(p).k;for(const x of liveC())ap(x,{th:-n});if(!S.out){apply({th:-n});eaHitMe(p,"tgian",{past:`Thái hậu thiện cảm −${n}`,tk})}line=S.out?`Thái hậu ${QUO_W[tk]} cả hậu cung (các phi tần đều mất lòng Thái hậu, −${n}).`:eaL(`Thái hậu ${QUO_W[tk]} cả hậu cung, ngươi cũng bị trách`,[`Thái hậu thiện cảm −${n}`])}
  else{const L=[S].concat(liveC()).filter(x=>!(x===S&&S.out));const f=L.sort((a,b)=>(b.th||0)-(a.th||0))[0],n=BAL.ea.extK*N.t.th;if(f){ap(f,{th:n});if(f===S){try{ghenAll(X.ghen,"ngươi được Thái hậu ưu ái")}catch(x){}eaHitMe(p,"tvui",{past:`Thái hậu thiện cảm +${n}; kẻ ganh ghen +${ghenN(X.ghen)}`})}else for(const x of liveC())if(x!==f)oanAdd(x,f,Math.round(X.oan/BAL.ea.half))}
   line=eaL(`Thái hậu vui, thiên vị ${f?(f===S?"ngươi":f.name):"người bên cạnh"} ra mặt; các cung để bụng`,[f===S?`Thái hậu thiện cảm +${n}`:f?`Thái hậu quý nàng thêm +${n}`:""])}}
 eaSay(p,line)}
/* ======================= THE TUẦN ======================= */
/* everyone but her: the one people list of jface (consorts, Emperor, Thái hậu, maids, servants, court, men, children) + the ministers */
function eaPeople(){const L=[];try{const seen=new Set([S]);const add=p=>{if(p&&typeof p==="object"&&!seen.has(p)&&p.alive!==false&&!p.dead){seen.add(p);L.push(p)}};
 if(typeof KIT_FACEFX!=="undefined"&&KIT_FACEFX.everyone){for(const p of KIT_FACEFX.everyone()){if(p===S.thO&&S.thDead)continue;if((rivals||[]).includes(p)&&(!p.alive||p.out||p.coop))continue;add(p)}}
 else{for(const v of liveC())add(v);if(S.emp)add(S.emp);if(S.thO&&!S.thDead)add(S.thO);for(const v of liveC())for(const s of v.staff||[])add(s);for(const s of S.staff||[])add(s);add(S.maid);
  for(const m of S.men||[])add(m);if(S.court)for(const c in S.court)if(S.court[c]&&S.court[c].name)add(S.court[c]);if(typeof allKids==="function")for(const [k] of allKids())add(k)}
 for(const h of eaMins())add(h)}catch(e){}return L}
/* ministers carry feelings too, from real causes (owner 13:40Z: every feeling has a recorded reason): their standing at court moved */
function eaMinFeel(){const N=NK().q;for(const h of eaMins()){
 /* their feeling fades by the same jemo rule as everyone's (EMO_DECAY; jemo's own decay loop does not reach the ministers) */
 const e=h.emo;if(e&&typeof EMO!=="undefined"&&EMO[e.k]){e.v=Math.max(0,Math.round(e.v-((typeof EMO_DECAY!=="undefined"&&EMO_DECAY[e.k])||BAL.eff.jemo.decayDef)));if(e.v<BAL.eff.jemo.floor)h.emo=null}
 const o=h.eaPw;h.eaPw=h.pow||0;if(o==null||typeof emoSet!=="function")continue;const d=(h.pow||0)-o,v=Math.min(N.vMax,N.v0+Math.abs(d)*N.vK);
 if(d>=N.dPow)emoSet(h,"vui",v,"thế ở triều lên");else if(d<=-N.dPow){const T=eaTemper(h);emoSet(h,T.k==="hot"?"gian":T.k==="timid"?"so":"buon",v,"thế ở triều sa sút")}}}
/* an emotion act of a non-consort: name per kind and feeling group */
const EA_NACT={m:{gian:"Ra thao trường luyện võ",buon:"Viết thư về quê",so:"Lên chùa thắp hương",ghen:"Uống rượu một mình",vui:"Đàn ca cùng bằng hữu"},
 o:{gian:"Ra sân sau đi bộ",buon:"Ngồi uống trà một mình",so:"Thắp hương cầu an",ghen:"Lẩm bẩm than thở",vui:"Pha trò với tiểu thái giám"},
 q:{gian:"Đóng cửa thư phòng viết chữ",buon:"Ngâm thơ uống rượu",so:"Đi lễ chùa",ghen:"Ngồi tính kế trong thư phòng",vui:"Mời bạn đánh cờ"},
 k:{gian:"Chạy nhảy ngoài vườn",buon:"Đòi mẹ ôm",so:"Ôm nhũ mẫu không rời",ghen:"Ngồi một góc dỗi",vui:"Thả diều trong vườn"},
 s:{gian:"Giặt giũ đập áo thật mạnh",buon:"Khóc thầm sau bếp",so:"Thắp nén hương cầu an",ghen:"Ngồi một góc dỗi",vui:"Vừa làm vừa hát khe khẽ"},
 e:{gian:"Ra vườn bắn cung",buon:"Một mình đọc sách",so:"Thắp hương ở Phụng Tiên điện",ghen:"Một mình đánh cờ",vui:"Mở tiệc ngắm hoa"},
 t:{gian:"Tụng kinh cho nguôi giận",buon:"Ngồi lần tràng hạt",so:"Thắp hương cầu an",ghen:"Ngồi lần tràng hạt",vui:"Ngắm hoa trong vườn"}};
function eaNpcWeek(){if(!eaHost())return;const N=E().npc;try{eaMinFeel()}catch(e){}
 for(const p of eaPeople()){const e=p.emo;const g=e&&e.v>=BAL.eff.jemo.floor&&eaLvOk(p,"card")?eaGrpK(e.k):null;eaExtNpc(p,g&&eaLvOk(p,"force")?g:null);if(!g)continue;const T=eaTemper(p),kd=eaKind(p);
  if(!eaActsJfeel()&&eaBarOk(p,g,E().npc.bar.out)){const ch=N.outCh*(E().out.t[T.k]||1);if(roll(ch)){const P=eaPick(p,g);if(P){const o=eaDo(p,P.r);if(o){cnt(EA_N.npcOut,kd+":"+P.r.k);cnt(EA_N.npcOutT,T.k);eaSay(p,o.h,o.target===S)}}}}
  else if(!eaBarOk(p,g,E().npc.bar.out)&&eaBarOk(p,g,N.bar.act)&&ag2Ch(p,N.actCh*(window.agOn&&agOn()?Math.min(BAL.ag.emo2.max,eaBarAbs(p)/N.bar.act):1))){/* AG-ALL-2: the stronger her feeling, the likelier she acts on it (her own inclination, BAL.ag.emo2) *//* the same emotion acts as hers, chosen to calm down: vent + the act's own price */
   const C=E().card,cg=g==="ghen"?"buon":g;
   if(kd==="c"){const L=Object.keys(C).filter(k=>C[k].g===cg&&!(C[k].bac&&(p.bac||0)<C[k].bac));if(!L.length)continue;/* G3: the way to calm down she can afford that eases her most, near-best */const k=npwPick(L,x=>1+(C[x].emo||Math.abs(C[x].mood||0)),{all:true}),c=C[k];const o={};if(c.bac)o.bac=-c.bac;if(c.suc)o.suc=-c.suc;if(c.danh)o.danh=-c.danh;if(c.tai)o.tai=c.tai;if(c.duc)o.duc=c.duc;ap(p,o);
    let m=null;if(c.loy){const ml=maidOf(p);if(ml.length){m=eaVictim(ml);loyAdd(m,-c.loy)}}if(c.oan)for(const x of liveC())if(x!==p)oanAdd(x,p,c.oan);
    ventNpc(p,c.emo||Math.abs(c.mood));cnt(EA_N.npcAct,kd+":"+k);const nmA={dapdo:"Đập đồ",mang:"Mắng cung nữ",khoc:"Khóc thầm",thu:"Viết thư nhà",dan:"Đàn hát tự thưởng",huong:"Thắp hương cầu an"}[k];
    const cost=Object.keys(o).map(x=>EA_LB[x]?eaN(p,EA_LB[x],o[x]):"").concat(m?[`thiện cảm ${m.name} −${c.loy}`]:[]);
    eaSay(p,eaL(`${Nm(p)} ${lc1(nmA)} cho nguôi lòng`,cost))}
   else{const nmA=(EA_NACT[kd]||{})[g];if(!nmA)continue;const o=eaDo(p,{k:"act",g,n:nmA});cnt(EA_N.npcAct,kd+":act");if(o)eaSay(p,o.h)}}}}
/* men sent home stay off the map (j22 S.menW); the Emperor who vents / drinks alone turns fewer tablets that tuần (j8 flip: no tablet turned, as j55 does when the realm is in trouble) */
(function(){if(typeof placeWhere!=="function")return;const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);try{if(S&&S.menW)for(const m of S.men||[])if((m.eaAway||0)>W())delete S.menW[m.id]}catch(e){}return r}})();
(function(){if(typeof flip!=="function")return;const f0=flip;flip=function(){try{const E=S&&S.emp;if(E&&E.eaQ===W()&&!window.__eaOff&&!roll(Math.round((E.eaQx||0)*100))){S.tonight=null;cnt(EA_N,"noFlip");return}}catch(e){}return f0.apply(this,arguments)}})();
/* (6) QUỞ TRÁCH BY TEMPER + MOOD: the Emperor's verdict (j8 punish → cấm túc) follows his feeling of the moment (angry +, joyful −, BAL.ea.quo)
   and his words follow his nết; one rule for her and every consort (the log line shows both). */
const QUO_E={hot:"Hoàng thượng đập bàn quát lớn",even:"Hoàng thượng nghiêm giọng hạ chỉ",timid:"Hoàng thượng thở dài hạ chỉ"};
(function(){if(typeof punish!=="function")return;const p0=punish;punish=function(p,why,sev){if(!eaOn()||!S.emp)return p0.apply(this,arguments);
 const q=typeof p==="string"?S:p;const c0=(q&&q.confined)||0;const Q=Q6(),e=S.emp.emo;const md=e&&e.v>=Q.v?(e.k==="gian"&&(e.t==null||e.t===(typeof emoKey==="function"?emoKey(q):""))?1:e.k==="vui"?-1:0):0;const tk=eaTemper(S.emp).k;let mNew=null;
 const l0=log;log=function(h){try{if(typeof h==="string"){const m=/bị cấm túc (\d+) tháng/.exec(h);if(m){const a=+m[1];mNew=Math.max(1,a+md*Q.mo);h=h.replace(m[0],`bị cấm túc ${mNew} tháng`).replace(/<\/span>$/,"")+` ${QUO_E[tk]}${md>0?"; ngài đang giận, phạt nặng thêm":md<0?"; ngài đang vui, phạt nhẹ đi":""}.</span>`;if(md)cnt(EA_N,md>0?"quoUp":"quoDn")}
  else if(/bị giáng xuống/.test(h))h=h.replace(/<\/span>$/,"")+` ${QUO_E[tk]}.</span>`}}catch(x){}return l0.apply(this,arguments)};
 let r;try{r=p0.apply(this,arguments)}finally{log=l0}
 try{if(mNew!=null&&q)q.confined=Math.max(c0,mNew)}catch(x){}return r}})();
/* (7) PILLOW TALK BY MOOD (j8 night1): her mood band moves each answer's grade (the ladder word is rebuilt by j8 nx from the same number),
   a hot temper in a furious anger cannot answer "Rót rượu, nũng nịu" (greyed through eaLockWhy, never a dead end: the quiet answer stays). */
(function(){if(typeof PEND==="undefined"||typeof PEND.night1!=="function")return;const n1=PEND.night1;PEND.night1=function(pp){const d=n1.apply(this,arguments);
 try{if(!eaOn()||!d||!Array.isArray(d.o)||typeof nx!=="function")return d;const M=eaMine();if(!M.b||!M.i)return d;const P=BAL.ea.pillow,T=eaTemper(S),band=M.b.name.toLowerCase();
  for(const o of d.o){const quiet=/^Lặng lẽ/.test(o.n),lively=/^(Bàn thơ văn|Rót rượu)/.test(o.n);let adj=0;
   if(M.i>=1){if(lively)adj=P.up}else if(!quiet)adj=-(M.i<=-2?P.dn2:P.dn);
   if(T.k==="hot"&&M.g==="gian"&&S.mood&&eaMV()<=-E().out.v&&/^Rót rượu/.test(o.n))o.eaLock=`ngươi đang ${band}, tính nóng, không nũng nịu nổi`;
   if(!adj)continue;const b=(o.od||0)+adj,g0=o.go;const w=String(nx(b,"")).split(" · ")[0];
   o.x=String(o.x||"").replace(/^[^·]+·/,w+" ·")+` · lòng ngươi đang ${band} (${adj>0?"dễ":"khó"} hơn)`;o.od=b;
   o.go=function(){pp.q=(pp.q||0)+adj;try{return g0.apply(this,arguments)}finally{pp.q-=adj}};cnt(EA_N,"pillow")}}catch(e){}return d}})();
function eaActsJfeel(){try{return typeof feelOn==="function"&&feelOn()&&!!(BAL.feel&&BAL.feel.act)}catch(e){return false}}
function eaWeek(){if(!eaOn())return;EA_N.wk++;const A=eaS(),w=W();if(A.wk===w)return;A.wk=w;
 try{eaHoi()}catch(e){console.error(e)}
 try{eaExtMe()}catch(e){console.error(e)}
 /* her outburst (FEELINGS-18: per buổi in jfeel feelActTick — heavy level + this bar line — while jfeel is on; this weekly path is the off-switch fallback) */
 try{if(!eaActsJfeel()){const M=eaMine(),O=E().out;const v=S.mood?Math.abs(eaMV()):0;if(M.g&&v>=O.v&&(A.ocd||0)<=w&&!(typeof isSrv==="function"&&isSrv())){const T=eaTemper(S);if(roll(O.ch*(O.t[T.k]||1))){if(eaMeOut(M.g)){A.ocd=w+O.cd;EA_N.outWk++}}}}}catch(e){console.error(e)}
 try{eaNpcWeek()}catch(e){console.error(e)}}
window.eaWeek=eaWeek;
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const w0=W();const r=e0.apply(this,arguments);try{if(S&&!S.dead&&W()!==w0)eaWeek()}catch(e){console.error(e)}return r}})();
/* ======================= (5) CHOICES THAT PERSONALITY + MOOD DECIDE (audit, owner 13:25Z B: "a timid person never dares phạm thượng
   however angry; a hot-tempered one may scold, smash, even phạm thượng") =======================
   In an event that offers both a holding-back answer (Nhịn, Im lặng, Làm ngơ, Cúi đầu…) and a hitting-back answer (Đáp trả, Cãi lại,
   Mắng thẳng mặt, Đối chất…) she can afford: a HOT-tempered her past the outburst line in anger cannot hold back (the holding-back answers are greyed,
   the reason in the answer's own line); a TIMID her at the lowest band does not dare hit back. Never greys every answer. Same option
   button (disabled, as when bạc is short), no new part. NPCs already pick by trait (persW) and feeling (jemo emoMul). */
const EA_HOLD=/^(Nhịn|Nhẫn nhịn|Nhịn cho êm|Nhịn lời mỉa mai|Im lặng|Im lặng ghi nhớ|Làm ngơ|Lờ đi|Cúi đầu nhận lỗi|Cúi đầu tránh đi|Cúi đầu đi qua như người lạ)$/;
const EA_HIT=/^(Đáp trả|Cãi lại|Mắng thẳng mặt|Đối chất|Vặn lại)/;
/* flight-choose-guard (law 11): an answer counts as open only when NO greying rule closes it (bạc short, kitOff, lock, lk(), tsDis, unmet need),
   else her temper could grey the last open road (arm B co-op H77P: every option of a «Kẻ hầu» card greyed with bạc 117) */
function eaFree(o){try{if(!o)return false;if(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0)return false;if(o.off||o.lock||o.tsDis)return false;if(o.need&&o.need.some(n=>n&&!n.ok))return false;if(typeof o.lk==="function"&&o.lk())return false;return true}catch(e){return false}}
function eaLockWhy(c,m){try{if(!eaOn()||!c||!m||!m.opts)return"";if(c.eaLock)return m.opts.some(o=>o&&o!==c&&!o.eaLock&&eaFree(o))?c.eaLock:"";const n=String(c.n||"").replace(/<[^>]+>/g,"").trim();const M=eaMine();if(!M.b)return"";const T=eaTemper(S);
  /* another answer she can really take (bạc enough) of the wanted kind must stay open: never a dead end (bot r3: "Làm ngơ" greyed while
     the only other answer cost bạc she lacked → stuck) */
  const usable=o=>o&&o!==c&&eaFree(o);const nmO=o=>String(o.n||"").replace(/<[^>]+>/g,"").trim();
  if(T.k==="hot"&&M.g==="gian"&&M.hv&&eaMV()<=-E().out.v&&EA_HOLD.test(n)&&m.opts.some(o=>usable(o)&&EA_HIT.test(nmO(o))))return`ngươi đang ${M.b.name.toLowerCase()}, tính nóng, không nhịn nổi`;
  if(T.k==="timid"&&M.i<=-2&&M.g&&M.hv&&EA_HIT.test(n)&&m.opts.some(o=>usable(o)&&!EA_HIT.test(nmO(o))))return`ngươi đang ${M.b.name.toLowerCase()}, tính nhút nhát, không dám`;}catch(e){}return""}
window.eaLockWhy=eaLockWhy;
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0];if(m&&m.opts)document.querySelectorAll("#modal .opts > button.opt[data-m]").forEach(b=>{const c=m.opts[+b.dataset.m];const why=eaLockWhy(c,m);if(!why)return;
  b.disabled=true;const sm=b.querySelector("small");if(sm)sm.textContent="Cần: "+why;if(!c.__eaN){c.__eaN=1;cnt(EA_N,"lock")}})}catch(e){}return r}})();
(function(){if(typeof chooseM!=="function")return;const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&m.opts&&eaLockWhy(m.opts[i],m)){/* the button is disabled; a script call (bots) takes the answer her temper allows */const j=m.opts.findIndex(o=>o&&!eaLockWhy(o,m)&&eaFree(o));if(j<0||j===i)return;arguments[0]=i=j}}catch(e){}return c0.apply(this,arguments)}})();
window.eaDo=eaDo;window.eaKeyOf=eaKeyOf;window.eaSay=eaSay;window.eaExtNpc=eaExtNpc;window.eaPeople=eaPeople;window.eaNpcWeek=eaNpcWeek;
window.eaStat=function(){return JSON.parse(JSON.stringify(EA_N))};
})();
