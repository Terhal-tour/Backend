import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getLimitEarlyActiveEvents
} from '../controllers/EventController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createEventValidation, updateEventValidation } from '../validations/eventValidation.js';
import { validateInput } from '../middlewares/validateInput.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const eventRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management
 */

/**
 * @swagger
 * /events/eventsinHome:
 *   get:
 *     summary: Get a limited number of early active events (public)
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of early active events
 */
eventRouter.get('/eventsinHome', getLimitEarlyActiveEvents);

// Protect routes with auth
eventRouter.use(authMiddleware);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
eventRouter.get('/', getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details
 */
eventRouter.get('/:id', getEventById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create new event (Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Event created successfully
 */
eventRouter.post('/', createEventValidation, validateInput, isAdmin, createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event by ID (Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event updated successfully
 */
eventRouter.put('/:id', updateEventValidation, validateInput, isAdmin, updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID (Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 */
eventRouter.delete('/:id', isAdmin, deleteEvent);

/**
 * @swagger
 * components:
 *   schemas:
 *     EventInput:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - endDate
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         location:
 *           type: string
 *         isActive:
 *           type: boolean
 */

export default eventRouter;
