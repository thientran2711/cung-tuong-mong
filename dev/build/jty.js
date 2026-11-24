/* ================= jty: TRUNG Y — ô Y phục trống thì mặc trung y (sếp 15/11 09:15Z, review/trung-y) =================
   Rule: when a woman's Y phục slot (j92 wd.y) is EMPTY — confiscated, robbed, taken off, never had — she is in her trung y
   (inner silk robe). Her pictures everywhere (stage #mefig, dialogs, cards, round portraits: every caller goes through figFor)
   show the trung y painting of her own face, in her rank's colour (8 tiers = RCOL, KIT §1.3: ivory, pale green, pale blue,
   pale pink, pale lavender, pale rose, pale amber, pale gold), from img/FIGURES-ty.json. Missing art → her normal figure.
   Not in lãnh cung (cold art) and not while she is a palace maid (maid art, Nội vụ phủ uniform).
   Numbers: BAL.ty (jbal.js), one source.
   - At home (her own palace) the trung y costs nothing; she may take the robe off there (Tư trang → Y phục → Cởi y phục).
   - Out of her palace: Danh -out; with many people there (≥crowdN) Danh -crowd more; before the Emperor or the Thái hậu it is
     a scandal (tai tiếng): Danh -royal more and Đức -royalDuc (thiếu lễ). A visitor in her palace while she is in trung y:
     Danh -meet. Each costs once per place per buổi. Before she walks out a card shows exactly what she will lose ("Mất").
   - Robbery (cướp/giật y phục) on the road, from real causes: night, a lonely place, an enemy who sent someone (a rival who
     hates her plans it: an omen comes first, as a card) or a rare night thug. She must walk home in trung y.
   - Wearing a robe again (Tư trang → Mặc) ends it. Nội vụ phủ issues a plain robe of her rank after reissueWk weeks
     (kitReward chest). NPCs: the same rule as data (Danh, rumours in Tin trong cung, robbery, Nội vụ phủ issue).
   Old saves: nothing to convert (a worn robe stays worn). */
const TYF={ix:null,ld:0};
function tyLoad(){if(TYF.ld)return;TYF.ld=1;try{fetch("img/FIGURES-ty.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).then(j=>{const L=Array.isArray(j)?j:(j&&j.figures)||[];const ix={};
  for(const f of L){if(!f||!f.file||!f.role||!f.identity)continue;const k=norm(f.role)+":"+f.identity;((ix[k]=ix[k]||{})[f.ty|0]=ix[k][f.ty|0]||[]).push(f)}
  TYF.ix=ix;try{if(S&&!S.dead)render()}catch(e){}}).catch(()=>{TYF.ld=0})}catch(e){TYF.ld=0}}
try{tyLoad();setInterval(()=>{TYF.ld=0;tyLoad()},300000)}catch(e){}
/* is p in trung y? (the Y phục slot is empty) */
function tyOn(p){try{if(!p||p.alive===false)return false;if(p===S&&(S.out||(typeof isSrv==="function"&&isSrv())))return false;if(p!==S&&(p.out||p.role==="maid"))return false;
 const w=wdOf(p);return !!w&&!w.y}catch(e){return false}}
function tyTier(p){try{const r=typeof rkOf==="function"?rkOf(p):p.rank;return Math.max(1,Math.min(8,((p&&p.queen)?7:(r|0))+1))}catch(e){return 1}}
const TY_COL=["","lụa ngà","lụa lục nhạt","lụa lam nhạt","lụa hồng phấn","lụa tím nhạt","lụa hồng đào","lụa cam nhạt","lụa vàng nhạt"];
/* her trung y picture: same identity as her figure, tier by rank, nearest age */
function tyFig(kind){try{if(!TYF.ix||!tyOn(S))return"";const k=typeof figPick==="function"?figPick(S):null;if(!k)return"";const M=TYF.ix[k];if(!M)return"";
 const t=tyTier(S);let L=M[t];if(!L||!L.length){for(let d=1;d<8&&!(L&&L.length);d++)L=M[t-d]||M[t+d]}if(!L||!L.length)return"";
 const f=figBest(L,null,figAgeOf(S));if(!f)return"";return figPath(kind==="por"?(f.por||f.file):f.file)}catch(e){return""}}
(function(){if(typeof figFor!=="function")return;const f0=figFor;figFor=function(p,kind){try{if(p===S||(p&&p.ref===S)){const s=tyFig(kind);if(s)return s}}catch(e){}return f0.apply(this,arguments)};window.figFor=figFor})();

/* ---------- the Y phục slot can be empty: no free phẩm phục out of nothing ---------- */
/* a lost robe (confiscated / robbed) leaves the slot empty; Nội vụ phủ issues a plain one of her rank after BAL.ty.reissueWk weeks */
function tyLost(p,why){if(!p)return;p.tyNvp=wk()+BAL.ty.reissueWk;p.tyWhy=why||p.tyWhy||"";}
/* the player takes the robe off (only in her own palace): into the chest, she is in trung y */
(function(){if(typeof wdOffUI!=="function")return;const f0=wdOffUI;wdOffUI=function(sl){if(sl!=="y")return f0.apply(this,arguments);
  if(!S||S.dead)return;if(S.place!=="home"){log("Chỉ cởi y phục trong tẩm cung của mình.");render();return}
  const w=wdOf(S);const e=w.y;if(!e)return;const n=wdItem(e)?wdItem(e).n:"y phục";if(e.from!=="base"){S.inv=S.inv||[];S.inv.push(e)}w.y=null;
  log(`Ngươi cởi ${n}, mặc trung y nghỉ trong tẩm cung.`);render()};window.wdOffUI=wdOffUI})();
/* jearn removed the "Tháo" button for the robe; the item panel gets "Cởi y phục" back */
(function(){if(typeof wdActBtns!=="function")return;const a0=wdActBtns;wdActBtns=function(e,g){const B=a0.apply(this,arguments);try{
  if(g&&g.wdSlot==="y")B.push(pbtn(`data-wd="off" data-sl="y"`,"Cởi y phục",`thành: cất vào rương, mặc trung y · kèm: ra khỏi tẩm cung hay gặp người khi mặc trung y: Danh -${BAL.ty.out} trở lên`,S.place!=="home"?"chỉ cởi trong tẩm cung":""))}catch(x){}return B}})();
(function(){if(typeof wdWearEntry!=="function")return;const w0=wdWearEntry;wdWearEntry=function(p){const was=tyOn(p);const r=w0.apply(this,arguments);try{if(was&&!tyOn(p)){p.tyNvp=null;if(p===S)log("Ngươi mặc lại y phục, thôi mặc trung y.")}}catch(e){}return r};window.wdWearEntry=wdWearEntry})();

/* ---------- the price of going out / meeting people in trung y (BAL.ty) ---------- */
function tyRoyalAt(k,ppl){try{if(k==="home"&&(S.buoi||0)>=(typeof B4L==="number"?B4L:3)&&!(ppl||[]).some(x=>x&&x.kind==="th"))return false;/* the night at home: him coming for the night (thị tẩm) is no breach */if((ppl||[]).some(x=>x&&(x.kind==="emp"||x.kind==="th")))return true;const W=S.where||{};return W.emp===k||(k==="tn"&&!S.thDead)}catch(e){return false}}
function tyCost(k,ppl){const T=BAL.ty;const L=[];let danh=0,duc=0;if(!k)return{danh,duc,L};
 if(k==="home"){let mates=[];try{mates=typeof residents==="function"?residents("home"):[]}catch(e){}
  const night=(S.buoi||0)>=(typeof B4L==="number"?B4L:3);const vis=(ppl||[]).filter(x=>x&&((x.kind==="emp"&&!night)||x.kind==="th"||(x.ref&&(rivals||[]).includes(x.ref)&&!mates.includes(x.ref))));if(vis.length){danh+=T.meet;L.push(`có người đến thăm: Danh -${T.meet}`)}
  if(tyRoyalAt(k,ppl)){danh+=T.royal;duc+=T.royalDuc;L.push(`gặp Hoàng thượng / Thái hậu: tai tiếng, Danh -${T.royal}, Đức -${T.royalDuc}`)}return{danh,duc,L}}
 danh+=T.out;L.push(`ra khỏi tẩm cung: Danh -${T.out}`);
 const n=ppl?ppl.length:(typeof countAt==="function"?countAt(k):0);if(n>=T.crowdN){danh+=T.crowd;L.push(`nơi đông người: Danh -${T.crowd}`)}
 if(tyRoyalAt(k,ppl)){danh+=T.royal;duc+=T.royalDuc;L.push(`trước mặt Hoàng thượng / Thái hậu: tai tiếng, Danh -${T.royal}, Đức -${T.royalDuc}`)}
 return{danh,duc,L}}
function tyCharge(k){try{if(!tyOn(S)||!S.visit)return;const key=`${wk()}.${S.buoi||0}.${k}`;if(S.tyPaid===key)return;const c=tyCost(k,curPeople());if(!c.danh&&!c.duc)return;S.tyPaid=key;
 const fx={danh:-c.danh};if(c.duc)fx.duc=-c.duc;apply(fx);S.tyShame=(S.tyShame||0)+1;
 log(`Ngươi mặc trung y ${k==="home"?"tiếp người":"ra ngoài"}: ${c.L.join(" · ")}.`);
 if(tyRoyalAt(k,curPeople()))for(const v of liveRivals(true).slice(0,3))try{newsAdd(v,"ty",`${S.name} mặc trung y mà ra mắt bề trên, khắp cung xì xào`,true)}catch(e){}}catch(e){console.error(e)}}
/* the card before she walks out in trung y: exactly what she loses */
(function(){if(typeof goTo!=="function")return;const g0=goTo;goTo=function(k){
  if(window.__tyCardK===k){window.__tyCardK=null;window.__tyGo=1;try{const r=g0.apply(this,arguments);try{if(S&&S.place===k)tyCharge(k)}catch(e){}return r}finally{window.__tyGo=0}}
  if(S&&!S.dead&&k&&k!=="home"&&k!==S.place&&tyOn(S)&&!window.__tyGo&&!Q.length&&!S.out){const c=tyCost(k,null);
   Q.push({t:"Ra ngoài khi mặc trung y?",kind:"notice",act:1,h:`<p class="past">${when()}</p><p>Ngươi đang mặc trung y (${TY_COL[tyTier(S)]}), chưa khoác y phục.</p><p>Mặc trung y ra khỏi tẩm cung là thiếu lễ, người trong cung sẽ chê cười: ${c.L.join("; ")}.</p>`,
    opts:[{n:"Vẫn đi",fx:{},x:`tốn: Danh -${c.danh}${c.duc?` · tốn: Đức -${c.duc}`:""}`,go:()=>{lifeTimeout(()=>{window.__tyGo=1;try{goTo(k)}finally{window.__tyGo=0}},0)}},
          {n:"Ở lại",fx:{},x:"(thay y phục trong Tư trang: Y phục → Mặc, rồi hãy đi)",go:()=>{}}]});render();return}
  const r=g0.apply(this,arguments);try{if(S&&S.place===k)tyCharge(k)}catch(e){}return r};window.goTo=goTo})();
/* a visitor at home while she is in trung y */
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{if(S&&!S.dead&&S.place==="home"&&tyOn(S)&&!Q.length)tyCharge("home")}catch(e){}return r}})();
/* the map: a red "Mất" line on every place outside her palace while she is in trung y */
(function(){if(typeof mapHTMLgrid!=="function")return;const g0=mapHTMLgrid;mapHTMLgrid=function(){let h=g0.apply(this,arguments);try{if(!tyOn(S))return h;
  h=h.replace(/(<(?:button|div) class="mtile[^"]*" data-(?:go|ak)="([^"]+)"[^>]*>)/g,(all,open,k)=>k==="home"?all:open+`<span class="mchip">trung y · Danh -${tyCost(k,null).danh}</span>`)}catch(e){}return h}})();

/* the place card (jplace, "thẻ nơi chốn"): a red Mất line while she is in trung y — the card already told her, so no second card */
(function(){if(typeof kitPlaceInfo!=="function")return;const i0=kitPlaceInfo;kitPlaceInfo=function(k,h){let r=i0.apply(this,arguments);try{
  if(S&&k&&k!==S.place&&tyOn(S)){const c=tyCost(k,null);window.__tyCardK=k;
   r=r.replace(/<\/div>$/,`<p class="kplr">Đang mặc trung y (${TY_COL[tyTier(S)]}): ${c.L.join(" · ")} ${kitChips([["Danh",-c.danh],c.duc?["Đức",-c.duc]:null].filter(Boolean))}</p></div>`)}}catch(e){}return r};window.kitPlaceInfo=kitPlaceInfo})();
/* ---------- ONE thiếu lễ (no double count with jaudit §16/§17 leAttire + jtoil) ----------
   In trung y the robe rule above (BAL.ty: Danh/Đức when she goes out / meets people, charged once per place per buổi) IS the thiếu lễ of her
   dress: jaudit's "y phục dưới phẩm" Danh/Đức and jtoil's dress verdict are not added on top. The host's own displeasure (thiện cảm, BAL.thieuLe.aff,
   strict hosts ×strict) stays, and jtoil still adds the makeup part (it skips the dress part for a non-"ok" state). NPCs: jaudit's serveTH thiếu lễ
   does not fire for an NPC in trung y (jty's weekly npcOut is her price). leAttire is a hoisted declaration in jaudit (later in the bundle),
   so this wrap sits under jtoil's. */
(function(){if(typeof leAttire!=="function")return;const la0=leAttire;leAttire=function(p,occasion,host){const q=p||S;if(!tyOn(q))return la0.apply(this,arguments);
  const B=BAL.thieuLe;let st=false;try{st=leHostKind(host)==="strict"}catch(e){}
  return{state:"plain",delta:{danh:0,duc:0,aff:Math.round(B.aff*(st?B.strict:1))},why:["mặc trung y"],occasion:occasion||"",host,ty:1}};window.leAttire=leAttire})();
(function(){if(typeof aaThieuLe0!=="function")return;const a0=aaThieuLe0;aaThieuLe0=function(p){if(tyOn(p))return false;return a0.apply(this,arguments)}})();
/* ---------- robbery on the road (cướp / giật y phục) ---------- */
function tyEnemies(p){try{return liveRivals(true).filter(v=>v!==p&&!v.out&&typeof rel==="function"&&rel(v,p)<=netTh(v,"ghet")&&netRx(v,/Xảo quyệt|Kiêu ngạo|Tham vọng|Thù dai/))}catch(e){return[]}}
/* n = people at that place (default: who is with her now; the map shows the destination's count, countAt) */
function tyRobOdds(k,n){const T=BAL.ty;let o=0;const night=(S.buoi||0)>=(typeof B4L==="number"?B4L:3);const lonely=(n!=null?n:(curPeople()||[]).length)<=1;
 const plot=S.tyOmen&&S.tyOmen.until>=wk()&&RV(S.tyOmen.by);
 if(!night&&!lonely)return 0;if(plot)o+=T.robPlot;else if(night&&lonely)o+=T.robThug;else return 0;if(night)o+=T.robNight;if(lonely)o+=T.robLonely;return Math.min(80,o)}
/* balance-2 (hidden-risk family): the map spot names the robbery risk before she walks (same tyRobOdds, chance words j1 chanceW; KIT map spot «mmeta» warning <em>, as the spot's own "why") */
(function(){if(typeof mapHTML!=="function")return;const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(window.__mapList)return h;
 try{if(!S||S.dead||S.out||tyOn(S)||(typeof isSrv==="function"&&isSrv())||!wdOf(S).y)return h;
  h=h.replace(/<button class="mspot([^"]*)" data-go="([^"]+)"([^>]*)>([\s\S]*?)<\/button>/g,(all,cls,k,attrs,inner)=>{if(k==="home"||k===S.place||/ off/.test(cls))return all;
   const o=tyRobOdds(k,typeof countAt==="function"?countAt(k):0);if(!(o>0))return all;const w=`<em>bị giật y phục: ${chanceW(o)}</em>`;
   inner=/<span class="mmeta">/.test(inner)?inner.replace(/(<span class="mmeta">[\s\S]*?)(<\/span>)/,`$1 · ${w}$2`):inner.replace(/(<\/span>)/,`$1<span class="mmeta">${w}</span>`);
   return `<button class="mspot${cls}" data-go="${k}"${attrs}>${inner}</button>`})}catch(e){}return h}})();
function tyRob(k){const T=BAL.ty;const w=wdOf(S);const e=w.y;if(!e||!wdItem(e))return false;const it=wdItem(e);const plot=S.tyOmen&&S.tyOmen.until>=wk()?RV(S.tyOmen.by):null;
 w.y=null;/* item conservation (jil): the robe sits in the plotter's chest */if(typeof ilRob==="function")ilRob(S,e,plot);S.tyOmen=null;tyLost(S,"cuop");S.tyRobbed=(S.tyRobbed||0)+1;
 const nm=typeof accName==="function"?accName(k):k;apply({danh:-(T.robDanh+T.robWalk)});
 log(`Trên đường ở ${nm}, kẻ lạ giật mất ${it.n}. Ngươi phải mặc trung y về cung (Danh -${T.robDanh+T.robWalk}).`);
 Q.unshift({t:"Bị giật y phục giữa đường",kind:"notice",act:1,h:`<p class="past">${when()}</p><p>${(S.buoi||0)>=(typeof B4L==="number"?B4L:3)?"Trời tối":"Nơi vắng người"}, ở ${nm} có kẻ bịt mặt xông ra giật mất ${it.n} của ngươi rồi chạy biến.</p><p>Ngươi mất ${it.n}, chỉ còn trung y, đành cúi đầu đi về tẩm cung.</p><p>Nội vụ phủ sẽ cấp lại áo sau ${T.reissueWk} tuần; muốn sớm hơn thì mặc áo khác trong Tư trang.</p>${plot?`<p>Cung nhân thì thầm: kẻ ấy hình như là người của ${plot.name}.</p>`:""}`,
  opts:[{n:"Về tẩm cung",fx:{},x:`(Danh -${T.robDanh+T.robWalk} đã mất trên đường)`,go:()=>{}}]});
 try{for(const v of liveRivals(true).slice(0,2))newsAdd(v,"ty",`Nghe nói ${S.name} bị giật y phục giữa đường, phải mặc trung y về cung`,true)}catch(x){}
 window.__tyGo=1;try{const a=window.__accSilent;window.__accSilent=1;window.__walkFree=1;goTo("home");window.__accSilent=a}finally{window.__tyGo=0;window.__walkFree=0}return true}
(function(){if(typeof goTo!=="function")return;const g0=goTo;goTo=function(k){const p0=S&&S.place;const r=g0.apply(this,arguments);
  try{if(S&&!S.dead&&k&&k!=="home"&&S.place===k&&p0!==k&&!tyOn(S)&&!window.__tyGo&&!S.out&&!(typeof isSrv==="function"&&isSrv())){const o=tyRobOdds(k);if(o>0&&roll(o)){tyRob(k);render()}}}catch(e){console.error(e)}return r};window.goTo=goTo})();
/* the omen: an enemy plans it; her people warn her (a card) — then night walks to lonely places are dangerous for omenWk weeks */
function tyWeek(){const T=BAL.ty;let ev="";try{
 if(S&&!S.dead&&!S.out&&!(typeof isSrv==="function"&&isSrv())&&!(S.tyOmen&&S.tyOmen.until>=wk())){const o=npcWhy("tyPlot",{t:S},()=>roll(T.plotCh));/* npc-purpose G2: the plotter = the enemy whose grudge pushes her most; plotCh = the success (cd stamped only when she acts) */if(o){const v=o.who;S.tyOmen={by:v.id,until:wk()+T.omenWk};
   Q.push({t:"Điềm báo",kind:"notice",act:1,h:`<p class="past">${when()}</p><p>Cung nhân báo: mấy đêm nay có kẻ lạ lảng vảng quanh lối đi vắng, hỏi han giờ giấc ngươi ra vào.</p><p>Có người thấy kẻ ấy từng ra vào chỗ ${v.name}.</p>`,
    opts:[{n:"Đã rõ",fx:{},x:`kèm: ${T.omenWk} tuần tới đi đêm, qua nơi vắng dễ bị giật y phục (ở nơi đông người, đi ban ngày thì không sao)`,go:()=>{}}]})}}
 /* Nội vụ phủ issues a plain robe of her rank (a chest) */
 if(S&&!S.dead&&S.tyNvp!=null&&wk()>=S.tyNvp){S.tyNvp=null;const w=wdOf(S);if(!w.y){const k=typeof earnPlainY==="function"?earnPlainY(S):null;if(k&&WD_ITEMS[k]){S.inv=S.inv||[];S.inv.push({k,src:"nvp",nvp:1,giver:"Nội vụ phủ",d:typeof wdWhen==="function"?wdWhen():""});try{earnK(S,k)}catch(e){}
   log(`Nội vụ phủ đưa tới ${WD_ITEMS[k].n}, cất trong Tư trang.`);try{kitReward({kind:"gift",title:"Nội vụ phủ cấp y phục",from:"Nội vụ phủ",items:[{n:WD_ITEMS[k].n,d:"Y phục · mặc trong Tư trang",img:WD_ITEMS[k].icon,tier:WD_ITEMS[k].g|0}]})}catch(e){}}}}
 /* NPCs: the same rule as data */
 for(const v of liveRivals(true)){if(v.out)continue;try{const w=wdOf(v);
  if(!w.y&&typeof earnFromChest==="function"){const c=earnFromChest(v,"y");if(c){w.y=c;v.tyNvp=null}}
  if(!w.y&&v.tyNvp!=null&&wk()>=v.tyNvp){v.tyNvp=null;const k=typeof earnPlainY==="function"?earnPlainY(v):null;if(k)w.y={k,src:"nvp",nvp:1,giver:"Nội vụ phủ"}}
  if(!w.y){if(v.tyNvp==null)tyLost(v,"");if(whereOf(v)!==palaceOf(v)){if(typeof v.danh==="number")v.danh=Math.max(0,v.danh-T.npcOut);try{newsAdd(v,"ty",`${v.name} mặc trung y mà ra khỏi cung, bị chê thiếu lễ`)}catch(e){}}}
  else{const o=npcWhy("tyRob",{t:v},()=>roll(T.npcRob));/* npc-purpose G2: only an enemy with a grudge hires the robbers (no enemy → no robbery); npcRob = the success (cd stamped only when she acts) */if(o){const e=w.y;if(e&&wdItem(e)&&!wdItem(e).nt){w.y=null;if(typeof ilRob==="function")ilRob(v,e,o.who);tyLost(v,"cuop");if(typeof v.danh==="number")v.danh=Math.max(0,v.danh-T.robDanh);try{newsAdd(v,"ty",`${v.name} đi đêm qua lối vắng, bị kẻ lạ giật mất y phục, phải mặc trung y về cung`)}catch(x){}}}}
 }catch(e){}}}catch(e){console.error(e)}return ev}
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)tyWeek()}catch(e){console.error(e)}return r};window.endTurn=endTurn})();
window.tyOn=tyOn;window.tyCost=tyCost;window.tyRob=tyRob;window.tyWeek=tyWeek;window.tyFig=tyFig;
