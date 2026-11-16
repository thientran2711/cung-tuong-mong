/* j95c invariants (one per bug of the independent audit, dev/test/ROSTER_AUDIT_INDEPENDENT.md), injected by roster_audit.js after HOOK/HOOK2.
   (j) giá họa: every NPC wdFrame that ran has a passing gate line "giahoa" for that actor; none at affection >= 40 without a recorded exception
   (k) housing: at most 3 in side halls; she never stands in a palace whose head moved out; from the current khắc on, home acts / "ở cung mình" sit in her CURRENT palace; no row in a palace whose head is gone or is not
       head of house; children in their mother's current home
   (l) followers: "theo hầu" sits where the person followed is; "phận sự" in the owner's current home (lãnh cung when she is there); a cung nữ thân
       tín whose mistress is out is with her; j95followers(p) == the record
   (m) past: a turn-of-buổi act never rewrites a khắc already shown nor its map count R.m; in the present buổi only the current khắc, and never
       where she stands (old or new place)
   (n) stage: lãnh cung draws exactly the fallen consorts the record puts there (no invented person, no cap); the Kính sự phòng eunuch is not
       labelled "Tổng quản"; after save -> load the stage still has every consort the record puts here
   (o) servant names unique; loading a save creates no servant
   (p) the dead leave the record at once (right after deathSentence)
   (r) a row added mid-buổi (a man who comes in) is never put, in a khắc already shown (before the previous check), where she stood (re-check N1)
   (q) j95habitsMine: a row is told only with a watcher she was told of; watchers never count untold ones */
window.__AUDC=function(){const A=window.__aud;for(const k of "jklmnopqr")if(A.err[k]==null){A.err[k]=0;A.ex[k]=[]}A.c={frames:0,framesRan:0,past:0,pastNext:0,deaths:0,loads:0,lcStage:0,follow:0};
 const bad=(k,m)=>{A.err[k]++;if(A.ex[k].length<12)A.ex[k].push((S&&S.origin?S.origin.k:"")+" T"+(S?S.turn:"")+" w"+wk()+" b"+(S?S.buoi:"")+" k"+used+" "+m)};
 const HOME=new Set(["rest","sleep","read","eat","dance"]);
 const rnOK=k=>{if(!/^r\d+$/.test(k||""))return true;const h=RV(+k.slice(1));return !!(h&&h.alive&&!h.out&&(h.queen||houseOf(h)===key(h)))};
 const homeOf=o=>o===S?(S.out?"lc":"home"):(o.out?"lc":palaceOf(o));
 const ownerOf=id=>{if(id.startsWith("mm:")){const k=id.slice(3);return k==="me"?S:RV(+k)}if(/^s\d/.test(id)){const sid=+id.slice(1);for(const o of [S].concat(rivals))for(const s of o.staff||[])if(s&&s.sid===sid)return o}return null};
 function check(where){if(!S||S.dead||window.__j95off)return;const R=S.roster;if(!R||R.key!==j95key())return;const kh=j95kh();
  /* (k) */for(const v of rivals){if(!v.alive||v.out)continue;const e=R.P["v"+v.id];if(!e)continue;const own=palaceOf(v);
   for(let i=kh;i<4;i++){const x=e[i];if((HOME.has(x[1])||x[3]==="ở cung mình")&&x[0]!==own)bad("k",`${where}: ${v.name} khắc ${i} ${x[1]} '${x[3]}' ở ${x[0]} mà cung nàng là ${own}`)}}
  for(const id in R.P){const e=R.P[id];for(let i=kh;i<4;i++)if(!rnOK(e[i][0]))bad("k",`${where}: ${(R.who[id]||[id])[0]} khắc ${i} ở ${e[i][0]}: chủ cung không còn / không làm chủ cung`);
   if(id.startsWith("k:")){const mid=id.split(":")[1];const mo=mid==="me"?null:RV(+mid);const h=!mo?(S.out?(qOn()?"kn":"tn"):"home"):(mo.alive&&!mo.out?palaceOf(mo):(qOn()?"kn":"tn"));/* jplx (main): children 6+ study / live at Thượng thư phòng, A ca sở, Đông cung */const kid=(mo?mo.kids:S.kids)[+id.split(":")[2]];const hp=typeof plxKidPlace==="function"&&kid?plxKidPlace(kid):null;for(let i=kh;i<4;i++)if(e[i][0]!==(hp||h))bad("k",`${where}: hoàng tự ${(R.who[id]||[id])[0]} ở ${e[i][0]} mà nhà là ${h}`)}}
  {const live=rivals.filter(v=>v.alive&&!v.out);for(const hd of [S].concat(live)){const n=live.filter(x=>x!==hd&&houseOf(x)===key(hd)).length;if(n>3)bad("k",`${where}: ${hd===S?"ngươi":hd.name} có ${n} người ở thiên điện (>3)`)}
   if(!S.out&&/^r\d+$/.test(S.place||"")&&!rnOK(S.place))bad("k",`${where}: ngươi đứng ở ${S.place} mà chủ cung đã dời đi`)}
  /* (l) */for(const id in R.P){if(!(id.startsWith("mm:")||/^s\d/.test(id)))continue;const o=ownerOf(id);if(!o)continue;const oid=o===S?"me":"v"+o.id;const oe=R.P[oid];const e=R.P[id];
   for(let i=kh;i<4;i++){const x=e[i];if(x[1]==="follow"){A.c.follow++;if(oe&&oe[i][0]!==x[0])bad("l",`${where}: ${(R.who[id]||[id])[0]} theo hầu ở ${x[0]} mà chủ ở ${oe[i][0]} (khắc ${i})`)}
    else if(x[1]==="serve"||x[1]==="clean"){/* a named elder (jstaff) serves at her post, where the stage draws her */const el=J95.eld&&J95.eld[id]&&allServ().find(s=>"s"+s.sid===id);if(el){if(x[0]!==j95elderK(el))bad("l",`${where}: ${el.name} phận sự ở ${x[0]} mà chỗ đứng là ${j95elderK(el)} (khắc ${i})`)}else if(x[0]!==homeOf(o))bad("l",`${where}: ${(R.who[id]||[id])[0]} phận sự ở ${x[0]} mà cung chủ là ${homeOf(o)} (khắc ${i})`)}
    if(id.startsWith("mm:")&&o!==S&&oe){const ok=oe[i][0];if(ok!==homeOf(o)&&ok!=="lc"&&x[0]!==ok)bad("l",`${where}: cung nữ thân tín ${(R.who[id]||[id])[0]} ở ${x[0]} mà chủ ra ${ok} (khắc ${i})`)}}}
  for(const o of [S].concat(liveRivals(true))){const oid=o===S?"me":"v"+o.id;const n=Object.keys(R.P).filter(id=>R.P[id][kh][1]==="follow"&&R.P[id][kh][2]===oid).length;if(j95followers(o).length!==n)bad("l",`${where}: j95followers(${o===S?"ngươi":o.name})=${j95followers(o).length} mà sổ có ${n}`)}
  /* (n) */const V=S.visit;if(V&&V.k===S.place&&V.people){if(S.place==="lc"){A.c.lcStage++;for(const p of V.people)if(p.kind==="fallen"){if(!p.ref)bad("n",`${where}: lãnh cung vẽ người bịa "${p.name}"`);else if(!R.P["v"+p.ref.id]||R.P["v"+p.ref.id][kh][0]!=="lc")bad("n",`${where}: lãnh cung vẽ ${p.ref.name} mà sổ không ở lc`)}
    for(const v of rivals)if(v.alive&&v.out&&R.P["v"+v.id]&&R.P["v"+v.id][kh][0]==="lc"&&!V.people.some(p=>p.ref===v))bad("n",`${where}: sổ có phế phi ${v.name} ở lãnh cung mà sân khấu không vẽ (${V.people.length} người)`)}
   for(const p of V.people)if(p.kind==="ksp"&&S.court&&S.court.ksp&&/Tổng quản/.test(p.name))bad("n",`${where}: thái giám Kính sự phòng mang nhãn "${p.name}"`)}
  /* (o) */const nm={};for(const s of allServ()){if(!s||!s.name)continue;if(nm[s.name])bad("o",`${where}: hai kẻ hầu cùng tên ${s.name} (s${nm[s.name]} và s${s.sid})`);nm[s.name]=s.sid}
  /* (r) */{const S0=A.c.ids;const ids=Object.keys(R.P);if(S0&&S0.key===R.key&&S0.kh>0){for(const id of ids){if(S0.set.has(id))continue;A.c.newRows=(A.c.newRows||0)+1;const e=R.P[id];
     for(let i=0;i<S0.kh;i++){const me=R.P.me?R.P.me[i][0]:null;if(e[i][0]&&e[i][0]===me&&e[i][0]!=="ngoai")bad("r",`${where}: ${(R.who[id]||[id])[0]} vào sổ giữa buổi mà khắc ${i} (đã hiện) ghi ở ${e[i][0]}, chỗ ngươi đứng`)}}}
   A.c.ids={key:R.key,kh,set:new Set(ids)}}
  /* (q) */for(const h of j95habitsMine()){const z=j95z();const told=Object.values(z.meK).filter(m=>m.k===h.place&&J95.B4[m.c]===h.buoi&&m.told).length;if(h.told!==(told>0)||h.watchers!==told)bad("q",`${where}: thói quen ${h.place} told=${h.told} watchers=${h.watchers} mà tai mắt đã báo ${told}`)}}
 window.__audCheckC=check;
 {const o=spend;spend=function(){const r=o.apply(this,arguments);try{check("spend")}catch(e){bad("k","lỗi kiểm: "+e.message)}return r}}
 {const o=goTo;goTo=function(){const r=o.apply(this,arguments);try{check("goTo")}catch(e){bad("k","lỗi kiểm: "+e.message)}return r}}
 {const o=nextBuoi;nextBuoi=function(){const r=o.apply(this,arguments);try{check("buổi");
   /* (o)(n) save -> load: no servant created, stage keeps the record's people here */
   if(S&&!S.dead&&!Q.length&&!S.mg&&Math.random()<.2){const sids=allServ().map(s=>s.sid).sort().join(",");const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;A.c.loads++;
    const s2=allServ().map(s=>s.sid).sort().join(",");if(s2!==sids)bad("o","nạp ván sinh/mất kẻ hầu: "+allServ().filter(s=>!sids.split(",").includes(String(s.sid))).map(s=>s.name).join(","));
    const R=S.roster,kh=j95kh();if(R&&R.key===j95key()&&S.visit&&S.visit.k===S.place&&!(typeof isSrv==="function"&&isSrv())){for(const v of liveRivals(true)){const e=R.P["v"+v.id];if(e&&e[kh][0]===S.place&&!(S.place==="home"&&sameHouse(S,v))&&!S.visit.people.some(p=>p.ref===v))bad("n","sau khi nạp: sổ có "+v.name+" ở "+S.place+" mà sân khấu không vẽ")}}
    check("nạp")}}catch(e){bad("o","lỗi kiểm nạp: "+e.message)}return r}}
 /* (j) */
 {const o=wdFrame;wdFrame=function(a,t){const npc=a&&a!==S&&a.rel!=null&&t&&a!==t;if(!npc)return o.apply(this,arguments);A.c.frames++;const af=aff(a,t);const sc=a.schemes||0;const L=S.roster&&S.roster.acts;const n0=L?L.length:0;
   const r=o.apply(this,arguments);try{if((a.schemes||0)>sc){A.c.framesRan++;const L2=(S.roster&&S.roster.acts)||[];const rec=L2.slice(L2===L?Math.max(0,n0-8):0).reverse().find(x=>x.id==="v"+a.id&&x.k==="giahoa");
    if(!rec)bad("j",`giá họa chạy không có dòng cổng: ${a.name} → ${t===S?"ngươi":t.name} L=${!!L} same=${L2===L} n0=${n0} len=${L2.length} last=${JSON.stringify(L2.slice(-3))} st=${(new Error().stack||"").split("\n").slice(2,9).map(x=>x.trim().split(" ")[1]).join("<")}`);else if(!rec.ok)bad("j",`giá họa chạy dù cổng chặn: ${a.name} (${rec.why})`);else if(af>=40&&!rec.ex)bad("j",`giá họa khi thiện cảm ${af} không ngoại lệ: ${a.name} (${rec.why})`)}}catch(e){bad("j","lỗi kiểm: "+e.message)}return r}}
 /* (m) */
 {const o=j95bPutPast;j95bPutPast=function(id,k){const R=S.roster;let snap=null;try{if(R&&R.P)snap={cur:R.key===j95key(),kh:j95kh(),P:JSON.stringify(R.P),m:JSON.stringify(R.m||[]),old:R.P[id]?R.P[id].map(e=>e.slice()):null,me:R.P.me?R.P.me.map(e=>e[0]):null}}catch(e){}
   const r=o.apply(this,arguments);A.c.past++;
   try{if(snap){const P=JSON.parse(snap.P),M=JSON.parse(snap.m);if(!snap.cur){if(JSON.stringify(R.P)!==snap.P)bad("m",`ghi lùi vào buổi đã qua: ${id} → ${k}`);if(JSON.stringify(R.m||[])!==snap.m)bad("m","tính lại R.m của buổi đã qua")}
     else{for(let i=0;i<4;i++){if(i===snap.kh)continue;for(const x in P)if(JSON.stringify(P[x][i])!==JSON.stringify((R.P[x]||[])[i]))bad("m",`buổi hiện tại: đổi khắc ${i} ≠ khắc hiện tại (${x})`);if(i<snap.kh&&JSON.stringify(M[i])!==JSON.stringify((R.m||[])[i]))bad("m",`tính lại R.m khắc đã hiện ${i}`)}
      const e=R.P[id];if(snap.old&&e&&e[snap.kh][0]!==snap.old[snap.kh][0]&&snap.me&&(snap.old[snap.kh][0]===snap.me[snap.kh]||e[snap.kh][0]===snap.me[snap.kh]))bad("m",`dời ${id} ngay trước mắt ngươi (${snap.old[snap.kh][0]}→${e[snap.kh][0]}, ngươi ở ${snap.me[snap.kh]})`)}}}catch(e){bad("m","lỗi kiểm: "+e.message)}return r}}
 /* (p) */
 {const o=deathSentence;deathSentence=function(v){const r=o.apply(this,arguments);try{if(v&&v.rel!=null&&!v.alive&&S&&!S.dead&&S.roster&&S.roster.key===j95key()){A.c.deaths++;if(S.roster.P["v"+v.id])bad("p","người vừa chết còn trong sổ: "+v.name);if(S.roster.P["mm:"+v.id])bad("p","cung nữ của người vừa chết còn trong sổ: "+v.name)}}catch(e){bad("p","lỗi kiểm: "+e.message)}return r}}
};
