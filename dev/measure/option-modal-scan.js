/* review/kit-option-rows scan (s34): every option modal the game pushes (endTurn x N) + extra builders, per device.
   Flags: NARROW (2/3 options laid out in columns narrower than MINW px), CLIP (a card/row/word cut: scrollHeight>clientHeight or a child
   sticking out), EMPTY (an empty .kr row / empty .ef), LIT ("thành:" / "hỏng:" / "tốn:" / "kèm:" printed literally), NOTHING ("không được không mất"
   style line shown), DOWN (downside-looking text under ĐƯỢC).
   usage: node dev/measure/option-modal-scan.js [device] [turns] [outjson]   (device: fold|ipadAir|ipadPro|pixel|iphone14, default ipadAir; run from repo root; needs a built site) */
const {chromium}=require('playwright');const D=require('../test/lib/device');
const dev=process.argv[2]||'ipadAir',N=+process.argv[3]||120,OUT=process.argv[4];const MINW=190;
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 const g=await D.openHost(p,srv.url);
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<40;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;$("modal").hidden=true});
 await g.addStyleTag({content:'#kroul,#kroulw,.kmov{display:none!important}'});
 const seen={};const rows=[];
 const probe=()=>g.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const op=M.querySelector('.opts');if(!op)return null;
  const bs=[...op.querySelectorAll(':scope > button')];if(bs.length<2)return null;
  const title=(M.querySelector('h3,h2,.kpt,.ktitle')||{}).textContent||'';const key=title.replace(/\s+/g,' ').trim().slice(0,50)+'|'+bs.length+'|'+bs.map(x=>(x.textContent||'').slice(0,12)).join('/');
  const cs=bs.map(b=>{const r=b.getBoundingClientRect();let clip=b.scrollHeight>b.clientHeight+1||b.scrollWidth>b.clientWidth+1;const br=r;
   [...b.querySelectorAll('.krv,.ef,.kat,.kan')].forEach(c=>{const cr=c.getBoundingClientRect();if(cr.height>0&&(cr.right>br.right+1.5||cr.bottom>br.bottom+1.5||cr.left<br.left-1.5))clip=true;if(c.scrollWidth>c.clientWidth+1&&getComputedStyle(c).overflow!=='visible')clip=true});
   const txt=b.textContent.replace(/\s+/g,' ');const empty=[...b.querySelectorAll('.kr')].some(k=>!(k.querySelector('.krv')||{textContent:''}).textContent.trim())||[...b.querySelectorAll('.ef')].some(k=>!k.textContent.trim());
   const lit=/(^|[\s·])(thành|hỏng|tốn|kèm|mất|được)\s*:/i.test(txt);const nothing=/không được không mất|không mất không được/i.test(txt);
   const tx=b.querySelector('.kb,.kat');const tw=tx?Math.round(tx.getBoundingClientRect().width):Math.round(r.width);const wrapW=[...b.querySelectorAll('.krv')].reduce((m,c)=>Math.min(m,Math.round(c.getBoundingClientRect().width)),999);return{w:Math.round(r.width),tw,wrapW:wrapW===999?0:wrapW,h:Math.round(r.height),clip,empty,lit,nothing,t:txt.slice(0,90)}});
  const grid=getComputedStyle(op).gridTemplateColumns;const cols=new Set(bs.map(b=>Math.round(b.getBoundingClientRect().left))).size;
  const ow=Math.round(op.getBoundingClientRect().width);const dlg=M.querySelector('.dlg');const dr=dlg?dlg.getBoundingClientRect():{width:0,height:0};
  return{key,title:title.trim().slice(0,40),n:bs.length,cols,ow,dlgW:Math.round(dr.width),cs,vw:innerWidth,vh:innerHeight}});
 const record=async(tag)=>{const r=await probe();if(!r)return;if(seen[r.key])return;seen[r.key]=1;r.tag=tag;
  const narrow=r.n<=3&&r.cs.some(c=>(c.wrapW&&c.wrapW<140)||c.tw<170);r.flags=[];if(narrow)r.flags.push('NARROW');if(r.cs.some(c=>c.clip))r.flags.push('CLIP');if(r.cs.some(c=>c.empty))r.flags.push('EMPTY');if(r.cs.some(c=>c.lit))r.flags.push('LIT');if(r.cs.some(c=>c.nothing))r.flags.push('NOTHING');rows.push(r)};
 for(let i=0;i<N;i++){const alive=await g.evaluate(()=>{try{if(!S||S.dead){start()}Q.length=0;endTurn();}catch(e){return 'err '+e.message.slice(0,60)}return 'ok'});
  for(let k=0;k<6;k++){await p.waitForTimeout(120);await record('turn'+i);const more=await g.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return 0;const q=typeof Q!=='undefined'&&Q.length;M.hidden=true;return q?1:0});if(!more)break;await g.evaluate(()=>{try{showModal()}catch(e){}})}
  await g.evaluate(()=>{try{document.getElementById('modal').hidden=true}catch(e){}})}
 const bad=rows.filter(r=>r.flags.length);
 console.log(`${dev}: ${rows.length} option modals seen, ${bad.length} flagged, page errors ${errs.length}`);
 for(const r of rows)console.log((r.flags.length?r.flags.join(','):'ok').padEnd(18),`n=${r.n} cols=${r.cols} optsW=${r.ow} cardW=${r.cs.map(c=>c.w+'(txt'+c.tw+'/val'+c.wrapW+')').join('/')}`,'|',r.title,'|',r.cs.filter(c=>c.clip||c.lit||c.nothing||c.empty).map(c=>c.t.slice(0,60)).join(' // '));
 if(OUT)require('fs').writeFileSync(OUT,JSON.stringify(rows,null,1));
 await b.close();srv.close();process.exit(0)})();
