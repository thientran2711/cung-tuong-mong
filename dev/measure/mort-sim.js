/* review/mortality: node Monte Carlo of the lifespan model alone (BAL.mort from jbal2.js + the CORE of jmort.js; nothing else of the game).
   usage: node dev/measure/mort-sim.js [lives=20000] [power=50]
   Prints: her lifespan-or-accident death within 5 / 10 / 20 years; Emperor death per decade by cause (lifespan / plot / accident) for the
   main start (age 20–33) and the palace-start (19–24, S.reign.power 30); Thái hậu alive after 5 / 10 / 20 years; children dying before 6.
   Illness, childbirth, punishment and poison by people are game rules on top: measured by the browser bots (mort-bots.md). */
const fs=require('fs'),path=require('path'),B=path.resolve(__dirname,'../build/');
const bal=fs.readFileSync(B+'/jbal2.js','utf8');const m=bal.slice(bal.indexOf('BAL.mort={'));const J=fs.readFileSync(B+'/jmort.js','utf8');
const core=J.slice(J.indexOf('/*CORE{*/'),J.indexOf('/*}CORE*/'));
const BAL={};eval(m.slice(0,m.indexOf('};')+2));eval(core.replace(/function (\w+)/g,'globalThis.$1=function $1'));
const N=+process.argv[2]||20000,R=n=>Math.floor(Math.random()*n),roll=p=>Math.random()*100<p;const M=BAL.mort;
function her(years){let d=0;for(let i=0;i<N;i++){const a=18+R(3),t=mortRoll("me",a,M.life.floorMe);let dead=t<a+years;
 if(!dead)for(let y=0;y<years&&!dead;y++)if(roll(M.acc.me))dead=true;if(dead)d++}return d/N}
function emp(age0,power,years){const c={life:0,plot:0,acc:0,alive:0},byDec=[0,0];
 for(let i=0;i<N;i++){const a0=age0[0]+R(age0[1]),t=mortRoll("emp",a0,M.life.floorEmp),tm=1+R(12);let plot=null,died=null,mo=0;
  for(;mo<years*12&&!died;mo++){const age=a0+Math.floor(mo/12),month=1+mo%12;
   if((t-age)*12+(tm-month)<=0){died="life";break}
   if(roll(M.acc.emp/12)){died="acc";break}
   if(plot){if(--plot.mo<=0){plot=null;if(!roll(mortFoil(power))){died="plot";break}}}
   else for(const k of ["ass","poi"])if(roll(mortPlotY(k,power)/12)){plot={k,mo:M.emp.plotMo[0]+R(M.emp.plotMo[1])};break}}
  if(died){c[died]++;byDec[Math.min(1,Math.floor(mo/120))]++}else c.alive++}
 const f=x=>(100*x/N).toFixed(1)+"%";return {start:age0.join("+R"),power,years,dies:f(N-c.alive),lifespan:f(c.life),plot:f(c.plot),accident:f(c.acc),decade1:f(byDec[0]),decade2:f(byDec[1])}}
function th(years){let a=0;for(let i=0;i<N;i++){const ea=20+R(14),lo=Math.max(51,ea+18),hi=Math.max(lo,62),ag=lo+R(hi-lo+1);if(mortRoll("adult",ag,0)>=ag+years)a++}return (100*a/N).toFixed(1)+"%"}
function kid(){let d=0;for(let i=0;i<N;i++)if(mortRoll("kid",0,0)<10)d++;return (100*d/N).toFixed(1)+"%"}
const pw=+process.argv[3]||50;
console.log("her death by lifespan or accident within 5 / 10 / 20 years:",[5,10,20].map(y=>(100*her(y)).toFixed(1)+"%").join(" / "));
console.table([emp([20,14],pw,20),emp([19,6],30,20),emp([20,14],pw,10)]);
console.log("Thái hậu still alive after 5 / 10 / 20 years (lifespan only):",[5,10,20].map(th).join(" / "));
console.log("children dying before 10 (lifespan):",kid());
{const h={};for(let i=0;i<N;i++){const x=mortRoll("adult",18,0),b=x<30?"<30":x<40?"30-39":x<50?"40-49":x<60?"50-59":x<70?"60-69":x<=75?"70-75":">75";h[b]=(h[b]||0)+1}
 console.log("adult curve rolled at 18 (death age):",Object.entries(h).sort().map(([k,v])=>k+" "+(100*v/N).toFixed(1)+"%").join(" · "))}
