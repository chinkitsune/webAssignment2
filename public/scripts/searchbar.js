/**
 * Author : Younghoon Ok
 */


// Grab the elements from our HTML
const searchIcon = document.getElementById('searchLink');
const searchBar = document.getElementById('search-bar');
const closeBtn = document.getElementById('close-search');
const searchIconInSearchBar = document.getElementById('search-img-search-bar');
const searchBarBackground = document.getElementById('search-background');
const userIcon = document.getElementById('userLink');

// When the search icon is clicked, show the search bar
searchIcon.addEventListener('click', function() {
    searchBar.classList.add('active');
    searchBarBackground.classList.add('active');
});

// When the 'X' button is clicked, hide the search bar
closeBtn.addEventListener('click', function() {
    searchBar.classList.remove('active');
    searchBarBackground.classList.remove('active');
});

searchIconInSearchBar.addEventListener('click', function() {
    window.location = "/search";
});

userIcon.addEventListener('click', function() {
    window.location = "/login";
});