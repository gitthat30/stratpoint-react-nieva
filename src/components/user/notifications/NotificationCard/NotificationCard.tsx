import React from "react";
import { Bell, DollarSign, CreditCard } from 'lucide-react';
import { Notification, NotifiactionTypeEnum } from "./types"


interface NotificationCardProps {
    notification: Notification
}

export function NotificationCard( { notification } : NotificationCardProps ) {
    const getIcon = (type : NotifiactionTypeEnum) => {
      switch (type) {
        case NotifiactionTypeEnum.Alert:
          return <Bell className="text-yellow-500" />;
        case NotifiactionTypeEnum.Transaction:
          return <DollarSign className="text-green-500" />;
        case NotifiactionTypeEnum.Card:
          return <CreditCard className="text-blue-500" />;
        default:
          return <Bell className="text-gray-500" />;
      }
    };

    return (
        <div key={notification.id} className="bg-card-background shadow overflow-hidden sm:rounded-lg p-4 flex items-start">
          <div className="flex-shrink-0 mr-4">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-header-text">{notification.message}</p>
            <p className="text-sm text-card-text-small">{notification.time}</p>
          </div>
        </div>
    )
}