var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started = false;

var level = 0;

// this function is use to capture a keypress to start a game
$(document).keypress(function() {
    if(!started) {                      // this part also have some doubts like the using of document here + the use of the "!" here 
console.log('run')
        $("#level-title").text("Level" + level);
        nextSequence();     // $ step in this part is understandable but this part of using the nextSequence is not understandable 
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id"); // read about the "this" one more time.

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour); // read this part again why we use playsound here.

    animatePress(userChosenColour); // why this has been added here.

    checkAnswer(userClickedPattern.length-1); // why we minus the "1" from the .length

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {       //why we used "[]" here with currentLevel inside them
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
}

function nextSequence() {

userClickedPattern = [];

level++;        // used to increase the level one time every time the nextSequence is called

$("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);


$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {      // why we used here currentColour as a single input parameter ??  
    $("#" + currentColour).addClass("pressed");     // this function is just adding and removing the pressed class

    setTimeout (function(){
    $("#" + currentColour).removeClass("pressed");
    }, 100);
}     


function startOver() {
    level = 0;

    gamePattern = [];

    started = false;
}

