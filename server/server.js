var env = process.env.NODE_ENV || 'development';

if(env==='development'){
  process.env.PORT=3000;
  process.env.MONGODB_URI='mongodb://localhost:27017/todoAPI';
}else if(env==='test'){
  process.env.PORT=3000;
  process.env.MONGODB_URI='mongodb://localhost:27017/todoAPITest';
}

const {ObjectID} =  require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');
var {authenticate} = require('./middleware/authenticate');


const app = express();
const port = process.env.PORT || 3000;

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
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

    Todo.findById(id).then((todo)=>{
        if(!todo){
          return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
      res.status(400).send();
    });

});


app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
      res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo)=>{
      if(!todo){
        res.status(404).send();
      }
      res.send({todo});
    }).catch((e)=>{
      res.status(400).send();
    });
});


app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
      res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
    }else{
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e)=>{
      res.status(400).send();
    });

});


//signup user
app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then( () => {
      return user.generateAuthToken();
  }).then((token)=>{
      res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});


app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
});

app.listen(port,()=>{
  console.log("Listening on:",port);
})

module.exports = {app}
