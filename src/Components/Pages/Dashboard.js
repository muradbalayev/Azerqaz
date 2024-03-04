import React from 'react'
import DashboardSidebar from '../Dashboard/DashboardSidebar'
import DashboardBody from '../Dashboard/DashboardBody'
import '../Dashboard/Dashboard.scss'


const Dashboard = () => {
  return (
    <div className='container-xxl d-flex justify-content-center nowrap m-auto w-100 row p-0 m-0'>
      <DashboardSidebar />
      <DashboardBody/>
    </div>

  )
}

export default Dashboard
