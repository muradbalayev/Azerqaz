import React, { useState, useEffect } from 'react';
import ProjectProducts from './ProductsTable';
import axios from 'axios';

const DashboardProjects = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 
  const pagesLimit = 10;
  
  const fetchData = () => {
    return axios.get('https://dummyjson.com/products');
  };

  useEffect(() => {
    fetchData()
    .then(response => {
      const productsData = response.data.products || response.data;
      setProducts(productsData);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  }, []);
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const pagesToShow = totalPages > 0 ? Math.min(totalPages, pagesLimit) : 1;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   


  const body = paginatedProducts.map(product => ([
    product.id,
    product.title,
    product.price,
    product.brand,
    product.category,
  ]));

  return (
    <>
       {products.length > 0 && ( 
      <ProjectProducts
        searchable={true}
        head={[
          { name: '#' },
          { name: 'Başlıq' },
          { name: 'Qiymət' },
          { name: 'Brend' },
          { name: 'Kateqoriya' }
        ]}
        totalPages={pagesToShow}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        body={body}
      />
       )}
    </>
  );
};

export default DashboardProjects;