const wordsContainer = document.getElementById("words-container");
const words = document.getElementById("words");
const inputField = document.getElementById("input-field");
const wpmCounter = document.getElementById("wpm-counter");
const retryButton = document.getElementById("retry-button");
const accuracyMeter = document.getElementById("accuracy");
let typed = "";
let started = false;
let completed = false;
let startTime;


const wordStrings = [
    "the quick brown fox jumps over the lazy dog",
    "sentence words strings characters keyboard",
    "the sun is setting over the horizon painting the sky with shades of orange and pink",
    "a gentle breeze rustled the leaves of the trees creating a soothing melody"
];
let chosenWord = wordStrings[0];

generateSpanOfWords(chosenWord);

function generateSpanOfWords(wordString){
    for (i = 0; i < wordString.length; i++){
        const span = document.createElement("span");

        if (wordString.charAt(i) === ' '){
            span.className = "spacer";
        }
        // else{
        //     span.className = "character-span";
        // }
        span.textContent = wordString.charAt(i);
        words.appendChild(span);
    }
}

function updateText(){
    if (!started){
        started = true;
        startTime = new Date();
    }
    // const chosenWords = chosenWord.split(" ");
    const chosenWords = chosenWord;
    // const typedWords = inputField.value.split(" "); 
    const typedWords = inputField.value;

    // if (chosenWords.length < typedWords.length){
    //     const span = document.createElement("span");
    //     span.textContent = typedWords.charAt(typedWords.length-1);
    //     span.className = "superwrong";
    //     words.appendChild(span);
    // }

    if (typedWords.length > 0){
        const lastWord = typedWords[typedWords.length-1];
        const lastChosenWord = chosenWords[typedWords.length-1];

        const typedCharacter = lastWord.charAt(lastWord.length-1); 
        const chosenCharacter = lastChosenWord.charAt(lastWord.length-1);

        const lastSpan = words.children[inputField.value.length-1];

        if (typedCharacter == chosenCharacter){
            lastSpan.classList.add("correct");
        }
        else{
            lastSpan.classList.add("wrong");
        }

        if (!containsIncompleteSpan()){
            completed = true;

            const endTime = new Date();

            const elapsedTime = (endTime - startTime)/1000;
            const elapsedTimeInMinutes = elapsedTime/60;

            const wpm = (chosenWord.length/5)/elapsedTimeInMinutes;

            console.log("Time taken: " + elapsedTime + " seconds");
            console.log("WPM: " + Math.floor(wpm) + " wpm");
            console.log("Accuracy: " + calculateAccuracy() + "%");

            wpmCounter.classList.remove("hidden");
            retryButton.classList.remove("hidden");
            accuracyMeter.classList.remove("hidden");

            wpmCounter.textContent = "WPM: " + Math.round(wpm);
            accuracyMeter.textContent = "Accuracy: " + Math.round(calculateAccuracy()) + "%";
            
        }
    }   
    updateActivePosition(); // Moves the underline to the correct location
}

function resetAll(){
    started = false;
    completed = false;
    chosenWord = wordStrings[Math.floor(Math.random() * wordStrings.length)];
    inputField.value = "";

    while (words.firstChild) {
        words.removeChild(words.firstChild);
    }
    wpmCounter.classList.add("hidden");
    retryButton.classList.add("hidden");
    accuracyMeter.classList.add("hidden");
    generateSpanOfWords(chosenWord);
}

function calculateAccuracy(){
    const array = words.children;
    const totalCharacters = words.children.length;
    let correctCharacters = 0;

    for (let i = 0; i < totalCharacters; i++){
        if (array[i].classList.contains("correct")){
            correctCharacters++;
        }
    }

    return (correctCharacters/totalCharacters * 100);
}

function updateActivePosition(){
    const array = words.children;

    // array.forEach(element => {
    //     if (element.classList.contains("active")){
    //         element.classList.remove("active");
    //     }
    // })
    for (let i = 0; i < words.children.length; i++){
        if (array[i].classList.contains("active")){
            array[i].classList.remove("active");
        }
        if (i >= inputField.value.length){
            array[i].classList.remove("correct", "wrong");
        }
    }
    if (array.length > inputField.value.length){
        array[inputField.value.length].classList.add("active");
    }
}

function containsIncompleteSpan(){
    const array = Array.from(words.children);
    let containsIncomplete = false;
    array.forEach(element => {
        if (!element.classList.contains("correct") && !element.classList.contains("wrong")){ // does not have correct or wrong class
            containsIncomplete = true;
        }
    });
    return containsIncomplete;
}

document.addEventListener("keydown", (event) => {
    inputField.focus();
    if (event.key === "Enter"){
        if (completed){
            retryButton.click();
        }
    }
});
inputField.addEventListener("input", updateText);
retryButton.addEventListener("click", resetAll);

updateActivePosition();