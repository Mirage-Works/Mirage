import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from "../components/Stepper";
import { useStateContext } from '../context';
import { CustomButton, Loader, CountBox } from '../components';
import thumbs1 from '../assets/thumbs1.png';
import thumbs2 from '../assets/thumbs2.png';
import thumbs3 from '../assets/thumbs3.png';

function Step({ number, text, isVerified }) {
  const stepClass = `w-[60px] h-[60px] text-center p-4 rounded-full border-2 ${
    isVerified ? " bg-green-500 text-white" : "bg-gray-600 text-[#adadff]"
  }`;
  return (
    <div className="flex flex-col items-center">
      <div className={stepClass}>{number}</div>
      <div className="mt-2 text-sm text-white">{text}</div>
    </div>
  );
}

function ProgressBar({ isStep1Verified, isStep2Verified }) {
  const progressBarClass = `h-2 w-full bg-gray-200 mb-6 ${
    isStep1Verified ? "bg-green-500" : ""
  } ${isStep2Verified ? "bg-green-500" : ""}`;
  return <div className={progressBarClass}></div>;
}

function VerifyButton({ label, isDisabled, onVerify }) {
  const buttonClass = `bg-green-500 py-2 px-4 rounded text-white ${
    isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;
  return (
    <button className={buttonClass} disabled={isDisabled} onClick={onVerify}>
      {label}
    </button>
  );
}

const ShipmentDetails = () => {
  const { state } = useLocation();
  const { contract, address, payment } = useStateContext();
  const [ isLoading, setIsLoading ] = useState(false);
  const [senderCopied, setSenderCopied] = useState(false);
  const [receiverCopied, setReceiverCopied] = useState(false);
  const [logCopied, setLogCopied] = useState(false);
  const [ amount, setAmount ] = useState('');

  const [currentStep, setCurrentStep] = useState(1);
  const [isStep1Verified, setIsStep1Verified] = useState(false);
  const [isStep2Verified, setIsStep2Verified] = useState(false);
  const [isStep3Verified, setIsStep3Verified] = useState(false);
  const [user1VerificationTime, setUser1VerificationTime] = useState(null);
  const [user2VerificationTime, setUser2VerificationTime] = useState(null);
  const [user3VerificationTime, setUser3VerificationTime] = useState(null);

  const handleVerifyStep1 = () => {
      setIsStep1Verified(true);
      setUser1VerificationTime(new Date().toGMTString());
      setCurrentStep(2);
  };

  const handleVerifyStep2 = () => {
      setIsStep2Verified(true);
      setUser2VerificationTime(new Date().toGMTString());
      setCurrentStep(3);
  };

  const handleVerifyStep3 = () => {
      setIsStep3Verified(true);
      setUser3VerificationTime(new Date().toGMTString());
  };

  const isUser1Turn = !isStep1Verified && !isStep2Verified && !isStep3Verified;
  const isUser2Turn = isStep1Verified && !isStep2Verified && !isStep3Verified;
  const isUser3Turn = isStep1Verified && isStep2Verified && !isStep3Verified;


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
          
          <div className='gap-[30px] flex'>
            <img src={state.image} alt="shipment" className="w-full h-[410px] object-cover rounded-xl"/>
            
            <div className='flex w-[200px] flex-wrap justify-between gap-[30px]'>
              <CountBox title="Sender verified at" value={user1VerificationTime ? `${user1VerificationTime}` : "-" }/>
              <CountBox title="Logistics verified at" value={user2VerificationTime ? `${user2VerificationTime}` : "-" }/>
              <CountBox title="Receiver verified at" value={user3VerificationTime ? `${user3VerificationTime}` : "-" }/>
            </div>
          </div>
          
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
              {/* <Stepper /> */}
              <div className="flex flex-col items-center w-3/4">
                <div className="flex justify-between items-center w-full">
                  <Step number={1} text="Step 1" isVerified={isStep1Verified} />
                  <ProgressBar isStep1Verified={isStep1Verified} isStep2Verified={isStep2Verified} />
                  <Step number={2} text="Step 2" isVerified={isStep2Verified} />
                  <ProgressBar isStep1Verified={isStep1Verified} isStep2Verified={isStep2Verified} />
                  <Step number={3} text="Step 3" isVerified={isStep3Verified} />
                </div>
                <div className="mt-4 flex w-full justify-center items-center">
                  {address === state.sender && 
                      <VerifyButton
                        label="Sender Verify"
                        isDisabled={!isUser1Turn}
                        onVerify={handleVerifyStep1}
                      />
                  }
                  
                  {address === state.logistics &&
                      <VerifyButton
                        label="Logistics Verify"
                        isDisabled={!isUser2Turn}
                        onVerify={handleVerifyStep2}
                      />
                  }
                  
                  {address === state.receiver && 
                      <VerifyButton
                        label="Receiver Verify"
                        isDisabled={!isUser3Turn}
                        onVerify={handleVerifyStep3}
                      />
                  }
                  
                </div>
              </div>
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
              <div className="w-[52px] h-[52px] flex items-center justify-center mb-6 cursor-pointer">
                <img src={thumbs1} alt="user" className="w-[100%] h-[100%] object-contain rounded-2xl"/>
              </div>
              <div>
              <div className={senderCopied ? 'coupon-applied' : 'lucky-coupon'} >
                    <div className="lucky-coupon-code">{state.sender}</div>
                    {
                      senderCopied ? <div className="coupon-copied">Copied!</div>
                        :
                        <CopyToClipboard text={state.sender} onCopy={() => setSenderCopied(true)}>
                          <div className="copy-code">Copy</div>
                        </CopyToClipboard>
                    }

                  </div>
                <p className="mt-[4px] font-epilogue font-normal text-[15px] text-[#adadad]">Sender</p>
              </div>
            </div>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center  mb-6 cursor-pointer">
                <img src={thumbs2} alt="user" className="w-[100%] h-[100%] object-contain rounded-2xl"/>
              </div>
              <div>
                  <div className={logCopied ? 'coupon-applied' : 'lucky-coupon'} >
                    <div className="lucky-coupon-code">{state.logistics}</div>
                    {
                      logCopied ? <div className="coupon-copied">Copied!</div>
                        :
                        <CopyToClipboard text={state.logistics} onCopy={() => setLogCopied(true)}>
                          <div className="copy-code">Copy</div>
                        </CopyToClipboard>
                    }

                  </div>
                
                <p className="mt-[4px] font-epilogue font-normal text-[15px] text-[#adadad]">Logistics</p>
              </div>
            </div>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center mb-6">
                <img src={thumbs3} alt="user" className="w-[100%] h-[100%] object-contain rounded-2xl"/>
              </div>
              <div>
              <div className={receiverCopied ? 'coupon-applied' : 'lucky-coupon'} >
                    <div className="lucky-coupon-code">{state.receiver}</div>
                    {
                      receiverCopied ? <div className="coupon-copied">Copied!</div>
                        :
                        <CopyToClipboard text={state.receiver} onCopy={() => setReceiverCopied(true)}>
                          <div className="copy-code">Copy</div>
                        </CopyToClipboard>
                    }

                  </div>
                <p className="mt-[4px] font-epilogue font-normal text-[15px] text-[#adadad]">Receiver</p>
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
            <h4 className="font-epilogue font-semibold text-[16px] text-white">Common Document</h4>

              {/* <a href={state.commonDocuments}>
                <div className="mt-[15px] flex flex-col gap-4 text-[#3285d2] hover:text-[#024787]">
                  {state.commonDocuments}
                </div>
              </a> */}
              <div 
                className='sm:w-1/5 w-[100px] px-4 py-2 bg-[#6942eb] font-epilogue text-white font-semibold text-[18px] rounded-[17px] justify-center items-center text-center mt-[10px] hover:bg-[#0e2238]'
                onClick={() => window.open(state.commonDocuments, '_blank')}
              >
                Document
              </div>
          </div>
            { address === state.sender &&
              <div>
                <h4 className="font-epilogue font-semibold text-[16px] text-white">Confidential Document</h4>
                {/* <a href={state.confidentialDocuments}>
                  <div className="mt-[15px] flex flex-col gap-4 text-[#3285d2] hover:text-[#024787]">
                    {state.confidentialDocuments}
                  </div>    
                </a> */}
                <div 
                  className='sm:w-1/5 w-[100px] px-4 py-2 bg-[#6942eb] font-epilogue text-white font-semibold text-[18px] rounded-[17px] justify-center items-center text-center mt-[10px] hover:bg-[#0e2238]'
                  onClick={() => window.open(state.confidentialDocuments, '_blank')}
                >
                  Document
                </div>
              </div>
            }
            { address === state.receiver &&
              <div>
                <h4 className="font-epilogue font-semibold text-[16px] text-white">Confidential Document</h4>
                {/* <a href={state.confidentialDocuments}>
                  <div className="mt-[15px] flex flex-col gap-4 text-[#3285d2] hover:text-[#024787]">
                    {state.confidentialDocuments}
                  </div>    
                </a> */}
                <div 
                  className='sm:w-1/5 w-[100px] px-4 py-2 bg-[#6942eb] font-epilogue text-white font-semibold text-[18px] rounded-[17px] justify-center items-center text-center mt-[10px] hover:bg-[#0e2238]'
                  onClick={() => window.open(state.confidentialDocuments, '_blank')}
                >
                  Document
                </div>
              </div>
            }
          
        </div>
          <div className='flex-1'>
            <h4 className='font-epilogue font-semibold text-white text-[18px] uppercase'>
              Payment
            </h4>

            <div className='mt-[20px] flex flex-col p-4 bg-[#420468] rounded-[10px]'>
              <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#ffffff]'>
                  Fund the Shipment
              </p>
              <div className='mt-[30px]'>
                  {/* <input
                    type="number"
                    placeholder='FTM 0.1'
                    step='0.01'
                    className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#79797e] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#79797e] rounded-[10px]' 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  /> */}
                  <p className='font-epilogue font-medium text-[18px] leading-[30px] text-center text-[#808191]'>
                    You can transfer funds using Metamask<br/>
                    Copy the respective address and send <br/>
                    transaction through "Send" option from Metamask.
                  </p>
                  {/* <CustomButton
                    btntype='button'
                    title='Pay'
                    styles="w-full bg-[#6942eb] mt-[30px]"
                    // handleClick={handlePayment}
                  /> */}
              </div>
            </div>
          </div>

      </div>
    </div>
  )
}

export default ShipmentDetails