document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    setupMenu();
    setupSearch();
});

async function fetchCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    displayCategories(data.categories);
}

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.innerHTML = categories.map(category => `
        <div class="category" data-category="${category.strCategory}">
            <h3>${category.strCategory}</h3>
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
        </div>
    `).join('');
}

function setupMenu() {
    const menuBtn = document.getElementById('btn');
    const menuList = document.getElementById('menu-list');
    const categoriesContainer = document.getElementById('categories');
    const mealsContainer = document.getElementById('mealsContainer');
    
    menuBtn.addEventListener('click', () => {
        menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
    });
    
    menuList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const selectedCategory = event.target.getAttribute('data-category');
            fetchMealsByCategory(selectedCategory);
            menuList.style.display = 'none'; 
            categoriesContainer.style.display = 'none';
            mealsContainer.style.display = 'grid'; 
        }
    });
}

async function fetchMealsByCategory(category) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    displayMeals(data.meals);
}

function displayMeals(meals) {
    const mealsContainer = document.getElementById('mealsContainer');
    mealsContainer.innerHTML = meals.map(meal => `
        <div class="meal-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        </div>
    `).join('');
}

function setupSearch() {
    document.getElementById('search-btn').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        searchMeals(query);
    });
}

async function searchMeals(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    if (data.meals) {
        displayMeals(data.meals);
    } else {
        alert('No recipes found.');
    }
}
