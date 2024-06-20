import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./components/Product/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import Slider from "@mui/material/Slider";
import { getAllProducts } from "./actions/productActions";

const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '250',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Pencil',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '150',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '400',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Bottle',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '300',
        color: 'Basic',
    },
    {
        id: 5,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-05.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '200',
        color: 'Black',
    },
    // More products...
]
const filters = [
    {
        name: 'Category',
        options: ["Mens", "Women", "kids"]
    },
    {
        name: 'Sub Category',
        options: ["Shirt", "T-shirt", "Trousers", "Ethnic", "Formal", "Footwear", "Groccery", "Watch"]
    },
]

export default function Example() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [price, setPrice] = useState([0, 25000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ratings, setRatings] = useState(0);
    const { category } = useParams();

    const { loading, error, products } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleCategoryChange = (option) => {
        if (selectedCategory === option) {
            setSelectedCategory("");
            return;
        }
        setSelectedCategory(option.toLowerCase());
    };
    const handleSubCategoryChange = (option) => {
        if (selectedSubCategory === option) {
            setSelectedSubCategory("");
            return;
        }
        setSelectedSubCategory(option.toLowerCase());
    };
    const priceChange = (event, newPrice) => {
        setPrice(newPrice);
    };
    useEffect(() => {
        dispatch(getAllProducts({
            category,
            subcategory: selectedSubCategory,
            price,
            ratings: 0,
        }))
    }, [selectedCategory, selectedSubCategory, price, ratings])
    return (
        <div className="bg-white py-16 flex flex-col lg:flex-row gap-4">
            <div className="hidden lg:block lg:w-1/6 px-2">
                {filters.map((filter) => (
                    <div className="border-t border-red-500 px-4 py-6" key={filter.name}>
                        <button className="flex w-full items-center justify-between bg-white px-1 py-1 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{filter.name}</span>
                        </button>
                        <div className="pt-1 space-y-6">
                            <div>
                                {filter.options.map((option, idx) => (
                                    <div key={`${filter.name}-${idx}`} className="flex items-center">
                                        <input
                                            id={`${filter.name}-${option}`}
                                            name={`${filter.name}-${option}`}
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            onChange={() => {
                                                if (filter.name === 'Category') {
                                                    handleCategoryChange(option);
                                                } else if (filter.name === 'Sub Category') {
                                                    handleSubCategoryChange(option);
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor={`${filter.name}-${option}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                        >
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="border-t border-red-500 px-4 py-6">
                    <p>Price</p>
                    <Slider
                        value={price}
                        onChange={priceChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                </div>
            </div>
            <div className="mx-auto max-w-2xl py-2 lg:max-w-7xl px-5">
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                    <ProductCard products={products} />
                </div>
            </div>
        </div>
    );
}
