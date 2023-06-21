// *********** WARRIOR SkillS ***********
// probably shouls be class
class Skill {
  constructor(
    name,
    description,
    targetType,
    range,
    duration,
    areaOfEffectType,
    physDamageModifier,
    magDamageModifier,
    physResistModifier,
    magResistModifier,
    cooldown,
    icon,
    effect
  ) {
    this.name = name;
    this.description = description;
    // targetType must be 'SELF', 'ENEMY', or 'ANY'
    this.targetType = targetType;
    this.range = range;
    this.duration = duration;
    // AoE this needs to be a function.
    // maybe start with three or four different types of AoE, ie:
    // single-target, 'cleave' - target tile plus two adjacent, 'burst
    this.areaOfEffectType = areaOfEffectType;
    this.physDamageModifier = physDamageModifier;
    this.magDamageModifier = magDamageModifier;
    this.physResistModifier = physResistModifier;
    this.magResistModifier = magResistModifier;
    this.cooldown = cooldown;
    this.icon = icon;
    this.effect = effect;

    this.validTargets = [];
    this.selectedTargetIndex = 0;
  }

  aoeSingleTarget = function (target) {
    // get enemy under selected tile and target it
    // target tile must be occupied
    console.log(`aoe single target`);
  };

  aoeCleave = function (target) {
    // target and two adjacent tiles are targeted
    // target tile must be occupied
    console.log(`aoe cleave`);
  };

  aoeBurst = function (target, radius) {
    // target tile is the center of an area with radius size in each direction
    // none of the tiles must be occupied
    console.log(`aoe burst`);
  };

  executeSkill = function () {
    const go = new GameObject();
    // effects to all vaild targets
    playerCharacter.attack(this.validTargets[this.selectedTargetIndex]);
    // end turn
    this.validTargets = [];
    go.ctx2.clearRect(0, 0, 960, 960);
    playerCharacter.endTurn();
  };

  currentlySelectedTile = function (target) {
    const go = new GameObject();
    go.ctx2.clearRect(0, 0, 960, 960);
    go.ctx2.strokeStyle = "green";
    go.ctx2.shadowColor = "green";
    go.ctx2.shadowBlur = 10;
    go.ctx2.lineWidth = 3;
    go.ctx2.strokeRect(
      target.xPos - tileCenter,
      target.yPos - tileCenter,
      gridSize,
      gridSize
    );

    // draw a square at the given coordinates
  };

  getValidTargetsInRange = function (range) {
    for (let i = 1; i < actorList.length; i++) {
      if (
        Math.abs(actorList[0].xPos - actorList[i].xPos) <= range * gridSize &&
        Math.abs(actorList[0].yPos - actorList[i].yPos) <= range * gridSize
      ) {
        this.validTargets.push(actorList[i]);
      }
    }
  };

  selectTarget = function (key) {
    // move through list with 't'
    if (key === "KeyT") {
      if (this.selectedTargetIndex === this.validTargets.length - 1) {
        this.selectedTargetIndex = 0;
        this.currentlySelectedTile(this.validTargets[this.selectedTargetIndex]);
      } else {
        this.selectedTargetIndex++;
        this.currentlySelectedTile(this.validTargets[this.selectedTargetIndex]);
      }
    }
    if (key === "Enter") {
      this.executeSkill();
    }
    // apply effects by hitting 'enter' , or 'esc' to exit skill selection

    // if target type = 'SELF', immediately initiate effects

    // initiate effects

    // clean up valid target array
  };

  init = function () {
    this.validTargets = [];
    this.getValidTargetsInRange(this.range);
    if (this.validTargets.length !== 0) {
      this.currentlySelectedTile(this.validTargets[this.selectedTargetIndex]);
      this.selectTarget();
    }
    document.addEventListener("keypress", (e) => {
      this.selectTarget(e.code);
    });
  };
}

const warTetanusStrike = new Skill(
  "Tetanus Strike",
  "A weak attack which deals a small amount of damage over time.",
  "ENEMY",
  1,
  0,
  null, // this.aoeSingleTarget(target),single target
  1,
  0,
  0,
  0,
  0,
  "images/skills/sword_and_shield_tetanus_strike_1.png",
  ""
);

const warRustySlash = new Skill(
  "Rusty Slash",
  "A strong attack the target plus any enemies in tile asjaent to both the target enemy and yourself.",
  "ENEMY",
  1,
  0,
  null, //this.aoeCleave(target),
  3,
  0,
  0,
  0,
  0,
  "images/skills/sword_and_shield_rusty_slash_1.png",
  ""
);

const warWeakBlock = new Skill(
  "Weak Block",
  "Raise your shield to gain physical resistance for 3 turns.",
  "SELF",
  0,
  3,
  null, //this.aoeCleave(target),
  3,
  0,
  0,
  0,
  0,
  "images/skills/sword_and_shield_weak_block_1.png",
  ""
);
