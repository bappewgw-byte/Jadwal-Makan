// 1. Daftarkan Service Worker supaya bisa jalan offline & di HP
let swRegistration = null;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => {
            swRegistration = reg;
            console.log('Service Worker berhasil didaftarkan!');
        })
        .catch(err => console.error('Service Worker gagal:', err));
}

const notifBtn = document.getElementById('enable-notif');
const testBtn = document.getElementById('test-notif');
const ICON = 'data:image/png;base64,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';
const BADGE_ICON = ICON;

// Jadwal makan: jam & pesan (24 jam format "HH:MM")
const SCHEDULE = [
    { time: '08:00', title: 'Waktunya Sarapan! 🍳', body: 'Telur rebus x2 + Ubi jalar oren rebus 180 gram' },
    { time: '10:30', title: 'Camilan Pagi (Opsional) ☕', body: 'Americano ice ATAU teh hijau' },
    { time: '13:00', title: 'Waktunya Makan Siang! 🍗', body: 'Nasi 4 sdm, Dada ayam, Tumis wortel' },
    { time: '15:00', title: 'Camilan Sore 🍎', body: 'Buah-buahan segar' },
    { time: '19:00', title: 'Waktunya Makan Malam! 🍜', body: 'Bihunku, Telur rebus, Brokoli rebus' }
];

// 2. Update tampilan tombol sesuai status izin notifikasi saat ini
function refreshNotifButton() {
    if (!('Notification' in window)) {
        notifBtn.textContent = '🔕 Browser tidak mendukung notifikasi';
        notifBtn.disabled = true;
        return;
    }
    if (Notification.permission === 'granted') {
        notifBtn.textContent = '✅ Pengingat Diet Aktif';
    } else if (Notification.permission === 'denied') {
        notifBtn.textContent = '🚫 Notifikasi Diblokir (buka Setelan Browser)';
    } else {
        notifBtn.textContent = '🔔 Aktifkan Pengingat Diet';
    }
}
refreshNotifButton();

// 3. Minta izin akses notifikasi ke user
// PENTING: kalau permission sudah pernah "denied", browser TIDAK akan
// menampilkan dialog izin lagi dan otomatis balikin "denied" tanpa nanya user.
// Makanya sebelumnya kelihatan kayak "kadang nolak sendiri" — padahal itu
// browser yang mengingat penolakan sebelumnya. Jadi kita kasih tau user
// harus buka setelan browser manual buat unblock-nya.
notifBtn.addEventListener('click', () => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'denied') {
        alert('Notifikasi diblokir di browser lu. Buka Setelan browser > Situs ini > Izin > Notifikasi, lalu ubah jadi "Izinkan". Setelah itu reload halaman ini.');
        return;
    }
    if (Notification.permission === 'granted') {
        alert('Pengingat diet lu udah aktif kok, gak perlu diaktifin lagi 👍');
        return;
    }

    Notification.requestPermission().then(permission => {
        refreshNotifButton();
        if (permission === 'granted') {
            alert('Mantap! Notifikasi diet lu udah aktif. Selama app ini kebuka (boleh di-minimize), reminder bakal muncul otomatis sesuai jadwal.');
            startScheduler();
        } else if (permission === 'denied') {
            alert('Yah, lu menolak notifikasi. Nanti jadwal dietnya kelewat lho. Kalau berubah pikiran, harus diaktifin manual lewat Setelan browser.');
        }
    });
});

// 4. Tombol buat ngetes langsung notifikasinya muncul atau kagak
testBtn.addEventListener('click', () => {
    if (Notification.permission !== 'granted') {
        alert('Aktifkan dulu tombol pengingat di atas, bro!');
        return;
    }
    showReminder('Waktunya Makan Siang! 🍗', 'Jangan lupa makan dada ayam panggang lu biar otot terjaga.');
});

// Fungsi utama buat munculin notifikasi (pakai service worker biar konsisten di HP)
function showReminder(title, body) {
    const options = {
        body,
        icon: ICON,
        badge: BADGE_ICON,
        vibrate: [200, 100, 200],
        tag: 'diet-reminder',
        renotify: true
    };
    if (swRegistration) {
        swRegistration.showNotification(title, options);
    } else if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(reg => reg.showNotification(title, options));
    } else {
        new Notification(title, options);
    }
}

// 5. Scheduler: cek tiap menit apakah waktu sekarang cocok sama jadwal.
// Catatan: ini jalan selama halaman/app kebuka di background (browser tab
// atau app yang di-minimize). Kalau app-nya di-swipe close total, browser
// web biasa memang gak bisa kirim notifikasi terjadwal tanpa server push —
// itu batasan platform, bukan bug.
let lastFiredKey = null;
function checkSchedule() {
    if (Notification.permission !== 'granted') return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const current = `${hh}:${mm}`;
    const todayKey = now.toDateString() + ' ' + current;

    const match = SCHEDULE.find(item => item.time === current);
    if (match && lastFiredKey !== todayKey) {
        lastFiredKey = todayKey;
        showReminder(match.title, match.body);
    }
}

let schedulerInterval = null;
function startScheduler() {
    if (schedulerInterval) return;
    checkSchedule();
    schedulerInterval = setInterval(checkSchedule, 20000); // cek tiap 20 detik
}

if (Notification.permission === 'granted') {
    startScheduler();
}
