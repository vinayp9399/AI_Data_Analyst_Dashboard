import React, { useState, useRef } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';
import Papa from 'papaparse';
import { useLocation, useNavigate } from 'react-router-dom';

function Uploadfile() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const navigate = useNavigate()
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // 1. Update the state for the upload button/preview
    setFile(selectedFile);
    setStatus(`Selected: ${selectedFile.name}`);

    // 2. IMPORTANT: Parse the local 'selectedFile' directly, NOT 'file' state
    // Papa.parse(selectedFile, {
    //   header: true,
    //   skipEmptyLines: true,
    //   complete: function (results) {
    //     if (results.data.length > 0) {
    //       setColumns(Object.keys(results.data[0]));
    //       setData(results.data);
    //     }
    //   },
    // });


  };

  const handleshowData=()=>{
     axios.get('http://localhost:5000/file/getfile').then((res)=>{
       console.log(res.data)
        setColumns(res.data.columns);
        setData(res.data.data);
     })
  }

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_time', new Date().toISOString());

    try {
      setStatus("Uploading...");
      const response = await axios.post('http://localhost:5000/file/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setStatus("Upload Successful!");
      console.log(response.data);
    } catch (error) {
      setStatus("Upload Failed.");
      console.error(error);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-[50vh] py-10">
        <div className="flex flex-col items-center justify-center w-[500px] p-6 bg-white border border-dashed border-gray-300 rounded shadow-sm">
          
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              {file ? <strong>{file.name}</strong> : "Preview and Upload CSV"}
            </p>
            
            <div className="flex gap-2 mt-4">
              <button 
                type="button" 
                onClick={triggerFilePicker} 
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition"
              >
                Browse File
              </button>

              <button 
                type="button" 
                onClick={handleUpload} 
                disabled={!file} 
                className={`px-4 py-2 rounded text-sm text-white transition ${!file ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Start Upload
              </button>
            </div>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".csv"
            className="hidden" 
          />

          {progress > 0 && (
            <div className="w-full mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-[10px] text-center mt-1">{progress}% uploaded</p>
            </div>
          )}
          
          <p className="mt-4 text-xs font-semibold text-blue-600 uppercase">{status}</p>
        </div>
      </div>

      <div class='flex items-center justify-center gap-10 mb-5'>
        <button 
                type="button" 
                onClick={()=>{handleshowData()}} 
                className="px-4 py-2 rounded text-sm text-white bg-blue-700"
              >
                Show CSV Data
              </button>
        <button 
                type="button" 
                onClick={()=>{navigate('/dashboard')}}
                className="px-4 py-2 rounded text-sm text-white bg-blue-700"
              >
                Go to Analysis Dashboard
              </button>
      </div>

      {/* Optimized Preview Table */}
      {data.length > 0 && (
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
    </>
  );
}

export default Uploadfile;