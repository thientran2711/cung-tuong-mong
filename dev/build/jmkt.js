/* ================= jmkt: MAKEUP THEME + PER-PERSON MAKEUP TASTE (review/makeup-theme) =================
   Owner 17/11 03:32Z "Làm luôn" (OD:L1514), 03:35Z tone words off (OD:L1515), 03:38Z bold makeup is not negative, overdoing = phô trương
   (OD:L1516), 05:03Z/05:16Z final names (OD:L1553-1554); Foreman B STATUS 17/11 03:33Z / 03:35Z / 03:38Z / 05:09Z.
   (1) Hội phối đồ (jts.js): every đề has a HIDDEN makeup want (tone đào cam / hồng tím, and whether it wants Kiểu cầu kỳ + at least Kiều diễm).
       She finds it out through the existing roads: her trusted ma ma (wdMama, e.g. Tống ma ma), her Tai mắt, a consort who likes her
       (hỏi người), past contests (the result names the want; remembered) and the đề's own colours + the season (shown in the notice).
       On the day she sits at the mirror before presenting (the ONE morning mirror, jtoil, in the ONE kit mini-game frame); the look is scored
       against the want next to the dress (BAL.toil.taste.pts × w). Rivals play the same rule: whether they know the want comes from their
       own scouting (Tâm cơ, Tài, Đức, Tai mắt, traits), their face from Sắc + Họa (toilNpcPlay).
   (2) Every person has a hidden liked tone (Thái hậu, Hoàng hậu, Hoàng thượng = LIKES.mk in his 'Điều ngài thích', each consort).
       Inside the ONE judgement (toilFx → leAttire → aaThieuLeApply → toilReact): known → it shows on the card in advance and counts there;
       unknown → it surprises her once (a toilReact popup) and she learns it. NPCs seen by a host are judged by the same table (two-way).
   (3) Big occasions want at least Kiều diễm (BAL.toil.underOcc); overdoing beyond the occasion OR her rank = Diêm dúa (jtoil toilAllow + allowRk).
   Old saves: new fields S.mkKnow / S.emp.likes.mk are filled on first use; stored look ids are unchanged. Co-op: every NPC value is a hash of
   person + contest (no Math.random), the friend is judged by her own sitting (toilFriendRec). Numbers: BAL.toil (below + jtoil.js). */
Object.assign(BAL.toil,{
 /* rank → shift of what the day allows (overdoing beyond her rank = Diêm dúa): [from rank index, shift] (Đáp ứng..Quý nhân −1, Tần/Phi 0, Quý phi up +1) */
 allowRk:[[0,-1],[3,0],[5,1]],
 /* a big occasion (F ≥ F) wants at least Kiều diễm: a face of these levels is under the occasion (thiện cảm n), except for hosts of these kinds */
 underOcc:{F:2,lv:["moc","vung","vua"],n:-1,skip:["frugal","jealous"]},
 taste:{
  /* the hidden want of each đề (jts TS_THEME): tone "w" đào cam / "c" hồng tím / "mua" = by the season of the contest month; bold = Kiểu cầu kỳ + ≥ Kiều diễm */
  theme:{thanh:{tone:"c",bold:0},phu:{tone:"w",bold:1},huong:{tone:"mua",bold:1},xuan:{tone:"w",bold:0},co:{tone:"mua",bold:0}},
  /* "mua" đề: the tone follows the game's own season of the contest month (j1 SEASON): spring + summer warm, autumn + winter cool */
  season:{"Xuân":"w","Hạ":"w","Thu":"c","Đông":"c"},
  /* contest points of the makeup (× w, added to the contest total; the dress gives raw 0..10 × 4): tone right / wrong, preset group right / wrong,
     the level itself, and a bold đề that got less than Kiều diễm */
  pts:{toneOk:2,toneBad:-1,boldOk:1,boldBad:-1,lv:{moc:-3,vung:-2,vua:0,dep:1,tuyet:2,diem:-2},needLv:-1},w:1.5,
  /* each person's liked tone: hash share < like[0] → đào cam, < like[1] → hồng tím, else none; react = thiện cảm when the tone is liked / disliked */
  like:[.4,.8],react:[1,-1],
  /* scouting the want (odds in the kit ladder): ma ma = o0 + Lòng × loyal; Tai mắt = o0 + Tai mắt × kMat +; cost = Bạc; Tâm cơ × tamco; hỏi người = o0 + thiện cảm × aff + Tâm cơ × tamco */
  scout:{mama:{cost:10,o0:55,loyal:.4},spy:{cost:15,o0:30,kMat:6,tamco:.2,need:1},ask:{need:25,o0:40,aff:.4,tamco:.2}},
  /* a rival knows the want: k0 + Tâm cơ × tamco + Tài × tai + Đức × duc + Tai mắt × mat + trait, capped */
  npc:{k0:.1,tamco:.005,tai:.002,duc:.001,mat:.03,cap:.85,trait:{"Tham vọng":.1,"Kiêu ngạo":-.1,"Hiền lành":-.05}}}});
/* player words (VANPHONG §1 makeup table): the two hidden tones, as the swatches show them */
const TOIL_TONE={w:"tông đào cam",c:"tông hồng tím"};
try{LIKES.mk=["son phấn "+TOIL_TONE.w,"son phấn "+TOIL_TONE.c];LIKEN.mk="Son phấn"}catch(e){}

/* ---------- tones ---------- */
/* the tone of a set of colours: "w" / "c" (pure), "m" (warm and cool mixed), "" (no toned colour) */
function toilToneOf(col){const B=BAL.toil;const t=new Set();col=col||{};for(const k of ["mat","ma","son"]){const x=(B.tone[k]||{})[col[k]];if(x)t.add(x)}return t.size===1?[...t][0]:t.size?"m":""}
function mktH(s){try{return wdHash(String(s))>>>0}catch(e){let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h}}
function mktR(s){return (mktH(s)%1000)/1000}
function mktKnow(){S.mkKnow=S.mkKnow&&typeof S.mkKnow==="object"?S.mkKnow:{};S.mkKnow.p=S.mkKnow.p||{};S.mkKnow.th=S.mkKnow.th||{};return S.mkKnow}

/* ---------- per-person liked tone ---------- */
function toilTasteKey(host){return host==="th"?"th":host==="emp"?"emp":host&&host.id!=null?"v"+host.id:host&&host.name?"n:"+host.name:""}
function toilTasteOf(host){try{const B=BAL.toil.taste;
  if(host==="emp"){const E=S.emp;E.likes=E.likes||{};if(!E.likes.mk)E.likes.mk=LIKES.mk[mktH((E.name||"")+":mk")%2];return E.likes.mk===LIKES.mk[0]?"w":"c"}
  const nm=host==="th"?"th:"+((typeof pTH==="function"&&pTH()&&pTH().name)||""):host&&host.name?toilTasteKey(host)+":"+host.name:"";if(!nm)return"";
  const r=mktR(nm+":mktone");return r<B.like[0]?"w":r<B.like[1]?"c":""}catch(e){return""}}
function toilTasteKnown(host){try{if(host==="emp")return !!(S.emp&&S.emp.known&&S.emp.known.mk);const k=toilTasteKey(host);return !!(k&&mktKnow().p[k])}catch(e){return false}}
function toilTasteLearn(host){try{if(toilTasteKnown(host))return;const t=toilTasteOf(host);if(!t)return;if(host==="emp"){S.emp.known=S.emp.known||{};S.emp.known.mk=true}else mktKnow().p[toilTasteKey(host)]=1;
  log(`<span class="g">Ngươi biết được: ${toilWho(host)} ưa son phấn ${TOIL_TONE[t]}.</span>`)}catch(e){}}
/* the tone part of one host's judgement of person p's look today (0 = none): only a made face that shows its colours (not vụng / diêm dúa) */
function toilTasteN(p,host){if(!host||host===p)return 0;const rec=p===S?toilToday(S):toilFriendRec(p)||toilNpc(p);if(!rec||!rec.makeup)return 0;const mk=toilMk(rec);if(mk==="vung"||mk==="diem")return 0;
 const tone=toilToneOf(rec.col),like=toilTasteOf(host);if(!like||(tone!=="w"&&tone!=="c"))return 0;return tone===like?BAL.toil.taste.react[0]:BAL.toil.taste.react[1]}
/* the note under the colour swatches: the đề's want (contest sitting) and the tastes she already knows */
function toilTasteNote(){try{const L=[];const h=TOIL.st&&TOIL.st.hoi;if(h){const T=TS_THEME[h.th],w=h.want,k=mktKnow().th[h.key]||{};
   L.push(`Đề ${T.n}: ${k.tone?"son phấn "+TOIL_TONE[w.tone]:"chưa rõ đề chuộng son phấn nào"}${k.bold?`, ${w.bold?TOIL_STY.diem+" và dung nhan "+toilMkW("dep")+" trở lên":TOIL_STY.dep}`:""}.`)}
  const K=[];for(const host of ["th","emp",typeof queenP==="function"&&queenP()!==S?queenP():null].filter(Boolean))if(toilTasteKnown(host)){const t=toilTasteOf(host);if(t)K.push(`${toilWho(host)} ưa ${TOIL_TONE[t]}`)}
  if(K.length)L.push(`Đã biết: ${K.join(" · ")}.`);return L.length?" "+L.join(" "):""}catch(e){return""}}

/* ---------- the ONE judgement: toilFx gains the tone part (known) and the big-occasion want ---------- */
(function(){if(typeof toilFx!=="function")return;const f0=toilFx;toilFx=function(p,host,F,baseState){let r=f0.apply(this,arguments);try{
  if(!toilOn(p)||(p===S&&toilSeen(host)))return r;const rec=p===S?toilToday(S):toilFriendRec(p)||toilNpc(p);const mk=toilMk(rec);const hk=toilHostKind(host);const add=[];
  const U=BAL.toil.underOcc;if((F|0)>=U.F&&U.lv.includes(mk)&&!U.skip.includes(hk))add.push([`dung nhan ${toilMkW(mk)} (dịp lớn cần ${toilMkW("dep")} trở lên)`,U.n]);
  const t=toilTasteN(p,host);if(t&&(p!==S||toilTasteKnown(host)))add.push([`son phấn ${TOIL_TONE[toilToneOf(rec.col)]} (${toilWho(host)} ${t>0?"ưa":"không ưa"})`,t]);
  if(!add.length)return r;if(!r)r={aff:0,danh:0,duc:0,why:[],hk,dress:null,mk};const C=BAL.toil.cap;
  r.aff=Math.max(C[0],Math.min(C[1],r.aff+add.reduce((a,x)=>a+x[1],0)));r.why=r.why.concat(add);if(!r.aff&&!r.danh)return null}catch(e){console.error("mkt toilFx",e)}return r};window.toilFx=toilFx})();

/* an unknown taste surprises her once per host per day (a toilReact popup) and she learns it — the same reaction system */
function toilTasteSurprise(host,v){try{if(!toilOn(S)||toilTasteKnown(host))return;S.toilSeen=S.toilSeen&&S.toilSeen.wk===toilWk()?S.toilSeen:{wk:toilWk(),h:{}};const sk="t"+toilTasteKey(host);if(S.toilSeen.h[sk])return;
  const n=toilTasteN(S,host);if(!n)return;S.toilSeen.h[sk]=1;const s0=S.logSeq||0;toilBack(host,n);const like=toilTasteOf(host);const who=toilWho(host);
  const k=host==="th"?(n>0?"th-praise":"th-scold"):host==="emp"?(n>0?"emp-like":"emp-dislike"):host&&host.queen?(n>0?"hh-praise":"hh-scold"):(n>0?"rival-praise":"rival-tease");
  const pic=host==="th"?pTH():host==="emp"?pEmp():pv(host);const nm=host==="emp"?"Sủng":`${who} thiện cảm`;
  toilReact({k,who:pic,host,v,s0,n,name:who,line:`son phấn ${TOIL_TONE[toilToneOf((toilToday(S)||{}).col)]}, ${who} ${n>0?"ưa":"không ưa"}: ${host==="emp"?`Sủng ${n>0?"+":"-"}${Math.abs(Math.sign(n))}`:`${nm} ${n>0?"+":""}${n}`}`,ctx:{mk:toilMk(toilToday(S)),tone:n>0?"like":"dis"}});
  toilTasteLearn(host)}catch(e){console.error("mkt surprise",e)}}
/* the meeting cards (thỉnh an Thái hậu / Hoàng hậu, Hoàng thượng, a consort met in person): after the card's own effect, the unknown taste (once per host per day) */
(function(){if(typeof talkOpts!=="function")return;const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(!p||!toilOn(S)||!(p.kind==="th"||p.kind==="hh"||p.kind==="emp"||(p.kind==="rival"&&p.ref)))return A;
  const host=p.kind==="th"?"th":p.kind==="emp"?"emp":p.ref;if(!host||toilTasteKnown(host))return A;
  return A.map(a=>{if(!a||((p.kind==="th"||p.kind==="hh")&&!/^Thỉnh an/.test(a.n)))return a;const o=Object.assign({},a);const after=f=>function(){const r=f?f.apply(this,arguments):undefined;toilTasteSurprise(host,null);return r};
   if(o.run)o.run=after(o.run);else{o.go=after(o.go);if(o.fail)o.fail=after(o.fail)}return o})}catch(e){console.error("mkt talkOpts",e)}return A}})();
/* the words of a tone reaction (spoken line), before the dress / face pools */
const TOIL_TONE_SAY={like:{th:"“Sắc son hôm nay hợp mắt ai gia.”",hh:"“Màu son này khéo chọn, bổn cung ưa.”",emp:"“Sắc son này, trẫm thích.”",rival:"“Màu son ấy… quả là khéo chọn.”"},
 dis:{th:"“Sắc son này ai gia không ưa.”",hh:"“Màu son này chẳng hợp mắt bổn cung.”",emp:"“Sắc son ấy, trẫm không quen mắt.”",rival:"“Màu son ấy… chẳng hợp lắm nhỉ.”"}};
(function(){if(typeof toilSay!=="function")return;const s0=toilSay;toilSay=function(k,ctx){try{if(ctx&&ctx.tone&&TOIL_TONE_SAY[ctx.tone]){const w=/^th-/.test(k)?"th":/^hh-/.test(k)?"hh":/^emp-/.test(k)?"emp":"rival";return TOIL_TONE_SAY[ctx.tone][w]}}catch(e){}return s0.apply(this,arguments)}})();

/* ---------- Hội phối đồ: the đề's hidden makeup want ---------- */
function tsMkSeason(m){return SEASON[(((m|0)||1)-1)%12]}/* the game's season of month m (j1 SEASON; reviewer r1: the old 4–9 "xuân" split contradicted the calendar) */
function tsMkWant(th,m){const T=BAL.toil.taste.theme[th]||BAL.toil.taste.theme.thanh;const tone=T.tone==="mua"?BAL.toil.taste.season[tsMkSeason(m)]:T.tone;return{tone,bold:!!T.bold,key:th+":"+tone}}
function tsMkKnown(w){return mktKnow().th[w.key]||{}}
function tsMkLearn(w,what){const K=mktKnow().th;K[w.key]=Object.assign({},K[w.key]||{},what);return K[w.key]}
function tsMkWantTxt(w,k){k=k||{tone:1,bold:1};const L=[];if(k.tone)L.push(`son phấn ${TOIL_TONE[w.tone]}`);if(k.bold)L.push(w.bold?`${TOIL_STY.diem}, dung nhan ${toilMkW("dep")} trở lên`:TOIL_STY.dep);return L.join(", ")}
/* the notice row: what she knows of the want, and the roads to learn it */
function tsMkRow(th,m){const w=tsMkWant(th,m),k=tsMkKnown(w);return["Son phấn",k.tone&&k.bold?`đề chuộng ${tsMkWantTxt(w,k)}`:k.tone||k.bold?`đề chuộng ${tsMkWantTxt(w,k)}; còn lại chưa rõ`:`chưa rõ: hỏi ma ma, sai tai mắt, hỏi người từng dự, hay đoán theo sắc của đề và mùa ${tsMkSeason(m).toLowerCase()}`,k.tone&&k.bold?"g":"n"]}
/* the three asking roads (tsOpt, odds in the ladder; a miss teaches nothing, never a wrong answer) */
function tsMkScoutOpts(th,m){const w=tsMkWant(th,m),k=tsMkKnown(w);if(k.tone&&k.bold)return[];const B=BAL.toil.taste.scout;const L=[];const all={tone:1,bold:1};
 const got=(who,what)=>{tsMkLearn(w,what);log(`${who}: đề ${TS_THEME[th].n} chuộng ${tsMkWantTxt(w,what)}.`)};
 let mm=null;try{mm=wdMama(S)}catch(e){}
 if(mm){const o=B.mama.o0+(mm.loyal||0)*B.mama.loyal;L.push(tsOpt({n:`Hỏi ${mm.name}`,odds:o,need:[tsNeedBac(B.mama.cost)],duoc:["biết đề chuộng son phấn nào, kiểu nào"],kem:[`Bạc -${B.mama.cost} (lễ tạ)`],
  go:()=>{apply({bac:-B.mama.cost});if(roll(o))got(mm.name,all);else log(`${mm.name} lắc đầu: năm nay chưa nghe ngóng được.`)}}))}
 {const o=B.spy.o0+(S.mat||0)*B.spy.kMat+(S.tamco||0)*B.spy.tamco;L.push(tsOpt({n:"Sai tai mắt dò bên chủ hội",odds:o,need:[tsNeedBac(B.spy.cost),{t:`Tai mắt ≥${B.spy.need} (có ${S.mat||0})`,ok:(S.mat||0)>=B.spy.need}],duoc:["biết đề chuộng son phấn nào, kiểu nào"],kem:[`Bạc -${B.spy.cost}`],
  go:()=>{apply({bac:-B.spy.cost});if(roll(o))got("Tai mắt báo",all);else log("Tai mắt về tay không.")}}))}
 {let f=null;try{f=liveRivals(true).filter(v=>!v.out&&aff(v,S)>=B.ask.need).sort((a,b)=>aff(b,S)-aff(a,S))[0]}catch(e){}
  if(f){const o=B.ask.o0+aff(f,S)*B.ask.aff+(S.tamco||0)*B.ask.tamco;L.push(tsOpt({n:`Hỏi ${f.name} (từng dự hội)`,odds:o,need:[{t:`nàng thân với ngươi (${aff(f,S)}/${B.ask.need})`,ok:aff(f,S)>=B.ask.need}],duoc:["biết đề chuộng son phấn tông nào"],
   go:()=>{if(roll(o))got(f.name,{tone:1});else log(`${f.name} cũng không nhớ rõ.`)}}))}}
 return L}
/* a rival's contest face: does she know the want (her own scouting), then the same sitting as every NPC (toilNpcPlay, festival allowance, her rank) */
function tsMkNpcKnow(v){const N=BAL.toil.taste.npc;let p=N.k0+(v.tamco||0)*N.tamco+(v.tai||0)*N.tai+(v.duc||0)*N.duc+(v.mat||0)*N.mat;try{for(const t of traitsOf(v))p+=N.trait[t]||0}catch(e){}return Math.max(0,Math.min(N.cap,p))}
function tsMkNpc(v,w,cid){if(v&&v.coop){const r=toilFriendRec(v);if(r&&r.makeup)return r}
 const h=mktH(wdKey(v)+":"+(v.name||"")+":hoi:"+cid);const knows=mktR(h+":k")<tsMkNpcKnow(v);
 const bold=knows?w.bold:mktR(h+":b")<BAL.toil.play.diemPre,tone=knows?w.tone:(mktR(h+":t")<.5?"w":"c");
 const L=TOIL_PRE.filter(x=>(x[2]==="diem")===bold&&(x[3]==="warm"?"w":"c")===tone);const col=Object.assign({},(L.length?L:TOIL_PRE)[h%(L.length||TOIL_PRE.length)][4]);if(bold)col.want="diem";
 const sk=toilNpcSk(v);/* the one NPC skill (jtoil) */
 const R=toilNpcPlay(sk,h,col,bold?"diem":"","fit",["fest"],v.rank);return{makeup:true,score:R.score,look:R.look,col,knows}}
/* the makeup points of one entrant (rec = a toilette record) against the want; returns {pts, add (to the total), mk, tone, bold} */
function tsMkPts(rec,w){const P=BAL.toil.taste.pts;let s=0;const mk=toilMk(rec);const o={mk,tone:"",bold:false};
 if(!rec||!rec.makeup)s=P.lv.moc;else{s=P.lv[mk]||0;if(mk!=="vung"&&mk!=="diem"){const t=toilToneOf(rec.col);o.tone=t;s+=t===w.tone?P.toneOk:(t==="w"||t==="c")?P.toneBad:0;
  o.bold=!!(rec.col&&rec.col.want==="diem");s+=o.bold===w.bold?P.boldOk:P.boldBad;if(w.bold&&mk==="vua")s+=P.needLv}}
 o.pts=s;o.add=Math.round(s*BAL.toil.taste.w);return o}
/* her sitting before presenting: the ONE morning mirror (jtoil colour pick → three hồi → reveal), judged as a festival; the bot sits from skill */
function tsMkSit(th,m,done){const w=tsMkWant(th,m);if(toilToday(S)){done();return}const occ=[{k:"fest",n:`Hội phối đồ · ${TS_THEME[th].n}`,F:2}];
 if(tsBot()||typeof kg82Open!=="function"){const d=toilDress(S,2),sk=toilSkill(),col=toilColFix(S.toilette&&S.toilette.col);const R=toilNpcPlay(sk.sk,mktH(String(S.name||"")+":hoi:"+toilWk()),col,col.want||"",d.style,["fest"],S.rank);
  S.toilette={day:toilWk()*10,wk:toilWk(),score:R.score,makeup:true,style:d.style,dv:d.v,F:2,occ:["fest"],look:R.look,slip:R.slip,parts:R.parts,col,auto:1};setTimeout(done,0);return}
 KG82.ctx="hoc";const d=kg82Open({art:"Điểm trang",title:`Trước gương đồng · ${TS_THEME[th].n}`,how:`Trước khi ra mắt: chọn son phấn hợp đề, rồi kẻ mày, đánh phấn, chấm son. Không có đường chỉ: tay vụng thì mặt vụng.`});
 if(!d){setTimeout(done,0);return}["chai-bg","chai-brow","chai-puff","chai-rouge"].forEach(n=>{try{kg82Img(n)}catch(e){}});try{KIT_VEIL.load()}catch(e){}
 TOIL.st={occ,F:2,parts:{},dv:null,start:wdCur(S),hoi:{th,want:w,key:w.key}};TOIL.after=done;try{toilMkPre()}catch(e){}toilHUD({score:"–",round:"2/4",time:"không hạn"});toilColUI()}
/* leaving the mirror any way (Đã hiểu after the reveal, ✕, Esc) hands the contest back: exactly once */
(function(){if(typeof kg82Close!=="function")return;const c0=kg82Close;kg82Close=function(){const a=TOIL.after;TOIL.after=null;const r=c0.apply(this,arguments);if(a)setTimeout(a,0);return r}})();
/* contest end: the want is told to everyone present (she remembers it for this đề and season: past contests) */
function tsMkLine(mine,w,th){const T=TS_THEME[th];const L=[];if(mine&&mine.mk){const x=mine.mk;L.push(`Dung nhan ${toilMkW(x.mk)}${x.tone==="w"||x.tone==="c"?`, son phấn ${TOIL_TONE[x.tone]}`:""}: ${x.add>0?"điểm trang cộng "+x.add:x.add<0?"điểm trang trừ "+(-x.add):"điểm trang không thêm bớt"}${x.mk==="diem"?" (người ta chê phô trương)":""}.`)}
 L.push(`Đề ${T.n} năm nay chuộng ${tsMkWantTxt(w)}.`);if(mine)tsMkLearn(w,{tone:1,bold:1});return L.join(" ")}
window.tsMkPts=tsMkPts;window.tsMkWant=tsMkWant;window.tsMkNpc=tsMkNpc;window.toilToneOf=toilToneOf;window.toilTasteOf=toilTasteOf;window.tsMkSit=tsMkSit;
