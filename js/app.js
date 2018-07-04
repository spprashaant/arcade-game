let modal = document.getElementById('myModal');
let resetButton = document.getElementsByClassName('reset-button')[0];
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Enemies our player must avoid
var Enemy = function (row, col) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set initial position of the enemies and 
    // store initial values to use when resetting
    this.xinit = this.x = (col - 1) * 101;
    this.yinit = this.y = 62 + (row - 1) * 83;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Update the position
    if (this.x > 505) {
        this.x = 0;
    }
    else {
        this.x += 100 * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 2 * 101;
        this.y = 5 * 83 - 30;
    }
    update(dt) {
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // handle the key press events for the player
    handleInput(key) {
        switch (key) {
            case 'left':
                this.x -= 101;

                if (this.x < 0) {
                    this.x = 4 * 101;
                }
                break;
            case 'up':
                this.y -= 83;
                this.ytop -= 83;
                if (this.y < 0) {
                    modal.style.display = "block";
                }
                break;
            case 'right':
                this.x += 101;

                if (this.x > 404) {
                    this.x = 0;
                }
                break;
            case 'down':
                this.y += 83;
                this.ytop += 83;
                if (this.y > 385) {
                    this.y = 83 - 30;
                    this.ytop = 83;
                }
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(1, 1), new Enemy(2, 5), new Enemy(3, 2), new Enemy(3, 3)];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

/* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
function reset() {
    allEnemies.forEach(function (enemy) {
        enemy.x = enemy.xinit;
        enemy.y = enemy.yinit;
    });
    // noop
    player.x = 2 * 101;
    player.y = 5 * 83 - 30;
}

//reset button on the modal, close and reset
resetButton.addEventListener('click', function () {
    modal.style.display = "none";
    reset();
});