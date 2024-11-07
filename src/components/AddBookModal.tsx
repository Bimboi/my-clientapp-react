import React, { ChangeEvent, useState } from 'react'
import { IBook } from '../types/book';
import BookService from '../api/BookService';
import { Button, Form, FormField, Header, Icon, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';

const AddBookModal: React.FC = () => {
    const [open, setOpen] = useState(false);

    const initBookData: IBook = {
        book_title: "",
        book_author: "",
        book_price: 0
    };
    const [bookData, setBookData] = useState<IBook>(initBookData);
    const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookData({ ...bookData, [name]: value });

        if (bookData.book_title) {
            setSubmitEnabled(true);
        }
    };

    const addBookData = () => {
        var data: IBook = {
            book_title: bookData.book_title,
            book_author: bookData.book_author,
            book_price: bookData.book_price
        };

        setSubmitEnabled(false);

        BookService.addBook(data)
            .then((response: any) => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const resetBookData = () => {
        setBookData(initBookData);
        setSubmitEnabled(false);
        setSubmitted(false);
    };

    return (
        <>
            <Modal
                onClose={() => {
                    if (submitted) {
                        resetBookData();
                    }
                    setOpen(false);
                }}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                    <Button
                        floated='right'
                        icon
                        labelPosition='left'
                        primary
                        size='small'
                    >
                        <Icon name='book' /> Add Book
                    </Button>
                }
            >
                <ModalHeader>Book Information</ModalHeader>
                {submitted ?
                    <><ModalContent>
                        <div>
                            <Header as='h1'>Submitted!</Header>
                        </div>
                    </ModalContent>
                        <ModalActions>
                            <Button
                                color='green'
                                onClick={() => {
                                    setOpen(false)
                                }}>
                                Done
                            </Button>
                        </ModalActions>
                    </> :
                    <>
                        <ModalContent>
                            <Form>
                                <FormField>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        id="book_title"
                                        name="book_title"
                                        required
                                        value={bookData.book_title}
                                        onChange={handleInputChange}
                                        placeholder="Title" />
                                </FormField>
                                <FormField>
                                    <label>Author Name</label>
                                    <input type="text"
                                        id="book_author"
                                        name="book_author"
                                        value={bookData.book_author}
                                        onChange={handleInputChange}
                                        placeholder="Author Name" />
                                </FormField>
                                <FormField>
                                    <label>Price</label>
                                    <input type="number"
                                        id="book_price"
                                        name="book_price"
                                        value={bookData.book_price}
                                        onChange={handleInputChange}
                                        placeholder="Price" />
                                </FormField>
                            </Form>
                        </ModalContent>
                        <ModalActions>
                            <Button
                                color='grey'
                                onClick={() => {
                                    resetBookData();
                                    setOpen(false);
                                }}>
                                Cancel
                            </Button>
                            <Button
                                disabled={!submitEnabled}
                                color='green'
                                onClick={() => {
                                    addBookData();
                                }}>
                                Submit
                            </Button>
                        </ModalActions>
                    </>
                }
            </Modal >
        </>

    )
}

export default AddBookModal