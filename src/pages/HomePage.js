import React from 'react';
import Navbar from '../features/navbar/Navbar';
import ProductList from '../features/Product List/components/ProductList';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Link to="/admin">Admin</Link>
    </div>
  );
}

export default HomePage;
