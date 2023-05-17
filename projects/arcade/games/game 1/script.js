const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function startGame() {
	document.getElementById('start').style.display = "none"; 
    document.getElementById('myCanvas').style.display = "block";  

    // global variables--------------------------------------------------------------------------------
	let count = 1;
	let [upPressed, rightPressed, downPressed, leftPressed] = [false, false, false, false];
	let x = Math.floor(Math.random() * (575 - 10 + 1) + 10);
	let y = Math.floor(Math.random() * (575 - 10 + 1) + 10);
	const [dy, dy2, dy3] = [3, 5, 9];
	const cellSize = 20;
	const gameGrid = [];
	const edibles = [];
	const enemies = [];
	const enemies2 = [];
	const enemies3 = [];
	let frame = 0;
	let scoreArray = [];

	// SFX--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	const powerUp = new Audio("./sfx/powerUp.mp3");
	const hit = new Audio("./sfx/hit.mp3");
	const music = new Audio("./sfx/music.mp3");
	music.volume = 0.1;  
	const throughWalls = new Audio("./sfx/through-walls.mp3");

	// create player--------------------------------------------------------------------------------------------------
	class Player {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.width = cellSize;
			this.height = cellSize;
			this.color = "#0095DD";
		}
		draw() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);	

			// Move the player
		    if (upPressed) this.y -=10;
		    else if (rightPressed) this.x += 10;
		    else if (downPressed) this.y += 10;
		    else if (leftPressed) this.x -= 10;

		    // Allow player to go through the walls and back on itself
		    if(this.x > canvas.width - 5) {
		        throughWalls.play();
		        player.x = 0;
		    }
		    if(this.x < 0) {
		        throughWalls.play();
		        player.x = canvas.width;
		    } 
		    if(this.y > canvas.height - 5) {
		        throughWalls.play();
		        player.y = 1;
		    }
		    if(this.y < 0) {
		        throughWalls.play();
		        player.y = canvas.height;
		    }		
		}		
	}

	let player = new Player(x, y);

	// Create edible------------------------------------------------------------------------------------------------
	class Edible {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.width = cellSize;
			this.height = cellSize;
			this.color = "purple";
		}
		draw() {
			if (!(collisionDetection(player, this))) {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			} else {
				this.y = Math.floor(Math.random() * (575 - 10 + 1) + 10);
				this.x = Math.floor(Math.random() * (575 - 10 + 1) + 10);
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
				powerUp.play();
				document.getElementById('count').innerHTML = count;
				count++;
			}
		}								
	}

	function createEdibles(ediblesArray) {
		for (let i = 0; i < ediblesArray.length; i++) {
			ediblesArray[i].draw();
		}
		if (ediblesArray.length === 0) {
			ediblesArray.push(new Edible(
				Math.floor(Math.random() * (575 - 10 + 1) + 10), 
				Math.floor(Math.random() * (575 - 10 + 1) + 10)
			));
		}
	}

	// Create enemies-------------------------------------------------------------------------------------------------
	class Enemy {
		constructor(x, speed) {
			this.x = x;
			this.y = 0;
			this.width = cellSize;
			this.height = cellSize;
			this.color = "black";
			this.speed = speed;
		}
		update() {
			this.y += this.speed;
		}
		draw() {
			if (collisionDetection(player, this)) {			
				hit.play();
				music.pause();
				alert("GAME OVER");
	            document.location.reload();
	            clearInterval(interval); // Needed for Chrome to end game                       
			} else {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);				
			}
		}								
	}

	function createEnemies(enemiesArray, frameInterval, speed) {
		for (let i = 0; i < enemiesArray.length; i++) {
			enemiesArray[i].update();
			enemiesArray[i].draw();
		}
		if (frame % frameInterval === 0) {
			enemiesArray.push(new Enemy(Math.floor(Math.random() * (599 - 10 + 1) + 0), speed));
		}	
	}

	// collission detection function----------------------------------------------------------------------------------------
	function collisionDetection(rect1, rect2) {
		return !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y);
	}

	// Make player move with the arrow keys-----------------------------------------------------------------------------------
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	function keyDownHandler(e) {
	    if(e.key == "Up" || e.key == "ArrowUp") {
	        upPressed = true;
	    }
	    else if(e.key == "Right" || e.key == "ArrowRight") {

	        rightPressed = true;
	    }
	    else if(e.key == "Down" || e.key == "ArrowDown") {
	        downPressed = true;
	    }
	    else if(e.key == "Left" || e.key == "ArrowLeft") {
	        leftPressed = true;
	    }
	}

	function keyUpHandler(e) {
	    if(e.key == "Up" || e.key == "ArrowUp") {
	        upPressed = false;
	    }
	    else if(e.key == "Right" || e.key == "ArrowRight") {
	        rightPressed = false;
	    }
	    else if(e.key == "Down" || e.key == "ArrowDown") {
	        downPressed = false;
	    }
	    else if(e.key == "Left" || e.key == "ArrowLeft") {
	        leftPressed = false;
	    }
	}

	// animate the game-------------------------------------------------------------------------------------------------
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		frame++;
		createEdibles(edibles);
		createEnemies(enemies, 60, dy);
		createEnemies(enemies2, 50, dy2);
		createEnemies(enemies3, 300, dy3);
	    player.draw();
		requestAnimationFrame(animate);
	}
	animate();      

	music.play();
}