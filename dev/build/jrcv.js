/* ================= jrcv: RECEIVER CHOICE (owner OD 18/11 ~21:15Z, law 1 two-way + law 2 equal value + law 3 gain-and-loss) =================
   "đâu có cái option nào mà có thể ép một người ... phải làm một cái hành động mà họ không muốn ... Chẳng qua là nó sẽ có cái giá".
   ONE core for the receiver of a request / order / gift that is NOT a send-order button (those: jptime receiver frame, review/parallel-time):
   rcvP(t,a) the receiver t's helper profile toward the asker a (the L1876 shape of jroad rdHpWho for a consort) · rcvW = its 4 weights
   [full, half, no, sab] (jroad rdHpW, BAL.road.hp) · rcvPick(t,a,opts,kind) = the NPC receiver's pick (weights × BAL.rcv.k[kind]) among the SAME option list her card shows
   (each option names its slot i, or its own weight w), jmind mindPick with the receiver as chooser (the jmind slip; never argmax) ·
   rcvWord = the willingness word on the asker's card (rdHpWord, never odds).
   Wired here: Nhờ giúp đỡ (cx2:help / her j9 card, helpAsk) both ways + her card when an NPC asks HER (PEND.rcvHelp);
   a gift to an NPC (giveTo → the NPC answers with her giftin answers: Nhận / Trả lại quà / Đem đến Thái y viện xét nghiệm);
   Hoàng thượng triệu an NPC (tsSummonGo → Vâng chỉ / Cáo bệnh, her tsSummonMe numbers). Audit: dev/tools/receiver-choice-scan.js.
   ================================================================================================================================== */
function rcvP(t,a){const B=BAL.road.hp,cap=B.affCap,c=x=>Math.max(-cap,Math.min(cap,+x||0));
 const P={role:t.queen?"hh":"v",type:"rv",p:t,sp:t,net:[],tone:null,aff:0,tc:t.tamco,known:true,name:t.name||"",dk:null};
 try{P.aff=c(a==="emp"?(t.sung||0)-B.mid.emp:a&&typeof a==="object"?aff(t,a):0)}catch(e){}
 try{P.net=(Array.isArray(t.net)?t.net:traitsOf(t))||[]}catch(e){}
 if(a===S)P.dk={k:t.queen?"hh":"rv",id:t.id};/* nợ ân (j72) counts only toward her: an NPC's debt ledger is hers */
 return P}
function rcvW(t,a){try{return rdHpW(null,rcvP(t,a))}catch(e){return BAL.road.hp.w.v.slice()}}
function rcvWord(t,a){try{const P=rcvP(t,a);return rdHpWord(P,rdHpW(null,P))}catch(e){return""}}
function rcvPick(t,a,O,kind){O=(O||[]).filter(o=>o&&!(typeof o.lk==="function"&&o.lk()));if(!O.length)return null;const K=(BAL.rcv.k||{})[kind]||[1,1,1,1];const w=rcvW(t,a).map((x,i)=>x*K[i]);
 const W=O.map(o=>[o,Math.max(BAL.mind.pickMin,o.w!=null?o.w:o.i!=null?(Array.isArray(o.i)?o.i.reduce((s,i)=>s+w[i],0):w[o.i]):0)]);
 const c=mindPick(W,t)||O[0];(window.__rcvN=window.__rcvN||{})[(c.id||c.i)+""]=((window.__rcvN||{})[(c.id||c.i)+""]||0)+1;return c}
const rcvNm=x=>x===S?"ngươi":x.name;
/* the 4 answer names = the L1876 words BAL.road.hp.kw (slot 3 «Mách lẻo» = kw.lk, as j42 cnvOrdOpts / parallel-time) — one core, no copy */
const rcvKw=i=>{const K=BAL.road.hp.kw;return [K.full,K.half,K.no,K.lk][i]};
/* «làm qua loa» risk (every slot-1 answer, law 2 + 3, OD ~21:15Z "qua loa → weaker result + risk"): the L1876 «qua loa» minus BAL.road.hp.half read as
   the chance the asker sees through it → the asker's liking of the receiver − help.fail (as an open refusal) and her oán + road.hp.sab.oan.
   rcvSeen(p,t) rolls it once (her card and an NPC the same roll) → true when seen; rcvSeenX(p,t) = the words on the card (chanceW, never %) */
function rcvSeen(p,t){const H=BAL.road.hp,F=BAL.ag.cx2.help.fail;if(!roll(H.half))return false;affAdd(p,t,-F);oanAdd(p,t,H.sab.oan);(window.__rcvN=window.__rcvN||{}).seen=((window.__rcvN||{}).seen||0)+1;return true}
function rcvSeenX(p,t){const H=BAL.road.hp,F=BAL.ag.cx2.help.fail,pn=p===S?"ngươi":p.name;return `bị nhìn thấu (${chanceW(H.half)}): ${pn} quý ${t===S?"ngươi":t.name} ${balSg(-F)}, ${pvOan(p,H.sab.oan,"oán")}`}
/* ---- Nhờ giúp đỡ: the 4 answers of the receiver t to the asker p (one list for her card and the NPC's pick) ---- */
function rcvHelpOpts(p,t){const X=BAL.ag.cx2.help,R=BAL.rcv.help,H=BAL.road.hp,q=queenP(),me=t===S,half=Math.round(X.bac*R.half);
 const pay=(n)=>{if((me?S.bac:t.bac||0)<n)return false;if(me)apply({bac:-n});else ap(t,{bac:-n});if(p===S)apply({bac:n});else ap(p,{bac:n});return true};
 return [
  {i:0,id:"full",n:rcvKw(0),fx:{},x:`mất: ${X.bac} lượng bạc · được: ${rcvNm(p)==="ngươi"?"ngươi":p.name} quý ${me?"ngươi":t.name} ${balSg(R.af[0])}`,
   go:()=>{affAdd(p,t,R.af[0]);if(pay(X.bac))return{ok:1,r:p===S?`${t.name} cho ngươi mượn ${X.bac} lượng.`:me?`Ngươi cho ${p.name} mượn ${X.bac} lượng.`:`${t.name} cho ${p.name} mượn ${X.bac} lượng`};
    const x=evGuilty(p,others(p).filter(y=>y&&y!==p&&y!==t&&(y===S||y.alive)));if(x&&evA(p,x,BAL.ag.ev.one))return{ok:1,r:p===S?`${t.name} kể cho ngươi một chuyện về ${x.name}: ${evSg(BAL.ag.ev.one)}.`:`${rcvNm(t)} kể cho ${p.name} một chuyện về ${agcNm(x)}`};
    return{ok:1,r:p===S?`${t.name} tiếp ngươi ân cần.`:`${me?"Ngươi":t.name} tiếp ${p.name} ân cần`}}},
  {i:1,id:"half",n:rcvKw(1),risk:"có rủi ro",fx:{},x:`mất: ${half} lượng bạc · được: ${rcvNm(p)==="ngươi"?"ngươi":p.name} quý ${me?"ngươi":t.name} ${balSg(R.af[1])} · ${rcvSeenX(p,t)}`,
   go:()=>{if(!rcvSeen(p,t))affAdd(p,t,R.af[1]);if(pay(half))return{ok:1,r:p===S?`${t.name} miễn cưỡng đưa ngươi ${half} lượng.`:`${me?"Ngươi":t.name} đưa ${p.name} ${half} lượng cho có`};return{ok:1,r:p===S?`${t.name} tiếp ngươi qua loa.`:`${me?"Ngươi":t.name} tiếp ${p.name} qua loa`}}},
  rcvNoO(p,t,{g:"giữ bạc",r:p===S?`${t.name} khéo từ chối. Nàng quý ngươi -${X.fail}.`:me?`Ngươi khéo từ chối ${p.name}.`:`${t.name} khéo từ chối lời nhờ của ${p.name}`}),
  rcvSabO(p,t,{g:"giữ bạc",r:tq=>p===S?`${t.name} nhận lời rồi đem chuyện ngươi nhờ đi kể${tq?" với "+rcvQn(tq):""}. Danh ${balSg(-R.danh)}.`:me?`Ngươi đem chuyện ${p.name} nhờ đi kể${tq?" với "+rcvQn(tq):""}.`:`${t.name} đem chuyện ${p.name} nhờ đi kể khắp nơi`})]}
/* the asker's side (her j9 card and cx2:help): the receiver NPC answers now; when the receiver is HER, her card comes (PEND.rcvHelp) */
/* HER card: ONE notice path. With parallel-time's receiver notice (jptime ptOrdAdd: S.ordQ + «信» icon, answered from the panel when her act ends,
   unanswered past BAL.ptime.ansK = the option «Từ chối» with its cost) the card waits there; without it, a queued dialog after the current one. */
/* ONE NOTICE SYSTEM (MAIN 19/11 ~00:30Z, owner OD 18/11 ~22:10Z): without parallel-time, when the kit notice (jnotice kitNotice, review/stage-here) is present her
   card waits as ONE notice (the «!» box + top chip; the panel's option row opens the card). The card itself stays saveable: S.rcvPend {id,pid,pp,title}
   (re-raised as notices after a load). No kitNotice → the queued dialog as before. ptOrdAdd on → only its notice (no double notice). */
function rcvCard(pid,pp,title,p){try{if(typeof ptOrdAdd==="function"&&typeof ptOn==="function"&&ptOn()){if(ptOrdAdd(pid,pp,title,p))return""}}catch(e){}
 try{if(typeof window.kitNotice==="function"&&mkP(pid,pp)){S.rcvSeq=(S.rcvSeq||0)+1;const it={id:"rcv:"+S.rcvSeq,pid,pp,title};(S.rcvPend=S.rcvPend||[]).push(it);if(rcvNote(it))return"";S.rcvPend.pop()}}catch(e){}
 return pushDil(mkP(pid,pp),title)}
function rcvNote(it){const d=mkP(it.pid,it.pp);if(!d){rcvDrop(it.id);return null}const who=d.who&&d.who.n?d.who.n:"";const tx=String(d.t||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
 return window.kitNotice({id:it.id,line:`${it.title}${who?": "+who:""}`,text:tx,kind:"rcv",sticky:true,goLabel:"Trả lời",go:()=>rcvOpen(it.id)})}
function rcvDrop(id){S.rcvPend=(S.rcvPend||[]).filter(x=>x.id!==id);try{if(typeof kitNoticeDrop==="function")kitNoticeDrop(id)}catch(e){}}
function rcvOpen(id){const it=(S.rcvPend||[]).find(x=>x.id===id);rcvDrop(id);if(!it)return"";const d=mkP(it.pid,it.pp);if(!d)return"";pushDil(d,it.title);try{showModal()}catch(e){}return""}
/* after a load (S replaced) the pending answers are notices again (the notice list itself lives in memory only) */
(function(){const seen=new WeakSet();if(typeof render!=="function")return;const r0=render;render=function(){try{if(S&&!seen.has(S)){seen.add(S);if(typeof window.kitNotice==="function")for(const it of (S.rcvPend||[]).slice())rcvNote(it)}}catch(e){}return r0.apply(this,arguments)};window.render=render})();
function helpAsk(p,t){if(t===S){rcvCard("rcvHelp",{a:p.id},"Lời nhờ",p);return{ok:1,r:`${p.name} sai người sang nhờ ngươi giúp`}}
 const c=rcvPick(t,p,rcvHelpOpts(p,t),"help");return c.go()}
PEND.rcvHelp=pp=>{const p=RV(pp.a);if(!p||!p.alive||p.out)return null;
 return{who:pv(p),t:`<p>${p.name} sai người sang: “Nương nương nhà ta gặp chuyện khó, mong được giúp một tay.”</p><p class="past">Ngươi có thể giúp hết lòng, làm qua loa, từ chối, hoặc đem chuyện đi mách.</p>`,
  o:rcvHelpOpts(p,S).map(o=>({n:o.n,fx:o.fx,x:o.x,risk:o.risk,go:()=>{const r=o.go();if(r&&r.r)log(r.r)}}))}};
/* ---- a gift to an NPC (j8 giveTo): «take» / «check» (nothing found) keep it — giveTo stores it; «back» / «found» are done here. She answers with HER giftin answers (Nhận / Trả lại quà / Đem đến Thái y viện xét nghiệm), the same numbers ---- */
function rcvGiftIn(f,t,e){if(!t||t===S||t.coop||!e)return null;const it=itm(e.k),hi=rkOf(f)>rkOf(t);const tg=!!e.t;
 const O=[{i:[0,1],id:"take",go:()=>"take"},
  {i:2,id:"back",go:()=>{if(f===S)invAdd(S,Object.assign({},e));else{f.inv=f.inv||[];invAdd(f,Object.assign({},e))}relAdd(t,f,hi?BAL.eff.j8.go_2[0]:BAL.eff.j8.go_2[1]);return"back"}},
  {i:3,id:"check",lk:()=>(t.bac||0)<BAL.rcv.chk,go:()=>{ap(t,{bac:-BAL.rcv.chk});if(tg&&roll(oddsCl(oSee(t,true)+BAL.rcv.chkSee))){evA(t,f,BAL.eff.j8.evGo);if(typeof ilGone==="function")ilGone(t,Object.assign({},e),"evid",{own:key(f)});return `${t.name} đem ${it.n} của ${NM(f)} đến Thái y viện xét: đồ có vấn đề, nàng nắm ${balAb(BAL.eff.j8.evGo)} chứng cứ. `}
   relAdd(t,f,BAL.eff.j8.go_3);return"check"}}];
 const c=rcvPick(t,f,O,"gift");return c?c.go():null}
/* ---- ONE shape for every request / proposal (Nhờ, Kết giao, Lập phe, Xin / Mời vào phe, Ghé chơi, Hòa giải, Nhờ ơn người quen):
   slot 0 / 1 = yes (the act's own effect) · the asker quý the receiver af[0] / af[1]; slot 0 costs the receiver Sức BAL.rcv.prop.suc (she gives her time);
   slot 2 = no · both likings − BAL.ag.cx2.help.fail, the receiver's gain named by the act (bạc kept, Danh + prop.danh for keeping out of cliques …);
   slot 3 = mách lẻo · the Hoàng hậu quý the receiver qAf, the receiver Đức − road.hp.sab.duc, the asker oán + sab.oan and Danh − help.danh.
   fx on an option = what HER card shows and applies for her; for an NPC receiver go() applies the same fx (one number, both sides). ---- */
const rcvQ=(p,t)=>{const q=typeof queenP==="function"?queenP():null;return q&&q!==t&&q!==p?q:null};
const rcvQn=q=>q.queen?"Hoàng hậu":q.name;
const rcvAp=(x,fx)=>{if(x===S)apply(fx);else ap(x,fx)};
function rcvYesO(p,t,i,o){const R=BAL.rcv,me=t===S,af=R.help.af[i],suc=i?Math.round(R.prop.suc*R.help.half):R.prop.suc,pn=p===S?"ngươi":p.name;
 return{i,id:i?"half":"full",n:o.n||rcvKw(i),risk:i||o.risk?"có rủi ro":undefined,fx:Object.assign(suc?{suc:-suc}:{},o.fx||{}),lk:()=>!me&&suc&&(t.suc||0)<suc,
  x:`được: ${o.g?o.g+", ":""}${pn} quý ${me?"ngươi":t.name} ${balSg(af)}${suc||o.c?" · mất: "+[suc?`Sức ${balSg(-suc)}`:"",o.c||""].filter(Boolean).join(", "):""}${i?" · "+rcvSeenX(p,t):""}`,
  go:()=>{if(!me)rcvAp(t,Object.assign(suc?{suc:-suc}:{},o.fx||{}));const seen=i?rcvSeen(p,t):false;if(!seen)affAdd(p,t,af);let r=o.go?o.go():"";
   if(seen)r=(r?String(r).replace(/[.\s]*$/,"")+"; ":"")+`${pn==="ngươi"?"ngươi":pn} nhìn thấu là chỉ làm cho có`;return{ok:1,r}}}}
function rcvNoO(p,t,o){const F=BAL.ag.cx2.help.fail,me=t===S;
 return{i:2,id:"no",n:rcvKw(2),fx:o.fx||{},x:`được: ${o.g} · mất: hai bên quý nhau ${balSg(-F)}`,
  go:()=>{if(!me&&o.fx)rcvAp(t,o.fx);affAdd(t,p,-F);affAdd(p,t,-F);if(o.go)o.go();return{ok:0,r:o.r}}}}
function rcvSabO(p,t,o){const H=BAL.road.hp,R=BAL.rcv.help,me=t===S,tq=rcvQ(p,t),pn=p===S?"ngươi":p.name;
 return{i:3,id:"sab",n:(o.n||rcvKw(3))+(tq?` với ${rcvQn(tq)}`:""),fx:{duc:-H.sab.duc},
  x:`được: ${tq?rcvQn(tq)+" quý "+(me?"ngươi":t.name)+" "+balSg(R.qAf):o.g} · mất: Đức ${balSg(-H.sab.duc)}, ${pvOan(p,H.sab.oan,`${pn} oán`)} · ${p===S?"ngươi":pn} mang tiếng: Danh ${balSg(-R.danh)}`,
  go:()=>{if(!me)ap(t,{duc:-H.sab.duc});if(tq&&tq!==S)affAdd(tq,t,R.qAf);oanAdd(p,t,H.sab.oan);rcvAp(p,{danh:-R.danh});if(o.go)o.go();return{ok:0,r:typeof o.r==="function"?o.r(tq):o.r}}}}
/* the asks: RCVK[k] = {t card title, kind (BAL.rcv.k), line(p,x) her card text, ok(p,t,x) still possible, opts(p,t,x) the 4 answers}.
   rcvAsk(k, asker, receiver, x): an NPC receiver answers now (rcvPick); HER card comes as a queued dialog (PEND.rcvAsk, saved with the game) */
const RCVK={};
function rcvAsk(k,p,t,x){const D=RCVK[k];if(!D||!p||!t||p===t)return"";if(D.ok&&!D.ok(p,t,x))return"";
 if(t===S){rcvCard("rcvAsk",{k,a:key(p),x:x||null},D.t,p);return `${p.name} sai người sang ${D.act} ngươi. `}
 /* the co-op friend is a PLAYER (law 1): inside her accepted offer (jcoopworld invHer: he already tapped «Nhận» on his own card, COOPW.inv) his
    answer is that «Nhận» = the first (yes) option, never a roll for him (coop-ptime-reds: coop-thin-d «Kết giao» came back as «mách lẻo») */
 const O=D.opts(p,t,x);const c=t.coop&&window.COOPW&&COOPW.inv?O[0]:rcvPick(t,p,O,D.kind||"help");if(!c)return"";const r=c.go();const s=r&&typeof r==="object"?r.r:r;return rcvLine(t,p,c,s)}
/* ONE closing of an answer line (E-F4FAC, law 6c): an answer that spent her khắc always leaves a Sổ ghi line; an empty one reads as the option's own name; ends with exactly one full stop (the old
   .replace(/([^.!?])$/,"$1. ") saw the trailing space of «… phe Khổng gia. » and wrote «. .») */
function rcvLine(t,p,c,s){s=String(s||"").trim();if(!s)s=`${t===S?"Ngươi":t.name} đáp lời ${NM(p)}: ${String(c&&c.n||"đã nhận lời").toLowerCase()}`;return s.replace(/[.!?]*$/,m=>m||".")+" "}
PEND.rcvAsk=pp=>{const D=RCVK[pp.k],p=byKey(pp.a);if(!D||!p||p===S||!p.alive||(p.out&&!D.cold)/* cold-faction: a letter from lãnh cung still waits */||(D.ok&&!D.ok(p,S,pp.x)))return null;
 return{who:pv(p),t:D.line(p,pp.x),o:D.opts(p,S,pp.x).map(o=>({n:o.n,fx:o.fx,x:o.x,risk:o.risk,need:o.need,tsDis:o.tsDis,go:()=>{const r=o.go();const s=r&&typeof r==="object"?r.r:r;log(rcvLine(S,p,o,s))}}))}};
const rcvSg=(p,me,a,b)=>p===S?a:me?b:null;
/* Kết giao (j8 ACT.ally, NPC cx:ally): the asker sends BAL.actBac.ally bạc as the gift (paid when sent); yes / mách keep it, «từ chối» sends it back */
/* law 2 (equal value, review FAIL 6 #6): to kết giao is to take the asker's side — the asker's worst foe (rcvFoe: the most hostile living consort toward
   the asker) quý the receiver − BAL.eff.j8.f_2 (the mirror of the thiện cảm gained) and «kết bè» Danh − BAL.rcv.ally.danh; refusing keeps out of cliques
   (Danh + ally.danh) and that foe quý the receiver + f_2 × help.half. Qua loa: half of each (+ its seen-through risk). Same numbers for an NPC receiver. */
function rcvFoe(p,t){try{const L=consorts().filter(x=>x&&x!==p&&x!==t&&(x===S||x.alive!==false&&!x.out)&&!x.coop);let b=null,bh=0;for(const x of L){const h=hostility(x,p);if(h>bh){bh=h;b=x}}return b}catch(e){return null}}
const rcvFoeX=(f,t,n)=>f?`${f===S?"ngươi":f.name} (kẻ đối đầu của nàng) quý ${t===S?"ngươi":t.name} ${balSg(n)}`:"";
RCVK.ally={t:"Lời kết giao",act:"xin kết giao với",kind:"help",
 line:p=>`<p>${p.name} sai người mang ${BAL.actBac.ally} lượng bạc làm lễ sang: “Nương nương nhà ta muốn kết tình tỷ muội.”</p><p class="past">Kết giao là đứng về phía nàng: kẻ đối đầu của nàng sẽ ghét ngươi. Ngươi có thể nhận lời, nhận nửa lễ mà giữ khoảng cách, trả lễ từ chối, hoặc đem chuyện đi mách.</p>`,
 opts:(p,t)=>{const g=BAL.actBac.ally,H=BAL.rcv.help.half,hl=Math.round(g*H),me=t===S,keep=()=>rcvAp(t,{bac:g}),A=BAL.rcv.ally,F=BAL.eff.j8.f_2,fo=rcvFoe(p,t),fh=Math.round(F*H),dh=Math.round(A.danh*H);
  const foeAdd=n=>{if(fo)affAdd(fo,t,n)};return[
  rcvYesO(p,t,0,{n:"Nhận lời kết giao",fx:{danh:-A.danh},g:`lễ ${g} lượng, ${pvQuy(t,F,"thiện cảm")}${me?"":`, bớt ghen ${BAL.rcv.prop.ghen}`}`,c:[`kết bè: Danh ${balSg(-A.danh)}`,rcvFoeX(fo,t,-F)].filter(Boolean).join(", "),go:()=>{keep();relAdd(p,t,F);foeAdd(-F);if(!me)t.ghen=cl((t.ghen||0)-BAL.rcv.prop.ghen,0,100);return `${NMc(p)} kết giao với ${NM(t)}: <span class="g">thành</span>`}}),
  rcvYesO(p,t,1,{n:"Nhận nửa lễ, giữ khoảng cách",fx:dh?{danh:-dh}:{},g:`lễ ${hl} lượng (trả lại ${g-hl})`,c:[dh?`Danh ${balSg(-dh)}`:"",rcvFoeX(fo,t,-fh)].filter(Boolean).join(", "),go:()=>{rcvAp(t,{bac:hl});rcvAp(p,{bac:g-hl});foeAdd(-fh);return `${me?"Ngươi":t.name} nhận nửa lễ của ${NM(p)} nhưng giữ khoảng cách`}}),
  rcvNoO(p,t,{g:[`không dính bè phái, Danh ${balSg(A.danh)}`,rcvFoeX(fo,t,fh)].filter(Boolean).join(", "),fx:{danh:A.danh},go:()=>{rcvAp(p,{bac:g});foeAdd(fh)},r:`${me?"Ngươi":t.name} trả lễ, khéo từ chối kết giao với ${NM(p)}`}),
  rcvSabO(p,t,{g:`giữ lễ ${g} lượng`,go:keep,r:tq=>`${me?"Ngươi":t.name} nhận lễ của ${NM(p)} rồi đem chuyện đi kể${tq?" với "+rcvQn(tq):""}`})]}};
/* Lập phe cùng (j10 found: her button, NPC cx3:facFound) */
RCVK.facFound={t:"Lời rủ lập phe",act:"rủ lập phe với",kind:"help",ok:(p,t)=>facIn(p)&&facIn(t)&&!facOf(p)&&!facOf(t),/* cold-faction: founding needs both present */
 line:p=>`<p>${p.name} sai người sang: “Trong cung một cây làm chẳng nên non. Nương nương nhà ta muốn cùng người lập một phe, chia nhau tin tức, che chở nhau.”</p>`,
 opts:(p,t)=>{const me=t===S;return[
  rcvYesO(p,t,0,{n:"Nhận lời lập phe",g:"có phe cùng chia tin tức, chứng cứ",go:()=>found(p,t)}),
  rcvYesO(p,t,1,{n:"Hẹn để sau",g:"",go:()=>`${me?"Ngươi":t.name} hẹn ${NM(p)} để sau hẵng bàn chuyện lập phe`}),
  rcvNoO(p,t,{g:`không dính bè phái, Danh ${balSg(BAL.rcv.prop.danh)}`,fx:{danh:BAL.rcv.prop.danh},r:`${me?"Ngươi":t.name} khéo từ chối lập phe với ${NM(p)}`}),
  rcvSabO(p,t,{g:"không dính bè phái",r:tq=>`${me?"Ngươi":t.name} đem chuyện ${NM(p)} rủ lập phe đi kể${tq?" với "+rcvQn(tq):""}`})]}};
/* Xin vào phe (j10 askJoin: the receiver is the faction's leader) and Mời vào phe (j10 facInvite: the receiver is the one invited); x = the faction id */
const rcvFac=x=>(S.facs||[]).find(f=>f.id===x)||null;
/* cold-faction: the asker may write from lãnh cung (her letter card = an NPC's, j14 coldActsOf): the leader answers the letter (cold:1 lets PEND keep it);
   taking in a phế phi is a real cost: yes = Danh − BAL.rcv.prop.danh (the mirror of the «no» gain) */
RCVK.facJoin={t:"Xin vào phe",act:"xin vào phe của",kind:"help",cold:1,ok:(p,t,x)=>{const f=rcvFac(x);return !!f&&!facOf(p)&&facIn(t)&&facLeader(f)===t},
 line:(p,x)=>{const f=rcvFac(x);return facIn(p)?`<p>${p.name} sai người sang: “Nương nương nhà ta xin được đứng cùng ${f?f.name:"phe của người"}.”</p>`:`<p>Một lá thư từ lãnh cung lọt ra: ${p.name} xin được đứng cùng ${f?f.name:"phe của người"}, mong có người bên ngoài nói giúp.</p><p class="past">Nhận một phế phi vào phe thì phe mang tiếng.</p>`},
 opts:(p,t,x)=>{const f=rcvFac(x),me=t===S,lc=!facIn(p),D=BAL.rcv.prop.danh,lx=lc?{fx:{danh:-D},c:`nhận phế phi: Danh ${balSg(-D)}`}:{};return[
  rcvYesO(p,t,0,Object.assign({n:"Nhận vào phe",g:"phe thêm người",go:()=>joinFac(p,f)},lx)),
  rcvYesO(p,t,1,Object.assign({n:"Nhận cho có",g:"phe thêm người",go:()=>joinFac(p,f)},lx)),
  rcvNoO(p,t,{g:`phe giữ kín người, Danh ${balSg(BAL.rcv.prop.danh)}`,fx:{danh:BAL.rcv.prop.danh},r:`${me?"Ngươi":t.name} chưa nhận ${NM(p)} vào phe`}),
  rcvSabO(p,t,{g:"phe giữ kín người",r:tq=>`${me?"Ngươi":t.name} đem chuyện ${NM(p)} xin vào phe đi kể${tq?" với "+rcvQn(tq):""}`})]}};
RCVK.facInvite={t:"Lời mời vào phe",act:"mời vào phe",kind:"help",ok:(p,t)=>facIn(p)&&facIn(t)&&!!facOf(p)&&!facOf(t),
 line:p=>{const f=facOf(p);return `<p>${p.name} mời ngươi vào ${f?f.name:"phe của nàng"}. Vào thì cùng chia tin tức, chứng cứ, che chở nhau.</p>`},
 opts:(p,t)=>{const f=facOf(p),me=t===S;return[
  rcvYesO(p,t,0,{n:"Nhận lời vào phe",g:"có phe cùng chia tin tức, chứng cứ",go:()=>joinFac(t,f)}),
  rcvYesO(p,t,1,{n:"Hẹn để sau",g:"",go:()=>`${me?"Ngươi":t.name} hẹn ${NM(p)} để sau`}),
  rcvNoO(p,t,{g:`không dính bè phái, Danh ${balSg(BAL.rcv.prop.danh)}`,fx:{danh:BAL.rcv.prop.danh},r:`${me?"Ngươi":t.name} khéo từ chối lời mời của ${NM(p)}`}),
  rcvSabO(p,t,{g:"không dính bè phái",r:tq=>`${me?"Ngươi":t.name} đem chuyện ${NM(p)} mời vào phe đi kể${tq?" với "+rcvQn(tq):""}`})]}};
/* Ghé chơi (TW call): the host receives the visit (relation BAL.tw.g.call; the guest sees her shelf, jshelf) */
RCVK.call={t:"Có khách đến chơi",act:"ghé chơi cung",kind:"help",
 line:p=>`<p>${p.name} ghé chơi, đang đứng ngoài cửa cung chờ người thông báo.</p>`,
 opts:(p,t)=>{const me=t===S,g=BAL.tw.g.call,gh=Math.round(g*BAL.rcv.help.half),see=(h)=>{try{shelfSee(p,t,"ghé chơi");if(h&&t!==S)shelfSee(t,p,"ghé chơi")}catch(e){}};return[
  rcvYesO(p,t,0,{n:"Tiếp đón nồng hậu",g:`${pvQuy(t,g,"thiện cảm")}`,go:()=>{relAdd(p,t,g);see(1);return `${NMc(p)} ghé chơi cung ${NM(t)}, được tiếp đón nồng hậu`}}),
  rcvYesO(p,t,1,{n:"Tiếp qua loa",g:`${pvQuy(t,gh,"thiện cảm")}`,go:()=>{relAdd(p,t,gh);see(0);return `${NMc(p)} ghé chơi cung ${NM(t)}, được tiếp qua loa`}}),
  rcvNoO(p,t,{g:`giữ thể diện, Danh ${balSg(BAL.rcv.prop.danh)}`,fx:{danh:BAL.rcv.prop.danh},r:`${me?"Ngươi":t.name} cáo bận, không tiếp ${NM(p)}`}),
  rcvSabO(p,t,{n:"Tiếp rồi đem chuyện đi kể",g:"nghe được chuyện của khách",r:tq=>`${me?"Ngươi":t.name} tiếp ${NM(p)} rồi đem chuyện đi kể${tq?" với "+rcvQn(tq):""}`})]}};
/* Hòa giải (TW mediate): the receiver holds oán against x; the mediator asks her to let it go (oán − BAL.tw.g.mediate); x = key of the foe */
RCVK.mediate={t:"Lời hòa giải",act:"đứng ra hòa giải với",kind:"help",ok:(p,t,x)=>!!byKey(x),
 line:(p,x)=>{const f=byKey(x);return `<p>${p.name} sang: “Oan gia nên giải không nên kết. ${f?f.name:"Nàng ấy"} cũng đã biết lỗi, xin người bỏ qua.”</p>`},
 /* fix 2 (law 1): an NPC receiver whose oán toward x is at or over her own «nguoi» level cannot pick the yes answers (netForgive); her own answer stays her choice */
 opts:(p,t,x)=>{const f=byKey(x),me=t===S,m=BAL.tw.g.mediate,mh=Math.round(m*BAL.rcv.help.half),fn=f?NM(f):"",no=!me&&!t.coop&&f&&!netForgive(t,f);return[
  no?null:rcvYesO(p,t,0,{n:"Nghe lời, bỏ qua",g:`oán ${fn} ${balSg(-m)}`,go:()=>{if(f)oanAdd(t,f,-m);return `${NMc(p)} đứng ra hòa giải giữa ${NM(t)} và ${fn}`}}),
  no?null:rcvYesO(p,t,1,{n:"Nguôi một nửa",g:`oán ${fn} ${balSg(-mh)}`,go:()=>{if(f)oanAdd(t,f,-mh);return `${me?"Ngươi":t.name} nguôi giận ${fn} một nửa`}}),
  rcvNoO(p,t,{g:`giữ thể diện, Danh ${balSg(BAL.rcv.prop.danh)}`,fx:{danh:BAL.rcv.prop.danh},r:`${me?"Ngươi":t.name} không nghe lời hòa giải của ${NM(p)}`}),
  rcvSabO(p,t,{g:"giữ mối oán",r:tq=>`${me?"Ngươi":t.name} đem chuyện ${NM(p)} hòa giải đi kể${tq?" với "+rcvQn(tq):""}`})]}};
/* Nhờ ơn người quen rút thẻ bài (jecon ACT.blockf): the receiver is the acquaintance who owes the asker; x = key of the target.
   yes: the favour is spent (the acquaintance's thiện cảm with the asker − BAL.favorCost, as before) and the plot runs (caught / oBlock);
   «làm qua loa»: the same plot at the odds − BAL.road.hp.half (the L1876 «qua loa» minus: a half-hearted word to Kính sự phòng) */
/* rcvBlockGo (the plot itself) stays in jecon.js beside ACT.blockf (its rule numbers live there) */
RCVK.blockf={t:"Lời nhờ trả ơn",act:"nhờ trả ơn",kind:"help",ok:(p,v,x)=>{const t=byKey(x);return !!t&&!t.block&&t!==v},
 line:(p,x)=>{const t=byKey(x);return `<p>${p.name} sai người sang: “Ngày trước nương nương nhà ta từng giúp người. Nay xin người nói giúp một lời với Kính sự phòng, rút thẻ bài của ${t?NM(t):"một người"} vài hôm.”</p>`},
 opts:(p,v,x)=>{const t=byKey(x),me=v===S,tn=t?NM(t):"";return[
  rcvYesO(p,v,0,{risk:1,g:`trả xong ơn cũ (${p===S?"ngươi":p.name} bớt quý ${balSg(-BAL.favorCost)})`,c:`có thể bị lộ cùng ${p===S?"ngươi":p.name}`,go:()=>rcvBlockGo(p,v,t,0)}),
  rcvYesO(p,v,1,{g:"trả ơn cho có",c:"Kính sự phòng khó nghe hơn",go:()=>rcvBlockGo(p,v,t,BAL.road.hp.half)}),
  rcvNoO(p,v,{g:"không dính vào chuyện thẻ bài",r:`${me?"Ngươi":v.name} khéo từ chối, không nhúng tay vào thẻ bài của ${tn}`}),
  rcvSabO(p,v,{g:"không dính vào chuyện thẻ bài",r:tq=>`${me?"Ngươi":v.name} đem chuyện ${NM(p)} nhờ rút thẻ bài của ${tn} đi kể${tq?" với "+rcvQn(tq):""}`})]}};
/* Xin đồng minh (j83 illBuy "ally", her j83 card + NPC cx4:illAlly; review FAIL 6 #3): the HOLDER of a forbidden item is asked for it (x = the item key).
   yes = she hands it over and holds BAL.eff.j83.evIllBuy chứng cứ of the asker (as before) · qua loa = she lets it go for bạc (the item's price × help.half)
   · no = keeps it, out of đồ cấm · mách = keeps it, the Hoàng hậu holds BAL.ag.ev.one chứng cứ of the asker. She as the holder gets the card (PEND.rcvAsk). */
const rcvIllE=(t,k)=>(t&&t.inv||[]).find(e=>e.k===k&&!e.h&&!e.t);
function rcvIllGive(p,t,k){const e=rcvIllE(t,k);if(!e)return false;t.inv.splice(t.inv.indexOf(e),1);invAdd(p,{k,from:key(t)});/*evok: the asker has just asked for a forbidden item (illBuy deed)*/evA(t,p,BAL.eff.j83.evIllBuy);return true}
RCVK.illAlly={t:"Xin đồ cấm",act:"xin một món đồ cấm của",kind:"help",ok:(p,t,k)=>!!rcvIllE(t,k),
 line:(p,k)=>`<p>${p.name} sai người lén sang: “Nương nương nhà ta cần ${itm(k).n}, xin người nhường lại.”</p><p class="past">${itm(k).n}: ${(WILL[k]||{}).eff||"đồ cấm"}. Ai đưa đồ cấm cũng nắm chứng cứ của người xin.</p>`,
 opts:(p,t,k)=>{const me=t===S,pn=p===S?"ngươi":p.name,nm=itm(k).n,ev=BAL.eff.j83.evIllBuy,pr=Math.max(0,Math.min(Math.round((itm(k).pr||0)*BAL.rcv.help.half),(p===S?S.bac:p.bac)||0)),one=BAL.ag.ev.one;/* the bạc the asker can really pay (her card dropped the NPC lock: it promised bạc the asker did not have; reviewer #3) */
  const half=rcvYesO(p,t,1,{n:"Nhường lại, lấy chút bạc",g:`${pr?`bạc +${pr}, `:""}nắm ${balAb(ev)} chứng cứ của ${pn}`,c:`mất ${nm}`,go:()=>{if(!rcvIllGive(p,t,k))return"";const n=Math.max(0,Math.min(pr,(p===S?S.bac:p.bac)||0));rcvAp(p,{bac:-n});rcvAp(t,{bac:n});return `${me?"Ngươi":t.name} nhường ${nm} lại cho ${NM(p)}, lấy ${n} lượng`}});
  return[
  rcvYesO(p,t,0,{n:`Đưa ${nm} cho nàng`,g:`nắm ${balAb(ev)} chứng cứ của ${pn}`,c:`mất ${nm}`,go:()=>rcvIllGive(p,t,k)?`${me?"Ngươi":t.name} đưa ${nm} cho ${NM(p)}, nắm ${balAb(ev)} chứng cứ`:""}),
  half,
  rcvNoO(p,t,{g:`giữ ${nm}, không dính vào đồ cấm`,r:`${me?"Ngươi":t.name} khéo từ chối, không đưa đồ cấm cho ${NM(p)}`}),
  rcvSabO(p,t,{g:`giữ ${nm}`,go:()=>{const q=rcvQ(p,t);/*evok: the asker has just asked for a forbidden item*/if(q)evA(q,p,one)},r:tq=>`${me?"Ngươi":t.name} giữ ${nm}, đem chuyện ${NM(p)} xin đồ cấm đi kể${tq?" với "+rcvQn(tq)+` (nắm ${balAb(one)} chứng cứ)`:""}`})]}};
/* Mượn son phấn (jration lxBorrowCard: her talk card + NPC cx4:rougeBorrow; review FAIL 6 #1 / #4): the LENDER answers (x = the part she lacks).
   yes = half the box (lxGive "half", as before) · qua loa = a little, the box's lượt × help.half × help.half · no = keeps it · mách = keeps it, tells
   that the asker has run out. She as the lender gets the card (PEND.rcvAsk, saveable, the ONE notice path) — was a private 2-answer Q.push (lxAskHer). */
const rcvLxE=(t,part)=>typeof lxLend==="function"?lxLend(t,part):null;
RCVK.rougeBorrow={t:"Sang mượn son phấn",act:"xin chia son phấn với",kind:"help",ok:(p,t,part)=>!!part&&!!rcvLxE(t,part)&&lxMiss(p).includes(part),
 line:(p,part)=>{const e=rcvLxE(S,part),lbl=TOIL_COL[part].label.toLowerCase();return `<p>Cung nữ của ${rkName(p)} ${p.name} sang thưa: chủ tử nhà nàng hết ${lbl}, xin ngươi chia cho một ít.</p>${e?kitRows([["Rương ngươi",`${lxName(e)}, còn ${e.u} lần dùng`,"n"]]):""}`},
 opts:(p,t,part)=>{const me=t===S,e=rcvLxE(t,part),lbl=TOIL_COL[part].label.toLowerCase(),H=BAL.rcv.help.half,u=e?e.u:0,nh=Math.max(1,Math.ceil(u/2)),nl=Math.max(1,Math.round(u*H*H));
  const give=n=>{const x=rcvLxE(t,part);if(!x)return null;const g=lxGive(t,p,x,n);if(p!==S)lxFix(p);if(t!==S)lxFix(t);return g};return[
  rcvYesO(p,t,0,{n:"Chia cho nàng một nửa",c:`nửa hộp ${lbl} (${nh} lần dùng)`,go:()=>{const g=give("half");return g?`${me?"Ngươi":t.name} chia cho ${NM(p)} ${lxName(g)} (${g.u} lần dùng)`:""}}),
  rcvYesO(p,t,1,{n:"Chia chút ít cho có",c:`${nl} lần dùng ${lbl}`,go:()=>{const g=give(nl);return g?`${me?"Ngươi":t.name} chia cho ${NM(p)} chút ít ${lbl} (${g.u} lần dùng)`:""}}),
  rcvNoO(p,t,{g:`giữ hộp ${lbl}`,r:`${me?"Ngươi":t.name} khéo từ chối, không chia son phấn cho ${NM(p)}`}),
  rcvSabO(p,t,{g:`giữ hộp ${lbl}`,r:tq=>`${me?"Ngươi":t.name} giữ hộp ${lbl}, đem chuyện ${NM(p)} hết son phấn đi kể${tq?" với "+rcvQn(tq):""}`})]}};
/* Ngự giá lâm cung (jvisit visGo via the Emperor's plan emp:visit): an NPC consort answers with HER card's roads (j7 / jvisit PEND.empnight):
   Thắp đèn hầu rượu (the visit) · Phô tài (Sức − BAL.visit.show.suc, Sủng / Danh on success) · Khuyên ngài giữ long thể (Đức + adviseDuc, Sủng − adviseSung) */
function rcvVisit(p){if(!p||p===S||p.coop||typeof rcvPick!=="function")return"go";const V=BAL.visit;
 const c=rcvPick(p,"emp",[{i:[0,1],id:"go"},{i:1,id:"show",lk:()=>(p.suc||0)<V.show.suc},{i:[2,3],id:"adv"}],"emp");
 if(!c||c.id==="go")return"go";if(c.id==="show"){ap(p,{suc:-V.show.suc});if(roll(odA(p,V.show.o)))ap(p,{sung:V.show.sung,danh:V.show.danh});return"show"}
 ap(p,{duc:V.adviseDuc,sung:-V.adviseSung});return"adv"}
/* Mua chuộc cung nữ (j8 ACT.bribe) and Sai cung nữ thân tín lấy lòng (jecon ACT.bribel, pay 0): the maid of the target (her own maid S.maid too) CHOOSES
   among the maid player's own «Bạc lạ» answers — the SAME option list j42 cnvBribeOpts(maid, briber, master, pay) with its numbers (take: the pay to
   the maid, she becomes the briber's tai mắt · tell: Chủ tin + BAL.coopBribe.tin, the master holds BAL.ag.ev.one chứng cứ, liking − ev.rel · quiet),
   weighed by the ONE jagstf2 rule stf2BribeW (incl. her nết stf2Tr) → applied here (stfAp + go, as stf2Do), returns the id */
function rcvMaidBribe(a,t,odds,pay){const m=t&&t.maid;if(!m||typeof cnvBribeOpts!=="function")return null;const O=cnvBribeOpts(m,a,t,pay||0);
 const c=mindPick(stf2BribeW(m,O,odds),m)||O[0];(window.__rcvN=window.__rcvN||{})["maid_"+c.id]=((window.__rcvN||{})["maid_"+c.id]||0)+1;
 stfAp(m,c.fx);if(c.go)c.go();return c.id}

/* ---- a request to a JUDGE (law 1, review FAIL 6 #3): «Xin Hoàng hậu giáng» (xinhh) and «Trình Hoàng hậu» (trinhhh; live executors jaudit X.f / T.f) ask the Hoàng hậu to decide.
   She as the Hoàng hậu (queenP() === S) gets the card (PEND.rcvJudge, no roll for her); an NPC queen answers with the SAME option list, the yes answer at
   the odds the asker's card shows (ACT[k].o, the shown-odds one path — no mindPick slip on a shown number). Numbers: BAL.rcv.judge + the acts' own keys. ---- */
const RCVJ={};
function rcvJudge(k,a,t,o0){const D=RCVJ[k],q=typeof queenP==="function"?queenP():null;if(!D||!q||q===a||q===t)return"";
 if(q===S){rcvCard("rcvJudge",{k,a:key(a),t:key(t)},D.t,a);return D.say(a,t)}
 const c=rcvOddsPick(q,D.opts(a,t,q),o0!=null?o0:ACT[k].o(a,t),k);/* jaudit X.f / T.f pass the odds they read (odA, the card's number) */return c.go()||""}
/* the NPC receiver's pick between the yes / no answers of a request whose asker's card shows ODDS (judge requests, Mượn son phấn): yes at those
   shown odds o (the shown-odds one path; o0 = the odds read before the act spent anything — trinhhh hands over its chứng cứ first), the SAME option list as her card */
function rcvOddsPick(q,O,o,k){const c=roll(o)?O[0]:O[1];(window.__rcvN=window.__rcvN||{})["judge_"+k+"_"+c.id]=((window.__rcvN||{})["judge_"+k+"_"+c.id]||0)+1;return c}
PEND.rcvJudge=pp=>{const D=RCVJ[pp.k],a=byKey(pp.a),t=byKey(pp.t);if(!D||!a||!t||a===S||t===S||!a.alive||a.out||t.out||t.alive===false||queenP()!==S||(D.ok&&!D.ok(a,t)))return null;
 return{who:pv(a),t:D.line(a,t),o:D.opts(a,t,S).map(o=>({n:o.n,fx:o.fx,x:o.x,risk:o.risk,go:()=>{const r=o.go();if(r)log(r)}}))}};
RCVJ.xinhh={t:"Lời xin giáng",say:(a,t)=>`${NMc(a)} sai người dâng lễ, xin ngươi tâu giáng ${NM(t)}. `,
 line:(a,t)=>`<p>${a.name} sai người dâng ${rcvXinPr(a,t)} lượng bạc làm lễ: “Xin nương nương tâu với Hoàng thượng giáng ${t.name} một phẩm.”</p>`,
 opts:(a,t,q)=>{const me=q===S,J=BAL.rcv.judge,P=BAL.rcv.prop,pr=rcvXinPr(a,t),qn=me?"Ngươi":"Hoàng hậu";return[
  {id:"yes",n:"Nhận lễ, tâu xin giáng",fx:{bac:pr,duc:-J.duc},x:`được: lễ ${pr} lượng · mất: Đức ${balSg(-J.duc)}, ${t.name} oán ${me?"ngươi":"Hoàng hậu"} ${balSg(J.oan)}`,
   go:()=>{if(!me)ap(q,{bac:pr,duc:-J.duc});econPayWin(a,"xinhh",t,BAL.actBac.xinhh);oanAdd(t,q,J.oan);return `${qn} nghe lời ${NM(a)}, tâu xin giáng ${NM(t)}. `+demote(t,"bị Hoàng hậu tâu giáng")}},
  {id:"no",n:"Gạt đi, trả lễ",fx:{danh:P.danh},x:`được: tiếng công minh, Danh ${balSg(P.danh)} · mất: ${me?"ngươi":"Hoàng hậu"} quý ${a.name} ${balSg(BAL.eff.jaudit.f)}`,
   go:()=>{if(!me)ap(q,{danh:P.danh});affAdd(q,a,BAL.eff.jaudit.f);return `${qn} gạt lời ${NM(a)} đi, lễ vật trả lại. `}}]}};
/* Xin son phấn (jration lxBegCard, kind "hh"; NPC cx4:rougeBeg): the Hoàng hậu decides — she as the Hoàng hậu gets the card; t = the asker (no third person).
   yes = a box from the palace stores (the same item an NPC queen gives) · the asker quý her af[0]; no = the asker's Hoàng hậu regard − BAL.ration.beg.fail (as today) · Danh + prop.danh */
RCVJ.rougeBeg={t:"Xin son phấn",ok:a=>lxMiss(a).length>0,say:a=>`${NMc(a)} sai người sang xin ngươi ban son phấn. `,
 line:a=>{const M=lxMiss(a);return `<p>Cung nữ của ${a.name} sang thưa: chủ tử nhà nàng hết ${M[0]?TOIL_COL[M[0]].label.toLowerCase():"son phấn"}, xin nương nương ban cho.</p>`},
 opts:(a,t,q)=>{const me=q===S,B=BAL.ration.beg,P=BAL.rcv.prop,af=BAL.rcv.help.af[0],M=lxMiss(a),part=M[0],tr=BAL.ration.tier[Math.min(7,a.rank||0)],lbl=part?TOIL_COL[part].label.toLowerCase():"son phấn";return[
  {id:"yes",n:"Ban một hộp",fx:{},x:`được: ${a.name} quý ${me?"ngươi":"Hoàng hậu"} ${balSg(af)} · mất: một hộp ${lbl} trong kho cung`,
   go:()=>{if(!part)return"";affAdd(a,q,af);let n;if(a===S)n=goodsGive(S,lxKey(part,tr),{from:"hh"});else{const e={k:lxKey(part,tr),from:"hh",d:S.turn};invAdd(a,e);n=lxName(e)}lxFix(a);return `${me?"Ngươi":"Hoàng hậu"} ban cho ${lxNm(a)} ${n}.`}},
  {id:"no",n:"Không ban",fx:{danh:P.danh},x:`được: giữ phép, Danh ${balSg(P.danh)} · mất: ${a.name} được lòng ${me?"ngươi":"Hoàng hậu"} ${balSg(B.fail)}`,
   go:()=>{if(!me)ap(q,{danh:P.danh});if(a===S)apply({hh:B.fail});else ap(a,{hh:B.fail});return `${me?"Ngươi":"Hoàng hậu"} cho là ${lxNm(a)} không biết giữ phận.`}}]}};
function rcvXinPr(a,t){return (typeof econSchemePrice==="function"?econSchemePrice("xinhh",a,t):0)||BAL.actBac.xinhh}
RCVJ.trinhhh={t:"Trình chứng cứ",say:(a,t)=>`${NMc(a)} trình chứng cứ về ${NM(t)} lên ngươi. `,
 line:(a,t)=>`<p>${a.name} dâng lên chứng cứ về ${t.name}: “Xin nương nương xét tội cho công bằng.”</p>`,
 opts:(a,t,q)=>{const me=q===S,J=BAL.rcv.judge,P=BAL.rcv.prop,af=BAL.rcv.help.af[1],qn=me?"Ngươi":"Hoàng hậu";return[
  {id:"yes",n:"Xét tội theo chứng cứ",fx:{danh:P.danh},x:`được: tiếng công minh, Danh ${balSg(P.danh)} · mất: ${t.name} oán ${me?"ngươi":"Hoàng hậu"} ${balSg(J.oan)}`,
   go:()=>{if(!me)ap(q,{danh:P.danh});oanAdd(t,q,J.oan);punish(t,"bị Hoàng hậu xét tội theo chứng cứ",1);affAdd(t,a,BAL.eff.jaudit.f_2);return `${j78Who(a)} trình chứng cứ lên ${me?"ngươi":"Hoàng hậu"}: ${j78who(t)} bị xét tội. `}},
  {id:"no",n:"Bác chứng cứ",fx:{},x:`được: ${t.name} quý ${me?"ngươi":"Hoàng hậu"} ${balSg(af)} · mất: ${me?"ngươi":"Hoàng hậu"} quý ${a.name} ${balSg(BAL.eff.jaudit.f_3)}`,
   go:()=>{affAdd(t,q,af);affAdd(q,a,BAL.eff.jaudit.f_3);return `${qn} bác chứng cứ ${j78who(a)} trình về ${j78who(t)}. `}}]}};
/* ---- Mời đến cung ta (j21 her invite, AG cx3:invite2 the NPC host; landing p3InvLand / the parallel-time runner): the guest answers with the 4 answers.
   x = nothing; yes / qua loa = the guest is at the host's palace this buổi (rcvInvAt). rcvInviteGo(h,g) = an NPC guest's answer → true if she comes ---- */
function rcvInvAt(h,g){try{const k=h===S?"home":palaceOf(h);if(g!==S){S.where[g.id]=k;if(h===S)seeLoc(g,k)}if(h!==S){S.where[h.id]=palaceOf(h);if(g===S)seeLoc(h,palaceOf(h))}}catch(e){}}
RCVK.invite={t:"Lời mời sang chơi",act:"mời sang cung chơi",kind:"help",ok:(p,t)=>!!p&&!!t&&t.alive!==false&&!t.out&&!t.confined,
 line:p=>`<p>${p.name} sai người sang mời: “Nương nương nhà ta pha trà chờ, mời người sang cung chơi buổi này.”</p>`,
 opts:(p,t)=>{const me=t===S,g=BAL.tw.g.call,gh=Math.round(g*BAL.rcv.help.half);return[
  rcvYesO(p,t,0,{n:"Nhận lời, sang chơi",g:`${pvQuy(t,g,"thiện cảm")}`,go:()=>{relAdd(p,t,g);rcvInvAt(p,t);t.__invC=1;return `${me?"Ngươi":t.name} nhận lời, sang cung ${NM(p)} chơi`}}),
  rcvYesO(p,t,1,{n:"Ghé qua cho có",g:`${pvQuy(t,gh,"thiện cảm")}`,go:()=>{relAdd(p,t,gh);rcvInvAt(p,t);t.__invC=1;return `${me?"Ngươi":t.name} ghé qua cung ${NM(p)} cho có`}}),
  rcvNoO(p,t,{g:`giữ buổi cho mình, Danh ${balSg(BAL.rcv.prop.danh)}`,fx:{danh:BAL.rcv.prop.danh},r:`${me?"Ngươi":t.name} cáo bận, không sang cung ${NM(p)}`}),
  rcvSabO(p,t,{g:"nghe được chuyện của chủ nhà",r:tq=>`${me?"Ngươi":t.name} nhận lời rồi đem chuyện cung ${NM(p)} đi kể${tq?" với "+rcvQn(tq):""}`,go:()=>{rcvInvAt(p,t);t.__invC=1}})]}};
function rcvInviteGo(h,g){if(!g||g===S)return false;delete g.__invC;const r=rcvAsk("invite",h,g);if(r)try{log(r.trim())}catch(e){}const c=!!g.__invC;delete g.__invC;return c}
Object.assign(window,{rcvNote,rcvOpen,rcvDrop,rcvFoe,rcvIllGive,rcvP,rcvW,rcvWord,rcvPick,rcvHelpOpts,helpAsk,rcvGiftIn,RCVK,rcvCard,rcvAsk,rcvYesO,rcvNoO,rcvSabO,rcvVisit,rcvMaidBribe,rcvKw,rcvSeen,rcvSeenX,RCVJ,rcvJudge,rcvOddsPick,rcvInviteGo,rcvInvAt});
