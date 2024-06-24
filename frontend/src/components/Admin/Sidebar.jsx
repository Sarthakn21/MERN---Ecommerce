import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from '@mui/material';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CollectionIcon from '@mui/icons-material/CollectionsTwoTone';
import DashboardIcon from '@mui/icons-material/SpaceDashboardTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AssignmentIcon from '@mui/icons-material/AssignmentLateTwoTone';
import CustomerIcon from '@mui/icons-material/GroupTwoTone';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/KeyboardArrowRight';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleDropdownClick = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setProfileMenuOpen(false);
        }
    };

    useEffect(() => {
        if (profileMenuOpen) {
            document.addEventListener('click', handleClickOutside, true);
        } else {
            document.removeEventListener('click', handleClickOutside, true);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [profileMenuOpen]);

    return (
        <>
            <div className='md:hidden shadow-md w-full '>
                <button
                    id="menu-toggle"
                    className="px-2 py-2 hover:bg-blue-50 rounded-md"
                    onClick={toggleMenu}

                >
                    <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                </button>
            </div >
            <div className={`${isOpen ? "" : "hidden"} transition-all duration-300 ease-in-out md:flex px-auto py-5 bg-slate-50 w-fit h-screen sticky top-0  justify-center items-center z-60`}>
                <ul className="flex flex-col px-2 py-2 gap-4 ">
                    <li className="sidebar-item">
                        <Link to="/admin" className="flex gap-3">
                            <DashboardIcon className="sidebar-icon" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <div onClick={() => handleDropdownClick(2)} className="flex gap-3">
                            <ShoppingCartIcon />
                            Products
                            {openDropdown === 2 ? <ExpandLessIcon className="dropdown-icon" /> : <ExpandMoreIcon className="dropdown-icon" />}
                        </div>
                        <Collapse in={openDropdown === 2} timeout="auto" unmountOnExit>
                            <ul className="pl-5 py-2">
                                <li className="px-2 py-2 flex gap-3">
                                    <Link to="/addproduct" className="sidebar-link">Add Product</Link>
                                </li>
                                <li className="px-2 py-2">
                                    <Link to="/viewproducts" className="sidebar-link">View Products</Link>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <div onClick={() => handleDropdownClick(3)} className="flex gap-3">
                            <AssignmentIcon />
                            <button className="flex gap-3">Orders
                                {openDropdown === 3 ? <span><ExpandLessIcon className="dropdown-icon" /></span> : <ExpandMoreIcon className="dropdown-icon" />}
                            </button>
                        </div>
                        <Collapse in={openDropdown === 3} timeout="auto" unmountOnExit>
                            <ul className="pl-5 py-2">
                                <button className="px-2 py-2 flex gap-3">All </button>
                                <button className="px-2 py-2 flex gap-3">Pending </button>
                            </ul>
                        </Collapse>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;