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
