/* ROW 12 r2 — LAW 11 family scan + guard (owner OD 25/11 ~23:33Z L2531 «a punishment never falls without a prior visible warning»).
   The warning is ONE runtime gate (dev/build/jaccw.js): every punishment core is wrapped there, so a NEW call site of a core can never bypass it.
   This scan proves the two ways a punishment could still bypass the gate are closed:
   A. CORE SITES — every call of a punishment core in dev/build/*.js (punish · fall · demote · chPunishX/chPunish/chConfess/chLie/chBack ·
      deathSentence · cold · punTier · punLight · framed · srvAffairCaught · chSrvEnd · srvLaundry · srvKill) is listed with the road kind the gate
      sees for it (table); all of them go through the wrapped core → «gate».
   B. BYPASS SITES — a punishment written straight into the state (confined = / rank = punDown / seatPut down / S.out = / die(«ban chết …») /
      over(«Bị đuổi …»)) outside a core does NOT pass the gate. Each known one is in BYPASS below with its reason (inside a core, a release,
      her own card, a quarantine …). A new one → FAIL (guard): route it through a core, or add it here with its reason after review.
   C. the assembled game: jaccw.js is the LAST module (its wrap is outermost) and every core in the page carries the wrap (__aw).
   usage: node dev/test/accw-scan.js [--table]   → exit 1 on FAIL */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'..','build');const tab=process.argv.includes('--table');
const F=fs.readdirSync(D).filter(f=>f.endsWith('.js')&&f!=='all.js').sort();let fail=0;const ok=(c,m)=>{console.log((c?'ok   ':'FAIL ')+m);if(!c)fail++};
const CORE=['punish','fall','demote','chPunishX','chPunish','chConfess','chLie','chBack','deathSentence','cold','punTier','punLight','framed','srvAffairCaught','chSrvEnd','srvLaundry','srvKill'];
const RX=new RegExp(`(?<![\\w.$])(${CORE.join('|')})\\(`,'g');
/* B: reasons for the known direct writes (file → [regex on the 120 chars before, reason]) */
const BYPASS=[
 ['j13.js',/catchIll\(p,"daumua"\)/,'epidemic quarantine (illness, not a punishment; lifts with the sickness)'],
 ['j14.js',/punRows\(\{kind:"cold"|S\.rank=0;S\.confined=0/,'inside cold() (the core)'],
 ['j30.js',/function demote\(p,why\)|punTwice\(p\)\)return punLight\(p,why\)/,'inside demote() (the core)'],
 ['j4.js',/st\.acc&&S\.turn>=st\.acc/,'father\'s case story: the deadline «hạn tra xét» was set on her own story card (warned)'],
 ['j42.js',/function srvW\(f\)/,'servant-life view trick (S.out while the servant life runs), not a punishment'],
 ['j42.js',/Bụng mang dạ chửa|r<\.25\)\{over/,'inside srvAffairCaught() (a core)'],
 ['j63.js',/b0\.rank=v\.rank/,'a snapshot copy for a measure, not a write'],
 ['j67.js',/function e67drop|e67drop\(v,why\)/,'NPC-only road-event drop (v is never her: rvOk67)'],
 ['j68q.js',/e68On also holds/,'comment'],
 ['j72.js',/v\.confined&&!v\.out\)\{v\.confined=Math\.max\(0,v\.confined-1\)/,'a release (cấm túc shortened), not a punishment'],
 ['j8.js',/sev>=2&&rkOf\(p\)>0&&!punTwice\(p\)|const m=punishMonths\(sev\);/,'inside punish() (the core)'],
 ['j8.js',/BAL\.eff\.j8\.sungDeathSentence\}\);const r0|r0>0&&!punTwice\(p\)\)\{seatPut/,'inside deathSentence() (the core)'],
 ['j8.js',/coldDaysLeft\(v\)|if\(v\.out\)coldFree\(v\)/,'a pardon (release), not a punishment'],
 ['jagacts.js',/restore\(false|coldFree\(v\);v\.confined=0|coldStayOk\(p\)/,'a pardon (release), not a punishment'],
 ['jcharge.js',/function chSrvEnd|S\.srvMcEnd=o|Tội mua chu/,'inside chSrvEnd() (a core)'],
 ['jcoopworld.js',/g\.conf\)S\.confined/,'co-op guest seat: the host already gated it (worldOn false here)'],
 ['jemoact.js',/mNew!=null&&q/,'inside a punish() wrapper (the core)'],
 ['jkc.js',/kcW|S\.out=1, as srvW|function kcW/,'kitchen-life view trick, not a punishment'],
 ['jpun.js',/function punLight|p\.coldLife=x==="phe"|const r0=S\.rank;S\.rank=punDown\(S\)|rkOf\(p\)<=0\|\|punTwice\(p\)\)\{punish/,'inside punTier / punLight / punCold (the core)'],
 ['jrd_bd.js',/const bdConfine=/,'road event: her own event card option (warned on the card)'],
 ['jrd_nc.js',/const ncConfine=/,'road event: her own event card option (warned on the card)'],
 ['jrd_pt.js',/const pfConfine=/,'road event: her own event card option (warned on the card)'],
 ['jrd_cn.js',/const CN_CAM=|rvOk67\(v\)\)&&!v\.queen/,'road event: her own card option / NPC-only drop'],
 ['jrd_ch.js',/rv67\(A,"v"\)/,'road event: NPC-only (rv67 = an NPC)'],
 ['jrd_muoi.js',/e67drop\(v,why\)/,'road event: NPC-only'],
 ['jreign.js',/rgMembers\("quyen"\)/,'NPC-only (the faction members, never her)'],
 ['jseat.js',/function seatPut|seatHas\(p,r\)|seatDown\(p,r-1\)/,'the seat machinery itself (called by the cores / promotions)'],
 ['jstagehere.js',/place-close: overstay confined/,'place-close undo of a wrongful cấm túc (a release)'],
 ['jworld.js',/start\(w\)\{const b=B\(\)\.xa|for\(const v of rivals\)\{if\(!v\.alive\)continue;if\(v\.confined\)/,'đại xá (amnesty, a release)'],
];
const BX=/(?<![\w.])(\w+\.)?confined\s*=(?!=)|(?<![\w.])(S|p|t|v|a|m|x)\.out\s*=\s*(1|true)|seatPut\(|\.rank\s*=\s*(punDown|Math\.max\(0,[^)]*-)|over\("Bị đuổi|(?<![\w.])(die|kill)\(\s*[`"][^`"]{0,80}(ban chết|xử tử|xử trảm|đánh chết|tru di|chém|rượu độc|lụa trắng)/g;
const DIE_OK=[['j4.js',/Mưu phản cùng cha/,'her own story card option (warned)'],['j42.js',/Bụng mang dạ chửa|Chuyện dính vào mưu|chết dưới đòn roi/,'inside srvAffairCaught() (a core)'],['j42.js',/function srvKill/,'srvKill (a core)']];
let nCore=0,nBy=0;const rows=[],brow=[];
for(const f of F){const L=fs.readFileSync(path.join(D,f),'utf8').split('\n');L.forEach((l,i)=>{
  for(const m of l.matchAll(RX)){const pre=l.slice(Math.max(0,m.index-9),m.index);if(/function\s*$/.test(pre))continue;if(f==='jreignend.js'&&m[1]==='fall'&&/function fall\(c,k\)|fall\(c,/.test(l))continue;
   if(/^\s*(\/\*|\*)/.test(l.slice(0,m.index).trimStart().slice(0,2))&&!/[;{}]/.test(l.slice(0,m.index)))continue;nCore++;rows.push([`${f}:${i+1}`,m[1],'gate (wrapped core: held + warned when an NPC / the world brings it on her; her own card / act falls at once)'])}
  for(const m of l.matchAll(BX)){const ctx=l.slice(Math.max(0,m.index-160),m.index+40);if(f==='jaccw.js')continue;
   const isDie=/^(die|kill)\(/.test(m[0]);const list=isDie?DIE_OK:BYPASS;const hit=list.find(([ff,rx])=>ff===f&&rx.test(ctx));nBy++;brow.push([`${f}:${i+1}`,m[0].slice(0,24),hit?hit[2]:'— UNKNOWN —']);
   ok(!!hit,`bypass ${f}:${i+1} «${m[0].slice(0,30)}» — ${hit?hit[2]:'NEW direct punishment write outside a core: route it through a core (jaccw gate) or review + add its reason'}`)}})}
/* C: assembly order + wraps */
const asm=fs.readFileSync(path.join(D,'assemble.py'),'utf8');const list=(asm.match(/for f in \[([^\]]+)\]/)||[])[1]||'';const mods=[...list.matchAll(/'([^']+)'/g)].map(x=>x[1]);
ok(mods.length>100&&mods[mods.length-1]==='jaccw.js',`jaccw.js is the LAST module (outermost wrap): last = ${mods[mods.length-1]} (${mods.length} modules)`);
const J=fs.readFileSync(path.join(D,'jaccw.js'),'utf8');const C=(J.match(/const CORE=\[([^\]]+)\]/)||[])[1]||'';const wr=[...C.matchAll(/"([^"]+)"/g)].map(x=>x[1]);
for(const k of ['punish','fall','demote','chPunishX','deathSentence','cold','punTier','srvAffairCaught','chSrvEnd','srvLaundry','srvKill'])ok(wr.includes(k),`core «${k}» is wrapped by the gate`);
/* chPunish / chConfess / chLie / chBack / punLight / framed reach a wrapped core inside (one penalty = one gate) */
const src=F.map(f=>fs.readFileSync(path.join(D,f),'utf8')).join('\n');
for(const [k,inner] of [['chPunish','chPunishX'],['chConfess','chPunishX'],['chLie','chPunishX'],['chBack','chPunishX'],['framed','punish']]){const d=(src.match(new RegExp(`function ${k}\\([^)]*\\)\\{[^\\n]*`))||[''])[0];ok(d.includes(inner+'('),`${k}() falls through the wrapped ${inner}()`)}
ok(nCore>=150,`core call sites found: ${nCore} (all through the wrapped cores)`);
console.log(`\nLAW 11 SCAN: ${nCore} core call sites → gate; ${nBy} direct writes → ${brow.filter(r=>r[2]!=='— UNKNOWN —').length} reasoned, ${brow.filter(r=>r[2]==='— UNKNOWN —').length} unknown`);
if(tab){console.log('\n| site | core | road |\n|---|---|---|');rows.forEach(r=>console.log(`| ${r.join(' | ')} |`));console.log('\n| site | write | why it is not a bypass |\n|---|---|---|');brow.forEach(r=>console.log(`| ${r.join(' | ')} |`))}
console.log(fail?`accw-scan: FAIL ${fail}`:'accw-scan: PASS');process.exit(fail?1:0);
