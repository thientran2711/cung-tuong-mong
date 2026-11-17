/* ================= jkrel: KIT §52 RELATION TABLE (owner 11/15 15:30Z + 16:50Z "LUẬT KIT TRƯỚC") =================
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
/* KIT §52 / §49 (rewrite, owner 11/16 15:00Z 4.6–4.8): the SHORT word of a relation row — "Nàng → ta: thiện cảm" → Thiện cảm, "Nàng oán ta" → Oán, "Nàng ghen" → Ghen, "Hoàng thượng → ta: sủng" → Sủng, "Ta tin cậy" → Tin cậy */
function KR2_W(l){l=String(l||"").toLowerCase();return /oán/.test(l)?"Oán":/ghen/.test(l)?"Ghen":/sủng/.test(l)?"Sủng":/ân tình/.test(l)?"Ân tình":/tin cậy/.test(l)?"Tin cậy":"Thiện cảm"}
function kitRelSubj(p){try{if(!p)return"Nàng";if(S&&p===S.emp)return"Hoàng thượng";if(S&&(p===S.thO||p.kind==="th"))return"Thái hậu";if(p.queen)return"Hoàng hậu";
 /* the kit's own reading of who a person is (j60 personRoleRank: eunuch, guard, physician, men → "m") */
 let man=p.sex==="m"||!!p.male;try{if(typeof personRoleRank==="function")man=personRoleRank(p).sex==="m"}catch(e){}return man?"Hắn":"Nàng"}catch(e){return"Nàng"}}
function kitRelLab(dir,text){return `<span class="krel krel-${dir==="me"?"me":"them"}" data-vp-skip>${text}</span>`}
function kitRelRows(p,snap){const R=[];if(!p)return R;const sj=kitRelSubj(p),ob=sj==="Nàng"?"nàng":sj==="Hắn"?"hắn":sj;const s=snap||{};
 const dd=(now,was)=>now==null||was==null?null:KRT_INT(now)-KRT_INT(was);
 const row=(dir,label,now,was,kind,w)=>R.push({dir,label,w:w||KR2_W(label),sj,ob,now:KRT_INT(now),d:dd(now,was),kind:kind||"good"});
 try{
  const isRv=typeof rivals!=="undefined"&&rivals.includes(p);
  if(S&&p===S.emp){row("them","Hoàng thượng → ta: sủng",S.sung,s.sung,"pos");return R}
  if(S&&(p===S.thO||p.kind==="th")){row("them","Thái hậu → ta: thiện cảm",S.th,s.th);return R}
  if(isRv){const known=(typeof knows!=="function"||knows(p))&&(typeof kitKnownName!=="function"||kitKnownName(p));/* a stranger ("Phi ???") shows no numbers */const o=s.pp&&s.pp[p.id]||null;
   if(!known){R.push({dir:"them",label:`${sj} → ta: thiện cảm`,w:"Thiện cảm",sj,ob,now:null,d:null,kind:"good",unk:(typeof KIT_REL==="object"&&KIT_REL.unknown)||"chưa rõ"});return R}
   row("them",`${sj} → ta: ${(typeof KIT_REL==="object"&&KIT_REL.aff)||"thiện cảm"}`,aff(p,S),o&&o[0]);
   row("them",`${sj} ${(typeof KIT_REL==="object"&&KIT_REL.oan)||"oán ta"}`,oan(p,S),o&&o[2],"bad");
   row("them",`${sj} ghen`,p.ghen||0,o&&o[1],"bad");
   row("me",`Ta → ${ob}: thiện cảm`,aff(S,p),o&&o[3]);return R}
  if(typeof p.loyal==="number"){const o=s.sp&&s.sp[p.sid!=null?p.sid:p.name]||null;
   row("them",`${sj} → ta: thiện cảm`,p.loyal,o&&o[0]);if(typeof tinOf==="function")row("me",(typeof KIT_REL==="object"&&KIT_REL.srvTrust)||"Ta tin cậy",tinOf(p),o&&o[1]);return R}
 }catch(e){console.error("kitRelRows",e)}
 R.push({dir:"them",label:`${sj} → ta: thiện cảm`,w:"Thiện cảm",sj,ob,now:null,d:null,kind:"good",unk:"chưa rõ"});return R}
function kitRelSign(d){return d>0?"+"+d:d<0?"−"+Math.abs(d):"0"}
function kitRelCls(d,kind){return !d?"n":(kind==="bad"?d<0:d>0)?"g":"r"}
const kr2Num=r=>r.now==null?"—":r.now<0?"−"+Math.abs(r.now):String(r.now);
/* the number's colour = its meaning (no bars): thiện cảm > 10 green / < −10 red; oán, ghen ≥ 20 red; sủng, ân tình green when > 0; else dim ink */
const kr2Cls=r=>{const v=r.now;if(v==null)return"n";if(r.kind==="bad")return v>=20?"r":"n";if(r.kind==="pos")return v>0?"g":"n";return v>BAL.quyLv[2]?"g":v<BAL.quyLv[1]?"r":"n"};
/* KIT §52 kitRel2 — THE relation component, used by EVERY screen (owner 11/16 15:00Z 4.6 / 4.7 / 4.8): TWO column boxes, LEFT = that person → me ("Nàng → ta"),
   RIGHT = me → that person ("Ta → nàng"); a header tab on each box; rows are SHORT words only (Thiện cảm / Oán / Ghen / Sủng / Tin cậy), the number in its meaning colour, NO bars;
   o.week → inside each box the "Hiện nay" and "Tuần này" columns are aligned. cols = [{head, dir:"them"|"me"|"x", rows:[{w, now, d, kind:"good"|"bad"|"pos", gloss?, unk?}]}] (one or two boxes). */
function kitRel2(cols,o){o=o||{};const wk=!!o.week;cols=(cols||[]).filter(c=>c&&c.rows&&c.rows.length);if(!cols.length)return"";
 const box=c=>{const known=c.rows.some(r=>r.unk==null);const hd=wk&&known?`<span class="kr2-c"></span><span class="kr2-c kr2-n">Hiện nay</span><span class="kr2-c kr2-n">Tuần này</span>`:"";
  return `<div class="kr2b kr2-${c.dir||"x"}"><div class="kr2h" data-vp-skip>${c.head}</div><div class="kr2g${wk&&known?" kr2k":""}" role="table">${hd}`+c.rows.map(r=>{
    const g=r.gloss!==false&&typeof kitGloss==="function"&&typeof KIT_GLOSS==="object"&&KIT_GLOSS[r.gloss||r.w]?kitGloss(r.gloss||r.w,r.w):r.w;
    return `<span class="kr2-l" role="cell" data-vp-skip>${g}</span>`+(r.unk!=null?`<span class="kr2-u" role="cell">${r.unk}</span>`:`<span class="kr2-v ${kr2Cls(r)}" role="cell">${kr2Num(r)}</span>`+(wk?`<span class="kr2-d ${kitRelCls(r.d,r.kind)}" role="cell">${r.d?kitRelSign(r.d):"—"}</span>`:""))}).join("")+`</div></div>`};
 return `<div class="kr2w${o.paper?" kr2-paper":""}"><div class="kr2 kr2-n${cols.length}">${cols.map(box).join("")}</div></div>`}
/* rows from kitRelRows(p,snap) → the two columns */
function kitRelTable(rows,o){o=o||{};if(!rows||!rows.length)return"";const L=rows.filter(r=>r.dir!=="me"),M=rows.filter(r=>r.dir==="me");const f=rows[0],sj=f.sj||"Nàng",ob=f.ob||"nàng";
 const wk=o.head!==false&&rows.some(r=>r.unk==null&&r.d!==undefined);
 return kitRel2([{head:`${sj} → ta`,dir:"them",rows:L},{head:`Ta → ${ob}`,dir:"me",rows:M}],{week:wk,paper:!!o.paper})}
function kitRelDelta(label,dir,d,kind){d=KRT_INT(d)||0;return `<span class="krd">${label?(dir==="none"?`<span class="krd-l" data-vp-skip>${label}</span>`:kitRelLab(dir||"them",label))+" ":""}<b class="${kitRelCls(d,kind)}">${kitRelSign(d)}</b></span>`}
/* week snapshot: also "ta → nàng" and every servant (so their row shows the week's change) */
(function(){if(typeof wkSnap!=="function")return;const s0=wkSnap;wkSnap=function(){const s=s0.apply(this,arguments);try{
  (typeof rivals!=="undefined"?rivals:[]).forEach(v=>{if(v&&v.id!=null&&s.pp){const a=s.pp[v.id]||(s.pp[v.id]=[v.rel||0,v.ghen||0,v.oan||0]);a[3]=aff(S,v)}});
  s.sung=S.sung;s.th=S.th;s.sp={};[S.maid].concat(S.staff||[]).forEach(x=>{if(x&&typeof x.loyal==="number")s.sp[x.sid!=null?x.sid:x.name]=[x.loyal,typeof tinOf==="function"?tinOf(x):0]})}catch(e){}return s}})();
window.kitRelRows=kitRelRows;window.kitRelTable=kitRelTable;window.kitRel2=kitRel2;window.kitRelDelta=kitRelDelta;window.kitRelSubj=kitRelSubj;
(function(){const st=document.createElement("style");st.id="kit-krt";st.textContent=`
/* KIT §52 kitRel2: two column boxes (that person → me | me → that person), short words, no bars; Hiện nay / Tuần này aligned inside each box */
.kr2w{container-type:inline-size;min-width:0;max-width:100%;margin:.2em 0 .45em}
.kr2{display:grid;gap:.5em;align-items:stretch;grid-auto-rows:1fr}.kr2-n2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.kr2-n1{grid-template-columns:minmax(0,calc(50% - .25em))}/* boxes shown together = SAME width and height, tops aligned; a lone box is one column wide, never the whole row (owner 16:10Z) */
.kr2b{min-width:0;border:1px solid var(--k-hair,#e6d3ac);border-radius:var(--k-rad,8px);background:var(--k-card,#fffaf0);overflow:hidden;--krc:#6a5040}
.kr2-them{--krc:#7a4fa0}.kr2-me{--krc:#3f62a8}
.kr2h{padding:.28em .55em;font-size:.76em;font-weight:700;letter-spacing:.02em;color:var(--krc);background:color-mix(in srgb,var(--krc) 12%,#fffaf0);border-bottom:1px solid var(--k-hair,#e6d3ac);overflow-wrap:anywhere}
.kr2g{display:grid;grid-template-columns:minmax(0,1fr) max-content;column-gap:.6em;row-gap:.16em;align-items:baseline;padding:.3em .55em .4em;font-size:.86em;line-height:1.25;font-variant-numeric:tabular-nums}
.kr2g.kr2k{grid-template-columns:minmax(0,1fr) max-content max-content}
.kr2-c{font-size:.62em;font-weight:600;letter-spacing:.02em;text-transform:uppercase;color:var(--k-lab,#8a7350);padding-bottom:.1em;border-bottom:1px solid var(--k-hair,#e6d3ac)}
.kr2-n,.kr2-v,.kr2-d{text-align:right;white-space:nowrap}
.kr2-l{min-width:min-content;overflow-wrap:normal;word-break:normal;hyphens:none;font-weight:600;color:var(--ink,#2a1a12)}   /* a word never breaks inside (kit button/label rule) */
.kr2-v{font-weight:700}.kr2-v.g,.kr2-d.g{color:var(--good,#2d7a52)}.kr2-v.r,.kr2-d.r{color:var(--bad,#c23b22)}.kr2-v.n{color:var(--ink,#2a1a12)}
.kr2-d{font-weight:700}.kr2-d.n{color:var(--k-lab,#8a7350);font-weight:400}
.kr2-u{grid-column:1 / -1;min-width:0;white-space:normal;overflow-wrap:anywhere;color:var(--k-lab,#8a7350);font-style:italic}
@container (max-width:260px){.kr2-n2,.kr2-n1{grid-template-columns:minmax(0,1fr)}.kr2g{font-size:.82em}}
/* KIT 52 'on paper' (owner 17/11 03:26Z, every book page): no purple header band, no white card — the table sits straight on the paper; header = a coloured line of text over a hair rule; boxes stack when the text frame is narrower than two boxes; a lone box takes the whole frame */
.kr2-paper .kr2b{background:none;border:0;border-radius:0;overflow:visible}
.kr2-paper .kr2h{background:none;padding:.2em 0;border-bottom:1px solid color-mix(in srgb,var(--krc) 45%,transparent);color:color-mix(in srgb,var(--krc) 85%,#000);font-size:.82em}
.kr2-paper .kr2g{padding:.3em 0 .2em}
.kr2-paper .kr2-c{color:#6a5236;border-bottom-color:color-mix(in srgb,#6a5236 35%,transparent)}
.kr2-paper .kr2-d.n{color:#6a5236}
.kr2-paper .kr2-n1{grid-template-columns:minmax(0,1fr)}
@container (max-width:430px){.kr2-paper .kr2-n2{grid-template-columns:minmax(0,1fr)}}
.krd{white-space:nowrap;font-weight:600}.krd .krel{font-weight:600}.krd b.g{color:var(--good,#2f7a46)}.krd b.r{color:var(--bad,#b0332a)}.krd b.n{color:var(--ink,#3a2a1a)}
`;document.head.appendChild(st)})();
/* KIT SAMPLE PAGE §47 (jkitpage loads later in the same script): §52 relation table + inline deltas, §57 number deltas */
function kitRelSamples(){const R=(dir,label,now,d,kind)=>{const sj=/^Hoàng thượng/.test(label)?"Hoàng thượng":/^Thái hậu/.test(label)?"Thái hậu":/^Hắn/.test(label)||/tin cậy/.test(label)?"Hắn":"Nàng";return{dir,label,w:KR2_W(label),sj,ob:sj==="Nàng"?"nàng":sj==="Hắn"?"hắn":sj,now,d,kind:kind||(/sủng/.test(label)?"pos":"good")}};
 const rows={"Phi tần":[R("them","Nàng → ta: thiện cảm",-13,2),R("them","Nàng oán ta",3,3,"bad"),R("them","Nàng ghen",11,-4,"bad"),R("me","Ta → nàng: thiện cảm",0,null)],
  "Hoàng thượng":[R("them","Hoàng thượng → ta: sủng",42,5)],"Thái hậu":[R("them","Thái hậu → ta: thiện cảm",18,-2)],
  "Kẻ hầu":[R("them","Hắn → ta: thiện cảm",64,1),R("me","Ta tin cậy",52,null)],"Người lạ":[{dir:"them",label:"Nàng → ta: thiện cảm",w:"Thiện cảm",sj:"Nàng",ob:"nàng",unk:"chưa rõ nàng nghĩ gì"}]};
 return [{id:"§52",title:"kitRelTable · phi tần · Hoàng thượng · Thái hậu · kẻ hầu · người lạ",html:()=>Object.values(rows).map(r=>kitRelTable(r)).join("")},
  {id:"§52",title:"kitRelTable · trên trang giấy (paper:true, mọi trang sổ Tuần lục)",html:()=>`<div style="background:#f0dfb4;padding:10px 12px;max-width:420px">${kitRelTable(rows["Thái hậu"],{paper:true})}${kitRelTable(rows["Phi tần"],{paper:true})}</div>`},
  {id:"§52",title:"kitRelTable · cột hẹp (< 240px)",html:()=>`<div style="max-width:220px">${kitRelTable(rows["Phi tần"])}</div>`},
  {id:"§52",title:"kitRelDelta · trong dòng sự việc",html:()=>`<p>Phi Tống Phương Hoa nhờ người đưa thư. ${kitRelDelta("Nàng oán ta","them",2,"bad")}, ${kitRelDelta("Nàng → ta: thiện cảm","them",-15)}; hai người khác: ${kitRelDelta("thiện cảm","none",7)}.</p>`},
  {id:"§57",title:"kitNumDelta / kitDeltaAuto · số không phải quan hệ",html:()=>`<p>Tháng này: Được mùa khắp nơi, ${kitNumDelta("Kho lúa",12)}; nhà Hộ bộ ${kitNumDelta("thế lực",6)}; ${kitNumDelta("Sủng",-3)}; ${kitDeltaAuto("nàng oán ngươi",4)}.</p><p>Phi Tống Phương Hoa nhờ người đưa thư. ${kitDeltaAuto("Nàng oán ta",2)}, ${kitDeltaAuto("thân",-2,"Nàng oán ta +2, ")} (một chữ “thân” trơn ngay sau nàng → ta: người làm được ghi rõ).</p>`}]}
setTimeout(()=>{try{if(window.KIT_SAMPLES)KIT_SAMPLES.push(...kitRelSamples())}catch(e){console.error(e)}},0);
/* ---- KIT §57 NUMBER DELTA (kit request from kit-fig2, KIT_REQUESTS.md): one inline change for anything that is not a relation
   ("Kho lúa −10", "nhà Hộ bộ thế lực +6", "Sủng +3"): same family as kitRelDelta — label in ink, the number a whole number in the
   Được/Mất colour (sentiment for her: ghen +, oán + are red; kpSent), no chip box, never wraps.
     kitNumDelta(label, d, cls?)  → <span class="krd krd-n">
     kitDeltaAuto(label, d, before) → kitRelDelta for a relation word (quý ngươi/ta, oán ngươi/ta, ghen, thiện cảm, thân), else kitNumDelta.
   Every fact line (kitFacts → kpChipify: news "Tin trong cung hôm nay", Tuần lục, panels) draws its numbers with it. */
function kitNumDelta(label,d,cls){d=KRT_INT(d)||0;let c=cls;if(!c){try{c=kpSent(label,d)}catch(e){c=d>0?"g":d<0?"r":"n"}}if(c==="ok")c="g";if(c==="no")c="r";
 return `<span class="krd krd-n">${label?`<span class="krd-l">${typeof kitGloss==="function"?kitGloss(label):label}</span> `:""}<b class="${c}">${kitRelSign(d)}</b></span>`}
function kitDeltaAuto(label,d,before){const l=String(label||"").trim(),b=String(before||"");
 let m=/^(?:(.*?)\s+)?(quý|với) (ngươi|ta)$/i.exec(l);if(m){const w=(m[1]||"").trim();return kitRelDelta(`${w&&!/^(nàng|nàng ta)$/i.test(w)?w:"Nàng"} → ta: thiện cảm`,"them",d,"good")}
 m=/^(?:(.*?)\s+)?oán (ngươi|ta)$/i.exec(l);if(m){const w=(m[1]||"").trim();return kitRelDelta(`${w&&!/^(nàng|nàng ta)$/i.test(w)?w:"Nàng"} oán ta`,"them",d,"bad")}
 m=/^(?:(.*?)\s+)?ghen$/i.exec(l);if(m){const w=(m[1]||"").trim();return kitRelDelta(w?`${/^(nàng|nàng ta)$/i.test(w)?"Nàng":w} ghen`:"ghen","them",d,"bad")}
 /* a bare "thân / thiện cảm ±N" names its actor (KIT §57, review r6): right after another change of the SAME person toward me in the same
    sentence ("Nàng oán ta +2, thân −2") it is that person's thiện cảm toward me → "Nàng → ta: thiện cảm −2"; only a label the writer
    already framed ("hai người khác: thiện cảm") or with no such lead stays a change between two other people */
 if(/^(?:.*\s)?(thiện cảm|thân)$/i.test(l)){const toMe=/(?:→|với)\s*ta:?\s*$/.test(b);const pre=l.replace(/(thiện cảm|thân)$/i,"").trim();
  const lead=!pre&&/(?:oán (?:ta|ngươi)|(?:quý|với) (?:ta|ngươi)|→ ta:?\s*thiện cảm|ghen)\s?[+\-−]\s?\d+\s*,\s*$/i.exec(b);
  if(toMe||lead||/^(nàng|nàng ta)$/i.test(pre)){const w=lead&&/(?:^|[.;:!?>]\s*)([\p{L}][\p{L} ]{0,40}?) (?:oán|quý|với|ghen|→)[^,.;:]*,\s*$/u.exec(b);
   let who=w?w[1].trim():"";if(!who||who.split(" ").length>4||/^(nàng|nàng ta|ta)$/i.test(who))who="Nàng";who=who[0].toUpperCase()+who.slice(1);return toMe?kitRelDelta("thiện cảm","them",d,"good"):kitRelDelta(`${who} → ta: thiện cảm`,"them",d,"good")}
  return (pre?pre+" ":"")+kitRelDelta("thiện cảm","none",d,"good")}
 return kitNumDelta(l,d)}
window.kitNumDelta=kitNumDelta;window.kitDeltaAuto=kitDeltaAuto;
const KRD_ARROW=/((?:[Nn]àng|Hoàng hậu|Thái hậu|Hoàng thượng|Hắn|[Tt]a|[\p{Lu}][\p{L}]*(?: [\p{Lu}][\p{L}]*){0,2}) → (?:ta|nàng|hắn)(?:: thiện cảm|: sủng)) ([+\-−])\s?(\d+(?:[.,]\d+)?)/gu;
if(typeof kpChipify==="function"){kpChipify=function(html){return kpMapText(html,s=>s.replace(KRD_ARROW,(m,l,sg,n)=>kitRelDelta(l,/^[Tt]a /.test(l)?"me":"them",Math.round((sg==="+"?1:-1)*parseFloat(n.replace(",","."))),"good")).replace(KP_DELTA,(m,l,sg,n,off,str)=>{if(/^(năm|tháng|tuần|ngày|tuổi|lần|khắc)$/i.test(l.split(" ").pop()))return m;
  const v=Math.round((sg==="+"?1:-1)*parseFloat(n.replace(",",".")));return kitDeltaAuto(l,v,str.slice(Math.max(0,off-60),off))})).replace(/<\/b><\/span>([,.;:!?)])/g,"</b>$1</span>")/* review r6: the comma / stop after a change stays on its line (nowrap .krd), never starts the next line */}}
(function(){const st=document.createElement("style");st.id="kit-krd-n";st.textContent=`.krd-n .krd-l{font-weight:600;color:var(--ink,#3a2a1a)}.krd .krd-l{font-weight:600}`;document.head.appendChild(st)})();
