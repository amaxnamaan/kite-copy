// Mock Database of Stocks
const STOCK_UNIVERSE = [
    { symbol: "NIFTY 50", exchange: "NSE", price: 19425.35, type: "index", yahooSymbol: "^NSEI" },
    { symbol: "SENSEX", exchange: "BSE", price: 65344.10, type: "index", yahooSymbol: "^BSESN" },
    { symbol: "RELIANCE", exchange: "NSE", price: 2456.00, type: "stock", yahooSymbol: "RELIANCE.NS" },
    { symbol: "TCS", exchange: "NSE", price: 3450.20, type: "stock", yahooSymbol: "TCS.NS" },
    { symbol: "INFY", exchange: "NSE", price: 1345.50, type: "stock", yahooSymbol: "INFY.NS" },
    { symbol: "HDFCBANK", exchange: "NSE", price: 1650.00, type: "stock", yahooSymbol: "HDFCBANK.NS" },
    { symbol: "ICICIBANK", exchange: "NSE", price: 960.40, type: "stock", yahooSymbol: "ICICIBANK.NS" },
    { symbol: "SBIN", exchange: "NSE", price: 580.15, type: "stock", yahooSymbol: "SBIN.NS" },
    { symbol: "TATAMOTORS", exchange: "NSE", price: 620.30, type: "stock", yahooSymbol: "TATAMOTORS.NS" },
    { symbol: "ADANIENT", exchange: "NSE", price: 2450.00, type: "stock", yahooSymbol: "ADANIENT.NS" },
    { symbol: "BAJFINANCE", exchange: "NSE", price: 7200.50, type: "stock", yahooSymbol: "BAJFINANCE.NS" },
    { symbol: "WIPRO", exchange: "NSE", price: 405.10, type: "stock", yahooSymbol: "WIPRO.NS" },
    { symbol: "ASIANPAINT", exchange: "NSE", price: 3200.00, type: "stock", yahooSymbol: "ASIANPAINT.NS" },
    { symbol: "HCLTECH", exchange: "NSE", price: 1150.00, type: "stock", yahooSymbol: "HCLTECH.NS" },
    { symbol: "MARUTI", exchange: "NSE", price: 9500.00, type: "stock", yahooSymbol: "MARUTI.NS" },
    { symbol: "SUNPHARMA", exchange: "NSE", price: 1050.00, type: "stock", yahooSymbol: "SUNPHARMA.NS" },
    { symbol: "TITAN", exchange: "NSE", price: 2950.00, type: "stock", yahooSymbol: "TITAN.NS" },
    { symbol: "ULTRACEMCO", exchange: "NSE", price: 8200.00, type: "stock", yahooSymbol: "ULTRACEMCO.NS" },
    { symbol: "POWERGRID", exchange: "NSE", price: 245.00, type: "stock", yahooSymbol: "POWERGRID.NS" },
    { symbol: "NTPC", exchange: "NSE", price: 190.00, type: "stock", yahooSymbol: "NTPC.NS" },
    { symbol: "ONGC", exchange: "NSE", price: 160.00, type: "stock", yahooSymbol: "ONGC.NS" },
    { symbol: "COALINDIA", exchange: "NSE", price: 230.00, type: "stock", yahooSymbol: "COALINDIA.NS" },
    { symbol: "BPCL", exchange: "NSE", price: 360.00, type: "stock", yahooSymbol: "BPCL.NS" },
    { symbol: "HEROMOTOCO", exchange: "NSE", price: 2900.00, type: "stock", yahooSymbol: "HEROMOTOCO.NS" },
    { symbol: "EICHERMOT", exchange: "NSE", price: 3400.00, type: "stock", yahooSymbol: "EICHERMOT.NS" },
    { symbol: "DRREDDY", exchange: "NSE", price: 5200.00, type: "stock", yahooSymbol: "DRREDDY.NS" },
    { symbol: "CIPLA", exchange: "NSE", price: 1020.00, type: "stock", yahooSymbol: "CIPLA.NS" },
    { symbol: "DIVISLAB", exchange: "NSE", price: 3600.00, type: "stock", yahooSymbol: "DIVISLAB.NS" },
    { symbol: "APOLLOHOSP", exchange: "NSE", price: 5100.00, type: "stock", yahooSymbol: "APOLLOHOSP.NS" },
    { symbol: "BRITANNIA", exchange: "NSE", price: 4800.00, type: "stock", yahooSymbol: "BRITANNIA.NS" },
    { symbol: "NESTLEIND", exchange: "NSE", price: 22000.00, type: "stock", yahooSymbol: "NESTLEIND.NS" },
    { symbol: "HINDUNILVR", exchange: "NSE", price: 2500.00, type: "stock", yahooSymbol: "HINDUNILVR.NS" },
    { symbol: "ITC", exchange: "NSE", price: 450.00, type: "stock", yahooSymbol: "ITC.NS" },
    { symbol: "GRASIM", exchange: "NSE", price: 1800.00, type: "stock", yahooSymbol: "GRASIM.NS" },
    { symbol: "JSWSTEEL", exchange: "NSE", price: 800.00, type: "stock", yahooSymbol: "JSWSTEEL.NS" },
    { symbol: "TATASTEEL", exchange: "NSE", price: 120.00, type: "stock", yahooSymbol: "TATASTEEL.NS" },
    { symbol: "HINDALCO", exchange: "NSE", price: 460.00, type: "stock", yahooSymbol: "HINDALCO.NS" },
    { symbol: "UPL", exchange: "NSE", price: 650.00, type: "stock", yahooSymbol: "UPL.NS" },
    { symbol: "LT", exchange: "NSE", price: 2600.00, type: "stock", yahooSymbol: "LT.NS" },
    { symbol: "BHARTIARTL", exchange: "NSE", price: 880.00, type: "stock", yahooSymbol: "BHARTIARTL.NS" },
];

// State Management
const STATE = {
    watchlist: ["NIFTY 50", "SENSEX", "RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK"],
    holdings: [
        { symbol: "RELIANCE", qty: 10, avgPrice: 2400.00 },
        { symbol: "TCS", qty: 5, avgPrice: 3400.00 }
    ],
    orders: [],
    funds: 100000.00,
    activeStock: null,
    currentView: 'dashboard'
};

// Initialize Live Data
STOCK_UNIVERSE.forEach(stock => {
    stock.change = 0;
    stock.percent = 0;
    stock.previousPrice = stock.price;
});

let chartInstance = null;
let portfolioChartInstance = null;

// DOM Elements
const watchlistContainer = document.getElementById('watchlist-container');
const viewDashboard = document.getElementById('view-dashboard');
const viewStockDetail = document.getElementById('view-stock-detail');
const viewOrders = document.getElementById('view-orders');
const viewFunds = document.getElementById('view-funds');
const modal = document.getElementById('order-modal');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('stock-search');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    STATE.activeStock = getStock("RELIANCE");

    renderWatchlist();
    renderDashboard();

    // Start Data Fetching
    fetchLivePrices();
    setInterval(fetchLivePrices, 5000); // Fetch every 5 seconds
    startSimulation(); // Keep simulation for smooth ticks between fetches

    // Navigation
    document.querySelector('.logo-section').addEventListener('click', () => switchView('dashboard'));
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.dataset.target;
            if (target) switchView(target);
        });
    });

    // Search
    searchInput.addEventListener('input', handleSearch);
});

async function fetchLivePrices() {
    const symbols = STOCK_UNIVERSE.map(s => s.yahooSymbol).join(',');
    const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.quoteResponse && data.quoteResponse.result) {
            data.quoteResponse.result.forEach(quote => {
                const stock = STOCK_UNIVERSE.find(s => s.yahooSymbol === quote.symbol);
                if (stock) {
                    stock.previousPrice = stock.price;
                    stock.price = quote.regularMarketPrice;
                    stock.change = quote.regularMarketChange;
                    stock.percent = quote.regularMarketChangePercent;

                    // Update UI if needed immediately
                    updateStockUI(stock);
                }
            });
            console.log("Updated prices from Yahoo Finance");
        }
    } catch (error) {
        console.error("Failed to fetch live prices, falling back to simulation", error);
    }
}

function updateStockUI(stock) {
    // Update Watchlist Item
    const item = watchlistContainer.querySelector(`.watchlist-item[data-symbol="${stock.symbol}"]`);
    if (item) updateWatchlistItem(item, stock);

    // Update Dashboard Indices
    if (stock.symbol === "NIFTY 50") {
        document.getElementById('nifty-value').innerText = stock.price.toFixed(2);
        document.getElementById('nifty-change').innerText = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.percent.toFixed(2)}%)`;
    }
    if (stock.symbol === "SENSEX") {
        document.getElementById('sensex-value').innerText = stock.price.toFixed(2);
        document.getElementById('sensex-change').innerText = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.percent.toFixed(2)}%)`;
    }

    // Update Detail View if active
    if (STATE.activeStock && STATE.activeStock.symbol === stock.symbol && !viewStockDetail.classList.contains('hidden')) {
        document.getElementById('detail-price').innerText = stock.price.toFixed(2);
        updateDetailChange(stock);
    }
}

function getStock(symbol) {
    return STOCK_UNIVERSE.find(s => s.symbol === symbol);
}

function switchView(viewName) {
    // Hide all views
    [viewDashboard, viewStockDetail, viewOrders, viewFunds].forEach(el => {
        if (el) el.classList.add('hidden');
    });

    // Update Nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-target="${viewName}"]`);
    if (navItem) navItem.classList.add('active');

    STATE.currentView = viewName;

    // Show specific view
    switch (viewName) {
        case 'dashboard':
            viewDashboard.classList.remove('hidden');
            renderDashboard();
            break;
        case 'orders':
            viewOrders.classList.remove('hidden');
            renderOrders();
            break;
        case 'funds':
            viewFunds.classList.remove('hidden');
            renderFunds();
            break;
        case 'stock-detail':
            viewStockDetail.classList.remove('hidden');
            break;
        default:
            // Fallback to dashboard if view not implemented
            viewDashboard.classList.remove('hidden');
            renderDashboard();
    }
}

function showStockDetail(symbol) {
    const stock = getStock(symbol);
    if (!stock) return;

    STATE.activeStock = stock;
    switchView('stock-detail');

    // Update Header
    document.getElementById('detail-symbol').innerText = stock.symbol;
    document.getElementById('detail-price').innerText = stock.price.toFixed(2);
    updateDetailChange(stock);

    // Render Chart
    renderStockChart(stock);
    renderMarketDepth();

    // Highlight in watchlist
    document.querySelectorAll('.watchlist-item').forEach(i => {
        i.classList.remove('active');
        if (i.dataset.symbol === symbol) i.classList.add('active');
    });
}

function renderWatchlist() {
    // Don't clear innerHTML completely to avoid scroll jump if possible, 
    // but for simplicity we will rebuild. To optimize, we could update existing nodes.
    // For this demo, we'll rebuild but try to maintain scroll? 
    // Actually, rebuilding every second is bad for UX (scroll reset).
    // Let's update in place if elements exist.

    if (watchlistContainer.children.length === 0 || searchInput.value.length > 0) {
        // Initial render or search mode
        const listToRender = searchInput.value.length > 0
            ? STOCK_UNIVERSE.filter(s => s.symbol.includes(searchInput.value.toUpperCase()))
            : STATE.watchlist.map(s => getStock(s)).filter(s => s);

        watchlistContainer.innerHTML = '';

        listToRender.forEach(stock => {
            const item = createWatchlistItem(stock);
            watchlistContainer.appendChild(item);
        });
    } else {
        // Update existing items
        STATE.watchlist.forEach(symbol => {
            const stock = getStock(symbol);
            if (!stock) return;

            let item = watchlistContainer.querySelector(`.watchlist-item[data-symbol="${symbol}"]`);
            if (!item) {
                // If new item added to watchlist
                item = createWatchlistItem(stock);
                watchlistContainer.appendChild(item);
            } else {
                updateWatchlistItem(item, stock);
            }
        });
    }
}

function createWatchlistItem(stock) {
    const item = document.createElement('div');
    item.className = 'watchlist-item';
    item.dataset.symbol = stock.symbol;
    item.onclick = () => showStockDetail(stock.symbol);

    const isPositive = stock.change >= 0;
    const colorClass = isPositive ? 'positive' : 'negative';

    // Check if in search mode and not in watchlist
    const inWatchlist = STATE.watchlist.includes(stock.symbol);
    const isSearchMode = searchInput.value.length > 0;

    if (isSearchMode && !inWatchlist) {
        item.innerHTML = `
            <div class="wl-info">
                <div class="wl-symbol">${stock.symbol}</div>
                <div class="wl-exchange">${stock.exchange}</div>
            </div>
            <div class="wl-actions">
                <button class="btn-icon" onclick="event.stopPropagation(); addToWatchlist('${stock.symbol}')"><i class="fas fa-plus"></i></button>
            </div>
        `;
    } else {
        item.innerHTML = `
            <div class="wl-info">
                <div class="wl-symbol">${stock.symbol}</div>
                <div class="wl-exchange">${stock.exchange}</div>
            </div>
            <div class="wl-price-info">
                <div class="wl-price ${colorClass}">${stock.price.toFixed(2)}</div>
                <div class="wl-change ${colorClass}">${isPositive ? '+' : ''}${stock.change.toFixed(2)} (${stock.percent.toFixed(2)}%)</div>
            </div>
        `;
    }
    return item;
}

function updateWatchlistItem(item, stock) {
    const priceEl = item.querySelector('.wl-price');
    const changeEl = item.querySelector('.wl-change');

    if (!priceEl) return; // Search mode might not have price

    const currentPrice = parseFloat(priceEl.innerText);
    const newPrice = stock.price;

    if (newPrice !== currentPrice) {
        priceEl.innerText = newPrice.toFixed(2);

        const isPositive = stock.change >= 0;
        const colorClass = isPositive ? 'positive' : 'negative';

        // Remove old classes
        priceEl.classList.remove('positive', 'negative', 'flash-up', 'flash-down');
        changeEl.classList.remove('positive', 'negative');

        // Add new classes
        priceEl.classList.add(colorClass);
        changeEl.classList.add(colorClass);

        // Flash effect
        if (newPrice > stock.previousPrice) {
            priceEl.classList.add('flash-up');
        } else if (newPrice < stock.previousPrice) {
            priceEl.classList.add('flash-down');
        }

        changeEl.innerText = `${isPositive ? '+' : ''}${stock.change.toFixed(2)} (${stock.percent.toFixed(2)}%)`;
    }
}

function handleSearch(e) {
    renderWatchlist();
}

function addToWatchlist(symbol) {
    if (!STATE.watchlist.includes(symbol)) {
        STATE.watchlist.push(symbol);
        searchInput.value = '';
        renderWatchlist();
        showToast(`Added ${symbol} to watchlist`);
    }
}

function renderDashboard() {
    // Update Indices
    const nifty = getStock("NIFTY 50");
    document.getElementById('nifty-value').innerText = nifty.price.toFixed(2);
    document.getElementById('nifty-change').innerText = `${nifty.change >= 0 ? '+' : ''}${nifty.change.toFixed(2)} (${nifty.percent.toFixed(2)}%)`;

    const sensex = getStock("SENSEX");
    document.getElementById('sensex-value').innerText = sensex.price.toFixed(2);
    document.getElementById('sensex-change').innerText = `${sensex.change >= 0 ? '+' : ''}${sensex.change.toFixed(2)} (${sensex.percent.toFixed(2)}%)`;

    // Calculate Holdings Summary
    let totalInv = 0;
    let currVal = 0;

    STATE.holdings.forEach(h => {
        const stock = getStock(h.symbol);
        totalInv += h.qty * h.avgPrice;
        currVal += h.qty * stock.price;
    });

    const totalPnL = currVal - totalInv;
    const totalPnLPercent = totalInv > 0 ? (totalPnL / totalInv) * 100 : 0;

    // Update DOM
    const summaryGrid = document.querySelector('.summary-grid');
    summaryGrid.innerHTML = `
        <div class="summary-item">
            <div class="label">Total investment</div>
            <div class="value">₹${totalInv.toFixed(2)}</div>
        </div>
        <div class="summary-item">
            <div class="label">Current value</div>
            <div class="value">₹${currVal.toFixed(2)}</div>
        </div>
        <div class="summary-item">
            <div class="label">Day's P&L</div>
            <div class="value ${totalPnL >= 0 ? 'positive' : 'negative'}">${totalPnL >= 0 ? '+' : ''}₹${(totalPnL * 0.1).toFixed(2)} (0.5%)</div> 
        </div>
        <div class="summary-item">
            <div class="label">Total P&L</div>
            <div class="value ${totalPnL >= 0 ? 'positive' : 'negative'}">${totalPnL >= 0 ? '+' : ''}₹${totalPnL.toFixed(2)} (${totalPnLPercent.toFixed(2)}%)</div>
        </div>
    `;

    document.querySelector('.section-header h2').innerText = `Holdings (${STATE.holdings.length})`;

    renderPortfolioChart(totalInv, currVal);
}

function renderOrders() {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';

    if (STATE.orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No orders placed yet.</td></tr>';
        return;
    }

    STATE.orders.slice().reverse().forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.time}</td>
            <td><span class="tag ${order.type.toLowerCase()}">${order.type}</span></td>
            <td>${order.symbol}</td>
            <td>${order.product}</td>
            <td>${order.qty} / ${order.qty}</td>
            <td>${order.price.toFixed(2)}</td>
            <td><span class="tag completed">COMPLETE</span></td>
        `;
        tbody.appendChild(row);
    });
}

function renderFunds() {
    const container = document.getElementById('funds-content');

    container.innerHTML = `
        <div class="funds-container">
            <div class="funds-card">
                <div class="label">Available margin</div>
                <div class="value">₹${STATE.funds.toFixed(2)}</div>
                <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
                    <button class="btn-submit" onclick="openPaymentModal()" style="width: 100%;">Add funds</button>
                    <button class="btn-submit" onclick="openWithdrawModal()" style="width: 100%; background-color: var(--bg-hover); color: var(--text-primary);">Withdraw</button>
                </div>
                <div style="margin-top: 20px; font-size: 0.9rem; color: var(--accent-blue); cursor: pointer;">View statement</div>
            </div>
            <div class="funds-details">
                <div class="fund-row">
                    <span>Opening Balance</span>
                    <span>₹1,00,000.00</span>
                </div>
                <div class="fund-row">
                    <span>Payin</span>
                    <span>₹0.00</span>
                </div>
                <div class="fund-row">
                    <span>Payout</span>
                    <span>₹0.00</span>
                </div>
                <div class="fund-row">
                    <span>Span</span>
                    <span>₹0.00</span>
                </div>
                <div class="fund-row">
                    <span>Delivery margin</span>
                    <span>₹0.00</span>
                </div>
                <div class="fund-row">
                    <span>Exposure</span>
                    <span>₹0.00</span>
                </div>
                <div class="fund-row">
                    <span>Options premium</span>
                    <span>₹0.00</span>
                </div>
            </div>
        </div>
    `;
}

// Payment Logic
const paymentModal = document.getElementById('payment-modal');
const withdrawModal = document.getElementById('withdraw-modal');

function openPaymentModal() {
    paymentModal.classList.remove('hidden');
    document.getElementById('payment-status').classList.add('hidden');
    document.querySelector('.payment-methods').classList.remove('hidden');
    document.querySelector('.modal-footer').classList.remove('hidden');
}

function closePaymentModal() {
    paymentModal.classList.add('hidden');
}

function selectPaymentMethod(el) {
    document.querySelectorAll('.method-option').forEach(opt => {
        opt.classList.remove('active');
        opt.style.borderColor = 'var(--border-color)';
        opt.style.background = 'transparent';
    });

    el.classList.add('active');
    el.style.borderColor = 'var(--accent-blue)';
    el.style.background = 'rgba(65, 132, 243, 0.1)';
}

// Mock UPI API
async function mockUPIPayment(amount, vpa = "user@upi") {
    return new Promise((resolve, reject) => {
        console.log(`Initiating UPI payment of ₹${amount} to ${vpa}`);
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            if (success) resolve({ txnId: "UPI" + Date.now(), status: "SUCCESS" });
            else reject({ error: "Payment Failed" });
        }, 2000);
    });
}

async function processPayment() {
    const amount = parseFloat(document.getElementById('payment-amount').value);
    if (!amount || amount <= 0) {
        showToast("Please enter a valid amount");
        return;
    }

    // UI Loading State
    document.querySelector('.payment-methods').classList.add('hidden');
    document.querySelector('.modal-footer').classList.add('hidden');
    document.getElementById('payment-status').classList.remove('hidden');
    document.querySelector('#payment-status p').innerText = "Waiting for UPI confirmation...";

    try {
        const response = await mockUPIPayment(amount);
        if (response.status === "SUCCESS") {
            STATE.funds += amount;
            showToast(`Added ₹${amount.toFixed(2)} successfully`);
            closePaymentModal();
            renderFunds();
        }
    } catch (e) {
        showToast("Payment Failed! Please try again.");
        closePaymentModal();
    }
}

// Withdraw Logic
function openWithdrawModal() {
    withdrawModal.classList.remove('hidden');
    document.getElementById('withdraw-amount').value = '';
    document.getElementById('withdraw-available').innerText = STATE.funds.toFixed(2);
    document.getElementById('withdraw-status').classList.add('hidden');
    document.querySelector('#withdraw-modal .modal-footer').classList.remove('hidden');
    document.querySelector('#withdraw-modal .modal-body .input-field').classList.remove('hidden');
}

function closeWithdrawModal() {
    withdrawModal.classList.add('hidden');
}

function processWithdrawal() {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);

    if (!amount || amount <= 0) {
        showToast("Please enter a valid amount");
        return;
    }

    if (amount > STATE.funds) {
        showToast("Insufficient withdrawable balance");
        return;
    }

    // UI Loading State
    document.querySelector('#withdraw-modal .modal-footer').classList.add('hidden');
    document.querySelector('#withdraw-modal .modal-body .input-field').classList.add('hidden');
    document.getElementById('withdraw-status').classList.remove('hidden');

    // Simulate Bank Processing
    setTimeout(() => {
        STATE.funds -= amount;
        showToast(`Withdrawal request for ₹${amount.toFixed(2)} placed`);
        closeWithdrawModal();
        renderFunds();
    }, 2000);
}

function updateDetailChange(stock) {
    const isPositive = stock.change >= 0;
    const el = document.getElementById('detail-change');
    el.className = `change-lg ${isPositive ? 'positive' : 'negative'}`;
    el.innerText = `${isPositive ? '+' : ''}${stock.change.toFixed(2)} (${stock.percent.toFixed(2)}%)`;
}

// Simulation
function startSimulation() {
    setInterval(() => {
        STOCK_UNIVERSE.forEach(stock => {
            // Only simulate small ticks if real data hasn't updated recently, 
            // or just add micro-fluctuations for "liveness"
            stock.previousPrice = stock.price;
            const move = (Math.random() - 0.5) * (stock.price * 0.0005); // Smaller moves
            stock.price += move;
            stock.change += move;
            stock.percent = (stock.change / (stock.price - stock.change)) * 100;
        });

        renderWatchlist();

        if (STATE.currentView === 'dashboard') renderDashboard();
        if (STATE.currentView === 'stock-detail' && STATE.activeStock) {
            document.getElementById('detail-price').innerText = STATE.activeStock.price.toFixed(2);
            updateDetailChange(STATE.activeStock);
            renderMarketDepth(); // Live depth updates

            if (chartInstance) {
                chartInstance.data.labels.push(new Date().toLocaleTimeString());
                chartInstance.data.datasets[0].data.push(STATE.activeStock.price);
                if (chartInstance.data.labels.length > 50) {
                    chartInstance.data.labels.shift();
                    chartInstance.data.datasets[0].data.shift();
                }
                chartInstance.update('none');
            }
        }
    }, 1000);
}

// Charting
function renderStockChart(stock) {
    const ctx = document.getElementById('stock-chart').getContext('2d');

    const history = [];
    const labels = [];
    let price = stock.price;
    for (let i = 0; i < 50; i++) {
        price = price - (Math.random() - 0.5) * 5;
        history.unshift(price);
        labels.unshift(new Date(Date.now() - i * 60000).toLocaleTimeString());
    }

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: stock.symbol,
                data: history,
                borderColor: '#4184f3',
                backgroundColor: 'rgba(65, 132, 243, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: {
                    position: 'right',
                    grid: { color: '#2e2e2e' },
                    ticks: { color: '#9b9b9b' }
                }
            },
            interaction: { intersect: false, mode: 'index' },
            animation: false
        }
    });
}

function renderPortfolioChart(invested, current) {
    const ctx = document.getElementById('portfolio-chart').getContext('2d');
    if (portfolioChartInstance) portfolioChartInstance.destroy();

    portfolioChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Invested', 'Profit'],
            datasets: [{
                data: [invested, Math.max(0, current - invested)],
                backgroundColor: ['#4184f3', '#2ecc71'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#e0e0e0' } }
            }
        }
    });
}

function renderMarketDepth() {
    const bidRows = document.getElementById('bid-rows');
    const offerRows = document.getElementById('offer-rows');

    let bids = '', offers = '';
    for (let i = 0; i < 5; i++) {
        bids += `
            <div class="depth-row">
                <span>${(STATE.activeStock.price - i * 0.05).toFixed(2)}</span>
                <span>${Math.floor(Math.random() * 10)}</span>
                <span>${Math.floor(Math.random() * 1000)}</span>
            </div>`;
        offers += `
            <div class="depth-row">
                <span>${(STATE.activeStock.price + i * 0.05).toFixed(2)}</span>
                <span>${Math.floor(Math.random() * 10)}</span>
                <span>${Math.floor(Math.random() * 1000)}</span>
            </div>`;
    }

    bidRows.innerHTML = bids;
    offerRows.innerHTML = offers;
}

// Modal Logic
function openBuyModal() { openModal('buy'); }
function openSellModal() { openModal('sell'); }

function openModal(type) {
    modal.classList.remove('hidden');
    const header = document.getElementById('modal-header');
    const btn = document.querySelector('.btn-submit');

    if (type === 'buy') {
        header.className = 'modal-header buy-mode';
        document.querySelector('.modal-action').innerText = 'BUY';
        btn.style.backgroundColor = 'var(--accent-blue)';
        btn.innerText = 'Buy';
        btn.onclick = () => executeOrder('buy');
    } else {
        header.className = 'modal-header sell-mode';
        document.querySelector('.modal-action').innerText = 'SELL';
        btn.style.backgroundColor = 'var(--accent-red)';
        btn.innerText = 'Sell';
        btn.onclick = () => executeOrder('sell');
    }

    document.getElementById('modal-symbol').innerText = STATE.activeStock.symbol;
    document.getElementById('modal-live-price').innerText = STATE.activeStock.price.toFixed(2);
    document.getElementById('order-price').value = STATE.activeStock.price.toFixed(2);
}

function closeModal() {
    modal.classList.add('hidden');
}

function executeOrder(type) {
    const qty = parseInt(document.getElementById('order-qty').value);
    const price = parseFloat(document.getElementById('order-price').value);
    const symbol = STATE.activeStock.symbol;
    const product = document.querySelector('input[name="product"]:checked').nextElementSibling.innerText.split(' ')[0];

    if (type === 'buy') {
        const cost = qty * price;
        if (cost > STATE.funds) {
            showToast("Insufficient Funds!");
            // Optional: Prompt to add funds
            return;
        }

        STATE.funds -= cost;
        const existing = STATE.holdings.find(h => h.symbol === symbol);
        if (existing) {
            const totalCost = (existing.qty * existing.avgPrice) + cost;
            existing.qty += qty;
            existing.avgPrice = totalCost / existing.qty;
        } else {
            STATE.holdings.push({ symbol, qty, avgPrice: price });
        }

        STATE.orders.push({
            time: new Date().toLocaleTimeString(),
            type: 'BUY',
            symbol: symbol,
            product: product,
            qty: qty,
            price: price
        });

        showToast(`Bought ${qty} ${symbol} at ${price}`);
    } else {
        const existing = STATE.holdings.find(h => h.symbol === symbol);
        if (!existing || existing.qty < qty) {
            showToast("Insufficient Holdings!");
            return;
        }

        STATE.funds += qty * price;
        existing.qty -= qty;
        if (existing.qty === 0) {
            STATE.holdings = STATE.holdings.filter(h => h.symbol !== symbol);
        }

        STATE.orders.push({
            time: new Date().toLocaleTimeString(),
            type: 'SELL',
            symbol: symbol,
            product: product,
            qty: qty,
            price: price
        });

        showToast(`Sold ${qty} ${symbol} at ${price}`);
    }

    closeModal();
    if (STATE.currentView === 'dashboard') renderDashboard();
}

function showToast(msg) {
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Close payment modal on outside click
paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) closePaymentModal();
});
