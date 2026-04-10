import React, { useState, useRef } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';
import Papa from 'papaparse';
import { useLocation, useNavigate } from 'react-router-dom';

function Uploadfile() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [isFileuploaded, setisFileuploaded] = useState(false);


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
      setisFileuploaded(true)
      console.log(response.data);
    } catch (error) {
      setStatus("Upload Failed.");
      setisFileuploaded(false)
      console.error(error);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Navbar />

<div class="relative h-[88.3vh] w-full bg-[url('https://img.freepik.com/free-photo/office-supplies-table_1098-3457.jpg?semt=ais_incoming&w=740&q=80')] bg-cover bg-center flex flex-col items-center justify-center">
  <div class="absolute inset-0 bg-black/50"></div>
  <div className="relative flex flex-col items-center justify-center w-[500px] p-6 bg-gray-200  rounded shadow-lg">
          
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-600">
              {file ? <strong>{file.name}</strong> : "Preview and Upload CSV"}
            </p>
            
            <div className="flex gap-2 mt-4">
              <button 
                type="button" 
                onClick={triggerFilePicker} 
                className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition cursor-pointer"
              >
                Browse File
              </button>

              <button 
                type="button" 
                onClick={handleUpload} 
                disabled={!file} 
                className={`px-4 py-2 rounded text-sm text-white cursor-pointer transition ${!file ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'}`}
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
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-[10px] text-center mt-1">{progress}% uploaded</p>
            </div>
          )}
          
          <p className="mt-4 text-xs font-semibold text-blue-500 uppercase">{status}</p>

          <div class='flex items-center justify-center mt-5 mb-5'>
        
        {isFileuploaded===true && <>
        <button 
                type="button"
                onClick={()=>{navigate('/dashboard')}}
                className="px-4 py-2 rounded text-sm text-white transition bg-blue-500"
              >
                Go to Analysis Dashboard
              </button>
        </>}
        
      </div>
        </div>
</div>



     
    </>
  );
}

export default Uploadfile;