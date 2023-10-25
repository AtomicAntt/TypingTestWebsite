const wordsContainer = document.getElementById("words-container");
const words = document.getElementById("words");
let typed = "";

const wordStrings = ["string test sentence", "this is also a string", "hello world"]

generateSpanOfWords(wordStrings[0]);

function generateSpanOfWords(wordString){
    for (i = 0; i < wordString.length; i++){
        const span = document.createElement("span");

        if (wordString.charAt(i) === ' '){
            span.className = "spacer";
        }
        else{
            span.className = "character-span";
        }
        span.textContent = wordString.charAt(i);
        words.appendChild(span);
    }
}

