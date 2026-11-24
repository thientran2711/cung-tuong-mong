/* ================= jkc3: HOME CHAPTERS (GAP OR03 OR04 OR05 OR07 OR10; plan dev/OUTSIDE_PLAN.md §5, §6, §8, §9) =================
   New home lives (S.kc.c3, set in kcInit for the six khuê các origins tt dtq muoi thd ch td; jkc2 roads (S.kc.kd) and old saves untouched):
   - the origin chapter is a real j67-format arc (opener → 1–3 complications → turn → climax → 3 endings: win / mid / lose), the old three
     fixed beats (jkc KCOB) stay only for old saves. Shared home chapters kc_ke «Kế mẫu» or kc_hon «Hôn sự», tm96z «Thuở thanh mai»
     (its end writes S.tm96.endZ, read by tm96a in the palace), kc_tt3 «Tuyển tú» (the Sơ / Phúc / Điện tuyển round of jkc, told as the last
     chapter). Plan per life: origin arc + kc_ke|kc_hon + tm96z (when she has a thanh mai) + kc_tt3.
   - every ending seeds the palace story: S.kc.seed3 = {id, sc}: at entry the seeded arc becomes the life's first palace road (jst14
     S.st.f14.road / the chapter pool head) and starts with Lợi thế +sc.
   - roster: nhũ mẫu, 5 teachers (favour → tiers), bà mối, every suitor house = a real person (S.kc.fam, faces from the existing pools).
   - home events E9 (mother dying, a real keepsake item), E15 (the groom's mother inspects her), E28 (father impeached, clan power moves).
   - early roads: «Thái hậu triệu» (ch, from the kc_ch ending) and E29 vi hành → a direct Thường tại entry (choice: enter now or wait).
   Numbers: BAL.kc3 (jbal2.js) + BAL.kc3.fx (jbalkc3.js: option / ending numbers, same format as BAL.arc.fx, filled by j67 arcBeats / arcOpt). */
const KCA={};
function kc3On(){try{return !!(S&&S.kc&&S.kc.c3&&!S.kc.kd&&!S.kc.inPal)}catch(e){return false}}
function kc3Reg(id,def){for(const ek in def.E||{})if(def.E[ek].k==null)def.E[ek].k=BAL.kc3.tier[ek];const F=BAL.kc3.fx[id];if(F){const{E,...B}=F;arcBeats(B,def.B);if(E)for(const ek in E)if(def.E&&def.E[ek])arcOpt(E[ek],def.E[ek])}KCA[id]=def;return def}
/* ---------- tokens, speakers ---------- */
function kc3P(r){try{return kcR(r)}catch(e){return null}}
function kc3N(r,full){const m=kc3P(r);if(!m)return"";return full?m.name:String(m.name).split(" ").slice(-2).join(" ")}
const KC3TOK={chaN:()=>kc3N("cha",1),meN:()=>kc3N("me",1),diT:()=>{const d=kc3P("di");return d?d.t:"Di nương"},diN:()=>kc3N("di",1),muoiN:()=>kc3N("muoi"),huynhN:()=>kc3N("huynh"),
 toN:()=>kc3N("to",1),nmN:()=>kc3N("nm",1),baN:()=>kc3N("ba",1),tyN:()=>S.maid?S.maid.name:"tỳ nữ",tmN:()=>{const m=kcTmMan();return m?m.name:"người ấy"},
 tmTok:()=>(TM96V[S.tm96&&S.tm96.k]||{}).tok||"tín vật",suitN:()=>{const s=S.kc.suit[0];return s?s.n:"một nhà quyền quý"},dadT:()=>KCDAD[S.origin.k][0],house:()=>KCDAD[S.origin.k][1]};
function kc3Fill(s,A){return String(s||"").replace(/\{(\w+)\}/g,(m,k)=>{try{return KC3TOK[k]?KC3TOK[k](A):m}catch(e){return""}}).replace(/\{diT\}/g,"Di nương")}
function kc3Low(s){return s?s[0].toLowerCase()+s.slice(1):s}
function kc3Who(w){try{if(w==="tm"){const m=kcTmMan();return m?pMan(m):pMe()}if(w==="emp")return pEmp();if(w==="th")return pTH();if(w==="ty")return pMaid();if(w==="me0")return pMe();
 const m=kc3P(w);return m?kcFace(m):pMe()}catch(e){return pMe()}}
function kc3Af(r,n){const m=kc3P(r);if(m&&n)kcAf(m,n);return m}
/* ---------- the plan of a life ---------- */
function kc3Plan(){const k=S.origin.k,P=["kc_"+k];const me=kc3P("me");P.push(!me||roll(BAL.kc3.plan.ke)?"kc_ke":"kc_hon");if(S.tm96&&kcTmMan())P.push("tm96z");return P}
function kc3Init(){S.kc.c3=1;kc3Roster();S.kc.ar={plan:kc3Plan(),i:0,A:null,done:[],due:(S.turn||0)+BAL.kc3.cal.o0};kcWhere()}
(function(){const i0=kcInit;kcInit=function(){const r=i0.apply(this,arguments);try{if(S&&S.kc&&!S.kc.kd&&kcOk(S.origin.k))kc3Init()}catch(e){console.error("kc3 init",e)}return r}})();
/* ---------- roster: real people (OUTSIDE_PLAN §5) ---------- */
const KC3THAY=[["cam","Cầm sư","mama",0],["thi","Nữ phu tử","mama",0],["hoa","Họa sư","man",1],["vu","Vũ sư","maid",0],["le","Ma ma xuất cung","mama",0]];
/* a face for every roster person (law 6b; review r1 item 2): the role's pool first, then the next existing pool of the same sex
   (BAL.kc3.ros.pool: mama → maid, man → official …; every pool has the four age bands, kcPor picks the band of her age), never a named
   palace person (BAL.kc3.ros.noFid: vương gia, thái y, Hoàng thượng, Thái hậu) */
function kc3Fid(role,pref){const P=BAL.kc3.ros,U=new Set(figUsed()),bad=k=>P.noFid.some(x=>k.startsWith(x));
 for(const r of P.pool[role]||[role]){const keys=Object.keys((FIGIX||{})[r]||{}).filter(k=>!U.has(k)&&!bad(k));if(!keys.length)continue;
  const k=(pref||[]).find(x=>keys.includes(x))||pick(keys);figUsed().push(k);return k}return""}
/* old r1 saves: a roster person who got no face (or a named palace face) then gets one now */
function kc3Role(m){if(m.role3)return m.role3;if(m.r==="nm"||m.r==="ba")return"mama";const t=/^thay(\d)$/.exec(m.r);if(t&&KC3THAY[+t[1]])return KC3THAY[+t[1]][2];return /^sx/.test(m.r)?"man":""}
function kc3Faces(){const bad=k=>BAL.kc3.ros.noFid.some(x=>String(k).startsWith(x));for(const m of S.kc.fam){const r=kc3Role(m);if(!m.alive||!r)continue;
 if(m.fid&&bad(m.fid)){const U=figUsed(),j=U.indexOf(m.fid);if(j>=0)U.splice(j,1);m.fid=""}if(!m.fid)m.fid=kc3Fid(r,kc3Pref(m.art))}}
function kc3Pref(art){return (BAL.kc3.ros.pref||{})[art]||[]}
function kc3Mk(r,t,name,age,role,tr,af,grp,pref){return{id:"f"+r,r,t,name,age,role3:role,fid:kc3Fid(role,pref),tr,af,me:BAL.kc3.ros.me[0]+R(BAL.kc3.ros.me[1]),oan:0,alive:1,grp}}
function kc3Roster(){const F=S.kc.fam,B=BAL.kc3.ros,used=()=>F;
 F.push(kc3Mk("nm","Nhũ mẫu",nmNew("mo",{more:F}),B.age.nm[0]+R(B.age.nm[1]),"mama",pick(["Ân cần","Kín đáo","Cương trực"]),B.nm[0]+R(B.nm[1])));
 F.push(kc3Mk("ba","Bà mối",`Bà mối ${nmSurOf(nmNew("mo",{more:F}))}`,B.age.ba[0]+R(B.age.ba[1]),"mama",pick(["Ba phải","Tham lam","Ân cần","Kín đáo"]),B.ba[0]+R(B.ba[1]),"soc"));
 KC3THAY.forEach(([art,t,role,man],i)=>{/* names from the one name core (jname.js nmNew, LIVE 1ecdfb9d; replaces the removed kcFreeName) */const name=man?nmNew("m",{more:used()}):art==="le"?`${nmSurOf(nmNew("mo",{more:used()}))} ma ma`:nmNew("f",{more:used()});
  const m=kc3Mk("thay"+i,t,name,B.age[art==="le"?"le":"thay"][0]+R(B.age[art==="le"?"le":"thay"][1]),role,pick(["Nghiêm khắc","Ân cần","Kiêu ngạo","Kín đáo"]),B.thay[0]+R(B.thay[1]),"thay",kc3Pref(art));m.art=art;F.push(m)})}
Object.assign(KCHAB,{nm:[["kc_khue",3],["kc_me",2],["kc_vuon",1]],ba:[["",5],["kc_sanh",1]]});
for(let i=0;i<KC3THAY.length;i++)KCHAB["thay"+i]=[["kc_hoc",3],["",2]];
(function(){const w0=kcWhere;kcWhere=function(){const r=w0.apply(this,arguments);try{if(S&&S.kc&&S.kc.c3){kc3Faces();for(const m of S.kc.fam){if(!m.alive)continue;
 if(/^sx/.test(m.r))delete S.kc.at[m.id];/* a suitor lives in his own house */
 if(m.r==="ba"&&S.kc.suit.length&&(S.buoi||0)!==3&&roll(BAL.kc3.ros.baSanh))S.kc.at[m.id]="kc_sanh"}}}catch(e){console.error("kc3 where",e)}return r}})();
/* the tabs: teachers under Tài nghệ, the bà mối and the suitors under Giao du, the rest stays Người nhà */
(function(){const l0=kcFamList;kcFamList=function(w){const L=l0.apply(this,arguments);return w==="nha"?L.filter(m=>!m.grp):L}})();
function kc3Grp(g){return S.kc.fam.filter(m=>m.alive&&m.grp===g)}
/* E25r2: the home roster strip sits INSIDE a scrolling tab (Tài nghệ / Giao du), not as a person tab: kept one level below #panel so the kit person-tab frame (KIT §6.3c #panel.kpfr, LIVE 21/11) does not take the whole panel and squeeze the strip to 0 px */
function kc3Pager(key,L){return L.length?`<div class="kc3pgw"><div class="pgwrap">`+pager(key,L.map(m=>({sz:"xs",f:kcFace(m),name:m.t})),i=>kcFamCard(L[i]))+`</div></div>`:""}
(function(){const a0=kcArtHTML;kcArtHTML=function(){const h=a0.apply(this,arguments);if(!kc3On())return h;return kc3Pager("kcthay",kc3Grp("thay"))+h}})();
(function(){const s0=kcSocHTML;kcSocHTML=function(){const h=s0.apply(this,arguments);if(!kc3On())return h;return h+kc3Pager("kcsoc",kc3Grp("soc"))}})();
/* teacher favour → tier (0 học trò, 1 được quý, 2 truyền nhân); the tier speeds the lessons of her art (the base Tài nghệ games) */
function kc3Tier(m){const T=BAL.kc3.thay.t;return m.af>=T[1]?2:m.af>=T[0]?1:0}
const KC3TIERW=["học trò","học trò được quý","truyền nhân"];
function kc3Teach(art){return S.kc.fam.find(m=>m.alive&&m.grp==="thay"&&m.art===art)||null}
(function(){const a0=addArt;addArt=function(k,g){try{if(kc3On()){const m=kc3Teach(k);if(m)g=Math.round(g*BAL.kc3.thay.mul[kc3Tier(m)])}}catch(e){}return a0.call(this,k,g)}})();
/* suitors: the house that asks for her is a man who exists (his face, his age, his nature) */
(function(){const s0=kcSuitor;kcSuitor=function(x){const s=s0.apply(this,arguments);try{if(S&&S.kc&&S.kc.c3&&!s.pid){const n=S.kc.fam.filter(m=>/^sx/.test(m.r)).length;const A=BAL.kc3.ros.sxAge[s.k]||BAL.kc3.ros.sxAge.def;
 const sur=pick(SURN);const m=kc3Mk("sx"+n,s.n[0].toUpperCase()+s.n.slice(1),nmNew("m",{sur,more:S.kc.fam}),A[0]+R(A[1]),s.k==="lao"||s.k==="quan"?"official":"man",pick(["Phong lưu","Trung hậu","Kiêu ngạo","Cẩn trọng","Ham chơi"]),BAL.kc3.ros.sx[0]+R(BAL.kc3.ros.sx[1]),"soc");
 m.house=s.n;S.kc.fam.push(m);s.pid=m.id}}catch(e){console.error("kc3 suitor",e)}return s}})();
function kc3Sx(s){return s&&s.pid?S.kc.fam.find(m=>m.id===s.pid):null}
/* ---------- roster acts ---------- */
(function(){const c0=kcCards;kcCards=function(){const X=c0.apply(this,arguments);if(!kc3On())return X;try{kc3Acts(X)}catch(e){console.error("kc3 acts",e)}return X}})();
function kc3Acts(X){const B=BAL.kc3,nm=kc3P("nm"),ba=kc3P("ba"),di=kc3P("di");
 if(nm){X.push(kcNeed(kcCard({g:"fam",who:nm.id,n:"Nghe nhũ mẫu kể chuyện xưa",t:`${nm.name} bế ngươi từ thuở lọt lòng; bà nhớ những chuyện cả nhà đã quên.`,k:B.nm.ke.k,w:{tamco:B.nm.ke.tamco},x:`nhũ mẫu thiện cảm ${balSg(B.nm.ke.af)}`,onceM:"nmke",go:()=>{kcAf(nm,B.nm.ke.af);if(!S.kc.nmOld){S.kc.nmOld=1;log(`${nm.name} kể chuyện năm ngươi lên ba, ${S.kc.fam.find(m=>m.r==="me")?"mẫu thân thức trắng ba đêm bên giường ngươi":"mẫu thân ngươi còn sống, ngày ngày bế ngươi ra hồ sen"}.`)}}}),nm));
  if(di)X.push(kcNeed(kcCard({g:"fam",who:nm.id,n:`Nhờ nhũ mẫu dò la viện ${kc3Low(di.t)}`,t:"Người làm trong phủ quen nhũ mẫu; bà nghe được nhiều chuyện ở bếp sau.",k:B.nm.do.k,o:od(B.nm.do.od+nm.af/B.nm.do.afD),w:{},l:{},x:`có thật thì nắm thêm một chứng cứ về ${kc3Low(di.t)} · hỏng: ${kc3Low(di.t)} biết, oán thêm ${B.nm.do.oan}`,onceM:"nmdo",
   go:()=>{if(kc3DiActed()){S.kc.proof[di.id]=(S.kc.proof[di.id]||0)+B.nm.do.proof;log(`${nm.name} dò được: người của ${kc3Low(di.t)} từng mua thứ thuốc lạ ở hiệu ngoài phố.`)}else log(`${nm.name} dò mãi không thấy gì: ${kc3Low(di.t)} chưa làm gì khuất tất.`)},fail:()=>{di.oan=(di.oan||0)+B.nm.do.oan;kcAf(nm,B.nm.do.af)}}),nm));
  X.push(kcNeed(kcCard({g:"fam",who:nm.id,n:"Gối đầu lên lòng nhũ mẫu",t:"Như thuở nhỏ, nghe bà ru một khúc hát quê.",k:B.nm.an.k,w:{suc:B.nm.an.suc},rep:1}),nm))}
 if(ba&&S.kc.suit.length){X.push(kcNeed(kcCard({g:"soc",who:ba.id,n:`Biếu ${ba.name} lễ trà`,t:"Bà mối nói một câu, cả kinh thành nghe mười câu.",k:B.ba.bieu.k,c:{bac:B.ba.bieu.bac},x:`bà mối thiện cảm ${balSg(B.ba.bieu.af)} · nhà cầu thân sau là nhà cao hơn`,go:()=>{kcAf(ba,B.ba.bieu.af);S.kc.baUp=(S.kc.baUp||0)+B.ba.bieu.q}}),ba,"kc_sanh"));
  X.push(kcNeed(kcCard({g:"soc",who:ba.id,n:`Nhờ ${ba.name} nói khéo với nhà trai`,t:"Ngồi tiếp bà mối cả buổi, nhờ bà nói giúp vài lời cho nhà trai bớt giục.",k:B.ba.khe.k,c:{suc:B.ba.khe.suc},w:{kap:B.ba.khe.kap},x:`bà mối thiện cảm ${balSg(B.ba.khe.af)}`,go:()=>kcAf(ba,B.ba.khe.af)}),ba,"kc_sanh"))}
 for(const m of kc3Grp("thay")){const T=kc3Tier(m),art=ARTS.find(a=>a.k===m.art);const what=art?art.n:"Lễ nghi";
  X.push(kcNeed(kcCard({g:"art",who:m.id,n:`Hầu ${kc3Low(m.t)} ${shortN(m.name)}`,t:`Mài mực, pha trà, ở lại sau buổi học. Nay là ${KC3TIERW[T]}.`,k:B.thay.hau.k,c:{suc:B.thay.hau.suc},x:`${kc3Low(m.t)} thiện cảm ${balSg(B.thay.hau.af)} · được quý thì học ${what} tiến nhanh hơn`,go:()=>kc3TeachAf(m,B.thay.hau.af)}),m,"kc_hoc"));
  X.push(kcNeed(kcCard({g:"art",who:m.id,n:`Biếu ${kc3Low(m.t)} lễ tết`,t:"Gói một xấp lụa, mấy lạng trà ngon gửi thầy.",k:B.thay.bieu.k,c:{bac:B.thay.bieu.bac},x:`${kc3Low(m.t)} thiện cảm ${balSg(B.thay.bieu.af)} · được quý thì học ${what} tiến nhanh hơn`,onceM:"bieu"+m.id,go:()=>kc3TeachAf(m,B.thay.bieu.af)}),m,"kc_hoc"));
  if(T>=B.thay.truyen.tier&&!(S.kc.truyen||{})[m.id])X.push(kcNeed(kcCard({g:"art",who:m.id,n:`Xin ${kc3Low(m.t)} truyền nghề`,t:`Thầy chỉ truyền cho người thầy coi là truyền nhân.`,k:B.thay.truyen.k,c:{suc:B.thay.truyen.suc},w:{danh:B.thay.truyen.danh},x:`${what} tiến một bước dài`,go:()=>{S.kc.truyen=Object.assign(S.kc.truyen||{},{[m.id]:1});if(m.art==="le")S.kc.le=Math.min(B.thay.leMax,(S.kc.le||0)+1);else addArt(m.art,B.thay.truyen.art)}}),m,"kc_hoc"))}}
function kc3TeachAf(m,n){const t0=kc3Tier(m);kcAf(m,n);const t1=kc3Tier(m);if(t1>t0)log(`<b class="g">${m.t} ${m.name} coi ngươi là ${KC3TIERW[t1]}.</b>`)}
/* the stepmother's schemes are real: proof only exists if she has really acted (law 6a) */
function kc3DiActed(){const d=kc3P("di");return !!(d&&(S.kc.ev.doc||S.kc.diBan||(S.kc.diAct||0)>0||(d.oan||0)>=BAL.kc3.nm.do.oanMin))}
["phan","doc","trom","tudg","tranhmoi"].forEach(e=>{const b0=KCE[e]&&KCE[e].b;if(b0)KCE[e].b=function(){if(S&&S.kc&&S.kc.c3&&/^(phan|doc|trom|tudg)$/.test(e))S.kc.diAct=(S.kc.diAct||0)+1;return b0.apply(this,arguments)}});
/* ---------- the arc runner (j67 format at home) ---------- */
function kc3Thread(id){const a=KCA[id];if(!a)return null;const N=BAL.kc3.cal.nc,nc=Math.max(N[0],Math.min((a.p[1]||[]).length,N[0]+R(N[1])));
 return{a:id,seq:["s"].concat(Array(nc).fill("c"),(a.p[2]||[]).length&&roll(BAL.kc3.cal.tP)?["t"]:[],["x"]),i:0,used:[],f:{},sc:0,cur:null,hist:[]}}
function kc3Beat(A,id){const a=KCA[A.a];return a&&a.B[id]}
function kc3BeatOk(A,id){const b=kc3Beat(A,id);try{return !!b&&(!b.if||b.if(A))}catch(e){return false}}
function kc3Next(A){const a=KCA[A.a];while(A.i<A.seq.length){const slot={s:0,c:1,t:2,x:3}[A.seq[A.i]];const C=(a.p[slot]||[]).filter(id=>!A.used.includes(id)&&kc3BeatOk(A,id));
  if(C.length)return pick(C);if(slot===3)return null;A.seq.splice(A.i,1)}return null}
function kc3Opts(A,b){return (b.o||[]).filter(o=>{try{return !o.if||o.if(A)}catch(e){return false}})}
function kc3Od(A,o,b){if(o.o==null)return 100;let x=typeof o.o==="function"?o.o(A):o.o;if(o.e||A.seq[A.i]==="x")x+=(A.sc||0)*BAL.kc3.scOdds;return od(x)}
function kc3Left(){const ar=S.kc.ar;if(!ar)return 0;let n=ar.A?ar.A.seq.length-ar.A.i:0;n+=Math.max(0,ar.plan.length-ar.i-(ar.A?1:0))*BAL.kc3.cal.min;return n}
function kc3Fire(){const ar=S.kc.ar;if(!ar||S.dead||!kc3On()||Q.some(m=>m.pid==="kc3"))return;
 if(!ar.A){if(ar.i>=ar.plan.length)return;let A=null;while(ar.i<ar.plan.length&&!(A=kc3Thread(ar.plan[ar.i]))||A&&!kc3Next(A)){if(!A)ar.i++;else{ar.i++;A=null}}if(!A)return;ar.A=A}
 const A=ar.A,id=kc3Next(A);if(!id){kc3End(A,kc3ScEnd(A));return}const b=kc3Beat(A,id);A.cur=id;const O=kc3Opts(A,b);
 pushDil(mkP("kc3",{a:A.a,b:id,o:O.map(o=>kc3Od(A,o,b))}),KCA[A.a].t);kc3Pic(Q[Q.length-1],A.a)}
/* the chapter picture (review r1 item 4): every home chapter names its EVENTS.json meaning group, given to the kit as the dialog's evId
   "cat:<group>" (jevban kitDlgId / j89 evArtCat, KIT §28.10c) — the same picture on the beat card, its result card and the ending card;
   a reloaded save gets it back (deserQ). No new picture, no new frame: the kit's own event picture slot. */
const KC3PIC={kc_tt:"mat-uoc",kc_dtq:"bien-ai",kc_muoi:"bac-tien",kc_thd:"tai-nghe",kc_ch:"thu-nha",kc_td:"vu-oan",kc_ke:"am-muu",kc_hon:"khach-den",tm96z:"tu-tinh"};
function kc3Pic(q,a){try{if(q&&(q.pid==="kc3"||q.kc3a)&&KC3PIC[a]&&evArtCat("cat:"+KC3PIC[a]))q.evId="cat:"+KC3PIC[a]}catch(e){}return q}
(function(){if(typeof deserQ!=="function")return;const d0=deserQ;deserQ=function(L){const out=d0.apply(this,arguments);try{out.forEach(q=>{if(q&&q.pid==="kc3"&&q.pp)kc3Pic(q,q.pp.a)})}catch(e){}return out}})();
function kc3Line(o,od0,A,a){const sure=od0>=100,G=t=>t?`<span class="g">${t}</span>`:"",Rd=t=>t?`<span class="r">${t}</span>`:"";const end=o.e?(Array.isArray(o.e)?o.e:[o.e,o.e]):null;
 const eT=k=>{const E=a.E[k];return E?(E.k<0?Rd:G)("kết: "+kc3Fill(E.tag,A)):""};const gain=[fmt(o.w||{}),G(kc3Fill(o.wx||"",A)),o.sc>0?`Lợi thế +${o.sc}`:""].filter(Boolean).join(" · ");
 const cost=fmt(o.c||{});const lose=[fmt(o.l||{}),Rd(kc3Fill(o.lx||"",A)),end&&end[1]!==end[0]?eT(end[1]):""].filter(Boolean).join(" · ");
 if(sure)return [cost?"tốn: "+cost:"",gain||end?"thành: "+[gain,end?eT(end[0]):""].filter(Boolean).join(" · "):"",o.lx?"kèm: "+Rd(kc3Fill(o.lx,A)):""].filter(Boolean).join(" · ");
 return `${word(od0)} · ${cost?"tốn: "+cost+" · ":""}thành: ${[gain,end?eT(end[0]):""].filter(Boolean).join(" · ")||"qua được"} · hỏng: ${lose||"không mất gì thêm"}`}
PEND.kc3=pp=>{if(!kc3On())return null;const ar=S.kc.ar,A=ar&&ar.A;if(!A||A.a!==pp.a||A.cur!==pp.b)return null;const a=KCA[A.a],b=kc3Beat(A,pp.b);if(!b)return null;const O=kc3Opts(A,b);
 return{who:kc3Who(b.w),t:`<p class="past">${a.t} · hồi ${A.i+1}/${A.seq.length}</p><p>${kc3Fill(b.t,A)}</p>`,o:O.map((o,i)=>{const od0=pp.o[i]==null?100:pp.o[i];const line=kc3Line(o,od0,A,a);
  return{n:kc3Fill(o.n,A),fx:Object.assign({},o.c||{}),x:"",j67:line,go:()=>kc3Res(pp,i,od0)}})}};
function kc3Res(pp,i,od0){const ar=S.kc.ar,A=ar&&ar.A;if(!A||A.cur!==pp.b)return;const a=KCA[A.a],b=kc3Beat(A,pp.b),o=kc3Opts(A,b)[i];if(!o)return;const bs=rsnap();
 const sure=od0>=100,ok=sure||roll(od0);apply(ok?(o.w||{}):(o.l||{}));if(ok&&o.sc)A.sc+=o.sc;if(!ok&&o.sf)A.sc=Math.max(0,A.sc+o.sf);if(ok&&o.f)A.f[o.f]=1;
 let extra="";try{if(o.go)extra=o.go(A,ok)||""}catch(e){console.error("kc3 go",e)}const said=kc3Fill(ok?(o.rt||""):(o.rf||o.rt||""),A);
 A.hist.push(`${kc3Fill(b.h,A)}: ${kc3Fill(o.n,A)}${sure?"":ok?" (thành)":" (hỏng)"}`);A.used.push(pp.b);A.cur=null;A.i++;
 kcRes(a.t,bs,`<b>${a.t}</b>: ${sure?"":ok?'<span class="g">Thành.</span> ':'<span class="r">Bại.</span> '}${said}${extra?" "+extra:""}`);
 const end=o.e?(Array.isArray(o.e)?(ok?o.e[0]:o.e[1]):o.e):null;if(end){kc3End(A,end);return}
 ar.due=S.turn+BAL.kc3.cal.gap[0]+R(BAL.kc3.cal.gap[1]);if(!kc3Next(A))kc3End(A,kc3ScEnd(A))}
function kc3ScEnd(A){return A.sc>=BAL.kc3.win?"win":A.sc>=BAL.kc3.mid?"mid":"lose"}
function kc3End(A,key,silent){const ar=S.kc.ar,a=KCA[A.a],E=a.E[key]||a.E.mid;if(A.done)return;A.done=1;let txt="";if(E.fx)apply(E.fx);try{if(E.go)txt=E.go(A,E.g)||""}catch(e){console.error("kc3 end",e)}
 const seed=typeof E.seed==="function"?E.seed(A):E.seed;if(seed&&ARC67[seed])S.kc.seed3={id:seed,sc:E.sc||0,from:A.a};
 ar.done.push({a:A.a,e:key,tag:kc3Fill(E.tag,A),k:E.k||0,seed:seed||""});ar.A=null;ar.i++;ar.due=S.turn+BAL.kc3.cal.gap[0];
 log(`<b class="${E.k<0?"r":"g"}">${a.t} — kết: ${kc3Fill(E.tag,A)}.</b> ${kc3Fill(E.t,A)}${txt?" "+txt:""}`);kcFix();
 if(!silent&&!window.__bot&&!quiet)Q.push({kc3a:1,t:a.t,who:kc3Who(E.w||a.w),h:`<p>${kc3Fill(E.t,A)}${txt?" "+txt:""}</p>`+kitRows([["Kết chương",kc3Fill(E.tag,A),E.k<0?"r":"g"]].concat(seed&&ARC67[seed]?[["Vào cung sẽ gặp",`${ARC67[seed].t}${E.sc?` · Lợi thế +${E.sc}`:""}`,"t"]]:[]))});
 if(!silent&&!window.__bot&&!quiet)kc3Pic(Q[Q.length-1],A.a)}
/* the month: the old three fixed beats stay for old saves only; one chapter beat at most a month; the arcs close before tuyển tú */
(function(){const o0=kcOrigin;kcOrigin=function(){if(kc3On())return null;return o0.apply(this,arguments)}})();
(function(){const m0=kcMonth;kcMonth=function(){const r=m0.apply(this,arguments);try{if(kc3On()&&!S.dead)kc3Month()}catch(e){console.error("kc3 month",e)}return r}})();
function kc3Month(){const ar=S.kc.ar;if(!ar)return;const left=kcMonthsLeft();if(left<=kc3Left()+BAL.kc3.cal.fin)ar.due=Math.min(ar.due,S.turn);
 if(!S.kc.tt&&S.turn>=ar.due)kc3Fire();kc3Events()}
/* entry: the open chapter closes on its score, the ending seeds the palace road */
(function(){const e0=kcEnter;kcEnter=function(rank){const c3=S&&S.kc&&S.kc.c3;if(c3){try{const ar=S.kc.ar;if(ar&&ar.A&&!ar.A.done)kc3End(ar.A,kc3ScEnd(ar.A),1)}catch(e){console.error(e)}}
 const r=e0.apply(this,arguments);if(c3)try{kc3Tt3(S.kc.early3||(S.kc.tt&&S.kc.tt.early)?"early":"in");kc3Seed()}catch(e){console.error("kc3 enter",e)}return r}})();
function kc3Seed(){const s=S.kc.seed3;if(!s||!S.st||!S.st.ch)return;const c=S.st.ch;if(!ARC67[s.id]||!arcOk67(ARC67[s.id])){s.off=1;return}/* E25r2: the seeded arc is not open at entry (its own world rule, e.g. thd_hoc needs a royal child of vỡ lòng age): the seed is not used, recorded */
 if(c.pool&&c.pool.includes(s.id))c.pool=[s.id].concat(c.pool.filter(x=>x!==s.id));if(S.st.f14&&!S.st.f14.r0&&c.pool.includes(s.id))S.st.f14.road=s.id}
(function(){const n0=newThread67;newThread67=function(id){const A=n0.apply(this,arguments);try{const s=S&&S.kc&&S.kc.seed3;if(A&&s&&s.id===id&&!s.used){s.used=1;A.sc=(A.sc||0)+(s.sc||0);A.kc3=s.from}
 if(A&&id==="tm96a"&&S.tm96&&S.tm96.endZ){S.tm96.tok=S.tm96.endZ.tok?1:0}}catch(e){console.error(e)}return A}})();
/* tm96a reads how they parted at home (S.tm96.endZ.force) */
(function(){const f0=TOK67.lvforce;TOK67.lvforce=function(){try{const z=S.tm96&&S.tm96.endZ;if(z&&z.force)return z.force}catch(e){}return f0?f0.apply(this,arguments):""}})();
/* kc_tt3 «Tuyển tú»: the round of jkc told as the last chapter (its endings: kept / sent home / early road) */
function kc3Tt3(e){if(!S.kc.ar)return;if(S.kc.ar.tt3)return;S.kc.ar.tt3={e,tag:e==="early"?"Vào cung trước kỳ tuyển":e==="in"?"Giữ thẻ bài, ban hoa":"Trả thẻ bài"}}
(function(){const t0=KCE.trave.b;KCE.trave.b=function(){try{if(S.kc.c3)kc3Tt3("out")}catch(e){}return t0.apply(this,arguments)}})();
/* ---------- the story tab ---------- */
(function(){const s0=kcStoryHTML;kcStoryHTML=function(){if(!kc3On())return s0.apply(this,arguments);const ar=S.kc.ar,left=Math.max(0,kcMonthsLeft());
 const step=S.kc.tt?(S.kc.tt.art?3:2):S.kc.soOk?2:S.kc.so?1:0;const bk=(()=>{try{return RARE97.book()}catch(e){return{}}})();const found=Object.keys(KCRARE).filter(x=>bk[x]).length;
 const cards=ar.plan.map((id,i)=>{const a=KCA[id];if(!a)return"";const d=ar.done.find(x=>x.a===id),cur=ar.A&&ar.A.a===id?ar.A:null;
  return kitSkillCard({kind:"story",k:"kc3"+i,name:a.t,kicker:`Chương ${i+1}`,level:d?1:0,max:0,bar:false,next:"",desc:d?`Kết: ${d.tag}${d.seed&&ARC67[d.seed]?`. Vào cung sẽ gặp: ${ARC67[d.seed].t}`:""}.`:cur?`Đang ở hồi ${Math.min(cur.i+1,cur.seq.length)}/${cur.seq.length}. ${kc3Fill(a.g,cur)}`:kc3Fill(a.g,null)})}).join("");
 return cards+kitSkillCard({kind:"story",k:"kty",name:"Tuyển tú",kicker:`Chương ${ar.plan.length+1} · ${S.kc.tt?"Đang tuyển":`Còn ${left} tháng`}`,level:step,max:3,word:"Vòng",bar:false,next:"",desc:"Sơ tuyển · Phúc tuyển · Điện tuyển. Qua cả ba thì vào cung, phong tới Quý nhân. Có người được triệu vào cung trước kỳ."})
  +kitRows([["Kết hiếm ngoài cung đã gặp",`${found} trên ${Object.keys(KCRARE).length}`,"t"]])}})();
/* ---------- home events: E9, E15, E28, early roads ---------- */
IT.divat={n:"Trâm bạc của mẫu thân",kd:"Kỷ vật",d:"Di vật mẫu thân trao lúc lâm chung · không bán, không tặng",pr:0,keep:1,tg:[]};
try{if(typeof ITIMG==="object"&&!ITIMG.divat)ITIMG.divat=ITIMG.tramngoc||ITIMG.tramphuong}catch(e){}
function kc3Events(){const B=BAL.kc3.ev,k=S.origin.k,me=kc3P("me");if(Q.length>B.qMax)return;
 if(me&&!S.kc.ev.mebenh&&S.turn>=B.mebenh.t0&&roll(B.mebenh.p)){S.kc.ev.mebenh=1;pushDil(mkP("kcE",{e:"mebenh"}),"Mẫu thân lâm bệnh");return}
 if(KCCLAN[k]&&k!=="td"&&!S.kc.ev.hac&&S.turn>=B.hac.t0&&roll(B.hac.p)){S.kc.ev.hac=1;pushDil(mkP("kcE",{e:"hac"}),"Cha bị hặc tội");return}
 if(S.kc.vh===1&&!S.kc.vhAsk&&!S.kc.tt){S.kc.vhAsk=1;pushDil(mkP("kcE",{e:"vhtrieu"}),"Thánh chỉ");return}}
function kc3Die(m){if(!m)return;m.alive=0;m.dead=1;const d=kc3P("di");if(d&&d.t==="Di nương"&&m.r==="me"){d.t="Kế mẫu";log(`Cha nâng ${d.name} lên làm chính thất. Từ nay nàng là kế mẫu của ngươi.`)}
 const ar=S.kc.ar;if(ar){const j=ar.plan.indexOf("kc_hon");if(j>ar.i&&!(ar.A&&ar.A.a==="kc_hon"))ar.plan[j]="kc_ke"}}
function kc3Keep(me){const e={k:"divat",from:"kc",giver:me?me.name:"Mẫu thân",d:typeof wdWhen==="function"?wdWhen():""};S.inv=S.inv||[];S.inv.push(e);return e}
/* an event option with its true line (odds word, cost, gain, loss): the roll is made once, here, with the odds the card shows */
function kc3Ev(n,cost,p,gain,loss,go,more){const c=cost||{},t=fmt(c),G=x=>x?`<span class="g">${x}</span>`:"",Rd=x=>x?`<span class="r">${x}</span>`:"";
 const line=p==null?[t?"tốn: "+t:"",gain?"thành: "+G(gain):"",loss?"kèm: "+Rd(loss):""].filter(Boolean).join(" · "):`${word(p)} · ${t?"tốn: "+t+" · ":""}thành: ${G(gain)||"qua được"} · hỏng: ${Rd(loss)||"không mất gì thêm"}`;
 return kcO(n,c,()=>go(p==null||roll(p)),Object.assign({j67:line},more||{}))}
function kc3Gx(L){return L.filter(Boolean).join(", ")}
Object.assign(KCE,{
 mebenh:{t:"Mẫu thân lâm bệnh",b:()=>{const me=kc3P("me");if(!me)return null;const B=BAL.kc3.ev.mebenh;return{who:kcFace(me),t:`<p>Mẫu thân ${me.name} ho ra máu từ đầu mùa. Đại phu bắt mạch xong chỉ lắc đầu: bệnh đã vào phổi.</p>`,o:[
  kc3Ev("Mời danh y trong kinh, bán đồ trang sức lấy tiền thuốc",{bac:B.y.bac},od(B.y.od),`mẫu thân qua khỏi, mẫu thân thiện cảm ${balSg(B.af)}`,"mẫu thân không qua khỏi",ok=>kc3Ill(me,ok,"danh y")),
  kc3Ev("Tự tay hầu thuốc ngày đêm",{suc:B.hau.suc},od(B.hau.od),`mẫu thân qua khỏi, mẫu thân thiện cảm ${balSg(B.af)}`,"mẫu thân không qua khỏi",ok=>kc3Ill(me,ok,"hầu thuốc"))]}}},
 divat:{t:"Lời trăng trối",b:()=>{const me=kc3P("me");if(!me)return null;const d=kc3P("di"),B=BAL.kc3.ev.divat,item=IT.divat.n;return{who:kcFace(me),t:`<p>Đêm ấy mẫu thân gọi ngươi đến bên giường, rút cây trâm bạc trên đầu đặt vào tay ngươi: “Trâm này của bà ngoại con. Con giữ lấy, như mẹ vẫn ở bên.”</p>`,o:[
  kc3Ev("Nhận trâm, hứa sống cho mẹ yên lòng",{},null,kc3Gx([item,`Đức ${balSg(B.hua.duc)}`]),"không hỏi được gì thêm",()=>kcDo("Lời trăng trối",()=>{kc3Keep(me);apply({duc:B.hua.duc});kc3Die(me);return"Mẫu thân mỉm cười, nhắm mắt trước khi trời sáng. Ngươi cài cây trâm bạc lên tóc."})),
  kc3Ev("Nhận trâm, hỏi mẹ điều người còn giấu",{},null,kc3Gx([item,`Tâm cơ ${balSg(B.hoi.tamco)}`,d?`có thật thì thêm chứng cứ về ${kc3Low(d.t)}`:""]),"mẹ đi khi lòng chưa yên",()=>kcDo("Lời trăng trối",()=>{kc3Keep(me);apply({tamco:B.hoi.tamco});const acted=kc3DiActed();if(d&&acted)S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+B.hoi.proof;kc3Die(me);
   return d?(acted?`Mẫu thân thì thào: thang thuốc của bà mấy tháng nay đều qua tay người của ${kc3Low(d.t)}. Ngươi nhớ từng chữ.`:`Mẫu thân chỉ dặn: đừng oán ${kc3Low(d.t)}, nàng ta cũng khổ. Rồi bà nhắm mắt.`):"Mẫu thân chỉ nắm tay ngươi, không nói thêm gì nữa."}))]}}},
 xemmat:{t:"Nhà trai thử dung mạo",b:()=>{const s=S.kc.suit[0];if(!s)return null;const B=BAL.kc3.ev.xemmat,sx=kc3Sx(s),m=kc3P("muoi");return{who:sx?kcFace(sx):pMe(),t:`<p>Phu nhân nhà ${s.n} đến chơi, ngồi ở chính sảnh uống trà. Bà nhìn ngươi từ đầu đến chân, hỏi tuổi, hỏi cầm kỳ thi họa, rồi xin xem tay ngươi thêu.</p>`,o:[
  kc3Ev("Điểm trang rực rỡ, ra mắt đường hoàng",{suc:B.dep.suc},od(B.dep.od+S.sac/B.dep.sacD),kc3Gx([`Gia thanh ${balSg(B.dep.kgt)}`,`nhà ${s.n} ưng ý`]),kc3Gx([`Gia thanh ${balSg(B.dep.kgtF)}`,`thành thì Áp lực hôn sự ${balSg(B.dep.kap)}`]),ok=>kcDo("Thử dung mạo",()=>{if(ok){S.kgt+=B.dep.kgt;S.kap+=B.dep.kap;if(sx)kcAf(sx,B.dep.af);return `Phu nhân gật gù, khen ngươi trước mặt cha. Nhà ${s.n} giục cưới.`}S.kgt+=B.dep.kgtF;return"Phu nhân chê phấn son quá đậm, về nhà kể với cả họ."})),
  kc3Ev("Ăn vận giản dị, nói năng chừng mực",{},null,`Đức ${balSg(B.gian.duc)}`,`Áp lực hôn sự ${balSg(B.gian.kap)}`,()=>kcDo("Thử dung mạo",()=>{apply({duc:B.gian.duc});S.kap+=B.gian.kap;return"Phu nhân khen ngươi nết na, nhưng không nói gì thêm chuyện cưới hỏi."})),
  kc3Ev("Để thứ muội ra tiếp trà thay",{},od(B.muoi.p),kc3Gx([`nhà ${s.n} quay sang hỏi thứ muội`,`Áp lực hôn sự ${balSg(B.muoi.kap)}`]),kc3Gx(["phu nhân vẫn hỏi đến ta",m?`thứ muội được tiếng, Danh nàng ${balSg(B.muoi.danh)}`:""]),ok=>kcDo("Thử dung mạo",()=>{if(m){kcAf(m,B.muoi.af);statSet(m,"danh",(m.danh||0)+B.muoi.danh)}if(ok){S.kap+=B.muoi.kap;S.kc.suit.shift();return `Phu nhân để ý ${m?m.name:"thứ muội"}. Nhà ${s.n} quay sang hỏi nàng.`}return"Phu nhân vẫn hỏi đến ngươi."}))]}}},
 hac:{t:"Cha bị hặc tội",b:()=>{const c=kc3P("cha"),B=BAL.kc3.ev.hac,cl0=KCCLAN[S.origin.k];return{who:kcFace(c),t:`<p>Ngự sử dâng sớ hặc ${KCDAD[S.origin.k][0].toLowerCase()} ${c?c.name:""} kết bè, nhận hối lộ. Cả phủ đóng cửa; người nhà các phủ khác thôi qua lại.</p>`,o:[
  kc3Ev("Dâng phần hồi môn để cha lo lót",{khm:-B.lo.khm},od(B.lo.od),kc3Gx([`thế lực nhà ${balSg(B.lo.pow)}`,`cha thiện cảm ${balSg(B.lo.af)}`]),`thế lực nhà ${balSg(B.lo.powF)}`,ok=>kcDo("Cha bị hặc",()=>{if(ok){try{tdPowAdd(cl0,B.lo.pow)}catch(e){}kc3Af("cha",B.lo.af);return"Sớ hặc bị gác lại. Cha nhìn ngươi khác hẳn."}try{tdPowAdd(cl0,B.lo.powF)}catch(e){}return"Bạc đi mà sớ vẫn dâng. Cha bị phạt bổng nửa năm."}),{dis:(S.khm||0)<B.lo.khm}),
  kc3Ev("Khuyên cha tự dâng sớ xin giáng chức",{},null,kc3Gx([`Đức ${balSg(B.ha.duc)}`,"giữ được nhà"]),kc3Gx([`thế lực nhà ${balSg(B.ha.pow)}`,`Gia thanh ${balSg(B.ha.kgt)}`,`cha thiện cảm ${balSg(B.ha.af)}`]),()=>kcDo("Cha bị hặc",()=>{try{tdPowAdd(cl0,B.ha.pow)}catch(e){}S.kgt+=B.ha.kgt;kc3Af("cha",B.ha.af);apply({duc:B.ha.duc});return"Cha giữ được mạng và nhà, mất một bậc quan. Phủ yên, nhưng khách vắng hẳn."})),
  kc3Ev("Tìm lỗi của kẻ dâng sớ, trả đòn",{suc:B.tra.suc},od(B.tra.od+S.tamco/B.tra.tcD),kc3Gx(["sớ hặc quay về đầu kẻ dâng",`thế lực nhà ${balSg(B.tra.pow)}`,`cha thiện cảm ${balSg(B.tra.af)}`]),kc3Gx([`Gia thanh ${balSg(B.tra.kgtF)}`,`cha thiện cảm ${balSg(B.tra.afF)}`]),ok=>kcDo("Cha bị hặc",()=>{if(ok){try{tdPowAdd(cl0,B.tra.pow)}catch(e){}kc3Af("cha",B.tra.af);S.kc.hacWin=1;return"Ngươi lần ra ngự sử kia nhận bạc của nhà đối đầu. Sớ hặc quay về đầu kẻ dâng."}S.kgt+=B.tra.kgtF;kc3Af("cha",B.tra.afF);return"Lần không ra gì. Người ta còn đồn con gái nhà này can dự việc triều."}))]}}},
 vhtrieu:{t:"Thánh chỉ",b:()=>{const B=BAL.kc3.entry;return{who:pEmp(),t:`<p>Một thái giám mang khẩu dụ đến phủ: người khách ở chùa hôm ấy chính là Hoàng thượng. Ngài muốn đón ngươi vào cung ngay, phong ${RANKS[B.vh].n}, không cần đợi kỳ tuyển.</p>`,o:[
  kc3Ev("Tạ ân, vào cung ngay",{},null,`vào cung ngay, phong ${RANKS[B.vh].n}`,"thôi các chương ở nhà, không đi tuyển",()=>kc3Early(B.vh,"vh")),
  kc3Ev("Xin được vào cung theo kỳ tuyển như mọi tú nữ",{},null,kc3Gx([`Đức ${balSg(BAL.kc3.ev.vh.duc)}`,"Điện tuyển còn nhớ ta"]),"phải qua đủ ba vòng tuyển",()=>kcDo("Thánh chỉ",()=>{apply({duc:BAL.kc3.ev.vh.duc});S.kc.vh=2;return"Thái giám về tâu lại. Hoàng thượng cười: “Vậy trẫm đợi nàng ở Điện tuyển.”"}))]}}},
 thtrieu:{t:"Thái hậu triệu",b:()=>{const B=BAL.kc3.entry,T=BAL.kc3.ev.th;return{who:pTH(),t:`<p>Thư của cô mẫu đến trước kỳ tuyển: “Ai gia già rồi, muốn có người nhà bên cạnh. Con vào cung hầu ai gia, phong ${RANKS[B.th].n}.”</p>`,o:[
  kc3Ev("Vâng lời cô mẫu, vào cung ngay",{},null,kc3Gx([`vào cung ngay, phong ${RANKS[B.th].n}`,`Thái hậu thiện cảm ${balSg(T.go)}`]),"thôi các chương ở nhà, không đi tuyển",()=>kc3Early(B.th,"th")),
  kc3Ev("Xin cô mẫu cho đợi kỳ tuyển cho đường hoàng",{},null,kc3Gx([`Đức ${balSg(T.duc)}`,`Thái hậu thiện cảm ${balSg(T.wait)}`]),"phải qua đủ ba vòng tuyển",()=>kcDo("Thái hậu triệu",()=>{S.th=(S.th||0)+T.wait;apply({duc:T.duc});return"Cô mẫu hồi thư: “Con biết giữ lễ. Ai gia chờ con ở Điện tuyển.”"}))]}}}});
function kc3Ill(me,ok,how){const b=rsnap();const B=BAL.kc3.ev.mebenh;if(ok){kcAf(me,B.af);kcRes("Mẫu thân lâm bệnh",b,`Nhờ ${how}, mẫu thân qua được mùa bệnh. Bà gầy đi nhiều, nhưng đã ngồi dậy được.`);return}
 kcRes("Mẫu thân lâm bệnh",b,"Thuốc thang không đỡ. Bệnh của mẫu thân mỗi ngày một nặng.");pushDil(mkP("kcE",{e:"divat"}),"Lời trăng trối")}
function kc3Early(rank,how){S.kc.early3=how;try{const ar=S.kc.ar;if(ar&&ar.A&&!ar.A.done)kc3End(ar.A,kc3ScEnd(ar.A),1)}catch(e){}if(how==="th"){S.th=(S.th||0)+BAL.kc3.ev.th.go}kcEnter(rank);
 const say=how==="th"?"Kiệu của Đức Thọ cung đón ngươi vào cung, ở gần Thái hậu.":"Không qua kỳ tuyển: Hoàng thượng đón ngươi vào cung theo khẩu dụ.";
 for(const m of Q)if(m&&m.t==="Nhập cung"&&m.h)m.h=m.h.replace("Điện tuyển: Hoàng thượng giữ thẻ bài, ban hoa.",say);log(`<b class="g">${say}</b>`)}
/* the bà mối is the one who comes (her face), and "xem mặt trước" leads to the groom's family visit (E15) */
(function(){const b0=KCE.moi.b;KCE.moi.b=function(){const d=b0.apply(this,arguments);try{if(d&&S.kc.c3){const ba=kc3P("ba");if(ba){d.who=kcFace(ba);d.t=d.t.replace("Bà mối đến",`${ba.name} đến`)}
 const o=d.o[0];if(o){const g=o.go;o.go=function(){const r=g.apply(this,arguments);if(!S.kc.ev.xemmat&&S.kc.suit.length){S.kc.ev.xemmat=1;pushDil(mkP("kcE",{e:"xemmat"}),"Nhà trai thử dung mạo")}return r}}}}catch(e){console.error("kc3 moi",e)}return d}})();
/* the suitor house picked by the bà mối's favour: a gift moves the next house up */
(function(){const r0=kcSuitReach;kcSuitReach=function(x){if(S&&S.kc&&S.kc.c3&&S.kc.baUp)return x[2]<=S.kgt+BAL.ag.why.kcSuit.reach+S.kc.baUp;return r0.apply(this,arguments)}})();
/* tm96z runs the thanh mai home events as one chapter: the old weekly ones step aside */
["tmrise","tmcam","tmtron","meet"].forEach(e=>{const b0=KCE[e]&&KCE[e].b;if(b0)KCE[e].b=function(){if(kc3On()&&S.kc.ar&&S.kc.ar.plan.includes("tm96z"))return null;return b0.apply(this,arguments)}});
(function(){const c0=kcChance;kcChance=function(){if(kc3On()&&S.kc.ar&&S.kc.ar.plan.includes("tm96z"))return;return c0.apply(this,arguments)}})();
window.kc3On=kc3On;window.KCA=KCA;
/* ================= ORIGIN ARC tt «Quân cờ đầu tiên» (reference arc: every other arc follows this format) =================
   p: [openers],[complications],[turns],[climaxes]; B: beats {h title, w speaker, t text, if(A) gate, o options}; option {n, wx gain words, lx loss words,
   rt / rf result words, f flag on success, e ending (or [success, failure]), go(A,ok,G)}; its numbers c / w / l / o / sc / g come from BAL.kc3.fx.<arc>.
   E: win / mid / lose {tag, k, t, w, seed (palace arc id or fn), go}; numbers fx / sc / g from BAL.kc3.fx.<arc>.E. Laws 1–3: every option gains and costs. */
kc3Reg("kc_tt",{t:"Quân cờ đầu tiên",w:"cha",g:"Cha ngươi, {dadT} {chaN}, muốn rèn ngươi thành quân cờ đầu tiên của phủ trong cung. Học cách nhìn người như cha muốn, hay tự học cách đi nước của mình.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Bàn cờ trong thư phòng",w:"cha",t:"Cha gọi ngươi vào thư phòng, chỉ lên bàn cờ: “Một quân cờ tốt phải biết mình đứng ở đâu.” Ông muốn ngươi học cách nhìn người trên triều.",o:[
  {n:"Học cách nhìn người",f:"obey",wx:"cha tin ngươi hơn",lx:"ngươi quen nhìn người như nhìn quân cờ",rt:"Mỗi tối cha bày cờ, kể từng nhà trên triều.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Thưa cha, con không muốn làm quân cờ",f:"own",wx:"giữ được lòng mình",lx:"cha phật ý",rt:"Cha gõ quân cờ xuống bàn, không nói gì.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Hỏi cha: quân cờ này được gì",f:"deal",wx:"cha nể ngươi biết đòi",lx:"cha cho là ngươi hỗn",rt:"Cha bật cười: “Được lắm. Con gái ta biết mặc cả.”",rf:"Cha sầm mặt: “Con gái mà dám đòi giá với cha?”",go:(A,ok,G)=>{kc3Af("cha",ok?G[0]:G[1])}}]},
 c1:{h:"Phong thư của môn sinh",w:"cha",t:"Môn sinh của cha nhờ ngươi chuyển một phong thư cho cha, không qua quản gia. Phong thư không dán kín.",o:[
  {n:"Chuyển nguyên phong thư",f:"obey",wx:"cha thấy ngươi kín miệng",lx:"không biết trong thư viết gì",rt:"Cha đọc thư, đốt ngay trước đèn.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Đọc trước rồi mới chuyển",f:"read",wx:"biết cha đang tính gì",lx:"cha biết thư đã bị mở",rt:"Trong thư là danh sách những người ủng hộ cha ở Lại bộ. Ngươi nhớ từng cái tên.",rf:"Nếp gấp lệch đi một chút. Cha nhìn ra ngay.",go:(A,ok,G)=>{if(ok){kcNews();A.f.secret=1}else kc3Af("cha",G[0])}},
  {n:"Trả thư, không dính vào",wx:"giữ mình ngoài việc triều",lx:"cha thấy ngươi nhát",rt:"Ngươi trả thư cho môn sinh, nói mình không tiện.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 c2:{h:"Tiệc nhà Thượng thư",w:"cha",t:"Cha đưa ngươi đến tiệc mừng thọ phủ Thượng thư bộ Hộ, dặn: “Để ý tiểu thư nhà ấy. Năm tới nàng cũng đi tuyển.”",o:[
  {n:"Kết thân với tiểu thư nhà ấy",f:"own",wx:"có thêm một người bạn sẽ cùng vào cung",lx:"cha thấy ngươi mềm lòng",rt:"Hai người ngồi cạnh nhau cả buổi, hẹn sẽ viết thư.",go:(A,ok,G)=>{const b=kc3P("ban0");if(b)kcAf(b,G[0]);kc3Af("cha",G[1])}},
  {n:"Dò la cho cha",f:"obey",wx:"biết nhà ấy định cài ai vào cung",rt:"Ngươi nghe được nhà Thượng thư đã lo lót cho con gái từ vòng Sơ tuyển.",rf:"Có người thấy ngươi dỏng tai nghe chuyện ở bàn bên.",go:(A,ok,G)=>{if(ok){kcIntel(BAL.kc3.intel.n,BAL.kc3.intel.st);kc3Af("cha",G[0])}}},
  {n:"Lặng lẽ ngồi cuối tiệc",wx:"không ai chú ý đến ngươi",lx:"cha thấy uổng công đưa ngươi đi",rt:"Ngươi ngồi cuối tiệc, nhìn ra hồ sen.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 c3:{h:"Huynh trưởng ngả phe khác",w:"huynh",if:()=>!!kc3P("huynh"),t:"Ngươi bắt gặp huynh trưởng {huynhN} lén gặp người của phe đối đầu với cha ở trà lâu. Huynh xin ngươi đừng nói.",o:[
  {n:"Báo với cha",f:"obey",wx:"cha tin ngươi hơn huynh",lx:"huynh trưởng oán ngươi",rt:"Cha nhốt huynh trưởng trong từ đường ba ngày.",go:(A,ok,G)=>{kc3Af("cha",G[0]);const h=kc3Af("huynh",G[1]);if(h)h.oan=(h.oan||0)+Math.abs(G[1])}},
  {n:"Giữ kín cho huynh",f:"own",wx:"huynh trưởng nợ ngươi một lần",lx:"cha mà biết sẽ giận",rt:"Huynh trưởng nắm tay ngươi: “Muội cứ tin huynh.”",go:(A,ok,G)=>{kc3Af("huynh",G[0]);A.f.huynh=1;if(roll(G[2]))kc3Af("cha",G[1])}},
  {n:"Khuyên huynh quay về với cha",wx:"giữ được cả nhà một lòng",lx:"huynh trưởng giận ngươi xen vào",rt:"Huynh trưởng im lặng rất lâu, rồi thôi không đến trà lâu nữa.",rf:"Huynh trưởng gạt tay ngươi: “Muội thì biết gì.”",go:(A,ok,G)=>{kc3Af("huynh",ok?G[0]:G[1])}}]},
 t1:{h:"Cha thử lòng ngươi",w:"cha",t:"Cha bày một ván cờ, rồi hỏi bâng quơ: “Nếu một ngày nhà ta và Hoàng thượng không cùng một đường, con đứng bên nào?”",o:[
  {n:"Thưa: con đứng bên lẽ phải",wx:"cha nhìn ngươi khác đi",lx:"cha chưa yên lòng",rt:"Cha đi một nước cờ, không đáp.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Hỏi lại cha: vì sao cha hỏi vậy",f:"read",wx:"đoán được ván cờ thật của cha",lx:"cha thấy ngươi đa nghi",rt:"Cha lỡ lời nhắc tới Lại bộ và một mật ước. Ngươi hiểu cha đang đánh ván lớn.",rf:"Cha cười nhạt, dọn bàn cờ.",go:(A,ok,G)=>{if(!ok)kc3Af("cha",G[0])}},
  {n:"Biếu cha một nghiên mực quý, lảng sang chuyện khác",wx:"cha vui lòng",lx:"bạc riêng vơi đi",rt:"Cha mân mê nghiên mực, quên mất câu hỏi.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 x1:{h:"Lời thề trước kỳ tuyển",w:"cha",t:"Trước kỳ tuyển, cha nói: “Vào cung, ngươi sẽ là mắt tai của nhà này. Hoàng hậu sẽ coi ngươi là mối lo.” Ông chờ ngươi thề.",o:[
  {n:"Thề giữ lòng với nhà",e:"mid",wx:"cha dốc sức lo cho ngươi",lx:"vào cung vẫn là quân cờ của cha",rt:"Cha đỡ ngươi dậy, trao một danh sách những người của phủ trong cung.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Chỉ hứa sẽ giữ mình",e:"lose",wx:"không mắc nợ ai",lx:"cha bắt đầu tính đường lui",rt:"Cha gật đầu chậm rãi. Ngươi biết ông đã nghi."},
  {n:"Đặt điều kiện: cha theo ngươi, không phải ngươi theo cha",e:["win","lose"],wx:"tự cầm lấy quân cờ của mình",lx:"cha coi ngươi là con bất hiếu",rt:"Cha im lặng rất lâu rồi gật đầu.",rf:"Cha đập vỡ bàn cờ."}]}},
 E:{
 win:{tag:"Tự cầm quân",seed:()=>qOn()&&roll(BAL.kc3.fx.kc_tt.E.win.mat)?"tt_mat":"tt_tranh",t:"Ngươi rời phủ Tể tướng không phải như một quân cờ, mà như người ngồi đối diện cha bên bàn cờ. Cha giao cho ngươi những người của phủ trong cung, nhưng từ nay họ nghe ngươi."},
 mid:{tag:"Quân cờ của cha",seed:"tt_co",t:"Ngươi mang theo vào cung danh sách người của phủ và lời dặn của cha. Mỗi bức thư nhà sau này sẽ là một mệnh lệnh."},
 lose:{tag:"Cha nghi ngươi",seed:"tt_oan",t:"Cha không còn tin ngươi trọn vẹn. Khi kẻ thù dựng án tham ô nhắm vào phủ Tể tướng, ngươi sẽ phải tự tìm đường gỡ."}}});
