// Setting Game Name 
let gameName = 'Guess The Word'
document.title = gameName
document.querySelector('h1').innerHTML = gameName
document.querySelector('footer').innerHTML =  `${gameName} Game created by the owner`

// Setting Game Options 

let numberOfTries = 6
let numberOfLetters = 6
let currentTry = 1
let numberOfHints = 2

// Manage Words
let wordToGuess =''
const words = ['Create', 'Update', 'Delete', 'Master', "Branch", "Mainly", "Elzero", "School"]

wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()

console.log(wordToGuess)

let messageArea = document.querySelector('.message')

// Manage Hints 
document.querySelector('.hint span').innerHTML = numberOfHints
const getHintButton = document.querySelector('.hint')
getHintButton.addEventListener('click',getHint)

function generateInput(){
    const inputsContainer = document.querySelector('.inputs')

    // create main try div
    for (let i = 1; i <= numberOfTries; i++){
        const tryDiv = document.createElement('div');
        tryDiv.classList.add(`try-${i}`)
        tryDiv.innerHTML = `<span>Try ${i}</span>`
        
        if (i !== 1) tryDiv.classList.add('disabled-inputs')
        
        currentTry
        
        // create Inputes 
        for(let j = 1;j<=numberOfLetters;j++){
            const input = document.createElement('input')
            input.type = 'text'
            input.id = `guess-${i}-letter-${j}`
            input.setAttribute('maxlength', '1')
            tryDiv.appendChild(input)
        }

        inputsContainer.appendChild(tryDiv)
        
    };

//   Focus On First Input In First Try Element
  inputsContainer.children[0].children[1].focus();  

//   Disable All Inputs Except First One
const inputsInDisabledDiv = document.querySelectorAll('.disabled-inputs input')
inputsInDisabledDiv.forEach((input)=> (input.disabled = true))
    
const inputs = document.querySelectorAll('input')
inputs.forEach((input,index)=>{
    // convert input to Uppercase 
    input.addEventListener('input', function(){
        this.value = this.value.toUpperCase()
        // console.log(index)
        const nextInput = inputs[index + 1]

        if (nextInput) nextInput.focus()
    })

    input.addEventListener('keydown', function(event){
        // console.log(event)
        const currentIndex = Array.from(inputs).indexOf(event.target)
        // const currentIndex = Array.from(inputs).indexOf(this)
        // console.log(currentIndex)
        if(event.key === 'ArrowRight'){
            const nextInput = currentIndex + 1
            if (nextInput < inputs.length) inputs[nextInput].focus()
        }
        if(event.key === 'ArrowLeft'){
            const PrevInput = currentIndex - 1
            if (PrevInput >= 0) inputs[PrevInput].focus()
        }
    })
})
}

const guessButton = document.querySelector('.check')
guessButton.addEventListener('click', handleGuess)

currentTry

function handleGuess(){
    let successGuess = true
    for (let i = 1; i <= numberOfLetters; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const letter = inputField.value.toLowerCase()
        // console.log(inputField)
        const actualLetter = wordToGuess[i-1]

        // Game Logic 
        if (letter === actualLetter){
            // letter is correct and in place
            inputField.classList.add('yes-in-place')
        }else if(wordToGuess.includes(letter) && letter !==''){
            // letter is correct but is not in placed
            inputField.classList.add('not-in-place')
            successGuess = false
        }else{
            // letter is  not correct 
            inputField.classList.add('no')
            successGuess = false
        }
    }

    // check if user win or lose 
    if (successGuess) {
        messageArea.innerHTML =  `You win The Word is <span>${wordToGuess}</span>`
        
        if(numberOfHints === 2){
            messageArea.innerHTML =  `<p>Congratz you don't use the hints</p>`
            
        }
        
        let allTries = document.querySelectorAll('.inputs > div')
        allTries.forEach((tryDiv) => tryDiv.classList.add(`disabled-inputs`))

        guessButton.disabled = true
        getHintButton.disabled = true
        
    }else{
        document.querySelector(`.try-${currentTry}`).classList.add('disabled-inputs')
        
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
        
        currentTryInputs.forEach((input)=>(input.disabled = true))
        
        currentTry++
        
        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
        
        nextTryInputs.forEach((input)=>(input.disabled = false))
        
        let el = document.querySelector(`.try-${currentTry}`)
        
        if(el){
            document.querySelector(`.try-${currentTry}`).classList.remove('disabled-inputs')
            
            el.children[1].focus()
            
            // console.log(el.children)
            
        }else{
            // Disable guess button
            guessButton.disabled = true
            getHintButton.disabled = true
            messageArea.innerHTML = `You lose the word is <span>${wordToGuess}</span>`
        }
        
        // console.log(currentTry)
    }
}

function getHint(){
    if(numberOfHints > 0){
        numberOfHints--
        document.querySelector('.hint span').innerHTML = numberOfHints
    }
    if(numberOfHints === 0){
        getHintButton.disabled = true
    }

    const enabledInputs = document.querySelectorAll('input:not([disabled])')
    // console.log(enabledInputs)

    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === '')
    // console.log(emptyEnabledInputs)
    
    
    if(emptyEnabledInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length)
        const randomInput = emptyEnabledInputs[randomIndex]
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput)
        
        // console.log(randomIndex)
        // console.log(randomInput)
        // console.log(indexToFill)
        if (indexToFill !== -1){
            randomInput.value = wordToGuess[indexToFill].toUpperCase()
        }
    }

    
}

function handleSpace(event){

    if(event.key === 'Backspace'){
        const inputs = document.querySelectorAll('input:not([disabled])')
        const currentIndex = Array.from(inputs).indexOf(document.activeElement)
        // console.log(currentIndex)

        if(currentIndex > 0){
            const currentInput = inputs[currentIndex]
            const prevInput = inputs[currentIndex - 1]
            currentInput.value = ''
            prevInput.value = ''
            prevInput.focus()
        }

    }
    
}

document.addEventListener('keydown', handleSpace)

window.onload = function(){
    generateInput()

}