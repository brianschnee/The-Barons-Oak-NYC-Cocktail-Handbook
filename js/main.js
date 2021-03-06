document.addEventListener('DOMContentLoaded', searchCocktail);

document.querySelector('button').addEventListener('click', searchCocktail)

function searchCocktail() {
    const cocktail = document.querySelector('input').value;
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
        .then(res => res.json())
        .then(data => {
            resetDOM();

            data.drinks.forEach(drink => {
                console.log(drink)
                addToDOM(drink)
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function resetDOM() {
    const cocktails = document.getElementById('cocktails');

    while (cocktails.firstChild)
        cocktails.removeChild(cocktails.firstChild)
}

function addToDOM(drink) {
    const section = document.createElement('section');
    section.classList.add('cocktail')

    section.innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink} cocktail"/>

        <div>
            <h2 class="cocktail-name">${drink.strDrink}</h2>
            <ul id="ingredients">${listIngredients(drink)}</ul>
            <p>${drink.strInstructions}</p>
        </div> 
    `;
    
    document.getElementById('cocktails').appendChild(section)
}

function listIngredients(drink) {
    let str = '';

    for (const [key, value] of Object.entries(drink)) {
        if(key.includes('strIngredient') && value) {
            let measurement = drink['strMeasure' + key.substring(13, key.length)];
            measurement = measurement ? ` (${measurement.trim()})` : '' 

            str += `<li>${value + measurement}</li>\n`
        }
    }

    return str;
}