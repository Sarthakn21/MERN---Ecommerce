import { Router } from "express";
import isAuthenticatedUser from "../middlewares/auth.js";
import { createOrder } from "../controllers/orderController.js";
const router = Router();

router.route('/create').post(isAuthenticatedUser, createOrder)



export default router;