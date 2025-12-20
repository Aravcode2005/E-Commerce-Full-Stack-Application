const http=require('http');
const app=http.createServer((req,res)=>{

    const url=req.url;
    const method=req.method;

if(url==='/'){
res.setHeader('Content-Type','text/html');
res.write('<html>');
res.write('<head><title>My first page</title><head>');
res.write('<body> <form action ="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
res.write('</html>');
return res.end();
    }
});
console.log('http://localhost:3000')
app.listen(3000);