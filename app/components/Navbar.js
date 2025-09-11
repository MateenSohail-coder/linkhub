"use client"
import React ,{useRef, useState} from 'react'
export default function Navbar() {
    const [isOpen, setisOpen] = useState(false)
    const menu = useRef(null)
    if(isOpen){
menu.current.src=""
    }
  return (
<div className='flex items-center justify-center w-full'>
      <nav className={`flex bg-white items-center top-15 z-50 fixed transition-all duration-900 justify-between w-[90%] py-2 md:py-2.5 px-5 md:px-10 rounded-full mx-auto`}>
     <div className='flex items-center gap-8'>
           <div className="brand cursor-pointer ">
         <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 494.1 100"
      style={{ enableBackground: "new 0 0 494.1 100" }}
      className='w-25 h-16 hidden md:block'
    >
      <path d="M0,10.7h14.2v74.5h39.3v13.1H0V10.7z M67.5,10.7c4.8,0,8.9,3.7,8.9,8.6c0,4.9-4,8.8-8.9,8.8c-4.9,0-8.9-3.9-8.9-8.8  C58.6,14.5,62.5,10.7,67.5,10.7z M60.5,35.2h13.6v63.2H60.5V35.2z M82.2,35.2h13.6v8.7c4-6.7,10.9-10.4,20.1-10.4  c14.8,0,24,11.5,24,29.7v35.1h-13.6V64.5c0-11.8-5.2-18.5-14.5-18.5c-10.3,0-15.9,7-15.9,19.6v32.7H82.2L82.2,35.2L82.2,35.2z   M147.1,10.7h13.6v55.4l25.4-30.9h17.1l-27.1,31.6l27.1,31.5h-17.1l-25.4-30.8v30.8h-13.6V10.7z M208.6,19.1h13.9v16.1h16.2v11.3  h-16.2v32.5c0,4.1,2.5,6.7,6.5,6.7h9.1v12.7h-10.9c-11.8,0-18.5-7-18.5-19.4L208.6,19.1L208.6,19.1z M245.6,35.2h12.6V43  c3.4-6,9-9.5,15.9-9.5c2.1,0,3.2,0.1,4.8,0.6v12.6c-0.9-0.2-2.3-0.5-5.1-0.5c-10,0-15.5,8.4-15.5,22.8v29.2h-13.6V35.2H245.6z   M310.8,33.5c15,0,31.3,9,31.3,34.7V70h-48.8c1.1,11.3,7.6,17.5,18.6,17.5c7.9,0,14.5-4.2,16-10.1h13.9  C340.3,90,327.1,100,311.8,100c-19.6,0-32-12.7-32-33.3C279.8,48.4,291.7,33.5,310.8,33.5z M327.5,58.8c-1.9-7.8-8.1-12.7-16.7-12.7  c-8.3,0-14.2,5-16.5,12.7H327.5z M379.1,33.5c15,0,31.3,9,31.3,34.7V70h-48.8c1.1,11.3,7.6,17.5,18.6,17.5c7.9,0,14.5-4.2,16-10.1  H410C408.6,90,395.4,100,380.1,100c-19.6,0-32-12.7-32-33.3C348.1,48.4,360,33.5,379.1,33.5z M395.8,58.8  c-1.9-7.8-8.1-12.7-16.8-12.7c-8.3,0-14.2,5-16.5,12.7H395.8z M413.7,33.3H438l-17.3-16.4l9.5-9.7L446.7,24V0h14.3v24l16.5-16.8  l9.5,9.7l-17.3,16.4h24.3v13.6h-24.5L487,63.7l-9.5,9.5l-23.7-23.7l-23.7,23.7l-9.5-9.5L438,46.8h-24.5V33.3H413.7z M446.8,66.2  h14.3v32.2h-14.3V66.2z" />
    </svg>
       <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 block md:hidden"
      viewBox="0 0 24 24"
      // xml:space is removed because React does not support it
    >
      <path d="m13.511 5.853 4.005-4.117 2.325 2.381-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2V8.122h5.909L3.708 4.117l2.325-2.381 4.005 4.117V0h3.473v5.853zM10.038 16.16h3.473v7.842h-3.473V16.16z" />
    </svg>

        </div>
        <div className="options list-none gap-5 hidden md:flex">
            <li className='py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight'>Products</li>
            <li className='py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight'>Templates</li>
            <li className='py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight'>Marketplace</li>
            <li className='py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight'>Learn</li>
            <li className='py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight'>Pricing</li>
        </div>
     </div>
     
        <div className="buttons flex gap-3 items-center">
            <button className=' cursor-pointer font-semibold text-[12px] md:text-sm hover:bg-neutral-200 bg-neutral-100 px-4 md:px-4 h-auto rounded py-2 md:py-4'>Log in</button>
            <button className='bg-[#1E2330] hover:bg-[#2f3647] text-[12px] md:text-sm cursor-pointer py-3 md:py-4 rounded-full text-white font-bold px-2.5 md:px-5'>Sign up free</button>
            <div onClick={() => setisOpen(!isOpen)}
 className={`block md:hidden p-1.5 rounded-full ${isOpen?"bg-[#D2E823]":""}`}>
<img ref={menu} src={!isOpen?"/menu.svg":"/cross.svg"} className='h-7 w-7 bg-cover' alt="Menu Icon" />
 </div>
        </div>
        
      </nav>
      <div     className={`menu fixed top-0 right-0 h-screen w-screen z-40 flex flex-col items-start justify-center bg-neutral-50 list-none transition-transform duration-400 ${
    isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-[100vw] pointer-events-none"
  }`}>
   <ul className='text-xl font-semibold flex flex-col w-full'>
         <li className='max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200'>Products</li>
        <li className='max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200'>Templates</li>
        <li className='max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200'>Marketplace</li>
        <li className='max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200'>Learn</li>
        <li className='max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200'>Pricing</li>
   </ul>

      </div>
      </div>

  )
}
