import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
const PostUpdate = () => {

    const { postId } = useParams();

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
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://dummyjson.com/posts/${postId}`)
            .then(response => {
                const data = response.data;
                setNewData({
                                title: data.title || '',
                                body: data.body || '',
                                userId: data.userId || '',
                                reactions: data.reactions || ''
                });
                setLoading(true);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [postId]);

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
        navigate('/dashboard/posts')
    }

    const saveData = () => {
        if (!newData.title || !newData.body || !newData.userId || !newData.reactions) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.put(`https://dummyjson.com/posts/${postId}`, newData)
            .then(response => {
                console.log('Product changed successfully:', response.data);
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


    const isFormValid = newData.title && newData.body && newData.userId && newData.reactions;

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
                            <label>Title<span className='text-danger'>*</span></label>
                            <input type="text"
                                name='title'
                                value={newData.title}
                                onChange={handleChange}
                                className="form-control" />
                        </div>
                        <div className='form-group p-2'>
                            <label>Body<span className='text-danger'>*</span></label>
                            <input
                                name='body'
                                value={newData.body}
                                onChange={handleChange}
                                type="text"
                                className="form-control" />
                        </div>
                        <div className="form-group p-2">
                        <label>UserId<span className='text-danger'>*</span></label>
                        <select className="form-control"
                            name='brand'
                            value={newData.userId}
                            onChange={handleChange}>
                            <option disabled value={""}>UserId</option>
                            <option>{newData.userId}</option>
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
                            Dəyiş
                        </button>
                    </div>
                </form>
                : null}
        </div>

    )
}

export default PostUpdate
