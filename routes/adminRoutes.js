import express from 'express';
import {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminById
} from '../controllers/AdminController.js';
import { createAdminValidation, updateAdminValidation } from '../validations/adminValidations.js';
import { validateInput } from '../middlewares/validateInput.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const adminRouter = express.Router();

// Protect all routes with auth
adminRouter.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Admin Management
 *   description: Manage admin users
 */

/**
 * @swagger
 * /admin/admins:
 *   get:
 *     summary: Get all admins (Admin only)
 *     tags: [Admin Management]
 *     responses:
 *       200:
 *         description: List of admins
 */
adminRouter.get('/', isAdmin, getAllAdmins);

/**
 * @swagger
 * /admin/admins/{id}:
 *   get:
 *     summary: Get admin by ID (Admin only)
 *     tags: [Admin Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin details
 */
adminRouter.get('/:id', isAdmin, getAdminById);

/**
 * @swagger
 * /admin/admins:
 *   post:
 *     summary: Add a new admin (Admin only)
 *     tags: [Admin Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin added successfully
 */
adminRouter.post('/', createAdminValidation, validateInput, isAdmin, addAdmin);

/**
 * @swagger
 * /admin/admins/{id}:
 *   put:
 *     summary: Update an admin by ID (Admin only)
 *     tags: [Admin Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated successfully
 */
adminRouter.put('/:id', updateAdminValidation, validateInput, isAdmin, updateAdmin);

/**
 * @swagger
 * /admin/admins/{id}:
 *   delete:
 *     summary: Delete an admin by ID (Admin only)
 *     tags: [Admin Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 */
adminRouter.delete('/:id', isAdmin, deleteAdmin);

export default adminRouter;
