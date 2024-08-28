
document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories');
    const searchInput = document.getElementById('searchInput');
    const userInfo = document.getElementById('userInfo');

    const username = localStorage.getItem('username');
    userInfo.innerHTML = "Welcome "+ username + "!";

    let allCategories = [];

    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => { 
            allCategories = data.categories;
            displayCategories(allCategories);
            console.log('data',data)
            console.log('allcat',allCategories)

            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredCategories = allCategories.filter(category =>
                    category.strCategory.toLowerCase().includes(searchTerm) // == searchTerm
                );
                displayCategories(filteredCategories);
            });
        });

    function displayCategories(categories) {
        categoriesContainer.innerHTML = '';
        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('flex-item');

            categoryElement.innerHTML = 
            `<img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                <h3>${category.strCategory}</h3>`;

            categoryElement.addEventListener('click', () => {
                window.location.href = `meals.html?category=${category.strCategory}`;
            });
            console.log(categoryElement)
            categoriesContainer.appendChild(categoryElement);
        });
    }
});