/* save-growth (d): the j6 slot codec on its own (pure node, no browser). Takes slotEnc/slotDec out of dev/build/j6.js (the ONE copy),
   fuzzes them (ASCII, Vietnamese, random UTF-16 incl. lone surrogates, long runs, empty), checks every packed char is a safe
   localStorage char (U+0020..U+801F: no control char, no surrogate) and that plain JSON passes through slotDec unchanged.
   usage: node dev/test/savegrow-codec.js [save.json …]   (each file: size before / after, enc / dec ms, round trip)   exit 1 on a fail */
const fs=require('fs'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'../build/j6.js'),'utf8');const a=src.indexOf('const SLOTZ='),b=src.indexOf('function slotGet(');
if(a<0||b<0){console.log('FAIL codec not found in j6.js');process.exit(1)}
const {slotEnc,slotDec}=new Function(src.slice(a,b)+';return {slotEnc,slotDec}')();
let bad=0;const ok=(c,m)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m)};
const safe=z=>{for(let i=4;i<z.length;i++){const c=z.charCodeAt(i);if(c<32||c>0x801F)return false}return z.slice(0,4)==='CTMZ'};
let seed=5;const rnd=()=>{seed=(seed*1103515245+12345)>>>0;return seed/4294967296};
const AL=['ab','{"k":"lxson0","u":6,"tên":"Thẩm Lữ Sương","năm":14}',null];let fails=0,unsafe=0;
for(let k=0;k<600;k++){const n=Math.floor(rnd()*(k%10===0?70000:3000));const al=AL[k%3];let s='';
 for(let i=0;i<n;i++)s+=al?al[Math.floor(rnd()*al.length)]:String.fromCharCode(Math.floor(rnd()*65536));
 const z=slotEnc(s);if(!safe(z))unsafe++;if(slotDec(z)!==s)fails++}
for(const s of ['','a','aaaa','x'.repeat(100000),'😀','\uD800','￿\u0000\u001f','CTMZ is a prefix only when packed']){const z=slotEnc(s);if(slotDec(z)!==s||!safe(z))fails++}
ok(!fails,`fuzz round trip (608 strings) fails=${fails}`);ok(!unsafe,`every packed char is a safe localStorage char, unsafe=${unsafe}`);
ok(slotDec('{"v":6,"S":{}}')==='{"v":6,"S":{}}'&&slotDec(null)===null,'plain JSON (an old sổ) and null pass through slotDec unchanged');
let thrown=false;try{slotDec(slotEnc('{"v":6,"S":{"name":"x"}}').slice(0,8))}catch(e){thrown=true}ok(thrown,'a cut-off packed sổ throws (slotGet → null, like a broken JSON sổ today)');
console.log('\n| file | plain chars | packed chars | × smaller | enc ms | dec ms | same |');console.log('|---|---|---|---|---|---|---|');
for(const f of process.argv.slice(2)){const s=fs.readFileSync(f,'utf8');let t=Date.now();const z=slotEnc(s);const te=Date.now()-t;t=Date.now();const d=slotDec(z);const td=Date.now()-t;
 ok(d===s&&safe(z),`${path.basename(f)} round trip`);console.log(`| ${path.basename(f)} | ${s.length.toLocaleString('en')} | ${z.length.toLocaleString('en')} | ${(s.length/z.length).toFixed(1)} | ${te} | ${td} | ${d===s} |`)}
console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0);
