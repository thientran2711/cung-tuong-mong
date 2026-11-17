/* ================= jpromo: PROMOTION REWARDS (owner 15/11 20:05Z #9, review/promo-rules) — KIT §65 =================
   Every rank-up gives the FULL SET of the new rank as real items, on every road:
   - Consort ranks (Đáp ứng … Hoàng hậu; also a cung nữ raised to Đáp ứng): y phục + trâm of the rank (j92 WD store, phẩm P = rank+1, the trâm in
     the robe's colour when one exists) + the jewellery of the rank (Đeo tay, Túi thơm; the rank's head mark of jmark joins the chest) + extras
     (cloth, tea, food, wine, tonics) from BAL.promo.extra[rank]. The y phục / trâm come through wdGain (nvp: known phẩm, as j92's issue did;
     j92's month-end «Nội vụ phủ đưa y phục theo phẩm mới» is skipped while window.PROMO_SET). Entries from:"nvp" (Nội vụ phủ buys back cheap).
   - Servant road (cung nữ ranks 1..4, ma ma): the humble set of BAL.promo.srv[rank] (maid robe and pin from rank 2, cloth, tea, food…).
   TWO SCREENS for her (queued after the j93 edict, kmPush):
     §65.1 the reward chest = j93 kitReward kind "chest" (servant road: "pouch"), title «Phẩm phục <rank>» (jmark adds the head mark) → Nhận;
     §65.2 kitPersonReveal: the servant Nội vụ phủ newly assigns stands big, full-body, transparent, in the centre (kitFigOf + kitFigBody
           body fit, KIT_FIG 90 % rule), with one cổ trang line («… Nội vụ phủ phụ cấp thêm …») → Nhận.
   Staff: HER capOf grows by one servant at every rank (BAL.promo.cap, [maids incl. her own maid, eunuchs]; NPC caps unchanged); on a rank-up
   Nội vụ phủ assigns the new one FREE (prStaff: pool candidate, new face, or moved from the lowest household — faces stay unique). Servant road ranks get no servant (nobody serves a cung nữ): chest only.
   NPC consorts: the same set + servant, data only (no screens), on the co-op host only (world agency, jcoopworld mute rule).
   Old saves: the rank seen so far is set silently on load (no chest for the past). State S.prSeen = {r: consort rank | null, s: servant rank}.
   Per-rank Đeo eo / Đeo tay / Túi thơm pictures (D45 small-art) are wired: BAL.promo.waist / wrist / scent, items in jinv RANKED_*. */
window.PROMO_SET=1;
Object.assign(BAL,{promo:{
 /* [maids incl. her own personal maid, eunuchs] per consort rank 0..7: one more servant at every rank */
 cap:[[1,1],[2,1],[2,2],[3,2],[3,3],[4,3],[4,4],[5,4]],
 wrist:["vongngoc","vongngoc_r1","vongngoc_r2","vongngoc_r3","vongngoc_r4","vongvang","vongvang","vongvang"],
 waist:["ngocboi_r0","ngocboi_r1","ngocboi_r2","ngocboi_r3","ngocboi_r4","ngocboi_r5","ngocboi_r6","ngocboi_r7"],
 scent:["tuithom","tuithom_r1","tuithom_r2","tuithom_r3","tuithom_r4","tuithom_r5","tuithom_r6","tuithom_r7"],
 extra:[[["luahang",1],["tragoi",1],["banhtrai",1]],
  [["luahang",1],["tragoi",1],["banhtrai",1],["ruoucuc",1]],
  [["luahang",2],["tragoi",1],["banhtrai",1],["ruoucuc",1]],
  [["luahang",2],["trahop",1],["traicay",1],["ruoucuc",1]],
  [["gamto",1],["luahang",1],["trahop",1],["traicay",1],["ruoucuc",1],["yensao",1]],
  [["gamto",1],["luahang",1],["trahop",1],["traicay",1],["ruoucuc",1],["yensao",1]],
  [["gamto",2],["trahop",2],["traicay",1],["ruoucuc",1],["yensao",1],["nhansam",1]],
  [["gamvang",1],["gamto",1],["trahop",2],["traicay",1],["ruoucuc",2],["yensao",1],["nhansam",1]]],
 /* servant road: index = SRK.maid rank 1..4, 5 = ma ma; "wd:" = a WD garment / pin */
 srv:[[],[["vaibong",1],["banhtrai",1]],[["wd:y_luamoc",1],["wd:tram_dong",1],["vaibong",1],["tragoi",1],["banhtrai",1]],
  [["wd:y_chuongsu",1],["luahang",1],["tragoi",1],["traicay",1],["tuithom",1]],[["wd:y_nuquan",1],["luahang",2],["trahop",1],["traicay",1],["ruoucuc",1]],[["wd:y_mama",1],["luahang",1],["trahop",1],["traicay",1],["ruoucuc",1]]]}});
/* ---------- staff capacity: one more servant at every rank ---------- */
/* HER household only: NPC households keep j10's caps, so the palace's servant count (bounded by the unique face pool) stays as it was */
(function(){if(typeof capOf!=="function")return;const c0=capOf;capOf=function(p){try{const C=BAL.promo&&BAL.promo.cap;if(C&&p===S&&!(typeof isSrv==="function"&&isSrv()))return C[Math.max(0,Math.min(7,rkOf(p)))].slice()}catch(e){}return c0.apply(this,arguments)}})();
/* ---------- the set ---------- */
function prRankName(r){return r>=7?"Hoàng hậu":RANKS[Math.max(0,Math.min(7,r))].n}
/* [[key, n, "wd"|"it"]] for consort rank r */
function prSetFor(r){r=Math.max(0,Math.min(7,r|0));const P=Math.min(8,r+1);const L=[];let y=null,t=null;
 try{y=wdPickAt(P,"y",1)||wdPickAt(P,"y",0);const col=y&&WD_ITEMS[y]?WD_ITEMS[y].col:null;const T=WD_LIST.filter(x=>x[1]==="tram"&&x[3]===P&&x[4]!==4);
  const m=T.filter(x=>x[5]===col);const pk=m.length?pick(m):T.length?pick(T):null;t=pk?pk[0]:null}catch(e){}
 if(y)L.push([y,1,"wd"]);if(t)L.push([t,1,"wd"]);const B=BAL.promo;const w=B.wrist[r];if(w&&IT[w])L.push([w,1,"it"]);const wa=B.waist&&B.waist[r];if(wa&&IT[wa])L.push([wa,1,"it"]);const sc=Array.isArray(B.scent)?B.scent[r]:B.scent;if(sc&&IT[sc])L.push([sc,1,"it"]);
 for(const [k,n] of B.extra[r]||[])if(IT[k])L.push([k,n,"it"]);return L}
function prSrvSetFor(i){const L=[];for(const [k0,n] of (BAL.promo.srv[i]||[])){const wd=/^wd:/.test(k0),k=k0.replace(/^wd:/,"");if(wd?(typeof WD_ITEMS==="object"&&WD_ITEMS[k]):IT[k])L.push([k,n,wd?"wd":"it"])}return L}
/* give the set to p (data); returns the new inventory entries */
function prGive(p,L){const E=[];p.inv=p.inv||[];for(const [k,n,kind] of L)for(let i=0;i<n;i++){
  if(kind==="wd"&&typeof wdGain==="function"){const g=wdGain(p,k,{from:"nvp",giver:"Nội vụ phủ",nvp:1});if(g&&g.e)E.push(g.e)}
  else{const e={k,from:"nvp",giver:"Nội vụ phủ",d:S.turn};p.inv.push(e);E.push(e)}}
 return E}
/* one new servant, free, while under the rank's cap (maids first). Faces are unique in the whole palace (j17 roomFor = the face pool), so:
   1. this month's Nội vụ phủ candidate (j29 npool), 2. a new person while the face pool has room, 3. (her only) a servant Nội vụ phủ moves
   from the lowest-ranked household that has one to spare. null when nobody can come. */
function prStaff(p){try{if(!p||typeof mkServ!=="function")return null;p.staff=p.staff||[];const [cm,ce]=capOf(p);
 const m=p.staff.filter(s=>s.role==="maid").length+1,e=p.staff.filter(s=>s.role==="eunuch").length;
 const order=m-cm<=e-ce?["maid","eunuch"]:["eunuch","maid"];
 for(const role of order){const under=role==="maid"?m<cm:e<ce;if(!under)continue;let s=null;
  try{s=typeof takeFromPool==="function"?takeFromPool(role):null}catch(x){}
  if(!s&&roomFor(role))s=mkServ(role);
  if(!s&&p===S){const H=(typeof rivals!=="undefined"?rivals:[]).filter(v=>v&&v.alive!==false&&!v.out&&!v.coop&&v!==p&&(v.staff||[]).some(x=>x.role===role&&!x.coop)).sort((a,b)=>rkOf(a)-rkOf(b));
   const v=H[0];if(v){const L=v.staff.filter(x=>x.role===role&&!x.coop).sort((a,b)=>srk(a)-srk(b));s=L[0];v.staff.splice(v.staff.indexOf(s),1);s.spyFor=null;s.loyal=cl(40+R(21),0,100);s.from=v.id}}
  if(!s)continue;if(s.rk==null)s.rk=1;p.staff.push(s);if(p===S)try{if(typeof k61Know==="function")k61Know(s,"Nội vụ phủ đưa đến hầu",true,2)}catch(x){}return s}}catch(x){console.error("prStaff",x)}return null}
/* ---------- the two screens ---------- */
function prItemsOf(E){const M=new Map();for(const e of E){const it=typeof kgItem==="function"?kgItem(e):{n:itm(e.k).n,d:"",img:kmItemImg(e.k),tier:kmTierOf(e.k)};
  const key=e.k;if(M.has(key))M.get(key).c++;else M.set(key,Object.assign({c:1},it))}
 return [...M.values()].map(x=>Object.assign({},x,{n:x.c>1?`${x.n} ×${x.c}`:x.n}))}
function prChest(E,o){if(!E.length||typeof kitReward!=="function"||!(typeof kmOn==="function"&&kmOn()))return;
 try{if(typeof KMSNAP!=="undefined"&&KMSNAP&&KMSNAP.inv)E.forEach(e=>{if(!KMSNAP.inv.includes(e))KMSNAP.inv.push(e)})}catch(e){}
 kitReward({kind:o.kind||"chest",title:o.title,from:o.from,items:prItemsOf(E)})}
/* §65.2 kitPersonReveal({who, title, sub, line, btn}) — one person presented: big full-body transparent figure in the centre, name, one line, button */
function kitPersonRevealHTML(o){const p=o.who;let src="";try{src=kitFigOf(p)}catch(e){}let nm="";try{nm=typeof kitName==="function"?kitName(p,{cap:true}):kmEsc(p.name)}catch(e){nm=kmEsc(p&&p.name)}
 return `<div class="kprev"><div class="kmrew-h kprev-h"><b>${kmEsc(o.title||"")}</b>${o.sub?`<small>${kmEsc(o.sub)}</small>`:""}</div>
  <div class="kprev-fig">${src?`<img class="kprev-img" src="${src}" alt="" draggable="false" decoding="async" onerror="this.remove()">`:""}</div>
  <div class="kprev-card"><div class="kprev-n">${nm}</div>${o.line?`<p class="kprev-l">${o.line}</p>`:""}<button type="button" class="kbtn kmtake" data-km-close>${kmEsc(o.btn||"Nhận")}</button></div></div>`}
/* body fit (KIT 33 rule): the body (head top..feet) fills 90 % of the figure box, feet on its bottom line; never shrunk to the canvas */
function kprevFit(root){try{const box=root.querySelector(".kprev-fig"),im=root.querySelector(".kprev-img");if(!box||!im)return;const src=im.getAttribute("src");
 const b=typeof kitFigBody==="function"?kitFigBody(src,()=>kprevFit(root)):null;const H=box.clientHeight;if(!H)return;
 if(!b){im.style.height=H+"px";im.style.top="0";return}const bf=Math.max(.3,b.b-b.ht);const h=H*.9/bf;im.style.height=h+"px";im.style.top=(H-b.b*h)+"px"}catch(e){}}
function kitPersonReveal(o){if(!o||!o.who||typeof kmPush!=="function")return;window.__prRev=(window.__prRev||0)+1;
 kmPush(done=>{const st=kmStage("km-reward km-prev",kitPersonRevealHTML(o),{manual:true,dur:60000,onEnd:done});st.ov.id="kprevov";const root=st.ov.querySelector(".kprev");
  kprevFit(root);requestAnimationFrame(()=>kprevFit(root));const rs=()=>kprevFit(root);addEventListener("resize",rs);const mo=new MutationObserver(()=>{if(!st.ov.isConnected){removeEventListener("resize",rs);mo.disconnect()}});mo.observe(document.body,{childList:true});
  try{if(typeof sfx==="function")sfx("sfx-open")}catch(e){}},{pre:(()=>{try{return [...String(kitPersonRevealHTML(o)).matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map(m=>m[1]).filter(u=>!/^data:/.test(u)).slice(0,3)}catch(e){return[]}})()})}
function prServLine(s,r){const maid=s.role==="maid";const self=maid?"Nô tỳ":"Nô tài";const kind=maid?"một cung nữ":"một thái giám";
 return `«${self} ${kmEsc(s.name)} khấu kiến chủ tử. Chủ tử được tấn phong ${kmEsc(prRankName(r))}, Nội vụ phủ phụ cấp thêm ${kind} theo lệ, sai ${self.toLowerCase()} đến hầu hạ chủ tử. Từ nay xin chủ tử sai bảo.»`}
function prServSub(s){const b=[];try{b.push(srkName(s))}catch(e){}if(s.age)b.push(`${s.age} tuổi`);if(s.org)b.push(s.org);return b.join(" · ")}
/* ---------- her: any code path that raises her rank (render diff, like j93 kmDiff) ---------- */
function prRoad(){return typeof isSrv==="function"&&isSrv()}
function prSrvRk(){return S.srv&&S.srv.mama?5:Math.max(0,S.srv&&S.srv.rk|0)}
function prCheck(){if(!S||S.dead)return;const srv=prRoad();let z=S.prSeen;
 if(!z||typeof z!=="object"){S.prSeen={r:srv?null:S.rank,s:srv?prSrvRk():null};return}
 if(srv){const cur=prSrvRk();if(z.s==null||S.srv.lau>0){z.s=cur;return}if(cur>z.s){const E=[];for(let i=z.s+1;i<=cur;i++)E.push(...prGive(S,prSrvSetFor(i)));z.s=cur;
   prChest(E,{kind:"pouch",title:`Đồ thưởng ${cur===5?"Ma ma":SRK.maid[cur]}`,from:"Nội vụ phủ phát theo bậc mới"});window.__prN=(window.__prN||0)+1}else if(cur<z.s)z.s=cur;return}
 if(S.out)return;const cur=S.rank;const from=z.r==null?-1:z.r;
 if(cur>from){const E=[],staff=[];for(let r=from+1;r<=cur;r++){E.push(...prGive(S,prSetFor(r)));const s=prStaff(S);if(s)staff.push([s,r])}z.r=cur;z.s=null;
  prChest(E,{title:`Phẩm phục ${prRankName(cur)}`,from:`Nội vụ phủ phụng chỉ đưa tới · ${prRankName(cur)}`});window.__prN=(window.__prN||0)+1;
  if(typeof kmOn==="function"&&kmOn())for(const [s,r] of staff)kitPersonReveal({who:s,title:"Nội vụ phủ phụ cấp người hầu",sub:prServSub(s),line:prServLine(s,r)})}
 else if(cur<from)z.r=cur}
/* ---------- NPC consorts: data only, on the co-op host only ---------- */
function prHostOK(){try{const W=window.COOPW;return !(W&&W.on&&W.seat!=="a")}catch(e){return true}}
function prNpcScan(){if(!S||!prHostOK())return;for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||v.coop||v.alive===false)continue;const r=rkOf(v);
  if(v.prSeen==null){v.prSeen=r;continue}if(v.out)continue;if(r>v.prSeen){for(let i=v.prSeen+1;i<=r;i++){prGive(v,prSetFor(i));prStaff(v)}v.prSeen=r;window.__prNpc=(window.__prNpc||0)+1}else if(r<v.prSeen)v.prSeen=r}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{prCheck()}catch(e){console.error("promo set",e)}return r}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{prNpcScan();prCheck()}catch(e){console.error("promo npc",e)}return r}})();
(function(){if(typeof rivalsMonth!=="function")return;const m0=rivalsMonth;rivalsMonth=function(){const r=m0.apply(this,arguments);try{prNpcScan()}catch(e){console.error("promo npc",e)}return r}})();
/* ---------- CSS: §65.2 person reveal (§65.1 is j93 kitReward's own look) ---------- */
(function(){const st=document.createElement("style");st.textContent=`
.kprev{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:560px;height:min(100dvh - 24px,920px);padding:0 16px;box-sizing:border-box}
.kprev-h{flex:none}
.kprev-fig{position:relative;flex:1 1 auto;min-height:180px;width:100%;overflow:visible;animation:kmFade calc(.5s*var(--pace)) ease calc(.1s*var(--pace)) both}
/* soft light BEHIND the figure = painted KIT §68 "orb" (frame 3), warmed; never over the face (a screen-blend clip on top would wash the figure) */
.kprev-fig::before{content:"";position:absolute;left:50%;top:40%;width:min(120%,520px);aspect-ratio:1;translate:-50% -50%;pointer-events:none;
 background:url(img/fx/orb.webp) 100% 0/300% 100% no-repeat;mix-blend-mode:screen;filter:sepia(1) saturate(2.4) brightness(.8);animation:kmFade calc(.8s*var(--pace)) ease calc(.3s*var(--pace)) both}
.kprev-img{position:absolute;left:50%;top:0;height:100%;width:auto;max-width:none;transform:translateX(-50%);filter:drop-shadow(0 6px 14px #000a);animation:kprevIn calc(.7s*var(--pace)) var(--km-ease,ease) calc(.15s*var(--pace)) both}
.kprev-card{flex:none;display:flex;flex-direction:column;align-items:center;gap:6px;animation:kmUp2 calc(.35s*var(--pace)) var(--km-ease,ease) calc(.5s*var(--pace)) both} /* frame = j93 .kmlist card (one rule) */
.kprev-n{font-weight:700;color:#3a1f10;text-align:center}
.kprev-l{margin:0;font-size:.9rem;line-height:1.45;color:#3a2a1e;text-align:center}
@keyframes kprevIn{from{opacity:0;transform:translateX(-50%) translateY(24px)}to{opacity:1;transform:translateX(-50%)}}

`;document.head.appendChild(st)})();
/* ---------- kit sample page (§65 + §66) ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push(
 {id:"§65.2",title:"kitPersonReveal: Nội vụ phủ phụ cấp người hầu",html:()=>{const s=(S&&S.staff&&S.staff[0])||null;if(!s)return"<em>cần một người hầu</em>";
  return `<div class="kitpg-row" style="background:#1a0f0acc;padding:10px;border-radius:8px;height:420px">${kitPersonRevealHTML({who:s,title:"Nội vụ phủ phụ cấp người hầu",sub:prServSub(s),line:prServLine(s,1)}).replace('class="kprev"','class="kprev" style="height:400px"')}</div>`}},
 {id:"§66.2",title:"kitGloom rank down: chip nứt rơi, khung xám",where:"<b>Demotion scene</b> (kitGloom, panels \"Bị giáng xuống …\" / \"Vào lãnh cung\"): the OLD rank chip cracks and falls, the new lower chip comes up dim, the frame turns grey. Not a status chip — only shown once, in the rank-down screen.",html:()=>`<div class="kitpg-row" style="background:#1a1418;padding:14px;border-radius:8px">${(()=>{const live=typeof S!=="undefined"&&S&&S.name,r=live?Math.max(1,S.rank|0):2;/* #kit opens before any game: no S → chips only */return kmRankDownHTML(live?S:null,r,r-1)})()}</div>`})}catch(e){}
window.prSetFor=prSetFor;window.prSrvSetFor=prSrvSetFor;window.prGive=prGive;window.prStaff=prStaff;window.prCheck=prCheck;window.prNpcScan=prNpcScan;window.kitPersonReveal=kitPersonReveal;window.kitPersonRevealHTML=kitPersonRevealHTML;
