/* we require express */
const express = require('express');
/* our express server will be running on this port*/
const port = 8000;

/* firing-up the express so as to get all the functionalities in the app */
const app = express()

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