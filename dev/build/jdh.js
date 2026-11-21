/* ================= jdh: DANH HIỆU — the achievement title system, game logic (owner 16/11 13:00Z / 13:15Z / 13:20Z / 13:25Z (D) / 13:30Z;
   review/title-sys, Foreman C). Draws ONLY with the KIT §82 parts of jtitle.js (kitTitlePlate, kitTitleOpen, the 3-line tag) + kit panel / rows / tab row.
   - Catalogue DH: every title has its OWN short evocative name (owner 13:15Z; lengths vary, max 4 words, 13:25Z D). Steps by count (BAL.dh: n0 = 1/5/10,
     some titles their own) = the SAME name with a higher colour tier (tier = b + i*step, max 8).
   - Who: her (S) and every NPC consort (rivals) by the same rules. Counted events: contest podium/wins (cFin7, every contest), her acts (runOpt names),
     made works (wkMake, her and NPCs); derived from state: nights, children, art levels, number of contest kinds won.
   - Data (old saves load: every field optional): p.dh = {key:{n:count, i:step 0..2, at:[when per step]}}, p.titleWorn = "dh-<key>" (S.titleWorn for her,
     the KIT hook), p.dhOn = {stat:amount} what the worn title added to danh/sung/duc (taken back on removal). Sắc while worn goes through wearBonus.
   - Ids handed to the kit: "dh-<key>@<pid>" (pid "me" = her, else the consort id) so the kit info card (kitTitleOpen) knows whose title it is.
   - NHIỆM VỤ (stage rail goal icon, KIT §77): tab row "Mục tiêu | Danh hiệu" (kit tab row) on the goal panel; the Danh hiệu panel lists earned titles
     (plate · how · gives while worn), the ones still to earn (progress), and options to wear / take off.
   - NPCs wear their highest title themselves. Co-op: S.dh / S.titleWorn are personal keys (each player her own); NPC counting runs on the host only
     (the same rule as rivalsMonth / festival); the friend entry carries her dh / titleWorn / hieu (jcoopworld LOOK).
   BONUSES (owner 13:55Z/14:10Z s17, FOREMAN_C 14:15Z/14:35Z/14:45Z): ONE title worn, it gives ONE bonus, the PLAYER picks it from the title's list
     (BAL.dh.T[id].ch, catalogue BAL.dh.B); stored per title p.dh[key].pick. Each bonus type is hooked at the ONE place that computes that gain (see BAL.dh note).
   Phase 2 = jdh2.js (review/title-sys2): emperor hiệu by BAL thresholds, sắc phong book + seal, confiscation (p.dh[key].conf), atonement, loss/theft. */
(function(){try{
const T=()=>(BAL.dh&&BAL.dh.T)||{};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nTimes=n=>n===1?"một lần":`${n} lần`;
const scn=k=>(typeof SC7==="object"&&SC7[k]&&SC7[k].n)||k;
const artN=k=>{try{const a=ARTS.find(x=>x.k===k);return a?a.n:k}catch(e){return k}};
/* ---------- the catalogue: key → {n name, g group, how(need) text} ---------- */
const WIN={doden:"Tuệ nhãn",tho:"Thi tiên",doi:"Vế đối vàng",dan:"Tiếng tơ đồng",mua:"Nghê thường vũ y",hat:"Oanh vàng",theu:"Đường kim như gấm",kim:"Chức Nữ",
 hoa:"Người giữ xuân",ve:"Thần bút",co:"Quốc thủ",banh:"Hương vị ngự thiện",ban:"Bách phát bách trúng",dauho:"Tay ném như thần",huong:"Hương lưu tay áo"};
const MAST={cam:"Cao sơn lưu thủy",ky:"Tâm như bàn cờ",thi:"Nhả ngọc phun châu",hoa:"Bút sinh hoa",vu:"Gót sen lăng ba",y:"Diệu thủ hồi xuân",theu:"Kim vàng chỉ bạc",nau:"Ngự trù"};
const WORK={mon:["Tay nêm ngự thiện","Nấu món"],kinh:["Tâm như gương sáng","Chép kinh"],theu:["Tay tiên","Thêu khăn"],tranh:["Sơn thủy trong tay","Vẽ tranh thủy mặc"],khuc:["Khúc nhạc tri âm","Phổ khúc đàn"]};
const DH={};
for(const k in WIN)DH["w_"+k]={n:WIN[k],g:"thi",how:n=>k==="kim"?`Đứng đầu hội xâu kim đêm Thất tịch ${nTimes(n)}`:`Đứng đầu hội thi ${scn(k)} ${nTimes(n)}`};
DH.meta={n:"Tài hoa vô song",g:"thi",u:"môn",how:n=>`Đứng đầu hội thi ở ${n} môn khác nhau`};
DH.podium={n:"Bảng vàng đề tên",g:"thi",how:n=>`Đứng trong ba hạng đầu một hội thi ${nTimes(n)}`};
DH.nights={n:"Trăng soi rèm ngọc",g:"an",how:n=>`Được thị tẩm ${nTimes(n)}`};
DH.kids={n:"Phúc ấm đầy nhà",g:"an",u:"hoàng tự",how:n=>`Sinh hạ ${n} hoàng tự`};
DH.a_thinh={n:"Sớm viếng chiều thăm",g:"ngay",me:1,how:n=>`Thỉnh an ${nTimes(n)}`};
DH.a_doc={n:"Thư hương",g:"ngay",me:1,how:n=>`Đọc sách ${nTimes(n)}`};
DH.a_nhan={n:"Dung nhan như ngọc",g:"ngay",me:1,how:n=>`Điểm trang, dưỡng nhan ${nTimes(n)}`};
for(const k in MAST)DH["l_"+k]={n:MAST[k],g:"nghe",u:"bậc",how:n=>`${artN(k)} lên bậc ${n}`};
for(const k in WORK)DH["m_"+k]={n:WORK[k][0],g:"nghe",how:n=>`${WORK[k][1]} ${nTimes(n)}`};
const GROUPS=[["tm","Thiên mệnh"],["kc","Khuê các"],["thi","Hội thi"],["nghe","Tài nghệ"],["ngay","Ngày thường"],["an","Ân sủng"]];/* "kc" = jkcg «Khuê các» (OUTSIDE_PLAN §11): like tm, listed only once earned */
/* «Thiên mệnh» (jge.js, grand endings): one title per grand-ending shading, earned only by reaching it — never listed as "still to earn", never counted in the totals until earned */
const dhTot=()=>Object.keys(DH).filter(k=>(DH[k].g!=="tm"&&DH[k].g!=="kc")||((S&&S.dh||{})[k]&&S.dh[k].i>=0)).length;
window.DH_CAT=DH;
/* her acts that count (runOpt names; only when the act succeeds) */
const ACTK=[[/^Thỉnh an/,"a_thinh"],[/^Đọc (sách|binh thư)/,"a_doc"],[/^(Điểm trang|Dưỡng nhan)/,"a_nhan"]];
/* ---------- people ---------- */
const pidOf=p=>p===S?"me":String(p&&p.id);
function byPid(id){if(id==="me")return S;try{return rivals.find(v=>String(v.id)===id)||null}catch(e){return null}}
const npcOK=()=>!(window.COOPW&&COOPW.on&&COOPW.seat!=="a");
function bag(p){if(!p.dh||typeof p.dh!=="object")p.dh={};return p.dh}
function cfg(key){return T()[key]||{}}
function need(key){if(key.startsWith("l_"))return BAL.dh.artLv;return cfg(key).n||BAL.dh.n0}
function tierOf(key,i){const c=cfg(key);return Math.max(1,Math.min(8,(c.b||1)+i*(c.st!=null?c.st:BAL.dh.step)))}
/* the live count of a title for a person (derived ones read the state; counted ones the stored n) */
function count(p,key){const e=(p.dh||{})[key]||{};let d=0;
 try{if(key==="nights")d=p.nights||0;else if(key==="kids")d=(p.kids||[]).length;else if(key.startsWith("l_"))d=typeof artLv==="function"?artLv(p,key.slice(2)):((p.arts||{})[key.slice(2)]||0);
  else if(key==="meta")d=Object.keys(p.dh||{}).filter(k=>k.startsWith("w_")&&(p.dh[k].n||0)>0).length}catch(e){}
 return Math.max(e.n||0,d)}
function stepOf(key,c){const N=need(key);let i=-1;N.forEach((x,j)=>{if(c>=x)i=j});return i}
function when(){try{return typeof VP==="object"&&VP.date?VP.date(S.month,S.year):`Tháng ${S.month}, năm thứ ${S.year}`}catch(e){return ""}}
/* ---------- bonuses (BAL.dh.B): the player picks ONE of the title's types ---------- */
const FLAT=["sac","danh","sung","duc","tai","tamco"];
const NUMW={5:"năm",6:"sáu",7:"bảy",8:"tám",10:"mười",12:"mười hai",14:"mười bốn",20:"hai mươi"};
const ph=d=>`một phần ${NUMW[d]||d}`;
function bv(t,i){const b=(BAL.dh.B||{})[t];return b&&b.v&&i>=0?(b.v[Math.min(i,b.v.length-1)]||0):0}
function choices(key,i){return (cfg(key).ch||[]).filter(t=>bv(t,i))}
const BLAB={gSung:"Sủng dễ lên",gDanh:"Danh dễ lên",gBac:"Bạc dư dả",gTren:"Bề trên quý mến",gHau:"Phi tần quý mến",gTrung:"Cung nữ trung thành",
 phuc:"Phúc khí",thai:"Dễ có thai",nghe:"Học mau tiến",thi:"Tài nghệ hội thi",suc:"Ngủ lại sức",don:"Tin đồn khó lan"};
function bLab(t){return BLAB[t]||`Thêm ${(typeof NAMES==="object"&&NAMES[t])||t}`}
function bTxt(t,v){if(!v)return "";if(FLAT.includes(t))return statTxt(t,v);
 switch(t){case"gSung":return `Sủng được thêm ${ph(v)}`;case"gDanh":return `Danh được thêm ${ph(v)}`;case"gBac":return `Bạc thu vào thêm ${ph(v)}`;
  case"gTren":return `Thái hậu, Hoàng hậu quý ta thêm ${ph(v)}`;case"gHau":return `Phi tần quý ta thêm ${ph(v)}`;case"gTrung":return `Lòng cung nữ thêm ${ph(v)}`;
  case"phuc":return `Phúc khí +${v}: việc may rủi dễ thành hơn`;case"thai":return v<2?"Có thai: dễ hơn một chút":"Có thai: dễ hơn";
  case"nghe":return `Tự học tài nghệ: ${v<20?"đôi khi":v<30?"khá thường":"thường"} tiến thêm một phần`;case"thi":return `Hội thi: thêm ${v} phần tài nghệ`;
  case"suc":return `Ngủ dậy Sức +${v}`;case"don":return `Tin đồn về ta khó lan ${v<=5?"hơn một chút":v<=8?"hơn":"hơn hẳn"}`}return ""}
function pickOf(p,key,i){const L=choices(key,i);const e=((p&&p.dh)||{})[key]||{};return L.includes(e.pick)?e.pick:(L[0]||null)}
function fxOf(key,i,p){const t=pickOf(p,key,i);return t?[t,bv(t,i)]:null}
function fxTxt(key,i,p){const f=fxOf(key,i,p);return f?`${bTxt(f[0],f[1])} (khi đeo)`:""}
function chTxt(key,i){const L=choices(key,i);if(L.length<2)return "";const N=L.map(bLab);return `chọn một: ${N.join(" hay ")}`}
/* the title object handed to the kit (KIT §82: {id,name,tier,when,how,fx}) */
function dhObj(p,key){const d=DH[key],e=p&&(p.dh||{})[key];if(!d||!e||e.i==null||e.i<0)return null;const i=e.i,N=need(key);
 const nx=N[i+1]!=null?` · đủ ${N[i+1]} ${d.u||"lần"}: lên bậc ${KIT_TIER_NAME[Math.min(7,tierOf(key,i+1))]}`:"";
 return {id:`dh-${key}@${pidOf(p)}`,key,name:d.n,tier:tierOf(key,i),when:(e.at&&e.at[i])||"",how:`Đạt được khi ${d.how(N[i]).replace(/^./,c=>c.toLowerCase())}${nx}`,fx:fxTxt(key,i,p),src:"play"}}
window.dhObj=dhObj;
function keyOfWorn(w){return typeof w==="string"&&/^dh-/.test(w)?w.slice(3).split("@")[0]:null}
/* ---------- sync: open steps, notice for her, NPCs wear their best ---------- */
function seedOld(p){/* old saves: her past contest places from the Sổ ân thưởng list (S.honors) */
 if(p!==S||!Array.isArray(S.honors)||!S.honors.length)return;const D=bag(p);const rev={};try{for(const k in CU_KHOI)rev[CU_KHOI[k]]=k}catch(e){}
 for(const h of S.honors){(D.podium=D.podium||{n:0}).n++;if(h.p===1){const k=rev[String(h.t||"").split(" · ")[0]];if(k&&DH["w_"+k])(D["w_"+k]=D["w_"+k]||{n:0}).n++}}}
function dhSync(p,quiet){if(!p||typeof p!=="object")return [];const first=!p.dh;if(first){bag(p);seedOld(p);quiet=true}const D=bag(p),got=[];
 for(const key in DH){if(DH[key].me&&p!==S)continue;const c=count(p,key),i=stepOf(key,c);if(i<0&&!D[key])continue;const e=D[key]||(D[key]={n:0});
  if(!key.startsWith("l_")&&key!=="meta"&&key!=="nights"&&key!=="kids")e.n=Math.max(e.n||0,c);
  if(i>(e.i==null?-1:e.i)){e.at=e.at||[];for(let j=(e.i==null?0:e.i+1);j<=i;j++)e.at[j]=when();e.i=i;got.push(key)}}
 if(got.length){if(p===S){if(!quiet)got.forEach(k=>dhNotice(k))}else if(!p.coop)dhAutoWear(p)}
 dhApplyFx(p);return got}
function dhInc(p,key,d){if(!p||!DH[key]||(DH[key].me&&p!==S))return;const D=bag(p);const e=D[key]||(D[key]={n:0});e.n=(e.n||0)+(d||1);return dhSync(p)}
window.dhSync=dhSync;window.dhInc=dhInc;
function earned(p){const D=(p&&p.dh)||{};return Object.keys(DH).filter(k=>D[k]&&D[k].i!=null&&D[k].i>=0&&!D[k].conf)}/* conf = confiscated (jdh2): not wearable until atonement */
/* NPCs: wear the highest title, pick the bonus by need (no heir yet → conception; low Sủng / Danh → that; else the first) */
function npcPick(p,key){const e=p.dh[key],L=choices(key,e.i);const pr=[];if(!p.preg&&(p.kids||[]).length<2)pr.push("thai");if((p.sung||0)<50)pr.push("gSung","sung");
 if((p.danh||0)<50)pr.push("gDanh","danh");if(p.maid&&(p.maid.loyal||0)<BAL.loy.mid)pr.push("gTrung");e.pick=pr.find(t=>L.includes(t))||L[0]}
function dhAutoWear(p){const L=earned(p).map(k=>dhObj(p,k)).filter(Boolean).sort((a,b)=>b.tier-a.tier);if(L.length){npcPick(p,L[0].key);dhWear(p,L[0].key,true)}}
/* ---------- wearing: one title at a time; its stat only while worn ---------- */
function wornKey(p){return keyOfWorn(p===S?S.titleWorn:p.titleWorn)}
function dhWear(p,key,quiet){if(!p)return;if(key&&(!dhObj(p,key)||(p.dh[key]||{}).conf))return;const v=key?"dh-"+key:null;if(p===S)S.titleWorn=v;else p.titleWorn=v;dhApplyFx(p);
 if(p===S&&!quiet&&typeof log==="function")log(key?`Ngươi đeo danh hiệu «${DH[key].n}».`:"Ngươi tháo danh hiệu xuống.")}
window.dhWear=dhWear;
function wornFx(p){const k=p&&wornKey(p);if(!k)return null;const e=(p.dh||{})[k];return e&&e.i>=0?fxOf(k,e.i,p):null}
/* the value of bonus type t the person's worn title gives now (0 if none) — every hook reads this */
function dhB(p,t){try{if(!p||p.coop)return 0;const f=wornFx(p);return f&&f[0]===t?f[1]:0}catch(e){return 0}}
window.dhB=dhB;
function dhApplyFx(p){if(!p||p.coop)return;const f=wornFx(p),want={};if(f&&FLAT.includes(f[0])&&f[0]!=="sac")want[f[0]]=f[1];const on=p.dhOn||{};let ch=false;
 for(const s of new Set(Object.keys(on).concat(Object.keys(want)))){const d=(want[s]||0)-(on[s]||0);if(!d)continue;const before=p[s]||0,after=Math.max(0,Math.min(100,before+d));p[s]=after;
  on[s]=(on[s]||0)+(after-before);if(!on[s])delete on[s];ch=true}
 if(ch||p.dhOn)p.dhOn=on;if(p.dhOn&&!Object.keys(p.dhOn).length)delete p.dhOn}
/* Sắc while worn = the ONE wearBonus (effSac reads it), like jewellery */
(function(){if(typeof wearBonus!=="function")return;const w0=wearBonus;wearBonus=function(p){const b=w0.apply(this,arguments);try{const f=p&&wornFx(p);if(f&&f[0]==="sac")b.sac=(b.sac||0)+f[1]}catch(e){}return b}})();
/* ---------- bonus hooks: each at the ONE place that computes that gain ---------- */
const fr=(n,d)=>{if(!(n>0)||!d)return 0;const x=n/d;return Math.floor(x)+(Math.random()<x%1?1:0)};
/* her Sủng / Danh / bạc / Thái hậu + Hoàng hậu / cung nữ gains: apply (j1, every change of her stats). Sủng is raised here BEFORE j1 runs it through sg
   (review/title-sys-r1: not inside sg, because sg also prints the previews (fmt, wkGainTxt) and a roll there made the shown number jump and differ from the real one) */
const GAINK=[["danh","gDanh"],["bac","gBac"],["th","gTren"],["hh","gTren"],["maid","gTrung"]];
function addGains(p,o,keys){if(!o||typeof o!=="object")return o;let c=null;for(const [k,t] of keys){const v=o[k];if(!(v>0))continue;const d=dhB(p,t);if(!d)continue;const x=fr(v,d);if(x){c=c||Object.assign({},o);c[k]=v+x}}return c||o}
(function(){if(typeof apply!=="function")return;const a0=apply;apply=function(o){try{if(S&&!S.dead)o=addGains(S,o,[["sung","gSung"]].concat(GAINK))}catch(e){}return a0.call(this,o)}})();
/* NPC gains: ap (j8, every change of an NPC's stats; her branch goes through apply above) */
(function(){if(typeof ap!=="function")return;const a0=ap;ap=function(p,o){try{if(p&&p!==S)o=addGains(p,o,[["sung","gSung"]].concat(GAINK))}catch(e){}return a0.call(this,p,o)}})();
/* liking from consorts: affAdd (j9, every thiện cảm change); x (her or a consort) likes y (the wearer) more */
(function(){if(typeof affAdd!=="function")return;const a0=affAdd;affAdd=function(x,y,n){try{if(n>0&&x&&y&&x!==y&&(x===S||(typeof rivals==="object"&&rivals.includes(x)))){const d=dhB(y,"gHau");if(d)n=n+fr(n,d)}}catch(e){}return a0.call(this,x,y,n)}})();
/* LUCK (Phúc khí): lotB (j13, the one odds modifier of every rolled act, hers and NPCs'); never conception; the Quẻ tag stays the quẻ only */
let NOLUCK=0;(window.THIN_REG=window.THIN_REG||[]).push(["NOLUCK",()=>NOLUCK,v=>{NOLUCK=v}]);/* per-player state for the co-op host (jcoopthin TH.reg) */
(function(){if(typeof lotB!=="function")return;const l0=lotB;lotB=function(p,dom){const r=l0.apply(this,arguments);try{if(!NOLUCK&&dom!=="Con cái")return r+dhB(p,"phuc")}catch(e){}return r};
 if(typeof lotTag==="function"){const t0=lotTag;lotTag=function(){NOLUCK++;try{return t0.apply(this,arguments)}finally{NOLUCK--}}}})();
/* conception: conceiveCh (the final chance, after every multiplier) +v points, only when a chance exists */
(function(){if(typeof conceiveCh!=="function")return;const c0=conceiveCh;conceiveCh=function(p){const r=c0.apply(this,arguments);try{if(r>0)return r+dhB(p||S,"thai")}catch(e){}return r}})();
/* self-study: addArt (her) / addArtP (NPC) — a chance of +1 progress */
(function(){if(typeof addArt==="function"){const a0=addArt;addArt=function(k,g){try{if(g>0&&S&&roll(dhB(S,"nghe")))g+=1}catch(e){}return a0.call(this,k,g)}}
 if(typeof addArtP==="function"){const a1=addArtP;addArtP=function(p,k,g){try{if(p&&p!==S&&g>0&&roll(dhB(p,"nghe")))g+=1}catch(e){}return a1.call(this,p,k,g)}}})();
/* contests: SC7[kind].f (j71, the talent of every entrant; the shown odds use it too) */
(function(){try{if(typeof SC7!=="object")return;for(const k in SC7){const f0=SC7[k]&&SC7[k].f;if(typeof f0!=="function"||f0.__dh)continue;const f=function(p){return f0.apply(this,arguments)+dhB(p,"thi")};f.__dh=1;SC7[k].f=f}}catch(e){console.error("dh",e)}})();
/* sleep: j76sleep (the one night's Sức regain, hers and NPCs') */
(function(){if(typeof j76sleep!=="function")return;const s0=j76sleep;j76sleep=function(p){return s0.apply(this,arguments)+dhB(p,"suc")}})();
/* rumours: ACT.rumor (j8, the one rumour act) — fewer odds against a wearer of "don" */
let RUMT=null;
(function(){try{if(typeof ACT!=="object"||!ACT.rumor||typeof oRumor!=="function")return;const o0=oRumor;oRumor=function(a){const r=o0.apply(this,arguments);try{if(RUMT)return Math.max(5,r-dhB(RUMT,"don"))}catch(e){}return r};
 const f0=ACT.rumor.f;ACT.rumor.f=function(a,t){RUMT=t;try{return f0.apply(this,arguments)}finally{RUMT=null}}}catch(e){console.error("dh",e)}})();
/* ---------- the kit hooks (KIT §82): resolve "dh-…" ids to title objects ---------- */
(function(){const w0=kitTitleWorn,d0=kitTitleDef;
 kitTitleWorn=function(p){try{if(p){const who=p===S?S:(p.titleWorn!==undefined?p:(p.ref&&p.ref.titleWorn!==undefined?p.ref:null));const k=who&&wornKey(who);if(k)return dhObj(who,k)}}catch(e){}return w0.apply(this,arguments)};
 kitTitleDef=function(id){try{if(typeof id==="string"&&/^dh-/.test(id)){const [k,pid]=id.slice(3).split("@");return dhObj(byPid(pid||"me"),k)}}catch(e){}return d0.apply(this,arguments)}})();
/* ---------- counting hooks ---------- */
(function(){if(typeof cFin7!=="function")return;const f0=cFin7;cFin7=function(k,kind,L){const r=f0.apply(this,arguments);
 try{(L||[]).slice(0,3).forEach((x,i)=>{const p=x&&x.p;if(!p||p.coop||(p!==S&&!npcOK()))return;const D=bag(p);(D.podium=D.podium||{n:0}).n++;if(i===0&&DH["w_"+kind])(D["w_"+kind]=D["w_"+kind]||{n:0}).n++;dhSync(p)})}catch(e){console.error("dh",e)}return r}})();
(function(){if(typeof runOpt!=="function")return;const r0=runOpt;runOpt=function(a){const r=r0.apply(this,arguments);try{if(r===true&&a&&a.n&&S&&!S.dead){const m=ACTK.find(([re])=>re.test(a.n));if(m)dhInc(S,m[1])}}catch(e){console.error("dh",e)}return r}})();
(function(){if(typeof wkMake!=="function")return;const m0=wkMake;wkMake=function(p,kind){const r=m0.apply(this,arguments);try{if(r&&p&&WORK[kind]&&!p.coop&&(p===S||npcOK()))dhInc(p,"m_"+kind)}catch(e){console.error("dh",e)}return r}})();
(function(){if(typeof rivalsMonth!=="function")return;const f0=rivalsMonth;rivalsMonth=function(){const r=f0.apply(this,arguments);try{if(npcOK())for(const v of rivals)if(v&&v.alive&&!v.coop)dhSync(v)}catch(e){console.error("dh",e)}return r}})();
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)dhSync(S)}catch(e){console.error("dh",e)}return r}})();
/* ---------- her new title: a kit reward panel, wear it now or later ---------- */
function dhNotice(key){const o=dhObj(S,key);if(!o||typeof kitPanel!=="function")return;const up=(S.dh[key].i||0)>0;
 if(typeof log==="function")log(up?`Danh hiệu «${o.name}» lên bậc ${KIT_TIER_NAME[Math.min(7,o.tier)]}.`:`Ngươi được danh hiệu «${o.name}».`);
 const worn=wornKey(S)===key;
 kitPanel({kind:"reward",title:up?"Danh hiệu lên bậc":"Danh hiệu mới",sub:o.when,dh:1,
  sections:[{h:"",html:`<div class="kt3">${kitTitlePlate(o)}</div>`},{h:"",rows:[["Cách có",esc(o.how)],["Khi đeo",esc(chTxt(key,S.dh[key].i)||o.fx||"chỉ để làm đẹp")],["Xem lại","Nhiệm vụ › Danh hiệu"]]}],
  opts:worn?[{n:"Đã hiểu",fx:{},x:"",go:()=>dhApplyFx(S)}]:[{n:"Đeo ngay",fx:{},x:chTxt(key,S.dh[key].i)||o.fx||"tấm danh hiệu trên đầu",go:()=>dhPick(key)},{n:"Để sau",fx:{},x:"",go:()=>{}}]})}
/* OD 21/11 ~04:14Z (#54): the new-title plate sits ON the event picture (caption at its bottom centre, like the chapter slide title), not as its own band under it.
   Applies to every title dialog (Danh hiệu mới / lên bậc / đeo): the .kt3 plate of the info column moves into the picture (.k3ev). The drawn title art is parked. */
function kitDhCap(){try{const d=document.querySelector("#modal:not([hidden]) .dlg");if(!d)return;const ev=d.querySelector(".k3right>.k3ev,.k3body>.k3mpic"),src=d.querySelector(".k3right .kt3:not(.kdhcap)");if(!ev||!src||!src.querySelector(".kdh,.kdh-cap,.j59t"))return;
 if(!ev.querySelector(":scope>.kdhcap")){const c=src.cloneNode(true);c.classList.add("kdhcap");c.style.display="";ev.appendChild(c)}src.style.display="none"}catch(e){}}
window.kitDhCap=kitDhCap;
(function(){const st=document.createElement("style");st.id="kdh-cap-css";st.textContent=`.ksz3 :is(.k3ev,.k3mpic)>.kt3.kdhcap{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);z-index:3;margin:0!important;width:max-content;max-width:calc(100% - 16px);text-align:center;filter:drop-shadow(0 2px 4px #2a1a1288)}`;document.head.appendChild(st);
 if(typeof showModal==="function"){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{requestAnimationFrame(kitDhCap);setTimeout(kitDhCap,300);setTimeout(kitDhCap,900)}catch(e){}return r}}})();
/* K-G4-PLATE (LIVE G4 80-dialog-fixed #54 flaky on a busy device): the fixed 300 / 900 ms calls miss a dialog that is (re)built later (kit sizing / life
   loader / a modal opened without showModal), and the plate then stays a band under the picture. ONE observer on #modal re-runs the idempotent kitDhCap
   on the next frame after any change, for EVERY title dialog (new / up / wear: any .k3ev picture with a .kt3 plate). */
(function(){let q=0;const run=()=>{q=0;kitDhCap()};const go=()=>{const m=document.getElementById("modal");if(!m)return setTimeout(go,500);
 try{new MutationObserver(()=>{if(q||m.hidden)return;if(!m.querySelector(".k3ev"))return;q=requestAnimationFrame(run)}).observe(m,{childList:true,subtree:true,attributes:true,attributeFilter:["hidden"]})}catch(e){}};go()})();
/* ---------- the bonus picker: wear a title and choose its ONE bonus (kit info panel + option cards) ---------- */
function dhPick(key,back){const o=dhObj(S,key);if(!o)return;const e=S.dh[key],L=choices(key,e.i);
 if(L.length<2){if(L.length)e.pick=L[0];dhWear(S,key);if(back)dhPanel();return}
 const cur=wornKey(S)===key?pickOf(S,key,e.i):null;
 const opts=L.map(t=>({n:bLab(t)+(t===cur?" · đang lấy":""),fx:{},x:bTxt(t,bv(t,e.i)),go:()=>{e.pick=t;if(wornKey(S)===key)dhApplyFx(S);else dhWear(S,key,true);
  if(typeof log==="function")log(`Ngươi đeo danh hiệu «${o.name}»: ${bTxt(t,bv(t,e.i))}.`);if(back)dhPanel()}}));
 opts.push({n:back?"Quay lại":"Để sau",fx:{},x:"",go:()=>{if(back)dhPanel()}});
 kitPanel({kind:"info",title:`Đeo «${o.name}»`,sub:"Mỗi lần chỉ đeo một danh hiệu, lấy một phần thưởng",dh:1,
  sections:[{h:"",html:`<div class="kt3">${kitTitlePlate(o)}</div>`},{h:"",rows:[["Cách có",esc(o.how)],["Khi đeo","chọn một phần thưởng bên dưới; tháo ra thì mất"]]}],opts},true);showModal()}
window.dhPick=dhPick;
/* ---------- NHIỆM VỤ › Danh hiệu ---------- */
let DHTAB="goal";
function tabsHTML(cur){const n=earned(S).length;const L=[];if(typeof kitGoalNow==="function"&&kitGoalNow())L.push({k:"goal",label:"Mục tiêu"});
 L.push({k:"dh",label:"Danh hiệu",n:`${n}/${dhTot()}`,tip:`đã có ${n} trên ${dhTot()} danh hiệu`});
 if(typeof window.geBoardPanel==="function")L.push({k:"tm",label:"Thiên mệnh"});
 return L.length>1&&typeof kitTabRowHTML==="function"?`<div class="pctabs kcattabs kdhtabs" role="tablist">${kitTabRowHTML(L,cur,"data-kdhtab")}</div>`:""}
function dhPanel(){if(!S)return;dhSync(S,true);DHTAB="dh";const wk=wornKey(S),E=earned(S);const sec=[];const tb=tabsHTML("dh");if(tb)sec.push({h:"",html:tb});
 const wo=wk&&dhObj(S,wk);sec.push({h:"Danh hiệu trên đầu",rows:[wo?[kitTitlePlate(wo),[esc(wo.fx||"chỉ để làm đẹp")],"t"]:["Trên đầu","chưa mang danh hiệu nào"]]});
 try{if(typeof window.dh2Secs==="function")for(const x of window.dh2Secs())sec.push(x)}catch(e){console.error("dh2Secs",e)}/* phase 2 (jdh2): hiệu ban + đường sám hối */
 for(const [g,gl] of GROUPS){const keys=Object.keys(DH).filter(k=>DH[k].g===g);const got=keys.filter(k=>E.includes(k)).map(k=>dhObj(S,k)).sort((a,b)=>b.tier-a.tier);
  const rest=g==="tm"||g==="kc"?[]:keys.filter(k=>!E.includes(k));const rows=got.map(o=>[kitTitlePlate(o),[esc(DH[o.key].how(need(o.key)[S.dh[o.key].i])),esc(o.key===wk?o.fx:(chTxt(o.key,S.dh[o.key].i)||o.fx)||"chỉ để làm đẹp")],"t"]);
  rest.forEach(k=>{const N=need(k),c=count(S,k);rows.push([esc(DH[k].n),[esc(DH[k].how(N[0])),`đã ${Math.min(c,N[0])}/${N[0]}`],"n"])});
  if(rows.length)sec.push({h:`${gl} · ${got.length}/${keys.length}`,rows})}
 const opts=E.filter(k=>k!==wk).map(k=>dhObj(S,k)).sort((a,b)=>b.tier-a.tier).map(o=>({n:`Đeo «${o.name}»`,fx:{},x:chTxt(o.key,S.dh[o.key].i)||o.fx||"tấm danh hiệu trên đầu",go:()=>dhPick(o.key,1)}));
 if(wk&&wo&&choices(wk,S.dh[wk].i).length>1)opts.unshift({n:`Đổi phần thưởng «${wo.name}»`,fx:{},x:chTxt(wk,S.dh[wk].i),go:()=>dhPick(wk,1)});
 if(wk)opts.push({n:"Tháo danh hiệu",fx:{},x:wo&&wo.fx?"mất: "+wo.fx.replace(/ \(khi đeo\)$/,""):"bỏ tấm danh hiệu trên đầu",go:()=>{dhWear(S,null);dhPanel()}});
 opts.push({n:"Đóng",fx:{},go:()=>{}});
 kitPanel({kind:"info",title:"Danh hiệu",sub:`Đã có ${E.length} trên ${dhTot()} · bấm một tấm để xem`,sections:sec,opts,dh:1},true);showModal()}
window.dhPanel=dhPanel;
/* the goal panel gets the same tab row on top */
(function(){const g0=window.kitGoalDetail;if(typeof g0!=="function")return;
 window.kitGoalDetail=function(){if(DHTAB==="dh"&&!arguments[0])return dhPanel();if(DHTAB==="tm"&&!arguments[0]&&window.geBoardPanel)return window.geBoardPanel(tabsHTML("tm"));const kp=kitPanel;kitPanel=function(spec,front){try{if(spec&&!spec.dh){const tb=tabsHTML("goal");if(tb)spec.sections=[{h:"",html:tb}].concat(spec.sections||[])}}catch(e){}return kp.apply(this,arguments)};
  try{return g0.apply(this,arguments)}finally{kitPanel=kp}}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kdhtab]");if(!b)return;e.stopPropagation();e.preventDefault();const t=b.dataset.kdhtab;
 if(t===DHTAB&&b.classList.contains("on"))return;Q.shift();if(t==="dh")dhPanel();else if(t==="tm"&&window.geBoardPanel){DHTAB="tm";window.geBoardPanel(tabsHTML("tm"))}else{DHTAB="goal";window.kitGoalDetail(true)}},true);
}catch(e){console.error("jdh",e)}})();
