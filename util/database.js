const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
let _db;
const mongoConnect=(callback)=>{
MongoClient.connect('mongodb+srv://aravlead_db_user:ze7zntiuuNDhaSEL@cluster0.aohmc17.mongodb.net/shop?appName=Cluster0')
.then(result=>{
    console.log('Connected!');
    _db=client.db()
    callback(result);
})
.catch(err=>{
console.log(err);
throw err;
});
};

module.exports=mongoConnect;

const getDb=()=>{

if(_db){

    return _db;
}
throw 'No database found!';

}

exports.getmongoConnect=mongoConnect;

exports.getDb=getDb;

