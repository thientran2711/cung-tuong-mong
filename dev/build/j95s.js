/* ================= j95s LIVE SERVANTS + REASONED RECORD (owner OD 18/11 ~19:30Z, OD L1901 points 2 + 3; brief live-servants) =================
   (2) Every maid / eunuch — HERS and everyone's (consorts, Hoàng hậu, Thái hậu's household) — lives her own day: a per-khắc plan of duties,
       meals, breaks, errands, visits to a friend and sleep, each with its cause (law 6b real people). When her mistress goes out she takes SOME
       of her people, not all: a retinue whose size comes from her rank (BAL.slv.ret, Hoàng hậu up to 5) and the place (BAL.slv.occ); the close
       maid goes if she is free, otherwise whoever is free (weighted by trust); the rest stay on their own plans. The player's maids obey the
       SAME rule (two-way law): her close maid no longer walks with her always.
   (3) Every row of the ONE record (S.roster, j95) carries its real cause: the servants' rows name their plan / their mistress's order /
       the retinue pick; a last guard replaces an empty or filler reason ("phận sự trong cung", "phận sự", "") of anyone with the cause read
       from the row itself (her act, her target, the deed she walks to). Moves made after the plan (jagday deeds, events, j95fixHouse) are
       written into the same rows by their own code; this pass keeps them (deed / tryst / meet / punished / walking rows are never overwritten).
   One record, no copy: everything runs inside j95sync (wraps j95fixHouse, the last step before the views and the map counts), so S.where,
   the Dư đồ counts (j95counts / countAt), the stage (j95ledStage) and dev/tools/roster.js all read these rows. Deterministic per buổi
   (j95rng seeded by the life + buổi key + person: the same buổi always gives the same day, however often it is recomputed).
   Off switch for measuring: BAL.slv.on = 0 (the old rows: close maid follows always, the others "phận sự trong cung").
   ===================================================================================================================================== */
Object.assign(BAL,{slv:{on:1,
 /* retinue ceiling by consort rank 0..7 (owner OD L1901: "hoàng hậu ... 5 người tùy tùng", lower ranks fewer; never above the household BAL.promo.cap) */
 ret:[1,1,1,2,2,3,4,5],retTh:5,retNd:5,
 /* share of the ceiling she takes to a place (the Emperor / Thái hậu / court: full train; a stroll: fewer); others = occ._ */
 occ:{dtd:1,thu:1,tn:1,kn:.8,vuon:.6,tyv:.4,_:.6},
 /* her day: weights of each kind of khắc by canonical buổi slot 0 sáng · 1 trưa · 2 chiều · 3 tối (serve, clean, eat, brk = break, err = errand, vis = visit a friend, sleep) */
 /* err + vis at khắc 0 = the share of buổi she spends out (one errand or visit, the whole buổi) */
 day:[{serve:40,clean:30,eat:10,brk:5,err:15,vis:0,sleep:0},{serve:30,clean:10,eat:25,brk:20,err:10,vis:5,sleep:0},{serve:25,clean:20,eat:0,brk:15,err:20,vis:15,sleep:0},{serve:30,clean:5,eat:15,brk:10,err:0,vis:5,sleep:35}],
 closeServe:2.5,/* the close maid serves her mistress this many times more often */
 sleepFrom:2,/* tối: sleep only from this khắc (0-based) */
 run:[1,2],/* one thing lasts 1..2 khắc */
 err:{nvp:30,tyv:25,ksp:20,tgk:15},illTyv:3,/* errand places; Thái y viện × illTyv when her mistress is ill / with child */
 friendAf:30,/* a colleague in another palace she visits = thiện cảm at least this */
 night:1/* servants of a household on night watch (tối, the khắc others sleep) */}});
Object.assign(ACT95,{brk:"nghỉ tay giữa phiên",stay:"ở lại trông cung",nightw:"canh đêm"});
const J95S={stat:{life:0,ret:0,close:0,fallback:0,guard:0,keep:0},errs:[],guardBy:{}};
function j95sOn(){try{return !!(BAL.slv&&BAL.slv.on)}catch(e){return false}}
function j95sErr(w,e){try{if(J95S.errs.length<20)J95S.errs.push(w+": "+(e&&e.message||e))}catch(x){}}
/* rows this pass never overwrites: a planned or landed deed, a secret meeting, a forced list (rest / Tân Giả khố / cấm túc / lãnh cung), a walk to a deed */
function j95sKeep(x){if(!x)return false;const a=x[1]||"";return /^ag_/.test(a)||a==="tryst"||a==="meet"||a==="offduty"||a==="laundry"||a==="confined"||a==="cold"||a==="called"||(a==="go"&&!!x[3])}
/* busy = she cannot be taken along now (a deed, a meeting, an errand or a visit of her own) */
function j95sBusy(x){if(!x)return true;const a=x[1]||"";return j95sKeep(x)||a==="errand"||a==="visit"}
/* place names (placeName is slow: ~30 µs) kept for the buổi (a palace's name changes with its head only at a new buổi / housing fix) */
function j95sPn(k){const R=S.roster;const key=R?R.key:"";if(!J95S.pnc||J95S.pnc.key!==key||J95S.pnc.w!==S)J95S.pnc={key,w:S,M:new Map()};const M=J95S.pnc.M;let v=M.get(k);if(v==null){v=j95pn(k);M.set(k,v)}return v}
function j95sRng(R,tag){return j95rng(j95hash(j95seed()+"|"+R.key+"|slv|"+tag))}
function j95sPw(r,L){const T=L.reduce((s,x)=>s+Math.max(0,x[1]),0);if(!(T>0))return L.length?L[0][0]:null;let q=r()*T;for(const x of L){q-=Math.max(0,x[1]);if(q<=0)return x[0]}return L[L.length-1][0]}
/* who a mistress is in a reason line */
function j95sOw(o){if(o===S)return"ngươi";if(o==="th")return"Thái hậu";try{if(o.queen)return"Hoàng hậu"}catch(e){}return o&&o.name||"chủ"}
function j95sOid(o){return o===S?"me":o==="th"?"th":"v"+o.id}
/* her household: [{id, kind (mm | st | el), close, sv (the servant object or null), name}] — the record's people of that mistress */
function j95sHouses(ppl){const H=new Map();const add=(o,q)=>{let h=H.get(o);if(!h){h=[];H.set(o,h)}h.push(q)};
 for(const p of ppl){if(p.kind==="mm"||p.kind==="st"){const o=p.ref;if(!o)continue;if(o!==S&&(!o.alive))continue;add(o,{id:p.id,kind:p.kind,close:p.kind==="mm",sv:p.kind==="st"?j95sv(p.id):null,name:p.name,home:p.home})}
  else if(p.kind==="el"&&p.ref&&!p.ref.eid&&p.home==="tn"&&!S.thDead)add("th",{id:p.id,kind:"el",close:false,sv:p.ref,name:p.name,home:"tn"})}
 return H}
function j95sRetMax(o){const B=BAL.slv;try{if(o==="th")return B.retTh;if(o===S&&S.succ&&S.succ.p==="c")return B.retNd;const r=Math.max(0,Math.min(B.ret.length-1,rkOf(o)||0));return B.ret[r]}catch(e){return 1}}
/* ---------- her own day (per khắc, deterministic per buổi) ---------- */
function j95sErrand(o,r){const B=BAL.slv.err;const L=[];let ill=false;try{ill=o!=="th"&&o!==S?!!(illOf(o)||o.preg):!!(o===S&&(illOf(S)||S.preg))}catch(e){}
 for(const k in B){if(k==="nvp"&&!j95nvp())continue;L.push([k,B[k]*(k==="tyv"&&ill?BAL.slv.illTyv:1)])}const k=j95sPw(r,L);const ow=j95sOw(o);
 const why=k==="nvp"?`${ow} sai đi lĩnh đồ ở Nội vụ phủ`:k==="tyv"?(ill?`${ow} không khỏe, sai đi lấy thuốc ở Thái y viện`:`${ow} sai đi lấy thuốc bổ ở Thái y viện`):k==="ksp"?`${ow} sai đi Kính sự phòng hỏi chuyện`:`mang đồ của ${ow} xuống Tân Giả khố giặt`;
 return[k,"errand",null,why]}
function j95sFriend(q,o){const s=q.sv;if(!s||!s.af)return null;let best=null,ba=BAL.slv.friendAf-1;
 for(const k in s.af){const a=s.af[k];if(!(a>ba))continue;const x=J95S.sv?J95S.sv.get(+k):servById(+k);if(!x||x.out)continue;const m=ownerOf(x);if(!m||m===o||(m!==S&&(!m.alive||m.out)))continue;best=[x,m];ba=a}
 if(!best)return null;const pk=palaceOf(best[1]);return[pk,"visit","s"+best[0].sid,`hết phiên, sang ${j95sPn(pk)} thăm bạn thân ${best[0].name}`]}
function j95sServeWhy(c,ow){return ["hầu "+ow+" chải đầu, dâng trà sáng","dọn bữa trưa, hầu "+ow,"hầu "+ow+" buổi chiều","hầu "+ow+" dùng bữa tối, sửa soạn nghỉ"][c]||"hầu "+ow}
function j95sLife(R,q,o,hk,watch){const B=BAL.slv;const c=R.c;const r=j95sRng(R,q.id);const ow=j95sOw(o);const oid=j95sOid(o);const W=Object.assign({},B.day[c]||B.day[0]);
 if(q.close)W.serve*=B.closeServe;if(!q.sv||q.kind==="el")W.vis=0;/* a visit needs a friend she has (servants with a thiện cảm book) */
 const out=[];let i=0;while(i<4){let w=Object.assign({},W);if(c!==3||i<B.sleepFrom)w.sleep=0;
  /* a walk out of her palace (an errand, a visit to a friend) takes the whole buổi: she sets out and comes back with the buổi change, never
     in the middle (her mistress's stage changes at the buổi change anyway; perf gate 4x per khắc) — at most one per buổi, decided at khắc 0 */
  if(i>0)w.err=w.vis=0;let k=j95sPw(r,Object.entries(w));let len=B.run[0]+Math.floor(r()*(B.run[1]-B.run[0]+1));let row;
  if(k==="err"||k==="vis")len=4;
  if(k==="vis"){row=j95sFriend(q,o);if(!row)k="brk"}
  if(k==="err")row=hk==="lc"?null:j95sErrand(o,r);if(k==="err"&&!row)k="clean";
  if(k==="sleep"&&watch)row=[hk,"nightw",oid,`đến phiên canh đêm cho ${ow}`];
  else if(k==="sleep")row=[hk,"sleep",null,"hết phiên, về phòng cung nhân ngủ"];
  if(!row){row=k==="serve"?[hk,"serve",oid,j95sServeWhy(c,ow)]:k==="clean"?[hk,"clean",oid,`đến phiên quét dọn ${hk==="lc"?"chỗ ở của "+ow:j95sPn(hk)}`]:k==="eat"?[hk,"eat",null,"đến giờ cơm của cung nhân"]:[hk,"brk",null,"xong việc, nghỉ tay trong phòng cung nhân"]}
  for(let j=0;j<len&&i<4;j++,i++)out.push(row.slice())}
 return out}
/* ---------- the retinue ---------- */
function j95sOcc(k){const O=BAL.slv.occ;if(O[k]!=null)return O[k];return /^r\d+$/.test(k||"")?O.kn:O._}
function j95sPick(R,o,oid,H,k,s0,base,kh,prev){const r=j95sRng(R,"ret|"+oid+"|"+s0+"|"+k);const max=j95sRetMax(o);
 const free=H.filter(q=>!j95sBusy(base[q.id][Math.max(s0,kh)]));
 /* an outing already under way (started before this khắc): those already walking with her stay with her */
 if(prev&&prev.length)return{mem:H.filter(q=>prev.includes(q.id)&&!j95sBusy(base[q.id][kh])),close:null,why0:null};
 const n=Math.min(free.length,Math.max(1,Math.ceil(max*j95sOcc(k))));if(!n)return{mem:[]};
 const mem=[];const cl=H.find(q=>q.close);let why0=null;
 if(cl&&free.includes(cl))mem.push(cl);else if(cl){const x=base[cl.id][Math.max(s0,kh)];why0=`cung nữ thân cận ${cl.name} đang bận (${ACT95[x[1]]||String(x[1]).replace(/^ag_/,"")})`}
 const pool=free.filter(q=>!mem.includes(q));while(mem.length<n&&pool.length){const q=j95sPw(r,pool.map(x=>[x,Math.max(5,(x.sv&&x.sv.loyal)||50)]));mem.push(q);pool.splice(pool.indexOf(q),1)}
 return{mem,close:cl&&mem.includes(cl)?cl:null,why0}}
function j95sPass(R,kh,ppl){if(!j95sOn())return 0;const t0=performance.now();let n=0;const st=J95S.stat;const H=j95sHouses(ppl);
 /* nothing changed since the last pass (same buổi and khắc, same places of every mistress, same households and planned deeds, and her
    people's rows are still the ones written then): skip — j95sync runs several times per khắc (perf gate: 4x per-khắc ≤ +10 %) */
 let dOn=false;try{dOn=typeof agDOn==="function"&&agDOn()}catch(e){}let sig=R.key;const mem=[];
 for(const [o,hh] of H){const oid=j95sOid(o);const op=R.P[oid];sig+="|"+oid+":";if(op)for(let i=0;i<4;i++)sig+=(op[i]&&op[i][0])+",";sig+=":";
  for(const q of hh){sig+=q.id+"/"+q.home;if(dOn&&q.kind==="st"){const sl=agDaySlot(q.id);if(sl&&sl.k)sig+="/"+sl.k}sig+=",";mem.push(q.id)}}
 const LS=J95S.last;if(LS&&LS.R===R&&LS.sig===sig){let same=true;for(const id of mem){const e=R.P[id],w=LS.rows[id];if(!e||!w){same=false;break}for(let i=0;i<4;i++){const x=e[i],y=w[i];if(x!==y&&(!x||!y||x[0]!==y[0]||x[1]!==y[1]||x[2]!==y[2]||x[3]!==y[3])){same=false;break}}if(!same)break}
  if(same){J95S.skip=(J95S.skip||0)+1;J95S.ms=(J95S.ms||0)+performance.now()-t0;return 0}}
 
 J95S.sv=new Map();try{for(const x of allServ())if(x&&x.sid!=null)J95S.sv.set(x.sid,x)}catch(e){}
 /* her day is the same all buoi long (seeded): computed once per buổi and person */
 if(!J95S.lc||J95S.lc.key!==R.key||J95S.lc.w!==S)J95S.lc={key:R.key,w:S,L:{}};const LC=J95S.lc.L;
 for(const [o,hh] of H){const oid=j95sOid(o);if(o===S&&typeof isSrv==="function"&&isSrv())continue;
  const op=R.P[oid];const hk0=hh[0].home;if(!op)continue;
  /* her people's own rows first (kept rows stay, the rest = their day); one servant per household keeps the night watch */
  const base={};const wn=Math.min(BAL.slv.night,hh.length);
  hh.forEach((q,ix)=>{const e=R.P[q.id];if(!e)return;const hk=q.home;let L=null;
   /* a deed she planned for this buổi (jagday / jagstaff slot) is where she is */
   try{if(q.kind==="st"&&typeof agDOn==="function"&&agDOn()){const sl=agDaySlot(q.id);if(sl&&sl.k)L=agRow(sl)}}catch(x){}
   if(!L){const ck=q.id+"|"+hk+"|"+(ix<wn?1:0);L=hk==="lc"?null:(LC[ck]||(LC[ck]=j95sLife(R,q,o,hk,ix<wn)))}
   const b=[];for(let i=0;i<4;i++){const x=e[i];b.push(i<kh||j95sKeep(x)||!L?x:L[i])}base[q.id]=b});
  /* her outings from this khắc on: runs of khắc away from home */
  const away=i=>{const k=op[i]&&op[i][0];return !!k&&k!==hk0&&k!=="lc"&&k!==J95OUT_&&hk0!=="lc"};
  const ret={};/* id → [i...] */const why={};
  for(let i=kh;i<4;){if(!away(i)){i++;continue}const k=op[i][0];let s0=i;while(s0>0&&op[s0-1]&&op[s0-1][0]===k)s0--;let e0=i;while(e0+1<4&&op[e0+1]&&op[e0+1][0]===k)e0++;
   let prev=null;if(s0<kh){prev=hh.filter(q=>{const x=R.P[q.id]&&R.P[q.id][kh-1];return x&&x[1]==="follow"&&x[2]===oid}).map(q=>q.id)}
   const P=j95sPick(R,o,oid,hh,k,s0,base,kh,prev);const ow=j95sOw(o);const nm=P.mem.length;
   for(const q of P.mem){const w=prev&&prev.length?`theo hầu ${ow} ở ${j95sPn(k)} (đi cùng từ đầu)`:q===P.close?`${ow} sang ${j95sPn(k)}, cung nữ thân cận theo hầu`:P.why0?`${P.why0}, nên ${ow} chọn ${q.name} theo hầu`:`${ow} sang ${j95sPn(k)}, chọn theo hầu (tùy tùng ${nm} người)`;
    for(let j=Math.max(i,kh);j<=e0;j++){if(j95sKeep(base[q.id][j]))break;/* only a deed / meeting takes her away mid-outing; her own day waits */(ret[q.id]=ret[q.id]||{})[j]=[k,"follow",oid,w]}
    st.ret++;if(q===P.close)st.close++;else if(P.why0)st.fallback++}
   i=e0+1}
  /* write: retinue rows, else her day (while her mistress is out, serving = staying behind to keep the palace) */
  for(const q of hh){const e=R.P[q.id],b=base[q.id];if(!e||!b)continue;for(let i=kh;i<4;i++){let x=ret[q.id]&&ret[q.id][i];
    if(!x){x=b[i];if(!j95sKeep(x)&&away(i)&&(x[1]==="serve"||x[1]==="follow"))x=[q.home,"stay",oid,`${j95sOw(o)} sang ${j95sPn(op[i][0])}, ở lại trông cung`]}
    if(!x)continue;if(!e[i]||e[i][0]!==x[0]||e[i][1]!==x[1]||e[i][2]!==x[2]||e[i][3]!==x[3]){e[i]=x;n++}st.life++}}}
 const rows={};for(const id of mem)if(R.P[id])rows[id]=R.P[id].map(x=>x&&x.slice());J95S.last={R,sig,rows};
 J95S.ms=(J95S.ms||0)+performance.now()-t0;J95S.calls=(J95S.calls||0)+1;return n}
/* ---------- (3a) the reason guard: no empty or filler reason in the record ---------- */
const J95S_FILL=new Set(["","phận sự trong cung","phận sự"]);
function j95sWhy(R,id,i,x,kind){const a=x[1]||"",k=x[0],t=x[2];const tn=t?((R.who[t]||[t])[0]):"";const pn=j95sPn(k);
 if(a==="go"){for(let j=i+1;j<4;j++){const y=R.P[id][j];if(y&&y[0]===k&&y[1]!=="go")return`đang đến ${pn} để ${ACT95[y[1]]||String(y[1]).replace(/^ag_/,"")}`}return`đang đi đến ${pn}`}
 if(/^ag_/.test(a))return`việc nàng tự định trong ngày: ${String(a).slice(3)}${tn?" với "+tn:""}`;
 if(kind==="man"){const m=(S.men||[]).find(z=>z.id===id);const rw=m&&m.rw;return rw==="thái y"?"phiên trực ở Thái y viện":rw==="thị vệ"?"phiên canh gác trong cung":rw?`được triệu vào cung (${rw})`:"được triệu vào cung"}
 if(a==="serve"||a==="clean")return`${ACT95[a]}${tn?" cho "+tn:""} theo lịch trong ngày`;
 if(a==="rest"||a==="here")return k==="home"||/^r\d+$/.test(k||"")?"ở cung mình nghỉ ngơi":`nghỉ ở ${pn}`;
 return`${ACT95[a]||a||"ở"} ở ${pn}`}
function j95sGuard(R,kh,ppl){let n=0;let K=null;const OK=J95S.ok||(J95S.ok=new WeakSet());/* a row checked once is not checked again (rows are replaced, never edited in place) */
 for(const id in R.P){if(id==="me")continue;const e=R.P[id];for(let i=kh;i<4;i++){const x=e[i];if(!x||OK.has(x))continue;OK.add(x);if(!x[0]||x[0]===J95OUT_)continue;const w=x[3]==null?"":String(x[3]).trim();if(!J95S_FILL.has(w))continue;
   if(!K){K={};for(const p of ppl)K[p.id]=p.kind}
   const nw=j95sWhy(R,id,i,x,K[id]);if(nw&&nw!==w){e[i]=[x[0],x[1],x[2],nw];n++;J95S.guardBy[K[id]||id[0]]=(J95S.guardBy[K[id]||id[0]]||0)+1}}}
 J95S.stat.guard+=n;return n}
/* her party at a place = herself and every one of her people walking with her (not shadows, not drawn as others: the map counts the people
   she would MEET there) — was: only her close maid (j95party) */
(function(){const p0=j95party;j95party=function(id,k){if(p0.apply(this,arguments))return true;/* cheap rejects first: countAt asks this for every person at every place */
 if(k!==S.place||k==="home"||!id||(id[0]!=="s"&&id[0]!=="m")||!BAL.slv.on)return false;try{const R=S.roster;const e=R&&R.P[id];if(!e)return false;const x=e[j95kh()];return !!(x&&x[1]==="follow"&&x[2]==="me"&&x[0]===k&&R.key===j95key())}catch(e){return false}}})();
/* a record never synced yet (R.kh unset: just planned, nothing shown) is written from khắc 0 — else the khắc before the first sync would keep the raw plan */
(function(){const f0=j95fixHouse;j95fixHouse=function(R,kh,ppl){let n=f0.apply(this,arguments)||0;const k0=R&&R.kh==null?0:kh;try{n+=j95sPass(R,k0,ppl)}catch(e){j95sErr("pass",e)}try{n+=j95sGuard(R,k0,ppl)}catch(e){j95sErr("guard",e)}return n}})();
window.__j95s=()=>({stat:J95S.stat,guardBy:J95S.guardBy,errs:J95S.errs,ms:+(J95S.ms||0).toFixed(1),calls:J95S.calls||0,skip:J95S.skip||0});
/* READ API for the Dư đồ levels (map-zones: zone → palace → Chính điện / Đông viện / Tây viện → place view): who is at place k now (or at khắc kh),
   read from the ONE record — never a private copy. Each: {id, name, role, act, tgt, why, vis} (vis = counted as a bóng by j95vis, same as the map). */
function j95here(k,kh){try{const R=S.roster;if(!R||R.key!==j95key()||!k)return[];kh=kh==null?j95kh():kh;const L=[];
 for(const id in R.P){const x=R.P[id][kh];if(!x||!j95at(x[0],k))continue;L.push({id,name:(R.who[id]||[id])[0],role:(R.who[id]||["",""])[1],act:ACT95[x[1]]||x[1],tgt:x[2]?((R.who[x[2]]||[x[2]])[0]):"",why:x[3]||"",vis:j95vis(id,x[0])})}
 return L}catch(e){return[]}}
/* where one person is now: {place, placeName, act, tgt, why, kh} (her maids by record id: "mm:me", "s<sid>") */
function j95whereId(id,kh){try{const R=S.roster;if(!R||R.key!==j95key())return null;kh=kh==null?j95kh():kh;const x=R.P[id]&&R.P[id][kh];if(!x)return null;
 return{place:x[0],placeName:j95sPn(x[0]),act:ACT95[x[1]]||x[1],tgt:x[2]?((R.who[x[2]]||[x[2]])[0]):"",why:x[3]||"",kh}}catch(e){return null}}
Object.assign(window,{j95here,j95whereId});
