import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative bg-cover bg-center" style={{ backgroundImage: 'url(src/assets/landing.jpg)', height: '600px' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="container mx-auto h-full flex items-center justify-center text-center relative z-10 px-4">
                <div className="text-white">
                    <h1 className="md:text-5xl font-bold mb-4 text-3xl">Welcome to Brand Bucket</h1>
                    <p className="text-lg mb-14">Discover the latest trends in fashion</p>
                    {/* Link to the shop page */}
                    <Link to="/shop" className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-6 md:px-6 rounded-xl md:text-2xl py-2 px-4">
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
};


export default HeroSection;
