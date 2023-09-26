import React from 'react';
import Navbar from '../features/navbar/Navbar';
import ProductList from '../features/Product List/components/ProductList';

function HomePage() {
  return (
    <div>
      <Navbar>
      <ProductList></ProductList>
      </Navbar>
    </div>
  );
}

export default HomePage;
