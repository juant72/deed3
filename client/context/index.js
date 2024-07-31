import React, {useEffect, useState, createContext, useContext} from 'react';



import {
    useAddress, 
    useContract, 
    useMetamask,
    useContractWrite,
    useContractRead,
    useContractEvents,  } from "@thirdweb-dev/react";

import {ethers} from "ethers";

const StateContext = createContext();

const contractAddress=process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const StateContextProvider = ({children})=>{
    const {contract} = useContract(contractAddress);
    console.log(contract);
    const address = useAddress();
    const connect = useMetamask();

    const realState = "Deeds3";

    const {
        mutateAsync: ListProperty, isLoading} = useContractWrite(
            contract, 
            "ListProperty"
        );

    const createPropertyFunction = async () => {
        try{
            const data = await ListProperty(
                [
                    address,
                    price,
                    _propertyTitle,
                    _category,
                    _images,
                    _propertyAddress,
                    _description,
                ],
            );
            console.info("contract call success",data);
        }   catch (err){
            console.error("contract call failure",err);
        }

    }; 

    return (
        <StateContext.Provider value={{address, connect, contract, realState, createPropertyFunction}}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);



