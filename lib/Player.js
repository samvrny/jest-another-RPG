const Potion = require('../lib/Potion');
const Character = require('./Character');

class Player extends Character {
    constructor(name = '') {

        super(name);
        this.inventory = [new Potion('health'), new Potion()];
    }

    //returns an object with various player properties
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    //returns the inventory array or false if empty
    getInventory() {
        if(this.inventory.length) {
            return this.inventory
        }
        return false;
    };

    addPotion(potion) {
        this.inventory.push(potion);
    };

    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];

        switch(potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    };
}

module.exports = Player;


// Player.prototype.getHealth = function() {
    //     return `${this.name}'s health is now ${this.health}!`;
    // };

    // Player.prototype.isAlive = function() {
    //     if(this.health === 0) {
    //         return false;
    //     }
    //     return true;
    // };

    // Player.prototype.reduceHealth = function(health) {
    //     this.health -=health;

    //     if(this.health < 0) {
    //         this.health = 0;
    //     }
    // };

    // Player.prototype.getAttackValue = function() {
    //     const min = this.strength - 5;
    //     const max = this.strength + 5;

    //     return Math.floor(Math.random() * (max - min) + min);
    // };