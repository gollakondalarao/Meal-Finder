//  ///////////////////////catogery section ////////////////////////////

document.addEventListener("DOMContentLoaded", () => {     
    fetchCategories();     
    setupMenu();     
});

let categoryDescriptions = {};
async function fetchCategories() {     

        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');     
        const data = await response.json();     
      
        
        displayCategories(data.categories);  
    
}

function displayCategories(categories) {     
    const categoriesContainer = document.getElementById('categories');     
    
    categoriesContainer.innerHTML = categories.map(category => {  
       
        categoryDescriptions[category.strCategory] = category.strCategoryDescription;  


        return `         
            <div class="category" data-category="${category.strCategory}"> 

                <h3>${category.strCategory}</h3>       
                      
                <img src="${category.strCategoryThumb}" alt="${category.strCategory}">  
                
            </div>`;    
            ;
             
    }).join('');

   
    document.querySelectorAll('.category').forEach(categoryElement => {
        categoryElement.addEventListener('click', () => {
            const selectedCategory = categoryElement.getAttribute('data-category');
            fetchMealsByCategory(selectedCategory);
        });
    });
}
  
////////////////////////////menu section/////////////////////////////////////

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
          
//////////////////////filter products////////////////////////////////////////

async function fetchMealsByCategory(category) {     
    
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);     
        const data = await response.json();     
        displayMeals(data.meals, category);
   
}  

function displayMeals(meals, category) {     
    const categoriesContainer = document.getElementById('categories');  
    const mealsContainer = document.getElementById('mealsContainer');  
    const mealTitle = document.getElementById('mealTitle');



    categoriesContainer.style.display = 'none';     
    mealsContainer.style.display = 'grid';      

    mealsContainer.innerHTML = meals.map(meal => ` 
                
        <div class="meal-card">     
                
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">             
            <h3>${meal.strMeal}</h3>         
        </div>     
    `).join('');

    if (mealsContainer) {

        const description = categoryDescriptions[category]  || "No description available."; 
        mealTitle.innerHTML = `
        <h1>${category}</h1> 
        <p>${description}</p>`; 
        mealTitle.style.display = 'block';
    }
}

       
    //////////////////////////// single product page ////////////////////////

    async function fetchMealDetails(mealId) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        const meal = data.meals[0];
        
        const mealsContainer = document.getElementById('mealsContainer');
        const mealDetailContainer = document.getElementById('mealDetail');
        const mealTitle = document.getElementById('mealTitle');
    
        // Hide the meals container and meal title (description and categories)
        mealsContainer.style.display = 'none';
        mealTitle.style.display = 'none';
        mealDetailContainer.style.display = 'block';
    
        mealDetailContainer.innerHTML = `
            <div class="meal-detail">
                <div id="contMeal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width='300px' height='300px'>
                            <div>
                               <h1>${meal.strMeal}</h1>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                            </div>
                </div>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
                <p><strong>measure:</strong> ${meal.strmeasure}</p>
                <button id="backBtn">Back to Meals</button>
            </div>
        `;
    
        document.getElementById("backBtn").addEventListener("click", () => {
            mealDetailContainer.style.display = 'none';
            mealsContainer.style.display = 'grid';
            mealTitle.style.display = 'block'; // Show the meal title again when going back
        });
    }
    
    function displayMeals(meals, category) {     
        const categoriesContainer = document.getElementById('categories');  
        const mealsContainer = document.getElementById('mealsContainer');  
        const mealTitle = document.getElementById('mealTitle');
    
        categoriesContainer.style.display = 'none';     
        mealsContainer.style.display = 'grid';      
    
        mealsContainer.innerHTML = meals.map(meal => ` 
            <div class="meal-card" data-meal-id="${meal.idMeal}">     
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">             
                <h3>${meal.strMeal}</h3>     
            </div>     
        `).join('');
    
        if (mealsContainer) {
            const description = categoryDescriptions[category] || "No description available."; 
            mealTitle.innerHTML = `
            <h1>${category}</h1> 
            <p>${description}</p>` 
            mealTitle.style.display = 'block';
        }
    
        // Add event listener to images
        document.querySelectorAll('.meal-card img').forEach(image => {
            image.addEventListener('click', (event) => {
                const mealCard = event.target.closest(".meal-card");
                if (mealCard) {
                    const mealId = mealCard.getAttribute("data-meal-id");
                    fetchMealDetails(mealId);
                }
            });
        });
    }


