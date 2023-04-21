// Get canvas and create the canvas context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Create bouncing ball background--------------------------------------------------------------------------------------------------
// create circle set 1
function CircleObject(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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
}

animate();