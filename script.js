document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        fetchRecipes(searchTerm)
            .then(displayRecipes)
            .catch(error => console.error(error));
    });

    async function fetchRecipes(query) {
        const apiKey = 'YOUR_APP_KEY';
        const appId = 'YOUR_APP_ID';
        const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.hits.map(hit => hit.recipe);
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    function displayRecipes(recipes) {
        resultsDiv.innerHTML = '';
        if (recipes.length === 0) {
            resultsDiv.innerHTML = '<p>No recipes found.</p>';
            return;
        }
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `<h2>${recipe.label}</h2><p>${recipe.url}</p>`;
            resultsDiv.appendChild(recipeDiv);
        });
    }
});
