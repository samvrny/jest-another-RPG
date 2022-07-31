const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 1; //was 0, may need to change back to zero
    this.enemyNumber = 0; //this was added by me in place of round number for UI purposes
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

            this.startNewBattle()
        });
};

Game.prototype.startNewBattle = function() {
    if(this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this. isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.battle = function() {
    if(this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use Potion']
            })
            .then(({action}) => {
                if (action === 'Use Potion') {
                    if(!this.player.getInventory()) {
                        console.log('You dont have any potions!');
                        return this.checkEndOfBattle();
                    }

                    inquirer 
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({action}) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion`);
                            this.checkEndOfBattle();
                        });
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                    this.checkEndOfBattle();
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function() {
    if(this.player.isAlive() &&  this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You have defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.currentEnemy.name} dropped a ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;
        this.enemyNumber++; //anywhere enemyNumber is used may need to be changed back into roundNumber

        if(this.enemyNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.enemyNumber];
            this.startNewBattle();
        } else {
            console.log('You have defeated all enemies! You win!');
        }
    } else {
        console.log('Your hero has died');
    }
};


module.exports = Game;

//NOTES: This was a fun assignemnt, and I enjoyed playing this game, simple as it is! (Note for my future self on my coding journey)