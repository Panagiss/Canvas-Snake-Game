const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

//create unit to split canvas as a table of square
const box = 32;

//create score
let score=0; 
let bestScore;

//load images
const backroundImg = new Image();
backroundImg.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio files
const dead= new Audio();
const eat= new Audio();
const up= new Audio();
const down= new Audio();
const left= new Audio();
const right= new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
right.src = "audio/right.mp3";

//create snake obj
var snake = new Snake();

//create food obj
var food = new Food();

//control snake
var d=0;
document.addEventListener("keydown",function(event){
    switch(event.keyCode){
        case 37:
        	if(d!=39){
        		d=37;
        		snake.changeDirection('left');
        	}
            break;

        case 38:
        	if(d!=40){
        		d=38;
        		snake.changeDirection('up');
        	}
            break;
            
        case 39:
        	if(d!=37){
        		d=39;
        		snake.changeDirection('right');
        	}
            break;

        case 40:
        	if(d!=38){
        		d=40;
  				snake.changeDirection('down');        	
  			}
            break;
    }
});


function saveCookie(newBest){
	var cookieString="";
	expireDate = new Date();
 	expireDate.setMonth(expireDate.getMonth() + 12);
	document.cookie = "Score=" +newBest+ ";expires="+ expireDate.toGMTString() + ";";
}

function loadCookie(){
	var cookie=[];
	var loadedCookies=document.cookie.split(";");
	cookie = loadedCookies[0].split("=");
	if(typeof cookie[1] === 'undefined'){
		return null;
	}
	return cookie[1].trim();
}

function collision(head,array){
	for (var i =0; i < array.length; i++) {
		if(head.x==array[i].x && head.y==array[i].y){
			return true;
		}
	}
	return false;
}


//check for cookies
var cookie=loadCookie();
console.log(cookie);
if(cookie !== null && cookie !== ""){
	bestScore=parseInt(cookie);
}else{
	bestScore=0;
}


//draw functiom
function draw(){
	ctx.drawImage(backroundImg,0,0);

	snake.draw();
	food.draw();

	// old head position update
	snake.headX=snake.bodySnake[0].x;
	snake.headY=snake.bodySnake[0].y;

	//which direction
	snake.updateDirection(d);
	

	//if snake eats food
	snake.eat(food);
	

	//add new head
	snake.newHead={
		x:snake.headX,
		y:snake.headY
	}
	
	//gave over
	if(snake.headX<box || snake.headX>17*box || snake.headY<3*box ||snake.headY >17*box || collision(snake.newHead,snake.bodySnake)){
		clearInterval(game);
		dead.play();
		if(score>bestScore){
			if(!window.alert("Game Over\nNew Best Score:"+score)){
				saveCookie(score);
				location.reload(true);
			}
		}else{
			if(!window.alert("Game Over\nScore:"+score)){
				location.reload(true);
			}
		}
	}


	snake.bodySnake.unshift(snake.newHead);

	ctx.fillStyle="White";
	ctx.font="45px Changa one";
	ctx.fillText(score,2*box,1.6*box);
	if(bestScore<score){
		ctx.fillStyle="White";
		ctx.font="45px Changa one";
		ctx.fillText("New Best: "+score,10*box,1.6*box);
	}
}

//call draw function every 100 ms
let game=setInterval(draw,150);
