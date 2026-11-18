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
const KINDS={REQ:"help doctor facJoin blockf bribel bribe bribeSrv staffUp",PROP:"ally facFound invite2 call mediate",ORDER:"summon visit",
 GIFT:"gift reward petcare charity",COVERT:Object.keys(RCVX).join(" ")+" tieuhuy chest"};
const KIND=k=>{const b=k.replace(/^[a-z0-9]+:/,"").replace(/^[a-z0-9]+:/,"");if(k==="tw:help"||k==="th:gift"||k==="ag:th:gift")return"GIFT";
 for(const K in KINDS)if(KINDS[K].split(" ").includes(b))return K;return"DONE"};

function inPage(arg){const {TRIES}=arg;const out={rows:{},err:[],pend:[]};
 const R0=Math.random;let seed=1;const SEED=n=>{seed=n||1;Math.random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646}};
 const E=(w,e)=>{if(out.err.length<40)out.err.push(w+": "+(e&&e.message||e))};
 /* chooser detectors: every NPC decision goes through one of these (jmind mindPick = the ONE mind; stf2* = staff dilemmas; rdHpDraw = helper answer) */
 const CH=[];const who={mindPick:a=>a[1],stf2Pick:a=>a[0],stf2Ord:a=>a[1],stf2Bribe:a=>a[1],stf2Framed:a=>a[0],rdHpDraw:a=>null,eitPilPick:a=>a[0],cmAskPick:a=>a[0],asHitPick:a=>a[0]};
 for(const f in who){const f0=window[f];if(typeof f0!=="function")continue;window[f]=function(){try{CH.push({f,p:who[f](arguments),n:Array.isArray(arguments[0])?arguments[0].length:0})}catch(e){}return f0.apply(this,arguments)}}
 const rich=a=>{Object.assign(a,{bac:5000,suc:100,danh:90,duc:90,tamco:80,sung:60,th:70,hh:60,tai:80,sac:80});if(a===S){S.kh=0;try{used=0}catch(e){}}a.confined=0;a.fakeIll=0};
 const T=x=>{if(!x)return"";if(x===S)return JSON.stringify([S.suc,S.bac,S.danh,S.duc,S.sung,S.th,S.hh,S.preg,S.confined,S.inv&&S.inv.length,S.kids&&S.kids.length,S.oan,S.rl,S.aff,S.af]);
  return JSON.stringify([x.suc,x.bac,x.danh,x.duc,x.sung,x.ghen,x.preg,x.confined,x.out,x.ev,x.rl,x.aff,x.oan,x.af,x.loyal,x.inv&&x.inv.length])};
 
 const realOpts=m=>(m&&m.opts||[]).filter(o=>o&&o.n&&!/^(Thôi|Lui|Đóng|Đã hiểu)\b/.test(o.n));
 const run=(fam,k,a,t)=>{const q0=Q.length,c0=CH.length,t0=T(t),a0=T(a);let r="";SEED(11);
  try{if(fam==="tw")r=twDo(a,t,k,false);else if(fam==="act"){const A=ACT[k];if(!A.ok||A.ok(a,t))r=A.f(a,t)}else if(fam==="ag")r=AGRUN[k](a,t,{k,vid:a===S?null:a.id,t:t===S?"me":t?"v"+t.id:null,id:a===S?"me":"v"+a.id,key:"rc"});}catch(e){if(t)E(fam+":"+k,e)}
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
    const x=run(fam,k,a,b);if(!row[dir]||x.touched&&!row[dir].touched||x.touched&&(dir==="P"?x.pc.length:x.nc.length))row[dir]=x}
   try{S.place=JSON.parse(snap).S.place}catch(e){}}
  /* THIRD-PARTY receiver: the one asked is not the target (Nhờ ơn người quen: the acquaintance who owes the asker) → N→P = she is that acquaintance */
  if(fam==="act"&&k==="blockf"){try{const V=L();const v=V[0],t=V[1];for(const x of [S,v,t])rich(x);t.block=0;const a0=aff(S,v);affAdd(S,v,300);const x=run(fam,k,v,t);affAdd(S,v,a0-aff(S,v));if(x.touched||x.pc.length)row.P=x}catch(e){E("third:"+k,e)}}
  out.rows[fam+":"+k]=row}
 Math.random=R0;out.pendIds=Object.keys(PEND);return out}

async function scan(html,opt){opt=opt||{};const {chromium}=require('playwright');const URL=/^(https?|file):/.test(html)?html:'file://'+path.resolve(html);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const pageErr=[];p.on('pageerror',e=>pageErr.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();
  window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;S.rank=Math.max(S.rank||0,3);try{render()}catch(e){}});
 const r=await p.evaluate(inPage,{TRIES:opt.tries||6});await b.close();r.pageErr=pageErr;return build(r)}

/* SERVANT receiver: the one asked is the target's servant (Mua chuộc …): when she is the target, HER maid / servant (an NPC) is the receiver, so her side counts the servant's own pick */
const SRVR=["bribe","cx2:bribeSrv","bribel"];
function cell(x,side,k){if(!x||!x.touched)return"n/a";return (side==="P"&&!SRVR.includes(k)?x.pc.length:x.nc.length||x.pc.length)?"CHOICE":"AUTO"}
function build(o){const rows=[],gaps=[];
 for(const id in o.rows){const R=o.rows[id];const k=R.k,kind=KIND(id.replace(/^ag:/,""));const c={P:cell(R.P,"P",k),N:cell(R.N,"N",k),NN:cell(R.NN,"N",k)};
  if(c.P==="n/a"&&c.N==="n/a"&&c.NN==="n/a"||R.self&&!(R.P&&R.P.pc.length))continue;
  /* verdict: ASYM = one receiver chooses, the other is forced (law 1) · FORCED = asked / proposed / ordered and no receiver can say no (21:15Z) ·
     SAME = every receiver chooses · OK = done-to / covert, no receiver answers at the moment on either side (counterplay after) */
  const nside=c.N!=="n/a"?c.N:c.NN;const sides=[c.P,c.N,c.NN].filter(x=>x!=="n/a");let v;
  if(sides.length&&sides.every(x=>x==="CHOICE"))v="SAME";else if(sides.includes("CHOICE"))v="ASYM";else if(/REQ|PROP|ORDER/.test(kind))v="FORCED";else v="OK"
  const row={id,k,n:R.n||"",fam:R.fam,kind,P:c.P,N:c.N,NN:c.NN,v,pc:(R.P&&R.P.pc||[]).slice(0,2),nc:[...new Set((R.N&&R.N.nc||[]).concat(R.NN&&R.NN.nc||[]))].slice(0,3),r:R.P&&R.P.r||R.N&&R.N.r||""};
  rows.push(row);if(v==="ASYM"||v==="FORCED")gaps.push({id,k,n:row.n,kind,v})}
 rows.sort((a,b)=>a.kind.localeCompare(b.kind)||a.id.localeCompare(b.id));return{rows,gaps,err:o.err,pageErr:o.pageErr,pendIds:o.pendIds}}
function md(R){const L=["| act | kind | she receives (N→P) | NPC receives (P→N) | NPC↔NPC | verdict | her card / NPC chooser |","|---|---|---|---|---|---|---|"];
 for(const r of R.rows)L.push(`| ${r.id} ${r.n?"«"+r.n+"»":""} | ${r.kind} | ${r.P} | ${r.N} | ${r.NN} | ${r.v} | ${(r.pc.join(" ")+" "+r.nc.join(" ")).trim().replace(/\|/g,"/")} |`);return L.join("\n")}
module.exports={scan,md,build,KIND,RCVX};
if(require.main===module){(async()=>{const a=process.argv.slice(2);const html=a.find(x=>!x.startsWith('--')&&!/\.(md|json)$/.test(x))||'dev/index.html';
 const R=await scan(html);const mo=a.indexOf('--md'),jo=a.indexOf('--json');if(mo>=0)require('fs').writeFileSync(a[mo+1],md(R)+"\n");if(jo>=0)require('fs').writeFileSync(a[jo+1],JSON.stringify(R,null,1));
 const cnt={};for(const r of R.rows)cnt[r.v]=(cnt[r.v]||0)+1;console.log("RECEIVER CHOICE: rows "+R.rows.length+" · "+JSON.stringify(cnt)+" · gaps "+R.gaps.length);
 const by={};for(const g of R.gaps)(by[g.kind]=by[g.kind]||[]).push(g.v+":"+g.id+(g.n?"«"+g.n+"»":""));for(const k in by)console.log("  "+k+" ("+by[k].length+"): "+by[k].join(", "));
 if(R.err.length)console.log("probe errors: "+R.err.slice(0,12).join(" ; "));if(R.pageErr.length)console.log("PAGE ERRORS: "+R.pageErr.slice(0,5).join(" ; "))})()}
