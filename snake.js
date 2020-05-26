function Snake(){

	//create snake
	this.bodySnake =[];
	this.bodySnake[0] = {
		x:9 * box,
		y:10 * box
	}
	// old head position
	this.headX = this.bodySnake[0].x;
	this.headY = this.bodySnake[0].y;

	//add new head
	this.newHead={
		x:this.headX,
		y:this.headY
	}
	

	//control snake
	this.changeDirection=function(direction){
        switch(direction){
            case 'left':
	    		this.headX-=box;
	           	left.play();
                break;

            case 'up':
	    		this.headY-=box;
	           	right.play();
                break;

            case 'right':
	    		this.headX+=box;
	           	up.play();
				break;

            case 'down':
	    		this.headY+=box;
				down.play();
            	break; 
        }
        let tmp = direction;
    }

    this.draw=function(){
    	for(let i=0;i<this.bodySnake.length;i++){
			ctx.fillStyle = (i==0)? "green" : "white";
			ctx.fillRect(this.bodySnake[i].x,this.bodySnake[i].y,box,box);

			ctx.strokeStyle = "red";
			ctx.strokeRect(this.bodySnake[i].x,this.bodySnake[i].y,box,box);
		}
    }

    this.eat=function(food){
    	//if snake eats food
		if(this.headX==food.fruit.x && this.headY==food.fruit.y){
			score++;
			eat.play();
			food.fruit = {
				x:Math.floor(Math.random()*17+1)*box,
				y:Math.floor(Math.random()*15+3)*box,
			}
		}else{
			//remove tail
			this.bodySnake.pop();
		}
    }

    this.updateDirection=function(d){
    	if(d==37) this.headX -=box;
		if(d==38) this.headY -=box;
		if(d==39) this.headX +=box;
		if(d==40) this.headY +=box;
    }

}