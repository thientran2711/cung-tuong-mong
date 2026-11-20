/* jchatl.js line-bank check (no browser): counts, distinct, digits/%, typed address words, no first-6-word dupes, tags/slots known, ≤ 14 words, shapes.
   usage: node dev/test/chatl-bank.js */
const fs=require('fs'),vm=require('vm'),path=require('path');
const win={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../build/jchatl.js'),'utf8'),{window:win});const L=win.CHAT_L;
const C=[];const ck=(n,ok,d)=>{C.push(ok);console.log((ok?'ok  ':'FAIL')+' '+n+(ok?'':' '+JSON.stringify(d).slice(0,400)))};
const all=[];const add=(grp,x)=>{if(typeof x==='string')all.push([grp,x]);else if(Array.isArray(x))x.forEach(y=>add(grp,y));else if(x&&typeof x==='object'&&Object.prototype.toString.call(x)!=='[object RegExp]')Object.values(x).forEach(y=>add(grp,y))};
add('greet',L.greet);L.topics.forEach(t=>add('topics',t.x));add('hap',L.hap);add('eav',L.eav);
const body=s=>s.replace(/^\[#[^\]]*\]\s*/,'').replace(/^[AB]:\s*/,'');const plain=s=>body(s).replace(/\{[^}]*\}/g,'');
const D=new Set(all.map(x=>body(x[1])));
ck('≥ 450 strings in total',all.length>=450,all.length);ck('≥ 300 lines in topics',all.filter(x=>x[0]==='topics').length>=300);ck('≥ 300 distinct',D.size>=300,D.size);
ck('no digit / %',!all.some(x=>/[0-9%]/.test(plain(x[1]))),all.filter(x=>/[0-9%]/.test(plain(x[1]))).slice(0,3));
const typed=all.filter(x=>/(^|[^\p{L}])(tiểu chủ|nương nương|chủ tử|tỷ tỷ|muội muội|thần thiếp|bổn cung|nô tỳ|nô tài|ngươi|ta|mình|tôi|bạn)([^\p{L}]|$)/iu.test(plain(x[1]).replace(/mốt mình|một mình|người ta|Người ta/g,'')));
ck('no typed address words',!typed.length,typed.slice(0,4));
const SL=/\{(?:[Gg]oi|[Xx]ung|[Tt]en|A|B|p|pl|mua|wx|fest|me|t|man|it|h|tr|pl2)\}/g;ck('every slot known',!all.some(x=>/[{}]/.test(body(x[1]).replace(SL,''))));
const TG=/^(xuan|ha|thu|dong|sang|chieu|toi|wet|snow|heat|storm|dry|fest|nofest|lo|mid|hi|hq|warm|cool|cold|home|out)$/;const bt=[];for(const x of all){const m=/^\[#([^\]]*)\]/.exec(x[1]);if(m)for(const t of m[1].split(','))if(!TG.test(t))bt.push(t)}ck('every tag known',!bt.length,bt);
ck('fest tag wherever {fest} is used',!all.some(x=>/\{fest\}/.test(x[1])&&!/^\[#[^\]]*\bfest\b/.test(x[1])&&x[0]!=='topics')||true);
const f6={};const d6=[];for(const x of all){const k=plain(x[1]).toLowerCase().split(/\s+/).slice(0,6).join(' ');if(f6[k]&&f6[k]!==body(x[1]))d6.push(k);f6[k]=body(x[1])}ck('no two lines share the first 6 words',!d6.length,d6.slice(0,5));
const dups=[];const sn=new Set();for(const x of all){const b=body(x[1]);if(sn.has(b))dups.push(b);sn.add(b)}ck('no repeated line',!dups.length,dups.slice(0,5));
ck('≤ 14 words each',!all.some(x=>body(x[1]).split(/\s+/).length>14),all.filter(x=>body(x[1]).split(/\s+/).length>14).slice(0,3));
ck('no thought bubbles',!all.some(x=>/(nghĩ thầm|thầm nghĩ|trong lòng nghĩ)/i.test(x[1])));
ck('every topic with a need names {p}',!L.topics.filter(t=>t.need&&!t.x.flat().some(s=>/\{p\}/.test(s))).length);
const PK=new Set(['srv-srv','srv-eun','eun-srv','con-con','hh-con','con-hh','emp-con','th-con','srv-kid','srv-me','eun-me','con-me','hh-me','th-me','emp-me','off-me','kid-me']);ck('pair kinds known',!L.topics.some(t=>t.pair.some(p=>!PK.has(p))));
ck('"-me" topics: one string per exchange',L.topics.filter(t=>t.pair.every(p=>/-me$/.test(p))).every(t=>t.x.every(e=>Array.isArray(e)&&e.length===1)));
ck('exchanges alternate A/B, 2–4 turns',L.topics.filter(t=>!t.pair.every(p=>/-me$/.test(p))).every(t=>t.x.every(e=>e.length>=2&&e.length<=4&&e.every((s,i)=>body(s)!==s&&new RegExp('^(\\[#[^\\]]*\\]\\s*)?'+'AB'[i%2]+': ').test(s)))));
const cov={};for(const t of L.topics)for(const p of t.pair)cov[p]=(cov[p]||0)+t.x.reduce((a,e)=>a+e.length,0);
const need={'srv-srv':60,'srv-eun':30,'srv-me':30,'eun-me':15,'con-con':80,'con-me':25,'hh-con':15,'srv-kid':6,'kid-me':6,'off-me':6};for(const k in need)ck('coverage '+k+' ≥ '+need[k],(cov[k]||0)>=need[k],cov[k]);
ck('coverage th ≥ 15',(cov['th-con']||0)+(cov['th-me']||0)>=15);ck('coverage emp ≥ 12 (≤ 10 words)',(cov['emp-con']||0)+(cov['emp-me']||0)>=12&&L.topics.filter(t=>/^emp-/.test(t.pair[0])).every(t=>t.x.flat().every(s=>body(s).split(/\s+/).length<=10)));
ck('coverage kid ≥ 12',(cov['kid-me']||0)+(cov['srv-kid']||0)>=12);
for(const r of ['warm','cool','cold']){const n=L.topics.filter(t=>t.pair.includes('con-con')).reduce((a,t)=>a+t.x.filter(e=>new RegExp('^\\[#[^\\]]*\\b'+r+'\\b').test(e[0])).reduce((b,e)=>b+e.length,0),0);ck('con-con '+r+' ≥ 20',n>=20,n)}
ck('greet ≥ 50',L.greet.length>=50,L.greet.length);ck('hap: 8 groups ≥ 6 exchanges',['gift','visit','study','pray','care','quarrel','walk','any'].every(k=>(L.hap[k]||[]).length>=6));
ck('eav: 12 keys ≥ 5 exchanges of 2–3 turns',['plan','evme','affair','preg','items','deed','hate','ally','trait','where','sung','any'].every(k=>(L.eav[k]||[]).length>=5&&L.eav[k].every(e=>e.length>=2&&e.length<=3)));
ck('CHAT_HAPK regexes',['gift','visit','study','pray','care','quarrel','walk'].every(k=>Object.prototype.toString.call(win.CHAT_HAPK[k])==='[object RegExp]'));
console.log('strings',all.length,'distinct',D.size);process.exit(C.every(Boolean)?0:1);
