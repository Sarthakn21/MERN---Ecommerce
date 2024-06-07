import React, { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Men", href: "/men" },
        { name: "Women", href: "/women" },
        { name: "Kids", href: "/kids" },
    ];

    return (
        <nav className="bg-white shadow-md w-full">
            <div className="flex justify-between items-center bg-sky-300 w-full px-4 py-2">
                <a href="#" className="flex items-center">
                    <span className="text-xl font-bold">Modish</span>
                </a>

                <ul className="hidden md:flex gap-10 text-gray-700 font-medium">
                    {navigation.map((item) => (
                        <li key={item.name} className="transition-transform transform hover:scale-150">
                            <a href={item.href} className="">{item.name}</a>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:flex items-center gap-5">
                    <button className="transition-transform transform hover:scale-150 hover:border-none border border-red-700 rounded-xl px-5 py-1">Login</button>
                    <button
                        className="relative px-3 py-2 text-gray-700 transition-transform transform hover:scale-150"
                    >
                        <ShoppingCartIcon />
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                            0
                        </span>
                    </button>
                </div>
                <div className="flex md:hidden">
                    <a
                        href="#"
                        className="relative px-3 py-2 text-gray-700 hover:text-gray-500 font-medium"
                    >
                        <ShoppingCartIcon />
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                            0
                        </span>
                    </a>
                    <button
                        id="menu-toggle"
                        className="md:hidden"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 6H20M4 12H20M4 18H20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                id="menu"
                className={`md:hidden fixed top-0 left-0 h-full bg-white transition-transform transform z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} w-3/12`}
                style={{ overflowY: 'auto' }}
            >
                <ul className="text-gray-700 font-medium mt-16 space-y-4 px-4">
                    {navigation.map((item) => (
                        <li key={item.name} className="border-b border-gray-500 transition-transform transform hover:scale-75">
                            <a href={item.href} className="hover:text-gray-500">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleMenu}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
