/* ROSTER INDEPENDENT AUDIT — in-page checker (written by the independent reviewer; shares no code with dev/test/roster_*.js).
   window.__IA.check(where) runs every invariant below against S.roster at the current khắc and the live game state,
   counting violations by category with up to 15 examples each.
   A  headcount: people alive in the palace (counted here from rivals / staff / maids / court / men / kids) == record rows
   B  each row: 4 khắc, a place every khắc, a known place code; a palace code rN must belong to a living head of house
   C  views: S.where, whereOf, countAt (every code), S.menW, the player's own row == S.place
   D  servants: "theo hầu" sits where the person followed is; "phận sự trong cung" sits at the owner's home
   E  housing rules (jpal): HH alone in Càn Ninh, HQP alone, Tần+ heads of house, <=3 residents, lower ranks under a 3..5 head
   F  a row whose reason says "ở cung mình" / own palace sits in her own palace now
   G  dead removed; fallen consorts in lãnh cung; confined consorts at home (unless a secret meeting)
   H  hostile NPC acts (every ACT except ally/gift/tieuhuy) that RAN against a target with affection >= 40 need a reason found
      independently (rumour on file, held by evidence, faction head's order) — and a gate line in the record
   S  ser -> deser (JSON round trip) at random moments, also mid-card and mid-minigame: record and views unchanged, A..G still hold */
(function(){
 const IA=window.__IA={n:0,err:{},ex:{},stat:{acts:0,hostRan:0,hostHigh:0,ungated:{},saves:0,savesMidQ:0,savesMidMg:0,cards:0},lastPlace:{}};
 const bad=(c,m)=>{IA.err[c]=(IA.err[c]||0)+1;const L=IA.ex[c]=IA.ex[c]||[];if(L.length<15)L.push(`${S&&S.origin?S.origin.k:""} T${S?S.turn:""} w${typeof wk==="function"?wk():""} b${S?S.buoi:""} k${typeof used!=="undefined"?used:""}: ${m}`)};
 IA.bad=bad;
 const FRIENDLY=new Set(["ally","gift","tieuhuy"]);
 function peopleNow(){/* my own census of who is alive inside the palace walls */
  const M=new Map();const put=(id,why)=>{if(M.has(id))bad("A",`hai nguồn cùng một mã ${id} (${M.get(id)} / ${why})`);M.set(id,why)};
  put("emp","Hoàng thượng");if(!S.thDead)put("th","Thái hậu");put("me","người chơi");
  for(const v of rivals)if(v.alive)put("v"+v.id,"phi tần "+v.name);
  const owners=[S].concat(rivals.filter(v=>v.alive));
  for(const o of owners){const ok=o===S?"me":o.id;
   if(o.maid&&o.maid.name&&!(o===S&&isSrv()))put("mm:"+ok,"cung nữ thân tín của "+(o===S?"ngươi":o.name));
   for(const s of o.staff||[]){if(!s)continue;if(s.sid==null){bad("A","kẻ hầu không có sid: "+s.name);continue}if(s.alive===false)continue;put("s"+s.sid,"kẻ hầu "+s.name)}}
  for(const c in S.court||{}){const o=S.court[c];if(o&&o.name)put("c:"+c,o.n||c)}
  for(const m of S.men||[]){if(!m.alive)continue;if(m.rw==="thái y"||m.rw==="thị vệ")put(m.id,"nam nhân trực trong cung "+m.name)}
  for(const [k,mo] of allKids()){if(!k||!k.alive)continue;const arr=mo?mo.kids:S.kids;put("k:"+(mo?mo.id:"me")+":"+arr.indexOf(k),"hoàng tự "+k.name)}
  return M}
 function knownPlaces(){/* tgk: Tân Giả khố (j42), where a cung nữ-origin player is sent to wash as punishment: a real place, off the map */const K=new Set(["home","lc","kn","tn","dtd","thu","vuon","tyv","ksp","tgk","ngoai"]);try{for(const x of places())K.add(x.k)}catch(e){}return K}
 function ownerOf(id){if(id.startsWith("mm:")){const k=id.slice(3);return k==="me"?S:RV(+k)}if(id[0]==="s"){const sid=+id.slice(1);for(const o of [S].concat(rivals))for(const s of o.staff||[])if(s&&s.sid===sid)return o}return null}
 function homeOf(o){return o===S?(S.out?"lc":"home"):(o.out?"lc":palaceOf(o))}
 IA.check=function(where){if(!S||S.dead||window.__j95off)return;const R=S.roster;if(!R)return bad("B",where+": không có sổ");if(R.key!==j95key())return;
  IA.n++;const kh=j95kh();const ids=Object.keys(R.P);const need=peopleNow();
  /* A */for(const [id,why] of need)if(!R.P[id])bad("A",`${where}: thiếu ${id} (${why})`);
  for(const id of ids){if(need.has(id))continue;if(/^m\d/.test(id)){const m=(S.men||[]).find(x=>x.id===id);if(!m||!m.alive)bad("A",`${where}: nam nhân không còn sống/không tồn tại trong sổ: ${id}`);else{const w=(S.menW||{})[id];const sec=(j95z().sec||[]).some(s=>s.b===id&&s.key===R.key);if(!w&&!sec)bad("A",`${where}: nam nhân ${m.name} (${m.rw}) trong sổ mà không có lý do vào cung`)}continue}
   bad("A",`${where}: thừa ${id} (${(R.who[id]||[])[0]})`)}
  /* name collisions (same person twice under two codes) */
  const nm={};for(const id of ids){const w=R.who[id];if(!w)continue;const k=w[0]+"|"+w[1];if(nm[k]&&nm[k]!==id)bad("A",`${where}: trùng người ${w[0]} (${w[1]}): ${nm[k]} và ${id}`);nm[k]=id}
  /* B */const KP=knownPlaces();
  for(const id of ids){const e=R.P[id];if(!Array.isArray(e)||e.length!==4){bad("B",`${id} không đủ 4 khắc`);continue}
   for(let i=0;i<4;i++){const p=e[i]&&e[i][0];if(!p){bad("B",`${where}: ${id} khắc ${i} không có nơi`);continue}
    if(p[0]==="r"&&/^r\d+$/.test(p)){const h=RV(+p.slice(1));if(i<kh){}else if(!h||!h.alive||h.out)bad("B",`${where}: ${id} khắc ${i} ở cung của người đã mất/bị phế: ${p}`);else if(i>=kh&&houseOf(h)!==key(h)&&!h.queen)bad("B",`${where}: ${id} khắc ${i} ở ${p} nhưng ${h.name} không làm chủ cung (ở dưới ${houseOf(h)})`)}
    else if(!KP.has(p))bad("B",`${where}: ${id} khắc ${i} nơi lạ: ${p}`)}}
  /* C */const C={};for(const id of ids){const k=R.P[id][kh][0];C[k]=(C[k]||0)+1}
  for(const k of new Set([...Object.keys(C),...KP]))if(countAt(k)!==(C[k]||0))bad("C",`${where}: countAt(${k})=${countAt(k)} sổ=${C[k]||0}`);
  for(const v of rivals){if(!v.alive)continue;const e=R.P["v"+v.id];if(!e)continue;if(whereOf(v)!==e[kh][0])bad("C",`${where}: whereOf(${v.name})=${whereOf(v)} sổ=${e[kh][0]}`);if((S.where||{})[v.id]!==e[kh][0])bad("C",`${where}: S.where[${v.name}]=${(S.where||{})[v.id]} sổ=${e[kh][0]}`)}
  for(const m of S.men||[]){const e=R.P[m.id];const w=(S.menW||{})[m.id];if(e&&w!==e[kh][0])bad("C",`${where}: menW ${m.name}=${w} sổ=${e[kh][0]}`);if(!e&&w)bad("C",`${where}: menW có ${m.name} ở ${w} mà sổ không có`)}
  if(R.P.me&&R.P.me[kh][0]!==(S.place||"home"))bad("C",`${where}: dòng của ngươi ${R.P.me[kh][0]} mà S.place=${S.place}`);
  /* D */for(const id of ids){if(!(id.startsWith("mm:")||/^s\d/.test(id)))continue;const o=ownerOf(id);if(!o)continue;const e=R.P[id][kh];
   if(e[1]==="follow"){const oid=o===S?"me":"v"+o.id;const oe=R.P[oid];if(oe&&oe[kh][0]!==e[0])bad("D",`${where}: ${(R.who[id]||[id])[0]} 'theo hầu' ở ${e[0]} mà chủ ${(R.who[oid]||[oid])[0]} ở ${oe[kh][0]}`)}
   else if(e[1]==="serve"||e[1]==="clean"){if(e[0]!==homeOf(o))bad("D",`${where}: ${(R.who[id]||[id])[0]} 'phận sự trong cung' ở ${e[0]} mà cung chủ là ${homeOf(o)}`)}}
  /* E (state) */const live=rivals.filter(v=>v.alive&&!v.out);
  for(const v of live){const h=houseOf(v);const hv=byKey(h);
   if(v.queen){const co=live.filter(x=>x!==v&&palaceOf(x)==="kn");if(co.length)bad("E",`Hoàng hậu ${v.name} không ở một mình: ${co.map(x=>x.name).join(",")}`)}
   if(rkOf(v)===6&&!v.queen){const co=live.filter(x=>x!==v&&houseOf(x)===key(v));if(co.length||sameHouse(S,v))bad("E",`Hoàng quý phi ${v.name} có người ở chung: ${co.map(x=>x.name).join(",")}`)}
   if(rkOf(v)<3&&hv&&hv!==v){const r=rkOf(hv);if(r<3||r>5||hv.queen)bad("E",`${v.name} (${RANKS[v.rank].n}) ở dưới ${hv===S?"ngươi":hv.name} phẩm ${r}`)}
   if(rkOf(v)>=3&&!v.queen&&hv!==v&&!v.palWait)bad("E",`${RANKS[v.rank].n} ${v.name} không làm chủ vị (ở dưới ${hv===S?"ngươi":hv&&hv.name}) mà không ghi đang chờ cung`)}
  for(const hd of [S].concat(live)){const n=live.filter(x=>x!==hd&&houseOf(x)===key(hd)).length;if(n>3)bad("E",`${hd===S?"ngươi":hd.name} có ${n} người ở thiên điện (>3)`)}
  /* E (record): residents' 'own palace' rows agree with the state */
  /* F */for(const v of live){const e=R.P["v"+v.id];if(!e)continue;for(let i=kh;i<4;i++){if(/^ở cung mình$/.test(e[i][3]||"")&&e[i][0]!==palaceOf(v))bad("F",`${where}: ${v.name} khắc ${i} 'ở cung mình' tại ${e[i][0]} mà cung nàng là ${palaceOf(v)}`)}}
  /* G */for(const v of rivals){const e=R.P["v"+v.id];if(!v.alive&&e)bad("G",`người chết còn trong sổ: ${v.name}`);if(v.alive&&v.out&&e&&e[kh][0]!=="lc")bad("G",`phế phi ${v.name} ở ${e[kh][0]}`);
   if(v.alive&&!v.out&&v.confined&&e&&e[kh][0]!==palaceOf(v)&&e[kh][1]!=="tryst")bad("G",`${v.name} đang cấm túc mà ở ${e[kh][0]} (${e[kh][1]})`)}
  for(const m of S.men||[])if(!m.alive&&R.P[m.id])bad("G",`nam nhân đã chết còn trong sổ: ${m.name}`);
  IA.lastPlace[where]=(IA.lastPlace[where]||0)+1};
 /* H: hostile acts that actually ran */
 function reasonFor(a,t){try{const r=a.j95rum&&a.j95rum[key(t)];if(r&&wk()-r.w<=8)return"tin đồn";
   for(const h of rivals){if(!h.alive||h===a||h===t)continue;if(evG(h,a)>=2&&hostility(h,t)>=50)return"bị khống chế"}
   const f=facOf(a);const L=f&&facLeader(f);if(L&&L!==a&&L!==t&&L!==S&&hostility(L,t)>=60&&aff(a,L)>=30)return"lệnh chủ phe"}catch(e){}return""}
 {const o=runAct;runAct=function(a,t,k){const npc=a&&a!==S&&a.rel!=null&&t&&a!==t;const host=npc&&ACT[k]&&!FRIENDLY.has(k);let af=0,why="",n0=0;
   if(host){af=aff(a,t);why=reasonFor(a,t);n0=(S.roster&&S.roster.acts||[]).length}
   const r=o.apply(this,arguments);
   try{if(host){IA.stat.acts++;if(r){IA.stat.hostRan++;const L=(S.roster&&S.roster.acts)||[];const rec=L.slice(-6).reverse().find(x=>x.id==="v"+a.id&&x.k===k&&!x.src);
     if(!rec){IA.stat.ungated[k]=(IA.stat.ungated[k]||0)+1}
     if(af>=40){IA.stat.hostHigh++;if(!why)bad("H",`${a.name} → ${t===S?"ngươi":t.name}: ${k} (${ACT[k].n}) khi thiện cảm ${af}, không có lý do ngoại lệ${rec?"":"; không có dòng cổng trong sổ"}`)}}}}catch(e){bad("H","lỗi kiểm: "+e.message)}return r}}
 /* hostile cards with a consort accuser that bypass the gate: wdframe (j92 frame-up) */
 IA.card=function(m){if(!m||m.__ia)return;m.__ia=1;IA.stat.cards++;try{if(m.pid==="wdframe"&&m.pp){const a=byKey(m.pp.a);if(a&&a.rel!=null){const af=aff(a,S);const L=(S.roster&&S.roster.acts)||[];const rec=L.some(x=>x.src==="wdframe"||(x.id==="v"+a.id&&x.k==="giahoa"));
    if(!rec)bad("H",`thẻ 'Bị tố ăn cắp' (wdframe): ${a.name} tố ngươi, thiện cảm hiện ${af}, không có dòng lý do trong sổ`)}}}catch(e){}};
 {const o=showModal;showModal=function(){try{if(Q.length)IA.card(Q[0])}catch(e){}return o.apply(this,arguments)}}
 {const o=chooseM;chooseM=function(){try{if(Q.length)IA.card(Q[0])}catch(e){}return o.apply(this,arguments)}}
 {const o=closeModal;closeModal=function(){try{if(Q.length)IA.card(Q[0])}catch(e){}return o.apply(this,arguments)}}
 /* S: JSON round trip at random moments (also mid-card / mid-minigame) */
 IA.roundTrip=function(where){if(!S||S.dead||!S.roster||S.roster.key!==j95key())return;const midQ=Q.length>0,midMg=!!S.mg;
  const snap=()=>JSON.stringify({P:S.roster.P,who:S.roster.who,key:S.roster.key,kh:j95kh(),where:S.where,menW:S.menW,place:S.place,used});
  const before=snap();const bt=used,bq=Q.length;let d;try{d=JSON.parse(JSON.stringify(ser()))}catch(e){return bad("S","ser lỗi: "+e.message)}
  const q0=quiet;quiet=true;try{deser(d)}catch(e){quiet=q0;return bad("S","deser lỗi: "+e.message)}quiet=q0;
  try{if(typeof j95sync==="function")j95sync()}catch(e){}
  IA.stat.saves++;if(midQ)IA.stat.savesMidQ++;if(midMg)IA.stat.savesMidMg++;
  const after=snap();if(before!==after){const A=JSON.parse(before),B=JSON.parse(after);const diff=[];for(const k in A)if(JSON.stringify(A[k])!==JSON.stringify(B[k]))diff.push(k);
   let det="";if(diff.includes("P")){for(const id in A.P)if(JSON.stringify(A.P[id])!==JSON.stringify(B.P[id])){det+=` ${id}:${JSON.stringify(A.P[id][A.kh])}→${B.P[id]?JSON.stringify(B.P[id][B.kh]):"mất"}`;if(det.length>300)break}for(const id in B.P)if(!A.P[id])det+=` thêm ${id}`}
   bad("S",`${where}${midQ?" (giữa thẻ)":""}${midMg?" (giữa minigame)":""}: nạp lại làm đổi ${diff.join(",")}${det}`)}
  if(Q.length!==bq&&!midMg)IA.stat.qLost=(IA.stat.qLost||0)+(bq-Q.length);
  IA.check(where+"+nạp")};
})();
/* P: retroactive rewrites of a past khắc (j95b "việc đã qua"): did the player stand there and see something else? */
(function(){const IA=window.__IA;IA.stat.past=0;IA.stat.pastSeen=0;if(typeof j95bPutPast!=="function")return;const o=j95bPutPast;
 j95bPutPast=function(id,k,act,why,src){const R=S.roster;let snap=null;try{if(R&&R.P&&R.P[id]){snap=R.P.me?R.P.me.map(e=>e[0]):null;snap={me:snap,old:R.P[id].map(e=>e[0]),m:R.m?JSON.stringify(R.m):""}}}catch(e){}
  const r=o.apply(this,arguments);
  try{if(r==="ok"&&snap&&snap.me){IA.stat.past++;const L=R.P[id];for(let kh=0;kh<4;kh++){if(L[kh][0]===snap.old[kh])continue;const me=snap.me[kh];const v=id[0]==="v"?RV(+id.slice(1)):null;const own=v&&me==="home"&&sameHouse(S,v);
     if(!own&&(snap.old[kh]===me||k===me)){IA.stat.pastSeen++;IA.bad("P",`${(R.who[id]||[id])[0]} khắc ${kh}: sổ sửa lại ${snap.old[kh]}→${L[kh][0]} sau khi buổi đã qua, mà lúc đó ngươi đứng ở ${me} (${snap.old[kh]===me?"đã thấy nàng ở đó":"không hề thấy nàng"}); câu: ${String(why).slice(0,70)}`)}}}}catch(e){}return r}})();
