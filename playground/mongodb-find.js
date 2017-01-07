const mongodb = require('mongodb');
const {MongoClient,ObjectID} = mongodb;

MongoClient.connect("mongodb://localhost:27017/todoApp",(err,db)=>{
  if(err){
    console.log("Unable to connect mongo server",err)
  }else{
    console.log("Connected to mongo server");
  }

/*
  db.collection('Todos').find({
    _id:new ObjectID('58712d0bd17d9b11ea8be184')
  }).toArray().then((result)=>{
    console.log(JSON.stringify(result,undefined,2))
  },(error)=>{
      console.log("Unable to fetch todos",error)
  })

  */

/* COUNT EXAMPLE

  db.collection('Todos').find({}).count().then((result)=>{
    console.log(`Todos count:${result}`)
  },(error)=>{
      console.log("Unable to fetch todos",error)
  })

*/

db.collection('Users').find({
  name:"Aditya"
}).toArray().then((result)=>{
  console.log(JSON.stringify(result,undefined,2))
},(error)=>{
  console.log("Unable to fetch results")
})

  db.close();
});
