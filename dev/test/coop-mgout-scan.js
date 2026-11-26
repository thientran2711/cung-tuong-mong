/* coop-mgout-scan (LAW 11, coop-thin-g-f1 #7): every co-op bot that moves the week (#next / nextBuoi / endTurn) must be able to PLAY OUT a mini game
   opened on a phone (#ov game frame: the F6b dress board on her phone, toilette, lessons …). Thin rooms wait for her while she is in one
   (CW.frPz → jcoopthing gHold / jcoopthine owe), so a bot that cannot leave the board stalls the room for ever (coop-cyc «som», coop-night,
   coop-timer reds). The ONE step lives in dev/test/lib/coop-clear.js (TAP step 6).
   Classes per bot: HELPER (calls lib/coop-clear.js: step 6 included) | OWN (its own #ov play-out: a [id$=skip] / kit quick tap inside #ov) |
   NOMOVE (never moves the week) | OPEN (moves the week, no play-out).
   usage: node dev/test/coop-mgout-scan.js [--list]   exit 1 when the helper lacks step 6 or a bot is OPEN and not in the reviewed list below. */
const fs=require('fs'),path=require('path');const D=__dirname;
const lib=fs.readFileSync(path.join(D,'lib/coop-clear.js'),'utf8');
const step6=/6\. a mini game open in the game frame #ov/.test(lib)&&/\[id\$=done\]/.test(lib);
/* reviewed OPEN: bots that move the week but never reach a phone mini game (unit / probe / single-week pages); one line each */
const REV={'sw-update.js':'service-worker update pages (one sổ, one buổi): never reaches a mini game'};
const files=fs.readdirSync(D).filter(f=>f.endsWith('.js')&&f!=='coop-mgout-scan.js');
const rows=[];for(const f of files){const s=fs.readFileSync(path.join(D,f),'utf8');if(!/COOPW/.test(s)||!/\?room=/.test(s))continue;/* a two-seat room bot (joins by ?room=) */
 const moves=/getElementById\(['"]next['"]\)[^;]{0,80}click|press1?\(|nextBuoi\(|endTurn\(/.test(s);
 const helper=/lib\/coop-clear(\.js)?['"]/.test(s)||/coop-e2e\.js['"]\)[\s\S]{0,120}async function clear\(/.test(s)/* coop-e2e's clear() read from its source (it calls the helper) */;
 const own=/(getElementById\(['"]ov['"]\)|querySelector(All)?\(['"]#ov)[\s\S]{0,2500}(\[id\$=skip\]|kquick|kg82skip|tsdskip|mgskip|Bỏ qua)/.test(s);
 const cls=helper?'HELPER':own?'OWN':!moves?'NOMOVE':REV[f]?'REVIEWED':'OPEN';rows.push([f,cls])}
const n=c=>rows.filter(r=>r[1]===c).length;
console.log(`helper step 6: ${step6?'yes':'NO'} | bots ${rows.length}: HELPER ${n('HELPER')} OWN ${n('OWN')} NOMOVE ${n('NOMOVE')} REVIEWED ${n('REVIEWED')} OPEN ${n('OPEN')}`);
if(process.argv.includes('--list'))for(const r of rows)console.log(r[1].padEnd(8),r[0]);
else for(const r of rows.filter(r=>r[1]==='OPEN'))console.log('OPEN    ',r[0]);
process.exit(step6?0:1);
