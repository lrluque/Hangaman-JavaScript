let progressWord = ''
let letterArray = []
let lives = 5
let lettersUsed = []
let coincidences = 0
const prompt = require('prompt-sync')()


//get random word
const fs = require('fs');
const data = fs.readFileSync('./hangman/words.txt');
const splitData = data.toString().split('\n');
const randomNumber = Math.floor(Math.random() * splitData.length);
let word = splitData[randomNumber].toUpperCase()


//replace each character with an 'x'
for (let i = 0; i < word.length; i++){
    letterArray[i] = false;
    progressWord += 'x'
}



function checkLetter(letter){
    let coincidence = false
    for (let i = 0; i < word.length; i++){
        if (word.charAt(i) == letter){
            if (!letterArray[i]){
                progressWord = replaceLetter(progressWord, i, letter)
                letterArray[i] = true
                coincidences += 1
            }
            coincidence = true
       }
    }
    if (!coincidence){
        lives--
    }
    return progressWord;
}

function replaceLetter(word, index, replacement) {
   return word.substring(0, index) + replacement + word.substring(index + replacement.length);
}

function printWord(){
    console.log(`\n${progressWord.split('').join(' ')}`)
}

function letterHasBeenUsed(letter){
    let used = false
    let i = 0
    while(i < lettersUsed.length && !used){
        if (letter == lettersUsed[i]){
            used = true;
        }
        i++
    }
    return used;
}

function printLettersUsed(){
    let lettersUsedString = 'Letters used: '
    for (let i = 0; i < lettersUsed.length;i++){
        lettersUsedString += `${lettersUsed[i]} `
    }
    console.log(lettersUsedString)
}

while (coincidences < word.length && lives > 0){
    printWord()
    console.log(`${lives} lives left\n`)
    printLettersUsed()
    let letter = prompt('\nLetter: ').toUpperCase()
    if (letter.length == 1 && letter.match(/[a-z]/i)){
        if (!letterHasBeenUsed(letter)){
            lettersUsed.push(letter)
            checkLetter(letter)
        }else{
            console.log('LETTER HAS BEEN ALREADY USED!')
        }
    }else{
        console.log('YOU MUST TYPE A VALID LETTER\n')
    }
};

if (coincidences == word.length){
    console.log(`\nCONGRATULATIONS! THE WORD WAS '${word}'`)
}else{
    console.log(`\nBAD LUCK! THE WORD WAS '${word}'`)
}