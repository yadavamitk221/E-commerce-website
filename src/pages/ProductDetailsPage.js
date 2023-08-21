import React from 'react';
import Navbar from '../features/navbar/Navbar';
import ProductDetails from "../features/Product List/components/ProductDetails";
function ProductDetailsPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails>
        </ProductDetails>
      </Navbar>
    </div>
  )
}

export default ProductDetailsPage;
