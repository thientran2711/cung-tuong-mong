const ADV=[/^Đã hiểu/,/^Tiếp ▸/,/^Tiếp theo$/,/^Tiếp$/,/^Tiếp tục$/,/^Đã rõ/,/^Hiểu rồi/,/^Xong/,/^Đồng ý/,/^Nhận/,/^Được$/,/^Ghi nhớ/,/^Đóng$/,/^Thôi$/,/^Vào cung/,/^Bỏ qua/,/^Tạ ơn/];
let ODDS=null;const S=global.__S||(global.__S={key:'',used:new Set(),tabTried:0,scrolls:0,buoi:0,noprog:0,noNext:0});
const CAT_PRI={'Nghỉ ngơi':2,'Y dược':3,'Học tập':4,'Lễ nghi':5,'Giao thiệp':6,'Mưu kế':99,'Lối riêng':99};
module.exports=async function(cs,{EXIT,page,log}){
 if(!ODDS)ODDS=await page.evaluate(()=>typeof KIT_ODDS!=='undefined'?KIT_ODDS.map(String):[]).catch(()=>[]);
 const ok=cs.filter(c=>!/kpopts/.test(c.cls)&&!EXIT.test(c.txt)&&!/^Xem đầy đủ/.test(c.txt));
 if(!ok.length&&cs.length)return {wait:1500};
 const rank=c=>{let r=-1;ODDS.forEach((w,i)=>{if(c.txt.toLowerCase().includes(w.toLowerCase()))r=Math.max(r,i)});return r};
 /* modal option cards: highest odds (cautious) */
 const opts=ok.filter(c=>(c.txt.match(/TỐN/g)||[]).length===1&&/ĐƯỢC/.test(c.txt)&&c.w>150&&!/kpopts/.test(c.cls));
 const mainScreen=ok.some(c=>c.id==='menu')&&(ok.some(c=>c.id==='next')||ok.some(c=>c.txt==='Về phòng')||ok.some(c=>c.txt==='Hành sự'&&c.cy>900))&&!ok.some(c=>/kopt|kfoc/.test(c.cls));
 if(!mainScreen){
  const ready=ok.find(c=>/^Sẵn sàng/.test(c.txt));
  if(ready){const skip=ok.find(c=>/^Bỏ qua/.test(c.txt));if(S.mgDecided!==ready.cx+','+ready.cy+S.buoi){S.mgDecided=ready.cx+','+ready.cy+S.buoi;S.mgSkip=Math.random()<.1;log('MG intro: '+(S.mgSkip?'SKIP (10%)':'PLAY'))}return (S.mgSkip&&skip)?skip:ready}
  for(const re of ADV.filter(r=>!/Bỏ qua/.test(String(r)))){const c=ok.find(c=>re.test(c.txt));if(c)return c}
  if(opts.length){let best=opts[0],br=rank(best);for(const c of opts){const r=rank(c);if(r>br){best=c;br=r}}
   if(best.cy>870)return {scroll:320};if(best.cy<150)return {scroll:-320};return best}
  {const b=ok.find(c=>/^Bỏ qua/.test(c.txt));if(b)return b}
  const real=ok.filter(c=>!/kpopts/.test(c.cls)&&c.txt&&c.txt!=='✕'&&!/^!$/.test(c.txt));
  if(real.length===1)return real[0];
  const x=ok.find(c=>c.txt==='✕');if(x)return x;
  if(!real.length){log('BLIND TAP (cinematic/tap-to-open)');return {cx:378,cy:500,txt:'blind-centre'}}
  return null}
 /* ---- main screen ---- */
 const hud=await page.evaluate(()=>{const t=s=>(document.querySelector(s)||{}).innerText||'';return {when:t('.k3time')+'|'+t('.me').replace(/\s+/g,' ').slice(-60)}});
 if(hud.when!==S.key){S.key=hud.when;S.used=new Set();S.tabTried=0;S.scrolls=0;S.noprog=0;S.buoi++;log('BUOI',S.buoi,hud.when)}
 const cards=ok.filter(c=>/\bcard\b/.test(c.cls)&&/kcard/.test(c.cls));
 const next=ok.find(c=>c.id==='next');
 const room=ok.find(c=>c.txt==='Về phòng');
 if(!next&&room)return room;
 if(!next&&S.noNext++>20){S.noNext=0;log('BUG-CAND main screen without enabled Sang buổi and no Về phòng')}
 if(!cards.length){
  if(S.tabTried++<1){const t=ok.find(c=>c.txt==='Hành sự');if(t)return t}
  if(!next){S.tabTried=0;return {wait:1200}}
  return next||{wait:1200}}
 const left=(cards[0].txt.match(/còn (\d+)/)||[])[1];
 if(left!=null&&+left<=0)return next||{wait:1200};
 /* acceptable: not used, no exit, not Mưu kế/Lối riêng, odds >= 'Có cơ' or none and without KÈM risk */
 const bac=await page.evaluate(()=>{const m=((document.querySelector('.kstg-res')||{}).innerText||'').match(/Bạc\s*(\d+)/);return m?+m[1]:999}).catch(()=>999);
 const cat=c=>{const m=Object.keys(CAT_PRI).find(k=>c.txt.startsWith(k));return m?CAT_PRI[m]:7};
 const good=cards.filter(c=>!S.used.has(c.txt)&&cat(c)<99&&(rank(c)<0||rank(c)>=4)&&!(/Bạc -(\d+)/.test(c.txt)&&(bac-(+c.txt.match(/Bạc -(\d+)/)[1])<60))).sort((a,b)=>cat(a)-cat(b));
 if(good.length){const c=good[0];S.used.add(c.txt);return c}
 if(S.scrolls++<5)return {scroll:420};
 return next||{wait:1200}}
