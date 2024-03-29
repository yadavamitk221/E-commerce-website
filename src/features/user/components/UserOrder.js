import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrder } from "../userSlice";
import { useEffect } from "react";
import { discountedPrice } from "../../../app/constant";

export default function UserOrder() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrder);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);
  return (
    <div>
      {orders?.map((order) => (
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-4xl my-2 font-bold tracking-tight text-gray-900">
              Order: {order.id}
            </h1>
            <p className="text-xl my-2  tracking-tight text-red-900">
              Order Status: {order.status}
            </p>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.href}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">{discountedPrice(item.product)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 order-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            QTY: {item.quantity}
                          </label>
                        </div>

                        <div className="flex">
                         
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {order.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total order in cart</p>
              <p>{order.totalItems} order</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping Address
            </p>
            <div
          
            className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-200"
          >
            <div className="flex min-w-0 gap-x-4">
             
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {order.selectedAddress.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  City: {order.selectedAddress.city}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  State: {order.selectedAddress.state}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                Phone: {order.selectedAddress.phone}
              </p>
              <p className="text-sm leading-6 text-gray-900">
                Pincode: {order.selectedAddress.pinCode}
              </p>
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
