import { Router } from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { demo } from "../controllers/userController.js";
const router = Router();try {
    
    router.route('/upload').post(upload.single("avatar"), demo)
} catch (error) {
    console.log(error);
}
export default router;
