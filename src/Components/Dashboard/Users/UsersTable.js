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

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [userid, setUserid] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "First Name",
            selector: row => row.firstName,
            sortable: true
        },
        {
            name: "Last Name",
            selector: row => row.lastName,
            sortable: true
        },
        {
            name: "Age",
            selector: row => row.age,
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
        axios.get('https://dummyjson.com/users')
            .then(response => {
                console.log("Data from API:", response.data);
                if (response.data && response.data.users && Array.isArray(response.data.users)) {
                    const UsersDatas = response.data.users.map(user => ({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age
                    }));
                    setUsers(UsersDatas);
                    setFilter(UsersDatas);
                    setLoading(true);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    //Modal
    function handleModal(id) {
        setUserid(id)
        setModalShow(true)
    }

    // Axtaris Filter
    useEffect(() => {
        const result = users.filter((user) => {
            return user.firstName.toLowerCase().includes(search.toLowerCase());
        });
        setFilter(result);
    }, [users, search]);

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
                axios.delete(`https://dummyjson.com/users/${id}`)
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
    const handleUpdateClick = (userid) => {
        setUserid(userid);
        navigate(`/dashboard/users/update/${userid}`);
    };

    return (
        <div className='card p-0 h-100'>
            <div className="card-header"
                style={{ minHeight: "40px" }}>
                Users
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
                                <Link to={'/dashboard/users/create'}
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
                id={userid}
            />
        </div>
    )
}

export default UsersTable
