class PlayerCharacter {
    constructor (uid, charClass, actorListArrayPos, gridPos) {
        this.canvas = gameWorld.canvas
        this.ctx = gameWorld.ctx
        this.width = gameWorld.width
        this.height = gameWorld.height

        this.uid = uid
        this.charClass = charClass
        this.actorListArrayPos = actorListArrayPos
        this.gridPos = gridPos
        this.xPos = this.gridPos[0]
        this.yPos = this.gridPos[1]
        this.gridX = this.xPos / gridSize + tileCenter
        this.gridY = this.yPos / gridSize + tileCenter
        this.weapon = this.charClass.weapon
        this.characterType = 'PC'
        this.enemyType = 'ENEMY'
        this.alive = true

        this.baseHealth = 100
        this.maxHealth = this.baseHealth + this.charClass.maxHealthModifier
        this.currentHealth = this.maxHealth

        this.baseEnergy = 100
        this.maxEnergy = this.baseEnergy + this.charClass.maxEnergyModifier
        this.currentEnergy = this.maxEnergy

        this.physAttack = this.charClass.physAttack


        this.magAttack = this.charClass.magAttack


        this.physResist = this.charClass.physResistModifier


        this.magResist = this.charClass.magResistModifier


        this.potionCharges = 1
        this.potionMaxCharges = 3

        this.level = 1
        this.xp = 0
        this.xpToNextLevel = 100
    }

    render = function () {
        const pcSprite = new Image()
        pcSprite.onload = () => {
            this.ctx.drawImage(pcSprite, this.xPos - tileCenter, this.yPos - tileCenter, gridSize, gridSize)
        }
        pcSprite.src = '../images/DoY_warrior_1.png' || this.charClass.sprite
        console.log(`pc sprite: ${this.charClass.sprite}`)
        // this.ctx.beginPath()
        // this.ctx.arc(this.xPos, this.yPos, gridSize / 3, 0, 2.0 * Math.PI)
        // this.ctx.fillStyle = this.displayColor
        // this.ctx.fill()
    }

    endTurn = function() {
        if (playerCharacter.currentHealth <= 0) {
            gameWorld.gameOver('lose')
        } 
        if (actorList.length === 1) {
            gameWorld.gameOver('win')
        }
        this.ctx.clearRect(0, 0, this.width, this.height)
        gameWorld.mapDraw()
        actorList.splice(0, 1, playerCharacter)
        setTimeout(() => {
            actorList[0].render()
        }, 100)
        
        console.log(actorList)
        for (let i = 1; i < actorList.length; i++) {
            let enemy = actorList[i]
            enemy.actorListArrayPos = i
            enemy.decisionHandler()
            actorList.splice(enemy.actorListArrayPos, 1, enemy)
            enemy.render('hotPink')
        }
        gameUI.update(this.currentHealth, this.maxHealth, this.xp, this.xpToNextLevel)
    }

    usePotion = function() {
        if (this.maxHealth - this.currentHealth < 50) {
            this.currentHealth = this.maxHealth
        } else {
            this.currentHealth += 50
        }
        console.log(`potion used, current health ${this.currentHealth}/${this.maxHealth}`)
        this.endTurn()
    }

    useSkill = function(skillToUse) {
        // itialize the skill
        // nonono -- move the targetting logic here, then fire off the skill on [Enter]!!
        skillToUse.init()
    }

    attack = function(target)  {
        let defenderHealth = target.currentHealth
        const incomingDamage = this.physAttack - (this.physAttack * target.physResist) + this.magAttack - (this.magAttack * target.magResist)
        defenderHealth = defenderHealth - incomingDamage
        console.log(`${this.uid} deals ${incomingDamage} to ${target.uid}`)
        return defenderHealth
    }

    moveUp = function() {
        const targetAt = actorAt(this.xPos, this.yPos - gridSize)
        if (!isCollision(this.xPos, this.yPos - gridSize) && this.yPos > tileCenter) {
            this.yPos -= gridSize
        } else if (isCollision(this.xPos, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('up')
    }
    moveUpRight = function() {
        const targetAt = actorAt(this.xPos + gridSize, this.yPos - gridSize)
        if (!isCollision(this.xPos + gridSize, this.yPos - gridSize) && this.yPos > tileCenter && this.xPos < this.width - tileCenter) {
            this.yPos -= gridSize
            this.xPos += gridSize
        } else if (isCollision(this.xPos + gridSize, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('up-right')
    }
    moveRight = function() {
        const targetAt = actorAt(this.xPos + gridSize, this.yPos)
        if (!isCollision(this.xPos + gridSize, this.yPos) && this.xPos < this.width - tileCenter) {
            this.xPos += gridSize
        } else if (isCollision(this.xPos + gridSize, this.yPos) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('right')
    }
    moveDownRight = function() {
        const targetAt = actorAt(this.xPos + gridSize, this.yPos + gridSize)
        if (!isCollision(this.xPos + gridSize, this.yPos + gridSize) && this.yPos < this.height - tileCenter && this.xPos < this.width - tileCenter ) {
        this.yPos += gridSize
        this.xPos += gridSize
        } else if (isCollision(this.xPos + gridSize, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('down-right')
    }
    moveDown = function() {
        const targetAt = actorAt(this.xPos, this.yPos + gridSize)
        if (!isCollision(this.xPos, this.yPos + gridSize) && this.yPos < this.height - tileCenter) {
            this.yPos += gridSize
        } else if (isCollision(this.xPos, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('down')
    }
    moveDownLeft = function() {
        const targetAt = actorAt(this.xPos - gridSize, this.yPos + gridSize)
        if (!isCollision(this.xPos - gridSize, this.yPos + gridSize) && this.yPos < this.height - tileCenter && this.xPos > tileCenter) {
            this.yPos += gridSize
            this.xPos -= gridSize
        } else if (isCollision(this.xPos - gridSize, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        // console.log('down-left')
        }
    }
    moveLeft = function() {
        const targetAt = actorAt(this.xPos - gridSize, this.yPos)
        if (!isCollision(this.xPos - gridSize, this.yPos) && this.xPos > tileCenter) {
            this.xPos -= gridSize
        } else if (isCollision(this.xPos - gridSize, this.yPos) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('left')
    }
    moveUpLeft = function() {
        const targetAt = actorAt(this.xPos - gridSize, this.yPos - gridSize)
        if (!isCollision(this.xPos - gridSize, this.yPos - gridSize) && this.yPos > tileCenter && this.xPos > tileCenter) {
            this.yPos -= gridSize
            this.xPos -= gridSize
        } else if (isCollision(this.xPos - gridSize, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        }
    }

    pcActionHandler = function(key) {
        // SKILLS -- keys 1,2,3
        if (key === 'Digit1') {
            this.useSkill(this.charClass.weapon.skills[0])
            // this.move(this.targUp, this.boundUp, this.deltaUp)
            // console.log(`x: ${this.xPos}, y: ${this.yPos}`)
        }
        if (key === 'Digit2') {
            this.useSkill(this.charClass.weapon.skills[1])
        }
        if (key === 'Digit3') {            
            this.useSkill(this.charClass.weapon.skills[2])
        }
        // USE POTION = 'p', heal up to 50 hp
        if (key === 'KeyP') {     
            this.usePotion()
        }
        // MOVES -- we'll use the numPad for movement and explicitly define the diagonals
        if (key === 'Numpad8') {
            this.moveUp()
            // this.move(this.targUp, this.boundUp, this.deltaUp)
            // console.log(`x: ${this.xPos}, y: ${this.yPos}`)
            this.endTurn()
        }
        if (key === 'Numpad9') {
            this.moveUpRight()
            this.endTurn()
        }
        if (key === 'Numpad6') {            
            this.moveRight()
            this.endTurn()
        }
        if (key === 'Numpad3') {
            this.moveDownRight()
            this.endTurn()
        }
        if (key === 'Numpad2') {
            this.moveDown()
            this.endTurn()
        }
        if (key === 'Numpad1') {
            this.moveDownLeft()
            this.endTurn()
        }
        if (key === 'Numpad4') {
            this.moveLeft()
            this.endTurn()
        }
        if (key === 'Numpad7') {
            this.moveUpLeft()
            this.endTurn()
        }
    }
}