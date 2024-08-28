document.addEventListener('DOMContentLoaded', () => {
    const mealsContainer = document.getElementById('meals');
    const categoryTitle = document.getElementById('categoryTitle');
    const mealPopup = document.getElementById('mealPopup');
    const mealDetails = document.getElementById('mealDetails');

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    console.log(category)
    categoryTitle.innerHTML = category;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            meals.forEach(meal => {
                const mealElement = document.createElement('div');
                mealElement.classList.add('flex-item');
                mealElement.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h5>${meal.strMeal}</h5>
                `;
                mealElement.addEventListener('click', () => showMealDetails(meal.strMeal));
                mealsContainer.appendChild(mealElement);
            });
        });

        function showMealDetails(mealName) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const meal = data.meals[0];
                    document.getElementById('mealName').innerHTML = meal.strMeal;

                    mealDetails.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p><strong>Category:</strong> ${meal.strCategory}</p>
                        <p><strong>Area:</strong> ${meal.strArea}</p>
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>
                        <h3>Ingredients:</h3>
                        <ul>
                            ${getIngredients(meal)}
                        </ul>
                        <p><a href="${meal.strYoutube}" target="_blank">Youtube Video</a></p>
                    `;

                    mealPopup.style.display = 'block';
                });
        }
    
        function getIngredients(meal) {
            let ingredientsList = '';
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    ingredientsList += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
                } else {
                    break;
                }
            }
            return ingredientsList;
        }
    
       
        const closeBtn = document.getElementsByClassName('popup-content')[0];
        console.log(closeBtn)
        closeBtn.onclick = function() {
            mealPopup.style.display = 'none';
        }

});