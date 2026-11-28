/* gift-dead-scan (live-bugs-2711, law 11 family scan for «Biếu quà làm lành: 326 items, every confirm disabled» F s16c 27/11 03:12Z, s2f 686 / s14 794):
   on a long-life save, open EVERY item pick dialog (KIT 28.13i family: giftpick «Tặng quà», giftto «Dâng quà», plantpick «Cài đồ», tsgiftpick
   «Biếu quà làm lành» it / wk / old save) and count the item tiles she is shown vs the ones she can really pick (no lock, no tsDis, no unmet Cần,
   bạc enough). A dialog that lists pieces she can NEVER pick here (dead tiles) FAILS (law 6c: only what she owns and can give is offered;
   law 3: no road that only shows cost). usage: node dev/test/gift-dead-scan.js <save.json> [root]   exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path');
(async()=>{const save=process.argv[2];const root=process.argv[3]||path.resolve(__dirname,'../..');if(!save){console.log('usage: gift-dead-scan.js <save.json> [root]');process.exit(2)}
 const srv=await D.serveRoot(root);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'ipadAir');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
 const R=await g.evaluate(t=>{const out=[];try{localStorage.setItem(SK(3),t);SLOT=3;const d=loadSlot(3);quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;Q.length=0}catch(e){return[{err:String(e)}]}
  const V=rivals.filter(x=>x.alive!==false&&!x.out).sort((a,b)=>oan(b,S)-oan(a,S))[0];
  const can=c=>!(c.lock||c.tsDis||c.off||(c.need&&c.need.some(n=>n&&!n.ok))||(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)||(typeof c.lk==="function"&&c.lk()));
  const one=(name,pid,pp)=>{try{const d=PEND[pid]&&PEND[pid](pp);if(!d||!d.o){out.push({name,shown:0,can:0,dead:0,note:d&&d.t?"no list":"null"});return}
   const T=d.o.filter(o=>o&&o.ik!=null);const c=T.filter(can).length;out.push({name,shown:T.length,can:c,dead:T.length-c,body:String(d.t||"").replace(/<[^>]+>/g,"").slice(0,160)})}catch(e){out.push({name,err:String(e).slice(0,160)})}};
  one("Tặng quà (giftpick, to "+V.name+")","giftpick",{v:V.id});
  one("Dâng quà Hoàng thượng (giftto)","giftto",{t:"emp"});one("Dâng quà Thái hậu (giftto)","giftto",{t:"th"});
  one("Cài đồ vào rương (plantpick)","plantpick",{v:V.id});
  one("Biếu quà làm lành · đồ (tsgiftpick it)","tsgiftpick",{v:V.id,k:"it"});one("Biếu quà làm lành · tác phẩm (tsgiftpick wk)","tsgiftpick",{v:V.id,k:"wk"});
  one("Biếu quà làm lành · cả hai (old save)","tsgiftpick",{v:V.id});
  return [{inv:S.inv.length,bac:S.bac,v:V.name}].concat(out)},fs.readFileSync(save,'utf8'));
 console.log(JSON.stringify(R[0]));console.log('| picker | tiles shown | can pick | dead tiles |');console.log('|---|---|---|---|');let bad=0;
 for(const x of R.slice(1)){console.log(`| ${x.name} | ${x.shown??x.err} | ${x.can??''} | ${x.dead??''} |`);if(x.dead>0)bad++}
 for(const x of R.slice(1))if(/Biếu quà/.test(x.name))console.log('  body:',x.name,'→',x.body);
 if(errs.length){console.log('page errors',errs);bad++}
 console.log(bad?`FAIL: ${bad} picker(s) list pieces she can never give there`:'PASS: no dead tile in any item pick dialog');await b.close();srv.close();process.exit(bad?1:0)})();
