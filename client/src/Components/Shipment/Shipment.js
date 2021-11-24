import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import  './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const[loggedInUser,setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); 
  
    return (
    
      <form className= "ship-form"onSubmit={handleSubmit(onSubmit)}>
     
    <input defaultValue={loggedInUser.name} {...register("nameRequired", { required: true })} placeholder="name"/>
     {errors.name && <span>name is required</span>}

     <input defaultValue={loggedInUser.email}{...register("emailRequired", { required: true })} placeholder="email" />
     {errors.email && <span>email is required</span>}

     <input defaultValue={loggedInUser.address}{...register("addressRequired", { required: true })}  placeholder="address"/>
     {errors.address && <span>address is required</span>}

     <input defaultValue={loggedInUser.phone} {...register("phoneRequired", { required: true })} placeholder="phone" />
     {errors.phone && <span>phone is required</span>}
     

        
        <input type="submit" />
      </form>
    );
}  
export default Shipment;