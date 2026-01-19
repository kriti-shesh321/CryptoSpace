import { register, login, getUser } from './auth.controller';
import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUser);

export default router;