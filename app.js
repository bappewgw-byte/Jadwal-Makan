// 1. Daftarkan Service Worker supaya bisa jalan di HP
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log("Service Worker berhasil didaftarkan!"))
    .catch(err => console.error("Service Worker gagal:", err));
}

const notifBtn = document.getElementById('enable-notif');
const testBtn = document.getElementById('test-notif');

// 2. Minta izin akses notifikasi ke user
notifBtn.addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            alert('Mantap! Notifikasi diet lu udah aktif.');
            // Di sini lu bisa pasang alarm otomatis pakai push API atau local timer
        } else {
            alert('Yah, lu menolak notifikasi. Nanti jadwal dietnya kelewat lho.');
        }
    });
});

// 3. Tombol buat ngetes langsung notifikasinya muncul atau kagak
testBtn.addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('Waktunya Makan Siang! 🍗', {
                body: 'Jangan lupa makan dada ayam panggang lu biar otot terjaga.',
                icon: 'https://cdn-icons-png.flaticon.com/512/2927/2927347.png', // Icon garpu & sendok
                vibrate: [200, 100, 200], // Efek getar di HP
                tag: 'diet-reminder'
            });
        });
    } else {
        alert('Aktifkan dulu tombol pengingat di atas, bro!');
    }
});
