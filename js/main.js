// Periksa service worker
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
    requestPermission();
}
// Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
            console.log('Registrasi service worker berhasil.');
            return registration;
        })
        .catch(function (err) {
            console.error('Registrasi service worker gagal.', err);
        });
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}



function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function (registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BPwWjoKwBtTUhJftU934Xn90CEQ-I97sSGSyr4WXRWb4aXu1HvziKfjnsPHVRmZqoPaXPS-yJUrEztH8vLXtrFU")
                    }).then(function (subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function (e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    }
}


//IndexedDB
const booksRow = document.getElementById("booksRow");
const inputBookId = document.getElementById("bookId");
const inputBookName = document.getElementById("bookName");
const inputBookYear = document.getElementById("bookYear");
const inputBookAuthor = document.getElementById("bookAuthor");

//Insert Book
function insertBook() {
    const book = {
        bookId: inputBookId.value,
        bookName: inputBookName.value,
        bookYear: inputBookYear.value,
        bookAuthor: inputBookAuthor.value
    };
    dbInsertBook(book).then(() => {
        showAllBook()
    })
}

//Show Book
function showAllBook() {
    dbGetAllBook().then(books => {
        let listBooksInText = "";
        books.forEach(book => {
            listBooksInText += `
           <tr>
             <td>${book.bookId}</td>
             <td>${book.bookName}</td>
             <td>${book.bookYear}</td>
             <td>${book.bookAuthor}</td>
             <td><button id="${book.bookId}" class="removeButton">Remove</button></td>
           </tr>
           `;
        });
        booksRow.innerHTML = listBooksInText;
        let removeButtons = document.querySelectorAll(".removeButton");
        for (let button of removeButtons) {
            button.addEventListener("click", function (event) {
                let bookId = event.target.id;
                dbDeleteBook(bookId).then(() => {
                    showAllBook()
                })
            })
        }
    })
}

/* showAllBook(); */

