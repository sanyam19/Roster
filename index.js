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


/* Our App will be having only one page ie the homepage */
app.get('/', function (req, res){

    /* we`ll be fetching all the todo tasks from the database to reflect on the homepage*/
    /* this find function goes to the database and executes the query */
    to_do_tasks.find({}, function (err, to_do_task){
        /* second argument here "to_do_task" means all the todo tasks which have been found */
        
        /* if error*/
        if(err){
            console.log('Error in fetching the todo tasks from db !!');
            return;
        }
        /* if not, then rendering our webpage*/
        return res.render('home.ejs', {
            title : "Roster To-Do App",
            to_do_task_list : to_do_task,
            /* now this to_do_task_list is linked to the database,  no change needed in home.ejs file */
        });
    });
});

/* Whenever form submits some data, it should be coming over here */
/* since the method is post, so`ll use app.post() */

/* for creating a todo task */
app.post('/create-to_do_task',function(req, res){
    /* creating in the database */
    /* we are getting 3 inputs from the user ie Description, Category & Due_Date which we have defined in the Schema in to_do_task.js, now which can be accessed through req.body */
    to_do_tasks.create(req.body, function(err, new_task){
        /* on getting an error */
        if (err){ 
            console.log('Error in creating a todo task !!');
            return;
        }
        /* that means todo task is created, but also need to redirect back to the previous page */
        return res.redirect('back');
    });
});

/* for deleting a todo task */
/* we can also delete multiple todo tasks from the database at once by concatenating the IDs in query param */

app.get('/delete-to_do_tasks/', function(req, res){
    
    /* let`s have an array which will contain all the IDs of our todo tasks  */
    /* we`ll be getting the IDs(each of them will be unique) from the query in the url  */
    
    /* creting a dynamic array */
    let IDs = new Array();
    /* iterating through each id in req.query and pushing it to the array */
    for(let i in req.query){
        // console.log(i);
        IDs.push(req.query[i]);
    }
    /* finally, the IDs have been stored in the array */
    /* now our task is to find the todo task in the database using ID and then delete it */
    /* delete parameter is prebuilt, which takes ID */

    /* since we are deleting multiple IDs in mongoose, we`ll be using deleteMany() */
    /* Reference : Stackoverflow  url: https://stackoverflow.com/questions/57105883/how-to-delete-multiple-ids-in-mongoose/57106403*/
    
    /* here, for the particular ID, $in will fing that id in the IDS array and delete it from database  */
    to_do_tasks.deleteMany({_id : {$in:IDs}},function(err){   
        /* on getting error */
        if(err){
            console.log('Error in deleting todo task/tasks from database !!');
            return;
        }
        /* it means multiple tasks have been deleted, now we`ve to redirect back to the previous page */
        return res.redirect('back');
    })
});

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