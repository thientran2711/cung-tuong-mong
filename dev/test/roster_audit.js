/* j95 roster audit: real bot play (dev/measure harness inpage5 + inbal), every origin incl. cung nữ, 2 game years per life.
   Checks at every khắc (each spend, walk, new buổi):
   (a) people in the record == people alive in the palace (counted independently here)
   (b) one place each (no duplicate person, no empty place, no servant listed under two mistresses)
   (c) map count (countAt), S.where / whereOf, S.menW, the stage (S.visit.people), tai mắt "where" reports == record
   (d) every NPC act aimed at someone passed the motive gate with a reason; no harm at affection >= 40 without a recorded exception
   (e) the dead / those who left are gone from the record, fallen consorts are in lãnh cung
   (f) save -> load keeps the record identical (every 6 buổi)
   usage: node dev/test/roster_audit.js <sens|rand> <lives> <out.json> [shard]     (GAME=path to dev/index.html)  */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const mode=process.argv[2]||'sens',LIVES=+process.argv[3]||18,OUT=process.argv[4]||'/dev/stdout',SH=+process.argv[5]||0;
const M=path.join(__dirname,'..','measure'),GAME=process.env.GAME||path.join(__dirname,'..','index.html');
const PRE=`(function(){const O=['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'];window.__audOi=${SH};const s0=start;start=function(){window.__forceOrigin=O[(window.__audOi++)%O.length];return s0.apply(this,arguments)}})();`;
const HOOK=`(function(){const A=window.__aud={checks:0,lives:0,khac:0,err:{a:0,b:0,c:0,d:0,e:0,f:0},ex:{a:[],b:[],c:[],d:[],e:[],f:[]},gate:0,gatePass:0,acts:0,orig:{},buoi:0,saves:0};
 const bad=(k,m)=>{A.err[k]++;if(A.ex[k].length<12)A.ex[k].push((S&&S.origin?S.origin.k:"")+" T"+(S?S.turn:"")+" "+m)};
 function expected(){/* independent count of everyone alive in the palace now */const ids=new Set(["emp","me"]);if(!S.thDead)ids.add("th");
  for(const v of rivals)if(v.alive)ids.add("v"+v.id);
  for(const p of [S].concat(rivals)){if(p!==S&&!p.alive)continue;const pk=p===S?"me":p.id;if(p.maid&&p.maid.name&&!(p===S&&typeof isSrv==="function"&&isSrv()))ids.add("mm:"+pk);for(const s of p.staff||[])if(s&&s.sid!=null)ids.add("s"+s.sid)}
  for(const c in (S.court||{}))if(S.court[c]&&S.court[c].name)ids.add("c:"+c);
  for(const m of S.men||[]){if(!m.alive)continue;if(m.rw==="thái y"||m.rw==="thị vệ"||(S.menW&&S.menW[m.id]))ids.add(m.id)}
  for(const [k,mo] of allKids())if(k&&k.alive)ids.add("k:"+(mo?mo.id:"me")+":"+(mo?mo.kids:S.kids).indexOf(k));return ids}
 function check(where){if(!S||S.dead||window.__j95off)return;const R=S.roster;if(!R||R.key!==j95key())return;const kh=j95kh();A.checks++;
  const ids=Object.keys(R.P);const ex=expected();
  /* (a) */for(const id of ex)if(!R.P[id])bad("a",where+" thiếu "+id);for(const id of ids)if(!ex.has(id)&&!/^m\\d/.test(id))bad("a",where+" thừa "+id);
  for(const id of ids)if(/^m\\d/.test(id)&&!ex.has(id)){const m=manById(id);if(!m)bad("a",where+" nam nhân không còn: "+id)}
  /* (b) */const sids={};for(const p of [S].concat(rivals)){if(p!==S&&!p.alive)continue;for(const s of p.staff||[]){if(sids[s.sid])bad("b","kẻ hầu ở hai cung: "+s.name);sids[s.sid]=1}}
  for(const id of ids){const e=R.P[id];if(!e||e.length!==4||!e[kh]||!e[kh][0])bad("b",where+" không có nơi: "+id)}
  /* (c) */const C={};for(const id of ids){const k=R.P[id][kh][0];C[k]=(C[k]||0)+1}
  const places=new Set(Object.keys(C).concat(["vuon","thu","dtd","tn","kn","tyv","ksp","lc","home"]));for(const k of places)if(countAt(k)!==(C[k]||0))bad("c",where+" đếm "+k+": bản đồ "+countAt(k)+" sổ "+(C[k]||0));
  for(const v of rivals){if(!v.alive)continue;const e=R.P["v"+v.id];if(e&&whereOf(v)!==e[kh][0])bad("c",where+" whereOf "+v.name)}
  for(const m of S.men||[]){const e=R.P[m.id];const w=(S.menW||{})[m.id];if(e&&w!==e[kh][0])bad("c",where+" menW "+m.id)}
  if(S.visit&&S.visit.k===S.place&&S.visit.people){for(const p of S.visit.people){if((p.kind==="rival"||p.kind==="hh")&&p.ref){const e=R.P["v"+p.ref.id];if(e&&e[kh][0]!==S.place)bad("c",where+" sân khấu có "+p.ref.name+" mà sổ ở "+e[kh][0])}if(p.kind==="emp"&&R.P.emp[kh][0]!==S.place)bad("c",where+" sân khấu có Hoàng thượng mà sổ ở "+R.P.emp[kh][0])}
   for(const v of liveRivals(true)){const e=R.P["v"+v.id];if(e&&e[kh][0]===S.place&&!(S.place==="home"&&sameHouse(S,v))&&S.place!=="lc"&&!S.visit.people.some(p=>p.ref===v))bad("c",where+" sổ có "+v.name+" ở "+S.place+" mà sân khấu không có")}}
  /* (e) */for(const v of rivals){const e=R.P["v"+v.id];if(!v.alive&&e)bad("e","người chết còn trong sổ: "+v.name);if(v.alive&&v.out&&e&&e[kh][0]!=="lc")bad("e","phế phi không ở lãnh cung: "+v.name+" sổ="+JSON.stringify(e)+" out="+v.out+" kh="+kh+" key="+R.key)}
  for(const m of S.men||[])if(!m.alive&&R.P[m.id])bad("e","nam nhân chết còn trong sổ "+m.id)}
 window.__audCheck=check;
 const wrap=(n,f)=>{const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{f.apply(this,arguments)}catch(e){bad("c","lỗi kiểm "+n+": "+e.message)}return r}};
 /* nextBuoi/goTo are wrapped by the harness: wrap the game functions by name (global bindings) */
 {const o=spend;spend=function(){const r=o.apply(this,arguments);try{A.khac++;check("spend")}catch(e){bad("c","lỗi kiểm: "+e.message)}return r}}
 {const o=goTo;goTo=function(){const r=o.apply(this,arguments);try{check("goTo")}catch(e){bad("c","lỗi kiểm: "+e.message)}return r}}
 {const o=nextBuoi;nextBuoi=function(){const r=o.apply(this,arguments);try{A.buoi++;check("buổi");
   if(A.buoi%6===0&&S&&!S.dead&&!Q.length&&!S.mg){const before=JSON.stringify([S.roster,S.rlog,S.j95]);const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;const after=JSON.stringify([S.roster,S.rlog,S.j95]);A.saves++;if(before!==after)bad("f","save/load đổi sổ ở "+j95key())}}catch(e){bad("f","lỗi save/load: "+e.message)}return r}}
 /* (d) the gate: every hostile NPC act at affection >= 40 must carry a recorded exception */
 {const o=runAct;runAct=function(a,t,k){const hostile=a&&a!==S&&t&&H95.has(k);let af=0;if(hostile){A.acts++;af=aff(a,t)}const n0=S&&S.roster&&S.roster.acts?S.roster.acts.length:0;const r=o.apply(this,arguments);
   try{if(hostile){const L=(S.roster&&S.roster.acts)||[];const rec=L.length>n0||L.length===60?L[L.length-1]:null;if(!rec||rec.k!==k)bad("d","hành động không qua cổng: "+a.name+" "+k);
    else if(rec.ok){A.gatePass++;if(af>=40&&!(rec.ex&&/khống chế|lệnh chủ phe|tin đồn/.test(rec.why)))bad("d",a.name+" "+k+" "+(t===S?"ngươi":t.name)+" khi thiện cảm "+af+" mà không có lý do ngoại lệ (ghi: "+rec.why+")")}else A.gate++}}catch(e){}return r}}
 /* tai mắt 'where' reports must match the record at the moment they are made */
 {const o=intelAdd;intelAdd=function(v,f){try{if(f&&f.kind==="where"&&S.roster&&S.roster.P["v"+v.id]){const k=S.roster.P["v"+v.id][j95kh()][0];if(!String(f.txt).includes(placeName(k)))bad("c","tai mắt báo sai nơi: "+f.txt+" / sổ "+placeName(k))}}catch(e){}return o.apply(this,arguments)}}
 /* 2 game years per life, then a new life (next origin) */
 const st0=window.__bot.step;window.__bot.step=function(m,n){for(let i=0;i<n;i++){st0(m,1);try{if(S&&!S.dead&&S.turn>=24&&!Q.length){A.lives++;A.orig[S.origin.k]=(A.orig[S.origin.k]||0)+1;window.__res.push({origin:S.origin.k,title:"2 năm",turns:S.turn});start()}
   else if(S&&S.dead&&!window.__deadSeen){window.__deadSeen=1;A.lives++;A.orig[S.origin.k]=(A.orig[S.origin.k]||0)+1}if(S&&!S.dead)window.__deadSeen=0}catch(e){}}return window.__res.length}})();`;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const ctx=await b.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();
 await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(PRE);await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__servPolicy='';window.__aff=0;window.__balO=null;window.__fairO=null;window.__q72O=null;window.__xO=null;window.__q72off=1`);
 for(const f of ['inpage5.js','inbal.js'])await page.evaluate(fs.readFileSync(path.join(M,f),'utf8'));
 await page.evaluate(HOOK);await page.evaluate(()=>{J95.stat={gate:0,gateBy:{},pass:0,bad:[]};start()});
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>{window.__bot.step(m,200);return window.__aud.lives},[mode]);if(n>=LIVES)break;if(Date.now()-t0>(+process.env.CAP||3000)*1e3){console.log('time cap');break}}
 const out=await page.evaluate(()=>Object.assign({},window.__aud,{gateStat:J95.stat,j95errs:J95.errs,res:window.__res.slice(-80).map(r=>({o:r.origin,t:r.title,turns:r.turns}))}));out.pageErrors=errs.slice(0,20);out.pageErrorN=errs.length;out.mode=mode;
 fs.writeFileSync(OUT,JSON.stringify(out,null,1));console.log(mode,'lives',out.lives,'checks',out.checks,'err',JSON.stringify(out.err),'gate',out.gate,'pass',out.gatePass,'pageErr',errs.length);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
