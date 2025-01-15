
const Notifications = require('../models/notifications');

const getUnreadNotifications = async (req, res) => {
    try {
      const { user_id } = req.params;

      const notifications = await Notifications.findAll({
        where: {
          user_id,
          read: false,
        },
        order: [["created_at", "DESC"]],
      });

      res.json(notifications, {success:true, message: 'Retrieving Unread Notifications'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mark notification as read
  const markAsRead = async (req, res) => {
    try {
      const { id } = req.params;

      await Notifications.update({ read: true }, { where: { id } });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
  getUnreadNotifications,
  markAsRead
};
