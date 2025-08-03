import express from 'express';
import { isAdmin } from '../middleware/auth.middleware.js';
import {
  createModule,
  updateModule,
  deleteModule,
  getModule,
  getAllModules,
} from '../controllers/module.controller.js';

const router = express.Router();

// Admin routes (require admin authentication)
router.post('/', isAdmin, createModule);
router.put('/:id', isAdmin, updateModule);
router.delete('/:id', isAdmin, deleteModule);

// Public routes
router.get('/', getAllModules);
router.get('/:id', getModule);

export default router;
