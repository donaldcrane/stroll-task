import { Router } from 'express';
import userRoutes from './userRoutes';
import cycleRoutes from './cycleRoutes';
import regionRoutes from './regionRoutes';
import questionRoutes from './questionRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/cycles', cycleRoutes);
router.use('/regions', regionRoutes);
router.use('/questions', questionRoutes);

export default router;
