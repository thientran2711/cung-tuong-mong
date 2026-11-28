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
  const G={};const gadd=(k,c)=>{(G[k]=G[k]||{})[c]=1};
  const sw=(o,k,f)=>{const f0=o[k];o[k]=f;return()=>{o[k]=f0}};
  for(const v of V.slice(0,6)){for(const t of [S].concat(V.filter(x=>x!==v).slice(0,2))){const U=[];const pair=(a,b)=>a===v&&b===t;
    try{U.push(sw(window,"together",(()=>{const f=window.together;return(a,b)=>pair(a,b)||pair(b,a)||f(a,b)})()));
     U.push(sw(window,"hasScandal",(()=>{const f=window.hasScandal;return x=>x===t||f(x)})()));
     if(typeof chOK==="function")U.push(sw(window,"chOK",(()=>{const f=window.chOK;return(a,b,c)=>pair(a,b)||f(a,b,c)})()));
     U.push(sw(window,"aff",(()=>{const f=window.aff;return(a,b)=>{try{const q=queenP();if(q&&a===q&&b===v)return 90}catch(e){}return f(a,b)}})()));/* xin Hoàng hậu: the Empress favours the doer */
     if(typeof npcKnows==="function")U.push(sw(window,"npcKnows",(()=>{const f=window.npcKnows;return(a,b)=>pair(a,b)||f(a,b)})()));/* the doer has met the target (a new life: no NPC knows her yet) */
     U.push(sw(window,"evG",(()=>{const f=window.evG;return(a,b)=>pair(a,b)?5:f(a,b)})()));
     U.push(sw(window,"rkOf",(()=>{const f=window.rkOf;return x=>x===t?Math.max(3,f(x)):x===v?Math.max(5,f(x)):f(x)})()));
     U.push(sw(window,"mindPickBy",(()=>{const f=window.mindPickBy;return(L,w,p)=>p===v&&(L||[]).includes(t)?t:f(L,w,p)})()));
     const o0=t===S?v.oan:(v.ro||{})[t.id];U.push(()=>{if(t===S)v.oan=o0;else v.ro[t.id]=o0});
     /* two worlds, the same for both targets: HOSTILE (oán 90: schemes, provoke, gossip) and FRIENDLY (thiện cảm 80, oán 0: visit, help, apologise, warn, follow, mediate) */
     let FR=0;U.push(sw(window,"aff",(()=>{const f=window.aff;return(a,b)=>FR&&a===v&&b===t?80:f(a,b)})()));
     const T0=window.traitsOf;for(const w of ["host","friend"]){FR=w==="friend"?1:0;const oo=FR?0:90;if(t===S)v.oan=oo;else{v.ro=v.ro||{};v.ro[t.id]=oo}try{AG.sc={}}catch(e){}
      for(const cr of [0,1]){window.traitsOf=cr?(p=>p===v?[FR?"Ân cần":"Xảo quyệt"]:T0(p)):T0;
      for(const need of [null,"spite","safe","ally","danh","sung","help"])try{const L=[].concat(typeof haOpts0==="function"?haOpts0(v,Object.assign({},N0),need)||[]:[],typeof agOpts==="function"?agOpts(v,Object.assign({},N0),need)||[]:[],typeof agOptsG==="function"?agOptsG(v,Object.assign({},N0),need)||[]:[]);
        for(const o of L)if(o&&o.k&&o.t===t)gadd(o.k,t===S?"her":"npc")}catch(e){if(E.length<8)E.push("opts "+String(e&&e.message||e))}}}
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
