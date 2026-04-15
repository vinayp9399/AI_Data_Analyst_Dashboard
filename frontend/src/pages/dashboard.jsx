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
const [aidataAvailable, setaidataAvailable] = useState(false)

const [values, setvalues] = useState([])
const [labels, setlabels] = useState([])
const [specificanalysis, setspecificanalysis] = useState({})
const [valueDescription, setvalueDescription] = useState('')
const [title, settitle] = useState('')
const [overallanalysis, setoverallanalysis] = useState('')
const [isloading, setisloading] = useState(false)



const analyseData = ()=>{
  setisloading(true)
  setaidataAvailable(false)
  axios.post('http://localhost:5000/data/analysis', {userquery:userquery, charttype:chartoption}).then((res)=>{
     console.log(res.data)
     setvalues(res.data.analysis.values)
     setlabels(res.data.analysis.labels)
     setvalueDescription(res.data.analysis.valueDescription)
     settitle(res.data.analysis.title)
     setoverallanalysis(res.data.analysis.overallanalysis)
     setspecificanalysis(res.data.analysis.specificanalysis)
     setaidataAvailable(true)
       setisloading(false)
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
<div className='flex'>
<aside className="hidden sm:flex flex-col w-64 h-[88vh] bg-gray-50 border-r border-gray-300">
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
  </div>

  <nav className="flex-1 px-4 space-y-2">
    {/* Tab: CSV Input */}
    <button
      onClick={() => settab('csv')}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors 
        ${tab === 'csv' 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-700 hover:bg-gray-200'}`}
    >
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Input CSV Data
    </button>

    {/* Tab: Analysis */}
    <button
      onClick={() => settab('analysis')}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors 
        ${tab === 'analysis' 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-700 hover:bg-gray-200'}`}
    >
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Analysis
    </button>
  </nav>

  {/* Optional Footer Section */}
  <div className="p-4 border-t border-gray-200">
    <div className="flex items-center text-xs text-gray-500">
      AI Analysis
    </div>
  </div>
</aside>



     {/* Optimized Preview Table */}
      {tab==='csv' && (
        <div className="px-10 pt-10 w-full">
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
        <div className="w-full overflow-y-auto h-[88vh]">
  {/* Main Grid Container */}
  <div className="grid grid-cols-5 gap-6 items-start border border-gray-200 p-6 bg-gray-50">
    
    {/* Top Section: Inputs and Full-Width Button */}
    <div className="col-span-5 flex flex-col gap-4 w-full">
      
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
    <option value="Circle">Pie</option>
  </select>
</div>

        </div>
      </div>

      {/* Full Width Analyse Button */}
      <button onClick={()=>{analyseData()}} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 rounded-lg shadow-md transition-all active:scale-[0.99]">
        Analyse
      </button>
    </div>

    {isloading===true && aidataAvailable===false && <>
    <div class="col-span-5 w-full mx-auto shadow-sm border border-gray-100 rounded p-4">
  <div class="flex animate-pulse space-x-4">
    <div class="flex-2 size-80 bg-gray-300"></div>
    <div><div class='flex gap-2'>
    <div class="flex-1 space-y-6 py-1">
      <div class="flex-2 size-40 bg-gray-300"></div>
    </div>
    <div class="flex-1 space-y-6 py-1 h-30">
     <div class="flex-2 size-40 bg-gray-300"></div>
    </div>
    <div class="flex-1 space-y-6 py-1 h-30">
      <div class="flex-2 size-40 bg-gray-300"></div>
    </div>
    </div>
    <div class='mt-2'>
      <div class='flex-1 space-y-2 py-1'>
     <div class="h-3 rounded bg-gray-300"></div>
      <div class="h-3 rounded bg-gray-300"></div>
      <div class="h-3 rounded bg-gray-300"></div>
      <div class="h-3 rounded bg-gray-300"></div>
      <div class="h-3 rounded bg-gray-300"></div>
      <div class="h-3 rounded bg-gray-300"></div>
      <div class="h-3 rounded bg-gray-300"></div>
      </div>
    </div>
    </div>
    </div>
  
</div>
    </>}

    {aidataAvailable===false && isloading===false && <>
    <div className="col-span-5 w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center text-gray-500 text-center">
      <p className="italic">Analysis details will appear here...</p>
    </div>
    </>}
    
    
    {aidataAvailable===true && isloading===false && <>

    
    {/* Bottom Left: Chart */}
    <div className="col-span-2 row-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100 min-h-[100px]">
      <div className="w-full h-full flex items-center justify-center">
        {chartoption==='Bar' && <>
        <div className='w-full'>
        <BarChart labels={labels} values={values} valueDescription={valueDescription} title={title}/>
        </div>
        </>}
        {chartoption==='Line' && <>
        <div className='w-full'>
        <LineChart labels={labels} values={values} valueDescription={valueDescription} title={title}/>
        </div>
        </>}
        {chartoption==='Circle' && <>
        <div className='w-full'>
        <PieChart labels={labels} values={values} valueDescription={valueDescription} title={title}/>
        </div>
        </>}
      </div>
    </div>

    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="w-full min-h-[50px] flex flex-col items-center justify-center gap-2">
        <p className='text-[35px] text-green-500 font-bold'>{specificanalysis.analysis1.numberinsight}</p>
        <p className='text-[10px]'>{specificanalysis.analysis1.one_short_positive_detail}</p>
      </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="w-full min-h-[50px] flex flex-col items-center justify-center gap-2">
        <p className='text-[35px] text-red-500 font-bold'>{specificanalysis.analysis2.numberinsight}</p>
        <p className='text-[10px]'>{specificanalysis.analysis2.one_short_negetive_detail}</p>
      </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="w-full min-h-[50px] flex flex-col items-center justify-center gap-2">
        <p className='text-[35px] text-blue-500 font-bold'>{specificanalysis.analysis3.numberinsight}</p>
        <p className='text-[10px]'>{specificanalysis.analysis3.one_short_random_detail}</p>
      </div>
    </div>

    {/* Bottom Right: Content */}
    <div className="col-span-3 h-full bg-white p-4 rounded-lg shadow-sm border border-gray-100 min-h-[50px] flex flex-col gap-2 items-center justify-center text-black text-center">
      <p className='text-[15px] font-bold'>Overall Analysis</p>
      <p className="text-[15px] italic">{overallanalysis}</p>
    </div>
    </>}
    
  </div>
</div>
        </>
        
      )}
      </div>
    </>
  )
}

export default Dashboard