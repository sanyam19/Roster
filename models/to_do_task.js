/* require mongoose to create the schema */
const mongoose= require('mongoose');
/* to create a schem */
const to_do_task_Schema = new mongoose.Schema({
        Description:{
            type:String
        },
        Category:{
            type:String
        },
        /* date we don`t want to show as 01/16/21, instead we want Jan 16, 2021 */
        /* so we`ll take type Date instead of String */
        Due_Date:{
            type:Date
        }
});

/* since we`ve created our schema, now we need to tell name of collection which`ll be using our schema  */
const to_do_task = mongoose.model('to_do_task', to_do_task_Schema);
/* finally just need to export this */
module.exports=to_do_task;
/* to start using this schema, in index.js we`ll just use require */