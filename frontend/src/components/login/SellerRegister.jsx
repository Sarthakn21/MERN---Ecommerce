import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { registerUser } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { authClearError } from '../../slice/authSlice';

const SellerRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, error, message, user } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ email, password, name: username, role: "admin" }))
    };
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error.message, { variant: "error" });
            dispatch(authClearError());
        } else if (user) {
            enqueueSnackbar("Registered successfully", { variant: "success" });
            dispatch(authClearError());
            navigate('/admin/dashboard');
        }

    }, [error, user])

    return (
        <div className='py-12'>
            <form
                onSubmit={handleSubmit}
                className="relative space-y-3 rounded-md w-fit mx-auto bg-white p-6 shadow-xl lg:p-10 border border-gray-100 m-10"
            >
                <h1 className="text-xl font-semibold lg:text-2xl">Register</h1>
                <p className="pb-4 text-gray-500">Sign up to become a seller</p>

                <div>
                    <label className="">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
                    />
                </div>
                <div>
                    <label className="">Email Address</label>
                    <input
                        type="email"
                        placeholder="Info@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
                    />
                </div>
                <div>
                    <label className="">Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
                    >
                        Get Started
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SellerRegister;
