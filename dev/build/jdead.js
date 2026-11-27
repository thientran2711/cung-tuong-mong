/* jdead: LÃNH CUNG + THE DEAD (owner 27/11 ~05:10Z, OD rows 05:10 «Mấy cái người nào mà bị vào lãnh cung…»; worker OWNER-UI-A).
   KIT CHECK: reuses kit parts pcard / pager / mdH / pcPort (portraits), kitRows (key/value rows), the kit chip + palace strip; the only NEW kit part is the
   portrait STATE (jgrey.js §3: .kst-lc faded sepia, .kst-dead b/w), set from f.st by the two portrait renderers — so ONE look everywhere a person is drawn.
   1. f.st: 'lc' = alive in lãnh cung (own colours faded + warm sepia), 'dead' = died (black and white; ONLY the dead are b/w).
   2. THE DEAD STAY in the lists (Phi tần strip: own group after the living with the count «Đã khuất: N»; Nam nhân strip likewise). Tap = the whole record as it was +
      «Hưởng dương N tuổi» (died before BAL.dth.thoAge — the old term for dying young) / «Hưởng thọ N tuổi» (that age or more) + «Nguyên do: …» = the cause as the
      WORLD knows it (law 6a: the words the log used; an unproven murder reads as what was seen). Save: the record is p.dth = {a: age, c: cause, y: year}, written on
      the person (rivals / men / kids are already saved), old saves get a record by the sweep (age = the frozen age, cause «không ai rõ nguyên do»).
   3. alive===false is also used for a nun (v.nun), a woman sent away (v.left), a child married off / removed (k.wed, k.gone): those are NOT dead (dthIs). */
(function(){
const TH=()=>(typeof BAL==="object"&&BAL.dth&&BAL.dth.thoAge)||60;
function dthIs(p){return !!p&&typeof p==="object"&&p!==S&&p.alive===false&&!p.nun&&!p.left&&!p.wed&&!p.gone}
function dthClean(w){return String(w==null?"":w).replace(/<[^>]*>/g,"").replace(/\s+/g," ").replace(/^\s*(bị )?ban chết:\s*/i,"bị ban chết vì ").replace(/[.\s]+$/,"").trim()}
function dthStamp(p,why,fb){if(!dthIs(p)||p.dth)return;let a=p.age;try{if(typeof ageOf==="function"){const x=ageOf(p);if(x>0)a=x}}catch(e){}
 p.dth={a:Math.max(0,a|0),c:dthClean(why)||fb||"",y:(typeof S==="object"&&S&&S.year)||0}}
function dthSweep(){try{if(!S||typeof rivals==="undefined")return;
 for(const v of rivals)if(dthIs(v)&&!v.dth)dthStamp(v,"","");
 for(const m of (S.men||[]))if(dthIs(m)&&!m.dth)dthStamp(m,"","");
 for(const [k] of (typeof allKids==="function"?allKids():[]))if(dthIs(k)&&!k.dth)dthStamp(k,k.nbWhy||"","")}catch(e){}}
function dthOf(p){if(!dthIs(p))return null;if(!p.dth)dthStamp(p,"","");const d=p.dth;return{age:d.a,term:d.a>=TH()?"Hưởng thọ":"Hưởng dương",cause:d.c||"không ai rõ nguyên do"}}
/* the two lines of the record, from the kit rows part */
function dthRows(p){const d=dthOf(p);if(!d)return"";return kitRows([[d.term,`${d.age} tuổi`],["Nguyên do",d.cause]])}
window.dthIs=dthIs;window.dthOf=dthOf;window.dthRows=dthRows;window.dthSweep=dthSweep;window.dthStamp=dthStamp;
/* ---- stamps from the code paths that know the cause (the same words as the log line) ---- */
/* (jmort kill() stamps its own rivals / men with the same words as its log line) */
try{const d0=kidDie;kidDie=function(k,why){const r=d0.apply(this,arguments);try{dthStamp(k,why,"")}catch(e){}return r}}catch(e){}
try{const s0=deathSentence;deathSentence=function(a,b){const r=s0.apply(this,arguments);try{const p=typeof a==="string"?S:a,w=typeof a==="string"?a:b;if(p&&p!==S)dthStamp(p,"bị ban chết vì "+dthClean(w).replace(/^bị ban chết vì /,""))}catch(e){}return r}}catch(e){}
try{const e0=dieIf;dieIf=function(p,why){const r=e0.apply(this,arguments);try{dthStamp(p,why)}catch(e){}return r}}catch(e){}
try{const r0=render;render=function(){dthSweep();return r0.apply(this,arguments)}}catch(e){}
/* ---- portrait state on the f object the ONE renderers read ---- */
const stOf=p=>!p?"":p.alive===false?(dthIs(p)?"dead":""):p.out?"lc":"";
window.kstOfP=stOf;
/* K-NOTICE-SUBJECT-FREE (KIT §8.2d; PUNISH-TIER-8, MAIN 177 ruling): the subject of a notice about a person who has NO live registry key any more (a dead maid:
   WHO(["m"]) is the CURRENT maid) — the face object carries the person herself (__kp: kitStagePeople → kitEventStage draws HER full-body figure via kitStageFig,
   kitName for the plate) and her portrait state (st) for pframe / pcPort. No w key: a reload shows the notice without a subject rather than the wrong person. */
function kitDeadWho(p){try{if(!p)return null;const f=p.rel!=null&&typeof pv==="function"?Object.assign({},pv(p)):typeof pServ0==="function"?Object.assign({rk:"sv"+(BAL.srvRk&&BAL.srvRk.dai||0),rw:typeof kitMaidTitle==="function"&&p.role!=="eunuch"&&p.uid!=null?kitMaidTitle(p):""},pServ0(p.uid!=null&&!p.role?Object.assign({role:"maid"},p):p)):{};
 delete f.w;f.__kp=p;const s=stOf(p);if(s)f.st=s;return f}catch(e){return null}}
window.kitDeadWho=kitDeadWho;
try{const p0=pv;pv=function(v){const f=p0.apply(this,arguments);try{const s=stOf(v);if(s&&f&&typeof f==="object")f.st=s}catch(e){}return f}}catch(e){}
try{const p0=pMan;pMan=function(m){const f=p0.apply(this,arguments);try{const s=stOf(m);if(s&&f&&typeof f==="object")f.st=s}catch(e){}return f}}catch(e){}
const mark=(h,f,re,sp)=>{try{if(f&&f.st&&typeof h==="string")return h.replace(re,m=>m+(sp?" ":"")+"kst-"+f.st+(sp?"":" "))}catch(e){}return h};
try{const m0=mdH;mdH=function(p){return mark(m0.apply(this,arguments),p,/class="md /)}}catch(e){}
try{const c0=pcPort;pcPort=function(f){return mark(c0.apply(this,arguments),f,/class="pcp/,1)}}catch(e){}
/* ---- the figure hook (owner 27/11 ~05:46Z: «mọi nơi nàng xuất hiện»): stage tokens (j59 figimg / .md), #mefig, img.kesimg, .kszfs>img bypass mdH/pcPort,
   so ONE pass finds each figure's owner with jfigseal's kfsFigs()/kfsPerson() and sets the same kit state class; the --kst var is in every figure filter chain ---- */
function kstPaint(){try{const set=(e,s)=>{e.classList.toggle("kst-lc",s==="lc");e.classList.toggle("kst-dead",s==="dead")};
 /* KIT §8.2d (PUNISH-TIER-8): the left figure of a dialog (KIT §3 .kszfs>img / .kesimg) shows its person's state too — a «Tin dữ» about the dead shows her b/w,
    the plate included (.kszfig / .kesf get the class: owner ~05:59Z «khung trắng đen»); kfsFigs() leaves #modal figures out for the head seals only */
 if(typeof kfsPerson==="function")document.querySelectorAll("#modal .kszfs>img,#modal img.kesimg").forEach(im=>{const p=kfsPerson(im);const s=p?stOf(p.ref||p):"";set(im,s);const box=im.closest(".kszfig,.kesf");if(box)set(box,s)});
 if(typeof kfsFigs==="function"&&typeof kfsPerson==="function")kfsFigs().forEach(im=>{const p=kfsPerson(im);set(im,p?stOf(p.ref||p):"")});
 const ppl=typeof curPeople==="function"?curPeople():[];document.querySelectorAll("#tokens .tok:not(.fig) .md").forEach(md=>{const t=md.closest(".tok"),p=ppl[+(t&&t.dataset.p)];set(md,p?stOf(p.ref||p):"")})}catch(e){}}
let kstQ=0;const kstSched=()=>{if(kstQ)return;kstQ=requestAnimationFrame(()=>{kstQ=0;kstPaint()})};
try{const r0=render;render=function(){const r=r0.apply(this,arguments);kstSched();return r}}catch(e){}
try{if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);kstSched();return r}}}catch(e){}
try{new MutationObserver(kstSched).observe(document.body,{childList:true,subtree:true})}catch(e){}
/* ---- the cards ---- */
/* dthIn(h,rows): the dead record goes INTO the card's left column (.pcl) as ONE box .kdrec — jkpp §6.4b (kitPP) already routes «anything else under the portrait» to «Thông tin», so no kit part is touched.
   The «đã mất» line (.past, the card's empty text) moves in with it (it would otherwise stay in the right column's hidden act holder). */
function dthIn(h,rows){try{const pm=/<p class="past">[\s\S]*?<\/p>/.exec(h);let past="";if(pm){past=pm[0];h=h.replace(pm[0],"")}
 const box=`<div class="kdrec">${rows||""}${past}</div>`,i=h.indexOf('</div><div class="pcr">');return i<0?h.replace('<div class="pcr">','<div class="pcr">'+(rows||"")+past):h.slice(0,i)+box+h.slice(i)}catch(e){return h}}
try{const r0=rvCard;rvCard=function(v){let h=r0.apply(this,arguments);try{
 if(dthIs(v)){h=h.replace(">Đã chết<",">Đã khuất<");h=dthIn(dthDrop(h,["Dạo này"]),kitRows(dthLife(v))+dthRows(v))}
 else if(v&&v.alive===false)h=h.replace(">Đã chết<",v.nun?">Đã xuất gia<":">Đã rời cung<")}catch(e){}return h}}catch(e){}
try{const m0=manCard;manCard=function(m){if(!dthIs(m))return m0.apply(this,arguments);const f=pMan(m);
 return dthDrop(dthIn(pcard({f,col:"#6a8aa0",name:m.name,rank:m.role,status:"Đã khuất",out:true,lines:[tuoi(m.age)].filter(Boolean),chips:[],note:"",groups:[],empty:`<p>${m.name} đã khuất. Chỉ còn lại những gì người ta còn nhớ về hắn.</p>`}),dthRows(m)),["Dạo này"])}}catch(e){}
/* ---- the whole record as it was (owner 27/11 ~05:10Z, MAIN LOOK): what she was in life from existing data; no live lines about a dead person ---- */
function dthDrop(h,labels){try{const t=document.createElement("template");t.innerHTML=h;t.content.querySelectorAll(".kr").forEach(r=>{const l=(r.querySelector(".krl")||{}).textContent||"";const v=(r.querySelector(".krv")||{}).textContent||"";if(labels.includes(l.trim())||(/^Đã biết$/.test(l.trim())&&/chưa biết gì thêm/.test(v)))r.remove()});return t.innerHTML}catch(e){return h}}
function dthLife(v){const R=[];try{const pn=palName(palaceOf(v));if(pn&&!pn.includes(v.name))R.push(["Cung ở",pn])}catch(e){}
 const K=v.kids||[];if(K.length)R.push(["Con cái",K.map(k=>`${k.name}${k.alive?"":" (đã khuất)"}`).join(", ")]);
 if(v.out)R.push(["Lúc mất","đang ở lãnh cung"]);return R}
try{const kf=kidFace;kidFace=function(k){const f=kf.apply(this,arguments);try{const s=stOf(k);if(s&&f&&typeof f==="object")f.st=s}catch(e){}return f}}catch(e){}
try{const kc=kidCard;kidCard=function(k){let h=kc.apply(this,arguments);try{if(dthIs(k)){h=h.replace(">Đã mất<",">Đã khuất<");let mom="";try{const m=allKids().find(([x])=>x===k);mom=m&&m[1]?m[1].name:S.name}catch(e){}const rows=dthRows(k)+kitRows(mom?[["Mẹ",mom]]:[]);h=dthDrop(dthIn(h.replace("Con đã mất.",""),rows),["Dạo này"])}}catch(e){}return h}}catch(e){}

/* ---- her dead servants (S.dstaff, kept by jmort kill): own group «Đã khuất» at the end of the Cung nhân strip ---- */
try{const p0=pager;pager=function(key,items,mk){if(key!=="staff"||!S||!(S.dstaff||[]).length)return p0.apply(this,arguments);const D=S.dstaff.filter(dthIs);if(!D.length)return p0.apply(this,arguments);const n=items.length;
 const it2=items.concat(D.map((s,j)=>({f:Object.assign({},pServ(s),{st:"dead"}),name:shortN(s.name),dim:true,sep:j?"":"Đã khuất"})));
 const h=p0.call(this,key,it2,i=>i<n?mk(i):(s=>dthDrop(dthIn(pcard({f:it2[i].f,name:s.name,rank:s.role==="maid"?"Cung nữ":"Thái giám",status:"Đã khuất",out:true,lines:[tuoi(s.age)].filter(Boolean),chips:[],groups:[],empty:`<p>${s.name} đã khuất.</p>`}),dthRows(s)),["Dạo này"]))(D[i-n]));
 return h.replace(/(<span class="pcount">[^<]*)/,`$1 · Đã khuất: ${D.length}`)}}catch(e){}
})();

