// *********** WARRIOR SkillS ***********
// probably shouls be class
class Skill {
    constructor(name, decription, rangeModifer, duration, areaOfEffectType, physDamageModifier, magDamageModifier, physResistModifier, magResistModifier, icon, effect) {
        this.name = ''
        this.description = ''
        // targetType must be 'SELF', 'ENEMY', or 'ANY'
        this.targetType = ''
        this.rangeModifer = 1
        this.duration = 0
        // AoE this needs to be a function.
        // maybe start with three or four different types of AoE, ie:
        // single-target, 'cleave' - target tile plus two adjacent, 'burst
        this.areaOfEffectType = null 
        this.physDamageModifier = 0
        this.magDamageModifier = 0
        this.physResistModifier = 0
        this.magResistModifier = 0
        this.icon = ''
        this.effect = ''
    }

    aoeSingleTarget = function(target) {
        // get enemy under selected tile and target it
        // target tile must be occupied
        console.log(`aoe single target`)
    }

    aoeCleave = function(target) {
        // target and two adjacent tiles are targeted
        // target tile must be occupied
        console.log(`aoe cleave`)

    }

    aoeBurst = function(target, radius) {
        // target tile is the center of an area with radius size in each direction
        // none of the tiles must be occupied
        console.log(`aoe burst`)
    }
}

const warAutoAttack = new Skill(
    'Basic Attack',
    "Stick 'em, with that corroded blade.",
    'ENEMY',
    1,
    0,
    null,// this.aoeSingleTarget(target),single target
    0,
    0,
    0,
    0,
    '',
    ''
)

const warCleaveAttack = new Skill(
    'Cleave Attack',
    'A strong attack the target plus any enemies in tile asjaent to both the target enemy and yourself.',
    'ENEMY',
    1,
    0,
    null, //this.aoeCleave(target),
    3,
    0,
    0,
    0,
    '',
    ''
)

const warHunker = new Skill(
    'Hunker',
    'Raise your shield to gain physical resistance for 3 turns.',
    'SELF',
    0,
    3,
    null, //this.aoeCleave(target),
    3,
    0,
    0,
    0,
    '',
    ''
)
