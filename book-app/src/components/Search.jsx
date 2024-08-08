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
        fontSize={[ '12px', '14px', '16px', '18px' ]}
        height={['1.5em', '1.75em', '2m', '2em']}
        focusBorderColor='brand.400'
      />
    </div>
  </div>
  )
}

export default Search;