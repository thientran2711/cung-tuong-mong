/* ================= jdc: SEASON + COLOUR DRESS CODE (PARKING #11, review/dresscode; owner 20/11 ~19:00Z + ~19:20Z, verbatim dev/PARKING_LOT.md rows 11 / 11b) =================
   Expert pass first (OD:L1327): dev/handover/reports/dresscode-expert.md. Every number: BAL.dc (jbal2). Same rule for her and every consort (law 1).
   1. COLOURS. Ten basic families (BAL.dc.fam). A person SHOWS: the two colours of her robe = the colours of the PAINTING she wears (Foreman C's
      palette per identity, BAL.dc.who; t7 / t8 / lãnh cung variants; owner 11b: what the screen shows is what counts) + the MAIN colour of her
      trâm (wear slot) + the MAIN colour of the hoa điền on her face today (jhd hdShown). Item card (Tư trang): rows "Màu" (main + secondary) and,
      for a robe, "Hợp mùa". Colour dots = kit part kitColDot (KIT REQUEST 20/11 dresscode); until it exists the names are printed.
   2. SEASON FIT. A robe's season = its fabric (BAL.dc.season.y → fab → seasons). Worn off-season during a tuần: Danh and the Thái hậu's goodwill
      drop by rank (law 5), with an event frame (OD:L473). NPC consorts change dress at the season (an NPC may forget: npcMiss) and pay the same.
   3. FESTIVAL DRESS CODE. BAL.dc.fest[k]: two colours of the day + taboo robe colours + strict (gate). She must show needN[rank] of the two
      (law 5). Missing → she may still join: Danh off and phần off her festival-contest score (the SAME j71 SC7 formula for every entrant, the
      contest rows name it «y phục −N»). Strict festival and NONE of the colours → turned away (the only turn-away rule). The taboo robe counts
      only when the robe colour can change (BAL.dc.kyOn, PARKING 11c recolour; 0 now). Gate frame (before the festival events, jdc0), roads that
      are never dominated (law 2) and each name what they give: own trâm of a missing colour · buy one at Nội vụ phủ (Bạc) or borrow one (only
      for a colour her chest cannot cover) · go in as she is · excuse herself (always there).
   4. NPCs take the SAME roads at every festival (dcNpcFest: own trâm → borrow from a consort who likes her → buy), are turned away by the same
      rule, and are mocked after the festival (dcNpcSettle). Season: same first-tuần grace and no cost where no robe of the season exists at
      the phẩm; NPC cost includes the Thái hậu part.
   5. BORROW = REAL OBJECTS (law 6c): the piece moves, is worn, cannot be sold / pawned / given while borrowed, shows «Mượn của …» in the item
      detail, and goes back at the next tuần. NPCs ask to borrow hers (two-way). Co-op: lending touches the host-owned world → only where
      worldOn(); the guest seat never lends or borrows NPC pieces.
   Co-op: her own gate / season / borrow run on her own seat (personal); NPC loops only where worldOn() (host / solo). Old saves: every field lazy. */
function dcOn(){return !!(typeof BAL==="object"&&BAL.dc&&BAL.dc.on)}
function dcSeason(){try{const n=BAL.dc.season.n.indexOf(SEASON[S.month-1]);return n<0?0:n}catch(e){return 0}}
function dcFamN(f){const F=BAL.dc.fam[f];return F?F.n:""}
/* one colour, as the kit shows it: the dot part when the kit keeper has built it, else the family name (+ role word) */
function dcDot(f,role){if(!f||!BAL.dc.fam[f])return"";try{if(typeof kitColDot==="function")return kitColDot(f,{role,size:"sm"})}catch(e){}return dcFamN(f)+(role==="main"?" (chính)":role==="sec"?" (phụ)":"")}
function dcPair(L){if(!L)return[];return L[0]===L[1]?[dcDot(L[0],"")]:[dcDot(L[0],"main"),dcDot(L[1],"sec")]}
function dcRk(p){try{return Math.max(0,Math.min(7,(p===S?S.rank:p.queen?7:p.rank)|0))}catch(e){return 0}}
function dcIdOf(p){try{const w=p&&p.ref?p.ref:p;const id=w===S?(S.pid||S.fid||""):(w.fid||"");return String(id).split(":").pop()}catch(e){return""}}
/* the painted tier t1..t8 of her picture (figTierOf, 1-based; -1 = lãnh cung) */
function dcTierOf(p){try{if(typeof figTierOf==="function"){const t=figTierOf(p);if(typeof t==="number")return t}}catch(e){}return p===S?(S.out?-1:S.rank+1):(p.out?-1:p.queen?8:(p.rank|0)+1)}
/* the robe = the painting she wears: [main, secondary] */
function dcRobe(p){if(!p)return null;const D=BAL.dc;const t=dcTierOf(p);if(t===-1||(p===S&&S.out))return D.cold.slice();
 const pal=D.who[dcIdOf(p)];if(pal){const m=pal[0],s=pal[1];if(t===7)return D.tier.t7==="sec-vang"?[m,"vang"]:[m,s];if(t===8)return D.tier.t8==="main-vang"?["vang",m]:[m,s];return[m,s]}
 try{const it=wdItem(wdOf(p).y);const f=it&&D.wcol[it.col];if(f)return[f,f]}catch(e){}return null}
function dcPiece(k){const D=BAL.dc;if(D.piece[k])return D.piece[k].slice();try{const w=WD_ITEMS[k];const f=w&&D.wcol[w.col];if(f)return[f,f]}catch(e){}return null}
/* the accessories that show: worn trâm + today's hoa điền (main colours only) */
function dcAcc(p){const L=[];try{const t=wdOf(p).tram;const c=t&&dcPiece(t.k);if(c)L.push({k:t.k,f:c[0],sl:"tram",bor:!!t.bor})}catch(e){}
 try{const h=typeof hdShown==="function"?hdShown(p):null;const c=h&&dcPiece(h.k);if(c)L.push({k:h.k,f:c[0],sl:"hd"})}catch(e){}return L}
function dcShows(p){const robe=dcRobe(p)||[];const acc=dcAcc(p);const fams=new Set(robe.concat(acc.map(a=>a.f)).filter(Boolean));return{robe,acc,fams}}
/* ---------- season ---------- */
function dcYFab(k){return (BAL.dc.season.y||{})[k]||null}
function dcYSeasons(k){const S4=BAL.dc.season.k;const f=dcYFab(k);const code=(f&&BAL.dc.season.fab[f])||S4;return [...code].map(c=>S4.indexOf(c)).filter(i=>i>=0)}
function dcOffSeason(p){try{const y=wdOf(p).y;if(!y||!WD_ITEMS[y.k])return false;return !dcYSeasons(y.k).includes(dcSeason())}catch(e){return false}}
/* the first tuần of a season: everyone gets one tuần to change (warning, no cost) — her and NPCs alike (review r1 fix 6) */
function dcSeasonFirst(){try{return S.tuan===0&&SEASON[S.month-1]!==SEASON[(S.month+10)%12]}catch(e){return false}}
/* a road exists: a robe of this season at her own phẩm (the court pool) or one she owns at or under it; no road → no cost (fix 5) */
function dcSeasonRoad(p){try{const P=Math.min(8,wdPOf(p)),sn=dcSeason();if(wdPool("y",P,true).some(k=>dcYSeasons(k).includes(sn)))return true;
 return dcInv(p).some(e=>e&&!e.h&&!e.bor&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==="y"&&WD_ITEMS[e.k].P<=P&&dcYSeasons(e.k).includes(sn))}catch(e){return false}}
function dcSeasonDue(p){return dcOffSeason(p)&&dcSeasonRoad(p)&&!dcSeasonFirst()}
function dcSeasonCost(p){const r=dcRk(p);return{danh:BAL.dc.season.danh[r]|0,th:BAL.dc.season.th[r]|0}}
/* ---------- festival ---------- */
function dcFestNow(){try{const f=festToday();return f&&BAL.dc.fest[f.k]?f:null}catch(e){return null}}
function dcStat(p,k){const code=BAL.dc.fest[k];if(!code||!p)return null;const r=dcRk(p);const sh=dcShows(p);const needN=BAL.dc.needN[r]|0;
 const have=code.need.filter(f=>sh.fams.has(f)),missing=code.need.filter(f=>!sh.fams.has(f));const taboo=!!(BAL.dc.kyOn&&sh.robe[0]&&code.ky.includes(sh.robe[0]));
 const miss=Math.max(0,needN-have.length)+(taboo?1:0);const refused=!!code.gate&&!have.length;
 return{k,code,r,needN,have,missing,taboo,miss,refused,sh,cutPhan:miss*(BAL.dc.cut.phan[r]|0),cutDanh:miss*(BAL.dc.cut.danh[r]|0)}}
function dcKey(f){return `${S.year}-${f.k}`}
function dcHer(){S.dcF=S.dcF&&typeof S.dcF==="object"?S.dcF:{};return S.dcF}
function dcHerOut(){const f=dcFestNow();if(!f)return false;const F=dcHer();return F.key===dcKey(f)&&F.ch==="out"}
function dcHerOn(){try{return !!(S&&!S.dead&&!S.out&&!S.confined&&!(typeof isSrv==="function"&&isSrv()))}catch(e){return false}}
function dcRefused(p){if(!dcOn())return false;const f=dcFestNow();if(!f)return false;if(p===S)return dcHerOut();const st=dcStat(p,f.k);return!!(st&&st.refused)}
function dcCutPhan(p){if(!dcOn()||!p)return 0;const f=dcFestNow();if(!f)return 0;const st=dcStat(p,f.k);return st?st.cutPhan:0}
function dcName(v){if(!v)return"";if(v===S)return"ngươi";const t=v.queen?"Hoàng hậu":(typeof RANKS!=="undefined"&&RANKS[v.rank]?RANKS[v.rank].n:"");return (t?t+" ":"")+v.name}
function dcRankN(p){try{return p===S?(S.rank>=7?"Hoàng hậu":RANKS[S.rank].n):(p.queen?"Hoàng hậu":RANKS[p.rank].n)}catch(e){return""}}
function dcFamList(L){return L.map(dcFamN).filter(Boolean).join(", ")}
/* ---------- borrow: the piece really moves (law 6c) ---------- */
function dcOwnKey(p){return p===S?"me:"+(S.pid||S.name||""):"id:"+p.id}
function dcByKey(k){if(!k)return null;if(k===dcOwnKey(S))return S;if(/^id:/.test(k)){const id=k.slice(3);return (typeof rivals!=="undefined"?rivals:[]).find(v=>String(v.id)===id)||null}return null}
function dcInv(p){p.inv=Array.isArray(p.inv)?p.inv:[];return p.inv}
/* her pieces / an NPC's pieces of slot sl whose MAIN colour is one of fams, not worn, not borrowed */
function dcOwnFit(p,fams,sl){const out=[];dcInv(p).forEach((e,i)=>{if(!e||e.h||e.bor||e.dcPrev)return;const w=WD_ITEMS[e.k];if(!w||w.sl!==sl||w.nt)return;const c=dcPiece(e.k);if(c&&fams.includes(c[0]))out.push({e,i,f:c[0],w})});return out}
/* co-op: lending moves NPC pieces (host-owned world) → only where worldOn() (review r1 fix 9) */
function dcWorld(){return typeof worldOn!=="function"||worldOn()}
/* the third road (same for everyone): buy a trâm of a missing colour at her own phẩm or under it from Nội vụ phủ — the cheapest that fits; a real new piece */
function dcBuyFit(p,fams){try{const P=Math.min(8,wdPOf(p));let best=null;for(let q=Math.max(0,P);q>=0;q--)for(const k of wdPool("tram",q,true)){const w=WD_ITEMS[k];const c=dcPiece(k);if(!w||w.nt||!c||!fams.includes(c[0]))continue;if(!best||w.pr<best.pr)best={k,f:c[0],pr:w.pr|0,w}}return best}catch(e){return null}}
function dcBuy(p,b){if(!b)return false;const bac=p===S?S.bac:(p.bac||0);if(bac<b.pr)return false;const e={k:b.k,from:"buy"};
 if(p===S)apply({bac:-b.pr});else ap(p,{bac:-b.pr});const w=wdOf(p);if(w.tram)dcInv(p).push(w.tram);w.tram=e;return true}
function dcLenders(to,fams){const D=BAL.dc.bor;const L=[];if(typeof rivals==="undefined"||!dcWorld())return L;
 for(const v of rivals){if(!v||v===to||!v.alive||v.out||v.confined||v.coop)continue;if(aff(v,to)<D.fav)continue;
  for(const sl of D.sl){const c=dcOwnFit(v,fams,sl);if(c.length){L.push({v,...c[0]});break}}if(L.length>=D.max)break}return L}
function dcBorrow(to,from,e){const D=BAL.dc;const inv=dcInv(from);const i=inv.indexOf(e);if(i<0)return false;inv.splice(i,1);
 const b=Object.assign({},e);delete b.w;b.bor={from:dcOwnKey(from),due:S.turn};const w=wdOf(to);const sl=(WD_ITEMS[b.k]||{}).sl;
 if(sl==="tram"){const prev=w.tram;if(prev)dcInv(to).push(Object.assign(prev,{dcPrev:1}));w.tram=b}else dcInv(to).push(b);
 try{affAdd(from,to,-D.bor.use);affAdd(to,from,D.bor.thanks)}catch(x){}/* the same for everyone: the lender spends goodwill, the borrower owes thanks */
 return true}
/* give back every piece whose festival tuần has passed (her seat handles the pieces she holds and the pieces she lent) */
function dcGiveBack(holder,e,where){const own=dcByKey(e.bor&&e.bor.from);const w=wdOf(holder);
 if(where==="slot"){const pi=dcInv(holder).findIndex(x=>x&&x.dcPrev);if(pi>=0){const prev=dcInv(holder).splice(pi,1)[0];delete prev.dcPrev;w.tram=prev}else w.tram=null}
 else{const i=dcInv(holder).indexOf(e);if(i>=0)dcInv(holder).splice(i,1)}
 delete e.bor;dcInv(own||holder).push(e);return own}
function dcReturn(){if(!S)return;const me=dcOwnKey(S);const back=[];
 const scan=(p,mine)=>{if(!p)return;const w=wdOf(p);const W=dcWorld();const due=e=>e&&e.bor&&e.bor.due<S.turn&&(mine||(W&&(e.bor.from===me||/^id:/.test(e.bor.from))));
  if(w&&due(w.tram)){const e=w.tram;const o=dcGiveBack(p,e,"slot");back.push([e,p,o])}
  for(const e of dcInv(p).slice())if(due(e)){const o=dcGiveBack(p,e,"inv");back.push([e,p,o])}};
 scan(S,true);for(const v of (typeof rivals!=="undefined"?rivals:[]))if(v&&!v.coop)scan(v,false);
 for(const [e,p,o] of back){try{log(`${(WD_ITEMS[e.k]||{}).n||"Món đồ"} đã trả về cho ${dcName(o||p)}.`)}catch(x){}}}
/* ---------- the gate frame (her) ---------- */
function dcFacts(st,f){const F=[];F.push(`${f.name} cần y phục có màu: ${dcFamList(st.code.need)}.`);
 const rn=dcRankN(S);if(st.needN<st.code.need.length)F.push(`Phẩm ${rn} chỉ cần có một trong các màu ấy.`);else F.push(`Phẩm ${rn} phải có đủ các màu ấy.`);
 const acc=st.sh.acc.map(a=>`${(WD_ITEMS[a.k]||{}).n} (${dcFamN(a.f)})`);
 F.push(`Y phục đang mặc: áo màu ${dcFamList([...new Set(st.sh.robe)])}${acc.length?`, cài ${acc.join(", ")}`:""}.`);
 if(st.taboo)F.push(`Màu ${dcFamN(st.sh.robe[0])} là màu kiêng trong ngày này.`);
 if(st.refused)F.push(`Ma ma giữ cửa không cho vào: y phục không có màu nào hợp lễ.`);
 else if(st.miss)F.push(`Thiếu màu: ${dcFamList(st.missing)}. Vào dự thì bị chê, hội thi bị trừ phần.`);return F}
function dcEnter(f){const st=dcStat(S,f.k);const F=dcHer();F.ch=F.ch==="bor"||F.ch==="chg"?F.ch:"in";if(st&&st.cutDanh){apply({danh:-st.cutDanh});try{log(`${f.name}: y phục thiếu màu hợp lễ (${dcFamList(st.missing)}), bị chê: Danh -${st.cutDanh}.`)}catch(e){}}}
function dcOut(f){const F=dcHer();F.ch="out";apply({suc:BAL.dc.stay.suc});
 for(let i=Q.length-1;i>=0;i--){const q=Q[i];if(q&&q!==DC_CUR&&dcIsFestItem(q,f))Q.splice(i,1)}
 try{log(`${f.name}: cáo lỗi không dự vì y phục không hợp lễ, về cung nghỉ.`)}catch(e){}}
let DC_CUR=null;
function dcIsFestItem(q,f){try{if(q.ev==="fest"||/^fest:/.test(q.evId||""))return true;const sh=(typeof MCAL!=="undefined"&&MCAL.short[f.k])||"";return!!(q.must&&typeof q.t==="string"&&((sh&&q.t.indexOf(sh)===0)||q.t.indexOf(f.name)===0))}catch(e){return false}}
function dcGateItem(f,st){const D=BAL.dc;const opts=[];const need=st.missing.length?st.missing:st.code.need;
 const own=dcOwnFit(S,need,"tram");const ownF=new Set(own.map(c=>c.f));
 /* own trâm first; borrowing only for a needed colour her chest cannot cover (law 2: never a dominated road) */
 for(const c of own.filter((c,i)=>own.findIndex(x=>x.f===c.f)===i).slice(0,D.chg.max))opts.push({n:`Cài ${c.w.n} (${dcFamN(c.f)}) của mình`,fx:{},x:`tốn: ${D.chg.khac} khắc · thành: có màu ${dcFamN(c.f)} cho lễ`,
  go:()=>{const w=wdOf(S);const i=S.inv.indexOf(c.e);if(i>=0){S.inv.splice(i,1);if(w.tram)S.inv.push(w.tram);delete c.e.w;w.tram=c.e;spend(D.chg.khac);dcHer().ch="chg"}dcEnter(f)}});
 const lack=need.filter(x=>!ownF.has(x));
 if(lack.length)for(const L of dcLenders(S,lack))opts.push({n:`Mượn ${L.w.n} (${dcFamN(L.f)}) của ${dcName(L.v)}`,fx:{},x:`tốn: ${D.bor.khac} khắc · thành: có màu ${dcFamN(L.f)} cho lễ, qua tuần sau trả`,
  go:()=>{if(dcBorrow(S,L.v,L.e)){spend(D.bor.khac);dcHer().ch="bor";try{log(`Mượn ${L.w.n} của ${dcName(L.v)} để dự ${f.name}; qua tuần sau phải trả.`)}catch(e){}}dcEnter(f)}});
 const buy=lack.length?dcBuyFit(S,lack):null;/* offered only when she has the silver (a road she can take) */
 if(buy&&S.bac>=buy.pr)opts.push({n:`Sai người mua ${buy.w.n} (${dcFamN(buy.f)}) ở Nội vụ phủ`,fx:{},x:`tốn: ${D.buy.khac} khắc, Bạc -${buy.pr} · thành: có màu ${dcFamN(buy.f)} cho lễ`,
  go:()=>{if(dcBuy(S,buy)){spend(D.buy.khac);dcHer().ch="chg";try{log(`Mua ${buy.w.n} ở Nội vụ phủ để dự ${f.name}.`)}catch(e){}}dcEnter(f)}});
 if(!st.refused)opts.push({n:"Cứ thế vào dự",fx:{},x:"thành: vào dự lễ như đang mặc",go:()=>dcEnter(f)});
 opts.push({n:"Cáo lỗi, về cung nghỉ",fx:{},x:"thành: về cung nghỉ, không dự lễ",go:()=>dcOut(f)});
 const it={t:`Y phục dự ${f.name}`,h:dcFacts(st,f).map(s=>`<p>${s}</p>`).join(""),opts,ev:"dc",evId:"dc:"+f.k,must:1};
 DC_CUR=it;return it}
/* called by jdc0 inside the endTurn chain, after the new tuần began and before the festival events are queued */
function dcTurn(){if(!dcOn()||!S||S.dead)return;try{dcNpcSettle()}catch(e){console.error("dcNpcSettle",e)}try{dcReturn()}catch(e){console.error("dcReturn",e)}
 const f=dcFestNow();if(!f||!dcHerOn())return;const F=dcHer();const key=dcKey(f);if(F.key===key)return;
 const st=dcStat(S,f.k);S.dcF={key,ch:null};if(!st||(!st.miss&&!st.refused)){S.dcF.ch="ok";return}
 Q.push(dcGateItem(f,st))}
/* ---------- NPC side + her season (outer endTurn wrapper) ---------- */
/* NPC roads at a festival = hers (law 1): her own trâm of a missing colour first, else borrow from a consort who likes her (same dcBorrow / dcReturn) */
function dcNpcFest(v,k){try{const st=dcStat(v,k);if(!st||(!st.miss&&!st.refused)||!st.missing.length)return;const own=dcOwnFit(v,st.missing,"tram")[0];const w=wdOf(v);
 if(own){const inv=dcInv(v);inv.splice(inv.indexOf(own.e),1);if(w.tram)inv.push(w.tram);delete own.e.w;w.tram=own.e;return}
 const L=dcLenders(v,st.missing)[0];if(L){dcBorrow(v,L.v,L.e);return}dcBuy(v,dcBuyFit(v,st.missing))}catch(e){console.error("dcNpcFest",e)}}
/* after the festival tuần (next endTurn, before pieces go back): the NPCs who went in short of colours are mocked (Danh), once */
function dcNpcSettle(){if(!dcWorld())return;const P=S.dcNp;if(!P||!P.k||P.done)return;P.done=1;const cut=[];
 for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||!v.alive||v.out||v.confined||v.coop)continue;const st=dcStat(v,P.k);if(!st||st.refused||!st.miss)continue;ap(v,{danh:-st.cutDanh});cut.push(v)}
 if(cut.length)try{log(`${P.n}: ${cut.map(dcName).join(", ")} y phục thiếu màu hợp lễ, bị chê.`)}catch(e){}}
function dcH(s){let h=7;s=String(s);for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
function dcNpcDress(v){/* an NPC changes into a robe of the season: one from her own chest first, else the court issues one at her phẩm (src "cap",
   the jearn convention for issued pieces; the j92 pool rule of wdDefault); the robe she takes off stays in her chest (law 6c). Some forget (npcMiss). */
 try{if(!dcOffSeason(v))return;if(dcH(`${v.id}|${S.year}|${dcSeason()}`)%100<BAL.dc.season.npcMiss)return;const w=wdOf(v);const P=Math.min(8,wdPOf(v));const sn=dcSeason();
  const inv=dcInv(v);const i=inv.findIndex(e=>e&&!e.h&&!e.bor&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==="y"&&WD_ITEMS[e.k].P<=P&&dcYSeasons(e.k).includes(sn));
  let nw=null;if(i>=0)nw=inv.splice(i,1)[0];else for(const q of [P,P-1]){const L=wdPool("y",Math.max(0,q),true).filter(k=>dcYSeasons(k).includes(sn));if(L.length){nw={k:L[dcH(v.id+"|"+S.year)%L.length],src:"cap",nvp:1};break}}
  if(!nw)return;const old=w.y;if(old)inv.push(old);delete nw.w;w.y=nw}catch(e){console.error("dcNpcDress",e)}}
function dcWeek(){if(!dcOn()||!S||S.dead)return;const R=typeof rivals!=="undefined"?rivals:[];
 if(dcWorld()){const bad=[];for(const v of R){if(!v||!v.alive||v.out||v.coop)continue;dcNpcDress(v);if(dcSeasonDue(v)){const c=dcSeasonCost(v);const fx={};if(c.danh)fx.danh=-c.danh;if(c.th)fx.th=-c.th;if(Object.keys(fx).length){ap(v,fx);bad.push(v)}}}
  if(bad.length)try{log(`Trong cung chê ${bad.slice(0,3).map(dcName).join(", ")}${bad.length>3?" và mấy người nữa":""} mặc áo trái mùa.`)}catch(e){}
  const f=dcFestNow();if(f&&S.dcNk!==dcKey(f)){S.dcNk=dcKey(f);S.dcNp={k:f.k,n:f.name};const out=[];
   for(const v of R){if(!v||!v.alive||v.out||v.confined||v.coop)continue;dcNpcFest(v,f.k);const st=dcStat(v,f.k);if(st&&st.refused)out.push(v)}
   if(out.length)try{log(`${f.name}: ${out.map(dcName).join(", ")} bị chặn ngoài cửa vì y phục không hợp lễ.`)}catch(e){}}}
 if(dcHerOn()&&dcOffSeason(S)&&dcSeasonRoad(S)&&S.dcSw!==S.turn){S.dcSw=S.turn;const c=dcSeasonCost(S);const y=wdItem(wdOf(S).y);const first=dcSeasonFirst();
  const fx={};if(!first){if(c.danh)fx.danh=-c.danh;if(c.th)fx.th=-c.th}
  if(first&&(c.danh||c.th)){const sn=BAL.dc.season.n;Q.push({t:"Sang mùa mới",ev:"dc",evId:"dc:season0",who:typeof pTH==="function"?pTH():null,
    h:`<p>Đã sang mùa ${sn[dcSeason()]}; y phục đang mặc là ${y?y.n:"áo"} (${BAL.dc.season.fabN[dcYFab(y&&y.k)]||"vải"}, hợp mùa ${dcYSeasons(y&&y.k).map(i=>sn[i]).join(", ")}).</p><p>Tuần này còn kịp đổi; từ tuần sau mặc áo trái mùa thì bị chê ở buổi thỉnh an.</p><p>Vào Tư trang, chạm ô Y phục, chọn bộ hợp mùa.</p>`})}
  if(Object.keys(fx).length){apply(fx);const sn=BAL.dc.season.n;
   Q.push({t:"Áo trái mùa",ev:"dc",evId:"dc:season",who:typeof pTH==="function"?pTH():null,
    h:`<p>Đang mùa ${sn[dcSeason()]} mà y phục đang mặc là ${y?y.n:"áo"} (${BAL.dc.season.fabN[dcYFab(y&&y.k)]||"vải"}, hợp mùa ${dcYSeasons(y&&y.k).map(i=>sn[i]).join(", ")}).</p><p>Buổi thỉnh an, Thái hậu và các cung chê không biết lễ đổi y phục theo mùa.</p><p>Muốn khỏi bị chê: vào Tư trang, chạm ô Y phục, chọn bộ hợp mùa.</p>`});
   try{log(`Mặc áo trái mùa: ${Object.entries(fx).map(([k,v])=>statTxt(k,v)).join(", ")}.`)}catch(e){}}}
 /* two-way borrow: a consort who lacks a colour asks to borrow her trâm (her seat; the piece moves for real) */
 const f=dcFestNow();if(f&&dcHerOn()&&dcWorld()&&S.dcAk!==dcKey(f)){S.dcAk=dcKey(f);
  for(const v of R){if(!v||!v.alive||v.out||v.coop||aff(v,S)<BAL.dc.bor.fav)continue;const st=dcStat(v,f.k);if(!st||(!st.miss&&!st.refused)||!st.missing.length)continue;
   const c=dcOwnFit(S,st.missing,"tram")[0];if(!c)continue;
   Q.push({t:`${dcName(v)} xin mượn trâm`,who:v,ev:"dc",evId:"dc:ask",h:`<p>${v.name} thiếu màu ${dcFamList(st.missing)} cho ${f.name}, sai cung nữ sang xin mượn ${c.w.n} của ngươi, qua tuần sau trả.</p>`,
    opts:[{n:`Cho mượn ${c.w.n}`,fx:{},x:"",go:()=>{if(dcBorrow(v,S,c.e))try{log(`Cho ${dcName(v)} mượn ${c.w.n} dự ${f.name}.`)}catch(e){}}},
     {n:"Khéo từ chối",fx:{},x:"",go:()=>{try{log(`Từ chối cho ${dcName(v)} mượn trâm.`)}catch(e){}}}]});break}}}
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{dcWeek()}catch(e){console.error("dcWeek",e)}return r}})();
/* ---------- the shared contest formula and the guest list (j71) ---------- */
(function(){if(typeof SC7!=="object")return;for(const kd of Object.keys(SC7)){const o=SC7[kd];if(!o||typeof o.f!=="function"||o.f.__dc)continue;const f0=o.f;
 o.f=function(p){const v=f0.apply(this,arguments);try{return v-dcCutPhan(p)}catch(e){return v}};o.f.__dc=1}})();
(function(){if(typeof det7!=="function")return;const d0=det7;det7=function(kind,p){const r=d0.apply(this,arguments);try{const c=dcCutPhan(p);if(c)return (r?r+", ":"")+`y phục −${c}`}catch(e){}return r}})();
(function(){if(typeof present7!=="function")return;const p0=present7;present7=function(p){const r=p0.apply(this,arguments);try{if(r&&dcRefused(p))return false}catch(e){}return r}})();
(function(){if(typeof fMake7!=="function")return;const m0=fMake7;fMake7=function(){try{if(dcHerOut())return null}catch(e){}return m0.apply(this,arguments)}})();
/* ---------- a borrowed piece is not hers: no selling, giving, pawning, planting (law 6c), for her and the NPC AI alike ---------- */
function dcIsBor(p,ix){try{const e=p&&p.inv&&p.inv[ix];return!!(e&&e.bor)}catch(x){return false}}
["wdSell","wdPawn","sellItem"].forEach(n=>{try{const f0=window[n];if(typeof f0!=="function")return;window[n]=function(p,ix){if(dcIsBor(p,ix))return"";return f0.apply(this,arguments)}}catch(e){}});
try{if(typeof wdSell==="function"&&window.wdSell!==wdSell){wdSell=window.wdSell;wdPawn=window.wdPawn;sellItem=window.sellItem}}catch(e){}
["giveTo","plantItem"].forEach(n=>{try{const f0=window[n];if(typeof f0!=="function")return;window[n]=function(a,t,ix){if(dcIsBor(a,ix))return"";return f0.apply(this,arguments)}}catch(e){}});
try{if(typeof giveTo==="function"&&window.giveTo!==giveTo){giveTo=window.giveTo;plantItem=window.plantItem}}catch(e){}
(function(){if(typeof wdActBtns!=="function")return;const b0=wdActBtns;wdActBtns=function(e){try{if(e&&e.bor)return[]}catch(x){}return b0.apply(this,arguments)};window.wdActBtns=wdActBtns})();
function dcLoanRow(e){if(!e||!e.bor)return null;const o=dcByKey(e.bor.from);return["Mượn",`của ${o?dcName(o):"người khác"} · qua tuần sau trả`,"n"]}
/* ---------- kit surfaces: item rows (Tư trang), wear-slot label, calendar popover ---------- */
function dcItemRows(k){const w=WD_ITEMS[k];if(!w)return"";const R=[];
 if(w.sl==="y"){const sn=BAL.dc.season.n;R.push(["Màu",dcPair(dcRobe(S)).concat(["theo tranh dáng người đang mặc"]),"n"]);
  R.push(["Hợp mùa",`${dcYSeasons(k).map(i=>sn[i]).join(", ")} (${BAL.dc.season.fabN[dcYFab(k)]||"vải"})`,"n"])}
 else R.push(["Màu",dcPair(dcPiece(k)),"n"]);return kitRows(R)}
/* KIT §70: the ONE item detail (kitItemDetailRows) used by every item cell (Tư trang, Bên mình, shop, reward box…) */
(function(){if(typeof kitItemDetailRows!=="function")return;const r0=kitItemDetailRows;kitItemDetailRows=function(ref){const h=r0.apply(this,arguments);try{if(!dcOn()||!h||/>Màu</.test(h))return h;const R=typeof kitItemRef==="function"?kitItemRef(ref):null;if(!R||!WD_ITEMS[R.k])return h;const lr=dcLoanRow(R.e);const x=dcItemRows(R.k)+(lr?kitRows([lr]):"");return x?(typeof kitRowsJoin==="function"?kitRowsJoin(h,x):h+x):h}catch(err){console.error("dc rows",err);return h}};window.kitItemDetailRows=kitItemDetailRows})();
(function(){if(typeof wdItemRowsE!=="function")return;const r0=wdItemRowsE;wdItemRowsE=function(e){const h=r0.apply(this,arguments);try{if(!dcOn()||!e||!WD_ITEMS[e.k]||/>Màu</.test(h))return h;const x=dcItemRows(e.k);return x?(typeof kitRowsJoin==="function"?kitRowsJoin(h,x):h+x):h}catch(err){console.error("dc rows",err);return h}}})();
(function(){if(typeof kitWearSlots!=="function")return;const k0=kitWearSlots;kitWearSlots=function(p){const h=k0.apply(this,arguments);try{if(!dcOn()||!p||!h||!dcOffSeason(p))return h;
 const lab=`<span class="kitl kitl-no">Trái mùa</span>`;return h.indexOf('<span class="kwearl">')>=0?h.replace('<span class="kwearl">','<span class="kwearl">'+lab+" "):h.replace(/<\/div>$/,`<span class="kwearl">${lab}</span></div>`)}catch(e){return h}}})();
(function(){if(typeof mcPopHTML!=="function")return;const m0=mcPopHTML;mcPopHTML=function(k){const h=m0.apply(this,arguments);try{const c=dcOn()&&BAL.dc.fest[k];if(!c||!h)return h;
 const line=`<div><b>Y phục:</b> ${c.need.map(f=>dcDot(f,"")).join(", ")}${BAL.dc.kyOn&&c.ky.length?` · kiêng áo ${dcFamList(c.ky)}`:""}${c.gate?" · không có màu nào hợp lễ thì bị chặn ngoài cửa":""}</div>`;
 return h.replace(/<\/div>$/,line+"</div>")}catch(e){return h}}})();
window.dcSeasonDue=dcSeasonDue;window.dcSeasonRoad=dcSeasonRoad;window.dcNpcFest=dcNpcFest;window.dcNpcSettle=dcNpcSettle;window.dcLenders=dcLenders;window.dcGateItem=dcGateItem;window.dcStat=dcStat;window.dcShows=dcShows;window.dcRobe=dcRobe;window.dcPiece=dcPiece;window.dcOffSeason=dcOffSeason;window.dcTurn=dcTurn;window.dcWeek=dcWeek;window.dcBorrow=dcBorrow;window.dcReturn=dcReturn;window.dcCutPhan=dcCutPhan;window.dcRefused=dcRefused;window.dcItemRows=dcItemRows;
