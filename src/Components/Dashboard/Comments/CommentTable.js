import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Icon from 'react-icons-kit';
import { ic_create } from 'react-icons-kit/md/ic_create';
import { trashO } from 'react-icons-kit/fa/trashO';
import { ic_remove_red_eye } from 'react-icons-kit/md/ic_remove_red_eye'
import Swal from 'sweetalert2';
import ReadModal from './Read';
import { Link, useNavigate } from 'react-router-dom';
import { ic_add_box } from 'react-icons-kit/md/ic_add_box';

const CommentTable = () => {
    const [comments, setComments] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [commentId, setCommentId] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Body",
            selector: row => row.body,
            sortable: true
        },
        {
            name: "PostID",
            selector: row => row.postId,
            sortable: true
        },
        {
            name: "UserID",
            selector: row => row.userId,
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
        axios.get('https://dummyjson.com/comments')
            .then(response => {
                console.log("Data from API:", response.data);
                if (response.data && response.data.comments && Array.isArray(response.data.comments)) {
                    const CommentDatas = response.data.comments.map(comment => ({
                        id: comment.id,
                        body: comment.body,
                        postId: comment.postId,
                        userId: comment.user.id
                    }));
                    setComments(CommentDatas);
                    setFilter(CommentDatas);
                    setLoading(true);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    //Modal
    function handleModal(id) {
        setCommentId(id)
        setModalShow(true)
    }

    // Axtaris Filter
    useEffect(() => {
        const result = comments.filter((comment) => {
            return comment.body.toLowerCase().includes(search.toLowerCase());
        });
        setFilter(result);
    }, [comments, search]);

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
                axios.delete(`https://dummyjson.com/comments/${id}`)
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
                        console.error(`Error deleting comment:`, error);
                        Swal.fire({
                            title: "Error!",
                            text: `Error deleting No ${id} comment`,
                            icon: "error"
                        });
                    });
            }
        });
    };

    //Update Navigate
    const handleUpdateClick = (commentId) => {
        setCommentId(commentId);
        navigate(`/dashboard/comments/update/${commentId}`);
    };

    return (
        <div className='card p-0 h-100'>
            <div className="card-header"
                style={{ minHeight: "40px" }}>
                Comments
            </div>
            <div className='card-body p-0 overflow-y-scroll'>
                {
                    Loading ?
                        <DataTable
                            columns={columns}
                            data={filter}
                            pagination
                            highlightOnHover
                            responsive
                            subHeader
                            subHeaderComponent={
                                <div className='d-flex justify-content-end align-items-center gap-3 w-100 mb-1 p-1'>
                                    <input
                                        className='form-control w-50'
                                        placeholder='Search'
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                    />
                                    <Link to={'/dashboard/comments/create'}
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
                id={commentId}
            />
        </div>
    )
}

export default CommentTable
