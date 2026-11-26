/* FIRSTCARD-3 (owner OD 26/11 ~18:25Z): the odds word only on an option that really rolls (the TRUE word); a no-roll option has NO odds word; a choice with a
   life-changing option has ONE small line «Cẩn thận khi lựa chọn» above it. usage: WT=<site root> node odds-word-rule.js <outdir> */
const {open}=require('./lib.js');const fs=require('fs'),path=require('path');const OUT=process.argv[2]||'.';fs.mkdirSync(OUT,{recursive:true});let bad=0;
const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
(async()=>{for(const [dn,vp] of [["fold",{width:755,height:1000}],["ipad",{width:1180,height:820}]]){const {b,p}=await open(vp,{ctx:{deviceScaleFactor:1}});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 await p.evaluate(()=>{for(let i=0;i<900;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k==="bd")break}S.kcPick="cung";nlAccept();document.querySelectorAll('[id^="kroul"],.kroul,.kroul-ov').forEach(x=>x.remove())});
 const run=async(name,life)=>{await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});
  await p.evaluate(build,life);
  for(let t=0;t<6;t++){await p.waitForTimeout(600);const vis=await p.evaluate(()=>{for(let i=0;i<8;i++){const e=typeof dqActEl==='function'&&dqActEl();if(!e)break;e.remove()}document.querySelectorAll('.kmov,.kmrew,[id^="kroul"],.kroul-ov,#kprevov,.kroul').forEach(x=>x.remove());try{showModal()}catch(e){}const M=document.getElementById('modal');return !M.hidden&&M.querySelectorAll('button[data-m]').length>0});if(vis)break}
  for(let t=0;t<40;t++){const l=await p.evaluate(()=>/Sửa soạn nhập cung/.test(document.body.innerText));if(!l)break;await p.waitForTimeout(1000)}
  await p.evaluate(()=>{try{showModal()}catch(e){}});await p.waitForTimeout(1200);
  return p.evaluate(()=>{const M=document.getElementById('modal');const ops=M.querySelector('.opts');const w=[...M.querySelectorAll('.kwarnl,.kwarnline,.kwarn')];
   return{warn:w.map(x=>x.textContent.trim()),warnAbove:w.length?!!(w[0].compareDocumentPosition(ops)&Node.DOCUMENT_POSITION_FOLLOWING):null,
    opts:[...M.querySelectorAll('button[data-m]')].map(x=>({n:(x.querySelector('.kan')||x).textContent.trim().slice(0,40),odds:((x.querySelector('.kodds')||{}).textContent||'').trim()})),rows:[...M.querySelectorAll('button[data-m]')].map(x=>[!!x.querySelector('.kr-ton'),!!x.querySelector('.kr-duoc')].join('/')),word:BAL.odds.cut.map(c=>word(c)).join('|')}})};
 const build=(life)=>{const nop=()=>{};const o1=kitRiskOpt({n:"Dâng khúc đàn",fx:{},x:"",j67:"tốn: không",hint:"chơi một màn đàn",go:nop},BAL.odds.cut[1],"không lọt vào bốn người đứng đầu thì thôi",false);
  const opts=[o1,{n:"Vâng lời, chờ ngày khác",fx:{},x:"",j67:"tốn: không",go:nop}];if(life)opts.push({n:"Cắt tóc đi tu",fx:{},x:"",j67:"tốn: không",hint:"thoát khỏi mọi chuyện; nhưng kiếp này dừng",go:nop});
  Q.push({t:life?"Lễ ra mắt (mẫu)":"Việc nhỏ (mẫu)",h:"<p>Mẫu.</p>",pid:"kitpg-"+(life?"life":"safe"),opts});showModal()};
 let r=await run('life',true);console.log(dn,JSON.stringify(r));
 ok(r.opts[0].odds&&!/Rất vững/.test(r.opts[0].odds),dn+' rolling option shows its TRUE word ('+r.opts[0].odds+')');
 ok(r.opts.slice(1).every(o=>!o.odds),dn+' no-roll options show NO odds word');
 ok(r.warn.length===1&&r.warn[0].replace('!','')==='Cẩn thận khi lựa chọn'&&r.warnAbove,dn+' ONE warning line above the choice');
 await p.evaluate(()=>{document.querySelectorAll('*').forEach(e=>{if(e.children.length<40&&/Luân hồi xoay vần/.test(e.textContent||'')&&!e.contains(document.getElementById('modal'))&&e.offsetParent&&getComputedStyle(e).position!=='static'&&e.id!=='modal'){e.style.display='none'}})});await p.waitForTimeout(500);
 await p.screenshot({path:path.join(OUT,`after-${dn}-life.png`)});
 r=await run('safe',false);console.log(dn,JSON.stringify(r));
 ok(r.rows.every(x=>x==='true/true'),dn+' EVERY option shows Tốn + Được rows '+r.rows);
 ok(r.warn.length===0,dn+' a choice with no life-changing option has no warning line');
 ok(r.opts.slice(1).every(o=>!o.odds),dn+' safe option: no word');
 await p.screenshot({path:path.join(OUT,`after-${dn}-safe.png`)});
 ok(!p.errs.length,dn+' no page errors '+p.errs.slice(0,2));await b.close()}
 process.exit(bad?1:0)})();
