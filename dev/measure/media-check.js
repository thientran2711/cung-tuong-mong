/* BUILD CHECK (KIT §0, design-scale phase 3; run by dev/site/build_site.sh): inside the design canvas the only layout switch is html.kv1 (one page
   590x820) / html.kv2 (spread 1180x820) — never a width/height/aspect/orientation query. Fails (exit 1) on any such CSS @media, matchMedia(...)
   or innerWidth/innerHeight compare (with a number or with each other: orientation) in dev/build/p1.html + j*.js. Allowed: prefers-reduced-motion, hover, pointer, display-mode, print.
   usage: node dev/measure/media-check.js */
const fs=require('fs'),path=require('path');const B=path.join(__dirname,'../build');
const files=['p1.html',...fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&!/^all/.test(f))];const SIZE=/width|height|aspect-ratio|orientation/i;const bad=[];
for(const f of files){const src=fs.readFileSync(path.join(B,f),'utf8').replace(/\/\*[\s\S]*?\*\//g,m=>m.replace(/[^\n]/g,' '));/* comments blanked, lines kept */
 src.split('\n').forEach((l,i)=>{for(const m of l.matchAll(/@media\s*([^{]*)\{/g))if(SIZE.test(m[1]))bad.push(`${f}:${i+1} @media ${m[1].trim()}`);
  for(const m of l.matchAll(/matchMedia\(\s*["'`]([^"'`]+)["'`]/g))if(SIZE.test(m[1]))bad.push(`${f}:${i+1} matchMedia(${m[1]})`);
  for(const m of l.matchAll(/inner(Width|Height)\s*(<=|>=|<|>)\s*[\d(]|inner(Width|Height)\s*(<=|>=|<|>|\/)\s*inner(Width|Height)/g))bad.push(`${f}:${i+1} ${m[0]}`)})}
if(bad.length){console.error(`media-check: ${bad.length} width/orientation breakpoint(s) inside the design canvas — use html.kv1 / html.kv2 or kitView().pages (KIT §0):\n `+bad.join('\n '));process.exit(1)}
console.log(`media-check: 0 width/orientation breakpoints in ${files.length} files (KIT §0)`);
