import express from 'express';
import { getAllEvents,getEventById } from '../controllers/EventControler.js';
import {protect} from './../middlewares/auth.js';

const eventRouter=express.Router();

eventRouter.use(protect);
eventRouter.get('/',getAllEvents);
eventRouter.get('/:id',getEventById);

export default eventRouter;