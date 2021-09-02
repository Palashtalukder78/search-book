const searchButton = () => {
    const bookContainer = document.getElementById('books-container');
    bookContainer.textContent = '';
    const mainContainer = document.getElementById('search-result-found');
    mainContainer.textContent = '';
    
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';

    if(inputText === ''){
        handleValidation('search-result-found','none');
        handleValidation('no-result-found','none');
        handleValidation('empty-search-field','block');
    }else{
        // handleValidation('main-container','none');
        handleValidation('no-result-found','none');

        const url = `https://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
    }
}
const handleValidation = (id,display) => {
    const fieldId = document.getElementById(id);
    fieldId.style.display = display;
}
const displayBooks = data => {
    const resultFound = data.numFound;
    const books = data.docs;
    if(books.length === 0){
        handleValidation('search-result-found','none');
        handleValidation('no-result-found','block');
        handleValidation('empty-search-field','none');
    }
    else{
        const mainContainer = document.getElementById('main-container');
        // handleValidation('main-container','block');
        handleValidation('search-result-found','block');
        const h4 = document.getElementById('search-result-found');
        h4.innerText = `Resulted founded: ${resultFound}`;
        mainContainer.appendChild(h4);

        const bookContainer = document.getElementById('books-container');
        bookContainer.textContent = '';
        books?.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col-md-3');
            div.innerHTML = `
                <div class="card my-1">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top img-fluid" alt="..." style="height: 250px">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p><b>Author:</b> ${book.author_name ? book.author_name[0] : 'Unknown'}</p>
                        <p><b>Publisher:</b> ${book.publisher ? book.publisher[0] : 'Unknown'}</p>
                        <p><b>First Publish:</b> ${book.first_publish_year ? book.first_publish_year : 'Unknown'}</p>
                        
                    </div>
                </div> 
            `;
            bookContainer.appendChild(div);
        });
    }
}