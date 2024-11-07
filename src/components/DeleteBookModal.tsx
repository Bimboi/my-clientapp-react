import React from 'react'
import { Modal } from 'semantic-ui-react'
import BookService from '../api/BookService';

const DeleteBookModal: React.FC<{ book_id?: number }> = ({ book_id }) => {
    const deleteBookData = () => {
        BookService.deleteBook(book_id)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <Modal
            trigger={
                <button className="ui red icon button">
                    <i className="trash icon"></i>
                </button>
            }
            header='Reminder!'
            content='Permanently delete row?'
            actions={['Cancel', { key: 'done', content: 'Delete', color: 'red', onClick: deleteBookData }]}
        />
    )
}

export default DeleteBookModal