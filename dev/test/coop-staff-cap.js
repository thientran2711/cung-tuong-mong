/* coop-staff-split regression (no network): a co-op PLAYER serving as cung nữ is a coop entry (jcoopworld buildFriendSrv) in her mistress's
   staff on the other seat, present while the world loops are paused and pulled out during them (withoutFriend). She must never count in
   the household table (hhHas), so the host neither trims a real servant at her arrival (that person vanished, host only = the seats split)
   nor makes-and-drops one every month (fill with her pulled, trim with her back).
   Forced path, for several lives and every consort that has a household: fill to the table, add her entry, capSweep; then a month:
   pull her, fillStaff, put her back, capSweep. PASS = no real servant gone, none made, the same sids before and after.
   usage: python3 dev/build/assemble.py && node dev/test/coop-staff-cap.js */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});await serve(ctx);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000});
 const rows=[];let lives=0;
 for(let t=0;t<30&&lives<6;t++){const r=await p.evaluate(()=>{try{try{nlNew()}catch(e){}start()}catch(e){return null}if(typeof rivals==='undefined'||!Array.isArray(rivals))return null;quiet=true;const out=[];
   for(const v of liveRivals(true).filter(x=>!x.out&&x.rank>=1&&Array.isArray(x.staff))){fillStaff(v,true);const sig=()=>v.staff.filter(s=>!s.coop).map(s=>s.sid).join(',');const s0=sig();
    const fe={sid:902,coop:true,role:'maid',name:'Hảo hữu',loyal:60};v.staff.push(fe);capSweep();const s1=sig();
    v.staff.splice(v.staff.indexOf(fe),1);fillStaff(v,true);v.staff.push(fe);capSweep();const s2=sig();v.staff.splice(v.staff.indexOf(fe),1);
    out.push({v:v.name,rank:v.rank,cap:capOf(v),s0,s1,s2,ok:s0===s1&&s1===s2})}quiet=false;return out});
  if(!r)continue;lives++;rows.push(...r)}
 const bad=rows.filter(x=>!x.ok);console.log('| life households | arrival trims | month churn |\n|---|---|---|');
 console.log(`| ${rows.length} (${lives} lives) | ${rows.filter(x=>x.s0!==x.s1).length} | ${rows.filter(x=>x.s1!==x.s2).length} |`);
 for(const x of bad.slice(0,5))console.log('FAIL',JSON.stringify(x));if(errs.length)console.log('page errors',errs.slice(0,3));
 const ok=lives>=3&&rows.length>0&&!bad.length&&!errs.length;console.log(ok?'PASS coop-staff-cap':'FAIL coop-staff-cap');await b.close();process.exit(ok?0:1)})();
