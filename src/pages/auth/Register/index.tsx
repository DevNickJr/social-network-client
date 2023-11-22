// components/Register.tsx
import React, { useState } from 'react';
import { IRegister } from '../../../interfaces';
import { apiRegister } from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState<IRegister>({
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
        const registeredUser = await apiRegister(formData)
        console.log({ registeredUser })
        navigate("/login")
    } catch (error) {
        console.log({error})
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
