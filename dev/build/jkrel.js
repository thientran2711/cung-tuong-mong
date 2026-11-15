/* ================= jkrel: KIT §42 RELATION TABLE (owner 11/15 15:30Z + 16:50Z "LUẬT KIT TRƯỚC") =================
   ONE component for "how this person stands with me" wherever a person's relation numbers are listed with their change:
   week book person pages (every person, same template), the kit sample page, and any new screen.
     kitRelRows(p, snap) → the FIXED rows for that kind of person (same order every time):
        phi tần / Hoàng hậu : "<Nàng|Hoàng hậu> → ta: thiện cảm" · "<…> oán ta" · "<…> ghen" · "Ta → <nàng|Hoàng hậu>: thiện cảm"
        Hoàng thượng        : "Hoàng thượng → ta: sủng"
        Thái hậu            : "Thái hậu → ta: thiện cảm"
        kẻ hầu (cung nhân)  : "<Nàng|Hắn> → ta: thiện cảm" · "Ta tin cậy"
        anyone else         : "<Nàng|Hắn> → ta: thiện cảm: chưa rõ"
       a row = {dir:"them"|"me", label, now:int|null, d:int|null, kind:"good"|"bad"}  (good = more is better for her)
     kitRelTable(rows, {head}) → <div class="krt"> ONE grid: label | Hiện nay | Tuần này. Every row of every table has the same three
       columns (labels wrap inside the first column, numbers never wrap, tabular figures, right-aligned). Label = direction colour
       (kitRel, §11.2), number = ink, change = Được/Mất colour (green/red) or "—" when nothing moved. Whole numbers only.
     kitRelDelta(label, dir|"none", d, kind) → one inline (dir "none": between two other people, no direction colour) relation change inside running text (a fact line): the same look as a table row,
       no chip box, never wraps, never two colours on the label.
   Labels are written already in the final words (KIT_REL, VANPHONG §1) and carry data-vp-skip, so the on-screen word fixer never
   turns "Nàng oán ta" into "Nàng ta oán ta". */
const KRT_INT=v=>v==null||v===""||isNaN(+v)?null:Math.round(+v);
function kitRelSubj(p){try{if(!p)return"Nàng";if(S&&p===S.emp)return"Hoàng thượng";if(S&&(p===S.thO||p.kind==="th"))return"Thái hậu";if(p.queen)return"Hoàng hậu";
 const man=p.sex==="m"||p.male||p.kind==="eunuch"||p.kind==="man"||p.kind==="guard"||p.kind==="official"||/^(thái giám|thị vệ|quan)/i.test(p.role||"");return man?"Hắn":"Nàng"}catch(e){return"Nàng"}}
function kitRelLab(dir,text){return `<span class="krel krel-${dir==="me"?"me":"them"}" data-vp-skip>${text}</span>`}
function kitRelRows(p,snap){const R=[];if(!p)return R;const sj=kitRelSubj(p),ob=sj==="Nàng"?"nàng":sj==="Hắn"?"hắn":sj;const s=snap||{};
 const dd=(now,was)=>now==null||was==null?null:KRT_INT(now)-KRT_INT(was);
 const row=(dir,label,now,was,kind)=>R.push({dir,label,now:KRT_INT(now),d:dd(now,was),kind:kind||"good"});
 try{
  const isRv=typeof rivals!=="undefined"&&rivals.includes(p);
  if(S&&p===S.emp){row("them","Hoàng thượng → ta: sủng",S.sung,s.sung);return R}
  if(S&&(p===S.thO||p.kind==="th")){row("them","Thái hậu → ta: thiện cảm",S.th,s.th);return R}
  if(isRv){const known=(typeof knows!=="function"||knows(p))&&(typeof kitKnownName!=="function"||kitKnownName(p));/* a stranger ("Phi ???") shows no numbers */const o=s.pp&&s.pp[p.id]||null;
   if(!known){R.push({dir:"them",label:`${sj} → ta: thiện cảm`,now:null,d:null,kind:"good",unk:(typeof KIT_REL==="object"&&KIT_REL.unknown)||"chưa rõ"});return R}
   row("them",`${sj} → ta: ${(typeof KIT_REL==="object"&&KIT_REL.aff)||"thiện cảm"}`,aff(p,S),o&&o[0]);
   row("them",`${sj} ${(typeof KIT_REL==="object"&&KIT_REL.oan)||"oán ta"}`,oan(p,S),o&&o[2],"bad");
   row("them",`${sj} ghen`,p.ghen||0,o&&o[1],"bad");
   row("me",`Ta → ${ob}: thiện cảm`,aff(S,p),o&&o[3]);return R}
  if(typeof p.loyal==="number"){const o=s.sp&&s.sp[p.sid!=null?p.sid:p.name]||null;
   row("them",`${sj} → ta: thiện cảm`,p.loyal,o&&o[0]);if(typeof tinOf==="function")row("me",(typeof KIT_REL==="object"&&KIT_REL.srvTrust)||"Ta tin cậy",tinOf(p),o&&o[1]);return R}
 }catch(e){console.error("kitRelRows",e)}
 R.push({dir:"them",label:`${sj} → ta: thiện cảm`,now:null,d:null,kind:"good",unk:"chưa rõ"});return R}
function kitRelSign(d){return d>0?"+"+d:d<0?"−"+Math.abs(d):"0"}
function kitRelCls(d,kind){return !d?"n":(kind==="bad"?d<0:d>0)?"g":"r"}
function kitRelTable(rows,o){o=o||{};if(!rows||!rows.length)return"";const head=o.head!==false;
 return `<div class="krtw"><div class="krt" role="table">${head?`<span class="krt-h" role="columnheader"></span><span class="krt-h krt-n" role="columnheader">Hiện nay</span><span class="krt-h krt-n" role="columnheader">${o.dHead||"Tuần này"}</span>`:""}`+
  rows.map(r=>`<span class="krt-l" role="cell">${kitRelLab(r.dir,r.label)}</span>`+(r.unk!=null?`<span class="krt-u" role="cell">${r.unk}</span>`:
   `<span class="krt-v" role="cell">${r.now==null?"—":r.now<0?"−"+Math.abs(r.now):r.now}</span><span class="krt-d ${kitRelCls(r.d,r.kind)}" role="cell">${r.d?kitRelSign(r.d):"—"}</span>`)).join("")+`</div></div>`}
function kitRelDelta(label,dir,d,kind){d=KRT_INT(d)||0;return `<span class="krd">${label?(dir==="none"?`<span class="krd-l" data-vp-skip>${label}</span>`:kitRelLab(dir||"them",label))+" ":""}<b class="${kitRelCls(d,kind)}">${kitRelSign(d)}</b></span>`}
/* week snapshot: also "ta → nàng" and every servant (so their row shows the week's change) */
(function(){if(typeof wkSnap!=="function")return;const s0=wkSnap;wkSnap=function(){const s=s0.apply(this,arguments);try{
  (typeof rivals!=="undefined"?rivals:[]).forEach(v=>{if(v&&v.id!=null&&s.pp){const a=s.pp[v.id]||(s.pp[v.id]=[v.rel||0,v.ghen||0,v.oan||0]);a[3]=aff(S,v)}});
  s.sung=S.sung;s.th=S.th;s.sp={};[S.maid].concat(S.staff||[]).forEach(x=>{if(x&&typeof x.loyal==="number")s.sp[x.sid!=null?x.sid:x.name]=[x.loyal,typeof tinOf==="function"?tinOf(x):0]})}catch(e){}return s}})();
window.kitRelRows=kitRelRows;window.kitRelTable=kitRelTable;window.kitRelDelta=kitRelDelta;window.kitRelSubj=kitRelSubj;
(function(){const st=document.createElement("style");st.id="kit-krt";st.textContent=`
/* KIT §42 relation table: one grid, three aligned columns */
.krtw{container-type:inline-size;min-width:0;max-width:100%}
.krt{display:grid;grid-template-columns:minmax(min(8.5em,46%),1fr) max-content max-content;column-gap:.7em;row-gap:.18em;align-items:baseline;
 margin:.2em 0 .45em;padding:.35em .55em;border:1px solid var(--k-hair,#e6d3ac);border-radius:var(--k-rad,8px);background:var(--k-card,#fffaf0);
 font-size:.86em;line-height:1.25;font-variant-numeric:tabular-nums}
.krt-h{font-size:.68em;font-weight:600;letter-spacing:.02em;text-transform:uppercase;color:var(--k-lab,#8a7350);padding-bottom:.1em;border-bottom:1px solid var(--k-hair,#e6d3ac)}
.krt-n,.krt-v,.krt-d{text-align:right;white-space:nowrap}
.krt-l{min-width:0;overflow-wrap:anywhere}.krt-l .krel{font-weight:600}
.krt-v{font-weight:700;color:var(--ink,#3a2a1a)}
.krt-d{font-weight:700}.krt-d.g{color:var(--good,#2f7a46)}.krt-d.r{color:var(--bad,#b0332a)}.krt-d.n{color:var(--k-lab,#8a7350);font-weight:400}
.krt-u{grid-column:2 / span 2;min-width:0;text-align:right;white-space:normal;overflow-wrap:anywhere;color:var(--k-lab,#8a7350);font-style:italic}
/* a narrow column (phone page, iPad spread): the label takes its own line, the two numbers stay in their aligned columns under it */
@container (max-width:17em){.krt{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.krt>.krt-h:first-child{display:none}.krt-l{grid-column:1 / -1;padding-top:.15em}.krt-n,.krt-v,.krt-d{text-align:left}.krt-u{grid-column:1 / -1;text-align:left}}
.krd{white-space:nowrap;font-weight:600}.krd .krel{font-weight:600}.krd b.g{color:var(--good,#2f7a46)}.krd b.r{color:var(--bad,#b0332a)}.krd b.n{color:var(--ink,#3a2a1a)}
`;document.head.appendChild(st)})();
/* KIT SAMPLE PAGE (owner 16:50Z: every kit part is shown on the kit sample page) — open the game with ?kit=sample */
function kitSample(){const R=(dir,label,now,d,kind)=>({dir,label,now,d,kind:kind||"good"});
 const rows={"Phi tần":[R("them","Nàng → ta: thiện cảm",-13,2),R("them","Nàng oán ta",3,3,"bad"),R("them","Nàng ghen",11,-4,"bad"),R("me","Ta → nàng: thiện cảm",0,null)],
  "Hoàng thượng":[R("them","Hoàng thượng → ta: sủng",42,5)],"Thái hậu":[R("them","Thái hậu → ta: thiện cảm",18,-2)],
  "Kẻ hầu":[R("them","Hắn → ta: thiện cảm",64,1),R("me","Ta tin cậy",52,null)],"Người lạ":[{dir:"them",label:"Nàng → ta: thiện cảm",unk:"chưa rõ nàng nghĩ gì"}]};
 const secs=Object.entries(rows).map(([h,r])=>({h:"kitRelTable · "+h,html:kitRelTable(r)}));
 secs.push({h:"kitRelTable · cột hẹp (< 17em)",html:`<div style="max-width:15em">${kitRelTable(rows["Phi tần"])}</div>`});
 secs.push({h:"kitRelDelta · trong dòng sự việc",html:`<p>Phi Tống Phương Hoa nhờ người đưa thư. ${kitRelDelta("Nàng oán ta","them",2,"bad")}, ${kitRelDelta("Nàng → ta: thiện cảm","them",-15)}; hai người khác: ${kitRelDelta("thiện cảm","none",7)}.</p>`});
 if(typeof kitPanel==="function"&&typeof S!=="undefined"&&S)return kitPanel({kind:"info",title:"Kit mẫu · Quan hệ (§42)",sub:"jkrel.js",sections:secs});
 const d=document.createElement("div");d.className="kp-sample";d.style.cssText="position:fixed;inset:20px;z-index:99999;overflow:auto;background:var(--k-card,#fffaf0);padding:16px;border:1px solid #d2b071;border-radius:8px";
 d.innerHTML=secs.map(s=>`<h4 class="kpst">${s.h}</h4>${s.html}`).join("");document.body.appendChild(d);return d}
window.kitSample=kitSample;
try{if(/[?&]kit=sample\b/.test(location.search))addEventListener("load",()=>setTimeout(()=>{try{kitSample()}catch(e){console.error(e)}},1500))}catch(e){}
