#!/usr/bin/env node
/* kit_dupes.js — fails (exit 1) when a RETIRED private UI variant comes back into the build (KIT.md "Bảng gộp trùng").
   Usage: node dev/test/kit_dupes.js            (static check of the modules listed in dev/build/assemble.py + p1.html)
   Every row of RETIRED is a component that was drawn twice and is now ONE kit component; the old class names must not reappear.
   Comments are ignored (history notes may name the old classes). */
const fs=require('fs'),path=require('path');
const B=path.join(__dirname,'..','build');
const asm=fs.readFileSync(path.join(B,'assemble.py'),'utf8');
const files=[...asm.matchAll(/'(j[a-z0-9]*\.js)'/g)].map(m=>m[1]).concat(['p1.html']);
const RETIRED=[
 // [pattern, what it was, the kit component to use instead]
 [/\bkitHandFlip[A-Za-z]*\b|\bkhflip\b|\.khff\b|\.khfb\b|\.khfi\b|\bKIT_HAND\.flip\b/, 'Bàn bài card FLIP (back side) — owner 26/11 ~23:58Z «Ok bỏ lật, làm theo Game of Dice»: no flip anywhere', 'kitHand enlarged card + ONE «Chọn» (§101.10, kitHandBigPlace, jkhand)'],
 [/\bclass="st"|\.st\s*(?:small|span|\{)|\.st>(?:small|span)|\.stats\s*[{.>]/, 'top-bar stat cell .st / .stats', 'kitStatCell / kitStatRow (jk4)'],
 [/\bk3tcv\b|#k3ts\b|\.k3ts\b/, 'top-bar Tư chất cell .k3tcv / #k3ts', 'kitStatCell (jk4)'],
 [/\bktiles?\b/, 'stat tile .ktile / .ktiles', 'kitStatCell {cls:"kst-tile"} in .kstgrid (kitTiles)'],
 [/\bkpq\b|\bkpu\b/, 'person-card info chip .kpq', 'kitStatCell {cls:"kst-chip"}'],
 [/\.kcchips?\b|class="kcchips?\b|className="kcchips?\b|\.kcbox\b|class="kcbox"/, 'old header court chips .kcchips', 'stage court plaques .k3c (jk3 k3court)'],
 [/\bkartf\b/, 'old act-art frame .kartf', 'kitSceneArt / kitArtFrame'],
];
const blank=m=>m.replace(/[^\n]/g,'');const strip=s=>s.replace(/\/\*[\s\S]*?\*\//g,blank).replace(/<!--[\s\S]*?-->/g,blank);
let bad=0;
for(const f of files){const p=path.join(B,f);if(!fs.existsSync(p))continue;const src=strip(fs.readFileSync(p,'utf8'));const lines=src.split('\n');
 for(const [rx,what,use] of RETIRED)lines.forEach((l,i)=>{const m=l.match(rx);if(m){bad++;console.log(`FAIL ${f}:${i+1} "${m[0]}" — ${what} is retired; use ${use}`)}})}
// the top bar must hold exactly the 8 kit cells, all in kitStatCell form
const p1=fs.readFileSync(path.join(B,'p1.html'),'utf8');const cells=(p1.match(/<div class="kst" id="hud-/g)||[]).length;
if(cells!==8){bad++;console.log(`FAIL p1.html: top bar has ${cells} kitStatCell cells (want 8)`)}
console.log(bad?`kit_dupes: ${bad} problem(s)`:'kit_dupes: OK (no retired private variants)');process.exit(bad?1:0);
