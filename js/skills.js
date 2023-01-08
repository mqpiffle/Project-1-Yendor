// *********** WARRIOR SkillS ***********
// probably shouls be class
class Skill {
    constructor(name, description, targetType, rangeModifier, duration, areaOfEffectType, physDamageModifier, magDamageModifier, physResistModifier, magResistModifier, cooldown, icon, effect) {
        this.name = name
        this.description = description
        // targetType must be 'SELF', 'ENEMY', or 'ANY'
        this.targetType = targetType
        this.rangeModifer = rangeModifier
        this.duration = duration
        // AoE this needs to be a function.
        // maybe start with three or four different types of AoE, ie:
        // single-target, 'cleave' - target tile plus two adjacent, 'burst
        this.areaOfEffectType = areaOfEffectType 
        this.physDamageModifier = physDamageModifier
        this.magDamageModifier = magDamageModifier
        this.physResistModifier = physResistModifier
        this.magResistModifier = magResistModifier
        this.cooldown = cooldown
        this.icon = icon
        this.effect = effect
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

const warTetanusStrike = new Skill(
    'Tetanus Strike',
    "A weak attack which deals a small amount of damage over time.",
    'ENEMY',
    1,
    0,
    null,// this.aoeSingleTarget(target),single target
    0,
    0,
    0,
    0,
    0,
    '../images/skills/sword_and_shield_tetanus_strike_1.png',
    ''
)

const warRustySlash = new Skill(
    'Rusty Slash',
    'A strong attack the target plus any enemies in tile asjaent to both the target enemy and yourself.',
    'ENEMY',
    1,
    0,
    null, //this.aoeCleave(target),
    3,
    0,
    0,
    0,
    0,
    '../images/skills/sword_and_shield_rusty_slash_1.png',
    ''
)

const warWeakBlock = new Skill(
    'Weak Block',
    'Raise your shield to gain physical resistance for 3 turns.',
    'SELF',
    0,
    3,
    null, //this.aoeCleave(target),
    3,
    0,
    0,
    0,
    0,
    '../images/skills/sword_and_shield_weak_block_1.png',
    ''
)
