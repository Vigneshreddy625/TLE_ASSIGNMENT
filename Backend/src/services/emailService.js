import nodemailer from 'nodemailer';
import User from '../models/user.model.js';
import ProblemStats from '../models/problems.model.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendInactivityReminder = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.autoEmailEnabled) return;

    const emailContent = `
      <h2>Time to get back to coding! 🚀</h2>
      <p>Hi ${user.name},</p>
      <p>We noticed you haven't solved any problems on Codeforces in the last 7 days.</p>
      <p>Keep up your coding practice and maintain your momentum!</p>
      <p>Happy coding!</p>
    `;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: 'Get back to coding! - Codeforces Reminder',
      html: emailContent,
    });

    user.reminderEmailCount += 1;
    await user.save();

    console.log(`Sent inactivity reminder to ${user.email}`);
  } catch (error) {
    console.error(`Error sending email to user ${userId}:`, error.message);
  }
};

export const checkInactiveUsers = async () => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const users = await User.find({ autoEmailEnabled: true });

    for (const user of users) {
      const recentSubmissions = await ProblemStats.find({
        user: user._id,
        date: { $gte: sevenDaysAgo }
      }).limit(1);

      if (recentSubmissions.length === 0) {
        await sendInactivityReminder(user._id);
      }
    }

    console.log('Completed inactivity check');
  } catch (error) {
    console.error('Error checking inactive users:', error.message);
  }
};