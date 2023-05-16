const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function startGame() {
	document.getElementById('start').style.display = "none"; 
    document.getElementById('myCanvas').style.display = "block"; 
    // document.getElementById('end-restart').style.display = "none";  

    // global variables--------------------------------------------------------------------------------
	let count = 1;

	let upPressed = false;
	let rightPressed = false;
	let downPressed = false;
	let leftPressed = false;

	let x = Math.floor(Math.random() * (575 - 10 + 1) + 10);
	let y = Math.floor(Math.random() * (575 - 10 + 1) + 10);

	const dy = 3;
	const dy2 = 5;
	const dy3 = 9;

	const cellSize = 20;
	const gameGrid = [];
	const edibles = [];
	const enemies = [];
	const enemies2 = [];
	const enemies3 = [];

	let frame = 0;

	// let scoreArray = [];
	// function setArrayLength(array, item, length) {
	//   array.unshift(item) > length ?  array.pop() : null;
	// }
	// Use Like this
	// setArrayLength(scoreArray, 'item', 5);

	let scoreArray = [];

	// SFX--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	const powerUp = new Audio("./sfx/powerUp.mp3");
	const hit = new Audio("./sfx/hit.mp3");
	const music = new Audio("./sfx/music.mp3");
	music.volume = 0.1;  
	const throughWalls = new Audio("./sfx/through-walls.mp3");
	const walking = new Audio("./sfx/walking.mp3");

	// game board NOT BEING USED ATM---------------------------------------------------------------------------------------
	class Cell {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.width = cellSize;
			this.height = cellSize;
		}
		draw() {
			ctx.strokeStyle = "black";
			ctx.strokeRect(this.x, this.y, this.width, this.height);
		}
	}

	function createGridCells() {
		for (let y = 0; y < canvas.height; y += cellSize) {
			for (let x = 0; x < canvas.width; x += cellSize) {
				gameGrid.push(new Cell(x, y));
			}
		}
	}
	createGridCells();

	function drawGameGrid() {
		for (let i = 0; i < gameGrid.length; i++) {
			gameGrid[i].draw();
		}
	}

	// create player--------------------------------------------------------------------------------------------------
	class Player {
		constructor(x, y){
			this.x = x;
			this.y = y;
			this.width = cellSize;
			this.height = cellSize;
			this.color = "#0095DD";
		}
		draw() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height, this.color);	

			// Move the player
		    if(upPressed) {	    	
		    	player.y -=10;
		    } else if(rightPressed) {	
		    	player.x += 10;
		    } else if(downPressed) {	   
		    	player.y += 10;
		    } else if (leftPressed) {	    	
		    	player.x -= 10;
		    }

		    // Allow player to go through the walls and back on itself
		    if(player.x > canvas.width - 5) {
		        throughWalls.play();
		        player.x = 0;
		    }
		    if(player.x < 0) {
		        throughWalls.play();
		        player.x = canvas.width;
		    } 
		    if(player.y > canvas.height - 5) {
		        throughWalls.play();
		        player.y = 1;
		    }
		    if(player.y < 0) {
		        throughWalls.play();
		        player.y = canvas.height;
		    }		
		}		
	};

	let player = new Player(x, y);

	// Create edible------------------------------------------------------------------------------------------------
	class Edible {
		constructor(x, y){
			this.x = x;
			this.y = y;
			this.width = cellSize;
			this.height = cellSize;
			this.color = "purple";
		}
		draw() {
			if (!(collisionDetection(player, this))) {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
			} else {
				this.y = Math.floor(Math.random() * (575 - 10 + 1) + 10);
				this.x = Math.floor(Math.random() * (575 - 10 + 1) + 10);
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
				powerUp.play();
				document.getElementById('count').innerHTML = count;
				count++;
			}
		}								
	};

	function createEdibles() {
		for (let i = 0; i < edibles.length; i++) {
			edibles[i].draw();
		}
		if (edibles.length == 0) {
			edibles.push(new Edible(Math.floor(Math.random() * (575 - 10 + 1) + 10), (Math.floor(Math.random() * (575 - 10 + 1) + 10))));
		}
	}

	// Create enemies-------------------------------------------------------------------------------------------------
	class Enemy1 {
		constructor(x){
			this.x = x;
			this.y = 0;
			this.width = cellSize;
			this.height = cellSize;
			this.color = "black";
		}
		update() {
			this.y += dy;
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
				ctx.fillRect(this.x, this.y, this.width, this.height, this.color);				
			}
		}								
	};

	function createEnemies() {
		for (let i = 0; i < enemies.length; i++) {
			enemies[i].update();
			enemies[i].draw();
			// enemy1SFX.play();
		}
		if (frame % 60 === 0) {
			enemies.push(new Enemy1(Math.floor(Math.random() * (599 - 10 + 1) + 0)));
		}	
	}

	class Enemy2 {
		constructor(x){
			this.x = x;
			this.y = 0;
			this.width = cellSize;
			this.height = cellSize;
			this.color = "black";
		}
		update() {
			this.y += dy2;
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
				ctx.fillRect(this.x, this.y, this.width, this.height, this.color);			
			}
		}								
	};

	function createEnemies2() {
		for (let i = 0; i < enemies2.length; i++) {
			enemies2[i].update();
			enemies2[i].draw();
			// enemy1SFX.play();
		}
		if (frame % 50 === 0) {
			enemies2.push(new Enemy2(Math.floor(Math.random() * (599 - 10 + 1) + 0)));
		}
	}

	class Enemy3 {
		constructor(x){
			this.x = x;
			this.y = 0;
			this.width = cellSize;
			this.height = cellSize;
			this.color = "black";
		}
		update() {
			this.y += dy3;
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
				ctx.fillRect(this.x, this.y, this.width, this.height, this.color);			
			}
		}								
	};

	function createEnemies3() {
		for (let i = 0; i < enemies3.length; i++) {
			enemies3[i].update();
			enemies3[i].draw();
			// enemy1SFX.play();
		}
		if (frame % 300 === 0) {
			enemies3.push(new Enemy3(Math.floor(Math.random() * (599 - 10 + 1) + 0)));
		}
	}

	// collission detection function----------------------------------------------------------------------------------------
	function collisionDetection(rect1, rect2) {
		if ( !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y) ) {
			return true;
		}
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
		// drawGameGrid()
		createEdibles();
		createEnemies();
		createEnemies2();
		createEnemies3();
	    player.draw();
		requestAnimationFrame(animate);
	}
	animate();      
music.play();
}