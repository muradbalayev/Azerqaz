import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ReadModal = ( props ) => {
    const [product, setProduct] = useState([]);
    const [renderModal, setRenderModal] = useState(false)
const {show, onHide, productid} = props 

useEffect(() => {
  if (productid) {
    axios.get(`https://dummyjson.com/products/${productid}`)
      .then(response => {
        setRenderModal(true); 
        const productData = response.data.products || response.data;
        setProduct(productData);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }
}, [productid]);

const handleClose = () => {
  setRenderModal(false);
  onHide();
  setProduct([]);
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
        {product.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {product ? (
          <div className='d-flex flex-column justify-content-center'>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Discount: {product.discount}%</p>
            <p>Rating: {product.rating}</p>
            <p>Stock: {product.stock}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
          </div>
       ): (
          <p>No product available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
      <Button className='btn btn-danger' onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>

  )
}

export default ReadModal
