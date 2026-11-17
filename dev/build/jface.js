/* ================= jface: kitFaceFx — ONE shared layer for face conditions (owner 11/14 01:15Z, review/appearance) =================
   Registry: KIT_FACEFX.add({id, z, ready, state(p), seen(p,st), sac(p,st), chip(p,st), html(p,file,st)}).
     state(p)   → the true condition object or null (rules: Sắc, cards, healing run on this, whatever the player knows)
     seen(p,st) → may the player see it on this face (herself, or she knows/has seen the person)
     sac(p,st)  → Sắc lost while it lasts (added into effSac, so nights, contests, jealousy follow)
     chip(p,st) → [text, cls] for the person card, shown only when seen
     html(p,file,st) → the layer markup for one picture (por-* or fig-*), placed from the veil/scar fit boxes; "" when no fit data
   ready=false keeps the PICTURE hidden (logic + chip still run) until the owner approves that entry's pilot.
   Layer order everywhere: portrait < face fx (by z: 10 pallor/poison, 20 rash, 30 slap) < scar < veil < frame.
   One hook each on kitFxLayers (portraits, small frames, room-stage and event-stage figures), effSac and pcard.
   Entries here: ốm yếu (ill, CSS), trúng độc (doc, CSS), bị tát (tat, img/fx-slap.png), bị phạt quỳ/trượng (phat, chip only).
   Postponed (no art yet, plug in later with add()): dưỡng nhan glow, tóc bạc sớm, đậu mùa marks. jrash registers itself here.
   EVERYONE with a face (owner 16/11, review/facefx-all): the entries run on ANY person object — her, consorts, her maids / eunuchs, other cung's servants,
   court staff (thái y, tổng quản), Hoàng thượng, Thái hậu, children, men — found through ONE lookup: KIT_FACEFX.person(ref) (object, face object, {kind,ref},
   consort id, "sv:<sid>", or name) and KIT_FACEFX.everyone() (all groups). New groups (review/elder-staff, ...) plug in with KIT_FACEFX.group({id,list,seen}).
   ONE rule for everyone (owner 16/11): every condition can land on anyone through the same state props (p.ill / p.sick / p.pz / p.rash / p.slap / p.pen; Thái hậu's
   illness is S.thIll). The ONLY exception: Hoàng thượng and Thái hậu are never slapped or punished (deny table). No per-kind code paths; the "seen" rule is one function.
   State API for other branches (review/mortality drives Hoàng thượng's / Thái hậu's illness and poison): KIT_FACEFX.api.{ill(p,k,st), cure(p), poison(p,sev,how,by,weeks), rash, slap, pen}.
   A picture needs fit rows (img/veil-fit.json + scar-fit.json) for that picture file: women's pictures have them; men / children / eunuch pictures plug in when
   their rows are added (KIT REQUEST) — chips, rules and logs already work for them. ================= */
window.KIT_FACEFX={list:[],
 add:function(d){if(!d||!d.id)return;this.list=this.list.filter(x=>x.id!==d.id);d.z=d.z==null?50:d.z;this.list.push(d);this.list.sort((a,b)=>a.z-b.z)},
 get:function(id){return this.list.find(x=>x.id===id)||null},
 each:function(p,fn){if(!p)return;const kd=this.kind(p);for(const d of this.list){if(this.deny[d.id]&&this.deny[d.id][kd])continue;let st=null;try{st=d.state(p)}catch(e){st=null}if(st)try{fn(d,st)}catch(e){}}},
 seenOf:function(d,p,st){try{return d.seen?!!d.seen(p,st):(p===S)}catch(e){return false}},
 /* geometry helpers: the veil-fit box (whole lower face, band = nose bridge) and the scar-fit box (cheek facing the viewer) */
 box:function(tbl,file,x){const n=String(file||"").split("/").pop();const r=tbl&&tbl[n];if(!r)return "";x=x||{};const dx=x.dx||0,dy=x.dy||0,sw=x.sw||1,sh=x.sh||1;
  return `left:${(r[0]+r[2]*dx).toFixed(2)}%;top:${(r[1]+r[3]*dy).toFixed(2)}%;width:${(r[2]*sw).toFixed(2)}%;height:${(r[3]*sh).toFixed(2)}%;transform:rotate(${r[4]}deg);transform-origin:${x.o||"50% 16.5%"}`},
 faceBox:function(file){return this.box(window.KIT_VEIL&&KIT_VEIL.fit,file)},
 cheekBox:function(file,x){return this.box(window.KIT_SCAR&&KIT_SCAR.fit,file,Object.assign({o:"50% 50%"},x||{}))},
 /* the CSS face tint (no painted art): backdrop pallor + tint + under-eye shadow + lip colour; v = {sat,br,tint,eye,lip} */
 cssFace:function(file,cls,v){const st=this.faceBox(file);if(!st)return "";const ex=KIT_FACEFX.get("expr");const lm=!!(ex&&ex.ready&&window.KIT_EXPR&&KIT_EXPR.has(file));const vars=`;--sat:${v.sat};--br:${v.br};--tint:${v.tint}`+(lm?"":`;--eye:${v.eye};--lip:${v.lip}`);
  return `<i class="kff ${cls}" aria-hidden="true" style="${kitFxVars(st)}${vars}"><b class="pl"></b><b class="tn"></b><b class="ey"></b><b class="lp"></b></i>`}};
window.kitFaceFx=KIT_FACEFX;
/* ---------- ONE person lookup for every face place (pcard, portraits, small frames, stage, podium, weekly pass) ---------- */
KIT_FACEFX.groups=[];KIT_FACEFX.deny={tat:{emp:1,thaihau:1},phat:{emp:1,thaihau:1}};
/* a SOURCE only says who exists (a list of person objects); it carries no rule. review/elder-staff etc. plug in with KIT_FACEFX.group({id,list}). */
KIT_FACEFX.group=function(d){if(!d||!d.id)return;this.groups=this.groups.filter(x=>x.id!==d.id);this.groups.push(d)};
KIT_FACEFX.everyone=function(){const out=[],seen=new Set();if(typeof S==="undefined"||!S)return out;
 for(const g of this.groups){let L=[];try{L=g.list()||[]}catch(e){L=[]}for(const p of L){if(p&&typeof p==="object"&&!seen.has(p)){seen.add(p);out.push(p)}}}return out};
/* whose household a person belongs to: a consort herself, a servant's mistress, a child's mother; everyone else (court, Hoàng thượng, Thái hậu, her own maid) is public / hers */
KIT_FACEFX.owner=function(p){try{if(!p||p===S)return S;if((rivals||[]).includes(p))return p;if(typeof ownerOf==="function"){const o=ownerOf(p);if(o)return o}
 if(typeof allKids==="function"){const a=allKids().find(x=>x[0]===p);if(a)return a[1]||S}}catch(e){}return S};
KIT_FACEFX.kind=function(p){try{const r=personRoleRank(p);const k=r.role;if(r.kid||k==="heir"||k==="prince"||k==="princess")return"kid";if(k==="mama")return"maid";return k||"other"}catch(e){return"other"}};
KIT_FACEFX.live=function(p){try{if(!p)return false;if(p===S)return !S.dead;if(S&&(p===S.thO||p.kind==="th"))return !S.thDead;if(p.alive===false||p.dead||p.out)return false;return true}catch(e){return false}};
KIT_FACEFX.seen=function(p){try{if(!p)return false;if(p===S)return true;if(typeof kitIsKnown==="function"&&!kitIsKnown(p))return false;const o=this.owner(p);if(o===S||!o)return true;return typeof knows!=="function"||!!knows(o)}catch(e){return false}};
KIT_FACEFX.person=function(ref){try{if(ref==null||typeof S==="undefined"||!S)return null;
 if(typeof ref==="object"){if(ref.__kp)return this.person(ref.__kp);if(ref.ref&&typeof ref.ref==="object")return this.person(ref.ref);
  if(ref.kind&&!ref.name){const k=ref.kind;if(k==="emp")return S.emp;if(k==="th")return S.thDead?null:(S.thO=S.thO||{});if(k==="maid")return S.maid||null;if(k==="ty"||k==="tq")return S.court&&S.court[k]||null;if(k==="kid"&&ref.ref)return ref.ref;return null}
  return ref}
 if(typeof ref==="number"||/^\d+$/.test(String(ref))){const id=+ref;return (rivals||[]).find(v=>v.id===id)||null}
 let s=String(ref).replace(/<[^>]*>/g,"").trim();if(!s)return null;
 const m=/^sv:(\d+)$/.exec(s);if(m)return typeof servById==="function"?servById(+m[1]):null;
 if(s===S.name)return S;if(s==="Thái hậu"&&!S.thDead)return S.thO=S.thO||{};
 try{if(s==="Hoàng thượng"||(typeof empName==="function"&&s===empName()))return S.emp}catch(e){}
 for(const p of this.everyone()){if(p.name===s)return p;try{if(p.sex&&typeof h54Name==="function"&&h54Name(p)===s)return p}catch(e){}}
 return null}catch(e){return null}};
/* the built-in sources: who exists */
(function(){const G=(id,list)=>KIT_FACEFX.group({id,list});
 G("self",()=>[S]);G("rivals",()=>rivals||[]);G("emp",()=>S.emp?[S.emp]:[]);G("th",()=>S.thDead?[]:S.thO?[S.thO]:[]);G("maid",()=>S.maid&&typeof S.maid==="object"?[S.maid]:[]);
 G("staff",()=>S.staff||[]);G("rstaff",()=>{const L=[];for(const v of rivals||[])for(const s of v.staff||[])L.push(s);return L});
 G("court",()=>S.court?Object.values(S.court).filter(x=>x&&typeof x==="object"):[]);G("men",()=>S.men||[]);G("kids",()=>typeof allKids==="function"?allKids().map(a=>a[0]):[])})();
(function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){let h=f0.apply(this,arguments);if(!p||!file)return h;let pre="";p=KIT_FACEFX.person(p)||p;
  KIT_FACEFX.each(p,(d,st)=>{if(d.ready&&d.html&&KIT_FACEFX.seenOf(d,p,st)){const x=d.html(p,file,st);if(x)pre+=x}});return pre+h}})();
(function(){const e0=effSac;effSac=function(p){let r=e0.apply(this,arguments);try{let lost=0;KIT_FACEFX.each(p,(d,st)=>{if(d.sac)lost+=d.sac(p,st)||0});if(lost)r=cl(r-lost,0,130)}catch(e){}return r}})();
(function(){const p0=pcard;pcard=function(o){try{if(S&&o){const p=KIT_FACEFX.person(o.f&&o.f.__kp?o.f.__kp:o.name);
  if(p){const C=[];KIT_FACEFX.each(p,(d,st)=>{if(d.chip&&KIT_FACEFX.seenOf(d,p,st)){const c=d.chip(p,st);if(c)C.push(chip(c[0],c[1]||"hot"))}});if(C.length)o=Object.assign({},o,{chips:(o.chips||[]).concat(C)})}}}catch(e){}return p0.call(this,o)}})();
(function(){const st=document.createElement("style");st.id="kface-fx";st.textContent=`
.kfx>i.kff,.kfxf>i.kff{position:absolute;display:block;pointer-events:none;left:var(--fleft);top:var(--ftop);width:var(--fwidth);height:var(--fheight);transform:var(--ftf,none);transform-origin:var(--fto,50% 16.5%)}
.kff>b{position:absolute;inset:0;display:block}
.kff>b.pl,.kff>b.tn{inset:-42% -10% -4% -10%}
.kff>b.pl{-webkit-backdrop-filter:saturate(var(--sat)) brightness(var(--br));backdrop-filter:saturate(var(--sat)) brightness(var(--br));-webkit-mask-image:radial-gradient(44% 46% at 52% 48%,#000 50%,transparent 100%);mask-image:radial-gradient(44% 46% at 52% 48%,#000 50%,transparent 100%)}
.kff>b.tn{background:radial-gradient(42% 44% at 52% 48%,var(--tint) 0%,transparent 100%)}
.kff>b.ey{background:radial-gradient(11% 3.6% at 33% 20.5%,var(--eye) 0%,transparent 100%),radial-gradient(10% 3.4% at 72.5% 20.5%,var(--eye) 0%,transparent 100%)}
.kff>b.lp{background:radial-gradient(12.5% 3.6% at 56% 55.5%,var(--lip) 0%,var(--lip) 35%,transparent 100%)}
.kfx>img.kslap,.kfxf>img.kslap{opacity:.5}
.kfx>img.kslap.s1,.kfxf>img.kslap.s1{opacity:.42}.kfx>img.kslap.s2,.kfxf>img.kslap.s2{opacity:.68;filter:saturate(1.3) brightness(.93)}.kfx>img.kslap.s3,.kfxf>img.kslap.s3{opacity:.88;filter:saturate(1.55) brightness(.8)}.kfx>img.kswell,.kfxf>img.kswell{opacity:.85;filter:none}`;document.head.appendChild(st)})();

/* ---------- shared helpers ---------- */
const FXF={ill:[0,2,4,6],weakSuc:25,kidHp:[35,20],doc:[0,4,7],docWk:[0,3,4],slowWk:9,docMed:40,docNpcHeal:35,docNotice:30,
 tat:3,tatWk:2,tatDuc:-2,tatRel:-20,penQuy:-8,penWk:[0,1,2],phatDuc:-1,phatRel:-15,cd:3};
function fxSeen(p){return KIT_FACEFX.seen(p)}                        /* the one "seen" rule: herself, or she knows / has seen the person (group rule) */
function fxLive(p){return KIT_FACEFX.live(p)}
function fxKey(by){try{return by&&["consort","player"].includes(KIT_FACEFX.kind(by))?key(by):null}catch(e){return null}}
function fxLeft(u){return Math.max(1,(u|0)-wk())}
function fxName(p){try{if(p===S)return"Ngươi";if(p&&p.name)return p.name;const k=KIT_FACEFX.kind(p);if(k==="thaihau")return"Thái hậu";if(k==="emp")return typeof empName==="function"?empName():"Hoàng thượng"}catch(e){}return""}
function fxWho(p){return fxName(p)}
function fxIllSeen(p){try{const i=fxIll(p);if(!i)return false;if(typeof illOf==="function"&&i===illOf(p)&&typeof illKnown==="function")return !!illKnown(p);return !!i.known}catch(e){return false}}
function fxIllName(i){try{return `${ILL[i.k].n} · ${STG[i.st|0]||STG[1]}`}catch(e){return"Người ốm yếu, xanh xao"}}
function fxIll(p){if(!p)return null;const i=typeof illOf==="function"?illOf(p):null;if(i)return i;try{if(S&&(p===S.thO||p.kind==="th")&&S.thIll&&!S.thDead)return S.thIll}catch(e){}return null}
function fxLog(p,t){try{if(p===S||fxSeen(p))log(t)}catch(e){}}

/* ---------- 1. ỐM YẾU: paler skin, faint shadow under the eyes, pale lips; while ill (j13 p.ill), ốm sau độc dần (p.sick) or Sức very low ---------- */
const FXILL=[null,{sat:.70,br:1.06,tint:"rgba(242,240,238,.22)",eye:"rgba(122,96,128,.22)",lip:"rgba(236,212,206,.50)"},
 {sat:.60,br:1.07,tint:"rgba(236,236,232,.27)",eye:"rgba(112,90,122,.28)",lip:"rgba(234,213,207,.60)"},
 {sat:.50,br:1.08,tint:"rgba(232,232,228,.32)",eye:"rgba(104,84,116,.34)",lip:"rgba(232,214,208,.70)"}];
/* the matching face (KIT_EXPR mix): tired / pained, under-eye shadow and dry pale lips on the landmarks */
const FXILLX=[null,{buon:.5,eye:"150,120,150,.20",lip:"236,212,206,.45,n"},{buon:.55,dau:.25,eye:"134,108,140,.24",lip:"234,213,207,.55,n"},{buon:.6,dau:.5,eye:"120,96,130,.26",lip:"232,214,208,.62,n"}];
KIT_FACEFX.add({id:"ill",z:10,ready:true,                  /* owner approved (pilot 2) */
 state:p=>{if(!p||p===S&&S.dead||!fxLive(p))return null;const kd=KIT_FACEFX.kind(p);const i=fxIll(p);
  if(i&&i.k!=="docman"&&(i.k!=="longthe"||kd==="emp"))return{lvl:cl(i.st|0,1,3),ill:i};                      /* long thể bất an is the Emperor's own illness */
  if((p.sick||0)>0)return{lvl:2};
  if(kd==="kid"&&typeof p.hp==="number"&&p.hp<FXF.kidHp[0])return{lvl:p.hp<FXF.kidHp[1]?2:1,kid:true};     /* a child worn down (the same hp<35 the Hoàng tự list calls "ốm") */
  if(typeof p.suc==="number"&&(p.suc<FXF.weakSuc||typeof khB==="function"&&khB()&&khOf(p)<khB().faceLo)&&!(p.pz&&p.pz.until>wk()))return{lvl:1,weak:true};return null},
 seen:(p,st)=>p===S||(st.ill?fxIllSeen(p)&&fxSeen(p):fxSeen(p)),
 sac:(p,st)=>FXF.ill[st.lvl],
 chip:(p,st)=>st.ill?(["consort","player"].includes(KIT_FACEFX.kind(p))?null:[fxIllName(st.ill),"hot"]):[st.weak?"Sắc mặt nhợt nhạt":"Người ốm yếu, xanh xao","hot"],   /* a consort's illness already has its own chip (j13 illName) */
 html:(p,file,st)=>KIT_FACEFX.cssFace(file,"kff-ill",FXILL[st.lvl])});

/* ---------- 2. TRÚNG ĐỘC: lips faintly blue-violet, skin greyish pale. p.pz {sev 1..2, until, by, how, at, dx (physician confirmed), nt (noticed by her)} ---------- */
const FXDOC=[null,{sat:.56,br:1.0,tint:"rgba(200,214,200,.26)",eye:"rgba(100,100,130,.28)",lip:"rgba(140,118,172,.55)"},
 {sat:.48,br:1.0,tint:"rgba(198,214,198,.30)",eye:"rgba(96,98,128,.32)",lip:"rgba(140,118,172,.62)"}];
const FXDOCX=[null,{dau:.7,eye:"110,110,140,.26",lip:"140,118,172,.38"},{dau:.9,eye:"110,110,140,.30",lip:"140,118,172,.45"}];
function pzGive(p,sev,how,by,weeks){if(!p||!fxLive(p))return;sev=cl(sev|0,1,2);const u=wk()+(weeks||FXF.docWk[sev]);
 if(p.pz){p.pz.sev=Math.max(p.pz.sev,sev);p.pz.until=Math.max(p.pz.until,u);if(by)p.pz.by=fxKey(by);return}
 p.pz={sev,until:u,how:how||"",by:fxKey(by),at:wk(),dx:0,nt:0}}
function pzOf(p){if(!p||!fxLive(p))return null;if(p.pz&&p.pz.until>wk())return p.pz;const i=typeof illOf==="function"?illOf(p):null;if(i&&i.k==="docman")return{sev:i.st>=2?2:1,ill:1};return null}
function fxTogether(p){try{return typeof together!=="function"||!!together(S,p)}catch(e){return false}}
function fxObservant(){try{return eyes(S)>=3||((S.arts&&S.arts.y)||0)>=2||!!S.doctor}catch(e){return false}}
KIT_FACEFX.add({id:"doc",z:12,ready:true,                  /* owner approved (pilot 2) */
 state:p=>pzOf(p),
 seen:(p,st)=>fxSeen(p),                                /* the face itself shows to anyone who sees her; what it MEANS needs an eye (chip) */
 sac:(p,st)=>FXF.doc[st.sev],
 chip:(p,st)=>p===S?[st.dx||st.ill?"Trúng độc · môi tím tái":"Môi tím tái, người lả đi","hot"]:(st.dx||fxObservant())?["Môi tím tái: như trúng độc","hot"]:null,
 html:(p,file,st)=>KIT_FACEFX.cssFace(file,"kff-doc",FXDOC[st.sev])});
/* causes: Hạ độc (j8 ACT.poison, also the dish of j83 and maids' orders that call it) and Hạ độc dần (j30) — two-way, the same for everyone */
(function(){try{const P=ACT.poison,f0=P.f;P.f=function(a,t){const s0=t?t.suc:0;const r=f0.apply(this,arguments);try{if(t&&fxLive(t)&&t.suc<s0&&/trúng độc/.test(String(r||""))&&!/thuốc giải/.test(String(r||"")))pzGive(t,2,"độc trong điểm tâm",a)}catch(e){}return r}}catch(e){}})();
(function(){try{const P=ACT.slowpoison,f0=P.f;P.f=function(a,t){const s0=t?(t.sick||0):0;const r=f0.apply(this,arguments);try{if(t&&(t.sick||0)>s0)pzGive(t,1,"độc ngấm dần",a,FXF.slowWk)}catch(e){}return r}}catch(e){}})();
/* weekly: wears off; Thái y medicine / Y thuật / NPC care heal faster; she may NOTICE it on someone she sees — a clue for the evidence system */
function pzWeek(p){const z=p&&p.pz;if(!z)return;if(z.until<=wk()){p.pz=null;fxLog(p,p===S?"Môi ngươi đã hồng trở lại, độc tan hết.":`${fxName(p)} đã khỏe lại, sắc môi hồng như cũ.`);return}
 if(p!==S&&(roll(FXF.docNpcHeal)||((p.arts&&p.arts.y)||0)>=2))z.until--;
 if(p!==S&&!z.nt&&fxObservant()&&fxSeen(p)&&(fxTogether(p)||roll(40))){z.nt=1;let t=`Ngươi để ý môi ${fxName(p)} tím tái, sắc mặt xám, giống người trúng độc.`;
  const by=z.by&&typeof byKey==="function"?byKey(z.by):null;if(by&&by!==S&&roll(FXF.docNotice+(S.doctor?20:0))){evA(S,by,BAL.eff.jface.evPzWeek);t+=` Ngươi lần theo thang thuốc, ra dấu vết người của ${by.name}: Chứng cứ về ${by.name} ${balSg(BAL.eff.jface.evPzWeek)}.`}try{log(t)}catch(e){}}}
PEND.pzcard=pp=>{const z=S&&S.pz;if(!z||z.until<=wk())return null;const o=[];const y=(S.arts&&S.arts.y)||0;
 o.push(ch70("Mời thái y bắt mạch, giải độc",{c:{bac:-FXF.docMed},wt:[G70("rõ là độc gì, mau tan")],ok:()=>{z.dx=1;z.until=Math.max(wk()+1,z.until-2);let t="Thái y bắt mạch, nói ngươi trúng độc, kê thang giải độc.";
  const by=z.by&&typeof byKey==="function"?byKey(z.by):null;if(by&&by!==S&&roll(BAL.odb.jface.rbOk+(S.doctor?20:0))){evA(S,by,BAL.eff.jface.evOk);t+=` Thái y nhận ra vị độc, lần ra người của ${by.name} từng mua: Chứng cứ về ${by.name} ${balSg(BAL.eff.jface.evOk)}.`}return t}}));
 o.push(ch70("Uống thuốc giải trong rương",{need:[{t:kitWhyItem("thuốc giải"),ok:(S.inv||[]).some(e=>e.k==="giaidoc"&&!e.h),w:kitWhenItem()}],wt:[G70("độc tan ngay")],k:[R70("dùng hết 1 thuốc giải")],ok:()=>{takeItem(S,"giaidoc");S.pz=null;return "Ngươi uống thuốc giải, môi hồng trở lại."}}));
 o.push(ch70("Tự sắc thuốc giải độc",{p:cl(30+y*15,5,95),c:{suc:-3},wt:[G70("độc tan sớm hơn")],lt:[R70("uống sai vị, lâu khỏi hơn")],ok:()=>{z.until=Math.max(wk()+1,z.until-1);return "Ngươi tự sắc cam thảo, lục đậu giải độc."},no:()=>{z.until++;return "Thuốc không hợp, độc lâu tan hơn."}}));
 o.push(ch70("Nằm nghỉ chờ khỏi",{wt:[G70("không tốn gì")],k:[R70(`còn ${fxLeft(z.until)} tuần`)],ok:()=>"Ngươi nằm nghỉ, uống nước cháo loãng."}));
 return{who:pMe(),t:`<p>Môi ngươi tím tái, da xám đi${z.dx?" — thái y nói là trúng độc":", người lả đi không rõ vì sao"}: Sắc đang mất ${FXF.doc[z.sev]}; còn chừng ${fxLeft(z.until)} tuần.</p>`,o}};

/* ---------- 3. BỊ TÁT: a faint soft handprint on the cheek for a few tuần (img/fx-slap.png on the scar-fit cheek box) ---------- */
function slapSev(p){const z=p&&p.slap;return z?cl(z.sev|0||1,1,3):0}   /* old saves without sev = nhẹ (same as the tat entry's state() from facefx-all-r2 on main; reviewer r1) */
function slapGive(p,by,why,sev){sev=cl(sev|0||BAL.slap.def,1,3);if(!p||!fxLive(p)||KIT_FACEFX.deny.tat[KIT_FACEFX.kind(p)])return"";p.slap={sev,until:wk()+BAL.slap.wk[sev]+(roll(BAL.slap.wkX)?1:0),by:fxKey(by),at:wk()};
 const t=`${fxWho(p)} bị ${by?(by===S?"ngươi":fxName(by)):"người ta"} tát${why?" vì "+why:""}: má in dấu tay ${BAL.slap.nm[sev]}${["consort","player"].includes(KIT_FACEFX.kind(p))?`, Sắc -${BAL.slap.sac[sev]}`:""} vài tuần.`;fxLog(p,t);return t}
KIT_FACEFX.add({id:"tat",z:30,ready:true,                  /* owner approved the handprint (pilot 11/14) */
 state:p=>{if(!p||!p.slap||p.slap.until<=wk())return null;if(!p.slap.sev)p.slap.sev=1;return p.slap},   /* old slaps default to sev 1 (nhẹ); tiers 1..3 = nhẹ/vừa/nặng */
 seen:(p,st)=>fxSeen(p),
 sac:(p,st)=>{const vg=p.vl&&typeof vlG==="function"?vlG(p.vl):-1;return Math.round(BAL.slap.sac[slapSev(p)||BAL.slap.def]*(vg>=0&&window.VL?VL.cover[vg]:1))},
 chip:(p,st)=>[`Má in dấu tay ${BAL.slap.nm[slapSev(p)||BAL.slap.def]} · còn ${fxLeft(st.until)} tuần`,"hot"],
 html:(p,file,st)=>{const s=KIT_FACEFX.cheekBox(file,{dx:.04,dy:.17,sw:.9,sh:.9});if(!s)return"";const v=slapSev(p)||BAL.slap.def,sv=kitFxVars(s);return `<img class="kslap s${v}" src="img/fx-slap.png" alt="" aria-hidden="true" style="${sv}" onerror="this.remove()">`+(v>=3?`<img class="kslap kswell" src="img/fx-slap-swell.png" alt="" aria-hidden="true" style="${sv}" onerror="this.remove()">`:"")}});

/* ---------- 4. BỊ PHẠT QUỲ / ĐÁNH TRƯỢNG: a status chip (no art); walking costs one more khắc while it lasts (her), NPCs scheme less ---------- */
function penGive(p,k,why,by){if(!p||!fxLive(p)||KIT_FACEFX.deny.phat[KIT_FACEFX.kind(p)])return;const sev=k==="truong"?2:1;const u=wk()+FXF.penWk[sev];p.pen={k,until:Math.max(u,p.pen&&p.pen.until||0),why:why||"",by:fxKey(by)}}
const PEN_N={quy:"Bị phạt quỳ, gối đau",truong:"Bị đánh trượng, đi lại khó"};
KIT_FACEFX.add({id:"phat",z:90,ready:true,                 /* no picture: chip and rules only */
 state:p=>p&&p.pen&&p.pen.until>wk()?p.pen:null,
 seen:(p,st)=>fxSeen(p),
 chip:(p,st)=>[`${PEN_N[st.k]||PEN_N.quy} · đi chậm · còn ${fxLeft(st.until)} tuần`,"hot"]});
(function(){const t0=travel;travel=function(a,b){const r=t0.apply(this,arguments);try{if(r>0&&S&&S.pen&&S.pen.until>wk())return r+1}catch(e){}return r}})();
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(v&&v.pen&&v.pen.until>wk()&&roll(50))return[]}catch(e){}return O}})();

/* ---------- causes for slap + punishment ---------- */
/* maid path (j42): talking back to the mistress, refusing her order, the beating */
(function(){try{const s0=PEND.cnvScold;if(s0)PEND.cnvScold=function(){const d=s0.apply(this,arguments);try{const op=d&&d.o&&d.o.find(x=>x.n==="Cãi lại");const m=typeof srvM==="function"?srvM():null;if(op&&op.go){const g=op.go;op.go=function(){const q0=S.suc;const r=g.apply(this,arguments);try{if(S.suc<q0)penGive(S,"quy","cãi lại chủ");else if(roll(BAL.slap.scold))slapGive(S,m,"cãi lại")}catch(e){}return r}}}catch(e){}return d}}catch(e){}})();
(function(){try{const s0=PEND.cnvOrd;if(s0)PEND.cnvOrd=function(){const d=s0.apply(this,arguments);try{const op=d&&d.o&&d.o.find(x=>x.n==="Từ chối");if(op&&op.go){const g=op.go;op.go=function(){const q0=S.suc;const r=g.apply(this,arguments);try{if(S.suc<q0&&!S.dead)penGive(S,"quy","từ chối lệnh chủ")}catch(e){}return r}}}catch(e){}return d}}catch(e){}})();
(function(){if(typeof srvMoodEvent!=="function")return;const s0=srvMoodEvent;srvMoodEvent=function(){const n=Q.length;const r=s0.apply(this,arguments);try{if(Q.length>n&&Q[Q.length-1]&&Q[Q.length-1].t==="Bị đánh đòn"&&!S.dead)penGive(S,"truong","bị chủ sai đánh")}catch(e){}return r}})();
/* the acts, two-way (same rules for her and every consort): Tát (higher rank, same place) and Phạt quỳ (Hoàng hậu, or three ranks above) */
function fxAuth(a,t){try{return !!a&&!!t&&a!==t&&(a.queen||(a===S&&S.rank>=7)||rkOf(a)>=rkOf(t)+3)}catch(e){return false}}
/* Tát, three tiers (owner 16/11): her tier comes from the power-bar game (jslap) or "Tát luôn" = nhẹ; an NPC's tier is rolled (jslap) and her dodge lowers it by one.
   SLAP.next = the tier chosen for the very next tat (consumed here). A harder slap costs more Đức, leaves a deeper grudge and a darker mark that others can report. */
const SLAP={next:0};window.SLAP=SLAP;
function slapEvidence(a,t,sev){try{const B=BAL.slap;let r="";if(a!==S&&a.alive===false)return r;
 if(B.evT[sev]&&roll(B.evT[sev])&&t!==a){evA(t,a,BAL.eff.jface.evSlapEvidence);r+=`${NMc(t)} ghi nhớ cái tát này (chứng cứ về ${NM(a)} ${balSg(BAL.eff.jface.evSlapEvidence)}). `}
 const W=(typeof liveRivals==="function"?liveRivals(true):[]).filter(x=>x!==a&&x!==t);
 if(B.evW[sev]&&W.length&&roll(B.evW[sev])){const w=W[Math.floor(Math.random()*W.length)];evA(w,a,BAL.eff.jface.evSlapEvidence_2);if(a===S)r+="Có kẻ trông thấy, ghi lại chuyện này. "}return r}catch(e){return""}}
A("tat","Tát",{c:{},ok:(a,t)=>together(a,t)&&rkOf(a)>rkOf(t)&&!(t.slap&&t.slap.until>wk()),o:()=>100,x:"đánh nhẹ, vừa hay nặng tùy tay: nàng in dấu tay trên má, Sắc giảm vài tuần · Đức ngươi giảm theo độ nặng · nàng oán ngươi",f:(a,t)=>{
 const B=BAL.slap;let sev=cl(SLAP.next|0||B.def,1,3);SLAP.next=0;const dc=B.duc[sev];
 if(typeof ducAdd==="function")ducAdd(a,dc,"tát người");else ap(a,{duc:dc});relAdd(t,a,B.rel[sev]);if(B.oan[sev])oanAdd(t,a,B.oan[sev]);slapGive(t,a,"",sev);let r=`${NMc(a)} giáng một cái tát ${B.nm[sev]} lên má ${NM(t)}. `;
 if(sev>=3&&roll(B.thau)){ap(a,{danh:B.thauDanh});r+=`Thái hậu nghe chuyện, quở trách nặng lời (Danh ${a===S?"ngươi":NM(a)} ${B.thauDanh}). `}
 if((t.sung||0)>=B.hoangMin&&roll(B.hoang[sev])){ap(a,{sung:B.sung[sev]});r+=`Hoàng thượng nghe chuyện, không vui (Sủng ${a===S?"ngươi":NM(a)} ${B.sung[sev]}). `}
 r+=slapEvidence(a,t,sev);return `<span class="${t===S?"r":"g"}">${r}</span>`}});
A("phatquy","Phạt quỳ",{c:{duc:FXF.phatDuc},ok:(a,t)=>fxAuth(a,t)&&!(t.pen&&t.pen.until>wk()),o:()=>100,x:"nàng quỳ nửa ngày ngoài sân: Sức -8, đi lại chậm một tuần · nàng oán ngươi",f:(a,t)=>{
 if(typeof ducAdd==="function")ducAdd(a,FXF.phatDuc,"phạt quỳ");else ap(a,{duc:FXF.phatDuc});relAdd(t,a,FXF.phatRel);if(t===S)apply({suc:FXF.penQuy});else ap(t,{suc:FXF.penQuy});penGive(t,"quy","bị phạt",a);
 if(t.schemes>0)ap(a,{danh:1});return `<span class="${t===S?"r":"g"}">${NMc(a)} phạt ${NM(t)} quỳ nửa ngày ngoài sân: Sức -${-FXF.penQuy}, gối đau, đi lại chậm.</span> `}});
try{AOUT.tat=["nàng in dấu tay trên má, Sắc giảm vài tuần; nàng oán ngươi",""];AOUT.phatquy=["nàng quỳ phạt: Sức -8, đi lại chậm một tuần; nàng oán ngươi",""]}catch(e){}
try{LACK.tat=t=>!together(S,t)?"nàng ở cùng chỗ với ngươi":rkOf(S)<=rkOf(t)?"phẩm ngươi cao hơn nàng":t.slap&&t.slap.until>wk()?"má nàng còn in dấu tay":"";
 LACK.phatquy=t=>!fxAuth(S,t)?"ngươi là Hoàng hậu, hoặc trên nàng ba phẩm":t.pen&&t.pen.until>wk()?"nàng đang chịu phạt":""}catch(e){}
try{ACTDOM.tat="Mưu kế";ACTDOM.phatquy="Mưu kế";J78VERB.tat="tát {t}";J78VERB.phatquy="phạt {t} quỳ";HARMK["Tát"]="tat";HARMK["Phạt quỳ"]="phatquy"}catch(e){}
try{for(const k of ["tat","phatquy"]){if(!BANDS[1][2].includes(k))BANDS[1][2].push(k);const g=RVGRP.find(x=>x[0]==="Hại nhỏ");if(g&&!g[1].includes(k))g[1].push(k)}}catch(e){}
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(!O.length)return O;const b=bandOf(danger(v,t));if(b>=1){
  if(ACT.tat.ok(v,t)){const w=.8*persW(v,"trip");if(w>0)O.push(["tat",w])}if(ACT.phatquy.ok(v,t)){const w=.7*persW(v,"trip");if(w>0)O.push(["phatquy",w])}}}catch(e){}return O}})();

/* ---------- 5. EXPRESSIONS: removed (owner 11/14 22:50Z — feelings are shown by the small mood icons, not by reshaping faces in code). faceExpr kept as a no-op for old callers. */
function faceExpr(){}

/* stage figures: jk2b's .kfxf box copies the figure's offset box but not its transform (figures are centred with translateX(-50%)),
   so every face layer (veil, scar, rash, slap, expression) sat half a figure to the right. Copy the transform onto the box. */
(function(){if(typeof kitFigFx!=="function")return;const k0=kitFigFx;kitFigFx=function(){const r=k0.apply(this,arguments);try{const st=$("stage");if(st)st.querySelectorAll(".kfxf").forEach(s=>{const img=s.parentElement&&s.parentElement.querySelector("img.kfxon");if(!img)return;const cs=getComputedStyle(img);s.style.transform=cs.transform==="none"?"":cs.transform;s.style.transformOrigin=cs.transformOrigin})}catch(e){}return r}})();
/* the podium figures (j90 kitPodium: Bảng vàng, tranh ghế, hoàng tự, công chúa) are faces too: same layers over the drawn figure, through the same kitFxPut */
(function(){if(typeof kpodCol!=="function"||typeof kpodFit!=="function"||typeof kitFxPut!=="function")return;const c0=kpodCol,f0=kpodFit;window.__kpodWho=[];
 kpodCol=function(x){let h=c0.apply(this,arguments);try{const i=window.__kpodWho.push(x&&x.who)-1;h=h.replace('<img class="kpod-img','<img data-kfw="'+i+'" class="kpod-img')}catch(e){}return h};
 kpodFit=function(root){const r=f0.apply(this,arguments);try{root.querySelectorAll("img.kpod-img[data-kfw]").forEach(im=>{const go=()=>{try{const h=im.parentElement;h.querySelectorAll(".kfxf").forEach(e=>e.remove());const p=KIT_FACEFX.person(window.__kpodWho[+im.dataset.kfw]);if(p)kitFxPut(im,p,h)}catch(e){}};
   if(im.complete&&im.naturalWidth)go();else im.addEventListener("load",go,{once:true})})}catch(e){}return r}})();
/* ---------- servants, court staff, children: the harm the code already does leaves a mark (owner 16/11: everyone gets the same rules) ---------- */
/* her punishment of a servant (j10 Phạt, j24 phạt vì lỗi): kneeling; a punishment with no fault also lands a slap and a grudge */
(function(){if(typeof servAct!=="function")return;const s0=servAct;servAct=function(a,id){let s=null,own=false;try{s=servById(id);own=!!s&&ownerOf(s)===S}catch(e){}const r=s0.apply(this,arguments);
 try{if(own&&a==="phat"&&s&&(S.staff||[]).includes(s)){penGive(s,"quy","bị phạt",S)}}catch(e){}return r}})();
(function(){if(typeof judgeServ!=="function")return;const j0=judgeServ;judgeServ=function(s,how,paid){const c=s&&s.cause;const r=j0.apply(this,arguments);
 try{if(how==="phat"&&s&&(S.staff||[]).includes(s)){if(c&&c.fault)penGive(s,"quy",c.txt,S);else{slapGive(s,S,"bị phạt oan");penGive(s,"quy","bị phạt oan",S)}}}catch(e){}return r}})();
/* smallpox in a cung (j13 epidemic): the servants of the house catch it too, for a few tuần */
(function(){if(typeof catchIll!=="function")return;const c0=catchIll;catchIll=function(p,k){const r=c0.apply(this,arguments);
 try{if(k==="daumua"&&p&&p.ill&&p.ill.k==="daumua"&&Array.isArray(p.staff))for(const s of p.staff)if(!s.ill&&roll(35))s.ill={k:"daumua",st:1,known:true,until:wk()+3}}catch(e){}return r}})();
/* ---------- causes for EVERYONE: illness, servants harming each other, NPC schemes on servants (owner 16/11) ---------- */
/* the state API other branches call (review/mortality: Hoàng thượng's / Thái hậu's illness and poison go through here) */
/* ---------- 4b. HỦY DUNG (scar layer KIT_SCAR / scar-fit): same one-rule system (owner 16/11) ----------
   Anyone can be disfigured by a real cause, through the same person lookup (KIT_FACEFX.person), the same "seen" rule and api.scar(p,sev,by,how).
   Only exception: nobody disfigures Hoàng thượng or Thái hậu by a SCHEME (by given); an accident / illness scar (by empty) is allowed. */
KIT_FACEFX.deny.scar={emp:1,thaihau:1};
function scarGive(p,sev,by,how){p=KIT_FACEFX.person(p)||p;if(!p||typeof scar70!=="function"||!fxLive(p))return false;sev=cl(sev|0||1,1,3);if(by&&KIT_FACEFX.deny.scar[KIT_FACEFX.kind(p)])return false;
 scar70(p,sev,by||null,how||(by?"phan":"tai nan"));try{fxLog(p,`${fxWho(p)} bị hủy dung (${["","nhẹ","vừa","nặng"][sev]}).`)}catch(e){}return true}
window.scarGive=scarGive;
(function(){if(typeof scar70!=="function")return;const s0=scar70;scar70=function(t,sev,a,how){if(a&&t&&KIT_FACEFX.deny.scar[KIT_FACEFX.kind(t)])return SCAR70[1];return s0.apply(this,arguments)}})();
/* the scar shows by the ONE seen rule (herself, or she knows / has seen the person), on every face place that has a scar-fit row */
(function(){if(typeof kitScarOf!=="function")return;kitScarOf=function(p){try{p=KIT_FACEFX.person(p)||p;if(!p||!p.scar||!window.KIT_SCAR||!(p.scar.sev|0))return null;if(!(KIT_FACEFX.seen(p)||p.scar.known))return null;const sev=Math.max(1,Math.min(3,p.scar.sev|0));return{sev,src:KIT_SCAR.src(sev)}}catch(e){return null}}})();
/* weekly recovery for everyone the base loop (herself + rivals) does not reach: the same heal70 rule */
(function(){if(typeof endTurn!=="function"||typeof heal70!=="function")return;const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&w0!=null&&wk()!==w0&&!window.__j70off)for(const p of KIT_FACEFX.everyone())if(p&&p!==S&&p.scar&&p.scar.sev&&!(rivals||[]).includes(p))heal70(p)}catch(x){}return r}})();
KIT_FACEFX.api={
 ill:function(p,k,st,known){if(!p||!ILL[k])return false;st=cl(st|0||1,1,3);const rec={k,st,known:known!==false};if(S&&(p===S.thO||p.kind==="th"))S.thIll=rec;else p.ill=rec;return true},
 cure:function(p){if(S&&(p===S.thO||p.kind==="th"))S.thIll=null;else if(p)p.ill=null;if(p)p.sick=0},
 poison:(p,sev,how,by,weeks)=>pzGive(p,sev,how,by,weeks),rash:(p,sev,how,by)=>rashGive(p,sev,how,by),slap:(p,by,why,sev)=>slapGive(p,by,why,sev),scar:(p,sev,by,how)=>scarGive(p,sev,by,how),pen:(p,k,why,by)=>penGive(p,k,why,by)};
/* monthly illness for everyone who is not a consort (consorts keep j13 illMonthP; Hoàng thượng / Thái hậu keep illMonth): the SAME odds, seasons, care, worsening and death */
function fxIllMonth(p){if(!p||!KIT_FACEFX.live(p))return;const kd=KIT_FACEFX.kind(p);if(kd==="emp"||kd==="thaihau"||kd==="consort"||kd==="player"||kd==="cold")return;const i=illOf(p);const nm=fxName(p);
 if(!i){const sea=SEASON[S.month-1];const weak=kd==="kid"?(p.hp||100)<50:false;const base=1.5+(weak?4:0)+(S.storms||0)*1.5;const L=Object.entries(ILL).filter(([k,d])=>d.sea&&d.sea.includes(sea));
  if(roll(base+(L.length?3:0))){const k=L.length&&roll(70)?pick(L)[0]:pick(["lao","matngu","phonghan"]);if(k==="longthe"||k==="docman"||k==="hausan"||k==="daumua")return;p.ill={k,st:1,known:fxSeen(p)};if(fxSeen(p))log(`${nm} mắc ${ILL[k].n.toLowerCase()}.`)}
  else{const o=KIT_FACEFX.owner(p),mates=KIT_FACEFX.everyone().filter(x=>x!==p&&KIT_FACEFX.owner(x)===o);const near=mates.find(x=>illOf(x)&&ILL[x.ill.k].cont);if(near&&roll(8)){p.ill={k:near.ill.k,st:1,known:fxSeen(p)};if(fxSeen(p))log(`${nm} nhiễm ${ILL[near.ill.k].n.toLowerCase()}.`)}}return}
 const d=ILL[i.k];if(kd==="kid"&&typeof p.hp==="number")p.hp-=5*i.st;const c=careOdds(p);
 if(roll(BAL.odb.jface.rbFxIllMonth+c-(d.slow?15:0))){p.ill=null;if(fxSeen(p))log(`${nm} đã khỏi ${d.n.toLowerCase()}.`);return}
 if(i.st<3&&roll(BAL.odb.jface.rbFxIllMonth_2-c/2)){i.st++;if(fxSeen(p))log(`${nm}: ${d.n.toLowerCase()} trở ${STG[i.st]}.`);return}
 if(i.st===3&&d.die&&roll(25*d.die)){
  if(kd==="kid"){if(typeof kidDie==="function"){const mom=KIT_FACEFX.owner(p);const t=kidDie(p,"mất vì "+d.n.toLowerCase(),mom===S);if(t)log(t)}}
  else if(p!==S.maid&&!(S.court&&Object.values(S.court).includes(p))){const ow=typeof ownerOf==="function"?ownerOf(p):null;if(ow&&ow.staff){ow.staff.splice(ow.staff.indexOf(p),1);if(fxSeen(p))log(`${nm} mất vì ${d.n.toLowerCase()}.`)}}}}
(function(){if(typeof illMonth!=="function")return;const i0=illMonth;illMonth=function(){const r=i0.apply(this,arguments);try{for(const p of KIT_FACEFX.everyone())fxIllMonth(p)}catch(e){console.error(e)}return r}})();
/* servants: a servant with a grudge or little loyalty may harm a fellow servant of the same cung (slap / strange powder / slow poison); NPC schemes (a hostile consort) reach servants too.
   Each lands through the same states as for her: tát, nổi mẩn, trúng độc; she learns only what she sees (log + chip) */
function fxServants(){const L=[];for(const p of [S].concat(rivals||[]))for(const s of (p&&p.staff)||[])L.push(s);if(S&&S.maid&&typeof S.maid==="object")L.push(S.maid);return L}
function fxHarm(by,t,how){const kind=pick(["tat","rash","doc"]);const bn=fxName(by);
 if(kind==="tat")slapGive(t,by,how);else if(kind==="rash")rashGive(t,1,"phấn lạ",by===S?null:by);else{pzGive(t,1,"độc ngấm dần",by,FXF.docWk[1]);
  if(fxSeen(t)&&fxObservant())log(`${fxName(t)} môi tím tái, sắc mặt xám: có người ra tay.`)}}
function fxServMonth(){const all=fxServants();for(const s of all){if(!KIT_FACEFX.live(s))continue;const bad=s.grudge||(s.loyal!=null&&s.loyal<BAL.loy.out);if(!bad||!roll(8))continue;
  const o=KIT_FACEFX.owner(s);const mates=all.filter(x=>x!==s&&KIT_FACEFX.owner(x)===o&&KIT_FACEFX.live(x));if(!mates.length)continue;fxHarm(s,pick(mates),"ghen ghét trong cung")}
 for(const v of liveRivals(true)){let hot=0;try{hot=typeof hostility==="function"?hostility(v,S):0}catch(e){}
  if(hot>=40&&roll(6)){const t=pick((S.staff||[]).concat(S.maid&&typeof S.maid==="object"?[S.maid]:[]));if(t&&KIT_FACEFX.live(t)){fxHarm(v,t,"");if(roll(40)){try{evA(S,v,BAL.eff.jface.evFxServMonth);if(fxSeen(t))log(`Ngươi lần ra dấu vết: người của ${v.name} ra tay với ${fxName(t)}: Chứng cứ về ${v.name} ${balSg(BAL.eff.jface.evFxServMonth)}.`)}catch(e){}}}}
  const v2=pick(liveRivals(true).filter(x=>x!==v&&(x.staff||[]).length));if(v2&&roll(BAL.odb.jface.rbFxServMonth+(typeof hostility==="function"?(()=>{try{return hostility(v,v2)>=40?3:0}catch(e){return 0}})():0))){const t=pick(v2.staff);if(t&&KIT_FACEFX.live(t))fxHarm(v,t,"")}}}
(function(){if(typeof monthTick!=="function")return;const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{if(S&&!S.dead)fxServMonth()}catch(e){console.error(e)}return r}})();
/* a mark still on the cheek (vừa / nặng) may be seen and reported: one witness keeps evidence against whoever slapped, once per mark */
function slapReport(p){const z=p&&p.slap;if(!z||z.rep||z.until<=wk())return;const c=BAL.slap.rep[slapSev(p)];if(!c||!roll(c))return;
 const who=z.by==="me"?S:(rivals||[]).find(v=>v.id===z.by);if(!who||who===p)return;
 const W=(liveRivals(true)||[]).filter(x=>x!==who&&x!==p);if(!W.length)return;z.rep=1;const w=W[Math.floor(Math.random()*W.length)];evA(w,who,BAL.eff.jface.evSlapReport);
 if(who===S)log("Dấu tay trên má "+fxWho(p)+` lọt vào mắt người ngoài: có kẻ ghi nhớ chuyện ngươi ra tay (chứng cứ về ngươi ${balSg(BAL.eff.jface.evSlapReport)}).`)}
/* ---------- weekly pass, the same for everyone ---------- */
(function(){const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&w0!=null&&wk()!==w0){
  for(const p of KIT_FACEFX.everyone()){if(!p)continue;if(p.pz)pzWeek(p);try{slapReport(p)}catch(e){}if(p.ill&&p.ill.until!=null&&p!==S&&p.ill.until<=wk()){p.ill=null;fxLog(p,`${fxName(p)} đã khỏi bệnh.`)}if(p.slap&&p.slap.until<=wk()){p.slap=null;if(p===S)log("Dấu tay trên má ngươi đã lặn.")}if(p.pen&&p.pen.until<=wk())p.pen=null;if(p.expr&&p.expr.until<=wk())p.expr=null}
  if(S.pz&&S.pz.until>wk()&&!Q.some(m=>m.pid==="pzcard")&&(typeof evCooldown!=="function"||evCooldown("pzcard",FXF.cd))){const d=mkP("pzcard",{});if(d){Q.push({t:"Trúng độc",h:d.t,opts:d.o,who:pMe(),pid:d.pid,pp:d.pp});if($("modal").hidden)showModal()}}}}catch(x){console.error(x)}return r}})();
window.faceExpr=faceExpr;window.pzGive=pzGive;window.slapGive=slapGive;window.penGive=penGive;
