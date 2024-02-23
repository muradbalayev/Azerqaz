import React from 'react';
import "./Login.scss"
import logo from "../Img/azerqazlogo.jpeg"
import validation from './Validation'
import { useState } from "react"
import Form from '../Form/Form';


function Login() {

  const [values, setValues] = useState({
    name: '',
    password: ''
  });

  const [errors, setError] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(validation(values));
  }

  return (
    <main>
      <div className='container-xxl p-0 row d-flex m-auto w-100 justify-content-center align-items-center'>
        <div className='container_left bg-light col-md-6 h-100 d-flex flex-column justify-content-center align-items-center'>
          <div className='w-100'>
            <div className='logo p-3 d-flex flex-column justify-content-center align-items-center'>
              <img className='w-25' src={logo} alt='logo' ></img>
              <h6 className='ps-3 text-secondary' >DAXIL OL</h6>
            </div>
            <div>
              <Form
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
                errors={errors} />
            </div>
          </div>

        </div>
        <div className='container_right col-md-6 d-none d-md-flex h-100 d-flex text-center justify-content-center align-items-center'>
          <div className='d-flex flex-column text-center justify-content-center text-white'>
            <h1 className='mt-3'>Xoş Gəlmişsiniz</h1>
            <p>Copyright © 2024</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login