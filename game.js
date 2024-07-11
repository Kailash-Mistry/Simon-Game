const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(()=>{
    if( !started ) {
        started = true;
        $("#level-title").text("Level " + level );
        nextSequence();
    }
})

$("div.btn").click( (e)=>{
    var userChosenColor = e.target.id;
    userClickedPattern.push( userChosenColor );
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1 );
});

var checkAnswer = (currentLevel) => {
    if(gamePattern[currentLevel ] === userClickedPattern[ currentLevel] ){
        if( userClickedPattern.length === gamePattern.length ){
            setTimeout(()=>{nextSequence()},1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(()=>{$("body").removeClass("game-over");},200);
        startOver();
    }
}

var nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level );
    var randomNumber = Math.floor( 4 * Math.random() );
    var randomChosenColor = buttonColors[ randomNumber ];
    gamePattern.push( randomChosenColor );
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

var playSound =(userChosenColor)=> {
    var audio = new Audio("sounds/" + userChosenColor + ".mp3");
    audio.play();
}

var animatePress =(color)=> {
    $("#" + color).addClass("pressed");
    setTimeout( ()=>{
        $("#" + color).removeClass("pressed");
    },100);
}

var startOver =()=>{
    gamePattern = [];
    level = 0;
    started = false;
}