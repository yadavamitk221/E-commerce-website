import React from 'react';
import Navbar from '../features/navbar/Navbar';
import AdminProductList from '../features/admin/components/AdminProductList';

function HomePage() {
  return (
    <div>
      <Navbar>
        <AdminProductList>
        </AdminProductList>
      </Navbar>
    </div>
  )
}

export default HomePage;
