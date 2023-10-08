import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from "../userSlice";
import { updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
// we will add payment section when wework on backend

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);


  const handleEdit = (addressUpdate, index) => {
    // updateUserAsync({...user, addresses: [...user.addresses, data]})
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; //for shallow coppy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; //for shallow coppy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("state", address.state);
    setValue("city", address.city);
    setValue("pinCode", address.pinCode);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => { 
    console.log(...userInfo.addresses);
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] }; //for shallow coppy issue
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
    setShowAddAddressForm(false);
  }

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-4xl my-2 font-bold tracking-tight text-gray-900">
          {console.log(userInfo)}
            Name: {userInfo.name ? userInfo.name : "New User"}
          </h1>
          <h3 className="text-xl my-2  tracking-tight text-red-900">
            Email address: {userInfo.email}
          </h3>
          {userInfo.role === 'admin' && <h3 className="text-xl my-2  tracking-tight text-red-900">
           role: {userInfo.role}
        </h3>}
        </div>

     
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <button
        onClick={e=>{setShowAddAddressForm(true); setSelectedEditIndex(-1)}}
        type="submit"
        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add New Address
      </button>

      {showAddAddressForm ? (
        <Form
          className="bg-white px-5 py-16 my-12"
          noValidate
          onSubmit={handleSubmit((data, index) => {
            handleAdd(data);
            reset();
          })}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("name", {
                        required: "name is require",
                      })}
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "email is require",
                      })}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      {...register("phone", {
                        required: "phone is require",
                      })}
                      type="tel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="street"
                      {...register("street", {
                        required: "street is require",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("city", {
                        required: "city is require",
                      })}
                      id="city"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("state", {
                        required: "state is require",
                      })}
                      id="region"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="pinCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("pinCode", {
                        required: "pinCode is require",
                      })}
                      id="pinCode"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing address
              </p>

              <ul role="list" className="divide-y divide-gray-100">
                {userInfo.addresses?.map((address, index) => (
                  <li
                    key={index}
                    className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-200"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <input
                        onChange={handleEdit}
                        id="address"
                        name="address"
                        type="radio"
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          City: {address.city}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          State: {address.state}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        Pincode: {address.pinCode}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Form>
      ) : null}
          <p className="mt-0.5 my-5 text-sm text-gray-500">Your Address:</p>
          {userInfo.addresses?.map((address, index) => (
            <div key={index}>
              {selectedEditIndex === index ? (
                <Form
                  className="bg-white px-5 py-16 my-12"
                  noValidate
                  onSubmit={handleSubmit((data, index) => {
                    console.log(data);
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is require",
                              })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is require",
                              })}
                              value={address.email}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone is require",
                              })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="street"
                              {...register("street", {
                                required: "street is require",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city is require",
                              })}
                              id="city"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state is require",
                              })}
                              id="region"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "pinCode is require",
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md bg-grey-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Address
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose from Existing address
                      </p>

                      <ul role="list" className="divide-y divide-gray-100">
                        {userInfo.addresses.map((address, index) => (
                          <li
                            key={index}
                            className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-200"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <input
                                onChange={handleEdit}
                                id="address"
                                name="address"
                                type="radio"
                                value={index}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  City: {address.city}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  State: {address.state}
                                </p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                Phone: {address.phone}
                              </p>
                              <p className="text-sm leading-6 text-gray-900">
                                Pincode: {address.pinCode}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Form>
              ) : null}
              <div className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-200">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Pincode: {address.pinCode}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      State: {address.state}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {address.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    City: {address.city}
                  </p>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium my-2 text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium my-2 text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
