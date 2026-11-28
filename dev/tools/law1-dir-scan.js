/* LAW-1 DIRECTION SCAN (row11-law1; owner law 1 OD:L33, L1534, OD 24/11 ~08:35Z «rà lại toàn bộ»): for every act an NPC or she can do TO SOMEONE,
   the three directions she → NPC · NPC → her · NPC → NPC, read from the LIVE game by the role-parity probe (dev/tools/role-parity-scan.js: her side =
   the buttons she is shown on every consort / person card; NPC side = every AGREG provider option of every NPC, with its target o.t).
   Columns per act key (union over the consort ranks t1…hh, and the maid life): she→NPC (her button) · NPC→her (an NPC option aimed at her) ·
   NPC→NPC (an option aimed at another consort) · other targets (Emperor / Thái hậu / servant) · self (no target: study, rest …).
   GAP kinds: NOHER = NPCs do it to each other / she does it to them, but no NPC ever does it to her · NOBACK = an NPC does it to her, she has no
   button to do it back · NONPC = an NPC does it only to her, never to another NPC.
   usage: node dev/tools/law1-dir-scan.js [index.html] [--json out.json] [--md out.md] [--from scan.json]                                     */
const fs=require('fs');const RP=require('./role-parity-scan.js');
const CON=["t1","t2","t3","t4","t5","t6","t7","hh"];
let EXD=[];try{EXD=require('./law1-dir-exempt.json')}catch(e){}
/* the OTHER NPC choice roads that are not AGREG options (the role-parity probe reads AGREG only): the scheme mind menu (j40 mindMenu → npcAct /
   j70 plot chains: one menu for every doer and every target, her included) — asked for every NPC consort toward her and toward another consort,
   each given a deep grudge first (bandVT reads oán), the same for both targets */
async function extraProbe(html){const {chromium}=require('playwright');const path=require('path');const URL=/^(https?|file):/.test(html)?html:'file://'+path.resolve(html);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const pe=[];p.on('pageerror',e=>pe.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{let sd=20261118;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
  for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const T={},E=[];const add=(k,c)=>{(T[k]=T[k]||{})[c]=1};const V=liveRivals(true).filter(v=>v!==S&&!v.coop&&v.alive&&!v.out);
  /* the target's kids / pregnancy / night log exist in the probe world for her and for the NPC target alike */
  for(const v of V){for(const t of [S].concat(V.filter(x=>x!==v).slice(0,3))){const o0=t===S?v.oan:(v.ro||{})[t.id];const k0=t.kids;try{if(t===S)v.oan=90;else{v.ro=v.ro||{};v.ro[t.id]=90}/* every target holds a child of 5 (kid acts ask tKid) */t.kids=(t.kids||[]).concat([{name:"Probe",alive:true,age:5,sex:"m",fond:50,id:"probe"+(t.id||"me")}]);
    for(const k of (typeof mindMenu==="function"?mindMenu(v,t):[]).map(x=>x[0]))add("harm:"+k,t===S?"her":"npc")}catch(e){if(E.length<5)E.push(String(e&&e.message||e))}finally{t.kids=k0;if(t===S)v.oan=o0;else v.ro[t.id]=o0}}}
  /* GATE pass (state-gated deeds: tát needs the two in one place, ly gián / xin Hoàng hậu a target of rank ≥ 1, bóc tư tình a scandal + proof, trả chứng cứ
     proof held): the SAME state is given to both targets (her and an NPC) for this one doer→target pair only — then the agent's own scheme menu
     (jagharm haOpts0, targets haTargets: her included) is asked with its pick forced onto that target. Undone after each pair. */
  const N0={};try{for(const k of Object.keys(agNeedsC(V[0]||S)))N0[k]=100}catch(e){}
  const GMK={health:"cx3:talkHealth",praise:"cx3:talkPraise",secret:"cx3:talkSecret",gossip:"cx3:talkGossip",warn:"warn",provoke:"provoke"};
  const G={};const gadd=(k,c)=>{(G[k]=G[k]||{})[c]=1};
  const sw=(o,k,f)=>{const f0=o[k];o[k]=f;return()=>{o[k]=f0}};
  /* row11-law1 r2: the NPC Hoàng hậu is always one of the doers (her seat's acts hh:* are drawn only for her) */
  const QD=(()=>{try{const q=queenP();return q&&q!==S&&V.includes(q)?q:null}catch(e){return null}})();const DO=V.slice(0,6);if(QD&&!DO.includes(QD))DO.push(QD);
  for(const v of DO){for(const t of [S].concat(V.filter(x=>x!==v).slice(0,2))){const U=[];const pair=(a,b)=>a===v&&b===t;
    try{U.push(sw(window,"together",(()=>{const f=window.together;return(a,b)=>pair(a,b)||pair(b,a)||f(a,b)})()));
     U.push(sw(window,"hasScandal",(()=>{const f=window.hasScandal;return x=>x===t||f(x)})()));
     if(typeof chOK==="function")U.push(sw(window,"chOK",(()=>{const f=window.chOK;return(a,b,c)=>pair(a,b)||f(a,b,c)})()));
     U.push(sw(window,"aff",(()=>{const f=window.aff;return(a,b)=>{try{const q=queenP();if(q&&a===q&&b===v)return 90}catch(e){}return f(a,b)}})()));/* xin Hoàng hậu: the Empress favours the doer */
     if(typeof npcKnows==="function")U.push(sw(window,"npcKnows",(()=>{const f=window.npcKnows;return(a,b)=>pair(a,b)||f(a,b)})()));/* the doer has met the target (a new life: no NPC knows her yet) */
     U.push(sw(window,"evG",(()=>{const f=window.evG;return(a,b)=>pair(a,b)?5:f(a,b)})()));
     let FLIP=0;U.push(sw(window,"rkOf",(()=>{const f=window.rkOf;return x=>FLIP?(x===t?8:x===v?0:f(x)):x===t?Math.max(3,f(x)):x===v?Math.max(5,f(x)):f(x)})()));
     U.push(sw(window,"mindPickBy",(()=>{const f=window.mindPickBy;return(L,w,p)=>p===v&&(L||[]).includes(t)?t:f(L,w,p)})()));
     const o0=t===S?v.oan:(v.ro||{})[t.id];U.push(()=>{if(t===S)v.oan=o0;else v.ro[t.id]=o0});
     /* two worlds, the same for both targets: HOSTILE (oán 90: schemes, provoke, gossip) and FRIENDLY (thiện cảm 80, oán 0: visit, help, apologise, warn, follow, mediate) */
     let FR=0;U.push(sw(window,"aff",(()=>{const f=window.aff;return(a,b)=>FR&&a===v&&b===t?80:f(a,b)})()));
     /* row11-law1 r2 STATE-MIRRORED world «need» (friendly + the TARGET in need, the same for her and an NPC target): the target is ill (Sức 20) and
        carrying (visit: j28 ok t.suc<50||t.preg), a THIRD consort holds a deep grudge toward the target (warn: bandVT(x,t) ≥ 2), the target outranks
        the doer (follow: twFollowT = a higher rank), the target holds a grudge toward the doer (apologise / mend). Undone after each pair. */
     const X3=V.find(x=>x!==v&&x!==t);const tS0=t.suc,tP0=t.preg,tst=t.st&&typeof t.st==="object"?t.st.suc:undefined;
     const x30=X3?(t===S?X3.oan:(X3.ro||{})[t.id]):undefined;const tb0=t===S?(S.ro||{})[v.id]:(t.ro||{})[v.id];const t30=X3?(t.ro||{})[X3.id]:undefined;U.push(()=>{if(X3){t.ro=t.ro||{};t.ro[X3.id]=t30}});const ta0=t===S?undefined:t.oan;
     U.push(()=>{t.suc=tS0;t.preg=tP0;if(tst!==undefined)t.st.suc=tst;FLIP=0;if(X3){if(t===S)X3.oan=x30;else X3.ro[t.id]=x30}if(t===S){S.ro=S.ro||{};S.ro[v.id]=tb0}else{t.ro=t.ro||{};t.ro[v.id]=tb0}});
     const pt0=t.pets,st0=t.staff,vh0=v.hh,QP=window.queenP,tc0=t.confined,th0=t.hh,ti0=(t.inv||[]).slice();U.push(()=>{t.pets=pt0;t.staff=st0;v.hh=vh0;window.queenP=QP;t.confined=tc0;t.hh=th0;t.inv=ti0});
     const need=on=>{FLIP=on?1:0;window.queenP=QP;v.hh=vh0;if(!on)return;/* the target SITS AS Hoàng hậu (Thỉnh an Hoàng hậu thHH / Xin Hoàng hậu che chở cx:hhShield aim at queenP(): her when she holds the seat, an NPC
        otherwise) and the doer stands well with the seat (hh 90) */if(typeof QP==="function")window.queenP=()=>t;v.hh=90;
      /* the target is in DISFAVOUR (the Hoàng hậu's acts: Ân xá needs confinement, Tịch thu trang sức a low standing + a jewel in the chest — AGHHG) */
      try{const jk=Object.keys(IT).find(k=>(IT[k]||{}).kd==="Trang sức");t.inv=(t.inv||[]).slice();if(jk&&!t.inv.some(e=>(IT[e.k]||{}).kd==="Trang sức"&&!e.h))t.inv.push({k:jk,probe:1})}catch(e){}t.hh=0;
      /* the target keeps a household servant (Mua chuộc / Cài người: jagacts2 pick among t.staff — a new life holds none yet, an NPC holds several) */if(!(t.staff||[]).some(x=>x&&x.role!=="maid"||x&&x.sid!=null))t.staff=(t.staff||[]).concat([{sid:"probe-sv",name:"Tiểu Thuận",role:"eunuch",loyal:30,probe:1}]);
      /* the target keeps a pet (petcare / petsteal / thaopet ask tsbPets(t)) */try{if(!tsbPets(t).length&&typeof PETK!=="undefined"&&PETK[0])t.pets=[{t:PETK[0],probe:1}]}catch(e){}t.suc=20;if(t.st&&typeof t.st==="object")t.st.suc=20;t.preg=t.preg||1;if(X3){if(t===S)X3.oan=90;else{X3.ro=X3.ro||{};X3.ro[t.id]=90}}/* the target's own grudge toward the doer, moderate (apologise: oán ≥ «oan» and still forgivable, netForgive) — her S.ro and an NPC's ro alike */const tg=15;if(t===S){S.ro=S.ro||{};S.ro[v.id]=tg}else{t.ro=t.ro||{};t.ro[v.id]=tg}
      /* and toward the third (mediate: the doer stands between the target and someone she holds a grudge on) */if(X3){t.ro=t.ro||{};t.ro[X3.id]=tg}};
     /* deep: the target holds a DEEP grudge on the doer (not forgiven: jmend mendDeep) and a go-between X3 is close to the target and likes the doer
        (mendGoOf: «Hậu lễ tạ tội» / «Nhờ người đứng giữa») — her S.ro / S.rl and an NPC's ro / rl alike */
     const dg0=t===S?(S.ro||{})[v.id]:(t.ro||{})[v.id],dr0=X3?(t===S?(S.rl||{})[X3.id]:(t.rl||{})[X3.id]):undefined,dx0=X3?(X3.rl||{})[v.id]:undefined;
     const deep=on=>{const R=t===S?(S.ro=S.ro||{}):(t.ro=t.ro||{});const L=t===S?(S.rl=S.rl||{}):(t.rl=t.rl||{});if(on){R[v.id]=90;if(X3){L[X3.id]=90;X3.rl=X3.rl||{};X3.rl[v.id]=90}}else if(w0D){R[v.id]=dg0;if(X3){L[X3.id]=dr0;X3.rl[v.id]=dx0}}w0D=on};let w0D=false;U.push(()=>deep(false));
     const T0=window.traitsOf;/* row11-law1 r2 FACTION worlds (facF friendly · facH hostile): the target LEADS a faction with a third consort, the doer in none (cx3:facJoin asks to
        join a faction whose leader she likes, cx3:facDiv divides a foe faction: p3FacJoin / p3FacFoe read S.facs + facLeader) — the same for both targets */
     const F0=S.facs;U.push(()=>{S.facs=F0});const X4=V.find(x=>x!==v&&x!==t&&x!==X3)||X3;
     const x4o=X4?(v.ro||{})[X4.id]:undefined;U.push(()=>{if(X4){v.ro=v.ro||{};v.ro[X4.id]=x4o}});
     const fac=(on,h)=>{S.facs=on&&X4?[{id:"probe",m:[key(t),key(X4)],name:"phe thử"}]:F0;if(X4){v.ro=v.ro||{};v.ro[X4.id]=on&&h?90:x4o}};
     for(const w of ["host","friend","need","facF","facH","jail","deep"]){FR=w!=="host"&&w!=="facH"?1:0;const oo=FR?0:90;if(t===S)v.oan=oo;else{v.ro=v.ro||{};v.ro[t.id]=oo}need(w==="need"||w==="facF"||w==="facH");fac(w==="facF"||w==="facH",w==="facH");t.confined=w==="jail"?2:tc0;/* jail: the target is confined (Ân xá) */deep(w==="deep");try{AG.sc={}}catch(e){}
      for(const cr of [0,1]){window.traitsOf=cr?(p=>p===v?[FR?"Ân cần":"Xảo quyệt"]:T0(p)):T0;
      for(const need of [null,"spite","safe","ally","danh","sung","help"])try{const L=[].concat(typeof haOpts0==="function"?haOpts0(v,Object.assign({},N0),need)||[]:[],typeof agOpts==="function"?agOpts(v,Object.assign({},N0),need)||[]:[],typeof agOptsG==="function"?agOptsG(v,Object.assign({},N0),need)||[]:[]);
        for(const o of L)if(o&&o.k&&o.t===t)gadd(o.k,t===S?"her":"npc")}catch(e){if(E.length<8)E.push("opts "+String(e&&e.message||e))}
      /* row11-law1 r2: the MEETING road (jgreet gmOpts, wrapped by jagacts3 2e4): an NPC who comes to her runs the SAME talk topics P3T.<k>(v,S) and her
         TW warn / provoke buttons with her as the target — an NPC→her road the AGREG probe never reads (she knows the visitor: npcKnows forced above) */
      if(t===S&&typeof gmOpts==="function")try{const K0=window.k61Named;window.k61Named=x=>x===v||K0(x);const kn0=S.known;S.known=S.known||1;
        try{for(const o of gmOpts(v)||[]){const k=GMK[o&&o.k];if(k)gadd(k,"her")}}finally{window.k61Named=K0;S.known=kn0}}catch(e){if(E.length<8)E.push("gm "+String(e&&e.message||e))}}}
     window.traitsOf=T0}finally{while(U.length)try{U.pop()()}catch(e){}}}}
  for(const k in G)for(const c in G[k])add(k,c);
  return{T,E,G}});await b.close();return{T:r.T,G:r.G,err:r.E,pageErr:pe}}
function dir(R){const rows=[];const keys=new Set();const T=R.T||{},PK=R.PK||{},NK=R.NKr||{};
 for(const grp of [["consort",CON],["maid",["maid"]]]){const [g,roles]=grp;const K=new Set();for(const r of roles){for(const k in (T[r]||{}))K.add(k);for(const k in (PK[r]||{}))K.add(k)}if(g==="consort"&&R.X)for(const k in R.X.T)K.add(k);
  for(const k of [...K].sort()){const tc={};let p=0,n=0;for(const r of roles){if(PK[r]&&PK[r][k])p=1;if(NK[r]&&NK[r][k])n=1;Object.assign(tc,(T[r]||{})[k]||{})}if(g==="consort"&&R.X&&R.X.T[k])Object.assign(tc,R.X.T[k]);
   const her=!!tc.her,npc=!!tc.npc,oth=["emp","th","srv","kid","other"].filter(x=>tc[x]),self=!!tc.self;
   /* a self act (no target) or an act only toward the Emperor / Thái hậu / a servant is not between her and another consort: no direction row */
   const between=her||npc;let gap=[];
   if(between){if(!her&&(npc||p))gap.push("NOHER");if(her&&!p)gap.push("NOBACK");if(her&&!npc)gap.push("NONPC")}
   const ex=EXD.find(e=>e.key===k&&(!e.grp||e.grp===g)&&(!e.gap||gap.includes(e.gap)));
   rows.push({grp:g,key:k,label:(RP.KEYLAB[k]||[])[0]||k,she:p?1:0,npcHas:n?1:0,her:her?1:0,npc:npc?1:0,oth,self:self?1:0,between,gap,ex:ex?ex.why:""})}}
 return rows}
function md(rows){const L=["| life | act key | she→NPC | NPC→her | NPC→NPC | other targets | gap |","|---|---|---|---|---|---|---|"];
 for(const r of rows){if(!r.between&&!r.she)continue;L.push(`| ${r.grp} | ${r.key} | ${r.she?"✓":"—"} | ${r.her?"✓":"—"} | ${r.npc?"✓":"—"} | ${r.oth.join(" ")||"—"}${r.self?" (self)":""} | ${r.gap.length?(r.ex?"EXEMPT: "+r.ex:r.gap.join(" ")):"SAME"} |`)}
 return L.join("\n")}
module.exports={dir,md,extraProbe};
if(require.main===module){(async()=>{const a=process.argv.slice(2);const html=a.find(x=>!x.startsWith('--')&&!/\.(md|json)$/.test(x))||'dev/index.html';
 const jo=a.indexOf('--json'),mo=a.indexOf('--md'),fo=a.indexOf('--from');
 const R=fo>=0?JSON.parse(fs.readFileSync(a[fo+1],'utf8')):await RP.scan(html);if(jo>=0&&fo<0)fs.writeFileSync(a[jo+1],JSON.stringify(R));R.X=await extraProbe(html);if(R.X.err.length)console.log('extra probe errors: '+R.X.err.join(' ; '));
 const rows=dir(R);if(mo>=0)fs.writeFileSync(a[mo+1],md(rows)+"\n");
 const g=rows.filter(r=>r.gap.length&&!r.ex);const c={};for(const r of g)for(const x of r.gap)c[x]=(c[x]||0)+1;
 console.log("LAW-1 DIRECTION: rows "+rows.filter(r=>r.between).length+" between-person acts · gaps "+g.length+" "+JSON.stringify(c));
 for(const r of g)console.log("  "+r.grp+" "+r.key+" ["+r.gap.join(",")+"] she→NPC "+r.she+" · NPC→her "+r.her+" · NPC→NPC "+r.npc+(r.oth.length?" · other "+r.oth.join(" "):""));
 if(R.pageErr&&R.pageErr.length)console.log("PAGE ERRORS: "+R.pageErr.slice(0,5).join(" ; "))})()}
