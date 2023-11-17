const model = {
    "results": 
    {
        "QUIZ1" : {
            "QuizName" : "Java",
            "Question1" :{
                "QuestionType": "multiple_choice",
                "Question": "What type of programming language is Java?",
                "Answers" : ["Imperative","Functional","Logical","Object-Oriented"],
                "Correct Answer": "Object-Oriented"
            },
            "Question2" :{
                "QuestionType": "picture",
                "Question": "Which image shows the correct way to code the main method used in Java?",
                "Answers" : ["img/java_correct.png", "img/java_wrong.png"],
                "Correct Answer": "img/java_correct.png"
            },
            "Question3" :{
                "QuestionType": "multiple_choice",
                "Question": "Which is the correct way to declare a constant variable in Java?",
                "Answers" : ["constant int num =4;","var int num =4;", "let int num =4;", "final int num =4;"],
                "Correct Answer": "final int num =4;"
            },
            "Question4" :{
                "QuestionType": "multiple_choice",
                "Question": "What would you use the keyword 'super' for in Java?",
                "Answers" : ["To call the superclass constructor", "To refer to a variable", "To create a class", "To create a method"],
                "Correct Answer": "To call the superclass constructor"
            },
            "Question5" :{
                "QuestionType": "multiple_choice",
                "Question": "What would you use the keyword 'super' for in Java?",
                "Answers" : ["To call the superclass constructor", "To refer to a variable", "To create a class", "To create a method"],
                "Correct Answer": "To call the superclass constructor"
            },
            // "Question5" :{
            //     "QuestionType": "narrative",
            //     "Question": "Lets say you are working on a Java program and you have a class and its constructor (an object of the class). You also have variables declared before the constructor which are used within the parameters of the constructor. What keyword do you use to initialize the variable to equal the parameter?",
            //     "Answers" : ["that","this"],
            //     "Correct Answer": "this"
            // },
       }, 
        "QUIZ2" :{
            "QuizName" : "Web Dev",
            "Question1" :{
                "Question Type" : "multiple choice",
                "Question": "What is 2+3",
                "Answers" : [2,4,5,6],
                "Correct Answer": "4"
            },
            "Question2" :{
                "Question Type" : "multiple choice",
                "Question": "What is 2+3",
                "Answers" : [2,4,5,6],
                "Correct Answer": "4"
            },
            "Question3" :{
                "Question Type" : "multiple choice",
                "Question": "What is 2+2",
                "Answers" : [2,4,5,6],
                "Correct Answer": "4"
            },
            "Question4" :{
                "Question Type" : "multiple choice",
                "Question": "What is 2+2",
                "Answers" : [2,4,5,6],
                "Correct Answer": "4"
            },
            "Question5" :{
                "Question Type" : "multiple choice",
                "Question": "What is 2+2",
                "Answers" : [2,4,5,6],
                "Correct Answer": "4"
            }
       }  
    }
  }

const appState = {
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
    final_grade: 0,
};

document.addEventListener('DOMContentLoaded',function(){
        //updates label and clears the name fields
        document.querySelector('#form').onsubmit=function(){

        appState.currentQuestionIndex =1;
        let Fname = document.querySelector('#Fname').value;
        document.querySelector('#label').innerHTML= `Welcome, ${Fname}! Good luck!`
        document.querySelector('#Fname').value='';
        document.querySelector('#Lname').value='';

        if(document.querySelector('#quiz_select').value === 'Quiz1'){
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
            appState.currentQuiz = "QUIZ2";
            console.log(appState.currentQuiz);
            appState.totalQuestions = Object.keys(model.results.QUIZ2).filter(key => key.startsWith('Question')).length;
            console.log(appState.totalQuestions);
            appState.question_type = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`].QuestionType;
            console.log(appState.question_type);
            let qurstion = create_question(appState.currentQuestionIndex);
            console.log(qurstion);

            if(appState.question_type === 'multiple_choice'){
                render_view(model, "#multiple_choice")
            }else if(appState.question_type === 'picture'){
                render_view(model, "#picture")
            }else if(appState.question_type === 'narrative'){
                render_view(model, "#narrative")
            }
        }

        console.log("Form submitted");

        
        document.querySelector('#quiz_widget').onclick = (event) => {
            handle_answer(event);
        };

        return false; //prevents the DOM from reloading
    };

    
});


const render_view =(model,view)=>{
    template_source = document.querySelector(view).innerHTML;
    var template = Handlebars.compile(template_source);
    var html_widget_element = template({...model, ...appState});

    document.querySelector("#quiz_widget").innerHTML = html_widget_element;

    // return html_widget_element;
}

const handle_answer = (event) =>{
    
    if(appState.currentQuestion.QuestionType === "narrative"){
        handle_narrative(event);
    }else{

    const radioButtons = document.querySelectorAll('input[name = "q2"]');
    radioButtons.forEach((radioButton) =>{
    radioButton.addEventListener('change', (event) => {
    appState.userAnswer = event.target.value;
    console.log(appState.userAnswer);
    });
    });

    if(event.target.dataset.answer == "submit"){
        appState.questions_answered +=1;
        console.log(appState.questions_answered);
        appState.currentQuestion = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`];
        console.log(appState.userAnswer);
        
           
            const correctAnswer = appState.currentQuestion [`Correct Answer`];
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
                                    appState.final_grade = appState.questions_correct / appState.totalQuestions;
                                    console.log(appState.final_grade);
                                    render_view(model, "#final_results");
                                    console.log("done")
                                }
                            }, 1000);
                        
            }else if(appState.userAnswer != correctAnswer){
                appState.questions_wrong +=1;
                console.log('Questions Incorrect: '+appState.questions_wrong);
                displayBadMessage();

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
//     if(event.target.dataset.but == "1" ||event.target.dataset.but == "2" ){
//         appState.questions_answered +=1;
//         console.log(appState.questions_answered);
//         appState.currentQuestion = model.results[appState.currentQuiz][`Question${appState.currentQuestionIndex}`];
//         console.log(appState.userAnswer);

//         const correctAnswer = appState.currentQuestion [`Correct Answer`];
//             console.log('correct: ' + correctAnswer);
//             const type = appState.currentQuestion [`Question Type`];

//             if(appState.userAnswer === correctAnswer){
//                 appState.questions_correct +=1;
//                 console.log('Questions Correct: '+appState.questions_correct);

//                 displayGoodMessage();

//                 setTimeout(()=> {
//                                 if(appState.currentQuestionIndex < appState.totalQuestions) {
//                                 appState.currentQuestionIndex +=1;
//                                 console.log(appState.currentQuestionIndex);
//                                 create_question(appState.currentQuestionIndex); 
//                                 }
//                             }, 1300);
                        
//             }else if(appState.userAnswer != correctAnswer){
//                 appState.questions_wrong +=1;
//                 console.log('Questions Incorrect: '+appState.questions_wrong);
//                 displayBadMessage();

//             }
            
        
//     }
// }