/* MẪU 4 — result card arrives, deltas TRAVEL to their cell in the real top bar, item flies to the real Tư trang tab. Real game: real act result (resultShow), real HUD cells (.kst), real kitFlyItem, real seal (j93). New: card-back flip-away + orb flight + cell pulse. */
window.MOCK=async()=>{const {A,at,E,ctr,cell,wait}=TL;
 const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
 const NAME={'Sủng':'Sủng','Danh':'Danh','Sức':'Sức','Bạc':'Bạc','Đức':'Đức','Sắc':'Sắc','Tài':'Tài','Tâm cơ':'Tâm cơ'};
 const cap=E('div','','',document.body);cap.style.cssText='position:fixed;left:50%;top:172px;transform:translateX(-50%);z-index:100000;background:rgba(40,16,12,.78);color:#fff;border-radius:999px;padding:5px 16px;font:600 12.5px/1.2 sans-serif;white-space:nowrap;pointer-events:none;opacity:0';
 cap.textContent='Mẫu 4a · Thành — số được–mất bay về đúng ô; món nhận bay vào tab Tư trang';
 A(cap,[{opacity:0},{opacity:1,offset:.1},{opacity:1,offset:.92},{opacity:0}],{at:100,dur:6000,ease:'linear'});
 const cap2=E('div','','',document.body);cap2.style.cssText=cap.style.cssText;cap2.textContent='Mẫu 4b · Bại — ô tụt xuống, đồng bạc rời túi';
 A(cap2,[{opacity:0},{opacity:1,offset:.1},{opacity:1,offset:.92},{opacity:0}],{at:6600,dur:5200,ease:'linear'});
 const orb=(p,col,sz=16)=>{const o=E('div','',null,document.body);o.style.cssText=`position:fixed;left:${p[0]-sz/2}px;top:${p[1]-sz/2}px;width:${sz}px;height:${sz}px;border-radius:50%;background:radial-gradient(#fff,${col} 55%,transparent 72%);box-shadow:0 0 14px 4px ${col};opacity:0;z-index:99990;pointer-events:none`;return o};
 const fly=(from,to,col,t,lift=80)=>{[0,1,2,3].forEach(j=>{const o=orb(from,col,16-j*3),dx=to[0]-from[0],dy=to[1]-from[1];A(o,[{opacity:0,transform:'translate(0,0) scale(.6)'},{opacity:1-j*.18,transform:`translate(${dx*.35}px,${dy*.3-lift}px) scale(1.1)`,offset:.4},{opacity:1-j*.18,transform:`translate(${dx*.8}px,${dy*.85}px) scale(.9)`,offset:.85},{opacity:0,transform:`translate(${dx}px,${dy}px) scale(.5)`}],{at:t+j*55,dur:760,ease:'cubic-bezier(.45,0,.3,1)'})})};
 const ring=(p,col,t)=>{const r=E('div','',null,document.body);r.style.cssText=`position:fixed;left:${p[0]-18}px;top:${p[1]-18}px;width:36px;height:36px;border-radius:50%;border:3px solid ${col};opacity:0;z-index:99991;pointer-events:none`;A(r,[{opacity:.95,transform:'scale(.4)'},{opacity:0,transform:'scale(2.6)'}],{at:t,dur:560,ease:'ease-out'})};
 const pulse=(el,t,col)=>{A(el,[{transform:'scale(1)'},{transform:'scale(1.3)',offset:.35},{transform:'scale(1)'}],{at:t,dur:520})};
 const back=(rect,t)=>{const d=E('div','',null,document.body);d.style.cssText=`position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;border-radius:12px;background:url(${CDN}kit/card-back.webp) center/cover;box-shadow:0 6px 16px rgba(50,15,8,.4);z-index:99980;opacity:0;pointer-events:none`;
  A(d,[{opacity:1,transform:'rotateY(0deg)'},{opacity:1,transform:'rotateY(70deg) scaleX(.9)',offset:.8},{opacity:0,transform:'rotateY(90deg)'}],{at:t,dur:520,ease:'cubic-bezier(.5,0,.2,1)'})};
 const result=(ok,title,mut)=>{const b=rsnap();mut();log('Thái hậu nhấp một ngụm trà.');resultShow(title,b,ok);return document.getElementById('rtoast')};
 const chips=()=>[...document.querySelectorAll('#rtoast .rd .ef')];
 const nm=t=>Object.keys(NAME).find(k=>t.startsWith(k+' ')||t.startsWith(k));
 { const b0=rsnap();S.sung+=1;resultShow('.',b0,true);await wait(1800);const t0=document.getElementById('rtoast');if(t0)t0.classList.remove('on');await wait(600)}
 // ---- 4a THÀNH ----
 at(500,()=>{const t=result(true,'Dâng trà hầu Thái hậu',()=>{S.sung+=3;S.danh+=3;S.bac-=10;S.suc-=5});const r=t.getBoundingClientRect();back(r,TL.now());});
 at(1900,()=>{const N=TL.now();chips().forEach((c,i)=>{const n=nm(c.textContent.trim()),ce=n&&cell(n);if(!ce)return;const bad=c.classList.contains('r');const a=ctr(c),z=ctr(ce);const col=bad?'#d94a3a':'#ffd36b';
   if(bad){fly(z,a,col,N+i*140,40)}else{fly(a,z,col,N+i*140,70)}
   setTimeout(()=>{ce.animate([{transform:'scale(1)'},{transform:'scale(1.3)'},{transform:'scale(1)'}],{duration:520});ring(ctr(ce),col,TL.now());},i*140+700);});
   try{kitFlyItem('ngocboi')}catch(e){console.error(e)}});
 at(2100,()=>{try{S.inv.push({k:'ngocboi'});}catch(e){}});
 // ---- 4b BẠI ----
 at(6800,()=>{const t=result(false,'Dâng trà hầu Thái hậu',()=>{S.suc-=8;S.danh-=3});});
 at(8200,()=>{const N=TL.now();chips().forEach((c,i)=>{const n=nm(c.textContent.trim()),ce=n&&cell(n);if(!ce)return;const a=ctr(c),z=ctr(ce);fly(a,z,'#d94a3a',N+i*140,40);setTimeout(()=>ce.animate([{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(-3px)'},{transform:'translateX(0)'}],{duration:420}),i*140+700)})});
 return 11500};
