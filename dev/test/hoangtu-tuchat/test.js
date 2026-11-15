/* review/hoangtu-tuchat: tư chất vs hiền tài, public kin card, child stranger rule; usage: node test.js WxH outdir */
const {open,clean}=require('./harness');const fs=require('fs');
const [W,H]=process.argv[2].split('x').map(Number);const OUT=process.argv[3];fs.mkdirSync(OUT,{recursive:true});const tag=`${W}x${H}`;
const meas=p=>p.evaluate(()=>{const P=document.getElementById('panel');const txt=P?P.innerText:'';
 const cut=[...document.querySelectorAll('#panel *')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(getComputedStyle(e).overflowX)).slice(0,5).map(e=>e.className+':'+e.textContent.slice(0,30));
 const card=P.querySelector('.pc');const port=card?[...card.querySelectorAll('.pcl img')].map(i=>i.getAttribute('src')||''):[];
 return {ovf:document.documentElement.scrollWidth>innerWidth+1,cut,bad:/undefined|NaN|\[object|%/.test(txt),silCard:port.some(s=>/unknown-k/.test(s)),faceCard:port.some(s=>/face-|por-|kid/.test(s)&&!/unknown/.test(s)),
  strip:[...P.querySelectorAll('.pface')].map(b=>({n:b.textContent.trim().slice(0,20),sil:!!b.querySelector('img[src*="unknown-k"]')})),info:(card&&card.querySelector('.pcl')||{}).innerText||'',right:(card&&card.querySelector('.pcr')||{}).innerText||''}});
const go=async(p,t,i,n)=>{await p.evaluate(([t,i])=>{tab=t;PG[t]=i;render()},[t,i]);await p.waitForTimeout(900);await clean(p);await p.waitForTimeout(300);if(n)await p.screenshot({path:`${OUT}/${tag}-${n}.jpg`,type:'jpeg',quality:70});return meas(p)};
const RES={tag,checks:{}};const ok=(k,v,d)=>{RES.checks[k]=v?'ok':'FAIL '+JSON.stringify(d||'').slice(0,300)};
(async()=>{
 /* ---- A. a new life ---- */
 let {b,p,errs}=await open(W,H);
 const st=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const R=rivals.filter(v=>v.alive&&!v.out);
  birthP(S,true);const nb=S.kids[S.kids.length-1];
  const k7=mkKid('m',7);S.kids.push(k7);k61Know([k7],'',true,3);
  birthP(R[0],true);const rn=R[0].kids[R[0].kids.length-1];const r7=mkKid('m',7);R[1].kids.push(r7);const Rv=R.slice(2).find(v=>palaceOf(v)!=='home')||R[2];const r5=mkKid('f',5);Rv.kids.push(r5);
  for(let i=0;i<2;i++){try{monthTick()}catch(e){console.error(e)}Q.length=0}
  /* meet R[2]'s child by a visit to her palace */
  const before=k61St(r5);used=0;S.suc=100;S.confined=0;S.place='home';window.__accSilent=1;window.__accStay=1;try{goTo(palaceOf(Rv))}catch(e){}window.__accSilent=0;window.__accStay=0;Q.length=0;const at=S.place===palaceOf(Rv);
  return {nb:nb.name,k7:k7.name,rn:rn.name,r7:r7.name,r5:r5.name,r5before:before,r5after:k61St(r5),at,nbSt:k61St(nb),nbTc:nb.tc!=null,nbStats:[nb.tv,nb.tw,nb.td].map(Math.round),k7h:ktHien(k7),
   kids:S.kids.map(k=>k.name),kin:allKids().filter(x=>x[1]).map(([k])=>k.name)}});
 RES.state=st;
 ok('newborn stats near 0',st.nbStats.every(x=>x<=3),st.nbStats);ok('own newborn known from birth',st.nbSt===3,st.nbSt);ok('visit meets the child',st.r5before===0&&st.r5after>=1,[st.r5before,st.r5after,st.at]);
 const ki=n=>st.kids.indexOf(n);
 let m=await go(p,'kid',ki(st.nb),'kid-newborn');
 const hasNum=s=>/(Tư chất|Hiền tài|Văn|Võ|Đức)\s*:?\s*\d/.test(s);
 ok('newborn: no talent numbers',!hasNum(m.info)&&/còn nhỏ, chưa rõ/.test(m.info),m.info);ok('newborn: own face',!m.silCard,m);
 m=await go(p,'kid',ki(st.k7),'kid-7tuoi');ok('7-year-old: Hiền tài number',/Hiền tài\s*\d+/.test(m.info),m.info);RES.k7=m.info.replace(/\s+/g,' ').slice(0,300);
 /* Trong cung: strip by mother; unmet = silhouette */
 m=await go(p,'kin',0,null);const L=m.strip;RES.kinStrip=L;
 const idx=n=>L.findIndex(x=>n.includes(x.n.replace(/^.*\s/,'')));
 const iRn=await p.evaluate(n=>{const L=[];for(const v of rivals){const ks=(v.kids||[]).filter(k=>k.alive);ks.sort((a,b)=>b.age-a.age).forEach(k=>L.push(k.name))}return L},null);
 const pos=n=>iRn.indexOf(n);
 m=await go(p,'kin',pos(st.r7),'kin-unmet');ok('unmet 7yo: silhouette card',m.silCard,m);ok('unmet: strip silhouette',m.strip[pos(st.r7)]&&m.strip[pos(st.r7)].sil,m.strip);
 ok('kin right pane: public facts',/Cả cung đều biết/.test(m.right)&&/thứ bậc/i.test(m.right)&&/nuôi dạy/i.test(m.right)&&/tuổi/i.test(m.right),m.right);
 ok('kin: no private numbers',!/(Văn|Võ|Đức|Hiền tài|Tư chất)\s*\d/.test(m.info+m.right),m.info);
 m=await go(p,'kin',pos(st.r5),'kin-met');ok('met child: real face',!m.silCard,m);
 m=await go(p,'kin',pos(st.rn),'kin-newborn');ok('other newborn: silhouette',m.silCard,m);
 m=await go(p,'kvo',0,'kevi');const kvS=m.strip;ok('Kế vị strip: unmet sons silhouettes',kvS.some(x=>x.sil),kvS);
 const kvt=await p.evaluate(()=>{const o=kvOrder();return o.map((x,i)=>({i,n:x.k.name,a:x.k.age,mine:!x.v}))});for(const x of kvt){const mm=await go(p,'kvo',x.i,null);x.txt=(mm.info+' '+mm.right).replace(/\s+/g,' ')}RES.kvo=kvt;
 ok('Kế vị: no Hiền tài under 6',kvt.filter(x=>x.a<6).every(x=>!/Hiền tài\s*:?\s*\d|Lập hiền/.test(x.txt)),kvt);
 for(const x of kvt.filter(x=>x.a<6).slice(0,1)){m=await go(p,'kvo',x.i,'kevi-nho');ok('Kế vị card under 6: no numbers',!/(Văn|Võ|Đức|Hiền tài)\s*:?\s*\d/.test(m.info+m.right),m.info+m.right)}
 for(const t of ['hon','qt']){m=await go(p,t,0,t)}
 RES.overflowA=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 RES.errsA=errs.slice();await b.close();
 /* ---- B. an old save (made by the main build before this branch) ---- */
 ({b,p,errs}=await open(W,H));const d=fs.readFileSync((process.env.OLDSAVE||__dirname+'/old-save.json'),'utf8');
 await p.evaluate(d=>{localStorage.setItem(SK(2),d);deser(JSON.parse(d));SLOT=2;document.getElementById('title').hidden=true;try{render()}catch(e){console.error(e)}},d);await p.waitForTimeout(1500);await clean(p);
 const ob=await p.evaluate(()=>{ktSyncAll();return allKids().map(([k,v])=>({n:k.name,a:k.age,mine:!v,tcv:k.tcv,tc:k.tc,s:[k.tv,k.tw,k.td].map(Math.round),h:ktHien(k),known:k61St(k)}))});RES.old=ob;
 ok('old save: every child migrated',ob.every(k=>k.tcv===1&&k.tc>=5&&k.tc<=95),ob);ok('old save: infants near 0',ob.filter(k=>k.a<=1).every(k=>Math.max(...k.s)<=12),ob.filter(k=>k.a<=1));
 ok('old save: other mothers children unmet',ob.filter(k=>!k.mine).every(k=>k.known===0)&&ob.filter(k=>k.mine).every(k=>k.known===3),ob);
 const oi=ob.filter(k=>k.mine).findIndex(k=>k.a<=1);m=await go(p,'kid',oi,'old-kid');ok('old save: infant shows no numbers',!hasNum(m.info),m.info);
 m=await go(p,'kin',0,'old-kin');ok('old save: kin silhouette',m.silCard,m);
 RES.errsB=errs.slice();ok('0 page errors',!RES.errsA.length&&!RES.errsB.length,[RES.errsA,RES.errsB]);ok('no horizontal overflow',!RES.overflowA&&!m.ovf);
 console.log(JSON.stringify(RES));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
