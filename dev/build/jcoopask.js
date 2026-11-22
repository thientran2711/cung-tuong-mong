/* jcoopask: CO-OP GUEST → HOST REQUESTS (review/coop-guest-maid). Protocol: dev/coop/PROTOCOL.md §4.1.
   Problem: PROTOCOL §4 rule 4 drops, under W, every new id made only by seat b. So on the guest every new PERSON she causes (her maid
   catches the Emperor's eye, "Tiến cử … hầu thay", her petition "tuyển nhiều", the new-girl event, the kin who enter with a tiểu thư)
   vanished at the week merge, and every new thing she puts into an NPC's arrays (her maid bought by a bigger consort, a servant she
   plants, a child she takes from an NPC) was lost whenever the host touched the same NPC that week (rule 5: host wins non-id arrays).
   Fix (one path for the whole family, client only, LIVE Worker unchanged and not redeployed):
   - GUEST: a new person gets a TEMP id (≥ TMP) from newRival. ser() takes every temp person out of R and every new item she put into an
     NPC's staff (and a child she took from an NPC) into a REQUEST list S.coopAsk (her own blob, P.b.S: survives the merge,
     the room's storage, reloads and rejoins). While a request is open the person is shown to her as a stand-in ("ghost", same temp id,
     put back into R by deser). The first time a request is made it is also relayed at once ({t:"act",k:"ctm-ask"}), so a host that
     has not yet sent this week's `end` adds it to this very week.
   - HOST: after every rebuild (deser with COOPW.base) and on the live relay, it applies each request once: new consort with a world id
     (roomFor("consort") checked again, consort ceiling kept), servant put into that NPC, child taken out of that NPC. The result
     goes to its own blob S.askDone[id] = [result, week] (P.a.S, so the guest reads it); the new rival carries coopAsk = request id.
   - GUEST, next rebuild: request done → her side of the links (S.rl / S.ro / S.known… under the temp id, {$r:temp} refs, kin .pal)
     is moved to the world id and the request closes; refused (no free seat) → her maid comes back to her household (nothing lost).
   World events that must roll once (host): tuyển tú (j27 tuyenTu), the triều đình "tuyển" petition (j55), an NPC's maid who serves
   in her place (j8 sendMaid of an NPC) are muted on the guest; the host's result reaches her through the merge.
   Gain and loss are the solo rules: the same rolls, the same BAL numbers, made by the same code; only WHERE the new id is made moves. */
(function(){try{
if(typeof COOP!=="object"||!window.COOPW)return;
const CW=window.COOPW;
const J=x=>x==null?x:JSON.parse(JSON.stringify(x));
const on=()=>!!(CW.on&&CW.seat),guest=()=>on()&&CW.seat!=="a"&&!stateOn("ask")/* thin part C (one switch, jcoopworld stateOn): the host makes the persons she causes on her op (jcoopthinc), no temp ids */,host=()=>on()&&CW.seat==="a";
const wk=()=>(COOP.state&&COOP.state.week)||0;
const TMP=1000;            /* temp ids of persons she made, until the host gives the world id (NPC < 900, players 901/902) */
const GP=902;              /* the guest's player id in the world (PROTOCOL §3) */
const REFF=["resHead","spyFor","lover","mid","owner","by","who","tgt","from","to"];
const N=window.__askN=window.__askN||{made:0,sent:0,applied:0,refused:0,confirmed:0,returned:0,ghost:0};
const isTmp=id=>typeof id==="number"&&id>=TMP;
const live=()=>!!(S&&!S.dead&&CW.base&&!CW.inLife);
/* guest-local "me" → her world id (host-local form) */
function toHost(o){if(!o||typeof o!=="object")return o;if(Array.isArray(o)){for(let i=0;i<o.length;i++)o[i]=toHost(o[i]);return o}
 for(const k of Object.keys(o)){let v=o[k];if(REFF.includes(k)&&v==="me")v=GP;o[k]=toHost(v)}return o}
const petKey=P=>P?[P.t,P.at,P.from].join("|"):"";
/* palace men (review/coop-guest-men): the world fields her road / act may change on a man the host already has (besides alive → false) */
const MAN_F=["away","ban"];
const manSig=(m,f)=>f?Object.keys(f).sort().map(k=>k+"="+JSON.stringify(f[k])).join("&"):"new";
const menP=()=>(CW.X&&CW.X.MEN_P)||[];

/* ---------- guest: temp ids ---------- */
(function(){const f=newRival;newRival=function(){const v=f.apply(this,arguments);try{if(guest()&&live()&&v&&!v.coop){rid--;S.askT=(S.askT||0)+1;v.id=TMP+S.askT;N.made++;
  if(CW.askMaid){v.__maid=CW.askMaid;CW.askMaid=null}}}catch(e){console.error("ask id",e)}return v}})();
/* the maid who rises (j14 → jmline mlRose): kept with the request, so a refusal gives her back */
if(typeof mlRose==="function"){const f=mlRose;mlRose=function(p,s){const r=f.apply(this,arguments);try{if(guest()&&p===S&&s)CW.askMaid=J(s)}catch(e){}return r}}

/* ---------- guest: collect requests (every ser: week end, rolling seat copy) ---------- */
function collect(d){const B=CW.base&&CW.base.W&&CW.base.W.R||[];const bm=new Map(B.map(r=>[r.id,r]));
 S.coopAsk=S.coopAsk||[];const L=S.coopAsk,fresh=[];const find=id=>L.find(a=>a.id===id);
 const add=a=>{const o=find(a.id);if(o){Object.assign(o,a);return}a.w=wk();L.push(a);fresh.push(a);N.sent++};
 for(let i=d.R.length-1;i>=0;i--){const r=d.R[i];if(!r||r.coop||!isTmp(r.id))continue;d.R.splice(i,1);
  const id=(CW.life||0)+":"+r.id;const o=find(id);const maid=r.__maid||(o&&o.maid)||null;delete r.__maid;add({id,k:"np",t:r.id,v:r,maid})}
 const kidsMe=new Set((d.S.kids||[]).map(k=>k&&k.name));
 for(const r of d.R){if(!r||r.coop||isTmp(r.id)||r.id>=900)continue;const b=bm.get(r.id);if(!b)continue;
  const bs=new Set((b.staff||[]).map(s=>s.sid));for(const s of r.staff||[])if(s&&!s.coop&&!bs.has(s.sid))add({id:"s"+s.sid+">"+r.id,k:"srv",to:r.id,s:J(s)});
  /* review r1: a servant she took OUT of an NPC household into her own (promotion gift prStaff, j72 a spy back to her) = the kidout case */
  const cs=new Set((r.staff||[]).map(s=>s&&s.sid)),mine=new Set((d.S.staff||[]).map(s=>s&&s.sid));
  for(const s of b.staff||[])if(s&&!s.coop&&!cs.has(s.sid)&&mine.has(s.sid))add({id:"o"+s.sid+"<"+r.id,k:"srvout",from:r.id,sid:s.sid,name:s.name});
  const rk=new Set((r.kids||[]).map(k=>k&&k.name));for(const k of b.kids||[])if(k&&!rk.has(k.name)&&kidsMe.has(k.name))add({id:"k"+k.name+"<"+r.id,k:"kidout",from:r.id,name:k.name})}
 /* review/coop-guest-men (law 1 two-way + law 6b real people): S.men is a HOST_ONLY world key, so a man SHE adds (her own road's envoy:
    jrd_bd bdMan / jrd_pt pfMan) or a change her own act / road makes to a palace man (he dies: affairExposed, j24, j95accuse, jmen report,
    jagstaff, jroute, jpq mortKill; he leaves or comes back: bdMan / pfMan away / ban) was dropped at her next rebuild. Each becomes a
    request kind "man" (one per man, the latest state replaces an older open one); the host applies it (hMan), she sees a stand-in till then.
    Diff against the host's set she was last rebuilt from (CW.base): her world loops are muted / her-only on this seat (jcoopone), so what
    differs is hers. The menInit / jmen set (ids m0, m1 …) is the host's: never asked. */
 const BM=CW.base&&CW.base.W&&CW.base.W.S&&CW.base.W.S.men;
 if(Array.isArray(BM)&&Array.isArray(d.S.men)){const bmm=new Map(BM.filter(Boolean).map(m=>[m.id,m])),now=new Set();
  for(const m of d.S.men){if(!m||m.id==null)continue;const b=bmm.get(m.id);let f=null;
   if(!b){if(/^m\d+$/.test(String(m.id)))continue}
   else{f={};if(m.alive===false&&b.alive!==false)f.alive=false;for(const k of MAN_F)if(JSON.stringify(m[k]==null?null:m[k])!==JSON.stringify(b[k]==null?null:b[k]))f[k]=m[k]==null?null:J(m[k]);if(!Object.keys(f).length)continue}
   const id="man:"+m.id+":"+manSig(m,f);now.add(id);
   for(let i=L.length-1;i>=0;i--){const o=L[i];if(o&&o.k==="man"&&o.mid===m.id&&o.id!==id)L.splice(i,1)}
   add({id,k:"man",mid:m.id,v:J(m),f})}
  /* her change is gone again (or the host's set now holds it): an open older request of that man is void */
  for(let i=L.length-1;i>=0;i--){const o=L[i];if(o&&o.k==="man"&&!now.has(o.id))L.splice(i,1)}}
 /* same family, HOST_ONLY thIll (review/coop-guest-men): her own act nurses / cures / eases the Thái hậu (j71 thbenh, j72 easeTH, jface cure)
    → request kind "th" {b: the host's value she saw, v: hers}. Her week end's own illness rolls are taken back (thWk below), so what
    differs from the host's value here is her act. */
 {const bS=CW.base&&CW.base.W&&CW.base.W.S;if(bS){const b=bS.thIll==null?null:bS.thIll,v=d.S.thIll==null?null:d.S.thIll;
  const diff=!d.S.thDead&&!bS.thDead&&JSON.stringify(b)!==JSON.stringify(v),id=diff?"th:"+JSON.stringify(b)+">"+JSON.stringify(v):null;
  for(let i=L.length-1;i>=0;i--){const o=L[i];if(o&&o.k==="th"&&o.id!==id)L.splice(i,1)}
  if(diff)add({id,k:"th",b:J(b),v:J(v)})}}
 d.S.coopAsk=J(L);
 if(fresh.length)setTimeout(()=>{try{if(COOP.state.status==="open")COOP.send({t:"act",k:"ctm-ask",mode:"ask",id:"ask:"+fresh.map(a=>a.id).join(","),L:J(fresh)})}catch(e){}},0)}
(function(){const f=ser;ser=function(){const d=f.apply(this,arguments);try{if(guest()&&live()&&d&&d.S&&d.R)collect(d)}catch(e){console.error("ask collect",e)}return d}})();

/* ---------- guest: settle requests on every rebuild (before the engine resolves {$r:id} refs) ---------- */
function remapS(o,t,r){if(!o||typeof o!=="object")return o;if(Array.isArray(o)){for(let i=0;i<o.length;i++)o[i]=remapS(o[i],t,r);return o}
 if(o.$r===t&&Object.keys(o).length===1){o.$r=r;return o}
 for(const k of Object.keys(o)){const v=o[k];if(k===String(t)||k==="r"+t){const nk=k===String(t)?String(r):"r"+r;if(r!=null&&!(nk in o))o[nk]=v;delete o[k];continue}
  if(k==="pal"&&v===t){o[k]=r;continue}o[k]=remapS(v,t,r)}return o}
function settle(d){const L=d.S.coopAsk;if(!Array.isArray(L)||!L.length)return;const hP=CW.base&&CW.base.P&&CW.base.P.a;
 const done=(hP&&hP.S&&hP.S.askDone)||{};const keep=[],lines=[];
 for(const a of L){if(!a||!a.id)continue;const res=done[a.id];
  if(a.k==="np"){const real=d.R.find(r=>r&&r.coopAsk===a.id);
   if(real){remapS(d.S,a.t,real.id);N.confirmed++;continue}
   if(res&&res[0]===0){remapS(d.S,a.t,null);N.refused++;
    if(a.maid&&Array.isArray(d.S.staff)&&!d.S.staff.some(s=>s&&s.sid===a.maid.sid)){d.S.staff.push(srvHome(a.maid));N.returned++;
     lines.push(`${a.maid.name} được Hoàng thượng để mắt, nhưng hậu cung đã đủ người, không có chỗ phong; nàng trở về hầu ngươi như cũ.`)}continue}
   if(a.v&&!d.R.some(r=>r&&r.id===a.t)){d.R.push(J(a.v));N.ghost++}keep.push(a);continue}
  if(a.k==="man"){if(res)continue;/* done: the host's set (this rebuild) holds it */
   /* open: her stand-in of the change, on the host's set (her own ties to him ride a.v; joinP ran before this) */
   if(a.v&&Array.isArray(d.S.men)){const m=d.S.men.find(x=>x&&x.id===a.mid);
    if(!m){d.S.men.push(J(a.v));N.ghost++}else if(a.f){if(a.f.alive===false)m.alive=false;for(const k of MAN_F)if(k in a.f){if(a.f[k]==null)delete m[k];else m[k]=J(a.f[k])}}}
   keep.push(a);continue}
  if(a.k==="th"){if(res)continue;d.S.thIll=J(a.v);keep.push(a);continue}/* open: her stand-in of her own act on the Thái hậu */
  if(res){try{const b=CW.askBack&&CW.askBack[a.k];if(b)b(d,a,res)}catch(e){console.error("ask back",a.k,e)}
   if(res[0]===0&&a.k==="srv"&&a.s&&Array.isArray(d.S.staff)&&!d.S.staff.some(s=>s&&s.sid===a.s.sid)&&a.s.spyFor==null){d.S.staff.push(srvHome(a.s));N.returned++}continue}
  keep.push(a)}
 d.S.coopAsk=keep;if(lines.length)d.S.askNote=(d.S.askNote||[]).concat(lines)}
/* ---------- host: apply requests ---------- */
function fixRefs(o){if(!o||typeof o!=="object")return o;if(Array.isArray(o)){for(let i=0;i<o.length;i++)o[i]=fixRefs(o[i]);return o}
 if(o.$r!=null&&Object.keys(o).length===1)return rivals.find(v=>v.id===o.$r)||null;
 if(o.$k!=null&&Object.keys(o).length===1){try{return allKids().map(x=>x[0]).find(k=>k.name===o.$k)||null}catch(e){return null}}
 for(const k of Object.keys(o))o[k]=fixRefs(o[k]);return o}
const npcOf=id=>rivals.find(v=>v&&v.id===id&&!v.coop&&v.alive&&!v.out)||null;
function hNp(a){const was=rivals.find(v=>v&&v.coopAsk===a.id);if(was)return was.id;if(!a.v||!roomFor("consort"))return 0;
 const g=a.v,n=fixRefs(toHost(J(g)));delete n.__maid;const z=newRival(n.rank||0,!!n.queen);/* review r1 (ONE CORE): the world id and the host's own links come from newRival, not typed copies */n.id=z.id;n.coopAsk=a.id;n.alive=true;n.out=false;
 for(const m of ["rl","ro","gp","ep"]){n[m]=n[m]&&typeof n[m]==="object"?n[m]:{};for(const k of Object.keys(n[m]))if(isTmp(+k)||k==="me")delete n[m][k]}
 /* her links to the newcomer (local v.rel… on the guest) are the newcomer's links to her pid in the world; the host's own start fresh */
 n.rl[GP]=g.rel||0;n.ro[GP]=g.oan||0;n.gp[GP]=g.ghen||0;n.ep[GP]=g.ev||0;n.rel=z.rel;n.oan=0;n.ghen=z.ghen;n.ev=0;if(n.evm)n.evm={};
 if(rivals.some(v=>v&&v.name===n.name)||(S&&S.name===n.name))n.name=freshName();
 S.usedFaces=S.usedFaces||[];if(n.face>=0&&S.usedFaces.includes(n.face)&&!(n.fc))Object.assign(n,drawFace());else if(n.face>=0&&!S.usedFaces.includes(n.face))S.usedFaces.push(n.face);
 rivals.push(n);try{palFix()}catch(e){}try{log(`${n.name} vào cung, phong ${RANKS[n.rank]?RANKS[n.rank].n:""}.`)}catch(e){}return n.id}
function hSrv(a){const t=npcOf(a.to);if(!t||!a.s)return 0;t.staff=t.staff||[];if(t.staff.some(s=>s&&s.sid===a.s.sid&&s.name===a.s.name))return 1;
 const s=toHost(J(a.s));try{if(allServ().some(x=>x&&x.sid===s.sid))s.sid=++sidN}catch(e){}t.staff.push(s);return 1}
function hPet(a){const t=npcOf(a.to);if(!t||!a.P)return 0;t.pets=t.pets||[];if(!t.pets.some(P=>petKey(P)===petKey(a.P)))t.pets.push(toHost(J(a.P)));return 1}
function hKid(a){const t=rivals.find(v=>v&&v.id===a.from&&!v.coop);if(!t||!t.kids)return 1;const i=t.kids.findIndex(k=>k&&k.name===a.name);if(i>=0)t.kids.splice(i,1);return 1}
function hSrvOut(a){const t=rivals.find(v=>v&&v.id===a.from&&!v.coop);if(!t||!t.staff)return 1;const i=t.staff.findIndex(s=>s&&s.sid===a.sid&&s.name===a.name);if(i>=0)t.staff.splice(i,1);return 1}
/* a palace man of her road / act (review/coop-guest-men): a new man joins the host's S.men (world part only; the host's own ties start at 0,
   hers ride her blob menP); a change on a man the host has: he dies (never brought back), away / ban as her road set them */
function hMan(a){if(!a.v||a.mid==null)return 0;if(!Array.isArray(S.men)){try{menInit()}catch(e){}if(!Array.isArray(S.men))return 0}
 const m=S.men.find(x=>x&&x.id===a.mid);
 if(!m){const n=toHost(J(a.v));for(const k of menP())delete n[k];Object.assign(n,{tinh:0,letters:0,trysts:0,af:0,knowsMe:[]});S.men.push(n);return 1}
 const f=a.f||{};if(f.alive===false||(!a.f&&a.v.alive===false))m.alive=false;
 for(const k of MAN_F)if(k in f){if(f[k]==null)delete m[k];else m[k]=J(f[k])}return 1}
/* her act on the Thái hậu's illness: applied on the value she saw; the host's own roll since then: a cure still cures, an eased stage eases
   the host's illness by the same steps (solo rules: j71 cure = null, j72 easeTH = one stage); anything else is stale (0, nothing changes) */
function hTh(a){if(S.thDead)return 0;const cur=S.thIll==null?null:S.thIll,b=a.b==null?null:a.b,v=a.v==null?null:a.v;
 if(JSON.stringify(cur)===JSON.stringify(b)){S.thIll=J(v);return 1}
 if(v==null){S.thIll=null;return 1}
 if(cur&&b&&v.k===b.k&&cur.k===b.k&&(v.st|0)<(b.st|0)){cur.st=Math.max(1,(cur.st|0)-((b.st|0)-(v.st|0)));return 1}return 0}
const H={np:hNp,srv:hSrv,pet:hPet,kidout:hKid,srvout:hSrvOut,man:hMan,th:hTh};CW.askH=H;/* other modules add their kinds here (jdc: dcout / dcin) *//* pet: kept for a later guest act that gives a pet to an NPC (none today: NPC pet gains still roll on both, see the report) */
function hostApply(L,why){if(!host()||!live()||!Array.isArray(L))return 0;S.askDone=S.askDone||{};let n=0;
 for(const a of L){if(!a||!a.id||S.askDone[a.id]||!H[a.k])continue;let r=0;try{r=H[a.k](a)}catch(e){console.error("ask apply",a.k,e)}
  S.askDone[a.id]=[r,wk()];n++;N.applied++;N.log=(N.log||[]).slice(-9).concat([why+' '+a.id+' w'+wk()+' r'+r]);if(r===0)N.refused++}
 /* forget answers she has read (her list no longer holds them) after 3 weeks */
 try{const fP=CW.base.P&&CW.base.P.b,open=new Set(((fP&&fP.S&&fP.S.coopAsk)||[]).map(a=>a.id)),cur=new Set(L.map(a=>a&&a.id));
  for(const id of Object.keys(S.askDone))if(!open.has(id)&&!cur.has(id)&&wk()-(S.askDone[id][1]||0)>=3)delete S.askDone[id]}catch(e){}
 return n}
CW.askApply=hostApply;CW.askN=N;CW.askSettle=settle;/* test hook (staff-root-fix-1: settle on a blob, both returns) */
(function(){const f=deser;deser=function(d){try{if(guest()&&CW.base&&!CW.inLife&&d&&d.S&&Array.isArray(d.R))settle(d)}catch(e){console.error("ask settle",e)}
 const r=f.apply(this,arguments);
 try{if(guest()&&S&&S.askNote&&S.askNote.length){for(const l of S.askNote)log(l);S.askNote=null}}catch(e){}
 try{if(host()&&live()){const fP=CW.base.P&&CW.base.P.b;if(fP&&!fP.dead&&fP.S)hostApply(fP.S.coopAsk,"base")}}catch(e){console.error("ask base",e)}return r}})();
/* the live relay: applied now when this week's `end` has not gone yet (else the copy in her blob comes with the merged week) */
COOP.on("act",m=>{try{if(!host()||!m||m.from===CW.seat||m.k!=="ctm-ask"||!live())return;const e=COOP.state.ended||{};if(CW.sent===wk()||e.a)return;
 if(hostApply(m.L,"live"))try{render()}catch(x){}}catch(e){console.error("ask live",e)}});

/* ---------- world events that roll once, on the host ---------- */
/* thWk (review/coop-guest-men): the Thái hậu's illness is the host's (HOST_ONLY thIll); her week end's own rolls of it (j13 illMonth is
   guarded, jmort's month is not) are taken back on the guest, so only her ACTS on it become a "th" request */
if(typeof endTurn==="function"){const f=endTurn;endTurn=function(){if(!guest()||!live())return f.apply(this,arguments);const t0=J(S.thIll==null?null:S.thIll),d0=!!S.thDead;
 try{return f.apply(this,arguments)}finally{try{if(S&&!S.thDead&&!d0)S.thIll=t0}catch(e){}}}}
if(typeof tuyenTu==="function"){const f=tuyenTu;tuyenTu=function(){if(guest())return;return f.apply(this,arguments)}}
if(typeof tdSoMonth==="function"){const f=tdSoMonth;tdSoMonth=function(){if(!guest())return f.apply(this,arguments);
 let T=null,y0;try{T=trS();y0=T.tyY;T.tyY=S.year}catch(e){}try{return f.apply(this,arguments)}finally{try{if(T&&T.tyY===S.year)T.tyY=y0}catch(e){}}}}
/* review r1: an NPC household's refill (staffInit / fillStaff after a rise, an empty master) rolls on the host only (as servMonth's refill);
   on the guest it made servants the merge does not hold, and they came back to the host as "srv" requests (household over its cap) */
if(typeof fillStaff==="function"){const f=fillStaff;fillStaff=function(p){if(guest()&&p!==S)return;return f.apply(this,arguments)}}
if(typeof sendMaid==="function"){const f=sendMaid;sendMaid=function(a){if(guest()&&a!==S)return"";return f.apply(this,arguments)}}
}catch(e){console.error("jcoopask",e)}})();
