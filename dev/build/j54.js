
/* ================= j54 CÔNG CHÚA: tài nghệ (Cầm Kỳ Thi Họa Vũ), dâng nghệ ở yến, tước hiệu, bàn hôn sự, hòa thân; một luật cho con gái của mọi người mẹ ================= */
/* fields on a daughter: hA {cam,ky,thi,hoa,vu} xp 0-100 (bậc = xp/20), hP art the tutor teaches, hT title 0-2, hM mẫu tử 0-100,
   hMet id of the young man she loves, hB betrothal {kind,s,b}, hW married {kind:"nha"|"tinh"|"hoa",s:{...},y,joy,b}, hV/hL last speak/letter turn, hBan last talks turn.
   on a mother: hon = backing from her daughters' in-law houses (adds to seat contests and faction strength, same for everyone), hpc = last princess event turn. */
const H54A=[["cam","Cầm"],["ky","Kỳ"],["thi","Thi"],["hoa","Họa"],["vu","Vũ"]];const H54N={cam:"Cầm",ky:"Kỳ",thi:"Thi",hoa:"Họa",vu:"Vũ"};
const H54={fee:6,cd:3,tut:2.6,nat:.45,good:48,poor:26,dow:[40,30,20],back:[14,9,5],love:5,clanRel:8,envy:-4,hoa:{danh:10,th:8,sung:6,bac:60,suc:-15}};
const H54T=["Công chúa","Trưởng công chúa","Cố Luân công chúa"];
const H54OFF={"Tể tướng":["Tể tướng","Tham tri chính sự","Thị lang Trung thư"],"Đại tướng quân":["Đại tướng quân","Phó tướng","Đô úy"],"Lễ bộ":["Thượng thư bộ Lễ","Thị lang bộ Lễ","Lang trung bộ Lễ"],"Hộ bộ":["Thượng thư bộ Hộ","Thị lang bộ Hộ","Lang trung bộ Hộ"],"Hàn lâm":["Hàn lâm Học sĩ","Hàn lâm Thị giảng","Hàn lâm Biên tu"]};
function h54Mom(k){const e=allKids().find(([x])=>x===k);return e?(e[1]||S):null}
function h54Live(p){return p===S?!!S&&!S.dead&&!S.out:!!(p&&p.alive&&!p.out)}
function h54Init(k){if(!k||k.sex!=="f")return k;if(!k.hA){k.hA={};const tot=Math.max(0,(k.age-5)*5);H54A.forEach(([a])=>k.hA[a]=0);for(let i=0;i<tot;i++){const a=pick(H54A)[0];k.hA[a]=Math.min(100,k.hA[a]+1)}}
 if(k.hT==null)k.hT=0;if(k.hM==null)k.hM=55+R(16);return k}
function h54Lv(k,a){return Math.floor(((k.hA||{})[a]||0)/20)}
function h54Home(k){return k&&k.alive&&k.sex==="f"&&!k.hW}
function h54Gn(k){return String(k.name).replace(/^Công chúa /,"")}
function h54Name(k){return `${H54T[k.hT||0]} ${h54Gn(k)}`}
function h54Daus(){return allKids().filter(([k])=>k.alive&&k.sex==="f").map(([k,v])=>(h54Init(k),[k,v||S]))}
function h54MomN(p){return p===S?"ngươi":p.name}
/* married daughters live outside the palace: hide them from palace-only code (home people, deck, illness, exams, harm) */
function h54Hide(fn){return function(){const L=[];try{allKids().forEach(([k])=>{if(k.alive&&k.hW){k.alive=false;L.push(k)}})}catch(e){}try{return fn.apply(this,arguments)}finally{L.forEach(k=>k.alive=true)}}}
["homePeople","countAt","seenAt","deal","kidsMonth","ktList","ktSyncAll"].forEach(n=>{if(typeof window[n]==="function")window[n]=h54Hide(window[n])});
(function(){const k0=kidsOf;kidsOf=function(p){return k0.apply(this,arguments).filter(k=>!k.hW)}})();
(function(){if(typeof kidActs!=="function")return;const a0=kidActs;kidActs=function(k){return k&&k.hW?[]:a0.apply(this,arguments)}})();
/* ---- backing from in-law houses: one field, wired into seat contest and faction strength for everyone ---- */
(function(){const w0=seatW;seatW=function(p){return w0.apply(this,arguments)+((p&&p.hon)||0)/2}})();
(function(){const f0=facStr;facStr=function(f){let s=f0.apply(this,arguments);try{s+=Math.round(facMembers(f).reduce((a,p)=>a+(p.hon||0)/2,0))}catch(e){}return s}})();
(function(){if(typeof backers!=="function")return;const b0=backers;backers=function(p){const L=b0.apply(this,arguments);try{if(Array.isArray(L)&&(p.hon||0)>=8)L.push("nhà thông gia")}catch(e){}return L}})();
/* ---- young men of the ministers' houses (phò mã candidates): name, house, father's office, age 18+, looks, talent ---- */
function h54Pool(){S.hPool=S.hPool||[];return S.hPool}
function h54Son(id){return h54Pool().find(s=>s.id===id)||null}
function h54Q(s){return (3-s.tier)*20+s.sac/5+s.tai/5}
function h54NewSon(){const P=h54Pool();const used=namesInUse().concat(P.map(s=>s.name),allKids().map(([k])=>k.hW&&k.hW.s?k.hW.s.name:"")).filter(Boolean);
 const house=pick(CLANS);const surU=P.filter(s=>!s.taken).map(s=>s.name.split(" ").slice(0,-2).join(" "));const SS=SURN.filter(x=>!surU.includes(x));const head=P.some(s=>!s.taken&&s.house===house&&s.tier===0);let tier=R(100)<20&&!head?0:R(100)<45?1:2;
 let name="";for(let t=0;t<80&&!name;t++){const n=pick(SS.length?SS:SURN)+" "+pick(MALEN);if(!used.includes(n))name=n}if(!name)name=pick(SURN)+" "+pick(MALEN)+" "+(R(80)+10);
 S.hSid=(S.hSid||0)+1;const s={id:S.hSid,name,house,tier,off:H54OFF[house][tier],age:18+R(6),sac:40+R(56),tai:30+R(66),taken:null};P.push(s);return s}
function h54PoolUp(){const P=h54Pool();for(let i=P.length-1;i>=0;i--){const s=P[i];if(!s.taken&&s.age>27){h54FreeFace(s);P.splice(i,1)}}let n=P.filter(s=>!s.taken).length;while(n<8){h54NewSon();n++}}
function h54FreeFace(s){try{if(s.fid){const U=figUsed();const i=U.indexOf(s.fid);if(i>=0)U.splice(i,1)}}catch(e){}}
function h54Face(s){let src="";try{if(typeof FIGIX!=="undefined"&&FIGIX.man){if(!s.fid){const U=figUsed();const fr=Object.keys(FIGIX.man).filter(x=>!U.includes(x));if(fr.length){s.fid=fr[0];U.push(s.fid)}}
  const L=s.fid&&FIGIX.man[s.fid];if(L&&L.length){const f=figBest(L,null,s.age||20);if(f)src=figPath(f.por||f.file||f.src)}}}catch(e){}
 return{rk:"off",rw:"Công tử",src,hue:0,ini:String(s.name).split(" ").pop()[0],col:"#6a8aa0"}}
function h54SonLine(s){return `${s.name} · ${s.age} tuổi · con trai ${s.off} · phe ${s.house} · Sắc ${s.sac} · Tài ${s.tai}`}
/* how high a match the family can reach: title, mother's rank, the Emperor's love, her arts and virtue */
function h54Pull(p,k){const L=H54A.reduce((a,[x])=>a+h54Lv(k,x),0);return 20+(k.hT||0)*15+rkOf(p)*5+k.fond/4+L*2+(k.td!=null?k.td/10:0)}
function h54Cands(p,k){const pl=h54Pull(p,k);const F=h54Pool().filter(s=>!s.taken).sort((a,b)=>h54Q(b)-h54Q(a));let C=F.filter(s=>h54Q(s)<=pl+15).slice(0,3);if(!C.length&&F.length)C=[F[F.length-1]];return C}
function h54Dow(k,s){return H54.dow[k.hT||0]+(s.tier===0?20:0)}
function h54Back(k,s){return H54.back[s.tier]+2*(k.hT||0)}
/* ---- betrothal and wedding (the same function for every mother) ---- */
function h54Rivals(p,k){return h54Daus().filter(([d,m])=>m!==p&&d!==k&&h54Home(d)&&!d.hB&&d.age>=15&&d.age<=19&&h54Live(m)).map(([,m])=>m).filter((m,i,a)=>a.indexOf(m)===i)}
function h54Betroth(k,p,s,kind,paid){const me=p===S;const love=s.id===k.hMet;let b=0,txt="";
 if(kind==="nha"){b=h54Back(k,s);if(!paid)ap(p,{danh:2+(k.hT||0),bac:-Math.min(h54Dow(k,s),p.bac||0)});if(!love)k.hM=cl(k.hM-6,0,100);else k.hM=cl(k.hM+10,0,100);
  consorts().filter(c=>c!==p&&clanOf(c)===s.house).forEach(c=>relAdd(p,c,H54.clanRel));if(s.tier<=1)h54Rivals(p,k).forEach(m=>relAdd(p,m,H54.envy))}
 else if(kind==="tinh"){b=H54.love;ap(p,{duc:3,danh:2});k.hM=cl(k.hM+15,0,100)}
 p.hon=(p.hon||0)+b;h54Court(p,s.house,kind==="nha"?15:8);s.taken=k.name;k.hB={kind:love?"tinh":kind,s:s.id,b,joy:love||kind==="tinh"?90:25+R(40)};
 txt=`${h54Name(k)}${me?", con ngươi,":` (con ${p.name})`} được hứa gả cho ${s.name}, con trai ${s.off}${b?`; nhà ấy chống lưng ${me?"ngươi":p.name} (+${b})`:""}.`;
 if(k.age>=BAL.age.wed)txt+=" "+h54Wed(k,p);else txt+=` Cưới khi con tròn ${BAL.age.wed} tuổi.`;return txt}
/* if the court module (j55) is loaded, the in-law house also warms to the mother there */
function h54Court(p,house,n){try{const T=S.trieu;const h=T&&T.H&&T.H[house];if(h&&h.af){const kk=key(p);h.af[kk]=cl((h.af[kk]||0)+n,-100,100)}}catch(e){}}
function h54Wed(k,p){const s=h54Son(k.hB.s);if(!s){k.hB=null;return""}k.hW={kind:k.hB.kind,s:{name:s.name,house:s.house,off:s.off,tier:s.tier,age:s.age,fid:s.fid||""},y:S.year,joy:k.hB.joy,b:k.hB.b};k.wed=1;
 const P=h54Pool();P.splice(P.indexOf(s),1);k.hB=null;k.hP=null;if(k.tut)k.tut=0;if(k.vt)k.vt=0;k.fav=0;
 return `${h54Name(k)} xuất giá về phủ phò mã ${s.name}.`}
function h54Hoa(k,p,paid){const me=p===S;if(!paid)ap(p,H54.hoa);k.hW={kind:"hoa",s:{name:"Thế tử Bắc Địch",house:"Bắc Địch",off:"Khả hãn Bắc Địch",tier:0,age:20,fid:""},y:S.year,joy:40,b:0};k.wed=1;k.hB=null;k.hP=null;if(k.tut)k.tut=0;if(k.vt)k.vt=0;
 if(S.hEnv){S.hEnv=null;S.hEnvY=S.turn}
 return `${h54Name(k)}${me?", con ngươi,":` (con ${p.name})`} theo sứ đoàn sang Bắc Địch hòa thân. Hoàng thượng cảm kích, ban thưởng ${me?"ngươi":p.name}.`}
/* ---- titles: eldest or much loved → Trưởng công chúa; the Empress's daughter or great favour → Cố Luân công chúa ---- */
function h54Titles(){let ev="";const D=h54Daus();const old=D.slice().sort((a,b)=>b[0].age-a[0].age)[0];
 for(const [k,p] of D){const q=p===queenP()||p===S&&S.rank>=7;let t=q||k.fond>=88?2:(old&&old[0]===k&&k.age>=12)||(k.fond>=72&&k.age>=10)?1:0;
  if(t>(k.hT||0)){k.hT=t;const d=t===2?5:3;if(h54Live(p))ap(p,{danh:d});const why=t===2?(q?"con của Hoàng hậu":"được Hoàng thượng hết mực yêu thương"):(old&&old[0]===k&&k.age>=12?"trưởng nữ của Hoàng thượng":"được Hoàng thượng yêu thương");
   const line=`Thánh chỉ: phong ${h54Gn(k)} làm ${H54T[t]} (${why}).${h54Live(p)?` ${p===S?"Ngươi":p.name} Danh +${d}.`:""} `;if(p===S)ev+=`<span class="g">${line}</span>`;else log(line)}}
 return ev}
/* ---- arts: natural growth, tutors (paid with the stipend), mothers teaching; j53's Văn helps Thi and Kỳ ---- */
function h54TeachG(p,k,a){return 4+((p.arts||{})[a]||0)}
function h54CanTeach(p,k,a){return ((p.arts||{})[a]||0)>h54Lv(k,a)}
function h54Grow(k,p){if(!h54Home(k)||k.age<5)return;const h=k.hp>=60?1:k.hp>=35?.5:.2;const A=k.hA;
 const a0=pick(H54A)[0];A[a0]=Math.min(100,A[a0]+H54.nat*3*h);
 if(k.hP&&h54Live(p))A[k.hP]=Math.min(100,A[k.hP]+H54.tut*h);
 if(k.tv!=null){A.thi=Math.min(100,A.thi+k.tv/250);A.ky=Math.min(100,A.ky+k.tv/250)}}
function h54NpcArts(k,v){if(!h54Live(v)||!h54Home(k)||k.age<5)return;const P=/Tham vọng|Kiêu ngạo|Xảo quyệt/.test(v.trait)?.6:.4;
 if(!k.hP&&k.age>=6&&(v.bac||0)>=H54.fee*6&&roll(P*30)){const best=H54A.map(([a])=>a).sort((a,b)=>k.hA[b]-k.hA[a])[0];k.hP=R(3)?best:pick(H54A)[0]}
 const T=H54A.map(([a])=>a).filter(a=>h54CanTeach(v,k,a));if(T.length&&roll(P*60)){const a=pick(T);k.hA[a]=Math.min(100,k.hA[a]+h54TeachG(v,k,a));k.hM=cl(k.hM+2,0,100)}}
(function(){const s0=stipend;stipend=function(p){let line=s0.apply(this,arguments);try{const ks=(p.kids||[]).filter(k=>h54Home(k)&&k.hP);let fee=ks.length*H54.fee;const quit=[];
  while(fee>0&&(p.bac||0)<fee){const k=ks.pop();k.hP=null;quit.push(`thầy ${"nghệ"} của ${k.name}`);fee=ks.length*H54.fee}
  if(fee>0)ap(p,{bac:-fee});if(p===S&&line){if(fee)line=line.replace(/ = ([+-]?\d+) bạc/,(m,n)=>` · thầy nghệ các công chúa -${fee} = ${(+n-fee)>=0?"+":""}${+n-fee} bạc`);if(quit.length)line+=` Không đủ bạc: ${quit.join(", ")} thôi dạy.`}}catch(e){}return line}})();
/* ---- the month ---- */
function h54Cd(p){const t=p===S?S.hpc:p.hpc;return t==null||S.turn-t>=H54.cd}
function h54Mark(p){if(p===S)S.hpc=S.turn;else p.hpc=S.turn}
function h54Month(){let ev="";if(!S||S.dead)return ev;h54PoolUp();if(S.month===1)h54Pool().forEach(s=>s.age++);
 const D=h54Daus();
 for(const [k,p] of D){
  h54Grow(k,p);if(p!==S)h54NpcArts(k,p);
  /* betrothed and now 18: the wedding */
  if(k.hB&&k.age>=BAL.age.wed&&h54Home(k)){const t=h54Wed(k,p);if(t){if(p===S)ev+=`<span class="g">${t}</span> `;else log(t)}}
  /* she meets someone (16–20, at home, no promise yet) */
  if(h54Home(k)&&!k.hB&&!k.hMet&&k.age>=BAL.age.betroth&&k.age<=20&&roll(3)&&h54Cd(p)){const F=h54Pool().filter(s=>!s.taken);if(F.length){const s=pick(F);h54Mark(p);
    if(p===S)pushDil(mkP("h54met",{k:k.name,s:s.id}),"Con gái có người thương");else k.hMet=s.id}}
  /* NPC mothers open marriage talks by themselves (same options as hers) */
  if(p!==S&&h54Live(p)&&h54Home(k)&&!k.hB&&k.age>=BAL.age.betroth&&h54Cd(p)&&roll(20)){h54Mark(p);const t=h54NpcBan(k,p);if(t)log(t)}
  /* nobody arranged it: the Emperor does (19+, or 18+ when the mother is gone) */
  if(h54Home(k)&&!k.hB&&(k.age>=19||k.age>=BAL.age.wed&&!h54Live(p))&&roll(8)){const C=h54Cands(p,k);if(C.length){const s=C[0];const b=Math.round(h54Back(k,s)/2);p.hon=(p.hon||0)+b;s.taken=k.name;k.hB={kind:"nha",s:s.id,b,joy:s.id===k.hMet?90:30+R(35)};
    const t=`Hoàng thượng tự chỉ hôn: ${h54Name(k)} gả cho ${s.name}, con trai ${s.off}${b?` (nhà ấy chống lưng ${h54MomN(p)} +${b})`:""}. `+h54Wed(k,p);if(p===S)ev+=t+" ";else log(t)}}
  /* married: letters, speaking for her mother, an unhappy match may bring trouble */
  if(k.hW&&k.alive){const W=k.hW;
   if(p!==S&&h54Live(p)){if(roll(10)&&(p.bac||0)>=15){ap(p,{bac:-15});k.hM=cl(k.hM+8,0,100)}
    if(W.kind!=="hoa"&&S.turn-(k.hV==null?-99:k.hV)>=4&&roll(25)&&(p.bac||0)>=10){k.hV=S.turn;ap(p,{bac:-10});k.hM=cl(k.hM-4,0,100);if(roll(odA(p,h54SpeakO(k)))){if(p.confined>0){p.confined--;log(`${h54Name(k)} vào cung quỳ xin cho mẹ; Hoàng thượng giảm cấm túc của ${p.name} một tháng.`)}else ap(p,{sung:3+(W.kind==="tinh"?2:0)})}}}
   if(W.kind==="nha"&&W.joy<40&&roll(1.5)&&h54Cd(p)&&h54Live(p)){h54Mark(p);if(p===S)pushDil(mkP("h54sad",{k:k.name}),"Con gái về khóc");else{
     if(/Hiền lành|Nhu mì/.test(p.trait)){ap(p,{sung:-4});if(roll(odA(p,40+k.fond/2))){W.joy=cl(W.joy+30,0,100);k.hM=cl(k.hM+8,0,100)}}else{k.hM=cl(k.hM-8,0,100);ap(p,{danh:1})}}}}}
 /* bonds lost before a wedding */
 allKids().forEach(([k,v])=>{if(!k.alive&&k.hB&&!k.hBx){k.hBx=1;const p=v||S;p.hon=Math.max(0,(p.hon||0)-(k.hB.b||0));const s=h54Son(k.hB.s);if(s)s.taken=null}});
 ev+=h54Titles();ev+=h54Envoy();
 /* she is told once when a daughter comes of age for marriage talks */
 S.kids.forEach(k=>{if(h54Home(k)&&k.age>=BAL.age.betroth&&!k.h16){k.h16=1;ev+=`${h54Name(k)} tròn ${BAL.age.betroth} tuổi: từ nay bàn được hôn sự ở thẻ con (cưới khi tròn ${BAL.age.wed}). `}});
 return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments)||"";try{if(S&&!S.dead)ev+=h54Month()}catch(e){console.error(e)}return ev}})();
/* ---- NPC marriage talks: same candidates, same costs, choice by temper ---- */
function h54NpcBan(k,p){const love=k.hMet&&h54Son(k.hMet)&&!h54Son(k.hMet).taken?h54Son(k.hMet):null;
 if(S.hEnv&&k.age>=BAL.age.wed&&/Tham vọng|Kiêu ngạo/.test(p.trait)&&k.fond<50&&roll(40))return h54Hoa(k,p);
 if(love&&(/Hiền lành|Nhu mì/.test(p.trait)||roll(25))&&!h54Cands(p,k).includes(love)){ap(p,{sung:-5});if(roll(odA(p,h54LoveO(p,k))))return h54Betroth(k,p,love,"tinh");return""}
 const C=h54Cands(p,k).filter(s=>(p.bac||0)>=h54Dow(k,s));if(!C.length)return"";const s=love&&C.includes(love)?love:C[0];return h54Betroth(k,p,s,"nha")}
function h54LoveO(p,k){return 30+k.fond/2+(p.sung||0)/4}
function h54SpeakO(k){const W=k.hW||{};return 40+k.hM/2+((W.joy||50)-50)/5}
/* ---- envoy from Bắc Địch asks for a princess (18+); three months for a mother to offer her daughter, then the Emperor chooses ---- */
function h54Elig(){return h54Daus().filter(([k])=>h54Home(k)&&!k.hB&&k.age>=BAL.age.wed)}
function h54Envoy(){let ev="";const E=h54Elig();
 if(!S.hEnv){if(E.length&&(S.hEnvY==null||S.turn-S.hEnvY>=24)&&roll(4)){S.hEnv={until:S.turn+3};ev+=`Sứ thần Bắc Địch vào kinh dâng ngựa quý, xin cưới một vị công chúa đã đến tuổi. Hoàng thượng muốn thuận mối này: trong ba tháng, phi tần nào dâng con thì được ban thưởng; quá hạn ngài tự chọn. `}return ev}
 if(!E.length){S.hEnv=null;S.hEnvY=S.turn;return ev+"Sứ thần Bắc Địch về nước tay không: trong cung không còn công chúa nào đến tuổi. "}
 for(const [k,p] of E)if(p!==S&&h54Live(p)&&/Tham vọng|Kiêu ngạo/.test(p.trait)&&k.fond<50&&roll(15)){log(h54Hoa(k,p));return ev}
 if(S.turn>=S.hEnv.until){const w=E.map(([k,p])=>Math.max(5,100-k.fond+(7-rkOf(p))*8));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}const [k,p]=E[i];
  if(p===S){S.hEnv.until=S.turn+99;pushDil(mkP("h54hoa",{k:k.name}),"Sứ thần cầu hôn")}
  else if(h54Live(p)&&(/Hiền lành|Nhu mì/.test(p.trait)||k.hM>=75)){if(roll(odA(p,30+(p.sung||0)/3+k.fond/4))){S.hEnv=null;S.hEnvY=S.turn;log(`${p.name} quỳ xin giữ ${h54Name(k)} lại; Hoàng thượng động lòng, gả một tông nữ sang Bắc Địch thay.`)}else{ap(p,{sung:-10,danh:-3});log(`${p.name} quỳ xin giữ con nhưng Hoàng thượng không nghe. `+h54Hoa(k,p))}}
  else log(h54Hoa(k,p))}
 return ev}
EVI.foreignwed&&(EVI.foreignwed.ok=()=>false);
PEND.foreignwed=pp=>PEND.h54hoa({k:pp.k});
PEND.h54hoa=pp=>{const k=S.kids.find(x=>x.name===pp.k&&h54Home(x));if(!k)return null;h54Init(k);const o=od(30+S.sung/3+mm()+k.fond/4),o2=od(55+S.sung/4);
 const H=H54.hoa;return{who:pEmp(),t:`Sứ thần Bắc Địch dâng ngựa quý, xin cưới một vị công chúa. Hoàng thượng muốn thuận mối này và chọn ${h54Name(k)}, con ngươi, ${k.age} tuổi.<br>Ngài hỏi ý ngươi.`,o:[
 {n:"Thuận theo ý Hoàng thượng",fx:Object.assign({},H),x:`Hoàng thượng cảm kích, ban thưởng · kèm: con sang Bắc Địch, không về thăm và không nói giúp được nữa`,go:()=>log(h54Hoa(k,S,1))},
 {n:"Quỳ xin giữ con lại",fx:{},x:`${word(o)} · thành: ngài gả một tông nữ thay, con ở lại bên ngươi (Mẫu tử +10) · hỏng: Sủng -10, Danh -3, Sức -15 và con vẫn phải đi, không được ban thưởng`,go:()=>{if(roll(o)){k.hM=cl(k.hM+10,0,100);S.hEnv=null;S.hEnvY=S.turn;log(`Hoàng thượng động lòng, gả một tông nữ sang Bắc Địch thay ${h54Name(k)}. Mẫu tử +10.`)}else{apply({sung:-10,danh:-3,suc:-15});k.hW={kind:"hoa",s:{name:"Thế tử Bắc Địch",house:"Bắc Địch",off:"Khả hãn Bắc Địch",tier:0,age:20,fid:""},y:S.year,joy:35,b:0};k.wed=1;k.hB=null;k.hP=null;S.hEnv=null;S.hEnvY=S.turn;log(`<span class="r">Hoàng thượng không nghe lời xin; ${h54Name(k)} vẫn phải sang Bắc Địch.</span>`)}}},
 {n:`Tiến cử một tông nữ, tự lo hồi môn${S.bac<50?" (thiếu bạc: cần 50)":""}`,fx:{bac:-50,danh:-2},x:`${word(o2)} · thành: con ở lại bên ngươi (Mẫu tử +5) · hỏng: ngài không đổi ý, con vẫn phải đi; ngươi được Thái hậu +8, Sủng +6 vì không cãi ý, Sức -15`,go:()=>{if(roll(o2)){k.hM=cl(k.hM+5,0,100);S.hEnv=null;S.hEnvY=S.turn;log(`Hoàng thượng nhận tông nữ ngươi tiến cử; ${h54Name(k)} ở lại. Mẫu tử +5.`)}else{apply({th:8,sung:6,suc:-15});k.hW={kind:"hoa",s:{name:"Thế tử Bắc Địch",house:"Bắc Địch",off:"Khả hãn Bắc Địch",tier:0,age:20,fid:""},y:S.year,joy:40,b:0};k.wed=1;k.hB=null;k.hP=null;S.hEnv=null;S.hEnvY=S.turn;log(`Hoàng thượng không đổi ý; ${h54Name(k)} theo sứ đoàn sang Bắc Địch.`)}}}]}};
/* ---- she meets someone ---- */
PEND.h54met=pp=>{const k=S.kids.find(x=>x.name===pp.k&&h54Home(x));const s=h54Son(pp.s);if(!k||!s||s.taken)return null;h54Init(k);
 return{who:kidFace(k),t:`${h54Name(k)} gặp ${s.name} ở hội đạp thanh ngoài vườn ngự uyển, từ đó hay hỏi chuyện về chàng.<div class="h54c">${mdH(h54Face(s),"sm")}<span>${h54SonLine(s)}</span></div>`,o:[
 {n:"Để con qua lại thư từ",fx:{danh:-1},x:`Mẫu tử +6 · con có người thương: khi bàn hôn sự được xin cho con lấy chàng · kèm: lời ra tiếng vào`,go:()=>{k.hMet=s.id;k.hM=cl(k.hM+6,0,100);log(`Ngươi để ${h54Name(k)} thư từ với ${s.name}. Mẫu tử +6.`)}},
 {n:"Cấm con gặp lại",fx:{danh:1},x:`kèm: Mẫu tử -10`,go:()=>{k.hM=cl(k.hM-10,0,100);log(`Ngươi cấm ${h54Name(k)} gặp lại ${s.name}. Mẫu tử -10.`)}}]}};
/* ---- an unhappy political match ---- */
PEND.h54sad=pp=>{const k=S.kids.find(x=>x.name===pp.k&&x.alive&&x.hW);if(!k)return null;const W=k.hW;const o=od(40+k.fond/2);
 return{who:kidFace(k),t:`${h54Name(k)} về cung thăm ngươi, khóc kể phò mã ${W.s.name} lạnh nhạt, nhà chồng hà khắc.`,o:[
 {n:"Xin Hoàng thượng răn dạy phò mã",fx:{sung:-4},x:`${word(o)} · thành: phò mã biết sợ, con vui hơn, Mẫu tử +8 · hỏng: ngài cho là chuyện nhà, bỏ qua`,go:()=>{if(roll(o)){W.joy=cl(W.joy+30,0,100);k.hM=cl(k.hM+8,0,100);log(`Hoàng thượng răn dạy phò mã ${W.s.name}; ${h54Name(k)} vui hơn. Mẫu tử +8.`)}else log(`Hoàng thượng bỏ qua: “Chuyện nhà phò mã, để họ tự lo.” Xin không thành.`)}},
 {n:"Khuyên con nhẫn nhịn",fx:{danh:1},x:`kèm: Mẫu tử -8`,go:()=>{k.hM=cl(k.hM-8,0,100);log(`Ngươi khuyên ${h54Name(k)} nhẫn nhịn. Mẫu tử -8.`)}}]}};
/* ---- marriage talks (bàn hôn sự): great house · plead for the one she loves · hòa thân (when an envoy waits) · wait ---- */
PEND.h54ban=pp=>{const k=S.kids.find(x=>x.name===pp.k&&h54Home(x));if(!k||k.hB)return null;h54Init(k);const C=(pp.c||[]).map(h54Son).filter(s=>s&&!s.taken);
 const love=k.hMet&&h54Son(k.hMet)&&!h54Son(k.hMet).taken?h54Son(k.hMet):null;const R2=h54Rivals(S,k);const O=[];
 const rows=C.map(s=>`<div class="h54c">${mdH(h54Face(s),"sm")}<span>${h54SonLine(s)}${s===love?' · <b class="g">người con thương</b>':""}</span></div>`).join("");
 for(const s of C){const d=h54Dow(k,s),b=h54Back(k,s),isL=s===love;
  O.push({n:`Hứa gả cho ${s.name}${S.bac<d?` (thiếu bạc: cần ${d})`:""}`,fx:{danh:2+(k.hT||0),bac:-d},x:[`nhà ${s.off} chống lưng ngươi +${b} (cộng vào thế lực phe và tranh ghế)`,`các phi tần phe ${s.house} thiện cảm +${H54.clanRel}`,isL?"con lấy người con thương: Mẫu tử +10, con sống vui":"",isL?"":`kèm: con không chọn người này: Mẫu tử -6 · con không vui với nhà chồng: ${chanceW(38)} (khi ấy con về khóc, ít về thăm)`,s.tier<=1&&R2.length?`kèm: ${R2.length} phi tần có con gái cùng tuổi ghen (thiện cảm ${H54.envy})`:""].filter(Boolean).join(" · "),go:()=>{log(h54Betroth(k,S,s,"nha",1))}})}
 if(love&&!C.includes(love)){const o=od(h54LoveO(S,k));O.push({n:`Xin Hoàng thượng cho con lấy người con thương (${love.name})`,fx:{sung:-5},x:`${word(o)} · thành: con được hứa gả cho ${love.name}: Mẫu tử +15, Đức +3, Danh +2, nhà chàng biết ơn chống lưng ngươi +${H54.love}, con sống vui, không sinh chuyện về sau · hỏng: ngài không chuẩn (con biết ngươi đã xin: Mẫu tử +5)`,go:()=>{if(roll(o))log(h54Betroth(k,S,love,"tinh")+" Mẫu tử +15.");else{k.hM=cl(k.hM+5,0,100);log(`Hoàng thượng không chuẩn cho ${h54Name(k)} lấy ${love.name}. Con biết ngươi đã xin: Mẫu tử +5.`)}}})}
 if(S.hEnv&&k.age>=BAL.age.wed)O.push({n:"Dâng con đi hòa thân Bắc Địch",fx:Object.assign({},H54.hoa),x:`Hoàng thượng cảm kích, ban thưởng · kèm: con sang Bắc Địch, không về thăm và không nói giúp được nữa`,go:()=>log(h54Hoa(k,S,1))});
 O.push({n:"Chưa bàn vội",fx:{},x:`con được ở cạnh ngươi thêm: Mẫu tử +3 · kèm: mỗi tháng phi tần khác hỏi trước một mối: ${chanceW(8)}`,go:()=>{k.hM=cl(k.hM+3,0,100);log(`Ngươi chưa vội bàn hôn sự cho ${h54Name(k)}. Mẫu tử +3.`)}});
 return{who:kidFace(k),t:`Bàn hôn sự cho ${h54Name(k)}, ${k.age} tuổi${k.age<BAL.age.wed?" (hứa hôn trước, cưới khi tròn "+(BAL.age.wed)+")":""}. Các mối hỏi được (tùy tước hiệu con, phẩm vị ngươi, lòng thương của Hoàng thượng, tài nghệ và Đức của con):<div class="h54cl">${rows||'<p class="past">Chưa có mối nào.</p>'}</div>${love&&!C.includes(love)?`<div class="h54c">${mdH(h54Face(love),"sm")}<span>${h54SonLine(love)} · <b class="g">người con thương</b> (nhà chàng thấp hơn các mối trên: phải xin Hoàng thượng)</span></div>`:""}`,o:O}};
/* ---- tutor choice ---- */
PEND.h54tut=pp=>{const k=S.kids.find(x=>x.name===pp.k&&h54Home(x));if(!k)return null;h54Init(k);const yr=Math.round(12*H54.tut);
 const O=H54A.filter(([a])=>a!==k.hP).map(([a,n])=>({n:`Mời thầy dạy ${n}`,fx:{},x:`${n} con khoảng +${yr} mỗi năm (hiện ${Math.round(k.hA[a])}) · tốn: Bạc -${H54.fee} mỗi tháng, trả cùng bổng lộc`,go:()=>{k.hP=a;log(`Mời thầy dạy ${n} cho ${h54Name(k)}: Bạc ${H54.fee} mỗi tháng.`)}}));
 if(k.hP)O.push({n:`Thôi mời thầy ${H54N[k.hP]}`,fx:{},x:`bớt Bạc ${H54.fee} mỗi tháng · kèm: ${H54N[k.hP]} con chậm lại`,go:()=>{log(`Thầy ${H54N[k.hP]} của ${h54Name(k)} thôi dạy.`);k.hP=null}});
 return{who:kidFace(k),t:`Chọn thầy dạy tài nghệ cho ${h54Name(k)}. Mỗi lúc một thầy.${k.hP?` Đang học: <b>${H54N[k.hP]}</b>.`:""}`,o:O}};
/* ---- festivals: princesses perform (true results for all; she chooses for her own daughters) ---- */
function h54Arts(f){return f==="sac"?["vu","cam"]:["cam","thi","hoa"]}
function h54W(a){return (["cam","ky","thi","hoa"].includes(a)&&has("trongtai"))||(a==="vu"&&has("mesac"))?1.5:1}
function h54Base(k,a){return h54Lv(k,a)*14*h54W(a)+Math.min(k.age,16)*1.2+(k.tv!=null?k.tv/8:(k.tal||40)/10)-(k.hp<60?8:0)}
function h54PGood(b){return Math.round(100*Math.max(0,Math.min(31,31-Math.max(0,Math.ceil(H54.good-b))))/31)}
function h54PPoor(b){return Math.round(100*Math.max(0,Math.min(31,Math.ceil(H54.poor-b)))/31)}
function h54BestArt(k,f){return h54Arts(f).sort((a,b)=>h54Base(k,b)-h54Base(k,a))[0]}
function h54Perf(){return h54Daus().filter(([k,p])=>h54Home(k)&&k.age>=6&&k.hp>=35&&h54Live(p))}
const H54G={good:{fond:2,danh:1},top:{fond:4,sung:3,danh:1},poor:{fond:-2,danh:-1},skip:{fond:-1}};
function h54GainTxt(){return `được khen: Hoàng thượng thương con +${H54G.good.fond}, Danh +${H54G.good.danh}; đứng đầu thêm thương con +${H54G.top.fond}, Sủng +${H54G.top.sung}, Danh +${H54G.top.danh}`}
function h54Run(f,title,mine){const P=h54Perf();const byMom=new Map();P.forEach(([k,p])=>{if(!byMom.has(p))byMom.set(p,[]);byMom.get(p).push(k)});const res=[];
 for(const [p,ks] of byMom){let k,a,skip=false;
  if(p===S){if(!mine)continue;if(mine.skip){k=S.kids.find(x=>x.name===mine.k)||ks[0];skip=true}else{k=S.kids.find(x=>x.name===mine.k);if(!k||!ks.includes(k))continue;a=mine.a}}
  else{k=ks.sort((x,y)=>h54Base(y,h54BestArt(y,f))-h54Base(x,h54BestArt(x,f)))[0];a=h54BestArt(k,f);if(h54PPoor(h54Base(k,a))>40&&p.trait!=="Kiêu ngạo"&&roll(30))skip=true}
  if(skip){res.push({k,p,r:"skip",s:-99});continue}const s=h54Base(k,a)+R(31);res.push({k,p,a,s,r:s>=H54.good?"good":s<H54.poor?"poor":"ok"})}
 if(!res.length)return"";const top=res.filter(x=>x.r==="good").sort((x,y)=>y.s-x.s)[0];
 for(const x of res){const g=Object.assign({},H54G[x.r]||{});if(x===top)for(const kk in H54G.top)g[kk]=(g[kk]||0)+H54G.top[kk];x.g=g;if(g.fond)x.k.fond=cl(x.k.fond+g.fond,0,100);if(x.r==="skip")x.k.hM=cl(x.k.hM+2,0,100);
  const o={};if(g.sung)o.sung=g.sung;if(g.danh)o.danh=g.danh;if(Object.keys(o).length)ap(x.p,o)}

 const RW={good:"Được khen",ok:"Bình thường",poor:"Vụng",skip:"Ở nhà"};
 const eff=x=>{const g=x.g,o=[];if(g.fond)o.push(`<span class="${g.fond>0?"g":"r"}">thương con ${g.fond>0?"+":""}${g.fond}</span>`);if(g.sung)o.push(`<span class="g">Sủng ${x.p===S?"":"mẹ "}+${g.sung}</span>`);if(g.danh)o.push(`<span class="${g.danh>0?"g":"r"}">Danh ${x.p===S?"":"mẹ "}${g.danh>0?"+":""}${g.danh}</span>`);if(x.r==="skip")o.push(`<span class="g">Mẫu tử +2</span>`);return o.join(" · ")};
 const rows=res.sort((x,y)=>y.s-x.s).map(x=>`<div class="h54r"><span>${mdH(kidFace(x.k),"xs")} ${h54Name(x.k)} · ${x.p===S?'<b class="g">con ngươi</b>':"con "+x.p.name}${x.a?` · ${H54N[x.a]}`:""}</span><b class="${x.r==="good"?"g":x.r==="poor"||x.r==="skip"?"r":""}">${x===top?"Đứng đầu · ":""}${RW[x.r]}</b><small>${eff(x)}</small></div>`).join("");
 const line=`${title}, các công chúa dâng nghệ: ${res.map(x=>`${h54Name(x.k)} ${x===top?"đứng đầu":RW[x.r].toLowerCase()}`).join("; ")}. `;
 if(mine){log(line);Q.unshift({t:`Công chúa dâng nghệ · ${title}`,h:`<div class="h54list">${rows}</div><p class="past">Được khen: thương con +${H54G.good.fond}, mẹ Danh +${H54G.good.danh}; đứng đầu thêm thương +${H54G.top.fond}, mẹ Sủng +${H54G.top.sung}, Danh +${H54G.top.danh}. Vụng: thương con ${H54G.poor.fond}, mẹ Danh ${H54G.poor.danh}. Ở nhà: thương con ${H54G.skip.fond}.</p>`});return""}
 return line}
PEND.h54show=pp=>{const P=h54Perf().filter(([,p])=>p===S).map(([k])=>k);if(!P.length)return null;const f=pp.f,title=pp.t||"Yến tiệc";
 const O=P.slice(0,3).map(k=>{const a=h54BestArt(k,f),b=h54Base(k,a),g=h54PGood(b),pr=h54PPoor(b);
  return{n:`Cho ${h54Gn(k)} dâng ${H54N[a]}`,fx:{bac:-10},x:`${word(cl(g,5,95))} · thành: ${h54GainTxt()} · hỏng: không được khen, mất tiền y phục${pr?` · kèm: vụng, thương con ${H54G.poor.fond}, Danh ${H54G.poor.danh}: ${chanceW(pr)}`:""}`,go:()=>{h54Run(f,title,{k:k.name,a})}}});
 O.push({n:"Cáo bệnh cho con ở nhà",fx:{},x:`con được nghỉ, không sợ vụng: Mẫu tử +2 · kèm: Hoàng thượng thương con ${H54G.skip.fond}`,go:()=>{h54Run(f,title,{skip:true,k:P[0].name})}});
 const rows=h54Perf().map(([k,p])=>`<div class="h54r"><span>${mdH(kidFace(k),"xs")} ${h54Name(k)} · ${k.age} tuổi · ${p===S?'<b class="g">con ngươi</b>':"con "+p.name}</span><b>${H54A.filter(([a])=>h54Arts(f).includes(a)).map(([a,n])=>`${n} ${h54Lv(k,a)}`).join(" · ")}</b></div>`).join("");
 return{who:pEmp(),t:`${title}: Hoàng thượng cho các công chúa dâng nghệ trước yến (${f==="sac"?"múa, đàn":"đàn, thơ, họa"}).<div class="h54list">${rows}</div><p class="past">Bậc tài nghệ của từng công chúa (cả cung đều thấy). Kết quả: bậc nghệ, tuổi, chữ nghĩa và may rủi${has("trongtai")?"; Hoàng thượng trọng tài: đàn, thơ, họa nặng hơn":""}${has("mesac")?"; Hoàng thượng mê sắc: múa nặng hơn":""}.</p>`,o:O}};
(function(){const f0=festival;festival=function(title,kk){let r=f0.apply(this,arguments)||"";try{if(!S||S.dead)return r;
  /* married daughters come back for the feast */
  const V=[];h54Daus().forEach(([k,p])=>{if(k.hW&&k.hW.kind!=="hoa"&&h54Live(p)){k.hM=cl(k.hM+2,0,100);if((k.hW.joy||50)>=40){ap(p,{sung:1});if(p===S)V.push(h54Name(k))}}});
  if(V.length)r+=`<span class="g">${V.join(", ")} về cung dự yến, nói đỡ cho ngươi trước Hoàng thượng.</span> Sủng +${V.length}. `;
  if(h54Perf().some(([,p])=>p===S))pushDil(mkP("h54show",{f:kk,t:title}),"Công chúa dâng nghệ");else r+=h54Run(kk,title,null)}catch(e){console.error(e)}return r}})();
/* ---- her acts on the kid card ---- */
function h54Btns(k){const B=[],t2=whyTime(2),t1=whyTime(1);if(!k.alive)return B;h54Init(k);
 if(k.hW){const W=k.hW,hoa=W.kind==="hoa",o=od(h54SpeakO(k));
  B.push(pbtn(`data-h54="thu" data-kn="${k.name}"`,"Gửi thư, quà thăm con",`Chắc chắn · tốn: 1 khắc, Bạc -15 · thành: Mẫu tử +8${W.kind==="nha"&&W.joy<60?", con vui hơn":""}`,t1||(k.hL===S.turn?"tháng này đã gửi":S.bac<15?"thiếu bạc (cần 15)":"")));
  B.push(pbtn(`data-h54="noi" data-kn="${k.name}"`,"Nhờ con vào cung nói giúp",`${word(o)} · tốn: 2 khắc, Bạc -10 (lễ đón con), Mẫu tử -4 · thành: ${S.confined?"Hoàng thượng giảm cấm túc 1 tháng":`Sủng +${3+(W.kind==="tinh"?2:0)}`} · hỏng: ngài chỉ hỏi han con vài câu`,hoa?"con ở Bắc Địch, không về được":t2||(S.out?"đang ở lãnh cung: con không vào được":"")||(S.turn-(k.hV==null?-99:k.hV)<4?`con vừa vào cung (lại được sau ${4-(S.turn-k.hV)} tháng)`:"")||(S.bac<10?"thiếu bạc (cần 10)":"")));
  return B}
 if(k.age>=5){const T=H54A.filter(([a])=>h54CanTeach(S,k,a));
  T.forEach(([a,n])=>B.push(pbtn(`data-h54="day" data-a="${a}" data-kn="${k.name}"`,`Tự dạy con ${n}`,`Chắc chắn · tốn: 2 khắc, Sức -5 · thành: ${n} con +${h54TeachG(S,k,a)}, Mẫu tử +2`,t2||(k.hTt===S.turn?"tháng này đã dạy nghệ":S.suc<5?"Sức dưới 5":""))));
  if(!T.length)B.push(pbtn(`data-h54="day" data-kn="${k.name}"`,"Tự dạy con tài nghệ","",`nghệ nào của ngươi cũng không hơn con`));
  B.push(pbtn(`data-h54="thay" data-kn="${k.name}"`,k.hP?`Thầy ${H54N[k.hP]} (đổi thầy)`:"Mời thầy dạy nghệ",`Chắc chắn · tốn: Bạc -${H54.fee} mỗi tháng · thành: một nghệ con khoảng +${Math.round(12*H54.tut)} mỗi năm`,k.age<6?"con chưa đủ 6 tuổi":""))}
 else B.push(pbtn(`data-h54="day" data-kn="${k.name}"`,"Tự dạy con tài nghệ","","con chưa đủ 5 tuổi"));
 if(k.age>=BAL.age.matchShow){const s=k.hB?h54Son(k.hB.s):null;
  B.push(pbtn(`data-h54="ban" data-kn="${k.name}"`,"Bàn hôn sự",`Chắc chắn · tốn: 2 khắc · thành: xem các mối, chọn nhà cho con`,k.hB?`đã hứa gả cho ${s?s.name:"phò mã"}`:k.age<BAL.age.betroth?"con chưa đủ "+(BAL.age.betroth)+" tuổi":t2||(k.hBan!=null&&S.turn-k.hBan<H54.cd?`vừa bàn xong (lại được sau ${H54.cd-(S.turn-k.hBan)} tháng)`:"")))}
 return B}
function h54Act(a,name,art){const k=S&&S.kids.find(x=>x.name===name&&x.alive);if(!k||S.dead||Q.length)return;h54Init(k);const b=rsnap();let title="",ok="sure";
 if(a==="day"){if(!art||!h54CanTeach(S,k,art)||!can(2)||S.suc<5||k.hTt===S.turn)return;spend(2);apply({suc:-5});const g=h54TeachG(S,k,art);k.hA[art]=Math.min(100,k.hA[art]+g);k.hM=cl(k.hM+2,0,100);k.hTt=S.turn;title=`Dạy con ${H54N[art]}`;log(`Ngươi tự tay dạy ${h54Name(k)} ${H54N[art]}: ${H54N[art]} con +${g} (bậc ${h54Lv(k,art)}), Mẫu tử +2.`)}
 else if(a==="thay"){if(k.age<6)return;pushDil(mkP("h54tut",{k:k.name}),"Thầy dạy nghệ");render();return}
 else if(a==="ban"){if(k.hB||k.age<BAL.age.betroth||!can(2)||(k.hBan!=null&&S.turn-k.hBan<H54.cd))return;spend(2);k.hBan=S.turn;h54PoolUp();pushDil(mkP("h54ban",{k:k.name,c:h54Cands(S,k).map(s=>s.id)}),"Bàn hôn sự");render();return}
 else if(a==="thu"){if(!k.hW||!can(1)||S.bac<15||k.hL===S.turn)return;spend(1);apply({bac:-15});k.hL=S.turn;k.hM=cl(k.hM+8,0,100);if(k.hW.kind==="nha")k.hW.joy=cl((k.hW.joy||50)+3,0,100);title="Gửi thư thăm con";log(`Ngươi gửi thư và quà cho ${h54Name(k)}. Mẫu tử +8.`)}
 else if(a==="noi"){const W=k.hW;if(!W||W.kind==="hoa"||!can(2)||S.out||S.bac<10||S.turn-(k.hV==null?-99:k.hV)<4)return;spend(2);apply({bac:-10});k.hV=S.turn;k.hM=cl(k.hM-4,0,100);title="Nhờ con nói giúp";
  if(roll(od(h54SpeakO(k)))){ok=true;if(S.confined>0){S.confined--;log(`${h54Name(k)} vào cung quỳ xin cho mẹ; Hoàng thượng giảm cấm túc của ngươi một tháng. Mẫu tử -4.`)}else{apply({sung:3+(W.kind==="tinh"?2:0)});log(`${h54Name(k)} vào cung hầu chuyện Hoàng thượng, khéo nói tốt cho ngươi. Mẫu tử -4.`)}}
  else{ok=false;log(`${h54Name(k)} vào cung, Hoàng thượng chỉ hỏi han con vài câu. Nói giúp không thành. Mẫu tử -4.`)}}
 else return;resultShow(title,b,ok);render()}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-h54]");if(b&&!b.disabled){e.stopPropagation();e.preventDefault();h54Act(b.dataset.h54,b.dataset.kn,b.dataset.a)}},true);
/* ---- UI: kid card, rival cards, the "Hôn sự" box on the children tab ---- */
function h54Bars(k){return `<span class="ktbars">${H54A.map(([a,n])=>sbar(`${n} ${h54Lv(k,a)}`,k.hA[a],"h54b")).join("")}</span>`}
function h54State(k){if(k.hW){const W=k.hW;return W.kind==="hoa"?`hòa thân Bắc Địch (năm ${W.y})`:`đã xuất giá: phò mã ${W.s.name}, con trai ${W.s.off} (năm ${W.y})`}
 if(k.hB){const s=h54Son(k.hB.s);return `đã hứa gả cho ${s?s.name+", con trai "+s.off:"phò mã"}${k.age<BAL.age.wed?", cưới khi tròn "+(BAL.age.wed)+"":""}`}return k.age>=BAL.age.betroth?"chưa bàn hôn sự":"chưa đến tuổi bàn hôn sự (16)"}
function h54Lines(k){const L=[`Tước hiệu: <b>${H54T[k.hT||0]}</b>`];if(k.age>=5||k.hW)L.push(h54Bars(k));if(k.hP)L.push(`Thầy nghệ: <b>${H54N[k.hP]}</b> · Bạc ${H54.fee}/tháng`);
 L.push(sbar("Mẫu tử",k.hM,"h54m"));const m=k.hMet&&h54Son(k.hMet);if(m&&!k.hW)L.push(`Người con thương: <b>${m.name}</b>, con trai ${m.off}${m.taken&&m.taken!==k.name?" (đã hứa với "+m.taken+")":""}`);
 L.push(`Hôn sự: ${h54State(k)}`);if(k.hW&&k.hW.kind!=="hoa")L.push(`Con ${(k.hW.joy||50)>=60?"sống vui":(k.hW.joy||50)>=40?"sống yên":"không vui"} ở nhà chồng${k.hW.b?` · nhà ấy chống lưng ngươi +${k.hW.b}`:""}`);return L}
(function(){const kc=kidCard;kidCard=function(k){if(!k||k.sex!=="f"||!k.alive)return kc.apply(this,arguments);h54Init(k);
 if(k.hW){const W=k.hW;return pcard({tabKey:"kidw",f:kidFace(k),name:h54Name(k),rank:`${ic("con",16)}${W.kind==="hoa"?"Hòa thân Bắc Địch":"Đã xuất giá"} · ${k.age} tuổi`,lines:[tuoi(k.age),`Hoàng thượng thương <b>${k.fond}</b>`].concat(h54Lines(k)),chips:[chip(W.kind==="hoa"?"Ở Bắc Địch":"Ở phủ phò mã",W.kind==="hoa"?"hot":"ok")],groups:[["Thăm hỏi",h54Btns(k)]]})}
 let h=kc.apply(this,arguments);try{h=h.replace('<div class="pcinfo">',`<div class="pcinfo">${h54Lines(k).map(x=>`<span>${x}</span>`).join("")}`);
  h=h.replace(`${k.name}</b>`,`${h54Name(k)}</b>`);h=h.replace('<div class="pcr">',`<div class="pcr"><h5>Tài nghệ · Hôn sự</h5><div class="pcb">${h54Btns(k).join("")}</div>`)}catch(e){}return h}})();
(function(){const rc=rvCard;rvCard=function(v){let h=rc.apply(this,arguments);try{for(const k of (v.kids||[]).filter(k=>k.alive&&k.sex==="f")){h54Init(k);const st=k.hW?(k.hW.kind==="hoa"?"hòa thân":"đã xuất giá"):k.hB?"đã hứa hôn":"";const t=(k.hT?H54T[k.hT]:"")+(st?(k.hT?" · ":"")+st:"");if(t)h=h.split(`${k.name} · ${k.age} tuổi`).join(`${k.name} · ${k.age} tuổi · ${t}`)}
  if((v.hon||0)>0)h=h.replace('<div class="chips">',`<div class="chips">${chip(`Nhà thông gia chống lưng ${v.hon}`,"ok")}`)}catch(e){}return h}})();
function h54BoxHTML(){const D=h54Daus().filter(([k])=>k.age>=12||k.hW||k.hB);const P=h54Pool().filter(s=>!s.taken).sort((a,b)=>h54Q(b)-h54Q(a));
 const rows=D.map(([k,p])=>`<div class="h54r"><span>${mdH(kidFace(k),"xs")} ${h54Name(k)} · ${k.age} tuổi · con ${p===S?'<b class="g">ngươi</b>':p.name}</span><b>${h54State(k)}</b></div>`).join("");
 const sons=P.map(s=>`<div class="h54r"><span>${mdH(h54Face(s),"xs")} ${s.name} · ${s.age} tuổi · con trai ${s.off}</span><b>phe ${s.house} · Sắc ${s.sac} · Tài ${s.tai}</b></div>`).join("");
 return `<div class="h54box"><h5>Hôn sự</h5>${S.hEnv?`<p class="r">Sứ thần Bắc Địch đang chờ cầu hôn một công chúa từ 18 tuổi${S.hEnv.until<S.turn+90?` (còn ${Math.max(0,S.hEnv.until-S.turn)} tháng)`:""}.</p>`:""}<div class="h54list">${rows||'<p class="past">Chưa có công chúa nào đến tuổi bàn hôn sự.</p>'}</div>
 <p class="past">Nhà chồng các con chống lưng ngươi: <b>${S.hon||0}</b> (cộng vào thế lực phe và tranh ghế; phi tần nào cũng vậy).</p><h5>Công tử các nhà quyền thần (chưa hứa hôn)</h5><div class="h54list">${sons}</div>
 <p class="past">Con gái từ ${BAL.age.betroth} tuổi được bàn hôn sự, cưới khi tròn ${BAL.age.wed}. Tước hiệu, phẩm vị mẹ, lòng thương của Hoàng thượng, tài nghệ và Đức của con quyết định hỏi được nhà nào; phi tần khác cũng tranh các mối này.</p></div>`}
(function(){const k0=kidTabHTML;kidTabHTML=function(){let h=k0.apply(this,arguments);try{h54PoolUp();const i=h.lastIndexOf("</div>");if(i>=0)h=h.slice(0,i)+h54BoxHTML()+h.slice(i)}catch(e){}return h}})();
/* old saves: a daughter sent north by the old event was marked dead; she is alive, married in Bắc Địch */
(function(){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);try{allKids().forEach(([k])=>{if(k.sex==="f"&&k.wed===1&&!k.alive&&!k.hW&&k.hp>0){k.alive=true;k.hW={kind:"hoa",s:{name:"Thế tử Bắc Địch",house:"Bắc Địch",off:"Khả hãn Bắc Địch",tier:0,age:20,fid:""},y:S.year,joy:40,b:0}}h54Init(k)})}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.textContent=".ktbars{display:flex;flex-wrap:wrap;gap:2px 0}.sbar.h54b .sbt u{background:#b0607a}.sbar.h54m .sbt u{background:#c98a3a}"+
 ".h54list,.h54cl{display:flex;flex-direction:column;gap:4px;margin:6px 0}.h54r,.h54c{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:2px 8px;padding:3px 0;border-bottom:1px solid rgba(0,0,0,.08)}.h54c{justify-content:flex-start;flex-wrap:nowrap}.h54r span,.h54c span{min-width:0;overflow-wrap:anywhere}.h54r small{flex-basis:100%;font-size:.75rem}.h54r .md,.h54c .md{vertical-align:middle;flex-shrink:0}"+
 ".h54r>span{flex:1 1 220px}.h54r>span>.md{margin-right:4px}.h54r>b{font-weight:normal;text-align:right;flex:1 1 160px;overflow-wrap:anywhere}.h54box h5{margin:6px 0 2px}"+
 ".h54box{margin:8px 0 0}.h54box .pcrow span{min-width:0;overflow-wrap:anywhere}.h54box .pcrow b{text-align:right;flex-shrink:1;max-width:52%;overflow-wrap:anywhere;font-weight:normal}.h54box .pcrow .md{vertical-align:middle}.h54box .past{margin:2px 0 0;font-size:.72rem}.h54box p.r{margin:2px 0;font-size:.8rem}";document.head.appendChild(st)})();
