import { PhotoIcon } from '@heroicons/react/24/solid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../actions/productActions.js';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { clearError, resetSuccess } from '../../slice/productSlice.js';
import Sidebar from '../Admin/Sidebar.jsx';

export default function CreateProduct() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, error, success } = useSelector((state) => state.product);

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleStockChange = (event) => {
        setStock(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleProductCategoryChange = (event) => {
        setProductCategory(event.target.value);
    };

    const handleSubCategoryChange = (event) => {
        setSubCategory(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length + files.length > 4) {
            alert('You can only upload a maximum of 4 files');
            return;
        }
        const selectedPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setPreviews((prevPreviews) => [...prevPreviews, ...selectedPreviews]);
    };

    const handleRemoveImage = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('mainCategory', productCategory);
        formData.append('subCategory', subCategory);
        formData.append('price', price);
        formData.append('stock', stock);
        files.forEach((file) => {
            formData.append("file", file);
        });
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        dispatch(createProduct(formData))
    };
    useEffect(() => {

        if (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            dispatch(clearError());
        } else if (success) {
            enqueueSnackbar("Product added successfully", { variant: 'success' });
            dispatch(clearError());
            dispatch(resetSuccess());
            setDescription("")
            setStock(0);
            setPrice(0);
            setFiles([]);
            setPreviews([]);
            setProductName("");
            setProductCategory("");
            setSubCategory("");

        }

    }, [dispatch, error, success, enqueueSnackbar])
    return (
        <div className='flex flex-col md:flex-row w-screen gap-1'>
            <div className=''>
                <Sidebar />
            </div>
            <div className='w-full'>
                <form onSubmit={handleSubmit}>
                    <div className='px-5 py-5'>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-xl font-semibold leading-7 text-gray-900">Add Product</h2>
                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Name
                                        </label>
                                        <div className="mt-2">
                                            <TextField
                                                id="product-name"
                                                label="Name"
                                                variant="standard"
                                                fullWidth
                                                value={productName}
                                                onChange={handleProductNameChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <TextField
                                                id="price"
                                                label="Price"
                                                variant="standard"
                                                fullWidth
                                                value={price}
                                                onChange={handlePriceChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                            Stock
                                        </label>
                                        <div className="mt-2">
                                            <TextField
                                                id="stock"
                                                label="Stock"
                                                variant="standard"
                                                fullWidth
                                                value={stock}
                                                onChange={handleStockChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <TextField
                                                id="description"
                                                label="Description"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                minRows={5}
                                                value={description}
                                                onChange={handleDescriptionChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="product-category" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Category
                                        </label>
                                        <div className="mt-2">
                                            <FormControl variant="standard" fullWidth>
                                                <Select
                                                    labelId="product-category-label"
                                                    id="product-category"
                                                    value={productCategory}
                                                    onChange={handleProductCategoryChange}
                                                    fullWidth
                                                >
                                                    <MenuItem value={"Bag"}>Bag</MenuItem>
                                                    <MenuItem value={"mens"}>Mens</MenuItem>
                                                    <MenuItem value={"womens"}>Womens</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="sub-category" className="block text-sm font-medium leading-6 text-gray-900">
                                            Sub Category
                                        </label>
                                        <div className="mt-2">
                                            <FormControl variant="standard" fullWidth>
                                                <Select
                                                    labelId="sub-category-label"
                                                    id="sub-category"
                                                    value={subCategory}
                                                    onChange={handleSubCategoryChange}
                                                    fullWidth
                                                >
                                                    <MenuItem value={"footwear"}>footwear</MenuItem>
                                                    <MenuItem value={"trousers"}>trousers</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full border-b border-gray-900/10 pb-12">
                            <label htmlFor="product-images" className="block text-sm font-medium leading-6 mt-5 text-gray-900">
                                Product Images
                            </label>
                            <div className="mt-5 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-3">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload files</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 2MB each, max 4 files</p>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center justify-center gap-10">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img src={preview} alt={`Preview ${index}`} className="h-32 w-32 object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="mt-2 block w-full text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Button variant="text" onClick={() => setLoading(!loading)}>Cancel</Button>
                            <LoadingButton
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                type='submit'
                            >
                                Create
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}