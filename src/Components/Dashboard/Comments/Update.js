import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import Select from 'react-select'

const CommentUpdate = () => {

    const { commentId } = useParams();

    const [newData, setNewData] = useState({
        comments: [
            {
                body: '',
                userId: '',
                postId: ''
            }
        ]
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://dummyjson.com/comments/${commentId}`)
            .then(response => {
                const data = response.data;
                setNewData({
                    body: data.body || '',
                    userId: data.user.id || '',
                    postId: data.postId || ''
                });
                setLoading(true);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [commentId]);

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
        navigate('/dashboard/comments')
    }

    const saveData = () => {
        if (!newData.body || !newData.userId || !newData.postId) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.put(`https://dummyjson.com/comments/${commentId}`, newData)
            .then(response => {
                console.log('Product changed successfully:', response.data);
                navigate('/dashboard/comments');
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


    const isFormValid = newData.body && newData.userId && newData.postId;


    //UserId GET
    const [users, setUsers] = useState([]);

    const handleUserSelect = (selectedUser) => {
        setNewData({ ...newData, userId: selectedUser.value });
    };

    const handlePostSelect = (selectedPost) => {
        setNewData({ ...newData, postId: selectedPost.value })
    }

    useEffect(() => {
        axios.get('https://dummyjson.com/comments?limit=0')
            .then(response => {
                console.log("Data from API:", response.data);
                if (response.data && response.data.comments  && Array.isArray(response.data.comments)) {
                    const usersData = response.data.comments.map(comment => ({
                        value: comment.user.id,
                        label: `${comment.id}: ${comment.user.username}`
                    }));
                    setUsers(usersData);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [posts, setPosts] = useState([])
    // GET PostID
    useEffect(() => {
        axios.get('https://dummyjson.com/posts?limit=0')
            .then(response => {
                console.log(response.data);
                if (response.data && response.data.posts && Array.isArray(response.data.posts)) {
                    const postsData = response.data.posts.map(post => ({
                        value: post.id,
                        label: `${post.id}: ${post.title}`
                    }));
                    setPosts(postsData)
                }
            })
    }, []);

    return (
        <div className='card overflow-hidden overflow-y-scroll overflow p-0 w-100 h-100'>
            <div className="card-header">
                Dəyişiklik Et
            </div>
            {loading ?
                <form className=' d-flex justify-content-between flex-column h-100'>

                    <div className='card-body'
                        style={{ overflowY: "visible" }}>
                        <div className='form-group'>
                            <label>PostId<span className='text-danger'>*</span></label>
                            <Select
                                className='p-2'
                                value={posts.find(post => post.value === newData.postId)}
                                options={posts}
                                name='postId'
                                onChange={handlePostSelect}
                                placeholder='Select Post'
                            />
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
                        <div className="form-group" >
                            <label>UserId<span className='text-danger'>*</span></label>
                            <Select
                                className='p-2'
                                options={users}
                                value={users.find(user => user.value === newData.userId)}
                                name='userId'
                                onChange={handleUserSelect}
                                placeholder='Select User'
                            />
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

export default CommentUpdate
