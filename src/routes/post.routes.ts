import { Router } from 'express';
import { 
  getPostsByUserId, 
  createPost, 
  deletePost 
} from '../controllers/post.controller';
import { 
  postValidation, 
  userIdQueryValidation,
  postIdParamValidation,
  validateRequest 
} from '../middleware/validation.middleware';

const router = Router();

router.get('/', userIdQueryValidation, validateRequest, getPostsByUserId);
router.post('/', postValidation, validateRequest, createPost);
router.delete('/:id', postIdParamValidation, validateRequest, deletePost);

export default router;
