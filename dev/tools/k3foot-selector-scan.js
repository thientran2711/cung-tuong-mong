/* coop-e2e-prequel (law 11): KIT 56.21 (jksize kszFootUp, landed with kit-framefit 178cac37) moves a button-only figure dialog's footer
   buttons (#mr: «Tiếp theo», «Đã hiểu», ‹ Lui) into the info column's .k3foot. Players click them as before (#modal delegates clicks, j6),
   but every test / robot selector that looked for them ONLY under #mr found nothing and stalled (coop-e2e «#next enabled» around the
   «Tiền truyện» prequel cards). This scan lists every such selector in dev/test, dev/measure, dev/tools; --fix adds the .k3foot twin.
   usage: node dev/tools/k3foot-selector-scan.js [--fix]   last line: K3FOOT-SELECTORS PASS/FAIL */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');const FIX=process.argv.includes('--fix');
const R=[ // [pattern, replacement] — selector strings that address the footer row's buttons only through #mr
 ["'#mr button:not([disabled])'","'#mr button:not([disabled]),.k3foot button:not([disabled])'"],
 ["'#modal #mr button'","'#modal #mr button,#modal .k3foot button'"],
 ["'#modal #mr .kbtn'","'#modal #mr .kbtn,#modal .k3foot .kbtn'"],
 ["'#mr .kbtn'","'#mr .kbtn,.k3foot .kbtn'"],
 ["'.kit-x, #mr button'","'.kit-x, #mr button, .k3foot button'"],
 ["'#mr button:not([hidden]), .opts .opt'","'#mr button:not([hidden]), .k3foot button:not([hidden]), .opts .opt'"],
 ["#mr button,.k3btns button","#mr button,.k3foot button,.k3btns button"],
 ["#modal #mr .kbtn, #modal .kph button","#modal #mr .kbtn, #modal .k3foot .kbtn, #modal .kph button"]];
const files=[];for(const d of ['dev/test','dev/measure','dev/tools'])(function walk(p){for(const f of fs.readdirSync(p,{withFileTypes:true})){const q=path.join(p,f.name);if(f.isDirectory())walk(q);else if(/\.(js|mjs)$/.test(f.name)&&!/k3foot-selector-scan/.test(f.name))files.push(q)}})(path.join(ROOT,d));
let open=0,fixed=0;const rows=[];
for(const f of files){let s=fs.readFileSync(f,'utf8'),n0=0;for(const [a] of R){n0+=s.split(a).length-1}
 /* still open = a #mr selector with no .k3foot twin in the same string */
 if(n0&&FIX){for(const [a,b] of R)s=s.split(a).join(b);fs.writeFileSync(f,s);fixed+=n0}
 const left=(s.match(/['"`][^'"`\n]*#mr\b[^'"`\n]*['"`]/g)||[]).filter(x=>!/k3foot/.test(x)&&!/data-tgo|:scope ?> ?#mr|#mr button,\.kbtn/.test(x));
 if(n0||left.length)rows.push(`| ${path.relative(ROOT,f)} | ${n0} | ${left.length} |`);open+=FIX?0:n0;open+=left.length}
console.log('| file | #mr-only selectors (fixable) | other #mr-only |\n|---|---|---|\n'+rows.join('\n'));
console.log(`K3FOOT-SELECTORS ${open?'FAIL':'PASS'} · ${files.length} files · ${FIX?fixed+' fixed · ':''}${open} #mr-only selectors left (title-page [data-tgo] / ':scope>#mr' / '#mr button,.kbtn' are not figure footers: exempt)`);process.exit(open?1:0);
