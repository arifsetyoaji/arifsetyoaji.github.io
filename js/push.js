var webPush = require('web-push');
const vapidKeys = {
   "publicKey": "BPwWjoKwBtTUhJftU934Xn90CEQ-I97sSGSyr4WXRWb4aXu1HvziKfjnsPHVRmZqoPaXPS-yJUrEztH8vLXtrFU",
   "privateKey": "8-zqhb6F9UUjnprOFoQVE5U7YoUO91ompR-fzU_epPU"
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eg4BJ-nWVUM:APA91bEqFkPTszxVFd3sfQE11w54CkCwvy1PpE693vPM-RUNy9BmK2mjFT6ovtGuhGMXkUYcI996_kMM0W-Z8CX8YelPi8exyGeV4M9RUuOHSyNmrH3WmroBxVr_ECxSjVZhv63k7Qqh",
   "keys": {
       "p256dh": "BIbMnRYgy/VntceCe6wFdFFEvHtpdXlZE4NFYUyt3BoSyDlIlK+L+a0MbFCpqPt4bGbfiovXjFHPyKqaU+ldigs=",
       "auth": "mHFX8eRrmVf4VCUORZhMxg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '263264486752',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);