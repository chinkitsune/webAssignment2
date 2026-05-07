window.addEventListener("DOMContentLoaded", async () => {
    const searchIcon = document.getElementById('search-page-img');
    searchIcon.addEventListener('click', showSearchResults);
});

async function showSearchResults(event){
    console.log("Search icon clicked");
    const start = 0;
    const limit = 100;
    const searchbar= document.getElementById('search-page-search');
    const keyword = searchbar.value;
    console.log(`Search keyword: ${keyword}`);
    const url = `/products?start=${start}&limit=${limit}&keyword=${keyword}`;
    const response = await fetch(url);
    const data = await response.json();
    const searched_list = document.querySelector('#searched-list');
    searched_list.innerHTML = '';
    data.data[1].forEach(product => {
        addProductToList(product);
    });
}



function addProductToList(product) {
    const li = document.createElement('li');
    li.className = 'product-thumb';

    const img = document.createElement('img');
    img.src = product.image;

    const title = document.createElement('p');
    title.className = 'product-title';
    title.textContent = product.name;

    const detail = document.createElement('p');
    detail.className = 'product-detail';
    detail.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = `$${product.price} CAD`;

    // Nest them
    li.append(img, title, detail, price);
    const searched_list = document.querySelector('#searched-list');
    searched_list.appendChild(li);
}