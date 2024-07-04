import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/KeyboardArrowRight';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { logoutUser } from '../../actions/authActions';

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleDropdownClick = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };
    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/login");

    }
    return (<>
        <div className='flex md:hidden py-2 '>
            <button
                id="menu-toggle"
                className="w-screen px-3 py-2 shadow-lg"
                onClick={toggleMenu}
            >
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
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

                                <div className="flex gap-5 mt-10 items-center px-4">
                                    <Avatar
                                        alt="Semy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <h3 className="font-medium">{user.name}</h3>
                                    <div className="flex ml-3 flex-col">
                                    </div>
                                </div>

                                <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Options</span>

                                <div className="flex mt-3 flex-1 flex-col">
                                    <div className="">
                                        <nav className="flex-1">
                                            <Link to="/admin/dashboard"><div className="flex gap-5 relative w-full items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4">
                                                <span><CategoryIcon /></span>
                                                Dashboard
                                            </div></Link>

                                            <div className="relative transition">
                                                <button
                                                    onClick={() => handleDropdownClick(1)}
                                                    className="flex gap-5 relative w-full items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4"
                                                >
                                                    <FolderOpenOutlinedIcon />
                                                    Products
                                                    {openDropdown === 1 ? <ExpandLessIcon className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600" /> : <ExpandMoreIcon className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600" />}
                                                </button>
                                                <Collapse in={openDropdown === 1} timeout="auto" unmountOnExit>
                                                    <ul className="flex m-2 flex-col rounded-xl bg-gray-100 font-medium">
                                                        <Link to="/admin/createproduct"><li className="flex  gap-2 m-2 cursor-pointer py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                                                            <span><AddIcon /></span>
                                                            Create Product
                                                        </li></Link>
                                                        <Link to="/admin/productlist"><li className="flex gap-2 m-2 cursor-pointer py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                                                            <span><GradingOutlinedIcon /></span>
                                                            view Products
                                                        </li></Link>
                                                    </ul>
                                                </Collapse>
                                            </div>
                                            <div className="relative transition">
                                                <button
                                                    onClick={() => handleDropdownClick(2)}
                                                    className="flex gap-5 relative w-full items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4"
                                                >
                                                    <ShoppingCartCheckoutOutlinedIcon />
                                                    Order
                                                    {openDropdown === 1 ? <ExpandLessIcon className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600" /> : <ExpandMoreIcon className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600" />}
                                                </button>
                                                <Collapse in={openDropdown === 2} timeout="auto" unmountOnExit>
                                                    <ul className="flex m-2 flex-col rounded-xl bg-gray-100 font-medium">
                                                        <li className="flex  gap-2 m-2 cursor-pointer py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                                                            <span><PendingActionsOutlinedIcon /></span>
                                                            Pending Orders
                                                        </li>
                                                        <li className="flex gap-2 m-2 cursor-pointer py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                                                            <span><GradingOutlinedIcon /></span>
                                                            Completed Orders
                                                        </li>
                                                    </ul>
                                                </Collapse>
                                            </div>
                                        </nav>

                                        <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Product Management</span>

                                        <nav className="flex-1">
                                            <div className="flex  gap-5 cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
                                                <SettingsIcon />
                                                Settings
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </div >
        <div className="hidden md:flex w-fit bg-sky-100 sticky top-0">
            <div className="h-screen w-64">
                <div className="flex h-full flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg  bg-slate-50 pt-5 shadow-md">
                    <div className="flex gap-5 mt-10 items-center px-4">
                        <Avatar
                            alt="Semy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                        <h3 className="font-medium">{user.name}</h3>
                        <div className="flex ml-3 flex-col">
                        </div>
                    </div>

                    <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Options</span>

                    <div className="flex mt-3 flex-1 flex-col">
                        <div className="">
                            <nav className="flex-1">
                                <Link to="/admin/dashboard"><div className="flex gap-5 relative w-full items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4">
                                    <span><CategoryIcon /></span>
                                    Dashboard
                                </div></Link>

                                <div className="relative transition">
                                    <button
                                        onClick={() => handleDropdownClick(1)}
                                        className="flex gap-5 relative w-full items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4"
                                    >
                                        <FolderOpenOutlinedIcon />
                                        Products
                                        {openDropdown === 1 ? <ExpandLessIcon className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600" /> : <ExpandMoreIcon className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600" />}
                                    </button>
                                    <Collapse in={openDropdown === 1} timeout="auto" unmountOnExit>
                                        <ul className="flex m-2 flex-col rounded-xl bg-gray-100 font-medium">
                                            <Link to="/admin/createproduct"><li className="flex  gap-2 m-2 cursor-pointer py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                                                <span><AddIcon /></span>
                                                Create Product
                                            </li></Link>
                                            <Link to="/admin/productlist"><li className="flex gap-2 m-2 cursor-pointer py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                                                <span><GradingOutlinedIcon /></span>
                                                view Products
                                            </li></Link>
                                        </ul>
                                    </Collapse>
                                </div>
                                <div className="relative transition">
                                    <button
                                        onClick={() => handleDropdownClick(2)}
                                        className="flex gap-5 relative w-full items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4"
                                    >
                                        <ShoppingCartCheckoutOutlinedIcon />
                                        Order
                                        {openDropdown === 1 ? <ExpandLessIcon className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600" /> : <ExpandMoreIcon className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600" />}
                                    </button>
                                    <Collapse in={openDropdown === 2} timeout="auto" unmountOnExit>
                                        <ul className="flex m-2 flex-col rounded-xl bg-gray-100 font-medium">
                                            <li className="flex  gap-2 m-2 cursor-pointer py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                                                <span><PendingActionsOutlinedIcon /></span>
                                                Pending Orders
                                            </li>
                                            <li className="flex gap-2 m-2 cursor-pointer py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                                                <span><GradingOutlinedIcon /></span>
                                                Completed Orders
                                            </li>
                                        </ul>
                                    </Collapse>
                                </div>
                            </nav>

                            <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Product Management</span>

                            <nav className="flex-1">
                                <div className="flex  gap-5 cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
                                    <SettingsIcon />
                                    Settings
                                </div>
                                <div onClick={handleLogout} className="flex  gap-5 cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
                                    <SettingsIcon />
                                    Logout
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
    );
};

export default Sidebar;
