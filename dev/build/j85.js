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
const VIRB={},ARTB85={};/* the numbers live in BAL.virB / BAL.artB (jbal2 GROUP A block links them in: this file loads first); read at level-up time */
/* ---- the effect table, level by level; every line is applied by code in this file or the module named ---- */
const ARTFX={
 cam:["Tài {n:art.stUp} · mỗi tháng tự đàn: Sức {n:eff.j23.camSucMonth}","Tài {n:art.stUp} · Đánh đàn ở Ngự hoa viên dễ thành hơn (mỗi bậc +4)","Tài {n:art.stUp}, Danh {n:art.danh.3} · mở «Đàn khúc Phượng cầu hoàng»: {sg:deck.cam.w.sung} khi thành","Tài {n:art.stUp} · dạy con đàn: mỗi tháng các con Tài {n:eff.j23.talArtMonth}",`Tài {n:art.stUp}, Danh {n:art.danh.5} · mỗi tháng có Sủng từ ${BAL.virx.camSung}: tiếng đàn làm Hoàng thượng vui lên một mức (một tháng trong hai)`],
 ky:["Tài {n:art.stUp}, Tâm cơ {n:artB.ky.1.tamco} · dò la, mưu kế dễ thành hơn (mỗi bậc +2)","Tài {n:art.stUp}, Tâm cơ {n:artB.ky.2.tamco}","Tài {n:art.stUp}, Danh {n:art.danh.3} · mở «Đánh cờ với Hoàng thượng»: {sg:deck.ky.w.sung}, Danh {n:tw.g.ky.0}, Tâm cơ {n:tw.g.ky.1}","Tài {n:art.stUp}, Tâm cơ {n:artB.ky.4.tamco}","Tài {n:art.stUp}, Tâm cơ {n:artB.ky.5.tamco}, Danh {n:art.danh.5}"],
 thi:["Tài {n:art.stUp} · Làm thơ dâng lên dễ thành hơn (mỗi bậc +4)","Tài {n:art.stUp} · đầu mỗi mùa thơ truyền ra ngoài: Danh {n:eff.j85.thiDanhSeason}","Tài {n:art.stUp}, Danh {n:art.danh.3} · mỗi tháng thơ đến tay Hoàng thượng: {sgRaw:tho.sung}","Tài {n:art.stUp} · Bàn chuyện triều chính dễ thành hơn (mỗi bậc +3)","Tài {n:art.stUp}, Danh {n:art.danh.5} · mỗi tháng {sgRaw:tho.sung5} (thay {n:tho.sung})"],
 hoa:["Tài {n:art.stUp} · thọ yến Thái hậu tháng mười dễ thành hơn (mỗi bậc +8)","Tài {n:art.stUp}, Thái hậu {n:artB.hoa.2.th} · đầu mỗi mùa tranh được truyền xem: Danh {n:eff.j85.hoaDanhSeason}","Tài {n:art.stUp}, Danh {n:art.danh.3} · mở «Vẽ chân dung tặng Thái hậu»: Thái hậu +10","Tài {n:art.stUp}, Thái hậu {n:artB.hoa.4.th} · đầu mỗi mùa Danh {n:eff.j85.hoaDanhSeason4} (thay {n:eff.j85.hoaDanhSeason})","Tài {n:art.stUp}, Danh {n:art.danh.5}, Thái hậu {n:artB.hoa.5.th}"],
 vu:["Sắc {n:art.stUp} · được lật thẻ dễ hơn (mỗi bậc +2)","Sắc {n:art.stUp} · Múa trong yến tiệc (mỗi bậc +4), Chặn ngự giá (mỗi bậc +5) dễ thành hơn","Sắc {n:art.stUp}, Danh {n:art.danh.3} · mở «Kinh hồng vũ»: {sg:deck.vu.w.sung}, Danh {n:deck.vu.w.danh}","","Sắc {n:art.stUp}, Danh {n:art.danh.5}"],
 y:["Sắc {n:art.stUp} · được lật thẻ dễ hơn (mỗi bậc +1,5)","Sắc {n:art.stUp} · nhận ra độc, xạ hương trong đồ: phát giác mưu hại +20","Sắc {n:art.stUp}, Danh {n:art.danh.3} · mở «Tự bốc thuốc» khi đau ốm","Sắc {n:art.stUp} · tự bào chế thuốc an thai; chữa bệnh cho con: Sức khỏe con +30","Sắc {n:art.stUp}, Danh {n:art.danh.5} · mỗi tháng các con Sức khỏe {n:eff.j85.hpV85Month}"],
 theu:["Tài {n:art.stUp} · đồ thêu tự làm: phẩm +14 mỗi bậc (thang 100)","Tài {n:art.stUp}, Thái hậu {n:artB.theu.2.th}","Tài {n:art.stUp}, Danh {n:art.danh.3} · mỗi tháng gửi đồ thêu bán ra ngoài: Bạc {n:eff.j85.theuBac}","Tài {n:art.stUp}, Thái hậu {n:artB.theu.4.th}","Tài {n:art.stUp}, Danh {n:art.danh.5} · mỗi tháng Bạc {n:eff.j85.theuBac5} (thay {n:eff.j85.theuBac})"],
 nau:["Tài {n:art.stUp} · món tự nấu: phẩm +14 mỗi bậc (thang 100)","Tài {n:art.stUp} · ăn uống điều độ: mỗi tháng Sức {n:eff.j85.nauSuc}","Tài {n:art.stUp}, Danh {n:art.danh.3} · mỗi tháng canh bổ dâng Dưỡng Hòa điện: Ân tình {n:eff.j85.nauAn}","Tài {n:art.stUp} · mỗi tháng Sức {n:eff.j85.nauSuc4} (thay {n:eff.j85.nauSuc})","Tài {n:art.stUp}, Danh {n:art.danh.5} · mỗi tháng Ân tình {n:eff.j85.nauAn5} (thay {n:eff.j85.nauAn})"]};
for(const k in ARTFX)sgRuleArr(ARTFX[k]);/* r2 sg-card: Sủng tokens read from BAL (deck in jbal2 loads later) when shown */
/* Vũ bậc 4 = the bậc Sắc (BAL.art.stUp) + its own Sắc (BAL.artB.vu[4]), printed as one sum */
Object.defineProperty(ARTFX.vu,3,{get:()=>`Sắc ${balSg(BAL.art.stUp+(((ARTB85.vu||{})[4]||{}).sac||0))}`,set:sgRuleSet(ARTFX.vu,3),enumerable:true,configurable:true});
const VIRFX={
 cong:["đồ thêu, món nấu tự làm: phẩm +4","phẩm +8 · học Thêu, Nấu: thêm 1 tiến bộ mỗi buổi","phẩm +12 · thành phẩm lên thêm 1 bậc (tới Tinh xảo)","phẩm +16","phẩm +20 · thành phẩm lên thêm 2 bậc · Danh {n:virB.cong.5.danh}"],
 dung:["Sắc {n:virB.dung.1.sac} · yến tiệc, lễ nghi, thỉnh an dễ thành hơn (+3)","yến tiệc, lễ nghi, thỉnh an +6","Sắc {n:virB.dung.3.sac} · yến tiệc, lễ nghi, thỉnh an +9","yến tiệc, lễ nghi, thỉnh an +12","Sắc {n:virB.dung.5.sac}, Danh {n:virB.dung.5.danh} · yến tiệc, lễ nghi, thỉnh an +15"],
 ngon:["trò chuyện, kết giao, tố giác dễ thành hơn (+3)","trò chuyện, kết giao, tố giác +6 · lỡ lời: mỗi thiệt hại bớt 1","Tâm cơ {n:virB.ngon.3.tamco} · trò chuyện, kết giao, tố giác +9","trò chuyện, kết giao, tố giác +12 · lỡ lời: mỗi thiệt hại bớt 2","Danh {n:virB.ngon.5.danh} · trò chuyện, kết giao, tố giác +15"],
 hanh:["Đức {n:virB.hanh.1.duc}","Đức {n:virB.hanh.2.duc}, Thái hậu {n:virB.hanh.2.th}",`Đức {n:virB.hanh.3.duc} · mỗi tháng Đức {n:rl.j85.hanhDucMonth} (đến ${BAL.virx.hanhCap})`,"Đức {n:virB.hanh.4.duc}, Thái hậu {n:virB.hanh.4.th}, Hoàng hậu {n:virB.hanh.4.hh}","Đức {n:virB.hanh.5.duc}, Danh {n:virB.hanh.5.danh}"]};
for(const k in VIRFX)sgRuleArr(VIRFX[k]);/* tokens read from BAL.virB / BAL.eff.j85 (jbal2, loads later) when shown */
/* ---- new arts: Thêu thùa, Nấu nướng ---- */
(function(){if(!ARTS.find(a=>a.k==="theu"))ARTS.push(sgRuleObj({k:"theu",n:"Thêu thùa",st:"tai",u:"Bậc 3: bán đồ thêu, Bạc {n:eff.j85.theuBac} mỗi tháng"},"u"),sgRuleObj({k:"nau",n:"Nấu nướng",st:"tai",u:"Bậc 3: canh bổ dâng Hoàng thượng, Ân tình {n:eff.j85.nauAn} mỗi tháng"},"u"));
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
 if(k==="cong"){b.q=Math.round(virPts(p,k)*BAL.art.fx.cong);b.tier=lv>=BAL.cut.virCong[2]?2:lv>=BAL.cut.virCong[1]?1:0;b.prog=lv>=BAL.cut.virCong[0]?1:0}
 if(k==="dung"){b.odds=virO(p,k);b.sac=0;for(const l in VIRB.dung)if(lv>=+l)b.sac+=VIRB.dung[l].sac||0}
 if(k==="ngon"){b.odds=virO(p,k);b.slip=lv>=4?2:lv>=2?1:0}
 if(k==="hanh"){b.duc=lv*BAL.art.fx.hanh;b.month=lv>=3?1:0}
 return b}
function artBonus(p,k){const lv=artLv(p,k),cg=virtueBonus(p,"cong");const q=cl(Math.round(artPts(p,k)*BAL.art.fx.q+((p&&p.tai)||0)/10+cg.q),0,100);
 let tier=q<BAL.cut.wkQ[0]?1:q<BAL.cut.wkQ[1]?2:q<BAL.cut.wkQ[2]?3:q<BAL.cut.wkQ[3]?4:5;tier=Math.min(5,tier+cg.tier);
 return{lv,q,tier,odds:artO(p,k),gift:BAL.art.fx.gift[k]?Math.round(artPts(p,k)*BAL.art.fx.gift[k]):0,scheme:k==="ky"?artSide(p,k):0,detect:k==="y"&&lv>=2?20:0,night:k==="vu"||k==="y"?artSide(p,k):0}}
function productTier(p,k){return artBonus(p,k).tier}
function ducOf(p){if(!p)return 50;if(p===S)return S.duc||0;return p.duc==null?50:p.duc}
function ducOdds(p){const F=BAL.ducF;return Math.round((ducOf(p)-F.mid)/F.odds)}          /* credibility of an accuser: Đức 20 → -6, Đức 80 → +6 */
function ducShield(t){const F=BAL.ducF;return Math.round((ducOf(t)-F.mid)/F.shield)}         /* subtracted from frame/rumour odds against t: Đức 80 → -5, Đức 20 → +5 */
function ducDanger(v){const F=BAL.ducF;return Math.round((F.mid-ducOf(v))/F.danger)}         /* added to danger(v,t): Đức 10 → +8, Đức 90 → -8 */
function ducBetray(t){const F=BAL.ducF;return Math.round((F.mid-ducOf(t))/F.betray)}         /* added to buying t's servants: Đức 10 → +10 */
/* deed context: the act being done, so every Đức change carries its cause */
let DEED85=null;
function withDeed(n,f){const o=DEED85;DEED85=n;try{return f()}finally{DEED85=o}}
function deedRec(p,d,why){if(!p||!d)return;vNorm(p);p.dlog.push({w:(typeof wk==="function"?wk():0),n:why||"",d});if(p.dlog.length>16)p.dlog.shift()}
function ducLow(s){return String(s||"").replace(/<[^>]+>/g,"").replace(/^./,c=>c.toLowerCase())}
(function(){const a0=apply;apply=function(o){const d=o&&o.duc,b=S?S.duc:0;const r=a0.apply(this,arguments);try{if(d&&S){const dd=S.duc-b;if(dd&&DEED85){deedRec(S,dd,DEED85);if(!quiet)log(`<span class="${dd>0?"g":"r"}">Đức ${dd>0?"+":""}${dd} vì ${ducLow(DEED85)}.</span>`)}}}catch(e){}return r}})();
(function(){const a0=ap;ap=function(p,o){const d=o&&o.duc;if(p===S||!d||!p)return a0.apply(this,arguments);const b=p.duc||0;const r=a0.apply(this,arguments);try{const dd=(p.duc||0)-b;if(dd)deedRec(p,dd,DEED85||"việc khuất tất")}catch(e){}return r}})();
function ducAdd(p,n,why){if(!p||!n)return 0;return withDeed(why||"việc vừa làm",()=>{if(p===S){apply({duc:n})}else ap(p,{duc:n});return n})}
/* every rulebook act (also when another module calls ACT[k].f directly) names itself */
/* jreg: acts added by later modules (giahoa, tat, phatquy, laydo, spyk…) name themselves too */
regEach(ACT,k=>{const A2=ACT[k];if(!A2||A2.__j85||typeof A2.f!=="function")return;const f0=A2.f;A2.f=function(a,t){return withDeed(A2.n,()=>f0.apply(this,arguments))};A2.__j85=1},"ACT deed");
(function(){const r0=runOpt;runOpt=function(a){return withDeed(a&&a.n,()=>r0.apply(this,arguments))}})();
(function(){const c0=chooseM;chooseM=function(i){const m=Q[0],c=m&&m.opts&&m.opts[i];return withDeed(c?c.n:null,()=>c0.apply(this,arguments))}})();
/* ---- what she knows: Đức (true nature) only once she knows the person; Danh is what the palace says ---- */
function ducKnown(v){if(!v||v===S)return true;try{S.kduc=S.kduc||{};return !!S.kduc[v.id]||trKnown(v).length>0||(v.ev||0)>0||(typeof evG==="function"&&evG(v,S)>0)}catch(e){return false}}
function ducWord(d){return d>=BAL.ducLv.word[3]?"hiền đức":d>=BAL.ducLv.word[2]?"tử tế":d>=BAL.ducLv.word[1]?"thường":d>=BAL.ducLv.word[0]?"bạc đức":"thất đức"}
function ducLine(v){vNorm(v);if(!ducKnown(v))return `Đức: <span class="ef n">chưa rõ</span> · Danh <b>${v.danh||0}</b> <span class="past">(tiếng ngoài)</span>`;
 const bad=v.dlog.filter(x=>x.d<0),good=v.dlog.filter(x=>x.d>0);const cnt=L=>{const m={};L.forEach(x=>{if(x.n)m[x.n]=(m[x.n]||0)+1});return Object.entries(m).map(([n,c])=>`${ducLow(n)}${c>1?` ×${c}`:""}`).join(", ")};
 return `Đức <b class="${v.duc<BAL.ducLv.word[1]?"r":v.duc>=BAL.ducLv.up?"g":""}">${v.duc}</b> (${ducWord(v.duc)}) · Danh <b>${v.danh||0}</b>${bad.length&&cnt(bad)?`<br><span class="ef r">Đã làm: ${cnt(bad)}</span>`:""}${good.length&&cnt(good)?`<br><span class="ef g">Việc thiện: ${cnt(good)}</span>`:""}`}
(function(){const rc=rvCard;rvCard=function(v,i){let h=rc(v,i);try{if(v.alive)h=h.replace('<div class="pcinfo">',`<div class="pcinfo"><span>${ducLine(v)}</span>`)}catch(e){}return h}})();
/* ---- Đức in the rules everyone shares ---- */
(function(){const d0=danger;danger=function(v,t){return d0.apply(this,arguments)+ducDanger(v)}})();
(function(){const o0=oAccuse;oAccuse=function(a,t){return oddsCl(o0.apply(this,arguments)+ducOdds(a)+virtueBonus(a,"ngon").odds)}})();
(function(){const o0=oBribe;oBribe=function(a,t){return oddsCl(o0.apply(this,arguments)+ducBetray(t))}})();
(function(){const o0=oPlant;oPlant=function(a,t){return oddsCl(o0.apply(this,arguments)+ducBetray(t))}})();
(function(){const o0=oAlly;oAlly=function(a,t){return oddsCl(o0.apply(this,arguments)+virtueBonus(a,"ngon").odds)}})();
/* frame / rumour against a target: the target's Đức is a shield (needs the target, so the act tells us who it is) */
let DT85=null;
function withT(t,f){const o=DT85;DT85=t;try{return f()}finally{DT85=o}}
(function(){const sh=n=>{const f0=window[n];if(typeof f0!=="function")return;window[n]=function(a){a=a||S;const r=f0.apply(this,arguments);return oddsCl(r-(DT85&&DT85!==a?ducShield(DT85):0)+artBonus(a,"ky").scheme)}};
 ["oFrame","oKFrame","oRumor"].forEach(sh);
 ["oSpy","oPoison","oKSab","oKPoison","oBlock"].forEach(n=>{const f0=window[n];if(typeof f0!=="function")return;window[n]=function(a){a=a||S;return oddsCl(f0.apply(this,arguments)+artBonus(a,"ky").scheme)}});
 for(const k of ["frame","kframe","rumor","lygian"]){const A2=ACT[k];if(!A2)continue;const f1=A2.f,o1=A2.o;A2.f=function(a,t){return withT(t,()=>f1.apply(this,arguments))};if(o1)A2.o=function(a,t){return withT(t,()=>o1.apply(this,arguments))}}})();
/* the cards she draws: Dung helps banquets/ceremonies, Ngôn helps social acts */
const DUNGRX=/yến|Yến|lễ|Lễ|thỉnh an|Thỉnh an|tiệc|Tiệc|hiến|Hiến/,NGONRX=/Thỉnh an|Kết giao|kết giao|Tặng|tặng|Lấy lòng|lấy lòng|Trò chuyện|trò chuyện|Xin |Tâng bốc|Nói thật/;
function vOddsFor(a,p){p=p||S;let b=0;if(!a||a.o==null||a.o>=100)return 0;if(DUNGRX.test(a.n||""))b+=virtueBonus(p,"dung").odds;if(a.dom==="Giao thiệp"||NGONRX.test(a.n||""))b+=virtueBonus(p,"ngon").odds;return b}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{(deck||[]).forEach(a=>{const b=vOddsFor(a);if(b)a.o=oddsCl(a.o+b)})}catch(e){}return r}})();
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{const sl=virtueBonus(S,"ngon").slip,od1=virtueBonus(S,"ngon").odds;(A||[]).forEach(a=>{if(a.o!=null&&a.o<100)a.o=oddsCl(a.o+od1+(DUNGRX.test(a.n||"")?virtueBonus(S,"dung").odds:0));if(sl&&a.l)for(const k in a.l){if(a.l[k]<0)a.l[k]=Math.min(0,a.l[k]+sl)}})}catch(e){}return A}})();
/* ---- learning (her): arts keep j23's three roads; the courses have two ---- */
(function(){const a0=addArt;addArt=function(k,g){if((k==="theu"||k==="nau")&&virtueBonus(S,"cong").prog)g+=1;vNorm(S);const l0=S.arts[k];const r=a0.call(this,k,g);
 for(let l=l0+1;l<=S.arts[k];l++){const b=k==="theu"?ARTB85.theu:null;if(b&&b[l]){apply(b[l]);log(`${ARTS.find(a=>a.k===k).n} bậc ${l}: ${fmt(b[l])}.`)}}return r}})();
/* Tứ đức teacher fee = the palace teacher fee: 8% of the learner's bổng (coordinator s7 decision c; jrcp tchFeeOf); was a flat 5+5×bậc */
function virCost(l,p){return typeof tchFeeOf==="function"?tchFeeOf(p||S):artFee(l)}
function addVir(p,k,g){vNorm(p);const V=VIR.find(x=>x.k===k);if(!V)return;
/* points go through the one course ladder (jbalcore crsPush, BAL.art) */
 crsPush(p.vir,p.virp,k,g,l=>{const f=(VIRB[k]||{})[l];
  if(f)withDeed(`${V.n} lên bậc ${l}`,()=>{if(p===S)apply(f);else ap(p,f)});
  if(p===S)log(`<span class="g">${V.n} (${V.full}) lên bậc ${l} · ${artNm(l)}.</span> ${VIRFX[k][l-1]}`)})}
function lessonVir(k,mode){if(!S||S.dead||Q.length||S.mg)return;vNorm(S);const l=S.vir[k],cost=virCost(l),V=VIR.find(x=>x.k===k);if(!V||l>=5)return;
 if(mode==="self"){if(!can(2)||S.suc<BAL.sucNeed.self)return;apply({suc:-BAL.td.selfSuc});spend(2);addVir(S,k,1);log(`Tự học ${V.n}. Tiến bộ +1.`)}
 else{if(!can(2)||S.bac<cost)return;apply({suc:-BAL.td.mSuc,bac:-cost});spend(2);const g=2+R(2);addVir(S,k,g);log(`Học ${V.n} với ma ma giáo tập. Tiến bộ +${g}.`)}
 save();render()}
window.lessonVir=lessonVir;
/* ONE act, two doors (danh-p1, owner P1 16/11): Tài nghệ · Tứ đức button (here) and the Hành sự card (jact adCharityCard);
   one lock S.charM (once a month), one effect body charityFx; numbers BAL.charity */
function charityLocked(){return !S||S.charM===S.turn||S.bac<BAL.charity.bac}
/* ONE function for her button and an NPC consort's choice (AG-ALL-2e cx3:charity, jagacts3) */
function charityFx(p){p=p||S;const C=BAL.charity;p.charM=S.turn;const fx={bac:-C.bac,duc:C.duc,danh:C.danh};if(p===S)withDeed("phát bạc cứu giúp cung nhân nghèo",()=>apply(fx));else ap(p,fx)}
function charity(){const C=BAL.charity;if(!S||S.dead||Q.length||!can(C.khac)||charityLocked())return;charityFx();spend(C.khac);save();render()}
window.charity=charity;
try{wrapR("lessonVir",(k,m)=>`${m==="self"?"Tự học":"Học"} ${(VIR.find(x=>x.k===k)||{}).n||""}`);wrapR("charity",()=>"Phát bạc cứu giúp cung nhân")}catch(e){}
document.addEventListener("click",e=>{const b=e.target.closest("[data-vlearn],[data-charity],[data-v85tab]");if(!b||b.disabled)return;e.stopPropagation();
 if(b.dataset.vlearn)lessonVir(b.dataset.vlearn,b.dataset.mode);else if(b.dataset.charity)charity();else v85Table(b.dataset.v85tab)},true);
/* ---- the same rules for every NPC: study by trait, a teacher when the purse allows ---- */
function addArtP(p,k,g){if(p===S)return addArt(k,g);vNorm(p);const a=ARTS.find(x=>x.k===k);if(!a)return;if((k==="theu"||k==="nau")&&virtueBonus(p,"cong").prog)g+=1;
/* the one course ladder (jbalcore crsPush): same points, same bậc effects as hers (j2 addArt + j23/j85 extras) */
 crsPush(p.arts,p.artp,k,g,l=>{const f={[a.st]:BAL.art.stUp};if(BAL.art.danh[l])f.danh=BAL.art.danh[l];const b=(ARTB85[k]||{})[l];if(b)for(const x in b)f[x]=(f[x]||0)+b[x];ap(p,f)})}
function npcStudy(v){if(!v||!v.alive||v.out||(window.agDOn&&agDOn())||!roll(BAL.start.npc.study*(1+BAL.net.k.study*netQ(v,"study"))))return;npcStudyDo(v)}
/* the study itself (the player's Tự học / Học với thầy rule for an NPC); AG-ALL: the day plan calls it as her choice (jagacts cx:study) */
function npcStudyDo(v){if(!v||!v.alive||v.out)return;vNorm(v);const T=traitsOf(v)||[];const W=[];
 const w=k=>{let x=1;if(/Ân cần|Khiêm nhường/.test(T.join()))x*=(k==="hanh"?3:k==="dung"||k==="cong"?2:1);if(T.includes("Xảo quyệt"))x*=(k==="ky"?3:k==="ngon"?2:k==="hanh"?.3:1);if(T.includes("Kiêu ngạo"))x*=(k==="vu"||k==="dung"?2:1);return x};
 const bk=(typeof stBestArt==="function"&&stBestArt(v)||{}).k;/* like a player she keeps at her best art (BAL.start.npc.focus) */ARTS.forEach(a=>{if(v.arts[a.k]<5)W.push(["a",a.k,w(a.k)*(a.k===bk?BAL.start.npc.focus:1)])});VIR.forEach(x=>{if(v.vir[x.k]<5)W.push(["v",x.k,w(x.k)])});if(!W.length)return;
 const [t,k]=mindPick(W.map(x=>[x,x[2]]),v)||W[0];const l=t==="a"?v.arts[k]:v.vir[k],cost=t==="a"?(typeof tchFeeOf==="function"?tchFeeOf(v):artFee(l)):virCost(l,v);
 const SX=BAL.ag.par3.study;const paid=(v.bac||0)>=cost+SX.keep&&mindPick([["t",SX.teach],["s",SX.self]],v)==="t";let g=1;if(paid){ap(v,{bac:-cost});g=2+R(2)}
 /* AG-ALL-2b mg2 (owner OD 17/11 ~15:25Z (3)): her lesson game for the NPC = one draw (jmgt mgNpcRaw, practice board occ hoc at the NPC's level) through HER
    points rule: an art = j83 wkLessonPts (teacher or self, same value, as her art lessons); a virtue = jtd tdPoints (self / with a ma ma) */
 if(typeof mg2On==="function"&&mg2On()&&BAL.ag.mg2.study){try{if(t==="a"&&typeof wkLessonPts==="function")g=wkLessonPts(kg82NpcRaw(v,kg82Kind(k,"",true),{occ:"hoc"}));
  else if(t==="v"&&typeof tdPoints==="function"&&typeof TD_OF!=="undefined"&&TD_OF[k])g=tdPoints(paid?"master":"self",kg82NpcRaw(v,TD_OF[k],{occ:"hoc",lv:l}))}catch(e){}}
 if(!g)return;if(t==="a")addArtP(v,k,g);else addVir(v,k,g)}
/* ---- monthly effects (every consort alike) ---- */
function v85Month(){if(!S||S.dead)return"";let ev="";const season=S.turn%3===0;
 for(const p of consorts()){if(!p||(p!==S&&(!p.alive||p.out)))continue;vNorm(p);const me=p===S,A=p.arts,f={};const add=(k,n)=>{if(n)f[k]=(f[k]||0)+n},E=BAL.eff.j85;
  if(A.theu>=3)add("bac",A.theu>=5?E.theuBac5:E.theuBac);if(A.nau>=2)add("suc",A.nau>=4?E.nauSuc4:E.nauSuc);if(A.nau>=3)add("an",A.nau>=5?E.nauAn5:E.nauAn);
  if(season){if(A.thi>=2)add("danh",E.thiDanhSeason);if(A.hoa>=2)add("danh",A.hoa>=4?E.hoaDanhSeason4:E.hoaDanhSeason)}
  if(A.y>=5)kidsOf(p).forEach(k=>{if(k.hp!=null)k.hp=Math.min(100,k.hp+BAL.eff.j85.hpV85Month)});
  if(A.cam>=5&&(p.sung||0)>=BAL.virx.camSung&&S.emp&&S.emp.mood>0&&roll(50))S.emp.mood--;
  if(Object.keys(f).length){if(me){apply(f);ev+=`Tài nghệ trong tháng: ${fmt(f)}. `}else ap(p,f)}
  /* Đức: Hạnh bậc 3 keeps it rising; it moves Thái hậu / Hoàng hậu and the servants' Lòng */
  if(virtueBonus(p,"hanh").month&&ducOf(p)<BAL.virx.hanhCap)withDeed("giữ đức hạnh (Hạnh bậc 3)",()=>me?apply({duc:BAL.rl.j85.hanhDucMonth}):ap(p,{duc:BAL.rl.j85.hanhDucMonth}));
  const d=ducOf(p),q=queenP(),tf=d>=BAL.ducLv.up?BAL.rl.j85.ducTf:d<BAL.ducLv.down?-BAL.rl.j85.ducTf:0;
  if(tf){if(me){S.th=cl(S.th+tf,-100,100);if(q&&q!==S)S.hh=cl(S.hh+tf,-100,100)}else if(q&&q!==p)p.hh=cl((p.hh||0)+tf,-100,100)}
  const lf=d>=BAL.ducLv.staffUp?BAL.rl.j85.ducStaff:d<BAL.ducLv.staffDown?-BAL.rl.j85.ducStaff:0;if(lf){(p.staff||[]).forEach(s=>{if(s.loyal!=null)s.loyal=cl(s.loyal+lf,0,100)});if(p.maid&&p.maid.loyal!=null)p.maid.loyal=cl(p.maid.loyal+lf,0,100)}
  /* (her Thái hậu / Hoàng hậu drift by Đức is written once, with numbers, in the turn-change line of jlogsync — log-sync r1) */
  if(me&&lf)ev+=lf>0?`Đức ${d}: kẻ hầu thêm thiện cảm (${balSg(lf)}). `:`Đức ${d}: kẻ hầu bớt thiện cảm (${balSg(lf)}). `;
  if(!me){npcStudy(p);if(d>=60&&d<85&&(p.bac||0)>=BAL.charity.bac*3&&!(window.agDOn&&agDOn())&&roll(5))withDeed("phát bạc cứu giúp cung nhân nghèo",()=>ap(p,{bac:-BAL.charity.bac,duc:BAL.charity.duc,danh:BAL.charity.danh}))}}
 return ev}
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);let e2="";try{if(!S.dead)e2=v85Month()}catch(e){}return typeof ev==="string"?ev+e2:ev}})();
/* ---- the danger ladder card names the Đức term ---- */
function dz85(d){const x=Math.round((BAL.ducF.mid-d)/BAL.ducF.danger);return `Đức ${d} thì ${x<0?"−"+(-x):"+"+x}`}/* the card's worked example: ducDanger at Đức d (sample inputs, not a rule cut; − sign as before) */
(function(){if(typeof bandCard!=="function")return;const b0=bandCard;bandCard=function(){return b0.apply(this,arguments)+`<p>Đức của người ra tay cũng tính: cộng (${BAL.ducF.mid} − Đức) ÷ ${BAL.ducF.danger}. ${dz85(10)}, ${dz85(90)}. Ngươi: Đức ${S.duc}, ${ducDanger(S)>=0?"+":""}${ducDanger(S)}.</p>`}})();
/* ---- the Tài nghệ tab: what each level gives, what the next one opens ---- */
function fxItems(s,cls){return String(s).split(" · ").map(x=>`<span class="ef ${cls}">${x}</span>`)}
function lvRows(fx,l,nm){const rows=[];fx.slice(0,l).forEach((s,i)=>rows.push([`Bậc ${i+1}`,fxItems(s,"g"),"g"]));if(l<5)rows.push([`Bậc ${l+1} mở`,fxItems(fx[l],"n"),"n"]);return kitRows(rows)}
function v85Table(k){const V=VIR.find(x=>x.k===k),A=ARTS.find(x=>x.k===k);
 if(k==="duc")return v85DucPanel();const fx=V?VIRFX[k]:ARTFX[k],l=V?virLv(S,k):artLv(S,k);if(!fx)return;
 kitModal({kind:"rule",title:V?`${V.n} · ${V.full}`:`${A.n}`,sub:V?V.d:(ARTDO[k]||""),sections:[{h:"Năm bậc",tiers:fx.map((s,i)=>({k:`Bậc ${i+1} · ${artNm(i+1)} · ${BAL.art.tier[i+1]} điểm`,n:s,c:i<l?"g":"",on:i+1===l}))}].concat(V?[]:[{h:"Ghi chú",rows:[["Điểm",`${artPts(S,k)}/100 · ${artNm(l)}; Tông sư (100) là cả đời khổ luyện`,"t"],["Lên bậc",`${A.st==="sac"?"Sắc":"Tài"} +${BAL.art.stUp} mỗi bậc; ${Object.keys(BAL.art.danh).map(l=>`bậc ${l} Danh +${BAL.art.danh[l]}`).join(", ")}`,"t"],["Phần thắng",`việc dùng ${A.n} dễ thành hơn: ${BAL.art.odds.slice(1).map((x,i)=>`bậc ${i+1} +${x}`).join(", ")}`,"t"],["Đêm lật thẻ",`Tranh sủng, Chặn ngự giá, Giữ chân Hoàng thượng dùng môn giỏi nhất: trúng môn Hoàng thượng chuộng tháng này thì dễ thành hơn theo bậc, trúng môn ngài không ưa thì khó hơn`,"t"]].concat(["cam","ky","thi","hoa"].includes(k)?[["Hoàng thượng trọng tài",`thi tài, phô tài trước mặt ngài tính bậc này ${xWord(BAL.art.emp)}`,"t"]]:k==="vu"?[["Hoàng thượng mê sắc",`múa trước mặt ngài tính bậc này ${xWord(BAL.art.emp)}, lật thẻ ${xWord(BAL.art.flipX)}`,"t"]]:[])}]),btn:"Đã hiểu"})}
function ducDeedList(){const L=[];for(const k in ACT){const A2=ACT[k];if(A2&&A2.c&&A2.c.duc<0)L.push([A2.n,A2.c.duc])}L.sort((a,b)=>a[1]-b[1]);return L}
function v85DucPanel(){const d=S.duc,bad=ducDeedList();
 kitModal({kind:"rule",title:"Đức",sub:"Ai cũng có Đức; việc làm thật mới làm Đức lên xuống",
  sections:[{h:"Thang Đức",tiers:[{k:`${balAb(BAL.ducLv.word[3])}–100`,n:"hiền đức",d:`khó bị vu oan, lời tố được tin; Thái hậu, Hoàng hậu ${balSg(BAL.rl.j85.ducTf)} mỗi tháng; kẻ hầu Thiện cảm ${balSg(BAL.rl.j85.ducStaff)} mỗi tháng`,c:"g",on:d>=BAL.ducLv.word[3]},{k:`${balAb(BAL.ducLv.up)}–${balAb(BAL.ducLv.word[3]-1)}`,n:"tử tế",d:`Thái hậu, Hoàng hậu ${balSg(BAL.rl.j85.ducTf)} mỗi tháng (từ ${balAb(BAL.ducLv.staffUp)}: kẻ hầu Thiện cảm ${balSg(BAL.rl.j85.ducStaff)})`,c:"g",on:d>=BAL.ducLv.up&&d<BAL.ducLv.word[3]},{k:"50–59",n:"đủ Đức",d:"đủ Đức để lên Hoàng hậu (mẹ Thái tử: 40)",on:d>=50&&d<60},{k:`${balAb(BAL.ducLv.down)}–49`,n:"bạc đức",d:`chưa được lên Hoàng hậu (dưới ${balAb(BAL.ducLv.staffDown)}: kẻ hầu Thiện cảm ${balSg(-BAL.rl.j85.ducStaff)} mỗi tháng)`,c:"r",on:d>=BAL.ducLv.down&&d<50},{k:`0–${balAb(BAL.ducLv.down-1)}`,n:"thất đức",d:`Thái hậu, Hoàng hậu ${balSg(-BAL.rl.j85.ducTf)} mỗi tháng; kẻ hầu dễ bị mua chuộc`,c:"r",on:d<BAL.ducLv.down}]},
   {h:`Cách tính (ngươi: Đức ${d})`,rows:[["Nguy hiểm",`(${BAL.ducF.mid} − Đức) ÷ ${BAL.ducF.danger} cộng`+" vào mức nguy hiểm của người ra tay: "+`${ducDanger(S)>=0?"+":""}${ducDanger(S)}`,"t"],["Tố giác",`(Đức − ${BAL.ducF.mid}) ÷ ${BAL.ducF.odds} cộng`+" vào phần thắng của người tố: "+`${ducOdds(S)>=0?"+":""}${ducOdds(S)}`,"t"],["Bị vu oan",`kẻ vu oan, tung tin đồn về ngươi được cộng (${BAL.ducF.mid} − Đức) ÷ ${BAL.ducF.shield}: `+`${-ducShield(S)>=0?"+":""}${-ducShield(S)}`,"t"],["Kẻ hầu",`(${BAL.ducF.mid} − Đức) ÷ ${BAL.ducF.betray} cộng`+" vào việc mua chuộc kẻ hầu của ngươi: "+`${ducBetray(S)>=0?"+":""}${ducBetray(S)}`,"t"],["Người khác","Đức của họ chỉ thấy khi ngươi đã biết nết họ hoặc nắm chứng cứ; Danh là tiếng ngoài, kẻ ác giấu mặt vẫn giữ Danh cao đến khi bị lộ","t"]]},
   {h:"Việc làm Đức giảm",rows:bad.map(([n,v])=>[n,`<span class="ef r">Đức ${v}</span>`,"r"])},
   {h:"Việc làm Đức tăng",rows:[["Phát bạc cứu giúp cung nhân",`<span class="ef g">Đức +${BAL.charity.duc}, Danh +${BAL.charity.danh}</span>`,"g"],["Xin tha cho cung nữ bị phạt",`<span class="ef g">Đức ${balSg(BAL.rl.j8.ducGo)}</span>`,"g"],["Ân xá người ở lãnh cung",`<span class="ef g">Đức ${balSg(BAL.ag.hh.pardonDuc)}</span>`,"g"],["Nhịn lời mỉa mai",`<span class="ef g">Đức ${balSg(apHostOpts(null)[0].fx.duc)}</span>`,"g"],["Học Hạnh",`<span class="ef g">Đức ${balSg(VIRB.hanh[1].duc)} mỗi bậc; từ bậc 3 mỗi tháng ${balSg(BAL.rl.j85.hanhDucMonth)}</span>`,"g"]]}],btn:"Đã hiểu"})}
artTabHTML=function(){vNormAll();const t2=whyTime(2);
 const card=(nm,img,l,prog,need,head,fx,B,k)=>`<div class="v85s"><div class="art"><b>${img?ic(img,20):""}${nm} · Bậc ${l}/5 <button class="lnk ladi" data-v85tab="${k}" title="Năm bậc" aria-label="Xem năm bậc của ${nm}">ⓘ năm bậc</button></b><span class="u">${head}</span>${l<5?`<span class="lv">Tiến bộ ${prog}/${need}</span><div class="mini"><u style="width:${Math.min(100,prog/need*100)}%"></u></div>`:""}${lvRows(fx,l)}</div><div class="pcb">${B.join("")}</div></div>`;
 let h=`<div class="ph"><span>Mỗi buổi học tốn 2 khắc. Học với thầy tốn bạc, tiến nhanh; tự học không tốn bạc, tiến chậm. Phi tần khác cũng học theo cùng luật.</span>${S.master?`<span class="g">Danh sư còn dạy ${S.master} tháng</span>`:""}</div>`;
 h+=`<div class="ph"><span><b>Tứ đức</b> · bốn môn của nữ nhi trong cung, không phải thanh số: mỗi bậc đổ vào Sắc, Đức, phần thắng và phẩm đồ tự làm.</span><span><button class="lnk ladi" data-v85tab="duc" title="Luật Đức" aria-label="Xem luật Đức">ⓘ luật Đức</button></span></div><div>`;
 h+=VIR.map(V=>{const l=S.vir[V.k],cost=virCost(l);const B=l>=5?[`<span class="ef g">${artNm(5)}</span>`]:[
   pbtn(`data-vlearn="${V.k}" data-mode="self"`,"Tự học",`tốn: 2 khắc, Sức ${balSg(-BAL.td.selfSuc)} · thành: tiến bộ một phần`,t2||(S.suc<BAL.sucNeed.self?"Sức dưới "+BAL.sucNeed.self:"")),
   pbtn(`data-vlearn="${V.k}" data-mode="master"`,"Học với ma ma",`tốn: 2 khắc, Bạc -${cost}, Sức ${balSg(-BAL.td.mSuc)} · thành: tiến bộ hai ba phần`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:""))];
  if(V.k==="hanh")B.push(pbtn(`data-charity="1"${capAt({k:BAL.charity.khac},BAL.charity.bac)}`,"Phát bạc cứu giúp cung nhân nghèo",`${capW()} · tốn: ${BAL.charity.khac} khắc, Bạc -${BAL.charity.bac} · thành: Đức +${BAL.charity.duc}, Danh +${BAL.charity.danh} (mỗi tháng một lần)`,whyTime(BAL.charity.khac)||(S.bac<BAL.charity.bac?`thiếu bạc (cần ${BAL.charity.bac})`:S.charM===S.turn?"tháng này đã làm":"")));
  return card(`${V.n} · ${V.full}`,"",l,S.virp[V.k],l+2,V.d,VIRFX[V.k],B,V.k)}).join("")+`</div>`;
 h+=`<div class="ph"><span><b>Tài nghệ</b> · cầm, kỳ, thi, họa, vũ, y, thêu, nấu.</span></div><div>`;
 h+=ARTS.map(a=>{const l=S.arts[a.k],need=l+2,cost=artFee(l);
  const B=l>=5?[`<span class="ef g">${artNm(5)}</span>`]:[pbtn(`data-learn="${a.k}" data-mode="self"`,"Tự học",`tốn: 2 khắc, Sức ${balSg(-BAL.artLes.self)} · thành: tiến bộ một hai phần`,t2||(S.suc<BAL.sucNeed.self?"Sức dưới "+BAL.sucNeed.self:"")),
   pbtn(`data-learn="${a.k}" data-mode="teacher"`,"Học với thầy",`tốn: 2 khắc, Bạc -${cost}, Sức ${balSg(-BAL.artLes.tch)} · thành: tiến bộ hai ba phần, luôn hơn tự học 1, có khi nghe chuyện`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:"")),
   S.thDead?"":pbtn(`data-learn="${a.k}" data-mode="th"`,"Học với Thái hậu",`tốn: 2 khắc, Sức ${balSg(-BAL.artLes.th)} · thành: tiến bộ một đến ba phần, Thái hậu +3`,t2||(S.th<40?"cần Thái hậu thương 40":(S.buoi||0)!==0?"chỉ buổi sáng":""))];
  const extra=(a.k==="theu"||a.k==="nau")?` · phẩm đồ tự làm ${artBonus(S,a.k).q}/100, bậc phẩm ${artBonus(S,a.k).tier}`:"";
  return card(a.n,AIMG[a.k],l,S.artp[a.k],need,(ARTDO[a.k]||"")+extra,ARTFX[a.k]||[],B,a.k)}).join("")+`</div>`;
 return h};
/* ---- performing arts only when she shows off (talk, night prep): Thêu/Nấu are crafts, not a show ---- */
bestArt=function(){let b={k:null,n:"giọng hát",l:0,w:0};for(const a of ARTS){if(a.k==="theu"||a.k==="nau")continue;const l=S.arts[a.k]||0,w=artW(a.k,l);if(w>b.w)b={k:a.k,n:a.n,l,w}}return b};
/* ---- a hidden villain keeps her Danh until a scheme is caught: then Danh BAL.eff.j85.caughtDanh and the victim sees her true Đức ---- */
(function(){const c0=caught;caught=function(a,t){const r=c0.apply(this,arguments);try{if(r&&a&&a!==S){ap(a,{danh:BAL.eff.j85.caughtDanh});if(t===S||evG(S,a)>0){S.kduc=S.kduc||{};if(!S.kduc[a.id])try{kitKnow({key:"duc:"+a.id,text:`Ngươi đã thấy rõ đức của ${typeof knowWho==="function"?knowWho(a):a.name}.`})}catch(e){}S.kduc[a.id]=1}}else if(r&&a===S)apply({danh:BAL.eff.j85.caughtDanh})}catch(e){}return r?r.replace(/\. $/,`; Danh ${a===S?"ngươi":a.name} ${balSg(BAL.eff.j85.caughtDanh)}. `):r}})();
/* taintItem (j8) is called straight from the NPC minds: name it */
(function(){if(typeof taintItem!=="function")return;const t0=taintItem;taintItem=function(p,ix,tk){return withDeed("lén bỏ thứ hại người vào đồ",()=>t0.apply(this,arguments))}})();
