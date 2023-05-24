import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x6AdC15cE6a326FA7aFAde4791EcbeEA4cC2b2C66');
  const { mutateAsync: createShipment } = useContractWrite(contract, 'createShipment');

  const address = useAddress();
  const connect = useMetamask();

  const publishShipment = async (form) => {
    try {
      const data = await createShipment([
        address, // owner
        form.title, // title
        form.category, // category
        form.sender, // sender
        form.logistics, //receiver
        form.receiver, // receiver
        form.description,
        form.commonDocuments,
        form.confidentialDocuments, 
        form.image
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getShipments = async () => {
    const shipments = await contract.call('getShipments');

    const parsedShipment = shipments.map((shipment, i) => ({
      owner: shipment.owner,
      title: shipment.title,
      category: shipment.category,
      sender: shipment.sender,
      logistics: shipment.logistics,
      receiver: shipment.receiver,
      description: shipment.description,
      commonDocuments: shipment.commonDocuments,
      confidentialDocuments: shipment.confidentialDocuments,
      image: shipment.image,
      pId: i
    }));

    return parsedShipment;
  }

  const getUserShipments = async () => {
    const allShipments = await getShipments();

    const filteredShipments = allShipments.filter((shipment) => shipment.owner === address || shipment.logistics === address || shipment.receiver === address);

    return filteredShipments;
  }
  
  const payment = async (recipient, amount) =>{
    const data = await contract.call('payment', recipient, amount);
    return data;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createShipment: publishShipment,
        getShipments,
        getUserShipments,
        payment,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);