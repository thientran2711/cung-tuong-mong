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
/* AG-ALL-2d per-khắc chain (owner OD 17/11 ~15:45Z L1638): news carried by someone (a servant, her Tai mắt, a friend sending word) reaches the master at the
   START of the khắc after the bearer's trip: seen at khắc q → the bearer reacts the next khắc (BAL.ag.kh2.rd.see) and spends it going (… .go) → known
   from q + see + go. Seeing it oneself (presence), one's own deed and the calendar are known at once; a friend met face to face passes on what she knows. */
function knRelay(){try{const B=BAL.ag.kh2.rd;return agRdOn()?(B.see||0)+(B.go||0):0}catch(e){return 0}}
function knFirst(id,h,w){for(let kh=w[0];kh<=w[1];kh++)if(knAt(id,kh)===h.k)return kh;return -1}
function knId(x){return x===S?"me":x&&x.sid!=null?"s"+x.sid:x&&x.id!=null?"v"+x.id:""}
/* a servant's key: her sid, or "cm<master>" for a confidant maid (S.maid / v.maid carry no sid) */
function knSid(s,m){return s.sid!=null?String(s.sid):"cm"+knId(m)}
/* ---------- a happening: id, window, people ---------- */
function knHid(h){let b="";try{b=bkey()}catch(e){}return b+":"+h.k+":"+h.id+":"+(h.x&&h.x.pid||"")}
function knPend(h){try{return h.x&&h.x.pid&&typeof haPend==="function"?haPend(h.x):null}catch(e){return null}}
function knWin(h){const kh=agKh(),KH=J95.KH;const p=knPend(h);if(p)return [p.kh,p.k1!=null?p.k1:p.kh];
 if(h.id==="emp"){try{const R=agRec();if(R&&R.P.emp){let a=-1,b=-1;for(let k=kh;k<KH;k++)if(R.P.emp[k]&&R.P.emp[k][0]==="vuon"){if(a<0)a=k;b=k}if(a>=0)return [a,b]}}catch(e){}}
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
 if(!r){for(const s of knStaff(x)){const how=knSrvKnows(s,x,h,w,hid);if(!how)continue;const q=how==="here"&&s.sid!=null?knFirst("s"+s.sid,h,w):w[0];if(Math.max(q,w[0])+D>now){KN.stat.wait=(KN.stat.wait||0)+1;continue}/* still on her way to tell */if(knTell(s,x,hid)==="tell"){r={by:"s"+knSid(s,x),how,s};break}}}
 if(!r&&w[0]+D<=now){let o=0;try{o=oSee(x,false)*knB().eye/100}catch(e){}if(knHit("e"+id+"|"+hid,o))r=knEye(x,h,hid)}
 if(!r&&!noFriend){const F=knB().friend;for(const v of liveRivals(true)){if(v===x||!v.alive||v.out)continue;const a=aff(v,x);if(a<F)continue;/* the news travels when they meet (same place this khắc), or a close friend sends word (aff ≥ close) */const meet=(()=>{const nw=agKh();return knAt(id,nw)!=null&&knAt("v"+v.id,nw)===knAt(id,nw)})();if(a<knB().close&&!meet)continue;const k=knFor(v,h,true);if(!k||k.by==="le"||k.how==="self")continue;
   if(!meet&&D>0){const ka=M.at["v"+v.id+"|"+hid+"|n"];if(ka==null||ka+BAL.ag.kh2.rd.go>now)continue}/* sending word: one trip after she knew (AG-ALL-2d) */
   /* she passes it on or keeps it to herself: her choice by how much she likes x (the servant's rule, thiện cảm for lòng) */
   const kk="f"+v.id+">"+id+"|"+hid;if(M.t[kk]==null){const T=knB().tell,lo=cl(a,0,100)/100;let c="keep";try{c=mindPick([["tell",Math.max(.01,lo*T.tell)],["keep",Math.max(.01,(1-lo)*T.keep)]],v)||"keep"}catch(e){}M.t[kk]=c}
   if(M.t[kk]==="tell"){r={by:"v"+v.id,how:"friend",v};break}}}
 if(r&&M.at[mk]==null)M.at[mk]=now;/* the first khắc she knew it (a friend's word travels from then) */
 return M.x[mk]=r}
/* ---------- the informer's line (jvoice: address by speaker and listener, mood by lòng / thiện cảm) ---------- */
const KN_POOL={
 srv:{warm:["Bẩm {goi}, {W} đang có chuyện: {what}. {Goi} có muốn qua xem không?","{Goi} ơi, {xung} vừa nghe {what} ở {W}. Chúng ta cùng tới xem thử nhé?","Bẩm {goi}, {xung} nghe người ta xì xào: {what}, ngay ở {W}."],
  cool:["Bẩm {goi}, ở {W} {what}.","Bẩm {goi}, {xung} nghe nói {what} ở {W}."],
  cold:["Ở {W} có chuyện: {what}. {Xung} chỉ nghe vậy.","{Goi} có hỏi thì {xung} bẩm: {what} ở {W}."]},
 friend:{warm:["{Goi}, {xung} vừa đi ngang {W}, thấy {what}. Có muốn cùng đi xem không?","{Goi} biết chưa? Ở {W} {what}."],
  cool:["{Xung} nghe nói ở {W} {what}."],cold:["Ở {W} {what}, {goi} không biết sao?"]},
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
function knTb(){let b="";try{b=bkey()}catch(e){}S.tb=S.tb||{};if(S.tb.b!==b){S.tb.b=b;S.tb.K={}}if(!S.tb.R||S.tb.d!==wk()){S.tb.d=wk();S.tb.R=[]}S.tb.K=S.tb.K||{};return S.tb}
function knRaw(){return KN.raw||[]}
function knScan(L){if(!S||S.dead||S.out)return[];try{knFlush()}catch(e){agErr("knFlush",e)}const T=knTb();KN.stat.scan++;const out=[];const now=agKh();
 for(const h of L){if(h.done)continue;const hid=knHid(h);const w=knWin(h);if(w[1]<now&&!knFixed(h))continue;
  let r=null;try{r=knFor(S,h)}catch(e){agErr("know",e)}if(!r){KN.stat.hidden++;continue}
  let it=T.K[hid];if(!it){it=T.K[hid]={id:hid,k:h.id,place:h.k,b:S.buoi||0,k0:w[0],k1:w[1],who:knWho(h),line:knLine(r,h),by:r.by,inf:knInf(r),infName:knInfName(r),seen:r.by==="here"?1:0};KN.stat.known++;knTmN(r.by==="mat"&&r.e);
   for(const f of KN.cb)try{f(Object.assign({},it))}catch(e){console.error("tinBao cb",e)}}
  else{it.k0=w[0];it.k1=w[1]}out.push(it)}
 return out}
function tinBaoList(){if(!knOn()||!S||S.dead||S.out)return[];let L=[];try{L=adHapNow()}catch(e){}const T=knTb();const now=agKh();
 const A=Object.values(T.K).filter(it=>it.k1>=now||it.k==="fest"||it.k==="cold");const R=(T.R||[]).filter(it=>it.b===(S.buoi||0));return A.concat(R).map(x=>Object.assign({},x))}
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
 const harm=knHarmK(e.k);if(roll(knHearO(v))){KN.stat.hearOk++;if(harm)evA(v,t,BAL.ag.ev.one);try{noteAdd(t.id,`${v.name} để ý chuyện nàng làm ở ${agPlaceTxt(pd.pl)}`)}catch(x){}return t===S?`${v.name} nghe lén chuyện ngươi làm ở ${agPlaceTxt(pd.pl)}`:""}
 affAdd(t,v,-BAL.ag.wit.caught);return t===S?`Ngươi bắt gặp ${v.name} đứng nghe lén`:""}
/* the news reaches them after the buổi's deciders have chosen (the deeds exist only then): a consort still free this buổi (she kept her schedule)
   weighs going to listen against keeping it — the owner's option 1 (OD 17/11 ~15:00Z): re-decide when news comes, not every khắc */
function knReact(){const key=agKey();if(KN.rk===key)return;KN.rk=key;if(!knDeedHaps().length)return;const t0=performance.now();
 for(const v of liveRivals(true)){if(!v.alive||v.out||v.confined)continue;try{if(agUsed(v))continue;let any=false;for(const h of knDeedHaps())if(knFor(v,h)){any=true;break}if(!any)continue;
  const N=agNeedsC(v);const O=knOpts(v,N);if(!O.length)continue;const c=mindPick([[null,BAL.ag.routine]].concat(O.map(o=>[o,o.u])),v);if(!c)continue;
  const sl=agSlot(v,c.at,c.t);if(!sl)continue;agPlan(v,c,N,sl[0],sl[1]);KN.stat.react=(KN.stat.react||0)+1}catch(e){agErr("knReact1",e)}}
 if(AG.now){AG.now=0;setTimeout(()=>{try{agSyncNow()}catch(e){}},0)}KN.ms=(KN.ms||0)+performance.now()-t0}
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
function knErr(s,m,k,t){const c=knErrPick(s,m);if(c==="tell")knErrGive(s,m,k,t,0);else if(c==="late"){S.knQ=(S.knQ||[]).concat([{at:agKey(),sid:s.sid,k,t:t?t.id:null}]).slice(-knB().keep)}
 else if(c==="sell")knErrSell(s,m,k,t);return c}
/* late reports land once the buổi has turned */
function knFlush(){if(!S||!S.knQ||!S.knQ.length)return;const key=agKey();const L=S.knQ.filter(x=>x.at!==key);if(!L.length)return;S.knQ=S.knQ.filter(x=>x.at===key);
 for(const x of L){try{const s=allServ().find(v=>v.sid===x.sid);if(!s||s.out)continue;const m=ownerOf(s);const t=x.t!=null?RV(x.t):null;knErrGive(s,m,x.k,t&&t.alive?t:null,1)}catch(e){agErr("knFlush",e)}}}
function knListenDo(s,m,ok){const v=ok?knListenPick(m):null;KN.stat.listen++;knErr(s,m,v?"listen":"listenF",v);return""}
function knScoutDo(s,m,t,ok){KN.stat.scout++;if(!t)return"";if(ok){KN.stat.scoutOk++;knErr(s,m,"scout",t);return""}
 /* a failed try: caught (BAL.ag.know.scout.caught %: the target's regard falls whatever she reports) or back empty-handed */
 if(roll(knB().scout.caught)){KN.stat.caught=(KN.stat.caught||0)+1;affAdd(t,m,-knB().scout.oan);knErr(s,m,"caught",t)}else knErr(s,m,"scoutF",t);return""}
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
  go:()=>{KN.stat.scout++;KN.stat.scoutOk++;evA(m,t,BAL.ag.ev.one);S.srv.intel=(S.srv.intel||[]).concat([t.id]).slice(-3);srvMerit(SRVA.scout.mp)},fail:()=>{KN.stat.scout++;if(roll(knB().scout.caught)){affAdd(t,m,-knB().scout.oan);log(`${t.name} bắt gặp ngươi lén dò la, e rằng nàng đã đoán ra.`)}else log(`Ngươi có đi dò la ${t.name} nhưng không dò được gì.`)}});
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
 const sc=()=>{if(KN.q)return;KN.q=1;setTimeout(()=>{KN.q=0;try{if(knOn()&&S&&!S.dead)adHapNow()}catch(e){}},0)};
 if(typeof j95sync==="function"){const s0=j95sync;j95sync=function(){const r=s0.apply(this,arguments);try{if(knOn())sc()}catch(e){}return r}}
 if(typeof agSlice==="function"){const a0=agSlice;agSlice=function(){const r=a0.apply(this,arguments);try{if(knOn()){if(!AG.q)knReact();sc()}}catch(e){agErr("knReact",e)}return r}}
})();
Object.assign(window,{KN,knFor,knOn,knHearO,knOpts,knStaffOpts,knSrvCards,knWatchLand,tinBaoList,tinBaoNew,tinBaoOn,tinBaoSeen});
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
function taiMatRaw(x){if(!x)return[];const k=key(x);return knAllSrv().filter(s=>{if(s.spyFor!==k)return false;const o=ownerOf(s);return !!o&&o!==x&&(o===S||(o.alive&&!o.out))})}
function knPickH(L,tag){return L.length?L[Math.min(L.length-1,Math.floor(knH(knSeed()+"|"+tag)*L.length/100))]:null}
function knEye(x,h,hid){const doer=knWho(h)[0],pl=h.k,nw=agKh();const at=s=>{const o=ownerOf(s);if(!o)return false;let pp=null;try{pp=palaceOf(o)}catch(e){}return pp===pl||knId(o)===doer||knAt("s"+s.sid,nw)===pl};
 const L=taiMatRaw(x);if(L.length){const N=L.filter(at);return {by:"mat",how:"mat",e:knPickH(N.length?N:L,"ew"+knId(x)+"|"+hid)}}
 const own=knStaff(x);const A=knAllSrv().filter(s=>!own.includes(s)&&ownerOf(s)!==x);const B=A.filter(at);const e=knPickH(B.length?B:A,"ep"+knId(x)+"|"+hid);
 return e?{by:"pass",how:"pass",e}:null}
function knPal(o){try{return palaceOf(o)}catch(e){return null}}
function knLoyK(p,s){return p===S&&s&&s.kn?cl(s.loyal||0,0,100):null}
function taiMatList(p){p=p||S;if(!p)return[];const N=p===S&&S.tmN||{};return taiMatRaw(p).map(s=>{const o=ownerOf(s);return{id:"s"+s.sid,sid:s.sid,name:s.name,role:s.role,
 placedAt:o?knPal(o):null,placedWith:o?knId(o):null,placedName:o?o.name:"",loyaltyKnown:knLoyK(p,s),reports:N[s.sid]||0}})}
function knSoldKey(s){return s&&s.sid!=null?String(s.sid):"maid"}
function knSoldFound(s){if(!s||!S)return;S.tmSold=S.tmSold||{};S.tmSold[knSoldKey(s)]=wk()}
function knSoldK(s){return !!(S&&S.tmSold&&S.tmSold[knSoldKey(s)]!=null)}
function knIsSold(s){return !!(s&&s.spyFor!=null&&s.spyFor!=="me")}
function informerInfo(it){if(!it||!S)return null;const by=String(it.by||"");const k=it.inf||(/^[sv]\d/.test(by)?by:null);if(!k)return null;
 if(k[0]==="v"){const v=RV(+k.slice(1));return{id:k,name:v?v.name:it.infName||"",isTaiMat:false,kind:"friend",soldOutKnown:false}}
 const s=k==="maid"?S.maid:servById(+k.slice(1));if(!s)return{id:k,name:it.infName||"",isTaiMat:false,kind:"passerby",soldOutKnown:false};
 const o=s===S.maid?S:ownerOf(s);const kind=o===S?"ownMaid":s.spyFor==="me"?"taiMat":"passerby";
 return{id:k,name:s.name,isTaiMat:kind==="taiMat",kind,soldOutKnown:kind==="ownMaid"&&knIsSold(s)&&knSoldK(s)}}
/* her Tai mắt's count of reports (set by the producers knScan / knBao) */
function knTmN(e){if(!e||e.sid==null||!S)return;S.tmN=S.tmN||{};S.tmN[e.sid]=(S.tmN[e.sid]||0)+1}
