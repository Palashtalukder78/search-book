// Clickable Function for get data from the API
const searchButton = () => {
    //Make Empty
    const bookContainer = document.getElementById('books-container');
    bookContainer.textContent = '';
    const mainContainer = document.getElementById('search-result-found');
    mainContainer.textContent = '';
    //Get input field text
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    //Validation : when we input Nothing
    if(inputText === ''){
        handleValidation('search-result-found','none');
        handleValidation('no-result-found','none');
        handleValidation('empty-search-field','block');
    }
    //Otherwise we can get datafrom here
    else{
        //if no result fount are here , then make empty/none
        handleValidation('no-result-found','none');
        // Spinner Show 
        handleValidation('spinner','block');
        //if here are empty error , then make empty/none
        handleValidation('empty-search-field','none');
        //Get API access from here
        const url = `https://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
    }
}
// Validation function [Very usefull, Love it]
const handleValidation = (id,display) => {
    const fieldId = document.getElementById(id);
    fieldId.style.display = display;
}
//When input field through a value for makeing the process and disply value
const displayBooks = data => {
    const resultFound = data.numFound;
    const books = data.docs.slice(0,36);
    //If input value is not available in the API
    if(books.length === 0){
        handleValidation('search-result-found','none');
        handleValidation('no-result-found','block');
        handleValidation('empty-search-field','none');
        handleValidation('spinner','none');
    }
    //If input value are available in the API
    else{
        const mainContainer = document.getElementById('main-container');
        handleValidation('search-result-found','block');
        //result founded value display  here
        const h4 = document.getElementById('search-result-found');
        h4.innerText = `Result founded: ${resultFound}`;
        mainContainer.appendChild(h4);
        //Display all the founded value from API
        const bookContainer = document.getElementById('books-container');
        bookContainer.textContent = '';
        books?.forEach(book =>  {
            const div = document.createElement('div');
            div.classList.add('col-md-3');
            div.innerHTML = `
                <div class="card my-1">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid image-placeholder" alt="..." style="height: 250px">

                    <div class="card-body">
                        <h5 class="card-title">Book name: ${book.title}</h5>
                        <p><b>Author:</b> ${book.author_name ? book.author_name[0] : 'Unknown'}</p>
                        <p><b>Publisher:</b> ${book.publisher ? book.publisher[0] : 'Unknown'}</p>
                        <p><b>First Publish:</b> ${book.first_publish_year ? book.first_publish_year : 'Unknown'}</p>
                    </div>
                </div> 
            `;
            bookContainer.appendChild(div);
        });
        //make the spinner off after loading data
        handleValidation('spinner','none');
    }
}


// Main 
{/*  */}
