/* ================= jagstaff: AG-ALL part B — maids and eunuchs play the player maid's FULL act list (reports/ag-all.md §2, §3, §8, §10.2 row B) =================
   Owner OD 17/11 ~13:20Z (verbatim in OD L1588: "NPC sống tức là họ có thể có những cái option, có những cái nút chọn y chang tôi luôn"), ~13:40Z (L1592:
   weighted odds from her own stats / needs, not flat dice), ~13:55Z (fill every missing act, no approval). HOST ONLY (agOn: a co-op guest never decides).
   1 ONE TABLE   every act reads SRVA (j42.js): the player maid's cards and these options share odds (o → odA), costs (c), gains (w), losses (l), công lao (mp).
   2 HER DATA    a staff gets Sắc / Tài (jagmaid amSt), Đức / Tâm cơ / Danh / Sức / Bạc lazily (BAL.ag.staff.st; old saves load); Chủ tin = .loyal,
                 công lao = .mp (j14 servMerit), his regard = .sung (jagmaid). Wage: the player maid's CNV_WAGE by bậc, each month.
   3 HER NEEDS   asNeeds(s): Chủ tin, công lao (next bậc), Sức, Bạc, his regard (maid, age band, jagmaid amNeed), self (Sắc/Tài/Đức), ally (friends),
                 love (maid, adult), spite (a colleague she dislikes), each × BAL.ag.staff.nw; a spy's greed raises Bạc.
   4 HER OPTIONS asOpts(s): the same cards the player maid sees in her place (Việc, Đồng liêu, chủ, Thái y viện, palace men, Hoàng thượng);
                 eunuchs ("srv") the same list without the maid-only cards (groom, embroidery, men) and with đối thực through "Hẹn ước".
                 u = Σ need × weight × (p·gain + (1−p)·loss + cost) / BAL.ag.unit; mindPick against keeping her routine (BAL.ag.routine).
   5 DRIVER      part A's day planner calls the providers (agReg "maid" / "srv"); until it is loaded, asTick runs one choice per staff per buổi.
   6 ROLLS GONE  (while asOn) j14 sold roll(1.5); j10 servMonth spy roll(60) + friend tell roll → the spy's "Lén báo tin" / the friend's "Trò chuyện";
                 j10 lover roll(20) at init → "Hẹn ước"; j42 maidLoveMonth roll 25/4/3 → love acts + the master's / Thái hậu's grant choice;
                 jmline mlSeek start roll → her "Quỳ dâng trà" deed, master's punish / use roll → her choice; mlFeud (dice) → "Tố lỗi với chủ";
                 mlHit trigger + kind dice → the consort's choice; jagmaid amWeek (seeking tea) → this provider.
   Off: BAL.ag.on = 0 / __agOff / __asOff (every old path again). Counters: window.__asN (histogram per group), __asMs.
   ======================================================================================================================================== */
const ASN=window.__asN={maid:{},srv:{},n:0,ms:0,tick:0};
function asOn(){try{return !!(typeof agOn==="function"&&agOn()&&BAL.ag.staff&&!window.__asOff)}catch(e){return false}}
function asB(){return BAL.ag.staff}
function asGrp(s){return s&&s.role==="maid"?"maid":"srv"}
function asC(s,k){const G=ASN[asGrp(s)];G[k]=(G[k]||0)+1;ASN.n++}
/* ---------- 2 her data (lazy; old saves load) ---------- */
function asSt(s){if(s.duc==null){const T=asB().st;const ri=a=>a[0]+R(a[1]-a[0]+1);try{amSt(s)}catch(e){s.sac=s.sac||30;s.tai=s.tai||10}
  s.duc=ri(T.duc);s.tamco=ri(T.tamco);s.danh=ri(T.danh);s.suc=ri(T.suc);s.bac=ri(T.bac)}if(s.mp==null)s.mp=0;if(s.loyal==null)s.loyal=45;return s}
function asAp(s,fx){for(const k in fx||{}){const v=fx[k];if(!v)continue;if(k==="tin")s.loyal=cl((s.loyal||0)+v,0,100);else if(k==="bac")s.bac=Math.max(0,(s.bac||0)+v);
  else if(k==="sung")s.sung=cl((s.sung||0)+v,0,100);else s[k]=cl((s[k]||0)+v,0,100)}}
function asTxt(o,s,t){return t}
/* ---------- 3 her needs ---------- */
function asGap(g,x){return g>0?cl((g-(x||0))/g,0,1):0}
function asFriends(s){let n=0;for(const k in s.af||{})if(s.af[k]>=SRVA.ask.af&&servById(+k))n++;return n}
function asNeeds(s){asSt(s);const G=asB().goal,W=asB().nw,m=ownerOf(s);const N={};
 N.tin=asGap(G.tin,s.loyal)*W.tin;
 N.mp=m&&srk(s)<srkMax(m,s)?asGap((srk(s)+1)*5,s.mp)*W.mp:0;
 N.suc=asGap(G.suc,s.suc)*W.suc;N.bac=asGap(G.bac,s.bac)*W.bac*(s.spyFor?asB().greed:1);
 N.self=(asGap(G.sac,s.sac)+asGap(G.tai,s.tai)+asGap(G.duc,s.duc))/3*W.self;
 N.ally=asGap(G.friend,asFriends(s))*W.ally;
 N.sung=s.role==="maid"&&mlAgeOk(s)?amNeed(s)*W.sung:0;
 N.love=(s.role==="maid"||s.role==="eunuch")&&(s.age||20)>=18&&!s.wed?W.love:0;
 let sp=0;for(const k in s.af||{})if(s.af[k]<0)sp=Math.max(sp,-s.af[k]/100);N.spite=sp*W.spite;
 return N}
/* the value of an effect vector for her: Chủ tin, Sức, Bạc, công lao, self (Sắc/Tài/Đức/Danh), ally (thiện cảm), love (tình ý), his regard */
const AS_KEY={tin:"tin",suc:"suc",bac:"bac",mp:"mp",sac:"self",tai:"self",duc:"self",danh:"self",tamco:"self",af:"ally",tinh:"love",sung:"sung",spite:"spite"};
function asG(N,fx){let g=0;const sc=asB().sc;for(const k in fx||{}){const nk=AS_KEY[k];if(!nk||!N[nk])continue;g+=N[nk]*fx[k]*(sc[k]||1)}return g}
function asU(N,o){const p=Math.min(100,o.p)/100;return (p*asG(N,o.w)+(1-p)*asG(N,o.l)+asG(N,o.c))/BAL.ag.unit}
/* ---------- 4 her options (the player maid's list) ---------- */
function asHome(m){return m?palaceOf(m):null}
function asMisHome(m){try{return !!m&&srvWhere(m)===palaceOf(m)}catch(e){return false}}
function asOdds(s,b){return b>=100?100:odA(s,b)}
function asPeerOK(s,x){return x&&x!==s&&ownerOf(x)}
/* one option from one SRVA row: k = the player's button (histogram key), t = target, at = place, run = the shared execution */
function asOpt(s,k,raw,more){const m=ownerOf(s);const A=SRVA[k];const mp=A.mp||0;
 const o=Object.assign({k,g:asGrp(s),p:asOdds(s,raw),c:srvCa(k,s,m),w:Object.assign({},srvWa(k,s,m),mp?{mp:mp*asB().mpS}:{}),l:A.l||{},at:asHome(m),tag:"staff"},more||{});
 const pl=o.at;o.at=()=>pl;o.pl=pl;o.run=(p,t)=>asRun(p||s,o);return o}
function asOpts(s,N){asSt(s);const m=ownerOf(s);if(!m)return[];N=N||asNeeds(s);const L=[],maid=s.role==="maid",home=asMisHome(m),X=x=>x&&L.push(x);
 const strict=home&&(hasT(m,"Kiêu ngạo")||hasT(m,"Xảo quyệt"));
 /* Việc (srvCards) */
 X(asOpt(s,"sweep",100));if(home)X(asOpt(s,"tea",SRVA.tea.o(s,m)));X(asOpt(s,"nvp",100,{fx:"meet"}));X(asOpt(s,"rite",100));X(asOpt(s,"study",SRVA.study.o(s)));
 if(maid&&s.bac>=-SRVA.groom.c.bac)X(asOpt(s,"groom",SRVA.groom.o(s)));X(asOpt(s,"rest",SRVA.rest.o(s,m,{strict})));if(maid)X(asOpt(s,"embro",SRVA.embro.o(s)));
 if(s.suc<SRVA.med.at&&s.bac>=-SRVA.med.c.bac)X(asOpt(s,"med",100));if(srk(s)>=SRVA.books.rk)X(asOpt(s,"books",SRVA.books.o(s)));
 if(s.spyFor){const v=byKey(s.spyFor);if(v&&v!==m&&(v===S||v.alive))X(asOpt(s,"spy",SRVA.spy.o(s),{t:v,ev:1}))}
 /* to the master (srvTalk "mis") */
 if(home){X(asOpt(s,"massage",SRVA.massage.o(s,m)));if(s.loyal>=SRVA.askRew.tin)X(asOpt(s,"askRew",SRVA.askRew.o(s,m)));
  if((s.intel||[]).length)X(asOpt(s,"tellMis",100,{ev:1}));if(s.loyal>=SRVA.askRec.tin&&srk(s)<srkMax(m,s))X(asOpt(s,"askRec",SRVA.askRec.o(s,m),{w:{mp:SRVA.askRec.mpOk*asB().mpS}}))}
 else X(asOpt(s,"beside",SRVA.beside.o(s,m),{at:srvWhere(m)}));
 /* Hoàng thượng where he passes (srvTalk "emp", jagmaid one rule) */
 try{const W=S.where||{};if(maid&&mlAgeOk(s)&&W.emp&&W.emp!=="dtd"&&W.emp!=="home")X({k:"empTea",g:"maid",p:odA(s,amTeaO(s,0)),c:{},w:{sung:amTeaG(s)*qv(BAL.mline.seekTr,s,1)},l:{tin:-BAL.ag.maid.tea.fail},at:()=>W.emp,pl:W.emp,tag:"staff",run:p=>asEmpTea(p||s)})}catch(e){}
 /* consorts (srvTalk "rv" / "hh") */
 const hh=typeof queenP==="function"?queenP():null;
 if((s.sec||0)>0){const foe=liveRivals(true).find(v=>v!==m&&(v===hh||hostility(v,m)>=20));if(foe)X(asOpt(s,"betray",100,{t:foe,at:palaceOf(foe)}));
  if(hh&&hh!==m&&hh!==S&&(s.sec||0)>=SRVA.accuse.sec)X(asOpt(s,"accuse",SRVA.accuse.o(s,m),{t:hh,at:"kn"}))}
 {const v=asBig(m);if(v)X(asOpt(s,"greet",100,{t:v,at:palaceOf(v)}))}
 /* Đồng liêu (srvStaffAct) */
 const P=asPeers(s);if(P.f)X(asOpt(s,"chat",SRVA.chat.o(s),{t:P.f,w:{af:SRVA.chat.af},l:{af:SRVA.chat.afL}}));
 if(P.f&&s.bac>=-SRVA.gift.c.bac)X(asOpt(s,"gift",100,{t:P.f,w:{af:SRVA.gift.af}}));
 if(P.fr)X(asOpt(s,"ask",100,{t:P.fr,w:{af:2}}));
 if(P.foe)X(asOpt(s,"frame",SRVA.frame.o(s),{t:P.foe,w:Object.assign({spite:-SRVA.frame.af},SRVA.frame.w)}));
 /* Thái y viện */
 if(s.bac>=-SRVA.tonic.c.bac&&s.suc<SRVA.med.at+20)X(asOpt(s,"tonic",100,{at:"tyv"}));X(asOpt(s,"learn",SRVA.learn.o(s),{at:"tyv"}));
 /* love: palace men (maid) / đối thực (a eunuch and a maid of another palace) */
 if(N.love>0)for(const o of asLove(s))X(o);
 for(const o of L)o.u=asU(N,o)*asB().uMul;return L.filter(o=>o.u>0)}
function asBig(m){const L=liveRivals(true).filter(v=>v!==m&&rkOf(v)>rkOf(m));return L.length?L[R(L.length)]:null}
/* her colleague to befriend (the warmest not yet a close friend, else one she met), a friend to ask, a same-palace colleague she dislikes */
function asPeers(s){const all=allServ().filter(x=>x!==s);if(!all.length)return{};s.af=s.af||{};let f=null,fr=null,foe=null,fa=-1e9,fo=0;const m=ownerOf(s);
 for(const x of all){const a=s.af[x.sid]||0;if(a>=SRVA.ask.af&&ownerOf(x)!==m&&!fr)fr=x;if(a<SRVA.ask.af+40&&a>fa&&a>=0){fa=a;f=x}if(a<fo&&ownerOf(x)===m){fo=a;foe=x}}
 if(!f)f=all[R(all.length)];return{f,fr,foe}}
function asMenFor(s){try{return srvMen().filter(x=>x.rw!=="vương gia")}catch(e){return[]}}
function asLove(s){const L=[];s.mt=s.mt||{};const B=asB();
 if(s.role==="maid"){const M=asMenFor(s);if(!M.length)return L;let id=Object.keys(s.mt).sort((a,b)=>s.mt[b]-s.mt[a])[0];let m=id&&M.find(x=>String(x.id)===id);if(!m)m=M[R(M.length)];
  const tn=s.mt[m.id]||0,risk=asRisk(s);const T={man:m,tinh:tn};
  L.push(asOpt(s,"hail",100,Object.assign({w:{tinh:SRVA.hail.af/2}},T)));L.push(asOpt(s,"flirt",SRVA.flirt.o(s),Object.assign({w:{tinh:SRVA.flirt.tinh},l:{tin:-risk/SRVA.flirt.seen/B.riskD}},T)));
  if(tn>=SRVA.token.at)L.push(asOpt(s,"token",SRVA.token.o(s),Object.assign({w:{tinh:SRVA.token.tinh},l:{tin:-risk/SRVA.token.seen/B.riskD}},T)));
  if(tn>=SRVA.tryst.at&&asFriends(s)>0)L.push(asOpt(s,"tryst",SRVA.tryst.o(s,null,{risk}),Object.assign({w:Object.assign({tinh:SRVA.tryst.tinh},SRVA.tryst.w),l:{tin:-B.caughtTin,suc:-B.caughtSuc},risk},T)));
  if(tn>=SRVA.vow.at&&s.vow!==m.id)L.push(asOpt(s,"vow",SRVA.vow.o(s,null,{tinh:tn}),Object.assign({w:{tinh:B.vowTinh}},T)));return L}
 /* đối thực: the eunuch's "Hẹn ước" with a maid of another palace both warm to (af ≥ dt each way) */
 if(!s.lover){const x=allServ().find(y=>y.role==="maid"&&!y.lover&&ownerOf(y)!==ownerOf(s)&&(s.af||{})[y.sid]>=B.dt&&((y.af||{})[s.sid]||0)>=B.dt);
  if(x)L.push(asOpt(s,"vow",SRVA.vow.o(s,null,{tinh:s.af[x.sid]}),{t:x,w:{tinh:B.vowTinh}}))}
 return L}
function asRisk(s){const k=asHome(ownerOf(s));const base={vuon:28,thu:34,tyv:20,tn:40,home:18}[k]||26;return cl(Math.round(base+(S.mat||0)-asFriends(s)*4-(s.tamco||0)/10),6,92)}
/* ---------- the shared execution (the player's card: cost, roll at its odds, gain or loss, công lao, then what the act does) ---------- */
function asSee(m,t){try{return m===S||t===S||(S.mat||0)>=BAL.mline.seeMat}catch(e){return false}}
function asRun(s,o){const m=ownerOf(s);if(!m)return"";const A=SRVA[o.k];asC(s,o.k);asAp(s,o.c);const ok=o.p>=100||roll(o.p);
 asAp(s,ok?srvWa(o.k,s,m):(A.l||{}));if(ok&&A.mp)servMerit(s,A.mp);let r="";
 try{r=(AS_DO[o.k]||(()=>""))(s,m,o,ok)||""}catch(e){console.error("jagstaff "+o.k,e)}
 try{if(typeof agLedger==="function")agLedger(s,o.k,o.t,ok)}catch(e){}
 return r}
function asOut(s,why){const o=ownerOf(s);if(o&&o.staff){const i=o.staff.indexOf(s);if(i>=0)o.staff.splice(i,1)}s.out=why||1;ASN.out=(ASN.out||0)+1}
const AS_DO={
 nvp(s){if(roll(SRVA.nvp.bully)){asAp(s,{suc:-5});return""}const L=allServ().filter(x=>x!==s&&ownerOf(x)!==ownerOf(s));if(L.length){const x=L[R(L.length)];s.af=s.af||{};s.af[x.sid]=cl((s.af[x.sid]||0)+5,-100,100)}return""},
 spy(s,m,o,ok){const v=o.t;if(ok){/*evok: capped (the player's own "Lén báo tin")*/evA(v,m,SRVA.spy.ev);return v===S?`Tai mắt ${s.name} trong cung ${m.name} lén báo tin: chứng cứ +${SRVA.spy.ev}. `:""}
  if(roll(SRVA.spy.out)){asOut(s,"tgk");return asSee(m,v)?`${m===S?"Ngươi":m.name} bắt gặp ${s.name} lén lút với người của ${NM(v)}, đày xuống Tân Giả khố. `:""}return""},
 tellMis(s,m){const iv=(s.intel||[]).map(RV).filter(v=>v&&v.alive&&v!==m)[0];s.intel=(s.intel||[]).slice(1);if(iv){/*evok: servant intel, capped*/evA(m,iv,SRVA.tellMis.ev);if(m===S)return `${s.name} bẩm tin dò được về ${iv.name}: chứng cứ +${SRVA.tellMis.ev}. `}return""},
 askRec(s,m,o,ok){if(ok)servMerit(s,SRVA.askRec.mpOk);return""},
 betray(s,m,o){const v=o.t;/*evok: master schemed (sec>0)*/evA(v,m,SRVA.betray.ev);s.sec=Math.max(0,(s.sec||0)-1);s.betray={by:key(v)};return v===S?`${s.name}, người hầu của ${m.name}, lén đến mật báo chuyện của chủ: chứng cứ +${SRVA.betray.ev}. `:""},
 accuse(s,m,o,ok){const v=o.t;if(!ok){s.betray={by:key(v)};return""}s.sec=0;const a0=ACTX.a;ACTX.a=v;try{fall(m,"bị cung nữ tố giác, chứng cứ rành rành")}finally{ACTX.a=a0}
  asOut(s,"hh");try{(v.staff=v.staff||[]).push(s);s.out=0}catch(e){}return asSee(m,v)?`${s.name}, người hầu của ${NM(m)}, tố chủ trước Hoàng hậu; ${NM(m)} bị xét tội. `:""},
 chat(s,m,o,ok){const x=o.t;s.af=s.af||{};s.af[x.sid]=cl((s.af[x.sid]||0)+(ok?SRVA.chat.af:SRVA.chat.afL),-100,100);if(ok){x.af=x.af||{};x.af[s.sid]=cl((x.af[s.sid]||0)+SRVA.chat.af/2,-100,100)}
  /* the friend tell (was j10 servMonth roll): what she says of her palace's schemes this week reaches her friend's master */
  if(ok&&(m.schemes||0)>(m.schLast||0)&&(s.af[x.sid]||0)>=20){const o2=ownerOf(x);if(o2&&o2!==m&&evA(o2,m,1)&&o2===S)return `${x.name} nghe bạn là ${s.name} kể chuyện cung ${NM(m)}: chứng cứ +1. `}return""},
 gift(s,m,o){const x=o.t;s.af=s.af||{};s.af[x.sid]=cl((s.af[x.sid]||0)+SRVA.gift.af/2,-100,100);x.af=x.af||{};x.af[s.sid]=cl((x.af[s.sid]||0)+SRVA.gift.af,-100,100);return""},
 ask(s,m,o){const L=liveRivals(true).filter(x=>x!==m);if(L.length){s.intel=(s.intel||[]).concat([L[R(L.length)].id]).slice(-3)}return""},
 frame(s,m,o,ok){const x=o.t;s.af=s.af||{};x.af=x.af||{};if(ok){x.loyal=cl((x.loyal||0)+SRVA.frame.loy,0,100);x.trouble=wk();x.af[s.sid]=cl((x.af[s.sid]||0)+SRVA.frame.af,-100,100);
   let r=m===S?`${s.name} tố ${x.name} lười nhác; ngươi đã phạt hắn. `:"";if(roll(SRVA.frame.out)&&m.staff.includes(x)&&m!==S){asOut(x,"nvp")}return r}
  x.af[s.sid]=cl((x.af[s.sid]||0)+SRVA.frame.afL,-100,100);return""},
 learn(s,m,o,ok){return""},
 hail(s,m,o){s.mt[o.man.id]=(s.mt[o.man.id]||0)+SRVA.hail.af/2;return""},
 flirt(s,m,o,ok){if(ok)s.mt[o.man.id]=(s.mt[o.man.id]||0)+SRVA.flirt.tinh;if(roll(asRisk(s)/SRVA.flirt.seen))s.rumor=(s.rumor||0)+1;return""},
 token(s,m,o,ok){if(ok)s.mt[o.man.id]=(s.mt[o.man.id]||0)+SRVA.token.tinh;if(roll(asRisk(s)/SRVA.token.seen))s.rumor=(s.rumor||0)+1;return""},
 tryst(s,m,o,ok){const man=o.man;if(ok){s.mt[man.id]=(s.mt[man.id]||0)+SRVA.tryst.tinh;s.manLove=man.id;return""}return asCaught(s,m,man)},
 vow(s,m,o,ok){if(!ok)return"";if(o.man){s.vow=o.man.id;s.manLove=o.man.id;return""}const x=o.t;if(x&&!x.lover){s.lover=x.sid;x.lover=s.sid}return""}};
/* "Hẹn gặp riêng" caught: the player maid's own road for an NPC maid (was maidLoveMonth roll 4: expelled 30 / Tân Giả khố; the man exiled 35) */
function asCaught(s,m,man){const B=asB();asOut(s,roll(B.expel)?"expel":"tgk");if(man&&man.rw!=="vương gia"&&roll(B.exile))man.alive=false;
 const mine=isSrv()&&(m===srvM()||((S.srv.af||{})[s.sid]||0)>=30);const line=`${s.name}, cung nữ của ${NM(m)}, tư tình với ${man?man.name:"một nam nhân"} bị lộ: ${s.out==="expel"?"bị đuổi khỏi cung":"bị đày xuống Tân Giả khố"}${man&&!man.alive?"; hắn bị đày ra biên ải":""}. `;
 if(mine||m===S)return line;try{log(line)}catch(e){}return""}
/* "Quỳ dâng trà" where he passes (jagmaid amDo: ONE rule); choosing it is her seeking (jmline s.seek), so her master may notice */
function asEmpTea(s){const m=ownerOf(s);asC(s,"empTea");const T=S.turn||0;if(!s.seek)s.seek={from:T,until:T+BAL.mline.seekMonths,used:0};try{return amDo(s,m,"tea",odA(s,amTeaO(s,0)))||""}catch(e){console.error("jagstaff tea",e);return""}}
/* ---------- the choice: needs × traits (mindPick with jmind's slip) against keeping her routine ---------- */
function asDecide(s,N){N=N||asNeeds(s);const O=asOpts(s,N);if(!O.length)return null;const mw=(()=>{try{return typeof mindW==="function"?mindW(s,"social"):1}catch(e){return 1}})();
 const c=mindPick([["keep",BAL.ag.routine/BAL.ag.unit]].concat(O.map(o=>[o,o.u*BAL.ag.needW*mw])),s);return c==="keep"?null:c}
function asStaff(){const L=[];for(const p of consorts()){if(!p||!p.staff)continue;if(p!==S&&(!p.alive||p.out))continue;for(const s of p.staff)if(s&&s.sid!=null&&!s.out)L.push(s)}return L}
/* ---------- 5 DAY PLAN (OD 17/11 ~13:40Z): at the first buổi of each day every staff draws 4 slots {k, t, pl} by her needs (asDecide at
   plan time); each buổi she carries out her slot — the option is rebuilt with today's odds (same k and target); gone → she keeps her duties
   that buổi. Saved in S.agS (lazy; old saves load). Part A's jagday draws the consorts / Emperor / Thái hậu; staff plans are drawn here,
   right after it (one day key), and the providers stay registered for agOptsG (agReg "maid" / "srv"). ---------- */
function asSlot(c){return c?{k:c.k,t:c.t&&c.t.sid!=null?"s"+c.t.sid:c.t?(c.t===S?"me":c.t.id):c.man?"m"+c.man.id:null,pl:c.pl||null}:{k:null,pl:null}}
function asPlanDraw(){const D=S.agS={d:wk(),P:{}};const t0=performance.now();let n=0;
 for(const s of asStaff()){const L=[];for(let b=0;b<4;b++){let c=null;try{c=asDecide(s)}catch(e){console.error("jagstaff plan",e)}L.push(asSlot(c))}D.P[s.sid]=L;n++}
 ASN.plan=(ASN.plan||0)+1;ASN.planMs=(ASN.planMs||0)+performance.now()-t0;return n}
function asDo(s,sl){if(!sl||!sl.k)return"";const N=asNeeds(s);const O=asOpts(s,N);const c=O.find(o=>o.k===sl.k&&asSlot(o).t===sl.t)||O.find(o=>o.k===sl.k&&!sl.t);
 if(!c){ASN.miss=(ASN.miss||0)+1;return""}return c.run(s)||""}
function asTick(){if(!asOn())return"";const key=agKey();if(ASN.key===key)return"";ASN.key=key;ASN.tick++;const t0=performance.now();let ev="";
 try{if(!S.agS||S.agS.d!==wk())asPlanDraw();const b=Math.min(3,S.buoi||0);const P=S.agS.P;
  for(const s of asStaff()){let L=P[s.sid];if(!L){L=P[s.sid]=[0,1,2,3].map(()=>asSlot(asDecide(s)))}ev+=asDo(s,L[b])}}catch(e){console.error("jagstaff tick",e)}ASN.ms+=performance.now()-t0;
 if(ev)try{log(ev)}catch(e){}return ev}
/* ---------- the month: wage, secrets, betrayal found, grant, age (the player maid's rules) ---------- */
function asMonth(){if(!asOn())return"";let ev="";const B=asB();
 for(const p of consorts()){if(!p||!p.staff)continue;const sch=(p.schemes||0)>(p.schLast||0);
  for(const s of p.staff.slice()){if(s.sid==null)continue;asSt(s);asAp(s,{bac:CNV_WAGE[Math.min(CNV_WAGE.length-1,srk(s))]||1,suc:B.monthSuc});
   if(sch&&roll(B.secSee))s.sec=(s.sec||0)+1;/* she sees her master's schemes at home (the player maid's "Biết chuyện của chủ") */
   if(s.betray&&roll(nv(p,"betrayFind"))){s.betray=null;if(roll(SRVA.betray.kill)){asOut(s,"dead");if(asSee(p))ev+=`${p===S?"Ngươi":p.name} biết ${s.name} mật báo chuyện trong cung, sai đánh chết. `}else{asOut(s,"tgk");if(asSee(p))ev+=`${p===S?"Ngươi":p.name} biết ${s.name} mật báo, đày xuống Tân Giả khố. `}continue}
   /* Ban gả (j42 cnvGrant: the same trigger as the player maid's), then her own choice: Tạ ơn, xuất giá / Xin ở lại */
   if(s.role==="maid"&&(s.age||20)>=18&&(s.loyal>=55)&&srk(s)>=1&&roll(2+(s.vow?3:0))){const N=asNeeds(s);const c=mindPick([["stay",BAL.ag.routine/BAL.ag.unit],["wed",(N.love+(s.vow?B.vowW:0))*BAL.ag.needW]],s);asC(s,c==="wed"?"grantWed":"grantStay");
    if(c==="wed"){s.wed=1;asOut(s,"wed");const man=s.vow&&manById(s.vow);if(asSee(p))ev+=`${s.name}, cung nữ của ${NM(p)}, được chủ ban gả${man?" cho "+man.name:""}. `;continue}else s.loyal=cl(s.loyal-5,0,100)}
   /* Tuổi (j42 cnvAge, BAL.srvAge): Xuất cung / Ở lại làm ma ma (chưởng sự) / Xin chủ giữ lại */
   if(s.role==="maid"&&(s.age||0)>=BAL.srvAge.ask&&!s.ageDone){s.ageDone=1;const N=asNeeds(s);const O=[["out",(N.love+(s.vow?B.vowW:0)+B.outW)*BAL.ag.needW],["keep",s.loyal/100*BAL.ag.routine/BAL.ag.unit]];if(srk(s)>=3)O.push(["mama",(N.mp+N.bac+B.outW)*BAL.ag.needW]);
    const c=mindPick(O,s);asC(s,"age_"+c);if(c==="out"){asOut(s,"age");continue}if(c==="mama")s.mama=1}
   if(s.role==="maid"&&(s.age||0)>=(s.mama?BAL.srvAge.mama:BAL.srvAge.out)){asOut(s,"age");continue}}
  if(sch)p.schLast=p.schemes||0}
 return ev}
/* the master sees her maid seek his notice (jmline: the notice stays a witness roll; what she does is her choice) */
function asSeekReact(p,s,harsh){const B=BAL.mline;const O=[["none",BAL.ag.routine/BAL.ag.unit]];let spite=0;try{spite=amJealP(p)/100}catch(e){}
 if(harsh)O.push(["punish",spite*B.punish/BAL.ag.unit],["punOut",spite*B.punish*B.punOut/100/BAL.ag.unit]);
 if(mlLosing(p)&&(p.bac||0)>=B.useBac){let need=1;try{need=agNeedsC(p).sung||1}catch(e){}O.push(["use",need*B.use/BAL.ag.unit])}
 const c=mindPick(O,p)||"none";ASN.react=ASN.react||{};ASN.react[c]=(ASN.react[c]||0)+1;return c}
/* a consort and another palace's maid (jmline mlHit): her choice by her spite at that palace, not the monthly dice */
function asHitPick(p){if(p===S)return null;const t=pickTarget(p);if(!t||!(t.staff||[]).some(x=>x.role==="maid"))return null;const B=BAL.mline;let sp=0;try{sp=agSpite(p,t)/100}catch(e){sp=hostility(p,t)/100}
 const tr=typeof traitsOf==="function"?traitsOf(p):[p.trait];const cruel=tr.some(x=>x==="Xảo quyệt"||x==="Kiêu ngạo");let mw=1;try{mw=agMW(p,"scheme")}catch(e){}
 const O=[["none",BAL.ag.routine/BAL.ag.unit]];const u=sp*mw*BAL.ag.needW*asB().hit;
 if((p.bac||0)>=B.hitBribeBac)O.push(["bribe",u*B.hitBribe/100]);if(cruel)O.push(["beat",u*B.hitBeat/100]);O.push(["frame",u*(100-B.hitBribe)/100]);
 const c=mindPick(O,p);if(!c||c==="none")return null;ASN.hit=ASN.hit||{};ASN.hit[c]=(ASN.hit[c]||0)+1;return{t,k:c}}
/* ---------- wiring ---------- */
try{if(typeof agReg==="function"){agReg("maid","staff",(p,N)=>asOpts(p,N));agReg("srv","staff",(p,N)=>asOpts(p,N))}
 if(typeof agRegNeeds==="function"){agRegNeeds("maid",asNeeds);agRegNeeds("srv",asNeeds)}
 /* a household staff's group by her role (jagday reads .eunuch / .male; staff carry role "maid" / "eunuch") */
 if(typeof agGrp==="function"){const g0=agGrp;agGrp=function(p){if(p&&p.sid!=null&&p.role)return asGrp(p);return g0.apply(this,arguments)}}}catch(e){console.error("jagstaff reg",e)}
(function(){
 const pw0=placeWhere;placeWhere=function(){const r=pw0.apply(this,arguments);try{asTick()}catch(e){console.error("jagstaff pw",e)}return r};
 const sv0=servMonth;servMonth=function(){let r=sv0.apply(this,arguments)||"";try{r+=asMonth()}catch(e){console.error("jagstaff month",e)}return r};
 const aw0=amWeek;amWeek=function(){if(asOn())return"";return aw0.apply(this,arguments)};
})();
Object.assign(window,{asPlanDraw,asDo,asOn,asNeeds,asOpts,asDecide,asRun,asTick,asMonth,asSt,asSeekReact,asHitPick,asStaff,asGrp});
