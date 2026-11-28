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
   D. (r3, rv FAIL 2) EVERY die()/kill() with a written reason is classed: a punishment by a master / judge (words PW: dìm, giếng, trượng,
      đánh đòn, đòn roi, sai người, ban chết …) must sit inside a core (enclosing function = a core) or have a reason in DIE_OK; any other die() is
      listed as a death by cause (illness, poison, childbirth …). A beating (Sức − next to trượng / đánh đòn / đòn roi) outside a core = FAIL.
   E. (r3, rv FAIL 1) NO PENALTY SPLIT: a core call with a Danh / Sủng / bạc / Sức write on the SAME person just before it (same statement run)
      = part of the penalty falling before the gate → FAIL, unless routed through punPlus(p,fx,()=>core) (held with it) or reasoned in SPLIT_OK
      (her own card / her own act: nothing is held there).
   usage: node dev/test/accw-scan.js [--table]   → exit 1 on FAIL */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'..','build');const tab=process.argv.includes('--table');
const F=fs.readdirSync(D).filter(f=>f.endsWith('.js')&&f!=='all.js').sort();let fail=0;const ok=(c,m)=>{console.log((c?'ok   ':'FAIL ')+m);if(!c)fail++};
const CORE=['punish','fall','demote','chPunishX','chPunish','chConfess','chLie','chBack','deathSentence','cold','punTier','punLight','framed','srvAffairCaught','chSrvEnd','srvLaundry','srvKill','srvBeat'];
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
/* D: the enclosing function name of an offset (the last «function NAME(» before it) */
const encl=(T,i)=>{const m=[...T.slice(Math.max(0,i-6000),i).matchAll(/function\s+(\w+)\s*\(/g)].pop();return m?m[1]:''};
const PW=/dìm|giếng|trượng|đánh đòn|đòn roi|sai người|sai đánh|ban chết|xử tử|xử trảm|đánh chết|tru di|chém|rượu độc|lụa trắng|treo cổ|thắt cổ|phạt|trị tội|giết/i;
const DX=/(?<![\w.$])(die|kill)\(\s*[`"]([^`"]{0,140})/g;
const BEAT=/(apply\(\s*\{|ap\(\s*S\s*,\s*\{)[^}]*\bsuc\s*:\s*-/g;
/* E: same-person writes before a core call */
const NEG=/(?<![\w.])(ap\(\s*([\w.]+)\s*,\s*\{|apply\(\s*\{)[^}]*?\b(danh|sung|bac|suc)\s*:/g;
const SPLIT_OK=[
 ['j30.js',/chBack\(a/,'phản tọa on the accuser a of an act (a = her only in her own act: not held)'],
 ['jcharge.js',/chBack\(a/,'phản tọa on the accuser a of an act (a = her only in her own act: not held)'],
 ['j41.js',/lẻn vào/,'her own «lẻn vào» act (her tap): not held'],['j77.js',/lẻn vào/,'her own «lẻn vào» act (her tap): not held'],
 ['j7.js',/gửi quà có độc|giết người diệt khẩu/,'her own card option go() (chooseM): not held'],
 ['j8.js',/frameFailDanh|accuseFailDanh|ksabFailDanh|dâng đồ ngự dụng/,'the doer a of an act (a = her only in her own act: not held)'],
 ['j92.js',/giá họa vu oan/,'the framer cu (her only in her own Giá họa act: not held)'],['j92.js',/danhGuilty/,'her own defence card (guilty option, chooseM): not held'],
 ['j95.js',/accFail/,'the accuser of an act (her own failed accusation: not held; v = an NPC)'],['jroute.js',/accFail/,'the accuser v (an NPC; her own act not held)'],
 ['jrcp.js',/danhLose/,'her own recipe card result (chooseM): not held'],['jdress.js',/danhWdAccuseA/,'the accuser a (her only in her own act)'],
];
const DIE_OK=[['j4.js',/Mưu phản cùng cha/,'her own story card option (warned)'],['j42.js',/Bụng mang dạ chửa|Chuyện dính vào mưu|chết dưới đòn roi/,'inside srvAffairCaught() (a core)'],['j42.js',/function srvKill/,'srvKill (a core)'],
 ['j42.js',/kèm: bị phạt quỳ|Quỳ phạt đến kiệt sức|Bị đánh đòn vì tội trộm cắp|bị đánh đòn Sức/,'her own servant card option (cnvOrdOpts «Từ chối» / cnvScoldOpts «Cãi lại» / cnvFrameOpts «Thanh minh»: the card names the beating / kneeling risk)'],
 ['j42.js',/chủ giết ngươi trước ngày sắc phong|Trước ngày sắc phong/,'her own card option «Cúi đầu thưa tên» (the card names the risk: chủ giết ngươi trước ngày sắc phong)'],
 ['jcover.js',/sai người thủ tiêu/,'a witness murdered by the accused (a crime on her, the cover-up road; not a sentence)']];
const BEAT_OK=[['jbal2.js',/Bị bắt quả tang khi dò la/,'her own order card (cnvOrd «Giúp hết lòng»: «bị bắt thì … bị đánh chết ở Thận Hình ti»)']];let nDie=0,nDieP=0;const drow=[],srow=[];
let nCore=0,nBy=0;const rows=[],brow=[];
for(const f of F){const L=fs.readFileSync(path.join(D,f),'utf8').split('\n');L.forEach((l,i)=>{
  for(const m of l.matchAll(RX)){const pre=l.slice(Math.max(0,m.index-9),m.index);if(/function\s*$/.test(pre))continue;if(f==='jreignend.js'&&m[1]==='fall'&&/function fall\(c,k\)|fall\(c,/.test(l))continue;
   if(/^\s*(\/\*|\*)/.test(l.slice(0,m.index).trimStart().slice(0,2))&&!/[;{}]/.test(l.slice(0,m.index)))continue;nCore++;rows.push([`${f}:${i+1}`,m[1],'gate (wrapped core: held + warned when an NPC / the world brings it on her; her own card / act falls at once)'])}
  for(const m of l.matchAll(BX)){const ctx=l.slice(Math.max(0,m.index-160),m.index+40);if(f==='jaccw.js')continue;
   const isDie=/^(die|kill)\(/.test(m[0]);const list=isDie?DIE_OK:BYPASS;const hit=list.find(([ff,rx])=>ff===f&&rx.test(ctx));nBy++;brow.push([`${f}:${i+1}`,m[0].slice(0,24),hit?hit[2]:'— UNKNOWN —']);
   ok(!!hit,`bypass ${f}:${i+1} «${m[0].slice(0,30)}» — ${hit?hit[2]:'NEW direct punishment write outside a core: route it through a core (jaccw gate) or review + add its reason'}`)}})}
/* D + E over the whole files (multi-line safe) */
for(const f of F){if(f==='jaccw.js')continue;const T=fs.readFileSync(path.join(D,f),'utf8');const ln=i=>T.slice(0,i).split('\n').length;
 for(const m of T.matchAll(DX)){nDie++;const why=m[2];const fn=encl(T,m.index);const ctx=T.slice(Math.max(0,m.index-160),m.index+40);if(!PW.test(why)){drow.push([`${f}:${ln(m.index)}`,why.slice(0,60),'death by cause (not a punishment)']);continue}
  nDieP++;const inCore=CORE.includes(fn);const hit=inCore?[0,0,`inside core ${fn}()`]:DIE_OK.find(([ff,rx])=>ff===f&&rx.test(ctx));drow.push([`${f}:${ln(m.index)}`,why.slice(0,60),hit?hit[2]:'— UNKNOWN —']);
  ok(!!hit,`die() ${f}:${ln(m.index)} «${why.slice(0,60)}» — ${hit?hit[2]:'a punishment death outside a core: route it through a core (srvKill / deathSentence …) so the gate warns first'}`)}
 for(const m of T.matchAll(BEAT)){const ctx=T.slice(Math.max(0,m.index-200),m.index+260);if(!/trượng|đánh đòn|đòn roi|roi vọt/.test(ctx))continue;const fn=encl(T,m.index);
  const bh=CORE.includes(fn)?`inside core ${fn}()`:(BEAT_OK.find(([ff,rx])=>ff===f&&rx.test(ctx))||[])[2];
  ok(!!bh,`beating ${f}:${ln(m.index)} (Sức − by trượng / đòn) — ${bh||'outside a core: route it through srvBeat (gate)'}`)}
 for(const m of T.matchAll(RX)){const pre=T.slice(Math.max(0,m.index-9),m.index);if(/function\s*$/.test(pre))continue;const ls=T.lastIndexOf('\n',m.index)+1;const w=T.slice(Math.max(ls,m.index-250),m.index);
  const cut=Math.max(w.lastIndexOf('return'),w.lastIndexOf('}else'),w.lastIndexOf('=>'),w.lastIndexOf('function'),w.lastIndexOf('punPlus('));
  const tg=(T.slice(m.index+m[1].length+1).match(/^\s*([\w.]+|"[^"]*"|`)/)||[])[1]||'?';
  const same=[...w.matchAll(NEG)].filter(h=>h.index>cut&&(h[1].startsWith('apply')?(tg==='S'||/^["`]/.test(tg)):h[2]===tg));if(!same.length)continue;
  const ctx=T.slice(Math.max(0,m.index-260),m.index+80);const ef=encl(T,m.index);const hit=CORE.includes(ef)?[0,0,`inside core ${ef}() (held whole at its entry)`]:SPLIT_OK.find(([ff,rx])=>ff===f&&rx.test(ctx));srow.push([`${f}:${ln(m.index)}`,`${m[1]}(${tg}) ← ${same.map(h=>w.slice(h.index,h.index+30)).join(' | ')}`,hit?hit[2]:'— SPLIT —']);
  ok(!!hit,`split ${f}:${ln(m.index)} ${m[1]}(${tg}) after ${same.map(h=>w.slice(h.index,h.index+30)).join(' | ')} — ${hit?hit[2]:'part of the penalty falls before the gate: punPlus(p,fx,()=>core)'}`)}}
/* C: assembly order + wraps */
const asm=fs.readFileSync(path.join(D,'assemble.py'),'utf8');const list=(asm.match(/for f in \[([^\]]+)\]/)||[])[1]||'';const mods=[...list.matchAll(/'([^']+)'/g)].map(x=>x[1]);
ok(mods.length>100&&mods[mods.length-1]==='jaccw.js',`jaccw.js is the LAST module (outermost wrap): last = ${mods[mods.length-1]} (${mods.length} modules)`);
const J=fs.readFileSync(path.join(D,'jaccw.js'),'utf8');const C=(J.match(/const CORE=\[([^\]]+)\]/)||[])[1]||'';const wr=[...C.matchAll(/"([^"]+)"/g)].map(x=>x[1]);
for(const k of ['punish','fall','demote','chPunishX','chPunish','framed','deathSentence','cold','punTier','srvAffairCaught','chSrvEnd','srvLaundry','srvKill','srvBeat'])ok(wr.includes(k),`core «${k}» is wrapped by the gate`);
/* chPunish / chConfess / chLie / chBack / punLight / framed reach a wrapped core inside (one penalty = one gate) */
const src=F.map(f=>fs.readFileSync(path.join(D,f),'utf8')).join('\n');
for(const [k,inner] of [['chPunish','chPunishX'],['chConfess','chPunishX'],['chLie','chPunishX'],['chBack','chPunishX'],['framed','punish']]){const d=(src.match(new RegExp(`function ${k}\\([^)]*\\)\\{[^\\n]*`))||[''])[0];ok(d.includes(inner+'('),`${k}() falls through the wrapped ${inner}()`)}
ok(nCore>=150,`core call sites found: ${nCore} (all through the wrapped cores)`);
console.log(`\nLAW 11 SCAN: ${nCore} core call sites → gate; ${nBy} direct writes → ${brow.filter(r=>r[2]!=='— UNKNOWN —').length} reasoned, ${brow.filter(r=>r[2]==='— UNKNOWN —').length} unknown; die() ${nDie} (${nDieP} punishment words → ${drow.filter(r=>r[2]!=='— UNKNOWN —'&&r[2]!=='death by cause (not a punishment)').length} in a core / reasoned, ${drow.filter(r=>r[2]==='— UNKNOWN —').length} unknown); split sites ${srow.length} (${srow.filter(r=>r[2]!=='— SPLIT —').length} reasoned, ${srow.filter(r=>r[2]==='— SPLIT —').length} split)`);
if(tab){console.log('\n| site | core | road |\n|---|---|---|');rows.forEach(r=>console.log(`| ${r.join(' | ')} |`));console.log('\n| site | write | why it is not a bypass |\n|---|---|---|');brow.forEach(r=>console.log(`| ${r.join(' | ')} |`));console.log('\n| die() site | reason | class |\n|---|---|---|');drow.forEach(r=>console.log(`| ${r.join(' | ')} |`));console.log('\n| split site | write before the core | why |\n|---|---|---|');srow.forEach(r=>console.log(`| ${r.join(' | ')} |`))}
console.log(fail?`accw-scan: FAIL ${fail}`:'accw-scan: PASS');process.exit(fail?1:0);
