/* ================= j95b: CỔNG ĐỘNG CƠ CHO SỰ KIỆN + NƠI CHỐN TRONG CÂU CHỮ + HIỂU LẦM DO TIN ĐỒN =================
   Adds three things to j95 (wraps only; edits no file):
   1) EVENT ACTOR GATE. Every event that names a real person (j68 weekly templates, j7 ev(), stock dilemmas, j4/j42 story cards,
      j71 merit, j72 quests, gifts) declares each actor's role: h = acts against someone (kind for motiveOK, target = her or another
      actor), f = acts kindly toward her, n = neutral (reason given). Actors are chosen only among people who pass motiveOK (j68 rv6 is
      filtered while a template picks; other sources re-pick a person who passes or the event does not fire), and every actor's reason
      is written into the record (S.roster.acts, src = event id) when the event is shown.
   2) PLACES IN WORDS. When an event card or a news line says someone is somewhere ("đứng đợi ngự giá ở Ngự hoa viên", "hẹn ngươi ở đình
      nghỉ vắng", "ghé cung ngươi"), that person is moved in the record to that place for the current khắc, so map, stage, tai mắt and
      the record agree. Table-driven for the event templates (per variant), a lexicon scan for every other card.
   3) MISUNDERSTANDING BY RUMOUR. A rumour (true or the spreader's lie) spread by someone with a motive (an NPC 'rumor' act, a j70 rumour
      plot, a j70 plot whose blame is pushed onto her, j78-style evidence in someone's hands) can make a consort believe that SHE harmed
      her: Oán up, affection down, and a recorded exception "tin đồn: …, nguồn: …" lets that consort retaliate. She hears of it only as
      "nghe đồn" (never as fact). She can clear herself: explain (card option or face to face, "Giải bày hiểu lầm"), or trace the source
      (true finding). A lie cleared turns the victim's grudge onto the liar.
   Off with window.__j95off (whole j95) or window.__j95boff (only this module). Audit hooks: J95B.ev (events shown + reasons),
   J95B.bind (place bindings), J95B.rumLog (rumour seeds), J95B.notes (what she was told).
   ===================================================================================================================== */
const J95B={ev:[],bind:[],rumLog:[],notes:[],errs:[],stat:{evPass:0,evBlock:0,repick:0,bind:0,bindSkip:0,rum:0,rumTrue:0,heard:0,clear:0,clearOk:0,trace:0,revenge:0},cur:null,pend:new WeakMap(),inAp:0,apG:null,RUMW:8};
function j95bOn(){return j95on()&&!window.__j95boff}
function j95bErr(w,e){try{if(J95B.errs.length<20)J95B.errs.push(w+": "+(e&&e.message||e))}catch(x){}}
function j95bZ(){const z=S.j95b=S.j95b||{};z.rum=z.rum||[];z.harm=z.harm||{};z.u=z.u||0;return z}

/* ---------------- 1. ROLES ---------------- */
/* slot role: {h:kind} against her (or {h:kind,to:slot} against another actor), {f:kind} kind to her, {n:"reason"}, {tgt:slot,h:kind} = this
   slot is the TARGET of that slot's act (gate on that actor), {me:1} = she chose this person herself. Extra flags: nb = never block (the act
   already happened and passed its own gate), w = weight for a re-pick, opt = may be empty. */
const E95B={/* j68 templates: r = roles by slot (same order as spec.a), at = place by variant ("*" all variants; object {slot:place}) */
 gossipTea:{r:[{f:"visit"}],at:"home"},giftArrive:{r:[{f:"gift"}]},lostItem:{r:[{n:"cung nữ thân tín báo mất đồ"}],x:{c:"svthief"}},
 sickServant:{r:[{n:"ốm đau"}]},maidQuarrel:{r:[{n:"kẻ hầu xích mích"},{n:"kẻ hầu xích mích"}]},brokenHeirloom:{r:[{n:"sơ ý (vốn run tay hoặc lơ là)"}]},
 spoiledFood:{r:[{n:"bẩm việc bếp núc"}]},eunuchSqueeze:{r:[{h:"squeeze"}]},embroidery:{r:[{n:"việc thêu chung do Cục Thượng y giao"}],at:[null,"home",null,null]},
 servGamble:{r:[{n:"tính tham của"}]},proudVisit:{r:[{h:"provoke"}],at:["home","home","home","home",null]},kindVisit:{r:[{f:"visit"}],at:"home"},
 slyVisit:{r:[{h:"spy"}],at:"home"},thMama:{r:[{n:"Thái hậu sai ma ma đến"}]},docCheck:{r:[{n:"phận sự thái y"}],at:"home"},
 painter:{r:[{n:"vâng chỉ, được cử đến"}],at:"home"},musician:{r:[{n:"phụng mệnh, được cử đến"}],at:"home"},newGirlAdvice:{r:[{f:"visit"}],at:["home","here","home","home"]},
 eunRequest:{r:[{n:"kẻ hầu xin ơn"}]},empDish:{r:[{n:"Hoàng thượng nhớ đến ngươi"}]},empPoem:{r:[{n:"Hoàng thượng nhớ đến ngươi"}]},
 empSulk:{r:[{n:"Hoàng thượng phiền muộn, tìm người thân"}],at:["home","dtd","home",null,"home"]},empChess:{r:[{n:"Hoàng thượng muốn chơi cờ"}],at:["thu",null,null,null,"home"]},
 empAsksAbout:{r:[{n:"Hoàng thượng hỏi chuyện"},{n:"được Hoàng thượng nhắc tên"}]},empGiftOdd:{r:[{n:"Hoàng thượng ban thưởng"}]},empIncognito:{r:[{n:"Hoàng thượng muốn vi hành"}]},
 empSleepRead:{r:[{n:"Hoàng thượng tìm chỗ nghỉ"}],at:"home"},autumnMoon:{r:[{f:"visit"}],at:["vuon","home","own",null]},springAllergy:{r:[{n:"phận sự thái y"}]},
 stormNight:{r:[{n:"chuyện thời tiết"}]},borderNews:{r:[{n:"việc triều chính"}],at:["dtd",null,null,null]},clanFather:{r:[{f:"visit"}],at:"home"},
 kidSick:{r:[{n:"con ốm"},{n:"phận sự thái y"}]},kidFight:{r:[{n:"trẻ con gây gổ"},{n:"con hai cung xích mích"}],at:[null,null,null,{0:"vuon"}]},kidGift:{r:[{n:"con quyến luyến mẹ"}]},
 bribedServ:{r:[{n:"kẻ hầu trung thành báo chủ"},{h:"bribe"}]},servRomance:{r:[{n:"chuyện riêng của kẻ hầu"}]},servLeave:{r:[{n:"việc nhà của kẻ hầu"}]},
 newServSus:{r:[{n:"kẻ hầu có điều đáng ngờ (tính tò mò hoặc làm tai mắt)"}]},rumorPreg:{r:[{n:"bị đồn"},{h:"rumor",to:0}]},rumorSpy:{r:[{n:"bị đồn"}]},
 rumorEvidence:{r:[{h:"spy"}]},rumorEmpLove:{r:[{n:"bị đồn"},{h:"rumor",to:0}]},hairpinThief:{r:[{n:"nghi can"},{n:"nghi can"},{n:"nghi can"}]},
 poisonedFish:{r:[{n:"kẻ hầu báo chuyện lạ"}]},nightSteps:{r:[{n:"cung nữ thân tín báo chuyện lạ"}]},silkAllot:{r:[{n:"Nội vụ phủ chia lụa"}]},
 templeRite:{r:[{n:"Thái hậu lễ Phật"}],at:["tn",null,null,"tn"]},hhSummons:{r:[{n:"bổn phận Hoàng hậu quản lục cung"}],at:"own"},
 allyOffer:{r:[{f:"ally"},{tgt:0,h:"plot"}],at:["vuon",null,null,null]},borrowDress:{r:[{f:"visit"}],at:"home"},doubtVisit:{r:[{h:"provoke"}],at:["home","here",null,"kn"]},
 empWager:{r:[{n:"Hoàng thượng bày trò vui"}],at:["vuon",null,null,null]},empDream:{r:[{n:"Hoàng thượng kể giấc mơ"}]},empOldFlame:{r:[{n:"Hoàng thượng nhớ người cũ"}]},
 kidTutor:{r:[{n:"thầy dạy tâu chuyện học"}],at:[null,null,null,{0:"vuon"}]},kidLie:{r:[{n:"trẻ con nói dối"},{n:"bị con đổ lỗi"}]},servHero:{r:[{n:"kẻ hầu trung thành"}]},
 rumorTH:{r:[{n:"lời đồn về Thái hậu"}]},rumorFavor:{r:[{n:"lời đồn về ân sủng"}]},lotusSeason:{r:[{f:"visit"}],at:["vuon","vuon","home","vuon"]},
 droughtPrayer:{r:[{n:"việc triều chính"}]},envoyGift:{r:[{n:"việc triều chính"}]}};
const P95B={/* other saveable cards (mkP id): params → role; at = place per param */
 /* port 16/11: cards added on main since schedules2 (the act behind each already passed the gate in runAct) */
 tsbBul:{p:{a:{h:"$k"}}},vuoan:{p:{a:{h:"frame",key:1}}},menEnc:{p:{v:{n:"đi cùng nam nhân trong hậu cung (jmen: việc có thật, đã có lý do)"},lv:{n:"người nam nhân để ý"},hv:{n:"bóng phi tần thoáng thấy"}}},tsbOmen:{p:{a:{h:"$k",key:1}}},rcpacc:{p:{acc:{n:"tố ngươi vì món ngươi tặng làm hại người (việc có thật, jrcp)",key:1}}},tsbFirst:{p:{v:{n:"lần đầu gặp mặt, nàng mang hiềm khích cũ có thật (jtsb tsbGrudge)"}}},pgin:{p:{f:{n:"gửi quà ăn (việc tặng đã qua cổng động cơ)",key:1}}},
 doll:{p:{v:{h:"frame",w:v=>1+(v.ghen||0)}}},guardrumour:{p:{v:{h:"rumor",opt:1}}},ghost:{p:{v:{h:"rumor",opt:1}}},
 pact:{p:{v:{f:"ally"}},q:{h:"plot"},at:{v:"vuon"}},maidhostage:{p:{v:{h:"uyhiep"}}},taster:{p:{v:{h:"poison",w:v=>1+(v.malice||0)}}},
 rvframe:{p:{a:{h:"frame",to:"b"},b:{n:"bị nhắm vu oan"}},at:{a:"vuon"}},rvquarrel:{p:{a:{h:"provoke",to:"b"},b:{n:"bị gây sự"}},at:{a:"vuon",b:"vuon"}},
 rvmusk:{p:{a:{h:"musk",to:"b"},b:{n:"bị nhắm hại thai"}}},rvbribe:{p:{a:{h:"bribe",to:"b"},b:{n:"bị giấu thẻ bài"}},at:{a:"ksp"}},
 poisongift:{p:{v:{n:"nạn nhân quà độc (kẻ gửi giấu mặt)"}}},comet:{p:{v:{n:"bị điềm xấu ứng vào",opt:1}}},caning:{p:{v:{n:"bị Hoàng hậu phạt"}},at:{v:"kn",queen:"kn"}},
 coldvisit:{p:{f:{n:"phế phi ở lãnh cung"}}},fire:{p:{v:{n:"cung bị cháy"}},at:{v:"own"}},coldletter:{p:{f:{n:"phế phi xin giúp"},v:{n:"được nhắc đến",opt:1}}},
 loveletter:{p:{v:{n:"thư riêng bị tai mắt nhặt được"}}},thd1:{p:{v:{h:"accuse",w:v=>1+(v.ghen||0)}}},giftin:{p:{f:{f:"gift",nb:1,key:1}}},
 giftpick:{p:{v:{me:1}}},/* r3 reviewer: her own scheme mini-game pick (jsgame) and her blood-test accusation (jroute) are her acts, not an NPC act */sgpick:{p:{v:{me:1}}},rtNgNpc:{p:{v:{me:1}}},/* r4: jroute NPC acts — rtBm = the witness blackmails her (uyhiep, gated in rtCaughtBy/rtMonth; never re-picked), rtNpcEsc = a consort really preparing to flee, seen at the place the record puts her */rtBm:{p:{v:{h:"uyhiep",nr:1}}},rtNpcEsc:{p:{v:{n:"đang lén chuẩn bị trốn khỏi cung (việc có thật: kế đã lập từ trước)"}}},/* r4 (sens audit (g)): jcmaid — her maid shoved the other side's maid (her maid's temper; the mistress there is only the injured side); the other side's people scorn her maid (a hostile act: the mistress must have a motive, else another one is picked) */cmBrawl:{p:{v:{n:"chủ của cung nữ bị cung nữ của ngươi xô ngã (việc có thật: cung nữ ngươi nóng tính)"}}},cmScorn:{p:{v:{h:"provoke"}}},plantpick:{p:{v:{me:1}}},j70start:{p:{v:{me:1}}},
 cnvBribe:{p:{r:{h:"bribe",toMis:1}}},cnvBlack:{p:{r:{h:"uyhiep"}}},cnvOrd:{p:{t:{tgt:"mis",h:"$k"}}},
 j71m:{p:{a0:{n:"việc lập công (ngươi tự quyết)",opt:1}}},q72o:{q72:1},
 j70thr:{p:{v:{h:"plot",warn:1}}},j71f:{p:{a:{f:"visit",nr:1,opt:1}}},
 /* j92 "Bị tố ăn cắp": the accuser planted the thing weeks ago; that act passed the gate then (j95c wdFrame) and its reason was kept */
 wdframe:{p:{a:{h:"giahoa",nb:1,key:1,plant:1}}}};
const ROLEK95={rv:"rv",sv:"sv",maid:"maid",emp:"emp",th:"th",doc:"doc",eun:"eun",ksp:"ksp",kid:"kid",man:"man"};

/* the record id of an actor object (j68 A6 shape {o,k} or a rival) */
function j95bRid(k,o,id){try{if(k==="rv")return o&&o.id!=null?"v"+o.id:null;if(k==="emp")return"emp";if(k==="th")return S.thDead?null:"th";if(k==="doc")return"c:ty";if(k==="eun")return"c:tq";if(k==="ksp")return"c:ksp";
 if(k==="sv")return o&&o.sid!=null?"s"+o.sid:null;if(k==="maid")return S.maid?"mm:me":null;if(k==="man")return o&&o.id;if(k==="kid"){const i=(S.kids||[]).indexOf(o);return i>=0?"k:me:"+i:null}}catch(e){}return null}
function j95bNm(p){return p===S?"ngươi":p&&p.name?p.name:"?"}
/* gate one actor. a = rival / S / other object; t = target person (S by default) */
function j95bGate(role,a,t,kind,ctx){t=t||S;ctx=ctx||{};
 if(!role)return{ok:true,why:"không có vai"};
 if(role.me)return{ok:true,why:"người chơi tự chọn người này"};
 if(role.n!=null)return{ok:true,why:"trung lập: "+role.n};
 if(!a)return role.opt?{ok:true,why:"không có ai"}:{ok:false,why:"không có người"};
 if(a.rel==null||a===S){/* not a consort: servants / court eunuchs */
  if(kind==="svthief"){const s=a;if(netIs(s,"greed"))return{ok:true,why:"tính tham của"};if(s.spyFor&&s.spyFor!=="me")return{ok:true,why:"làm tai mắt cho người khác"};if((s.loyal||50)<35)return{ok:true,why:`lòng với chủ thấp (${s.loyal})`};return{ok:false,why:"kẻ hầu không có lý do lấy đồ"}}
  if(kind==="squeeze"){if(S.rank<=2)return{ok:true,why:`thái giám khinh cung phẩm thấp (phẩm ${S.rank}), đòi lệ phí`};return{ok:false,why:"phẩm cao, thái giám không dám làm khó"}}
  return{ok:true,why:role.h?"kẻ dưới làm theo lệ":"kẻ dưới lấy lòng"}}
 if(role.h&&a===t)return{ok:false,why:"không ai tự hại mình"};
 if(role.h){const k=H95.has(kind)?kind:"harm";const g=motiveOK(a,t,k);if(!g.ok&&role.warn&&t===S&&j95bRealPlot(a))return{ok:true,ex:1,why:"mưu thật đã lập từ trước, đang chuẩn bị nhắm vào ngươi"};return g}
 if(role.f){const k=F95.has(kind)?kind:"visit";return motiveOK(a,t,k)}
 return{ok:true,why:""}}
/* the record: one line per actor (who, kind, target, reason) */
function j95bAct(id,k,tid,g,src){try{const L=S.roster&&S.roster.acts;const e={id,kh:j95kh(),k,t:tid,why:g.why||"",ok:g.ok?1:0,ex:g.ex?1:0,src};if(L){L.push(e);if(L.length>60)L.shift()}return e}catch(x){return null}}

/* ---- j68: pick only actors who pass, while the template picks (rv6 filtered by the slot's role) ---- */
function j95bSlotsRv(s){const L=[];(s.a||[]).forEach((k,i)=>{if(k==="rv")L.push(i)});return L}
function j95bRvOK(T,s,slot,v){const role=T.r[slot];if(!role||role.n!=null||role.me)return true;
 if(role.tgt!=null){const pid=J95B.cur.picks[role.tgt];const a=pid!=null?RV(pid):null;return !a||j95bGate({h:role.h},a,v,role.h).ok}
 if(role.to!=null){const pid=J95B.cur.picks[role.to];const t=pid!=null?RV(pid):null;if(!t||t===v)return false;return j95bGate(role,v,t,role.h||role.f).ok}
 return j95bGate(role,v,S,role.h||role.f).ok}

/* ---- the check at card creation (mkP): every actor of the card; re-pick a person who passes where allowed ---- */
function j95bActors(id,pp){/* → [{slot,k,o,role,t,kind}] */const out=[];
 if(id.indexOf("e68")===0){const s=E68I[id.slice(3)],T=E95B[id.slice(3)];if(!s)return null;if(!T)return (s.a||[]).length?{miss:1}:[];
  (s.a||[]).forEach((kind,i)=>{const a=(typeof A6==="function")?A6(kind,pp["a"+i]):null;out.push({slot:"a"+i,k:ROLEK95[kind]||kind,o:a?a.o:null,role:T.r[i]||{n:"có mặt"},idx:i})});
  for(const r of out){const ro=r.role;if(ro.to!=null){const x=out[ro.to];r.t=x?x.o:null}else if(ro.tgt!=null){const x=out[ro.tgt];r.by=x?x.o:null}}
  if(T.x)for(const key in T.x){const sid=pp[key];if(sid==null)continue;const s2=servById(sid);if(s2)out.push({slot:key,k:"sv",o:s2,role:{h:T.x[key]},kind:T.x[key]})}
  return out}
 const T=P95B[id];if(!T)return null;
 if(T.q72){const x=pp.x;if(!x)return[];if(x.rk==="rv"||x.rk==="hh"){const v=RV(x.ri);out.push({slot:"x.ri",k:"rv",o:v,role:{f:"visit"}})}if((x.bk==="rv"||x.bk==="hh")&&x.bi!=null)out.push({slot:"x.bi",k:"rv",o:RV(x.bi),role:{n:"người được nhắc trong việc nhờ"}});return out}
 for(const key in T.p){const role=T.p[key];let o=null;const raw=pp[key];if(raw!=null)o=role.key?byKey(raw):RV(raw);out.push({slot:key,k:"rv",o,role,raw})}
 for(const r of out){const ro=r.role;if(ro.to)r.t=(out.find(x=>x.slot===ro.to)||{}).o;if(ro.toMis||ro.tgt==="mis"){let m=null;try{m=srvM()}catch(e){}if(ro.toMis)r.t=m;else r.by=m||null}if(ro.h==="$k")ro.hk=pp.k}
 if(T.q){/* pact: the ally also moves against the Hoàng hậu */const v=(out.find(x=>x.slot==="v")||{}).o;try{if(v&&qOn()&&rivals[0]!==v)out.push({slot:"queen",k:"rv",o:v,role:{h:T.q.h},t:rivals[0],xtra:1})}catch(e){}}
 return out}
function j95bPlanted(a,t){try{return j95z().plant[key(a)+">"+key(t||S)]||null}catch(e){return null}}
function j95bJudge(r){const ro=r.role;if(ro.plant&&r.o){const f=j95bPlanted(r.o,r.t||S);return{ok:true,ex:1,why:f?`đã sai người lén đặt đồ từ tuần ${f.w} (lúc ấy: ${f.why})`:"đã sai người lén đặt đồ từ trước (ván cũ chưa ghi lý do lúc đặt)"}}if(ro.tgt!=null&&r.by!==undefined){const a=r.by;if(!a)return{ok:true,why:"không có ai"};const k=ro.hk||ro.h;return j95bGate({h:k},a,r.o,k)}
 return j95bGate(ro,r.o,r.t||S,ro.hk||ro.h||ro.f)}
function j95bCheck(id,pp){const L=j95bActors(id,pp);if(L==null)return null;if(L.miss)return{ok:true,list:[],miss:1};
 for(const r of L){r.g=j95bJudge(r);
  if(!r.g.ok&&!r.role.nb&&!r.role.nr&&id.indexOf("e68")!==0&&P95B[id]&&!r.xtra&&r.raw!=null&&!r.role.key){/* re-pick a person who passes */
   const others=L.filter(x=>x!==r&&x.o).map(x=>x.o).concat([r.by,r.t].filter(Boolean));const C=liveRivals(false).filter(v=>!others.includes(v)&&!v.confined&&j95bJudge(Object.assign({},r,{o:v,t:r.role.to?(L.find(x=>x.slot===r.role.to)||{}).o:r.t})).ok);
   if(C.length){const w=r.role.w;const v=w?j95pw(C.map(x=>[x,w(x)])):C[Math.floor(Math.random()*C.length)];pp[r.slot]=v.id;r.o=v;r.g=j95bJudge(r);J95B.stat.repick++;
    for(const x of L)if(x.role.to===r.slot)x.t=v}}
  if(r.xtra&&!r.g.ok){/* pact needs a reason against the Hoàng hậu too: re-pick the ally */const C=liveRivals(false).filter(v=>j95bGate({f:"ally"},v,S,"ally").ok&&j95bGate({h:"plot"},v,rivals[0],"plot").ok);
   if(C.length&&pp.v!=null){const v=C[Math.floor(Math.random()*C.length)];pp.v=v.id;const a=L.find(x=>x.slot==="v");a.o=v;a.g=j95bJudge(a);r.o=v;r.g=j95bJudge(r);J95B.stat.repick++}}}
 const bad=L.filter(r=>!r.g.ok&&!r.role.nb);return{ok:!bad.length,list:L,bad}}

/* ---------------- 2. PLACES IN WORDS ---------------- */
const LEX95B=[[/ngự hoa viên|vườn ngự|hòn non bộ|thái dịch trì|thủy tạ|đình thiên thu|đình nghỉ/,"vuon"],[/cần chính điện|ngự thư phòng/,"thu"],[/dưỡng hòa điện|dưỡng tâm điện|tẩm điện hoàng thượng/,"dtd"],
 [/đức thọ cung|từ ninh|phật đường/,"tn"],[/càn ninh/,"kn"],[/thái y viện/,"tyv"],[/kính sự phòng/,"ksp"],[/trường môn viện|lãnh cung/,"lc"]];
/* a sentence that is hearsay, habit, past, future, a wish, or about sound carrying, does not place anyone now */
const NOW95B=/lời đồn|đồn |đồn:|rỉ tai|nghe nói|bóng gió|\bhay |thường|từng |hôm nọ|hôm qua|đêm qua|năm xưa|trước đây|\bsẽ |ngày mai|tối mai|đêm nay|tối nay|\bsắp |\bmuốn |(?:^|\s)định |\bnếu |\(sai |sai người|\bhứa|mơ thấy|vọng sang|có thể|nghi |\bmời .* ra |ngày rằm/;
const AGENT95B=/(người của|người bên|cung nữ của|cung nữ bên|thái giám của|thái giám bên|kẻ hầu của|người hầu của|con của|cung|tặng|cho|của|về|nhắm vào|hại|vu|bắt|thăm|giúp|tố|với)\s*$/;
function j95bStrip(h){return String(h||"").replace(/<br\s*\/?>/gi,". ").replace(/<\/p>/gi,". ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ")}
function j95bScan(h){/* → [{id,k,why}] who the words place where, now */const out=[];const txt=j95bStrip(h);const sents=txt.split(/(?<=[.!?…][)"”']?)\s+|\s*;\s*/);
 const L=liveRivals(true).concat(rivals.filter(v=>v.alive&&v.out)).map(v=>[v,v.name]).filter(x=>x[1]).sort((a,b)=>b[1].length-a[1].length);
 for(const s0 of sents){const s=s0.trim();if(!s)continue;const lo=s.toLowerCase().replace(/phe (càn ninh|đức thọ|từ ninh|dưỡng hòa|cần chính)\S*/g,"").replace(/sổ (sách )?kính sự phòng/g,"sổ");const lo2=j95bNoTitles(lo);if(NOW95B.test(lo2))continue;const k=j95bLexNow(lo2);if(!k)continue;
  const used=[];for(const [v,nm] of L){let i=s.indexOf(nm);while(i>=0){if(!used.some(u=>i>=u[0]&&i<u[1])){used.push([i,i+nm.length]);const pre=s.slice(Math.max(0,i-18),i).toLowerCase();
     if(!AGENT95B.test(pre)&&!j95bPastHas("v"+v.id,k))out.push({id:"v"+v.id,k,why:s.slice(0,90)})}i=s.indexOf(nm,i+1)}}
  if(/^(hoàng thượng|ngài)\b/i.test(s))out.push({id:"emp",k,why:s.slice(0,90)});if(/^thái hậu\b/i.test(s)&&!S.thDead)out.push({id:"th",k,why:s.slice(0,90)})}
 const seen={};return out.filter(x=>{const kk=x.id;if(seen[kk])return false;seen[kk]=1;return true})}
/* a named staff title ("Quản sự ma ma Càn Ninh cung", jstaff BAL.staff.posts) names her office, not where anyone stands now */
function j95bNoTitles(lo){try{for(const p of ((typeof BAL!=="undefined"&&BAL.staff&&BAL.staff.posts)||[])){const pl=p.palace.toLowerCase();lo=lo.split((p.title+" "+p.palace).toLowerCase()).join(" ").replace(new RegExp("(ma ma|cô cô)\\s+((ở|bên|của)\\s+)?"+pl,"g"),"$1")}}catch(e){}return lo}
/* put one person at a place for the current khắc (and say why) */
function j95bPut(id,k,act,why,src){const R=S.roster;if(!R||R.key!==j95key())return"norec";const kh=j95kh();let e=R.P[id];
 if(k==="here")k=S.place||"home";
 if(id[0]==="v"){const v=RV(+id.slice(1));if(!v||!v.alive)return"gone";if(k==="own")k=v.out?"lc":palaceOf(v);if(v.out&&k!=="lc")return"out";if(v.confined&&k!==palaceOf(v))return"confined"}
 else if(k==="own"){k=id==="th"?"tn":id==="emp"?"dtd":null;if(!k)return"noown"}

 if(e&&(e[kh][1]==="tryst"||e[kh][1]==="meet"))return"busy";
 if(!e){const m=(S.men||[]).find(x=>x.id===id&&x.alive);if(!m)return"norec";R.who[id]=[m.name,m.role];e=R.P[id]=[0,1,2,3].map(i=>i<kh?[J95OUT,"away",null,"chưa vào cung"]:[k,"go",null,"lặng lẽ đến"])/* khắc already shown: he was not in the palace (j95c N1) */}
 const tgt=k==="home"?"me":null;e[kh]=[k,act||"here",tgt,why];J95B.bind.push({id,k,kh,key:R.key,src,why});if(J95B.bind.length>400)J95B.bind.splice(0,100);J95B.stat.bind++;return"ok"}
function j95bPlaceCard(m){/* table-driven for template cards, lexicon for the rest */const out=[];const id=m.pid,pp=m.pp||{};
 if(id&&id.indexOf("e68")===0){const T=E95B[id.slice(3)],s=E68I[id.slice(3)];if(T&&T.at&&s){const vi=(pp.vi||0)%((s.v||[""]).length||1);const at=T.at==="*"||typeof T.at==="string"?T.at:T.at[vi];
   if(at){const M=typeof at==="string"?{0:at}:at;for(const i in M){const kind=(s.a||[])[i];const a=A6(kind,pp["a"+i]);if(!a)continue;let rid=j95bRid(ROLEK95[kind]||kind,a.o);
     if(kind==="rv"&&a.o.queen&&M[i]==="own")rid="v"+a.o.id;if(rid)out.push({id:rid,k:M[i],why:"sự kiện: "+(m.t||FAM6[s.fam]||"")})}}}return{table:1,L:out}}
 if(id&&P95B[id]&&P95B[id].at){const T=P95B[id];for(const key in T.at){let rid=null;if(key==="queen"){try{if(qOn())rid="v"+rivals[0].id}catch(e){}}else{const v=pp[key]!=null?RV(pp[key]):null;if(v)rid="v"+v.id}
   if(rid)out.push({id:rid,k:T.at[key],why:"sự kiện: "+(m.t||id)})}return{table:1,L:out}}
 if(id&&(E95B[String(id).slice(3)]||P95B[id]))return{table:1,L:out};
 return{table:0,L:j95bScan((m.h||"")+" "+(m.t&&!m.h?m.t:""))}}

/* an act decided between buổi (NPC effort at the turn of the week / month). The khắc already shown keep what was shown (never rewritten,
   map counts R.m untouched): if the record of the buổi just ended already has her there, that is the moment; otherwise the act lands at
   the start of the coming buổi (applied by j95c right after that buổi is planned, before anyone sees it). In the present buổi it happens
   now, unless she stands where the change would show (then the line is not told: "seen"). */
function j95bPutPast(id,k,act,why,src){const R=S.roster;if(!R||!R.P)return"norec";if(id[0]==="v"){const v=RV(+id.slice(1));if(!v||!v.alive||v.out||v.confined)return"skip"}
 const e=R.P[id];
 if(R.key===j95key()){if(!e)return"norec";const kh=j95kh();if(e[kh][0]===k)return"ok";const me=R.P.me?R.P.me[kh][0]:S.place;if(e[kh][0]===me||k===me){J95B.stat.pastSeen=(J95B.stat.pastSeen||0)+1;return"seen"}return j95bPut(id,k,act,why,src)}
 if(e)for(let i=3;i>=0;i--)if(e[i]&&e[i][0]===k){J95B.bind.push({id,k,kh:i,key:R.key,wk:R.wk,b:R.b,past:1,src,why,had:1});if(J95B.bind.length>400)J95B.bind.splice(0,100);J95B.stat.bind++;return"ok"}
 const P=J95B.next=J95B.next||[];if(P.some(x=>x.id===id&&x.k!==k)){J95B.stat.pastDrop=(J95B.stat.pastDrop||0)+1;return"seen"}/* one place per person at the first khắc of the coming buổi; a second place for her is not told */
 if(!P.some(x=>x.id===id&&x.k===k))P.push({id,k,act,why,src});J95B.stat.pastNext=(J95B.stat.pastNext||0)+1;return"ok"}
function j95bPastHas(id,k){for(let i=J95B.bind.length-1;i>=0;i--){const b=J95B.bind[i];if(b.past&&b.id===id&&b.k===k&&wk()-b.wk<=1)return b}return null}
/* the place the words put someone AT (table order, as before); a place being left ("được tha khỏi lãnh cung", "rời ngự hoa viên") puts nobody there */
function j95bLexNow(lo){for(const [re,c] of LEX95B){const g=new RegExp(re.source,"g");let m;while((m=g.exec(lo))){if(!/(khỏi|rời|dời từ|từ)\s*$/.test(lo.slice(Math.max(0,m.index-10),m.index)))return c}}return null}
function j95bLexOf(t){const lo=String(t||"").toLowerCase();for(const [re,c] of LEX95B)if(re.test(lo))return c;return null}

function j95bPastText(r,src){/* bind every "X ... at <place>" sentence of a turn report to the buổi just ended; drop false ones */
 const parts=String(r).split(/(?<=[.!?][)"”']?)\s+/);const keep=[];
 for(const sen of parts){const L=j95bScan(sen);let drop=false;for(const x of L){if(x.id[0]!=="v")continue;const v=RV(+x.id.slice(1));if(!v)continue;
   if((v.out&&x.k!=="lc")||(v.confined&&x.k!==palaceOf(v))){drop=true;break}if(j95bPutPast(x.id,x.k,"here",x.why,src)==="seen"){drop=true;break}}if(!drop)keep.push(sen)}
 return keep.join(" ")}
/* warnings ("Lời cảnh báo" from the head maid, "Tai mắt báo tin" from a tell) about someone who has no motive and no real plot are not true: dropped */
function j95bRealPlot(v){try{const z=typeof j70==="function"&&j70();return !!(z&&z.pl&&z.pl.some(p=>!p.end&&p.a===v.id&&p.t==="me"))||!!(v.plan&&v.plan.t===key(S))}catch(e){return false}}
function j95bPurgeWarn(from){if(!j95bOn()||!S||S.dead)return 0;let n=0;for(let i=Q.length-1;i>=(from||0);i--){const m=Q[i];if(!m||m.pid||m.opts&&m.opts.length&&m.t!=="Lời cảnh báo"||!/^(Lời cảnh báo|Tai mắt báo tin)$/.test(m.t||""))continue;
  let v=null;if(m.who&&m.who.w&&m.who.w[0]==="r")v=RV(m.who.w[1]);if(!v)v=liveRivals(true).find(x=>String(m.h||"").includes(x.name));if(!v)continue;
  const g=motiveOK(v,S,"plot");if(g.ok||j95bRealPlot(v))continue;j95bAct("v"+v.id,"warn","me",{ok:false,why:"lời cảnh báo bị bỏ vì không thật: "+g.why},"warn");Q.splice(i,1);n++}return n}
/* ---------------- 3. SHOWN: the card is on screen → record the reasons and the places ---------------- */
function j95bPresent(m){if(!m||m.__b95||!j95bOn()||!S||S.dead)return;m.__b95=1;try{
 const ent={src:m.pid||"text",t:String(m.t||"").slice(0,40),key:j95key(),kh:j95kh(),wk:wk(),actors:[],places:[]};
 if(m.pid&&(m.pid.indexOf("e68")===0||P95B[m.pid])){let chk=J95B.pend.get(m.pp);if(!chk)chk=j95bCheck(m.pid,Object.assign({},m.pp||{}))||{list:[]};
  for(const r of chk.list||[]){const rid=r.k==="rv"?(r.o&&r.o.id!=null?"v"+r.o.id:null):j95bRid(r.k,r.o);
   const tid=r.t?(r.t===S?"me":"v"+r.t.id):r.by?(r.by===S?"me":"v"+r.by.id):(r.role.f||r.role.h?"me":null);const k=r.role.n!=null?"present":r.role.me?"chosen":(r.role.hk||r.role.h||r.role.f);
   const who=r.role.tgt!=null&&r.by?"v"+r.by.id:rid;const g=r.g||{ok:true,why:""};
   if(r.o||r.by){j95bAct(who,k,r.role.tgt!=null?rid:tid,g,m.pid);ent.actors.push({id:who,k,t:r.role.tgt!=null?rid:tid,role:r.role.h?"h":r.role.f?"f":r.role.me?"me":"n",ok:g.ok?1:0,why:g.why||"",ex:g.ex?1:0,af:(r.o&&r.o.rel!=null&&!r.role.n&&(r.t||S)===S)?aff(r.o,S):null})}}
  if(chk.miss)ent.miss=1}
 const P=j95bPlaceCard(m);ent.table=P.table;
 if(m.__ap95&&!P.table){const R=S.roster;if(R&&R.key===j95key()){const kh=j95kh();for(const [id,e] of m.__ap95){const v=RV(+id.slice(1));if(!R.P[id]||!v||!v.alive||v.out||v.confined){ent.places.push({id,k:e[0],res:"skip"});continue}R.P[id][kh]=e.slice();J95B.bind.push({id,k:e[0],kh,key:R.key,src:"j24"});ent.places.push({id,k:e[0],res:"ok"})}j95sync()}}
 for(const x of P.L){if(m.__ap95&&m.__ap95.some(a=>a[0]===x.id))continue;const r=j95bPut(x.id,x.k,x.id==="emp"||x.id==="th"?"here":(x.k==="home"?"visit":"here"),x.why,m.pid||"text");ent.places.push({id:x.id,k:x.k,res:r});if(r!=="ok")J95B.stat.bindSkip++}
 if(P.L.length)j95sync();
 J95B.ev.push(ent);if(J95B.ev.length>300)J95B.ev.splice(0,100);if(ent.actors.length)J95B.stat.evPass++}catch(e){j95bErr("present",e)}}

/* ---------------- 4. RUMOURS THAT MAKE SOMEONE BELIEVE SHE HARMED THEM ---------------- */
const RUMF95B=["xui Hoàng thượng lạnh nhạt với nàng","nói xấu nàng trước mặt Hoàng thượng","mua chuộc Kính sự phòng giấu thẻ bài của nàng","sai người lục lọi cung nàng","đứng sau lời đồn bẩn về nàng","chê nàng trước mặt Thái hậu"];
function j95bClaim(y){/* true if she really harmed y (her own acts), else the spreader's lie shaped on y's real luck */const h=j95bZ().harm[y.id];
 if(h&&wk()-h.w<=12){const verb=(J78VERB[h.k]||"hại {t}").replace("{t}","nàng");return{txt:"đã "+verb,truth:true}}
 let L=RUMF95B.slice();if((y.sung||0)<20)L=["xui Hoàng thượng lạnh nhạt với nàng","mua chuộc Kính sự phòng giấu thẻ bài của nàng"];return{txt:L[Math.floor(Math.random()*L.length)],truth:false}}
function j95bSeed(x,y,how,claim){/* x spreads to y that SHE harmed y. x = rival or null (unknown) */if(!y||!y.alive||y.out||y===x||y===S)return null;const z=j95bZ();
 if(y.j95rum&&y.j95rum[key(S)]&&wk()-y.j95rum[key(S)].w<=J95B.RUMW)return null;
 const c=claim||j95bClaim(y);const pers=x?Math.max(0,aff(y,x))/4+(x.tai||40)/10:5;const credo=cl(Math.round(45+pers-Math.max(0,aff(y,S))/3+(nv(y,"coverUp"))+(c.truth?20:0)),5,90);
 if(!j95dice(credo))return null;
 const oa=Math.round(18+pers),af=12;oanAdd(y,S,oa);affAdd(y,S,-af);const src=x?x.name:"không rõ";
 y.j95rum=y.j95rum||{};y.j95rum[key(S)]={txt:"ngươi "+c.txt,src,w:wk()};
 const r={u:++z.u,y:y.id,x:x?x.id:null,src,how,txt:c.txt,truth:c.truth?1:0,w:wk(),oa,af,known:0,cleared:0,traced:0};z.rum.push(r);if(z.rum.length>30)z.rum.shift();
 j95bAct("v"+y.id,"misbelief","me",{ok:true,ex:1,why:`tin đồn: ngươi ${c.txt}, nguồn: ${src} (${c.truth?"chuyện có thật":"bịa đặt"}; qua ${how})`},"rumor:"+how);
 if(x)j95bAct("v"+x.id,"rumor","v"+y.id,{ok:true,why:`rỉ tai ${y.name} rằng ngươi ${c.txt}`},"rumor:"+how);
 J95B.stat.rum++;if(c.truth)J95B.stat.rumTrue++;J95B.rumLog.push({w:wk(),y:y.id,x:x?x.id:null,how,truth:c.truth?1:0});if(J95B.rumLog.length>200)J95B.rumLog.splice(0,50);
 /* she hears of it only as hearsay */const hear=cl(15+(S.mat||0)*12+(spyOther95b(y)?25:0),5,80);if(j95dice(hear))j95bHear(r);return r}
function spyOther95b(y){try{return typeof spyIn70==="function"&&spyIn70(S,y)}catch(e){return false}}
function j95bHear(r){const y=RV(r.y);if(!y||!y.alive)return;r.known=1;J95B.stat.heard++;const x=r.x!=null?RV(r.x):null;
 const src=x?`người bên cung ${x.name}`:"có kẻ";const txt=`Nghe đồn ${src} đã rỉ tai ${y.name} rằng ngươi ${r.txt}. Dạo này ${y.name} nhìn ngươi lạnh hẳn đi.`;
 try{noteAdd(y.id,`Nghe đồn: ${src} rỉ tai nàng rằng ngươi ${r.txt} (lời đồn)`)}catch(e){}J95B.notes.push(txt);if(J95B.notes.length>100)J95B.notes.splice(0,50);
 Q.push({t:"Nghe đồn",who:pv(y),opt:1,h:`<p>${txt}</p><p><i>(Lời đồn; ngươi chưa thể chắc ai đã nói gì.)</i></p>`,rum95:r.u,
  opts:j95bRumOpts(r,y,x)})}
/* port 16/11 (owner 11/15 07:15Z): whole Tốn / Được / Mất + odds word on every option */
function j95bRumOpts(r,y,x){const oc=j95bClearOdds(r),ot=cl(35+(S.mat||0)*8+(S.tamco||0)/4,5,90);
 return[{n:`Sang gặp ${y.name} giải bày`,fx:{},x:`${word(oc)} · tốn: ${BAL.m95b.k} khắc · thành: hết hiểu lầm, ${y.name} bớt oán ngươi · hỏng: ${y.name} chưa tin, oán ngươi +4 · (chuyện có thật thì khó giải, chỉ nguôi một nửa)`,go:()=>j95bClear(r.u,"card")},
  {n:"Cho người tra xem ai tung tin",fx:{...BAL.m95b.trace},x:`${word(ot)} · tốn: ${BAL.m95b.k} khắc · Bạc ${BAL.m95b.trace.bac} · thành: biết kẻ tung tin, chứng cứ về kẻ ấy +1 · giải bày về sau dễ hơn · hỏng: không lần ra ai`,go:()=>j95bTrace(r.u)},
  {n:"Mặc kệ",fx:{},x:`Nắm chắc · kèm: ${y.name} vẫn tin lời đồn, sẽ tìm dịp ra tay với ngươi`,go:()=>log(`Ngươi bỏ ngoài tai lời đồn về ${y.name}.`)}]}
function j95bRumOf(y){const z=j95bZ();for(let i=z.rum.length-1;i>=0;i--){const r=z.rum[i];if(r.y===y.id&&!r.cleared&&wk()-r.w<=J95B.RUMW+4)return r}return null}
function j95bClearOdds(r){const y=RV(r.y),x=r.x!=null?RV(r.x):null;if(!y)return 5;if(r.truth)return cl(Math.round(12+(S.duc||0)/8),5,30);
 return cl(Math.round(40+(S.tai||0)/5+(S.duc||0)/6+(r.traced?20:0)+(x&&evG(S,x)>=1?15:0)-(nv(y,"traceHide"))),5,90)}
function j95bClear(u,how,face){const z=j95bZ();const r=z.rum.find(x=>x.u===u);if(!r)return"";const y=RV(r.y);if(!y||!y.alive)return"";if(!face&&typeof can==="function"&&can(BAL.m95b.k))spend(BAL.m95b.k);
 J95B.stat.clear++;const o=j95bClearOdds(r);const x=r.x!=null?RV(r.x):null;let msg;
 if(j95dice(o)){r.cleared=1;J95B.stat.clearOk++;if(y.j95rum)delete y.j95rum[key(S)];
  if(r.truth){oanAdd(y,S,-Math.round(r.oa/2));msg=`${y.name} nghe ngươi nhận lỗi, nguôi đi phần nào; chuyện ấy có thật nên nàng vẫn còn để bụng.`}
  else{oanAdd(y,S,-r.oa);affAdd(y,S,r.af+4);if(x&&x.alive){oanAdd(y,x,12);affAdd(y,x,-8)}msg=`${y.name} tin lời ngươi: hiểu lầm đã gỡ.${x&&r.traced?` Nàng quay sang giận ${x.name}.`:""}`}
  j95bAct("v"+y.id,"cleared","me",{ok:true,why:`hết hiểu lầm: ngươi đã giải bày (${how})`},"rumor:clear")}
 else{oanAdd(y,S,4);msg=r.truth?`${y.name} không nghe: chuyện ấy có thật.`:`${y.name} chưa tin lời ngươi.`}
 log(msg);if(!face)Q.push({t:"Giải bày",who:pv(y),h:`<p>${msg}</p>`});return msg}
function j95bTrace(u){const z=j95bZ();const r=z.rum.find(x=>x.u===u);if(!r)return"";if(typeof can==="function"&&can(BAL.m95b.k))spend(BAL.m95b.k);J95B.stat.trace++;const x=r.x!=null?RV(r.x):null;const y=RV(r.y);
 let msg;if(x&&x.alive&&j95dice(cl(35+(S.mat||0)*8+(S.tamco||0)/4,5,90))){r.traced=1;evA(S,x,1);try{noteAdd(x.id,`tra ra: người của nàng đã rỉ tai ${y?y.name:"một phi tần"} để gây hiểu lầm với ngươi`)}catch(e){}
  msg=`Tra ra: chính người bên cung ${x.name} đã rỉ tai ${y?y.name:"nàng ấy"}. Chứng cứ về ${x.name} +1.`}
 else msg=x?"Lần theo mãi vẫn không ra kẻ tung tin.":"Lời đồn không rõ từ đâu ra, không lần được.";
 log(msg);Q.push({t:"Tra tin đồn",h:`<p>${msg}</p>`});return msg}
/* who someone can whisper to: a consort the spreader is not on bad terms with and who does not already hate her */
function j95bListener(x){const L=liveRivals(true).filter(y=>y!==x&&!sameHouse(y,S)&&aff(y,S)>-30&&(!x||aff(x,y)>=-5));return L.length?L[Math.floor(Math.random()*L.length)]:null}
function j95bWeek(){if(!j95bOn()||S.dead||(typeof isSrv==="function"&&isSrv()))return;const z=j95bZ();if(z.wk===wk())return;z.wk=wk();
 /* the record of her harm fades */for(const id in z.harm)if(wk()-z.harm[id].w>12)delete z.harm[id];
 for(const x of liveRivals(true)){if(x.confined)continue;
  /* evidence in hand (j78): someone holding proof of her real harm tells the victim */
  if(evG(x,S)>=1){for(const yid in z.harm){const y=RV(+yid);if(!y||y===x||!y.alive||y.out)continue;if(!motiveOK(x,S,"expose").ok)break;if(j95dice(12)){const g=motiveOK(x,S,"expose");j95bAct("v"+x.id,"expose","me",g,"rumor:j78");j95bSeed(x,y,"j78")}break}}
  /* a lie from someone with a motive */const g=motiveOK(x,S,"rumor");if(!g.ok)continue;const p=(nv(x,"rumorP"))+(x.malice||0)/40;
  if(j95dice(p)){const y=j95bListener(x);if(y){j95bAct("v"+x.id,"rumor","me",g,"rumor:tick");j95bSeed(x,y,"tick")}}}
 /* those who believe retaliate (the gate sees the rumour as their reason) */
 for(const r of z.rum){if(r.cleared||wk()-r.w>J95B.RUMW)continue;const y=RV(r.y);if(!y||!y.alive||y.out||y.confined)continue;if(!j95dice(30))continue;let t="";try{t=npcAct(y,S)}catch(e){}
  if(t){J95B.stat.revenge++;log(t);Q.push({t:"Có người ra tay",who:pv(y),opt:1,h:`<p>${t}</p>${r.known?`<p><i>Nghe đồn ${y.name} làm vậy vì tin lời đồn kia.</i></p>`:""}`})}}}

/* ---------------- 5. WIRING ---------------- */
(function(){
 /* the gate answers with the rumour as reason; inside a j24 approach, a j68 card already judged keeps its verdict */
 const mo0=motiveOK;motiveOK=function(a,t,k){if(J95B.inAp&&J95B.apG&&J95B.apG.a===a&&t===S&&!window.__j95boff)return J95B.apG.g;const g=mo0.apply(this,arguments);
  try{if(!window.__j95boff&&a&&t&&a!==S&&a.rel!=null&&H95.has(k)&&g&&g.ok){const r=a.j95rum&&a.j95rum[key(t)];if(r&&wk()-r.w<=J95B.RUMW){const tag=`tin đồn: ${r.txt}, nguồn: ${r.src}`;
    if(/^nghe tin đồn/.test(g.why||""))g.why=tag+" (hiểu lầm)";else if(!(g.why||"").includes("tin đồn:"))g.why=(g.why?g.why+"; ":"")+tag}}}catch(e){}return g};
 /* j68: actors are picked only among those who pass */
 const em0=e68Make;e68Make=function(s){if(!j95bOn()||!s||!E95B[s.id])return em0.apply(this,arguments);const prev=J95B.cur;J95B.cur={s,T:E95B[s.id],rvN:0,picks:[],slots:j95bSlotsRv(s)};try{return em0.apply(this,arguments)}finally{J95B.cur=prev}};
 const rv0=rv6;rv6=function(f,wf){const C=J95B.cur;if(!C||!j95bOn())return rv0.apply(this,arguments);const slot=C.slots[C.rvN];if(slot==null)return rv0.apply(this,arguments);
  const f2=v=>(!f||f(v))&&j95bRvOK(C.T,C.s,slot,v);const id=rv0.call(this,f2,wf);if(id!=null){C.picks[slot]=id;C.rvN++}return id};
 /* every saveable card: judge its actors (re-pick or drop), keep the verdict until it is shown */
 /* loading a save rebuilds the pending cards with mkP: they passed the gate when made, so they come back as they were (no re-pick, none dropped) */
 const mk0=mkP;mkP=function(id,pp){if(!j95bOn()||!S||!id||(typeof J95C!=="undefined"&&J95C.loading))return mk0.apply(this,arguments);pp=pp||{};let chk=null;
  try{if(id.indexOf("e68")===0||P95B[id]){chk=j95bCheck(id,pp);if(chk&&!chk.ok){J95B.stat.evBlock++;for(const r of chk.bad){const rid=r.o&&r.o.id!=null&&r.o.rel!=null?"v"+r.o.id:null;if(rid)j95bAct(rid,r.role.h||r.role.f,r.t&&r.t!==S?"v"+r.t.id:"me",r.g,id)}return null}}}catch(e){j95bErr("mkP",e)}
  const d=mk0.call(this,id,pp);try{if(d&&chk)J95B.pend.set(d.pp||pp,chk);if(d&&chk&&J95B.inAp){const h=chk.list.find(r=>(r.role.h||r.role.f)&&!r.t&&r.o&&r.o.rel!=null);if(h)J95B.apG={a:h.o,g:h.g}}}catch(e){}return d};
 if(typeof approachOne==="function"){const ao=approachOne;approachOne=function(){J95B.inAp=1;J95B.apG=null;const R=S&&S.roster;const kh=j95kh();const snap={};
  if(R&&R.key===j95key())for(const id in R.P)if(id[0]==="v")snap[id]=R.P[id][kh].slice();const nb0=J95B.stat.bind;let m;try{m=ao.apply(this,arguments)}finally{J95B.inAp=0;J95B.apG=null}
  /* a card shown during the approach (its words placed someone) keeps its placement; a housing resync keeps its move */
  const keep=new Set();try{const nb=J95B.stat.bind-nb0;if(nb>0)for(const x of J95B.bind.slice(-nb))if(x.src!=="j24")keep.add(x.id)}catch(e){}
  try{if(j95bOn()&&R&&S.roster===R&&R.key===j95key()){const ch=[];for(const id in snap){if(keep.has(id))continue;const e=R.P[id];if(e&&JSON.stringify(e[kh])!==JSON.stringify(snap[id])&&!(e[kh][1]===snap[id][1]&&e[kh][3]===snap[id][3])){ch.push([id,e[kh].slice()]);e[kh]=snap[id]}}
    if(ch.length){if(m)m.__ap95=ch;j95sync()}}}catch(e){j95bErr("approach",e)}return m}}
 /* acts decided at the turn of a buổi / week / month (j75 effort, monthly acts, NPC buổi acts): the place their words name is where
    the person was in the buổi just ended; a line that puts a fallen or confined consort out and about is not true, so it is dropped */
 const pastWrap=n=>{if(typeof window[n]!=="function")return;const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{if(j95bOn()&&typeof r==="string"&&r)return j95bPastText(r,n)}catch(e){j95bErr(n,e)}return r}};
 for(const n of ["rivalsTurn","rivalsBuoi","npcMonthly"])pastWrap(n);
 /* the j7 'heard behind the rockery' card: she is not there, her eyes are */
 if(PEND.rvframe){const f0=PEND.rvframe;PEND.rvframe=function(p){const d=f0.apply(this,arguments);try{if(d&&S.place!=="vuon")d.t=d.t.replace("Ngươi nghe lén sau hòn non bộ:","Tai mắt của ngươi nghe lén sau hòn non bộ:")}catch(e){}return d}}
 /* shown = recorded (on screen, or when chosen / closed even if no screen was drawn) */
 const sm0=showModal;showModal=function(){try{j95bPurgeWarn(0)}catch(e){}const r=sm0.apply(this,arguments);try{if(Q.length&&j95bOn())j95bPresent(Q[0])}catch(e){j95bErr("show",e)}return r};
 const after=()=>{try{if(j95bPurgeWarn(0)&&Q.length&&!$("modal").hidden)sm0()}catch(e){}};
 const cm0=chooseM;chooseM=function(){try{if(Q.length&&j95bOn())j95bPresent(Q[0])}catch(e){}const r=cm0.apply(this,arguments);after();return r};
 const cl0=closeModal;closeModal=function(){try{if(Q.length&&j95bOn())j95bPresent(Q[0])}catch(e){}const r=cl0.apply(this,arguments);after();return r};
 for(const n of ["nextBuoi","goTo","talk","doAct"]){if(typeof window[n]!=="function")continue;const o=window[n];window[n]=function(){const r=o.apply(this,arguments);after();return r}}
 /* her own harm (for true rumours), and rumour acts that plant a misunderstanding */
 const ra0=runAct;runAct=function(a,t,k){const r=ra0.apply(this,arguments);try{if(j95bOn()&&r&&a&&t&&a!==t){const okd=!/không ai tin|bị bắt|bị lộ|phát giác|chặn kịp|từ chối|không thành/.test(r);
   if(a===S&&t.rel!=null&&H95.has(k)&&okd)j95bZ().harm[t.id]={k,w:wk()};
   if(a!==S&&a.rel!=null&&k==="rumor"&&okd&&!(typeof isSrv==="function"&&isSrv())){const how=window.__j70exec?"j70":"act";
    if(t===S){if(j95dice(45)){const y=j95bListener(a);if(y)j95bSeed(a,y,how)}}
    else if(hostility(a,S)>=40&&j95dice(20)&&motiveOK(a,S,"rumor").ok)j95bSeed(a,t,how,{txt:"đứng sau lời đồn bẩn về nàng",truth:false})}}}catch(e){j95bErr("runAct",e)}return r};
 /* a j70 plot carried out against another consort: the plotter may push the blame onto her */
 if(typeof exec70==="function"){const x0=exec70;exec70=function(p){const r=x0.apply(this,arguments);try{if(j95bOn()&&r&&p&&p.a!=="me"&&p.t!=="me"&&!(typeof isSrv==="function"&&isSrv())){const a=pa70(p),t=pt70(p);
   if(a&&t&&a!==S&&t!==S&&t.alive&&!/bị cắt|bị bắt|quả tang|thời cơ đã qua/.test(r)&&hostility(a,S)>=45&&j95dice(25)&&motiveOK(a,S,"frame").ok){const M=pm70(p);j95bSeed(a,t,"j70",{txt:`đứng sau vụ ${M?M.n.toLowerCase():"mưu hại"} nhắm vào nàng`,truth:false})}}}catch(e){j95bErr("exec70",e)}return r}}
 const et0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=et0.apply(this,arguments);after();try{if(j95bOn()&&S&&!S.dead&&w0!=null&&wk()!==w0){j95bWeek();if(Q.length&&$("modal").hidden)showModal()}}catch(e){j95bErr("week",e)}return r};
 /* a new life: the in-memory audit lists start again (the save holds what matters) */
 if(typeof start==="function"){const st0=start;start=function(){J95B.bind=[];J95B.ev=[];J95B.notes=[];J95B.next=[];return st0.apply(this,arguments)}}
 /* face to face: clear a misunderstanding she has heard of */
 const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(j95bOn()&&p&&(p.kind==="rival"||p.kind==="hh")&&p.ref){const r=j95bRumOf(p.ref);if(r&&r.known){const o=j95bClearOdds(r);
    A.push({n:"Giải bày hiểu lầm",o,x:`gỡ hiểu lầm do lời đồn (${p.ref.name} oán ngươi bớt)`,run:()=>j95bClear(r.u,"face",true)})}}}catch(e){}return A};
})();
/* data for the kit / dev */
function j95bRumours(){if(!S)return[];return j95bZ().rum.filter(r=>r.known&&!r.cleared).map(r=>({who:(RV(r.y)||{}).name,src:r.x!=null?(RV(r.x)||{}).name:null,txt:"Nghe đồn có người nói ngươi "+r.txt,week:r.w}))}
window.__j95b=()=>({stat:J95B.stat,errs:J95B.errs,ev:J95B.ev.slice(-20),bind:J95B.bind.slice(-20),rum:S&&S.j95b?S.j95b.rum.slice(-10):[]});
