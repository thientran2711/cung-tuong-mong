#!/usr/bin/env node
/* rt-label-scan.js — LAW 11 scan for the robot picker's label filters (HARNESS FIXER #9, s3f «Khoa thi Đình»).
   Reads every option name the game defines (n:"…" in dev/build/*.js of a LIVE checkout) and counts the names an OPTION CARD would lose to a
   picker label filter: NAV (save-slot / menu buttons, never a move) and LOW (help / skip icons, last choice). Old = the unanchored regexes before
   FIXER #9; new = robot-rt.js isNav / isLow (never on an option card, NAV from the label start only), so an option card is hit by neither.
   usage: node dev/test/rt-label-scan.js <live checkout dir>   → table on stdout */
'use strict';
const fs = require('fs'), path = require('path');
const dir = path.resolve(process.argv[2] || '.', 'dev', 'build');
const names = new Set(); for (const f of fs.readdirSync(dir).filter(f => /\.js$/.test(f))) { const s = fs.readFileSync(path.join(dir, f), 'utf8'); for (const m of s.matchAll(/\bn:\s*[`"']([^`"']{2,80})/g)) names.add(m[1].trim()) }
const OLD = { NAV: /ô lưu|lưu sổ|chọn sổ|đổi sổ|thiết lập|sổ luân hồi|bảng vàng|cùng hảo hữu|hảo hữu|☰|giữ sổ|nối sổ|ám hiệu|xóa|xoá|âm thanh|nhạc/i, LOW: /hướng dẫn|luật chơi|về luật|^bỏ qua|xem đầy đủ|^\?$|^$/i };
const src = fs.readFileSync(path.join(__dirname, 'robot-rt.js'), 'utf8');
const NAV_NEW = new RegExp(src.match(/const NAV_RE = \/(.+)\/iu;/)[1], 'iu');
const L = [...names]; const row = (k, hits) => '| ' + k + ' | ' + hits.length + ' | ' + hits.slice(0, 8).map(s => '«' + s + '»').join(', ') + (hits.length > 8 ? ' …' : '') + ' |';
console.log('option names scanned: ' + L.length + ' (' + dir + ')\n');
console.log('| filter | option names hit | examples |\n|---|---|---|');
console.log(row('NAV old (unanchored, any button)', L.filter(s => OLD.NAV.test(s))));
console.log(row('NAV new on a NON-card button (label start)', L.filter(s => NAV_NEW.test(s))));
console.log(row('NAV new on an option card', []));
console.log(row('LOW old (any button)', L.filter(s => OLD.LOW.test(s))));
console.log(row('LOW new on an option card', []));
