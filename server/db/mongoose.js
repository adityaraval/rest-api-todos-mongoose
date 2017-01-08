const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoLAB url -->> mongodb://abcd:abcd@ds157298.mlab.com:57298/todoapp
mongoose.connect('mongodb://localhost:27017/todoAPI');


module.export = {mongoose:mongoose};
