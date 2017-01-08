const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://abcd:abcd@ds157298.mlab.com:57298/todoapp');


module.export = {mongoose:mongoose};
