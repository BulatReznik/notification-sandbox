// src/api/notification.ts

export const sendPushNotification = async (token: string, title: string, body: string) => {
    const url = 'https://localhost:7171/api/v1/push-notifications/send';
    const data = {
      token: token,
      title: title,
      body: body
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const result = await response.json();
      console.log('Push notification sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw error;
    }
  };