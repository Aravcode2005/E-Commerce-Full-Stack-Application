
const http = require('http');
const routes=require('./routes');

const app=http.createServer(routes);

console.log('http://localhost:3000')
app.listen(3000);