import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import CartCard from './CartCard';

export default function CartPage() {
    const dispatch = useDispatch();
    const { cartItems, loading, error } = useSelector((state) => state.cart);
    const handleClose = (id) => {
        console.log("close clicked", id)
    }
    useEffect(() => {
        console.log("cart items", cartItems);
    }, [cartItems]);

    return (
        <div className='py-20 flex flex-col md:flex-row  gap-3 w-screen '>
            <div className=' flex justify-center align-center'>
                <CartCard cartItems={cartItems} handleClose={handleClose} />
            </div>
            <div className='h-24 w-24 bg-red-500'></div>
        </div>
    );
}
