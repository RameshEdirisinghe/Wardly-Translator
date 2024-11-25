let selector = document.querySelectorAll("select");





selector.forEach(element => {
    for (const languages_code in languages) {
       
       let options = `<option value="${languages_code}">${languages[languages_code]}</option>`
       element.insertAdjacentHTML("beforeend",options)
    }
 
    // body += `<option value="si-LK">Sinhala</option>`
});



function translate1() {
    let textInput = document.getElementById("inputText").value;
    let inputLang =selector[0].value;
    let transLang =selector[1].value;

    console.log(textInput);

    post(textInput, inputLang, transLang);
}

function post(textInput, inputLang, transLang) {
    let resultText = document.getElementById("translateText");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const apiUrl = `https://api.mymemory.translated.net/get?q=${textInput}&langpair=${inputLang}|${transLang}`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);

            let res = result.responseData.translatedText;

            console.log(res);

            resultText.innerHTML = res;
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("translateText").innerHTML = "Translation failed.";
        });

}


