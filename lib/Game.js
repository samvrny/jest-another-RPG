const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('Goblin', 'Sword'));
    this.enemies.push(new Enemy('Wraith', 'Havoc'));
    this.enemies.push(new Enemy('Wizard', 'M249SAW'));
    this.enemies.push(new Enemy('Tweaker', 'Refridgerator'));
    this.enemies.push(new Enemy('Politician', 'Slave'));
    this.enemies.push(new Enemy('Hippy', 'Dreadlock Flail'));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your Heros name?'
        })
        //destructure name from the prompt object
        .then(({name}) => {
            this.player = new Player(name);

            //test the object creation
            console.log(this.currentEnemy, this.player);
        });
};

module.exports = Game;