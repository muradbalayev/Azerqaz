import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
const TableUpdate = () => {

    const { userid } = useParams();

    const [newData, setNewData] = useState({
        firstName: '',
        lastName: '',
        age: ''
   
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://dummyjson.com/users/${userid}`)
            .then(response => {
                const data = response.data;
                setNewData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    age: data.age || ''
                });
                setLoading(true);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [userid]);

    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    }

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
        navigate('/dashboard/table')
    }

    const saveData = () => {
        if (!newData.firstName || !newData.lastName || !newData.age) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.put(`https://dummyjson.com/users/${userid}`, newData)
            .then(response => {
                console.log('Product changed successfully:', response.data);
                navigate('/dashboard/table');
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


    const isFormValid = newData.firstName && newData.lastName && newData.age;

    return (
        <div className='card p-0 w-100 h-100'>
            <div className="card-header">
                Dəyişiklik Et
            </div>
            {loading ?
                <form className=' d-flex justify-content-between flex-column h-100'>

                    <div className='card-body'
                        style={{ overflowY: "visible" }}>
                        <div className='form-group p-2'>
                            <label>First Name<span className='text-danger'>*</span></label>
                            <input type="text"
                                name='First Name'
                                value={newData.firstName}
                                onChange={handleChange}
                                className="form-control" />
                        </div>
                        <div className='form-group p-2'>
                            <label>Last Name<span className='text-danger'>*</span></label>
                            <input
                                name='Last Name'
                                value={newData.lastName}
                                onChange={handleChange}
                                type="text"
                                className="form-control" />
                        </div>
                        <div className='form-group p-2'>
                            <label>Age<span className='text-danger'>*</span></label>
                            <input
                                name='Age'
                                value={newData.age}
                                onChange={handleChange}
                                type="number"
                                className="form-control" />
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

export default TableUpdate
