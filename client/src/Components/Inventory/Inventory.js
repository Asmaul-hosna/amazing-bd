import React from 'react';
import fakeData from '../../fakeData';
import axios from 'axios';

const Inventory = () => {
    const sliceProduct = fakeData.slice(0,1)
    console.log(fakeData[0]);
    const handleAddProduct = () => {
        axios.post('http://localhost:8000/addProduct',sliceProduct )
           
    }
    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;