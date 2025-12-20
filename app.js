const http=require('http');

const app=http.createServer((req,res)=>{


console.log(res);

});
console.log('http://localhost:3000')
app.listen(3000);