import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Select from 'react-select'

const DashboardCreate = () => {
    const [newData, setNewData] = useState({
        title: '',
        price: '',
        brand: '',
        category: '',
        discount: '',
        rating: '',
        stock: '',
        thumbnail: null 
    })

    const navigate = useNavigate();


    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    }

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setNewData({ ...newData, thumbnail: file });
    }

    const handleSave = () => {
        Swal.fire({
            title: "Yadda Saxlamaq İstədiyindən Əminsən?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli, yadda saxla!"
        }).then((result) => {
            if (result.isConfirmed) {
                saveData();
            }
        });
    };

    const isFormValid = newData.title && newData.price && newData.brand && newData.category && newData.rating && newData.stock && newData.thumbnail;
    const saveData = () => {
        if (!newData.title || !newData.price || !newData.brand || !newData.category || !newData.rating || !newData.stock || !newData.thumbnail) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.post('https://dummyjson.com/products/add', newData)
            .then(response => {
                console.log('Product added successfully:', response.data);
                navigate('/dashboard/projects'); 
                Swal.fire({
                    title: "Yadda Saxlanıldı!",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('Xeta:', error);
                alert('Xeta.');
            });
        };
        const [category , setCategory] = useState([])
        const [brand , setBrand] = useState([])
        
        const handleCategorySelect = (selectedOption) => {
            setNewData({ ...newData, category: selectedOption.value });
        };
        
        const handleBrandSelect = (selectedOption) => {
            setNewData({ ...newData, brand: selectedOption.value });
        };
        
//Get Categories
    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                console.log("Data from API:", response.data);
                if (response.data && response.data.products && Array.isArray(response.data.products)) {
                    const categoryData = response.data.products.map(product => ({
                        value: product.id,
                        label: product.category
                    }));
                    setCategory(categoryData);

                    const brandData = response.data.products.map(product => ({
                        value: product.id,
                        label: product.brand
                    }));
                    
                    setBrand(brandData);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const uniqueCategories = category.filter((value, index, self) => {
        return self.findIndex(c => c.label === value.label) === index;
    });

    const uniqueBrands = brand.filter((value, index, self) => {
        return self.findIndex(c => c.label === value.label) === index;
    });



    const handleBack = () => {
        navigate('/dashboard/projects')
    }



    return (
        <div className='card overflow-y-scroll p-0 w-100 h-100'>
            <div className="card-header">
                Yarat
            </div>
            <form className='h-100 d-flex justify-content-between flex-column'>
                <div className='card-body'
                    style={{ overflowY: "visible" }}>
                    <div className='form-group p-2'>
                        <label>Title<span className='text-danger'>*</span></label>
                        <input type="text"
                            name='title'
                            value={newData.title}
                            onChange={handleChange}
                            className="form-control" />
                    </div>
                    <div className='form-group row px-2'>
                        <div className='col p-2 m-1'>
                            <label>Price<span className='text-danger'>*</span></label>
                            <input
                                name='price'
                                value={newData.price}
                                onChange={handleChange}
                                type="number"
                                className="form-control" />
                        </div>
                        <div className='col p-2 m-1'>
                            <label>Discount</label>
                            <input
                                name='discount'
                                value={newData.discount}
                                onChange={handleChange}
                                type="number"
                                className="form-control" />
                        </div>
                    </div>

                    <div className='form-group row px-2'>
                        <div className='col p-2 m-1'>
                            <label>Rating<span className='text-danger'>*</span></label>
                            <input
                                name='rating'
                                value={newData.rating}
                                onChange={handleChange}
                                type="number"
                                className="form-control" />
                        </div>
                        <div className='col p-2 m-1'>
                            <label>Stock<span className='text-danger'>*</span></label>
                            <input
                                name='stock'
                                value={newData.stock}
                                onChange={handleChange}
                                type="number"
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group" >
                        <label>Brand<span className='text-danger'>*</span></label>
                            <Select
                                className='p-2'
                                options={uniqueBrands}
                                name='brand'
                                onChange={handleBrandSelect}
                            />
                    </div>
                    <div className="form-group" >
                        <label>Category<span className='text-danger'>*</span></label>
                            <Select
                                className='p-2'
                                options={uniqueCategories}
                                name='category'
                                onChange={handleCategorySelect}
                            />
                    </div>
                    <div className='form-group p-2'>
                        <label>Thumbnail<span className='text-danger'>*</span></label>
                        <input
                            name='thumbnail'
                            type="file"
                            onChange={handleThumbnailChange}
                            className="form-control"
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className='card-footer d-flex justify-content-between'>
                <button onClick={handleBack}
                     className='btn btn-outline-danger d-flex align-items-center'>
                      Geri
                    </button>
                    <button disabled={!isFormValid} type='button' onClick={handleSave} className='btn btn-outline-success d-flex align-items-center py-2'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DashboardCreate
