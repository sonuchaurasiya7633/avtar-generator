import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import { toast, ToastContainer } from 'react-toastify'

const data = [
  { label:"Illustration", value:"illustration", url:"https://api.dicebear.com/7.x/avataaars/svg?seed=" },
  { label:"Cartoon", value:"cartoon", url:"https://api.dicebear.com/7.x/adventurer/svg?seed=" },
  { label:"Sketchy", value:"sketchy", url:"https://api.dicebear.com/7.x/croodles/svg?seed=" },
  { label:"Robots", value:"robots", url:"https://api.dicebear.com/7.x/bottts/svg?seed=" },
  { label:"Art", value:"art", url:"https://api.dicebear.com/7.x/pixel-art/svg?seed=" },
  { label:"Male", value:"male", url:"https://randomuser.me/api/portraits/men" },
  { label:"Female", value:"female", url:"https://randomuser.me/api/portraits/women" }
]

const App = () => {
  const [src,setSrc] = useState(null)
  const [option,setOption] = useState("male")

  const generateNumForPerson = () => Math.floor(Math.random()*99)+1

  const generate = () =>{
    const obj = data.find((item)=>item.value === option)
    const url = obj.url
    if(option === "male" || option==="female"){
      setSrc(`${url}/${generateNumForPerson()}.jpg`)
    } else {
      setSrc(`${url}${Date.now()}`)
    }
  }  

  const optionChange = (e)=> setOption(e.target.value)

  const download = (url) =>{
    const a = document.createElement("a")
    a.href = url
    a.download = `${Date.now()}.jpg`
    a.click()
    a.remove()
  }

  const copy = (url) =>{
    navigator.clipboard.writeText(url)
    toast.success("Link Copied Successfully",{position:"top-center"});
  }

  useEffect(()=>{ generate() },[option])

  return (
    <div className='animate__animated animate__fadeIn min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 text-white'>
      <div className="relative w-full max-w-lg rounded-3xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl">
        
        {/* Glass Card */}
        <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl p-8 flex flex-col items-center gap-6 border border-slate-700">
          
          {/* Avatar */}
          <div className="p-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
            <img 
              src={src || "/avt.png"}
              className='w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-900 object-cover shadow-lg hover:scale-110 transition-transform duration-300'
            />
          </div>
          
          {/* Heading */}
          <div className='text-center space-y-1'>
            <h1 className='text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'>
              Avatar Generator
            </h1>
            <p className='text-slate-300 text-sm sm:text-base'>Generate unlimited stylish avatars instantly</p>
          </div>
          
          {/* Select + URL */}
          <div className='w-full space-y-4'>
            <select 
              className='w-full p-3 rounded-xl border border-slate-700 bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-sm sm:text-base'
              value={option} 
              onChange={optionChange}
            >
              {data.map((item,index)=>(
                <option key={index} value={item.value}>{item.label}</option>
              ))}
            </select>
            
            <div className='w-full p-3 rounded-xl border border-slate-700 bg-slate-800/60 text-xs sm:text-sm break-all'>
              {src}
            </div>
          </div>

          {/* Buttons */}
          <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <button 
              onClick={generate} 
              className='flex-1 bg-gradient-to-r from-rose-500 to-orange-600 rounded-xl py-2.5 sm:py-3 font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform'
            >
              <i className="ri-refresh-line"></i>
              Change
            </button>

            <button 
              onClick={()=>download(src)} 
              className='flex-1 bg-gradient-to-r from-green-500 to-cyan-600 rounded-xl py-2.5 sm:py-3 font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform'
            >
              <i className="ri-download-line"></i>
              Download
            </button>

            <button 
              onClick={()=>copy(src)} 
              className='flex-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl py-2.5 sm:py-3 font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform'
            >
              <i className="ri-file-copy-line"></i>
              Copy
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App
