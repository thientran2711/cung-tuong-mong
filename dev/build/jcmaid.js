/* ================= jcmaid: THE CLOSE MAID BY ORIGIN (D58, review/close-maid; owner APPROVED table v2, OD 16/11 s9 "close-maid") =================
   S.maid (cung nữ thân tín) now has: src (where she comes from), a random loyalty per game (range by src), ONE talent (tal, known),
   ONE secret (sec, hidden until she confides: secKn). Every number is in BAL.cmaid (jbal2.js). Counters for the bots: window.__cmN.
   SOURCE by origin (gain | loss):
    tt   home maid            trusted from day one (high loyalty)          | the father presses through her (dilemma "Thư nhà")
    dtq  home maid, martial   guards her: may stop an NPC's harm to her household (jmline cmGuard) | hot-tempered, brawls (dilemma)
    ch   Thái hậu's plant     Thái hậu hears good of her (Thái hậu thiện cảm +) | Thái hậu learns of every wrong she does (deedAdd hook)
    muoi home maid            bargains: part of her bribe money comes back | low birth scorned, faults found (dilemma)
    nc/bd home-country maid   a gift / letter from home now and then; cannot be bought | suspected spy, questioned (dilemma)
    thd  she PICKS one of several (palace-assigned)  trust lasts (slow decay, cannot be bought), she teaches her maids letters
         (her maids' merit +) | first months alone: low loyalty, the talent works only after pickAlone months
    td   palace-assigned + may meet an OLD FAMILY SERVANT (dilemma): loyal to death, knows the old case (chứng cứ vụ án +) |
         exposure endangers both (Danh, Thái hậu)
    cn   old roommate         knows every corner: true facts (proof) | knows her past: if she turns, Danh lost
    cnv  she picks (palace-assigned, at her rise)  wide gossip net: true facts | nobody behind her: bullied (dilemma)
   General rule: a maid who comes with her carries family ties (normal decay, the family's dilemmas); none → she chooses, and trust lasts.
   Talents (her and every consort's maid alike): theu (embroiders and sells: bạc), nghe (sharp ears: a true fact), thuoc (herbs: Sức),
   kin (close-mouthed: hard to buy). Secrets: lover / debt / family / spy, each costs her mistress until known; known → a choice.
   Old saves: a maid without src gets one (loyalty kept). The tiểu thư road at home (jkc) and the cung nữ road (jsrv) do nothing here. */
window.__cmN=window.__cmN||{};
function cmC(k,n){const N=window.__cmN;N[k]=(N[k]||0)+(n==null?1:n)}
function cmB(){return BAL.cmaid}
function cmOff(){try{return !S||window.__cmoff||!BAL.cmaid||(typeof isSrv==="function"&&isSrv())||(typeof isKc==="function"&&isKc())}catch(e){return true}}
const CM_SRC={tt:"home",dtq:"home",muoi:"home",nc:"land",bd:"land",ch:"th",thd:"pick",cnv:"pick",td:"palace",cn:"room"};
const CM_LBL={home:"từ nhà",land:"từ cố quốc",th:"người Thái hậu ban",pick:"tự tay chọn",palace:"Nội vụ phủ cắt cử",old:"gia nhân cũ",room:"bạn cùng phòng thuở làm cung nữ",noi:"Nội vụ phủ cắt cử"};
const CM_TAL={theu:"khéo thêu thùa",nghe:"thính tai",thuoc:"biết thuốc",kin:"kín miệng"};
const CM_SEC={lover:"đối thực với một thái giám",debt:"nợ cờ bạc ngoài cung",family:"mẹ già bệnh ở quê",spy:"từng nhận bạc của người cung khác"};
function cmRange(a){return a[0]+R(a[1]-a[0]+1)}
/* review/close-maid-r1: "kín miệng" only matters for a maid who can be bought; one who cannot (land / pick / old) gets another talent */
const CM_NOBUY=["land","pick","old"];
function cmTals(src){return Object.keys(CM_TAL).filter(k=>!(k==="kin"&&CM_NOBUY.includes(src)))}
function cmSecFor(){const k=pick(Object.keys(CM_SEC));const o={k};if(k==="spy"){/* planting a spy is a hostile act: only a consort with a motive (shared gate, OD:L35; schedules3-r4) */const L=liveRivals(true).filter(v=>v!==S&&(typeof motiveOK!=="function"||motiveOK(v,S,"spy").ok));const v=L.length?pick(L):null;if(!v)return{k:"debt"};try{if(typeof j95actLog==="function")j95actLog(v,S,"spy",motiveOK(v,S,"spy"))}catch(e){}o.by=v.id}return o}
/* a new maid of hers: src from the origin (or given), loyalty in that src's range, one talent, one secret */
function cmInit(m,src,keepLoy){if(!m||m.src)return m;const B=cmB();const k=S.origin&&S.origin.k;m.src=src||CM_SRC[k]||"noi";
 if(!keepLoy)m.loyal=cmRange(B.loy[m.src]||B.loy.noi);m.tal=m.tal||pick(cmTals(m.src));m.sec=m.sec||cmSecFor();m.secKn=0;m.at=S.turn||0;cmC("init_"+m.src);return m}
/* the maids of other consorts get a talent and a secret too (same rules for everyone) */
function cmInitNpc(p){const m=p&&p.maid;if(!m||m.tal)return;m.tal=pick(Object.keys(CM_TAL));m.sec={k:pick(["lover","debt","family"])};m.secKn=0}
function cmLabel(m){m=m||S.maid;const k=S&&S.origin&&S.origin.k;return CM_LBL[(m&&m.src)||CM_SRC[k]||"home"]||"từ nhà"}
/* the "Theo hầu" row of the Nhập cung card (j2): a picking origin has nobody yet */
function cmRow(){const k=S&&S.origin&&S.origin.k;if(CM_SRC[k]==="pick"&&!(S.maid&&S.maid.src&&S.cmaid&&S.cmaid.picked))return"Chưa có ai theo từ nhà: Nội vụ phủ đưa người đến để ngươi tự chọn";return `Cung nữ ${S.maid.name} (${cmLabel(S.maid)})`}
function cmInfo(m){m=m||S.maid;if(!m||!m.src)return"";return ` · ${CM_LBL[m.src]||""} · ${CM_TAL[m.tal]||""}${m.secKn&&m.sec?` · ${CM_SEC[m.sec.k]}`:""}`}
function cmTalOn(m){return m&&m.tal&&(m.src!=="pick"||(S.turn||0)-(m.at||0)>=cmB().pickAlone)}

/* ---------- she picks one of several (thd at the start; cnv when she rises) ---------- */
function cmCands(){const B=cmB();const L=[];for(let i=0;i<B.pickN;i++){let nm="";try{nm=mkServ("maid").name}catch(e){}if(!nm||L.some(c=>c.name===nm)||nm===(S.maid&&S.maid.name))nm=pick(MAIDS.filter(x=>!L.some(c=>c.name===x)))||pick(MAIDS);
 L.push({name:nm,loy:cmRange(B.loy.pick),age:BAL.cmaidx.age+R(BAL.cmaidx.ageR)})}const tals=cmTals("pick").sort(()=>Math.random()-.5);L.forEach((c,i)=>c.tal=tals[i%tals.length]);/* distinct talents to choose between */return L}
PEND.cmPick=pp=>{const L=pp.c||[];if(!L.length)return null;return{who:pMaid(),t:`Nội vụ phủ đưa ${L.length} cung nữ đến để ngươi chọn một người làm thân tín. Không ai theo ngươi từ nhà: người ngươi chọn sẽ gắn bó lâu, nhưng những tháng đầu còn lạ.`,
 o:L.map(c=>({n:`Chọn ${c.name}`,fx:{},x:`${CM_TAL[c.tal]} · thiện cảm ban đầu ${c.loy}`,go:()=>{const m=newMaid(c.name,c.loy,c.age);m.src="pick";m.tal=c.tal;m.sec=cmSecFor();m.secKn=0;m.at=S.turn||0;
  try{if(S.maid&&S.maid.fc)m.fc=S.maid.fc}catch(e){}S.maid=m;cmC("picked");log(`Ngươi chọn ${m.name} làm cung nữ thân tín.`)}}))}};
function cmAskPick(){if(cmOff()||!S.maid)return;const k=S.origin&&S.origin.k;if(CM_SRC[k]!=="pick"||S.maid.src)return;S.maid.src="pick";S.maid.at=S.turn||0;S.maid.tal=pick(cmTals("pick"));S.maid.sec={k:"family"};S.maid.loyal=cmRange(cmB().loy.pick);
 pushDil(mkP("cmPick",{c:cmCands()}),"Chọn cung nữ thân tín")}
(function(){if(typeof start!=="function")return;const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S)S.cmaid={v:1}/* a new life (old saves have no S.cmaid) */;if(S&&S.maid&&!cmOff()){const k=S.origin&&S.origin.k;if(CM_SRC[k]==="pick"){S.cmaid.picked=1;cmAskPick()}else cmInit(S.maid)}}catch(e){console.error("cmaid start",e)}return r}})();

/* ---------- the dilemmas (kit dilemma card: pushDil / PEND, saved like every other) ---------- */
function cmFoe(){const L=liveRivals(true).filter(v=>v!==S&&!v.coop);if(!L.length)return null;return L.slice().sort((a,b)=>hostility(b,S)-hostility(a,S))[R(Math.min(3,L.length))]}
PEND.cmTt=()=>{const B=cmB(),m=S.maid;return{who:pMaid(),t:`Thư phủ Tể tướng gửi vào qua tay ${m.name}: cha muốn ngươi dò ý Hoàng thượng về việc triều chính, viết lại cho người.`,o:[
 {n:"Làm theo lời cha",fx:{danh:B.ttDanh,sung:-B.ttSung},x:"phe cha mạnh thêm; Hoàng thượng thấy ngươi dò ý"},
 {n:`Dặn ${m.name} chỉ viết chuyện vặt`,fx:{maid:-B.ttLoy,bac:-B.ttBac},x:"cha giận, tháng này không gửi bạc vào cung"}]}};
PEND.cmBrawl=pp=>{const B=cmB(),m=S.maid,v=RV(pp.v);if(!v)return null;return{who:pMaid(),t:`${m.name} nóng tính, cãi rồi xô ngã cung nữ của ${v.name} ở Nội vụ phủ. Người bên ấy đòi ngươi xử.`,o:[
 {n:`Phạt ${m.name} trước mặt người ta`,fx:{maid:-B.brLoy,danh:B.brDanh},x:`${v.name} bớt oán`,go:()=>{oanAdd(v,S,-B.brOan)}},
 {n:"Bênh người của mình",fx:{maid:B.brLoy,danh:-B.brDanh},x:`${v.name} oán ngươi thêm`,go:()=>{oanAdd(v,S,B.brOan)}}]}};
PEND.cmScorn=pp=>{const B=cmB(),m=S.maid,v=RV(pp.v);if(!v)return null;const why=pp.w==="cnv"?"không ai chống lưng":"con nhà buôn muối";return{who:pMaid(),t:`Người của ${v.name} chê ${m.name} là ${why}, bới lỗi nàng ta trước mặt mọi người.`,o:[
 {n:"Nhịn cho yên chuyện",fx:{maid:-B.scLoy,danh:-B.scDanh},x:"nàng ta tủi thân"},
 {n:`Đòi ${v.name} một lời phải trái`,fx:{danh:B.scDanh,duc:-B.scDuc},x:`${v.name} oán ngươi thêm`,go:()=>{oanAdd(v,S,B.scOan)}}]}};
PEND.cmLand=()=>{const B=cmB(),m=S.maid;return{who:pMaid(),t:`Cung Chính ti nghi ${m.name} (người cố quốc, mặc áo quê nhà) là tai mắt nước ngoài, xin đưa đi tra hỏi.`,o:[
 {n:"Để Cung Chính ti tra hỏi",fx:{maid:-B.laLoy,th:B.laTh},x:"Thái hậu thấy ngươi biết phép"},
 {n:"Đứng ra bảo lãnh cho nàng ta",fx:{danh:-B.laDanh,th:-B.laTh*2,maid:Math.round(B.laLoy/2)},x:"triều thần nghi cả ngươi"}]}};
PEND.cmTd=()=>{const B=cmB();return{who:pMaid(),t:"Ở Tân Giả khố có một bà lão giặt đồ: gia nhân cũ của nhà ngươi, thoát chết năm cả nhà bị xử. Bà nhận ra ngươi.",o:[
 {n:"Xin bà về hầu",fx:{bac:-B.tdBac},x:"trung thành đến chết, biết vụ án cũ; nếu lộ, cả hai gặp nạn",go:()=>cmTdTake()},
 {n:"Làm như không quen",fx:{},x:"yên ổn"}]}};
function cmTdTake(){const B=cmB();const old=S.maid;const m=newMaid(pick(["Phúc thẩm","Lưu thẩm","Trương thẩm"].filter(x=>!(old&&old.name===x))),cmRange(B.loy.old),48+R(8));m.old=1;m.src="old";m.tal=pick(cmTals("old"));m.sec={k:"family"};m.secKn=1;m.at=S.turn||0;
 try{if(old){const s=mkServ("maid");Object.assign(s,{name:old.name,fc:old.fc||s.fc,loyal:old.loyal,age:old.age||s.age});(S.staff=S.staff||[]).push(s)}}catch(e){}
 S.maid=m;S.cmaid=S.cmaid||{};S.cmaid.tdOld=1;cmC("tdTake");if(S.caseEv!=null){S.caseEv+=B.tdCase;log(`${m.name} kể lại đêm nhà ngươi bị khám: chứng cứ vụ án +${B.tdCase}.`)}}
PEND.cmSec=pp=>{const B=cmB(),m=S.maid;if(!m||!m.sec)return null;const k=m.sec.k;const v=k==="spy"?RV(m.sec.by):null;
 const t=k==="debt"?`${m.name} quỳ xuống thú thật: nàng ta nợ cờ bạc ngoài cung, chủ nợ dọa báo lên Nội vụ phủ.`:k==="family"?`${m.name} khóc, kể mẹ già ở quê bệnh nặng, không có tiền thuốc.`:
  `${m.name} thú thật: trước kia nàng ta từng nhận bạc của ${v?v.name:"người cung khác"} để kể chuyện cung ngươi.`;
 const o=k==="spy"?[{n:"Giữ lại, dặn nàng ta chỉ báo chuyện vô hại",fx:{maid:B.secLoy},x:"từ nay không còn lộ chuyện"},{n:"Trả nàng ta về Nội vụ phủ",fx:{danh:-B.spyDanh},x:"Nội vụ phủ đưa người khác đến",go:()=>cmReplace("noi")}]:
  [{n:k==="debt"?`Trả nợ thay (${B.secPay} lượng)`:`Gửi tiền thuốc (${B.secPay} lượng)`,fx:{bac:-B.secPay,maid:B.secLoy*2},x:"nàng ta mang ơn"},{n:"Mặc kệ",fx:{maid:-B.secLoy},x:k==="debt"?"nợ vẫn còn đó":"nàng ta tủi thân"}];
 return{who:pMaid(),t,o:o.map(x=>Object.assign(x,{go:(g=>()=>{if(g)g();if(S.maid===m)m.sec.done=1})(x.go)}))}};
function cmReplace(src){const B=cmB();const m=newMaid(pick(MAIDS.filter(x=>x!==(S.maid&&S.maid.name))),B.newLoy);S.maid=m;cmInit(m,src||"noi");m.loyal=B.newLoy;cmC("replace")}

/* ---------- dtq: the martial maid stands in the way (called by jmline when an NPC's harm is aimed at her household) ---------- */
function cmGuard(t,p){try{if(t!==S||cmOff()||!S.maid||S.maid.src!=="home"||!S.origin||S.origin.k!=="dtq"||!roll(cmB().dtqGuard))return"";cmC("guard");
 return `${S.maid.name} (con nhà võ) chắn trước người của ${p.name}, việc không thành. `}catch(e){return""}}

/* ---------- ch: Thái hậu learns of every wrong she does ---------- */
(function(){if(typeof deedAdd!=="function")return;const d0=deedAdd;deedAdd=function(p,k){const d=d0.apply(this,arguments);try{if(p===S&&!cmOff()&&S.maid&&S.maid.src==="th"&&!S.thDead&&roll(cmB().chKnow)){
 S.th=cl((S.th||0)-cmB().chThDown,-100,100);cmC("chKnow");log(`Thái hậu biết chuyện ngươi ${d&&d.x?d.x:"làm điều sai"} (qua ${S.maid.name}). Thái hậu thiện cảm −${cmB().chThDown}.`)}}catch(e){}return d}})();
/* ---------- muoi: she bargains back part of her bribe money ---------- */
(function(){if(typeof bribeServ!=="function")return;const b0=bribeServ;bribeServ=function(a){const bac0=a===S?S.bac:0;const r=b0.apply(this,arguments);try{if(a===S&&!cmOff()&&S.maid&&S.maid.src==="home"&&S.origin&&S.origin.k==="muoi"){
 const paid=bac0-S.bac;if(paid>0){const back=Math.round(paid*cmB().muoiBack/100);if(back>0){S.bac+=back;cmC("muoiBack",back);log(`${S.maid.name} mặc cả giúp: lấy lại ${back} lượng bạc.`)}}}}catch(e){}return r}})();
/* ---------- buying her maid (j8 maidMonthP): who cannot be bought, whose trust lasts, the roommate who turns ---------- */
(function(){if(typeof maidMonthP!=="function")return;const m0=maidMonthP;maidMonthP=function(p){const m=p&&p.maid;if(p&&p.coop&&p!==S)return"";/* co-op (r1): the friend's maid is hers, her month runs on her own device (not on the host's copy) */try{if(m&&!cmOff()){const B=cmB();
  if(p!==S)cmInitNpc(p);
  const noBuy=p===S&&CM_NOBUY.includes(m.src);const kin=m.tal==="kin"&&cmTalOn(m)&&roll(B.kinSave);
  if(m.src==="old"){return""}/* loyal to death: no decay, cannot be bought */
  if(noBuy||kin){m.loyal=cl(m.loyal-BAL.eff.jcmaid.loyalTop,0,100);if(p===S&&m.src==="pick"&&roll(B.pickKeep))m.loyal=cl(m.loyal+BAL.eff.jcmaid.loyalTop_2,0,100);if(kin)cmC("kinSave");return""}
  if(p===S&&m.src==="pick"&&roll(B.pickKeep))m.loyal=cl(m.loyal+BAL.eff.jcmaid.loyalTop_3,0,100)}}catch(e){}
 const r=m0.apply(this,arguments);try{if(p===S&&m&&S.maid!==m){cmC("bought");if(S.maid&&!S.maid.src)cmInit(S.maid,"noi",true);if(m.src==="room"){apply({danh:-cmB().cnTurn});cmC("cnTurn");return r+`${m.name} biết chuyện cũ của ngươi thuở làm cung nữ, đem kể ra ngoài. Danh −${cmB().cnTurn}. `}}}catch(e){}return r}})();

/* AG-ALL-2 (jcmaid choices, owner OD 17/11 ~14:50Z): with the loop on (agOn) the close maid's "nghe" eavesdropping and the secrets SHE lets out
   (debt: she takes from the jewel box; spy: she reports to the one who bought her; family: her heart turns) are her CHOICE — a weighted draw between doing
   and not, weighted by the same % (talSpy / secOut) × her lòng (ag2Ch, as the other servant inclinations of AG-ALL-2): a loyal maid listens for her mistress more and leaks less, a disloyal one the
   other way (BAL.ag.stf2.cm: spy × lòng / talLoy, leak × (100 − lòng) / (100 − secTrust)). A secret affair FOUND by Cung Chính ti (lover)
   is not her choice: it stays the old witness roll. Loop off → the old rolls. */
function cmCh(m,w){if(!(window.agOn&&agOn()&&typeof ag2Ch==="function"))return null;return !!ag2Ch(m,cl(w,0,100))}/* a weighted draw of her inclination (j8 ag2Ch), no jmind slip: a slip would bend a rare monthly rate (3 %) several times over */
function cmSpyCh(m){const B=cmB(),K=BAL.ag.stf2.cm;const c=cmCh(m,B.talSpy*K.spy*(m.loyal||0)/B.talLoy);return c==null?roll(B.talSpy):c}
function cmLeakCh(m,s){const B=cmB(),K=BAL.ag.stf2.cm;if(!s||s.k==="lover")return roll(B.secOut);const c=cmCh(m,B.secOut*K.leak*(100-(m.loyal||0))/Math.max(1,100-B.secTrust));return c==null?roll(B.secOut):c}
/* ---------- the month ---------- */
function cmFact(m,who){const x=evGuilty(S,liveRivals(true).filter(v=>v!==S));if(!x)return"";const d=evA(S,x,BAL.eff.jcmaid.evD);if(!d)return"";cmC("fact");return `${m.name} ${who}: chứng cứ về ${x.name} +${d}. `}
function cmMonthMe(){const B=cmB(),m=S.maid;if(!m)return"";
 if(!m.src){const k0=S.origin&&S.origin.k;
  if(S.cmaid&&S.cmaid.v){/* a new life that reaches the palace now (tiểu thư road jkc, cung nữ road at her rise): pick, or the origin's maid
     (a maid who served her at home keeps the loyalty she built there) */if(CM_SRC[k0]==="pick"){if(!S.cmaid.picked){S.cmaid.picked=1;cmAskPick();return""}}else cmInit(m,null,!!m.kcTy)}
  else{S.cmaid={};cmInit(m,CM_SRC[k0]==="pick"?"noi":null,true)}/* old save: the maid she has stays, loyalty kept */}
 S.cmaid=S.cmaid||{};let ev="";const T=S.turn||0;S.cmaid=S.cmaid||{};const k=S.origin&&S.origin.k;const cdOk=(S.cmaid.cd||0)<=T;
 const dil=(id,pp)=>{S.cmaid.cd=T+B.dilCd;cmC("dil_"+id);pushDil(mkP(id,pp||{}),"Cung nữ thân tín")};
 /* talent */
 if(cmTalOn(m)&&m.loyal>=B.talLoy){if(m.tal==="theu"){apply({bac:B.talBac});cmC("talBac",B.talBac)}else if(m.tal==="thuoc"){S.suc=cl(S.suc+B.talSuc,0,sucCap(S));cmC("talSuc",B.talSuc)}else if(m.tal==="nghe"&&cmSpyCh(m))ev+=cmFact(m,"nghe lỏm được chuyện")}
 /* secret: costs her until known; she confides when she trusts her */
 const s=m.sec;if(s&&!s.done){if(!m.secKn){if(m.loyal>=B.secTrust&&roll(B.secTell)){m.secKn=1;cmC("secTell");if(s.k==="lover"){m.loyal=cl(m.loyal+B.secLoy,0,100);s.done=1;ev+=`${m.name} thú thật với ngươi chuyện đối thực với một thái giám; ngươi giữ kín cho nàng ta (thiện cảm +${B.secLoy}). `}else if(cdOk){dil("cmSec");return ev}}
   else if(cmLeakCh(m,s)){cmC("secOut_"+s.k);if(s.k==="lover"){apply({danh:-B.secDanh});m.loyal=cl(m.loyal-B.secLoy,0,100);m.secKn=1;s.done=1;ev+=`Cung Chính ti bắt được ${m.name} đối thực với một thái giám; người ta cười chê cung ngươi. Danh −${B.secDanh}. `}
    else if(s.k==="debt"){const g=Math.min(B.secBac,S.bac||0);apply({bac:-g});ev+=`Hộp trang sức vơi đi ${g} lượng; không ai biết ai lấy. `}
    else if(s.k==="family"){m.loyal=cl(m.loyal-Math.round(B.secLoy/2),0,100)}
    else if(s.k==="spy"){const v=RV(s.by);if(v&&v.alive){const d=evA(v,S,BAL.eff.jcmaid.evD_2);if(d)cmC("spyLeak",d)}}}}
  else if(cdOk&&s.k!=="lover"&&roll(B.secTell)){dil("cmSec");return ev}}
 /* origin */
 if(m.src==="home"&&k==="tt"&&cdOk&&roll(B.ttPress)){dil("cmTt");return ev}
 if(m.src==="home"&&k==="dtq"&&cdOk&&roll(B.dtqBrawl)){const v=cmFoe();if(v){dil("cmBrawl",{v:v.id});return ev}}
 if(((m.src==="home"&&k==="muoi")||(m.src==="pick"&&k==="cnv"))&&cdOk&&roll(B.scorn)){const v=cmFoe();if(v){dil("cmScorn",{v:v.id,w:k});return ev}}
 if(m.src==="land"){if(cdOk&&roll(B.landAsk)){dil("cmLand");return ev}if(roll(B.landGift)){apply({bac:B.landBac});cmC("landBac",B.landBac);ev+=`Thư và quà cố quốc đến qua tay ${m.name}: Bạc +${B.landBac}. `}}
 if(m.src==="th"&&!S.thDead&&m.loyal>=B.talLoy&&roll(B.chTh)){S.th=cl((S.th||0)+B.chThUp,-100,100);cmC("chTh",B.chThUp)}
 if(m.src==="pick"&&k==="thd"&&cmTalOn(m))for(const x of (S.staff||[]))if(x.role==="maid"&&typeof servMerit==="function"){servMerit(x,B.thdMerit);cmC("thdMerit",B.thdMerit)}
 if((m.src==="room"&&roll(B.cnSpy))||(m.src==="pick"&&k==="cnv"&&cmTalOn(m)&&roll(B.cnvNet)))ev+=cmFact(m,m.src==="room"?"thuộc từng ngóc ngách, dò ra":"nghe đám cung nữ đồn");
 if(k==="td"&&!S.cmaid.tdOld&&!S.cmaid.tdNo&&cdOk&&roll(B.tdMeet)){S.cmaid.tdNo=1;dil("cmTd");return ev}
 if(m.src==="old"&&roll(B.tdExpose)){apply({danh:-B.tdDanh,th:-B.tdTh});mlFx(typeof slapGive==="function"?slapGive:null,m,S,"bị tra hỏi chuyện nhà cũ");cmC("tdExpose");ev+=`<span class="r">Có kẻ khui ra ${m.name} là gia nhân nhà tội thần; cả hai bị tra hỏi.</span> Danh −${B.tdDanh}, Thái hậu thiện cảm −${B.tdTh}. `}
 return ev}
/* other consorts' maids: the same talents and secrets (host only in co-op: NPC state) */
function cmMonthNpc(){const B=cmB();let ev="";if(typeof mlGuest==="function"&&mlGuest())return"";for(const p of liveRivals(true)){if(!p||p===S||p.coop||!p.maid)continue;cmInitNpc(p);const m=p.maid;
 if(m.loyal>=B.talLoy){if(m.tal==="theu")p.bac=(p.bac||0)+B.talBac;else if(m.tal==="thuoc")p.suc=cl((p.suc||0)+B.talSuc,0,sucCap(p));else if(m.tal==="nghe"&&cmSpyCh(m)){const x=evGuilty(p,others(p));if(x)evA(p,x,BAL.ag.ev.one)}}
 const s=m.sec;if(s&&!m.secKn&&cmLeakCh(m,s)){cmC("npcSecOut");if(s.k==="lover"){p.danh=Math.max(0,(p.danh||0)-B.secDanh);m.secKn=1;if((S.mat||0)>=B.seeMat)ev+=`Cung Chính ti bắt được cung nữ thân tín của ${p.name} đối thực với một thái giám. `}else if(s.k==="debt")p.bac=Math.max(0,(p.bac||0)-B.secBac);else m.loyal=cl(m.loyal-Math.round(B.secLoy/2),0,100)}}
 return ev}
(function(){const m0=servMonth;servMonth=function(){let r=m0.apply(this,arguments)||"";try{if(!cmOff()){r+=cmMonthMe();r+=cmMonthNpc()}}catch(e){console.error("cmMonth",e)}return r}})();
