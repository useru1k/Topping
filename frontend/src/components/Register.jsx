import React, { useState } from 'react';
import axios from 'axios';
import loginImage from "../assets/img/Login4.jpg";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
    <>
    <div
        className="flex justify-center items-center h-screen w-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        <form
          onSubmit={handleRegister}
          action=""
          className="flex flex-col text-center gap-4 w-full max-w-sm bg-white bg-opacity-70 p-6 rounded-lg shadow-lg"
        >
          {/* <span className="flex flex-col gap-2 w-full font-semibold justify-center text-green-700"><h2 className="">Topping</h2></span> */}
          <span className="flex flex-col gap-2 w-full">
            <label
              htmlFor="email"
              className="text-green-700 font-semibold flex justify-start"
            >
              UserName
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              className="rounded-lg p-4 w-full bg-white bg-opacity-80 outline-gray-700 focus:outline-green-500"
            />
          </span>
          <span className="flex flex-col gap-2 w-full">
            <label
              htmlFor="email"
              className="text-green-700 font-semibold flex justify-start"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg p-4 w-full bg-gray-300 outline-gray-700 focus:outline-green-500"
            />
          </span>
          <button
            type="submit"
            className="p-4 w-full flex items-center justify-center rounded-full bg-gray-700 text-gray-100 hover:bg-green-500 hover:text-gray-700 font-semibold text-sm cursor-pointer transition-all"
          >
            Register
          </button>
        </form>
      </div>

    </>    
    );
};

export default Register;
