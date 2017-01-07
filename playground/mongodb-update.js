const mongodb = require('mongodb');
const {MongoClient,ObjectID} = mongodb;

MongoClient.connect("mongodb://localhost:27017/todoApp",(err,db)=>{
  if(err){
    console.log("Unable to connect mongo server",err)
  }else{
    console.log("Connected to mongo server");
  }

  //findOneAndUpdate
/*
  db.collection('Todos').findOneAndUpdate({
    _id:new ObjectID('587136a26be49b91c7eab433')
  },{
    $set:{
        completed:false
    }
  },{
    returnOriginal:false
  }).then((success)=>{
    console.log(success)
  })
*/

  db.collection('Users').findOneAndUpdate({
    _id:new ObjectID('58712d0bd17d9b11ea8be183')
  },{
    $set:{
      name:'Adi'
    },
    $inc:{
      age:1
    }
  },{
    returnOriginal:false
  }).then((success)=>{
    console.log(success)
  })

  db.close();
});
