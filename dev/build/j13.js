/* ================= ILLNESS: one rulebook for every person ================= */
const ILL={phonghan:{n:"Phong hàn",sea:["Thu","Đông"],die:0,cont:1},sotret:{n:"Sốt rét",sea:["Hạ"],die:.5},kietly:{n:"Kiết lỵ",sea:["Hạ"],die:.6,cont:1},
 lao:{n:"Lao phổi",slow:1,die:1,sac:-1},daumua:{n:"Đậu mùa",cont:1,die:1,scar:-8},tambenh:{n:"Tâm bệnh",die:0,sung:-2},hausan:{n:"Hậu sản",die:.5},
 docman:{n:"Trúng độc mãn tính",die:.8},matngu:{n:"Chứng mất ngủ",die:0},longthe:{n:"Long thể bất an",die:.6}};
const STG=["","nhẹ","nặng","nguy kịch"];
function illOf(p){return p&&p.ill&&ILL[p.ill.k]?p.ill:null}
function illName(p){const i=illOf(p);return i?`${ILL[i.k].n} · ${STG[i.st]}`:""}
function illKnown(p){const i=illOf(p);if(!i)return false;return p===S||i.known||ILL[i.k].cont&&i.st>=2||eyes(S)>=3}
function catchIll(p,k){if(illOf(p)||p.dead||p.alive===false)return"";p.ill={k,st:1,known:p===S};return p===S?`<span class="r">Ngươi mắc ${ILL[k].n.toLowerCase()}.</span> `:""}
function careOdds(p){return (p.doctor?15:0)+(p.arts?careY(p):0)+(p.anthai?5:0)}
function illMonthP(p){const me=p===S;let ev="";const i=illOf(p);
 if(!i){const sea=SEASON[S.month-1];let base=1.5+(p.suc<40?4:0)+(S.storms||0)*1.5;const L=Object.entries(ILL).filter(([k,d])=>d.sea&&d.sea.includes(sea));
  if(roll(base+(L.length?3:0))){const k=L.length&&roll(70)?pick(L)[0]:pick(["lao","matngu","phonghan"]);ev+=catchIll(p,k)}
  else if((p.sung<10||p.out)&&roll(6))ev+=catchIll(p,"tambenh");
  else if((p.inv||[]).some(e=>e.t==="chi"||e.t==="meo")&&roll(10))ev+=catchIll(p,"docman");
  else{const near=others(p).find(x=>illOf(x)&&ILL[x.ill.k].cont&&(together(p,x)||sameHouse(p,x)));if(near&&roll(8))ev+=catchIll(p,near.ill.k)}
  return ev}
 const d=ILL[i.k];ap(p,{suc:-5*i.st});if(d.sac)ap(p,{sac:d.sac});if(d.sung)ap(p,{sung:d.sung});
 const c=careOdds(p);if(roll(BAL.odb.j13.rbIllMonthP+c-(d.slow?15:0))){p.ill=null;if(d.scar)ap(p,{sac:d.scar});return ev+(me?`Ngươi khỏi ${d.n.toLowerCase()}${d.scar?", nhưng mặt để lại sẹo (Sắc "+d.scar+")":""}. `:"")}
 if(i.st<3&&roll(BAL.odb.j13.rbIllMonthP_2-c/2)){i.st++;if(me)ev+=`<span class="r">${d.n} trở ${STG[i.st]}.</span> `}
 else if(i.st===3&&d.die&&roll(25*d.die)){if(me){die(`${d.n} nguy kịch, không qua khỏi`);return ev}p.alive=false;dieMk(p,"ill");if(p.queen)p.queen=false;return ev+`<span class="r">${p.name} mất vì ${d.n.toLowerCase()}.</span> `}
 return ev}
function epidemic(){const P=consorts().filter(p=>p===S||p.alive&&!p.out);if(!roll(1.2))return"";const h=pick(P),hk=houseOf(h);let ev=`<span class="r">Dịch đậu mùa phát ở ${houseName(h)==="cung riêng"?"cung "+NM(h):houseName(h)}.</span> Cả cung bị phong tỏa một tháng. `;
 for(const p of P)if(houseOf(p)===hk){if(roll(35))ev+=catchIll(p,"daumua")||(p!==S?`${p.name} nhiễm bệnh. `:"");p.confined=Math.max(p.confined||0,1);for(const k of kidsOf(p))if(roll(45)){k.hp-=BAL.eff.j13.hpEpidemic;if(k.hp<=0)ev+=kidDie(k,"mất vì đậu mùa",p===S)}(p.staff||[]).slice().forEach(s=>{if(roll(10))p.staff.splice(p.staff.indexOf(s),1)})}
 return ev}
function illMonth(){let ev="";for(const p of consorts())ev+=illMonthP(p);ev+=epidemic();
 if(worldOn()){/* Emperor + Thái hậu illness: world facts, rolled on the host only (jcoopworld worldOn) */
 if(S.emp.age>50&&!illOf(S.emp)&&roll(3)){S.emp.ill={k:"longthe",st:1,known:true};S.emp.mood=2;ev+="Long thể bất an, Hoàng thượng ít vào hậu cung. "}
 else if(illOf(S.emp)){if(roll(35)){S.emp.ill=null;ev+="Long thể đã an. "}else if(S.emp.ill.st<3&&roll(30))S.emp.ill.st++}
 if(!S.thDead){if(!S.thIll&&roll(2))S.thIll={k:pick(["phonghan","lao"]),st:1,known:true};else if(S.thIll){if(roll(30))S.thIll=null;else if(S.thIll.st<3)S.thIll.st++;else if(roll(20)){S.thDead=true;S.th=0;ev+="<b>Thái hậu băng hà vì bệnh.</b> "}}}}
 for(const p of consorts())if(p.fakeIll){p.fakeIll--;if(roll(BAL.tw.g.illCatch)){p.fakeIll=0;ap(p,{danh:-BAL.tw.g.illDanh});punish(p,"giả bệnh khi quân",1);if(p===S)ev+=`<span class="r">Thái y khác bắt mạch: ngươi giả bệnh.</span> `}}
 return ev}
/* Giả bệnh: chance the Thái y finds her out over the whole span (BAL.tw.g.illCatch each month, BAL.tw.g.illWk months; same roll as illMonth) */
function fakeIllRisk(){const c=BAL.tw.g.illCatch/100;return Math.round(100*(1-Math.pow(1-c,BAL.tw.g.illWk)))}
/* the Emperor avoids the sick; quarantine blocks nights */
function illNightF(p){const i=illOf(p);if(p.fakeIll)return 1.2;return !i?1:ILL[i.k].cont?0:i.st>=2?.3:.7}
function treatO(p,way){return oddsCl(lotB(p,"Sức khỏe")+(way==="ty"?55+careOdds(p):way==="self"?30+careY(p):20+careOdds(p)))}
function treat(p,way){const i=illOf(p);if(!i)return"";let o=lotB(p,"Sức khỏe")+(way==="ty"?55+careOdds(p):way==="self"?30+careY(p):20+careOdds(p));
 const bribed=typeof thyBribedBy==="function"?thyBribedBy(p):mindPickBy(liveRivals(true).filter(v=>v!==p&&!v.coop/* E44j (c) T9 family: a co-op friend entry is a player seat, never the NPC briber (as jthaiy bribers rv) */&&S.court&&(S.court.ty.af[v.id]||0)>=30&&hostility(v,p)>=netTh(v,"host")),v=>hostility(v,p)*mindW(v,"bribe"),null);/* npc-mind: was FIRST */
 const ob=way==="ty"&&bribed?npcWhy("thyHarm",{p,b:bribed},()=>roll(BAL.ag.why.thyHarm.p)):null;/* npc-purpose G2: only a rival who really paid the physician (thyBribedBy) and still wants her harmed; the old 25 = the success */
 if(ob){i.st=Math.min(3,i.st+1);return `<span class="r">Thang thuốc của thái y làm bệnh nặng thêm.</span> (Có kẻ đã mua chuộc thái y?) `}
 if(roll(oddsCl(o))){p.ill=null;return `${NMc(p)} khỏi bệnh. `}if(i.st>1&&roll(BAL.rk.treatStep)){i.st--;return `Bệnh đỡ, còn ${STG[i.st]}. `}return "Bệnh chưa thuyên giảm. "}
function illCards(){const A=[];const i=illOf(S);
 if(i){A.push({n:"Truyền thái y",t:`Mời thái y đến chữa ${ILL[i.k].n.toLowerCase()}.`,c:{bac:-40},o:100,inner:1,oi:treatO(S,"ty"),k:2,w:{},x:`khỏi bệnh: ${chanceW(treatO(S,"ty"))} · chưa khỏi thì bệnh đỡ một bậc: ${chanceW(BAL.rk.treatStep)}`,go:()=>log(treat(S,"ty"))});
  if(S.arts.y>=3)A.push({n:"Tự bốc thuốc",t:"Dùng y thuật của mình.",c:{suc:-5},o:100,inner:1,oi:treatO(S,"self"),k:2,w:{},x:`khỏi bệnh: ${chanceW(treatO(S,"self"))} (Y thuật bậc ${S.arts.y})`,go:()=>log(treat(S,"self"))});
  A.push({n:"Tĩnh dưỡng",t:"Đóng cửa nằm nghỉ cả buổi.",c:{},o:100,inner:1,oi:treatO(S,"rest"),k:4,w:{suc:15},x:`khỏi bệnh: ${chanceW(treatO(S,"rest"))} · chưa khỏi thì bệnh đỡ một bậc: ${chanceW(BAL.rk.treatStep)}`,go:()=>log(treat(S,"rest"))})}
 else if(!S.fakeIll)A.push({n:"Giả bệnh",t:"Cáo bệnh để Hoàng thượng thương xót, tránh việc khó.",c:BAL.tw.fakeIll,o:100,inner:1,oi:100-fakeIllRisk()/* law 7 (review/m-fix-3): the corner word = the whole road, the months of being found out included */,k:1,w:{sung:BAL.tw.g.ill},x:`${BAL.tw.g.illWk} tháng: dễ được lật thẻ hơn · kèm: thái y bắt mạch ra (Danh -${BAL.tw.g.illDanh}, cấm túc ${punishMonths()} tháng): ${chanceW(fakeIllRisk())}`,go:()=>{S.fakeIll=BAL.tw.g.illWk}});
 return A}

/* ================= THE TUẦN'S FORTUNE: xin xăm ================= */
const LV=["Thượng thượng","Thượng","Trung","Hạ","Hạ hạ"],LVB=[10,5,0,-5,-10];
const DOMS=["Sủng","Danh","Mưu kế","Con cái","Sức khỏe","Tài nghệ","Giao thiệp","Hung"];
const LOTS=[[0,"Phượng hoàng đậu ngọn ngô đồng,\nMây lành năm sắc phủ hoàng cung.","Mọi việc hanh thông, cơ hội lớn."],[0,"Trăng tròn soi giữa hồ thu,\nThuyền xuôi gió thuận, mây mù tan hết.","Điều mong sẽ thành."],[0,"Cành mai nở giữa tuyết sương,\nMột mình đứng vững, trăm hương cúi đầu.","Vững lòng thì thắng."],[0,"Rồng về biển cả, hổ về non,\nĐúng thời đúng chỗ, việc nào cũng tròn.","Thời vận đang đến."],[0,"Mưa xuân thấm đất, lúa đâm bông,\nGieo gì gặt nấy, chẳng uổng công.","Công sức được đền đáp."],[0,"Ngọc trong đá vỡ lộ ánh quang,\nNgười tài gặp chủ, rạng muôn phương.","Tài năng được thấy."],
 [1,"Gió đông đưa cánh én về,\nTin vui đâu đó gần kề cửa son.","Có tin mừng nhỏ."],[1,"Sen nở hồ trong, hương ngát xa,\nLòng ngay thì chẳng sợ ai gièm pha.","Giữ đức, được lợi."],[1,"Đường xa có bạn cùng đi,\nKhó khăn chia sẻ, ngại gì gian nan.","Nên kết giao."],[1,"Nước chảy đá mòn, chí chẳng sờn,\nTừng bước vững vàng, quả ngọt hơn.","Kiên nhẫn sẽ thành."],[1,"Đèn khuya soi quyển sách hiền,\nChữ vàng nét ngọc, tiếng truyền bốn phương.","Học hành có tiến bộ."],[1,"Trúc xanh qua bão vẫn còn,\nCong mình theo gió, chẳng mòn gốc sâu.","Mềm mỏng thì yên."],
 [2,"Mây che nửa mảnh trăng rằm,\nViệc chưa rõ ngọn, chớ lầm vội tin.","Chưa tốt chưa xấu, nên chờ."],[2,"Thuyền đi giữa khúc sông dài,\nChẳng nhanh chẳng chậm, chớ nài sóng to.","Bình thường."],[2,"Hoa nở có lúc, tàn có khi,\nThuận theo trời đất, lo gì mai sau.","Thuận theo tự nhiên."],[2,"Ngựa hay chưa gặp người hay,\nHãy còn chờ đợi một ngày mai sau.","Thời chưa đến."],[2,"Chén trà nguội giữa đêm thanh,\nLòng người khó đoán, chớ đành nói ra.","Giữ lời."],[2,"Cửa đóng then cài, khách chửa sang,\nYên ổn trong nhà, chớ ra đàng xa.","Ở yên là hơn."],
 [3,"Gió tây thổi lạnh ngõ cung,\nLời ngon tiếng ngọt, độc trong chén vàng.","Coi chừng người gần."],[3,"Lá vàng rụng xuống thềm rêu,\nViệc mong chưa tới, sầu nhiều hơn vui.","Việc khó thành."],[3,"Mưa dầm nước ngập lối đi,\nBước chân chậm lại, chớ thì tranh đua.","Nên lùi một bước."],[3,"Chim lạc bầy giữa trời đông,\nMột mình khó chống bão giông bốn bề.","Thiếu người giúp."],[3,"Gương mờ khó thấy mặt mình,\nLòng còn mê muội, chớ đành ra tay.","Đừng hành động vội."],[3,"Hương tàn khói tắt giữa đêm,\nNgười đi chẳng lại, nỗi niềm ai hay.","Có điều buồn."],
 [4,"Rắn độc nằm trong bụi hoa,\nBước chân chẳng cẩn, máu sa thềm hồng.","Đại hung, coi chừng mưu hại."],[4,"Thuyền con gặp sóng giữa dòng,\nBuồm rách lái gãy, mênh mông bốn bề.","Nguy hiểm, nên giữ mình."],[4,"Trăng khuyết, đèn tắt, cửa cài,\nTiếng cú kêu sương, ai hay lòng người.","Có kẻ hãm hại trong tối."],[4,"Cây cao gió lớn dễ nghiêng,\nDanh cao hiểm lắm, ưu phiền theo sau.","Danh vọng gặp họa."],[4,"Hổ dữ rình bên suối khuya,\nĐi đêm một bước, chia lìa trăm năm.","Chớ mạo hiểm."],[4,"Mây đen kéo kín trời tây,\nMưa giông sấm sét, đổ ngay trên đầu.","Tai họa bất ngờ."]];
/* each verse speaks of one domain; the lot's domain is the verse's */
const LDOM=["Sủng","Giao thiệp","Danh","Mưu kế","Con cái","Tài nghệ","Con cái","Danh","Giao thiệp","Mưu kế","Tài nghệ","Sức khỏe","Mưu kế","Giao thiệp","Con cái","Sủng","Giao thiệp","Sức khỏe","Sức khỏe","Sủng","Danh","Giao thiệp","Mưu kế","Con cái","Hung","Sức khỏe","Hung","Danh","Mưu kế","Hung"];
function drawLot(p,better){const pickL=()=>{const i=R(LOTS.length);return{i,lv:LOTS[i][0],dom:LDOM[i]||"Sủng"}};let l=pickL();if(better){const m=pickL();if(m.lv<l.lv)l=m}p.lot=l;return l}
function lotB(p,dom){return p&&p.lot&&dom&&p.lot.dom===dom?LVB[p.lot.lv]:0}
/* odds step of o (ONE CORE: the step words live only in KIT_ODDS j79, the cuts in BAL.odds; review/one-core-dup-r1) */
function ladI(o){return oddsLv(cl(Math.round(o),BAL.odds.lo,BAL.odds.hi))}
/* the lot's pull on one card, in ladder steps; o = the odds before the lot */
function lotTag(dom,o){const b=lotB(S,dom);if(!b)return"";const d=o==null?0:ladI(o+b)-ladI(o);return ` · Quẻ: ${b<0?"khó":"dễ"} hơn ${d?Math.abs(d)+" bậc":"một chút"}`}
/* the lot in plain words: scope, direction, the cards it touches */
function lotEffect(l){if(!l)return"";if(l.dom==="Hung")return l.lv>=3?"Tuần này phi tần dễ ra tay hại ngươi hơn (gấp rưỡi). Nên giữ mình, ít ra ngoài.":"";const b=LVB[l.lv];if(!b)return"Tuần này không có gì thay đổi.";
 const names=[...new Set((deck||[]).filter(a=>a.dom===l.dom).map(a=>a.n).concat(Object.keys(ACTDOM).filter(k=>ACTDOM[k]===l.dom&&ACT[k]).map(k=>ACT[k].n)))].slice(0,5);
 const st=Math.abs(b)>=10?"khoảng một bậc":"nửa bậc";const W5=KIT_ODDS[5],W4=KIT_ODDS[4];const ex=b<0?(Math.abs(b)>=10?`${W5} → ${W4}`:`có khi ${W5} → ${W4}`):(b>=10?`${W4} → ${W5}`:`có khi ${W4} → ${W5}`);
 return `Tuần này: các việc thuộc «${l.dom}» ${b<0?"khó":"dễ"} thành hơn ${st} (${ex}).${names.length?` Gồm: ${names.join(", ")}${names.length>=5?"…":""}.`:""}`}
function lotHTML(l){const L=LOTS[l.i];return `<div class="xam"><div class="tube">Xăm</div><div class="stick">${LV[l.lv]}</div></div><p style="text-align:center"><b>Quẻ ${LV[l.lv]}</b> · ${l.dom}</p><p style="text-align:center;font-style:italic">${L[1].replace("\n","<br>")}</p><p class="past" style="text-align:center">${L[2]}</p><p style="text-align:center"><span class="ef ${LVB[l.lv]<0||(l.dom==="Hung"&&l.lv>=3)?"r":LVB[l.lv]>0?"g":"n"}">${lotEffect(l)}</span></p>`}
function newLots(){const l=drawLot(S,false);S.relot=0;if(worldOn())for(const v of liveRivals(true))drawLot(v,false);/* NPC lots: host only */log(`Xin xăm: quẻ ${LV[l.lv]} · ${l.dom}.`);if(!window.__dawnOn)Q.push({t:"Gieo quẻ đầu tuần",h:lotHTML(l)})}
function reLot(better){if(S.dead||Q.length)return;if(!better){if(S.relot||S.bac<BAL.lot.bac||!can(BAL.lot.k))return;apply({bac:-BAL.lot.bac});spend(BAL.lot.k);S.relot=1}const l=drawLot(S,!!better);log(`Gieo lại: quẻ ${LV[l.lv]} · ${l.dom}.`);Q.push({t:better?"Xin xăm ở Phật đường":"Gieo lại quẻ",h:lotHTML(l)});render()}
/* which domain an act belongs to */
const ACTDOM={spy:"Mưu kế",frame:"Mưu kế",poison:"Mưu kế",rumor:"Mưu kế",bribe:"Mưu kế",block:"Mưu kế",musk:"Mưu kế",catswap:"Mưu kế",ksab:"Mưu kế",kpoison:"Mưu kế",pond:"Mưu kế",kframe:"Mưu kế",plant:"Mưu kế",accuse:"Danh",vp:"Danh",takeaway:"Con cái",ally:"Giao thiệp",gift:"Giao thiệp",steal:"Sủng",road:"Sủng"};
