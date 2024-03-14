import "./AuthLayout.scss"



function AuthLayout({children}) {


  return (
    <main>
      <div className='container bg-light p-0 row d-flex m-auto w-100 justify-content-center align-items-center'>
        <div className='container_left p-0 col-md-6 h-100 d-flex flex-column justify-content-center align-items-center'>
             {children}
        </div>
        <div className='container_right col-lg-6 p-0 d-none d-lg-flex h-100 text-center justify-content-center align-items-center'>
          <div className='child w-100 d-flex text-center justify-content-center h-100 align-items-center'>
            <div className='d-flex flex-column text-center justify-content-center text-white'>
              <h1 className='mt-3'>Xoş Gəlmişsiniz</h1>
              <p>Copyright © 2024</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default AuthLayout