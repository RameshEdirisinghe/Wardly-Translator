let voices = [];


function loadVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        console.warn("No voices available. Ensure your system supports multiple languages for TTS.");
    } else {
        console.log("Available voices:", voices);
    }
}


if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
} else {
    loadVoices(); 
}


let selectors = document.querySelectorAll("select");
selectors.forEach(selector => {
    for (const languageCode in languages) {
        let option = `<option value="${languageCode}">${languages[languageCode]}</option>`;
        selector.insertAdjacentHTML("beforeend", option);
    }
});


function speakText() {
    let textInput = document.getElementById("inputText").value.trim();
    let inputLang = document.getElementById("dropdown1").value;

    if (!textInput) {
        alert("Please enter some text to speak!");
        return;
    }

    try {
        let speech = new SpeechSynthesisUtterance(textInput);
        speech.lang = inputLang;


        const matchedVoice = voices.find(voice => voice.lang === inputLang);
        if (matchedVoice) {
            speech.voice = matchedVoice;
        } else {
            console.warn(`No voice found for language: ${inputLang}`);
            alert(`No voice found for ${languages[inputLang]}. Default voice will be used.`);
        }


        speech.rate = 1; 
        speech.pitch = 1; 


        window.speechSynthesis.speak(speech);
    } catch (e) {
        console.error("Speech synthesis failed:", e);
        alert("Speech synthesis is not supported in your browser.");
    }
}


function translate1() {
    let textInput = document.getElementById("inputText").value.trim();
    let inputLang = document.getElementById("dropdown1").value;
    let transLang = document.getElementById("dropdown2").value;

    if (!textInput) {
        alert("Please enter some text to translate!");
        return;
    }

    post(textInput, inputLang, transLang);
}


function post(textInput, inputLang, transLang) {
    let resultText = document.getElementById("translateText");
    const apiURL = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textInput)}&langpair=${inputLang}|${transLang}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(result => {
            let translatedText = result.responseData.translatedText;
            resultText.textContent = translatedText;
        })
        .catch(error => {
            console.error("Translation failed:", error);
            resultText.textContent = "An error occurred while translating.";
        });
}


function logAvailableVoices() {
    loadVoices();
    voices.forEach((voice, index) => {
        console.log(`${index}: ${voice.name} (${voice.lang})`);
    });
}
