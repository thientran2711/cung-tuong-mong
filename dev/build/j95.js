
/* ================= j95 AI Ở ĐÂU: SỔ VỊ TRÍ (S.roster) + THÓI QUEN + Ý ĐỊNH + BẤT NGỜ + HẸN KÍN + CỔNG ĐỘNG CƠ =================
   One record for everyone alive in the palace: at every khắc each person has exactly one place (j77 codes), one activity,
   an optional target and a REASON read from the real state. Every reader goes through it: S.where / S.menW are views of
   the current khắc (rebuilt on every khắc change), countAt counts the record, the stage is reconciled with it, tai mắt read
   whereOf (= the view), npcEncounters runs on it, secret meetings and catches read it.
   Who goes where: hidden HABITS per person (2–4 favourite places by buổi, from talents / nature / faction; drift monthly),
   a weekly INTENTION (seek the Emperor, visit an ally, avoid a foe, visit / waylay her, lovers' trysts, plot errands),
   ~20% SURPRISES (called away, rain, change of mind; may switch mid-buổi and is recorded). The Emperor too.
   Two-way information: she learns habits by seeing people (habitsKnown(p)), from tai mắt (j78 fact "habit"); NPCs learn
   her habits (where she goes often) and may lie in wait there (j78 fact "stalk" tells her when her eyes catch it).
   Motive gate motiveOK(a,t,kind): every NPC act aimed at someone (runAct, newPlot70, j95 intents) needs a real motive;
   no harm while affection is high unless a recorded reason (held by evidence, faction order, rumour).
   Works with 3 or 4 buổi (BUOI.length); habits are stored on 4 canonical slots Sáng/Trưa/Chiều/Tối.
   Wraps only (npcEncounters, placeWhere, spend, goTo, countAt, places, tryst, runAct, newPlot70, j78facts, seeLoc).
   Off switch for measuring: window.__j95off=1 (old dice, no record).
   ===================================================================================================================== */
const J95={errs:[],OWN:[8,12,8,36],SUR:22,FOLLOW:70,IT:70,KH:4,B4:["Buổi sáng","Buổi trưa","Buổi chiều","Buổi tối"],LOGW:4,stat:{gate:0,gateBy:{},pass:0,bad:[]}};
const ACT95={offduty:"nghỉ tay ở dãy nhà cung nhân",laundry:"chịu phạt giặt giũ",teach:"dạy học",oversee:"trông coi việc giặt giũ",read:"đọc sách",eat:"dùng bữa",rest:"nghỉ trong cung",sleep:"ngủ",greet:"thỉnh an Hoàng hậu",receive:"nhận thỉnh an",pray:"lễ Phật, tụng kinh",
 music:"gảy đàn",paint:"vẽ tranh, ngắm hoa",poem:"ngâm thơ",dance:"tập múa",herb:"học y thuật",walk:"dạo vườn",spy:"dò la tin tức",visit:"sang chơi",
 seekemp:"chờ gặp Hoàng thượng",ambush:"rình chờ",provoke:"tìm đến gây sự",tryst:"hẹn hò lén",meet:"gặp tay chân",scheme:"chuẩn bị mưu",heal:"bắt mạch, uống thuốc",
 court:"thượng triều",memo:"phê tấu chương",dine:"ngự thiện",stroll:"ngự du",bed:"ngự tẩm",attend:"hầu Hoàng thượng",book:"giữ sổ thị tẩm",brew:"sắc thuốc",
 sell:"bán hàng rong",guard:"canh gác",serve:"hầu hạ chủ",clean:"quét dọn",follow:"theo hầu chủ",errand:"đi việc vặt",study:"học chữ",play:"chơi đùa",nap:"ngủ trưa",
 nurse:"được nhũ mẫu trông",cold:"sống lay lắt",confined:"bị cấm túc",called:"bị gọi đi",back:"quay về cung",changed:"đổi ý",go:"đi lại",away:"ở ngoài cung",here:"ở đây",work:"làm việc",
 audience:"chầu vua",watch:"đứng hầu",escort:"đi theo hộ giá"};
const SPOT95=[["vuon","sau hòn non bộ trong Ngự hoa viên"],["lc","bức tường đổ gần Trường Môn viện"],["ksp","dãy kho sau Kính sự phòng"]];
const TRACE95=["một chiếc khăn tay thêu hoa","một miếng ngọc bội buộc dây đỏ","một chiếc trâm bạc gãy","một túi thơm thêu chữ"];
function j95on(){return !!(typeof S!=="undefined"&&S&&!window.__j95off&&!(window.COOPW&&COOPW.on))}
/* the motive gate stays on in co-op (the host runs the world's NPC acts); only the location record is single-player for now (port 16/11) */
function j95gate(){return !!(typeof S!=="undefined"&&S&&!window.__j95off)}
/* jmen (main, owner 11/15 "no dice for men in the hậu cung") decides where every man is each buổi and his reason (S.menW / S.menWhy) and makes
   the lovers' trysts; the record takes those in and never places men on its own while jmen runs */
function j95men(){try{return typeof menRoad==="function"&&menRoad()}catch(e){return false}}
function j95err(w,e){try{if(J95.errs.length<20)J95.errs.push(w+": "+(e&&e.message||e))}catch(x){}}
function j95dice(p){return Math.random()*100<p}
function j95pw(L){/* [[x,w],...] → x */const T=L.reduce((s,x)=>s+Math.max(0,x[1]),0);if(!(T>0))return L.length?L[0][0]:null;let r=Math.random()*T;for(const x of L){r-=Math.max(0,x[1]);if(r<=0)return x[0]}return L[L.length-1][0]}
function j95nB(){try{return BUOI.length||3}catch(e){return 3}}
function j95cs(){return j95nB()>=4?[0,1,2,3]:[0,2,3]}
function j95c(b){b=b==null?(S.buoi||0):b;return j95nB()>=4?Math.min(3,b):[0,2,3][Math.min(2,b)]}
function j95kh(){return Math.max(0,Math.min(J95.KH-1,typeof used==="number"?used:0))}
function j95key(){return wk()+"-"+(S.buoi||0)}
function j95z(){const z=S.j95=S.j95||{};for(const k of ["obs","me","meK","it","wit","owe","hold","seen","told","plant"])z[k]=z[k]||{};z.sec=z.sec||[];z.clue=z.clue||[];return z}
function j95pn(k){try{return k?placeName(k):"—"}catch(e){return String(k)}}
function j95rk(p){try{return p===S?(typeof isSrv==="function"&&isSrv()?srvTitle():S.rank>=7?"Hoàng hậu":RANKS[S.rank].n):p.out?"Phế phi":p.queen?"Hoàng hậu":RANKS[p.rank].n}catch(e){return""}}
function j95acc(p,k){if(!k)return false;try{return palaceOf(p)===k||accessOf(p,k).ok}catch(e){return true}}
function j95bl(c){return J95.B4[c].toLowerCase()}

/* ---------------- 1. HABITS (hidden, per consort) ---------------- */
function j95habPool(v){const a=v.arts||{},C=[];const add=(k,s,act,w)=>{if(w>0)C.push({k,s,a:act,w})};
 add("vuon",[0,15,35,5],"music",(a.cam||0)*2);add("vuon",[5,30,15,0],"paint",(a.hoa||0)*2);add("vuon",[10,15,25,5],"poem",(a.thi||0)*1.5);
 add("own",[5,15,30,5],"dance",(a.vu||0)*1.5);add("tyv",[10,30,15,0],"herb",(a.y||0)*2.5);
 if(v.trait==="Hiền lành"||v.trait==="Nhu mì"||(v.pray||0)>0)add("tn",[45,10,5,0],"pray",3);
 if(v.trait==="Tham vọng")add("ksp",[0,25,15,0],"spy",2);if(v.trait==="Kiêu ngạo")add("vuon",[5,30,25,0],"walk",2);
 if(v.trait==="Đa nghi")add("own",[10,20,20,10],"read",2);if(v.trait==="Hiểm độc")add("tyv",[5,15,20,0],"spy",1.5);
 if((v.sac||0)>=75)add("vuon",[0,10,25,20],"walk",2);
 try{const f=facOf(v);const L=f&&facLeader(f);if(L&&L!==v&&L!==S)add("ally:"+key(L),[0,25,30,35],"visit",2.5)}catch(e){}
 try{const al=others(v).filter(x=>x!==S&&x.alive&&!x.out&&!sameHouse(v,x)).map(x=>[x,aff(v,x)]).sort((p,q)=>q[1]-p[1])[0];if(al&&al[1]>=10)add("ally:"+key(al[0]),[0,20,25,35],"visit",2)}catch(e){}
 add("vuon",[5,20,20,0],"walk",1);return C}
function j95genHab(v,keep){const P=j95habPool(v).filter(h=>!(keep||[]).some(x=>x.k===h.k&&x.a===h.a));const n=(keep||[]).length?1:2+Math.floor(Math.random()*3);const out=(keep||[]).slice();
 for(let i=0;i<n&&P.length;i++){const h=j95pw(P.map(x=>[x,x.w]));P.splice(P.indexOf(h),1);out.push({k:h.k,s:h.s.slice(),a:h.a})}return out}
function j95hab(v){if(!v.j95h||!v.j95h.length){v.j95h=j95genHab(v);v.j95r=rkOf(v)}return v.j95h}
function j95res(v,k){if(k==="own")return palaceOf(v);if(k.indexOf("ally:")===0){const p=byKey(k.slice(5));if(!p||p===S||!p.alive||p.out||sameHouse(v,p))return null;return palaceOf(p)}return k}
function j95drift(){/* monthly: a habit may change; a new rank, a new life brings a new one */
 for(const v of rivals){if(!v.alive||v.out)continue;const H=j95hab(v);
  if(v.j95r!==rkOf(v)||j95dice(15)){H.splice(Math.floor(Math.random()*H.length),1);v.j95h=j95genHab(v,H);v.j95r=rkOf(v)}
  for(const h of v.j95h){if(h.k.indexOf("ally:")===0&&!j95res(v,h.k)){h.k="vuon";h.a="walk"}}}}
function j95seaV(c){let m=1;try{const s=SEASON[S.month-1];m=s==="Đông"?.5:s==="Hạ"?(c>=2?1.2:.9):1.2;if(wet())m*=.25}catch(e){}return m}
function j95likely(p,c){/* where p is LIKELY at c by habit (what another person would guess) */if(!p||p===S)return null;let b=null,bw=0;for(const h of j95hab(p)){const k=j95res(p,h.k);if(k&&h.s[c]>bw){bw=h.s[c];b=k}}return b}

/* ---------------- 2. MOTIVE GATE ---------------- */
const H95=new Set(["rumor","spy","trip","frame","plant","block","bribe","accuse","vp","ksab","takeaway","steal","road","poison","kpoison","pond","pushp","musk","catswap","kframe",
 "huydung","slowpoison","lygian","tocao","trinhth","trinhhh","uyhiep","banphe","expose","xinhh","harm","plot","ambush","provoke","giahoa"]);
const F95=new Set(["ally","gift","tieuhuy","visit"]);
/* port 16/11, whole family: every act the game groups as harm (RVGRP, j9 + jecon/jtsb/jpoison/jpet…) passes the gate; "Giao thiệp" acts are friendly */
try{if(typeof RVGRP!=="undefined")for(const [g,L] of RVGRP)for(const k of L){if(g==="Giao thiệp"||k==="tieuhuy")F95.add(k);else H95.add(k)}}catch(e){}
function j95except(a,t){/* a recorded reason to act against her own affection */try{
 for(const h of liveRivals(true)){if(h===a||h===t)continue;if(evG(h,a)>=2&&hostility(h,t)>=50)return `bị khống chế: ${h.name} nắm thóp bằng chứng cứ, ép ra tay`}
 const f=facOf(a);const L=f&&facLeader(f);if(L&&L!==a&&L!==t&&L!==S&&hostility(L,t)>=60&&aff(a,L)>=30)return `vâng lệnh chủ phe ${L.name}`;
 const r=a.j95rum&&a.j95rum[key(t)];if(r&&wk()-r.w<=8)return `nghe tin đồn (${r.txt}) nên hiểu lầm`}catch(e){}return ""}
function motiveOK(a,t,kind){if(!a||!t||a===S||a===t)return{ok:true,why:a===S?"người chơi tự chọn":""};
 if(typeof a!=="object"||a.rel==null)return{ok:true,why:""};
 const af=aff(a,t),oa=oan(a,t),gh=t===S?(a.ghen||0):Math.max(0,Math.round(((t.sung||0)-(a.sung||0))/2));
 let ef=false;try{const f=facOf(a),g=facOf(t);ef=!!(f&&g&&f!==g)}catch(e){}
 if(H95.has(kind)){const ex=j95except(a,t);const mot=Math.max(oa,gh,-af)+(ef?10:0)+(a.trait==="Hiểm độc"?10:0);
  if(af>=40&&!ex)return{ok:false,why:`thiện cảm ${af} với ${t===S?"ngươi":t.name}`};
  if(mot<30&&!ex)return{ok:false,why:`động cơ yếu (oán ${oa}, ghen ${gh}, thiện cảm ${af})`};
  if(ex)return{ok:true,why:ex,ex:1};
  const parts=[];if(oa>=20)parts.push(`oán ${oa}`);if(gh>=20)parts.push(`ghen ${gh}`);if(af<=-20)parts.push(`ghét (thiện cảm ${af})`);if(ef)parts.push("khác phe");if(a.trait==="Hiểm độc")parts.push("tính hiểm độc");
  return{ok:true,why:parts.join(", ")||`động cơ ${mot}`}}
 if(F95.has(kind)){let fr=false;try{fr=!!(facOf(a)&&facOf(a)===facOf(t))}catch(e){}if(af<-20&&oa>=40&&!fr)return{ok:false,why:`ghét ${t===S?"ngươi":t.name} (thiện cảm ${af}, oán ${oa})`};
  return{ok:true,why:fr?"cùng phe":af>=10?`thiện cảm ${af}`:"lấy lòng vì lợi"}}
 return{ok:true,why:""}}
function j95actLog(a,t,k,g){try{if(!S.roster)return;const L=S.roster.acts=S.roster.acts||[];L.push({id:j95id(a),kh:j95kh(),k,t:j95id(t),why:g.why||"",ok:g.ok?1:0,ex:g.ex?1:0});if(L.length>60)L.shift();
 if(!g.ok){J95.stat.gate++;J95.stat.gateBy[k]=(J95.stat.gateBy[k]||0)+1}else J95.stat.pass++}catch(e){}}
function j95id(p){if(!p)return null;if(p===S)return"me";if(p.id!=null&&p.rel!=null)return"v"+p.id;return null}

/* ---------------- 3. THE REGISTRY: everyone alive in the palace now ---------------- */
function j95ppl(R){const L=[],seen={};const add=(id,name,role,kind,home,ref)=>{if(seen[id])return;seen[id]=1;L.push({id,name,role,kind,home,ref})};
 let en="Hoàng thượng";try{en=empName()}catch(e){}add("emp",en,"Hoàng thượng","emp","dtd");
 if(!S.thDead)add("th","Thái hậu","Thái hậu","th","tn");
 add("me",S.name,j95rk(S),"me",null,S);
 for(const v of rivals){if(!v.alive)continue;add("v"+v.id,v.name,j95rk(v),"rv",v.out?"lc":palaceOf(v),v)}
 /* jplx (main): servants resting at Dãy nhà cung nhân / punished at Tân Giả khố, children 6+ at Thượng thư phòng / A ca sở / Đông cung,
    and the two people fixed to a place (Quản sự Tân Giả khố, Thầy dạy): the record takes the SAME lists the stage draws (one ledger) */
 J95.px={};const PXT=typeof plxPeople==="function";if(PXT)try{for(const k of ["cnh","tgk"])for(const q of plxPeople(k))if(q&&q.sid!=null)J95.px["s"+q.sid]=k}catch(e){}
 for(const p of [S].concat(rivals)){if(p!==S&&!p.alive)continue;const hk=p===S?(S.out?"lc":"home"):p.out?"lc":palaceOf(p);const pk=p===S?"me":p.id;const ow=p===S?"ngươi":p.name;
  if(p.maid&&p.maid.name&&!(p===S&&typeof isSrv==="function"&&isSrv()))add("mm:"+pk,p.maid.name,"Cung nữ thân tín của "+ow,"mm",hk,p);
  for(const s of p.staff||[])if(s&&s.sid!=null){const px=J95.px["s"+s.sid];add("s"+s.sid,s.name,(s.role==="eunuch"?"Thái giám":"Cung nữ")+" của "+ow,px?"px":"st",px||hk,p)}}
 /* named palace staff (jstaff, main 16/11): the elders stand at their post (the stage draws them there); the rest of Thái hậu's household serves at Đức Thọ cung */
 J95.eld={};const eh=x=>{if(!x||x.sid==null)return;const k=j95elderK(x);if(x.eid)J95.eld["s"+x.sid]=x.eid;if(seen["s"+x.sid]){const q=L.find(z=>z.id==="s"+x.sid);if(q&&x.eid){q.kind="el";q.home=k}return}add("s"+x.sid,x.name,x.call||"Người hầu của Thái hậu","el",k,x)};
 try{for(const x of (S.thO&&S.thO.staff)||[])eh(x);for(const v of rivals)if(v.alive)for(const x of v.staff||[])if(x&&x.eid)eh(x)}catch(e){}
 if(S.court)for(const c in S.court){const o=S.court[c];if(o&&o.name)add("c:"+c,o.name,o.n||c,"court",{tq:"dtd",ksp:"ksp",ped:"ksp",ty:"tyv"}[c]||"ksp")}
 const present=id=>(R&&R.P&&R.P[id])||j95z().sec.some(x=>x.b===id&&x.key===j95key());
 const jm=j95men();for(const m of S.men||[]){if(!m.alive)continue;const h=jm?null:m.rw==="thái y"?"tyv":m.rw==="thị vệ"?"thu":null;if(h||present(m.id))add(m.id,m.name,m.role,"man",h||((S.menW||{})[m.id])||null,m)}
 /* officials (j55) inside for the morning audience / a festival banquet this buổi (jmen S.minW) */
 if(j95men())try{const H=(typeof trS==="function"&&trS().H)||{};for(const c in (S.minW||{})){const h=H[c];if(h)add("q:"+c,h.name,(typeof TDOFF!=="undefined"&&TDOFF[c])||"Quan","min",S.minW[c],h)}}catch(e){}
 try{for(const [k,mo] of allKids()){if(!k||!k.alive)continue;const hk=!mo?(S.out?(qOn()?"kn":"tn"):"home"):mo.alive&&!mo.out?palaceOf(mo):(qOn()?"kn":"tn");const kp=PXT&&typeof plxKidPlace==="function"?plxKidPlace(k):null;add("k:"+(mo?mo.id:"me")+":"+(mo?mo.kids:S.kids).indexOf(k),k.name,k.sex==="m"?"Hoàng tử":"Công chúa","kid",kp||hk,k)}}catch(e){}
 if(PXT){add("c:tgk","Quản sự Tân Giả khố","Quản sự Tân Giả khố","fix","tgk");let tt=false;try{tt=plxKids("ttp").length>0}catch(e){}add("c:ttp","Thầy dạy Thượng thư phòng","Thầy dạy Thượng thư phòng","fix",tt?"ttp":J95OUT_)}
 return L}

/* ---------------- 4. WEEKLY: intentions, trysts, plot errands, the Emperor's business, learning her habits ---------------- */
function j95week(){const z=j95z();if(z.itWk===wk())return;z.itWk=wk();if(z.mo!==S.turn){z.mo=S.turn;try{j95drift()}catch(e){}}
 /* her habits fade; enemies learn what is left */
 for(const k in z.me){z.me[k]*=.75;if(z.me[k]<.3)delete z.me[k]}
 const pat=Object.entries(z.me).filter(x=>x[1]>=2.5).sort((a,b)=>b[1]-a[1])[0];
 for(const id in z.meK){const m=z.meK[id];if(!z.me[m.c+":"+m.k]||z.me[m.c+":"+m.k]<1.5)delete z.meK[id]}
 z.it={};z.sec=[];const cs=j95cs();z.mood={};for(const v of rivals)z.mood[v.id]=+(0.4+Math.random()*1.5).toFixed(2);z.nb={};for(const v of liveRivals(true)){const L=liveRivals(true).filter(x=>x!==v&&!sameHouse(v,x));z.nb[v.id]=L.sort(()=>Math.random()-.5).slice(0,2).map(x=>x.id)}
 for(const v of liveRivals(true)){if(v.confined)continue;j95hab(v);
  if(pat&&!z.meK[v.id]&&hostility(v,S)>=45){let sp=false;try{sp=spyIn70(v,S)}catch(e){}if(j95dice(15+(v.mat||0)*12+(sp?30:0))){const [c,k]=pat[0].split(":");z.meK[v.id]={c:+c,k,w:wk()}}}
  const it=j95intent(v,cs);if(it)z.it[v.id]=it;
  /* lovers meet in hidden corners, mostly at night */
  const m=v.affair&&manById(v.affair);if(m&&!j95men()){const n=j95dice(35)?2:1;
   if(!v.j95spot||j95dice(15)){const L=SPOT95.slice();if(m.rw==="thái y")L.push(["tyv","phòng thuốc sau Thái y viện"]);v.j95spot=L[Math.floor(Math.random()*L.length)]}
   const pool=cs.filter(c=>c>=2);for(let i=0;i<n&&pool.length;i++){const c=j95dice(70)?pool[pool.length-1]:pool[0];const k0=1+Math.floor(Math.random()*2);
    if(z.sec.some(x=>x.a==="v"+v.id&&x.c===c))continue;z.sec.push({a:"v"+v.id,b:m.id,c,kh:[k0,k0+1],k:v.j95spot[0],spot:v.j95spot[1],kind:"tryst",why:`tư tình với ${m.name}`,wk:wk()})}}
  /* a plot in preparation: an errand to the place its route names, or a word with her own eunuch in a quiet corner */
  try{const z7=j70();const p=z7&&z7.pl.find(x=>!x.end&&x.st==="prep"&&x.a===v.id);if(p&&j95dice(80)){const r=pr70(p);const t=pt70(p);const s=(v.staff||[]).find(x=>x.role==="eunuch")||(v.staff||[])[0];
   const c=cs[1+Math.floor(Math.random()*(cs.length-1))];const sp=r&&r.pl?[r.pl,placeName(r.pl)]:SPOT95[Math.floor(Math.random()*SPOT95.length)];
   z.sec.push({a:"v"+v.id,b:s?"s"+s.sid:null,c,kh:[1+Math.floor(Math.random()*3)],k:sp[0],spot:sp[1],kind:"meet",plot:p.id,tgt:t?j95id(t):null,why:`chuẩn bị mưu: ${r?r.n.toLowerCase():"mưu hại"} nhắm vào ${t===S?"ngươi":t?t.name:"người khác"}`,wk:wk()})}}catch(e){}}
 /* the Emperor's week: a heavy court week sometimes; one personal leaning */
 z.emp=z.emp||{lean:{c:[1,2,3][Math.floor(Math.random()*3)],k:"vuon"}};z.empWk={busy:j95dice(20)};if(j95dice(10))z.emp.lean={c:[1,2,3][Math.floor(Math.random()*3)],k:j95dice(60)?"vuon":"thu"}}
function j95intent(v,cs){const O=[],z=j95z();const af=aff(v,S),ho=hostility(v,S);
 O.push(["emp",(v.trait==="Tham vọng"||v.trait==="Kiêu ngạo"?2.5:1)*((v.sung||0)<50?1.4:.7)*(.5+(v.ghen||0)/60),null,`tranh sủng (Sủng ${Math.round(v.sung||0)}, ghen ${v.ghen||0})`]);
 const al=others(v).filter(x=>x!==S&&x.alive&&!x.out&&!sameHouse(v,x)).map(x=>[x,aff(v,x)]).sort((p,q)=>q[1]-p[1])[0];
 if(al&&al[1]>=25&&motiveOK(v,al[0],"visit").ok)O.push(["ally",1.6,key(al[0]),`thân với ${al[0].name} (thiện cảm ${al[1]})`]);
 const fo=others(v).filter(x=>x!==S&&x.alive&&!x.out).map(x=>[x,hostility(v,x)]).sort((p,q)=>q[1]-p[1])[0];
 if(fo&&fo[1]>=50)O.push(["avoid",(v.trait==="Đa nghi"||v.trait==="Nhu mì")?1.6:1,key(fo[0]),`tránh mặt ${fo[0].name} (oán ${oan(v,fo[0])})`]);
 if(af>=30&&!sameHouse(S,v)&&motiveOK(v,S,"visit").ok)O.push(["visit",1.2,"me",`thân với ngươi (thiện cảm ${af})`]);
 const mk=z.meK[v.id];const mo=motiveOK(v,S,"ambush");
 if(mk&&mo.ok&&ho>=45)O.push(["ambush",2.2,"me",`${mo.why}; biết ngươi hay đến ${j95pn(mk.k)} ${j95bl(mk.c)}`]);
 else if(mo.ok&&ho>=55&&!sameHouse(S,v))O.push(["provoke",.8,"me",mo.why]);
 O.push(["none",1.6,null,""]);
 const it=j95pw(O.map(x=>[x,x[1]]));if(!it||it[0]==="none")return null;
 const mid=cs.filter(c=>c===1||c===2);let s;
 if(it[0]==="ambush")s=[mk.c];else if(it[0]==="avoid")s=cs.slice();else if(it[0]==="emp"){const E=cs.filter(c=>j95empW(c).vuon>=15);s=E.length?[E[Math.floor(Math.random()*E.length)]]:[]}
 else s=[(mid.length?mid:cs)[Math.floor(Math.random()*(mid.length?mid:cs).length)]];
 if(it[0]==="ally"&&j95dice(40)&&mid.length>1)s=mid.slice();
 return{k:it[0],t:it[2],s,why:it[3]}}

/* ---------------- 5. THE PLAN OF A BUỔI (per khắc) ---------------- */
function j95empW(c){const z=j95z();const W={thu:[75,25,45,5][c],dtd:[10,50,20,85][c],vuon:[5,25,35,10][c]};
 try{if(has("chamchinh"))W.thu*=1.6;if(has("datinh"))W.vuon*=1.5}catch(e){}W.vuon*=j95seaV(c);
 const md=S.emp&&S.emp.mood;if(md===0)W.vuon*=1.3;if(md>=2)W.vuon*=.6;
 if(z.empWk&&z.empWk.busy)W.thu*=2;if(z.emp&&z.emp.lean&&z.emp.lean.c===c)W[z.emp.lean.k]+=30;
 try{const fav=liveRivals(true).slice().sort((a,b)=>(b.sung||0)-(a.sung||0))[0];if(fav&&j95likely(fav,c)==="vuon")W.vuon*=1.3}catch(e){}return W}
function j95empAct(k,c){return k==="thu"?(c===0?"court":"memo"):k==="dtd"?(c===1?"dine":c===3?"bed":"rest"):"stroll"}
function j95planEmp(c){const W=j95empW(c);const k=j95pw(Object.entries(W));const P=[];const why=k==="thu"&&c===0?"lệ thượng triều buổi sáng":k==="dtd"&&c===3?"giờ ngự tẩm":k==="vuon"?"ngài thích dạo vườn lúc này":"việc triều chính";
 for(let i=0;i<4;i++)P.push([k,j95empAct(k,c),null,why]);
 if(j95dice(J95.SUR)){const alt=j95pw(Object.entries(W).filter(x=>x[0]!==k));if(alt){const s=1+Math.floor(Math.random()*3);for(let i=s;i<4;i++)P[i]=[alt,j95empAct(alt,c),null,alt==="thu"?"có tấu khẩn":alt==="vuon"?"đổi ý ra vườn":"mệt, hồi điện nghỉ"]}}
 return P}
function j95planTH(c){let k="tn",a=["receive","pray","rest","sleep"][c],why=c===0?"giờ các cung thỉnh an":"Thái hậu ở cung";
 if((c===1||c===2)&&j95seaV(c)>=1&&j95dice(15)){k="vuon";a="walk";why="trời đẹp, Thái hậu ra vườn"}return [0,1,2,3].map(()=>[k,a,null,why])}
function j95dist(v,c,it){const own=palaceOf(v);const M={};const add=(k,w,a,why)=>{if(!k||!(w>0))return;if(k!==own&&!j95acc(v,k))return;const o=M[k];if(o){o.w+=w;if(w>o.top){o.top=w;o.a=a;o.why=why}}else M[k]={w,a,why,top:w}};
 add(own,J95.OWN[c]/((j95z().mood||{})[v.id]||1),["read","eat","rest","sleep"][c],"ở cung mình");
 try{if(qOn()&&!v.queen&&c===0)add("kn",30,"greet","lệ thỉnh an Hoàng hậu buổi sáng")}catch(e){}
 for(const h of j95hab(v)){const k=j95res(v,h.k);let w=h.s[c]*2;if(k==="vuon")w*=j95seaV(c);add(k,w,h.a,"thói quen: "+ACT95[h.a])}
 if(c>=1){/* evenings and afternoons: calls on neighbours she does not dislike (the week's company) */const N=(j95z().nb||{})[v.id]||[];for(const id of N){const x=RV(id);if(!x||!x.alive||x.out||sameHouse(v,x)||!motiveOK(v,x,"visit").ok||hostility(v,x)>=30)continue;add(palaceOf(x),c===3?14:9,"visit","sang chơi, trò chuyện với "+x.name)}}
 if(v.preg||(v.suc||80)<50){add("tyv",15,"heal",v.preg?"đang có thai, đi bắt mạch":"yếu sức, đi uống thuốc");if(M[own])M[own].w*=1.4}
 if((v.sung||0)<15&&M[own])M[own].w*=1.8;
 if(it&&it.k==="avoid"){const f=byKey(it.t);const fk=f&&j95likely(f,c);if(fk&&fk!==own&&M[fk]){M[fk].w*=.2}}
 return M}
function j95itPlace(v,it,c){const z=j95z();
 if(it.k==="emp"){if(j95empW(c).vuon>=15&&j95acc(v,"vuon"))return["vuon","seekemp",null,it.why];return null}
 if(it.k==="ally"){const p=byKey(it.t);const k=p&&p.alive&&!p.out?palaceOf(p):null;if(k&&k!==palaceOf(v)&&j95acc(v,k)&&motiveOK(v,p,"visit").ok)return[k,"visit",j95id(p),it.why];return null}
 if(it.k==="visit"){if(!sameHouse(S,v)&&j95acc(v,"home")&&motiveOK(v,S,"visit").ok)return["home","visit","me",it.why];return null}
 if(it.k==="ambush"){const m=z.meK[v.id];const g=motiveOK(v,S,"ambush");if(m&&g.ok&&j95acc(v,m.k))return[m.k,"ambush","me",it.why];return null}
 if(it.k==="provoke"){const g=motiveOK(v,S,"provoke");if(g.ok&&j95acc(v,"home"))return["home","provoke","me",g.why];return null}
 return null}
function j95surprise(v,c,k0){const own=palaceOf(v);const L=[];
 try{if(qOn()&&!v.queen&&k0!=="kn"&&j95acc(v,"kn"))L.push(["kn","called",null,"Hoàng hậu cho gọi"])}catch(e){}
 if(k0!==own){L.push([own,"back",null,wet()?"trời đổ mưa, quay về cung":"cung nhân báo có việc, quay về"]);}
 if(k0!=="vuon"&&j95acc(v,"vuon")&&c<3)L.push(["vuon","changed",null,"đổi ý, ra vườn hóng mát"]);
 if(k0!=="tyv"&&j95acc(v,"tyv")&&c<3)L.push(["tyv","changed",null,"thấy trong người khó ở, ghé Thái y viện"]);
 if(k0!=="tn"&&!S.thDead&&j95acc(v,"tn"))L.push(["tn","called",null,"Thái hậu cho gọi"]);
 return L.length?L[Math.floor(Math.random()*L.length)]:null}
function j95planRival(v,c){const own=palaceOf(v);
 if(v.out)return [0,1,2,3].map(()=>["lc","cold",null,"bị đày vào lãnh cung"]);
 if(v.confined)return [0,1,2,3].map(()=>[own,"confined",null,`bị cấm túc ${v.confined} tháng`]);
 const z=j95z();const it=z.it[v.id];let ch=null;
 if(it&&it.s.includes(c)&&j95dice(J95.IT))ch=j95itPlace(v,it,c);
 if(!ch){const M=j95dist(v,c,it);const k=j95pw(Object.entries(M).map(([k,o])=>[k,o.w]))||own;const o=M[k]||{a:"rest",why:"ở cung mình"};ch=[k,o.a,null,o.why]}
 const P=[0,1,2,3].map(()=>ch.slice());
 if(j95dice(J95.SUR)){const alt=j95surprise(v,c,ch[0]);if(alt){const s=Math.floor(Math.random()*4);for(let i=s;i<4;i++)P[i]=alt.slice()}}
 return P}
function j95planOther(p,c,P){const kh=[0,1,2,3];
 if(p.kind==="emp")return j95planEmp(c);if(p.kind==="th")return j95planTH(c);
 if(p.kind==="mm"||p.kind==="st"){const o=p.ref;const oid=o===S?"me":"v"+o.id;const op=P[oid];const home=p.home;
  return kh.map(i=>{const ok=op?op[i][0]:home;if(p.kind==="mm"&&o!==S&&ok!==home&&ok!=="lc")return[ok,"follow",oid,"theo hầu chủ ra ngoài"];
   if(p.kind==="st"&&p.__err===i)return[p.__ek,"errand",null,p.__ek==="tyv"?"chủ sai đi lấy thuốc":"chủ sai đi Kính sự phòng hỏi chuyện"];
   return[home,i%2?"clean":"serve",oid,home==="lc"?"hầu chủ ở lãnh cung":"phận sự trong cung"]})}
 if(p.kind==="px"){const o=p.ref;const oid=o===S?"me":"v"+o.id;return kh.map(()=>p.home==="tgk"?["tgk","laundry",oid,"bị phạt giặt giũ ở Tân Giả khố"]:["cnh","offduty",oid,"đến lượt nghỉ tay"])}
 if(p.kind==="fix")return kh.map(()=>p.home===J95OUT_?[J95OUT_,"away",null,"hôm nay không có giờ giảng"]:p.id==="c:tgk"?["tgk","oversee",null,"phận sự ở Tân Giả khố"]:["ttp","teach",null,"giảng sách cho các hoàng tử, công chúa"]);
 if(p.kind==="court"){const c2=p.id.slice(2);
  if(c2==="tq")return kh.map(i=>[P.emp?P.emp[i][0]:"dtd","attend","emp","tổng quản luôn hầu bên Hoàng thượng"]);
  if(c2==="ksp")return kh.map(()=>["ksp","book",null,"phận sự Kính sự phòng"]);
  if(c2==="ty"){const sick=liveRivals(true).filter(v=>v.preg||(v.suc||80)<50);const v=sick.length&&j95dice(25)?sick[Math.floor(Math.random()*sick.length)]:null;const s=1+Math.floor(Math.random()*3);
   return kh.map(i=>v&&i===s?[palaceOf(v),"heal","v"+v.id,v.preg?"bắt mạch an thai":"bắt mạch cho người yếu sức"]:["tyv","brew",null,"trực Thái y viện"])}
  /* main jact (Dư đồ Nội vụ phủ, 16/11): the Nội vụ phủ eunuch stands at Nội vụ phủ every khắc (jact draws him there) — one place (r1) */
  if(j95nvp())return kh.map(()=>["nvp","sell",null,"bày hàng mua từ ngoài cung ở Nội vụ phủ"]);
  const Lp=["vuon","ksp","tyv"];return kh.map(()=>{const k=Lp[Math.floor(Math.random()*Lp.length)];return[k,"sell",null,"đi bán hàng rong kiếm lời"]})}
 if(p.kind==="man"){const m=p.ref;const w=null;const k=p.home||"vuon";const a=m.rw==="thái y"?"heal":m.rw==="thị vệ"?"guard":m.rw==="nhạc sư"?"music":m.rw==="họa sư"?"paint":m.rw==="sứ thần"&&k==="thu"?"audience":"walk";
  return kh.map(()=>[k,a,null,w?"nơi hắn hay lui tới":"phận sự"])}
 if(p.kind==="el")return kh.map(()=>[p.home,"serve",p.home==="home"?"me":"th",p.ref&&p.ref.eid?"giữ chức trong cung":"hầu Thái hậu"]);
 if(p.kind==="min")return kh.map(()=>[p.home,p.home==="thu"?"audience":"feast",null,p.home==="thu"?"vào chầu buổi sáng":"dự yến lễ tết"]);
 if(p.kind==="kid"){const k=p.ref;const age=k.age||0;return kh.map(()=>[p.home,age<3?(c===1||c===3?"sleep":"nurse"):["study","nap","play","sleep"][c],null,age<3?"còn nhỏ, nhũ mẫu trông":"việc thường ngày của hoàng tự"])}
 return kh.map(()=>[p.home||"home","rest",null,""])}
function j95mePlace(){try{return whereOf(S)}catch(e){return S.place||"home"}}
function j95plan(){/* build the whole record for the new buổi */const z=j95z();j95week();const c=j95c();const R={key:j95key(),wk:wk(),b:S.buoi||0,c,nb:j95nB(),P:{},who:{},acts:[],m:[],ev:[]};
 const ppl=j95ppl(null);for(const p of ppl)R.who[p.id]=[p.name,p.role];
 for(const p of ppl)if(p.kind==="rv")R.P[p.id]=j95planRival(p.ref,c);
 R.P.emp=j95planEmp(c);if(!S.thDead)R.P.th=j95planTH(c);
 R.P.me=[0,1,2,3].map(()=>[j95mePlace(),"here",null,"ngươi tự chọn"]);
 for(const p of ppl){if(R.P[p.id])continue;if(p.kind==="st"&&j95dice(15)&&p.home!=="lc"){p.__err=1+Math.floor(Math.random()*3);p.__ek=j95dice(50)?"tyv":"ksp"}R.P[p.id]=j95planOther(p,c,R.P)}
 S.roster=R;return R}
/* secret meetings and NPC→NPC catches, after the old placeWhere wrappers ran */
function j95secApply(R){const z=j95z();const c=R.c;
 for(const s of z.sec){if(s.c!==c||s.wk!==wk())continue;s.key=R.key;const A=R.P[s.a];if(!A)continue;
  for(const i of s.kh){A[i]=[s.k,s.kind,s.b,s.why];if(s.b){if(!R.P[s.b]){const m=manById(s.b);if(m)R.who[s.b]=[m.name,m.role];R.P[s.b]=[0,1,2,3].map(()=>[null,"go",null,""])}
    if(R.P[s.b])R.P[s.b][i]=[s.k,s.kind,s.a,s.kind==="tryst"?"tư tình":"chủ sai việc kín"]}}
  /* men only in the palace for the meeting: outside at the other khắc → drop them out of the record those khắc by putting them at the meeting spot only */
  if(s.b&&R.P[s.b]){for(let i=0;i<4;i++)if(R.P[s.b][i][0]==null)R.P[s.b][i]=[s.k,"go",null,"lặng lẽ đến chỗ hẹn"]}
  /* NPC passers-by at the same place and khắc may see (same odds as hers) */
  for(const v of liveRivals(true)){const id="v"+v.id;if(id===s.a||!R.P[id])continue;const at=s.kh.some(i=>R.P[id][i][0]===s.k);if(!at)continue;
   const sub=RV(+s.a.slice(1));if(!sub)continue;const out=j95catchRoll(v,sub);if(out==="flee")continue;
   evA(v,sub,out==="one"?1:2);if(s.kind==="tryst")sub.scandal=1;R.ev.push(`${v.name} bắt gặp ${sub.name} (${s.kind==="tryst"?"hẹn hò lén":"gặp tay chân"})`)}}}

/* ---------------- 6. SYNC: the views every old reader uses ---------------- */
function j95view(R,kh){const W={};W.emp=R.P.emp?R.P.emp[kh][0]:"dtd";W.th=R.P.th?R.P.th[kh][0]:null;
 for(const v of rivals){const e=R.P["v"+v.id];if(v.alive&&e)W[v.id]=e[kh][0]}return W}
/* who the map counts and the stage draws: the people she would MEET there (main rule, review/stage-slots: "the Dư đồ count of a place = the
   people she meets there"). Servants, maids, children and the court eunuchs who are not drawn stay in the record but are not counted; at her own
   palace her maid and children are (homePeople), consorts living in her palace are not, visitors are. */
function j95vis(id,k){if(!id||!k||k===J95OUT_||id==="me")return false;const c=id[0];
 if(c==="v"){const v=RV(+id.slice(1));return !!(v&&v.alive&&!(k==="home"&&sameHouse(S,v)))}
 if(id==="emp")return k!=="home"&&!(k==="dtd"&&(S.sung||0)<50);if(id==="th")return true;
 if(c==="m"&&id[1]!=="m")return true;if(c==="q")return true;if(J95.eld&&J95.eld[id]){/* a named elder counts only where jstaff addStage draws her */const e=J95.eld[id];return e==="kn"?k==="kn":e==="tn"?(k==="tn"&&!S.thDead)||k==="tgk":e==="gt"?k==="home"&&(S.turn||0)<=4&&!S.out:false}if(id==="c:ty"||id==="c:ksp")return true;if(id==="c:ped")return k==="nvp"&&j95nvp();/* jplx places draw the servants and children their lists put there (not on the maid road: jplx skips it) */if(typeof isSrv==="function"&&isSrv()&&(id==="c:tgk"||id==="c:ttp"||(c==="s"&&J95.px&&J95.px[id])||(c==="k"&&(k==="ttp"||k==="acs"||k==="dc"))))return false;if(id==="c:tgk"||id==="c:ttp")return true;if(c==="s"&&J95.px&&J95.px[id]===k)return true;if(c==="k"&&(k==="ttp"||k==="acs"||k==="dc"))return true;
 /* her own household servants: jhouse (main, servant-system) draws them on her room / lãnh cung stage (r1 16/11) */if(c==="s"&&(k==="home"||k==="lc")&&j95hsv(id))return true;
 if(k==="home")return id==="mm:me"||id.indexOf("k:me:")===0;return false}
function j95nvp(){try{return typeof adSrv==="function"&&!adSrv()&&!!(S&&S.court&&S.court.ped&&S.court.ped.name)}catch(e){return false}}
function j95hsv(id){try{return typeof hsvOn==="function"&&hsvOn()&&(S.staff||[]).some(s=>s&&s.sid!=null&&"s"+s.sid===id)}catch(e){return false}}
/* one person, one place (review/schedules3-r1): jhouse draws EVERY household servant at her room; the record may have one on an errand or
   resting at Dãy nhà cung nhân (jplx) — the stage draws only those the record puts at her room / lãnh cung now (function declarations are
   hoisted in the assembled file, so this wraps jhouse's hsvList though jhouse loads later) */
if(typeof hsvList==="function"){const hl0=hsvList;hsvList=function(){const L=hl0.apply(this,arguments);try{if(!j95on()||!S||!S.roster||S.roster.key!==j95key()||!Array.isArray(L))return L;
 const R=S.roster,kh=j95kh(),k=S.out?"lc":"home";return L.filter(s=>{const e=R.P["s"+s.sid];return !e||!e[kh]||e[kh][0]===k})}catch(e){return L}}}
const J95OUT_="ngoai";
/* the khắc she would ARRIVE at k (walking costs travel(): the map number is the number she meets on arrival, main rule review/stage-slots) */
function j95arrKh(k){const kh=j95kh();try{if(!k||k===S.place||k==="home")return kh;let from=S.place||"home";
 if(typeof isSrv==="function"&&isSrv()){const m=srvM();if(m&&k===palaceOf(m))return kh;if(from==="home"&&m)from=palaceOf(m)}/* j42 srvGoTo walks from her mistress's palace */
 return Math.min(J95.KH-1,kh+Math.max(0,travel(from,k)||0))}catch(e){return kh}}
function j95elderK(x){if(x.eid==="kn")return"kn";if(x.eid==="gt"&&(S.turn||0)<=4&&!S.out)return"home";return"tn"}
function j95counts(R,kh){const C={};for(const id in R.P){const k=R.P[id][kh][0];if(k&&j95vis(id,k))C[k]=(C[k]||0)+1}return C}
function j95sync(watch,plan){if(!j95on())return;let R=S.roster;if(!R||R.key!==j95key()){if(!plan)return;if(R)j95log(R);R=j95plan();j95secApply(R)}
 const kh=j95kh();const ppl=j95ppl(R);const ids={};
 for(const p of ppl){ids[p.id]=1;R.who[p.id]=[p.name,p.role];if(!R.P[p.id]){const P=p.kind==="rv"?j95planRival(p.ref,R.c):j95planOther(p,R.c,R.P);/* a newcomer in the middle of the buổi (a birth, a man let in): the khắc already shown did not have her/him */if(R.kh!=null)for(let i=0;i<Math.min(kh,R.kh+1);i++)P[i]=[J95OUT_,"away",null,"chưa có trong cung lúc ấy"];R.P[p.id]=P}}
 for(const id in R.P)if(!ids[id]){delete R.P[id]}
 /* her own line: past khắc keep where she was, now and later = where she stands */
 const me=j95mePlace();for(let i=kh;i<4;i++)R.P.me[i]=[me,me==="home"?"rest":"here",null,"ngươi tự chọn"];
 if(R.P["mm:me"])for(let i=kh;i<4;i++)R.P["mm:me"][i]=S.out?["lc","serve","me","hầu chủ ở lãnh cung"]:me==="home"?["home","serve","me","phận sự trong cung"]:[me,"follow","me","theo hầu ngươi"];
 /* staff whose owner fell / rose: follow the owner's new home */
 for(const p of ppl)if((p.kind==="st"||p.kind==="mm")&&p.ref!==S){const e=R.P[p.id];for(let i=kh;i<4;i++){if(e[i][1]!=="follow"&&e[i][1]!=="errand"&&e[i][0]!==p.home)e[i]=[p.home,"serve","v"+p.ref.id,"phận sự trong cung"]}}
 /* jplx lists can change inside a buổi (a servant punished to Tân Giả khố, the rest list): now and later khắc follow them */
 for(const p of ppl){if((p.kind!=="px"&&p.kind!=="st")||!p.ref)continue;const e=R.P[p.id];if(!e)continue;const oid=p.ref===S?"me":"v"+p.ref.id;
  for(let i=kh;i<4;i++){const x=e[i];if(p.kind==="px"){if(x[0]!==p.home)e[i]=p.home==="tgk"?["tgk","laundry",oid,"bị phạt giặt giũ ở Tân Giả khố"]:["cnh","offduty",oid,"đến lượt nghỉ tay"]}
   else if(x[1]==="offduty"||x[1]==="laundry")e[i]=[p.home,i%2?"clean":"serve",oid,p.home==="lc"?"hầu chủ ở lãnh cung":"phận sự trong cung"]}}
 for(const p of ppl)if(p.kind==="rv"){const v=p.ref,e=R.P[p.id];for(let i=kh;i<4;i++){const un=()=>{if(typeof j95cUnsay==="function")j95cUnsay(p.id,R.key,i)};if(v.out){if(e[i][0]!=="lc"){un();e[i]=["lc","cold",null,"bị đày vào lãnh cung"]}}else if(v.confined&&e[i][0]!==palaceOf(v)&&e[i][1]!=="tryst"){un();e[i]=[palaceOf(v),"confined",null,`bị cấm túc ${v.confined} tháng`]}}}
 /* r2: a named elder (jstaff) stands at her post from the current khắc on (her eid can be given after the plan, the guide leaves her room
    after turn 4, Thái hậu dies): the record follows the post rule j95elderK, the same one jstaff addStage draws by */
 for(const p of ppl){if(p.kind!=="el"||!p.ref||!p.ref.eid)continue;const e=R.P[p.id];if(!e)continue;const hk=j95elderK(p.ref);for(let i=kh;i<4;i++)if(e[i][0]!==hk)e[i]=[hk,"serve",hk==="home"?"me":"th","giữ chức trong cung"]}
 /* r2: the Nội vụ phủ eunuch stands at Nội vụ phủ only while that place exists (jact: not in lãnh cung, not on the maid road) */
 {const e=R.P["c:ped"];if(e){const on=j95nvp();for(let i=kh;i<4;i++){if(on&&e[i][0]!=="nvp")e[i]=["nvp","sell",null,"bày hàng mua từ ngoài cung ở Nội vụ phủ"];else if(!on&&e[i][0]==="nvp")e[i]=["ksp","sell",null,"đi bán hàng rong kiếm lời"]}}}
 try{j95fixHouse(R,kh,ppl)}catch(e){j95err("house",e)}
 const W=j95view(R,kh);S.where=W;const MW={};for(const m of S.men||[]){const e=R.P[m.id];if(m.alive&&e&&e[kh][0]&&e[kh][0]!==J95OUT_)MW[m.id]=e[kh][0]}S.menW=MW;
 R.m[kh]=j95counts(R,kh);R.kh=kh;
 J95.stageCh=false;try{J95.stageCh=!!j95stage(R,kh)}catch(e){}if(watch)try{j95watch(R,kh)}catch(e){}}
/* housing changed after the plan (jpal palFix at start / end of week / map / load, a head of house fallen, dead or raised):
   from the current khắc on, what is done at home happens in the NEW home; a visit follows the person visited to her new home or
   turns back; a palace whose head is gone is no place to be; servants follow their mistress where she is NOW (cung nữ thân tín
   goes out with her and comes home with her), the others serve in her current home; children live in their mother's current home */
const HOME95=new Set(["rest","sleep","read","eat","dance"]);
function j95rnOK(k){if(!/^r\d+$/.test(k||""))return true;const h=RV(+k.slice(1));return !!(h&&h.alive&&!h.out&&(h.queen||houseOf(h)===key(h)))}
function j95fixHouse(R,kh,ppl){let n=0;const st=J95.stat;
 for(const p of ppl)if(p.kind==="rv"){const v=p.ref,e=R.P[p.id];if(!e||v.out)continue;const own=palaceOf(v);
  for(let i=kh;i<4;i++){const x=e[i];if(!x||x[0]===own)continue;
   if(HOME95.has(x[1])||x[1]==="confined"||(x[1]==="back"&&/quay về/.test(x[3]||""))){e[i]=[own,x[1],x[2],x[3]];n++;continue}
   if(x[1]==="visit"&&x[2]&&x[2][0]==="v"){const t=RV(+x[2].slice(1));const tk=t&&t.alive&&!t.out?palaceOf(t):null;if(tk&&tk!==x[0]&&tk!==own&&j95acc(v,tk)){e[i]=[tk,x[1],x[2],x[3]];n++;continue}
    if(!tk||tk===own||!j95rnOK(x[0])||tk!==x[0]){e[i]=[own,"back",null,"người định thăm đã dời cung, quay về"];n++;continue}}
   if(!j95rnOK(x[0])){e[i]=[own,"back",null,"chủ cung nơi định đến không còn ở đó, quay về"];n++}}}
 for(const p of ppl)if(p.kind==="man"){const e=R.P[p.id];if(!e)continue;for(let i=kh;i<4;i++){const x=e[i];if(!x||j95rnOK(x[0]))continue;const t=x[2]&&x[2][0]==="v"?RV(+x[2].slice(1)):null;
   const tk=t&&t.alive&&!t.out?palaceOf(t):null;e[i]=tk&&tk!=="home"&&j95rnOK(tk)?[tk,x[1],x[2],x[3]]:[J95OUT_,"away",null,"chủ cung nơi có lệnh đến đã dời đi, hắn ra khỏi hậu cung"];n++}}
 const ty=R.P["c:ty"];if(ty)for(let i=kh;i<4;i++){const x=ty[i];if(x[1]!=="heal"||!x[2]||x[2][0]!=="v")continue;const v=RV(+x[2].slice(1));
  if(!v||!v.alive||v.out)ty[i]=["tyv","brew",null,"trực Thái y viện"];else if(x[0]!==palaceOf(v))ty[i]=[palaceOf(v),x[1],x[2],x[3]]}
 for(const p of ppl){const e=R.P[p.id];if(!e)continue;
  if(p.kind==="kid"){for(let i=kh;i<4;i++)if(e[i][0]!==p.home){e[i]=[p.home,e[i][1],null,e[i][3]];n++}continue}
  if(p.kind!=="mm"&&p.kind!=="st")continue;const o=p.ref;if(o===S&&p.kind==="mm")continue;const oid=o===S?"me":"v"+o.id;const op=R.P[oid];
  const home=[p.home,null,oid,p.home==="lc"?"hầu chủ ở lãnh cung":"phận sự trong cung"];
  for(let i=kh;i<4;i++){const x=e[i];
   if(p.kind==="mm"){const ok=op?op[i][0]:p.home;if(ok&&ok!==p.home&&ok!=="lc"){if(x[0]!==ok||x[1]!=="follow"){e[i]=[ok,"follow",oid,"theo hầu chủ ra ngoài"];n++}}
    else if(x[0]!==p.home||x[1]==="follow"){e[i]=[p.home,i%2?"clean":"serve",oid,home[3]];n++}continue}
   if(x[1]==="errand"&&p.home!=="lc")continue;
   if(x[0]!==p.home||x[1]==="follow"||x[1]==="errand"){e[i]=[p.home,i%2?"clean":"serve",oid,home[3]];n++}}}
 if(n)st.fix=(st.fix||0)+n;return n}
/* the stage where she stands follows the record (people leave / arrive between khắc). Returns true when it changed. */
/* maid road stage (j42 srvVisitOf: at most 4 consorts) follows the record when people come and go between khắc (port 16/11) */
function j95srvStage(R,kh,V){const k=S.place;const m=srvM();const mk=m?palaceOf(m):null;let ch=false;
 const at=v=>{const e=R.P["v"+v.id];if(!e)return false;const w=e[kh][0];return w===k||(k==="home"&&(w==="home"||w===mk))};
 for(let i=V.people.length-1;i>=0;i--){const p=V.people[i];if(p.kind==="srv"&&p.ref&&p.ref.rel!=null&&(p.sk==="rv"||p.sk==="hh"||p.sk==="mis")&&!at(p.ref)){V.people.splice(i,1);popIdx=null;ch=true}}
 if(k!=="tgk"&&k!=="lc"){let n=V.people.filter(p=>p.kind==="srv"&&(p.sk==="rv"||p.sk==="hh"||p.sk==="mis")).length;const cap=k==="home"?1:4;
  for(const v of liveRivals(true)){if(n>=cap)break;if(v===S||!at(v)||(k==="home"&&v!==m)||V.people.some(p=>p.ref===v))continue;
   V.people.push({kind:"srv",sk:v.queen?"hh":v===m?"mis":"rv",ref:v,name:(v.queen?"Hoàng hậu ":"")+v.name,ini:v.name.split(" ").pop()[0],col:RCOL[rkOf(v)],info:`${rkName(v)}${v===m?" · chủ nhân của ngươi":""} · ${v.trait}`});n++;ch=true}}
 return ch}
/* one figure per person on the stage: an inner render can reconcile before an older goTo wrapper (j22 men) adds its own (port 16/11) */
function j95dedupe(V){if(!V||!V.people)return;const seen=new Set();for(let i=0;i<V.people.length;i++){const p=V.people[i];const r=p&&p.ref;if(!r)continue;const k=p.kind+":"+(p.kind==="min"?(r.c!=null?r.c:r.name):r.id!=null?r.id:r.c!=null?r.c:r.name);if(seen.has(k)){V.people.splice(i,1);i--;popIdx=null}else seen.add(k)}}
function j95stage(R,kh){const V=S.visit;if(!V||!V.people||V.k!==S.place||S.dead)return false;j95dedupe(V);/* the maid road fills its stage by its own rules (j42 srvVisitOf reads whereOf = the record; j59srvCount) */if(typeof isSrv==="function"&&isSrv())return j95srvStage(R,kh,V);const k=S.place;let ch=false;
 const here=id=>R.P[id]&&R.P[id][kh][0]===k;
 for(let i=V.people.length-1;i>=0;i--){const p=V.people[i];let id=null;
  if((p.kind==="rival"||p.kind==="hh")&&p.ref)id="v"+p.ref.id;else if(p.kind==="emp")id="emp";else if(p.kind==="th")id="th";else if(p.kind==="man"&&p.ref)id=p.ref.id;else if(p.kind==="ty")id="c:ty";else if(p.kind==="ksp")id="c:ksp";else if(p.kind==="min"&&p.ref&&p.ref.c!=null)id="q:"+p.ref.c;else if(p.kind==="serv"&&p.sid!=null)id="s"+p.sid;else if(p.kind==="peddler"&&R.P["c:ped"])id="c:ped";
  else if(p.kind==="fallen"){if(!p.ref||!here("v"+p.ref.id)){V.people.splice(i,1);popIdx=null;ch=true}continue}
  if(id&&(R.P[id]||p.kind==="man"||p.kind==="serv")&&!here(id)){V.people.splice(i,1);popIdx=null;ch=true}}
 for(const v of liveRivals(true)){const id="v"+v.id;if(!here(id))continue;if(V.people.some(p=>p.ref===v&&(p.kind==="rival"||p.kind==="hh")))continue;
  if(k==="home"&&sameHouse(S,v))continue;try{V.people.push(v.queen&&qOn()?{...rp(v),kind:"hh",name:`Hoàng hậu ${v.name}`,ini:"鳳"}:rp(v));ch=true}catch(e){}}
 /* jplx places: the people jplx's lists put here (servants, children, the fixtures) are on the stage (a walk that crosses into the next buổi
    can leave an empty stage) */
 if(typeof plxPeople==="function"&&/^(cnh|tgk|ttp|acs|dc)$/.test(k))try{for(const q of plxPeople(k)){if(!q||q.kind==="task")continue;if(V.people.some(p=>p.kind===q.kind&&(q.sid!=null?p.sid===q.sid:q.ref?p.ref===q.ref:p.name===q.name)))continue;V.people.push(q);popIdx=null;ch=true}}catch(e){}
 /* her palace: a child born while she is there joins the stage the record shows (the kid entries homePeople() draws) */
 if(k==="home"&&!S.out)try{const ks=Object.keys(R.P).filter(id=>id.indexOf("k:me:")===0&&here(id));if(ks.length>V.people.filter(p=>p.kind==="kid").length)for(const p of homePeople())if(p.kind==="kid"&&!V.people.some(q=>q.kind==="kid"&&q.ref===p.ref)){V.people.push(p);popIdx=null;ch=true}}catch(e){}
 /* men, officials, the court physician and the Kính sự phòng eunuch the record puts here (port 16/11: the map counts them, so the stage draws them) */
 for(const id in R.P){if(!here(id))continue;
  if(id[0]==="m"&&id[1]!=="m"){const m=manById(id);if(!m||!m.alive||V.people.some(p=>p.kind==="man"&&p.ref&&(p.ref===m||p.ref.id===m.id)))continue;V.people.push({kind:"man",ref:m,name:m.name.split(" ").slice(0,1).concat(m.name.split(" ").slice(-1)).join(" "),ini:m.name.split(" ").pop()[0],col:"#6a8aa0",info:`${m.role} · ${m.trait}`});ch=true}
  else if(id.indexOf("q:")===0){try{const c=id.slice(2);const h=(trS().H||{})[c];if(!h||V.people.some(p=>p.kind==="min"&&p.ref&&(p.ref===h||p.ref.c===c||p.ref.name===h.name)))continue;V.people.push({kind:"min",ref:h,name:h.name,ini:"Quan",col:"#7a6a50",info:`${TDOFF[h.c]||"Quan"} · ${R.P[id][kh][0]==="thu"?"vào chầu":"dự yến"}`});ch=true}catch(e){}}
  /* r1: jact draws the Nội vụ phủ eunuch only on goTo; any other arrival (a walk into the next buổi, a new buổi) draws him from the record */
  else if(id==="c:ped"&&k==="nvp"&&!V.people.some(p=>p.kind==="peddler")){const c=S.court&&S.court.ped;V.people.push({kind:"peddler",name:c&&c.name?c.name:"Thái giám Nội vụ phủ",ini:"Hoạn",col:"#b9a48a",info:"Thái giám Nội vụ phủ"});ch=true}
  /* r1: her household servants the record puts here now (jhouse rebuilds its list only on renderStage) */
  else if(id[0]==="s"&&(k==="home"||k==="lc")&&j95hsv(id)&&!V.people.some(p=>p.kind==="serv"&&"s"+p.sid===id)){try{const s=(S.staff||[]).find(x=>x&&"s"+x.sid===id);if(s&&typeof hsvPerson==="function"){V.people.push(hsvPerson(s));ch=true}}catch(e){}}
  else if(id==="c:ty"&&!V.people.some(p=>p.kind==="ty")){const o=S.court&&S.court.ty;V.people.push({kind:"ty",name:o&&o.name||"Thái y",ini:"Y",col:"#8fc38a",info:"Thái y viện"});ch=true}
  else if(id==="c:ksp"&&!V.people.some(p=>p.kind==="ksp")){V.people.push({kind:"ksp",name:"Tổng quản",ini:"Hoạn",col:"#b9a48a",info:"Giữ thẻ bài các phi tần"});ch=true}}
 /* lãnh cung: every fallen consort the record puts here (no limit), nobody invented */
 if(k==="lc"){for(const v of rivals){if(!v.alive||!v.out||!here("v"+v.id)||V.people.some(p=>p.ref===v))continue;V.people.push({kind:"fallen",ref:v,name:v.name,ini:v.name.split(" ").pop()[0],col:"#6a7a8a",info:S.out?"Phế phi · cùng cảnh ngộ":"Phế phi"});ch=true}
  if(ch&&!V.people.length)V.msg="Lãnh cung vắng lặng, chỉ có gió lùa qua song cửa mục.";else if(ch&&!S.out)V.msg=`Ở đây có ${V.people.length} người.`}
 /* the Kính sự phòng eunuch is not the Tổng quản */
 const kc=S.court&&S.court.ksp;if(kc&&kc.name)for(const p of V.people)if(p.kind==="ksp"&&p.name!==kc.name){p.name=kc.name;p.info="Kính sự phòng · Giữ thẻ bài các phi tần";ch=true}
 if(here("emp")&&k!=="home"&&k[0]!=="r"&&!V.people.some(p=>p.kind==="emp")&&!(k==="dtd"&&S.sung<50)){try{V.people.push({kind:"emp",name:"Hoàng thượng",ini:"帝",col:"#f0d070",info:`${empName()} · ${MOODS[S.emp.mood][0].toLowerCase()}`});ch=true}catch(e){}}
 if(here("th")&&!V.people.some(p=>p.kind==="th")){V.people.push({kind:"th",name:"Thái hậu",ini:"慈",col:"#c9a0e0",info:`Thái hậu · lòng ${S.th}`});ch=true}
 return ch}
/* what she can see happen where she stands: secret meetings (catch), people waiting for her (ambush), what she observes */
function j95watch(R,kh){if(S.dead||S.out||(typeof isSrv==="function"&&isSrv()))return;const k=S.place;const z=j95z();const c=R.c;
 for(const v of liveRivals(true)){const e=R.P["v"+v.id];if(!e||e[kh][0]!==k||k==="home"&&sameHouse(S,v))continue;j95obs(v,c,e[kh][0],"Chính ngươi thấy");
  const sk=R.key+":"+v.id;if(e[kh][1]==="ambush"&&!z.seen[sk]){z.seen[sk]=1;if(j95dice(35)){const g=motiveOK(v,S,"ambush");if(g.ok){let r="";try{r=npcAct(v,S)}catch(x){}if(r)Q.push({t:"Có người chờ sẵn",who:pv(v),h:`<p>${v.name} như đã đợi ngươi ở ${j95pn(k)}.</p><p>${r}</p>`})}}}}
 for(const s of z.sec){if(s.key!==R.key||s.k!==k||!s.kh.includes(kh))continue;const ck=R.key+":"+s.a+":me";if(z.seen[ck])continue;z.seen[ck]=1;j95caught(s)}
 for(const cl of z.clue)if(!cl.done){const e=R.P[cl.vid];if(e&&e[kh][0]===k&&j95dice(35)){const v=RV(+cl.vid.slice(1));if(v){cl.done=1;j95ctx({how:`Nhận ra ${cl.item} là của ${v.name}`,proves:`${v.name} là người lén hẹn ở ${cl.spot}`},()=>evA(S,v,1));
   if(cl.kind==="tryst")v.scandal=1;Q.push({t:"Nhận ra",who:pv(v),h:`<p>Ngươi nhìn kỹ: ${cl.item} nhặt được ở ${cl.spot} hôm nọ đúng là của ${v.name}.</p>`})}}}
 if(Q.length)try{showModal()}catch(e){}}
function j95obs(v,c,k,by){const z=j95z();const O=z.obs[v.id]=z.obs[v.id]||{};const key=c+":"+k;const R=S.roster;const once=R?R.key:"";const o=O[key]=O[key]||{n:0,w:wk(),by};if(o.bk===once)return;o.bk=once;o.n++;o.w=wk();o.by=by}

/* ---------------- 7. CATCHING A SECRET MEETING (two-way) ---------------- */
function j95ctx(c,f){if(typeof J78==="undefined")return f();const p=J78.ctx;J78.ctx=c;try{return f()}finally{J78.ctx=p}}
function j95catchRoll(o,v){const mat=o===S?(S.mat||0):(o.mat||0);let tc=0;try{tc=tc70(v)}catch(e){tc=v===S?S.tamco||0:v.tamco||0}const night=j95c()===3;
 const rev=cl(Math.round(12+tc/10-mat*2),5,30),full=cl(Math.round(35+mat*6-(night?10:0)-tc/6),10,60),one=20;let r=Math.random()*100;
 if(r<rev)return"rev";r-=rev;if(r<full)return"full";r-=full;if(r<one)return"one";return"flee"}
function j95caught(s){const v=RV(+s.a.slice(1));if(!v||!v.alive)return;const m=s.kind==="tryst"?manById(s.b):null;const out=j95catchRoll(S,v);const W=s.spot;const z=j95z();
 if(out==="flee"){const it=TRACE95[Math.floor(Math.random()*TRACE95.length)];z.clue.push({vid:s.a,item:it,spot:W,kind:s.kind,w:wk()});
  Q.push({t:"Bóng người trong chỗ khuất",h:`<p>Ở ${W} có hai bóng người đứng sát nhau. Nghe tiếng chân ngươi, họ vội tản ra, không kịp nhìn mặt.</p><p>Dưới đất còn rơi lại ${it}.</p>`});return}
 if(out==="one"&&j95dice(50)&&m){m.j95known=1;Q.push({t:"Bóng người trong chỗ khuất",h:`<p>Ở ${W}, ngươi nhận ra ${m.name} đang hẹn một người phụ nữ mặc áo phi tần; nàng che mặt chạy mất, ngươi không rõ là ai.</p>`});return}
 const full=out!=="one";const what=s.kind==="tryst"?(full&&m?`lén hẹn hò với ${m.name}`:"lén gặp một nam nhân"):"thì thầm trao đồ với tay chân";
 noteAdd(v.id,`chính ngươi bắt gặp nàng ${what} ở ${W}`);
 if(s.kind==="tryst"){v.scandal=1;try{intelAdd(v,{k:"affair",kind:"secret",txt:`${v.name} ${what}.`},{by:"Chính ngươi",how:`Bắt gặp ở ${W}`})}catch(e){}}
 j95ctx({how:`Ngươi tận mắt bắt gặp ở ${W}`,proves:s.kind==="tryst"?`${v.name} ${what}`:undefined},()=>evA(S,v,1));
 if(out==="rev"){z.wit[v.id]={w:wk(),k:s.kind};const g=motiveOK(v,S,"harm");
  if(g.ok&&(v.malice||0)>=55){oanAdd(v,S,25);affAdd(v,S,-15);noteAdd(v.id,"biết ngươi đã thấy chuyện kín của nàng; phải đề phòng nàng diệt khẩu")}
  else{v.j95bribe=wk()}}
 Q.push({t:out==="rev"?"Bắt gặp, và bị thấy":"Bắt gặp",who:pv(v),h:`<p>Ở ${W}, ngươi thấy rõ ${v.name} ${what}.</p>${out==="rev"?`<p class="r">Nàng ngẩng lên, bắt gặp ánh mắt ngươi. Nàng biết ngươi đã thấy.</p>`:""}`,opts:j95catchOpts(v,m,s,out)});
 if(out==="rev"&&v.j95bribe===wk()){const g=Math.min(60,Math.max(10,Math.floor((v.bac||0)/3)));Q.push({t:"Lời nhờ cậy",who:pv(v),h:`<p>Tối ấy cung nữ của ${v.name} lén mang sang một hộp gấm, trong có ${g} lượng bạc: “Nương nương nhà nô tỳ xin người coi như chưa thấy gì.”</p>`,
  opts:[{n:"Nhận lễ, giữ im lặng",fx:{},x:`Nắm chắc · thành: Bạc +${g} · nàng quý ngươi +6 · nàng nợ ngươi một ân tình · kèm: nhận lễ là đã hứa giữ kín`,go:()=>j95bribeTake(v,g)},{n:"Trả lại hộp gấm",fx:{},x:"Nắm chắc · thành: không mắc nợ nàng · kèm: nàng oán ngươi +10",go:()=>{oanAdd(v,S,10);log(`Ngươi trả lại lễ của ${v.name}.`)}}]})}}
function j95bribeTake(v,g){const n=Math.min(g,Math.floor(v.bac||0));v.bac=Math.max(0,(v.bac||0)-n);apply({bac:n});relAdd(v,S,6);j95z().owe[v.id]=(j95z().owe[v.id]||0)+1;log(`Nhận ${n} lượng bạc của ${v.name}, hứa giữ kín.`)}
/* port 16/11 (owner 11/15 07:15Z): every option shows its whole Tốn / Được / Mất and the odds word, split by " · " for the kit rows (jmen format) */
function j95accO(v,to){const pr=evG(S,v);const q=queenP();return to==="emp"?cl(20+pr*15+(S.sung||0)/5,5,90):S.rank>=7?cl(40+pr*15,5,95):cl(25+pr*15+(q?aff(q,S)/4:0),5,90)}
function j95catchOpts(v,m,s,out){const O=[];const q=queenP();const love=s.kind==="tryst";const pr=evG(S,v);
 const win=love?`nàng bị xét tội tư thông, ban chết${m?` · (${m.name} bị xử trảm)`:""} · Danh +4`:"nàng bị xét tội chuẩn bị mưu hại, cấm túc hay giáng phẩm · Danh +4";
 const lose=`bị coi là vu cáo: Danh -8 · ngươi bị cấm túc · nàng oán ngươi +25 · nàng quý ngươi -20`;const why=`(chứng cứ ngươi đang nắm về nàng: ${pr})`;
 if(q&&q!==S&&q!==v)O.push({n:"Tố giác lên Hoàng hậu",fx:{},x:`${word(j95accO(v,"hh"))} · tốn: 1 khắc · thành: ${win} · hỏng: ${lose} · ${why}`,go:()=>j95accuse(v,m,s,"hh")});
 if(S.rank>=7)O.push({n:"Xử tội theo luật cung",fx:{},x:`${word(j95accO(v,"hh"))} · tốn: 1 khắc · thành: ${win} · hỏng: ${lose} · ${why}`,go:()=>j95accuse(v,m,s,"hh")});
 O.push({n:"Tố giác lên Hoàng thượng",fx:{},x:`${word(j95accO(v,"emp"))} · tốn: 1 khắc · thành: ${win} · hỏng: ${lose.replace("bị cấm túc","bị cấm túc hay giáng phẩm")} · ${why} · (Sủng càng cao Hoàng thượng càng tin)`,go:()=>j95accuse(v,m,s,"emp")});
 O.push({n:"Giữ làm con bài khống chế",fx:{},x:`Nắm chắc · thành: chứng cứ về nàng +1 · giữ kín, chờ lúc dùng`,go:()=>j95hold(v)});
 const risk=(v.malice||0)>=70?25:0;
 O.push({n:"Lặng im, đổi lấy ân tình",fx:{},x:`${word(100-risk)} · tốn: 1 khắc (gặp riêng nàng) · thành: nàng quý ngươi +12 · nàng bớt oán ngươi 10 · nàng nợ ngươi một ân tình${risk?" · hỏng: nàng vẫn coi ngươi là mối nguy, oán ngươi +15":""}`,go:()=>j95silent(v)});
 O.push({n:"Giả như không thấy",fx:{},x:"Nắm chắc · thành: không dính vào chuyện",go:()=>log("Ngươi lặng lẽ quay đi như không thấy gì.")});return O}
function j95accuse(v,m,s,to){if(typeof can==="function"&&can(1))spend(1);const pr=evG(S,v);const q=queenP();
 const o=j95accO(v,to);
 if(j95dice(o)){evA(S,v,-99);apply({danh:4});const what=s.kind==="tryst"?`tư thông${m?" với "+m.name:""}`:"chuẩn bị mưu hại";log(`<span class="r">${v.name} bị xét tội ${what}.</span>`);
  if(s.kind==="tryst"){if(m){m.alive=false;v.affair=null;log(`<span class="r">${m.name} bị xử trảm.</span>`)}deathSentence(v,`tư thông${m?" với "+m.name:""}`)}else punish(v,"chuẩn bị mưu hại",2);
  Q.push({t:"Tố giác",who:pv(v),h:`<p>Chứng cứ đủ, ${v.name} bị xét tội ${what}.</p><p class="g">Danh +4</p>`})}
 else{apply({danh:-BAL.tw.g.accFail[0]});oanAdd(v,S,BAL.tw.g.accFail[1]);affAdd(v,S,-BAL.tw.g.accFail[2]);punish(S,"vu cáo phi tần không đủ chứng cứ",to==="emp"?2:1);Q.push({t:"Tố giác",who:pv(v),h:`<p>${to==="emp"?"Hoàng thượng":"Hoàng hậu"} cho rằng chứng cứ chưa đủ, ngươi bị coi là vu cáo.</p><p class="r">Danh -8 · ${v.name} oán ngươi +25</p>`})}
 showModal()}
function j95hold(v){const z=j95z();z.hold[v.id]=wk();j95ctx({how:"Ngươi giữ kín chuyện tận mắt thấy làm con bài",proves:`${v.name} có chuyện kín bị ngươi bắt gặp`},()=>evA(S,v,1));log(`Ngươi giữ kín chuyện của ${v.name}, chờ lúc dùng.`)}
function j95silent(v){if(typeof can==="function"&&can(1))spend(1);const z=j95z();
 if((v.malice||0)>=70&&j95dice(25)&&motiveOK(v,S,"harm").ok){oanAdd(v,S,15);noteAdd(v.id,"nhận lời hứa im lặng nhưng vẫn coi ngươi là mối nguy");log(`${v.name} gật đầu, ánh mắt lạnh tanh.`);return}
 relAdd(v,S,12);oanAdd(v,S,-10);z.owe[v.id]=(z.owe[v.id]||0)+1;log(`${v.name} nợ ngươi một ân tình vì giữ kín chuyện.`)}
/* two-way: NPCs present where she meets her lover may catch HER, same odds, same choices (decided by their real feelings) */
function j95npcCatch(m){const R=S.roster;if(!R)return;const kh=j95kh();const k=S.place;
 for(const v of liveRivals(true)){const e=R.P["v"+v.id];if(!e||e[kh][0]!==k)continue;const out=j95catchRoll(v,S);if(out==="flee"){if(j95dice(35))evA(v,S,1);continue}
  if(out==="one"){evA(v,S,1);continue}evA(v,S,2);v.j95saw={w:wk(),m:m.id};
  if(out==="rev")Q.push({t:"Có người thấy",who:pv(v),h:`<p>Lúc trở ra, ngươi thấy bóng ${v.name} khuất sau cửa. Nàng đã thấy ngươi đi cùng ${m.name}.</p>`});
  const hard=motiveOK(v,S,"expose");
  if(hard.ok&&hostility(v,S)>=40&&evG(v,S)>=2&&j95dice(40)){const o=cl(25+evG(v,S)*15,5,90);if(j95dice(o)){affairExposed(m,`${v.name} tố giác:`);return}/* two-way law: a failed accusation costs the accuser what it costs her (Danh -8, resentment +25, regard -20, punishment) */ap(v,{danh:-BAL.tw.g.accFail[0]});oanAdd(S,v,BAL.tw.g.accFail[1]);affAdd(S,v,-BAL.tw.g.accFail[2]);punish(v,"vu cáo người khác tư thông",1)}
  else if(aff(v,S)>=20){j95z().owe["by:"+v.id]=wk()}}}

/* ---------------- 8. DATA FOR THE KIT: habits she knows ---------------- */
function habitsKnown(p){if(!S||!p||p===S)return[];const z=j95z();const O=z.obs[p.id]||{};const R=[];
 for(const key in O){const o=O[key];if(o.n<2&&!o.told)continue;const [c,k]=key.split(":");const old=wk()-o.w>8;
  R.push({buoi:J95.B4[+c],slot:+c,place:k,placeName:j95pn(k),seen:o.n,by:o.by,week:o.w,old,txt:`${o.told?"Nghe nói":"Thường thấy"} nàng ở ${j95pn(k)} ${j95bl(+c)}${old?` (tin cũ, lần cuối ${wk()-o.w} tuần trước)`:""}`})}
 return R.sort((a,b)=>b.seen-a.seen).slice(0,4)}
function j95mapSigns(){const R=S&&S.roster;if(!R)return{};const kh=j95kh(),z=j95z(),out={};const T="hai bóng người đứng sát nhau trong chỗ khuất";for(const s of z.sec){if(s.key===R.key&&s.kh.includes(kh))out[s.k]=T}for(const k in j95menSigns())out[k]=T;return out}
/* her own habits. told = her tai mắt have told her that an enemy knows this spot (j78 fact "stalk"); watchers = how many such enemies she
   was told of (never the hidden number): the kit shows a row only when told */
function j95habitsMine(){const z=j95z();return Object.entries(z.me).filter(x=>x[1]>=2.5).map(([k,n])=>{const [c,p]=k.split(":");const W=Object.entries(z.meK).filter(([id,m])=>m.k===p&&m.c===+c&&m.told);
  return{buoi:J95.B4[+c],place:p,placeName:j95pn(p),n:+n.toFixed(1),told:W.length>0,watchers:W.length}})}
/* who is following p right now (cung nữ thân tín / kẻ hầu with "theo hầu" in the record at the current khắc): [{id,name,role}] */
function j95followers(p){try{const R=S&&S.roster;if(!R||R.key!==j95key()||!p)return[];const pid=p===S?"me":p.rel!=null?"v"+p.id:null;if(!pid)return[];const kh=j95kh();
  return Object.keys(R.P).filter(id=>{const e=R.P[id][kh];return e&&e[1]==="follow"&&e[2]===pid}).map(id=>({id,name:(R.who[id]||[id])[0],role:(R.who[id]||["",""])[1]}))}catch(e){return[]}}

/* ---------------- 9. LOG (this week + 4 before) and the dev table ---------------- */
function j95log(R){try{const L=S.rlog=S.rlog||{e:{},who:{}};const ids=Object.keys(R.P);const D={P:[],A:[],T:[],W:[]};const ix=(arr,x)=>{x=x==null?"":String(x);let i=arr.indexOf(x);if(i<0){arr.push(x);i=arr.length-1}return i.toString(36).padStart(2,"0")};
 const s=ids.map(id=>{const q=R.P[id].map(e=>ix(D.P,e[0])+ix(D.A,ACT95[e[1]]||e[1])+ix(D.T,e[2])+ix(D.W,e[3]));return q.every(x=>x===q[0])?q[0]:q.join("")});
 const pn={};for(const k of D.P)if(k)pn[k]=j95pn(k);for(const id of ids)L.who[id]=R.who[id]||L.who[id]||[id,""];
 L.e[R.key]={wk:R.wk,b:R.b,nb:R.nb,ids,s,D,pn,m:(R.m||[]).map(o=>o?Object.entries(o).map(x=>x.join(":")).join(","):""),acts:(R.acts||[]).slice(-40),ev:R.ev||[]};
 for(const k in L.e)if(L.e[k].wk<R.wk-J95.LOGW)delete L.e[k];const keep={};for(const k in L.e)for(const id of L.e[k].ids)keep[id]=1;for(const id in L.who)if(!keep[id])delete L.who[id]}catch(e){}}
function j95table(t,b,kh){/* the dev table (also used by dev/tools/roster.js logic) */const R=S.roster;const cur=t==null||(R&&R.wk===t&&R.b===(b==null?R.b:b));
 if(cur&&R){kh=kh==null?j95kh():kh;const rows=Object.keys(R.P).map(id=>{const e=R.P[id][kh];return{id,name:(R.who[id]||[id])[0],role:(R.who[id]||["",""])[1],place:e[0],placeName:j95pn(e[0]),act:ACT95[e[1]]||e[1],tgt:e[2]?((R.who[e[2]]||[e[2]])[0]):"",why:e[3]||""}});return j95check(rows,R.m&&R.m[kh],{wk:R.wk,b:R.b,kh})}
 const L=S.rlog&&S.rlog.e&&S.rlog.e[t+"-"+(b||0)];if(!L)return{error:"không có sổ cho thời điểm này"};kh=kh||0;
 const rows=L.ids.map((id,i)=>{const q=L.s[i].length===8?L.s[i]:L.s[i].slice(kh*8,kh*8+8);const g=j=>parseInt(q.slice(j*2,j*2+2),36);const P=L.D.P[g(0)],T=L.D.T[g(2)];return{id,name:(S.rlog.who[id]||[id])[0],role:(S.rlog.who[id]||["",""])[1],place:P,placeName:L.pn[P]||P,act:L.D.A[g(1)],tgt:T?((S.rlog.who[T]||[T])[0]):"",why:L.D.W[g(3)]}});
 const m={};(L.m[kh]||"").split(",").filter(Boolean).forEach(x=>{const [k,n]=x.split(":");m[k]=+n});return j95check(rows,L.m[kh]?m:null,{wk:t,b,kh})}
function j95check(rows,map,at){const ids=new Set(),dup=[],miss=[];for(const r of rows){if(ids.has(r.id))dup.push(r.id);ids.add(r.id);if(!r.place)miss.push(r.id)}
 const C={};for(const r of rows)if(r.place&&(r.vis==null?j95vis(r.id,r.place):r.vis))C[r.place]=(C[r.place]||0)+1;const mm=[];if(map)for(const k of new Set(Object.keys(C).concat(Object.keys(map))))if((C[k]||0)!==(map[k]||0))mm.push(`${k}: sổ ${C[k]||0}, bản đồ ${map[k]||0}`);
 return{at,total:rows.length,rows,dup,miss,mapMismatch:mm,ok:!dup.length&&!miss.length&&!mm.length}}
window.__roster=function(t,b,kh){try{const r=j95table(t,b,kh);if(r.rows&&typeof console!=="undefined"&&console.table)console.table(r.rows.map(x=>({Tên:x.name,Chức:x.role,Nơi:x.placeName,Việc:x.act,"Đối tượng":x.tgt,"Lý do":x.why})));return r}catch(e){return{error:String(e)}}};

/* a man's line from jmen's decision (S.menWhy[id] = {w: duty|summons|order|visit|fest|stray, r, v, why}) */
Object.assign(ACT95,{letter:"nhận thư lén",linger:"nán lại quá giờ",admire:"tìm cách gặp mặt",feast:"dự yến lễ tết"});
function j95menAct(m,k,y){const rw=m.rw;const V=y&&y.v!=null?RV(y.v):null;const vt=V?"v"+V.id:null;const vn=V?V.name:"";
 if(y&&y.w==="stray"){if(y.r==="tryst")return[k,"tryst",vt,`tư tình với ${vn||"một phi tần"}`];if(y.r==="letter")return[k,"letter",vt,`được ${vn||"một phi tần"} mua chuộc đưa thư ra ngoài`];
  if(y.r==="overstay")return[k,"linger",vt,`có lệnh làm việc ở cung ${vn||"phi tần"} nhưng nán lại`];if(y.r==="seek")return[k,"admire",y.likeV!=null&&RV(y.likeV)?"v"+y.likeV:null,"mến dung nhan một phi tần, tìm cách được thấy mặt"];return[k,"go",null,"lẻn vào hậu cung"]}
 if(y&&y.w==="summons")return[k,"heal",vt,`được truyền đến bắt mạch${vn?" cho "+vn:""}`];
 if(y&&y.w==="order")return[k,rw==="nhạc sư"?"music":"paint",null,"có lệnh Nội vụ phủ đến làm việc"];
 if(y&&y.w==="fest")return[k,"feast",null,"dự yến lễ tết"];
 if(y&&y.w==="visit")return[k,"visit","th","vào thỉnh an Thái hậu"];
 const a=rw==="thái y"?"heal":rw==="thị vệ"?"guard":rw==="sứ thần"&&k==="thu"?"audience":"walk";return[k,a,null,y&&y.w==="duty"?"đến phiên trực":"nơi hắn hay lui tới"]}
/* jmen's planned meetings with a consort this buổi, for the map's "two shadows" sign (anonymous) */
function j95menSigns(){const out={};if(!j95men())return out;const MY=S.menWhy||{};for(const id in MY){const y=MY[id];if(y&&y.w==="stray"&&y.r==="tryst"&&y.v!=null&&(S.menW||{})[id]===y.k)out[y.k]=1}return out}
/* ---------------- 10. WIRING ---------------- */
(function(){
 /* inside the old placeWhere, right after its dice: the record replaces the dice, then the old encounter roll runs on it */
 const ne0=npcEncounters;npcEncounters=function(){if(!j95on())return ne0.apply(this,arguments);try{const R=j95plan();const W=j95view(R,0);S.where=W;R.__w0=JSON.stringify(W)}catch(e){j95err("wrap",e)}return ne0.apply(this,arguments)};
 /* outermost placeWhere: take in what the old wrappers decided (invitations, visits, access, the men), then trysts, then views */
 const pw0=placeWhere;placeWhere=function(){const prev=S&&S.roster;if(j95on()&&prev&&prev.key!==j95key())j95log(prev);const r=pw0.apply(this,arguments);if(!j95on())return r;
  try{const R=S.roster&&S.roster.key===j95key()?S.roster:j95plan();const W0=R.__w0?JSON.parse(R.__w0):{};const W=S.where||{};
   const jm=j95men(),MY=jm?(S.menWhy||{}):{},comp={};for(const id in MY){const y=MY[id];if(y&&y.w==="stray"&&y.v!=null&&(S.menW||{})[id]===y.k)comp[y.v]={id,y}}
   for(const v of rivals){if(!v.alive)continue;const id="v"+v.id;const k=W[v.id];if(k&&k!==W0[v.id]&&R.P[id]){const cm=comp[v.id],mn=cm&&manById(cm.id);
     if(cm&&k===cm.y.k){const a=cm.y.r==="tryst"?"tryst":cm.y.r==="letter"?"letter":"here";for(let i=0;i<4;i++)R.P[id][i]=[k,a,cm.id,cm.y.r==="tryst"?`tư tình với ${mn?mn.name:"một nam nhân"}`:cm.y.r==="letter"?"lén gửi thư ra ngoài cung":`${mn?mn.name:"một nam nhân"} nán lại cung nàng`];continue}
     const why=k==="home"?"được mời / sang thăm cung ngươi":k===palaceOf(v)?"không được vào chỗ định đến, quay về":"đổi chỗ theo lệ";for(let i=0;i<4;i++)R.P[id][i]=[k,k==="home"?"visit":"back",k==="home"?"me":null,why]}}
   for(const m of S.men||[]){if(!m.alive)continue;const k=(S.menW||{})[m.id];if(k){R.who[m.id]=[m.name,m.role];const y=MY[m.id]||{};const ae=j95menAct(m,k,y);R.P[m.id]=[0,1,2,3].map(()=>ae.slice())}}
   for(const m of S.men||[]){if(!m.alive||(S.menW||{})[m.id]||(!jm&&(m.rw==="thái y"||m.rw==="thị vệ")))continue;if(!j95z().sec.some(x=>x.b===m.id&&x.wk===wk()&&x.c===R.c))delete R.P[m.id]}
   for(const id in R.P)if(id.indexOf("q:")===0)delete R.P[id];/* officials: re-read from this buổi's S.minW by j95sync */
   delete R.__w0;j95secApply(R);j95sync(true,true)}catch(e){j95err("wrap",e)}return r};
 const sp0=spend;spend=function(){const r=sp0.apply(this,arguments);try{if(j95on()&&S.roster)j95sync()}catch(e){j95err("spend",e)}return r};
 /* anything that can add, kill, banish or move someone resyncs the record after it */
 for(const n of ["endTurn","nextBuoi","runAct","chooseM","closeModal","doAct","talk","empAct","monthTick"]){if(typeof window[n]!=="function")continue;const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{if(j95on()&&S&&!S.dead&&S.roster)j95sync()}catch(e){j95err(n,e)}return r}}
 /* whereOf reads the record at the current khắc (S.where is only a view and can lag a restored khắc count) */
 const wo0=whereOf;whereOf=function(p){try{if(j95on()&&p&&p!==S&&p.rel!=null&&S.roster&&S.roster.key===j95key()){const e=S.roster.P["v"+p.id];if(e)return e[j95kh()][0]}}catch(e){}return wo0.apply(this,arguments)};
 const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(j95on()&&S&&!S.dead){if(S.place===k&&k&&k!=="home"&&k!==palaceOf(S)){const z=j95z();const key=j95c()+":"+k;const bk=j95key();if(z.meLast!==bk+key){z.meLast=bk+key;z.me[key]=(z.me[key]||0)+1}}
   if(S.roster){j95sync(true);if(S.visit){const n0=S.visit.people&&S.visit.people.length;j95dedupe(S.visit);if(S.visit.people&&S.visit.people.length!==n0)J95.stageCh=1}if(J95.stageCh&&S.visit&&S.visit.k===S.place)render()}}}catch(e){j95err("wrap",e)}return r};
 const c0=countAt;countAt=function(k){if(!j95on()||!S.roster||S.roster.key!==j95key())return c0.apply(this,arguments);const R=S.roster,kh=j95arrKh(k);let n=0;for(const id in R.P)if(R.P[id][kh][0]===k&&j95vis(id,k))n++;/* jact (loaded later) adds its Nội vụ phủ eunuch +1 on top: the record counts him itself (r1) */if(k==="nvp"&&typeof adSrv==="function")n--;return n};
 const p0=places;places=function(){const L=p0.apply(this,arguments);try{if(j95on()){const sg=j95mapSigns();for(const x of L)if(sg[x.k]&&!(x.d||"").includes(sg[x.k]))x.d=(x.d||"")+` Có ${sg[x.k]}.`}}catch(e){}return L};
 if(typeof tryst==="function"){const t0=tryst;tryst=function(m,risk){const r=t0.apply(this,arguments);try{/* jmen catches her talking with a man in the hậu cung (its talk wrapper) */if(j95on()&&!j95men()&&!S.dead&&!S.out&&m&&m.alive)j95npcCatch(m)}catch(e){}return r}}
 /* the motive gate on every NPC act aimed at someone */
 /* j83 handmade works (wkNpcUse): an NPC giving a work to someone, or poisoning a dish, is an act aimed at someone too (whole family with runAct) */
 for(const [n,k] of [["wkGive","gift"],["wkPoison","poison"]]){if(typeof window[n]!=="function")continue;const o=window[n];window[n]=function(a,t){if(!j95gate()||!a||a===S||!t||typeof t!=="object"||t===a||!(t===S||t.rel!=null))return o.apply(this,arguments);const g=motiveOK(a,t,k);j95actLog(a,t,k,g);if(!g.ok)return"";return o.apply(this,arguments)}}
 /* jplx x jstaff overlap (main 16/11): the servants' rest list (Dãy nhà cung nhân) could pick a named elder whom jstaff draws at her post at
    the same time, and at night her trusted maid while the home stage draws her too; one person, one place: an elder stays at her post,
    the trusted maid with her mistress (the record puts them there), never in the rest list */
 if(typeof plxTgk==="function"){const pt0=plxTgk;plxTgk=function(){const L=pt0.apply(this,arguments);try{if(!j95on()||!Array.isArray(L))return L;const E=new Set(allServ().filter(s=>s&&s.eid).map(s=>s.sid));return L.filter(q=>!(q&&q.sid!=null&&E.has(q.sid)))}catch(e){return L}}}/* same for the punished list at Tân Giả khố */
 if(typeof plxServants==="function"){const ps0=plxServants;plxServants=function(){const L=ps0.apply(this,arguments);try{if(!j95on()||!Array.isArray(L))return L;const E=new Set(allServ().filter(s=>s&&s.eid).map(s=>s.sid));let T=new Set();try{if(typeof plxTgk==="function")T=new Set(plxTgk().map(q=>q&&q.sid).filter(x=>x!=null))}catch(e){}/* a maid punished at Tân Giả khố is not resting at the same time */return L.filter(q=>!(q&&q.sid!=null&&(E.has(q.sid)||T.has(q.sid)))&&!(q&&q.kind==="maid"))/* her trusted maid stays at her side (the home stage draws her) */}catch(e){return L}}}
 const ra0=runAct;runAct=function(a,t,k){if(!j95gate()||!a||a===S||!t||!(H95.has(k)||F95.has(k)))return ra0.apply(this,arguments);const g=motiveOK(a,t,k);j95actLog(a,t,k,g);if(!g.ok)return"";return ra0.apply(this,arguments)};
 if(typeof newPlot70==="function"){const np0=newPlot70;newPlot70=function(a,t){if(j95gate()&&a&&a!==S&&t){const g=motiveOK(a,t,"plot");j95actLog(a,t,"plot",g);if(!g.ok)return null}return np0.apply(this,arguments)}}
 /* j24 "người tìm đến": the visitor passes the same gate, and the visit is in the record (she is in your palace that khắc) */
 if(typeof approachOne==="function"){const ao=approachOne;approachOne=function(){for(let n=0;n<4;n++){const m=ao.apply(this,arguments);if(!m||!j95gate())return m;
   const txt=String(m.h||"");const v=liveRivals(true).find(x=>txt.includes(x.name));if(!v)return m;const hostile=/mỉa mai|gây sự|hạch/.test(txt);const g=motiveOK(v,S,hostile?"provoke":"visit");j95actLog(v,S,hostile?"provoke":"visit",g);
   if(!g.ok)continue;try{const R=S.roster;if(R&&R.key===j95key()&&R.P["v"+v.id]&&!v.confined&&!S.out){const kh=j95kh();R.P["v"+v.id][kh]=["home",hostile?"provoke":"visit","me",g.why||"sang thăm"];j95sync()}}catch(e){j95err("approach",e)}return m}return null}}
 /* tai mắt can tell a habit (true), and when an enemy has learnt hers */
 if(typeof j78facts==="function"){const f0=j78facts;j78facts=function(v){const F=f0.apply(this,arguments);try{if(j95on()&&v&&v!==S){const z=j95z();const H=j95hab(v).map(h=>[h,j95res(v,h.k)]).filter(x=>x[1]);const cs=j95cs();
   if(H.length){const [h,k]=H[Math.floor(Math.random()*H.length)];const c=cs.slice().sort((a,b)=>h.s[b]-h.s[a])[0];const W=j78who(v);
    F.push({k:"habit:"+c+":"+k,kind:"habit",pri:30,txt:`${W} hay ${ACT95[h.a]} ở ${j95pn(k)} ${j95bl(c)}.`,go:()=>{const O=z.obs[v.id]=z.obs[v.id]||{};const o=O[c+":"+k]=O[c+":"+k]||{n:0,w:wk()};o.told=1;o.w=wk();o.by="Tai mắt";return ""}})}
   const mk=z.meK[v.id];if(mk)F.push({k:"stalk",kind:"secret",pri:60,txt:`${j78who(v)} đã dò ra ngươi hay đến ${j95pn(mk.k)} ${j95bl(mk.c)}, cho người rình ở đó.`,go:()=>{mk.told=wk();return ""}})}}catch(e){}return F}}
 if(typeof seeLoc==="function"){const s0=seeLoc;seeLoc=function(v,k){const r=s0.apply(this,arguments);try{if(j95on()&&v&&v!==S&&v.rel!=null)j95obs(v,j95c(),k||whereOf(v),"Tai mắt")}catch(e){}return r}}
 /* her palace: visitors the record puts there are on the home stage too, so the map count of "home" (homePeople, j59) = the record (port 16/11) */
 if(typeof homePeople==="function"){const hp0=homePeople;homePeople=function(){const P=hp0.apply(this,arguments);try{if(j95on()&&!S.dead&&!S.out&&!(typeof isSrv==="function"&&isSrv())&&S.roster&&S.roster.key===j95key()&&Array.isArray(P)){const kh=j95kh();
   for(const v of liveRivals(true)){if(v===S)continue;const e=S.roster.P["v"+v.id];if(!e||e[kh][0]!=="home"||sameHouse(S,v)||P.some(p=>p.ref===v))continue;P.push(v.queen&&qOn()?{...rp(v),kind:"hh",name:`Hoàng hậu ${v.name}`,ini:"鳳"}:rp(v))}}}catch(e){j95err("home",e)}return P}}
 /* her palace while she is away: j59 counts "home" from homePeople() (the stage she would see on coming back); her maid may be out with her,
    so while she is not at home the record answers (registered after j59's own late wrap, so it is the outer one) */
 setTimeout(()=>{try{const c1=countAt;countAt=function(k){try{if(k==="home"&&j95on()&&S&&!S.dead&&S.place!=="home"&&!S.out&&!(typeof isSrv==="function"&&isSrv())&&S.roster&&S.roster.key===j95key()){const R=S.roster,kh=j95kh();let n=0;for(const id in R.P)if(R.P[id][kh][0]==="home"&&j95vis(id,"home"))n++;return n}}catch(e){}/* maid road: j59srvCount reads srvWhere, which then answers at the arrival khắc */const p=J95.arrK;const W=S&&S.where,oe=W&&W.emp;try{J95.arrK=j95on()&&k!==S.place&&typeof isSrv==="function"&&isSrv()&&S.roster&&S.roster.key===j95key()?j95arrKh(k):null;if(J95.arrK!=null&&W&&S.roster.P.emp)W.emp=S.roster.P.emp[J95.arrK][0];let n=c1.apply(this,arguments);
   /* maid road: the named staff jstaff draws on the stage (j59srvCount does not know them; main 16/11 stage-counts showed the gap) */
   if(typeof isSrv==="function"&&isSrv()&&k!=="home"&&k!==S.place&&typeof elderBy==="function"){if((k==="tn"&&!S.thDead||k==="tgk")&&elderBy("tn"))n++;if(k==="kn"&&elderBy("kn"))n++}return n}finally{J95.arrK=p;if(W)W.emp=oe}}}catch(e){}},0);
 /* maid road (j42): srvWhere sent a consort standing somewhere not on the maid's own map back to her palace, so the maid met her at home while
    the record had her elsewhere; with the record current it answers exactly (her mistress's palace = the maid's "home") (port 16/11) */
 if(typeof srvWhere==="function"){const sw0=srvWhere;srvWhere=function(v){try{if(j95on()&&v&&v.rel!=null&&typeof isSrv==="function"&&isSrv()&&S.roster&&S.roster.key===j95key()){const e=S.roster.P["v"+v.id];
   if(e){const w=e[J95.arrK!=null?J95.arrK:j95kh()][0];if(w==="home"){const m=srvM();return m?palaceOf(m):palaceOf(v)}if(w&&w!==J95OUT_)return w}}}catch(e){}return sw0.apply(this,arguments)}}
 /* old saves / a fresh life: build the record on the first render */
 const r0=render;render=function(){try{if(j95on()&&!S.dead&&S.where&&(!S.roster||S.roster.key!==j95key()||S.roster.kh!==j95kh()))j95sync(false,true)}catch(e){}return r0.apply(this,arguments)};
})();

/* ===== r2 (16/11): ONE final reconcile, outermost (OD:L34 map = stage = record). Main modules loaded after j95 (jact, jhouse, jkc, jtds,
   jwkpics) and older ones (jstaff addStage, j22 men) add people to the stage on their own paths; instead of chasing each path, the last
   wrapper of renderStage (every stage draw) and of homePeople (her room stage AND the map number of her room, j59) makes the stage follow
   the record. Installed with setTimeout 0 like j59's outermost countAt, so it wraps every module whatever the load order. ===== */
function j95elderEntry(st){try{return{kind:"elder",ref:st,eid:st.eid,name:st.call,ini:String(st.call).split(" ")[0],col:(typeof staffFace==="function"?staffFace(st).col:"#9a8a7a"),info:typeof elderOffice==="function"?elderOffice(st):""}}catch(e){return null}}
/* the named elders (jstaff) on a stage follow the record: drop one the record puts elsewhere now, add one it puts here (visible) */
function j95elderFix(L,k,R,kh){let ch=false;if(!Array.isArray(L)||!R||!J95.eld)return false;
 for(let i=L.length-1;i>=0;i--){const p=L[i];if(!p||p.kind!=="elder"||!p.ref||p.ref.sid==null)continue;const id="s"+p.ref.sid,e=R.P[id];if(e&&e[kh]&&(e[kh][0]!==k||!j95vis(id,k))){L.splice(i,1);ch=true}}
 for(const id in J95.eld){const e=R.P[id];if(!e||!e[kh]||e[kh][0]!==k||!j95vis(id,k))continue;if(L.some(p=>p&&p.kind==="elder"&&p.ref&&"s"+p.ref.sid===id))continue;
  const st=typeof elderBy==="function"?elderBy(J95.eld[id]):null;if(!st||"s"+st.sid!==id)continue;const q=j95elderEntry(st);if(q){L.push(q);ch=true}}
 return ch}
function j95final(){try{if(!j95on()||!S||S.dead||!S.roster||S.roster.key!==j95key())return false;/* a trip outside the palace (jkc) has its own stage */if(typeof isKc==="function"&&isKc())return false;const V=S.visit;if(!V||!V.people||V.k!==S.place)return false;
 const R=S.roster,kh=j95kh();let ch=false;try{ch=!!j95stage(R,kh)}catch(e){j95err("final",e)}
 if(!(typeof isSrv==="function"&&isSrv())){if(j95elderFix(V.people,S.place,R,kh)){ch=true;popIdx=null}}
 const n0=V.people.length;j95dedupe(V);if(V.people.length!==n0)ch=true;return ch}catch(e){j95err("final",e);return false}}
setTimeout(()=>{try{
 if(typeof renderStage==="function"){const rs0=renderStage;renderStage=function(){j95final();return rs0.apply(this,arguments)}}
 /* the data paths too (the stage list is state: saved, read by the map count and the bots, which draw nothing): after every arrival, khắc,
    buổi or lãnh cung visit the stage list = the record; redraw only if it changed */
 for(const n of ["goTo","spend","nextBuoi","endTurn","coldVisit","talk","closeModal","chooseM"]){if(typeof window[n]!=="function")continue;const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{if(j95final()&&typeof renderStage==="function")renderStage()}catch(e){j95err("final:"+n,e)}return r}}
 if(typeof homePeople==="function"){const hp0=homePeople;homePeople=function(){const L=hp0.apply(this,arguments);try{if(j95on()&&S&&!S.dead&&S.roster&&S.roster.key===j95key()&&!(typeof isSrv==="function"&&isSrv())&&Array.isArray(L))j95elderFix(L,"home",S.roster,j95kh())}catch(e){j95err("home",e)}return L}}
}catch(e){j95err("finalwrap",e)}},0);
