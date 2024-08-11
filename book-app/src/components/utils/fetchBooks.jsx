import axios from 'axios';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const bookTitles = [
    'It Ends with Us', 
    'A Court of Thorns and Roses', 
    'The Song of Achilles', 
    'The Seven Husbands of Evelyn Hugo', 
    'Red, White & Royal Blue', 
    'We Were Liars', 
    'The Invisible Life of Addie LaRue', 
    'Where the Crawdads Sing', 
    'The Silent Patient', 
    'The Cruel Prince'
];

export const fetchBooks = async (book) => {
    try {
        const booksCollection = collection(db, 'books');

            // Faz uma requisição para a API do Google Books
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: `intitle:${book}`,
                    key: 'AIzaSyA5DjHEBbVXyWPnWILvOb_OSgxms-TJvEc', // Substitua pela sua chave da API
                    maxResults: 1,
                },
            });

            // Obtém os livros retornados pela requisição
            const books = response.data.items;

            if (books && books.length > 0) {
                const item = books[0];
                const book = item.volumeInfo;

                // Verifica se o livro já existe no Firestore
                const existingBooksSnapshot = await getDocs(query(booksCollection, where('title', '==', book.title)));

                if (existingBooksSnapshot.empty) {
                    // Dados do livro a serem adicionados ao Firestore
                    const bookData = {
                        title: book.title,
                        authors: book.authors ? book.authors.join(', ') : 'Autor desconhecido',
                        description: book.description || 'Sem descrição',
                        thumbnail: book.imageLinks?.thumbnail || '',
                        publishedDate: book.publishedDate || 'Data desconhecida',
                        pageCount: book.pageCount || 0,
                        categories: book.categories || [],
                    };

                    // Adiciona o livro ao Firestore
                    await addDoc(booksCollection, bookData);
                    console.log(`Livro "${book.title}" adicionado ao Firestore`);
                } else {
                    console.log(`Livro "${book.title}" já existe no Firestore`);
                }
            }

        console.log('Todos os livros novos foram adicionados ao Firestore!');
    } catch (error) {
        console.error('Erro ao buscar ou armazenar livros:', error);
    }
}
