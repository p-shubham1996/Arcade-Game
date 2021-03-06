// Enemies our player must avoid


var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
    this.speed = this.speed = Math.floor(Math.random() * 500) + 20;
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -2;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.width = 80;
    this.height = 50;
    this.x = 200;
    this.y = 380;
};


//In case there's a bug the console.log statements help in finding the bug!
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left': 
            if(this.x === -2) {
                console.log("I will Not move any further");
            } else 
            this.x -= 101;
            console.log(this.x);
            break;
        case 'right': 
            if(this.x === 402) {
                console.log("I will Not move any further");
            } else
            this.x += 101;
            console.log(this.x);
            break;
        case 'up': 
        if(this.y === -20) {
                console.log("I will Not move any further");
            } else
            this.y -= 80;
            console.log(this.y);
            break;
        case 'down': if(this.y === 380) {
                console.log("I will Not move any further");
            } else
            this.y += 80;
            console.log(this.y);
            break;
        default:
            console.log("NOPE!!!!"); 

    }
    if(this.y < 0){
        window.alert("Congrats! You won!");
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

var allEnemies = [];

var player = new Player();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-150,55);
var enemy2 = new Enemy(-150,140);
var enemy3 = new Enemy(-150,225);
var enemy4 = new Enemy(-150,140);


allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
// allEnemies.push(enemy4);
Player.prototype.collision = function(player, allEnemies) {
    for(var i = 0; i < allEnemies.length; i++) {
        if(allEnemies[i].x < player.x + player.width && allEnemies[i].x + allEnemies[i].width > player.x && allEnemies[i].y < player.y + player.height && allEnemies[i].y + allEnemies[i].height > player.y)
            player.reset();
    }
};

Player.prototype.update = function() {
    this.collision(this, allEnemies);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

