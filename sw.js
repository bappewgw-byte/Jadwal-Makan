self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
});

// Menangani ketika notifikasi diklik oleh user di HP
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // Buka aplikasi pas notifikasi diklik
    );
});

