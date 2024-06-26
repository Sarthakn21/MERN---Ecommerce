import { useState, useRef, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { getProductById } from '../../actions/productActions';
import { useSnackbar } from "notistack";
import { clearError } from '../../slice/productSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
const product = {
    name: 'Basic Tee 6-Pack',
    price: '₹300',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const allSizes = [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '2XL',
    '3XL',
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const { loading, error, products, totalProducts } = useSelector((state) => state.product);
    const { loading: cartLoading, error: cartError, CartSuccess } = useSelector((state) => state.cart);
    const [selectedSize, setSelectedSize] = useState("xl")
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [touchStartX, setTouchStartX] = useState(null);
    const touchRef = useRef(null);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleTouchStart = (event) => {
        setTouchStartX(event.touches[0].clientX);
    };
    const handleTouchMove = (event) => {
        if (!touchStartX || !touchRef.current) return;

        const touchCurrentX = event.touches[0].clientX;
        const diffX = touchStartX - touchCurrentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                handleNextImage();
            } else {
                handlePreviousImage();
            }
            setTouchStartX(null);
        }
    };
    const handleNextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % products[0].images.length)
    }

    const handlePreviousImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + products[0].images.length) % products[0].images.length)
    }
    const handleAddToCart = (event) => {
        event.preventDefault();
        dispatch(addToCart({ productId }));
    };
    useEffect(() => {
        dispatch(getProductById(productId))
    }, [dispatch, productId])

    useEffect(() => {
        if (CartSuccess) {
            enqueueSnackbar("Product added to cart", { variant: "success" });
            dispatch(clearError());
        }
        if (error || cartError) {
            if (error?.statusCode == 400 || error?.statusCode == 404 || cartError?.statusCode == 404 || cartError?.statusCode == 400) {
                dispatch(clearError());
                enqueueSnackbar("Invalid Product", { variant: "error" });
            }
            else if (error?.statusCode == 401 || cartError?.statusCode == 401) {
                enqueueSnackbar("Please login to access", { variant: "error" });
                dispatch(clearError());
                navigate("/")
            }
        }
    }, [error, cartError, enqueueSnackbar, dispatch, CartSuccess]);
    return (
        <>
            <div className="bg-white py-12">

                {cartLoading || loading || totalProducts == 0 ? (<Loader />) : (
                    <div className="pt-6 flex flex-col  lg:flex-row">
                        <div className="mx-auto mt-2 md:max-w-7xl md:px-8 md:py-5">
                            <div onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                ref={touchRef}
                                className="relative h-[400px] w-[100%] md:h-[500px] md:w-[500px] rounded-xl overflow-hidden aspect-h-4 aspect-w-3 transition-transform duration-300">
                                <img
                                    src={products[0].images[currentImageIndex].url}
                                    alt="Image not found"
                                    className="h-full w-full object-contain"
                                    loading='lazy'
                                />
                                <button
                                    type="button"
                                    onClick={handlePreviousImage}
                                    className="text-gray-300 absolute inset-0 top-[50%] left-2 max-h-fit max-w-fit rounded-[50%]"
                                >
                                    <ArrowCircleLeftRoundedIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextImage}
                                    className="text-gray-300 absolute right-2 top-[50%] max-h-fit max-w-fit rounded-[50%] "
                                >
                                    <ArrowCircleRightRoundedIcon />
                                </button>
                            </div>

                        </div>
                        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{products[0].name}</h1>
                            </div>
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <p className="text-3xl tracking-tight text-gray-900">{`₹ ${products[0].price}`}</p>
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        products[0].ratings > rating ? 'text-gray-900' : 'text-gray-200',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            {products[0].numOfReview} reviews
                                        </a>
                                    </div>
                                </div>

                                <form className="mt-10" onSubmit={handleAddToCart}>
                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                Size guide
                                            </a>
                                        </div>

                                        <fieldset aria-label="Choose a size" className="mt-4">
                                            <RadioGroup
                                                value={selectedSize}
                                                onChange={setSelectedSize}
                                                className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-4 "

                                            >
                                                {allSizes.map((size) => (
                                                    <Radio
                                                        key={size}
                                                        value={size}
                                                        disabled={products[0].stock <= 0}
                                                        className={({ focus }) =>
                                                            classNames(
                                                                products[0].size.includes(size.toLowerCase())
                                                                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                focus ? 'ring-2 ring-indigo-500' : '',
                                                                'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                            )
                                                        }
                                                    >
                                                        {({ checked, focus }) => (
                                                            <>
                                                                <span>{size}</span>
                                                                {products[0].size.includes(size.toLowerCase()) ? (
                                                                    <span
                                                                        className={classNames(
                                                                            checked ? 'border-indigo-500' : 'border-transparent',
                                                                            focus ? 'border' : 'border-2',
                                                                            'pointer-events-none absolute -inset-px rounded-md'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                    >
                                                                        <svg
                                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                            viewBox="0 0 100 100"
                                                                            preserveAspectRatio="none"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                        </svg>
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={products[0].stock <= 0}
                                        className={`${products[0].stock <= 0 ? "cursor-not-allowed bg-indigo-300 text-gray-200" : "bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "} px-8 py-3 text-base font-medium text-white mt-10 flex w-full items-center justify-center rounded-md border border-transparent `}
                                    >
                                        Add to bag
                                    </button>
                                </form>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                <div>
                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{products[0].description}</p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                    <div className="mt-4">
                                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                            {product.highlights.map((highlight) => (
                                                <li key={highlight} className="text-gray-400">
                                                    <span className="text-gray-600">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                    <div className="mt-4 space-y-6">
                                        <p className="text-sm text-gray-600">{product.details}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
