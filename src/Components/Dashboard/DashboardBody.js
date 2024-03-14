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
import UsersTable from './Table/Table';
import UserCreate from './Table/TableCRUD/Create';
import UserUpdate from './Table/TableCRUD/Update';
import PostsTable from './Posts/PostTable';
import PostCreate from './Posts/Create';
import PostUpdate from './Posts/Update';
import CommentTable from './Comments/CommentTable';
import CommentCreate from './Comments/Create';
import CommentUpdate from './Comments/Update';

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
    <section className='section-body m-0 p-0 d-flex flex-column '>

      <header className=' w-100  h-auto p-0 row d-flex m-auto justify-content-center align-items-center flex-nowrap'>

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
        <div className='w-100 p-3 bg-light row d-flex m-auto h-100 flex-nowrap align-items-start'>
          <Routes>
            <Route path='home' element={<DashboardMain />} />
            <Route path='projects' element={<DashboardProjects />} />
            <Route path='projects/create' element={<DashboardCreate />} />
            <Route path='projects/update/:id' element={<DashboardUpdate />} />

            <Route path='users' element={<UsersTable />} />
            <Route path='users/create' element={<UserCreate />} />
            <Route path='users/update/:userid' element={<UserUpdate />} />

            <Route path='posts' element={<PostsTable />} />
            <Route path='posts/create' element={<PostCreate />} />
            <Route path='posts/update/:postId' element={<PostUpdate />} />

            <Route path='comments' element={<CommentTable/>} />
            <Route path='comments/create' element={<CommentCreate/>} />
            <Route path='comments/update/:commentId' element={<CommentUpdate />} />


          </Routes>
        </div>
      </main>
      <footer className='w-100 p-0'>

        <div className='footer h-100 d-flex justify-content-end align-items-center text-center'>
          <p className='px-3 m-0'>Powered by <span className='text-decoration-underline text-primary'>Murad Balazade</span></p>
        </div>
      </footer>
    </section>
  )
}

export default DashboardBody