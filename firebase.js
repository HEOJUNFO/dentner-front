import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase 설정 정보 (Firebase Console에서 가져온 설정)
const firebaseConfig = {
  apiKey: 'AIzaSyB0DguKMxNWDVN8ZVckQgctTTCtPfkLx6k',
  authDomain: 'dentner-d9625.firebaseapp.com',
  projectId: 'dentner-d9625',
  storageBucket: 'dentner-d9625.firebasestorage.app',
  messagingSenderId: '74631289067',
  appId: '1:74631289067:web:16c4adb6f1c69b626046ae',
  measurementId: 'G-VLCTJM48TX',
};
// Firebase 초기화
const app = initializeApp(firebaseConfig);

// FCM 초기화 (브라우저 환경에서만 실행)
let messaging;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  try {
    messaging = getMessaging(app);
  } catch (error) {
    alert(error);
  }
}

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {

    await navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker 등록 완료1111:', registration);
        })
        .catch((error) => {
          console.error('Service Worker 등록 실패2222:', error);
        });
  } else {
    console.log('Service workers are not supported.333');
  }
}

// 브라우저 알림 권한 요청 및 FCM 토큰 가져오기
export const requestPermissionAndGetToken = async () => {
  try {
    if (!messaging) {
      console.error('Messaging 객체가 초기화되지 않았습니다. 브라우저 환경에서만 실행 가능합니다.');
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BI1mGalcPU0n2U8wyYQedh6i9WRkd-RPQxhaPCHoy69FUkouVJrKEu4HsGpUCnawFyMpigKZqBN9_i8ACy8Ttac',
      });
      await registerServiceWorker()
      console.log('FCM Token:', token);
      return token;
    } else {
      console.error('알림 권한이 거부되었습니다.');
      return null;
    }
  } catch (error) {
    console.error('FCM 토큰을 가져오는 중 오류 발생:', error);
    throw error;
  }
};

export const requestGetToken = async () => {
  try {
    if (!messaging) {
      console.error('Messaging 객체가 초기화되지 않았습니다. 브라우저 환경에서만 실행 가능합니다.');
      return null;
    }

    if (Notification.permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BI1mGalcPU0n2U8wyYQedh6i9WRkd-RPQxhaPCHoy69FUkouVJrKEu4HsGpUCnawFyMpigKZqBN9_i8ACy8Ttac',
      });
      await registerServiceWorker()
      console.log('FCM Token:', token);
      return token;
    } else {
      console.error('알림 권한이 거부되었습니다.');
      return null;
    }
  } catch (error) {
    console.error('FCM 토큰을 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// FCM 메시지 수신 처리
export const onMessageListener = (callback) => {
  if (!messaging) {
    console.error('Messaging 객체가 초기화되지 않았습니다.');
    return null;
  }
  onMessage(messaging, (payload) => {
    callback(payload);
  });


  // return new Promise((resolve) => {
  //   onMessage(messaging, (payload) => {
  //     console.log('FCM 메시지 수신:', payload);
  //     resolve(payload);
  //   });
  // });
};
