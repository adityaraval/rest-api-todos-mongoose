const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoLAB url -->> mongodb://abcd:abcd@ds157298.mlab.com:57298/todoapp
mongoose.connect(process.env.MONGODB_URI);


module.export = {mongoose:mongoose};
