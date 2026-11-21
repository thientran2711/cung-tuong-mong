/* coop-name-clash law-11 scan (static): every place in dev/build/j*.js that CREATES or RENAMES a person, and which co-op rule keeps
   her full name unique over BOTH seats (owner law 6b). usage: node dev/test/coop-name-scan.js [--list]
   Rules (jname/jnamefix/jcoopworld, review/coop-name-clash):
     REG   nmNew/freshName — the host registers in S.nmReg (a WORLD key now): the guest's own new names avoid every name the host ever gave;
           a same-week clash is settled by the host sweep (her person holds, a world / host person gives way; behind the host player: ORDER)
     BIRTH a new life (first character / rebirth, either seat) — jcoopworld attach → nmBirth renames the draft against the room before it is sent
     SWEEP a name written as-is (copy of an existing person / fixed story name) — the host sweep (load / start / month / join) sees both
           players' people (nmFrPeople) and renames the world/host side, or orders her seat
     KEEP  not a person name (faction labels, display copies, cards) — no rule needed
   Exit 1 when a site is UNCLASSIFIED (a new kind of name write: add it to the table below). */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'../build');
const files=fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');
const SITES=[];for(const f of files){const L=fs.readFileSync(path.join(D,f),'utf8').split('\n');L.forEach((l,i)=>{
 if(/\bnmNew\(|\bfreshName\(\)/.test(l)&&!/^\s*\/\*/.test(l)&&!/function (nmNew|freshName)\b/.test(l))SITES.push({f,l:i+1,k:'new',t:l});
 else if(/\.name\s*=[^=>]/.test(l))SITES.push({f,l:i+1,k:'set',t:l})})}
/* classification of the plain ".name =" writes (file:pattern -> rule) */
const SET=[[/^j10\.js$/,/f\.name=/,'KEEP','faction label'],[/^j25\.js$/,/Tiểu|taken/,'SWEEP','eunuch Tiểu→Lão (same person) / mkServ dedupe'],
 [/^j59\.js$/,/pn/,'SWEEP','court post card = the post holder (copy)'],[/^j95\.js$/,/p\.name=/,'KEEP','place card shows the post holder (copy)'],
 [/^jagmaid\.js$/,/amName/,'REG','promoted maid as consort: amName checks the registry (host agent)'],
 [/^jcoopthinb\.js$/,/./,'BIRTH','level>=2 room: host builds her life (checkNames name + maid; LIVE default is level 0 → attach/nmBirth)'],
 [/^jcoopthinc\.js$/,/nameTaken/,'REG','level>=3 guest add: newRival name when taken'],[/^jhc\.js$/,/nmReg/,'REG','registered rename'],
 [/^jht\.js$/,/nPick/,'SWEEP','marriage pool given-name fix (her pool is in nmPers)'],[/^jkc\.js$/,/hd\.name|m\.name/,'SWEEP','home family / sister enters as consort (same person)'],
 [/^jkc2\.js$/,/Xuân Đào/,'SWEEP','fixed story person Xuân Đào (one per world; others renamed)'],[/^jname(fix)?\.js$/,/./,'KEEP','the name core itself'],
 [/^jroad\.js$/,/P\.name=/,'KEEP','road card shows an existing person (copy)'],[/^jslots\.js$/,/o\.name=/,'KEEP','save-slot label']];
const out=[];let un=0;
for(const s of SITES){let r,why;if(s.k==='new'){r=/jcoopworld|attach/.test(s.f)?'BIRTH':'REG';why='nmNew / freshName'}
 else{const m=SET.find(([fr,lr])=>fr.test(s.f)&&lr.test(s.t));if(m){r=m[2];why=m[3]}else{r='UNCLASSIFIED';why=s.t.trim().slice(0,120);un++}}out.push([s.f+':'+s.l,s.k,r,why])}
const by={};for(const o of out)by[o[2]]=(by[o[2]]||0)+1;
if(process.argv.includes('--list'))for(const o of out)console.log(o.join(' | '));
/* the co-op paths a person is made / renamed on while a friend is in the room, and the rule that covers each (checked in code) */
const B=f=>fs.readFileSync(path.join(D,f),'utf8');const cw=B('jcoopworld.js'),jn=B('jname.js'),jf=B('jnamefix.js');
const PATHS=[['join / rebirth: host places her (onState)','nmFix("join")',/placeFriend\(C\.P\[fs\(\)\]\);try\{if\(host\(\)&&typeof nmFix==="function"\)nmFix\("join"\)/.test(cw)],
 ['new life (first / rebirth) on either seat: draft vs the room','attach → nmBirth',/S=keep;try\{if\(typeof nmBirth==="function"\)nmBirth\(C\)/.test(cw)],
 ['her coop STAFF entry (cung-nữ player) is hers, not a world person','nmPeople guest',/if\(s&&s\.coop\)add\(s,"f",null,\{guest:1/.test(jn)],
 ['her own people (maid, servants, kids, home family, pools) in the host list','nmFrPeople',/function nmFrPeople/.test(jn)&&/nmFrPeople\(add\)/.test(jn)],
 ['her person behind the host player: host ORDER, her seat applies','nmOrder / nmOrdApply',/function nmOrder/.test(jf)&&/nmOrdApply\(why\)/.test(jf)],
 ['guest new names (reg:false) avoid every host name ever given','nmReg world key',/"dnames","nmReg","nmOrd"\]/.test(cw)&&/HOST_ONLY=\[[^\]]*"nmReg","nmOrd"/.test(cw)],
 ['new world person (consort / servant / man / promoted maid) on the host','nmNew registers (REG) + host sweep',true]];
console.log('coop-name-scan: '+out.length+' name sites in '+files.length+' files → '+Object.entries(by).map(([k,v])=>k+' '+v).join(', '));
for(const [p,r,ok] of PATHS)console.log((ok?'COVERED ':'OPEN    ')+p+' — '+r);
const open=PATHS.filter(p=>!p[2]).length;console.log('open paths '+open+', unclassified sites '+un);process.exit(open||un?1:0);
