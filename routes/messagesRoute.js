import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Chat messages between users
 */

/**
 * @swagger
 * /messages/{from}/{to}:
 *   get:
 *     summary: Get chat messages between two users
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         description: Sender user ID
 *       - in: path
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         description: Receiver user ID
 *     responses:
 *       200:
 *         description: List of chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing from or to user ID
 *       500:
 *         description: Failed to fetch messages
 */
router.get('/:from/:to', async (req, res) => {
  const { from, to } = req.params;

  if (!from || !to) {
    return res.status(400).json({ error: 'Both from and to user IDs are required' });
  }

  try {
    const messages = await Message.find({
      $or: [
        { fromUserId: from, toUserId: to },
        { fromUserId: to, toUserId: from }
      ]
    }).sort({ time: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fromUserId:
 *           type: string
 *         toUserId:
 *           type: string
 *         content:
 *           type: string
 *         time:
 *           type: string
 *           format: date-time
 */

export default router;
