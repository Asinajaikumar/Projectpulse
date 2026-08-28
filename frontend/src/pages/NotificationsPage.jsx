import React, { useState, useEffect } from 'react';
import NotificationCenter from '../components/notifications/NotificationCenter';
import notificationApi from '../api/notificationApi';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifs = async () => {
      setLoading(true);
      try {
        const data = await notificationApi.getNotifications();
        setNotifications(data);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifs();
  }, []);

  const handleMarkAsRead = async (id) => {
    await notificationApi.markAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = async () => {
    await notificationApi.markAllAsRead();
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading notifications...</div>;
  }

  return (
    <NotificationCenter
      notifications={notifications}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllRead={handleMarkAllRead}
    />
  );
};

export default NotificationsPage;
