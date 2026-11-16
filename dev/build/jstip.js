/* ================= jstip: BỔNG LỘC = REAL GOODS + NỘI VỤ PHỦ CẮT XÉN (owner 15/11 17:30Z + 17:33Z, review/econ-stipend) =================
   Notes + numbers: dev/ECONOMY.md §6–§7. ONE SOURCE: every number in BAL.stip (below, read through BAL like every jecon knob).
   1. GOODS (17:30Z): the monthly goods of her rank are real items in p.inv (picture j98 itemArt, grade, use): cloth (may áo / tặng / bán),
      tea (pha mời khách in a visit, uống, tặng), coal in winter (đốt sưởi: Sức), rouge, bird's nest, ginseng. NPCs get the same goods
      (kept to BAL.stip.npcKeep entries, older ones are used up). Her payout opens the kitReward chest "Bổng lộc tháng …".
      Items issued by Nội vụ phủ carry from:"noivu" — Nội vụ phủ buys its own issue back cheaply (BAL.stip.resell).
   2. SKIMMING (17:33Z): stipSkim(p) — a monthly chance ONLY for real, visible causes: low / falling Sủng, a recent fault (cấm túc, caught in a
      scheme, demoted), a superior (rank ≥ BAL.stip.supRank, above her) with oán ≥ BAL.stip.oan, the greedy Nội vụ phủ eunuch not tipped,
      her own cung nữ's low loyalty. Prevented by: Sủng ≥ BAL.stip.safeSung, a tip within BAL.stip.tipM months, an ally among the eunuchs
      (her own eunuch loyal ≥ BAL.stip.allyLoyal, or BAL.stip.allyTips tips). Skimmed: silver (BAL.stip.cutSmall / cutBig of the bổng),
      goods one step worse (BAL.stip.down: gấm→lụa, lụa/vải→vải thô hàng kém, trà→trà mốc, than→than đen and one basket less, son phấn /
      yến / sâm missing). Not stacked on the old Hoàng hậu "khất bổng" (j20 payCuts, cutPay −30 %): that month the order IS the cause and
      no second silver cut is taken. Her event (kitEventDp person dialog, event cost mode, the reason as Gợi ý): Nhịn / Đút bạc cho thái giám /
      Sai cung nữ đi đòi / Tố lên Hoàng hậu (or Thái hậu when the Empress is behind it or is the hostile one) / Ghi nhớ để trả thù sau.
      NPCs: the same rule, their answer by their purse / patron, news through newsAdd (Tai mắt decides what she hears).
   3. goodsGive(p, keys, {from, title, sub, kind}) — THE way any text that gives goods gives a real item (LUẬT SỬA CẢ NHÓM, dev/test/goods-scan.py):
      used by EV6 events (STIP_EV table), j67 (beat/option/end field gi), j71 festival prizes (STIP_FPRIZE), j72 favours. ================= */
Object.assign(BAL,{stip:{
 goods:[[["vaibong",1],["tragoi",1]],[["vaibong",1],["tragoi",1]],[["luahang",1],["tragoi",1]],[["luahang",1],["trahop",1],["sonphan",1]],
  [["luahang",2],["trahop",1],["sonphan",1]],[["gamto",1],["luahang",1],["trahop",1],["sonphan",1]],[["gamto",1],["luahang",1],["trahop",2],["sonphan",1],["yensao",1]],
  [["gamto",2],["trahop",2],["sonphan",1],["yensao",1],["nhansam",1]]],
 coal:[1,1,1,1,2,2,2,3],coldGoods:[["vaitho",1]],coldCoal:1,npcKeep:4,resell:40,
 down:{bangda:"bangvun",gamto:"luahang",luahang:"vaitho",vaibong:"vaitho",trahop:"tramoc",tragoi:"tramoc",thanbac:"thanden",sonphan:null,yensao:null,nhansam:null},
 w:{sung:30,fault:35,sup:40,eun:25,maid:20},cap:80,meekAdd:10,spiteAdd:15,
 lowSung:15,dropSung:10,faultM:2,supRank:4,oan:30,safeSung:55,tipM:3,allyLoyal:75,allyTips:3,maidLoyal:35,
 cutSmall:.15,cutBig:.25,tip:[8,10,12,15,18,22,26,30],greedy:50,punishM:6,
 askBase:30,reportBase:25,remember:20}});
/* ---------- the items (art: dev/art/ITEM_ART.md §3, 16 icons gpt-2-6) ---------- */
(function(){const N={
 vaibong:{n:"Vải bông",kd:"Vải vóc",d:"May áo thường: Sắc +1 trong 3 tháng · tặng, bán được",pr:8,rk:0,dr:1,tg:["rv"]},
 vaitho:{n:"Vải thô (hàng kém)",kd:"Vải vóc",d:"Hàng kém Nội vụ phủ phát: may áo cho cung nữ thân tín, lòng +3",pr:2,use:{maid:3},tg:[]},
 tragoi:{n:"Trà Long Tĩnh",kd:"Trà",d:"Pha mời phi tần đến chơi: thiện cảm +3 · uống: Sức +3 · tặng được",pr:6,use:{suc:3},host:3,tg:["rv","th"]},
 trahop:{n:"Trà Quân Sơn ngân châm",kd:"Trà",d:"Trà thượng hạng: mời khách thiện cảm +5 · uống: Sức +4, Đức +1 · tặng Thái hậu, Hoàng thượng",pr:25,use:{suc:4,duc:1},host:5,gv:4,tg:["rv","th","emp","hh"]},
 tramoc:{n:"Trà mốc (hàng kém)",kd:"Trà",d:"Trà cũ ẩm mốc Nội vụ phủ phát: mời khách thì bị chê (thiện cảm -2) · uống: Sức +1",pr:0,use:{suc:1},host:-2,tg:[]},
 thanbac:{n:"Than bạc sương",kd:"Than sưởi",d:"Đốt sưởi: mùa đông Sức +6, mùa khác Sức +2",pr:6,heat:[6,2],tg:["rv"]},
 thanden:{n:"Than đen (hàng kém)",kd:"Than sưởi",d:"Than khói Nội vụ phủ phát: mùa đông Sức +3, mùa khác Sức +1",pr:1,heat:[3,1],tg:[]},
 banhtrai:{n:"Hộp điểm tâm",kd:"Điểm tâm",d:"Ăn: Sức +3 · tặng, chia kẻ hầu",pr:5,use:{suc:3},tg:["rv"]},
 ruoucuc:{n:"Rượu hoa cúc",kd:"Rượu",d:"Uống: Sức +4 · tặng Hoàng thượng, phi tần",pr:12,use:{suc:4},gv:3,tg:["emp","rv"]},
 aolong:{n:"Áo lông chồn tiến cống",kd:"Vải vóc",d:"Mặc mùa đông: Sắc +4 trong 3 tháng",pr:120,rk:0,dr:4,tg:["th"]},
 cocngoc:{n:"Bộ cờ ngọc",kd:"Lễ vật",d:"Tặng người mê cờ: rất hợp ý",pr:100,gv:10,tg:["emp","th","rv"]},
 guong:{n:"Gương Tây dương",kd:"Trang sức",d:"Dùng: bày lên bàn trang điểm, Sắc +3",pr:60,use:{sac:3},tg:["rv"]},
 thamba:{n:"Thảm Ba Tư",kd:"Lễ vật",d:"Tặng: êm ấm, quý hiếm",pr:120,gv:9,tg:["th","rv","hh"]},
 cungbac:{n:"Cung bạc chạm rồng",kd:"Lễ vật",d:"Tặng Hoàng thượng: hợp ý người mê săn bắn",pr:60,gv:8,tg:["emp"]},
 traicay:{n:"Giỏ trái cây tiến cống",kd:"Điểm tâm",d:"Ăn: Sức +5 · tặng",pr:15,use:{suc:5},tg:["rv","th"]},
 lanquy:{n:"Chậu lan quý",kd:"Lễ vật",d:"Tặng người yêu hoa",pr:40,gv:5,tg:["rv","th","hh"]}};
 for(const k in N){if(!IT[k])IT[k]=N[k]}
 /* coal: the use depends on the season (read when shown and when used) */
 for(const k of ["thanbac","thanden"])Object.defineProperty(IT[k],"use",{enumerable:true,configurable:true,get(){let w=false;try{w=SEASON[S.month-1]==="Đông"}catch(e){}return{suc:this.heat[w?0:1]}}});
 const G={vaibong:0,vaitho:0,tragoi:0,trahop:1,tramoc:0,thanbac:0,thanden:0,banhtrai:0,ruoucuc:0,aolong:2,cocngoc:2,guong:1,thamba:2,cungbac:1,traicay:0,lanquy:1};
 try{Object.assign(ITEM_ART_G,G);for(const k in G)ITIMG[k]=k}catch(e){}
 try{if(BAL.priceTier)for(const k in N)if(BAL.priceTier[k]==null)BAL.priceTier[k]=N[k].pr}catch(e){}})();
const STIP_UNIT={vaibong:"súc",vaitho:"súc",luahang:"súc",gamto:"súc",tragoi:"gói",tramoc:"gói",trahop:"hộp",thanbac:"giỏ",thanden:"giỏ",bangda:"khối",bangvun:"chậu",sonphan:"hộp",yensao:"hộp",nhansam:"củ"};
function stipNm(k,n){const it=IT[k];return `${n} ${STIP_UNIT[k]||"món"} ${it?it.n.replace(/ \(hàng kém\)$/,""):k}${it&&/hàng kém/.test(it.n)?" (hàng kém)":""}`}
function stipWinter(){try{return SEASON[S.month-1]==="Đông"}catch(e){return false}}
function stipSummer(){try{return SEASON[S.month-1]==="Hạ"}catch(e){return false}}
/* econ-items (owner 15/11 20:05Z #4, history ideas): charcoal in winter AND ice in summer, by rank (BAL.stip.coal / BAL.eit.ice; lãnh cung: none in summer) */
function stipList(r,out,winter,summer){r=Math.max(0,Math.min(7,r|0));const L=(out?BAL.stip.coldGoods:BAL.stip.goods[r]).map(x=>x.slice());
 if(winter)L.push([out?"thanden":"thanbac",out?BAL.stip.coldCoal:BAL.stip.coal[r]]);
 if(summer&&!out&&IT.bangda){const n=(BAL.eit&&BAL.eit.ice||[])[r]|0;if(n>0)L.push(["bangda",n])}return L}
function stipRankTxt(i){const ice=(BAL.eit&&BAL.eit.ice||[])[Math.min(7,i)]|0;return stipList(i,false,false).map(([k,n])=>stipNm(k,n)).join(" · ")+` · mùa đông ${stipNm("thanbac",BAL.stip.coal[Math.min(7,i)])}`+(ice&&IT.bangda?` · mùa hạ ${stipNm("bangda",ice)}`:"")}
function stipRuleTxt(){const B=BAL.stip;return `<p class="past">Đồ phát là vật phẩm thật trong rương (may áo, pha trà mời khách, mùa đông đốt than sưởi, mùa hạ dùng băng giải nhiệt, tặng, bán lại cho Nội vụ phủ giá thấp). Nội vụ phủ có thể cắt xén (bớt bạc, đồ hàng kém, thiếu đồ; thất sủng, phẩm thấp thì bị bớt nhiều món hơn) chỉ khi có cớ: thất sủng hay Sủng sa sút, vừa bị phạt hay bị giáng, bề trên có oán sai chèn ép, thái giám tham chưa được lót tay, cung nữ không một lòng. Không bị khi Sủng từ ${B.safeSung}, vừa lót tay trong ${B.tipM} tháng, hay có người quen trong đám thái giám. Hoàng hậu không bị. Kẻ hầu không một lòng cũng có thể lén ăn bớt đồ phát.</p>`}
/* ---------- state (old saves: created on first use) ---------- */
function stipSt(p){if(!p.stip||typeof p.stip!=="object")p.stip={};return p.stip}
function stipW(){if(!S.stipW||typeof S.stipW!=="object")S.stipW={};const W=S.stipW;if(W.greedy==null)W.greedy=roll(BAL.stip.greedy)?1:0;return W}
function stipEunName(){try{return S.court&&S.court.ped&&S.court.ped.name||"thái giám Nội vụ phủ"}catch(e){return"thái giám Nội vụ phủ"}}
function stipWho(p){return p===S?"ngươi":p.name}
function stipAlly(p){const st=stipSt(p);if((st.tips||0)>=BAL.stip.allyTips)return"người quen ở Nội vụ phủ (đã nhiều lần lót tay)";
 const e=(p.staff||[]).find(s=>s.role==="eunuch"&&!s.spyFor&&(s.loyal||0)>=BAL.stip.allyLoyal);return e?`thái giám ${e.name} của cung có người quen ở Nội vụ phủ`:""}
/* the visible causes this month (same for her and every NPC) */
function stipCauses(p,cut){const B=BAL.stip,st=stipSt(p),C=[],r=rkOf(p);
 if((p.sung||0)<B.lowSung)C.push({k:"sung",txt:`thất sủng (Sủng ${p.sung||0})`});
 else if(st.sung0!=null&&st.sung0-(p.sung||0)>=B.dropSung)C.push({k:"sung",txt:`Sủng sa sút (${st.sung0} → ${p.sung||0})`});
 if(st.rk0!=null&&r<st.rk0)st.fault=S.turn;
 if(p.confined>0)C.push({k:"fault",txt:"đang bị cấm túc"});else if(st.fault!=null&&S.turn-st.fault<=B.faultM)C.push({k:"fault",txt:st.rk0!=null&&r<st.rk0?"vừa bị giáng phẩm":"vừa phạm lỗi, bị phạt"});
 let sup=null;if(cut){const q=queenP();if(q&&q!==p)sup=q}
 if(!sup){const L=consorts().filter(v=>v!==p&&!v.out&&v.alive!==false&&rkOf(v)>r&&rkOf(v)>=B.supRank&&oan(v,p)>=B.oan).sort((a,b)=>oan(b,p)-oan(a,p));sup=L[0]||null}
 if(sup)C.push({k:"sup",v:sup,txt:`${rkName(sup)} ${sup.name} có oán, sai Nội vụ phủ chèn ép`});
 const W=stipW();const tipped=st.tip!=null&&S.turn-st.tip<B.tipM;const pun=W.pun!=null&&S.turn-W.pun<B.punishM;
 if(W.greedy&&!tipped&&!pun)C.push({k:"eun",txt:"thái giám Nội vụ phủ lo việc phát bổng vốn tham, chưa được lót tay"});
 if(p.maid&&((p.maid.loyal||0)<B.maidLoyal||p.maid.spyFor))C.push({k:"maid",txt:`cung nữ ${p.maid.name} không một lòng, để mặc người ta bớt xén`});
 return{C,sup}}
function stipSkim(p,base,cut){try{if(!p||p.out||p.dead||rkOf(p)>=7||p.queen||(p===S&&typeof isSrv==="function"&&isSrv()))return null;
 const B=BAL.stip,st=stipSt(p);const {C,sup}=stipCauses(p,cut);const keep=()=>{st.sung0=p.sung||0;st.rk0=rkOf(p)};
 const ally=stipAlly(p);const tipped=st.tip!=null&&S.turn-st.tip<B.tipM;
 if(!C.length||(!cut&&((p.sung||0)>=B.safeSung||ally||tipped))){keep();return null}
 let ch=C.reduce((a,c)=>a+(B.w[c.k]||0),0)+(st.meek!=null&&S.turn-st.meek<=1?B.meekAdd:0)+(st.spite!=null&&S.turn-st.spite<=2?B.spiteAdd:0);
 if(!cut&&!roll(Math.min(B.cap,ch))){keep();return null}
 keep();const bac=cut?0:Math.round(base*(C.length>=2?B.cutBig:B.cutSmall));
 return{bac,items:stipItemN(p,C),C,sup,why:C.map(c=>c.txt).join("; "),cut:!!cut}}catch(e){console.error("stipSkim",e);return null}}
/* econ-items (owner 15/11 20:05Z #4): HOW MANY of the goods are skimmed scales with her standing: more causes, low Sủng, a low rank → more lines
   worse / missing; a high rank → fewer (BAL.eit.skimN). Seasonal charcoal / ice go first (the classic squeeze), then the dearest. */
function stipItemN(p,C){const N=(BAL.eit&&BAL.eit.skimN)||{base:1,many:1,lowSung:1,lowRank:1,lowRankMax:1,highRank:5};const r=rkOf(p);
 return Math.max(1,N.base+((C||[]).length>=2?N.many:0)+((p.sung||0)<BAL.stip.lowSung?N.lowSung:0)+(r<=N.lowRankMax?N.lowRank:0)-(r>=N.highRank?1:0))}
function stipPickLines(L,n){const D=BAL.stip.down;const ix=L.map((x,i)=>i).filter(i=>L[i][0] in D);
 const pr=k=>(k==="thanbac"||k==="bangda")?1e6:((IT[k]&&IT[k].pr)||0);ix.sort((a,b)=>pr(L[b][0])-pr(L[a][0]));return new Set(ix.slice(0,Math.max(0,n|0)))}
/* the goods: one entry per piece in p.inv (from:"noivu"); skimmed → one step worse / missing */
function stipGoods(p,SK){const G=[];try{if(!p||p.dead||(p===S&&typeof isSrv==="function"&&isSrv()))return G;p.inv=p.inv||[];
 const L=stipList(rkOf(p),!!p.out,stipWinter(),stipSummer());const D=BAL.stip.down;const hit=SK&&SK.items?stipPickLines(L,SK.items===true?99:SK.items):new Set();
 for(const [k0,n0] of L){let k=k0,n=n0,kem=false,lost=false;
  if(hit.has(L.findIndex(x=>x[0]===k0))){kem=true;k=D[k0];if(k0==="thanbac"||k0==="bangda")n=Math.max(1,n0-1);if(!k){lost=true}}
  const g={k0,n0,k,n,kem,lost,E:[]};if(!lost&&IT[k])for(let i=0;i<n;i++){const e={k,from:"noivu",d:S.turn};p.inv.push(e);g.E.push(e)}G.push(g)}
 if(p!==S){const nv=p.inv.filter(e=>e&&e.from==="noivu"&&!e.w);const over=nv.length-BAL.stip.npcKeep*3;if(over>0)nv.slice(0,over).forEach(e=>{const i=p.inv.indexOf(e);if(i>=0)p.inv.splice(i,1)})}
 }catch(e){console.error("stipGoods",e)}return G}
function stipGoodsTxt(G){return (G||[]).map(g=>g.lost?`thiếu ${stipNm(g.k0,g.n0).replace(/^\d+ \S+ /,"")}`:stipNm(g.k,g.n)).join(" · ")}
/* Nội vụ phủ buys its own issue back cheaply */
(function(){if(typeof econPrice!=="function")return;const p0=econPrice;econPrice=function(p,e){const v=p0.apply(this,arguments);try{if(e&&e.from==="noivu"&&!e.wk)return Math.max(e.k&&IT[e.k]&&IT[e.k].pr?1:0,Math.floor(v*BAL.stip.resell/100))}catch(x){}return v};window.econPrice=econPrice})();
/* ---------- one way to give goods + the reveal (kitReward of j93; game-feel's kitGain/kitReward keep the same call) ---------- */
function stipRevItem(k){const it=IT[k]||{};let tier=0;try{const a=itemArt(k);tier=a?a.grade|0:(typeof kmTierOf==="function"?kmTierOf(k):0)}catch(e){}
 return{k,n:it.n||k,d:it.d||"",img:typeof kmItemImg==="function"?kmItemImg(k):"",tier}}
function stipReveal(entries,o){try{if(window.__bot||(typeof quiet!=="undefined"&&quiet)||typeof kitReward!=="function")return;
 try{if(typeof KMSNAP!=="undefined"&&KMSNAP&&KMSNAP.inv)entries.forEach(e=>KMSNAP.inv.push(e))}catch(e){}
 if(typeof kmOn==="function"&&!kmOn())return;kitReward({kind:o.kind||"gift",title:o.title||"Hộp gấm",from:o.sub||"",items:entries.map(e=>stipRevItem(e.k)),bac:o.bac||0})}catch(e){console.error("stipReveal",e)}}
const STIP_FROM={emp:["royal","Ngự tứ","Hoàng thượng ban"],th:["tray","Mâm thưởng","Thái hậu ban"],hh:["tray","Mâm thưởng","Hoàng hậu ban"],noivu:["chest","Rương bảo vật","Nội vụ phủ phát"],story:["gift","Hộp gấm",""]};
function goodsGive(p,keys,o){o=o||{};p=p||S;const L=(Array.isArray(keys)?keys:[keys]).filter(k=>IT[k]);if(!L.length||!p)return"";p.inv=p.inv||[];
 const from=o.from||"story";const E=L.map(k=>{const e={k,from,d:S.turn};if(o.who)e.giver=o.who;p.inv.push(e);return e});
 if(p===S){const F=STIP_FROM[from]||STIP_FROM.story;stipReveal(E,{kind:o.kind||F[0],title:o.title||F[1],sub:o.sub||F[2]||(o.who?`${o.who} tặng`:"")})}
 const cnt={};L.forEach(k=>cnt[k]=(cnt[k]||0)+1);return Object.keys(cnt).map(k=>`${IT[k].n}${cnt[k]>1?" ×"+cnt[k]:""}`).join(", ")}
window.goodsGive=goodsGive;
/* ---------- her payout: the chest, then the skimming event ---------- */
function stipShow(G,net,SK){const E=[];(G||[]).forEach(g=>E.push(...g.E));const base=(()=>{try{return BAL.pay[Math.min(7,rkOf(S))]}catch(e){return 0}})();
 if(E.length||net>0)stipReveal(E,{kind:"chest",title:`Bổng lộc tháng ${typeof econMonthName==="function"?econMonthName():S.month}`,sub:SK?"Nội vụ phủ phát · bị cắt xén":"Nội vụ phủ phát",bac:Math.max(0,net)});
 if(SK)Q.push(stipEvent(G,SK))}
function stipRestore(p,G,full){let n=0;for(const g of G||[]){if(!g.kem)continue;g.E.forEach(e=>{const i=p.inv.indexOf(e);if(i>=0)p.inv.splice(i,1)});g.E=[];
  for(let i=0;i<g.n0;i++){const e={k:g.k0,from:"noivu",d:S.turn};p.inv.push(e);g.E.push(e)}g.k=g.k0;g.n=g.n0;g.kem=false;g.lost=false;n++}
 if(p===S&&n)stipReveal([].concat(...G.map(g=>g.E)),{kind:"chest",title:"Nội vụ phủ phát bù",sub:"đồ tốt thay hàng kém"});return n}
function stipReportTo(SK){const q=queenP();const hhBehind=q&&q!==S&&SK.sup===q;const thOk=!S.thDead;
 if(q&&q!==S&&!hhBehind&&rel(q,S)>-30)return{k:"hh",n:"Hoàng hậu",v:q};if(thOk)return{k:"th",n:"Thái hậu",v:null};return q&&q!==S?{k:"hh",n:"Hoàng hậu",v:q,risky:1}:null}
function stipEvent(G,SK){const B=BAL.stip,r=rkOf(S),st=stipSt(S),W=stipW();const tip=B.tip[Math.min(7,r)];const eun=stipEunName();
 const lc=k=>{const n=(IT[k]?IT[k].n:k).replace(/ \(hàng kém\)$/,"");return n[0].toLowerCase()+n.slice(1)};
 const kem=G.filter(g=>g.kem&&!g.lost).map(g=>`${lc(g.k)} thay ${lc(g.k0)}`),lost=G.filter(g=>g.lost).map(g=>lc(g.k0));
 const rows=[];if(SK.bac)rows.push(["Thiếu bạc",`Bạc −${SK.bac}`,"r"]);if(SK.cut)rows.push(["Khất bổng",`theo ý ${rkName(SK.sup||queenP())}: bớt 3 phần 10 bạc`,"r"]);if(kem.length)rows.push(["Hàng kém",kem.join(" · "),"r"]);if(lost.length)rows.push(["Thiếu đồ",lost.join(" · "),"r"]);
 rows.push(["Gợi ý",`<span class="ef i">Vì ${SK.why}.</span>`]);const h=`<p>${eun} đưa bổng lộc tới, mắt không dám nhìn thẳng.</p>${kitRows(rows)}`;
 const back=()=>{if(SK.bac)apply({bac:SK.bac});return stipRestore(S,G)};
 const O=[{n:"Nhịn",fx:{},x:"không được không mất · kèm: tháng sau dễ bị bớt xén nữa",go:()=>{st.meek=S.turn;log("Ngươi nhịn, không nói gì. Nội vụ phủ biết cung ngươi dễ bảo.")}}];
 const supTxt=SK.sup?`${rkName(SK.sup)} ${SK.sup.name}`:"";
 O.push({n:"Đút bạc cho thái giám",fx:{bac:-tip},x:SK.sup?`tốn: Bạc -${tip} · thành: ${eun} nhận bạc, từ nay ${B.tipM} tháng không bớt xén nữa, nhưng không dám trả lại đồ vì ${supTxt} đã dặn`:`tốn: Bạc -${tip} · thành: đổi lại đồ tốt, ${B.tipM} tháng tới không bớt xén`,
  go:()=>{st.tip=S.turn;st.tips=(st.tips||0)+1;const n=SK.sup?0:stipRestore(S,G);log(`Ngươi dúi ${tip} bạc cho ${eun}.${n?" Hắn đổi lại đồ tốt ngay.":SK.sup?` Hắn nhận bạc, nhưng không dám trái ý ${supTxt}.`:""}${st.tips>=B.allyTips?" Từ nay ngươi có người quen ở Nội vụ phủ.":""}`)}});
 if(S.maid&&!S.maid.spyFor){const m=S.maid;const od=cl(B.askBase+Math.round((m.loyal||0)/3)+(m.tr==="lanh"?15:0)+Math.round((S.sung||0)/4)-(SK.sup?25:0),5,95);
  O.push({n:`Sai ${m.name} đi đòi`,fx:{},x:`${word(od)} · thành: đòi lại ${SK.bac?"đủ bạc và ":""}đồ tốt · hỏng: ${m.name} bị mắng đuổi về, lòng -5, Nội vụ phủ để bụng (tháng sau dễ bị bớt xén hơn)`,
   go:()=>{if(roll(od)){back();log(`${m.name} đến Nội vụ phủ đòi đủ phần. ${eun} đành ${SK.bac?"trả lại bạc và ":""}đổi đồ tốt.`)}else{m.loyal=cl((m.loyal||0)-5,0,100);st.spite=S.turn;log(`<span class="r">${m.name} bị ${eun} mắng đuổi về.</span> Lòng cung nữ -5.`)}}})}
 const T=stipReportTo(SK);if(T){const stat=T.k==="hh"?(S.hh||0):(S.th||0);const ev=W.ev||0;const od=T.risky?5:cl(B.reportBase+Math.round(stat/2)+Math.round((S.danh||0)/5)+ev*15,5,95);
  O.push({n:`Tố lên ${T.n}`,fx:{},x:`${word(od)} · thành: ${eun} bị phạt, trả lại ${SK.bac?"bạc và ":""}đồ tốt${SK.sup&&!T.risky?`, ${supTxt} bị trách (Danh -2)`:""} · hỏng: Danh -1, Nội vụ phủ để bụng${T.risky?`, ${T.n} chính là người sai chèn ép: nàng thù ngươi thêm`:""}`,
   go:()=>{if(roll(od)){back();W.pun=S.turn;W.ev=0;if(SK.sup&&!T.risky){ap(SK.sup,{danh:-2});oanAdd(SK.sup,S,5)}log(`${T.n} nghe ngươi tâu, sai phạt ${eun}${SK.sup&&!T.risky?`, trách ${supTxt}`:""}. Nội vụ phủ trả lại đủ phần.`)}
    else{apply({danh:-1});st.spite=S.turn;if(T.risky&&T.v)oanAdd(T.v,S,10);log(`<span class="r">${T.n} gạt đi, cho là ngươi nhỏ nhen.</span> Danh -1.${T.risky?` ${T.n} thù ngươi thêm.`:""}`)}}})}
 const om=cl(B.remember+(S.mat||0)*10,5,95);
 O.push({n:"Ghi nhớ để trả thù sau",fx:{},x:`${word(om)} · thành: Tai mắt dò ra ${SK.sup?`chứng cứ về ${supTxt} (chứng cứ +1)`:`sổ sách ${eun} ăn bớt (lần tố sau dễ thành)`} · hỏng: không dò được gì`,
  go:()=>{if(roll(om)){const n=SK.sup?/*evok: checked (n)*/evA(S,SK.sup,1):0;if(!SK.sup)W.ev=(W.ev||0)+1;log(SK.sup&&!n?`Ngươi ghi nhớ. Tai mắt dò ra ${supTxt} không dính líu: chỉ ${eun} ăn bớt.`:`Ngươi ghi nhớ. Tai mắt dò ra ${SK.sup?`chứng cứ về ${supTxt}: chứng cứ +1`:`sổ sách ${eun} ăn bớt`}.`)}else log("Ngươi ghi nhớ, nhưng chưa dò được gì.")}});
 return{ev:1,t:"Bổng lộc bị cắt xén",evId:"j3:embezzle",who:typeof pEunCourt==="function"?pEunCourt("ped"):null,h,opts:O}}
/* NPCs: the same rule; their answer by purse and patron; news by Tai mắt */
function stipNpc(p,SK,G){const B=BAL.stip,st=stipSt(p),tip=B.tip[Math.min(7,rkOf(p))];let how="";
 if(!SK.sup&&(p.bac||0)>=tip*2&&roll(50)){ap(p,{bac:-tip});st.tip=S.turn;st.tips=(st.tips||0)+1;stipRestore(p,G);how="nàng lót tay cho thái giám, được đổi đồ tốt"}
 else if(p.maid&&!p.maid.spyFor&&roll(30)&&roll(cl(B.askBase+Math.round((p.maid.loyal||0)/3)-(SK.sup?25:0),5,95))){ap(p,{bac:SK.bac});stipRestore(p,G);how=`cung nữ ${p.maid.name} đi đòi được đủ phần`}
 else{st.meek=S.turn;how="nàng đành nhịn"}
 try{newsAdd(p,"stip",`Nội vụ phủ bớt xén bổng lộc của ${rkName(p)} ${p.name} (${SK.why}); ${how}`,SK.sup===S)}catch(e){}}
/* ---------- faults: a scheme caught counts as a recent fault ---------- */
(function(){if(typeof caught!=="function")return;const c0=caught;caught=function(a){const r=c0.apply(this,arguments);try{if(r&&a)stipSt(a).fault=S.turn}catch(e){}return r}})();
/* ---------- tea in a visit: "Pha trà mời khách" (EV6 visit events with a consort) ---------- */
function stipTeaIx(){const L=["trahop","tragoi","tramoc"];for(const k of L){const i=(S.inv||[]).findIndex(e=>e&&e.k===k&&!e.h);if(i>=0)return i}return -1}
/* ---------- EV6 events that hand her goods (variant text → item; `no` = option indexes that refuse / pass the gift on) ---------- */
const STIP_EV=[["giftArrive",/hai lọ hương liệu/,"huongtram","A",[2]],["giftArrive",/xấp lụa/,"luahang","A",[2]],["giftArrive",/hộp điểm tâm/,"banhtrai","A",[2]],["giftArrive",/chậu lan/,"lanquy","A",[2]],
 ["thMama",/gói trà/,"trahop","th",[]],["empGiftOdd",/áo lông chồn/,"aolong","emp",[2]],["empGiftOdd",/bộ cờ ngọc/,"cocngoc","emp",[2]],["autumnMoon",/rượu hoa cúc/,"ruoucuc","A",[]],
 ["envoyGift",/ngọc quý/,"vongngoc","emp",[0,1]],["envoyGift",/vải thiều/,"traicay","emp",[0,1]],["envoyGift",/cây đàn lạ/,"dancoc","emp",[0,1]],["envoyGift",/thảm Ba Tư/,"thamba","emp",[0,1]],
 ["proudVisit",/đĩa bánh thừa/,"banhtrai","A",[1,2]]];
function stipEvItem(id,X){try{const s=E68I[id];const V=s.v||[""];const t=V[((X.p&&X.p.vi)||X.vi||0)%V.length];const m=STIP_EV.find(r=>r[0]===id&&r[1].test(t));return m||null}catch(e){return null}}
window.stipEvItem=stipEvItem;
(function(){if(typeof e68Build!=="function")return;const b0=e68Build;e68Build=function(s,p){const d=b0.apply(this,arguments);try{if(!d||!d.o)return d;const X={p,vi:p.vi||0};
  const m=stipEvItem(s.id,X);if(m){const [,,k,fr,no]=m;let who="";try{const A=e68X(s,p);who=fr==="A"&&A&&A.A?A.A.n||"":""}catch(e){}
   d.o.forEach((o,i)=>{if(no.includes(i)||!o.go)return;const g0=o.go;o.go=function(){const r=g0.apply(this,arguments);try{const n=goodsGive(S,k,{from:fr==="A"?"story":fr,who});if(n)log(`${n} vào rương.`)}catch(e){console.error(e)}return r};o.x=(o.x?o.x+" · ":"")+`kèm: ${IT[k].n} vào rương`})}
  if(s.fam==="visit"&&(s.a||[])[0]==="rv"){const ti=stipTeaIx();let A=null;try{A=e68X(s,p)}catch(e){}if(ti>=0&&A&&A.A){const k=S.inv[ti].k,it=IT[k],n=it.host||0;
   d.o.push({n:`Pha ${it.n.replace(/ \(hàng kém\)$/,"")} mời khách`,fx:{},x:n>=0?`thành: ${A.A.n||"nàng"} thiện cảm +${n} · kèm: dùng 1 ${STIP_UNIT[k]||"gói"} trà`:`hỏng: trà mốc, ${A.A.n||"nàng"} chê (thiện cảm ${n}) · kèm: dùng 1 gói trà`,
    go:()=>{const j=stipTeaIx();if(j>=0)S.inv.splice(j,1);relDo(A.A,n);log(n>=0?`Ngươi pha ${it.n} mời ${A.A.n||"khách"}; nàng khen trà thơm.`:`<span class="r">Trà mốc, ${A.A.n||"khách"} nhấp một ngụm rồi đặt xuống.</span>`)}})}}
 }catch(e){console.error("stip e68",e)}return d}})();
/* ---------- j67 stories: beat / option / end field gi:[key or [keys], from] ---------- */
/* the giver of a story gift (review/small-bugs-3: every gift box names its real giver, never an empty "from" line): the result text
   "{mis} thưởng ngươi…" names the token; emp/th/hh gifts are named by STIP_FROM */
function stipWho67(A,txt){try{const m=String(txt||"").match(/\{(\w+)\}\s*(?:thưởng|tặng|ban|gửi|cho)/);if(!m||m[1]==="me"||typeof TOK67!=="object"||!TOK67[m[1]])return"";return fill67("{"+m[1]+"}",A)}catch(e){return""}}
function stipGi(gi,who){if(!gi)return"";const [k,fr]=Array.isArray(gi)?gi:[gi,"story"];return goodsGive(S,k,{from:fr||"story",who:who||""})}
(function(){if(typeof res67==="function"){const r0=res67;res67=function(tk,bid,i){let b=null,o=null;try{const A=th67(tk);if(A&&A.cur===bid){b=beatDef67(A,bid);o=b?opts67(A,b)[i]:null}}catch(e){}
  const r=r0.apply(this,arguments);try{const A=th67(tk);const n=[o&&o.gi?stipGi(o.gi,stipWho67(A,o.rt)):"",b&&b.gi&&!(o&&o.nogi)?stipGi(b.gi,stipWho67(A,b.t)):""].filter(Boolean).join(", ");if(n)log(`${n} vào rương.`)}catch(e){console.error(e)}return r}}
 if(typeof end67==="function"){const e0=end67;end67=function(A,k){const r=e0.apply(this,arguments);try{const a=ARC67[A.a],E=a&&a.E[k];if(E&&E.gi){const n=stipGi(E.gi,stipWho67(A,E.t));if(n)log(`${n} vào rương.`)}}catch(e){console.error(e)}return r}}})();
/* ---------- j71 festival prizes named in the text (festival:contest → item, to the winner when she wins) ---------- */
const STIP_FPRIZE={"newyear:mua":"gamto","nguyentieu:co":"trahop","phoenix:ban":"cungbac"};
(function(){for(const f of ["cRun7","cFin7"]){if(typeof window[f]!=="function")continue;const o=window[f];window[f]=function(k,kind){let w0=0;try{w0=j7s().win||0}catch(e){}const r=o.apply(this,arguments);
  try{const it=STIP_FPRIZE[k+":"+kind];if(it&&(j7s().win||0)>w0){const n=goodsGive(S,it,{from:"emp",sub:"Phần thưởng hội thi"});if(n)log(`Phần thưởng: ${n} vào rương.`)}}catch(e){console.error(e)}return r}}})();
window.stipSkim=stipSkim;window.stipGoods=stipGoods;window.stipShow=stipShow;