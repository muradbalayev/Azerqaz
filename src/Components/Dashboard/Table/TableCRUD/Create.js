import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
const UserCreate = () => {
    const [newData, setNewData] = useState({
        firstName: '',
        lastName: '',
        age: ''
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
        if (!newData.firstName || !newData.lastName || !newData.age) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.post('https://dummyjson.com/users/add', newData)
            .then(response => {
                console.log('User added successfully:', response.data);
                navigate('/dashboard/users');
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
        navigate('/dashboard/users')
    }


    const isFormValid = newData.firstName && newData.lastName && newData.age;

    return (
        <div className='card overflow-y-scroll p-0 w-100 h-100'>
            <div className="card-header">
                Yarat
            </div>
            <form className=' d-flex justify-content-between flex-column h-100'>

                <div className='card-body'
                    style={{ overflowY: "visible" }}>
                    <div className='form-group p-2'>
                        <label>First Name<span className='text-danger'>*</span></label>
                        <input type="text"
                            name='firstName'
                            value={newData.firstName}
                            onChange={handleChange}
                            className="form-control" />
                    </div>
                    <div className='form-group p-2'>
                        <label>Last Name<span className='text-danger'>*</span></label>
                        <input
                            name='lastName'
                            value={newData.lastName}
                            onChange={handleChange}
                            type="text"
                            className="form-control" />
                    </div>
                    <div className='form-group p-2'>
                        <label>Age<span className='text-danger'>*</span></label>
                        <input
                            name='age'
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
                        Yarat
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserCreate
