/* review/player-dress: her picture follows her road / rank / state / age everywhere (LUẬT SỬA CẢ NHÓM scan).
   usage: node dev/test/player-dress.js <url> [pid,pid..|all] [WxH@dpr] [shotdir]
   For each identity (default consort:c05,maid:m05; "all" = the 84) × age 18/30/45/55 × state (consort r0..r7, lãnh cung, trung y,
   cung nữ rk0..rk4, ma ma, Tân Giả khố) it reads every picture of hers: figFor fig/por, pMe().src, the stage #mefig, every <img> of
   her identity in the page (header, panels), a person dialog with her, the Tuần lục book. Each must be the dress the state wants
   (t1..t8 · tcold · ty1..ty8 · tm0..tm4; a maid face's rank-1 dress is the plain maid art) in her age band, same identity.
   Also: NPC maids wear their rank's dress (tm0..tm4). Prints mismatches + a summary line "BAD n". */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,PIDS,SIZE,SHOT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const [wh,dpr]=(SIZE||"1180x820@1").split("@");const [W,H]=wh.split("x").map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof FIGS!=='undefined'&&FIGS.length>1000&&typeof TYF!=='undefined'&&TYF.ix);
 await sleep(1500);
 let pids=(PIDS||"consort:c05,maid:m05").split(",");
 if(PIDS==="all")pids=await p.evaluate(()=>f88Keys("all"));
 let bad=0,n=0;const surf={};
 for(const pid of pids){
  const r=await p.evaluate(pid=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   const R=[];const idt="-"+pid.split(":")[1]+"-";
   const mk=(road)=>{window.__forceOrigin=road==="srv"?"cnv":"thd";window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;
     S.pid=pid;S.fid=pid;if(typeof pidEnforce==="function")pidEnforce();for(const o of (rivals||[]))if(o.fid===pid)o.fid=null};
   const tierOf=s=>{const f=String(s||"").split("?")[0].split("/").pop();if(!f)return"none";
     let t=(f.match(/-(t\d|tcold|cold|tm\d|ty\d|kc|ngheo)-a\d\d/)||[])[1]||(/^(fig|por)-maid-m\d+-a\d\d/.test(f)?"tm1":/^(fig|por)-mama-/.test(f)?"mama":"other:"+f.slice(0,24));
     if(t==="cold")t="tcold";const a=(f.match(/-a(\d\d)\.webp/)||[])[1]||"?";return t+"/a"+a};
   const band=a=>a<26?"a18":a<36?"a26":a<51?"a36":"a51";
   const look=(label,want)=>{try{Q.length=0;document.getElementById("modal").hidden=true;render()}catch(e){}
     const w=want+"/"+band(S.age);const got={};
     got.fig=tierOf(figFor(S));got.por=tierOf(figFor(S,"por"));const mf=document.getElementById("mefig");got.stage=mf?tierOf(mf.getAttribute("src")):"none";
     got.pMe=tierOf(pMe().src);
     /* shown pictures only: not inside a hidden layer, not the rank-change ceremony overlay (.kmpromo / .kmfr-old: it shows the rank she had just reached when it fired; this driver changes rank instantly) */
     const all=()=>[...document.querySelectorAll("img")].filter(i=>i.getClientRects().length&&!i.closest(".kmfr-old,.kmpromo,[hidden]")&&getComputedStyle(i).visibility!=="hidden").map(i=>i.getAttribute("src")||"").filter(s=>s.includes(idt)&&/\/(fig|por)-/.test(s));
     got.page=[...new Set(all().map(tierOf))].join(" ")||"none";
     try{Q.push({t:"Thử",who:pMe(),h:"<p>Thử.</p>",opts:[{n:"Ừ",go:()=>{}}]});showModal();got.dialog=[...new Set([...document.querySelectorAll("#modal img")].map(i=>i.getAttribute("src")||"").filter(s=>s.includes(idt)).map(tierOf))].join(" ")||"none";
       Q.length=0;document.getElementById("modal").hidden=true}catch(e){got.dialog="err "+e.message}
     try{if(typeof wkBookPages==="function"&&typeof kitBook==="function"){const bt=wkBookPages();const host=document.createElement("div");document.body.appendChild(host);
       const bk=kitBook({pages:bt.pages,head:bt.head,host,label:"Tuần lục",onClose:()=>{}});
       got.book=[...new Set([...host.querySelectorAll("img")].map(i=>i.getAttribute("src")||"").concat([...host.querySelectorAll("[style*='background']")].map(e=>(e.getAttribute("style").match(/url\(["']?([^"')]+)/)||[])[1]||"")).filter(s=>s.includes(idt)).map(tierOf))].join(" ")||"none";
       try{bk&&bk.close&&bk.close()}catch(e){}host.remove();document.body.classList.remove("kbk-open")}}catch(e){got.book="err "+e.message.slice(0,60)}
     const wrong=Object.entries(got).filter(([k,v])=>v!=="none"&&v.split(" ").some(x=>x!==w));
     R.push({label,want:w,got,wrong:wrong.map(([k,v])=>k+"="+v)})};
   for(const age of [18,30,45,55]){
    mk("consort");S.age=age;S.place="home";
    for(let rk=0;rk<8;rk++){S.rank=rk;S.out=0;look(`consort r${rk}`,"t"+(rk+1))}
    S.rank=2;S.out=1;S.place="lc";look(`lanh cung`,"tcold");S.out=0;S.place="home";
    try{const w=wdOf(S);const y=w.y;w.y=null;S.rank=3;look(`trung y r3`,"ty4");w.y=y}catch(e){R.push({label:"ty err "+e.message,want:"",got:{},wrong:["err"]})}
    mk("srv");S.age=age;
    for(let rk=0;rk<5;rk++){S.srv.rk=rk;S.srv.lau=0;look(`cung nu rk${rk}`,"tm"+rk)}
    S.srv.rk=2;S.srv.mama=1;look(`ma ma`,"tm4");S.srv.mama=0;
    S.srv.lau=2;S.srv.rk=0;look(`tan gia kho`,"tm0");S.srv.lau=0;
   }
   /* NPC maids: rank dress */
   const nm=[];try{const L=(typeof allServ==="function"?allServ():[]).filter(s=>s&&s.role==="maid"&&(s.age||18)<36);
     for(const s of L.slice(0,12)){const rk=srk(s);const f=figFor({ref:s});const t=tierOf(f);if(f&&!t.startsWith("tm"+rk))nm.push(s.name+" rk"+rk+" "+t)}}catch(e){nm.push("err "+e.message)}
   R.push({label:"NPC maids (rank dress)",want:"tm<rk>",got:{},wrong:nm});
   return R},pid);
  for(const x of r){n++;if(x.wrong.length){bad++;console.log(pid,x.label.padEnd(16),"want",x.want,"WRONG",x.wrong.join(" | "))}
   for(const k in x.got){surf[k]=surf[k]||[0,0];surf[k][0]++;if(x.wrong.some(w=>w.startsWith(k+"=")))surf[k][1]++}}
  if(SHOT){fs.mkdirSync(SHOT,{recursive:true});await p.screenshot({path:`${SHOT}/pd-${pid.replace(':','-')}-${wh}.jpg`,type:'jpeg',quality:60})}
 }
 console.log("surfaces (checked, wrong):",JSON.stringify(surf));
 console.log("BAD",bad,"of",n,"· page errors",errs.length,errs.slice(0,5));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
