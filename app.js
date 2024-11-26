let selector = document.querySelectorAll("select");

selector.forEach(element => {
    for (const languages_code in languages) {
       
       let options = `<option value="${languages_code}">${languages[languages_code]}</option>`
       element.insertAdjacentHTML("beforeend",options)
    }
 

});

function translate1() {
    let textInput = document.getElementById("inputText").value;
    let inputLang =document.getElementById("dropdown1").value;
    let transLang =document.getElementById("dropdown2").value;

    console.log(textInput);

    post(textInput, inputLang, transLang);
}

function post(textInput, inputLang, transLang) {
    let resultText = document.getElementById("translateText");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    fetch(`https://api.mymemory.translated.net/get?q=${textInput}&langpair=${inputLang}|${transLang}`)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);

            let res = result.responseData.translatedText;

            console.log(res);

            resultText.innerHTML = res;
        })
       
}


