#!/usr/bin/env node
/* robot-audit-unit.js — unit cases for dev/measure/robot-audit.js (FIXER #10: entry tap is never an exit pick · full mini-game back counter).
   usage: node dev/measure/robot-audit-unit.js [path/to/robot-audit.js]  → «UNIT OK» or the FAIL lines (exit 1) */
'use strict';
const path = require('path');
const A = require(path.resolve(process.argv[2] || path.join(__dirname, 'robot-audit.js')));
let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log('FAIL ' + m) } else console.log('ok   ' + m) };
const H = { kind: 'realtap', realtap: true, jsClicks: 0 };
const ban = { id: 'Xuất cung về quê', type: 'end', age: 20 }; /* an exit-road ending: VALID only when the bot did not choose it */
/* 1. pre-life entry tap logged as exitPick by robot-rt ≤ 0e0ebe29 (no screen field; the trace names Chọn sổ) */
const old = { harness: H, exitPick: { label: 'Bắt đầu kiếp mới', only: false, via: 'tap outside the exit-only branch', at: 40 }, trace: [[40, '.dlg «Chọn sổ» «Bắt đầu kiếp mới»'], [900, '.dlg «Lễ ra mắt» «Dâng Cầm»']] };
ok(A.isEntryPick(old.exitPick, old.trace), 'old record: «Bắt đầu kiếp mới» on «Chọn sổ» = entry tap');
ok(A.verdict(old, ban).valid, 'old record: the entry tap is not the bot exit → the exit ending is game-imposed, VALID');
/* 2. new record with screen */
const nw = { harness: H, exitPick: { label: 'Bắt đầu kiếp mới', screen: '#modal «Chọn sổ»', only: false, via: 'tap outside the exit-only branch', at: 5 } };
ok(A.isEntryPick(nw.exitPick, []) && A.verdict(nw, ban).valid, 'new record (screen «Chọn sổ») = entry → VALID');
/* 3. a REAL in-life exit tap stays an exit pick */
const real = { harness: H, exitPick: { label: 'Xuất cung về quê', screen: '.dlg «Hết hạn»', only: false, via: 'tap outside the exit-only branch', at: 99 } };
ok(!A.isEntryPick(real.exitPick, []) && !A.verdict(real, ban).valid, 'in-life «Xuất cung về quê» stays a bot-chosen exit → INVALID');
const real2 = { harness: H, exitPick: { label: 'Bắt đầu kiếp mới', only: false, via: 'tap outside the exit-only branch', at: 300 }, trace: [[300, 'page «Phòng của ta» «Bắt đầu kiếp mới»']] };
ok(!A.isEntryPick(real2.exitPick, real2.trace), 'old record: «Bắt đầu kiếp mới» tapped on an in-life page stays an exit (new-life shortcut)');
const pk = { harness: H, exitPick: { label: 'Bắt đầu kiếp mới', n: 3, only: false, at: 7 }, trace: [[7, '.dlg «Chọn sổ» «Bắt đầu kiếp mới»']] };
ok(!A.isEntryPick(pk.exitPick, pk.trace), 'the picker exit branch (no via) is never treated as an entry tap');
/* 4. mini-game backs: full counter wins over the 40-detail list */
const why = Array.from({ length: 40 }, () => ({ ph: 'play', long: false }));
ok(A.mgQuitOf({ harness: Object.assign({}, H, { mgBackWhy: why, mgBackQuitN: 57 }) }, null).n === 57, 'mgBackQuitN 57 with 40 details → 57 quits (not 40)');
ok(A.mgQuitOf({ harness: Object.assign({}, H, { mgBackWhy: why }) }, null).n === 40, 'old harness (no counter) → the 40 details');
ok(A.mgQuitOf({ harness: Object.assign({}, H, { mgBackWhy: [{ ph: 'result' }], mgBackN: 1, mgBackQuitN: 0 }) }, null).n === 0, 'a back on the result only → 0 quits');
console.log(bad ? bad + ' FAIL' : 'UNIT OK'); process.exit(bad ? 1 : 0);
