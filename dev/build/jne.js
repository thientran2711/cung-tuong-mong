/* ================= jne: NIGHT-END + NEW-DAY PICTURES (KIT §62, owner 15/11 19:35Z, review/night-end) =================
   (1) kitNightEnd(o) — after HER bedding night (j8 nightFx → pillow talk → j75 result) ONE closing card replaces the night's result toast:
       a picture of the night's MOOD (never the bedding itself, no faces): mặn nồng (warm) · êm đềm (normal) · lạnh nhạt (cold),
       his mood before → after (liked / did not like), the real Được / Mất rows of the night (kaResultRows: Sủng, Ân tình before → after …),
       the Kèm row (jealousy), and the reward he gave (the bestow tray is held during the night and shown here; on close the items fly to
       the Tư trang tab with kitFlyItem). Sound + light by tier (BAL.nightEnd.fx). Tier rule = BAL.nightEnd (below), from real state only.
   (2) kitNewDay(o) — when a tuần begins and she had NO bedding night in the tuần that just ended, the week panel (#dawn, j18) first plays a
       short picture: the lonely night (không được triệu: he went elsewhere / flipped no card / took her tablet but she did not serve; or
       "theo lệ" — mùng một / rằm at the Empress's palace), then the dawn of the SEASON (xuân / hạ / thu / đông) — on a festival day the
       festival's own picture (img/ev-fest-<k>-b.webp, the 14 festival paintings) — with the day's weather drifting over it (kitWxEffects
       weather → petals / rain / snow / leaves / fireflies). Tap = skip to the week panel. Reduced motion: still pictures, no particles.
   Both are kit motion pieces (j93 kmStage / the week panel) — no private frames; rows = kitRows (§51), items = kitItem + kitGradeChip.
   No new save state (old saves load unchanged). */
Object.assign(BAL,{nightEnd:{
 /* tier points = s (the night's own score from j8 night1: prep q + talk fit + his mood [+1,0,−1,−2] + luck 0..2, −2 if an over-rank
    piece was confiscated) + her toilette today (jtoil makeup: tuyệt/đẹp +1, vụng/diêm dúa −1) + talk (−2 when the pillow talk lost her
    Sủng or Ân tình) + illness (−2 when she is ill). warm ≥ warm, normal ≥ normal, else cold. */
 warm:6,normal:3,toil:{tuyet:1,dep:1,vua:0,moc:0,vung:-1,diem:-1},talkBad:-2,ill:-2,
 /* his mood after the night (S.emp.mood 0 vui … 3 giận dữ): warm → one step better; cold → one step worse (never to giận dữ) */
 mood:{warm:-1,normal:0,cold:1},moodCap:2,
 /* lonely beat + dawn picture timings (ms); night card list shows after `list` */
 lonelyMs:2200,dawnMs:2400,list:900}});
(function(){
const NE=BAL.nightEnd;const DIR="img/kit/";
const TIER={warm:{t:"Đêm mặn nồng",pic:"ne-night-warm",liked:"ngài hài lòng"},normal:{t:"Đêm êm đềm",pic:"ne-night-normal",liked:"ngài bình thản"},
 cold:{t:"Đêm lạnh nhạt",pic:"ne-night-cold",liked:"ngài không vui"},lonely:{t:"Đêm không được triệu",pic:"ne-night-lonely"},custom:{t:"Đêm theo lệ",pic:"ne-night-lonely"}};
const SEAK={"Xuân":"xuan","Hạ":"ha","Thu":"thu","Đông":"dong"};
const SEAN={xuan:"mùa xuân",ha:"mùa hạ",thu:"mùa thu",dong:"mùa đông"};
/* sounds: kitSfx (review/sfx jsfx mixer) when present, else j11 sfx(file) */
function snd(n,at){const go=()=>{try{if(window.__bot)return;if(typeof kitSfx==="function")kitSfx(n);else if(typeof sfx==="function")sfx(n)}catch(e){}};if(at)setTimeout(go,at);else go()}
const SND={warm:[["sfx-zither",0],["vo-f-laugh-soft-1",700]],normal:[["sfx-wx-crickets",0],["sfx-night",900]],cold:[["sfx-candle-out",200],["vo-f-sigh-1",900]],
 lonely:[["sfx-night-watch",0],["sfx-wind",600]],custom:[["sfx-night-watch",0],["sfx-wind",600]],
 xuan:[["sfx-wx-birds",300]],ha:[["sfx-wx-birds",300]],thu:[["sfx-wx-birds",300]],dong:[["sfx-wind",300]],fest:[["sfx-wx-birds",300]]};
function play(k){(SND[k]||[]).forEach(([n,at])=>snd(n,at))}
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const red=()=>{try{return typeof kmReduced==="function"?kmReduced():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
/* light FX layers by kind: petals / candle glow / guttering + moonlight / lantern dimming + wind leaves / sun rise; weather particles */
function parts(src,n,cls){let h="";for(let i=0;i<n;i++)h+=`<img class="${cls}" src="${DIR}${src}.webp" alt="" draggable="false" style="--x:${(i*37+11)%96}%;--d:${((i*.53)%2.4).toFixed(2)}s;--s:${(.55+((i*29)%45)/100).toFixed(2)};--r:${(i*67)%360}deg;--w:${((i%5)-2)*22}px">`;return h}
function dots(n,cls){let h="";for(let i=0;i<n;i++)h+=`<i class="${cls}" style="--x:${(i*41+7)%98}%;--y:${(i*23+13)%80}%;--d:${((i*.37)%2.2).toFixed(2)}s;--s:${(.6+((i*31)%50)/100).toFixed(2)}"></i>`;return h}
function fxHTML(k){if(red())return"";
 if(k==="warm")return `<i class="kne-glow kne-red"></i>${parts("mo-petal-peach",12,"kne-fall")}`;
 if(k==="normal")return `<i class="kne-glow kne-amber"></i>${dots(8,"kne-fly")}`;
 if(k==="cold")return `<i class="kne-glow kne-gutter"></i><i class="kne-moon"></i>`;
 if(k==="lonely"||k==="custom")return `<i class="kne-glow kne-lantern"></i>${parts("mo-leaf-dry",7,"kne-wind")}`;
 return `<i class="kne-sun"></i>`}
function wxHTML(w){if(red()||!w)return"";const n=w.n||"";
 if(/hoa đào/.test(n))return parts("mo-petal-peach",10,"kne-fall");if(/mai nở/.test(n))return parts("mo-petal-plum",10,"kne-fall");
 if(/lá phong|heo may/.test(n))return parts("mo-leaf-maple",8,"kne-fall");if(/tuyết|sương giá/.test(n))return dots(22,"kne-snow");
 if(/mưa|giông/.test(n))return dots(26,"kne-rain");if(/đom đóm/.test(n))return dots(10,"kne-fly");return""}
const PRE={};function preload(src){if(!src||PRE[src])return PRE[src];const im=new Image();PRE[src]=new Promise(r=>{im.onload=im.onerror=()=>r();setTimeout(r,1800)});im.src=src;return PRE[src]}
function picHTML(src,k,extra){return `<div class="kne-pic"><img class="kne-img" src="${src}" alt="" draggable="false">${fxHTML(k)}${extra||""}</div>`}

/* ---------- (1) the night card ---------- */
function moodRow(m0,m1,tier){const W=MOODS;const a=W[m0]?W[m0][0]:"",b=W[m1]?W[m1][0]:"";
 return [`${a}${m1!==m0?` → ${b}`:""} · ${TIER[tier].liked}`,m1<m0?"g":m1>m0?"r":"n"]}
/* kitNightEnd({tier, m0, m1, before, items:[inv entries], line}) — before = the night's rsnap (j75 __nsnap) */
function kitNightEnd(o){o=o||{};const T=TIER[o.tier]||TIER.normal;let G=[],B=[],K=[];try{[G,B,K]=kaResultRows(o.before)}catch(e){}
 const [mv,mc]=moodRow(o.m0,o.m1,o.tier);
 const rows=[["Hoàng thượng",mv,mc]];if(G.length)rows.push(["Được",G,"g"]);if(B.length)rows.push(["Mất",B,"r"]);
 let tb=kitRows(rows);try{const kem=kitKemRow(K);if(kem)tb=tb.replace(/<\/span>$/,kem+"</span>")}catch(e){}
 const items=(o.items||[]).map(e=>{let I={};try{I=kitItemInfo(e)}catch(x){}return `<div class="kmrow kne-it">${typeof kitItem==="function"?kitItem({src:I.src,name:"",grade:I.grade||0,size:"sm",tip:I.name}).replace('<span class="kitn"></span>',""):""}${typeof kitGradeChip==="function"?kitGradeChip(I.grade||0,{size:"sm"}):""}<b>${esc(I.name||"")}</b><small>Hoàng thượng ban</small></div>`}).join("");
 const html=`<div class="kne kne-${o.tier}">${picHTML(DIR+T.pic+".webp",o.tier)}<div class="kne-side"><div class="kne-cap"><b>${T.t}</b>${o.line?`<small>${esc(o.line)}</small>`:""}</div>
  <div class="kmlist">${tb}${items}<button class="kbtn kmtake" data-km-close>${items?"Nhận":"Tiếp tục"}</button></div></div></div>`;
 const keys=(o.items||[]).map(e=>e.k);
 kmPush(done=>preload(DIR+T.pic+".webp").then(()=>{const st=kmStage("kne-ov",html,{manual:true,dur:60000,onEnd:()=>{keys.forEach((k,i)=>setTimeout(()=>{try{kitFlyItem(k)}catch(e){}},i*180));done()}});
  const root=st.ov.querySelector(".kne");st.ov.id="kneov";play(o.tier);
  const fin=()=>{root.classList.add("km-done");st.finish()};st.later(red()?0:NE.list,fin);
  st.ov.addEventListener("click",e=>{if(e.target.closest("[data-km-close]"))return;if(!root.classList.contains("km-done"))fin();else if(!e.target.closest(".kmlist"))st.close()})}))}

/* the night's state, read at its real moments */
let N=null;
const ns0=nightScene;nightScene=function(){const r=ns0.apply(this,arguments);try{if(S&&S.tonight==="me"&&window.__nsnap)N={m0:S.emp.mood,inv:S.inv.length}}catch(e){}return r};
const nf0=nightFx;nightFx=function(s){if(!N)N={m0:S.emp.mood,inv:S.inv.length};N.s=s;const a0=S.sung,b0=S.an||0;window.__kneHold=1;const r=nf0.apply(this,arguments);N.sung=S.sung;N.an=S.an||0;N.g=S.sung-a0;return r};
function tierOf(){const P=N||{};let pts=P.s||0;const why=[`đêm ${pts}`];
 try{const t=typeof toilToday==="function"?toilToday(S):null;const v=t?NE.toil[t.makeup]||0:0;if(v){pts+=v;why.push(`điểm trang ${v>0?"+":""}${v}`)}}catch(e){}
 if(P.sung!=null&&((S.sung<P.sung)||((S.an||0)<P.an))){pts+=NE.talkBad;why.push(`lời gối đầu ${NE.talkBad}`)}
 try{if(typeof illOf==="function"&&illOf(S)){pts+=NE.ill;why.push(`đang bệnh ${NE.ill}`)}}catch(e){}
 return{tier:pts>=NE.warm?"warm":pts>=NE.normal?"normal":"cold",pts,why}}
/* hold the bestow tray during her night: the card shows the reward */
const HELD=[];{const kr=window.kitReward;if(typeof kr==="function"){window.kitReward=function(spec){if(window.__kneHold){HELD.push(spec);return}return kr.apply(this,arguments)};kitReward=window.kitReward}}
function release(){window.__kneHold=0;const L=HELD.splice(0);L.forEach(x=>{try{kitReward(x)}catch(e){}})}
/* the option's own result toast during her night is dropped: the night card shows the whole night (before = the night's start) */
const rs0=resultShow;resultShow=function(title,before){if(title!=="Đêm thị tẩm"&&(window.__kneHold||window.__kneMute)&&!window.__bot)return;if(title==="Đêm thị tẩm"&&N&&S&&!S.dead){try{
  /* game rule first (bots / no-UI too, so balance runs see the same mood step), then the card */
  const T=tierOf();const m0=N.m0!=null?N.m0:S.emp.mood;const dm=NE.mood[T.tier]||0;let m1=S.emp.mood;if(dm<0)m1=Math.max(0,m1+dm);else if(dm>0&&m1<NE.moodCap)m1=Math.min(NE.moodCap,m1+dm);S.emp.mood=m1;
  if(window.__bot||typeof kmPush!=="function"){N=null;HELD.length=0;window.__kneHold=0;return rs0.apply(this,arguments)}
  const items=S.inv.slice(N.inv).filter(e=>e&&e.from==="emp");HELD.length=0;window.__kneHold=0;
  window.kneLast={tier:T.tier,pts:T.pts,why:T.why,m0,m1,items:items.map(e=>e.k)};
  const line=T.tier==="warm"?"Nến đỏ cháy suốt canh khuya, tiếng đàn còn vương bên gối.":T.tier==="cold"?"Ngọn nến lụi dần, trăng lạnh soi qua song cửa.":"Côn trùng rỉ rả ngoài hiên, ngọn nến lặng lẽ cháy tới sáng.";
  N=null;window.__kneMute=1;setTimeout(()=>{window.__kneMute=0},600);kitNightEnd({tier:T.tier,m0,m1,before,items,line});return}catch(e){console.error(e)}}
 return rs0.apply(this,arguments)};
const cm0=chooseM;chooseM=function(){const r=cm0.apply(this,arguments);if(window.__kneHold)release();return r};

/* ---------- (2) the lonely night + the new day, inside the week panel ---------- */
let PREV=null;
const et0=endTurn;endTurn=function(){let p=null;try{if(S&&!S.dead){const w=wk();const nw=S.nightWhy&&S.nightWhy.wk===w?S.nightWhy:null;const tk=S.ntk&&S.ntk.w===w?S.ntk:null;
  p={w,bedded:(S.nightLog||[]).includes(w),nw,tk,srv:typeof isSrv==="function"&&isSrv(),out:!!S.out}}}catch(e){}
 PREV=p;return et0.apply(this,arguments)};
/* the stranger rule (j61 / j63 kaNamed): a consort she has not met is never named */
function whoOf(id,nm){const v=(typeof rivals!=="undefined"?rivals:[]).find(x=>x.id===id);if(!v)return nm||"";let ok=true;try{ok=typeof kaNamed!=="function"||kaNamed(v)}catch(e){}
 return ok?`${RANKS[v.rank]?RANKS[v.rank].n+" ":""}${v.name}`:""}
function lonelyOf(p){if(!p||p.bedded||p.srv)return null;const nw=p.nw||{},tk=p.tk;
 if(p.out)return{k:"lonely",line:"Lãnh cung đêm dài, chỉ có tiếng mõ canh và gió lùa."};
 if(nw.cause==="custom")return{k:"custom",line:`Hôm ấy là ${nw.day||"ngày lệ"}: theo lệ, Hoàng thượng nghỉ ở cung Hoàng hậu.`};
 if(tk&&tk.who!=="me")return{k:"lonely",line:`Đêm qua Hoàng thượng nghỉ ở cung ${whoOf(tk.who,tk.nm)||"khác"}.`};
 if(nw.pick==="me")return{k:"lonely",line:"Thẻ bài của ngươi được lật, nhưng đêm qua ngươi không hầu giá."};
 if(nw.cause==="stolen")return{k:"lonely",line:"Hoàng thượng bị mời sang cung khác giữa đường."};
 if(nw.pick)return{k:"lonely",line:`Đêm qua Hoàng thượng lật thẻ bài của ${whoOf(nw.pick)||"một phi tần ngươi chưa quen"}.`};
 return{k:"lonely",line:"Đêm qua Hoàng thượng không lật thẻ bài nào."}}
function dawnOf(){const f=typeof festToday==="function"?festToday():null;const sea=SEAK[SEASON[S.month-1]]||"xuan";
 if(f)return{k:"fest",src:`img/ev-fest-${f.k}-b.webp`,t:`Sáng ${f.name}`,sub:`${SEASON[S.month-1]}${S.wx?" · "+S.wx.n:""}`};
 return{k:sea,src:`${DIR}ne-dawn-${sea}.webp`,t:`Bình minh ${SEAN[sea]}`,sub:`Tháng ${S.month}${S.wx?" · "+S.wx.n:""}`}}
/* kitNewDay(o) — o = {night:{k,line}|null, day:{k,src,t,sub}, wx, host(#dawn), then()} : plays the beats in host, then() when done/tapped */
function kitNewDay(o){const host=o.host;const beats=[];if(o.night)beats.push({k:o.night.k,src:DIR+TIER[o.night.k].pic+".webp",t:TIER[o.night.k].t,sub:o.night.line,ms:NE.lonelyMs});
 beats.push({k:o.day.k,src:o.day.src,t:o.day.t,sub:o.day.sub,ms:NE.dawnMs,wx:o.wx});
 host.className="dawn kne-day"+(red()?" rm":"");host.hidden=false;
 host.innerHTML=`<div class="kne kne-beat">${beats.map((b,i)=>`<div class="kne-b kne-${b.k}${i?"":" on"}" data-i="${i}">${picHTML(b.src,b.k,b.wx?wxHTML(b.wx):"")}<div class="kne-cap"><b>${esc(b.t)}</b><small>${esc(b.sub)}</small></div></div>`).join("")}<div class="kmhint">Chạm để bỏ qua</div></div>`;
 void host.offsetWidth;host.classList.add("on");let i=0,end=false;const T=[];
 const show=j=>{host.querySelectorAll(".kne-b").forEach(e=>e.classList.toggle("on",+e.dataset.i===j));play(beats[j].k)};
 const finish=()=>{if(end)return;end=true;T.forEach(clearTimeout);host.onclick=null;host.classList.remove("kne-day");try{o.then&&o.then()}catch(e){console.error(e)}};
 const next=()=>{i++;if(i>=beats.length)return finish();show(i);T.push(setTimeout(next,beats[i].ms))};
 host.onclick=e=>{e.stopPropagation();finish()};
 Promise.all(beats.map(b=>preload(b.src))).then(()=>{if(end)return;show(0);T.push(setTimeout(next,beats[0].ms))});return{finish}}
const dw0=dawn;dawn=function(){const p=PREV;PREV=null;const args=arguments,self=this;
 try{if(S&&!S.dead&&p&&!p.bedded&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)){let w=$("dawn");if(!w){w=document.createElement("div");w.id="dawn";w.className="dawn";document.body.appendChild(w)}
  const night=lonelyOf(p),day=dawnOf();window.kneLastDay={night:night&&night.k,day:day.k};
  kitNewDay({host:w,night,day,wx:S.wx,then:()=>{w.classList.remove("on");dw0.apply(self,args)}});return}}catch(e){console.error(e)}
 return dw0.apply(this,arguments)};
setTimeout(function warm(){try{if(typeof S==="undefined"||!S){setTimeout(warm,6000);return}const sea=SEAK[SEASON[S.month-1]]||"xuan";[DIR+"ne-night-lonely.webp",DIR+"ne-dawn-"+sea+".webp",DIR+"ne-night-normal.webp"].forEach(preload)}catch(e){}},9000);
window.kitNightEnd=kitNightEnd;window.kitNewDay=kitNewDay;window.kneTierOf=tierOf;

/* ---------- kit sample page (§62) ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§62",title:"kitNightEnd · kitNewDay (night-end + new-day pictures)",html:()=>`<div class="kne-sample">${["warm","normal","cold","lonely"].map(k=>`<figure><img src="${DIR}${TIER[k].pic}.webp" alt=""><figcaption>${TIER[k].t}</figcaption></figure>`).join("")}${["xuan","ha","thu","dong"].map(k=>`<figure><img src="${DIR}ne-dawn-${k}.webp" alt=""><figcaption>Bình minh ${SEAN[k]}</figcaption></figure>`).join("")}<figure><img src="img/ev-fest-newyear-b.webp" alt=""><figcaption>Sáng Tết Nguyên đán</figcaption></figure></div><button class="kbtn" type="button" onclick="event.stopPropagation();if(typeof S!=='undefined'&&S)kitNightEnd({tier:'warm',m0:1,m1:0,before:rsnap(),items:[],line:'Mẫu'})">Xem thẻ đêm</button>`})}catch(e){}

/* ---------- CSS ---------- */
const st=document.createElement("style");st.id="kne-css";st.textContent=`
.kne{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:600px}
.kne-pic{position:relative;width:100%;aspect-ratio:4/3;max-height:min(62dvh,450px);border-radius:var(--k-rad,8px);overflow:hidden;border:1px solid var(--gold);box-shadow:0 0 0 3px #f6ead6,0 12px 30px #000a;background:#1a0f0a}
.kne-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:kneZoom 6s ease-out both}
.kne-cap{display:flex;flex-direction:column;align-items:center;text-align:center;gap:2px;animation:kmFade .45s ease .25s both}
.kne-cap b{font-family:var(--display);font-size:1.3rem;color:#f6e3b4;letter-spacing:.05em}
.kne-cap small{color:#e9d6b0;font-size:.86rem;max-width:34rem;line-height:1.35}
.kne-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;max-width:460px}
.kne .kmlist .kpkb{width:100%}
.kne-it{display:flex;align-items:center;gap:6px}.kne-it small{color:var(--muted,#8a7560)}
.kne-glow,.kne-moon,.kne-sun{position:absolute;inset:0;pointer-events:none}
.kne-red{background:radial-gradient(60% 55% at 22% 40%,#ff8a4a66,transparent 70%);mix-blend-mode:screen;animation:kneFlick 1.6s ease-in-out infinite alternate}
.kne-amber{background:radial-gradient(45% 45% at 56% 62%,#ffc06a55,transparent 70%);mix-blend-mode:screen;animation:kneFlick 2.2s ease-in-out infinite alternate}
.kne-gutter{background:radial-gradient(40% 40% at 30% 55%,#ffb45a77,transparent 70%);mix-blend-mode:screen;animation:kneOut 2.4s ease-in .5s both}
.kne-moon{background:linear-gradient(180deg,#9fb8e033,#2a3a6a55);mix-blend-mode:multiply;animation:kmFade 2.6s ease .6s both}
.kne-lantern{background:radial-gradient(30% 35% at 20% 30%,#ff7a4a77,transparent 70%);mix-blend-mode:screen;animation:kneOut 3s ease-in .3s both}
.kne-sun{background:radial-gradient(60% 50% at 55% 30%,#fff1c0aa,transparent 70%);mix-blend-mode:screen;animation:kneRise 2.4s ease-out both}
.kne-fall,.kne-wind{position:absolute;top:-8%;left:var(--x);width:calc(22px*var(--s));height:auto;opacity:0;pointer-events:none;animation:kneFall 3.6s linear var(--d) infinite}
.kne-wind{top:calc(var(--x)*.6);left:-8%;animation:kneWind 2.8s ease-in var(--d) infinite}
.kne-fly{position:absolute;left:var(--x);top:var(--y);width:5px;height:5px;border-radius:50%;background:#fff07a;box-shadow:0 0 8px 3px #fff07a88;animation:kneFly 2.4s ease-in-out var(--d) infinite alternate}
.kne-snow{position:absolute;top:-4%;left:var(--x);width:calc(5px*var(--s));height:calc(5px*var(--s));border-radius:50%;background:#fff;opacity:.9;animation:kneFall 4s linear var(--d) infinite}
.kne-rain{position:absolute;top:-10%;left:var(--x);width:1.5px;height:18px;background:#c7d6e8aa;animation:kneRain .9s linear var(--d) infinite}
@keyframes kneZoom{from{transform:scale(1.08)}to{transform:scale(1)}}
@keyframes kneFlick{from{opacity:.55}to{opacity:1}}
@keyframes kneOut{0%{opacity:1}70%{opacity:.35}85%{opacity:.6}100%{opacity:0}}
@keyframes kneRise{from{opacity:0;transform:translateY(12%)}to{opacity:1;transform:none}}
@keyframes kneFall{0%{opacity:0;transform:translate(0,0) rotate(0)}10%{opacity:.95}100%{opacity:0;transform:translate(var(--w),110cqh) rotate(var(--r))}}
@keyframes kneWind{0%{opacity:0;transform:translate(0,0) rotate(0)}15%{opacity:.9}100%{opacity:0;transform:translate(115cqw,40px) rotate(var(--r))}}
@keyframes kneFly{from{opacity:.15;transform:translate(0,0)}to{opacity:1;transform:translate(14px,-18px)}}
@keyframes kneRain{from{transform:translate(0,0)}to{transform:translate(-20px,120cqh)}}
.kne-pic{container-type:size}
.kne-ov .kne:not(.km-done) .kmlist{display:none}
/* week panel beats */
.dawn.kne-day{padding:12px;cursor:pointer;z-index:9200}
.kne-beat{position:relative;width:100%;max-width:820px;display:grid;place-items:center}
.kne-b{grid-area:1/1;display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;opacity:0;transition:opacity .6s ease;pointer-events:none}
.kne-b.on{opacity:1}
.kne-beat .kne-pic{max-height:calc(100dvh - 130px)}
.kne-beat .kmhint{position:static;margin-top:8px}
.dawn.rm .kne-b{transition:none}
/* landscape up to 900 px high (phone 844x390, 1000x755, iPad 1180x820): picture left, words right */
@media (orientation:landscape) and (max-height:900px){
 .kne-ov .kmst{max-width:96vw}.kne-ov .kne{flex-direction:row;align-items:center;max-width:96vw;width:96vw;gap:14px}
 .kne-ov .kne-pic{width:min(54vw,calc((100dvh - 40px)*1.333));height:auto;max-height:none;flex:0 0 auto}
 .kne-ov .kne-side{justify-content:center;max-width:420px;flex:1 1 300px;min-width:0}
 .kne-ov .kmlist{max-height:calc(100dvh - 120px);overflow:auto}
 .kne-beat .kne-b{flex-direction:row}.kne-beat .kne-pic{width:min(66vw,calc((100dvh - 60px)*1.333));height:auto;max-height:none}.kne-beat .kne-cap{max-width:28vw}}
@media (orientation:portrait){.kne-ov .kne-pic{max-height:min(52dvh,450px)}.kne-ov .kmlist{max-height:calc(100dvh - min(52dvh,450px) - 150px);overflow:auto}}
.kne-sample{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:6px}.kne-sample figure{margin:0}.kne-sample img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;border:1px solid var(--gold)}
.kne-sample figcaption{font-size:.75rem;text-align:center}
@media (prefers-reduced-motion:reduce){.kne *{animation:none!important;transition:none!important}}
.km-red .kne *{animation:none!important}`;document.head.appendChild(st);
})();
