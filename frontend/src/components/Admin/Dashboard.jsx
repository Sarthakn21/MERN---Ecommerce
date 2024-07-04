import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../actions/authActions';
import { useSelector } from 'react-redux';
import { adminproduct, getAllProducts } from '../../actions/productActions';
import { getCart } from '../../actions/cartActions';
import Sidebar from './Sidebar';
import { PieChart } from '@mui/x-charts/PieChart';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useSnackbar } from 'notistack';
import { clearError as productClearError, resetSuccess } from '../../slice/productSlice';
import { clearError as cartClearError } from '../../slice/cartSlice';
import { authClearError } from '../../slice/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products, loading: productLoading, error: productError, success } = useSelector((state) => state.product);
    const { cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
    const { adminuser, loading: authLoading, error: authError } = useSelector((state) => state.auth);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (productError || cartError || authError) {

            enqueueSnackbar("error occured", {
                variant: "error"
            });
            dispatch(productClearError());
            dispatch(cartClearError());
            dispatch(authClearError());
        }

    }, [productError, cartError, authError])
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(adminproduct());
        // dispatch(getCart());
        dispatch(resetSuccess());
    }, [])
    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());
        }
    }, [success, dispatch, enqueueSnackbar]);
    return (
        <div className='flex flex-col md:flex-row w-screen gap-1'>
            <div className='flex'><Sidebar /></div>
            <div className="m-10 grid gap-5 sm:grid-cols-3  mx-auto px-5 w-full">
                <div className="px-4 py-1 shadow-lg shadow-blue-100">
                    <RemoveRedEyeIcon fontSize='large' />
                    <p className="mt-4 font-medium">users</p>
                    <p className="mt-2 text-xl font-medium">{adminuser.length}</p>
                </div>
                <div className="px-4 py-1 shadow-lg shadow-blue-100">
                    <FolderOpenIcon fontSize='large' />
                    <p className="mt-4 font-medium">Total Products</p>
                    <p className="mt-2 text-xl font-medium">{products.length}</p>
                </div>
                <div className="px-4 py-1 shadow-lg shadow-blue-100">
                    <RemoveRedEyeIcon fontSize='large' />
                    <p className="mt-4 font-medium">Total Sale revenue</p>
                    <p className="mt-2 text-xl font-medium">{products.length}</p>
                </div>
                <div className="py-6 shadow-lg shadow-blue-100 col-span-1">
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: products.length, label: 'Products' },
                                    { id: 1, value: adminuser.length, label: 'Users' },
                                    { id: 2, value: 20, label: 'Revenue' },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
