/* ILLNESS-CURE r3 family scan (law 11, MAIN 185 Q1 + Q3): every CHILD-illness path — can the first hit kill without a sign, which sign she gets,
   the cure roads for the child (bạc / non-bạc), the NPC mother's roads — plus the Q1 rows: Sức tối đa by illness stage (hers and an NPC's).
   node dev/tools/kid-illness-scan.js <dir with index.html> [out.md]   (works on a build before r3 too: every probe is guarded) */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const DIR=path.resolve(process.argv[2]||'.');const OUTF=process.argv[3];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(DIR,'index.html'));await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
  const mk=n=>({name:n,sex:"m",age:2,hp:100,tal:50,fond:50,alive:true});const k=mk("Thử Nhi");S.kids.push(k);const r0=window.roll;const force=()=>{window.roll=()=>true;roll=window.roll},unforce=()=>{window.roll=r0;roll=r0};
  const reset=h=>{k.alive=true;k.hp=h;k.kIll=null;k.ill=null;delete S.kidAlarm};const sign=()=>S.kidAlarm?"card (opens by itself)":"log line only";const out=[];
  const trial=(nm,h,fn,n)=>{let first=0,sg="";for(let i=0;i<(n||100);i++){reset(h);try{force();fn()}catch(e){sg="err "+e.message}finally{unforce()}if(!k.alive)first++;else if(!sg)sg=k.kIll||S.kidAlarm?sign():"log line only"}
   out.push({path:nm,first:`${first}/${n||100}`,sign:sg||"—"})};
  trial("j8 kidsMonth — sudden illness (đậu mùa / sốt / kiết lỵ / phong hàn)",40,()=>{const t=S.turn;kidsMonth()});
  const C0=consorts().map(c=>[c,c.ill,c.confined,(c.staff||[]).slice()]);
  trial("j13 epidemic — đậu mùa in her cung",30,()=>{for(let n=0;n<40&&k.alive&&k.hp===30;n++)epidemic()},60);
  for(const [c,i,f,st] of C0){c.ill=i;c.confined=f;if(c.staff)c.staff=st}
  trial("j7 princefever — «Tự bốc thuốc» fails",20,()=>{kidHurt(k,25)});
  /* jface: a child with an illness of the ILL book dies only from nguy kịch (stages = the sign) */
  {let d=0;for(let i=0;i<100;i++){reset(100);k.ill={k:"lao",st:1,known:true};try{force();fxIllMonth(k)}finally{unforce()}if(!k.alive)d++}
   /* a stage up (fxIllMonth stubbed to raise her child's stage) — does a card come? */
   reset(100);k.ill={k:"lao",st:1,known:true};const f0=fxIllMonth;let card=false;try{fxIllMonth=q=>{if(q===k&&k.ill)k.ill.st=2};const d0=die;die=()=>{};try{illMonth()}finally{die=d0}card=S.kidAlarm===k.name}catch(e){}finally{fxIllMonth=f0}
   out.push({path:"jface fxIllMonth — child with an ILL illness",first:`${d}/100 (nhẹ)`,sign:"stages nhẹ → nặng → nguy kịch + log"+(card?" + card on each stage up":"")})}
  out.push({path:"j8 kpoison — «Hạ độc con nàng» (a scheme, poison family — not an illness)",first:"(out of scope)",sign:"—"});
  /* roads for her sick child */
  reset(30);k.kIll={t:-1,n:"sốt cao co giật"};S.bac=200;S.sung=30;let kr=null;try{kr=K61RAW;K61RAW=true}catch(e){}
  let ty=[];try{ty=talkOpts({kind:"ty"}).filter(a=>new RegExp(k.name+"|cho con").test(a.n)).map(a=>a.n.replace(k.name,"<con>")+(a.c&&a.c.bac?" (bạc)":a.c&&a.c.sung?" (Sủng)":a.c&&a.c.suc?" (Sức)":""))}catch(e){ty=["err"]}
  try{K61RAW=kr}catch(e){}
  let dk=[];try{deal();dk=deck.filter(a=>a&&new RegExp(k.name+"|cho con").test(a.n)).map(a=>a.n.replace(k.name,"<con>")+(a.c&&a.c.bac?" (bạc)":a.c&&a.c.sung?" (Sủng)":a.c&&a.c.suc?" (Sức)":""))}catch(e){dk=["err"]}
  const ag=typeof AGC2==="object"?Object.keys(AGC2).filter(x=>/^kid/.test(x)&&x!=="kidGreet").map(x=>x+(BAL.ag.cx2[x]&&BAL.ag.cx2[x].c.bac?" (bạc)":BAL.ag.cx2[x]&&BAL.ag.cx2[x].c.sung?" (Sủng)":" (Sức)")):[];
  S.kids.splice(S.kids.indexOf(k),1);
  /* Q1: Sức tối đa by illness stage (hers and an NPC's) */
  const cap=[];const v=liveRivals(true).find(x=>!x.coop&&x.alive!==false);S.ill=null;const base=sucCap(S);
  for(const st of [1,2,3]){S.ill={k:"lao",st,known:true};S.suc=99;try{render()}catch(e){}const nv=v?(v.ill={k:"lao",st,known:true},sucCap(v)):"—";cap.push({st:STG[st],me:sucCap(S),suc:S.suc,npc:nv})}
  S.ill=null;if(v)v.ill=null;
  return{out,ty,dk,ag,cap,base}});
 const L=["### Child-illness paths","| Path | first hit kills (trials) | sign before death |","|---|---|---|"];
 for(const r of R.out)L.push(`| ${r.path} | ${r.first} | ${r.sign} |`);
 L.push("","### Roads for her sick child",`- Thái y viện: ${R.ty.join(" · ")||"—"}`,`- home deck: ${R.dk.join(" · ")||"—"}`,`- NPC mother (jagacts2 AGC2): ${R.ag.join(" · ")||"—"}`);
 L.push("","### Q1 Sức tối đa by illness stage (Lao phổi; her Sức set to 99 first)",`base cap (well): ${R.base}`,"| stage | her Sức tối đa | her Sức after render | NPC Sức tối đa |","|---|---|---|---|");
 for(const c of R.cap)L.push(`| ${c.st} | ${c.me} | ${c.suc} | ${c.npc} |`);
 const s=L.join("\n")+`\n\npage errors: ${errs.length}\n`;console.log(s);if(OUTF)fs.writeFileSync(OUTF,s);await b.close()})();
