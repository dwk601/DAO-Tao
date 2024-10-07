document.addEventListener('DOMContentLoaded', () => {
    const nlpInput = document.getElementById('nlp-input');
    const processBtn = document.getElementById('process-btn');
    const processedResult = document.getElementById('processed-result');
    const transactionDetails = document.getElementById('transaction-details');
    const executeBtn = document.getElementById('execute-btn');
    const addressInput = document.getElementById('address-input');
    const checkBalanceBtn = document.getElementById('check-balance-btn');
    const balanceResult = document.getElementById('balance-result');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const detectedLanguage = document.getElementById('detected-language');
    const languageSelect = document.getElementById('language-select');
    const notificationArea = document.getElementById('notification-area');
    const safeEventsList = document.getElementById('safe-events-list');

    let socket;

    function initSocketIO() {
        socket = io({
            transports: ['websocket'],
            upgrade: false
        });

        socket.on('connect', () => {
            console.log('SocketIO connection established');
            showNotification('Connected to real-time updates', 'success');
        });

        socket.on('connection_response', (data) => {
            console.log('Server connection response:', data);
        });

        socket.on('disconnect', () => {
            console.log('SocketIO connection closed');
            showNotification('Real-time connection lost. Reconnecting...', 'warning');
        });

        socket.on('notification', (data) => {
            showNotification(data.message, data.level);
        });

        socket.on('transaction_update', (data) => {
            updateTransactionStatus(data);
        });

        socket.on('balance_update', (data) => {
            updateBalance(data.address, data.balance);
        });

        socket.on('safe_event', (data) => {
            handleSafeEvent(data);
        });

        socket.on('error', (error) => {
            console.error('SocketIO Error:', error);
            showNotification('An error occurred with the real-time connection', 'error');
        });
    }

    initSocketIO();

    function updateTransactionStatus(transaction) {
        const transactionElement = document.querySelector(`[data-tx-hash="${transaction.hash}"]`);
        if (transactionElement) {
            transactionElement.querySelector('.status').textContent = transaction.status;
            transactionElement.classList.add('updated');
            setTimeout(() => transactionElement.classList.remove('updated'), 3000);
        } else {
            const newTransaction = document.createElement('div');
            newTransaction.classList.add('transaction-item');
            newTransaction.dataset.txHash = transaction.hash;
            newTransaction.innerHTML = `
                <span class="hash">${transaction.hash}</span>
                <span class="status">${transaction.status}</span>
            `;
            document.getElementById('transaction-list').prepend(newTransaction);
        }
    }

    function updateBalance(address, balance) {
        if (addressInput.value.toLowerCase() === address.toLowerCase()) {
            balanceResult.textContent = `Balance: ${balance} RBTC`;
            balanceResult.classList.add('updated');
            setTimeout(() => balanceResult.classList.remove('updated'), 3000);
        }
    }

    function showNotification(message, level = 'info') {
        const notification = document.createElement('div');
        notification.classList.add('notification', level);
        notification.textContent = message;
        notificationArea.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    function handleSafeEvent(event) {
        const eventItem = document.createElement('div');
        eventItem.classList.add('safe-event-item');
        eventItem.innerHTML = `
            <h3>${event.type}</h3>
            <p>Safe Address: ${event.safe_address}</p>
            <p>Chain ID: ${event.chainId}</p>
            ${Object.entries(event)
                .filter(([key]) => !['type', 'safe_address', 'chainId'].includes(key))
                .map(([key, value]) => `<p>${key}: ${value}</p>`)
                .join('')}
        `;
        safeEventsList.prepend(eventItem);
        
        if (safeEventsList.children.length > 10) {
            safeEventsList.removeChild(safeEventsList.lastChild);
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', isDarkMode);
    }

    darkModeToggle.addEventListener('click', () => {
        toggleDarkMode();
        showNotification(`${document.body.classList.contains('dark-mode') ? 'Dark' : 'Light'} mode activated`, 'info');
    });

    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }

    processBtn.addEventListener('click', async () => {
        const input = nlpInput.value;
        try {
            const response = await fetch('/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input, language: languageSelect.value }),
            });
            const data = await response.json();
            if (response.ok) {
                processedResult.textContent = JSON.stringify(data, null, 2);
                transactionDetails.textContent = JSON.stringify(data, null, 2);
                executeBtn.style.display = 'block';
                detectedLanguage.textContent = getLanguageName(data.language);
                languageSelect.value = data.language;
            } else {
                if (data.scam_detected) {
                    processedResult.textContent = `Warning: Potential scam detected!\n${data.error}`;
                    transactionDetails.textContent = '';
                    executeBtn.style.display = 'none';
                } else {
                    processedResult.textContent = `Error: ${data.error}`;
                    transactionDetails.textContent = '';
                    executeBtn.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Error:', error);
            processedResult.textContent = 'Error processing input';
            transactionDetails.textContent = '';
            executeBtn.style.display = 'none';
            showNotification('Error processing command', 'error');
        }
    });

    executeBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: transactionDetails.textContent,
            });
            const result = await response.json();
            if (result.success) {
                showNotification(`Transaction executed successfully. Hash: ${result.tx_hash}`, 'success');
                updateTransactionStatus({ hash: result.tx_hash, status: 'Pending' });
            } else {
                showNotification(`Error: ${result.error}`, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error executing transaction', 'error');
        }
    });

    checkBalanceBtn.addEventListener('click', async () => {
        const address = addressInput.value;
        if (!address) {
            balanceResult.textContent = 'Please enter an address';
            return;
        }

        try {
            const response = await fetch(`/check_balance/${address}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            updateBalance(address, data.balance);
        } catch (error) {
            console.error('Error:', error);
            balanceResult.textContent = 'Error fetching balance. Please try again.';
            showNotification('Error fetching balance', 'error');
        }
    });

    function getLanguageName(langCode) {
        const languages = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch'
        };
        return languages[langCode] || 'Unknown';
    }

    function handleConnectionIssues() {
        if (!socket.connected) {
            console.log('Attempting to reconnect...');
            socket.connect();
        }
    }

    setInterval(handleConnectionIssues, 5000);
});