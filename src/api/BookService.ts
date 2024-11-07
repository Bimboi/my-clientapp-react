import http from "./client";
import { IBook } from '../types/book';

const getAllBooks = () => {
  return http.get<Array<IBook>>("/books");
};

const getBookById = (book_id?: number) => {
  return http.get<IBook>(`/book/${book_id}`);
};

const addBook = (bookData: IBook) => {
  return http.post<IBook>("/book", bookData);
};

const updateBook = (book_id?: number, bookData?: IBook) => {
  return http.put<any>(`/book/${book_id}`, bookData);
};

const deleteBook = (book_id?: number) => {
  return http.delete<any>(`/book/${book_id}`);
};

const BookService = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};

export default BookService;