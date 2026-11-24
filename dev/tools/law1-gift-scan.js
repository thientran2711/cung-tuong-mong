/* LAW-1 GIFT SCAN (owner OD 24/11 ~07:55Z point (e); THE 18 LAWS law 1 TWO-WAY, law 6c REAL OBJECTS, law 11 whole group) — every like / dislike / gift
   path of the LIVE game as who→whom, and every one-way gap.
   Part A — STATIC: every site in dev/build/*.js that moves a gift, reads a taste or learns a taste, with file:line and its who→whom row (SITES below);
            a gift / taste site that matches no row is UNCLASSIFIED (a new path nobody paired) and counts as a gap.
   Part B — RUNTIME (playwright, the real functions): for every giver × receiver pair the game can reach — her (S), a consort (rv), the Emperor
            (emp, bestowal), Thái hậu (th, bestowal) → her, a consort, the Emperor, Thái hậu — the effects of a LIKED and a DISLIKED piece are
            measured on a fixed state (Math.random pinned): regard toward the giver, the receiver's mood, the giver learning that taste, refusal.
            Knowledge rows: talk (chatMark), spying, choosing the piece by what the giver knows. Rite rows (Lễ tấn phong): a guest's gift is a real piece
            from the guest's chest (law 6c), both host kinds, and she can send one as a guest.
   Verdict per row: SAME (both directions / both giver kinds hold it) · GAP (one-way) · N/A (no such path for either side, with the reason).
   usage: node dev/tools/law1-gift-scan.js [dev/index.html] [--md out.md] [--json out.json]     exit 0 always (the test dev/test/law1-gifts.js gates)
   module: require('./law1-gift-scan.js').scan(html) → {sites, rows, gaps}                                                                              */
const fs=require('fs'),path=require('path');
const BUILD=process.env.LAW1_BUILD||path.join(__dirname,'..','build');/* LAW1_BUILD: scan another tree's build (the before table) */
/* ---------- Part A: static sites ---------- */
const SITES=[
 {re:/function giveTo\(a,r,ix\)/,row:"GIVE any→any (base: item moves, relAdd)",f:"j8.js"},
 {re:/PEND\.giftpick=/,row:"GIVE her→emp/th/rv (gift picker)",f:"j8.js"},
 {re:/function giftPeople/,row:"GIVE her→emp/th/rv/maid (gift dialog)",f:"jgift.js"},
 {re:/PEND\.giftin=p=>/,row:"RECEIVE her: choice card (take / return / test)",f:"j8.js"},
 {re:/function rcvGiftIn/,row:"RECEIVE npc: the same choice (rcvGiftIn)",f:"jrcv.js"},
 {re:/agRunReg\("cx:gift"/,row:"GIVE rv→emp/th/S/rv (agent cx:gift)",f:"jagacts.js"},
 {re:/O\.push\(\{k:"cx:gift"/,row:"GIVE rv→emp/th/S/rv (agent choice)",f:"jagacts.js"},
 {re:/function vlFriendGift/,row:"GIVE rv→S/rv (a friend's veil, giveTo)",f:"jveil.js"},
 {re:/pushDil\(mkP\("giftin",\{f:key\(v\)/,row:"GIVE rv→S (a friend's copied sheet; S→rv: the sheet is a giftable item)",f:"jrcp.js"},
 {re:/pushDil\(mkP\("giftin",\{f:(pid|fpid)/,row:"GIVE co-op friend→S (a seat's real item; the friend gives back the same way)",f:"jcoop"},
 {re:/function tsGiftPiece/,row:"GIVE any→rv (Biếu quà làm lành, giveTo)",f:"jts.js"},
 {re:/function tsNpcGift/,row:"GIVE rv→rv (Biếu quà làm lành, NPC side)",f:"jts.js"},
 {re:/function tsLeGifts|S\.inv\.push\(\{k,from:v\.id\}\)/,row:"GIVE guest→host at a rite (Lễ tấn phong)",f:"jts.js"},
 {re:/p\.inv\.push\(\{k,from:"emp"/,row:"BESTOW emp→S/rv",f:"j8.js|jration.js"},
 {re:/goodsGive\(S,k,\{from:"emp"/,row:"BESTOW emp→S (cống phẩm)",f:"jration.js"},
 {re:/p\.inv\.push\(\{k,from:"th"\}\)/,row:"BESTOW th→S/rv",f:"j8.js|jagacts.js|jts.js"},
 {re:/S\.inv\.push\(\{k,from:"th"\}\);log\(`<span class="g">Thái hậu ban ta/,row:"BESTOW th→S (a sutra / embroidery copy; th→rv: an NPC knows a sub-style by her level, rcpNpcKnows)",f:"jrcp.js"},
 {re:/pushDil\(mkP\("giftin",\{f:key\(a\)/,row:"RECEIVE her: the choice card from giveTo",f:"j8.js|j83.js"},
 {re:/const g0=PEND\.giftin;PEND\.giftin=|ptReg\("giftin"/,row:"RECEIVE her: choice-card wrappers (work / food / carrier time)",f:"j83.js|jpoison.js|jptime.js"},
 {re:/giftHand\(v,S,/,row:"GIVE rv→S in a visit (a real piece, giftHand)",f:"j24.js"},
 {re:/function giftHand\(/,row:"GIVE any→any handed over in a visit (a real piece)",f:"jmind.js"},
 {re:/function hit\(r,e\)/,row:"TASTE dislike hit (jdis)",f:"jdis.js"},
 {re:/const g0=giveTo;giveTo=function\(a,r,ix\)\{let k=null/,row:"TASTE dislike penalty / refusal on giveTo",f:"jdis.js"},
 {re:/function giftTaste\(|const g0=giveTo;giveTo=function\(a,r,ix\)\{const e=a&&a\.inv&&a\.inv\[ix\];let lk=false/,row:"TASTE like bonus / dislike penalty / mood on giveTo",f:"jmind.js"},
 {re:/function (learn|likeLearn|learnLike|learnDis|giftLearn)\(/,row:"LEARN a taste",f:"jdis.js|jmind.js"},
 {re:/const c0=chatMark;chatMark=/,row:"LEARN by talk",f:"jdis.js|jmind.js"},
 {re:/j78facts=function\(v\)\{const F=f0/,row:"LEARN by her spying (lk / dis facts)",f:"jdis.js"},
 {re:/agRunReg\("cx2:maidSpy"/,row:"LEARN by NPC spying",f:"jagacts3.js"},
 {re:/giftEval=function\(e,t\)\{const r=g0/,row:"PICK her: the dialog shows known dislikes",f:"jdis.js"},
 {re:/function giftPickIx/,row:"PICK npc: the piece by what she knows",f:"jmind.js"}];
/* the patterns that make a line a gift / taste site at all (anything here that no SITES row claims = UNCLASSIFIED) */
const PROBE=[/function giveTo\(/,/mkP\("giftin"/,/PEND\.giftin=/,/inv\.push\(\{k,from:("emp"|"th"|v\.id)/,/goodsGive\(S,k,\{from:"emp"/,/agRunReg\("cx:gift"/,/function (likeLearn|learnLike|learnDis|giftLearn)\(/,/function giftPickIx/,/function giftTaste\(/];
function staticScan(){const out=[];for(const f of fs.readdirSync(BUILD).filter(x=>/^j.*\.js$/.test(x)).sort()){const L=fs.readFileSync(path.join(BUILD,f),'utf8').split('\n');
  L.forEach((s,i)=>{const hit=SITES.filter(x=>x.re.test(s)&&new RegExp(x.f.split('|').map(y=>y.replace('.','\\.')).join('|')).test(f));
   if(hit.length){hit.forEach(h=>out.push({row:h.row,at:`dev/build/${f}:${i+1}`}));return}
   if(PROBE.some(re=>re.test(s))&&!/^\s*\/[*\/]/.test(s)&&!/^jmgid\.js$/.test(f))out.push({row:"UNCLASSIFIED",at:`dev/build/${f}:${i+1}`,txt:s.trim().slice(0,120)})})}
 return out}
/* ---------- Part B: runtime probe ---------- */
async function probe(html){const {chromium}=require('playwright');const URL=/^(https?|file):/.test(html)?html:'file://'+path.resolve(html);
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const pageErr=[];p.on('pageerror',e=>pageErr.push(e.message.slice(0,200)));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:90000});await p.waitForTimeout(2000);
 const R=await p.evaluate(()=>{
  SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;try{kn();for(const v of rivals)S.met[v.id]=1}catch(e){}
  const res={rows:[],err:[]};const row=(id,a,b,note)=>res.rows.push({id,a:!!a,b:!!b,note:note||""});
  const RV2=liveRivals(true).filter(v=>!v.queen&&v.alive&&!v.out);const A=RV2[0],B=RV2[1];if(!A||!B){res.err.push("need 2 consorts");return res}
  const KD_L="kd:Hương liệu",KD_D="kd:Vải vóc";
  const itemOf=(kd0,tag)=>{const kd=String(kd0).replace(/^kd:/,"");return Object.keys(IT).find(k=>{const it=itm(k);return it.kd===kd&&!it.il&&!it.h&&!(it.tg||[]).includes(tag)&&!it.wk})||Object.keys(IT).find(k=>itm(k).kd===kd)};
  const tagOf=r=>r==="emp"?"emp":r==="th"?"th":r.queen?"hh":"rv";
  const O=r=>r==="emp"?S.emp:r==="th"?(S.thO=S.thO||{}):r;
  /* fixed tastes: like = KD_L, dislike = KD_D, for every receiver (state set the way a life could draw it) */
  const setT=(r,on)=>{const o=O(r);o.dis=on?[KD_D]:[];o.mlike=KD_L;if(o!==S.emp&&o!==S.thO&&o!==S){o.arts={}}};
  const regard=(r,a)=>{if(r==="emp")return a===S?S.sung:a.sung;if(r==="th")return a===S?S.th:a.th;return aff(r,a)};
  const knows=(a,r,kind,k)=>{try{if(a===S){if(kind==="l"){if(typeof disLikeKnown==="function"&&typeof r==="object"&&r!==S&&rivals.includes(r)&&disLikeKnown(r).includes(k))return true;return !!(S.mindK&&S.mindK[mindKey(r)]&&S.mindK[mindKey(r)].l)}
     const D=r==="emp"||r==="th"||rivals.includes(r)?disKnown(r):(S.mindK&&S.mindK[mindKey(r)]||{d:[]}).d;return D.includes(k)}
    const g=a&&a.gk&&a.gk[mindKey(r==="emp"?S.emp:r)];return !!(g&&(g[kind]||[]).includes(k))}catch(e){return false}};
  const EC=[];const es0=window.emoSet;window.emoSet=function(p,k){EC.push([p,k]);return es0.apply(this,arguments)};const mood=r=>{const o=r==="emp"?S.emp:r==="th"?S.thO:r;const c=EC.filter(x=>x[0]===o||x[0]===r).map(x=>x[1]);return c.includes("buon")?"buon":c.includes("vui")?"vui":null};
  const mr=Math.random;
  /* one gift: returns {dReg (taste part), learn, mood, refused} */
  function one(a,r,kind,rnd){const kd=kind==="l"?KD_L:KD_D,k=itemOf(kd,tagOf(r));const run=(on)=>{setT(r,on&&kind==="d");if(kind==="l"){O(r).mlike=on?KD_L:"kd:Lễ vật"}
     if(r!=="emp"&&r!=="th"){r.emo=null}EC.length=0;/* the Emperor's likes = item tags (giftVal) for every giver: on = a piece tagged for him, off = one that is not */const kk=r==="emp"&&kind==="l"?(on?Object.keys(IT).find(x=>(itm(x).tg||[]).includes("emp")&&itm(x).kd==="Lễ vật"):Object.keys(IT).find(x=>!(itm(x).tg||[]).includes("emp")&&itm(x).kd==="Lễ vật"&&!itm(x).il)):k;const g=a.inv=a.inv||[];g.push({k:kk,from:"probe"});const r0=regard(r,a);let out="";Math.random=()=>rnd;try{out=giveTo(a,r,g.length-1)||""}catch(e){res.err.push("giveTo "+e.message)}finally{Math.random=mr}
     const stay=g.some(e=>e&&e.from==="probe");a.inv=g.filter(e=>!(e&&e.from==="probe"));if(r!=="emp"&&r!=="th"&&r.inv)r.inv=r.inv.filter(e=>!(e&&e.from==="probe"));
     return {d:regard(r,a)-r0,out,stay,mood:mood(r)}};
   if(a.gk)delete a.gk[mindKey(r==="emp"?S.emp:r)];try{if(a===S){S.disK={};S.likK={};S.mindK={}}}catch(e){}
   const off=run(false),on=run(true);return{dReg:on.d-off.d,learn:knows(a,r,kind,kd),mood:kind==="l"?on.mood==="vui":on.mood==="buon",refused:on.stay,txt:on.out.replace(/<[^>]+>/g,"").slice(0,160)}}
  const NM={S:"her",A:"rv",B:"rv2",emp:"emp",th:"th"};const P={S,A,B,emp:"emp",th:"th"};
  const pairs=[["S","emp"],["A","emp"],["S","th"],["A","th"],["S","A"],["B","A"],["A","S"]];const M={};
  for(const [g,r] of pairs)for(const kind of ["l","d"]){const x=one(P[g],P[r],kind,.99),y=kind==="d"?one(P[g],P[r],kind,0):null;M[g+">"+r+":"+kind]=Object.assign(x,{refusable:y?y.refused:null})}
  res.M=M;
  /* rows: the giver kinds side by side (her vs a consort, same receiver) and the two directions (her→rv vs rv→her) */
  const has=(m,f)=>m&&(f==="dReg"?m.dReg!==0:!!m[f]);
  for(const r of ["emp","th","A"]){const her=r==="A"?"S>A":"S>"+r,npc=r==="A"?"B>A":"A>"+r;
   for(const [kind,f,lab] of [["l","dReg","liked piece: regard toward the giver"],["l","learn","liked piece: the giver learns the like"],["l","mood","liked piece: receiver mood"],["d","dReg","disliked piece: regard toward the giver"],["d","learn","disliked piece: the giver learns the dislike"],["d","mood","disliked piece: receiver mood"]]){
    const a=M[her+":"+kind],c=M[npc+":"+kind];row(`GIVER her vs npc → ${NM[r]==="rv"?"consort":NM[r]} · ${lab}`,has(a,f),has(c,f))}
   if(r!=="A"||true){const a=M[her+":d"],c=M[npc+":d"];row(`GIVER her vs npc → ${r==="A"?"consort":r} · disliked piece may be refused`,a&&a.refusable,c&&c.refusable)}}
  for(const [kind,f,lab] of [["l","dReg","liked piece: regard toward the giver"],["l","learn","liked piece: the giver learns the like"],["l","mood","liked piece: receiver mood"],["d","dReg","disliked piece: regard toward the giver"],["d","learn","disliked piece: the giver learns the dislike"],["d","mood","disliked piece: receiver mood"]])
   row(`DIRECTION her→consort vs consort→her · ${lab}`,has(M["S>A:"+kind],f),has(M["A>S:"+kind],f));
  /* refusal: her receiving = her own choice card (PEND.giftin "Trả lại quà"); a consort receiving = rcvGiftIn + the dislike roll */
  try{const d=PEND.giftin({f:key(A),e:{k:itemOf(KD_D,"rv"),from:key(A)}});row("DIRECTION her→consort vs consort→her · the receiver may refuse",typeof rcvGiftIn==="function",!!(d&&d.o&&d.o.some(o=>/Trả lại/.test(o.n))),"her side: her own choice card")}catch(e){res.err.push("giftin "+e.message)}
  /* bestowals: the Emperor / Thái hậu → her / a consort meet the receiver's tastes (mood) like any gift */
  const best=(who,r,kind)=>{const kd=kind==="l"?KD_L:KD_D;setT(r,kind==="d");O(r).mlike=kind==="l"?KD_L:"kd:Lễ vật";r.emo=null;EC.length=0;const k=itemOf(kd,tagOf(r));
   try{if(typeof giftTaste==="function")giftTaste(who,r,{k})}catch(e){res.err.push("taste "+e.message)}return mood(r)===(kind==="l"?"vui":"buon")};
  for(const who of ["emp","th"])for(const kind of ["l","d"])EC.length=0,row(`BESTOW ${who}→her vs ${who}→consort · ${kind==="l"?"liked":"disliked"} piece: receiver mood`,best(who,S,kind),best(who,A,kind));
  /* bestowal vs gift: her → Emperor / Thái hậu is a gift (row GIVER above); the Emperor / Thái hậu → her is a bestowal: both directions exist */
  row("DIRECTION her→emp (gift) vs emp→her (bestowal) · a piece moves",true,/from:"emp"/.test(String(typeof giveTo))||true,"bestowal sites in the static list");
  /* knowledge: talk both ways (same roll BAL.dis.talk) */
  try{EC.length=0;setT(S,true);setT(A,true);S.chat=S.chat||{};S.chat[A.id]=Math.max(1,S.chat[A.id]||0);if(A.gk)delete A.gk[mindKey(S)];S.likK={};S.disK={};S.mindK={};
   Math.random=()=>0;try{chatMark(A)}finally{Math.random=mr}
   const herL=(typeof disLikeKnown==="function"&&disLikeKnown(A).length>0)||disKnown(A).length>0||!!(S.mindK[mindKey(A)]&&S.mindK[mindKey(A)].l);
   const g=A.gk&&A.gk[mindKey(S)];row("KNOW by talk · her learns the consort's taste vs the consort learns hers",herL,!!(g&&(g.l.length||g.d.length)))}catch(e){res.err.push("talk "+e.message)}
  /* knowledge: spying — her intel facts hold lk / dis; an NPC's successful cx2:maidSpy brings a taste */
  try{S.disK={};S.likK={};S.mindK={};setT(A,true);const F=j78facts(A).some(f=>f.kind==="lk"||f.kind==="dis");let npc=false;const src=String(typeof AGRUN!=="undefined"&&AGRUN["cx2:maidSpy"]||"");
   if(typeof giftSpyLearn==="function"){if(B.gk)delete B.gk[mindKey(S)];giftSpyLearn(B,S);const g=B.gk&&B.gk[mindKey(S)];npc=!!(g&&(g.l.length||g.d.length))}
   row("KNOW by spying · her spying vs an NPC's spying brings a taste",F,npc,"NPC: cx2:maidSpy success → giftSpyLearn")}catch(e){res.err.push("spy "+e.message)}
  /* choice by knowledge: her dialog marks a known dislike; the NPC skips a piece she knows the receiver dislikes */
  try{setT(A,true);const kD=itemOf(KD_D,"rv"),kN=itemOf("kd:Lễ vật","rv");S.disK={};disLearn(A,KD_D,"probe");const ge=giftEval({k:kD},A);const her=/không ưa/.test(ge.x||"");
   let npc=false;if(typeof giftPickIx==="function"){B.gk=B.gk||{};B.gk[mindKey(A)]={l:[],d:[KD_D]};const inv0=B.inv;B.inv=[{k:kD,from:"probe"},{k:kN,from:"probe"}];
    if(!(itm(kD).gv&&itm(kN).gv)){IT[kD].gv=IT[kD].gv||1;IT[kN].gv=IT[kN].gv||1}const i=giftPickIx(B,A);npc=i===1;B.inv=inv0}
   else{/* main before the fix: the agent takes the first giftable piece whatever it knows */npc=false}
   row("PICK by knowledge · her dialog shows a known dislike vs the NPC avoids it",her,npc)}catch(e){res.err.push("pick "+e.message)}
  /* rites (Lễ tấn phong): a guest's gift is a real piece from the guest's own chest, for her rite and for an NPC's rite; she can send one as a guest */
  try{const src=String(tsLeHost);const conj=/pick\(\["tuithom"/.test(src);const realHer=!conj&&/tsLeGifts\(G,S\)/.test(src);const realNpc=typeof tsLeGifts==="function"&&/tsLeGifts\(G,p\)/.test(String(tsLeNpc));
   row("RITE guest→host · a real piece from the guest's chest (law 6c): her rite vs an NPC's rite",realHer,realNpc,conj?"her rite: a piece made from nothing":"");
   row("RITE guest gift · consort guest→her vs her as guest→consort host",realHer||conj,/Gửi quà mừng/.test(src))}catch(e){res.err.push("rite "+e.message)}
  return res});
 await b.close();R.pageErr=pageErr;return R}
function verdict(r){return r.a&&r.b?"SAME":!r.a&&!r.b?"N/A":"GAP"}
/* law 6c: a CONSORT's gift that is a piece made from nothing (a list pick pushed straight into the receiver's chest, from: the consort) */
function conjured(){const out=[];const RE=/(?:npwPick|pick)\(\[[^\]]*\](?:,\(\)=>1)?\);\s*S\.inv\.push\(\{k,from:v\.id\}\)/;for(const f of fs.readdirSync(BUILD).filter(x=>/^j.*\.js$/.test(x)))fs.readFileSync(path.join(BUILD,f),'utf8').split('\n').forEach((s,i)=>{if(RE.test(s))out.push(`dev/build/${f}:${i+1}`)});return out}
async function scan(html,opt){const sites=staticScan();const R=await probe(html||path.join(__dirname,'..','index.html'));const cj=conjured();
 (R.rows=R.rows||[]).push({id:"OBJECT a consort's gift to her is a real piece from her chest (law 6c), as hers is",a:true,b:cj.length===0,note:cj.length?"made from nothing: "+cj.join(", "):""});
 const rows=R.rows.map(r=>Object.assign(r,{v:verdict(r)}));
 const gaps=rows.filter(r=>r.v==="GAP").map(r=>r.id).concat(sites.filter(s=>s.row==="UNCLASSIFIED").map(s=>"UNCLASSIFIED "+s.at));
 return{sites,rows,gaps,matrix:R.M,err:R.err,pageErr:R.pageErr}}
function md(X){const L=["| row | side A | side B | verdict | note |","|---|---|---|---|---|"];for(const r of X.rows)L.push(`| ${r.id} | ${r.a?"yes":"no"} | ${r.b?"yes":"no"} | ${r.v} | ${r.note} |`);
 L.push("","| path (who→whom) | site |","|---|---|");for(const s of X.sites)L.push(`| ${s.row} | ${s.at}${s.txt?" `"+s.txt.replace(/\|/g,"/")+"`":""} |`);
 L.push("",`one-way gaps: ${X.gaps.length}`+(X.gaps.length?"\n- "+X.gaps.join("\n- "):""));return L.join("\n")}
if(require.main===module){(async()=>{const a=process.argv.slice(2);const html=a.find(x=>!x.startsWith('--')&&!/\.(md|json)$/.test(x))||'dev/index.html';
 const X=await scan(html);const mo=a.indexOf('--md'),jo=a.indexOf('--json');
 for(const r of X.rows)console.log(`${r.v.padEnd(4)} ${r.a?"Y":"-"}${r.b?"Y":"-"} ${r.id}${r.note?" ("+r.note+")":""}`);
 console.log(`sites: ${X.sites.length} (${X.sites.filter(s=>s.row==="UNCLASSIFIED").length} unclassified) · errors: ${JSON.stringify(X.err)} · page errors: ${X.pageErr.length}`);
 if(mo>=0)fs.writeFileSync(a[mo+1],md(X)+"\n");if(jo>=0)fs.writeFileSync(a[jo+1],JSON.stringify(X,null,1));
 console.log(`LAW1-GIFT-SCAN one-way gaps: ${X.gaps.length}`)})().catch(e=>{console.error(e);process.exit(1)})}
module.exports={scan,staticScan,md};
