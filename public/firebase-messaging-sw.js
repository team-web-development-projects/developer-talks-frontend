// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAyeJyirLMiGpDn8VYDse31NsOumQAbZjM",
  authDomain: "dtalks-41451.firebaseapp.com",
  projectId: "dtalks-41451",
  storageBucket: "dtalks-41451.appspot.com",
  messagingSenderId: "681796334883",
  appId: "1:681796334883:web:a4c1c6947ef78610cb8896",
  measurementId: "G-WYBMK9HYCV",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/logo192.png",
//   };

//   // eslint-disable-next-line no-restricted-globals
//   // return self.registration.showNotification(notificationTitle, notificationOptions);
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
// Add event listener to handle incoming messages when the app is in the foreground
self.addEventListener("push", (event) => {
  // Handle the incoming push notification
  const payload = event.data.json();
  // Display the notification using the payload data
  const options = {
    // Notification options like title, body, icon, etc.
  };
  event.waitUntil(self.registration.showNotification(payload.notification.title, options));
});

// Additional event listeners and background messaging handling can be added as per your requirements.
