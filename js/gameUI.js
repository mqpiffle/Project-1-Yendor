// *********** UI STUFF ***********

const body = document.getElementById('body')

// I need to do something to create stateful bits of the UI
// ie: hp/energy/xp bars, turn counter, and message log that update every turn
// maybe using a class for game UI will work??

class GameUI {
    constructor() {
        this.pc = actorList[0]
        this.turn = 0
        this.turnDisplay = null
        this.message = ''
    }
    // Build UI
    topBar = function() {
        console.log(`turn counter ${this.turn}`)
        const gameTop = document.createElement('div')
        gameTop.id = 'game-top-ui'
        gameTop.className = 'UI-game-element'
        const gameTopCharInfoContainer = document.createElement('div')
        gameTopCharInfoContainer.id = 'game-top-char-info-container'
        gameTopCharInfoContainer.className = 'UI-game-element'
        const gameTopCharName = document.createElement('div')
        gameTopCharName.id = 'game-top-char-name'
        gameTopCharName.className = 'UI-game-sub-element'
        const gameTopCharNameLabel = document.createElement('p')
        gameTopCharNameLabel.id = 'game-top-char-name-label'
        gameTopCharNameLabel.className = 'UI-game-display-label'
        gameTopCharNameLabel.innerText = 'Name:'
        const gameTopCharNameText = document.createElement('h2')
        gameTopCharNameText.id = 'game-top-char-name-text'
        gameTopCharNameText.className = 'UI-game-display-text'
        gameTopCharNameText.innerText = localStorage.getItem('charName') 
        const gameTopCharClass = document.createElement('div')
        gameTopCharClass.id = 'game-top-char-class'
        gameTopCharClass.className = 'UI-game-sub-element'
        const gameTopCharClassLabel = document.createElement('p')
        gameTopCharClassLabel.id = 'game-top-char-class-label'
        gameTopCharClassLabel.className = 'UI-game-display-label'
        gameTopCharClassLabel.innerText = 'Class:'
        const gameTopCharClassText = document.createElement('h2')
        gameTopCharClassText.id = 'game-top-char-class-text'
        gameTopCharClassText.className = 'UI-game-display-text'
        gameTopCharClassText.innerText = localStorage.getItem('charClass')
        const gameTopCharLevel = document.createElement('div')
        gameTopCharLevel.id = 'game-top-char-level'
        gameTopCharLevel.className = 'UI-game-sub-element'
        const gameTopCharLevelLabel = document.createElement('p')
        gameTopCharLevelLabel.id = 'game-top-char-level-label'
        gameTopCharLevelLabel.className = 'UI-game-display-label'
        gameTopCharLevelLabel.innerText = 'Level:'
        const gameTopCharLevelText = document.createElement('h2')
        gameTopCharLevelText.id = 'game-top-char-level-text'
        gameTopCharLevelText.className = 'UI-game-display-text'
        gameTopCharLevelText.innerText = '1'
        const gameTopTrackBarsContainer = document.createElement('div')
        gameTopTrackBarsContainer.id = 'game-top-track-bars-container'
        gameTopTrackBarsContainer.className = 'UI-game-element'
        const gameHealthBar = document.createElement('div')
        gameHealthBar.id = 'game-top-health-bar'
        gameHealthBar.className = 'UI-game-track-bar'
        const gameHealthRemainingBar = document.createElement('div')
        gameHealthRemainingBar.id = 'game-top-health-remaining-bar'
        gameHealthRemainingBar.className = 'UI-game-track-level-bar'
        const gameEnergyBar = document.createElement('div')
        gameEnergyBar.id = 'game-top-energy-bar'
        gameEnergyBar.className = 'UI-game-track-bar'
        const gameEnergyRemainingBar = document.createElement('div')
        gameEnergyRemainingBar.id = 'game-top-energy-remaining-bar'
        gameEnergyRemainingBar.className = 'UI-game-track-level-bar'
        const gameXpBar = document.createElement('div')
        gameXpBar.id = 'game-top-xp-bar'
        gameXpBar.className = 'UI-game-track-bar'
        const gameXpToNextLevelBar = document.createElement('div')
        gameXpToNextLevelBar.id = 'game-top-xp-to-next-level-bar'
        gameXpToNextLevelBar.className = 'UI-game-track-level-bar'
        const gameTopAltInfoContainer = document.createElement('div')
        gameTopAltInfoContainer.id = 'game-top-turn-info-container'
        gameTopAltInfoContainer.className = 'UI-game-element'
        const gameTopTurnCounter = document.createElement('div')
        gameTopTurnCounter.className = 'UI-game-sub-element'
        const gameTopTurnCounterLabel = document.createElement('p')
        gameTopTurnCounterLabel.id = 'game-top-turn-counter-label'
        gameTopTurnCounterLabel.className = 'UI-game-display-label'
        gameTopTurnCounterLabel.innerText = 'Turn:'
        const gameTopTurnCounterText = document.createElement('h2')
        gameTopTurnCounterText.id = 'game-top-turn-counter-text'
        gameTopTurnCounterText.className = 'UI-game-display-text'
        gameTopTurnCounterText.textContent = `${this.turn}`

        gameTop.innerHTML = ''
        gameTop.appendChild(gameTopCharInfoContainer)
        gameTopCharInfoContainer.appendChild(gameTopCharName)
        gameTopCharName.appendChild(gameTopCharNameLabel)
        gameTopCharName.appendChild(gameTopCharNameText)
        gameTopCharInfoContainer.appendChild(gameTopCharClass)
        gameTopCharClass.appendChild(gameTopCharClassLabel)
        gameTopCharClass.appendChild(gameTopCharClassText)
        gameTopCharInfoContainer.appendChild(gameTopCharLevel)
        gameTopCharLevel.appendChild(gameTopCharLevelLabel)
        gameTopCharLevel.appendChild(gameTopCharLevelText)
        gameTop.appendChild(gameTopTrackBarsContainer)
        gameTopTrackBarsContainer.appendChild(gameHealthBar)
        gameHealthBar.appendChild(gameHealthRemainingBar)
        gameTopTrackBarsContainer.appendChild(gameEnergyBar)
        gameEnergyBar.appendChild(gameEnergyRemainingBar)
        gameTopTrackBarsContainer.appendChild(gameXpBar)
        gameXpBar.appendChild(gameXpToNextLevelBar)
        gameTop.appendChild(gameTopAltInfoContainer)
        gameTopAltInfoContainer.appendChild(gameTopTurnCounter)
        gameTopTurnCounter.appendChild(gameTopTurnCounterLabel)
        gameTopTurnCounter.appendChild(gameTopTurnCounterText)

        this.turnDisplay = gameTopTurnCounterText

        return gameTop
    }

    bottomBar = function() {
        const gameBottom = document.createElement('div')
        gameBottom.id = 'game-bottom-ui'
        gameBottom.className = 'UI-game-element'
        // BOTTOM game info element (character skills/actions, output log)
        const gameBottomSkillsContainer = document.createElement('div')
        gameBottomSkillsContainer.id = 'game-bottom-skills-container'
        gameBottomSkillsContainer.className = 'UI-game-element'
        const gameCurrentWeapon = document.createElement('div')
        gameCurrentWeapon.id = 'game-current-weapon'
        gameCurrentWeapon.className = 'game-skill-button'
        const gameSkill1 = document.createElement('div')
        gameSkill1.id = 'game-skill-1'
        gameSkill1.className = 'game-skill-button'
        const gameSkill2 = document.createElement('div')
        gameSkill2.id = 'game-skill-2'
        gameSkill2.className = 'game-skill-button'
        const gameSkill3 = document.createElement('div')
        gameSkill3.id = 'game-skill-3'
        gameSkill3.className = 'game-skill-button'
        const gameBottomOutputLog = document.createElement('div')
        gameBottomOutputLog.id = 'game-bottom-output-log'

        gameBottom.innerHTML = ''
        gameBottom.appendChild(gameBottomSkillsContainer)
        gameBottomSkillsContainer.appendChild(gameCurrentWeapon)
        gameBottomSkillsContainer.appendChild(gameSkill1)
        gameBottomSkillsContainer.appendChild(gameSkill2)
        gameBottomSkillsContainer.appendChild(gameSkill3)
        gameBottom.appendChild(gameBottomOutputLog)

        return gameBottom
    }


    update = function(curHlth, maxHlth) {
        this.turn++
        this.turnDisplay.textContent = `${this.turn}`

        console.log(curHlth / maxHlth)
        
        // health bar update
        const healthBar = document.getElementById('game-top-health-remaining-bar')
        healthBar.style.width = `${(curHlth / maxHlth) * 100}%`
        // this.topBar()
    }

    init = function() {
        const gameContainer =  document.createElement('div')
        gameContainer.id = 'game-container'
        // TOP game info element (character info, hp/energy/xp bars)
        
        // CANVAS - where the magic happens
        const gameCanvas = document.createElement('canvas')
        gameCanvas.id = 'primary-canvas'
        gameCanvas.width = '960'
        gameCanvas.height = '960'

        

        body.innerHTML = ''
        body.appendChild(gameContainer)
        gameContainer.appendChild(this.topBar())
        gameContainer.appendChild(gameCanvas)
        gameContainer.appendChild(this.bottomBar())
    }
}


// const turnPosCounters = (text) => {
//     turn++

//     const gameTopTurnCounter = document.createElement('div')
//     gameTopTurnCounter.id = 'game-top-turn-counter'
//     gameTopTurnCounter.className = 'UI-game-sub-element'
//     const gameTopTurnCounterLabel = document.createElement('p')
//     gameTopTurnCounterLabel.id = 'game-top-turn-counter-label'
//     gameTopTurnCounterLabel.className = 'UI-game-display-label'
//     gameTopTurnCounterLabel.innerText = 'Turn:'
//     const gameTopTurnCounterText = document.createElement('h2')
//     gameTopTurnCounterText.id = 'game-top-turn-counter-text'
//     gameTopTurnCounterText.className = 'UI-game-display-text'
    
//     gameTopTurnCounter.innerHTML = text
    

//     setTimeout(() => {
//         gameTopTurnCounter.appendChild(gameTopTurnCounterLabel)
//         gameTopTurnCounterText.textContent = `${turn}`
//         gameTopTurnCounter.appendChild(gameTopTurnCounterText)
//         console.log(`counter updated... ${gameTopTurnCounterText.textContent}`)
//     }, 200)
//     return gameTopTurnCounter
// }



const characterSelectionScreen = () => {
    const charactersSelectionContainerDiv = document.createElement('div')
    charactersSelectionContainerDiv.id = 'characters-selection-container'
    charactersSelectionContainerDiv.className = 'UI-base-container'
    const charactersSelectionTitleDiv = document.createElement('div')
    charactersSelectionTitleDiv.id = 'characters-selection-title-container'
    charactersSelectionTitleDiv.className = 'UI-title-container'
    const title = document.createElement('h1')
    // *** insert character name form here ???
    const charactersForm = document.createElement('form')
    // this should probably be a selection form
    charactersForm.id = 'characters-form-container'
    charactersForm.className = 'UI-button-nav-container'
    const charactersFormInputLabel = document.createElement('label')
    charactersFormInputLabel.for = 'char-name'
    charactersFormInputLabel.id = 'char-name-label'
    const charactersFormInput = document.createElement('input')
    charactersFormInput.id = 'char-name'
    charactersFormInput.type = 'text'
    charactersFormInput.name = 'char-name'
    charactersFormInput.maxLength = '9'
    const charactersSelectionButtonContainer = document.createElement('div')
    charactersSelectionButtonContainer.id  = 'characters-button-container'
    const warriorButton = document.createElement('button')
    warriorButton.id = 'warrior-select-button'
    warriorButton.className = 'UI-character-select-button'
    warriorButton.classList.add('selected-class')
    const warriorImage = document.createElement('img')
    const huntressButton = document.createElement('button')
    huntressButton.id = 'huntress-select-button'
    huntressButton.className = 'UI-character-select-button'
    const huntressImage = document.createElement('img')
    const wizardButton = document.createElement('button')
    wizardButton.id = 'wizard-select-button'
    wizardButton.className = 'UI-character-select-button'
    const wizardImage = document.createElement('img')
    const buttonNavDiv = document.createElement('div')
    buttonNavDiv.id = 'characters-select-button-nav-container'
    buttonNavDiv.className = 'UI-button-nav-container'
    const enterDungeonButton = document.createElement('button')
    enterDungeonButton.id = 'enter-dungeon-button'
    enterDungeonButton.className = 'button'
    const backButton = document.createElement('button')
    backButton.id = 'characters-select-back-button'
    backButton.className = 'button'

    title.innerText = 'Select Character'
    enterDungeonButton.innerText = 'Enter Dungeon'
    backButton.innerText = 'Back'
    wizardImage.src = '../images/DoY_wizard_1.png'
    warriorImage.src = '../images/DoY_warrior_1.png'
    huntressImage.src = '../images/DoY_huntress_1.png'
    wizardButton.value = 'Wizard'
    warriorButton.value = 'Warrior'
    huntressButton.value = 'Huntress'
    wizardButton.type = 'button'
    warriorButton.type = 'button'
    huntressButton.type = 'button'
    charactersFormInputLabel.innerText = 'Character Name'

    body.innerHTML = ''
    body.appendChild(charactersSelectionContainerDiv)
    charactersSelectionContainerDiv.appendChild(charactersSelectionTitleDiv)
    charactersSelectionTitleDiv.appendChild(title)
    charactersSelectionContainerDiv.appendChild(charactersForm)
    // charactersSelectionContainerDiv.appendChild(charactersFormInputLabel)
    // charactersSelectionContainerDiv.appendChild(charactersFormInput)
    charactersForm.appendChild(charactersFormInputLabel)
    charactersForm.appendChild(charactersFormInput)
    charactersForm.appendChild(charactersSelectionButtonContainer)
    charactersSelectionButtonContainer.appendChild(warriorButton)
    charactersSelectionButtonContainer.appendChild(huntressButton)
    charactersSelectionButtonContainer.appendChild(wizardButton)
    wizardButton.appendChild(wizardImage)
    warriorButton.appendChild(warriorImage)
    huntressButton.appendChild(huntressImage)

    charactersSelectionContainerDiv.appendChild(buttonNavDiv)
    buttonNavDiv.appendChild(enterDungeonButton)
    buttonNavDiv.appendChild(backButton)

    const classButtonsArray = [warriorButton, huntressButton, wizardButton]
    let selectedClass = warriorButton.value

    classButtonsArray.forEach(button => {
        button.addEventListener('click', () => {
            // remove .selected class from previoiusly selected button
            classButtonsArray.forEach(btn=> {
                btn.classList.remove('selected-class')
            })
            // add .selected class to clicked button
            button.classList.add('selected-class')
            // pass button value to selectedClass variable to use in localStorage to set the class of the char for the game
            selectedClass = button.value
            return selectedClass
        })
    })

    // ***** Add character name and character class selection to local storage!!
    enterDungeonButton.addEventListener('click', () => {
        let charName = charactersFormInput.value
        localStorage.setItem('charName', charName)
        localStorage.setItem('charClass', selectedClass)
        initializeGame()
    })
    backButton.addEventListener('click', splashScreen)
}

const instructionsScreen = () => {
    const instructionsContainerDiv = document.createElement('div')
    instructionsContainerDiv.id = 'instructions-container'
    instructionsContainerDiv.className = 'UI-base-container'
    const instructionsTitleDiv = document.createElement('div')
    instructionsTitleDiv.id = 'instructions-title-container'
    instructionsTitleDiv.className = 'UI-title-container'
    const title = document.createElement('h1')
    const instructionsTextDiv = document.createElement('div')
    instructionsTextDiv.id = 'instructions-text-container'
    instructionsTextDiv.className = 'UI-text-container'
    const instructionsText = document.createElement('p')
    instructionsText.id = 'instructions-text'
    instructionsText.className = 'UI-text'
    const buttonNavDiv = document.createElement('div')
    buttonNavDiv.id = 'instructions-button-nav-container'
    buttonNavDiv.className = 'UI-button-nav-container'
    const backButton = document.createElement('button')
    backButton.id = 'instructions-back-button'
    backButton.className = 'button'

    title.innerText = 'Instructions'
    backButton.innerText = 'Back'

    body.innerHTML = ''
    body.appendChild(instructionsContainerDiv)
    instructionsContainerDiv.appendChild(instructionsTitleDiv)
    instructionsTitleDiv.appendChild(title)
    instructionsContainerDiv.appendChild(instructionsTextDiv)
    instructionsTextDiv.appendChild(instructionsText)
    instructionsContainerDiv.appendChild(buttonNavDiv)
    buttonNavDiv.appendChild(backButton)

    backButton.addEventListener('click', splashScreen)
}

const aboutScreen = () => {
    const aboutContainerDiv = document.createElement('div')
    aboutContainerDiv.id = 'about-container'
    aboutContainerDiv.className = 'UI-base-container'
    const aboutTitleDiv = document.createElement('div')
    aboutTitleDiv.id = 'about-title-container'
    aboutTitleDiv.className = 'UI-title-container'
    const title = document.createElement('h1')
    const aboutTextDiv = document.createElement('div')
    aboutTextDiv.id = 'about-text-container'
    aboutTextDiv.className = 'UI-text-container'
    const aboutText = document.createElement('p')
    aboutText.id = 'about-text'
    aboutText.className = 'UI-text'
    const buttonNavDiv = document.createElement('div')
    buttonNavDiv.id = 'instructions-button-nav-container'
    buttonNavDiv.className = 'UI-button-nav-container'
    const backButton = document.createElement('button')
    backButton.id = 'instructions-back-button'
    backButton.className = 'button'

    title.innerText = 'About'
    backButton.innerText = 'Back'

    body.innerHTML = ''
    body.appendChild(aboutContainerDiv)
    aboutContainerDiv.appendChild(aboutTitleDiv)
    aboutTitleDiv.appendChild(title)
    aboutContainerDiv.appendChild(aboutTextDiv)
    aboutTextDiv.appendChild(aboutText)
    aboutContainerDiv.appendChild(buttonNavDiv)
    buttonNavDiv.appendChild(backButton)

    backButton.addEventListener('click', splashScreen)
}

const splashScreen = () => {
    const startSplashDiv = document.createElement('div')
    startSplashDiv.id = 'start-splash'
    startSplashDiv.className = 'UI-base-container'
    const mainTitleDiv = document.createElement('div')
    mainTitleDiv.id = 'main-title-container'
    mainTitleDiv.className = 'UI-title-container'
    const title = document.createElement('h1')
    const buttonNavDiv = document.createElement('div')
    buttonNavDiv.id = 'splash-button-nav-container'
    buttonNavDiv.className = 'UI-button-nav-container'
    const instructionsButton = document.createElement('button')
    instructionsButton.id = 'instructions-button'
    instructionsButton.className = 'button'
    const aboutButton = document.createElement('button')
    aboutButton.id = 'about-button'
    aboutButton.className = 'button'
    const startGameButton = document.createElement('button')
    startGameButton.id = 'start-game-button'
    startGameButton.className = 'button'

    title.innerText = 'The Dungeon of Yendor'
    instructionsButton.innerText = 'Instructions'
    aboutButton.innerText = 'About'
    startGameButton.innerText = 'Start Game'

    body.innerHTML = ''
    body.appendChild(startSplashDiv)
    startSplashDiv.appendChild(mainTitleDiv)
    mainTitleDiv.appendChild(title)
    startSplashDiv.appendChild(buttonNavDiv)
    buttonNavDiv.appendChild(instructionsButton)
    buttonNavDiv.appendChild(aboutButton)
    buttonNavDiv.appendChild(startGameButton)
    
    instructionsButton.addEventListener('click', instructionsScreen)
    aboutButton.addEventListener('click', aboutScreen)
    startGameButton.addEventListener('click', characterSelectionScreen)
}
// these function