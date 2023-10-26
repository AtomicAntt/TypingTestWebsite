const wordsContainer = document.getElementById("words-container");
const words = document.getElementById("words");
const inputField = document.getElementById("input-field");
let typed = "";

const wordStrings = ["string test sentence", "this is also a string", "hello world"];
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
    // const chosenWords = chosenWord.split(" ");
    const chosenWords = chosenWord;
    // const typedWords = inputField.value.split(" "); 
    const typedWords = inputField.value;

    if (chosenWords.length < typedWords.length){ // Case: too much characters typed
        const span = document.createElement("span");
        span.textContent = typedWords.charAt(typedWords.length-1);
        span.className = "superwrong";
        words.appendChild(span);
    }

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
        console.log("Test completed!");
    }

    updateActivePosition();
}

function updateActivePosition(){
    const array = Array.from(words.children);

    array.forEach(element => {
        if (element.classList.contains("active")){
            element.classList.remove("active");
        }
    })
    array[inputField.value.length].classList.add("active");
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

document.addEventListener("keydown", () => inputField.focus());
inputField.addEventListener("input", updateText);

updateActivePosition();