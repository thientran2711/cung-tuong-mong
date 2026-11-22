/* ================= j95s LIVE SERVANTS + REASONED RECORD (owner OD 18/11 ~19:30Z, OD L1901 points 2 + 3; brief live-servants) =================
   (2) Every maid / eunuch — HERS and everyone's (consorts, Hoàng hậu, Thái hậu's household) — lives her own day: a per-khắc plan of duties,
       meals, breaks, errands, visits to a friend, her daily rest turn and sleep (the night watch by turns), each with its cause (law 6b real people).
       When her mistress goes out she takes the people she PICKED for the day (owner OD 18/11 ~19:45Z (4), canon overwrite of the old rank retinue):
       the player in the entourage picker (end of this file), every NPC mistress once a day by her own reasons (trait, formal place, mood; trust
       picks who, BAL.slv.ent) — two-way law; the rest stay on their own plans.
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
 /* ENTOURAGE (owner OD 18/11 ~19:45Z point (4), CANON OVERWRITE of the old "retinue size by rank"): the player picks HOW MANY and WHO follow her the first
    time each day she leaves her palace (one picker a day, no adding once out); every NPC mistress picks the same way once a day by her own reasons.
    The NPC's share of her present + free people she takes: base, × her trait (pomp-lovers take more, the discreet few), × formal (going before the
    Emperor / Thái hậu: a fuller train), × moodLow when her mood is low; at least one when anyone is free (she never walks alone unless nobody is free);
    trust picks WHO (weight = lòng ^ loyalP); the close maid first when free unless her trait says otherwise (Kín đáo / Xảo quyệt take only the trusted). */
 ent:{base:.5,tr:{"Kiêu ngạo":1.8,"Ham vui":1.4,"Tham vọng":1.3,"Ân cần":1,"Khiêm nhường":.5,"Kín đáo":.3,"Xảo quyệt":.4,"Lạnh lùng":.6},formal:{dtd:1.5,thu:1.5,tn:1.5},moodLow:.6,loyalP:2,trustOnly:["Kín đáo","Xảo quyệt"],
  /* her mood counts as low at emoGet v ≥ mood.v and a feeling of level ≥ mood.lv (emoLv: 2 = sad / afraid / worried / jealous, 3 = angry);
     trust weight of a servant = max(lv.min, lòng (the close maid: lv.close; none recorded: lv.def)) / lv.unit, raised to loyalP */
  mood:{v:40,lv:2},lv:{min:5,close:100,def:50,unit:50}},
 /* her day: weights of each kind of khắc by canonical buổi slot 0 sáng · 1 trưa · 2 chiều · 3 tối (serve, clean, eat, brk = break, err = errand, vis = visit a friend, sleep) */
 /* err + vis at khắc 0 = the share of buổi she spends out (one errand or visit, the whole buổi) */
 day:[{serve:40,clean:30,eat:10,brk:5,err:15,vis:0,sleep:0},{serve:30,clean:10,eat:25,brk:20,err:10,vis:5,sleep:0},{serve:25,clean:20,eat:0,brk:15,err:20,vis:15,sleep:0},{serve:30,clean:5,eat:15,brk:10,err:0,vis:5,sleep:35}],
 closeServe:2.5,/* the close maid serves her mistress this many times more often */
 sleepFrom:2,/* tối: sleep only from this khắc (0-based) */
 sleepJit:1,/* + 0..sleepJit khắc per servant and day (some go to bed later: the late shift) */
 /* REST RHYTHM (MAIN 18/11 20:07Z, law 6b): each servant has ONE rest turn a day ("nghỉ theo lượt") in the buổi drawn by rest.buoi (canonical slot weights
    sáng · trưa · chiều · tối), rest.len khắc long; the night watch rotates through the household day by day, and last night's watcher sleeps in the
    first afterWatch khắc of sáng ("ngủ bù") */
 rest:{buoi:[10,55,35,0],len:[1,2]},afterWatch:2,
 /* WITNESSES + GOSSIP (owner OD 18/11 ~19:45Z): who stands at a place at a khắc sees what happens there (record rows: only her companions see her day);
    servants who meet (same place + khắc, in one of gos.acts) pass what they know: p (in 100) × (1 + qv(gos.q, the teller)), at most gos.hop hands from
    the eye-witness; each servant keeps gos.keep items, an item is forgotten after gos.days days. A servant who learns a thing tells her mistress by
    the kn chain's tell / keep choice (jagknow knTell; to the player: a TIN BÁO "bao" line). */
 gos:{p:30,q:{chuyen:1,trung:-.2,nhat:-.5,lanh:.2},hop:3,keep:24,days:3,acts:["eat","brk","shift","visit","errand","stay","clean","follow"]},
 run:[1,2],/* one thing lasts 1..2 khắc */
 err:{nvp:30,tyv:25,ksp:20,tgk:15},illTyv:3,/* errand places; Thái y viện × illTyv when her mistress is ill / with child */
 friendAf:30,/* a colleague in another palace she visits = thiện cảm at least this */
 night:1/* servants of a household on night watch (tối, the khắc others sleep) */}});
Object.assign(ACT95,{brk:"nghỉ tay giữa phiên",stay:"ở lại trông cung",nightw:"canh đêm",shift:"nghỉ theo lượt"});
/* (review FAIL 1, law 7) a servant's own deed (jagday / jagstaff slot, record act "ag_maid:<k>" / "ag_srv:<k>", k = an SRVA row of j42 or empTea) in
   player words — never the code key on screen. Secret deeds (spy, betray, frame, poison, pil, love matters) read as her own business: whoever looks
   (the picker, the map views) does not learn the secret for free (law 6a). dev/tools/roster.js reads this same table. */
const J95S_DW={sweep:"quét dọn trong cung",tea:"dâng trà hầu chủ",follow:"theo hầu chủ",nvp:"đi lĩnh đồ",rite:"học lễ nghi với cô cô",study:"luyện thêu thùa, chữ nghĩa",groom:"chải chuốt, giữ nhan sắc",rest:"nghỉ lấy sức",embro:"thêu khăn đem bán",med:"mua thuốc bổ",books:"quản sổ sách trong cung",errand:"đi việc chủ sai",spy:"lo việc riêng",massage:"đấm bóp hầu chủ",askRew:"xin chủ ban thưởng",tellMis:"bẩm tin cho chủ",askRec:"xin chủ tiến cử",beside:"đứng hầu bên chủ",greet:"đi thỉnh an",betray:"lo việc riêng",accuse:"đi tố giác",chat:"trò chuyện với bạn đồng liêu",gift:"tặng quà bạn đồng liêu",ask:"nhờ bạn đồng liêu giúp",frame:"lo việc riêng",tonic:"đi lấy thuốc bổ",learn:"học nghề thuốc",hail:"chào hỏi người quen",flirt:"lo việc riêng",token:"lo việc riêng",tryst:"lo việc riêng",vow:"lo việc riêng",cut:"lo việc riêng",listen:"đi nghe ngóng cho chủ",scout:"tự đi dò la cho chủ",watch:"canh chừng cung chủ",poison:"lo việc riêng",pil:"lo việc riêng",leave:"xin chủ cho đi hầu cung khác",empTea:"dâng trà nơi Hoàng thượng ngự"};
const J95S_DW0="lo việc riêng";/* any deed key still without a word (a new deed added later): never the key itself */
/* THE ONE act word for every player view of a record row (picker reasons, j95sWhy, j95here / j95whereId, the dev query) */
function j95sActW(a){a=a==null?"":String(a);const w=ACT95[a];if(w)return w;let m=/^ag_(?:maid|srv):(\w+)$/.exec(a);if(m&&J95S_DW[m[1]])return J95S_DW[m[1]];
 m=/^ag_(\w+)$/.exec(a);try{if(m&&typeof AGACTW==="object"&&AGACTW[m[1]])return AGACTW[m[1]]}catch(e){}return /^[\x00-\x7f]*$/.test(a)?J95S_DW0:a}
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
/* perf (outcome-identical): j95sv(id) scans every household's staff per call; one sid → servant table per call, built in j95sv's own order (first match wins) */
function j95sSvTab(){const M=new Map();try{for(const p of [S].concat(rivals,(S.thO?[S.thO]:[])))for(const s of (p&&p.staff)||[])if(s&&!M.has(s.sid))M.set(s.sid,s)}catch(e){}return M}
function j95sHouses(ppl){const H=new Map();const add=(o,q)=>{let h=H.get(o);if(!h){h=[];H.set(o,h)}h.push(q)};let SV=null;const sv=id=>{if(!SV)SV=j95sSvTab();const s=SV.get(+String(id).slice(1));return s===undefined?null:s};
 for(const p of ppl){if(p.kind==="mm"||p.kind==="st"){const o=p.ref;if(!o)continue;if(o!==S&&(!o.alive))continue;add(o,{id:p.id,kind:p.kind,close:j95sClose(o,p,sv),sv:p.kind==="st"?sv(p.id):null,name:p.name,home:p.home})}
  else if(p.kind==="el"&&p.ref&&!p.ref.eid&&p.home==="tn"&&!S.thDead)add("th",{id:p.id,kind:"el",close:!!(S.thO&&typeof thcOf==="function"&&thcOf(S.thO)===p.ref),sv:p.ref,name:p.name,home:"tn"})}
 return H}
/* q.close = her cung nữ thân cận (jtc, owner OD 20/11 ~15:55Z): the maid her master CHOSE (master.tc), no longer simply the personal maid (kind mm) */
function j95sClose(o,p,sv){try{if(typeof thcOf!=="function")return p.kind==="mm";const c=thcOf(o);if(!c)return false;return p.kind==="mm"?c===o.maid:c===sv(p.id)}catch(e){return false}}
/* ---------- her own day (per khắc, deterministic per buổi) ---------- */
function j95sErrand(o,r){const B=BAL.slv.err;const L=[];let ill=false;try{ill=o!=="th"&&o!==S?!!(illOf(o)||o.preg):!!(o===S&&(illOf(S)||S.preg))}catch(e){}
 for(const k in B){if(k==="nvp"&&!j95nvp())continue;L.push([k,B[k]*(k==="tyv"&&ill?BAL.slv.illTyv:1)])}const k=j95sPw(r,L);const ow=j95sOw(o);
 const why=k==="nvp"?`${ow} sai đi lĩnh đồ ở Nội vụ phủ`:k==="tyv"?(ill?`${ow} không khỏe, sai đi lấy thuốc ở Thái y viện`:`${ow} sai đi lấy thuốc bổ ở Thái y viện`):k==="ksp"?`${ow} sai đi Kính sự phòng hỏi chuyện`:`mang đồ của ${ow} xuống Tân Giả khố giặt`;
 return[k,"errand",null,why]}
function j95sFriend(q,o){const s=q.sv;if(!s||!s.af)return null;let best=null,ba=BAL.slv.friendAf-1;
 for(const k in s.af){const a=s.af[k];if(!(a>ba))continue;const x=J95S.sv?J95S.sv.get(+k):servById(+k);if(!x||x.out)continue;const m=ownerOf(x);if(!m||m===o||(m!==S&&(!m.alive||m.out)))continue;best=[x,m];ba=a}
 if(!best)return null;const pk=palaceOf(best[1]);return[pk,"visit","s"+best[0].sid,`hết phiên, sang ${j95sPn(pk)} thăm bạn thân ${best[0].name}`]}
function j95sServeWhy(c,ow){return ["hầu "+ow+" chải đầu, dâng trà sáng","dọn bữa trưa, hầu "+ow,"hầu "+ow+" buổi chiều","hầu "+ow+" dùng bữa tối, sửa soạn nghỉ"][c]||"hầu "+ow}
/* ---------- the rest rhythm (MAIN 18/11 20:07Z): per servant and DAY — her rest turn, her bedtime, the household's night watch by turns ---------- */
/* perf (outcome-identical): the rhythm is a pure function of (day, life seed, person, place in her household, household size, BAL.slv): memo per day */
/* (perf, same answer) the BAL key string is rebuilt only when one of its parts changed (same arrays, same numbers): the joins were most of this call */
function j95sRhSame(a,c){if(a.length!==c.length)return false;for(let i=0;i<a.length;i++)if(a[i]!==c[i])return false;return true}
function j95sRhBs(B){const c=J95S.rhb,R=B.rest;if(c&&c.f===B.sleepFrom&&c.j===B.sleepJit&&c.n===B.night&&j95sRhSame(R.buoi,c.a)&&j95sRhSame(R.len,c.l))return c.bs;
 const bs=R.buoi.join()+"/"+R.len.join()+"/"+B.sleepFrom+"/"+B.sleepJit+"/"+B.night;J95S.rhb={a:R.buoi.slice(),l:R.len.slice(),f:B.sleepFrom,j:B.sleepJit,n:B.night,bs};return bs}
function j95sRhythm(q,ix,n){const d=j95sDay(),sd=j95seed(),B=BAL.slv;const bs=j95sRhBs(B);
 const M=J95S.rh&&J95S.rh.d===d&&J95S.rh.sd===sd&&J95S.rh.bs===bs?J95S.rh.M:(J95S.rh={d,sd,bs,M:new Map()}).M;
 const k=q.id+"|"+ix+"|"+n;let v=M.get(k);if(!v){v=j95sRhythm0(q,ix,n);M.set(k,v)}return Object.assign({},v)}
function j95sRhythm0(q,ix,n){const B=BAL.slv;const d=j95sDay();const r=j95rng(j95hash(j95seed()+"|rest|"+d+"|"+q.id));
 const c=j95sPw(r,B.rest.buoi.map((w,i)=>[i,w]));const len=B.rest.len[0]+Math.floor(r()*(B.rest.len[1]-B.rest.len[0]+1));const k0=Math.floor(r()*(4-len+1));
 const sl=Math.min(3,B.sleepFrom+Math.floor(r()*(B.sleepJit+1)));const wn=Math.min(B.night,n);const rot=x=>((x%n)+n)%n;
 let watch=false,slept=false;for(let i=0;i<wn;i++){if(rot(d+i)===ix)watch=true;if(rot(d-1+i)===ix)slept=true}
 return{c,k0,len,sl,watch,slept:slept&&n>wn&&d>0}}/* d 0 = the first day of her life in the game: there was no night before (no "ngủ bù") */
function j95sLife(R,q,o,hk,Y){const B=BAL.slv;const c=R.c;const r=j95sRng(R,q.id);const ow=j95sOw(o);const oid=j95sOid(o);const W=Object.assign({},B.day[c]||B.day[0]);const watch=Y.watch;
 if(q.close)W.serve*=B.closeServe;if(!q.sv||q.kind==="el")W.vis=0;/* a visit needs a friend she has (servants with a thiện cảm book) */
 const out=[];let i=0;
 /* last night's watcher sleeps in at the start of sáng; the rest turn of the day; bedtime of the day (Y.sl) */
 if(c===0&&Y.slept)for(;i<Math.min(4,B.afterWatch);i++)out.push([hk,"sleep",null,"ngủ bù sau phiên canh đêm đêm qua"]);
 while(i<4){if(c===Y.c&&i===Y.k0&&i+Y.len<=4){for(let j=0;j<Y.len;j++,i++)out.push([hk,"shift",null,`đến lượt nghỉ của nàng (khắc ${Y.len>1?(Y.k0+1)+"–"+(Y.k0+Y.len):Y.k0+1}, mỗi ngày một lượt)`]);continue}
  let w=Object.assign({},W);if(c!==3||i<Y.sl)w.sleep=0;else w={sleep:1};/* from her bedtime on she sleeps (the watcher keeps watch) */
  if(c===Y.c)w.err=w.vis=0;/* her rest turn is in this buổi: she stays in */
  /* a walk out of her palace (an errand, a visit to a friend) takes the whole buổi: she sets out and comes back with the buổi change, never
     in the middle (her mistress's stage changes at the buổi change anyway; perf gate 4x per khắc) — at most one per buổi, decided at khắc 0 */
  if(i>0)w.err=w.vis=0;let k=j95sPw(r,Object.entries(w));let len=B.run[0]+Math.floor(r()*(B.run[1]-B.run[0]+1));let row;
  if(k==="err"||k==="vis")len=4;
  if(k==="vis"){row=j95sFriend(q,o);if(!row)k="brk"}
  if(k==="err")row=hk==="lc"?null:j95sErrand(o,r);if(k==="err"&&!row)k="clean";
  if(k==="sleep"&&watch)row=[hk,"nightw",oid,`đến phiên canh đêm cho ${ow}`];
  else if(k==="sleep")row=[hk,"sleep",null,`hết phiên, về phòng cung nhân ngủ (giờ ngủ của nàng: khắc ${Y.sl+1} buổi tối)`];
  if(!row){row=k==="serve"?[hk,"serve",oid,j95sServeWhy(c,ow)]:k==="clean"?[hk,"clean",oid,`đến phiên quét dọn ${hk==="lc"?"chỗ ở của "+ow:j95sPn(hk)}`]:k==="eat"?[hk,"eat",null,"đến giờ cơm của cung nhân"]:[hk,"brk",null,"xong việc, nghỉ tay trong phòng cung nhân"]}
  for(let j=0;j<len&&i<4;j++,i++){if(c===Y.c&&i===Y.k0&&i+Y.len<=4&&j>0)break;if(c===3&&i>=Y.sl&&k!=="sleep"&&j>0)break;out.push(row.slice())}}
 return out}
/* ---------- THE ENTOURAGE (owner OD 18/11 ~19:45Z (4)) — one pick a day per mistress: the player in the picker (below), every NPC by her own reasons ---------- */
/* free = she can be taken along now: at her palace, not on a deed / meeting / errand / visit of her own, not asleep or on her rest turn */
function j95sFree(x,hk){return !!x&&!j95sBusy(x)&&x[0]===hk&&x[1]!=="sleep"&&x[1]!=="nightw"&&x[1]!=="shift"}
function j95sNotFree(x){if(!x)return"không có trong cung";const a=x[1]||"";if(a==="sleep")return"đang ngủ";if(a==="shift")return"đang nghỉ theo lượt";if(a==="nightw")return"đang canh đêm";
 const w=j95sActW(a);return x[0]&&x[0]!=="home"&&!/^r\d+$/.test(x[0])?`${w} ở ${j95sPn(x[0])}`:`đang ${w}`}
function j95sDay(){try{return wk()}catch(e){return 0}}
/* the day's pick store (personal, lazy; old saves load): S.ent = the player's {d, ids, at}; S.entN = {d, P:{oid:{ids, why}}} the NPC mistresses' */
function j95sEntN(){const d=j95sDay();if(!S.entN||S.entN.d!==d)S.entN={d,P:{}};return S.entN}
/* an NPC mistress picks once a day at her first outing: how many by her reasons (trait, formal place, mood), who by trust */
function j95sNpcPick(R,o,oid,H,k,free){const B=BAL.slv.ent;const r=j95rng(j95hash(j95seed()+"|ent|"+j95sDay()+"|"+oid));let tr=[];try{tr=o==="th"?traitsOf("th"):traitsOf(o)}catch(e){}
 let f=B.base,why=[];for(const t of tr)if(B.tr[t]!=null){f*=B.tr[t];why.push(t.toLowerCase())}
 if(B.formal[k]){f*=B.formal[k];why.push("đi chầu nên cần đủ lễ")}
 try{const e=o!=="th"&&typeof emoGet==="function"?emoGet(o):null;if(e&&e.v>=B.mood.v&&emoLv(e.k)>=B.mood.lv){f*=B.moodLow;why.push("tâm trạng không vui")}}catch(x){}
 if(!free.length)return{ids:[],why:"không ai rảnh"};
 const n=Math.max(1,Math.min(free.length,Math.round(free.length*Math.min(1,f)+(r()-.5))));
 const trust=tr.some(t=>B.trustOnly.includes(t));const cl=free.find(q=>q.close);const mem=[];
 const lv=q=>Math.max(B.lv.min,q.close?B.lv.close:((q.sv&&q.sv.loyal)||B.lv.def));const lw=q=>Math.pow(lv(q)/B.lv.unit,B.loyalP);
 if(cl)mem.push(cl);/* the close maid first when she is free */
 const pool=free.filter(q=>!mem.includes(q));if(trust)pool.sort((x,y)=>lv(y)-lv(x));/* the discreet / scheming take the most trusted, no chance */
 while(mem.length<n&&pool.length){const q=trust?pool[0]:j95sPw(r,pool.map(x=>[x,lw(x)]));mem.push(q);pool.splice(pool.indexOf(q),1)}
 const ow=j95sOw(o);const cBusy=H.find(q=>q.close&&!free.includes(q));
 const w=(cBusy?`cung nữ thân cận ${cBusy.name} không rảnh, `:"")+`${ow} chọn ${mem.length===H.length&&H.length>1?"cả "+mem.length+" người":mem.length+" người"} theo hầu`+(why.length?` (${why.join(", ")})`:"")+(trust?", chỉ người tin cẩn":"");
 return{ids:mem.map(q=>q.id),why:w}}
/* the player's pick of today, or (no picker today: a summons, an event moved her) the NPC rule for her too, said so in the reason */
function j95sPickOf(R,o,oid,H,k,free){const d=j95sDay();
 if(o===S){const E=S.ent;if(E&&E.d===d)return{ids:(E.ids||[]).slice(),why:E.ids&&E.ids.length?`ngươi chọn ${E.ids.length} người theo hầu hôm nay`:"ngươi đi một mình hôm nay",me:1};
  const P=j95sNpcPick(R,o,oid,H,k,free);P.why="ngươi đi gấp, không kịp chọn: "+P.why.replace(/^.*?ngươi chọn/,"theo lệ chọn");return P}
 /* stored once she really takes someone; nobody free at this outing → she walks alone now and picks at her next outing */
 const N=j95sEntN();if(N.P[oid])return N.P[oid];const P=j95sNpcPick(R,o,oid,H,k,free);if(P.ids.length)N.P[oid]=P;return P}
function j95sPick(R,o,oid,H,k,s0,base,kh,prev){
 /* an outing already under way (started before this khắc): those already walking with her stay with her */
 if(prev&&prev.length)return{mem:H.filter(q=>prev.includes(q.id)&&!j95sBusy(base[q.id][kh])),why:null};
 const at=Math.max(s0,kh);const free=H.filter(q=>j95sFree(base[q.id][at],q.home));const P=j95sPickOf(R,o,oid,H,k,free);
 /* the day's pick ∩ who is still free now (a picked maid called away by a deed does not walk; nobody is added once out) */
 const mem=H.filter(q=>P.ids.includes(q.id)&&free.includes(q));const gone=H.filter(q=>P.ids.includes(q.id)&&!free.includes(q));
 return{mem,why:P.why+(gone.length?`; ${gone.map(q=>q.name+" "+j95sNotFree(base[q.id][at])).join(", ")}`:"")}}
function j95sPass(R,kh,ppl){if(!j95sOn())return 0;const t0=performance.now();let n=0;const st=J95S.stat;const H=j95sHouses(ppl);
 /* nothing changed since the last pass (same buổi and khắc, same places of every mistress, same households and planned deeds, and her
    people's rows are still the ones written then): skip — j95sync runs several times per khắc (perf gate: 4x per-khắc ≤ +10 %) */
 let dOn=false;try{dOn=typeof agDOn==="function"&&agDOn()}catch(e){}let sig=R.key+"|"+(S.ent&&S.ent.d===j95sDay()?S.ent.ids.join(","):"-");const mem=[];
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
  const base={};
  hh.forEach((q,ix)=>{const e=R.P[q.id];if(!e)return;const hk=q.home;let L=null;
   /* a deed she planned for this buổi (jagday / jagstaff slot) is where she is */
   try{if(q.kind==="st"&&typeof agDOn==="function"&&agDOn()){const sl=agDaySlot(q.id);if(sl&&sl.k)L=agRow(sl)}}catch(x){}
   if(!L&&hk!=="lc"){const Y=j95sRhythm(q,ix,hh.length);const ck=q.id+"|"+hk+"|"+[Y.c,Y.k0,Y.len,Y.sl,Y.watch?1:0,Y.slept?1:0].join(",");L=LC[ck]||(LC[ck]=j95sLife(R,q,o,hk,Y))}
   const b=[];for(let i=0;i<4;i++){const x=e[i];b.push(i<kh||j95sKeep(x)||!L?x:L[i])}base[q.id]=b});
  /* her outings from this khắc on: runs of khắc away from home */
  const away=i=>{const k=op[i]&&op[i][0];return !!k&&k!==hk0&&k!=="lc"&&k!==J95OUT_&&hk0!=="lc"};
  const ret={};/* id → [i...] */const why={};
  for(let i=kh;i<4;){if(!away(i)){i++;continue}const k=op[i][0];let s0=i;while(s0>0&&op[s0-1]&&op[s0-1][0]===k)s0--;let e0=i;while(e0+1<4&&op[e0+1]&&op[e0+1][0]===k)e0++;
   let prev=null;if(s0<kh){prev=hh.filter(q=>{const x=R.P[q.id]&&R.P[q.id][kh-1];return x&&(x[1]==="follow"||x[1]==="go"&&x[0]===k)&&x[2]===oid}).map(q=>q.id)/* on her way to her (jwalk, review/jagday-walk) = in the retinue */}
   const P=j95sPick(R,o,oid,hh,k,s0,base,kh,prev);const ow=j95sOw(o);
   for(const q of P.mem){const w=prev&&prev.length?`theo hầu ${ow} ở ${j95sPn(k)} (đi cùng từ đầu)`:`${ow} sang ${j95sPn(k)}: ${P.why}`;
    for(let j=Math.max(i,kh);j<=e0;j++){const bj=base[q.id][j];if(bj&&bj[1]==="go"&&bj[0]===k&&bj[2]===oid){(ret[q.id]=ret[q.id]||{})[j]=bj;continue}/* still on her way to her (jwalk) */if(j95sKeep(bj))break;/* only a deed / meeting takes her away mid-outing; her own day waits */(ret[q.id]=ret[q.id]||{})[j]=[k,"follow",oid,w]}
    st.ret++;if(q.close)st.close++}
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
 if(a==="go"){for(let j=i+1;j<4;j++){const y=R.P[id][j];if(y&&y[0]===k&&y[1]!=="go")return`đang đến ${pn} để ${j95sActW(y[1])}`}return`đang đi đến ${pn}`}
 if(/^ag_/.test(a))return`việc nàng tự định trong ngày: ${j95sActW(a)}${tn?" với "+tn:""}`;
 if(kind==="man"){const m=(S.men||[]).find(z=>z.id===id);const rw=m&&m.rw;return rw==="thái y"?"phiên trực ở Thái y viện":rw==="thị vệ"?"phiên canh gác trong cung":rw?`được triệu vào cung (${rw})`:"được triệu vào cung"}
 if(a==="serve"||a==="clean")return`${ACT95[a]}${tn?" cho "+tn:""} theo lịch trong ngày`;
 if(a==="rest"||a==="here")return k==="home"||/^r\d+$/.test(k||"")?"ở cung mình nghỉ ngơi":`nghỉ ở ${pn}`;
 return`${a?j95sActW(a):"ở"} ở ${pn}`}
function j95sGuard(R,kh,ppl){let n=0;let K=null;const OK=J95S.ok||(J95S.ok=new WeakSet());/* a row checked once is not checked again (rows are replaced, never edited in place) */
 for(const id in R.P){if(id==="me")continue;const e=R.P[id];for(let i=kh;i<4;i++){const x=e[i];if(!x)continue;{const w0=x[3];/* (perf, same answer) a real reason (a string, not filler, no edge blanks) is never touched: skip before the WeakSet */if(typeof w0==="string"&&w0.length>8&&w0!=="phận sự trong cung"&&w0.charCodeAt(0)>32&&w0.charCodeAt(w0.length-1)>32)continue}if(OK.has(x))continue;OK.add(x);if(!x[0]||x[0]===J95OUT_)continue;const w=x[3]==null?"":String(x[3]).trim();if(!J95S_FILL.has(w))continue;
   if(!K){K={};for(const p of ppl)K[p.id]=p.kind}
   const nw=j95sWhy(R,id,i,x,K[id]);if(nw&&nw!==w){e[i]=[x[0],x[1],x[2],nw];n++;J95S.guardBy[K[id]||id[0]]=(J95S.guardBy[K[id]||id[0]]||0)+1}}}
 J95S.stat.guard+=n;return n}
/* her party at a place = herself and every one of her people walking with her (not shadows, not drawn as others: the map counts the people
   she would MEET there) — was: only her close maid (j95party) */
(function(){const p0=j95party;j95party=function(id,k){if(id==="me")return true;/* cheap rejects first: countAt asks this for every person at every place */
 if(k!==S.place||k==="home"||!id||(id[0]!=="s"&&id[0]!=="m"))return false;/* (perf, same answer: p0 = "me", or "mm:me" here at a place ≠ home — both met above) */if(p0(id,k))return true;if(!BAL.slv.on)return false;try{const R=S.roster;const e=R&&R.P[id];if(!e)return false;const x=e[j95kh()];return !!(x&&x[1]==="follow"&&x[2]==="me"&&x[0]===k&&R.key===j95key())}catch(e){return false}}})();
/* a record never synced yet (R.kh unset: just planned, nothing shown) is written from khắc 0 — else the khắc before the first sync would keep the raw plan */
(function(){const f0=j95fixHouse;j95fixHouse=function(R,kh,ppl){let n=f0.apply(this,arguments)||0;const k0=R&&R.kh==null?0:kh;try{n+=j95sPass(R,k0,ppl)}catch(e){j95sErr("pass",e)}try{n+=j95sGuard(R,k0,ppl)}catch(e){j95sErr("guard",e)}return n}})();
window.__j95s=()=>({stat:J95S.stat,guardBy:J95S.guardBy,errs:J95S.errs,ms:+(J95S.ms||0).toFixed(1),calls:J95S.calls||0,skip:J95S.skip||0});
/* READ API for the Dư đồ levels (map-zones: zone → palace → Chính điện / Đông viện / Tây viện → place view): who is at place k now (or at khắc kh),
   read from the ONE record — never a private copy. Each: {id, name, role, act, tgt, why, vis} (vis = counted as a bóng by j95vis, same as the map). */
function j95here(k,kh){try{const R=S.roster;if(!R||R.key!==j95key()||!k)return[];kh=kh==null?j95kh():kh;const L=[];
 for(const id in R.P){const x=R.P[id][kh];if(!x||!j95at(x[0],k))continue;L.push({id,name:(R.who[id]||[id])[0],role:(R.who[id]||["",""])[1],act:j95sActW(x[1]),tgt:x[2]?((R.who[x[2]]||[x[2]])[0]):"",why:x[3]||"",vis:j95vis(id,x[0])})}
 return L}catch(e){return[]}}
/* where one person is now: {place, placeName, act, tgt, why, kh} (her maids by record id: "mm:me", "s<sid>") */
function j95whereId(id,kh){try{const R=S.roster;if(!R||R.key!==j95key())return null;kh=kh==null?j95kh():kh;const x=R.P[id]&&R.P[id][kh];if(!x)return null;
 return{place:x[0],placeName:j95sPn(x[0]),act:j95sActW(x[1]),tgt:x[2]?((R.who[x[2]]||[x[2]])[0]):"",why:x[3]||"",kh}}catch(e){return null}}
Object.assign(window,{j95here,j95whereId});
/* ================= THE PLAYER'S ENTOURAGE PICKER (owner OD 18/11 ~19:45Z point (4), verbatim in the brief) =================
   The FIRST time in a day she leaves her palace (a place tapped on Dư đồ, or an act that walks her there), ONE card asks who follows her: any number,
   up to all her people who are at the palace AND free now (close maid + maids + eunuchs); one who is out, asleep, on her rest turn or busy is shown
   greyed with the reason (kit GREYED OPTION, jgrey kitOff). Tap a person = picked / not picked (kit option row + the kit selection outline .ksel,
   aria-pressed, the same pattern as the identity card's road choice). "Lên đường" walks with the picked ones, "Đi một mình" alone, "Thôi" = she stays
   (the card comes again on her next departure). Once she has left, the picker does not come back that day (no adding people once out); the pick
   holds for every outing of the day (each time: the picked ones who are still free). Store: S.ent = {d: day, ids, at}. Kit parts only (dialog card,
   option rows, .ksel, kitOff). Gain and loss (law 3): who walks with her sees what she sees (more eyes: news reaches her from them, jagknow), and
   knows what she does there (more mouths: they may tell it on, the gossip chain); who stays keeps the palace. Two-way: NPC mistresses pick by
   j95sNpcPick. Off in co-op (j95on false: the record is off there) and for a servant start (isSrv) / a home life (isKc). */
function j95sMine(){const R=S.roster;if(!R||R.key!==j95key())return[];const kh=j95kh();const L=[];
 const add=(id,s,role,close)=>{const e=R.P[id];if(!e)return;const x=e[kh];L.push({id,s,name:s.name,role,close,x,free:j95sFree(x,"home")})};
 const tcI=s=>typeof thcIs==="function"?thcIs(S,s):s===S.maid;/* jtc: the close one = her chosen thân cận */
 if(S.maid&&S.maid.name)add("mm:me",S.maid,kitMaidTitle(),tcI(S.maid));
 for(const s of S.staff||[])if(s&&!s.out&&s.sid!=null)add("s"+s.sid,s,s.role==="eunuch"?"Thái giám":tcI(s)?"Cung nữ thân cận":"Cung nữ",tcI(s));
 return L}
const J95S_ENT_T=["Hôm nay ra khỏi cung, ngươi dẫn ai theo? Chọn bao nhiêu người cũng được, trong những người đang ở cung và rảnh. Đã đi rồi thì hôm nay không gọi thêm người được nữa.","Người theo hầu thấy những gì ngươi thấy, có thêm tai mắt cho ngươi; nhưng họ cũng biết việc ngươi làm và có thể kể lại với người khác. Người ở lại trông cung."];
function j95sEntAsk(k){const L=j95sMine();if(!L.some(p=>p.free))return false;/* nobody free: no card, she goes alone; the card comes at her next departure */
 const opts=L.map(p=>{const c={n:p.name,fx:{},kgp:p.s,entId:p.id,sel:p.free&&p.close,x:`(${p.role.toLowerCase()}, thiện cảm ${Math.round(p.s.loyal||0)}${p.free?", đang ở cung và rảnh":""})`};/* not free: her reason is the Cần row (kitOff), never repeated here *//* a person's status = neutral info: the kit Ghi chú row (a whole "(…)" value), the same for every person row (review FAIL 3) */
  if(!p.free)kitOff(c,j95sNotFree(p.x),"không theo được hôm nay");return c});
 const go=ids=>{S.ent={d:j95sDay(),ids,at:k};let ok=false;try{goTo(k);ok=S.place!=="home"||Q.length>0}catch(e){j95sErr("ent",e)}if(!ok)delete S.ent;/* she did not leave (a gate, no khắc): the card comes again */};
 const goOpt={n:"Lên đường",fx:{},entGo:1,x:"",go:()=>go(opts.filter(c=>c.entId&&c.sel&&!c.off).map(c=>c.entId))};
 opts.push(goOpt,{n:"Đi một mình",fx:{},x:"thành: việc ngươi làm bên ngoài được giữ kín, mọi người ở lại trông cung · mất: không ai thấy giùm ngươi",go:()=>go([])},{n:"Thôi",fx:{},x:""});
 j95sEntX(opts);
 /* no `who`: a list of her people, nobody speaks — a person pop-up always carries the event banner (KIT 50 / OD:L448), and law 10 allows a big
    picture only when the content fits without scrolling (review FAIL 4); the people are the option rows themselves */
 Q.push({t:"Chọn người theo hầu",h:`<p>${J95S_ENT_T[0]}</p><p class="past">${J95S_ENT_T[1]}</p>`,opts,entp:1,pid:"entpick"});/* a picker she opened herself (her tap on Dư đồ), not an event: the kit act-picker switch (jk2b KIT_ACT_PIDS, as jpoison / jts) = no event picture (law 10: the list scrolls) */
 showModal();return true}
try{KIT_ACT_PIDS.add("entpick")}catch(e){}
function j95sEntX(opts){const g=opts.find(c=>c.entGo);if(!g)return;const n=opts.filter(c=>c.entId&&c.sel&&!c.off);
 g.x=n.length?`thành: ${n.length} người theo (${n.map(c=>c.n).join(", ")}), thấy giùm ngươi những gì xảy ra · mất: họ biết việc ngươi làm, có thể kể lại với người khác`:"(chưa chọn ai, bấm vào tên để chọn người theo)";
 if(!n.length)kitOff(g,"chưa chọn ai","bấm vào tên người muốn dẫn theo");else delete g.off}
/* the picked rows wear the kit selection outline; a tap on a person toggles her (the card stays open) */
function j95sEntMark(){const m=Q[0];if(!m||!m.entp)return;document.querySelectorAll("#modal .opt[data-m]").forEach(b=>{const c=m.opts[+b.dataset.m];if(!c||!c.entId)return;b.classList.toggle("ksel",!!c.sel);b.setAttribute("aria-pressed",c.sel?"true":"false")})}
/* the kit's event-art lookup (jk4 kitEvArt) tags any shown item with a guessed evId (text "tai mắt" → cat:tu-tinh); on the re-render after a tap
   that tag would pull the event picture onto this act picker (jk2b want = …||m.evId) — the picker is not an event (KIT_ACT_PIDS), so the guess is
   dropped before each render (KIT REQUEST filed: dev/kit/KIT_REQUESTS.md "kitEvArt evId tag on act pickers") */
(function(){const s0=showModal;showModal=function(){try{const m=Q[0];if(m&&m.entp)delete m.evId}catch(e){}const r=s0.apply(this,arguments);try{j95sEntMark()}catch(e){}return r}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#modal .opt[data-m]");if(!b)return;const m=Q[0];if(!m||!m.entp)return;const c=m.opts[+b.dataset.m];if(!c||!c.entId)return;
 e.preventDefault();e.stopImmediatePropagation();if(c.off)return;c.sel=!c.sel;j95sEntX(m.opts);showModal()},true);
/* the gate: her first departure of the day from her palace asks first (inner gates — access card, walk — still run when she really goes) */
function j95sEntNeed(k){try{if(!j95sOn()||!j95on()||!S||S.dead||S.out||S.confined||Q.length)return false;if(!k||k==="home"||S.place!=="home"||k===S.place)return false;
  if(window.__accSilent||window.__accStay||window.__j95sEntOff)return false;if(typeof isSrv==="function"&&isSrv())return false;if(typeof isKc==="function"&&isKc())return false;
  if(S.ent&&S.ent.d===j95sDay())return false;if(typeof accessOf==="function"){const a=accessOf(S,k);if(a&&!a.ok)return false}return true}catch(e){return false}}
(function(){const g0=goTo;goTo=function(k){if(j95sEntNeed(k)&&j95sEntAsk(k))return;return g0.apply(this,arguments)}})();
Object.assign(window,{j95sMine,j95sEntAsk});
