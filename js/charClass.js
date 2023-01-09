// *********** CHARACTER CLASS DEFINITIONS ***********

const Warrior = {
    name: 'Warrior',
    weapon: wpnWarrior1,
    maxHealthModifier: 20,
    maxEnergyModifier: 0,
    get physAttack() { return 50 + this.weapon.physAttackModifier },
    get magAttack()  { return 0 + weapon.magAttackModifier },
    get physResistModifier() { return 50 + this.weapon.physResistModifier },
    get magResistModifier()  { return 10 + weapon.magResistModifier },
    sprite: '../images/DoY_warrior_1.png' || 'https://imgur.com/qN08WlD'
}

const Huntress = {
    name: 'Huntress',
    weapon: wpnWarrior1,
    maxHealthModifier: 0,
    maxEnergyModifier: 0,
    get physAttack() { return 50 + this.weapon.physAttackModifier },
    get magAttack()  { return 0 + weapon.magAttackModifier },
    get physResistModifier() { return 35 + this.weapon.physResistModifier },
    get magResistModifier()  { return 35 + weapon.magResistModifier },
    sprite: '../images/DoY_huntress_1.png' || 'https://imgur.com/nFfhiac'
}

const Wizard = {
    name: 'Wizard',
    weapon: wpnWarrior1,
    maxHealthModifier: -10,
    maxEnergyModifier: 0,
    get physAttack() { return 50 + this.weapon.physAttackModifier },
    get magAttack()  { return 0 + weapon.magAttackModifier },
    get physResistModifier() { return 20 + this.weapon.physResistModifier },
    get magResistModifier()  { return 160 + weapon.magResistModifier },
    sprite: '../images/DoY_wizard_1.png' || 'https://imgur.com/B08vZeF'
}
