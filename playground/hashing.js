const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
/*
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});
*/
var hashed = '$2a$10$TfqcRHBqgLwdJG2GkZnooua/5AI3GG9qZHux5K0mf/vy1BPMAMOiG';
bcrypt.compare(password,hashed,(err,result)=>{
  console.log(result);
});

/*
var message = "Hello world";
var hash = SHA256(message).toString();
console.log(`Message:${message}`);
console.log(`Hash:${hash}`);
*/

/*
var data = {
  id:5
}

var token = jwt.sign(data,'abc123');
console.log(token)

var decoded = jwt.verify(token,'abc123');
console.log("Decoded",decoded)
*/
