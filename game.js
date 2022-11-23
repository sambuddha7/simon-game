var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var hasStarted = 0;

function nextSequence() {
  $("h1").text("Level " + level);
  var rand = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[rand];
  gamePattern.push(randomChosenColour);
  var str = "#" + randomChosenColour;
  $(str).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;

}
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (hasStarted === 1) {
    userClickedPattern.push(userChosenColor);
    check();
  }
});
function check() {
  var idx = userClickedPattern.length - 1;
  if (userClickedPattern[idx] !== gamePattern[idx]) {
    gameOver();
  }
  else if (idx === gamePattern.length - 1) {
    userClickedPattern = [];
    nextSequence()
  }
}
function playSound(name) {
  var aud = "sounds/" + name + ".mp3";
  var audio = new Audio(aud);
  audio.play();
}
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("h1").text("Game Over press any key to restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  hasStarted = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];

}
$(document).keypress(function() {
  if (hasStarted === 0) {
    nextSequence();

    hasStarted = 1;
  }

});
