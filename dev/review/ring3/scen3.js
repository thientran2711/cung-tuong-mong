/* in-page: the REAL crowd of one buổi at Ngự hoa viên → KAR groups. Numbers = proposed BAL.area (law 4; numbers are ours, see report). */
window.BAL=window.BAL||{};BAL.area={ /* = dev/AREA_PLAN.md §4 (proposed BAL, law 4). MOCK-ONLY keys: x = crop of the ONE existing garden painting for the area scene,
   hs = hotspot box on that painting for the garden map (stand-in 'tạm' until Foreman C paints the bird's-eye map + one scene per area) */
 vuon:[{k:'ngudao', n:'Ngự đạo', acts:['stroll','attend','escort','seekemp','ag_flaunt','ag_cx2:court','ag_cx2:show','ag_cx2:flat'],net:['Kiêu ngạo','Tham vọng'],x:.52,hs:{x:.33,y:.70,w:.20,h:.16}},
       {k:'vuonhoa',n:'Vườn hoa',acts:['paint','walk','ag_effort','ag_cx3:talkPraise','ag_cx3:talkGossip','sell','play'],net:['Ân cần','Nhiều chuyện','Ham vui'],x:.12,hs:{x:.02,y:.52,w:.22,h:.18}},
       {k:'thuyta', n:'Thủy tạ', acts:['music','poem','ag_cx3:qin','ag_cx3:talkHealth'],net:['Điềm tĩnh','Khiêm nhường','Ham học'],x:1,hs:{x:.70,y:.18,w:.24,h:.20}},
       {k:'dinhco', n:'Đình cờ', acts:['ag_cx3:pmPlay','ag_cx3:pmDuel','wager'],net:['Nóng nảy','Thực tế'],x:.72,hs:{x:.40,y:.36,w:.18,h:.14}},
       {k:'nonbo',  n:'Non bộ',  acts:['tryst','spy','scheme','ambush','ag_cx3:talkSecret','changed'],net:['Kín đáo','Xảo quyệt','Thù dai'],x:0,hs:{x:.13,y:.22,w:.17,h:.18}}],
 near:{ngudao:['vuonhoa','thuyta'],vuonhoa:['ngudao','thuyta'],thuyta:['dinhco','vuonhoa'],dinhco:['thuyta','nonbo'],nonbo:['dinhco','vuonhoa']},
 route:['ngudao','vuonhoa','thuyta','dinhco'],bold:{sac:75},joinAff:10,avoidAff:-20,grpMax:4,view:{kv1:3,kv2:4},extraName:'Lối đi',moveKh:0,
 gap:.06,feet:.9,folS:.86,folDx:.40,folDy:.035,zoom:{kv1:1,kv2:1.45},panMs:760,walkMs:700,stepK:1.12,stepY:.045,spot:{kv1:.24,kv2:.30},farOp:.55,pkMax:6};
window.KSC=async function(want){try{BAL.df.idle={every:[1e9,1e9],first:1e9}}catch(e){}const CAP3={'ag_cx3:pmPlay':'Đang cùng chơi cờ','ag_cx3:pmDuel':'Đang thách đấu','ag_cx3:talkSecret':'Đang chia sẻ chuyện riêng','ag_cx3:talkHealth':'Đang hỏi han sức khỏe','ag_flaunt':'Đang khoe sắc','ag_effort':'Đang dạo vườn','ag_follow':'Theo hầu','ag_cx3:qin':'Đang gảy đàn'};
 const b0=S.buoi;let best=null;
 for(let sd=0;sd<14;sd++){S.j95seed=1000+sd*7919;for(const b of [1,2]){S.buoi=b;const R=j95plan();for(let kh=0;kh<4;kh++){let n=0,pr=0;for(const id in R.P){const w=R.P[id][kh];if(w&&w[0]==='vuon'){n++;if(w[2]&&w[1]!=='follow')pr++}}
   const sc=-Math.abs(n-want)+(pr?3:0);if(!best||sc>best.sc)best={seed:S.j95seed,b,kh,n,pr,sc}}}}
 S.j95seed=best.seed;S.buoi=best.b;const R=j95plan();try{used=best.kh}catch(e){}Q.length=0;
 S.place='vuon';const VP=[];for(const id in R.P){const w=R.P[id][best.kh];if(!w||w[0]!=='vuon'||id==='me')continue;let p=null;
  if(id[0]==='v'){const v=rivals.find(x=>'v'+x.id===id);if(v)p={kind:'rival',ref:v,name:v.name}}else{try{p=j95ledObj(id)}catch(e){}}
  if(!p&&R.who[id])p={kind:'npc',name:R.who[id][0],info:R.who[id][1],ini:String(R.who[id][0]||'?')[0],col:'#a99'};if(p){p.lid=id;VP.push(p)}}
 S.visit={k:'vuon',people:VP,talked:false,tk:{}};window.__VPn=VP.length;render();try{k3ShowPlace()}catch(e){}render();
 for(const id of ['rtoast','kntchip']){const e=document.getElementById(id);if(e)e.remove()}
 await new Promise(r=>setTimeout(r,3500));
 const ppl=curPeople();const who=R.who;const rec=(p)=>{if(p.lid)return p.lid;if(p.ref&&p.ref.id!=null&&R.P['v'+p.ref.id])return 'v'+p.ref.id;if(p.kind==='emp')return 'emp';if(p.kind==='th')return 'th';for(const id in who){if(who[id][0]===p.name&&R.P[id])return id}return null};
 const toks=[...document.querySelectorAll('#tokens .tok')];let fh=0;const M=[];
 toks.forEach(t=>{const im=t.querySelector('img.figimg');if(im)fh=Math.max(fh,im.getBoundingClientRect().height)});
 const CDNK='https://ctm-img.victoria-tntt.workers.dev/img/';
 for(let i=0;i<ppl.length;i++){const p=ppl[i];const who=p.kind==='emp'||p.kind==='th'?p:p.ref;let kn=true;try{kn=j59known(p)!==false}catch(e){}
  let src='';try{src=who?figFor(who):''}catch(e){}const sil=!kn||!src;if(sil){const male=/thái giám|Tiểu .* Tử|công công/i.test((p.name||'')+' '+((R.who[p.lid]||[])[1]||''))||p.kind==='man';src=CDNK+'kit/unknown-fig-'+(male?'m':'f')+'.webp'}
  const asp=await new Promise(r=>{const im=new Image();im.onload=()=>r(im.naturalWidth/im.naturalHeight);im.onerror=()=>r(.32);im.src=src});
  const id=rec(p);const w=id&&R.P[id][best.kh]||[];let tag='',tc='';try{tag=j59tagHTML(p,p.name);tc=j59col(p)}catch(e){}
  let acts=null;try{popIdx=i;acts=dfData(i)}catch(e){}
  M.push({i,p,id,name:p.name,role:id&&who&&R.who[id]?R.who[id][1]:(id&&R.who[id]?R.who[id][1]:''),act:w[1]||'walk',with:w[2]||null,src,sil,asp,tag,tc,acts})}
 popIdx=null;
 const byName={};M.forEach(m=>byName[m.name]=m);const groups=[];const gOf={};
 const masters=M.filter(m=>m.act!=='follow'&&m.act!=='ag_follow');const fols=M.filter(m=>m.act==='follow'||m.act==='ag_follow');
 masters.forEach(m=>{if(gOf[m.id])return;let g=null;if(m.with){const o=masters.find(x=>x.id===m.with);if(o&&gOf[o.id])g=gOf[o.id]}
  if(!g){g={masters:[],fol:[],act:m.act};groups.push(g)}g.masters.push(m);gOf[m.id]=g});
 fols.forEach(f=>{const mn=(f.role.match(/của (.+)$/)||[])[1];const ms=masters.find(x=>x.name===mn)||masters.find(x=>x.id===f.with);if(ms)gOf[ms.id].fol.push(f);else{groups.push({masters:[f],fol:[],act:'walk'})}});
 groups.forEach(g=>{const a=g.act;g.cap=CAP3[a]||(window.ACT95&&ACT95[a]?'Đang '+ACT95[a]:(typeof ACT95!=='undefined'&&ACT95[a]?'Đang '+ACT95[a]:'Đang dạo vườn'));if(g.masters.length>1&&a==='walk')g.cap='Đang chuyện trò';g.pri=g.masters.some(m=>m.p.kind==='emp')?9:g.masters.length});
 try{const me=document.querySelector('#mefig img,#mefig .figimg');window.__karMe=me?(me.currentSrc||me.src):figFor(S);window.__karMeAsp=me&&me.naturalWidth?me.naturalWidth/me.naturalHeight:.32}catch(e){}
 return {best,fh,groups,n:M.length,vp:window.__VPn,ids:Object.keys(R.P).filter(id=>R.P[id][best.kh]&&R.P[id][best.kh][0]==='vuon').join(' '),pp:ppl.length}};
