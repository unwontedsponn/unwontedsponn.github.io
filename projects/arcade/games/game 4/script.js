const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function startGame() {
	document.getElementById('start').style.display = "none"; 
    document.getElementById('myCanvas').style.display = "block";  

    // Global variables
	let timer = 0;
    let count = 0;

	let [upPressed, rightPressed, downPressed, leftPressed] = [false, false, false, false];
	let x = Math.floor(Math.random() * (575 - 10 + 1) + 10);
	let y = Math.floor(Math.random() * (575 - 10 + 1) + 10);
	const [dy, dy2, dy3] = [3, 5, 9];
	const cellSize = 20;
	const edibles = [];	
	let frame = 0;

	const originalColour = canvas.style.backgroundColor;

	// Sound effects
	const soundEffects = {
		powerUp: new Audio("./sfx/powerUp.mp3"),
		hit: new Audio("./sfx/hit.mp3"),
		music: new Audio("./sfx/music.mp3"),
		throughWalls: new Audio("./sfx/through-walls.mp3")
	};
	soundEffects.music.volume = 0.1;  

	// Create player
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

			// Move the player based on key presses
		    if (upPressed) this.y -=10;
		    else if (rightPressed) this.x += 10;
		    else if (downPressed) this.y += 10;
		    else if (leftPressed) this.x -= 10;

		    // Allow player to wrap around the screen
		    if (this.x > canvas.width - 5 || this.x < 0 || this.y > canvas.height - 5 || this.y < 0) {
		    	soundEffects.throughWalls.play();
		    	if(this.x > canvas.width - 5) player.x = 0;
		    	if(this.x < 0) player.x = canvas.width;
		    	if(this.y > canvas.height - 5) player.y = 1;
		    	if(this.y < 0) player.y = canvas.height;		   
		    }	
		    // GROWING THE SNAKE
		    if (!(collisionDetection(player, this))) {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			} else {
				// If player collides with an edible, increase it's size
				this.height += 20;
				// ctx.fillStyle = this.color;
				// ctx.fillRect(this.x, this.y, this.width, this.height);										
			}
		}		
	}
	let player = new Player(x, y);

	// Create edible
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
				// If player collides with an edible, update its position and increment the count
				this.y = Math.floor(Math.random() * (575 - 10 + 1) + 10);
				this.x = Math.floor(Math.random() * (575 - 10 + 1) + 10);
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
				soundEffects.powerUp.play();			
				count++;
			}
		}								
	}

	function createEdibles(ediblesArray) {
		// Draw existing edible
		for (let i = 0; i < ediblesArray.length; i++) {
			ediblesArray[i].draw();
		}
		// If no edible exists, create a new one at a random position
		if (ediblesArray.length === 0) {
			ediblesArray.push(new Edible(
				Math.floor(Math.random() * (575 - 10 + 1) + 10), 
				Math.floor(Math.random() * (575 - 10 + 1) + 10)
			));
		}
	}

	// Collission detection function
	function collisionDetection(rect1, rect2) {
		return !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y);
	}

	// Event listeners for arrow key presses
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	function keyDownHandler(e) {
	    if (e.key == "Up" || e.key == "ArrowUp") upPressed = true;
	    else if (e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
	    else if (e.key == "Down" || e.key == "ArrowDown") downPressed = true;
	    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
	}

	function keyUpHandler(e) {
	    if (e.key == "Up" || e.key == "ArrowUp") upPressed = false;
	    else if (e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
	    else if (e.key == "Down" || e.key == "ArrowDown") downPressed = false;
	    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
	}

	// animate the game
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		frame++;
		createEdibles(edibles);		
	    player.draw();
		requestAnimationFrame(animate);
		// Add score and timer to canvas
		ctx.font = "14px valorax";
		ctx.fillStyle = "black";
		ctx.fillText("Score: " + count, 10, 30);
		ctx.fillText("Time: " + formatTime(timer), 10, 50);
	}
	
	animate();      
	soundEffects.music.play();

	// Formatting timer function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Format the time with leading zeros if necessary
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
          
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    // Increment timer in seconds
    setInterval(() => {
        timer++;
    }, 1000);

    // Add onclick function to muteButton that toggles sfx on/off
    muteButton.addEventListener("click", function() {
        toggleMute();
    });

    // Toggle function for mute on/off
    function toggleMute() {
        // Iterate over the properties of the soundEffects object
        for (let key in soundEffects) {
            // Check if the property belongs to the soundEffects object itself and toggle the muted state of each audio element
            if (soundEffects.hasOwnProperty(key)) soundEffects[key].muted = !soundEffects[key].muted;
        }

        if (soundEffects.music.muted) muteButton.textContent = "Unmute";
        else muteButton.textContent = "Mute";
    }
}