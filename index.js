/* we require express */
const express = require('express');
/* our express server will be running on this port*/
const port = 8000;

/* we need path for the views */
/* path is inbuilt module to node, so we did`nt require npm install */
const path = require('path');

/* configuring the database */
const db = require('./config/mongoose');
/*  our database model */
const to_do_tasks = require('./models/to_do_task');

/* firing-up the express so as to get all the functionalities in the app */
const app = express();
/* telling the expresss that our viewing engine/ template engine will be ejs */
app.set('view engine', 'ejs');

/* placing our views in the views folder */
/* instead of hard coded path, we can use current directory name */
app.set('views', path.join(__dirname,'views'));

/* middleware */
/* since our url encoded also wants to read query params, so we`ll pass extended is true */
app.use(express.urlencoded({
    'extended': true
}));
/* assets is the folder which will contain static files css, js , images */
app.use(express.static('assets'));

/* now we need to run the server */
app.listen(port, function(err){
    /* on getting an error */
    if (err){
        console.log('Error in running the server', err);
        return;
    }
    /* otherwise server is up and running */
    /* we can use interpolation i.e. embedding the variable inside the string */
        console.log(`Yup! My Express Server is up and running at port ${port}`);
});