/* ================= jnroad: NPC ROADS (owner OD:L1243, OD:L1252, OD:L1264, OD:L1386; ROAD_MAP.md §0 'NPC roads', reports/npc-roads.md) =================
   Every NPC woman lives one road of her own origin, like the player: a consort rolls an origin from her house (BAL.nroad.org) and one of
   that origin's four roads (the j67 premise arcs ARC67[road] with o:<origin>); her chapters are the SAME chapters the player would play
   (.4 = ARC67[road], .5–.11 = ROAD14[road][n] of jroad.js / jrd_<origin>.js). Nothing is copied: titles, cast keys, climax options and
   ending tags are read from that data at run time, so a chapter B adds later appears in NPC roads by itself.
   Off-screen: each chapter falls due after BAL.nroad.gap months; she plays it with HER OWN stats (odA, the stat the chapter's climax
   rewards, her Lợi thế from the chapter before) — no special roll for NPCs (OD:L1386). Its end moves real fields both ways (gain AND loss,
   BAL.nroad.fx), her rival is a REAL person of this life (another consort, or the player: real oán both ways, OD:L1247).
   It touches the player only for real reasons: (1) ONE chapter of her road per life (index rolled per life, OD:L1252) is a help hồi =
   a j72 follow-up «Phụ tuyến · {A}: road · Chương n» with a deadline (OD:L499), asked only when the bond or a shared side is real;
   (2) the player is her rival: the chapter's end lands on the player; (3) a palace news line (capped, BAL.nroad.newsMo).
   State: v.nr = {o origin, r road, n next chapter, k last ending sign, t turn due, h help chapter, hk help kind, hs help state,
   hb help bonus, c rival id ("me" = the player), e last ending tag, x closed, l lives log [n,k]} — saved with the consort (rivals).
   Host-only in co-op (world state; the jreign pattern). window.__nroff switches it off (bot ON/OFF measure). Kit only: j72 card + log. */
function nrGuest(){const C=window.COOPW;return !!(C&&C.on&&C.seat&&C.seat!=="a")}
function nrOn(){return !!(typeof S==="object"&&S&&!S.dead&&!window.__nroff&&typeof ARC67==="object")}
const nrB=()=>BAL.nroad;
const nrR=a=>a[0]+R(a[1]-a[0]+1);
/* men road templates (U3, jnroadm.js): NRM[id] = {k kind, t title, sk test stat, c: {4..11: chapter {t, w, sk, E}}} */
const NRM={};
/* the four roads of an origin (j67 premise arcs); a man's kind → his templates */
function nrRoads(o){const M=Object.keys(NRM).filter(id=>NRM[id].k===o);if(M.length)return M;/* a man's kind reads only men templates (kind "st" ≠ j67 o:"st") */
 return Object.keys(ARC67).filter(id=>ARC67[id]&&ARC67[id].o===o&&!ARC67[id].fu)}
/* chapter n of a road: .4 = the premise arc, .5–.11 = jroad chapters registered in this build (null = not built yet → skipped) */
function nrCh(r,n){if(NRM[r])return NRM[r].c[n]||null;if(n===BAL.road.first-1)return ARC67[r]||null;const R0=typeof ROAD14==="object"&&ROAD14[r];const id=R0&&R0[n];return id&&ARC67[id]||null}
function nrNext(r,n){for(let i=n;i<=BAL.road.last;i++)if(nrCh(r,i))return i;return 0}
/* origin of an NPC woman (canon ROAD_MAP §5.2: one father = one record) */
function nrOrigin(v){if(v.fromMaid||v.wasMaid)return "cn";let c="";try{c=clanOf(v)}catch(e){}const me=S.origin&&S.origin.k;
 let L=(nrB().org[c]||nrB().org[""]).filter(([o])=>!(nrB().uniq.includes(o)&&o===me));if(!L.length)L=nrB().org[""];
 const tot=L.reduce((a,z)=>a+z[1],0);let x=Math.random()*tot;for(const [o,w] of L){if((x-=w)<0)return o}return L[0][0]}
/* a road of that origin: avoid the player's road and roads other NPCs of the same origin already live (variety) */
function nrPickRoad(o,held){const L=nrRoads(o);if(!L.length)return "";const mine=S.st&&S.st.f14&&S.st.f14.road;
 held=held||rivals.filter(x=>x.nr&&x.nr.r).map(x=>x.nr.r);const free=L.filter(r=>r!==mine&&!held.includes(r));const L2=free.length?free:L.filter(r=>r!==mine);return pick(L2.length?L2:L)}
function nrInit(v){if(v.nr||!v.alive||v.out)return v.nr||null;const o=nrOrigin(v),r=nrPickRoad(o);if(!r)return null;v.nr=nrNew(o,r);return v.nr}
/* a fresh road state (consorts, maids, men): chapter .4 due BAL.nroad.d0 months from now; the help chapter rolled per life (OD:L1252) */
function nrNew(o,r){const n=nrNext(r,BAL.road.first-1);const H=nrB().helpN;const h=nrNext(r,H[0]+R(H[1]-H[0]+1))||0;
 return {o,r,n,k:0,t:S.turn+nrR(nrB().d0),h:h&&h<=H[1]?h:0,hs:0,hb:0,c:null,e:"",x:n?0:1,l:[]}}
/* the rival of her road: a REAL person kept for the whole road; the one she is coldest with (the player counts like any consort) */
function nrRival(v){const N=v.nr;const ok=p=>p===S?!S.dead&&!S.out:p&&p.alive&&!p.out&&p!==v;
 if(N.c!=null){const p=N.c==="me"?S:RV(N.c);if(ok(p))return p;const old=N.c==="me"?null:p;N.c=null;N.rc=old?old.name:""}
 /* the player is her rival only for a real reason (she is cold to the player) and only for a few NPCs at once (BAL.nroad.meMax) */
 const meN=rivals.filter(x=>x!==v&&x.alive&&!x.out&&x.nr&&!x.nr.x&&x.nr.c==="me").length;const meOk=!isSrv()&&aff(v,S)<0&&meN<nrB().meMax;
 const L=liveRivals(true).filter(p=>p!==v).concat(meOk?[S]:[]);if(!L.length)return null;
 L.sort((a,b)=>aff(v,a)-aff(v,b));const p=L[Math.min(L.length-1,R(Math.min(3,L.length)))];N.c=key(p);return p}
/* the stat the chapter's climax rewards (tamco, danh, duc, tai, sac, sung …) — read from the chapter data */
const NRSK={tamco:"tamco",mat:"tamco",danh:"danh",duc:"duc",an:"duc",tai:"tai",thi:"tai",cam:"tai",ky:"tai",hoa:"tai",vu:"sac",sac:"sac",sung:"sung"};
function nrStat(A){if(A&&A.sk)return A.sk;const cnt={};try{const P=A.p&&A.p[A.p.length-1]||[];for(const b of P){const d=A.B&&A.B[b];for(const o of(d&&d.o||[]))for(const k in(o.w||{})){const s=NRSK[k];if(s)cnt[s]=(cnt[s]||0)+1}}}catch(e){}
 const k=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];return k||"tamco"}
/* the ending of a chapter by its sign: the arc's own ending tag (E[*].tag) */
function nrEnd(A,k){const E=A&&A.E||{};const ks=Object.keys(E).filter(x=>(E[x].k||0)===k);const x=ks.length?E[pick(ks)]:null;return x&&x.tag?plain(x.tag):""}
function nrTitle(r){const A=NRM[r]||ARC67[r];return A?plain(A.t):""}
/* play one chapter off-screen (same odds shape as the player's climax: base + stat/div, Lợi thế only after a won chapter like hers — a lost chapter
   gives no malus, so no losing spiral — and her help) */
function nrPlay(v){const N=v.nr,A=nrCh(N.r,N.n);if(!A){N.n=nrNext(N.r,N.n+1);return""}const B=nrB();const sk=nrStat(A);
 const b=B.base+(v[sk]||40)/B.div+(N.k>0?B.sc:0)+(N.hb||0);const p=odA(v,b);
 const k=roll(p)?1:roll(p/2)?0:-1;const riv=nrRival(v);const fx=k>0?B.fx.win:k<0?B.fx.lose:B.fx.mid;
 const own={};for(const z in fx)if(z!=="pow")own[z]=fx[z];ap(v,own);if(v.suc!=null)v.suc=cl(v.suc,0,100);
 try{if(fx.pow){const c=clanOf(v);if(c&&typeof tdPowAdd==="function")tdPowAdd(c,fx.pow)}}catch(e){}
 let me="";if(riv){if(k>0)oanAdd(riv,v,B.oan.win);else if(k<0)oanAdd(v,riv,B.oan.lose);
  if(riv===S&&k!==0){const o=k>0?B.onMe.win:B.onMe.lose;ap(S,o);me=k>0?` ${v.name} lấn được ngươi một bước.`:` ${v.name} vấp ngã, ngươi bớt một mối lo.`}}
 const tag=nrEnd(A,k);N.e=tag;N.k=k;N.l.push([N.n,k]);N.hb=0;const n0=N.n;N.n=nrNext(N.r,N.n+1);if(!N.n)N.x=1;
 N.t=S.turn+nrR(B.gap);if(N.h&&N.h<=n0)N.hs=N.hs||-1;
 const rc=N.rc?` ${N.rc} nay không còn, kẻ đứng đối mặt nàng là ${riv?NM(riv):"người khác"}.`:"";N.rc="";
 return {n:n0,t:plain(A.t),tag,k,me,rc,riv}}
/* motive to ask the player (real reasons only): bond, a shared side, or the player is her rival (never asks her rival) */
function nrAsk(v){try{if(isSrv()||S.out)return false;const N=v.nr;if(N.c==="me")return false;
 if(aff(v,S)>=nrB().askRel)return true;const f=facOf(v);if(f&&f===facOf(S))return true;
 const a=typeof rgSideOf==="function"?rgSideOf(v):null;return !!(a&&a===rgSideOf(S))}catch(e){return false}}
/* the help kind of a chapter from its main cast key (w) */
const NRHK={emp:"emp",th:"th",hh:"hh",dad:"thu",bro:"thu",off:"thu",man:"thu",envoy:"thu",mom:"thu",v:"do",foe:"do",foed:"do",v2:"do",eun:"do",gd:"do",doc:"y",maid:"che",mis:"che",kid:"che",mama:"che"};
function nrKind(A){const w=A&&A.w;let k=NRHK[w]||"bac";try{const B=A.B||{};const ws=Object.keys(B).map(b=>B[b].w).filter(Boolean);if(!NRHK[w]&&ws.length)k=NRHK[pick(ws)]||k}catch(e){}return k}
function nrOffer(v){const N=v.nr,A=nrCh(N.r,N.n);if(!A||typeof q72!=="function"||!T72I["nr_"+nrKind(A)])return false;const q=q72();if(!q)return false;
 const hk=nrKind(A);if(q.ch.some(c=>c.ri===v.id&&/^nr_/.test(c.tid))||q.a.some(x=>x.ri===v.id&&/^nr_/.test(x.tid)))return false;
 if(typeof rgL==="function"){try{const L=rgL();if(v.queen&&L.hh&&!L.hh.done&&L.hh.st>0)return false}catch(e){}}
 const riv=nrRival(v);const bk=riv&&riv!==S?(riv.queen?"hh":"rv"):null;
 q.ch.push({tid:"nr_"+hk,at:wk(),rk:v.queen?"hh":"rv",ri:v.id,bk,bi:bk?riv.id:null,p:{nr:N.r,nn:N.n}});N.hk=hk;N.hs=1;N.t=Math.max(N.t,S.turn+Math.ceil((nrB().dl+2)/3));return true}
/* result of the help hồi → her chapter (called by the j72 outcome fn) */
function nrHelped(X,how){try{const v=X.A&&X.A.o;if(!v||!v.nr)return"";const N=v.nr,B=nrB();N.hs=2;
 if(how>0){N.hb=B.help;return ` ${v.name} ghi nhớ ơn này; chương «${nrChT(v)}» của nàng thêm phần chắc.`}
 if(how<0){N.hb=-B.help;return ` ${v.name} biết ngươi bán đứng nàng; chương «${nrChT(v)}» của nàng thêm khó.`}
 return""}catch(e){console.error(e);return""}}
function nrChT(v){const A=nrCh(v.nr.r,v.nr.n);return A?plain(A.t):""}
/* the month: every live NPC road whose chapter is due plays it (host only) */
function nrMonth(){if(!nrOn()||nrGuest())return"";const B=nrB();let news=0,ev="";
 for(const v of rivals.slice()){try{if(!v.alive||v.out){if(v.nr&&!v.nr.x)v.nr.x=1;continue}
  const N=v.nr||nrInit(v);if(!N||N.x||!N.n||S.turn<N.t)continue;
  if(N.h&&N.n===N.h&&!N.hs&&nrAsk(v)&&nrOffer(v))continue;
  const r=nrPlay(v);if(!r)continue;
  const line=`<span class="past">Tin trong cung · ${v.name} · «${nrTitle(N.r)}» chương ${r.n}: «${r.t}»${r.tag?` — ${r.tag}`:""}.${r.rc}${r.me}</span>`;
  if(r.riv===S||news<B.newsMo){log(line);news++}
  if(N.x)log(`<span class="past">${v.name} khép lại tuyến «${nrTitle(N.r)}»${N.e?`: ${N.e}`:""}.</span>`)}catch(e){console.error(e)}}
 try{news=nrMMonth(news)}catch(e){console.error(e)}
 try{if(typeof nrMenMonth==="function")nrMenMonth(news)}catch(e){console.error(e)}
 return ev}
(function(){if(typeof monthTick!=="function")return;const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments)||"";try{if(S&&!S.dead)ev+=nrMonth()}catch(e){console.error(e)}return ev}})();
/* a maid raised to consort keeps who she was: a raised maid's road is a cn road (Cung nữ được sủng hạnh) */
window.nrRoads=nrRoads;window.nrCh=nrCh;window.nrInit=nrInit;window.nrMonth=nrMonth;window.nrPlay=nrPlay;

/* ---------- the help hồi templates (j72 follow-ups, fu:1: never dealt at random; one task = one hồi, OD:L1243) ----------
   Every option has a cost AND a loss; the bạc road and the Sức road weigh the same (OD:L582: bạc priced by her rank, BAL.nroad.bac). */
(function(){if(typeof T7!=="function")return;const C=q72C,O=q72O,B=()=>BAL.nroad;
 const bac=()=>{const R0=B().bacRk;let i=0;for(const r of R0)if(S.rank>=r)i++;return -B().bac[Math.min(i,B().bac.length-1)]};
 const nr=X=>{const v=X.A&&X.A.o;return v&&v.nr?v.nr:null};
 const head=X=>{const N=nr(X);const n=X.p&&X.p.nn||N&&N.n;const A=N&&nrCh(N.r,n);return N?`${X.A.n}: «${nrTitle(N.r)}» · Chương ${n} «${A?plain(A.t):""}»`:X.A.n};
 head.toString=()=>"Tuyến truyện riêng của một người trong cung";/* j72 logs plain(T.t) when the asker is gone */
 /* who speaks (VANPHONG §2): a consort says ta and calls the player tỷ tỷ / muội muội; a maid (sv/rsv/maid) says nô tỳ and calls her
    tiểu chủ / nương nương by rank (tsGoi); a man (U3) says thần / nô tài by his kind (nrVoice) */
 const mv=X=>typeof nrVoice==="function"?nrVoice(X):null;
 const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
 const call=X=>{const m=mv(X);if(m)return cap(m.call);const v=X.A&&X.A.o;return v&&v.rank>S.rank?"Muội muội":"Tỷ tỷ"};
 const me=X=>{const m=mv(X);return m?m.me:"ta"};
 const ok={r:0,d:1,fn:X=>nrHelped(X,1)},bad={fn:X=>nrHelped(X,-1)};
 const def=(k,h,steps)=>T7("nr_"+k,"social",{fu:1,r:"rv",t:head,h,dl:B().dl,s:[steps],ok:Object.assign({},ok,{r:B().rel}),no:{r:-4},bad:Object.assign({},bad,{r:B().relBad,rb:B().relB})});
 const betray=O("Đem chuyện mách cho {B}",{t:X=>!!X.B,tw:"không có ai để mách",c:{duc:-3},k:1,to:"bad",rb:0});
 def("emp",X=>`“Việc của ${me(X)} đến tai Hoàng thượng rồi. ${call(X)} được gần thánh giá, xin nói giúp ${me(X)} một lời.”`,C("Nói giúp trước mặt Hoàng thượng",
  O("Nhân lúc hầu Hoàng thượng, khéo nhắc đến nàng",{c:{suc:-B().suc},p:55,sk:"sung",l:{sung:-3},lx:"Hoàng thượng phật ý vì ngươi xen vào",to:"ok"}),
  O("Dâng lễ nhờ người thân cận đỡ lời",{c:{get bac(){return bac()}},p:75,sk:"tamco",l:{danh:-2},lx:"lễ bị trả về, người ta bàn tán",to:"ok"}),betray));
 def("th",X=>`“Thái hậu đang nghe lời gièm về ${me(X)}. ${call(X)} thường đến Đức Thọ cung, xin đỡ cho ${me(X)}.”`,C("Đỡ lời trước Thái hậu",
  O("Hầu Thái hậu một buổi, nói đỡ cho nàng",{c:{suc:-B().suc},p:55,sk:"duc",l:{duc:-2},lx:"Thái hậu chê ngươi lắm lời",to:"ok"}),
  O("Dâng Thái hậu một lễ thay lời",{c:{get bac(){return bac()}},p:75,sk:"duc",l:{danh:-2},lx:"Thái hậu cho là ngươi mua lòng",to:"ok"}),betray));
 def("hh",X=>`“Trung cung đang để mắt đến ${me(X)}. ${call(X)} nói được với Hoàng hậu, xin nói giúp một câu.”`,C("Đỡ lời trước Hoàng hậu",
  O("Thỉnh an Hoàng hậu, khéo nhắc đến nàng",{c:{suc:-B().suc},p:55,sk:"duc",l:{duc:-2},lx:"Hoàng hậu nghi ngươi kết bè",to:"ok"}),
  O("Dâng lễ Khôn Ninh cung",{c:{get bac(){return bac()}},p:75,sk:"tamco",l:{danh:-2},lx:"lễ bị trả về",to:"ok"}),betray));
 def("thu",X=>`“${cap(me(X))} có một lá thư phải đến tay người nhà, không được qua tay Kính sự phòng. ${call(X)} giúp ${me(X)}.”`,C("Đưa thư ra ngoài cung",
  O("Nhờ thái giám của mình mang ra",{c:{get bac(){return bac()}},p:75,sk:"mat",l:{danh:-3},lx:"thư bị chặn, tên ngươi dính vào",to:"ok"}),
  O("Gửi theo người nhà mình vào thăm",{c:{suc:-B().suc},p:55,sk:"tamco",l:{danh:-3},lx:"người nhà bị khám, thư bị lộ",to:"ok"}),betray));
 def("do",X=>`“${cap(me(X))} cần biết ${X.B?X.B.n:"kẻ kia"} đang tính gì. ${call(X)} có tai mắt, giúp ${me(X)} dò một chuyện.”`,C("Dò la giúp nàng",
  O("Sai người dò la",{c:{get bac(){return bac()}},p:70,sk:"mat",l:{danh:-2},lx:"người của ngươi bị bắt gặp",to:"ok",rb:-4}),
  O("Tự đi hỏi chuyện",{c:{suc:-B().suc},p:55,sk:"tamco",l:{danh:-2},lx:"ngươi bị nghi là tai mắt",to:"ok",rb:-4}),betray));
 def("y",X=>`“Bệnh này không thể để Thái y viện ghi sổ. ${call(X)} quen thái y, xin mời người đến xem kín cho ${me(X)}.”`,C("Mời thái y xem kín",
  O("Mời thái y quen, trả công hậu",{c:{get bac(){return bac()}},p:75,sk:"y",l:{danh:-2},lx:"Thái y viện ghi tên ngươi",to:"ok"}),
  O("Tự sắc thuốc mang sang",{c:{suc:-B().suc},p:50,sk:"y",l:{duc:-2},lx:"thuốc không hợp, nàng trách ngươi",to:"ok"}),betray));
 def("che",X=>mv(X)&&mv(X).sv?`“${cap(me(X))} đang gặp nạn, không còn chỗ nương. ${call(X)} che chở cho ${me(X)} ít hôm.”`:`“Người của ${me(X)} đang gặp nạn, không còn chỗ nương. ${call(X)} che chở cho nàng ấy ít hôm.”`,C("Che chở người của nàng",
  O("Cho ở nhờ cung mình",{c:{suc:-B().suc},p:60,sk:"tamco",l:{danh:-3},lx:"người ta bàn ngươi chứa kẻ có tội",to:"ok"}),
  O("Bỏ bạc lo chỗ khác",{c:{get bac(){return bac()}},p:75,sk:"mat",l:{danh:-2},lx:"chỗ ấy không kín",to:"ok"}),betray));
 def("bac",X=>`“${cap(me(X))} đang cần bạc gấp, việc nhà không thể nói ra. ${call(X)} giúp ${me(X)} lần này, ${me(X)} không quên.”`,C("Giúp nàng việc bạc",
  O("Cho mượn bạc",{c:{get bac(){return bac()}},k:1,to:"ok",l:{},lx:"bạc ra khỏi tay ngươi"}),
  O("Góp công thay bạc: đi lo liệu giúp",{c:{suc:-B().suc},p:55,sk:"tamco",l:{danh:-2},lx:"việc không xong, nàng mất lòng tin",to:"ok"}),betray));
})();

/* ---------- her road on her person card (Hậu cung): one more row of the kit person card (.pcinfo span, the j85/j24 pattern) ---------- */
function nrLine(v){const N=v&&v.nr;if(!N||!N.r||!(ARC67[N.r]||NRM[N.r]))return"";const T=nrTitle(N.r);
 if(N.x)return `Tuyến truyện: «${T}» <span class="past">· đã khép${N.e?`: ${N.e}`:""}</span>`;
 const n=N.l.length?N.l[N.l.length-1][0]:0;return n?`Tuyến truyện: «${T}» <span class="past">· qua chương ${n}${N.e?`: ${N.e}`:""}</span>`:`Tuyến truyện: «${T}» <span class="past">· chưa mở</span>`}
(function(){if(typeof rvCard!=="function")return;const c0=rvCard;/* same row pattern as j85 ducLine / j24 danger line: one <span> in the card's .pcinfo */
 rvCard=function(v){let h=c0.apply(this,arguments);try{if(v&&!window.__nroff){const l=nrLine(v);if(l)h=h.replace('<div class="pcinfo">',`<div class="pcinfo"><span>${l}</span>`)}}catch(e){console.error(e)}return h}})();
window.nrLine=nrLine;

/* ================= U2 MAIDS: cnv roads (Cung nữ tuyển vào cung) for every maid of the palace =================
   Who: every staff maid of every consort (allServ role maid, the player's own household included) + the player's trusted maid S.maid.
   Road: one of the 4 cnv premises (cnv_chu/ban/mat/ma, j67) + its .5–.11 chapters (jrd_cnv when built); her {mis} is her REAL mistress
   (ownerOf; S for her own maids). Same engine as the consorts: due chapter → her own odds (BAL.nroad.m: her trait and servant rank),
   gain AND loss on her real fields (mp merit → servant rank, j14 servRanks; loyal to her mistress) + a small share for her mistress,
   real rival = the maid of another house she is coldest with (af both ways). A maid raised to consort (j8 sendMaid, j14/jmline eye; both
   go through j88 f88Carry) keeps her road state and goes on as origin cn (Cung nữ được sủng hạnh) from her next chapter. */
function nrMaidL(){return nrServL("maid")}
/* staff servants of one role (maid: + the trusted maid S.maid; eunuch: staff eunuchs, U3 «Từ tiểu thái giám đi lên») */
function nrServL(role){const L=[];try{for(const s of allServ())if(s&&s.role===role)L.push(s)}catch(e){}if(role==="maid"&&S.maid&&S.maid.name&&!L.includes(S.maid))L.push(S.maid);return L}
const nrRole=s=>s===S.maid?"maid":s.role||"maid";
function nrMis(s){if(s===S.maid)return S;try{return ownerOf(s)}catch(e){return null}}
const nrMid=s=>s===S.maid?"pm":s.sid;
/* her j72 asker kind: own staff sv, another house's staff rsv, the trusted maid maid (q72A) */
function nrMK(s){return s===S.maid?["maid",null]:nrMis(s)===S?["sv",s.sid]:["rsv",s.sid]}
function nrMInit(s){if(s.nr)return s.nr;const role=nrRole(s),o=role==="maid"?"cnv":"eun";const held=nrServL(role).filter(x=>x!==s&&x.nr&&!x.nr.x).map(x=>x.nr.r);const r=nrPickRoad(o,held);if(!r)return null;s.nr=nrNew(o,r);return s.nr}
function nrMStat(s){const M=nrB().m;let rk=0;try{if(s.sid!=null&&typeof srk==="function")rk=srk(s)}catch(e){}return M.st+(M.tr[s.tr]||0)+rk*M.rk}
function nrAf(x,y,n){if(!x||!y||y.sid==null||!n)return;x.af=x.af||{};x.af[y.sid]=cl(Math.round((x.af[y.sid]||0)+n),-100,100)}
function nrMRival(s){const N=s.nr;const ms=nrMis(s);const L=nrServL(nrRole(s)).filter(x=>x!==s&&nrMis(x)!==ms);
 if(N.c!=null){const p=L.find(x=>nrMid(x)===N.c);if(p)return p;N.rc=N.cn||"";N.c=null}
 if(!L.length)return null;const af=x=>(s.af&&x.sid!=null&&s.af[x.sid])||0;L.sort((a,b)=>af(a)-af(b));
 const p=L[Math.min(L.length-1,R(Math.min(3,L.length)))];N.c=nrMid(p);N.cn=p.name;return p}
function nrMPlay(s){const N=s.nr,A=nrCh(N.r,N.n);if(!A){N.n=nrNext(N.r,N.n+1);if(!N.n)N.x=1;return null}const B=nrB(),M=B.m;
 const p=cl(Math.round(B.base+nrMStat(s)/B.div+(N.k>0?B.sc:0)+(N.hb||0)),5,95);
 const k=roll(p)?1:roll(p/2)?0:-1;const riv=nrMRival(s);const fx=k>0?M.fx.win:k<0?M.fx.lose:M.fx.mid;
 for(const z in fx){if(z==="mp"&&s.sid==null)continue;s[z]=cl((s[z]||0)+fx[z],0,100)}
 const ms=nrMis(s);const mf=k>0?M.mis.win:k<0?M.mis.lose:null;if(ms&&mf)ap(ms,mf);
 if(riv){if(k>0)nrAf(riv,s,-M.af);else if(k<0)nrAf(s,riv,-M.af)}
 const tag=nrEnd(A,k);N.e=tag;N.k=k;N.l.push([N.n,k]);N.hb=0;const n0=N.n;N.n=nrNext(N.r,N.n+1);if(!N.n)N.x=1;
 N.t=S.turn+nrR(B.gap);if(N.h&&N.h<=n0)N.hs=N.hs||-1;
 const rc=N.rc?` ${N.rc} nay không còn ở đây, kẻ đứng đối mặt nàng là ${riv?riv.name:"người khác"}.`:"";N.rc="";
 return {n:n0,t:plain(A.t),tag,k,rc,riv,ms}}
/* motive to ask the player: her own maid asks when her loyalty is high; another house's maid only when the player is close to her
   mistress (bond or a shared side) — never for a maid whose mistress is cold to the player */
function nrMAsk(s){try{if(isSrv()||S.out)return false;const ms=nrMis(s);if(!ms)return false;if(ms===S)return (s.loyal||0)>=nrB().m.askLoy;
 if(aff(ms,S)>=nrB().askRel)return true;const f=facOf(ms);return !!(f&&f===facOf(S))}catch(e){return false}}
function nrMOffer(s){const N=s.nr,A=nrCh(N.r,N.n);if(!A||typeof q72!=="function")return false;const hk=nrKind(A);if(!T72I["nr_"+hk])return false;const q=q72();if(!q)return false;
 const [rk,ri]=nrMK(s);if(q.ch.concat(q.a).some(c=>c.rk===rk&&c.ri===ri&&/^nr_/.test(c.tid)))return false;
 const riv=nrMRival(s);const bb=riv?nrMK(riv):[null,null];
 q.ch.push({tid:"nr_"+hk,at:wk(),rk,ri,bk:bb[0],bi:bb[1],p:{nr:N.r,nn:N.n}});N.hk=hk;N.hs=1;N.t=Math.max(N.t,S.turn+Math.ceil((nrB().dl+2)/3));return true}
function nrMMonth(news){const B=nrB();let n=news||0;
 for(const s of nrMaidL().concat(nrServL("eunuch"))){try{const N=s.nr||nrMInit(s);if(!N||N.x||!N.n||S.turn<N.t)continue;
  if(N.h&&N.n===N.h&&!N.hs&&nrMAsk(s)&&nrMOffer(s))continue;
  const r=nrMPlay(s);if(!r)continue;const mine=r.ms===S;
  const who=mine?`${s.name}, người hầu của ngươi`:r.ms?`${s.name}, người hầu của ${r.ms.name}`:s.name;
  const line=`<span class="past">Tin trong cung · ${who} · «${nrTitle(N.r)}» chương ${r.n}: «${r.t}»${r.tag?` — ${r.tag}`:""}.${r.rc}</span>`;
  if(mine||n<B.newsMo){log(line);n++}}catch(e){console.error(e)}}
 return n}
/* the voice of the asker in the help hồi (VANPHONG §2): maids nô tỳ + tiểu chủ/nương nương; men are added by U3 (nrVoiceM) */
function nrVoice(X){const k=X&&X.A&&X.A.k;const goi=()=>{try{return tsGoi(S)}catch(e){return S.rank>=3?"nương nương":"tiểu chủ"}};
 if(k==="sv"||k==="rsv"||k==="maid")return{me:X.A.o&&X.A.o.role==="eunuch"?"nô tài":"nô tỳ",call:goi(),sv:1};
 if(typeof nrVoiceM==="function")return nrVoiceM(X,goi);return null}
/* a maid raised to consort keeps who she was: her road state goes on as a cn road from her next chapter (same help chapter, same log) */
(function(){if(typeof f88Carry!=="function")return;const c0=f88Carry;
 f88Carry=function(n,m){const r=c0.apply(this,arguments);try{if(n&&m&&typeof m==="object"){n.wasMaid=1;const N=m.nr;
  if(N&&N.r&&!n.nr){const r2=nrPickRoad("cn");const nn=r2&&!N.x?nrNext(r2,Math.max(BAL.road.first-1,N.n||0)):0;
   n.nr={o:"cn",r:r2||N.r,n:nn,k:N.k,t:Math.max(N.t||0,S.turn+1),h:N.h,hs:N.hs,hb:N.hb,c:null,e:N.e,x:nn?0:1,l:N.l.slice(),pr:N.r}}}}catch(e){console.error(e)}return r}})();
window.nrMaidL=nrMaidL;window.nrMInit=nrMInit;window.nrMPlay=nrMPlay;
/* her road on her card (Kẻ hầu tab): one more line of the kit person card (pcard lines → .pcinfo spans; the j70 staff-tab pattern) */
(function(){if(typeof pcard!=="function")return;const p0=pcard;pcard=function(o){try{if(S&&!window.__nroff&&o&&o.name&&typeof tab!=="undefined"&&tab==="staff"){
  const s=nrMaidL().concat(nrServL("eunuch")).find(x=>x.nr&&(x.name===o.name||(typeof shortN==="function"&&shortN(x.name)===o.name)));
  if(s){const l=nrLine(s);if(l){o=Object.assign({},o);o.lines=(o.lines||[]).concat([l])}}}}catch(e){console.error(e)}return p0.call(this,o)}})();
