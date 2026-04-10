import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import LineChart from '../components/linechart'
import BarChart from '../components/barchart'
import PieChart from '../components/piechart'
import HorizontalBarChart from '../components/horizontalbarchart'
import { useState } from 'react'
import axios from 'axios'

function Dashboard() {

const [data, setData] = useState([]);
const [columns, setColumns] = useState([]);
const [tab, settab] = useState('csv')
const [userquery, setuserquery] = useState('')
const [chartoption, setchartoption] = useState('')

const analyseData = ()=>{
  axios.post('http://localhost:5000/data/analysis', {userquery:userquery, charttype:chartoption}).then((res)=>{
     console.log(res.data)

  })
}

useEffect(()=>{
  const handleshowData=()=>{
     axios.get('http://localhost:5000/file/getfile').then((res)=>{
       console.log(res.data)
        setColumns(res.data.columns);
        setData(res.data.data);
     })
  }
  handleshowData()
},[])


  return (
    <>
    <Navbar/>

<div className="p-4">
      {/* Mobile Dropdown (Visible < 640px) */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select a tab</label>
        <select 
          id="tabs" 
          className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        >
          <option onClick={()=>{settab('csv')}}>Input CSV Data</option>
          <option onClick={()=>{settab('analysis')}}>Analysis</option>
        </select>
      </div>

      {/* Desktop Tabs (Visible > 640px) */}
      <ul className="hidden text-sm font-medium text-center text-gray-500 sm:flex -space-x-px border border-gray-500 rounded-lg overflow-hidden mt-5 ml-5 mr-5">
        <li className="w-full">
          <a onClick={()=>{settab('csv')}} className={`inline-block w-full p-4 border-r border-gray-500 hover:text-blue-600 focus:outline-none cursor-pointer ${tab==="csv" ? 'bg-gray-200 text-blue-600' : 'bg-white'}`}>
            Input CSV Data
          </a>
        </li>
        <li className="w-full">
          <a onClick={()=>{settab('analysis')}} className={`inline-block w-full p-4 border-l border-gray-500 hover:text-blue-600 cursor-pointer ${tab==="analysis" ? 'bg-gray-200 text-blue-600' : 'bg-white'}`}>
            Analysis
          </a>
        </li>
      </ul>
    </div>



     {/* Optimized Preview Table */}
      {tab==='csv' && (
        <div className="px-10 pb-20">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 max-h-[400px]">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 shadow-sm">
                <tr>
                  {columns.map((col) => (
                    <th key={col} className="px-6 py-4 whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-blue-50 transition-colors">
                    {columns.map((col) => (
                      <td key={col} className="px-6 py-4 whitespace-nowrap">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 italic text-center">
            Showing {data.length} rows from CSV
          </p>
        </div>
      )}


      {tab==='analysis' && (
        <>
        <div className="px-10 pb-20">
  {/* Main Grid Container */}
  <div className="grid grid-cols-2 gap-6 items-start shadow-md sm:rounded-lg border border-gray-200 p-6 bg-gray-50">
    
    {/* Top Section: Inputs and Full-Width Button */}
    <div className="col-span-2 flex flex-col gap-4 w-full">
      
      {/* Inputs Row */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1">
          <input 
            type="text" 
            value={userquery}
            onChange={(e)=>{setuserquery(e.target.value)}}
            placeholder="Give analysis input to check" 
            className="w-full py-3 px-4 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200" 
          />
        </div>
        <div className="flex-1">
          
<div class="w-full">
  <select id="countries" value={chartoption} onChange={(e) => {
      const selectedValue = e.target.value;
      setchartoption(selectedValue);
      console.log(selectedValue); // This will now log correctly
    }} class="w-full py-3 px-4 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200">
    <option value="" disabled>Choose Chart Option</option>
    <option value="Line">Line</option>
    <option value="Bar">Bar</option>
    <option value="Circle">Circle</option>
  </select>
</div>

        </div>
      </div>

      {/* Full Width Analyse Button */}
      <button onClick={()=>{analyseData()}} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 rounded-lg shadow-md transition-all active:scale-[0.99]">
        Analyse
      </button>
    </div>

    {/* Bottom Left: Chart */}
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 min-h-[300px]">
      <div className="w-full h-full flex items-center justify-center">
        {chartoption==='Bar' && <>
        <BarChart />
        </>}
        {chartoption==='Line' && <>
        <LineChart/>
        </>}
        {chartoption==='Circle' && <>
        <PieChart/>
        </>}
      </div>
    </div>

    {/* Bottom Right: Content */}
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center text-gray-500 text-center">
      <p className="italic">Analysis details will appear here...</p>
    </div>

  </div>
</div>
        </>
        
      )}
    </>
  )
}

export default Dashboard