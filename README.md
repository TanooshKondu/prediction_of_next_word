# prediction_of_next_word
I have created a next word predictor using html, css, javascript. It was a intermediate-level JavaScript, front-end project on web development. I have used APIs from a cloud site. 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prediction of the Next Word</title>
    <link rel="stylesheet" href="gold_task-2.css">
</head>
<body>
    <div class="area">
        <div class="container context">
            <h1>Prediction of the Next Word</h1>
            <div class="input-container">
                <input type="text" id="inputText" style="background-color: transparent;" placeholder="Type Here...">
                <div id="suggestions" style="background-color: transparent;"></div>
            </div>
        </div>
        <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    
    <script src="gold_task-2.js"></script>
</body>
</html>

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
}

.input-container {
    position: relative;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

#suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    color:#fff;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: none;
}

#suggestions p {
    padding: 5px 10px;
    margin: 0;
    cursor: pointer;
}

#suggestions p:hover {
    background-color: #121111;
}


*{
    margin: 0px;
    padding: 0px;
}


.context {
    width: 100%;
    top:50vh;
    
}

.context h1{
    text-align: center;
    color: #fff;
    font-size: 50px;
}

.area{
    background: #4e54c8;  
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);  
    width: 100%;
    height:100vh;
    
   
}

.circles{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden
    
}

.circles li{
    position: absolute;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
    display: block;
}

.circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}

.circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}



@keyframes animate {

    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }

}

const inputText = document.getElementById('inputText');
const suggestionsContainer = document.getElementById('suggestions');

const API_ENDPOINT = 'https://api.datamuse.com/sug';

inputText.addEventListener('input', () => {
    const currentInput = inputText.value.toLowerCase().trim();
    if (currentInput) {
        fetchSuggestions(currentInput)
            .then(suggestions => showSuggestions(suggestions))
            .catch(error => console.error('Error fetching suggestions:', error));
    } else {
        suggestionsContainer.style.display = 'none';
    }
});

function fetchSuggestions(query) {
    const url = `${API_ENDPOINT}?s=${query}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data.map(item => item.word))
        .catch(error => {
            throw new Error('Failed to fetch suggestions from API:', error);
        });
}

function showSuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';

    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('p');
            suggestionElement.textContent = suggestion;
            suggestionElement.addEventListener('click', () => {
                inputText.value = suggestion;
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(suggestionElement);
        });
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.style.display = 'none';
    }
}

