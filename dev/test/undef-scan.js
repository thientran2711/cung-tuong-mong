/* undef-scan (coop-ptime-reds, law 11 scan for the "sv is not defined" family): every identifier used where no declaration is visible
   in the assembled game (dev/build/all.js = one classic script: top-level declarations are globals). ESLint no-undef with browser globals,
   then names that are assigned on window / used only under typeof / inside try are dropped. Exit 1 when an unguarded one is left.
   usage: python3 dev/build/assemble.py && node dev/test/undef-scan.js   (needs network once for npx eslint@9 + globals; work dir = a temp dir) */
const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');
const ALL=path.resolve(__dirname,'../build/all.js');const T=fs.mkdtempSync(path.join(os.tmpdir(),'undef-'));
fs.writeFileSync(path.join(T,'package.json'),'{"private":true}');cp.execSync('npm i --no-audit --no-fund --silent eslint@9 globals',{cwd:T,stdio:'ignore'});
fs.writeFileSync(path.join(T,'eslint.config.mjs'),'import g from "globals";export default [{files:["**/*.js"],languageOptions:{ecmaVersion:2024,sourceType:"script",globals:{...g.browser}},rules:{"no-undef":"error"}}];');
fs.copyFileSync(ALL,path.join(T,'all.js'));let out='';try{out=cp.execSync('npx eslint --no-warn-ignored -f json all.js',{cwd:T,maxBuffer:1<<28,env:Object.assign({},process.env,{NODE_OPTIONS:'--max-old-space-size=8000'})}).toString()}catch(e){out=e.stdout.toString()}
const src=fs.readFileSync(ALL,'utf8'),L=src.split('\n');const by={};for(const x of JSON.parse(out)[0].messages){const n=(x.message.match(/'([^']+)'/)||[])[1];(by[n]=by[n]||[]).push(x)}
const left=[];for(const n in by){const e=n.replace(/[$]/g,'\\$');if(new RegExp('(window|globalThis|self)\\.'+e+'\\s*=|Object\\.assign\\(window,[^)]*\\b'+e+'\\b').test(src))continue;/* set on window at run time */
 const u=by[n].filter(x=>{const ln=L[x.line-1];return !new RegExp('typeof\\s+'+e+'\\b').test(ln)&&!new RegExp('window\\.'+e+'\\s*&&').test(ln)&&!/\btry\s*\{/.test(ln.slice(Math.max(0,x.column-160),x.column))});
 if(u.length)left.push([n,u.length,u.slice(0,2).map(x=>x.line+': '+L[x.line-1].slice(Math.max(0,x.column-70),x.column+30))])}
const KNOWN=new Set(['PIXI'/* loaded on demand (kitPixi().then) */,'PCOL','mkPart'/* j11 weather: the IIFE returns first unless typeof mkPart/PCOL */]);
const bad=left.filter(x=>!KNOWN.has(x[0]));for(const x of left)console.log((KNOWN.has(x[0])?'known ':'UNDEF ')+JSON.stringify(x).slice(0,400));
console.log(bad.length?`FAIL: ${bad.length} identifier(s) used with no visible declaration`:`PASS: no unguarded undefined identifier (${Object.keys(by).length} names checked)`);fs.rmSync(T,{recursive:true,force:true});process.exit(bad.length?1:0)
