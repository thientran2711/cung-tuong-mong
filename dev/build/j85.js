/* ================= j85 TỨ ĐỨC · ĐỨC CHO MỌI NGƯỜI · CÔNG DỤNG TỪNG MÔN TÀI NGHỆ (owner 11/14) =================
   1. Two new arts for every consort: Thêu thùa (theu), Nấu nướng (nau). Product quality API for j83 (works).
   2. Tứ đức = four courses p.vir {cong,dung,ngon,hanh} 0..5 (not bars); their effects land on existing stats and odds.
   3. Đức for EVERY consort: moves with real deeds (logged with the cause), seen only once she knows the person; Danh = the outside name.
      Low Đức: more danger (j24 ladder), less believed, servants easier to buy; high Đức: harder to frame, Thái hậu/Hoàng hậu favour.
   4. One table of concrete effects per art level and per course, shown in the Tài nghệ tab (true numbers, the same code applies them).
   5. Learning: with a teacher (bạc, faster) or alone (free, slower); NPCs study by the same rules every month.
   API: artLv(p,k) virLv(p,k) artBonus(p,k) virtueBonus(p,k) productTier(p,k) ducOf(p) ducAdd(p,n,why) ducOdds(p) ducShield(t) ducKnown(v) */
const VIR=[
 {k:"cong",n:"Công",full:"Nữ công",d:"Thêu thùa, may vá, bếp núc khéo tay: đồ tự làm lên phẩm cao hơn"},
 {k:"dung",n:"Dung",full:"Dung nghi",d:"Dáng đi, cách đứng, trang điểm hợp lễ: Sắc tăng, yến tiệc và lễ nghi dễ thành"},
 {k:"ngon",n:"Ngôn",full:"Lời nói",d:"Nói năng đúng mực: trò chuyện, kết giao, tố giác dễ thành; lỡ lời ít thiệt"},
 {k:"hanh",n:"Hạnh",full:"Đức hạnh",d:"Giữ nết hiền, thương người: Đức tăng, Thái hậu và Hoàng hậu quý"}];
/* ---- one-time gains when a level is reached (beyond the arts' base Tài/Sắc +2) ---- */
const VIRB={cong:{5:{danh:4}},dung:{1:{sac:2},3:{sac:2},5:{sac:2,danh:4}},ngon:{3:{tamco:1},5:{danh:4}},hanh:{1:{duc:3},2:{duc:3,th:3},3:{duc:3},4:{duc:3,th:3,hh:5},5:{duc:3,danh:4}}};
const ARTB85={ky:{1:{tamco:1},2:{tamco:1},4:{tamco:2},5:{tamco:2}},hoa:{2:{th:3},4:{th:5},5:{th:5}},vu:{4:{sac:2}},theu:{2:{th:2},4:{th:3}}};
/* ---- the effect table, level by level; every line is applied by code in this file or the module named ---- */
const ARTFX={
 cam:["Tài +2 · mỗi tháng tự đàn: Sức +1","Tài +2 · Đánh đàn ở Ngự hoa viên dễ thành hơn (mỗi bậc +4)","Tài +2, Danh +3 · mở «Đàn khúc Phượng cầu hoàng»: Sủng +12 khi thành","Tài +2 · dạy con đàn: mỗi tháng các con Tài +1","Tài +2, Danh +6 · mỗi tháng có Sủng từ 40: tiếng đàn làm Hoàng thượng vui lên một mức (một tháng trong hai)"],
 ky:["Tài +2, Tâm cơ +1 · dò la, mưu kế dễ thành hơn (mỗi bậc +2)","Tài +2, Tâm cơ +1","Tài +2, Danh +3 · mở «Đánh cờ với Hoàng thượng»: Sủng +5, Danh +2, Tâm cơ +1","Tài +2, Tâm cơ +2","Tài +2, Tâm cơ +2, Danh +6"],
 thi:["Tài +2 · Làm thơ dâng lên dễ thành hơn (mỗi bậc +4)","Tài +2 · đầu mỗi mùa thơ truyền ra ngoài: Danh +1","Tài +2, Danh +3 · mỗi tháng thơ đến tay Hoàng thượng: Sủng +1","Tài +2 · Bàn chuyện triều chính dễ thành hơn (mỗi bậc +3)","Tài +2, Danh +6 · mỗi tháng Sủng +2 (thay +1)"],
 hoa:["Tài +2 · thọ yến Thái hậu tháng mười dễ thành hơn (mỗi bậc +8)","Tài +2, Thái hậu +3 · đầu mỗi mùa tranh được truyền xem: Danh +1","Tài +2, Danh +3 · mở «Vẽ chân dung tặng Thái hậu»: Thái hậu +10","Tài +2, Thái hậu +5 · đầu mỗi mùa Danh +2 (thay +1)","Tài +2, Danh +6, Thái hậu +5"],
 vu:["Sắc +2 · được lật thẻ dễ hơn (mỗi bậc +2)","Sắc +2 · Múa trong yến tiệc (mỗi bậc +4), Chặn ngự giá (mỗi bậc +5) dễ thành hơn","Sắc +2, Danh +3 · mở «Kinh hồng vũ»: Sủng +15, Danh +3","Sắc +4","Sắc +2, Danh +6"],
 y:["Sắc +2 · được lật thẻ dễ hơn (mỗi bậc +1,5)","Sắc +2 · nhận ra độc, xạ hương trong đồ: phát giác mưu hại +20","Sắc +2, Danh +3 · mở «Tự bốc thuốc» khi đau ốm","Sắc +2 · tự bào chế thuốc an thai; chữa bệnh cho con: Sức khỏe con +30","Sắc +2, Danh +6 · mỗi tháng các con Sức khỏe +2"],
 theu:["Tài +2 · đồ thêu tự làm: phẩm +14 mỗi bậc (thang 100)","Tài +2, Thái hậu +2","Tài +2, Danh +3 · mỗi tháng gửi đồ thêu bán ra ngoài: Bạc +5","Tài +2, Thái hậu +3","Tài +2, Danh +6 · mỗi tháng Bạc +10 (thay +5)"],
 nau:["Tài +2 · món tự nấu: phẩm +14 mỗi bậc (thang 100)","Tài +2 · ăn uống điều độ: mỗi tháng Sức +2","Tài +2, Danh +3 · mỗi tháng canh bổ dâng Dưỡng Hòa điện: Ân tình +1","Tài +2 · mỗi tháng Sức +4 (thay +2)","Tài +2, Danh +6 · mỗi tháng Ân tình +2 (thay +1)"]};
const VIRFX={
 cong:["đồ thêu, món nấu tự làm: phẩm +4","phẩm +8 · học Thêu, Nấu: thêm 1 tiến bộ mỗi buổi","phẩm +12 · thành phẩm lên thêm 1 bậc (tới Tinh xảo)","phẩm +16","phẩm +20 · thành phẩm lên thêm 2 bậc · Danh +4"],
 dung:["Sắc +2 · yến tiệc, lễ nghi, thỉnh an dễ thành hơn (+3)","yến tiệc, lễ nghi, thỉnh an +6","Sắc +2 · yến tiệc, lễ nghi, thỉnh an +9","yến tiệc, lễ nghi, thỉnh an +12","Sắc +2, Danh +4 · yến tiệc, lễ nghi, thỉnh an +15"],
 ngon:["trò chuyện, kết giao, tố giác dễ thành hơn (+3)","trò chuyện, kết giao, tố giác +6 · lỡ lời: mỗi thiệt hại bớt 1","Tâm cơ +1 · trò chuyện, kết giao, tố giác +9","trò chuyện, kết giao, tố giác +12 · lỡ lời: mỗi thiệt hại bớt 2","Danh +4 · trò chuyện, kết giao, tố giác +15"],
 hanh:["Đức +3","Đức +3, Thái hậu +3","Đức +3 · mỗi tháng Đức +1 (đến 80)","Đức +3, Thái hậu +3, Hoàng hậu +5","Đức +3, Danh +4"]};
/* ---- new arts: Thêu thùa, Nấu nướng ---- */
(function(){if(!ARTS.find(a=>a.k==="theu"))ARTS.push({k:"theu",n:"Thêu thùa",st:"tai",u:"Bậc 3: bán đồ thêu, Bạc +5 mỗi tháng"},{k:"nau",n:"Nấu nướng",st:"tai",u:"Bậc 3: canh bổ dâng Hoàng thượng, Ân tình +1 mỗi tháng"});
 ARTDO.theu="Tài: thêu thùa, may vá; đồ thêu làm quà, bán lấy bạc";ARTDO.nau="Tài: nấu canh, làm bánh; giữ Sức, dâng món được Ân tình";
 AIMG.theu=AIMG.theu||"";AIMG.nau=AIMG.nau||"";  /* no img/theu.webp, img/nau.webp icon drawn yet: ic("") shows none (was a 404 then onerror remove) */
 try{if(!MG.theu)MG.theu=["Thêu: nhớ mẫu thêu","Lật hai ô một hồi, tìm đủ các cặp mẫu thêu giống nhau trong số hồi cho phép.",gHoa];
  if(!MG.nau)MG.nau=["Nấu: nhớ thứ tự","Xem các bước nấu sáng lên rồi làm lại đúng thứ tự. 5 hồi, mỗi hồi dài thêm một bước.",gVu]}catch(e){}
 ARTS.forEach(a=>{ARTMS[a.k]=ARTFX[a.k]||ARTMS[a.k]||[]})})();
/* ---- data on every person ---- */
function vNorm(p){if(!p)return p;p.arts=p.arts||{};p.artp=p.artp||{};for(const a of ARTS){if(p.arts[a.k]==null)p.arts[a.k]=0;if(p.artp[a.k]==null)p.artp[a.k]=0}
 p.vir=p.vir||{};p.virp=p.virp||{};for(const v of VIR){if(p.vir[v.k]==null)p.vir[v.k]=0;if(p.virp[v.k]==null)p.virp[v.k]=0}
 if(p.duc==null)p.duc=50;p.dlog=p.dlog||[];return p}
function vNormAll(){try{if(!S)return;vNorm(S);(rivals||[]).forEach(vNorm)}catch(e){}}
(function(){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);vNormAll();return r}})();
(function(){const r0=rstats;rstats=function(v){const r=r0.apply(this,arguments);vNorm(v);return r}})();
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);vNormAll();return r}})();
/* ---- the API ---- */
function artLv(p,k){return ((p&&p.arts)||{})[k]||0}
function virLv(p,k){return ((p&&p.vir)||{})[k]||0}
function virtueBonus(p,k){const lv=virLv(p,k);const b={lv};
 if(k==="cong"){b.q=lv*4;b.tier=lv>=5?2:lv>=3?1:0;b.prog=lv>=2?1:0}
 if(k==="dung"){b.odds=lv*3;b.sac=(lv>=1?2:0)+(lv>=3?2:0)+(lv>=5?2:0)}
 if(k==="ngon"){b.odds=lv*3;b.slip=lv>=4?2:lv>=2?1:0}
 if(k==="hanh"){b.duc=lv*3;b.month=lv>=3?1:0}
 return b}
function artBonus(p,k){const lv=artLv(p,k),cg=virtueBonus(p,"cong");const q=cl(Math.round(lv*14+((p&&p.tai)||0)/10+cg.q),0,100);
 let tier=q<25?1:q<45?2:q<65?3:q<85?4:5;tier=Math.min(5,tier+cg.tier);
 return{lv,q,tier,odds:lv*4,gift:k==="hoa"?lv*10:k==="theu"?lv*8:0,scheme:k==="ky"?lv*2:0,detect:k==="y"&&lv>=2?20:0,night:k==="vu"?lv*2:k==="y"?lv*1.5:0}}
function productTier(p,k){return artBonus(p,k).tier}
function ducOf(p){if(!p)return 50;if(p===S)return S.duc||0;return p.duc==null?50:p.duc}
function ducOdds(p){return Math.round((ducOf(p)-50)/5)}          /* credibility of an accuser: Đức 20 → -6, Đức 80 → +6 */
function ducShield(t){return Math.round((ducOf(t)-50)/6)}         /* subtracted from frame/rumour odds against t: Đức 80 → -5, Đức 20 → +5 */
function ducDanger(v){return Math.round((50-ducOf(v))/5)}         /* added to danger(v,t): Đức 10 → +8, Đức 90 → -8 */
function ducBetray(t){return Math.round((50-ducOf(t))/4)}         /* added to buying t's servants: Đức 10 → +10 */
/* deed context: the act being done, so every Đức change carries its cause */
let DEED85=null;
function withDeed(n,f){const o=DEED85;DEED85=n;try{return f()}finally{DEED85=o}}
function deedRec(p,d,why){if(!p||!d)return;vNorm(p);p.dlog.push({w:(typeof wk==="function"?wk():0),n:why||"",d});if(p.dlog.length>16)p.dlog.shift()}
function ducLow(s){return String(s||"").replace(/<[^>]+>/g,"").replace(/^./,c=>c.toLowerCase())}
(function(){const a0=apply;apply=function(o){const d=o&&o.duc,b=S?S.duc:0;const r=a0.apply(this,arguments);try{if(d&&S){const dd=S.duc-b;if(dd&&DEED85){deedRec(S,dd,DEED85);if(!quiet)log(`<span class="${dd>0?"g":"r"}">Đức ${dd>0?"+":""}${dd} vì ${ducLow(DEED85)}.</span>`)}}}catch(e){}return r}})();
(function(){const a0=ap;ap=function(p,o){const d=o&&o.duc;if(p===S||!d||!p)return a0.apply(this,arguments);const b=p.duc||0;const r=a0.apply(this,arguments);try{const dd=(p.duc||0)-b;if(dd)deedRec(p,dd,DEED85||"việc khuất tất")}catch(e){}return r}})();
function ducAdd(p,n,why){if(!p||!n)return 0;return withDeed(why||"việc vừa làm",()=>{if(p===S){apply({duc:n})}else ap(p,{duc:n});return n})}
/* every rulebook act (also when another module calls ACT[k].f directly) names itself */
(function(){for(const k in ACT){const A2=ACT[k];if(!A2||A2.__j85||typeof A2.f!=="function")continue;const f0=A2.f;A2.f=function(a,t){return withDeed(A2.n,()=>f0.apply(this,arguments))};A2.__j85=1}})();
(function(){const r0=runOpt;runOpt=function(a){return withDeed(a&&a.n,()=>r0.apply(this,arguments))}})();
(function(){const c0=chooseM;chooseM=function(i){const m=Q[0],c=m&&m.opts&&m.opts[i];return withDeed(c?c.n:null,()=>c0.apply(this,arguments))}})();
/* ---- what she knows: Đức (true nature) only once she knows the person; Danh is what the palace says ---- */
function ducKnown(v){if(!v||v===S)return true;try{S.kduc=S.kduc||{};return !!S.kduc[v.id]||trKnown(v).length>0||(v.ev||0)>0||(typeof evG==="function"&&evG(v,S)>0)}catch(e){return false}}
function ducWord(d){return d>=80?"hiền đức":d>=60?"tử tế":d>=40?"thường":d>=20?"bạc đức":"thất đức"}
function ducLine(v){vNorm(v);if(!ducKnown(v))return `Đức: <span class="ef n">chưa rõ</span> · Danh <b>${v.danh||0}</b> <span class="past">(tiếng ngoài)</span>`;
 const bad=v.dlog.filter(x=>x.d<0),good=v.dlog.filter(x=>x.d>0);const cnt=L=>{const m={};L.forEach(x=>{if(x.n)m[x.n]=(m[x.n]||0)+1});return Object.entries(m).map(([n,c])=>`${ducLow(n)}${c>1?` ×${c}`:""}`).join(", ")};
 return `Đức <b class="${v.duc<40?"r":v.duc>=60?"g":""}">${v.duc}</b> (${ducWord(v.duc)}) · Danh <b>${v.danh||0}</b>${bad.length&&cnt(bad)?`<br><span class="ef r">Đã làm: ${cnt(bad)}</span>`:""}${good.length&&cnt(good)?`<br><span class="ef g">Việc thiện: ${cnt(good)}</span>`:""}`}
(function(){const rc=rvCard;rvCard=function(v,i){let h=rc(v,i);try{if(v.alive)h=h.replace('<div class="pcinfo">',`<div class="pcinfo"><span>${ducLine(v)}</span>`)}catch(e){}return h}})();
/* ---- Đức in the rules everyone shares ---- */
(function(){const d0=danger;danger=function(v,t){return d0.apply(this,arguments)+ducDanger(v)}})();
(function(){const o0=oAccuse;oAccuse=function(a,t){return cl(o0.apply(this,arguments)+ducOdds(a)+virtueBonus(a,"ngon").odds,5,95)}})();
(function(){const o0=oBribe;oBribe=function(a,t){return cl(o0.apply(this,arguments)+ducBetray(t),5,95)}})();
(function(){const o0=oPlant;oPlant=function(a,t){return cl(o0.apply(this,arguments)+ducBetray(t),5,95)}})();
(function(){const o0=oAlly;oAlly=function(a,t){return cl(o0.apply(this,arguments)+virtueBonus(a,"ngon").odds,5,95)}})();
/* frame / rumour against a target: the target's Đức is a shield (needs the target, so the act tells us who it is) */
let DT85=null;
function withT(t,f){const o=DT85;DT85=t;try{return f()}finally{DT85=o}}
(function(){const sh=n=>{const f0=window[n];if(typeof f0!=="function")return;window[n]=function(a){a=a||S;const r=f0.apply(this,arguments);return cl(r-(DT85&&DT85!==a?ducShield(DT85):0)+artBonus(a,"ky").scheme,5,95)}};
 ["oFrame","oKFrame","oRumor"].forEach(sh);
 ["oSpy","oPoison","oKSab","oKPoison","oBlock"].forEach(n=>{const f0=window[n];if(typeof f0!=="function")return;window[n]=function(a){a=a||S;return cl(f0.apply(this,arguments)+artBonus(a,"ky").scheme,5,95)}});
 for(const k of ["frame","kframe","rumor","lygian"]){const A2=ACT[k];if(!A2)continue;const f1=A2.f,o1=A2.o;A2.f=function(a,t){return withT(t,()=>f1.apply(this,arguments))};if(o1)A2.o=function(a,t){return withT(t,()=>o1.apply(this,arguments))}}})();
/* the cards she draws: Dung helps banquets/ceremonies, Ngôn helps social acts */
const DUNGRX=/yến|Yến|lễ|Lễ|thỉnh an|Thỉnh an|tiệc|Tiệc|hiến|Hiến/,NGONRX=/Thỉnh an|Kết giao|kết giao|Tặng|tặng|Lấy lòng|lấy lòng|Trò chuyện|trò chuyện|Xin |Tâng bốc|Nói thật/;
function vOddsFor(a,p){p=p||S;let b=0;if(!a||a.o==null||a.o>=100)return 0;if(DUNGRX.test(a.n||""))b+=virtueBonus(p,"dung").odds;if(a.dom==="Giao thiệp"||NGONRX.test(a.n||""))b+=virtueBonus(p,"ngon").odds;return b}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{(deck||[]).forEach(a=>{const b=vOddsFor(a);if(b)a.o=cl(a.o+b,5,95)})}catch(e){}return r}})();
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{const sl=virtueBonus(S,"ngon").slip,od1=virtueBonus(S,"ngon").odds;(A||[]).forEach(a=>{if(a.o!=null&&a.o<100)a.o=cl(a.o+od1+(DUNGRX.test(a.n||"")?virtueBonus(S,"dung").odds:0),5,95);if(sl&&a.l)for(const k in a.l){if(a.l[k]<0)a.l[k]=Math.min(0,a.l[k]+sl)}})}catch(e){}return A}})();
/* ---- learning (her): arts keep j23's three roads; the courses have two ---- */
(function(){const a0=addArt;addArt=function(k,g){if((k==="theu"||k==="nau")&&virtueBonus(S,"cong").prog)g+=1;vNorm(S);const l0=S.arts[k];const r=a0.call(this,k,g);
 for(let l=l0+1;l<=S.arts[k];l++){const b=k==="theu"?ARTB85.theu:null;if(b&&b[l]){apply(b[l]);log(`${ARTS.find(a=>a.k===k).n} bậc ${l}: ${fmt(b[l])}.`)}}return r}})();
/* Tứ đức teacher fee = the palace teacher fee: 8% of the learner's bổng (coordinator s7 decision c; jrcp tchFeeOf); was a flat 5+5×bậc */
function virCost(l,p){return typeof tchFeeOf==="function"?tchFeeOf(p||S):5+l*5}
function addVir(p,k,g){vNorm(p);const V=VIR.find(x=>x.k===k);if(!V)return;p.virp[k]+=g;
 while(p.vir[k]<5&&p.virp[k]>=p.vir[k]+2){p.virp[k]-=p.vir[k]+2;p.vir[k]++;const l=p.vir[k],f=(VIRB[k]||{})[l];
  if(f)withDeed(`${V.n} lên bậc ${l}`,()=>{if(p===S)apply(f);else ap(p,f)});
  if(p===S)log(`<span class="g">${V.n} (${V.full}) lên bậc ${l}.</span> ${VIRFX[k][l-1]}`)}
 if(p.vir[k]>=5)p.virp[k]=0}
function lessonVir(k,mode){if(!S||S.dead||Q.length||S.mg)return;vNorm(S);const l=S.vir[k],cost=virCost(l),V=VIR.find(x=>x.k===k);if(!V||l>=5)return;
 if(mode==="self"){if(!can(2)||S.suc<25)return;apply({suc:-15});spend(2);addVir(S,k,1);log(`Tự học ${V.n}. Tiến bộ +1.`)}
 else{if(!can(2)||S.bac<cost)return;apply({suc:-10,bac:-cost});spend(2);const g=2+R(2);addVir(S,k,g);log(`Học ${V.n} với ma ma giáo tập. Tiến bộ +${g}.`)}
 save();render()}
window.lessonVir=lessonVir;
function charity(){const C=BAL.charity;if(!S||S.dead||Q.length||!can(C.khac)||S.bac<C.bac||S.charM===S.turn)return;S.charM=S.turn;withDeed("phát bạc cứu giúp cung nhân nghèo",()=>apply({bac:-C.bac,duc:C.duc,danh:C.danh}));spend(C.khac);save();render()}
window.charity=charity;
try{wrapR("lessonVir",(k,m)=>`${m==="self"?"Tự học":"Học"} ${(VIR.find(x=>x.k===k)||{}).n||""}`);wrapR("charity",()=>"Phát bạc cứu giúp cung nhân")}catch(e){}
document.addEventListener("click",e=>{const b=e.target.closest("[data-vlearn],[data-charity],[data-v85tab]");if(!b||b.disabled)return;e.stopPropagation();
 if(b.dataset.vlearn)lessonVir(b.dataset.vlearn,b.dataset.mode);else if(b.dataset.charity)charity();else v85Table(b.dataset.v85tab)},true);
/* ---- the same rules for every NPC: study by trait, a teacher when the purse allows ---- */
function addArtP(p,k,g){if(p===S)return addArt(k,g);vNorm(p);const a=ARTS.find(x=>x.k===k);if(!a)return;if((k==="theu"||k==="nau")&&virtueBonus(p,"cong").prog)g+=1;p.artp[k]+=g;
 while(p.arts[k]<5&&p.artp[k]>=p.arts[k]+2){p.artp[k]-=p.arts[k]+2;p.arts[k]++;const l=p.arts[k];const f={[a.st]:2};if(l===3)f.danh=3;if(l===5)f.danh=6;const b=(ARTB85[k]||{})[l];if(b)for(const x in b)f[x]=(f[x]||0)+b[x];ap(p,f)}
 if(p.arts[k]>=5)p.artp[k]=0}
function npcStudy(v){if(!v||!v.alive||v.out||!roll(40))return;vNorm(v);const T=traitsOf(v)||[];const W=[];
 const w=k=>{let x=1;if(/Hiền lành|Nhu mì/.test(T.join()))x*=(k==="hanh"?3:k==="dung"||k==="cong"?2:1);if(T.includes("Hiểm độc"))x*=(k==="ky"?3:k==="ngon"?2:k==="hanh"?.3:1);if(T.includes("Kiêu ngạo"))x*=(k==="vu"||k==="dung"?2:1);return x};
 ARTS.forEach(a=>{if(v.arts[a.k]<5)W.push(["a",a.k,w(a.k)])});VIR.forEach(x=>{if(v.vir[x.k]<5)W.push(["v",x.k,w(x.k)])});if(!W.length)return;
 let r=Math.random()*W.reduce((s,x)=>s+x[2],0),i=0;while(r>W[i][2]&&i<W.length-1){r-=W[i][2];i++}const [t,k]=W[i];const l=t==="a"?v.arts[k]:v.vir[k],cost=t==="a"?(typeof tchFeeOf==="function"?tchFeeOf(v):5+l*5):virCost(l,v);
 let g=1;if((v.bac||0)>=cost+40&&roll(50)){ap(v,{bac:-cost});g=2+R(2)}if(t==="a")addArtP(v,k,g);else addVir(v,k,g)}
/* ---- monthly effects (every consort alike) ---- */
function v85Month(){if(!S||S.dead)return"";let ev="";const season=S.turn%3===0;
 for(const p of consorts()){if(!p||(p!==S&&(!p.alive||p.out)))continue;vNorm(p);const me=p===S,A=p.arts,f={};const add=(k,n)=>{if(n)f[k]=(f[k]||0)+n};
  if(A.theu>=3)add("bac",A.theu>=5?10:5);if(A.nau>=2)add("suc",A.nau>=4?4:2);if(A.nau>=3)add("an",A.nau>=5?2:1);
  if(season){if(A.thi>=2)add("danh",1);if(A.hoa>=2)add("danh",A.hoa>=4?2:1)}
  if(A.y>=5)kidsOf(p).forEach(k=>{if(k.hp!=null)k.hp=Math.min(100,k.hp+2)});
  if(A.cam>=5&&(p.sung||0)>=40&&S.emp&&S.emp.mood>0&&roll(50))S.emp.mood--;
  if(Object.keys(f).length){if(me){apply(f);ev+=`Tài nghệ trong tháng: ${fmt(f)}. `}else ap(p,f)}
  /* Đức: Hạnh bậc 3 keeps it rising; it moves Thái hậu / Hoàng hậu and the servants' Lòng */
  if(virtueBonus(p,"hanh").month&&ducOf(p)<80)withDeed("giữ đức hạnh (Hạnh bậc 3)",()=>me?apply({duc:1}):ap(p,{duc:1}));
  const d=ducOf(p),q=queenP(),tf=d>=60?1:d<20?-1:0;
  if(tf){if(me){S.th=cl(S.th+tf,-100,100);if(q&&q!==S)S.hh=cl(S.hh+tf,-100,100)}else if(q&&q!==p)p.hh=cl((p.hh||0)+tf,-100,100)}
  const lf=d>=70?1:d<25?-1:0;if(lf){(p.staff||[]).forEach(s=>{if(s.loyal!=null)s.loyal=cl(s.loyal+lf,0,100)});if(p.maid&&p.maid.loyal!=null)p.maid.loyal=cl(p.maid.loyal+lf,0,100)}
  /* (her Thái hậu / Hoàng hậu drift by Đức is written once, with numbers, in the turn-change line of jlogsync — log-sync r1) */
  if(me&&lf)ev+=lf>0?`Đức ${d}: kẻ hầu thêm Lòng (+1). `:`Đức ${d}: kẻ hầu bớt Lòng (-1). `;
  if(!me){npcStudy(p);if(d>=60&&d<85&&(p.bac||0)>=60&&roll(5))withDeed("phát bạc cứu giúp cung nhân nghèo",()=>ap(p,{bac:-20,duc:3,danh:1}))}}
 return ev}
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);let e2="";try{if(!S.dead)e2=v85Month()}catch(e){}return typeof ev==="string"?ev+e2:ev}})();
/* ---- the danger ladder card names the Đức term ---- */
(function(){if(typeof bandCard!=="function")return;const b0=bandCard;bandCard=function(){return b0.apply(this,arguments)+`<p>Đức của người ra tay cũng tính: cộng (50 − Đức) ÷ 5. Đức 10 thì +8, Đức 90 thì −8. Ngươi: Đức ${S.duc}, ${ducDanger(S)>=0?"+":""}${ducDanger(S)}.</p>`}})();
/* ---- the Tài nghệ tab: what each level gives, what the next one opens ---- */
function fxItems(s,cls){return String(s).split(" · ").map(x=>`<span class="ef ${cls}">${x}</span>`)}
function lvRows(fx,l,nm){const rows=[];fx.slice(0,l).forEach((s,i)=>rows.push([`Bậc ${i+1}`,fxItems(s,"g"),"g"]));if(l<5)rows.push([`Bậc ${l+1} mở`,fxItems(fx[l],"n"),"n"]);return kitRows(rows)}
function v85Table(k){const V=VIR.find(x=>x.k===k),A=ARTS.find(x=>x.k===k);
 if(k==="duc")return v85DucPanel();const fx=V?VIRFX[k]:ARTFX[k],l=V?virLv(S,k):artLv(S,k);if(!fx)return;
 kitModal({kind:"rule",title:V?`${V.n} · ${V.full}`:`${A.n}`,sub:V?V.d:(ARTDO[k]||""),sections:[{h:"Năm bậc",tiers:fx.map((s,i)=>({k:`Bậc ${i+1}`,n:s,c:i<l?"g":"",on:i+1===l}))}].concat(V?[]:[{h:"Ghi chú",rows:[["Lên bậc",`${A.st==="sac"?"Sắc":"Tài"} +2 mỗi bậc; bậc 3 Danh +3, bậc 5 Danh +6`,"t"]].concat(["cam","ky","thi","hoa"].includes(k)?[["Hoàng thượng trọng tài","thi tài, phô tài tính bậc này gấp đôi","t"]]:k==="vu"?[["Hoàng thượng mê sắc","múa, lật thẻ tính bậc này gấp đôi","t"]]:[])}]),btn:"Đã hiểu"})}
function ducDeedList(){const L=[];for(const k in ACT){const A2=ACT[k];if(A2&&A2.c&&A2.c.duc<0)L.push([A2.n,A2.c.duc])}L.sort((a,b)=>a[1]-b[1]);return L}
function v85DucPanel(){const d=S.duc,bad=ducDeedList();
 kitModal({kind:"rule",title:"Đức",sub:"Ai cũng có Đức; việc làm thật mới làm Đức lên xuống",
  sections:[{h:"Thang Đức",tiers:[{k:"80–100",n:"hiền đức",d:"khó bị vu oan, lời tố được tin; Thái hậu, Hoàng hậu +1 mỗi tháng; kẻ hầu Lòng +1 mỗi tháng",c:"g",on:d>=80},{k:"60–79",n:"tử tế",d:"Thái hậu, Hoàng hậu +1 mỗi tháng (từ 70: kẻ hầu Lòng +1)",c:"g",on:d>=60&&d<80},{k:"50–59",n:"đủ Đức",d:"đủ Đức để lên Hoàng hậu (mẹ Thái tử: 40)",on:d>=50&&d<60},{k:"20–49",n:"bạc đức",d:"chưa được lên Hoàng hậu (dưới 25: kẻ hầu Lòng -1 mỗi tháng)",c:"r",on:d>=20&&d<50},{k:"0–19",n:"thất đức",d:"Thái hậu, Hoàng hậu -1 mỗi tháng; kẻ hầu dễ bị mua chuộc",c:"r",on:d<20}]},
   {h:`Cách tính (ngươi: Đức ${d})`,rows:[["Nguy hiểm","(50 − Đức) ÷ 5 cộng vào mức nguy hiểm của người ra tay: "+`${ducDanger(S)>=0?"+":""}${ducDanger(S)}`,"t"],["Tố giác","(Đức − 50) ÷ 5 cộng vào phần thắng của người tố: "+`${ducOdds(S)>=0?"+":""}${ducOdds(S)}`,"t"],["Bị vu oan","kẻ vu oan, tung tin đồn về ngươi được cộng (50 − Đức) ÷ 6: "+`${-ducShield(S)>=0?"+":""}${-ducShield(S)}`,"t"],["Kẻ hầu","(50 − Đức) ÷ 4 cộng vào việc mua chuộc kẻ hầu của ngươi: "+`${ducBetray(S)>=0?"+":""}${ducBetray(S)}`,"t"],["Người khác","Đức của họ chỉ thấy khi ngươi đã biết nết họ hoặc nắm chứng cứ; Danh là tiếng ngoài, kẻ ác giấu mặt vẫn giữ Danh cao đến khi bị lộ","t"]]},
   {h:"Việc làm Đức giảm",rows:bad.map(([n,v])=>[n,`<span class="ef r">Đức ${v}</span>`,"r"])},
   {h:"Việc làm Đức tăng",rows:[["Phát bạc cứu giúp cung nhân",`<span class="ef g">Đức +${BAL.charity.duc}, Danh +${BAL.charity.danh}</span>`,"g"],["Xin tha cho cung nữ bị phạt","<span class=\"ef g\">Đức +3</span>","g"],["Ân xá người ở lãnh cung","<span class=\"ef g\">Đức +2</span>","g"],["Nhịn lời mỉa mai","<span class=\"ef g\">Đức +2</span>","g"],["Học Hạnh","<span class=\"ef g\">Đức +3 mỗi bậc; từ bậc 3 mỗi tháng +1</span>","g"]]}],btn:"Đã hiểu"})}
artTabHTML=function(){vNormAll();const t2=whyTime(2);
 const card=(nm,img,l,prog,need,head,fx,B,k)=>`<div class="v85s"><div class="art"><b>${img?ic(img,20):""}${nm} · Bậc ${l}/5 <button class="lnk ladi" data-v85tab="${k}" title="Năm bậc" aria-label="Xem năm bậc của ${nm}">ⓘ năm bậc</button></b><span class="u">${head}</span>${l<5?`<span class="lv">Tiến bộ ${prog}/${need}</span><div class="mini"><u style="width:${Math.min(100,prog/need*100)}%"></u></div>`:""}${lvRows(fx,l)}</div><div class="pcb">${B.join("")}</div></div>`;
 let h=`<div class="ph"><span>Mỗi buổi học tốn 2 khắc. Học với thầy tốn bạc, tiến nhanh; tự học không tốn bạc, tiến chậm. Phi tần khác cũng học theo cùng luật.</span>${S.master?`<span class="g">Danh sư còn dạy ${S.master} tháng</span>`:""}</div>`;
 h+=`<div class="ph"><span><b>Tứ đức</b> · bốn môn của nữ nhi trong cung, không phải thanh số: mỗi bậc đổ vào Sắc, Đức, phần thắng và phẩm đồ tự làm.</span><span>Đức ngươi: <b>${S.duc}</b> <button class="lnk ladi" data-v85tab="duc" title="Luật Đức" aria-label="Xem luật Đức">ⓘ luật Đức</button></span></div><div>`;
 h+=VIR.map(V=>{const l=S.vir[V.k],cost=virCost(l);const B=l>=5?[`<span class="ef g">Đã tinh thông</span>`]:[
   pbtn(`data-vlearn="${V.k}" data-mode="self"`,"Tự học",`Chắc chắn · tốn: 2 khắc, Sức -15 · thành: tiến bộ một phần`,t2||(S.suc<25?"Sức dưới 25":"")),
   pbtn(`data-vlearn="${V.k}" data-mode="master"`,"Học với ma ma",`Chắc chắn · tốn: 2 khắc, Bạc -${cost}, Sức -10 · thành: tiến bộ hai ba phần`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:""))];
  if(V.k==="hanh")B.push(pbtn(`data-charity="1"`,"Phát bạc cứu giúp cung nhân nghèo",`Chắc chắn · tốn: ${BAL.charity.khac} khắc, Bạc -${BAL.charity.bac} · thành: Đức +${BAL.charity.duc}, Danh +${BAL.charity.danh} (mỗi tháng một lần)`,whyTime(BAL.charity.khac)||(S.bac<BAL.charity.bac?`thiếu bạc (cần ${BAL.charity.bac})`:S.charM===S.turn?"tháng này đã làm":"")));
  return card(`${V.n} · ${V.full}`,"",l,S.virp[V.k],l+2,V.d,VIRFX[V.k],B,V.k)}).join("")+`</div>`;
 h+=`<div class="ph"><span><b>Tài nghệ</b> · cầm, kỳ, thi, họa, vũ, y, thêu, nấu.</span></div><div>`;
 h+=ARTS.map(a=>{const l=S.arts[a.k],need=l+2,cost=5+l*5;
  const B=l>=5?[`<span class="ef g">Đã tinh thông</span>`]:[pbtn(`data-learn="${a.k}" data-mode="self"`,"Tự học",`Chắc chắn · tốn: 2 khắc, Sức -15 · thành: tiến bộ một hai phần`,t2||(S.suc<25?"Sức dưới 25":"")),
   pbtn(`data-learn="${a.k}" data-mode="teacher"`,"Học với thầy",`Chắc chắn · tốn: 2 khắc, Bạc -${cost}, Sức -10 · thành: tiến bộ hai ba phần, luôn hơn tự học 1, có khi nghe chuyện`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:"")),
   S.thDead?"":pbtn(`data-learn="${a.k}" data-mode="th"`,"Học với Thái hậu",`Chắc chắn · tốn: 2 khắc, Sức -10 · thành: tiến bộ một đến ba phần, Thái hậu +3`,t2||(S.th<40?"cần Thái hậu thương 40":(S.buoi||0)!==0?"chỉ buổi sáng":""))];
  const extra=(a.k==="theu"||a.k==="nau")?` · phẩm đồ tự làm ${artBonus(S,a.k).q}/100, bậc phẩm ${artBonus(S,a.k).tier}`:"";
  return card(a.n,AIMG[a.k],l,S.artp[a.k],need,(ARTDO[a.k]||"")+extra,ARTFX[a.k]||[],B,a.k)}).join("")+`</div>`;
 return h};
/* ---- performing arts only when she shows off (talk, night prep): Thêu/Nấu are crafts, not a show ---- */
bestArt=function(){let b={k:null,n:"giọng hát",l:0,w:0};for(const a of ARTS){if(a.k==="theu"||a.k==="nau")continue;const l=S.arts[a.k]||0,w=artW(a.k,l);if(w>b.w)b={k:a.k,n:a.n,l,w}}return b};
/* ---- a hidden villain keeps her Danh until a scheme is caught: then Danh -5 and the victim sees her true Đức ---- */
(function(){const c0=caught;caught=function(a,t){const r=c0.apply(this,arguments);try{if(r&&a&&a!==S){ap(a,{danh:-5});if(t===S||evG(S,a)>0){S.kduc=S.kduc||{};S.kduc[a.id]=1}}else if(r&&a===S)apply({danh:-5})}catch(e){}return r?r.replace(/\. $/,`; Danh ${a===S?"ngươi":a.name} -5. `):r}})();
/* taintItem (j8) is called straight from the NPC minds: name it */
(function(){if(typeof taintItem!=="function")return;const t0=taintItem;taintItem=function(p,ix,tk){return withDeed("lén bỏ thứ hại người vào đồ",()=>t0.apply(this,arguments))}})();
