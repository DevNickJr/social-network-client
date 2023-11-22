// components/Login.tsx
import React, { useState } from 'react';
import { ILogin } from '../../../interfaces';
import { apiLogin } from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { IUser } from '../../../contexts/AuthContext';

const Login: React.FC = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ILogin>({
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
        const loggedUser = await apiLogin(formData)
        const data: IUser = loggedUser.data
        dispatch({
          type: "LOGIN",
          payload: data
        })
        console.log({ data, dispatch })
        navigate("/chat")
    } catch (error) {
        console.log({error})
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
