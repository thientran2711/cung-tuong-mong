/* ================= jtoil: ĐIỂM TRANG BUỔI SÁNG (owner 15/11 09:30Z, review/toilette) =================
   Every morning (buổi sáng = the start of a tuần-day) the player MAY sit at her mirror (1 khắc, BAL.toil.khac; never forced, never blocks):
   (a) CHỌN Y PHỤC — pick trâm / y phục / trang sức from Tư trang (the ONE bag kitInvGrid + equipment slots) for the day's occasions
       (thỉnh an, yến/lễ, thị tẩm… known in advance). Verdict = hợp dịp / hợp phẩm / quá giản dị / quá phô trương / vượt phẩm / phạm tang
       (j92 phẩm level + jinv luxury, judged against the day's most formal occasion).
   (b) TRANG ĐIỂM — a real skill game in the kit mini-game frame (j82 kg82): tô mày theo đường, đánh phấn đều, chấm son đúng chỗ đúng nhịp,
       on her own portrait in the mirror (face box = img/veil-fit.json). Result vụng / vừa / đẹp / tuyệt; Họa, Sắc and a trusted ma ma widen
       the tolerance and add a share (shown as rows).
   Skipping = yesterday's clothes, bare face (mặt mộc).
   The day's look changes how people see her (ONE judgement: jaudit §17 leAttire, extended here — p.toilette = {day, wk, score, makeup, style, dv}):
   by each host's nết (frugal hosts praise plain dress, etiquette-minded hosts take a bare face / plain dress before superiors as disrespect,
   jealous ones resent showy dress and a perfect face, Hoàng thượng by his taste LIKES.dress). Numbers: BAL.toil. Cards that meet people
   (thỉnh an Thái hậu / Hoàng hậu, Hoàng thượng, phi tần) show the effect in advance (Được/Mất + Vì sao). Applied once per host per day.
   NPCs follow the same rule from data (toilNpc: style by nết, face by Sắc) when they wait on Thái hậu. */
Object.assign(BAL,{toil:{khac:1,
 /* the day's dress verdict by formality F (0 ngày thường, 1 thỉnh an / gặp bề trên / thị tẩm, 2 yến, lễ lớn):
    d = j92 outfit level − her own phẩm; r = worn luxury / her allowance (jinv) */
 dress:[{under:-2.75,rLo:0,fitD:-9,fitR:0,fitHi:.62,showR:.9},{under:-1.75,rLo:.2,fitD:-.75,fitR:.38},{under:-1,rLo:.3,fitD:-.25,fitR:.55}],
 tier:[40,65,85],          /* makeup score → vụng < 40 ≤ vừa < 65 ≤ đẹp < 85 ≤ tuyệt */
 /* host reaction (thiện cảm; Hoàng thượng: + → Sủng +1, − → Sủng −1) by kind of host */
 react:{strict:{hopdip:2,hoppham:0,giandi:-3,photruong:-1,moc:-1,vung:-2,vua:0,dep:1,tuyet:2,diem:-3},
  normal:{hopdip:1,hoppham:0,giandi:-1,photruong:-1,moc:0,vung:-1,vua:0,dep:1,tuyet:1,diem:-1},
  frugal:{hopdip:1,hoppham:0,giandi:2,photruong:-2,moc:1,vung:0,vua:0,dep:0,tuyet:1,diem:-2},
  jealous:{hopdip:1,hoppham:0,giandi:-1,photruong:-2,moc:0,vung:-1,vua:0,dep:-1,tuyet:-1,diem:1},
  nha:{hopdip:2,hoppham:1,giandi:1,photruong:-2,moc:0,vung:-2,vua:0,dep:2,tuyet:3,diem:-2},
  lay:{hopdip:2,hoppham:0,giandi:-2,photruong:1,moc:-2,vung:-2,vua:0,dep:2,tuyet:3,diem:-1},
  doan:{hopdip:3,hoppham:1,giandi:-1,photruong:-2,moc:-1,vung:-1,vua:0,dep:1,tuyet:2,diem:-2}},
 cap:[-4,3],strictPlainDanh:-1,
 /* other consorts who see her (a rival she meets, everyone at Thỉnh an Hoàng hậu): ghen / quý by nết */
 ghenShowy:2,ghenTuyet:1,ghenMul:{"Kiêu ngạo":1.5,"Tham vọng":1.5,"Xảo quyệt":1.2,"Ân cần":.5,"Khiêm nhường":.5},crowd:.5,praisePlain:1,frownShowy:-1,
 /* NPC data: chance of a showy / plain day by nết, chance of no makeup, face score = base + Sắc × k ± spread */
 npc:{showy:{"Kiêu ngạo":.35,"Tham vọng":.3},plain:{"Ân cần":.4,"Khiêm nhường":.35},showy0:.08,plain0:.1,moc:.1},
 /* skill: Sắc / sacDiv + Họa / hoaDiv + ma ma tinh ý (0..1) — widens tolerance, adds up to `skillShare` of the final share */
 sacDiv:250,hoaDiv:8,mama:.1,skillShare:20,
 /* the look on HER face: TOIL_LOOKS / TOIL_MKS; how the look is earned: the diemtrang-score block below (freehand parts, heaviness) */
 }});
const TOIL_DV={hopdip:"hợp dịp",hoppham:"hợp phẩm",giandi:"quá giản dị",photruong:"quá phô trương",vuot:"vượt phẩm",tang:"phạm tang"};
/* makeup-theme (owner 17/11 05:03Z/05:16Z, OD:L1553-1554): the ONLY player-visible names of the six result levels (ids unchanged; VANPHONG §1).
   Every place that prints a level reads TOIL_MK (a title / chip / row) or toilMkW (inside a sentence). */
const TOIL_MK={moc:"Mặt mộc",vung:"Vụng về",vua:"Đoan trang",dep:"Kiều diễm",tuyet:"Khuynh thành",diem:"Diêm dúa"};
/* the two preset groups the player picks from (owner 17/11 03:38Z: the bold group is elaborate, not negative; "Diêm dúa" is only the overdone RESULT) */
const TOIL_STY={dep:"Kiểu thanh nhã",diem:"Kiểu cầu kỳ"};
function toilMkW(k){const n=TOIL_MK[k]||TOIL_MK.moc;return k==="moc"||!TOIL_MK[k]?n[0].toLowerCase()+n.slice(1):n}/* a level name keeps its capital inside a sentence (it is a name); "mặt mộc" reads as plain words */
const TOIL_HK={strict:"trọng lễ",frugal:"chuộng giản dị",jealous:"hay ghen",normal:"",nha:"thích y phục thanh nhã",lay:"thích y phục lộng lẫy",doan:"thích y phục đoan trang"};
/* Hoàng thượng's taste in dress: one more of his likes (j1 LIKES; learnt like the others through "Nói thật lòng" → discover) */
try{LIKES.dress=["y phục thanh nhã","y phục lộng lẫy","y phục đoan trang"];LIKEN.dress="Y phục"}catch(e){}
const TOIL_EMPK={"y phục thanh nhã":"nha","y phục lộng lẫy":"lay","y phục đoan trang":"doan"};
function toilEmpTaste(){try{const E=S.emp;E.likes=E.likes||{};if(!E.likes.dress){const T=E.traits||[];
  E.likes.dress=T.includes("mesac")?"y phục lộng lẫy":T.includes("nhantu")?"y phục thanh nhã":T.includes("chamchinh")?"y phục đoan trang":LIKES.dress[wdHash(String(E.name||"")+"dress")%3]}
  return TOIL_EMPK[E.likes.dress]||"doan"}catch(e){return"doan"}}
(function(){if(typeof discover!=="function")return;const d0=discover;discover=function(){toilEmpTaste();return d0.apply(this,arguments)}})();

/* ---------- who / when ---------- */
function toilOn(p){try{if(!S||S.dead)return false;if(typeof isSrv==="function"&&isSrv())return false;if(p&&p!==S)return !!(p.alive!==false&&!p.out&&(rivals||[]).includes(p));return !S.out}catch(e){return false}}
function toilWk(){return typeof wk==="function"?wk():0}
function toilToday(p){p=p||S;const t=p&&p.toilette;return t&&t.wk===toilWk()?t:null}
function toilTier(sc){const T=BAL.toil.tier;return sc<T[0]?"vung":sc<T[1]?"vua":sc<T[2]?"dep":"tuyet"}
/* the day's occasions, known in the morning */
function toilOcc(){const L=[];try{if(!S.out){if(!S.thDead)L.push({k:"th",n:"Thỉnh an Thái hậu",F:1});if(qOn()&&S.rank<7)L.push({k:"hh",n:"Thỉnh an Hoàng hậu",F:1})}
 const f=typeof festToday==="function"?festToday():null;if(f)L.push({k:"fest",n:f.name,F:2});
 if(S.tonight==="me")L.push({k:"night",n:"Thị tẩm tối nay",F:1})}catch(e){}
 if(!L.length)L.push({k:"thuong",n:"Ngày thường",F:0});return L}
function toilMaxF(){return Math.max(0,...toilOcc().map(o=>o.F))}
/* F of a meeting: thỉnh an / Hoàng thượng = 1, raised to 2 on a festival day; a rival met in passing = 0 (festival 2) */
function toilFOf(host){let fest=false;try{fest=!!(typeof festToday==="function"&&festToday())}catch(e){}if(host==="th"||host==="emp"||(host&&host.queen))return fest?2:1;return fest?2:0}

/* ---------- DIEMTRANG-SCORE (owner 16/11 ~22:30Z, OD "answer to the diemtrang-score proposal"): freehand drawing on HER face, strict
   scoring against a hidden ideal taken from the face itself, no guide lines; diêm dúa earned by choices and revealed only in the result;
   vụng earned by a part that went wrong. ONE CORE: every number here; NPCs and the bot use the same table (toilNpcPlay). ---------- */
Object.assign(BAL.toil,{skillShare:10,
 /* brow: tolerance = brow length × (tol + tolSk × skill); a stroke counts for the nearer brow; over = stroke beyond the brow ends;
    messy = spread of the strokes across the line above the brow's own thickness; sym = the two brows at different heights */
 brow:{tol:.11,tolSk:.04,overK:1.2,messyK:.6,symK:.35,smear:30,near:3,slack:.3,end:.6,thk:.6},
 /* blush: the hidden spot on each cheekbone (from the eyes and the mouth of THIS face); r × eye distance; dose window as before */
 cheek:{r:.26,dx:.06,dy:.55,puff:.5,step:.45,spill:.8,bal:.5,margin:1.7,ring:1.3,edMin:.4,doseLo:1,doseLoSk:.3,doseHi:2.2,doseHiSk:.6,cake:4.2},
 /* lips: the three dots on THIS mouth; position tolerance × the dot radius, timing tolerance as before */
 lip:{tol:1.1,tolSk:.4,ttol:1.2,ttolSk:.8,dx:.22,dy:-.12,dyLow:.22,rMin:7,rK:.05},
 /* a part this bad shows on her face (vụng), whatever the total: brow / powder / son */
 fail:.3,
 /* NO fallback targets (review r1 / owner 22:38Z): the board waits for THIS face's points (meshWait ms, brush off, "đang soi gương");
    if they never come the sitting is played for her from skill (toilNpcPlay), never scored against a guessed face */
 meshWait:8000,
 /* time for brows / powder (ms, from her first touch); lip ring period = ring[0] + ring[1] × skill (ms) */
 lim:[14000,10000],ring:[1150,500],
 /* popup words on the board: brow good / fair, powder good / fair, "dày" / "lem" share, lip good / fair */
 pop:{brow:[.8,.5],powder:[.8,.6],over:.3,spill:.3,lip:[.75,.4]},
 /* diêm dúa: heaviness of her choices against what the day allows (never shown before the result: owner 16/11) */
 heavy:{mat:{hoadao:0,hongmai:1,rangchieu:1,kimsa:1,nautram:0,tuvi:1,hophach:1},ma:{hongphan:0,hoadao:0,haiduong:1,yenchi:2,rangchieu:1,hongsen:0,camquyt:1},
  son:{haiduong:1,dotham:2,hongdao:0,chusa:1,manchin:2,sanho:0,camdao:1,hophach:2},may:{nau:0,den:1,thanhdai:0,naunhat:0,khoi:0}},
 tone:{mat:{hoadao:"w",hongmai:"c",rangchieu:"w",kimsa:"w",tuvi:"c",hophach:"w"},ma:{hongphan:"c",hoadao:"w",haiduong:"c",yenchi:"c",rangchieu:"w",hongsen:"c",camquyt:"w"},
  son:{haiduong:"c",dotham:"c",chusa:"w",manchin:"c",sanho:"w",camdao:"w",hophach:"w"}},
 teaseGhen:2,presetDiem:2,mixH:1,showyH:1,cakeH:[[.3,1],[.55,2]],
 allow:{thuong:4,thinhan:3,night:5,fest:6,tang:1},diemOdds:[0,.3,.55,.8,.95],
 /* NPCs and the bot: how well each part goes, by skill (same skill formula), spread per part */
 play:{q0:.53,qSk:.15,spread:.44,cake:.12,cakeOver:.35,diemPre:.3}});
function toilDense(P,n){const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));const T=L[L.length-1]||1,o=[];
 for(let k=0;k<=n;k++){const t=k/n*T;let i=1;while(i<P.length-1&&L[i]<t)i++;const f=(t-L[i-1])/((L[i]-L[i-1])||1);o.push([P[i-1][0]+(P[i][0]-P[i-1][0])*f,P[i-1][1]+(P[i][1]-P[i-1][1])*f])}return o}
function toilSegD(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],l=dx*dx+dy*dy||1;let t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/l;const o=t<0?-1:t>1?1:0;t=Math.max(0,Math.min(1,t));
 const x=a[0]+dx*t,y=a[1]+dy*t;return{d:Math.hypot(p[0]-x,p[1]-y),out:o,sy:p[1]-y}}
function toilLineD(p,L){let best=null;for(let i=1;i<L.length;i++){const r=toilSegD(p,L[i-1],L[i]);if(!best||r.d<best.d)best=r;}
 /* beyond an end only when the nearest segment is the first / last one */const r0=toilSegD(p,L[0],L[1]),r1=toilSegD(p,L[L.length-2],L[L.length-1]);
 best.end=(r0.out<0&&r0.d<=best.d+1e-6)||(r1.out>0&&r1.d<=best.d+1e-6);return best}
/* the hidden ideal on THIS face: v = face points (img/mk-fit, 1/4000 of the picture) or null; img = where the picture is drawn {x,y,w,h};
   T(u,v) + fws = the face-box mapping (fallback) */
function toilIdeal(v,img,fws){const B=BAL.toil;if(!v||v.length<120)return null;const P=i=>[img.x+v[2*i]/4000*img.w,img.y+v[2*i+1]/4000*img.h];
 const brows=[40,50].map(s=>{const up=[0,1,2,3,4].map(i=>P(s+i)),lo=[4,3,2,1,0].map(i=>P(s+5+i));const c=up.map((p,i)=>[(p[0]+lo[i][0])/2,(p[1]+lo[i][1])/2]);
  return{c:toilDense(c.sort((a,b)=>a[0]-b[0]),18),th:up.reduce((a,p,i)=>a+Math.hypot(p[0]-lo[i][0],p[1]-lo[i][1]),0)/5}});
 const eyes=[20,30].map(s=>{let x=0,y=0;for(let i=0;i<10;i++){const p=P(s+i);x+=p[0]/10;y+=p[1]/10}return[x,y]});
 const LO=[];for(let i=0;i<12;i++)LO.push(P(i));const lc=[LO.reduce((a,p)=>a+p[0],0)/12,LO.reduce((a,p)=>a+p[1],0)/12];
 const lw=Math.max(...LO.map(p=>p[0]))-Math.min(...LO.map(p=>p[0])),lh=Math.max(...LO.map(p=>p[1]))-Math.min(...LO.map(p=>p[1]));
 brows.sort((a,b)=>a.c[0][0]-b.c[0][0]);eyes.sort((a,b)=>a[0]-b[0]);const ed=Math.hypot(eyes[1][0]-eyes[0][0],eyes[1][1]-eyes[0][1])||fws*B.cheek.edMin,mx=(eyes[0][0]+eyes[1][0])/2;
 const cheeks=eyes.map(e=>{const s=e[0]<mx?-1:1;return{x:e[0]+s*B.cheek.dx*ed,y:e[1]+(lc[1]-e[1])*B.cheek.dy,r:B.cheek.r*ed}});
 const L=B.lip,lips=[[lc[0]-L.dx*lw,lc[1]+L.dy*lh],[lc[0]+L.dx*lw,lc[1]+L.dy*lh],[lc[0],lc[1]+L.dyLow*lh]];
 brows.forEach(b=>{let s=0;for(let i=1;i<b.c.length;i++)s+=Math.hypot(b.c[i][0]-b.c[i-1][0],b.c[i][1]-b.c[i-1][1]);b.len=s});
 return{brows,cheeks,lips,lr:Math.max(L.rMin,fws*L.rK),ed,mesh:true}}
/* brow quality 0..1 (+ which brow failed): strokes = [[x,y]…] lists */
function toilBrowQ(strokes,I,sk){const B=BAL.toil.brow,all=strokes.flat();const len=(I.brows[0].len+I.brows[1].len)/2,tol=len*(B.tol+B.tolSk*sk);
 const per=I.brows.map(()=>({pts:[]}));let smear=0;
 for(const p of all){const d=I.brows.map(b=>toilLineD(p,b.c));const k=d[0].d<=d[1].d?0:1;if(d[k].d>tol*B.near){smear++;continue}per[k].pts.push([p,d[k]])}
 const q=I.brows.map((b,k)=>{const P=per[k].pts;if(!P.length)return{q:0,off:0};
  let hit=0;for(const c of b.c)if(P.some(([p])=>Math.hypot(p[0]-c[0],p[1]-c[1])<=tol))hit++;const cov=hit/b.c.length;
  const inn=P.filter(x=>!x[1].end),dm=inn.length?inn.reduce((a,x)=>a+x[1].d,0)/inn.length:tol*B.near;const pos=Math.max(0,Math.min(1,1-(dm-tol*B.slack)/tol));
  const over=P.filter(x=>x[1].end&&x[1].d>tol*B.end).length/P.length;
  const off=inn.length?inn.reduce((a,x)=>a+x[1].sy,0)/inn.length:0;const sd=inn.length?Math.sqrt(inn.reduce((a,x)=>a+(x[1].sy-off)**2,0)/inn.length):0;
  const messy=Math.max(0,1-B.messyK*Math.max(0,sd-b.th*B.thk)/tol);
  return{q:cov*pos*Math.max(0,1-B.overK*over)*messy,off}});
 const sym=Math.max(0,1-B.symK*Math.abs(q[0].off-q[1].off)/tol);const tot=(q[0].q+q[1].q)/2*sym*Math.max(0,1-smear/B.smear);
 return{q:tot,each:q.map(x=>x.q),tol}}
/* powder quality: G = grid points {x,y,c} (c = dose); returns q, over (share of the cheek spots over the dose), thick */
function toilPowderQ(G,I,sk){const B=BAL.toil.cheek,lo=B.doseLo-B.doseLoSk*sk,hi=B.doseHi+B.doseHiSk*sk;let tot=0,out=0;const ins=I.cheeks.map(()=>[]);
 for(const p of G){tot+=p.c;let k=-1;I.cheeks.forEach((c,i)=>{if(Math.hypot(p.x-c.x,p.y-c.y)<=c.r)k=i});if(k>=0)ins[k].push(p);else if(!I.cheeks.some(c=>Math.hypot(p.x-c.x,p.y-c.y)<=c.r*B.ring))out+=p.c}
 const v=c=>c<.3?0:c<lo?(c-.3)/(lo-.3):c<=hi?1:c>=B.cake?0:1-(c-hi)/(B.cake-hi);
 const cq=ins.map(L=>L.length?L.reduce((a,p)=>a+v(p.c),0)/L.length:0),m=ins.map(L=>L.length?L.reduce((a,p)=>a+p.c,0)/L.length:0);
 const spill=tot>0?out/tot:0,bal=Math.max(0,1-B.bal*Math.abs(m[0]-m[1])/(Math.max(m[0],m[1])||1));const all=ins.flat();
 return{q:(cq[0]+cq[1])/2*Math.max(0,1-B.spill*spill)*bal,over:all.length?all.filter(p=>p.c>hi).length/all.length:0,thick:all.length?all.filter(p=>p.c>hi+.8).length/all.length:0,spill}}
/* one lip dot: timing error dt (ms, ring period per) and distance d from the dot */
function toilLipQ(dtR,d,lr,sk){const B=BAL.toil.lip;const qt=Math.max(0,1-Math.abs(dtR)/(B.ttol+B.ttolSk*sk)),qp=Math.max(0,1-d/(lr*(B.tol+B.tolSk*sk)));return qt*qp}
/* heaviness of her choices today (colours, a diêm dúa preset, warm + cool together, a showy dress, caked powder) */
function toilHeavy(col,want,style,over){const B=BAL.toil;let h=0;const t=new Set();col=col||{};
 for(const k of ["mat","ma","son","may"]){h+=(B.heavy[k]||{})[col[k]]||0;const x=(B.tone[k]||{})[col[k]];if(x)t.add(x)}
 if(t.size>1)h+=B.mixH;if(want==="diem")h+=B.presetDiem;if(style==="showy")h+=B.showyH;let c=0;for(const [s,n] of B.cakeH)if((over||0)>=s)c=n;return h+c}
/* what the day allows: the strictest of today's occasions (mourning allows almost nothing) */
function toilAllow(occ,rk){const A=BAL.toil.allow;let tang=false;try{tang=typeof wdTang==="function"&&wdTang()}catch(e){}if(tang)return A.tang;
 let a=99;for(const k of occ||[]){a=Math.min(a,k==="th"||k==="hh"?A.thinhan:k==="fest"?A.fest:k==="night"?A.night:A.thuong)}if(a===99)a=A.thuong;
 /* makeup-theme (OD:L1516): overdoing beyond her RANK too — a low rank allows less, a high rank a little more (BAL.toil.allowRk [from rank, shift]) */
 let d=0;if(rk!=null)for(const [r0,n] of BAL.toil.allowRk||[])if((rk|0)>=r0)d=n;return a+d}
/* the look from parts + score + heaviness: vụng (with the part that went wrong) · diêm dúa (seeded roll on the excess) · else by score.
   seed = a whole number fixed for this person and day, so the same sitting always reads the same (co-op: the same on both seats) */
function toilLookOf(P,score,H,allow,seed){const B=BAL.toil;const parts=[["brow",P.brow],["powder",P.powder],["son",P.son]].filter(x=>typeof x[1]==="number");
 const worst=parts.reduce((a,x)=>!a||x[1]<a[1]?x:a,null);if(score<B.tier[0]||(worst&&worst[1]<B.fail))return{look:"vung",slip:worst?worst[0]:"brow"};
 const e=Math.max(0,Math.min(B.diemOdds.length-1,H-allow));const r=((seed>>>0)%1000)/1000;if(r<B.diemOdds[e])return{look:"diem"};
 return{look:score>=B.tier[1]?"dep":null}}
/* an NPC's day from WORLD facts only (Thái hậu alive, a festival; mourning inside toilAllow) — never this seat's own rank / place / night:
   both co-op seats read the same allowance for the same consort (review r1, CO-OP FIRST) */
function toilNpcOcc(){const L=[];try{if(!S.thDead)L.push("th");if(typeof festToday==="function"&&festToday())L.push("fest")}catch(e){}return L.length?L:["thuong"]}
/* hồi 1: start loading THIS face's points (the portrait follows the dress she tries on) so the board never waits long */
function toilMkPre(){try{const f=String(toilPor().src||"").split("?")[0].split("/").pop();MK_FIT.get(f);toilEyePx(f)}catch(e){}}
function toilMk(rec){return rec&&rec.makeup?(rec.look==="diem"?"diem":rec.look==="vung"?"vung":toilTier(rec.score|0)):"moc"}
/* NPCs and the bot: the same parts, score and look from skill (hash of person + day: no Math.random, both co-op seats agree) */
function toilNpcPlay(sk,h,col,want,style,occ,rk){const N=BAL.toil.play,B=BAL.toil;const r=i=>(wdHash(h+":"+i)%1000)/1000;
 const q=i=>Math.max(0,Math.min(1,N.q0+N.qSk*sk+(r(i)+r(i+5)-1)*N.spread));const P={brow:q(0),powder:q(1),son:q(2)};
 const raw=Math.round(100*(.4*P.brow+.3*P.powder+.3*P.son));const score=Math.max(0,Math.min(100,Math.round(raw*(100-B.skillShare)/100)+Math.round(B.skillShare*sk)));
 const over=r(3)<N.cake?N.cakeOver:0;const H=toilHeavy(col,want,style,over);return Object.assign({score,parts:P},toilLookOf(P,score,H,toilAllow(occ,rk),wdHash(String(h)+":diem")))}
/* ---------- the dress verdict (her clothes NOW, for formality F) ---------- */
function toilDress(p,F){let st="ok";try{st=wdStatus(p)}catch(e){}if(st==="tang")return{v:"tang",style:"showy"};
 let vp=0;try{vp=(vpItems(p)||[]).length}catch(e){}if(st==="over"||vp)return{v:"vuot",style:"showy"};
 let x={lv:1,sc:0,bud:1};try{x=luxOf(p)}catch(e){}const r=x.bud?x.sc/x.bud:0;if(x.lv>=2)return{v:"photruong",style:"showy"};
 let d=0;try{d=wdLevel(p)-Math.min(8,wdPOf(p))}catch(e){}const B=BAL.toil.dress[Math.max(0,Math.min(2,F|0))];
 if(d<=B.under||r<B.rLo)return{v:"giandi",style:"plain"};if(B.showR!=null&&r>B.showR)return{v:"photruong",style:"showy"};
 if(d>=B.fitD&&r>=B.fitR&&(B.fitHi==null||r<=B.fitHi))return{v:"hopdip",style:"fit"};return{v:"hoppham",style:"fit"}}
/* NPC look of the day (data, deterministic per person per day: no save field needed) */
function toilNpc(v){const N=BAL.toil.npc,h=wdHash(wdKey(v)+":"+toilWk()),r1=(h%1000)/1000,r2=((h>>>10)%1000)/1000,r3=((h>>>20)%1000)/1000;const T=traitsOf(v);
 const sp=Math.max(N.showy0,...T.map(t=>N.showy[t]||0)),pp=Math.max(N.plain0,...T.map(t=>N.plain[t]||0));
 const dv=r1<sp?"photruong":r1<sp+pp?"giandi":r1<.8?"hopdip":"hoppham";const makeup=r2>=N.moc;
 const style=dv==="giandi"?"plain":dv==="photruong"?"showy":"fit";let hoa=0;try{hoa=kg82Lv(v,"hoa")||0}catch(e){}const sk=Math.max(0,Math.min(1,(v.sac||50)/BAL.toil.sacDiv+hoa/BAL.toil.hoaDiv));
 /* her colours: a showy day → a diêm dúa preset, a plain day → a thanh nhã one, else either (BAL.toil.play.diemPre) */
 const want=style==="showy"||(style!=="plain"&&((h>>>4)%1000)/1000<BAL.toil.play.diemPre)?"diem":"";const L=TOIL_PRE.filter(x=>(x[2]==="diem")===(want==="diem"));const col=Object.assign({},L[(h>>>12)%L.length][4]);
 const R=toilNpcPlay(sk,h,col,want,style,toilNpcOcc(),v.rank);
 return{wk:toilWk(),dv,style,makeup,score:R.score,look:R.look,slip:R.slip,col:Object.assign(col,want?{want}:{}),npc:1}}

/* ---------- the reaction of one host ---------- */
function toilHostKind(host){if(host==="emp")return toilEmpTaste();let k="normal";try{k=leHostKind(host)}catch(e){}
 if(k==="normal"&&host&&host!=="th"){const T=traitsOf(host);if(T.some(t=>t==="Xảo quyệt"||t==="Tham vọng"))k="jealous"}return k}
function toilHostKey(host){return host==="th"?"th":host==="emp"?"emp":host&&host.id!=null?"v"+host.id:"x"}
function toilSeen(host){const s=S.toilSeen;return !!(s&&s.wk===toilWk()&&s.h&&s.h[toilHostKey(host)])}
function toilMark(host){if(!S.toilSeen||S.toilSeen.wk!==toilWk())S.toilSeen={wk:toilWk(),h:{}};S.toilSeen.h[toilHostKey(host)]=1}
/* CO-OP (diemtrang-coop-look, CO-OP FIRST OD 16/11 ~20:32Z): the friend (a rival entry with coop:true) is judged by the look SHE made
   today (her S.toilette, carried by jcoopworld LOOK at the week merge and live by her pos relay), never by the toilNpc roll. No sitting
   today = mặt mộc; her dress verdict is toilDress on her real clothes (wd), as on her own seat. Both seats therefore read the same look. */
function toilFriendRec(p){if(!p||!p.coop)return null;const t=p.toilette;if(t&&t.wk===toilWk())return t;let d={v:"hoppham",style:"fit"};try{d=toilDress(p,toilMaxF())}catch(e){}
 return{wk:toilWk(),makeup:false,score:0,dv:d.v,style:d.style,coop:1}}
/* {aff, danh, duc, why:[[text,n]…], words} or null — baseState: jaudit's own verdict (luxury / thiếu lễ); the dress part only when that is "ok" */
function toilFx(p,host,F,baseState){if(!toilOn(p))return null;if(p===S&&toilSeen(host))return null;
 const rec=p===S?toilToday(S):toilFriendRec(p)||toilNpc(p);const mk=toilMk(rec);
 const dr=baseState&&baseState!=="ok"?null:p===S||p.coop?toilDress(p,F):{v:rec.dv};/* the friend: her real clothes (wd live via jcoopworld pos), the same call as on her seat */
 const hk=toilHostKind(host),R=BAL.toil.react[hk]||BAL.toil.react.normal;const C=BAL.toil.cap;
 const a1=dr?(R[dr.v]||0):0,a2=R[mk]||0;const aff=Math.max(C[0],Math.min(C[1],a1+a2));
 const danh=hk==="strict"&&dr&&dr.v==="giandi"&&F>=1?BAL.toil.strictPlainDanh:0;if(!aff&&!danh)return null;
 const why=[];if(dr&&a1)why.push([`y phục ${TOIL_DV[dr.v]}`,a1]);if(a2)why.push([`dung nhan ${toilMkW(mk)}`,a2]);
 return{aff,danh,duc:0,why,hk,dress:dr&&dr.v,mk}}
/* the words for a host ("Thái hậu trọng lễ") — the nết is shown only when she knows it */
function toilWho(host){return host==="th"?"Thái hậu":host==="emp"?"Hoàng thượng":host&&host.queen?"Hoàng hậu":host&&host.name?host.name:"chủ nhà"}

/* ---------- ONE judgement: jaudit §17 leAttire + the day's look ----------
   jaudit read p.toilette only as "plain" (makeup:false / score<40) with the full thiếu-lễ cost and keyed it per buổi; the look is per DAY (wk)
   and judged by nết here, so jaudit's own call sees no toilette and this adds the look on top (r.toil). */
if(typeof leAttire==="function"){const la0=leAttire;
 leAttire=function(p,occasion,host){p=p||S;const tl=p.toilette;let r;try{p.toilette=null;r=la0.call(this,p,occasion,host)}finally{p.toilette=tl}
  try{const t=toilFx(p,host,toilFOf(host),r.state);if(t){r.delta={danh:(r.delta.danh||0)+t.danh,duc:(r.delta.duc||0)+t.duc,aff:(r.delta.aff||0)+t.aff};r.toil=t;r.why=r.why.concat(t.why.map(w=>w[0]))}}catch(e){console.error("toil leAttire",e)}
  return r};window.leAttire=leAttire;
 /* card + log words: base reason (thiếu lễ…) and the look, then the real numbers */
 const tx0=aaThieuLeTxt;aaThieuLeTxt=function(host,f0){const L=leAttire(S,"",host);if(!L.toil)return tx0.apply(this,arguments);const f=f0||L.delta;const who=toilWho(host);
  const head=[];const base=L.why.filter(w=>!L.toil.why.some(x=>x[0]===w));if(L.state==="plain")head.push(`thiếu lễ (${base[0]||"y phục dưới phẩm"})`);else if(base.length)head.push(base[0]);
  head.push(...L.toil.why.map(w=>w[0]));const hk=TOIL_HK[L.toil.hk];
  const parts=[f.danh?`Danh ${f.danh>0?"+":""}${f.danh}`:"",f.duc?`Đức ${f.duc>0?"+":""}${f.duc}`:"",f.aff?(host==="emp"?`Sủng ${f.aff>0?"+1":Math.round(f.aff/3)||-1}`:`${who} thiện cảm ${f.aff>0?"+":""}${f.aff}`):""].filter(Boolean);
  return `${head.join(", ")}${hk?` (${who} ${hk})`:""}: ${parts.join(", ")}`};
 const ap0=aaThieuLeApply;aaThieuLeApply=function(host,f0){const r=ap0.apply(this,arguments);try{toilMark(host)}catch(e){}return r}}

/* ---------- cards that meet people ---------- */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(!p||!toilOn(S))return A;
  /* thỉnh an Thái hậu / Hoàng hậu, Hoàng thượng: jaudit's hook put the line on the card; give "Vì sao" the real reasons */
  if(p.kind==="th"||p.kind==="hh"||p.kind==="emp"){const host=p.kind==="th"?"th":p.kind==="emp"?"emp":p.ref;const L=leAttire(S,"",host);
   return A.map(a=>{if(!a||!L.toil||typeof a.why!=="function"||(p.kind!=="emp"&&!/^Thỉnh an/.test(a.n)))return a;const w0=a.why;
    const o=Object.assign({},a,{why:()=>{const F=w0().filter(x=>!/^(Y phục dưới phẩm: thiếu lễ|Y phục giản dị hợp ý)/.test(x[0]));const hk=TOIL_HK[L.toil.hk];
     L.toil.why.forEach(([t,n])=>F.push([`${t[0].toUpperCase()+t.slice(1)}: ${toilWho(host)}${hk?" "+hk:""} ${n>0?"ưng ý":"phật ý"} (thiện cảm ${n>0?"+":""}${n}; không đổi cơ may)`,0]));return F}});
    /* everyone at Thỉnh an Hoàng hậu sees her: a showy dress / a perfect face makes the jealous ones jealous */
    if(p.kind==="hh"){const g=toilCrowd(false);if(g.n){o.risk=[o.risk,`phi tần thấy ta ${g.why}: ghen +${g.n}`].filter(Boolean).join(" · ");const r0=o.run,g0=o.go;
     if(r0)o.run=function(){toilCrowd(true);return r0.apply(this,arguments)};else o.go=function(){toilCrowd(true);return g0?g0.apply(this,arguments):undefined}}}
    return o})}
  /* a consort met in person: her nết decides */
  if(p.kind==="rival"&&p.ref){const v=p.ref,e=toilRival(v,false);if(!e)return A;
   return A.map(a=>{if(!a)return a;const o=Object.assign({},a,{risk:[a.risk,e.txt].filter(Boolean).join(" · ")});const r0=o.run,g0=o.go,f0=o.fail;
    if(r0)o.run=function(){toilRival(v,true);return r0.apply(this,arguments)};else{o.go=function(){toilRival(v,true);return g0?g0.apply(this,arguments):undefined};o.fail=function(){toilRival(v,true);return f0?f0.apply(this,arguments):undefined}}return o})}
 }catch(e){console.error("toil talkOpts",e)}return A}})();
function toilLook(){const rec=toilToday(S);const mk=toilMk(rec);const dr=toilDress(S,toilFOf(null));return{mk,dv:dr.v,showy:dr.style==="showy",plain:dr.style==="plain"}}
function toilGhenOf(v,L){const B=BAL.toil;let g=(L.showy?B.ghenShowy:0)+(L.mk==="tuyet"?B.ghenTuyet:0);if(!g)return 0;for(const t of traitsOf(v))if(B.ghenMul[t])g*=B.ghenMul[t];return g}
function toilRival(v,doIt){if(!v||!toilOn(S)||toilSeen(v))return null;const L=toilLook(),B=BAL.toil;const T=traitsOf(v);const frugal=T.some(t=>t==="Ân cần"||t==="Khiêm nhường");
 const g=Math.round(toilGhenOf(v,L));let aff=0,txt="";
 if(frugal&&(L.plain||L.mk==="moc")){aff=B.praisePlain;txt=`nàng ta chuộng giản dị: quý ta +${aff}`}else if(frugal&&L.showy){aff=B.frownShowy;txt=`ta ăn vận phô trương: nàng ta quý ta ${aff}`}
 if((L.mk==="diem"||L.mk==="vung")&&!txt){const n=BAL.toil.teaseGhen;txt=`nàng ta che miệng cười ${L.mk==="diem"?`lớp phấn son ${toilMkW("diem")}`:`gương mặt điểm trang ${toilMkW("vung")}`} của ta: bớt ghen ${n}`;if(doIt){v.ghen=cl((v.ghen||0)-n,0,100);toilMark(v)}return{txt,aff:0,g:0}}
 if(g)txt=[txt,`${L.showy?"ta ăn vận phô trương":`dung nhan ta ${toilMkW("tuyet")}`}: nàng ta ghen +${g}`].filter(Boolean).join(" · ");if(!txt)return null;
 if(doIt){if(aff)affAdd(v,S,aff);if(g)v.ghen=cl((v.ghen||0)+g,0,100);toilMark(v)}return{txt,aff,g}}
function toilCrowd(doIt){const L=toilLook();if(!L.showy&&L.mk!=="tuyet")return{n:0};if(toilSeen("crowd"))return{n:0};let n=0;const R=liveRivals(false).filter(v=>!v.queen&&!v.out);
 for(const v of R){const g=Math.round(toilGhenOf(v,L)*BAL.toil.crowd);if(g){n=Math.max(n,g);if(doIt)v.ghen=cl((v.ghen||0)+g,0,100)}}if(doIt)toilMark("crowd");
 return{n,why:L.showy?"ăn vận phô trương":`dung nhan ${toilMkW("tuyet")}`}}
/* NPCs: the same rule when they wait on Thái hậu (jaudit applies thiếu lễ; this adds the look of the day) */
(function(){try{if(typeof SOC==="object"&&SOC.serveTH){const r0=SOC.serveTH.run;SOC.serveTH.run=function(v){const r=r0.apply(this,arguments);try{let st="ok";try{st=aaThieuLe(v)?"plain":"ok"}catch(e){}
  const t=toilFx(v,"th",toilFOf("th"),st);if(t){v.th=cl((v.th||0)+t.aff,-100,100);if(t.danh)ap(v,{danh:t.danh})}}catch(e){}return r}}}catch(e){}})();

/* ---------- the morning choice: a card in Hành sự + a chip in the top bar ---------- */
function toilCanStart(){return toilOn(S)&&(S.buoi||0)===0&&!toilToday(S)&&!Q.length}
function toilCard(){const occ=toilOcc().map(o=>o.n.toLowerCase()).join(", ");
 return{n:"Điểm trang",t:"Ngồi trước gương: chọn y phục theo dịp hôm nay, kẻ mày, đánh phấn, chấm son.",k:BAL.toil.khac,c:{},o:100,w:{},b:0,toil:1,
  x:`hôm nay ${occ}: người gặp ta xét y phục và dung nhan · kèm: phô trương dễ bị ghen, ${toilMkW("moc")} bị chê (bỏ qua: mặc như hôm qua)`,
  go:()=>setTimeout(toilOpen,0)}}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(Array.isArray(deck)&&toilOn(S)&&(S.buoi||0)===0&&!toilToday(S)&&!deck.some(a=>a.toil))deck.unshift(toilCard())}catch(e){console.error(e)}return r}})();
/* the chip "Hôm nay: y phục hợp dịp · trang điểm đẹp" (k3 top bar row, from #hud2) */
function toilChip(){if(!toilOn(S))return null;const rec=toilToday(S);
 if(!rec)return(S.buoi||0)===0?{t:"Chưa điểm trang",full:"Hôm nay: chưa điểm trang",c:""}:{t:`Hôm nay ${toilMkW("moc")}`,full:`Hôm nay: ${toilMkW("moc")}`,c:""};
 const bad=rec.dv==="giandi"||rec.dv==="photruong"||rec.dv==="vuot"||rec.dv==="tang"||!rec.makeup||toilMk(rec)==="vung";
 const mk=toilMk(rec);const dv=TOIL_DV[rec.dv]||"như hôm qua";return{t:`Y phục ${dv} · ${toilMkW(mk)}`,full:`Hôm nay: y phục ${dv} · dung nhan ${toilMkW(mk)}`,c:bad||mk==="diem"?"hot":"ok"}}
/* the k3 top row (jk3 k3Stage) rebuilds #k3tt from #hud2's state chips (K3_STATE is private to jk3): the chip joins line 1 after each rebuild */
function toilChipPaint(){try{const tt=document.getElementById("k3tt");if(!tt)return;const l1=tt.querySelector(".k3l1");const c=S&&toilChip();const old=tt.querySelector('[data-k3="toil"]');
 if(!c||!l1){if(old)old.remove();return}const h=k3row("toil",String(c.t).replace(/[&<>"]/g,""),"",c.c);/* the kit's top-bar row builder (jk3 k3row), never own markup */
 if(old&&old.outerHTML===h)return;if(old)old.remove();l1.insertAdjacentHTML("beforeend",h)}catch(e){}}
(function(){let mo=null;const hook=()=>{const tt=document.getElementById("k3tt");if(!tt||mo)return;mo=new MutationObserver(()=>{if(!tt.querySelector('[data-k3="toil"]'))toilChipPaint()});mo.observe(tt,{childList:true,subtree:true})};
 if(typeof renderHUD==="function"){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);hook();toilChipPaint();return r}}})();
/* on window (capture): jk3's own top-row click handler is a document capture listener registered earlier */
window.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-k3="toil"],[data-hx="toil"]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();
 if(toilCanStart()){const i=Array.isArray(deck)?deck.findIndex(a=>a&&a.toil&&!a.done):-1;if(i>=0){act(i);return}if(!can(BAL.toil.khac))return;spend(BAL.toil.khac);toilOpen();return}
 const rec=toilToday(S);try{kpPop(b,rec?`<p>Sáng nay ta điểm trang: y phục ${TOIL_DV[rec.dv]}, ${rec.makeup?"dung nhan "+toilMkW(toilMk(rec))+" ("+rec.score+" phần)":"để "+toilMkW("moc")}.</p><p class="past">Người gặp ta hôm nay nhìn theo nết mình; thẻ việc ghi trước.</p>`
  :`<p>Hôm nay ta chưa điểm trang: mặc như hôm qua, ${toilMkW("moc")}.</p><p class="past">Mỗi buổi sáng có việc “Điểm trang” trong Hành sự (1 khắc).</p>`)}catch(x){}},true);

/* ---------- the mini-games ---------- */
const TOIL={st:null,geo:null};window.TOIL=TOIL;
function toilSkill(){const B=BAL.toil;let h=0;try{h=kg82Lv(S,"hoa")||0}catch(e){}let m=null;try{m=wdMama(S)}catch(e){}
 return{sk:Math.max(0,Math.min(1,(S.sac||0)/B.sacDiv+h/B.hoaDiv+(m?B.mama:0))),hoa:h,mama:m}}
function toilHUD(o){{const d=document.getElementById("kg82");if(d)d.classList.remove("kg-idle")}for(const k in o)kg82Set(k,o[k])}
/* bots (dev/measure inpage4, window.__bot) cannot play the overlay: an average sitting — keep the clothes, a face drawn from skill + chance */
function toilAuto(){const occ=toilOcc(),F=Math.max(...occ.map(o=>o.F)),d=toilDress(S,F),sk=toilSkill();/* the same table as the NPCs (toilNpcPlay), seeded: no Math.random */
 const col=toilColFix(S.toilette&&S.toilette.col);const R=toilNpcPlay(sk.sk,wdHash(String(S.name||"")+":"+toilWk()),col,col.want||"",d.style,occ.map(o=>o.k),S.rank);
 S.toilette={day:toilWk()*10,wk:toilWk(),score:R.score,makeup:true,style:d.style,dv:d.v,F,occ:occ.map(o=>o.k),look:R.look,slip:R.slip,parts:R.parts,col,auto:1}}
function toilOpen(){if(!S||S.dead)return;if(window.__bot){toilAuto();return}KG82.ctx="hoc";const occ=toilOcc();
 const d=kg82Open({art:"Điểm trang",title:"Trước gương đồng",how:"Hồi 1: chọn y phục theo dịp hôm nay. Hồi 2–4: tự tay kẻ mày lên đúng chân mày, đánh phấn hồng lên hai gò má, chấm son đúng chỗ khi vòng khép vừa môi. Không có đường chỉ: tay vụng thì mặt vụng."});
 if(!d)return;["chai-bg","chai-brow","chai-puff","chai-rouge"].forEach(n=>{try{kg82Img(n)}catch(e){}});try{KIT_VEIL.load()}catch(e){}
 TOIL.st={occ,F:Math.max(...occ.map(o=>o.F)),parts:{},dv:null,start:wdCur(S)};toilMkPre();toilHUD({score:"–",round:"1/4",time:"không hạn"});toilDressUI()}
/* (a) CHỌN Y PHỤC — the bag (kitInvGrid, the same items as Tư trang) + the worn slots + her portrait in the chosen dress */
const TOIL_SL=[["tram","Cài tóc","tramngoc"],["y","Y phục","luahang"],["wrist","Đeo tay","vongngoc"],["waist","Đeo eo","ngocboi"],["scent","Túi thơm","tuithom"]];
function toilWorn(sl){if(sl==="tram"||sl==="y"){const e=wdOf(S)[sl],w=wdItem(e);return w?{src:w.icon,name:w.n,grade:w.g|0,lux:wdLux(w.k),tip:w.n}:null}
 const e=(S.inv||[]).find(x=>x&&x.w&&!x.h&&IT[x.k]&&itm(x.k).sl===sl);if(!e)return null;let a=null;try{a=itemArt(e.k)}catch(x){}return{src:a?a.src:keqArt(e.k),name:itm(e.k).n,grade:a?a.grade|0:0,lux:luxVal(e.k),tip:itm(e.k).n}}
function toilPorAt(rank){const f0=figTierOf;try{figTierOf=function(w){return w===S?rank:f0.apply(this,arguments)};return figFor(S,"por")}catch(e){return""}finally{figTierOf=f0}}
function toilPor(){let P=0;try{const it=wdItem(wdOf(S).y);P=it?it.P:0}catch(e){}const rank=P>=1?Math.min(7,P-1):S.rank;const me=pMe();const src=toilPorAt(rank)||me.src;return{src,rank}}
function toilDressUI(){const box=kg82Box();if(!box)return;box.hidden=false;const st=TOIL.st;toilMkPre();
 const items=kinvItems().filter(x=>x&&x.g&&(WD_ITEMS[x.g.k]?x.g.wdPawn==null:(IT[x.g.k]&&["wrist","waist","scent"].includes(itm(x.g.k).sl)))).map(x=>Object.assign({},x,{cat:WD_ITEMS[x.g.k]?(WD_ITEMS[x.g.k].sl==="tram"?"tram":"y"):"trang"}));
 const sel=toilSelFind(items);items.forEach(x=>{x.sel=!!(sel&&sel.x===x)});
 const tabs=[{k:"tram",label:"Trâm cài"},{k:"y",label:"Y phục"},{k:"trang",label:"Trang sức"}];
 const slots=TOIL_SL.map(([k,label,gk])=>({k,label,item:toilWorn(k),ghost:keqArt(gk)||"",sel:!!(sel&&sel.sl===k)}));const x=luxOf(S),wb=wearBonus(S);
 const sum=kitChips([wb.sac?["Sắc",wb.sac]:null,wb.danh?["Danh",wb.danh]:null].filter(Boolean))+kitLuxChip(x);
 const por=toilPor();const me=pMe();
 const mama=toilSkill().mama;
 box.innerHTML=`<div class="toilw toil1">`+
  (mama?`<p class="past toilmama">${mama.name} khẽ nhắc: “Dịp ${st.F===2?"yến lễ phải lộng lẫy mà không vượt phẩm":st.F===1?"thỉnh an nên chỉnh tề, đủ phẩm":"thường ngày nên nhã nhặn, đừng phô trương"}.”</p>`:"")+
  `<div class="toilinv">${kitInvGrid({key:"toil",tabs,items,minRows:2,minSlots:12,onPick:toilPick,side:kitEquipSlots({key:"toil",title:"Đang mặc",slots,sum,onPick:toilSlotPick,col:true}),sum})}`+
  `<div class="toildet">${toilDetHTML(sel)}</div></div></div>`+
  `<div class="kg82act"><button class="${kg82Btn()}" id="toilok">Mặc bộ này</button><button class="${kg82Btn(true)}" id="toilkeep">Giữ đồ hôm qua<small>mặc như cũ</small></button></div>`;
 try{kitInvFit()}catch(e){}
 try{kitGameFigRefresh()}catch(e){}
 $("toilok").onclick=()=>toilDressDone(false);$("toilkeep").onclick=()=>toilDressDone(true)}
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest('[data-kinvkey="toil"][data-kinvtab]');if(t)setTimeout(()=>{if(TOIL.st&&!TOIL.st.dv)toilDressUI()},0)},true);
/* owner 15/11 "Khi bấm vào món đồ không thấy hiện thông tin món đồ": a tap SELECTS the cell (gold ring, KIT §70) and shows its kitItemDetail
   under the chest with the act button — Cài / Mặc / Đeo for a piece in the chest, Tháo for one she wears. Nothing is worn on a blind tap. */
function toilSlotOf(k){const w=WD_ITEMS[k];if(w)return w.sl;const it=IT[k];return it&&it.sl||null}
function toilSelFind(items){const s=TOIL.st&&TOIL.st.sel;if(!s)return null;
 if(s.sl){const it=toilWorn(s.sl);return it?{sl:s.sl}:null}
 const x=items.find(y=>y.g&&y.g.k===s.k&&!!y.g.wdSlot===!!s.wdSlot&&(s.wdSlot||!!y.g.w===!!s.w))||null;return x?{x}:null}
function toilRefOfSel(sel){if(!sel)return null;if(sel.x)return{g:sel.x.g};const sl=sel.sl;if(sl==="tram"||sl==="y")return{wdSlot:sl};
 const i=(S.inv||[]).findIndex(e=>e&&e.w&&!e.h&&IT[e.k]&&itm(e.k).sl===sl);return i>=0?{ix:i}:null}
function toilDetHTML(sel){const ref=toilRefOfSel(sel);if(!ref)return `<p class="past">Chạm một món trong rương hay một ô đang mặc để xem món ấy; mặc, cài hay tháo bằng nút dưới thông tin. Thay đồ ở đây không tốn thêm khắc.</p>`;
 const R=kitItemRef(ref);if(!R)return"";const sl=toilSlotOf(R.k);const slN=TOIL_SL.find(z=>z[0]===(sl==="hair"?"tram":sl));const fx=R.wd?plainFx(WD_ITEMS[R.k].w):kinvPlain(R.it&&R.it.w);
 let b;if(R.worn){b=sl==="y"?pbtn(`data-toilact="off"`,"Tháo","thành: cất vào rương","y phục chỉ thay: chọn bộ khác trong rương rồi chạm Mặc"):pbtn(`data-toilact="off"`,"Tháo",`thành: cất vào rương, ô ${slN?slN[1]:""} để trống`,"")}
 else{const n=sl==="tram"?"Cài":sl==="y"?"Mặc":"Đeo";b=pbtn(`data-toilact="wear"`,n,`thành: vào ô ${slN?slN[1]:""}${fx?", "+fx:""}`,"")}
 return kitItemDetail(R,{cls:"kidet-strip",acts:[b]})}
function toilPick(x){try{const g=x&&x.g;if(!g)return;const s=TOIL.st.sel;const same=s&&!s.sl&&s.k===g.k&&!!s.wdSlot===!!g.wdSlot&&(s.wdSlot||!!s.w===!!g.w);
 TOIL.st.sel=same?null:{k:g.k,wdSlot:g.wdSlot||null,w:!!g.w};sfx("tap")}catch(e){console.error(e)}toilDressUI()}
function toilSlotPick(x){try{const s=TOIL.st.sel;TOIL.st.sel=x.item&&!(s&&s.sl===x.k)?{sl:x.k}:null;sfx("tap")}catch(e){console.error(e)}toilDressUI()}
function toilAct(a){try{const s=TOIL.st.sel;if(!s)return;let ref=null;
  if(s.sl)ref=toilRefOfSel({sl:s.sl});else{const x=kinvItems().find(y=>y.g&&y.g.k===s.k&&!!y.g.wdSlot===!!s.wdSlot&&(s.wdSlot||!!y.g.w===!!s.w));ref=x?{g:x.g}:null}
  const R=ref&&kitItemRef(ref);if(!R)return;const sl=toilSlotOf(R.k);const tsl=sl==="hair"?"tram":sl;
  if(a==="off"){if(R.wd){if(sl==="tram")wdTakeOff(S,"tram")}else{const i=S.inv.indexOf(R.e);if(i>=0&&S.inv[i].w)wear(S,i)}TOIL.st.sel=null}
  else{if(R.wd){const i=S.inv.indexOf(R.e);if(i>=0)wdWear(S,i)}else{const i=S.inv.indexOf(R.e);if(i>=0&&!S.inv[i].w)wear(S,i)}TOIL.st.sel={sl:tsl}}
  sfx("tap")}catch(e){console.error(e)}toilDressUI()}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kg82 [data-toilact]");if(!b)return;e.stopPropagation();if(b.disabled)return;toilAct(b.dataset.toilact)},true);
function toilDressDone(keep){const st=TOIL.st;if(keep&&st.start!==wdCur(S)){/* "giữ đồ hôm qua" after trying things on: the first outfit is put back where it can be */}
 const dr=toilDress(S,st.F);st.dv=dr.v;st.style=dr.style;const good=dr.v==="hopdip"||dr.v==="hoppham";try{sfx(good?"learn-good":"learn-bad")}catch(e){}
 const why={hopdip:"Vừa phẩm, vừa dịp: người trọng lễ ưng ý.",hoppham:"Đúng phẩm, chưa thật hợp dịp hôm nay.",giandi:st.F?"Quá giản dị cho dịp gặp bề trên: người trọng lễ coi là thiếu tôn trọng; người chuộng giản dị lại khen.":"Quá giản dị.",
  photruong:"Quá phô trương: phi tần dễ ghen, người chuộng giản dị chê.",vuot:"Có món trên phẩm của ta: dễ bị hặc, bị thu.",tang:"Màu đỏ, vàng trong quốc tang: phạm tang."}[dr.v];
 const box=kg82Box();box.innerHTML=`<div class="kgr">${kitRows([["Y phục",`<span class="ef ${good?"g":"r"}"><b>${TOIL_DV[dr.v][0].toUpperCase()+TOIL_DV[dr.v].slice(1)}</b></span>`],["Ghi chú",[why,`đo theo dịp: ${st.occ.slice().sort((a,b)=>b.F-a.F)[0].n.toLowerCase()}`],"n"]])}</div>`+
  `<div class="kg82act"><button class="${kg82Btn()}" id="toilmk">Trang điểm<small>kẻ mày, đánh phấn, chấm son</small></button><button class="${kg82Btn(true)}" id="toilmoc">Để ${toilMkW("moc")}</button></div>`;
 $("toilmk").onclick=()=>toilColUI();$("toilmoc").onclick=()=>toilFinish(false)}

/* (b) TRANG ĐIỂM — three hồi on her face in the mirror */
const TOIL_MIR={cx:527/1024,cy:282/1024,rx:176/1024,ry:194/1024};/* the glass of the bronze mirror in mg-chai-bg (1024²) */
function toilFace(src){const n=String(src||"").split("?")[0].split("/").pop();let r=null;
 /* the measured mouth (img/toil-fit.json) defines the face box when there is one: mouth at (.46, .49) of the box, like the veil box */
 try{const v=TOIL_FIT.fit&&TOIL_FIT.fit[n];if(v)return[v[0]-.46*v[6],v[1]-.49*v[7],v[6],v[7],v[9]||0]}catch(e){}try{r=KIT_VEIL.fit&&KIT_VEIL.fit[n]}catch(e){}return r||[32,37,34,22,0]}
function toilGeom(W,H,src){const ky=H*.94/(TOIL_MIR.ry*2*1024),k=Math.min(ky,W/(1024*.62));const S0=1024*k;const ox=W/2-TOIL_MIR.cx*S0,oy=H/2-TOIL_MIR.cy*S0;
 const mx=W/2,my=H/2,rx=TOIL_MIR.rx*S0,ry=TOIL_MIR.ry*S0;const f=toilFace(src);const IW=384,IH=506;const fx=f[0]/100*IW,fy=f[1]/100*IH,fw=f[2]/100*IW,fh=f[3]/100*IH,rot=(f[4]||0)*Math.PI/180;
 const s=rx*1.55/fw;const ax=toilAxisX(src),fcx=ax!=null?ax*IW:fx+fw/2,fcy=fy+fh*.3;/* the eye-mesh axis sits in the middle of the glass (the face-box centre when there is no mesh) */const cs=Math.cos(rot),sn=Math.sin(rot);
 const T=(u,v)=>{/* face-box units (u: 0..1 of fw from the left, v: of fh from the top) → canvas */const px=fx+u*fw-(fx+fw/2),py=fy+v*fh-(fy+fh/2);const qx=px*cs-py*sn+(fx+fw/2),qy=px*sn+py*cs+(fy+fh/2);return[mx+(qx-fcx)*s,my+(qy-fcy)*s]};
 return{bg:{x:ox,y:oy,s:S0},mx,my,rx,ry,img:{x:mx-fcx*s,y:my-fcy*s,w:IW*s,h:IH*s},T,fws:fw*s,ax:ax!=null}}
function toilQuad(a,c,b,n){const L=[];for(let i=0;i<=n;i++){const t=i/n;L.push([(1-t)*(1-t)*a[0]+2*(1-t)*t*c[0]+t*t*b[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*c[1]+t*t*b[1]])}return L}
function toilMakeup(){const st=TOIL.st,box=kg82Box();box.innerHTML="";box.hidden=false;const C=kg82Canvas(box,.86,620),{g,W,H}=C;C.cv.style.touchAction="none";
 const por=toilPor();const face=new Image();face.decoding="async";face.src=typeof IMG_U==="function"?IMG_U(por.src):por.src;let G=toilGeom(W,H,por.src);const sk=toilSkill();st.sk=sk;
 /* diemtrang-score (owner 16/11): NO guide lines. The hidden ideal is THIS face's own brows / cheekbones / mouth (img/mk-fit face points;
    a picture without points uses the measured average, BAL.toil.fb) — anchored per portrait, so the brow target is the painted brow itself */
 const file=String(por.src||"").split("?")[0].split("/").pop();let I,brows,cheeks,lips,lr,puffR,cpts;
 function anchor(){const mv=MK_FIT.get(file);if(mv&&!G.ax){G=toilGeom(W,H,por.src);base=null}/* the mesh arrived after the board opened: re-centre on the eye axis before anchoring */const J=toilIdeal(mv,G.img,G.fws);if(!J)return false;I=J;brows=I.brows.map(b=>b.c);cheeks=I.cheeks;lips=I.lips;lr=I.lr;puffR=cheeks[0].r*BAL.toil.cheek.puff;
  const m=BAL.toil.cheek.margin,stp=puffR*BAL.toil.cheek.step,x0=Math.min(...cheeks.map(c=>c.x-c.r*m)),x1=Math.max(...cheeks.map(c=>c.x+c.r*m)),y0=Math.min(...cheeks.map(c=>c.y-c.r*m)),y1=Math.max(...cheeks.map(c=>c.y+c.r*m));
  cpts=[];for(let x=x0;x<=x1;x+=stp)for(let y=y0;y<=y1;y+=stp)cpts.push({x,y,c:0});pdirty=true;st.mesh=true;return true}
 /* the board waits (brush off, "đang soi gương") until THIS face's points are in; never a guessed face (review r1) */
 let pdirty=true;let ready=anchor();const wait0=performance.now();
 /* her picked colours (§60) on the tools */const pc=toilColFix(st.col),CM=toilColRGB("ma",pc.ma).join(","),CB=toilColRGB("may",pc.may).join(","),CS=toilColRGB("son",pc.son).join(",");
 const B=BAL.toil.cheek,hi=B.doseHi+B.doseHiSk*sk.sk,PB=BAL.toil.pop;
 let phase=0,stop=false,raf=0,t0=0,strokes=[],cur=null,dots=[],li=0,ring0=performance.now();const pops=[];let ptr=null;
 const CK=TOIL.clock||1;/* test hook: a slow machine plays at clock× time */const LIM=[BAL.toil.lim[0]*CK,BAL.toil.lim[1]*CK,0];/* each hồi's clock starts at her first touch */const per=(BAL.toil.ring[0]+BAL.toil.ring[1]*sk.sk)*CK;
 try{C.cv.scrollIntoView({block:"center"})}catch(e){}
 TOIL.geo={phase:()=>phase,ready:()=>ready,brows:()=>(brows||[]).map(L=>L.map(([x,y])=>C.client(x,y))),cheeks:()=>(cheeks||[]).flatMap(c=>[[c.x,c.y]].concat([0,1,2,3,4,5].map(i=>[c.x+Math.cos(i*Math.PI/3)*c.r*.5,c.y+Math.sin(i*Math.PI/3)*c.r*.5]))).map(([x,y])=>C.client(x,y)),
  lip:()=>ready&&lips[li]?Object.assign(C.client(lips[li][0],lips[li][1]),{ring:ringR()/lr}):null,get puffR(){return puffR},get lr(){return lr}};
 function ringR(){const t=((performance.now()-ring0)%per)/per;return lr*(4.2-3.8*t)}
 const browQ=()=>toilBrowQ(strokes,I,sk.sk).q,powQ=()=>toilPowderQ(cpts,I,sk.sk),sonQ=()=>dots.reduce((a,d)=>a+d.q,0)/3;
 /* the board painting + her face in the glass are drawn once into an offscreen layer (re-made when a picture arrives) */
 let base=null,baseK="";function baseLayer(){const bg=kg82Img("chai-bg");const k=(bg.complete&&bg.naturalWidth?1:0)+","+(face.complete&&face.naturalWidth?1:0);if(base&&k===baseK)return base;baseK=k;
  const c=document.createElement("canvas"),r=Math.min(2,window.devicePixelRatio||1);c.width=Math.round(W*r);c.height=Math.round(H*r);const x=c.getContext("2d");x.setTransform(r,0,0,r,0,0);
  x.fillStyle="#efe0c6";x.fillRect(0,0,W,H);if(bg.complete&&bg.naturalWidth)x.drawImage(bg,G.bg.x,G.bg.y,G.bg.s,G.bg.s);
  x.save();x.beginPath();x.ellipse(G.mx,G.my,G.rx,G.ry,0,0,Math.PI*2);x.clip();x.fillStyle="#d9c7a3";x.fillRect(G.mx-G.rx,G.my-G.ry,G.rx*2,G.ry*2);
  if(face.complete&&face.naturalWidth)x.drawImage(face,G.img.x,G.img.y,G.img.w,G.img.h);x.restore();return base=c}
 /* the powder she has put on, wherever she rubbed (one offscreen layer, redrawn only when the dose changed); too much turns chalky */
 let pl=null;function powderLayer(){if(pl&&!pdirty)return pl;pdirty=false;if(!pl){pl=document.createElement("canvas");pl.width=W;pl.height=H}const x=pl.getContext("2d");x.clearRect(0,0,W,H);
  const rr=puffR*.8;for(const p of cpts){if(p.c<=0)continue;const over=p.c>hi;x.globalAlpha=over?Math.min(.55,.18+.1*(p.c-hi)):Math.min(.2,.07*p.c);x.fillStyle=over?"#fff":`rgb(${CM})`;x.beginPath();x.arc(p.x,p.y,rr,0,Math.PI*2);x.fill()}
  x.globalAlpha=1;return pl}
 function draw(now){g.drawImage(baseLayer(),0,0,W,H);
  g.save();g.beginPath();g.ellipse(G.mx,G.my,G.rx,G.ry,0,0,Math.PI*2);g.clip();
  g.drawImage(powderLayer(),0,0,W,H);
  /* brow ink */
  g.strokeStyle=`rgba(${CB},.78)`;g.lineWidth=Math.max(2,G.fws*.018);g.lineCap="round";g.lineJoin="round";for(const L of strokes.concat(cur?[cur]:[])){if(L.length<2)continue;g.beginPath();g.moveTo(L[0][0],L[0][1]);L.forEach(p=>g.lineTo(p[0],p[1]));g.stroke()}
  dots.forEach(d=>{const rg=g.createRadialGradient(d.x,d.y,0,d.x,d.y,lr*.9);rg.addColorStop(0,`rgba(${CS},.85)`);rg.addColorStop(1,`rgba(${CS},0)`);g.fillStyle=rg;g.beginPath();g.arc(d.x,d.y,lr*.9,0,Math.PI*2);g.fill()});
  g.fillStyle="rgba(255,236,200,.08)";g.fillRect(G.mx-G.rx,G.my-G.ry,G.rx*2,G.ry*2);g.restore();
  /* the lip ring is the only live mark (timing); brows and cheeks have none */
  if(phase===2&&lips[li]){const [x,y]=lips[li];g.save();g.strokeStyle="rgba(160,20,30,.9)";g.lineWidth=2;g.beginPath();g.arc(x,y,ringR(),0,7);g.stroke();g.restore()}
  /* the tool follows the finger */
  if(ptr){if(phase===0)kg82Spr(g,"chai-brow",ptr[0],ptr[1],null,G.fws*.55,{ax:.95,ay:.02});else if(phase===1)kg82Spr(g,"chai-puff",ptr[0],ptr[1],puffR*2.2,null,{alpha:.92})}
  if(phase===2)kg82Spr(g,"chai-rouge",W-Math.min(70,W*.12),H-Math.min(60,H*.13),Math.min(96,W*.16),null,{});
  g.font=`700 15px ${kg82Col("--display","serif")}`;g.textAlign="center";g.fillStyle=kg82Col("--ink","#2a1a12");kg82Lbl(g,["Tự tay kẻ mày lên đúng chân mày","Đánh phấn hồng lên hai gò má","Chạm khi vòng đỏ khép vừa môi"][phase]||"",W/2,22,W-20);
  kg82DrawPops(g,pops,now)}
 function next(){if(!ready||stop)return;/* review r2: nothing finishes before THIS face is anchored */if(phase===0){st.parts.brow=browQ();kg82Pop(pops,W/2,H*.2,st.parts.brow>=PB.brow[0]?"Mày cong như liễu!":st.parts.brow>=PB.brow[1]?"Mày tạm đều":"Nét mày lệch",st.parts.brow>=PB.brow[1]?kg82Col("--good","#2d7a52"):kg82Col("--red","#c23b22"))}
  else if(phase===1){const r=powQ();st.parts.powder=r.q;st.parts.over=r.over;st.parts.thick=r.thick;kg82Pop(pops,W/2,H*.2,r.q>=PB.powder[0]?"Phấn mịn đều!":r.over>PB.over?"Phấn dày quá":r.spill>PB.spill?"Phấn lem ra ngoài":"Phấn chưa đều",r.q>=PB.powder[1]?kg82Col("--good","#2d7a52"):kg82Col("--red","#c23b22"))}
  phase++;t0=0;ring0=performance.now();cur=null;ptr=null;
  if(phase>=3){st.parts.son=sonQ();stop=true;draw(performance.now());setTimeout(()=>toilFinish(true),650);return}
  toilHUD({round:`${phase+2}/4`});setBtn()}
 function setBtn(){const a=box.querySelector(".kg82act");const h=phase<2?`<div class="kg82act"><button class="${kg82Btn()}" id="toilnx"${ready?"":" disabled"}>${phase===0?"Kẻ xong":"Đánh xong"}</button></div>`:"";if(a)a.remove();if(h){box.insertAdjacentHTML("beforeend",h);$("toilnx").onclick=()=>{if(!stop&&ready)next()}}}
 function pdown(e){if(stop||!ready)return;e.preventDefault();C.__down=true;if(!t0)t0=performance.now();const p=C.at(e);ptr=p;if(phase===0){cur=[p]}else if(phase===2)tapLip(p);else if(phase===1){try{kitSfx("mgPuff")}catch(x){}}try{C.cv.setPointerCapture(e.pointerId)}catch(x){}}
 function pmove(e){if(stop||!ready)return;const p=C.at(e);if(e.pointerType==="mouse"&&!e.buttons&&phase!==2){ptr=p;return}ptr=p;if(phase===0&&cur)cur.push(p)}
 let bs=0,pq=0,pqT=0;function pup(e){C.__down=false;if(phase===0&&cur){if(cur.length>1)strokes.push(cur);cur=null;bs=browQ();try{kitSfx("mgBrush")}catch(x){}}if(e.pointerType!=="mouse")ptr=null}
 function tapLip(p){const t=lips[li];if(!t)return;const q=toilLipQ((ringR()-lr)/lr,Math.hypot(p[0]-t[0],p[1]-t[1]),lr,sk.sk);
  dots.push({x:p[0],y:p[1],q});kg82Pop(pops,t[0],t[1]-lr*2.4,q>=PB.lip[0]?"Vừa khéo!":q>=PB.lip[1]?"Hơi lệch":"Lem son",q>=PB.lip[1]?kg82Col("--good","#2d7a52"):kg82Col("--red","#c23b22"));
  li++;ring0=performance.now();if(li>=3)next()}
 C.cv.addEventListener("pointerdown",pdown);C.cv.addEventListener("pointermove",pmove);C.cv.addEventListener("pointerup",pup);C.cv.addEventListener("pointercancel",pup);
 let last=performance.now();
 function frame(now){if(stop)return;const dt=Math.min(250,now-last);last=now;
  /* the face points may still be on their way: hold the board; if they never come, her hand is played from skill (the NPC table) */
  if(!ready){if(anchor()){ready=true;t0=0;setBtn()}else if(now-wait0>BAL.toil.meshWait){const R=toilNpcPlay(sk.sk,wdHash(String(S.name||"")+":"+toilWk()),toilColFix(st.col),(st.col&&st.col.want)||"",st.style,st.occ.map(o=>o.k));
   Object.assign(st.parts,R.parts);st.auto=1;stop=true;setTimeout(()=>toilFinish(true),0);return}else{g.drawImage(baseLayer(),0,0,W,H);g.font=`700 15px ${kg82Col("--display","serif")}`;g.textAlign="center";g.fillStyle=kg82Col("--ink","#2a1a12");kg82Lbl(g,"Đang soi gương…",W/2,22,W-20);raf=requestAnimationFrame(frame);return}}
  if(phase===1&&ptr&&C.__down){for(const p of cpts)if(Math.hypot(p.x-ptr[0],p.y-ptr[1])<=puffR){p.c+=dt/(400*CK);pdirty=true}}
  if(phase===2&&lips[li]&&now-ring0>per*3){dots.push({x:lips[li][0]+lr*3,y:lips[li][1],q:0});li++;ring0=now;if(li>=3)next()}
  const lim=LIM[phase];const left=lim?Math.max(0,lim-(t0?now-t0:0)):0;
  if(phase===1&&now-pqT>250){pqT=now;pq=powQ().q}
  const sc=Math.round(100*(.4*(phase>0?st.parts.brow||0:bs)+.3*(phase>1?st.parts.powder||0:phase===1?pq:0)+.3*(phase===2?sonQ():0)));
  toilHUD({score:`${sc}/100`,time:lim?`${Math.ceil(left/1000)} giây`:"theo nhịp"});if(lim&&left<=0){next();if(stop)return}
  draw(now);raf=requestAnimationFrame(frame)}
 toilHUD({round:"2/4"});setBtn();raf=requestAnimationFrame(frame);KG82.run={stop:()=>{stop=true;cancelAnimationFrame(raf)}};
 TOIL.test={get I(){return I},get brows(){return brows},get cpts(){return cpts},get lips(){return lips},next,browQ,powQ,sonQ,setPowder:v=>{cpts.forEach(p=>p.c=cheeks.some(c=>Math.hypot(p.x-c.x,p.y-c.y)<=c.r)?v:0);pdirty=true},strokes,dots,get lr(){return lr}}}
function toilFinish(made){const st=TOIL.st;if(!st)return;try{if(KG82.run&&KG82.run.stop)KG82.run.stop()}catch(e){}KG82.run=null;
 const sk=toilSkill();let score=0,raw=0,bonus=0;if(made){const P=st.parts;raw=Math.round(100*(.4*(P.brow||0)+.3*(P.powder||0)+.3*(P.son||0)));bonus=Math.round(BAL.toil.skillShare*sk.sk);score=Math.max(0,Math.min(100,Math.round(raw*(100-BAL.toil.skillShare)/100)+bonus))}
 if(!st.dv){const d=toilDress(S,st.F);st.dv=d.v;st.style=d.style}
 /* diemtrang-score: vụng = a part that went wrong (or a low total); diêm dúa = her choices heavier than the day allows (seeded per person + day + play,
    revealed only here); else by the total */
 const P0=st.parts,col0=toilColFix(st.col),occK=st.occ.map(o=>o.k);
 const L=made?toilLookOf({brow:P0.brow||0,powder:P0.powder||0,son:P0.son||0},score,toilHeavy(col0,col0.want||"",st.style,P0.over||0),toilAllow(occK,S.rank),
  wdHash([S.name||"",toilWk(),Math.round(100*(P0.brow||0)),Math.round(100*(P0.powder||0)),Math.round(100*(P0.son||0))].join(":"))):{look:null};const look=L.look;
 S.toilette={day:toilWk()*10,wk:toilWk(),score,makeup:!!made,style:st.style,dv:st.dv,F:st.F,occ:occK,look};if(L.slip)S.toilette.slip=L.slip;if(made){S.toilette.col=toilColFix(st.col);S.toilette.col.seed=toilWk()}TOIL.prev=null;
 const mk=toilMk(S.toilette);const good=mk==="dep"||mk==="tuyet";const tOk=made&&good?true:made&&(mk==="vung"||mk==="diem")?false:null;if(tOk===null)try{kitSfx("mirror")}catch(e){}/* win / lose: kg82ShowRes(html,tOk) below plays it once */
 log(`Sáng nay ta điểm trang: y phục ${TOIL_DV[st.dv]}, ${made?`dung nhan ${toilMkW(mk)} (${score} phần)`:`để ${toilMkW("moc")}`}.`);
 const rows=[["Y phục",`<span class="ef ${st.style==="fit"?"g":"r"}"><b>${TOIL_DV[st.dv]}</b></span>`]];
 if(made){const P=st.parts;rows.push(["Kẻ mày",`<span class="ef t">${Math.round(100*(P.brow||0))}/100</span>`],["Đánh phấn",`<span class="ef t">${Math.round(100*(P.powder||0))}/100</span>`],["Chấm son",`<span class="ef t">${Math.round(100*(P.son||0))}/100</span>`],
  ["Phần chơi",`<span class="ef t">${Math.round(raw*(100-BAL.toil.skillShare)/100)}</span>`],[`Tay nghề (Họa bậc ${sk.hoa}, Sắc ${S.sac|0}${sk.mama?", "+sk.mama.name+" giúp":""})`,kitChip("cộng",bonus,"g")],["Dung nhan",`<span class="ef ${good?"g":mk==="vung"?"r":"t"}"><b>${TOIL_MK[mk]} · ${score} phần</b></span>`])}
 else rows.push(["Dung nhan",`<span class="ef n">${TOIL_MK.moc}</span>`]);
 /* what today's look does to the people she will meet (the real numbers; the nết shows only once known) */
 const eff=[];try{for(const h of ["th",qOn()?rivals[0]:null,"emp"].filter(Boolean)){if(h==="th"&&S.thDead)continue;const r=leAttire(S,"",h);const t=r.toil;if(!t||!t.aff)continue;
  eff.push(`${toilWho(h)}: ${h==="emp"?(t.aff>0?"Sủng +1":"Sủng -1"):`thiện cảm ${t.aff>0?"+":""}${t.aff}`} khi gặp hôm nay`)}}catch(e){}
 const html=`<div class="kgr">${kitRows(rows.concat([["Hôm nay",eff.length?eff:["không ai đổi cách nhìn ta"],"n"]]))}</div><div class="kg82act"><button class="${kg82Btn()}" id="toildone">Đã hiểu</button></div>`;
 toilHUD({score:made?`${score}/100`:"–",round:"4/4",time:"đã xong"});const showRes=()=>{kg82ShowRes(html,tOk);const b=$("toildone");if(b)b.onclick=()=>{TOIL.st=null;kg82Close();render()}};
 try{toilReveal({look:mk==="moc"?"moc":look==="diem"?"diem":mk,made,score,good,pre:made?toilPreName(S.toilette.col,look):"" },showRes)}catch(e){showRes()}
 try{save()}catch(e){}}
(function(){const st=document.createElement("style");st.id="toil-css";st.textContent=`
#kg82 .toilw{display:grid;grid-template-columns:minmax(150px,220px) 1fr;gap:10px 14px;align-items:start}
#kg82 .toilw .toilfig .pcp{max-width:220px;margin:0 auto 6px}
#kg82 .toilw .kinv .kinvg{grid-template-columns:repeat(auto-fill,minmax(54px,1fr))}
#kg82 .toilw .toildet{margin-top:8px}#kg82 .toilw .toildet>.past{margin:4px 0}
#kg82 .toilw.toil1{grid-template-columns:1fr}#kg82 .toilw.toil1 .toilmama{margin:0}
/* kv3:.kv1 */:where(.kv1) #kg82 .toilw{grid-template-columns:1fr}:where(.kv1) #kg82 .toilw .toilfig{display:block}`;document.head.appendChild(st)})();

/* ---------- REACTIONS POP UP (owner 15/11): every reaction to her look is an event dialog with the person, never only a log line ----------
   Kit event-with-person layout (KIT 32.7: `who` → the person full-body on the left; kitEventDp when kit-fig2 lands). Event choices show the
   cost only (28.6 hideOut). At most BAL.toil.popMax dialogs per occasion (one act), the strongest first; the rest join the last one as a line.
   Event keys (banner art to come, ab06): TOIL_EV. */
Object.assign(BAL.toil,{popMax:2,replyDanh:1,replyWin:50,sorryBack:.5});
const TOIL_EV={"th-scold":"Thái hậu chê dung nhan","th-praise":"Thái hậu khen","hh-scold":"Hoàng hậu chê dung nhan","hh-praise":"Hoàng hậu khen",
 "emp-like":"Hoàng thượng ưng ý","emp-dislike":"Hoàng thượng không vừa mắt","rival-jealous":"Phi tần ghen","rival-tease":"Phi tần cười cợt",
 "rival-praise":"Phi tần khen giản dị","crowd-jealous":"Cả hậu cung để ý"};
window.TOIL_EV=TOIL_EV;
const TOIL_POP=[];let TOIL_POPT=0;
/* palace voice (owner 16/11 19:38Z, VANPHONG §2): every reaction is a POOL of lines by look and mood, addressed through the one core
   (jvoice kAddr: {goi} = how the speaker calls her, {xung} = the speaker's self word) and never repeated within BAL.voice.noRepeat tuần (kLine) */
const TOIL_SAY={
 "th-scold":{
  moc:["“Mặt mộc mà đến thỉnh an ai gia sao? Thật chẳng ra thể thống.”","“Người trong cung mà để mặt trơn như cung nữ quét sân, {goi} không thấy thẹn ư?”","“Thỉnh an ai gia cũng là lễ. Lễ mà sơ sài thì lòng cũng sơ sài.”","“Mặt chẳng điểm chút son, {goi} đến để ai gia xót hay để ai gia giận?”","“Người không biết trọng mình thì ai trọng cho. Về trang điểm lại rồi hãy đến.”","“Hôm nay {goi} đến vội quá, đến cả thể diện cũng bỏ quên ở cung rồi.”"],
  vung:["“Phấn son lem nhem thế kia, cung nữ hầu {goi} không biết việc sao?”","“Son phấn chỗ đậm chỗ nhạt, nhìn như bức tranh vẽ dở. Về bảo người hầu học lại đi.”","“Trang điểm vụng về thế này, ra ngoài người ta cười cả cung của {goi}.”","“Lông mày kẻ lệch, phấn đánh chẳng đều. Người hầu bên {goi} nên đổi đi thôi.”","“Trang điểm thế này, ai gia nhìn còn mỏi mắt, huống hồ là Hoàng đế.”","“Vụng tay thì học, chứ đừng đem cái vụng ra trước mặt ai gia.”"],
  diem:["“Son phấn đậm quá, trông chẳng giống con nhà nề nếp.”","“Đỏ thắm thế này, {goi} định đi thỉnh an hay đi hát tuồng?”","“Hoa diễm quá thì mau tàn. Người trong cung nên biết giữ chừng mực.”","[lo,mid]“Phấn dày như tường vôi. {Goi} vào cung để hầu hạ, đâu phải để lên đài hát.”","“Ai gia già rồi, mắt kém, mà vẫn thấy chói vì son phấn của {goi}.”","“Người đoan trang không cần nhiều phấn. {Goi} nhớ lấy.”"],
  plain:["“Ăn vận sơ sài như vậy mà dám đến trước mặt ai gia?”","“Áo vải mộc mạc đến thỉnh an, người ngoài lại tưởng ai gia bạc đãi {goi}.”","“Giản dị là đức, sơ sài là thất lễ. {Goi} phân không ra hai chữ ấy sao?”","“Tiết kiệm là đức, nhưng thỉnh an ai gia mà mặc thế này thì là coi thường.”","“Phẩm phục để đâu mà không mặc? Hay Nội vụ phủ quên phần của {goi}?”","“Áo xống thế kia, người ngoài nhìn vào lại nói hậu cung thiếu thốn.”"],
  showy:["[lo,mid,hi]“Lộng lẫy thế này, {goi} quên mất ai mới là chủ lục cung rồi chăng?”","“Châu ngọc đầy người, đi một bước kêu ba tiếng. Ai gia nghe mà nhức đầu.”","“Cây cao thì đón gió. {Goi} khoe ra như vậy, chẳng sợ gió to sao?”","“Ai gia còn chưa cài nhiều trâm như thế. {Goi} định so với ai?”","“Lộng lẫy quá hóa lố. Nhớ lấy phận mình.”","“Vàng bạc trên đầu nặng, chỉ e cái đầu chẳng gánh nổi.”"]},
 "th-praise":{
  plain:["“Giản dị thế này mới phải đạo, ai gia thích.”","“Không châu ngọc mà vẫn sáng sủa, ấy là biết giữ mình.”","“{Goi} ăn vận nhã nhặn, chẳng tranh chẳng giành, ai gia nhìn cũng thấy yên lòng.”","“Mộc mạc mà đoan chính, đúng là người hiểu phép tiết kiệm của tổ tông.”","“Mộc mạc mà sạch sẽ, nhìn {goi} ai gia lại nhớ những ngày còn ở nhà.”","“Biết tiết kiệm là biết giữ phúc. {Goi} cứ thế mà làm.”"],
  neat:["“Hôm nay ăn vận đoan trang, thật vừa mắt ai gia.”","“Đúng mực, đúng phẩm. Người trong cung nên như {goi} vậy.”","“Y phục chỉnh tề, dung nhan thanh tú. {Goi} có lòng, ai gia biết.”","“Đoan trang mà không phô trương, mới ra dáng người của hoàng gia.”","“Phẩm phục chỉn chu, cử chỉ khoan thai. Tốt, tốt lắm.”"]},
 "hh-scold":{
  moc:["“{Goi} đến thỉnh an {xung} mà mặt mộc thế này ư?”","“Lục cung đều trang điểm chỉnh tề, chỉ mình {goi} để mặt trơn. Là coi nhẹ lễ hay coi nhẹ {xung}?”","“Mặt mộc thì thanh, nhưng thỉnh an không phải chỗ để thanh.”","“Mặt mộc mà ra ngoài, người ta lại bảo Càn Ninh cung không có phép tắc.”","“{Goi} ốm sao? Nếu không thì lần sau chớ để {xung} thấy cảnh này.”","“Không trang điểm thì cũng phải chỉnh tề. Lễ không thể thiếu.”"],
  diem:["“Son phấn của {goi} hôm nay… có phần quá tay.”","“Đậm thế này, khéo người ta tưởng hôm nay có yến lớn.”","“Môi đỏ như son, {goi} định để ai ngắm đây?”","“Thỉnh an mà như dự yến, {goi} vội vàng muốn người ta nhìn thấy mình quá.”","“Son đỏ quá, người ta nhìn {goi} mà quên mất mình đang ở đâu.”","“Đậm đà thì hợp đêm hội. Sáng thỉnh an, {goi} nên nhã hơn.”"],
  plain:["“Y phục sơ sài quá, người ngoài nhìn vào lại bảo {xung} không dạy dỗ.”","“Giản dị là tốt, nhưng thể diện của lục cung cũng là thể diện của {xung}.”","“Áo này mặc ở cung mình thì được, đến Càn Ninh cung thì kém quá.”","“Áo cũ thế này, người ta lại tưởng {xung} cắt xén bổng lộc của {goi}.”","“Giản dị thì {xung} quý, nhưng đến mức này là thiếu lễ rồi.”","“Lần sau {goi} nhớ mặc phẩm phục cho đúng. Lục cung đều nhìn cả đấy.”"],
  showy:["“{Goi} ăn vận lộng lẫy như vậy, định át cả {xung} sao?”","“{Goi} hôm nay rực rỡ quá, hoa nở rộ thì e chẳng bền đâu.”","“Trâm vàng cài kín tóc. Phẩm của {goi} cài được bấy nhiêu thật ư?”","“Ánh vàng chói cả mắt {xung}. {Goi} có ý gì chăng?”","“Đẹp thì đẹp, nhưng đẹp lấn cả người trên thì chẳng phải là đẹp.”","“Lục cung nhìn {goi}, rồi nhìn {xung}. {Goi} hiểu ý {xung} chứ?”"]},
 "hh-praise":{
  plain:["“Giản dị mà thanh nhã, {xung} rất thích.”","“Không phô trương mà vẫn có thần thái. {Goi} khéo lắm.”","“Lục cung mà ai cũng biết tiết kiệm như {goi} thì {xung} đỡ lo biết bao.”","“Thanh đạm thế này, mới thấy {goi} là người biết điều.”","“Không cần châu ngọc mà vẫn sáng sủa, {xung} khen thật lòng.”","“{Goi} giữ được sự giản dị giữa chốn phồn hoa, hiếm có lắm.”"],
  neat:["“{Goi} hôm nay thật chỉn chu, đúng là biết lễ.”","“Phẩm phục ngay ngắn, trang điểm vừa phải. Đáng làm gương cho các cung.”","“Thấy {goi} chu đáo thế này, {xung} cũng yên tâm.”","“Biết lễ thì người kính. {Goi} cứ giữ như vậy.”","“Y phục đúng phẩm, cử chỉ đúng lễ. {Xung} chẳng có gì phải nhắc.”","“Hôm nay {goi} thật ra dáng người trong cung.”"]},
 "emp-like":{
  fair:["“Hôm nay {goi} tươi tắn quá.”","“Đẹp như hoa đầu xuân.”","“Hôm nay {xung} chỉ thấy {goi}.”","“{Goi} hôm nay khác hẳn.”","“Hoa trong ngự uyển cũng chẳng bằng.”","“Nhìn {goi}, {xung} hết mệt.”"],
  any:["“Ăn vận như vậy rất hợp ý {xung}.”","“Nhã nhặn mà có duyên. {Goi} hiểu {xung}.”","“Thế này là vừa, {xung} thích.”","“Dễ nhìn. {Xung} ngồi thêm chút.”","“{Goi} khéo chọn y phục.”","“Giản dị mà tinh tế, đúng ý {xung}.”"]},
 "emp-dislike":{
  moc:["“Sao hôm nay trông nhợt nhạt thế?”","“{Goi} ốm sao? Mặt nhợt quá.”","“Trông {goi} chẳng vui chút nào.”","“Sao chẳng điểm chút son? {Goi} không vui sao?”","“Như vừa ốm dậy vậy.”","“Trông {goi} mệt quá.”"],
  diem:["“Son phấn đậm quá, {xung} không quen.”","“Rửa bớt phấn đi.”","“Hoa lệ quá, lại không giống {goi} nữa.”","“Đậm quá, chẳng thấy {goi} đâu.”","“{Xung} nhìn không quen mắt.”","“Phấn dày quá, khi cười e rơi mất.”"],
  plain:["“Sao ăn vận sơ sài vậy?”","“Nội vụ phủ bớt xén của {goi} sao?”","“Giản dị thì tốt, nhưng {xung} đến cơ mà.”","“Người hầu của {goi} lơ là quá.”","“{Xung} đến mà {goi} chẳng chút chăm chút sao?”","[lo,mid,hi]“Chẳng giống phi tần của {xung}.”"],
  showy:["“{Xung} thích thanh nhã hơn.”","“Vàng ngọc đầy đầu, nặng lắm.”","“Đẹp thì đẹp, mà phô trương quá.”","“Nhiều trâm quá, chẳng thấy mặt {goi}.”","“Đeo cả kho báu làm gì?”","“Lộng lẫy như vậy, {xung} lại thấy xa cách.”"]},
 "rival-jealous":{
  showy:["“Phô trương đến thế, {goi} không sợ người ta dị nghị sao?”","“{Goi} hôm nay châu ngọc đầy người, chắc là được ban thưởng nhiều lắm nhỉ?”","[lo,mid,hi]“Đẹp quá, đẹp đến mức đứng cạnh Hoàng hậu cũng chẳng kém. Thật đáng nể.”","“Trâm này đẹp thật, {xung} chưa thấy bao giờ. Ai ban cho {goi} vậy?”","“{Goi} rực rỡ thế, đứng cạnh {goi} ai cũng thành lá xanh mất.”","“Hôm nay {goi} tính đi yến ở đâu mà rực rỡ thế?”"],
  any:["“{Goi} hôm nay đẹp quá, khéo Hoàng thượng chẳng rời mắt được.”","“Dung nhan thế này, chẳng trách có người ngày đêm nhắc đến {goi}.”","“{Xung} nhìn {goi} mà ghen tị. Phải chăng có bí quyết gì?”","“Hoa đẹp thì người hái nhiều, {goi} giữ mình cho khéo.”","“{Goi} dạo này càng lúc càng đẹp, chẳng trách được để mắt tới.”","“Nhan sắc của {goi}, {xung} có học cả đời cũng chẳng được.”"]},
 "rival-tease":{any:["[lo,mid,hi]“Ôi chao, phấn son của {goi} hôm nay… đậm đà thật đấy.” Nàng ta che miệng cười khúc khích.","[lo,mid,hi]“{Goi} trang điểm thế này là để mừng lễ gì vậy?” Nàng ta liếc mắt cười nhạt.","[lo,mid,hi]“Đậm như thế, đứng xa trăm bước cũng nhận ra {goi}.” Mấy người quanh đó cười khẽ.","[lo,mid,hi]“Phấn dày thế, gió thổi qua chắc bay mất một lớp.” Nàng ta phẩy quạt, giọng mát mẻ.","[lo,mid,hi]“Hôm nay {goi} như hoa mẫu đơn vậy, đỏ rực cả sân.” Nàng ta cười, mắt chẳng hề cười.","[lo,mid,hi]“{Xung} cứ tưởng có đoàn hát vào cung.” Nàng ta nói rồi quay đi."]},
 "rival-praise":{any:["“{Goi} ăn vận nhã nhặn, {xung} thích.”","“Thanh đạm mà dễ nhìn, {goi} khéo chọn quá.”","“Giữa một sân son phấn, chỉ {goi} là thanh tao.”","“Không tranh không giành mà vẫn nổi bật, {xung} phục {goi}.”","“{Goi} chọn màu áo khéo quá, nhìn mà mát mắt.”","“Nhã nhặn thế này, {xung} cũng muốn học theo.”"]},
 "crowd-jealous":{showy:["Lúc thỉnh an, mấy phi tần cứ liếc nhìn y phục của ta rồi thì thầm với nhau.","Ta vừa bước vào, tiếng trò chuyện chợt ngưng; mấy đôi mắt dán lên trâm ngọc trên tóc ta.","Lúc cáo lui, sau lưng ta có tiếng cười khẽ: “Phô trương như thế, xem được mấy hôm.”","Mấy phi tần đứng gần ta khẽ dịch ra, như sợ đứng cạnh thì bị lu mờ.","Có người buột miệng khen trâm của ta, rồi vội im khi bị người bên cạnh huých tay.","Lúc thỉnh an, mấy chiếc quạt cùng che miệng; tiếng xì xào theo ta ra tận cửa."],
  any:["Lúc thỉnh an, ánh mắt các phi tần cứ dừng trên dung nhan của ta.","Suốt buổi thỉnh an, có người nhìn ta rồi nhìn xuống tay áo mình, khẽ thở dài.","Ra khỏi điện, ta nghe phía sau có người khẽ hỏi: “Nàng ta dùng phấn của cung nào vậy?”","Lúc ta ngồi xuống, mấy phi tần khẽ đưa mắt nhìn nhau.","Có người hỏi ta dùng phấn gì, giọng ngọt mà ánh mắt chẳng ngọt chút nào.","Sau buổi thỉnh an, có người cố ý đi chậm lại, để khỏi phải đi cạnh ta."]}};
/* RANK BAND lines (owner 16/11 ~21:05Z: "lỡ như đây là một người quý phi cũng dùng cái câu chuẩn này luôn"): per reaction, lines that only fit
   one band of the listener — lo = tiểu chủ (Đáp ứng … Quý nhân), mid = chủ một cung (Tần, Phi), hi = Quý phi / Hoàng quý phi, hq = Hoàng hậu.
   Merged as tagged lines into every look-pool of the reaction; jvoice kLine says a tagged line only to its band (kBand). */
const TOIL_BAND={
 "th-scold":{lo:["“Mới vào cung được mấy hôm mà đã sơ suất thế này, sau này còn ra sao?”","“Phẩm còn thấp thì càng phải giữ lễ, {goi} hiểu chưa?”","“Muốn ai gia nhớ mặt thì đừng để ai gia nhớ vì cái sai.”"],
  mid:["“Đã là chủ một cung mà dung nhan còn để người ta chê sao?”","“{Ten} có cung riêng, người dưới đều nhìn {goi} mà học. Thế này thì dạy ai?”","“Ngồi ghế chủ vị thì phải giữ được thể diện của chủ vị.”"],
  hi:["“Ở vị trí {ten}, lục cung đều trông vào, mà để ai gia phải nhắc chuyện này sao?”","“Lục cung đều nhìn {goi} mà theo. {Goi} sơ suất một, bọn họ sơ suất mười.”","“Phẩm cao thì lỗi cũng cao. Ai gia không muốn nói lần thứ hai.”"],
  hq:["“Mẫu nghi thiên hạ mà thế này, lục cung lấy ai làm gương?”","“Người ngồi Trung cung phải đoan trang hơn tất cả. Hôm nay thì chưa.”","“Ai gia giao lục cung cho Hoàng hậu, không phải để người ta cười.”"]},
 "th-praise":{lo:["“Mới vào cung mà đã hiểu lễ như vậy, {goi} có tiền đồ.”","“Nhìn {goi} hôm nay, ai gia lại nhớ thời mình mới vào cung.”","“Phận còn nhỏ mà biết giữ mình, ai gia ghi nhớ.”"],
  mid:["“Đã là chủ một cung, ăn vận thế này mới xứng.”","“{Ten} biết giữ thể diện cho cung mình, ai gia vui lòng.”","“Người dưới nhìn chủ như {goi}, ắt cũng biết lễ.”"],
  hi:["“Đứng đầu các phi mà vẫn giữ được chừng mực, khó có lắm.”","“{Ten} làm gương cho lục cung như vậy, ai gia yên tâm.”","“Phẩm cao mà không kiêu, {goi} giữ được phúc lâu dài.”"],
  hq:["“Mẫu nghi thiên hạ phải như vậy. Ai gia không nhìn lầm người.”","“Trung cung đoan trang thì lục cung yên ổn. Tốt lắm.”","“Hoàng hậu như thế, ai gia có thể yên lòng lo việc Phật.”"]},
 "hh-scold":{lo:["“Mới vào cung chưa lâu mà đã quên lời ma ma dạy rồi sao?”","“{Goi} phẩm vị còn thấp, càng phải cẩn thận từng chút.”"],
  mid:["“{Ten} đã là chủ một cung, lẽ nào còn để {xung} phải nhắc?”","“Chủ vị mà sơ suất, người ngoài sẽ cười cả cung của {goi}.”"],
  hi:["“{Ten} phẩm vị chỉ dưới {xung}, càng phải biết giữ lễ.”","“Vị trí cao thì gió lớn. {Goi} chớ để người ta có cớ.”"]},
 "hh-praise":{lo:["“Mới vào cung mà chu toàn như vậy, {xung} rất mừng.”","“{Goi} phẩm vị còn nhỏ mà biết lễ, sau này ắt có phúc.”"],
  mid:["“Chủ một cung mà chỉn chu thế này, người dưới cũng được nhờ.”","“Cung của {goi} nề nếp, nhìn chủ là biết.”"],
  hi:["“Có {goi} làm gương, {xung} đỡ được bao lời răn.”","“{Ten} đoan trang như vậy, lục cung ai dám không theo.”"]},
 "emp-like":{lo:["“{Xung} sao giờ mới thấy {goi}?”","“Lần sau {xung} đến sớm hơn.”"],mid:["“Cung của {goi}, {xung} sẽ ghé thường hơn.”","“{Goi} càng ngày càng hợp ý {xung}.”"],
  hi:["“Lục cung, {xung} vẫn nhớ {goi} nhất.”","“Bao năm rồi, {goi} vẫn thế.”"],hq:["“Trung cung có {goi}, {xung} yên lòng.”","“{Goi} vẫn đẹp như ngày đại hôn.”"]},
 "emp-dislike":{lo:["“Mới vào cung, chưa quen sao?”","“Người hầu chưa biết việc à?”"],mid:["“Chủ một cung mà thế này sao?”","“{Goi} dạo này lơ là quá.”"],
  hi:["“{Goi} xưa nay đâu có thế.”","“Lục cung đang nhìn {goi} đấy.”"],hq:["“Trung cung mà thế này sao?”","“{Goi} dạo này mệt lắm à?”"]},
 "rival-jealous":{lo:["“Mới vào cung đã được để mắt, {goi} thật có phúc.”","“Phẩm vị chưa cao mà khéo ăn vận thế, sau này {goi} còn hơn nữa.”"],
  mid:["“Chủ một cung có khác, {xung} nhìn mà thèm.”","“{Ten} dạo này phong quang quá, cả cung ai cũng nói.”"],
  hi:["“Phẩm cao thì đẹp cũng cao, {xung} sao dám sánh.”","“{Ten} phẩm cao vị trọng, ăn vận thế này cũng phải.”"],
  hq:["“{Goi} hôm nay rực rỡ quá, lục cung đều lu mờ.”","“Mẫu nghi thiên hạ có khác, {xung} chỉ biết cúi đầu.”","“Phượng quan trên đầu {goi}, ai nhìn mà chẳng ngước lên.”","“{Xung} đứng cạnh {goi} hôm nay, thấy mình như cành cỏ.”","“Châu ngọc ấy, cả hậu cung chỉ {goi} đeo mới hợp.”","“{Goi} đẹp thế này, Hoàng thượng chẳng muốn rời Trung cung mất.”"]},
 "rival-tease":{hq:["“{Goi} hôm nay thật… khác thường.” Nàng ta cúi đầu, khóe miệng khẽ nhếch.","“Son của {goi} thắm quá, {xung} suýt không nhận ra.” Nàng ta cười, mắt nhìn đi chỗ khác.","“Trung cung hôm nay rực rỡ, chắc có tin vui?” Giọng nàng ta ngọt như mật pha giấm.","“{Xung} nào dám bàn dung nhan của {goi}.” Nàng ta nói, rồi khẽ liếc người bên cạnh.","“{Goi} trang điểm thế, hẳn là để Hoàng thượng nhìn cho rõ.” Nàng ta cúi chào, cười khẽ.","“Đậm đà thế này, cả điện đều thấy.” Nàng ta che quạt, giọng nhỏ mà ai cũng nghe."]},
 "rival-praise":{lo:["“Mới vào cung mà đã biết chọn y phục, {xung} phục thật.”","“{Goi} ăn vận thế này, ma ma giáo tập ắt khen.”"],mid:["“Chủ một cung mà giản dị thế, {xung} kính phục.”","“Cung của {goi} hẳn ai cũng nề nếp.”"],
  hi:["“Phẩm cao mà không phô trương, hiếm có lắm.”","“{Ten} thanh nhã thế này, lục cung nên học theo.”"],hq:["“Mẫu nghi thiên hạ mà giản dị thế này, là phúc của lục cung.”","“{Goi} tiết kiệm làm gương, {xung} xin học theo.”"]},
 "crowd-jealous":{lo:["Mấy người cùng phẩm khẽ kéo nhau đứng xa ta, như sợ bị đem ra so.","Có người thì thầm sau lưng ta: “Mới vào cung mà đã diện thế, cây cao đón gió.”"],
  mid:["Người các cung nhỏ đứng sau lưng ta xì xào: chủ vị có khác.","Mấy vị nương nương cùng phẩm liếc nhau, cười mà chẳng nói."],
  hi:["Ta bước vào, cả điện dịu tiếng; ai cũng liếc nhìn rồi cúi xuống.","Phi tần phẩm thấp chẳng dám nhìn thẳng, chỉ len lén đưa mắt theo y phục của ta."],
  hq:["Các phi tần vào thỉnh an ta, mắt cứ dừng trên mũ phượng.","Lúc các cung lui ra, có người khẽ nói: “Trung cung hôm nay rực rỡ quá.”"]}};
/* PERSONALITY lines (phase D): a consort reacts in the voice of her trait (TRAITS j1); merged into her pool (key per trait) — the open
   jabs never go to the Empress herself ([lo,mid,hi]) */
const TOIL_TRAIT={
 "rival-jealous":{"Xảo quyệt":["[lo,mid,hi]“Đẹp thế này, giữ được bao lâu thì hay bấy lâu.”","“{Goi} cẩn thận, hoa đẹp hay bị người ta bẻ.”"],
  "Kiêu ngạo":["[lo,mid,hi]“Chút châu ngọc ấy, cung {xung} chất đầy rương.”","[lo,mid,hi]“Được ban thưởng một lần đã tưởng mình là ai.”"],
  "Ân cần":["“{Goi} đẹp quá, {xung} nhìn mà vui lây.”","“Ước gì {xung} cũng khéo ăn vận như {goi}.”"],
  "Kín đáo":["“Trâm ấy ở đâu ra vậy? {Xung} chưa thấy Nội vụ phủ phát.”","[lo,mid,hi]“{Goi} diện thế này, hẳn có hẹn với ai?”"],
  "Tham vọng":["“Hôm nay {goi} đi trước một bước, ngày mai chưa biết ai hơn ai.”","“Hoàng thượng thích kiểu này sao? {Xung} ghi nhớ.”"],
  "Khiêm nhường":["“{Xung}… {xung} chẳng bao giờ dám diện như {goi}.”","“{Goi} đẹp quá, {xung} đứng cạnh mà ngượng.”"]},
 "rival-tease":{"Xảo quyệt":["[lo,mid,hi]“Phấn son đậm thế, che được mặt chứ che sao được lòng.” Nàng ta cười rất dịu."],
  "Kiêu ngạo":["[lo,mid,hi]“Trang điểm thế này, {xung} còn tưởng cung nữ nào đi lạc.” Nàng ta cười lớn."],
  "Ân cần":["[lo,mid,hi]“Phấn hơi đậm một chút thôi, {goi} đừng để bụng.” Nàng ta nói khẽ."],
  "Kín đáo":["[lo,mid,hi]“Trang điểm kỹ thế, chắc biết trước có người đến?” Nàng ta nheo mắt."],
  "Tham vọng":["[lo,mid,hi]“Đậm đà thế, chắc định giành chỗ đứng gần ngự giá?” Nàng ta cười nhạt."],
  "Khiêm nhường":["[lo,mid,hi]“Son của {goi}… hơi thắm thì phải.” Nàng ta nói nhỏ rồi cúi đầu."]},
 "rival-praise":{"Xảo quyệt":["“{Goi} giản dị thế, ai nhìn cũng tưởng hiền lành.”"],"Kiêu ngạo":["“Cũng tạm được. Giản dị hợp với {goi}.”"],
  "Ân cần":["“{Goi} ăn vận thế này, {xung} nhìn cũng thấy lòng nhẹ.”"],"Kín đáo":["“Giản dị quá… {goi} đang tính điều gì chăng?”"],
  "Tham vọng":["“Giản dị mà vẫn được để mắt, {xung} phải học {goi} mới được.”"],"Khiêm nhường":["“{Goi} chọn màu khéo quá, {xung} muốn học mà chẳng dám hỏi.”"]}};
window.TOIL_TRAIT=TOIL_TRAIT;
for(const [k,B] of Object.entries(TOIL_BAND)){const P=TOIL_SAY[k];if(!P)continue;const T=[];for(const [b,L] of Object.entries(B))for(const x of L)T.push(`[${b}]${x}`);for(const sub of Object.keys(P))P[sub]=P[sub].concat(T)}
window.TOIL_SAY=TOIL_SAY;window.TOIL_BAND=TOIL_BAND;
/* diemtrang-score: the funny line for a vụng face names the part that went wrong (S.toilette.slip); diêm dúa gets its own */
const TOIL_SLIP={th:{brow:"“Đôi mày này một bên lên núi, một bên xuống sông à?”",powder:"“Má bên đỏ bên trắng thế kia, ngươi định ra hát tuồng sao?”",son:"“Son lem ra tận cằm, ngươi vừa ăn vụng mứt đỏ của ai thế?”"},
 hh:{brow:"“Muội kẻ mày lúc trời chưa sáng hay sao, bên cao bên thấp thế kia?”",powder:"“Phấn của muội… hình như chỉ chịu nằm một bên má.”",son:"“Son của muội hôm nay muốn đi dạo ra ngoài môi rồi.”"},
 emp:{brow:"“Hôm nay ái phi nhướn một bên mày với trẫm đấy à?”",powder:"“Một bên má ửng hồng, một bên trắng bệch: nàng đang thẹn một nửa sao?”",son:"“Son của ái phi chấm lạc chỗ rồi, để trẫm lau cho.”"},
 rival:{brow:"“Mày của muội hôm nay như hai con sâu cãi nhau.” Nàng ta che miệng cười khúc khích.",powder:"“Muội đánh phấn hay vừa ngã vào thúng bột thế?” Nàng ta che miệng cười.",son:"“Son của muội lem cả ra ngoài kìa.” Nàng ta che miệng cười khúc khích."},
 diem:{th:"“Son phấn dày thế này, ai gia tưởng gánh hát vào cung.”",hh:"“Muội định đi hội đèn hay đến thỉnh an bổn cung vậy?”",emp:"“Trẫm suýt tưởng hoa mẫu đơn biết đi.”",rival:"“Ôi chao, phấn son của muội hôm nay… đậm đà thật đấy.” Nàng ta che miệng cười khúc khích."}};
/* VOICE BY TÍNH TÌNH (owner 17/11 06:05Z): the slip tease is a tone pool of the teaser (jtone_b.js TONE_POOL "toilSlip:<who>:<slip>"); the old one-liners stay as the fallback */
function toilSlipSay(who,mk,sp){try{const tp=kTP;if(mk==="diem"){const P=tp("toilSlip:diem:"+who);return P?kLine("toilslip:diem:"+who,P,{sp,ls:S,t:kToneSt(sp,who)}):TOIL_SLIP.diem[who]||""}if(mk!=="vung")return"";const sl=(toilToday(S)||{}).slip;if(!sl)return"";
 const P=tp("toilSlip:"+who+":"+sl);return P?kLine("toilslip:"+who+":"+sl,P,{sp,ls:S,t:kToneSt(sp,who)}):TOIL_SLIP[who]&&TOIL_SLIP[who][sl]||""}catch(e){return""}}
function toilSay(k,ctx){const mk=ctx.mk,dv=ctx.dress;const plain=dv==="giandi",showy=dv==="photruong"||dv==="vuot"||dv==="tang";
 const host=ctx.host;const sp=host==="th"?"th":host==="emp"?"emp":host&&host.queen?"hh":host&&typeof host==="object"?host:null;
 const fun={"th-scold":"th","hh-scold":"hh","emp-dislike":"emp","rival-tease":"rival"}[k];const f=fun&&toilSlipSay(fun,mk,sp);if(f)return f;/* diemtrang-score: the part that went wrong / diêm dúa, before the pools */
 const P=TOIL_SAY[k];if(!P)return"";
 let sub;switch(k){
  case"th-scold":case"hh-scold":sub=mk==="moc"?"moc":mk==="vung"&&P.vung?"vung":mk==="diem"?"diem":plain?"plain":"showy";break;
  case"th-praise":case"hh-praise":sub=plain||mk==="moc"?"plain":"neat";break;
  case"emp-like":sub=mk==="tuyet"||mk==="dep"?"fair":"any";break;
  case"emp-dislike":sub=mk==="moc"?"moc":mk==="diem"?"diem":plain?"plain":"showy";break;
  case"rival-jealous":case"crowd-jealous":sub=showy?"showy":"any";break;
  default:sub="any"}
 /* a scolding never uses the warm words (no "con" / "ái phi" while she is being told off); praise follows the real relation */
 const bad=/scold|dislike|jealous|tease/.test(k);let m;try{m=sp?kAddr(sp,S).m:"cool"}catch(e){m="cool"}if(bad&&m==="warm")m="cool";if(!bad&&m==="cold")m="cool";
 let L=P[sub]||P.any,key="toil:"+k+":"+sub;
 /* VOICE BY TÍNH TÌNH: the reaction is a tone pool of the speaker (rank-band lines merged in by jtone_b.js); a crowd has no single speaker: a tone per occasion */
 const TP=kToneBand(key,k);if(TP){const said=kLine(key,TP,{sp,ls:S,m,t:sp?undefined:kToneRand()});const hb=sp&&typeof sp==="object"&&!/^crowd/.test(k)&&/”$/.test(said)?kHabit(sp):"";return hb?`${said} ${hb}.`:said}
 const tk=TOIL_TRAIT[k]&&sp&&traitsOf(sp).find(x=>TOIL_TRAIT[k][x]),TT=tk&&TOIL_TRAIT[k][tk];if(TT){L=L.concat(TT);key+=":"+tk}
 const said=kLine(key,L,{sp,ls:S,m});
 /* her signature habit (jvoice kHabit), long form only, when the line has no gesture of its own */
 const hb=sp&&typeof sp==="object"&&!/^crowd/.test(k)&&/”$/.test(said)?kHabit(sp):"";/* a crowd reaction is many voices: no one consort's habit (reviewer r1) */return hb?`${said} ${hb}.`:said}
/* gain / loss line in the palace voice (VANPHONG §2.5): a gesture of the person (pool, no repeat) — then the plain why + numbers, unchanged */
const TOIL_GEST={
 "th+":["Thái hậu khẽ gật đầu, tràng hạt trong tay lần chậm lại","Khóe môi Thái hậu thoáng một nét cười","Thái hậu cho ta ngồi gần hơn thường lệ","Ánh mắt Thái hậu dịu đi đôi phần","Thái hậu sai ma ma rót thêm cho ta chén trà nóng"],
 "th-":["Thái hậu đặt chén trà xuống, tiếng sứ chạm bàn khô khốc","Thái hậu nhìn ta một lượt rồi quay đi, chẳng nói thêm","Cả điện lặng đi khi Thái hậu khẽ nhíu mày","Tràng hạt trong tay Thái hậu dừng lại giữa chừng","Ma ma đứng hầu cúi gằm mặt, chẳng dám nhìn ta"],
 "hh+":["Hoàng hậu mỉm cười, giọng ôn tồn hẳn","Hoàng hậu khẽ vỗ tay ta, ra chiều hài lòng","Hoàng hậu gọi ta ngồi bên phải, chỗ của người được nể","Ánh mắt Hoàng hậu lướt qua ta, có phần tán thưởng","Hoàng hậu sai người dâng thêm cho ta một đĩa điểm tâm"],
 "hh-":["Hoàng hậu vẫn cười, nhưng ý cười chẳng tới đáy mắt","Hoàng hậu phẩy nhẹ khăn tay, chuyển sang chuyện khác","Các phi tần đưa mắt nhìn nhau khi Hoàng hậu lên tiếng","Hoàng hậu chẳng nói nặng lời, mà lời nào cũng như kim","Hoàng hậu khẽ hắng giọng, các cung lặng cả đi"],
 "emp+":["Hoàng thượng nhìn ta lâu hơn thường lệ","Hoàng thượng bật cười, bao mệt mỏi như tan đi","Hoàng thượng nắm lấy tay ta, chẳng vội buông","Ánh nến lay lay, ánh mắt Hoàng thượng chẳng rời ta","Hoàng thượng bảo người thắp thêm đèn, ngồi lâu hơn"],
 "emp-":["Hoàng thượng khẽ nhíu mày rồi cầm tấu chương lên","Hoàng thượng ngồi chưa ấm chỗ đã gọi người hầu trà","Hoàng thượng chỉ ừ một tiếng, chẳng hỏi han gì thêm","Ánh mắt Hoàng thượng lướt qua ta rồi dừng ở nơi khác","Hoàng thượng đứng dậy sớm hơn thường lệ"],
 "v+":["Nàng ta nắm tay ta, giọng thân mật hẳn","Nàng ta ghé lại gần, cười như chị em lâu ngày","Nàng ta khen ta trước mặt mọi người","Nàng ta cười tươi, kéo ta đi cùng một đoạn","Nàng ta khẽ gật đầu với ta, vẻ thân thiện"],
 "v-":["Nàng ta cười, nhưng tay vò nát chiếc khăn lụa","Nàng ta liếc ta một cái, sắc như dao","Nàng ta quay sang thì thầm với người bên cạnh","Nàng ta phe phẩy quạt, giọng mát như nước giếng","Nàng ta cười khẩy, quay mặt đi"]};
function toilGest(r){if(r.g!=null)return r.g;const host=r.host;const k=(host==="th"?"th":host==="emp"?"emp":host&&host.queen?"hh":"v")+(r.n>0?"+":"-");
 return r.g=TOIL_GEST[k]?kLine("toil-gest:"+k,kTP("toilGest:"+k)||TOIL_GEST[k],{about:host}):""}
function toilLit(r){const g=toilGest(r);return (g?g+" — ":"")+r.line+"."}
/* r = {k, who (face), host ("th" | "emp" | consort), n (signed change shown in words), line (numbers), ctx} */
/* the gesture is drawn once: the event panel shows it (long form) and the Sổ ghi line of the reaction gets it too (jvoice kLitLog, long form);
   the result card keeps the short facts (kShort) */
function toilReact(r){try{toilGest(r);if(r.s0!=null)kLitLog(r.s0,r.g)}catch(e){}TOIL_POP.push(r);clearTimeout(TOIL_POPT);TOIL_POPT=setTimeout(toilFlush,0)}
function toilBack(host,n){if(!n)return;if(host==="th")apply({th:n});else if(host==="emp")apply({sung:n>0?1:-1});else if(host&&host!==S)affAdd(host,S,n)}
function toilFlush(){if(!TOIL_POP.length||!S||S.dead)return;const L=TOIL_POP.splice(0).sort((a,b)=>Math.abs(b.n)-Math.abs(a.n));const top=L.slice(0,BAL.toil.popMax),rest=L.slice(BAL.toil.popMax);
 top.forEach((r,i)=>{const bad=r.n<0;const who=toilWho(r.host==null?null:r.host)||"";const more=i===top.length-1&&rest.length?`<p class="past">Còn: ${rest.map(x=>`${x.name||toilWho(x.host)} — ${x.line}`).join(" · ")}.</p>`:"";
  const h=`<p>${toilSay(r.k,Object.assign({host:r.host},r.ctx))}</p><p class="past">${toilLit(r)}</p>${more}`;
  const back=Math.ceil(Math.abs(r.n)*BAL.toil.sorryBack);
  /* cost mode (KIT 28.6 / §53 kitHint): the options' fx are empty (the change happens in go), so each says its own true hint */
  const nm=r.name||who,boss=r.host==="th"||r.host==="emp"||(r.host&&r.host.queen),them=lv=>lv?nm:boss?"bề trên":"nàng ta";
  const opts=bad?[
    {n:"Xin lỗi",fx:{},hideOut:true,hint:lv=>`${them(lv)} nguôi giận phần nào`,risk:"an toàn",go:()=>{toilBack(r.host,back);log(`Ta cúi đầu nhận lỗi; ${r.name||who} nguôi giận phần nào.`)}},
    {n:"Cười trừ",fx:{},hideOut:true,hint:"cho qua, không đổi gì",risk:"an toàn",go:()=>{log("Ta cười trừ cho qua.")}},
    {n:"Đáp lại",fx:{suc:-2},hideOut:true,hint:lv=>lv?`đáp khéo thì thêm danh tiếng, thành bại khó đoán, hỏng thì ${nm} càng phật ý${r.v?", nàng ta càng ghen":""}`:"có thể thêm danh tiếng, cũng có thể mất lòng",risk:"có rủi ro",go:()=>{if(roll(BAL.toil.replyWin)){apply({danh:BAL.toil.replyDanh});log("Ta đáp lại khéo léo, người nghe gật gù.")}else{toilBack(r.host,-1);if(r.v)r.v.ghen=cl((r.v.ghen||0)+2,0,100);log("Ta đáp lại, không khí càng gượng.")}}}]
   :[{n:r.host==="emp"||r.host==="th"||(r.host&&r.host.queen)?"Tạ ơn":"Cảm tạ",fx:{},hideOut:true,hint:"nhận lời khen, không đổi gì",risk:"an toàn",go:()=>{}}];
  Q.push({t:TOIL_EV[r.k]||"Dung nhan",who:r.who,h,opts,hideOut:true,toilEv:r.k,art:`img/ev-toil-${r.k}.webp`/* banner by ab06, 640×480 */})});
 try{render()}catch(e){}}
/* hook the three places that apply a reaction */
(function(){const ap1=aaThieuLeApply;aaThieuLeApply=function(host,f0){const L=leAttire(S,"",host);const s0=S.logSeq||0;const r=ap1.apply(this,arguments);try{const t=L.toil;const f=f0||L.delta;const n=f.aff||0;
  if(t&&n){const k=host==="th"?(n>0?"th-praise":"th-scold"):host==="emp"?(n>0?"emp-like":"emp-dislike"):host&&host.queen?(n>0?"hh-praise":"hh-scold"):null;
   if(k){const who=host==="th"?pTH():host==="emp"?pEmp():pv(host);const nm=host==="emp"?"Sủng":`${toilWho(host)} thiện cảm`;
    toilReact({k,who,host,n,s0,name:toilWho(host),line:`${t.why.map(w=>w[0]).join(", ")}: ${host==="emp"?(n>0?"Sủng +1":"Sủng -1"):`${nm} ${n>0?"+":""}${n}`}${f.danh?`, Danh ${f.danh}`:""}`,ctx:{mk:t.mk,dress:t.dress}})}}}catch(e){console.error(e)}return r}})();
(function(){const r0=toilRival;toilRival=function(v,doIt){const s0=S&&S.logSeq||0;const e=r0.apply(this,arguments);try{if(doIt&&e){const L=toilLook();const k=(L.mk==="diem"||L.mk==="vung")&&!e.aff&&!e.g?"rival-tease":e.g?"rival-jealous":e.aff>0?"rival-praise":"rival-jealous";
  toilReact({k,who:pv(v),host:v,v,s0,n:e.g?-e.g:(e.aff||-1),name:v.name,line:e.txt,ctx:{mk:L.mk,dress:L.dv}})}}catch(x){}return e}})();
(function(){const c0=toilCrowd;toilCrowd=function(doIt){const s0=S&&S.logSeq||0;const R0=doIt?liveRivals(false).filter(v=>!v.queen&&!v.out).map(v=>[v,v.ghen||0]):[];const e=c0.apply(this,arguments);try{if(doIt&&e&&e.n){
  const top=R0.map(([v,g])=>[v,(v.ghen||0)-g]).sort((a,b)=>b[1]-a[1])[0];const L=toilLook();if(top)toilReact({k:"crowd-jealous",who:pv(top[0]),host:top[0],v:top[0],s0,n:-e.n,name:top[0].name,line:`phi tần thấy ta ${e.why}: ghen +${e.n}`,ctx:{mk:L.mk,dress:L.dv}})}}catch(x){}return e}})();

window.toilOpen=toilOpen;window.toilDress=toilDress;window.toilFx=toilFx;window.toilNpc=toilNpc;window.toilOcc=toilOcc;

/* ---------- the look on her face, everywhere her portrait / figure is drawn (owner 15/11, coordinator 10:xxZ) ----------
   ONE layer in the kit's face-effects slot (jk2b kitFxLayers: tall frame, small avatar, stage figures — same box as the picture), so it lines
   up wherever the scar / veil do. Points per picture: img/toil-fit.json (dev/figwork/toilfit.py: mouth found by colour in the portrait, cheeks
   on the face's own skin line, figures matched to their portrait by template). A picture without points gets nothing (never guessed). */
const TOIL_FIT={url:"img/toil-fit2.json"/* toil-fit2.json = toil-fit.json with 1402 mouths moved onto the face-mesh lips (dev/art/mkfit/fixtoil.py); kept as THE fit file (kit keeper K2) */,fit:null,_ld:0,load(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.url).then(r=>r.ok?r.json():null).then(j=>{if(j){TOIL_FIT.fit=j;try{if(typeof S!=="undefined"&&S&&!Q.length)render()}catch(e){}}}).catch(()=>{})}catch(e){}}};
try{TOIL_FIT.load()}catch(e){}
const TOIL_LOOKS={
 /* owner 15/11 on the sheet: "đẹp" subtle and natural; "diêm dúa" = the old đẹp a little stronger (pretty, just noticeably overdone, never a clown) */
 dep:{skin:[255,250,244,.13,.62],blush:[238,128,144,.21,.165,0],lip:[206,60,80,.33,.072,.032],powder:0},
 /* owner 15/11 22:xxZ: "vụng" = deliberate clumsy makeup in her colours: uneven blotchy blush, a powder patch (the colour layer adds lips past the line, smudged lids, crooked brows, smeared ink) */
 vung:{skin:[255,252,248,.08,.6],blush:[236,112,130,.30,.17,0],lip:[206,60,80,.4,.08,.036],powder:0,vung:1},
 diem:{skin:[255,252,248,.24,.64],blush:[236,104,124,.40,.20,0],lip:[198,40,64,.56,.084,.038],powder:0}};
function toilLookOfP(p){try{if(!S)return null;if(p&&p!==S&&p.coop){const r=toilFriendRec(p);return r&&r.makeup&&r.look?r.look:null}if(p!==S)return null;if(TOIL.prev)return TOIL.prev.look;const r=toilToday(S);return r&&r.makeup&&r.look?r.look:null}catch(e){return null}}
const TOIL_SVGC={};
function toilRnd(seed){let a=(seed*2654435761)>>>0||1;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
/* col = her picks (toilColOf): the blush disc and the fallback lip oval take HER colours; noLip = the lips come from the colour layer (§60) */
function toilMakeupSvg(file,look,col,noLip){const L=TOIL_LOOKS[look];const v=TOIL_FIT.fit&&TOIL_FIT.fit[file];if(!L||!v)return"";col=col||toilColDef();
 const key=file+"|"+look+"|"+col.ma+"|"+col.son+"|"+(noLip?1:0)+"|"+(L.vung?col.seed|0:"");if(TOIL_SVGC[key])return TOIL_SVGC[key];
 const A=v[8]||1.3,Y=y=>y*A,[mx,my,lx,ly,rx,ry,fw]=v;const H=100*A;const c=(a)=>`rgb(${a[0]},${a[1]},${a[2]})`;
 const cx=(lx+rx)/2,cy=Y((ly+ry)/2);const d=Math.hypot(rx-lx,Y(ry)-Y(ly))||fw*.5;const ang=Math.atan2(Y(ry)-Y(ly),rx-lx)*180/Math.PI;
 const sk=L.skin,bl=toilColRGB("ma",col.ma).concat(L.blush.slice(3)),lp=toilColRGB("son",col.son).concat(L.lip.slice(3));const br=fw*bl[4]*1.0;
 /* vụng: the two cheeks differ (size, place, strength) and a patch of caked powder sits off the cheek — seeded per day, in face units, so portrait and figure match */
 const R=toilRnd((col.seed|0)+7);const jl=L.vung?[1+.45*R(),(R()-.5)*fw*.09,(R()-.3)*fw*.08,1.25]:[1,0,0,1],jr=L.vung?[.7+.3*R(),(R()-.5)*fw*.07,(R()-.6)*fw*.07,.75]:[1,0,0,1];
 const pw=L.vung?[(R()<.5?lx:rx)+(R()-.5)*fw*.12,Y(ly)-fw*(.04+.06*R()),fw*(.05+.03*R())]:null;
 /* skin light: an oval over the face, feathered; blush: two feathered discs (the hard stop makes the diêm dúa circles); lips: a blurred oval */
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 ${H.toFixed(2)}" preserveAspectRatio="none">`+
 `<defs><radialGradient id="s"><stop offset="0" stop-color="${c(sk)}" stop-opacity="${sk[3]}"/><stop offset="${L.powder?.7:.45}" stop-color="${c(sk)}" stop-opacity="${(sk[3]*(L.powder?.85:.6)).toFixed(3)}"/><stop offset="1" stop-color="${c(sk)}" stop-opacity="0"/></radialGradient>`+
 `<radialGradient id="b"><stop offset="0" stop-color="${c(bl)}" stop-opacity="${bl[3]}"/><stop offset="${bl[5]||.35}" stop-color="${c(bl)}" stop-opacity="${(bl[3]*(bl[5]?.92:.55)).toFixed(3)}"/><stop offset="1" stop-color="${c(bl)}" stop-opacity="0"/></radialGradient>`+
 `<filter id="f" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${(fw*.012).toFixed(3)}"/></filter></defs>`+
 `<g transform="rotate(${ang.toFixed(2)} ${cx.toFixed(2)} ${cy.toFixed(2)})"><ellipse cx="${cx.toFixed(2)}" cy="${(cy-d*(L.powder?.02:.18)).toFixed(2)}" rx="${(d*sk[4]*1.25).toFixed(2)}" ry="${(d*sk[4]*1.55).toFixed(2)}" fill="url(#s)"/></g>`+
 `<circle cx="${(lx+jl[1]).toFixed(2)}" cy="${(Y(ly)+jl[2]).toFixed(2)}" r="${(br*jl[0]).toFixed(2)}" fill="url(#b)" fill-opacity="${Math.min(1,jl[3])}"/><circle cx="${(rx+jr[1]).toFixed(2)}" cy="${(Y(ry)+jr[2]).toFixed(2)}" r="${(br*jr[0]).toFixed(2)}" fill="url(#b)" fill-opacity="${jr[3]}"/>`+(pw?`<ellipse cx="${pw[0].toFixed(2)}" cy="${pw[1].toFixed(2)}" rx="${pw[2].toFixed(2)}" ry="${(pw[2]*.7).toFixed(2)}" fill="rgb(255,250,246)" fill-opacity=".42" filter="url(#f)"/>`:"")+
 (noLip?"":`<ellipse cx="${mx}" cy="${Y(my).toFixed(2)}" rx="${(fw*lp[4]).toFixed(2)}" ry="${(fw*lp[5]).toFixed(2)}" transform="rotate(${ang.toFixed(2)} ${mx} ${Y(my).toFixed(2)})" fill="${c(lp)}" fill-opacity="${lp[3]}" filter="url(#f)"/>`)+`</svg>`;
 return TOIL_SVGC[key]="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)}
window.toilMakeupSvg=toilMakeupSvg;window.TOIL_FIT=TOIL_FIT;
/* her face layers: skin light + blush (SVG, as approved) under the colour layer (lips, eyelids, brows painted from the picture itself, §60) */
function toilFaceLayer(p,file){const lk=toilLookOfP(p);if(!lk)return"";const col=toilColOfP(p);const mk=toilMkLayer(file,lk,col);const src=toilMakeupSvg(file,lk,col,!!mk);if(!src&&!mk)return"";
 return (src?`<img class="kmkl kmkl-${lk}" src="${src}" alt="" aria-hidden="true" style="--fleft:0%;--ftop:0%;--fwidth:100%;--fheight:100%">`:"")+mk}
if(typeof kitFxLayers==="function"){const fx0=kitFxLayers;kitFxLayers=function(p,file){const h=fx0.apply(this,arguments);let m="";try{m=toilFaceLayer(p,file)}catch(e){}return m+h}}

/* ================= §60 MAKEUP COLOURS · kitSwatches (owner 15/11 19:05Z, review/mk-colour) =================
   Like modern dress-up / makeup games: the colours she picks at the mirror (phấn mắt, phấn má, son môi, màu mày) show in EXACTLY those colours on
   HER OWN pictures (portrait + full-body figure, every place kitFxLayers draws her) all day. The picks live in p.toilette.col (old saves: none →
   the defaults below, which are the approved "đẹp" blush + lip colours). "diêm dúa" = the same picks, stronger (TOIL_MKS).
   Placement: img/mk-fit/<face>.json (dev/art/mkfit/mkfit.py — MediaPipe face mesh on every picture of her 84 faces + old player looks: lips
   outer/inner, both upper eyelids + lower lash line, both brows; 60 points in 1/4000 of the picture). The colour layer is painted FROM THE
   PICTURE ITSELF in a canvas (lip / lid / brow pixels recoloured with their own light and shade, soft masks), so it reads as painted, not pasted;
   it is one <img class="kmkl kmkc"> over the same box as the picture. A picture without points keeps the older SVG lip oval (never guessed). */
const TOIL_COL={
 mat:{label:"Phấn mắt",def:"hoadao",L:[["hoadao","Phấn hoa đào","hoa đào",[234,148,146]],["hongmai","Phấn hồng mai","hồng mai",[214,104,128]],["rangchieu","Phấn ráng chiều","ráng chiều",[226,128,96]],
  ["kimsa","Phấn kim sa","kim sa",[204,160,92]],["nautram","Phấn nâu trầm","nâu trầm",[150,100,82]],["tuvi","Phấn tử vi","tử vi",[170,116,168]],["hophach","Phấn hổ phách","hổ phách",[214,132,62]]]},
 ma:{label:"Phấn má",def:"hongphan",L:[["hongphan","Phấn hồng phấn","hồng phấn",[238,128,144]],["hoadao","Phấn má hoa đào","hoa đào",[242,150,140]],["haiduong","Phấn hải đường","hải đường",[230,110,126]],
  ["yenchi","Yên chi","yên chi",[214,76,100]],["rangchieu","Phấn ráng chiều","ráng chiều",[240,140,108]],["hongsen","Phấn hồng sen","hồng sen",[226,120,160]],["camquyt","Phấn cam quýt","cam quýt",[246,150,96]]]},
 son:{label:"Son môi",def:"haiduong",L:[["haiduong","Son hải đường","hải đường",[206,60,80]],["dotham","Son đỏ thắm","đỏ thắm",[176,20,40]],["hongdao","Son hồng đào","hồng đào",[226,104,112]],
  ["chusa","Son chu sa","chu sa",[204,54,38]],["manchin","Son mận chín","mận chín",[132,36,66]],["sanho","Son san hô","san hô",[232,104,86]],["camdao","Son cam đào","cam đào",[238,122,74]],["hophach","Son hổ phách","hổ phách",[214,92,40]]]},
 may:{label:"Màu mày",def:"nau",L:[["nau","Mày nâu trầm","nâu trầm",[84,56,42]],["den","Mày đen tuyền","đen tuyền",[34,28,28]],["thanhdai","Mày thanh đại","thanh đại",[46,58,76]],
  ["naunhat","Mày nâu nhạt","nâu nhạt",[122,88,64]],["khoi","Mày khói","khói",[88,82,82]]]}};
window.TOIL_COL=TOIL_COL;
/* presets (owner 15/11 on sample 1): 8 "đẹp" + 8 "diêm dúa", each 4 cool-tone + 4 warm-tone, like a modern palette. A diêm dúa preset is her
   choice to paint boldly: a made-up face (score ≥ tier[1]) then shows as diêm dúa (the same as caked powder) — col.want = "diem". */
const TOIL_PRE=[
 ["suongmai","Sương mai","dep","cool",{mat:"tuvi",ma:"hongsen",son:"hongdao",may:"khoi"}],
 ["hoale","Hoa lê","dep","cool",{mat:"hongmai",ma:"hongphan",son:"haiduong",may:"thanhdai"}],
 ["tudang","Tử đằng","dep","cool",{mat:"tuvi",ma:"hongsen",son:"manchin",may:"thanhdai"}],
 ["lantuyet","Lan tuyết","dep","cool",{mat:"tuvi",ma:"hongphan",son:"haiduong",may:"khoi"}],
 ["daohoa","Đào hoa","dep","warm",{mat:"hoadao",ma:"hoadao",son:"hongdao",may:"nau"}],
 ["rangchieu","Ráng chiều","dep","warm",{mat:"rangchieu",ma:"rangchieu",son:"sanho",may:"naunhat"}],
 ["hophach","Hổ phách","dep","warm",{mat:"hophach",ma:"camquyt",son:"camdao",may:"nau"}],
 ["thucuc","Thu cúc","dep","warm",{mat:"kimsa",ma:"hoadao",son:"chusa",may:"nau"}],
 ["maudon","Mẫu đơn tím","diem","cool",{mat:"tuvi",ma:"hongsen",son:"manchin",may:"den"}],
 ["hongmai","Hồng mai","diem","cool",{mat:"hongmai",ma:"yenchi",son:"dotham",may:"den"}],
 ["bangngoc","Băng ngọc","diem","cool",{mat:"hongmai",ma:"hongsen",son:"haiduong",may:"thanhdai"}],
 ["tula","Tử la","diem","cool",{mat:"tuvi",ma:"yenchi",son:"manchin",may:"thanhdai"}],
 ["yenchi","Yên chi","diem","warm",{mat:"hongmai",ma:"yenchi",son:"chusa",may:"den"}],
 ["luuhong","Lựu hồng","diem","warm",{mat:"rangchieu",ma:"yenchi",son:"dotham",may:"den"}],
 ["camhoa","Cam hỏa","diem","warm",{mat:"hophach",ma:"camquyt",son:"hophach",may:"nau"}],
 ["kimtuoc","Kim tước","diem","warm",{mat:"kimsa",ma:"rangchieu",son:"camdao",may:"nautram"}]];
window.TOIL_PRE=TOIL_PRE;
function toilPreOf(c){const p=TOIL_PRE.find(x=>(x[2]==="diem")===(c.want==="diem")&&["mat","ma","son","may"].every(k=>x[4][k]===c[k]));return p?p[0]:""}
function toilPreRows(c){const cur=toilPreOf(c);return [["dep",TOIL_STY.dep],["diem",TOIL_STY.diem]].map(([lk,label])=>({k:"pre-"+lk,label,sel:cur,
 items:TOIL_PRE.filter(x=>x[2]===lk).map(x=>({k:x[0],name:x[1],short:x[1],cols:["mat","ma","son","may"].map(k=>toilColRGB(k,x[4][k]))}))}))}
function toilColDef(){const o={};for(const k in TOIL_COL)o[k]=TOIL_COL[k].def;return o}
function toilColE(part,k){const P=TOIL_COL[part];return P.L.find(x=>x[0]===k)||P.L.find(x=>x[0]===P.def)}
function toilColRGB(part,k){return toilColE(part,k)[3].slice()}
function toilColFix(c){const o=toilColDef();if(c&&typeof c==="object"){for(const k in o)if(TOIL_COL[k].L.some(x=>x[0]===c[k]))o[k]=c[k];if(c.want==="diem")o.want="diem";if(c.seed!=null&&isFinite(c.seed))o.seed=c.seed|0}return o}
function toilColOfP(p){if(p&&p!==S&&p.coop){const r=toilFriendRec(p);return toilColFix(r&&r.col)}if(TOIL.prev)return TOIL.prev.col;const r=p===S?toilToday(S):null;return toilColFix(r&&r.col)}
function toilColText(c){c=toilColFix(c);return ["mat","ma","son","may"].map(k=>toilColE(k,c[k])[1]).join(", ")}
/* strength by look: lip / eyelid colour share, eyelid height (share of the lid→brow gap), brow tint, outer wing, lower lash line */
const TOIL_MKS={vung:{lip:.62,eye:.5,eyeH:.62,brow:.5,wing:0,low:0,vung:1},dep:{lip:.54,eye:.5,eyeH:.5,brow:.45,wing:.08,low:0},diem:{lip:.86,eye:.7,eyeH:.68,brow:.68,wing:.22,low:.4}};
const MK_FIT={g:{},ld:{},face(f){const m=/^(?:por|fig)-([a-z]+-[a-z]*\d+)-/.exec(String(f||""));return m?m[1]:null},
 get(f){const g=this.face(f);if(!g)return null;const t=this.g[g];if(t)return t[f]||null;this.load(g);return null},
 load(g){if(this.ld[g])return;this.ld[g]=1;try{fetch("img/mk-fit/"+g+".json").then(r=>r.ok?r.json():null).then(j=>{if(j){MK_FIT.g[g]=j;try{if(typeof S!=="undefined"&&S&&!Q.length&&!TOIL.st)render();else if(TOIL.st&&TOIL.prev&&TOIL.prevUI)TOIL.prevUI()}catch(e){}}}).catch(()=>{})}catch(e){}}};
window.MK_FIT=MK_FIT;
/* KIT §60 face axis (owner 17/11 ~18:00Z, face left of the mirror centre): the TRUE vertical axis of a face picture = the midpoint of its two eyes from the face-mesh (img/mk-fit, eye rings = points 20-29 and 30-39, units 1/4000 of the picture);
   returns it as a 0..1 share of the picture width, or null while that face's mesh is not loaded. toil-fit's mouth point sits on average 1.2 % of the picture width (up to 5.8 %) to the RIGHT of it, so every place
   that centres a face in a round/mirror frame (camera close-up, makeup board, kitFaceZoom) centres THIS axis and falls back to the mouth point only when there is no mesh. */
const TOIL_EYEPX={};
function toilAxisX(file){try{const fn=String(file||"").split("?")[0].split("/").pop();if(TOIL_EYEPX[fn]!=null)return TOIL_EYEPX[fn];const e=MK_FIT.get(fn);if(!e||e.length<80)return null;let x=0;for(const s of[20,30])for(let i=0;i<10;i++)x+=e[2*(s+i)];return x/20/4000+TOIL_AXIS_BIAS}catch(err){return null}}
/* THE FACE'S REAL CENTRE, from the picture's own pixels (owner 17/11 + review r1: the fit files lie, on average the mesh sits 3.0 % of the picture width RIGHT of the painted face, up to 10 %, and the toil-fit mouth is shifted the same way):
   centroid x of the skin-coloured pixels in the face band (from a little above the eyes to the mouth line; hair, jewellery, clothes and hands are not skin); the fit points are only used to say which rows and what x range to look at.
   async, once per picture, cached in TOIL_EYEPX (0..1 of the picture width); needs the CDN's CORS (it has it); resolves false when something is missing, then toilAxisX falls back to the mesh minus its measured bias */
async function toilEyePx(file){const fn=String(file||"").split("?")[0].split("/").pop();if(TOIL_EYEPX[fn]!=null)return true;
 try{const v=TOIL_FIT.fit&&TOIL_FIT.fit[fn];if(!v)return false;const bm=await createImageBitmap(await (await fetch(IMG_U("img/"+fn),{mode:"cors"})).blob()),Wd=bm.width,Hd=bm.height,c=document.createElement("canvas");c.width=Wd;c.height=Hd;const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(bm,0,0);const d=g.getImageData(0,0,Wd,Hd).data;
  const my=v[1]/100*Hd,fw=v[6]/100*Wd,mx=v[0]/100*Wd,y0=Math.max(0,v[3]/100*Hd-.06*Hd|0),y1=Math.min(Hd,my+.02*Hd|0),x0=Math.max(0,mx-.9*fw|0),x1=Math.min(Wd,mx+.9*fw|0);const cnt=new Float32Array(Wd);let n=0;
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=(y*Wd+x)*4,r=d[i],gg=d[i+1],b=d[i+2];if(d[i+3]>200&&r>150&&r>gg&&gg>b&&r-b>18&&r-gg<60&&gg>110){cnt[x]++;n++}}
  /* a hand or a sleeve beside the face is skin too: keep only the heaviest run of skin columns (gaps up to 2 % of the width are bridged) */
  if(n<100)return false;const segs=[],thr=Math.max(...cnt)*.06;let cur=null,gap=0;for(let x=x0;x<x1;x++){if(cnt[x]>thr){if(!cur)cur={a:x,m:0,s:0};cur.m+=cnt[x];cur.s+=cnt[x]*x;cur.e=x;gap=0}else if(cur&&++gap>Wd*.02){segs.push(cur);cur=null}}if(cur)segs.push(cur);
  const top=segs.reduce((a,b)=>b.m>a.m?b:a);TOIL_EYEPX[fn]=top.s/top.m/Wd;return true}catch(err){return false}}

const TOIL_AXIS_BIAS=-.03;/* mesh eye midpoint -> painted face centre, mean over 229 portraits (sd 2.0 %, min -10.4 %); only used while the pixel centre is not known */
const TOIL_BLANK="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const TOIL_MKC={},TOIL_MKQ=[];
function toilMkPts(v){const P=[];for(let i=0;i<60;i++)P.push([v[2*i]/40,v[2*i+1]/40]);return P}/* → % of width / height */
function toilMkBox(v){const P=toilMkPts(v);let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;P.forEach(([x,y])=>{x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)});
 const mx=(x1-x0)*.14,my=(y1-y0)*.14;return[x0-mx,y0-my,x1-x0+2*mx,y1-y0+2*my].map(n=>+n.toFixed(3))}
function toilMkLayer(file,look,col){const v=MK_FIT.get(file);if(!v||!TOIL_MKS[look])return"";const key=[file,look,col.mat,col.son,col.may,look==="vung"?col.seed|0:""].join("|");
 let e=TOIL_MKC[key];if(!e){e=TOIL_MKC[key]={box:toilMkBox(v),src:""};TOIL_MKQ.push(key);if(TOIL_MKQ.length>80)delete TOIL_MKC[TOIL_MKQ.shift()];toilMkPaint(file,v,look,col,e,key)}
 const b=e.box;return `<img class="kmkl kmkc kmkl-${look}" data-mkk="${key}" src="${e.src||TOIL_BLANK}" alt="" aria-hidden="true" style="--fleft:${b[0]}%;--ftop:${b[1]}%;--fwidth:${b[2]}%;--fheight:${b[3]}%">`}
function toilMkPaint(file,v,look,col,e,key){const im=new Image();im.crossOrigin="anonymous";im.decoding="async";
 im.onload=()=>{try{e.src=toilMkDraw(im,v,look,col,e.box)}catch(x){e.src=TOIL_BLANK}document.querySelectorAll("img.kmkc").forEach(x=>{if(x.dataset.mkk===key)x.src=e.src})};
 im.onerror=()=>{e.src=TOIL_BLANK};im.src=IMG_U("img/"+file)}
/* soft-edged fill (canvas shadow: works where ctx.filter does not) */
function toilSoft(g,path,blur,alpha,K){const OFF=4000;g.save();g.shadowColor=`rgba(0,0,0,${alpha})`;g.shadowBlur=Math.max(.5,blur*K);g.shadowOffsetX=OFF*K;g.translate(-OFF,0);g.beginPath();path(g);g.fillStyle="#000";g.fill("evenodd");g.restore()}
function toilSmooth(g,P){/* closed smooth curve through the midpoints */const n=P.length;const m=i=>[(P[i%n][0]+P[(i+1)%n][0])/2,(P[i%n][1]+P[(i+1)%n][1])/2];const s=m(n-1);g.moveTo(s[0],s[1]);for(let i=0;i<n;i++){const q=m(i);g.quadraticCurveTo(P[i][0],P[i][1],q[0],q[1])}g.closePath()}
function toilMkDraw(im,v,look,col,box){const W=im.naturalWidth,H=im.naturalHeight,T=TOIL_MKS[look];
 const bx=box[0]/100*W,by=box[1]/100*H,bw=box[2]/100*W,bh=box[3]/100*H;const K=Math.max(1,Math.min(3,160/bw));/* small figure faces are worked at ≥160 px */
 const cw=Math.max(2,Math.round(bw*K)),chh=Math.max(2,Math.round(bh*K));const mk=()=>{const c=document.createElement("canvas");c.width=cw;c.height=chh;const g=c.getContext("2d");g.setTransform(cw/bw,0,0,chh/bh,-bx*cw/bw,-by*chh/bh);return[c,g]};
 const P=toilMkPts(v).map(([x,y])=>[x/100*W,y/100*H]);const [c0,g0]=mk();g0.drawImage(im,0,0,W,H);
 const ca=P.slice(20,30).reduce((a,p)=>[a[0]+p[0]/10,a[1]+p[1]/10],[0,0]),cb=P.slice(30,40).reduce((a,p)=>[a[0]+p[0]/10,a[1]+p[1]/10],[0,0]);const u=Math.hypot(ca[0]-cb[0],ca[1]-cb[1])||20;
 /* lips: outer minus the mouth opening */
 const R=toilRnd((col.seed|0)+11),VU=!!T.vung;const lc=P.slice(0,12).reduce((a,p)=>[a[0]+p[0]/12,a[1]+p[1]/12],[0,0]);
 /* vụng: the lip colour goes past the lip line (bigger, shifted outline), patchy */
 const lipO=VU?(()=>{const sx=1.12+.1*R(),sy=1.3+.2*R(),dx=(R()-.5)*u*.09,dy=(R()-.35)*u*.05;return P.slice(0,12).map(([x,y])=>[lc[0]+(x-lc[0])*sx+dx,lc[1]+(y-lc[1])*sy+dy])})():P.slice(0,12);
 const [cl,gl]=mk();toilSoft(gl,g=>{toilSmooth(g,lipO);toilSmooth(g,P.slice(12,20))},u*(VU?.05:.035),1,K);
 /* eyelids: soft layers from the lash line up toward the brow, stronger at the lash line, a small wing at the outer corner; the eye itself stays clear */
 const [ce,ge]=mk();const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const eh=VU?[.6+.55*R(),.3+.35*R()]:[1,1];let en=0;
 const eye=(U,Lo,B)=>{const EH=T.eyeH*eh[en++];/* U upper lid outer→inner (7), Lo lower lid inner→outer (3), B brow lower edge inner→outer (5) */
  const bAt=t=>{const f=t*(B.length-1),i=Math.min(B.length-2,Math.floor(f));return lerp(B[i],B[i+1],f-i)};
  const out=U[0],inn=U[6];const wing=[out[0]+(out[0]-inn[0])*T.wing,out[1]+(out[1]-inn[1])*T.wing-(T.wing?u*.04:0)];
  for(const hh of[.38,.62,.84,1]){const top=U.map((p,i)=>{const f=i/6;const b=bAt(.86-.74*f);return lerp(p,b,EH*hh*(1-.45*f*f))});
   toilSoft(ge,g=>{g.moveTo(wing[0],wing[1]);U.forEach(p=>g.lineTo(p[0],p[1]));top.slice().reverse().forEach(p=>g.lineTo(p[0],p[1]));g.closePath()},u*(VU?.1:.05),.34,K)}
  if(T.low){ge.save();ge.globalAlpha=T.low;ge.lineCap="round";ge.lineWidth=u*.035;ge.strokeStyle="#000";ge.shadowColor="#000";ge.shadowBlur=u*.03*K;
   ge.beginPath();const lo=[inn].concat(Lo,[out]).map(p=>[p[0],p[1]+u*.022]);ge.moveTo(lo[0][0],lo[0][1]);lo.slice(1).forEach(p=>ge.lineTo(p[0],p[1]));ge.stroke();ge.restore()}
  ge.save();ge.globalCompositeOperation="destination-out";ge.beginPath();U.forEach((p,i)=>i?ge.lineTo(p[0],p[1]):ge.moveTo(p[0],p[1]));Lo.forEach(p=>ge.lineTo(p[0],p[1]));ge.closePath();ge.fill();ge.restore()};
 eye(P.slice(20,27),P.slice(27,30),P.slice(45,50));eye(P.slice(30,37),P.slice(37,40),P.slice(55,60));
 /* brows */
 const [cbw,gb]=mk();toilSoft(gb,g=>{toilSmooth(g,P.slice(40,50));toilSmooth(g,P.slice(50,60))},u*.03,1,K);
 /* vụng ink (painted in the brow colour itself): one brow redrawn too high / too thick, the other's tail dragged long, a smear of ink off a tail */
 const [ci,gi]=mk();if(VU){gi.lineCap="round";gi.lineJoin="round";gi.strokeStyle="#000";const side=R()<.5?0:1;
  const Bu=[P.slice(40,45),P.slice(50,55)],Bl=[P.slice(45,50),P.slice(55,60)];/* upper edge outer→inner, lower edge inner→outer */
  const line=(L,w,a,blur)=>{gi.save();gi.globalAlpha=a;gi.lineWidth=w;gi.shadowColor="#000";gi.shadowBlur=blur*K;gi.beginPath();L.forEach((p,i)=>i?gi.lineTo(p[0],p[1]):gi.moveTo(p[0],p[1]));gi.stroke();gi.restore()};
  const up=-(.035+.035*R())*u;line(Bu[side].map((p,i)=>[p[0],p[1]+up*(.4+.6*Math.sin(Math.PI*i/4))]),u*(.05+.02*R()),.62,u*.01);
  const o=Bl[1-side],t=o[4],t2=o[3];const ext=[t[0]+(t[0]-t2[0])*(.9+.6*R()),t[1]+(t[1]-t2[1])*.9+u*(.05+.05*R())];line([t2,t,ext],u*.04,.55,u*.012);
  const sm=Bl[side][4];line([sm,[sm[0]+(sm[0]-lc[0])*.18,sm[1]+u*(.18+.12*R())]],u*.07,.32,u*.06)}
 const D=g0.getImageData(0,0,cw,chh),mI=gi.getImageData(0,0,cw,chh).data,mL=gl.getImageData(0,0,cw,chh).data,mE=ge.getImageData(0,0,cw,chh).data,mB=gb.getImageData(0,0,cw,chh).data,o=D.data;
 const Lum=i=>.299*o[i]+.587*o[i+1]+.114*o[i+2];let sl=0,nl=0,se=0,ne=0;
 for(let i=0;i<o.length;i+=4){const l=Lum(i);if(mL[i+3]>140){sl+=l;nl++}if(mE[i+3]>60&&l>110){se+=l;ne++}}
 const Ll=nl?sl/nl:150,Le=ne?se/ne:205;const tl=toilColRGB("son",col.son),te=toilColRGB("mat",col.mat),tb=toilColRGB("may",col.may);
 const Ltb=Math.max(20,.299*tb[0]+.587*tb[1]+.114*tb[2]);const cl3=(x,a,b)=>x<a?a:x>b?b:x;
 /* vụng patchiness: smooth value noise in face units (same blotches on portrait and figure) */
 const NS=u*.14,hv=(x,y)=>{let h=(x*374761393+y*668265263+(col.seed|0)*982451653)|0;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};
 const nz=(x,y)=>{const fx=(x-lc[0])/NS,fy=(y-lc[1])/NS,ix=Math.floor(fx),iy=Math.floor(fy),tx=fx-ix,ty=fy-iy,sx=tx*tx*(3-2*tx),sy=ty*ty*(3-2*ty);
  const a=hv(ix,iy),b=hv(ix+1,iy),c=hv(ix,iy+1),d=hv(ix+1,iy+1);return a+(b-a)*sx+(c-a)*sy+(a-b-c+d)*sx*sy};
 for(let i=0;i<o.length;i+=4){const ab=mB[i+3]/255,ae=mE[i+3]/255,al=mL[i+3]/255,ai=VU?mI[i+3]/255:0;if(!(ab||ae||al||ai)){o[i+3]=0;continue}
  const pn=VU?.35+.75*nz(bx+((i>>2)%cw)*bw/cw,by+Math.floor((i>>2)/cw)*bh/chh):1;
  const r0=o[i],g1=o[i+1],b0=o[i+2],l=Lum(i);let r=r0,g=g1,b=b0,keep=1;
  if(ab){/* only the brow hairs (darker than the skin) take the colour, with their own light */const dk=cl3((Le-l)/(Le*.42),0,1);const a=ab*T.brow*dk;
   if(a>0){const k=Math.min(2.4,l/Ltb)*(look==="diem"?.9:1);r+=(tb[0]*k-r)*a;g+=(tb[1]*k-g)*a;b+=(tb[2]*k-b)*a;keep*=1-a}}
  if(ae){const a=Math.min(1,ae*T.eye*pn);const k=cl3(l/Le,.35,1.12);r+=(te[0]*k-r)*a;g+=(te[1]*k-g)*a;b+=(te[2]*k-b)*a;keep*=1-a}
  if(al){let a=Math.min(1,al*T.lip*pn);const q=l/Ll;const k=cl3(q,.55,1.22);/* highlights on the lip keep some of their shine */if(q>1.22)a*=Math.max(.45,1-(q-1.22)*1.6);
   r+=(tl[0]*k-r)*a;g+=(tl[1]*k-g)*a;b+=(tl[2]*k-b)*a;keep*=1-a}
  if(ai){const a=Math.min(1,ai*pn);const k=.85;r+=(tb[0]*k-r)*a;g+=(tb[1]*k-g)*a;b+=(tb[2]*k-b)*a;keep*=1-a}
  const A=1-keep;if(A<.004){o[i+3]=0;continue}/* overlay pixel so that mix(original, it, A) = the painted pixel */
  o[i]=cl3(Math.round(r0+(r-r0)/A),0,255);o[i+1]=cl3(Math.round(g1+(g-g1)/A),0,255);o[i+2]=cl3(Math.round(b0+(b-b0)/A),0,255);o[i+3]=Math.round(A*255)}
 g0.setTransform(1,0,0,1,0,0);g0.clearRect(0,0,cw,chh);g0.putImageData(D,0,0);return c0.toDataURL("image/png")}
window.toilMkDraw=toilMkDraw;window.toilColOfP=toilColOfP;

/* ---------- KIT §60 kitSwatches: one row per part (label · the picked name · round colour swatches with a short name) ---------- */
const KSWT={reg:{}};
function kitSwatches(o){o=o||{};const key=o.key||"sw";KSWT.reg[key]=o;const esc=s=>String(s).replace(/[&<>"]/g,"");
 return `<div class="kswt" data-kswt="${key}">`+(o.rows||[]).map(r=>{const cur=r.items.find(i=>i.k===r.sel)||r.items[0];
  return `<div class="kswt-r"><div class="kswt-h"><b>${esc(r.label)}</b><span>${esc(cur?cur.name:"")}</span></div><div class="kswt-g" role="radiogroup" aria-label="${esc(r.label)}">`+
   r.items.map(i=>`<button type="button" class="kswt-i${i.k===r.sel?" on":""}" role="radio" aria-checked="${i.k===r.sel}" data-kswtk="${key}" data-kswtr="${r.k}" data-kswti="${i.k}" title="${esc(i.name)}" style="--sw:${i.cols?`conic-gradient(${i.cols.map((c,j,A)=>`rgb(${c.join(",")}) ${Math.round(j*100/A.length)}% ${Math.round((j+1)*100/A.length)}%`).join(",")})`:`rgb(${i.col.join(",")})`}"><i></i><small>${esc(i.short||i.name)}</small></button>`).join("")+`</div></div>`}).join("")+`</div>`}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kswtk]");if(!b)return;const o=KSWT.reg[b.dataset.kswtk];if(!o||!o.onPick)return;e.preventDefault();try{sfx("tap")}catch(x){}o.onPick(b.dataset.kswtr,b.dataset.kswti)});
(function(){const st=document.createElement("style");st.id="kswt-css";st.textContent=`
.kswt{display:grid;gap:8px}
.kswt-r{display:grid;gap:4px}
.kswt-h{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap;font-size:.8rem}
.kswt-h b{font-family:var(--display,serif);color:var(--ink,#2a1a12)}
.kswt-h span{color:var(--dim,#7a6650)}
.kswt-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(54px,1fr));gap:4px}
.kswt-i{display:grid;justify-items:center;gap:2px;padding:4px 2px;border:1px solid transparent;border-radius:8px;background:none;cursor:pointer;color:var(--ink,#2a1a12);font:inherit;min-width:0}
.kswt-i i{display:block;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.55),rgba(255,255,255,0) 42%),var(--sw);box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),0 1px 2px rgba(0,0,0,.18)}
.kswt-i small{font-size:.72rem;line-height:1.15;text-align:center;overflow-wrap:anywhere}
.kswt-i.on{border-color:var(--gold,#c9a227);background:rgba(201,162,39,.12)}
.kswt-i.on i{box-shadow:0 0 0 2px #fffaf0,0 0 0 4px var(--gold,#c9a227)}
.kswt-i:focus-visible{outline:2px solid var(--gold,#c9a227);outline-offset:1px}`;document.head.appendChild(st)})();
/* KIT §60 kitFaceZoom(p, file): her face up close in a round bronze-mirror frame, the picture + the SAME face layers as everywhere (kitFxLayers),
   centred on the measured face (img/toil-fit.json); "" when the picture has no points */
function kitFaceZoom(p,file){const v=TOIL_FIT.fit&&TOIL_FIT.fit[file];if(!v)return"";const A=v[8]||1.3,zw=100/(v[6]*1.5)*100;/* picture width in % of the frame */
 const ax=toilAxisX(file),left=50-(ax!=null?ax*100:v[0])/100*zw,top=60-v[1]/100*zw*A;let fx="";try{fx=kitFxLayers(p,file)}catch(e){}
 return `<div class="kfzoom" role="img" aria-label="Dung nhan trong gương"><div class="kfzoom-i" style="left:${left.toFixed(2)}%;top:${top.toFixed(2)}%;width:${zw.toFixed(2)}%;height:${(zw*A).toFixed(2)}%">`+
  `<img src="${IMG_U("img/"+file)}" alt=""><span class="kfxf">${fx}</span></div></div>`}
window.kitFaceZoom=kitFaceZoom;
(function(){const st=document.createElement("style");st.id="kfzoom-css";st.textContent=`
.kfzoom{position:relative;width:min(200px,100%);aspect-ratio:1;margin:0 auto 6px;border-radius:50%;overflow:hidden;background:#efe0c6;box-shadow:0 0 0 3px var(--gold,#c9a227),0 0 0 6px #8a6a2a,0 3px 10px rgba(60,30,10,.35)}
.kfzoom-i{position:absolute}
.kfzoom-i>img{position:absolute;left:0;top:0;width:100%;height:100%;max-width:none}
.kfzoom-i>.kfxf{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}
/* kv3:.kv1 */`;document.head.appendChild(st)})();
function toilColRows(c){return ["mat","ma","son","may"].map(k=>({k,label:TOIL_COL[k].label,sel:c[k],items:TOIL_COL[k].L.map(x=>({k:x[0],name:x[1],short:x[2],col:x[3]}))}))}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§60",title:"kitSwatches · màu trang điểm (phấn mắt, phấn má, son môi, màu mày)",html:()=>{let z="";try{if(typeof S!=="undefined"&&S){const f=kitFile(toilPor().src);TOIL.prev={look:"dep",col:toilColDef()};try{z=kitFaceZoom(S,f)}finally{TOIL.prev=null}}}catch(e){}return `<div style="display:grid;grid-template-columns:minmax(110px,200px) 1fr;gap:10px;align-items:start">${z||"<span></span>"}${kitSwatches({key:"kitpage",rows:toilColRows(toilColDef())})}</div>`}})}catch(e){}

/* (b0) CHỌN MÀU — before the three hồi: her portrait wears the picks live (the same layers as all day, at the "đẹp" strength) */
function toilColUI(){const st=TOIL.st,box=kg82Box();if(!box||!st)return;box.hidden=false;st.col=toilColFix(st.col||(S.toilette&&S.toilette.col));
 TOIL.prev={look:st.col.want==="diem"?"diem":"dep",col:st.col};TOIL.prevUI=toilColUI;const por=toilPor(),me=pMe();
 box.innerHTML=`<div class="toilw"><div class="toilfig"><p class="past">Gương đồng soi trước: điểm trang khéo thì dung nhan mang đúng những màu này. ${TOIL_STY.diem} hợp dịp lớn; đậm quá dịp, quá phẩm (hay phấn đánh quá dày) thì thành ${toilMkW("diem")}, người ta chê phô trương.${toilTasteNote()}</p></div>`+
  `<div>${kitSwatches({key:"toilcol",rows:toilPreRows(st.col).concat(toilColRows(st.col)),onPick:(r,k)=>{if(/^pre-/.test(r)){const x=TOIL_PRE.find(y=>y[0]===k&&"pre-"+y[2]===r);if(x){st.col=Object.assign({},x[4]);if(x[2]==="diem")st.col.want="diem"}}else st.col[r]=k;toilColUI()}})}</div></div>`+
  `<div class="kg82act"><button class="${kg82Btn()}" id="toilgo">Trang điểm<small>kẻ mày, đánh phấn, chấm son</small></button><button class="${kg82Btn(true)}" id="toilmoc2">Để ${toilMkW("moc")}</button></div>`;
 try{kitGameFigRefresh()}catch(e){}
 $("toilgo").onclick=()=>{TOIL.prev=null;TOIL.prevUI=null;toilMakeup()};$("toilmoc2").onclick=()=>{TOIL.prev=null;TOIL.prevUI=null;toilFinish(false)}}
window.toilColUI=toilColUI;window.kitSwatches=kitSwatches;
/* leaving the mirror any way (✕, Esc) ends the colour preview */
(function(){if(typeof kg82Close!=="function")return;const c0=kg82Close;kg82Close=function(){TOIL.prev=null;TOIL.prevUI=null;return c0.apply(this,arguments)}})();

/* ---------- D28 · MAKEUP FINAL-LOOK REVEAL (owner 15/11 23:30Z; KIT §60.5) ----------
   After the morning mirror: her full-body figure (today's dress + makeup layers) steps in on a painted dressing-room plate (img/toil-mirror-room.webp,
   gpt-2-6), a look-specific painted effect plays (kit §68: đẹp petals + glow + soft chime, diêm dúa gold sparkle + strong light + bolder sound,
   vụng ink + wobble + embarrassed sound, mặt mộc / vừa plain daylight), then a smooth ZOOM lands her face in the round bronze-mirror frame
   (kitFaceZoom) held ~2.5 s, then the close card (kit rows: tier, preset, hint). Tap = skip to the zoom, tap again = close. Gọn / reduced motion: no
   motion, the zoom + card at once. Co-op: nothing is sent. Costs: plate ≈ 121 KB once (on demand), effects from the kit (§68 files on demand). */
/* the card line under the level name (never repeats another level's name: owner 17/11 names) */
const TOIL_HINT={moc:"Gương mặt mộc: người trọng lễ dễ chê, kẻ ưa giản dị lại thấy thuận mắt.",vung:"Phấn son lem nhem, người gặp hôm nay dễ cười chê.",
 vua:"Vừa mắt, đúng mực, chẳng ai để ý nhiều; dịp lớn thì chưa đủ.",dep:"Tươi tắn mặn mà: người trọng lễ dễ khen, dịp lớn cũng xứng.",tuyet:"Rạng rỡ lung linh, ai gặp cũng ngoái nhìn; kẻ hay ghen thêm ghen.",
 diem:"Đậm quá dịp, quá phẩm: người ta chê phô trương, kẻ ưa phô trương lại khen."};
function toilPreName(col,look){if(!col)return"";const k=toilPreOf(Object.assign({},col,{want:look==="diem"?"diem":""}));const p=TOIL_PRE.find(x=>x[0]===k&&(x[2]==="diem")===(look==="diem"));return p?p[1]:"màu tự chọn"}
function toilFigAt(){let P=0;try{const it=wdItem(wdOf(S).y);P=it?it.P:0}catch(e){}const rank=P>=1?Math.min(7,P-1):S.rank;const f0=figTierOf;try{figTierOf=function(w){return w===S?rank:f0.apply(this,arguments)};return figFor(S,"")}catch(e){return""}finally{figTierOf=f0}}
/* the dressing-room plate (img/toil-mirror-room.webp, 1200x800): bx = its CSS background-position-x (.ktrv-plate), gx = the bronze mirror's glass centre across the picture (measured) */
const TOIL_PLATE={w:1200,h:800,bx:.52,gx:630/1200};/* gx = the mirror axis of symmetry measured on the painting (frame rows 60-470, left half vs flipped right half: x = 629.5-631 of 1200; dev/test/mirror-center.js re-measures it from the picture) */
function toilReveal(o,done){let fin=false;const end=()=>{if(fin)return;fin=true;try{done()}catch(e){console.error(e)}};
 try{if(typeof kmStage!=="function"||!kmOn()||!S||!TOIL_FIT.fit)return end();const fig=toilFigAt(),por=toilPor();if(!fig||!por.src)return end();
  const ff=kitFile(fig),pf=kitFile(por.src),v=TOIL_FIT.fit[ff];if(!v)return end();const A=v[8]||1.3,red=kmReduced(),look=o.look;
  /* the close-up is HER PORTRAIT laid exactly over her face in the figure (same mouth point, same face width from img/toil-fit.json): the figure picture is too soft at 5x, the portrait has the pixels */
  let porH="",porG=null;try{const pv=TOIL_FIT.fit[pf];if(pv&&pv[6]){const Ap=pv[8]||1.3,wp=100*v[6]/pv[6],hp=wp*Ap/A,pfx=kitFxLayers(S,pf);porG={l:v[0]-pv[0]*wp/100,wp};
   porH=`<span class="ktrv-pw" style="left:${(v[0]-pv[0]*wp/100).toFixed(2)}%;top:${(v[1]-pv[1]*hp/100).toFixed(2)}%;width:${wp.toFixed(2)}%;height:${hp.toFixed(2)}%"><img src="${IMG_U("img/"+pf)}" alt=""><span class="kfxf">${pfx}</span></span>`}}catch(e){}
  const fx=(()=>{try{return kitFxLayers(S,ff)}catch(e){return""}})();
  const rows=[["Dung nhan",`<span class="ef ${o.good?"g":look==="vung"?"r":"t"}"><b>${TOIL_MK[look]}${o.made?` · ${o.score} phần`:""}</b></span>`]];if(o.made)rows.push(["Kiểu",o.pre]);rows.push(["Hôm nay",TOIL_HINT[look]]);
  const html=`<div class="ktrv ktrv-${look}" style="--ktpx:${v[0]}%;--ktpy:${(v[1]-v[6]*.25/A).toFixed(2)}%"><div class="ktrv-cam"><i class="ktrv-plate" style="background-image:url(${IMG_U("img/toil-mirror-room.webp")})"></i><i class="ktrv-lt"></i>`+
   `<div class="ktrv-fig"><span class="ktrv-fw"><img src="${IMG_U("img/"+ff)}" alt=""><span class="kfxf">${fx}</span>${porH}</span></div></div>`+
   `<div class="ktrv-card kgr">${kitRows(rows)}</div></div>`;
  const rt=kmStage("ktrv-ov",html,{manual:true});const ov=rt.ov,R=ov.querySelector(".ktrv"),fw=ov.querySelector(".ktrv-fw"),im=fw.querySelector("img");
  const hint=document.createElement("div");hint.className="kmhint";hint.textContent="Chạm để bỏ qua";ov.appendChild(hint);
  fw.style.setProperty("--kta",(1/A).toFixed(5));/* the box = the picture box from the fit aspect (no wait for the picture), so the % layers (makeup, portrait) and the camera always sit on the picture */
  let ph=0;const T=[];const later=(ms,f)=>{if(!o.manual)T.push(setTimeout(()=>{try{f()}catch(e){console.error(e)}},ms))};
  const closeAll=()=>{if(ph===3)return;ph=3;T.forEach(clearTimeout);try{kitFxClear&&kitFxClear()}catch(e){}ov.classList.add("km-out");setTimeout(()=>ov.remove(),240);end()};
  /* KIT 81 scene-end button (owner OD:L1261): the zoomed face ends with ONE kit button; no tap anywhere closes it */
  const showCard=()=>{R.classList.add("ktrv-zoomed");kitSceneEnd(ov,"Tiếp theo",closeAll);/* the scene-end bar re-lays the overlay: aim the camera again on the settled layout */requestAnimationFrame(()=>{try{camSet()}catch(e){}})};
  const toZoom=()=>{if(ph>=2)return;ph=2;T.forEach(clearTimeout);T.length=0;if(!R.style.getPropertyValue("--ktsc"))camSet();R.classList.add("ktrv-zin");if(porH)R.classList.add("ktrv-hasp");showCard()};
  ov.addEventListener("click",e=>{e.stopPropagation();if(ph<2)toZoom()});
  /* THE CAMERA (owner 16/11 21:25Z): no round frame. Plate + figure sit in ONE .ktrv-cam; the camera zooms into HER FACE (clothes still in shot) on the same room painting */
  const camSet=()=>{/* layout metrics (offset*), never rects: rects carry the design-canvas scale and the step-in transform */
   let ox=0,oy=0,el=fw;while(el&&el!==R){ox+=el.offsetLeft;oy+=el.offsetTop;el=el.offsetParent}
   const RW=R.offsetWidth||innerWidth,RH=R.offsetHeight||innerHeight,w0=fw.offsetWidth||1,h0=fw.offsetHeight||1,fwpx=v[6]/100*w0;/* her face centre in R's CSS px (the figure at rest) */
   /* MIRROR CENTRE (owner 17/11 ~18:00Z): the face must sit in the MIDDLE OF THE GLASS, not just mid-screen. Face axis = the eye midpoint of the face-mesh (toilAxisX; the mouth point v[0] only when there is no mesh);
      the glass centre on the screen comes from the plate's own cover/position maths (TOIL_PLATE), and the standing figure is slid sideways (--ktdx on .ktrv-fig) so the axis lands on it;
      the camera then zooms about that point, so face, glass and screen centre are one vertical line at every size */
   const axP=toilAxisX(pf),axF=toilAxisX(ff),fxr=ox+(porG&&axP!=null?porG.l+axP*porG.wp:axF!=null?axF*100:v[0])/100*w0,P=TOIL_PLATE,ps=Math.max(RW/P.w,RH/P.h),gx=(RW-P.w*ps)*P.bx+P.gx*P.w*ps;
   const fx0=gx,fy0=oy+(v[1]-v[6]*.25/A)/100*h0;R.style.setProperty("--ktdx",`${(gx-fxr).toFixed(1)}px`);
   const sc=Math.max(1.5,Math.min(6,.34*Math.min(RW,RH)/Math.max(8,fwpx)));/* face width ≈ 34 % of the short side */
   R.style.setProperty("--kto",`${fx0.toFixed(1)}px ${fy0.toFixed(1)}px`);R.style.setProperty("--ktx",`${(RW/2-fx0).toFixed(1)}px`);R.style.setProperty("--kty",`${(RH*.36-fy0).toFixed(1)}px`);R.style.setProperty("--ktsc",sc.toFixed(2))};
  const goZoom=()=>{if(ph>=2)return;ph=1.5;camSet();R.classList.add("ktrv-go");later(1500,toZoom)};
  if(red){camSet();R.classList.add("ktrv-red");toZoom();return}
  /* step in, effect, zoom */
  camSet();/* the figure stands in front of the mirror from the first frame */[pf,ff].forEach(f=>toilEyePx(f).then(ok=>{if(ok&&ph<3){try{camSet()}catch(e){}}}));requestAnimationFrame(()=>R.classList.add("ktrv-in"));
  try{kitFxPreload&&kitFxPreload(look==="vung"?["ink"]:look==="diem"?["spark","petal-peach"]:look==="dep"||look==="tuyet"?["petal-plum","petal-peach"]:[])}catch(e){}
  const runFx=()=>{if(ph>=2)return;const SF={dep:"favour",tuyet:"favour",diem:"rankNew",vung:"mglose",vua:"mirror",moc:"mirror"}[look]||"mirror";try{kitSfx(SF)}catch(e){}
   /* KIT §68.7: light is a RIM only (starts at her outline, radiates outward, never over her face); sparks and petals leave from her silhouette's edges */
   const rc=im.getBoundingClientRect(),eL={x:rc.left+rc.width*.3,y:rc.top+rc.height*.42},eR={x:rc.right-rc.width*.3,y:rc.top+rc.height*.42};
   try{if(look==="dep"||look==="tuyet"){kitFxBurst("petal-plum",null,16,{});kitFxBurst("petal-peach",null,10,{});kitFxRim(im,{tone:"glow-gold",a:.65,r:16,dur:3200})}
    else if(look==="diem"){kitFxRim(im,{tone:"glow-gold",a:.95,r:24,dur:3200});kitFxBurst("spark",eL,12,{});kitFxBurst("spark",eR,12,{});kitFxBurst("petal-peach",null,14,{})}
    else if(look==="vung"){kitFxBurst("ink",eR,3,{scale:.8});R.classList.add("ktrv-wob")}
    else if(look==="vua"){kitFxRim(im,{tone:"glow-gold",a:.45,r:12,dur:2400})}}catch(e){}};later(900,runFx);
  later(red?0:3300,goZoom);if(o.manual)window.TOIL_REV={fx:runFx,go:goZoom,zoom:toZoom,close:closeAll,get ph(){return ph}};
 }catch(e){console.error(e);end()}}
window.toilReveal=toilReveal;
(function(){const st=document.createElement("style");st.id="ktrv-css";st.textContent=`
.ktrv-ov{background:#1a0c06;padding:0}.ktrv-ov .kmst{max-width:none;width:100%;height:100%;max-height:none;gap:0}
.ktrv{position:absolute;inset:0;overflow:hidden}
.ktrv-plate{position:absolute;inset:0;background-color:#2a140a;background-position:52% 42%;background-size:cover;background-repeat:no-repeat}
.ktrv-moc .ktrv-plate,.ktrv-vua .ktrv-plate{filter:brightness(1.22) saturate(.78) contrast(.94)}
.ktrv-lt{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity 1s}
.ktrv-moc .ktrv-lt{background:radial-gradient(ellipse at 50% 30%,#fff8e8aa,#fff8e800 70%);opacity:1}
.ktrv-dep .ktrv-lt,.ktrv-tuyet .ktrv-lt{background:radial-gradient(ellipse at 50% 55%,#ffe8c055,#ffe8c000 65%)}
.ktrv-diem .ktrv-lt{background:radial-gradient(ellipse at 50% 50%,#ffd27a99,#ffb03a00 70%)}
.ktrv-in .ktrv-lt{opacity:1}
.ktrv-fig{position:absolute;left:0;right:0;bottom:3%;height:88%;display:flex;justify-content:center;align-items:flex-end;pointer-events:none;transform:translateX(var(--ktdx,0px))}
.ktrv-cam{position:absolute;inset:0;transform-origin:var(--kto,50% 40%);transition:transform 1.5s cubic-bezier(.55,0,.25,1);will-change:transform}
.ktrv-go .ktrv-cam,.ktrv-zin .ktrv-cam{transform:translate(var(--ktx,0px),var(--kty,0px)) scale(var(--ktsc,3))}
.ktrv-zin .ktrv-cam{transition-duration:.6s}.ktrv-red .ktrv-cam{transition:none}
.ktrv-fw{position:relative;display:block;flex:none;height:100%;aspect-ratio:var(--kta,auto);opacity:0;transform:translateY(5%) scale(.97);transition:opacity .9s ease,transform 1s cubic-bezier(.2,.7,.2,1)}
.ktrv-fw>img{display:block;height:100%;width:auto;max-width:none;transition:opacity .6s ease}
.ktrv-fw>.kfxf{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;transition:opacity .6s ease}
.ktrv-pw{position:absolute;opacity:0;transition:opacity .6s ease;pointer-events:none}.ktrv-pw>img{display:block;width:100%;height:100%;max-width:none}.ktrv-pw>.kfxf{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}
.ktrv-zin .ktrv-pw{opacity:1}.ktrv-zin.ktrv-hasp .ktrv-fw>img,.ktrv-zin.ktrv-hasp .ktrv-fw>.kfxf{opacity:0}.ktrv-red .ktrv-pw,.ktrv-red .ktrv-fw>img{transition:none}
.ktrv-in .ktrv-fw,.ktrv-zin .ktrv-fw{opacity:1;transform:none}
.ktrv-wob .ktrv-fw{animation:ktWob .9s ease-in-out 2}
@keyframes ktWob{0%,100%{transform:none;filter:none}20%{transform:rotate(-1.6deg) skewX(2deg);filter:blur(1.4px)}50%{transform:rotate(1.4deg) skewX(-2deg);filter:blur(.8px)}75%{transform:rotate(-.8deg)}}
.ktrv-card{position:absolute;left:50%;bottom:max(34px,env(safe-area-inset-bottom));transform:translate(-50%,12px);width:min(92vw,420px);opacity:0;transition:opacity .5s ease .5s,transform .5s ease .5s}/* frame (background, border, radius, padding, shadow) = the ONE j93 frame rule .kmlist,.kprev-card,.ktrv-card (kit keeper K2) */
.ktrv-zoomed .ktrv-card{opacity:1;transform:translate(-50%,0)}

`;document.head.appendChild(st)})();
