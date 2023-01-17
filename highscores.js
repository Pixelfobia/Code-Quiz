//takes the initials and scores out of local storage and appends them to the page
var highscoresList = document.getElementById("highscores-list");
var initialsAndScore = JSON.parse(localStorage.getItem("initialsAndScore"));
for (var i = 0; i < initialsAndScore.length; i++){
    var h3El = document.createElement("h3");
    h3El.textContent = initialsAndScore[i].name + "-  "+ initialsAndScore[i].points;
    highscoresList.append(h3El);
    
}

//event listener for the Clear High Scores Button
var clearScoreButton = document.getElementById("clear-score");
clearScoreButton.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})