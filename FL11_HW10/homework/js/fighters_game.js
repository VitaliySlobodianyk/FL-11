let hundred = 100;
let getRandomPercent = function () {
    return Math.floor(Math.random() * Math.floor(hundred+1));
  };

let FighterConfig = function (name='None', damage=0, totalHP=0, agility=0) {
    this.name = name;
    this.damage = damage;
    this.totalHP = totalHP;
    this.currentHP = totalHP;
    while( agility >= hundred){
        agility-= hundred;
    }
    this.agility = agility;    
    this.statistic = {
        wins: 0,
        loses: 0
    };
};
class Fighter {
    constructor(name, damage, totalHP, agility) {
       let fighterObj = new FighterConfig(name, damage, totalHP, agility);
        this.getName = () => fighterObj.name;
        this.getDamage = () => fighterObj.damage;
        this.getAgility = () => fighterObj.agility;
        this.getHealth = () => fighterObj.currentHP;
        this.attack = (defender) => {
            let succes = hundred - defender.getAgility();
            let attackPosibility = getRandomPercent();
             console.log(`Attack posibility ${attackPosibility} Succes${succes}`);
            if (attackPosibility <= succes) {
                defender.dealDamage(this.getDamage());
                return `${this.getName()} make ${this.getDamage()} damage to ` +
                    `${defender.getName()}`;
            } else {
                return `${this.getName()} attack missed`;
            }
        };
        this.logCombatHistory = () => {
           console.log(`${this.getName()} Wins:${fighterObj.statistic.wins} Loses:${fighterObj.statistic.loses}`);
        };
        this.heal = function (healAmount) {
            fighterObj.currentHP = fighterObj.currentHP + healAmount < fighterObj.totalHP ?
                fighterObj.currentHP + healAmount : fighterObj.totalHP;
            console.log(`${this.getName()} has been healed, amount of HP:${this.getHealth()}`);
        };
        this.dealDamage = function (damageAmount) {
            fighterObj.currentHP = fighterObj.currentHP - damageAmount < 0 ? 0 : fighterObj.currentHP - damageAmount;
        };
        this.addWin = () => fighterObj.statistic.wins++;
        this.addLoss = () => fighterObj.statistic.loses++;
    }
}

let battle = function (fighter1, fighter2) {
    if (fighter1.getHealth() === 0) {
        console.log(`${fighter1.getName()} is dead and cant fight!`);
    } else if (fighter2.getHealth() === 0) {
        console.log(`${fighter2.getName()} is dead and cant fight!`);
    } else {
        while (fighter1.getHealth() !== 0 && fighter2.getHealth() !== 0) {
            console.log(fighter1.attack(fighter2));
            if (fighter2.getHealth() !== 0) {
                console.log(fighter2.attack(fighter1));
            }
        }
        if (fighter1.getHealth() === 0) {
            fighter1.addLoss();
            fighter2.addWin();
            console.log(`${fighter2.getName()} has won!`);
        } else {
            fighter2.addLoss();
            fighter1.addWin();
            console.log(`${fighter1.getName()} has won!`);
        }
    }
};

