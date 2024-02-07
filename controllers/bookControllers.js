import {firebase, auth,  signInWithEmailAndPassword} from '../firebase.js';
import Book from '../models/bookModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

// Authentication methods
export const signUp = async(req,res) =>{
  const userResponse = await auth.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false
  }) 
  res.json(userResponse)
}

 export const signIn = async(req,res) =>{
  const { email, password } = req.body;
  try {
    const credential = await signInWithEmailAndPassword(
      getClientAuth(),
      email,
      password
    );

    const token = await auth.createCustomToken(credential.user.uid);

    res.status(200).json({ token });
  } catch (error) {
    if (
      error.code === 'signin/wrong-password' ||
      error.code === 'signin/user-not-found'
    ) {
      res.status(403);
    } else {
      res.status(500);
    }
  }
 }


 export const signOut = async(req,res) =>{
  try {
    const userId = req.headers['x-user-id'];
    const customHeaderInfo = req.headers['custom-header-info'];
    await auth.revokeRefreshTokens(userId);
    console.log(userId, customHeaderInfo)
    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    console.error('Sign-out error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 }

// CRUD methods
// Create method
export const createBook = async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      await addDoc(collection(db, 'books'), data);
      res.status(200).send('books created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

// Read method (Get all books) 
  export const getBooks = async (req, res, next) => {
    try {
      const books = await getDocs(collection(db, 'books'));
      const bookArray = [];
  
      if (books.empty) {
        res.status(400).send('No Books found');
      } else {
        books.forEach((doc) => {
          const book = new Book(
            doc.id,
            doc.data().title,
            doc.data().isbn,
            doc.data().author,
          );
          bookArray.push(book);
        });
  
        res.status(200).send(bookArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
// Read Method (Get book by ID)
export const getBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = doc(db, 'books', id);
      const data = await getDoc(book);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('book not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

// Update method (Update book by ID)
export const updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const book = doc(db, 'books', id);
      await updateDoc(book, data);
      res.status(200).send('book updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

// Delete Method (Delete book by ID)
export const deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'books', id));
      res.status(200).send('book deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

