import { onBackgroundMessage } from 'firebase/messaging/sw';

// Слушаем фоновое сообщение
onBackgroundMessage(self, (payload) => {
  console.log('Фоновое сообщение получено: ', payload);

  const notificationTitle = payload.notification?.title || 'Новое уведомление';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.icon || '/firebase-logo.png',
  };

  // Показываем уведомление
  self.registration.showNotification(notificationTitle, notificationOptions);
});
