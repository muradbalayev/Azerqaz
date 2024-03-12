import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Icon from 'react-icons-kit';
import { ic_create } from 'react-icons-kit/md/ic_create';
import { trashO } from 'react-icons-kit/fa/trashO';
import { ic_remove_red_eye } from 'react-icons-kit/md/ic_remove_red_eye'
import Swal from 'sweetalert2';
import ReadModal from './Read';
import {  Link, useNavigate } from 'react-router-dom';
import { ic_add_box } from 'react-icons-kit/md/ic_add_box';

const PostsTable = () => {
    const [posts, setPosts] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [postId, setPostId] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Title",
            selector: row => row.title,
            sortable: true
        },
        {
            name: "Reactions",
            selector: row => row.reactions,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className='d-flex justify-content-center align-items-center gap-2'>
                    <button onClick={() => handleUpdateClick(row.id)}
                        className='btn btn-success'>
                        <Icon className='d-flex' icon={ic_create} />
                    </button>
                    <button onClick={() => handleDelete(row.id)}
                        className='btn btn-danger'>
                        <Icon className='d-flex' icon={trashO} />
                    </button>
                    <button className='btn btn-primary'
                        onClick={() => handleModal(row.id)}>
                        <Icon className='d-flex' icon={ic_remove_red_eye} />
                    </button>
                </div>
            )
        }
    ]

    // Fetch data
    useEffect(() => {
        axios.get('https://dummyjson.com/posts')
            .then(response => {
                console.log("Data from API:", response.data);
                if (response.data && response.data.posts && Array.isArray(response.data.posts)) {
                    const PostsDatas = response.data.posts.map(post => ({
                        id: post.id,
                        title: post.title,
                        reactions: post.reactions,
                    }));
                    setPosts(PostsDatas);
                    setFilter(PostsDatas);
                    setLoading(true);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    //Modal
    function handleModal(id) {
        setPostId(id)
        setModalShow(true)
    }

    // Axtaris Filter
    useEffect(() => {
        const result = posts.filter((post) => {
            return post.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilter(result);
    }, [posts, search]);

    // DELETE METHOD
    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Əminsiniz?",
            text: "Dəyişikliyi geri qaytara bilməyəcəksiniz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli, silin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://dummyjson.com/posts/${id}`)
                    .then(response => {
                        console.log('Məhsul Silindi!');
                        Swal.fire({
                            title: "Silindi!",
                            text: `Məhsul No:${id} müvəffəqiyyətlə silindi!`,
                            icon: "success"
                        }).then((result2) => {
                            if (result.isConfirmed) {
                                window.location.reload()
                            }
                        });
                    })
                    .catch(error => {
                        console.error(`Error deleting product:`, error);
                        Swal.fire({
                            title: "Error!",
                            text: `Error deleting No ${id} product`,
                            icon: "error"
                        });
                    });
            }
        });
    };

    //Update Navigate
    const handleUpdateClick = (postId) => {
        setPostId(postId);
        navigate(`/dashboard/posts/update/${postId}`);
    };

    return (
        <div className='card p-0 h-100'>
            <div className="card-header"
                style={{ minHeight: "40px" }}>
                Table
            </div>
            <div className='card-body overflow-y-scroll'>
                {
                    Loading ?
                        <DataTable
                            columns={columns}
                            data={filter}
                            // selectableRow
                            pagination
                            highlightOnHover
                            responsive
                            subHeader
                            subHeaderComponent={
                                <div className='d-flex justify-content-end align-items-center gap-3 w-100 mb-1 p-1'>
                                <input
                                    className='form-control w-25'
                                    placeholder='Search'
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                <Link to={'/dashboard/posts/create'}
                                className='d-flex align-items-center'
                                style={{ borderRadius: '25%' }}>
                                <Icon icon={ic_add_box} size={40}></Icon>
                              </Link>
                                </div>
                            }
                        >
                        </DataTable> : null
                }
            </div>
            <ReadModal
                show={modalShow}
                onHide={() => { setModalShow(false); }}
                id={postId}
            />
        </div>
    )
}

export default PostsTable
