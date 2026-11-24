/* MẪU 5 — Chia bài đầu buổi, on the REAL Hành sự list (real .kart act cards, real deal(), real act()). Rows stay rows (law 10). New: pile + deal/flip + FLIP re-flow + 'đã làm' pile. */
window.MOCK=async()=>{const {A,at,E,ctr,wait}=TL;const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';const W=innerWidth,H=innerHeight,LAND=W>H;
 document.querySelector('#tabs [data-tab="act"]').click();await wait(900);
 const cap=E('div','','Mẫu 5 · Chia bài đầu buổi — việc chia ra từ bộ bài; làm xong, thẻ bay vào chồng «đã làm», các thẻ còn lại dồn lên',document.body);cap.style.cssText='position:fixed;left:50%;top:172px;transform:translateX(-50%);z-index:100000;background:rgba(40,16,12,.78);color:#fff;border-radius:999px;padding:5px 16px;font:600 12.5px/1.2 sans-serif;white-space:nowrap;pointer-events:none;opacity:0';
 A(cap,[{opacity:0},{opacity:1,offset:.08},{opacity:1,offset:.95},{opacity:0}],{at:100,dur:9500,ease:'linear'});
 const dyn=(el,kf,o={})=>A(el,kf,Object.assign({},o,{at:TL.now()+(o.dt||0)}));
 const vis=()=>[...document.querySelectorAll('#panel .kart')].filter(e=>{const r=e.getBoundingClientRect();return r.width>40&&r.height>20&&r.bottom>150&&r.top<H-80});
 let pileEls=[],donePos;
 const px=W-70,py=H-190;      // pile bottom-right above the tab bar
 const mkBack=(w,h,l,t,z=99000)=>{const d=E('div','',null,document.body);d.style.cssText=`position:fixed;width:${w}px;height:${h}px;left:${l}px;top:${t}px;border-radius:10px;background:url(${CDN}kit/card-back.webp) center/cover;box-shadow:0 5px 12px rgba(50,15,8,.4);z-index:${z};pointer-events:none;opacity:0`;return d};
 // 400: new buổi → real deal + real render; the real cards are dealt from the pile
 at(400,()=>{used=0;S.buoi=0;deal();render();setTimeout(()=>{const cs=vis().slice(0,5);
   for(let i=0;i<3;i++){const p=mkBack(54,76,px-i*3,py-i*3);pileEls.push(p);dyn(p,[{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'rotate(-3deg)'}],{dur:380,dt:i*70})}
   cs.forEach((c,i)=>{const r=c.getBoundingClientRect();const dx=px+27-(r.left+r.width/2),dy=py+38-(r.top+r.height/2);
    const bk=mkBack(r.width,r.height,r.left,r.top);
    dyn(c,[{opacity:0,transform:`translate(${dx}px,${dy}px) scale(.18) rotate(-8deg)`},{opacity:0,transform:`translate(${dx*.4}px,${dy*.4-30}px) scale(.6) rotate(3deg)`,offset:.55},{opacity:1,transform:'none'}],{dur:900,dt:600+i*260,ease:'cubic-bezier(.22,.9,.28,1)'});
    dyn(bk,[{opacity:1,transform:`translate(${dx}px,${dy}px) scale(.18) rotate(-8deg)`},{opacity:1,transform:`translate(${dx*.4}px,${dy*.4-30}px) scale(.6) rotate(3deg)`,offset:.55},{opacity:1,transform:'none',offset:.75},{opacity:0,transform:'perspective(700px) rotateY(80deg)'}],{dur:1050,dt:600+i*260,ease:'cubic-bezier(.22,.9,.28,1)'});});
   },80)});
 at(3500,()=>pileEls.forEach((p,i)=>dyn(p,[{opacity:1},{opacity:.0}],{dur:500,dt:i*60})));
 // 4400: she does the 3rd card: REAL act → the real card goes, the rest re-flow (FLIP)
 at(4400,()=>{const cs=vis();const c=cs[2]||cs[0];const r0=cs.map(e=>({e,top:e.getBoundingClientRect().top}));const key=c.dataset.i;
   const glow=c.animate([{boxShadow:'0 0 0 0 rgba(255,214,120,0)'},{boxShadow:'0 0 26px 8px rgba(255,214,120,.9)'}],{duration:350,fill:'forwards'});
   setTimeout(()=>{const rr=c.getBoundingClientRect();const fly=c.cloneNode(true);fly.style.cssText+=`;position:fixed;left:${rr.left}px;top:${rr.top}px;width:${rr.width}px;height:${rr.height}px;z-index:99000;margin:0;pointer-events:none`;document.body.appendChild(fly);
    const dest=[W-60,H-170];const dx=dest[0]-(rr.left+rr.width/2),dy=dest[1]-(rr.top+rr.height/2);
    dyn(fly,[{opacity:1,transform:'none'},{opacity:1,transform:`translate(${dx*.5}px,${dy*.4}px) scale(.55) rotate(5deg)`,offset:.55},{opacity:0,transform:`translate(${dx}px,${dy}px) scale(.12) rotate(10deg)`}],{dur:760,ease:'cubic-bezier(.5,0,.3,1)'});
    const done=mkBack(48,68,W-84,H-204,98000);dyn(done,[{opacity:0},{opacity:1}],{dur:300,dt:300});done.style.filter='grayscale(.6) brightness(.85)';
    const lab=E('div','','đã làm',document.body);lab.style.cssText=`position:fixed;left:${W-100}px;top:${H-132}px;width:80px;text-align:center;font:600 11px sans-serif;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7);z-index:98000;opacity:0;pointer-events:none`;dyn(lab,[{opacity:0},{opacity:1}],{dur:300,dt:300});
    act(+key);
    setTimeout(()=>{const after=vis();after.forEach(e=>{const o=r0.find(x=>x.e===e);const n=e.getBoundingClientRect().top;const d=o?o.top-n:0;if(Math.abs(d)>2)dyn(e,[{transform:`translateY(${d}px)`},{transform:'none'}],{dur:520,ease:'cubic-bezier(.22,.9,.28,1)'})})},120);
   },380)});
 return 9200};
