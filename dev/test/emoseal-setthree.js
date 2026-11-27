/* C3-SEALS unit check: every painted seal set (th- + every KIT_EMOSEAL.roleSet / setExtra value) has a setThree["<p>act-"] entry = the th-act- spec,
   so kesPartsUrl() finds the 3-part timing (out/back/c0/c1) of a non-Thái-hậu set. usage: node dev/test/emoseal-setthree.js   (exit 1 on a miss) */
const fs=require('fs'),path=require('path'),vm=require('vm');
const src=fs.readFileSync(path.join(__dirname,'../build/jemoseal.js'),'utf8');
const a=src.indexOf('window.KIT_EMOSEAL=');const m=/\(function\(\)\{const E=KIT_EMOSEAL,T=E\.three=E\.three\|\|\{\};for\(const pre in E\.setThree[^\n]*\n/.exec(src);
if(a<0||!m){console.log('FAIL cannot find KIT_EMOSEAL literal / expander');process.exit(1)}
const code=src.slice(a,m.index+m[0].length);const ctx={};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(code,ctx);
const E=ctx.KIT_EMOSEAL,miss=[],ps=new Set(['th-']);for(const o of [E.roleSet,E.setExtra])for(const k in o)ps.add(o[k]);
for(const p of ps){const ks=(E.setThree[p+'act-']||{}).ks;if(!ks||ks.length!==21)miss.push(p+'act- (setThree)');
 for(const k of ['gian','vui','tutin']){const t=E.three[p+'act-'+k];if(!t||t.out!==4||t.back!==3)miss.push(p+'act-'+k+' (three)')}}
console.log('prefixes',[...ps].join(' '),'| missing',miss.length?miss.join(', '):'none');process.exit(miss.length?1:0);
