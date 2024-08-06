import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { checkIfImage , getTopCreators} from "../utils/";

import {
  Header,
  Banner,
  Live,
  Service,
  Product,
  TopSeller,
  Collection,
  Footer,
  Copyright,
} from "../PageComponents/Components";
import { id } from "ethers/lib/utils";

const index = () => {
  const {
    address,
    connect,
    contract,
    realState,
    createPropertyFunction,
    getPropertiesData,
  } = useStateContext();

  //
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    propertyTitle: "",
    description: "",
    category: "",
    price: "",
    images: "",
    propertyAddress: "",
  });

  const handleFromFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.images, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createPropertyFunction({
          ...form,
          price: ethers.utils.parseUnits(form.price, 18),
        });
        setIsLoading(false);
      } else {
        alert("Please provide a valid URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  //get propertires data
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);


  //console.log(properties);
  const housing=[];
  const rental=[];
  const farmhouse=[];
  const office=[];
  const commercial=[];
  const country=[];

  if (!isLoading){
    properties.map((el,i)=>{
      if (el.category==="Country"){
        country.push(el)  ;
      } else if(el.category==="Commercial"){
        commercial.push(el);
      } else if (el.category==="Office"){
        office.push(el);
      } else if (el.properties==="FarmHouse"){
        farmhouse.push(el);
      } else if (el.properties==="Rental"){
        rental.push(el);
      } else if (el.properties==="Housing"){
        housing.push(el);
      }
    });
  }

  //get top creators and amount
  const creators=getTopCreators(properties);
  // console.log(creator);



  return (
    <div className="template-color-1 nft-body-connect">
      <Header/>
      <Banner/>
      <Live properties={properties}/>
      <Service />
      <Product  properties={properties} />
      <TopSeller creators={creators}/>
      <Collection 
        housing={housing?.length}
        rental={rental?.length}
        farmhouse={farmhouse?.length}
        office={office?.length}
      />
      <Footer/>
      <Copyright/>


      {/* <h1>{realState}</h1>
      <button onClick={() => connect()}>Connect</button>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="propertyTitle"
            onChange={(e) => handleFromFieldChange("propertyTitle", e)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="description"
            onChange={(e) => handleFromFieldChange("description", e)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="category"
            onChange={(e) => handleFromFieldChange("category", e)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="price"
            onChange={(e) => handleFromFieldChange("price", e)}
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="images"
            onChange={(e) => handleFromFieldChange("images", e)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="propertyAddress"
            onChange={(e) => handleFromFieldChange("propertyAddress", e)}
          />
        </div>
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default index;
