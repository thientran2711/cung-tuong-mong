
/* ================= j59: true human proportions on the stage; she is marked by a halo, not by size ================= */
/* Every full-body figure on the stage (her own #mefig and the people tokens) is sized by its VISIBLE body: the opaque
   bounding box of each fig-*.webp is read once through a canvas and cached, so empty margins in the art never change
   anyone's height. Adult women share one head-to-feet height, men are 7% taller, children shorter by age. Feet stand on
   one floor line. Her figure keeps the same height as everyone else and gets a thin outline glow in her rank colour instead (gentle pulse
   only when "Hiệu ứng hình" is on and the system does not ask for reduced motion). */
/* KIT · rank colour palette (owner 11/14), set on the shared RCOL from j1 so badges, frames and the halo all follow:
   Đáp ứng nâu xám, Thường tại xanh lục, Quý nhân xanh lam, Tần hồng phấn, Phi tím, Quý phi đỏ, Hoàng quý phi cam, Hoàng hậu vàng; lãnh cung #cfd3d8 */
window.MRCOL=["#9aa3a8","#5fa39a","#4f74a8","#a0584a","#6a5a8e"];window.ERCOL=["#8f9a8a","#5f8a6a","#3f6a8a","#7a4a3a"];
try{["#8a7a6a","#7aa07a","#6a8aa0","#d48fa6","#a07ab0","#c06a6a","#d98a3a","#f0d070"].forEach((c,i)=>{RCOL[i]=c})}catch(e){}
(function(){
const J59BB={},J59W={};
function j59bb(src,cb){const o=J59BB[src];if(o)return o;if(J59W[src]){J59W[src].push(cb);return null}J59W[src]=[cb];
 const done=v=>{J59BB[src]=v;const L=J59W[src]||[];delete J59W[src];L.forEach(f=>{try{f()}catch(e){}})};
 const im=new Image();im.decoding="async";
 im.onload=()=>{let v={t:0,b:1,l:0,r:1};try{const nh=im.naturalHeight,nw=im.naturalWidth;if(nh&&nw){const h=Math.min(400,nh),w=Math.max(1,Math.round(nw*h/nh));const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;
   let t=h,b=-1,l=w,r=-1;for(let y=0;y<h;y++){const o=y*w*4;for(let i=0;i<w;i++){if(d[o+i*4+3]>40){if(y<t)t=y;if(y>b)b=y;if(i<l)l=i;if(i>r)r=i}}}
   if(b>=t&&r>=l&&(b-t)>h*.2)v={t:t/h,b:(b+1)/h,l:l/w,r:(r+1)/w}}}catch(e){}done(v)};
 im.onerror=()=>done({t:0,b:1,l:0,r:1});im.src=src;return null}
function j59age(p){try{const w=typeof figWho==="function"?figWho(p):p&&(p.ref||p);const a=w&&w.age;return typeof a==="number"?a:20}catch(e){return 20}}
function j59fac(src,p){return KIT_FIG.fac(src,j59age(p))}
let j59q=0;function j59sched(){if(j59q)return;j59q=requestAnimationFrame(()=>{j59q=0;j59lay()})}
/* KIT · rank halo colour: one source for "her rank colour" = RCOL (j1, same list the rank badges/frames use); lãnh cung = pale grey */
function j59srv(){try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}}
function haloColor(){try{if(S&&S.out)return"#cfd3d8";if(j59srv())return(window.MRCOL||[])[S.srv.rk||0]||"#9aa3a8";const k=S&&S.rank!=null?S.rank:0;return(typeof RCOL!=="undefined"&&RCOL[k])||"#f0d070"}catch(e){return"#f0d070"}}
window.haloColor=haloColor;
/* scene name tags: title/role (small, on top) above the name, from the game's own ladders */
function j59esc(t){return String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function j59title(p){try{if(!p)return"";if(p===S)return j59srv()?SRK.maid[S.srv.rk||0]||"Cung nữ":rkOfFace("consort",S)[1];const k=p.kind;
 if(k==="emp")return"Hoàng thượng";if(k==="th")return"Thái hậu";if(k==="hh")return"Hoàng hậu";
 if(k==="kid"){const c=p.ref||{};return c.sex==="m"?"Hoàng tử":"Công chúa"}
 if(k==="ty")return"Thái y";const w=typeof figWho==="function"?figWho(p):(p.ref||p);if(!w)return"";
 if((typeof rivals!=="undefined"&&rivals||[]).includes(w))return rkOfFace("consort",w)[1];
 const C=S.court||{};if(w===C.ty)return"Thái y";
 if(w.role&&SRK[w.role])return srkName(w);if(w===S.maid)return SRK.maid[srk(w)]||"Cung nữ";
 if(w===C.tq)return"Tổng quản thái giám";if(w===C.ksp||w===C.ped)return"Thái giám";
 if((S.men||[]).includes(w)){if(w.rw==="thái y")return"Thái y";return w.role||w.rw||""}
 return w.role&&typeof w.role==="string"&&w.role.length<28?w.role:""}catch(e){return""}}
function j59known(p){try{if(typeof kitKnown!=="function")return true;const w=p===S?S:typeof figWho==="function"?figWho(p):p&&(p.ref||p);return kitKnown(w,p)!==false}catch(e){return true}}
/* KIT · title colours: MRCOL/ERCOL (set at the top of this module), Emperor imperial gold, Thái hậu deep amber, others slate */

const J59C={emp:"#c9a227",th:"#b06f1c",slate:"#5a6878"};
function j59col(p){try{if(p===S)return haloColor();const k=p&&p.kind;if(k==="emp")return J59C.emp;if(k==="th")return J59C.th;if(k==="hh")return RCOL[7];
 const w=typeof figWho==="function"?figWho(p):(p.ref||p);if(!w)return J59C.slate;
 if((typeof rivals!=="undefined"&&rivals||[]).includes(w))return w.out?"#cfd3d8":RCOL[w.queen?7:w.rank]||J59C.slate;
 if(w===S.maid||w.role==="maid")return MRCOL[srk(w)]||MRCOL[1];
 if(w.role==="eunuch"||w===(S.court||{}).tq||w===(S.court||{}).ksp||w===(S.court||{}).ped)return ERCOL[w.role==="eunuch"?srk(w):3]||ERCOL[1];
 return w.hcol||w.houseCol||J59C.slate}catch(e){return J59C.slate}}
function j59tagHTML(p,name){let t=j59title(p);const kn=j59known(p),c=j59col(p);const T=x=>`<span class="j59t" style="--tc:${c}">${j59esc(x)}</span>`;
 name=String(name==null?"":name);if(t&&name!==t&&name.indexOf(t+" ")===0)name=name.slice(t.length+1);
 if(!kn)return T(t||"Người lạ")+`<span class="j59n" style="--tc:${c}">???</span>`;
 if(t&&t===name)return T(t).replace('class="j59t"','class="j59t j59only"');return(t?T(t):"")+`<span class="j59n" style="--tc:${c}">${j59esc(name)}</span>`}
/* strangers: grey full-body silhouette from the kit when the asset exists, else a grey blur of their own figure */
const J59U={};function j59unkSrc(g){const u=`img/kit/unknown-fig-${g}.webp`;if(J59U[g]===undefined){J59U[g]=null;const im=new Image();im.onload=()=>{J59U[g]=u;j59sched()};im.onerror=()=>{J59U[g]=false};im.src=u}return J59U[g]}
function j59unk(b,p,im){const m=/fig-(emperor|eunuch|official|physician|man)-/.test(im.getAttribute("src")||"")||p.kind==="emp";const u=j59unkSrc(m?"m":"f");
 if(u){b.classList.remove("j59unk");if(im.getAttribute("src")!==u)im.src=u}else b.classList.add("j59unk")}
function j59tags(st,tk){const ppl=typeof curPeople==="function"?curPeople():[];
 if(tk)tk.querySelectorAll(".tok").forEach(b=>{const g=b.querySelector(".tag"),p=ppl[+b.dataset.p];if(!g||!p)return;const h=j59tagHTML(p,p.name);if(g.dataset.j59!==h){g.innerHTML=h;g.dataset.j59=h}g.style.setProperty("--tc",j59col(p));g.classList.toggle("j59u",!j59known(p));g.title=g.innerText.replace(/\n/g," · ");const im=b.querySelector(".figimg");if(im){if(!j59known(p))j59unk(b,p,im);else b.classList.remove("j59unk")}});
 const me=document.getElementById("mefig");let mt=document.getElementById("j59metag");
 if(!me){if(mt)mt.remove();return null}
 if(!mt){mt=document.createElement("div");mt.id="j59metag";mt.className="tok j59me";mt.style.visibility="hidden";mt.innerHTML='<span class="tag"></span>';st.appendChild(mt)}
 const g=mt.firstChild,h=j59tagHTML(S,S.name);if(g.dataset.j59!==h){g.innerHTML=h;g.dataset.j59=h}g.style.setProperty("--tc",j59col(S));return mt}
/* selection: the person whose pop card is open (popIdx), or herself after a tap on her figure; one at a time */
let J59ME=false;
function j59sel(st,tk,me){let pi=null;try{pi=typeof popIdx==="number"?popIdx:null}catch(e){}if(pi!=null)J59ME=false;
 if(tk)tk.querySelectorAll(".tok").forEach(b=>b.classList.toggle("j59sel",pi!=null&&+b.dataset.p===pi));
 if(me){me.classList.toggle("j59sel",J59ME);if(!me.dataset.j59c){me.dataset.j59c=1;me.setAttribute("role","button");me.setAttribute("aria-label","Chọn chính mình");
  me.addEventListener("click",e=>{e.stopPropagation();J59ME=!J59ME;try{if(J59ME&&typeof popIdx!=="undefined"&&popIdx!=null){popIdx=null;popMsg="";renderStage();return}}catch(x){}j59sel(st,document.getElementById("tokens"),me)})}}
 else J59ME=false}
const J59CUE=34;
function j59edge(tk){if(!tk)return;const m=tk.scrollWidth-tk.clientWidth;tk.classList.toggle("j59sl",tk.scrollLeft>4);tk.classList.toggle("j59se",tk.scrollLeft>=m-4);j59cue(tk)}
/* "more people" cue: count chips (kit .kchip) at the strip's two ends, in their own columns; tap scrolls the strip */
function j59cue(tk){const st=document.getElementById("stage");if(!st)return;const on=tk.classList.contains("j59strip");const R=tk.getBoundingClientRect(),SR=st.getBoundingClientRect();
 let nl=0,nr=0;if(on)tk.querySelectorAll(".tok").forEach(t=>{const q=t.getBoundingClientRect();const c=(q.left+q.right)/2;if(c<R.left)nl++;else if(c>R.right)nr++});
 for(const [side,n] of [["l",nl],["r",nr]]){let c=st.querySelector(".j59more.j59m"+side);
  if(!on||!n){if(c)c.remove();continue}
  if(!c){c=document.createElement("button");c.type="button";c.className="kchip n j59more j59m"+side;st.appendChild(c);
   c.addEventListener("click",e=>{e.stopPropagation();const t=document.getElementById("tokens");if(t)t.scrollBy({left:(side==="r"?1:-1)*(t.clientWidth+(parseFloat(t.style.columnGap)||0)),behavior:"smooth"})})}
  const txt=side==="r"?`› ${n}`:`${n} ‹`;if(c.textContent!==txt)c.textContent=txt;c.setAttribute("aria-label",`Còn ${n} người ${side==="r"?"bên phải":"bên trái"}`);c.title=`Còn ${n} người nữa`;
  c.style.left=c.style.right="";
  /* KIT 33: when the right plaque column ends high, both counts stand in the empty gutter under it (› N above, N ‹ below) so the strip keeps every pixel for people */
  const cg=parseFloat(st.dataset.j59cg||"0");
  if(cg){c.style.top=(R.top-SR.top+R.height*.45+(side==="l"?48:0)).toFixed(0)+"px";c.style.right=Math.max(4,(cg-30)/2).toFixed(0)+"px"}
  else{c.style.top=(R.top-SR.top+R.height*.45).toFixed(0)+"px";c.style[side==="r"?"right":"left"]=(side==="r"?SR.right-R.right-J59CUE:R.left-SR.left-J59CUE).toFixed(0)+"px"}}}
function j59clear(tk){if(tk){tk.classList.remove("j59st","j59strip");j59cue(tk);["left","right","bottom","justifyContent","paddingLeft","paddingRight","paddingBottom","columnGap"].forEach(k=>tk.style[k]="");tk.querySelectorAll(".tok").forEach(t=>{t.style.width=t.style.minWidth=""})}}
function j59lay(force){const st=document.getElementById("stage");if(!st||!S)return;const tk=document.getElementById("tokens");const me=document.getElementById("mefig");
 st.classList.add("j59");st.classList.toggle("j59fx",!!(typeof OPT!=="undefined"&&OPT&&OPT.fxon));st.style.setProperty("--halo",haloColor());
 {const au=document.getElementById("j59aura");if(au)au.remove()}j59sel(st,tk,me);
 const mt=j59tags(st,tk);
 const imgs=tk?[...tk.querySelectorAll(".tok.fig .figimg")]:[];if(!me&&!imgs.length){j59clear(tk);return}
 const all=me?[me,...imgs]:imgs;let wait=false;
 for(const im of all){const s=im.getAttribute("src");if(!im.complete||!im.naturalWidth){wait=true;if(!im.dataset.j59l){im.dataset.j59l=1;im.addEventListener("load",j59sched)}}if(s&&!j59bb(s,j59sched))wait=true}
 if(wait)return;
 const R=st.getBoundingClientRect(),sH=R.height,sW=R.width;if(sH<60||sW<60)return;
 const ppl=typeof curPeople==="function"?curPeople():[];
 const it=imgs.map(im=>{const s=im.getAttribute("src"),b=J59BB[s],tok=im.closest(".tok");return{im,tok,tag:tok.querySelector(".tag"),b,f:j59fac(s,ppl[+tok.dataset.p]),ar:im.naturalWidth/im.naturalHeight}});
 const mb=me?J59BB[me.getAttribute("src")]:null,mar=me?me.naturalWidth/me.naturalHeight:0;
 const boxW=(x,h)=>h*x.f/(x.b.b-x.b.t)*x.ar;const gap=6;
 /* compact stage (phones / narrow): one-line name chips tinted by the title colour */
 const cmp=sH<420||sW<520;st.classList.toggle("j59c",cmp);
 /* KIT 33 · ONE FIGURE SCALE (KIT_FIG, jkit.js): everybody stands KIT_FIG.h of the stage height (feet on the floor line, head under the
    place ribbon), one scale for the whole scene (men ×KIT_FIG.man, children by age). The size NEVER shrinks to fit more people: the people
    stand in the open middle of the stage (between the plaque gutters); when they do not all fit, a strip of WHOLE-person slots scrolls
    (snaps per person) and "› N" counts the rest. Only a stage too narrow for even one person scales down, to exactly one whole person. */
 const KF=KIT_FIG;
 const fxT=tk?[...tk.querySelectorAll(".tok:not(.fig)")]:[];fxT.forEach(t=>{t.style.width=t.style.minWidth=""});let fixed=0,fxMax=0;fxT.forEach(t=>{fixed+=t.offsetWidth+gap;fxMax=Math.max(fxMax,t.offsetWidth)});
 let topR=8;try{const t=document.getElementById("sc-t");if(t&&t.offsetHeight){const q=t.getBoundingClientRect();if(q.bottom>R.top)topR=Math.max(topR,q.bottom-R.top+4)}}catch(e){}
 topR=Math.min(topR,sH*.12);
 const gL=parseFloat(st.style.getPropertyValue("--kgl"))||0,gR=parseFloat(st.style.getPropertyValue("--kgr"))||0;let rightR=Math.max(8,gR);
 try{const h2=document.getElementById("hud2");if(!gR&&h2&&h2.offsetHeight&&!h2.classList.contains("khud")){const q=h2.getBoundingClientRect();if(q.bottom>R.top&&q.top<R.bottom&&q.width<sW*.45)rightR=Math.max(rightR,R.right-q.left+6)}}catch(e){}
 const maxF=Math.max(1,...it.map(x=>x.f));
 /* widths count the VISIBLE body only (bbox l..r): transparent margins of the art may overlap, so nobody is pushed out by empty pixels */
 const visW=(x,h)=>boxW(x,h)*Math.max(.2,x.b.r-x.b.l);
 const meU=me?visW({f:1,b:mb,ar:mar},1):0;
 const total=(h)=>fixed+it.reduce((a,x)=>a+visW(x,h)+4+gap,0)+(me?meU*h+gap:0);
 const tagH=Math.max(14,mt?mt.firstChild.offsetHeight:0,...it.map(x=>x.tag?x.tag.offsetHeight:0));
 const tw=it.map(x=>x.tag?x.tag.offsetWidth:0);
 const KA=st.__kfa;/* KIT_FLOOR anchor (jk2b kitFloorFit): feet on the painted floor line while the figure keeps its kit height */
 const size=(rows)=>{const fo0=Math.max(sH*.03,rows*(tagH+3)+6);const foA=KA&&KA.feet?sH-KA.feet:0;
  const fo=Math.max(fo0,Math.min(foA,sH-topR-KF.h*sH*maxF));return{fo,H:Math.max(sH*.2,Math.min(KF.h*sH,(sH-fo-topR)/maxF))}};
 /* the plaque column only covers the top of the stage: when it ends above the heads, the people may use the full width under it */
 const headTop=(z)=>sH-z.fo-z.H*maxF;
 const widthFor=(z)=>{let rr=rightR;try{const kR=document.getElementById("kshR");if(gR&&kR&&!kR.hidden&&kR.offsetHeight&&kR.getBoundingClientRect().bottom-R.top+4<headTop(z))rr=8}catch(e){}return{rr,avail:sW-8-rr-gL}};
 let crowd=!!force,Z=size(1),Wd=widthFor(Z);
 let strip=total(Z.H)>Wd.avail&&it.length>0;
 if(!strip){for(let i=1;i<it.length;i++){if((tw[i]+tw[i-1])/2+4>(visW(it[i],Z.H)+visW(it[i-1],Z.H))/2+4+gap)crowd=true}
  if(crowd){const Z2=size(2),W2=widthFor(Z2);if(total(Z2.H)<=W2.avail){Z=Z2;Wd=W2}else{crowd=false;strip=true}}}
 rightR=Wd.rr;const avail=Wd.avail;let {fo,H}=Z;const ov=0;
 /* strip: equal whole-person slots (figure or name chip, whichever is wider), as many as fit, centred in the open floor */
 let slot=0,nVis=0;const slotOf=(h)=>Math.max(fxMax,...it.map((x,i)=>Math.max(visW(x,h)+4,tw[i]+8)))+gap;
 let CUE=J59CUE;try{const kR=document.getElementById("kshR");const kb=kR&&!kR.hidden&&kR.offsetHeight?kR.getBoundingClientRect().bottom-R.top:0;if(strip&&rightR>=40&&kb<sH*.5){CUE=0;st.dataset.j59cg=String(rightR)}else delete st.dataset.j59cg}catch(e){}
 /* every token of the strip (people and the few non-figure tokens) takes one equal slot, so snapping always lands on whole people */
 const stripRoom=()=>avail-(me?meU*H+gap:0)-2*CUE;
 if(strip&&it.length){slot=slotOf(H);if(stripRoom()<slot-gap){let lo=sH*.15,hi=H;for(let k=0;k<22;k++){const m=(lo+hi)/2;const s=slotOf(m);if(avail-(me?meU*m+gap:0)-2*CUE<s-gap)hi=m;else lo=m}H=lo;slot=slotOf(H)}
  nVis=Math.max(1,Math.min(it.length+fxT.length,Math.floor((stripRoom()+gap)/slot)))}
 it.forEach((x,i)=>{x.tok.style.minWidth=x.tok.style.width=strip?(slot-gap).toFixed(1)+"px":""});fxT.forEach(t=>{t.style.minWidth=t.style.width=strip?(slot-gap).toFixed(1)+"px":""});
 for(const x of it){x.im.style.setProperty("height",(H*x.f/(x.b.b-x.b.t)).toFixed(1)+"px","important");{const w=boxW(x,H);x.im.style.setProperty("margin-left",(-w*x.b.l).toFixed(1)+"px","important");x.im.style.setProperty("margin-right",(-w*(1-x.b.r)).toFixed(1)+"px","important")}x.im.style.setProperty("width","auto","important");x.im.classList.add("j59sz");x.im.style.translate="";if(x.tag)x.tag.style.translate=""}
 let meH=0,meW=0,meV=0,meC=0;if(me){meH=H/(mb.b-mb.t);meW=meH*mar;meV=meW*Math.max(.2,mb.r-mb.l);meC=((mb.l+mb.r)/2-.5)*meW;me.style.setProperty("height",meH.toFixed(1)+"px","important");me.classList.add("j59sz")}
 if(tk){tk.classList.toggle("j59st",crowd);tk.classList.toggle("j59strip",strip);tk.style.setProperty("--j59m1",(tagH+6)+"px");
  if(strip){const sw=nVis*slot-gap,used=(me?meV+gap:0)+2*CUE+sw;const x0=8+gL+Math.max(0,(avail-used)/2);if(me)me.style.left=(x0+meV/2-meC).toFixed(1)+"px";const L0=(me?x0+meV+gap:x0)+CUE;
   tk.style.left=L0.toFixed(1)+"px";tk.style.right=(sW-L0-sw).toFixed(1)+"px";tk.style.bottom="0px";tk.style.paddingBottom=fo.toFixed(1)+"px";tk.style.paddingLeft=tk.style.paddingRight="0px";tk.style.columnGap=gap+"px";tk.style.justifyContent="flex-start"}
  else{tk.style.bottom=fo.toFixed(1)+"px";tk.style.paddingBottom="";const tw0=total(H,ov);let x0=8+gL+Math.max(0,(avail-tw0)/2);if(KA&&KA.ax!=null&&tw0<avail)x0=Math.max(8+gL,Math.min(8+gL+avail-tw0,KA.ax-tw0/2));
   if(me){me.style.left=(x0+meV/2-meC).toFixed(1)+"px";tk.style.left=(x0+meV*(1-ov)+gap).toFixed(1)+"px"}else tk.style.left=x0.toFixed(1)+"px";
   tk.style.right="auto";tk.style.columnGap="";tk.style.justifyContent="flex-start";tk.style.paddingLeft=tk.style.paddingRight="0px"}}
 else if(me)me.style.left="";
 /* one floor line for everybody */
 if(tk){j59edge(tk);if(!tk.dataset.j59s){tk.dataset.j59s=1;tk.addEventListener("scroll",()=>j59edge(tk),{passive:true})}}
 const floorY=R.bottom-fo;const CR=strip&&tk?tk.getBoundingClientRect():R;
 it.forEach(x=>{const r=x.im.getBoundingClientRect();const d=floorY-(r.bottom-(1-x.b.b)*r.height);x.im.style.translate=Math.abs(d)>.5?"0 "+d.toFixed(1)+"px":"";
  if(x.tag&&!strip){const t=x.tag.getBoundingClientRect();const s=t.left<CR.left+4?CR.left+4-t.left:t.right>CR.right-4?CR.right-4-t.right:0;if(s)x.tag.style.translate=s.toFixed(1)+"px 0"}});
 if(me){me.style.bottom=(R.bottom-floorY-(1-mb.b)*meH).toFixed(1)+"px";
  const cx=(parseFloat(me.style.left)||sW/2)+meC;
  if(mt){const g=mt.firstChild;mt.style.left=cx.toFixed(1)+"px";mt.style.top=(floorY-R.top+(crowd&&!strip?tagH+6:3)).toFixed(1)+"px";g.style.translate="";const t=g.getBoundingClientRect();const sh=t.left<R.left+4?R.left+4-t.left:t.right>R.right-4?R.right-4-t.right:0;if(sh)g.style.translate=sh.toFixed(1)+"px 0";mt.style.visibility=""}}
 if(!crowd&&!strip&&!force){const tr=(mt&&me&&!strip?[mt.firstChild]:[]).concat(it.map(x=>x.tag)).filter(Boolean).map(g=>g.getBoundingClientRect());for(let i=1;i<tr.length;i++)if(tr[i].left<tr[i-1].right+4){j59lay(true);return}}}
/* KIT element "rank outline": thin edge glow in --halo (her rank colour) along her own figure only; never an aura; pulse only with Hiệu ứng hình and no reduced motion.
   KIT element "selection outline" (.j59sel): brighter warm-white edge glow #fff3c4 on the one person she has selected (popIdx) or on herself (tap her figure); replaces her rank outline while she is selected */
const SG=(a,o)=>`drop-shadow(0 6px 6px #0005) drop-shadow(0 0 1.5px #fff3c4) drop-shadow(0 0 3px #fff3c4) drop-shadow(0 0 ${a}px rgba(255,236,170,${o}))`;
const HG=(a,c)=>`drop-shadow(0 8px 8px #0006) drop-shadow(0 0 ${a}px color-mix(in srgb,var(--halo) ${c}%,transparent))`;
const css=document.createElement("style");css.textContent=`
/* rank badge fills follow the new RCOL (c0 nâu xám, c1 xanh lục, c3 hồng phấn; others already match) */
.rk-c0{background:linear-gradient(160deg,#e2dbd2,#b3a696)!important;border-color:#8a7a6a!important}
.rk-c1{background:linear-gradient(160deg,#d6e6d0,#a3c39b)!important;border-color:#7aa07a!important}
.rk-c3{background:repeating-linear-gradient(45deg,#f6dbe4 0 6px,#ecc6d3 6px 12px)!important;border-color:#d48fa6!important}
.stage.j59{--halo:#f0d070}
#popw.j59dock{grid-area:panel;position:relative;z-index:4;min-height:0;min-width:0;display:flex}
#popw.j59dock:empty{display:none}
#popw.j59dock>.pop{position:relative!important;inset:auto!important;flex:1 1 auto;min-width:0;max-height:none!important;overflow:auto!important;margin:0}
.game.maptab #popw.j59dock{display:none}
.stage.j59 .tok.fig{max-width:none!important;flex:0 0 auto!important;min-width:0!important;position:relative;padding:0 2px}
.stage.j59 .tok.fig .figimg.j59sz{max-height:none!important;max-width:none!important}
.stage.j59 .tok.fig .tag{position:absolute;top:100%;left:50%;margin:3px 0 0 0;transform:translateX(-50%);width:max-content;text-align:center;z-index:2}
.stage.j59 .j59more{position:absolute;z-index:3;transform:translateY(-50%);width:30px;min-height:40px;padding:4px 0;justify-content:center;cursor:pointer;font-weight:700;white-space:nowrap}
.stage.j59 .tok.fig .tag{margin-top:3px!important}
.stage.j59 .tokens.j59st .tok.fig:nth-child(even) .tag{margin-top:var(--j59m1,26px)!important}
.stage.j59.j59c .tok .tag{font-size:.72rem;line-height:1.2;max-width:8em;padding:1px 6px;background:color-mix(in srgb,var(--tc,#5a6878) 20%,#fffaf0)!important;border-color:color-mix(in srgb,var(--tc,#5a6878) 70%,#fff)!important;color:var(--ink)}
.stage.j59.j59c .tok .tag .j59t{display:none}
.stage.j59.j59c .tok .tag .j59t.j59only,.stage.j59.j59c .tok .tag.j59u .j59t{display:inline;background:none;padding:0;margin:0;font-size:.72rem}
.stage.j59.j59c .tok .tag.j59u .j59n{display:inline;margin-left:.3em}
.stage.j59 .tokens.j59strip{overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}
.stage.j59 .tokens.j59strip{scroll-snap-type:x mandatory}
.stage.j59 .tokens.j59strip>.tok{flex:0 0 auto;scroll-snap-align:start;box-sizing:border-box;display:flex;justify-content:center;align-items:flex-end}
.stage.j59 .tokens.j59strip>.tok.fig .tag{max-width:none}
@media (max-aspect-ratio:1/1){.game:not(.maptab){grid-template-rows:auto minmax(40dvh,1fr) minmax(0,1fr) auto!important}}
/* the stage's bottom wash (::after, #fff6e866) must sit under the people, not over her figure */
.stage.j59::after{z-index:0}
.stage.j59 #mefig{z-index:1}
.stage.j59 .tokens{z-index:1}
.stage.j59 #mefig.j59sz{max-height:none!important}
.stage.j59 #mefig{filter:${HG(5,45)};pointer-events:auto;cursor:pointer}
.stage.j59 #mefig.j59sel,.stage.j59 .tok.fig.j59sel .figimg{filter:${SG(9,.95)}}
.stage.j59 .tok.j59sel:not(.fig) .md{box-shadow:0 0 0 2px #fff3c4,0 0 10px 2px rgba(255,243,196,.9)!important}
.stage.j59 .tok .tag .j59t{display:block;font-size:.66rem;line-height:1.15;font-weight:600;letter-spacing:.01em;color:var(--ink);background:color-mix(in srgb,var(--tc,#5a6878) 22%,#fffaf0);box-shadow:inset 3px 0 0 var(--tc,#5a6878);border-radius:6px;padding:0 4px 0 7px;margin:0 -2px 1px}
.stage.j59 .tok.fig.j59unk .figimg{filter:grayscale(1) brightness(1.08) contrast(.55) blur(2px) drop-shadow(0 6px 6px #0004)!important}
.stage.j59 .tok.fig.j59unk.j59sel .figimg{filter:grayscale(1) brightness(1.08) contrast(.55) blur(2px) drop-shadow(0 0 2px #fff3c4) drop-shadow(0 0 7px rgba(255,243,196,.9))!important;animation:figidle 5s ease-in-out infinite!important}
.stage.j59 .tok .tag .j59t.j59only{font-size:.76rem}
.stage.j59 .tok .tag .j59n{display:block;line-height:1.2}
.stage.j59 .tok.j59me{position:absolute;z-index:2;min-width:0;padding:0;transform:translateX(-50%);pointer-events:none;cursor:default}
.stage.j59 .tok.j59me .tag{width:max-content;text-align:center}
@media (prefers-reduced-motion:no-preference){
.stage.j59.j59fx #mefig{animation:meidle 4.6s ease-in-out infinite,j59halo 3.8s ease-in-out infinite}
.stage.j59.j59fx #mefig.j59sel{animation:meidle 4.6s ease-in-out infinite,j59selp 2.6s ease-in-out infinite}
.stage.j59.j59fx .tok.fig.j59sel .figimg{animation:figidle 5s ease-in-out infinite,j59selp 2.6s ease-in-out infinite}}
@keyframes j59halo{0%,100%{filter:${HG(4,40)}}50%{filter:${HG(6,52)}}}
@keyframes j59selp{0%,100%{filter:${SG(7,.85)}}50%{filter:${SG(11,1)}}}`;document.head.appendChild(css);
/* the person card (#popw) docks in the lower panel area (a side sheet beside the stage on wide screens), so the stage
   figures stay visible and the selected one glows; clicks inside it still go to the stage's own handler */
function j59dock(){try{const pw=document.getElementById("popw"),pn=document.getElementById("panel");if(!pw||!pn||pw.classList.contains("j59dock"))return;
 pn.parentNode.insertBefore(pw,pn);pw.classList.add("j59dock");
 pw.addEventListener("click",e=>{const st=document.getElementById("stage");const f=st&&st.onclick;if(typeof f==="function")f.call(st,e)})}catch(e){}}
j59dock();
const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{j59lay()}catch(e){}return r};
try{const st=document.getElementById("stage");if(st&&window.ResizeObserver)new ResizeObserver(j59sched).observe(st)}catch(e){}
addEventListener("resize",j59sched);
window.j59lay=j59lay;
})();
