/* MẪU 1 «Bàn bài» — event = conversation + a HAND of cards (owner OD 24/11 ~15:15Z «kết hợp cả hai»).
   No event frame first: the kit scene (§93) opens straight into the animation — speaker walks in LEFT full body, her figure RIGHT (KIT §93.4 layout A),
   the speaker's line in the kit dialogue box (§93.3); her replies are DEALT as cards (picture + short name [+ kit odds meter]); tap = lift + details plate
   (the REAL kit option card: odds, Tốn, Được, Bại, Gợi ý) placed in the torso band (never over a face); tap again = choose → card to centre → normal result. */
window.M1=(function(){const {wait,R}=MD3;
/* the hand = the game's REAL act cards (names, pictures, Cần/Tốn/Được rows, odds meters — numbers from BAL via the game's act engine; nothing typed here, law 4) */
const OPTS=[];
let st=null;
async function setup(o){o=o||{};MD3.ensureCss();const n=o.n||5,plain=!!o.plain;const cards=MD3.acts(n,!plain);const list=cards.map(c=>[c.querySelector('.kan').textContent.replace(/^(Người lạ|Hoàng hậu)/,'').trim()]);await MD3.decodeAll(cards);
 const v=(liveRivals(true).filter(x=>x.alive&&!x.out)[0])||S;const bg=IMG_U('img/phi-tan-cung.webp')/* people-free scene painting (no painted heads: MAIN 127 FAIL 1) */;await MD3.preload([bg]);
 const Sc=kitScene.open({bg,intro:0});const L=Sc.L;MD3.sceneBright(L);L.style.opacity='0';
 const dummy=document.createElement('div');
 await Sc.pair({msgr:v,me:S,storyTitle:v.name,story:[`<div class="kpmain"><p>${o.line||'«Muội muội đến đúng lúc. Hôm nay muốn cùng ta làm việc gì?»'}</p></div>`],choiceTitle:S.name,choice:[dummy]});
 const cb=L.boxes.pop();cb.remove();const sb=L.boxes[0];
 const g=L.g,w=g.w,H=g.H,ip=document.documentElement.classList.contains('kv2');
 const F=MD3.faceBoxes(L),Lr=R(L);const faceBot=Math.max(...F.map(f=>f.b-Lr.top),R(sb).bottom-Lr.top);
 /* hand geometry: one row up to 6 cards, two rows for 7–10; ONE card size per hand (law 2/10) */
 /* hand geometry: as many per row as fit at the minimum card width (Fold 5–6, iPad 10), else two rows; ONE card size per hand (law 2/10) */
 const gap=ip?10:7,pad=ip?18:8,maxW=ip?150:128,minW=ip?96:92,AR=(!plain&&o.odds!==false)?1.62:1.5;const showOdds=AR>1.55;
 const fitRow=Math.max(1,Math.floor((w-2*pad+gap)/(minW+gap)));const rows=n<=fitRow?1:2,per=Math.ceil(n/rows);
 let cw=Math.min(maxW,(w-2*pad-(per-1)*gap)/per);let ch=Math.round(cw*AR);
 const PB=ip?118:142;/* plate height (measured) */const capCh=rows===1?(H-14-faceBot-12-PB)/1.27:1e9;if(ch>capCh){ch=Math.floor(capCh);cw=Math.min(cw,ch/AR)}
 const maxHandH=H-faceBot-14;if(rows*ch+(rows-1)*gap+14>maxHandH){ch=Math.floor((maxHandH-14-(rows-1)*gap)/rows);cw=Math.min(cw,ch/AR)}
 const slots=[];for(let i=0;i<n;i++){const r=Math.floor(i/per),k=i%per,inRow=r<rows-1?per:n-per*(rows-1);const rowW=inRow*cw+(inRow-1)*gap;const x=(w-rowW)/2+k*(cw+gap);
  const mid=(inRow-1)/2,d=k-mid;const rot=rows===1?d*Math.min(2.2,10/Math.max(1,mid)):d*1.4;const y=r*(ch+gap)+d*d*(rows===1?Math.min(2.2,12/Math.max(1,mid*mid)):1);slots.push({x,y,rot})}
 const handH=rows*ch+(rows-1)*gap+14;const hand=document.createElement('div');hand.className='md3-hand';hand.style.height=handH+'px';L.appendChild(hand);
 const els=list.map(([nm],i)=>{const c=document.createElement('div');c.className='md3-card'+(plain?' md3-plain':'');c.style.cssText=`left:${slots[i].x}px;top:${slots[i].y}px;width:${cw}px;height:${ch}px;opacity:0`;
  const p=document.createElement('div');p.className='dlg kpanel kscn-box md3-face';const art=plain?null:cards[i].querySelector('.ksart');const a2=art?art.cloneNode(true):document.createElement('div');if(plain){a2.className='md3-plainart'}
  const nmE=document.createElement('span');nmE.className='kan';nmE.textContent=nm;c.style.setProperty('--md3fs',(cw<100?11.5:13)+'px');p.appendChild(a2);p.appendChild(nmE);
  if(showOdds){const od=cards[i].querySelector('.kodm');if(od)p.appendChild(od.cloneNode(true))}
  const gl=document.createElement('div');gl.className='md3-glow';const bk=document.createElement('div');bk.className='md3-back';c.appendChild(gl);c.appendChild(p);c.appendChild(bk);hand.appendChild(c);
  c.addEventListener('click',e=>{e.stopPropagation();if(st.busy)return;if(st.lift===i)choose(i);else lift(i)});return {c,p,gl,bk}});
 els.forEach(E=>{const od=E.p.querySelector('.kodm');if(!od)return;od.style.transform='none';const nw=od.scrollWidth,av=cw-12;od.style.transform=`scale(${Math.min(.86,av/nw).toFixed(3)})`;});
 /* details plate = kit dialog box holding the REAL kit option card + kit «Gợi ý» row; band between the faces and the hand */
 const handTop=H-handH;st={Sc,L,sb,els,slots,cards,list,hand,cw,ch,handTop,faceBot,w,H,ip,rows,per,lift:-1,plate:null,busy:0,plain,o};
 return {n,rows,cw:Math.round(cw),ch,handTop,faceBot:Math.round(faceBot),H,w}}
/* ENTRY: layer fades in, speaker walks in from the left, she slides in from the right, the line box drops in; cards dealt from the right edge, flipped */
async function enter(){const {L,sb,els,slots,w}=st;const f=L.figs;const T=(e,k,o)=>e.animate(k,Object.assign({fill:'both',easing:'cubic-bezier(.2,.8,.3,1)'},o));
 /* ONE opaque kit screen veil: old screen covered → scene swapped in (L opaque from its first frame, figures placed OFF-stage by transform) → veil slides away → people walk in by transform only (opacity 1 always) */
 f[0].style.transform='translateX(-38%) scale(.94)';f[1].style.transform='translateX(30%)';sb.style.visibility='hidden';
 await MD3.cover(async()=>{L.style.opacity='1'});
 T(L.querySelector('.kscn-bg'),[{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:900});
 f[0].style.transform='';f[1].style.transform='';
 T(f[0],[{transform:'translateX(-38%) scale(.94)'},{transform:'none'}],{duration:700});
 T(f[1],[{transform:'translateX(30%)'},{transform:'none'}],{duration:600,delay:260});
 await wait(620);sb.style.visibility='';T(sb,[{transform:'translateY(-14px)'},{transform:'none'}],{duration:300});
 await wait(420);await deal()}
async function deal(){const {els,slots,w,hand}=st;const hr=R(hand);const T=(e,k,o)=>e.animate(k,Object.assign({fill:'both'},o));let last;
 els.forEach((E,i)=>{const s=slots[i];const sx=w+20-s.x,sy=-40-s.y;E.c.style.opacity='';
  last=T(E.c,[{transform:`translate(${sx}px,${sy}px) rotate(14deg) scale(.7)`,opacity:0},{transform:`translate(${sx*.15}px,${sy*.1}px) rotate(${s.rot+4}deg)`,opacity:1,offset:.75},{transform:`rotate(${s.rot}deg)`,opacity:1}],{duration:460,delay:i*90,easing:'cubic-bezier(.25,.8,.3,1)'});
  T(E.bk,[{opacity:1,transform:'scaleX(1)'},{opacity:1,transform:'scaleX(0)'}],{duration:170,delay:i*90+380,easing:'ease-in'});
  T(E.p,[{transform:'scaleX(0)'},{transform:'scaleX(0)',offset:.5},{transform:'scaleX(1)'}],{duration:340,delay:i*90+380,easing:'ease-out'})});
 await wait(els.length*90+760)}
function rest(i,a){const s=st.slots[i];return `rotate(${s.rot}deg)`}
function plateFor(i){const {L,cards,list,w,H,ip,handTop,faceBot,rows,slots,ch}=st;if(st.plate){const old=st.plate;old.remove();L.boxes=L.boxes.filter(b=>b!==old)}/* ONE detail box at a time: the old one is gone before the new one shows (no cross-fade, no ghost) */
 /* the REAL kit option card (title row + odds meter + Tốn/Được/Bại + kit «Gợi ý» row); its picture is already on the lifted card, so the plate drops it (one plate form for every hand) */
 const card=cards[i].cloneNode(true);card.querySelectorAll('.kaart').forEach(e=>e.remove());
 const pw=Math.min(ip?520:w-16,w-16);const box=kitDlgBox(L,'',[card],{x:0,y:0,w:pw},null,{kind:'choice',noSeal:true});box.classList.add('md3-plate');box.querySelectorAll('.kph').forEach(e=>e.remove());
 const bh=R(box).height,lift=ch*.2;const s=slots[i];let x=Math.round(Math.max(8,Math.min(w-pw-8,s.x+st.cw/2-pw/2))),y;
 if(rows===1){y=Math.round(handTop-lift-ch*.07-bh-8)}
 else{const r=Math.floor(i/st.per);const rowTop=handTop+(r===0?ch+7:0);y=Math.round(rowTop+(ch-bh)/2+(r===0?lift*.5:-lift*.5))}
 /* obstacles = faces + the speaker's line box, in layer coords; slide the plate sideways off a face column when there is room (iPad), then keep it under what it still overlaps */
 const Lr=R(L);const obs=MD3.faceBoxes(L).map(f=>({l:f.l-Lr.left,r:f.r-Lr.left,b:f.b-Lr.top})).concat([(r=>({l:r.left-Lr.left,r:r.right-Lr.left,b:r.bottom-Lr.top}))(R(st.sb))]);
 const faces=obs.slice(0,-1);const cand=[x];faces.forEach(f=>{cand.push(Math.round(f.r+8),Math.round(f.l-8-pw))});
 const ok=c=>c>=8&&c+pw<=w-8;const cost=c=>faces.filter(f=>!(c+pw<=f.l||c>=f.r)).length*1e4+Math.abs(c-x);
 x=cand.filter(ok).sort((a,b)=>cost(a)-cost(b))[0];if(x==null)x=Math.round((w-pw)/2);
 const minY=Math.max(0,...obs.filter(o=>!(x+pw<=o.l||x>=o.r)).map(o=>o.b))+6;
 y=Math.max(Math.round(minY),Math.min(H-bh-4,y));box.style.left=x+'px';box.style.top=y+'px';
 box.style.opacity='1';box.animate([{transform:'translateY(8px)'},{transform:'none'}],{duration:160,easing:'ease-out'});/* opaque from the first frame (transform only) */st.plate=box;return box}
async function lift(i){const {els}=st;const prev=st.lift;st.lift=i;
 els.forEach((E,k)=>{const s=st.slots[k];const on=k===i;const was=k===prev;
  if(on){E.c.style.zIndex=5;E.c.animate([{transform:rest(k)},{transform:`translateY(-${st.ch*.2}px) scale(1.07)`}],{duration:220,easing:'cubic-bezier(.3,1.4,.5,1)',fill:'both'});E.gl.animate([{opacity:0},{opacity:1}],{duration:200,fill:'both'});E.c.animate([{opacity:E.c.__o||1},{opacity:1}],{duration:160,fill:'both'});E.c.__o=1}
  else{if(was){E.c.style.zIndex='';E.c.animate([{transform:`translateY(-${st.ch*.2}px) scale(1.07)`},{transform:rest(k)}],{duration:200,easing:'ease-out',fill:'both'});E.gl.animate([{opacity:1},{opacity:0}],{duration:160,fill:'both'})}
   if((E.c.__o||1)!==.86){E.c.animate([{opacity:E.c.__o||1},{opacity:0.86}],{duration:160,fill:'both'});E.c.__o=0.86}}});
 plateFor(i);await wait(240)}
async function choose(i){st.busy=1;const {els,L,w,H}=st;const E=els[i];const cr=R(E.c),lr=R(L);const dx=lr.left+w/2-(cr.left+cr.width/2),dy=lr.top+H*.42-(cr.top+cr.height/2);
 E.c.animate([{transform:`translateY(-${st.ch*.2}px) scale(1.07)`},{transform:`translate(${dx}px,${dy}px) scale(1.45)`}],{duration:420,easing:'cubic-bezier(.3,.9,.3,1)',fill:'both'});
 els.forEach((x,k)=>{if(k!==i)x.c.animate([{opacity:0.86,transform:rest(k)},{opacity:0,transform:`translateY(${st.ch*.9}px) ${rest(k)}`}],{duration:380,delay:Math.abs(k-i)*40,easing:'cubic-bezier(.5,0,.9,.4)',fill:'both'})});
 if(st.plate)st.plate.animate([{opacity:1},{opacity:0}],{duration:200,fill:'both'});
 await wait(700);E.c.animate([{opacity:1,transform:`translate(${dx}px,${dy}px) scale(1.45)`},{opacity:0,transform:`translate(${dx}px,${dy-30}px) scale(1.6)`}],{duration:260,fill:'both'});await wait(200);
 await MD3.cover(async()=>{kitScene.close(true);try{render()}catch(e){}await M4.settleStage(12000)});/* the veil stays until every stage person is a solid painted portrait (never the game's see-through breathing silhouette) */st.busy=0;return i}
function check(){const {L,sb,els}=st;return MD3.faceCheck(L,[sb,st.plate,...els.map(e=>e.c)])}
return {setup,enter,deal,lift,choose,check,get st(){return st},OPTS}})();
