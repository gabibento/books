import React from 'react';
import { Input } from '@chakra-ui/react'
import styles from './Search.module.css'

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
    <div className={styles.container}>
    <div className={styles['search-input']}>
      <Input 
        type="text" 
        id='search' 
        onChange={(event) => handleChange(event)} 
        fontSize={{ base: '12px', sm: '14px', md: '16px', lg: '18px' }}
        height={{ base: '1.5em', sm: '1.75em', md: '2m', lg: '2em'}}
      />
    </div>
  </div>
  )
}

export default Search;