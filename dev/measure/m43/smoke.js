const {chromium}=require('playwright');const fs=require('fs');const http=require('http');
const D='/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad/';
const html='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>\n'+fs.readFileSync(D+'cung-dau/_t43.html','utf8')+'\n</body></html>';
const srv=http.createServer((q,r)=>{if(q.url==='/'){r.writeHead(200,{'content-type':'text/html; charset=utf-8'});r.end(html)}else{const f=D+'cung-dau'+decodeURIComponent(q.url.split('?')[0]);if(fs.existsSync(f)&&fs.statSync(f).isFile()){r.writeHead(200);r.end(fs.readFileSync(f))}else{r.writeHead(404);r.end()}}});
srv.listen(0,async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await p.waitForTimeout(800);await p.click('#slots button[data-new="1"]');await p.waitForTimeout(300);
 const r=await p.evaluate(()=>{let tells=[],n=0;S.mat=4;rivals.forEach(v=>{v.oan=85;v.ghen=90});for(let i=0;i<600&&!S.dead;i++){while(Q.length&&n<5000){n++;const m=Q[0];if(m.t==="Tai mắt báo tin")tells.push(m.h.replace(/<[^>]+>/g,'').slice(0,140));if(m.opts&&m.opts.length){const c=m.opts.findIndex(o=>!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));if(c>=0){const L=Q.length;chooseM(c);if(Q.length===L&&Q[0]===m)Q.shift();continue}}closeModal()}
   if(S.mg){S.mg=null;const ov=document.querySelector('#ov');if(ov)ov.hidden=true}nextBuoi()}
  let saveOK=true;try{const d=JSON.parse(JSON.stringify(ser()));deser(d)}catch(e){saveOK=String(e)}
  return{tells:tells.slice(0,4),news:(S.news||[]).slice(0,6).map(x=>x.t),bel:rivals.map(v=>v.bel||null).filter(Boolean).slice(0,3),saveOK,dead:S.dead,month:S.month,year:S.year}});
 console.log(JSON.stringify(r,null,1));console.log('pageerrors',errs.length,errs.slice(0,3));await b.close();srv.close()})
