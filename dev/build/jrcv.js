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
/* ---- Nhờ giúp đỡ: the 4 answers of the receiver t to the asker p (one list for her card and the NPC's pick) ---- */
function rcvHelpOpts(p,t){const X=BAL.ag.cx2.help,R=BAL.rcv.help,H=BAL.road.hp,q=queenP(),me=t===S,half=Math.round(X.bac*R.half);
 const pay=(n)=>{if((me?S.bac:t.bac||0)<n)return false;if(me)apply({bac:-n});else ap(t,{bac:-n});if(p===S)apply({bac:n});else ap(p,{bac:n});return true};
 const tq=q&&q!==t&&q!==p?q:null;
 return [
  {i:0,id:"full",n:BAL.rcv.kw[0],fx:{},x:`mất: ${X.bac} lượng bạc · được: ${rcvNm(p)==="ngươi"?"ngươi":p.name} quý ${me?"ngươi":t.name} ${balSg(R.af[0])}`,
   go:()=>{affAdd(p,t,R.af[0]);if(pay(X.bac))return{ok:1,r:p===S?`${t.name} cho ngươi mượn ${X.bac} lượng.`:me?`Ngươi cho ${p.name} mượn ${X.bac} lượng.`:`${t.name} cho ${p.name} mượn ${X.bac} lượng`};
    const x=evGuilty(p,others(p).filter(y=>y&&y!==p&&y!==t&&(y===S||y.alive)));if(x&&evA(p,x,BAL.ag.ev.one))return{ok:1,r:p===S?`${t.name} kể cho ngươi một chuyện về ${x.name}: ${evSg(BAL.ag.ev.one)}.`:`${rcvNm(t)} kể cho ${p.name} một chuyện về ${agcNm(x)}`};
    return{ok:1,r:p===S?`${t.name} tiếp ngươi ân cần.`:`${me?"Ngươi":t.name} tiếp ${p.name} ân cần`}}},
  {i:1,id:"half",n:BAL.rcv.kw[1],fx:{},x:`mất: ${half} lượng bạc · được: quý ${balSg(R.af[1])}`,
   go:()=>{affAdd(p,t,R.af[1]);if(pay(half))return{ok:1,r:p===S?`${t.name} miễn cưỡng đưa ngươi ${half} lượng.`:`${me?"Ngươi":t.name} đưa ${p.name} ${half} lượng cho có`};return{ok:1,r:p===S?`${t.name} tiếp ngươi qua loa.`:`${me?"Ngươi":t.name} tiếp ${p.name} qua loa`}}},
  {i:2,id:"no",n:BAL.rcv.kw[2],fx:{},x:`được: giữ bạc · mất: hai bên quý nhau ${balSg(-X.fail)}`,
   go:()=>{affAdd(t,p,-X.fail);affAdd(p,t,-X.fail);return{ok:0,r:p===S?`${t.name} khéo từ chối. Nàng quý ngươi -${X.fail}.`:me?`Ngươi khéo từ chối ${p.name}.`:`${t.name} khéo từ chối lời nhờ của ${p.name}`}}},
  {i:3,id:"sab",n:BAL.rcv.kw[3]+(tq?` với ${tq.queen?"Hoàng hậu":tq.name}`:""),fx:{duc:-H.sab.duc},x:`được: ${tq?(tq.queen?"Hoàng hậu":tq.name)+" quý "+(me?"ngươi":t.name)+" "+balSg(R.qAf):"giữ bạc"} · mất: Đức ${balSg(-H.sab.duc)}, ${p===S?"ngươi":p.name} oán ${balSg(H.sab.oan)}, Danh ${p===S?"ngươi":p.name} ${balSg(-R.danh)}`,
   go:()=>{if(!me)ap(t,{duc:-H.sab.duc});if(tq&&tq!==S)affAdd(tq,t,R.qAf);oanAdd(p,t,H.sab.oan);if(p===S)apply({danh:-R.danh});else ap(p,{danh:-R.danh});
    return{ok:0,r:p===S?`${t.name} nhận lời rồi đem chuyện ngươi nhờ đi kể${tq?" với "+(tq.queen?"Hoàng hậu":tq.name):""}. Danh ${balSg(-R.danh)}.`:me?`Ngươi đem chuyện ${p.name} nhờ đi kể${tq?" với "+(tq.queen?"Hoàng hậu":tq.name):""}.`:`${t.name} đem chuyện ${p.name} nhờ đi kể khắp nơi`}}}]}
/* the asker's side (her j9 card and cx2:help): the receiver NPC answers now; when the receiver is HER, her card comes (PEND.rcvHelp) */
function helpAsk(p,t){if(t===S){pushDil(mkP("rcvHelp",{a:p.id}),"Lời nhờ");return{ok:1,r:`${p.name} sai người sang nhờ ngươi giúp`}}
 const c=rcvPick(t,p,rcvHelpOpts(p,t),"help");return c.go()}
PEND.rcvHelp=pp=>{const p=RV(pp.a);if(!p||!p.alive||p.out)return null;
 return{who:pv(p),t:`<p>${p.name} sai người sang: “Nương nương nhà ta gặp chuyện khó, mong được giúp một tay.”</p><p class="past">Ngươi có thể giúp hết lòng, làm qua loa, từ chối, hoặc đem chuyện đi mách.</p>`,
  o:rcvHelpOpts(p,S).map(o=>({n:o.n,fx:o.fx,x:o.x,go:()=>{const r=o.go();if(r&&r.r)log(r.r)}}))}};
/* ---- a gift to an NPC (j8 giveTo): «take» / «check» (nothing found) keep it — giveTo stores it; «back» / «found» are done here. She answers with HER giftin answers (Nhận / Trả lại quà / Đem đến Thái y viện xét nghiệm), the same numbers ---- */
function rcvGiftIn(f,t,e){if(!t||t===S||t.coop||!e)return null;const it=itm(e.k),hi=rkOf(f)>rkOf(t);const tg=!!e.t;
 const O=[{i:[0,1],id:"take",go:()=>"take"},
  {i:2,id:"back",go:()=>{if(f===S)S.inv.push(Object.assign({},e));else{f.inv=f.inv||[];f.inv.push(Object.assign({},e))}relAdd(t,f,hi?BAL.eff.j8.go_2[0]:BAL.eff.j8.go_2[1]);return"back"}},
  {i:3,id:"check",lk:()=>(t.bac||0)<BAL.rcv.chk,go:()=>{ap(t,{bac:-BAL.rcv.chk});if(tg&&roll(oddsCl(oSee(t,true)+25))){evA(t,f,BAL.eff.j8.evGo);if(typeof ilGone==="function")ilGone(t,Object.assign({},e),"evid",{own:key(f)});return"found"}
   relAdd(t,f,BAL.eff.j8.go_3);return"check"}}];
 const c=rcvPick(t,f,O,"gift");return c?c.go():null}
Object.assign(window,{rcvP,rcvW,rcvWord,rcvPick,rcvHelpOpts,helpAsk,rcvGiftIn});
