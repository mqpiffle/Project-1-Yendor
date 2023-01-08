const initializeGame = () => {
    const chosenClass = localStorage.getItem('charClass')
    let characterClass

    if (chosenClass === 'Warrior') {
        characterClass = Warrior
    } else if (chosenClass === 'Huntress') {
        characterClass = Huntress
    } else if (chosenClass === 'Wizard') {
        characterClass = Wizard
    }

    baseUI = new GameUI(characterClass)
    baseUI.init()
    // hmmm...now the game can't figure out canvas? because it doesn't exist
    const floorOne = new GameWorld()
    floorOne.mapDraw()

    playerCharacter = new PlayerCharacter(`pc0`, characterClass, 0, floorOne.pcSpawnCoordinates())
    playerCharacter.render()
    // console.debug(`character class object ${characterClass}`)
    // console.log(`pc grid pos: ${playerCharacter.gridPos}`)
    actorList.push(playerCharacter)

    floorOne.enemySpawn(5)
}