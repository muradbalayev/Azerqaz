import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ReadModal = (props) => {
  const [comment, setComment] = useState([]);
  const [renderModal, setRenderModal] = useState(false)
  const { show, onHide, id } = props

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/comments/${id}`)
        .then(response => {
          setRenderModal(true);
          const commentData = response.data.comments || response.data;
          setComment(commentData);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id]);

  const handleClose = () => {
    setRenderModal(false);
    onHide();
    setComment([]);
  };

  return (

    <Modal
      {...props}
      show={show && renderModal}
      onHide={onHide}
      backdropClassName="custom-backdrop"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comment ? (
          <div className='d-flex flex-column justify-content-center'>
           <h5>Body: {comment.body}</h5>
            <p>PostID: {comment.postId}</p>
            <p>User: {comment.user && comment.user.id}</p>
          </div>
        ) : (
          <p>No comment available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-danger' onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>

  )
}

export default ReadModal
