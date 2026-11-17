/* ================= jrest: HAI CÁCH NGHỈ — mỗi cách một lựa chọn thật (owner 11/15) =================
   Before: "Nghỉ ngơi dưỡng sức" (1 khắc, Sức +20, "uống thuốc bổ, ngủ sớm") and "Nghỉ ngơi một lát" (1 khắc, Sức +6) cost the same,
   so the second was never worth taking, and the first gave a tonic and a night's sleep for free in any buổi.
   Now each card does what its own text says (numbers: BAL.rest*):
   - Nghỉ ngơi dưỡng sức = uống thuốc bổ, ngủ sớm: chỉ buổi tối; dùng hết số khắc còn lại của buổi (ít nhất BAL.restDsMinK),
     tức là hết buổi tối; Sức +BAL.restDsSuc; cần một thang thuốc bổ trong rương (dùng thang rẻ nhất) HOẶC Bạc BAL.restDsBac mua thuốc.
   - Nghỉ ngơi một lát = mọi buổi, BAL.restLatK khắc, Sức +BAL.restLatSuc, không tốn gì, và bớt nỗi buồn/lo/giận… BAL.restLatEmo
     (jemo, chỉ khi tâm trạng đang xấu; bình thường hay vui thì không đổi — thẻ nói rõ).
   The cards are refreshed from the live state each time they are drawn or played, so Cần/Tốn/Được always match what happens. */
Object.assign(BAL,{restDsSuc:24,restDsBac:6,restDsMinK:2,restDsBuoi:"Buổi tối",restLatSuc:6,restLatK:1,restLatEmo:8});
const REST_BAD=["buon","gian","so","lo","ghen","dau"];
/* the cheapest tonic she owns (kind "Thuốc bổ"), or null */
function restTonic(){if(!S||!Array.isArray(S.inv))return null;let best=-1,pr=1e9;
 S.inv.forEach((e,i)=>{const it=e&&IT[e.k];if(it&&it.kd==="Thuốc bổ"&&!e.h&&!e.w&&(it.pr||0)<pr){pr=it.pr||0;best=i}});return best<0?null:{i:best,e:S.inv[best],it:IT[S.inv[best].k]}}
function restDsB(){const i=BUOI.indexOf(BAL.restDsBuoi);return i<0?BUOI.length-1:i}
function restDsK(){return Math.max(BAL.restDsMinK,4-(typeof used==="number"?used:0))}
function restDs(a){if(!a||a.rest!=="ds")return a;const T=restTonic(),k=restDsK();a.k=k;a.b=restDsB();a.o=100;a.w={suc:BAL.restDsSuc};a.l={};
 a.c=T?{}:{bac:-BAL.restDsBac};
 const B=BUOI[restDsB()].toLowerCase();a.t=`Uống thuốc bổ, ngủ sớm: ${(S.buoi||0)!==restDsB()?`chỉ ${B}, dùng hết số khắc còn lại của buổi.`:BAL.time.khac-used<BAL.restDsMinK?`cần còn ít nhất ${BAL.restDsMinK} khắc; hết ${B}.`:`dùng hết ${k} khắc còn lại, hết ${B}.`}${T?"":" Rương không có thuốc bổ: sai người mua một chén."}`;
 a.x="";a.restTon=T?`1 ${T.it.n} trong rương`:""; /* review R6: the tonic is a COST — it goes in the Tốn row (cardH below), not in a.x (a.x is read as Được); the "(thang thuốc bổ rẻ nhất…)" aside ran past the card at 844x390 */
 a.go=()=>{const t=restTonic();if(t&&!(a.c&&a.c.bac)){S.inv.splice(t.i,1);log(`Ngươi sắc ${t.it.n} uống rồi ngủ sớm.`)}else log("Ngươi sai người mua chén thuốc bổ, uống rồi ngủ sớm.")};return a}
function restLat(a){if(!a||a.rest!=="lat")return a;const e=typeof emoGet==="function"?emoGet(S):{k:"binh",v:0};const bad=REST_BAD.includes(e.k)&&e.v>=15;
 a.k=BAL.restLatK;a.c={};a.o=100;a.w={suc:BAL.restLatSuc};a.l={};
 a.t=`Nằm nghỉ trong tẩm cung, uống chén trà sen.${bad?"":` Tâm trạng đang ${typeof EMO==="object"&&EMO[e.k]?EMO[e.k].toLowerCase():"bình thường"}: không đổi.`}`;
 a.x=bad?`được: bớt ${EMO[e.k]} ${Math.min(BAL.restLatEmo,e.v)} (${e.v} → ${Math.max(0,e.v-BAL.restLatEmo)})`:"";
 a.go=()=>{const d=restLatEmo(S);if(d)log(`Nghỉ một lát, lòng nhẹ đi: bớt ${EMO[d[0]]} ${d[1]}.`)};return a}
/* ONE function (her card and an NPC's cx3:restLat, jagacts3): a bad feeling ≥ 15 eases by BAL.restLatEmo; returns [feeling, points eased] */
function restLatEmo(p){try{const m=p.emo;if(m&&REST_BAD.includes(m.k)&&m.v>=15){const v0=m.v;m.v=Math.max(0,m.v-BAL.restLatEmo);if(p===S)emoSync(S);return[m.k,v0-m.v]}}catch(x){}return null}
function restFix(a){return a&&a.rest==="ds"?restDs(a):a&&a.rest==="lat"?restLat(a):a}
/* mark the two cards wherever they are dealt */
(function(){const p0=pool;pool=function(){const A=p0.apply(this,arguments);try{for(const a of A)if(a&&a.n==="Nghỉ ngơi dưỡng sức"){a.rest="ds";restDs(a)}}catch(e){}return A}})();
(function(){const s0=j76stand;j76stand=function(){const A=s0.apply(this,arguments);try{for(const a of A)if(a&&a.n==="Nghỉ ngơi một lát"){a.rest="lat";restLat(a)}}catch(e){}return A}})();
/* refresh from the live state on every draw and before playing */
(function(){const ch=cardH;cardH=function(a){try{restFix(a)}catch(e){}let h=ch.apply(this,arguments);
 try{if(a&&a.rest==="ds"&&a.restTon)h=h.replace('<span class="kl">Tốn</span><span>',m=>m+eff(`<span class="r">${a.restTon}</span>`)+'<span class="ksep">·</span>')}catch(e){}return h}})();
(function(){const a0=act;act=function(i){try{if(Array.isArray(deck))restFix(deck[i])}catch(e){}return a0.apply(this,arguments)}})();
