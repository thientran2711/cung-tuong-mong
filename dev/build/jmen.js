/* ================= jmen: NAM NHÂN TRONG CUNG — vùng cấm, chỗ theo buổi, bắt gặp nam nhân nơi cấm địa (hai chiều) =================
   Extends j22 (S.men, S.menW, talkOpts, tư tình), j55 (quan), j61 (biết người), j8/j78 (chứng cứ, phạt), jk2b/jk4 (thẻ sự kiện, hình toàn thân).
   Plan: dev/MEN_PLAN.md. Consort road only (the servant road keeps j42's men).
   1. MEN_ZONE: hậu cung (cấm nam nhân trừ Hoàng thượng, thái giám, thái y / thợ có lệnh) · nội đình · nha sở · ngoại triều (cấm nữ quyến).
   2. menPlace(): every buổi each man has a place AND a reason (S.menWhy[id] = {w:duty|summons|order|visit|fest|stray, r, v, k});
      strays (no order inside the hậu cung) are rare: night, festivals, the garden.
   3. Walking into a place with a stray → event card (cost only): Báo thị vệ · Báo Cung Chính ti · Làm như không thấy · Giấu giúp · Núp nghe lén.
   4. The same rules for NPC consorts (menDecide → menReport / menHide), and she can be the one caught (talking alone with a man there).
   ============================================================================================================================= */
const MEN={stray:[3,4.5,12],festX:2.2,wetX:.5,garden:65,lc:10,gardenN:35,lcN:25,tryst:30,notice:40,seeMe:22,banS:12,banF:36,grudge:22,path:25};
const MEN_ZN={hc:"Hậu cung",nd:"Nội đình",dv:"Nha sở",nt:"Ngoại triều"};
function menZone(k){if(!k)return"";if(k==="ngt")return"nt";if(k==="dtd"||k==="thu")return"nd";if(k==="tyv"||k==="ksp")return"dv";return"hc"}
function menRoad(){try{return !!S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())}catch(e){return false}}
function menBanned(m){return !!(m&&m.ban&&wk()<m.ban)}
function menWhy(m){return ((S&&S.menWhy)||{})[m.id]||null}
function menOut(m){const y=m&&menWhy(m);return !!(y&&y.w==="stray")}
function menStat(k){if(!S)return;S.menStat=S.menStat||{};S.menStat[k]=(S.menStat[k]||0)+1}
/* names as she knows them (j61): unknown people are described by their dress */
function menNmFull(m){try{return k61Named(m)?m.name:k61Desc(m)}catch(e){return m.name}}
function menVT(v){if(!v)return"";if(v===S)return"ngươi";try{return k61Named(v)?`${rkName(v)} ${v.name}`:k61Desc(v)}catch(e){return v.name}}
const menCap=s=>s?s[0].toUpperCase()+s.slice(1):s;
/* four named guards, one picture each: guard i -> thive-(i+1) (owner 11/15: 4 looks thive-1..4); index-based so old saves that cached a shared look are re-mapped */
function menGuards(){return (S.men||[]).filter(m=>m.rw==="thị vệ")}
(function(){const m0=menInit;menInit=function(){const r=m0.apply(this,arguments);try{if(S&&S.men&&!S.menG2){S.menG2=1;const sur=["Chu","Hà","Lâm","Ninh","Phan","Từ"];
  for(let i=0;i<3;i++){const id="m"+(S.men.length);S.men.push({id,role:"Thị vệ",rw:"thị vệ",haunts:["thu","dtd"],age:20+R(14),name:`Thị vệ ${pick(sur)} ${pick(MALEN)}`,trait:pick(MTR),loyal:40+R(50),af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[]})}}}catch(e){}return r}})();
(function(){if(typeof figPick!=="function")return;const f0=figPick;figPick=function(who){try{if(S&&who&&who.rw==="thị vệ"&&(S.men||[]).includes(who)){const M=FIGIX.man||{};const ks=Object.keys(M).filter(k=>/thive/.test(k)).sort();
  if(ks.length){const i=menGuards().indexOf(who);if(i>=0){who.fid=ks[i%ks.length];return who.fid}if(who.fid&&M[who.fid])return who.fid}}}catch(e){}return f0.apply(this,arguments)}})();

/* ---------- 1. who is where this buổi, and why ---------- */
function menHcPal(v){const k=palaceOf(v);return k==="home"?null:k}
function menPlace(){menInit();const W={},Y={};const b=S.buoi||0,night=b===2;let f=null;try{f=festToday()}catch(e){}
 const L=liveRivals(true);
 for(const m of S.men){if(!m.alive||menBanned(m))continue;const rw=m.rw;let k=null,w="";
  if(rw==="thị vệ"){if(roll(70)){k=night?pick(["dtd","thu","ksp"]):pick(["thu","dtd"]);w="duty"}}
  else if(rw==="thái y"){const sick=L.filter(v=>(v.preg||v.ill||(v.suc!=null&&v.suc<40))&&menHcPal(v));if(sick.length&&!night&&roll(35)){k=menHcPal(pick(sick));w="summons"}else if(roll(60)){k="tyv";w="duty"}}
  else if(rw==="vương gia"){if(f&&!night&&roll(50)){k="vuon";w="fest"}else if(!S.thDead&&!night&&roll(12)){k="tn";w="visit"}}
  else if(rw==="nhạc sư"||rw==="họa sư"){if(!night&&roll(f?45:22)){const v=L.length&&roll(50)?pick(L):null;k=(v&&menHcPal(v))||"vuon";w="order"}}
  else if(rw==="sứ thần"){if(b===0&&roll(25)){k="thu";w="duty"}else if(f&&roll(40)){k="vuon";w="fest"}}
  if(k){W[m.id]=k;Y[m.id]={w,k}}}
 /* lovers meet at night (j22 v.affair): in the garden, the cold palace, or her own palace */
 for(const v of liveRivals(false)){const m=v.affair&&manById(v.affair);if(!m||menBanned(m)||!night||!roll(MEN.tryst))continue;
  const k=pick(["vuon","vuon","lc",menHcPal(v)||"vuon"]);W[m.id]=k;Y[m.id]={w:"stray",k,r:"tryst",v:v.id};S.where[v.id]=k}
 /* a rare stray: a man inside the hậu cung with no order */
 const p=MEN.stray[b]*(f?MEN.festX:1)*(wet()?MEN.wetX:1);
 if(!Object.values(Y).some(y=>y.w==="stray")&&roll(p)){const M=S.men.filter(m=>m.alive&&!menBanned(m)&&m.rw!=="sứ thần"&&!(m.rw==="vương gia"&&!f));if(M.length){const m=pick(M);
  const gp=night?MEN.gardenN:MEN.garden,lp=night?MEN.lcN:MEN.lc;let k=roll(gp)?"vuon":roll(lp*100/(100-gp))?"lc":null;if(!k){const v=pick(L.filter(menHcPal));k=v?menHcPal(v):"vuon"}
  let r=f?pick(["peek","peek","lost"]):night?pick(["drink","lost","steal","letter"]):pick(["lost","steal","letter"]);let vv=null;
  if(r==="letter"){const C=L.filter(v=>!v.queen&&(v.sung||0)<50&&!v.confined);vv=C.length?pick(C):null;if(!vv)r="lost";else S.where[vv.id]=k}
  W[m.id]=k;Y[m.id]={w:"stray",k,r,v:vv?vv.id:null}}}
 S.menW=W;S.menWhy=Y;
 /* officials (j55): the morning audience in the Ngự thư phòng; a festival banquet in the garden */
 S.minW={};try{if(typeof trS==="function"&&typeof tdOn==="function"&&tdOn()){const H=Object.values(trS().H||{});if(b===0&&roll(70))shuf(H).slice(0,1+R(2)).forEach(h=>S.minW[h.c]="thu");if(f&&b>0&&roll(50)){const h=pick(H);if(h)S.minW[h.c]="vuon"}}}catch(e){}
 for(const id in Y){const y=Y[id];if(y.w==="stray"){menStat("stray");menNpcSee(manById(id),y)}}}
(function(){const pw=placeWhere;placeWhere=function(){const r=pw.apply(this,arguments);try{if(menRoad())menPlace()}catch(e){console.error("menPlace",e)}return r}})();
(function(){const c0=countAt;countAt=function(k){let n=c0(k);try{if(menRoad())for(const c in (S.minW||{}))if(S.minW[c]===k)n++}catch(e){}return n}})();

/* ---------- 2. zones on the map data and the place cards ---------- */
const MEN_NT={box:{x:.445,y:.805,w:.11,h:.12}};
(function(){try{fetch("img/map-hotspots.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&j.outerCourt&&j.outerCourt.box)MEN_NT.box=j.outerCourt.box}).catch(()=>{})}catch(e){}})();
(function(){const s0=mapSpots;mapSpots=function(){const L=s0.apply(this,arguments);try{if(menRoad())L.push({k:null,box:MEN_NT.box,n:"Ngoại triều",fn:"cấm nữ quyến bước vào",res:[],small:true,empty:true})}catch(e){}return L}})();
/* the outer court: the NORMAL map label + a small lock mark (owner 11/15: no grey overlay on closed places); a tap opens a kit card with the
   reason and the options. The lock mark is .kmlock so the shared kit label (integrator, review/book-release) can take it over when it lands. */
(function(){const h0=mapHTML;mapHTML=function(){let h=h0.apply(this,arguments);try{if(menRoad())h=h.replace(/<div class="mspot sm off empty" title="Ngoại triều: ([^"]*)" style="([^"]*)"><span class="mlab">Ngoại triều<\/span><\/div>/,(a,why,st)=>`<button class="mspot sm kmen-nt" data-mennt="1" title="Ngoại triều: ${why}" style="${st}"><span class="mlab"><span class="kmlock" aria-label="cấm vào">🔒</span> Ngoại triều</span><span class="mmeta"><em>${why}</em></span></button>`)}catch(e){}return h}})();
function menNtCard(){if(!S||S.dead||Q.length)return;const T=(typeof trS==="function"&&typeof tdOn==="function"&&tdOn())?trS():null;const left=Math.max(0,4-used);
 const opts=[];if(T&&left>=1)opts.push({n:"Hỏi thái giám tin ngoại triều",fx:{bac:-5},x:"Chắc chắn · tốn: 1 khắc",go:()=>{spend(1);const L=Object.keys(S.minW||{}).map(c=>T.H[c]&&`${TDOFF[c]||"Quan"} ${T.H[c].name} (${S.minW[c]==="thu"?"vào chầu ở Ngự thư phòng":"dự yến ở Ngự hoa viên"})`).filter(Boolean);
  log(L.length?`Thái giám kể: buổi này ${L.join("; ")}.`:"Thái giám kể: buổi này không có vị quan nào vào chầu.")}});
 opts.push({n:"Thôi",fx:{},x:""});
 kitModal({kind:"rule",title:"Ngoại triều",showOut:true,sections:[{h:"Vì sao không vào được",rows:[["Luật","Ngoại triều là nơi Hoàng thượng thiết triều với bá quan: nữ quyến hậu cung không được bước vào.","t"],["Ai được vào","Hoàng thượng, quan lại, thị vệ, sứ thần; thái giám đi truyền chỉ.","t"]]}],opts})}
/* the map's one tap handler (j77 window capture) sends an unnamed spot to j77Tap(k,label): the outer court opens its own card */
(function(){if(typeof j77Tap!=="function")return;const t0=j77Tap;j77Tap=function(k,empty){if(!k&&/Ngoại triều/.test(empty||"")&&menRoad()){try{menNtCard()}catch(e){console.error("menNt",e)}return}return t0.apply(this,arguments)}})();
(function(){const p0=placeOf;placeOf=function(k){const P=p0.apply(this,arguments);try{if(P&&k&&menRoad()&&!P.__mz){const z=menZone(k);const t=z==="hc"?"Hậu cung: nam nhân không được vào, trừ Hoàng thượng, thái giám, thái y hay thợ có lệnh.":z==="nd"?"Nội đình: thị vệ canh cửa, quan lại vào chầu.":"";if(t)return Object.assign({},P,{d:((P.d||"")+" "+t).trim(),zone:z,__mz:1})}}catch(e){}return P}})();

/* officials on the stage (kind "min"): face, role, a polite greeting */
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="min"&&p.ref)return pMin(p.ref);return f0.apply(this,arguments)}})();
(function(){const t0=talkOpts;talkOpts=function(p){if(p&&p.kind==="min"){const h=p.ref;return[{n:"Chào hỏi đúng lễ",o:100,w:{danh:1},x:"giữ lễ với triều thần",go:()=>{try{h.af=h.af||{};h.af.me=(h.af.me||0)+3}catch(e){}}}]}return t0.apply(this,arguments)}})();

/* ---------- 3. arrival: men and officials stand on the stage; a stray → the event card ---------- */
(function(){const g=goTo;goTo=function(k){const r=g.apply(this,arguments);try{if(!menRoad()||S.place!==k||!S.visit||S.visit.k!==k)return r;
  for(const c in (S.minW||{})){if(S.minW[c]!==k)continue;const h=(trS().H||{})[c];if(!h||S.visit.people.some(p=>p.ref===h))continue;S.visit.people.push({kind:"min",ref:h,name:h.name,ini:"官",col:"#7a6a50",info:`${TDOFF[h.c]||"Quan"} · ${S.minW[c]==="thu"?"vào chầu":"dự yến"}`})}
  S.visit.people.forEach(q=>{if(q&&q.kind==="man"&&q.ref&&!Object.getOwnPropertyDescriptor(q,"name").get){const m=q.ref;Object.defineProperty(q,"name",{get(){return menStageNm(m)},enumerable:true,configurable:true})}});
  const Y=S.menWhy||{};S.menMet=S.menMet||{};
  for(const id in Y){const y=Y[id];const m=manById(id);if(!m||y.w!=="stray"||(S.menW||{})[id]!==y.k)continue;const kk=bkey()+":"+id;if(S.menMet[kk])continue;
   /* at the very place, or on the way: the walk passes the lanes of the hậu cung (MEN.path) */
   const at=y.k===k,on=!at&&(menZone(k)==="hc"||menZone(y.k)==="hc")&&roll(MEN.path);if(!at&&!on)continue;S.menMet={[kk]:1};
   const v=y.v?RV(y.v):null;if(v&&(!v.alive||v.out))continue;menStat(at?"enc":"encPath");menCard(m,v,Object.assign({},y,{p:on?1:0}),0);break}
  try{renderStage()}catch(e){}}catch(e){console.error("men goTo",e)}return r}})();

function menSeeLine(m,v,y){const at=(y.p?"lối đi gần ":"")+placeName(y.k);const t=BUOI[S.buoi||0].toLowerCase();
 if(v&&y.r==="tryst")return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đứng sát bên ${menVT(v)} sau hòn giả sơn; thấy động, hai người vội buông tay nhau.`;
 if(v)return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đứng nói khẽ với ${menVT(v)}; tay nàng vừa giấu vội vật gì vào tay áo.`;
 return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đi lại một mình, không có thái giám dẫn đường.`}
const MEN_RT={tryst:"hẹn hò tư tình",letter:"chuyển thư lén ra ngoài cung",drink:"trốn ca trực, lén uống rượu",lost:"đi tìm đồ đánh rơi, lạc lối",steal:"lén hái hoa quý đem bán",peek:"lẻn vào xem đèn hoa lễ tết"};
function menTrue(m,v,y){const nm=m.name;if(y.r==="tryst")return `${nm} lẻn vào ${placeName(y.k)} để hẹn hò tư tình với ${rkName(v)} ${v.name}.`;
 if(y.r==="letter")return `${nm} nhận thư của ${rkName(v)} ${v.name} để lén chuyển ra ngoài cung.`;return `${nm} vào ${placeName(y.k)} để ${MEN_RT[y.r]||"việc riêng"}.`}
/* the card (a saveable event: PEND) — cost only; outcomes on the result card. No `who`: a speaker would introduce himself (j61),
   a stray man does not; the people stand on the card through `stage`. */
PEND.menEnc=pp=>{const m=manById(pp.m);if(!m||!S)return null;const v=pp.v?RV(pp.v):null;const y={k:pp.k,r:pp.r,v:pp.v,p:pp.p||0};const kh=(n,o)=>`${o==null?"Chắc chắn":word(o)} · tốn: ${n} khắc`;const oh=od(35+(S.mat||0)*6+(S.tamco||0)/4);
 const L=[`<p>${pp.h?menTrue(m,v,y):menSeeLine(m,v,y)}</p>`,`<p>${MEN_ZN.hc}: nam nhân không có lệnh không được bước vào. Ai biết mà không báo cũng mang tội.</p>`];
 const o=[{n:"Báo thị vệ",fx:{},x:kh(1),go:()=>menChoose(m,v,y,"bao")},
  {n:"Báo Cung Chính ti",fx:{},x:kh(2),go:()=>menChoose(m,v,y,"ccti")},
  {n:"Giấu giúp",fx:{},x:kh(1),go:()=>menChoose(m,v,y,"giau")}];
 if(!pp.h)o.push({n:"Núp nghe lén",fx:{},x:kh(1,oh),go:()=>menChoose(m,v,y,"nghe")});
 o.push({n:"Làm như không thấy",fx:{},x:"",go:()=>menChoose(m,v,y,"lo")});
 return{t:L.join(""),o,stage:v?[m,v]:[m],headArt:menArt(y.k),optLayout:"grid"}};
function menArt(k){try{const P=placeOf(k);const f=SCIMG[P.sc];return f?{src:`img/${f}.webp`,label:P.n}:undefined}catch(e){return undefined}}
function menCard(m,v,y,heard){try{k61Know(m,"",true,1);if(v)k61Know(v,"",true,1)}catch(e){}const d=mkP("menEnc",{m:m.id,v:v?v.id:null,k:y.k,r:y.r,p:y.p||0,h:heard?1:0});if(!d)return;
 Q.push({t:heard?"Nghe lén sau hòn giả sơn":"Nam nhân nơi cấm địa",h:d.t,opts:d.o,stage:d.stage,headArt:d.headArt,optLayout:"grid",pid:d.pid,pp:d.pp});if(!window.__bot)showModal()}
(function(){const d0=deserQ;deserQ=function(L){const out=d0.apply(this,arguments);try{out.forEach(q=>{if(q.pid==="menEnc"){const d=mkP("menEnc",q.pp);if(d){q.stage=d.stage;q.headArt=d.headArt;q.optLayout="grid"}}})}catch(e){}return out}})();
function menKh(n){const c=Math.max(0,Math.min(n,4-used));if(c)spend(c)}

/* ---------- 4. the shared outcomes (the player and NPC consorts use the same ones) ---------- */
/* by reports m (and the companion c) at the scene (formal=0) or to the Cung Chính ti (formal=1) */
function menReport(by,m,c,y,formal){const at=placeName(y.k);const nm=m.name;const byT=by===S?"ngươi":`${rkName(by)} ${by.name}`;menStat(by===S?"repMe":"repNpc");
 const gain=(o)=>ap(by,o);
 if(c&&(y.r==="tryst"||y.r==="meet")&&(c!==S||m.trysts>0||y.r==="tryst")){const o=odA(by,(formal?42:58)+(by.danh||0)/5+(formal?(by.tamco||0)/4:0));
  oanAdd(c,by,30);affAdd(c,by,-25);
  if(roll(o)){m.alive=false;log(`<span class="r">${menCap(byT)} báo ${formal?"Cung Chính ti":"thị vệ"}: bắt được ${nm} cùng ${c===S?"ngươi":`${rkName(c)} ${c.name}`} ở ${at}. ${nm} bị xử trảm.</span>`);
   gain({danh:4});if(c===S)deathSentence(`Bị ban chết vì tư thông với ${nm}`);else deathSentence(c,`tư thông với ${nm}`);return true}
  m.ban=wk()+MEN.banS;log(`<span class="r">${menCap(byT)} báo ${formal?"Cung Chính ti":"thị vệ"} chuyện ở ${at}; ${c===S?"ngươi":`${rkName(c)} ${c.name}`} chối phăng, chỉ ${nm} bị đánh trượng, đuổi ra ngoại triều.</span>`);gain({danh:-2});return false}
 if(c){const o=formal?odA(by,48+(by.danh||0)/5+(by.tamco||0)/4):100;oanAdd(c,by,22);affAdd(c,by,-18);m.ban=wk()+(formal?MEN.banF:MEN.banS);
  if(roll(o)){log(`<span class="r">${menCap(byT)} báo ${formal?"Cung Chính ti":"thị vệ"}: ${nm} và ${c===S?"ngươi":`${rkName(c)} ${c.name}`} gặp riêng ở ${at}${y.r==="letter"?", trao thư lén":""}.</span>`);
   punish(c,y.r==="letter"?"trao thư lén cho nam nhân ra ngoài cung":"gặp riêng nam nhân nơi cấm địa",formal?2:1);gain({danh:3});
   if(by===S&&c!==S&&(c.sung||0)>=60){apply({sung:-2});log("Hoàng thượng không vui vì người ngài thương bị phạt.")}if(by===S)S.th=cl((S.th||0)+2,-100,100);return true}
  log(`<span class="r">${menCap(byT)} trình Cung Chính ti chuyện ở ${at}, nhưng không đủ chứng: ${c===S?"ngươi":`${rkName(c)} ${c.name}`} vô can; ${byT} mang tiếng vu khống.</span>`);gain({danh:-5});return false}
 m.ban=wk()+(formal?MEN.banF:MEN.banS);m.grudge=key(by);m.grudgeN=2;gain({danh:formal?3:2});if(by===S)S.th=cl((S.th||0)+1,-100,100);
 if(formal){const G=menGuards().filter(x=>x!==m&&x.alive);if(G.length&&roll(50)){const g=pick(G);g.grudge=key(by);g.grudgeN=1}}
 log(`${menCap(byT)} báo ${formal?"Cung Chính ti":"thị vệ"}: ${nm} lảng vảng ở ${at} không có lệnh, bị ${formal?"giải ra ngoại triều, cấm vào cung một năm":"đánh trượng, đuổi ra ngoại triều"}.`);return true}
/* by hides m (and c): a debt and evidence; found → by is punished */
function menHide(by,m,c,y,eyes){menStat(by===S?"hideMe":"hideNpc");const risk=cl(Math.round(10+eyes*5-(by.tamco||0)/10),4,60);
 if(c&&c!==by){const prev=J78.ctx;if(by===S)J78.ctx={how:"Ngươi giấu giúp, nên biết rõ chuyện",proves:menTrue(m,c,y).replace(/\.$/,"")};try{evA(by,c,y.r==="tryst"?2:1)}finally{J78.ctx=prev}affAdd(c,by,15);oanAdd(c,by,-10)}
 if(roll(risk)){ap(by,{danh:-6});punish(by,"che giấu nam nhân lẻn vào hậu cung",1);m.ban=wk()+MEN.banS;return false}
 if(by===S){m.af=(m.af||0)+15;m.debt=(m.debt||0)+1;S.menSec=S.menSec||{};S.menSec[m.id]={r:y.r,v:y.v||null,k:y.k,w:wk(),hid:1}}return true}

/* the player's choice */
function menEyes(k,c){return liveRivals(true).filter(w=>w!==c&&(S.where||{})[w.id]===k).reduce((s,w)=>s+1+(w.mat||0)/2,0)}
function menChoose(m,v,y,a){const at=placeName(y.k);menStat("ch_"+a);
 if(a==="bao"){menKh(1);try{k61Know(m,"Thị vệ tra hỏi, khai tên hắn.",true,2)}catch(e){}menReport(S,m,v,y,0);return}
 if(a==="ccti"){menKh(2);try{k61Know(m,"Cung Chính ti ghi tên hắn.",true,2)}catch(e){}menReport(S,m,v,y,1);return}
 if(a==="lo"){if(roll(50))m.af=(m.af||0)+3;log(`Ngươi làm như không thấy ${menNmFull(m)} ở ${at}, quay bước đi nơi khác.`);delete (S.menWhy||{})[m.id];return}
 if(a==="giau"){menKh(1);try{k61Know(m,"Hắn quỳ tạ, khai tên mình.",true,3)}catch(e){}const ok=menHide(S,m,v,y,menEyes(y.k,v));
  if(ok)log(`<span class="g">Ngươi sai người dẫn ${m.name} ra cửa ngách${v?`, che cho ${rkName(v)} ${v.name}`:""}. Hắn mang ơn ngươi; chuyện này thành bí mật trong tay ngươi.</span>`);
  else log(`<span class="r">Ngươi giấu ${m.name}, nhưng bị người thấy: tội che giấu nam nhân lẻn vào hậu cung.</span>`);delete (S.menWhy||{})[m.id];return}
 if(a==="nghe"){menKh(1);const o=od(35+(S.mat||0)*6+(S.tamco||0)/4);
  if(roll(o)){menStat("hearOk");try{k61Know(m,"Ngươi nghe được tên hắn.",true,2);if(v)k61Know(v,"",true,2)}catch(e){}
   log(`Núp sau hòn giả sơn, ngươi nghe rõ: ${menTrue(m,v,y)}`);
   S.menSec=S.menSec||{};S.menSec[m.id]=Object.assign({},S.menSec[m.id]||{},{r:y.r,v:y.v||null,k:y.k,w:wk(),heard:1});
   if(v){const prev=J78.ctx;J78.ctx={how:"Ngươi núp nghe lén",proves:menTrue(m,v,y).replace(/\.$/,"")};try{evA(S,v,y.r==="tryst"?2:1)}finally{J78.ctx=prev}
    try{intelAdd(v,{k:"man:"+m.id,kind:"secret",txt:menTrue(m,v,y)},{by:"me",how:"nghe lén"})}catch(e){}}
   setTimeout(()=>{try{if(S&&!S.dead&&manById(m.id))menCard(m,v,y,1)}catch(e){}},0);return}
  menStat("hearBad");m.knowsMe=m.knowsMe||[];if(!m.knowsMe.includes("me"))m.knowsMe.push("me");m.af=(m.af||0)-5;
  if(v){oanAdd(v,S,15);affAdd(v,S,-8)}log(`<span class="r">Ngươi giẫm phải cành khô; ${menNmFull(m)}${v?" và "+menVT(v):""} giật mình tản đi. ${v?"Nàng đã thấy ngươi nghe lén.":"Hắn đã thấy mặt ngươi."}</span>`);delete (S.menWhy||{})[m.id];return}}

/* ---------- 5. NPC consorts see the same strays and choose by their nature ---------- */
function menDecide(w,c){const tr=w.trait||"";const h=c?hostility(w,c):0;
 if(c){if(h>45||tr==="Hiểm độc")return roll(55)?"report":"hide";if(tr==="Hiền lành"||tr==="Nhu mì")return roll(65)?"ignore":"hide";if(tr==="Tham vọng"||tr==="Đa nghi")return roll(50)?"hide":"listen";return roll(35)?"report":roll(50)?"hide":"ignore"}
 if(tr==="Kiêu ngạo"||tr==="Đa nghi")return roll(55)?"report":"ignore";return roll(25)?"report":roll(30)?"hide":"ignore"}
function menNpcAct(w,m,c,y){const d=menDecide(w,c);menStat("npc_"+d);
 if(d==="report"){menReport(w,m,c,y,roll(30)?1:0);return d}
 if(d==="hide"){menHide(w,m,c,y,menEyes(y.k,c));if(c===S||(S.mat||0)&&roll((S.mat||0)*8)){try{intelAdd(w,{k:"menhide:"+m.id,kind:"secret",txt:`${rkName(w)} ${w.name} đã che giấu ${m.name} lẻn vào ${placeName(y.k)}${c&&c!==S?` cùng ${rkName(c)} ${c.name}`:""}.`},{by:"tai mắt",how:"tai mắt"})}catch(e){}}return d}
 if(d==="listen"&&c&&c!==w){if(roll(odA(w,35+(w.mat||0)*6+(w.tamco||0)/4)))evA(w,c,1);return d}
 return d}
function menNpcSee(m,y){if(!m||!y)return;const c=y.v?RV(y.v):null;for(const w of liveRivals(true)){if(w===c||(S.where||{})[w.id]!==y.k||!roll(MEN.notice))continue;menStat("npcSee");const d=menNpcAct(w,m,c,y);if(d==="report")break}}
/* she is the one caught: a private word with a man in the hậu cung while another consort is there */
(function(){const t0=talk;talk=function(oi){let p=null,a=null;try{p=S&&curPeople()[popIdx];a=p&&p.kind==="man"&&talkOpts(p)[oi]}catch(e){}const before=S&&S.logSeq;const r=t0.apply(this,arguments);
 try{if(a&&menRoad()&&!S.dead&&S.logSeq!==before&&!/^Chào hỏi/.test(a.n)&&menZone(S.place)==="hc"){const m=p.ref;const y={k:S.place,r:m.tinh>=50||m.trysts?"meet":"talk"};
  for(const w of liveRivals(true)){if((S.where||{})[w.id]!==S.place||!roll(MEN.seeMe+(w.mat||0)*4))continue;menStat("seenMe");const d=menDecide(w,S);
   if(d==="report"){if(y.r==="talk"){ap(w,{danh:2});apply({danh:-4});oanAdd(S,w,10);log(`<span class="r">${rkName(w)} ${w.name} thấy ngươi nói chuyện riêng với ${m.name} ở ${placeName(S.place)} và đem chuyện đi rêu rao: Danh -4.</span>`)}else menReport(w,m,S,y,0);break}
   if(d==="hide"||d==="listen"){evA(w,S,d==="hide"?2:1);break}}}}catch(e){console.error("men talk",e)}return r}})();

/* ---------- 6. the secret is leverage: "Uy hiếp hắn" on his card; grudges come back as rumours ---------- */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&p.kind==="man"&&p.ref&&menRoad()){const m=p.ref;const s=(S.menSec||{})[m.id];
  if(s&&!s.used){const o=od(45+(S.tamco||0)/3+(s.hid?10:0)-(m.trait==="cẩn trọng"?10:0));
   A.push({n:"Uy hiếp hắn",o,x:`hắn nộp bạc hay khai tin để giữ kín chuyện ${MEN_RT[s.r]||"cũ"} · hỏng: hắn ôm hận`,run:()=>{s.used=1;menStat("threat");
    if(roll(o)){const T=liveRivals(true).filter(v=>v.affair||(v.preg&&v.hidden)||(v.plan));if(T.length&&roll(60)){const v=pick(T);const F=j78facts(v).filter(f=>f.kind==="secret"||f.kind==="plan");const f=F[0];
      if(f){intelAdd(v,f,{by:m.name,how:"uy hiếp "+m.name});return `Hắn run sợ, khai: ${f.txt}`}}
     apply({bac:40});m.af=(m.af||0)-10;return "Hắn run sợ, nộp 40 lạng bạc xin ngươi giữ kín. Bạc +40."}
    m.grudge="me";m.grudgeN=2;m.af=(m.af||0)-20;return "Hắn cứng cổ không chịu, từ nay ôm hận ngươi."}})}}}catch(e){console.error("men opts",e)}return A}})();
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(menRoad()){for(const m of (S.men||[])){if(!m.alive||m.grudge!=="me"||menBanned(m)||!(m.grudgeN>0)||!roll(MEN.grudge))continue;
  m.grudgeN--;menStat("revenge");apply({danh:-3});ev+=`<span class="r">Trong cung rộ lời đồn ác ý về ngươi; nghe nói phát ra từ đám ${m.rw==="thị vệ"?"thị vệ":"người ngoài cung"} từng bị ngươi làm khó. Danh -3.</span> `}}}catch(e){}return ev}})();

/* stage names: unknown men show "???" like unknown consorts (j61 masks the cards); the role is the tag title */
function menStageNm(m){try{return k61Named(m)?m.name.replace(/^(Thị vệ|Thái y|Vương gia|Nhạc sư|Sứ thần|Họa sư)\s+/,""):"???"}catch(e){return m.name}}
