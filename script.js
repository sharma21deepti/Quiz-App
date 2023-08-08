const questions = [
    {
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    },
    {
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within _____ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
    },
  ];
  
let currentQuestion=0;
let score=50;
let time=50;
let finalScore;
let start_btn=document.getElementById("start_quiz");
start_btn.addEventListener("click",()=>{
    document.getElementById("start_head").innerText="";
    document.getElementById("desc").remove();
    document.getElementById("start_quiz").remove();
    start_Quiz();
})
function start_Quiz(){
    load_question();
    timer();
}
function timer(){
    let time=document.getElementById("score");
    let timerID=setInterval(()=>{
        if(score<=0){
            loadScore();
            time.innerText=0;
            clearInterval(timerID);
        }
        else{
            score=score-1;
            time.innerText=score;

        }
        console.log(time);
    },1000)
}
function hideAns(){
    document.getElementById("answer").style.display="none";
   
}

function load_question(){
    document.getElementById("start_head").innerText=questions[currentQuestion].questionText;
    let options=document.getElementById("quiz_options");
    for(let i=0;i<questions[currentQuestion].options.length;i++){
        let quizOption=document.createElement('button');
       quizOption.classList.add('option');
       quizOption.innerText=questions[currentQuestion].options[i];
       options.appendChild(quizOption);
       quizOption.addEventListener('click',()=>{
        document.getElementById('quiz_options').innerHTML="";
        document.getElementById('answer_div').style.display='block';
        // document.getElementById('answer_div').style.background_color='#196a67';
      
        if(quizOption.innerText==questions[currentQuestion].answer)
        {
            document.getElementById('answer').display.style='Correct';
        }
        else{
            document.getElementById('answer').innerText='Wrong';
            score=score-10;
        }
        setTimeout(hideAns,800);
        nextQuestion();
      })
    } 
    
}
function nextQuestion(){

    if(currentQuestion<questions.length-1){
        currentQuestion++;
        load_question();
    }
    else{
        finalScore=score;
        score=0;
        loadScore();
    }
}

function loadScore(){
    document.getElementById('score').innerText = 0;
    document.getElementById('start_head').innerText = 'All Done!';
    
    document.getElementById('all_done').style.display = 'block';
    document.getElementById('final_score').innerText = finalScore;
}


let submitBtn=document.getElementById('submit_btn');
submitBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  let input =document.getElementById("initials");
  let initials=input.value;
  if(initials.length!=2){
    alert("enter only 2 letter initials");
    initials="";
  }
  document.forms[0].reset();
  if(localStorage.getItem('leaderboard')){
    let leaderboard=JSON.parse(localStorage.getItem('leaderboard'));
    leaderboard.push({initials,finalScore});
    localStorage.setItem('leaderboard',JSON.stringify(leaderboard));

  }
  else{
    let leaderboard=[];
    const obj={
      "initials":initials,
      "finalScore":finalScore,
    };
    leaderboard.push(obj);
    localStorage.setItem('leaderboard',JSON.stringify(leaderboard));
  }
  loadHighscore();
})


function loadHighscore(){
  document.getElementById('all_done').style.display="none";
  let highscoreDiv=document.getElementById('highscore');
  highscoreDiv.style.display="block";
  document.getElementById('start_head').innerText="Highscores";
  let highscores=JSON.parse(localStorage.getItem('leaderboard'));
  highscores.sort((a,b)=>b.finalscore-a.finalscore);
  for(let i=0;i<highscores.length;i++){
    let code=`<p><span>${i+1}</span>. <span>${highscores[i].initials}</span>: <span>${highscores[i].finalScore}</span></p>`
    highscoreDiv.innerHTML+=code;
  }
  document.getElementById('highscore_btns').style.display = 'flex';
    let resetBtn = document.getElementById('reset');
    let clearHighscoreBtn = document.getElementById('clear_highscore');

    resetBtn.addEventListener("click", () => {
        location.reload();
    })

    clearHighscoreBtn.addEventListener('click', () => {
        localStorage.removeItem('leaderboard');
        location.reload();
    })
}