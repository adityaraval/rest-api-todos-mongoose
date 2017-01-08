const {ObjectID} =  require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');


const app = express();

app.use(bodyParser.json());

//post todo
app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
});

//get all todos
app.get('/todos',(req,res)=>{

  Todo.find().then((todos)=>{
    res.send({todos:todos});
  },(err)=>{
    res.status(400).send(err);
  });
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(ObjectID.isValid(id)){

    Todo.findById(id).then((todo)=>{
        if(!todo){
          return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
      res.status(400).send();
    });

  }else{
    res.status(404).send();
  }
});

app.listen(3000,()=>{
  console.log("Listening on 3000")
})

module.exports = {app}
