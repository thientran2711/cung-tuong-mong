/* kit-size9-chip.js — grade chip ON the frame edge (KIT §54.1b): renders kitItem at slot / md / lg / xl x every grade, with Xa xỉ, qty, worn band, Ngự seal, "đã tẩm" mark and a name line;
   measures: chip centre on the frame's bottom edge, chip inside the frame width, chip vs Xa xỉ box / Ngự seal / qty / worn band overlap, name line clear of the chip.
   usage: node dev/test/kit-size9-chip.js <url> [out.png outside the repo] */
const {chromium}=require('playwright');const [,,URL,OUT='-']=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1400,height:760},deviceScaleFactor:2,serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL+'?khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitItem==='function'&&typeof kitGradeChip==='function',null,{timeout:90000});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const h=document.createElement('div');h.id='c9';h.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#f4ead6;padding:14px;width:1300px;font-family:sans-serif';document.body.appendChild(h);
  const W={slot:58,md:72,lg:104,xl:150};const src='img/item/tramngoc.webp';let rows='';
  const variants=[['plain',{}],['lux+qty',{lux:33,qty:3}],['worn+mark+lux',{on:true,mark:['đã tẩm','r'],lux:12}]];
  for(const [vn,vo] of variants){rows+=`<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:16px;flex-wrap:wrap"><div style="width:90px;font-size:11px">${vn}</div>`;
   for(const sz of ['slot','md','lg','xl'])for(const g of [0,1,2,3,4])rows+=`<div class="cell" data-sz="${sz}" data-g="${g}" data-v="${vn}" style="width:${W[sz]}px;flex:none">${kitItem(Object.assign({src,name:sz==='slot'?'':'Trâm ngọc',grade:g,size:sz,frame:true},vo))}</div>`;rows+='</div>'}
  rows+=`<div style="display:flex;gap:10px"><div style="width:90px;font-size:11px">no grade</div>${['slot','md','lg','xl'].map(sz=>`<div class="ng" style="width:${W[sz]}px;flex:none">${kitItem({src,name:'Công thức',size:sz,frame:true})}</div>`).join('')}</div>`;h.innerHTML=rows;const out=[];const rr=e=>e&&e.getBoundingClientRect();const ov=(a,c)=>a&&c&&!(a.right<=c.left||c.right<=a.left||a.bottom<=c.top||c.bottom<=a.top);
  h.querySelectorAll('.cell').forEach(c=>{const it=c.querySelector('.kitem'),f=rr(it.querySelector('.kitb')),ch=rr(it.querySelector('.kgchip-fr')),n=rr(it.querySelector('.kitn')),x=rr(it.querySelector('.kitx')),s=rr(it.querySelector('.kits')),q=rr(it.querySelector('.kitq')),on=rr(it.querySelector('.kiton')),m=rr(it.querySelector('.kitm'));
   out.push({sz:c.dataset.sz,g:+c.dataset.g,v:c.dataset.v,frame:Math.round(f.width),chipW:ch?+(ch.width/f.width).toFixed(2):null,chipH:ch?Math.round(ch.height*10)/10:null,font:ch?parseFloat(getComputedStyle(it.querySelector('.kgchip-fr')).fontSize):null,
    edge:ch?+(((ch.top+ch.bottom)/2)-f.bottom).toFixed(1):null,inside:ch?(ch.left>=f.left-1&&ch.right<=f.right+1):null,
    hitLux:ov(ch,x),hitSeal:ov(ch,s),hitQty:ov(ch,q),hitOn:ov(ch,on),hitMark:ov(ch,m),sealLux:ov(s,x),markLux:ov(m,x),markSeal:ov(m,s),nameClear:n&&ch?ch.bottom<=n.top+.5:null,oldKitg:!!it.querySelector('.kitg')})});
  const ng=[...h.querySelectorAll('.ng')].map(c=>c.querySelectorAll('.kgchip').length);out.push({sz:'noGrade',g:-1,v:'noGrade',frame:100,chipW:0,inside:true,oldKitg:ng.some(x=>x>0),edge:0});return out});
 const bad=R.filter(r=>r.chipW==null||!r.inside||r.hitLux||r.hitSeal||r.hitQty||r.hitOn||r.hitMark||r.sealLux||r.markLux||r.markSeal||r.nameClear===false||r.oldKitg||Math.abs(r.edge)>1);
 console.log('cells',R.length,'bad',bad.length);console.log(JSON.stringify(bad.slice(0,12)));
 const sm={};R.forEach(r=>{const k=r.sz;sm[k]=sm[k]||{frame:r.frame,font:r.font,chipH:r.chipH,maxChipW:0};sm[k].maxChipW=Math.max(sm[k].maxChipW,r.chipW)});console.log(JSON.stringify(sm));
 if(OUT!=='-')await p.locator('#c9').screenshot({path:OUT});console.log('errs',errs.length,errs.slice(0,3));await b.close()})();
