/* mrfoot-scan (law 11 guard, MAIN 122 24/11): KIT 56.21 (jksize kszFootUp) moves a figure dialog's #mr buttons (#mclose «Tiếp theo», «Đã hiểu», ‹ Lui…)
   into .k3right>.k3foot. Every driver that presses a dialog's footer button must pick BOTH places: the one selector is MRFOOT below.
   usage: node dev/test/mrfoot-scan.js   → lists every dev/test|tools|measure file whose «#mr button» selector lacks «.k3foot button»; exit 1 if any. */
const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'../..');
const MRFOOT='#mr button,.k3foot button';module.exports={MRFOOT};
if(require.main===module){const bad=[],good=[];const walk=d=>{for(const f of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,f.name);if(f.isDirectory()){if(!/^(shots|owner-shots|node_modules)$/.test(f.name))walk(p)}else if(/\.(js|mjs)$/.test(f.name)&&p!==__filename){const s=fs.readFileSync(p,'utf8');
 const re=/(#modal )?#mr button((?::not\(\[[a-z]+\]\))*)/g;let m,n=0,b=0;while((m=re.exec(s))){n++;const tail=s.slice(m.index+m[0].length,m.index+m[0].length+60);if(!/^,\s*(#modal )?\.k3foot button/.test(tail))b++}
 if(n)(b?bad:good).push([path.relative(R,p),n,b])}}};for(const d of ['dev/test','dev/tools','dev/measure'])if(fs.existsSync(path.join(R,d)))walk(path.join(R,d));
 console.log(`drivers with «#mr button»: ${good.length+bad.length} · covering .k3foot: ${good.length} · stale: ${bad.length}`);for(const [f,n,b] of bad)console.log('STALE',f,`${b}/${n}`);process.exit(bad.length?1:0)}
