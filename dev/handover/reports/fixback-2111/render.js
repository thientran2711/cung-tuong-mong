/* render fixback.html to PDF: node render.js <work dir>/fixback.html <out.pdf> */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const [,,src,out]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:900}});
 await p.goto('file://'+path.resolve(src),{waitUntil:'load',timeout:300000});
 await p.pdf({path:out,width:'1800px',height:'900px',printBackground:true,preferCSSPageSize:true});await b.close();console.log('pdf',out)})();
