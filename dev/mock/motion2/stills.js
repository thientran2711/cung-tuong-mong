/* quick stills: node stills.js <outdir> <dev:fold|ipadAir> <scenario-file.js>  (scenario = async (f,p,shot)=>{...}) */
const B=require('./boot.js');const fs=require('fs'),path=require('path');
const [,,OUT,DEV,SCN]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const {b,p,f,srv,errs}=await B.open(DEV);for(const x of ['lib.js','m1.js','m2.js','m4.js'])if(fs.existsSync(path.join(__dirname,x)))await f.addScriptTag({content:fs.readFileSync(path.join(__dirname,x),'utf8')});
 const shot=async nm=>{await p.screenshot({path:path.join(OUT,`${nm}-${DEV}.png`)})};
 try{await require(path.resolve(SCN))(f,p,shot)}catch(e){console.log('ERR',e.message.slice(0,400))}
 console.log('pageerrors',errs.slice(0,4));await b.close();srv.close()})();
