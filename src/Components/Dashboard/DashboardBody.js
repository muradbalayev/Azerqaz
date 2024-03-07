import React from 'react'
import Icon from 'react-icons-kit'
import { user_circle } from 'react-icons-kit/ikons/user_circle'
import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import DashboardMain from './DashboardMain';
import DashboardProjects from './DashboardProjects';
import DashboardCreate from './CRUD/Create';
import DashboardUpdate from './CRUD/Update';
import Table from './Table/Table';
import TableUpdate from './Table/TableCRUD/Update';

function DashboardBody() {
    const [profile, setProfile] = useState(false)
    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfile(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
  



  return (
    <section className='section-body m-0 p-0 d-flex flex-column col-10 '>

      <header className=' container-xxl  h-auto p-0 row d-flex m-auto justify-content-center align-items-center flex-nowrap'>
   
        <div className='header px-3 d-flex align-items-center justify-content-end'>
          <Icon
            onClick={() => setProfile(!profile)}
            className='icon dropdown-toggle'
            style={{ cursor: 'pointer' }}
            icon={user_circle} size={24}>
          </Icon>
          {profile ?
            <div 
            className='card position-absolute '
            ref={dropdownRef} 
            style={{ right: "20px", top: "50px", zIndex: "5" }}>
              <div className='card-body p-0 d-flex flex-column text-center'
                style={{ minWidth: "100px", height: "auto" }}>
                <div className='p-2 w-100 border-bottom'>
                  <Link className='text-decoration-none w-100 text-danger link' to={"/"}>Logout</Link>
                </div>
                <div className='p-2 w-100 border-bottom'>
                  <Link className='text-decoration-none w-100 text-danger link' to={"/"}>Parameters</Link>
                </div>

              </div>
            </div>
            : null}
        </div>
      </header>
      <main className='w-100'
      style={{ height: "85vh" }}>
        <div className='container-xxl p-3 bg-light row d-flex m-auto h-100 flex-nowrap align-items-start'>
        <Routes>
            <Route path='/' element={<DashboardMain />} />
            <Route path='projects' element={<DashboardProjects />} />
          <Route path='projects/create' element={<DashboardCreate/>} />
          <Route path='projects/update/:id' element={<DashboardUpdate/>} />
          <Route path='table' element={<Table/>} />
          <Route path='table/update/:userid' element={<TableUpdate/>} />
          </Routes>
        </div>
      </main>
      <footer className='w-100 container-xxl p-0'>

        <div className='footer h-100 d-flex justify-content-end align-items-center text-center'>
          <p className='px-3 m-0'>Powered by <span className='text-decoration-underline text-primary'>Murad Balazade</span></p>
        </div>
      </footer>
    </section>
  )
}

export default DashboardBody