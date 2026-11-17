/* ================= jagmaid: AG3 — MAIDS REACH THE EMPEROR BY THEIR OWN DEEDS (npc-agent §3.3 / §3.4, §5 AG3) =================
   Owner OD:L1386 (every NPC plays like a player: same deeds, same odds, choices by her own needs; no invented bar, gate or flat roll for an
   NPC outcome) + OD 16/11 17:15Z (a maid must DO things so he notices her; maid nights) + OD 15:05Z (3) (seats full → an unranked favoured
   maid) + OD:L1248 (mindPick with jmind's slip) + OD:L1267 (every number in BAL.ag.maid, jbal2). HOST ONLY (amOn = empOn: a co-op guest
   never decides the world).
   1 ONE FACT (§3.4)  the maid's "Hoàng thượng để ý" (S.nt) IS his regard for her = S.sung: S.nt is an alias of S.sung while she is a maid
                      (not saved); old saves: sung = max(sung, nt) once. NPC staff maids carry their own .sung (his regard), 0 at first.
   2 DEEDS            the player maid's deeds near him (Quỳ dâng trà, errand, Hầu trà khi ngự giá, Rót rượu…, all through srvNotice) and an NPC
                      maid's deeds (Quỳ dâng trà where he passes each tuần, Hầu trà khi ngự giá on her master's night) use ONE rule: amTeaO
                      odds, BAL.ag.maid.tea gain, the master's jealousy amJealD; each lands in his memory S.emp.met (staff maid key "s"+sid).
                      An NPC maid does it only while she SEEKS his notice (jmline mlSeek: her own nết; her master may push her) and by her
                      need (his regard against BAL.ag.goal.sung on the maid road "cn"), mindPick against keeping her duties.
   3 HIS POOL         his night pick (jagemp empPick) weighs every maid he MET (memory) beside the tray, weight amCh (regard, Sắc: the
                      consort nightCh terms) × his memory. The old monthly dice go while the loop is on: the player maid's "Hoàng thượng để
                      mắt" (j42 roll 1.2 + nt/25), the 45 gate + "hỏi tên" dice (srvNotice), the staff maid's eye roll (jmline mlEye).
   4 A MAID'S NIGHT   his regard + rivalNight's night gain; a free consort seat (roomFor) → she is raised Đáp ứng as the SAME person (her
                      name, face, age; f88Carry), with her road "cn", then night() (conception, the same rule as anyone). Seats full → she
                      stays a maid, "đã được sủng hạnh" (m.fav); each month a free seat goes to a favoured maid first (normal seat rule).
   5 TIẾN CỬ          the consort's "Tiến cử <maid> hầu thay" (j8 sendMaid): her own choice on her night by her need (tired or ill;
                      a trusted maid is also an ally in his bed) — was roll 3; the maid's night as in 4 — was roll 30 + a fresh name and face / "thả ra cung".
   6 THE PLAYER MAID  he picks her → the kit dilemma "Hoàng thượng cho gọi" (go: 4 for her: srvRise with a seat, favoured without);
                      srvRise checks the seat (row 10); the mistress's 25 % killing line of "hỏi tên" goes (her harm acts cover it).
   Open (owner question 3, npc-agent §6): the child of a favoured maid with no seat — she conceives only once she holds a rank.
   Off: BAL.ag.on = 0 / __agOff (every old dice path again). Counters: window.__amN.
   ===================================================================================================================== */
const AMN={tea:0,teaN:0,ok:0,pick:0,me:0,rise:0,fav:0,favRise:0,send:0,sendRise:0,eyeOff:0,decline:0};window.__amN=AMN;
function amOn(){try{return !!(typeof empOn==="function"&&empOn()&&BAL.ag.maid)}catch(e){return false}}
function amD(){return BAL.ag.maid}
/* ---------- 1 one fact: S.nt is S.sung while she is a maid ---------- */
function amAlias(){try{if(!S)return;const srv=!!(S.srv&&!S.srv.risen);const d=Object.getOwnPropertyDescriptor(S,"nt");
  if(d&&!d.get){if(srv)S.sung=Math.max(+S.sung||0,+d.value||0);delete S.nt}
  if(srv){if(!d||!d.get)Object.defineProperty(S,"nt",{get(){return this.sung},set(v){this.sung=v},enumerable:false,configurable:true})}
  else if(d&&d.get)delete S.nt}catch(e){console.error("jagmaid alias",e)}}
/* ---------- the maid's own data ---------- */
function amSt(m){if(m===S)return{sac:S.sac||0,tai:S.tai||0};if(m.sac==null){const T=amD().st;const ri=a=>a[0]+R(a[1]-a[0]+1);m.sac=ri(T.sac);m.tai=ri(T.tai)}return{sac:m.sac,tai:m.tai}}
function amSung(m){return (m===S?S.sung:m.sung)||0}
function amAdd(m,d){if(m===S)S.sung=cl((S.sung||0)+d,0,100);else m.sung=cl((m.sung||0)+d,0,100)}
/* ONE rule for the deed's odds (the player's card and the NPC maid): Quỳ dâng trà where he passes, or Hầu trà khi ngự giá (night=1) */
function amTeaO(m,night){const T=amD().tea,st=amSt(m);return T.b+st.sac/T.sac+st.tai/T.tai+(night?amSung(m)/T.nt:mm())}
function amTeaG(m,g){return (g==null?amD().tea.g:g)+Math.round(amSt(m).sac/amD().tea.gs)}
/* the master sees him look at her: trust lost (0 = she did not see) */
function amJealP(o){const J=amD().jeal;return cl(J.b+((o&&o.malice)||40)/J.d,0,100)}
function amJealN(o){return nv(o,"misJealTin")}/* the trust she loses: ONE table BAL.net.n.misJealTin (show-why) */
function amJealD(o){if(!o||!roll(amJealP(o)))return 0;return amJealN(o)}
/* ---------- 2 an NPC maid's deed ---------- */
function amMaids(){const L=[];for(const p of consorts()){if(!p||!p.staff)continue;if(p!==S&&(!p.alive||p.out))continue;for(const s of p.staff)if(s&&s.role==="maid"&&mlAgeOk(s))L.push([s,p])}return L}
function amSeeking(s){return !!(s.seek&&s.seek.until>=(S.turn||0))}
function amNeed(s){const G=BAL.ag.goal,W=BAL.ag.road.cn||BAL.ag.road._;return cl((G.sung-(s.sung||0))/G.sung,0,1)*W.sung}
function amMW(s){try{return typeof mindW==="function"?mindW(s,"social"):1}catch(e){return 1}}
function amDecide(s,p,night){const o=odA(s,amTeaO(s,night));const sm=s.seek&&s.seek.used?BAL.mline.useMul:1;
 const u=amNeed(s)*(amTeaG(s)/BAL.ag.unit)*(o/100)*sm*amMW(s);if(!(u>0))return null;
 if(mindPick([["keep",BAL.ag.routine/BAL.ag.unit],["do",u*BAL.ag.needW]],s)!=="do")return null;return amDo(s,p,night?"teaN":"tea",o)}
function amDo(s,p,kd,o){AMN[kd]++;const ok=roll(o);let d=0;
 if(ok){amAdd(s,amTeaG(s));AMN.ok++;d=amJealD(p);if(d)s.loyal=cl((s.loyal||0)-d,0,100)}else s.loyal=cl((s.loyal||0)-amD().tea.fail,0,100);
 empMet(s,kd,ok);
 const see=p===S||(S.mat||0)>=BAL.mline.seeMat;if(!see)return"";
 const W=kd==="teaN"?`bưng trà vào điện đêm Hoàng thượng ngự giá cung ${NM(p)}`:"quỳ dâng trà nơi Hoàng thượng đi qua";
 return `${p===S?"":"Tai mắt báo: "}${s.name}${p===S?"":`, người hầu của ${p.name},`} ${W}; ${ok?"ngài liếc nhìn nàng":"tay run, trà sóng ra khay"}${ok&&d?`; ${p===S?"ngươi":p.name} sa sầm nét mặt`:""}. `}
/* each tuần (host): a seeking maid serves tea where he passes, or keeps her duties */
function amWeek(){if(!amOn())return"";let ev="";try{for(const [s,p] of amMaids())if(amSeeking(s))ev+=amDecide(s,p,false)||""}catch(e){console.error("jagmaid week",e)}return ev}
/* her master's night: her seeking maids may carry the tea in */
function amNightTea(v){if(!amOn()||!v||!v.staff)return"";let ev="";try{for(const s of v.staff)if(s&&s.role==="maid"&&mlAgeOk(s)&&amSeeking(s))ev+=amDecide(s,v,true)||""}catch(e){console.error("jagmaid teaN",e)}return ev}
/* ---------- 3 his pool ---------- */
function amPool(){if(!amOn())return[];const L=[];for(const [s,p] of amMaids())if(empMemN(s)>0)L.push({m:s,o:p});
 if(isSrv()&&!S.dead&&(S.age||0)>=18&&!(S.srv.lau>0)&&empMemN(S)>0)L.push({m:S,o:srvM()});return L}
function amCh(m){const C=amD().ch,st=amSt(m);return cl(Math.round(amSung(m)/C.sung+st.sac/C.sac),0,C.cap)}
function amFind(k){if(k==="me")return isSrv()?{m:S,o:srvM()}:null;if(k&&k[0]==="s"){const s=servById(+k.slice(1));return s&&s.role==="maid"?{m:s,o:ownerOf(s)}:null}return null}
/* ---------- 4 a maid's night ---------- */
function amNightGain(m){const st=amSt(m);const q=Math.round(st.sac/20+R(4)-1);amAdd(m,amD().night.b+Math.max(0,Math.round(q/2)))}
function amName(m){try{const used=namesInUse();const sur=freshName().split(" ")[0];const n=sur+" "+m.name;return used.includes(n)?freshName():n}catch(e){return m.name}}
function amRise(m,o,via){const B=BAL.mline,D=amD();const close=!!(o&&o.maid===m);
 if(close)o.maid=o===S?newMaid(pick(MAIDS.filter(x=>x!==m.name)),45):{name:pick(MAIDS.filter(x=>x!==m.name)),loyal:45};
 else if(o&&o.staff){const i=o.staff.indexOf(m);if(i>=0)o.staff.splice(i,1);try{if(typeof mlRose==="function")mlRose(o,m)}catch(e){}}
 const n=newRival(0);Object.assign(n,drawFace());try{f88Carry(n,m)}catch(e){}n.name=amName(m);/* her age: f88Carry */
 n.ag=Object.assign(n.ag||{},{o:"cn"});n.rel=0;n.sung=D.rise.b+Math.round((m.sung||0)/D.rise.d);n.fromMaidOf=o?key(o):null;
 const loy=(m.loyal||0)>=B.riseLoy;if(o)relAdd(o,n,loy?B.riseRel:-B.riseRel);rivals.push(n);
 try{n.nights=(n.nights||0)+1;(n.nightLog=n.nightLog||[]).push(wk());night(n)}catch(e){}
 AMN.rise++;if(via==="fav")AMN.favRise++;
 const how=via==="send"?"hầu thay":via==="fav"?"đã được sủng hạnh, nay hậu cung có chỗ":"được Hoàng thượng cho gọi đến hầu";
 return `Cung nữ ${m.name} của ${o?NM(o):"Nội vụ phủ"} ${how}, được phong ${RANKS[0].n} ${n.name}${loy?", vẫn nhớ ơn chủ cũ":", quay lưng với chủ cũ"}. `}
function amFav(m,o,via){m.fav={w:wk(),n:((m.fav&&m.fav.n)||0)+1};AMN.fav++;const see=o===S||(S.mat||0)>=BAL.mline.seeMat;if(!see)return"";
 return `${o===S?"":"Tai mắt báo: "}cung nữ ${m.name} của ${NM(o)} ${via==="send"?"hầu thay":"được Hoàng thượng cho gọi đến hầu"} một đêm, đã được sủng hạnh; hậu cung không còn chỗ phong, nàng vẫn ở lại hầu chủ. `}
function amNight(m,o,via){amNightGain(m);if(m.sid!=null)empMet(m,"night",1);if(roomFor("consort"))return amRise(m,o,via);return amFav(m,o,via)}
/* the player maid answers his summons */
function amMeNight(){const m=srvM();amNightGain(S);empMet(S,"night",1);const d=amJealD(m);if(d){apply({tin:-d});log(`<span class="r">${m.name} biết đêm qua Hoàng thượng cho gọi ngươi, sa sầm nét mặt.</span> Chủ tin -${d}.`)}
 if(roomFor("consort")){srvRise("Hoàng thượng cho gọi ngươi đến hầu, sủng hạnh rồi phong");try{if(!isSrv())night(S)}catch(e){}return}
 S.srv.fav={w:wk(),n:((S.srv.fav&&S.srv.fav.n)||0)+1};AMN.fav++;log("Đêm qua ngươi được Hoàng thượng sủng hạnh. Hậu cung không còn chỗ phong: ngươi vẫn là cung nữ, nhưng cả cung biết ngươi đã được sủng hạnh.")}
PEND.amNight=()=>{if(!isSrv()||(S.age||0)<18)return null;const m=srvM();const room=roomFor("consort");const D=amD();
 const k=empMemK(S);const mem=EMPMEM[k]?`<p class="past">Ngài còn nhớ ${EMPMEM[k]} hôm trước của ngươi.</p>`:"";
 return{t:`<p>Tổng quản Càn Thanh cung đến truyền: đêm nay Hoàng thượng cho gọi ngươi đến Dưỡng Hòa điện hầu.</p>${mem}`,who:pEmp(),o:[
  {n:"Tắm gội chờ giá",fx:{},x:`Nắm chắc · thành: được sủng hạnh${room?`, rồi được phong ${RANKS[0].n}`:"; hậu cung không còn chỗ phong, ngươi vẫn là cung nữ"}${m?` · kèm: chủ ghen, Chủ tin -${amJealN(m)}: ${chanceW(amJealP(m))}`:""}`,go:()=>amMeNight()},
  {n:"Cáo bệnh",fx:{nt:-D.decline},x:`nhường đêm; Hoàng thượng để ý -${D.decline}`,go:()=>{AMN.decline++}}]}};
/* the kit scene of the summons: the Kính sự phòng picture (jevban KIT_DLGMAP, the same as the consort's "ksp") */
try{if(typeof KIT_DLGMAP==="object"&&KIT_DLGMAP.ksp&&!KIT_DLGMAP.amNight)KIT_DLGMAP.amNight=KIT_DLGMAP.ksp}catch(e){}
/* ---------- 5 Tiến cử: the consort's own choice on her night ---------- */
function amSendQ(v){if(!amOn())return false;try{const m=v&&v.maid;if(!m)return false;const N=agNeedsC(v);let ill=0;try{ill=illOf(v)?1:0}catch(e){}
  /* the reason is hers: tired or ill tonight (no reason → no option, so no slip either); a trusted maid (lòng ≥ riseLoy) is also an ally in his bed */
  const u=(N.rest*BAL.ag.restW+ill)*(1+((m.loyal||0)>=BAL.mline.riseLoy?N.ally:0))*BAL.ag.needW*amD().send*agMW(v,"scheme");if(!(u>0))return false;
  return mindPick([["keep",BAL.ag.routine/BAL.ag.unit],["send",u]],v)==="send"}catch(e){agErr("send",e);return false}}
function amSendX(){const m=S.maid;if(!m)return"";const B=BAL.mline;
 return `Nắm chắc · thành: ${m.name} hầu thay đêm nay, được sủng hạnh${roomFor("consort")?`, rồi được phong ${RANKS[0].n}, ${(m.loyal||0)>=B.riseLoy?"vẫn là người của ngươi":"trở mặt với ngươi"} · kèm: mất ${m.name}, cung nữ mới lòng 45`:"; hậu cung không còn chỗ phong, nàng vẫn ở lại hầu ngươi"}`}
/* ---------- 6 wiring ---------- */
Object.assign(EMPMEM,{tea:"chén trà",teaN:"chén trà",meet:"chén trà",errand:"việc chạy",fest:"chén rượu",night:"đêm hầu"});
(function(){
 const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);amAlias();return r};
 const r0=render;render=function(){amAlias();return r0.apply(this,arguments)};
 const ap0=apply;apply=function(){amAlias();return ap0.apply(this,arguments)};
 /* row 10: a seat for the risen maid */
 const sr0=srvRise;srvRise=function(why){if(amOn()&&!roomFor("consort")){S.srv.fav={w:wk(),n:((S.srv.fav&&S.srv.fav.n)||0)+1};AMN.fav++;log("Hoàng thượng để mắt đến ngươi, nhưng hậu cung không còn chỗ phong: ngươi vẫn là cung nữ.");return}
  const r=sr0.apply(this,arguments);amAlias();return r};
 /* row 11: the staff maid's eye roll goes; she reaches him through his pool */
 const me0=mlEye;mlEye=function(){if(amOn()){AMN.eyeOff++;return false}return me0.apply(this,arguments)};
 /* rows 2, 6–9: his pool, her night */
 const ep0=empPick;empPick=function(C){let M=[];try{M=amPool()}catch(e){}if(!M.length)return ep0.apply(this,arguments);
  try{empPrune();const C2=isSrv()?C.filter(p=>p!==S):C;const O=C2.map(p=>[p,nightCh(p)*empMemF(p)]).concat(M.map(x=>[x,amCh(x.m)*empMemF(x.m)]));
   const t=mindPick(O,S.emp);const z=empWhyZ();
   if(t&&t.m){z.pick=null;z.mem=null;z.k="maid";z.maid={n:t.m===S?"me":t.m.name,of:t.o?(t.o===S?"me":t.o.name):""};S.amT={w:wk(),k:empK(t.m)};AMN.pick++;
    if(t.m===S){AMN.me++;S.amT=null;pushDil(mkP("amNight"),"Hoàng thượng cho gọi")}return null}
   const r=t||C2[0]||C[0];if(r){z.pick=key(r);z.mem=empMemK(r)}return r}catch(e){console.error("jagmaid pick",e);return ep0.apply(this,arguments)}};
 const wt0=empWhyTxt;empWhyTxt=function(d){const z=d&&d.emp;if(z&&z.k==="maid"&&z.maid&&!d.pick){const w=z.maid;
   return w.n==="me"?"Ngài cho gọi ngươi đến Dưỡng Hòa điện hầu.":`Ngài cho gọi ${w.n}, cung nữ cung ${w.of==="me"?"ngươi":w.of}, đến Dưỡng Hòa điện hầu.`}return wt0.apply(this,arguments)};
 const rt0=resolveTonight;resolveTonight=function(){const a=S&&S.amT,tn=S&&S.tonight;const r=rt0.apply(this,arguments);let x="";
  try{if(a){S.amT=null;const dw=wk()-a.w;if(!tn&&dw>=0&&dw<=1&&amOn()){const f=amFind(a.k);if(f&&f.m!==S&&f.o)x=amNight(f.m,f.o,"pick")}}}catch(e){console.error("jagmaid night",e)}return (r||"")+x};
 const rn0=rivalNight;rivalNight=function(v){const r=rn0.apply(this,arguments);let x="";try{x=amNightTea(v)}catch(e){}return (r||"")+x};
 const rw0=rivalsTurn;rivalsTurn=function(){const r=rw0.apply(this,arguments);let x="";try{x=amWeek()}catch(e){}return (r||"")+x};
 /* rows 6, 7, 12: Tiến cử */
 const sm0=sendMaid;sendMaid=function(a){if(!amOn()||!a||!a.maid)return sm0.apply(this,arguments);const m=a.maid;if(a===S)S.tonight=null;AMN.send++;amNightGain(m);
  if(roomFor("consort")){AMN.sendRise++;return amRise(m,a,"send")}return amFav(m,a,"send")||""};
 const k0=PEND.ksp;PEND.ksp=function(){const d=k0.apply(this,arguments);try{if(amOn()&&d&&d.o&&d.o[1])d.o[1].x=amSendX()}catch(e){}return d};
 /* the month: his regard fades (the player's: j42), a free seat goes to a favoured maid first */
 const sv0=servMonth;servMonth=function(){let r=sv0.apply(this,arguments)||"";if(!amOn())return r;try{const D=amD();
   for(const [s] of amMaids())if(s.sung>0)s.sung=Math.max(0,s.sung-D.decay);
   for(const [s,p] of amMaids())if(s.fav&&roomFor("consort"))r+=amRise(s,p,"fav");
   for(const p of consorts())if(p&&p.maid&&p.maid.fav&&(p===S||p.alive&&!p.out)&&roomFor("consort"))r+=amRise(p.maid,p,"fav")}catch(e){console.error("jagmaid month",e)}return r};
 const sM0=srvMonth;srvMonth=function(){const r=sM0.apply(this,arguments);try{if(amOn()&&isSrv()&&!S.dead&&S.srv.fav&&!(S.srv.lau>0)&&roomFor("consort"))srvRise("Nội vụ phủ dâng tên cung nữ đã được sủng hạnh, Hoàng thượng phong")}catch(e){console.error(e)}return r};
})();
Object.assign(window,{amOn,amAlias,amTeaO,amTeaG,amJealD,amJealP,amWeek,amPool,amCh,amNight,amRise,amSendQ,amSendX,amMeNight,amDecide});
