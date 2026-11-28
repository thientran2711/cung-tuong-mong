/* TAI-MAT-KNOW scan (law 11, the whole family; owner OD 27/11 ~04:16Z). Static, node only.
   usage: node dev/test/tai-mat-know-scan.js [buildDir]   (default dev/build; for the "before" column: git show origin/main files into a dir)
   1 every RECRUIT site (a servant's spyFor set to someone): the feeling calls in the same statement; a call whose first argument is the
     servant's MASTER (ownerOf / the palace owner) = a knowledge-gate breach (the master does not know yet) → FAIL
   2 every kỳ ngộ option whose special is "spy" (BAL.kyngo.E: jbalky + jbalkyc): a cost "oan" = «X để bụng oán» at recruit time → FAIL
   3 every LEARN site (a spy found / confessed / a refusal told / the two-faced one tells): counted by spyLearn / spyFound calls
   4 the j10 «Có tin» on her bought servant needs a real Tai mắt of hers in the buyer's palace (not eyes ≥ 3)
   Last line: TAI-MAT-KNOW SCAN: <n> breach(es) */
const fs=require('fs'),path=require('path');const B=process.argv[2]||path.join(__dirname,'..','build');
const files=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');let breach=0;const rows=[];
const MASTER=/^(o|m|t|vic|ow|ownerOf\(|mm2|own|owner)/;/* names the master in the recruit roads (o = ownerOf(s), t = the palace, vic = the defect's mistress) */
for(const f of files){const src=fs.readFileSync(path.join(B,f),'utf8');const L=src.split('\n');
 L.forEach((l,i)=>{const re=/(\w+)\.spyFor\s*=\s*(?!null|=|x\.spyFor===|s\.spyFor===)([^;,)}]+)/g;let m;while((m=re.exec(l))){const who=m[1];if(/S\.srv/.test(l.slice(Math.max(0,m.index-6),m.index+8)))continue;
   const seg=l.slice(Math.max(0,m.index-260),m.index+260);const calls=[...seg.matchAll(/\b(oanAdd|affAdd|relAdd|rdOan|relTo)\(([^,()]+(?:\([^()]*\))?),\s*([^,()]+)/g)].map(c=>`${c[1]}(${c[2]},${c[3]})`);
   const bad=calls.filter(c=>{const a=c.slice(c.indexOf('(')+1).split(',')[0].trim();return a!==who&&MASTER.test(a)&&!/spyLearn/.test(seg)});
   if(bad.length)breach+=bad.length;rows.push({at:`${f}:${i+1}`,set:`${who}.spyFor=${m[2].trim().slice(0,18)}`,calls:calls.join(' ')||'-',bad:bad.join(' ')})}})}
console.log('RECRUIT SITES (spyFor set) — feeling calls in the same statement; BAD = the master\'s feeling at recruit time');
for(const r of rows)console.log(`${r.bad?'BAD ':'ok  '} ${r.at.padEnd(18)} ${r.set.padEnd(34)} ${r.calls}${r.bad?'  <-- '+r.bad:''}`);
/* 2 kỳ ngộ */
const ky=[];for(const f of ['jbalky.js','jbalkyc.js']){const p=path.join(B,f);if(!fs.existsSync(p))continue;const s=fs.readFileSync(p,'utf8');
 const re=/"?([\w-]+)"?:\{"?w"?:[^\n]*?"?o"?:\[(.*?)\]\}/g;let m;while((m=re.exec(s))){const id=m[1],o=m[2];const opts=o.split(/\},\s*\{/);opts.forEach((x,j)=>{if(/"?s"?:\s*"spy"/.test(x)){const oan=(x.match(/"?oan"?:\s*(\d+)/)||[])[1];ky.push({id,j,oan:oan?+oan:0});if(oan)breach++}})}}
console.log('\nKỲ NGỘ «spy» options (cost oán = «X để bụng oán» at recruit time)');for(const k of ky)console.log(`${k.oan?'BAD ':'ok  '} ${k.id} option ${k.j}: oán ${k.oan||'—'}`);
/* 3 learn sites */
let learn=0;const LS=[];for(const f of files){const s=fs.readFileSync(path.join(B,f),'utf8');const n=(s.match(/spyLearn\(|spyFound\(/g)||[]).length-(f==='jagknow.js'?((s.match(/function spyLearn\(|function spyFound\(/g)||[]).length):0);if(n>0){learn+=n;LS.push(`${f} ${n}`)}}
console.log(`\nLEARN sites calling the ONE helper (spyLearn / spyFound): ${learn} — ${LS.join(' · ')||'none'}`);
/* 4 j10 Có tin */
const j10=fs.readFileSync(path.join(B,'j10.js'),'utf8');const real=/taiMatRaw\(S\)\.find\(x=>ownerOf\(x\)===p\)/.test(j10),old=/eyes\(S\)>=3\)ev\+=`Có tin/.test(j10);if(old)breach++;
console.log(`j10 her bought servant «Có tin»: ${old?'BAD any 3 Tai mắt anywhere':real?'ok a real Tai mắt in the buyer\'s palace':'?'}`);
/* 5 svtouch-spylearn (MAIN 187, law 11): a WITNESS road that tells a master her servant was turned (jsvt svTouch «seen», kinds bribe/threat/tm/plot)
   must go through the ONE learn helper spyLearn — a master feeling call in a witness line without spyLearn for the turn kinds = breach */
const W5=[],W5s=new Set();for(const f of files){const L=fs.readFileSync(path.join(B,f),'utf8').split('\n');L.forEach((l,i)=>{if(!/svtSeen\(|const W=svtSeen/.test(l)&&!(/if\(W\)/.test(l)))return;
 const j=/if\(W\)/.test(l)?i:i+1;const seg=(L[j]||'');if(!/if\(W\)/.test(seg)||W5s.has(f+j))return;W5s.add(f+j);const hit=/(affAdd|oanAdd)\(m,/.test(seg);const ok=/SVT_TURN\[kind\]&&typeof spyLearn==="function"\)spyLearn\(m,/.test(seg);
 if(hit){W5.push(`${ok?'ok  ':'BAD '} ${f}:${j+1} witness «seen» → ${ok?'spyLearn for turn kinds':'master feeling WITHOUT spyLearn'}`);if(!ok)breach++}})}
console.log('\nWITNESS roads (svTouch seen) — turn kinds through spyLearn');for(const r of W5)console.log(r);if(!W5.length)console.log('none found');
console.log(`\nTAI-MAT-KNOW SCAN: ${breach} breach(es) · recruit sites ${rows.length} · kỳ ngộ spy options ${ky.length} · learn calls ${learn}`);process.exit(breach?1:0);
