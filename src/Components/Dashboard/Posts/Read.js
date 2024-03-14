import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ReadModal = (props) => {
  const [post, setPost] = useState([]);
  const [renderModal, setRenderModal] = useState(false)
  const { show, onHide, id } = props

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/posts/${id}`)
        .then(response => {
          setRenderModal(true);
          const postData = response.data.posts || response.data;
          setPost(postData);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id]);

  const handleClose = () => {
    setRenderModal(false);
    onHide();
    setPost([]);
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
        {post ? (
          <div className='d-flex flex-column justify-content-center'>
           <h5>Title: {post.title}</h5>
            <p>Comment: {post.body}</p>
            <p>Reactions: {post.reactions}</p>
          </div>
        ) : (
          <p>No post available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-danger' onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>

  )
}

export default ReadModal
