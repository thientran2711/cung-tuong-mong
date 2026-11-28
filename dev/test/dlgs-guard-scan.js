/* dlgs-guard-scan — LAW 11 family scan for review/sideline-dlg F3: every test in dev/test that can open a SIDE-LINE card and read / shoot #modal,
   or drive turns, must meet the side-line dialogue scene (jdlgs.js) knowingly: scenes OFF (card / shot / scan tests) or tapped through
   like a player (play bots), through the ONE helper dev/test/lib/dlgs-off.js (directly or through a shared lib that uses it).
   usage: node dev/test/dlgs-guard-scan.js [-v]   → one row per file matching the family grep; exit 1 on any UNGUARDED.
   Family grep = the F3 brief's grep (q72Offer|q72o|e68c|j7c|kyngo|j70|compCard|jworldc|showModal|Sang buổi) WIDENED to every side-line
   card id / builder (SL) and every turn drive (TURN) below: the brief's grep missed 190 tests that open side-line cards through q72Test /
   PEND / E68 or drive turns with nextBuoi / #next (e.g. j72c-shots, night-multi, palace-life).
   Per file:
     off / tap   it uses lib/dlgs-off.js (pw('off'|'tap'), off(), autoTap(), tap(), through())
     lib:<name>  it goes through a shared lib that uses lib/dlgs-off.js: coop-clear (tap, step 0), playperf (tap, STEP), pw-roulette /
                 roulette autoDismissRoulette / passNewLifePopups (tap), dsprobe boot (off)
     exempt      EXEMPT table below (reason), or auto: not a JS test (docs, data, python), or NOT REACHED = the source names no side-line
                 card / builder (SL) and drives no turn (TURN): it shows only its own cards, never a side-line pid, so no scene can play
     UNGUARDED   anything else → FAIL. */
const fs=require('fs'),path=require('path');const DIR=__dirname;const V=process.argv.includes('-v');
/* a side-line card id / its builder (jdlgs families: j72 q72o, j68 e68c / e68<id> E68, j7 J7 / EVI ev ids / j7c, kỳ ngộ KY, j70 P70, j71c FV7, jworldc worldStart, PEND builders, DLGS) */
const SL=/evRelease|approaches\(|q72|e68|E68|j7c|J7I|J7SEEDS|kyngo|KY\.|j70|P70|compCard|jworldc|worldStart|j71c|FV7|EVI\b|evFire|PEND|DLGS/;
/* drives the game clock (a card of any family can fire on its own) */
const TURN=/nextBuoi|#next|\(["']next["']\)|Sang buổi|Sang ngày mới|endTurn|endWeek|inpage[0-9]|measure\//;
const G=new RegExp(/q72Offer|q72o|e68c|j7c|kyngo|j70|compCard|jworldc|showModal|Sang buổi/.source+'|'+SL.source+'|'+TURN.source);
const EXEMPT={
'hand-max-hook.js':'in-page census hook loaded by dev/measure/evbot.js (that runner owns the browser); opens no page',
'kit-ring-boot.js':'helper: boots a page the CALLING test made (the caller holds the guard); launches no browser',
'lib/qdrain.js':'in-page init script lib (ctx.addInitScript by the calling test); launches no browser',
'realtap.js':'real-tap helper on a page the CALLING test made (the caller holds the guard); launches no browser',
'rt-offer.js':'robot offer-log classifier (pure functions on logged labels); opens no page',
'selscene-mock/ss2.js':'in-page mock timeline injected by the selscene mock runner (boot.js holds the guard); opens no page',
'text-hygiene.js':'static text scan of sampler logs + built source (reads files, opens no page)',
'tai-mat-know-scan.js':'static node scan of dev/build sources (opens no page)',
'wording-gain-scan.js':'static wording scan of the built source (reads files, opens no page)',
 'dlgs-play.js':'THE scene test: plays every side-line scene tap by tap on both devices on purpose',
 'dlgs-guard-scan.js':'this scan (reads sources, opens no page)',
 'dlgs-encounter.js':'THE scene-vs-room-encounter test: plays one side-line scene tap by tap on purpose, then checks the encounter takes the card',
 'cb-ton.fn.js':'in-page fn file run by cb-shot.js (cb-shot.js is guarded: off)',
 'cb-view.fn.js':'in-page fn file run by cb-shot.js (cb-shot.js is guarded: off)',
 'coop-qtrace.js':'debug init-script module (Q push trace) of the co-op tests; opens no page, shows no card',
 'indep/ia_hook.js':'in-page check hooks injected by indep/ia_bot.js (guarded: tap); opens no page',
 'log-sync-inpage.js':'in-page stat audit injected after dev/measure/inpage4.js (outside dev/test); opens no page, reads no card',
 'kyngo-eq.js':'pure node: value table from BAL.kyngo, no browser',
 'norep-unit.js':'pure node vm unit test of jnorep, no browser',
 'p6-measure.js':'pure node draw measure, no browser',
 'cb-wx.fn.js':'in-page fn file run by cb-shot.js (cb-shot.js is guarded: off)',
 'cb-fest.js':'static scan of festival data (node, no browser)',
 'coop-thin-quiet-scan.js':'static acorn scan of dev/build sources, no browser',
 'coop-thin-trip.js':'init-script module for the guest page of coop-bot.js (coop-bot goes through lib/coop-clear: tap); opens no page',
 'ending-scan.js':'static scan of dev/build/*.js, no browser',
 'gift-pick-scan.js':'static scan of dev/build sources, no browser',
 'roster_audit_c.js':'in-page invariants injected by roster_audit.js (guarded: tap); opens no page',
 'lib/coop-real.js':'co-op set-up helper (writes the record on both seats); opens no page, shows no card — its callers are listed',
 'one-core-text.js':'static text guard (acorn / vm over dev/build + dev/measure sources), no browser',
 'one-core-text-rule.js':'runs dev/measure/one-core-text-rule.js, a static text↔rule check (child_process), no browser',
 'lib/device.js':'device profiles / host helpers; opens no game page itself (its callers are listed)',
 'lib/kmscene.js':'init-script helper for kit scenes; its callers are listed',
};
const GUARD_LIB=[[/lib\/coop-clear/,'lib:coop-clear'],[/lib\/playperf/,'lib:playperf'],[/lib\/pw-roulette/,'lib:pw-roulette'],[/lib\/dsprobe/,'lib:dsprobe']];
function walk(d,o){for(const n of fs.readdirSync(d)){const f=path.join(d,n);const st=fs.statSync(f);if(st.isDirectory())walk(f,o);else o.push(f)}return o}
const rows=[];let bad=0;const cnt={};
for(const f of walk(DIR,[]).sort()){const rel=path.relative(DIR,f).split(path.sep).join('/');let s;try{s=fs.readFileSync(f,'utf8')}catch(e){continue}if(!G.test(s))continue;
 let g='',why='';
 if(/\.js$/.test(rel)&&/lib\/dlgs-off|require\(['"]\.\/dlgs-off/.test(s)){const m=s.match(/\.pw\(['"](off|tap)['"]/);g=m?m[1]:/\.off\(|\bOFF\b/.test(s)?'off':'tap'}
 else if(rel==='lib/dlgs-off.js'){g='helper';why='the helper itself'}
 if(!g&&/\.js$/.test(rel)){for(const [re,k] of GUARD_LIB)if(re.test(s)){g=k;break}
  if(!g&&/lib\/roulette/.test(s)&&/autoDismissRoulette|passNewLifePopups/.test(s))g='lib:roulette'}
 if(!g&&EXEMPT[rel]){g='exempt';why=EXEMPT[rel]}
 if(!g&&!/\.js$/.test(rel)){g='exempt';why='not a JS test (doc / data / python)'}
 if(!g&&!SL.test(s)&&!TURN.test(s)){g='exempt';why='not reached: names no side-line card / builder and drives no turn (own cards only)'}
 if(!g){g='UNGUARDED';bad++;why=(SL.test(s)?'side-line card ':'')+(TURN.test(s)?'turn drive':'')}
 cnt[g.startsWith('exempt')?(why.startsWith('not reached')?'exempt:not-reached':'exempt:other'):g]=(cnt[g.startsWith('exempt')?(why.startsWith('not reached')?'exempt:not-reached':'exempt:other'):g]||0)+1;
 rows.push([rel,g,why])}
for(const [r,g,w] of rows)if(V||g==='UNGUARDED'||(g==='exempt'&&!w.startsWith('not reached')))console.log((g==='UNGUARDED'?'FAIL ':'ok   ')+r.padEnd(34)+' '+g.padEnd(16)+' '+w);
console.log('files '+rows.length+' · '+Object.entries(cnt).map(([k,v])=>k+' '+v).join(' · '));
console.log(bad?('UNGUARDED '+bad+': FAIL'):'dlgs-guard-scan: PASS');process.exit(bad?1:0);
