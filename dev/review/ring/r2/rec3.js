const {boot}=require('/tmp/claude-0/ring/probe/boot');const {place,inject}=require('./r2');const fs=require('fs');
const STJ=fs.readFileSync('/tmp/claude-0/ring/states.js','utf8');const BGU='https://ctm-img.victoria-tntt.workers.dev/img/ngu-hoa-vien.webp';
const CFG={G:d=>`({mode:'G',groups:SCEN.G9(),fh:${d==='fold'?400:430},depth:${d==='fold'?120:150},rxk:.82,fitw:.98,plateBelow:78})`,S:d=>`({mode:'S',groups:SCEN.G9(),fh:400,hS:${d==='fold'?300:340},gap:${d==='fold'?50:60},bg:'${BGU}',plateBelow:78,strip:1})`,R:d=>`({mode:'R',groups:SCEN.R12(),fh:${d==='fold'?400:430},depth:${d==='fold'?120:150},rxk:.82,fitw:.98,plateBelow:78,tags:true,scimg:'https://ctm-img.victoria-tntt.workers.dev/img/kc-sanh.webp'})`};
const PL={G:['vuon','Hoa nở bốn mùa.'],S:['vuon','Hoa nở bốn mùa.'],R:['kn','']};
const JOBS=[['G','g1'],['G','g2'],['S','g1'],['S','g2'],['R','r']];
(async()=>{const dev=process.argv[2]||'fold';const DEV={fold:'fold',ipad:'ipadAir'};fs.mkdirSync('vid3',{recursive:true});
 const T0=Date.now();const LOG=[];const {srv,b,ctx,pg,g}=await require('./boot2')(DEV[dev]);
 await inject(g);await g.evaluate(STJ);
 const only=process.argv[3];for(const [mode,seq] of JOBS.filter(j=>!only||j[0]===only)){await place(g,...PL[mode]);await g.evaluate(c=>KRR.init(eval(c)),CFG[mode](dev));await pg.waitForTimeout(1500);
  const t0=Date.now()-T0;
  await g.evaluate(([s,m])=>SEQ[s](m),[seq,mode]);const t1=Date.now()-T0;LOG.push({mode,seq,t0:t0/1000,t1:t1/1000});console.log('done',mode,seq,t0/1000,t1/1000)}
 const v=pg.video();await ctx.close();await v.saveAs('vid3/all-'+dev+(process.argv[3]||'')+'.webm');fs.writeFileSync('vid3/all-'+dev+(process.argv[3]||'')+'.json',JSON.stringify(LOG));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
