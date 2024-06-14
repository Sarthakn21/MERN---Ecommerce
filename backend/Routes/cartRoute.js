import { Router } from "express";
import { addToCart, getCart, updateCartProduct, removeCartProduct } from "../controllers/cartController.js";
import isAuthenticatedUser from "../middlewares/auth.js";
const router = Router();

router.route('/').get(isAuthenticatedUser, getCart)
router.route('/add').post(isAuthenticatedUser, addToCart)
router.route('/update').patch(isAuthenticatedUser, updateCartProduct)
router.route('/remove/:productId').delete(isAuthenticatedUser, removeCartProduct)



export default router;