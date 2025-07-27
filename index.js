import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import redisClient from "./lib/redisClient.js";


import authRoutes from "./routes/authRoutes.js";
import profileRoute from "./routes/profileRoutes.js";
import favouriteRoutes from "./routes/place-routes/FavouritePlace.Route.js";
import ratingRoutes from "./routes/place-routes/RatingPlace.Route.js";
import placeRoutes from "./routes/placesRoutes.js";
import eventRouter from './routes/eventRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import adminAuthRouter from './routes/adminAuthRoutes.js';
import historyRoutes from './routes/user-routes/history.route.js';
import deleteRoutes from './routes/user-routes/deleteUser.route.js';
import favoriteRoutes from './routes/user-routes/favorite.route.js';
import assistantRouter from './routes/assestant.js';
import reviewRoutes from './routes/user-routes/review.route.js';
import categoryRouter from './routes/categoryRoutes.js';
import adminPlaceRoutes from './routes/adminPlaceRoutes.js';
import adminStatsRoutes from "./routes/adminStats.routes.js";
import { initUserSocket } from "./sockets/userSocket.js";
import { realTimeRouter } from "./routes/RealTimeRoutes.js";
import { guideRouter } from "./routes/GuideRouter.js";
import { guideRequestRouter } from "./routes/GuideRequestRouter.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import supportusRoutes  from "./routes/supportusRoutes.js"
import RandomplaceRoutes from "./routes/RandomPlacesRoute.js"
import postRoutes from './routes/user-interactions/postRoutes.js';
import commentsRoutes from './routes/user-interactions/commentRoutes.js';



dotenv.config();

const app = express();
const port = 3000;

//  app.use(express.json()) لازم تيجي دي قبل 
//  Stripe webhook must be raw
app.use("/payments/webhook", express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.use("/uploads", express.static(path.resolve("uploads")));
app.use('/auth', authRoutes);
app.use('/auth/admin',adminAuthRouter);
// admin place curd
app.use('/admin/place', adminPlaceRoutes); 
app.use("/admin/stats", adminStatsRoutes);
app.use('/admin', adminRouter);

// [MODIFIED] /places/suggested endpoint is now available for both anonymous and registered users
// favourite routes
app.use("/places", favouriteRoutes);

// Use the rating route
app.use("/places", ratingRoutes);
app.use("/places", placeRoutes);

//  event routes
app.use("/events", eventRouter);

//profile routes
app.use("/profile", profileRoute);

// user routes
app.use("/user", historyRoutes);
app.use("/user", deleteRoutes);
app.use("/user", favoriteRoutes);
app.use("/user/reviews", reviewRoutes);

// payment
app.use("/payments", paymentRoutes);

// support us routes
app.use("/supportus", supportusRoutes);

app.use("/assestant", assistantRouter);

app.use("/categories", categoryRouter);

app.use('/realTimeRecomendation',realTimeRouter);

app.use("/guide/request", guideRequestRouter);
app.use("/guide", guideRouter);

//Random places
app.use('/RanPlaces', RandomplaceRoutes);

app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

initUserSocket(io);

console.log("MONGO_URI =", process.env.MONGO_URI);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(port, () => {
//       console.log(`Server is running at http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });


(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
})();
