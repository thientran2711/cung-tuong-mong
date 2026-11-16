/* Re-check (second independent checker): adversarial scenarios on the real page, beyond ia_scen.js.
   usage: node rc_adv.js <url> <out.json>
   Each scenario drives the game through its own functions, then runs __IA.check (ia_hook.js) plus direct asserts.
   A "bad" list per scenario; empty = PASS. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL='http://127.0.0.1:8971/t.html',OUT='rc_adv.json']=process.argv;const HOOK=fs.readFileSync(path.join(__dirname,'ia_hook.js'),'utf8');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|mp3|ogg|m4a)$/,r=>r.abort());const res={};
 const fresh=async(o)=>{await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1200);await p.evaluate(o=>{localStorage.clear();if(o)window.__forceOrigin=o;SLOT=3;document.getElementById("title").hidden=true;start();if(NLP)nlAccept(true);Q.length=0;try{closeModal()}catch(e){}render()},o||'');await p.evaluate(HOOK);
  await p.evaluate(()=>{window.__clr=()=>{let n=0;while(Q.length&&n++<40){try{if(Q[0].opts&&Q[0].opts.length)chooseM(Q[0].opts.length-1);else closeModal()}catch(e){Q.shift()}}};
   window.__ia=(t)=>{const IA=window.__IA;IA.err={};IA.ex={};IA.check(t);const o=[];for(const k in IA.err)if(IA.err[k])o.push(k+":"+IA.err[k]+" "+JSON.stringify((IA.ex[k]||[]).slice(0,2)));return o}})};
 const reload=async()=>{await p.evaluate(()=>save());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(1200);await p.evaluate(()=>document.querySelector('#slots button[data-load="3"]').click());await p.waitForTimeout(700);await p.evaluate(HOOK);
  await p.evaluate(()=>{window.__ia=(t)=>{const IA=window.__IA;IA.err={};IA.ex={};IA.check(t);const o=[];for(const k in IA.err)if(IA.err[k])o.push(k+":"+IA.err[k]+" "+JSON.stringify((IA.ex[k]||[]).slice(0,2)));return o}})};

 /* 1. maid out with her mistress, then the mistress dies mid-buổi (poison path: deathSentence) */
 res.deathOut=[];for(const o of ['tt','cn','ch']){await fresh(o);res.deathOut.push(await p.evaluate(()=>{const bad=[];for(let t=0;t<8;t++){nextBuoi();__clr();const kh=j95kh();const R=S.roster;
   const v=liveRivals(true).find(x=>!x.queen&&R.P["mm:"+x.id]&&R.P["v"+x.id][kh][0]!==palaceOf(x)&&R.P["v"+x.id][kh][0]!=="home");if(!v)continue;
   const mmRow=R.P["mm:"+v.id][kh].slice();const vRow=R.P["v"+v.id][kh].slice();v.mercy=1;deathSentence(v,"thử");__clr();spend(1);__clr();
   const R2=S.roster;for(const id in R2.P){/* deathSentence spares her into lãnh cung 30% of the time when the Emperor is "nhân từ" (j8): only the dead must leave */if(!v.alive&&(id==="v"+v.id||id==="mm:"+v.id))bad.push("still in record: "+id);const e=R2.P[id][j95kh()];if(!v.alive&&e&&e[2]==="v"+v.id&&/hầu/.test(e[3]||""))bad.push("serving the dead: "+id+" "+e.join("|"))}
   /* spared (nhân từ): she must be in lãnh cung now, and nobody "theo hầu" her elsewhere (rechecker) */if(v.alive){const e=R2.P["v"+v.id];if(!v.out)bad.push("spared but not out");else if(!e||e[j95kh()][0]!=="lc")bad.push("spared, row not lc: "+(e&&e[j95kh()].join("|")));const mm=R2.P["mm:"+v.id];if(mm&&mm[j95kh()][0]!=="lc"&&/theo hầu/.test(mm[j95kh()][3]||""))bad.push("maid follows spared mistress elsewhere: "+mm[j95kh()].join("|"))}
   bad.push(...__ia("deathOut"));return{v:v.name,spared:!!v.alive,vRow,mmRow,bad}}return{skip:"no consort out with maid in 8 buổi",bad}}))}

 /* 2. the player to lãnh cung, a few buổi there, then pardoned (restore) mid-buổi; then reload */
 await fresh('nc');res.coldPardon=await p.evaluate(()=>{const bad=[];Q.length=0;cold("thử");__clr();for(let i=0;i<3;i++){nextBuoi();__clr()}
  const kh=j95kh();const atLc=S.roster.P.me[kh][0];if(atLc!=="lc")bad.push("in cold palace but row "+atLc);bad.push(...__ia("cold"));
  restore(true,"thử");__clr();spend(1);__clr();const kh2=j95kh();const me=S.roster.P.me[kh2];if(me[0]!==S.place)bad.push("after pardon row "+me[0]+" place "+S.place);
  for(const s of S.staff||[]){const e=S.roster.P["s"+s.sid];if(e&&e[kh2][0]==="lc")bad.push("servant left in lc: "+s.name)}const mm=S.roster.P["mm:me"];if(mm&&mm[kh2][0]==="lc")bad.push("maid left in lc");
  const anyLc=Object.keys(S.roster.P).filter(id=>S.roster.P[id][kh2][0]==="lc");for(const id of anyLc){const w=S.roster.who[id];if(id==="me"||id==="mm:me")bad.push("me/maid at lc after pardon")}
  bad.push(...__ia("pardon"));return{rank:S.rank,out:S.out,place:S.place,me,bad}});
 await reload();res.coldPardon.afterReload=await p.evaluate(()=>{const kh=j95kh();const b=__ia("pardonReload");if(S.out)b.push("out after reload");if(S.roster.P.me[kh][0]!==S.place)b.push("me row "+S.roster.P.me[kh][0]+" vs "+S.place);return b});

 /* 3. housing change on promotion mid-week: a low consort living under a head is promoted to a rank with her own palace, mid-buổi */
 res.promoHouse=[];for(const o of ['dtq','td','thd']){await fresh(o);res.promoHouse.push(await p.evaluate(()=>{const bad=[];nextBuoi();__clr();spend(1);
   const live=liveRivals(true);const v=live.filter(x=>!x.queen&&!x.out&&!palHeadOK(x)).sort((a,b)=>b.rank-a.rank)[0];if(!v)return{skip:"no lodger",bad};
   const old=palaceOf(v);v.rank=Math.max(v.rank,5);for(let i=0;i<3&&!palHeadOK(v);i++)v.rank++;try{palFix()}catch(e){bad.push("palFix "+e.message)}spend(0);__clr();
   const now=palaceOf(v);const kh=j95kh();const row=S.roster.P["v"+v.id][kh];const mm=S.roster.P["mm:"+v.id];
   if(row&&(row[0]===old)&&old!==now)bad.push(`row still at old home ${old}, now ${now}`);if(mm&&row&&row[0]===now&&mm[kh][0]===old&&old!==now)bad.push("maid stayed at old home");
   for(const s of v.staff||[]){const e=S.roster.P["s"+s.sid];if(e&&e[kh][0]===old&&old!==now&&/phận sự/.test(e[3]||""))bad.push("servant on duty at old home "+s.name)}
   /* map silhouettes = record */try{const n=countAt(now);let c=0;for(const id in S.roster.P)if(S.roster.P[id][kh][0]===now)c++;if(n!==c)bad.push(`countAt(${now})=${n}, record ${c}`)}catch(e){}
   bad.push(...__ia("promo"));return{v:v.name,old,now,row,bad}}))}

 /* 4. j96 love arc: rosterWhere(m) for every man; a man added by rosterWhere must not appear in khắc already shown */
 res.love=[];for(const o of ['tt','cnv','muoi']){await fresh(o);res.love.push(await p.evaluate(()=>{const bad=[];nextBuoi();__clr();spend(2);__clr();const kh=j95kh();const R=S.roster;const out=[];
   const shown=JSON.stringify(R.m||null);
   for(const m of (S.men||[]).filter(m=>m.alive)){const had=!!R.P[m.id];const w=rosterWhere(m);const e=S.roster.P[m.id];if(!w){out.push([m.name,"null"]);continue}
    if(!e)bad.push(m.name+": rosterWhere="+w+" but no row");else if(e[kh][0]!==w)bad.push(m.name+": rosterWhere "+w+" row "+e[kh][0]);
    if((S.menW||{})[m.id]&&S.menW[m.id]!==w)bad.push(m.name+": menW "+S.menW[m.id]+" vs "+w);
    if(!had&&e){for(let c=0;c<kh;c++)if(e[c]&&e[c][0]&&e[c][0]!=="ngoai"/* off-map "ngoài cung" (N1 fix): not a place she could have seen */)out.push([m.name,"backfilled khắc "+c+" at "+e[c][0]+" (player was at "+(R.P.me[c]||[])[0]+")"])}}
   {const m0=JSON.parse(shown)||[],m1=S.roster.m||[];for(let c=0;c<kh;c++)if(JSON.stringify(m0[c]||null)!==JSON.stringify(m1[c]||null))bad.push("R.m (shown map numbers) of past khắc "+c+" rewritten")}
   for(const x of out)if(/backfilled/.test(x[1]))bad.push("N1 past-khắc backfill: "+x.join(" "));
   try{if(typeof loc96==="function"&&man96()){const l=loc96();const m=man96();const e=S.roster.P[m.id];if(e&&e[kh][0]!==l)bad.push("loc96 "+l+" vs row "+e[kh][0])}}catch(e){bad.push("loc96 "+e.message)}
   bad.push(...__ia("love"));return{men:(S.men||[]).length,out:out.slice(0,6),bad}}))}

 /* 5. servant follows mistress: change the mistress's row mid-buổi (she comes to the player's home), spend, maid must follow */
 res.maidFollow=[];for(const o of ['cn','td']){await fresh(o);res.maidFollow.push(await p.evaluate(()=>{const bad=[];nextBuoi();__clr();goTo("home");__clr();const R=S.roster;const kh=j95kh();
   const v=liveRivals(true).find(x=>!x.queen&&!x.confined&&R.P["mm:"+x.id]&&R.P["v"+x.id][Math.min(3,kh+1)][0]!=="home");if(!v||kh>=3)return{skip:1,bad};
   const k2=kh+1;spend(1);__clr();/* the approach path j95 uses for a person who comes */const g=motiveOK(v,S,"visit");R.P["v"+v.id][j95kh()]=["home","visit","me",g.why||"sang thăm"];j95sync();
   const k=j95kh();const vr=S.roster.P["v"+v.id][k],mr=S.roster.P["mm:"+v.id][k];if(vr[0]==="home"&&mr[0]!=="home"&&mr[0]!==palaceOf(v))bad.push(`maid at ${mr[0]} (${mr[3]}) while mistress at player's home`);
   if(/theo hầu/.test(mr[3]||"")&&mr[0]!==vr[0])bad.push("maid 'theo hầu' elsewhere: "+mr.join("|")+" vs "+vr.join("|"));bad.push(...__ia("maid"));return{v:v.name,vr,mr,bad}}))}

 /* 6. festivals: run to a festival day; record holds everyone once, map counts = record, IA clean */
 await fresh('ch');res.fest=await p.evaluate(()=>{const bad=[];let f=null,n=0;while(!(f=festToday())&&n++<60){endTurn();__clr();if(S.dead)return{dead:1,bad}}if(!f)return{skip:"no festival in 60 turns",bad};
  const out=[];for(let i=0;i<4;i++){const kh=j95kh();const R=S.roster;const C={};for(const id in R.P){const k=R.P[id][kh][0];C[k]=(C[k]||0)+1}
   for(const x of places()){const c=countAt(x.k);if(c!==(C[x.k]||0))bad.push(`fest ${f.k} khắc ${kh} countAt(${x.k})=${c} record ${C[x.k]||0}`)}bad.push(...__ia("fest"+i));out.push(C);if(i<3){spend(1);__clr()}}
  return{f:f.k,out:out.slice(0,2),bad}});

 /* 7. motive gate brute force: every hostile act, every actor set to affection 80+ with no grudge; nothing may run without a recorded exception */
 res.gate=[];for(const o of ['tt','dtq','cnv']){await fresh(o);res.gate.push(await p.evaluate(()=>{const bad=[];const ran=[];Q.length=0;const H=Object.keys(ACT);
   const tryAct=(v,k)=>{const n0=(S.roster.acts||[]).length;let r;try{r=runAct(v,S,k)}catch(e){r=null}__clr();const L=(S.roster.acts||[]).slice(n0);return{r,L}};
   for(const v of liveRivals(true).filter(x=>!x.queen).slice(0,4)){for(const k of H){v.rel=90;v.oan=0;v.ghen=0;v.bac=900;v.malice=60;if(v.oanT)v.oanT={};const a=aff(v,S);if(a<80)continue;
     const g=motiveOK(v,S,k);let r;try{r=tryAct(v,k)}catch(e){continue}/* names stripped first: "Bạch Tố Tâm" is not "tố" */const rr=String(r.r||"").replace(/<b>[^<]*<\/b>/g,"");const hostile=/hại|độc|vu|tố|giá họa|hãm|bẫy|đẩy|trộm|cáo|xàm|đồn|rình|ám|phá/i.test(rr+(ACT[k].n||""));
     /* friendly kinds, as ia_hook H: ally / gift / tieuhuy (handing her evidence back) */if(["ally","gift","tieuhuy"].includes(k))continue;if(r.r&&hostile&&!g.ex&&g.ok)bad.push(`${k} (${ACT[k].n}) ran at affection ${a}, gate ok without exception: ${String(r.r).slice(0,90)}`);
     if(r.r&&hostile)ran.push(k+(g.ex?"(ex:"+g.why+")":""))}}
   /* hostile ACT kinds the gate does not know at all (pass with no reason) */const unk=H.filter(k=>{const n=(ACT[k].n||"").toLowerCase();return /hại|độc|vu |vu cáo|tố|giá họa|hãm|bẫy|đẩy|trộm|cáo|đồn|ám|phá|xúi/.test(n)&&motiveOK(liveRivals(true)[0],S,k).why===""}).map(k=>k+":"+ACT[k].n);
   return{acts:H.length,ran:ran.slice(0,10),ungatedHostileKinds:unk,bad}}))}

 /* 8. tai mắt habit reports are true: the reported haunt at the reported buổi is where she is most often over the next 12 buổi of that kind */
 await fresh('td');res.spyTrue=await p.evaluate(()=>{const bad=[];Q.length=0;const rep=[];for(const v of liveRivals(true).slice(0,8)){const F=j78facts(v).filter(f=>f.kind==="habit");if(F.length){const m=/^habit:(\d):(.+)$/.exec(F[0].k);if(m)rep.push({v,c:+m[1],k:m[2],txt:F[0].txt})}}
  const hit={};for(const x of rep)hit[x.v.id]={n:0,at:0};let guard=0;while(guard++<200&&Object.values(hit).some(h=>h.n<12)){nextBuoi();__clr();if(S.dead)break;const c=S.buoi||0;for(const x of rep){if(x.c!==c||!x.v.alive)continue;const h=hit[x.v.id];if(h.n>=12)continue;const P=S.roster.P["v"+x.v.id];if(!P)continue;h.n++;if(P.some(e=>e[0]===x.k))h.at++}}
  const out=rep.map(x=>({txt:x.txt,seen:hit[x.v.id].at+"/"+hit[x.v.id].n}));for(const x of rep){const h=hit[x.v.id];if(h.n>=6&&h.at===0)bad.push("never there: "+x.txt+" "+h.at+"/"+h.n)}return{out,bad}});

 /* 9. map silhouettes on screen = record, right after each of the above kinds of change (promotion, death): real DOM */
 await fresh('dtq');res.mapDom=await p.evaluate(()=>{const bad=[];nextBuoi();__clr();const v=liveRivals(true).find(x=>!x.queen&&!palHeadOK(x));if(v){v.rank=Math.max(v.rank,6);try{palFix()}catch(e){}}const d=liveRivals(true).find(x=>!x.queen&&x!==v);if(d){d.mercy=1;deathSentence(d,"thử");__clr()}spend(1);__clr();
  tab="go";render();if(!document.querySelector('.mapw'))return{skip:"no map",bad};const kh=j95kh();const C={};for(const id in S.roster.P){const k=S.roster.P[id][kh][0];C[k]=(C[k]||0)+1}
  for(const sp of document.querySelectorAll('.mapw .mspot')){const k=sp.dataset.go||sp.dataset.ak;if(!k)continue;const s=sp.querySelector('.msil');const n=s?+(/(\d+)/.exec(s.getAttribute('aria-label'))||[0,0])[1]:0;if(n!==(C[k]||0))bad.push(`${k}: map ${n} record ${C[k]||0}`)}
  return{bad}});
 res.pageErrors=errs;let fails=0;const walk=o=>{if(Array.isArray(o)){for(const x of o)walk(x);return}if(o&&typeof o==="object"){if(Array.isArray(o.bad))fails+=o.bad.length;for(const k in o)if(k!=="bad")walk(o[k])}};walk(res);res.fails=fails+errs.length;
 fs.writeFileSync(OUT,JSON.stringify(res,null,1));console.log("fails",res.fails,"pageErrors",errs.length);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
