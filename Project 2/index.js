document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#form').onsubmit=function(){

        //inputs into variables 
        let name = document.querySelector('#task_title').value;
        let priority = document.querySelector('#task_priority').value;
        let status = document.querySelector('#task_status').value;

        const task_arr=[name, priority, status];

        const li = document.createElement('li');

        let task_html = `
                <span>Task Title: ${name} <br> Priority: ${priority} <br> Status: ${status} </span>
                <br>
                <button class ="remove"> Remove </button>
                <button class="done"> Done </button>
                ` ;
        li.innerHTML = task_html;
        document.querySelector('#task_list').append(li);


        
    


        //clear the input fields
        document.querySelector('#task_title').value='';
        document.querySelector('#task_priority').value='';
        document.querySelector('#task_status').value='';

        return false; //this tells the browser that once we execute this code, the submit event will no longer be processed (page will not reload and items will be visible)

        
    }


    document.addEventListener('click', function(event){
        element = event.target;
        if(element.className === 'remove'){
            element.parentElement.remove();
        }
        if(element.className === 'done'){
            element.parentElement.querySelector('span').style.textDecoration = 'line-through';
            event.stopPropagation();
        }
    })
})
