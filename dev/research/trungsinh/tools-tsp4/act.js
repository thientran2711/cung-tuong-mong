// usage: node act.js 'js code using p (page)'
const {chromium}=require('playwright');
(async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:9333');const p=b.contexts()[0].pages()[0];
globalThis.F=require('fs');const f=new Function('p','return (async()=>{'+process.argv[2]+'})()');const r=await f(p);if(r!==undefined)console.log(typeof r==='string'?r:JSON.stringify(r));process.exit(0)})();
