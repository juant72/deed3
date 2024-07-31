import React , {useEffect, useState} from "react";
import {ethers} from "ethers";

import {useStateContext} from "../context";


const index=()=>{
  const {address,connect,contract,realState} = useStateContext();

  return <div>{realState}</div>;
};

export default index;

