import axios from 'axios';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const searchBookByTitle = async (title) => {
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: `intitle:${title}`,
                key: 'AIzaSyA5DjHEBbVXyWPnWILvOb_OSgxms-TJvEc', 
                maxResults: 1,
            },
        });

        const books = response.data.items;
        if (books && books.length > 0) {
            const volumeId = books[0].id;
            console.log('Volume ID:', volumeId);
            return volumeId;
        } else {
            console.log('Nenhum livro encontrado.');
            return null;
        }

    } catch (error) {
        console.error('Erro ao buscar o livro:', error);
        return null;
    }
};


export const fetchBookDetailsById = async (volumeId) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${volumeId}`, {
            params: {
                key: 'AIzaSyA5DjHEBbVXyWPnWILvOb_OSgxms-TJvEc'
            },
        });

        const book = response.data.volumeInfo;
        const booksCollection = collection(db, 'books');

        // Verifica se o livro já existe no Firestore
        const existingBooksSnapshot = await getDocs(query(booksCollection, where('title', '==', book.title)));

          // Seleciona o melhor link de imagem disponível
          let thumbnailUrl = '';
          if (book.imageLinks?.extraLarge) {
              thumbnailUrl = book.imageLinks.extraLarge;
          } else if (book.imageLinks?.large) {
              thumbnailUrl = book.imageLinks.large;
          } else if (book.imageLinks?.medium) {
              thumbnailUrl = book.imageLinks.medium;
          } else if (book.imageLinks?.thumbnail) {
              thumbnailUrl = book.imageLinks.thumbnail;
          }

          // Log do link de imagem selecionado
          console.log(`Usando imagem para o livro "${book.title}": ${thumbnailUrl}`);

        if (existingBooksSnapshot.empty) {
            // Dados do livro a serem adicionados ao Firestore
            const bookData = {
                title: book.title,
                authors: book.authors ? book.authors.join(', ') : 'Autor desconhecido',
                description: book.description || 'Sem descrição',
                thumbnail: thumbnailUrl || 'Imagem não disponível',
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

    } catch (error) {
        console.error('Erro ao buscar ou armazenar detalhes do livro:', error);
    }
};

export const fetchBooks = async (title) => {
    try {
        // Passo 1: Pesquisar o livro para obter o ID do volume
        const volumeId = await searchBookByTitle(title);

        if (volumeId) {
            // Passo 2: Obter detalhes do livro usando o ID do volume
            await fetchBookDetailsById(volumeId);
        }
    } catch (error) {
        console.error('Erro ao adicionar o livro:', error);
    }
};


