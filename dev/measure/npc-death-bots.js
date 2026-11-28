/* review/npc-death bots (D4, orphan audit #18): NPC deaths, replacements with NEW faces, Phế phi họ Lý, palace size.
   usage: node dev/measure/npc-death-bots.js <lives> <years> [out.json]
   "world" style as in mort-bots: she is kept alive (S.tho far, die() muted, rank/stats held) so every OTHER group runs Y years.
   Each month (monthTick() directly, dialogs cleared) it records:
     deaths by group (consort, maid = her cung nữ thân cận, staff = servants of every palace, court = officials, ly = Phế phi họ Lý, kid, th, men)
     replacements: a new person in a dead person's post (maid / court seat / staff refill);
     FACE REUSE: a living person whose portrait (fc) or figure (fid) once belonged to a DEAD person (owner OD:L642: never reuse) — must be 0;
     blank: replacements with no portrait left in the pool (shown with the kit fallback/silhouette) → ART NEEDED size;
     palace size at the end: live consorts, servants in all palaces, Lý present. */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const R=process.env.ROOT||path.resolve(__dirname,'../..');const LIVES=+process.argv[2]||6,YEARS=+process.argv[3]||30,OUT=process.argv[4];
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=900','--disable-gpu']});const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});
 const errs=[];const lives=[];
 for(let l=0;l<LIVES;l++){const page=await ctx.newPage();page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await page.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
  let L;try{L=await page.evaluate((YEARS)=>{const quiet=()=>{try{Q.length=0}catch(e){}};const strip=x=>String(x).replace(/<[^>]+>/g,'');
   const die0=die;die=function(){};SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();quiet();S.tho=999;S.thoM=1;
   /* FAV probes need images (blocked here): treat every pool face as existing so drawF behaves as in the real game */
   try{for(const f of [].concat(...Object.values(FPOOL)))FAV[f]=1}catch(e){}
   const out={d:{},repl:{maid:0,court:0,staff:0,consortIn:0},reuseFc:0,reuseFid:0,reuseEx:[],blank:0,errs:[],lyDied:null,lyStay:0,lyChecks:0,dec:[]};
   const RU=new Set();const deadWho={};const deadFc=new Set(),deadFid=new Set(),deadObj=new Set();
   const servants=()=>{const L=[];for(const p of [S].concat(rivals||[]))for(const s of (p&&p.staff)||[])L.push(s);return L};
   const living=()=>{const L=[];if(S.maid)L.push(S.maid);servants().forEach(s=>L.push(s));for(const k in (S.court||{}))L.push(S.court[k]);(rivals||[]).forEach(v=>v.alive&&L.push(v));
    if(S.lyF&&!S.lyF.dead&&!S.lyF.freed)L.push(S.lyF);return L};
   const giveFaces=()=>{try{faceInit()}catch(e){}for(const p of living()){try{if(typeof figPick==="function"&&typeof figWho==="function")figPick(p)}catch(e){}}};
   const diedIn=(txt,n)=>{if(!n)return false;let i=txt.indexOf(n);while(i>=0){if(/(qua đời|chết|mất vì|không qua khỏi|tự vẫn|tắt thở|lìa đời)/.test(txt.slice(i+n.length,i+n.length+60).split(/[.!]/)[0]))return true;i=txt.indexOf(n,i+1)}return false};
   const dg=(g)=>{out.d[g]=(out.d[g]||0)+1};
   giveFaces();let rv0=new Set(rivals);
   const dec0={c:0,s:0,m:0,o:0};
   for(let m=0;m<YEARS*12&&!S.dead;m++){S.sung=Math.max(S.sung,40);S.danh=Math.max(S.danh,40);S.rank=Math.max(S.rank,5);S.suc=80;S.age=Math.min(S.age,30);
    const before=living();const maid0=S.maid,court0=Object.assign({},S.court||{}),cgen={};for(const k in court0)cgen[k]=court0[k].gen||0;const cname={};for(const k in court0)cname[k]=court0[k].name;const dlN=((S.mort&&S.mort.dl)||[]).length;
    const sv0=new Set(servants());const lyA=S.lyF&&!S.lyF.dead;
    let ev="";try{ev=strip(monthTick())}catch(e){out.errs.push(String(e).slice(0,160));break}quiet();
    /* who died this month */
    const courtDl=((S.mort&&S.mort.dl)||[]).slice(dlN).some(d=>d.g==="court");
    for(const p of before){let dead=false,g="";
     if(p===maid0&&S.maid!==maid0){dead=diedIn(ev,maid0.name);g="maid";if(dead)out.repl.maid++}
     else if((rivals||[]).includes(p)&&p.alive===false){dead=true;g="consort"}
     else if(p===S.lyF&&p.dead&&lyA){dead=true;g="ly";out.lyDied=S.year}
     else{for(const k in court0)if(court0[k]===p&&((p.gen||0)!==cgen[k]||(courtDl&&p.name!==cname[k]))){dead=true;g="court";out.repl.court++}}
     if(!dead&&sv0.has(p)&&!servants().includes(p)&&diedIn(ev,p.name)){dead=true;g="staff";out.repl.staff++}
     if(dead){dg(g);deadObj.add(p);if(p._fc0||p.fc){deadFc.add(p._fc0||p.fc);deadWho[p._fc0||p.fc]=`${g} ${p.name} Y${S.year}${(S.fdead||[]).includes(p._fc0||p.fc)?' retired':' NOT-retired'}`}if(p._fid0||p.fid)deadFid.add(p._fid0||p.fid)}}
    for(const v of rivals)if(!rv0.has(v)){out.repl.consortIn++;rv0.add(v)}
    /* the court seat object is reused in place by jmort: remember its old face under the dead id */
    giveFaces();
    for(const p of living()){if(deadObj.has(p)&&p.alive!==false&&!(p===S.lyF)){}
     if(p.fc&&deadFc.has(p.fc)&&!(deadObj.has(p)&&p.alive===false)){const kk='c'+(p.name||'')+p.fc;if(!RU.has(kk)){RU.add(kk);out.reuseFc++;if(out.reuseEx.length<6)out.reuseEx.push(`Y${S.year} ${p.name||p.role} fc ${p.fc} ← ${deadWho[p.fc]}`)}}
     if(p.fid&&deadFid.has(p.fid)&&!(deadObj.has(p)&&p.alive===false)){const kk='f'+(p.name||'')+p.fid;if(!RU.has(kk)){RU.add(kk);out.reuseFid++;if(out.reuseEx.length<6)out.reuseEx.push(`Y${S.year} ${p.name||p.role} fid ${p.fid}`)}}}
    /* court seats keep the same object: after a rename its own old face counts as the dead's */
    for(const k in S.court||{}){const c=S.court[k];c._fc0=c.fc;c._fid0=c.fid}
    if(S.maid){S.maid._fc0=S.maid.fc;S.maid._fid0=S.maid.fid}
    /* Lý: present in Trường Môn viện next to fallen rivals? */
    if(S.lyF&&!S.lyF.dead&&!S.lyF.freed&&rivals.some(v=>v.alive&&v.out)){out.lyChecks++;try{const here=typeof lcPeople==="function"?lcPeople(3):[];if(here.some(x=>x.kind==="fallen"&&!x.ref))out.lyStay++}catch(e){}}
    if(m%120===119)out.dec.push({y:S.year,consorts:rivals.filter(v=>v.alive).length,staff:servants().length,d:Object.assign({},out.d)})}
   out.end={y:S.year,consorts:rivals.filter(v=>v.alive).length,cold:rivals.filter(v=>v.alive&&v.out).length,staff:servants().length,myStaff:(S.staff||[]).length,ly:S.lyF?(S.lyF.dead?"dead":S.lyF.freed?"freed":"there, age "+S.lyF.age):"none",
    seen:(S.fseen||[]).length,dl:((S.mort&&S.mort.dl)||[]).length};
   out.blank=living().filter(p=>p!==S.lyF&&!p.fc).length;
   const srcOf=p=>{try{if(p===S.maid)return pMaid().src||"";for(const k in S.court||{})if(S.court[k]===p)return k==="ty"?pDoc().src:courtSrc(k,p);if((rivals||[]).includes(p))return pv(p).src||"";return pServ(p).src||""}catch(e){return "?"}};
   out.sil=living().filter(p=>p!==S.lyF&&/kit\/unknown/.test(srcOf(p))).length;out.n=living().length;
   die=die0;return out},YEARS)}catch(e){L={errs:[String(e).slice(0,200)]}}
  await page.close();lives.push(L);console.error("life",l,JSON.stringify(L.end||L.errs))}
 const sum={lives:lives.length,years:YEARS,d:{},repl:{},reuseFc:0,reuseFid:0,blank:0,lyDied:0,lyStay:0,lyChecks:0,ex:[],errs:[],end:[]};
 for(const L of lives){for(const k in L.d||{})sum.d[k]=(sum.d[k]||0)+L.d[k];for(const k in L.repl||{})sum.repl[k]=(sum.repl[k]||0)+L.repl[k];
  sum.reuseFc+=L.reuseFc||0;sum.reuseFid+=L.reuseFid||0;sum.blank+=L.blank||0;sum.sil=(sum.sil||0)+(L.sil||0);sum.n=(sum.n||0)+(L.n||0);if(L.lyDied)sum.lyDied++;sum.lyStay+=L.lyStay||0;sum.lyChecks+=L.lyChecks||0;sum.ex.push(...(L.reuseEx||[]));sum.errs.push(...(L.errs||[]));if(L.end)sum.end.push(L.end)}
 const YRS=sum.end.reduce((a,e)=>a+Math.max(1,e.y),0)||lives.length*YEARS;const per10=x=>(x*10/YRS).toFixed(2);
 console.log(`\n=== npc-death bots: ${lives.length} lives × up to ${YEARS} years (${YRS} years played; a life ends early when the Emperor dies) ===`);
 console.log("deaths per 10 years:",Object.entries(sum.d).map(([k,v])=>`${k} ${per10(v)}`).join(" · "));
 console.log("replacements per 10 years:",Object.entries(sum.repl).map(([k,v])=>`${k} ${per10(v)}`).join(" · "));
 console.log(`face reuse of the dead: portrait ${sum.reuseFc} · figure ${sum.reuseFid}`,sum.ex.slice(0,6));
 console.log(`at the end, of ${(sum.n/lives.length).toFixed(1)} living NPCs (avg): ${(sum.blank/lives.length).toFixed(1)} have no own portrait (fc empty → generic fallback), ${((sum.sil||0)/lives.length).toFixed(1)} show the kit silhouette`);
 console.log(`Phế phi họ Lý died in ${sum.lyDied}/${lives.length} lives; present beside a fallen rival ${sum.lyStay}/${sum.lyChecks} checks`);
 console.log("end states:",sum.end.map(e=>`Y${e.y}: consorts ${e.consorts} (cold ${e.cold}), staff ${e.staff} (hers ${e.myStaff}), Lý ${e.ly}`).join(" | "));
 console.log("errors:",sum.errs.slice(0,5),"pageErrors:",errs.slice(0,5));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({sum,lives}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
