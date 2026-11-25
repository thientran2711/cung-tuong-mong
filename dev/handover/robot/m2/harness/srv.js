const http=require('http'),fs=require('fs'),path=require('path');
const root='/home/user/cung-tuong-mong';
http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';const f=path.join(root,u);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css','.webmanifest':'application/manifest+json'};r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})}).listen(8123);
