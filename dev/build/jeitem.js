/* ================= jeitem: ECON-ITEMS (owner 15/11 20:05Z #4 #7 #8, D6, review/econ-items) =================
   Builds ON jstip (Nội vụ phủ goods + cắt xén), jty (trung y, robbery, Nội vụ phủ re-issue), jearn (starting kit), jinv (6 wear slots).
   ONE SOURCE for the numbers: BAL.eit (below). Notes: dev/PROGRESS_econ-items.md.
   1. ICE IN SUMMER (history ideas): Nội vụ phủ issues ice by rank in Hạ (BAL.eit.ice), like charcoal in Đông (BAL.stip.coal). Băng đá melts:
      ice of an earlier month is gone at the month's turn. Skimmed ice = Băng vụn (hàng kém), one block less (jstip down / stipGoods).
      How MANY goods are skimmed now scales with her standing (jstip stipItemN, BAL.eit.skimN).
   2. KẺ HẦU ĂN BỚT: a servant of hers who is not loyal (Lòng < BAL.eit.pil.loyal, or a spy) may pocket one piece of the month's goods.
      She notices only by her eyes (Tai mắt, a loyal cung nữ): then a dialog with the servant — Phạt / Răn dạy rồi tha / Trả về Nội vụ phủ /
      Làm ngơ (j10 servant rules: Lòng, a spy confesses under punishment, a grudge). Unnoticed = the piece is simply missing from the chest.
      NPCs: the same rule as data (their servants pocket, they punish by their trait).
   3. XIN CẤP LẠI Y PHỤC: when her robe is lost (robbed / confiscated) she is no longer stuck waiting: the robbery card and Tư trang → Việc offer
      roads with odds — lót tay Nội vụ phủ (Bạc by rank) · sai cung nữ đi xin (the equal road without bạc: Sức + her maid's Lòng, owner rule 20:30Z)
      · viết thư xin nhà (Sức, arrives in BAL.eit.re.famWk weeks, odds by her family) · đợi Nội vụ phủ (a random 1–3 weeks weighted by how Nội vụ phủ regards her, owner 16/11 s9; eitRegard, BAL.eit.reG).
   4. RƯƠNG ĐỒ KHUÊ CÁC: a new life brings her girlhood chest into the palace — the same 6 things as the home road of review/outside-r2-r2
      (jkc kcChest: Trâm ngọc bích, a plain Thường y phục, Vòng bạc hoa mai, Ngọc bội khuê các, Túi thơm thêu, an un-worn Khăn tay lụa;
      Khăn che mặt stays empty = coordinator ruling 16/11, veil = hủy dung). Đeo tay / Đeo eo / Túi thơm are worn at once; the girlhood
      robe + hairpin stay in the bag (the court issue is worn), the fallback outfit if her robe is lost. Not when the home road ran (S.kc).
      NPCs: every consort keeps one girlhood robe in her chest (jearn earnFromChest wears it if hers is lost).
   Old saves: nothing to convert (fields are created on first use; no chest for a life already under way). Co-op: per player (each player's
   own S; the friend entry is taken out of rivals during her week). ================= */
Object.assign(BAL,{eit:{
 ice:[0,0,1,1,1,2,2,3],                       /* blocks of ice a month in Hạ by rank (Đáp ứng … Hoàng hậu) */
 skimN:{base:1,many:1,lowSung:1,lowRank:1,lowRankMax:1,highRank:5},   /* goods lines skimmed: base +2 causes +Sủng low +rank ≤ lowRankMax −rank ≥ highRank */
 pil:{loyal:45,base:8,k:.6,spy:15,ok:15,lowSung:8,cap:55,detM:6,see:25,seeMat:8,seeMaid:15,
      punLoyal:15,forgiveLoyal:4,ignoreLoyal:12,softM:3,npcPun:50},
 reG:{base:50,rk:5,sung:.2,tip:25,cause:15},   /* owner 16/11 s9: re-issue after a RANDOM 1–3 weeks weighted by how Nội vụ phủ regards her (eitRegard 0..100) */
 cool:{bangda:[5,1],bangvun:[2,0]},  /* Sức from one block of ice: [in mùa Hạ, other seasons] (Băng đá, Băng vụn) */
 kcSac:1,                             /* Sắc of a worn girlhood jewel (Ngọc bội khuê các, Vòng bạc hoa mai) */
 re:{tip:[6,8,10,12,15,18,22,26],base:50,rk:5,sungDiv:5,suc:6,altPen:10,maidAdj:5,maidFail:3,famSuc:2,famWk:1,famOk:75,famPoor:40,famCut:30}}});
/* ---------- items: ice (art img/item-bangda.webp, img/item-bangvun.webp, gpt-2-6, dev/art/ITEM_ART.md §6) + the girlhood pieces of jkc ---------- */
(function(){const N={
 bangda:{n:"Băng đá",kd:"Băng",d:`Mùa hạ giải nhiệt: Sức +${BAL.eit.cool.bangda[0]} · mùa khác Sức +${BAL.eit.cool.bangda[1]} · để qua tháng thì tan`,pr:4,cool:BAL.eit.cool.bangda,tg:[]},
 bangvun:{n:"Băng vụn (hàng kém)",kd:"Băng",d:`Băng vụn Nội vụ phủ phát: mùa hạ Sức +${BAL.eit.cool.bangvun[0]} · để qua tháng thì tan`,pr:0,cool:BAL.eit.cool.bangvun,tg:[]},
 ngocboikc:{n:"Ngọc bội khuê các",kd:"Trang sức",d:`Đeo eo: Sắc +${BAL.eit.kcSac} · ngọc bội con gái mang từ nhà`,pr:10,rk:0,sl:"waist",w:{sac:BAL.eit.kcSac}},
 vongbackc:{n:"Vòng bạc hoa mai",kd:"Trang sức",d:`Đeo tay: Sắc +${BAL.eit.kcSac} · đôi vòng bạc con gái mang từ nhà`,pr:10,rk:0,sl:"wrist",w:{sac:BAL.eit.kcSac}}};
 for(const k in N)if(!IT[k])IT[k]=N[k];
 for(const k of ["bangda","bangvun"])Object.defineProperty(IT[k],"use",{enumerable:true,configurable:true,get(){let s=false;try{s=SEASON[S.month-1]==="Hạ"}catch(e){}const v=this.cool[s?0:1];return v?{suc:v}:{suc:0}}});
 try{for(const k in N){ITEM_ART_G[k]=0;ITIMG[k]=k}}catch(e){}
 try{if(BAL.priceTier)for(const k in N)if(BAL.priceTier[k]==null)BAL.priceTier[k]=N[k].pr}catch(e){}})();
/* ice melts: a block issued in an earlier month is gone at the month's turn (player and NPC alike) */
(function(){if(typeof itemMonth!=="function")return;const m0=itemMonth;itemMonth=function(p){let r=m0.apply(this,arguments)||"";try{if(p&&p.inv){let n=0;
  for(let i=p.inv.length-1;i>=0;i--){const e=p.inv[i];if(e&&(e.k==="bangda"||e.k==="bangvun")&&!e.h&&(e.d==null||e.d<S.turn)){p.inv.splice(i,1);n++}}
  if(n&&p===S)r+=`${n} khối băng để qua tháng đã tan thành nước. `}}catch(e){console.error("eit melt",e)}return r}})();

/* ---------- 2. KẺ HẦU ĂN BỚT ---------- */
let EIT_PIL=null;/* her pending dialog (shown after the stipend card + chest) */
function eitPilWho(p){const P=BAL.eit.pil,L=[];if(p.maid&&p.maid.alive!==false)L.push(p.maid);for(const s of (p.staff||[]))if(s&&(s.role==="maid"||s.role==="eunuch"))L.push(s);
 return L.map(s=>{const lo=s.loyal|0;if(lo>=P.loyal&&!s.spyFor)return null;if(s.pilDet!=null&&S.turn<s.pilDet)return null;
   let ch=P.base+Math.max(0,P.loyal-lo)*P.k+(s.spyFor?P.spy:0)+(s.pilOk?P.ok:0)+(p.pilSoft!=null&&S.turn<p.pilSoft&&p.pilSoftBy!==s.name?P.ok:0)+((p.sung||0)<BAL.stip.lowSung?P.lowSung:0);return{s,ch:Math.min(P.cap,Math.round(ch))}}).filter(Boolean)}
function eitPilfer(p,G){if(p===S)EIT_PIL=null;try{if(!p||p.dead||p.out||!G||!G.length)return null;if(p===S&&typeof isSrv==="function"&&isSrv())return null;
 const C=eitPilWho(p);let hit=null;for(const c of C)if(roll(c.ch)){hit=c.s;break}if(!hit)return null;
 /* the dearest piece that really arrived this month */
 let best=null;for(const g of G)for(const e of (g.E||[])){const v=(IT[e.k]&&itm(e.k).pr)||0;if(!best||v>best.v)best={g,e,v}}if(!best)return null;
 const i=p.inv.indexOf(best.e);if(i>=0)p.inv.splice(i,1);best.g.E.splice(best.g.E.indexOf(best.e),1);best.g.n=Math.max(0,best.g.n-1);if(!best.g.n)best.g.lost=true;best.g.pil=1;
 hit.pilN=(hit.pilN||0)+1;const X={p,s:hit,k:best.e.k,g:best.g};
 if(p!==S){eitPilNpc(X);return X}
 const P=BAL.eit.pil;const see=cl(P.see+(S.mat||0)*P.seeMat+(S.maid&&S.maid!==hit&&(S.maid.loyal||0)>=70?P.seeMaid:0),5,95);
 if(roll(see))EIT_PIL=X;return X}catch(e){console.error("eitPilfer",e);return null}}
function eitPilBack(X){const e={k:X.k,from:"noivu",d:S.turn};S.inv.push(e);X.g.E.push(e);X.g.n++;X.g.lost=false}
function eitIsMaid(s){return s===S.maid}
function eitPilEvent(X){const s=X.s,P=BAL.eit.pil,it=IT[X.k]||{n:X.k};const nm=it.n.replace(/ \(hàng kém\)$/,"");const role=eitIsMaid(s)?"cung nữ thân tín":s.role==="eunuch"?"thái giám":"cung nữ";
 const who=eitIsMaid(s)?(typeof pMaid==="function"?pMaid():null):(typeof pServ==="function"?pServ(s):null);
 const h=`<p>Kiểm lại đồ Nội vụ phủ phát, thiếu một ${STIP_UNIT[X.k]||"món"} ${nm.toLowerCase()}. Hỏi ra mới biết ${role} ${s.name} lén giữ lấy.</p>${kitRows([["Mất",`1 ${STIP_UNIT[X.k]||"món"} ${nm.toLowerCase()}`,"r"],["Gợi ý",`<span class="ef i">thiện cảm của ${s.name} với ngươi ${s.loyal|0}${s.spyFor?", có điều khả nghi":""}${s.pilN>1?`, đã ${s.pilN} lần`:""}.</span>`]])}`;
 const O=[
  {n:"Phạt nặng",fx:{},x:`thành: lấy lại đồ, ${s.name} ${P.detM} tháng không dám tái phạm, kẻ hầu khác cũng sợ · kèm: thiện cảm của ${s.name} với ngươi -${P.punLoyal}${s.spyFor?" · tra khảo có thể khai ra kẻ đứng sau":""}`,
   go:()=>{eitPilBack(X);s.loyal=cl((s.loyal|0)-P.punLoyal,0,100);s.pilDet=S.turn+P.detM;s.pilOk=0;S.pilSoft=null;for(const o of (S.staff||[]))if(o&&o!==s&&(o.pilDet==null||o.pilDet<S.turn+Math.round(P.detM/2)))o.pilDet=S.turn+Math.round(P.detM/2);let r=`Ngươi phạt ${s.name}, lấy lại ${nm.toLowerCase()}. Thiện cảm của ${s.name} với ngươi -${P.punLoyal}.`;
    if(s.spyFor&&!eitIsMaid(s)){const m=typeof byKey==="function"?byKey(s.spyFor):null;r+=` Bị tra khảo, ${s.name} khai là tai mắt của ${m&&m!==S?NM(m):"kẻ khác"}. Đuổi khỏi cung.`;const i=S.staff.indexOf(s);if(i>=0)S.staff.splice(i,1);if(m&&m!==S)try{evA(S,m,1)}catch(e){}}
    log(r)}},
  {n:"Răn dạy rồi tha",fx:{},x:`thành: lấy lại đồ, thiện cảm của ${s.name} với ngươi +${P.forgiveLoyal} · kèm: kẻ hầu khác thấy ngươi dễ tính, ${P.softM} tháng tới dễ ăn bớt hơn`,
   go:()=>{eitPilBack(X);s.loyal=cl((s.loyal|0)+P.forgiveLoyal,0,100);S.pilSoft=S.turn+P.softM;S.pilSoftBy=s.name;log(`Ngươi răn dạy ${s.name} rồi tha. ${s.name} dập đầu tạ ơn. Thiện cảm của ${s.name} với ngươi +${P.forgiveLoyal}.`)}}];
 if(!eitIsMaid(s))O.push({n:"Trả về Nội vụ phủ",fx:{},x:`thành: lấy lại đồ, Nội vụ phủ đưa người khác đến thay · kèm: ${s.name} rời cung ngươi`,
   go:()=>{eitPilBack(X);const i=S.staff.indexOf(s);if(i>=0){S.staff.splice(i,1);let n=null;try{n=mkServ(s.role);S.staff.push(n)}catch(e){}log(`Ngươi trả ${s.name} về Nội vụ phủ${n?`; ${n.name} đến hầu thay`:""}.`)}}});
 O.push({n:"Làm ngơ",fx:{},x:`thành: thiện cảm của ${s.name} với ngươi +${P.ignoreLoyal} (coi như thưởng) · kèm: mất món đồ, ${s.name} dễ ăn bớt nữa`,go:()=>{s.loyal=cl((s.loyal|0)+P.ignoreLoyal,0,100);s.pilOk=1;log(`Ngươi làm ngơ, coi như thưởng ${s.name}.`)}});
 return{ev:1,t:"Kẻ hầu ăn bớt",who,h,opts:O}}
function eitPilNpc(X){const p=X.p,s=X.s,P=BAL.eit.pil;if(!roll(cl(P.see+(p.tamco|0)/4,5,95)))return;const harsh=/Xảo quyệt|Kiêu ngạo|Thù dai|Đa nghi/.test(`${p.trait||""} ${p.trait2||""}`);
 const nm=(IT[X.k]||{n:X.k}).n.replace(/ \(hàng kém\)$/,"").toLowerCase();
 if(harsh||roll(P.npcPun)){s.loyal=cl((s.loyal|0)-P.punLoyal,0,100);s.pilDet=S.turn+P.detM;try{newsAdd(p,"stip",`${rkName(p)} ${p.name} bắt được ${s.name} lén giữ ${nm} Nội vụ phủ phát, phạt nặng`)}catch(e){}}
 else{s.loyal=cl((s.loyal|0)+P.forgiveLoyal,0,100)}}
(function(){if(typeof stipGoods!=="function")return;const g0=stipGoods;stipGoods=function(p,SK){const G=g0.apply(this,arguments);eitPilfer(p,G);return G};window.stipGoods=stipGoods})();
(function(){if(typeof stipShow!=="function")return;const s0=stipShow;stipShow=function(){const r=s0.apply(this,arguments);try{if(EIT_PIL&&EIT_PIL.p===S)Q.push(eitPilEvent(EIT_PIL))}catch(e){console.error("eit pil ev",e)}EIT_PIL=null;return r};window.stipShow=stipShow})();

/* ---------- 3. XIN CẤP LẠI Y PHỤC ---------- */
/* how Nội vụ phủ regards her (0..100): rank, Sủng, a recent tip (jstip st.tip) up; every skim cause (thất sủng, a fault, a superior's grudge,
   an untipped greedy eunuch, a disloyal maid) down. Weeks = 1 + two rolls against (100 − regard): good standing / a bribe → nearer 1, disliked → nearer 3. */
function eitRegard(p){const G=BAL.eit.reG,B=BAL.stip;let g=G.base+rkOf(p)*G.rk+((p.sung||0)-30)*G.sung;
 try{const st=stipSt(p),f0=st.fault;if(st.tip!=null&&S.turn-st.tip<B.tipM)g+=G.tip;g-=stipCauses(p,false).C.length*G.cause;st.fault=f0}catch(e){}return cl(Math.round(g),0,100)}
function eitReWk(p){const g=eitRegard(p);return 1+(roll(100-g)?1:0)+(roll(100-g)?1:0)}
(function(){if(typeof tyLost!=="function")return;const l0=tyLost;tyLost=function(p,why){const r=l0.apply(this,arguments);try{if(p)p.tyNvp=wk()+eitReWk(p)}catch(e){}return r};window.tyLost=tyLost})();
function eitReNeed(){try{return !!(S&&!S.dead&&!S.out&&typeof tyOn==="function"&&tyOn(S)&&!(typeof isSrv==="function"&&isSrv()))}catch(e){return false}}
function eitReOdds(){const R=BAL.eit.re,r=Math.max(0,Math.min(7,rkOf(S)|0));const bribe=cl(R.base+r*R.rk+Math.round((S.sung||0)/R.sungDiv),5,95);
 const m=S.maid&&!S.maid.spyFor?S.maid:null;const alt=eitAlt(R.tip[r],r);const maid=m?cl(bribe-alt.pen+cl(Math.round(((m.loyal||0)-50)/10)+Math.floor((S.mat||0)/2),-R.maidAdj,R.maidAdj),5,95):0;
 const home=S.origin&&BAL.home?(BAL.home[S.origin.k]||0):0;const fam=S.origin?cl((home>0?R.famOk:R.famPoor)-(S.homeCut?R.famCut:0),5,95):0;
 return{bribe,maid,fam,tip:R.tip[r],m,suc:alt.suc}}
/* the road without silver is priced like the silver at her rank (balance-pass rule: jstory altCost / BAL.bacTuan / BAL.altK when present,
   else the same numbers here): Sức + lower odds, floors R.suc / R.altPen */
function eitAlt(bac,r){const R=BAL.eit.re;try{if(typeof altCost==="function")return altCost(bac,r,R.suc,R.altPen)}catch(e){}
 const T=BAL.bacTuan,K=BAL.altK;/* jstory (loads earlier) */const k=Math.abs(bac||0)*16/T[Math.max(0,Math.min(T.length-1,r|0))];
 return{suc:Math.max(R.suc,Math.min(K.sucMax,Math.round(k*K.suc))),pen:Math.max(R.altPen,Math.min(K.penMax,Math.round(k*K.pen)))}}
function eitIssue(src,giver){const k=typeof earnPlainY==="function"?earnPlainY(S):null;if(!k||!WD_ITEMS[k])return null;const e={k,src,nvp:src==="nvp"?1:0,giver,d:typeof wdWhen==="function"?wdWhen():""};
 try{earnK(S,k)}catch(x){}if(!(wdOf(S)||{}).y){try{wdWearEntry(S,e)}catch(x){S.inv.push(e)}}else S.inv.push(e);S.tyNvp=null;
 try{if(typeof kitReward==="function"&&!window.__bot)kitReward({kind:"gift",title:src==="nha"?"Nhà gửi y phục":"Nội vụ phủ cấp y phục",from:giver,items:[{n:WD_ITEMS[k].n,d:"Y phục · đã mặc",img:WD_ITEMS[k].icon,tier:WD_ITEMS[k].g|0}]})}catch(x){}
 return WD_ITEMS[k].n}
function eitReOpts(withWait){const R=BAL.eit.re,o=eitReOdds();const O=[];const wkL=Math.max(0,(S.tyNvp!=null?S.tyNvp:wk()+eitReWk(S))-wk());
 O.push({n:"Lót tay Nội vụ phủ cấp ngay",fx:{bac:-o.tip},x:`${word(o.bribe)} · tốn: Bạc -${o.tip} · thành: có y phục mặc ngay · hỏng: mất bạc, vẫn phải đợi`,
  go:()=>{if(roll(o.bribe)){const n=eitIssue("nvp","Nội vụ phủ");log(n?`Thái giám Nội vụ phủ nhận bạc, mang ${n} tới ngay.`:"Nội vụ phủ không còn áo đúng phẩm.")}else log(`<span class="r">Thái giám Nội vụ phủ nhận bạc rồi khất lần, bảo đợi kho.</span>`)}});
 if(o.m)O.push({n:`Sai ${o.m.name} đến Nội vụ phủ xin`,fx:{suc:-o.suc},x:`${word(o.maid)} · tốn: Sức -${o.suc} · thành: có y phục mặc ngay · hỏng: ${o.m.name} bị mắng đuổi về, thiện cảm của ${o.m.name} với ngươi -${R.maidFail}, vẫn phải đợi`,
  go:()=>{if(roll(o.maid)){const n=eitIssue("nvp","Nội vụ phủ");log(n?`${o.m.name} khéo nói, Nội vụ phủ đưa ${n} về.`:"Nội vụ phủ không còn áo đúng phẩm.")}else{o.m.loyal=cl((o.m.loyal||0)-R.maidFail,0,100);log(`<span class="r">${o.m.name} bị thái giám Nội vụ phủ mắng đuổi về.</span> Thiện cảm của ${o.m.name} với ngươi -${R.maidFail}.`)}}});
 if(S.origin&&!S.tyFam)O.push({n:"Viết thư xin nhà gửi áo",fx:{suc:-R.famSuc},x:`${word(o.fam)} · tốn: Sức -${R.famSuc} · thành: ${R.famWk} tuần nữa nhà gửi y phục vào · hỏng: nhà không gửi được`,
  go:()=>{S.tyFam={w:wk()+R.famWk,ok:roll(o.fam)?1:0};log("Ngươi viết thư nhờ người đưa về nhà xin gửi áo vào cung.")}});
 if(withWait)O.push({n:"Đợi Nội vụ phủ",fx:{},x:`tốn: không · thành: ${wkL?`${wkL} tuần nữa`:"sắp"} Nội vụ phủ cấp áo trơn đúng phẩm · kèm: trong lúc đợi, mặc trung y ra ngoài bị chê thiếu lễ; trong Tư trang có áo khác thì mặc được ngay`,go:()=>{}});
 return O}
function eitReDialog(){return{ev:1,t:"Xin cấp lại y phục",who:typeof pEunCourt==="function"?pEunCourt("ped"):null,h:`<p>Ngươi chỉ còn trung y. Nội vụ phủ giữ phần cấp áo cho các cung, nhưng việc nhanh hay chậm còn tùy người lo liệu.</p>${kitRows([["Gợi ý",`<span class="ef i">Phẩm càng cao, càng được sủng thì Nội vụ phủ càng nể.</span>`]])}`,opts:eitReOpts(true)}}
/* the robbery card offers the roads at once (it said "Nội vụ phủ sẽ cấp lại áo sau N tuần") */
(function(){if(typeof tyRob!=="function")return;const r0=tyRob;tyRob=function(){const r=r0.apply(this,arguments);try{if(r){const m=Q.find(x=>x&&x.t==="Bị giật y phục giữa đường");if(m){
  m.h=m.h.replace(/<p>Nội vụ phủ sẽ cấp lại áo sau \d+ tuần; muốn sớm hơn thì mặc áo khác trong Tư trang\.<\/p>/,`<p>Muốn có áo sớm, phải xin Nội vụ phủ hay nhờ nhà; trong Tư trang có áo khác thì mặc được ngay.</p>`);
  m.opts=eitReOpts(true)}}}catch(e){console.error("eit rob",e)}return r};window.tyRob=tyRob})();
/* the family's robe arrives */
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{eitWeek()}catch(e){console.error("eitWeek",e)}return r};window.endTurn=endTurn})();
function eitWeek(){if(!S||S.dead)return;
 if(S.tyFam&&wk()>=S.tyFam.w){const F=S.tyFam;S.tyFam=null;if(F.ok){const nm=eitIssue("nha",S.origin?`Nhà ${S.origin.n||""}`.trim():"Nhà");if(nm)log(`Nhà gửi vào cung ${nm}.`)}else log("Thư nhà đến: nhà không gửi được áo vào cung.")}
 /* NPCs: every consort keeps one girlhood robe in her chest (fallback outfit) */
 for(const v of liveRivals(true)){if(!v||v.girl||v.out)continue;v.girl=1;try{const k=typeof wdPickAt==="function"?wdPickAt(1,"y",0):null;if(k&&WD_ITEMS[k]){v.inv=v.inv||[];v.inv.push({k,from:"kc",src:"kc"})}}catch(e){}}}
/* Tư trang → Việc: "Xin cấp lại y phục" while she is in trung y */
(function(){if(typeof invHTML!=="function")return;const h0=invHTML;invHTML=function(){let h=h0.apply(this,arguments);try{if(!eitReNeed())return h;
  const b=pbtn(`data-eitre="1"`,"Xin cấp lại y phục",`thành: lót tay, sai cung nữ đi xin hay viết thư về nhà`,Q.length?"đang có việc":"");
  const re=/(<div class="kinvpane kdoable" data-kinvpane="viec"[^>]*>)(\s*<div class="rbtn"[^>]*>)/;if(re.test(h))h=h.replace(re,`$1$2${b}`);else h=h.replace(/(<div class="kinvpane kdoable" data-kinvpane="viec"[^>]*>)/,`$1<div class="rbtn">${b}</div>`)}catch(e){console.error("eit inv",e)}return h}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-eitre]");if(!b)return;e.preventDefault();e.stopPropagation();if(b.disabled||!eitReNeed()||Q.length)return;Q.push(eitReDialog());showModal();render()},true);

/* ---------- 4. RƯƠNG ĐỒ KHUÊ CÁC (a new life, palace road) ---------- */
function girlChest(p,o){o=o||{};p=p||S;const L=[];const who=o.who||"Mẫu thân";p.inv=p.inv||[];
 try{wdOf(p)}catch(e){}/* jearn: the court's starting kit first */
 /* o.wear (the home road, jkc kcChest): she wears all of it; else (palace road) the court issue stays worn and the robe + hairpin go in the bag */
 try{if(WD_ITEMS.tramngoc){const e={k:"tramngoc",from:"kc",src:"kc",giver:who,d:typeof wdWhen==="function"?wdWhen():""};if(o.wear)wdWearEntry(p,e);else p.inv.push(e);L.push(e)}
  const yk=(o.wear&&typeof wdDefault==="function"?wdDefault(p,"y"):null)||wdPickAt(1,"y",0);if(yk&&WD_ITEMS[yk]){const e={k:yk,from:"kc",src:"kc",giver:who,d:typeof wdWhen==="function"?wdWhen():""};if(o.wear)wdWearEntry(p,e);else p.inv.push(e);L.push(e)}}catch(e){console.error("girlChest wd",e)}
 for(const k of ["vongbackc","ngocboikc","tuithom"]){if(!IT[k])continue;const sl=itm(k).sl;if(o.wear)p.inv.forEach(x=>{if(x&&x.w&&IT[x.k]&&itm(x.k).sl===sl)delete x.w});
  const busy=p.inv.some(x=>x&&x.w&&!x.h&&IT[x.k]&&itm(x.k).sl===sl);const e={k,from:"kc",giver:who};if(!busy)e.w=1;p.inv.push(e);L.push(e)}
 if(IT.khantay){const e={k:"khantay",from:"kc",giver:who,d:S.turn||0};p.inv.push(e);L.push(e)}
 p.girl=L.map(e=>e.k);return{who,L}}
function girlChestShow(c){if(!c||!c.L.length||window.__bot)return;try{if(typeof kitReward!=="function")return;
 const it=e=>{if(WD_ITEMS[e.k]&&!IT[e.k]){const w=WD_ITEMS[e.k];return{n:w.n,d:w.sl==="y"?"Y phục · cất trong Tư trang":"Cài tóc · cất trong Tư trang",img:w.icon,tier:w.g|0}}
  try{if(typeof kgItem==="function"){const r=kgItem(e);if(e.w)r.d=(r.d||"")+" · đang đeo";else if(WD_ITEMS[e.k]||(IT[e.k]&&itm(e.k).sl))r.d=(r.d||"")+" · cất trong Tư trang";return r}}catch(x){}const a=typeof itemArt==="function"?itemArt(e.k):null;const W=e.w?" · đang đeo":"";return{k:e.k,n:itm(e.k).n,d:(itm(e.k).d||"")+W,img:a?a.src:"",tier:a?a.grade|0:0}};
 kitReward({kind:"chest",title:"Rương đồ khuê các",from:`${c.who} sửa soạn · đồ con gái mang theo vào cung`,items:c.L.map(it)})}catch(e){console.error("girlChestShow",e)}}
window.girlChest=girlChest;window.girlChestShow=girlChestShow;
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(window.__nlInner&&S&&!S.dead&&!S.girl&&!S.kc&&!S.srv&&(S.turn||0)<=1){const c=girlChest(S,{});girlChestShow(c)}}catch(e){console.error("girlChest start",e)}return r}})();
window.eitPilfer=eitPilfer;window.eitReOpts=eitReOpts;window.eitReDialog=eitReDialog;window.eitWeek=eitWeek;
