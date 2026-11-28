/* ================= jcover: COVERING ONE'S TRACKS (review/real-proof-2, worker PUNISH-TIER-5; owner OD 27/11 ~00:13Z … ~00:57Z, verbatim on the handover branch) =================
   Owner (verbatim, ~00:15Z): "người không biết việc họ làm có bị lộ hay không để còn bảo toàn cho mình chứ" · (~00:24Z) "thêm xóa dấu vết … dựa vào điểm tâm cơ
   … nhân chứng thì thủ tiêu" · (~00:50Z) "đe dọa nó sẽ kiểu nhẹ, còn mua chuột nó là vừa … việc mà liên quan đến tính mạng thì nó sẽ đâu đó ở mức nặng" ·
   (~00:38Z) refused bribe = no bạc lost · (~00:36Z) FINAL-RESULT LAW: a result never reverses · (~00:57Z MAIN rec applied) Đức on any wicked deed by tier,
   Danh only when exposed. Same for her and every NPC (law 1); every number BAL.charge.cover (law 4); odds words only (law 7).
   1. TRACE: a deed done in an action (runAct / these acts) leaves a trace with the odds of BAL.charge.cover.trace.band[its weight] − the doer's Tâm cơ
      (chFind's tcStep / tcCap). No trace → the deed adds no evidence cap (d.w 0, d.cl) — nothing can ever be found of it; witnesses (t.wsee) still saw it.
   2. EXPOSURE LINE: her result card gets ONE row «Ẩn lộ»: «Không ai hay biết.» · «Để lại dấu vết.» · «<Tên> đã trông thấy.» (the last two join),
      from the deed's own trace and the real people who stood there (chHere, the same day record as jcharge). Details stay in Sổ ghi.
   3. «Xóa dấu vết» (ONE act, on her maid — the one who does it; an NPC does it herself): wipes the newest traced deed (d.w → 0, d.wp); its evidence above
      the new cap turns to rumour at the week end (jtruth evTruthSweep). Cost bạc wipe.bac[weight] + the act khắc (BAL.time.cost.talkAct); odds wipe.band +
      Tâm cơ. Witnesses are NOT touched.
   4. A NAMED REAL WITNESS (one door «Xử nhân chứng», jdoor, three tiers at once): NHẸ «Đe dọa bịt miệng» (Sức) · VỪA «Mua chuộc nhân chứng» (bạc, only
      when the witness accepts; nết greed / loyal decide) · NẶNG «Thủ tiêu nhân chứng» (the person really dies — law 6b; a failure = caught: Danh at once
      + new evidence of the attempt). Success removes that id from the doer's t.wsee and from every holder's h.ewc — for good.
   5. ĐỨC / DANH: Đức cover.duc[weight] on every deed written in an action whose road has no Đức cost of its own; Danh cover.danh[weight] when the deed
      is exposed — caught red-handed (j8 caught) or proven (jcharge chPunishX, not the light «phạt bổng» which already carries BAL.charge.danh).
   ============================================================================================================================= */
function covB(){return BAL.charge.cover}
function covTier(k){const C=chC(chOfDeed(k));return C?C.tier:"nhe"}
/* Tâm cơ bands (the same step / cap as a search) */
function covG(p){const B=chB();return Math.max(0,Math.min(B.tcCap,Math.trunc((+(p&&p.tamco)||0)/B.tcStep)))}
function covO(b){return chBandO(Math.max(0,Math.min(BAL.odds.cut.length,b|0)))}
const COV={ctx:0,sync:0,k:null,last:[]};
/* deeds whose road already takes Đức (ACT cost c.duc, or listed in cover.ownDuc after the scan) — the hook never takes it twice */
function covOwnDuc(k){try{if(covB().ownDuc.includes(k))return true;const A2=ACT[k];return !!(A2&&A2.c&&A2.c.duc<0)}catch(e){return false}}
/* ---- 1 + 5: the deed hook (outside jcharge's witness hook: the witnesses are already written) ---- */
(function(){const s0=deedSync;deedSync=function(){COV.sync++;try{return s0.apply(this,arguments)}finally{COV.sync--}}})();
(function(){const d0=deedAdd;deedAdd=function(p,k,t){const d=d0.apply(this,arguments);try{if(!d||!p||COV.sync||deedSyncGuest(p))return d;const B=covB(),x=covTier(k);
 d.x2=x;/* the weight the deed carried when done */
 if(COV.ctx>0&&!COV.force&&!roll(covO(B.trace.band[x]-covG(p)))){p.dw=Math.max(0,(p.dw||0)-(d.w||0));d.w=0;d.cl=1}
 if(!covOwnDuc(k)&&typeof ducAdd==="function"){const n=B.duc[x];if(n)ducAdd(p,n,d.x||"việc sai trái")}
 /* her result card: her own deed, or an NPC's deed on her (OD ~00:15Z «hers or an NPC's toward her») */
 if(p===S||(t&&t===S)){let sw=[];try{sw=chHere(p).filter(x=>x!=="me")}catch(e){}COV.last.push({d,seq:S.logSeq||0,sw});if(COV.last.length>8)COV.last.shift()}}catch(e){console.error("jcover deed",e)}return d}})();
/* chDeedMap counted a 0-weight deed as 1: a clean / wiped deed leaves no piece to find */
(function(){const m0=chDeedMap;chDeedMap=function(t){const M=m0.apply(this,arguments);try{for(const c in M){if(c==="_ord")continue;const D=M[c];if(D&&D.list&&!D.cv){D.w=D.list.reduce((s,d)=>s+(d&&d.w!=null?d.w:1),0);D.cv=1}}}catch(e){}return M}})();
/* an act runs: its deed may leave no trace; caught red-handed = exposed (Danh by the act's weight) */
(function(){const r0=runAct;runAct=function(a,t,k){const pk=COV.k;COV.ctx++;COV.k=k;try{return r0.apply(this,arguments)}finally{COV.ctx--;COV.k=pk}}})();
function covDanh(p,x,why){const n=covB().danh[x||"nhe"];if(!p||!n)return 0;try{withDeed(why||"việc xấu bị lộ",()=>{if(p===S)apply({danh:n});else ap(p,{danh:n})})}catch(e){ap(p,{danh:n})}return n}
/* caught red-handed: the j85 «caught» Danh (her and every NPC, printed on the line) now reads the weight of the act being done (law 4: cover.danh;
   canon overwrite of the flat BAL.eff.j85.caughtDanh −5); a caught road outside an act = nhẹ */
try{Object.defineProperty(BAL.eff.j85,"caughtDanh",{configurable:true,enumerable:true,get(){return covB().danh[COV.k?covTier(COV.k):"nhe"]}})}catch(e){}
(function(){const p0=chPunishX;chPunishX=function(t,c,why,by,x,back){const r=p0.apply(this,arguments);try{const C=chC(c);if(t&&C&&!back&&!(x==="nhe"&&C.lite==="bong"))covDanh(t,x,why)}catch(e){}return r}})();
/* ---- 2: the exposure line (her result card row «Ẩn lộ», kit row j63) ---- */
function covNames(ids){const L=(ids||[]).filter(id=>chWitP(id)).map(chWitNm).filter(Boolean);const n=covB().names;if(L.length<=n)return L.join(", ");return `${L.slice(0,n).join(", ")} và ${L.length-n} người khác`}
function covLine(E){if(!E||!E.length)return"";const tr=E.some(e=>e.d&&e.d.w>0);const ids=[...new Set([].concat(...E.map(e=>e.sw||[])))];const nm=covNames(ids);
 if(!tr&&!nm)return"Không ai hay biết.";if(tr&&nm)return`Để lại dấu vết; ${nm} đã trông thấy.`;return tr?"Để lại dấu vết.":`${nm} đã trông thấy.`}
(function(){if(typeof kaResultRows!=="function")return;const k0=kaResultRows;kaResultRows=function(before){const r=k0.apply(this,arguments);try{if(before&&Array.isArray(r)&&r[2]){const s=before.seq|0;const E=COV.last.filter(e=>e.seq>=s);
  if(E.length){COV.last=COV.last.filter(e=>e.seq<s);const ln=covLine(E);if(ln)r[2].lo=[ln]}}}catch(e){console.error("jcover line",e)}return r}})();
/* ---- 3: Xóa dấu vết ---- */
function covTraced(p){const B=covB().wipe,now=wk();const L=((p&&p.wrongs)||[]).filter(d=>d&&d.w>0&&!d.wp&&d.at!=null&&now-d.at<=B.win);return L.length?L[L.length-1]:null}
function covWipeBac(d){const B=covB().wipe;return B.bac[d&&d.x2||covTier(d&&d.k)]||B.bac.nhe}
/* the price of a wipe for p: Bạc when p has it, else Sức of the same weight (law 2 / OD:L582: a bạc road always has a matching road; ONE act) */
function covWipeCost(p,d){const B=covB().wipe,x=d&&d.x2||covTier(d&&d.k),bac=B.bac[x]||B.bac.nhe;return (+(p&&p.bac)||0)>=bac?{bac:-bac}:{suc:-(B.suc[x]||B.suc.nhe)}}
function covWipeO(p){return covO(covB().wipe.band+covG(p))}
function covWipe(p,d){d=d||covTraced(p);if(!p||!d)return false;p.dw=Math.max(0,(p.dw||0)-(d.w||0));d.w=0;d.wp=1;return true}
function covWipeOpt(){const d=covTraced(S);if(!d)return null;const c=covWipeCost(S,d),self=!c.bac;
 return{n:"Xóa dấu vết",act:1,o:covWipeO(S),c,x:`dấu vết việc «${plain(d.x||"")}» bị xóa sạch, không ai còn tìm ra chứng cứ`,risk:"dấu vết còn đó",cov:"wipe",
  go:()=>{covWipe(S,d);log(`${self?"Ngươi tự tay":S.maid?S.maid.name:"Người hầu"} lặng lẽ xóa sạch dấu vết việc ${plain(d.x||"")}.`)},fail:()=>log(`Xóa dấu vết việc ${plain(d.x||"")} không xong: dấu vết vẫn còn.`)}}
/* ---- 4: a named real witness ---- */
function covWitId(p){const r=covWitId0(p);return r&&/^mm:/.test(r)?chMaidId(r):r/* a maid = the person «mu:» (jcharge chMaidId), never the role */}
function covWitId0(p){if(!p)return null;if(p.lid)return p.lid;if(p.kind==="maid")return"mm:me";/* her own maid in the day record (j95) */if(p.sid!=null)return"s"+p.sid;try{return ledgerId(p.ref||p)}catch(e){return null}}
/* the charges of a's deeds that witness id really saw (t.wsee), alive, never the Emperor / Thái hậu */
function covSaw(a,id){if(!a||!id||id==="emp"||id==="th"||!chWitP(id))return[];const W=a.wsee||{};return Object.keys(W).filter(c=>(W[c]||[]).includes(id))}
function covSawTier(a,id){const O=chB().tierOrd;let b=-1;for(const c of covSaw(a,id)){const i=O.indexOf(chTier(a,c));if(i>b)b=i}return b<0?null:O[b]}
function covPerson(id){const p=chWitP(id);return p&&p!=="th"?p:null}
function covWitBac(a,id){return covB().wit.vua.bac[covSawTier(a,id)||"nhe"]}
function covWitO(a,id,x){const B=covB().wit[x],w=covPerson(id);let b=B.band+covG(a);if(!w)return covO(b);
 if(x==="nhe"){if(netIs(w,"timid"))b++;if(w.rel!=null&&rkOf(w)>rkOf(a))b--}
 else if(x==="vua"){if(netIs(w,"greed"))b++;if(netIs(w,"loyal"))b--}
 else{if(w.rel!=null&&rkOf(w)>=chB().guardRk)b+=chB().guard}
 return covO(b)}
/* silence = the witness is gone from every list, for good (FINAL-RESULT LAW) */
function covSilence(a,id){if(!a||!id)return;const W=a.wsee||{};for(const c in W)W[c]=(W[c]||[]).filter(x=>x!==id);const k=key(a);
 for(const h of [S].concat(rivals||[])){const E=h&&h.ewc&&h.ewc[k];if(!E)continue;for(const c in E)if(Array.isArray(E[c]))E[c]=E[c].filter(x=>x!==id)}
 a.wsil=a.wsil||{};a.wsil[id]=wk()}
/* MAIN 177 LOOK: the stage list is a snapshot (S.visit.people, j2 homePeople): a maid killed while she stands on HER stage leaves it at once and
   the new maid from Nội vụ phủ takes her place; a dead servant / housemate just leaves */
function covStageSwap(o,w){try{if(o!==S||!S.visit||!Array.isArray(S.visit.people))return;const P=S.visit.people;
 const i=P.findIndex(x=>x&&(x.ref===w||x.kind==="maid"&&!x.ref&&x.name===w.name));if(i<0)return;
 if(w.uid!=null&&S.maid&&S.maid!==w&&typeof homePeople==="function"){const nm=homePeople().find(x=>x&&x.kind==="maid");if(nm){P[i]=nm;return}}P.splice(i,1)}catch(e){}}
function covWho(p){return p===S?"ngươi":p&&p.rel!=null?NM(p):(p&&p.name)||"người ấy"}
/* the attempt on a witness's life: the person really dies (consort: jmort kill → npcRetire, ledger; a servant: asOut «dead»); her: a heavy Sức blow */
function covKill(a,id){const w=covPerson(id);if(!w)return"";const why=`bị thủ tiêu để bịt miệng`;
 if(w===S){const n=covB().wit.nang.hit;apply({suc:-n});if(S.suc<=0){die(`Bị ${a.name} sai người thủ tiêu`);return""}return `Người của ${a.name} ra tay hạ sát ngươi, ngươi thoát chết trong gang tấc. Sức -${n}.`}
 if(w.rel!=null&&rivals.includes(w)){/* the jmort kill road (its IIFE keeps kill private): retire the face, the death ledger «plot», the seat */
  try{if(typeof npcRetire==="function")npcRetire(w)}catch(e){}w.alive=false;if(w.queen){w.queen=false;if(S.vacSince==null)S.vacSince=S.turn}
  try{S.mort=S.mort||{};(S.mort.dl=S.mort.dl||[]).push({g:"consort",a:w.age,c:"plot",y:S.year});if(S.mort.dl.length>300)S.mort.dl.shift()}catch(e){}
  return `<span class="r">${w.name} ${why}, ${w.age} tuổi.</span>`}
 if(/^mu:/.test(id)){/* a maid witness (chWitP «mu:»): she really dies, her mistress gets a new maid from Nội vụ phủ (j8 maidMk) */const o=chMaidO(id.split(":")[1]);w.dead=1;w.alive=false;/* jdead dthIs: the kit dead state */
  try{if(o&&o.maid===w){o.maid=maidMk(o);covStageSwap(o,w)}(S.mort=S.mort||{}).dl=S.mort.dl||[];S.mort.dl.push({g:"maid",a:w.age||0,c:"plot",y:S.year});if(S.mort.dl.length>300)S.mort.dl.shift()}catch(e){}return `<span class="r">${w.name} ${why}.</span>`}
 w.dead=1;w.alive=false;try{const ow=ownerOf(w);if(typeof asOut==="function"&&ow)asOut(w,"dead");covStageSwap(ow,w)}catch(e){}return `${w.name} ${why}.`}
/* one road for her and every NPC: x = nhe | vua | nang; returns the result text; pay = the bạc already handled by the caller (her option card) */
function covWitDo(a,id,x,ok){const w=covPerson(id);if(!a||!w)return"";const wn=covWho(w),B=covB().wit;if(ok==null)ok=roll(covWitO(a,id,x));
 if(x==="nhe"){const pk=COV.ctx;COV.ctx++;try{deedAdd(a,"wthreat",w===S?S:w.rel!=null?w:null,null,`đe dọa ${wn} bịt miệng`)}finally{COV.ctx=pk}
  if(ok){covSilence(a,id);return `${wn} sợ hãi, thề không hé răng nửa lời.`}try{if(w.rel!=null||w===S)relAdd(a,w,-B.nhe.aff)}catch(e){}return `${wn} không sợ lời đe dọa${w===S?"":`, càng ghét ${covWho(a)}`}.`}
 if(x==="vua"){const bac=covWitBac(a,id);if(!ok){try{if(w.rel!=null||w===S)relAdd(a,w,-B.vua.aff)}catch(e){}return `${wn} từ chối bạc, không nhận lời; ${covWho(a)} không mất bạc nào.`}
  if(a!==S)ap(a,{bac:-bac});if(w===S)apply({bac:bac});else if(w.rel!=null)ap(w,{bac:bac});
  const pk=COV.ctx;COV.ctx++;try{deedAdd(a,"wbribe",w.rel!=null?w:null,null,`mua chuộc ${wn} bịt miệng`)}finally{COV.ctx=pk}covSilence(a,id);return `${wn} nhận ${bac} lượng bạc, từ nay câm lặng.`}
 const o=covOwner(w,id);/* OD 27/11 ~04:08Z: the one she belongs to (a maid's / servant's mistress, a housemate) — the deed is a deed on her house, so its pieces are hers to find */
 const pk=COV.ctx;COV.ctx++;COV.force=!ok;let d=null;try{d=deedAdd(a,"wkill",w.rel!=null||w===S?w:o,null,`mưu thủ tiêu ${wn}`)}finally{COV.ctx=pk;COV.force=0}
 if(ok){covSilence(a,id);let sw=[];try{sw=chHere(a).filter(x=>x!==id&&x!==ledgerId(o||{}))}catch(e){}const r=covKill(a,id)||`${wn} không còn trên đời.`;covTell(o,w,a,d,sw);return r}
 /* failure = exposed at once: Danh now, the witness holds evidence of the attempt and saw it */
 try{chSawAdd(a,"mh",id)}catch(e){}covDanh(a,covTier("wkill"),`mưu thủ tiêu ${wn} bị lộ`);
 try{const h=w===S||w.rel!=null?w:ownerOf(w);if(h&&h!==a)evA(h,a,covB().wit.nang.ev,"mh")}catch(e){}
 return `<span class="r">Vụ thủ tiêu ${wn} bị lộ</span>: ${wn} thoát được và biết kẻ chủ mưu là ${covWho(a)}.`}
/* OD 27/11 ~04:08Z (owner: «Lúc cung nữ chết có báo lý do chết không? Lỡ cung nữ của tôi chết vì bị người khác thủ tiêu thì báo gì»): when a person tied to
   someone is killed, the one she belongs to hears it AT ONCE — who, where / how she was found (only what the world shows: the killer is never named; the
   pieces / witnesses of the deed are real, via deedAdd, so the existing «Tố giác» works), the exposure line when a trace or a witness exists, and the new
   maid Nội vụ phủ sends. Her: a notice card + the Sổ ghi line. An NPC mistress: the same deed on her house (her pieces to find) and her new maid (law 1). */
const COVSIGN=["được tìm thấy chết dưới giếng sau, trên cổ có vết bầm","được tìm thấy chết trong hồ sen lúc tờ mờ sáng, móng tay còn dính máu","được phát hiện chết trong phòng chứa củi, khóe miệng thâm đen","được tìm thấy chết ở góc ngự uyển, sau gáy có vết đánh"];
function covOwner(w,id){try{if(w===S)return null;if(w.rel!=null&&rivals.includes(w))return sameHouse(S,w)?S:null;if(/^mu:/.test(id||""))return chMaidO(String(id).split(":")[1]);return ownerOf(w)||null}catch(e){return null}}
function covTell(o,w,a,d,sw){if(!o||o===a||!w)return;try{const sign=COVSIGN[Math.floor(Math.random()*COVSIGN.length)];const ex=(d&&d.w>0)||(sw&&sw.length)?covLine([{d,sw}]):"";const nm=o.maid&&o.maid!==w&&w.uid!=null?o.maid.name:"";
  if(o!==S)return;const role=w.rel!=null?"người ở cùng cung":w.uid!=null?"cung nữ thân cận":"người hầu trong cung";/* no pronoun: the notice voice turns «ngươi» around */
  const h=`<p>${covWho(w)}, ${role}, ${sign}.</p><p>Không ai biết kẻ nào ra tay.</p>${ex?`<p class="r">${ex}</p>`:""}${nm?`<p>Nội vụ phủ đưa ${nm} đến hầu thay.</p>`:""}`;
  /* MAIN 177 LOOK (OD 27/11 ~05:59Z + OD:L448): the figure is the DEAD person, full-body, kit dead state (kitDeadWho → kitStageFig .kst-dead);
     the new maid is a NAME only on the Nội vụ phủ line (who:[] = no inline avatar); the trace line keeps the kit's own people avatars */
  const facts=[{text:`${covWho(w)}, ${role}, ${sign}.`,who:[]},{text:"Không ai biết kẻ nào ra tay.",who:[]}];if(ex)facts.push({text:`<span class="r">${ex}</span>`});if(nm)facts.push({text:`Nội vụ phủ đưa ${nm} đến hầu thay.`,who:[]});
  Q.push({t:"Tin dữ",h,kit:{facts,group:false},who:typeof kitDeadWho==="function"?kitDeadWho(w):null});log(`<span class="r">${covWho(w)} (${role}) ${sign}; chưa rõ kẻ ra tay.</span>${ex?" "+ex:""}${nm?` Nội vụ phủ đưa ${nm} đến hầu thay.`:""}`)}catch(e){console.error("covTell",e)}}
/* her three options on a witness, one door (jdoor) */
const COVN={nhe:"Đe dọa bịt miệng",vua:"Mua chuộc nhân chứng",nang:"Thủ tiêu nhân chứng"};
function covWitOpts(p){const id=covWitId(p);if(!id||!covSaw(S,id).length)return[];const B=covB().wit,bac=covWitBac(S,id),wn=covWho(covPerson(id));
 const mk=(x,o)=>Object.assign({n:COVN[x],act:1,o:covWitO(S,id,x),cov:x},o);
 /* the kit option row reads plain phrases (jk2b kitHint): no «label:» inside, the tier sits in the title (DOOR row tier) */
 /* TMK-WARN-4 (RV-186 X01, law 11 whole group; no number changed): every tier's line is LABELLED (j25 optLine passes a labelled x whole) so a loss
    never sits in the green Thành row — the Đức of the deed (jcover deed hook: deedAdd runs on success AND failure for nhẹ / nặng) is a Kèm under
    both Thành and Bại; vừa pays its bạc (o.w, applied on success) and takes its Đức only on success → Kèm under Thành, Bại = she refuses, no bạc lost */
 return[mk("nhe",{c:{suc:-B.nhe.suc},x:`thành: ${wn} sợ hãi, câm lặng · kèm: Đức ${balSg(covB().duc.nhe)} · hỏng: ${wn} không sợ, càng ghét ta · kèm: Đức ${balSg(covB().duc.nhe)}`,risk:`${wn} không sợ, càng ghét ta`,go:()=>log(covWitDo(S,id,"nhe",true)),fail:()=>log(covWitDo(S,id,"nhe",false))}),
  mk("vua",{w:{bac:-bac},x:`thành: ${wn} nhận ${bac} lượng bạc, câm lặng · kèm: ${fmt({bac:-bac})}, Đức ${balSg(covB().duc[covTier("wbribe")])} · hỏng: ${wn} từ chối, ta không mất bạc`,risk:"từ chối thì ta không mất bạc",go:()=>log(covWitDo(S,id,"vua",true)),fail:()=>log(covWitDo(S,id,"vua",false))}),
  mk("nang",{x:`thành: ${wn} không còn trên đời · kèm: Đức ${balSg(covB().duc[covTier("wkill")])} · hỏng: Danh ${balSg(covB().danh[covTier("wkill")])}, ${wn} biết kẻ chủ mưu · kèm: Đức ${balSg(covB().duc[covTier("wkill")])}`,risk:`Danh ${balSg(covB().danh[covTier("wkill")])}, ${wn} biết kẻ chủ mưu`,go:()=>log(covWitDo(S,id,"nang",true)),fail:()=>log(covWitDo(S,id,"nang",false))})]}
DOOR.add({k:"wit",n:"Xử nhân chứng",kinds:["rival","hh","npc","serv","maid"],rep:null,tier:a=>a&&a.cov&&BAL.charge.tier[a.cov]?BAL.charge.tier[a.cov].n:"",h:"Người này đã trông thấy việc ngươi làm. Chọn cách: nhẹ, vừa hay nặng.",re:/^(Đe dọa bịt miệng|Mua chuộc nhân chứng|Thủ tiêu nhân chứng)$/});
/* the door card's option rows: the kit reads its words from o.hint (jk2b kitHint «được; nhưng …; hỏng thì …») — the true result of each tier, no guess */
function covHint(x,id){const wn=covWho(covPerson(id))||"người ấy",V=covB();
 if(x==="nhe")return `${wn} sợ hãi, câm lặng; nhưng mang tiếng thất đức (chút ít); hỏng thì ${wn} càng ghét ta`;
 if(x==="vua")return `${wn} nhận ${covWitBac(S,id)} lượng bạc, câm lặng; nhưng mang tiếng thất đức (chút ít); hỏng thì ${wn} từ chối, ta không mất bạc`;
 return `${wn} không còn trên đời; nhưng mang tiếng thất đức (nhiều); hỏng thì bị lộ: mất thể diện (nhiều), ${wn} biết kẻ chủ mưu`}
(function(){const P0=PEND.door;PEND.door=pp=>{const P=P0(pp);try{if(P&&pp&&pp.k==="wit"){const p=curPeople()[pp.i];const id=covWitId(p);const X={[COVN.nhe]:"nhe",[COVN.vua]:"vua",[COVN.nang]:"nang"};
 for(const o of P.o||[]){const nm=String(o.n||"").split(" · ")[0];if(X[nm])o.hint=covHint(X[nm],id)}}}catch(e){console.error("jcover door",e)}return P}})();
/* the options join the RAW list (inside the jdoor fold, so the three fold into the one door) */
(function(){const t0=talkOpts;talkOpts=function(p){DOOR.raw++;let A;try{A=t0.apply(this,arguments)}finally{DOOR.raw--}
 try{if(Array.isArray(A)&&p&&S&&!S.dead){const X=[];if(p.kind==="maid"){const o=covWipeOpt();if(o)X.push(o)}if(p.kind!=="emp"&&p.kind!=="th")X.push(...covWitOpts(p));if(X.length){const B=A.slice();X.forEach(o=>B.push(o));A=B}}}catch(e){console.error("jcover opts",e)}
 if(DOOR.raw>0)return A;try{return doorFold(p,A)}catch(e){console.error("jdoor fold",e);return A}}})();
/* her as the witness of an NPC's bribe: her own choice (jrcv card) */
RCVK.witBribe={t:"Lời mua chuộc",act:"mang bạc sang mua chuộc",kind:"help",ok:(p,t)=>covSaw(p,"me").length>0,
 line:p=>`<p>Người của ${p.name} mang ${covWitBac(p,"me")} lượng bạc sang: “Chuyện hôm ấy, xin nương nương coi như chưa từng thấy.”</p>`,
 opts:(p,t)=>{const bac=covWitBac(p,"me");return[{n:"Nhận bạc, im lặng",fx:{bac},x:`được ${bac} lượng; không làm nhân chứng việc ấy nữa`,go:()=>{ap(p,{bac:-bac});apply({bac});covSilence(p,"me");return `Ngươi nhận bạc của ${p.name}, từ nay im lặng.`}},
  {n:"Từ chối",fx:{},x:"vẫn là nhân chứng",go:()=>{try{relAdd(p,S,-covB().wit.vua.aff)}catch(e){}return `Ngươi trả lại bạc của ${p.name}.`}}]}};
/* ---- law 1: every NPC wipes her own traces and deals with her own witnesses by her nết (one road, the same numbers) ---- */
function covNpcTurn(){const B=covB().npc;let n=0;for(const v of liveRivals(true)){if(v.coop||deedSyncGuest(v))continue;
 const d=covTraced(v);if(d&&roll(B.wipe)){const c=covWipeCost(v,d);if(!c.suc||(+v.suc||0)>-c.suc){ap(v,c);if(roll(covWipeO(v)))covWipe(v,d)}}
 const ids=[...new Set([].concat(...Object.values(v.wsee||{})))].filter(id=>covSaw(v,id).length&&covPerson(id));if(!ids.length||!roll(B.wit))continue;
 const id=pick(ids);const duc=+v.duc||0;const x=duc>=B.ducHi?"nhe":(v.bac||0)>=covWitBac(v,id)?"vua":duc<B.ducLo?"nang":"nhe";
 if(x==="vua"&&id==="me"){rcvAsk("witBribe",v,S);n++;continue}
 const r=covWitDo(v,id,x);if(r&&id==="me")log(`${v.name} ${x==="nhe"?"sai người đe dọa ngươi chớ hé răng":"sai người ra tay với ngươi"}: ${r}`);n++;if(n>=B.cap)break}}
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)covNpcTurn()}catch(e){console.error("jcover npc",e)}return r}})();
