const mongodb=require('mongodb').getDb;

class Product{

constructor(title,price,description,imageUrl,id){
this.title=title;
this.price=price;
this.description=description;
this.imageUrl=imageUrl;
this._id=id;
}
save(){
    const db=getDb();
   let dbOp;
    if(this._id){
      dbOp=db.collection('products').updateOne({});

    }


    else{

    dpOp=db.collection('products').insertOne(this);

    }

    return dpOp
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
       console.log(err);
    });
}
static fetchAll(){
    return db.collection('products').
    find().
    toArray().
    then(products =>{
    console.log(products);
    return products;
    })
    .catch(err =>{
    console.log(err);
    });
}


static deleteById(prodId){

const db=getDb();

return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)}).then();
}

}
module.exports=Product;