/* ================= jagknow: AG-ALL-2c — WHO KNOWS a happening (Tai mắt, presence, servants, friends) + the TIN BÁO API + servants' own errands =================
   Owner (verbatim, OD 17/11 ~14:50Z): "Tôi muốn là buổi hôm đó là có bao nhiêu sự kiện có thể xảy ra là nó đều xuất hiện, còn sự lựa chọn là sự lựa chọn
   của tôi" → (1) no cap; (2) TIN BÁO: what she sees depends on Tai mắt; a top-bar '!' badge opens a kit card "who brings the news + where + a line in that
   person's own voice by trait and liking"; NPCs learn news by the same rules (two-way).
   Owner (verbatim, OD 17/11 ~15:00Z): "cái người cung nữ của tôi ... có cái option dò la ... tôi bấm nó đi dò la thì nó mới đi dò, chứ nó không có tự đi dò
   giùm tôi ... sẽ có những đứa nó bán đứng chủ tử, sẽ có những đứa nó trung thành ... theo cái tâm tính ... tính cách ... cái thanh thiện cảm của nó đối với
   tôi" → her own servants act for her on their own (dò la, nghe ngóng, canh chừng, báo tin) by lòng / nết; the disloyal keep quiet or sell the news.
   1. ONE RULE knFor(x, h) for her (x = S) and every consort x: x knows a happening h (an entry of agHap: a real deed / the Emperor's walk / a fixed one) when
      a. she is there: her record row is at h's place at a khắc of h's window that has come (presence; fixed calendar happenings: everyone knows);
      b. her own Tai mắt: oSee(x) × BAL.ag.know.eye (the player's watch formula, j8), drawn ONCE per happening (hashed: the '!' never flickers);
      c. one of her servants knows it — the servant stood there (her row), or roams on her own errand "Nghe ngóng cho chủ" (SRVA.listen odds), or keeps
         watch at home ("Canh chừng cung chủ", a happening at her master's palace) — AND chooses to tell her: mindPick tell / keep / sell by lòng and
         nết (BAL.ag.know.tell); a bought servant (spyFor) may sell it to the one who bought her instead (that one knows it); never a lie (j43 rule 5);
      d. a consort who likes her (aff ≥ BAL.ag.know.friend) and meets her this khắc (or is close, aff ≥ BAL.ag.know.close, and sends word) knows it
         by a–c and chooses to pass it on (tell / keep by her liking; one hop).
      The informer is that person: "s<sid>" (servant), "v<id>" (friend), "mat" (her own eyes and ears), "here", "le" (calendar).
   2. G2 the Dư đồ '!' shows only the happenings she knows (+ where she stands). G1: adHapArrive fires every happening of that place (jact.js).
   3. TWO-WAY: a consort who knows a happening may go and "Nghe lén" there (the player's witness-card button, jagent agReact): option "know:hear" through the
      day plan (agReg consort "know") and as one of her extra deeds of the buổi (part 2b agMore reads the same providers), or when the news reaches
      her after the buổi's choices (knReact); same odds (agHearOf, one function), same gain (chứng cứ +1 on a scheme), the same loss when caught.
      The NPCs who merely stand there react through part 2b agSeeNpc; this deed is going there BECAUSE she heard of it.
   4. SERVANTS' OWN ERRANDS (SRVA rows listen / scout / watch, j42; the player maid's cards "Nghe ngóng cho chủ", "Tự đi dò la cho chủ", "Canh chừng cung chủ"):
      every servant of every master (hers included) may choose them (agReg maid / srv "know"), weighted by lòng (BAL.ag.know.serve) and her master's danger;
      Tự đi dò la = the consort's "Sai đi dò la" formula spyRoll(master, target, servant) (jwhy) and result; a harm deed landing at a palace kept by a
      watching servant is seen (chứng cứ +1 for the master when the servant tells). Results for her come as TIN BÁO "bao" items in the servant's voice.
   5. TIN BÁO API (main builds the badge + card; no UI here): tinBaoList() → [{id,k,place,b,k0,k1,who,line,by,seen}], tinBaoNew() → unseen count,
      tinBaoOn(fn) → fn(item) on each newly known item, tinBaoSeen(id?) marks seen (all when no id). Personal state S.tb (lazy; old saves load).
   Numbers: BAL.ag.know (jbal2). Off with the loop (agOn) — then every '!' shows as before.
   ===================================================================================================================================================== */
const KN={stat:{scan:0,known:0,hidden:0,tell:0,keep:0,sell:0,hear:0,hearOk:0,watch:0,scout:0,scoutOk:0,listen:0},cb:[],m:null};
function knB(){return BAL.ag.know}
function knOn(){try{return typeof agOn==="function"&&agOn()&&!!knB()&&!window.__knOff}catch(e){return false}}
/* a draw fixed per happening and person: the same answer on every read of the same buổi (a '!' does not blink in and out) */
function knH(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return ((h>>>0)%10000)/100}
function knSeed(){S.tb=S.tb||{};if(S.tb.seed==null)S.tb.seed=Math.floor(Math.random()*1e9);return S.tb.seed}
function knHit(tag,p){return knH(knSeed()+"|"+tag)<p}
function knMemo(){const k=agKey();if(!KN.m||KN.m.key!==k)KN.m={key:k,x:{},t:{},at:{},kh:-1};let kh=0;try{kh=agKh()}catch(e){}if(KN.m.kh!==kh){KN.m.kh=kh;KN.m.x={}}/* AG-ALL-2d: who knows is re-read each khắc (news travels khắc by khắc); the tell / keep choices (t) stay for the buổi */return KN.m}
/* per-khắc chain (owner OD 17/11 ~15:45Z L1638; timing overwritten by OD 17/11 ~17:55Z (3) "theo đường đi thật, gần thì khắc 2, xa thì khắc 3 trở đi"):
   news carried by someone (a servant, her Tai mắt, a friend sending word) reaches the master after the bearer's REAL Dư đồ walk from where she saw
   it to where the master stands (agWalk = travel(): near → known the next khắc, far → two khắc later). Seeing it oneself (presence), one's own deed
   and the calendar are known at once; a friend met face to face passes on what she knows. */
/* AG-ALL-2d4 (owner OD 17/11 ~17:55Z (3) "theo đường đi thật"): the delay is the bearer's REAL Dư đồ walk (agWalk = travel(): near 1 / far 2) from
   where she saw it to where her master stands — knWalkTo. knRelay = the LONGEST such walk (BAL.walk.far; 0 = relay off), used only to bound the
   buổi-end carry. */
function knRelay(){try{const B=BAL.ag.kh2.rd;return agRdOn()&&((B.see||0)+(B.go||0))?Math.max(BAL.walk.near||1,BAL.walk.far||1):0}catch(e){return 0}}
function knWalkTo(from,id,kh,who){if(!knRelay())return 0;let to=null;try{to=knAt(id,Math.max(0,Math.min(kh,J95.KH-1)))}catch(e){}return agWalk(from,to||"home",who)}/* who = the bearer when known (her own road, j9 per walker); a passer-by / messenger: null */
function knSrvFrom(s,how,h){if(how==="listen"){const k=s&&s.sid!=null?knSlotK(s):"";const pl=String(k||"").split(":")[0];if(pl&&pl!=="listen")return pl}return h.k}
function knFirst(id,h,w){for(let kh=w[0];kh<=w[1];kh++)if(knAt(id,kh)===h.k)return kh;return -1}
function knId(x){return x===S?"me":x&&x.sid!=null?"s"+x.sid:x&&x.id!=null?"v"+x.id:""}
/* a servant's key: her sid, or "cm<master>" for a confidant maid (S.maid / v.maid carry no sid) */
function knSid(s,m){return s.sid!=null?String(s.sid):"cm"+knId(m)}
/* ---------- a happening: id, window, people ---------- */
function knHid(h){let b="";try{b=bkey()}catch(e){}return b+":"+h.k+":"+h.id+":"+(h.x&&h.x.pid||"")}
function knPend(h){try{return h.x&&h.x.pid&&typeof haPend==="function"?haPend(h.x):null}catch(e){return null}}
function knWin(h){const kh=agKh(),KH=J95.KH;const p=knPend(h);if(p)return (h.w0=[p.kh,(p.k1!=null?p.k1:p.kh)+(p.sp>0?p.sp:0)]);/* runs on into the next buổi: its real end (day-khắc audit) */
 if(h.id==="emp"){try{const R=agRec();if(R&&R.P.emp){let a=-1,b=-1;for(let k=kh;k<KH;k++)if(R.P.emp[k]&&R.P.emp[k][0]==="vuon"){if(a<0)a=k;b=k}if(a>=0)return (h.w0=[h.w0?Math.min(h.w0[0],a):a,b])}}catch(e){}}
 /* AG-ALL-2d2: a deed that has landed (no pending row any more) / the Emperor gone from the garden keeps the window it had: it is OVER, not "now" */
 if(h.w0&&!knFixed(h))return h.w0;
 return [kh,KH-1]}
function knWho(h){const p=knPend(h);if(p){const L=[p.id||("v"+p.vid)];if(p.t)L.push(p.t);return L}if(h.id==="emp")return ["emp"];return []}
/* public: the calendar and world happenings (a festival …) everyone knows; the Emperor's walk and a cold-palace night follow the rule */
function knFixed(h){return !(h.x&&h.x.pid)&&h.id!=="emp"&&h.id!=="cold"}
/* where a person stands at khắc kh (record row; co-op: S.where) */
function knAt(id,kh){try{const R=agRec();if(R&&R.P[id]&&R.P[id][kh])return R.P[id][kh][0];if(id==="me")return S.place;const v=id[0]==="v"?RV(+id.slice(1)):null;return v?whereOf(v):null}catch(e){return null}}
function knThere(id,h,w){const now=agKh();if(now<w[0])return false;for(let kh=w[0];kh<=Math.min(now,w[1]);kh++)if(knAt(id,kh)===h.k)return true;return false}
/* ---------- a servant knows it; then she tells, keeps it, or sells it ---------- */
function knSlotK(s){try{const sl=typeof agDaySlot==="function"?agDaySlot("s"+s.sid):null;if(sl&&sl.k)return sl.k;const P=S.agS&&S.agS.d===wk()&&S.agS.P[s.sid];const x=P&&P[Math.min(3,S.buoi||0)];return x&&x.k||""}catch(e){return""}}
function knSrvKnows(s,m,h,w,hid){const sk=knSid(s,m);
 /* the confidant maid has no row and no plan: she is about her mistress's errands all day and listens on her own (the "Nghe ngóng" odds × her lòng) */
 /* live servants (j95s, owner OD 18/11 ~19:45Z (4)): she has a row now — she knows it only where she stood (with her mistress when picked to follow,
    at the palace otherwise); out on an errand or a visit she may overhear it on the way (the same "Nghe ngóng" odds) */
 if(s.sid==null&&knwMid(s,m)){const mid=knwMid(s,m);if(knThere(mid,h,w))return"here";const R=agRec();const x=R&&R.P[mid]&&R.P[mid][Math.min(agKh(),J95.KH-1)];
  return x&&(x[1]==="errand"||x[1]==="visit")&&knHit("l"+sk+"|"+hid,odA(s,SRVA.listen.o(s))*cl(s.loyal||0,0,100)/100)?"listen":""}
 if(s.sid==null)return knHit("l"+sk+"|"+hid,odA(s,SRVA.listen.o(s))*cl(s.loyal||0,0,100)/100)?"listen":"";
 if(knThere("s"+s.sid,h,w))return"here";const k=knSlotK(s);
 if(/:watch$/.test(k)&&m&&h.k===palaceOf(m))return"watch";
 if(/:listen$/.test(k)&&knHit("l"+sk+"|"+hid,odA(s,SRVA.listen.o(s))))return"listen";return""}
function knTellQ(s){return qv(knB().tell.q,s,0)}
function knTell(s,m,hid){const M=knMemo();const kk=knSid(s,m)+"|"+hid;if(M.t[kk])return M.t[kk];const T=knB().tell;const lo=cl(s.loyal||0,0,100)/100;
 const O=[["tell",Math.max(.01,lo*T.tell*(1+knTellQ(s)))],["keep",Math.max(.01,(1-lo)*T.keep*(1-knTellQ(s)))]];
 if(s.spyFor!=null&&byKey(s.spyFor)&&byKey(s.spyFor)!==m)O.push(["sell",(1-lo)*T.sell]);
 let c="keep";try{c=mindPick(O,s)||"keep"}catch(e){}KN.stat[c]=(KN.stat[c]||0)+1;
 if(c==="sell"){const b=byKey(s.spyFor);if(b&&b!==S)M.x[knId(b)+"|"+hid]={by:"s"+knSid(s,m),how:"sell"}}
 return M.t[kk]=c}
function knStaff(x){let L=[];try{L=((x===S?S.staff:x&&x.staff)||[]).slice()}catch(e){}if(x&&x.maid&&!L.includes(x.maid))L.push(x.maid);return L.filter(s=>s&&!s.out&&s.name)}
/* ---------- THE RULE ---------- */
function knFor(x,h,noFriend){if(!x)return null;const hid=knHid(h);const M=knMemo();const id=knId(x);const mk=id+"|"+hid+(noFriend?"|n":"");if(M.x[mk]!==undefined)return M.x[mk];
 if(!noFriend&&M.x[id+"|"+hid]&&M.x[id+"|"+hid].how==="sell")return M.x[id+"|"+hid];
 let r=null;const w=knWin(h);
 if(knFixed(h))r={by:"le",how:"le"};
 else if(knThere(id,h,w))r={by:"here",how:"here"};
 else{const wh=knWho(h);if(wh[0]===id)r={by:"here",how:"self"};}/* the doer knows her own deed */
 const now=agKh(),D=knRelay();
 if(!r){for(const s of knStaff(x)){const how=knSrvKnows(s,x,h,w,hid);if(!how)continue;const q=Math.max(how==="here"&&s.sid!=null?knFirst("s"+s.sid,h,w):w[0],w[0]);
   /* the confidant maid walks with her mistress (one khắc to step aside and tell); any other servant walks from where she saw / heard it */
   const at=q+(s.sid==null&&!knwMid(s,x)?Math.min(1,D):knWalkTo(knSrvFrom(s,how,h),id,q,s&&s.sid!=null?s:null));if(at>now){KN.stat.wait=(KN.stat.wait||0)+1;continue}/* still on her way to tell */if(knTell(s,x,hid)==="tell"){r={by:"s"+knSid(s,x),how,s,at};break}}}
 if(!r){let o=0;try{o=oSee(x,false)*knB().eye/100}catch(e){}if(knHit("e"+id+"|"+hid,o)){const at=w[0]+knWalkTo(h.k,id,w[0]);/* her Tai mắt / a passer-by walks from the place to her */if(at<=now){r=knEye(x,h,hid);if(r)r.at=at}}}
 if(!r&&!noFriend){const F=knB().friend;for(const v of liveRivals(true)){if(v===x||!v.alive||v.out)continue;const a=aff(v,x);if(a<F)continue;/* the news travels when they meet (same place this khắc), or a close friend sends word (aff ≥ close) */const meet=(()=>{const nw=agKh();return knAt(id,nw)!=null&&knAt("v"+v.id,nw)===knAt(id,nw)})();if(a<knB().close&&!meet)continue;const k=knFor(v,h,true);if(!k||k.by==="le"||k.how==="self")continue;
   let fa=now;if(!meet&&D>0){const ka=M.at["v"+v.id+"|"+hid+"|n"];if(ka==null)continue;fa=ka+knWalkTo(knAt("v"+v.id,ka),id,ka);if(fa>now)continue}/* sending word: her messenger's real walk from where she was when she knew to x (AG-ALL-2d4) */
   /* she passes it on or keeps it to herself: her choice by how much she likes x (the servant's rule, thiện cảm for lòng) */
   const kk="f"+v.id+">"+id+"|"+hid;if(M.t[kk]==null){const T=knB().tell,lo=cl(a,0,100)/100;let c="keep";try{c=mindPick([["tell",Math.max(.01,lo*T.tell)],["keep",Math.max(.01,(1-lo)*T.keep)]],v)||"keep"}catch(e){}M.t[kk]=c}
   if(M.t[kk]==="tell"){r={by:"v"+v.id,how:"friend",v,at:fa};break}}}
 if(r&&M.at[mk]==null)M.at[mk]=now;/* the first khắc she knew it (a friend's word travels from then) */
 return M.x[mk]=r}
/* ---------- the informer's line (jvoice: address by speaker and listener, mood by lòng / thiện cảm) ---------- */
const KN_POOL={
 srv:{warm:["Bẩm {goi}, {W} đang có chuyện: {what}. {Goi} có muốn qua xem không?","{Goi} ơi, {xung} vừa nghe {what} ở {W}. Chúng ta cùng tới xem thử nhé?","Bẩm {goi}, {xung} nghe người ta xì xào: {what}, ngay ở {W}."],
  cool:["Bẩm {goi}, ở {W} {what}.","Bẩm {goi}, {xung} nghe nói {what} ở {W}."],
  cold:["Ở {W} có chuyện: {what}. {Xung} chỉ nghe vậy.","{Goi} có hỏi thì {xung} bẩm: {what} ở {W}."]},
 friend:{warm:["{Goi}, {xung} vừa đi ngang {W}, thấy {what}. Có muốn cùng đi xem không?","{Goi} biết chưa? Ở {W} {what}."],
  cool:["{Xung} nghe nói ở {W} {what}."],cold:["Ở {W} {what}, {goi} không biết sao?"]},
 end:{any:["Việc ấy đã xong, giờ tới cũng chẳng còn gì.","Chuyện đã qua rồi, nơi ấy giờ đã vắng."]},
 mat:{any:["Tai mắt báo ({N}, người hầu cung {P}): ở {W} {what}.","Tai mắt báo ({N}, người hầu cung {P}): {what}, ngay ở {W}."]},
 pass:{any:["{N}, người hầu cung {P}, đi ngang ghé bẩm: ở {W} {what}.","{N}, người hầu cung {P}, nói nhỏ: {what}, ngay ở {W}."]},
 le:{any:["Ở {W} {what}."]},
 here:{any:["Ngay trước mặt: {what}."]},
 bao:{warm:["Bẩm {goi}, {xung} {what}.","{Goi} ơi, {xung} {what}."],cool:["Bẩm {goi}, {xung} {what}."],cold:["{Xung} {what}."]},
 baoL:{warm:["Bẩm {goi}, giờ {xung} mới kịp bẩm: lúc trước {xung} {what}."],cool:["Bẩm {goi}, chuyện buổi trước: {xung} {what}."],cold:["Chuyện buổi trước, {xung} {what}."]},
 baoS:{any:["Bẩm {goi}, {xung} lén qua báo: {what}.","{Goi}, {xung} liều tới bẩm một chuyện: {what}."]}};
function knMood(n){const V=knB().voice;return n>=V.warm?"warm":n>=V.cool?"cool":"cold"}
function knSpk(s){return {srv:s.role==="eunuch"?"m":"f",name:s.name}}
function knWhat(h){const p=knPend(h);try{if(p){const v=agDoer?agDoer(p):RV(p.vid);const t=agPerson(p.t);const nm=v&&v.name?v.name:"có người";return `${nm} đang ${p.act}${t?" "+(t===S?"ngươi":t.name||""):""}`.replace(/\s+$/,"")}}catch(e){}
 return String((AD_HAP_T[h.id]||"có chuyện")).toLowerCase()}
function knLine(r,h){const W=agPlaceTxt(h.k),what=knWhat(h);const fill=t=>String(t||"").replace(/\{W\}/g,W).replace(/\{what\}/g,what);
 try{if(r.s){const s=r.s;const sp=knSpk(s);const m=knMood(s.loyal||0);return kSay(sp,S,fill(kLine("tinbao:srv",KN_POOL.srv,{m})),{own:true,close:m==="warm",m})}
  if(r.v){const m=knMood(aff(r.v,S));return kSay(r.v,S,fill(kLine("tinbao:friend",KN_POOL.friend,{m})),{m})}
  const P=KN_POOL[r.how==="self"?"here":r.by]||KN_POOL.mat;let t=fill(kLine("tinbao:"+r.by,P,{m:"cool"}));
  if(r.e){const o=ownerOf(r.e);t=t.replace(/\{N\}/g,r.e.name).replace(/\{P\}/g,o?(o===S?"ta":NM(o)):"khác")}return t}catch(e){return `Ở ${W} ${what}.`}}
/* ---------- her TIN BÁO list ---------- */
/* jagday-walk r5 (law 6c, law 11 — the carry group): during the buổi turn (nextBuoi → endTurn) bkey() passes through half-turned keys
   (S.buoi already 0, wk() not yet moved; the khắc still the old one). A rebuild there landed the carried items into a list the real
   new key wiped a moment later (and landed them at the old khắc, before their bearer arrives). So: no rebuild while KN.turn; the
   nextBuoi wrapper rebuilds once the turn is done, at the real key and khắc. */
function knTb(){let b="";try{b=bkey()}catch(e){}S.tb=S.tb||{};if(KN.turn&&S.tb.b!=null){S.tb.K=S.tb.K||{};if(!S.tb.R)S.tb.R=[];return S.tb}if(S.tb.b!==b){S.tb.b=b;S.tb.K={};knCarryIn(S.tb)}else if(S.tb.W&&S.tb.W.length)knCarryTick(S.tb);if(!S.tb.R||S.tb.d!==wk()){S.tb.d=wk();S.tb.R=[]}S.tb.K=S.tb.K||{};return S.tb}
function knRaw(){return KN.raw||[]}
function knScan(L){if(!S||S.dead||S.out)return[];try{knFlush()}catch(e){agErr("knFlush",e)}const T=knTb();KN.stat.scan++;const out=[];const now=agKh();
 for(const h of L){if(h.done)continue;const hid=knHid(h);const w=knWin(h);const ended=w[1]<now&&!knFixed(h)?1:0;/* AG-ALL-2d2: an ENDED happening still reaches her (late news down the khắc chain), flagged ended */
  let r=null;try{r=knFor(S,h)}catch(e){agErr("know",e)}if(!r){KN.stat.hidden++;continue}
  let it=T.K[hid];if(!it){it=T.K[hid]={id:hid,k:h.id,place:h.k,b:S.buoi||0,k0:w[0],k1:w[1],who:knWho(h),line:knLine(r,h),by:r.by,inf:knInf(r),infName:knInfName(r),seen:r.by==="here"?1:0,ended:0};if(ended)knEnd(it);KN.stat.known++;knTmN(r.by==="mat"&&r.e);
   for(const f of KN.cb)try{f(Object.assign({},it))}catch(e){console.error("tinBao cb",e)}}
  else{it.k0=w[0];it.k1=w[1];if(ended)knEnd(it)}out.push(it)}
 return out}
/* AG-ALL-2d2 (C-AG #3 order; owner logic L1638 kept): a TIN BÁO about a happening already OVER says so — it.ended = 1 and the line in the past
   ("vừa …" + KN_POOL.end), so it never invites her to a place where nothing is left. It stays in her list for the rest of the buổi. */
function knEnd(it){if(!it||it.ended)return it;it.ended=1;try{const e=kLine("tinbao:end",KN_POOL.end,{m:"any"});it.line=String(it.line||"").replace(/(^|\s)đang(\s)/g,"$1vừa$2").replace(/\s*$/,"")+" "+e}catch(x){}return it}
function tinBaoList(){if(!knOn()||!S||S.dead||S.out)return[];let L=[];try{L=adHapNow()}catch(e){}const T=knTb();const now=agKh();
 for(const it of Object.values(T.K))if(it.k1<now&&it.k!=="fest"&&it.k!=="cold"&&!it.ended)knEnd(it);
 const A=Object.values(T.K).filter(it=>it.k1>=now||it.ended||it.k==="fest"||it.k==="cold");const R=(T.R||[]).filter(it=>it.b===(S.buoi||0));return A.concat(R).map(x=>Object.assign({},x))}
/* AG-ALL-2d3 (design gap §23.5): a deed in the LAST khắc of a buổi reaches her only after the buổi (the khắc chain: seen → the bearer walks →
   known, knRelay khắc) and the hap list is per buổi, so that news was lost. At the buổi turn (before it turns: the records of the ending buổi are
   still there) every happening of the ending buổi she has not learned yet is asked once more with THE SAME rule (knFor) at the khắc its news can
   arrive (last khắc of the buổi + knRelay); what would reach her is carried into the next buổi as an ENDED TIN BÁO item (knEnd: "vừa …" + "đã
   xong"), with the same informer. Hidden news stays hidden; fixed happenings (lễ) are known anyway; deeds that run on into the next buổi are in
   its list already (agSpan carry). */
/* jagday-walk r5: the carry reads the WHOLE ending buổi — first land the world work still waiting (AGL later jobs: the last khắc's deeds),
   else a deed landed after this read has no tin báo at all (law 6c). In nextBuoi the outer agDrain already ran: a no-op there. */
function knCarryOut(){if(!knOn()||!S||S.dead||S.out)return 0;const D=knRelay();if(!D)return 0;try{if(typeof agDrain==="function")agDrain()}catch(e){agErr("drain",e)}let L=[];try{adHapNow();L=KN.raw||[]}catch(e){return 0}
 const T=knTb();const KH=J95.KH,real=agKh;const C=[];
 for(const h of L){if(!h||h.done||knFixed(h))continue;const hid=knHid(h);if(T.K[hid]||C.some(x=>x.id===hid+":c"))continue;const w=knWin(h);if(!w||w[1]+D<KH||w[1]>=KH)continue;/* runs on: in the next buổi list already *//* its news could not come inside this buổi */
  let r=null;agKh=()=>Math.max(real(),w[1])+D;try{r=knFor(S,h)}catch(e){agErr("knCarry",e)}finally{agKh=real}
  if(!r)continue;/* AG-ALL-2d4: the same walk — it reaches her in the next buổi at khắc (arrival − KH): a far informer comes later than a near one */
  const due=Math.max(0,(r.at!=null?r.at:w[1]+D)-KH);const it={id:hid+":c",k:h.id,place:h.k,k0:-1,k1:-1,/* its window lay in the buổi before: over before khắc 0 of this one */who:knWho(h),line:knLine(r,h),by:r.by,inf:knInf(r),infName:knInfName(r),seen:0,ended:0,carry:1,due};C.push(it)}
 /* a turn refused (a scene still waiting, j9) asks again on the next press: keep what is already carried (same buổi key), never drop it */
 let b="";try{b=bkey()}catch(e){}const old=S.tb.Cb===b?(S.tb.C||[]).filter(x=>!C.some(y=>y.id===x.id)&&!T.K[x.id]):[];
 S.tb.C=C.concat(old);S.tb.Cb=b;KN.stat.carry=(KN.stat.carry||0)+C.length;return S.tb.C.length}
/* items still on the road when a buổi turns (W, due not reached: she ended the buổi early) are not dropped: their bearer has
   arrived by now, so they land at once in the new buổi, with the new carry after them */
function knCarryIn(T){const W=(T.W||[]).map(it=>(it.due=0,it));const C=(T.C||[]).filter(x=>!W.some(y=>y.id===x.id));T.W=W.concat(C);T.C=[];T.Cb="";knCarryTick(T)}
/* a carried item lands when its bearer arrives (its khắc in this buổi), not all at the buổi's start */
function knCarryTick(T){if(!T.W||!T.W.length)return;let now=0;try{now=agKh()}catch(e){}const keep=[];
 for(const it of T.W){if((it.due||0)>now){keep.push(it);continue}delete it.due;it.b=S.buoi||0;knEnd(it);T.K[it.id]=it;for(const f of KN.cb)try{f(Object.assign({},it))}catch(e){console.error("tinBao cb",e)}}T.W=keep}
(function(){const n0=nextBuoi;nextBuoi=function(){try{knCarryOut()}catch(e){agErr("knCarry",e)}KN.turn=(KN.turn||0)+1;try{return n0.apply(this,arguments)}finally{KN.turn--;if(!KN.turn)try{if(S&&!S.dead&&knOn())knTb()}catch(e){agErr("knTb",e)}}}})();
function tinBaoNew(){return tinBaoList().filter(x=>!x.seen).length}
function tinBaoOn(fn){if(typeof fn==="function")KN.cb.push(fn);return ()=>{const i=KN.cb.indexOf(fn);if(i>=0)KN.cb.splice(i,1)}}
function tinBaoSeen(id){const T=knTb();for(const it of Object.values(T.K).concat(T.R||[]))if(id==null||it.id===id)it.seen=1}
/* a servant's report to her master (her own errands): for her a TIN BÁO "bao" item in the servant's voice */
function knBao(s,m,what,place,late,sold){if(m!==S)return;const T=knTb();const md=knMood(s.loyal||0);let line=what;
 /* late = she reports a buổi late; sold = a bought servant of another palace selling her own master's news to her */
 try{line=kSay(knSpk(s),S,kLine(late?"tinbao:baoL":sold?"tinbao:baoS":"tinbao:bao",late?KN_POOL.baoL:sold?KN_POOL.baoS:KN_POOL.bao,{m:sold?"any":md}).replace(/\{what\}/g,what),{own:!sold,close:!sold&&md==="warm",m:md})}catch(e){}
 const sk="s"+knSid(s,m);const it={id:"bao:"+wk()+":"+(S.buoi||0)+":"+sk+":"+T.R.length,k:"bao",place:place||palaceOf(S),b:S.buoi||0,k0:agKh(),k1:agKh(),who:[sk],line,by:sk,inf:knSrvKey(s),infName:s.name||"",seen:0};knTmN(sold&&s.spyFor==="me"&&s);
 T.R.push(it);if(T.R.length>knB().keep)T.R.shift();for(const f of KN.cb)try{f(Object.assign({},it))}catch(e){console.error("tinBao cb",e)}}
/* ---------- §3 two-way: a consort who knows a happening may go there and listen (the player's "Nghe lén") ---------- */
/* the witness odds: ONE function for her and every consort (part 2b agHearOf, jagent) */
function knHearO(x){return agHearOf(x)}
function knHarmK(k){return typeof k==="string"&&(k.indexOf("harm:")===0||AGHOST.has(k)||k==="fakeIll"||k==="fakePreg")}
/* the deed happenings of this buổi as the agents see them (unfiltered: no Tai mắt of hers; jagharm haHapDeeds), cached per buổi and pending list */
function knDeedHaps(){const M=knMemo();const z=agZ();const n=(z.pend||[]).length;if(M.dh&&M.dn===n)return M.dh;let L=[];try{L=haHapDeeds().map(({p,id})=>({k:p.pl,id,x:{pid:p.vid+":"+p.k+":"+p.kh,vid:p.vid,t:p.t},done:p.seen?1:0}))}catch(e){}M.dh=L;M.dn=n;return L}
function knOpts(v,N,need){if(!knOn()||typeof haHapDeeds!=="function")return[];const O=[];const G=knB().hear;const L=knDeedHaps();if(!L.length)return O;
 for(const h of L){const p=knPend(h);if(!p||p.vid===v.id||h.done)continue;const k=knFor(v,h);if(!k)continue;const doer=RV(p.vid);if(!doer||!doer.alive)continue;
  const harm=knHarmK(p.k);const t=agPerson(p.t);const g={};if(harm&&t===v)g.safe=G.safe;else if(harm)g.spite=G.spite*(agSpite(v,doer)>0?1:.5);else g.ally=G.ally;
  if(need&&g[need]==null)continue;if(!j95acc(v,h.k)&&h.k!==palaceOf(v))continue;
  const w=knWin(h),pl=h.k;const u=agU(v,N,knHearO(v),{g,l:{}},{},"social");if(u<=0)continue;
  O.push({k:"know:hear",t:doer,u,tag:"social",act:"nghe lén",at:kh=>kh>=w[0]&&kh<=w[1]?pl:null,why:k.by==="mat"?"tai mắt báo tin":k.by[0]==="s"?"người hầu báo tin":"nghe tin"})}
 return O}
function knHearRun(v,t,pd){const z=agZ();KN.stat.hear++;if(!t)return"";const tid=ledgerId(t);
 const e=(z.log||[]).find(x=>x.id===tid&&x.w===wk()&&x.b===(S.buoi||0)&&x.pl===pd.pl&&x.k!=="know:hear");if(!e)return"";/* she came too late: nothing there */
 /* her khắc there is taken by this reaction (part 2b agSeeNpc reads it: no second reaction of hers to the same deed) */
 try{const R=agRec();const row=R&&R.P["v"+v.id];if(row&&row[pd.kh])row[pd.kh]=[pd.pl,"ag_see:hear",e.id,"nghe lén"]}catch(x){}
 const harm=knHarmK(e.k),ho=knHearO(v);if(agTry(ho)){KN.stat.hearOk++;if(harm)evA(v,t,BAL.ag.ev.one);try{noteAdd(t.id,`${v.name} để ý chuyện nàng làm ở ${agPlaceTxt(pd.pl)}`)}catch(x){}return t===S?`${v.name} nghe lén chuyện ngươi làm ở ${agPlaceTxt(pd.pl)}`:""}
 if(agSoft(ho))return"";affAdd(t,v,-BAL.ag.wit.caught);return t===S?`Ngươi bắt gặp ${v.name} đứng nghe lén`:""}
/* the news reaches them after the buổi's deciders have chosen (the deeds exist only then): a consort still free this buổi (she kept her schedule)
   weighs going to listen against keeping it — the owner's option 1 (OD 17/11 ~15:00Z): re-decide when news comes, not every khắc */
function knReact(){const key=agKey();if(KN.rk===key)return;KN.rk=key;if(!knDeedHaps().length)return;const t0=performance.now();
 for(const v of liveRivals(true)){if(!v.alive||v.out||v.confined)continue;try{if(agUsed(v))continue;let any=false;for(const h of knDeedHaps())if(knFor(v,h)){any=true;break}if(!any)continue;
  const N=agNeedsC(v);const O=knOpts(v,N);if(!O.length)continue;const c=mindPick([[null,BAL.ag.routine]].concat(O.map(o=>[o,o.u])),v);if(!c)continue;
  const sl=agSlot(v,c.at,c.t,c);if(!sl)continue;agPlan(v,c,N,sl[0],sl[1]);KN.stat.react=(KN.stat.react||0)+1}catch(e){agErr("knReact1",e)}}
 if(AG.now){AG.now=0;agLater("sync",agSyncNow)}KN.ms=(KN.ms||0)+performance.now()-t0}
/* ---------- §4 servants' own errands ---------- */
function knDanger(m){const M=knMemo();M.dg=M.dg||{};const k=knId(m);if(M.dg[k]!=null)return M.dg[k];let d=0;try{for(const v of liveRivals(true))if(v!==m&&v.alive)d=Math.max(d,danger(v,m))}catch(e){}return M.dg[k]=d}
function knScoutT(m){const M=knMemo();M.st=M.st||{};const k=knId(m);if(M.st[k]!==undefined)return M.st[k];return M.st[k]=knScoutT0(m)}
function knScoutT0(m){try{const L=liveRivals(true).filter(v=>v!==m&&v.alive&&!v.out&&!(m===S&&sameHouse(S,v)));if(!L.length)return null;return L.slice().sort((a,b)=>(danger(b,m)-danger(a,m))||((b.sung||0)-(a.sung||0)))[0]}catch(e){return null}}
function knListenPick(m){const L=liveRivals(true).filter(v=>v!==m&&v.alive&&!v.out);if(!L.length)return null;const W=L.map(v=>1+Math.max(0,danger(v,m))/15+((v.sung||0)>=50?1:0)+(v.preg?1:0));
 let r=Math.random()*W.reduce((a,b)=>a+b,0),i=0;while(r>W[i]&&i<L.length-1){r-=W[i];i++}return L[i]}
function knServe(s,m){const lo=cl(s.loyal||0,0,100);return knB().serve*lo/50*(1+knTellQ(s))}
function knStaffOpts(s,N){const t0=performance.now();try{return knStaffOpts0(s,N)}finally{KN.sms=(KN.sms||0)+performance.now()-t0;KN.sn=(KN.sn||0)+1}}
function knStaffOpts0(s,N){if(!knOn()||s.sid==null)return[];N=N||asNeeds(s);const m=ownerOf(s);if(!m||(m!==S&&(!m.alive||m.out)))return[];if(typeof asOpt!=="function")return[];const L=[];const sv=knServe(s,m);if(sv<=0)return L;const dz=1+knDanger(m)/50;
 const x=(k,raw,more,mul,p)=>{try{const o=asOpt(s,k,raw,more);if(p!=null)o.p=p;o.u=(Math.max(0,asU(N,o))*asB().uMul+knB().base)*sv*(mul||1);/* she serves her master: a base worth (BAL.ag.know.base) besides what it brings her */if(o.u>0)L.push(o);return o}catch(e){agErr("know:"+k,e)}};
 x("listen",SRVA.listen.o(s),{fx:"meet"});
 const t=knScoutT(m);if(t){/* her odds of the day (the consort's "Sai đi dò la" formula, jwhy spyRoll): once per day per servant and target (perf) */const D=KN.sp&&KN.sp.d===wk()?KN.sp:(KN.sp={d:wk(),o:{}});const kk=s.sid+"|"+t.id+"|"+s.loyal;if(D.o[kk]==null)D.o[kk]=spyRoll(m,t,s);x("scout",100,{t,at:palaceOf(t)},dz,D.o[kk])}
 x("watch",100,null,dz);return L}
/* ---------- NO LIES (OWNER 17/11 ~15:25Z (4), canon over the "lie" of ~15:00Z): every errand result reaching a master is TRUE. The servant only chooses
   (mindPick by lòng + nết, BAL.ag.know.tell — the knTell rule plus "late") to report now, report late (next buổi), slack ("làm cho có": no report,
   the master gains nothing) or sell it to whoever bought her; a failed errand is reported as failed ("có đi dò la nhưng không dò được"). ---------- */
function knErrPick(s,m){const T=knB().tell;const lo=cl(s.loyal||0,0,100)/100;const q=knTellQ(s);
 const O=[["tell",Math.max(.01,lo*T.tell*(1+q))],["late",Math.max(.01,4*lo*(1-lo)*T.late)],["keep",Math.max(.01,(1-lo)*T.keep*(1-q))]];
 const b=s.spyFor!=null?byKey(s.spyFor):null;if(b&&b!==m&&(b===S||b.alive))O.push(["sell",(1-lo)*T.sell]);
 let c="keep";try{c=mindPick(O,s)||"keep"}catch(e){}KN.stat["e_"+c]=(KN.stat["e_"+c]||0)+1;return c}
/* what one errand found: k = listen | listenF | scout | scoutF | caught; t = the consort it was about */
function knErrWhat(k,t){const w=t?spyWho(t):"";return k==="listen"?`đi nghe ngóng được chuyện về ${w}`:k==="listenF"?"có đi nghe ngóng một vòng nhưng chưa nghe được chuyện gì đáng bẩm"
 :k==="scout"?`tự đi dò la ${w}`:k==="scoutF"?`có đi dò la ${w} nhưng không dò được gì`:`đi dò la ${w} thì bị bắt gặp, e rằng nàng đã đoán ra`}
/* the master hears it (now or late): the gain lands only now */
function knErrGive(s,m,k,t,late){if(!m||(m!==S&&(!m.alive||m.out)))return;let f="";
 if(k==="listen"&&t){if(s.sid!=null)s.intel=(s.intel||[]).concat([t.id]).slice(-3);if(m===S)try{f=typeof intelLearn==="function"?intelLearn(t,1,{by:s.name,how:"Nghe ngóng"}):""}catch(e){}}
 if(k==="scout"&&t){const n=evA(m,t,BAL.ag.ev.one);if(s.sid!=null)s.intel=(s.intel||[]).concat([t.id]).slice(-3);if(m===S){let ff="";try{ff=typeof intelLearn==="function"?intelLearn(t,2,{by:s.name,how:"Tự đi dò la"}):""}catch(e){}f=(n?", nắm được chứng cứ":"")+(ff?": "+ff:"")}}
 if(m===S)knBao(s,m,knErrWhat(k,t)+(k==="listen"&&f?": "+f:k==="scout"&&f?f:""),t?palaceOf(t):null,late)}
/* she sells it: the one who bought her hears the truth about her master's errand (the scouted consort learns she is watched) */
function knErrSell(s,m,k,t){const b=byKey(s.spyFor);if(!b)return;KN.stat.sold=(KN.stat.sold||0)+1;
 if(t&&b===t&&(k==="scout"||k==="scoutF"))affAdd(t,m,-knB().scout.oan);
 if(b===S){const w=t===S?"{goi}":t?spyWho(t):"";knBao(s,S,`${m.name} vừa sai {xung} ${/^listen/.test(k)?"đi nghe ngóng các cung":"đi dò la "+w}${k==="scout"?", {xung} dò được rồi":k==="caught"?", {xung} bị bắt gặp":""}`,t&&t!==S?palaceOf(t):palaceOf(m),0,1)}}
function knErr(s,m,k,t){const c=knErrPick(s,m);if(c==="tell")knErrGive(s,m,k,t,0);else if(c==="late"){S.knQ=(S.knQ||[]).concat([{at:agKey(),sid:s.sid,k,t:t?key(t)/* "me" for her: RV alone lost an NPC's late report on the player (review ag-later #2) */:null}]).slice(-knB().keep)}
 else if(c==="sell")knErrSell(s,m,k,t);return c}
/* late reports land once the buổi has turned */
function knFlush(){if(!S||!S.knQ||!S.knQ.length)return;const key=agKey();const L=S.knQ.filter(x=>x.at!==key);if(!L.length)return;S.knQ=S.knQ.filter(x=>x.at===key);
 for(const x of L){try{const s=allServ().find(v=>v.sid===x.sid);if(!s||s.out)continue;const m=ownerOf(s);const t=x.t!=null?byKey(x.t):null;/* the target gone (dead) before the buổi turned: the late word is moot, never a nameless line */if(x.t!=null&&(!t||(t!==S&&!t.alive))){KN.stat.e_gone=(KN.stat.e_gone||0)+1;continue}knErrGive(s,m,x.k,t,1)}catch(e){agErr("knFlush",e)}}}
function knListenDo(s,m,ok){const v=ok?knListenPick(m):null;KN.stat.listen++;knErr(s,m,v?"listen":"listenF",v);return""}
function knScoutDo(s,m,t,ok){KN.stat.scout++;if(!t)return"";if(ok){KN.stat.scoutOk++;knErr(s,m,"scout",t);return""}
 /* a failed try: caught (BAL.ag.know.scout.caught %: the target's regard falls whatever she reports) or back empty-handed */
 if(roll(agCap(knB().scout.caught))){KN.stat.caught=(KN.stat.caught||0)+1;affAdd(t,m,-knB().scout.oan);knErr(s,m,"caught",t)}else knErr(s,m,"scoutF",t);return""}
if(typeof AS_DO==="object"){AS_DO.listen=(s,m,o,ok)=>knListenDo(s,m,ok);AS_DO.scout=(s,m,o,ok)=>knScoutDo(s,m,o.t,ok);AS_DO.watch=()=>{KN.stat.watch++;return""}}
/* a scheme landing at a palace: the master's servants who stand there or keep watch see it, and tell her (or keep / sell it) */
function knWatchLand(p){if(!knOn()||!p||!knHarmK(p.k)||p.vid==null)return;const doer=RV(p.vid);if(!doer)return;const hid="land:"+agKey()+":"+p.vid+":"+p.k+":"+p.kh;const h={k:p.pl,id:"deed"};
 for(const m of consorts()){if(!m||m===doer||(m!==S&&(!m.alive||m.out)))continue;if(palaceOf(m)!==p.pl)continue;
  for(const s of knStaff(m)){const kk=knSlotK(s);const here=/:watch$/.test(kk)||knAt("s"+s.sid,p.kh)===p.pl;if(!here)continue;
   const c=knTell(s,m,hid);if(c!=="tell")continue;evA(m,doer,BAL.ag.ev.one);if(m===S)knBao(s,m,`thấy người của ${doer.name} lén lút ở cung ${m===S?"ta":NM(m)}: ${p.act||"giở trò"}`,p.pl);break}}
 /* the player maid keeping watch at her master's palace */
 try{if(typeof isSrv==="function"&&isSrv()&&S.srv&&S.srv.watch===agKey()){const m=srvM();if(m&&m!==doer&&palaceOf(m)===p.pl){S.srv.intel=(S.srv.intel||[]).concat([doer.id]).slice(-3);log(`Ngươi canh cửa cung ${m.name}, thấy người của ${doer.name} lén lút: ${p.act||"giở trò"}.`)}}}catch(e){}}
/* the player maid's cards (same rows, same run) */
function knMeAg(){return {name:S.name,loyal:S.tin||0,rk:S.srv&&S.srv.rk||1,kn:1}}
function knMeServ(){return {sid:"me",name:S.name,role:"maid",loyal:S.tin||0,tamco:S.tamco||0}}
function knSrvCards(m){if(!m||!knOn())return[];const X=[];const once=k=>typeof isSrv==="function"&&isSrv()&&typeof srvOnce==="function"&&srvOnce(k);
 if(!once("listen"))X.push({n:"Nghe ngóng cho chủ",t:`Đi một vòng các cung, nghe xem có chuyện gì đáng bẩm ${m.name}.`,k:SRVA.listen.k,c:{},o:od(SRVA.listen.o(S)),w:SRVA.listen.w,l:{},x:`biết chuyện về một phi tần (để bẩm chủ) · công lao +${SRVA.listen.mp}`,once:"listen",
  go:()=>{const v=knListenPick(m);KN.stat.listen++;if(v){S.srv.intel=(S.srv.intel||[]).concat([v.id]).slice(-3);log(`Ngươi nghe ngóng được chuyện về ${v.name}, chờ dịp bẩm ${m.name}.`)}srvMerit(SRVA.listen.mp)}});
 const t=knScoutT(m);if(t&&!once("scout"))X.push({n:"Tự đi dò la cho chủ",t:`Lén dò la ${t.name}, người đang có chuyện với ${m.name}.`,k:SRVA.scout.k,c:{},o:spyO(m,t,knMeAg()),w:SRVA.scout.w,l:SRVA.scout.l,
  x:`thành: ${m.name} được ${evSg(BAL.ag.ev.one)} về ${t.name} nếu nàng từng làm điều sai · hỏng: nàng đoán ra, oán ${m.name}`,once:"scout",
  go:()=>{KN.stat.scout++;KN.stat.scoutOk++;evA(m,t,BAL.ag.ev.one);S.srv.intel=(S.srv.intel||[]).concat([t.id]).slice(-3);srvMerit(SRVA.scout.mp)},fail:()=>{KN.stat.scout++;if(roll(agCap(knB().scout.caught))){affAdd(t,m,-knB().scout.oan);log(`${t.name} bắt gặp ngươi lén dò la, e rằng nàng đã đoán ra.`)}else log(`Ngươi có đi dò la ${t.name} nhưng không dò được gì.`)}});
 if(!once("watch"))X.push({n:"Canh chừng cung chủ",t:`Ở lại canh cửa cung ${m.name} suốt buổi này.`,k:SRVA.watch.k,c:{},o:100,w:SRVA.watch.w,x:"kẻ nào đến giở trò ở cung chủ buổi này, ngươi đều thấy",once:"watch",
  go:()=>{KN.stat.watch++;S.srv.watch=agKey();srvMerit(SRVA.watch.mp)}});
 return X}
/* ---------- wiring ---------- */
(function(){
 try{ACT95["ag_know:hear"]="nghe lén";for(const g of ["maid","srv"]){ACT95["ag_"+g+":listen"]="đi nghe ngóng cho chủ";ACT95["ag_"+g+":scout"]="tự đi dò la cho chủ";ACT95["ag_"+g+":watch"]="canh chừng cung chủ"}}catch(e){}
 if(typeof agReg==="function")agReg("consort","know",(p,N,need)=>knOpts(p,N,need));
 /* the servants' own errands join her option list (jagstaff asOpts: the day plan's provider, the asTick fallback and the run handlers all read it) */
 if(typeof asOpts==="function"){const o0=asOpts;asOpts=function(s,N){const L=o0.apply(this,arguments);try{for(const o of knStaffOpts(s,N))L.push(o)}catch(e){agErr("knStaff",e)}return L}}
 if(typeof agRunReg==="function")agRunReg("know:hear",(v,t,pd)=>knHearRun(v,t,pd));
 /* G2: the '!' list she sees = the happenings she knows (+ where she stands); the raw list stays for the agents (two-way) */
 const n0=adHapNow;adHapNow=function(){const L=n0.apply(this,arguments);if(!knOn()||!Array.isArray(L))return L;KN.raw=L;let K=[];try{K=knScan(L)}catch(e){agErr("knScan",e);return L}
  const ids=new Set(K.map(x=>x.id));return L.filter(h=>h.k===S.place||ids.has(knHid(h)))};
 /* arriving: she sees every happening of that place (presence), all of them fire (G1, jact.js) */
 const f1=adHapFire1;adHapFire1=function(h,k){const r=f1.apply(this,arguments);try{if(knOn()&&h){const T=knTb();const it=T.K[knHid(h)];if(it)it.seen=1}}catch(e){}return r};
 if(typeof adOpenOk==="function"){const o0=adOpenOk;adOpenOk=function(k){if(KN.arr!=null&&k===KN.arr){try{if(typeof accessOf==="function"&&!accessOf(S,k).ok)return false}catch(e){}return true}return o0.apply(this,arguments)}}
 if(typeof adHapArrive==="function"){const a0=adHapArrive;adHapArrive=function(k){KN.arr=k;try{return a0.apply(this,arguments)}finally{KN.arr=null}}}
 /* a scheme lands: watchers at that palace */
 const l0=agLand0;agLand0=function(p,seen){const r=l0.apply(this,arguments);try{knWatchLand(p)}catch(e){agErr("knWatch",e)}return r};
 /* news arrives as time passes (a khắc spent, new deeds planned): scan once in its own frame */
 const sc=()=>agLater("kn",()=>{if(knOn()&&S&&!S.dead)adHapNow()});/* AG LATER (jagent): dropped on another world / buổi, drained at the boundary */
 if(typeof j95sync==="function"){const s0=j95sync;j95sync=function(){const r=s0.apply(this,arguments);try{if(knOn())sc()}catch(e){}return r}}
 if(typeof agSlice==="function"){const a0=agSlice;agSlice=function(){const r=a0.apply(this,arguments);try{if(knOn()){if(!AG.q)knReact();sc()}}catch(e){agErr("knReact",e)}return r}}
})();
Object.assign(window,{knEnd,KN,knFor,knOn,knHearO,knOpts,knStaffOpts,knSrvCards,knWatchLand,tinBaoList,tinBaoNew,tinBaoOn,tinBaoSeen});
/* ================= AG-ALL-2f — TAI MẮT DATA LINK (owner OD 17/11 ~16:25Z, verbatim in dev/OWNER_DECISIONS.md: "tai mắt là ai, là người nào ... những
   cái người mà báo tin cho tôi là có phải thực sự là những tai mắt này không ... mình phải có một cái sự kết nối để cho nó make sense") — data only, no UI
   (main's tinbao-ui builds the kit list + card).
   - Her Tai mắt = the REAL servants of other palaces whose spyFor is her key (placed by "Cài người"/plantServ, bought by bribeServ / "Nhận bạc, làm tai
     mắt", threatServ …). taiMatList(p) works for every consort p (two-way).
   - The "mat" branch of knFor no longer brings news from nobody: the informer is one of x's real Tai mắt (the one placed where it happened / with the doer
     first), or — when x has none — a real servant of another palace who stood there / serves the doer: a PASSER-BY (kind "passerby", not her Tai mắt).
   - Every TIN BÁO item carries inf (informer key) + infName; informerInfo(item) → {id,name,isTaiMat,kind,soldOutKnown}. Reports stay true (2c2 no-lies).
   - A sell-out (her own servant / confidant maid whose spyFor is someone else) shows as sold out only once she has DISCOVERED it: knSoldFound(s) is
     called by every discovery (Tra khảo j10 / jeitem, tra xét j14, theo dõi / hỏi thẳng / tin giả j68f, "Giữ lại" j72). S.tmSold (lazy; old saves = unknown). */
function knSrvKey(s){return s&&s.sid!=null?"s"+s.sid:"maid"}
function knInf(r){return r&&r.e?knSrvKey(r.e):r&&r.s?knSrvKey(r.s):r&&r.v?"v"+r.v.id:null}
function knInfName(r){const p=r&&(r.e||r.s||r.v);return p&&p.name||""}
function knAllSrv(){const M=knMemo();if(!M.as){let L=[];try{L=allServ().filter(s=>s&&!s.out&&s.name&&s.sid!=null)}catch(e){}M.as=L}return M.as}
function taiMatRaw(x){if(!x)return[];const k=key(x);return tmSrv().filter(/* 2f2: the live list (the khắc memo can be stale after a load / a new hire) */s=>{if(s.spyFor!==k)return false;const o=ownerOf(s);return !!o&&o!==x&&(o===S||(o.alive&&!o.out))})}
function knPickH(L,tag){return L.length?L[Math.min(L.length-1,Math.floor(knH(knSeed()+"|"+tag)*L.length/100))]:null}
function knEye(x,h,hid){const doer=knWho(h)[0],pl=h.k,nw=agKh();const at=s=>{const o=ownerOf(s);if(!o)return false;let pp=null;try{pp=palaceOf(o)}catch(e){}return pp===pl||knId(o)===doer||knAt("s"+s.sid,nw)===pl};
 const L=taiMatRaw(x);if(L.length){const N=L.filter(at);return {by:"mat",how:"mat",e:knPickH(N.length?N:L,"ew"+knId(x)+"|"+hid)}}
 const own=knStaff(x);const A=knAllSrv().filter(s=>!own.includes(s)&&ownerOf(s)!==x);const B=A.filter(at);const e=knPickH(B.length?B:A,"ep"+knId(x)+"|"+hid);
 return e?{by:"pass",how:"pass",e}:null}
function knPal(o){try{return palaceOf(o)}catch(e){return null}}
function knLoyK(p,s){if(!(p===S&&s&&s.kn))return null;const o=ownerOf(s);return o===S||s===S.maid?cl(s.loyal||0,0,100):tmOdds(S,s)}/* a Tai mắt's firmness for HER = her will (tmOdds), never lòng to her own master (review ag-all-2 r2 C2) */
function taiMatList(p){p=p||S;if(!p)return[];const N=p===S&&S.tmN||{};return taiMatRaw(p).map(s=>{const o=ownerOf(s);return{id:"s"+s.sid,sid:s.sid,name:s.name,role:s.role,
 placedAt:o?knPal(o):null,placedWith:o?knId(o):null,placedName:o?(o.name!=null?o.name:NM(o)/* the Thái hậu's household has no .name */):"",loyaltyKnown:knLoyK(p,s),reports:N[s.sid]||0,
 /* the tinbao-ui adapter shape (main s34 / tinbao worker): p, place, loy, loyalWord, sold */
 p:s,place:o?knPal(o):null,loy:knLoyK(p,s),loyalWord:knLoyW(knLoyK(p,s)),sold:p===S&&knIsSold(s)&&knSoldK(s)}})}
const KN_LOYW={warm:"một lòng",cool:"tạm tin được",cold:"khó tin",none:"chưa rõ"};
function knLoyW(n){return n==null?KN_LOYW.none:KN_LOYW[knMood(n)]}
function knSoldKey(s){return s&&s.sid!=null?String(s.sid):"maid"}
function knSoldFound(s){if(!s||!S)return;S.tmSold=S.tmSold||{};S.tmSold[knSoldKey(s)]=wk()}
function knSoldK(s){return !!(S&&S.tmSold&&S.tmSold[knSoldKey(s)]!=null)}
function knIsSold(s){return !!(s&&s.spyFor!=null&&s.spyFor!=="me")}
function informerInfo(it){if(!it||!S)return null;const by=String(it.by||"");const k=it.inf||(/^[sv]\d/.test(by)?by:null);if(!k)return null;
 if(k[0]==="v"){const v=RV(+k.slice(1));return knInfUi({id:k,name:v?v.name:it.infName||"",isTaiMat:false,kind:"friend",soldOutKnown:false})}
 if(by==="buy"){const s=servById(+k.slice(1));return knInfUi({id:k,name:s?s.name:it.infName||"",isTaiMat:false,kind:"seller",soldOutKnown:false})}/* AG-ALL-2g: news she paid an info seller for */
 const s=k==="maid"?S.maid:servById(+k.slice(1));if(!s)return knInfUi({id:k,name:it.infName||"",isTaiMat:false,kind:"passerby",soldOutKnown:false});
 const o=s===S.maid?S:ownerOf(s);const kind=o===S?"ownMaid":s.spyFor==="me"?"taiMat":"passerby";
 return knInfUi({id:k,name:s.name,isTaiMat:kind==="taiMat",kind,soldOutKnown:kind==="ownMaid"&&knIsSold(s)&&knSoldK(s)})}
/* the tinbao-ui adapter codes: code mat (her Tai mắt) / hau (her servant) / ban (friend) / qua (passer-by) / sold (a discovered sell-out); label = who, as she knows it */
const KN_INFL={mat:"Tai mắt",hau:"Người hầu",ban:"Bằng hữu",qua:"Người đi ngang",sold:"Kẻ hai lòng",tin:"Kẻ bán tin"};
function knInfUi(f){const c=f.soldOutKnown?"sold":{taiMat:"mat",ownMaid:"hau",friend:"ban",passerby:"qua",seller:"tin"}[f.kind];f.code=c;f.label=KN_INFL[c]+(f.name?" "+f.name:"");return f}
/* her Tai mắt's count of reports (set by the producers knScan / knBao) */
function knTmN(e){if(!e||e.sid==null||!S)return;S.tmN=S.tmN||{};S.tmN[e.sid]=(S.tmN[e.sid]||0)+1}
/* ================= AG-ALL-2f r2 — TAI MẮT MUST BE EARNED (owner OD 17/11 ~16:50Z verbatim on the handover branch: "một người trung thành mà tôi có
   muốn mua chuộc người ta cũng chắc gì tôi mua chuộc được ... không phải cứ tôi bấm vô có tai mắt là auto ... người đó có chọn làm tai mắt cho tôi hay
   không phụ thuộc vào cái mục đích và lợi ích của họ mà họ muốn ở tôi").
   ONE odds function tmOdds(recruiter, servant) = the existing bribeOdds (nết greed / timid / loyal, lòng to her master, recruiter's Tâm cơ) + the best
   "want" the recruiter can give (BAL.ag.know.tm.want), × loyalMul for a servant at lòng ≥ BAL.loy.top. bribeOdds IS tmOdds from here (Mua chuộc button
   j15 / j19 and every NPC bribeServ read it: the same rule for her and NPCs).
   The "Tai mắt N" number = the real list: p.mat is DERIVED (tmSync: min(cap, taiMatList(p).length)) for her and every consort. Every Tai mắt gain
   (apply / ap {mat:+N}: "Cài tai mắt", story / event rewards, origins …) is N recruit tries (tmTry) of real servants of other palaces, each deciding by
   tmOdds; a loss {mat:-N} lets N of them go. A refusing servant at lòng ≥ BAL.loy.mid may report the try to her master (oán; her own servant reports it
   to her as a TIN BÁO). Old saves / starting values: a stored mat above the real count becomes that many tries once (p.tmMig). ================= */
function tmB(){return BAL.ag.know.tm}
function tmOn(){try{return !!(BAL.ag&&BAL.ag.know&&BAL.ag.know.tm)&&!window.__tmOff}catch(e){return false}}
function tmWant(a,s){const W=tmB().want,o=ownerOf(s);if(!o)return["",0];const L=[];const out=(a.rank||0)>(o.rank||0);
 if(nq(s,"greed",1)>0&&(a.bac||0)>=nv(s,"bribeCost"))L.push(["bac",W.bac]);
 if(out&&(s.loyal||0)<BAL.loy.low)L.push(["protect",W.protect]);
 if(out&&srk(s)<(s.role==="maid"?BAL.srvRk.cs:tmB().post))L.push(["post",W.post]);
 let foe=false;try{foe=aff(a,o)<0||aff(o,a)<0}catch(e){}if(s.grudge&&foe)L.push(["revenge",W.revenge]);
 return L.sort((x,y)=>y[1]-x[1])[0]||["",0]}
const tmOdds0=typeof bribeOdds==="function"?bribeOdds:null;
/* 2f3: tmOdds = the ONE core (btTerms "tm": nết base ± lòng band ± chữ trọng (static + what her master offended / honoured) ± today's mood) + what the
   recruiter can give (tmWant) + her Tâm cơ; odA (her act context: weak body, luck lotB, spy knowledge) then agOdd (BAL.odds.lo..hi, never 0 / 100) */
function tmOdds(a,s){if(!tmOn())return tmOdds0?tmOdds0(a,s):odA(a,35);const B=btB();const raw=btRaw(s,ownerOf(s),"tm")+tmWant(a,s)[1]+Math.round(((a&&a.tamco||0)-B.tamcoMid)/B.tamcoDiv);return agOdd(odA(a,raw))}
/* ===== AG-ALL-2f3 — ONE betray / sell / recruit odds core (owner OD 17/11 ~17:20Z verbatim in dev/OWNER_DECISIONS.md; numbers BAL.ag.bt) =====
   terms (each [label, points]): nết base (qv codes: tham / lanh / chuyen / nhat / trung, else _) · trait words (Thanh liêm) · lòng band to the master ·
   each virtue the person holds (static lean: Trung / Nghĩa … make betrayal harder) · each virtue the master OFFENDED (+off × seen deeds, up to offMax:
   a LOYAL person may still sell / betray) or HONOURED (−hon …) — jmind mindTr record · today's mood toward the master (giận +, vừa được thưởng −).
   kind "tm" (become someone's Tai mắt: bribe, recruit, threat, betray an order) / "sell" (sell the master's news; raw ≤ 0 = does not offer). */
function btB(){return BAL.ag.bt}
function btTerms(s,m,kind){const B=btB(),K=B[kind];const F=[];if(!s||!K)return F;
 F.push(["nết",qv(K.base,s,K.base._)]);
 try{for(const t of traitsOf(s)){const d=K.tr&&K.tr[t];if(d)F.push([t,d])}}catch(e){}
 const lo=cl(s.loyal||0,0,100);const band=K.loy.find(b=>lo<b[0]);if(band&&band[1])F.push(["lòng "+lo,band[1]]);
 let tr=[];try{tr=trongOf(s)}catch(e){}for(const v of tr){const d=K.v[v]||0;if(d)F.push(["trọng "+v,d])}
 if(m&&typeof mindTr==="function"){const T=mindTr(s,m);for(const [v,n] of T.off)F.push(["chủ phạm chữ "+v,Math.round(B.off*Math.min(B.offMax,n))]);for(const [v,n] of T.hon)F.push(["chủ giữ chữ "+v,-Math.round(B.hon*Math.min(B.honMax,n))])}
 const md=m&&typeof mindMood==="function"?mindMood(s,m):"";if(md&&B.mood[md])F.push([md==="gian"?"đang giận chủ":"vừa được chủ thưởng",B.mood[md]]);
 return F}
function btRaw(s,m,kind){return btTerms(s,m,kind).reduce((a,f)=>a+f[1],0)}
function btOdds(s,m,kind){return agOdd(btRaw(s,m,kind))}
/* a failed approach: the servant SHE (or the NPC) sent with the offer is afraid of being dragged in → lòng −fear (more for a timid one); 17:00Z */
function tmFear(p,quietLog){try{const sv=typeof bestSent==="function"?bestSent(p):null;if(!sv)return"";const B=btB();const d=Math.round(B.fear*(netIs(sv,"timid")?B.fearTimid:1));
 sv.loyal=cl((sv.loyal||0)-d,0,100);KN.stat.tmFear=(KN.stat.tmFear||0)+1;const r=`${sv.name} đi đưa lời, sợ bị liên lụy: thiện cảm ${balSg(-d)}`;if(p===S&&!quiet&&!quietLog)try{log(r+".")}catch(e){}return r}catch(e){return""}}
if(tmOdds0)bribeOdds=tmOdds;
/* who could be asked: a servant of another living palace, nobody's spy yet */
function tmCands(p){return tmSrv().filter(/* 2f2: live list */s=>{if(s.spyFor!=null)return false;const o=ownerOf(s);return !!o&&o!==p&&(o===S||(o.alive&&!o.out))})}
function tmRefuse(p,s){const o=ownerOf(s);if(!o||!npcWhy("tmTell",{s,o},()=>roll(agCap(tmB().tell))))return"";/* npc-purpose G2a: a loyal servant goes to tell her master */affAdd(o,p,-tmB().oan);
 if(o===S&&p!==S)knBao(s,S,`${p.name} vừa sai người tới mua chuộc {xung} làm tai mắt, {xung} không nhận`,knPal(p));return"tell"}
/* one try: the recruiter turns to the most promising person (by the same odds); that person decides */
function tmTry(p,why){const C=tmCands(p);if(!C.length)return null;let best=null,bo=-1;for(const s of C){const o=tmOdds(p,s);if(o>bo){bo=o;best=s}}
 KN.stat.tmTry=(KN.stat.tmTry||0)+1;if(agTry(bo)){best.spyFor=key(p);affAdd(best,p,BAL.relMS.bribe);KN.stat.tmOk=(KN.stat.tmOk||0)+1;if(p===S&&!quiet)try{log(`${best.name} (người hầu cung ${NM(ownerOf(best))}) nhận lời làm tai mắt cho ngươi.`)}catch(e){}return best}
 if(agSoft(bo)){if(p===S&&!quiet)try{agSoftTxt(S,"Cài tai mắt")}catch(e){}return null}
 const t=tmRefuse(p,best);if(p===S&&!quiet)try{log(`Ngỏ ý với ${best.name} (người hầu cung ${NM(ownerOf(best))}), nàng không nhận${t?" và còn bẩm lại với chủ":""}.`)}catch(e){}return null}
function tmLose(p,n){const L=taiMatRaw(p).sort((a,b)=>tmOdds(p,a)-tmOdds(p,b));for(let i=0;i<n&&i<L.length;i++)L[i].spyFor=null}
function tmSync(p){if(!p||!tmOn())return;const c=Math.min(tmB().cap,taiMatRaw(p).length);
 if(p.tmMig==null){p.tmMig=1;const d=Math.max(0,(p.mat||0)-c);for(let i=0;i<d;i++)tmTry(p,"mig");KN.m&&(KN.m.as=null);p.mat=Math.min(tmB().cap,taiMatRaw(p).length);return}p.mat=c}
function tmGain(p,n){if(n>0){for(let i=0;i<n;i++)tmTry(p,"gain")}else if(n<0)tmLose(p,-n);if(KN.m)KN.m.as=null;tmSync(p)}
(function(){const a0=apply;apply=function(o){if(!tmOn()||!o||!o.mat||!S||(typeof isSrv==="function"&&isSrv()))return a0.apply(this,arguments);
  const n=o.mat;const x=Object.assign({},o);delete x.mat;const before=S.mat||0;const r=a0.call(this,x);if(S.tmMig==null)tmSync(S);tmGain(S,n);const d=(S.mat||0)-before;if(d&&!quiet)try{popNum("mat",d,0)}catch(e){}return r}})();
(function(){const a0=ap;ap=function(p,o){if(p===S||!tmOn()||!o||!o.mat||!p)return a0.apply(this,arguments);const n=o.mat;const x=Object.assign({},o);delete x.mat;const r=a0.call(this,p,x);if(p.tmMig==null)tmSync(p);tmGain(p,n);return r}})();
(function(){if(typeof bribeServ!=="function")return;const b0=bribeServ;bribeServ=function(a,s){const r=b0.apply(this,arguments);try{if(KN.m)KN.m.as=null;tmSync(a);const o=ownerOf(s);if(o)tmSync(o)}catch(e){}return r}})();
/* every khắc: her and every consort's number follows the real list (spyFor changes in other modules: cut loose, dismissed, found out …) */
function tmSyncAll(){if(!tmOn()||!S||(typeof isSrv==="function"&&isSrv()))return;tmSync(S);for(const v of liveRivals(true))if(v&&v.alive&&!v.out)tmSync(v)}
(function(){const m0=knMemo;knMemo=function(){const k=agKey();const fresh=!KN.m||KN.m.key!==k;const M=m0.apply(this,arguments);if(fresh&&!KN.tmIn){KN.tmIn=1;try{tmSyncAll()}catch(e){agErr("tmSync",e)}finally{KN.tmIn=0}}return M}})();
/* ===== AG-ALL-2f2 (on 2f r2): the number IS the list, exactly — and the last automatic paths removed (C-AG #3 brief; main s34 ONE CORE) =====
   - "mat" on every consort is a READ-ONLY accessor = taiMatRaw(p).length (no cap, no stored copy, never a khắc late): tmInstall on S (start / normAll)
     and every rival (rstats). r2's tmSync writes are swallowed; window.__tmOff (r2's test knob) turns it back into a plain stored number for a test.
   - Old saves: a stored S.mat N = N PLACED real spies where real people exist (those had accepted in that save; most willing first, tmPlace), else the
     real count. An NPC's stored mat (random at birth, never earned) is dropped; NPC birth gives none (rstats).
   - Real person, real choice, everywhere a Tai mắt was still made without one: "Cài tai mắt" (P3C.eyes: the most willing real servant, her own price and
     tmOdds, refusal → r2 tmRefuse), Dọa tố (threatServ: tmOdds + fear BAL.ag.know.tm.threat), a j70 accomplice (tmOdds), the j7 volunteer (a real
     servant whose odds reach BAL.ag.know.tm.vol.min comes himself). sgServOdds (Mặc cả) = bribeOdds (one odds). */
function tmSrv(){let L=[];try{L=allServ().filter(s=>s&&!s.out&&s.name&&s.sid!=null)}catch(e){}return L}
function matN(p){return p?taiMatRaw(p).length:0}
function tmWho(s){const o=ownerOf(s);return `${s.name} (${s.role==="eunuch"?"thái giám":"cung nữ"} cung ${o?NM(o):"khác"})`}
function tmInstall(p){if(!p||typeof p!=="object")return p;const d=Object.getOwnPropertyDescriptor(p,"mat");if(d&&d.get)return p;const n=p===S&&d?Math.round(+d.value||0):0;if(d)delete p.mat;
 Object.defineProperty(p,"mat",{get(){return window.__tmOff?(this.__matT||0):matN(this)},set(v){if(window.__tmOff)Object.defineProperty(this,"__matT",{value:v,writable:true,configurable:true,enumerable:false});else KN.stat.tmDrop=(KN.stat.tmDrop||0)+1},enumerable:false,configurable:true});
 if(n>0){const h=matN(S);const got=tmPlace(S,n,tmB().vol.min);KN.stat.tmMig={want:n,had:h,got}}return p}
/* set p's real Tai mắt to n where real people exist (most willing first; extra ones let go, r2 tmLose) → the real count. Used by the old-save
   migration (people who had already accepted in that save) and by tests to stage a count; never by an act (acts go through tmOdds) */
function tmPlace(p,n,min){n=Math.max(0,Math.round(+n||0));let have=matN(p);if(have>n){tmLose(p,have-n);return matN(p)}
 const L=tmCands(p).filter(s=>min==null||tmOdds(p,s)>=min)/* old save: only people willing by their own odds (OD ~16:50Z; review ag-all-2 r2 C3) */.sort((x,y)=>tmOdds(p,y)-tmOdds(p,x)||x.sid-y.sid);const k=key(p);for(const s of L){if(have>=n)break;s.spyFor=k;have++}return have}
/* the most willing real person for an approach (deterministic: a card re-picks the same one at run time) */
function tmBest(p){let b=null,bo=-1;for(const s of tmCands(p)){const o=tmOdds(p,s);if(o>bo||(o===bo&&s.sid<b.sid)){b=s;bo=o}}return b}
function tmTake(p,s){if(!p||!s)return"";s.spyFor=key(p);KN.stat.tmOk=(KN.stat.tmOk||0)+1;const r=`${tmWho(s)} nhận làm tai mắt cho ${p===S?"ngươi":p.name}.`;if(p===S&&!quiet)try{log(r)}catch(e){}return r}
function tmNo(p,s,t){t=t==null?tmRefuse(p,s):t;const f=tmFear(p,1);const r=`${tmWho(s)} không nhận làm tai mắt cho ${p===S?"ngươi":p.name}${t?", còn bẩm lại với chủ":""}.${f?" "+f+".":""}`;if(p===S&&!quiet)try{log(r)}catch(e){}return r}
/* one approach to a given person (her odds = tmOdds, + bonus for a threat) → the person decides */
function tmAsk(p,s,bonus){KN.stat.tmTry=(KN.stat.tmTry||0)+1;const o=tmOdds(p,s)+(bonus||0);if(agTry(o))return tmTake(p,s);/* OD ~17:35Z: a capped near-sure miss is soft (no report, no fear) */if(agSoft(o)){if(p===S&&!quiet)try{agSoftTxt(S,"Cài tai mắt")}catch(e){}return""}tmNo(p,s);return""}
/* the j7 volunteer: a real servant of another palace whose own odds for her reach vol.min */
function tmVol(){const s=tmBest(S);return s&&tmOdds(S,s)>=tmB().vol.min?s:null}
/* ================= AG-ALL-2g — INFO SELLERS (owner OD 17/11 ~16:50Z (2), verbatim in dev/OWNER_DECISIONS.md: "Có những người bán tin ... nô tài có một
   tin rất là đắt giá, tiểu chủ có muốn biết không, nếu mà bấm muốn là phải trả bao nhiêu lượng bạc ... cái tin đó phải thực sự là một tin đắt giá đáng
   tiền ... chứ không phải là mang một cái tin tào lao") — generalises the j67 story complication 'spy' ("Một kẻ gạ bán tin" / "Mua tin": "Tin hắn bán là
   thật"): ONE seller engine for that story beat, the free-standing offer, her and every consort (two-way).
   - WHO sells: a REAL servant of another palace, chosen by nết (BAL.ag.sell.q: Ham lợi most, read by qv) × how little she cares for her own master
     (lòng under BAL.ag.sell.loy; a loyal one never sells), never the buyer's own staff, never the buyer's own Tai mắt (she simply reports).
   - WHAT: only what she can really know (her master's secrets = j78facts of her master: a scheme in preparation, evidence held, an affair, a hidden
     pregnancy, illicit things in the chest, a past deed; a change of favour; a scheme deed of this buổi her master does or she stood at) and only news
     worth at least BAL.ag.sell.min (BAL.ag.sell.val per kind) that the buyer does not know yet → never trivial, ALWAYS TRUE (2c2 no-lies).
   - PRICE: BAL.ag.sell.price × value / 100 (× 1 + BAL.ag.sell.ask for a greedy seller), bạc; hearing her out takes BAL.ag.sell.kh khắc (dayFit gate).
   - REFUSE: she does not learn it; and no other path brings that same news this khắc (knFor / j78facts filtered by S.tb.no).
   - NPC buyers: the same offer odds, the same price, a mindPick choice (worth vs price); a bought happening is known by knFor (Nghe lén …), a bought
     proof-kind fact gives evidence (evA BAL.ag.ev.one). Personal state S.tb.sl / S.tb.no (lazy; old saves load). */
function knSB(){return BAL.ag.sell}
function knSellVal(k){return knSB().val[String(k).split(":")[0]]||0}
function knSellPrice(val,s){const P=knSB();return Math.max(1,Math.round(P.price*val/100*(1+qv(P.ask,s,0))))}
/* 2f3: the seller's will = the ONE core btRaw(s, her master, "sell") (nết + lòng band + chữ trọng incl. what her master offended + mood); ≤ 0 = never
   offers (a loyal, unoffended person; Thanh liêm) — by the numbers in BAL.ag.bt.sell, no separate filter */
function knSellW(s){return Math.max(0,btRaw(s,ownerOf(s),"sell"))/100}
/* the khắc stamp: a refusal holds for this khắc only */
function knKhK(){let b="";try{b=agKey()}catch(e){}return b+":"+agKh()}
function knNo(){const T=knTb();if(!T.no||T.no.k!==knKhK())T.no={k:knKhK(),ids:{}};return T.no.ids}
/* a change of favour since she last knew it (S.kf, j78 "sung" fact) */
function knFavFact(o){try{const K=S.kf&&S.kf[o.id];if(!K)return null;const d=(o.sung||0)-(K.s||0);if(Math.abs(d)<knSB().fav.d)return null;
 return {k:"fav:"+(o.sung||0),kind:"fav",txt:`Sủng của ${j78Who(o)} vừa ${d>0?"lên":"xuống"} mạnh: ${K.s} → ${o.sung}.`,go:()=>{S.kf[o.id]={s:o.sung,n:K.n||0,w:wk()};return""}}}catch(e){return null}}
/* the news seller s can sell to buyer x (true, worth ≥ min, not known to x yet); best first */
function knSellNews(x,s){const o=ownerOf(s);if(!o||o===x||o===S&&x===S)return[];const P=knSB();const L=[];const no=x===S?knNo():{};
 if(o!==S){let F=[];try{F=j78facts(o)}catch(e){}if(x===S){const f=knFavFact(o);if(f)F.push(f)}
  const kn=x===S?(S.intel&&S.intel[o.id]||[]):[];const xb=x!==S&&x.knB||{};
  for(const f of F){const v=knSellVal(f.k);if(v<P.min)continue;if(x!==S&&(f.k==="evme"||f.kind==="fav"))continue;/* evme is "evidence on HER" (j78 reads S) */
   if(x===S){const z=kn.find(q=>q.k===f.k);if(z&&z.txt===f.txt)continue}else if(xb[f.k]&&xb[f.k].t===f.txt)continue;if(no["v"+o.id+"|"+f.k])continue;
   L.push({kind:"fact",about:o,f,k:f.k,val:v,txt:f.txt,id:"v"+o.id+"|"+f.k})}}
 for(const h of knDeedHaps()){const p=knPend(h);if(!p||h.done)continue;const mine=p.vid===(o.id);if(!mine&&!knThere("s"+s.sid,h,knWin(h)))continue;if(!knHarmK(p.k))continue;
  if(p.vid===x.id)continue;const hid=knHid(h);if(no[hid])continue;let k=null;try{k=knFor(x,h)}catch(e){}if(k)continue;
  const t=agPerson(p.t);L.push({kind:"hap",h,hid,val:P.val[t===x?"schemeMe":"scheme"]||0,txt:knWhat(h)+" ở "+agPlaceTxt(h.k),id:hid,about:RV(p.vid)})}
 return L.filter(n=>n.val>=P.min).sort((a,b)=>b.val-a.val)}
/* a seller for buyer x: weighted by nết × little loyalty, among servants with news worth selling (BAL.ag.sell.try candidates looked at) */
function knSellPick(x,o){if(o===undefined)o=npcWhy("knSell",{x});/* npc-purpose G2a: the seller = a servant who really holds news worth it to x and needs bạc (or is greedy) — kind knSell (jagwhyg2a); nobody → no offer */
 if(!o||!o.who)return null;const N=knSellNews(x,o.who);return N.length?{s:o.who,n:N[0]}:null}
/* the servants who might sell to x (cheap filter, sorted by will + need; kind knSell asks the first knSB().try who are off cooldown — npwReg lim; their news is checked in the kind's why) */
function knSellCands(x){const own=knStaff(x);const kx=key(x);const C=[];for(const s of knAllSrv()){if(own.includes(s)||s.spyFor===kx)continue;const o=ownerOf(s);if(!o||o===x||(o!==S&&(!o.alive||o.out)))continue;const w=knSellW(s);if(w>0)C.push([s,w+knSellNeed(s)])}
 return C.sort((a,b)=>b[1]-a[1]).map(c=>c[0])}
function knSellNeed(s){try{const G=asB().goal;return (s.bac||0)<G.bac?((G.bac-(s.bac||0))/Math.max(1,G.bac)):0}catch(e){return 0}}
/* x hears it (paid or not): the gain is the same for her and for an NPC */
function knSellGive(x,s,n){if(window.J78MEMO)window.J78MEMO.clear();KN.stat.bought=(KN.stat.bought||0)+1;const o=n.about;
 if(n.kind==="hap"){KN.bk=KN.bk&&KN.bk.k===agKey()?KN.bk:{k:agKey(),m:{}};KN.bk.m[knId(x)+"|"+n.hid]={by:"buy",how:"buy",e:s};try{KN.m&&(KN.m.x={})}catch(e){}
  if(x===S)try{adHapNow()}catch(e){}return n.txt}
 if(x===S){let extra="";try{if(n.f.go)extra=n.f.go()||""}catch(e){}try{intelAdd(o,n.f,{by:s.name,how:"Mua tin"});noteAdd(o.id,`${s.name} bán tin: ${n.txt}`)}catch(e){}knSellItem(s,n.txt,palaceOf(o));return n.txt+extra}
 x.knB=x.knB||{};x.knB[n.k]={t:n.txt,w:wk()};if(/^(plan|affair|items|deed)/.test(n.k))evA(x,o,BAL.ag.ev.one);return""}
/* her TIN BÁO row for a bought fact: the seller named (inf = the seller; informerInfo kind "seller") */
function knSellItem(s,what,place){const T=knTb();const it={id:"buy:"+wk()+":"+(S.buoi||0)+":s"+s.sid+":"+T.R.length,k:"bao",place:place||palaceOf(S),b:S.buoi||0,k0:agKh(),k1:agKh(),who:["s"+s.sid],
 line:knSellLine(s,"tinbao:buyT",KN_POOL.buyT).replace(/\{what\}/g,what),by:"buy",inf:knSrvKey(s),infName:s.name||"",seen:1};T.R.push(it);if(T.R.length>knB().keep)T.R.shift();for(const f of KN.cb)try{f(Object.assign({},it))}catch(e){console.error("tinBao cb",e)}}
function knSellLine(s,k,pool){const o=ownerOf(s);let t="";try{t=kSay(knSpk(s),S,kLine(k,pool,{m:"any"}),{m:"cool"})}catch(e){t=pool.any[0]}return t.replace(/\{N\}/g,s.name).replace(/\{P\}/g,o?(o===S?"ta":NM(o)):"khác")}
KN_POOL.sell={any:["{Xung} có một tin rất đắt giá, {goi} có muốn biết không?","Bẩm {goi}, {xung} có một tin rất đắt giá. {Goi} có muốn nghe không?"]};
KN_POOL.buy={any:["{N}, người hầu cung {P}, bán tin: ở {W} {what}.","{N}, người hầu cung {P}, nhận bạc rồi bẩm: {what}, ngay ở {W}."]};
KN_POOL.buyT={any:["{N}, người hầu cung {P}, nhận bạc rồi bẩm: {what}"]};
/* the offer to HER: a kit event card (Q, j3 modal: speaker portrait + options, bạc cost shown and checked by the kit) */
function knSellCard(s,n){const P=knSB();const price=knSellPrice(n.val,s);const o=ownerOf(s);
 const buy={n:"Mua tin",fx:{bac:-price},x:`nghe một tin thật, đáng giá · ${P.kh} khắc`,go:()=>{spend(P.kh);const t=knSellGive(S,s,n);log(`${s.name} (người hầu cung ${NM(o)}) bán tin: ${t}`);Q.push({t:"Tin mua được",who:pServ(s),h:`<p>${t}</p>`})}};
 if(!dayFit(P.kh))kitOff(buy,dayWhy(P.kh));
 const no={n:"Không mua",fx:{},x:"không biết tin ấy",go:()=>{knNo()[n.id]=1;KN.stat.refused=(KN.stat.refused||0)+1;try{KN.m&&(KN.m.x={})}catch(e){}knSellNpc(s,n,S)}};
 return {t:"Có người bán tin",who:pServ(s),h:`<p>${s.name}, người hầu cung ${NM(o)}, lén tìm đến: “${knSellLine(s,"tinbao:sell",KN_POOL.sell)}”</p>`,opts:[buy,no],sell:{sid:s.sid,id:n.id,price}}}
/* an NPC buyer weighs it (worth vs price; her bạc), pays, hears it */
function knSellNpcBuy(x,s,n){const P=knSB();const price=knSellPrice(n.val,s);if((x.bac||0)<price)return false;
 let c=null;try{c=mindPick([["buy",P.npc.buy*n.val/100],["no",P.npc.no*price/Math.max(price,x.bac||0)]],x)}catch(e){}
 if(c!=="buy"){KN.stat.npcNo=(KN.stat.npcNo||0)+1;return false}x.bac=(x.bac||0)-price;KN.stat.npcBuy=(KN.stat.npcBuy||0)+1;knSellGive(x,s,n);return true}
/* refused: the seller tries another buyer with the same news (not the one who refused) */
function knSellNpc(s,n,skip){for(const x of liveRivals(true)){if(x===skip||x===ownerOf(s)||!x.alive||x.out)continue;const N=knSellNews(x,s).filter(q=>q.id===n.id);if(N.length&&knSellNpcBuy(x,s,N[0]))return x}return null}
/* once per buổi per buyer: BAL.ag.sell.o % that a seller comes (her: only when the day still has the khắc; not as a maid) */
function knSellTick(){if(!knOn()||!S||S.dead||S.out)return;const T=knTb();const key=agKey();if(T.sl===key)return;T.sl=key;const P=knSB();/* ag2-perf F1: one memo of the owners' facts for this pass (j95 J78MEMO); a sale drops it (knSellGive) */window.J78MEMO=new Map();try{knSellTick0(P)}finally{window.J78MEMO=null}}
function knSellTick0(P){
 try{if(!(typeof isSrv==="function"&&isSrv())&&dayFit(P.kh)&&roll(agOdd(P.o))){const r=knSellPick(S,npcWhy("knSell",{x:S}));if(r){KN.stat.offer=(KN.stat.offer||0)+1;Q.push(knSellCard(r.s,r.n))}}}catch(e){agErr("knSell",e)}
 for(const x of liveRivals(true)){if(!x.alive||x.out||x.confined)continue;try{if(!roll(agOdd(P.o)))continue;/* npc-purpose G2a: roll = the buổi gives a chance to meet; WHO comes is a seller with a goal */const r=knSellPick(x,npcWhy("knSell",{x}));if(r)knSellNpcBuy(x,r.s,r.n)}catch(e){agErr("knSellNpc",e)}}}
/* the j67 story beat "Một kẻ gạ bán tin" (GB67.spy) runs through the same engine: "Mua tin" / "Ép hắn khai" bring the best true news a real seller has */
function knSellArc(A,ok){if(!ok||!knOn())return"";const r=knSellPick(S);if(!r)return"";const o=ownerOf(r.s);const t=knSellGive(S,r.s,r.n);return t?`(${r.s.name}, người hầu cung ${NM(o)}: ${t})`:""}
(function(){
 /* bought news is known; refused news is not, this khắc, by any path */
 const f0=knFor;knFor=function(x,h){if(x&&h){try{const hid=knHid(h);if(x===S&&knNo()[hid])return null;const B=KN.bk;if(B&&B.k===agKey()){const r=B.m[knId(x)+"|"+hid];if(r)return r}}catch(e){}}return f0.apply(this,arguments)};
 if(typeof j78facts==="function"){const j0=j78facts;j78facts=function(v){const F=j0.apply(this,arguments);try{if(S&&v&&S.tb&&S.tb.no&&S.tb.no.k===knKhK()){const N=S.tb.no.ids;return F.filter(f=>!N["v"+v.id+"|"+f.k])}}catch(e){}return F}}
 if(typeof j95sync==="function"){const s0=j95sync;j95sync=function(){const r=s0.apply(this,arguments);try{knSellTick()}catch(e){agErr("knSellTick",e)}return r}}
 try{if(typeof GB67==="object"&&GB67.spy&&GB67.spy.o){for(const i of [0,1]){const op=GB67.spy.o[i];if(!op)continue;const g0=op.go;op.go=function(A,ok){let a="";try{a=g0?g0.apply(this,arguments)||"":""}catch(e){}return [a,knSellArc(A,ok)].filter(Boolean).join(" ")}}}}catch(e){}
})();
Object.assign(window,{btTerms,btRaw,btOdds,tmFear,knSellNews,knSellPick,knSellGive,knSellCard,knSellNpcBuy,knSellTick,knSellPrice,knSellArc});

/* ================= WITNESSES + GOSSIP — the per-servant knowledge record (owner OD 18/11 ~19:45Z (4); brief live-servants #2) =================
   Owner (verbatim): "Chỉ có những người mình dẫn theo thì mới biết được những cái thông tin mà mình thấy ngay ngày hôm đó ... sẽ có cung nữ biết chuyện
   này, sẽ có cung nữ biết chuyện kia đó. Rồi nhiều khi họ truyền tay nhau, bởi vì cái tính người ta nhiều chuyện đó, thì về người ta mới kể lại".
   ONE record S.knw (personal, lazy; old saves load): I = the things that happened {w what, pl place, wk day, b buổi, kh khắc, ab about whom},
   K[record id] = {item: [from, hop]} — who knows what, from whom ("saw" = she stood there; else the record id of the one who told her).
   1. SEEN: a deed that lands (agLand, every NPC's deed; twDo for the player's own shared deeds) is seen by every servant whose record row stands at
      that place at that khắc (not asleep): her companions see her day, those left at home do not (rows from j95s: the picked entourage).
   2. GOSSIP: each khắc, servants who stand at one place in a talking act (BAL.slv.gos.acts: meals, breaks, rest turn, visits, errands, keeping the
      palace, walking in a train) pass what they know: p × (1 + qv(gos.q, the teller)) (a chatty one more, a timid one less), at most gos.hop hands.
   3. TOLD UP: a servant who learns a thing (seen or heard) tells HER mistress by the chain's own choice (knTell: tell / keep / sell by lòng and nết),
      unless the mistress was there or it is about herself; the player gets it as a TIN BÁO "bao" line in the servant's voice (knBao); an NPC
      mistress then knows it (K["v<id>"]). Two-way: the same rule for every household. Numbers BAL.slv.gos (j95s). */
function knwOn(){try{return knOn()&&typeof j95sOn==="function"&&j95sOn()&&j95on()}catch(e){return false}}
function knwMid(s,m){try{if(!m||!(typeof j95sOn==="function"&&j95sOn()))return"";if(m===S&&S.maid===s)return"mm:me";if(m!==S&&m.maid===s)return"mm:"+m.id;return""}catch(e){return""}}
function knwSt(){const d=wk();const Z=S.knw||(S.knw={I:{},K:{},n:0,d});if(Z.d!==d){Z.d=d;const G=BAL.slv.gos;for(const i in Z.I)if(Z.I[i].wk<d-G.days)delete Z.I[i];for(const k in Z.K){for(const i in Z.K[k])if(!Z.I[i])delete Z.K[k][i];if(!Object.keys(Z.K[k]).length)delete Z.K[k]}Z.seen={}}return Z}
function knwSrv(id){return /^s\d+$/.test(id)||id.indexOf("mm:")===0}
/* perf (outcome-identical, live-servants #3): knwObj memo for ONE gossip pass (a pure lookup: j95sv + ownerOf), and qv of a servant whose nết is
   already drawn read from a table by her nết (traitsOf(s) = s.net then, so qv is a pure function of it; a servant whose nết is not drawn yet goes
   through qv itself, so its lazy draw happens exactly when it did) */
let KNWO=null;const KNWQ=new WeakMap();
function knwQv(tbl,s){try{if(s&&typeof s==="object"&&trRes(s)===s&&s!==S&&s.kind!=="emp"&&s.kind!=="th"&&s!==S.emp&&netOk(s.net,netSex(s))){let M=KNWQ.get(tbl);if(!M){M=new Map();KNWQ.set(tbl,M)}
  const k=s.net[0]+"|"+s.net[1]+"|"+s.net[2];let v=M.get(k);if(v===undefined){v=qv(tbl,s,0);M.set(k,v)}return v}}catch(e){}return qv(tbl,s,0)}
function knwObj(id){if(KNWO){if(KNWO.has(id))return KNWO.get(id);const o=knwObj0(id);KNWO.set(id,o);return o}return knwObj0(id)}
function knwObj0(id){try{if(id==="mm:me")return{s:S.maid,m:S};if(id.indexOf("mm:")===0){const v=RV(+id.slice(3));return v&&v.maid?{s:v.maid,m:v}:null}const s=KNWO&&typeof j95sSvTab==="function"?knwSvT(id):j95sv(id);return s?{s,m:ownerOf(s)}:null}catch(e){return null}}
/* the gossip pass's sid → servant table (j95sSvTab: j95sv's own order, first match) */
function knwSvT(id){if(!KNWO.sv)KNWO.sv=j95sSvTab();const s=KNWO.sv.get(+String(id).slice(1));return s===undefined?null:s}
function knwAdd(Z,id,iid,from,hop){const K=Z.K[id]||(Z.K[id]={});if(K[iid])return false;K[iid]=[from,hop];const ks=Object.keys(K);if(ks.length>BAL.slv.gos.keep)delete K[ks[0]];return true}
/* knwAdd + the gossip group's count C kept exact (same add, same drop of the oldest) */
function knwAddC(Z,id,iid,from,hop,T){const K=Z.K[id]||(Z.K[id]={});if(K[iid])return false;K[iid]=[from,hop];const C=T.C;
 const c0=C.get(iid)||0;C.set(iid,c0+1);if(c0<T.n&&c0+1>=T.n)T.u--;else if(c0===0&&T.n>1)T.u++;
 const ks=Object.keys(K);if(ks.length>BAL.slv.gos.keep){const e=ks[0];delete K[e];if(C.has(e)){const c=C.get(e);C.set(e,c-1);if(c>=T.n&&c-1<T.n)T.u++}}return true}
function knwName(id){try{const R=agRec();return (R&&R.who&&R.who[id]&&R.who[id][0])||id}catch(e){return id}}
/* she tells her mistress (or keeps it): the chain's own choice */
function knwUp(Z,id,iid){const I=Z.I[iid];const o=knwObj(id);if(!I||!o||!o.s||!o.m)return;const m=o.m;const mk=m===S?"me":"v"+m.id;if(I.ab===mk)return;
 const mz=Z.K[mk]&&Z.K[mk][iid];if(mz)return;/* she knows already (she was there, or another told her) */
 let c="keep";try{c=knTell(o.s,m,"knw:"+iid)}catch(e){}if(c!=="tell")return;const fr=Z.K[id][iid][0];
 knwAdd(Z,mk,iid,id,Z.K[id][iid][1]+1);
 if(m===S){const what=(fr==="saw"?`tận mắt thấy ở ${agPlaceTxt(I.pl)}: `:`nghe ${knwName(fr)} kể: `)+I.w;try{knBao(o.s,S,what,I.pl,I.b!==(S.buoi||0)||I.wk!==wk())}catch(e){}}}
function knwSee(pl,kh,what,ab,key){if(!knwOn()||!pl)return 0;const R=agRec();if(!R||!R.P)return 0;const Z=knwSt();Z.seen=Z.seen||{};if(key){if(Z.seen[key])return 0;Z.seen[key]=1}
 const iid="i"+wk()+"."+(++Z.n);Z.I[iid]={w:what,pl,wk:wk(),b:S.buoi||0,kh,ab};const L=[];
 for(const id in R.P){const x=R.P[id][kh];if(!x||x[0]!==pl)continue;if(knwSrv(id)){if(x[1]==="sleep")continue;if(knwAdd(Z,id,iid,"saw",0))L.push(id)}
  else if(id==="me"||/^v\d+$/.test(id))knwAdd(Z,id,iid,"saw",0)}/* the mistresses who stood there saw it too (they need no telling) */
 if(!L.length){for(const k in Z.K)delete Z.K[k][iid];delete Z.I[iid];return 0}
 for(const id of L)knwUp(Z,id,iid);KN.stat.knwSee=(KN.stat.knwSee||0)+L.length;return L.length}
/* the khắc's gossip: servants at one place in a talking act share what they know */
function knwGossip(){if(!knwOn())return 0;const R=agRec();if(!R||!R.P||R.key!==j95key())return 0;const kh=j95kh();const Z=knwSt();const gk=R.key+":"+kh;if(Z.gk===gk)return 0;Z.gk=gk;
 const G=BAL.slv.gos;const A=new Set(G.acts);const by={};let n=0;
 for(const id in Z.K){if(!knwSrv(id))continue;const x=R.P[id]&&R.P[id][kh];if(!x||!A.has(x[1]))continue;(by[x[0]]=by[x[0]]||[]).push(id)}
 for(const id in R.P){if(!knwSrv(id)||Z.K[id])continue;const x=R.P[id][kh];if(!x||!A.has(x[1])||!by[x[0]])continue;by[x[0]].push(id)}
 /* perf: knHit("g"+gk+"|"+a+">"+b+"|"+iid, p) = the same FNV hash (knH), run from a cached state of its fixed head (seed|g<gk>|a>b|) */
 const fnv=(h,t)=>{for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619)}return h};
 KNWO=new Map();try{
 for(const pl in by){const L=by[pl];if(L.length<2)continue;
  /* perf: C = how many of this group know each thing (kept exact below: +1 on each add, −1 on the oldest dropped past gos.keep); a thing all of
     them know already has no one to pass to — the b loop would skip every one of them, so it is skipped whole (no draw, no change) */
  /* SN = each one's keys read once here, in for-in order; reused as her own loop below unless someone told her something since (D: then read again) —
     her own record does not change while she tells (she is never her own listener; her mistress's record is another one) */
  const C=new Map(),SN=new Map(),D=new Set();for(const b of L){const Kb=Z.K[b];if(Kb){const ar=[];for(const i in Kb){ar.push(i);C.set(i,(C.get(i)||0)+1)}SN.set(b,ar)}}const nL=L.length;
  /* T.u = how many things this group does not all know yet; while it is 0 nobody has anything to pass on (every b loop would skip) */
  const T={C,n:nL,u:0};for(const v of C.values())if(v<nL)T.u++;
  for(const a of L){const K=Z.K[a];if(!K)continue;const o=knwObj(a);const q=o&&o.s?knwQv(G.q,o.s):0;let ha=null,HB=null;const p=G.p*(1+q);
   if(!T.u)continue;let ks=D.has(a)?null:SN.get(a);if(!ks){ks=[];for(const i in K)ks.push(i)}
   for(const iid of ks){if(!T.u)break;const [,hop]=K[iid];if(hop>=G.hop||!Z.I[iid])continue;if((C.get(iid)||0)>=nL)continue;
    for(const b of L){if(b===a||(Z.K[b]&&Z.K[b][iid]))continue;
     if(ha===null){ha=fnv(2166136261,String(knSeed()+"|"+"g"+gk+"|"+a+">"));HB=new Map()}let hb=HB.get(b);if(hb===undefined){hb=fnv(ha,b+"|");HB.set(b,hb)}
     if(!((((fnv(hb,iid)>>>0)%10000)/100)<p))continue;if(knwAddC(Z,b,iid,a,hop+1,T)){D.add(b);n++;knwUp(Z,b,iid)}}}}}
 }finally{KNWO=null}
 KN.stat.knwGos=(KN.stat.knwGos||0)+n;return n}
/* who knows a thing / what one person knows (dev + tests; roster.js --who reads S.knw from the save) */
function knwOf(id){const Z=S.knw;if(!Z||!Z.K[id])return[];return Object.keys(Z.K[id]).map(i=>Object.assign({id:i,from:Z.K[id][i][0],hop:Z.K[id][i][1]},Z.I[i]||{})).filter(x=>x.w)}
(function(){
 const l0=agLand;agLand=function(p,seen){const r=l0.apply(this,arguments);try{if(r&&p&&knwOn()){const v=RV(p.vid);const t=agPerson(p.t);if(v)knwSee(p.pl,p.kh,`${v.name} ${p.act}${t?" "+(t===S?S.name:t.name||""):""}`.trim(),"v"+v.id,"a:"+(p.key||"")+":"+p.vid+":"+p.k+":"+p.kh)}}catch(e){agErr("knwSee",e)}return r};
 const tw0=twDo;twDo=function(a,t,k){const r=tw0.apply(this,arguments);try{if(a===S&&r&&knwOn()){const H=agHereKh();if(H)knwSee(H.k,H.kh,`${S.name}: ${String(r).replace(/^Ngươi\s+/,"")}`,"me","m:"+H.R.key+":"+k+":"+H.kh+":"+(t&&t.id||""))}}catch(e){agErr("knwSeeMe",e)}return r};
 const s0=j95sync;j95sync=function(){const r=s0.apply(this,arguments);try{knwGossip()}catch(e){agErr("knwGossip",e)}return r};
})();
Object.assign(window,{knwSee,knwGossip,knwOf});
