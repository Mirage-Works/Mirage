import React from 'react';
import "./index.css";
import thumbs1 from '../assets/thumbs1.png';

const FundCard = ({ owner, title, category, sender, logistics, receiver, description, image, handleClick }) => {

  return (
    <div className="sm:w-[288px] w-full rounded-t-lg-[10px] bg-[#420468] cursor-pointer rounded-[20px]" onClick={handleClick}>
      <img src={image} alt="product image" className="w-full h-[158px] object-cover rounded-t-[15px]"/>

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <p className="mt-[2px] font-epilogue font-medium text-[15px] text-white">{category}</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
          {title}
        </h3>
        <p className="mt-[10px] font-epilogue font-normal text-[#adadad] text-left leading-[18px] truncate">
          {description}
        </p>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center">
            <img src={thumbs1} alt="user" className="w-100% h-100% object-contain rounded-xl"/>
          </div>
          
          <div className='justify-center items-center truncate'>
          <p className="flex-1 font-epilogue font-normal text-[15px] text-white truncate">
            By <span className="text-[#adadad]">{sender}</span>
          </p>

          <p className="flex-1 font-epilogue font-normal text-[15px] text-white truncate">
            To <span className="text-[#adadad]">{receiver}</span>
          </p>

        </div>

        </div>
      </div>
    </div>
  )
}

export default FundCard