import { Router } from 'express'
import { createProduct, createReview, deleteProduct, getAllProducts, getAllReviews, getCategoryProduct, getProductById, updateProduct } from '../controllers/productController.js'
import { upload } from '../middlewares/multerMiddleware.js'
import isAuthenticatedUser from '../middlewares/auth.js'
const router = Router()

router.route('/create').post(isAuthenticatedUser, upload.array('file', 4), createProduct)
router.route('/updateproduct/:id').patch(isAuthenticatedUser, upload.array('file', 4), updateProduct)
router.route('/getproducts').get(isAuthenticatedUser, getAllProducts)
router.route('/getproducts/:id').get(getProductById)
router.route('/deleteproduct/:id').delete(isAuthenticatedUser, deleteProduct)
router.route('/addreview').post(isAuthenticatedUser, createReview)
router.route('/reviews').get(getAllReviews)
router.route('/getcategoryproduct').get(getCategoryProduct)

export default router;