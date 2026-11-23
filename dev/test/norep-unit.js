/* ORDER THIN P0 unit test: jnorep (shared cross-life no-repeat memory) vs the old ctm-e68h code. node dev/test/norep-unit.js */
const fs=require('fs'),vm=require('vm'),path=require('path');const B=path.join(__dirname,'../build/');
function ctx(store){const ls={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}};
 const c={localStorage:ls,window:{addEventListener(){}},BAL:{nr:{lives:6,w:.5,cap:1500}},Math,Date,JSON,S:null,console};
 vm.createContext(c);vm.runInContext(fs.readFileSync(B+'jnorep.js','utf8')+';this.api={nrSeen,nrSeenK,nrMark,nrMarkK,nrW,nrPick,nrDraw,nrFresh,nrNow,nrLife,nrStore}',c);return c}
let fail=0;const ok=(c,m)=>{if(!c){fail++;console.log('FAIL',m)}else console.log('ok  ',m)};
/* OLD reference (j68.js before P0, verbatim logic) */
function oldPast(store,key,pre){const H=JSON.parse(store['ctm-e68h']||'{}');const L=(H.L||[]).slice(1,6);let n=0;for(const l of L)if(l.some(k=>pre?k.indexOf(key+':')===0||k===key:k===key))n++;return n}
// 1. migration of an old store: 7 lives written by old code incl. j70/j71/j72 + scheduler keys
const old={cur:'lifeA',L:[['gossipTea:1','j72:craft3','p:e:x'],['gossipTea:0','visitAunt:2','j70:poison:r1'],['gossipTea:1'],['j71:f:tet:3','gossipTea:4'],[],['gossipTea:2']]};
const st={'ctm-e68h':JSON.stringify(old)};const c=ctx(st),A=c.api;
for(const [k,pre] of [['gossipTea',true],['gossipTea:1',false],['visitAunt',true],['nope',true],['gossipTea:4',false]])
 ok(A.nrSeen('j68',k,pre)===oldPast(st,k,pre),`j68 seen ${k} pre=${pre}: new ${A.nrSeen('j68',k,pre)} = old ${oldPast(st,k,pre)}`);
for(const k of ['j70:poison:r1','j71:f:tet:3','j72:craft3'])ok(A.nrSeenK(k)===oldPast(st,k),`raw ${k} kept: ${A.nrSeenK(k)}`);
ok(JSON.parse(st['ctm-nr']).cur==='lifeA','current life id carried over');
ok(st['ctm-e68h']===JSON.stringify(old),'old ctm-e68h left untouched (rollback safe)');
// 2. old save mid-life adopts S.e68.lid -> no new life
c.S={e68:{lid:'lifeA'}};A.nrMark('j68','gossipTea:3');ok(JSON.parse(st['ctm-nr']).L.length===6&&JSON.parse(st['ctm-nr']).L[0].includes('j68:gossipTea:3'),'old save: same life, mark lands in life 0');
ok(A.nrNow('j68','gossipTea:3')&&A.nrSeen('j68','gossipTea:3')===0,'this-life mark is not a past life');
// 3. new life rotates, keeps 6 lives, weight x0.5 per life
c.S={};A.nrLife();const H=JSON.parse(st['ctm-nr']);ok(H.L.length===6&&H.L[0].length===0&&H.cur===c.S.nrl,'new life rotates (6 kept)');
ok(A.nrSeen('j68','gossipTea:3')===1&&A.nrW('j68','gossipTea',true)===Math.pow(.5,A.nrSeen('j68','gossipTea',true)),'weight = 0.5^seen');
// 4. pick avoids seen items statistically
c.S={};A.nrLife();for(let l=0;l<3;l++){c.S={};A.nrLife();A.nrMark('mg:hoa','a')}c.S={};A.nrLife();
let na=0;for(let i=0;i<4000;i++)if(A.nrPick('mg:hoa',['a','b'])==='a')na++;ok(na>250&&na<650,`pick weight: 'a' seen 3 lives drawn ${na}/4000 (expect ~444)`);
ok(A.nrFresh('mg:hoa',['a','b']).join()==='b','fresh filter');ok(A.nrDraw('j7',['s1'])==='s1'&&A.nrNow('j7','s1'),'draw marks');
// 5. empty store, no S
const st2={},c2=ctx(st2);ok(c2.api.nrSeen('j68','x')===0&&c2.api.nrLife()===null,'no store / no S: safe');
// 6. cap
c.S={};A.nrLife();for(let i=0;i<1600;i++)A.nrMarkK('t:'+i);ok(JSON.parse(st['ctm-nr']).L[0].length===1500,'cap per life');
console.log(fail?`NOREP UNIT: ${fail} FAIL`:'NOREP UNIT: ALL PASS');process.exit(fail?1:0)
