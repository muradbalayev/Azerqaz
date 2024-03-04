import React, { useState } from 'react'
import "./ProjectProducts.scss"
import Icon from 'react-icons-kit';
import { ic_create } from 'react-icons-kit/md/ic_create';
import { trashO } from 'react-icons-kit/fa/trashO';
import { ic_remove_red_eye } from 'react-icons-kit/md/ic_remove_red_eye'
import { ic_add_box } from 'react-icons-kit/md/ic_add_box'
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ProjectProducts = ({ head, body, searchable, totalPages, currentPage, onPageChange }) => {


  const [search, setSearch] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const [productid, setProductId] = useState(null);

  // ID ni Filter Etmir
  const filteredData = body.filter(products => {
    const dataToSearch = products.filter((_, index) => index !== 0);
    return dataToSearch.some(product => product.toString().toLocaleLowerCase("TR").includes(search));
  });

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };


  const handleDelete = (productId) => {
    Swal.fire({
      title: "Əminsiniz?",
      text: "Dəyişikliyi geri qaytara bilməyəcəksiniz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bəli, silin!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://jealous-curvy-beginner.glitch.me/products/${productId}`)
          .then(response => {
            console.log('Məhsul Silindi!');
            Swal.fire({
              title: "Silindi!",
              text: `Məhsul No:${productId} müvəffəqiyyətlə silindi!`,
              icon: "success"
            });


          })
          .catch(error => {
            console.error('Error deleting product:', error);
            Swal.fire({
              title: "Error!",
              text: "Error deleting product",
              icon: "error"
            });
          });
      }
    });
  };

  

  return (
    <>
      <div className='card h-100 p-0'>
        <div className='card-header'>
          Layihələr
        </div>
        <div className='card-body h-100 p-0 m-0 d-flex flex-column justify-content-between align-items-center'>
          <section
            style={{ overflowY: "scroll" }}
            className=' w-100 header p-0 m-0 d-flex flex-column align-items-center justify-content-start'>
            {searchable && (
              <div style={{ minHeight: "50px" }} className='container-md d-flex input-group gap-2 m-2 p-2 w-100 align-items-center justify-content-center text-center'>
                <input
                  style={{ maxHeight: "80px" }}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  type='text'
                  placeholder='Axtarış Paneli'
                  className='form-control'>
                </input>
                <Link to={'/dashboard/projects/crud'}
                  className='d-flex align-items-center'
                  style={{ borderRadius: '25%' }}>
                  <Icon icon={ic_add_box} size={40}></Icon>
                </Link>
              </div>)}

            <table className="table table-striped table-hover border-top">
              <thead>
                <tr className='table-secondary'>
                  {head.map((h, key) => (
                    <th key={key} scope="col">
                      {h.name}
                    </th>
                  ))}
                  <th className='text-center' scope='col'>Panel</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((products, rowIndex) => (
                  <tr key={rowIndex} className='group'>
                    {products.map((product, cellIndex) => (
                      <td key={`${rowIndex}_${cellIndex}`}>{product}</td>
                    ))}
                    <td className='d-flex justify-content-center gap-2'
                      style={{ flexWrap: "nowrap" }}>
                      <button
                        className='btn btn-info'>
                        <Icon className='d-flex' icon={ic_create} />
                      </button>
                      <button
                        className='btn btn-danger'>
                        <Icon onClick={() => handleDelete(products[0])}
                          className='d-flex'
                          icon={trashO} />
                      </button>

                      <Button key={rowIndex} variant="primary"
                        onClick={() => {
                          setModalShow(true);
                          console.log(products[0])
                          setProductId(products[0]);
                        }}>
                        <Icon className='d-flex' icon={ic_remove_red_eye} />
                      </Button>


                    </td>
                  </tr>
                ))}

              </tbody>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => { setModalShow(false); }}
                  productid={productid}
                />
            </table>

          </section>
          <nav className='container bg-light d-flex align-items-center justify-content-center border-top'>
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" 
                  style={{borderRadius: "25%"}}
                  onClick={() => handleClick(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

    </>
  )
}

export default ProjectProducts