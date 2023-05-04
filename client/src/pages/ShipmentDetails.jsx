import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from "../components/Stepper";
import { useStateContext } from '../context';
import { CustomButton, Loader } from '../components';
import { user } from '../assets';

const ShipmentDetails = () => {
  const { state } = useLocation();
  const { contract, address, payment } = useStateContext();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ amount, setAmount ] = useState('');

  const handlePayment = async () => {
    setIsLoading(true);
    await payment(state.sender, amount);
    console.log(amount, 'This is amount');
    setIsLoading(false);
  }

  return (
    <div className='bg-[] rounded-[20px]'>
      
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          

          <img src={state.image} alt="shipment" className="w-full h-[410px] object-cover rounded-t-xl"/>
          
          {/* Progress Tracking */}
          <div className="flex-1 mt-3">

            {/* Display the respective person's view */}
            {address === state.sender &&
              <h4 className="text-center pt-11 items-center justify-center font-epilogue font-semibold text-[20px] text-white ">
                Sender's View
              </h4>
            }

            {address === state.logistics &&
              <h4 className="text-center pt-11 items-center justify-center font-epilogue font-semibold text-[20px] text-white ">
                Logistic's View
              </h4>
            }

            {address === state.receiver &&
              <h4 className="text-center pt-11 items-center justify-center font-epilogue font-semibold text-[20px] text-white ">
                Receiver's View
              </h4>
            }

            <div className="flex flex-col gap-[40px] pt-11 items-center justify-center">
              <Stepper />
            </div>
              
          </div>

        </div>
      </div>

      <div className="p-10 mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          {/* User Details */}
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white ">User Details</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={user} alt="user" className="w-[100%] h-[100%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.sender}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#adadad]">Sender</p>
              </div>
            </div>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={user} alt="user" className="w-[100%] h-[100%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.logistics}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#adadad]">Logistics</p>
              </div>
            </div>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={user} alt="user" className="w-[100%] h-[100%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.receiver}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#adadad]">Receiver</p>
              </div>
            </div>

          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white ">Shipment Details</h4>
          </div>

          <div>
            <p className="font-epilogue font-semibold text-[16px] text-white">Title</p>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#adadad] leading-[26px] text-justify">{state.title}</p>
              </div>
          </div>
          <div>
            <p className="font-epilogue font-semibold text-[16px] text-white">Category</p>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#adadad] leading-[26px] text-justify">{state.category}</p>
              </div>
          </div>



          <div>
            <p className="font-epilogue font-semibold text-[16px] text-white">Description</p>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#adadad] leading-[26px] text-justify">{state.description}</p>
              </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[16px] text-white">Common Documents</h4>

              <a href={state.commonDocuments}>
                <div className="mt-[15px] flex flex-col gap-4 text-[#3285d2] hover:text-[#024787]">
                  {state.commonDocuments}
                </div>
              </a>
          </div>
            {address === state.sender || address === state.receiver &&
                <div>
                <h4 className="font-epilogue font-semibold text-[16px] text-white">Confidential Documents</h4>
                <a href={state.confidentialDocuments}>
                  <div className="mt-[15px] flex flex-col gap-4 text-[#3285d2] hover:text-[#024787]">
                    {state.confidentialDocuments}
                  </div>    
                </a>
              </div>
            }
          
        </div>

        { address === state.receiver
          &&

            <div className='flex-1'>
            <h4 className='font-epilogue font-semibold text-white text-[18px] uppercase'>
              Payment
            </h4>

            <div className='mt-[20px] flex flex-col p-4 bg-[#420468] rounded-[10px]'>
              <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#79797e]'>
                  Fund the Shipment
              </p>
              <div className='mt-[30px]'>
                  <input
                    type="number"
                    placeholder='FTM 0.1'
                    step='0.01'
                    className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#79797e] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#79797e] rounded-[10px]' 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  {console.log(amount,"Amount")}
                  <CustomButton
                    btntype='button'
                    title='Pay'
                    styles="w-full bg-[#6942eb] mt-[30px]"
                    handleClick={handlePayment}
                  />
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default ShipmentDetails