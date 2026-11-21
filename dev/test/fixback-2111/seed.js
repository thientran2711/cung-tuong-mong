/* in-page seed of a FILLED life (runs inside the game page via page.evaluate). Uses only the game's own functions/state (no code change). */
module.exports.rich=function(opt){opt=opt||{};
 SLOT=3;document.getElementById('title').hidden=true;
 for(let i=0;i<80;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv())&&(!opt.org||S.origin.k===opt.org))break}
 Q.length=0;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
 kn();for(const v of rivals){S.met[v.id]=1;try{k61Meet(v,"gặp",3)}catch(e){}}
 S.rank=opt.rank!=null?opt.rank:5;S.maxRank=Math.max(S.maxRank||0,S.rank);if(opt.queen){for(const x of rivals)if(x!==S)x.queen=false;S.queen=true}S.age=Math.max(S.age||18,opt.age||30);S.bac=(S.bac||0)+3000;S.danh=Math.max(S.danh||0,70);
 /* children: hers + rivals' (same mix as dev/test/hoang-tu.js "kids") */
 const mk=(sex,age,fond)=>{const k=mkKid(sex,age);k.fond=fond;k.tal=40+age*2;return k};
 if(!opt.nokids){[['m',2,60],['f',9,55],['m',16,70],['f',17,65]].forEach(a=>S.kids.push(mk(...a)));
  const R=rivals.filter(v=>v.alive&&!v.out);[[0,'m',19,50],[0,'f',18,40],[1,'m',16,72],[1,'f',14,60],[2,'m',7,45]].forEach(([i,...a])=>{if(R[i])R[i].kids.push(mk(...a))});
  try{allKids().forEach(([k])=>k61Know(k,'',true,3))}catch(e){}}
 /* factions: hers + two others */
 if(!opt.nofac){S.facs=[];const R=rivals.filter(v=>v.alive&&!v.out&&v!==S);
  try{found(S,R[0]);joinFac(R[1],facOf(S));found(R[2],R[3]);joinFac(R[4],facOf(R[2]));found(R[5],R[6])}catch(e){console.log('fac',e.message)}}


 /* Sổ ghi: a few grand endings already earned in earlier lives (ctm-ge collection, knowledge only) */
 if(!opt.noge){try{const lives=[1,2,3];let n=0;for(const b of Object.keys(GE_CAT)){if(!/^(tt|dtq)_/.test(b))continue;const E=GE_CAT[b].e||[];
   [0,1].forEach(i=>{if(E[i]&&n<6){geBook({b},{ok:true,i,sh:"",ti:E[i][0],life:lives[n%3]});n++}});geBook({b},{ok:false,i:2,sh:"",ti:"",life:2})}}catch(e){console.log('ge',e.message)}}
 /* men she has met (Nam nhân tab) */
 if(!opt.nomen){try{menInit()}catch(e){}S.menMet=S.menMet||{};(S.men||[]).filter(m=>m.alive).slice(0,6).forEach((m,i)=>{S.menMet[m.id]=1;m.seen=1;try{k61Meet(m,"gặp",2+i%2)}catch(e){}});}
 /* pets */
 if(!opt.nopet){try{Object.keys(PET).slice(0,3).forEach(t=>petAdd(S,t,"me"))}catch(e){console.log('pet',e.message)}}
 /* items for every empty Tư trang filter */
 try{const need={};for(const k in IT){const kd=IT[k].kd;if(!kd)continue;need[kd]=need[kd]||[];if(need[kd].length<2)need[kd].push(k)}
  for(const kd in need)need[kd].forEach(k=>S.inv.push({k,from:"me"}))}catch(e){console.log('it',e.message)}
 /* Việc nhờ: a few accepted favours */
 if(!opt.noq72){try{const q=q72();const PL=["cung","vuon","tyv","dtd","ksp","tcv","ccd","nvp"].concat(Object.keys(typeof PLACES!=="undefined"?PLACES:{}));
  for(const pl of PL){if(q.a.length>=3)break;let x=null;try{x=q72Choose(q72Cands(pl),pl)}catch(e){}if(x){x.t0=wk();x.dl=wk()+6;q.a.push(x);q.n.acc++;try{q72Enter(x,q72X(x))}catch(e){}}}
  const R=rivals.filter(v=>v.alive&&!v.out&&v!==S);if(R[0])q.d['rv:'+R[0].id]=2;if(R[3])q.d['rv:'+R[3].id]=1;if(R[5])q.d['rv:'+R[5].id]=-1;q.n.ok=(q.n.ok||0)+3;q.n.no=(q.n.no||0)+1;
  for(let i=0;i<4;i++){try{q72Npc()}catch(e){}}}catch(e){console.log('q72',e.message)}}
 /* Hôn sự: daughter 17 betrothed (nhà), son 16 left open */
 if(!opt.nokids&&!opt.nobetroth){try{const d=S.kids.find(k=>k.sex==='f'&&k.age>=16);if(d){h54PoolUp();const c=h54Cands(S,d)[0];if(c)h54Betroth(d,S,c,"nha",true)}}catch(e){console.log('hon',e.message)}}
 for(let i=0;i<2;i++){try{monthTick()}catch(e){console.log('mt',e.message)}Q.length=0}
 try{h54PoolUp()}catch(e){}try{const s=h54Pool()[0];if(s)s.kn=1}catch(e){}try{const q=(S.qPool||[])[0];if(q)q.kn=1}catch(e){}
 Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw,#klife').forEach(e=>e.id==='klife'?(e.hidden=true,e.classList.remove('on')):e.remove());render();
 return {q72:q72().a.length,pets:(S.pets||[]).length,men:Object.keys(S.menMet||{}).length,org:S.origin.k,rank:S.rank,kids:S.kids.length,facs:(S.facs||[]).map(f=>f.name+':'+f.m.length)}};
