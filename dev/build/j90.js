/* ================= j90 KIT PODIUM: bục vinh danh (owner 11/14, kit owner) =================
   Screen 1 of every ranking result: a stand-alone honour stage. The top three stand on a lacquered three-step dais as FULL-BODY
   figures (fig-*.webp for the right dress tier and age; kids from FIGURES-kids; strangers as the kit's grey silhouette):
   Nhất centre and highest, Nhì left, Tam right; medal + name with rank title + score + prize on the step.
   They appear one by one (Tam, Nhì, Nhất), rays turn behind Nhất, red-gold paper and plum petals burst, light sparkles;
   stronger when she takes Nhất. Tap skips the animation; prefers-reduced-motion shows the final state at once.
   "Tiếp" closes it and reveals screen 2 = the existing score board / result panel (unchanged).
   API (data only):
     kitPodium(list, o)        -> HTML of the stage (no overlay)
     kitPodiumShow(list, o)    -> mounts the overlay; o = {title, sub, next:"Tiếp", onNext()}; returns the element (null if < 2 entrants)
     list = [{who:person, score:75 | "75 phần", place:1, prize:"Phong Tần" | [["Sủng",8],["Danh",3]], sub:"Xuất sắc"}]  (sorted by place,
            else by score; only the first three stand on the dais; her own place is named under it when she is not in the top three)
     A Q item carrying a podium list (non-enumerable, `kitPodiumTag(item, list, o)`) shows the podium first, then the panel.
   Wired here for the whole group: every contest result of j82 startContest (j71 contests, festivals, lessons with rivals),
   Tranh ghế result (j34), hoàng tự exams (j53 .ktlist), công chúa dâng nghệ (j54 .h54list). */
KP_SEAL.honor="VINH DANH";
const KPOD_WORD=["Nhất","Nhì","Tam"];
function kitFigOf(p){try{if(!p)return"";if(!kitIsKnown(p)){const r=personRoleRank(p);return KIT_DIR+`unknown-fig-${r.kid?"k":r.sex==="m"?"m":"f"}.webp`}
 if(typeof allKids==="function"&&allKids().some(([k])=>k===p))return typeof kidFigSrc==="function"?kidFigSrc(p):"";
 if(typeof figFor!=="function")return"";return figFor(p===S?S:S&&p===S.emp?{kind:"emp"}:S&&p===S.thO?{kind:"th"}:{ref:p})||""}catch(e){return""}}
function kpodNorm(list){const L=(list||[]).filter(x=>x&&x.who).map(x=>Object.assign({},x));
 if(L.every(x=>x.place))L.sort((a,b)=>a.place-b.place);else{L.sort((a,b)=>(parseFloat(b.score)||0)-(parseFloat(a.score)||0));L.forEach((x,i)=>x.place=i+1)}return L}
function kpodPrize(pz){if(!pz)return"";if(typeof pz==="string")return `<span class="kpod-pz">${pz}</span>`;
 if(Array.isArray(pz))return `<span class="kchips">${pz.filter(x=>x&&x[1]).map(x=>kitChip(x[0],x[1])).join("")}</span>`;return""}
function kpodName(p){if(!p)return"";if(!kitIsKnown(p))return `<b class="kname" style="--rc:#7a7e84">Người lạ</b>`;return p===S?kitName(S,{named:true}):kitName(p)}
function kpodCol(x){const p=x.who,i=x.place-1,known=kitIsKnown(p),src=kitFigOf(p);
 const fig=src?`<img class="kpod-img${known?"":" kpod-unk"}" src="${src}" alt="" draggable="false" onerror="this.closest('.kpod-fig').classList.add('kpod-nofig')">`:"";
 const fb=`<span class="kpod-fb">${kitPortrait(p,{size:"lg"})}</span>`;
 const sc=x.score==null||x.score===""?"":typeof x.score==="number"?`${x.score} phần`:x.score;
 return `<div class="kpod-col kpod-p${i+1}${p===S?" kpod-me":""}" style="--d:${[1.8,1.0,.3][i]}s">`+
  `<div class="kpod-fig${src?"":" kpod-nofig"}">${fig}${fb}${p===S?`<span class="kpod-you">Ngươi</span>`:""}</div>`+
  `<div class="kpod-step"><span class="kpod-medal"><img src="${KIT_DIR}medal-${i+1}.webp" alt="" onerror="this.remove()"><b>${KPOD_WORD[i]}</b></span>`+
  `<span class="kpod-plq">${kpodName(p)}${x.sub?`<small class="kpod-sub">${x.sub}</small>`:""}${sc?`<small class="kpod-sc">${sc}</small>`:""}${kpodPrize(x.prize)}</span></div></div>`}
function kitPodium(list,o){o=o||{};const L=kpodNorm(list);const top=L.slice(0,3);const me=L.find(x=>x.who===S);
 const cols=[top[1],top[0],top[2]].filter(Boolean).map(kpodCol).join("");
 const mine=me&&me.place>3?`<div class="kpod-mine">${kitFaceH(S,"xs")}<span>Ngươi đứng thứ ${me.place} trong ${L.length} người${me.score!=null?` · ${typeof me.score==="number"?me.score+" phần":me.score}`:""}</span></div>`:"";
 return `<div class="kpod${me&&me.place===1?" kpod-win":""}${top.length<3?" kpod-n"+top.length:""}" role="dialog" aria-label="${KP_SEAL.honor}">`+
  `<div class="kpod-hd">${kpHeader("honor",o.title||"Bảng vinh danh",o.sub||"")}</div>`+
  `<div class="kpod-stage"><span class="kpod-rays" aria-hidden="true"></span><span class="kpod-halo" aria-hidden="true"></span>${cols}<span class="kpod-spark" aria-hidden="true">${"<i></i>".repeat(7)}</span></div>`+
  `<div class="kpod-ft">${mine}<button class="kbtn kpod-next">${o.next||"Tiếp"}</button></div><div class="kpod-fx" aria-hidden="true"></div></div>`}
function kpodReduced(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
/* layout: step heights from content (Nhất highest), figure height from the space left */
function kpodFit(root){try{const st=root.querySelector(".kpod-stage");if(!st)return;const cols=[...st.querySelectorAll(".kpod-col")];
 const steps=cols.map(c=>c.querySelector(".kpod-step"));steps.forEach(s=>s.style.height="auto");
 const H=st.clientHeight,lift=Math.round(Math.min(56,Math.max(22,H*.06)));const by=k=>{const c=st.querySelector(".kpod-p"+k);return c?c.querySelector(".kpod-step"):null};
 let prev=0,m=0;[3,2,1].forEach(k=>{const s=by(k);if(!s)return;const h=Math.max(s.offsetHeight,prev?prev+lift/2:0);s.style.height=h+"px";prev=h;m=Math.max(m,h)});
 const p1=st.querySelector(".kpod-p1");if(p1){const sr=st.getBoundingClientRect(),fr=p1.querySelector(".kpod-fig").getBoundingClientRect();root.style.setProperty("--krx",(fr.left-sr.left+fr.width/2)+"px")}
 const fh=Math.max(120,H-m-26);root.style.setProperty("--kfh",fh+"px");root.style.setProperty("--kstep",m+"px")}catch(e){}}
/* confetti: red/gold paper and plum petals, transform-only (Web Animations), cancelled on close/skip */
function kpodBurst(root,n,big){const fx=root.querySelector(".kpod-fx");const c=root.querySelector(".kpod-p1 .kpod-fig")||root;if(!fx||!c.getBoundingClientRect)return;
 const R=root.getBoundingClientRect(),r=c.getBoundingClientRect();const x0=r.left-R.left+r.width/2,y0=r.top-R.top+r.height*.35;const W=R.width,H=R.height;
 const COL=["#c23b22","#e0a526","#f0d070","#b0402c","#fff3c4","#d98a3a"],PET=["#f7c6d0","#fff0f3","#e48aa4","#f9dde4"];
 for(let i=0;i<n;i++){const s=document.createElement("i");const pet=Math.random()<.42;s.className=pet?"kpc kpc-pet":"kpc kpc-pap";s.style.background=pet?PET[i%PET.length]:COL[i%COL.length];
  const sz=pet?10+Math.random()*8:7+Math.random()*6;s.style.width=sz+"px";s.style.height=(pet?sz:sz*1.6)+"px";s.style.left=x0+"px";s.style.top=y0+"px";fx.appendChild(s);
  const a=-Math.PI/2+(Math.random()-.5)*Math.PI*(big?1.5:1.25),v=(big?.55:.42)*Math.min(W,H)*(.45+Math.random()*.7);
  const dx=Math.cos(a)*v,dy=Math.sin(a)*v,fall=H-y0+40,drift=(Math.random()-.5)*W*.25,rot=(Math.random()-.5)*900,d=2600+Math.random()*1800;
  const an=s.animate([{transform:"translate(-50%,-50%) rotate(0deg) scale(.6)",opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(${rot*.3}deg) scale(1)`,opacity:1,offset:.22},
   {transform:`translate(${dx+drift}px,${fall}px) rotate(${rot}deg) scale(.9)`,opacity:.15}],{duration:d,easing:"cubic-bezier(.15,.6,.35,1)",fill:"forwards"});
  an.onfinish=()=>s.remove()}}
function kpodRain(root,ms){const fx=root.querySelector(".kpod-fx");if(!fx)return;const t0=Date.now();const W=fx.clientWidth,H=fx.clientHeight;
 const id=setInterval(()=>{if(!root.isConnected||Date.now()-t0>ms||root.classList.contains("kpod-skip")){clearInterval(id);return}
  const s=document.createElement("i");s.className="kpc kpc-pet";s.style.background=["#f7c6d0","#fff0f3","#e48aa4"][Math.floor(Math.random()*3)];const sz=8+Math.random()*6;s.style.width=s.style.height=sz+"px";
  s.style.left=(Math.random()*W)+"px";s.style.top="-12px";fx.appendChild(s);const an=s.animate([{transform:"translate(0,0) rotate(0deg)",opacity:.95},{transform:`translate(${(Math.random()-.5)*120}px,${H+30}px) rotate(${(Math.random()-.5)*540}deg)`,opacity:.2}],{duration:5000+Math.random()*2500,easing:"linear",fill:"forwards"});an.onfinish=()=>s.remove()},380)}
function kitPodiumShow(list,o){o=o||{};const L=kpodNorm(list);if(L.length<2)return null;kitPodiumClose(true);
 const ov=document.createElement("div");ov.id="kpodov";ov.innerHTML=kitPodium(L,o);document.body.appendChild(ov);const root=ov.firstElementChild;
 const red=kpodReduced();if(red)root.classList.add("kpod-skip","kpod-red");const fit=()=>kpodFit(root);fit();
 [...root.querySelectorAll(".kpod-img")].forEach(im=>{if(!im.complete)im.addEventListener("load",fit,{once:true})});
 const onR=()=>fit();addEventListener("resize",onR);ov.__off=()=>removeEventListener("resize",onR);
 const timers=[];const win=root.classList.contains("kpod-win");
 if(!red){timers.push(setTimeout(()=>kpodBurst(root,win?110:64,win),2050));if(win){timers.push(setTimeout(()=>kpodBurst(root,70,true),2900));timers.push(setTimeout(()=>kpodRain(root,7000),2300))}else timers.push(setTimeout(()=>kpodRain(root,3800),2600))}
 const skip=()=>{if(root.classList.contains("kpod-skip"))return;root.classList.add("kpod-skip");timers.forEach(clearTimeout);root.querySelectorAll(".kpc").forEach(e=>{try{e.getAnimations().forEach(a=>a.cancel())}catch(x){}e.remove()})};
 ov.__skip=skip;const next=()=>{kitPodiumClose();try{if(o.onNext)o.onNext()}catch(e){console.error(e)}};
 root.addEventListener("click",e=>{if(e.target.closest(".kpod-next"))return next();skip()});
 ov.__key=e=>{if(e.key==="Escape"||e.key==="Enter"){e.preventDefault();if(!root.classList.contains("kpod-skip"))skip();else next()}};addEventListener("keydown",ov.__key);
 try{root.querySelector(".kpod-next").focus({preventScroll:true})}catch(e){}window.kaLastPodium={title:o.title,list:L.map(x=>({place:x.place,name:x.who===S?"me":x.who.name,score:x.score}))};return ov}
function kitPodiumClose(silent){const ov=document.getElementById("kpodov");if(!ov)return;try{ov.__off&&ov.__off();removeEventListener("keydown",ov.__key)}catch(e){}ov.remove()}
/* Q items: attach without making the save heavier (non-enumerable, never serialised) */
function kitPodiumTag(m,list,o){try{Object.defineProperty(m,"__pod",{value:{list,o:o||{}},enumerable:false,configurable:true,writable:true})}catch(e){}return m}
window.kitPodium=kitPodium;window.kitPodiumShow=kitPodiumShow;window.kitPodiumClose=kitPodiumClose;window.kitPodiumTag=kitPodiumTag;window.kitFigOf=kitFigOf;

/* ---------- wiring 1: j82 startContest (every contest that plays the mini-game; j71 contests go through it) ---------- */
(function(){if(typeof startContest!=="function"||typeof kitGameResult!=="function")return;let cur=null,pend=null;
 const s0=startContest;startContest=function(o){cur=o||{};pend=null;return s0.apply(this,arguments)};window.startContest=startContest;
 const g0=kitGameResult;kitGameResult=function(r){try{if(r&&r.rivals&&r.rivals.length>=2&&cur)pend={r,o:cur}}catch(e){}return g0.apply(this,arguments)};
 if(typeof kg82ShowRes!=="function")return;const h0=kg82ShowRes;kg82ShowRes=function(){const out=h0.apply(this,arguments);try{if(pend&&KG82.phase==="result"){const {r,o}=pend;pend=null;
  const st=o.stakes||null,nm=x=>typeof kg82Norm==="function"?kg82Norm(x).filter(y=>y[1]>0):[];
  const list=r.rivals.slice().sort((a,b)=>b.score-a.score).map((x,i)=>({who:x.who,score:x.score,place:i+1,
   prize:st?(i===0?nm(st.win):i<3?nm(st.top3):null):(x.who===S&&r.gains&&r.gains.length?r.gains:null)}));
  const t=document.querySelector("#kg82 .kptitle");kitPodiumShow(list,{title:t?t.textContent:(o.title||"Hội thi"),sub:o.artName?`Môn ${o.artName}`:"",
   onNext:()=>{const b=document.getElementById("kg82ok");if(b)try{b.focus({preventScroll:true})}catch(e){}}})}}catch(e){console.error(e)}return out};
 const c0=typeof kg82Close==="function"?kg82Close:null;if(c0){kg82Close=function(){kitPodiumClose(true);return c0.apply(this,arguments)}}})();

/* ---------- wiring 2: Q items (Tranh ghế, hoàng tự exams, công chúa dâng nghệ): podium first, then the panel ---------- */
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0];if(!m||m.__podDone)return r;
  if(!m.__pod)kpodFromItem(m);if(m.__pod){Object.defineProperty(m,"__podDone",{value:1,enumerable:false,configurable:true});const P=m.__pod;
   if(!kitPodiumShow(P.list,Object.assign({title:m.t},P.o)))return r}}catch(e){console.error(e)}return r}})();
/* boards that exist only as HTML rows (j53 .ktr, j54 .h54r): rows are already in rank order; find the child by name */
function kpodFromItem(m){if(!m||typeof m.h!=="string"||!/class="(ktlist|h54list)"/.test(m.h)||typeof allKids!=="function")return;
 const d=document.createElement("div");d.innerHTML=m.h;const rows=[...d.querySelectorAll(".ktr,.h54r")];const K=allKids().map(([k])=>k).sort((a,b)=>String(b.name||"").length-String(a.name||"").length);
 const list=[];for(const row of rows){const sp=row.querySelector(":scope > span");const st=row.querySelector(":scope > b");const txt=(sp&&sp.textContent||"");const sw=st?st.textContent.trim():"";
  if(/Ở nhà/.test(sw))continue;const k=K.find(x=>x.name&&txt.includes(x.name)&&!list.some(y=>y.who===x));if(!k)continue;const sm=row.querySelector(":scope > small");
  list.push({who:k,place:list.length+1,sub:sw.replace(/^Đứng đầu · /,""),prize:sm&&sm.innerHTML.trim()?`<span class="kpod-fx2">${sm.innerHTML}</span>`:null})}
 if(list.length>=2)kitPodiumTag(m,list,{sub:"Bảng vinh danh"})}
/* Tranh ghế (j34): the seat goes to Nhất; scores = the three weighted rounds */
(function(){if(typeof contestEnd!=="function")return;const e0=contestEnd;contestEnd=function(){const c=S&&S.contest;let L=null;try{if(c&&c.c.includes("me")&&!quiet){
  const C=c.c.map(byKey).filter(p=>p&&(p===S||p.alive)&&!p.out&&!c.dq.includes(key(p))&&rkOf(p)===c.r-1);const tot=p=>(c.sc[key(p)]||[]).reduce((a,b,i)=>a+(b||0)*crW(i),0);
  C.sort((a,b)=>tot(b)-tot(a)||(b.sung||0)-(a.sung||0));L=C.map((p,i)=>({who:p,place:i+1,score:`${Math.round(tot(p)*10)/10} phần`,prize:i===0?(c.r===7?"Lập làm Hoàng hậu":`Phong ${RANKS[c.r].n}`):null}))}}catch(e){L=null}
 const r=e0.apply(this,arguments);try{if(L&&L.length>=2){const m=Q.slice().reverse().find(x=>x&&x.t==="Kết quả tranh ghế"&&!x.__pod);if(m)kitPodiumTag(m,L,{sub:"Tranh ghế"})}}catch(e){}return r}})();

/* ---------- kit CSS (tokens of j79; art img/kit/podium-bg, podium-step, medal-1..3) ---------- */
(function(){const st=document.createElement("style");st.id="kit90";st.textContent=`
#kpodov{position:fixed;inset:0;z-index:9000;display:flex;align-items:stretch;justify-content:center;background:#2a1a12b8}
.kpod{position:relative;width:100%;max-width:1100px;height:100%;display:grid;grid-template-rows:auto minmax(0,1fr) auto;overflow:hidden;
 background:linear-gradient(#fffaf022,#f5ecdc55 70%,#f5ecdcd0),url(img/kit/podium-bg.webp) center top/cover no-repeat,var(--bg);box-shadow:0 0 0 1px #c9a46a,0 14px 40px #2a1a1270;
 padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);user-select:none;-webkit-user-select:none;cursor:pointer}
.kpod-hd{display:flex;justify-content:center;padding:12px 12px 0}.kpod-hd .kph{display:inline-flex;align-items:center;gap:10px;max-width:100%;padding:8px 16px;border:1px solid var(--line);border-radius:var(--k-rad);
 background:linear-gradient(#f6ead6ee,#fffaf0f2),url(img/kit/bg-default.webp) center/240px repeat;box-shadow:0 2px 10px #5a3a2030}
.kpod-hd .kptitle{font-family:var(--display);font-weight:700;color:var(--gold);font-size:1.05rem;line-height:1.25}.kpod-hd .kpsub{display:block;font-size:.74rem;color:var(--dim)}
.kpseal.kp-honor{background:linear-gradient(#c9952a,#a8781c);border-color:#6e4d0e}
.kpod-stage{position:relative;display:flex;align-items:flex-end;justify-content:center;gap:clamp(4px,1.6vw,22px);padding:8px clamp(8px,2.5vw,32px) 0;min-height:0}
.kpod-col{position:relative;flex:1 1 0;min-width:0;max-width:300px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;
 animation:kpodRise .7s cubic-bezier(.2,.9,.3,1.25) var(--d) both}
.kpod-p1{max-width:330px;z-index:2}.kpod-p2,.kpod-p3{z-index:1}
.kpod-fig{position:relative;width:100%;height:calc(var(--kfh,300px) * .84);display:flex;justify-content:center;align-items:flex-end;margin-bottom:-6px;z-index:2;
 animation:kpodFig .8s ease-out calc(var(--d) + .25s) both}
.kpod-p1 .kpod-fig{height:var(--kfh,300px)}
.kpod-img{height:100%;width:100%;object-fit:contain;object-position:50% 100%;filter:drop-shadow(0 6px 10px #5a3a2050);pointer-events:none}
.kpod-img.kpod-unk{opacity:.92}
.kpod-fb{display:none;height:100%;align-items:flex-end;justify-content:center}.kpod-nofig .kpod-img{display:none}.kpod-nofig .kpod-fb{display:flex}
.kpod-fb .pfwrap{height:96%;display:flex;flex-direction:column;align-items:center}.kpod-fb .pcp.kit{height:100%;width:auto!important;max-width:100%}.kpod-fb .pfrw{display:none}
.kpod-me .kpod-fig::before{content:"";position:absolute;left:50%;bottom:2%;width:70%;height:16%;transform:translateX(-50%);border-radius:50%;background:radial-gradient(#fff3c4,#f0d07000 70%);z-index:-1}
.kpod-you{position:absolute;left:50%;bottom:6%;transform:translateX(-50%);font-family:var(--display);font-weight:700;font-size:.72rem;color:#5a3a10;background:#fff3c4;border:1px solid #a8740c;border-radius:10px;padding:1px 9px;white-space:nowrap;box-shadow:0 0 0 3px #fff3c466}
.kpod-step{position:relative;width:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:4px;padding:0 6px 10px;
 border:solid transparent;border-width:14px 8px 8px;border-image:url(img/kit/podium-step.webp) 34 14 14 fill / 14px 8px 8px stretch;background:#a8301f;background-clip:padding-box;
 box-shadow:0 10px 18px #3a1a1050;animation:kpodStep .55s ease-out var(--d) both}
.kpod-medal{position:relative;width:clamp(48px,9vw,84px);margin-top:calc(clamp(48px,9vw,84px) * -.55);flex:none;filter:drop-shadow(0 3px 4px #3a1a1070)}
.kpod-p1 .kpod-medal{width:clamp(56px,11vw,100px);margin-top:calc(clamp(56px,11vw,100px) * -.55)}
.kpod-medal img{display:block;width:100%;height:auto}
.kpod-medal b{position:absolute;left:0;right:0;top:39.6%;transform:translateY(-50%);text-align:center;font-family:var(--display);font-weight:800;font-size:clamp(.82rem,1.9vw,1.25rem);line-height:1;color:#5a3010;text-shadow:0 1px 0 #fff8e0a0}
.kpod-p1 .kpod-medal b{font-size:clamp(.95rem,2.3vw,1.5rem)}
.kpod-plq{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;box-sizing:border-box;text-align:center;background:#fffaf0f2;border:1px solid #c9a46a;border-radius:6px;
 padding:5px 6px;box-shadow:inset 0 0 0 1px #ffffff80;overflow-wrap:anywhere}
.kpod-plq .kname{font-size:clamp(.74rem,1.6vw,.92rem);line-height:1.25}.kpod-plq .kti{display:block;font-size:.86em;font-weight:600}
.kpod-sub,.kpod-sc{display:block;font-size:.7rem;color:var(--dim);line-height:1.25}.kpod-sc{font-weight:700;color:var(--ink)}
.kpod-plq .kchips{display:flex;flex-wrap:wrap;justify-content:center;gap:3px}.kpod-plq .kchips .chip,.kpod-plq .kchip{font-size:.68rem}
.kpod-pz{font-size:.74rem;font-weight:700;color:var(--good)}.kpod-fx2{font-size:.68rem}.kpod-fx2 .g{color:var(--good);font-weight:700}.kpod-fx2 .r{color:var(--bad);font-weight:700}
.kpod-rays{position:absolute;left:var(--krx,50%);top:calc(100% - var(--kstep,200px) - var(--kfh,300px) * .58);width:calc(var(--kfh,300px) * 1.5);aspect-ratio:1;transform:translate(-50%,-50%);z-index:0;pointer-events:none;border-radius:50%;
 background:repeating-conic-gradient(from 0deg,#f0d070a8 0deg 7deg,#f0d07000 7deg 22deg);-webkit-mask-image:radial-gradient(circle,#000 18%,transparent 68%);mask-image:radial-gradient(circle,#000 18%,transparent 68%);
 animation:kpodFade .9s ease-out 2s both,kpodSpin 22s linear 2s infinite}
.kpod-halo{position:absolute;left:var(--krx,50%);top:calc(100% - var(--kstep,200px) - var(--kfh,300px) * .58);width:calc(var(--kfh,300px) * .9);aspect-ratio:1;transform:translate(-50%,-50%);z-index:0;border-radius:50%;pointer-events:none;
 background:radial-gradient(circle,#fff6d0 0,#f0d070a0 30%,#f0d07000 68%);animation:kpodFade .8s ease-out 1.9s both,kpodPulse 3.2s ease-in-out 2.7s infinite}
.kpod-win .kpod-rays{background:repeating-conic-gradient(from 0deg,#f0d070d0 0deg 8deg,#f0d07000 8deg 20deg);width:calc(var(--kfh,300px) * 1.8);animation:kpodFade .9s ease-out 2s both,kpodSpin 14s linear 2s infinite}
.kpod-spark{position:absolute;inset:0;pointer-events:none;z-index:3}
.kpod-spark i{position:absolute;width:14px;height:14px;background:radial-gradient(circle,#fffbe8 0 18%,transparent 22%),conic-gradient(from 45deg,transparent 0 40deg,#fff3c4 45deg,transparent 50deg 130deg,#fff3c4 135deg,transparent 140deg 220deg,#fff3c4 225deg,transparent 230deg 310deg,#fff3c4 315deg,transparent 320deg);
 opacity:0;animation:kpodTw 2.4s ease-in-out infinite}
.kpod-spark i:nth-child(1){left:42%;top:12%;animation-delay:2.2s}.kpod-spark i:nth-child(2){left:57%;top:18%;animation-delay:2.7s}.kpod-spark i:nth-child(3){left:46%;top:34%;animation-delay:3.1s}
.kpod-spark i:nth-child(4){left:60%;top:40%;animation-delay:2.4s}.kpod-spark i:nth-child(5){left:38%;top:26%;animation-delay:3.4s}.kpod-spark i:nth-child(6){left:24%;top:46%;animation-delay:2.9s}.kpod-spark i:nth-child(7){left:75%;top:50%;animation-delay:3.6s}
.kpod-ft{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 12px 14px;background:linear-gradient(#f5ecdc00,#f5ecdcf0 40%)}
.kpod-next{min-width:180px;font-size:1rem;cursor:pointer}
.kpod-mine{display:flex;align-items:center;gap:6px;font-size:.8rem;color:var(--ink);background:#fffaf0e8;border:1px solid var(--k-hair);border-radius:var(--k-rad);padding:3px 10px}
.kpod-fx{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:5}
.kpc{position:absolute;display:block;will-change:transform,opacity}.kpc-pap{border-radius:1px}.kpc-pet{border-radius:70% 0 70% 0;box-shadow:inset 0 0 0 1px #ffffff60}
.kpod-skip .kpod-col,.kpod-skip .kpod-fig,.kpod-skip .kpod-step{animation:none!important}
.kpod-skip .kpod-rays{animation:kpodSpin 22s linear infinite}.kpod-skip.kpod-win .kpod-rays{animation:kpodSpin 14s linear infinite}.kpod-skip .kpod-halo{animation:kpodPulse 3.2s ease-in-out infinite}
.kpod-skip .kpod-spark i{animation-delay:0s}
.kpod-red .kpod-rays,.kpod-red .kpod-halo,.kpod-red .kpod-spark i{animation:none!important}.kpod-red .kpod-spark{display:none}
@keyframes kpodRise{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:none}}
@keyframes kpodStep{from{transform:scaleY(.2);transform-origin:50% 100%}to{transform:none;transform-origin:50% 100%}}
@keyframes kpodFig{from{opacity:0;transform:translateY(24px) scale(.94)}to{opacity:1;transform:none}}
@keyframes kpodFade{from{opacity:0}to{opacity:1}}
@keyframes kpodSpin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes kpodPulse{0%,100%{opacity:.85}50%{opacity:1}}
@keyframes kpodTw{0%,100%{opacity:0;transform:scale(.4) rotate(0deg)}50%{opacity:1;transform:scale(1.15) rotate(45deg)}}
@media (prefers-reduced-motion:reduce){.kpod-col,.kpod-fig,.kpod-step,.kpod-rays,.kpod-halo,.kpod-spark i{animation:none!important}.kpod-spark{display:none}}
@media (max-width:599px){.kpod-hd{padding:8px 8px 0}.kpod-hd .kptitle{font-size:.95rem}.kpod-step{padding:0 3px 8px;border-width:12px 6px 6px}.kpod-plq{padding:4px 3px}.kpod-plq .kname{font-size:.72rem}}
@media (orientation:landscape) and (max-height:820px){.kpod-hd{padding-top:8px}.kpod-ft{padding:6px 12px 10px}}
`;document.head.appendChild(st)})();
