// src/api/subscribe.ts

export const subscribeToPushNotifications = async (token: string) => {
    const url = 'https://localhost:7171/api/v1/push-notifications';
    const data = {
        token: token,
        hardwareDeviceId: "7a7a2c7e-4668-4fab-8365-ef80b0e50602",
        platform: "Web"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Custom-User': '7a7a2c7e-4668-4fab-8365-ef80b0e50602'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error('Error subscribing to push notifications:', error);
        throw error;
    }
};
