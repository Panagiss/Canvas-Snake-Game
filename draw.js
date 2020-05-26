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
const dead= document.getElementById("dead");
const eat= document.getElementById("eat");
const up= document.getElementById("up");
const down= document.getElementById("down");
const left= document.getElementById("left");
const right= document.getElementById("right");


//create snake obj
var snake = new Snake();

//create food obj
var food = new Food();

//control snake
var direction_key=0,startX=null,startY=null,endX=null,endY=null;

document.addEventListener("keydown",function(event){
    switch(event.keyCode){
        case 37:
        	if(direction_key!=39){
        		direction_key=37;
				snake.changeDirection('left');
        	}
            break;

        case 38:
        	if(direction_key!=40){
        		direction_key=38;
        		snake.changeDirection('up');
        	}
            break;
            
        case 39:
        	if(direction_key!=37){
        		direction_key=39;
        		snake.changeDirection('right');
        	}
            break;

        case 40:
        	if(direction_key!=38){
        		direction_key=40;
  				snake.changeDirection('down');        	
  			}
            break;
    }
});


document.addEventListener("touchstart",function(event){
	//event.preventDefault();
	console.log(event.touches[0],event.type); //debug
	startX=event.touches[0].clientX;
	startY=event.touches[0].clientY;
} );

document.addEventListener("touchmove",function(event){
	console.log(event.touches[0],event.type); //debug
	endX=event.touches[0].clientX;
	endY=event.touches[0].clientY;
	handleSwipe();
} );

/*document.addEventListener("touchend",function(event){
	event.preventDefault();
	console.log(event.touches[0],event.type); //debug
	endX=event.changedTouches[0].screenX;
	endY=event.changedTouches[0].screenY;
	//handleSwipe(startX,startY,endX,endY);
},{passive:false} ); */

function handleSwipe(){
	if ( ! startX || ! startY ) {
        return;
	}
	var xDiff = startX - endX;
    var yDiff = startY - endY;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { //most significant
        if ( xDiff > 0 ) {
			console.log("left");
			if(direction_key!=39){
				direction_key=37;
				snake.changeDirection('left');
			}
        } else {
			console.log("right");
			if(direction_key!=37){
				direction_key=39;
				snake.changeDirection('right');
			}
        }                       
    } else {
        if ( yDiff > 0 ) {
			console.log("up");
			if(direction_key!=40){
				direction_key=38;
				snake.changeDirection('up');
			}
        } else { 
			console.log("down");
			if(direction_key!=38){
				direction_key=40;
				snake.changeDirection('down');        	
			}
        }                                                                 
    }
    // reset values
    startX = null;
    startY = null;                    
	
	/*
	//console.log(startX,endX,startY,endY); //debug
	if(endX-startX > 0 && Math.abs(endY-startY)<=100 ){ //right swipe
		console.log("right");
		if(direction_key!=37){
			direction_key=39;
			snake.changeDirection('right');
		}
	}else if(endX-startX < 0 && Math.abs(endY-startY)<=100 ){ //left swipe
		console.log("left");
		if(direction_key!=39){
			direction_key=37;
			snake.changeDirection('left');
		}
	}else if(endY-startY > 0 && Math.abs(endX-startX)<=100 ){ //down swipe
		console.log("down");
		if(direction_key!=38){
			direction_key=40;
			snake.changeDirection('down');        	
		  }
	}else if(endY-startY < 0 && Math.abs(endX-startX)<=100 ){ //up swipe
		console.log("up");
		if(direction_key!=40){
			direction_key=38;
			snake.changeDirection('up');
		}
	}*/

} 


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
	snake.updateDirection(direction_key);
	

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

var a=true;
document.getElementById("soundButton").addEventListener("click",function(){
	if(a){
		document.getElementById("soundButton").textContent="Turn OFF FX Sounds";
		dead.muted=false;
		eat.muted=false;
		up.muted=false;
		right.muted=false;
		down.muted=false;
		left.muted=false;
		a=false;
	}else{
		document.getElementById("soundButton").textContent="Turn ON FX Sounds";
		dead.muted=true;
		eat.muted=true;
		up.muted=true;
		right.muted=true;
		down.muted=true;
		left.muted=true;
		a=true;
	}
});


//call draw function every 100 ms
let game=setInterval(draw,150);
