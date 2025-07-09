import cron from 'node-cron';
import User from '../models/User.js';
import Favorite from '../models/Favorite.js';
import History from '../models/History.js';
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'logs', 'cron-log.txt');

function logToFile(message) {
  const now = new Date().toISOString();
  fs.appendFileSync(logFile, `[${now}] ${message}\n`);
}

cron.schedule('*/5 * * * *', async () => {
  logToFile('Starting cleanup of deactivated accounts');
  const ONE_HOUR = 1 * 60 * 60 * 1000;
  const cutoffDate = new Date(Date.now() - ONE_HOUR);

  const inactiveUsers = await User.find({
    isDeleted: true,
    updatedAt: { $lte: cutoffDate },
  });

  logToFile(`Found ${inactiveUsers.length} deactivated accounts`);

  for (const user of inactiveUsers) {
    await Favorite.deleteMany({ userId: user._id });
    await History.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);
    logToFile(`Deleted user ${user.email} and related data`);
  }

  logToFile('Deactivated accounts cleanup completed');
});
