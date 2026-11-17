/* ================= jmen: NAM NHÂN TRONG CUNG — vùng cấm, chỗ theo buổi, bắt gặp nam nhân nơi cấm địa (hai chiều) =================
   Extends j22 (S.men, S.menW, talkOpts, tư tình), j55 (quan), j61 (biết người), j8/j78 (chứng cứ, phạt), jk2b/jk4 (thẻ sự kiện, hình toàn thân).
   Plan: dev/MEN_PLAN.md. Consort road only (the servant road keeps j42's men).
   1. MEN_ZONE: hậu cung (cấm nam nhân trừ Hoàng thượng, thái giám, thái y / thợ có lệnh) · nội đình · nha sở · ngoại triều (cấm nữ quyến).
   2. menPlace(): every buổi each man has a place AND a reason (S.menWhy[id] = {w:duty|summons|order|visit|fest|stray, r, v, k});
      strays (no order inside the hậu cung) are rare: night, festivals, the garden.
   3. Walking into a place with a stray → event card (cost only): Báo thị vệ · Báo Cung Chính ti · Làm như không thấy · Giấu giúp · Núp nghe lén.
   4. The same rules for NPC consorts (menDecide → menReport / menHide), and she can be the one caught (talking alone with a man there).
   ============================================================================================================================= */
const MEN={banS:12,banF:36,grudge:22,path:25};
const MEN_BRIBE=["tham vọng","phong lưu"],MEN_ROVE=["phong lưu","đa tình"],MEN_FANCY=["phong lưu","đa tình"];
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
/* four named guards share the two guard pictures (coordinator 11/15: many guards may share the 2 looks) */
function menGuards(){return (S.men||[]).filter(m=>m.rw==="thị vệ")}
(function(){const m0=menInit;menInit=function(){const r=m0.apply(this,arguments);try{if(S&&S.men&&!S.menG2){S.menG2=1;const sur=["Chu","Hà","Lâm","Ninh","Phan","Từ"];
  for(let i=0;i<3;i++){const id="m"+(S.men.length);S.men.push({id,role:"Thị vệ",rw:"thị vệ",haunts:["thu","dtd"],age:20+R(14),name:`Thị vệ ${pick(sur)} ${pick(MALEN)}`,trait:pick(MTR),loyal:40+R(50),af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[]})}}}catch(e){}return r}})();
/* who a man fancies: set once from his nature (phong lưu / đa tình) and the consorts' looks; renewed if she is gone */
(function(){const m0=menInit;menInit=function(){const r=m0.apply(this,arguments);try{if(S&&S.men)for(const m of S.men){const v=m.likeV!=null?RV(m.likeV):null;if(v&&v.alive&&!v.out)continue;m.likeV=null;
  if(!MEN_FANCY.includes(m.trait))continue;const C=liveRivals(false).filter(x=>!x.queen&&(x.age||20)>=18&&!x.affair);if(!C.length)continue;
  /* the most beautiful one he can see (her looks), the id breaks ties: no dice */
  C.sort((a,b)=>((typeof effSac==="function"?effSac(b):b.sac||0)-(typeof effSac==="function"?effSac(a):a.sac||0))||(menH(a.id)-menH(b.id)));m.likeV=C[(menH(m.id)%Math.min(2,C.length))].id}}catch(e){}return r}})();
(function(){if(typeof figPick!=="function")return;const f0=figPick;figPick=function(who){try{if(S&&who&&who.rw==="thị vệ"&&(S.men||[]).includes(who)){const M=FIGIX.man||{};const ks=Object.keys(M).filter(k=>/thive/.test(k)).sort();
  if(ks.length){if(who.fid&&M[who.fid])return who.fid;const i=menGuards().indexOf(who);who.fid=ks[Math.max(0,i)%ks.length];return who.fid}}}catch(e){}return f0.apply(this,arguments)}})();

/* ---------- 1. who is where this buổi, and why — DETERMINISTIC (owner 11/15: no dice for who enters the hậu cung or when) ----------
   Duty rosters and work orders follow the calendar (week index + each man's id); strays come only from PLANS made by people with a motive,
   stored in S.menPlans a tuần ahead (who, tuần, buổi, khắc, place, route, how hidden). She meets one iff she is at that place (or walks past it)
   during its khắc; whether she understands what she sees depends on her Tai mắt / Tâm cơ against how well it is hidden; tai mắt may tip her
   off a tuần ahead. NPC consorts witness the same way from their real places. */
function menH(x){let h=7;for(const c of String(x))h=(h*31+c.charCodeAt(0))%100003;return h}
function menHcPal(v){const k=palaceOf(v);return k==="home"?null:k}
function menGi(m){return Math.max(0,menGuards().indexOf(m))}
/* the guards' roster keeps its 3 shifts (old balance): buổi -> shift index [sáng, trưa, chiều, tối] = [0,0,1,2] (trưa rides the morning shift); 2 shifts of 3 on duty, the post turns with the week */
const MEN_SHIFT=[0,0,1,2];
function menDuty(m,w,b){if(m.rw!=="thị vệ")return null;const i=menGi(m);if((w*3+MEN_SHIFT[b]+i)%3===0)return null;return["thu","dtd","ksp"][(w+i)%3]}
/* craftsmen's work orders (Nội vụ phủ): every other tuần, in the morning or afternoon, at the palaces in turn (highest rank first) */
function menOrder(m,w){if(m.rw!=="nhạc sư"&&m.rw!=="họa sư")return null;const i=+m.id.slice(1)||0;if((w+i)%2)return null;
 const C=liveRivals(true).filter(menHcPal).sort((a,b)=>rkOf(b)-rkOf(a)||menH(a.id)-menH(b.id));const v=C.length&&(w>>1)%3!==2?C[((w>>1)+i)%C.length]:null;return{b:(w+i)%2?2:(w>>1)%2?2:0,k:v?menHcPal(v):"vuon",v:v?v.id:null}}
function menFestOn(){try{return festToday()}catch(e){return null}}
/* the fixed schedule (duty rosters, work orders, festivals, visits, the morning audience): the same on BOTH roads (people ledger, owner 16/11
   13:40Z: "people outside the palace leave only at their set hours", no random presence); the maid road takes this instead of j22's dice.
   Four buổi a tuần (jtime4): night = the last buổi (B4L), the afternoon (old buổi 1) = 2. */
function menSchedRoad(){try{return menRoad()||(!!S&&!S.dead&&typeof isSrv==="function"&&isSrv())}catch(e){return false}}
function menSched(){menInit();const W={},Y={};const b=S.buoi||0,night=b===B4L,w=wk();const f=menFestOn();const L=liveRivals(true);
 for(const m of S.men){if(!m.alive||menBanned(m))continue;const rw=m.rw;let k=null,ww="";const i=+m.id.slice(1)||0;
  if(rw==="thị vệ"){k=menDuty(m,w,b);ww=k?"duty":""}
  else if(rw==="thái y"){const sick=L.filter(v=>(v.preg||v.ill||(v.suc!=null&&v.suc<40))&&menHcPal(v)).sort((a,b)=>menH(a.id)-menH(b.id));if(sick.length&&b===2){k=menHcPal(sick[w%sick.length]);ww="summons"}else if(!night){k="tyv";ww="duty"}}
  else if(rw==="vương gia"){if(f&&!night){k="vuon";ww="fest"}else if(!S.thDead&&b===0&&(w+i)%4===0){k="tn";ww="visit"}}
  else if(rw==="nhạc sư"||rw==="họa sư"){const o=menOrder(m,w);if(o&&o.b===b){k=o.k;ww="order"}}
  else if(rw==="sứ thần"){if(b===0&&(w+i)%3===0){k="thu";ww="duty"}else if(f&&!night){k="vuon";ww="fest"}}
  if(k){W[m.id]=k;Y[m.id]={w:ww,k}}}
 S.menW=W;S.menWhy=Y;menMinW(b,w,f)}
/* officials (j55): two at the morning audience by turn of the week; one at a festival banquet */
function menMinW(b,w,f){S.minW={};try{if(typeof trS==="function"&&typeof tdOn==="function"&&tdOn()){const H=Object.values(trS().H||{});if(H.length){if(b===0){S.minW[H[w%H.length].c]="thu";S.minW[H[(w+2)%H.length].c]="thu"}if(f&&b>0)S.minW[H[(w+1)%H.length].c]="vuon"}}}catch(e){}}
function menPlace(){menSched();const W=S.menW,Y=S.menWhy;const b=S.buoi||0,w=wk();menPlanWeek();
 /* today's plans come true where they were planned */
 for(const P of (S.menPlans||[])){if(P.w!==w||P.done)continue;const m=manById(P.m);if(!m||menBanned(m)){P.done=1;continue}const v=P.v!=null?RV(P.v):null;
  if(P.v!=null&&(!v||!v.alive||v.out)){P.done=1;continue}
  if(P.opp){/* seek: the first buổi of his tuần when he is inside and she stands in the hậu cung (not in a shared lodging) */
   const k=(S.where||{})[v.id];if(!W[m.id]||menZone(k)!=="hc"||k==="home")continue;P.b=b;P.k=k;P.from=W[m.id]}
  else if(P.b!==b)continue;
  P.done=1;W[m.id]=P.k;Y[m.id]={w:"stray",k:P.k,r:P.r,v:P.opp?null:P.v,why:P.why,likeV:P.r==="seek"?P.v:null,plan:P.id,h:P.h,from:P.from,hide:P.hide};
  if(v&&!P.opp)S.where[v.id]=P.k;menStat("stray");menStat("c_"+P.r);menNpcSee(m,Y[m.id])}
}
/* PLANS, made at the start of each tuần for the next one (and the current one when a life has none yet) */
function menPlanWeek(){S.menPlans=S.menPlans||[];const w=wk();if(S.menPW===w)return;const first=S.menPW==null;S.menPW=w;
 S.menPlans=S.menPlans.filter(P=>P.w>=w-1);for(const t of first?[w,w+1]:[w+1])menMakePlans(t)}
function menMakePlans(t){const add=P=>{P.id=(S.menPS=(S.menPS||0)+1);P.w=t;S.menPlans.push(P);menTip(P)};const C=liveRivals(false);
 /* 1. lovers (j22 v.affair): every 2–3 tuần by his nature, the night his guard roster leaves free, at a place her nature chooses */
 for(const v of C){const m=v.affair&&manById(v.affair);if(!m||menBanned(m))continue;const cad=MEN_ROVE.includes(m.trait)?2:3;if((t+menH(v.id))%cad)continue;
  if(m.rw==="thị vệ"&&menDuty(m,t,B4L))continue;const careful=v.trait==="Đa nghi"||m.trait==="cẩn trọng";const k=careful?"lc":(menHcPal(v)&&v.trait==="Kiêu ngạo"?menHcPal(v):"vuon");
  add({m:m.id,v:v.id,r:"tryst",b:B4L,h:3,k,from:m.rw==="thị vệ"?"dtd":"vuon",hide:30+(v.tamco||0)/3})}
 /* 2. secret letters: a consort with a reason to reach the outside, once a season (12 tuần) while the reason lasts, through a guard who can be bought, on his shift;
    one letter a tuần goes out at most (the guards can carry only one safely) */
 let lt=0;for(const v of C.slice().sort((a,b)=>menH(a.id+":"+t)-menH(b.id+":"+t))){if(lt||v.queen||!menHcPal(v))continue;const why=v.confined?"confined":v.plan?"plan":(v.preg&&v.hidden)?"preg":((v.sung||0)<25&&(v.ghen||0)>=50)?"jealous":"";if(!why||(t+menH(v.id))%12)continue;
  const G=menGuards().filter(g=>g.alive&&!menBanned(g)&&(MEN_BRIBE.includes(g.trait)||(g.loyal||50)<50)).sort((a,b)=>(a.loyal||50)-(b.loyal||50));if(!G.length)continue;
  const g=G[0];const bb=[B4L,2,0].find(x=>menDuty(g,t,x));if(bb==null)continue;add({m:g.id,v:v.id,r:"letter",why,b:bb,h:2,k:menHcPal(v),from:menDuty(g,t,bb),hide:20+(v.tamco||0)/4});lt=1}
 /* 3. overstay: a craftsman of a roving nature on a real order in a palace whose mistress is out of favour or the one he fancies */
 for(const m of S.men){const o=menOrder(m,t);if(!m.alive||!o||o.v==null||!MEN_ROVE.includes(m.trait))continue;const v=RV(o.v);if(!v||v.queen||!((v.sung||0)<40||m.likeV===v.id))continue;
  add({m:m.id,v:v.id,r:"overstay",job:m.rw,b:o.b,h:4,k:o.k,from:o.k,hide:10})}
 /* 4. an admirer: every 12 tuần by his nature (đa tình 9), the first buổi he is inside while she stands in the hậu cung */
 for(const m of S.men){if(!m.alive||m.likeV==null||!MEN_FANCY.includes(m.trait)||(t+menH(m.id))%(m.trait==="đa tình"?9:12))continue;add({m:m.id,v:m.likeV,r:"seek",opp:1,h:2,hide:15})}}
/* tai mắt: she hears of a plan a tuần ahead when her eyes reach deep enough (Tai mắt, Tâm cơ) — true, partial */
function menEye(p){return p===S?(S.mat||0)*8+(S.tamco||0)/3:(p.mat||0)*8+(p.tamco||0)/3}
function menTip(P){try{if(!menRoad()||P.opp)return;if(menEye(S)<P.hide+40)return;P.tip=1;const t=P.w-wk();const when=`${t<=0?"tuần này":"tuần tới"}, ${BUOI[P.b].toLowerCase()}`;
 log(`<span class="g">Tai mắt báo: nghe nói ${when}, có nam nhân sẽ lẻn vào ${placeName(P.k)}${menEye(S)>=P.hide+30&&P.v!=null&&RV(P.v)?`, gặp ${menVT(RV(P.v))}`:""}. Muốn thấy tận mắt thì có mặt ở đó lúc ấy.</span>`);menStat("tip")}catch(e){}}
/* she becomes a maid after the consort start ran (j42 srvInit): this buổi's schedule is read again for her road (the consort start's court
   roster must not linger for a buổi) */
(function(){if(typeof srvInit!=="function")return;const s0=srvInit;srvInit=function(){const r=s0.apply(this,arguments);try{if(menSchedRoad()&&!menRoad())menSched()}catch(e){console.error("menSched",e)}return r}})();
(function(){const pw=placeWhere;placeWhere=function(){const r=pw.apply(this,arguments);try{if(menRoad())menPlace();else if(menSchedRoad())menSched()}catch(e){console.error("menPlace",e)}return r}})();
(function(){const c0=countAt;countAt=function(k){let n=c0(k);try{if(menRoad())for(const c in (S.minW||{}))if(S.minW[c]===k)n++}catch(e){}return n}})();

/* ---------- 2. zones on the map data and the place cards ---------- */
const MEN_NT={box:{x:.445,y:.805,w:.11,h:.12}};
(function(){try{fetch("img/map-hotspots.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&j.outerCourt&&j.outerCourt.box)MEN_NT.box=j.outerCourt.box}).catch(()=>{})}catch(e){}})();
(function(){const s0=mapSpots;mapSpots=function(){const L=s0.apply(this,arguments);try{if(menRoad())L.push({k:null,box:MEN_NT.box,n:"Ngoại triều",fn:"cấm nữ quyến bước vào",res:[],small:true,empty:true})}catch(e){}return L}})();
/* the outer court: the NORMAL map label + a small lock mark (owner 11/15: no grey overlay on closed places); a tap opens a kit card with the
   reason and the options. The lock mark is .kmlock so the shared kit label (integrator, review/book-release) can take it over when it lands. */
(function(){const h0=mapHTML;mapHTML=function(){let h=h0.apply(this,arguments);try{if(menRoad())h=h.replace(/<div class="mspot sm off empty" title="Ngoại triều: ([^"]*)" style="([^"]*)"><span class="mlab">Ngoại triều<\/span><\/div>/,(a,why,st)=>`<button class="mspot sm kmen-nt" data-mennt="1" title="Ngoại triều: ${why}" style="${st}"><span class="mlab"><span class="kmlock" aria-label="cấm vào">🔒</span> Ngoại triều</span><span class="mmeta"><em>${why}</em></span></button>`)}catch(e){}return h}})();
function menNtCard(){if(!S||S.dead||Q.length)return;const T=(typeof trS==="function"&&typeof tdOn==="function"&&tdOn())?trS():null;const left=Math.max(0,BAL.time.khac-used);
 const opts=[];if(T&&left>=1)opts.push({n:"Hỏi thái giám tin ngoại triều",fx:{bac:-5},x:"Chắc chắn · tốn: 1 khắc",go:()=>{spend(1);const L=Object.keys(S.minW||{}).map(c=>T.H[c]&&`${TDOFF[c]||"Quan"} ${T.H[c].name} (${S.minW[c]==="thu"?"vào chầu ở Ngự thư phòng":"dự yến ở Ngự hoa viên"})`).filter(Boolean);
  log(L.length?`Thái giám kể: buổi này ${L.join("; ")}.`:"Thái giám kể: buổi này không có vị quan nào vào chầu.")}});
 opts.push({n:"Thôi",fx:{},x:""});
 kitModal({kind:"rule",title:"Ngoại triều",showOut:true,sections:[{h:"Vì sao không vào được",rows:[["Luật","Ngoại triều là nơi Hoàng thượng thiết triều với bá quan: nữ quyến hậu cung không được bước vào.","t"],["Ai được vào","Hoàng thượng, quan lại, thị vệ, sứ thần; thái giám đi truyền chỉ.","t"]]}],opts})}
/* the map's one tap handler (j77 window capture) sends an unnamed spot to j77Tap(k,label): the outer court opens its own card */
(function(){if(typeof j77Tap!=="function")return;const t0=j77Tap;j77Tap=function(k,empty){if(!k&&/Ngoại triều/.test(empty||"")&&menRoad()){try{menNtCard()}catch(e){console.error("menNt",e)}return}return t0.apply(this,arguments)}})();
(function(){const p0=placeOf;placeOf=function(k){const P=p0.apply(this,arguments);try{if(P&&k&&menRoad()&&!P.__mz){const z=menZone(k);const t=z==="hc"?"Hậu cung: nam nhân không được vào, trừ Hoàng thượng, thái giám, thái y hay thợ có lệnh.":z==="nd"?"Nội đình: thị vệ canh cửa, quan lại vào chầu.":"";if(t)return Object.assign({},P,{d:((P.d||"")+" "+t).trim(),zone:z,__mz:1})}}catch(e){}return P}})();

/* officials on the stage (kind "min"): face, role, a polite greeting */
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="min"&&p.ref)return pMin(p.ref);return f0.apply(this,arguments)}})();
(function(){const t0=talkOpts;talkOpts=function(p){if(p&&p.kind==="min"){const h=p.ref;return[{n:"Chào hỏi đúng lễ",o:100,w:{danh:1},x:"người ấy quý ngươi +3",go:()=>{try{h.af=h.af||{};h.af.me=(h.af.me||0)+3}catch(e){}}}]}return t0.apply(this,arguments)}})();

/* ---------- 3. arrival: men and officials stand on the stage; a stray → the event card ---------- */
(function(){const g=goTo;goTo=function(k){const fr=S&&S.place,t0=typeof used==="number"?used:0;const r=g.apply(this,arguments);try{if(!menRoad()||S.place!==k||!S.visit||S.visit.k!==k)return r;S.menFrom={k:fr,t:t0};
  for(const c in (S.minW||{})){if(S.minW[c]!==k)continue;const h=(trS().H||{})[c];if(!h||S.visit.people.some(p=>p.ref===h))continue;S.visit.people.push({kind:"min",ref:h,name:h.name,ini:"Quan",col:"#7a6a50",info:`${TDOFF[h.c]||"Quan"} · ${S.minW[c]==="thu"?"vào chầu":"dự yến"}`})}
  S.visit.people.forEach(q=>{if(q&&q.kind==="man"&&q.ref&&!Object.getOwnPropertyDescriptor(q,"name").get){const m=q.ref;Object.defineProperty(q,"name",{get(){return menStageNm(m)},enumerable:true,configurable:true})}});
  S.menArr={k,t:used};menWatch(k,S.menFrom);
  try{renderStage()}catch(e){}}catch(e){console.error("men goTo",e)}return r}})();

/* she sees a plan iff she is THERE during its khắc (h-1 .. h+1), or her walk passes next to it while he walks in; no dice */
function menWatch(k,from){if(!menRoad()||S.dead)return;const Y=S.menWhy||{};S.menMet=S.menMet||{};const now=used,arr=S.menArr&&S.menArr.k===S.place?S.menArr.t:now;
 for(const id in Y){const y=Y[id];const m=manById(id);if(!m||y.w!=="stray"||(S.menW||{})[id]!==y.k)continue;const kk=bkey()+":"+id;if(S.menMet[kk])continue;const h=y.h||2;
  const at=S.place===y.k&&now>=h-1&&arr<h+1;
  const on=!at&&from&&from.k!=null&&k!==y.k&&from.t<h&&now>=h-1&&(travel(y.k,k)===1||travel(y.k,from.k||"home")===1)&&menZone(y.k)==="hc";
  if(!at&&!on)continue;S.menMet={[kk]:1};
  const v=y.v!=null?RV(y.v):null;if(v&&(!v.alive||v.out))continue;menStat(at?"enc":"encPath");
  const sees=menEye(S)>=(y.hide||0);menStat(sees?"recog":"blur");menCard(m,sees?v:null,Object.assign({},y,{p:on?1:0,hv:!sees&&v?v.id:null}),0);break}}
(function(){const s0=spend;spend=function(c){const r=s0.apply(this,arguments);try{if(menRoad()&&!S.dead&&S.place&&S.menArr&&S.menArr.k===S.place&&!Q.length)menWatch(S.place,null)}catch(e){}return r}})();
/* the buổi ends with her still there: she was there through the last khắc too */
(function(){const n0=nextBuoi;nextBuoi=function(){try{if(menRoad()&&!S.dead&&!Q.length&&S.place&&S.menArr&&S.menArr.k===S.place){const u=used;used=BAL.time.khac;try{menWatch(S.place,null)}finally{used=u}if(Q.length){if(!window.__bot)showModal();return}}}catch(e){}return n0.apply(this,arguments)}})();

function menSeeLine(m,v,y){const at=(y.p?"lối đi gần ":"")+placeName(y.k);const t=BUOI[S.buoi||0].toLowerCase();
 if(v&&y.r==="tryst")return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đứng sát bên ${menVT(v)} sau hòn giả sơn; thấy động, hai người vội buông tay nhau.`;
 if(v)return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đứng nói khẽ với ${menVT(v)}; tay nàng vừa giấu vội vật gì vào tay áo.`;
 if(y.hv!=null)return `${menCap(t)} ở ${at}, ngươi thoáng thấy ${menNmFull(m)} đứng khuất sau hòn giả sơn; hình như có bóng áo phi tần vừa lánh đi, ngươi không nhìn rõ là ai.`;
 return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đi lại một mình, không có thái giám dẫn đường.`}
const MEN_RT={tryst:"hẹn hò tư tình",letter:"chuyển thư lén ra ngoài cung",overstay:"nán lại quá giờ lệnh",seek:"lẻn vào tìm gặp người hắn để ý"};
const MEN_LW={confined:"đang bị cấm túc, muốn báo tin về nhà",plan:"đang toan tính một việc, cần người ngoài giúp",preg:"đang giấu thai, nhờ nhà ngoại lo liệu",jealous:"thất sủng sinh ghen, nhờ nhà ngoại ra mặt"};
const MEN_JOB={"nhạc sư":"dạy đàn","họa sư":"vẽ chân dung","thái y":"bắt mạch"};
function menTrue(m,v,y){const nm=m.name,at=placeName(y.k),vn=v?`${rkName(v)} ${v.name}`:"";
 if(y.r==="tryst")return `${nm} lẻn vào ${at} để hẹn hò tư tình với ${vn}.`;
 if(y.r==="letter")return `${nm} nhận bạc của ${vn} để lén chuyển thư ra ngoài cung: nàng ${MEN_LW[y.why]||"có chuyện riêng"}.`;
 if(y.r==="overstay")return `${nm} được lệnh ${MEN_JOB[m.rw]||"làm việc"} ở ${at}, nhưng nán lại quá giờ để trò chuyện riêng với ${vn}.`;
 if(y.r==="seek"){const t=RV(y.likeV)||v;return `${nm} để ý ${t?`${rkName(t)} ${t.name}`:"một phi tần"} từ lâu, lẻn vào ${at} mong được gặp nàng.`}
 return `${nm} vào ${at} không có lệnh.`}
/* the card (a saveable event: PEND) — an EVENT choice: cost mode + kit hint / risk (owner 11/15 14:30Z, KIT 28.6, replaces the 00:26Z full act cards); result card after. No `who`: a speaker would introduce himself (j61),
   a stray man does not; the people stand on the card through `stage`. */
PEND.menEnc=pp=>{const m=manById(pp.m);if(!m||!S)return null;const v=pp.v?RV(pp.v):null;const y={k:pp.k,r:pp.r,v:pp.v,p:pp.p||0,why:pp.why,likeV:pp.lv,hv:pp.hv};
 const L=[`<p>${pp.h?menTrue(m,v,y):menSeeLine(m,v,y)}</p>`,`<p>${MEN_ZN.hc}: nam nhân không có lệnh không được bước vào. Ai biết mà không báo cũng mang tội.</p>`];
 const o=menOpts(m,v,y,pp.h).map(a=>({n:a.n,fx:{},x:a.x,go:()=>menChoose(m,v,y,a.k)}));
 return{t:L.join(""),o,stage:v?[m,v]:[m],headArt:menArt(y.k),optLayout:"rows"}};
/* the act-card lines of each choice (same numbers as menReport / menHide / menChoose): Tốn · Được (thành) · Mất (hỏng) · Kèm, odds word on rolls */
function menOpts(m,v,y,heard){/* items split by " · " so the kit (j63 kaRows) puts each in its row: "nàng …" harm = Được (green), "(…)" = Ghi chú, kèm = red */
 const love=v&&y.r==="tryst";const d=S.danh||0,tc=S.tamco||0;const A=[];const ev=love?2:1;
 if(v&&love){const o=odA(S,58+d/5),o2=odA(S,42+d/5+tc/4);
  A.push({k:"bao",n:"Báo thị vệ",x:`${word(o)} · tốn: 1 khắc · thành: Danh +4 · nàng bị ban chết hay đày lãnh cung · (hắn bị xử trảm) · hỏng: nàng chối được, Danh -2 · kèm: nàng oán ngươi +30 · phe nàng tìm cách trả thù`});
  A.push({k:"ccti",n:"Báo Cung Chính ti",x:`${word(o2)} · tốn: 2 khắc · thành: Danh +4 · nàng bị ban chết hay đày lãnh cung · (xét án có sổ sách; hắn bị xử trảm) · hỏng: thiếu chứng nên nàng chối được, Danh -2 · kèm: nàng oán ngươi +30 · phe nàng tìm cách trả thù`})}
 else if(v){const o2=odA(S,48+d/5+tc/4);const sg=(v.sung||0)>=60?" · Hoàng thượng không vui, Sủng -2":"";
  A.push({k:"bao",n:"Báo thị vệ",x:`Chắc chắn · tốn: 1 khắc · thành: Danh +3 · Thái hậu quý ngươi +2 · nàng mất tự do, cấm túc · (hắn bị đánh trượng, đuổi ra ngoại triều) · kèm: nàng oán ngươi +22${sg}`});
  A.push({k:"ccti",n:"Báo Cung Chính ti",x:`${word(o2)} · tốn: 2 khắc · thành: Danh +3 · Thái hậu quý ngươi +2 · nàng sa sút, có khi giáng phẩm · (hắn bị cấm vào cung một năm) · hỏng: thiếu chứng, mang tiếng vu khống, Danh -5 · kèm: nàng oán ngươi +22${sg}`})}
 else{A.push({k:"bao",n:"Báo thị vệ",x:`Chắc chắn · tốn: 1 khắc · thành: Danh +2 · Thái hậu quý ngươi +1 · (hắn bị đánh trượng, đuổi ra ngoại triều) · kèm: hắn ôm hận, có thể tung tin đồn trả thù · Danh -3 mỗi lần bị trả thù`});
  A.push({k:"ccti",n:"Báo Cung Chính ti",x:`Chắc chắn · tốn: 2 khắc · thành: Danh +3 · Thái hậu quý ngươi +1 · (hắn bị cấm vào cung một năm) · kèm: hắn và đồng liêu thị vệ có thể trả thù · Danh -3 mỗi lần bị trả thù`})}
 const risk=cl(Math.round(10+menEyes(y.k,v)*5-tc/10),4,60);
 A.push({k:"giau",n:"Giấu giúp",x:`${word(100-risk)} · tốn: 1 khắc · thành: hắn mang ơn, người ấy quý ngươi +15 · giữ bí mật của hắn để uy hiếp về sau${v?` · chứng cứ về nàng +${ev} · nàng quý ngươi +15`:""} · hỏng: bị thấy, mắc tội che giấu, Danh -6, cấm túc · kèm: lộ ra về sau thì bị liên lụy`});
 if(!heard){const oh=od(35+(S.mat||0)*6+tc/4);A.push({k:"nghe",n:"Núp nghe lén",x:`${word(oh)} · tốn: 1 khắc · thành: biết tên ${v?"hai người":"hắn"} · biết vì sao hắn ở đây${v?` · chứng cứ về nàng +${ev}`:""} · (rồi chọn tiếp báo hay giấu) · (thành hay bại tùy Tai mắt và Tâm cơ của ngươi) · hỏng: bị phát hiện, họ tản đi, hắn quý ngươi -5${v?" · kèm: nàng oán ngươi +15":""}`})}
 A.push({k:"lo",n:"Làm như không thấy",x:`Chắc chắn · thành: không dính vào chuyện · kèm: nếu về sau lộ ra ngươi thấy mà không báo, dễ bị liên lụy`});
 return A}
function menArt(k){try{const P=placeOf(k);const f=SCIMG[P.sc];return f?{src:`img/${f}.webp`,label:P.n}:undefined}catch(e){return undefined}}
function menCard(m,v,y,heard){try{k61Know(m,"",true,1);if(v)k61Know(v,"",true,1)}catch(e){}const d=mkP("menEnc",{m:m.id,v:v?v.id:null,k:y.k,r:y.r,p:y.p||0,why:y.why||null,lv:y.likeV!=null?y.likeV:null,hv:y.hv!=null?y.hv:null,h:heard?1:0});if(!d)return;
 Q.push({t:heard?"Nghe lén sau hòn giả sơn":"Nam nhân nơi cấm địa",h:d.t,opts:d.o,stage:d.stage,headArt:d.headArt,optLayout:"rows",pid:d.pid,pp:d.pp});if(!window.__bot)showModal()}
(function(){const d0=deserQ;deserQ=function(L){const out=d0.apply(this,arguments);try{out.forEach(q=>{if(q.pid==="menEnc"){const d=mkP("menEnc",q.pp);if(d){q.stage=d.stage;q.headArt=d.headArt;q.optLayout="rows"}}})}catch(e){}return out}})();
function menKh(n){if(typeof j76spills==='function'&&j76spills(n)){spend(n);return}const c=Math.max(0,Math.min(n,BAL.time.khac-used));if(c)spend(c)} /* runs on into the next buổi like every act (time-spill sweep 16/11) */

/* ---------- 4. the shared outcomes (the player and NPC consorts use the same ones) ---------- */
/* by reports m (and the companion c) at the scene (formal=0) or to the Cung Chính ti (formal=1) */
function menReport(by,m,c,y,formal){const at=placeName(y.k);const nm=m.name;const byT=by===S?"ngươi":`${rkName(by)} ${by.name}`;menStat(by===S?"repMe":"repNpc");
 const gain=(o)=>ap(by,o);
 if(c&&(y.r==="tryst"||y.r==="meet")&&(c!==S||m.trysts>0||y.r==="tryst")){const o=odA(by,(formal?42:58)+(by.danh||0)/5+(formal?(by.tamco||0)/4:0));
  oanAdd(c,by,BAL.eff.jmen.menReport);affAdd(c,by,BAL.eff.jmen.menReport_2);
  if(roll(o)){m.alive=false;log(`<span class="r">${menCap(byT)} báo ${formal?"Cung Chính ti":"thị vệ"}: bắt được ${nm} cùng ${c===S?"ngươi":`${rkName(c)} ${c.name}`} ở ${at}. ${nm} bị xử trảm.</span>`);
   gain({danh:4});if(c===S)deathSentence(`Bị ban chết vì tư thông với ${nm}`);else deathSentence(c,`tư thông với ${nm}`);return true}
  m.ban=wk()+MEN.banS;log(`<span class="r">${menCap(byT)} báo ${formal?"Cung Chính ti":"thị vệ"} chuyện ở ${at}; ${c===S?"ngươi":`${rkName(c)} ${c.name}`} chối phăng, chỉ ${nm} bị đánh trượng, đuổi ra ngoại triều.</span>`);gain({danh:-2});return false}
 if(c){const o=formal?odA(by,48+(by.danh||0)/5+(by.tamco||0)/4):100;oanAdd(c,by,BAL.eff.jmen.menReport_3);affAdd(c,by,BAL.eff.jmen.menReport_4);m.ban=wk()+(formal?MEN.banF:MEN.banS);
  if(roll(o)){log(`<span class="r">${menCap(byT)} báo ${formal?"Cung Chính ti":"thị vệ"}: ${nm} và ${c===S?"ngươi":`${rkName(c)} ${c.name}`} gặp riêng ở ${at}${y.r==="letter"?", trao thư lén":""}.</span>`);
   punish(c,y.r==="letter"?"trao thư lén cho nam nhân ra ngoài cung":"gặp riêng nam nhân nơi cấm địa",formal?2:1);gain({danh:3});
   if(by===S&&c!==S&&(c.sung||0)>=60){apply({sung:-2});log("Hoàng thượng không vui vì người ngài thương bị phạt.")}if(by===S)S.th=cl((S.th||0)+2,-100,100);return true}
  log(`<span class="r">${menCap(byT)} trình Cung Chính ti chuyện ở ${at}, nhưng không đủ chứng: ${c===S?"ngươi":`${rkName(c)} ${c.name}`} vô can; ${byT} mang tiếng vu khống.</span>`);gain({danh:-5});return false}
 m.ban=wk()+(formal?MEN.banF:MEN.banS);m.grudge=key(by);m.grudgeN=2;gain({danh:formal?3:2});if(by===S)S.th=cl((S.th||0)+1,-100,100);
 if(formal){const G=menGuards().filter(x=>x!==m&&x.alive);if(G.length){const g=G.slice().sort((a,b)=>(a.loyal||50)-(b.loyal||50))[0];if((g.loyal||50)<60){g.grudge=key(by);g.grudgeN=1}}}
 log(`${menCap(byT)} báo ${formal?"Cung Chính ti":"thị vệ"}: ${nm} lảng vảng ở ${at} không có lệnh, bị ${formal?"giải ra ngoại triều, cấm vào cung một năm":"đánh trượng, đuổi ra ngoại triều"}.`);return true}
/* by hides m (and c): a debt and evidence; found → by is punished */
function menHide(by,m,c,y,eyes){menStat(by===S?"hideMe":"hideNpc");const risk=cl(Math.round(10+eyes*5-(by.tamco||0)/10),4,60);
 if(c&&c!==by){const prev=J78.ctx;if(by===S)J78.ctx={how:"Ngươi giấu giúp, nên biết rõ chuyện",proves:menTrue(m,c,y).replace(/\.$/,"")};try{evA(by,c,y.r==="tryst"?2:1)}finally{J78.ctx=prev}affAdd(c,by,BAL.eff.jmen.menHide);oanAdd(c,by,BAL.eff.jmen.menHide_2)}
 if(roll(risk)){ap(by,{danh:-6});punish(by,"che giấu nam nhân lẻn vào hậu cung",1);m.ban=wk()+MEN.banS;return false}
 if(by===S){m.af=(m.af||0)+15;m.debt=(m.debt||0)+1;S.menSec=S.menSec||{};S.menSec[m.id]={r:y.r,v:y.v||null,k:y.k,w:wk(),hid:1}}return true}

/* the player's choice */
function menEyes(k,c){return liveRivals(true).filter(w=>w!==c&&whereOf(w)===k).reduce((s,w)=>s+1+(w.mat||0)/2,0)}
function menChoose(m,v,y,a){const at=placeName(y.k);menStat("ch_"+a);if(a==="nghe"&&!v&&y.hv!=null){const hv=RV(y.hv);if(hv&&hv.alive&&!hv.out){v=hv;y=Object.assign({},y,{v:hv.id,hv:null})}}
 if(a==="bao"){menKh(1);try{k61Know(m,"Thị vệ tra hỏi, khai tên hắn.",true,2)}catch(e){}menReport(S,m,v,y,0);return}
 if(a==="ccti"){menKh(2);try{k61Know(m,"Cung Chính ti ghi tên hắn.",true,2)}catch(e){}menReport(S,m,v,y,1);return}
 if(a==="lo"){if(m.trait==="trung hậu"||m.trait==="cẩn trọng")m.af=(m.af||0)+3;log(`Ngươi làm như không thấy ${menNmFull(m)} ở ${at}, quay bước đi nơi khác.`);delete (S.menWhy||{})[m.id];return}
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
  if(v){oanAdd(v,S,BAL.eff.jmen.menChoose);affAdd(v,S,BAL.eff.jmen.menChoose_2)}log(`<span class="r">Ngươi giẫm phải cành khô; ${menNmFull(m)}${v?" và "+menVT(v):""} giật mình tản đi. ${v?"Nàng đã thấy ngươi nghe lén.":"Hắn đã thấy mặt ngươi."}</span>`);delete (S.menWhy||{})[m.id];return}}

/* ---------- 5. NPC consorts see the same strays and choose by their nature ---------- */
/* NPC choice by nature and feeling, no dice: same rules for every consort */
function menDecide(w,c){const tr=w.trait||"";const h=c?hostility(w,c):0;
 if(c){if(tr==="Hiểm độc"||tr==="Kiêu ngạo"||h>45)return"report";if(tr==="Tham vọng")return"hide";if(tr==="Đa nghi")return"listen";if(tr==="Hiền lành"||tr==="Nhu mì")return h>25?"hide":"ignore";return h>30?"report":"ignore"}
 if(tr==="Kiêu ngạo"||tr==="Đa nghi")return"report";if(tr==="Tham vọng")return"hide";return"ignore"}
function menNpcAct(w,m,c,y){const d=menDecide(w,c);menStat("npc_"+d);
 if(d==="report"){menReport(w,m,c,y,(w.tamco||0)>=50?1:0);return d}
 if(d==="hide"){menHide(w,m,c,y,menEyes(y.k,c));if(c===S||menEye(S)>=(y.hide||0)+25){try{intelAdd(w,{k:"menhide:"+m.id,kind:"secret",txt:`${rkName(w)} ${w.name} đã che giấu ${m.name} lẻn vào ${placeName(y.k)}${c&&c!==S?` cùng ${rkName(c)} ${c.name}`:""}.`},{by:"tai mắt",how:"tai mắt"})}catch(e){}}return d}
 if(d==="listen"&&c&&c!==w){if(menEye(w)>=(y.hide||0)+10)evA(w,c,1);return d}
 return d}
/* a consort standing at that place in that buổi sees it; she understands it iff her eyes reach how well it is hidden */
function menNpcSee(m,y){if(!m||!y)return;const c=y.v!=null?RV(y.v):null;for(const w of liveRivals(true)){if(w===c||whereOf(w)!==y.k||menEye(w)<(y.hide||0))continue;menStat("npcSee");const d=menNpcAct(w,m,c,y);if(d==="report")break}}
/* she is the one caught: a private word with a man in the hậu cung while another consort is there */
(function(){const t0=talk;talk=function(oi){let p=null,a=null;try{p=S&&curPeople()[popIdx];a=p&&p.kind==="man"&&talkOpts(p)[oi]}catch(e){}const before=S&&S.logSeq;const r=t0.apply(this,arguments);
 try{if(a&&menRoad()&&!S.dead&&S.logSeq!==before&&!/^Chào hỏi/.test(a.n)&&menZone(S.place)==="hc"){const m=p.ref;const y={k:S.place,r:m.tinh>=50||m.trysts?"meet":"talk"};
  for(const w of liveRivals(true)){if(whereOf(w)!==S.place||menEye(w)<20)continue;menStat("seenMe");const d=menDecide(w,S);
   if(d==="report"){if(y.r==="talk"){ap(w,{danh:2});apply({danh:-4});oanAdd(S,w,BAL.eff.jmen.top);log(`<span class="r">${rkName(w)} ${w.name} thấy ngươi nói chuyện riêng với ${m.name} ở ${placeName(S.place)} và đem chuyện đi rêu rao: Danh -4.</span>`)}else menReport(w,m,S,y,0);break}
   if(d==="hide"||d==="listen"){evA(w,S,d==="hide"?2:1);break}}}}catch(e){console.error("men talk",e)}return r}})();

/* ---------- 6. the secret is leverage: "Uy hiếp hắn" on his card; grudges come back as rumours ---------- */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&p.kind==="man"&&p.ref&&menRoad()){const m=p.ref;const s=(S.menSec||{})[m.id];
  if(s&&!s.used){const o=od(45+(S.tamco||0)/3+(s.hid?10:0)-(m.trait==="cẩn trọng"?10:0));
   A.push({n:"Uy hiếp hắn",o,x:`hắn nộp bạc hay khai tin để giữ kín chuyện ${MEN_RT[s.r]||"cũ"} · hỏng: hắn ôm hận`,run:()=>{s.used=1;menStat("threat");
    if(roll(o)){const T=liveRivals(true).filter(v=>v.affair||(v.preg&&v.hidden)||(v.plan));if(T.length){const v=T.slice().sort((a,b)=>menH(a.id)-menH(b.id))[0];const F=j78facts(v).filter(f=>f.kind==="secret"||f.kind==="plan");const f=F[0];
      if(f){intelAdd(v,f,{by:m.name,how:"uy hiếp "+m.name});return `Hắn run sợ, khai: ${f.txt}`}}
     apply({bac:40});m.af=(m.af||0)-10;return "Hắn run sợ, nộp 40 lạng bạc xin ngươi giữ kín. Bạc +40."}
    m.grudge="me";m.grudgeN=2;m.af=(m.af||0)-20;return "Hắn cứng cổ không chịu, từ nay ôm hận ngươi."}})}}}catch(e){console.error("men opts",e)}return A}})();
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(menRoad()){for(const m of (S.men||[])){if(!m.alive||m.grudge!=="me"||menBanned(m)||!(m.grudgeN>0)||(S.turn+menH(m.id))%3)continue;
  m.grudgeN--;menStat("revenge");apply({danh:-3});ev+=`<span class="r">Trong cung rộ lời đồn ác ý về ngươi; nghe nói phát ra từ đám ${m.rw==="thị vệ"?"thị vệ":"người ngoài cung"} từng bị ngươi làm khó. Danh -3.</span> `}}}catch(e){}return ev}})();

/* stage names: unknown men show "???" like unknown consorts (j61 masks the cards); the role is the tag title */
function menStageNm(m){try{return k61Named(m)?m.name.replace(/^(Thị vệ|Thái y|Vương gia|Nhạc sư|Sứ thần|Họa sư)\s+/,""):"???"}catch(e){return m.name}}
