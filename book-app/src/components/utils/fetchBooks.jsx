import axios from 'axios';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const bookTitles = [
    'Addie Larue',
    'Hyunam-Dong'
]

export const fetchBooks = async () => {

    try {
       for(const title of bookTitles){
         //request to the Google Books API
         const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
              q: `intitle:${title}`,
              key: 'AIzaSyA5DjHEBbVXyWPnWILvOb_OSgxms-TJvEc',
              maxResults: 1,
            },
          });
  
          //books returned by the API request
          const books = response.data.items;
          const booksCollection = collection(db, 'books');
  
          //iterate over each book from the API
          for (const item of books) {
            //book's details
            const book = item.volumeInfo;
            //object to be added to Firestore with the book's fields
            const bookData = {
              title: book.title,
              authors: book.authors ? book.authors.join(', ') : 'Autor desconhecido',
              description: book.description || 'Sem descrição',
              thumbnail: book.imageLinks?.thumbnail || '',
              publishedDate: book.publishedDate || 'Data desconhecida',
              pageCount: book.pageCount || 0,
              categories: book.categories || [],
            }
  
          //get existing books stored in Firestore
         const booksExisted = await getDocs(query(booksCollection, where('title', '==', book.title)))
  
          if (booksExisted.empty) {
              //add the new book to Firestore
              await addDoc(booksCollection, bookData);
              console.log(`Livro "${book.title}" adicionado ao Firestore`);
              }
          
          }
  
          console.log('Todos os livros novos foram adicionados ao Firestore!');
       }
      } catch (error) {
        console.error('Erro ao buscar ou armazenar livros:', error);
      }
}