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
/* one sentence end for every pm result / log line (review r1 fix 6b: rcvAsk ends «. », the day plan / log add «.») */
const pmEnd=s=>String(s||"").replace(/[.\s]+$/,"");
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
/* art practice: the ONE shared rule (her: j2 addArt; an NPC: j85 addArtP — level-ups give stat, Danh, ARTB85 bonus, the công virtue bonus) */
function pmXp(p,ak){if(!ak||!p)return;if(p.coop){pmArtQ(p,ak);return}try{addArtP(p,ak,B().play.xp)}catch(e){}}
/* r3 fix B (law 1 two-way): the co-op friend's practice lands on HER OWN S — her entry here is a copy, so the art rides the act's result
   (jcoopworld famDiff → res.fam {op:"art",ak} → famApply on her side adds BAL.pm.play.xp with her own addArt), both directions, one rule */
const PM_ART=new WeakMap();
function pmArtQ(p,ak){const L=PM_ART.get(p)||[];L.push(ak);PM_ART.set(p,L)}
function pmArtTake(p){const L=p&&PM_ART.get(p)||[];if(p)PM_ART.delete(p);return L}
function pmArtIn(ak){const a=typeof ARTS!=="undefined"&&ARTS.find(z=>z.k===ak);if(!a||!S||!S.artp||S.artp[ak]==null)return"";addArt(ak,B().play.xp);return `Ngươi luyện thêm ${a.n}.`}
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
 if(B().pub.includes(place)){apx(win,{danh:D.pubDanh});apx(lose,{danh:-D.pubDanh});L.push(`trước mặt mọi người: Danh ${nm(win)} +${D.pubDanh}, ${nm(lose)} −${D.pubDanh}`)}
 const gap=rk(lose)-rk(win);if(gap>0){const s=Math.min(D.shameMax,D.shame*gap);apx(lose,{danh:-s});oanAdd(lose,win,D.oan);L.push(`người trên thua kẻ dưới: ${nm(lose)} mất mặt (Danh −${s}), oán ${nm(win)} +${D.oan}`)}
 pmMem(lose,win,"pmwin",x.n);return{win,lose,r:L.join("; ")}}
/* «Nhường»: the challenged side (outranked) gives the game away: pays the stake, wins the superior's favour */
function pmYield(a,t,x){const D=B().duel,st=Object.assign({},pmStakeOf(a,t,x.s)||{s:"bac",V:pmV(a,t)},{a0:a});if(st.s==="item"&&(!st.ia||!st.it))st.s="bac";
 const got=pmPay(a,t,st);const n=pmYieldAff(a,t);affAdd(a,t,n);oanAdd(a,t,-D.yieldOan);pmMem(a,t,"pmyield",x.n);
 return `${Nm(t)} nhường ${nm(a)} ván ${x.n}${got?` (mất ${got})`:""}; ${nm(a)} quý ${nm(t)} +${n}`}
function pmYieldAff(a,t){return Math.max(1,Math.round(pmV(a,t)*B().duel.yieldK/B().val.affBac))}
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
 if(x.a==="play"){playArt({art:x.kind,title,occ:"pm",rank:R,quick:{n:"Để tài nghệ quyết định",sub:"tính 5/10"},onDone:raw=>{const ro=pmRaw(o,x.kind,R);const r=me===a?pmPlayEnd(a,t,x,raw,ro):pmPlayEnd(a,t,x,ro,raw);
   log(pmEnd(r.r)+".");pushModal({t:title,who:pv(o),h:`<p>${r.r}.</p>`});try{showModal();render()}catch(e){}}});return""}
 const st=pmStakeOf(a,t,x.s);const note=st?`Cược: ${st.s==="item"?`${nm(a)} đặt ${st.wa}, ${nm(t)} đặt ${st.wt}`:st.what+" mỗi bên"} · thắng lấy cược của đối thủ, thua mất cược của mình`:"";
 startContest({art:x.kind,title,rivals:[o],occ:"pm",rank:R,noCup:1,luck:B().luck,stakes:{note},onDone:out=>{const iWin=!!out&&out.place===1;const aWins=me===a?iWin:!iWin;
   const r=pmDuelEnd(a,t,x,aWins,place);log(pmEnd(r.r)+".");pushModal({t:title,who:pv(o),h:`<p>${r.r}.</p>`});try{showModal();render()}catch(e){}}});return""}
/* her walk to an NPC who invites / challenges her (go-in-person rule OD 18/11 ~19:55Z; review r1 fix 5): the khắc and the reason, the same rule as pmBtns */
function pmWalk(p){if(!p||p.coop||together(S,p))return{tc:0,why:"",late:false,k:S.place};const k=whereOf(p),tc=travel(S.place,k);return{k,tc,why:walkBlock(k,tc),late:walkLate(k,tc)}}
function pmWalkTx(w){return w.tc?`${w.tc} khắc`:""}/* r3 fix A: the kit word mode keeps only a plain «N khắc» cost; the place + «buổi sau» ride the card line (pmWalkLine) */
function pmWalkLine(p,play){const w=pmWalk(p);return `Nhận lời thì ngươi đi sang chỗ nàng${w.tc?` (đi đường ${w.tc} khắc${w.late?", tới nơi buổi sau":""})`:""} rồi ${play?"chơi":"thi"} ngay.`}
/* ---------- the receiver's answers (jrcv shape: i = the L1876 weight slot) ---------- */
function pmNoO(p,t,x){const F=BAL.ag.cx2.help.fail,me=t===S,up=rk(p)>rk(t)?B().refuse.up:0;
 return{i:2,id:"no",n:rcvKw(2),fx:{},x:`được: giữ thì giờ${x.a==="duel"?", giữ món cược":""} · mất: hai bên quý nhau ${balSg(-F)}${up?`, ${nm(p)} là bề trên, quý ${me?"ngươi":t.name} thêm ${balSg(-up)}`:""}`,
  go:()=>{affAdd(t,p,-F);affAdd(p,t,-F-up);return{ok:0,r:`${Nm(t)} khéo từ chối lời ${x.a==="play"?"mời":"thách"} của ${nm(p)}`}}}}
function pmPlayOpts(p,t,x){const P=B().play,me=t===S;
 const w=me?pmWalk(p):{tc:0,why:""};
 return[{i:0,id:"full",n:"Nhận lời",fx:me?{suc:-P.suc}:{},x:`được: hai bên quý nhau +${P.aff[0]}..+${P.aff[2]} (chơi càng hay càng thân) · mất: Sức ${balSg(-P.suc)}${w.tc?", "+pmWalkTx(w):""}`,need:w.why?[{t:w.why,ok:false}]:undefined,tsDis:!!w.why,lk:()=>(!me&&(t.suc||0)<P.suc)||!!w.why,
  go:()=>{if(!me)ap(t,{suc:-P.suc});const r=pmRun(p,t,x);return{ok:1,r}}},pmNoO(p,t,x)]}
function pmDuelOpts(p,t,x){const st=pmStakeOf(p,t,x.s),o=pmOdds(t,p,x.kind),me=t===S,what=st?pmPut(st,t,p):"";
 const w=me?pmWalk(p):{tc:0,why:""};
 const O=[{i:0,id:"full",n:"Nhận lời thách đấu",fx:{},x:`${pmWord(o)}${w.tc?` · tốn: ${pmWalkTx(w)}`:""} · thành: lấy ${pmPut(st,p,p)} của ${nm(p)} · hỏng: mất ${pmPut(st,t,p)} của ${me?"ngươi":"mình"}`,need:w.why?[{t:w.why,ok:false}]:undefined,tsDis:!!w.why,lk:()=>!st||!st.ok||!!w.why,
  go:()=>({ok:1,r:pmRun(p,t,x)})}];
 if(rk(p)>rk(t))O.push({i:1,id:"half",n:"Nhường bề trên",fx:{},x:`được: ${nm(p)} quý ${me?"ngươi":t.name} +${pmYieldAff(p,t)}, bớt oán ${B().duel.yieldOan} · mất: ${st&&st.s==="item"?"nộp "+what:what}`,lk:()=>!st||!st.ok,go:()=>({ok:1,r:pmYield(p,t,x)})});
 O.push(pmNoO(p,t,x));return O}
/* co-op (foreman E #14 ruling (3)): the friend's ask card offers «Nhường bề trên» when the asker outranks the reader — the same answer and preview as pmDuelOpts */
function pmCoopYield(p,t){if(!p||!t||rk(p)<=rk(t))return null;return{n:"Nhường bề trên",x:`được: ${nm(p)} quý ngươi +${pmYieldAff(p,t)}, bớt oán ${B().duel.yieldOan} · mất: món cược của ngươi`}}
/* her card logs the answer as it comes back (PEND.rcvAsk): one full stop, the same as every pm line (fix 6b) */
function pmDot(t,O){if(t!==S)return O;return O.map(o=>Object.assign({},o,{go:()=>{const r=o.go();const s=r&&typeof r==="object"?r.r:r;const d=s?pmEnd(s)+".":"";return r&&typeof r==="object"?Object.assign({},r,{r:d}):d}}))}
/* co-op (review r1 fix 1 + 2): the friend's ask card = the SAME card an NPC's ask gives (RCVK line + pmPlayOpts / pmDuelOpts previews: game, stake of each
   side, ladder word, được / mất). p = the asker's entry in the reader's world, x = her pick {a, kind, ak, n, s} (rides with the ask, jcoopworld).
   Each answer maps to the relay's ok: Nhận = true, Nhường bề trên = "yield", Từ chối = false. */
function pmCoopX(k,x){if((k!=="pmplay"&&k!=="pmduel")||!x||typeof x!=="object"||!x.kind)return null;const o={a:k==="pmplay"?"play":"duel",kind:String(x.kind),ak:x.ak||null,n:String(x.n||pmKindN(x.kind))};if(o.a==="duel")o.s=x.s||null;return o}
function pmCoopCard(p,k,x){x=pmCoopX(k,x);if(!p||!x)return null;const D=RCVK[x.a==="play"?"pmPlay":"pmDuel"];if(!D||(D.ok&&!D.ok(p,S,x)))return null;
 const O=(x.a==="play"?pmPlayOpts(p,S,x):pmDuelOpts(p,S,x)).map(o=>({n:o.n,x:o.x,need:o.need,tsDis:o.tsDis,ok:o.id==="full"?true:o.id==="half"?"yield":false}));
 return{h:D.line(p,x),o:O}}
const okPair=(p,t)=>live(p)&&live(t)&&p!==t&&!(t===S&&(S.confined||isSrvSafe()))&&!(p===S&&(S.confined||isSrvSafe()));
function isSrvSafe(){try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}}
RCVK.pmPlay={t:"Lời mời cùng chơi",act:"mời cùng chơi với",kind:"pm",ok:(p,t,x)=>okPair(p,t)&&!!x,
 line:(p,x)=>`<p>${p.name} sai người sang: “Nương nương nhà ta rảnh rang, muốn mời người sang ${placeName(whereOf(p))} cùng chơi ${x&&x.n||""} cho vui.”</p>${p.coop?"":`<p class="past">${pmWalkLine(p,1)}</p>`}`,
 opts:(p,t,x)=>pmDot(t,pmPlayOpts(p,t,x))};
RCVK.pmDuel={t:"Lời thách đấu",act:"thách đấu",kind:"pm",ok:(p,t,x)=>okPair(p,t)&&!!x&&!!pmStakeOf(p,t,x.s),
 line:(p,x)=>{const st=x&&pmStakeOf(p,S,x.s);return `<p>${p.name} sai người sang: “Nghe danh tài ${x&&x.n||""} của người, nương nương nhà ta xin so tài một ván ở ${placeName(whereOf(p))}.”</p><p class="past">Cược: ${st?(st.s==="item"?`nàng đặt ${st.wa}, ngươi đặt ${st.wt}`:st.what+" mỗi bên"):""}.${p.coop?"":" "+pmWalkLine(p,0)}</p>`},
 opts:(p,t,x)=>pmDot(t,pmDuelOpts(p,t,x))};
/* ---------- her side: ask (popup / Hậu cung) ---------- */
function pmAsk(t,x){if(!x)return"";const kc=B().kc;if(!can(kc))return"";spend(kc);
 if(t.coop&&typeof runAct==="function")return runAct(S,t,x.a==="play"?"pmplay":"pmduel",x)||"";
 return rcvAsk(x.a==="play"?"pmPlay":"pmDuel",S,t,x)||""}
function pmDone(r){try{if(popIdx!=null&&S.visit){S.visit.tk=S.visit.tk||{};S.visit.tk[popIdx]=1}}catch(e){}if(r){r=pmEnd(r)+".";log(r);try{popMsg=r}catch(e){}}}
/* the khắc row (Cần) of every pick option: her time left this buổi (j15 whyTime, one rule) */
function pmNeedK(){const w=whyTime(B().kc);return w?[{t:w,ok:false}]:[]}
PEND.pmPick=pp=>{const t=RV(pp.v);if(!t||!live(t))return null;const play=pp.a==="play";
 return{who:pv(t),t:`<p>${play?`Mời ${t.name} cùng chơi môn gì?`:`Thách ${t.name} so tài môn gì?`}</p><p class="past">Môn của ${t.name} và Đầu hồ (ai cũng chơi được). Tốn ${B().kc} khắc.</p>`,
  o:pmArts(S,t).map(ar=>({n:ar.n,fx:{},x:(play?"":`${pmWord(pmOdds(S,t,ar.kind))} · `)+`nàng bậc ${pmLvTxt(t,ar.kind)}, ngươi bậc ${pmLvTxt(S,ar.kind)} · `+(play?`tốn: ${B().kc} khắc · thành: hai bên quý nhau +${B().play.aff[0]}..+${B().play.aff[2]}`:`tốn: ${B().kc} khắc · thành: lấy cược của nàng · hỏng: mất cược ngang giá của ngươi`),
   need:pmNeedK(),tsDis:!!whyTime(B().kc),go:()=>{if(play)pmDone(pmAsk(t,{a:"play",kind:ar.kind,ak:ar.ak,n:ar.n}));else pushDil(mkP("pmStake",{v:t.id,kind:ar.kind}),"Thách đấu")}})).concat([{n:"Thôi",fx:{}}])}};
PEND.pmStake=pp=>{const t=RV(pp.v);if(!t||!live(t))return null;const ar=pmArts(S,t).find(z=>z.kind===pp.kind);if(!ar)return null;const o=pmOdds(S,t,ar.kind);
 return{who:pv(t),t:`<p>Thách ${t.name} một ván ${ar.n}. Hai bên đặt cược ngang giá; thắng lấy cược của đối thủ.</p>`,
  o:pmStakes(S,t).map(st=>({n:st.n,fx:{},x:`${pmWord(o)} · tốn: ${B().kc} khắc · thành: lấy ${pmPut(st,t,S)} của ${t.name} · hỏng: mất ${pmPut(st,S,S)} của ngươi`,need:st.ok?pmNeedK():[{t:st.why,ok:false}],tsDis:!st.ok||!!whyTime(B().kc),
   go:()=>{if(!st.ok)return;pmDone(pmAsk(t,{a:"duel",kind:ar.kind,ak:ar.ak,n:ar.n,s:st.s}))}})).concat([{n:"Thôi",fx:{}}])}};
/* the popup rows (j2 talkOpts: a consort, the Hoàng hậu, the co-op friend) — same palace allowed (foreman Q1); khắc = BAL.pm.kc, paid when sent */
function pmRows(v){if(!v||!live(v)||v===S||isSrvSafe())return[];const dis=S.confined?"đang cấm túc":"";
 return[{n:"Cùng chơi",o:100,pm:1,x:`môn của nàng · tốn: ${B().kc} khắc · thành: hai bên quý nhau thêm`,lock:!!dis,t:dis,open:()=>pushDil(mkP("pmPick",{v:v.id,a:"play"}),"Cùng chơi")},
  {n:"Thách đấu",o:100,pm:1,x:`hai bên đặt cược ngang giá · tốn: ${B().kc} khắc · thành: lấy cược của nàng · hỏng: mất cược của ngươi`,lock:!!dis,t:dis,open:()=>pushDil(mkP("pmPick",{v:v.id,a:"duel"}),"Thách đấu")}]}
if(typeof talkOpts==="function"){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&(p.kind==="rival"||p.kind==="hh")&&p.ref&&Array.isArray(A))A.push(...pmRows(p.ref))}catch(e){console.error(e)}return A};window.talkOpts=talkOpts}
if(typeof talkK==="function"){const k0=talkK;talkK=function(a){if(a&&a.pm)return 0;/* paid on sending (pmAsk) */return k0.apply(this,arguments)};window.talkK=talkK}
/* ---------- Hậu cung tab: the two buttons in «Gặp mặt»; not together → walk there first (goSee), the pick opens on arrival ---------- */
function pmBtns(v){if(!v||!live(v)||v===S||isSrvSafe())return[];const here=together(S,v),k=here?S.place:locKnown(v);const tc=k&&!here?travel(S.place,k):0;
 const why=S.confined?"đang cấm túc":S.out?"đang ở lãnh cung":!here&&!k?"chưa rõ nàng ở đâu":!here?walkBlock(k,tc):"";const kc=B().kc;
 const ton=`tốn: ${kc+tc} khắc${tc?` (đi đến chỗ nàng ${tc}, chơi ${kc})`:""}`;
 return [pbtn(`data-pmgo="${v.id}" data-pma="play"`,"Cùng chơi",`${ton} · thành: hai bên quý nhau thêm`,why||whyTime(kc+tc)),
  pbtn(`data-pmgo="${v.id}" data-pma="duel"`,"Thách đấu",`${ton} · thành: lấy cược của nàng · hỏng: mất cược ngang giá của ngươi`,why||whyTime(kc+tc))]}
/* two more entries of the «Gặp mặt» group (each its own act card, counted by the group tab) */
let PMCUR=null;
if(typeof rvCard==="function"&&typeof pcard==="function"){const r0=rvCard;rvCard=function(v){PMCUR=v;try{return r0.apply(this,arguments)}finally{PMCUR=null}};window.rvCard=rvCard;
 const p0=pcard;pcard=function(o){try{const v=PMCUR;if(v&&o&&o.tabKey==="rival"&&Array.isArray(o.groups)){const g=o.groups.find(x=>x&&x[0]==="Gặp mặt");if(g&&Array.isArray(g[1]))g[1].push(...pmBtns(v))}}catch(e){console.error(e)}return p0.apply(this,arguments)};window.pcard=pcard}
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
 }catch(e){try{agdErr("pm",e)}catch(x){}}return O});
 const run=act=>(v,t)=>{if(!t||!live(v)||!live(t)||!pmFree(v))return"";const x=pmX(v,t,act);if(!x)return"";v.pmW=wk();if(t===S){if(S.pmMeW!==wk()){S.pmMeW=wk();S.pmMeN=0}S.pmMeN++;S.pmMeL=wk()}
  const r=pmEnd(rcvAsk(act==="play"?"pmPlay":"pmDuel",v,t,x));return p3Res(act==="play"?"pmPlay":"pmDuel",t===S||pmSee(v,t)?r:"")};
 agRunReg("cx3:pmPlay",run("play"));agRunReg("cx3:pmDuel",run("duel"));
 try{Object.assign(AGC3BTN,{pmPlay:"Cùng chơi",pmDuel:"Thách đấu"});Object.assign(AGC3ACT,{pmPlay:"rủ người cùng chơi",pmDuel:"thách người so tài"})}catch(e){}}
/* ---------- memory (jmem): the deeds this act leaves ---------- */
try{if(window.MEM_DEEDS){Object.assign(MEM_DEEDS,{pmplay:[1,0,"cùng {o} chơi {x}"],pmwin:[-1,0,"thắng {o} một ván {x}, lấy mất món cược"],pmyield:[1,0,"nhường {o} một ván {x}"]})}
 if(BAL.mem&&BAL.mem.w)Object.assign(BAL.mem.w,B().mem)}catch(e){}
try{if(typeof MGT_OCCN==="object")MGT_OCCN.pm="so tài"}catch(e){}
Object.assign(window,{pmArtTake,pmArtIn,pmCoopYield,pmCoopX,pmCoopCard,pmArts,pmR,pmV,pmStakes,pmStakeOf,pmOdds,pmRun,pmAuto,pmX,pmPlayEnd,pmDuelEnd,pmYield,pmYieldAff,pmBtns,pmRows,pmPlayOpts,pmDuelOpts,pmScore,pmItem,pmGoTap});
})();
