import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.use('/users', verifyToken, createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true }));
router.use('/orders', verifyToken, createProxyMiddleware({ target: process.env.ORDER_SERVICE_URL, changeOrigin: true }));
router.use('/products', createProxyMiddleware({ target: process.env.PRODUCT_SERVICE_URL, changeOrigin: true }));

export default router;
