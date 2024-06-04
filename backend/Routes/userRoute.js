import { Router } from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { deleteUser, demo, getAllUsers, getCurrentUser, getSingleUser, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/userController.js";
import isAuthenticatedUser from "../middlewares/auth.js";


const router = Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/getcurrentuser').get(isAuthenticatedUser, getCurrentUser);
router.route('/getalluser').get(isAuthenticatedUser, getAllUsers);
router.route('/getsingleuser/:id').get(isAuthenticatedUser, getSingleUser);
router.route('/delete/:id').delete(isAuthenticatedUser, deleteUser);
router.route('/updateprofile').put(isAuthenticatedUser, upload.single("avatar"), updateProfile);
router.route('/upload').post(upload.single("avatar"), demo)
export default router;
