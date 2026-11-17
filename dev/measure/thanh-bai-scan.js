/* kit-thanh-bai scan (s34): (A) every act card the game deals (the whole deck in several game states, real cardH + kaNorm) and (B) every act/option source string
   in dev/build/j*.js ("tốn: … · thành: … · hỏng: … · kèm: …", through kaModelStr -> kaRows -> kaBody, forced to a roll act) are counted:
   one block (sure) / two blocks, empty THÀNH, empty BẠI, odd cases.
   Odd = Kèm that had no block label (placed by sign), a stat cost under thành of a roll act (paid only on success), a sure act that carries hỏng, "bại:" input alias.
   usage: node dev/measure/thanh-bai-scan.js [outjson]   (run from repo root; needs a built site) */
const fs=require('fs');const {chromium}=require('playwright');const D=require('../test/lib/device');
const P='dev/build/';const src=new Set();const OUT=process.argv[2];
for(const f of fs.readdirSync(P))if(/^j.*\.js$/.test(f)&&f!=='all.js'){const s=fs.readFileSync(P+f,'utf8');
 for(const m of s.matchAll(/`([^`]*(?:thành|hỏng|kèm|tốn):[^`]*)`|"([^"\n]*(?:thành|hỏng|kèm|tốn):[^"\n]*)"|'([^'\n]*(?:thành|hỏng|kèm|tốn):[^'\n]*)'/g)){
  let x=(m[1]||m[2]||m[3]).replace(/\$\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g,'5').replace(/\\n/g,' ').trim();if(x.length>6&&x.length<600)src.add(f+'\t'+x)}}
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await D.newDeviceContext(b,'ipadAir');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 const g=await D.openHost(p,srv.url);
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<40;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;$("modal").hidden=true});
 /* (A) real cards */
 const cards={};
 for(const st of [0,6,14,30,60]){
  for(let i=0;i<(st?Math.min(st,8):0);i++)await g.evaluate(()=>{try{if(!S||S.dead)start();Q.length=0;endTurn();Q.length=0;$("modal").hidden=true}catch(e){}});
  const L=await g.evaluate(()=>{const out=[];let box=document.getElementById('tbscan');if(!box){box=document.createElement('div');box.id='tbscan';document.body.appendChild(box)}
   try{(deck||[]).forEach((a,i)=>{box.innerHTML=cardH(a,i);kaNorm(box);const bt=box.querySelector('button');if(!bt)return;
    const one=!bt.querySelector('.kbh-b'),hasT=!!bt.querySelector('.kbh-t'),hasB=!!bt.querySelector('.kbh-b');const n=k=>bt.querySelectorAll('.kr.kb-'+k+':not(.kr-none)').length;
    out.push({name:a.n,odds:(a.o==null?100:a.o),dis:bt.disabled,one,hasT,hasB,nt:n('t'),nb:n('b'),emptyB:hasB&&!n('b'),emptyT:hasT&&!n('t'),ton:!!bt.querySelector('.kr-ton'),literal:/(^|[\s·])(thành|hỏng|bại|tốn|kèm)\s*:/i.test(bt.textContent),txt:bt.textContent.replace(/\s+/g,' ').slice(0,200)})})}catch(e){out.push({err:String(e.message)})}
   box.innerHTML='';return out});
  for(const c of L)cards[c.name+'|'+(c.odds<100)]=c}
 const C=Object.values(cards).filter(c=>!c.err);
 console.log('(A) deck act cards seen:',C.length,' page errors:',errs.length);
 const cnt=f=>C.filter(f).length;
 console.log('| class | count |\n|---|---|');
 console.log('| sure act: ONE block (THÀNH) |',cnt(c=>c.one),'|');console.log('| roll act: TWO blocks |',cnt(c=>!c.one),'|');
 console.log('| two blocks, BẠI empty |',cnt(c=>!c.one&&c.emptyB),'|');console.log('| two blocks, THÀNH empty |',cnt(c=>!c.one&&c.emptyT),'|');
 console.log('| literal "thành:/hỏng:/tốn:/kèm:" printed |',cnt(c=>c.literal),'|');console.log('| Tốn row present (paid either way, once) |',cnt(c=>c.ton),'|');
 console.log('| roll acts with odds field <100 but shown as ONE block |',cnt(c=>c.odds<100&&c.one),'|');
 for(const c of C.filter(c=>c.literal||(c.odds<100&&c.one)||(!c.one&&c.emptyT)).slice(0,8))console.log('   odd ·',c.name,'· odds',c.odds,'·',c.txt.slice(0,120));
 /* (B) source strings, forced to a roll act */
 const res=await g.evaluate(L=>L.map(e=>{const [f,x]=e.split('\t');const out={f,x:x.slice(0,140)};try{
   const M=kaModelStr(x);if(!M.odds)M.odds='Khá chắc';const R=kaRows(M);const t=document.createElement('template');t.innerHTML=kaBody(R);
   const rowsIn=b=>t.content.querySelectorAll('.kr.kb-'+b+':not(.kr-none)').length;
   out.nt=rowsIn('t');out.nb=rowsIn('b');out.emptyB=!out.nb;out.emptyT=!out.nt;out.hasHong=M.items.some(i=>i.l==='hỏng');
   out.kemFree=M.items.some(i=>i.l==='kèm'&&!i.b);out.statUnderThanh=R.mat.some(x=>x.b==='t'&&/^(Bạc|Sức|Sủng|Danh|Đức|Sắc|Tài|Tâm cơ|Tai mắt|Ân tình)\s*-/.test(x.h));out.raw=/\sbại:/.test(x);
  }catch(e){out.err=String(e.message).slice(0,80)}return out}),[...src]);
 const rows=res.filter(r=>!r.err&&(r.nt+r.nb>0));const K=f=>rows.filter(f).length;
 console.log('\n(B) source strings with a label:',res.length,' kit errors:',res.filter(r=>r.err).length,' (rows found:',rows.length,')');
 console.log('| class | count |\n|---|---|');
 console.log('| has hỏng:/bại: (BẠI block filled) |',K(r=>r.hasHong),'|');console.log('| no hỏng: -> BẠI empty once it rolls |',K(r=>!r.hasHong&&r.emptyB),'|');
 console.log('| THÀNH empty (only hỏng: written) |',K(r=>r.emptyT),'|');console.log('| odd: Kèm with no block label before it (placed by sign: bad -> BẠI) |',K(r=>r.kemFree),'|');
 console.log('| odd: stat cost under thành: (paid only on success, in THÀNH Mất) |',K(r=>r.statUnderThanh),'|');console.log('| input alias "bại:" |',K(r=>r.raw),'|');
 if(OUT)require('fs').writeFileSync(OUT,JSON.stringify({cards:C,src:res},null,1));
 await b.close();srv.close();process.exit(0)})();
