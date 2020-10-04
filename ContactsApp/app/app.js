//Selectors
const searchField = document.querySelector("[data-search-input]");
const namesElem = document.querySelectorAll("[data-contact-name]");

//Event Listeners
searchField.addEventListener('keyup', filterNames);

//functions
function filterNames() {
    let filterValue = searchField.value.toLowerCase();
    console.log(filterValue);
    namesElem.forEach(nameElem => {
        if(nameElem.innerText.toLowerCase().search(filterValue))
            nameElem.parentElement.style.display = 'none';
        else
            nameElem.parentElement.style.display = 'list-item';
    });
}