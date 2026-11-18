/* ================= jmapz: SECOND LEVEL OF CÀN NINH / ĐỨC THỌ + HER PEOPLE WHERE THEY REALLY ARE (KIT §85.10) =================
   Owner OD 18/11 ~19:25Z (4)(5) + ~19:45Z (verbatim in dev/OWNER_DECISIONS.md). The Dư đồ ZONES of 19:25Z (1)(2) were CANCELLED by the owner
   at ~19:45Z ("Thêm một tầng nữa mất công một lần bấm nó rối"): consort palaces keep their own tags; the zone/zoom/fog code is in git history
   (review/map-zones 5692c687, jmapz.js sections 1-2) if a zoom is ever wanted again.
   (a) Càn Ninh (Hoàng hậu) and Đức Thọ (Thái hậu) open the courtyard (jpm kitPalaceMap) with Chính điện / Đông phối điện / Tây phối điện while
       she may walk in; each hall: "N bóng người" (people she meets = map count) + "K cung nhân" = that household's servants the ONE ledger
       (S.roster, j95) puts there NOW, by what the record says they do. Counts only.
   (b) HER palace: the servants' row names HER people where the ledger puts them now (in the palace / away "(ở <place>)").
   Wraps only (kpmParts, kpmDir, kpmArt, kpmSplit, kitPalaceMap, renderStage). */
/* ================= (3) SECOND LEVEL: Càn Ninh (Hoàng hậu) + Đức Thọ (Thái hậu) ================= */
/* plaque names of the new halls (jhall pattern: chính = 2 chars + điện; Đông = + hiên; Tây = + trai; unique in the table) */
try{if(typeof HALL_PN==="object"){HALL_PN["Càn Ninh cung"]=["Mẫu Nghi điện","Khôn Hòa hiên","Thục Thận trai"];HALL_PN["Đức Thọ cung"]=["Từ Khang điện","Di Xuân hiên","An Thọ trai"]}}catch(e){}
/* the record's activity → the hall it happens in (ACT95 codes, j95) */
const MAPZ_ACTHALL={serve:"chinh",attend:"chinh",receive:"chinh",greet:"chinh",visit:"chinh",watch:"chinh",audience:"chinh",follow:"chinh",here:"chinh",provoke:"chinh",
 clean:"dong",brew:"dong",work:"dong",book:"dong",laundry:"dong",oversee:"dong",
 rest:"tay",sleep:"tay",nap:"tay",eat:"tay",offduty:"tay",read:"tay",pray:"tay"};
function mapzHallOfAct(a){if(/^ag_/.test(a||""))return"tay";/* her own deed (jagday/jagstaff: embroidery, errands of her own) = in the servants' rooms */return MAPZ_ACTHALL[a]||"chinh"}
/* the household of a palace key: [ledger ids of its servants] (Hoàng hậu: her staff + trusted maid; Thái hậu: her household; her own: S.staff + S.maid) */
function mapzHousehold(k){const L=[];try{
 if(k==="kn"){const q=rivals.find(v=>v.queen&&v.alive&&!v.out);if(q){if(q.maid&&q.maid.name)L.push(["mm:"+q.id,q.maid.name]);for(const s of q.staff||[])if(s&&s.sid!=null)L.push(["s"+s.sid,s.name])}}
 else if(k==="tn"){if(!S.thDead)for(const s of (S.thO&&S.thO.staff)||[])if(s&&s.sid!=null)L.push(["s"+s.sid,s.name])}
 else if(k==="home"){if(S.maid&&S.maid.name&&!(typeof isSrv==="function"&&isSrv()))L.push(["mm:me",S.maid.name]);for(const s of S.staff||[])if(s&&s.sid!=null)L.push(["s"+s.sid,s.name])}}catch(e){}return L}
/* where each of them is NOW in the ONE ledger (S.roster): {in:{chinh:[],dong:[],tay:[]},away:[[name,placeKey,why]]}; null when the record is off */
function mapzStaffNow(k){try{const R=S&&S.roster;if(!R||!R.P||(typeof j95key==="function"&&R.key!==j95key()))return null;const kh=typeof j95kh==="function"?j95kh():0;const O={in:{chinh:[],dong:[],tay:[]},away:[],n:0};
 for(const [id,name] of mapzHousehold(k)){const e=R.P[id]&&R.P[id][kh];if(!e)continue;O.n++;if(e[0]===k)O.in[mapzHallOfAct(e[1])].push([name,e[1]]);else O.away.push([name,e[0],e[3]||""])}return O}catch(e){return null}}
function mapzPlaceName(k){try{if(k==="home")return S.pal!=null?PALN[S.pal]:HOMEN;if(typeof J95OUT_!=="undefined"&&k===J95OUT_)return"ngoài cung";return palName(k)}catch(e){return k||""}}
/* jpm hooks: Càn Ninh and Đức Thọ get the three painted halls (Đức Thọ: the Càn Ninh courtyard as a 'tạm' stand-in until its own painting exists — ART REQUEST) */
if(typeof kpmParts==="function"){
 /* only while she may walk in now: a locked / out-of-khắc Càn Ninh or Đức Thọ keeps the one-hall tap = the place card with «Lẻn vào» / walk-spill (OD 18/11 ~19:15Z, L1417) */
 const mapzOpenNow=k=>{try{const st=accState(k);return !(st&&st.why&&!st.here)}catch(e){return true}};
 const pp0=kpmParts;kpmParts=function(slot,k,nm){if((slot==="kn"||slot==="p:tn")&&mapzOpenNow(slot==="kn"?"kn":"tn")){const n=slot==="kn"?"Càn Ninh cung":"Đức Thọ cung";return KPM_PARTS.map(x=>[x[0],hallName(n,x[0])])}return pp0.apply(this,arguments)};
 const pd0=kpmDir;kpmDir=function(slot){if(slot==="p:tn")return S&&!S.thDead?"nhat-can-ninh":null;return pd0.apply(this,arguments)};
 const pa0=kpmArt;kpmArt=function(slot){const A=pa0.apply(this,arguments);if(A&&slot==="p:tn")A.tam=true;return A};
 const ps0=kpmSplit;kpmSplit=function(k){const O=ps0.apply(this,arguments);try{if(k==="kn"||k==="tn"){/* guests stay in the chính điện (as before); the household by what the record says they do */
   const N=mapzStaffNow(k);if(N){for(const h of ["chinh","dong","tay"]){O[h].srv=N.in[h].length}O.away=N.away.length;O.hh=N.n}
}}catch(e){}return O};
 const pm0=kitPalaceMap;kitPalaceMap=function(o){let h=pm0.apply(this,arguments);try{const k=o.k;const mh=typeof kpmMine==="function"?kpmMine(o.slot):null;if(k!=="kn"&&k!=="tn"&&k!=="home"&&!mh)return h;
   if(k==="home"||mh){/* her people, by name, where the record puts them now */const N=mapzStaffNow("home");if(!N)return h;
    const inL=[].concat(N.in.chinh,N.in.dong,N.in.tay).map(x=>x[0]);const away=N.away.map(([n,pk])=>`${n} (ở ${mapzPlaceName(pk)})`);
    const line=`<span class="kpm-rs kpm-who">${inL.length?"Trong cung: "+inL.join(", "):"Không ai ở trong cung"}${away.length?` · Đi vắng: ${away.join(", ")}`:""}</span>`;
    const rp=k==="home"&&!mh?"cungnhan":mh;h=h.replace(new RegExp('(<button class="btn kpm-row[^"]*" data-kpmpart="'+rp+'">[\\s\\S]*?)(</button>)'),(a,x,y)=>x+line+y);
    return h}
   const SP=kpmSplit(k);const add=(t,n)=>/^vắng/.test(t)?`${n} cung nhân`:`${t} · ${n} cung nhân`;
   for(const part of ["chinh","dong","tay"]){const n=(SP[part]&&SP[part].srv)||0;if(!n)continue;
    h=h.replace(new RegExp(`(data-go="kpm:${part}"[^>]*><span class="mlab">[^<]*<i>)([^<]*)(</i>)`),(a,x,t,y)=>x+add(t,n)+y);
    h=h.replace(new RegExp(`(data-kpmpart="${part}"><b class="kpm-rn">[^<]*</b><span class="kpm-rs">)([^<]*)(</span>)`),(a,x,t,y)=>{const m=/^(.*?· )?(.*)$/.exec(t);return x+(m[1]||"")+add(m[2],n)+y})}
   if(SP.hh)h=h.replace(/(<button class="btn kpm-row[^"]*" data-kpmpart="chinh">[\s\S]*?)(<\/button>)/,(a,x,y)=>x+`<span class="kpm-rs kpm-who">Cung nhân: ${SP.hh-(SP.away||0)} trong cung${SP.away?` · ${SP.away} đi vắng`:""}</span>`+y)}catch(e){console.error("jmapz kpm",e)}return h};
}
/* the room line in a side hall of Càn Ninh / Đức Thọ: what the record says the household does there (the stage draws no household servants of other palaces, j95vis) */
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const h=typeof kpmHall==="function"&&kpmHall();if(!h||h.place||(h.k!=="kn"&&h.k!=="tn"))return r;
  const m=document.querySelector("#sc-t .rmsg");if(!m)return r;const N=mapzStaffNow(h.k);const n=N?N.in[h.part].length:0;const t=` · ${hallRole(h.part)}. ${n?`${n} cung nhân đang ${h.part==="dong"?"quét dọn, sắp đồ":h.part==="tay"?"nghỉ ngơi":"đứng hầu"} ở đây.`:"Không có ai ở đây."}`;if(m.textContent!==t){m.textContent=t;m.title=t}}catch(e){}return r}})();
