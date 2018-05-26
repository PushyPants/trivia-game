$(document).ready(function(){

    let totalCorrect = 0;
    let totalIncorrect = 0;
    let currentQuestion = 0;
    let currentTime;
    let userAnswer;
    let answerState;
    let counter = 0;

    var questions = [
        {
            question: 'What is the distance from the earth to the Moon',
            choices: ['238,900 miles', '403,262 miles','45,000 miles','50,000 miles'],
            correctAnswer: '238,900 miles',            
        },
        {
            question: 'Which of these is not a fruit?',
            choices: ['banana','apple','orange','rock'],
            correctAnswer: 'rock',            
        }
    ]
    // setInterval(function(){
    //     counter++;
    //     $('#counter').text(counter);
    // },1000)

    $(".jumbotron").on("click", ".dQ", displayQuestion);
    
    //Create function to shuffle arrays. to be used in suffling the question order & also each questions answer order.
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    
    shuffleArray(questions);

    function evaluateAnswer() {
        $('#questionCard').on('click', 'h3', function() {
            console.log('You clicked: ' + $(this).text())
            console.log('Correct answer is: ' + questions[currentQuestion].correctAnswer)
            if ($(this).text() === questions[currentQuestion].correctAnswer){
                answerState = 'correct';
                totalCorrect++;
                console.log('You got it right!');
                console.log('answerState has been set to: ' + answerState);
                transitionScreen();
            } else {
                if ($(this).text() !== questions[currentQuestion].correctAnswer){
                answerState = 'incorrect';
                totalIncorrect++;
                console.log('You got it wrong');
                transitionScreen();
                }
            }
        })
    }

    function transitionScreen() {
        console.log('transition should be running');
        switch (answerState) {
            case 'correct': 
                $('#questionCard').empty();
                $('#questionCard').html(`<h1>You got it right!</h2>`);
                setTimeout(nextQuestion, 5000);
            break;
            case 'incorrect': 
            $('#questionCard').empty();
            $('#questionCard').html(`<h1>You got it wrong!</h2>`);
            setTimeout(nextQuestion, 5000);
            break;
            case 'timeout': 
            $('#questionCard').empty();
            $('#questionCard').html(`<h1>Times up!</h2>`);
            setTimeout(nextQuestion, 5000);
            break;
        }
    }

    function displayQuestion() {
            //Ask question
            if (currentTime < 0 || currentTime === undefined) {
                i = questions[currentQuestion]
                $('#questionCard').empty();
                $('#questionCard').html(`
                    <h1 id="question"></h1>
                    <div id="choices"></h3>
                `);            
                $('#question').text(i.question);
                console.log(i.question);
                shuffleArray(i.choices);
                for (j=0; j < i.choices.length; j++ ){
                    $('#choices').append($('<h3 id="answerIndex' + j + '" class="answer"></h3>').text(i.choices[j]));
                }
                console.log(i.choices);
                console.log(i.correctAnswer);
                evaluateAnswer();
            } else {
                answerState = 'timeout';
                evaluateAnswer();
                //go to timout screen
                //start timer to go to next question
            }
          
        }

   function nextQuestion() { 
       currentQuestion++
       if (currentQuestion < questions.length) {
            displayQuestion();       
        } else {
            $('#questionCard').empty();
            $('#questionCard').html('<h1>Game Over. Stats here soon.</h1>');
        }
   };


    //functions to build
        //updateQuestionDOM()
        //setTimer(timeAmt)
        //check/display answer
            //either one that covers all.... (ie. checkAnswerState() then switch/case) or
                //if correct
                //if incorrect
                //if timeout
        //check gameState



    //function runQuestion() 
        //pull question
        //set timer/start countdown
            //if timeout
                //reveal right answer
                //set incorrect var + 1
                //start nextQuestion timer
                    //move on to next question
            //if correct
                //display correct window
                //set correct answer to + 1

  


})