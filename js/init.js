const enterDungeon = () => {
    const chosenClass = localStorage.getItem('charClass')
    let characterClass

    if (chosenClass === 'Warrior') {
        characterClass = Warrior
    } else if (chosenClass === 'Huntress') {
        characterClass = Huntress
    } else if (chosenClass === 'Wizard') {
        characterClass = Wizard
    }

    gameUI = new GameUI(characterClass)
    gameUI.init()
    // hmmm...now the game can't figure out canvas? because it doesn't exist
    gameWorld = new GameWorld()
    gameWorld.mapDraw()

    playerCharacter = new PlayerCharacter(`pc0`, characterClass, 0, gameWorld.pcSpawnCoordinates())
    playerCharacter.render()
    // console.debug(`character class object ${characterClass}`)
    // console.log(`pc grid pos: ${playerCharacter.gridPos}`)
    actorList.push(playerCharacter)


    gameWorld.enemySpawn(5)
}
