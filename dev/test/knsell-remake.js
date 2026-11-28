/* save r6 (BIG rv save-fix-stack, LAW 11 generator family): «Có người bán tin» — after N buổi of a real life, EVERY seller × news she could be
   offered is made as a card, then made again from its sổ form (rcpMk, as on load): the remake must give the card back with its choices and must
   leave S exactly as it was (probe REMAKE-SIDE knSell, iPad seed 1). usage: node dev/test/knsell-remake.js index.html [other.html …] [buổi=30] → exit 1 on FAIL */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const D=require('./lib/device');const fs=require('fs'),path=require('path');
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);
(async()=>{const root=path.resolve(__dirname,'../..');const http=require('http');const A=process.argv.slice(2);const NB=+(A.find(x=>/^\d+$/.test(x))||30);
 const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':f.endsWith('.html')?'text/html':'text/javascript'});r.end(b)})}).listen(0);
 const b=await chromium.launch();let bad=0;
 for(const page of A.filter(x=>!/^\d+$/.test(x))){const ctx=await D.newDeviceContext(b,'ipadAir',{serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();
  await D.openDirect(p,`http://127.0.0.1:${srv.address().port}/${page}`);await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1200);await p.evaluate(H);
  const R=await p.evaluate(async NB=>{__sbr.newLife();await __sbr.settle();
   for(let i=0;i<NB&&!S.dead;i++){Q.length=0;const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');if(n){n.disabled=false;n.click()}await __sbr.after(k)}
   Q.length=0;const flat=(o,p,out)=>{if(o&&typeof o==='object'){const ks=Object.keys(o);if(!ks.length)out[p]=Array.isArray(o)?'[]':'{}';for(const k of ks)flat(o[k],p+'.'+k,out)}else out[p]=o;return out};
   const res={cards:0,kinds:{},fail:[],side:[]};
   for(const s of knAllSrv().filter(y=>y&&y.name)){let N=[];try{N=knSellNews(S,s)}catch(e){}
    for(const n of N.slice(0,4)){const m=knSellCard(s,n);if(!m||!m.opts)continue;res.cards++;res.kinds[n.kind]=(res.kinds[n.kind]||0)+1;
     if(!m.rk){res.fail.push('no rk: '+n.kind+' '+n.id);continue}
     /* r7 (independent check C4): put back the state the remake meets after a reload at a later khắc — S.tb's khắc roll not yet made and the
        lazy stores not yet there — so a remake that rolls S.tb or makes empty S.intel / S.j95 shows here (mutate: either fix reverted → FAIL) */
     const keep={};try{if(S.tb&&S.tb.no)S.tb.no.k=-1;for(const k of ['intel','j95'])if(k in S){keep[k]=S[k];delete S[k]}}catch(e){}/* the lazy stores are taken away for the remake and put back after the S check */
     const a=flat(JSON.parse(JSON.stringify(S)),'S',{});let c=null;try{c=rcpMk(JSON.parse(JSON.stringify({rk:m.rk,ra:m.ra,t:m.t})))}catch(e){}
     const b2=flat(JSON.parse(JSON.stringify(S)),'S',{});const d=[];for(const k of new Set([...Object.keys(a),...Object.keys(b2)]))if(a[k]!==b2[k])d.push(k);for(const k in keep)S[k]=keep[k];
     if(!c||!c.opts||!c.opts.length)res.fail.push('remake: '+n.kind+' '+n.id);if(d.length)res.side.push(n.kind+' '+n.id+' → '+d.slice(0,4).join(' '))}}
   return {key:__sbr.key(),...res}},NB);
  const pass=R.cards>0&&!R.fail.length&&!R.side.length;if(!pass)bad++;
  console.log(page,pass?'PASS':'FAIL',`at ${R.key}: ${R.cards} cards ${JSON.stringify(R.kinds)} · remake/rk fails ${R.fail.length} · S touched ${R.side.length}`,JSON.stringify({fail:R.fail.slice(0,4),side:R.side.slice(0,6)}));await ctx.close()}
 await b.close();srv.close();process.exit(bad?1:0)})();
