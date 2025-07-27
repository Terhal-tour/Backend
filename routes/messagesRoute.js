import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/:from/:to', async (req, res) => {
  const { from, to } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { fromUserId: from, toUserId: to },
        { fromUserId: to, toUserId: from }
      ]
    }).sort({ time: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});



export default router;
