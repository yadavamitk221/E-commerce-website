import React from 'react';
import Navbar from '../features/navbar/Navbar';
import UserOrder from '../features/user/components/UserOrder';

function UserOrdersPage() {
  return (
    <div>
      <Navbar>
      <h1 className='mx-auto text-2xl'>My Orders</h1>
        <UserOrder>
        </UserOrder>
      </Navbar>
    </div>
  )
}

export default  UserOrdersPage;
