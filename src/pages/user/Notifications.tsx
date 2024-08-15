import React, {useState} from "react";
import { NotificationCard, Notification, NotifiactionTypeEnum } from "../../components/user/notifications";

export function Notifications() {
    const [ notifications ] = useState<Notification[]>([
        { id: 1, type: NotifiactionTypeEnum.Alert, message: 'Low balance in your checking account', time: '2 hours ago' },
        { id: 2, type: NotifiactionTypeEnum.Transaction, message: 'You received $500 from John Doe', time: '1 day ago' },
        { id: 3, type: NotifiactionTypeEnum.Card, message: 'Your new credit card has been shipped', time: '3 days ago' },
      ]);
    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
            ))}
        </div>
    )
}