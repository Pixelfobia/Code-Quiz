//HTML Elements: DOM Manipulation
let startScreen = document.getElementById("start-screen");
let startButton = document.getElementById("start");
let timerEl = document.getElementById("timer");
let questionEl = document.getElementById("question-title");
let choicesEl = document.getElementById("answer-choices");
let quizContent = document.getElementById("quiz-questions");
let gameOver = document.getElementById("game-over");
let endMessage = document.getElementById("end-message");
let finalScore = document.getElementById("final-score");

//sets starting index of questions Object
let index = 0;
//time when game starts
let timeLeft = 75;
//starting score
let score = 0;


//waits for user to click to start game
startButton.addEventListener("click", startQuiz);

//starts the quiz after the button is clicked
function startQuiz() {
	//clears jumbotron from page
	startScreen.classList.add("hide");
	//displays container for quiz questions
	quizContent.classList.remove("hide");

	//starts the timer
	timer();

	//calls function to generate questions
	askQuestions();
}

//countdown timer
function timer() {
	let timerInterval = setInterval(function () {
		timeLeft--;
		timerEl.textContent = timeLeft;

		//stops the clock at zero and ends the game
		if (timeLeft === 0) {
			clearInterval(timerInterval);
			endGame();
		}
	}, 1000);

}
//generates questions on the page
function askQuestions() {
	//clear out previous question/choices
	questionEl.textContent = "";

	//renders the question on the page
	let question = questions[index].title;
	questionEl.append(question);

	let olEl = document.createElement("ol");
	//adds question list to the HTML
	questionEl.append(olEl);

	quizContent.addEventListener("click", checkAnswer);

	//creates a list of buttons with answer choices
	for (let i = 0; i < 4; i++) {
		let listEl = document.createElement("li");
		olEl.appendChild(listEl);
		let buttonEl = document.createElement("button");
		buttonEl.className = "button";
		buttonEl.textContent = questions[index].choices[i];

		//appends the button to the list
		listEl.appendChild(buttonEl);
	}

}

//when the user selects an answer choice button
function checkAnswer(event) {
	if (event.target.matches("button")) {
		//if the user selects the correct answer button
		if (event.target.textContent === questions[index].answer) {
			//adds 10 to the score
			score += 20;
		}
		//if the user selects the wrong answer button
		else {
			//deducts 10 points from the score if the score is above 0
			if (score > 0) {
				score -= 10;
			}
			//deducts 10 seconds from the time
			timeLeft = timeLeft - 10;
		}
	}
	//Adds one to the index so that the next question in the array is asked
	index++;

	//ends the game if out of questions or the time runs out
	if (index > 4 || timeLeft === 0) {
		endGame();
	} else {
		askQuestions();
	}
}

function endGame() {
	//removes the quiz content container and displays the end of game message
	quizContent.classList.add("hide");
	gameOver.classList.remove("hide");

	//Final Score
	endMessage.textContent = "Game Over!";
	finalScore.textContent = "Your final score is: " + score + ".";

	//targets the submit button at the end of the game
	let highScoresButton = document.getElementById("high-scores-button");

	highScoresButton.addEventListener("click", function () {
		//takes in user input after the button is clicked
		let initials = document.getElementById("input").value;
		//empty array to pass input and score into
		let storedScores = [];
		//object of initials and scores to pass into empty array
		let initialsAndScore = {
			name: initials,
			points: score
		};

		//putting the initials/score into local storage if there is nothing in there
		if (localStorage.getItem("initialsAndScore") === null) {
			storedScores.push(initialsAndScore);
			localStorage.setItem("initialsAndScore", JSON.stringify(storedScores));
			//adding the initials/score to the array that already has information and putting it in local storage
		} else {
			storedScores = JSON.parse(localStorage.getItem("initialsAndScore"));
			storedScores.push(initialsAndScore);
			localStorage.setItem("initialsAndScore", JSON.stringify(storedScores));

		}
		//sends the user to the highnscore page
		window.location.replace("highscores.html");
	})

}