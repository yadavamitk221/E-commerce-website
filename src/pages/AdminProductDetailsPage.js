import React from 'react';
import Navbar from '../features/navbar/Navbar';
import ProductDetails from "../features/Product List/components/ProductDetails";
import AdminProductDetails from '../features/admin/components/AdminProductDetails';
function AdminProductDetailsPage() {
  return (
    <div>
      <Navbar>
        <AdminProductDetails>
        </AdminProductDetails>
      </Navbar>
    </div>
  )
}

export default AdminProductDetailsPage;
