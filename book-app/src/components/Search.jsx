import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import styles from './Search.module.css';
import { fetchBooks } from './utils/fetchBooks';

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
                <Input
                    type="text"
                    id='search'
                    value={query}
                    onChange={handleChange}
                    fontSize={[ '12px', '14px', '16px', '18px' ]}
                    height={['1.5em', '1.75em', '2m', '2em']}
                    focusBorderColor='brand.400'
                />
            </div>
        </div>
    );
}

export default Search;
