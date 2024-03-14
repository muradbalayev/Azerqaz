import React from 'react'
import DashboardNav from '../Dashboard/DashboardNav'
import DashboardBody from '../Dashboard/DashboardBody'
import '../Dashboard/Dashboard.scss'


const Dashboard = () => {
  return (
    <div className='container-fluid d-flex justify-content-center nowrap m-auto row p-0 m-0'>
      <DashboardNav />
      <DashboardBody/>
    </div>

  )
}

export default Dashboard
