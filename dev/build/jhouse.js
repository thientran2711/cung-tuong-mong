/* ================= HER HOUSEHOLD ON HER ROOM STAGE (review/servant-system, owner 16/11) =================
   Owner: her eunuchs and other household servants live in her room too. Before, the room stage (homePeople, j2) held only her
   trusted maid (S.maid) and her children; S.staff (every other maid / eunuch, j10) was reachable only from the Cung nhân tab.
   Now every household member stands on the room stage as a person {kind:"serv", ref:<servant>, sid}, after the maid and the
   children, highest servant rank first, maids before eunuchs at the same rank. The stage slot template (KIT 33.7, j59) places
   them: fixed slots, extra people on page 2+ through the "+N" / "‹" chips, she appears once. The head count (kitHereCount, Dư đồ)
   reads homePeople() and so counts them.
   Tapping one opens the same kit person card (popCard, j15) with the SAME acts as her trusted maid (Tâm sự, Sai đi dò la,
   Nghe ngóng chung: jwhy spyPick / spyMaidRun / spyNews with the servant as the agent) plus the Cung nhân tab's acts for that
   servant (Thưởng / Phạt or Tra khảo / Tha lỗi / Che chở: judgeServ j24; Hỏi chuyện: servAct j10; Giao việc phòng bị: j70;
   Xem người: j29; Tiến cử; Đổi người: fireServ j29). One rule for maids and eunuchs. Her trusted maid also gets Giao việc phòng bị
   on the stage (it existed only in the tab). No numbers are new: every act calls the existing function with its existing cost. */
function hsvOn(){return !!(S&&!S.dead&&!(typeof isSrv==="function"&&isSrv()))}
function hsvList(){if(!S||!Array.isArray(S.staff))return[];return S.staff.filter(s=>s&&s.sid!=null).slice().sort((a,b)=>(srk(b)-srk(a))||((a.role==="maid"?0:1)-(b.role==="maid"?0:1))||(a.sid-b.sid))}
function hsvInfo(s){const L=[srkName(s)];try{L.push(tuoi(s.age))}catch(e){}try{L.push(strShow(s))}catch(e){}L.push(`Lòng <b>${s.loyal}</b>`);try{if(typeof tinOf==="function")L.push(`Chủ tin <b>${tinOf(s)}</b>`)}catch(e){}
 try{const o=typeof ordOf70==="function"?ordOf70(s.sid):null;if(o&&ORD70[o.k])L.push(`Đang giữ việc: ${ORD70[o.k].n.toLowerCase()}`)}catch(e){}return L.join(" · ")}
function hsvPerson(s){return{kind:"serv",ref:s,sid:s.sid,name:s.name,ini:s.role==="maid"?s.name.split(" ").pop()[0]:"Hoạn",col:typeof kitServCol==="function"?kitServCol(s.role,srk(s)):"#8a8aa0",info:hsvInfo(s)}}
(function(){const h0=homePeople;homePeople=function(){const P=h0.apply(this,arguments);try{if(!hsvOn()||!Array.isArray(P)||P.some(p=>p&&p.kind==="serv"))return P;
  P.push(...hsvList().map(hsvPerson))}catch(e){console.error(e)}return P}})();
/* face: the servant's own face (pServ) */
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="serv"&&p.ref)return pServ(p.ref);return f0.apply(this,arguments)}})();
/* the card's lines follow the servant now (loyalty, trust, order), not the value when she entered the room */
(function(){const c0=popCard;popCard=function(p){try{if(p&&p.kind==="serv"&&p.ref)p.info=hsvInfo(p.ref)}catch(e){}return c0.apply(this,arguments)}})();
/* a servant who left the household (fired, bought away, died) leaves the stage: the home visit is rebuilt when the set changes */
function hsvKey(){return hsvList().map(s=>s.sid).join(",")}
(function(){const r0=renderStage;renderStage=function(){try{const V=S&&S.visit;if(hsvOn()&&V&&V.k==="home"&&S.place==="home"&&!S.out&&Array.isArray(V.people)){
  const have=V.people.filter(p=>p&&p.kind==="serv").map(p=>p.sid).sort((a,b)=>a-b).join(","),want=hsvList().map(s=>s.sid).sort((a,b)=>a-b).join(",");
  if(have!==want){const tk={};const old=V.people;const P=homePeople();P.forEach((p,i)=>{const j=old.findIndex(q=>q&&q.kind===p.kind&&q.name===p.name);if(j>=0&&V.tk&&V.tk[j])tk[i]=V.tk[j]});V.people=P;V.tk=tk;
   try{if(typeof popIdx==="number"&&popIdx!=null&&!(P[popIdx]&&old[popIdx]&&P[popIdx].name===old[popIdx].name)){popIdx=null;popMsg=""}}catch(e){}}}}catch(e){console.error(e)}return r0.apply(this,arguments)}})();
/* the acts: the maid's acts with this servant as the agent, then the Cung nhân tab's acts for this servant */
function hsvDone(lab,bf,ok){try{if(typeof resultShow==="function")setTimeout(()=>{try{resultShow(lab,bf,ok)}catch(e){}},0)}catch(e){}}
function hsvActs(s){const A=[],H=BAL.house;if(!s||!(S.staff||[]).includes(s))return A;const nm=s.name,he=s.role==="eunuch"?"hắn":"nàng";
 const c=s.cause,fault=c&&c.fault,merit=c&&!c.fault,tr=s.trouble!=null&&wk()-s.trouble<=4,spy=s.spyFor&&s.spyFor!=="me";
 /* 1. the trusted maid's acts (j2 Tâm sự numbers, jwhy dò la / nghe ngóng with this servant sent) */
 A.push({n:"Tâm sự",dom:"Sai bảo",o:100,x:`lòng ${nm} ${balSg(BAL.eff.jhouse.loyalRun)}`,run:()=>staffTam(S,s)});
 try{whyMaidInit(s);const t=spyTarget();
  if(!t)A.push({n:"Sai đi dò la",dom:"Mưu kế",lock:true,t:"không còn phi tần nào để dò",o:0});
  else A.push({n:"Sai đi dò la",dom:"Mưu kế",o:spyO(S,t,s),x:`nhắm: ${spyWho(t)} (chạm để chọn người khác) · biết 2 điều thật về nàng · chứng cứ ${balSg(BAL.eff.j78.evN)}`,/* previews: j78maidSpy */l:{},risk:`${nm} bị bắt gặp thì sợ hãi (lòng -${balAb(BAL.eff.jwhy.loyalSpyMaidRun)}) · nàng đoán ra: ${typeof pvOan==="function"?pvOan(t,5):"oán ta +5"}`,why:()=>spyFactors(S,t,s),act:1,open:()=>spyPick(2,s)});
  A.push({n:"Nghe ngóng chung",dom:"Mưu kế",o:100,x:`${nm} đi nghe ngóng: biết 1 điều thật trong cung (hay về người đang gây chuyện, người ${nm} quen bên ấy)${(S.mat||0)>=3?" · Tai mắt nhiều: thêm 1 điều":""}`,run:()=>spyNews(s)})}catch(e){console.error(e)}
 /* 2. the Cung nhân tab's acts for this servant (same functions, same costs); on the stage they also take the khắc the card shows
    (1, Hỏi chuyện 2 — j25 opens them without paying, so each pays here once it has run) */
 const pay=n=>{try{S.payOnPick=0;if(n)spend(n)}catch(e){}};
 const J=(n,how,c,x,risk,lock)=>A.push(Object.assign({n,dom:"Thưởng phạt",o:100,c,x},risk?{risk}:{},lock?{lock:true,t:lock}:{},{open:()=>{if(how==="thuong"&&S.bac<H.thuongBac)return;const bf=rsnap();judgeServ(s,how);pay(H.k);hsvDone(n,bf,true)}}));
 J(merit?`Thưởng vì ${c.txt}`:"Thưởng vô cớ","thuong",{bac:-H.thuongBac},merit?`lòng ${balSg(BAL.eff.j24.loyalJudgeServ_7)}, kẻ hầu khác lòng ${balSg(BAL.eff.j24.loyalJudgeServ_8)}`:`lòng ${balSg(BAL.eff.j24.loyalJudgeServ_9)} (ít hơn thưởng có cớ)`,"",S.bac<H.thuongBac?`thiếu bạc (cần ${H.thuongBac})`:"");
 if(spy)A.push({n:"Tra khảo",dom:"Thưởng phạt",o:100,x:`${he} khai là tai mắt của ai · lòng -${balAb(BAL.eff.j10.loyalServAct_2)}`,open:()=>{const bf=rsnap();servAct("phat",s.sid);pay(H.k);hsvDone("Tra khảo",bf,true)}});
 else J(fault?`Phạt vì ${c.txt}`:"Phạt vô cớ","phat",{},fault?`kỷ cương, kẻ hầu khác lòng ${balSg(BAL.eff.j24.loyalJudgeServ_2)} · lòng -${balAb(BAL.eff.j24.loyalJudgeServ)}`:`lòng -${balAb(BAL.eff.j24.loyalJudgeServ_3)}, Đức -${H.phatDuc}, kẻ hầu khác lòng -${balAb(BAL.eff.j24.loyalJudgeServ_4)}`,fault?"":`${he} mang hận; lòng dưới ${balAb(BAL.loy.out)} thì mỗi tuần bán mình cho phi tần khác: ${chanceW(15)}`);
 if(fault)J("Tha lỗi","tha",{},`lòng ${balSg(BAL.eff.j24.loyalJudgeServ_5)} · kẻ hầu khác lòng -${balAb(BAL.eff.j24.loyalJudgeServ_6)}`);
 if(tr)A.push({n:"Che chở (đang bị bắt tội)",dom:"Thưởng phạt",o:100,c:{danh:-H.cheDanh},x:`lòng ${balSg(BAL.eff.j10.loyalServAct_3)}`,open:()=>{const bf=rsnap();servAct("che",s.sid);pay(H.k);hsvDone("Che chở",bf,true)}});
 A.push({n:"Hỏi chuyện",dom:"Sai bảo",act:1,o:netIs(s,"talk")&&s.kn?70:40,x:`chứng cứ ${balSg(BAL.eff.j10.evServAct_2)} nếu quen người cung khác`,l:{},open:()=>{S.payOnPick=0;const bf=rsnap();servAct("hoi",s.sid);hsvDone("Hỏi chuyện",bf,true)}});
 if(typeof def70m==="function"&&typeof PEND!=="undefined"){let od=null;try{od=ordOf70(s.sid)}catch(e){}
  A.push({n:od?"Đổi việc phòng bị":"Giao việc phòng bị",dom:"Sai bảo",o:100,x:od?ordSub70(s.sid):"chọn canh cung, thử độc, theo dõi, giữ sổ sách",open:()=>{pay(H.k);Q.push(def70m({s:4,sid:s.sid}));showModal()}})}
 if(!s.kn)A.push(Object.assign({n:"Xem người",dom:"Sai bảo",o:100,c:{bac:-H.lookBac},x:"biết nết thật"},S.bac<H.lookBac?{lock:true,t:`cần ${H.lookBac} bạc`}:{},{open:()=>{S.payOnPick=0;if(S.bac<H.lookBac||!can(H.k))return;const bf=rsnap();apply({bac:-H.lookBac});spend(H.k);servLearn(s,"Cho người dò xét lai lịch");hsvDone("Xem người",bf,true)}}));
 A.push(Object.assign({n:"Tiến cử",dom:"Sai bảo",o:100,c:{bac:-H.upBac,danh:-H.upDanh},x:"công lao lên bậc +5"},S.bac<H.upBac?{lock:true,t:`cần ${H.upBac} bạc`}:{},{open:()=>{const bf=rsnap();recommend(s.sid);pay(H.k);hsvDone("Tiến cử",bf,true)}}));
 A.push(Object.assign({n:"Đổi người",dom:"Sai bảo",o:100,c:{bac:-H.swapBac,danh:-H.swapDanh},x:`trả ${nm.split(" ").pop()} về, người thay ngẫu nhiên, nết chưa rõ`,risk:`đuổi 2 người trong nửa năm: Danh -${H.swapTwiceDanh}${typeof servSellO==="function"&&servSellO(S,s)>0?` · ${he} đem chuyện của ngươi bán cho kẻ thù: ${chanceW(servSellO(S,s))}`:""}`},S.bac<H.swapBac?{lock:true,t:`thiếu bạc (cần ${H.swapBac})`}:{},{open:()=>{const bf=rsnap();servAct("doi",s.sid);pay(H.k);hsvDone("Đổi người",bf,true)}}));
 return A}
(function(){const t0=talkOpts;talkOpts=function(p){if(p&&p.kind==="serv"&&p.ref){try{return hsvOn()?hsvActs(p.ref):[]}catch(e){console.error(e);return[]}}
  const A=t0.apply(this,arguments);
  /* family fix: her trusted maid's stage card gets the tab's "Giao việc phòng bị" too */
  try{if(p&&p.kind==="maid"&&S.maid&&hsvOn()&&Array.isArray(A)&&typeof def70m==="function"&&!A.some(a=>a&&/việc phòng bị/.test(a.n))){let od=null;try{od=ordOf70("maid")}catch(e){}
   A.push({n:od?"Đổi việc phòng bị":"Giao việc phòng bị",dom:"Sai bảo",o:100,x:od?ordSub70("maid"):"chọn canh cung, thử độc, theo dõi, giữ sổ sách",open:()=>{try{S.payOnPick=0;spend(BAL.house.k)}catch(e){}Q.push(def70m({s:4,sid:"maid"}));showModal()}})}}catch(e){}
  return A}})();
/* family (LUẬT SỬA CẢ NHÓM): in lãnh cung the one servant who stayed with her (j14 cold: S.staff keeps one loyal servant) stands on
   that stage too, with the same card and acts; before, the stage held only the other fallen consorts */
(function(){if(typeof coldVisit!=="function")return;const c0=coldVisit;coldVisit=function(){const r=c0.apply(this,arguments);try{if(S&&S.out&&S.visit&&S.visit.k==="lc"&&Array.isArray(S.visit.people)&&!S.visit.people.some(p=>p&&p.kind==="serv"))S.visit.people.push(...hsvList().map(hsvPerson))}catch(e){console.error(e)}return r}})();
