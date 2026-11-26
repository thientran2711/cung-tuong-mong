/* SELSCENE-14 (RV-SELX13 2/3/4, law 2/3/6b, LUẬT SỬA CẢ NHÓM): every drama stance of every seed (SELX_SEEDS yard / dorm / kept) + her victim stances
   (BAL.selx.vst): which sides really move something. A side is LIVE when its target exists: friend/grudge.<role> needs that role cast (bystander = the
   bystanders, ma = the ma ma, eunuch = a court eunuch since SELSCENE-14), duc / face / fav always, time = khắc (before SELSCENE-14 a dorm / kept stance's
   khắc were read by nothing and the yard took a fixed drama.k). A stance whose every gain is dead = cost-only (law 3 FAIL).
   usage: node dev/measure/selx-stance-scan.js [--before]   (--before = the rules of 4510854c: eunuch never cast, time dead in every drama) */
const fs=require('fs'),path=require('path'),vm=require('vm');const B=process.argv.includes('--before');
const src=fs.readFileSync(path.join(__dirname,'../build/jselxd.js'),'utf8');const ctx={};vm.runInNewContext(src+';this.SELX_SEEDS=SELX_SEEDS',ctx);
const bal=fs.readFileSync(path.join(__dirname,'../build/jbal2.js'),'utf8');const vst=JSON.parse(bal.match(/vst:(\{benh:.*?\}\}\})\}\}\);/)[1].replace(/(\w+):/g,'"$1":'));
const live=(key,seed,type)=>{const [a,r]=key.split('.');if(a==='time')return !B;if(a==='duc'||a==='face'||a==='fav')return true;
 if(a==='friend'||a==='grudge'){if(r==='ma')return true;if(r==='bystander')return !!(seed.roles&&seed.roles.bystanders&&(seed.roles.bystanders.max||0)>0);if(r==='eunuch')return !B&&!!(seed.roles&&seed.roles.eunuch);return !!(seed.roles&&seed.roles[r])}return false};
let rows=0,costOnly=[],deadSide=[];
for(const type of ['yard','dorm','kept'])for(const s of ctx.SELX_SEEDS[type]||[])for(const [k,st] of Object.entries(s.stances||{})){rows++;
 const g=Object.keys(st.gain||{}),l=Object.keys(st.loss||{});const gl=g.filter(x=>live(x,s,type)),ll=l.filter(x=>live(x,s,type));
 if(g.length&&!gl.length)costOnly.push(`${s.id}.${k} gain ${g.join('+')}`);[...g.filter(x=>!live(x,s,type)),...l.filter(x=>!live(x,s,type))].forEach(x=>deadSide.push(`${s.id}.${k} ${x}`))}
for(const [k,st] of Object.entries(vst)){rows++;const g=Object.keys(st.gain||{});const l=Object.keys(st.loss||{});const fake={roles:{bully:{},bystanders:{max:2}}};
 if(!g.some(x=>live(x,fake)))costOnly.push(`vst.${k}`);[...g,...l].filter(x=>!live(x,fake)).forEach(x=>deadSide.push(`vst.${k} ${x}`))}
console.log(`${B?'BEFORE (4510854c rules)':'AFTER (SELSCENE-14)'}: stances ${rows} · cost-only ${costOnly.length} · dead sides ${deadSide.length}`);
costOnly.forEach(x=>console.log('  cost-only',x));if(deadSide.length<=40)deadSide.forEach(x=>console.log('  dead',x));else console.log('  dead (first 40)\n  '+deadSide.slice(0,40).join('\n  '));
process.exitCode=costOnly.length||deadSide.length?1:0;
