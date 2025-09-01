"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Bell, X, CheckCircle, AlertCircle, Info, Star, MessageSquare, TrendingUp } from 'lucide-react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Auto-add demo notifications
  useEffect(() => {
    const demoNotifications = [
      {
        type: 'success',
        title: 'Welcome to AI Career Coach!',
        message: 'Your account has been successfully created.',
        icon: CheckCircle
      },
      {
        type: 'info',
        title: 'New Feature Available',
        message: 'Try our new AI-powered resume builder.',
        icon: Info
      },
      {
        type: 'warning',
        title: 'Profile Update Reminder',
        message: 'Complete your profile to get personalized recommendations.',
        icon: AlertCircle
      }
    ];

    const addDemoNotifications = () => {
      demoNotifications.forEach((notification, index) => {
        setTimeout(() => {
          addNotification(notification);
        }, index * 2000);
      });
    };

    addDemoNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, markAsRead, removeNotification, markAllAsRead, clearAll }}>
      {children}
      
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white relative"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed top-20 right-6 z-40 w-96 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="font-bold text-gray-800">Notifications</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
              >
                Mark all read
              </button>
              <button
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-600 transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 rounded-xl mb-2 transition-all duration-300 hover:bg-gray-50 cursor-pointer",
                        !notification.read && "bg-blue-50 border-l-4 border-blue-500"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          notification.type === 'success' && "bg-green-100 text-green-600",
                          notification.type === 'warning' && "bg-yellow-100 text-yellow-600",
                          notification.type === 'info' && "bg-blue-100 text-blue-600",
                          notification.type === 'error' && "bg-red-100 text-red-600"
                        )}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800 text-sm">
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-gray-600 text-xs mt-1">
                            {notification.message}
                          </p>
                          <p className="text-gray-400 text-xs mt-2">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// Toast Notification Component
const ToastNotification = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const IconComponent = notification.icon;

  return (
    <div
      className={cn(
        "fixed top-6 right-6 z-50 w-80 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 transform transition-all duration-300",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <div className="flex items-start space-x-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
          notification.type === 'success' && "bg-green-100 text-green-600",
          notification.type === 'warning' && "bg-yellow-100 text-yellow-600",
          notification.type === 'info' && "bg-blue-100 text-blue-600",
          notification.type === 'error' && "bg-red-100 text-red-600"
        )}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800">{notification.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export { NotificationProvider, ToastNotification };
