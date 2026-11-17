/* ================= jreign: TÂN QUÂN LẬP UY — the Emperor's side story + her faction road (owner 16/11, D5) =================
   New games only (S.ps + S.reign, review/palace-start). Old saves never see any of this.
   (1) WORLD (shared court, co-op: lives in S.trieu.rg, a W_KEYS world key → host-authoritative; numbers merge as deltas):
       rg = {p: the throne's grip 0..100 (BAL.ps.power0 = 30 at the accession), ch: chapter the court has reached, t0: start turn,
             out: "" | "emp" | "th" | "quyen" (how the struggle ended), at: turn of the outcome, n: news lines}.
       Each month (host only): p drifts up (the young Emperor grows into the throne, BAL.rg.drift), court noise, Quốc sự (low Biên cương /
       Kho lúa costs him), and every consort of a side with Sủng ≥ BAL.rg.npcS pushes a little. Chapter ch opens at BAL.rg.at[ch] months.
       Chapter 6 ends the struggle: p ≥ BAL.rg.B → "emp" (thân chính: the regent's house falls, the Thái hậu withdraws to prayer);
       p < BAL.rg.A → "quyen" (the regent rules as nhiếp chính); else "th" (rèm châu: the Thái hậu sits behind the curtain, both sides cut).
   (2) HER ROAD (personal, S.reign): side = null | "emp" | "th" | "quyen" | "ngoai" (stood aside), tr = trust of her side (0..100),
       done = beats she has played, sw = switches, swT = turn of the last switch, res = her outcome line.
       Clear moment: Chương 2 "Ba ngả đường" (and again Chương 4 Hồi 2 "Lối rẽ"); any time after: Mệnh truyện › Triều cục › "Đổi phe"
       (a price: the side left behind turns on her, Danh, trust starts low; cooldown BAL.rg.swCd months, at most BAL.rg.swMax).
       Each side: its own errands between chapters (power push, trust, own gains), its own enemies (the other sides' consorts and houses),
       its own ending (winner: Hoàng thượng = tấn phong thẳng, không khảo hạch (owner 16/11 06:20Z) / Thái hậu = che chở + Thái hậu quý ngươi / quyền thần = bạc + nhà ngoại thế lực;
       loser: the mirror loss). Family: tt = the regent's daughter, ch = the Thái hậu's kin, dtq = the general's house (backs the Thái hậu),
       thd = Hàn lâm (the Emperor's scholars); going against the father's side costs his favour.
   (3) NPC consorts belong to sides by their house (rgSideOf): Tể tướng → quyền thần; Đại tướng quân / Thái hậu kin → Thái hậu;
       Hàn lâm, Lễ bộ → Hoàng thượng; Hộ bộ swings with its tie to the Tể tướng. The outcome lifts the winners' Sủng and drops the losers'.
   Event dialogs are PEND items (pid "rg") → the kit hides outcomes (KIT §28.6), titles "Phụ tuyến · Tân quân lập uy · Chương c · Hồi i/n".
   Every Bạc option has a non-Bạc road (Sức / risk) of the same weight (owner 15/11 20:30Z). Numbers: BAL.rg (jbal2.js).
   (4) TÂM NGUYỆN: every named person carries a life goal; jreign adds 3-step j72 quest lines (rgL) for the 6 most important people
       (Thái hậu, Hoàng hậu, Phế phi họ Lý, her cung nữ thân tín, Tổng quản thái giám, Thái y). The Emperor's line is (1)-(2).
   Measure: dev/measure/reign.js (bots per side). Test: dev/test/reign.js. ================================================= */
const RGT="Tân quân lập uy";
const RGS={emp:{n:"Hoàng thượng",tag:"theo Hoàng thượng",cls:"g"},th:{n:"Thái hậu",tag:"theo Thái hậu",cls:"g"},quyen:{n:"quyền thần",tag:"theo quyền thần",cls:"g"},ngoai:{n:"đứng ngoài",tag:"đứng ngoài",cls:"n"}};
const RGQC="Tể tướng";/* the regent's house (phụ chính đại thần) */
/* off once the Emperor is dead (review/mortality lifespan death, j3 / j99succ succession epilogue): the struggle ends with him */
function rgOn(){return !!(S&&S.ps&&S.reign&&!S.dead&&!S.empDead&&!(S.succ&&S.succ.on)&&!(typeof isSrv==="function"&&isSrv()))}
function rgGuest(){const C=window.COOPW;return !!(C&&C.on&&C.seat&&C.seat!=="a")}
function rgB(){return BAL.rg}
function rgW(){if(!S||!S.reign||typeof trS!=="function")return null;const T=trS();if(!T)return null;
 if(!T.rg)T.rg={p:S.reign.power!=null?S.reign.power:BAL.ps.power0,ch:0,t0:S.reign.t0!=null?S.reign.t0:S.turn,out:"",at:null,n:[]};return T.rg}
function rgMe(){const r=S.reign;r.done=r.done||{};if(r.tr==null)r.tr=0;r.sw=r.sw||0;return r}
function rgMo(){const W=rgW();return W?S.turn-W.t0:0}
function rgP(){const W=rgW();return W?Math.round(W.p):0}
function rgPAdd(n){const W=rgW();if(!W||!n||W.out)return;W.p=cl(W.p+n,0,100);S.reign.power=Math.round(W.p)}
/* the Thái hậu's road pulls the court to the middle (neither the Emperor alone nor the regent) */
function rgPMid(n){const W=rgW();if(!W||W.out)return;n=n*BAL.rg.thK;const m=(BAL.rg.A+BAL.rg.B)/2;const d=m-W.p;rgPAdd(Math.sign(d)*Math.min(Math.abs(d),n))}
function rgPush(side,n){n=n*BAL.rg.pk;if(side==="emp")rgPAdd(n);else if(side==="quyen")rgPAdd(-n*BAL.rg.pkQ);else if(side==="th")rgPMid(n)}
function rgQH(){try{return tdHead(RGQC)}catch(e){return null}}
function rgQN(){const h=rgQH();return h?`Tể tướng ${h.name}`:"Tể tướng"}
function rgDadQ(){return !!(S.origin&&S.origin.k==="tt")}
/* her father's side by origin (null = no house in the struggle) */
function rgFam(){const k=S.origin&&S.origin.k;return k==="tt"?"quyen":k==="ch"||k==="dtq"?"th":k==="thd"?"emp":null}
function rgFamH(){try{const c=clanOf(S);return CLANS.includes(c)?tdHead(c):null}catch(e){return null}}
function rgFamAf(n){const h=rgFamH();if(!h||!n)return"";h.af=h.af||{};h.af[key(S)]=cl((h.af[key(S)]||0)+n,-100,100);return n>0?"Phụ thân hài lòng.":"Phụ thân gửi thư trách."}
function rgQAf(n){const h=rgQH();if(!h||!n)return;h.af=h.af||{};h.af[key(S)]=cl((h.af[key(S)]||0)+n,-100,100)}
/* a consort's side, by her house (same rule for everyone; cached on the person, the house never changes) */
function rgSideOf(p){if(!p)return null;if(p===S)return S.reign&&S.reign.side&&S.reign.side!=="ngoai"?S.reign.side:null;
 if(p.rgS!==undefined)return p.rgS;let c="";try{c=clanOf(p)}catch(e){}
 let s=null;if(c==="Tể tướng")s="quyen";else if(c==="Đại tướng quân"||c==="Thái hậu")s="th";else if(c==="Hàn lâm"||c==="Lễ bộ")s="emp";
 else if(c==="Hộ bộ"){try{s=tdRel("Hộ bộ",RGQC)>0?"quyen":"th"}catch(e){s=null}}p.rgS=s;return s}
function rgMembers(side){try{return liveRivals(true).filter(v=>rgSideOf(v)===side)}catch(e){return[]}}
function rgSideN(s){if(s==="quyen")return rgDadQ()?"phụ thân (Tể tướng)":"quyền thần";return RGS[s]?RGS[s].n:""}
function rgSideTag(s){if(s==="quyen")return `theo ${rgQN()}`;return RGS[s]?RGS[s].tag:"chưa chọn"}
/* the other sides' consorts resent her (her enemies), her own side's warm to her */
function rgRel(side,n){if(!side||side==="ngoai")return;for(const v of liveRivals(true)){const s=rgSideOf(v);if(!s)continue;if(s===side)relAdd(v,S,Math.round(n/2));else relAdd(v,S,-n)}}
function rgLead(side,n){if(!n)return;if(side==="emp")apply({sung:n});else if(side==="th")apply({th:n});else if(side==="quyen")rgQAf(n*2)}
function rgTr(n){const r=rgMe();r.tr=cl(r.tr+n,0,100)}
/* palace voice: {X}/{x} = what a servant calls her, {goi}/{xung}… = the speaker w ("emp" | "th" | "q" | "maid" | "hh") to her — the one core (jvoice kAddr) */
function rgSp(w){return w==="emp"||w==="th"||w==="hh"?w:w==="q"?{role:"x",rw:"quan"}:{srv:"f"}}
function rgTok(s,A,w){return String(s||"").replace(/\{([GgXx]oi|[Xx]ung)\}/g,m=>kSay(rgSp(w),S,m)).replace(/\{(\w+)\}/g,(m,k)=>({X:kSay({srv:"f"},S,"{Goi}"),x:kSay({srv:"f"},S,"{goi}"),q:rgQN(),qn:(rgQH()||{name:"Tể tướng"}).name,
 me:S.name,maid:S.maid?S.maid.name:"cung nữ thân tín",hh:(typeof qOn==="function"&&qOn())?rivals[0].name:"Hoàng hậu",tq:S.court&&S.court.tq?S.court.tq.name:"Tổng quản thái giám",
 dadq:rgDadQ()?`phụ thân ngươi, ${rgQN()}`:rgQN(),side:rgSideN(S.reign.side)})[k]||m)}
function rgWho(w){try{if(w==="emp")return pEmp();if(w==="th")return S.thDead?null:pTH();if(w==="q"){const h=rgQH();return h?pMin(h):null}if(w==="maid")return S.maid?pMaid():null;
 if(w==="hh")return(typeof qOn==="function"&&qOn())?pv(rivals[0]):null;if(w==="eun")return pEunCourt("tq");if(w==="me")return pMe()}catch(e){}return null}
function rgSk(k){return k?(S[k]||0):0}
function rgOd(o){if(o.p==null)return 100;let b=o.p;for(const [k,d] of (o.sk||[]))b+=rgSk(k)/d;if(o.trd)b+=rgMe().tr/o.trd;return odA(S,Math.round(b))}
function rgCost(c){c=Object.assign({},c||{});if(c.bac)c.bac=typeof price67==="function"?price67(c.bac):c.bac;return c}

/* ---------- the beats (Chương = chapter of the side story, Hồi = beat) ----------
   option: n name · s side it serves (bot + trust) · c cost (Bạc by rank) · p base odds (null = sure) · sk [[stat,div]] · w / l fx on win / loss
   · pw power push on win (side-aware: "emp" +, "quyen" −, "th" toward the middle) · pl push on loss · tr trust on win · join: side chosen
   · go(ok) extra text · if() shown only when true · wx / lx hint text (the kit hint reads it; numbers stay hidden). */
const RGC=[
 {t:"Tân quân",b:["c1a","c1b"]},
 {t:"Ba ngả đường",b:["c2a"]},
 {t:"Mật sự",b:["c3a","c3b"]},
 {t:"Dạ yến",b:["c4a","c4b"]},
 {t:"Biên ải nổi lửa",b:["c5a","c5b"]},
 {t:"Thân chính",b:["c6a","c6b"]}];
const RGBT={};
function rgSideNow(){const s=S.reign.side;return s&&s!=="ngoai"?s:null}
function rgJoinOpts(firstTime){const O=[];const fam=rgFam();const sd=S.reign.side;
 const fl=s=>fam?(fam===s?"phụ thân cùng phe":"trái ý phụ thân"):"";
 if(sd!=="emp")O.push({n:"Theo Hoàng thượng",s:"emp",join:"emp",w:{sung:firstTime?4:2},wx:["Hoàng thượng tin ngươi hơn",fl("emp"),"Thái hậu và nhà Tể tướng để ý ngươi"].filter(Boolean).join(", ")});
 if(sd!=="th"&&!S.thDead)O.push({n:"Theo Thái hậu",s:"th",join:"th",w:{th:firstTime?6:3},wx:["Thái hậu che chở ngươi",fl("th"),"nhà Tể tướng và phe bệ hạ để ý ngươi"].filter(Boolean).join(", ")});
 if(sd!=="quyen")O.push({n:rgDadQ()?"Theo phụ thân (Tể tướng)":`Theo ${rgQN()}`,s:"quyen",join:"quyen",w:{bac:firstTime?30:15},wx:["nhà Tể tướng hậu thuẫn ngươi bằng bạc và tin tức",fl("quyen"),"Hoàng thượng và Thái hậu để ý ngươi"].filter(Boolean).join(", ")});
 return O}
RGBT.c1a={w:"emp",t:"Đêm khuya ở Cần Chính điện, Hoàng thượng gác bút. Chồng tấu chương trước mặt ngài đã có lời phê sẵn của {q}. “Trẫm ngồi trên ngai mà chữ của trẫm chưa ra khỏi cửa điện.” Ngài quay sang ngươi: “{Goi} nghĩ sao?”",
 o:[{n:"Khuyên ngài nhẫn nại chờ thời",w:{sung:2,duc:1},pw:1,s:"emp",wx:"Hoàng thượng thấy ngươi hiểu chuyện"},
  {n:"Khuyên ngài dựa vào lớp quan trẻ ở Hàn lâm viện",p:40,sk:[["tamco",3],["tai",5]],w:{sung:3},pw:3,s:"emp",l:{sung:1},lq:-10,wx:"ngài có thêm người của mình trong triều",lx:"lời bàn lọt ra ngoài, nhà Tể tướng để ý ngươi"},
  {n:"Chỉ lặng lẽ mài mực hầu ngài",w:{sung:1},wx:"không dính vào chính sự"}]};
RGBT.c1b={w:"th",if:()=>!S.thDead,t:"Thái hậu gọi các phi tần đến Đức Thọ cung bàn lễ tế tiên đế, rồi chậm rãi nói: “Hoàng đế còn trẻ, triều chính đã có đại thần phụ chính và ai gia lo liệu. Hậu cung chớ bàn chuyện triều đình.” Bà nhìn thẳng vào ngươi.",
 o:[{n:"Cúi đầu vâng dạ",w:{th:3},s:"th",wx:"Thái hậu hài lòng"},
  {n:"Thưa rằng thần thiếp chỉ lo hầu hạ bệ hạ chu toàn",p:45,sk:[["tamco",3],["duc",4]],w:{th:2,sung:1},l:{th:-3},wx:"vừa lòng cả hai bên",lx:"Thái hậu nghe ra ý khác"},
  {n:"Nhắc khéo rằng bệ hạ cũng cần người tin cậy",p:30,sk:[["tamco",3]],w:{sung:2,th:-2},pw:2,s:"emp",l:{th:-8,danh:-2},wx:"lời ấy đến tai Hoàng thượng",lx:"Thái hậu phật ý, các cung xì xào"}]};
RGBT.c2a={w:"emp",faces:1,t:()=>{const f=rgFam();const fam=f?` ${f==="quyen"?`Phụ thân ngươi chính là ${rgQN()}.`:f==="th"?"Nhà ngươi vốn đứng sau Thái hậu.":"Nhà ngươi là môn sinh của Hàn lâm viện, xưa nay theo bệ hạ."}`:"";
  return `Mới nửa năm sau ngày đăng cơ, trong cung đã chia ba ngả. Ma ma Đức Thọ cung đưa đến một chuỗi tràng hạt: Thái hậu muốn ngươi gần gũi bà. Người của {q} gửi vào một hộp trầm, kèm lời nhắn: “Cùng giữ yên triều cục thì vinh hoa cùng hưởng.” Còn Hoàng thượng, đêm qua nắm tay ngươi rất lâu, chỉ nói: “Trẫm cần người tin được.”${fam} Chọn phe lúc này; về sau vẫn đổi được, nhưng phải trả giá.`},
 o:()=>rgJoinOpts(true).concat([{n:"Đứng ngoài, giữ mình",join:"ngoai",w:{duc:1},wx:"không phe nào nợ ngươi, cũng không phe nào che chở ngươi"}])};
/* chapter 3: side mission (spy, carry a message, copy a draft) */
RGBT.c3a={w:()=>({emp:"emp",th:"th",quyen:"q"})[rgSideNow()]||"maid",
 t:()=>({emp:"Hoàng thượng đặt vào tay ngươi một phong thư gắn xi: “Đưa đến Phiêu kỵ tướng quân. Không được qua tay người của Tể tướng.” Cửa cung nào cũng có tai mắt của {q}.",
  th:"Thái hậu lần tràng hạt: “Đêm đêm ai ra vào Cần Chính điện, hoàng đế bàn chuyện gì với ai, {goi} ở gần thì để ý giùm ai gia.”",
  quyen:"Người của {dadq} lén gặp ngươi ở góc Ngự hoa viên: “Bản nháp chiếu thư trên án của bệ hạ, {x} hầu mực, chỉ cần chép lại vài dòng.”"})[rgSideNow()]||"{maid} thì thầm: “Phe nào cũng sai người đến dò ý {x}. Đứng giữa lâu e khó yên.”",
 o:()=>{const s=rgSideNow();
  if(s==="emp")return[{n:"Giấu thư trong hộp điểm tâm, sai {maid} mang ra",p:35,sk:[["tamco",3],["mat",.5]],w:{sung:4},pw:6,tr:12,s,l:{sung:1},pl:-2,ev:"quyen",wx:"thư đến tay tướng quân, Hoàng thượng thêm người cầm quân",lx:"thư bị chặn, người phe Tể tướng nắm Chứng cứ về ngươi"},
   {n:"Tự mang thư khi xin ra chùa dâng hương",c:{suc:-10},p:40,sk:[["duc",3],["danh",4]],w:{sung:3},pw:5,tr:10,s,l:{th:-6},pl:-1,wx:"thư đến nơi",lx:"Thái hậu biết ngươi ra cung bất thường"},
   {n:"Khéo trả thư, xin ngài tìm người khác",w:{sung:-4},tr:-10,wx:"không dính vào việc nguy, nhưng ngài thất vọng"}];
  if(s==="th")return[{n:"Ghi chép tỉ mỉ, mỗi tuần báo lên",p:35,sk:[["mat",.5],["tamco",3]],w:{th:6},pw:5,tr:12,s,l:{sung:-8},wx:"Thái hậu nắm được triều cục",lx:"Hoàng thượng biết ngươi dò ý ngài"},
   {n:"Chỉ báo những chuyện vô hại",w:{th:2},pw:1,tr:4,s,wx:"êm chuyện, ít công"},
   {n:"Thưa rằng thần thiếp không dám dò thánh ý",w:{th:-5,sung:1},tr:-10,wx:"giữ được lòng bệ hạ, Thái hậu phật ý"}];
  if(s==="quyen")return[{n:"Chép lén bản nháp khi hầu mực",p:35,sk:[["tamco",3],["tai",6]],w:{bac:40},pw:6,tr:12,s,l:{sung:-10},pun:1,lq:-5,wx:"Tể tướng đi trước bệ hạ một bước",lx:"Hoàng thượng bắt gặp, cấm túc ngươi"},
   {n:"Chỉ kể lại đại ý, không chép",w:{bac:15},pw:2,tr:4,s,wx:"êm chuyện, ít công"},
   {n:"Từ chối, không dám phạm thánh ý",w:{sung:1},lq0:-10,tr:-10,wx:"giữ được lòng bệ hạ, nhà Tể tướng phật ý"}];
  return rgJoinOpts(false).concat([{n:"Cáo bệnh, đóng cửa không tiếp ai",c:{suc:-6},w:{duc:1},wx:"tạm yên"}])}};
RGBT.c3b={w:()=>rgSideNow()==="emp"?"q":rgSideNow()==="quyen"?"emp":"hh",if:()=>!!rgSideNow(),
 t:()=>{const s=rgSideNow();const foe=liveRivals(true).find(v=>{const x=rgSideOf(v);return x&&x!==s});
  return `${foe?`${rkName(foe)} ${foe.name}`:"Một phi tần phe khác"} chặn ngươi giữa hành lang, cười nhạt: “Dạo này {x} bận rộn quá. Không biết Thái hậu và Hoàng thượng có biết {x} bận việc gì không?” Chuyện ngươi theo ai đã có người đánh hơi.`},
 o:()=>{const s=rgSideNow();return[{n:"Thản nhiên chối, nói sang chuyện khác",p:45,sk:[["tamco",3]],w:{},tr:2,s,l:{danh:-3},ev:"foe",wx:"nàng không nắm được gì",lx:"nàng nắm thêm Chứng cứ về ngươi"},
  {n:"Biếu lễ để nàng im lặng",c:{bac:-40},p:70,sk:[],w:{},l:{danh:-2},wx:"nàng nhận lễ, tạm im",lx:"nàng nhận lễ mà vẫn nói ra"},
  {n:"Cầu người đứng đầu phe che chở",c:{suc:-8},p:60,sk:[["danh",5]],w:{},tr:-4,s,l:{danh:-2},wx:"phe mình ra mặt che cho ngươi",lx:"phe mình không kịp ra tay"}]}};
/* chapter 4: host a banquet, then the second clear moment (keep or switch) */
RGBT.c4a={w:"me",t:()=>{const s=rgSideNow();return s?`Phe ${rgSideN(s)} cần lòng nhà Hộ bộ thượng thư và các mệnh phụ. Người ta nhờ ngươi mở dạ yến ở cung mình, mời phu nhân các nhà quyền quý đến ngắm trăng, nghe đàn.`:"Đêm Trung thu, các cung mở dạ yến. Mệnh phụ các nhà quyền quý đều để ý xem cung ngươi đãi khách ra sao."},
 o:()=>{const s=rgSideNow();return[{n:"Bày yến lớn, rượu ngon nhạc hay",c:{bac:-60},p:60,sk:[["danh",4]],w:{danh:4},pw:5,tr:8,s,l:{danh:-1},wx:"mệnh phụ khen ngợi, nhà Hộ bộ nghiêng về phe ngươi",lx:"yến tiệc nhạt, phí bạc"},
  {n:"Tự tay nấu nướng, đàn một khúc mời khách",c:{suc:-14},p:35,sk:[["tai",2],["sac",5]],w:{danh:4},pw:5,tr:8,s,l:{danh:-1},wx:"khách cảm lòng, nhà Hộ bộ nghiêng về phe ngươi",lx:"khách lễ phép mà không mặn mà"},
  {n:"Cáo bệnh, không mở yến",w:{},tr:s?-8:0,wx:"tiết kiệm sức và bạc"}]}};
RGBT.c4b={w:()=>({emp:"emp",th:"th",quyen:"q"})[rgSideNow()]||"maid",t:()=>{const s=rgSideNow();const p=rgP();const lean=p>=BAL.rg.B-5?"thế bệ hạ đang lên":p<BAL.rg.A+5?"nhà Tể tướng đang mạnh":"ba phe giằng co chưa phân";
  return s?`Hai năm sau ngày đăng cơ, ${lean}. ${({emp:"Hoàng thượng",th:"Thái hậu",quyen:"{q}"})[s]} hỏi thẳng: ${kSay(s==="quyen"?{role:"x",rw:"quan"}:s,S,s==="quyen"?"“{Goi} còn nhớ lời đã hứa với lão phu chứ?”":"“{Goi} còn một lòng với {xung} chứ?”")} Giữ phe hay đổi phe; đổi thì phe cũ thành kẻ thù.`
   :`Hai năm sau ngày đăng cơ, ${lean}. Người đứng giữa như ngươi, phe nào cũng muốn kéo về: chọn phe, hoặc tiếp tục đứng ngoài.`},
 o:()=>{const s=rgSideNow();const O=[];if(s)O.push({n:"Một lòng như cũ",w:{},tr:6,s,lead:2,wx:"phe mình tin ngươi hơn"});
  for(const o of rgJoinOpts(false)){if(s){o.n="Đổi phe: "+o.n.charAt(0).toLowerCase()+o.n.slice(1);o.swc=1}O.push(o)}
  if(!s)O.push({n:"Vẫn đứng ngoài",w:{duc:1},wx:"không phe nào nợ ngươi"});return O}};
/* chapter 5: border war — plead, risk */
RGBT.c5a={w:()=>({emp:"th",th:"emp",quyen:"emp"})[rgSideNow()]||"emp",pre:()=>{const T=trS();if(T){T.bien=cl(T.bien-12,0,100)}},
 t:()=>({emp:"Giặc phương bắc phá ải. Hoàng thượng muốn giao binh quyền cho Phiêu kỵ tướng quân, {q} muốn cháu mình cầm quân. Thái hậu chưa nói lời nào: lời của bà sẽ định đoạt.",
  th:"Giặc phương bắc phá ải. Thái hậu muốn hòa nghị, gả một quận chúa sang biên, tránh để binh quyền rơi vào tay một phe. Bà cần người dâng lời trước Hoàng thượng.",
  quyen:"Giặc phương bắc phá ải. {dadq} muốn cháu ruột cầm quân; nếu chiếu thư được ban, binh quyền thuộc về nhà Tể tướng."})[rgSideNow()]||"Giặc phương bắc phá ải, cả cung lo âu. Ai cũng chờ xem binh quyền vào tay phe nào.",
 o:()=>{const s=rgSideNow();
  if(s==="emp")return[{n:"Quỳ trước Đức Thọ cung xin Thái hậu ủng hộ bệ hạ",c:{suc:-15},p:35,sk:[["duc",2]],w:{danh:3,th:-2},pw:7,tr:10,s,l:{th:-6},wx:"Thái hậu gật đầu, binh quyền về tay người của bệ hạ",lx:"Thái hậu không lay chuyển, còn phật ý"},
   {n:"Nhờ Hoàng hậu nói giúp một lời",if:()=>typeof qOn==="function"&&qOn()&&S.hh>=15,p:40,sk:[["hh",2]],w:{hh:-3},pw:5,tr:8,s,l:{hh:-6},wx:"Hoàng hậu lên tiếng",lx:"Hoàng hậu phật ý vì bị kéo vào"},
   {n:"Không dám can dự binh quyền",w:{},tr:-8,wx:"giữ mình"}];
  if(s==="th")return[{n:"Dâng lời hòa nghị lúc hầu bệ hạ dùng bữa",p:35,sk:[["sung",2],["tamco",4]],w:{th:6},pw:7,tr:10,s,l:{sung:-6},wx:"bệ hạ nghe theo, hai phe đều không độc chiếm binh quyền",lx:"bệ hạ nổi giận vì hậu cung bàn binh sự"},
   {n:"Chép kinh cầu an biên ải, mời bệ hạ đến nghe tụng",c:{suc:-12},p:40,sk:[["tai",3],["duc",4]],w:{th:4,duc:2},pw:5,tr:8,s,l:{},wx:"bệ hạ mềm lòng",lx:"bệ hạ không đến"},
   {n:"Lui về, không dám dâng lời",w:{},tr:-8,wx:"giữ mình"}];
  if(s==="quyen")return[{n:"Thổi gió bên gối cho cháu Tể tướng",p:35,sk:[["sung",2],["sac",5]],w:{bac:30},pw:7,tr:10,s,l:{sung:-8},lq:-5,wx:"chiếu thư ban cho nhà Tể tướng",lx:"bệ hạ nghi ngươi nói hộ ngoại thần"},
   {n:"Đút lót thái giám truyền chỉ cho chậm tin",c:{bac:-50},p:65,sk:[],w:{},pw:5,tr:8,s,l:{danh:-4},wx:"tin của phe bệ hạ đến muộn",lx:"thái giám nhận bạc rồi khai ra"},
   {n:"Viết thư cho người quen trong Binh bộ",c:{suc:-12},p:35,sk:[["tamco",3],["mat",.5]],w:{},pw:5,tr:8,s,l:{danh:-3},wx:"Binh bộ tâu theo ý Tể tướng",lx:"thư lọt vào tay Ngự sử"},
   {n:"Không dám can dự binh quyền",w:{},tr:-8,wx:"giữ mình"}];
  return[{n:"Chép kinh cầu an biên ải",c:{suc:-8},w:{duc:3,danh:2},wx:"Danh và Đức thêm"},{n:"Đóng cửa cung, chờ tin",w:{},wx:"giữ mình"}]}};
RGBT.c5b={w:"emp",t:()=>{const p=rgP();const T=trS();if(T)T.bien=cl(T.bien+(p>=50?14:8),0,100);return `${p>=50?"Quân triều đình giữ được ải":"Ải giữ được, nhưng phải cắt đất cống nạp"}. Tướng sĩ ngoài biên thiếu áo rét, Hoàng thượng truyền hậu cung góp tay.`},
 o:()=>[{n:"Góp bạc may áo rét",c:{bac:-40},w:{danh:4},pw:1,s:"emp",wx:"tướng sĩ nhớ ơn, Danh thêm"},{n:"Thức đêm thêu khăn, may áo",c:{suc:-10},w:{danh:4},pw:1,s:"emp",wx:"tướng sĩ nhớ ơn, Danh thêm"},{n:"Lấy cớ trong cung túng thiếu",w:{danh:-2},wx:"giữ được bạc"}]};
/* chapter 6: the decisive night, then the outcome */
RGBT.c6a={w:()=>({emp:"emp",th:"th",quyen:"q"})[rgSideNow()]||"maid",
 t:()=>({emp:"Đêm trước buổi đại triều, Hoàng thượng không ngủ. “Ngày mai trẫm sẽ tự phê tấu chương. Cấm quân có người của Tể tướng, trẫm không biết là ai.”",
  th:"Đêm trước buổi đại triều, Thái hậu cho gọi ngươi: “Ngày mai hoàng đế muốn tự cầm triều chính, Tể tướng không chịu buông. Ai gia phải ngồi sau rèm giữ cho hai bên khỏi đổ máu. {Goi} mang phong thư này sang Càn Thanh cung.”",
  quyen:"Đêm trước buổi đại triều, người của {dadq} gõ cửa sau cung ngươi: “Ngày mai bệ hạ muốn đoạt quyền. Chỉ cần {x} cho biết đêm nay bệ hạ nghỉ ở đâu, ai ra vào.”"})[rgSideNow()]||"Đêm trước buổi đại triều, cả hậu cung không ai ngủ. Cửa các cung đóng chặt, chỉ nghe tiếng bước chân cấm quân.",
 o:()=>{const s=rgSideNow();
  if(s==="emp")return[{n:"Dò ra người của Tể tướng trong cấm quân, báo bệ hạ",p:25,sk:[["mat",.4],["tamco",4]],trd:3,w:{sung:3},pw:9,s,l:{danh:-2},pl:-2,ev:"quyen",wx:"bệ hạ nắm được cấm quân",lx:"lộ ra, phe Tể tướng nắm Chứng cứ về ngươi"},
   {n:"Thức cùng ngài, khuyên giữ bình tĩnh",w:{sung:3},pw:3,s,wx:"bệ hạ vững lòng"},{n:"Đóng cửa cung đêm nay",w:{},tr:-10,wx:"giữ mình"}];
  if(s==="th")return[{n:"Tự mang thư sang Càn Thanh cung giữa đêm",c:{suc:-10},p:40,sk:[["duc",3],["tamco",4]],trd:3,w:{th:4},pw:9,s,l:{th:-3},pl:-2,wx:"hai bên chịu ngồi lại",lx:"thư đến muộn"},
   {n:"Sai {maid} mang thư",p:40,sk:[["mat",.5]],w:{th:2},pw:6,s,l:{},pl:-1,wx:"thư đến nơi",lx:"{maid} bị chặn ở cửa"},{n:"Thưa rằng thần thiếp sợ hãi",w:{th:-4},tr:-10,wx:"giữ mình"}];
  if(s==="quyen")return[{n:"Mở cửa sau cho người của Tể tướng vào dò",p:25,sk:[["tamco",3],["mat",.5]],trd:3,w:{bac:40},pw:9,s,l:{sung:-10},pun:2,pl:-2,wx:"phe Tể tướng đi trước một bước",lx:"cấm quân bắt được, ngươi bị trị tội"},
   {n:"Chỉ báo bệ hạ nghỉ ở cung nào",w:{bac:10},pw:3,s,wx:"êm chuyện, ít công"},{n:"Đóng cửa, không dám mở",w:{},lq0:-8,tr:-10,wx:"giữ mình"}];
  return[{n:"Đóng cửa cung, thắp hương cầu an",w:{duc:1},wx:"giữ mình"}]}};
/* the outcome (chương 6 hồi 2): world outcome W.out read by every player; her result by her side */
RGBT.c6b={w:()=>({emp:"emp",th:"th",quyen:"q"})[rgW().out]||"emp",fin:1,
 t:()=>{const W=rgW();const o=W.out;const s=rgSideNow();const head=({emp:"Buổi đại triều, Hoàng thượng tự tay phê tấu chương trước bá quan. {q} dâng biểu cáo lão. Thái hậu dời về Đức Thọ cung niệm Phật, không hỏi chính sự nữa. Thiên hạ gọi là năm thân chính.",
  th:"Buổi đại triều, Thái hậu ngồi sau rèm châu. Tể tướng phải trả ấn phụ chính, nhưng Hoàng thượng cũng chưa được tự quyết: việc lớn phải qua Đức Thọ cung. Hai bên tạm yên.",
  quyen:"Buổi đại triều, {q} được phong nhiếp chính. Hoàng thượng ngồi trên ngai, chiếu chỉ vẫn ra từ phủ Tể tướng. Đêm ấy ngài ngồi một mình rất lâu."})[o]||"";
  const me=!s?"Ngươi đứng ngoài cuộc: không ai nợ ngươi, cũng không ai trách ngươi.":s===o?"Phe ngươi thắng. Người đứng đầu phe nhớ công ngươi.":"Phe ngươi thua. Kẻ thắng không quên ai đã đứng bên kia.";
  return `${head}<br><b>${me}</b>`},
 o:()=>{const o=rgW().out;
  if(o==="emp")return[{n:"Xin bệ hạ khoan hồng cho người nhà Tể tướng",w:{duc:4,sung:-2},amn:1,wx:"bệ hạ ân xá, nhà Tể tướng nhớ ơn ngươi"},{n:"Im lặng để bệ hạ định đoạt",w:{sung:1},wx:"không dính vào"},
   {n:"Tâu thêm tội của phe Tể tướng",w:{sung:3,duc:-3},purge:1,wx:"phi tần nhà Tể tướng bị giáng, oán ngươi"}];
  if(o==="th")return[{n:"Chép kinh tạ ơn Thái hậu",c:{suc:-6},w:{th:4},wx:"Thái hậu hài lòng"},{n:"Đến an ủi Hoàng thượng",w:{sung:2,th:-1},wx:"bệ hạ nhớ người ở bên lúc khó"},{n:"Đóng cửa cung tĩnh dưỡng",w:{},wx:"giữ mình"}];
  return[{n:"Ở bên an ủi bệ hạ",w:{sung:3},lq0:-5,wx:"bệ hạ nhớ người ở bên lúc khó"},{n:"Đến phủ Tể tướng chúc mừng",w:{bac:20,sung:-2},lq0:8,wx:"nhà Tể tướng nhớ mặt ngươi"},{n:"Đóng cửa cung tĩnh dưỡng",w:{},wx:"giữ mình"}]}};
/* errands of her side between chapters (one at a time, BAL.rg.erCd months apart) */
const RGE={emp:[
 {id:"e1",w:"emp",t:"Hoàng thượng muốn biết Thái hậu nghĩ gì về việc thay Lễ bộ thượng thư. “{Goi} hay sang Đức Thọ cung, dò giúp trẫm.”",o:[{n:"Hầu chuyện Thái hậu, khéo dò ý",p:40,sk:[["tamco",3],["duc",5]],w:{sung:2},pw:3,tr:6,l:{th:-4},wx:"bệ hạ biết ý Thái hậu",lx:"Thái hậu biết ngươi dò ý"},{n:"Thưa rằng không tiện hỏi",w:{},tr:-5,wx:"giữ mình"}]},
 {id:"e2",w:"emp",t:"Đêm khuya, Hoàng thượng đưa ngươi xem một bản tấu: “Lời lẽ khéo thế này, trẫm không biết là trung hay gian.”",o:[{n:"Đọc kỹ, chỉ ra chỗ khuất",p:35,sk:[["tai",2],["tamco",4]],w:{sung:3},pw:2,tr:6,l:{},wx:"bệ hạ thấy ngươi sáng suốt",lx:"ngươi đọc không ra"},{n:"Thưa rằng hậu cung không dám xem tấu",w:{duc:1},tr:-5,wx:"giữ phép"}]},
 {id:"e3",w:"emp",t:"Hoàng thượng muốn vi hành ra phố xem dân tình, lấy cớ nghỉ lại cung ngươi đêm ấy. “Ai hỏi thì {goi} che giúp trẫm.”",o:[{n:"Nhận lời che giấu",p:45,sk:[["tamco",3]],w:{sung:4},pw:2,tr:8,l:{danh:-3,th:-3},wx:"bệ hạ về an toàn, thêm tin ngươi",lx:"chuyện lộ, Thái hậu trách ngươi"},{n:"Khuyên ngài thôi đi",w:{sung:-2},tr:-4,wx:"an toàn"}]}],
 th:[
 {id:"e1",w:"th",t:"Thái hậu muốn một bộ kinh chép tay cúng giỗ tiên đế, chữ phải nắn nót, không được nhờ người.",o:[{n:"Tự chép kinh mấy đêm liền",c:{suc:-8},w:{th:4,duc:1},pw:1,tr:6,wx:"Thái hậu hài lòng"},{n:"Thưa rằng sức yếu, xin khất",w:{th:-2},tr:-5,wx:"giữ sức"}]},
 {id:"e2",w:"th",if:()=>typeof qOn==="function"&&qOn(),t:"Thái hậu muốn Hoàng hậu {hh} đứng về phía bà trong việc lập người phụ chính mới. “{Goi} làm cầu nối cho ai gia.”",o:[{n:"Sang Càn Ninh cung nói chuyện",p:40,sk:[["hh",2],["tamco",4]],w:{th:3,hh:3},pw:3,tr:6,l:{hh:-4},wx:"Hoàng hậu nghiêng về Thái hậu",lx:"Hoàng hậu phật ý vì bị kéo vào"},{n:"Khéo từ chối",w:{th:-2},tr:-5,wx:"giữ mình"}]},
 {id:"e3",w:"th",t:"Thái hậu hỏi các cung dạo này ai hay qua lại phủ Tể tướng.",o:[{n:"Nghe ngóng các cung",p:40,sk:[["mat",.5],["tamco",4]],w:{th:4},pw:3,tr:6,l:{th:-2},wx:"Thái hậu nắm được tin",lx:"tin ngươi dò được sai"},{n:"Thưa rằng không rõ",w:{},tr:-5,wx:"giữ mình"}]}],
 quyen:[
 {id:"e1",w:"q",t:"{dadq} nhờ ngươi chuyển một hộp lễ vật đến một phi tần đang được sủng, để nàng nói đỡ cho nhà Tể tướng.",o:[{n:"Chuyển lễ khéo léo",p:50,sk:[["tamco",3]],w:{bac:20},pw:2,tr:6,lq:3,l:{danh:-3},wx:"nhà Tể tướng thêm người nói đỡ",lx:"chuyện đút lót lọt ra"},{n:"Từ chối, sợ tai tiếng",w:{},lq0:-4,tr:-5,wx:"giữ mình"}]},
 {id:"e2",w:"q",t:"{dadq} nhờ ngươi nói đỡ cho một người cháu đang bị Ngự sử hặc tội.",o:[{n:"Nói đỡ trước mặt bệ hạ",p:35,sk:[["sung",2],["tamco",4]],w:{bac:25},pw:3,tr:6,l:{sung:-4},wx:"bệ hạ bỏ qua",lx:"bệ hạ nghi ngươi nói hộ ngoại thần"},{n:"Không tiện nói",w:{},lq0:-4,tr:-5,wx:"giữ mình"}]},
 {id:"e3",w:"q",t:"Người của {dadq} hỏi gần đây Hoàng thượng hay gặp ai ở Cần Chính điện.",o:[{n:"Kể lại những gì đã thấy",p:45,sk:[["mat",.5]],w:{bac:20},pw:3,tr:6,l:{sung:-3},wx:"nhà Tể tướng biết trước nước cờ",lx:"bệ hạ biết ngươi để lộ chuyện"},{n:"Thưa rằng không để ý",w:{},lq0:-4,tr:-5,wx:"giữ mình"}]}]};

/* ---------- beat → dialog (PEND "rg": rebuilt on load) ---------- */
function rgBeatDef(id){if(RGBT[id])return RGBT[id];const m=/^(emp|th|quyen):(e\d)$/.exec(id||"");if(m){const e=RGE[m[1]].find(x=>x.id===m[2]);return e?Object.assign({er:m[1]},e):null}return null}
function rgOpts(b){let O=typeof b.o==="function"?b.o():b.o;O=(O||[]).filter(o=>{try{return !o.if||o.if()}catch(e){return false}});return O}
function rgChOf(id){for(let i=0;i<RGC.length;i++){const j=RGC[i].b.indexOf(id);if(j>=0)return[i,j]}return null}
function rgTitle(id){const c=rgChOf(id);if(c)return `Phụ tuyến · ${RGT} · Chương ${c[0]+1} · Hồi ${c[1]+1}/${RGC[c[0]].b.length}`;return `Phụ tuyến · ${RGT} · Việc của phe`}
function rgLine(o){const od=rgOd(o),c=rgCost(o.c);const cost=fmt(c);const win=[fmt(o.w||{}),o.wx?`<span class="g">${rgTok(o.wx)}</span>`:""].filter(Boolean).join(" · ");
 if(od>=100)return [cost?"tốn: "+cost:"",win?"thành: "+win:""].filter(Boolean).join(" · ");
 const lose=[fmt(o.l||{}),o.lx?`<span class="r">${rgTok(o.lx)}</span>`:"",o.pun?`<span class="r">${o.pun>1?"có thể bị giáng bậc":"bị cấm túc"}</span>`:""].filter(Boolean).join(" · ");
 return `${word(od)} · ${cost?"tốn: "+cost+" · ":""}thành: ${win||"qua được"} · hỏng: ${lose||"không mất gì thêm"}`}
PEND.rg=pp=>{try{if(!rgOn())return null;const b=rgBeatDef(pp.b);if(!b)return null;const O=rgOpts(b);if(!O.length)return null;
 const t=typeof b.t==="function"?b.t():b.t;const wk_=typeof b.w==="function"?b.w():b.w;
 const d={who:rgWho(wk_)||pMe(),t:rgTok(t,null,wk_),o:O.map((o,i)=>{const od=rgOd(o);return{n:rgTok(o.n),fx:rgCost(o.c),j67:rgLine(o),rgS:o.s||o.join||"",go:()=>rgRes(pp.b,i,od)}})};
 if(b.faces){const F=[["emp","Hoàng thượng"],["th","Thái hậu"],["q",(rgQH()||{name:"Tể tướng"}).name]].map(([k,n])=>[rgWho(k),n]).filter(x=>x[0]);if(F.length>=2)d.faces=F}
 return d}catch(e){console.error(e);return null}};
function rgFire(id){const d=mkP("rg",{b:id});if(!d)return false;const m={t:rgTitle(id),h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp};if(d.faces)m.faces=d.faces;Q.push(m);try{evBusyMark()}catch(e){}return true}
/* the side's enemies: a consort of the named side (or any foe of hers) gets proof against her */
function rgFoe(side){const s=rgSideNow();const L=liveRivals(true).filter(v=>side==="foe"?(rgSideOf(v)&&rgSideOf(v)!==s):rgSideOf(v)===side);return L.length?pick(L):null}
function rgRes(id,i,od){const b=rgBeatDef(id);if(!b)return;const o=rgOpts(b)[i];if(!o)return;const r=rgMe();const W=rgW();
 const ok=od>=100||roll(od);const side=o.s||rgSideNow();const t0=rgTitle(id);const before=rsnap();let ex=[];
 r.done[id]=(r.done[id]||0)+1;r.last=S.turn;
 if(ok){apply(o.w||{});if(o.pw)rgPush(side,o.pw);if(o.tr)rgTr(o.tr);if(o.lq)rgQAf(o.lq);if(o.lead)rgLead(side,o.lead)}
 else{apply(o.l||{});if(o.pl)rgPush(side,o.pl);if(o.lq)rgQAf(o.lq);
  if(o.ev){const v=rgFoe(o.ev);if(v){evA(v,S,1);ex.push(`${(()=>{try{return typeof kitKnownName!=="function"||kitKnownName(v)}catch(e){return true}})()?v.name:"Một vị phi tần chưa quen biết"} nắm Chứng cứ về ngươi.`)}}
  if(o.pun){try{punish(S,"can dự chuyện triều chính",o.pun)}catch(e){}}}
 if(o.lq0)rgQAf(o.lq0);
 if(o.join)ex.push(rgJoin(o.join,id==="c2a",o.swc));
 if(o.amn)ex.push(rgAmnesty());if(o.purge)ex.push(rgPurge());
 const nm=rgTok(o.n);const res=od>=100?"":ok?"Thành.":"Không thành.";log(`${t0}: ${nm}. ${res} ${ex.filter(Boolean).join(" ")}`.replace(/\s+/g," ").trim());
 if(!quiet&&!window.__bot)try{resultShow(`${t0.replace(/^Phụ tuyến · /,"")}: ${nm}`,before,od>=100?null:ok)}catch(e){}}
/* choosing / switching side */
function rgJoin(side,first,isSwitch){const r=rgMe();const old=rgSideNow();if(side===r.side)return"";let t="";
 if(side==="ngoai"){r.side="ngoai";return "Ngươi đứng ngoài, không theo phe nào."}
 if(old){/* switching: the side left behind turns on her */r.sw++;r.swT=S.turn;apply({danh:-BAL.rg.swDanh});rgLead(old,-BAL.rg.swLead);
  for(const v of rgMembers(old))relAdd(v,S,-BAL.rg.swRel);r.tr=BAL.rg.swTr;t=`Ngươi rời phe ${rgSideN(old)}, sang phe ${rgSideN(side)}. Phe cũ coi ngươi là kẻ phản.`}
 else{r.tr=first?BAL.rg.tr0:BAL.rg.tr0-10;t=`Ngươi ${rgSideTag(side)}.`}
 r.side=side;r.sideT=S.turn;rgRel(side,BAL.rg.joinRel);
 const f=rgFam();if(f){const fa=rgFamAf(f===side?BAL.rg.famAf:-BAL.rg.famAf);if(fa)t+=" "+fa}
 if(side==="quyen")rgQAf(15);return t}
function rgCanSwitch(){const r=rgMe();if(!rgSideNow())return "chưa theo phe nào";if(rgW().out)return "triều cục đã định";if(r.sw>=BAL.rg.swMax)return "đã đổi phe đủ số lần";
 const left=(r.swT!=null?r.swT:(r.sideT||-99))+BAL.rg.swCd-S.turn;if(left>0)return `mới chọn phe, đợi ${left} tháng`;if(Q.length)return "đang có việc chờ";return ""}
function rgSwitchOpen(){if(rgCanSwitch()||!rgOn())return;const s=rgSideNow();
 const O=rgJoinOpts(false).map(o=>({n:"Đổi phe: "+o.n.charAt(0).toLowerCase()+o.n.slice(1),fx:{},j67:`tốn: Danh -${BAL.rg.swDanh} · kèm: <span class="r">phe ${rgSideN(s)} thành kẻ thù, phe mới chưa tin ngươi</span>`,go:()=>{const t=rgJoin(o.join,false,1);log(`Phụ tuyến · ${RGT} · Đổi phe: ${t}`);render()}}));
 O.push({n:"Thôi",fx:{}});pushModal({t:`Phụ tuyến · ${RGT} · Đổi phe`,who:pMe(),h:`<p>Ngươi đang ${rgSideTag(s)}. Đổi phe thì phe cũ thành kẻ thù, Danh giảm, phe mới phải lấy lòng lại từ đầu.</p>`,opts:O,act:1});showModal()}
/* outcome effects on the court (host computes; personal effects per player) */
function rgAmnesty(){for(const v of rgMembers("quyen"))relAdd(v,S,10);rgQAf(15);return "Bệ hạ ân xá cho nhà Tể tướng."}
function rgPurge(){let n=0;for(const v of rgMembers("quyen")){if(v.queen||rkOf(v)<=0)continue;v.rank=seatDown(v,v.rank-1);relAdd(v,S,-15);n++}return n?`${n} phi tần nhà Tể tướng bị giáng một bậc.`:""}
function rgDecide(){const W=rgW();if(!W||W.out)return;const p=W.p;W.out=p>=BAL.rg.B?"emp":p<BAL.rg.A?"quyen":"th";if(W.out==="th"&&S.thDead)W.out=p>=(BAL.rg.A+BAL.rg.B)/2?"emp":"quyen";W.at=S.turn;
 const o=W.out;try{if(o==="emp"){tdPowAdd(RGQC,-BAL.rg.loseHouse);tdPowAdd("Hàn lâm",8);tdPowAdd("Lễ bộ",8);if(S.emp)S.emp.mood=Math.max(0,(S.emp.mood||1)-1)}
  else if(o==="quyen"){tdPowAdd(RGQC,BAL.rg.winHouse);tdPowAdd("Hàn lâm",-10);tdPowAdd("Lễ bộ",-10);if(S.emp)S.emp.mood=Math.min(3,(S.emp.mood||1)+1)}
  else{tdPowAdd(RGQC,-10);tdPowAdd("Đại tướng quân",10)}}catch(e){}
 for(const v of liveRivals(true)){const s=rgSideOf(v);if(!s)continue;v.sung=cl((v.sung||0)+(s===o?BAL.rg.npcWin:-BAL.rg.npcLose),0,100)}
 W.n.unshift(`T${S.month}/${S.year}: ${({emp:"Hoàng thượng thân chính",th:"Thái hậu buông rèm nghe chính",quyen:"Tể tướng nhiếp chính"})[o]}`)}
/* her result once the court has decided (applied once, before the last beat) */
function rgMine(){const r=rgMe(),W=rgW();if(!W||!W.out||r.res)return"";const o=W.out,s=rgSideNow();const k=.5+r.tr/100;const Bg=BAL.rg;let t="";const b0=Math.round(Bg.bacWin*(typeof rkMul67==="function"?rkMul67():1));
 if(!s){apply({danh:Bg.ngoai});r.res="ngoai";t="Đứng ngoài cuộc, giữ được mình.";return t}
 if(s===o){r.res="win";
  if(s==="emp"){apply({sung:Math.round(Bg.winSung*k),danh:Bg.winDanh});/* owner 16/11 06:20Z/06:45Z: a long road's reward = DIRECT rank, no exam, through the one hook jexam promoReward (seats apply); cap Bg.rankCap + the Sủng floor guard the jump */
   const d=S.rank<Bg.rankCap&&typeof promoReward==="function"&&S.sung>=(typeof sungFloor==="function"?sungFloor(S.rank+1):0)+Bg.rankSung?promoReward(S,"emp",{fx:1}):"";
   t=d?`Bệ hạ nhớ công phò tá. ${d}`:"Bệ hạ nhớ công, ban thưởng hậu hĩnh."}
  else if(s==="th"){apply({th:Math.round(Bg.winTh*k),danh:Bg.winDanh});S.shield=Math.max(S.shield||0,Bg.winShield);t=`Thái hậu nhớ công, che chở ngươi ${Bg.winShield} tháng: phi tần khó hại ngươi.`;const d=S.rank<Bg.rankCap&&typeof promoReward==="function"?promoReward(S,"th",{fx:1}):"";if(d)t+=` ${d}`}
  else{apply({bac:Math.round(b0*k),danh:Bg.winDanh,mat:1});const h=rgFamH();if(h&&rgFam()==="quyen")tdPowAdd(h.c,8);rgQAf(20);t="Nhà Tể tướng nhớ công, đưa bạc vào cung, tai mắt khắp nơi.";const d=S.rank<Bg.rankCap&&typeof promoReward==="function"?promoReward(S,"quyen",{fx:1}):"";if(d)t+=` ${d}`}
  rgLead(s,0)}
 else{r.res="lose";
  if(s==="emp"){apply({sung:-Bg.loseSung,th:-Bg.loseTh});t="Phe bệ hạ thua, nhà Tể tướng và Thái hậu đều để ý ngươi."}
  else if(s==="th"){apply({th:-Math.round(Bg.loseTh/2),danh:-Bg.loseDanh,sung:-Math.round(Bg.loseSung/2)});t="Thái hậu thất thế, người theo bà cũng bị gạt ra."}
  else{apply({danh:-Bg.loseDanh,sung:-Bg.loseSung});try{punish(S,"là người của phe Tể tướng",1)}catch(e){}t="Nhà Tể tướng thất thế, ngươi bị liên lụy."}}
 const f=rgFam();if(f&&f!==o){const h=rgFamH();if(h)tdPowAdd(h.c,-8)}
 return t}
(function(){if(typeof exGw!=="function")return;const g0=exGw;exGw=function(e){return e&&e.gw==="rg"?"công phò tá bệ hạ thân chính":g0.apply(this,arguments)}})();
/* ---------- month (host: the world; everyone: her next beat) ---------- */
function rgWorldMonth(){const W=rgW();if(!W||W.out)return"";const Bg=BAL.rg;let ev="";
 W.p=cl(W.p+Bg.drift,0,100);if(roll(Bg.noise[0]))W.p=cl(W.p+(R(2*Bg.noise[1]+1)-Bg.noise[1]),0,100);
 const D=window.__rgDbg,p0=W.p;try{const T=trS();if(T.bien<40||T.kho<40){W.p=cl(W.p-Bg.qs,0,100);if(D)D.qs=(D.qs||0)+1}}catch(e){}const p1=W.p;
 for(const v of liveRivals(true)){const s=rgSideOf(v);if(!s||(v.sung||0)<Bg.npcS)continue;if(s==="emp")W.p+=Bg.npcP;else if(s==="quyen")W.p-=Bg.npcP;else{const m=(Bg.A+Bg.B)/2;W.p+=Math.sign(m-W.p)*Math.min(Math.abs(m-W.p),Bg.npcP)}}
 W.p=cl(W.p,0,100);S.reign.power=Math.round(W.p);if(D)D.npc=(D.npc||0)+(W.p-p1);
 const mo=rgMo();while(W.ch<RGC.length&&mo>=Bg.at[W.ch]){W.ch++;if(W.ch>=1)W.n.unshift(`T${S.month}/${S.year}: ${RGT} · Chương ${W.ch} «${RGC[W.ch-1].t}»`)}
 if(W.ch>=RGC.length&&!W.out&&mo>=Bg.at[RGC.length-1]+Bg.decideAfter&&((S.reign.done||{}).c6a||mo>=Bg.at[RGC.length-1]+Bg.decideAfter+Bg.decideWait))rgDecide();
 if(W.n.length>8)W.n.length=8;return ev}
/* her next beat: the earliest unplayed beat of a chapter the court has reached; c6b waits for the outcome; errands fill the gaps */
function rgNext(second){const W=rgW(),r=rgMe();if(!W)return null;const queued=new Set(Q.filter(m=>m.pid==="rg").map(m=>m.pp&&m.pp.b));
 for(let c=0;c<Math.min(W.ch,RGC.length);c++){for(const id of RGC[c].b){if(r.done[id]||queued.has(id))continue;const b=RGBT[id];
  if(b.if&&!b.if()){r.done[id]=-1;continue}if(b.fin&&!W.out)return null;return id}}
 const s=rgSideNow();if(!second&&s&&!W.out&&S.turn-(r.erT==null?-99:r.erT)>=BAL.rg.erCd&&S.turn-(r.last||-99)>=2&&roll(BAL.rg.erP)){
  const L=RGE[s].filter(e=>(!e.if||e.if())&&(r.done[s+":"+e.id]||0)<1);const e=L.length?pick(L):pick(RGE[s].filter(e=>!e.if||e.if()));if(e){r.erT=S.turn;return s+":"+e.id}}
 return null}
function rgMonth(){if(!rgOn())return"";let ev="";if(!rgGuest())ev+=rgWorldMonth();
 const W=rgW(),r=rgMe();if(S.thDead&&r.side==="th"&&!(W&&W.out)){r.side="ngoai";log(`<b>${RGT}</b>: Thái hậu băng hà, phe Thái hậu tan rã. Ngươi thành người đứng ngoài.`)}if(W&&W.out&&!r.res){const t=rgMine();if(t)log(`<b>${RGT}</b>: ${t}`)}
 if(S.out||S.confined&&S.confined>1)return ev;if(r.bm===S.turn)return ev;
 const late=rgLate();if(typeof storyBusy==="function"&&storyBusy()&&!rgW().out&&late<2)return ev;
 /* behind (beats of chapters the court has passed are still waiting: busy months, cấm túc): up to BAL.rg.catchUp beats this month */
 let n=0;const max=late>=3?BAL.rg.catchUp:1;while(n<max){const id=rgNext(n>0);if(!id||!rgFire(id))break;n++}if(n)r.bm=S.turn;return ev}
function rgLate(){const W=rgW(),r=rgMe();if(!W)return 0;let n=0;for(let c=0;c<Math.min(W.ch,RGC.length);c++)for(const id of RGC[c].b)if(!r.done[id]&&!(RGBT[id].fin&&!W.out))n++;return n}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments)||"";try{if(S&&!S.dead)ev+=rgMonth()}catch(e){console.error(e)}return ev}})();
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&S.ps&&S.reign){S.reign.t0=S.turn;rgW();rgMe()}}catch(e){console.error(e)}return r}})();

/* ---------- TÂM NGUYỆN: life-goal quest lines of named people (j72 templates, chained by ok.ch) ---------- */
const RGL={
 th:{who:"Thái hậu",g:"Giữ yên xã tắc cho con, nhìn thấy hoàng tôn đầy nhà, rồi yên lòng niệm Phật.",q:["rgl_th1","rgl_th2","rgl_th3"]},
 hh:{who:"Hoàng hậu",g:"Sinh đích tử, giữ vững Trung cung.",q:["rgl_hh1","rgl_hh2","rgl_hh3"]},
 ly:{who:"Phế phi họ Lý",g:"Rửa oan án năm xưa trước khi nhắm mắt.",q:["rgl_ly1","rgl_ly2","rgl_ly3"]},
 maid:{who:"Cung nữ thân tín",g:"Lo cho mẹ già ở quê, đến tuổi được xuất cung về nhà.",q:["rgl_mb1","rgl_mb2","rgl_mb3"]},
 eun:{who:"Tổng quản thái giám",g:"Có người nối dõi hương khói, về già có đất dưỡng lão.",q:["rgl_tq1","rgl_tq2","rgl_tq3"]},
 doc:{who:"Thái y",g:"Soạn xong bộ y thư thầy truyền lại, dâng lên cho đời sau dùng.",q:["rgl_ty1","rgl_ty2","rgl_ty3"]}};
function rgL(){S.rgL=S.rgL||{};return S.rgL}
function rgLStep(k){const L=rgL()[k];return L?L.st:0}
function rgLOk(k){if(k==="th")return !S.thDead;if(k==="hh")return typeof qOn==="function"&&qOn();if(k==="ly")return !(S.lyF&&S.lyF.dead)&&!(S.lyF&&S.lyF.freed);if(k==="maid")return !!S.maid;return true}
/* "ly": Phế phi họ Lý as a j72 requester (one persistent person, S.lyF) */
(function(){if(typeof q72A!=="function")return;const a0=q72A;q72A=function(k,id){if(k==="ly"){try{const o=lyFallen();if(o.dead||o.freed)return null;let f=null;try{f=pFaceOf({kind:"fallen",name:o.name})}catch(e){}
  return{o,n:o.name,f:Object.assign({ini:"Lý",col:"#6a7a8a",rw:"Phế phi"},f||{}),k:"ly",id:null}}catch(e){return null}}return a0.apply(this,arguments)};
 const h0=q72Home;q72Home=function(a){if(a&&a.k==="ly")return"lc";return h0.apply(this,arguments)};
 const k0=q72Key;q72Key=function(a){if(a&&a.k==="ly")return"ly";return k0.apply(this,arguments)};
 const H0=q72Host;q72Host=function(k,X){if(X&&X.A&&X.A.k==="ly"&&k==="lc")return true;return H0.apply(this,arguments)};
 const r0=q72Rel;q72Rel=function(a,n){if(a&&a.k==="ly"){a.o.rel=cl((a.o.rel||0)+n,-100,100);return}return r0.apply(this,arguments)};
 const t0=q72Tok;q72Tok=function(a,n){if(a&&a.k==="ly")return n?(n>0?G72:R72)(`${a.n} với ngươi ${n>0?"+":""}${n}`):"";return t0.apply(this,arguments)};
 const p0=q72Pick;q72Pick=function(sp,not,ff){if(sp==="ly"){const a=q72A("ly");return a&&!(not||[]).includes("ly")?a:null}return p0.apply(this,arguments)}})();
(function(){if(typeof T7!=="function")return;const G=q72G,W=q72W,C=q72C,O=q72O;
 const ln=(k,i)=>({line:k,li:i});
 const fin=k=>X=>{const L=rgL();L[k]=L[k]||{st:0};L[k].done=1;return `Tâm nguyện của ${RGL[k].who} đã thành.`};
 /* Thái hậu: the late Emperor's memory → peace between mother and son → grandchildren */
 T7("rgl_th1","social",Object.assign({fu:1,r:"th",t:"Tâm nguyện Thái hậu (1/3): Kinh giỗ tiên đế",h:"“Giỗ tiên đế sắp đến. Ai gia muốn một bộ kinh chép tay, chữ phải ngay ngắn, lòng phải thành.”",dl:5,
  s:[C("Chép kinh",O("Tự chép mấy đêm liền",{c:{suc:-8},p:60,sk:"tai",lto:"stay"}),O("Mời sư chùa Hộ Quốc chép, mình dâng hương",{c:{bac:-35},p:85,lto:"stay"})),G("tn","Dâng kinh ở Đức Thọ cung","duc",80,1)],
  ok:{fx:{th:5,duc:2},r:8,ch:"rgl_th2"},no:{r:-5}},ln("th",1)));
 T7("rgl_th2","social",Object.assign({fu:1,r:"th",t:"Tâm nguyện Thái hậu (2/3): Mẹ con hòa thuận",h:"“Hoàng đế mấy tháng nay ít sang thỉnh an. Ai gia già rồi, chỉ mong mẹ con nói với nhau được một bữa cơm.”",dl:6,
  s:[G("","Khéo nhắc bệ hạ sang Đức Thọ cung","sung",45,1,{},"r",{emp:1,pl:null}),G("tn","Bày bữa cơm mẹ con, đứng hầu","duc",70,1,{suc:-5})],
  ok:{fx:{th:6,sung:2},r:8,ch:"rgl_th3",fn:X=>{rgPMid(2);return "Hai cung bớt căng thẳng."}},no:{r:-5}},ln("th",2)));
 T7("rgl_th3","social",Object.assign({fu:1,r:"th",t:"Tâm nguyện Thái hậu (3/3): Hoàng tôn đầy nhà",h:"“Ai gia muốn bế cháu. {Goi} đưa các hoàng tôn đến đây, ai gia muốn nghe chúng đọc thơ.”",dl:6,
  s:[G("home","Dạy các hoàng tôn đọc một bài thơ","tai",55,2,{suc:-6}),G("tn","Đưa các hoàng tôn đến thỉnh an","duc",80,1)],
  ok:{fx:{th:8,danh:3},r:10,fn:X=>{S.shield=Math.max(S.shield||0,2);return fin("th")(X)+" Thái hậu che chở ngươi 2 tháng."}},no:{r:-5}},ln("th",3)));
 /* Hoàng hậu: an heir of her own */
 T7("rgl_hh1","social",Object.assign({fu:1,r:"hh",t:"Tâm nguyện Hoàng hậu (1/3): Phương thuốc cầu tự",h:"“Bổn cung vào cung đã lâu mà chưa có đích tử. Nghe nói Thái y viện có một phương cổ, {goi} giúp bổn cung hỏi kín.”",dl:5,
  s:[G("tyv","Hỏi kín Thái y","tamco",55,1),C("Lấy thuốc",O("Tự sắc thuốc, giữ kín",{c:{suc:-6},p:70,sk:"y",lto:"stay"}),O("Mua vị thuốc quý ngoài cung",{c:{bac:-30},p:85,lto:"stay"}))],
  ok:{fx:{hh:6},r:10,ch:"rgl_hh2"},no:{r:-5}},ln("hh",1)));
 T7("rgl_hh2","social",Object.assign({fu:1,r:"hh",t:"Tâm nguyện Hoàng hậu (2/3): Cầu tự ở chùa",h:"“Bổn cung muốn cầu tự ở chùa Hộ Quốc, nhưng Thái hậu không thích hậu cung ra ngoài. {Goi} đi cùng, đỡ lời giúp bổn cung.”",dl:5,
  s:[G("tn","Xin Thái hậu cho Hoàng hậu ra chùa","duc",50,1),G("","Theo Hoàng hậu lên chùa dâng hương","",100,2,{suc:-6})],
  ok:{fx:{hh:6,duc:1},r:10,ch:"rgl_hh3"},no:{r:-5}},ln("hh",2)));
 T7("rgl_hh3","pro",Object.assign({fu:1,r:"hh",t:"Tâm nguyện Hoàng hậu (3/3): Giữ yên Trung cung",h:"“Có kẻ đồn bổn cung hiếm muộn để mưu ngôi Trung cung. {Goi} giúp bổn cung tra ra ai tung tin.”",dl:5,
  s:[C("Tra nguồn tin",O("Nghe ngóng các cung",{p:45,sk:"mat",lto:"stay"}),O("Hỏi cung nữ các cung, ban chút quà",{c:{bac:-30},p:70,lto:"stay"})),G("kn","Báo lại cho Hoàng hậu","",100,1)],
  ok:{fx:{hh:10,danh:2},r:12,d:1,fn:fin("hh")},no:{r:-5}},ln("hh",3)));
 /* Phế phi họ Lý: an old wrong set right */
 T7("rgl_ly1","inv",Object.assign({fu:1,r:"ly",t:"Tâm nguyện Phế phi họ Lý (1/3): Chuyện năm xưa",h:"“Năm ấy ta bị gán tội dùng bùa ếm. Cung nữ của ta, A Hạnh, biết sự thật, nhưng đã bị đuổi đi. Nếu tìm được nàng...”",dl:6,
  s:[G("lc","Ngồi nghe Phế phi kể chuyện cũ","duc",80,1),C("Tìm A Hạnh",O("Dò hỏi ở Kính sự phòng",{t:()=>S.place==="ksp",tw:"phải đến Kính sự phòng",p:45,sk:"mat",lto:"stay"}),O("Nhờ người ngoài cung tìm",{c:{bac:-30},p:70,lto:"stay"}))],
  ok:{fx:{duc:2,tamco:1},r:12,ch:"rgl_ly2"},no:{r:-5}},ln("ly",1)));
 T7("rgl_ly2","inv",Object.assign({fu:1,r:"ly",t:"Tâm nguyện Phế phi họ Lý (2/3): Lời khai của A Hạnh",h:"“A Hạnh đã chịu nói. {Goi} giữ lời khai này cho kín, kẻ hại {xung} năm xưa vẫn còn tai mắt.”",dl:6,
  s:[G("home","Chép lại lời khai, giấu kỹ","tamco",60,1),W("Đợi A Hạnh điểm chỉ",1)],
  ok:{fx:{tamco:1},r:10,ch:"rgl_ly3"},no:{r:-5},bad:{fx:{danh:-3}},badT:"Lời khai lọt ra ngoài."},ln("ly",2)));
 T7("rgl_ly3","risk",Object.assign({fu:1,r:"ly",t:"Tâm nguyện Phế phi họ Lý (3/3): Rửa oan",h:"“Chỉ còn một việc: đưa lời khai đến trước mặt Hoàng thượng. Ta không cần phục vị, chỉ cần một chữ oan.”",dl:6,
  s:[G("","Dâng lời khai lên Hoàng thượng","sung",45,1,{},"b",{emp:1,pl:null})],
  ok:{fx:{duc:4,danh:3},r:20,d:2,fn:X=>{const o=lyFallen();o.cleared=1;return fin("ly")(X)+" Hoàng thượng hạ chỉ rửa oan cho Phế phi họ Lý. Bà xin ở lại Trường Môn viện, sớm hôm niệm Phật đến ngày nhắm mắt."}},no:{r:-5,fx:{sung:-2}},bad:{fx:{sung:-4,th:-3}},badT:"Hoàng thượng nổi giận vì chuyện cũ bị khơi lại."},ln("ly",3)));
 /* her maid: her mother at home */
 T7("rgl_mb1","fam",Object.assign({fu:1,r:"maid",t:"Tâm nguyện {A} (1/3): Thư nhà",h:"“Nô tỳ đã ba năm không có tin mẹ. Nghe nói quê nhà mất mùa... {Nc} cho nô tỳ gửi một lá thư.”",dl:4,
  s:[C("Gửi thư",O("Nhờ người Nội vụ phủ chuyển thư",{c:{bac:-15},p:90,lto:"stay"}),O("Đợi ngày mệnh phụ vào cung, nhờ mang ra",{c:{suc:-4},p:60,sk:"danh",lto:"stay"})),W("Đợi thư hồi âm",2)],
  ok:{fx:{maid:8},ch:"rgl_mb2"},no:{fx:{maid:-4}}},ln("maid",1)));
 T7("rgl_mb2","fam",Object.assign({fu:1,r:"maid",t:"Tâm nguyện {A} (2/3): Thuốc cho mẹ",h:"“Mẹ nô tỳ ốm nặng, ở quê không có thuốc tốt. Nô tỳ không dám xin gì, chỉ mong...”",dl:4,
  s:[C("Gửi thuốc",O("Xin Thái y một phương thuốc",{t:()=>S.place==="tyv",tw:"phải đến Thái y viện",p:65,sk:"duc",lto:"stay"}),O("Mua thuốc tốt gửi về",{c:{bac:-30},p:90,lto:"stay"}))],
  ok:{fx:{maid:10,duc:1},ch:"rgl_mb3"},no:{fx:{maid:-5}}},ln("maid",2)));
 T7("rgl_mb3","fam",Object.assign({fu:1,r:"maid",t:"Tâm nguyện {A} (3/3): Lời hứa xuất cung",h:"“Đến tuổi hai lăm, nô tỳ được xuất cung. Nô tỳ chỉ xin {N} một lời hứa: ngày ấy cho nô tỳ về.”",dl:4,
  s:[G("home","Hứa với nàng, ghi vào sổ cung","",100,1)],
  ok:{fx:{maid:15,duc:2},fn:fin("maid")},no:{fx:{maid:-6}}},ln("maid",3)));
 /* Tổng quản thái giám: an heir to burn incense, land to grow old on */
 T7("rgl_tq1","trade",Object.assign({fu:1,r:"eun",t:"Tâm nguyện Tổng quản (1/3): Đứa cháu họ",h:"“Nô tài không con không cái. Quê nô tài còn một đứa cháu họ mồ côi, nô tài muốn nhận làm con nuôi, mà không có đường ra cung.”",dl:5,
  s:[C("Tìm đứa trẻ",O("Nhờ người nhà đi tìm",{c:{bac:-25},p:85,lto:"stay"}),O("Viết thư cho quan huyện quen",{c:{suc:-5},p:55,sk:"tai",lto:"stay"}))],
  ok:{fx:{mat:1},r:10,ch:"rgl_tq2"},no:{r:-5}},ln("eun",1)));
 T7("rgl_tq2","trade",Object.assign({fu:1,r:"eun",t:"Tâm nguyện Tổng quản (2/3): Học chữ cho con nuôi",h:"“Thằng bé đã đến kinh. Nô tài muốn nó đi học, sau này khỏi phải làm thân hoạn quan như nô tài.”",dl:5,
  s:[C("Lo việc học",O("Viết thư tiến cử vào trường làng",{c:{suc:-5},p:60,sk:"danh",lto:"stay"}),O("Góp bạc mời thầy",{c:{bac:-30},p:90,lto:"stay"}))],
  ok:{fx:{mat:1},r:10,ch:"rgl_tq3"},no:{r:-5}},ln("eun",2)));
 T7("rgl_tq3","court",Object.assign({fu:1,r:"eun",t:"Tâm nguyện Tổng quản (3/3): Đất dưỡng lão",h:"“Nô tài muốn xin một mảnh đất gần chùa ngoại thành để về già. Phải có lời của bề trên mới được.”",dl:6,
  s:[G("","Xin Hoàng thượng ban đất","sung",50,1,{},"r",{emp:1,pl:null})],
  ok:{fx:{mat:2},r:15,d:2,fn:fin("eun")},no:{r:-5}},ln("eun",3)));
 /* Thái y: his master's book */
 T7("rgl_ty1","craft",Object.assign({fu:1,r:"doc",t:"Tâm nguyện Thái y (1/3): Sách thuốc thất lạc",h:"“Sư phụ thần để lại bộ y thư dang dở. Một quyển bị mượn đi từ đời tiên đế, nghe nói nằm trong Tàng thư các.”",dl:5,
  s:[C("Tìm sách",O("Tự lục Tàng thư các",{c:{suc:-6},p:50,sk:"tai",lto:"stay"}),O("Nhờ thái giám giữ sách tìm giúp",{c:{bac:-25},p:80,lto:"stay"}))],
  ok:{fx:{tai:1},r:10,ch:"rgl_ty2"},no:{r:-5}},ln("doc",1)));
 T7("rgl_ty2","craft",Object.assign({fu:1,r:"doc",t:"Tâm nguyện Thái y (2/3): Thử phương thuốc",h:"“Phương này phải có người ghi chép cẩn thận khi thử. Thần không tin ai ngoài {N}.”",dl:5,
  s:[G("tyv","Ghi chép bên lò thuốc","y",55,2,{suc:-6}),W("Đợi thuốc ngấm",1)],ok:{fx:{tai:1},r:10,ch:"rgl_ty3"},no:{r:-5}},ln("doc",2)));
 T7("rgl_ty3","craft",Object.assign({fu:1,r:"doc",t:"Tâm nguyện Thái y (3/3): Dâng y thư",h:"“Y thư đã xong. Thần muốn dâng lên Hoàng thượng, mong được khắc in.”",dl:5,
  s:[G("","Tâu lên Hoàng thượng","sung",55,1,{},"r",{emp:1,pl:null})],
  ok:{fx:{danh:3},r:15,d:1,fn:X=>{S.doctor=1;return fin("doc")(X)+" Thái y thành tâm phúc của ngươi."}},no:{r:-5}},ln("doc",3)));
})();
/* line progress: a finished step moves the line; a failed / declined step waits and may be offered again later */
(function(){if(typeof q72End!=="function")return;const e0=q72End;q72End=function(x,res,X,late){const T=T72I[x&&x.tid];const r=e0.apply(this,arguments);
 try{if(T&&T.line&&S){const L=rgL();const l=L[T.line]=L[T.line]||{st:0};if(res==="ok")l.st=Math.max(l.st,T.li);else{l.cd=S.turn+BAL.rg.lnRetry;l.fail=(l.fail||0)+1}l.w=wk()}}catch(e){console.error(e)}return r}})();
/* a line is offered by its person (one line start / retry at a time, BAL.rg.lnCd months apart) */
function rgLA(k){try{if(k==="hh"){const q=typeof queenP==="function"?queenP():null;return q&&q!==S?q72A("hh",q.id):null}return q72A(k)}catch(e){return null}}
function rgLNext(){if(!rgOn()||typeof q72CanOffer!=="function"||!q72CanOffer())return null;const q=q72();const L=rgL();
 if(S.turn-(L._t==null?-99:L._t)<BAL.rg.lnCd)return null;
 const act=new Set(q.a.map(x=>x.tid).concat(q.ch.map(c=>c.tid)));
 const C=Object.keys(RGL).filter(k=>{const l=L[k]||{st:0};if(l.done||!rgLOk(k))return false;if(l.cd!=null&&S.turn<l.cd)return false;if((l.fail||0)>=3)return false;
  const tid=RGL[k].q[Math.min(l.st,2)];return !act.has(tid)&&!RGL[k].q.some(t=>act.has(t))});
 if(!C.length)return null;const k=pick(C);const l=L[k]||{st:0};const T=T72I[RGL[k].q[Math.min(l.st,2)]];if(!T)return null;
 const A=rgLA(k);if(!A)return null;const x=q72Make(T,A);if(!x)return null;L._t=S.turn;return x}
(function(){if(typeof q72Tick!=="function")return;const t0=q72Tick;q72Tick=function(){const r=t0.apply(this,arguments);try{if(rgOn()&&S.tuan===1&&Q.length<=1&&!evBusy()){const x=rgLNext();if(x){q72Offer(x,"");evBusyMark()}}}catch(e){console.error(e)}return r}})();

/* ---------- Mệnh truyện › Triều cục / Tâm nguyện (kit: kitSubTabs, kitSkillCard, rows67/kitRows, kitChecks, kchip, pbtn) ---------- */
function rgPWord(p){const Bg=BAL.rg;return p>=Bg.B?"bệ hạ nắm được triều chính":p>=Bg.B-6?"thế bệ hạ đang lên":p<Bg.A?"nhà Tể tướng nắm triều chính":p<Bg.A+6?"nhà Tể tướng đang mạnh":"ba phe giằng co"}
function rgPaneHTML(){const W=rgW(),r=rgMe();if(!W)return kitEmpty("Triều cục","Kiếp này không có tuyến Tân quân lập uy.");
 const done=RGC.reduce((a,c)=>a+c.b.filter(id=>r.done[id]).length,0),tot=RGC.reduce((a,c)=>a+c.b.length,0);const c=Math.min(W.ch,RGC.length);
 let h=kitSkillCard({kind:"story",k:"rg",kicker:"Phụ tuyến",name:RGT,level:done,max:tot,word:"Hồi",bar:false,next:"",img:typeof kitOriginArt==="function"?kitOriginArt(S.origin.k):"",
  acts:rgSideNow()&&!W.out?[pbtn(`data-rgsw="1"`,"Đổi phe",`tốn: Danh -${BAL.rg.swDanh}`,rgCanSwitch())]:[]});
 const s=rgSideNow();
 /* only people she knows by name (kitKnownName); the rest are counted (same family as the 'Phi ???' fix, owner 16/11) */
 const mem=k=>kitNameList(rgMembers(k),v=>`${rkName(v)} ${v.name}`,"chưa ai");
 h+=rows67([["Mục tiêu","Hoàng thượng mới đăng cơ, quyền còn trong tay Thái hậu và Tể tướng phụ chính. Ngươi chọn đứng về phía ai, hay đứng ngoài."],
  ["Chương",c?`Chương ${c} «${RGC[c-1].t}»`:"chưa mở"],["Triều cục",W.out?({emp:"Hoàng thượng thân chính",th:"Thái hậu buông rèm nghe chính",quyen:`${rgQN()} nhiếp chính`})[W.out]:rgPWord(W.p),W.out?"g":""],
  ["Phe của ngươi",s?rgSideTag(s):r.side==="ngoai"?"đứng ngoài":"chưa chọn",s?"g":""],s?["Phe tin ngươi",r.tr>=60?"rất tin":r.tr>=35?"tin":r.tr>=15?"còn dè dặt":"chưa tin"]:null,
  rgFam()?["Nhà ngươi",({quyen:"phụ thân là Tể tướng phụ chính",th:"đứng sau Thái hậu",emp:"theo bệ hạ"})[rgFam()]]:null,
  r.res?["Kết cục của ngươi",r.res==="win"?"phe ngươi thắng":r.res==="lose"?"phe ngươi thua":"đứng ngoài, giữ được mình",r.res==="win"?"g":r.res==="lose"?"r":""]:null,
  ["Phe Hoàng thượng",mem("emp")],["Phe Thái hậu",S.thDead?"Thái hậu đã mất":mem("th")],["Phe quyền thần",mem("quyen")]]);
 h+=kitChecks(RGC.map((ch,i)=>[ch.b.every(id=>r.done[id]),`Chương ${i+1} «${ch.t}»${i<c?"":" · chưa tới"}`]));
 if(W.n&&W.n.length)h+=rows67(W.n.slice(0,4).map(x=>{const i=x.indexOf(": ");return[x.slice(0,i),x.slice(i+2)]}));
 return h}
function rgGoalHTML(){const L=rgL();const R=[];let n=0;
 for(const k in RGL){const l=L[k]||{st:0};const ok=rgLOk(k)||l.done;const who=k==="maid"&&S.maid?`${S.maid.name} (cung nữ thân tín)`:RGL[k].who;
  if(l.done)n++;const st=l.done?"đã thành tâm nguyện":ok?`bước ${Math.min(3,l.st+1)}/3: ${plain(String(T72I[RGL[k].q[Math.min(l.st,2)]].t).replace(/^Tâm nguyện [^:]*: /,"").replace(/\{A\}/g,who))}`:"người này không còn ở đây";
  const sub=`${RGL[k].g} · ${st}`;const A=ok&&!l.done?rgLA(k):null;R.push(`<div class="ktprow">${A&&typeof ktPerson==="function"?ktPerson(A,sub):`<div class="kpl"><span class="kplt"><b>${who}</b><small>${sub}</small></span></div>`}</div>`)}
 return kitSkillCard({kind:"story",k:"rgl",kicker:"Phụ tuyến",name:"Tâm nguyện",level:n,max:Object.keys(RGL).length,word:"Xong",bar:false,next:"",img:""})+
  `<div class="ktpeople">${R.join("")}</div>`}
try{KIT_GLOSS["Tâm nguyện"]="Mỗi người có một tâm nguyện. Họ sẽ tự tìm đến nhờ ngươi từng việc (mục Việc nhờ). Giúp trọn ba việc thì tâm nguyện thành."}catch(e){}
(function(){if(typeof ktStoryHTML!=="function"||typeof kitSubTabs!=="function")return;const k0=kitSubTabs;
 kitSubTabs=function(key,list,info){if(key==="story"&&S&&S.ps&&S.reign&&!list.some(x=>x.k==="rg")){list=list.concat([{k:"rg",label:"Triều cục",n:""},{k:"rgl",label:"Tâm nguyện",n:""}])}return k0.call(this,key,list,info)};
 const h0=ktStoryHTML;ktStoryHTML=function(){if(S&&S.ps&&S.reign){const L=[{k:"now",label:"Chương này",n:""},{k:"rank",label:"Sắc phong",n:""},{k:"past",label:"Đã qua",n:String(((S.st&&S.st.ch&&S.st.ch.past)||[]).length+(S.r97||[]).length)},{k:"rg",label:"Triều cục",n:""},{k:"rgl",label:"Tâm nguyện",n:""}];
   const cur=ktSubGet("story",L);if(cur==="rg"||cur==="rgl"){const sub=kitSubTabs("story",L.slice(0,3),kitInfo(cur==="rgl"?"Tâm nguyện":"Luật chương"));return sub.html+(cur==="rg"?rgPaneHTML():rgGoalHTML())}}return h0.apply(this,arguments)}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-rgsw]");if(!b||b.disabled)return;e.stopPropagation();try{rgSwitchOpen()}catch(x){console.error(x)}},true);
/* co-op: the guest's own S.reign is personal; the court (S.trieu.rg) comes from the host's world */
