import React from 'react'
import Navbar from '../components/navbar'
import LineChart from '../components/linechart'
import BarChart from '../components/barchart'
import PieChart from '../components/piechart'
import HorizontalBarChart from '../components/horizontalbarchart'

function Dashboard() {
  return (
    <>
    <Navbar/>
    <div class="m-5 flex">
      <div style={{width: '500px', height: '300px'}}>
      <LineChart/>
      </div>
      <div style={{width: '500px', height: '300px'}}>
      <BarChart/>
      </div>
      <div style={{width: '500px', height: '300px'}}>
      <PieChart/>
      </div>
    </div>
    <div class="m-5">
      <HorizontalBarChart/>
    </div>
    </>
  )
}

export default Dashboard