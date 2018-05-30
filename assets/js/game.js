$(document).ready(function(){

    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalUnanswered = 0;
    let currentQuestion = 0;
    let currentCorrectAnswer;
    let questionCountdown;
    let currentTime;
    let sound;
    let userAnswer;
    let answerState;
    let counter = 0;

    var questions = [
        {
            question: `What is Michael Knight's original name?`,
            choices: ['Michael King', 'Michael Day','Michael Long','Michael Selleck'],
            correctAnswer: 'Michael Long',            
        },
        {
            question: `What is the name of the actor that played Michael Knight?`,
            choices: ['Tom Selleck', 'Burt Reynolds','David Hasselhoff','Mitch Buchannon'],
            correctAnswer: 'David Hasselhoff',            
        },
        {
            question: `What did K.I.T.T. stand for?`,
            choices: ['Knight Industries Technical Team', 'Knight Industries Take Two','Knight Industries Two Thousand','Knight Industries Technical Trial'],
            correctAnswer: 'Knight Industries Two Thousand',            
        },
        {
            question: `What was the name of Michael Knight's boss?`,
            choices: ['Miles Warwick', 'Miles Devon','Devon Miles','Warwick Miles'],
            correctAnswer: 'Devon Miles',            
        },
        {
            question: `What was the name of the actress who played Bonnie Barstow?`,
            choices: ['Patricia McPherson', 'Ana Alicia','Heather Thomas','Charlene Tilton'],
            correctAnswer: 'Patricia McPherson',            
        },
        {
            question: `What model of car was K.I.T.T. based off of?`,
            choices: ['Camaro', 'Trans AM','Fire Bird','GTO'],
            correctAnswer: 'Trans AM',            
        },
        {
            question: `What was the name of the upgrade that enabled KITT to drive more than 300mph?`,
            choices: ['Oil Slick','Turbo Boost','High Tractor Drop Downs','Super Pursuit Mode'],
            correctAnswer: 'Super Pursuit Mode',            
        },
        {
            question: `On what US network did Knight Rider air?`,
            choices: ['NBC','ABC','CBS','FOX'],
            correctAnswer: 'NBC',            
        },
        {
            question: `During what years did the show air?`,
            choices: ['1983-1987','1982-1986','1981-1985','1984-1988'],
            correctAnswer: '1982-1986',            
        }       
    ]

    var badSounds = ['bad-1','bad-2','bad-3'];
    var goodSounds = ['good-1'];
    var musicTracks = ['song-1','song-2'];

    function generateSound(soundArray) {
        shuffleArray(soundArray);
        console.log(soundArray[0]);
        sound = new Howl({
            src: [`assets/sounds/`+soundArray[0]+`.mp3`]
        });
        console.log(sound);
    };
      
    
    

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

    function randomSound(soundArray) {
        let soundFile = soundArray[Math.floor(Math.random() * soundArray.length)]
        howls[soundFile].play();
    };
    
    shuffleArray(questions);

    function evaluateAnswer() {
        //set the countdown timer to x
        currentTime = 10;
        currentCorrectAnswer = questions[currentQuestion].correctAnswer;
        console.log(currentTime);
        questionCountdown = setInterval(function(){
            currentTime--;
            $('#countdown').text(currentTime);
            if (currentTime <= 0) {
                clearInterval(questionCountdown);
                $('#questionCard').off('click', 'h3')
                answerState = 'timeout';
                totalUnanswered++
                transitionScreen();
            }
        }, 1000);
            
        $('#questionCard').on('click', 'h3', function() {
            $('#questionCard').off('click', 'h3')
            $('#countdown').text(currentTime);
            clearInterval(questionCountdown);
            console.log('You clicked: ' + $(this).text())
            console.log('Correct answer is: ' + currentCorrectAnswer)
            if ($(this).text() === currentCorrectAnswer){
                answerState = 'correct';
                totalCorrect++;
                console.log('You got it right!');
                console.log('answerState has been set to: ' + answerState);
                transitionScreen();
            } else {
                answerState = 'incorrect';
                totalIncorrect++;
                console.log('You got it wrong');
                transitionScreen();
            }
        
        })
    }

    function transitionScreen() {
        console.log('transition should be running');
        switch (answerState) {
            case 'correct': 
                generateSound(goodSounds);
                sound.play();
                $('#countdown').text('Good Job!');
                $('#correctHeader').html('<h3>Right: '+ totalCorrect + '</h3>');
                $('#questionCard').empty();
                $('#questionCard').html(`
                <div><h2>You got it right!</h2></div>
                <div class="transitionImg mx-auto"><img src="assets/images/kittTalking.gif" /></div>
                `);
            break;
            case 'incorrect': 
                generateSound(badSounds);
                sound.play();
                console.log(badSounds[0]);
                $('#countdown').text('Whomp whomp');
                $('#incorrectHeader').html('<h3>Wrong: ' + (totalIncorrect + totalUnanswered) + '</h3>');
                $('#questionCard').empty();
                $('#questionCard').html(`<h1>You got it wrong!</h2>`);
            break;
            case 'timeout': 
            generateSound(badSounds);
            sound.play();
                $('#countdown').text('Times Up');
                $('#incorrectHeader').html('<h3>Wrong: ' + (totalIncorrect + totalUnanswered) + '</h3>');
                $('#questionCard').empty();
                $('#questionCard').html(`<h1>The answer we were looking for was: `+currentCorrectAnswer+`</h2>`);
            break;
        }
        setTimeout(nextQuestion, 5000);
    }

    function displayQuestion() {
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
    }

    function nextQuestion() { 
        currentQuestion++
        if (currentQuestion < questions.length) {
            displayQuestion();       
        } else {
            $('#headerRow').empty();
            $('#questionCard').empty();
            $('#questionCard').html(`
            <div><h1>Game Over!</h1></div>
            <div><h3>Correct answers: `+totalCorrect+`</h3></div>
            <div><h3>Wrong Answers: `+totalIncorrect+`</h3></div>
            <div><h3>Unaswered: `+totalUnanswered+`</h3></div>
            `);
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