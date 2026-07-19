import { useNotificationStore } from '../store/notificationStore';

const AlertToast = () => {
    const { notifications, dismissNotification } = useNotificationStore();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-80">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="bg-[#09121f] text-white rounded-md shadow-lg p-4"
                >
                    <div className="flex justify-between items-start gap-3">
                        <p className="text-sm">{notification.message}</p>
                        <button
                            className="text-gray-400 hover:text-white text-xs"
                            onClick={() => dismissNotification(notification.id)}
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        {notification.coin}: ${notification.price}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default AlertToast;
