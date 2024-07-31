import React, {useEffect, useState, createContext, useContext} from 'react'

import {
    useAddress, 
    useContract, 
    useMetamask,
    useContractWrite,
    useContractRead,
    useContractEvents } from "@thirdweb-dev/react";

import {ethers} from "ethers";

const StateContext = createContext();

const contractAddress=process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const StateContextProvider = ({children})=>{
    const {contract} = useContract(contractAddress);
    console.log(contract);
    const address = useAddress();
    const connect = useMetamask();

    const realState = "Deeds3";

    return (
        <StateContext.Provider value={{address, connect, contract, realState}}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);



