// *********** CHARACTER CLASS DEFINITIONS ***********

const Warrior = {
    name: 'Warrior',
    weapon: wpnWarrior1,
    maxHealthModifier: 20,
    maxEnergyModifier: 0,
    get physAttack() { return 50 + this.weapon.physAttackModifier },
    get magAttack()  { return 0 + this.weapon.magAttackModifier },
    get physResistModifier() { return 50 + this.weapon.physResistModifier },
    get magResistModifier()  { return 10 + this.weapon.magResistModifier },
    sprite: '../images/DoY_warrior_1.png' 
}

const Huntress = {
    name: 'Huntress',
    weapon: wpnWarrior1,
    maxHealthModifier: 0,
    maxEnergyModifier: 0,
    get physAttack() { return 50 + this.weapon.physAttackModifier },
    get magAttack()  { return 0 + this.weapon.magAttackModifier },
    get physResistModifier() { return 35 + this.weapon.physResistModifier },
    get magResistModifier()  { return 35 + this.weapon.magResistModifier },
    sprite: '../images/DoY_huntress_1.png'
}

const Wizard = {
    name: 'Wizard',
    weapon: wpnWarrior1,
    maxHealthModifier: -10,
    maxEnergyModifier: 10,
    get physAttack() { return 50 + this.weapon.physAttackModifier },
    get magAttack()  { return 0 + this.weapon.magAttackModifier },
    get physResistModifier() { return 10 + this.weapon.physResistModifier },
    get magResistModifier()  { return 50 + this.weapon.magResistModifier },
    sprite: '../images/DoY_wizard_1.png'
}
