/* ================= jtruth: TRUE EVIDENCE (owner 15/11: "Chứng cứ thu thập này là chứng cứ gì? Tôi có làm gì sai đâu …") =================
   Rule: evidence is proof of something the person REALLY did. Same rule for the player and every consort (NPC-vs-NPC too).
   1. DEEDS LEDGER, per person: p.wrongs=[{k,t,w,at,x}] (last 30 shown) + p.dw (total weight, never trimmed) + p.dkeys (derived facts
      already written). deedAdd(p,k,t) records a wrong when it is done: every harmful act through runAct (DEEDW), a plot begun (j40 / j70),
      bribing or threatening a servant, buying contraband, flirting with / taking gifts from a man. deedSync(p) writes the wrongs the world
      already shows: hidden trysts / affair, her own contraband, over-rank dress, a pregnancy that does not match Kính sự phòng.
      Old saves: the old scheme counter (p.schemes) beyond the recorded deeds counts as "từng bày mưu hại người".
   2. evA (j8) adds at most deedCap(t) − what that holder already has: against someone who did nothing, nothing is found. It returns
      the amount really added; every message that says "chứng cứ +N" reads that return (scan: dev/test/evtruth-scan.py).
   3. SPYING (Dò la, Tự đi dò la, NPC alike): spyFind → a real unproven deed, else "không tìm ra điều gì sai trái" + harmless knowledge
      (giờ giấc, sở thích, ai lui tới) that helps the spy's next scheme on that person (BAL.truth.spyKnowB for spyKnowW weeks, odA).
   4. RUMOURS (tin đồn): evidence with no deed behind it (old saves, or any write that bypassed evA) is moved, not deleted, into
      t.evR (held by the player) / h.evr[key] (held by a consort): shown in the evidence card and the intel line, never counts as proof.
   5. FRAMES are the only road to a false charge (Vu oan, Cài đồ → bùa found, Giá họa j92): framed() now gives the victim a defence
      (Kính sự phòng record, a witness, Thái y, evidence on the framer, Cung Chính ti). Cleared → the framer is exposed: Đức −, Danh −,
      punished, and the victim holds 2 true pieces on her. The player chooses her defence (PEND.vuoan, like PEND.wdframe).
   ============================================================================================================= */
const DEEDW={poison:2,kpoison:2,slowpoison:2,pgift:2,musk:2,catswap:2,pond:2,pushp:2,kframe:2,frame:2,giahoa:2,plant:2,huydung:2,thathu:2,phonghoa:2,ksab:2,
 rumor:1,trip:1,lygian:1,bribe:1,block:1,blockf:1,steal:1,uyhiep:1,batnat:1,petsteal:1,thaopet:1};
const DEEDX={plot:"bày mưu hại người",sbribe:"mua chuộc người hầu của người khác",sthreat:"dọa người hầu của người khác",illbuy:"lén mua đồ cấm",
 flirt:"liếc mắt đưa tình với nam nhân",mangift:"lén nhận quà của nam nhân",story:"việc xấu trong quá khứ",old:"từng bày mưu hại người"};
function deedTxt(k,t){try{if(ACT[k]&&t)return j78act(k,t)}catch(e){}return DEEDX[k]||(ACT[k]?ACT[k].n.toLowerCase():"việc sai trái")}
function deedAdd(p,k,t,w,x){if(!p||!S)return null;const d={k,t:t?key(t):null,w:w||DEEDW[k]||1,at:wk(),x:x||deedTxt(k,t)};p.wrongs=p.wrongs||[];p.wrongs.push(d);if(p.wrongs.length>30)p.wrongs.shift();p.dw=(p.dw||0)+d.w;return d}
function deedUndo(p,d){if(!p||!d)return;const i=(p.wrongs||[]).indexOf(d);if(i>=0){p.wrongs.splice(i,1);p.dw=Math.max(0,(p.dw||0)-d.w)}}
function deedOnce(p,id,k,w,x){p.dkeys=p.dkeys||[];if(p.dkeys.includes(id))return;p.dkeys.push(id);if(p.dkeys.length>60)p.dkeys.shift();deedAdd(p,k,null,w,x)}
/* the wrongs the world already shows, written into the ledger once (so the cap never drops when the thing is hidden again) */
function deedSync(p){if(!p||!S)return;try{
 if(p===S){const n=Math.min(3,(S.men||[]).reduce((a,m)=>a+(m.trysts||0),0));for(let i=1;i<=n;i++)deedOnce(p,"tr:"+i,"tryst",2,"tư thông với nam nhân")}
 else{if(p.scandal)deedOnce(p,"sc","tryst",2,"tư thông");if(p.affair){let m=null;try{m=manById(p.affair)}catch(e){}deedOnce(p,"af:"+p.affair,"tryst",2,`tư thông${m?" với "+m.name:""}`)}}
 if(p.pregMismatch)deedOnce(p,"pm:"+((p.kids||[]).length),"pm",2,"có thai không khớp đêm thị tẩm nào trong sổ Kính sự phòng");
 for(const e of (p.inv||[])){if(!e||!IT[e.k])continue;const planted=(e.by&&e.by!==key(p))||e.gh;if(planted)continue;if(itm(e.k).il)deedOnce(p,"il:"+e.k,"il",1,`giấu đồ cấm (${(IT[e.k]||{}).n}) trong rương`)}
 if(typeof vpItems==="function")for(const e of vpItems(p))deedOnce(p,"vp:"+e.k,"vp",1,`dùng đồ vượt phẩm (${itm(e.k).n})`);
 if(p!==S&&p.plan&&p.plan.k){const t=byKey(p.plan.t);deedOnce(p,p.plan.j70?"pl:j70:"+p.plan.j70:"pl:"+p.plan.k+":"+p.plan.t+":"+p.plan.due,"plot",1,`bày mưu ${deedTxt(p.plan.k,t)}`)}
}catch(e){}}
/* how much true evidence can exist against p (each holder separately) */
function deedCap(p){if(!p)return 0;deedSync(p);const s=(p.dws||0);return (p.dw||0)+Math.max(0,(p.schemes||0)-s)*2}
function deedsOf(p){if(!p)return[];deedSync(p);const L=(p.wrongs||[]).slice();const old=Math.max(0,(p.schemes||0)-(p.dws||0));for(let i=0;i<old;i++)L.unshift({k:"old",w:2,x:DEEDX.old,at:null});return L}
/* evidence that was asked for but had no deed behind it (test counters only; never saved) */
function evMiss(h,t,n){try{window.__evMiss=(window.__evMiss||0)+n;if(t===S)window.__evMissMe=(window.__evMissMe||0)+n}catch(e){}}
/* rumours: weak, never proof */
function rumG(h,t){if(!h||!t)return 0;return h===S?(t.evR||0):((h.evr||{})[key(t)]||0)}
function rumA(h,t,n){if(!h||!t||h===t||!n)return;if(h===S)t.evR=Math.max(0,(t.evR||0)+n);else{h.evr=h.evr||{};const k=key(t);h.evr[k]=Math.max(0,(h.evr[k]||0)+n)}}
/* every holder → target: evidence above the target's real wrongs becomes rumour (old saves at load; any bypassing write after) */
function evTruthSweep(){if(!S||!rivals)return 0;let moved=0;const P=[S].concat(rivals.filter(v=>v));
 for(const t of P){if(t!==S&&!t.alive&&!t.out)continue;const cap=deedCap(t);
  for(const h of P){if(h===t)continue;const g=evG(h,t);if(g>cap){const x=g-cap;if(h===/*evok: sweep*/S)t.ev=cap;else h.evm[key(t)]=cap;rumA(h,t,x);moved+=x}}}
 if(moved)try{window.__evSwept=(window.__evSwept||0)+moved}catch(e){}return moved}
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(S&&rivals&&!S.dead){if(!S.truthV){/* first load of an old save */for(const p of [S].concat(rivals))deedSync(p);S.truthV=1}evTruthSweep()}}catch(e){console.error("truth load",e)}return r}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){S.truthV=1;evTruthSweep()}}catch(e){}return r}})();
/* new lives start already "swept" */
(function(){if(typeof start!=="function")return;const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S)S.truthV=1}catch(e){}return r}})();

/* ---------- 1. record deeds where they are done ---------- */
(function(){const r0=runAct;runAct=function(a,t,k){const w=DEEDW[k];if(!w||!a||!t||a===t)return r0.apply(this,arguments);
 const s0=a.schemes||0;const d=deedAdd(a,k,t,w);let r="";try{r=r0.apply(this,arguments)}catch(e){deedUndo(a,d);throw e}
 if(!r)deedUndo(a,d);else if((a.schemes||0)>s0){a.dws=(a.dws||0)+1}return r}})();
(function(){if(typeof newPlot70!=="function")return;const n0=newPlot70;newPlot70=function(a,t,m){let d=null;try{const z=j70();const k=M70[m]?M70[m].k:"";
  if(a&&t){const id=((z&&z.n)||0)+1;a.dkeys=a.dkeys||[];a.dkeys.push("pl:j70:"+id);d=deedAdd(a,"plot",t,1,`bày mưu ${deedTxt(k,t)}`)}}catch(e){}
 const p=n0.apply(this,arguments);if(!p&&d)deedUndo(a,d);return p}})();
(function(){for(const [fn,k] of [["bribeServ","sbribe"],["plantServ","sbribe"],["threatServ","sthreat"]]){const f0=window[fn];if(typeof f0!=="function")continue;
 window[fn]=function(a,x){const t=fn==="plantServ"?x:(typeof ownerOf==="function"?ownerOf(x):null);const d=deedAdd(a,k,null,1,t?`${DEEDX[k].replace(/ của người khác$/,"")} của ${j78who(t)}`:DEEDX[k]);const r=f0.apply(this,arguments);if(!r)deedUndo(a,d);return r}}})();
(function(){if(typeof illBuy!=="function")return;const i0=illBuy;illBuy=function(p,r,k){const d=deedAdd(p,"illbuy",null,1,`lén mua ${IT[k]?itm(k).n:"đồ cấm"}`);const x=i0.apply(this,arguments);if(!x)deedUndo(p,d);return x}})();

/* ---------- 2. picking whom a piece of evidence is about: only someone with an unproven wrong ---------- */
function evRoom(h,t){return t&&h!==t?Math.max(0,deedCap(t)-evG(h,t)):0}
function evGuilty(h,pool){const L=(pool||[]).filter(v=>v&&evRoom(h,v)>0);return L.length?pick(L):null}
/* the newest wrong of t that holder h does not already hold proof of (for the line the player reads) */
function deedFor(h,t){const L=deedsOf(t);const g=evG(h,t);let acc=0;for(const d of L){acc+=d.w;if(acc>g)return d}return L[L.length-1]||null}
function deedLine(t,d){if(!d)return"";const who=t===S?"ngươi":t.name;return `${who} ${d.x}`}
/* harmless knowledge a spy brings back from someone who did nothing wrong */
function harmTxt(t){const W=t===S?"ngươi":t.name;return pick([`giờ giấc đi lại của ${W}`,`những món ${W} ưa dùng`,`ai hay lui tới cung ${W}`,`giờ ${W} đi thỉnh an`,`${W} hay dạo ở đâu lúc rảnh`])}
function spyKnowB(a,t){try{const T=BAL.truth;const w=((a.know||{})[key(t)]);return w!=null&&wk()-w<=T.spyKnowW?T.spyKnowB:0}catch(e){return 0}}
function spyKnow(a,t){a.know=a.know||{};a.know[key(t)]=wk();const ks=Object.keys(a.know);if(ks.length>12)delete a.know[ks[0]]}
/* one spying attempt that succeeded: returns the act line (who · what · result); ev:true when real proof was found */
function spyFind(a,t,verb){verb=verb||"dò la";const d0=deedFor(a,t);const n=evA(a,t,1);
 if(n>0){const d=d0;if(t===S)return `${NMc(a)} ${verb} ngươi: <span class="r">nắm được chuyện ngươi ${d?d.x:"từng làm điều sai trái"}</span>. `;
  if(a===S)return `Ngươi ${verb} ${t.name}: <span class="g">tìm ra chuyện nàng ${d?d.x:"từng làm điều sai trái"}, thêm một chứng cứ</span>. `;
  return `${a.name} ${verb} ${t.name}: nắm được một chuyện sai trái của nàng. `}
 spyKnow(a,t);const h=harmTxt(t);return `${NMc(a)} ${verb} ${NM(t)}: không tìm ra điều gì sai trái; chỉ biết ${h}. `}

/* ---------- 3. frames: the victim's defence ---------- */
function frameDef(p,a){const T=BAL.truth;const base=T.clearBase+(p.mat||0)*T.clearMat;const C=[];const W=p===S?"ngươi":"nàng";
 /* one road, the best she has: the player also picks ONE road in PEND.vuoan (reviewer r1: NPC bonuses used to stack to 85 every time) */
 if((p.nightLog||[]).some(w=>wk()-w<=T.ksW))C.push({o:base+T.ksB,how:`sổ Kính sự phòng ghi đêm ấy ${W} hầu Hoàng thượng`});
 else C.push({o:base-10,how:"Cung Chính ti tra hỏi người ra vào"});
 if(p.maid&&(p.maid.loyal||0)>=BAL.loy.close)C.push({o:base+T.wB,how:`cung nữ ${p.maid.name} làm chứng ${W} không rời cung`});
 if(p.doctor||((p.arts&&p.arts.y)||0)>=3)C.push({o:base+T.tyB,how:`Thái y nghiệm ra hình nhân còn mới, kim chỉ không phải của cung ${W}`});
 if(evG(p,a)>0)C.push({o:base+T.evB*2+10,how:`${W} trình chứng cứ về ${a.name}`});
 const D=C.sort((x,y)=>y.o-x.o)[0];return {o:cl(Math.round(D.o),T.clearMin,T.clearMax),how:D.how}}
/* the framer exposed: same for everyone */
function frameExpose(a,p,how){const T=BAL.truth;ap(a,{danh:-T.fDanh});if(typeof ducAdd==="function")ducAdd(a,-T.fDuc,"vu khống người khác");else ap(a,{duc:-T.fDuc});
 relAdd(a,p,BAL.eff.jtruth.frameExpose);evA(p,a,2);punish(a,`vu khống ${p===S?"ngươi":p.name}`,2);
 const A=a===S?"Ngươi":a.name,P=p===S?"Ngươi":p.name;return `${P} minh oan được: ${how}. ${A} bị lộ là kẻ vu khống: Danh -${T.fDanh}, Đức -${T.fDuc}, bị phạt. `}
let FRAME_LAST="";try{lifeStore("FRAME_LAST",()=>{FRAME_LAST=""})}catch(e){}/* per life (review/newlife-reset-r1): the last framing sentence names people of that life */
(function(){const f0=framed;framed=function(p,why){FRAME_LAST="";const a=ACTX.a&&ACTX.a!==p?ACTX.a:null;if(!a||!p||window.__truthAuto)return f0.apply(this,arguments);
 if(p===S&&!window.__truthAuto){pushDil(mkP("vuoan",{a:key(a),why}),"Bị vu oan");return -1}
 const D=frameDef(p,a);try{window.__frames=(window.__frames||0)+1;if(p===S)window.__framesMe=(window.__framesMe||0)+1}catch(e){}
 if(roll(D.o)){FRAME_LAST=frameExpose(a,p,D.how);try{window.__framesClear=(window.__framesClear||0)+1;if(p===S)window.__framesMeClear=(window.__framesMeClear||0)+1}catch(e){}return 0}
 return f0.apply(this,arguments)}})();
/* the player's side: she picks a defence; each card shows its cost and its odds word (reviewer r1: the roads differ only in odds, so the
   VANPHONG ladder word is what makes the choice readable); the result card tells the truth */
PEND.vuoan=pp=>{const a=byKey(pp.a);if(!a||!S)return null;const T=BAL.truth;const why=pp.why||"bị vu dùng bùa ngải";const base=T.clearBase+(S.mat||0)*T.clearMat;
 const ks=(S.nightLog||[]).some(w=>wk()-w<=T.ksW);const wit=S.maid&&(S.maid.loyal||0)>=T.witLoy;const ty=S.doctor||((S.arts&&S.arts.y)||0)>=T.tyArts;const ev=evG(S,a);
 const clamp=x=>cl(Math.round(x),T.clearMin,T.clearMax);
 const clear=how=>{try{window.__framesMe=(window.__framesMe||0)+1;window.__framesMeClear=(window.__framesMeClear||0)+1}catch(e){}const t=frameExpose(a,S,how);
  Q.push({t:"Minh oan",who:pMe(),h:`<p>${t}</p>`});log(t)};
 const guilty=light=>{try{window.__framesMe=(window.__framesMe||0)+1}catch(e){}S.framedBy=pp.a;
  if(light){apply({danh:-6});const t="Ngươi nhận tội, xin khoan hồng: Danh -6. Kẻ vu oan vẫn chưa lộ mặt.";log(t);Q.push({t:"Nhận tội",who:pMe(),h:`<p>${t}</p>`});return}
  const A0=ACTX.a;ACTX.a=a;let d=0;window.__truthAuto=1;try{d=framed(S,why)}finally{window.__truthAuto=0;ACTX.a=A0}
  const t=`Không minh oan được: ngươi mang tội ${why.replace(/^bị /,"")}. Danh -${d}, Sủng -10, bị phạt.`;log(t);Q.push({t:"Mang tội",who:pMe(),h:`<p class="r">${t}</p>`});};
 const go=(o,how)=>()=>{if(roll(clamp(o)))clear(how);else guilty(false)};
 const H="minh oan được thì kẻ vu oan bị lộ, bị phạt; hỏng thì ngươi mang tội: mất Danh, Sủng, bị phạt",RK="có rủi ro";
 const O=[];
 O.push({n:"Xin tra sổ Kính sự phòng",fx:{},hint:`${word(clamp(base+(ks?T.ksB:-10)))} · ${H}`,risk:RK,j67:"tốn: không tốn gì",go:go(base+(ks?T.ksB:-10),ks?"sổ Kính sự phòng ghi đêm ấy ngươi hầu Hoàng thượng":"sổ Kính sự phòng và người gác cửa xác nhận ngươi không rời cung")});
 O.push(kitOffIf({n:S.maid?`Gọi ${S.maid.name} làm chứng`:"Gọi cung nữ tâm phúc làm chứng",fx:{},hint:`${word(clamp(base+T.wB))} · ${H}`,risk:RK,j67:"tốn: không tốn gì",go:go(base+T.wB,`cung nữ ${S.maid.name} làm chứng ngươi không rời cung`)},!!wit,S.maid?`lòng ${S.maid.name} chưa tới ${T.witLoy} (có ${S.maid.loyal||0})`:"thiếu cung nữ thân cận",kitWhenWit()));
 O.push(kitOffIf({n:"Mời Thái y nghiệm hình nhân",fx:{bac:-10},hint:`${word(clamp(base+T.tyB))} · ${H}`,risk:RK,j67:"tốn: Bạc -10",go:go(base+T.tyB,"Thái y nghiệm ra hình nhân còn mới, kim chỉ không phải của cung ngươi")},!!ty,`thiếu thái y tâm phúc hoặc y thuật ${T.tyArts} trở lên`,kitWhenTy()));
 O.push(kitOffIf({n:`Trình chứng cứ về ${a.name}`,fx:{},hint:`${word(clamp(base+T.evB*2+10))} · ${H}`,risk:RK,j67:`tốn: 1 chứng cứ về ${a.name}`,go:()=>{evA(S,a,-1);if(roll(clamp(base+T.evB*2+10)))clear(`ngươi trình chứng cứ về ${a.name}`);else guilty(false)}},ev>=1,kitWhyEv(a,1),kitWhenEv()));
 O.push({n:"Nhận tội, xin khoan hồng",fx:{},hint:"chịu tiếng nhẹ: Danh -6; kẻ vu oan không bị lộ",risk:"an toàn",j67:"tốn: không tốn gì",go:()=>guilty(true)});
 return{t:`<p>Cung Chính ti khám tẩm cung ngươi, tìm thấy hình nhân bùa ngải. Có kẻ tố ngươi ${why.replace(/^bị vu /,"")}.</p><p class="past">Ngươi không làm việc ấy. Chọn cách minh oan.</p>`,o:O,who:pv(a)}};

/* ---------- 4. evidence card + intel: the rumours, shown as weak ---------- */
(function(){if(typeof evidenceOf!=="function")return;const e0=evidenceOf;evidenceOf=function(p){const E=e0.apply(this,arguments);if(E&&p&&p!==S)E.rumours=rumG(S,p);return E}})();
/* (the rumour section itself is drawn by kitEvidencePanel, j79, from E.rumours) */
(function(){if(typeof j78facts!=="function")return;const f0=j78facts;j78facts=function(v){const F=f0.apply(this,arguments);try{const r=rumG(v,S);if(r>0)F.push({k:"rumme",kind:"evme",pri:45,txt:`${j78Who(v)} chỉ nghe ${r} tin đồn về ngươi, không có bằng chứng thật.`})}catch(e){}return F}})();
(function(){if(typeof evidenceHeldOnMe!=="function")return;evidenceHeldOnMe=function(){return liveRivals(true).filter(v=>((v.evm&&v.evm.me)||0)>0||rumG(v,S)>0).map(v=>({who:j78Ref(v),count:(v.evm&&v.evm.me)||0,rumours:rumG(v,S)}))}})();
/* what a new piece of the player's evidence proves: her real wrong from the ledger first */
(function(){if(typeof j78proof!=="function")return;const p0=j78proof;j78proof=function(v){try{S.evd=S.evd||{};const have=new Set((S.evd[v.id]||[]).map(e=>e.ref).filter(Boolean));
  const L=deedsOf(v);for(let i=L.length-1;i>=0;i--){const d=L[i];const ref="td:"+(d.at==null?"o"+i:d.at+":"+d.k+":"+(d.t||""));if(!have.has(ref))return{proves:`${j78Who(v)} ${d.x}`,ref,aim:d.t}}}catch(e){}return p0.apply(this,arguments)}})();
/* an event's own story makes the deed true (the event text says she did it): written in her ledger, then the evidence */
function evStory(t,n,x){if(!t||!S)return 0;deedAdd(t,"story",null,n,x||DEEDX.story);return evA(S,t,n)}
/* caught in the act (j8 caught): the attempt itself is the wrong; written once if the act did not already write it this week */
(function(){if(typeof caught!=="function")return;const c0=caught;caught=function(a,t,ps,desc){try{if(a&&t&&a!==t){const L=a.wrongs||[];const d=L[L.length-1];if(!(d&&d.at===wk()&&d.t===key(t)))deedAdd(a,"caught",t,2,desc||"mưu hại người")}}catch(e){}return c0.apply(this,arguments)}})();
/* test counters for the other frame road (Giá họa, j92): every resolved frame-up, and the ones the victim cleared */
(function(){if(typeof wdFrameResolve!=="function")return;const w0=wdFrameResolve;wdFrameResolve=function(a,t){const r=w0.apply(this,arguments);try{if(r||t===S){window.__frames=(window.__frames||0)+1;if(t===S)window.__framesMe=(window.__framesMe||0)+1;
 if(/minh oan được|không thấy gì|không thành/.test(r||"")){window.__framesClear=(window.__framesClear||0)+1;if(t===S)window.__framesMeClear=(window.__framesMeClear||0)+1}}}catch(e){}return r}})();
/* ---------- 5. frames are the schemer's road against a clean rival (reviewer r1, owner 16/11 "không lần nào cũng minh oan được thì chán chết") ----------
   With true evidence only, a schemer who holds no proof on her target cannot Tố giác her (accOK); she fabricates instead. In her scheme
   menu (j40 mindMenu): Vu oan already allowed (grudge band "nặng") weighs × BAL.truth.frameW; at band "nhỏ" (30–59) Vu oan is added with
   weight frameW1 (it is a BIG scheme: planned first, so her people may catch the tell). Same rule for every consort and the player.
   NPC-vs-NPC: consorts' grudges against each other seldom reach the bands, so each tuần with npcFrameP % a malicious consort (malice ≥
   npcFrameMal, weighted by malice) frames the rival in her way (more favoured or higher rank, weighted by Sủng) through the normal
   Vu oan act: caught / odds / defence / exposure exactly as for the player. */
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{const T=BAL.truth;
 if(O.length&&t&&ACT.frame&&!accOK(v,t)){let has=false;for(const x of O)if(x[0]==="frame"||x[0]==="plant"){x[1]*=T.frameW;if(x[0]==="frame")has=true}
  if(!has&&bandOf(danger(v,t))===1&&T.frameW1>0){let ok=false;try{ok=ACT.frame.ok(v,t)}catch(e){}const w=T.frameW1*(typeof persW==="function"?persW(v,"frame"):1);if(ok&&w>0)O.push(["frame",w])}}}catch(e){}return O}})();
function npcFrame(){const T=BAL.truth;const L=liveRivals(false).filter(v=>v&&v.alive&&!v.out&&!v.coop&&!v.confined);if(L.length<2)return"";
 const A=L.filter(v=>(v.malice||0)>=T.npcFrameMal&&!v.plan);if(!A.length)return"";const a=wpick(A.map(v=>[v,v.malice||1]));
 const V=L.filter(t=>t!==a&&!(typeof sameHouse==="function"&&sameHouse(a,t))&&((t.sung||0)>(a.sung||0)||rkOf(t)>rkOf(a))&&!accOK(a,t));if(!V.length)return"";
 const t=wpick(V.map(x=>[x,Math.max(1,x.sung||0)]));let r="";try{r=runAct(a,t,"frame")||""}catch(e){console.error("npcFrame",e)}
 try{window.__npcFrameTry=(window.__npcFrameTry||0)+1}catch(e){}return typeof seenNPC==="function"?seenNPC(a,t,r):""}
(function(){const e0=endTurn;endTurn=function(){const run=S&&!S.dead&&!Q.length&&!S.mg;const r=e0.apply(this,arguments);
 try{if(run&&S&&!S.dead&&roll(BAL.truth.npcFrameP)){const x=npcFrame();if(x)log(x)}}catch(e){}return r}})();
/* a frame is quiet work (a doll slipped into a chest, a whisper to Cung Chính ti): the victim's people see it less than a poisoning or a push.
   oSee during Vu oan / Cài đồ − BAL.truth.frameHide (reviewer r1: the player's maid guard caught ~90% of frames, so a frame almost never landed). */
(function(){const o0=oSee;oSee=function(t,p){const r=o0.apply(this,arguments);try{if(typeof ACTK!=="undefined"&&(ACTK==="frame"||ACTK==="plant")&&BAL.truth.frameHide)return cl(Math.round(r-BAL.truth.frameHide),5,95)}catch(e){}return r}})();
