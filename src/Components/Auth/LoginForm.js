import React, { useEffect } from 'react';
import './Form.scss';
import { useState } from 'react';
import { basic_eye } from 'react-icons-kit/linea/basic_eye';
import { basic_eye_closed } from 'react-icons-kit/linea/basic_eye_closed';
import { Icon } from 'react-icons-kit';
import logo from "../Img/azerqazlogo.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './Validation';
import axios from 'axios';


function LoginForm() {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const [errors, setError] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()
  const [errorNtf, setErrorNtf] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(Validation(values));

  

    const payload = {
      username: values.username,
      password: values.password
    }

    axios
      .post("https://dummyjson.com/auth/login", payload)
      .then(response => {
        const { token , username } = response.data; 
        localStorage.setItem("token", token);
        console.log(token)
        console.log(response.data);
        console.log(username)
        navigate("/dashboard/home", { state: { user: username } });
      })
      .catch(error => {
        console.error(error);
        setErrorNtf(true)
      });
  }



  const [type, setType] = useState(false)

  return (
    <div className='w-100'>
      <div className='logo p-3 d-flex flex-column justify-content-center align-items-center'>
        <img className='w-25' src={logo} alt='logo' ></img>
        <h6 className='ps-3 text-secondary' >DAXIL OL</h6>
      </div>
      <div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group p-3 w-75 m-auto'>
            <input onChange={(e) => handleChange(e)}
              value={values.username}
              name='username'
              type='text'
              className='form-control'
              placeholder='İstifadəçi adı' ></input>
            {errors.name ? <p className='mt-1' style={{ color: 'red', fontSize: '12px' }}>{errors.username}</p> : null}

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

            <button className='btn btn-primary w-100 mt-3'><i className="fa-solid fa-right-to-bracket me-2" type="submit"></i>DAXIL OL</button>
            <div>
              Qeydiyyatdan keçməmisiniz?  <Link to="/register">Qeydiyyatdan keçin</Link>
            </div>
            {
              errorNtf ? <p style={{ color: "red" }}>Istifadəçi adı və parolu düzgün daxil edin!</p> : null
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm