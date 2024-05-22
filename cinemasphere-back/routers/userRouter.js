import express from 'express';
import {
  getUserController,
  getAllUsersController,
  updateUserController,
} from '../controllers/userController';

const router = express.Router();

router.get('/:id', getUserController);
router.get('/', getAllUsersController);
router.put('/:id', updateUserController);

export default router;
