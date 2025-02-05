
 async function fetchCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    Categories(data.categories);
  }
  

  function Categories(categories) {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.innerHTML = categories
      .map(
        (category) => `
        <div class="category">
          <h3>${category.strCategory}</h3>
          <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
        </div>
      `
      )
      .join('');
  }
 

  async function searchMeals(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    console.log(data.meals);
    if (data.meals) {
      alert(`Found ${data.meals.length} recipes for "${query}"!`);
    } else {
      alert('No recipes found. Try another keyword!');
    }
  }
  
 

  fetchCategories();
 

  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
  }

  toggleMenu();
