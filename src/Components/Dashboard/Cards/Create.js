import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
const PostCreate = () => {
    const [newData, setNewData] = useState({
        posts: [
            {
                title: '',
                body: '',
                userId: '',
                reactions: ''
            }
        ]
    })
    const [users, setUsers] = useState([]);


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
        if (!newData.title || !newData.body || !newData.userId || !newData.reactions) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.post('https://dummyjson.com/posts/add', newData)
            .then(response => {
                console.log('Post added successfully:', response.data);
                navigate('/dashboard/posts');
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
        navigate('/dashboard/posts')
    }


    const isFormValid = newData.title && newData.body && newData.userId && newData.reactions;

    //UserId GET
    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(response => {
                console.log("Data from API:", response.data);
                if (response.data && response.data.users && Array.isArray(response.data.users)) {
                    const usersData = response.data.users.map(user => ({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    }));
                    setUsers(usersData);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);



    return (
        <div className='card p-0 w-100 h-100'>
            <div className="card-header">
                Yarat
            </div>
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
                    <div className='form-group p-2'>
                        <label>Body<span className='text-danger'>*</span></label>
                        <textarea
                            name='body'
                            value={newData.body}
                            onChange={handleChange}
                            type="text"
                            className="form-control" />
                    </div>
                    <div className="form-group p-2">
                        <label>UserId<span className='text-danger'>*</span></label>
                        <select className="form-control"
                            name='userId'
                            onChange={handleChange}>
                                <option disabled selected>Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group p-2'>
                        <label>Reactions<span className='text-danger'>*</span></label>
                        <input
                            name='reactions'
                            value={newData.reactions}
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

export default PostCreate
