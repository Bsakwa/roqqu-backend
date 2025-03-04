import { Router } from 'express';
import { 
  getUsers, 
  getUserCount, 
  getUserById, 
  createUser 
} from '../controllers/user.controller';
import { 
  userValidation, 
  userIdParamValidation,
  paginationValidation, 
  validateRequest 
} from '../middleware/validation.middleware';

const router = Router();

router.get('/', paginationValidation, validateRequest, getUsers);
router.get('/count', getUserCount);
router.get('/:id', userIdParamValidation, validateRequest, getUserById);
router.post('/', userValidation, validateRequest, createUser);

export default router;
