/* ================= jpma: PERSON MINIGAME ACTS — «Cùng chơi» + «Thách đấu» with any real person (owner OD 19/11 ~23:55Z, PARKING_LOT #8) =================
   Plan + expert pass: dev/handover/reports/person-minigame-acts.md (FOREMAN E #13 accepted d13fa7aa). Numbers: BAL.pm + BAL.mgTier.occ.pm (jbal2). ONE CORE:
     pmArts(a,t)      the pastimes on offer = the RECEIVER's own arts (level ≥ BAL.pm.minLv) + Đầu hồ (anyone)
     pmR(a,t)         the occasion rank = the HIGHER rank of the two (one board for both; law 5: harder and dearer as she climbs)
     pmStakes(a,t)    the three stakes of equal value V = BAL.pm.stake.bac[R] (law 2): Bạc V · a real item priced V·(1±band) each side · Danh V/val.danhBac
     pmOdds(a,t,kind) a's chance to win, shown ONLY as the ladder word (law 7)
     pmRun(a,t,x)     the act itself, after the receiver said yes: her side PLAYS the board (j82 playArt / startContest, occ pm); an NPC (or the co-op
                      friend) plays by her own hand (j82 kg82NpcRaw → jmgt mgNpcRaw, the owner-calibrated mg2 hand). Same formula for everyone.
   Receiver choice (law 1, jrcv): RCVK.pmPlay / RCVK.pmDuel — Nhận lời · Nhường (duel, when the asker outranks the receiver) · Từ chối; an NPC receiver
     picks by rcvPick; HER card comes through rcvCard (saved, PEND.rcvAsk).
   Where (go-in-person rule OD 18/11 ~19:55Z): the Dư đồ person popup (j2 talkOpts: consort, Hoàng hậu, the co-op friend) and the Hậu cung tab
     (j15 rvCard «Gặp mặt»: tapping walks her to the person first — goSee; the pick opens on arrival). An NPC's invitation to HER walks her to the NPC.
   NPCs (law 1 + 6b): agReg("consort","pm") — cx3:pmPlay (need ally) / cx3:pmDuel (need spite) toward her or another consort at a real place (agAt),
     at most one per BAL.pm.npc.gapW weeks; results land in memory (jmem pmplay / pmwin / pmyield) and in the log when she knows them.
   Co-op (OD:L397, foreman Q3: any role): the friend is a rival entry (coop:true): ACT.pmplay / ACT.pmduel go through the co-op ask card (jcoopworld ASK);
     both sides play by their own hand on that path (one result computed once, on the asker's side).
   Old saves: S.pmM (pair counts this month), S.pmGo (a walk-then-pick in progress), v.pmW — all optional.
   ===================================================================================================================== */
(function(){
const B=()=>BAL.pm;
const nm=p=>p===S?"ngươi":p&&p.name||"";
const Nm=p=>p===S?"Ngươi":p&&p.name||"";
const rk=p=>{try{return p===S?S.rank:(p.queen?7:(p.rank||0))}catch(e){return 0}};
const apx=(p,fx)=>{if(!fx||!Object.keys(fx).length)return;if(p===S)apply(fx);else ap(p,fx)};
const live=p=>!!p&&(p===S?!S.dead&&!S.out:p.alive!==false&&!p.out);
/* ---------- pastimes ---------- */
const ARTKIND=Object.assign({theu:"theu"},typeof KG82_PLAIN==="object"?KG82_PLAIN:{});
function pmKindN(kind){const K=KG82_KIND[kind]||{};return K.n||kind}
function pmArtLv(p,ak){try{return Math.round(kg82Lv(p,ak)||0)}catch(e){return 0}}
function pmArts(a,t){const L=[];const keys=(typeof ARTS!=="undefined"?ARTS.map(x=>x.k):Object.keys(ARTKIND));
 for(const ak of keys){const kind=ARTKIND[ak];if(!kind||!KG82_KIND[kind]||!KG82_KIND[kind].e)continue;if(pmArtLv(t,ak)<B().minLv)continue;L.push({ak,kind,n:typeof kg82Art==="function"?kg82Art(ak):pmKindN(kind)})}
 L.push({ak:null,kind:"dauho",n:pmKindN("dauho")});return L}
function pmLvTxt(p,kind){try{return kg82LvFor(p,kind)}catch(e){return 0}}
/* ---------- occasion, value, stakes ---------- */
function pmR(a,t){return Math.max(0,Math.min(7,Math.max(rk(a),rk(t))))}
function pmV(a,t){const L=B().stake.bac;return L[Math.min(L.length-1,pmR(a,t))]}
function pmDanhOf(V){return Math.max(1,Math.round(V/B().val.danhBac))}
function pmItemOk(p,e){try{if(!e||!e.k||e.h||e.t||e.wk)return false;const it=IT[e.k];if(!it||it.evi||it.keep||it.il)return false;if(p.wear&&Object.values(p.wear).includes(e))return false;return true}catch(x){return false}}
/* the item a side puts up: the one priced nearest V inside V·(1 ± band) (never worn, tainted, evidence, a handmade work) */
function pmItem(p,V){const b=B().stake.band;let best=null,bd=1e9;for(const e of (p.inv||[])){if(!pmItemOk(p,e))continue;const v=ilVal(e);if(v<V*(1-b)||v>V*(1+b))continue;const d=Math.abs(v-V);if(d<bd){bd=d;best=e}}return best}
function pmStakes(a,t){const V=pmV(a,t),d=pmDanhOf(V);const bac=p=>p===S?S.bac:(p.bac||0),danh=p=>p===S?S.danh:(p.danh||0);
 const ia=pmItem(a,V),it=pmItem(t,V);
 return[
  {s:"bac",n:"Cược bạc",V,what:`${V} lượng bạc`,ok:bac(a)>=V&&bac(t)>=V,why:bac(a)<V?`${a===S?"ngươi":a.name} không đủ ${V} lượng`:bac(t)<V?`${t===S?"ngươi":t.name} không đủ ${V} lượng`:""},
  {s:"item",n:"Cược món đồ",V,what:"một món đồ ngang giá",wa:ia?ilNm(ia):"",wt:it?ilNm(it):"",ok:!!(ia&&it),why:!ia?`${a===S?"ngươi":a.name} không có món nào ngang giá`:!it?`${t===S?"ngươi":t.name} không có món nào ngang giá`:"",ia,it},
  {s:"danh",n:"Cược thể diện",V,d,what:`Danh ${d}`,ok:danh(a)>=d&&danh(t)>=d,why:danh(a)<d||danh(t)<d?`cần Danh ${d} mỗi bên`:""}]}
/* what side p puts up (a = the asker of this pair) */
function pmPut(st,p,a){if(!st)return"";if(st.s==="item")return (p===a?st.wa:st.wt)||st.what;return st.what}
function pmStakeOf(a,t,s){return pmStakes(a,t).find(x=>x.s===s)||null}
/* ---------- scores, odds ---------- */
function pmRaw(p,kind,R){try{return kg82NpcRaw(p,kind,{occ:"pm",rank:R})}catch(e){return 5}}
function pmTal(p,kind){try{return kg82Parts(p,kind).total}catch(e){return 0}}
function pmScore(p,kind,R,raw){return pmTal(p,kind)+Math.round((raw==null?pmRaw(p,kind,R):raw)/10*B().luck)}
function pmOdds(a,t,kind){const R=pmR(a,t),N=B().oddsN,ta=pmTal(a,kind),tt=pmTal(t,kind),L=B().luck;let w=0;
 for(let i=0;i<N;i++){const sa=ta+Math.round(pmRaw(a,kind,R)/10*L),st=tt+Math.round(pmRaw(t,kind,R)/10*L);if(sa>st)w++}
 return Math.round(w/N*100)}
function pmWord(o){try{return word(oddsCl(o))}catch(e){return ""}}
/* ---------- the stake moves (law 6c: the item changes hands with the ledger) ---------- */
function pmPay(win,lose,st){if(!st)return"";
 if(st.s==="bac"){const n=Math.min(st.V,lose===S?S.bac:(lose.bac||0));apx(lose,{bac:-n});apx(win,{bac:n});return `${n} lượng bạc`}
 if(st.s==="danh"){apx(lose,{danh:-st.d});apx(win,{danh:st.d});return `Danh ${st.d}`}
 if(st.s==="item"){const e=lose===st.a0?st.ia:st.it;const i=(lose.inv||[]).indexOf(e);if(i<0)return"";lose.inv.splice(i,1);e.from=key(lose);(win.inv=win.inv||[]).push(e);
  try{if(typeof ilLog==="function")ilLog(e,ilKey(lose),ilKey(win),"pm")}catch(x){}return ilNm(e)}
 return""}
/* ---------- results ---------- */
function pmPair(a,t){const k=[key(a),key(t)].sort().join("|");S.pmM=S.pmM&&S.pmM.m===S.turn?S.pmM:{m:S.turn,c:{}};return k}
function pmFade(a,t){const k=pmPair(a,t);return 1/(1+B().play.fade*(S.pmM.c[k]||0))}
function pmMark(a,t){const k=pmPair(a,t);S.pmM.c[k]=(S.pmM.c[k]||0)+1}
function pmXp(p,ak){if(!ak)return;try{if(p===S){addArt(ak,B().play.xp);return}if(!p.arts||p.arts[ak]==null)return;p.artp=p.artp||{};p.artp[ak]=(p.artp[ak]||0)+B().play.xp;
  /* the j2 addArt rule (next level at level + 2 points) */while(p.arts[ak]<5&&p.artp[ak]>=p.arts[ak]+2){p.artp[ak]-=p.arts[ak]+2;p.arts[ak]++}}catch(e){}}
function pmMem(h,a,d,x){try{if(typeof memAdd==="function")memAdd(h,a,d,{x})}catch(e){}}
function pmSee(a,t){try{return a===S||t===S||knows(a)||knows(t)}catch(e){return false}}
/* «Cùng chơi»: gain-only (law 3), by the mean of the two plays */
function pmPlayEnd(a,t,x,ra,rt){const P=B().play,m=(ra+rt)/2,tier=m>=P.cut[1]?2:m>=P.cut[0]?1:0,f=pmFade(a,t),n=Math.max(1,Math.round(P.aff[tier]*f));
 affAdd(a,t,n);affAdd(t,a,n);pmMark(a,t);const ak=x.ak||null;pmXp(a,ak);pmXp(t,ak);pmMem(t,a,"pmplay",x.n);pmMem(a,t,"pmplay",x.n);
 const r=`${Nm(a)} cùng ${nm(t)} chơi ${x.n}: hai bên quý nhau +${n}`;return{n,r}}
/* «Thách đấu»: the winner takes the stake; public place → Danh; a higher-rank loser loses face and resents the winner */
function pmDuelEnd(a,t,x,aWins,place){const D=B().duel,st=Object.assign({},pmStakeOf(a,t,x.s)||{s:"bac",V:pmV(a,t)},{a0:a});
 if(st.s==="item"&&(!st.ia||!st.it)){st.s="bac"}
 const win=aWins?a:t,lose=aWins?t:a;const got=pmPay(win,lose,st);const L=[`${Nm(win)} thắng ${nm(lose)} một ván ${x.n}${got?`, lấy ${got}`:""}`];
 /* ROUND C: the Danh of a public duel comes from the REAL watchers (pmEyeFx, law 6b), no longer from a place list (BAL.pm.pub / duel.pubDanh retired) */
 const gap=rk(lose)-rk(win);if(gap>0){const s=Math.min(D.shameMax,D.shame*gap);apx(lose,{danh:-s});oanAdd(lose,win,D.oan);L.push(`người trên thua kẻ dưới: ${nm(lose)} mất mặt (Danh −${s}), oán ${nm(win)} +${D.oan}`)}
 pmMem(lose,win,"pmwin",x.n);const e=pmEyeFx(win,lose,x,place);if(e)L.push(e);const l=pmLadWin(win,lose,x.kind);if(l)L.push(l);return{win,lose,r:L.join("; ")}}
/* «Nhường»: the challenged side (outranked) gives the game away: pays the stake, wins the superior's favour */
function pmYield(a,t,x){const D=B().duel,st=Object.assign({},pmStakeOf(a,t,x.s)||{s:"bac",V:pmV(a,t)},{a0:a});if(st.s==="item"&&(!st.ia||!st.it))st.s="bac";
 const n=pmYieldAff(a,t,x);const got=pmPay(a,t,st);affAdd(a,t,n);oanAdd(a,t,-D.yieldOan);pmMem(a,t,"pmyield",x.n);const l=pmLadWin(a,t,x.kind);
 return `${Nm(t)} nhường ${nm(a)} ván ${x.n}${got?` (mất ${got})`:""}; ${nm(a)} quý ${nm(t)} +${n}${l?`; ${l}`:""}`}
function pmYieldAff(a,t,x){return Math.max(1,Math.round(pmV(a,t)*B().duel.yieldK/B().val.affBac))+(x&&pmLadFor(a,t,x)?Math.round(pmPlaceBac()/B().val.affBac):0)}/* a yielded LADDER place: the superior's extra favour = one place (law 2) */
function pmPlaceBac(){const T=B().lad.top;return T.reduce((s,v)=>s+v,0)/T.length*B().val.danhBac}
/* ---------- the act (after «Nhận lời») ---------- */
function pmX(a,t,act,o){o=o||{};const A=pmArts(a,t);const ar=A.find(z=>z.kind===o.kind)||A[0];const x={a:act,kind:ar.kind,ak:ar.ak,n:ar.n};
 if(act==="duel"){const L=pmStakes(a,t).filter(z=>z.ok);const s=o.s&&L.some(z=>z.s===o.s)?o.s:(L[0]&&L[0].s);if(!s)return null;x.s=s}return x}
function pmAuto(a,t,x){const R=pmR(a,t),place=whereOf(a);
 if(x.a==="play"){const r=pmPlayEnd(a,t,x,pmRaw(a,x.kind,R),pmRaw(t,x.kind,R));return r.r}
 const sa=pmScore(a,x.kind,R),st=pmScore(t,x.kind,R);return pmDuelEnd(a,t,x,sa>st,place).r}
function pmRun(a,t,x){if(!x||!live(a)||!live(t))return"";
 const me=a===S?a:t===S?t:null;if(!me||a.coop||t.coop)return pmAuto(a,t,x);
 const o=me===a?t:a,R=pmR(a,t);
 /* she goes to the person (an NPC's invitation: she walks to where the asker stands; place-bound, never remote) */
 if(!together(a,t)){const k=whereOf(o);if(!(typeof actMove==="function"&&actMove(k))||!together(a,t)){log(`Ngươi không sang được chỗ ${o.name}.`);return""}}
 const place=whereOf(a);
 const title=`${x.a==="play"?"Cùng chơi":"Thách đấu"} với ${o.name}`;
 if(x.kind==="co"&&typeof KG82_ENG==="object"&&KG82_ENG.gomoku)return pmKyRun(a,t,x,me,o,R,place,title);
 if(x.a==="play"){playArt({art:x.kind,title,occ:"pm",rank:R,quick:{n:"Để tài nghệ quyết định",sub:"tính 5/10"},onDone:raw=>{const ro=pmRaw(o,x.kind,R);const r=me===a?pmPlayEnd(a,t,x,raw,ro):pmPlayEnd(a,t,x,ro,raw);
   log(r.r+".");pushModal({t:title,who:pv(o),h:`<p>${r.r}.</p>`});try{showModal();render()}catch(e){}}});return""}
 const st=pmStakeOf(a,t,x.s);const note=st?`Cược: ${st.s==="item"?`${nm(a)} đặt ${st.wa}, ${nm(t)} đặt ${st.wt}`:st.what+" mỗi bên"} · thắng lấy cược của đối thủ, thua mất cược của mình`:"";
 startContest({art:x.kind,title,rivals:[o],occ:"pm",rank:R,noCup:1,luck:B().luck,stakes:{note},onGo:rows=>pmVsGo(rows,o,x.kind),onDone:out=>{const iWin=!!out&&out.place===1;const aWins=me===a?iWin:!iWin;
   const r=pmDuelEnd(a,t,x,aWins,place);log(r.r+".");pushModal({t:title,who:pv(o),h:`<p>${r.r}.</p>`});try{showModal();render()}catch(e){}}});return""}
/* ---------- the receiver's answers (jrcv shape: i = the L1876 weight slot) ---------- */
function pmNoO(p,t,x){const F=BAL.ag.cx2.help.fail,me=t===S,up=rk(p)>rk(t)?B().refuse.up:0;
 return{i:2,id:"no",n:rcvKw(2),fx:{},x:`được: giữ thì giờ${x.a==="duel"?", giữ món cược":""} · mất: hai bên quý nhau ${balSg(-F)}${up?`, ${nm(p)} là bề trên, quý ${me?"ngươi":t.name} thêm ${balSg(-up)}`:""}${pmLadFor(p,t,x)&&B().lad.refuseDrop?`, tụt ${B().lad.refuseDrop} bậc trên bảng ${x.n}`:""}`,
  go:()=>{const lf=pmLadFor(p,t,x);affAdd(t,p,-F);affAdd(p,t,-F-up);const l=lf&&B().lad.refuseDrop?pmLadDrop(t,x.kind,B().lad.refuseDrop):"";return{ok:0,r:`${Nm(t)} khéo từ chối lời ${x.a==="play"?"mời":"thách"} của ${nm(p)}${l?`; ${l}`:""}`}}}}
function pmPlayOpts(p,t,x){const P=B().play,me=t===S;
 return[{i:0,id:"full",n:"Nhận lời",fx:me?{suc:-P.suc}:{},x:`được: hai bên quý nhau +${P.aff[0]}..+${P.aff[2]} (chơi càng hay càng thân) · mất: Sức ${balSg(-P.suc)}`,lk:()=>!me&&(t.suc||0)<P.suc,
  go:()=>{if(!me)ap(t,{suc:-P.suc});const r=pmRun(p,t,x);return{ok:1,r}}},pmNoO(p,t,x)]}
function pmDuelOpts(p,t,x){const st=pmStakeOf(p,t,x.s),o=pmOdds(t,p,x.kind),me=t===S,what=st?pmPut(st,t,p):"";
 const O=[{i:0,id:"full",n:"Nhận lời thách đấu",fx:{},x:`${pmWord(o)} · thành: lấy ${pmPut(st,p,p)} của ${nm(p)} · hỏng: mất ${pmPut(st,t,p)} của ${me?"ngươi":"mình"}`,lk:()=>!st||!st.ok,
  go:()=>({ok:1,r:pmRun(p,t,x)})}];
 if(rk(p)>rk(t))O.push({i:1,id:"half",n:"Nhường bề trên",fx:{},x:`được: ${nm(p)} quý ${me?"ngươi":t.name} +${pmYieldAff(p,t,x)}, bớt oán ${B().duel.yieldOan} · mất: ${what}`,lk:()=>!st||!st.ok,go:()=>({ok:1,r:pmYield(p,t,x)})});
 O.push(pmNoO(p,t,x));return O}
/* co-op (foreman E #14 ruling (3)): the friend's ask card offers «Nhường bề trên» when the asker outranks the reader — the same answer and preview as pmDuelOpts */
function pmCoopYield(p,t){if(!p||!t||rk(p)<=rk(t))return null;return{n:"Nhường bề trên",x:`được: ${nm(p)} quý ngươi +${pmYieldAff(p,t)}, bớt oán ${B().duel.yieldOan} · mất: món cược của ngươi`}}
const okPair=(p,t)=>live(p)&&live(t)&&p!==t&&!(t===S&&(S.confined||isSrvSafe()))&&!(p===S&&(S.confined||isSrvSafe()));
function isSrvSafe(){try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}}
RCVK.pmPlay={t:"Lời mời cùng chơi",act:"mời cùng chơi với",kind:"pm",ok:(p,t,x)=>okPair(p,t)&&!!x,
 line:(p,x)=>`<p>${p.name} sai người sang: “Nương nương nhà ta rảnh rang, muốn mời người sang ${placeName(whereOf(p))} cùng chơi ${x&&x.n||""} cho vui.”</p><p class="past">Nhận lời thì ngươi đi sang chỗ nàng rồi chơi ngay.</p>`,
 opts:(p,t,x)=>pmPlayOpts(p,t,x)};
RCVK.pmDuel={t:"Lời thách đấu",act:"thách đấu",kind:"pm",ok:(p,t,x)=>okPair(p,t)&&!!x&&!!pmStakeOf(p,t,x.s),
 line:(p,x)=>{const st=x&&pmStakeOf(p,S,x.s);return `<p>${p.name} sai người sang: “Nghe danh tài ${x&&x.n||""} của người, nương nương nhà ta xin so tài một ván ở ${placeName(whereOf(p))}.”</p><p class="past">Cược: ${st?(st.s==="item"?`nàng đặt ${st.wa}, ngươi đặt ${st.wt}`:st.what+" mỗi bên"):""}. Nhận lời thì ngươi đi sang chỗ nàng rồi thi ngay.</p>`},
 opts:(p,t,x)=>pmDuelOpts(p,t,x)};
/* ---------- her side: ask (popup / Hậu cung) ---------- */
function pmAsk(t,x){if(!x)return"";const kc=B().kc;if(!can(kc))return"";spend(kc);
 if(t.coop&&typeof runAct==="function")return runAct(S,t,x.a==="play"?"pmplay":"pmduel",x)||"";
 return rcvAsk(x.a==="play"?"pmPlay":"pmDuel",S,t,x)||""}
function pmDone(r){try{if(popIdx!=null&&S.visit){S.visit.tk=S.visit.tk||{};S.visit.tk[popIdx]=1}}catch(e){}if(r){log(r);try{popMsg=r}catch(e){}}}
/* the khắc row (Cần) of every pick option: her time left this buổi (j15 whyTime, one rule) */
function pmNeedK(){const w=whyTime(B().kc);return w?[{t:w,ok:false}]:[]}
PEND.pmPick=pp=>{const t=RV(pp.v);if(!t||!live(t))return null;const play=pp.a==="play";
 return{who:pv(t),t:`<p>${play?`Mời ${t.name} cùng chơi môn gì?`:`Thách ${t.name} so tài môn gì?`}</p><p class="past">Môn của ${t.name} và Đầu hồ (ai cũng chơi được). Tốn ${B().kc} khắc.</p>`,
  o:pmArts(S,t).map(ar=>({n:ar.n,fx:{},x:(play?`tốn: ${B().kc} khắc · thành: hai bên quý nhau +${B().play.aff[0]}..+${B().play.aff[2]}`:`${pmWord(pmOdds(S,t,ar.kind))} · tốn: ${B().kc} khắc · thành: lấy cược của nàng${pmLadFor(S,t,{a:"duel",kind:ar.kind})?`, giành thứ ${pmLadPos(t,ar.kind)} trên bảng ${ar.n}`:""} · hỏng: mất cược ngang giá của ngươi`)+` · (nàng bậc ${pmLvTxt(t,ar.kind)}, ngươi bậc ${pmLvTxt(S,ar.kind)})`,
   need:pmNeedK(),tsDis:!!whyTime(B().kc),go:()=>{if(play)pmDone(pmAsk(t,{a:"play",kind:ar.kind,ak:ar.ak,n:ar.n}));else pushDil(mkP("pmStake",{v:t.id,kind:ar.kind}),"Thách đấu")}})).concat([{n:"Thôi",fx:{}}])}};
PEND.pmStake=pp=>{const t=RV(pp.v);if(!t||!live(t))return null;const ar=pmArts(S,t).find(z=>z.kind===pp.kind);if(!ar)return null;const o=pmOdds(S,t,ar.kind);
 return{who:pv(t),t:`<p>Thách ${t.name} một ván ${ar.n}. Hai bên đặt cược ngang giá; thắng lấy cược của đối thủ.</p>`,
  o:pmStakes(S,t).map(st=>({n:st.n,fx:{},x:`${pmWord(o)} · tốn: ${B().kc} khắc · thành: lấy ${pmPut(st,t,S)} của ${t.name} · hỏng: mất ${pmPut(st,S,S)} của ngươi`,need:st.ok?pmNeedK():[{t:st.why,ok:false}],tsDis:!st.ok||!!whyTime(B().kc),
   go:()=>{if(!st.ok)return;pmDone(pmAsk(t,{a:"duel",kind:ar.kind,ak:ar.ak,n:ar.n,s:st.s}))}})).concat([{n:"Thôi",fx:{}}])}};
/* the popup rows (j2 talkOpts: a consort, the Hoàng hậu, the co-op friend) — same palace allowed (foreman Q1); khắc = BAL.pm.kc, paid when sent */
function pmRows(v){if(!v||!live(v)||v===S||isSrvSafe())return[];const dis=S.confined?"đang cấm túc":"";
 return[{n:"Cùng chơi",o:100,pm:1,x:`môn của nàng · tốn: ${B().kc} khắc · thành: hai bên quý nhau thêm · nàng có thể nhận lời hoặc từ chối`,lock:!!dis,t:dis,open:()=>pushDil(mkP("pmPick",{v:v.id,a:"play"}),"Cùng chơi")},
  {n:"Thách đấu",o:100,pm:1,x:`hai bên đặt cược ngang giá · tốn: ${B().kc} khắc · thành: lấy cược của nàng · hỏng: mất cược của ngươi`,lock:!!dis,t:dis,open:()=>pushDil(mkP("pmPick",{v:v.id,a:"duel"}),"Thách đấu")}]}
if(typeof talkOpts==="function"){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&(p.kind==="rival"||p.kind==="hh")&&p.ref&&Array.isArray(A))A.push(...pmRows(p.ref))}catch(e){console.error(e)}return A};window.talkOpts=talkOpts}
if(typeof talkK==="function"){const k0=talkK;talkK=function(a){if(a&&a.pm)return 0;/* paid on sending (pmAsk) */return k0.apply(this,arguments)};window.talkK=talkK}
/* ---------- Hậu cung tab: the two buttons in «Gặp mặt»; not together → walk there first (goSee), the pick opens on arrival ---------- */
function pmBtns(v){if(!v||!live(v)||v===S||isSrvSafe())return[];const here=together(S,v),k=here?S.place:locKnown(v);const tc=k&&!here?travel(S.place,k):0;
 const why=S.confined?"đang cấm túc":S.out?"đang ở lãnh cung":!here&&!k?"chưa rõ nàng ở đâu":!here?walkBlock(k,tc):"";const kc=B().kc;
 const ton=`tốn: ${kc+tc} khắc${tc?` (đi đến chỗ nàng ${tc}, chơi ${kc})`:""}`;
 return [pbtn(`data-pmgo="${v.id}" data-pma="play"`,"Cùng chơi",`${ton} · thành: hai bên quý nhau thêm · nàng có thể từ chối`,why||whyTime(kc+tc)),
  pbtn(`data-pmgo="${v.id}" data-pma="duel"`,"Thách đấu",`${ton} · thành: lấy cược của nàng · hỏng: mất cược ngang giá của ngươi`,why||whyTime(kc+tc))]}
/* two more entries of the «Gặp mặt» group (each its own act card, counted by the group tab) */
let PMCUR=null;
if(typeof rvCard==="function"&&typeof pcard==="function"){const r0=rvCard;rvCard=function(v){PMCUR=v;try{return r0.apply(this,arguments)}finally{PMCUR=null}};window.rvCard=rvCard;
 const p0=pcard;pcard=function(o){try{const v=PMCUR;if(v&&o&&o.tabKey==="rival"&&Array.isArray(o.groups)){const g=o.groups.find(x=>x&&x[0]==="Gặp mặt");if(g&&Array.isArray(g[1]))g[1].push(...pmBtns(v),...pmLadBtn(v))}}catch(e){console.error(e)}return p0.apply(this,arguments)};window.pcard=pcard}
function pmOpen(v,a){pushDil(mkP("pmPick",{v:v.id,a}),a==="play"?"Cùng chơi":"Thách đấu");try{showModal()}catch(e){}}
function pmGoTap(id,a){const v=RV(id);if(!v||S.dead||Q.length)return;if(together(S,v)){pmOpen(v,a);render();return}
 S.pmGo={v:id,a,bk:bkey()};goSee(id);if(together(S,v)){S.pmGo=null;pmOpen(v,a)}render()}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-pmgo]");if(b&&!b.disabled){e.preventDefault();e.stopPropagation();pmGoTap(+b.dataset.pmgo,b.dataset.pma)}},true);
/* a walk that arrives next buổi (walkLate): the pick opens when she is with the person; dropped after that buổi */
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{const g=S&&S.pmGo;if(g&&!Q.length&&!S.dead){const v=RV(g.v);
  if(!v||!live(v)||(g.bk!==bkey()&&g.bk2&&g.bk2!==bkey()))S.pmGo=null;else if(together(S,v)){S.pmGo=null;pmOpen(v,g.a)}else if(g.bk!==bkey()&&!g.bk2)g.bk2=bkey()}}catch(e){}return r};window.render=render}
/* ---------- co-op: the friend gets the ask card (jcoopworld ASK); on «Nhận» both sides play by their own hand ---------- */
if(typeof ACT==="object"&&typeof ACT_NOSEND!=="undefined"){
 const mk=(k,n,act)=>{ACT[k]={k,n,c:{},ok:(a,t)=>okPair(a,t),x:act==="play"?"hai bên quý nhau thêm":"hai bên đặt cược ngang giá",
  f:(a,t,x)=>{x=x&&typeof x==="object"?x:pmX(a,t,act);if(!x)return"";if(t.coop&&window.COOPW&&COOPW.inv)return COOPW.yd&&act==="duel"&&rk(a)>rk(t)?pmYield(a,t,x):pmAuto(a,t,x);return rcvAsk(act==="play"?"pmPlay":"pmDuel",a,t,x)}};if(!ACT_NOSEND.includes(k))ACT_NOSEND.push(k)};
 mk("pmplay","Cùng chơi","play");mk("pmduel","Thách đấu","duel")}
/* ---------- NPCs: the day plan (host only, jagday agReg / agRunReg) ---------- */
/* where the deed happens: at the other consort (she walks there); toward HER the asker stays where she is and sends word (her card walks her over) */
function pmAt(t){return t===S?null:(kh)=>agAt(t,kh)}
function pmFree(v){return !(v.pmW!=null&&wk()-v.pmW<B().npc.gapW)}
function pmMeFree(){return !(S.pmMeW===wk()&&(S.pmMeN||0)>=B().npc.me)}
/* the day plan's pick without the global dice (law: weighted, never always-best): a roll hashed from the person, the target list and the buổi,
   so planning never shifts anyone else's draws (role-parity probe seeds Math.random) */
function pmHash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0)/4294967296}
function pmPickBy(L,w,v,salt){if(L.includes(S)){const O=L.filter(x=>x!==S);if(!O.length||wk()-(S.pmMeL==null?-1e9:S.pmMeL)>=B().npc.meGap||pmHash([key(v),salt,"me",typeof bkey==="function"?bkey():""].join("|"))<B().npc.meShare)return S;L=O}const W=L.map(x=>Math.max(BAL.mind.pickMin,w(x)));const T=W.reduce((s,x)=>s+x,0);let r=pmHash([key(v),salt,typeof bkey==="function"?bkey():"",L.map(key).join(",")].join("|"))*T;for(let i=0;i<L.length;i++){r-=W[i];if(r<=0)return L[i]}return L[L.length-1]}
/* the NPC's own estimate of a duel (no draw): each side's median board (jmgt mgSkipRaw on its gap d) + talent → the share of the luck range */
function pmOddsEst(a,t,kind){const R=pmR(a,t),L=B().luck;const med=p=>{try{return mgSkipRaw(mgTier(kind,{occ:"pm",rank:R,p,lv:kg82LvFor(p,kind)}))}catch(e){return 5}};
 const d=(pmTal(a,kind)+med(a)/10*L)-(pmTal(t,kind)+med(t)/10*L);return oddsCl(Math.round(100/2+d/L*100))}
if(typeof agReg==="function"&&typeof p3O==="function"){
 agReg("consort","pm",(v,N,need)=>{const O=[];try{if(!(typeof p3On==="function"&&p3On())||v===S||!live(v)||v.confined||v.coop||!pmFree(v))return O;const G=B().npc.g;
  const L=others(v).filter(x=>x&&x!==v&&live(x)&&!x.confined&&(x!==S||(pmMeFree()&&!isSrvSafe()&&!S.confined)));if(!L.length)return O;
  if(!need||G.play[need]!=null){const F=L.filter(x=>aff(v,x)>=B().npc.minAff);const t=F.length?pmPickBy(F,x=>BAL.mind.pick.ag.base+Math.max(0,aff(v,x)),v,"play"):null;
   if(t){const x=p3O(v,"pmPlay",{n:"Cùng chơi",c:{},o:100,k:B().kc},N,G.play,"social",pmAt(t),t);if(x)O.push(x)}}
  if(!need||G.duel[need]!=null){const F=L.filter(x=>(typeof agSpite==="function"?agSpite(v,x):-aff(v,x))>=B().npc.spite);const t=F.length?pmPickBy(F,x=>BAL.mind.pick.ag.base+Math.max(0,typeof agSpite==="function"?agSpite(v,x):-aff(v,x)),v,"duel"):null;
   if(t&&pmStakes(v,t).some(z=>z.ok)){const x=p3O(v,"pmDuel",{n:"Thách đấu",c:{},o:pmOddsEst(v,t,pmX(v,t,"duel").kind),k:B().kc},N,G.duel,"social",pmAt(t),t);if(x)O.push(x)}}
  /* C4 (law 1): a ladder challenge FOR THE PLACE right above (her too), at most one per BAL.pm.lad.gapW weeks */
  if((!need||B().lad.g[need]!=null)&&!(v.pmLW!=null&&wk()-v.pmLW<B().lad.gapW)){const A=pmLadAim(v);const t=A&&A.p;
   if(t&&L.includes(t)&&pmStakes(v,t).some(z=>z.ok)){v.pmLK={t:String(key(t)),kind:A.kind};const x=p3O(v,"pmDuel",{n:"Thách đấu",c:{},o:pmOddsEst(v,t,A.kind),k:B().kc},N,B().lad.g,"social",pmAt(t),t);if(x)O.push(x)}}
 }catch(e){try{agdErr("pm",e)}catch(x){}}return O});
 const run=act=>(v,t)=>{if(!t||!live(v)||!live(t)||!pmFree(v))return"";const lk=act==="duel"&&v.pmLK&&v.pmLK.t===String(key(t))?v.pmLK:null;v.pmLK=null;const x=pmX(v,t,act,lk?{kind:lk.kind}:{});if(!x)return"";if(lk&&pmLadFor(v,t,x))v.pmLW=wk();v.pmW=wk();if(t===S){if(S.pmMeW!==wk()){S.pmMeW=wk();S.pmMeN=0}S.pmMeN++;S.pmMeL=wk()}
  const r=rcvAsk(act==="play"?"pmPlay":"pmDuel",v,t,x);return p3Res(act==="play"?"pmPlay":"pmDuel",t===S||pmSee(v,t)?r:"")};
 agRunReg("cx3:pmPlay",run("play"));agRunReg("cx3:pmDuel",run("duel"));
 try{Object.assign(AGC3BTN,{pmPlay:"Cùng chơi",pmDuel:"Thách đấu"});Object.assign(AGC3ACT,{pmPlay:"rủ người cùng chơi",pmDuel:"thách người so tài"})}catch(e){}}
/* ===================== ROUND C (owner OD 20/11 ~01:00Z "Làm cả 4 luôn đi"; plan: report §ROUND C PLAN) — numbers BAL.pm.live / ky / eye / lad =====================
   C1 pmVsGo      split board DATA: the rivals' raws startContest drew once (rows[].raw, the mgcal hand) are revealed along the board's own clock and are
                  the ones scored; her line = the engine's own running «N/10» (env.hud). Look = KIT REQUEST K-PM-1 kitGameVs (called only when the kit has it).
   C2 pmKyRun     «Cờ» in a person act = the real 7×7 five-in-a-row board (j5 gKy rules, engine KG82_ENG.gomoku, kg82 frame + kgReady); the white AI's
                  strength = the opponent's duel score (talent + her real hand) vs her talent + the occasion rank (BAL.pm.ky). The board decides.
   C3 pmEyes      the real people standing at that place (S.where / whereOf), never at a private palace; pmEyeFx = Danh ± per watcher, respect / envy,
                  memory pmsaw, news through a witness (j28 newsAdd). The same rule for every duel (law 1).
   C4 pmLad       one ladder per art (BAL.pm.lad.arts), S.pmL[kind] = keys best first; moved ONLY by real duels / yields / refused ladder challenges;
                  NPCs challenge the person right above (need danh, within reach, her too); places 1..n earn Danh each month (monthPay). */
const priv=k=>!k||k==="home"||/^r\d+$/.test(String(k));
function pmEyes(a,t,place){if(priv(place))return[];const L=[];const W=S.where||{};
 try{if(S!==a&&S!==t&&!S.dead&&(S.place||"home")===place)L.push(S)}catch(e){}
 for(const v of liveRivals(true)){if(v===a||v===t||v.confined)continue;if((W[v.id]||palaceOf(v))===place)L.push(v)}
 return L.sort((x,y)=>String(key(x)).localeCompare(String(key(y)))).slice(0,B().eye.max)}
function pmEyeTxt(L){return L.map(p=>p===S?"ngươi":p.name).join(", ")}
function pmEyeFx(win,lose,x,place){const E=B().eye,L=pmEyes(win,lose,place);if(!L.length)return"";const d=Math.min(E.danhMax,E.danh*L.length);
 apx(win,{danh:d});apx(lose,{danh:-d});const env=[],res=[];
 for(const w of L){const sp=typeof agSpite==="function"&&w!==S?agSpite(w,win):Math.max(0,-aff(w,win));
  if(aff(w,win)>=E.likeMin){affAdd(w,win,E.kinh);res.push(w)}/* one who likes the winner respects her; else one who resents her envies her */
  else if(sp>=E.spite){if(win===S&&w!==S){if(typeof ghenUp==="function")ghenUp(w,E.ghen,"thấy ngươi thắng trước mặt mọi người",S)}else oanAdd(w,win,E.oan);env.push(w)}
  pmMem(w,win,"pmsaw",x.n)}
 if(win!==S&&lose!==S&&!L.includes(S)){try{newsAdd(win,"pmwin",`${win.name} thắng ${lose.name} một ván ${x.n} trước mặt ${L.length} người`)}catch(e){}}
 return `người xem: ${pmEyeTxt(L)} — Danh ${nm(win)} +${d}, ${nm(lose)} −${d}${res.length?`; nể ${nm(win)}: ${pmEyeTxt(res)} (+${E.kinh})`:""}${env.length?`; ghét ${nm(win)} thêm: ${pmEyeTxt(env)}`:""}`}
/* ---------- C4 the ladder ---------- */
function pmLadOn(kind){return B().lad.arts.includes(kind)}
function pmLadPool(){let L=[];try{L=liveRivals(true).filter(v=>v.alive!==false&&!v.out)}catch(e){}if(!S.dead&&!S.out&&!isSrvSafe())L.unshift(S);return L}
function pmLad(kind){if(!pmLadOn(kind))return[];S.pmL=S.pmL&&typeof S.pmL==="object"?S.pmL:{};const P=pmLadPool(),M=new Map(P.map(p=>[String(key(p)),p]));
 const by=(x,y)=>pmTal(y,kind)-pmTal(x,kind)||rk(y)-rk(x)||String(key(x)).localeCompare(String(key(y)));
 let L=Array.isArray(S.pmL[kind])?S.pmL[kind].map(String).filter(k=>M.has(k)):null;
 if(!L)L=P.slice().sort(by).map(p=>String(key(p)));else{const nw=P.filter(p=>!L.includes(String(key(p)))).sort(by).map(p=>String(key(p)));L=L.concat(nw)}
 S.pmL[kind]=L;return L.map(k=>M.get(k))}
function pmLadPos(p,kind){const i=pmLad(kind).indexOf(p);return i<0?0:i+1}
function pmLadSet(kind,L){S.pmL[kind]=L.map(p=>String(key(p)))}
/* a winner placed below the loser takes the loser's place; the loser and everyone between move down one */
function pmLadWin(win,lose,kind){if(!pmLadOn(kind))return"";const L=pmLad(kind),iw=L.indexOf(win),il=L.indexOf(lose);if(iw<0||il<0||iw<il)return"";
 L.splice(iw,1);L.splice(il,0,win);pmLadSet(kind,L);pmMem(lose,win,"pmlad",pmKindN(kind));return `${nm(win)} lên thứ ${il+1} trên bảng ${pmKindN(kind)}`}
function pmLadDrop(p,kind,n){if(!pmLadOn(kind))return"";const L=pmLad(kind),i=L.indexOf(p);if(i<0||i>=L.length-1)return"";const j=Math.min(L.length-1,i+n);L.splice(i,1);L.splice(j,0,p);pmLadSet(kind,L);return `${nm(p)} tụt xuống thứ ${j+1} trên bảng ${pmKindN(kind)}`}
/* a challenge FOR A PLACE: the asker stands below the receiver, within reach, on that art's ladder */
function pmLadFor(a,t,x){if(!x||x.a!=="duel"||!pmLadOn(x.kind))return false;const L=pmLad(x.kind),ia=L.indexOf(a),it=L.indexOf(t);return ia>it&&it>=0&&ia-it<=B().lad.reach}
/* the NPC's ladder aim: in her strongest art (talent first) where someone stands right above her and plays that art */
function pmLadAim(v){const A=B().lad.arts.slice().sort((x,y)=>pmTal(v,y)-pmTal(v,x));for(const k of A){if(k!=="dauho"&&!pmArts(v,v).some(z=>z.kind===k))continue;/* she plays that art herself */const L=pmLad(k),i=L.indexOf(v);if(i<=0)continue;
  for(let j=i-1;j>=Math.max(0,i-B().lad.reach);j--){const t=L[j];if(t&&live(t)&&!t.confined&&pmArts(v,t).some(z=>z.kind===k))return{p:t,kind:k}}}return null}
/* places 1..n earn Danh each month (everyone the same, law 1) */
function pmLadMonth(){const T=B().lad.top,out=[];for(const k of B().lad.arts){const L=pmLad(k);T.forEach((d,i)=>{const p=L[i];if(!p||!d)return;apx(p,{danh:d});if(p===S)out.push(`${pmKindN(k)} thứ ${i+1}: Danh +${d}`)})}
 return out.length?`Bảng tài nghệ hậu cung — ${out.join(" · ")}.`:""}
if(typeof monthPay==="function"){const m0=monthPay;monthPay=function(){let r=m0.apply(this,arguments);try{if(S&&!S.dead&&S.pmL){const t=pmLadMonth();if(t){log(t);}}}catch(e){console.error(e)}return r};window.monthPay=monthPay}
/* ---------- C1 split board data ---------- */
function pmVsGo(rows,o,kind){const vs={me:0,f:0,t0:0,kind,opp:(rows||[]).map(r=>({who:r.p||o,raw:r.raw!=null?r.raw:5,shown:0}))};KG82.vs=vs;let sig="";
 KG82.onHud=h=>{const m=/^(\d+)\s*\/\s*10/.exec(String(h.score==null?"":h.score));if(m)vs.me=mgGrade(+m[1]*1,kind);
  const r=/(\d+)\s*\/\s*(\d+)/.exec(String(h.round==null?"":h.round));if(r&&+r[2]>0)vs.f=Math.max(vs.f,Math.min(1,(+r[1]-1)/+r[2]));
  const tm=/(\d+)\s*giây/.exec(String(h.time==null?"":h.time));if(tm){const n=+tm[1];if(!vs.t0||n>vs.t0)vs.t0=n;vs.f=Math.max(vs.f,Math.min(1,1-n/vs.t0))}
  for(const p of vs.opp)p.shown=Math.min(p.raw,Math.round(p.raw*vs.f));const s2=[vs.me,...vs.opp.map(p=>p.shown)].join(",");if(s2===sig)return;sig=s2;
  if(typeof kitGameVs==="function")try{kitGameVs(vs)}catch(e){console.error(e)}}}
/* ---------- C2 the real 7×7 Cờ ---------- */
const PM_KY={e:"gomoku",n:"Cờ",t:"Năm quân liền hàng",timed:false,how:"Bàn 7×7. Ngươi cầm quân đen đi trước, đối thủ cầm quân trắng; mỗi bên lần lượt đặt một quân vào ô trống. Ai có năm quân liền một hàng (ngang, dọc hay chéo) trước là thắng; kín bàn mà chưa ai đủ năm là hòa."};
function pmKyNoise(o,me,R){const K=B().ky;return Math.round(cl(K.base-K.k*(pmScore(o,"co",R)-pmTal(me,"co"))-K.rankN*R,K.min,K.max))}
function kgGomoku(b,env){const K=BAL.pm.ky,n=7,B0=Array(n*n).fill(0);let over=false,maxRun=0,lock=false,mv=0;
 const A=K.ai,noise=KG82.phase==="tut"?K.tut:(KG82.kyNoise!=null?KG82.kyNoise:(5-(env.lv||0))*A.lvN+A.lvN0);KG82.kyOut=null;
 b.innerHTML=`<div class="goban">${B0.map((_,i)=>`<button data-i="${i}" aria-label="Hàng ${Math.floor(i/n)+1}, cột ${i%n+1}"></button>`).join("")}</div><p class="mgsc" id="kgkysc">Đến lượt ngươi.</p>`;
 const cells=b.querySelectorAll(".goban button"),D=[[0,1],[1,0],[1,1],[1,-1]],W=A.w,sc=b.querySelector("#kgkysc");
 const run=(i,p)=>{const r=Math.floor(i/n),c=i%n;let best=0;for(const[dr,dc]of D){let k=1;for(const s of[1,-1]){let rr=r+dr*s,cc=c+dc*s;while(rr>=0&&rr<n&&cc>=0&&cc<n&&B0[rr*n+cc]===p){k++;rr+=dr*s;cc+=dc*s}}best=Math.max(best,k)}return best};
 const val=(i,me)=>{const op=me===2?1:2;B0[i]=me;const a=run(i,me);B0[i]=op;const d=run(i,op);B0[i]=0;const r=Math.floor(i/n),c=i%n;return W[Math.min(a,5)]*A.atk+W[Math.min(d,5)]+(A.midW-Math.abs(r-A.mid)-Math.abs(c-A.mid))};
 const pick=(me,nz)=>{let best=-1,bi=-1;for(let i=0;i<B0.length;i++)if(!B0[i]){const s=val(i,me)+Math.random()*nz;if(s>best){best=s;bi=i}}return bi};
 const put=(i,p)=>{B0[i]=p;cells[i].textContent=p===1?"●":"○";cells[i].classList.add(p===1?"bk":"wh");cells[i].disabled=true;return run(i,p)};
 const fin=(out,raw,msg,ms)=>{over=true;KG82.kyOut=out;KG82.peek=()=>null;sc.textContent=msg;setTimeout(()=>env.end(raw),ms)};
 const hud=()=>env.hud({score:`${Math.min(10,maxRun*2)}/10`,round:`Nước ${mv}`,time:"không hạn"});hud();
 KG82.peek=()=>over||lock?null:{sel:`#kg82 .goban button[data-i="${pick(1,0)}"]`};
 cells.forEach(c=>c.onclick=()=>{if(over||lock)return;const i=+c.dataset.i;if(B0[i])return;mv++;const r=put(i,1);maxRun=Math.max(maxRun,r);hud();
  if(r>=5)return fin("win",K.win,"Ngươi thắng!",A.endMs);if(B0.every(x=>x))return fin("draw",K.draw,"Hòa cờ.",A.endMs);
  lock=true;sc.textContent="Đối thủ đang nghĩ…";setTimeout(()=>{if(over)return;lock=false;const w=put(pick(2,noise),2);
   if(w>=5)return fin("lose",K.lose[Math.min(5,maxRun)],"Quân trắng thắng.",A.loseMs);if(B0.every(x=>x))return fin("draw",K.draw,"Hòa cờ.",A.endMs);sc.textContent="Đến lượt ngươi."},A.think)});
 try{cells[A.mid*n+A.mid].focus({preventScroll:true})}catch(e){}return()=>{over=true}}
if(typeof KG82_ENG==="object")KG82_ENG.gomoku=kgGomoku;
function pmKyRun(a,t,x,me,o,R,place,title){const duel=x.a==="duel",st=duel?pmStakeOf(a,t,x.s):null,E=pmEyes(a,t,place);
 const rows=[["Đối thủ",`${o.name} cầm quân trắng · ${pmWord(pmOdds(me,o,"co"))}`,"t"]].concat(st?[["Cược",st.s==="item"?`${nm(a)} đặt ${st.wa}, ${nm(t)} đặt ${st.wt}`:`${st.what} mỗi bên`,"t"]]:[],E.length?[["Người xem",pmEyeTxt(E),"t"]]:[]);
 let SK=5;try{SK=mgSkipRaw(mgTier("co",{occ:"pm",rank:R}))}catch(e){}
 const out=(raw,sk)=>{if(sk){const iw=pmScore(me,"co",R,SK)>pmScore(o,"co",R);return iw?"win":"lose"}return KG82.kyOut||(raw>=K0().win?"win":"lose")};
 let res=null;
 playArt({art:"co",eng:PM_KY,title,occ:"pm",rank:R,rowsHead:"Ván cờ",rows,go:"Bắt đầu",quick:{n:"Để tài nghệ quyết định",sub:`tính như người cùng bậc (${SK}/10)`},
  onGo:()=>{KG82.kyNoise=pmKyNoise(o,me,R);KG82.guardMs=B().ky.guard},
  resRows:(raw,sk)=>{const w=out(raw,sk);res={w,raw:sk?SK:raw};return[["Ván cờ",w==="win"?"Ngươi thắng":w==="draw"?"Hòa cờ":`${o.name} thắng`,"t"]]},
  onDone:raw=>{const w=res?res.w:out(raw,false),r0=res?res.raw:raw;KG82.kyNoise=null;KG82.kyOut=null;let r;
   if(!duel){const ro=pmRaw(o,"co",R);r=(me===a?pmPlayEnd(a,t,x,r0,ro):pmPlayEnd(a,t,x,ro,r0)).r}
   else if(w==="draw"){pmMark(a,t);r=`Hai bên hòa ván cờ; món cược ai về nấy`}
   else{const iWin=w==="win";r=pmDuelEnd(a,t,x,me===a?iWin:!iWin,place).r}
   log(r+".");pushModal({t:title,who:pv(o),h:`<p>${r}.</p>`});try{showModal();render()}catch(e){}}});return""}
const K0=()=>B().ky;
/* ---------- C4 the ladder LOOK (kit only: the option card + the «Bảng định thứ» standings rows of startContest, kg82Facts / kg82Name) ---------- */
function pmLadLine(p){const L=[];for(const k of B().lad.arts){const q=pmLadPos(p,k);if(q&&q<=B().lad.top.length)L.push(`${pmKindN(k)} thứ ${q}`)}return L.join(", ")}
function pmLadHTML(kind){const L=pmLad(kind),T=B().lad.top;
 const rows=L.map((p,i)=>{const tal=pmTal(p,kind);return{who:p,auto:false,text:`<span class="kgrow"><span><b class="kgpl">${i+1}.</b> ${kg82Name(p,p.name)}</span><b>${tal}</b></span><small>tài nghệ ${tal}${T[i]?` · mỗi tháng Danh +${T[i]}`:""}</small>`}});
 return `<p>Thứ bậc ${pmKindN(kind)} trong hậu cung. Chỉ đổi khi thắng nhau thật: người dưới thắng người trên thì lên thay chỗ ấy. Ngươi đứng thứ ${pmLadPos(S,kind)} / ${L.length}.</p>`+kg82Facts(rows)}
PEND.pmLad=pp=>{const v=pp&&pp.v!=null?RV(pp.v):null;
 return{who:v?pv(v):null,t:`<p>Bảng tài nghệ hậu cung: xem thứ bậc của môn nào?</p><p class="past">Ba người đầu mỗi môn được thêm Danh mỗi tháng; ai đứng dưới có thể thách người trên để giành chỗ.</p>`,
  o:B().lad.arts.map(k=>{const L=pmLad(k),top=L[0];return{n:pmKindN(k),fx:{},x:`ngươi thứ ${pmLadPos(S,k)} / ${L.length}${v?` · ${v.name} thứ ${pmLadPos(v,k)}`:""}${top?` · đứng đầu: ${top===S?"ngươi":top.name}`:""}`,
   go:()=>{pushModal({t:`Bảng tài nghệ · ${pmKindN(k)}`,who:top?pv(top):null,h:pmLadHTML(k)});/* the figure = the art's leader */try{showModal()}catch(e){}}}}).concat([{n:"Thôi",fx:{}}])}};
function pmLadBtn(v){if(!v||isSrvSafe())return[];const l=pmLadLine(v);return[pbtn(`data-pmlad="${v.id}"`,"Bảng tài nghệ",`xem thứ bậc từng môn trong hậu cung${l?` · nàng: ${l}`:""} · không tốn khắc`,"")]}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-pmlad]");if(b&&!b.disabled){e.preventDefault();e.stopPropagation();pushDil(mkP("pmLad",{v:+b.dataset.pmlad}),"Bảng tài nghệ");try{showModal();render()}catch(x){}}},true);
/* ---------- memory (jmem): the deeds this act leaves ---------- */
try{if(window.MEM_DEEDS){Object.assign(MEM_DEEDS,{pmplay:[1,0,"cùng {o} chơi {x}"],pmwin:[-1,0,"thắng {o} một ván {x}, lấy mất món cược"],pmyield:[1,0,"nhường {o} một ván {x}"],pmsaw:[0,0,"xem {o} thắng một ván {x}"],pmlad:[-1,0,"bị {o} giành ngôi trên bảng {x}"]})}
 if(BAL.mem&&BAL.mem.w)Object.assign(BAL.mem.w,B().mem)}catch(e){}
try{if(typeof MGT_OCCN==="object")MGT_OCCN.pm="so tài"}catch(e){}
Object.assign(window,{pmLadHTML,pmLadLine,pmLadBtn,pmLadAim,pmEyes,pmEyeFx,pmLad,pmLadPos,pmLadWin,pmLadDrop,pmLadFor,pmLadMonth,pmVsGo,pmKyNoise,pmKyRun,PM_KY,pmCoopYield,pmArts,pmR,pmV,pmStakes,pmStakeOf,pmOdds,pmRun,pmAuto,pmX,pmPlayEnd,pmDuelEnd,pmYield,pmYieldAff,pmBtns,pmRows,pmPlayOpts,pmDuelOpts,pmScore,pmItem,pmGoTap});
})();
