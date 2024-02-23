import React from 'react'
import './Form.scss'
function Form(props) {
    const {handleChange, handleSubmit, errors, values} = props
  return (
    <form onSubmit={handleSubmit}>
                <div className='form-group p-3 w-75 m-auto'>
                  <input onChange={handleChange} value={values.name} name='name' type='email' className='form-control ' placeholder='Email' ></input>
                  {errors.name ? <p className='mt-1' style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p> : null}

                  <input onChange={handleChange} value={values.password} name='password' type='password' className='form-control mt-3' placeholder='Şifrə' ></input>
                  {errors.password ? <p className='mt-1' style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p> : null}

                  <button className='btn btn-primary w-100 mt-3'><i className="fa-solid fa-right-to-bracket me-2" type="submit"></i>DAXIL OL</button>
                </div>
              </form>
  )
}

export default Form