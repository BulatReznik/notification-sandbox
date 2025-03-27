// src/services/pushNotificationService.ts
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'

// Конфигурация Firebase
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDexofb-Kh-l-PTYnbHOcLKsXnCsEoWcV8",
    authDomain: "push-sandbox-8f4c0.firebaseapp.com",
    projectId: "push-sandbox-8f4c0",
    storageBucket: "push-sandbox-8f4c0.firebasestorage.app",
    messagingSenderId: "827152435346",
    appId: "1:827152435346:web:67c68775016e2f55a0fe4b"
})

console.log('12351252315215213')

const messaging = getMessaging(firebaseApp)

export const getFirebaseToken = async (): Promise<string | null> => {
    try {
        console.log(messaging)

        //const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { type: 'module' })
        const token = await getToken(messaging, {
            vapidKey: 'BEPSckFJxOW0dJsdG8UOvelL6C7Lj7gePfGaUBkTK_66ojHyhLTTuyVLs9_LepjSTHLum1akxS8X8eqGWA6PI-s',
            //serviceWorkerRegistration: registration
        })

        if (token) {
            return token
        } else {
            console.error('Не удалось получить токен')
            return null
        }
    } catch (error) {
        console.error('Ошибка при получении Firebase токена:', error)
        return null
    }
}

export const listenForMessages = (callback: (payload: any) => void): void => {
    onMessage(messaging, (payload) => {
        console.log('FCM: Получено сообщение:', payload)
        callback(payload)
    })
}
