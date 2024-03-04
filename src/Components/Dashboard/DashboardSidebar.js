import React from 'react'
import Icon from 'react-icons-kit'
import { home } from 'react-icons-kit/fa/home'
import { ic_settings } from 'react-icons-kit/md/ic_settings'
import { book } from 'react-icons-kit/ikons/book'
import logo from "../Img/azerqaz.png";
import { arrow_left } from 'react-icons-kit/ikons/arrow_left'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
const DashboardSidebar = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [hideParagraphs, setHideParagraphs] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setHideParagraphs(!hideParagraphs);
  };
 
  
  return (
    <section className={`dashboard_sidebar m-0 p-0 d-flex flex-column ${collapsed ? 'collapsed' : ''}` }>
    <header className=' text-white text-center d-flex justify-content-center align-items-center p-0 m-0'>
          <img src={logo} alt='logo'
          style={{maxWidth:"70px",
          minWidth:"45px"}}></img>
        </header>
        <nav className='d-flex flex-column justify-content-start align-items-center p-0'>
            <div className='nav-list d-flex flex-column w-100 align-items-center'>
            <Link to={"/dashboard"} className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
                style={{ borderRadius: "0", flexDirection: "row" }}>
                <Icon className='d-flex' icon={home} size={18}></Icon>
                <p style={{ fontSize: "0.8rem", display: hideParagraphs ? 'none' : 'block' }}
                  className='m-0 text-nowrap resp d-none'>Ana Sehife </p>
              </Link>
              <div className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
                style={{ borderRadius: "0", flexDirection: "row" }}>
                <Icon className='d-flex' icon={ic_settings} size={18}></Icon>
                <p style={{ fontSize: "0.8rem", display: hideParagraphs ? 'none' : 'block' }}
                  className='m-0 text-nowrap resp d-none'>Tənzimləmələr </p>
              </div>
              
              <Link to={"/dashboard/projects"} className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
                style={{ borderRadius: "0", flexDirection: "row" }}> 
                <Icon className='d-flex' icon={book} size={18}></Icon>
                <p style={{ fontSize: "0.8rem", display: hideParagraphs ? 'none' : 'block' }}
                  className='m-0 text-nowrap resp d-none'>Layihələr</p>
                  </Link>
           
              
            </div>
          </nav>
          <footer className='d-flex text-white justify-content-end align-items-center p-2'>
          <Icon style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
           icon={arrow_left}>
           </Icon>
        </footer>
    </section>
  )
}

export default DashboardSidebar
