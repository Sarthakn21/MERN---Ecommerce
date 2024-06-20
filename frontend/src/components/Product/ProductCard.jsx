import React from 'react'
import { Link } from 'react-router-dom'
const ProductCard = ({ products }) => {
    return (
        products.map((product) => (
            <Link to={`/product/detail/${product._id}`} key={product._id} className="group relative hover:inset-0" target="_blank"
                rel="noopener noreferrer">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 h-48">
                    <img
                        src={product.images[0].url}
                        alt={product.imageAlt}
                        className="w-full h-full object-cover object-center group-hover:opacity-75"
                        loading='lazy'
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name}
                            </a>
                        </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
            </Link>
        ))
    )
}

export default ProductCard
