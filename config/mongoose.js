/* required the library mongoose, so that express server can interact with database mongoDB */
const mongoose = require('mongoose');

/* connect to the database & using the params to ignore the deprecation warnings  */
mongoose.connect('mongodb://localhost/todo_list_db', {useNewUrlParser: true, useUnifiedTopology: true });

/* aquiring the connection to check whether it is successful or not*/
const db=mongoose.connection;

/* if connection error*/
db.on('error', console.error.bind(console, 'Error in connecting to the database !!'));

/* on successfully connecting with the database */
db.once('open', function(){
    /* we`re connected !! */
    console.log('Successfully connected to the database !!');
});