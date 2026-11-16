/* ================= jthaiy: THÁI Y — pulse checks, the mạch án, bribed / trusted physicians (owner 15/11 20:20Z, review/thaiy) =================
   Built on what exists (LUẬT ƯU TIÊN SỐ 1): the court physician S.court.ty (j10: name, af = thiện cảm per person, af.me = hers),
   her own trusted physician S.doctor / NPC p.doctor (j2/j7/j24 "thái y tâm phúc"), illness ILL/illOf/treat (j13), the pregnancy found
   3–6 weeks later (j75 S.pregUnk / S.pregDisc / pregFind — j75 still owns the finding card), tainted gifts TAINT (j8), plots j70 (M70
   routes, p.kn/p.kt/p.pend reveal), newsAdd/noteAdd. Numbers: BAL.thy (jbal.js).
   1. "Thỉnh bình an mạch" (free): every month in thượng tuần the Thái y viện sends the physician. Short verdict (Khỏe mạnh / Hơi yếu /
      Có bệnh), shallow: a hidden harm is only felt as "mạch có chỗ lạ" (BAL.thy.routineHint). The result goes into the mạch án of
      Thái y viện (S.thy.rec) — a record a bribed physician can leak (Qing custom, history notes idea #2).
      thaiyNextVisit() / thaiyVisits(n) give the calendar the visit days.
   2. "Mời thái y bắt mạch" anytime, two roads of equal weight (BALANCE 15/11 20:30Z):
      · bạc road: he comes to her palace — Bạc BAL.thy.cost[rank] (≈ 1/7 of her month's bổng), 1 khắc, discreet;
      · her own road: "Sang Thái y viện xin bắt mạch" — no bạc, 3 khắc + Sức -5, she is seen there (a rival may hear; a hidden
        pregnancy may be guessed), but with people around the reading is surer and a bribed physician lies less.
      A clearer reading: Sức as a number, the illness and its stage, and a chance (odds word) to find hidden harm: tainted gifts in her
      chest (xạ hương, chì, lông mèo, bùa), and j70 plots already touching her body (poison through gifts / rouge / incense, musk in the
      thuốc an thai) — found plots are revealed exactly like the other j70 reveals.
   3. Pregnancy: j75's auto-find stays. A requested check finds it from the 3rd week (one month) after conception; in the 2nd week the
      hỉ mạch is felt with BAL.thy.early odds. From the 2nd week a nausea hint (once) offers both roads. cycleLate(S) (jcycle, if built)
      adds a hint.
   4. A physician bribed by a hostile rival (S.court.ty.af[v.id] ≥ bribeAf, hostility ≥ bribeHost) who is not hers may lie (hide what he
      found, soften the verdict, delay the hỉ mạch) and leak her mạch án to the briber (a hidden pregnancy stops being hidden; an illness
      becomes a rumour). Trusted = her own physician (S.doctor) or the court physician who likes her (af.me ≥ trustAf and above every
      briber). treat() (j13) uses the same rule.
   NPCs, same rules (host only in co-op, inside rivalsMonth which jcoopworld mutes on the guest): hostile rivals bribe the physician
   (bạc), bribes fade; the monthly visit may find a hidden harm in a rival (tainted gift → removed + proof against the giver), unless a
   briber hostile to her holds the physician; her own trusted physician helps. Hỏi chuyện with a physician who likes her leaks a rival's
   mạch án to her (a hidden pregnancy / an illness). A j70 musk plot through the physician really buys him (af of the plotter).
   Co-op: S.court is a world key (bribes shared, af.me per player); S.thy / S.doctor are personal. Old saves: S.thy is made on first use. */
(function(){
const T=()=>BAL.thy;
function thy(){if(!S)return{};const z=S.thy=S.thy||{};z.rec=z.rec||[];return z}
function doc(){return S&&S.court&&S.court.ty||null}
function off(){return !S||S.dead||S.out||(typeof isSrv==="function"&&isSrv())}
function rk(){try{return Math.max(0,Math.min(7,typeof rkOf==="function"?rkOf(S):S.rank|0))}catch(e){return 0}}
function cost(){return T().cost[rk()]}
function docName(){const c=doc();return c&&c.name?c.name:"Thái y"}
function rv(v){return v&&v!==S&&v.alive!==false&&!v.out&&!v.coop}
/* ---------- trust and bribes (one rule: her, NPCs, treat()) ---------- */
function bribers(p){const c=doc();if(!c||!c.af)return[];return liveRivals(true).filter(v=>rv(v)&&v!==p&&(c.af[v.id]||0)>=T().bribeAf&&(()=>{try{return hostility(v,p)>=T().bribeHost}catch(e){return false}})()).sort((a,b)=>(c.af[b.id]||0)-(c.af[a.id]||0))}
function trusted(p){p=p||S;if(p.doctor)return true;if(p!==S)return false;const c=doc();if(!c||!c.af)return false;const me=c.af.me||0;
 const top=Math.max(0,...liveRivals(true).filter(rv).map(v=>c.af[v.id]||0));return me>=T().trustAf&&me>top}
function bribedBy(p){p=p||S;if(trusted(p))return null;return bribers(p)[0]||null}
window.thyBribedBy=bribedBy;window.thyTrusted=trusted;
/* ---------- what the pulse can read ---------- */
function tainted(p){return (p.inv||[]).filter(e=>e&&e.t&&e.by!==key(p)&&TAINT[e.t]&&["xa","chi","meo","bua"].includes(e.t))}
function plotsOnHer(){try{const z=S.j70;if(!z||!z.pl)return[];return z.pl.filter(p=>!p.end&&p.t==="me"&&!p.kn&&p.pg>=1&&(p.m==="poison2"||(p.m==="musk"&&S.preg)))}catch(e){return[]}}
const TW={xa:"dấu xạ hương",chi:"dấu chì ngấm dần",meo:"khí suyễn do lông thú",bua:"khí huyết bị hao mà không rõ vì sao"};
const TWHERE={xa:"túi thơm, hương trầm",chi:"son phấn",meo:"đệm gấm",bua:"túi thơm, đệm gấm"};
const PW={tra:"dấu độc ngấm chậm, như từ trà uống hằng ngày",son:"dấu chì, chu sa, như từ son phấn",huong:"dấu hương độc, như từ lò trầm trong phòng",ty:"dấu thuốc lạ trong thang an thai",hh:"dấu hồng hoa trong canh bổ",tsv:"dấu thuốc lạ trong thang an thai",xh:"dấu xạ hương"};
function sucWord(s){return s>=70?"khí huyết dồi dào":s>=50?"khí huyết điều hòa":s>=30?"khí huyết hơi hư nhược":"khí huyết rất suy nhược"}
function verdict(lie){const i=illOf(S);const s=S.suc||0;if(i&&!lie)return["Có bệnh","r"];if(s<40||(i&&lie))return["Hơi yếu","n"];return["Khỏe mạnh","g"]}
function wksPreg(){return S.preg&&S.pregUnk&&S.pregWk!=null?wk()-S.pregWk:-1}
function lateHint(){try{return typeof cycleLate==="function"&&cycleLate(S)}catch(e){return false}}
/* the j75 card finds it (j75 owns the card): bring its day to now */
function findPreg(){if(!S.pregUnk)return false;S.pregDisc=Math.min(S.pregDisc||wk(),wk());try{if(typeof pregFind==="function"){if(!Q.length)pregFind();else setTimeout(()=>{try{if(S&&S.pregUnk){pregFind();if(Q.length&&$("modal").hidden)showModal();render()}}catch(e){}},0)}}catch(e){}return true}
/* the mạch án leaks to the briber */
function leak(by,F){if(!by)return"";const L=[];try{
 if(F.preg&&S.preg&&S.hidden){S.hidden=false;by.ghen=cl((by.ghen||0)+6,0,100);noteAdd(by.id,`nhờ thái y mà biết ngươi đang mang thai`);L.push("có thai")}
 if(F.ill){const i=illOf(S);if(i){apply({danh:-2});try{newsAdd(by,"ty",`Mạch án của ${S.name} lọt ra ngoài: nàng mắc ${ILL[i.k].n.toLowerCase()}`)}catch(e){}L.push("bệnh")}}
 if(!L.length)noteAdd(by.id,`đọc được mạch án của ngươi qua thái y`);
 if(roll(cl(20+(S.mat||0)*8,5,90)))log(`<span class="r">Tai mắt báo: thái y vừa bắt mạch cho ngươi đã ghé cung ${by.name}.</span>`)}catch(e){console.error(e)}return L.join(", ")}
/* he comes and names himself: she knows the physician from then on (face reveal rule, j61) */
function meet(){try{const c=doc();if(c&&typeof k61Know==="function")k61Know(c,"",true,2)}catch(e){}}
function rec(kind,v){meet();const z=thy();z.rec.unshift({t:S.turn,m:S.month,y:S.year,k:kind,v});if(z.rec.length>12)z.rec.length=12}

/* ---------- 1. Thỉnh bình an mạch (monthly, free) ---------- */
function routine(){if(off())return;const z=thy();if(z.last===S.turn)return;z.last=S.turn;
 const tr=trusted(S),by=bribedBy(S);const lie=!!by&&roll(T().lie);const [vd,cls]=verdict(lie);const P=[];const F={};
 const who=S.doctor?"Thái y tâm phúc của ngươi":docName();
 P.push(`<p class="past">${when()}</p><p>Theo lệ đầu tháng, ${who} sang thỉnh bình an mạch.</p>`);
 P.push(`<p>Lời thái y: <b class="${cls}">${vd}</b>${illOf(S)&&!lie?` · ${illName(S)}`:""} · ${sucWord(S.suc||0)}.</p>`);
 if(illOf(S))F.ill=1;
 const hid=tainted(S).length+plotsOnHer().length;
 if(hid&&!lie&&roll(T().routineHint+(tr?T().routineTrust:0)))P.push(`<p class="r">Thái y nhíu mày: mạch có chỗ lạ, nên mời bắt mạch kỹ hơn.</p>`);
 const w=wksPreg();if(w>=3&&!(lie&&roll(50))){F.preg=1;findPreg()}
 else if(w===2||lateHint())P.push(`<p class="past">Thái y dặn ăn uống điều độ; tháng sau nếu kỳ kinh vẫn chậm thì mời bắt mạch lại.</p>`);
 if(!tr)P.push(`<p class="past">Mạch án được ghi vào sổ Thái y viện.</p>`);
 rec("routine",vd);
 if(by&&roll(T().leak))leak(by,F);
 log(`Thỉnh bình an mạch: ${vd}.`);
 if(cls!=="g"||P.some(x=>/class="r"/.test(x))||Q.length<3)Q.push({t:"Thỉnh bình an mạch",kind:"notice",who:pDoc(),h:P.join("")})}
(function(){if(typeof monthTick!=="function")return;const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{if(S&&!S.dead)routine()}catch(e){console.error(e)}return r};window.monthTick=monthTick})();
/* calendar (cal-plus): the visit days — thượng tuần of every month; this month's if it has not come yet */
function visitAt(ahead){const m0=(S.month||1)-1+ahead;return{turn:S.turn+ahead,month:(m0%12)+1,year:(S.year||1)+Math.floor(m0/12),tuan:0,n:"Thỉnh bình an mạch",free:true}}
window.thaiyNextVisit=function(){if(!S||off())return null;return visitAt(1)};/* routine() runs in monthTick, i.e. at the start of the next month */
window.thaiyVisits=function(n){if(!S||off())return[];const f=window.thaiyNextVisit();const a=f.turn-S.turn;const L=[];for(let i=0;i<(n||6);i++)L.push(visitAt(a+i));return L};

/* ---------- 2. Mời thái y bắt mạch (two roads) ---------- */
function findO(self){const o=T().find+(S.arts&&S.arts.y||0)*T().findY+(trusted(S)?T().findTrust:0)+(self?T().findSelf:0);return cl(o,5,95)}
function why(road){if(!S||S.dead)return"không được";if(S.out)return"ở lãnh cung, Thái y viện không cử người";if(typeof isSrv==="function"&&isSrv())return"phận cung nữ";
 if(road==="pay"){if((S.bac||0)<cost())return `cần ${cost()} bạc`;if(!can(T().khPay))return"hết khắc";return""}
 if(S.confined)return"đang bị cấm túc";if(!can(T().khSelf))return `cần ${T().khSelf} khắc`;if((S.suc||0)<20)return"Sức không đủ";return""}
function xLine(road){const tr=trusted(S);const self=road==="self";
 return `thành: rõ Sức, bệnh và có thai hay chưa · thấy mưu hại ngầm (nếu có): ${word(findO(self))} · kèm: ${self?"người trong cung thấy ngươi ở Thái y viện, thái y khó nói sai":"kín đáo, thái y đến tận cung"}${tr?"":", thái y chưa phải người của ngươi nên lời có khi không thật"}`}
function req(road,paid){const self=road==="self";if(!paid){if(why(road))return"";if(self){spend(T().khSelf);apply({suc:-T().sucSelf})}else{spend(T().khPay);apply({bac:-cost()})}}
 const z=thy();z.req=(z.req||0)+1;const tr=trusted(S),by=bribedBy(S);const lie=!!by&&roll(self?T().lieSelf:T().lie);
 const [vd,cls]=verdict(lie);const P=[];const F={};const who=S.doctor?"Thái y tâm phúc của ngươi":docName();
 P.push(`<p class="past">${when()}</p><p>${self?`Ngươi sang Thái y viện, ${who} đích thân bắt mạch.`:`${who} đến tận cung bắt mạch cho ngươi.`}</p>`);
 const i=illOf(S);P.push(`<p>Lời thái y: <b class="${cls}">${vd}</b> · Sức ${S.suc||0} · ${sucWord(S.suc||0)}${i&&!lie?` · ${illName(S)}`:""}.</p>`);if(i){F.ill=1;if(!lie)i.known=true}
 /* hidden harm */
 const o=findO(self);const tl=tainted(S),pl=plotsOnHer();const own=by&&pl.some(p=>p.r==="ty"&&p.a===by.id);let found=0;
 if(!lie){for(const e of tl)if(roll(o)){e.seen=1;found++;P.push(`<p class="r">Trong mạch có ${TW[e.t]}: hẳn có món đồ quanh ngươi bị ${TAINT[e.t].n} (${TWHERE[e.t]}). Nên đem đồ đi nghiệm độc.</p>`)}
  for(const p of pl){if(p.r==="ty"&&!S.doctor)continue;/* the plotting physician does not tell on himself */if(!roll(o))continue;found++;const a=RV(p.a);p.kn=1;try{p.kt.push(tellOf70(p,p.pg))}catch(e){}p.pend="seen";
   P.push(`<p class="r">Thái y nhận ra ${PW[p.r]||"dấu thuốc lạ"}: có kẻ đang ngầm hại ngươi.</p>`);if(a)try{noteAdd(a.id,`Thái y bắt mạch thấy ${PW[p.r]||"dấu thuốc lạ"}, có lẽ nàng ta đứng sau`)}catch(e){}}}
 if(!found&&!lie&&!(tl.length||pl.length))P.push(`<p class="past">Không thấy dấu độc, dấu thuốc lạ nào.</p>`);
 else if(!found)P.push(`<p class="past">Thái y không nói gì thêm.</p>`);
 if(own&&!S.doctor)rec("own",1);
 /* pregnancy */
 const w=wksPreg();
 if(w>=3&&!lie){F.preg=1;findPreg()}
 else if(w===2&&!lie&&roll(T().early+(tr?T().earlyTrust:0))){F.preg=1;findPreg()}
 else if(w>=2&&lie){S.pregDisc=Math.max(S.pregDisc||0,wk()+2);P.push(`<p class="past">Thái y nói chưa thấy hỉ mạch.</p>`)}
 else if(w===2||lateHint())P.push(`<p class="past">Mạch hơi hoạt, thái y chưa dám chắc; nên đợi ít hôm rồi bắt mạch lại.</p>`);
 else if(!S.preg)P.push(`<p class="past">Chưa có hỉ mạch.</p>`);
 if(!tr)P.push(`<p class="past">Mạch án được ghi vào sổ Thái y viện.</p>`);
 rec(self?"self":"pay",vd);
 if(by&&roll(T().leak))leak(by,F);
 /* her own road: seen at Thái y viện */
 if(self&&roll(T().seen)){const L=liveRivals(true).filter(rv);const v=L.length?pick(L):null;if(v){try{newsAdd(v,"ty",`${S.name} đích thân sang Thái y viện xin bắt mạch`,false)}catch(e){}
  if(S.preg&&S.hidden&&roll(T().seenPreg)){S.hidden=false;noteAdd(v.id,`thấy ngươi sang Thái y viện, đoán ngươi đã có thai`);P.push(`<p class="r">Lúc ra về, ngươi thấy người của ${v.name} đứng nhìn theo.</p>`)}}}
 log(`Mời thái y bắt mạch${self?" (sang Thái y viện)":""}: ${vd}${found?`, thấy ${found} điều đáng ngại`:""}.`);
 Q.push({t:"Thái y bắt mạch",kind:"notice",who:pDoc(),h:P.join("")});try{if($("modal").hidden)showModal()}catch(e){}try{render()}catch(e){}return ""}
window.thyReq=req;window.thyWhy=why;window.thyCost=cost;
/* deck cards (Hành sự): both roads, side by side, always */
(function(){if(typeof illCards!=="function")return;const c0=illCards;illCards=function(){const A=c0.apply(this,arguments);try{if(!off()){
  A.push({n:"Mời thái y bắt mạch",t:`Mời ${docName()} đến tận cung xem mạch.`,c:{bac:-cost()},o:100,k:T().khPay,w:{},dom:"Sức khỏe",lock:!!why("pay"),x:xLine("pay"),go:()=>req("pay",true)});
  A.push({n:"Sang Thái y viện xin bắt mạch",t:"Tự đi, đứng chờ thái y rảnh tay.",c:{suc:-T().sucSelf},o:100,k:T().khSelf,w:{},dom:"Sức khỏe",lock:!!why("self"),x:xLine("self"),go:()=>req("self",true)})}}catch(e){console.error(e)}return A};window.illCards=illCards})();
/* the physician's card (Hậu cung › Cung nhân, j15): a "Bắt mạch" group + the mạch án lines */
window.thyCardGroup=function(){if(!S)return null;return["Bắt mạch",[pbtn(`data-cv="bm" data-ck="ty"`,"Mời thái y bắt mạch",`tốn: Bạc -${cost()} · ${T().khPay} khắc · ${xLine("pay")}`,why("pay")),
 pbtn(`data-cv="bm2" data-ck="ty"`,"Sang Thái y viện xin bắt mạch",`tốn: Sức -${T().sucSelf} · ${T().khSelf} khắc · ${xLine("self")}`,why("self"))]]};
window.thyCardLines=function(){if(!S)return[];const z=thy();const L=[];const r=z.rec[0];
 if(r)L.push(`Lần bắt mạch gần nhất: <b>${r.v}</b> (tháng ${r.m})`);const n=window.thaiyNextVisit();if(n)L.push(`Thỉnh bình an mạch: thượng tuần tháng ${n.month}`);
 L.push(trusted(S)?`<span class="g">Là người của ngươi: mạch án giữ kín</span>`:"Chưa phải người của ngươi");return L};
(function(){if(typeof courtAct!=="function")return;const c0=courtAct;courtAct=function(a,k){
  if(k==="ty"&&(a==="bm"||a==="bm2")){if(!S||S.dead||Q.length)return;req(a==="bm"?"pay":"self");return}
  /* Hỏi chuyện: a physician who likes her tells her a rival's mạch án */
  if(k==="ty"&&a==="hoi"&&S&&!S.dead&&!Q.length&&can(2)&&doc()){const c=doc();const me=c.af.me||0;
   if(me>=T().askAf&&roll(cl(T().askBase+me/2,5,95))){const L=liveRivals(true).filter(v=>rv(v)&&((v.preg&&v.hidden)||(illOf(v)&&!illKnown(v))));const v=L.length?pick(L):null;
    if(v){spend(2);c.af.me=me+1;let t;if(v.preg&&v.hidden){t=`${v.name} đang mang thai, còn giấu`;noteAdd(v.id,"thái y kể: nàng ta đang mang thai, còn giấu")}else{v.ill.known=true;t=`${v.name} mắc ${ILL[v.ill.k].n.toLowerCase()}`;noteAdd(v.id,`thái y kể: nàng ta mắc ${ILL[v.ill.k].n.toLowerCase()}`)}
     log(`${c.name} hạ giọng kể mạch án: ${t}.`);render();return}}}
  return c0.apply(this,arguments)};window.courtAct=courtAct})();
/* the place Thái y viện: her own road from the physician there (she is already there: Sức only) */
(function(){if(typeof talkOpts!=="function")return;const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&p.kind==="ty"&&Array.isArray(A)&&!off())
  A.push({n:"Xin bắt mạch",c:{suc:-T().sucSelf},o:100,x:xLine("self"),lock:!!(S.out||(S.suc||0)<20),t:(S.suc||0)<20?"Sức không đủ":"",run:()=>req("self",true)})}catch(e){console.error(e)}return A};window.talkOpts=talkOpts})();

/* ---------- 3. nausea: a hint before the physician finds it ---------- */
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{
  if(S&&!S.dead&&w0!=null&&wk()!==w0&&!off()){const z=thy();const w=wksPreg();
   if(w>=2&&S.pregUnk&&z.nz!==S.pregWk&&roll(T().nausea)){z.nz=S.pregWk;const m=S.maid?`Cung nữ ${S.maid.name}`:"Cung nữ";
    Q.push({t:"Trong người khác lạ",kind:"notice",h:`<p class="past">${when()}</p><p>Mấy hôm nay ngươi biếng ăn, sáng ra hay buồn nôn, ngửi mùi tanh là khó chịu.</p><p>${m} thì thầm: hay là mời thái y xem mạch?</p>`,
     opts:[{n:"Mời thái y bắt mạch",fx:{},x:`tốn: Bạc -${cost()} · ${xLine("pay")}`,lk:()=>why("pay"),go:()=>{setTimeout(()=>req("pay"),0)}},
           {n:"Sang Thái y viện xin bắt mạch",fx:{},x:`tốn: Sức -${T().sucSelf} · ${xLine("self")}`,lk:()=>why("self"),go:()=>{setTimeout(()=>req("self"),0)}},
           {n:"Đợi thêm ít hôm",fx:{},x:"thái y sẽ tự nhận ra khi đến thỉnh bình an mạch",go:()=>{}}]});
    try{if($("modal").hidden)showModal()}catch(e){}}}}catch(e){console.error(e)}return r};window.endTurn=endTurn})();

/* ---------- 4 + NPCs: bribes, the monthly visit of every consort (host only in co-op) ---------- */
function npcMonth(){let ev="";const c=doc();if(!c)return ev;c.af=c.af||{};
 for(const id of Object.keys(c.af))if(id!=="me"&&c.af[id]>0)c.af[id]=Math.max(0,c.af[id]-T().npcDecay);
 for(const v of liveRivals(true)){if(!rv(v)||v.confined)continue;
  /* a hostile rival buys the physician (aims: her, or a rival who carries a child / holds the favour) */
  if((v.bac||0)>=T().npcBribeBac*2){const tg=[S].concat(liveRivals(true).filter(x=>rv(x)&&x!==v)).filter(t=>{try{return hostility(v,t)>=T().bribeHost&&(t.preg||(t===S?S.sung:t.sung||0)>=40)}catch(e){return false}});
   const ev2=/Hiểm độc|Tham vọng/.test(`${v.trait||""} ${v.trait2||""}`)?6:0;if(tg.length&&roll(T().npcBribe+ev2)){ap(v,{bac:-T().npcBribeBac});c.af[v.id]=(c.af[v.id]||0)+T().npcBribeAf;try{newsAdd(v,"ty",`Có người thấy ${v.name} cho mời thái y sang cung trò chuyện rất lâu`)}catch(e){}}}
  /* her monthly visit finds a hidden harm in her */
  const tl=tainted(v);const bad=bribedBy(v);if(tl.length&&!bad&&roll(T().npcFind+(v.doctor?T().npcFindDoc:0))){const e=pick(tl);v.inv.splice(v.inv.indexOf(e),1);const by=byKey(e.by);
   if(by&&by!==v){evA(v,by,1);try{oanAdd(v,by,8)}catch(x){}}try{newsAdd(v,"ty",`Thái y bắt mạch cho ${v.name}, thấy dấu ${TAINT[e.t].n}; món đồ ấy bị đem đi`,by===S)}catch(x){}
   if(by===S)ev+=`<span class="r">Thái y bắt mạch cho ${v.name}, lần ra món đồ ngươi đã tẩm: nàng ta nắm thêm 1 chứng cứ về ngươi.</span> `}
  const i=illOf(v);if(i&&!i.known&&!bad&&roll(T().npcFind+(v.doctor?T().npcFindDoc:0)))i.known=true}
 return ev}
window.thyNpcMonth=npcMonth;
(function(){if(typeof rivalsMonth!=="function")return;const r0=rivalsMonth;rivalsMonth=function(){let r=r0.apply(this,arguments);try{if(S&&!S.dead){const e=npcMonth();if(e)r=(r||"")+e}}catch(e){console.error(e)}return r};window.rivalsMonth=rivalsMonth})();
/* a j70 musk plot through the physician really buys him */
(function(){if(typeof newPlot70!=="function")return;const n0=newPlot70;newPlot70=function(a,t,m,rid){const p=n0.apply(this,arguments);try{if(p&&!p.end&&p.r==="ty"&&a&&a!==S&&doc()){const c=doc();c.af=c.af||{};c.af[a.id]=Math.max(c.af[a.id]||0,T().bribeAf+10)}}catch(e){}return p};window.newPlot70=newPlot70})();
})();
