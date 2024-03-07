import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
const DashboardCreate = () => {
    const [newData, setNewData] = useState({
        title: '',
        price: '',
        brand: '',
        category: '',
        discount: '',
        rating: '',
        stock: ''
    })

    const navigate = useNavigate();


    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
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

    const saveData = () => {
        if (!newData.title || !newData.price || !newData.brand || !newData.category || !newData.rating || !newData.stock) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.post('https://dummyjson.com/products', newData)
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


    const handleBack = () => {
        navigate('/dashboard/projects')
    }


    const isFormValid = newData.title && newData.price && newData.brand && newData.category && newData.rating && newData.stock;

    return (
        <div className='card p-0 w-100 h-100'>
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
                    <div className="form-group p-2">
                        <label>Brand<span className='text-danger'>*</span></label>
                        <select className="form-control"
                            name='brand'
                            value={newData.brand}
                            onChange={handleChange}>
                            <option disabled value={""}>Brendi seçin</option>
                            <option>Apple</option>
                            <option>Samsung</option>
                            <option>Microsoft</option>
                            <option>Xiaomi</option>
                            <option>HP</option>
                            <option>Huawei</option>
                        </select>
                    </div>
                    <div className="form-group p-2">
                        <label>Category<span className='text-danger'>*</span></label>
                        <select className="form-control"
                            name='category'
                            value={newData.category}
                            onChange={handleChange}>
                            <option disabled value={''}>Kateqoriyanı seçin</option>
                            <option>smartphones</option>
                            <option>laptops</option>
                            <option>fragrances</option>
                            <option>skincare</option>
                            <option>groceries</option>
                            <option>home-decoration</option>
                        </select>
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
