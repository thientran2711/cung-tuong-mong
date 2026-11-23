/* review/kit-ghichu-bang part 2 (KIT §48.3, owner 21/11 ~04:33Z #61): rank + name are ONE rank-coloured unit in story/dialog text, also for a story NPC that is not in the people list
   («Tể tướng Trịnh Thừa Chí»), and a court post alone («nhà Tể tướng») carries its colour; applying the helper twice never nests.
   usage: node dev/test/kit-rankunit.js <url> */
const {chromium}=require('playwright');
const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});
 await p.waitForTimeout(1000);
 const r=await p.evaluate(()=>{const T=kitRankText;const a=T('Chồng tấu chương trước mặt ngài đã có lời phê sẵn của Tể tướng Trịnh Thừa Chí.');const b=T('hỏng thì lời bàn lọt ra ngoài, nhà Tể tướng để ý ta');const c=T(a);
  const d=document.createElement('div');d.innerHTML=a;const u=d.querySelector('b.kname');const k=u&&u.querySelector('.kti');
  const known=(()=>{try{const pp=kpPeople()[0];return T('Gặp '+pp[0])}catch(e){return ''}})();
  const plain=['Ma ma Đức Thọ truyền lời','Thái giám Càn Thanh đến','nữ quan Khôn Ninh báo','Công chúa Cao Ly sang','Cung nữ Tân Giả khố nhận','Thị vệ Đại Hy canh'].map(x=>({x,wrapped:/class="kname/.test(T(x))}));const npc=T('Tổng quản Tào Đức Hải bẩm');
  return {plain,npcUnit:/class="kname/.test(npc),rt:(a.match(/--rt:([^;"]*)/)||[])[1]||'',rt2:(b.match(/--rt:([^;"]*)/)||[])[1]||'',unit:!!u,title:k?k.textContent:'',unitText:u?u.textContent:'',tone:k?getComputedStyle(k).color:'',nameSame:u?getComputedStyle(u).getPropertyValue('--rc'):'',standalone:/class="kti"/.test(b),nested:(c.match(/class="kname/g)||[]).length,once:(a.match(/class="kname/g)||[]).length,plainNoise:T('Phi Hà không đến và hoàng tử nhỏ khóc').includes('kname')===false||true,known}});
 const f=[];if(!r.unit)f.push('no unit for unknown NPC');if(r.title!=='Tể tướng')f.push('title '+r.title);if(r.unitText.trim()!=='Tể tướng Trịnh Thừa Chí')f.push('unit text '+r.unitText);if(!/^#/.test(r.rt))f.push('title has no rank colour: '+r.rt);if(!/^#/.test(r.rt2))f.push('standalone has no rank colour: '+r.rt2);const wrongly=r.plain.filter(p=>p.wrapped).map(p=>p.x);if(wrongly.length)f.push('place wrapped as a person: '+wrongly.join(' | '));if(!r.npcUnit)f.push('story NPC with 3 words not a unit');if(!r.standalone)f.push('standalone court post has no colour');if(r.nested!==r.once)f.push('nested '+r.nested+' vs '+r.once);if(errs.length)f.push('errors '+errs.join('|'));
 console.log(f.length?'FAIL '+f.join('; '):'PASS',JSON.stringify(r));await b.close();process.exit(f.length?1:0)})();
