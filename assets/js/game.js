$(document).ready(function(){
    
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalUnanswered = 0;
    let currentQuestion = 1;
    let gameTitle;
    let tvShow;
    let qIndex;
    let currentCorrectAnswer;
    let questionCountdown;
    let currentTime;
    let sound;
    let userAnswer;
    let answerState;
    let counter = 0;

    var questions = [
        {knight_rider:[
            {
                goodGif: ['','k-good-1','k-good-2','k-good-3'],
                badGif: ['','k-bad-1','k-bad-2'],
                goodSound: [],
                badsound:[],
            },
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
        ]},
        {a_team:[
            {
                goodGif: ['','a-good-1','a-good-2'],
                badGif: ['','a-bad-1','a-bad-2'],
                goodSound: [],
                badsound:[],
            },
            {
                question: `In the United States of America, the "A-team" ran for 4 years during the 80s. But, which years?`,
                choices: ['1984-1988','1981-1985','1983-1987','1985-1989'],
                correctAnswer: '1983-1987',            
            },
            {
                question: `The leader of the team was "Hannibal" Smith. Who played him?`,
                choices: ['Dirk Benedict','Dwight Schultz','Mr. T','George Peppard'],
                correctAnswer: 'George Peppard',            
            },
            {
                question: `One of the characters had a huge fear: flying! Which one?`,
                choices: ['Murdock','Face','Hannibal','B.A. Barracus'],
                correctAnswer: 'B.A. Barracus',            
            },
            {
                question: `The team had a special black van with red ailerons. What model was it?`,
                choices: ['A-series','F-series','G-series','W-series'],
                correctAnswer: 'G-series',            
            },
            {
                question: `What does the A in "A-team" stand for?`,
                choices: ['Alpha','Astonishing','Amazing','Annoying'],
                correctAnswer: 'Alpha',            
            },
            {
                question: `What was Hannibal's favourite quote?`,
                choices: ["He's on the jazz!",'Who am I?','Shut up fool!','I love it when a plan comes together!'],
                correctAnswer: 'I love it when a plan comes together!',            
            },
            {
                question: `How come the A-Team was running from the military?`,
                choices: ['they stole military machinery','they left the military before they were supposed to','they told military secrets to the Government',`they were framed for a crime they didn't commit`],
                correctAnswer: `they were framed for a crime they didn't commit`,            
            },
            {
                question: `What does the "H.M.", stand for in Capt. H.M. Murdock?`,
                choices: [`Here's Murdock`,'Hero Man','Howling Maniac','Howling Mad'],
                correctAnswer: 'Howling Mad',            
            },
            {
                question: `What does the real "B.A." stand for in Sgt. B.A. Baracus?`,
                choices: ['Bosco AlbertBad Albert','Beanie Albert','Big Albert','Bosco Albert'],
                correctAnswer: 'Bosco Albert',            
            },
            {
                question: `Which team member goes by many different aliases?`,
                choices: ['Hannibal','Murdock','BA','Face'],
                correctAnswer: 'Face',            
            },
        ]}    
    ]

    var badSounds = ['bad-1','bad-2','bad-3'];
    var goodSounds = ['good-1'];
    var musicTracks = ['song-1','song-2'];

    gameStart();

    function generateSound(soundArray) {
        shuffleArray(soundArray);
        console.log(soundArray[0]);
        sound = new Howl({
            src: [`assets/sounds/`+soundArray[0]+`.mp3`]
        });
        console.log(sound);
    };
      
    function gameStart() {
        $('#questionCard').empty();
        $('#tvBg').ready(function(){
            $('#questionCard').css({                
                'background': `url('https://media1.giphy.com/media/26tPbLsr9oE72erjG/giphy.gif')`,
                'z-index':'-1',
            });
        });
        
        setTimeout( function() {
        $('#questionCard').css({'background': "url()",'z-index':'1'});
        $('#countdown').text('Pick your TV Show!');
        $('#correctHeader').empty();
        $('#incorrectHeader').empty();
        $('#questionCard').empty();
        $('#questionCard').html(`
        <div class="gameStart"><h1>Welcome to 80s TV Trivia!</h1></div>
        <br>
        <div class="gameStart"><h3>You will have 30 seconds to answer each question.</h3></div>
        <br>
        <div class="gameStart"><h2>Pick the VHS you want to play!</h2></div>
        <button class="btn btn-danger startButton" value="a_team">A-Team</button>
        <button class="btn btn-danger startButton" value="knight_rider">Knight Rider</button>
        `);

        $('.startButton').on('click', function(){
            tvShow = $(this).val();
            gameTitle = $(this).text();
            $('#gameTitle').text(gameTitle);
            switch (tvShow) {
                case 'knight_rider': 
                    qIndex = questions[0].knight_rider;
                break;
                case 'a_team': qIndex = questions[1].a_team;
                break;
            }
            $('body').fadeOut(function(){
                $('#customStyle').attr('href','assets/css/'+tvShow+'.css');
                $(this).fadeIn('slow');
            })
            console.log(tvShow)
            shuffleArray(qIndex);
            console.log(qIndex)
            displayQuestion();
        })
        },700);

    }

    function restart() {
        currentQuestion = 1;
        totalCorrect = 0;
        totalIncorrect = 0;
        totalUnanswered = 0;$('#correctHeader').empty();
        totalUnanswered = 0;$('#incorrectHeader').empty();
        $('body').fadeOut(function(){
            $('#customStyle').attr('href','assets/css/style.css');
            $(this).fadeIn('slow');
        })
        gameStart();  
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            if(j===0){j+=1} else {j};
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function randomSound(soundArray) {
        let soundFile = soundArray[Math.floor(Math.random() * soundArray.length)]
        howls[soundFile].play();
    };
    
    function evaluateAnswer() {
        //set the countdown timer to x
        currentTime = 30;
        currentCorrectAnswer = qIndex[currentQuestion].correctAnswer;
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
                $('#correctHeader').html('<h5>Right: '+ totalCorrect + '</h5>');
                $('#questionCard').empty();
                shuffleArray(qIndex[0].goodGif);
                console.log(qIndex[0].goodGif);
                $('#questionCard').html(`
                <div><h3>You got it right!</h3></div>
                <div class="transitionImg mx-auto"><img src="assets/images/`+qIndex[0].goodGif[1]+`.gif" /></div>
                `);
            break;
            case 'incorrect': 
                generateSound(badSounds);
                sound.play();
                console.log(badSounds[0]);
                $('#countdown').text('Whomp whomp');
                $('#incorrectHeader').html('<h5>Wrong: ' + (totalIncorrect + totalUnanswered) + '</h5>');
                $('#questionCard').empty();
                shuffleArray(qIndex[0].badGif);
                $('#questionCard').html(`
                <div><h3>You got it wrong!</h3></div>
                <div class="transitionImg mx-auto"><img src="assets/images/`+qIndex[0].badGif[1]+`.gif" /></div>
                `);
            break;
            case 'timeout': 
            generateSound(badSounds);
            sound.play();
                $('#countdown').text('Times Up');
                $('#incorrectHeader').html('<h5>Wrong: ' + (totalIncorrect + totalUnanswered) + '</h5>');
                $('#questionCard').empty();
                shuffleArray(qIndex[0].badGif);
                $('#questionCard').html(`
                <div><h3>The answer we were looking for was: `+currentCorrectAnswer+`</h3></div>
                <div class="transitionImg mx-auto"><img src="assets/images/`+qIndex[0].badGif[1]+`.gif" /></div>
                `);
            break;
        }
        setTimeout(nextQuestion, 5000);
    }

    function displayQuestion() {
        
        i = qIndex[currentQuestion];
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
        console.log('Question Index is: '+currentQuestion)
        if (currentQuestion < qIndex.length) {
            displayQuestion();       
        } else {
            $('#headerRow').empty();
            $('#questionCard').empty();
            $('#questionCard').html(`
            <div><h1>Game Over!</h1></div>
            <div><h3>Correct answers: `+totalCorrect+`</h3></div>
            <div><h3>Wrong Answers: `+totalIncorrect+`</h3></div>
            <div><h3>Unaswered: `+totalUnanswered+`</h3></div>
            <div class="gameStart"><h2>Press Start Over to try again!</h2></div>
            <button id="startButton" class="btn btn-danger">Start Over</button>
            `);
            $('#startButton').on('click', function() {
                restart();  
            })
            
        }
    };

})