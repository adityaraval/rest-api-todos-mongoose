const {ObjectID} = require('mongodb');
const {Todo} = require('../server/model/todo');
const {mongoose} = require('../server/db/mongoose');

var id = '587255b34e17f96f680315da';

/*
Todo.remove({}).then((result)=>{
  console.log(result);
});
*/

/*
Todo.findOneAndRemove({_id:id}).then((result)=>{
  console.log(result);
});
*/


Todo.findByIdAndRemove(id).then((result)=>{
  console.log(result);
});
