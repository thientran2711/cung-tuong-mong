/* ================= ONE IDENTITY FOR LIFE, FOUR AGE BANDS FOR ALL, SMALL AGE EFFECTS ================= */
/* bands for every group: 18-25 / 26-35 / 36-50 / 51+ */
function band4(a){return a>=51?3:a>=36?2:a>=26?1:0}
const BAND4N=["18-25","26-35","36-50","51+"];
function tagBand(x){const s=String(x==null?"":x).toLowerCase();const m=s.match(/\d+/);if(m)return band4(+m[0]);return /old|lao|51/.test(s)?3:/mid|trung|36/.test(s)?2:/adult|26/.test(s)?1:0}
/* faces stay for life: once drawn, kept across promotions and ageing (children still grow) */
(function(){const ff=faceFor;faceFor=function(o,kind,age){if(o&&o.fc&&o.fcKeep)return;const r=ff.apply(this,arguments);if(o&&o.fc)o.fcKeep=1;return r}})();
/* figures: each person gets one identity and keeps it; no two people in one game ever share one (a dead woman's identity is not reused until a new game) */
const LOOKFOR={"Hiểm độc":["hienlanh","gentle","diu","numi"],"Kiêu ngạo":["kieungao","proud"],"Hiền lành":["hienlanh","gentle"],"Đa nghi":["danghi","cool"],"Tham vọng":["thamvong","bold"],"Nhu mì":["numi","soft","hienlanh"]};
function idsFor(role){const m={};for(const f of FIGS)if(norm(f.role)===norm(role)&&f.identity!=null)m[f.identity]=m[f.identity]||[],m[f.identity].push(f);return m}
function identityOf(p,role){const who=p.ref||p;if(who.idn!=null)return who.idn;const M=idsFor(role);const ids=Object.keys(M);if(!ids.length)return null;
 const used=new Set([S].concat(rivals||[]).filter(x=>x&&x!==who&&(x===S||x.alive)&&x.idn!=null).map(x=>String(x.idn)));if(S.emp&&S.emp.idn!=null)used.add(String(S.emp.idn));
 S.idUsed=S.idUsed||{};const U=S.idUsed[role]=S.idUsed[role]||[];let free=ids.filter(i=>!used.has(String(i))&&!U.includes(String(i)));if(!free.length)return null;const want=LOOKFOR[who.trait]||[];const fit=free.filter(i=>M[i].some(f=>want.includes(norm(f.look))));if(fit.length)free=fit;who.idn=pick(free);U.push(String(who.idn));return who.idn}
(function(){const f0=figFor;figFor=function(p,kind){if(!FIGS.length||!p)return"";const role=figRole(p),who=p.ref||p;const idn=identityOf(who===S.emp?{ref:S.emp,trait:""}:who,role);if(idn==null)return f0.apply(this,arguments);
 const tier=who===S?(S.out?0:S.rank):who.queen?7:(who.rank||0);const ab=band4(who.age||20);const isPor=f=>/(^|\/)por-/.test(f.file||f.src);
 const L=FIGS.filter(f=>String(f.identity)===String(idn)&&norm(f.role)===norm(role)&&(kind==="por"?isPor(f):!isPor(f)));if(!L.length)return f0.apply(this,arguments);
 const tn=f=>{const t=+String(f.tier).replace(/\D/g,"");return isNaN(t)?0:t};const sc=f=>Math.abs(tn(f)-tier)+Math.abs(tagBand(f.ageBand)-ab)*1.5;L.sort((a,b)=>sc(a)-sc(b));const src=L[0].file||L[0].src;return /^img\//.test(src)?src:"img/"+src}})();
/* age effects, the same for everyone: Sắc -1 a year after 30 (soft floor 35), Tâm cơ +1 a year of court life up to +10 */
(function(){const a0=ageYear;ageYear=function(){S.age=S.age||18;const r=a0.apply(this,arguments);try{for(const p of [S].concat(rivals||[])){if(p!==S&&!p.alive)continue;const ag=p===S?S.age:p.age;if(ag>30&&(p.sac||0)>35){p.sac--;p.sacAge=(p.sacAge||0)+1}if((p.tcAge||0)<10){p.tamco=(p.tamco||0)+1;p.tcAge=(p.tcAge||0)+1}}}catch(e){}return r}})();
function ageLine(p){const ag=p===S?S.age:p.age;const b=[];if(p.sacAge)b.push(`Sắc -${p.sacAge} (tuổi)`);if(p.tcAge)b.push(`Tâm cơ +${p.tcAge} (từng trải)`);const ag2=ag>35?`sinh nở thêm nguy (${Math.round((ag-35)*3)})`:"";const il=ag>50?"dễ ốm hơn":"";return `Tuổi <b>${ag}</b> · ${BAND4N[band4(ag)]}${b.length?" · "+b.join(", "):""}${ag2?" · "+ag2:""}${il?" · "+il:""}`}
function tuoi(n){return n>0?`Tuổi <b>${n}</b> <span class="past">(${BAND4N[band4(n)]})</span>`:""}
/* the Emperor who loves beauty weighs youth */
(function(){const n0=nightCh;nightCh=function(p){const c=n0.apply(this,arguments);if(!c||!has("mesac"))return c;const ag=(p||S)===S?S.age:p.age;return Math.round(c*(ag<=25?1.15:ag>35?.8:1))}})();
/* illness rises after 50 */
(function(){const i0=illMonthP;illMonthP=function(p){let ev=i0.apply(this,arguments);try{const ag=p===S?S.age:p.age;if(ag>50&&!illOf(p)&&roll((ag-50)*.5))ev+=catchIll(p,pick(["lao","phonghan"]))||""}catch(e){}return ev}})();
/* after a birth the body rests: six months of ở cữ and nursing before she can conceive again (everyone alike) */
(function(){const b0=birthP;birthP=function(p,fake){if(!fake)p.lastBirth=S.turn;return b0.apply(this,arguments)}})();
(function(){const c0=conceiveCh;conceiveCh=function(p){p=p||S;if(p.lastBirth!=null&&S.turn-p.lastBirth<6)return 0;return Math.round(c0.apply(this,arguments)*.7)}})();
