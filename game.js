// alert("hi");
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keypress(function() {
    if (started == false) {
        started = true;
        nextSequence();
    }
});

$(".btn").click(function() {
    if (started) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        lastAnswer = userClickedPattern.length - 1;

        playSound(userChosenColor);
        animatePress(userChosenColor);
        // console.log("User: "+ userClickedPattern);
        checkAnswer(lastAnswer);
    }
});

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("h1").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // console.log("Game: " + gamePattern);
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
    audio.play();
}


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success!");

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        } 
    }

    else {
        // console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


