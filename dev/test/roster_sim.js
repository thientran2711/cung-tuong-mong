/* j95: 50-week predictability + 20-week per-khắc invariants (direct sim, no bot).
   usage: node dev/test/roster_sim.js [weeks=50] [lives=6]   (GAME=path to dev/index.html) */
const {chromium}=require('playwright');const path=require('path');
const W=+process.argv[2]||50,LIVES=+process.argv[3]||6;const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 await p.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(600);
 const res=await p.evaluate(([W,LIVES])=>{const out={};
  function life(off,nb){window.__j95off=off?1:0;localStorage.clear();SLOT=5;document.getElementById('title').hidden=true;start();Q.length=0;render=()=>{};showModal=()=>{};
   if(nb===4&&BUOI.length===3){BUOI.splice(1,0,"Buổi trưa")}if(nb===3&&BUOI.length===4)BUOI.splice(1,1);
   const hist={},emp={};let hit=0,tot=0,ehit=0,etot=0,khit=0,ktot=0;const inv={checks:0,dup:0,miss:0,count:0,map:0,view:0,dead:0};
   for(let w=0;w<W;w++){for(let bb=0;bb<BUOI.length;bb++){S.buoi=bb;used=0;Q.length=0;placeWhere();
     for(let kh=0;kh<4;kh++){used=kh;if(!off){j95sync(false);const R=S.roster;inv.checks++;const t=j95table();if(t.dup.length)inv.dup++;if(t.miss.length)inv.miss++;
       const ppl=j95ppl(R);if(ppl.length!==t.total)inv.count++;
       for(const k of new Set(Object.values(S.where||{}).filter(Boolean)))if(countAt(k)!==t.rows.filter(r=>r.place===k).length)inv.map++;
       for(const v of rivals){if(!v.alive){if(R.P["v"+v.id])inv.dead++;continue}if(whereOf(v)!==R.P["v"+v.id][kh][0])inv.view++}}
      const key=w+"-"+bb+"-"+kh;for(const v of liveRivals(true)){const k=(S.where||{})[v.id];const id=v.id+"-"+bb+"-"+kh;if(hist[id]!=null&&w>0){ktot++;if(hist[id]===k)khit++;if(kh===0){tot++;if(hist[id]===k)hit++}}hist[id]=k}
      if(kh===0){const e=S.where.emp;if(emp[bb]!=null){etot++;if(emp[bb]===e)ehit++}emp[bb]=e}}}
    S.tuan++;if(S.tuan>2){S.tuan=0;S.turn++;S.month=S.month%12+1}}
   return{pred:hit/tot,predKh:khit/ktot,emp:ehit/etot,inv,gate:off?null:JSON.parse(JSON.stringify(J95.stat))}}
  for(const nb of [3,4]){for(const off of [1,0]){const L=[];for(let i=0;i<LIVES;i++)L.push(life(off,nb));
    const avg=f=>L.reduce((s,x)=>s+f(x),0)/L.length;out[(off?"old":"j95")+"_"+nb+"buoi"]={pred:+avg(x=>x.pred).toFixed(3),predKhac:+avg(x=>x.predKh).toFixed(3),emp:+avg(x=>x.emp).toFixed(3),inv:off?null:L.map(x=>x.inv).reduce((a,b)=>{for(const k in b)a[k]=(a[k]||0)+b[k];return a},{}),gate:off?null:L[L.length-1].gate}}}
  return out},[W,LIVES]);
 console.log(JSON.stringify(res,null,1));console.log('pageerrors',errs.length,errs.slice(0,5));await b.close()})();
