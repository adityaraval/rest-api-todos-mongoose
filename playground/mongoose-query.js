const {ObjectID} = require('mongodb');
const {Todo} = require('../server/model/todo');
const {mongoose} = require('../server/db/mongoose');

var id = '58722003d9c1d833e824e070';

if(!ObjectID.isValid(id)){
  console.log('Invalid ID');
}

/*
Todo.find({
  _id:id
}).then((todos)=>{
  console.log(todos);
},(err)=>{
  console.log(err);
});

Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log(todo);
},(err)=>{
  console.log(err);
});
*/

Todo.findById(id).then((todo)=>{
  if(todo===null){
    return console.log('ID not found')
  }
  console.log(todo)
  }).catch(e=>console.log(e))
