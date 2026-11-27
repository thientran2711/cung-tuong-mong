/* j95 roster audit: real bot play (dev/measure harness inpage5 + inbal), every origin incl. cung nữ, 2 game years per life.
   Checks at every khắc (each spend, walk, new buổi):
   (a) people in the record == people alive in the palace (counted independently here)
   (b) one place each (no duplicate person, no empty place, no servant listed under two mistresses)
   (c) map count (countAt), S.where / whereOf, S.menW, the stage (S.visit.people), tai mắt "where" reports == record
   (d) every NPC act aimed at someone passed the motive gate with a reason; no harm at affection >= 40 without a recorded exception
   (e) the dead / those who left are gone from the record, fallen consorts are in lãnh cung
   (f) save -> load keeps the record identical (every 6 buổi)
   (g) every event card with a real actor (j68, j7, stock / story / quest cards, j24 visits) carries a gate reason for each actor in the record;
       no hostile actor toward her at affection >= 40 without a recorded exception; no card with a consort in its params left undeclared
   (h) words that put someone somewhere now (event cards, news) match the record at that khắc (or the record says why not: lãnh cung, cấm túc, hẹn kín)
   (i) rumour misunderstandings: each one recorded as "tin đồn: …, nguồn: …"; she is told only as hearsay ("Nghe đồn" / "Lời đồn"); retaliation carries the rumour reason
   usage: node dev/test/roster_audit.js <sens|rand> <lives> <out.json> [shard]     (GAME=path to dev/index.html, NB=4 only for a 3-buổi build, BOT=inpage6.js default)
   (j)..(q): j95c invariants, dev/test/roster_audit_c.js  */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const mode=process.argv[2]||'sens',LIVES=+process.argv[3]||18,OUT=process.argv[4]||'/dev/stdout',SH=+process.argv[5]||0;
const M=path.join(__dirname,'..','measure'),GAME=process.env.GAME||path.join(__dirname,'..','index.html');
const NB=+process.env.NB||3;
const PRE=`(function(){if(${NB}===4&&BUOI.length===3){BUOI.splice(1,0,"Buổi trưa");const n0=nextBuoi;nextBuoi=function(){if(!S||S.dead||Q.length||S.mg)return n0.apply(this,arguments);
  if((S.buoi||0)===2){S.buoi=3;used=0;const ev=rivalsBuoi();if(S.dead){render();return}placeWhere();popIdx=null;popMsg="";if(S.out)coldVisit();else if(S.place!=="home"){const k=S.place;S.place="home";const u=used;goTo(k);used=u}else S.visit={k:"home",people:homePeople(),talked:false,tk:{}};if(ev)Q.push({t:"Tin trong cung",h:'<p>'+ev+'</p>'});try{if(typeof j95sync==="function")j95sync()}catch(e){}render();return}
  if((S.buoi||0)===3)S.buoi=2;return n0.apply(this,arguments)}}})();(function(){const O=['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'];window.__audOi=${SH};const s0=start;start=function(){window.__forceOrigin=O[(window.__audOi++)%O.length];return s0.apply(this,arguments)}})();`;
const HOOK=`(function(){const A=window.__aud={checks:0,lives:0,khac:0,err:{a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0},ex:{a:[],b:[],c:[],d:[],e:[],f:[],g:[],h:[],i:[]},evN:0,evActors:0,evHostile:0,placeChk:0,placeSkip:0,rumChk:0,apChk:0,gate:0,gatePass:0,acts:0,orig:{},buoi:0,saves:0};
 const bad=(k,m)=>{A.err[k]++;if(A.ex[k].length<12)A.ex[k].push((S&&S.origin?S.origin.k:"")+" T"+(S?S.turn:"")+" "+m)};
 function expected(){/* independent count of everyone alive in the palace now */const ids=new Set(["emp","me"]);if(!S.thDead)ids.add("th");
  for(const v of rivals)if(v.alive)ids.add("v"+v.id);
  for(const p of [S].concat(rivals)){if(p!==S&&!p.alive)continue;const pk=p===S?"me":p.id;if(p.maid&&p.maid.name&&!(p===S&&typeof isSrv==="function"&&isSrv()))ids.add("mm:"+pk);for(const s of p.staff||[])if(s&&s.sid!=null)ids.add("s"+s.sid)}
  for(const c in (S.court||{}))if(S.court[c]&&S.court[c].name)ids.add("c:"+c);/* npc-death-wire: Phế phi họ Lý lives in Trường Môn viện while alive */if(S.lyF&&!S.lyF.dead&&!S.lyF.freed)ids.add("c:ly");if(typeof plxPeople==="function"){ids.add("c:tgk");ids.add("c:ttp")}/* jplx place fixtures */
  try{for(const x of (S.thO&&S.thO.staff)||[])if(x&&x.sid!=null)ids.add("s"+x.sid)}catch(e){}
  const jm=typeof menSchedRoad==="function"?menSchedRoad():typeof menRoad==="function"&&menRoad();/* people ledger: the fixed men's schedule on both roads */for(const m of S.men||[]){if(!m.alive)continue;if(jm?((S.menWhy||{})[m.id]&&!(typeof menBanned==="function"&&menBanned(m))):(m.rw==="thái y"||m.rw==="thị vệ"||(S.menW&&S.menW[m.id])))ids.add(m.id)}
  if(jm)try{const H=trS().H||{};for(const c in (S.minW||{}))if(H[c])ids.add("q:"+c)}catch(e){}
  for(const [k,mo] of allKids())if(k&&k.alive)ids.add("k:"+(mo?mo.id:"me")+":"+(mo?mo.kids:S.kids).indexOf(k));return ids}
 function check(where){if(!S||S.dead||window.__j95off)return;const R=S.roster;if(!R||R.key!==j95key())return;const kh=j95kh();A.checks++;
  const ids=Object.keys(R.P);const ex=expected();
  /* (a) */for(const id of ex)if(!R.P[id])bad("a",where+" thiếu "+id);for(const id of ids)if(!ex.has(id)&&!/^m\\d/.test(id))bad("a",where+" thừa "+id);
  for(const id of ids)if(/^m\\d/.test(id)&&!ex.has(id)){const m=manById(id);if(!m)bad("a",where+" nam nhân không còn: "+id)}
  /* (b) */const sids={};for(const p of [S].concat(rivals)){if(p!==S&&!p.alive)continue;for(const s of p.staff||[]){if(sids[s.sid])bad("b","kẻ hầu ở hai cung: "+s.name);sids[s.sid]=1}}
  for(const id of ids){const e=R.P[id];if(!e||e.length!==4||!e[kh]||!e[kh][0])bad("b",where+" không có nơi: "+id)}
  /* (c) map counts the people she would meet there on arrival (j95vis at j95arrKh, port 16/11) */const C={};for(const id of ids)for(const k of new Set(R.P[id].map(e=>e[0]))){if(k&&R.P[id][j95arrKh(k)][0]===k&&j95vis(id,k))C[k]=(C[k]||0)+1}
  if(!(typeof isSrv==="function"&&isSrv()))/* the maid road counts by its own rules (j59srvCount, test stage-counts.js) */for(const k of new Set(Object.keys(C).concat(["vuon","thu","dtd","tn","kn","tyv","ksp","lc","home","cnh","tgk","ttp","acs","dc"])))if(countAt(k)!==(C[k]||0)){/* KNOWN main bug (jstaff, reported to session 8): the Đức Thọ cung elder is drawn at Tân Giả khố too */if(k==="tgk"&&countAt(k)===(C[k]||0)+1&&typeof elderBy==="function"&&elderBy("tn")){A.known=(A.known||0)+1;continue}bad("c",where+" đếm "+k+": bản đồ "+countAt(k)+" sổ "+(C[k]||0)+" ids="+ids.filter(id=>R.P[id][j95arrKh(k)][0]===k).join(",")+" arr="+j95arrKh(k)+((k==="cnh"||k==="tgk")&&typeof plxPeople==="function"?" plx="+plxPeople(k).map(q=>q.kind+":"+(q.sid!=null?"s"+q.sid+"@"+JSON.stringify(R.P["s"+q.sid]&&R.P["s"+q.sid][j95arrKh(k)])+"px="+(J95.px||{})["s"+q.sid]:q.name)).join(";"):"")+(k===S.place&&S.visit?" stage="+S.visit.people.map(p=>p.kind+":"+(p.ref?(p.ref.id!=null?p.ref.id:p.ref.c!=null?p.ref.c:""):"")).join(","):"")+(k==="home"?" hp="+homePeople().map(p=>p.kind).join(",")+" mm@"+JSON.stringify(R.P["mm:me"]&&R.P["mm:me"][kh])+" out="+S.out+" srv="+isSrv()+" rank="+S.rank:""))}
  for(const v of rivals){if(!v.alive)continue;const e=R.P["v"+v.id];if(e&&whereOf(v)!==e[kh][0])bad("c",where+" whereOf "+v.name)}
  for(const m of S.men||[]){const e=R.P[m.id];const w=(S.menW||{})[m.id];if(e&&w!==(e[kh][0]==="ngoai"?undefined:e[kh][0]))bad("c",where+" menW "+m.id)}
  const SRV=typeof isSrv==="function"&&isSrv(),LK=typeof j95lk==="function"?j95lk:(x=>x);/* people ledger: the maid road follows the same rule (her room = her mistress's palace) */
  if(S.visit&&S.visit.k===S.place&&S.visit.people&&(S.place!=="home"||SRV)){for(const id of ids){const w0=R.P[id][kh][0];if(LK(w0)!==LK(S.place)||!j95vis(id,w0))continue;let on=false;const P=S.visit.people;
    /* the record's own mapping of a stage entry (j95ledId: consort maids mm:*, court posts c:*, the maid road's srv entries) */if(typeof j95ledId==="function"&&P.some(p=>j95ledId(p)===id))continue;
    if(id[0]==="v")on=P.some(p=>p.ref&&p.ref.id===+id.slice(1)&&p.ref.rel!=null);else if(id==="emp")on=P.some(p=>p.kind==="emp");else if(id==="th")on=P.some(p=>p.kind==="th");else if(id==="c:ty")on=P.some(p=>p.kind==="ty");else if(id==="c:ksp")on=P.some(p=>p.kind==="ksp");
    else if(id==="c:ped")on=P.some(p=>p.kind==="peddler");/* r2: jact draws the Nội vụ phủ eunuch as kind peddler */else if(id[0]==="s")on=P.some(p=>(p.kind==="elder"&&p.ref&&"s"+p.ref.sid===id)||((p.kind==="npc"||p.kind==="serv")&&p.sid!=null&&"s"+p.sid===id));/* jplx draws servants as npc entries with their sid; jhouse her household as serv (r2) *//* jplx draws servants as npc entries with their sid */else if(id==="c:tgk"||id==="c:ttp")on=P.some(p=>p.kind==="npc"&&p.sid==null&&(id==="c:tgk"?/Tân Giả khố/:/Thượng thư phòng/).test(p.name||""));else if(id.indexOf("q:")===0)on=P.some(p=>p.kind==="min"&&p.ref&&"q:"+p.ref.c===id);else on=P.some(p=>p.kind==="man"&&p.ref&&p.ref.id===id);if(!on)bad("c",where+" sổ có "+id+" ở "+S.place+" mà sân khấu không vẽ")}}
  if(S.visit&&S.visit.k===S.place&&S.visit.people){for(const p of S.visit.people){if((p.kind==="rival"||p.kind==="hh")&&p.ref){const e=R.P["v"+p.ref.id];if(e&&e[kh][0]!==S.place)bad("c",where+" sân khấu có "+p.ref.name+" mà sổ ở "+e[kh][0])}if(p.kind==="emp"&&R.P.emp[kh][0]!==S.place)bad("c",where+" sân khấu có Hoàng thượng mà sổ ở "+R.P.emp[kh][0]);/* r2: the other kinds the record knows (men, named elders, her household, the Nội vụ phủ eunuch) */if(!(typeof isSrv==="function"&&isSrv())){const rid=p.kind==="man"&&p.ref?p.ref.id:p.kind==="elder"&&p.ref&&p.ref.sid!=null?"s"+p.ref.sid:p.kind==="serv"&&p.sid!=null?"s"+p.sid:p.kind==="peddler"?"c:ped":null;if(rid){const e=R.P[rid];if(!e||e[kh][0]!==S.place)bad("c",where+" sân khấu có "+rid+" ("+p.kind+") mà sổ ở "+(e?e[kh][0]:"không có"))}}}
   if(typeof isSrv==="function"&&isSrv()){/* maid road (j42 srvVisitOf, main rule): at most 4 consorts drawn; every drawn one is there in the record, and the number drawn = min(4, record) */
    const mk=srvM()?palaceOf(srvM()):null;const L=liveRivals(true).filter(v=>{const e=R.P["v"+v.id];return e&&(e[kh][0]===S.place||(S.place==="home"&&(e[kh][0]==="home"||e[kh][0]===mk)))&&S.place!=="lc"});const D=S.visit.people.filter(p=>p.ref&&p.ref.rel!=null&&p.ref!==S&&(p.kind==="rival"||p.kind==="hh"||(p.kind==="srv"&&(p.sk==="rv"||p.sk==="hh"||p.sk==="mis"))));
    for(const p of D)if(!L.includes(p.ref))bad("c",where+" sân khấu (đường cung nữ) có "+p.ref.name+" mà sổ không ở "+S.place);A.srvCap=(A.srvCap||0)+(L.length>4?1:0)}
   else for(const v of liveRivals(true)){const e=R.P["v"+v.id];if(e&&e[kh][0]===S.place&&!(S.place==="home"&&sameHouse(S,v))&&S.place!=="lc"&&!S.visit.people.some(p=>p.ref===v))bad("c",where+" sổ có "+v.name+" ở "+S.place+" mà sân khấu không có")}}
  /* (e) */for(const v of rivals){const e=R.P["v"+v.id];if(!v.alive&&e)bad("e","người chết còn trong sổ: "+v.name);if(v.alive&&v.out&&e&&e[kh][0]!=="lc")bad("e","phế phi không ở lãnh cung: "+v.name+" sổ="+JSON.stringify(e)+" out="+v.out+" kh="+kh+" key="+R.key)}
  for(const m of S.men||[])if(!m.alive&&R.P[m.id])bad("e","nam nhân chết còn trong sổ "+m.id)}
 window.__audCheck=check;
 const wrap=(n,f)=>{const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{f.apply(this,arguments)}catch(e){bad("c","lỗi kiểm "+n+": "+e.message)}return r}};
 /* nextBuoi/goTo are wrapped by the harness: wrap the game functions by name (global bindings) */
 {const o=spend;spend=function(){const r=o.apply(this,arguments);try{A.khac++;check("spend")}catch(e){bad("c","lỗi kiểm: "+e.message)}return r}}
 {const o=goTo;goTo=function(){const r=o.apply(this,arguments);try{check("goTo")}catch(e){bad("c","lỗi kiểm: "+e.message)}return r}}
 {const o=nextBuoi;nextBuoi=function(){const r=o.apply(this,arguments);try{A.buoi++;check("buổi");
   if(A.buoi%6===0&&S&&!S.dead&&!Q.length&&!S.mg){const before=JSON.stringify([S.roster,S.rlog,S.j95]);const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;const after=JSON.stringify([S.roster,S.rlog,S.j95]);A.saves++;if(before!==after){let i=0;while(i<before.length&&before[i]===after[i])i++;bad("f","save/load đổi sổ ở "+j95key()+" @"+i+": "+before.slice(Math.max(0,i-80),i+60)+" ≠ "+after.slice(Math.max(0,i-80),i+60))}}}catch(e){bad("f","lỗi save/load: "+e.message)}return r}}
 /* (d) the gate: every hostile NPC act at affection >= 40 must carry a recorded exception */
 {const o=runAct;runAct=function(a,t,k){const hostile=a&&a!==S&&t&&H95.has(k);let af=0;if(hostile){A.acts++;af=aff(a,t)}const n0=S&&S.roster&&S.roster.acts?S.roster.acts.length:0;const r=o.apply(this,arguments);
   try{if(hostile){const L=(S.roster&&S.roster.acts)||[];const rec=L.slice(Math.max(0,L.length>=60?L.length-8:n0)).reverse().find(x=>!x.src&&x.id===j95id(a)&&x.k===k)||null;if(!rec||rec.k!==k)bad("d","hành động không qua cổng: "+a.name+" "+k);
    else if(rec.ok){A.gatePass++;if(af>=40&&!(rec.ex&&/khống chế|lệnh chủ phe|tin đồn/.test(rec.why)))bad("d",a.name+" "+k+" "+(t===S?"ngươi":t.name)+" khi thiện cảm "+af+" mà không có lý do ngoại lệ (ghi: "+rec.why+")");
     const rr=t===S&&a.j95rum&&a.j95rum[key(S)];if(rr&&wk()-rr.w<=J95B.RUMW){A.rumChk++;if(!/tin đồn:/.test(rec.why)||!/nguồn:/.test(rec.why))bad("i","trả đũa vì tin đồn mà lý do không ghi tin đồn/nguồn: "+a.name+" "+k+" ("+rec.why+")")}}else A.gate++}}catch(e){}return r}}
 /* tai mắt 'where' reports must match the record at the moment they are made */
 {const o=intelAdd;intelAdd=function(v,f){try{if(f&&f.kind==="where"&&S.roster&&S.roster.P["v"+v.id]){const k=S.roster.P["v"+v.id][j95kh()][0];if(!String(f.txt).includes(placeName(k)))bad("c","tai mắt báo sai nơi: "+f.txt+" / sổ "+placeName(k))}}catch(e){}return o.apply(this,arguments)}}
 /* 2 game years per life, then a new life (next origin) */
 const st0=window.__bot.step;window.__bot.step=function(m,n){for(let i=0;i<n;i++){st0(m,1);try{if(S&&!S.dead&&S.turn>=24&&!Q.length){A.lives++;A.orig[S.origin.k]=(A.orig[S.origin.k]||0)+1;window.__res.push({origin:S.origin.k,title:"2 năm",turns:S.turn});start()}
   else if(S&&S.dead&&!window.__deadSeen){window.__deadSeen=1;A.lives++;A.orig[S.origin.k]=(A.orig[S.origin.k]||0)+1}if(S&&!S.dead)window.__deadSeen=0}catch(e){}}return window.__res.length}})();`;

const HOOK2=`(function(){const A=window.__aud;const bad=(k,m)=>{A.err[k]++;if(A.ex[k].length<12)A.ex[k].push((S&&S.origin?S.origin.k:"")+" T"+(S?S.turn:"")+" "+m)};
 const KEYS=["v","a","b","f","r","t","a0","a1","a2","a3"];
 const PL=()=>{const L=[["vuon",/ngự hoa viên|hòn non bộ/i],["thu",/cần chính điện/i],["dtd",/dưỡng hòa điện/i],["tn",/đức thọ cung/i],["kn",/càn ninh cung/i],["tyv",/thái y viện/i],["ksp",/kính sự phòng/i],["lc",/trường môn viện|lãnh cung/i]];return L};
 /* a place named as the one being LEFT ("được tha khỏi lãnh cung", "rời ngự hoa viên") puts nobody there */
 const AT=(s,re)=>{const g=new RegExp(re.source,"gi");let m;while((m=g.exec(s))){if(!/(khỏi|rời|dời từ|từ)\\s*$/i.test(s.slice(Math.max(0,m.index-10),m.index)))return true}return false};
 const HEAR=/đồn|rỉ tai|nghe nói|bóng gió|\\bhay |thường|từng |hôm nọ|hôm qua|đêm qua|năm xưa|trước đây|\\bsẽ |ngày mai|tối mai|đêm nay|tối nay|\\bsắp |\\bmuốn |(?:^|\\s)định |\\bnếu |\\(sai |sai người|\\bhứa|mơ thấy|vọng sang|có thể|nghi |\\bmời .* ra |ngày rằm/i;
 const OWNER=/(của|bên|cung|con của|tặng|cho|về|nhắm vào|hại|vu|bắt|thăm|giúp|tố|với)\\s*$/i;
 function strip(h){return String(h||"").replace(/<br\\s*\\/?>/gi,". ").replace(/<\\/p>/gi,". ").replace(/<[^>]+>/g," ").replace(/\\s+/g," ")}
 function checkCard(m,where){if(!m||m.__aud95)return;m.__aud95=1;try{j95bPresent(m)}catch(e){bad("g","lỗi trình bày: "+e.message)}
  const ent=J95B.ev.slice().reverse().find(e=>e.key===j95key());const pid=m.pid,pp=m.pp||{};
  /* (g) actors */
  if(pid){const isT=pid.indexOf("e68")===0?!!E95B[pid.slice(3)]:!!P95B[pid];const hasRv=KEYS.some(k=>pp[k]!=null&&typeof pp[k]==="number"&&RV(pp[k]))||(pid==="q72o"&&pp.x&&(pp.x.rk==="rv"||pp.x.rk==="hh"));
   if(pid.indexOf("e68")===0){const s=E68I[pid.slice(3)];if(s&&(s.a||[]).length&&!isT)bad("g","mẫu j68 chưa khai vai: "+pid)}
   else if(hasRv&&!isT)bad("g","thẻ có phi tần trong tham số mà chưa qua cổng: "+pid+" "+JSON.stringify(pp).slice(0,80));
   if(isT){A.evN++;const e=J95B.ev.slice().reverse().find(x=>x.src===pid);if(!e){bad("g","thẻ không có bản ghi lý do: "+pid);return}
    let need=0;if(pid.indexOf("e68")===0){const s=E68I[pid.slice(3)];(s.a||[]).forEach((k,i)=>{if(A6(k,pp["a"+i]))need++})}else{for(const k in (P95B[pid].p||{}))if(pp[k]!=null&&(P95B[pid].p[k].key?byKey(pp[k]):RV(pp[k])))need++;if(pid==="q72o"&&pp.x){if(pp.x.rk==="rv"||pp.x.rk==="hh")need++;if((pp.x.bk==="rv"||pp.x.bk==="hh")&&pp.x.bi!=null)need++}}
    if(e.actors.length<need)bad("g","thẻ "+pid+" có "+need+" diễn viên mà chỉ "+e.actors.length+" lý do");
    for(const x of e.actors){A.evActors++;if(!x.ok||!x.why)bad("g","diễn viên không qua cổng: "+pid+" "+x.id+" "+x.k+" ("+x.why+")");
     const L=S.roster&&S.roster.acts||[];if(!L.some(r=>r.src===pid&&r.id===x.id&&r.k===x.k))bad("g","lý do không có trong sổ: "+pid+" "+x.id);
     if(x.role==="h"&&x.t==="me"){A.evHostile++;const v=String(x.id)[0]==="v"?RV(+String(x.id).slice(1)):null;const af=v?aff(v,S):0;if(af>=40&&!x.ex)bad("g","người thiện cảm "+af+" hại ngươi không lý do: "+pid+" "+(v&&v.name))}}}}
  /* (i) hearsay label */
  if(m.rum95&&!(/Nghe đồn/.test(m.h)&&/Lời đồn/.test(m.h)))bad("i","tin đồn báo cho ngươi như sự thật: "+strip(m.h).slice(0,80));
  if(!m.rum95&&!m.pid){/* j68 template cards report an NPC's accusation (her act), not the claim as fact */const txt=strip(m.h||m.t);for(const r of (S.j95b&&S.j95b.rum)||[]){if(r.cleared)continue;if(txt.includes("rằng ngươi "+r.txt)&&!/đồn/i.test(txt))bad("i","lời đồn bị nói như sự thật: "+txt.slice(0,80))}}
  /* (h) places in words */
  const R=S.roster;if(!R||R.key!==j95key())return;const kh=ent&&ent.key===j95key()?ent.kh:j95kh();
  if(ent)for(const p of ent.places){if(p.res!=="ok"){A.placeSkip++;continue}A.placeChk++;const rid=p.id;const e=R.P[rid];let k=p.k;if(k==="here")k=S.place;if(k==="own"){const v=rid[0]==="v"?RV(+rid.slice(1)):null;k=v?(v.out?"lc":palaceOf(v)):rid==="th"?"tn":"dtd"}
   /* (h) says "or the record says why not": the same card can confine / banish the person it placed (record reason cấm túc / lãnh cung) (r2) */if(e&&e[kh]&&(e[kh][1]==="confined"||e[kh][1]==="cold")&&e[kh][0]!==k){A.placeWhy=(A.placeWhy||0)+1;continue}
   if(!e||e[kh][0]!==k)bad("h","câu chữ đặt "+rid+" ở "+k+" mà sổ ghi "+(e?e[kh][0]:"không có")+" ("+pid+") ent="+ent.key+"/"+ent.kh+" now="+j95key()+"/"+kh+" rec="+JSON.stringify(e&&e[kh]));if(rid[0]==="v"&&kh===j95kh()){const v=RV(+rid.slice(1));if(v&&v.alive&&whereOf(v)!==k)bad("h","whereOf lệch sau khi dời: "+v.name);if(j95arrKh(k)===kh&&j95vis(rid,k)&&countAt(k)<1)bad("h","bản đồ không đếm người được dời tới "+k)/* port 16/11: the map counts at the arrival khắc and only people drawn there */}}
  if(pid&&(pid.indexOf("e68")===0||P95B[pid]))return;
  const txt=strip(m.h||"");const sents=txt.split(/(?<=[.!?…][)"”']?)\\s+|\\s*;\\s*/);const RVL=rivals.filter(v=>v.alive).sort((a,b)=>b.name.length-a.name.length);
  for(const s0 of sents){const s=s0.trim().replace(/sổ (sách )?kính sự phòng/gi,"sổ").replace(/quản sự ma ma càn ninh cung|chưởng sự cô cô đức thọ cung|giáo tập ma ma trữ tú cung/gi," ").replace(/(ma ma|cô cô)\\s+((ở|bên|của)\\s+)?(đức thọ cung|càn ninh cung|trữ tú cung)/gi,"$1");/* jstaff titles name an office, not a place now */if(!s||HEAR.test(s))continue;for(const [code,re] of PL()){if(!AT(s,re))continue;
    const taken=[];for(const v of RVL){const i=s.indexOf(v.name);if(i<0||taken.some(t=>i>=t[0]&&i<t[1]))continue;taken.push([i,i+v.name.length]);if(OWNER.test(s.slice(Math.max(0,i-18),i)))continue;
     const e=R.P["v"+v.id];const pl=ent&&ent.places.find(p=>p.id==="v"+v.id);if(pl&&pl.res!=="ok"){A.placeSkip++;continue}A.placeChk++;
     if(!e||e[kh][0]!==code){/* another place word in the same sentence may be the one meant */const alt=PL().some(([c2,r2])=>c2!==code&&r2.test(s)&&e&&e[kh][0]===c2);
      /* or it happened in the buổi just ended (an act at the turn of the week): the logged record must show it */
      const pb=J95B.bind.slice().reverse().find(b=>b.past&&b.id==="v"+v.id&&b.k===code&&wk()-b.wk<=1&&wk()>=b.wk);let pok=false;if(pb){const tb=j95table(pb.wk,pb.b,pb.kh);const row=tb&&tb.rows&&tb.rows.find(x=>x.id==="v"+v.id);pok=!!(row&&row.place===code);A.placePast=(A.placePast||0)+1;if(!pok)bad("h","việc đã qua không có trong sổ đã ghi: "+v.name+" "+code+" "+pb.key+"/"+pb.kh+" bind="+JSON.stringify(pb).slice(0,160)+" row="+JSON.stringify(row||tb&&tb.error))}
      if(!alt&&!pb)bad("h","câu chữ: "+s.slice(0,70)+" | sổ: "+v.name+" ở "+(e?e[kh][0]:"—"))}}
    break}}}
 window.__audCard=checkCard;
 {const o=chooseM;chooseM=function(){try{if(Q.length&&!S.dead)checkCard(Q[0],"choose")}catch(e){bad("g","lỗi kiểm thẻ: "+e.message)}return o.apply(this,arguments)}}
 {const o=closeModal;closeModal=function(){try{if(Q.length&&!S.dead)checkCard(Q[0],"close")}catch(e){bad("g","lỗi kiểm thẻ: "+e.message)}return o.apply(this,arguments)}}
 /* (g) j24 visits: the visitor named in the card passed the gate in this call */
 {const o=approachOne;approachOne=function(){const L=S&&S.roster&&S.roster.acts;const n0=L?L.length:0;const m=o.apply(this,arguments);try{if(m&&!m.pid&&L&&S.roster&&S.roster.acts===L){const txt=String(m.h||"");const v=liveRivals(true).find(x=>txt.includes(x.name));
    if(v){A.apChk++;const nw=L.slice(Math.max(0,n0-(L.length>=60?1:0)));if(!nw.some(r=>r.id==="v"+v.id&&r.ok))bad("g","người tìm đến không qua cổng: "+v.name)}}}catch(e){}return m}}
 /* (i) every misunderstanding is written with its rumour and source */
 {const o=j95bSeed;j95bSeed=function(){const r=o.apply(this,arguments);try{if(r){A.rumChk++;const L=(S.roster&&S.roster.acts)||[];const e=L.slice().reverse().find(x=>x.k==="misbelief"&&x.id==="v"+r.y);if(S.roster&&(!e||!/tin đồn:/.test(e.why)||!/nguồn:/.test(e.why)))bad("i","hiểu lầm không ghi tin đồn/nguồn: "+r.y)}}catch(e){}return r}}
})();`;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const ctx=await b.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();await require('./lib/veil').guard(page);
 await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(PRE);await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__servPolicy='';window.__aff=0;window.__balO=null;window.__fairO=null;window.__q72O=null;window.__xO=null;window.__q72off=1`);
 for(const f of [process.env.BOT||'inpage6.js','inbal.js'])await page.evaluate(fs.readFileSync(path.join(M,f),'utf8'));
 await page.evaluate(HOOK);await page.evaluate(HOOK2);await page.evaluate(fs.readFileSync(path.join(__dirname,'roster_audit_c.js'),'utf8'));await page.evaluate(()=>window.__AUDC());await page.evaluate(()=>{J95.stat={gate:0,gateBy:{},pass:0,bad:[]};start()});
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>{window.__bot.step(m,200);return window.__aud.lives},[mode]);if(n>=LIVES)break;if(Date.now()-t0>(+process.env.CAP||3000)*1e3){console.log('time cap');break}}
 const out=await page.evaluate(()=>Object.assign({},window.__aud,{gateStat:J95.stat,j95errs:J95.errs,j95b:J95B.stat,j95berrs:J95B.errs,j95c:window.__j95c?window.__j95c():null,res:window.__res.slice(-80).map(r=>({o:r.origin,t:r.title,turns:r.turns}))}));out.pageErrors=errs.slice(0,20);out.pageErrorN=errs.length;out.mode=mode;out.nb=NB;
 fs.writeFileSync(OUT,JSON.stringify(out,null,1));console.log(mode,'nb',NB,'lives',out.lives,'checks',out.checks,'err',JSON.stringify(out.err),'gate',out.gate,'pass',out.gatePass,'pageErr',errs.length,'knownTgkElder',out.known||0);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
