/* ================= jone: EVERY act-merge door → a ONE-TAP act (worker DOOR-ONETAP, MAIN CHÍNH 168) =================
   Owner (OD 27/11): ~01:03Z/~01:05Z «one button, but she never loses odds control: the button shows ONE odds word before she taps; the game picks the
   BEST fit she has … never worse than her best old option; she controls risk with nhẹ/vừa/nặng tiers where the matter has them; the result tells the
   real topic/art/item» · ~01:07Z/~01:09Z «convert EVERY door … Ok sửa hết đi» · ~01:12Z «bấm vô hãm hại thì cái kết quả nó có thể là quẹt mực lên mặt
   này, có thể là tạt nước trà này … không có cái chuyện mà mình hãm hại nhẹ mà nó lại ra cái kết quả là rạch mặt» (the tier bounds the outcome; inside
   a tier, equal-weight REAL outcomes; no extra confirm after nặng) · ~01:14Z «npc và người chơi chung cũng giống vậy» (law 1: same acts for NPCs / co-op).
   Plan: dev/handover/reports/door-onetap.md. MODES per door row (ONE.M below; a row not listed = ONE):
     ONE  — tap = act. pick = among members that can run now: FAVOUR doors → highest odds (never worse than her best old way), tie → the row's pref, tie →
            the fixed seed; HARM doors → equal chance among them (seeded per target + buổi + door, so co-op host and guest pick the same).
            The button carries the picked member's odds (a.o → the kit word) and line.
     TIER — the standard choice card (PEND «door» / DOOR.card, KIT §7.1 tier in the title) with ≤ 3 rows nhẹ · vừa · nặng; each row runs one member OF
            THAT TIER picked by the ONE rule (harm: equal chance among that tier's real outcomes → never heavier than the tier).
     SPLIT — not one matter: the row is cut (ONE.fix) so its members stand as their own buttons / cards again.
   Members are NOT rewritten: a picked member runs its old road (doorPick → talk(-1-j) / DOOR.more go → doAct / empAct / deck act(i)) with its own price,
   lock, roll, result, co-op intent and log line. No number typed (law 4): odds, costs and gains are the members' own (BAL). ============================ */
(function(){if(typeof DOOR!=="object"||!DOOR||!DOOR.add)return;
const ONE={on:1};window.ONE=ONE;
const txt=h=>String(h==null?"":h).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
const TI=["nhẹ","vừa","nặng"];
/* ---------- the table: mode, harm (equal chance) or favour (best odds), tiers by member id or name ---------- */
/* t: [[tier, RegExp on the member NAME | "<id>" , …], …] — read after the row's own tiers (jdoor J2 / jamove dl) */
const M={
 talk:{mode:"one",pref:"mend"},                       /* MAIN 168 Q3: ONE auto topic; «Tạ lỗi» first while she bears a grudge (j9 offers it only then) */
 gh:{mode:"tier",t:[["nhẹ",/^(Ghé chơi|Mượn son phấn)/],["vừa",/^(Giúp đỡ nàng|Giúp chăm thú nuôi)/,"a:petcare"],["nặng",/^Tặng quà/,"a:gift"]]},
 kg:{mode:"one"},                                     /* SPLIT from gh: «Kết giao» (alliance = another result) */
 play:{mode:"tier",t:[["nhẹ",/^Cùng chơi/],["vừa",/^Thách đấu/]]},
 hau:{mode:"one",pref:"like"},
 pho:{mode:"one",pref:"art"},
 dl:{mode:"tier"},                                    /* jamove tiers: nhẹ cành hoa · vừa quà trong rương */
 so:{mode:"one"},so2:{mode:"tier",t:[["nhẹ",/^Hầu chuyện, xem lén/],["vừa",/^Xem sổ nguyệt sự/]]},
 dola:{mode:"tier",t:[["nhẹ",/^Nghe ngóng chung/],["vừa",/^Sai đi dò la/]]},
 P5:{mode:"tier",harm:1,t:[["nhẹ",/^(Dò la|Nghe lén câu chuyện)$/,"a:spy"],["vừa","a:bribe"],["nặng","a:bribel"]]},
 P6:{mode:"tier",harm:1},P7:{mode:"tier",harm:1},P8:{mode:"tier",harm:1},P9:{mode:"tier",harm:1},P10:{mode:"tier",harm:1},P14:{mode:"tier",harm:1},
 /* KEEP-CHOICE (MAIN 168 per owner ~01:12Z correction): she picks WHAT / WHOM herself (charge + listener, what to do with the proof) → the old card stays */
 P11:{mode:"keep"},P12:{mode:"keep"},
 P13:{mode:"tier",harm:1,t:[["nhẹ","e:cutpay"],["vừa","e:conf","a:takeaway"],["nặng","e:judge"]]},
 P13r:{mode:"one"},P13p:{mode:"one"},
 s_phan:{mode:"keep"},
 s_gh:{mode:"tier",t:[["nhẹ",/^Trò chuyện$/],["vừa",/^Biếu quà nhỏ$/]]},
 /* deck doors (DOOR.D k) */
 "hs-nghi":{mode:"tier",t:[["nhẹ",/^Nghỉ ngơi một lát$/],["vừa",/^Nghỉ ngơi dưỡng sức$/]]},
 /* ILLNESS-CURE (MAIN 182): while she is ill the door is ONE matter, the cure (law 2): nhẹ rest / own medicine · vừa thuốc from Thái y viện · nặng thái y (bạc) or
    ngự y (cầu xin, no bạc); the pulse-reading roads (no cure) stay off the tiers then — they hid the cure (the favour pick took «Mời thái y bắt mạch», read as sure) */
 "hs-thaiy":{mode:"tier",get both(){let ill=false;try{ill=!!(S&&typeof illOf==="function"&&illOf(S))}catch(e){}return ill?["nặng"]:null},get t(){let ill=false;try{ill=!!(S&&typeof illOf==="function"&&illOf(S))}catch(e){}
  return ill?[["nhẹ",/^(Tĩnh dưỡng|Tự bốc thuốc)$/],["vừa",/^Sang Thái y viện xin thuốc$/],["nặng",/^(Truyền thái y|Cầu xin ngự y)$/]]
   :[["nhẹ",/^(Tĩnh dưỡng|Tự bốc thuốc)$/],["vừa",/^Sang Thái y viện xin bắt mạch$/],["nặng",/^(Mời thái y bắt mạch|Truyền thái y)$/]]}},
 "hs-soksp":{mode:"tier",t:[["nhẹ",/^Xem lén sổ nguyệt sự$/],["vừa",/^Xem sổ nguyệt sự$/]]},
 "hs-docsach":{mode:"tier",t:[["nhẹ",/^Đọc sách giải khuây$/],["vừa",/^Đọc binh thư/]]},
 "hs-tainghe":{mode:"one",pref:"art"},
 "hs-taimat":{mode:"tier",t:[["nhẹ",/^Nghe ngóng chung$/],["vừa",/^Sai cung nữ đi dò la$/],["nặng",/^Cài tai mắt$/]]},
 "hs-roicung":{mode:"keep"},d_srv2:{mode:"keep"},d_cold1:{mode:"keep"},d_cold2:{mode:"keep"},d_cold4:{mode:"keep"},
 d_srv1:{mode:"tier",t:[["nhẹ",/^(Nghe ngóng cho chủ|Canh chừng cung chủ)$/],["vừa",/^Tự đi dò la cho chủ$/]]},
 d_srv4:{mode:"tier",harm:0,t:[["nhẹ",/^Thêu khăn bán ra ngoài$/],["vừa",/^Lén giữ đồ/]]},
};
ONE.M=M;
ONE.mode=k=>(M[k]&&M[k].mode)||"one";
/* ---------- SPLIT: rows cut so their members stand alone (idempotent; jamove amRows may run later and re-add, so this runs before every use) ---------- */
function fix(){
 const gh=DOOR.byK("gh");if(gh){gh.re=/^(Tặng quà|Giúp đỡ nàng|Giúp chăm thú nuôi của nàng|Mượn son phấn|Ghé chơi)/;if(gh.acts&&gh.acts.a)gh.acts.a=gh.acts.a.filter(k=>k!=="ally")}
 if(!DOOR.byK("kg"))DOOR.add({k:"kg",n:"Kết giao",kinds:["rival","hh","chest","card"],rep:"Kết giao",h:"Kết giao với nàng.",re:/^Kết giao/,acts:{a:["ally"]},one1:1});
 const so=DOOR.byK("so");if(so)so.re=/^Xem sổ thị tẩm/;
 if(!DOOR.byK("so2"))DOOR.add({k:"so2",n:"Xem sổ nguyệt sự",kinds:["ksp"],rep:"Xem sổ nguyệt sự",h:"Xem sổ nguyệt sự: xem lén, hay lót tay.",re:/^(Xem sổ nguyệt sự|Hầu chuyện, xem lén sổ nguyệt sự)/});
 const p13=DOOR.byK("P13");if(p13){p13.n="Trừng phạt";p13.rep="Xử tội";p13.h="Chọn mức trừng phạt nàng.";p13.acts={e:["judge","conf","cutpay"],a:["takeaway"]}}
 if(!DOOR.byK("P13r"))DOOR.add({k:"P13r",n:"Ban thưởng",cat:"trung-phat",kinds:["rival","hh","chest","card"],rep:"Ban thưởng",h:"Ban thưởng cho nàng.",re:/^$/,acts:{e:["reward"]},one1:1});
 if(!DOOR.byK("P13p"))DOOR.add({k:"P13p",n:"Tha tội",cat:"trung-phat",kinds:["rival","hh","chest","card"],rep:"Tha tội",h:"Tha tội cho nàng.",re:/^$/,acts:{e:["pardon"]},one1:1});
 for(const k of ["s_xin"]){const i=DOOR.T.findIndex(r=>r.k===k);if(i>=0)DOOR.T.splice(i,1)}
 /* deck rows (Hành sự): cut the members that are another matter */
 for(const r of DOOR.D||[]){if(r.oneFx)continue;
  if(r.k==="hs-caobenh"||r.k==="hs-thinhan"||r.k==="hs-anthai"){r.roads=[];r.oneFx=1}
  else if(r.k==="hs-nghi"){r.re=/^(Nghỉ ngơi một lát|Nghỉ ngơi dưỡng sức)$/;r.oneFx=1}
  else if(r.k==="hs-tainghe"){r.re=/^(Múa trong yến tiệc|Kinh hồng vũ|Đánh cờ với Hoàng thượng|Đàn khúc Phượng cầu hoàng)$/;r.oneFx=1}
  else if(r.k==="hs-roicung"){r.re=/^(Nghĩ cách trốn khỏi cung|Dâng biểu xin xuất gia|Xin ban hôn cho |Xin về quê phụng dưỡng cha mẹ)/;r.oneFx=1}}
 DOOR.names=new Set(DOOR.T.map(r=>r.n))}
ONE.fix=fix;
(function(){const d0=DOOR.deck;DOOR.deck=function(r){const x=d0.apply(this,arguments);try{fix()}catch(e){}return x}})();
fix();
/* ---------- tiers + odds of a member ---------- */
function tierOf(r,m){const id=m.id||"";const T0=r.tiers||{};let t=null;try{t=T0[id]||null}catch(e){}if(t)return t;
 const L=(M[r.k]||{}).t||[];const n=txt(m.n);for(const row of L){for(let j=1;j<row.length;j++){const x=row[j];if(typeof x==="string"?x===id:x.test(n))return row[0]}}return null}
ONE.tierOf=tierOf;
/* two-way (law 1): an ACT key's tier from this table too (P5 Dò la, P12, P13 …), so NPC deeds sit in the same tier as her row */
(function(){const o0=DOOR.ofId;DOOR.ofId=function(id){const m=o0.apply(this,arguments);try{if(m&&!m.tier)m.tier=tierOf(m.r,{id,n:""})}catch(e){}return m}})();
function wordIx(x){const s=txt(x);for(let i=KIT_ODDS.length-1;i>=0;i--)if(new RegExp("(^|· )"+KIT_ODDS[i]+"( ·|$)").test(s))return i;return -1}
/* a sortable odds of a member: the option's own odds (oddsOf) when it is a talk/deck option; else the word printed in its line (ACT card buttons) */
function oddsM(m){if(m.a){try{return oddsOf(m.a)}catch(e){}}const i=wordIx(m.x);if(i<0)return 100;return Math.round((i+.5)*100/KIT_ODDS.length)}
ONE.odds=oddsM;
function hash(s){let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)}
/* the pref score of a favour member (ties only): his liked topic she knows · his favourite art / her strongest art */
function prefOf(r,m){const p=(M[r.k]||{}).pref;const n=txt(m.n);try{
 if(p==="like"){const E=S.emp||{};let s=0;for(const k in (E.likes||{}))if(E.known&&E.known[k]&&E.likes[k]&&n.toLowerCase().includes(String(E.likes[k]).toLowerCase()))s+=2;
  if(/triều chính/.test(n)&&E.traits&&E.traits.includes("chinh"))s+=1;return s}
 if(p==="mend")return /^(Tạ lỗi|Nhún nhường)$/.test(n)?2:0;
 if(p==="art"){const A=S.arts||{};const L={cam:/đàn|cầm/i,ky:/cờ|kỳ/i,thi:/thơ|thi/i,hoa:/vẽ|họa/i,vu:/múa|vũ/i,theu:/thêu/i};let s=0;
  for(const k in L)if(L[k].test(n))s=Math.max(s,(+A[k]||0)+((S.emp&&S.emp.known&&S.emp.known.art&&S.emp.likes&&S.emp.likes.art===k)?2:0));return s}}catch(e){}return 0}
/* ONE pick among members M (each {id, n, x, off, a?, cost?}); seed fixed per target + buổi + door (+ tier) → co-op host and guest agree */
function pick(r,L,seed){const ok=L.filter(m=>!m.off);if(!ok.length)return null;const h=hash(seed);
 if((M[r.k]||{}).harm)return ok[h%ok.length];
 /* FAVOUR: the members whose odds WORD is the best word she has (never worse than her best old way, as she reads it), then the pref
    (his liked topic she knows / his favourite art · her strongest), then equal chance among the rest (seeded): variety of real outcomes, same word */
 /* a sure way and a «Rất vững» way read the same top word to her: one band */const lv=m=>{const o=oddsM(m);return o>=100?KIT_ODDS.length-1:(typeof oddsLv==="function"?oddsLv(o):Math.floor(o*KIT_ODDS.length/100))};
 const top=Math.max(...ok.map(lv));const C=ok.filter(m=>lv(m)===top);const pm=Math.max(...C.map(m=>prefOf(r,m)));const P=C.filter(m=>prefOf(r,m)===pm);
 return P[h%P.length]}
ONE.lv=m=>{const o=oddsM(m);return o>=100?KIT_ODDS.length-1:(typeof oddsLv==="function"?oddsLv(o):Math.floor(o*KIT_ODDS.length/100))};
ONE.pick=pick;
function seedOf(r,who,tier){let t=0,b=0;try{t=S.turn||0;b=S.buoi||0}catch(e){}return [t,b,who==null?"":who,r.k,tier||""].join(":")}
/* the why of a pick (~01:00Z: the result says what really happened and why it was the one) */
function whyOf(r,m,L){const ok=L.filter(x=>!x.off);if((M[r.k]||{}).harm)return"";
 const p=prefOf(r,m);const md=(M[r.k]||{}).pref;
 if(md==="like"&&p>=2)return"đúng chuyện ngài thích nghe";
 if(md==="mend"&&p>0)return"nàng đang giận ngươi";
 if(md==="art"&&p>0){let k="";try{const A=S.arts||{};k=Object.keys(A).sort((x,y)=>(+A[y]||0)-(+A[x]||0))[0]}catch(e){}return"môn ngươi giỏi nhất"+(S.emp&&S.emp.known&&S.emp.known.art?", lại hợp ý ngài":"")}
 return""}
/* ---------- members of a talk-side door (pop-up), same lists as the old card (jdoor PEND.door + DOOR.more) ---------- */
function members(pp,r){const out=[];let p=null;if(pp.kind!=null)pp.i=doorIdx(pp);p=curPeople()[pp.i];if(!p||!S.visit)return{p:null,L:out};let A=[];if(ONE.raw&&ONE.raw.p===p)A=ONE.raw.A;else try{A=doorRaw(p)}catch(e){return{p,L:out}}/* perf: inside one fold the raw list is the one the fold got */
 A.forEach((a,j)=>{if(!a||a.k61||a.door||DOOR.of(a.n,p.kind)!==r)return;const tc=talkK(a);const poor=!!(a.c&&a.c.bac&&S.bac+a.c.bac<0);
  const why=a.lock?txt(a.t)||"chưa làm được":poor?"không đủ bạc":!can(tc)?(txt(typeof whyTime==="function"?whyTime(tc):"")||"hết khắc buổi này"):"";
  let x="";try{x=optLine(a)}catch(e){}out.push({id:"t:"+txt(a.n),n:a.n,x,a,off:!!why,why,cost:tc,go:()=>doorPick(pp,j,a.n)})});
 if(typeof DOOR.more==="function"&&r.acts)try{for(const m of DOOR.more(p,r))if(!(r.hide||[]).includes(m.id)&&!out.some(o=>txt(o.n)===txt(m.n)))out.push(Object.assign({},m,{off:!!m.off,why:m.why||""}))}catch(e){console.error("one more",e)}
 return{p,L:out}}
ONE.members=members;
function who(p){try{const v=p&&p.ref;return v&&v.id!=null?v.id:(p&&p.kind)||""}catch(e){return""}}
/* run one member and say why it was the one (talk results: on the pop-up line; every result: Nhật ký) */
function runM(r,m,L,tier){const why=whyOf(r,m,L);const s0=typeof popMsg==="string"?popMsg:"";ONE.last={k:r.k,n:txt(m.n),id:m.id,tier:tier||null,why};
 (ONE.hist=ONE.hist||[]).push(ONE.last);if(ONE.hist.length>400)ONE.hist.shift();
 try{m.go()}finally{try{const head=`${r.n}${tier?" · "+tier:""}: ${txt(m.n)}${why?" — "+why:""}`;
  /* after the member's own result (the bubble shows the result first; the real member + why follow) */
  if(typeof popMsg==="string"&&popMsg!==s0&&!popMsg.includes(head)){popMsg=popMsg+` <span class="ef n">(${head})</span>`;try{render()}catch(e){}}
  if(typeof log==="function")log(head)}catch(e){}}}
ONE.runM=runM;
/* a ONE door tap / a TIER row tap */
function goOne(pp,r,tier){const {p,L}=members(pp,r);if(!p)return false;const T=tier?L.filter(m=>tierOf(r,m)===tier):L;const m=pick(r,T,seedOf(r,who(p),tier));if(!m)return false;runM(r,m,T,tier);return true}
ONE.go=goOne;
const wordOf=o=>o>=100?"":(typeof dfWord==="function"?dfWord(o):"");
/* E-GAIN3-LIVE law 3: a row that IS one member carries «Gợi ý» (jdoor doorHint, the J2 / talk door rows' own rule): base first (the E-GAIN3b-FIX rule) —
   the row's own line read by the kit; doorHint only when that says nothing gained. RV-183 (law 4 / 3, family): the kit read of the optLine HTML took a
   COST for a gain («Truyền thái y» Tốn Bạc 40 → «Thành: Bạc +»; Hối lộ Kính sự phòng, Dưỡng nhan, Sang Thái y viện xin thuốc «Sức +», Cầu xin ngự y «Sủng +»):
   a base read that only names one of the row's own costs as «+» is not a gain → the doorHint gate (DOOR.hintGain) answers instead. */
const HINT_ST={bac:"Bạc",suc:"Sức",sung:"Sủng",danh:"Danh",duc:"Đức",sac:"Sắc",tai:"Tài",tamco:"Tâm cơ"};
function costRead(b,c){const g=String(b||"").split(/[;,]/)[0].trim();if(!c)return false;for(const k in c)if((c[k]||0)<0&&HINT_ST[k]&&new RegExp("^"+HINT_ST[k]+" \\+").test(g))return true;return false}
function memberHint(m,n,x){const a=m.a||{n:m.n,x:m.x,c:m.c,o:m.o};const dh=typeof doorHint==="function"?doorHint(a,x):null,rn=n,rx=x,c=a.c;/* every row through the gate (E-GAIN3c-RV 6) */
 return dh?lv=>{let b="";try{b=kitHint({n:rn,x:rx},null,lv).hint}catch(e){}if(b&&!/^(chẳng được gì|không được mất gì)/.test(b)&&!costRead(b,c))return b;try{return dh(lv)}catch(e){return b}}:undefined}
function tierRows(r,L,wh){const rows=[];for(const t of TI){const T=L.filter(m=>tierOf(r,m)===t);if(!T.length)continue;
  /* law 2 (owner 27/11 ~00:46Z «a bạc road always has another road of matching tier»): a tier listed in the row's `both` shows EVERY way of that tier side by side
     (each its own Tốn / odds; greyed with the reason when she cannot take it) — never one picked by what she can pay (ILLNESS-CURE: nặng = Truyền thái y + Cầu xin ngự y) */
  const bo=(M[r.k]||{}).both;if(bo&&bo.includes(t)&&T.length>1&&!(M[r.k]||{}).harm){for(const m of T){const n=`${txt(m.n)} · ${t}`,x=String(m.x||"");rows.push({t,m,T:[m],n,x,c:m.a?m.a.c:m.c,hint:x?memberHint(m,n,x):undefined,off:m.off?{why:m.why||"chưa làm được"}:null})}continue}
  const m=pick(r,T,seedOf(r,wh,t));
  const free=T.filter(x=>!x.off);const harm=(M[r.k]||{}).harm;
  let x="",n=`${r.n} · ${t}`;if(m){const ln=String(m.x||"");/* the member's own kit line (optLine HTML: odds · tốn · được · hỏng), unchanged */
   if(harm&&free.length>1)x=`${ln} · ra một trong: ${free.map(y=>txt(y.n)).join(", ")}`;else{x=ln;n=`${txt(m.n)} · ${t}`}}
  const why0=(T[0]&&T[0].why)||"chưa làm được";
  /* E-GAIN3-LIVE law 3: a row that IS one member carries that member's price + «Gợi ý» (jdoor doorHint, the J2 / talk door rows' own rule): the dialog
     kit reads its Được from the hint; with the line alone a deck row («Nghỉ ngơi một lát · nhẹ») read «chẳng được gì; nhưng Sức −» */
  let c,hint;if(m&&x===String(m.x||"")&&x){c=m.a?m.a.c:m.c;hint=memberHint(m,n,x)}
  rows.push({t,m,T,n,x:x||(m?"chọn rồi xem kết quả ở bước sau":`chưa làm được: ${txt(why0)}`),c,hint,off:m?null:{why:why0}})}return rows}
ONE.tierRows=tierRows;
/* perf: one paint asks the same person + door many times (render → dfActs → card); the members list is kept for that paint only (state stamp) */
const MC={c:new Map(),t:0};
function stamp(){try{return [S.turn||0,S.buoi||0,typeof used!=="undefined"?used:0,S.logSeq||0,S.bac|0,S.suc|0,S.place,Q.length,S.visit&&S.visit.talked,JSON.stringify(S.visit&&S.visit.tk||{}),JSON.stringify(S.arts||{}),(S.emp&&S.emp.known)?Object.keys(S.emp.known).length:0].join(":")}catch(e){return Math.random()}}
function memo(k,f){k=k+"#"+stamp();if(MC.c.has(k))return MC.c.get(k);const r=f();MC.c.set(k,r);if(!MC.t)MC.t=setTimeout(()=>{MC.c.clear();MC.t=0},0);return r}
/* ---------- (1) the pop-up: decorate the folded doors (button = the pick's odds word + line) ---------- */
(function(){const f0=doorFold;doorFold=function(p,A){try{fix()}catch(e){}const out=f0.apply(this,arguments);if(!ONE.on||!Array.isArray(out))return out;
 const raw0=ONE.raw;ONE.raw={p,A};try{const i=curPeople().indexOf(p);if(i<0)return out;const pp0=k=>doorPP(p,i,k);
  /* a split row with ONE member only (Kết giao act, Ban thưởng, Tha tội): its own one-tap button */
  for(const r of DOOR.T){if(!r.one1||out.some(d=>d&&d.door===r.k)||(r.kinds&&!r.kinds.includes(p.kind)))continue;const {L}=members(pp0(r.k),r);if(!L.length)continue;
   if(L.length===1&&L[0].id&&L[0].id[0]==="t")continue;/* a bare talk option already stands for it */
   if(L.every(m=>m.id&&m.id[0]==="a")&&typeof dfInPerson==="function"&&L.every(m=>dfInPerson(p).some(x=>"a:"+x.k===m.id)))continue;/* dfActs shows a lone ACT itself */
   out.push({n:r.n,door:r.k,o:100,fix:1,x:"",open:()=>doorOpen(p,r.k)})}
  for(const d of out){if(!d||!d.door)continue;const r=DOOR.byK(d.door);if(!r)continue;const {L}=memo(["m",p.kind,p.ref&&p.ref.id,p.name,r.k].join("|"),()=>members(pp0(r.k),r));if(!L.length)continue;
   const md=ONE.mode(r.k);if(md==="keep")continue;const tiers=TI.filter(t=>L.some(m=>tierOf(r,m)===t));
   if(md==="tier"&&tiers.length>=2){const R=tierRows(r,L,who(p));d.x=R.map(x=>`${x.t} ${x.m&&!x.off?wordOf(oddsM(x.m))||txt(x.m.n):"—"}`).join(" · ");d.one="tier";
    if(R.every(x=>x.off)){d.lock=true;d.t=R[0].off.why}continue}
   const m=pick(r,L,seedOf(r,who(p)));d.one="one";
   if(!m){d.lock=true;d.t=(L[0]&&L[0].why)||d.t||"chưa làm được";continue}
   d.lock=false;delete d.t;const nm=txt(m.n);
   if(m.a){/* the option fields the kit line reads (optLine: odds · tốn · được · hỏng) = the picked member's own */for(const f of ["o","oi","inner","c","w","l","lx","act","pk"])if(m.a[f]!=null)d[f]=m.a[f];d.x=[nm,m.a.x].filter(Boolean).join(": ")}
   else{d.o=oddsM(m);const ln=txt(m.x).replace(/^(Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững) · /,"");d.x=`${nm} · ${ln}`}
   d.open=()=>{if(!goOne(doorPP(p,curPeople().indexOf(p),r.k),r))doorOpen(p,r.k)}}}
 catch(e){console.error("jone fold",e)}finally{ONE.raw=raw0}return out}})();
/* a door card opened from the focus view (her tap on «Hãm hại», a KEEP door …) was queued but never painted (seen on LIVE fa722503 too: Q 1, #modal hidden,
   no jdfv in-scene pick-up) — the card is painted at once through the normal showModal chain (jdfv takes it in-scene when her figure is up) */
(function(){const o0=doorOpen;doorOpen=function(){const n0=Q.length;const r=o0.apply(this,arguments);try{const m=Q[Q.length-1];const M=document.getElementById("modal");
 if(Q.length===n0+1&&Q.length===1&&m&&!m.dfSeen&&M){/* the focus view holds a centre card it cannot play in its scene: it steps back (✕, as her own close) and the card shows
   over the stage, like a door card from the pop-up card; then the normal showModal chain paints it (0 / 300 / 900 / 1500 ms, after the closing animation) */
  const paint=()=>{try{if(Q[0]!==m||m.dfSeen||!M.hidden)return;const F=typeof DF==="object"&&DF?DF.F:null;if(F&&F.open){try{F.close()}catch(e){}return}
   const dq=typeof DQ==="object"&&DQ?DQ:null;if(dq)dq.user=(dq.user||0)+1;try{showModal()}finally{if(dq)dq.user--}}catch(e){console.error("jone paint",e)}};
  [0,300,900,1500].forEach(t=>setTimeout(paint,t))}}catch(e){}return r};window.doorOpen=doorOpen})();
/* ---------- (2) the TIER card (PEND «door»: saveable) — ≤ 3 rows nhẹ · vừa · nặng ---------- */
(function(){const P0=PEND.door;PEND.door=pp=>{try{fix()}catch(e){}const r=DOOR.byK(pp&&pp.k);if(!ONE.on||!r||pp.r!=null||ONE.mode(r.k)!=="tier")return P0(pp);
 const {p,L}=members(pp,r);if(!p||!L.length)return P0(pp);const R=tierRows(r,L,who(p));if(R.length<2)return P0(pp);
 const o=R.map(x=>{const row={n:x.n,x:x.x,c:x.c,hint:x.hint,go:()=>{const q=Object.assign({},pp);if(!goOne(q,r,x.t))return}};if(x.off)row.off=x.off;return row});o.push({n:"Thôi"});
 const nm=(typeof k61Named!=="function"||!p.ref||k61Named(p.ref))?(p.name||""):"";let wh=null;try{const w=doorWho(p);wh=w&&typeof WHO==="function"?WHO(w):null}catch(e){}
 return{t:`${r.h.replace(/^Chọn (mức và )?(cách|chuyện|lời|sổ|môn)[^.]*\./,"Chọn mức.")}${nm?` <b>${nm}</b>`:""}`,o,who:wh}}})();
/* ---------- (3) DECK doors (Hành sự / cung nữ / lãnh cung / khuê các): tap = one way, or the tier card ---------- */
function deckRow(b){const I=b.dataset.ddi.split(",").map(Number);const a=deck[I[0]];const road=DOOR.road();
 return (DOOR.D||[]).find(r=>r.roads.includes(road)&&(r.re?r.re.test(txt(a&&a.n)):(()=>{try{return r.key(a,deck)===b.dataset.ddoor}catch(e){return false}})()))||null}
function deckM(b){const I=b.dataset.ddi.split(",").map(Number),X=b.dataset.ddx.split(",").map(Number);
 return I.map((i,j)=>{const a=deck[i];if(!a)return null;let w="";if(!X[j]){try{w=txt(cardWhy(a))}catch(e){}w=w||txt(a.lock&&a.t)||"chưa làm được lúc này"}
  let c=1;try{c=cardCost(a)}catch(e){}let ln="";try{ln=optLine(a)}catch(e){}/* E-GAIN3-LIVE law 3: the member's own kit line (as the people doors' members, tierRows) — a.x alone dropped its w gains («Nghỉ ngơi một lát · nhẹ» showed no Sức +) */
  return{id:"d:"+txt(a.n),n:a.n,a,x:ln||a.x||"",off:!X[j],why:w,cost:c,go:()=>{setTimeout(()=>{try{act(i)}catch(e){console.error("jone deck way",e)}},0)}}}).filter(Boolean)}
ONE.deckM=deckM;ONE.deckRow=deckRow;
function deckRowR(b){const r=deckRow(b);return r?Object.assign({},r,{n:b.dataset.ddoor}):{k:"?",n:b.dataset.ddoor}}
function deckTap(b){if(!S||S.dead||Q.length)return true;const r=deckRowR(b);const L=deckM(b);const md=ONE.mode(r.k);
 if(md==="tier"){const tiers=TI.filter(t=>L.some(m=>tierOf(r,m)===t));if(tiers.length>=2){const R=tierRows(r,L,"me");
   const rows=R.map(x=>{const o={n:x.n,x:x.x,c:x.c,hint:x.hint,ddoor:1,go:()=>{const m=pick(r,x.T,seedOf(r,"me",x.t));if(m)runM(r,m,x.T,x.t)}};if(x.off)o.off=x.off;return o});
   let wh=null;try{wh=typeof pMe==="function"?pMe():null}catch(e){}DOOR.card(b.dataset.ddoor,"Chọn mức.",rows,wh);return true}}
 const m=pick(r,L,seedOf(r,"me"));if(!m)return false;runM(r,m,L);return true}
ONE.deckTap=deckTap;
window.addEventListener("click",e=>{if(!ONE.on)return;const b=e.target.closest&&e.target.closest("#panel button[data-ddoor]");if(!b)return;try{const r=deckRow(b);if(r&&ONE.mode(r.k)==="keep")return}catch(x){}e.stopImmediatePropagation();e.preventDefault();if(b.disabled)return;
 try{deckTap(b)}catch(x){console.error("jone deck tap",x)}},true);
/* the deck door's small line: the pick (ONE) or the 3 tier words (TIER) */
function deckPaint(){const P=document.getElementById("panel");if(!P||!Array.isArray(deck))return;for(const b of P.querySelectorAll("button[data-ddoor]")){if(b.dataset.one)continue;b.dataset.one=1;
 try{const r=deckRowR(b);const md=ONE.mode(r.k);if(md==="keep")continue;const L=deckM(b);const p=b.querySelector("p");
  if(md==="tier"){const R=tierRows(r,L,"me");if(R.length>=2){if(p)p.textContent=R.map(x=>`${x.t}: ${x.m&&!x.off?txt(x.m.n):"—"}`).join(" · ");continue}}
  const m=pick(r,L,seedOf(r,"me"));if(!m)continue;const i=deck.indexOf(m.a);if(p)p.textContent=txt(m.n);
  /* the pick's own odds chip + Tốn/Thành/Bại grid (the kit card of that way), so the word she sees is the way that will run */
  const tp=document.createElement("template");tp.innerHTML=String(cardH(m.a,i)).trim();const nb=tp.content.querySelector("button");if(!nb)continue;
  for(const sel of [".krow",".kgrid"]){const o=b.querySelector(sel),n=nb.querySelector(sel);if(o&&n)o.replaceWith(n)}}catch(e){console.error("jone deck paint",e)}}}
if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{deckPaint()}catch(e){}return r};window.renderPanel=renderPanel}
if(DOOR.refold){const f0=DOOR.refold;DOOR.refold=function(){const r=f0.apply(this,arguments);try{deckPaint()}catch(e){}return r}}
/* ---------- (4) NPCs (law 1, owner ~01:14Z): an NPC's harm deeds = the same door + tier, ONE real outcome by equal chance inside that tier ---------- */
if(typeof haOpts0==="function"){const h0=haOpts0;haOpts0=function(v){const O=h0.apply(this,arguments);if(!ONE.on||!Array.isArray(O))return O;
 try{const G=new Map(),out=[];for(const o of O){const d=o&&o.door;if(!d||!d.tier||!(M[d.k]||{}).harm){out.push(o);continue}const key=[d.k,d.tier,o.t&&o.t.id].join("|");
   if(!G.has(key)){G.set(key,[]);out.push(key)}G.get(key).push(o)}
  return out.map(x=>{if(typeof x!=="string")return x;const L=G.get(x);if(L.length===1)return L[0];const r=DOOR.byK(L[0].door.k)||{k:L[0].door.k};
   const m=L[hash(seedOf(r,(v&&v.id)+">"+(L[0].t&&L[0].t.id),L[0].door.tier))%L.length];const u=Math.max(...L.map(y=>y.u||0));
   ONE.npc=(ONE.npc||0)+1;return Object.assign({},m,{u,oneOf:L.map(y=>y.ak)})})}catch(e){console.error("jone npc",e);return O}}}
})();
