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
 const keep=!w?'YES — '+why:(h?'NO — '+why:'host wins unless routed — '+why);out.push([n,keep]);
 console.log(`| ${n} | ${k} | ${w?'yes':'no'} | ${h?'yes':'no'} | ${keep} | ${s.length} (${s.slice(0,6).join(', ')}${s.length>6?', …':''}) |`)}
const npc=[['v.staff add (servant she places)','srv'],['v.staff out (servant she takes)','srvout'],['v.kids out (child she takes)','kidout'],['v.pets add','pet'],['new person (maid rises, kin…)','np']];
for(const [n,k] of npc){const y=kinds.includes(k);out.push([n,y?'YES':'NO']);console.log(`| ${n} | NPC array | – | – | ${y?'YES — jcoopask request kind "'+k+'" (host applies, refusal gives back)':'NO — no request kind'} | jcoopask collect |`)}
/* guest-reachable S.men writers (the open question: her road's men) */
const men=sites(/\bS\.men\.push\(/);console.log('\nS.men writers: '+men.join(', '));
const bad=out.filter(r=>/^NO/.test(r[1]));console.log(`\nlists: ${out.length} · survive: ${out.length-bad.length} · dropped by design or open: ${bad.map(r=>r[0]).join('; ')||'none'}`);
