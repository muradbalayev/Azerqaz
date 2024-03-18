import React, { useState, useEffect } from 'react';
import ProjectProducts from './ProductsTable';
import axios from 'axios';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";


const DashboardProjects = () => {


  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const pagesLimit = 10;

  const [lightboxSlides, setLightboxSlides] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  const handleThumbnailClick = (index) => {
    const images = paginatedProducts[index]?.images || [];
    const slides = images.map(image => ({ src: image }));
    setLightboxSlides(slides);
    setLightboxOpen(true);
  };

  const body = paginatedProducts.map((product, index) => ([
    product.id,
    product.title,
    <img
      alt='tmb'
      width={40}
      className='img-thumbnail text-center'
      style={{ cursor: "pointer" }}
      onClick={() => handleThumbnailClick(index)}
      src={product.thumbnail} />,
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
            { name: 'Thumbnail' },
            { name: 'Qiymət' },
            { name: 'Brend' },
            { name: 'Kateqoriya' },
            {name: 'Panel'}
          ]}
          totalPages={pagesToShow}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          body={body}
        />
      )}
        <Lightbox
        open={lightboxOpen}
        slides={lightboxSlides}
        close={() => setLightboxOpen(false)}
        plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Zoom]}
      />

    </>
  );
};



export default DashboardProjects;