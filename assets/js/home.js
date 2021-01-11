/* Handling the click on delete button */

/* fetching the delete button */
var delete_btn = document.querySelector('#two-buttons>a');
/* now handling click event */
delete_btn.addEventListener('click', function(){
    /* when clicked delete it should delete the todo tasks we checked for deletion */
    /* since we want to delete multiple tasks at once, so we`ll be needed those all IDs which we checked*/

    /* creating a dynamic array for storing IDs of the checked todo */
    let IDs=new Array();
    /* now we want all the tasks which has checkbox (whether checked or unchecked ) */
    var All_To_do_Tasks = document.querySelectorAll('input[type="checkbox"]');
    for(let i of All_To_do_Tasks){
        /* whether particular task is checked or not */
        if(i.checked){
            /* if checked then fetch the id correspoding to each task and push it in the array */
            IDs.push(i.getAttribute('id'));
        }
    }
    /* now finally we`ve all the checked todo task`s IDs in the array */
    /* now we need to manipulate the query param by concatenating all these checked IDs, so it can be deleted at once */
    manipulator(IDs);
})

function manipulator(IDs)
{
    /* what we`ll do here is, since we`ve used anchor tag for delete button, but didn`t mention the value of href there, 
    we`ll put the maniulated value of the query param (which will be used to delete) in the href*/

    /* we know to delete multiple task the query param should look like this "/delete-tasks/?id0=...&id1=...&..." */ 
    var manipulated_string="/delete-to_do_tasks/?"
    /* we need to concatenating in this manipulated_string */
    let i=0;
    for(let ID of IDs){
        manipulated_string += "id" + i + "=" +ID + "&";
        i++;
    }
    /* need to remove the last char "&" of the manipulated_string*/
    manipulated_string = manipulated_string.substr(0,manipulated_string.length-1);
    /* now finally we`ve the manipulated string just need to give this query param value to the href of anchor tag of delete button */

    /* fetching the delete button */
    var delete_btn = document.querySelector('#two-buttons>a');
    /* now setting the value to the attribute href */
    delete_btn.setAttribute('href', manipulated_string);
}

/* date handler function */ 
/* currently type: Date gives it in the form "Sat Jan 02 2021 00:00:00 GMT+0530 (India Standard Time)" , we need to snip this string upto year value*/
// fetching all the date of the tasks
var All_To_do_Tasks_Date = document.querySelectorAll('.date_handling');
for(let i of All_To_do_Tasks_Date){
    /* converting the date to the string and snipping */
    i.innerText = i.innerText.toString().substring(0, 18);
}


