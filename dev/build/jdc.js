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
      detail, and goes back at the next tuần. NPCs ask to borrow hers (two-way).
   Co-op (owner co-op land gate, MAIN 20/11 21:35Z: every feature works for BOTH seats): her own gate / season / borrow run on her own seat
   (personal); NPC loops (season dress, NPC festival roads, mocking) only where worldOn() (host / solo). The GUEST borrows from / lends to NPCs
   too: her side (her S) moves on her seat, the NPC side goes to the host as jcoopask requests (PROTOCOL §4.1): «dcout» = the host takes
   the piece out of that NPC's chest, «dcin» = the host puts a piece into it (worn when it is a loan to the NPC). A player's key in a loan is
   her WORLD id ("id:901" host / "id:902" guest), so both seats resolve it; a loan given back to another seat's player is that seat's side.
   Thin rooms (dev flag level >= 3, world is a read-only lens on the guest): the guest's NPC borrow / lend stays off (not the default room).
   Old saves: every field lazy (old "me:" keys still mean her). */
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
/* co-op: a player's world id (PROTOCOL §3: host 901, guest 902), the same table as jcoopworld me() */
function dcCoop(){const c=window.COOPW;return !!(c&&c.on&&c.seat)}
function dcMyId(){const c=window.COOPW;return (c.ctx||c.seat)==="a"?901:902}
/* a key of the OTHER seat's player (co-op world ids 901 / 902; NPC ids are < 900) */
function dcOther(k){return dcCoop()&&/^id:90[12]$/.test(k||"")&&k!==dcOwnKey(S)}
/* her key never changes with her portrait / rank (before r4 it was "me:"+pid: a new pid left her lent piece with the NPC for good) */
function dcOwnKey(p){return p===S?(dcCoop()?"id:"+dcMyId():"me"):"id:"+p.id}
function dcByKey(k){if(!k)return null;if(k===dcOwnKey(S)||k==="me"||/^me:/.test(k))return S;/* old saves: "me:<pid>" */if(/^id:/.test(k)){const id=k.slice(3);return (typeof rivals!=="undefined"?rivals:[]).find(v=>String(v.id)===id)||null}return null}
function dcInv(p){p.inv=Array.isArray(p.inv)?p.inv:[];return p.inv}
/* her pieces / an NPC's pieces of slot sl whose MAIN colour is one of fams, not worn, not borrowed */
/* r3 review: not a lost case's piece either (e.lo: jlost «giữ lại» — someone else's, kept): lent away, the case could not find it at its holder and
   wrote a second copy to the ledger box (coop-dresscode-scan); nor is it «của mình» to wear for a festival */
/* r4b (F1): a piece its holder may lend / wear as «của mình»: not hidden, not on loan (e.bor: every loan, the Hội phối đồ one too), not a trâm put aside for a loan, not a lost case's */
function dcFree(e){return !!e&&typeof e==="object"&&!e.h&&!e.bor&&!e.dcPrev&&!e.lo}
function dcOwnFit(p,fams,sl){const out=[];dcInv(p).forEach((e,i)=>{if(!dcFree(e))return;const w=WD_ITEMS[e.k];if(!w||w.sl!==sl||w.nt)return;const c=dcPiece(e.k);if(c&&fams.includes(c[0]))out.push({e,i,f:c[0],w})});return out}
/* co-op: NPC loops roll once, on the host (review r1 fix 9) */
function dcWorld(){return typeof worldOn!=="function"||worldOn()}
/* the guest seat in an ordinary room: her NPC borrow / lend goes to the host as requests (jcoopask H kinds dcout / dcin) */
function dcGuest(){const c=window.COOPW;return dcCoop()&&c.seat!=="a"&&!!c.askH&&!(typeof thinW==="function"&&thinW())}
/* may HER borrow / lend touch an NPC chest here: solo, host, or the guest through requests */
function dcLend(){return dcWorld()||dcGuest()}
function dcAsk(k,o){try{S.coopAsk=Array.isArray(S.coopAsk)?S.coopAsk:[];const a=Object.assign({id:k+":"+o.bid,k},JSON.parse(JSON.stringify(o)));if(S.coopAsk.some(x=>x&&x.id===a.id))return;
 a.w=(COOP.state&&COOP.state.week)||0;S.coopAsk.push(a);/* sent at once too, so a host that has not ended this week applies it this week (jcoopask live relay) */
 setTimeout(()=>{try{if(COOP.state.status==="open")COOP.send({t:"act",k:"ctm-ask",mode:"ask",id:"ask:"+a.id,L:[JSON.parse(JSON.stringify(a))]})}catch(e){}},0)}catch(e){console.error("dcAsk",e)}}
/* a thiện cảm change as the kit words it (jaudit pvQuy, KIT_REL) */
function dcRelW(v,n){try{if(typeof pvQuy==="function")return pvQuy(v,n)}catch(e){}return `thiện cảm ${n>0?"+":""}${n}`}
/* the tuần clock of a loan («qua tuần sau trả»): S.turn counts MONTHS (j3 monthTick), S.tuan the tuần in it (0..2); before r4 the due
   date was S.turn, so a loan stayed out a whole month. r3 review: LINEAR (= j8 wk(), 3 tuần a month) so a count of tuần can be added.
   S.turn is each seat's OWN life clock (co-op never syncs it): a loan handed to the other seat carries the room week (cw) and the receiver
   moves its due onto its own clock (dcDueIn) — before, a seat whose clock ran behind kept a returned piece for good (coop-dresscode-scan). */
function dcWk(){return (S.turn|0)*3+(S.tuan|0)}
function dcCW(){try{return (window.COOP&&COOP.state&&COOP.state.week)|0}catch(e){return 0}}
function dcDueIn(a){return dcWk()-(a&&a.cw!=null?Math.max(0,dcCW()-(a.cw|0)):0)}
function dcBid(e){return e&&e.bor&&e.bor.id}
/* the third road (same for everyone): buy a trâm of a missing colour at her own phẩm or under it from Nội vụ phủ — the cheapest that fits; a real new piece */
function dcBuyFit(p,fams){try{const P=Math.min(8,wdPOf(p));let best=null;for(let q=Math.max(0,P);q>=0;q--)for(const k of wdPool("tram",q,true)){const w=WD_ITEMS[k];const c=dcPiece(k);if(!w||w.nt||!c||!fams.includes(c[0]))continue;if(!best||w.pr<best.pr)best={k,f:c[0],pr:w.pr|0,w}}return best}catch(e){return null}}
function dcBuy(p,b){if(!b)return false;const bac=p===S?S.bac:(p.bac||0);if(bac<b.pr)return false;const e={k:b.k,from:"buy"};
 if(p===S)apply({bac:-b.pr});else ap(p,{bac:-b.pr});const w=wdOf(p);if(w.tram)dcInv(p).push(w.tram);w.tram=e;return true}
function dcLenders(to,fams){const D=BAL.dc.bor;const L=[];if(typeof rivals==="undefined"||!(to===S?dcLend():dcWorld()))return L;
 for(const v of rivals){if(!v||v===to||!v.alive||v.out||v.confined||v.coop)continue;if(aff(v,to)<D.fav)continue;
  for(const sl of D.sl){const c=dcOwnFit(v,fams,sl);if(c.length){L.push({v,...c[0]});break}}if(L.length>=D.max)break}return L}
/* THE ONE LOAN RULE (r4b, F1: the Hội phối đồ «Mượn» and the «Cho mượn» visit go through here too). o (optional): due = the last tuần of the loan
   (default this tuần → back the next one; the Hội phối đồ: the contest tuần), why = what it is for ("ts" Hội phối đồ, "ev" a visit), chest = never
   worn on the hair (the contest dresses from the chest), aff:false = the caller's own goodwill numbers (shown on its option) instead of BAL.dc.bor */
function dcBorrow(to,from,e,o){o=o||{};const D=BAL.dc;const inv=dcInv(from);const i=inv.indexOf(e);if(i<0)return false;inv.splice(i,1);
 try{if(typeof ilUid==='function')ilUid(e,from)}catch(x){}/* every lent piece carries its ledger id: the book finds it by id when another rule strips the loan mark */
 const b=Object.assign({},e);delete b.w;b.bor={from:dcOwnKey(from),to:dcOwnKey(to),due:o.due!=null?Math.max(dcWk(),o.due|0):dcWk(),id:`${dcWk()}:${b.k}:${dcOwnKey(from)}>${dcOwnKey(to)}`};if(o.why)b.bor.why=o.why;const w=wdOf(to);const sl=o.chest?null:(WD_ITEMS[b.k]||{}).sl;const dur=b.bor.due-dcWk();
 /* the guest lending to an NPC: the NPC side is the HOST's («dcin» below). Her copy of the NPC is left alone: a piece put on it was her
    dialog act, the week merge kept it over the host's return and the NPC wore it one tuần more on both seats (r4) */
 const gLend=dcGuest()&&from===S&&to!==S&&!to.coop;
 if(!gLend){if(sl==="tram"){const prev=w.tram;if(prev)dcInv(to).push(Object.assign(prev,{dcPrev:1}));w.tram=b}else dcInv(to).push(b)}
 dcRec(from,b);
 if(dcGuest()){if(to===S&&from!==S&&!from.coop)dcAsk("dcout",{bid:b.bor.id,from:from.id,pk:e.k,due:b.bor.due,dur,cw:dcCW(),b:dcSnap(b)});else if(from===S&&to!==S&&!to.coop)dcAsk("dcin",{bid:b.bor.id,to:to.id,e:b,dur,cw:dcCW(),wear:sl==="tram"?1:0})}
 if(o.aff!==false)try{affAdd(from,to,-D.bor.use);affAdd(to,from,D.bor.thanks)}catch(x){}/* the same for everyone: the lender spends goodwill, the borrower owes thanks */
 return true}
/* give back every piece whose festival tuần has passed (her seat handles the pieces she holds and the pieces she lent) */
function dcGiveBack(holder,e,where){const e0from=e.bor&&e.bor.from;const own=dcByKey(e0from);const w=wdOf(holder);const bid=dcBid(e);
 if(where==="slot"){const pi=dcInv(holder).findIndex(x=>x&&x.dcPrev);if(pi>=0){const prev=dcInv(holder).splice(pi,1)[0];delete prev.dcPrev;w.tram=prev}else w.tram=null}
 else{const i=dcInv(holder).indexOf(e);if(i>=0)dcInv(holder).splice(i,1)}
 delete e.bor;delete e.dcPrev;dcUnrec(own,bid);
 if((own&&own.coop)||dcOther(e0from))return own;/* lent by the other seat's player (found or not in the list this moment): she takes it back on her own seat */
 if(own===S&&bid&&dcCoop()){S.dcGot=Array.isArray(S.dcGot)?S.dcGot:[];if(S.dcGot.includes(bid))return own;S.dcGot=S.dcGot.slice(-19).concat([bid])}/* once, whatever the merge timing */
 if(dcGuest()&&own&&own!==S&&holder===S)dcAsk("dcin",{bid:"b"+bid,rb:bid,to:own.id,e,wear:0});
 if(!own&&typeof ilGone==="function"){/* r4b: the lender is no longer in the world (as the old Hội phối đồ return did): the piece goes to the ledger as her effects, never kept by the borrower */const ok=/^id:/.test(e0from||"")?e0from.slice(3):"";ilGone(holder,e,"dead",{own:ok});return null}
 dcInv(own||holder).push(e);return own}
/* r4b (F1) OLD SAVES: before r4b the Hội phối đồ lent with its own mark e.tsB (lender id) and its own return. Migrated once to the one
   loan mark: e.bor {from, to: her, due: the contest tuần (or past: back at the next tuần), why "ts"} + the lender's book (where the world is kept).
   The co-op guest's old e.tsB piece was spliced from HER copy of the NPC only — the host's NPC still holds it: her copy is the second one and goes. */
function dcMigTs(){if(!S||!Array.isArray(S.inv)||!S.inv.some(e=>e&&e.tsB!=null))return 0;let n=0;let D=null;try{D=typeof tsS==="function"?tsS().dress:null}catch(x){}
 const due=D&&D.m?dcWk()+Math.max(0,3*((D.y*12+D.m)-(S.year*12+S.month)))+(1-(S.tuan|0)):dcWk()-1;const drop=dcCoop()&&!dcWorld();
 for(const e of S.inv.slice()){if(!e||e.tsB==null)continue;const from="id:"+e.tsB;delete e.tsB;n++;
  if(drop){S.inv.splice(S.inv.indexOf(e),1);continue}if(e.bor)continue;
  try{if(typeof ilUid==="function")ilUid(e,S)}catch(x){}e.bor={from,to:dcOwnKey(S),due,id:`ts${dcWk()}:${e.k}:${from}>${dcOwnKey(S)}`,why:"ts"};
  const v=dcByKey(from);if(v&&v!==S)dcRec(v,e)}return n}
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{dcMigTs()}catch(e){console.error("dcMigTs",e)}return r}})();
/* ---------- the loan book (law 6c: a lent piece is never lost) ----------
   Every loan is written on the LENDER (her S, or the NPC: world state on the host): {bid, k, iu, to, due, e: a copy of the piece}.
   The holder scan above gives back what each seat sees; then the book is settled: a loan past its tuần whose piece the scan did not
   bring home is FOUND wherever it went (any chest / hair / pawn of anyone, or the ledger's box: confiscated, "net") and taken back to
   the lender; when it is nowhere (another rule took it out of the world on this seat: on the co-op guest her copy of the NPC is the
   host's world of an earlier moment) the lender gets her piece back from the book. A loan to the OTHER seat's player waits for that
   seat's «dcin». One rule for her and every NPC; the dcGot loan ids stop a second copy whatever the merge timing. */
function dcSnap(e){try{const c=JSON.parse(JSON.stringify(e));delete c.bor;delete c.dcPrev;delete c.w;return c}catch(x){return{k:e.k}}}
function dcRec(lender,b){if(!lender||lender.coop||!b||!b.bor)return;const L=lender.dcLent=Array.isArray(lender.dcLent)?lender.dcLent:[];const bid=b.bor.id;if(L.some(r=>r&&r.bid===bid))return;
 L.push({bid,k:b.k,iu:b.iu||0,to:b.bor.to||"",due:b.bor.due,e:dcSnap(b)})}
function dcUnrec(p,bid){if(!p||!bid||!Array.isArray(p.dcLent))return;p.dcLent=p.dcLent.filter(r=>r&&r.bid!==bid)}
function dcIsIt(e,r){return !!e&&typeof e==="object"&&(dcBid(e)===r.bid||(!!r.iu&&e.iu===r.iu&&e.k===r.k))}
function dcFind(r){const P=[S].concat((typeof rivals!=="undefined"?rivals:[]).filter(v=>v&&!v.coop));
 for(const p of P){const w=wdOf(p);if(w)for(const sl of ["tram","y"])if(dcIsIt(w[sl],r))return{p,e:w[sl],sl};
  const i=dcInv(p).findIndex(e=>dcIsIt(e,r));if(i>=0)return{p,e:p.inv[i],i};
  const j=(p.wdPawn||[]).findIndex(x=>x&&dcIsIt(x.e,r));if(j>=0)return{p,e:p.wdPawn[j].e,pawn:j}}
 try{const B=(S.il&&S.il.box)||[];const j=B.findIndex(x=>x&&dcIsIt(x.e,r));if(j>=0)return{box:j,e:B[j].e}}catch(x){}return null}
function dcTake(F){if(F.box!=null){S.il.box.splice(F.box,1);return}const p=F.p;
 if(F.sl){const w=wdOf(p);if(F.sl==="tram"){const pi=dcInv(p).findIndex(x=>x&&x.dcPrev);if(pi>=0){const prev=p.inv.splice(pi,1)[0];delete prev.dcPrev;w.tram=prev}else w.tram=null}else w[F.sl]=null;return}
 if(F.pawn!=null){p.wdPawn.splice(F.pawn,1);return}p.inv.splice(F.i,1)}
function dcLedger(back){const L=[S].concat(dcWorld()?(typeof rivals!=="undefined"?rivals:[]).filter(v=>v&&!v.coop):[]);
 for(const own of L){if(!Array.isArray(own.dcLent)||!own.dcLent.length)continue;
  for(const r of own.dcLent.slice()){if(!r||!(r.due<dcWk()))continue;
   if(dcOther(r.to)){/* on the other seat: her «dcin» clears it; a book line nobody answers is dropped after BAL.dc.bor.wait tuần */if(dcWk()-r.due>(BAL.dc.bor.wait|0))dcUnrec(own,r.bid);continue}
   const F=dcFind(r);let e=null;
   if(F&&F.p===own&&!F.e.bor){dcUnrec(own,r.bid);continue}/* already home */
   if(F){/* found away from home (on the guest: her copy of an NPC; the host takes it out of the world itself); a ledger «net» stub {k, iu} gets the book's copy of the piece */e=F.box!=null?Object.assign({},r.e||{},F.e):F.e;dcTake(F)}
   else e=Object.assign({},r.e||{k:r.k});
   dcUnrec(own,r.bid);delete e.bor;delete e.dcPrev;
   if(own===S&&dcCoop()){S.dcGot=Array.isArray(S.dcGot)?S.dcGot:[];if(S.dcGot.includes(r.bid))continue;S.dcGot=S.dcGot.slice(-19).concat([r.bid])}
   dcInv(own).push(e);back.push([e,F&&F.p||own,own])}}}
function dcReturn(){if(!S)return;const me=dcOwnKey(S);const back=[];
 const scan=(p,mine)=>{if(!p)return;const w=wdOf(p);const W=dcWorld(),G=dcGuest();const isMe=f=>f===me||f==='me'||/^me:/.test(f||'');const due=e=>e&&e.bor&&e.bor.due<dcWk()&&(mine||(W&&(isMe(e.bor.from)||/^id:/.test(e.bor.from))));/* r3: the guest's lent pieces on her copies of NPCs: her book (dcLedger, her clock) settles them, not the host's due on the copy */
  if(w&&due(w.tram)){const e=w.tram;const o=dcGiveBack(p,e,"slot");back.push([e,p,o])}
  for(const e of dcInv(p).slice())if(due(e)){const o=dcGiveBack(p,e,"inv");back.push([e,p,o])}};
 const sc=(p,m)=>{try{scan(p,m)}catch(x){console.error("dcReturn",x)}};/* one odd chest never stops the others' returns */
 sc(S,true);for(const v of (typeof rivals!=="undefined"?rivals:[]))if(v&&!v.coop)sc(v,false);
 try{dcLedger(back)}catch(x){console.error("dcLedger",x)}
 /* r3 review: a trâm put aside for a loan (dcPrev) whose loan is no longer on the hair (the borrowed piece was taken off / swapped for her own
    before it went back) keeps no mark: the mark hid it from every road (dcOwnFit: «Cài … của mình», lending) for good. Her seat for her; NPCs only where the
    world is kept (the guest never writes her copy of an NPC: r4 lesson). Only the mark goes: what she wears is her own choice. */
 const heal=p=>{try{const w=wdOf(p);if(!w||(w.tram&&w.tram.bor))return;const inv=dcInv(p);for(const e of inv)if(e&&e.dcPrev&&!e.bor)delete e.dcPrev}catch(x){}};
 heal(S);if(dcWorld())for(const v of (typeof rivals!=="undefined"?rivals:[]))if(v&&!v.coop)heal(v);
 for(const [e,p,o] of back){try{log(o?`${dcNm(e.k)} đã trả về cho ${dcName(o)}.`:`${dcNm(e.k)} không còn chủ để trả, đã nộp về Nội vụ phủ.`)}catch(x){}}}
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
 if(lack.length)for(const L of dcLenders(S,lack))opts.push({n:`Mượn ${L.w.n} (${dcFamN(L.f)}) của ${dcName(L.v)}`,fx:{},x:`tốn: ${D.bor.khac} khắc · thành: có màu ${dcFamN(L.f)} cho lễ, qua tuần sau trả · kèm: ${dcRelW(L.v,-D.bor.use)}`,
  go:()=>{if(dcBorrow(S,L.v,L.e)){spend(D.bor.khac);dcHer().ch="bor";try{log(`Mượn ${L.w.n} của ${dcName(L.v)} để dự ${f.name}; qua tuần sau phải trả.`)}catch(e){}dcEnter(f);return}
   /* r3 review (fix-the-group of r2 item 3 on her side): the gate is built in endTurn, the NPCs' own festival loans run right after it (dcWeek) — when
      one of them took this very piece, the road is gone: say so and open the gate again with the roads still there (before: nothing happened, she
      went in lacking the colour, no word) */
   try{log(`${L.w.n} của ${dcName(L.v)} đã có người mượn trước.`)}catch(e){}const st2=dcStat(S,f.k);if(st2&&(st2.miss||st2.refused))Q.unshift(dcGateItem(f,st2));else dcEnter(f)}});
 const buy=lack.length?dcBuyFit(S,lack):null;/* offered only when she has the silver (a road she can take) */
 if(buy&&S.bac>=buy.pr)opts.push({n:`Sai người mua ${buy.w.n} (${dcFamN(buy.f)}) ở Nội vụ phủ`,fx:{},x:`tốn: ${D.buy.khac} khắc, Bạc -${buy.pr} · thành: có màu ${dcFamN(buy.f)} cho lễ, trâm giữ lại trong rương`,
  go:()=>{if(dcBuy(S,buy)){spend(D.buy.khac);dcHer().ch="chg";try{log(`Mua ${buy.w.n} ở Nội vụ phủ để dự ${f.name}.`)}catch(e){}}dcEnter(f)}});
 if(!st.refused)opts.push({n:"Cứ thế vào dự",fx:{},x:"thành: vào dự lễ như đang mặc",go:()=>dcEnter(f)});
 opts.push({n:"Cáo lỗi, về cung nghỉ",fx:{},x:"thành: về cung nghỉ, không dự lễ",go:()=>dcOut(f)});
 const it={t:`Y phục dự ${f.name}`,h:dcFacts(st,f).map(s=>`<p>${s}</p>`).join(""),opts,ev:"dc",evId:"dc:"+f.k,must:1};
 DC_CUR=it;return it}
/* called by jdc0 inside the endTurn chain, after the new tuần began and before the festival events are queued */
function dcTurn(){if(!S)return;try{dcMigTs()}catch(e){console.error("dcMigTs",e)}if(!dcOn()){/* r4b: loans come home whatever the dress-code switch (the Hội phối đồ lends through the same book) */try{dcReturn()}catch(e){console.error("dcReturn",e)}return}/* loans come home even in a tuần she dies (the NPCs' loans, and hers into her effects): law 6c */if(!S.dead)try{dcNpcSettle()}catch(e){console.error("dcNpcSettle",e)}/* mocked as they went in, before the pieces go back */try{dcReturn()}catch(e){console.error("dcReturn",e)}if(S.dead)return;
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
 /* r3 review: her season check runs once per TUẦN (dcWk), as every NPC's dcSeasonDue above (law 1) and as the frame says («từ tuần sau … bị chê ở buổi thỉnh an»);
    before it was keyed by S.turn = MONTHS: she paid once a month (nothing at all in a season's first month after the warning) while NPCs paid each tuần */
 if(dcHerOn()&&dcOffSeason(S)&&dcSeasonRoad(S)&&S.dcSw!==dcWk()){S.dcSw=dcWk();const c=dcSeasonCost(S);const y=wdItem(wdOf(S).y);const first=dcSeasonFirst();
  const fx={};if(!first){if(c.danh)fx.danh=-c.danh;if(c.th)fx.th=-c.th}
  if(first&&(c.danh||c.th)){const sn=BAL.dc.season.n;Q.push({t:"Sang mùa mới",ev:"dc",evId:"dc:season0",who:typeof pTH==="function"?pTH():null,
    h:`<p>Đã sang mùa ${sn[dcSeason()]}; y phục đang mặc là ${y?y.n:"áo"} (${BAL.dc.season.fabN[dcYFab(y&&y.k)]||"vải"}, hợp mùa ${dcYSeasons(y&&y.k).map(i=>sn[i]).join(", ")}).</p><p>Tuần này còn kịp đổi; từ tuần sau mặc áo trái mùa thì bị chê ở buổi thỉnh an.</p><p>Vào Tư trang, chạm ô Y phục, chọn bộ hợp mùa.</p>`})}
  if(Object.keys(fx).length){apply(fx);const sn=BAL.dc.season.n;
   Q.push({t:"Áo trái mùa",ev:"dc",evId:"dc:season",who:typeof pTH==="function"?pTH():null,
    h:`<p>Đang mùa ${sn[dcSeason()]} mà y phục đang mặc là ${y?y.n:"áo"} (${BAL.dc.season.fabN[dcYFab(y&&y.k)]||"vải"}, hợp mùa ${dcYSeasons(y&&y.k).map(i=>sn[i]).join(", ")}).</p><p>Buổi thỉnh an, Thái hậu và các cung chê không biết lễ đổi y phục theo mùa.</p><p>Muốn khỏi bị chê: vào Tư trang, chạm ô Y phục, chọn bộ hợp mùa.</p>`});
   try{log(`Mặc áo trái mùa: ${Object.entries(fx).map(([k,v])=>statTxt(k,v)).join(", ")}.`)}catch(e){}}}
 /* two-way borrow: a consort who lacks a colour asks to borrow her trâm (her seat; the piece moves for real) */
 const f=dcFestNow();if(f&&dcHerOn()&&dcLend()&&S.dcAk!==dcKey(f)){S.dcAk=dcKey(f);
  for(const v of R){if(!v||!v.alive||v.out||v.coop||aff(v,S)<BAL.dc.bor.fav)continue;const st=dcStat(v,f.k);if(!st||(!st.miss&&!st.refused)||!st.missing.length)continue;
   const c=dcOwnFit(S,st.missing,"tram")[0];if(!c)continue;
   Q.push({t:`${dcName(v)} xin mượn trâm`,who:v,ev:"dc",evId:"dc:ask",h:`<p>${v.name} thiếu màu ${dcFamList(st.missing)} cho ${f.name}, sai cung nữ sang xin mượn ${c.w.n} của ngươi, qua tuần sau trả.</p>`,
    opts:[{n:`Cho mượn ${c.w.n}`,fx:{},x:`tốn: ${c.w.n} rời rương đến tuần sau · thành: ${dcRelW(v,BAL.dc.bor.thanks)}`,go:()=>{if(dcBorrow(v,S,c.e)){try{log(`Cho ${dcName(v)} mượn ${c.w.n} dự ${f.name}.`)}catch(e){}}else try{log(`${c.w.n} không còn trong rương, không cho ${dcName(v)} mượn được.`)}catch(e){}}},
     {n:"Khéo từ chối",fx:{},x:`thành: ${c.w.n} vẫn ở trong rương`,go:()=>{try{log(`Từ chối cho ${dcName(v)} mượn trâm.`)}catch(e){}}}]});break}}}
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
/* r3 review (law 6c, same family): nor lost through jlost «thất lạc» — loLose picks by loOk, loLoseE is the targeted road (ilGone "lost": the piece then
   goes to the ledger box, where the loan book finds it). Before, the case held the piece while the book gave the lender her copy: when the case was
   solved the piece came back too — two of one (dresscode-loan-scan, coop-dresscode-scan). A loan lasts one tuần; the lender's piece is safe meanwhile. */
(function(){try{if(typeof loOk==="function"){const o0=loOk;loOk=function(e){if(e&&e.bor)return false;return o0.apply(this,arguments)}}
 if(typeof loLoseE==="function"){const l0=loLoseE;loLoseE=function(p,e){if(e&&e.bor)return null;return l0.apply(this,arguments)}}}catch(e){}})();
(function(){if(typeof wdActBtns!=="function")return;const b0=wdActBtns;wdActBtns=function(e){try{if(e&&e.bor)return[]}catch(x){}return b0.apply(this,arguments)};window.wdActBtns=wdActBtns})();
function dcNm(k){try{return (WD_ITEMS[k]||{}).n||itm(k).n||"Món đồ"}catch(x){return"Món đồ"}}
function dcLoanRow(e){if(!e||!e.bor)return null;const o=dcByKey(e.bor.from);return["Mượn",`của ${o?dcName(o):"người khác"} · ${e.bor.why==="ts"?"xong hội phối đồ thì trả":"qua tuần sau trả"}`,"n"]}
/* ---------- co-op host: the guest's requests (jcoopask H, PROTOCOL §4.1); 1 = done, 0 = refused ---------- */
(function(){const CW=window.COOPW;if(!CW||!CW.askH)return;
 const npc=id=>(typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===id&&!v.coop)||null;
 /* dcout: the piece she borrowed leaves the NPC's chest (or the NPC's hair, if the NPC put it on this week) */
 CW.askH.dcout=function(a){const v=npc(a.from);if(!v)return 0;const inv=dcInv(v);const w=wdOf(v);
  /* r3 review: ONLY the same piece she took — its ledger id (a.b.iu), or, when her copy numbered it, the one still un-numbered here. Before: the first
     of that kind. A race (another consort borrowed / took that very piece on this seat the same week) then gave her a stand-in or nothing, and her
     «dcin» brought the piece back a second time (one id twice, coop-dresscode-scan). Now refused; the loan id is kept (dcNo) so her return is a no-op. */
  const m=e=>e&&e.k===a.pk&&!e.bor&&!e.dcPrev&&!e.h;const iu=a.b&&a.b.iu;let ok=0;
  for(const t of (a.b?[e=>!!iu&&e.iu===iu,e=>!e.iu]:[()=>true])/* a request without the piece (old client): any of that kind, as before */){const i=inv.findIndex(e=>m(e)&&t(e));if(i>=0){inv.splice(i,1);ok=1;break}if(w&&m(w.tram)&&t(w.tram)){w.tram=null;ok=1;break}}
  if(!ok&&a.bid)v.dcNo=(Array.isArray(v.dcNo)?v.dcNo:[]).slice(-19).concat([a.bid]);
  if(ok&&a.b&&a.bid){/* the NPC's loan book (the guest's copy of the NPC is not the world): the piece comes back through her «dcin» */const L=v.dcLent=Array.isArray(v.dcLent)?v.dcLent:[];
   if(!L.some(r=>r&&r.bid===a.bid))L.push({bid:a.bid,k:a.pk,iu:a.b.iu||0,to:"id:"+(window.COOPW.seat==="a"?902:901),due:dcDueIn(a)+(a.dur|0),e:a.b})}return ok};
 /* dcin: a piece goes into the NPC's chest; a loan TO the NPC is worn (her own trâm kept aside, dcPrev, as dcBorrow does) */
 CW.askH.dcin=function(a){const v=npc(a.to);if(!v||!a.e||!a.e.k)return 0;const e=JSON.parse(JSON.stringify(a.e));
  if(e.bor&&!a.rb){e.bor.due=dcDueIn(a)+(a.dur|0);if(e.bor.due<dcWk())return 1}/* r3: a loan TO the NPC on this seat's clock; arrived after its tuần (at the merge): it is over, the lender's book takes it home on her seat */const w=wdOf(v);const bid=dcBid(e);
  if(a.rb)dcUnrec(v,a.rb);/* the guest gave back what she borrowed: off the NPC's book */
  if(a.rb&&Array.isArray(v.dcNo)&&v.dcNo.includes(a.rb))return 1;/* r3: that loan was refused here (dcout above): the piece never left this NPC, nothing comes back */
  if(bid&&((w.tram&&dcBid(w.tram)===bid)||dcInv(v).some(x=>dcBid(x)===bid)))return 1;
  if(a.wear){const prev=w.tram;if(prev)dcInv(v).push(Object.assign(prev,{dcPrev:1}));w.tram=e}else dcInv(v).push(e);return 1};
 /* guest: a refused dcout (the NPC no longer had it) → the piece never came; her own trâm goes back on */
 CW.askBack=CW.askBack||{};CW.askBack.dcout=function(d,a,res){if(res[0]!==0||!d||!d.S)return;const bid=a.bid;const w=d.S.wd;const inv=Array.isArray(d.S.inv)?d.S.inv:[];
  if(w&&w.tram&&dcBid(w.tram)===bid){const pi=inv.findIndex(x=>x&&x.dcPrev);if(pi>=0){const p=inv.splice(pi,1)[0];delete p.dcPrev;w.tram=p}else w.tram=null}
  else{const i=inv.findIndex(x=>dcBid(x)===bid);if(i>=0)inv.splice(i,1)}
  const nm=(()=>{try{return itm(a.pk).n}catch(x){return"Món đồ"}})();d.S.askNote=(d.S.askNote||[]).concat([`${nm} định mượn đã không còn trong rương người cho mượn${a.dur?"":"; ngươi cài lại trâm của mình"}.`])}})();
/* ---------- kit surfaces: item rows (Tư trang), wear-slot label, calendar popover ---------- */
function dcItemRows(k){const w=WD_ITEMS[k];if(!w)return"";const R=[];
 if(w.sl==="y"){const sn=BAL.dc.season.n;R.push(["Màu",dcPair(dcRobe(S)).concat(["theo tranh dáng người đang mặc"]),"n"]);
  R.push(["Hợp mùa",`${dcYSeasons(k).map(i=>sn[i]).join(", ")} (${BAL.dc.season.fabN[dcYFab(k)]||"vải"})`,"n"])}
 else R.push(["Màu",dcPair(dcPiece(k)),"n"]);return kitRows(R)}
/* KIT §70: the ONE item detail (kitItemDetailRows) used by every item cell (Tư trang, Bên mình, shop, reward box…) */
(function(){if(typeof kitItemDetailRows!=="function")return;const r0=kitItemDetailRows;kitItemDetailRows=function(ref){const h=r0.apply(this,arguments);try{if(!dcOn()||!h||/>Màu</.test(h))return h;const R=typeof kitItemRef==="function"?kitItemRef(ref):null;if(R&&!WD_ITEMS[R.k]&&R.e&&R.e.bor){/* r4b: a borrowed piece of any kind (the Hội phối đồ lends vòng, lụa, hương) says whose it is */const lr=dcLoanRow(R.e);return lr?(typeof kitRowsJoin==="function"?kitRowsJoin(h,kitRows([lr])):h+kitRows([lr])):h}if(!R||!WD_ITEMS[R.k])return h;const lr=dcLoanRow(R.e);const x=dcItemRows(R.k)+(lr?kitRows([lr]):"");return x?(typeof kitRowsJoin==="function"?kitRowsJoin(h,x):h+x):h}catch(err){console.error("dc rows",err);return h}};window.kitItemDetailRows=kitItemDetailRows})();
(function(){if(typeof wdItemRowsE!=="function")return;const r0=wdItemRowsE;wdItemRowsE=function(e){const h=r0.apply(this,arguments);try{if(!dcOn()||!e||!WD_ITEMS[e.k]||/>Màu</.test(h))return h;const x=dcItemRows(e.k);return x?(typeof kitRowsJoin==="function"?kitRowsJoin(h,x):h+x):h}catch(err){console.error("dc rows",err);return h}}})();
(function(){if(typeof kitWearSlots!=="function")return;const k0=kitWearSlots;kitWearSlots=function(p){const h=k0.apply(this,arguments);try{if(!dcOn()||!p||!h||!dcOffSeason(p))return h;
 const lab=`<span class="kitl kitl-no">Trái mùa</span>`;return h.indexOf('<span class="kwearl">')>=0?h.replace('<span class="kwearl">','<span class="kwearl">'+lab+" "):h.replace(/<\/div>$/,`<span class="kwearl">${lab}</span></div>`)}catch(e){return h}}})();
(function(){if(typeof mcPopHTML!=="function")return;const m0=mcPopHTML;mcPopHTML=function(k){const h=m0.apply(this,arguments);try{const c=dcOn()&&BAL.dc.fest[k];if(!c||!h)return h;
 const line=`<div><b>Y phục:</b> ${c.need.map(f=>dcDot(f,"")).join(", ")}${BAL.dc.kyOn&&c.ky.length?` · kiêng áo ${dcFamList(c.ky)}`:""}${c.gate?" · không có màu nào hợp lễ thì bị chặn ngoài cửa":""}</div>`;
 return h.replace(/<\/div>$/,line+"</div>")}catch(e){return h}}})();
window.dcSeasonDue=dcSeasonDue;window.dcSeasonRoad=dcSeasonRoad;window.dcNpcFest=dcNpcFest;window.dcNpcSettle=dcNpcSettle;window.dcLenders=dcLenders;window.dcGateItem=dcGateItem;window.dcStat=dcStat;window.dcShows=dcShows;window.dcRobe=dcRobe;window.dcPiece=dcPiece;window.dcOffSeason=dcOffSeason;window.dcTurn=dcTurn;window.dcWeek=dcWeek;window.dcBorrow=dcBorrow;window.dcReturn=dcReturn;window.dcCutPhan=dcCutPhan;window.dcRefused=dcRefused;window.dcItemRows=dcItemRows;
