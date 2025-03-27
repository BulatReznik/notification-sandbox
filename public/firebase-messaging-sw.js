import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDexofb-Kh-l-PTYnbHOcLKsXnCsEoWcV8",
  authDomain: "push-sandbox-8f4c0.firebaseapp.com",
  projectId: "push-sandbox-8f4c0",
  storageBucket: "push-sandbox-8f4c0.firebasestorage.app",
  messagingSenderId: "827152435346",
  appId: "1:827152435346:web:67c68775016e2f55a0fe4b"
});

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});