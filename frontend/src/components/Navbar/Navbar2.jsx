import React, { useState, Fragment, useEffect } from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography, Box } from "@mui/material";
import { logoutUser } from "../../actions/authActions";
import { useSnackbar } from "notistack";
import { authClearError } from "../../slice/authSlice";


const Navbar2 = () => {
    const { loading, error, cartItems } = useSelector((state) => state.cart);
    const { loading: authloading, error: authError, isAuthenticated, user } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "15px",
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Men", href: "/product/men" },
        { name: "Women", href: "/product/women" },
        { name: "Kids", href: "/product/kid" },
        { name: "Register", href: "/register" },
    ];
    const handleModal = () => {
        setModalOpen(!modalOpen);
    }
    const handleLogout = () => {
        console.log("help ");
        dispatch(logoutUser());
        navigate("/");
        // window.location.reload();

    }
    useEffect(() => {
        if (authError) {
            enqueueSnackbar("Error occurred while logging out", { variant: "error" });
            dispatch(authClearError());
        }
    }, [authError, dispatch])
    return (
        <nav className=" shadow-md w-screen z-50 fixed bg-red-500">
            <header className="relative bg-white">
                <div className="border-b border-gray-200">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-11">
                        <Link to="/" className="flex ml-0">
                            <h2>Brand Bucket</h2>
                        </Link>
                        <div className="hidden md:flex items-center gap-5">
                            <div className=" flex flex-1 items-center justify-end space-x-6">
                                {navigation.map((item, index) => (
                                    <Link to={item.href} key={index} className="text-md font-medium text-gray-700 outline-none transition-all duration-100 ease-in-out hover:border-b-4 hover:text-rose-600 focus:border-b-4">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="hidden md:flex relative items-center">
                                <input
                                    type="text"
                                    className="block w-full py-2 pl-3 pr-10 text-sm leading-5 bg-white border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                                    placeholder="Search..."
                                />
                            </div>
                            {!isAuthenticated && <div className="hidden lg:flex flex-1 items-center justify-end space-x-6">
                                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Sign in
                                </Link>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                            </div>}
                            <div className="flow-root px-2 py-1 mr-0">
                                <a href="/cart" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{user ? cartItems.length : 0}</span>

                                </a>
                            </div>
                            <button
                                id="menu-toggle"
                                className=""
                                onClick={toggleMenu}
                            >
                                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/* Mobile menu */}
            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 " onClose={setIsOpen}>
                    <TransitionChild
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>
                    <div className="fixed inset-0 z-40 flex">
                        <TransitionChild
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <DialogPanel className="relative flex w-2/4 max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-2 ml-3 space-y-2">
                                    {navigation.map((item, index) => (
                                        <Link to={item.href} key={index} className="-m-2 block p-2 text-gray-500 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4">
                                            {item.name}
                                        </Link>
                                    ))}
                                    {isAuthenticated && <Button variant="contained" onClick={handleModal}>Logout</Button>}
                                    <Modal
                                        open={modalOpen}
                                        onClose={handleModal}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Are you sure to Logout ?
                                            </Typography>
                                            <Stack spacing={2} direction="row" sx={{ marginTop: 3 }}>
                                                <Button variant="contained" onClick={handleLogout}>
                                                    Yes
                                                </Button>
                                                <Button variant="contained" onClick={handleModal}>
                                                    No
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </Modal>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </nav >
    );
};

export default Navbar2;
