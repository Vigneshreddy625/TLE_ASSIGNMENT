import cron from 'node-cron';
import User from '../models/user.model.js';
import { syncAllUsers } from "./codeforceServices.js"
import { checkInactiveUsers } from './emailService.js';

let syncCronJob = null;
let currentSchedule = '0 2 * * *'; 

export const startCronJobs = () => {
  syncCronJob = cron.schedule(currentSchedule, async () => {
    console.log('Starting scheduled sync...');
    await syncAllUsers();
    await checkInactiveUsers();
  }, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  });

  console.log(`Cron job started with schedule: ${currentSchedule}`);
};

export const updateCronSchedule = (newSchedule) => {
  if (syncCronJob) {
    syncCronJob.destroy();
  }
  
  currentSchedule = newSchedule;
  syncCronJob = cron.schedule(currentSchedule, async () => {
    console.log('Starting scheduled sync...');
    await syncAllUsers();
    await checkInactiveUsers();
  }, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  });

  console.log(`Cron job updated with new schedule: ${currentSchedule}`);
};

export const getCurrentSchedule = () => currentSchedule;

export const stopCronJobs = () => {
  if (syncCronJob) {
    syncCronJob.destroy();
    console.log('Cron job stopped');
  }
};