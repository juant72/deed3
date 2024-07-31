import React , {useEffect, useState} from "react";
import {ethers} from "ethers";

import {useStateContext} from "../context";


const index=()=>{
  const {address,connect,contract,realState} = useStateContext();

  return <div>
    <h1>{realState}</h1>
    <button onClick={ ()=> connect()}>Connect</button>
    <p>{address}</p>
    </div>;
};

export default index;

