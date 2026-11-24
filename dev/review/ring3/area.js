/* KAR — RING-DESIGN-2 mock «KHU VƯỜN» (areas) injected into the REAL built game (host mode). Design only, never for main.
   People = the real j95 record of one buổi at Ngự hoa viên (names, plans, master→thân tín links, known/stranger rule).
   Kit parts only: figures = the stage's own pictures (j59 stand-in / .j59sil stranger), plaque = j59tagHTML, caption = .kchip,
   area switch = .pctabs/.pct (kitFocus head tabs), picker buttons = kitFocus .kfoc-b markup (btnHTML copy), bubble = kitMoodSay.
   Motion = WAAPI transform/opacity only (compositor); dimming = cross-fade to a pre-filtered copy (no animated filter). */
window.KAR=(function(){
const st=document.getElementById('stage');
const A=(window.BAL&&BAL.area)||{};const wait=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const kv=()=>document.documentElement.classList.contains('kv2')?'kv2':'kv1';
let L=null,BG=null,TABS=null,G=[],AREAS=[],cur=0,fh=420,D=null,sel=null,selM=null,PK=null,anims=[];
function an(el,kf,o){const a=el.animate(kf,Object.assign({fill:'forwards',easing:'cubic-bezier(.2,.7,.2,1)'},o));anims.push(a);return a}
function geo(){const r=st.getBoundingClientRect();const q=s=>{const e=document.querySelector(s);if(!e||getComputedStyle(e).display==='none'||!e.getBoundingClientRect().width)return null;const b=e.getBoundingClientRect();return {l:b.left-r.left,r:b.right-r.left}};
 const rl=q('#krail'),cl=q('.kshR');return {W:r.width,H:r.height,x0:(rl?rl.r:6)+6,x1:(cl?cl.l:r.width-6)-6,feet:r.height*(A.feet||.9)}}
function css(){if(document.getElementById('kar-css'))return;const c=document.createElement('style');c.id='kar-css';c.textContent=`
html.karon #tokens,html.karon #mefig,html.karon #j59metag,html.karon .j59more,html.karon .kspet,html.karon #tokens .tok{visibility:hidden!important}
html.kv1.karon .kshR{display:none!important}
#kar{position:absolute;inset:0;z-index:1;overflow:hidden;contain:layout paint}
#kar .kar-bg{position:absolute;left:0;top:0;background-size:100% 100%;will-change:transform;z-index:0}
#kar .kar-f{position:absolute;left:0;top:0;transform-origin:50% 100%;will-change:transform,opacity;cursor:pointer}
#kar .kar-f img{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}
#kar .kar-f img.d{filter:brightness(.52) saturate(.55)}#kar .kar-f img.l{will-change:opacity}
#kar .kar-tag{position:absolute;left:50%;top:100%;transform:translateX(-50%);margin-top:2px;white-space:nowrap;z-index:2}
#kar .kar-cap{position:absolute;transform:translate(-50%,-100%);white-space:nowrap;z-index:40;pointer-events:none}
#kar .kar-cap .kchip{font-size:14px;padding:4px 11px;box-shadow:0 2px 8px #0005}
#kar .kar-tabs{position:absolute;top:6px;z-index:45;display:flex;gap:4px;justify-content:center}
#kar .kar-tabs .pct{white-space:nowrap;font-size:12.5px;padding:3px 8px}
#kar .kar-pk{position:absolute;z-index:60;--kfh:64px}#kar.kv2 .kar-pk{--kfh:72px}
#kar .kar-pk .kfoc-b{position:absolute;will-change:transform,opacity}
#kar .kar-pk .kfoc-b.kar-sq{width:var(--kfh);height:auto;min-height:0;flex-direction:column;padding:4px 2px 5px;gap:3px;text-align:center}
#kar .kar-pk .kfoc-b.kar-sq .kfoc-t b{font-size:12px;line-height:1.1;-webkit-line-clamp:2}
#kar .kar-pk .kfoc-b.kar-sq .kfoc-t small,#kar .kar-pk .kfoc-b.kar-min .kfoc-t small{display:none}
#kar .kar-pk .kfoc-b.kar-up .kfoc-t small{display:block}
#kar .kar-pk .kar-info{position:absolute;transform:translate(-50%,-100%);white-space:nowrap;z-index:3}
#kar .kar-pk .pctabs{position:absolute;display:flex;gap:4px}`;document.head.appendChild(c)}
/* the kit fan button (copy of jfocus btnHTML: same classes, same parts) */
function btn(a){const sub=[a.word,a.ton?('Tốn '+a.ton):''].filter(Boolean);const pic=a.pic&&/^(https?:|img\/|data:)/.test(a.pic)?`<img class="kfoc-pic" alt="" src="${esc(a.pic)}" draggable="false">`:`<span class="kfoc-pic kfoc-ph"></span>`;
 return `<button type="button" class="kfoc-b${a.off?' kfoc-off kitoff':''}" data-id="${esc(a.id)}">${pic}<span class="kfoc-t"><b>${esc(a.n)}</b>${sub.length?`<small>${sub.map(x=>`<span>${esc(x)}</span>`).join(' · ')}</small>`:''}</span></button>`}
function mkFig(m){const e=document.createElement('div');e.className='kar-f tok fig';const src=m.src;
 e.innerHTML=`<img class="d" alt="" src="${esc(src)}"${m.sil?' style="filter:brightness(.8) saturate(.6);opacity:.75"':''}><img class="l" alt="" src="${esc(src)}"><span class="kar-tag tag">${m.tag||''}</span>`;
 if(m.flip){e.querySelectorAll('img').forEach(i=>i.style.transform='scaleX(-1)')}
 m.el=e;m.lit=e.querySelector('img.l');m.tg=e.querySelector('.kar-tag');m.tg.style.setProperty('--tc',m.tc||'');m.tg.style.display='none';
 e.addEventListener('click',ev=>{ev.stopPropagation();onTap(m)});L.appendChild(e);return e}
/* group shapes, in figure-width units (fw = fh*asp) */
function shape(g){const ms=g.masters,fs=g.fol;const out=[];
 if(ms.length===1){out.push({m:ms[0],dx:0,s:1,dy:0,z:3});fs.forEach((f,i)=>out.push({m:f,dx:(i%2?1:-1)*((A.folDx||.40)+.16*(i>>1)),s:A.folS||.86,dy:A.folDy||.035,z:1}))}
 else{ms.forEach((m,i)=>out.push({m,dx:(i-(ms.length-1)/2)*.95,s:1,dy:0,z:3,flip:i===ms.length-1&&ms.length===2}));
  fs.forEach((f,i)=>{const side=i%2?1:-1;out.push({m:f,dx:side*((ms.length-1)/2*.95+(A.folDx||.40)+.15*(i>>1)),s:A.folS||.86,dy:A.folDy||.035,z:1})})}
 return out}
function gw(g){const P=shape(g);let l=9,r=-9;P.forEach(p=>{const w=(p.m.asp||.32)*p.s;l=Math.min(l,p.dx*.32-w/2);r=Math.max(r,p.dx*.32+w/2)});g.P=P;g.wU=r-l;g.cU=(r+l)/2;return g.wU}
/* assign groups to areas by purpose (law 6b: nobody is sent away; overflow = next area by affinity, never dropped) */
function assign(){const cap=kv()==='kv2'?(A.view&&A.view.kv2||4):(A.view&&A.view.kv1||3);const span=D.x1-D.x0,minGap=(A.gap||.10)*fh;
 AREAS.forEach(a=>{a.g=[];a.w=0});
 const fits=(a,g)=>a.g.length<cap&&a.w+g.wU*fh+(a.g.length+1)*minGap<=span;
 const ord=G.slice().sort((x,y)=>(y.pri||0)-(x.pri||0));
 for(const g of ord){const pref=AREAS.map((a,i)=>({a,i,s:(a.acts.indexOf(g.act)>=0?10-a.acts.indexOf(g.act):0)})).sort((x,y)=>y.s-x.s);
  let put=pref.find(p=>fits(p.a,g));if(!put){let ex=AREAS.find(a=>a.extra&&fits(a,g));if(!ex){ex={k:'x'+AREAS.length,n:A.extraName||'Lối đi',x:.5,acts:[],extra:1,g:[],w:0};AREAS.push(ex)}put={a:ex}}
  put.a.g.push(g);put.a.w+=g.wU*fh;g.area=put.a}
 AREAS=AREAS.filter(a=>a.g.length||!a.extra)}
function bgSet(x,ms){const W=D.W,H=D.H,z=kv()==='kv2'?(A.zoom&&A.zoom.kv2||1.45):(A.zoom&&A.zoom.kv1||1);let bw=Math.max(W*z,H*(16/9)),bh=bw*9/16;if(bh<H){bh=H;bw=H*16/9}
 BG.style.width=bw+'px';BG.style.height=bh+'px';const tx=-(bw-W)*x,ty=-(bh-H);const t=`translate(${tx}px,${ty}px)`;if(ms){return an(BG,[{transform:BG.__t||t},{transform:t}],{duration:ms,easing:'cubic-bezier(.45,0,.25,1)'}).finished.then(()=>{BG.__t=t})}BG.style.transform=t;BG.__t=t}
function place(a){const n=a.g.length;const span=D.x1-D.x0;const tot=a.g.reduce((s,g)=>s+g.wU*fh,0);const gap=(span-tot)/(n+1);let x=D.x0+gap;
 a.g.forEach(g=>{const cx=x+g.wU*fh/2;g.cx=cx;g.top=1e9;g.P.forEach(p=>{const m=p.m,h=fh*p.s,w=h*(m.asp||.32),mx=cx+(p.dx*.32-g.cU)*fh,fy=D.feet-p.dy*D.H;
   m.x=mx-w/2;m.y=fy-h;m.tg.style.display=p.z===3?'block':'none';m.w=w;m.h=h;m.z=p.z;m.flip=p.flip;Object.assign(m.el.style,{width:w+'px',height:h+'px',zIndex:10+p.z,transform:`translate(${m.x}px,${m.y}px)`,display:'block'});m.el.__t=`translate(${m.x}px,${m.y}px)`;g.top=Math.min(g.top,m.y)});
  x+=g.wU*fh+gap;capFor(g)})}
function capFor(g){if(!g.cap)return;if(!g.capEl){g.capEl=document.createElement('div');g.capEl.className='kar-cap';g.capEl.innerHTML=`<span class="kchip ${g.drama?'r':'n'}">${esc(g.cap)}</span>`;L.appendChild(g.capEl)}
 g.capEl.style.left=g.cx+'px';g.capEl.style.top=(g.top-6)+'px';g.capEl.style.display='block'}
function tabs(){TABS.innerHTML=AREAS.map((a,i)=>`<button type="button" class="pct${i===cur?' on sel':''}" data-i="${i}">${esc(a.n)} · ${a.g.reduce((s,g)=>s+g.P.length,0)}</button>`).join('');
 const r=TABS.getBoundingClientRect(),w=r.width||300;const pl=document.querySelector('.kplname,.k3plname,.stop .plname');const sr=st.getBoundingClientRect();let xr=D.x1;try{const t=[...st.querySelectorAll('*')].find(e=>e.textContent.trim()==='Ngự hoa viên'&&e.children.length===0&&e.getBoundingClientRect().top-sr.top<60);if(t)xr=Math.min(xr,t.getBoundingClientRect().left-sr.left-6)}catch(e){}TABS.style.left=Math.max(D.x0,Math.min((D.x0+D.x1)/2-w/2,xr-w))+'px';
 TABS.querySelectorAll('.pct').forEach(b=>b.onclick=ev=>{ev.stopPropagation();go(+b.dataset.i)})}
function figsOf(a){return a.g.flatMap(g=>g.P.map(p=>p.m))}
function hideAll(){G.forEach(g=>{g.P.forEach(p=>p.m.el.style.display='none');if(g.capEl)g.capEl.style.display='none'})}
async function show(i,dir){const a=AREAS[i];place(a);tabs();const F=figsOf(a);const off=(dir||0)*D.W*.18;
 F.forEach((m,k)=>{m.el.style.opacity=0;an(m.el,[{transform:`translate(${m.x+off}px,${m.y}px)`,opacity:0},{transform:m.el.__t,opacity:1}],{duration:dir?520:420,delay:(dir?260:0)+k*35})});
 a.g.forEach(g=>{if(g.capEl)an(g.capEl,[{opacity:0},{opacity:1}],{duration:260,delay:(dir?520:300)})})}
async function go(i,o){if(i===cur&&!o)return;o=o||{};await unsel();const old=AREAS[cur],dir=i>cur?1:-1;
 figsOf(old).forEach(m=>an(m.el,[{transform:m.el.__t,opacity:1},{transform:`translate(${m.x-dir*D.W*.18}px,${m.y}px)`,opacity:0}],{duration:360}));old.g.forEach(g=>g.capEl&&an(g.capEl,[{opacity:1},{opacity:0}],{duration:200}));
 const p=bgSet(AREAS[i].x,A.panMs||760);setTimeout(()=>{figsOf(old).forEach(m=>m.el.style.display='none');old.g.forEach(g=>g.capEl&&(g.capEl.style.display='none'))},380);cur=i;await show(i,dir);await p}
/* focus: lit group / dim the rest (figures only; the painting keeps its brightness) */
function dimSet(m,on,ms){const to=on?0:1;const from=+getComputedStyle(m.lit).opacity;an(m.lit,[{opacity:from},{opacity:to}],{duration:ms||280,easing:'ease-out'})}
async function pickGroup(g){if(sel===g)return;await unsel(true);sel=g;const a=AREAS[cur];
 a.g.forEach(x=>{x.P.forEach(p=>{dimSet(p.m,x!==g);p.m.tg.style.display=p.z===3?'block':'none'});if(x.capEl)an(x.capEl,[{opacity:+getComputedStyle(x.capEl).opacity},{opacity:x===g?1:.35}],{duration:280})});
 g.P.forEach(p=>an(p.m.tg,[{opacity:0,transform:'translate(-50%,6px)'},{opacity:1,transform:'translate(-50%,0)'}],{duration:260}))}
async function unsel(keepGroup){await closePk();if(selM){const m=selM;selM=null;an(m.el,[{transform:m.el.__t2||m.el.__t},{transform:m.el.__t}],{duration:420});sel&&sel.P.forEach(p=>{if(p.m!==m)an(p.m.el,[{transform:p.m.el.__t3||p.m.el.__t},{transform:p.m.el.__t}],{duration:360})});m.el.style.zIndex=10+m.z;await wait(430)}
 AREAS[cur].g.forEach(x=>{if(x!==sel)x.P.forEach(p=>{if(+getComputedStyle(p.m.el).opacity<1)an(p.m.el,[{opacity:+getComputedStyle(p.m.el).opacity},{opacity:1}],{duration:300})})});
 if(!keepGroup&&sel){AREAS[cur].g.forEach(x=>{x.P.forEach(p=>{dimSet(p.m,false);p.m.tg.style.display=p.z===3?'block':'none'});if(x.capEl)an(x.capEl,[{opacity:+getComputedStyle(x.capEl).opacity},{opacity:1}],{duration:250})});sel=null}}
/* step out: she walks toward the player (front, toward the free side), her group steps back */
async function stepOut(m){const g=m.g;if(sel!==g)await pickGroup(g);if(selM===m)return;if(selM)await unsel(true);selM=m;
 const k=A.stepK||1.12,W=D.W;const side=1;/* speaker LEFT (talk rule): she walks to the left talk spot, the picker + later the player use the right */m.side=side;
 const tcx=D.x0+(D.x1-D.x0)*(kv()==='kv2'?(A.spot&&A.spot.kv2||.30):(A.spot&&A.spot.kv1||.24));const tx=Math.max(D.x0+4,tcx-m.w*k/2),ty=Math.min(D.H-m.h*k-28,m.y+(A.stepY||.045)*D.H);
 const to=`translate(${tx+(m.w*(k-1))/2}px,${ty+m.h*(k-1)}px) scale(${k})`;m.el.__t2=to;m.el.style.zIndex=30;
 dimSet(m,false,200);AREAS[cur].g.forEach(x=>x.capEl&&an(x.capEl,[{opacity:+getComputedStyle(x.capEl).opacity},{opacity:0}],{duration:200}));AREAS[cur].g.forEach(x=>{if(x!==g)x.P.forEach(p=>an(p.m.el,[{opacity:1},{opacity:A.farOp||.55}],{duration:420}))});const mid=`translate(${(m.x+tx)/2}px,${(m.y+ty)/2-8}px) scale(${(1+k)/2})`;
 an(m.el,[{transform:m.el.__t},{transform:mid,offset:.5},{transform:to}],{duration:A.walkMs||700});
 g.P.forEach(p=>{if(p.m===m)return;const q=p.m,t3=`translate(${q.x}px,${q.y-.02*D.H}px) scale(.95)`;q.el.__t3=t3;an(q.el,[{transform:q.el.__t},{transform:t3}],{duration:520});dimSet(q,true,420)});
 await wait((A.walkMs||700)+40);m.fx={x:tx,y:ty,w:m.w*k,h:m.h*k};m.tg.style.display='block'}
/* ===== the interaction picker, three ideas; all = kit fan buttons (.kfoc-b) + kit tabs ===== */
async function closePk(){if(!PK)return;const p=PK;PK=null;const B=[...p.querySelectorAll('.kfoc-b,.pctabs')];B.forEach((b,i)=>an(b,[{opacity:1},{opacity:0}],{duration:160}));await wait(170);p.remove()}
function pkData(m){const gs=(m.acts&&m.acts.length?m.acts:[{k:'gt',n:'Giao thiệp',acts:[{id:'a',n:'Chào hỏi'},{id:'b',n:'Trò chuyện'}]}]);return gs}
async function picker(m,kind){await closePk();const gs=pkData(m),acts=gs[0].acts.slice(0,A.pkMax||6),f=m.fx,side=m.side,K=kv();const bh=K==='kv2'?72:64,col=Math.min(K==='kv2'?300:236,(side>0?D.x1-(f.x+f.w):f.x-D.x0)-10);
 const p=document.createElement('div');p.className='kar-pk';p.style.cssText='left:0;top:0;width:100%;height:100%;pointer-events:none';L.appendChild(p);PK=p;p.dataset.kind=kind;
 const tb=document.createElement('div');tb.className='pctabs';tb.innerHTML=gs.slice(0,3).map((g,i)=>`<button type="button" class="pct${i?'':' on sel'}">${esc(g.n)}</button>`).join('');p.appendChild(tb);
 const hipX=side>0?f.x+f.w*.72:f.x+f.w*.28,hipY=f.y+f.h*.50;const ease='cubic-bezier(.2,.8,.25,1.15)';const B=[];
 acts.forEach(a=>{const w=document.createElement('div');w.innerHTML=btn(a);const b=w.firstChild;b.style.pointerEvents='auto';p.appendChild(b);B.push(b)});
 if(kind==='fan'){/* P1 QUẠT NAN: ribs open from her hip along an arc on her free side */const n=B.length,R=Math.min(f.h*.42,(n*bh*1.02)/1.75),top=f.y+f.h*.30;
  B.forEach((b,i)=>{b.style.width=col+'px';const t=n>1?i/(n-1):.5,ang=(-50+100*t)*Math.PI/180;const bx=side>0?f.x+f.w*.62+Math.cos(ang)*R*.55:f.x+f.w*.38-Math.cos(ang)*R*.55-col,by=top+(f.h*.52)*t-bh/2+ (1-Math.cos(ang))*0;
   b.style.transform=`translate(${bx}px,${by}px)`;an(b,[{transform:`translate(${hipX-(side>0?0:col)}px,${hipY-bh/2}px) scale(.25)`,opacity:0},{transform:`translate(${bx}px,${by}px)`,opacity:1}],{duration:340,delay:60+i*45,easing:ease})});
  const tx=side>0?f.x+f.w*.62:f.x+f.w*.38-col;tb.style.left=tx+'px';tb.style.top=(top-bh*.55-34)+'px'}
 else if(kind==='hang'){/* P2 THẺ TREO: name-plates drop from above on her free side and sway, tap = lifts + shows its line */const cols=B.length>4?2:1,cw=cols===2?Math.min(col,(K==='kv2'?190:150)):col,gx=8;const x0=side>0?f.x+f.w+6:f.x-6-cols*cw-(cols-1)*gx;const y0=Math.max(44,f.y+f.h*.18);
  B.forEach((b,i)=>{b.classList.add('kar-min');b.style.width=cw+'px';b.style.transformOrigin='50% -40px';const c=i%cols,r=(i/cols)|0;const bx=x0+c*(cw+gx),by=y0+r*(bh*.78+10);b.dataset.x=bx;b.dataset.y=by;
   an(b,[{transform:`translate(${bx}px,${by-D.H*.5}px) rotate(9deg)`,opacity:0},{transform:`translate(${bx}px,${by+6}px) rotate(-6deg)`,opacity:1,offset:.55},{transform:`translate(${bx}px,${by}px) rotate(3deg)`,offset:.78},{transform:`translate(${bx}px,${by}px) rotate(0deg)`,opacity:1}],{duration:900,delay:i*90,easing:'ease-out'})});
  tb.style.left=x0+'px';tb.style.top=(y0-40)+'px'}
 else{/* P3 BẬC ĐÁ: square kit buttons rise from the ground on a shallow arc from her front foot toward the free side; tap = lifts + its line shows above */const n=B.length,sq=bh,fy=f.y+f.h;const xa=f.x+f.w*.70,xb=D.x1-sq-4,stepx=Math.min(sq+10,(xb-xa)/Math.max(1,n-1));const base=Math.min(D.H-sq*1.55-44,fy-sq*1.25-26);
  B.forEach((b,i)=>{b.classList.add('kar-sq');const t=n>1?i/(n-1):.5;const bx=xa+stepx*i,by=base-Math.sin(Math.PI*t)*sq*.45;b.dataset.x=bx;b.dataset.y=by;
   an(b,[{transform:`translate(${bx}px,${by+34}px) scale(.55)`,opacity:0},{transform:`translate(${bx}px,${by-6}px) scale(1.04)`,opacity:1,offset:.7},{transform:`translate(${bx}px,${by}px)`,opacity:1}],{duration:420,delay:60+i*70,easing:'ease-out'})});
  tb.style.left=xa+'px';tb.style.top=(base-sq*.45-44)+'px'}
 an(tb,[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:220,delay:300});
 B.forEach(b=>b.addEventListener('click',ev=>{ev.stopPropagation();lift(b,kind)}));await wait(900+B.length*90);return B}
function lift(b,kind){const p=PK;if(!p)return;p.querySelectorAll('.kar-up').forEach(x=>{if(x!==b){x.classList.remove('kar-up');const i=x.querySelector('.kar-info');if(i)i.remove()}});
 if(b.classList.contains('kar-up')){b.dispatchEvent(new CustomEvent('karpick',{bubbles:true}));return}b.classList.add('kar-up');
 if(kind!=='fan'){const s=b.querySelector('.kfoc-t small');if(kind==='bac'&&s){const i=document.createElement('span');i.className='kar-info kchip n';i.style.left='50%';i.style.top='-6px';i.textContent=s.textContent;b.appendChild(i)}
  an(b,[{translate:'0 0'},{translate:'0 -10px'}],{duration:200,composite:'add'})}}
/* NPC line (kit bubble) + her own figure steps in on the right (speaker left / her right) */
async function talk(m,text){await closePk();const me=document.createElement('div');me.className='kar-f';const src=window.__karMe;me.innerHTML=`<img class="l" alt="" src="${esc(src)}">`;
 const f=m.fx,h=f.h,w=h*(window.__karMeAsp||.32);const x=Math.min(D.x1-w-6,Math.max(f.x+f.w+D.W*.06,D.x1-w-D.W*.06)),y=f.y;Object.assign(me.style,{width:w+'px',height:h+'px',zIndex:31});L.appendChild(me);
 an(me,[{transform:`translate(${D.W+20}px,${y}px)`,opacity:0},{transform:`translate(${x}px,${y}px)`,opacity:1}],{duration:650});await wait(700);
 if(typeof kitMoodSay==='function'){try{kitMoodSay(m.el.querySelector('img.l'),text,{hold:6000})}catch(e){}}return me}
function onTap(m){if(window.__karAuto)return;if(!sel||sel!==m.g)pickGroup(m.g);else stepOut(m).then(()=>picker(m,window.__karPk||'bac'))}
function init(o){css();cur=0;sel=selM=null;G=o.groups;AREAS=o.areas.map(a=>Object.assign({},a));
 const old=document.getElementById('kar');if(old)old.remove();document.querySelectorAll('.kmsay,.kfoc-say,[class*=moodsay]').forEach(e=>e.remove());L=document.createElement('div');L.id='kar';L.className=kv();st.appendChild(L);document.documentElement.classList.add('karon');
 BG=document.createElement('div');BG.className='kar-bg';const si=document.getElementById('scimg');BG.style.backgroundImage=(si&&(si.style.backgroundImage||getComputedStyle(si).backgroundImage))||'';L.appendChild(BG);
 TABS=document.createElement('div');TABS.className='kar-tabs pctabs';L.appendChild(TABS);D=geo();fh=o.fh;
 G.forEach(g=>{g.masters.concat(g.fol).forEach(m=>{m.g=g;mkFig(m)});gw(g)});assign();bgSet(AREAS[0].x);hideAll();
 L.addEventListener('click',()=>{if(!window.__karAuto)unsel()});return show(0)}
return {init,go,pickGroup,stepOut,picker,lift,talk,unsel,closePk,get areas(){return AREAS},get groups(){return G},get cur(){return cur},get D(){return D}}})();
