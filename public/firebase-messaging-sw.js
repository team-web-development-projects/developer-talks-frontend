importScripts("https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js");

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAyeJyirLMiGpDn8VYDse31NsOumQAbZjM",
  authDomain: "dtalks-41451.firebaseapp.com",
  projectId: "dtalks-41451",
  storageBucket: "dtalks-41451.appspot.com",
  messagingSenderId: "681796334883",
  appId: "1:681796334883:web:a4c1c6947ef78610cb8896",
  measurementId: "G-WYBMK9HYCV",
});

const messaging = firebase.messaging();

self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage(function (payload) {
  const notification = payload.notification;

  console.log("[firebase-messaging-sw.js] Received background message ", notification);

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: "/firebase-logo.png", // 루트 경로 기준으로 접근
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
