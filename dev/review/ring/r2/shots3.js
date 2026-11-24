const {open,place,inject}=require('./r2');const fs=require('fs');
const STJ=fs.readFileSync('/tmp/claude-0/ring/states.js','utf8');
const BGU='https://ctm-img.victoria-tntt.workers.dev/img/ngu-hoa-vien.webp';
const MODES={
 G:{place:'vuon',title:'Hoa nở bốn mùa.',cfg:d=>`({mode:'G',groups:SCEN.G9(),fh:${d==='fold'?400:430},depth:${d==='fold'?120:150},rxk:.82,fitw:.98,plateBelow:78})`,states:['idle','turned','alert','open','open4','person','person2','approach','appr95']},
 S:{place:'vuon',title:'Hoa nở bốn mùa.',cfg:d=>`({mode:'S',groups:SCEN.G9(),fh:400,hS:${d==='fold'?300:340},gap:${d==='fold'?50:60},bg:'${BGU}',plateBelow:78,strip:1})`,states:['idle','turned','alert','open','open4','person','person2','approach','appr95']},
 R:{place:'kn',title:'',cfg:d=>`({mode:'R',groups:SCEN.R12(),fh:${d==='fold'?400:430},depth:${d==='fold'?120:150},rxk:.82,fitw:.98,plateBelow:78,tags:true,scimg:'https://ctm-img.victoria-tntt.workers.dev/img/kc-sanh.webp'})`,states:['idle','turned','approach','appr95']}};
(async()=>{const want=(process.argv[2]||'G').split(','),out=process.argv[3]||'shots3',devs=(process.argv[4]||'fold,ipad').split(',');fs.mkdirSync(out,{recursive:true});
 for(const dev of devs){const {srv,b,pg,g}=await open(dev,2);await inject(g);await g.evaluate(STJ);
  for(const mode of want){const M=MODES[mode];await place(g,M.place,M.title);await g.evaluate(cfg=>KRR.init(eval(cfg)),M.cfg(dev));
   for(const state of M.states){await g.evaluate(([m,s])=>ST(m,s),[mode,state]);await pg.waitForTimeout(1800);
    await pg.screenshot({path:`${out}/${mode}-${dev}-${state}.png`});console.log('ok',mode,dev,state)}
   await g.evaluate(()=>{document.querySelectorAll('.kscn').forEach(e=>e.remove());document.body.classList.remove('kscn-on')})}
  await b.close();srv.close()}
})().catch(e=>{console.error(e);process.exit(1)});
