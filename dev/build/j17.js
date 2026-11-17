/* ================= AGES: every person has an age, ageing yearly; faces by role and age band, fixed for life ================= */
function courtSrc(k,c){if(k==="ty")return fsrc(c&&c.fc,"img/face-physician.webp");return fsrc(c&&c.fc,`img/face-eunuch-${(c&&c.fe>=0?c.fe:eunBand(c&&c.age||40))+1}.webp`)}
function ageInit(){if(!S)return;[S].concat(rivals||[]).forEach(o=>{if(o)delete o.hue});if(typeof allServ==="function")allServ().forEach(s=>delete s.hue);if(!S.wkSnap&&typeof wkSnap==="function"){S.wkSnap=wkSnap();S.lastWk=wkKey()}const m=S.maid;if(m){if(!(m.age>=16))m.age=16+R(7);delete m.face;delete m.hue}
 /* Thái hậu = the Emperor's mother (owner 11/15): 51–62 at the start (51+ = the a51 art band, band4), and ≥ Emperor + 18;
    an old save with a younger mother (live showed 43) is brought up to that floor. Her age is also kept on S.thO.age so every
    portrait / figure picker that reads who.age gets her real age band. */
 {const ea=S.emp&&S.emp.age>0?S.emp.age:30,lo=Math.max(51,ea+18),hi=Math.max(lo,62);if(!(S.thAge>0))S.thAge=lo+R(hi-lo+1);else if(S.thAge<lo&&!S.thDead)S.thAge=lo+R(Math.min(4,hi-lo+1))}
 S.thO=S.thO||{};S.thO.age=S.thAge;
 (rivals||[]).forEach(v=>{if(!(v.age>=18))v.age=18+R(8)});
 const C=S.court||{};const base={tq:56,ksp:40,ped:20,ty:50};for(const k in C){const c=C[k];if(!(c.age>0))c.age=(base[k]||35)+R(6);if(k!=="ty"&&!(c.fe>=0))c.fe=eunBand(c.age)}
 if(typeof allServ==="function")allServ().forEach(s=>{if(!(s.age>0))Object.assign(s,servAge(s.role));if(s.role!=="maid"&&!(s.fe>=0))s.fe=eunBand(s.age)});faceInit()}
function ageYear(){(S.men||[]).forEach(m=>m.age++);if(S.maid)S.maid.age=(S.maid.age||18)+1;S.thAge=(S.thAge||51)+1;if(S.thO)S.thO.age=S.thAge;(rivals||[]).forEach(v=>{if(v.alive)v.age=(v.age||20)+1});
 for(const k in (S.court||{}))S.court[k].age=(S.court[k].age||40)+1;if(typeof allServ==="function")allServ().forEach(s=>s.age=(s.age||20)+1)}
/* children: a variant at birth, the face band follows the age (initials if the file is missing) */
function kidBand(a){return a<=2?"baby":a<=6?"small":a<=12?"child":"teen"}
function kidFace(k){const mom=allKids().find(([x])=>x===k);const mr=mom?(mom[1]?(mom[1].queen?7:mom[1].rank):S.rank):S.rank;return Object.assign(kidFace0(k),{rk:"kid c"+mr,rw:k.sex==="m"?"Hoàng tử":"Công chúa"})}
function kidFace0(k){if(k.fv==null||k.fv>4)k.fv=kidVar(k);return{src:k.fv?`img/face-${k.sex==="m"?"prince":"princess"}-${kidBand(k.age||0)}-${k.fv}.webp`:"",hue:0,ini:k.sex==="m"?"Tử":"Nữ",col:k.heir?"#d9b25f":"#c98aa0"}}

/* ===== FACE REGISTRY: one face per person, by role (+ age band for eunuchs), drawn without repeats; saved on the person (fc) =====
   Pools are the img/ file lists; a file that fails to load falls back to the older inline AVATARS face (or the initial medallion).
   When a pool is used up, only faces of people gone for good (dead, sent away) come back; nobody present ever shares a face. */
const pad=n=>String(n).padStart(2,"0");
const rng=(a,b,f)=>{const L=[];for(let i=a;i<=b;i++)L.push(f(i));return L};
const E=n=>"face-emperor-"+n,EU=n=>"face-eunuch-"+n,OF=n=>"face-official-"+n,TH=n=>"face-thaihau-"+n;
/* pools by role and age band, sorted by looking at each picture's apparent age */
const FPOOL={consort:rng(1,40,i=>"face-consort-"+pad(i)),maid:rng(1,6,i=>"face-maid-"+i).concat(rng(7,30,i=>"face-maid-"+pad(i))),womid:rng(1,8,i=>"face-woman-mid-"+i),mama:rng(1,6,i=>"face-mama-"+i),
 th0:[1,2,3,5,6].map(TH),th1:[4].map(TH),
 emp0:[1,5,8].map(E),emp1:[2,3,6].map(E),emp2:[4].map(E),emp3:[7].map(E),
 off0:[2].map(OF),off1:[4,5,6].map(OF),off2:[1,3].map(OF).concat(["face-physician"]),manold:rng(1,4,i=>"face-man-old-"+i),
 eun0:["1","2","05","08","09","11","14","15","17","19"].map(EU),eun1:["12","16","20"].map(EU),eun2:["06","10","18","4"].map(EU),eun3:["3","07","13"].map(EU)};
/* pool keys for a person, preferred band first, then the nearest bands */
function bandKeys(kind,age){if(kind==="consort")return age<=35?["consort","womid","mama"]:age<=50?["womid","consort","mama"]:["mama","womid","consort"];
 if(kind==="maid")return age<=35?["maid","womid","mama"]:age<=44?["womid","maid","mama"]:["mama","womid","maid"];
 if(kind==="eunuch"){const b=eunBand(age||30);return [0,1,2,3].sort((x,y)=>Math.abs(x-b)-Math.abs(y-b)||x-y).map(x=>"eun"+x)}
 const near=(pre,b,n)=>[...Array(n).keys()].sort((x,y)=>Math.abs(x-b)-Math.abs(y-b)||x-y).map(x=>pre+x);
 if(kind==="emperor"||kind==="royal")return near("emp",age<=25?0:age<=35?1:age<=50?2:3,4);
 if(kind==="thaihau")return near("th",age<=55?0:1,2);
 if(kind==="official"||kind==="man")return age>50&&kind==="man"?["manold","off2","off1","off0"]:near("off",age<=35?0:age<=50?1:2,3);
 return [kind]}
const FAV={};
(function probe(){const all=[].concat(...Object.values(FPOOL));for(const f of all){try{const im=new Image();im.onload=()=>{FAV[f]=1};im.onerror=()=>{FAV[f]=0};im.src="img/"+f+".webp"}catch(e){}}})();
function fsrc(fc,fb){if(!fc||FAV[fc]===0)return fb||"";return "img/"+fc+".webp"}
function poolOf(role){const pre={eunuch:"eun",emperor:"emp",thaihau:"th",official:"off"}[role];return pre?Object.keys(FPOOL).filter(k=>k.startsWith(pre)&&/\d$/.test(k)).flatMap(k=>FPOOL[k]):FPOOL[role]||[]}
function facesPresent(){const U=new Set();if(!S)return U;const add=o=>{if(o&&o.fc)U.add(o.fc)};add(S);add(S.maid);add(S.emp);if(S.thF)U.add(S.thF);(S.men||[]).forEach(m=>{if(m.alive)add(m)});
 (rivals||[]).forEach(add);for(const k in (S.court||{}))add(S.court[k]);if(typeof allServ==="function")allServ().forEach(add);return U}
function drawF(kind,age){if(!S)return"";const keys=Array.isArray(kind)?kind:bandKeys(kind,age);const pres=facesPresent(),seen=new Set(S.fseen||[]);
 for(const fresh of [true,false])for(const k of keys){const c=(FPOOL[k]||[]).filter(f=>!pres.has(f)&&FAV[f]!==0&&(!fresh||!seen.has(f)));if(c.length){const ok=c.filter(f=>FAV[f]===1);const f=pick(ok.length?ok:c);S.fseen=(S.fseen||[]).concat([f]);return f}}
 return""}
/* a person keeps a face while in one age band; on entering a new band they get a new face from that band's pool */
function faceFor(o,kind,age){const k=bandKeys(kind,age)[0];if(o.fc==null||o.fk!==k){o.fc="";o.fc=drawF(kind,age);o.fk=k}}
/* how many of a role may exist at once = the pool size (a consort pool counts the inline fallback portraits too) */
function roomFor(role){if(!S)return true;const n=poolOf(role).filter(f=>FAV[f]!==0).length;const cap=role==="consort"?Math.max(n,(AV.women||[]).length):n;
 const cnt=role==="consort"?1+(rivals||[]).filter(v=>v.alive).length:role==="maid"?1+(typeof allServ==="function"?allServ().filter(s=>s.role==="maid").length:0):role==="eunuch"?(typeof allServ==="function"?allServ().filter(s=>s.role!=="maid").length:0)+3:0;
 return cnt<cap}
function kidVar(k){const used=new Set(allKids().map(([x])=>x).filter(x=>x!==k&&x.alive&&x.sex===k.sex&&x.fv).map(x=>x.fv));const c=[1,2,3,4].filter(v=>!used.has(v));return c.length?pick(c):0}
/* give every present person a face once; old saves get theirs here too */
function faceInit(){if(!S)return;faceFor(S,"consort",S.age);(rivals||[]).forEach(v=>faceFor(v,"consort",v.age||20));
 if(S.maid)faceFor(S.maid,S.maid.old?"mama":"maid",S.maid.age||18);if(S.emp)faceFor(S.emp,"emperor",S.emp.age);S.thO=S.thO||{};faceFor(S.thO,"thaihau",S.thAge||55);S.thF=S.thO.fc;
 for(const k in (S.court||{})){const c=S.court[k];faceFor(c,k==="ty"?"official":"eunuch",c.age||40)}
 if(typeof allServ==="function")allServ().forEach(s=>faceFor(s,s.role==="maid"?"maid":"eunuch",s.age||20))}
/* under cấm túc a consort's palace is watched: no crimes can be set in motion (every consort alike) */
const CRIME=["poison","kpoison","kframe","pond","musk","catswap","frame","plant"];
CRIME.forEach(k=>{const A2=ACT[k];if(!A2)return;const o=A2.ok;A2.ok=(a,t)=>!a.confined&&o(a,t)});
/* ===== EVERY CHOICE SHOWS: an odds word ('Chắc chắn' when nothing is rolled), 'thành: …', 'hỏng: …' for rolled ones, and known risks ===== */
const ODDW=/(Chắc chắn|Nắm chắc|Rất chắc|Khá chắc|Năm ăn năm thua|Chắc|Khó|Liều)/;
const CAUGHT="có thể bị người của nàng phát giác: nàng nắm 2 chứng cứ";
const AOUT={spy:["chứng cứ +1, Tâm cơ +2","bị lộ, nàng thù -8"],ally:["thiện cảm +25, nàng bớt ghen 10","bị lạnh nhạt, thiện cảm -5"],rumor:["Danh nàng -8","không ai tin; nàng nắm 1 chứng cứ, thù -5"],
 frame:["nàng mất Danh và Sủng -10; Danh +3","bị lộ: Danh -15, Sủng -8, thù -30, bị phạt"],poison:["nàng trúng độc, có thể chết","bị tra ra: ban chết"],accuse:["nàng bị phế hoặc giáng; Danh +6","Danh -8, thù -20, chứng cứ bị hủy"],
 bribe:["moi được mưu kế (chứng cứ +2) hoặc trộm bạc của nàng","cung nữ báo chủ: nàng nắm 1 chứng cứ"],block:["2 tuần nàng không được lật thẻ","tổng quản kể lại: nàng nắm 1 chứng cứ"],
 musk:["nàng sảy thai","—"],catswap:["tráo hài nhi khi nàng sinh","—"],ksab:["con nàng Tài -15; Tâm cơ +2","bị lộ: Danh -10, thù -20, bị phạt"],kpoison:["con nàng trúng độc, có thể chết","bị tra ra: ban chết"],
 pond:["con nàng rơi xuống hồ, có thể chết đuối","bị bắt: Danh -10, bị phạt"],kframe:["con nàng mất sủng, có thể bị phế Thái tử","bị lần ra: ban chết"],takeaway:["bế con nàng về nuôi; nàng thù -30","chưa được chuẩn; nàng thù -10"],
 vp:["đồ của nàng bị tịch thu, Danh nàng -8, nàng bị phạt","Danh -3, nàng thù -10"],plant:["món đồ nằm trong rương nàng","kẻ cài bị bắt: nàng nắm 2 chứng cứ, thù -20"],steal:["đoạt đêm nay · kèm: nàng ghen +25, quý ngươi -15, oán ngươi +9","Sủng -3"],road:["đoạt đêm nay · kèm: nàng ghen +25, quý ngươi -15, oán ngươi +9","Sủng -3"],gift:["thiện cảm thêm theo món quà",""]};
const ACAUGHT=["rumor","frame","poison","block","musk","ksab","kpoison","pond","kframe"];
/* the small line of a scheme button */
function actLine(k,oddsWord,costHtml){const w=AOUT[k]||["",""];const rolled=oddsWord!=="Chắc chắn";const L=[oddsWord,costHtml?"tốn: "+costHtml:"",w[0]?"thành: "+w[0]:"",rolled?"hỏng: "+(w[1]&&w[1]!=="—"?w[1]:"không mất gì"):"",ACAUGHT.includes(k)?CAUGHT:""];return L.filter(Boolean).join(" · ")}
/* the small line of any option object {o, c, w, l, x, lock} */
function optLine(a){const o=a.o==null?100:a.o;const rolled=o<100&&!a.lock;const gain=[fmt(a.w||{}),a.x].filter(Boolean).join(" · ");
 return [rolled?word(o):"Chắc chắn",a.c&&fmt(a.c)?"tốn: "+fmt(a.c):"",gain?"thành: "+gain:"",rolled?"hỏng: "+(fmt(a.l||{})||"không mất gì"):""].filter(Boolean).join(" · ")}
/* a dilemma option {n, fx, x, go}: x usually already holds 'word · thành · hỏng'; fill what is missing */
function dilLine(c){const fx=fmt(c.fx||{}),x=c.x||"";const src=String(c.go||"")+String(c.fail||"");let s=x;
 if(!ODDW.test(x)&&!CHW.test(x)){if(/roll\(/.test(src))s="Khó lường · "+x;else{if(!fx&&!x)return /^Thôi|^Im lặng|^Để /.test(c.n||"")?"Chắc chắn · không được mất gì":c.go||c.open?"Chắc chắn · chọn rồi xem kết quả ở bước sau":"Chắc chắn · không được mất gì";return ["Chắc chắn",fx?"ngay: "+fx:"",x?"thành: "+x:""].filter(Boolean).join(" · ")}}
 if(!/hỏng/.test(s))s+=" · hỏng: không mất gì";return [fx?"ngay: "+fx:"",s].filter(Boolean).join(" · ")}
const dilLineRaw=dilLine;/* the raw kit line of a dialog option (before kitParse), read by the kit hint (jk2b kitHint) */
/* the real speaker of an event: a named eunuch of that palace or of the court, a spy of hers; no speaker -> the place art */
function pEunOf(p){const e=(p&&p.staff||[]).find(s=>s.role!=="maid");return e?Object.assign(pServ(e),{nm:e.name}):pEunCourt("ksp")}
function pEunCourt(k){const c=S.court&&S.court[k];return{rk:k==="tq"?"eu3":"eu2",rw:k==="tq"?"Tổng quản thái giám":"Thái giám",src:courtSrc(k,c),hue:0,ini:"Hoạn",col:"#8a8aa0",nm:c?c.name:""}}
function pSpy(){const s=(S.staff||[]).find(x=>x.spyFor==="me")||(S.staff||[]).find(x=>x.role==="maid");return s?Object.assign(pServ(s),{nm:s.name}):pMaid()}
function evArt(){try{const P=placeOf(S.place);return SCIMG[P.sc]?`img/${SCIMG[P.sc]}.webp`:""}catch(e){return""}}
