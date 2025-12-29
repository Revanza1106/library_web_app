document.addEventListener('DOMContentLoaded', () => {
    // Helper functions for localStorage
    const getTransactions = () => {
        const transactions = localStorage.getItem('transactions');
        return transactions ? JSON.parse(transactions) : [];
    };

    const saveTransaction = (transaction) => {
        const transactions = getTransactions();
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    };

    // Function to update header with login info
    const updateHeaderForLogin = () => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        const userInfoDisplay = document.getElementById('user-info-display');

        if (isLoggedIn === 'true' && loggedInUser && userInfoDisplay) {
            userInfoDisplay.innerHTML = `
                <img src="images/logo.svg" alt="User Logo" class="user-logo">
                <span>${loggedInUser}</span>
            `;
            userInfoDisplay.style.display = 'flex'; // Show the user info
        } else if (userInfoDisplay) {
            userInfoDisplay.style.display = 'none'; // Hide if not logged in
        }
    };

    // Transaction Form Validation
    const transactionForm = document.getElementById('transactionForm');
    const formMessage = document.getElementById('formMessage');

    if (transactionForm) {
        transactionForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const namaBuku = document.getElementById('namaBuku').value;
            const peminjam = document.getElementById('peminjam').value;
            const tanggalPinjam = document.getElementById('tanggalPinjam').value;
            const tanggalKembali = document.getElementById('tanggalKembali').value;

            if (namaBuku === '' || peminjam === '' || tanggalPinjam === '' || tanggalKembali === '') {
                formMessage.textContent = 'Semua kolom harus diisi!';
                formMessage.className = 'message error';
                formMessage.style.display = 'block';
            } else {
                formMessage.textContent = 'Transaksi berhasil disimpan!';
                formMessage.className = 'message success';
                formMessage.style.display = 'block';
                
                const newTransaction = {
                    namaBuku,
                    peminjam,
                    tanggalPinjam,
                    tanggalKembali,
                    // Adding some dummy data for 'Jumlah' and 'Kategori' as per the table structure
                    jumlah: 1, // Assuming one book per transaction for simplicity
                    kategori: 'Umum' // Default category
                };
                saveTransaction(newTransaction);

                console.log('Transaksi berhasil:', newTransaction);
                transactionForm.reset(); // Clear the form
            }
        });
    }

    // Login Form (basic example, no actual authentication)
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Hardcoded credentials for demonstration
            if (username === 'admin' && password === '123') {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('loggedInUser', 'admin');
                loginMessage.textContent = 'Login berhasil! Selamat datang, admin.';
                loginMessage.className = 'message success';
                loginMessage.style.display = 'block';
                window.location.href = 'index.html'; // Redirect to home page
            } else {
                loginMessage.textContent = 'Username atau Password salah!';
                loginMessage.className = 'message error';
                loginMessage.style.display = 'block';
            }
        });
    }

    // Function to load and display transactions on daftar_transaksi.html
    const loadTransactions = () => {
        const transactionTableBody = document.getElementById('transactionTableBody');
        if (transactionTableBody) {
            const transactions = getTransactions();
            transactionTableBody.innerHTML = ''; // Clear existing rows

            if (transactions.length === 0) {
                transactionTableBody.innerHTML = '<tr><td colspan="6">Belum ada transaksi yang disimpan.</td></tr>';
                return;
            }

            transactions.forEach(tx => {
                const row = transactionTableBody.insertRow();
                row.insertCell().textContent = tx.namaBuku;
                row.insertCell().textContent = tx.jumlah;
                row.insertCell().textContent = tx.kategori;
                row.insertCell().textContent = tx.peminjam;
                row.insertCell().textContent = tx.tanggalPinjam;
                row.insertCell().textContent = tx.tanggalKembali;
            });
        }
    };

    // Call loadTransactions if on the daftar_transaksi.html page
    if (window.location.pathname.includes('daftar_transaksi.html')) {
        loadTransactions();
    }

    // Call updateHeaderForLogin on all pages
    updateHeaderForLogin();
});
