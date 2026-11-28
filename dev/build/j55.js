/* ================= j55 TRIỀU ĐÌNH: năm nhà quyền thần đứng sau hậu cung; Quốc sự (biên cương, kho lúa) chi phối tâm trạng Hoàng thượng;
   sớ tấu về hậu cung; can chính (nhờ cha dâng sớ, biếu quà quyền thần, dò la, tung chứng cứ tham ô). Một luật cho mọi phi tần, kể cả ngươi. ================= */
const TD={so:32,soGap:2,ccBase:6,ccStep:7,npc:.6};
const TDOFF={"Tể tướng":"Tể tướng","Đại tướng quân":"Đại tướng quân","Lễ bộ":"Lễ bộ thượng thư","Hộ bộ":"Hộ bộ thượng thư","Hàn lâm":"Hàn lâm học sĩ"};

const TDAMB={"Tham vọng":1.6,"Xảo quyệt":1.4,"Kiêu ngạo":1.1,"Kín đáo":.8,"Khiêm nhường":.4,"Ân cần":.3};
function tdOn(){return !!(S&&!S.dead&&!(typeof isSrv==="function"&&isSrv()))}
function tdSur(n){const w=String(n||"").split(" ");return w.length>2?w.slice(0,w.length-2).join(" "):w[0]}
function trS(){if(!S)return null;if(S.trieu&&S.trieu.H)return S.trieu;
 const T={H:{},rel:{},bien:58+R(10),kho:58+R(10),news:[],de:{},clean:{},soT:-9,tyY:-9,praise:null};S.trieu=T;
 const usedS=new Set([S].concat(rivals||[]).map(p=>tdSur(p.name)));
 CLANS.forEach((c,i)=>{const mine=(c==="Tể tướng"&&S.origin.k==="tt")||(c==="Đại tướng quân"&&S.origin.k==="dtq");
  const h={c,isMin:1,name:nmNew("m",mine?{sur:tdSur(S.name)}:{avoidSur:usedS}),age:46+R(20),sex:"m",pow:mine?55+R(16):38+R(30),sk:35+R(35),af:{},dadOf:mine?"me":null};
  h.corrupt=roll(BAL.odb.j55.rbCorrupt+(nv(h,"corrupt")));T.H[c]=h});
 const k=(a,b)=>[a,b].sort().join("|");T.rel[k("Tể tướng","Đại tướng quân")]=-30;T.rel[k("Lễ bộ","Hàn lâm")]=30;
 for(let i=0;i<5;i++)for(let j=i+1;j<5;j++){const kk=k(CLANS[i],CLANS[j]);if(T.rel[kk]==null)T.rel[kk]=R(41)-20}
 return T}
function tdRel(a,b){const T=trS();if(!a||!b||a===b)return 0;return T.rel[[a,b].sort().join("|")]||0}
function tdRelAdd(a,b,n){const T=trS();if(!a||!b||a===b)return;const kk=[a,b].sort().join("|");T.rel[kk]=cl((T.rel[kk]||0)+n,-100,100)}
function tdRelW(v){return v>=BAL.cut.clanRel?"Đồng minh":v<=-BAL.cut.clanRel?"Đối đầu":"Bình thường"}
/* the house behind a consort (null when her family is not one of the five) */
function tdHouse(p){if(!p)return null;let c="";try{c=clanOf(p)}catch(e){}return CLANS.includes(c)?c:null}
function tdHead(c){const T=trS();return c&&T?T.H[c]:null}
function tdHeadOf(p){return tdHead(tdHouse(p))}
function tdMembers(c){return consorts().filter(p=>tdHouse(p)===c)}
function tdPow(c){const h=tdHead(c);return h?h.pow:40}
function tdPowAdd(c,n){const h=tdHead(c);if(!h||!n)return;h.pow=cl(Math.round(h.pow+n),0,100);if(h.dadOf==="me")S.dad=h.pow}
function tdName(p){return p===S?"ngươi":p.name}
/* is the father truly corrupt? fixed per father; the head's own house shades it */
function tdDadT(p){if(p===S){const h=tdHeadOf(S);if(h&&h.dadOf==="me")return !!h.corrupt}if(p.dadT==null){const h=tdHeadOf(p);p.dadT=roll(BAL.odb.j55.rbDadT+(h?nv(h,"dadT"):0))}return !!p.dadT}
function tdDadClear(p){if(p===S){const h=tdHeadOf(S);if(h&&h.dadOf==="me")h.corrupt=false;S.dadT=false}else p.dadT=false}
function deG(a,t){const T=trS();return ((T.de[key(a)]||{})[key(t)])||0}
function deA(a,t,n){const T=trS();const m=T.de[key(a)]=T.de[key(a)]||{};m[key(t)]=Math.max(0,(m[key(t)]||0)+n)}
function tdBacks(h,p){return h&&(h.af[key(p)]||0)>=BAL.tdCourt.backs}
function tdNews(h){const T=trS();T.news.unshift({w:`T${S.month}/${S.year}`,h});if(T.news.length>8)T.news.length=8}
/* the head's portrait: a court official from the figure pool, the old official face until it loads */
function pMin(h){try{faceFor(h,"official",h.age||50)}catch(e){}const fb=fsrc(h.fc,`img/face-official-${(Math.max(0,CLANS.indexOf(h.c))%4)+1}.webp`);let src=fb;try{src=porOf(h,fb)}catch(e){}return{src,ini:"Quan",col:"#7a6a50",rw:TDOFF[h.c]}}
(function(){const r0=figRoles;figRoles=function(who){if(who&&who.isMin)return["official"];return r0.apply(this,arguments)}})();
(function(){const f0=facesPresent;facesPresent=function(){const U=f0.apply(this,arguments);try{const T=S&&S.trieu;if(T&&T.H)for(const c in T.H)if(T.H[c].fc)U.add(T.H[c].fc)}catch(e){}return U}})();

/* ---------- can chính: the same risk for everyone who meddles ---------- */
function ccRisk(a){return cl(Math.round(TD.ccBase+(a.cc||0)*TD.ccStep-(a.tamco||0)/10),3,45)}
function ccWord(a){return chanceLo(ccRisk(a))}/* ONE CORE: side chance → the Rất thấp … Rất cao scale (owner OD:L221, j1 chanceLvl); was its own 30/15 cao/vừa/thấp */
function ccLine(a){/* previews: ccStep */return `lộ chuyện can chính (nguy cơ ${ccWord(a)}): cấm túc 1–3 tháng, Thái hậu với ${a===S?"ngươi":"nàng"} -8, Hoàng hậu với ${a===S?"ngươi":"nàng"} ${balSg(BAL.eff.j55.ccStep)}`}
function ccStep(a){a.cc=(a.cc||0)+1;a.ccT=S.turn;if(!roll(ccRisk(a)))return"";a.cc=0;window.__tdOk=false;
 const q=queenP();if(a===S){apply({th:-8});if(q&&q!==S)apply({hh:BAL.eff.j55.ccStep})}else{a.th=(a.th||0)-8;if(q&&q!==a&&q!==S)affAdd(q,a,BAL.eff.j55.ccStep);if(q===S)affAdd(S,a,BAL.eff.j55.ccStep_2)}
 punish(a,"hậu cung can chính",1);const ns=typeof minNsName==="function"?minNsName("Ngự sử"):"Ngự sử";const r=`<span class="r">${ns} dâng sớ hặc ${tdName(a)} can dự chính sự: Thái hậu, Hoàng hậu không vui.</span> `;tdNews(`${ns} hặc ${tdName(a)} can chính; ${a===S?"ngươi":"nàng"} bị cấm túc.`);return r}

/* ---------- the four court acts (one function per act, for her and for every NPC) ---------- */
function giftO(a,h){return odA(a,45+(nv(h,"giftO"))+rkOf(a)*3+(tdHouse(a)===h.c?15:0)+(h.af[key(a)]||0)/5)}
function askO(a){return odA(a,30+tdPow(tdHouse(a))/2+mm()/2)}
function probeO(a){return odA(a,35+eyes(a)*6+(a.tamco||0)/5)}
function leakO(a,t){return odA(a,30+deG(a,t)*15+(tdPow(tdHouse(a))-tdPow(tdHouse(t)))/4+(S.emp.mood>=2?8:0))}
function traceO(a){return cl(Math.round(35-(a.tamco||0)/4),10,40)}
function tdGift(a,h){if(!h||a.bac<BAL.bacFee.tdGift)return"";ap(a,{bac:-BAL.bacFee.tdGift});const k=key(a);let r;
 window.__tdOk=false;if(aRoll(giftO(a,h),a)){window.__tdOk=true;h.af[k]=cl((h.af[k]||0)+BAL.tdCourt.giftAf,-100,100);r=`${TDOFF[h.c]} ${h.name} nhận lễ vật của ${tdName(a)}: người ấy quý ngươi +${BAL.tdCourt.giftAf}${tdBacks(h,a)?(h.ns?`, nay nể ${a===S?"ngươi":"nàng"}, khó lòng dâng sớ hặc`:`, nay đứng sau ${a===S?"ngươi":"nàng"}`):""}. `}
 else if(hasT(h,"Cương trực")){h.af[k]=cl((h.af[k]||0)+BAL.eff.j55.tdGiftHead,-100,100);a.cc=(a.cc||0)+1;r=`${TDOFF[h.c]} ${h.name} trả lại lễ vật của ${tdName(a)}, còn nói ra ngoài: người ấy quý ngươi ${balSg(spSee("rel",BAL.eff.j55.tdGiftHead))}, can chính thêm nặng. `}
 else r=`${TDOFF[h.c]} ${h.name} nhận quà của ${tdName(a)} nhưng chưa hứa gì (Bạc -${BAL.bacFee.tdGift} mất trắng). `;
 return r+ccStep(a)}
function tdAsk(a){const c=tdHouse(a);if(!c)return"";tdPowAdd(c,BAL.eff.j55.tdAsk);a.askT=S.turn;let r;
 window.__tdOk=false;if(aRoll(askO(a),a)){window.__tdOk=true;ap(a,{danh:BAL.eff.j55.danhTdAsk,sung:BAL.eff.j55.sungTdAsk});if(a!==S)a.dad=cl((a.dad||40)+3,0,100);r=`Cha ${tdName(a)} dâng sớ tâu đức hạnh của con gái; Hoàng thượng để ý: ${a===S?`Danh ${balSg(BAL.eff.j55.danhTdAsk)} · ${sgStat(BAL.eff.j55.sungTdAsk)}`:"nàng được khen"}. Nhà ${c} thế lực ${balSg(BAL.eff.j55.tdAsk)} vì dốc vốn liếng. `;tdNews(`Một quan nhà ${c} dâng sớ khen ${tdName(a)}.`)}
 else{ap(a,{danh:BAL.eff.j55.danhTdAsk_2});r=`Sớ của cha ${tdName(a)} bị Hoàng thượng gác lại${a===S?`: Danh ${balSg(BAL.eff.j55.danhTdAsk_2)}`:""}; nhà ${c} thế lực ${balSg(BAL.eff.j55.tdAsk)}. `}
 return r+ccStep(a)}
function tdProbe(a,t){if(a.bac<BAL.bacFee.tdProbe||!tdHouse(t))return"";ap(a,{bac:-BAL.bacFee.tdProbe});let r="";
 window.__tdOk=false;if(aRoll(probeO(a),a)){window.__tdOk=true;if(tdDadT(t)){deA(a,t,BAL.ag.ev.one);r=`Người của ${tdName(a)} dò được sổ sách: cha của ${tdName(t)} (nhà ${tdHouse(t)}) có tham ô. ${evSg(BAL.ag.ev.one,1)} (có ${deG(a,t)}). `}
  else{if(a===S)trS().clean[key(t)]=S.turn;r=`Người của ${tdName(a)} dò kỹ: cha của ${tdName(t)} thanh liêm, không có gì để hặc. `}}
 else r=`Người của ${tdName(a)} đi dò nhà ngoại ${tdName(t)} nhưng không moi được gì (Bạc -${BAL.bacFee.tdProbe} mất). `;
 if(roll(25)){relAdd(a,t,BAL.eff.j55.tdProbe);oanAdd(t,a,BAL.eff.j55.tdProbe_2);r+=`${t===S?"Ngươi":t.name} biết chuyện ${tdName(a)} sai người dò nhà mình: hai bên quý nhau ${balSg(BAL.eff.j55.tdProbe)}. `}
 return r+ccStep(a)}
/* review/net-ghen-2 (law 11): a traced leak = oanAdd(t,a,tdLeak_2) + relAdd(a,t,tdLeak_3) (its own oán, j9 relOan) → ONE total for the card and the result */
function tdLeakOan(){const n3=BAL.eff.j55.tdLeak_3,k=BAL.relOan;return BAL.eff.j55.tdLeak_2+(n3<0?-n3*k.hurt:-n3*k.mend)}
function tdLeakSay(t,lab,d){return `${pvOan(t,tdLeakOan(),lab)}, ${d==null?pvQuy(t,BAL.eff.j55.tdLeak_3,"thiện cảm"):`thiện cảm ${balSg(d)}`}`}/* PVQUY-POST: card (no d) = the preview; result line (after relAdd) passes d = the real rise (affGot) */
function tdLeak(a,t){const n=deG(a,t);if(n<1||a.bac<BAL.bacFee.tdLeak)return"";ap(a,{bac:-BAL.bacFee.tdLeak});const cA=tdHouse(a),cT=tdHouse(t);let r;
 window.__tdOk=false;if(aRoll(leakO(a,t),a)&&tdDadT(t)){window.__tdOk=true;tdPowAdd(cT,BAL.eff.j55.tdLeak);t.dad=cl((t.dad||40)+BAL.eff.j55.dadCut,0,100);ap(t,{danh:BAL.eff.j55.danhDadCut});tdDadClear(t);deA(a,t,-n);if(cA)tdRelAdd(cA,cT,-10);
  r=`<b>${typeof minNsName==="function"?minNsName("Ngự sử"):"Ngự sử"} dâng chứng cứ: cha của ${tdName(t)} tham ô, bị cách chức.</b> Nhà ${cT} thế lực ${balSg(BAL.eff.j55.tdLeak)}; ${t===S?`ngươi mất chỗ dựa: nhà mẹ đẻ ${balSg(BAL.eff.j55.dadCut)}, Danh ${balSg(BAL.eff.j55.danhDadCut)}`:`${t.name} mất chỗ dựa (nhà mẹ đẻ ${balSg(BAL.eff.j55.dadCut)}, Danh ${balSg(BAL.eff.j55.danhDadCut)})`}. `;tdNews(`Cha của ${tdName(t)} bị cách chức vì tham ô; nhà ${cT} suy.`)}
 else{deA(a,t,-BAL.ag.ev.one);r=`Chứng cứ tham ô cha ${tdName(t)} dâng lên bị bác vì chưa đủ (${evSg(-BAL.ag.ev.one)}). `}
 if(roll(traceO(a))){oanAdd(t,a,BAL.eff.j55.tdLeak_2);const dL=affGot(t,a,()=>relAdd(a,t,BAL.eff.j55.tdLeak_3));const h=tdHead(cT);if(h)h.af[key(a)]=cl((h.af[key(a)]||0)+BAL.tdCourt.leakHead,-100,100);r+=`<span class="r">Tra ra người đứng sau là ${tdName(a)}: ${tdLeakSay(t,`${t===S?"ngươi":t.name} oán`,dL)}${h?`, ${TDOFF[h.c]} ${h.name} quý ngươi ${balSg(BAL.tdCourt.leakHead)}`:""}.</span> `}
 return r+ccStep(a)}

/* ---------- Quốc sự: realm state drives the Emperor's mood and his visits ---------- */
moodMonth=function(){const E=S.emp,T=trS();if(!T)return"";
 T.bien=cl(Math.round(T.bien+(60-T.bien)*.08),0,100);T.kho=cl(Math.round(T.kho+(60-T.kho)*.08),0,100);
 let L=[["mua",2],["cong",2],["yen",4],["lut",1.5],["han",1.5],["tham",2],["giac",T.hoaT!=null&&S.turn-T.hoaT<36?.8:2]];if(has("nongnay"))L=L.filter(x=>x[0]!=="yen");if([1,7,8].includes(S.month))L.push(["hoi",3]);
 let r=Math.random()*L.reduce((s,x)=>s+x[1],0),i=0;while(r>L[i][1]&&i<L.length-1){r-=L[i][1];i++}const k=L[i][0];let m=1,t="";const HB=T.H["Hộ bộ"],DT=T.H["Đại tướng quân"];
 if(k==="mua"){T.kho=cl(T.kho+12,0,100);tdPowAdd("Hộ bộ",BAL.eff.j55.top);m=0;t=`Được mùa khắp nơi, Hoàng thượng vui vẻ. Kho lúa +12; nhà Hộ bộ thế lực ${balSg(BAL.eff.j55.top)}.`}
 else if(k==="cong"){T.bien=cl(T.bien+8,0,100);tdPowAdd("Lễ bộ",BAL.eff.j55.top_2);m=0;t=`Sứ thần các nước vào triều cống, ngài rất vui. Biên cương +8; nhà Lễ bộ đón sứ, thế lực ${balSg(BAL.eff.j55.top_2)}.`}
 else if(k==="hoi"){m=0;t="Ngày hội trong cung, ngài vui."}
 else if(k==="yen"){const lo=Math.min(T.bien,T.kho);m=lo<35?2:(lo>=72&&roll(40)?0:1);t=m===2?`Không có biến lớn, nhưng ${T.bien<T.kho?"biên cương còn bất ổn":"kho lúa còn vơi"}; ngài vẫn lo nghĩ.`:m===0?"Bốn bề yên ổn, kho lúa đầy, ngài thư thái.":""}
 else if(k==="lut"||k==="han"){T.kho=cl(T.kho-18,0,100);const o=cl(35+HB.pow/3+HB.sk/3,10,90);const ok=roll(o);
  if(ok){T.kho=cl(T.kho+8,0,100);tdPowAdd("Hộ bộ",BAL.eff.j55.top_3);m=2;t=`${k==="lut"?"Lũ lụt ở Giang Nam":"Hạn hán miền bắc"}, Hoàng thượng phiền muộn. Hộ bộ thượng thư ${HB.name} mở kho cứu đói kịp thời: kho lúa -10, nhà Hộ bộ thế lực ${balSg(BAL.eff.j55.top_3)}.`}
  else{T.kho=cl(T.kho-6,0,100);tdPowAdd("Hộ bộ",BAL.eff.j55.top_4);m=T.kho<30?3:2;t=`${k==="lut"?"Lũ lụt ở Giang Nam":"Hạn hán miền bắc"}; cứu tế chậm trễ, dân đói. Kho lúa -24, nhà Hộ bộ thế lực ${balSg(BAL.eff.j55.top_4)}. ${m===3?"Ngài giận dữ.":"Ngài ăn ngủ không yên."}`}}
 else if(k==="tham"){T.kho=cl(T.kho-8,0,100);const c=pick(CLANS.filter(x=>T.H[x].corrupt).concat(CLANS));tdPowAdd(c,BAL.eff.j55.top_5);m=3;t=`${typeof minNsName==="function"&&minOn()?minNsName("")+" phát giác quan tham":"Quan tham bị phát giác"} trong đám môn sinh nhà ${c}, Hoàng thượng nổi giận. Kho lúa -8, nhà ${c} thế lực ${balSg(BAL.eff.j55.top_5)}.`}
 else if(k==="giac"){T.bien=cl(T.bien-18,0,100);const hoa=window.__tdHoa||0;const o=cl(35+DT.pow/3+DT.sk/3+hoa,10,92);const ok=roll(o);
  if(ok){T.bien=cl(T.bien+14,0,100);tdPowAdd("Đại tướng quân",BAL.eff.j55.top_6);m=1;T.praise="Đại tướng quân";t=`Biên ải có giặc cướp phá; Đại tướng quân ${DT.name} đánh lui được, nhưng hao binh. Biên cương -4, nhà Đại tướng quân thế lực ${balSg(BAL.eff.j55.top_6)}.`}
  else{T.bien=cl(T.bien-8,0,100);tdPowAdd("Đại tướng quân",BAL.eff.j55.top_7);m=3;t=`Biên ải có giặc cướp phá; quân của Đại tướng quân ${DT.name} thua trận. Biên cương -26, nhà Đại tướng quân thế lực ${balSg(BAL.eff.j55.top_7)}. Ngài giận dữ.`}}
 if(m<2&&Math.min(T.bien,T.kho)<25){m=2;t+=" Quốc khố, biên phòng đều nguy, ngài không vui nổi."}
 E.mood=m;if(t&&k!=="yen"&&k!=="hoi")tdNews(t.replace(/<[^>]+>/g,""));return t?`Tháng này: ${t} `:""};
/* hard times: he comes to the harem less (the night simply passes for everyone) */
(function(){const f0=flip;flip=function(){try{const T=S&&S.trieu;if(T&&tdOn()&&!(typeof empOn==="function"&&empOn())/* AG2: the crisis makes him busy (empBusy → BAL.ag.emp.summon) */&&Math.min(T.bien,T.kho)<30&&roll(30)){S.tonight=null;return}}catch(e){}return f0.apply(this,arguments)}})();
function tdCrisis(){const T=trS();return T&&Math.min(T.bien,T.kho)<30}

/* ---------- seats: a minister who backs a consort adds weight; her own house through her father ---------- */
function tdBackW(p){const T=S&&S.trieu;if(!T||!T.H)return 0;let w=0;for(const c in T.H){const h=T.H[c];if(c!==tdHouse(p)&&tdBacks(h,p))w+=h.pow/8}return Math.min(12,w)}
(function(){const s0=seatW;seatW=function(p){let w=s0.apply(this,arguments);try{w+=tdBackW(p)}catch(e){}return w}})();
(function(){if(typeof backers!=="function")return;const b0=backers;backers=function(p){const L=b0.apply(this,arguments);try{const T=S&&S.trieu;if(T&&T.H)for(const c in T.H){const h=T.H[c];if(c!==tdHouse(p)&&tdBacks(h,p))L.push(`${TDOFF[c]} ${h.name}`)}}catch(e){}return L}})();

/* ---------- memorials on harem matters (at most one a month) ---------- */
/* a plea to name the legitimate heir is open: the heir is not the queen's son while a grown legitimate son lives (one gate: j55 + jagmin) */
function tdDichOpen(){return typeof kvDebate==="function"&&S.heir&&S.heir.k&&S.heir.k.alive&&typeof kvOrder==="function"&&typeof kvQueenMom==="function"&&!kvQueenMom(S.heir.v)&&kvOrder().some(x=>x.dich&&!x.k.heir&&x.k.age>=6)}
function tdSoMonth(force){const T=trS();if(!force&&(S.turn-T.soT<TD.soGap||!roll(TD.so)))return"";const opts=[],SB=BAL.ag.why.g2b.so;/* npc-purpose G2: each memorial has a named clan head with a stake; weights = that stake (jagmin's minister agents pick it when agOn; this is the agents-off path) */
 if(T.praise&&T.H[T.praise])opts.push(["praise",SB.praise+T.H[T.praise].pow*SB.praisePow]);
 if(tdDichOpen()){const q=queenP();const c=q&&q!==S?tdHouse(q):S.rank>=7?tdHouse(S):null;const h=T.H[c||"Lễ bộ"];opts.push(["dich",(h?h.pow:0)*SB.dich])}
 const imp=tdImpPick();if(imp)opts.push(["imp",(imp[2]||1)*SB.imp]);
 const ty=CLANS.filter(c=>T.H[c].pow>=BAL.ag.min.tuyen.pow);if(ty.length&&T.tyY!==S.year&&liveRivals(true).length+1<BAL.harem.cap-1&&roomFor("consort"))opts.push(["tuyen",(Math.max(...ty.map(c=>T.H[c].pow))-SB.tuyen0)*SB.tuyen]);
 const cc=consorts().filter(p=>(p.cc||0)>=2);if(cc.length)opts.push(["cc",Math.max(...cc.map(p=>p.cc||0))*SB.cc]);
 const f=force&&opts.find(x=>x[0]===force);let k;if(f)k=f[0];else{const pk=npwPick(opts,x=>x[1]);if(!pk)return"";k=pk[0]}/* npc-purpose G2: the strongest stake speaks (TD.so above = whether one reaches the throne this month) */
 T.soT=S.turn;let ev="";
 if(k==="praise"){const c=T.praise;T.praise=null;const h=T.H[c];tdPowAdd(c,BAL.eff.j55.tdSoMonth);const M=tdMembers(c);M.forEach(p=>ap(p,{danh:BAL.eff.j55.danhSoMonth}));
  ev=`<b>Sớ khen:</b> ${typeof minBy==="function"?minBy("triều thần"):"triều thần"} dâng sớ ca ngợi ${TDOFF[c]} ${h.name}. Nhà ${c} thế lực ${balSg(BAL.eff.j55.tdSoMonth)}; ${M.length?`phi tần nhà ấy được thơm lây (Danh ${balSg(BAL.eff.j55.danhSoMonth)}): ${M.map(tdName).join(", ")}`:"trong cung chưa có phi tần nhà ấy"}. `;
  tdNews(`${window.MINP&&MINP.h?`${TDOFF[MINP.h.c]} ${MINP.h.name} dâng sớ khen`:"Sớ khen"} ${TDOFF[c]} ${h.name}; nhà ${c} được thơm lây.`);if(M.includes(S))tdPop("Sớ khen nhà ngươi",h,`<p>${typeof minBy==="function"?minBy("Triều thần"):"Triều thần"} dâng sớ ca ngợi ${TDOFF[c]} ${h.name}. Nhà ${c} thế lực ${balSg(BAL.eff.j55.tdSoMonth)}.</p><p class="g">Ngươi là người nhà ${c}, được thơm lây: Danh ${balSg(BAL.eff.j55.danhSoMonth)}.</p>`)}
 else if(k==="dich"){const q=queenP();const c=q&&q!==S?tdHouse(q):S.rank>=7?tdHouse(S):null;const sp=c||"Lễ bộ";const h=T.H[sp];const DB=BAL.ag.why.g3.deb,d0=DB.p,g0=S.kvDeb;DB.p=100;let r="";try{r=kvDebate()}finally{DB.p=d0}
  if(!r){T.soT=-9;return""}const won=S.heir&&S.heir.k&&kvQueenMom(S.heir.v);tdPowAdd(sp,won?BAL.eff.j55.tdSoMonth_2[0]:BAL.eff.j55.tdSoMonth_2[1]);
  ev=`${TDOFF[sp]} ${h.name}${typeof minWhy==="function"?minWhy(h):""} đứng đầu bá quan. ${r}Nhà ${sp} thế lực ${won?"+4":"-3"}. `;tdNews(`${TDOFF[sp]} ${h.name} dâng sớ xin lập đích; ${won?"Hoàng thượng nghe theo":"Hoàng thượng chưa nghe"}.`)}
 else if(k==="imp"){const [cA,t]=imp;ev=tdImpeach(cA,t)}
 else if(k==="tuyen"){const c=(window.MINP&&MINP.k==="tuyen"&&ty.includes(MINP.c))?MINP.c:(npwPick(ty,c=>T.H[c].pow)||ty[0]);/* npc-purpose G2: the strongest house */const h=T.H[c];T.tyY=S.year;const o=cl(30+(h.pow-60)+(S.emp.mood<=1?10:-10),10,85);
  if(roll(o)&&roomFor("consort")){const n=newRival(roll(70)?0:1);Object.assign(n,drawFace());n.age=BAL.ageMin+R(4);n.clan=c;n.dad=h.pow;rivals.push(n);try{palFix()}catch(e){}tdPowAdd(c,BAL.eff.j55.tdSoMonth_3);
   ev=`<b>Sớ xin tuyển tú:</b> ${TDOFF[c]} ${h.name}${typeof minWhy==="function"?minWhy(h):""} xin đưa con gái trong họ vào cung; Hoàng thượng chuẩn (cơ may: ${word(o)}). ${n.name} vào cung, phong ${RANKS[n.rank].n}, người nhà ${c}. `;tdNews(`${TDOFF[c]} ${h.name} đưa ${n.name}, người nhà ${c}, vào cung.`)}
  else{tdPowAdd(c,BAL.eff.j55.tdSoMonth_4);ev=`<b>Sớ xin tuyển tú:</b> ${TDOFF[c]} ${h.name}${typeof minWhy==="function"?minWhy(h):""} xin đưa con gái trong họ vào cung; Hoàng thượng gác lại (cơ may: ${word(o)}). Nhà ${c} thế lực ${balSg(BAL.eff.j55.tdSoMonth_4)}. `;tdNews(`${TDOFF[c]} ${h.name} xin đưa người nhà ${c} vào cung, bị gác lại.`)}}
 else if(k==="cc"){const p=(window.MINP&&MINP.k==="cc"&&cc.includes(MINP.t))?MINP.t:(npwPick(cc,p=>p.cc||0)||cc[0]);/* npc-purpose G2: the one who leaned on the court most */const by=typeof minBy==="function"?minBy("ngự sử"):"ngự sử",byN=typeof minNsName==="function"?minNsName("Ngự sử"):"Ngự sử";const o=cl(25+(p.cc||0)*10-(p.tamco||0)/5,10,80);
  if(roll(o)){p.cc=0;const q=queenP();if(p===S){apply({th:-8});if(q&&q!==S)apply({hh:BAL.eff.j55.tdSoMonth_5})}else{p.th=(p.th||0)-8;if(q&&q!==p&&q!==S)affAdd(q,p,BAL.eff.j55.tdSoMonth_5);if(q===S)affAdd(S,p,BAL.eff.j55.tdSoMonth_6)}punish(p,"hậu cung can chính",1);
   ev=`<span class="r"><b>Sớ hặc can chính:</b> ${by} tâu ${tdName(p)} nhiều lần nhờ cậy ngoại triều. ${p===S?"Ngươi":p.name} bị cấm túc; Thái hậu -8, Hoàng hậu ${balSg(BAL.eff.j55.tdSoMonth_5)} với ${p===S?"ngươi":"nàng"}.</span> `;tdNews(`${byN} hặc ${tdName(p)} can chính.`)}
  else{p.cc=Math.max(0,(p.cc||0)-1);ev=`<b>Sớ hặc can chính:</b> ${by} tâu ${tdName(p)} nhờ cậy ngoại triều; Hoàng thượng cho là chưa đủ chứng, bỏ qua. `;tdNews(`${byN} hặc ${tdName(p)} can chính; ngài bỏ qua.`)}}
 return ev}
/* a censor from a house that opposes hers; the most hostile pair first */
function tdImpPick(){if(window.MINP&&MINP.k==="imp"&&MINP.imp)return MINP.imp;const T=trS();const L=[];for(const t of consorts()){const cT=tdHouse(t);if(!cT)continue;for(const cA of CLANS){if(cA===cT)continue;const h=T.H[cA];const w=(tdRel(cA,cT)<=-BAL.cut.clanRel?BAL.ag.min.imp.deep:tdRel(cA,cT)<0?1:0)*(nv(h,"feudW"));if(w>0)L.push([cA,t,w])}}
 const x=npwPick(L,y=>y[2]);return x?[x[0],x[1],x[2]]:null}/* npc-purpose G2: the clan with the deepest feud impeaches */
function tdImpeach(cA,t){const T=trS();const hA=T.H[cA],cT=tdHouse(t),hT=T.H[cT];const evd=Math.max(0,...tdMembers(cA).map(m=>deG(m,t)));
 const o=cl(Math.round(40+evd*15+(hA.pow-hT.pow)/3+(S.emp.mood>=2?10:0)),10,90);const pre=`<b>Sớ hặc tội:</b> ${TDOFF[cA]} ${hA.name}${typeof minWhy==="function"?minWhy(hA):""} hặc cha của ${tdName(t)} (nhà ${cT}) tham ô. `;let ev;
 if(tdDadT(t)&&roll(o)){tdPowAdd(cT,BAL.eff.j55.tdImpeach);t.dad=cl((t.dad||40)+BAL.eff.j55.dadCut,0,100);ap(t,{danh:BAL.eff.j55.danhDadCut});tdDadClear(t);tdMembers(cA).forEach(m=>deA(m,t,-9));tdRelAdd(cA,cT,-15);tdPowAdd(cA,BAL.eff.j55.tdImpeach_2);
  ev=pre+`Tra xét có thật, cha ${t===S?"ngươi":"nàng"} bị cách chức (cơ may: ${word(o)}). Nhà ${cT} thế lực ${balSg(BAL.eff.j55.tdImpeach)}; ${t===S?`ngươi mất chỗ dựa: nhà mẹ đẻ ${balSg(BAL.eff.j55.dadCut)}, Danh ${balSg(BAL.eff.j55.danhDadCut)}`:`${t.name} mất chỗ dựa (nhà mẹ đẻ ${balSg(BAL.eff.j55.dadCut)}, Danh ${balSg(BAL.eff.j55.danhDadCut)})`}. `;tdNews(`${TDOFF[cA]} ${hA.name} hặc cha của ${tdName(t)}: có thật, bị cách chức.`)}
 else{tdPowAdd(cA,BAL.eff.j55.tdImpeach_3);tdRelAdd(cA,cT,-15);ev=pre+`Tra xét ${tdDadT(t)?"chưa đủ chứng":`không thấy gì: cha ${t===S?"ngươi":"nàng"} thanh liêm`}; Hoàng thượng trách kẻ dâng sớ. Nhà ${cA} thế lực ${balSg(BAL.eff.j55.tdImpeach_3)}. `;tdNews(`${TDOFF[cA]} ${hA.name} hặc cha của ${tdName(t)}: không thành.`)}
 if(t===S)tdPop("Sớ hặc cha ngươi",hA,`<p>${ev}</p>`);return ev}
function tdPop(t,h,html){if(quiet||window.__bot)return;Q.push({t,who:pMin(h),h:html})}

/* ---------- each month: house standing drifts, fathers follow their house, ministers' favour cools, NPCs meddle by traits ---------- */
function tdMonth(){if(!tdOn())return"";const T=trS();let ev="";
 for(const c of CLANS){const h=T.H[c];if(S.month===1&&S.tuan===0)h.age=(h.age||50)+1;h.pow=cl(Math.round(h.pow+(50-h.pow)*.06+(roll(35)?R(5)-2:0)),0,100);
  for(const k in h.af){const v=h.af[k];const d=nv(h,"afFade");h.af[k]=v>0?Math.max(0,v-d):Math.min(0,v+d);if(!h.af[k])delete h.af[k]}}
 for(const p of consorts()){const h=tdHeadOf(p);if(!h)continue;if(h.dadOf==="me"&&p===S){S.dad=h.pow;continue}p.dad=cl(Math.round((p.dad==null?h.pow:p.dad)+(h.pow-(p.dad==null?h.pow:p.dad))*.35+R(7)-3),0,100)}
 for(const p of consorts())if(p.cc&&S.turn-(p.ccT||0)>=4){p.cc--;p.ccT=S.turn}
 if(TD.npc)for(const v of liveRivals(true)){if(v.confined||S.dead)continue;const w=TD.npc*traitsOf(v).reduce((m,t)=>m*(TDAMB[t]||1),1);let r="";
  const tg=consorts().filter(t=>t!==v&&tdHouse(t)&&!sameHouse(v,t));
  const leakT=mindPickBy(tg.filter(t=>deG(v,t)>=1),t=>deG(v,t)+Math.max(0,hostility(v,t))/BAL.mind.pick.j55.host,v);/* npc-mind: was FIRST */
  /* npc-purpose G2: she picks the court act her own state calls for (grudge → leak / probe, too little backing → gift, low favour → ask her clan); the old odds roll only whether it is done this month */
  const TB=BAL.ag.why.g2b.td,H=v.bac>=60?CLANS.map(c=>T.H[c]).filter(h=>!tdBacks(h,v)&&h.c!==tdHouse(v)):[],pt=tg.length&&v.bac>=50?pickTarget(v):null;
  const ak=npwPick(["leak","gift","probe","ask"],k=>k==="leak"?(leakT&&v.bac>=BAL.bacFee.tdLeak?deG(v,leakT)*TB.deg+Math.max(0,hostility(v,leakT))*TB.host:0):k==="gift"?(H.length?TB.need-tdBackW(v)*TB.backW:0):k==="probe"?(pt&&tg.includes(pt)?Math.max(0,hostility(v,pt))*TB.host:0):(tdHouse(v)&&S.turn-(v.askT==null?-99:v.askT)>=3?TB.ask+Math.max(0,TB.sung0-(v.sung||0))*TB.askW:0));
  if(ak==="leak"&&roll(22*w))r=tdLeak(v,leakT);
  else if(ak==="gift"&&roll(3*w)){const h=npwPick(H,h=>h.pow);if(h)r=tdGift(v,h)}
  else if(ak==="probe"&&roll(2*w))r=tdProbe(v,pt);
  else if(ak==="ask"&&roll(2.5*w))r=tdAsk(v);
  if(r){const pub=/[Nn]gự sử|bị cách chức|bị bác|Ngươi biết chuyện/.test(r);ev+=pub?r:seenNPC(v,v,r)||""}}
 ev+=tdKin();ev+=tdSoMonth();return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(!S.dead)ev=(ev||"")+(tdMonth()||"")}catch(e){console.error(e)}return ev}})();
/* the existing story beats move the realm too */
(function(){const s0=storyMonth;storyMonth=function(){const r=s0.apply(this,arguments)||"";try{const T=trS();if(T&&r){
 if(/phá tan quân giặc/.test(r)){T.bien=cl(T.bien+10,0,100);tdPowAdd("Đại tướng quân",BAL.eff.j55.top_8);tdNews("Đại tướng quân thắng trận ở biên ải.");T.praise="Đại tướng quân"}
 else if(/thua một trận/.test(r)){T.bien=cl(T.bien-10,0,100);tdPowAdd("Đại tướng quân",BAL.eff.j55.top_9);tdNews("Quân Đại tướng quân thua một trận ở Nhạn Môn quan.")}
 else if(/Chiến tranh với Cao Ly|Cao Ly thắng trận|Cao Ly thua trận/.test(r)){T.bien=cl(T.bien-15,0,100);tdNews("Chiến tranh với Cao Ly.")}}}catch(e){}return r}})();
/* lãnh cung: 'nhờ cha dâng sớ' leans on her house's real standing and spends it */
(function(){if(typeof coldActs!=="function")return;const c0=coldActs;coldActs=function(){const A=c0.apply(this,arguments);try{const c=tdHouse(S);if(!c)return A;const a=A.find(x=>x.n==="Nhờ người bên ngoài"&&/cha/.test(x.t||""));if(!a)return A;
 a.o=od(BAL.odb.j55.odO+tdPow(c)/4);a.t=`Nhờ cha (nhà ${c}, thế lực ${tdPow(c)}) dâng sớ xin tha.`;a.x=`được tha · kèm: nhà ${c} thế lực ${balSg(BAL.eff.j55.go)}`;const g=a.go;a.go=function(){tdPowAdd(c,BAL.eff.j55.go);return g.apply(this,arguments)};const f=a.fail;a.fail=function(){tdPowAdd(c,BAL.eff.j55.fail);if(f)return f.apply(this,arguments)}}catch(e){}return A}})();

/* ---------- the court view inside the Phe phái tab ---------- */
window.__tdV=window.__tdV||"hc";
function tdActBtn(at,n,line,why){return pbtn(at,n,line,why)}
/* why she cannot do a court act now ("" = she can): one reason for every card of the Triều đình view */
function tdBusy(){return S.out?"đang ở lãnh cung":S.confined?"đang bị cấm túc":!can(2)?(whyTime(2)||"Sức dưới "+(BAL.time.sucMin)+", cần nghỉ"):""}
function tdHTML(){const T=trS();const myC=tdHouse(S),myH=tdHead(myC);const busy=tdBusy();
 let h=`<div class="ph"><span>Quốc sự</span><span>Tâm trạng Hoàng thượng: <b>${MOODS[S.emp.mood][0]}</b></span></div>`;
 h+=`<div class="tdq">${sbar("Biên cương",T.bien,"tdbc")}${sbar("Kho lúa",T.kho,"tdkl")}</div><p class="past tdp">Biên cương, kho lúa càng thấp ngài càng phiền; dưới 30 ngài ít vào hậu cung. Giặc cướp, lũ hạn làm tụt; thắng trận, được mùa làm tăng. Thắng bại của Đại tướng quân, Hộ bộ đổi thế lực nhà họ.</p>`;
 h+=`<div class="ph"><span>${myC?`Ngươi là người nhà <b>${myC}</b>${myH&&myH.dadOf==="me"?" (cha ngươi đứng đầu)":""}`:"Nhà mẹ đẻ ngươi không thuộc năm nhà quyền thần"}</span><span>Can chính: ${S.cc||0} lần gần đây · nguy cơ bị hặc ${ccWord(S)}</span></div>`;
 const askWhy=!myC?"nhà ngươi không có người ở triều":busy||(S.turn-(S.askT==null?-99:S.askT)<3?"mới nhờ, đợi 3 tháng":"");
 const prT=liveRivals(true).filter(v=>tdHouse(v)&&!sameHouse(S,v));const lkT=consorts().filter(v=>v!==S&&deG(S,v)>=1);
 h+=`<div class="rbtn tdacts">`+tdActBtn(`data-td="ask"`,"Nhờ cha dâng sớ",myC?`${word(askO(S))} · tốn: nhà ${myC} thế lực ${balSg(BAL.eff.j55.tdAsk)} · thành: Danh ${balSg(BAL.eff.j55.danhTdAsk)} · ${sgStat(BAL.eff.j55.sungTdAsk)} · hỏng: Danh ${balSg(BAL.eff.j55.danhTdAsk_2)} · kèm: ${ccLine(S)}`:"cần nhà mẹ đẻ có người ở triều",askWhy)
  +tdActBtn(`data-td="probe"`,"Dò la nhà ngoại phi tần",`tốn: Bạc -${BAL.bacFee.tdProbe} · thành: biết thật cha nàng có tham ô không; có thì Chứng cứ tham ô ${balSg(BAL.ag.ev.one)} · kèm: nàng biết chuyện (${chanceW(25)}): thiện cảm ${balSg(spSee("rel",BAL.eff.j55.tdProbe))}, ${typeof pvOanAny==="function"?pvOanAny(12.8):"oán ta +13"} · kèm: ${ccLine(S)}`,busy||(S.bac<BAL.bacFee.tdProbe?"thiếu bạc (cần "+BAL.bacFee.tdProbe+")":!prT.length?"không có phi tần nhà khác":""))
  +tdActBtn(`data-td="leak"`,"Tung chứng cứ tham ô",`tốn: Bạc -${BAL.bacFee.tdLeak} (lót tay ngự sử) · thành: nhà nàng thế lực ${balSg(BAL.eff.j55.tdLeak)} · nàng mất chỗ dựa, Danh ${balSg(BAL.eff.j55.danhDadCut)} · hỏng: ${evSg(-BAL.ag.ev.one,1)} · kèm: tra ra ngươi thì ${tdLeakSay(null,"nàng oán")}, đầu nhà nàng quý ngươi +${spSee("oan",BAL.tdCourt.leakHead)} · kèm: ${ccLine(S)}`,busy||(S.bac<BAL.bacFee.tdLeak?"thiếu bạc (cần "+BAL.bacFee.tdLeak+")":!lkT.length?"chưa có chứng cứ tham ô của ai (dò la trước)":""))+tdMarryBtn()+`</div>`;
 h+=CLANS.map(c=>{const hd=T.H[c];const f=pMin(hd);const M=tdMembers(c);const af=hd.af.me||0;const gw=busy||(S.bac<BAL.bacFee.tdGift?"thiếu bạc (cần "+BAL.bacFee.tdGift+")":c===myC&&hd.dadOf==="me"?"là cha ngươi":"");
  const rel=CLANS.filter(x=>x!==c).map(x=>[x,tdRel(c,x)]).filter(z=>Math.abs(z[1])>=25);
  return `<div class="rival tdh"><div class="top tdtop">${mdH(f,"sm")}<div class="tdn"><b>Nhà ${c}</b><em>${TDOFF[c]} ${hd.name}${hd.dadOf==="me"?" (cha ngươi)":""} · ${hd.age} tuổi · ${netTxt(hd)}</em></div></div>
  <div class="tdq">${sbar("Thế lực",hd.pow,"tdtl")}${hd.dadOf==="me"?"":sbar("Thiện cảm với ngươi",af,"tdaf")}</div>
  <div class="chips">${M.length?M.map(p=>chip(`${mdH(p===S?pMe():pv(p),"xs")}${p===S?"Ngươi":p.name}${p!==S&&trS().clean[key(p)]?" · cha thanh liêm":""}${p!==S&&deG(S,p)?` · chứng cứ tham ô ${deG(S,p)}`:""}`)).join(""):chip("Chưa có phi tần nhà này trong cung")}${typeof minGoalChip==="function"?minGoalChip(hd):""}${rel.map(z=>chip(`${tdRelW(z[1])}: nhà ${z[0]}`,z[1]>0?"ok":"hot")).join("")}${tdBacks(hd,S)&&c!==myC?chip("Đứng sau ngươi","ok"):""}</div>
  ${hd.dadOf==="me"?"":`<div class="rbtn">${tdActBtn(`data-td="gift" data-tc="${c}"`,`Biếu quà, gửi thư cho ${hd.name}`,`${word(giftO(S,hd))} · tốn: Bạc -${BAL.bacFee.tdGift} · thành: người ấy quý ngươi +${BAL.tdCourt.giftAf}; từ ${BAL.tdCourt.backs} ông đứng sau ngươi (tranh ghế +${Math.round(hd.pow/8)}) · hỏng: mất bạc${hasT(hd,"Cương trực")?", ông tố ra ngoài: can chính nặng thêm":""} · kèm: ${ccLine(S)}`,gw)}</div>`}</div>`}).join("");
 h+=`<h3>Tin triều đình</h3><div class="logs tdnews">${T.news.map(x=>`<div>${tdNewsFace(x.h)}<span class="ld">${x.w}</span>${x.h}</div>`).join("")||"<div>Chưa có tin gì.</div>"}</div>`;
 return h}
function tdNewsFace(t){try{const T=trS();for(const h of (typeof minOn==="function"&&minOn()?minAll():CLANS.map(c=>T.H[c]))){if(h&&t.includes(h.name))return mdH(pMin(h),"xs")}const v=rivals.find(r=>r.alive&&t.includes(r.name));if(v)return mdH(pv(v),"xs");if(/ngươi/.test(t))return mdH(pMe(),"xs")}catch(e){}return""}
function tdMarryBtn(){try{if(typeof h54Daus!=="function"||typeof h54Name!=="function")return"";const H=typeof H54==="object"?H54:{cd:3,dow:[40,30,20]};
 return h54Daus().filter(([k,p])=>p===S&&k.alive&&!k.hW&&k.age>=BAL.age.matchShow).map(([k])=>pbtn(`data-h54="ban" data-kn="${k.name}"`,`Gả ${h54Name(k)} vào nhà quyền thần`,`tốn: ${BAL.btn.h54Ban.k} khắc · Bạc -${(H.dow||[40,30,20])[k.hT||0]} đến -${(H.dow||[40,30,20])[k.hT||0]+20} (hồi môn, tùy nhà) · thành: đầu nhà chồng đứng sau ngươi (người ấy quý ngươi +${BAL.tdCourt.wedAf[1]}; con thương người ấy thì +${BAL.tdCourt.wedAf[0]})
, nhà chồng chống lưng ngươi khi tranh ghế · kèm: con không ưng thì mẫu tử giảm; phi tần mẹ các công chúa khác ghen`,k.hB?"đã hứa gả":k.age<BAL.age.betroth?"con chưa đủ "+(BAL.age.betroth)+" tuổi":!can(BAL.btn.h54Ban.k)?(whyTime(BAL.btn.h54Ban.k)||"Sức dưới "+(BAL.time.sucMin)+", cần nghỉ"):(k.hBan!=null&&S.turn-k.hBan<(H.cd||3))?"vừa bàn xong, đợi vài tháng":"")).join("")}catch(e){return""}}
/* in-law ties (from j54, every mother alike): a daughter wed into one of the five houses wins its head; hòa thân truly calms the border */
function tdKin(){const T=trS();if(!T||typeof allKids!=="function")return"";let ev="";
 for(const [k,v] of allKids()){const p=v||S;const W=k.hB||k.hW;if(!W)continue;const W2=k.hW||{};const hs=(k.hW&&k.hW.s&&k.hW.s.house)||(k.hB&&typeof h54Son==="function"&&h54Son(k.hB.s)?h54Son(k.hB.s).house:null);
  if(!k.tdB&&W.kind!=="hoa"&&CLANS.includes(hs)){k.tdB=1;const h=T.H[hs];const n=BAL.tdCourt.wedAf[W.kind==="tinh"?0:1];h.af[key(p)]=cl((h.af[key(p)]||0)+n,-100,100);const c=tdHouse(p);if(c&&c!==hs)tdRelAdd(c,hs,10);tdNews(`Công chúa con ${tdName(p)} hứa gả vào nhà ${hs}; ${TDOFF[hs]} ${h.name} đứng sau ${p===S?"ngươi":"nàng"}.`);if(p===S)ev+=`${TDOFF[hs]} ${h.name} thành thông gia: quý ngươi +${n}. `}
  if(!k.tdH&&W2.kind==="hoa"){k.tdH=1;T.bien=cl(T.bien+20,0,100);T.hoaT=S.turn;tdNews(`Công chúa con ${tdName(p)} hòa thân Bắc Địch; biên cương +20, ba năm ít giặc.`);ev+=`Hòa thân Bắc Địch: biên cương +20, ba năm tới giặc ít quấy nhiễu. `}}
 return ev}
/* j54 warms the in-law head only on her own betrothal path; tdKin does it once for every path (her and NPC mothers alike) */
if(typeof h54Court==="function")h54Court=function(){};
(function(){for(const n of ["h54Betroth","h54Wed","h54Hoa"]){const f0=window[n];if(typeof f0!=="function")continue;window[n]=function(){let r=f0.apply(this,arguments);try{const e=tdKin();if(e&&typeof r==="string")r+=" "+e}catch(x){}return r}}})();
(function(){const f0=facHTML;facHTML=function(){const seg=`<div class="rbtn tdseg"><button data-tdv="hc" aria-pressed="${window.__tdV!=="td"}">Phe phái hậu cung</button><button data-tdv="td" aria-pressed="${window.__tdV==="td"}">Triều đình</button></div>`;
 if(window.__tdV==="td"&&S&&!S.dead){try{return seg+tdHTML()}catch(e){console.error(e)}}return seg+f0.apply(this,arguments)}})();
/* Biếu quà nhà ngoại: ONE function for the act (checks, odds read before the spend, the gift, her log line); tdAct keeps the result card.
   coop-thin F3: a co-op guest's tap becomes an intent here (her card comes with the host's answer) */
function tdGiftGo(tc){const T=trS(),h=T.H[tc]||(typeof MINC!=="undefined"&&tc===MINC&&typeof minNs==="function"?minNs():null)/* main: the minister house */;if(!h||S.bac<BAL.bacFee.tdGift||h.dadOf==="me")return"";const fz=giftO(S,h);spend(2);const r=fzRun(fz,null,()=>tdGift(S,h));if(r)log(r);return{ttl:`Biếu quà ${h.name}`}}
function tdAct(a,d){if(!S||S.dead||Q.length||!can(2)||S.out||S.confined)return;const T=trS();const b=rsnap();let r="",ttl="";
 if(a==="ask"){if(!tdHouse(S)||S.turn-(S.askT==null?-99:S.askT)<3)return;const fz=askO(S);spend(2);ttl="Nhờ cha dâng sớ";r=fzRun(fz,null,()=>tdAsk(S))}
 else if(a==="gift"){const g=tdGiftGo(d.tc);if(!g)return;ttl=g.ttl}
 else if(a==="probe"||a==="leak"){const L=a==="probe"?liveRivals(true).filter(v=>tdHouse(v)&&!sameHouse(S,v)):consorts().filter(v=>v!==S&&deG(S,v)>=1);if(!L.length)return;
  Q.push({act:1,t:a==="probe"?"Dò la nhà ngoại ai?":"Tung chứng cứ tham ô của ai?",h:`<p>${a==="probe"?"Sai người ngoài cung dò sổ sách nhà cha nàng. Tin dò được là tin thật.":"Lót tay một ngự sử dâng chứng cứ cha nàng tham ô lên Hoàng thượng."}</p>`,
   opts:L.slice(0,8).map(v=>({kgt:v,n:`${v.name} (nhà ${tdHouse(v)})`,fx:{},x:a==="probe"?`${word(probeO(S))} · tốn: Bạc -${BAL.bacFee.tdProbe} · thành: biết thật cha nàng có tham ô không · hỏng: mất bạc · kèm: nàng biết chuyện (${chanceW(25)}): thiện cảm ${affSg(v,S,BAL.eff.j55.tdProbe)}, ${typeof pvOanAny==="function"?pvOanAny(12.8):"oán ta +13"} · kèm: ${ccLine(S)}`:`${word(leakO(S,v))} · tốn: Bạc -${BAL.bacFee.tdLeak} · thành: nhà ${tdHouse(v)} thế lực ${balSg(BAL.eff.j55.tdLeak)}, nàng nhà mẹ đẻ ${balSg(BAL.eff.j55.dadCut)}, Danh ${balSg(BAL.eff.j55.danhDadCut)} · hỏng: ${evSg(-BAL.ag.ev.one,1)} · kèm: tra ra ngươi: ${tdLeakSay(v,"nàng oán")}, đầu nhà nàng quý ngươi +${spSee("oan",BAL.tdCourt.leakHead)} · kèm: ${ccLine(S)}`,
    go:()=>{const fz=a==="probe"?probeO(S):leakO(S,v);/* read before the spend (j9 fzRun) */spend(2);const b2=rsnap();const r2=fzRun(fz,null,()=>a==="probe"?tdProbe(S,v):tdLeak(S,v));if(r2)log(r2);const ok=!!window.__tdOk;setTimeout(()=>{try{resultShow(a==="probe"?`Dò la nhà ngoại ${v.name}`:`Tung chứng cứ: cha ${v.name}`,b2,ok)}catch(e){}},0)}})).concat([{n:"Thôi",fx:{}}])});showModal();return}
 if(r)log(r);resultShow(ttl,b,!!window.__tdOk);render()}
document.addEventListener("click",e=>{const v=e.target.closest("[data-tdv]");if(v){e.stopPropagation();window.__tdV=v.dataset.tdv;try{render()}catch(x){}return}
 const b=e.target.closest("[data-td]");if(!b||b.disabled)return;e.stopPropagation();try{tdAct(b.dataset.td,b.dataset)}catch(x){console.error(x)}},true);
(function(){const st=document.createElement("style");st.textContent=".tdseg{margin:0 0 6px}.tdseg button[aria-pressed=true]{background:var(--gold);color:#fff;border-color:var(--gold)}.tdq{display:flex;flex-wrap:wrap;gap:2px 0;margin:2px 0 4px}.sbar.tdbc .sbt u{background:#a5583a}.sbar.tdkl .sbt u{background:#b99a3a}.sbar.tdtl .sbt u{background:#7a5aa0}.sbar.tdaf .sbt u{background:#5a9a6a}.tdq .sbar .sbl{min-width:0}.tdp{margin:0 0 6px;font-size:.74rem}.rival.tdh .top.tdtop{display:flex;align-items:center;gap:8px;justify-content:flex-start;text-align:left;flex-wrap:nowrap}.rival.tdh .tdn{display:flex;flex-direction:column;min-width:0;flex:1;text-align:left;align-items:flex-start}.rival.tdh .tdn em{overflow-wrap:anywhere;white-space:normal;margin:0;text-align:left}.tdh .chips .chip{white-space:normal}.tdnews div{overflow-wrap:anywhere}.tdacts{margin-bottom:6px}";document.head.appendChild(st)})();
/* test hook: force one memorial of a kind (praise | dich | imp | tuyen | cc) */
window.tdForceSo=function(k){const T=trS();if(k==="praise"&&!T.praise)T.praise="Đại tướng quân";const r=tdSoMonth(k||true);if(r)log(r);try{render()}catch(e){}return r};
/* j54's hòa thân choices now name their real border effect */
(function(){for(const id of ["foreignwed","h54hoa","h54ban"]){const f0=PEND[id];if(typeof f0!=="function")continue;PEND[id]=function(){const d=f0.apply(this,arguments);try{if(d&&d.o)d.o.forEach(c=>{if((/h54Hoa/.test(String(c.go||""))||/hòa thân/i.test(c.n||""))&&!/Biên cương/.test(c.x||"")){const add="con sang Bắc Địch thì Biên cương +20, ba năm ít giặc";const x=String(c.x||"");const i=/ · hỏng:/.test(x)?-1:x.search(/ · kèm:/);c.x=!x?add:i>=0?x.slice(0,i)+" · "+add+x.slice(i):x+" · "+add}})}catch(e){}return d}}})();
