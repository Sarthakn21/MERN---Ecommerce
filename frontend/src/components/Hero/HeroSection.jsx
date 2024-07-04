import React from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner_mens from '../assets/banner_mens.png';
import banner_women from '../assets/banner_women.png';
import banner_kids from '../assets/banner_kids.png'
import Shop from './Shop';
import winter from '../assets/winter.png'
import mens from '../assets/mens.png'
import women from '../assets/women.png'
import FeatureItem from '../Product/Featured';

const HeroSection = () => {
    return (
        <div className='flex flex-col justify-center items-center overflow-hidden py-12'>
            <div className='w-full flex py-8'>
                <Carousel
                    interval={2000}
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                >
                    <img src={banner_kids} alt="kids banner" />
                    <img src={banner_mens} alt="mens banner" />
                    <img src={banner_women} alt="" />
                </Carousel>
            </div>
            <div>
                <FeatureItem />
            </div>
            <div className='w-full flex py-8' >
                <Carousel
                    className='w-full'
                    interval={2000}
                    autoPlay={true}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    infiniteLoop={true}>
                    <div className="w-full">
                        <div className="mx-auto max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8">
                            <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
                                <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                                    <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">Winter Collection</h2>
                                    <p className="mt-2 text-lg">By top Brands</p>
                                    <p className="mt-4 mb-8 max-w-md text-gray-500">Browse thorught our exclusive collection for winter products.Products that are value for money</p>
                                    <a href="/product/men" className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition">
                                        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Shop now </span>
                                        <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
                                    <img className="h-full w-full object-cover" src={winter} loading="lazy" alt="winter collection" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mx-auto max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8">
                            <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
                                <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5 ">
                                    <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">Mens Collection</h2>
                                    <p className="mt-2 text-lg">By Raymond, Peter Englad and much more</p>
                                    <p className="mt-4 mb-8 max-w-md text-gray-500">Browse thorugh our wide range of must essential products for mens.</p>
                                    <a href="/product/men" className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition">
                                        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Shop now </span>
                                        <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
                                    <img className="h-full w-full object-cover" src={mens} loading="lazy" alt="winter collection" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mx-auto max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8">
                            <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
                                <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                                    <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">Women Collection</h2>
                                    <p className="mt-2 text-lg">By Zara and BIBA</p>
                                    <p className="mt-4 mb-8 max-w-md text-gray-500">The exclusive collection of top beauty and essential products for you</p>
                                    <a href="/product/women" className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition">
                                        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Shop now </span>
                                        <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
                                    <img className="h-full w-full object-cover" src={women} loading="lazy" alt="winter collection" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div >


        </div >
    );
};

export default HeroSection;
