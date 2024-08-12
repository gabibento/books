import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import styles from './Search.module.css';
import { fetchBooks } from './utils/fetchBooks';
import { SearchIcon } from '@chakra-ui/icons';

const Search = ({ books, setBooks, allbooks }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query) {
                fetchBooks(query);
            }
        }, 5000);

        return () => clearTimeout(handler);
    }, [query]);

    const handleChange = (event) => {
        const newQuery = event.target.value.toLowerCase();
        setQuery(newQuery);

        if (newQuery) {
            const filteredBooks = books.filter(book => book.title.toLowerCase().includes(newQuery));
            setBooks(filteredBooks);
        } else {
            setBooks(allbooks);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles['search-input']}>
                <InputGroup>
                    <InputLeftElement  pointerEvents="none" height="100%" alignItems="center" >
                        <SearchIcon color={'brand.400'}></SearchIcon>
                    </InputLeftElement>
                    <Input
                        type="text"
                        id='search'
                        value={query}
                        onChange={handleChange}
                        fontSize={[ '12px', '14px', '16px', '18px' ]}
                        height={['1.5em', '1.75em', '2m', '2em']}
                        borderColor={'brand.300'}
                        focusBorderColor='brand.400'
                        
                    />
                </InputGroup>
              
            </div>
        </div>
    );
}

export default Search;
