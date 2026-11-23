// Q: does a person-event frame at its MAX size cover the top bar and/or the 8-tab bar? Fold 755x1000 + iPad 1180x820
const {boot,settle,chromium}=require('./boot');const fs=require('fs');const OUT='/home/user/wt/mock-shots/q';fs.mkdirSync(OUT,{recursive:true});
const LONG='<p>Giữa giờ Thân, {N} một mình bước vào cung, sắc mặt nghiêm lại. Nàng bảo cung nữ lui ra ngoài rồi mới hạ giọng: hôm qua ở Ngự hoa viên, có kẻ thấy Lệ quý nhân lén gặp người của Thái y viện, trong tay áo giấu một gói thuốc bọc giấy dầu. Chuyện chưa ai dám nói ra, nhưng nếu đúng là thuốc hại thai thì cả hậu cung sắp có biến.</p><p>Nàng nói thêm, giọng run run: “Muội không biết nên tin ai. Tỷ tỷ là người có lòng, xin tỷ cho muội một lời.” Ngoài hiên gió thổi qua rèm, tiếng chuông đồng ở Càn Thanh cung vừa điểm.</p>';
(async()=>{const b=await chromium.launch();const out={};
 for(const [W,H,name] of [[755,1000,'fold'],[1180,820,'ipad']]){const {ctx,p}=await boot(b,W,H,2);
  for(const night of [0]){
  const r=await p.evaluate(({LONG,night})=>{const v=(typeof liveRivals==='function'?liveRivals(true):[]).find(x=>x.alive&&!x.out);
   if(night){try{S.buoi=3}catch(e){}} render();try{kmReset()}catch(e){}Q.length=0;
   Q.push({ev:1,t:'Có người đến',who:pv(v),h:LONG.replace('{N}',v.name),opts:[{n:'Khuyên nàng giữ kín, chờ chứng cứ',fx:{duc:1}},{n:'Cùng nàng đi báo Hoàng hậu ngay',fx:{danh:1}},{n:'Âm thầm sai người theo dõi Lệ quý nhân',fx:{}}]});showModal();return v.name},{LONG,night});
  await settle(p);await p.waitForTimeout(1500);
  const m=await p.evaluate(()=>{const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return {x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),b:Math.round(r.bottom)}};
   const M=document.getElementById('modal'),d=M&&M.querySelector('.dlg'),hud=document.querySelector('header.hud'),bar=document.querySelector('nav.bar');
   const hr=hud.getBoundingClientRect(),br=bar.getBoundingClientRect();
   // what is on top at points inside the bars
   const probe=(y)=>{const xs=[0.1,0.3,0.5,0.7,0.9].map(f=>Math.round(innerWidth*f));return xs.map(x=>{const e=document.elementFromPoint(x,y);return e?(hud.contains(e)?'HUD':bar.contains(e)?'BAR':(M.contains(e)?(d.contains(e)?'DLG':'VEIL'):e.tagName+'.'+(e.className||'').toString().slice(0,20))):'none'})};
   const cs=getComputedStyle(M);
   return {ksz:d&&d.dataset.ksz,dlg:R(d),modal:R(M),modalBg:cs.backgroundColor,modalZ:cs.zIndex,backdrop:cs.backdropFilter,hud:R(hud),bar:R(bar),hudZ:getComputedStyle(hud).zIndex,barZ:getComputedStyle(bar).zIndex,
     onHud:probe(Math.round(hr.top+hr.height/2)),onBar:probe(Math.round(br.top+br.height/2)),fig:R(d&&(d.querySelector('.kszfig .kszfs')||d.querySelector('.kszfig'))),title:(d&&d.querySelector('.kph')||{}).textContent}});
  m.who=r;out[name+(night?'-night':'')]=m;console.log(name,night?'night':'day',JSON.stringify(m));
  await p.screenshot({path:`${OUT}/q-${name}${night?'-night':''}.png`});
  await p.evaluate(()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true;try{kszLiveReset3&&kszLiveReset3()}catch(e){}});
  }
  if(p.errs.length)console.log('errors',p.errs.slice(0,5));await ctx.close()}
 fs.writeFileSync(OUT+'/q.json',JSON.stringify(out,null,1));await b.close()})();
