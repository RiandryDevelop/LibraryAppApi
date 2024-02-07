import express from 'express';

import {
  createBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
  signUp,
  signIn,
  signOut,
} from '../controllers/bookControllers.js'
;

const router = express.Router();
// AUTHENTICATION ROUTES
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

// CRUD ROUTES
router.get('/', getBooks);
router.post('/new', createBook);
router.get('/book/:id', getBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

export default router;