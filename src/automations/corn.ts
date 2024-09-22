import cron from 'node-cron';

export const useAutomation = () => {
  cron.schedule('* * * * * *', () => {
    console.log('Running a task every minute');
    // Add your logic here (e.g., database cleanup, sending emails, etc.)
  });
};
