import React from 'react'
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

const CartCard = ({ cartItems, handleClose, handleIncreaseQuantity, handleDecreaseQuantity }) => {
    return (
        <div className="py-2 rounded-xl w-fit">
            {cartItems.map((item, index) => (
                <div key={index} className="flex shadow-md bg-white flex-row space-y-3 py-4 px-4 max-w-xl text-left rounded-lg sm:flex-row sm:space-x-5 sm:space-y-0  mb-8 gap-5 ">
                    <div className="h-24 w-24">
                        <img className="h-full w-full rounded-lg object-cover" src={item.images[0].url} alt="Pimage" />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                                <Typography className="text-base font-semibold text-gray-900">{item.name}</Typography>
                                <Typography className="mx-0 mt-1 mb-0 text-sm text-gray-400">{item.size}</Typography>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <Typography className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">₹{item.price}</Typography>

                            </div>
                        </div>
                        <div className=" flex flex-row mt-8">
                            <Stack direction="row" spacing={0} className="mx-auto flex h-8 items-stretch text-gray-600 border rounded-lg">
                                <Button variant="text" onClick={() => { handleDecreaseQuantity(item.productId, (item.quantity - 1)) }} disabled={item.quantity <= 1}>-</Button>
                                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                                <Button variant="text" onClick={() => { handleIncreaseQuantity(item.productId, (item.quantity + 1)) }}>+</Button>
                            </Stack>
                            <div className="">
                                <Button variant="text" onClick={() => handleClose(item.productId)}><ClearIcon /></Button>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartCard
