const mongodb = require('mongodb');
const {MongoClient,ObjectID} = mongodb;

MongoClient.connect("mongodb://localhost:27017/todoApp",(err,db)=>{
  if(err){
    console.log("Unable to connect mongo server",err)
  }else{
    console.log("Connected to mongo server");
  }

  //deleteMany
  /*
    db.collection('Todos').deleteMany({text:'ABCD'}).then((success)=>{
      console.log(success)
    },(err)=>{
      console.log("Unable to delete item",err)
    });
    */

    /*
   db.collection('Users').deleteMany({name:'Aditya'}).then((success)=>{
     console.log(success);
   })
   */


  //deleteOne
  /*
  db.collection('Todos').deleteOne({text:'ABCD'}).then((success)=>{
    console.log(success)
  },(err)=>{
    console.log(err)
  })
  */

  //findOneAndDelete
  /*
  db.collection('Todos').findOneAndDelete({completed:true}).then((result)=>{
    console.log(result)
  },(err)=>{
      console.log(err)
  })
  */

  db.collection('Users').findOneAndDelete({_id:new ObjectID('58712da34ab21f1279b085e7')}).then((success)=>{
    console.log(success);
  })

  db.close();
});
