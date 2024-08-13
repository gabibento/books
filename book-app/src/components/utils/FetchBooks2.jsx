import React, { useEffect, useState } from 'react';

const FetchBooks2 = ({ title }) => {
  const [book, setBook] = useState(null);

  const fetchBook = async (title) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
      const data = await response.json();
      const books = data.docs;

      if (books.length > 0) {
        const book = books[0];
        setBook(book);
        console.log('Dados do livro:', book); // Para depuração
      } else {
        console.log('Nenhum livro encontrado para o título:', title);
      }
    } catch (e) {
      console.error('Erro ao buscar o livro:', e);
    }
  };

  useEffect(() => {
    fetchBook(title);
  }, [title]);

  const relevantGenres = [
    "Fantasy", "Adventure", "Romance", "Science Fiction", "Mystery", "Horror",
    "Thriller", "Historical", "Biography", "Non-fiction"
  ];

  // Filtra os gêneros relevantes e limita o número de gêneros exibidos
  const filteredGenres = book?.subject?.filter((genre) => relevantGenres.includes(genre));
  const limitedGenres = filteredGenres?.slice(0, 5);

  return (
    <>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p>{book.author_name?.join(", ") || "Autor não disponível"}</p>
          <p>
            Gêneros: {limitedGenres?.join(", ") || "Gêneros não disponíveis"}
          </p>
          <img
            src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/128x192?text=Capa+não+disponível'}
            alt={book.title}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default FetchBooks2;
