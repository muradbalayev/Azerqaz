import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ReadModal = (props) => {
  const [user, setUser] = useState([]);
  const [renderModal, setRenderModal] = useState(false)
  const { show, onHide, id } = props

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(response => {
          setRenderModal(true);
          const userData = response.data.users || response.data;
          setUser(userData);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id]);

  const handleClose = () => {
    setRenderModal(false);
    onHide();
    setUser([]);
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
        {user ? (
          <div className='d-flex flex-column justify-content-center'>
           <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Age: {user.age}</p>
          </div>
        ) : (
          <p>No user available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-danger' onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>

  )
}

export default ReadModal
