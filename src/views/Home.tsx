import React, { useEffect, useState } from 'react'
import BookService from '../api/BookService';
import { IBook } from '../types/book';
import AddBookModal from '../components/AddBookModal';
import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, Button, Icon, Container } from 'semantic-ui-react';
import EditBookModal from '../components/EditBookModal';
import DeleteBookModal from '../components/DeleteBookModal';

const Home: React.FC = () => {
    const [books, setBooks] = useState<Array<IBook>>([]);

    const retrieveAllBooks = () => {
        BookService.getAllBooks()
            .then((response: any) => {
                setBooks(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveAllBooks();
    }, [])

    return (
        <Container style={{ marginTop: "18px" }}>
            <Button icon onClick={() => retrieveAllBooks()} size='big'>
                <Icon name='refresh' />
            </Button>
            <Table compact celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell>Author</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {books && books.map((book, i) => (
                        <TableRow>
                            <TableCell>{book.book_title}</TableCell>
                            <TableCell>{book.book_author}</TableCell>
                            <TableCell>{book.book_price} </TableCell>
                            <TableCell>
                                <EditBookModal editBook={book} />
                                <DeleteBookModal book_id={book.book_id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>


            </Table>
            <AddBookModal />
        </Container >
    )
}

export default Home