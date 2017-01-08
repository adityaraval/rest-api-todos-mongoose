const mongodb = require('mongodb');
const {MongoClient,ObjectID} = mongodb;

/*
var objID = new ObjectID();
console.log(objID);
*/

MongoClient.connect("mongodb://localhost:27017/todoApp",(err,db)=>{
  if(err){
    console.log("Unable to connect mongo server",err)
  }else{
    console.log("Connected to mongo server");
  }

db.collection('Users').insertOne({
  name:"Aditya",
  age:22,
  location:"Sihor"
},(err,result)=>{
  if(err){
    console.log("Unable to insert User",err)
  }else{
    console.log("User added",JSON.stringify(result.ops,undefined,2))
  }
})


db.collection('Todos').insertOne({
  text:'ABCD',
  completed:false
},(err,result)=>{
  if(err){
    console.log("Unable to insert into collection");
  }else{
    console.log("Record inserted",JSON.stringify(result.ops,undefined,2))
    //displays timestamp when that specific ObjectID is created
    //console.log(result.ops[0]._id.getTimestamp())
  }

});

  db.close();
})
