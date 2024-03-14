import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Select from 'react-select'
const CommentCreate = () => {
    const [newData, setNewData] = useState({
        comments: [
            {
                body: '',
                userId: '',
                postId: ''
            }
        ]
    })
    const [users, setUsers] = useState([]);


    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleUserSelect = (selectedUser) => {
        setNewData({ ...newData, userId: selectedUser.value });
    };

    const handlePostSelect = (selectedPost) => {
        setNewData({...newData, postId: selectedPost.value })
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
        if ( !newData.body || !newData.userId || !newData.postId) {
            alert('Bütün xanaları doldurun!');
            return;
        }


        axios.post('https://dummyjson.com/comments/add', newData)
            .then(response => {
                console.log('Post added successfully:', response.data);
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


    const handleBack = () => {
        navigate('/dashboard/comments')
    }


    const isFormValid = newData.body && newData.userId && newData.postId;

    //UserId GET
    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(response => {
                console.log("Data from API:", response.data);
                if (response.data && response.data.users && Array.isArray(response.data.users)) {
                    const usersData = response.data.users.map(user => ({
                        value: user.id,
                        label: `${user.firstName} ${user.lastName}`
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
        axios.get('https://dummyjson.com/posts')
        .then(response => {
            console.log(response.data);
            if (response.data && response.data.posts && Array.isArray(response.data.posts)) {
                const postsData = response.data.posts.map(post => ({
                    value: post.id,
                    label: post.title
                }));
                setPosts(postsData)
            }
        })
    }, []);


    return (
        <div className='card overflow-y-scroll p-0 w-100 h-100'>
            <div className="card-header">
                Yarat
            </div>
            <form className='d-flex justify-content-between flex-column h-100'>

                <div className='card-body' style={{overflow:"visible"}}>
                    <div className='form-group'>
                        <label>PostId<span className='text-danger'>*</span></label>
                          <Select
                                className='p-2'
                                options={posts}
                                name='postId'
                                onChange={handlePostSelect}
                                placeholder='Select Post'
                            />
                    </div>
                    <div className='form-group p-2'>
                        <label>Body<span className='text-danger'>*</span></label>
                        <input type="text"
                            name='body'
                            value={newData.body}
                            onChange={handleChange}
                            className="form-control" />
                    </div>
                    <div className="form-group" >
                        <label>UserId<span className='text-danger'>*</span></label>
                            <Select
                                className='p-2'
                                options={users}
                                name='userId'
                                onChange={handleUserSelect}
                                placeholder='Select User'
                            />
                    </div>
                </div>
                <div className='card-footer d-flex justify-content-between' >
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

export default CommentCreate
