import { db } from "../../firebaseConfig"
import { addDoc, collection, doc, getDocs, increment, query, updateDoc, where } from "firebase/firestore"

export const addBook = async (userId, bookshelf, bookId, book, navigate) => {

   if(userId && bookshelf){
     //references the user's bookshelves collection
    const bookshelvesRef = collection(db, "users", userId, "bookshelves")

    if(bookshelvesRef){
        //references the specific bookshelf
        const shelfRef = doc(bookshelvesRef, bookshelf)
        
        try{
            //queries the selected shelf for the book with the same id
            const booksCollectionRef = collection(shelfRef, "books")  
            //query to check if the book with the same id already exists
            const bookQuery = query(booksCollectionRef, where("id", "==", bookId));
            
            const bookSnapshot = await getDocs(bookQuery);
           
            if(!bookSnapshot.empty){
                //if the query returns results, the book is already on the shelf
                console.log('This book is already on the shelf.');
                return
        }
            await addDoc(collection(shelfRef, "books"), book)
            console.log("Book successfully added to shelf! " + bookId)

            const bookDocRef = doc(db, "books", bookId); 
            await updateDoc(bookDocRef, { popularityCount: increment(1) });

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