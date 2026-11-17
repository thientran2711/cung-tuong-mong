/* ================= jroute: LỐI RIÊNG — những con đường khác trong một kiếp (owner 15/11; plan dev/STORY_ROUTES_PLAN.md) =================
   Bốn lối ngoài đường "leo lên Thái hậu": tt Tư tình (một nam nhân thật trong S.men) · tc Trốn khỏi cung · hl Rời cung hợp lệ ·
   ad Ẩn dật trong cung. Mỗi bước là một thẻ việc kit trong Hành sự (nhóm «Lối riêng», KIT_CAT "loi-rieng"): Cần / Tốn / Được / Mất / Kèm
   và bậc may rủi. Lựa chọn trong các việc khó xử của lối (bị uy hiếp, đứa con giống người ngoài, y hứa đưa đi…) cũng hiện đủ (showOut).
   Bí mật: S.rt.heat «Lời ra tiếng vào» 0–100. Kết cục: over(…, alive) + sổ "ctm-routes" (Sổ luân hồi «Lối riêng x/y»).
   Móc: j22 (S.men, watcher, affairExposed, v.affair), jmen (S.menW chỗ theo buổi, menNmFull), j96 (S.tm96.mid), j67 (panel67, rows67),
   j8 (birthP, deathSentence, cold, evA), j32 over, j52 PD_END, jdiff diffOf, jemo emoGet/emoSet (nếu có). Sổ cũ: S.rt tạo khi cần.
   Cùng luật cho phi tần NPC: tư thông (j22), mưu trốn cung (v.rtEsc), xin xuất gia; con riêng (k.tf) cũng có thể bị đồn.
   Tắt khi đo cân bằng: window.__rtOff=1.
   ======================================================================================================================== */
const RTC={heat:{vuon:14,home:8,tyv:10,tn:24,lc:6,kn:24},decay:6,maxFinal:45,npcEsc:1.2,npcSee:30,kidRoll:3,fire:1.2};
const RT_ROUTE={tt:"Tư tình",tc:"Trốn khỏi cung",hl:"Rời cung hợp lệ",ad:"Ẩn dật trong cung"};
const RT_END={tt_lo:["tt","Tư thông bại lộ"],tt_hoa:["tt","Giọt máu vẫn hòa"],ng_oan:["tt","Bị vu oan qua bát nước"],ng_vach:["tt","Vạch mặt kẻ gian lận"],tt_kin:["tt","Một đời giấu kín"],tc_dan:["tc","Trốn khỏi cung, sống đời thường dân"],
 tc_cung:["tc","Cao chạy xa bay cùng người thương"],tc_lien:["tc","Thoát thân, nhà bị liên lụy"],tc_bat:["tc","Bị bắt khi trốn"],
 hl_tu:["hl","Dâng biểu xuất gia"],hl_hon:["hl","Được ban hôn cho Vương gia"],hl_que:["hl","Xuất cung về quê"],hl_phe:["hl","Phế làm thứ dân"],
 ad_an:["ad","Một đời an nhiên"]};
/* every act on main that harms another person breaks the quiet-life vow (LUẬT SỬA CẢ NHÓM 16/11: list re-scanned against every A("…") on main) */
const RT_HARM=["rumor","frame","poison","block","musk","ksab","kpoison","pond","kframe","pushp","trip","provoke","humiliate","plant","catswap","steal","accuse",
 "lygian","slowpoison","huydung","uyhiep","giahoa","blockf","pgift","thathu","phonghoa","batnat","thaopet","petsteal","expose","xinhh","vp","tat","phatquy","rash","takeaway"];
const RT_ART={tt:"img/ev-tu-tinh.webp",hen:"img/ev-mat-uoc.webp",tc:"img/ev-cung-nu.webp",thu:"img/ev-thu-nha.webp",lo:"img/ev-hoi-lo.webp",hoa:"img/ev-hoa-hoan.webp",
 bat:"img/ev-hinh-phat.webp",lc:"img/ev-lanh-cung.webp",tu:"img/act-xuat-gia.webp",ta:"img/ev-thinh-an.webp",an:"img/ev-te-le.webp",con:"img/ev-con-tre.webp",don:"img/ev-tin-don.webp"};
try{Object.assign(PD_END,{"Trốn khỏi cung":12,"Cao chạy xa bay":15,"Xuất cung về quê":10,"Phế làm thứ dân":6,"Một đời an nhiên":15,"Dâng biểu xuất gia":10})}catch(e){}
window.__rtArt={};
function rtRoad(){try{return !window.__rtOff&&!!S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())&&!(typeof isKc==="function"&&isKc())}catch(e){return false}}
function rtS(){if(!S.rt)S.rt={v:1,heat:0,tt:null,tc:null,hl:{},ad:null,dn:{},bm:null,ends:[],cd:{},npc:{}};return S.rt}
function rtDf(){const k=typeof diffOf==="function"?diffOf():"vua";return ({de:{h:.8,o:5},vua:{h:1,o:0},kho:{h:1.25,o:-6}})[k]||{h:1,o:0}}
function rtDuc(){return S.duc>BAL.route.ducFree?Math.round((S.duc-BAL.route.ducFree)/4):0}
function rtHeat(n){const T=rtS();T.heat=cl(Math.round(T.heat+(n>0?n*rtDf().h:n)),0,100);return T.heat}
function rtHeatW(h){const C=BAL.route.heatW;return h<C[0]?"Yên ắng":h<C[1]?"Có kẻ xì xào":h<C[2]?"Nhiều người bàn tán":h<C[3]?"Lời đồn đã lan":"Sắp vỡ lở"}
function rtEmo(k,v,why){try{if(typeof emoSet==="function")emoSet(S,k,v,why)}catch(e){}}
function rtMan(){const T=S.rt&&S.rt.tt;return T&&T.mid?manById(T.mid):null}
function rtMnm(m){try{return menNmFull(m)}catch(e){return m?m.name:""}}
function rtVn(v){try{return `${rkName(v)} ${v.name}`}catch(e){return v.name}}
function rtKidsAlive(){return (S.kids||[]).filter(k=>k.alive)}
function rtStat(k){try{(window.__rtN=window.__rtN||{})[k]=(window.__rtN[k]||0)+1}catch(e){}}
function rtNight(){return (S.buoi||0)===(typeof B4L!=="undefined"?B4L:2)}
function rtIll(){try{return !!(typeof illOf==="function"&&illOf(S))}catch(e){return false}}
/* ---------- the reasons a life opens «Lối riêng» ---------- */
function rtWeary(){const L=[];if(!S)return L;const kids=rtKidsAlive().length;
 if(S.turn>=12&&!kids&&!S.preg)L.push("đã một năm trong cung mà chưa có con");
 if(S.turn>=6&&S.sung<BAL.route.wearySung&&!S.out)L.push("ân sủng nhạt dần");
 if(S.out)L.push("đang ở lãnh cung");else if(S.rt&&S.rt.wasCold)L.push("từng nếm mùi lãnh cung");
 if(S.turn>=18&&S.rank<=1&&!S.out)L.push("mãi không được tấn phong");
 try{if(typeof emoGet==="function"){const e=emoGet(S);if(["buon","dau","so"].includes(e.k)&&e.v>=45)L.push("lòng "+EMO[e.k].toLowerCase())}}catch(e){}
 return L}
function rtTm(){return (S.tm96&&S.tm96.mid)||null}
function rtMenMet(){try{menInit()}catch(e){}const tm=rtTm();return (S.men||[]).filter(m=>m.alive&&!(typeof menBanned==="function"&&menBanned(m))&&(m.id===tm||m.seen||(m.af||0)>0||(m.tinh||0)>0))}
function rtOpen(){if(!rtRoad())return false;const T=rtS();if(T.open)return true;const ok=rtWeary().length||rtMenMet().some(m=>(m.tinh||0)>=12||m.id===rtTm())||T.tt||T.tc||T.ad;
 if(ok){T.open=S.turn;log(`<span class="pdl">Lòng ngươi bắt đầu nghĩ đến những lối khác ngoài con đường tranh sủng. Mục Hành sự có thêm nhóm «Lối riêng».</span>`)}return !!ok}
/* ---------- ledger across lives (memory only) ---------- */
function rtBook(){try{return JSON.parse(localStorage.getItem("ctm-routes")||"{}")||{}}catch(e){return {}}}
function rtEnd(id){const T=rtS();if(T.ends.includes(id))return;T.ends.push(id);rtStat("end_"+id);try{const b=rtBook();const e=b[id]||{n:0};e.n++;if(!e.first)e.first={who:S.name,o:S.origin&&S.origin.n,y:S.year};b[id]=e;localStorage.setItem("ctm-routes",JSON.stringify(b))}catch(e){}}
/* ---------- one card = one step: the kit act card (Cần / Tốn / Được / Mất / Kèm + odds) ---------- */
function rtCard(o){const need=(o.need||[]).map(([t,ok])=>({t,ok:!!ok}));const lock=o.lock!=null?o.lock:need.some(x=>!x.ok);
 const id=o.id||o.n;const T=rtS();const once=g=>()=>{if(window.__bot&&!window.__rtAct){rtStat("bot_leak");return}/* a balance bot's stale deck index never runs a route step */T.dn[id]=wk();try{if(g)g()}finally{rtRefresh()}};
 window.__rtArt[o.n]=o.art||RT_ART.tt;
 return {n:o.n,t:o.t||"",c:o.c||{},o:o.o==null?100:o.o,k:o.k||1,w:o.w||{},l:o.l||{},x:(o.x||"")+(o.kem?` · kèm: ${o.kem}`:""),lx:String(o.lx||"").split(" · ").join(" — "),dom:o.dom||"Mưu kế",
  lock,rtNeed:need,rt:o.r||1,rtId:id,done:T.dn[id]===wk(),go:once(o.go),fail:once(o.fail)}}
/* ---------- 1. TƯ TÌNH ---------- */
function rtSpot(m){const night=rtNight(),w=(S.menW||{})[m.id];
 if(S.out){if(m.rw==="thị vệ"&&night)return{k:"lc",why:"y đổi phiên gác lãnh cung đêm nay"};return null}
 if(w==="vuon")return{k:"vuon",why:night?"y đang ở Ngự hoa viên":"y đang ở Ngự hoa viên, sau hòn giả sơn"};
 if(m.rw==="thị vệ"&&night&&w)return{k:"vuon",why:"y tuần đêm, lẻn ra sau hòn giả sơn"};
 if(m.rw==="thái y"&&!night&&(rtIll()||S.preg||S.suc<BAL.route.tySuc))return{k:"home",why:"truyền thái y vào bắt mạch"};
 if(m.rw==="thái y"&&w==="tyv"&&!night)return{k:"tyv",why:"y trực ở Thái y viện"};
 if((m.rw==="họa sư"||m.rw==="nhạc sư")&&!night&&S.rt&&S.rt.order===wk())return{k:"home",why:"y vào cung ngươi theo lệnh"};
 if(w==="tn"&&!night)return{k:"tn",why:"y vào thỉnh an Thái hậu"};
 return null}
/* witnesses = consorts the ONE record (whereOf = S.roster at this khắc) puts at k now; nobody from another place (schedules3-r4) */
function rtWit(k){if(k==="home")return[];return liveRivals(true).filter(v=>whereOf(v)===k)}
function rtPlace(k){try{return k==="home"?"cung ngươi":placeName(k)}catch(e){return k}}
function rtSeeO(k,extra){const w=watcher();const W=rtWit(k).length;return od(80-(RTC.heat[k]||14)-W*12+(w?Math.round(w.loyal/10):0)-rtDuc()+rtDf().o-(extra||0)-Math.round(rtS().heat/5))}
function rtTtCards(){const T=rtS(),A=[],tt=T.tt,ducK=S.duc>=BAL.route.guiltDuc?"lương tâm cắn rứt (Đức cao)":"";
 if(!tt){const M=rtMenMet().sort((a,b)=>((b.tinh||0)+(b.af||0))-((a.tinh||0)+(a.af||0))).slice(0,2);const tm=rtTm();
  if(!M.length)A.push(rtCard({id:"tt0",n:"Để ý một nam nhân",t:"Một bóng áo xanh nơi cung cấm làm ngươi xao lòng.",need:[["đã gặp một nam nhân (Ngự hoa viên, Thái y viện, lễ tết…)",false]],x:"bắt đầu lối Tư tình"}));
  for(const m of M)A.push(rtCard({id:"tt0"+m.id,n:`Để ý ${rtMnm(m)}`,t:m.id===tm?"Người thương thuở ở quê, nay gặp lại trong cung cấm.":`${m.role} ${netTxt(m)}; ngươi đã gặp y.`,art:RT_ART.tt,c:S.duc>=BAL.route.guiltDuc?{...BAL.route.eyeGuilt}:{},k:BAL.route.k.tt0,
   x:`bắt đầu lối Tư tình · y để ý ngươi hơn (tình ý +8)`,kem:ducK,go:()=>{T.tt={mid:m.id,st:1,meet:0,since:S.turn};m.tinh=(m.tinh||0)+8;rtStat("tt_start");rtEmo("lo",25,`thầm nghĩ đến ${m.name}`);log(`Ngươi bắt đầu để ý ${rtMnm(m)}. Chuyện này chỉ mình ngươi biết.`)}}));
  return A}
 const m=rtMan();if(!m){T.tt=null;return A}
 const w=watcher();const maid=S.maid&&S.maid.loyal>=BAL.loy.mid;const here=(S.menW||{})[m.id]===S.place;
 if(tt.st===1){const o=od(62+S.tamco/5-rtDuc()+rtDf().o);
  A.push(rtCard({id:"tt1",n:`Trao tín vật cho ${rtMnm(m)}`,t:"Một chiếc khăn thêu, một nhành trâm: lời không dám nói, gửi vào vật.",art:RT_ART.tt,c:{...BAL.route.token},o,k:BAL.route.k.tt1,
   need:[[`người đưa tin: cung nữ thân cận (lòng ${balAb(BAL.loy.mid)}+) hoặc y đang ở đây`,maid||here]],x:"tình ý +15 · y giữ tín vật",lx:"tín vật lọt vào tay người khác · Lời ra tiếng vào +12",kem:`Lời ra tiếng vào +6 · tín vật là tang vật nếu bị lục${ducK?" · "+ducK:""}`,
   go:()=>{m.tinh=(m.tinh||0)+15;m.letters=(m.letters||0)+1;tt.tok=1;rtHeat(6);if((m.tinh||0)>=40)tt.st=2;log(`${rtMnm(m)} nhận tín vật, giấu vào ngực áo.`)},
   fail:()=>{rtHeat(12);const v=pick(liveRivals(true).filter(x=>(x.mat||0)>=2))||null;if(v&&roll(BAL.route.tokenLost)){evA(v,S,BAL.eff.jroute.evFail);log(`Tín vật bị ${rtVn(v)} nhặt được. Nàng giữ làm chứng cứ.`)}else log("Tín vật rơi dọc đường; có người nhặt được, chưa rõ là ai.")}}))}
 if(tt.st>=2){const sp=rtSpot(m);const night=rtNight();
  if(tt.st===2||!night||!sp||sp.k==="tyv"||sp.k==="tn"){const o=sp?rtSeeO(sp.k):30;
   A.push(rtCard({id:"tt2",n:`Hẹn gặp lén ${rtMnm(m)}`,t:sp?`Buổi này ${sp.why}.`:`Buổi này không có chỗ nào gặp ${rtMnm(m)} được.`,art:RT_ART.hen,c:{...BAL.route.meet},o,k:BAL.route.k.tt2,
    need:[[sp?`y ở chỗ hẹn được (${rtPlace(sp.k)})`:"y ở chỗ hẹn được buổi này (giả sơn Ngự hoa viên buổi tối, Thái y viện, cung ngươi khi truyền thái y / họa sư)",!!sp],[`kẻ hầu ngươi tin cẩn canh cửa (lòng ${balAb(BAL.loy.close)}+, Chủ tin ${balAb(BAL.tinLv.watch)}+)${w?": "+w.name:""}`,!!w]],
    x:`tình ý +12 · Sức +${BAL.route.meetG.suc}`,lx:`có người thấy · chứng cứ về ngươi +2 · Lời ra tiếng vào +20`,kem:[`Lời ra tiếng vào +${Math.round((sp?RTC.heat[sp.k]||14:14)*rtDf().h)}`,sp&&rtWit(sp.k).length?`đang có ${rtWit(sp.k).length} phi tần ở ${rtPlace(sp.k)}`:"",ducK].filter(Boolean).join(" · "),
    go:()=>{m.tinh=(m.tinh||0)+12;tt.meet++;apply(BAL.route.meetG);rtHeat(RTC.heat[sp.k]||14);rtEmo("vui",35,`gặp ${m.name}`);if(tt.meet>=2&&(m.tinh||0)>=60)tt.st=3;rtStat("tt_meet");log(`Ngươi gặp ${rtMnm(m)} ở ${rtPlace(sp.k)}. Đôi ba câu, rồi mỗi người một ngả.`)},
    fail:()=>{rtStat("tt_seen");rtSeen(m,sp?sp.k:"vuon","gap")}}))}
  if(tt.st>=3){const sp2=night&&sp&&(sp.k==="vuon"||sp.k==="lc"||sp.k==="home")?sp:null;const o=sp2?rtSeeO(sp2.k,8):25;
   A.push(rtCard({id:"tt3",n:`Đêm riêng với ${rtMnm(m)}`,t:"Đêm khuya, đèn tắt, cửa cài. Chuyện sau đó không ai được biết.",art:RT_ART.hen,c:{...BAL.route.night},o,k:BAL.route.k.tt3,
    need:[["buổi tối",night],[sp2?`y ở chỗ hẹn được (${rtPlace(sp2.k)})`:"y lẻn đến được đêm nay",!!sp2],[`kẻ hầu ngươi tin cẩn canh cửa (lòng ${balAb(BAL.loy.close)}+, Chủ tin ${balAb(BAL.tinLv.watch)}+)`,!!w]],
    x:`Sức +${BAL.route.nightG.suc} · tình ý +10 · có thai: ${word(trystCh(S))}`,lx:"bị bắt gặp giữa đêm · tội tư thông",kem:`con sinh ra có cha thật là y (lớn lên có thể giống y) · Lời ra tiếng vào +${Math.round(18*rtDf().h)}${ducK?" · "+ducK:""}`,
    go:()=>rtNightOk(m,sp2.k),fail:()=>{rtStat("tt_nightseen");rtSeen(m,sp2?sp2.k:"vuon","dem")}}))}}
 if((m.rw==="họa sư"||m.rw==="nhạc sư")&&!rtNight()&&T.order!==wk())A.push(rtCard({id:"ttord",n:`Truyền ${m.rw} vào cung`,t:m.rw==="họa sư"?"Xin Nội vụ phủ cho họa sư vào vẽ một bức chân dung.":"Xin Nội vụ phủ cho nhạc sư vào dạy đàn.",art:RT_ART.ta,c:{...BAL.route.order},k:BAL.route.k.ttord,x:"y vào cung ngươi suốt tuần này (có cớ gặp)",kem:"Lời ra tiếng vào +3",go:()=>{T.order=wk();rtHeat(3);log(`${rtMnm(m)} vào cung ngươi theo lệnh Nội vụ phủ.`)}}));
 A.push(rtCard({id:"ttcut",n:`Cắt đứt với ${rtMnm(m)}`,t:"Trả lại tín vật, coi như chưa từng quen.",art:RT_ART.tt,k:BAL.route.k.ttcut,w:{...BAL.route.cutW},x:"lời ra tiếng vào lắng bớt · lối Tư tình khép lại",kem:"y đau lòng",go:()=>{m.tinh=0;T.tt=null;rtHeat(-10);rtEmo("buon",40,`cắt đứt với ${m.name}`);log(`Ngươi trả lại tín vật cho ${rtMnm(m)}. Từ nay mỗi người một ngả.`)}}));
 return A}
function rtNightOk(m,k){const T=rtS(),tt=T.tt;m.trysts=(m.trysts||0)+1;m.tinh=(m.tinh||0)+10;S.lastTryst=wk();apply(BAL.route.nightG);rtHeat(18);tt.night=(tt.night||0)+1;rtEmo("vui",50,`đêm với ${m.name}`);rtStat("tt_night");
 let r=`Đêm ấy trôi qua kín đáo ở ${rtPlace(k)}.`;
 if(!S.preg&&roll(trystCh(S))){S.preg=1;S.hidden=true;S.pregWk=wk();S.trueFather=m.id;const ok=(S.nightLog||[]).some(x=>Math.abs(x-wk())<=1);S.pregMismatch=!ok;rtStat("tt_preg");
  r+=ok?" Mấy hôm sau ngươi biết mình có thai; ngày tháng trùng đêm thị tẩm.":` <b class="r">Ngươi có thai, mà sổ Kính sự phòng không có đêm thị tẩm nào khớp ngày.</b>`}
 log(r);if((m.tinh||0)>=80&&!tt.prom&&["thị vệ","vương gia","thái y"].includes(m.rw)){tt.prom=1;tt.st=4;rtPush("rtPromise",{m:m.id})}}
/* seen while meeting: the witness decides by her nature (same rule as an NPC seeing an NPC) */
function rtSeen(m,k,what){const W=rtWit(k);rtHeat(what==="dem"?30:20);
 const v=W.length?pick(W):null;
 if(!v){log(`Có tiếng bước chân ngoài hiên; ngươi và ${rtMnm(m)} kịp tản đi. Người trong cung bắt đầu xì xào.`);return}
 evA(v,S,what==="dem"?BAL.eff.jroute.evRtSeen[0]:BAL.eff.jroute.evRtSeen[1]);try{noteAdd(v.id,`bắt gặp ngươi với ${m.name}`)}catch(e){}rtCaughtBy(v,m,what)}
/* what the witness does goes through the shared motive gate + record (OD:L35): blackmail = uyhiep, report = tocao (schedules3-r4) */
function rtGateT(v,t,k){try{if(typeof motiveOK!=="function")return{ok:true,why:""};const g=motiveOK(v,t,k);if(typeof j95actLog==="function")j95actLog(v,t,k,g);return g}catch(e){return{ok:true,why:""}}}
function rtGate(v,k){return rtGateT(v,S,k)}
function rtCaughtBy(v,m,what){const T=rtS();rtStat("tt_caught");
 if(aff(v,S)>=BAL.route.seen.aff){relAdd(S,v,BAL.route.seen.rel);log(`${rtVn(v)} thấy ngươi với ${rtMnm(m)}. Nàng lặng lẽ quay đi, giữ kín cho ngươi.`);return}
 const greedy=netRx(v,/Tham|Xảo quyệt/);if((greedy||roll(BAL.route.bmRoll))&&rtGate(v,"uyhiep").ok){T.bm={v:v.id,mid:m.id,n:30+R(4)*10,since:S.turn,k:0};rtEmo("so",55,`${v.name} nắm thóp`);rtPush("rtBm",{v:v.id});return}
 if(!rtGate(v,"tocao").ok){log(`${rtVn(v)} thấy ngươi với ${rtMnm(m)}. Nàng không nói gì, nhưng đã ghi nhớ.`);return}
 rtReport(v,m)}
function rtReport(v,m){const T=rtS();rtStat("tt_report");{const kk=rtKidsAlive().find(k=>k.tf&&!k.tfOk);if(kk&&!T.ng){log(`<span class="r">${rtVn(v)} tâu: ${kk.name} không phải cốt nhục hoàng gia, xin trích huyết nghiệm thân.</span>`);rtNgSet(kk,v.id,false);return}}const ev=(typeof evG==="function"?evG(v,S):2)||2;
 if(roll(cl(35+ev*8+T.heat/4,10,90))){rtExpose(m,`${rtVn(v)} tố giác ngươi tư thông với ${m.name}.`)}
 else{if(v&&v!==S&&v.alive){ap(v,{danh:-BAL.tw.g.accFail[0]});oanAdd(S,v,BAL.tw.g.accFail[1]);affAdd(S,v,-BAL.tw.g.accFail[2]);punish(v,"vu cáo người khác tư thông",1)}/* two-way law: the failed accuser pays like her (j95accuse) */apply(BAL.route.accused);rtHeat(15);m.ban=wk()+24;log(`<span class="r">${rtVn(v)} tố ngươi tư thông với ${rtMnm(m)}; chứng cứ chưa đủ. Hoàng thượng quở trách, cấm y vào hậu cung. Sủng ${BAL.route.accused.sung} · Danh ${BAL.route.accused.danh}.</span>`)}}
function rtExpose(m,how){const T=rtS();T.exposed=1;rtEnd("tt_lo");T.tt=null;T.bm=null;rtStat("tt_exposed");log(`<span class="r">${how}</span>`);
 try{affairExposed(m,"Chuyện tư tình bị lộ:")}catch(e){m.alive=false;deathSentence("Bị ban chết vì tư thông")}}
/* ---------- 2. TRỐN KHỎI CUNG ---------- */
function rtTcCards(){const T=rtS(),A=[];const tc=T.tc;
 if(!tc){const why=rtWeary();const ok=why.length||(T.tt&&T.tt.st>=4);
  A.push(rtCard({id:"tc0",r:2,n:"Nghĩ cách trốn khỏi cung",t:why.length?`Ngươi chán chốn này: ${why.slice(0,2).join("; ")}.`:"Tường cao mấy trượng; ngoài kia là trời đất.",art:RT_ART.tc,k:BAL.route.k.tc0,need:[["có cớ chán cung (không con, nhạt sủng, lãnh cung…) hoặc có người hứa đưa đi",!!ok]],
   x:"bắt đầu lối Trốn khỏi cung",kem:"bị bắt thì lãnh cung hay ban chết · nhà bị liên lụy",go:()=>{T.tc={prep:{},since:S.turn};rtStat("tc_start");rtEmo("lo",35,"tính chuyện trốn đi");log("Ngươi bắt đầu tính đường ra khỏi bức tường son. Không được để ai biết.")}}));return A}
 const P=tc.prep,m=rtMan(),lov=T.tt&&T.tt.st>=4&&m;const cool=k=>T.cd[k]&&T.cd[k]>S.turn;
 const step=(k,o)=>{if(P[k])return;o.id="tc_"+k;o.r=2;if(cool(k))o.need=(o.need||[]).concat([[`đợi tháng sau mới thử lại (còn ${T.cd[k]-S.turn} tháng)`,false]]);const f0=o.fail;o.fail=()=>{T.cd[k]=S.turn+1;if(f0)f0()};A.push(rtCard(o))};
 const gl=lov&&m.rw==="thị vệ";
 step("guard",{n:gl?`Nhờ ${rtMnm(m)} lo cổng`:"Mua chuộc thị vệ gác cổng",t:gl?"Y biết phiên gác nào lơi lỏng.":S.out?"Lính gác lãnh cung vốn lơi lỏng, bạc dễ mở cửa.":"Thị vệ gác cổng Thần Vũ, một nén bạc đổi một lần nhắm mắt.",art:RT_ART.lo,
  c:gl?{}:{bac:S.out?-60:-120},o:gl?100:od((S.out?60:45)+S.tamco/4-rtDuc()+rtDf().o),k:BAL.route.k.step_guard,x:"đêm trốn: cơ may +8",lx:`y nhận bạc rồi báo lên · Cung Chính ti để mắt ${BAL.route.watch} tháng · Lời ra tiếng vào +20`,kem:"Lời ra tiếng vào +5",
  go:()=>{P.guard=1;rtHeat(5)},fail:()=>{rtHeat(20);T.watch=S.turn+BAL.route.watch;log(`<span class="r">Tên thị vệ nhận bạc rồi bẩm lên. Cung Chính ti bắt đầu để mắt đến ngươi.</span>`)}});
 const mL=S.maid?S.maid.loyal:0;
 step("maid",{n:"Dặn cung nữ tâm phúc",t:S.maid?`${S.maid.name} sẽ đi cùng hay ở lại che mắt cho ngươi.`:"Cần một cung nữ thân cận.",art:RT_ART.tc,k:BAL.route.k.step_maid,o:od(55+mL/3),need:[[`cung nữ thân cận một lòng (lòng ${balAb(BAL.loy.trust)}+, có ${mL})`,mL>=BAL.loy.trust]],
  x:"đêm trốn: cơ may +5 · may được y phục cung nữ",lx:`nàng sợ hãi từ chối · lòng -${balAb(BAL.eff.jroute.loyalFail)}`,kem:"nàng biết chuyện của ngươi",go:()=>{P.maid=1},fail:()=>{if(S.maid)S.maid.loyal=Math.max(0,S.maid.loyal-BAL.eff.jroute.loyalFail);if(roll(BAL.route.maidBlab)){rtHeat(20);log(`<span class="r">${S.maid?S.maid.name:"Cung nữ"} hoảng sợ, lỡ lời với người ngoài.</span>`)}}});
 step("home",{n:"Gửi thư về nhà",t:"Nhờ người mang mật thư ra cửa cung: người nhà sẵn xe đón và dời nhà đi trước.",art:RT_ART.thu,c:{...BAL.route.home},o:od(55+(S.mat||0)*3+rtDf().o),k:BAL.route.k.step_home,
  x:"có người đón · nhà không bị liên lụy",lx:`thư bị chặn giữa đường · chứng cứ về ngươi ${balSg(BAL.eff.jroute.evFail_2)} · Lời ra tiếng vào +15`,kem:S.origin&&S.origin.k==="nc"?"nhà ở Nam Chiếu xa xôi, thư đi lâu":"",
  go:()=>{P.home=1},fail:()=>{rtHeat(15);const v=pick(liveRivals(true).filter(x=>(x.mat||0)>=2))||null;if(v){evA(v,S,BAL.eff.jroute.evFail_2);log(`<span class="r">Mật thư của ngươi rơi vào tay ${rtVn(v)}.</span>`)}else log("Mật thư bị chặn ở cửa cung; chưa rõ ai giữ.")}});
 step("route",{n:"Dò đường cổng Thần Vũ",t:"Đi một vòng giờ đổi phiên gác, nhớ từng ngã rẽ.",art:RT_ART.tc,c:{...BAL.route.scout},o:od(55+(S.mat||0)*4-rtDuc()+rtDf().o),k:BAL.route.k.step_route,x:"đêm trốn: cơ may +6",lx:"bị hỏi han giữa đường · Lời ra tiếng vào +10",go:()=>{P.route=1},fail:()=>{rtHeat(10)}});
 step("pass",{n:"Làm giả yêu bài xuất cung",t:"Một thái giám Nội vụ phủ nhận khắc yêu bài, giá không rẻ.",art:RT_ART.lo,c:{...BAL.route.pass},o:od(42+S.tamco/3+rtDf().o),k:BAL.route.k.step_pass,x:"có yêu bài xuất cung",lx:"mất bạc · tên thái giám ôm bạc biến mất · Lời ra tiếng vào +12",go:()=>{P.pass=1},fail:()=>{rtHeat(12)}});
 if(P.maid)step("cloth",{n:"May y phục cung nữ",t:"Cung nữ tâm phúc lén may một bộ áo xanh như của nàng.",art:RT_ART.tc,c:{...BAL.route.cloth},k:BAL.route.k.step_cloth,x:"có y phục cung nữ",go:()=>{P.cloth=1}});
 const ty=T.tt&&m&&m.rw==="thái y"&&T.tt.st>=3,doc=!!S.doctor;
 step("drug",{n:"Xin thuốc giả chết",t:"Một bài thuốc làm mạch ngừng nửa ngày. Chỉ thái y mới có.",art:RT_ART.lo,c:{bac:ty?-20:-100},o:ty?od(85):od(50+(S.arts&&S.arts.y||0)*6),k:BAL.route.k.step_drug,need:[["thái y tâm phúc hoặc người ấy là thái y",ty||doc]],
  x:"có thuốc giả chết",lx:"thái y nghi ngờ · Lời ra tiếng vào +15",go:()=>{P.drug=1},fail:()=>{rtHeat(15)}});
 /* the night itself */
 const fire=T.fire===S.turn;const M=[
  ["doan","Lẫn vào đoàn cung nữ xuất cung","Tháng chạp, đoàn cung nữ đủ tuổi được thả về quê. Cúi đầu, đi giữa hàng.",[["tháng chạp (đoàn cung nữ xuất cung)",S.month===12],["y phục cung nữ",!!P.cloth],["yêu bài xuất cung",!!P.pass]],RT_ART.tc],
  ["chet","Giả chết thoát cung","Uống thuốc, nằm như người chết; quan tài ra cửa sau, người nhà mở nắp giữa đường.",[["thuốc giả chết",!!P.drug],["người nhà đón (thư đã về)",!!P.home]],RT_ART.lo],
  ["hoa","Nhân lúc hỏa hoạn","Lửa cháy một góc cung, người người chạy loạn, cổng không ai giữ.",[["có hỏa hoạn tháng này",fire],["đã dò đường",!!P.route]],RT_ART.hoa],
  ["theo",`Theo ${m?rtMnm(m):"người ấy"} ra cổng`,"Y dẫn ngươi qua cổng lúc đổi phiên.",[["người ấy đã hứa đưa ngươi đi",!!lov],["người ấy là thị vệ hay vương gia",!!(lov&&["thị vệ","vương gia"].includes(m.rw))],["buổi tối",rtNight()]],RT_ART.hen]];
 if(S.out)M.push(["lc","Trốn khỏi lãnh cung trong đêm","Bức tường sau lãnh cung đã đổ một góc.",[["đã mua chuộc lính gác",!!P.guard],["buổi tối",rtNight()]],RT_ART.lc]);
 for(const [k,n,t,need,art] of M){const o=od(rtEscO(k));const anyNeed=need.some(x=>x[1]);if(!anyNeed&&k!=="doan"&&k!=="lc")continue;
  A.push(rtCard({id:"tcgo_"+k,r:2,n,t,art,c:{...BAL.route.escape},o,k:BAL.route.k.tcgo_,need:need.concat(T.watch>S.turn?[[`Cung Chính ti đang để mắt (còn ${T.watch-S.turn} tháng): cơ may -15`,true]]:[]),
   x:`ra khỏi cung · kết thúc kiếp này${P.home?"":" (nhà bị liên lụy)"}`,lx:`bị bắt · lãnh cung hay ban chết · nhà bị liên lụy${k==="chet"?" · thuốc quá liều có thể chết thật":""}`,
   kem:`Lời ra tiếng vào ${rtHeatW(T.heat).toLowerCase()} (cơ may -${Math.round(T.heat/2.5)})`,go:()=>rtFled(k),fail:()=>rtCaughtEsc(k)}))}
 A.push(rtCard({id:"tcstop",r:2,n:"Thôi ý định trốn đi",t:"Đốt hết thư từ, cất yêu bài xuống đáy rương.",art:RT_ART.tc,k:BAL.route.k.tcstop,x:"lời ra tiếng vào lắng bớt · lối Trốn khỏi cung khép lại",go:()=>{T.tc=null;rtHeat(-8);log("Ngươi đốt hết thư từ. Bức tường son vẫn đứng đó.")}}));
 return A}
function rtEscO(k){const T=rtS(),P=(T.tc&&T.tc.prep)||{};const base={doan:12,chet:16,hoa:10,theo:22,lc:8}[k]||8;
 return cl(base+(P.guard?8:0)+(P.route?6:0)+(P.maid?5:0)+(P.home?4:0)+(P.pass&&k!=="doan"?3:0)-Math.round(T.heat/2.5)-(T.watch>S.turn?15:0)-rtDuc()+rtDf().o,5,RTC.maxFinal)}
function rtFled(k){const T=rtS(),P=T.tc.prep,m=rtMan();const withM=!!(m&&T.tt&&T.tt.st>=4);rtStat("tc_ok");
 const id=withM?"tc_cung":P.home?"tc_dan":"tc_lien";rtEnd(id);
 const how={doan:"lẫn trong đoàn cung nữ xuất cung, cúi đầu đi qua cổng Thần Vũ",chet:"uống thuốc giả chết; quan tài ra cửa sau, người nhà mở nắp giữa đường",hoa:"nhân lúc lửa cháy, khoác áo cung nữ chạy ra cổng",theo:`theo ${m?m.name:"người ấy"} ra cổng lúc đổi phiên gác`,lc:"trèo qua bức tường đổ sau lãnh cung trong đêm"}[k];
 const life=withM?`Ngươi và ${m.name} đổi tên, dựng một mái nhà bên sông ở phương Nam.`:"Ngươi đổi tên, sống đời thường dân ở một trấn nhỏ phương Nam.";
 const fam=P.home?"Người nhà đã dời đi từ trước; trong cung chỉ ghi một phi tần mất tích.":"Nhà ngươi không kịp dời đi: cha bị cách chức, cả nhà bị liên lụy.";
 if(!P.home)try{S.dad=Math.max(0,(S.dad||0)-30)}catch(e){}
 over(withM?"Cao chạy xa bay":"Trốn khỏi cung",`${S.name} ${how}. ${life} ${fam}`,withM?`Trốn khỏi cung cùng ${m.name}`:"Trốn khỏi cung",true)}
function rtCaughtEsc(k){const T=rtS();rtStat("tc_caught");rtEnd("tc_bat");T.tc=null;try{S.dad=Math.max(0,(S.dad||0)-30)}catch(e){}
 if(k==="chet"&&roll(BAL.route.overdose)){rtStat("tc_drug");die("Uống thuốc giả chết quá liều, không tỉnh lại nữa");return}
 log(`<span class="r">Ngươi bị bắt ngay ở cổng. Nhà ngươi bị liên lụy.</span>`);
 const mercy=cl(15+S.sung/3+(S.th||0)/4,10,70);if(S.out||!roll(mercy))deathSentence("Bị ban chết vì trốn khỏi cung");else cold("Trốn khỏi cung không thành")}
/* ---------- 3. RỜI CUNG HỢP LỆ ---------- */
function rtHlCards(){const T=rtS(),A=[],H=T.hl;const kidsSmall=rtKidsAlive().filter(k=>(k.age||0)<BAL.route.kidAge).length;const cd=k=>H["cd_"+k]&&H["cd_"+k]>S.turn;const cdN=k=>[[`đợi qua cơn giận của Hoàng thượng (còn ${H["cd_"+k]-S.turn} tháng)`,!cd(k)]];
 const nights=(S.nightLog||[]).length;
 if(!S.out){A.push(rtCard({id:"hl_tu",r:3,n:"Dâng biểu xin xuất gia",t:"Xin cạo tóc vào chùa Hộ Quốc, cầu phúc cho xã tắc.",art:RT_ART.tu,o:od(-12+(S.th||0)/3+(S.duc-50)/3-S.sung/3+(H.plead?8:0)+rtDf().o),k:BAL.route.k.hl_tu,
   need:[[`không có con nhỏ dưới ${BAL.route.kidAge} tuổi`,!kidsSmall],["không mang thai",!S.preg],[`Đức ${BAL.route.tuDuc} (có ${S.duc})`,S.duc>=BAL.route.tuDuc],[`ở cung đủ 2 năm (đã ${Math.floor(S.turn/12)} năm)`,S.turn>=24],[`Thái hậu thương ngươi (có ${S.th||0}/40)`,(S.th||0)>=40&&!S.thDead]].concat(cdN("tu")),
   x:"kết thúc kiếp này trong cửa Phật",lx:`Hoàng thượng phật ý · Sủng ${BAL.route.tuFail.sung} · đợi một năm`,go:()=>{rtEnd("hl_tu");over("Dâng biểu xuất gia",`Hoàng thượng phê một chữ «Chuẩn». ${S.name} cạo tóc ở chùa Hộ Quốc, tiếng mõ sớm chiều thay tiếng trống canh trong cung.`,"Xuất gia",true)},
   fail:()=>{apply(BAL.route.tuFail);H.cd_tu=S.turn+12;rtStat("hl_tu_no");log(`<span class="r">Hoàng thượng ném tấu biểu xuống đất: «Trẫm còn sống, nàng đã muốn bỏ trẫm mà đi?»</span>`)}}));
  A.push(rtCard({id:"hl_plead",r:3,n:"Nhờ Thái hậu nói giúp",t:"Quỳ trước Đức Thọ cung, kể nỗi lòng muốn rời cung.",art:RT_ART.ta,c:{...BAL.route.plead},o:od(35+(S.th||0)/2),k:BAL.route.k.hl_plead,need:[[`Thái hậu thương ngươi (có ${S.th||0}/40)`,(S.th||0)>=40&&!S.thDead],["chưa nhờ",!H.plead]],
   x:"Thái hậu đứng về phía ngươi khi ngươi xin rời cung (xin ban hôn, về quê dễ hơn nhiều; xuất gia dễ hơn)",lx:`Thái hậu không vui · Thái hậu ${BAL.route.pleadFail.th}`,go:()=>{H.plead=1},fail:()=>{apply(BAL.route.pleadFail)}}));
  const vg=(S.men||[]).filter(m=>m.alive&&m.rw==="vương gia"&&((m.tinh||0)>=50||(T.tt&&T.tt.mid===m.id&&T.tt.st>=3)));const v1=vg[0];
  A.push(rtCard({id:"hl_hon",r:3,n:v1?`Xin ban hôn cho ${rtMnm(v1)}`:"Xin ban hôn cho Vương gia",t:"Vương gia dâng sớ xin Hoàng thượng ban ngươi về vương phủ.",art:RT_ART.ta,o:od(22+(S.th||0)/4+(v1?(v1.tinh||0)/5:0)+(H.plead?20:0)-S.sung/2+rtDf().o),k:BAL.route.k.hl_hon,
   need:[["một Vương gia có tình ý với ngươi (tình ý 50+)",!!v1],[`phẩm thấp (Quý nhân trở xuống)`,S.rank<=2],[`ít thị tẩm (có ${nights}/2)`,nights<=2],["không có con",!rtKidsAlive().length]].concat(cdN("hon")),
   x:"vào vương phủ · kết thúc kiếp này trong cung",lx:`Hoàng thượng nghi ngờ · Sủng ${BAL.route.honFail.sung} · Vương gia bị cấm vào cung · Lời ra tiếng vào +15`,kem:"Hoàng thượng có thể đoán ra chuyện giữa hai người",
   go:()=>{rtEnd("hl_hon");over("Được ban hôn",`Thánh chỉ ban ${S.name} cho ${v1.name}. Kiệu hoa ra cửa Tây Hoa; từ nay ngươi là người của vương phủ.`,`Được ban hôn cho ${v1.name}`,true)},
   fail:()=>{apply(BAL.route.honFail);rtHeat(15);if(v1)v1.ban=wk()+36;H.cd_hon=S.turn+6;rtStat("hl_hon_no");log(`<span class="r">Hoàng thượng gạch sớ: «Phi tần của trẫm, há để vương gia xin?» ${v1?v1.name:"Vương gia"} bị cấm vào hậu cung.</span>`)}}));
  A.push(rtCard({id:"hl_que",r:3,n:"Xin về quê phụng dưỡng cha mẹ",t:"Cha mẹ già yếu; xin ơn trên cho về quê tận hiếu.",art:RT_ART.thu,o:od(14+(S.th||0)/3+(H.plead?20:0)-S.sung/2+rtDf().o),k:BAL.route.k.hl_que,
   need:[["Đáp ứng hay Thường tại",S.rank<=1],[`ở cung đủ 2 năm (đã ${Math.floor(S.turn/12)} năm)`,S.turn>=24],["không có con",!rtKidsAlive().length],[`Sủng dưới ${BAL.route.queSung} (có ${S.sung})`,S.sung<BAL.route.queSung]].concat(cdN("que")),
   x:"xuất cung về quê · kết thúc kiếp này",lx:`bị bác · Sủng ${BAL.route.queFail.sung} · đợi ${BAL.route.queCd} tháng`,go:()=>{rtEnd("hl_que");over("Xuất cung về quê",`Hoàng thượng chuẩn tấu. ${S.name} về quê, sớm hôm hầu cha mẹ; chuyện trong cung như một giấc mộng dài.`,"Xuất cung về quê",true)},
   fail:()=>{apply(BAL.route.queFail);H.cd_que=S.turn+BAL.route.queCd;rtStat("hl_que_no")}}))}
 else A.push(rtCard({id:"hl_phe",r:3,n:"Xin phế làm thứ dân",t:"Không cầu phục vị, chỉ xin được ra khỏi cung làm dân thường.",art:RT_ART.lc,o:od(38-S.sung/3+(S.th||0)/5+rtDf().o),k:BAL.route.k.hl_phe,need:[[`không có con nhỏ dưới ${BAL.route.kidAge} tuổi`,!kidsSmall]].concat(cdN("phe")),
   x:"phế làm thứ dân · ra khỏi cung · kết thúc kiếp này",lx:`bị bác · Danh ${BAL.route.pheFail.danh} · đợi ${BAL.route.pheCd} tháng`,go:()=>{rtEnd("hl_phe");over("Phế làm thứ dân",`Chiếu phế ${S.name} làm thứ dân, cho ra khỏi cung. Ngươi bước qua cổng với một tay nải nhỏ; không ai tiễn, cũng không ai giữ.`,"Phế làm thứ dân, xuất cung",true)},
   fail:()=>{apply(BAL.route.pheFail);H.cd_phe=S.turn+BAL.route.pheCd}}));
 return A}
/* ---------- 4. ẨN DẬT TRONG CUNG ---------- */
function rtAdCards(){const T=rtS(),A=[],ad=T.ad;
 if(!ad||!ad.on){if(!S.out&&S.rank<7)A.push(rtCard({id:"ad0",r:4,n:"Xin rút thẻ bài, đóng cửa tĩnh dưỡng",t:"Xin Kính sự phòng cất thẻ bài; từ nay chỉ lo kinh kệ, hoa cỏ.",art:RT_ART.an,c:{...BAL.route.adCost},k:BAL.route.k.ad0,
   x:`không còn thị tẩm · phi tần bớt ghen và bớt nhắm vào ngươi · Đức +${BAL.route.adMonth.duc} mỗi tháng`,kem:"Sủng nhạt dần · đường tấn phong chậm lại",go:()=>{T.ad={on:1,since:S.turn,harm:0};rtStat("ad_start");rtEmo("binh",0,"");log("Ngươi xin cất thẻ bài. Cửa cung khép lại; ngoài kia ai tranh gì thì tranh.")}}));return A}
 const yrs=Math.floor((S.turn-ad.since)/12);
 A.push(rtCard({id:"ad_kinh",r:4,n:"Chép kinh cầu phúc",t:"Chép kinh Kim Cương, dâng lên Phật đường.",art:RT_ART.an,c:{...BAL.route.kinh},k:BAL.route.k.ad_kinh,w:{...BAL.route.kinhW},x:"lòng an",go:()=>{rtEmo("vui",15,"lòng an")}}));
 const weak=liveRivals(false).filter(v=>v!==S&&!v.out).sort((a,b)=>(a.sung+a.rank*10)-(b.sung+b.rank*10))[0];
 if(weak)A.push(rtCard({id:"ad_che",r:4,n:`Che chở ${rtVn(weak)}`,t:"Người yếu nhất trong cung; ngươi đỡ cho nàng một tay.",art:RT_ART.ta,c:{...BAL.route.che},k:BAL.route.k.ad_che,w:{...BAL.route.cheW},x:`${weak.name} thiện cảm +${BAL.route.cheRel}`,go:()=>{relAdd(S,weak,BAL.route.cheRel)}}));
 A.push(rtCard({id:"ad_off",r:4,n:"Mở lại thẻ bài",t:"Trở lại đường tranh sủng.",art:RT_ART.an,k:BAL.route.k.ad_off,x:`thôi ẩn dật (đã ${yrs} năm)`,go:()=>{T.ad.on=0;log("Ngươi xin Kính sự phòng bày lại thẻ bài.")}}));
 return A}
/* ---------- the deck: «Lối riêng» cards ---------- */
function rtCards(){if(!rtRoad()||(window.__bot&&!window.__rtGo))return[];/* the balance bots climb; only the route bot (dev/measure/routes.js) takes «Lối riêng» */let A=[];try{A=A.concat(rtNgCards());if(!rtOpen())return A;const T=rtS();if(!S.out)A=A.concat(rtTtCards());else if(T.tt)A=A.concat(rtTtCards());A=A.concat(rtTcCards(),rtHlCards(),rtAdCards())}catch(e){console.error("rtCards",e)}return A}
function rtRefresh(){try{if(!S||!Array.isArray(deck))return;const d=deck.filter(a=>!a.rt);deck.length=0;deck.push(...d,...rtCards())}catch(e){console.error(e)}}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(rtRoad()&&Array.isArray(deck)){deck.push(...rtCards());rtNgDue()}}catch(e){console.error(e)}return r}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const t=S&&S.turn,b=S&&S.buoi;const r=n0.apply(this,arguments);try{if(S&&!S.dead&&(S.turn!==t||S.buoi!==b)){rtRefresh();rtNpcMeet();if(!window.__bot)render()}}catch(e){console.error(e)}return r}})();
/* category «Lối riêng» for the kit act art / category tabs */
try{KIT_CAT["loi-rieng"]=["Lối riêng","#2c6e5a"]}catch(e){}
(function(){if(typeof kitActArt!=="function")return;const k0=kitActArt;kitActArt=function(name){const s=window.__rtArt&&window.__rtArt[name];if(s)return{src:s,cat:"loi-rieng",label:"Lối riêng",col:"#2c6e5a"};return k0.apply(this,arguments)}})();
/* the Cần row of a route card (kit j63 data-kneed) + its own failure line in Mất */
(function(){const c0=cardH;cardH=function(a,i){if(!a||!a.rt)return c0.apply(this,arguments);let h=c0.call(this,Object.assign({},a,{t:a.lock?"":a.t}),i);
 try{if(a.lock&&a.t)h=h.replace(/<p><\/p>/,`<p>${a.t}</p>`);const L=kaTimeNeeds(cardCost(a),a.c&&a.c.bac<0?-a.c.bac:0);if(a.done)L.push({t:"chưa làm trong tuần này",ok:false});L.push(...a.rtNeed);
  h=h.replace(/^<button( data-kneed="[^"]*")?/,`<button${kaNeedAttr(L)}`);
  if(a.lx){const nm=effList(fmt(a.l||{})||"không mất gì","r");const lx=effList([fmt(a.l||{}),a.lx].filter(Boolean),"r");if(h.includes(nm))h=h.replace(nm,lx)}}catch(e){console.error(e)}return h}})();
/* ---------- dialogs (PEND: survive save / load; full act cards, not hidden: owner rule for route choices) ---------- */
function rtPush(id,pp){const d=mkP(id,pp);if(!d)return;Q.push({t:d.ti,h:d.t,opts:d.o,stage:d.stage,headArt:d.headArt,optLayout:"rows",showOut:true,pid:d.pid,pp:d.pp});if(!window.__bot)try{showModal()}catch(e){}}
function rtX(o,thanh,hong,kem){const j=t=>String(t||"").split(" · ").join(" — ");return `${o>=100?"Chắc cy":word(o)} · thành: ${thanh}${o<100?` · hỏng: ${j(hong)||"không mất gì"}`:""}${kem?` · kèm: ${kem}`:""}`}
function rtOpt(n,fx,x,go){return{n,fx:fx||{},x,go,showOut:true}}
(function(){const d0=deserQ;deserQ=function(L){const out=d0.apply(this,arguments);try{out.forEach(q=>{if(q.pid&&/^rt/.test(q.pid)){const d=mkP(q.pid,q.pp);if(d){q.t=d.ti;q.stage=d.stage;q.headArt=d.headArt;q.optLayout="rows";q.showOut=true}}})}catch(e){}return out}})();
PEND.rtBm=pp=>{const T=S&&S.rt;const v=RV(pp.v);const B=T&&T.bm;if(!v||!v.alive||!B)return null;const m=manById(B.mid);const n=B.n;const ev=typeof evG==="function"?evG(v,S):2;
 const oA=od(30+S.tamco/3+(evG?evG(S,v)*8:0)-ev*4);
 return{ti:"Bị nắm thóp",t:`<p>${rtVn(v)} cho người gọi ngươi ra sau hành lang: «Chuyện của muội với ${m?m.name:"người kia"}, tỷ biết cả. Mỗi tháng ${n} lượng bạc, tỷ sẽ quên.»</p><p class="past">Nàng nắm ${ev} chứng cứ về ngươi.</p>`,
  stage:[v],headArt:{src:RT_ART.don,label:"Uy hiếp"},o:[
  rtOpt(`Nộp ${n} lượng bạc`,{bac:-n},rtX(100,`nàng im lặng tháng này`,"","tháng sau nàng lại đòi"),()=>{B.k++;B.paid=S.turn;rtHeat(-3);log(`Ngươi đưa ${n} lượng bạc cho ${v.name}.`)}),
  rtOpt("Làm việc cho nàng",{...BAL.route.bmWork},rtX(100,"nàng im lặng · đổi lại ngươi nói giúp nàng trước mặt Hoàng thượng","",`${v.name} Sủng +${BAL.route.bmWorkSung} · Hoàng thượng nghi ngươi kết bè`),()=>{v.sung=cl((v.sung||0)+BAL.route.bmWorkSung,0,100);B.paid=S.turn;B.k++}),
  rtOpt("Ra tay trước: tố nàng",{},rtX(oA,`${v.name} rước họa trước khi kịp mở miệng · thoát cảnh uy hiếp`,"nàng tố ngươi ngay",`dùng chứng cứ ngươi nắm về nàng (${typeof evG==="function"?evG(S,v):0})`),()=>{if(roll(oA)){try{punish(v,"bị tố vu khống",2)}catch(e){}T.bm=null;rtEmo("vui",30,"thoát khỏi kẻ uy hiếp");log(`${v.name} bị phạt trước khi kịp mở miệng.`)}else{T.bm=null;rtReport(v,m||{name:"người kia",alive:false})}}),
  rtOpt("Mặc kệ nàng",{},rtX(od(35+S.danh/5),"nàng chỉ dọa suông","nàng tố giác ngươi"),()=>{T.bm=null;if(!roll(od(35+S.danh/5))&&m)rtReport(v,m);else log(`${v.name} không dám làm gì thêm.`)})]}};
PEND.rtPromise=pp=>{const m=manById(pp.m);if(!m||!S)return null;const T=rtS();
 const O=[rtOpt("Cùng y tính đường trốn",{},rtX(100,"mở lối Trốn khỏi cung · y là đồng lõa (đêm trốn: theo y ra cổng)","","bị bắt thì cả hai cùng chết"),()=>{if(!T.tc)T.tc={prep:{},since:S.turn};if(m.rw==="thị vệ")T.tc.prep.guard=1;log(`${rtMnm(m)} nắm tay ngươi: «Đợi ta lo xong đường đi.»`)})];
 if(m.rw==="vương gia")O.push(rtOpt("Xin y dâng sớ xin ban hôn",{},rtX(100,"mở thẻ «Xin ban hôn» (Rời cung hợp lệ)","","Hoàng thượng có thể đoán ra"),()=>{m.tinh=Math.max(m.tinh||0,60);log(`${m.name} hứa sẽ tìm dịp dâng sớ.`)}));
 O.push(rtOpt("Giữ như hiện giờ",{},rtX(100,"chưa đi đâu cả","",""),()=>{}));
 return{ti:"Lời hứa đêm khuya",t:`<p>${rtMnm(m)} khẽ nói: «Theo ta. Ta sẽ đưa nàng ra khỏi nơi này.»</p>`,stage:[S,m],headArt:{src:RT_ART.hen,label:"Mật ước"},o:O}};
PEND.rtKid=pp=>{const k=(S.kids||[]).find(x=>x.name===pp.k&&x.alive);if(!k)return null;const m=(S.men||[]).find(x=>x.id===k.tf);const r=m?m.rw:"người ngoài";const T=rtS();
 const oT=od(55+(S.doctor?15:0)),oB=od(45+S.tamco/4),oM=od(40+(m&&m.rw==="thái y"&&m.alive?30:0)+(S.doctor?10:0));
 return{ti:"Càng lớn càng giống",t:`<p>${k.name} càng lớn, mày mắt càng giống ${r==="người ngoài"?"một người ngoài":`một ${r}`} trong cung. Lời xì xào đã đến tai Hoàng thượng.</p>`,stage:[k],headArt:{src:RT_ART.con,label:"Lời đồn"},o:[
  rtOpt("Nhờ thái y làm chứng",{...BAL.route.kidTy},rtX(oT,"thái y bẩm: trẻ con đổi nét · lời đồn lắng xuống",`thái y ấp úng · Sủng ${BAL.route.kidTyFail.sung} · Lời ra tiếng vào +15`),()=>{if(roll(oT))log("Thái y bẩm trẻ con lớn lên đổi nét là thường. Lời đồn lắng xuống.");else{apply(BAL.route.kidTyFail);rtHeat(15);if(roll(BAL.route.kidTyAsk))rtNgSet(k,"emp",false)}}),
  rtOpt("Đổ cho giống bên ngoại",{},rtX(oB,"Hoàng thượng gật gù · lời đồn tan",`Hoàng thượng càng nghi · Sủng ${BAL.route.kidBlameFail.sung} · Lời ra tiếng vào +20`),()=>{if(roll(oB))log("Ngươi kể về người cậu bên ngoại; Hoàng thượng gật gù.");else{apply(BAL.route.kidBlameFail);rtHeat(20);if(roll(BAL.route.kidBlameAsk))rtNgSet(k,"emp",false)}}),
  rtOpt("Tự xin trích huyết nghiệm thân",{},rtX(100,"định ngày nghiệm máu (tuần sau) · có thời gian chuẩn bị","",m&&m.rw==="thái y"?"người ấy là thái y: có thể nhờ y":"máu không hòa thì tư thông bại lộ"),()=>rtNgSet(k,"emp",false))]}};
PEND.rtNpcEsc=pp=>{const v=RV(pp.v);if(!v||!v.alive||!v.rtEsc)return null;const T=rtS();
 return{ti:"Bóng người đổi áo",t:`<p>Trong bóng tối ở ${rtPlace(S.place)}, ngươi thấy ${rtVn(v)} đang khoác y phục cung nữ, tay ôm một tay nải nhỏ. Nàng định trốn khỏi cung.</p>`,stage:[v],headArt:{src:RT_ART.tc,label:"Trốn cung"},o:[
  rtOpt("Báo Cung Chính ti",{},rtX(100,`Danh +${BAL.route.npcReport.danh} · Thái hậu +${BAL.route.npcReport.th} · ${v.name} sa lưới`,"",`${v.name} và người thân của nàng oán ngươi`),()=>{apply(BAL.route.npcReport);v.rtEsc=null;oanAdd(v,S,BAL.route.oan.report);rtStat("npc_report");if(roll(BAL.route.escDeath))deathSentence(v,"trốn khỏi cung");else{v.out=true;log(`${v.name} bị đày vào lãnh cung.`)}}),
  rtOpt("Giúp nàng",{...BAL.route.npcHelp},rtX(100,`${v.name} thiện cảm +${BAL.route.npcHelpRel} · nàng chỉ ngươi đường đi và người gác cổng`,"","bị lộ thì ngươi cũng mang tội"),()=>{relAdd(S,v,BAL.route.npcHelpRel);if(!T.tc)T.tc={prep:{},since:S.turn};T.tc.prep.route=1;v.rtEsc.help=1;rtStat("npc_help")}),
  rtOpt("Uy hiếp nàng",{},rtX(100,`bạc +${BAL.route.npcThreat.bac} · chứng cứ về nàng +${BAL.route.threatEv}`,"",`${v.name} oán ngươi`),()=>{apply(BAL.route.npcThreat);evA(S,v,BAL.route.threatEv);oanAdd(v,S,BAL.route.oan.threat)}),
  rtOpt("Làm như không thấy",{},rtX(100,"không dính dáng","",""),()=>{})]}};
PEND.rtAn=pp=>{if(!S)return null;return{ti:"Một đời an nhiên",t:`<p>Đã ${Math.floor((S.turn-S.rt.ad.since)/12)} năm ngươi đóng cửa tĩnh dưỡng. Không ai hại ngươi, ngươi cũng không hại ai. Trong Sổ luân hồi, kiếp này đã có một kết an nhiên.</p>`,stage:[S],headArt:{src:RT_ART.an,label:"An nhiên"},o:[
  rtOpt("Khép kiếp này trong an nhiên",{},rtX(100,"kết thúc kiếp này","",""),()=>over("Một đời an nhiên",`${S.name} sống những năm còn lại trong cung, kinh kệ, hoa cỏ, không tranh không đoạt.`,"Một đời an nhiên trong cung",true)),
  rtOpt("Sống tiếp",{},rtX(100,"kiếp này còn tiếp","",""),()=>{})]}};
/* ---------- monthly: heat, blackmail, the child's face, NPC routes, fire ---------- */
function rtMonth(){if(!rtRoad()||!S.rt)return"";const T=S.rt;let ev="";
 const w=watcher();T.heat=cl(T.heat-RTC.decay-(w&&w.loyal>=BAL.loy.top?2:0),0,100);if(S.out)T.wasCold=1;
 /* someone hostile pieces it together (two-way: same as NPCs seeing NPCs) */
 const m=rtMan();if(m&&T.heat>=40&&!T.bm&&roll(T.heat/4)){const foes=liveRivals(true).filter(v=>aff(v,S)<0||(v.ghen||0)>=50);if(foes.length){const v=pick(foes);evA(v,S,BAL.eff.jroute.evRtMonth);rtCaughtBy(v,m,"gap")}}
 if(T.bm&&T.bm.since<S.turn&&T.bm.paid!==S.turn&&RV(T.bm.v)&&RV(T.bm.v).alive){if((T.bm.k||0)>=8){log(`${RV(T.bm.v).name} đã vơ đủ; nàng thôi đòi bạc.`);T.bm=null}else if(!rtGate(RV(T.bm.v),"uyhiep").ok){log(`${RV(T.bm.v).name} thôi đòi bạc của ngươi.`);T.bm=null}else rtPush("rtBm",{v:T.bm.v})}
 /* her children by the lover */
 for(const k of rtKidsAlive())if(k.tf&&!k.tfOk&&(k.age||0)>=3&&(k.age||0)<=12&&roll(RTC.kidRoll)){rtPush("rtKid",{k:k.name});break}
 /* quiet life */
 if(T.ad&&T.ad.on){apply(BAL.route.adMonth);for(const v of liveRivals(true))if(v.ghen)v.ghen=Math.max(0,v.ghen-4);if(S.turn-T.ad.since>=36&&S.duc>=BAL.route.anDuc&&!T.ad.harm&&!T.ad.off){T.ad.off=1;rtEnd("ad_an");rtPush("rtAn",{})}}
 /* fire this month (true event; the escape route can use it) */
 if(roll(RTC.fire)){T.fire=S.turn;ev+=`<span class="r">Đêm qua hỏa hoạn ở Ngự thiện phòng; khắp cung chạy loạn suốt nửa đêm.</span> `}
 ev+=rtNpcMonth();return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(S&&!S.dead)ev+=rtMonth()}catch(e){console.error(e)}return ev}})();
/* NPC consorts walk the same roads */
function rtNpcMonth(){let ev="";for(const v of liveRivals(false)){if(v.queen)continue;const kids=(v.kids||[]).filter(k=>k.alive).length;const weary=(v.sung||0)<20&&!kids&&S.turn>=12;
  if(!v.rtEsc&&(v.affair||v.out)&&weary&&roll(RTC.npcEsc)){v.rtEsc={since:S.turn};rtStat("npc_plan")}
  else if(v.rtEsc&&S.turn-v.rtEsc.since>=3&&roll(BAL.route.npcTry)){/* same odds as hers: base + the steps an NPC can gather (guard, route; her help = maid + papers) */const p=22+(v.rtEsc.help?11:0);if(roll(p)){v.alive=false;v.fled=1;v.rtEsc=null;rtStat("npc_fled");ev+=`<span class="r">${rtVn(v)} mất tích trong đêm; người ta nói nàng đã trốn khỏi cung.</span> `}
   else{v.rtEsc=null;rtStat("npc_caught");ev+=`<span class="r">${rtVn(v)} trốn khỏi cung không thành, bị bắt ở cổng Thần Vũ.</span> `;if(roll(BAL.route.escDeath))deathSentence(v,"trốn khỏi cung");else{v.out=true}}}
  if(v.out&&!kids&&(v.sung||0)<10&&roll(.8)){v.alive=false;v.nun=1;rtStat("npc_nun");ev+=`${rtVn(v)} dâng biểu xin xuất gia, được chuẩn. `}
  for(const k of (v.kids||[]))if(k.alive&&!k.tfOk&&(k.age||0)>=3&&roll(k.tf?1:.15)){ev+=rtNgNpcAuto(v,k);break}}
 return ev}
/* she can stumble on an NPC getting ready to flee (night, same place) */
function rtNpcMeet(){if(!rtRoad()||!rtNight()||Q.length)return;const T=rtS();for(const v of liveRivals(false)){if(!v.rtEsc||v.rtEsc.seen)continue;if(whereOf(v)===S.place&&S.place!=="home"&&roll(RTC.npcSee)){v.rtEsc.seen=1;try{if(typeof j95bPut==="function")j95bPut("v"+v.id,S.place,"scheme","lén chuẩn bị trốn khỏi cung (kế đã lập từ trước)","rtNpcEsc")}catch(e){}rtPush("rtNpcEsc",{v:v.id});return}}}
(function(){const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(S&&!S.dead&&!Q.length)rtNpcMeet()}catch(e){}return r}})();
/* the lover's child carries his blood (k.tf); same for NPC consorts */
(function(){const b0=birthP;birthP=function(p,fake){const tf=p===S?S.trueFather:p.trueFather;const n0=(p.kids||[]).length;const r=b0.apply(this,arguments);
 try{if(tf&&!fake){for(const k of (p.kids||[]).slice(n0)){k.tf=tf;rtStat("tf_kid")}if(p===S)S.trueFather=null;else p.trueFather=null}}catch(e){}return r}})();
/* quiet life: no tablet, less danger, harm breaks the vow */
(function(){const n0=nightCh;nightCh=function(p){p=p||S;if(p===S&&S.rt&&S.rt.ad&&S.rt.ad.on)return 0;return n0.apply(this,arguments)}})();
(function(){const d0=danger;danger=function(v,t){const d=d0.apply(this,arguments);return t===S&&S&&S.rt&&S.rt.ad&&S.rt.ad.on?Math.round(d*.6):d}})();
(function(){if(typeof doAct!=="function")return;const d0=doAct;doAct=function(i,k){const r=d0.apply(this,arguments);try{if(S.rt&&S.rt.ad&&S.rt.ad.on&&RT_HARM.includes(k))S.rt.ad.harm=(S.rt.ad.harm||0)+1}catch(e){}return r}})();
/* the end of a life: a lover's child never exposed = «Một đời giấu kín» */
(function(){const o0=over;over=function(h,t,fate){try{if(S&&!S.dead&&!(S.rt&&S.rt.exposed)&&rtKidsAlive().some(k=>k.tf))rtEnd("tt_kin")}catch(e){}return o0.apply(this,arguments)}})();
/* ---------- Mệnh truyện: the route chapters; Sổ luân hồi: endings met ---------- */
function rtRows(L){return typeof rows67==="function"?rows67(L):`<div class="pcb rows">${L.map(r=>`<div class="pcrow"><span>${r[0]}</span><span>${r[1]}</span></div>`).join("")}</div>`}
function rtStoryHTML(){if(!S||!S.rt||!S.rt.open)return"";const T=S.rt;const ck=(t,ok)=>[!!ok,t],ckL=L=>typeof kitChecks==="function"?kitChecks(L):L.map(y=>(y[0]?"✓ ":"✗ ")+y[1]).join("<br>");/* kit §46 kitChecks rows (tut-followups: no typed ✓/✗ lines) */let h="";const on=[T.tt&&"Tư tình",T.tc&&"Trốn khỏi cung",T.ad&&T.ad.on&&"Ẩn dật"].filter(Boolean);
 const rows=[["Lối riêng",on.length?on.join(" · "):"đã mở nhóm «Lối riêng» ở Hành sự"],["Lời ra tiếng vào",`${rtHeatW(T.heat)} (${T.heat}/100)`,T.heat>=60?"r":""]];
 const why=rtWeary();if(why.length)rows.push(["Cớ chán cung",why.join("; ")]);
 const m=rtMan();if(T.tt&&m)rows.push([`Tư tình · ${rtMnm(m)}`,ckL([ck("để ý y",1),ck("trao tín vật",T.tt.tok),ck(`hẹn gặp lén (${T.tt.meet||0} lần)`,T.tt.meet>=2),ck("đêm riêng",T.tt.night),ck("y hứa đưa ngươi đi",T.tt.st>=4)])]);
 if(T.bm){const v=RV(T.bm.v);if(v)rows.push(["Bị uy hiếp",`${rtVn(v)} đòi ${T.bm.n} lượng bạc mỗi tháng`,"r"])}
 if(T.tc){const P=T.tc.prep;rows.push(["Trốn khỏi cung",ckL([ck("đồng lõa gác cổng",P.guard),ck("cung nữ tâm phúc",P.maid),ck("người nhà đón",P.home),ck("dò đường",P.route),ck("yêu bài",P.pass),ck("y phục cung nữ",P.cloth),ck("thuốc giả chết",P.drug)])])}
 if(T.ad&&T.ad.on)rows.push(["Ẩn dật",`đã ${Math.floor((S.turn-T.ad.since)/12)} năm / 3 năm · Đức ${S.duc}/${BAL.route.anDuc} · ${T.ad.harm?"đã hại người: mất kết an nhiên":"chưa hại ai"}`]);
 const kt=rtKidsAlive().filter(k=>k.tf);if(kt.length)rows.push(["Con riêng",kt.map(k=>k.name).join(", ")+" (chỉ ngươi biết)"]);
 if(T.ends.length)rows.push(["Kết đã gặp kiếp này",T.ends.map(id=>RT_END[id][1]).join(" · "),"g"]);
 return h+rtRows(rows)}
(function(){if(typeof ktStoryHTML!=="function")return;const k0=ktStoryHTML;ktStoryHTML=function(){const h=k0.apply(this,arguments);try{
 if(rtRoad()&&ktSubGet("story",[{k:"now"},{k:"rank"},{k:"past"}])==="now"){const s=rtStoryHTML();if(s)return h+`<div class="rt-story">${s}</div>`}}catch(e){console.error(e)}return h}})();
(function(){if(typeof panel67!=="function"||typeof ktStoryHTML==="function")return;const p0=panel67;panel67=function(){const h=p0.apply(this,arguments);try{return h+rtStoryHTML()}catch(e){return h}}})();
(function(){const p0=renderPanel0;renderPanel0=function(){const r=p0.apply(this,arguments);try{if(tab==="story"&&rtRoad()&&typeof ktStoryHTML!=="function"){const el=$("panel");if(el&&!el.querySelector(".rt-story")){const s=rtStoryHTML();if(s)el.insertAdjacentHTML("beforeend",`<div class="rt-story">${s}</div>`)}}}catch(e){}return r}})();
function rtBookHTML(){const b=rtBook();const ids=Object.keys(RT_END);const met=ids.filter(id=>b[id]);
 const rows=[["Lối riêng",`<b>${met.length}/${ids.length}</b> kết đã gặp`,met.length?"g":""]].concat(met.map(id=>[`${RT_ROUTE[RT_END[id][0]]}`,`${RT_END[id][1]}${b[id].n>1?` · ${b[id].n} lần`:""}${b[id].first?` · lần đầu: ${b[id].first.who||""}${b[id].first.o?", "+b[id].first.o:""}`:""}`]));
 return `<h3>Lối riêng</h3>`+rtRows(rows)}
(function(){if(typeof pastHTML!=="function")return;const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{return h+rtBookHTML()}catch(e){return h}}})();
/* ================= TRÍCH HUYẾT NGHIỆM THÂN (owner 15/11): giọt máu hòa trong bát nước =================
   Ai đòi: Hoàng thượng nghi (lời đồn), Thái hậu, Hoàng hậu hay một phi tần cầm chứng cứ. Kết quả theo CHA THẬT (k.tf), nhưng bát nước
   có thể bị động tay: phèn (máu nào cũng hòa), dầu (máu nào cũng không hòa), đổi bát, mua chuộc thái y. Người chơi và phi tần NPC cùng luật:
   ngươi có thể bị tố (có tội hay bị vu), có thể tâu xin nghiệm con của phi tần khác (ngay thẳng hay bỏ dầu vu oan).
   S.rt.ng = {k: tên con, acc: "emp"|"th"|id phi tần, at: tuần nghiệm, oil: kẻ tố đã bỏ dầu, P:{alum,swap,bribe,spy}} */
function rtAccN(a){if(a==="emp")return"Hoàng thượng";if(a==="th")return"Thái hậu";const v=RV(a);return v?rtVn(v):"kẻ tố"}
function rtNgKid(){const T=S.rt;return T&&T.ng?(S.kids||[]).find(k=>k.name===T.ng.k&&k.alive)||null:null}
function rtNgSet(k,acc,oil){const T=rtS();if(T.ng||!k)return;const v=RV(acc);if(oil==null)oil=!!(v&&(netRx(v,/Xảo quyệt|Tâm/)||(v.tamco||0)>=60)&&roll(BAL.route.oil));
 T.ng={k:k.name,acc,at:wk()+1,oil:!!oil,P:{}};try{if(!window.__bot)rtMgBowl()}catch(e){}rtStat("ng_set");rtEmo("so",60,"sắp trích huyết nghiệm thân");
 log(`<span class="r">${rtAccN(acc)} truyền: tuần sau trích huyết nghiệm thân cho ${k.name} trước mặt lục cung.</span>`);rtRefresh()}
function rtNgDue(){const T=S.rt;if(!T||!T.ng||T.ng.held)return;if(!rtNgKid()){T.ng=null;return}if(wk()>=T.ng.at){T.ng.held=1;rtPush("rtNg",{})}}
function rtNgCards(){const T=S.rt;if(!T||!T.ng||T.ng.held)return[];const P=T.ng.P,k=rtNgKid();if(!k)return[];const A=[];const m=k.tf&&(S.men||[]).find(x=>x.id===k.tf&&x.alive);const tyLover=m&&m.rw==="thái y";
 const mk=(id,o)=>{if(P[id])return;o.id="ng_"+id;o.r=1;A.push(rtCard(o))};const mL=S.maid?S.maid.loyal:0;
 mk("bribe",{n:tyLover?`Nhờ ${rtMnm(m)} giữ bát nước`:"Mua chuộc thái y nghiệm máu",t:"Thái y bưng bát; bát nào đặt trước mặt Hoàng thượng là do y.",art:RT_ART.lo,c:{bac:tyLover?0:-120},o:od((tyLover?80:45)+S.tamco/5+rtDf().o),k:BAL.route.k.mk_bribe,
  x:"đến hôm nghiệm: máu hòa",lx:"thái y không dám nhận · bạc mất",kem:"lộ ra thì là gian lận: tội chồng tội",go:()=>{P.bribe=1}});
 mk("swap",{n:"Sai người đổi bát nước",t:"Đổi bát của kẻ tố bằng một bát nước giếng sạch.",art:RT_ART.lo,o:od(45+mL/3),k:BAL.route.k.mk_swap,need:[[`cung nữ thân cận một lòng (lòng ${balAb(BAL.loy.trust)}+, có ${mL})`,mL>=BAL.loy.trust]],
  x:"bát sạch: thuốc kẻ tố bỏ vào mất tác dụng",lx:"bị bắt quả tang · Lời ra tiếng vào +20",kem:"hôm nghiệm phải ra tay lúc không ai nhìn (trò nhỏ) · bát sạch thì máu hòa hay không là theo cha thật",go:()=>{P.swap=1},fail:()=>{rtHeat(20)}});
 mk("alum",{n:"Lén bỏ phèn vào bát",t:"Một nhúm phèn chua: máu nào rơi vào cũng hòa.",art:RT_ART.lo,c:{...BAL.route.alum},o:od(50+S.tamco/4),k:BAL.route.k.mk_alum,x:"đến hôm nghiệm: máu hòa",lx:"bị thấy · Lời ra tiếng vào +20",kem:"hôm nghiệm phải ra tay lúc không ai nhìn (trò nhỏ) · thái y nghiệm lại bằng bát mới thì phèn vô dụng",go:()=>{P.alum=1},fail:()=>{rtHeat(20)}});
 mk("spy",{n:"Dò xem bát nước của kẻ tố",t:"Sai tai mắt theo dõi người chuẩn bị bát nước.",art:RT_ART.don,c:{...BAL.route.spy},o:od(30+(S.mat||0)*10),k:BAL.route.k.mk_spy,x:"biết kẻ tố có động tay vào bát hay không",lx:"không dò được gì",go:()=>{P.spy=1;if(T.ng.oil){T.ng.saw=1;log(`<span class="g">Tai mắt thấy người của ${rtAccN(T.ng.acc)} nhỏ dầu vào bát nước.</span>`)}else log("Tai mắt báo: bát nước chưa ai động đến.")}});
 return A}
/* the ceremony */
PEND.rtNg=pp=>{const T=S&&S.rt;const k=rtNgKid();if(!T||!T.ng||!k)return null;const N=T.ng;const v=RV(N.acc);
 const oV=od(45+(S.mat||0)*5+S.tamco/5);
 const O=[rtOpt("Bằng lòng nghiệm máu",{},`${word(rtNgEst())} · thành: máu hòa · ngươi trong sạch · kẻ tố rước họa vào thân · hỏng: máu không hòa — ngươi${k.tf?"":" bị vu oan và"} bị xử như tư thông`,()=>rtNgRun(false))];
 if(N.saw&&v)O.push(rtOpt(`Tố ngược ${v.name} gian lận`,{},rtX(oV,`bát dầu bị vạch trần · ${v.name} rước họa vào thân · khỏi phải nghiệm`,"không chứng được · vẫn phải nghiệm"),()=>{if(roll(oV))rtNgWin(true);else rtNgRun(false)}));
 O.push(rtOpt("Nhận tội",{},rtX(100,"giữ được mạng (lãnh cung)","",`${k.name} bị đưa ra khỏi cung${k.tf?" · người ấy bị xử trảm":""}`),()=>rtNgLose(true,!k.tf)));
 return{ti:"Trích huyết nghiệm thân",t:`<p>Trước mặt Hoàng thượng và lục cung, thái y bưng lên một bát nước trong. ${rtAccN(N.acc)} là người tâu xin. Một giọt máu của Hoàng thượng, một giọt máu của ${k.name}: hòa thì là cốt nhục, không hòa thì là tội khi quân.</p>`,
  stage:[k].concat(v?[v]:[]),headArt:{src:RT_ART.con,label:"Nghiệm thân"},o:O}};
/* her own estimate (what she knows: her preps, what her spies saw; a rival accuser may have tampered ~1 in 3) */
function rtNgEst(){const T=S.rt,N=T.ng,P=N.P,k=rtNgKid();if(!k)return 50;const pc=((P.alum||P.swap)?rtMgO(rtNgN())/100:1)*(P.bribe?(100-BAL.route.cheat)/100:1);
 let pm;if(P.bribe||P.alum)pm=1;else{const oil=N.saw?1:(P.spy?0:(RV(N.acc)?BAL.route.oil/100:0));pm=P.swap?(k.tf?0:1):(k.tf?0:1-oil)}return cl(Math.round(pc*pm*100),5,95)}
function rtNgShown(fresh){const T=S.rt,N=T.ng,P=N.P,k=rtNgKid();const truth=!k.tf;if(fresh)return truth;if(P.bribe||P.alum)return true;if(N.oil&&!P.swap)return false;return truth}
function rtAfter(){try{if(!S.dead){showModal();render()}}catch(e){}}
function rtNgN(){const N=S.rt.ng;return 3+(RV(N.acc)?1:0)}
function rtNgRun(fresh){const T=S.rt,N=T&&T.ng;if(!N)return;const P=N.P,k=rtNgKid();if(!k){T.ng=null;return}
 if(!fresh&&(P.alum||P.swap)&&N.mg==null){rtNgSleight(P.alum?"alum":"swap",rtNgN(),ok=>{N.mg=ok?1:0;rtStat(ok?"mg_ok":"mg_fail");rtNgRun(false);rtAfter()});return}
 rtStat("ng_run");
 if(!fresh){const caught=((P.alum||P.swap)&&N.mg===0)||(P.bribe&&roll(BAL.route.cheat));if(caught){rtStat("ng_cheat");log(`<span class="r">Có người tâu: bát nước của ngươi đã bị động tay.</span>`);rtNgLose(false,!k.tf,"gian lận khi nghiệm thân");return}}
 const ok=rtNgShown(fresh);
 rtNgScene(ok,k.name,()=>{if(ok){if(k.tf)rtEnd("tt_hoa");rtNgWin(false)}else{log(`<span class="r">Hai giọt máu tách rời trong bát nước.</span>`);if(!fresh&&!N.re){N.re=1;rtPush("rtNg2",{})}else rtNgLose(false,!k.tf)}rtAfter()})}
PEND.rtNg2=pp=>{const T=S&&S.rt;const k=rtNgKid();if(!T||!T.ng||!k)return null;const oR=od(38+(S.th||0)/3+(S.doctor?15:0));
 return{ti:"Máu không hòa",t:`<p>Cả điện lặng ngắt. Hai giọt máu nằm riêng hai góc bát. Hoàng thượng chưa nói gì; mọi ánh mắt đổ dồn vào ngươi.</p>`,stage:[k],headArt:{src:RT_ART.bat,label:"Nghiệm thân"},o:[
  rtOpt("Xin thái y nghiệm lại bằng bát nước mới",{},rtX(oR,"nghiệm lại bằng bát sạch: kết quả theo cha thật","Hoàng thượng không cho nghiệm lại · bị xử tội",k.tf?"bát sạch thì máu vẫn không hòa":""),()=>{if(roll(oR))rtNgRun(true);else rtNgLose(false,!k.tf)}),
  rtOpt("Nhận tội",{},rtX(100,"giữ được mạng (lãnh cung)","",`${k.name} bị đưa ra khỏi cung`),()=>rtNgLose(true,!k.tf)),
  rtOpt("Kêu oan rồi cúi đầu chịu tội",{},rtX(100,"","",`bị xử như tư thông: ban chết hay lãnh cung · ${k.name} bị đưa ra khỏi cung`),()=>rtNgLose(false,!k.tf))]}};
function rtNgWin(vach){const T=S.rt,N=T.ng,k=rtNgKid();const v=RV(N.acc);if(k)k.tfOk=1;T.ng=null;apply(BAL.route.ngWin);rtHeat(-20);rtEmo("vui",50,"giọt máu hòa");rtStat(vach?"ng_vach":"ng_win");
 if(vach)rtEnd("ng_vach");log(`<span class="g">${vach?"Bát nước có dầu bị vạch trần trước điện.":"Hai giọt máu hòa làm một."} Hoàng thượng ôm ${k?k.name:"con"} vào lòng. Sủng +${BAL.route.ngWin.sung} · Danh +${BAL.route.ngWin.danh}.</span>`);
 if(v&&v.alive){oanAdd(v,S,BAL.route.oan.ngWin);if(vach||N.oil)deathSentence(v,"gian lận khi trích huyết nghiệm thân");else punish(v,"vu cáo phi tần",2)}}
function rtNgLose(confess,innocent,why){const T=S.rt,N=T.ng,k=rtNgKid();const m=k&&k.tf&&(S.men||[]).find(x=>x.id===k.tf&&x.alive);T.ng=null;rtStat(innocent?"ng_oan":"ng_lose");
 rtEnd(innocent?"ng_oan":"tt_lo");if(!innocent)T.exposed=1;if(m){m.alive=false;log(`<span class="r">${m.name} bị xử trảm.</span>`)}
 if(k){k.alive=false;k.gone=1;log(`<span class="r">${k.name} bị tước danh phận hoàng tự, đưa ra khỏi cung giao người nuôi.</span>`)}T.tt=null;T.bm=null;
 if(confess)cold(innocent?"Nhận tội tư thông (oan)":"Nhận tội tư thông");else if(roll(BAL.route.ngDeath))deathSentence(why?`Bị ban chết vì ${why}`:"Bị ban chết vì con không phải cốt nhục hoàng gia");else cold(why||"Con không phải cốt nhục hoàng gia")}
/* NPC mothers: the same bowl (alum by the mother, oil by a framer) */
function rtNgNpcAuto(v,k){const truth=!k.tf;const alum=!truth&&((v.tamco||0)>=55||roll(BAL.route.npcAlum));const foe0=liveRivals(false).find(x=>x!==v&&aff(x,v)<-30&&netRx(x,/Xảo quyệt/));const foe=foe0&&rtGateT(foe0,v,"frame").ok?foe0:null;
 if(truth&&!foe)return"";const oil=!!foe&&roll(BAL.route.npcOil);const shown=alum?true:oil?false:truth;k.tfOk=1;rtStat("npc_ng");const seen=(S.mat||0)>=2;
 if(shown){if(!truth)rtStat("npc_ng_hoa");return seen?`Nghe nói ${rtVn(v)} bị tâu xin nghiệm máu cho ${k.name}; máu hòa, nàng vô sự. `:""}
 k.alive=false;k.gone=1;rtStat(truth?"npc_ng_oan":"npc_ng_lo");const lov=k.tf&&manById(k.tf);if(lov)lov.alive=false;if(roll(BAL.route.ngDeath))deathSentence(v,"con không phải cốt nhục hoàng gia");else v.out=true;
 return `<span class="r">${rtVn(v)}: trích huyết nghiệm thân, máu ${k.name} không hòa. Nàng bị trị tội.</span>${truth&&(S.mat||0)>=4?` Tai mắt báo: bát nước đã bị ${foe.name} nhỏ dầu.`:""} `}
/* she demands the test on another consort's child (honest, or with oil = a frame-up) */
function rtNgNpcCards(){const A=[];if(S.out)return A;for(const v of liveRivals(true)){const k=(v.kids||[]).find(x=>x.alive&&!x.tfOk&&(x.age||0)>=1);if(!k)continue;const ev=typeof evG==="function"?evG(S,v):0;if(ev<2&&!v.kidRumor)continue;
  A.push(rtCard({id:"ngn_"+v.id,n:`Tâu xin nghiệm thân ${k.name}`,t:`Ngươi nắm ${ev} chứng cứ về ${rtVn(v)}.`,art:RT_ART.con,k:BAL.route.k.ngn_,need:[[`chứng cứ về ${v.name} (có ${ev}/2)`,ev>=2]],x:"mở buổi trích huyết nghiệm thân (chọn cách ở bước sau)",kem:"máu hòa thì ngươi mang tội vu cáo",go:()=>rtPush("rtNgNpc",{v:v.id,k:k.name})}));break}
 return A}
PEND.rtNgNpc=pp=>{const v=RV(pp.v);const k=v&&(v.kids||[]).find(x=>x.name===pp.k&&x.alive);if(!v||!k)return null;const oF=rtMgO(4);
 const fin=(shown)=>{k.tfOk=1;if(shown){apply(BAL.route.demandFail);oanAdd(v,S,BAL.route.oan.demand);punish(S,"vu cáo phi tần",1);log(`<span class="r">Máu hòa. ${v.name} quỳ khóc kêu oan; ngươi mang tội vu cáo.</span>`)}
  else{apply(BAL.route.demandWin);k.alive=false;k.gone=1;const lov=k.tf&&manById(k.tf);if(lov)lov.alive=false;log(`<span class="r">Máu ${k.name} không hòa. ${rtVn(v)} bị trị tội.</span>`);if(roll(BAL.route.ngDeath))deathSentence(v,"con không phải cốt nhục hoàng gia");else v.out=true}};
 const alum=!!k.tf&&((v.tamco||0)>=55||roll(BAL.route.npcAlum));
 return{ti:"Tâu xin nghiệm thân",t:`<p>Ngươi quỳ trước Hoàng thượng, tâu rằng ${k.name} không phải cốt nhục hoàng gia, xin trích huyết nghiệm thân.</p>`,stage:[v,k],headArt:{src:RT_ART.con,label:"Nghiệm thân"},o:[
  rtOpt("Nghiệm ngay thẳng",{},`${word(cl(35+(typeof evG==="function"?evG(S,v):0)*8,10,80))} · thành: Danh +${BAL.route.demandWin.danh} · máu không hòa · ${v.name} rước họa vào thân · hỏng: máu hòa — ngươi mang tội vu cáo · kèm: nàng cũng có thể động tay vào bát`,()=>{rtStat("ng_demand");const sh=alum?true:!k.tf;rtNgScene(sh,k.name,()=>{fin(sh);rtAfter()})}),
  rtOpt("Sai người nhỏ dầu vào bát",{...BAL.route.frame},rtX(oF,`máu không hòa dù ${k.name} là con ai · ${v.name} rước họa vào thân`,"bị bắt quả tang gian lận · ngươi bị trị tội","vu oan người vô tội là ác nghiệp"),()=>{rtStat("ng_frame");rtNgSleight("oil",4,ok=>{if(ok){if(!k.tf)rtEnd("ng_vu");rtNgScene(false,k.name,()=>{fin(false);rtAfter()})}else{k.tfOk=1;oanAdd(v,S,BAL.route.oan.frame);fall(S,"gian lận khi trích huyết nghiệm thân");rtAfter()}})}),
  rtOpt("Thôi",{},rtX(100,"không tâu nữa","",""),()=>{})]}};
RT_END.ng_vu=["tt","Vu oan người khác qua bát nước"];
(function(){const r0=rtNgCards;rtNgCards=function(){let A=r0.apply(this,arguments);try{if(rtS().open)A=A.concat(rtNgNpcCards())}catch(e){}return A}})();
/* rivals may frame her innocent child (rare; two-way) */
(function(){const m0=rtMonth;rtMonth=function(){let ev=m0.apply(this,arguments);try{const T=S.rt;if(T&&!T.ng&&!S.out){const k=rtKidsAlive().find(x=>!x.tfOk&&(x.age||0)>=2);
 const f=k&&liveRivals(true).find(v=>netRx(v,/Xảo quyệt/)&&typeof danger==="function"&&danger(v,S)>=60);if(k&&f&&roll(k.tf?2:.6)&&rtGate(f,"accuse").ok){rtStat("ng_frameMe");rtNgSet(k,f.id,!k.tf?roll(BAL.route.frameOil):null)}}}catch(e){}return ev}})();
/* ---------- NGHIỆM THÂN on the shared mini-game frame (j82 kg82Open / kitGameFrame / kitGameResult, KIT §13) ----------
   1) rtNgSleight(kind, n, cb(ok)): the tampering mini-game — the watchers' gaze cones sweep the hall; tap «Ra tay» while no gaze is on the
      bowl. 3 hồi, need 2. Speed and cone width from the number of watchers, her Tâm cơ and Tai mắt. «Để Tâm cơ quyết định» = one roll with
      the same odds word. Bots and reduced motion get the roll (reduced motion may still play: the cones then move in steps).
   2) rtNgScene(shown, kidName, cb): the bowl — two drops fall, then slowly merge or drift apart; reduced motion = the final frame only.
   Board = the existing painted table (mg-huong-bg); the bowl is a painted sprite (img/kit/mg-nghiem-bowl.webp); drops, ripples and cones are live marks. */
function rtMgOn(){return !window.__bot&&typeof kg82Open==="function"&&!!document.getElementById("ov")}
function rtMgO(n){return od(62+S.tamco/4+(S.mat||0)*3-n*6+rtDf().o)}
function rtMgDraw(g,W,H,t,cones,hit,flash){try{kg82Bg(g,W,H,"huong",.1,1)}catch(e){g.fillStyle="#efe2c8";g.fillRect(0,0,W,H)}
 const bx=W/2,by=H*.72,bw=Math.min(W*.34,170);
 for(const c of cones){const a=c.a;g.save();g.translate(c.x,c.y);g.rotate(a);const L=H*1.1;const gr=g.createLinearGradient(0,0,0,L);gr.addColorStop(0,"rgba(255,236,170,.55)");gr.addColorStop(1,"rgba(255,236,170,0)");
  g.fillStyle=c.on?"rgba(200,60,40,.28)":gr;g.beginPath();g.moveTo(0,0);g.lineTo(Math.tan(c.w)*L,L);g.lineTo(-Math.tan(c.w)*L,L);g.closePath();g.fill();g.restore();
const im=rtMgFig();if(im&&im.complete&&im.naturalWidth){const h=H*.2,w=h*im.naturalWidth/im.naturalHeight;g.drawImage(im,c.x-w/2,c.y-h*.85,w,h)}}
 /* the bowl: the painted porcelain bowl (img/kit/mg-nghiem-bowl.webp, Magnific gpt-2-6) — water centre at (.5,.38) of the sprite, water
    ellipse ≈ .86 of its width; until it has loaded (or offline without it) the old live-drawn bowl stands in */
 const bi=rtMgBowl();if(bi&&bi.complete&&bi.naturalWidth){const sw=Math.min(W*.44,250),sh=sw*bi.naturalHeight/bi.naturalWidth;g.drawImage(bi,bx-sw/2,by-sh*.38,sw,sh);if(flash){g.fillStyle=flash;g.fillRect(0,0,W,H)}return{bx,by,bw:sw*.86}}
 g.save();g.fillStyle="rgba(250,248,240,.96)";g.strokeStyle="#3d5f8a";g.lineWidth=2.5;g.beginPath();g.ellipse(bx,by,bw/2,bw*.16,0,0,Math.PI*2);g.fill();g.stroke();
 g.fillStyle="rgba(170,205,215,.75)";g.beginPath();g.ellipse(bx,by+2,bw*.44,bw*.12,0,0,Math.PI*2);g.fill();
 g.fillStyle="rgba(250,248,240,.96)";g.beginPath();g.moveTo(bx-bw/2,by);g.quadraticCurveTo(bx,by+bw*.62,bx+bw/2,by);g.quadraticCurveTo(bx,by+bw*.2,bx-bw/2,by);g.fill();g.stroke();g.restore();
 if(flash){g.fillStyle=flash;g.fillRect(0,0,W,H)}return{bx,by,bw}}
let RT_MGBOWL=null;function rtMgBowl(){if(!RT_MGBOWL){RT_MGBOWL=new Image();RT_MGBOWL.decoding="async";RT_MGBOWL.src="img/kit/mg-nghiem-bowl.webp"}return RT_MGBOWL}
let RT_MGFIG=null;function rtMgFig(){if(!RT_MGFIG){RT_MGFIG=new Image();RT_MGFIG.src="img/kit/unknown-fig-f.webp"}return RT_MGFIG}
function rtNgSleight(kind,n,cb){const o=rtMgO(n);if(!rtMgOn()){cb(roll(o));return}
 const what={alum:"bỏ phèn vào bát",swap:"đổi bát nước",oil:"nhỏ dầu vào bát"}[kind]||"ra tay";
 const d=kg82Open({art:"Nghiệm thân",title:`Lén ${what}`,how:`Ánh mắt của ${n} người quét qua lại trong điện. Chạm «Ra tay» lúc không ánh mắt nào chạm vào bát. Ba hồi, cần thành hai.`});if(!d){cb(roll(o));return}
 kg82Set("score","0/2");kg82Set("round","1/3");kg82Set("time","–");const box=kg82Box();
 box.innerHTML=`<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu</button><button class="${kg82Btn(true)}" id="kg82skip">Để Tâm cơ quyết định<small>${word(o)}</small></button></div>`;
 const done=ok=>{const res=typeof kitGameResult==="function"?kitGameResult({parts:[["Ra tay",ok?"không ai thấy":"bị nhìn thấy"],["Người canh",`${n} người`]],note:ok?"Bát nước đã như ý ngươi.":"Có người đã thấy tay ngươi động vào bát."}):"";
  kg82ShowRes(res+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`,!!ok);$("kg82ok").onclick=()=>{kg82Close();cb(ok)}};/* merge-train-4: result sound (result-sfx) */
 $("kg82skip").onclick=()=>{rtStat("mg_skip");done(roll(o))};
 $("kg82go").onclick=()=>{box.innerHTML="";const C=kg82Canvas(box,.75,440);const {g,W,H}=C;const red=typeof kmReduced==="function"&&kmReduced();
  const sp=(.75+n*.18-S.tamco/220)*(1+rtDf().h-1),wd=(.2+n*.02-(S.mat||0)*.012);
  const cones=Array.from({length:n},(_,i)=>({x:W*(i+1)/(n+1),y:H*.2,ph:Math.random()*6,sp:sp*(.8+Math.random()*.4),w:Math.max(.12,wd),a:0,on:false}));
  let hoi=1,win=0,t0=performance.now(),raf=0,lock=0;const BX=W/2,BY=H*.72;
  const upd=t=>{for(const c of cones){const tt=red?Math.floor(t*2)/2:t;c.a=Math.sin(tt*c.sp+c.ph)*.9;const ang=Math.atan2(-(BX-c.x),BY-c.y);c.on=Math.abs(c.a-ang)<c.w}};
  const frame=now=>{const t=(now-t0)/1000;upd(t);rtMgDraw(g,W,H,t,cones);kg82Set("time",`${Math.max(0,Math.ceil(6-t))} giây`);if(t>=6&&!lock){step(false);return}raf=requestAnimationFrame(frame)};
  const step=ok=>{lock=1;cancelAnimationFrame(raf);if(ok)win++;rtMgDraw(g,W,H,0,cones,0,ok?"rgba(60,140,80,.18)":"rgba(170,40,30,.22)");kg82Set("score",`${Math.min(win,2)}/2`);
   if(win>=2||hoi-win>=2||hoi>=3){setTimeout(()=>done(win>=2),500);return}hoi++;kg82Set("round",`${hoi}/3`);setTimeout(()=>{lock=0;t0=performance.now();raf=requestAnimationFrame(frame)},600)};
  const act=document.createElement("div");act.className="kg82act";act.innerHTML=`<button class="${kg82Btn()}" id="kg82tap">Ra tay</button>`;box.appendChild(act);
  $("kg82tap").onclick=()=>{if(lock)return;upd((performance.now()-t0)/1000);step(!cones.some(c=>c.on))};
  KG82.run={stop:()=>cancelAnimationFrame(raf)};raf=requestAnimationFrame(frame)}}
function rtNgScene(shown,kn,cb){if(!rtMgOn()){cb();return}
 const d=kg82Open({art:"Nghiệm thân",title:"Giọt máu trong bát nước",how:`Một giọt máu của Hoàng thượng, một giọt máu của ${kn}.`});if(!d){cb();return}
 kg82Set("score","–");kg82Set("round","–");kg82Set("time","–");const box=kg82Box();const C=kg82Canvas(box,.75,440);const {g,W,H}=C;const red=typeof kmReduced==="function"&&kmReduced();
 const T=4.2;let raf=0,t0=performance.now();
 const draw=t=>{const B=rtMgDraw(g,W,H,t,[]);const ly=B.by+2;const fall=Math.min(1,t/1.2);
  const sep=t<1.4?B.bw*.16:shown?B.bw*.16*Math.max(0,1-(t-1.4)/2.2):B.bw*(.16+.14*Math.min(1,(t-1.4)/2.2));
  for(const [i,s] of [[-1,"#9a1f1a"],[1,"#b02a22"]]){const x=B.bx+i*sep,y=t<1.2?H*.15+(ly-H*.15)*fall*fall:ly;g.fillStyle=s;g.globalAlpha=.9;g.beginPath();
   if(t<1.2){g.ellipse(x,y,4,6,0,0,Math.PI*2)}else{const r=5+Math.min(6,(t-1.2)*3);g.ellipse(x,y,r,r*.35,0,0,Math.PI*2)}g.fill();g.globalAlpha=1;
   if(t>=1.2&&t<2.4){g.strokeStyle=`rgba(255,255,255,${.6-(t-1.2)/2})`;g.beginPath();g.ellipse(x,y,8+(t-1.2)*20,(8+(t-1.2)*20)*.3,0,0,Math.PI*2);g.stroke()}}
  if(t>=T)try{kg82Lbl(g,shown?"Hai giọt máu hòa làm một":"Hai giọt máu tách rời",W/2,H*.12,W*.9,false)}catch(e){}};
 const end=()=>{kg82Set("time","đã hết");const res=typeof kitGameResult==="function"?kitGameResult({parts:[["Giọt máu",shown?"hòa làm một":"tách rời"]],note:shown?`${kn} là cốt nhục hoàng gia.`:"Cả điện lặng ngắt."}):"";
  const r=document.createElement("div");r.innerHTML=res+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`;box.appendChild(r);$("kg82ok").onclick=()=>{kg82Close();cb()}};
 if(red){draw(T);const bi=rtMgBowl();if(!bi.complete)bi.addEventListener("load",()=>{try{draw(T)}catch(e){}},{once:true});end();return}
 const fr=now=>{const t=(now-t0)/1000;draw(Math.min(t,T));if(t<T)raf=requestAnimationFrame(fr);else end()};KG82.run={stop:()=>cancelAnimationFrame(raf)};raf=requestAnimationFrame(fr)}
