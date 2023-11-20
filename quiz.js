const model = {
    "results": 
    {
        "QUIZ1" : {
            "QuizName" : "Java",
            "Question1" :{
                "QuestionType": "multiple_choice",
                "Question": "What type of programming language is Java?",
                "Answers" : ["Imperative","Functional","Logical","Object-Oriented"],
                "Correct_Answer": "Object-Oriented",
                "Explanation": "With Java, you build your code around objects instead of logic."
            },
            "Question2" :{
                "QuestionType": "picture",
                "Question": "Which image shows the correct way to code the main method used in Java?",
                "Answers" : ["java_correct.png", "java_wrong.png"],
                "Correct_Answer": "java_correct.png",
                "Explanation": "In java the syntax for writing methods is (accesss_modifier) (static) (return_type) (method_name) (parameters). In the main method the acccess_modifier is publix, return type is void because nothing has to be returned, the method name is main, and the parameters are a string array of arguments which is what you write as your code"
            },
            "Question3" :{
                "QuestionType": "multiple_choice",
                "Question": "Which is the correct way to declare a constant variable in Java?",
                "Answers" : ["constant int num =4;","var int num =4;", "let int num =4;", "final int num =4;"],
                "Correct_Answer": "final int num =4;",
                "Explanation": "Var and let are used to declare variables in Javascript. Constant is typically seen in shorthand as 'const' in JS and C++. In Java we use 'final' to declare a variable that cannot be modified."

            },
            "Question4" :{
                "QuestionType": "multiple_choice",
                "Question": "What would you use the keyword 'super' for in Java?",
                "Answers" : ["To call the superclass constructor", "To refer to a variable", "To create a class", "To create a method"],
                "Correct_Answer": "To call the superclass constructor",
                "Explanation": "The superclass refers to the class from which a subclass inherits. To inherit from a class means you can use their methods or access thier fields. In order to access from a super class we use the 'super' keyword.",
            },
            "Question5" :{
                "QuestionType": "narrative",
                "Question": "Lets say you are working on a Java program and you have a class and its constructor (an object of the class). You also have variables declared before the constructor which are used within the parameters of the constructor. What keyword do you use to initialize the variable to equal the parameter?",
                "Answers" : ["that","this"],
                "Correct_Answer": "this"
            },
       }, 
        "QUIZ2" :{
            "QuizName" : "Web Dev",
            "Question1" :{
                "QuestionType" : "multiple_choice",
                "Question": "What does HTML stand for?",
                "Answers" : ["Hyper Tom Met Lug","Ha toy mot lo","WebDev is fun","Hypertext Markup Language"],
                "Correct_Answer": "Hypertext Markup Language",
                "Explanation": "HTML describes the structure of a web page and stands for Hypertext Markup Language"
            },
            "Question2" :{
                "QuestionType" : "multiple_choice",
                "Question": "What does the following picture output?",
                "picture": "webDevPic.png",
                "Answers" : [71,45,80,81],
                "Correct_Answer": "81"
            },
            "Question3" :{
                "QuestionType" : "picture",
                "Question": "Which picture correctly links a javascript file and css file to the html file?",
                "Answers" : ["html_incorrect.png", "html_correct.png"],
                "Correct_Answer": "html_correct.png"
            },
            "Question4" :{
                "QuestionType" : "multiple_choice",
                "Question": "What is the purpose of the 'querySelector' method in JavaScript",
                "Answers" : ["To select and modify HTML elements based on their class names","To create a class","To select and modify HTML elements based on their IDs","To query a server"],
                "Correct_Answer": "To select and modify HTML elements based on their IDs"
            },
            "Question5" :{
                "QuestionType" : "multiple_choice",
                "Question": "What do the following selectors mean in CSS? '.' , '#' , 'p'",
                "Answers" : ["class, ID, element","paragraph, class, html","period, hashtag, paragraph","semicolon, java, class"],
                "Correct_Answer": "class, ID, element"
            }
       }  
    }
  }

const appState = {
    Fname: "",
    currentQuiz: "",
    currentQuestionIndex: 0,
    questions_correct : 0,
    questions_wrong : 0,
    questions_answered: 0,
    totalQuestions: 0,
    userAnswer: "",
    currentQuestion: "",
    question_type: "",
    good_feedback: "Brilliant !!",
    final_grade: "",
};

document.addEventListener('DOMContentLoaded',function(){
        render_view(model, "#initial");
        //updates label and clears the name fields
        document.querySelector('#form').onsubmit=function(){

        appState.currentQuestionIndex =1;
        appState.Fname = document.querySelector('#Fname').value;
        document.querySelector('#label').innerHTML= `Welcome, ${Fname}! Good luck!`
        document.querySelector('#Fname').value='';
        document.querySelector('#Lname').value='';

        if(document.querySelector('#quiz_select').value === 'Quiz1'){
            console.log(appState.Fname);
            appState.currentQuiz = "QUIZ1";
            console.log(appState.currentQuiz);
            appState.totalQuestions = Object.keys(model.results.QUIZ1).filter(key => key.startsWith('Question')).length;
            console.log(appState.totalQuestions);
            appState.question_type = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`].QuestionType;
            create_question(appState.currentQuestionIndex);

            if(appState.question_type === 'multiple_choice'){
                render_view(model, "#multiple_choice")
            }else if(appState.question_type === 'picture'){
                render_view(model, "#picture")
            }else if(appState.question_type === 'narrative'){
                render_view(model, "#narrative")
            }

        }else if(document.querySelector('#quiz_select').value === 'Quiz2'){
            console.log(appState.Fname);
            appState.currentQuiz = "QUIZ2";
            console.log(appState.currentQuiz);
            appState.totalQuestions = Object.keys(model.results.QUIZ1).filter(key => key.startsWith('Question')).length;
            console.log(appState.totalQuestions);
            appState.question_type = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`].QuestionType;
            create_question(appState.currentQuestionIndex);

            if(appState.question_type === 'multiple_choice'){
                render_view(model, "#multiple_choice")
                console.log("view rendered");
            }else if(appState.question_type === 'picture'){
                render_view(model, "#picture")
            }else if(appState.question_type === 'narrative'){
                render_view(model, "#narrative")
            }
        }

        console.log("Form submitted");

        
        document.querySelector('#quiz_widget').onclick = (event) => {
            handle_answer(event);
        }
        

        return false; //prevents the DOM from reloading
    };

    
});

// const create_model = async () =>{
//         const data = await fetch (`https://my-json-server.typicode.com/miraclesanchez/CUS1172-FALL2023`);
//         const file = await data.json()
//         model = file;
//         console.log(model);
// }



const render_view =(model,view)=>{
    template_source = document.querySelector(view).innerHTML;
    var template = Handlebars.compile(template_source);
    var html_widget_element = template({...model, ...appState});

    document.querySelector("#quiz_widget").innerHTML = html_widget_element;

    // return html_widget_element;
}

const handle_answer = (event) =>{
    const radioButtons = document.querySelectorAll('input[name = "q2"]');
    radioButtons.forEach((radioButton) =>{
    radioButton.addEventListener('change', (event) => {
    appState.userAnswer = event.target.value;
    console.log(appState.userAnswer);
    });
    });

    const buttons = document.querySelectorAll('button[name = "button"]');
    buttons.forEach((buttons) =>{
    buttons.addEventListener('click', (event) => {
    appState.userAnswer = event.target.value;
    console.log(appState.userAnswer);
    });
    });

    if(event.target.dataset.answer == "submit" ||event.target.dataset.but==="1" || event.target.dataset.but==='2'){
        appState.questions_answered +=1;
        console.log(appState.questions_answered);
        appState.currentQuestion = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`];
        console.log(appState.userAnswer);
        
           
            const correctAnswer = appState.currentQuestion [`Correct_Answer`];
            console.log('correct: ' + correctAnswer);
            const type = appState.currentQuestion [`Question Type`];

            if(appState.userAnswer === correctAnswer){
                appState.questions_correct +=1;
                console.log('Questions Correct: '+appState.questions_correct);

                displayGoodMessage();

                setTimeout(()=> {
                                if(appState.currentQuestionIndex < appState.totalQuestions) {
                                appState.currentQuestionIndex +=1;
                                console.log(appState.currentQuestionIndex);
                                create_question(appState.currentQuestionIndex); 
                                }else if(appState.currentQuestionIndex === appState.totalQuestions){
                                    appState.final_grade = appState.questions_correct +"/" + appState.totalQuestions;
                                    console.log(appState.final_grade);
                                    render_view(model, "#final_results");
                                    console.log("done")
                                }
                            }, 1000);
                        
            }else if(appState.userAnswer != correctAnswer){
                appState.questions_wrong +=1;
                console.log('Questions Incorrect: '+appState.questions_wrong);
                displayBadMessage();

                    document.querySelector('#got_it').onclick = () =>{
                    if(appState.currentQuestionIndex < appState.totalQuestions) {
                    appState.currentQuestionIndex +=1;
                    console.log(appState.currentQuestionIndex);
                    create_question(appState.currentQuestionIndex); 
                    }else if(appState.currentQuestionIndex === appState.totalQuestions){
                        appState.final_grade = appState.questions_correct +"/" + appState.totalQuestions;
                        console.log(appState.final_grade);
                        render_view(model, "#final_results");
                        document.querySelector('#Back').onclick =(event) =>{
                            if(event.target.dataset.back === "Back"){
                                render_view(model, "#initial");
                            }
                        }
                        document.querySelector('#Retry').onclick = (event)=>{
                            if(event.target.dataset.retry === "Retry"){
                                    appState.currentQuestionIndex = 1;
                                    console.log("retry activated. CQI ="+appState.currentQuestionIndex);
                                    create_question(appState.currentQuestionIndex)
                            }
                        
                        }
                        console.log("done")
                }
                }

            } 
            
        
    }

}

const create_question = (index) => {
    appState.currentQuestion = model.results[appState.currentQuiz][`Question${index}`];
    console.log(appState.question_type)
    console.log(appState.currentQuestion)
    if(appState.currentQuestion.QuestionType === 'multiple_choice'){
        render_view(model, "#multiple_choice")
    }else if(appState.currentQuestion.QuestionType === 'picture'){
        render_view(model, "#picture")
    }else if(appState.currentQuestion.QuestionType === 'narrative'){
        handle_narrative();
        render_view(model, "#narrative")
        console.log("woop");
    }

    return appState.currentQuestion;
    
    
}


const displayGoodMessage = () => {
    render_view(model, '#good_feedback');
    setTimeout (() =>{
       
    }, 1000)
} 

const displayBadMessage = () =>{
    render_view(model, '#bad_feedback');
}

const handle_feedback = () =>{
    document.querySelector('#bad_feedback').onclick
}

const handle_narrative = (event) =>{
    const buttons = document.querySelectorAll('button[name = "button"]');
    buttons.forEach((buttons) =>{
    buttons.addEventListener('click', (event) => {
    appState.userAnswer = event.target.value;
    console.log(appState.userAnswer);
    });
    });
}





