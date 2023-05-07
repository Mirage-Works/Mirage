
import React from 'react'

const CountBox = ({value, title}) => {
  return (
    <div className='flex flex-col items-center w-[250px]'>
        {/* 0A2647 */}
        <p className='font-epilogue font-normal text-[16px] text-[#808191] bg-[#420468] px-3 py-2 w-full rounded-t-[10px] text-center'>
            {title}
        </p>
        {/* 0F3460 */}
        <h4 className='font-epilogue font-bold text-white text-[20px] p-3 bg-[#6942eb] rounded-b-[10px] w-full text-center '>
            {value}
        </h4>
    </div>
  )
}

export default CountBox