import React , {useEffect, useState} from "react";
import {ethers} from "ethers";

import {useStateContext} from "../context";
import {checkIfImage} from '../utils/';


const index=()=>{
  const {address,connect,contract,realState, createPropertyFunction} = useStateContext();

  //
  const [isLoading, setIsLoading] =useState(false);
  const [properties  , setfirst] = useState([]);
  const [form, setForm] = useState({
    propertyTitle :"",
    description: "",
    category: "",
    price: "",
    images: "",
    propertyAddress:"",
  });

  const handleFromFieldChange=(fieldName,e)=>{
    setForm({...form, [fieldName]: e.target.value })
  };
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    checkIfImage(form.images, async(exists) =>{
      if (exists){
        setIsLoading(true);
        await createPropertyFunction({
          ...form,
          price: ethers.utils.parseUnits(form.price,18),
        });
        setIsLoading(false);
      } else {
        alert("Please provide a valid URL");
        setForm({...form, image: ""});
      }

    });

  };

  return <div>
    <h1>{realState}</h1>
    <button onClick={ ()=> connect()}>Connect</button>
    <h1>Create</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" 
          placeholder="propertyTitle" 
          onChange={(e) => handleFromFieldChange("propertyTitle",e)} />
      </div>
      <div>
        <input type="text" 
          placeholder="description" 
          onChange={(e) => handleFromFieldChange("description",e)} />
      </div>
      <div>
        <input type="text" 
          placeholder="category" 
          onChange={(e) => handleFromFieldChange("category",e)} />
      </div>
      <div>
        <input type="number" 
          placeholder="price" 
          onChange={(e) => handleFromFieldChange("price",e)} />
      </div>
      <div>
        <input type="url" 
          placeholder="images" 
          onChange={(e) => handleFromFieldChange("images",e)} />
      </div>
      <div>
        <input type="text" 
          placeholder="propertyAddress" 
          onChange={(e) => handleFromFieldChange("propertyAddress",e)} />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>;
};

export default index;

