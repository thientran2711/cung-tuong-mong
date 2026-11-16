/* lag-play (owner 16/11 15:05Z): ONE coalesced late render for every "a picture arrived, redraw" case (portraits, kid portraits, unknown
   silhouettes, por fallbacks). Each used to run its own full render() — a whole-game redraw per picture (~0.5 s on a slow phone). */
function kitRenderSoon(ms){clearTimeout(kitRenderSoon.t);kitRenderSoon.t=setTimeout(()=>{try{if(typeof S!=="undefined"&&S)render()}catch(e){}},ms==null?250:ms)}
window.kitRenderSoon=kitRenderSoon;

/* ================= FIGURES v2: every manifest merged; one identity per person for life, never reused in a game ================= */
/* img/FIGURES.json (consorts, player, emperor, eunuchs), img/FIGURES-servants.json (maid, mama, eunuch), img/FIGURES-others.json
   (thaihau, official, physician, man+sub). A missing file is skipped. When FIGURES-others.json holds official / physician
   entries, the old single-age ones of FIGURES.json are ignored. Re-read every 5 minutes so new art lands without a reload. */
const FIGF=["img/FIGURES.json","img/FIGURES-servants.json","img/FIGURES-others.json"];
let FIGIX={},FIGSIG="";
function figList(j){return (Array.isArray(j)?j:j&&(j.figures||j.files||j.items)||[]).filter(f=>f&&(f.file||f.src))}
function figAge(t){const s=String(t==null?"":t).toLowerCase();const m=s.match(/\d+/g);if(m){const a=+m[0],b=m[1]?+m[1]:a;return (a+b)/2}return /old|lao|gia/.test(s)?56:/mid|trung/.test(s)?32:/young|tre/.test(s)?20:null}
function figTier(t){if(t==null||t==="")return null;if(/cold|lanh/i.test(String(t)))return -1;const n=parseInt(String(t).replace(/[^\d-]/g,""),10);return isNaN(n)?null:n}
function figPath(s){return !s?"":/^img\//.test(s)?s:"img/"+s}
function figKey(f){const r=norm(f.role);if(f.identity!=null&&f.identity!=="")return r+":"+f.identity;if(f.variant!=null)return r+":v"+f.variant;return r+":"+String(f.file||f.src)}
function figIndex(all){const ix={};for(const f of all){if(/(^|\/)por-/.test(f.file||f.src))continue;const r=norm(f.role);const k=figKey(f);(ix[r]=ix[r]||{});(ix[r][k]=ix[r][k]||[]).push(f)}return ix}
function loadFigs(){try{Promise.all(FIGF.map(u=>fetch(u,{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]))).then(([a,b,c])=>{a=figList(a);b=figList(b);c=figList(c);
 const old=f=>/(^|\/)_old\//.test(String(f.file||f.src))||(f.por&&/(^|\/)_old\//.test(String(f.por)));a=a.filter(f=>!["thaihau","official","physician"].includes(norm(f.role)));a=a.filter(f=>!old(f));b=b.filter(f=>!old(f));c=c.filter(f=>!old(f));
 const all=a.concat(b,c);const sig=all.length+"|"+all.map(f=>f.file||f.src).join(",").length;if(sig===FIGSIG)return;FIGSIG=sig;FIGS=all;FIGIX=figIndex(all);try{if(S&&!S.dead)render()}catch(e){}}).catch(()=>{})}catch(e){}}
loadFigs();setInterval(loadFigs,300000);
/* which art group a person belongs to, preferred first */
const MANSUB={"thị vệ":["guard","thive","thi ve","vesi"],"thái y":["physician","doctor","thaiy"],"vương gia":["prince","royal","vuonggia","wang"],"nhạc sư":["musician","nhacsu","music"],"sứ thần":["envoy","suthan","ambassador"],"họa sư":["painter","hoasu"]};
function figWho(p){if(!p)return null;if(p===S)return S;const k=p.kind;if(k==="emp")return S.emp;if(k==="th"){S.thO=S.thO||{};return S.thO}if(k==="maid"&&!p.ref)return S.maid;if(k==="ty"&&!p.ref)return S.court&&S.court.ty;if(k==="ksp"&&!p.ref)return S.court&&S.court.ksp;return p.ref||p}
function figRoles(who){if(!who)return[];if(who===S)return["player","heroine"];if(who===S.emp)return["emperor"];if(who===S.thO)return["thaihau"];
 const C=S.court||{};if(who===C.ty)return["physician"];if(who===C.tq||who===C.ksp||who===C.ped)return["eunuch"];
 if((S.men||[]).includes(who))return who.rw==="thái y"?["man","physician"]:["man"];
 if(who===S.maid||who.role==="maid")return (who.age||18)>=36||who.old?["mama","maid"]:["maid"];
 if(who.role==="eunuch"||who.role==="eun")return["eunuch"];
 if((rivals||[]).includes(who))return["consort"];return[]}
function figAgeOf(who){return who===S?S.age||18:who===S.thO?S.thAge||55:who.age||20}
function figTierOf(who){if(who===S)return S.out?-1:S.rank;if((rivals||[]).includes(who))return who.out?-1:who.queen?7:who.rank||0;return null}
/* the closest file inside one identity: nearest tier, then nearest age */
function figDist(f,tier,age){const ft=figTier(f.tier),fa=figAge(f.ageBand);return (tier!=null&&ft!=null?Math.abs(ft-tier)*2:0)+(fa!=null?Math.abs(fa-age)/8:0)}
function figBest(L,tier,age){let b=null,bd=1e9;for(const f of L){const d=figDist(f,tier,age);if(d<bd){bd=d;b=f}}return b}
function figSubOk(who,f){const want=MANSUB[who.rw]||[];if(!want.length||f.sub==null)return 0;const s=norm(f.sub);return want.some(w=>norm(w)===s||s.includes(norm(w)))?1:-1}
function figLook(who,f){const want=(typeof LOOKFOR!=="undefined"&&LOOKFOR[who.trait])||[];if(!want.length||f.look==null)return 0;return want.includes(norm(f.look))?1:0}
function figUsed(){S.fidUsed=S.fidUsed||[];return S.fidUsed}
function figPick(who){const roles=figRoles(who);if(!roles.length)return null;const used=new Set(figUsed());
 if(who.fid){const r=who.fid.split(":")[0];if(FIGIX[r]&&FIGIX[r][who.fid])return who.fid}
 const tier=figTierOf(who),age=figAgeOf(who);
 for(const r of roles){const M=FIGIX[norm(r)];if(!M)continue;const free=Object.keys(M).filter(k=>!used.has(k));if(!free.length)continue;
  const sc=k=>{const L=M[k];const b=figBest(L,tier,age);let s=-figDist(b,tier,age);if((S.men||[]).includes(who))s+=4*Math.max(...L.map(f=>figSubOk(who,f)));s+=3*Math.max(...L.map(f=>figLook(who,f)));return s};
  let best=-1e9;for(const k of free)best=Math.max(best,sc(k));const top=free.filter(k=>sc(k)>=best-.5);const k=pick(top);who.fid=k;figUsed().push(k);return k}
 return null}
figFor=function(p,kind){try{if(!FIGS.length||!p||!S)return"";const who=figWho(p);if(!who)return"";const k=figPick(who);if(!k)return"";const r=k.split(":")[0];const L=(FIGIX[r]||{})[k];if(!L||!L.length)return"";
 const f=figBest(L,figTierOf(who),figAgeOf(who));if(!f)return"";if(kind==="por")return figPath(f.por);return figPath(f.file||f.src)}catch(e){return""}};
/* round portraits: the identity's por-*.webp once it has loaded; the old face until then (or if it fails) */
const PORK={};
function porOf(who,fb){try{if(!who||!FIGS.length)return fb;const src=figFor(who===S?S:who===S.emp?{kind:"emp"}:who===S.thO?{kind:"th"}:{ref:who},"por");if(!src)return fb;
 if(PORK[src]===1)return src;if(PORK[src]===0)return fb;if(PORK[src]==null){PORK[src]=2;const im=new Image();im.onload=()=>{PORK[src]=1;kitRenderSoon(250)};im.onerror=()=>{PORK[src]=0};im.src=src}return fb}catch(e){return fb}}
(function(){const W=(name,get)=>{const f0=window[name];if(typeof f0!=="function")return;window[name]=function(){const r=f0.apply(this,arguments);try{const who=get.apply(this,arguments);if(r&&typeof r==="object"&&who)r.src=porOf(who,r.src);else if(typeof r==="string"&&who)return porOf(who,r)}catch(e){}return r}};
 W("pv",v=>v);W("pMe",()=>S);W("pEmp",()=>S.emp);W("pTH",()=>{S.thO=S.thO||{};return S.thO});W("pDoc",()=>S.court&&S.court.ty);W("pServ0",s=>s);W("maidSrc",m=>m);W("courtSrc",(k,c)=>c);W("pMan",m=>m)})();
/* place screens: every person present stands full-body when art exists (servants, physician and eunuchs too) */
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{if(!FIGS.length)return r;const ppl=curPeople();document.querySelectorAll("#tokens .tok:not(.fig)").forEach(b=>{const p=ppl[+b.dataset.p];if(!p||p.kind==="kid"||p.kind==="chest")return;const src=figFor(p);if(!src)return;
  const md=b.querySelector(".md");if(md){const im=document.createElement("img");im.className="figimg";im.alt="";im.src=src;im.onerror=()=>{im.remove();md.style.display="";b.classList.remove("fig")};md.style.display="none";b.insertBefore(im,md);b.classList.add("fig")}})}catch(e){}return r}})();
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{$("stage").classList.toggle("hasme",!!document.getElementById("mefig"))}catch(e){}return r}})();
