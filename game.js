var gamePattern = [];
var clickedPattern = [];
var allColours = ["blue", "green", "red", "yellow"];
var level = 0;
var audio = new Audio();

const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

function getRandomColor() {
    gamePattern.push(allColours[Math.floor(Math.random()*4)])
    console.log(gamePattern);
}

function drawPattern(index){
    audio.src = "sounds/"+gamePattern[index]+".mp3";
    audio.play();
    $("div#"+gamePattern[index]).fadeOut(500).fadeIn(500, ()=>{
        if(index + 1 < gamePattern.length){
            drawPattern(index + 1);
        }
        else{
            $("div.btn").on("click", clickHandle);
            clickedPattern = [];
        }       
    })
}

function nextLevel(){
    level++;
    $(document).off("keydown", nextLevel);
    $("h1").off("click", nextLevel);
    $("div.btn").off("click", clickHandle);
    $("h1").text("Level " + level);
    getRandomColor();
    drawPattern(0);
}

function clickHandle(evt) {
    clickedPattern.push(evt.currentTarget.id);
    audio.src = "sounds/"+evt.currentTarget.id+".mp3";
    audio.play();
    $(this).addClass("pressed");
    setTimeout(() => {
        $(this).removeClass("pressed");
    }, 100);
    console.log(clickedPattern);
    if(clickedPattern.length === gamePattern.length){
        $("div.btn").off("click", clickHandle);
        if(compareArrays(clickedPattern, gamePattern)){
            setTimeout(() => {
                nextLevel();
            }, 1000);
        }
        else{
            $("body").addClass("game-over");
            audio.src = "sounds/wrong.mp3";
            audio.play();
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
            
        }
    }
}

$(document).on("keydown", nextLevel);
$("h1").on("click", nextLevel);