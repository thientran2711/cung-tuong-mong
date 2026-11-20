/* road-onecore-emit: prints the BAL.road.fx lines (one chapter per line, beats in source order) from the JSON table that
   dev/measure/road-onecore-move.js wrote. Paste them inside BAL.road.fx in dev/build/jbalroad.js.
   usage: node dev/measure/road-onecore-emit.js <table.json> [prefix…]  */
const fs=require('fs');const [tj,...pre]=process.argv.slice(2);const {table}=JSON.parse(fs.readFileSync(tj,'utf8'));
const lit=v=>Array.isArray(v)?'['+v.map(lit).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).map(k=>(/^[A-Za-z_$][\w$]*$/.test(k)?k:JSON.stringify(k))+':'+lit(v[k])).join(',')+'}':JSON.stringify(v);
for(const id of Object.keys(table)){if(pre.length&&!pre.some(p=>id.startsWith(p)))continue;console.log(' '+id+':'+lit(table[id])+',')}
