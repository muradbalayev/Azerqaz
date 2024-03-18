import React, { useEffect, useState } from 'react'
import Icon from 'react-icons-kit'
import { checkboxChecked } from 'react-icons-kit/icomoon/checkboxChecked'
import { trashO } from 'react-icons-kit/fa/trashO';
import { ic_add_box } from 'react-icons-kit/md/ic_add_box';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from 'react-bootstrap';

const ToDoList = () => {
    const [todos, setTodos] = useState([])
    const [limit, setLimit] = useState(10);
    const [newTodoText, setNewTodoText] = useState('');
    const [toast, setToast] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [skip, setSkip] = useState(0)


    useEffect(() => {
        const fetchTodos = () => {
            axios.get(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`)
                .then(response => {
                    console.log(response.data)
                    setTodos(prevTodos => {
                        const newTodos = skip === 0 ? response.data.todos : [...prevTodos, ...response.data.todos];
                        return newTodos;
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
    
        fetchTodos();
    }, [limit, skip]);
    

    const handleDelete = (id) => {
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
                axios.delete(`https://dummyjson.com/todos/${id}`)
                    .then(response => {
                        console.log('Məhsul Silindi!');
                        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                        Swal.fire({
                            title: "Silindi!",
                            text: `No${id} Müvəffəqiyyətlə silindi!`,
                            icon: "success"
                        })
                    })
                    .catch(error => {
                        console.error(`Error deleting comment:`, error);
                        Swal.fire({
                            title: "Error!",
                            text: `Error deleting No ${id}`,
                            icon: "error"
                        });
                    });
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTodoText.trim() !== '') {
            axios.post('https://dummyjson.com/todos/add', {
                todo: newTodoText,
                completed: false,
                userId: 2
            })
                .then(response => {
                    console.log('Todo added:', response.data);
                    setNewTodoText('');
                    setTodos(prevTodos => [response.data, ...prevTodos]);
                    setToast(response.data);
                    setShowToast(true);
                })
                .catch(error => {
                    console.error('Error adding todo:', error);
                });
        } else {
            Swal.fire({
                title: "Warning",
                text: "Fill Input",
                icon: "warning",
                confirmButtonText: "Tamam"
            });
        }
    };


    const handleToggleComplete = (id, completed) => {
        axios.put(`https://dummyjson.com/todos/${id}`, { completed: !completed })
            .then(response => {
                console.log(response.data);
                setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
            })
            .catch(error => {
                console.error('Error updating todo:', error);
            });
    };

    const handleShowMore = () => {
        setSkip(prevSkip => prevSkip + limit);
    };


    const handleShowLess = () => {
        setLimit(prevLimit => Math.max(prevLimit - 10, 10));
        setSkip(prevSkip => Math.max(prevSkip - 10, 0));
    };

    const handleInputChange = (event) => {
        setNewTodoText(event.target.value);
    };


    return (
        <div className='w-100 h-100 p-0 m-0'>

            <Toast
                style={{ zIndex: "5" }}
                show={showToast}
                onClose={() => setShowToast(false)}
                className="position-absolute top-0 end-0 m-4"
                autohide
                delay={2000}>
                <Toast.Header closeButton={false} className='bg-success'>
                    <strong className="me-auto text-white">Added Successfully!</strong>
                </Toast.Header>
                <Toast.Body>{toast ? toast.todo : ''}</Toast.Body>
            </Toast>
            {todos.length > 0 && (
                <div className='card p-0 h-100 overflow-hidden'>
                    <div className="card-header"
                        style={{ minHeight: "40px" }}>
                        To Do List
                    </div>
                    <div className='card-body p-2 pt-3 bg-light d-flex flex-column align-items-center w-100 overflow-y-scroll overflow-x-hidden'>
                        <div className='title w-100 d-flex justify-content-center align-items-center gap-2 m-1 text-center'>
                            <Icon icon={checkboxChecked}
                                size={25}
                                className='text-dark' />
                            <h3 className='m-0 text-dark'>To Do List</h3>
                        </div>
                        <form onSubmit={handleSubmit} className='py-2 pb-4 px-3 w-100 position-relative d-flex align-items-center border-bottom'>
                            <input value={newTodoText}
                                onChange={handleInputChange}
                                className='form-control p-3 '
                                placeholder='Add New' />
                            <button type='submit'
                                className='position-absolute right border-0 btn btn-secondary p-1'
                                style={{ right: "30px" }}>
                                <Icon icon={ic_add_box} size={27} />
                            </button>
                        </form>
                        <div className='list w-100 p-2 m-2 mt-4 border rounded-3 '>
    {Array.isArray(todos) && todos.map((todo, key) => (
                                <ul key={key} className="list-group list-group-horizontal bg-transparent p-2 hover">
                                    <li className="list-group-item d-flex align-items-center rounded-0 border-0 bg-transparent">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input" type="checkbox" style={{ width: "20px", height: "20px" }}
                                                checked={todo.completed}
                                                onChange={() => handleToggleComplete(todo.id, todo.completed)} />
                                        </div>
                                    </li>
                                    <li
                                        className="list-group-item d-flex text-center align-items-center flex-grow-1 border-0 bg-transparent">
                                        <p className='m-0'>{todo.todo}</p>
                                    </li>
                                    <li className="list-group-item rounded-0 border-0 m-auto bg-transparent">
                                        <Icon onClick={() => handleDelete(todo.id)}
                                            className='btn btn-danger' icon={trashO} />
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div className='d-flex w-100 justify-content-center align-items-center gap-2 mt-1'>
                            {todos.length > 10 && (
                                <button onClick={handleShowLess} className='btn bg-danger p-2 fw text-white' style={{ fontSize: "0.8rem" }}>
                                    <i className='fas fa-angle-up'></i>
                                </button>
                            )}
                            <button onClick={handleShowMore} className='btn bg-success p-2 text-white text-center' style={{ fontSize: "0.8rem" }}>
                                <i className='fas fa-angle-down'></i></button>
                        </div>
                    </div>
                </div>)
            }
        </div >

    )
}

export default ToDoList
