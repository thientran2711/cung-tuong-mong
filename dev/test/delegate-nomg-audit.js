/* DELEGATE-NOMG whole-family audit (owner OD 25/11 ~04:12Z: a mini-game ONLY when SHE does the act herself; an act she ORDERS someone else to do
   has NO mini-game — the doer's ability + BAL odds decide it).
   Walks every place (home + places()), every person on its stage (her maid, servants, consorts, elders, officials …), reads the focus-view act list
   (jdf dfActs — exactly what the stage pop-up offers) and prints one row per distinct act: kind · act · engine · class · would a mini-game open.
   "would a game open" = the live jdfv dfTap rule: class D (own flow) and class E (delegated, dfDlg) open no on-figure game.
   usage: node dev/test/delegate-nomg-audit.js [--json out.json] → prints the table; exit 1 if a DELEGATED act would still open a game. */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);
 const rows=await g.evaluate(()=>{window.kitNotice=undefined;const out={};
  const go=k=>{Q.length=0;used=0;S.out=0;S.confined=0;S.buoi=0;S.place="home";if(k!=="home")goTo(k);if(Q[0]&&Q[0].pid==="entpick"){const o=Q[0].opts.find(x=>x.n==="Đi một mình");Q.length=0;if(o)o.go()}Q.length=0;if(S.visit){S.visit.tk={};S.visit.talked=false}tab="act";window.__fromMap=1;try{render()}catch(e){}};
  const keys=["home"].concat((places()||[]).map(x=>x.k));
  for(let pass=0;pass<2;pass++)for(const k of keys){try{go(k)}catch(e){continue}let P=[];try{P=curPeople()||[]}catch(e){}
   P.forEach((pp,i)=>{let G=null;try{G=dfActs(i)}catch(e){}(G||[]).forEach(gr=>gr.acts.forEach(a=>{const n=String(a.n).replace(/\s+/g," ").trim();const key=pp.kind+"|"+n;if(out[key])return;
    const cls=a.cls;let o=null;try{const T=talkOpts(pp);o=T.find(x=>x&&String(x.n).replace(/<[^>]+>/g,"").trim()===n)}catch(e){}const DL=typeof dfDlg==="function"?dfDlg:(x=>!!(x.pk||(window.ACT_REMOTE&&ACT_REMOTE[x.n])||/^(Sai |Nghe ngóng chung$|Truyền (thái y|họa sư|nhạc sư)|Mời thái y|Nhờ thái giám|Cài (tai mắt|người hầu))/.test(x.n)));const dl=cls==="E"||DL(o||{n});
    out[key]={kind:pp.kind,act:n,eng:a.eng,cls,dlg:dl,game:!(cls==="D"||cls==="E"),place:k}}))})}
  /* her own maid and every servant of her household, read straight from their pop-up options (they are not always on a stage this buổi) */
  const syn=[{kind:"maid",name:S.maid&&S.maid.name}].concat((S.staff||[]).map(x=>({kind:"serv",ref:x,name:x.name})));
  for(const pp of syn){let T=[];try{T=talkOpts(pp)||[]}catch(e){}for(const o of T){if(!o||!o.n)continue;const n=String(o.n).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();const key=pp.kind+"|"+n;if(out[key])continue;
   const cls=typeof dfCls==="function"?dfCls(o):"?";const DL=typeof dfDlg==="function"?dfDlg:(x=>!!(x.pk||(window.ACT_REMOTE&&ACT_REMOTE[x.n])||/^(Sai |Nghe ngóng chung$|Truyền (thái y|họa sư|nhạc sư)|Mời thái y|Nhờ thái giám|Cài (tai mắt|người hầu))/.test(x.n)));
   out[key]={kind:pp.kind,act:n,eng:typeof dfEng==="function"?dfEng(n):"",cls,dlg:cls==="E"||DL(o),game:!(cls==="D"||cls==="E"),place:"(pop-up)"}}}
  return Object.values(out)});
 rows.sort((x,y)=>(y.dlg-x.dlg)||x.kind.localeCompare(y.kind)||x.act.localeCompare(y.act));
 console.log("kind\tact\tengine\tclass\tdelegated\tmini-game");for(const r of rows)console.log([r.kind,r.act,r.eng,r.cls,r.dlg?"YES":"-",r.game?"GAME":"no"].join("\t"));
 const bad=rows.filter(r=>r.dlg&&r.game);console.log(`rows ${rows.length} · delegated ${rows.filter(r=>r.dlg).length} · delegated-with-game ${bad.length} · page errors ${errs.length}`);
 const j=process.argv.indexOf('--json');if(j>0)fs.writeFileSync(process.argv[j+1],JSON.stringify(rows,null,1));
 await b.close();srv.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
