import React, { useEffect, useState } from 'react';
import watch from '../assets/watch.png'
import kurta from '../assets/kurta.png'
import shoe from '../assets/shoe.png'
import s24 from '../assets/s24.png'
import { useDispatch, useSelector } from 'react-redux'
import { categoryWiseProduct } from '../../actions/productActions';
import { Link } from 'react-router-dom';

const FeatureItem = () => {
    return (
        <section className="py-16 bg-white sm:py-16 lg:py-20">
            <div div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl" >
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our featured Products</h2>
                    <p className="mt-4 text-base font-normal leading-7 text-gray-600">Browse through our categories to get the latest deals and offer on our products</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
                    <Link to='/product/men'><div className="relative group">
                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                            <img className="object-cover w-full max-h-[270px] transition-all duration-300 group-hover:scale-125" src={watch} alt="" />
                        </div>
                        <div className="absolute left-3 top-3">
                            <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">New</p>
                        </div>
                        <div className="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Titan mens G-398
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                    </a>
                                </h3>
                                <div className="flex items-center mt-2.5 space-x-px">
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">₹7000</p>
                            </div>
                        </div>
                    </div></Link>
                    <Link to="/product/electronics"><div className="relative group">
                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                            <img className="object-cover w-full max-h-[270px] transition-all duration-300 group-hover:scale-125" src={s24} alt="" />
                        </div>
                        <div className="absolute left-3 top-3">
                            <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">New</p>
                        </div>
                        <div className="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Samsung S24 Ultra
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                    </a>
                                </h3>
                                <div className="flex items-center mt-2.5 space-x-px">
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">₹1,20,000</p>
                            </div>
                        </div>
                    </div></Link>
                    <Link to='/product/men'><div className="relative group">
                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                            <img className="object-cover w-full max-h-[270px] transition-all duration-300 group-hover:scale-125" src={shoe} alt="" />
                        </div>
                        <div className="absolute left-3 top-3">
                            <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">New</p>
                        </div>
                        <div className="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Lavander white sneakers
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                    </a>
                                </h3>
                                <div className="flex items-center mt-2.5 space-x-px">
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">₹1500</p>
                            </div>
                        </div>
                    </div></Link>
                    <Link to='/product/men'><div className="relative group">
                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                            <img className="object-cover w-full max-h-[270px] transition-all duration-300 group-hover:scale-125" src={kurta} alt="" />
                        </div>
                        <div className="absolute left-3 top-3">
                            <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">New</p>
                        </div>
                        <div className="flex items-start justify-between mt-4 space-x-4">
                            <div>
                                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                    <a href="#" title="">
                                        Kurta
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                    </a>
                                </h3>
                                <div className="flex items-center mt-2.5 space-x-px">
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">₹1000</p>
                            </div>
                        </div>
                    </div></Link>
                </div>
            </div>
        </section >

    )
}
export default FeatureItem;