import { db } from "../../firebaseConfig"
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore"

export const addBook = async (userId, bookshelf, bookId, book, navigate) => {

    console.log("User ID:", userId);
    console.log("Bookshelf:", bookshelf);
    console.log("Book ID:", bookId);



   if(userId && bookshelf){
     //references the user's bookshelves collection
    const bookshelvesRef = collection(db, "users", userId, "bookshelves")
    console.log("Bookshelves Ref:", bookshelvesRef);

    if(bookshelvesRef){
        //references the specific bookshelf
        const shelfRef = doc(bookshelvesRef, bookshelf)
        console.log("Shelf Ref:", shelfRef);
        
        try{
            //queries the selected shelf for the book with the same id
            const booksCollectionRef = collection(shelfRef, "books");
            console.log("Books Collection Ref:", booksCollectionRef);
            
            //query to check if the book with the same id already exists
            const bookQuery = query(booksCollectionRef, where("id", "==", bookId));
            console.log("Book Query:", bookQuery);
            const bookSnapshot = await getDocs(bookQuery);
            console.log("Book Snapshot:", bookSnapshot);
            if(!bookSnapshot.empty){
                //if the query returns results, the book is already on the shelf
                console.log('This book is already on the shelf.');
                return
        }
            await addDoc(collection(shelfRef, "books"), book)
            console.log("Book successfully added to shelf!")

        }catch(e){
            console.error("Error adding book to shelf: " + e)
        }

        try{
            const allbooksQuery = query(collection(bookshelvesRef, "allbooks", "books"), where("id", "==", bookId))
            const allbooksSnapshot = await getDocs(allbooksQuery)
            if(allbooksSnapshot.empty){
                await addDoc(collection(bookshelvesRef, "allbooks", "books"), book)
                console.log("Book successfully added to 'allbooks' shelf")
            }
        }catch(e){
            console.error("Error adding book to 'allbooks' shelf" + e)
        }
    }else{
        console.error('User ID or bookshelf not defined');
    }
   }else{
    console.log("User ID or bookshelf not defined")
    navigate("/login")
   }
}