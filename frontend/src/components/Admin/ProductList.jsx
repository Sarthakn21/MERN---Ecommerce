import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { adminproduct, deleteProduct } from '../../actions/productActions';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
    { field: 'mainCategory', headerName: 'Main Category', flex: 1 },
    { field: 'subCategory', headerName: 'Sub Category', minWidth: "fit-content", flex: 1 },
    { field: 'ratings', headerName: 'Ratings', type: 'number', flex: 0.5 },
    { field: 'stock', headerName: 'Stock', type: 'number', flex: 0.5 },
    { field: 'numOfReview', headerName: 'Reviews', type: 'number', minWidth: "fit-content", flex: 0.5 },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 0.5,
        minWidth: "fit-content",
        renderCell: (params) => {
            const dispatch = useDispatch();
            const handleDelete = () => {
                dispatch(deleteProduct(params.row.productId));
                console.log(params.row.productId)
            };

            return (
                <>
                    <Link to={`/product/edit/${params.row.productId}`}><IconButton aria-label="delete" size="small">
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    </Link>
                    <IconButton aria-label="delete" size="small" onClick={handleDelete}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>

                </>
            );
        },
    },
];

export default function ProductList() {
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const rows = products.map((product, index) => ({
        id: index + 1,
        productId: product._id,
        name: product.name,
        price: product.price,
        mainCategory: product.category.main,
        subCategory: product.category.sub || '',
        ratings: product.ratings,
        stock: product.stock,
        numOfReview: product.numOfReview,
    }));

    useEffect(() => {
        dispatch(adminproduct())
    }, [dispatch]);

    return (
        <Box sx={{ height: "fit-content", width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell': {
                        justifyContent: 'flex-start',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        justifyContent: 'flex-start',
                        backgroundColor: 'skyblue',
                    },
                }}
            />
        </Box>
    );
}
