import User from '../models/user.model.js';

export const saveEmailSettings = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.autoEmailEnabled = !user.autoEmailEnabled;
    await user.save();

    res
      .status(200)
      .json({
        message: 'Auto-email status updated',
        autoEmailEnabled: user.autoEmailEnabled,
      });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEmailSettings = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id,
      'autoEmailEnabled reminderEmailCount lastReminderSentAt' 
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      autoEmailEnabled: user.autoEmailEnabled,
      reminderEmailCount: user.reminderEmailCount,
      lastReminderSentAt: user.lastReminderSentAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};