var {User} = require('../model/user');


//auth middleware
var authenticate = (req,res,next) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user)=>{
    if(!user){
      return new Promise.reject();
    }
    req.user =user;
    req.token =token;
    next();
  }).catch((e)=>{
    res.status(401).send();
  });
};

module.exports = {authenticate};
