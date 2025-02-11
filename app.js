document.addEventListener("DOMContentLoaded", () => {     
    fetchCategories();     
    setupMenu();     
});

let categoryDescriptions = {}; // Store category descriptions

async function fetchCategories() {     
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');     
        const data = await response.json();     
        displayCategories(data.categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function displayCategories(categories) {     
    const categoriesContainer = document.getElementById('categories');     
    
    categoriesContainer.innerHTML = categories.map(category => {  
        // Store descriptions
        categoryDescriptions[category.strCategory] = category.strCategoryDescription;  

        return `         
            <div class="category" data-category="${category.strCategory}">             
                <h3>${category.strCategory}</h3>             
                <img src="${category.strCategoryThumb}" alt="${category.strCategory}">  
                
            </div>`;     
    }).join('');

    // Add click event to each category
    document.querySelectorAll('.category').forEach(categoryElement => {
        categoryElement.addEventListener('click', () => {
            const selectedCategory = categoryElement.getAttribute('data-category');
            fetchMealsByCategory(selectedCategory);
        });
    });
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
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);     
        const data = await response.json();     
        displayMeals(data.meals, category);
    } catch (error) {
        console.error("Error fetching meals:", error);
    }
}  

function displayMeals(meals, category) {     
    const categoriesContainer = document.getElementById('categories');  
    const mealsContainer = document.getElementById('mealsContainer');  
    const mealTitle = document.getElementById('mealTitle');

    // Hide categories and show meals
    categoriesContainer.style.display = 'none';     
    mealsContainer.style.display = 'grid';      

    mealsContainer.innerHTML = meals.map(meal => `         
        <div class="meal-card">             
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">             
            <h3>${meal.strMeal}</h3>         
        </div>     
    `).join('');

    if (mealTitle) {
        const description = categoryDescriptions[category] || "No description available.";
        mealTitle.innerHTML = `
        <p>${description}</p>`;
        mealTitle.style.display = 'block';
    }
}
