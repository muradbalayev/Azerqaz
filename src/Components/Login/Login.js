import React from 'react'
import "./Login.scss"
import logo from "../Img/azerqazlogo.jpeg"

function Login() {
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
<form>
  <div className='form-group p-3 w-75 m-auto'>
  <input type='email' className='form-control mb-3' placeholder='Email'></input>
  <input type='password' className='form-control mb-3' placeholder='Şifrə'></input>
  <button className='btn btn-primary w-100'><i className="fa-solid fa-right-to-bracket me-2"></i>DAXIL OL</button>
  </div>
</form>
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