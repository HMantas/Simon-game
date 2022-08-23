

let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let randomChosenColor = "";
let userClickedPattern = [];
let level = 0;
let gameStarted = false;



    $(document).keydown(function() {
        if (!gameStarted) {
            $("#level-title").text("Level " + level);
            nextSequence();
            return gameStarted = true;
        }
    });
  





function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
 
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    $("#level-title").text("Level " + level++);
}


function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}

function startOver() {
    gameStarted = false;
    gamePattern = [];
    level = 0;
}




$(".btn").click(function() {

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});










