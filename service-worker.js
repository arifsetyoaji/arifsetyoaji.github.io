importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log("Workbox Berhasil Dimuat");
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/service-worker.js', revision: '1' },
        { url: '/pages/home.html', revision: '1' },
        { url: '/pages/premier.html', revision: '1' },
        { url: '/pages/premierteams.html', revision: '1' },
        { url: '/pages/laliga.html', revision: '1' },
        { url: '/pages/bundesliga.html', revision: '1' },
        { url: '/pages/favteam.html', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/style.css', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/db-controller.js', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/main.js', revision: '1' },
        { url: '/js/nav.js', revision: '1' },
        { url: '/js/push.js', revision: '1' },
        { url: '/js/jquery.min.js', revision: '1' },
        { url: '/js/node_modules/web-push/src/index.js', revision: '1' },
        { url: '/js/node_modules/web-push/package.json', revision: '1' },
        { url: '/js/package-lock.json', revision: '1' },
        { url: '/icon/icon-192.png', revision: '1' },
        { url: '/icon/icon-256.png', revision: '1' },
        { url: '/icon/icon-512.png', revision: '1' },
        { url: '/fonts/coolvetica.regular.ttf', revision: '1' },
        { url: '/fonts/CoolveticaRg-Regular.woff2', revision: '1' },
        { url: '/fonts/CoolveticaRg-Regular.woff', revision: '1' },
    ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

    //API Football Data
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate()
    )

    //Google Stylesheets
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    //Google Fonts
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );
} else {
    console.log("Workbox Gagal Digunakan");
}




self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'icon/icon-256.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});



//Event notification click
self.addEventListener('notificationclick', function (event) {
    //Menutup notifikasi
    event.notification.close();
    if (!event.action) {
        //Pengguna menyentuh area notifikasi diluar action
        console.log('Notification Click. - Menyentuh Di luar Action Ya Tidak.');
        return;
    }

    switch (event.action) {
        case 'yes-action':
            console.log('Penggunan memilih Action Yes.');
            //Buka tab baru
            clients.openWindow('https://google.com');
            break;
        case 'no-action':
            console.log('Pengguna memilih Action No.');
            break;
        default:
            console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
            break;
    }
});

