function validateEmail(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(emailField.value) == false) {
    document.querySelector(".p_mail").innerHTML = "Invalid  Email  Address";
    return false;
  }
  document.querySelector(".p_mail").innerHTML = "";
  return true;
}
function validatePassword(passwordField) {
  var pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (pattern.test(passwordField.value) == false) {
    document.querySelector(".p_password").innerHTML = "Invalid  Password";
    return false;
  }
  document.querySelector(".p_password").innerHTML = "";
  return true;
}
var data = [
  {
    question: "What is the capital of France?",
    options: ["London", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    timeLimit: 20,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    timeLimit: 15,
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
    timeLimit: 25,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Kangaroo"],
    correctAnswer: "Blue Whale",
    timeLimit: 30,
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    timeLimit: 18,
  },
];
var counter = 0;
var score = 0;
var currentIndex = 0;
var totalQuestion = data.length;
var startBtn = document.querySelector(".btn");
var total_questions = document.querySelector(".question_nums");
total_questions.innerHTML = totalQuestion;
var question_count = document.querySelector(".question_count");
var answersArea = document.querySelector(".answers_container");
var nextBtn = document.querySelector(".next_btn");
var question = document.querySelector(".question");
var resulrContainer = document.querySelector(".result");
var countDownInterval;
var timerContainer = document.querySelector(".timer");
var stopWatch = document.createElement("div");
resulrContainer.appendChild(stopWatch);
var timeoutId = null;
var ms = 0;
var sec = 0;
var min = 0;

addQuestion(data[currentIndex], totalQuestion);
function addQuestion(arr, count) {
  if (currentIndex < count) {
    var questionTitle = document.createElement("h4");
    var questionText = document.createTextNode(data[currentIndex].question);
    questionTitle.appendChild(questionText);
    question.appendChild(questionTitle);
    question_count.innerHTML = currentIndex + 1;
    for (var i = 1; i < 5; i++) {
      var mainContainer = document.createElement("div");
      mainContainer.classList = "answer";
      var radioBtn = document.createElement("input");
      radioBtn.name = "question";
      radioBtn.type = "radio";
      radioBtn.id = `answer_${i}`;
      radioBtn.dataset.answer = arr[`answer_${i}`];
      var label = document.createElement("label");
      label.htmlFor = `answer_${i}`;
      var labelText = document.createTextNode(
        data[currentIndex].options[i - 1]
      );
      label.appendChild(labelText);
      mainContainer.appendChild(radioBtn);
      mainContainer.appendChild(label);
      answersArea.appendChild(mainContainer);
      resulrContainer.style.display = "none";
    }
  }
}
countDown(data[currentIndex].timeLimit, totalQuestion);
nextBtn.onclick = function () {
  //check right answers
  var rightAnswer = data[currentIndex].correctAnswer;
  currentIndex++;
  checkAnswer(rightAnswer);
  question.innerHTML = "";
  answersArea.innerHTML = "";
  clearInterval(countDownInterval);
  if (currentIndex < 5) {
    addQuestion(data[currentIndex], totalQuestion);
    countDown(data[currentIndex].timeLimit, totalQuestion);
  }
  showResult(totalQuestion);
};

function checkAnswer(rAnswer) {
  var answers = document.getElementsByName("question");
  var choosenAnswer;

  for (var i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      choosenAnswer = answers[i].labels[0].textContent;
      console.log(choosenAnswer);
    }
  }

  if (rAnswer == choosenAnswer) {
    score++;
  }
}
function showResult(count) {
  if (currentIndex === totalQuestion - 1) {
    nextBtn.innerHTML = "Submit";
  }
  if (currentIndex === totalQuestion) {
    var results;
    question.remove();
    answersArea.remove();
    nextBtn.remove();
    total_questions.remove();
    timerContainer.remove();
    var questionDiv = document.querySelector(".question_number");
    questionDiv.style.display = "none";
    resulrContainer.style.display = "block";

    if (score > count / 2 && score < count) {
      results = `<div class='result'><h3>Good 🎉</h3><span>  Score : </span>${score}</div> `;
    } else if (score === count) {
      results = `<div class='result'><h3>Perfect 🎉</h3><span>  Score : </span>${score}</div> `;
    } else {
      results = `<div class='result'><h3>Failed </h3><span>  Score : </span>${score}</div> `;
    }
    resulrContainer.innerHTML = results;
  }
}
function countDown(time, count) {
  if (currentIndex < count) {
    //let seconds;
    countDownInterval = setInterval(function () {
      // seconds = data[currentIndex].timeLimit;

      timerContainer.innerHTML = `00:${time}`;
      if (--time < 0) {
        clearInterval(countDownInterval);
        timerContainer.innerHTML = `00:00`;
        nextBtn.click();
        console.log("finished");
      }
    }, 1000);
  }
}

