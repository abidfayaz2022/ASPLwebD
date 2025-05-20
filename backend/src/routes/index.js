import express from 'express';
import authRoutes from './authRoutes.js';
import fileRoutes from './fileRoutes.js';
import incorporationRoutes from './incorporationRoutes.js';
// import adminRoutes from './adminRoutes.js';
import companyRoutes from './companyRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import userRoutes from './userRoutes.js';
import articlRoutes from './articleRoutes.js';
// import userRoutes from './userRoutes.js';

const router = express.Router();

// router.use('/health', healthRoutes);

router.use('/auth', authRoutes);
router.use('/files', fileRoutes);
router.use('/incorporation', incorporationRoutes);
// router.use('/admin', adminRoutes);
router.use('/company', companyRoutes);
router.use('/payment', paymentRoutes); // Assuming companyRoutes handles payments as well
router.use('/article', articlRoutes);
router.use('/user', userRoutes);

export default router;
