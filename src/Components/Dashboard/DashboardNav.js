import React from 'react'
import Icon from 'react-icons-kit'
import { home } from 'react-icons-kit/fa/home'
import {users} from 'react-icons-kit/fa/users'
import { book } from 'react-icons-kit/ikons/book'
import logo from "../Img/azerqaz.png";
import { arrow_left } from 'react-icons-kit/ikons/arrow_left'
import { arrow_right } from 'react-icons-kit/ikons/arrow_right'
import {image} from 'react-icons-kit/icomoon/image'
import {message} from 'react-icons-kit/entypo/message'
import {tasklist} from 'react-icons-kit/oct/tasklist'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
const DashboardNav = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [hideParagraphs, setHideParagraphs] = useState(
    localStorage.getItem('hideParagraphs') === 'true' ? true : false
  );
  const [arrow, setArrow] = useState(
    localStorage.getItem('arrow') === 'true' ? true : false
  )
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    localStorage.setItem('hideParagraphs', hideParagraphs.toString());
    localStorage.setItem('arrow', arrow.toString());
  };
  


  return (
    <section className={`dashboard_sidebar m-0 p-0 d-flex flex-column ${hideParagraphs ? 'collapsed' : ''}`}
     onMouseEnter={() => setHideParagraphs(false)} 
     onMouseLeave={() => {
      if (arrow) {
        setHideParagraphs(true);
      }
    }}     >
      {/* {console.log(hideParagraphs)} */}
      <header className=' text-white text-center d-flex justify-content-center align-items-center p-0 m-0'>
        <img src={logo} alt='logo'
          style={{
            maxWidth: "70px",
            minWidth: "45px"
          }}></img>
      </header>
      <nav className='d-flex flex-column justify-content-start align-items-center p-0'>
        <div className='nav-list d-flex flex-column w-100 align-items-center fw-bolder'>
          <NavLink to={"/dashboard/home"} className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
            style={{ borderRadius: "0", flexDirection: "row" }}>
            <Icon className='d-flex' icon={home} size={18}></Icon>
            <p style={{ fontSize: "0.7rem", display: hideParagraphs ? 'none' : 'block' }}
              className='m-0 text-nowrap resp d-none'>Home </p>
          </NavLink>
          <NavLink to={"/dashboard/users"} activeclassname="active" className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
            style={{ borderRadius: "0", flexDirection: "row" }}>
            <Icon className='d-flex' icon={users} size={18}></Icon>
            <p style={{ fontSize: "0.7rem", display: hideParagraphs ? 'none' : 'block' }}
              className='m-0 text-nowrap resp d-none'>Users </p>
          </NavLink>

          <NavLink to={"/dashboard/projects"} activeclassname="active" className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
            style={{ borderRadius: "0", flexDirection: "row" }}>
            <Icon className='d-flex' icon={book} size={18}></Icon>
            <p style={{ fontSize: "0.7rem", display: hideParagraphs ? 'none' : 'block' }}
              className='m-0 text-nowrap resp d-none'>Products</p>
          </NavLink>
          <NavLink to={"/dashboard/posts"} activeclassname="active" className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
            style={{ borderRadius: "0", flexDirection: "row" }}>
            <Icon className='d-flex' icon={image} size={18}></Icon>
            <p style={{ fontSize: "0.7rem", display: hideParagraphs ? 'none' : 'block' }}
              className='m-0 text-nowrap resp d-none'>Posts</p>
          </NavLink>
          <NavLink to={"/dashboard/comments"} activeclassname="active" className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
            style={{ borderRadius: "0", flexDirection: "row" }}>
            <Icon className='d-flex' icon={message} size={18}></Icon>
            <p style={{ fontSize: "0.7rem", display: hideParagraphs ? 'none' : 'block' }}
              className='m-0 text-nowrap resp d-none'>Comments</p>
          </NavLink>
          <NavLink to={"/dashboard/todo"} activeclassname="active" className='nav-link d-flex w-100 border-0 gap-4 flex-nowrap py-3 px-3 text-light justify-content-lg-start justify-content-center align-items-center'
            style={{ borderRadius: "0", flexDirection: "row" }}>
            <Icon className='d-flex' icon={tasklist} size={18}></Icon>
            <p style={{ fontSize: "0.7rem", display: hideParagraphs ? 'none' : 'block' }}
              className='m-0 text-nowrap resp d-none'>To Do List</p>
          </NavLink>


        </div>
      </nav>
      <footer className='d-flex text-white justify-content-start align-items-center p-2'>
        {arrow ?
          <Icon style={{ cursor: "pointer" }}
          className='d-lg-block d-none'
            onClick={() => {
              toggleSidebar();
              setArrow(false)
            }}
            icon={arrow_left}>
          </Icon> :
          <Icon style={{ cursor: "pointer" }}
          className='d-lg-block d-none'
            onClick={() => {
              toggleSidebar();
              setArrow(true)
            }}
            icon={arrow_right}>
          </Icon>}
      </footer>
    </section>
  )
}

export default DashboardNav
