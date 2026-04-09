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

    <div class="relative h-100 w-full bg-[url('https://img.freepik.com/free-photo/office-supplies-table_1098-3457.jpg?semt=ais_incoming&w=740&q=80')] bg-cover bg-center flex items-center justify-center">
  <div class="absolute inset-0 bg-black/60"></div>
  <div class="relative w-full max-w-md px-4">
    <input type="text" placeholder="Search..." class="w-full py-3 px-4 rounded-lg bg-white shadow-lg focus:outline-none" />
    <button class="absolute right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded">Analyse</button>
  </div>
</div>

    {/* <div class="m-5 flex">
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
    </div> */}
    </>
  )
}

export default Dashboard