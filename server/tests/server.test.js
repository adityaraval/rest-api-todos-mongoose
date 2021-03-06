const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
var {app} = require('../server');
var {Todo} = require('../model/todo');

const todos = [
{
  _id:new ObjectID(),
  text:'first todo'
},{
  _id:new ObjectID(),
  text:'second todo'
}
];

beforeEach((done)=>{

  //Todo.remove().then(()=>done());
  Todo.remove().then(()=>{
    Todo.insertMany(todos);
  }).then(()=>done());

});

describe('POST /todos',()=>{

  it('should create new todo',(done)=>{
    var text = "Hey";

    request(app).
    post('/todos').
    send({text:text}).
    expect(200).
    expect((res)=>{
      expect(res.body.text).toBe(text);
    }).
    end((err,res)=>{
      if(err){
        return done(err);
      }

      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>done(e));

    });
  });

  it('should not create todo with invalid body data',(done)=>{

    request(app).
    post('/todos').
    send({}).
    expect(400).
    end((err,res)=>{
      if(err){
        return done(err)
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>done(e));
    });

  });

});


describe('GET /todos',()=>{

  it('should get all todos',(done)=>{
    request(app).
    get('/todos').
    expect(200).
    expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    }).
    end(done);
  });
});


describe('GET /todos/:id',()=>{
  it('should return specific todo',(done)=>{
    request(app).
    get(`/todos/${todos[0]._id.toHexString()}`).
    expect(200).
    expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    }).
    end(done);
  });

  it('should return 404 if todo not found',(done)=>{
      var hexID = new ObjectID().toHexString();
      request(app).
      get(`/todos/${hexID}`).
      expect(404).
      end(done);
  });

  it('should return 404 if non-Object id is passed',(done)=>{
    request(app).
    get('/todos/123').
    expect(404).
    end(done);
  });

});




describe('DELETE /todos/:id',()=>{
  it('should return deleted todo',(done)=>{
    var hexID = todos[1]._id.toHexString();
    request(app).
    delete(`/todos/${hexID}`).
    expect(200).
    expect((res)=>{
      expect(res.body.todo._id).toBe(hexID);
    }).
    end((err,res)=>{
      if(err){
        done(err);
      }
      Todo.findById(hexID).then((todo)=>{
        expect(todo).toNotExist();
        done();
      }).catch((e)=>done(e));
    });
  });

  it('should return 404 if todo not found',(done)=>{
      var hexID = new ObjectID().toHexString();
      request(app).
      delete(`/todos/${hexID}`).
      expect(404).
      end(done);
  });

  it('should return 404 if non-Object id is passed',(done)=>{
    request(app).
    delete('/todos/123').
    expect(404).
    end(done);
  });

});


describe('PATCH /todos/:id',()=>{
    it('should update the todo',(done)=>{
      var id = todos[0]._id.toHexString();
      var text='heyyaaa';

      request(app).
      patch(`/todos/${id}`).
      send({
        completed:true,text
      }).
      expect(200).
      expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      }).end(done);
    });

    it('should clear completedAt when completed is false',(done)=>{
      var id = todos[1]._id.toHexString();
      var text='heyyaaa';

      request(app).
      patch(`/todos/${id}`).
      send({
        completed:false,text
      }).
      expect(200).
      expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      }).end(done);
    });
});
