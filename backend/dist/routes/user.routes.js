import express from 'express';
import userController from '../controllers/user.controllers.js';
import userAuth from '../middlewares/userAuth.js';
const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/confirm-token', userAuth, userController.confirmToken);
export default userRouter;
