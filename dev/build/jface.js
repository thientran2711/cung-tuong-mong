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
   Postponed (no art yet, plug in later with add()): dưỡng nhan glow, tóc bạc sớm, đậu mùa marks. jrash registers itself here. ================= */
window.KIT_FACEFX={list:[],
 add:function(d){if(!d||!d.id)return;this.list=this.list.filter(x=>x.id!==d.id);d.z=d.z==null?50:d.z;this.list.push(d);this.list.sort((a,b)=>a.z-b.z)},
 get:function(id){return this.list.find(x=>x.id===id)||null},
 each:function(p,fn){if(!p)return;for(const d of this.list){let st=null;try{st=d.state(p)}catch(e){st=null}if(st)try{fn(d,st)}catch(e){}}},
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
(function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){let h=f0.apply(this,arguments);if(!p||!file)return h;let pre="";
  KIT_FACEFX.each(p,(d,st)=>{if(d.ready&&d.html&&KIT_FACEFX.seenOf(d,p,st)){const x=d.html(p,file,st);if(x)pre+=x}});return pre+h}})();
(function(){const e0=effSac;effSac=function(p){let r=e0.apply(this,arguments);try{let lost=0;KIT_FACEFX.each(p,(d,st)=>{if(d.sac)lost+=d.sac(p,st)||0});if(lost)r=cl(r-lost,0,130)}catch(e){}return r}})();
(function(){const p0=pcard;pcard=function(o){try{if(S&&o&&o.name){const nm=String(o.name).replace(/<[^>]*>/g,"");const p=nm===S.name?S:rivals.find(v=>v.name===nm);
  if(p){const C=[];KIT_FACEFX.each(p,(d,st)=>{if(d.chip&&KIT_FACEFX.seenOf(d,p,st)){const c=d.chip(p,st);if(c)C.push(chip(c[0],c[1]||"hot"))}});if(C.length)o=Object.assign({},o,{chips:(o.chips||[]).concat(C)})}}}catch(e){}return p0.call(this,o)}})();
(function(){const st=document.createElement("style");st.id="kface-fx";st.textContent=`
.kfx>i.kff,.kfxf>i.kff{position:absolute;display:block;pointer-events:none;left:var(--fleft);top:var(--ftop);width:var(--fwidth);height:var(--fheight);transform:var(--ftf,none);transform-origin:var(--fto,50% 16.5%)}
.kff>b{position:absolute;inset:0;display:block}
.kff>b.pl,.kff>b.tn{inset:-42% -10% -4% -10%}
.kff>b.pl{-webkit-backdrop-filter:saturate(var(--sat)) brightness(var(--br));backdrop-filter:saturate(var(--sat)) brightness(var(--br));-webkit-mask-image:radial-gradient(44% 46% at 52% 48%,#000 50%,transparent 100%);mask-image:radial-gradient(44% 46% at 52% 48%,#000 50%,transparent 100%)}
.kff>b.tn{background:radial-gradient(42% 44% at 52% 48%,var(--tint) 0%,transparent 100%)}
.kff>b.ey{background:radial-gradient(11% 3.6% at 33% 20.5%,var(--eye) 0%,transparent 100%),radial-gradient(10% 3.4% at 72.5% 20.5%,var(--eye) 0%,transparent 100%)}
.kff>b.lp{background:radial-gradient(12.5% 3.6% at 56% 55.5%,var(--lip) 0%,var(--lip) 35%,transparent 100%)}
.kfx>img.kslap,.kfxf>img.kslap{opacity:.5}`;document.head.appendChild(st)})();

/* ---------- shared helpers ---------- */
const FX={ill:[0,2,4,6],weakSuc:25,doc:[0,4,7],docWk:[0,3,4],slowWk:9,docMed:40,docNpcHeal:35,docNotice:30,
 tat:3,tatWk:2,tatDuc:-2,tatRel:-20,penQuy:-8,penWk:[0,1,2],phatDuc:-1,phatRel:-15,cd:3};
function fxSeen(p){try{if(!p)return false;if(p===S)return true;if(typeof kitIsKnown==="function"&&!kitIsKnown(p))return false;return typeof knows!=="function"||!!knows(p)}catch(e){return false}}
function fxLeft(u){return Math.max(1,(u|0)-wk())}
function fxWho(p){return p===S?"Ngươi":(p&&p.name)||""}
function fxLog(p,t){try{if(p===S||fxSeen(p))log(t)}catch(e){}}

/* ---------- 1. ỐM YẾU: paler skin, faint shadow under the eyes, pale lips; while ill (j13 p.ill), ốm sau độc dần (p.sick) or Sức very low ---------- */
const FXILL=[null,{sat:.70,br:1.06,tint:"rgba(242,240,238,.22)",eye:"rgba(122,96,128,.22)",lip:"rgba(236,212,206,.50)"},
 {sat:.60,br:1.07,tint:"rgba(236,236,232,.27)",eye:"rgba(112,90,122,.28)",lip:"rgba(234,213,207,.60)"},
 {sat:.50,br:1.08,tint:"rgba(232,232,228,.32)",eye:"rgba(104,84,116,.34)",lip:"rgba(232,214,208,.70)"}];
/* the matching face (KIT_EXPR mix): tired / pained, under-eye shadow and dry pale lips on the landmarks */
const FXILLX=[null,{buon:.5,eye:"150,120,150,.20",lip:"236,212,206,.45,n"},{buon:.55,dau:.25,eye:"134,108,140,.24",lip:"234,213,207,.55,n"},{buon:.6,dau:.5,eye:"120,96,130,.26",lip:"232,214,208,.62,n"}];
KIT_FACEFX.add({id:"ill",z:10,ready:true,                  /* owner approved (pilot 2) */
 state:p=>{if(!p||p===S&&S.dead)return null;const i=typeof illOf==="function"?illOf(p):null;if(i&&i.k!=="docman"&&i.k!=="longthe")return{lvl:cl(i.st|0,1,3),ill:i};
  if((p.sick||0)>0)return{lvl:2};if(typeof p.suc==="number"&&p.suc<FX.weakSuc&&!(p.pz&&p.pz.until>wk()))return{lvl:1,weak:true};return null},
 seen:(p,st)=>p===S||(st.ill?(typeof illKnown!=="function"||illKnown(p))&&fxSeen(p):fxSeen(p)),
 sac:(p,st)=>FX.ill[st.lvl],
 chip:(p,st)=>st.ill?null:[st.weak?"Sắc mặt nhợt nhạt":"Người ốm yếu, xanh xao","hot"],   /* an illness already has its own chip (j13 illName) */
 html:(p,file,st)=>KIT_FACEFX.cssFace(file,"kff-ill",FXILL[st.lvl])});

/* ---------- 2. TRÚNG ĐỘC: lips faintly blue-violet, skin greyish pale. p.pz {sev 1..2, until, by, how, at, dx (physician confirmed), nt (noticed by her)} ---------- */
const FXDOC=[null,{sat:.56,br:1.0,tint:"rgba(200,214,200,.26)",eye:"rgba(100,100,130,.28)",lip:"rgba(140,118,172,.55)"},
 {sat:.48,br:1.0,tint:"rgba(198,214,198,.30)",eye:"rgba(96,98,128,.32)",lip:"rgba(140,118,172,.62)"}];
const FXDOCX=[null,{dau:.7,eye:"110,110,140,.26",lip:"140,118,172,.38"},{dau:.9,eye:"110,110,140,.30",lip:"140,118,172,.45"}];
function pzGive(p,sev,how,by,weeks){if(!p||(p!==S&&(!p.alive||p.out)))return;sev=cl(sev|0,1,2);const u=wk()+(weeks||FX.docWk[sev]);
 if(p.pz){p.pz.sev=Math.max(p.pz.sev,sev);p.pz.until=Math.max(p.pz.until,u);if(by)p.pz.by=key(by);return}
 p.pz={sev,until:u,how:how||"",by:by?key(by):null,at:wk(),dx:0,nt:0}}
function pzOf(p){if(!p)return null;if(p.pz&&p.pz.until>wk())return p.pz;const i=typeof illOf==="function"?illOf(p):null;if(i&&i.k==="docman")return{sev:i.st>=2?2:1,ill:1};return null}
function fxObservant(){try{return (S.mat||0)>=3||((S.arts&&S.arts.y)||0)>=2||!!S.doctor}catch(e){return false}}
KIT_FACEFX.add({id:"doc",z:12,ready:true,                  /* owner approved (pilot 2) */
 state:p=>pzOf(p),
 seen:(p,st)=>fxSeen(p),                                /* the face itself shows to anyone who sees her; what it MEANS needs an eye (chip) */
 sac:(p,st)=>FX.doc[st.sev],
 chip:(p,st)=>p===S?[st.dx||st.ill?"Trúng độc · môi tím tái":"Môi tím tái, người lả đi","hot"]:fxObservant()?["Môi tím tái: như trúng độc","hot"]:null,
 html:(p,file,st)=>KIT_FACEFX.cssFace(file,"kff-doc",FXDOC[st.sev])});
/* causes: Hạ độc (j8 ACT.poison, also the dish of j83 and maids' orders that call it) and Hạ độc dần (j30) — two-way, the same for everyone */
(function(){try{const P=ACT.poison,f0=P.f;P.f=function(a,t){const s0=t?t.suc:0;const r=f0.apply(this,arguments);try{if(t&&(t===S?!S.dead:t.alive)&&t.suc<s0&&/trúng độc/.test(String(r||""))&&!/thuốc giải/.test(String(r||"")))pzGive(t,2,"độc trong điểm tâm",a)}catch(e){}return r}}catch(e){}})();
(function(){try{const P=ACT.slowpoison,f0=P.f;P.f=function(a,t){const s0=t?(t.sick||0):0;const r=f0.apply(this,arguments);try{if(t&&(t.sick||0)>s0)pzGive(t,1,"độc ngấm dần",a,FX.slowWk)}catch(e){}return r}}catch(e){}})();
/* weekly: wears off; Thái y medicine / Y thuật / NPC care heal faster; she may NOTICE it on someone she sees — a clue for the evidence system */
function pzWeek(p){const z=p&&p.pz;if(!z)return;if(z.until<=wk()){p.pz=null;fxLog(p,p===S?"Môi ngươi đã hồng trở lại, độc tan hết.":`${p.name} đã khỏe lại, sắc môi hồng như cũ.`);return}
 if(p!==S&&(roll(FX.docNpcHeal)||((p.arts&&p.arts.y)||0)>=2))z.until--;
 if(p!==S&&!z.nt&&fxObservant()&&fxSeen(p)&&(typeof together!=="function"||together(S,p)||roll(40))){z.nt=1;let t=`Ngươi để ý môi ${p.name} tím tái, sắc mặt xám, giống người trúng độc.`;
  const by=z.by&&typeof byKey==="function"?byKey(z.by):null;if(by&&by!==S&&roll(FX.docNotice+(S.doctor?20:0))){evA(S,by,1);t+=` Ngươi lần theo thang thuốc, ra dấu vết người của ${by.name}: Chứng cứ về ${by.name} +1.`}try{log(t)}catch(e){}}}
PEND.pzcard=pp=>{const z=S&&S.pz;if(!z||z.until<=wk())return null;const o=[];const y=(S.arts&&S.arts.y)||0;
 o.push(ch70("Mời thái y bắt mạch, giải độc",{c:{bac:-FX.docMed},wt:[G70("rõ là độc gì, mau tan")],ok:()=>{z.dx=1;z.until=Math.max(wk()+1,z.until-2);let t="Thái y bắt mạch, nói ngươi trúng độc, kê thang giải độc.";
  const by=z.by&&typeof byKey==="function"?byKey(z.by):null;if(by&&by!==S&&roll(40+(S.doctor?20:0))){evA(S,by,1);t+=` Thái y nhận ra vị độc, lần ra người của ${by.name} từng mua: Chứng cứ về ${by.name} +1.`}return t}}));
 if((S.inv||[]).some(e=>e.k==="giaidoc"&&!e.h))o.push(ch70("Uống thuốc giải trong rương",{wt:[G70("độc tan ngay")],k:[R70("dùng hết 1 thuốc giải")]," ok":null,ok:()=>{takeItem(S,"giaidoc");S.pz=null;return "Ngươi uống thuốc giải, môi hồng trở lại."}}));
 o.push(ch70("Tự sắc thuốc giải độc",{p:cl(30+y*15,5,95),c:{suc:-3},wt:[G70("độc tan sớm hơn")],lt:[R70("uống sai vị, lâu khỏi hơn")],ok:()=>{z.until=Math.max(wk()+1,z.until-1);return "Ngươi tự sắc cam thảo, lục đậu giải độc."},no:()=>{z.until++;return "Thuốc không hợp, độc lâu tan hơn."}}));
 o.push(ch70("Nằm nghỉ chờ khỏi",{wt:[G70("không tốn gì")],k:[R70(`còn ${fxLeft(z.until)} tuần`)],ok:()=>"Ngươi nằm nghỉ, uống nước cháo loãng."}));
 return{who:pMe(),t:`<p>Môi ngươi tím tái, da xám đi${z.dx?" — thái y nói là trúng độc":", người lả đi không rõ vì sao"}: Sắc đang mất ${FX.doc[z.sev]}; còn chừng ${fxLeft(z.until)} tuần.</p>`,o}};

/* ---------- 3. BỊ TÁT: a faint soft handprint on the cheek for a few tuần (img/fx-slap.png on the scar-fit cheek box) ---------- */
function slapGive(p,by,why){if(!p||(p!==S&&(!p.alive||p.out)))return"";p.slap={until:wk()+FX.tatWk+(roll(30)?1:0),by:by?key(by):null,at:wk()};
 const t=`${fxWho(p)} bị ${by?(by===S?"ngươi":by.name):"người ta"} tát${why?" vì "+why:""}: má in dấu tay, Sắc -${FX.tat} vài tuần.`;fxLog(p,t);return t}
KIT_FACEFX.add({id:"tat",z:30,ready:true,                  /* owner approved the handprint (pilot 11/14) */
 state:p=>p&&p.slap&&p.slap.until>wk()?p.slap:null,
 seen:(p,st)=>fxSeen(p),
 sac:(p,st)=>{const vg=p.vl&&typeof vlG==="function"?vlG(p.vl):-1;return Math.round(FX.tat*(vg>=0&&window.VL?VL.cover[vg]:1))},
 chip:(p,st)=>[`Má in dấu tay · còn ${fxLeft(st.until)} tuần`,"hot"],
 html:(p,file,st)=>{const s=KIT_FACEFX.cheekBox(file,{dx:.04,dy:.17,sw:.9,sh:.9});return s?`<img class="kslap" src="img/fx-slap.png" alt="" aria-hidden="true" style="${kitFxVars(s)}" onerror="this.remove()">`:""}});

/* ---------- 4. BỊ PHẠT QUỲ / ĐÁNH TRƯỢNG: a status chip (no art); walking costs one more khắc while it lasts (her), NPCs scheme less ---------- */
function penGive(p,k,why,by){if(!p||(p!==S&&(!p.alive||p.out)))return;const sev=k==="truong"?2:1;const u=wk()+FX.penWk[sev];p.pen={k,until:Math.max(u,p.pen&&p.pen.until||0),why:why||"",by:by?key(by):null}}
const PEN_N={quy:"Bị phạt quỳ, gối đau",truong:"Bị đánh trượng, đi lại khó"};
KIT_FACEFX.add({id:"phat",z:90,ready:true,                 /* no picture: chip and rules only */
 state:p=>p&&p.pen&&p.pen.until>wk()?p.pen:null,
 seen:(p,st)=>fxSeen(p),
 chip:(p,st)=>[`${PEN_N[st.k]||PEN_N.quy} · đi chậm · còn ${fxLeft(st.until)} tuần`,"hot"]});
(function(){const t0=travel;travel=function(a,b){const r=t0.apply(this,arguments);try{if(r>0&&S&&S.pen&&S.pen.until>wk())return r+1}catch(e){}return r}})();
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(v&&v.pen&&v.pen.until>wk()&&roll(50))return[]}catch(e){}return O}})();

/* ---------- causes for slap + punishment ---------- */
/* maid path (j42): talking back to the mistress, refusing her order, the beating */
(function(){try{const s0=PEND.cnvScold;if(s0)PEND.cnvScold=function(){const d=s0.apply(this,arguments);try{const op=d&&d.o&&d.o.find(x=>x.n==="Cãi lại");const m=typeof srvM==="function"?srvM():null;if(op&&op.go){const g=op.go;op.go=function(){const q0=S.suc;const r=g.apply(this,arguments);try{if(S.suc<q0)penGive(S,"quy","cãi lại chủ");else if(roll(50))slapGive(S,m,"cãi lại")}catch(e){}return r}}}catch(e){}return d}}catch(e){}})();
(function(){try{const s0=PEND.cnvOrd;if(s0)PEND.cnvOrd=function(){const d=s0.apply(this,arguments);try{const op=d&&d.o&&d.o.find(x=>x.n==="Từ chối");if(op&&op.go){const g=op.go;op.go=function(){const q0=S.suc;const r=g.apply(this,arguments);try{if(S.suc<q0&&!S.dead)penGive(S,"quy","từ chối lệnh chủ")}catch(e){}return r}}}catch(e){}return d}}catch(e){}})();
(function(){if(typeof srvMoodEvent!=="function")return;const s0=srvMoodEvent;srvMoodEvent=function(){const n=Q.length;const r=s0.apply(this,arguments);try{if(Q.length>n&&Q[Q.length-1]&&Q[Q.length-1].t==="Bị đánh đòn"&&!S.dead)penGive(S,"truong","bị chủ sai đánh")}catch(e){}return r}})();
/* the acts, two-way (same rules for her and every consort): Tát (higher rank, same place) and Phạt quỳ (Hoàng hậu, or three ranks above) */
function fxAuth(a,t){try{return !!a&&!!t&&a!==t&&(a.queen||(a===S&&S.rank>=7)||rkOf(a)>=rkOf(t)+3)}catch(e){return false}}
A("tat","Tát",{c:{duc:FX.tatDuc},ok:(a,t)=>together(a,t)&&rkOf(a)>rkOf(t)&&!(t.slap&&t.slap.until>wk()),o:()=>100,x:"nàng in dấu tay trên má, Sắc giảm vài tuần · nàng oán ngươi",f:(a,t)=>{
 if(typeof ducAdd==="function")ducAdd(a,FX.tatDuc,"tát người");else ap(a,{duc:FX.tatDuc});relAdd(t,a,FX.tatRel);slapGive(t,a,"");let r=`${NMc(a)} giáng một cái tát lên má ${NM(t)}. `;
 if((t.sung||0)>=60&&roll(30)){ap(a,{sung:-4});r+=`Hoàng thượng nghe chuyện, không vui (Sủng ${a===S?"ngươi":NM(a)} -4). `}return `<span class="${t===S?"r":"g"}">${r}</span>`}});
A("phatquy","Phạt quỳ",{c:{duc:FX.phatDuc},ok:(a,t)=>fxAuth(a,t)&&!(t.pen&&t.pen.until>wk()),o:()=>100,x:"nàng quỳ nửa ngày ngoài sân: Sức -8, đi lại chậm một tuần · nàng oán ngươi",f:(a,t)=>{
 if(typeof ducAdd==="function")ducAdd(a,FX.phatDuc,"phạt quỳ");else ap(a,{duc:FX.phatDuc});relAdd(t,a,FX.phatRel);if(t===S)apply({suc:FX.penQuy});else ap(t,{suc:FX.penQuy});penGive(t,"quy","bị phạt",a);
 if(t.schemes>0)ap(a,{danh:1});return `<span class="${t===S?"r":"g"}">${NMc(a)} phạt ${NM(t)} quỳ nửa ngày ngoài sân: Sức -${-FX.penQuy}, gối đau, đi lại chậm.</span> `}});
try{AOUT.tat=["nàng in dấu tay trên má, Sắc -3 vài tuần; nàng oán ngươi",""];AOUT.phatquy=["nàng quỳ phạt: Sức -8, đi lại chậm một tuần; nàng oán ngươi",""]}catch(e){}
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
/* ---------- weekly pass, the same for everyone ---------- */
(function(){const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&w0!=null&&wk()!==w0){
  for(const p of [S].concat(rivals||[])){if(!p)continue;if(p.pz)pzWeek(p);if(p.slap&&p.slap.until<=wk()){p.slap=null;if(p===S)log("Dấu tay trên má ngươi đã lặn.")}if(p.pen&&p.pen.until<=wk())p.pen=null;if(p.expr&&p.expr.until<=wk())p.expr=null}
  if(S.pz&&S.pz.until>wk()&&!Q.some(m=>m.pid==="pzcard")&&(typeof evCooldown!=="function"||evCooldown("pzcard",FX.cd))){const d=mkP("pzcard",{});if(d){Q.push({t:"Trúng độc",h:d.t,opts:d.o,who:pMe(),pid:d.pid,pp:d.pp});if($("modal").hidden)showModal()}}}}catch(x){console.error(x)}return r}})();
window.faceExpr=faceExpr;window.pzGive=pzGive;window.slapGive=slapGive;window.penGive=penGive;window.FX=FX;
