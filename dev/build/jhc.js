
/* ================= jhc: HẬU CUNG = mọi người trong cung · GIAO TÌNH = ân oán + phe phái (owner 11/15 04:15Z–06:00Z, review/hau-cung-ui) — KIT §36 =================
   1. Main tabs: Hành sự · Dư đồ · Hậu cung · Giao tình · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện.
      Hậu cung (group hc) sub-tabs: Hoàng thượng · Thái hậu (court) | Phi tần (rv) | Nam nhân (men) | Cung nhân (staff).
      Giao tình (group gt) sub-tabs: Ân oán (rel) | Phe phái (fac). The game's tab keys stay, so every [data-tab] link and old save keeps working.
   2. Ân oán: one row per person = THẺ QUAN HỆ 3 CỘT (kitRel3): portrait | relation bars | "Đã biết" bullets.
   3. Relation words (owner 05:25Z): "Nàng quý ngươi: <mức> · n", "Nàng oán ngươi: n", "Ngươi quý nàng …", "Ngươi oán nàng …" (role names where natural).
   4. Người chạy việc (was "Sai đi: …"): one line on the maid card, tap = what it means, "Đổi ›" lets her choose.
   5. Men: unique given names; the Nam nhân sub-tab lists only men she has met. */
(function(){
const T=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
/* ---------- 3. relation words ---------- */
window.quyW=function(v){return v<=-30?"Ghét":v<-10?"Không ưa":v<=10?"Bình thường":v<30?"Có cảm tình":v<60?"Quý mến":"Thân thiết"};
const sg=n=>(n>0?"+":"")+Math.round(n);
try{Object.assign(KIT_GLOSS,{
 "Quý":"Người này quý người kia bao nhiêu (từ -100 đến 100; âm là không ưa, ghét). Cao thì giúp đỡ, che chở; thấp thì gây khó dễ.",
 /* owner 11/15 (VANPHONG "Thiện cảm" / "Oán"): two separate stats, the gloss on tap of every kitRelRow label */
 "Thiện cảm":"Thiện cảm: có chịu giúp, kết giao với ta không.",
 "Oán":"Oán: mối hận vì việc ta đã làm, có muốn trả đũa ta không; nguôi dần mỗi tháng.",
 "Quen biết":"Ngươi biết người này đến đâu: Người lạ → Mới thấy mặt → Biết tên → Đã quen. Gặp mặt trò chuyện, hỏi kẻ hầu, dò la thì quen thêm; đã quen mới thấy tính nết, sủng ái, quan hệ của họ và làm được các việc riêng với họ.",
 "Người chạy việc":"Khi ngươi sai người dò la, đưa thư, mua đồ…, người này đi. Game chọn kẻ hầu có Lòng và tài cao nhất; ngươi có thể đổi người."})}catch(e){}
const gl=(k,l)=>typeof kitGloss==="function"?kitGloss(k,l):l;
/* signed bar (owner via review 11/15: "-3" drew half a red bar): a track with a clear midline at 0; the fill grows FROM the midline toward the
   sign (left red = dislike, right green = liking), length ∝ |v|; "Ghét" / "Thân" end marks are the level words around it */
function sbar(v,lo,hi){lo=lo==null?-100:lo;hi=hi==null?100:hi;const x=Math.max(lo,Math.min(hi,+v||0));const h=x>=0?x/hi*50:x/lo*50;
 return `<span class="ksbar" aria-hidden="true"><i class="ksb-mid"></i><u class="${x>=0?"g":"r"}" style="${x>=0?"left:50%":"right:50%"};width:${h.toFixed(1)}%"></u><i class="ksb-mk ${x>=0?"g":"r"}" style="left:${(50+(x>=0?h:-h)).toFixed(1)}%"></i></span>`}
window.kitSignedBar=sbar;
/* the 0..max bar of the same size and place (oán, sủng, ân tình): fills from the left, no midline, marker at the value */
function pbar(v,hi,good){hi=hi||100;const x=Math.max(0,Math.min(hi,+v||0)),w=x/hi*100;
 return `<span class="ksbar ksbp" aria-hidden="true"><u class="${good?"g":"r"}" style="left:0;width:${w.toFixed(1)}%"></u><i class="ksb-mk ${good?"g":"r"}" style="left:${w.toFixed(1)}%"></i></span>`}
window.kitPosBar=pbar;
/* KIT §49.1 kitRelRow (owner 11/15): ONE relation row everywhere.
   line 1 = the label "<A> → <B>: thiện cảm|oán" in the KIT_REL colour (purple: someone → ta, blue: ta → someone, ink: between two others);
   line 2 = "<word> · <number>" then the bar on the SAME line; the word column and the bar have fixed widths, so every row's bar starts and
   ends at the same x. thiện cảm (−100..100) = kitSignedBar (midline at the centre, green right / red left); oán (0..100) = kitPosBar + the
   oán word ladder (oanW: BAL.oanLv thresholds, words in VANPHONG). kind "pos" = another 0..max value (sủng, ân tình), optional word. */
const KIT_REL={in:"#7a4fa0",out:"#3f62a8",x:"#6a5040"};window.KIT_REL=KIT_REL;
const OANW=["Không oán","Chút oán","Oán","Oán sâu","Oán hận"];
window.oanW=function(v){const L=(typeof BAL==="object"&&BAL.oanLv)||[5,20,45,75];let i=0;while(i<L.length&&(+v||0)>=L[i])i++;return OANW[i]};
/* kitRelRow (bars, mixed rows) is retired: every relation is drawn by kitRel2 (jkrel.js, KIT §52) */
/* who "nàng" is, in words: the Empress by title, others "nàng" */
const subjOf=v=>v&&v.queen?"Hoàng hậu":"Nàng";
const objOf=v=>v&&v.queen?"Hoàng hậu":"nàng";
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

/* ---------- 2. Đã biết as bullets (newest first) ---------- */
function knownList(v){const out=[],seen=new Set();if(!v||v===S)return out;
 const nm=v.name,rk=typeof rkName==="function"?rkName(v):"";
 const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 const short=t=>{let s=T(t).replace(/\.\s*$/,"");s=s.replace(new RegExp("^(?:"+esc(rk)+"\\s+)?"+esc(nm)+"\\s+"),"");s=s.replace(new RegExp("(?:"+esc(rk)+"\\s+)?"+esc(nm),"g"),"nàng");s=s.replace(/^nàng\s+/i,"");return cap(s)};
 const add=(fact,src,when,how)=>{const f=short(fact);if(!f||f.length<3)return;const k=f.replace(/\d+/g,"#").toLowerCase();if(seen.has(k))return;seen.add(k);out.push({f,src:T(src),when:T(when),how:T(how||"")})};
 try{const L=typeof intelOf==="function"?intelOf(v):[];for(let i=L.length-1;i>=0;i--){const x=L[i];if(x.current===false)continue;add(x.fact,x.by&&typeof x.by==="object"?x.by.name:x.by,x.when,x.how)}}catch(e){}
 try{kn();for(const n of (S.notes[v.id]||[])){let t=T(n),when="",src="";const m=t.match(/^(T\d+\/\d+ \S+ tuần):\s*/);if(m){when=m[1];t=t.slice(m[0].length)}
   const s2=t.match(/^([^:]{2,30}?) (dò được|kể|báo|nghe được):\s*/);if(s2){src=s2[1]+" "+s2[2];t=t.slice(s2[0].length)}
   let how="";const s3=t.match(/^(Dò được|Chuyện trò|Dâng quà hợp ý|Dâng quà sai ý|Bị từ chối quà):\s*/);if(s3){how=s3[1];t=t.slice(s3[0].length)}/* pcard-facts: the "how" is detail (tap), never a prefix of the fact */
   t.split(kRx("(?<=\\.)\\s+","")).forEach(x=>add(x.replace(/\.$/,""),src,when,how))}}catch(e){}
 return out}
window.kitKnownList=knownList;
function knownCol(v,max){const L=knownList(v);if(!L.length)return `<div class="kr3r"><b class="kr3h">Đã biết về ${v.name}</b><p class="kr3none">Chưa biết gì thêm. Dò la, hỏi kẻ hầu để biết.</p></div>`;
 const li=L.slice(0,max||4).map(x=>`<li><span>${typeof kitFactTap==="function"?kitFactTap(x.f,x):x.f}</span></li>`).join("");
 return `<div class="kr3r"><b class="kr3h">Đã biết về ${v.name}</b><ul class="kr3l">${li}</ul>${L.length>(max||4)?`<button class="chip kchipb kr3more" data-kintel="${v.id}">Xem thêm ${L.length-(max||4)} điều ›</button>`:""}</div>`}

/* ---------- THẺ QUAN HỆ 3 CỘT ---------- */
function rel3(face,rank,name,col,mid,right,extra){
 return `<div class="krel3${right==null||right===""?" kr3two":""}"><div class="kr3p">${kitNameRank(rank,name,col||"#7a5530")}<div class="kr3f">${pcPort(face,col)}</div></div>`+
  `<div class="kr3m">${mid}${extra||""}</div>${right==null?"":right}</div>`}
window.kitRel3=rel3;
const fcol=f=>(f&&f.col)||"#7a5530";
/* who is who in a relation label: the player "ta", the Empress by title, the Emperor / Thái hậu by title, others by their short name */
const whoL=p=>p===S?"ta":p==="emp"?"Hoàng thượng":p==="th"?"Thái hậu":p&&p.queen?"Hoàng hậu":shortN(p.name);
const capL=s=>s==="ta"?"Ta":s;
/* KIT §49.3 relPerson(k): ONE helper — the person object, the face drawn from THAT object, the name, the rank, the colour. Strangers
   (not met: knows(v) false — the same test that writes "Ta chưa gặp …") get the shared grey silhouette (kitStrangerOf, j61), the name stays. */
function relPerson(k){
 if(k==="me"){const f=pMe();return{k,p:S,f,name:"Ta",rank:S.out?"Phế phi":RANKS[S.rank].n,col:fcol(f),pid:"me"}}
 if(k==="emp"){const f=pEmp();return{k,p:"emp",f,name:"Hoàng thượng",rank:"",col:fcol(f),pid:"emp"}}
 if(k==="th"){const f=pTH();return{k,p:"th",f,name:"Thái hậu",rank:"",col:fcol(f),pid:"th"}}
 const v=(rivals||[]).find(x=>String(x.id)===String(k));if(!v)return null;const met=typeof isKnown61==="function"?isKnown61(v):knows(v);const f=met?pv(v):kitStrangerOf(v);
 return{k:v.id,p:v,f,name:v.name,rank:rkName(v),col:met?fcol(f):"#8a8a8a",met,pid:typeof kOf61==="function"?kOf61(v):String(v.id)}}
window.relPerson=relPerson;
/* KIT §49.2 (owner 11/15): Ân oán = "Xem quan hệ của X" (strip 1) + "với Y" (strip 2) — both the Hậu cung pager strip (pager, j15: ‹ ›,
   N/M, selected highlight), grouped Ta · Chí tôn · Phi tần, labels = the name only. The panel shows ONE pair under the heading
   "Quan hệ giữa X và Y": X | the rows both ways | Y, then "Đã biết về X". Y defaults to Ta (her own relation with X); when X = Ta, Y
   defaults to the first person of strip 2. Never a hidden counterpart. PG.rel ↔ relSel (an outside link that sets relSel still works). */
const relGrp=k=>k==="me"?"Ta":k==="emp"||k==="th"?"Chí tôn":"Phi tần";
const relSeps=L=>L.map((x,i)=>Object.assign({},x,{sep:i&&relGrp(L[i-1].k)===relGrp(x.k)?"":relGrp(x.k)}));
function relItems(){return relSeps([{k:"me"},{k:"emp"}].concat(S.thDead?[]:[{k:"th"}],liveRivals(true).map(v=>({k:v.id}))))}
/* KIT 49.2c: strip label = kitNameRank (rank in its rank colour over the short name); Ta keeps her kmy glow */
const stripItem=(x,q)=>({small:true,f:q.f,name:x.k==="me"?"Ta":x.k==="emp"||x.k==="th"?q.name:q.name.split(" ").length>2?q.name.split(" ").slice(-2).join(" "):q.name,rank:q.rank||"",col:q.col,me:x.k==="me"||undefined,sep:x.sep,dim:q.met===false});
/* KIT §49.2b (owner 11/15 "small tabs + a person strip like Hậu cung"): each picker = a row of small kit sub-tabs (kitSubTabs, §46: Ta ·
   Chí tôn · Phi tần with their head counts) over the Hậu cung pager strip of THAT group only (no group labels inside the strip). The X tab
   follows relSel when an outside link sets it; Y keeps its own tab (default the group of Ta, i.e. her own relation with X). */
function hcRelHTML(){kn();const all=relItems().map(x=>Object.assign(x,{q:relPerson(x.k),g:relGrp(x.k)})).filter(x=>x.q);const ix=(L,k)=>L.findIndex(x=>String(x.k)===String(k));
 const GR=["Ta","Chí tôn","Phi tần"];const tabs=(key,L)=>GR.map(g=>({k:g,label:g,n:L.filter(x=>x.g===g).length})).filter(t=>t.n);
 const outside=hcRelHTML._last!==relSel;if(outside){const i=ix(all,relSel);const g=i<0?"Ta":all[i].g;KTSUB.relx=g;PG.rel=null;PG.relY=null}
 if(relSel==null||ix(all,relSel)<0)relSel=all[0].k;
 const tx=kitSubTabs("relx",tabs("relx",all));const items=all.filter(x=>x.g===tx.cur);if(hcRelHTML._g!==tx.cur&&!outside)PG.rel=0;hcRelHTML._g=tx.cur;
 if(PG.rel==null||!items[PG.rel]){const i=ix(items,relSel);PG.rel=i<0?0:i}
 if(items[PG.rel].k!==relSel){relSel=items[PG.rel].k;PG.relY=null}hcRelHTML._last=relSel;const X=items[PG.rel].q;
 /* strip 2: everyone X can have a relation with (Hoàng thượng / Thái hậu: with Ta and the consorts only) */
 const Ys=all.filter(x=>x.k!==X.k&&!((X.k==="emp"||X.k==="th")&&(x.k==="emp"||x.k==="th")));
 const TY=tabs("rely",Ys);if(hcRelHTML._lx!==X.k||KTSUB.rely==null||!TY.some(t=>t.k===KTSUB.rely))KTSUB.rely=TY.some(t=>t.k==="Ta")?"Ta":TY[0].k;hcRelHTML._lx=X.k;
 const ty=kitSubTabs("rely",TY);const Ys2=Ys.filter(x=>x.g===ty.cur);if(hcRelHTML._gy!==ty.cur)PG.relY=null;hcRelHTML._gy=ty.cur;
 if(PG.relY==null||!Ys2[PG.relY])PG.relY=0;const Y=Ys2[PG.relY].q;
 const strip1=pager("rel",items.map(x=>stripItem(Object.assign({},x,{sep:""}),x.q)),()=>"");
 const strip2=pager("relY",Ys2.map(x=>stripItem(Object.assign({},x,{sep:""}),x.q)),()=>"");
 return `<div class="pgwrap krelpg"><div class="kpinline krelpk"><p class="krelst">Xem quan hệ của</p>${tx.html}${strip1}</div><div class="kpinline krelpk"><p class="krelst">với</p>${ty.html}${strip2}</div>${relPair(X,Y)}</div>`}
function relSide(q){return `<div class="kr3p" data-pid="${q.pid}" data-fk="${q.f&&q.f.kk!=null?q.f.kk:q.pid}">${kitNameRank(q.rank,q.name,q.col,q.p===S||q.pid==="me"||undefined)}<div class="kr3f">${pcPort(q.f,q.col)}</div></div>`}
/* the rows between two people, both ways (KIT §49.1 kitRelRow). A value is shown when the one who feels it is Ta, or Ta has met both. */
function relRows(X,Y){const a=X.p,b=Y.p;const met=p=>p===S||(p!=="emp"&&p!=="th"&&knows(p));
 /* KIT §52 kitRel2 (owner 11/16 4.6): TWO columns — left = X → Y, right = Y → X; short words, number in its colour, no bars */
 const R=(w,v,kind,gloss)=>v==null?{w,unk:"chưa rõ",kind,gloss}:{w,now:Math.round(v),kind,gloss};
 if(a==="emp"||b==="emp"){const z=a==="emp"?b:a;if(z===S)return kitRel2([{head:"Hoàng thượng → ta",dir:"them",rows:[R("Sủng",S.sung,"pos"),R("Ân tình",S.an||0,"pos")]}]);
  const kf=S.kf&&S.kf[z.id];return kitRel2([{head:`Hoàng thượng → ${whoL(z)}`,dir:"x",rows:[R("Sủng",kf?kf.s:null,"pos")]}])}
 if(a==="th"||b==="th"){const z=a==="th"?b:a;return kitRel2([{head:`Thái hậu → ${whoL(z)}`,dir:z===S?"them":"x",rows:[R("Thiện cảm",z===S?(S.th||0):(met(z)?(z.th||0):null),"good")]}])}
 const ok=(p,q)=>p===S||(met(p)&&met(q));const dirOf=(p,q)=>q===S?"them":p===S?"me":"x";
 const col=(p,q)=>({head:`${capL(whoL(p))} → ${whoL(q)}`,dir:dirOf(p,q),rows:[R("Thiện cảm",ok(p,q)?aff(p,q):null,"good"),R("Oán",ok(p,q)?oan(p,q):null,"bad")]});
 return kitRel2([col(a,b),col(b,a)])}
/* "Đã biết về X" = facts about X only (each with its source); X = Ta → the box is hidden (her own facts are in her Tư chất / Mệnh truyện) */
function relPair(X,Y){const p=X.p,o=Y.p;const strangers=[X,Y].filter(q=>q.met===false);
 const note=strangers.map(q=>`<p class="kr3note">Ta chưa gặp ${q.name}, chưa rõ nàng ta đối với người khác ra sao. Gặp nàng ta, dò la, hoặc có thêm tai mắt.</p>`).join("")+
  (p!==S&&o===S&&p!=="emp"&&p!=="th"&&sameHouse(S,p)?`<p class="kr3note">Cùng ${houseName(p)} với ta.</p>`:"");
 const btn=p!==S&&p!=="emp"&&p!=="th"&&X.met!==false?seeBtn(p):"";
 const known=p!==S&&p!=="emp"&&p!=="th"&&X.met!==false?knownCol(p):"";
 return `<div class="krelpair"><h4 class="krelh">Quan hệ giữa ${X.k==="me"?"ta":X.name} và ${Y.k==="me"?"ta":Y.name}</h4>`+
  `<div class="krel3 krpair">${relSide(X)}<div class="kr3m">${relRows(X,Y)}${note}${btn?`<div class="kr3act pcb">${btn}</div>`:""}</div>${relSide(Y)}</div>${known}</div>`}
window.hcRelHTML=hcRelHTML;
relHTML=function(){if(!S)return"";if(S.known&&typeof k61Hide==="function"){const h=k61Hide(()=>hcRelHTML(),3);const n=typeof k61Unknown==="function"?k61Unknown(3).length:0;
  return h+(n?`<p class="past">Còn ${n} phi tần ngươi chưa quen biết: chưa xem được quan hệ. Gặp mặt trò chuyện, hỏi người hầu hoặc dò la để biết.</p>`:"")}return hcRelHTML()};

/* ---------- 1. tabs ---------- */
function mkTab(k,l,s,before){const T0=$("tabs");if(!T0||T0.querySelector(`[data-tab="${k}"]`))return;const b=document.createElement("button");b.dataset.tab=k;b.dataset.s=s;b.setAttribute("role","tab");b.textContent=l;b.dataset.l0=l;b.dataset.s0=s;
 const ref=T0.querySelector(`[data-tab="${before}"]`);if(ref)ref.after(b);else T0.appendChild(b);return b}
(function(){const T0=$("tabs");if(!T0)return;const rv=T0.querySelector('[data-tab="rv"]');
 if(rv&&!T0.querySelector('[data-tab="court"]')){const b=document.createElement("button");b.dataset.tab="court";b.dataset.s="Chí tôn";b.setAttribute("role","tab");b.textContent="Chí tôn";b.dataset.l0=b.textContent;b.dataset.s0=b.dataset.s;rv.before(b)}
 mkTab("men","Nam nhân","Nam nhân","rv");
 /* staff (Cung nhân) belongs to Hậu cung: place its button inside the group (after men) so the bar order stays Hậu cung · Giao tình */
 const st=T0.querySelector('[data-tab="staff"]'),mn=T0.querySelector('[data-tab="men"]');if(st&&mn)mn.after(st);
 const rl=T0.querySelector('[data-tab="rel"]'),fc=T0.querySelector('[data-tab="fac"]');if(rl&&st)st.after(rl);if(fc&&rl)rl.after(fc);
 /* servant road: its own tabs (j42 SRVTABS) — the new keys are not servant tabs */
})();
try{const mt0=KG.mt&&KG.mt.keys?KG.mt.keys.slice():[];for(const k in KG)delete KG[k];Object.assign(KG,{hc:{keys:["court","rv","men","staff"],l:"Hậu cung",s:"Hậu cung"},gt:{keys:["rel","fac"],l:"Giao tình",s:"Giao tình"},mt:{keys:["story","nho","quest","req","log"],l:"Mệnh truyện",s:"Mệnh truyện"}});/* keep Mệnh truyện members other modules added earlier (jbal2 "q72" Việc nhờ) */mt0.forEach((k,i)=>{if(!KG.mt.keys.includes(k)&&!["rv","rel","fac","staff","court","men"].includes(k))KG.mt.keys.splice(Math.min(i,KG.mt.keys.length),0,k)})}catch(e){}
try{if(window.VP&&VP.tabs)Object.assign(VP.tabs,{court:["Chí tôn","Chí tôn"],men:["Nam nhân","Nam nhân"],rel:["Ân oán","Ân oán"]})}catch(e){}
/* the sub-tab label: long on wide panels, short ("Thánh thượng") where four segments are tight */
(function(){if(typeof kgSub!=="function")return;const k0=kgSub;kgSub=function(){const r=k0.apply(this,arguments);try{const P=$("panel");const b=P&&P.querySelector('.ksub [data-ksub="court"]');
  if(b){/* oi-render: both widths say "Chí tôn": no width read (it forced a layout), no rewrite when equal */if(b.innerHTML!=="Chí tôn")b.innerHTML="Chí tôn";if(b.title!=="Chí tôn")b.title="Chí tôn"}
  const r2=P&&P.querySelector('.ksub [data-ksub="rel"]');if(r2&&T(r2.textContent)!=="Ân oán")r2.textContent="Ân oán"}catch(e){}return r}})();

/* court sub-tab: Hoàng thượng + Thái hậu, the same pager + person card; their acts = the day's act cards about them (from the Hành sự deck) */
function deckFor(re){try{return (deck||[]).map((a,i)=>[a,i]).filter(([a])=>a&&!a.done&&re.test((a.n||"")+" "+(a.x||""))).map(([a,i])=>cardH(a,i))}catch(e){return[]}}
function thCard(){const known=typeof window.kitCourtKnown!=="function"||window.kitCourtKnown("th")!==false;
 const L=[typeof tuoi==="function"&&S.thAge?tuoi(S.thAge):"",known?`Thái hậu → ta: thiện cảm: <b>${S.th|0}</b>`:"Thái hậu → ta: thiện cảm: <b>chưa rõ</b>"].filter(Boolean);
 const acts=deckFor(/Thái hậu|Đức Thọ/);
 return pcard({f:pTH(),col:"#c9a0e0",name:"Thái hậu",rank:"Thái hậu · Đức Thọ cung",lines:L,groups:[["Việc hôm nay",acts.length?acts:[`<p class="kr3note">Hôm nay Hành sự không có việc nào về Thái hậu. Thỉnh an Thái hậu: sang Đức Thọ cung (Dư đồ) buổi sáng.</p>`]]],empty:""})}
function empCard(){const E=S.emp;const acts=deckFor(/Hoàng thượng|ngự giá|ngự thư phòng|Dưỡng Tâm|thị tẩm/i);
 const likes=Object.keys(LIKES).map(k=>[LIKEN[k],E.known[k]?E.likes[k]:"chưa rõ",E.known[k]?"t":"n"]).concat(typeof disRow==="function"&&disRow("emp")?[disRow("emp")]:[]);
 return pcard({f:pEmp(),col:"#f0d070",name:empName(),rank:"Hoàng thượng",lines:[tuoi(E.age),`Tâm trạng: <b>${MOODS[E.mood][0]}</b>`,`Ngài sủng ngươi <b>${S.sung}</b> · Ân tình <b>${S.an||0}</b>`],
  note:E.traits.map(t=>`<b>${ETRAITS[t][0]}</b>: ${ETRAITS[t][1]}`).join("<br>"),
  groups:[["Việc hôm nay",acts.length?acts:[`<p class="kr3note">Hôm nay Hành sự không có việc nào về Hoàng thượng (việc đổi theo buổi và theo quẻ). Gặp ngài: Dư đồ → nơi ngài ngự buổi này; tối: chờ lật thẻ.</p>`]],["Điều ngài thích",likes.concat([`<p class="kr3note">Nói thật lòng với ngài, hoặc hỏi Kính sự phòng, để biết ngài thích gì.</p>`])]],empty:""})}
window.courtTabHTML=function(){const L=[{f:pEmp(),name:"Hoàng thượng",mk:empCard}];if(!S.thDead)L.push({f:pTH(),name:"Thái hậu",mk:thCard});
 return `<div class="pgwrap">`+pager("court",L.map(x=>({f:x.f,name:x.name})),i=>L[i].mk())+`</div>`};

/* ---------- 5. men: unique names, only the ones she has met ---------- */
/* (MALEN "Lục Trường", "Tiêu Viễn" carry a surname: "Lục Lục Trường" is renamed too) */
const MALEN2=["Cảnh Hoài","Tĩnh An","Dật Thanh","Mặc Trần","Quân Hạo","Thanh Diễn","Hựu Ninh","Tấn Lương","Cẩn Du","Hoằng Nghị","Thiệu Khang","Diệp Tùng"];
function menUnique(){try{if(!S||!S.men)return;const used=new Set();const pool=MALEN.concat(MALEN2);
 for(const m of S.men){const w=m.name.split(" ");const giv=w.slice(-2).join(" "),last=w[w.length-1];
  if(!used.has(last)&&w[w.length-3]!==w[w.length-2]){used.add(last);continue}
  const nw=pool.find(g=>!used.has(g.split(" ").pop())&&g.split(" ")[0]!==w[w.length-3]&&!S.men.some(x=>x!==m&&x.name.endsWith(" "+g)));if(!nw){continue}
  m.name=w.slice(0,-2).concat([nw]).join(" ");used.add(nw.split(" ").pop())}}catch(e){}}
window.menUnique=menUnique;
if(typeof menInit==="function"){const m0=menInit;menInit=function(){const r=m0.apply(this,arguments);menUnique();return r}}
function menMet(m){try{if(S.known&&typeof k61St==="function")return k61St(m)>=1;if(S.menMet&&S.menMet[m.id])return true;if(m.af||m.tinh||m.letters||m.trysts)return true;if(typeof k61St==="function"&&k61St(m)>=1)return true;if(m.seen)return true}catch(e){}return false}
window.menTabHTML=function(){try{menInit()}catch(e){}menUnique();const M=(S.men||[]).filter(m=>m.alive&&menMet(m));
 if(!M.length)return `<div class="pgwrap"><p class="past kr3empty">Ngươi chưa gặp nam nhân nào ngoài Hoàng thượng. Nam nhân (thị vệ, thái y, vương gia, nhạc sư…) chỉ hiện ở đây sau khi ngươi gặp mặt họ ở nơi họ hay lui tới (Dư đồ).</p></div>`;
 return `<div class="pgwrap">`+pager("men",M.map(m=>({f:pMan(m),name:m.name.split(" ").slice(-2).join(" ")})),i=>manCard(M[i]))+`</div>`};
/* the men leave the Phi tần strip (j22 appended them) */
/* (j22 no longer appends them: source edit) */
/* a man's card with no act says why (j22 manCard "empty" text, source edit) */
/* panel rendering of the two new keys (j6 renderPanel0 dispatches by key; these keys are new) */
if(typeof renderPanel0==="function"){const p0=renderPanel0;renderPanel0=function(){if(tab!=="court"&&tab!=="men")return p0.apply(this,arguments);
  const el=$("panel");faceInit();const gm=document.querySelector(".game");if(gm)gm.classList.add("cardtab");const h=tab==="court"?courtTabHTML():menTabHTML();
  const same=el.dataset.tab===tab,keep=same?el.scrollTop:0;el.innerHTML=h;el.dataset.tab=tab;el.dataset.pg=String(PG[tab]);kitFix(el);panelScrollKeep(el,keep)}}
/* servant road keeps its own tab set */
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{const srv=typeof isSrv==="function"&&isSrv();document.querySelectorAll('#tabs [data-tab="court"],#tabs [data-tab="men"]').forEach(b=>{if(srv)b.style.display="none"})}catch(e){}return r}})();

/* ---------- 4. Người chạy việc ---------- */
if(typeof bestSent==="function"){const b0=bestSent;bestSent=function(p){try{if(p===S&&S.runner!=null){const s=(S.staff||[]).find(x=>x.sid===S.runner&&!x.spyFor);if(s)return s;S.runner=null}}catch(e){}return b0.apply(this,arguments)}}
PEND.runner=()=>({t:"<p>Ai làm người chạy việc? Khi ngươi sai người dò la, đưa thư, mua đồ…, người này đi. Lòng cao thì ít khi khai ra ngươi.</p>",
 o:(S.staff||[]).filter(s=>!s.spyFor).map(s=>({n:`${s.name} (${s.role==="maid"?"cung nữ":"thái giám"})`,fx:{},x:`Lòng ${s.loyal}${netIs(s,"sharp")?" · lanh lợi":""}${bestSent(S)===s?" · đang chạy việc":""}`,go:()=>{S.runner=s.sid;log(`Từ nay ${s.name} lo chạy việc cho ngươi.`)}})).concat(S.runner!=null?[{n:"Để game tự chọn",fx:{},x:"chọn theo Lòng và tài",go:()=>{S.runner=null}}]:[],[{n:"Thôi",fx:{}}])});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-runner]");if(!b)return;e.preventDefault();e.stopPropagation();if(!S||Q.length)return;pushDil(mkP("runner"),"Người chạy việc");render()},true);
window.runnerLine=function(){const s=bestSent(S);return `<span class="krun">${gl("Người chạy việc","Người chạy việc:")} <b>${s?s.name:"chưa có ai"}</b>${(S.staff||[]).filter(x=>!x.spyFor).length>1?` <button class="chip kchipb" data-runner="1">Đổi ›</button>`:""}</span>`};

/* ---------- portrait swap (owner 05:45Z "khung nhảy"): same box, the old portrait fades out over the new one (180 ms; none with reduced motion
   / Cảnh động off). The box itself never moves: constant headroom trim (jk3 KIT_PORT_TRIM), the strip already loaded the same frame pictures ---------- */
if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){const P=$("panel");let snap=null,t0=P&&P.dataset.tab;const top0=P?P.scrollTop:0;
  try{const rm=(typeof reducedMotion==="function"&&reducedMotion())||(typeof kitCurlOff==="function"&&kitCurlOff());const o=!rm&&P&&P.querySelector(".pc>.pcl>.pcp.kit .kin");if(o)snap=o.cloneNode(true)}catch(e){}
  const r=r0.apply(this,arguments);
  /* same tab (another person): keep the panel where it was — j6 restored scrollTop before the sticky sub-tab bar came back, which
     shifted the card by the bar's height for one frame */
  /* oi-render: after the renderer's own scroll keep (both at the end of a render, jlag2 renderAfter: the read here forced a 2nd full layout) */
  try{if(P&&P.dataset.tab===t0)(window.renderAfter||((k,g)=>g()))("pscroll2",()=>{if(P.dataset.tab===t0&&Math.abs(P.scrollTop-top0)>0.5)P.scrollTop=top0})}catch(e){}
  try{if(snap&&P.dataset.tab===t0){const n=P.querySelector(".pc>.pcl>.pcp.kit");const nk=n&&n.querySelector(".kin");if(nk&&nk.innerHTML!==snap.innerHTML){
    snap.removeAttribute("id");snap.classList.add("kpxf");nk.after(snap);snap.animate([{opacity:1},{opacity:0}],{duration:180,easing:"ease-out",fill:"forwards"}).onfinish=()=>snap.remove();setTimeout(()=>snap.remove(),400)}}}catch(e){}
  return r}}

/* ---------- CSS ---------- */
const st=document.createElement("style");st.id="kit-hc";st.textContent=`
/* KIT §36.1 PEOPLE-CHIP LIST (owner 04:25Z): one grid, equal columns that line up across rows, same portrait size, name left beside it, long names wrap in their cell */
.kpplist,.relsel.kpplist,.kbk-toc{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(min(100%,11.5em),1fr))!important;gap:4px 8px!important;align-items:stretch!important;flex-wrap:nowrap!important}
.kpplist>.kppl-h{grid-column:1/-1}
.kpplist>button,.kbk-toc>.kbk-tc{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:6px!important;min-width:0!important;text-align:left!important;white-space:normal!important}
.kpplist>button>span:last-child,.kbk-toc>.kbk-tc>:last-child{min-width:0;overflow-wrap:anywhere;line-height:1.2}
/* owner 11/15 17:16Z: every name in a people list is the same ink (the rank shows in the frame), not one colour per person */
.kpplist>button>span:last-child,.kbk-toc>.kbk-tc .kname,.kbk-toc>.kbk-tc .kname .kti{color:var(--ink,#2a1a12)!important}
.kpplist>button span.md,.kbk-toc>.kbk-tc span.md{flex:0 0 auto}
/* KIT §36.2 THẺ QUAN HỆ 3 CỘT: portrait (person-card size) | bars | Đã biết bullets; narrow = three blocks stacked in one card */
#panel{container-type:inline-size}
.krel3{display:grid;grid-template-columns:minmax(120px,170px) minmax(0,1fr) minmax(0,1.15fr);gap:10px 14px;align-items:start;padding:10px;margin:0 0 8px;border:1px solid var(--line);border-radius:10px;background:var(--k-card,#fffaf0)}
.kr3p{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0}
.kr3f{width:100%}.kr3f .pcp.kit{width:100%!important;max-width:none!important;margin:0!important;float:none!important}
.kr3nm{display:flex;flex-direction:column;align-items:center;text-align:center;line-height:1.2;max-width:100%}
.kr3nm small{font-size:.74rem;font-weight:600;color:color-mix(in srgb,var(--rc) 75%,#2a1a12)}
.kr3nm b{font-size:.95rem;color:color-mix(in srgb,var(--rc) 45%,#2a1a12);overflow-wrap:anywhere}
.kr3m{display:flex;flex-direction:column;gap:6px;min-width:0;font-size:.82rem}
.kr3b{display:flex;flex-direction:column;gap:1px;min-width:0}
.kr3k{color:var(--dim);font-size:.76rem;font-weight:600}
.kr3v{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.krel3.kr3two{grid-template-columns:minmax(120px,170px) minmax(0,1fr)}
.ksbar{position:relative;display:inline-block;width:92px;height:8px;flex:0 0 auto;border-radius:4px;background:var(--k-card2,#efe4cc);box-shadow:inset 0 0 0 1px #b89a6a55;overflow:hidden;vertical-align:middle}
.ksbar>.ksb-mid{position:absolute;left:calc(50% - 1px);top:-1px;bottom:-1px;width:2px;background:#7a5530;opacity:.7;z-index:1}
.ksbar>u{position:absolute;top:1px;bottom:1px;border-radius:3px}.ksbar>u.g{background:var(--good,#3d8a5a)}.ksbar>u.r{background:var(--bad,#b0402c)}.kr3v .fbar{width:70px;flex:0 0 auto}
/* KIT §49.1 kitRelRow: label line (KIT_REL colour) + ONE line "word · number" | bar; fixed word column + fixed bar → equal bar x / width */
.krr{display:flex;flex-direction:column;gap:2px;min-width:0}
.krrl{color:var(--krc,#6a5040);font-size:.76rem;font-weight:700;line-height:1.25}.krrl *{color:inherit!important}
.krr2{display:grid;grid-template-columns:var(--krrw,8.2rem) var(--krrbw,84px);column-gap:8px;align-items:center;justify-content:start;min-height:18px}
.krrv{white-space:nowrap;font-size:.82rem;line-height:1.3;min-width:0}
.krrbar{position:relative;display:block;width:var(--krrbw,84px);height:14px}
.krrbar>.ksbar{position:absolute;left:0;top:3px;width:100%;height:8px;overflow:visible}
.ksbar>.ksb-mk{position:absolute;top:50%;width:3px;height:14px;border-radius:2px;transform:translate(-50%,-50%);background:#5a3a20;z-index:2;box-shadow:0 0 0 1px #fffaf0}
.ksbar>.ksb-mk.g{background:#2c6a44}.ksbar>.ksb-mk.r{background:#8a2c1c}
.ksbar.ksbn{opacity:.45}
/* KIT §49.2 Ân oán pair: two pager strips (X, Y), heading, X | rows | Y, then "Đã biết về X" */
.krelst{margin:6px 0 2px;font-size:.78rem;color:var(--dim);font-weight:600}
/* KIT §49.2c COMPACT RELATION PICKER (owner 15/11 "Khung này choáng space quá", review/rel-picker): each picker = ONE flex row, label + group chips on the first
   line and the face strip beside them when the width allows (strip basis 300 px), else directly under them; no band behind the chips, no tall empty strip;
   faces + labels small (kitNameRank: rank in its rank colour over the short name); ‹ › and N/M only when the faces overflow (kitStripFit .kpall) */
html body :is(#panel,#kitpage) .krelpk{display:flex;flex-wrap:wrap;align-items:center;gap:0 8px;margin:0 0 2px;padding:0}
html body :is(#panel,#kitpage) .krelpk>.krelst{margin:0;flex:0 0 auto;line-height:1.2}
html body :is(#panel,#kitpage) .krelpk>.kcattabs.ktsub{margin:0!important;padding:2px 0!important;background:transparent!important;box-shadow:none!important;flex:0 1 auto;width:auto;min-width:0;overflow-x:auto}
html body :is(#panel,#kitpage) .krelpk>.pstrip{flex:1 1 300px;margin:0!important;gap:3px!important}
html body :is(#panel,#kitpage) .krelpk .pstrip>.parr{min-height:34px!important;min-width:26px!important;width:26px;font-size:1.1rem}
html body :is(#panel,#kitpage) .krelpk .pface{min-height:0!important;min-width:40px;padding:1px 2px!important;gap:0}
html body :is(#panel,#kitpage) .krelpk .pface .knr{display:flex;flex-direction:column;align-items:center;min-height:0;gap:0;line-height:1.05}
html body :is(#panel,#kitpage) .krelpk .pface:not(.on) .knr>.knr-n{font-weight:500}
.krelh{margin:10px 0 6px;font-family:var(--display);font-size:1.02rem;color:var(--ink,#3a2418)}
.krel3.krpair{grid-template-columns:minmax(100px,150px) minmax(0,1fr) minmax(100px,150px);align-items:start}
.krpair>.kr3p{gap:4px}.krpair>.kr3p>.knr{min-height:2.6em;justify-content:flex-end}
.krelpair>.kr3r{padding:8px 10px;border:1px solid var(--line);border-radius:10px;background:var(--k-card,#fffaf0)}
@container (max-width:560px){.krel3.krpair{grid-template-columns:1fr 1fr}.krel3.krpair>.kr3p{max-width:150px;margin:0 auto}.krel3.krpair>.kr3m{grid-column:1/-1;grid-row:2;border-top:1px dashed var(--line);padding-top:6px}}
.kr3note{margin:0;font-size:.74rem;color:var(--dim)}
.kr3act{margin-top:4px;min-width:0;max-width:100%}
html body #panel .krel3 .kr3act button.ka,html body #panel .krel3 .kr3act .card,html body #panel .krel3 .kr3act .kcard{width:100%!important;min-width:0!important;max-width:100%!important;box-sizing:border-box!important;flex:1 1 auto!important}
.kr3r{min-width:0;font-size:.82rem}
.kr3h{display:block;font-size:.76rem;color:var(--dim);margin:0 0 3px;letter-spacing:.02em}
.kr3l{margin:0;padding:0 0 0 1.05em;display:flex;flex-direction:column;gap:4px}
.kr3l li{line-height:1.35}.kr3l li small{display:block;font-size:.7rem;color:var(--dim);opacity:.85}
.kr3none{margin:0;font-size:.76rem;color:var(--dim)}
.kr3more{margin-top:4px}
@container (max-width:560px){.krel3,.krel3.kr3two{grid-template-columns:1fr;justify-items:stretch}.kr3p{max-width:180px;margin:0 auto}.kr3m,.kr3r{border-top:1px dashed var(--line);padding-top:6px}}
.krun{display:inline-flex;align-items:center;gap:4px;flex-wrap:wrap}
.kr3empty{margin:12px 4px}
.pcp.kit>.kin.kpxf{z-index:6;pointer-events:none}
/* KIT §36.4 one portrait box: constant headroom trim, in CSS (first frame = settled frame). Cell: .kin = 130.44 % of the .pcp height,
   .pcp height = 1037/718 of its width (measured 338/234) → trim = KIT_PORT_TRIM .015 × 1.3044 × 1.4444 = 2.83 % of the column width */
.pc.kpwide[data-k2]>.pcl>.pcp.kit{margin-top:calc(4px - 2.83%)!important}
/* the name block above the box always takes two lines (a long name wraps inside it), so the box starts at the same height for everyone */
.pc.kpwide[data-k2]>.pcl>.pcname{min-height:2.4em;display:flex!important;align-items:flex-end}
/* narrow card (phones): the box sits at the top of its cell, never centred against the info beside it (which differs per person) */
.pc[data-k2]:not(.kpwide) .pcl>.pcp.kit,.pc[data-k2]:not(.kpwide) .pcl>.kwear{align-self:start!important}
`;document.head.appendChild(st);
/* KIT §49.2c sample (kit page #kit): the compact picker = label + kitSubTabs chips + face strip on ONE row (strip under them when too narrow);
   ‹ › and N/M only when the faces overflow (kitStripFit .kpall). Row 1: few faces (no arrows). Row 2: the same faces, strip narrowed so they overflow (arrows). */
window.kitRelPickerSample=()=>{
 if(typeof S==="undefined"||!S||typeof relItems!=="function")return `<em>cần một ván đang chơi</em>`;
 const L=relItems().map(x=>{const q=relPerson(x.k);return stripItem(Object.assign({},x,{sep:""}),q)}).slice(0,6);
 const row=(lab,key,items,w)=>{const t=kitSubTabs(key,[{k:"a",label:"Nhóm",n:items.length}]);return `<div class="kpinline krelpk" style="max-width:${w}px"><p class="krelst">${lab}</p>${t.html}${pager("ks"+key,items,()=>"")}</div>`};
 setTimeout(()=>{try{kitStripFit()}catch(e){}},60);
 return row("Ít người","ksa",L.slice(0,2),520)+row("Nhiều người (tràn)","ksb",L.concat(L),340)};
})();
