const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// create circle set 1--------------------------------------------------------------------------------------------------
function CircleObject(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		// ctx.strokeStyle = "#0095DD";
		// ctx.lineWidth = 5;
		// ctx.stroke();
		ctx.fillStyle = '#0095DD';
		ctx.fill();
	}

	this.update = function() {
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

let circleArray = [];

for (let i = 0; i < 1000; i++) {
	let radius = Math.random() * 1;
	let x = Math.random() * (canvas.width - radius * 2) + radius;
	let y = Math.random() * (canvas.height - radius * 2) + radius;
	let dx = (Math.random() - 0.5);
	let dy = (Math.random() - 0.5);

	circleArray.push(new CircleObject(x, y, dx, dy, radius));
}

// create circle set 2--------------------------------------------------------------------------------------------------
function CircleObject2(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		// ctx.strokeStyle = "#0095DD";
		// ctx.lineWidth = 5;
		// ctx.stroke();
		ctx.fillStyle = '#6699CC';
		ctx.fill();
	}

	this.update = function() {
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

let circleArray2 = [];

for (let i = 0; i < 800; i++) {
	let radius = Math.random() * 1.5;
	let x = Math.random() * (canvas.width - radius * 2) + radius;
	let y = Math.random() * (canvas.height - radius * 2) + radius;
	let dx = (Math.random() - 1);
	let dy = (Math.random() - 1);

	circleArray2.push(new CircleObject2(x, y, dx, dy, radius));
}

// create circle set 3--------------------------------------------------------------------------------------------------
function CircleObject3(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		// ctx.strokeStyle = "#0095DD";
		// ctx.lineWidth = 5;
		// ctx.stroke();
		ctx.fillStyle = '#6699CC';
		ctx.fill();
	}

	this.update = function() {
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

let circleArray3 = [];

for (let i = 0; i < 600; i++) {
	let radius = Math.random() * 1.2;
	let x = Math.random() * (canvas.width - radius * 2) + radius;
	let y = Math.random() * (canvas.height - radius * 2) + radius;
	let dx = (Math.random() - 3);
	let dy = (Math.random() - 3);

	circleArray3.push(new CircleObject3(x, y, dx, dy, radius));
}

// create mousemove function--------------------------------------------------------------------------------------------------
function mouseMoveFunction(e) {
	let x = e.clientX;
	let y = e.clientY;

}

// create squares--------------------------------------------------------------------------------------------------
// function SquareObjects(x, y, dx, dy, size) {
// 	this.x = x;
// 	this.y = y;
// 	this.dx = dx;
// 	this.dy = dy;
// 	this.size = size;

// 	this.draw = function() {
// 		ctx.beginPath();
// 		ctx.fillRect(this.x, this.y, this.size, this.size);		
// 		ctx.fillStyle = '#6fa8dc';
// 		ctx.fill();
// 	}

// 	this.update = function() {
// 		if (this.x + this.size > canvas.width || this.x - this.size < 0) {
// 			this.dx = -this.dx;
// 		}
// 		if (this.y + this.size > canvas.height || this.y - this.size < 0) {
// 			this.dy = -this.dy;
// 		}

// 		this.x += this.dx;
// 		this.y += this.dy;

// 		this.draw();
// 	}
// }

// let squareArray = [];

// for (let i = 0; i < 600; i++) {
// 	let size = Math.random() * 6;
// 	// let height = Math.random() * 5;
// 	let x = Math.random() * (canvas.width - size * 2) + size;
// 	let y = Math.random() * (canvas.height - size * 2) + size;
// 	let dx = (Math.random() - 0.5);
// 	let dy = (Math.random() - 0.5);

// 	squareArray.push(new SquareObjects(x, y, dx, dy, size));
// }

// loop round and round------------------------------------------------------------------------------------------------
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

	for (let i = 0; i < circleArray2.length; i++) {
		circleArray2[i].update();
	}

	// for (let j = 0; j < squareArray.length; j++) {
	// 	squareArray[j].update();
	// }
}

animate();

// SFX--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const powerUp = new Audio("./sfx/powerUp.mp3");
// const hit = new Audio("./sfx/hit.mp3");
// const music = new Audio("./sfx/music.mp3");
// music.volume = 0.1;  
// const throughWalls = new Audio("./sfx/through-walls.mp3");
// const walking = new Audio("./sfx/walking.mp3");

// // Make player move with the arrow keys-----------------------------------------------------------------------------------
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.key == "Up" || e.key == "ArrowUp") {
//         upPressed = true;
//     }
//     else if(e.key == "Right" || e.key == "ArrowRight") {

//         rightPressed = true;
//     }
//     else if(e.key == "Down" || e.key == "ArrowDown") {
//         downPressed = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.key == "Up" || e.key == "ArrowUp") {
//         upPressed = false;
//     }
//     else if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Down" || e.key == "ArrowDown") {
//         downPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }

// animate the game-------------------------------------------------------------------------------------------------
// function animate() {
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	frame++;	
//     createBalls();
// 	requestAnimationFrame(animate);
// }
// animate();      
// music.play();