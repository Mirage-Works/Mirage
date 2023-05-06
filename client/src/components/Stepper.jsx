import React, { useState } from "react";
import { useStateContext } from '../context';
import { useLocation } from 'react-router-dom';

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

function Stepper() {
  const { state } = useLocation();
  const { address } = useStateContext();
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

  return (
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
      <div className="mt-4 w-full flex justify-center text-sm font-epilogue text-white gap-5">
        <div>{user1VerificationTime && `User 1 verified at ${user1VerificationTime}`}</div>
        <div>{user2VerificationTime && `User 2 verified at ${user2VerificationTime}`}</div>
        <div>{user3VerificationTime && `User 3 verified at ${user3VerificationTime}`}</div>
      </div>
    </div>
  );
}

export default Stepper;
