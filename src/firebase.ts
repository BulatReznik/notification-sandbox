import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDexofb-Kh-l-PTYnbHOcLKsXnCsEoWcV8",
  authDomain: "push-sandbox-8f4c0.firebaseapp.com",
  projectId: "push-sandbox-8f4c0",
  storageBucket: "push-sandbox-8f4c0.firebasestorage.app",
  messagingSenderId: "827152435346",
  appId: "1:827152435346:web:67c68775016e2f55a0fe4b"
}

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

export const getFirebaseToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, {
      vapidKey: 'BESwo8Y1SpfOwVMyGMGDOoLNCnw96f7Gse0fHcS91-4ZBMsaYDRzzo2L-6c-DLkg_ypuPnRWLKJEDRQHuUjFNPU' // Замените на свой ключ VAPID
    })
    if (token) {
      console.log('Firebase token:', token)
      return token
    } else {
      console.error('No registration token available')
      return null
    }
  } catch (error) {
    console.error('Error getting Firebase token:', error)
    return null
  }
}

// Функция для обработки сообщений
export const setupFirebaseMessaging = (onMessageCallback: (payload: any) => void) => {
  if (typeof onMessageCallback !== 'function') {
    throw new Error('onMessageCallback must be a function')
  }

  // Слушаем новые сообщения и передаем их в callback
  onMessage(messaging, (payload) => {
    console.log('Message received: ', payload)
    onMessageCallback(payload)
  })
}
