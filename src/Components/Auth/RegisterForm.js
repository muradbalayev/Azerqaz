import React from 'react'
import './Form.scss'
import { useState } from 'react'
import { basic_eye } from 'react-icons-kit/linea/basic_eye'
import { basic_eye_closed } from 'react-icons-kit/linea/basic_eye_closed'
import Icon from 'react-icons-kit'
import logo from "../Img/azerqazlogo.jpeg"
import { Link } from 'react-router-dom'
import Validation from './Validation'
import axios from 'axios'


function RegisterForm() {

  const [values, setValues] = useState({
    name: '', 
    password: ''
  });

  const [errors, setError] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(Validation(values));



const payload = {
    email: values.name,
    password: values.password,
    memberAgreementVersion: "v1"
}

    try {
         await axios.post('https://api.getpostman.com/collections',payload)
        } catch (error) {
return error
    }

  }

  const [type, setType] = useState(false)

  return (
    <div className='w-100'>
    <div className='logo p-3 d-flex flex-column justify-content-center align-items-center'>
      <img className='w-25' src={logo} alt='logo' ></img>
      <h6 className='ps-3 text-secondary' >QEYDIYYATDAN KEÇ</h6>
    </div>
    <div>

    <form onSubmit={(e)=>handleSubmit(e)}>
      <div className='form-group p-3 w-75 m-auto'>
        <input onChange={handleChange}
         value={values.name}
          name='name'
           type='email'
            className='form-control'
             placeholder='Email' ></input>
        {errors.name ? <p className='mt-1' style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p> : null}
       
<div className='position-relative d-flex mt-3 align-items-center'>
        <input
         onChange={handleChange}
          value={values.password}
           name='password'
            type={type ? "text" : "password"}
             className='form-control'
              placeholder='Şifrə' >
        </input>
          
          <span className='icon-span position-absolute' style={{ right: "10px", cursor: "pointer" }} onClick={() => setType(!type)}>
            {type ? <Icon icon={basic_eye} size={20} /> : <Icon icon={basic_eye_closed} size={20} />}
          </span>
</div>
    

        {errors.password ? <p className='mt-1' style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p> : null}

        <button className='btn btn-primary w-100 mt-3'><i className="fa-solid fa-right-to-bracket me-2" type="submit"></i>QEYDIYYATDAN KEÇ</button>
        <div>
          Qeydiyyatdan keçmisiniz?  <Link style={{textDecoration: "none" }} to="/">Daxil olun</Link>
        </div>
      </div>
    </form>
    </div>
    </div>
  )
}

export default RegisterForm