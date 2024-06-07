import React, { useState, Fragment } from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';



const Navbar2 = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Men", href: "/men" },
        { name: "Women", href: "/women" },
        { name: "Kids", href: "/kids" },
    ];

    return (
        <nav className="bg-white shadow-md w-full">
            <header className="relative bg-white">
                <div className="border-b border-gray-200">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex ml-0">
                            <h2>Brand Bucket</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-5">
                            <div className=" flex flex-1 items-center justify-end space-x-6">
                                {navigation.map((item, index) => (
                                    <Link to={item.href} key={index} className="text-md font-medium text-gray-700 hover:text-gray-800">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-5">
                            <div className=" flex flex-1 items-center justify-end space-x-6">
                                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Sign in
                                </Link>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Create account
                                </Link>
                            </div>
                            <div className="ml-4 flow-root px-2 py-1 mr-2">
                                <a href="/cart" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </a>
                            </div>
                        </div>
                        <div className="flex md:hidden">
                            <Link to="/cart">
                                <div className="ml-4 flow-root bg-gray-100 rounded-lg px-2 py-1 mr-2">
                                    <a className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                    </a>
                                </div>
                            </Link>
                            <button
                                id="menu-toggle"
                                className="md:hidden"
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
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setIsOpen}>
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
                                        <Link to={item.href} key={index} className="-m-2 block p-2 text-gray-500">
                                            {item.name}
                                        </Link>
                                    ))}
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
