/* RECEIVER-CHOICE SCAN (owner OD 18/11 ~21:15Z, law 1 two-way + law 2 equal value + law 3 gain-and-loss + law 6b real people):
   "đâu có cái option nào mà có thể ép một người ... phải làm một cái hành động mà họ không muốn ... mình còn phải dò hết tất cả các cái hành
   động coi thử là NPC đã có được những cái option từ chối hay là những cái option lựa chọn giống như một người chơi chưa."
   For EVERY act one person does to / for another, run in the LIVE game through the ONE executor both sides share
   (twDo for TW deeds, AGRUN[k] for every other ag deed, AS_DO[k] for the household staff), in three directions:
     N→P  an NPC does it to HER   → does she get a choice card (a dialog with ≥ 2 real options)?          cell P: CHOICE / AUTO
     P→N  she does it to an NPC   → does the receiver NPC choose (mindPick / stf2Pick / rdHpDraw … with chooser = the receiver)?  cell N
     N→N  an NPC to another NPC   → the same check (the world without her)                                  cell NN
   A row is "inter-person" when the act touches the receiver (her state / the NPC's state or bonds change, or the result names her).
   Verdict: SAME (both receivers choose) · P-AUTO / N-AUTO / AUTO (a receiver who is forced: law-1 gap) · COVERT (the receiver does not know
   at the moment: her answer is at discovery — exempt list RCVX below) · n/a (the act never touched a receiver in the probe).
   usage: node dev/tools/receiver-choice-scan.js [dev/index.html] [--md out.md] [--json out.json]
   module: require('./receiver-choice-scan.js').scan(html) → {rows, gaps}                                                                     */
const path=require('path');
/* acts whose receiver does not know at the moment (secret deeds): her choice set is the discovery / defence path (Soát quà, Phòng bị, tra xét) */
const RCVX={poison:"bỏ độc (lén)",plant:"giấu bùa (lén)",taint:"hạ thuốc (lén)",cook:"hạ thuốc (lén)",tieuhuy:"tiêu hủy (lén)",eyes:"cài tai mắt (lén)",
 plantSrv:"cài người (lén)",spy:"dò la (lén)",maidSpy:"sai dò la (lén)",chest:"lục rương (lén)",gossip:"đồn (sau lưng)",pillow:"gối đầu (sau lưng)",
 slander:"gièm (sau lưng)",vu:"vu (qua người xử)",frame:"tố lỗi (qua người xử)",listen:"nghe ngóng (lén)",watch:"canh chừng (lén)",scout:"dò đường (lén)"};
/* act kind = what the RECEIVER is asked / given (key without its cx:/cx2:/cx3:/ag prefix):
   REQ   she is asked to DO something for the asker (nhờ / xin / sai) — the 4 answers (OD L1876 + 21:15Z: giúp hết lòng / làm qua loa / từ chối / mách lẻo–phá ngầm)
   PROP  she is proposed / invited to do or join something (kết giao, lập phe, mời, ghé) — accept / refuse, never forced (21:15Z)
   ORDER an order from above (Hoàng thượng triệu, chủ sai) — the same 4 answers, refusing has its cost (21:15Z)
   GIFT  she is given something (quà, thưởng, giúp) — the receiver's answers must be the same both ways (law 1)
   DONE  done TO her openly (hại, tố, phạt, nói chuyện): no answer at the moment on either side; her counterplay comes after (defence / accuse / oán)
   COVERT the receiver does not know at the moment (RCVX): her answer is at discovery (Soát quà, Phòng bị, tra xét) */
/* JUDGE a THIRD person is asked to decide about the target (xin Hoàng hậu giáng, trình Hoàng hậu / Thái hậu): the judge is the receiver (judge probe below)
   EVERY act key is classified HERE (review FAIL 6 #4: no hand list may send an unlisted act to DONE). The key list itself comes from the live act tables
   (TW / ACT / AGRUN, in the page); a reached inter-person act whose key is in no list is kind NEW → verdict NEW = a gap, the test fails until it is classified. */
const KINDS={REQ:"help doctor facJoin blockf bribel bribe bribeSrv rougeBorrow illAlly rougeBeg",PROP:"ally facFound invite2 call mediate manHail manFlirt manToken manTryst",ORDER_SRV:"illMaid",ORDER:"summon visit",
 JUDGE:"xinhh trinhhh trinhth takeaway",
 /* staffUp «Tiến cử»: a request to Nội vụ phủ (an office; recommend() is one rule for her and every NPC) and the servant only gains (law 3) → GIFT (reviewer 88de83c5f) */
 GIFT:"gift reward petcare charity staffUp teachV teachD thHelp hhShield pardon release tqGift tyGift staffChe treat petBuy",
 /* SELF: the doer's own deed (no other person is asked or given anything; when a probe still sees it touch someone it is OK, never a hidden ask) */
 SELF:"face arts book alms sutra maidR rest study buy portrait maidTalk fert dance anthai restLat sell work hire facLeave drug def_canh def_thudoc def_theodoi def_giuchung qin kidCare kidGuard cycFix cycMama illCho illThaiy",COVERT:Object.keys(RCVX).join(" ")+" tieuhuy chest laydo laydol slowpoison petsteal pgift rougeSteal",
 DONE:"accuse expose manCut kidGreet kidHeal kidMed test pushp banphe batnat block huydung ink kpoison ksab lygian musk nuoc phatquy phonghoa pond rash rumor spyk tea thathu tocao trip uyhiep vp xx "+
  "apol announce drop catswap kframe steal road giahoa tat thaopet hearMe joinMe hear join judge vent invoke staffPhat staffDoi staffTam threat facSell facDiv "+
  "flat true show favor court nurse likes old humble search staffHoi staffThuong talkGossip talkHealth talkPraise talkSecret tell use conf cutpay admon check fakeIll fakePreg flaunt follow humil ksp pray provoke thHH thTH warn"};
/* STAFF: a servant's own deed (ag maid:* / srv:*, the maid road): those receiver rows live in C-AG's ONE role-parity table (jagstf2 G10 cards) */
const KIND=k=>{const b=k.replace(/^[a-z0-9]+:/,"").replace(/^[a-z0-9]+:/,"");if(k==="tw:help"||k==="th:gift"||k==="ag:th:gift")return"GIFT";if(/^(ag:)?(maid|srv):/.test(k))return"STAFF";
 for(const K in KINDS)if(KINDS[K].split(" ").includes(b))return K;return"NEW"};
/* a judge with no player seat (she is never the Thái hậu): the NPC judge's own roll stands; listed with its reason (reviewer 88de83c5f: OK as it stands) */
const JUDGE_NPC_ONLY={trinhth:"Thái hậu xét: ngươi không bao giờ ngồi ghế Thái hậu",takeaway:"Hoàng thượng chuẩn: ngươi không bao giờ ngồi ghế Hoàng thượng",
 /* the man of a tư tình road (cx4 man*, role-parity r2): she is never the man; his answer is his own NPC roll */
 manHail:"người đàn ông: ngươi không ngồi ghế ấy",manFlirt:"người đàn ông: ngươi không ngồi ghế ấy",manToken:"người đàn ông: ngươi không ngồi ghế ấy",manTryst:"người đàn ông: ngươi không ngồi ghế ấy"};

function inPage(arg){const {TRIES}=arg;const out={rows:{},err:[],pend:[]};
 /* the deed whose receiver answers later, at its landing (Mời đến cung ta: the guest answers when the next buổi's places are drawn) */
 /* she as the HOST is her own button (j21 invite → S.invite, answered when the next buổi's places are drawn: placeWhere) */
 const LAND={"cx3:invite2":(a,t)=>{if(a===S&&t&&t!==S){S.invQ=[];S.invite={id:t.id,o:50};placeWhere();return}if(typeof p3InvLand==="function")p3InvLand()}};
 const R0=Math.random;let seed=1;const SEED=n=>{seed=n||1;Math.random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646}};
 const E=(w,e)=>{if(out.err.length<40)out.err.push(w+": "+(e&&e.message||e))};
 /* chooser detectors: every NPC decision goes through one of these (jmind mindPick = the ONE mind; stf2* = staff dilemmas; rdHpDraw = helper answer) */
 const CH=[];const who={rcvOddsPick:a=>a[0],mindPick:a=>a[1],stf2Pick:a=>a[0],stf2Ord:a=>a[1],stf2Bribe:a=>a[1],stf2Framed:a=>a[0],rdHpDraw:a=>null,eitPilPick:a=>a[0],cmAskPick:a=>a[0],asHitPick:a=>a[0]};
 for(const f in who){const f0=window[f];if(typeof f0!=="function")continue;window[f]=function(){try{CH.push({f,p:who[f](arguments),n:Array.isArray(arguments[0])?arguments[0].length:0})}catch(e){}return f0.apply(this,arguments)}}
 const rich=a=>{Object.assign(a,{bac:5000,suc:100,danh:90,duc:90,tamco:80,sung:60,th:70,hh:60,tai:80,sac:80});if(a===S){S.kh=0;try{used=0}catch(e){}}a.confined=0;a.fakeIll=0};
 const T=x=>{if(!x)return"";if(x===S)return JSON.stringify([S.suc,S.bac,S.danh,S.duc,S.sung,S.th,S.hh,S.preg,S.confined,S.inv&&S.inv.length,S.kids&&S.kids.length,S.oan,S.rl,S.aff,S.af]);
  return JSON.stringify([x.suc,x.bac,x.danh,x.duc,x.sung,x.ghen,x.preg,x.confined,x.out,x.ev,x.rl,x.aff,x.oan,x.af,x.loyal,x.inv&&x.inv.length])};
 
 const realOpts=m=>(m&&m.opts||[]).filter(o=>o&&o.n&&!/^(Thôi|Lui|Đóng|Đã hiểu)\b/.test(o.n));
 const run=(fam,k,a,t)=>{const q0=Q.length,c0=CH.length,t0=T(t),a0=T(a);let r="";SEED(11);
  try{if(fam==="tw")r=twDo(a,t,k,false);else if(fam==="act"){const A=ACT[k];if(!A.ok||A.ok(a,t))r=A.f(a,t)}else if(fam==="ag"){r=AGRUN[k](a,t,{k,vid:a===S?null:a.id,t:t===S?"me":t?"v"+t.id:null,id:a===S?"me":"v"+a.id,key:"rc"});if(LAND[k])LAND[k](a,t)}}catch(e){if(t)E(fam+":"+k,e)}
  const nq=Q.slice(q0);Q.length=q0;const ch=CH.slice(c0).filter(c=>c.p&&c.p!==a&&typeof c.p==="object"&&c.n!==1);
  const cards=nq.filter(m=>realOpts(m).length>=2);const acted=T(t)!==t0||T(a)!==a0||!!r||nq.length>0;
  const touched=t?acted:false;
  return{acted,touched,pc:cards.map(m=>(m.pid||m.t||"?")+"["+realOpts(m).map(o=>o.n.replace(/<[^>]+>/g,"").slice(0,24)).join("/")+"]"),nc:ch.map(c=>c.f+"("+c.n+")"),r:String(r||"").slice(0,80)}};
 const L=()=>liveRivals(true).filter(x=>x&&x!==S&&!x.out&&x.alive!==false);
 const keys=[].concat(Object.keys(TW).map(k=>["tw",k]),Object.keys(ACT).map(k=>["act",k]),Object.keys(AGRUN).filter(k=>!TW[k]).map(k=>["ag",k]));
 for(const [fam,k] of keys){const row={fam,k,P:null,N:null,NN:null,ex:{}};
  /* a self act (it runs with no target) is not an act on another person: probed first, on a fresh doer */
  try{const V=L();const v=V[V.length-1];rich(v);const W=JSON.stringify([v.pray,v.fert,v.fakeIll,v.preg,v.fake,v.tablet]);row.self=run(fam,k,v,null).acted;const w=JSON.parse(W);[v.pray,v.fert,v.fakeIll,v.preg,v.fake,v.tablet]=w}catch(e){row.self=false}
  row.n=fam==="tw"?TW[k].n:fam==="act"?ACT[k].n:((window.AGC2BTN||{})[k.replace(/^cx2:/,"")]||(window.AGC3BTN||{})[k.replace(/^cx3:/,"")]||"");
  for(let i=0;i<TRIES;i++){const V=L();if(V.length<3)break;const v=V[i%V.length],t=V[(i+1)%V.length],u=V[(i+2)%V.length];
   for(const x of [S,v,t,u])rich(x);
   const snap=JSON.stringify({S:{rank:S.rank,place:S.place},v:[v.rank,v.queen]});
   for(const [dir,a,b] of [["P",v,S],["N",S,t],["NN",u,t]]){if(row[dir]&&row[dir].touched&&(dir==="P"?row[dir].pc.length:row[dir].nc.length))continue;
    if(dir==="P")window.__bot=0;/* her side: cards that a bot run suppresses (jration lxAskHer) must show */let x;try{x=run(fam,k,a,b)}finally{window.__bot=1}if(!row[dir]||x.touched&&!row[dir].touched||x.touched&&(dir==="P"?x.pc.length:x.nc.length))row[dir]=x}
   try{S.place=JSON.parse(snap).S.place}catch(e){}}
  /* THIRD-PARTY receiver: the one asked is not the target (Nhờ ơn người quen: the acquaintance who owes the asker) → N→P = she is that acquaintance */
  /* JUDGE receiver (review FAIL 6 #3/#4): N→P = SHE is the Hoàng hậu and an NPC asks her to judge another NPC (her card expected);
     P→N = she asks, an NPC queen judges; N↔N = an NPC asks an NPC queen. Preconditions set (the judge likes the asker, the asker holds chứng cứ) */
  if(fam==="act"&&(arg.JUDGE||[]).includes(k)){try{const V=L();const rk0=S.rank,q0=rivals[0]&&rivals[0].queen;
    const prep=(a,t,q)=>{for(const x of [S,a,t])rich(x);affAdd(q,a,300);evA(a,t,6);t.out=0;t.alive=true};
    S.rank=7;row.P=null;{const a=V[1],t=V.find(x=>x!==a&&rkOf(x)>=1&&rkOf(x)<7)||V[2];prep(a,t,S);const x=run(fam,k,a,t);if(x.touched||x.pc.length)row.P=x}S.rank=rk0;
    const q=queenP();if(q&&q!==S){const t=V.find(x=>x!==q);prep(S,t,q);const x=run(fam,k,S,t);if(x.touched)row.N=x;const a=V.find(x=>x!==q&&x!==t),t2=V.find(x=>x!==q&&x!==t&&x!==a);if(a&&t2){prep(a,t2,q);const y=run(fam,k,a,t2);if(y.touched)row.NN=y}}
    S.rank=rk0}catch(e){E("judge:"+k,e)}}
  if(fam==="act"&&k==="blockf"){try{const V=L();const v=V[0],t=V[1];for(const x of [S,v,t])rich(x);t.block=0;const a0=aff(S,v);affAdd(S,v,300);const x=run(fam,k,v,t);affAdd(S,v,a0-aff(S,v));if(x.touched||x.pc.length)row.P=x}catch(e){E("third:"+k,e)}}
  out.rows[fam+":"+k]=row}
 /* OWN-SERVANT receiver (review FAIL 6 #4): every dirty act is carried by a servant the doer ORDERS (j29 runAct: DIRTY, DIRTY_SENT → jagstf2 stf2Ord
    obey / refuse / tell). P→N = she orders her own servant · N↔N = an NPC orders hers. Her seat as the ORDERED servant is the maid road (parallel-time). */
 try{for(const k of (typeof DIRTY!=="undefined"?DIRTY:[])){if(!ACT[k])continue;const row={fam:"srv",k,P:null,N:null,NN:null,n:ACT[k].n,srv:1};
   for(let i=0;i<3;i++){const V=L();const v=V[i%V.length],t=V[(i+1)%V.length];
    for(const [dir,a,b] of [["N",S,t],["NN",v,t]]){if(row[dir]&&row[dir].nc.length)continue;rich(a);rich(b);if(a.maid){a.maid.loyal=90;a.maid.spyFor=null}
     if(a!==S){try{npcLearn(a,b)}catch(e){}window.__j95off=1}/* the NPC doer knows the target and the motive gate (j95) is off: the probe is about who CHOOSES, not whether she wants to */
     if(!(DIRTY_SENT[k]||bestSent)(a)){a.staff=a.staff||[];const s=mkServ("eunuch");s.loyal=60;a.staff.push(s)}/* a doer with no free servant gets one (the probe needs the ORDERED one) */
     try{const w0=JSON.stringify(S.where||{});if(S.where){S.where[b.id]="xx_far";if(a!==S)S.where[a.id]="xx_far2"}const c0=CH.length;let r="";try{r=runAct(a,b,k)}catch(e){E("srv:"+k,e)}
      const ch=CH.slice(c0).filter(c=>c.f==="stf2Ord"&&c.p&&c.p!==a);row[dir]={acted:true,touched:true,pc:[],nc:ch.map(c=>c.f+"(sv)"),r:String(r||"").slice(0,80)};S.where=JSON.parse(w0)}catch(e){E("srv:"+k,e)}window.__j95off=0}}
   out.rows["srv:"+k]=row}}catch(e){E("srv",e)}
 Math.random=R0;out.pendIds=Object.keys(PEND);out.keys=keys.map(([f,k])=>f==="ag"?"ag:"+k:f+":"+k);return out}

async function scan(html,opt){opt=opt||{};const {chromium}=require('playwright');const URL=/^(https?|file):/.test(html)?html:'file://'+path.resolve(html);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const pageErr=[];p.on('pageerror',e=>pageErr.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();
  window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;S.rank=Math.max(S.rank||0,3);try{render()}catch(e){}});
 const r=await p.evaluate(inPage,{TRIES:opt.tries||6,JUDGE:KINDS.JUDGE.split(" ").filter(k=>!JUDGE_NPC_ONLY[k])});await b.close();r.pageErr=pageErr;return build(r)}

/* SERVANT receiver: the one asked is the target's servant (Mua chuộc …): when she is the target, HER maid / servant (an NPC) is the receiver, so her side counts the servant's own pick */
const SRVR=["bribe","cx2:bribeSrv","bribel"];
function cell(x,side,k){if(!x||!x.touched)return"n/a";return (side==="P"&&!SRVR.includes(k)?x.pc.length:x.nc.length||x.pc.length)?"CHOICE":"AUTO"}
function build(o){const rows=[],gaps=[];
 for(const id in o.rows){const R=o.rows[id];const k=R.k,kind=R.srv?"ORDER":KIND(id.replace(/^ag:/,""));const c={P:cell(R.P,"P",k),N:cell(R.N,"N",k),NN:cell(R.NN,"N",k)};
  if(c.P==="n/a"&&c.N==="n/a"&&c.NN==="n/a"||R.self&&!(R.P&&R.P.pc.length))continue;
  /* verdict: ASYM = one receiver chooses, the other is forced (law 1) · FORCED = asked / proposed / ordered and no receiver can say no (21:15Z) ·
     SAME = every receiver chooses · OK = done-to / covert, no receiver answers at the moment on either side (counterplay after) */
  const nside=c.N!=="n/a"?c.N:c.NN;const sides=[c.P,c.N,c.NN].filter(x=>x!=="n/a");let v;
  if(kind==="NEW")v="NEW";else if(sides.length&&sides.every(x=>x==="CHOICE"))v="SAME";else if(sides.includes("CHOICE"))v="ASYM";else if(JUDGE_NPC_ONLY[k.replace(/^[a-z0-9]+:/,"")])v="OK";else if(/REQ|PROP|ORDER|JUDGE/.test(kind))v="FORCED";else v="OK"
  const row={id,k,n:R.n||"",fam:R.fam,kind,P:c.P,N:c.N,NN:c.NN,v,pc:(R.P&&R.P.pc||[]).slice(0,2),nc:[...new Set((R.N&&R.N.nc||[]).concat(R.NN&&R.NN.nc||[]))].slice(0,3),r:R.P&&R.P.r||R.N&&R.N.r||""};
  rows.push(row);if(v==="ASYM"||v==="FORCED"||v==="NEW")gaps.push({id,k,n:row.n,kind,v})}
 rows.sort((a,b)=>a.kind.localeCompare(b.kind)||a.id.localeCompare(b.id));
 /* every key of the live act tables must be classified (reached by the probe or not): a new act fails until it is put in KINDS */
 const unclassed=(o.keys||[]).filter(id=>KIND(id.replace(/^ag:/,""))==="NEW");
 return{rows,gaps,err:o.err,pageErr:o.pageErr,pendIds:o.pendIds,unclassed,nkeys:(o.keys||[]).length}}
function md(R){const L=["| act | kind | she receives (N→P) | NPC receives (P→N) | NPC↔NPC | verdict | her card / NPC chooser |","|---|---|---|---|---|---|---|"];
 for(const r of R.rows)L.push(`| ${r.id} ${r.n?"«"+r.n+"»":""} | ${r.kind} | ${r.P} | ${r.N} | ${r.NN} | ${r.v} | ${(r.pc.join(" ")+" "+r.nc.join(" ")).trim().replace(/\|/g,"/")} |`);return L.join("\n")}
module.exports={scan,md,build,KIND,RCVX,KINDS,JUDGE_NPC_ONLY};
if(require.main===module){(async()=>{const a=process.argv.slice(2);const html=a.find(x=>!x.startsWith('--')&&!/\.(md|json)$/.test(x))||'dev/index.html';
 const R=await scan(html);const mo=a.indexOf('--md'),jo=a.indexOf('--json');if(mo>=0)require('fs').writeFileSync(a[mo+1],md(R)+"\n");if(jo>=0)require('fs').writeFileSync(a[jo+1],JSON.stringify(R,null,1));
 const cnt={};for(const r of R.rows)cnt[r.v]=(cnt[r.v]||0)+1;console.log("RECEIVER CHOICE: rows "+R.rows.length+" · "+JSON.stringify(cnt)+" · gaps "+R.gaps.length+" · live act keys "+R.nkeys+", unclassified "+R.unclassed.length+(R.unclassed.length?" "+R.unclassed.join(" "):""));
 const by={};for(const g of R.gaps)(by[g.kind]=by[g.kind]||[]).push(g.v+":"+g.id+(g.n?"«"+g.n+"»":""));for(const k in by)console.log("  "+k+" ("+by[k].length+"): "+by[k].join(", "));
 if(R.err.length)console.log("probe errors: "+R.err.slice(0,12).join(" ; "));if(R.pageErr.length)console.log("PAGE ERRORS: "+R.pageErr.slice(0,5).join(" ; "))})()}
