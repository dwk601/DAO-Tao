document.addEventListener('DOMContentLoaded', () => {
    const nlpInput = document.getElementById('nlp-input');
    const processBtn = document.getElementById('process-btn');
    const processedResult = document.getElementById('processed-result');
    const transactionDetails = document.getElementById('transaction-details');
    const executeBtn = document.getElementById('execute-btn');
    const addressInput = document.getElementById('address-input');
    const checkBalanceBtn = document.getElementById('check-balance-btn');
    const balanceResult = document.getElementById('wallet-balance');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const notificationsArea = document.getElementById('notifications-area');
    const transactionHistory = document.getElementById('transaction-history');
    const transactionForm = document.getElementById('transaction-form');
    const transactionStatus = document.getElementById('transaction-status');
    const recentTransactions = document.getElementById('recent-transactions');

    // Initialize Socket.IO
    const socket = io();

    socket.on('connect', () => {
        console.log('Connected to server');
        showNotification('Connected to real-time updates', 'success');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        showNotification('Disconnected from real-time updates', 'error');
    });

    socket.on('transaction_update', (data) => {
        showNotification(`Transaction update: ${data.message}`, 'info');
        updateRecentTransactions();
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    if (processBtn) {
        processBtn.addEventListener('click', async () => {
            const input = nlpInput.value;
            try {
                const response = await fetch('/process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ input }),
                });
                const data = await response.json();
                if (data.error) {
                    processedResult.textContent = `Error: ${data.error}`;
                    showNotification(`Error: ${data.error}`, 'error');
                } else {
                    processedResult.textContent = data.result;
                    showNotification('Command processed successfully', 'success');
                }
            } catch (error) {
                console.error('Error:', error);
                processedResult.textContent = 'Error processing input';
                showNotification('Error processing command', 'error');
            }
        });
    }

    if (checkBalanceBtn) {
        checkBalanceBtn.addEventListener('click', async () => {
            const address = addressInput.value;
            if (!address) {
                showNotification('Please enter an address', 'warning');
                return;
            }

            try {
                const response = await fetch(`/check_balance/${address}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                balanceResult.textContent = `Balance: ${data.balance.toFixed(6)} ETH`;
                showNotification('Balance checked successfully', 'success');
            } catch (error) {
                console.error('Error:', error);
                balanceResult.textContent = 'Error fetching balance. Please try again.';
                showNotification('Error fetching balance', 'error');
            }
        });
    }

    // Wallet page functionality
    if (balanceResult) {
        fetchWalletBalance();
        fetchTransactionHistory();
    }

    // Transaction page functionality
    if (transactionForm) {
        transactionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const from = document.getElementById('from').value;
            const recipient = document.getElementById('recipient').value;
            const amount = document.getElementById('amount').value;
            const gasPrice = document.getElementById('gas-price').value;
            const gasLimit = document.getElementById('gas-limit').value;

            try {
                const response = await fetch('/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ from, recipient, amount, gasPrice, gasLimit }),
                });
                const result = await response.json();
                if (result.success) {
                    showNotification(`Transaction sent successfully. Hash: ${result.tx_hash}`, 'success');
                    transactionStatus.textContent = `Transaction sent. Hash: ${result.tx_hash}`;
                    updateRecentTransactions();
                } else {
                    showNotification(`Error: ${result.error}`, 'error');
                    transactionStatus.textContent = `Error: ${result.error}`;
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Error sending transaction', 'error');
                transactionStatus.textContent = 'Error sending transaction';
            }
        });
    }

    async function fetchWalletBalance() {
        try {
            const response = await fetch('/check_balance/current_user');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            balanceResult.textContent = `${data.balance.toFixed(6)} ETH`;
        } catch (error) {
            console.error('Error:', error);
            balanceResult.textContent = 'Error fetching balance';
        }
    }

    async function fetchTransactionHistory() {
        try {
            const response = await fetch('/transaction_history');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            updateTransactionList(data.transactions);
        } catch (error) {
            console.error('Error:', error);
            if (transactionHistory) {
                transactionHistory.innerHTML = '<li>Error fetching transaction history</li>';
            }
            if (recentTransactions) {
                recentTransactions.innerHTML = '<li>Error fetching recent transactions</li>';
            }
        }
    }

    function updateTransactionList(transactions) {
        const listHtml = transactions.map(tx => `
            <li>
                <strong>Hash:</strong> ${tx.hash}<br>
                <strong>From:</strong> ${tx.from}<br>
                <strong>To:</strong> ${tx.to}<br>
                <strong>Amount:</strong> ${tx.value.toFixed(6)} ETH<br>
                <strong>Status:</strong> ${tx.status}
            </li>
        `).join('');

        if (transactionHistory) {
            transactionHistory.innerHTML = listHtml;
        }
        if (recentTransactions) {
            recentTransactions.innerHTML = listHtml;
        }
    }

    function updateRecentTransactions() {
        fetchTransactionHistory();
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationsArea.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notificationsArea.removeChild(notification);
            }, 500);
        }, 5000);
    }
});
