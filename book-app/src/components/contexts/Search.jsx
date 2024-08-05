import React from 'react';

const Search = ({books, setBooks, allbooks}) => {

    const handleChange = (event) => {
        //converts input to lowercase for case-insensitive matching
        const query = event.target.value.toLowerCase();
      
        if (query) {
            //filters books based on the query in the title
            const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
            
            //updates the displayed books with the filtered list
            setBooks(filteredBooks);
        } else {
            //restores the full book list if the query is empty
          setBooks(allbooks)
        }
    }

  return (
    <div>
        <input type="text" id='search' onChange={(event) => handleChange(event)} />
    </div>
  )
}

export default Search;