document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connect-wallet-btn');
    const walletInfo = document.getElementById('wallet-info');
    const walletAddress = document.getElementById('wallet-address');
    const walletBalance = document.getElementById('wallet-balance');

    connectWalletBtn.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                // Get the connected wallet address
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                const address = accounts[0];
                
                // Get the wallet balance
                const balance = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [address, 'latest']
                });

                // Convert balance from wei to RBTC
                const rbtcBalance = parseInt(balance, 16) / 1e18;

                // Display wallet info
                walletAddress.textContent = address;
                walletBalance.textContent = rbtcBalance.toFixed(4);
                walletInfo.style.display = 'block';
                connectWalletBtn.textContent = 'Wallet Connected';
                connectWalletBtn.disabled = true;
            } catch (error) {
                console.error('Error connecting wallet:', error);
                alert('Failed to connect wallet. Please try again.');
            }
        } else {
            alert('Please install a Rootstock-compatible wallet extension.');
        }
    });
});
