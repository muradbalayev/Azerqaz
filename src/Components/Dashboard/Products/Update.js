import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select';
import Swal from 'sweetalert2';
const DashboardUpdate = () => {

    const { id } = useParams();

    const [newData, setNewData] = useState({
        id: '',
        title: '',
        price: '',
        brand: '',
        category: '',
        discount: '',
        rating: '',
        stock: '',
        thumbnail: null,


    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(response => {
                const data = response.data;
                setNewData({
                    id: data.id || '',
                    title: data.title || '',
                    price: data.price || '',
                    brand: data.brand || '',
                    category: data.category || '',
                    discount: data.discount || '',
                    rating: data.rating || '',
                    stock: data.stock || '',
                    thumbnailUrl: data.thumbnail || ''

                });
                setLoading(true);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    }
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setNewData({ ...newData, thumbnail: file, thumbnailUrl: URL.createObjectURL(file) });
    };

    const handleSave = () => {
        Swal.fire({
            title: "Dəyişiklik Etmək İstədiyindən Əminsən?",
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

    const handleBack = () => {
        navigate('/dashboard/projects')
    }

    const isFormValid = newData.title && newData.price && newData.brand && newData.category && newData.rating && newData.stock && newData.thumbnail;
    const saveData = () => {
        if (!newData.title || !newData.price || !newData.brand || !newData.category || !newData.rating || !newData.stock || !newData.thumbnail) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        
        axios.put(`https://dummyjson.com/products/${id}`, newData)
            .then(response => {
                console.log('Product changed successfully:', response.data);
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

    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])


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



    return (
        <div className='card overflow-y-scroll p-0 w-100 h-100'>
            <div className="card-header">
                Dəyişiklik Et
            </div>
            {loading ?
                <form className=' d-flex justify-content-between flex-column h-100'>

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
                                value={brand.find(product => product.value === newData.id)}
                                className='p-2'
                                options={uniqueBrands}
                                name='brand'
                                onChange={handleBrandSelect}
                            />
                        </div>
                        <div className="form-group" >
                            <label>Category<span className='text-danger'>*</span></label>
                            <Select
                                value={category.find(product => product.value === newData.id)}
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
                          {newData.thumbnailUrl && (
                                <img src={newData.thumbnailUrl} alt='thumbnail' className='m-3 img-thumbnail' style={{ width: '200px', height: 'auto' }} />
                            )}
                        </div>
                    </div>

                    <div className='card-footer d-flex justify-content-between'>
                        <button onClick={handleBack}
                            className='btn btn-outline-danger d-flex align-items-center'>
                            Geri
                        </button>
                        <button disabled={!isFormValid} type='button' onClick={handleSave} className='btn btn-outline-success d-flex align-items-center '>
                            Dəyiş
                        </button>
                    </div>
                </form>
                : null}
        </div>

    )
}

export default DashboardUpdate
