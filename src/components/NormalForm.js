import React from 'react'
import { useState } from 'react';
let renderCount=0;
const NormalForm = () => {
    renderCount++;
    const [user, setUser] = useState({
      email: "",
      name: "",
      address: "",
      contactno: "",
    });
  
    const HandleOnChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    };
    const HandleSubmit = (e) => {
      e.preventDefault();
      console.log(user);
      setUser({ email: "", name: "", address: "", contactno: "" });
    };
    return (
      <div className="flex flex-col items-center">
        <p style={{marginRight:"10px"}
        }>renderCount :{renderCount}</p>
        <h1 className="text-center text-3xl font-semibold mb-8">User Details</h1>
        <form
          onSubmit={HandleSubmit}
          className="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={HandleOnChange}
              className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={HandleOnChange}
              className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={user.address}
              onChange={HandleOnChange}
              className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your address"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="contactno"
              className="block text-sm font-medium text-gray-700"
            >
              Contact No
            </label>
            <input
              type="tel"
              id="contactno"
              name="contactno"
              value={user.contactno}
              onChange={HandleOnChange}
              className="mt-1 p-3 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your contact number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add User
          </button>
        </form>
      </div>
    );
}

export default NormalForm