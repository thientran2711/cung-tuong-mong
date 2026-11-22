/* review/coop-guest-staff — LAW 11 family scan (LUẬT SỬA CẢ NHÓM, law 6b/6c real people): every PERSON LIST a co-op guest can add to,
   and what her rebuild (the merged week / a rejoin) does with an entry she added. Static: reads dev/build/*.js (no browser).
   Lists: her own household (S.staff, S.maid, S.kids, S.pets), the palace men (S.men), the Thái hậu's household (S.thO.staff),
   and the NPC lists she can touch (v.staff / v.kids / v.pets of a rival).
   Rule read from code: a key in jcoopworld W_KEYS ∩ HOST_ONLY is taken from the host's copy at every guest rebuild (her own adds are dropped);
   a personal key rides her own blob P.b.S (kept); NPC arrays: host wins (PROTOCOL §4 rule 5) unless jcoopask collect() turns her add into a
   request kind (askH). Prints one row per list + every write site the guest can reach. usage: node dev/test/coop-guest-lists-scan.js */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');
const src=f=>fs.readFileSync(path.join(D,f),'utf8');
const files=fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');
const W=src('jcoopworld.js');const arr=n=>JSON.parse(W.match(new RegExp('const '+n+'=(\\[[^\\]]*\\])'))[1]);
const WK=arr('W_KEYS'),HO=arr('HOST_ONLY');const ASK=src('jcoopask.js');
const kinds=[...ASK.match(/const H=\{([^}]*)\}/)[1].matchAll(/(\w+):/g)].map(m=>m[1]);
const sites=re=>{const o=[];for(const f of files){const L=src(f).split('\n');L.forEach((l,i)=>{if(re.test(l))o.push(f+':'+(i+1))})}return o};
const rows=[
 ['S.staff (her household)','staff',/\bS\.staff\.push\(|\bp\.staff\.push\(/,'personal (her blob); trims only by the one household law capSweep→capTrim (BAL.promo.cap)'],
 ['S.maid (personal maid)','maid',/\bS\.maid=/,'personal (her blob)'],
 ['S.kids (her children)','kids',/\bS\.kids\.push\(/,'personal (her blob)'],
 ['S.pets (her pets)','pets',/\bS\.pets\.push\(|petAdd\(S/,'personal (her blob)'],
 ['S.men (palace men)','men',/\bS\.men\.push\(/,'WORLD + HOST_ONLY: her rebuild takes the host set'],
 ['S.thO.staff (Thái hậu)','thO',/thO\.staff\.push\(/,'WORLD key thO'],
];
console.log('| list | key | W_KEYS | HOST_ONLY | guest add survives her rebuild | write sites |');console.log('|---|---|---|---|---|---|');
const out=[];
for(const [n,k,re,why] of rows){const w=WK.includes(k),h=HO.includes(k);const s=sites(re);
 /* review/coop-guest-men: a HOST_ONLY key whose guest changes go to the host as a jcoopask request kind survives (S.men → kind "man") */
 const rk=k==='men'&&kinds.includes('man')?'man':null;
 const keep=!w?'YES — '+why:(rk?'YES — jcoopask request kind "'+rk+'" (host applies; her stand-in until then; her ties ride MEN_P)':(h?'NO — '+why:'host wins unless routed — '+why));out.push([n,keep]);
 console.log(`| ${n} | ${k} | ${w?'yes':'no'} | ${h?'yes':'no'} | ${keep} | ${s.length} (${s.slice(0,6).join(', ')}${s.length>6?', …':''}) |`)}
const npc=[['v.staff add (servant she places)','srv'],['v.staff out (servant she takes)','srvout'],['v.kids out (child she takes)','kidout'],['v.pets add','pet'],['new person (maid rises, kin…)','np']];
for(const [n,k] of npc){const y=kinds.includes(k);out.push([n,y?'YES':'NO']);console.log(`| ${n} | NPC array | – | – | ${y?'YES — jcoopask request kind "'+k+'" (host applies, refusal gives back)':'NO — no request kind'} | jcoopask collect |`)}
/* guest-reachable S.men writers (the open question: her road's men) */
const men=sites(/\bS\.men\.push\(/);console.log('\nS.men writers: '+men.join(', '));
/* review/coop-guest-men — WHOLE FAMILY (LAW 11): every HOST_ONLY key of jcoopworld. The guest's copy of each is replaced by the host's at
   every rebuild, so each must either hold nothing the guest owns / adds, or route her change through a jcoopask request kind.
   A new HOST_ONLY key without a row here FAILS the scan (exit 1). */
const HOK={
 tn:['the Emperor\'s night (B2)','no','host rolls the night (jnf); her own night result rides the night protocol, not this key'],
 thIll:['Thái hậu illness','YES — not an owned person, but her own ACTS change it (j71 thbenh cure, j72 easeTH, jface cure)','request kind "th" (this branch; her week end\'s own rolls of it are taken back on the guest)'],
 cm:['Thái hậu / Hoàng hậu mood','no — her own part (CM_P seen/spy/thDrop/hhDrop) rides her blob','world part rolled by the host (cmMonth muted on the guest, jcoopone)'],
 men:['palace men','YES — her road\'s envoys (jrd_bd bdMan, jrd_pt pfMan), deaths / away / ban by her own act or road','request kind "man" (this branch)'],
 menG2:['one-time flag: 3 thị vệ joined the host\'s set (jmen)','no','host set only'],
 wxDay:['the day\'s weather by khắc (jwxk)','no','host rolls the day'],
 nmReg:['every name ever given (jname)','no — her people\'s names live in her own blob','host registers; a clash → nmOrd'],
 nmOrd:['the host\'s rename orders for the friend\'s own people (jnamefix)','no — orders TO her, applied on her seat','host writes (coop-name-clash)'],
};
console.log('\n| HOST_ONLY key | what | guest-owned people / items in it | her change survives | write sites outside jcoop* |');console.log('|---|---|---|---|---|');
let hoBad=0;
for(const k of HO){const r=HOK[k];const s=sites(new RegExp('\\bS\\.'+k+'(\\.[\\w$]+)*\\s*([-+*]?=(?!=)|\\.push\\(|\\.splice\\()')).filter(x=>!/^jcoop/.test(x));
 if(!r){hoBad++;console.log(`| ${k} | ? | UNCLASSIFIED | FAIL — add a row (LAW 11) | ${s.length} |`);continue}
 const own=/^YES/.test(r[1]);const RK={men:'man',thIll:'th'};const surv=own?(RK[k]&&kinds.includes(RK[k])?'YES — '+r[2]:'NO'):'n/a — '+r[2];if(own&&/^NO/.test(surv))hoBad++;
 console.log(`| ${k} | ${r[0]} | ${r[1]} | ${surv} | ${s.length} (${s.slice(0,5).join(', ')}${s.length>5?', …':''}) |`)}
const bad=out.filter(r=>/^NO/.test(r[1]));console.log(`\nlists: ${out.length} · survive: ${out.length-bad.length} · dropped by design or open: ${bad.map(r=>r[0]).join('; ')||'none'}`);
console.log(`HOST_ONLY keys: ${HO.length} · guest-owned and dropped: ${hoBad}`);process.exitCode=bad.length||hoBad?1:0;
