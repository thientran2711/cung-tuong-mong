/* ================= BỔNG LỘC (monthly, every consort by the same ladder) and ÂN THƯỞNG ================= */
/* bổng lộc by rank: BAL.pay (jecon) is the one table; BL is its mirror for old readers, filled by jecon (one-core: the typed 30…320 here disagreed with the 40…280 paid) */
const BL=[];
const BLG=["1 súc vải · 1 gói trà","1 súc vải · 1 gói trà · than","1 súc lụa · 1 hộp trà · than","1 súc lụa · 1 hộp trà · than · son phấn","2 súc lụa · 2 hộp trà · than · son phấn","2 súc gấm · 2 hộp trà · than · son phấn","3 súc gấm · trà · than · son phấn · yến sào","4 súc gấm · trà · than · son phấn · yến sào · sâm"];
/* a servant's monthly wage: BAL.wage (jecon) */
/* pays one consort her month; returns the plain line. jecon (econStipend) is THE stipend; j53/j54 wrap this name for the children's fees, so jecon
   must not reassign it (it did: the fee wrappers were lost) */
function stipend(p){return typeof econStipend==="function"?econStipend(p):stipend0(p)}
function stipend0(p){const r=rkOf(p),me=p===S,staff=(p.staff||[]).length;let base=BL[Math.min(7,r)],why=[];
 if(p.out){base=5;why.push("lãnh cung: chỉ 5 bạc")}else{if(p.confined){base=Math.round(base/2);why.push("cấm túc: nửa bổng")}if(p.cutPay>0){base=Math.round(base*.7);why.push(`Nội vụ phủ khất bổng${p.cutBy?" theo ý "+p.cutBy:""}; bớt 3 phần 10`);p.cutPay--;if(!p.cutPay)p.cutBy=""}}
 const wage=p.out?0:staff*BAL.wage,bonus=p.bonusPay||0;p.bonusPay=0;const net=base-wage+bonus;ap(p,{bac:net});
 const line=`Bổng lộc tháng ${S.month} (${rkName(p)}): +${base} bạc${p.out?"":" · "+BLG[Math.min(7,r)]}${wage?` · công ${staff} kẻ hầu -${wage}`:""}${bonus?` · ân thưởng +${bonus}`:""} = ${net>=0?"+":""}${net} bạc${why.length?" ("+why.join("; ")+")":""}.`;
 return me?line:""}
/* a hostile Empress (or her, when Empress, by her own act) may have Nội vụ phủ hold back a consort's pay */
function payCuts(){const q=queenP();if(!q)return;for(const p of consorts()){if(p===q||p.out)continue;if(q!==S&&rel(q,p)<-30&&!(window.agDOn&&agDOn())&&roll(20)){p.cutPay=Math.max(p.cutPay||0,1);p.cutBy=q.name;if(p===S)log(`<span class="r">Hoàng hậu ${q.name} sai Nội vụ phủ khất bổng lộc của ngươi tháng tới.</span>`)}}}
/* the NPC Empress rewards her closest ally a little each season (two-way: she, as Empress, has 'Ban thưởng') */
function queenRewards(){const q=queenP();if(!q||q===S||S.month%3||(window.agDOn&&agDOn()))return;const w=mindPickBy(consorts().filter(p=>p!==q&&!p.out&&rel(q,p)>=20),p=>rel(q,p)*mindW(p,"help"),q);if(!w)return;/* npc-mind: was ARGMAX rel; gate rel≥20 kept */ap(w,{bac:20});w.ghen=cl((w.ghen||0)-5,0,100);if(w===S)log(`Hoàng hậu ${q.name} ban thưởng ngươi 20 bạc vì hiền thục. Bạc +20.`)}
function blCard(){return `<p>Bổng lộc phát ngày đầu mỗi tháng, theo phẩm vị (mọi phi tần như nhau). Mỗi kẻ hầu ăn công ${BAL.wage} bạc/tháng.</p>${kitRows(BL.map((b,i)=>[i>=7?"Hoàng hậu":RANKS[i].n,[`<span class="ef t">${b} bạc</span>`,BLG[i]].filter(Boolean),"n"]))}<p class="past">Lãnh cung: chỉ 5 bạc. Cấm túc: nửa bổng. Hoàng hậu ghét ngươi (Hoàng hậu quý ngươi dưới -30): mỗi tháng sai Nội vụ phủ khất bổng (bớt 3 phần 10): ${chanceW(20)}. Sinh con, được ân thưởng: cộng thêm một lần.</p>`}
/* ân thưởng: every reward has silver + item + jealousy; recorded */
const BBAC={night:0,contest:20,son:30,dau:15,promo:20,accuse:10,story:10,birthday:15,sinhthan:20,nurse:15};
BEST.dau=["tuithom","sonphan","luahang"];BEST.sinhthan=["tramngoc","vongngoc","gamto"];BEST.nurse=["nhansam","yensao","agiao"];
BWHY.dau="mừng công chúa ra đời";BWHY.sinhthan="nhân sinh thần của ngươi";BWHY.nurse="vì hầu thuốc chu đáo";
(function(){const b0=bestow;bestow=function(p,why){const n0=(p&&p.inv||[]).length,q0=Q.length;b0(p,why);if(!p||!p.inv||p.inv.length===n0)return;const k=p.inv[p.inv.length-1].k,bac=BBAC[why]||0;if(bac)ap(p,{bac});
 if(p===S){ghenAll(BAL.ghen.bestow);S.awards=(S.awards||[]);S.awards.unshift({d:`T${S.month}/${S.year}`,why:BWHY[why]||why,it:itm(k).n,bac});if(S.awards.length>60)S.awards.length=60;
  const m=Q[Q.length-1];if(Q.length>q0&&m&&m.t==="Thánh thượng ban thưởng")m.h+=`<p>${kitParse(`Chắc chắn · thành: ${itm(k).n}${bac?`, Bạc +${bac}`:""} · phi tần ghen +${ghenN(BAL.ghen.bestow)}`)}</p>`;log(`Ân thưởng ${BWHY[why]||""}: ${itm(k).n}${bac?`, Bạc +${bac}`:""}; phi tần ghen +${ghenN(BAL.ghen.bestow)}.`)}
 else{S.pg=0;p.pg=cl((p.pg||0)+3,0,100)}}})();
const AREASON=[["Đêm thị tẩm vui","night"],["Thắng ở yến tiệc, thi tài","contest"],["Sinh hoàng tử","son"],["Sinh công chúa","dau"],["Được tấn phong","promo"],["Tố giác kẻ gian thành","accuse"],["Tuyến truyện thành","story"],["Tiết Vạn thọ (tháng 8, người được sủng nhất)","birthday"],["Sinh thần của ngươi (Sủng từ 50)","sinhthan"],["Hầu thuốc Hoàng thượng khi ngài bệnh","nurse"]];
/* KIT §51: the rewards list and the award log are kit tables (kitRows); the jealousy is the kit relation chip (kitRel "them" label, red number) */
function awCard(){return `<p>Việc được ban thưởng và món được ban (một trong các món; mỗi lần: ${kitChip(kitRel("them","phi tần khác ghen ta"),3,"r")}):</p>${kitRows(AREASON.map(([n,k])=>[n,[(BEST[k]||[]).map(x=>itm(x).n).slice(0,3).join(", "),BBAC[k]?kitChip("Bạc",BBAC[k],"g"):""].filter(Boolean),"t"]))}<p class="past">Sinh con, tấn phong, thi tài: được ban hiệu (Danh +5) nếu chưa có hiệu: ${chanceW(30)}. Hoàng hậu ban thưởng người thân cận mỗi mùa.</p>`+
 `<h3>Sổ ân thưởng</h3>${(S.awards||[]).length?kitRows(S.awards.map(a=>[`${a.d} · ${a.why}`,[a.it,a.bac?kitChip("Bạc",a.bac,"g"):""].filter(Boolean),"t"])):`<p class="past">Chưa được ban thưởng lần nào.</p>`}`}
/* hook the month: stipends for everyone, cuts, seasonal and calendar rewards */
function monthPay(){let ev="";payCuts();const l=stipend(S);if(l)log(l);for(const v of liveRivals(true))stipend(v);queenRewards();
 if(S.month===8){const top=consorts().filter(p=>!p.out).sort((a,b)=>b.sung-a.sung)[0];if(top&&top.sung>=40)bestow(top,"birthday")}
 if(S.bmonth==null)S.bmonth=1+R(12);if(S.month===S.bmonth&&S.sung>=50&&!S.out)bestow(S,"sinhthan");return ev}
/* nursing the Emperor through illness: a card while he is ill */
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);if(S&&S.emp&&S.emp.ill&&!S.out&&!S.confined)deck.unshift({n:"Hầu thuốc Hoàng thượng",t:"Long thể bất an. Ngươi sang Dưỡng Hòa điện sắc thuốc, hầu bên giường.",c:{suc:-10},o:od(65+S.arts.y*5),w:{sung:4,an:2},l:{suc:-5},x:`được ban thưởng: ${chanceW(40)}`,dom:"Sủng",go:()=>{if(roll(40))bestow(S,"nurse")}})}})();
