
/* ================= j59: true human proportions on the stage; she is marked by a halo, not by size ================= */
/* Every full-body figure on the stage (her own #mefig and the people tokens) is sized by its VISIBLE body: the opaque
   bounding box of each fig-*.webp is read once through a canvas and cached, so empty margins in the art never change
   anyone's height. Adult women share one head-to-feet height, men are 7% taller, children shorter by age. Feet stand on
   one floor line. Her figure keeps the same height as everyone else and gets a thin outline glow in her rank colour instead (gentle pulse
   only when "Hiệu ứng hình" is on and the system does not ask for reduced motion). */
/* KIT · rank colour palette (owner 11/14), set on the shared RCOL from j1 so badges, frames and the halo all follow:
   Đáp ứng nâu xám, Thường tại xanh lục, Quý nhân xanh lam, Tần hồng phấn, Phi tím, Quý phi đỏ, Hoàng quý phi cam, Hoàng hậu vàng; lãnh cung #cfd3d8 */
window.MRCOL=["#9aa3a8","#5fa39a","#4f74a8","#a0584a","#6a5a8e"];window.ERCOL=["#8f9a8a","#5f8a6a","#3f6a8a","#7a4a3a"];
try{["#9c8f74","#7aa07a","#6a8aa0","#d48fa6","#a07ab0","#c06a6a","#d98a3a","#f0d070"].forEach((c,i)=>{RCOL[i]=c})}catch(e){}
(function(){
const J59BB={},J59W={};
/* figure body box: the kit measurement (kitFigBody, jkit) — J59BB stays as the read cache other modules use */
function j59bb(src,cb){if(J59BB[src])return J59BB[src];const v=kitFigBody(src,()=>{J59BB[src]=kitFigBody(src);if(cb)cb()});if(v)J59BB[src]=v;return v}
const j59bt=b=>b.ht!=null&&b.ht>b.t?b.ht:b.t;
function j59age(p){try{const w=typeof figWho==="function"?figWho(p):p&&(p.ref||p);const a=w&&w.age;return typeof a==="number"?a:20}catch(e){return 20}}
function j59fac(src,p){return KIT_FIG.fac(src,j59age(p))}
let j59q=0;function j59sched(){if(j59q)return;j59q=requestAnimationFrame(()=>{j59q=0;j59lay()})}
/* KIT · rank halo colour: one source for "her rank colour" = RCOL (j1, same list the rank badges/frames use); lãnh cung = pale grey */
function j59srv(){try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}}
function haloColor(){try{if(S&&S.out)return"#cfd3d8";if(j59srv())return(window.MRCOL||[])[S.srv.rk||0]||"#9aa3a8";const k=S&&S.rank!=null?S.rank:0;return(typeof RCOL!=="undefined"&&RCOL[k])||"#f0d070"}catch(e){return"#f0d070"}}
window.haloColor=haloColor;
/* scene name tags: title/role (small, on top) above the name, from the game's own ladders */
function j59esc(t){return String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function j59title(p){try{if(!p)return"";if(p===S)return j59srv()?SRK.maid[S.srv.rk||0]||"Cung nữ":rkOfFace("consort",S)[1];let k=p.kind;if(k==="srv"&&["emp","ty","hh"].includes(p.sk))k=p.sk;
 if(k==="ksp")return"Tổng quản Kính sự phòng";if(k==="peddler")return"Thái giám Nội vụ phủ";if(k==="fallen"&&!p.ref)return"Phế phi";if(k==="min"&&p.ref)return(typeof TDOFF!=="undefined"&&TDOFF[p.ref.c])||p.ref.c||"Quan";
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
function j59tagHTML(p,name){let t=j59title(p);const kn=j59known(p),c=j59col(p);const T=x=>`<span class="j59t" style="--tc:${c};--rt:${typeof kitRankTone==="function"?kitRankTone(x,c):c}">${j59esc(x)}</span>`;
 name=String(name==null?"":name);if(t&&name!==t&&name.indexOf(t+" ")===0)name=name.slice(t.length+1);
 if(!kn)return T(t||"Người lạ")+`<span class="j59n" style="--tc:${c}">???</span>`;
 if(t&&t===name)return T(t).replace('class="j59t"','class="j59t j59only"');return(t?T(t):"")+`<span class="j59n${p===S?" kmy":""}" style="--tc:${c}">${j59esc(name)}</span>`}
/* strangers: grey full-body silhouette from the kit when the asset exists, else a grey blur of their own figure */
const J59U={};function j59unkSrc(g){const u=`img/kit/unknown-fig-${g}.webp`;if(J59U[g]===undefined){J59U[g]=null;const im=new Image();im.onload=()=>{J59U[g]=u;j59sched()};im.onerror=()=>{J59U[g]=false};im.src=u}return J59U[g]}
function j59unk(b,p,im){const s0=im.getAttribute("src")||"";const m=/fig-(emperor|eunuch|official|physician|man)-|unknown-fig-m\./.test(s0)||p.kind==="emp";const u=j59unkSrc(/unknown-fig-k\./.test(s0)?"k":m?"m":"f");
 if(u){b.classList.remove("j59unk");if(im.getAttribute("src")!==u)im.src=u}else b.classList.add("j59unk")}
function j59tags(st,tk){const ppl=typeof curPeople==="function"?curPeople():[];const TT=[];
 if(tk)tk.querySelectorAll(".tok").forEach(b=>{const g=b.querySelector(".tag"),p=ppl[+b.dataset.p];if(!g||!p)return;const h=j59tagHTML(p,p.name);if(g.dataset.j59!==h){g.innerHTML=h;g.dataset.j59=h}g.style.setProperty("--tc",j59col(p));g.classList.toggle("j59u",!j59known(p));g.classList.toggle("j59mine",p===S);TT.push(g);const im=b.querySelector(".figimg");if(im){if(!j59known(p))j59unk(b,p,im);else b.classList.remove("j59unk")}});
 /* lag-play: the tooltips read innerText (a layout read) AFTER all the writes: one layout instead of one per person */
 {const V=TT.map(g=>g.innerText.replace(/\n/g," · "));TT.forEach((g,i)=>{if(g.title!==V[i])g.title=V[i]})}
 const me=document.getElementById("mefig");let mt=document.getElementById("j59metag");
 if(!me){if(mt)mt.remove();return null}
 if(!mt){mt=document.createElement("div");mt.id="j59metag";mt.className="tok j59me";mt.style.visibility="hidden";mt.innerHTML='<span class="tag"></span>';st.appendChild(mt)}
 const g=mt.firstChild,h=j59tagHTML(S,S.name);g.classList.add("j59mine");if(g.dataset.j59!==h){g.innerHTML=h;g.dataset.j59=h}g.style.setProperty("--tc",j59col(S));return mt}
/* selection: the person whose pop card is open (popIdx), or herself after a tap on her figure; one at a time */
let J59ME=false;
function j59sel(st,tk,me){let pi=null;try{pi=typeof popIdx==="number"?popIdx:null}catch(e){}if(pi!=null)J59ME=false;
 if(tk)tk.querySelectorAll(".tok").forEach(b=>b.classList.toggle("j59sel",pi!=null&&+b.dataset.p===pi));
 if(me){me.classList.toggle("j59sel",J59ME);if(!me.dataset.j59c){me.dataset.j59c=1;me.setAttribute("role","button");me.setAttribute("aria-label","Chọn chính mình");
  me.addEventListener("click",e=>{e.stopPropagation();J59ME=!J59ME;try{if(J59ME&&typeof popIdx!=="undefined"&&popIdx!=null){popIdx=null;popMsg="";renderStage();return}}catch(x){}j59sel(st,document.getElementById("tokens"),me)})}}
 else J59ME=false}
/* KIT 33.7 · STAGE SLOT TEMPLATE (owner 11/15 06:55Z, review/stage-slots) — every room / place / home / lãnh cung / co-op stage:
   - a screen has a fixed number of SLOTS: 3 on iPad-wide layouts (viewport ≥ 1000 px), 2 on Fold / phones; her included (KIT 33 rule 4).
   - slot i has a FIXED centre: the open floor (stage minus the plaque gutters, minus the page-chip gutters when there are pages)
     is cut into N equal slots, centre i = x0 + w·(i + ½), on every page.
   - every figure stands with its whole VISIBLE art (kitFigBody l..r, sleeves and hem included, not the transparent margin) centred on its slot centre and no wider than the slot spacing (never overlapping; the slot function is kitSlotSw/Cx/Scale in jkit),
     feet on ONE floor line (the transparent margin under the feet is pulled out), at the KIT_FIG scale (men ×1.07, children by age,
     never shrunk to fit — only a stage narrower than one whole person scales down).
   - the name chip (rank / role over the name, KIT 33.5) is centred on the slot, at most the slot width (it wraps, never cut), all chips on
     one top line under the feet: chips of two slots can never touch.
   - pages: page 1 = her in slot 1 + the first N−1 others; every later page = the next N others (she is NOT shown again).
     The next chip reads "+N" (N = people not shown yet), the back chip "‹"; both stand in their own gutters at the stage's bottom
     corners (the name row), so they never cover a figure or a name.
   - the head count is ONE number (kitHereCount): the stage title, the page chips and the Dư đồ label of the place she stands in. */
function j59person(p){return !!p&&p.kind!=="chest"&&p.kind!=="task"&&!(p.kind==="srv"&&p.sk==="task")}
function j59chips(st,R,P){/* P: {pg, pages, before, after, fo, CW, x0L, x0R} */
 for(const side of ["l","r"]){let c=st.querySelector(".j59more.j59m"+side);const on=P&&P.pages>1&&(side==="r"?P.pg<P.pages-1:P.pg>0);
  if(!on){if(c)c.remove();continue}
  if(!c){c=document.createElement("button");c.type="button";c.className="kchip n j59more j59m"+side;st.appendChild(c);
   c.addEventListener("click",e=>{e.stopPropagation();const s2=document.getElementById("stage");if(!s2)return;s2.__j59p=Math.max(0,(s2.__j59p||0)+(side==="r"?1:-1));j59lay()})}
  const txt=side==="r"?(P.after>0?`+${P.after}`:"›"):"‹";if(c.textContent!==txt)c.textContent=txt;
  const lab=side==="r"?`Xem ${P.after} người nữa`:`Trang trước · ${P.before} người`;c.setAttribute("aria-label",lab);c.title=lab;
  c.style.width=(P.CW-6)+"px";c.style.top=(st.clientHeight-P.fo+3).toFixed(0)+"px";c.style.left=c.style.right="";
  if(side==="l")c.style.left=(P.x0L+3).toFixed(0)+"px";else c.style.right=(P.x0R+3).toFixed(0)+"px"}}
/* owner 11/15 08:00Z: never a mini portrait on the stage — a person without figure art stands as the kit's full-size soft silhouette
   (unknown-fig-f / -m / -k by role, same KIT_FIG scale, men ×1.07) in a slot, with the real name chip (or "Người lạ" while unknown) */
function j59fill(tk){if(!tk)return;const ppl=typeof curPeople==="function"?curPeople():[];
 tk.querySelectorAll(".tok:not(.fig)").forEach(b=>{const p=ppl[+b.dataset.p];if(!j59person(p)||b.querySelector(".figimg"))return;
  let g="f";try{if(/^(ksp|peddler|ty|man|min|emp|guard)$/.test(p.kind))g="m";else if(p.kind==="srv"&&(p.sk==="man"||p.sk==="emp"||p.sk==="ty"))g="m";else{const r=typeof personRoleRank==="function"?personRoleRank(p.kind==="srv"&&p.ref?p.ref:{kind:p.kind,ref:p.ref}):null;
   if(r&&(r.kid||r.sex==="k"))g="k";else if(r&&r.sex==="m")g="m"}}catch(e){}
  const im=document.createElement("img");im.className="figimg j59sil";im.alt="";im.src=`img/kit/unknown-fig-${g}.webp`;
  im.onerror=()=>{im.remove();b.classList.remove("fig","j59silt");const md=b.querySelector(".md");if(md)md.style.display=""};
  const md=b.querySelector(".md");if(md)md.style.display="none";b.insertBefore(im,b.firstChild);b.classList.add("fig","j59silt")})}
function j59clear(tk){const st=document.getElementById("stage");try{if(st){delete st.dataset.j59pg;delete st.dataset.j59slots;st.querySelectorAll(".j59more").forEach(c=>c.remove())}}catch(e){}
 if(tk){["left","right","top","bottom","width","height"].forEach(k=>tk.style.removeProperty(k));tk.querySelectorAll(".tok").forEach(t=>{["left","bottom","display","width"].forEach(k=>t.style.removeProperty(k))})}}
function j59lay(){const st=document.getElementById("stage");if(!st||!S)return;const tk=document.getElementById("tokens");const me=document.getElementById("mefig");
 st.classList.add("j59","j59slot");st.classList.toggle("j59fx",!!(typeof OPT!=="undefined"&&OPT&&OPT.fxon));st.style.setProperty("--halo",haloColor());
 {const au=document.getElementById("j59aura");if(au)au.remove()}j59sel(st,tk,me);
 j59fill(tk);const mt=j59tags(st,tk);
 const toks=tk?[...tk.querySelectorAll(".tok")]:[];if(!me&&!toks.length){j59clear(tk);return}
 const imgs=toks.map(t=>t.classList.contains("fig")?t.querySelector(".figimg"):null).filter(Boolean);
 let wait=false;
 for(const im of (me?[me,...imgs]:imgs)){const s=im.getAttribute("src");if(!im.complete||!im.naturalWidth){wait=true;if(!im.dataset.j59l){im.dataset.j59l=1;im.addEventListener("load",j59sched)}}if(s&&!j59bb(s,j59sched))wait=true}
 if(wait)return;
 const R=st.getBoundingClientRect(),sH=R.height,sW=R.width;if(sH<60||sW<60)return;
 const ppl=typeof curPeople==="function"?curPeople():[];
 const E=toks.map(tok=>{const im=tok.classList.contains("fig")?tok.querySelector(".figimg"):null;const p=ppl[+tok.dataset.p];
  if(im){const s=im.getAttribute("src");return{tok,im,p,tag:tok.querySelector(".tag"),b:J59BB[s],f:j59fac(s,p),ar:im.naturalWidth/im.naturalHeight}}
  return{tok,p,tag:tok.querySelector(".tag"),nf:1}});
 const mb=me?J59BB[me.getAttribute("src")]:null,mar=me?me.naturalWidth/me.naturalHeight:0;
 const cmp=sH<420||sW<520;st.classList.toggle("j59c",cmp);
 const KF=KIT_FIG;
 let topR=8;try{const t=document.getElementById("sc-t");if(t&&t.offsetHeight){const q=t.getBoundingClientRect();if(q.bottom>R.top)topR=Math.max(topR,q.bottom-R.top+4)}}catch(e){}
 topR=Math.min(topR,sH*.12);
 /* phones (< 600 px, coordinator 11/15): the right chip column (court chips, maid, "Ân sủng ›") folds into ONE compact row along the
    top edge under the place title, and the heads stand under that row — so two slots keep their width and no chip sits on a head */
 const ph=false;st.classList.toggle("j59ph",ph);/* KIT §0: the one-page room = the spread's left page (no phone stage variant) */
 if(ph){try{const t=document.getElementById("sc-t");const tb=t&&t.offsetHeight?t.getBoundingClientRect().bottom-R.top+2:6;st.style.setProperty("--j59kt",Math.max(6,tb).toFixed(0)+"px");
  const kR=document.getElementById("kshR");if(kR&&!kR.hidden&&kR.offsetHeight){const q=kR.getBoundingClientRect();topR=Math.max(topR,Math.min(q.bottom-R.top+4,sH*.3))}}catch(e){}}
 const gL=parseFloat(st.style.getPropertyValue("--kgl"))||0,gR=parseFloat(st.style.getPropertyValue("--kgr"))||0;let rightR=8;
 try{const h2=document.getElementById("hud2");if(!gR&&h2&&h2.offsetHeight&&!h2.classList.contains("khud")){const q=h2.getBoundingClientRect();if(q.bottom>R.top&&q.top<R.bottom&&q.width<sW*.45)rightR=Math.max(rightR,R.right-q.left+6)}}catch(e){}
 /* KIT 33: women stand KIT_FIG.h; a taller figure (man ×KIT_FIG.man) is CAPPED under the place ribbon (CAP) — it never shrinks the others */
 let CAP=Infinity;const ef=(x,h)=>Math.min(h*x.f,CAP);
 const imgH=(x,h)=>ef(x,h)/(x.b.b-j59bt(x.b)),boxW=(x,h)=>imgH(x,h)*x.ar;
 const kCL=b=>b.l,kCR=b=>b.r;/* review/stage-slots-fix: the slot box is the figure's WHOLE visible art (kitFigBody l..r, wide sleeves included), centred on the slot; was the torso core, which let robes overlap */
 const coreW=(x,h)=>boxW(x,h)*Math.max(.2,kCR(x.b)-kCL(x.b));
 const meX=me?{f:1,b:mb||{t:0,b:1,l:0,r:1},ar:mar}:null;
 const F=E.filter(x=>!x.nf);const nfW=Math.max(0,...E.filter(x=>x.nf).map(x=>x.tok.offsetWidth));
 const KA=st.__kfa;/* KIT_FLOOR anchor (jk2b kitFloorFit): feet on the painted floor line while the figure keeps its kit height */
 let capOn=true;/* KIT §0: the left page in the spread and the one-page room are the same page */
 const size=(tagH)=>{const fo0=Math.max(sH*.03,tagH+8);const foA=KA&&KA.feet?sH-KA.feet:0;
  const fo=Math.max(fo0,Math.min(foA,sH-topR-KF.h*sH));CAP=sH-fo-topR;return{fo,H:Math.max(sH*.2,Math.min(KF.h*sH,CAP,(KF.maxPx&&capOn)?KF.maxPx:1e9))}};
 const maxF=Math.max(1,...F.map(x=>x.f));
 const widthFor=(z)=>{let rr=rightR;try{const kR=document.getElementById("kshR");const head=sH-z.fo-Math.min(z.H*maxF,sH-z.fo-topR);/* the right plaque column (court chips, maid, Ân sủng) is reserved when it reaches down to the heads: no face or name is ever under it
    (coordinator 11/15, supersedes "may stand under it"); a column that ends above the heads leaves the full width. Compact stages
    (phone landscape, scaled iPad layout later) keep the old rule. */
   /* review/small-bugs-2 (owner: a second person in lãnh cung hid behind the people panel at 844x390): compact stages reserve it too —
      no figure is ever placed under a stage panel, at any size, in any place */
   if(kR&&!kR.hidden&&kR.offsetHeight){const q=kR.getBoundingClientRect();/* review/stage-side (owner 16/11 fixed slots): the stage area for people = the stage minus the side column, ALWAYS (not only when the column reaches the heads), so the slots never move when the column grows or folds */if((q.left+q.right)/2>R.left+sW*.5){rr=Math.max(rr,R.right-q.left+6);z.rsv=q.bottom-R.top+4<sH-z.fo}}}catch(e){}return rr};
 const MAXN=3,M=E.length,nAll=M+(me?1:0);
 const leftFor=(z)=>{let ll=8+gL;try{const kL=document.getElementById("kshL");const head=sH-z.fo-Math.min(z.H*maxF,sH-z.fo-topR);
   if(kL&&!kL.hidden&&kL.offsetHeight>4){const q=kL.getBoundingClientRect();if(q.bottom-R.top+4>=head&&(q.left+q.right)/2<R.left+sW*.5)ll=Math.max(ll,q.right-R.left+6)}}catch(e){}return ll};
 const geo=(N,z)=>{const paged=nAll>N;const CW=paged?46:0;/* page-chip gutters: 46 px, 34 on phones so two slots still hold a man (KIT 33.7) */const rr=widthFor(z);const lf=leftFor(z);const pL=lf>8+gL,pR=rr>rightR;const x0=lf+CW;/* a reserved right column that ends above the name row holds the "+N" chip under it: no second gutter */const CWR=paged&&z.rsv&&rr>=CW+8?0:CW;const avail=Math.max(40,sW-x0-rr-CWR);/* review/stage-side (owner 16/11): k people stand at 1/(k+1), 2/(k+1)… of the free width, so N people per page need a spacing of avail/(N+1) (1 person = the whole width) */const sw=kitSlotSw(N,avail);/* KIT 33.7 slot function (jkit) */return{N,paged,CW,rr,xl:lf,pL,pR,limL:x0,limR:x0+avail,x0R:CWR?rr:rr-CW,x0,avail,sw}};
 /* a figure fits its slot when its whole visible art (kitFigBody l..r) is within the slot spacing — no neighbour overlap, ever (OD:L1049, KIT 33.7 slot function in jkit) */
 /* review/j59-fix: a slot is never narrower than a name chip (min 60 px + 8): beside a reserved plaque column (844x390, 2-column plaques)
    the page holds fewer people instead of squeezing two into the gap with overlapping names */
 const J59SWMIN=68;
 const fits=(g,h,nomin)=>(nomin||g.sw>=J59SWMIN)&&(!me||coreW(meX,h)<=g.sw)&&F.every(x=>coreW(x,h)<=g.sw)&&nfW<=g.sw;
 /* measure EVERY name chip (all pages), not only the page on screen: a hidden chip reads 0 px and the floor band (fo) would shift between pages (reviewer, 844x390 page 3) */
  E.forEach(x=>{x.tok.style.display=""});if(mt)mt.classList.remove("j59off");
  let tagH=Math.max(14,mt&&mt.firstChild?mt.firstChild.offsetHeight:0,...E.map(x=>x.tag?x.tag.offsetHeight:0));
 /* review/stage-side (owner 16/11 fixed slots): a page holds at most as many slots as there are people (2 people = 1/3 · 2/3, not 2 of 3 slots);
    when they do not fit at full height, EVERYONE is scaled down together (same scale, J59HMIN at least) before the page drops a slot */
 let Z=size(tagH),N=Math.max(1,Math.min(MAXN,nAll)),G=geo(N,Z);
 if(!fits(G,Z.H)&&!capOn&&KF.maxPx){capOn=true;Z=size(tagH);G=geo(N,Z)}
 const J59HMIN=()=>N<=2?.32:.62;/* two slots are kept (owner: phone shows 2) by scaling everyone down together further than for 3 */
 while(N>1&&!fits(G,Z.H)){if(fits(G,Z.H*J59HMIN())){let lo=Z.H*J59HMIN(),hi=Z.H;for(let k=0;k<18;k++){const m=(lo+hi)/2;if(fits(G,m))lo=m;else hi=m}Z.H=lo;break}N--;G=geo(N,Z)}
 if(!fits(G,Z.H,1)){/* a stage narrower than ONE whole person: that one person scales down to fit */
  let lo=sH*.15,hi=Z.H;for(let k=0;k<22;k++){const m=(lo+hi)/2;if(fits(G,m,1))lo=m;else hi=m}Z.H=lo}
 /* the name chips are at most one slot wide (they wrap, never cut); measure them at that width, then size the floor band for them */
 st.style.setProperty("--j59sw",Math.max(60,G.sw-8).toFixed(0)+"px");
 tagH=Math.max(14,mt&&mt.firstChild?mt.firstChild.offsetHeight:0,...E.map(x=>x.tag?x.tag.offsetHeight:0));
 {const H0=Z.H;Z=size(tagH);Z.H=Math.min(Z.H,H0);G=geo(N,Z)}
 const {fo,H}=Z;CAP=sH-fo-topR;
 /* pages: page 1 = her (slot 1) + N−1 others, then N others per page */
 const first=me?N-1:N;const pages=M<=first?1:1+Math.ceil((M-first)/N);
 const key=E.map(x=>x.im?x.im.getAttribute("src"):"t"+x.tok.dataset.p).join("|")+"#"+N;if(st.__j59k!==key){st.__j59k=key;st.__j59p=0}
 const pg=Math.max(0,Math.min(st.__j59p||0,pages-1));st.__j59p=pg;
 const s0=pg===0?0:first+(pg-1)*N,s1=Math.min(M,pg===0?first:s0+N);
 const showMe=!!me&&pg===0;const vis=E.slice(s0,s1);
 if(me){me.classList.toggle("j59off",!showMe);if(mt)mt.classList.toggle("j59off",!showMe)}
 E.forEach(x=>{x.tok.style.display=vis.includes(x)?"":"none"});
 const persons=E.filter(x=>j59person(x.p)).length,after=E.slice(s1).filter(x=>j59person(x.p)).length,before=(showMe?0:1)+E.slice(0,s0).filter(x=>j59person(x.p)).length;
 if(pages>1)st.dataset.j59pg=[pg,pages,s0,s1,M].join(",");else delete st.dataset.j59pg;
 /* fixed slots (owner 16/11): 1 → centre, 2 → 1/3 · 2/3, 3 → 1/4 · 2/4 · 3/4 of the free width (stage minus the side column) */
 const kOn=(showMe?1:0)+vis.length;const cxOf=i=>kitSlotCx(i,kOn,G.x0,G.avail);st.dataset.j59free=G.x0.toFixed(1)+","+G.avail.toFixed(1);const floorY=st.clientHeight-fo;
 if(tk){tk.style.setProperty("left","0px","important");tk.style.setProperty("right","0px","important");tk.style.setProperty("top","0px","important");tk.style.setProperty("bottom","0px","important");
  ["paddingLeft","paddingRight","paddingBottom","columnGap","justifyContent"].forEach(k=>tk.style[k]="")}
 const centres=[];let slot=0;
/* next to a reserved panel the edge figure's core is pulled in so it ends at the panel edge (a wide robe may step over its slot by the
    neighbour allowance, never under a panel — review/small-bugs-2) */
 const inLim=(cx,cw)=>{if(G.pR&&cx+cw/2>G.limR)cx=G.limR-cw/2;if(G.pL&&cx-cw/2<G.limL)cx=G.limL+cw/2;return cx};
 if(showMe){const meH=H/(mb.b-j59bt(mb)),meW=meH*mar,meC=((kCL(mb)+kCR(mb))/2-.5)*meW;const cx=inLim(cxOf(slot++),coreW(meX,H));centres.push(cx);
  me.style.setProperty("height",meH.toFixed(1)+"px","important");me.classList.add("j59sz");
  me.style.left=(cx-meC).toFixed(1)+"px";me.style.bottom=(fo-(1-mb.b)*meH).toFixed(1)+"px";
  if(mt){const g=mt.firstChild;mt.style.left=cx.toFixed(1)+"px";mt.style.top=(floorY+3).toFixed(1)+"px";g.style.translate="";mt.style.visibility="";
   /* her chip on the same top line as every other chip (the holder box may add its own offset) */
   const d=R.top+st.clientTop+floorY+3-g.getBoundingClientRect().top;if(Math.abs(d)>.3)mt.style.top=(floorY+3+d).toFixed(1)+"px"}}
  for(const x of vis){let cx=cxOf(slot++);if(!x.nf)cx=inLim(cx,coreW(x,H));centres.push(cx);const t=x.tok;
  if(x.nf){t.style.left=(cx-t.offsetWidth/2).toFixed(1)+"px";t.style.bottom=fo.toFixed(1)+"px";continue}
  const ih=imgH(x,H),w=boxW(x,H),cw=coreW(x,H);
  x.im.style.setProperty("height",ih.toFixed(1)+"px","important");x.im.style.setProperty("width","auto","important");
  x.im.style.setProperty("margin-left",(-w*kCL(x.b)).toFixed(1)+"px","important");x.im.style.setProperty("margin-right",(-w*(1-kCR(x.b))).toFixed(1)+"px","important");
  x.im.style.setProperty("margin-bottom",(-(1-x.b.b)*ih).toFixed(1)+"px","important");x.im.classList.add("j59sz");x.im.style.translate="";
  t.style.left=(cx-cw/2).toFixed(1)+"px";t.style.bottom=fo.toFixed(1)+"px";t.style.zIndex="";if(x.tag)x.tag.style.translate=""}
 st.dataset.j59slots=centres.map(c=>(c+st.clientLeft).toFixed(1)).join(",");st.dataset.j59n=String(N);
 j59chips(st,R,pages>1?{pg,pages,before,after,fo,CW:G.CW,x0L:G.xl,x0R:G.x0R}:null);
 st.__j59here=persons}
/* KIT element "rank outline": thin edge glow in --halo (her rank colour) along her own figure only; never an aura; pulse only with Hiệu ứng hình and no reduced motion.
   KIT element "selection outline" (.j59sel): brighter warm-white edge glow #fff3c4 on the one person she has selected (popIdx) or on herself (tap her figure); replaces her rank outline while she is selected */
const SG=(a,o)=>`url(#kfa) var(--klf,brightness(1)) drop-shadow(0 6px 6px #0005) drop-shadow(0 0 1.5px #fff3c4) drop-shadow(0 0 3px #fff3c4) drop-shadow(0 0 ${a}px rgba(255,236,170,${o}))`;
const HG=(a,c)=>`url(#kfa) var(--klf,brightness(1)) drop-shadow(0 8px 8px #0006) drop-shadow(0 0 ${a}px color-mix(in srgb,var(--halo) ${c}%,transparent))`;
const css=document.createElement("style");css.textContent=`
/* rank badge fills follow the new RCOL (c0 trắng ngà ngọc trai, owner 11/15; c1 xanh lục, c3 hồng phấn; others already match) */
.rk-c0{background:linear-gradient(160deg,#fbf8f1,#e6dfcf)!important;border-color:#9c8f74!important}
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
.stage.j59 .tok.fig.j59unk .figimg{filter:url(#kfa) grayscale(1) brightness(1.08) contrast(.55) blur(2px) drop-shadow(0 6px 6px #0004)!important}
.stage.j59 .tok.fig.j59unk.j59sel .figimg{filter:url(#kfa) grayscale(1) brightness(1.08) contrast(.55) blur(2px) drop-shadow(0 0 2px #fff3c4) drop-shadow(0 0 7px rgba(255,243,196,.9))!important}
.stage.j59 .tok .tag .j59t.j59only{font-size:.76rem}
.stage.j59 .tok .tag .j59n{display:block;line-height:1.2}
.stage.j59 .tok.j59me{position:absolute;z-index:2;min-width:0;padding:0;transform:translateX(-50%);pointer-events:none;cursor:default}
.stage.j59 .tok.j59me .tag{width:max-content;text-align:center}
/* review/face-sharp (owner 15/11 "mặt bị mất nét"): NO continuous animation on a people picture. The old idle sway (meidle/figidle,
   scale 1→1.012) and the pulsing halo / selection glow (j59halo / j59selp, animated filter) made the compositor re-sample her picture
   every frame: face detail −8…−13 % (dev/test/face-sharp.js), her face hazy beside a still, crisp maid. Halo and glow stay, static. */
@keyframes j59halo{0%,100%{filter:${HG(4,40)}}50%{filter:${HG(6,52)}}}
@keyframes j59selp{0%,100%{filter:${SG(7,.85)}}50%{filter:${SG(11,1)}}}
/* KIT 33.7 slot template: the people layer covers the stage, every person stands absolutely in a fixed slot (left/bottom from j59lay) */
html body #stage.j59slot #tokens{display:block!important;overflow:visible!important;pointer-events:none;padding:0!important;gap:0!important}
html body #stage.j59slot #tokens>.tok{position:absolute!important;margin:0!important;padding:0!important;pointer-events:auto;min-width:0!important;max-width:none!important;flex:none!important;translate:none!important}
html body #stage.j59slot #tokens>.tok.fig{display:block;line-height:0}
html body #stage.j59slot #tokens>.tok.fig .figimg{display:block;transform:none!important}
html body #stage.j59slot #tokens>.tok .tag,html body #stage.j59slot #j59metag .tag{width:max-content!important;max-width:var(--j59sw,200px)!important;white-space:normal!important;overflow-wrap:break-word;line-height:1.2!important;translate:none!important}
html body #stage.j59slot #tokens>.tok.fig .tag{top:100%!important;margin-top:3px!important}
html body #stage.j59slot #j59metag{translate:none!important}
html body #stage.j59ph #kshR{top:var(--j59kt,44px)!important;left:6px!important;right:6px!important;width:auto!important;max-width:none!important;min-width:0!important;flex-direction:row;flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:3px}
html body #stage.j59ph #kshR .k3cs{flex-direction:row;flex-wrap:wrap;justify-content:flex-end;gap:3px}
html body #stage.j59ph #kshR .k3c{width:auto;padding:1px 6px;gap:3px}
html body #stage.j59ph #kshR .k3c .md{display:none}
html body #stage.j59ph #kshR .k3c .k3ct{flex-direction:row;align-items:baseline;gap:4px;white-space:nowrap}
html body #stage.j59ph #kshR .k3p{width:auto}
html body #stage.j59slot #mefig.j59off,html body #stage.j59slot #j59metag.j59off{display:none!important}
html body #stage.j59slot .j59more{transform:none;min-height:40px;padding:4px 0;z-index:4}
.stage.j59 .tok.fig .figimg.j59sil{filter:url(#kfa) brightness(1.04) contrast(.8) drop-shadow(0 6px 6px #0003);opacity:.92}
/* her idle sway breathes from the feet: no vertical lift, so her feet stay on the slot floor line with everyone else */
@keyframes meidle{0%,100%{transform:translateX(-50%) scale(1,1)}50%{transform:translateX(-50%) scale(1,1.012)}}`;document.head.appendChild(css);
/* the person card (#popw) docks in the lower panel area (a side sheet beside the stage on wide screens), so the stage
   figures stay visible and the selected one glows; clicks inside it still go to the stage's own handler */
function j59dock(){try{const pw=document.getElementById("popw"),pn=document.getElementById("panel");if(!pw||!pn||pw.classList.contains("j59dock"))return;
 pn.parentNode.insertBefore(pw,pn);pw.classList.add("j59dock");
 pw.addEventListener("click",e=>{const st=document.getElementById("stage");const f=st&&st.onclick;if(typeof f==="function")f.call(st,e)})}catch(e){}}
j59dock();
/* ---------- PERSONAL NAMES (owner 11/15 07:30Z): a post is never a name. Line 1 of the chip = the post ("Tổng quản Kính sự phòng"),
   line 2 = a real personal name. Court officers without one get a stable cổ trang name, unique in this life, saved in S.court (old saves
   get theirs on the first render after loading); the stage, the person card and every dialog read the same p.name. ---------- */
const J59SUR=["Lưu","Tô","Cao","Thôi","Đặng","Mã","Phùng","Lương","Tào","Viên","Hà","Khổng","Diêu","Phó","Lục","Tiền","Mạc","Đổng"];
const J59EUN=["Phúc An","Bảo Thuận","Đức Hải","Kính Trung","Trường An","Tiến Hỷ","Thủ Nghĩa","Lộc Toàn","Vĩnh Thọ","Ngọc Thành","Thuận Đức","Hỷ Lâm"];
const J59DOC=["Tế An","Thế Khanh","Hoài Nhân","Bá Ngôn","Tử Hiên","Văn Chiêu","Minh Viễn","Thừa Ân"];
const J59FAL=["Uyển Dung","Tố Tâm","Nhược Lan","Thục Hoa","Ngọc Dao","Tĩnh Nghi"];
function j59taken(){const T=new Set();const add=n=>{if(n)T.add(String(n).trim())};try{add(S.name);(rivals||[]).forEach(v=>add(v.name));(S.men||[]).forEach(m=>add(m.name));if(S.maid)add(S.maid.name);
 (rivals||[]).forEach(v=>(v.staff||[]).forEach(s=>add(s.name)));const C=S.court||{};for(const k in C)if(C[k]&&C[k].pn)add(C[k].pn)}catch(e){}return T}
function j59gen(sur,given){const T=j59taken();const L=[];for(const a of sur)for(const b of given)if(!T.has(a+" "+b))L.push(a+" "+b);return L.length?L[Math.floor(Math.random()*L.length)]:sur[0]+" "+given[0]}
function j59CourtNames(){/* was a second global kitNames (j65 owns that name for log lines and won, so court officers were never named; review/pick-hint-r1) */try{const C=S&&S.court;if(!C)return;
 if(C.tq&&!C.tq.pn){const n=String(C.tq.name||"").replace(/^Tổng quản\s+(thái giám\s+)?/i,"").trim();C.tq.pn=n&&n.split(" ").length>=2?n:j59gen(J59SUR,J59EUN)}
 if(C.ksp&&!C.ksp.pn)C.ksp.pn=j59gen(J59SUR,J59EUN);
 if(C.ped&&!C.ped.pn){const n=String(C.ped.name||"");C.ped.pn=n&&!/^Thái giám|Tổng quản/.test(n)?n:j59gen(J59SUR,J59EUN)}
 if(C.ty&&!C.ty.pn)C.ty.pn=j59gen(["Trương"],J59DOC);
 if(C.lcf&&C.lcf.pn&&!S.lcfPn)S.lcfPn=C.lcf.pn;if(C.lcf)delete C.lcf;if(!S.lcfPn)S.lcfPn=j59gen(["Lý"],J59FAL);
 /* the post stays in c.n; c.name becomes the personal name, so every reader (cards, the name table of j79, texts) sees the same name */
 for(const k of ["tq","ksp","ped","ty"])if(C[k]&&C[k].pn&&C[k].name!==C[k].pn)C[k].name=C[k].pn;
 const V=S.visit;if(V&&V.people)for(const p of V.people){if(!p)continue;const k=p.kind==="srv"?p.sk:p.kind;
  if(k==="ksp"&&C.ksp&&!p.ref)p.name=C.ksp.pn;else if(k==="peddler"&&C.ped&&!p.ref)p.name=C.ped.pn;else if(k==="ty"&&C.ty)p.name=C.ty.pn;else if(k==="fallen"&&!p.ref)p.name=S.lcfPn}}catch(e){}}
window.j59CourtNames=j59CourtNames;
/* ---------- ONE HEAD COUNT (owner 11/15 06:55Z): kitHereCount() = the OTHER people (not her, not a chest or an errand) on the stage
   of the place she stands in. The stage title ("Ở đây còn N người"), the page chips and the Dư đồ label of that place all read it;
   Dư đồ counts other people only (her own place wears her own mark). ---------- */
function kitHereCount(){try{const V=S&&S.visit;if(!V||V.k!==S.place)return 0;return (V.people||[]).filter(j59person).length}catch(e){return 0}}
window.kitHereCount=kitHereCount;
function kitHereMsg(){try{const V=S&&S.visit;if(!V)return;const m=String(V.msg||"").trim();if(m&&!/^(Ở đây (có|còn) \d+ người\.?|Không gặp ai\.?)$/.test(m))return;const n=kitHereCount();
 V.msg=n?`Ở đây còn ${n} người.`:"Không gặp ai."}catch(e){}}
const r0=renderStage;renderStage=function(){j59CourtNames();kitHereMsg();const r=r0.apply(this,arguments);try{j59lay()}catch(e){}return r};
/* every module has wrapped countAt by the time the game runs: the outermost wrap answers her own place from the stage itself */
/* the maid road (j42 srvVisitOf) fills a place by its own rules: the same rules count its other places for the Dư đồ, so the
   number on the map is the number she meets on arrival (audit: dev/test/stage-counts.js) */
function j59srvCount(k){const W=S.where||{},m=srvM();let n=0;if(k==="tgk")return 0;
 if(k==="home"){const mk=m&&palaceOf(m);if(W.emp===mk)n++;if(m&&srvWhere(m)===mk)n++;n+=Math.min(4,(m&&m.staff||[]).length);return n}
 if(W.emp===k)n++;n+=Math.min(4,liveRivals(true).filter(v=>srvWhere(v)===k).length);
 if(k[0]==="r"||k==="kn"){const hd=accHostK(k);n+=Math.min(2,(hd&&hd.staff||[]).length)}if(k==="tyv")n++;
 const MW=S.menW||{};for(const x of srvMen())if(MW[x.id]===k)n++;
 try{if(typeof menRoad==="function"&&menRoad())for(const c in (S.minW||{}))if(S.minW[c]===k)n++}catch(e){}return n}
setTimeout(()=>{try{const c0=countAt;countAt=function(k){try{if(S&&S.visit&&k===S.place&&S.visit.k===k)return kitHereCount();if(typeof isSrv==="function"&&isSrv())return j59srvCount(k);
  /* her palace: arriving there shows homePeople() (maid + children) — a visitor parked on "home" in S.where is not on that stage (reviewer: 2→1) */
  if(k==="home"&&!S.out&&typeof homePeople==="function")return homePeople().filter(j59person).length}catch(e){}return c0.apply(this,arguments)}}catch(e){}},0);
try{const st=document.getElementById("stage");if(st&&window.ResizeObserver)new ResizeObserver(j59sched).observe(st)}catch(e){}
addEventListener("resize",j59sched);
window.j59lay=j59lay;
})();
