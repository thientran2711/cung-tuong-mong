/* ================= jagharm: AG-ALL part C — the player's SCHEME / HARM acts as every consort's own options + AG-HAP ('!' from real deeds) =================
   Owner (verbatim, OD 17/11 ~13:20Z, L1588): "NPC sống tức là họ có thể có những cái option, có những cái nút chọn y chang tôi luôn mà."
   Owner (verbatim, OD 17/11 ~13:15Z, L1587): "cái dấu chấm than lấy từ chính hành động của nhân vật đi ... sẽ có những ngày rất là êm đềm ... sẽ có những cái
   ngày ... rất là nhiều việc xảy ra ... đi qua buổi khác người ta còn ở đó hay không cũng phụ thuộc vào chính cái nhân vật NPC đó, chứ không phải là phụ thuộc
   vào máy tung xúc xắc hay là bóc thăm."  Design: dev/handover/reports/ag-all.md §1d, §8, §9, §10 (part C).
   1. HARM OPTIONS. A consort's scheme options = the player's own rival-card acts (ACT, j8 + modules: Dò la, Tung tin đồn, Vu oan, Hạ độc, Tố giác, Mua chuộc
      cung nữ, Rút thẻ bài, Bỏ xạ hương, Mua chuộc bà đỡ, Phá việc học, Hạ độc con nàng, Đẩy con nàng xuống hồ, Vu con nàng trù ẻo, Xin bế con nàng về nuôi,
      Tố vượt phẩm, Cài đồ vào rương, Ngáng chân, Đẩy xuống hồ sen, Tặng quà ăn có độc, Trộm thú nuôi, …): every key the danger band of her toward the
      target allows (BANDS, j24 — the same ladder the player reads), whose own ok() passes, inside the motive gate (motiveOK, j95). Scored like every agent
      deed (jagent agU: her needs × the deed's gain × the act's OWN odds (ACT.o) × the target's watch (oSee: a caught try) − certain costs (ACT.c) − the fear
      of being caught (road.safe)), × her traits (persW) × jmind mindW("harm"), × what she learnt from her failures (v.fails, j40). Picked by mindPick (slip).
      It RUNS the act itself: mindRun → runAct → ACT[k].f (the player's cost, odds, effects; fails learnt; the victim's belief). A big scheme (j40 BIG) is
      prepared first, as before: her deed of that buổi is the preparation at its place (TELLS: the market, Thái y viện, the lotus pond, her own palace…),
      which sets v.plan and may leave a tell (mindTell); the plan falls due a few buổi later (j40 rivalsBuoi), guard and evidence unchanged.
      The old flat triggers that fired npcAct (j8 rivalsTurn want×.04, j9/j24 rivalsBuoi per-buổi chance, j51 rank ladder, j95 ambush j95dice(35),
      j95b rumour j95dice(30)) do nothing while the loop is on (counted in HA.stat.mute); BAL.ag.on=0 / window.__haOff=1 brings them back.
   2. PREPARATION. Taint: the player's "Tẩm đồ" (taintItem) on a sachet she holds — replaces npcMonthly roll(8); a tainted piece reaches a hated one
      by the harm path (pgift / plant). (Tặng quà to a friend / the Emperor / Thái hậu = part A, jagacts cx:gift.)
      Cook: a poisoner keeps a dish at hand by the player's own workshop act (wkMake) — replaces jpoison's roll(30).
   3. NIGHT STEALING (jsteal): whether she tries tonight is HER choice by mindPick between trying (stealWant: need × personality × relation × fear × odds)
      and letting it be (BAL.ag.harm.steal.no) — the 1 − e^(−k·want) try roll is gone while the loop is on.
   4. AG-HAP. agHap() replaces adHapRoll: the '!' of a place this buổi = a WITNESSABLE deed some agent planned there for a khắc still to come (a quarrel =
      provoke / humil whose target is a consort, gossip, a favour aimed at her (q72, the doer is the requester), a public scheme or show in a public place,
      the Emperor's garden walk from HIS record) + the fixed entries (AD_HAP_FIX: festival, the cold palace at night). No world-event '!' (owner OD 17/11 14:30Z): world events act through worldPlanW, not the map mark.
      No floor, no cap, no dice: a quiet buổi has none; a happening is still there next buổi only if the doer's plan keeps her there.
   Numbers: BAL.ag.harm (jbal2). No new UI: the '!' mark and the witness card are the existing kit (jact kitHapMark, jagent agScene / agReact).
   ============================================================================================================================================ */
const HA={stat:{opt:0,plan:0,land:0,prep:0,drop:0,mute:0,steal:0,stealNo:0,gift:0,taint:0,cook:0,by:{},hap:{n:0,by:{}}},hist:[]};
function haB(){return BAL.ag.harm}
function haOn(){try{return typeof agOn==="function"&&agOn()&&!!haB()&&!window.__haOff}catch(e){return false}}
/* the act functions that call caught() and with which guard (j8 ACT: caught(a,t,ps,…)); null = the act has no caught step */
const HA_CAUGHT={rumor:0,frame:0,block:0,ksab:0,kframe:0,poison:1,musk:1,kpoison:1,pond:1};
/* acts whose ok() needs the two in one place (j9 trip / pushp): checked when the deed lands, at its place and khắc */
const HA_TOG=new Set(["trip","pushp"]);
/* where the deed is done (who might see it): tgt = where the target is at that khắc, tpal = the target's palace, judge = the judge's palace,
   own = her own palace; a big scheme is PREPARED where its tell says (j40 TELLS) */
const HA_AT={tieuhuy:"tpal",trip:"tgt",pushp:"tgt",rumor:"vuon",spy:"tpal",block:"ksp",accuse:"judge",vp:"judge",xx:"judge",takeaway:"emp",bribe:"tpal",gift:"tpal",_:"tpal"};
const HA_PREP={musk:"nvp",poison:"tyv",kpoison:"tyv",pond:"vuon",pushp:"vuon",catswap:"own",kframe:"own",frame:"own",plant:"tpal"};
const HA_NO=new Set(["steal","road","gift","ally"]);/* not harm options here: steal / road at the flip (§3), gift / ally = part A (jagacts cx:gift / cx:ally) */
function haName(t){return t===S?"ngươi":t&&t.name||""}
function haVerb(k,t){const V=(typeof J78VERB==="object"&&J78VERB[k])||((ACT[k]&&ACT[k].n||k).toLowerCase()+" {t}");return V.replace("{t}",haName(t))}
/* the player's cheaper ways of the same act (jecon / jlost: by her own trusted maid or a favour owed, no silver): open where the base act is open */
const HA_VAR={spyk:"spy",bribel:"bribe",blockf:"block",laydol:"laydo"};
function haGain(k){const G=haB().g;return G[k]||G[HA_VAR[k]]||G._}
function haPlace(k,v,t,kh,prep){let w=prep?(HA_PREP[k]||"own"):(HA_AT[k]||HA_AT._);
 if(w==="own")return palaceOf(v);if(w==="tpal")return t===S?"home":palaceOf(t);if(w==="tgt"){const p=agAt(t,kh);return k==="pushp"&&p!=="vuon"?null:p}
 if(w==="emp")return agEmpAt(kh);
 if(w==="judge"){try{const j=judgeName(t);if(/Hoàng hậu|ngươi \(Hoàng hậu\)/.test(j)){const q=queenP();return q===S?"home":q?palaceOf(q):agEmpAt(kh)}}catch(e){}return agEmpAt(kh)}
 return w}
function haPlantIx(v){return (v.inv||[]).findIndex(e=>e&&!e.h&&(e.t||(IT[e.k]&&itm(e.k).il)))}
/* her guess of the act's chance: its own odds (ACT.o, null = no roll) × not being caught (the target's watch oSee) */
function haOdds(v,t,k){const A=ACT[k];let o=null;try{o=A.o?A.o(v,t):null}catch(e){o=null}if(o==null)o=100;let pc=0;
 if(HA_CAUGHT[k]!=null){try{pc=caughtOdds(v,t,!!HA_CAUGHT[k])/100}catch(e){pc=0}}return{o:o*(1-pc),pc}}
function haCost(k){const c=ACT[k]&&ACT[k].c;return c&&typeof c==="object"?c:{}}
function haFail(v,k){const f=(v.fails||{})[k]||0;if(!f)return 1;return witOf(v)<35?1+haB().fail.fool*f:Math.pow(haB().fail.wise,f)}
/* ---------- the options (agent provider "consort"/"harm") ---------- */
function haTargets(v){return others(v).filter(x=>x&&x!==v&&(x===S?!S.dead&&!S.out:x.alive!==false&&!x.out)&&!sameHouse(v,x))}
/* the old npcAct wrappers' leanings, now weights of her choice (no roll): the holder of the seat she wants next (j30, was roll(45)); a target who
   keeps her doors shut (jts guard, was roll(50)); her own punishment (jface pen, was roll(50)) */
function haSeatW(v,x){try{const nx=rkOf(v)+1;return rkOf(x)===nx&&SEATCAP[nx]!=null&&!seatFree(nx)?haB().tw.seat:1}catch(e){return 1}}
function haGuardW(x){try{const g=x===S?tsS().guard:x&&x.tsGuard;return g>wk()?haB().guard:1}catch(e){return 1}}
function haPenW(v){return v&&v.pen&&v.pen.until>wk()?haB().pen:1}
function haScoreT(v,x,need){return haScoreT0(v,x,need)*haSeatW(v,x)*haGuardW(x)}
function haScoreT0(v,x,need){const B=haB().tw;if(need==="sung")return BAL.mind.pick.ag.base+(x.sung||0)*B.sung+agSpite(v,x);if(need==="kid")return BAL.mind.pick.ag.base+kidsOf(x).length*B.kid;
 if(need==="safe")return BAL.mind.pick.ag.base+danger(x,v);return BAL.mind.pick.ag.base+agSpite(v,x)}
/* perf (budget BAL.ag.perf): her scheme options are weighed once per day, need and what she did since (like jagent agSocT); the day draw asks
   for every buổi of her plan, the landing asks again */
function haOpts(v,N,need){if(!v||v===S)return[];const C=HA.oc=HA.oc||{};const k=v.id+":"+(need||"")+":"+wk()+":"+(((AG.na||{})[v.id])||0)+":"+(v.plan?1:0);
 const c=C[k];if(c&&c.b===(S.buoi||0)>>8)return c.O.filter(o=>!o.t||o.t===S||o.t.alive!==false&&!o.t.out);const O=haOpts0(v,N,need);C[k]={b:0,O};
 if(Object.keys(C).length>400)HA.oc={};return O}
function haOpts0(v,N,need){const O=[];if(!haOn()||v===S||v.coop||v.confined)return O;const H=haB();if(need&&!H.needs.includes(need))return O;
 const road=BAL.ag.road[agOrg(v)]||BAL.ag.road._;
 /* her scheme on one person (she waits for a big scheme already in hand: v.plan) */
 const C=v.plan?[]:haTargets(v).filter(x=>bandOf(danger(v,x))>=1);const t=C.length?mindPickBy(C,x=>haScoreT(v,x,need),v):null;const g=t?motiveOK(v,t,"frame"):{ok:false};
 const N2=Object.assign({},N);if(t)N2.spite=agSpN(agSpite(v,t),haB().spiteD)*road.spite;
 if(t&&g.ok){const allow=new Set(BANDS.slice(1,bandOf(danger(v,t))+1).flatMap(x=>x[2]));
  for(const vk in HA_VAR)if(allow.has(HA_VAR[vk]))allow.add(vk);
  for(const k of allow){if(HA_NO.has(k))continue;const A=ACT[k];if(!A)continue;const gn=haGain(k);if(need&&gn.g[need]==null)continue;
   if(!HA_TOG.has(k)){let ok=false;try{ok=A.ok(v,t)}catch(e){}if(!ok)continue}
   if(k==="plant"&&haPlantIx(v)<0)continue;
   const prep=BIG.includes(k);const {o,pc}=haOdds(v,t,k);
   const gl={g:gn.g,l:gn.l||{},f:(gn.f||0)*pc};const u0=agU(v,N2,o,gl,haCost(k),"harm");if(u0<=0)continue;
   const u=u0*persW(v,k)*haFail(v,k)*haGuardW(t)*haPenW(v);if(!(u>0))continue;HA.stat.opt++;
   O.push({k:"harm:"+k,ak:k,t,u,tag:"harm",prep,mot:g.why,act:prep?((typeof TELLS==="object"&&TELLS[k])||("chuẩn bị "+haVerb(k,t))):haVerb(k,t),
    at:(kh,vv,tt)=>haPlace(k,vv||v,tt||t,kh,prep)})}
  /* §2 preparation of a poisoner / framer (the player's own Tẩm đồ and workshop): it serves the spite the next deed will vent */
  if((!need||need==="spite")&&N2.spite>0){
   const ti=(v.inv||[]).findIndex(e=>e&&!e.h&&!e.t&&(e.k==="tuithom"||e.k==="huongtram"));
   if(!(v.inv||[]).some(e=>e&&e.t)&&haPlantIx(v)<0){const tk=(v.inv||[]).some(e=>e&&e.k==="xahuong"&&!e.h)?"xa":"bua";const T=TAINT[tk];
    const pay=(ti<0?itm("tuithom").pr:0)+(T&&T.c||0);if(T&&(v.bac||0)>=pay){const u=agU(v,N2,100,{g:{spite:H.prep.taint}},{bac:-pay},"scheme")*persW(v,"plant");
     if(u>0)O.push({k:"harm:taint",ak:"taint",t,u,tag:"scheme",act:"lén tẩm đồ trong cung",at:(kh,vv)=>palaceOf(vv||v)})}}
   if(typeof pgHeld==="function"&&pgHeld(v).length&&!(v.inv||[]).some(e=>typeof pgFood==="function"&&pgFood(e))){const u=agU(v,N2,100,{g:{spite:H.prep.cook}},{},"scheme");
    if(u>0)O.push({k:"harm:cook",ak:"cook",t,u,tag:"scheme",act:"tự tay nấu một món",at:(kh,vv)=>palaceOf(vv||v)})}}}
 /* Trả chứng cứ lấy lòng (j78 tieuhuy): she hands back what she holds on someone she fears, to buy peace (need safe / ally) */
 if((!need||need==="safe"||need==="ally")&&ACT.tieuhuy){const E=haTargets(v).filter(x=>{try{return evG(v,x)>=1&&ACT.tieuhuy.ok(v,x)}catch(e){return false}});
  const x=E.length?mindPickBy(E,y=>BAL.mind.pick.ag.base+danger(y,v),v):null;
  if(x&&motiveOK(v,x,"tieuhuy").ok){const gn=haGain("tieuhuy");const N3=Object.assign({},N);N3.safe=Math.max(N.safe||0,cl(danger(x,v)/100,0,1)*road.safe);
   const u=agU(v,N3,100,{g:gn.g,l:gn.l||{}},{},"help");if(u>0&&(!need||gn.g[need]!=null))O.push({k:"harm:tieuhuy",ak:"tieuhuy",t:x,u,tag:"help",act:haVerb("tieuhuy",x),at:(kh,vv,tt)=>haPlace("tieuhuy",vv||v,tt||x,kh,false)})}}
 return O}
/* ---------- the deed lands: the player's own act function ---------- */
function haLand(p,seen){const z=agZ();const i=z.pend.indexOf(p);if(i>=0)z.pend.splice(i,1);const v=RV(p.vid);
 if(!v||!v.alive||v.out||S.dead||p.gone||p.drop){HA.stat.drop++;AG.stat.drop++;return""}
 const k=p.k.slice(5),t=agPerson(p.t);let r="";AG.inTick++;
 try{if(k==="taint"){let ix=(v.inv||[]).findIndex(e=>e&&!e.h&&!e.t&&(e.k==="tuithom"||e.k==="huongtram"));if(ix<0&&v.bac>=itm("tuithom").pr){buy(v,"tuithom");ix=v.inv.length-1}
   const tk=(v.inv||[]).some(e=>e&&e.k==="xahuong"&&!e.h)?"xa":"bua";if(ix>=0){taintItem(v,ix,tk);HA.stat.taint++}}
  else if(k==="cook"){if(typeof wkMake==="function"){v.inv.push(wkMake(v,"mon",0,typeof wkNpcRaw==="function"?wkNpcRaw(v,"mon"):0));HA.stat.cook++}}
  else if(t&&ACT[k]){/* an act done face to face (Ngáng chân, Đẩy xuống hồ sen): both stand at its place at its khắc in the record (the khắc, not the buổi's rough place) */
   if(HA_TOG.has(k)&&agAt(t,p.kh)===p.pl)HA.here={[v.id]:p.pl,[t===S?"me":t.id]:p.pl};
   let ok=false;try{ok=ACT[k].ok(v,t)}catch(e){}
   if(!ok||(t!==S&&(!t.alive||t.out))){HA.stat.drop++}
   else if(p.prep&&BIG.includes(k)){if(!v.plan){const tc=witOf(v);const pat=tc>=haB().pat[1]?2:tc>=haB().pat[0]?1:0;v.plan={k,t:key(t),due:bq()+haB().due+pat,err:0,ag:1};HA.stat.prep++;try{persCount(v,k)}catch(e){}mindTell(v,t,k)}}
   else{try{persCount(v,k)}catch(e){}r=mindRun(v,t,k,0)||""}}}
 catch(e){agErr("harmLand",e)}finally{AG.inTick--;HA.here=null}
 try{if(r&&t&&k!=="taint"&&k!=="cook")agVentH(v,t,k)}catch(e){}
 HA.stat.land++;AG.stat.land++;AG.na=AG.na||{};AG.na[v.id]=(AG.na[v.id]||0)+1;
 try{if(r&&!seen){const s=seenNPC(v,t,r);if(s)log(s.trim())}}catch(e){}
 return r}
/* a scheme that landed vents her spite toward the target (the same memory as jagent's spite deeds: BAL.ag.vent), points = the act's spite gain */
function agVentH(v,t,k){const pts=(haGain(k).g||{}).spite;if(!(pts>0))return;v.ag=v.ag||{};const V=v.ag.vent=v.ag.vent||{};const kk=key(t);V[kk]=[wk(),agVentM(V[kk])+pts]}
/* what she sees when she stands there (the existing witness card + reactions, jagent agReact: Nghe lén gives evidence on a scheme) */
function haScene(p,v){const t=agPerson(p.t);const W=agPlaceTxt(p.pl);
 Q.push({t:"Ngươi bắt gặp",who:pv(v),h:`<p>Ở ${W}, ngươi thấy ${v.name} ${p.prep?"":"đang "}${p.act}.</p>`,opts:agReact(p,v,t)})}

/* ---------- §3 night stealing: her choice, not a try roll ---------- */
function haStealTry(v,t,w){if(!haOn())return Math.random()<w.p;const c=mindPick([[1,w.u],[0,haB().steal.no]],v);const z=agZ();
 const L={w:wk(),b:S.buoi||0,kh:agKh(),id:"v"+v.id,k:c===1?"harm:"+w.mode:"harm:steal_no",t:ledgerId(t),pl:palaceOf(v),why:c===1?AGWHY.sung:""};
 if(c===1){HA.stat.steal++;z.log.push(L);if(z.log.length>60)z.log.shift()}else HA.stat.stealNo++;return c===1}
window.haStealTry=haStealTry;

/* ---------- §4 AG-HAP: the '!' list of this buổi from the agents' planned deeds ---------- */
function haHapDeeds(){const z=agZ();const key=agKey();const kh0=agKh();const W=new Set(haB().hap.wit);const out=[];
 for(const p of z.pend){if(p.key!==key||agK1(p)<kh0||p.gone||p.drop||p.seen)continue;const t=agPerson(p.t);
  const fav=t===S&&["help","visit","follow","warn"].includes(p.k);/* a kindness aimed at her: the doer comes with a request (q72) */
  if(!fav&&!W.has(p.k))continue;
  if(haB().hap.pub[p.k]&&!haB().hap.pub[p.k].includes(p.pl))continue;/* a show is seen only in its public place */
  let id="deed";if(fav)id="favour";else if((p.k==="provoke"||p.k==="humil")&&t&&t!==S)id="quarrel";/* F5: two consorts quarrelling wherever the doer finds her (the garden card when in the garden, else the witness card) */else if(p.k==="gossip")id="gossip";
  out.push({p,id})}
 return out}
function agHap(){const L=[],W=S.where||{};const used=new Set();const add=(k,id,x,share)=>{if(!k||(!share&&used.has(k+":"+id))||!adOpenOk(k))return false;used.add(k+":"+id);L.push({k,id,x:x||null,done:0});return true};
 /* the Emperor's walk: his own record (jagemp / the day plan) has him in the garden at a khắc still to come this buổi */
 try{const R=agRec(),kh0=agKh();if(R&&R.P.emp){for(let kh=kh0;kh<J95.KH;kh++)if(R.P.emp[kh]&&R.P.emp[kh][0]==="vuon"){add("vuon","emp");break}}else if(W.emp==="vuon")add("vuon","emp")}catch(e){}
 for(const f of AD_HAP_FIX){try{const h=f();if(h)add(h.k,h.id,h.x,1)}catch(e){console.error("jact fix",e)}}
 for(const {p,id} of haHapDeeds()){const x={pid:p.vid+":"+p.k+":"+p.kh,vid:p.vid,t:p.t};
  if(id==="favour"){try{if(!(typeof q72CanOffer==="function"&&q72CanOffer()))continue;const v=RV(p.vid);const rq=q72A(v.queen?"hh":"rv",v.id);const q=q72Choose(q72Cands(),null,rq);if(!q)continue;x.q=q}catch(e){continue}}
  add(p.pl,id,x)}
 return L}
function haPend(x){if(!x)return null;const z=agZ();return z.pend.find(p=>p.vid===x.vid&&(p.vid+":"+p.k+":"+p.kh)===x.pid&&!p.gone&&!p.drop)||null}
function haHapFire(h,k){const x=h.x;const p=haPend(x);if(!p)return false;const v=RV(p.vid);if(!v||!v.alive)return false;p.seen=1;HA.stat.hap.n++;HA.stat.hap.by[h.id]=(HA.stat.hap.by[h.id]||0)+1;
 if(h.id==="quarrel"){const b=agPerson(p.t);let d=null;try{d=b&&p.pl==="vuon"?mkP("rvquarrel",{a:v.id,b:b.id}):null}catch(e){d=null}
  if(d){agLand(p,true);pushDil(d,AD_HAP_T.quarrel);return true}agScene(p,v);return true}/* the quarrel card is resting (seen lately): the witness card of the same deed */
 if(h.id==="gossip"){const r=agLand(p,true);let f="";try{f=typeof intelLearn==="function"?intelLearn(v,1,{by:"ngươi",how:"Nghe lỏm"}):""}catch(e){}if(!f){try{f=overhear(k)}catch(e){}}
  pushModal({t:AD_HAP_T.gossip,who:pv(v),h:`<p>Đi ngang hành lang, ngươi nghe ${v.name} to nhỏ với người bên cạnh.</p><p>${f||r||"Chỉ là chuyện vặt, không có gì đáng nhớ."}</p>`});return true}
 if(h.id==="favour"&&x.q){try{if(q72X(x.q)&&q72CanOffer()){q72().a.push(x.q);const ok=q72Offer(x.q,"meet");if(!ok){const q=q72();q.a.splice(q.a.indexOf(x.q),1)}else{agLand(p,true);return true}}}catch(e){console.error(e)}return false}
 /* any other witnessable deed: the witness card of that real deed (jagent agScene / haScene) */
 agScene(p,v);return true}
for(const id of ["quarrel","gossip","favour","deed"])AD_HAP_FIRE[id]=(function(id0){const f0=AD_HAP_FIRE[id0];return(h,k)=>{if(h&&h.x&&h.x.pid)return haHapFire(h,k);return f0?f0(h,k):false}})(id);
AD_HAP_T.deed="Có chuyện";

/* ---------- wiring ---------- */
(function(){
 /* the deeds' ledger labels (dev table, tai mắt lines) */
 try{for(const k in ACT){ACT95["ag_harm:"+k]=haVerb(k,null).replace(/\s+$/,"");AGHOST.add("harm:"+k)}ACT95["ag_harm:taint"]="lén tẩm đồ";ACT95["ag_harm:cook"]="tự tay nấu món";AGHOST.delete("harm:spy");AGHOST.delete("harm:spyk");AGHOST.delete("harm:tieuhuy")}catch(e){}
 /* provider: through the AG-ALL core when present (jagday agReg), else beside jagent's own options */
 if(typeof agReg==="function"){try{agReg("consort","harm",(p,N,need)=>haOpts(p,N,need))}catch(e){agErr("harmReg",e)}}
 else{const o0=agOpts;agOpts=function(v,N,need){const O=o0.apply(this,arguments);try{if(haOn())for(const o of haOpts(v,N,need))O.push(o)}catch(e){agErr("harm",e)}return O}}
 const l0=agLand0;agLand0=function(p,seen){if(p&&typeof p.k==="string"&&p.k.indexOf("harm:")===0)return haLand(p,seen);return l0.apply(this,arguments)};
 const s0=agScene;agScene=function(p,v){if(p&&typeof p.k==="string"&&p.k.indexOf("harm:")===0)return haScene(p,v);return s0.apply(this,arguments)};
 /* agPlan keeps prep / act key on the pending deed */
 const p0=agPlan;agPlan=function(v,c,N,kh,k){const r=p0.apply(this,arguments);try{if(c&&typeof c.k==="string"&&c.k.indexOf("harm:")===0){const z=agZ();const p=z.pend[z.pend.length-1];if(p&&p.vid===v.id){if(c.prep)p.prep=1;HA.stat.plan++;HA.stat.by[c.k]=(HA.stat.by[c.k]||0)+1}}}catch(e){}return r};
 /* one path per deed: the old flat triggers of npcAct do nothing for NPC doers while the loop is on */
 const w0=whereOf;whereOf=function(p){const H=HA.here;if(H&&p){const x=H[p===S?"me":p.id];if(x!=null)return x}return w0.apply(this,arguments)};
 const n0=npcAct;npcAct=function(v,t){try{if(haOn()&&v&&v!==S){HA.stat.mute++;return""}}catch(e){}return n0.apply(this,arguments)};
 /* npcMonthly gift roll(10) / taint roll(8) (j8) and jpoison cook roll(30): guarded at their own lines by haOn() (her deeds now, §2) */
 /* AG-HAP: the '!' come from the agents' deeds (§4); the cache per buổi is gone (the list follows the plans as they are made) */
 const h0=adHapRoll;adHapRoll=function(){if(!haOn())return h0.apply(this,arguments);try{return agHap()}catch(e){agErr("hap",e);return[]}};
 const n1=adHapNow;adHapNow=function(){if(!haOn())return n1.apply(this,arguments);if(!S||S.dead||adSrv()||S.out)return[];let b="";try{b=bkey()}catch(e){return[]}
  const D=S.adHapD&&S.adHapD.b===b?S.adHapD:(S.adHapD={b,d:{}});let L=[];try{L=agHap()}catch(e){agErr("hap",e)}for(const h of L){const kk=h.k+":"+h.id+":"+(h.x&&h.x.pid||"");h.kk=kk;if(D.d[kk])h.done=1}
  S.adHap={b,L};const n=L.filter(h=>!h.done).length;const hk=b;if(HA.hk!==hk){HA.hk=hk;HA.hist.push(n);if(HA.hist.length>2000)HA.hist.shift()}return L};
 const f1=adHapFire1;adHapFire1=function(h,k){if(haOn()&&h){try{const D=S.adHapD;if(D&&h.kk)D.d[h.kk]=1}catch(e){}}return f1.apply(this,arguments)};
})();
Object.assign(window,{HA,HA_VAR,haOpts,haLand,agHap,haOn});
