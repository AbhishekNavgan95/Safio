import express from 'express';
import { uploadImage, deleteImage } from '../controllers/upload.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Upload image route (protected)
router.post('/upload', verifyToken, uploadImage);

// Delete image route (protected)
router.delete('/delete/:publicId', verifyToken, deleteImage);

export default router;
