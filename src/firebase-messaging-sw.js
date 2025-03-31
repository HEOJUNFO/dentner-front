// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
self.addEventListener("install", function () {
  self.skipWaiting();
});

// importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js');
// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js');
//
// const firebaseConfig = {
//   apiKey: 'AIzaSyB0DguKMxNWDVN8ZVckQgctTTCtPfkLx6k',
//   authDomain: 'dentner-d9625.firebaseapp.com',
//   projectId: 'dentner-d9625',
//   storageBucket: 'dentner-d9625.firebasestorage.app',
//   messagingSenderId: '74631289067',
//   appId: '1:74631289067:web:16c4adb6f1c69b626046ae',
//   measurementId: 'G-VLCTJM48TX',
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const messaging = firebase.messaging();
//
// messaging.onBackgroundMessage((payload) => {
//
//   const notificationTitle = '[Debug]' + payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     tag: payload.data.url,
//     data: {
//       url : payload.data.url
//     }
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
self.addEventListener("activate", function () {
  console.log("✅ FCM Service Worker Activated");
});

self.addEventListener("push", function (e) {
  console.log("📩 push 이벤트 수신");

  const raw = e.data?.text();
  console.log('📦 RAW payload:', raw);

  const data = JSON.parse(raw);

  const title = data.title || '제목 없음';
  const body = data.body || '내용 없음';
  const url = data.url || '/';


  const options = {
    body,
    data: { url },
    tag: url,
  };


  e.waitUntil(
      self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  const url = event.notification?.data?.url || event.notification?.tag || '/';

  console.log('[SW] 🔗 알림 클릭됨 → 이동할 URL:', url);
  event.notification.close();

  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
        for (const client of clientsArr) {
          if ('focus' in client && 'navigate' in client) {
            client.navigate(url);
            return client.focus();
          }
        }
        return clients.openWindow(url);
      })
  );
});
