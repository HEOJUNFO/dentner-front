// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
self.addEventListener("install", function () {
  self.skipWaiting();
});

// as-is.
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

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("push", function (e) {

  const raw = e.data?.text();
  const data = JSON.parse(raw);

  const title = data?.data?.title || '제목 없음';
  const body = data?.data?.body || '내용 없음';
  const url = data?.data?.url || '/';


  const options = {
    body: body,
    data: { url },
    tag: url,
  };

  e.waitUntil(
      self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  const url = event.notification?.data?.url || event.notification?.tag || '/';
  event.notification.close();
  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        if (clientList.length > 0) {
          // 앱이 이미 떠 있으면 메시지로 전달
          clientList[0].postMessage({ type: 'REDIRECT', url });
          return clientList[0].focus();
        } else {
          // 앱이 안 떠 있으면 새로 열기 (이건 iOS에서 무시될 수도 있음)
          return clients.openWindow('/');
        }
      })
  );

});