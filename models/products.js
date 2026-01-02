const products=[];

module.exports=class{
constructor(title){
this.title=t;
}
save(){

  products.push(this);
}

static fetchAll(){

    return products;
}
}