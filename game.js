window.onclick = function() {
	var div = document.getElementById("titlePage");
	div.parentNode.removeChild(div);
	var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');
	score = 0;
	level = 0;
	direction = 0;
	snake = new Array(3);
	active = true;
	speed = 40;

	var map = new Array(120);
	for (var i = 0; i < map.length; i++) {
		map[i] = new Array(120);
	}

	canvas.width = 1200;
	canvas.height = 535;

	var body = document.getElementsByTagName('body')[0];
	body.appendChild(canvas);

	var mainMusic = document.createElement('audio');
	mainMusic.setAttribute('src', 'snowfall.ogg');
	mainMusic.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
		}, false);
	mainMusic.play();

	map = snakeGen(map);
	map = foodGen(map);
	drawGame();


	window.addEventListener('keydown', function(e) {
    if (e.keyCode === 38 && direction !== 3) {
    direction = 2; // Up
    } else if (e.keyCode === 40 && direction !== 2) {
    direction = 3; // Down
    } else if (e.keyCode === 37 && direction !== 0) {
    direction = 1; // Left
    } else if (e.keyCode === 39 && direction !== 1) {
    direction = 0; // Right
    } 
    });
   


	function drawGame()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = snake.length - 1; i >= 0; i--) {
			if (i === 0) {
				switch(direction) {
				case 0: //right
					snake[0] = { x: snake[0].x + 1, y: snake[0].y }
					break;
				case 1: //left
					snake[0] = { x: snake[0].x - 1, y: snake[0].y }
					break;
				case 2: //up
					snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
					break;
				case 3: //down
					snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
					break;
				
			}

			if (snake[0].x < 0 ||
				snake[0].x >= 120 ||
				snake[0].y < 0 ||
				snake[0].y >= 51) {
				loser();
				return;
			}

			if (map[snake[0].x][snake[0].y] === 1) {
				score += 5;
				map = foodGen(map);
				var eatNoise = document.createElement('audio');
				eatNoise.setAttribute('src', 'replenish.ogg');
				eatNoise.play();

				for (var i = 0; i < 5; i++) {
				snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
				map[snake[snake.length - 1].x][snake[snake.length - 2].y] = 2;
				
				}

				if ((score % 10) == 0) {
				level += 1;
				}
			}

			else if (map[snake[0].x][snake[0].y] === 2) {
				loser();
				return;
			}
			

			map[snake[0].x][snake[0].y] = 2;
			}
		 else {
			if (i === (snake.length -1)) {
				map[snake[i].x][snake[i].y] = null;				
			}

			snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y};
			map[snake[i].x][snake[i].y] = 2;

			}
		
		}

		drawMain();

		for (var x = 0; x < map.length; x++) {
			for (var y = 0; y < map[0].length; y++) {

				if (map[x][y] === 1) {
					
					ctx.fillStyle = 'white';
					ctx.fillRect(x * 10, y * 10 +20, 10, 10);
				}
				else if (map[x][y] === 2) {
					ctx.fillStyle = 'white';
					ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
				}
				
			}
		}

		if (active) {
			setTimeout(drawGame, speed - (level));
		}

	}

	
	
	function drawMain()
	{
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'white';
		ctx.fillStyle = 'white';
		ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);
		ctx.fillText('Points: ' + score, 2, 14);
	}

	function foodGen(map)
	{
		var randX = Math.round(Math.random()*119),
			randY = Math.round(Math.random()*50);

		while (map[randX][randY] === 2) {
			randX = Math.round(Math.random()*19),
			randY = Math.round(Math.random()*19);
		}

		map[randX][randY] = 1;

		return map;
	}

	function snakeGen(map) 
	{
		var randX = Math.round(Math.random()*19),
			randY = Math.round(Math.random()*19);

		while ((randX - snake.length) < 0) {
			randX = Math.round(Math.random()*19);
		}

		for (var i = 0; i < snake.length; i++) {
			snake[i] = { x: randX - i, y: randY };
			map[randX - i][randY] = 2;
		}
		return map;
	}




	function loser() 
	{
		var gameOver = document.createElement('audio');
		gameOver.setAttribute('src', 'applause.ogg');
		gameOver.play();


		ctx.clearRect(0, 0, canvas.width, canvas.height);

		
		ctx.font = '16px sans-serif';
		ctx.fillStyle = 'white';

		ctx.fillText('Final Points: ' + score + '  Click to play again!', ((canvas.width /2 ) - (ctx.measureText('Final Points: ' + score + '  Click to play again!').width /2 )), 70);

		active = false;
		playAgain();
		return;

	
}	
	function playAgain() {
		window.onclick = function() {
		

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		active = true;
		snake.length = 3;
		
		map = Array(120);
	for (var i = 0; i < map.length; i++) {
		map[i] = new Array(120);
	}

		map = snakeGen(map);
		map = foodGen(map);
		drawGame();
		score = 0;
		level = 0;
		direction = 0;
		speed = 40;

		}
	}
};
