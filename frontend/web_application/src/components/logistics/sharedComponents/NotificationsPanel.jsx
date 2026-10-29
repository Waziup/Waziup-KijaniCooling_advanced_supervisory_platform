import React from 'react';
import { Link } from 'react-router-dom';
import NotificationItem from './NotificationItem';

const NotificationsPanel = ({ notifications = [], status = 'success' }) => {
  const hasNotifications = Array.isArray(notifications) && notifications.length > 0;

  return (
    <section className="bg-white rounded-xl border border-green-300 shadow-sm p-5 flex flex-col">
      <h3 className="text-[20px] font-bold text-gray-900 mb-3">Notifications</h3>

      {status === 'loading' && (
        <p className="text-[14px] text-gray-500">Loading notifications…</p>
      )}

      {status !== 'loading' && !hasNotifications && (
        <p className="text-[14px] text-gray-500">No notifications available.</p>
      )}

      {status !== 'loading' && hasNotifications && (
        <ul className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              severity={notification.severity}
              title={notification.title}
              message={notification.message}
              timestamp={notification.timestamp}
            />
          ))}
        </ul>
      )}

      <Link
        to="/notifications"
        className="mt-4 inline-flex items-center justify-center rounded-md bg-[#F8D300] hover:bg-yellow-400 px-4 py-2 text-[14px] font-bold text-black shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-700"
      >
        See all notifications
      </Link>
    </section>
  );
};

export default NotificationsPanel;
