// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const API_CONFIG = {
    baseUrl: 'http://localhost:3000',
    endpoints: {
        contact: '/api/contact/submit',
        form: '/api/form/submit',
        currency: '/api/currency/convert',
        health: '/api/health'
    }
};

// Sample articles data for Resources & Insights section
const ARTICLES_DATA = {
    retirement: [
        { image: 'images/article1.jpg', title: 'Retirement Planning', description: 'Secure your future with smart retirement strategies.' },
        { image: 'images/article2.jpg', title: 'Pension Options', description: 'Understanding different pension schemes.' }
    ],
    business: [
        { image: 'images/article3.jpg', title: 'Business Growth', description: 'Strategies for scaling your business.' }
    ],
    // Add other categories as needed
};

const PAGE_TITLES = {
    "index.html": "Home",
    "about-company.html": "About Us",
    "pressroom.html": "Pressroom",
    "careers.html": "Career Opportunities",
    "hierarchy.html": "Hierarchy",
    "fund-managers.html": "Umelusi Fund Managers",
    "partners.html": "Umelusi Partners",
    "capital.html": "Umelusi Capital",
    "finserve.html": "Umelusi FinServ",
    "markets.html": "Markets",
    "resources.html": "Resources & Insights"
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Display a notification to the user
 * @param {string} message - The message to display
 * @param {boolean} isSuccess - Whether it's a success or error notification
 */
function showNotification(message, isSuccess = true) {
    let container = document.getElementById('notification-container');

    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }

    // Clear any existing hide timer
    if (container.timeoutId) clearTimeout(container.timeoutId);

    container.innerHTML = `
        <i class="${isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'} me-2"></i>
        ${message}
    `;
    container.className = isSuccess ? 'success' : 'error';

    // Animate in
    setTimeout(() => container.classList.add('show'), 10);

    // Hide after 5 seconds
    container.timeoutId = setTimeout(() => container.classList.remove('show'), 5000);

    // Remove from DOM after animation
    setTimeout(() => {
        if (!container.classList.contains('show')) container.remove();
    }, 5500);
}

/**
 * Display currency conversion result
 */
function showConversionResult(container, amount, from, to, data) {
    container.innerHTML = `
        <div class="conversion-result">
            <div class="fs-4 mb-2">
                <span class="fw-bold">${amount.toFixed(2)} ${from}</span>
                <span class="mx-2">=</span>
                <span style="color: var(--umelusi-orange); font-weight: bold;">
                    ${data.convertedAmount} ${to}
                </span>
            </div>
            <div class="text-muted small">
                Exchange rate: 1 ${from} = ${data.rate.toFixed(4)} ${to}
            </div>
        </div>
    `;
}

// ============================================
// TRADINGVIEW WIDGETS
// ============================================

function loadTradingViewWidgets() {
    console.log('🔧 Loading TradingView widgets...');
    
    // Global Indices
    const indicesContainer = document.getElementById("global-indices");
    if (indicesContainer) {
        indicesContainer.innerHTML = '';
        const indicesScript = document.createElement('script');
        indicesScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        indicesScript.async = true;
        indicesScript.innerHTML = JSON.stringify({
            symbols: [
                { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
                { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
                { proName: "FOREXCOM:DJI", title: "Dow 30" },
                { proName: "INDEX:NKY", title: "Nikkei 225" },
                { proName: "INDEX:DEU40", title: "DAX" },
                { proName: "FOREXCOM:UKXGBP", title: "FTSE 100" }
            ],
            showSymbolLogo: true,
            colorTheme: "light",
            isTransparent: false,
            displayMode: "adaptive",
            locale: "en"
        });
        indicesContainer.appendChild(indicesScript);
    }

    // Currency Rates
    const currencyRatesContainer = document.getElementById("currency-rates");
    if (currencyRatesContainer) {
        currencyRatesContainer.innerHTML = '';
        const currencyScript = document.createElement('script');
        currencyScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        currencyScript.async = true;
        currencyScript.innerHTML = JSON.stringify({
            symbols: [
                { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
                { proName: "FX_IDC:GBPUSD", title: "GBP/USD" },
                { proName: "FX_IDC:USDZAR", title: "USD/ZAR" },
                { proName: "FX_IDC:USDJPY", title: "USD/JPY" },
                { proName: "FX_IDC:USDCNY", title: "USD/CNY" }
            ],
            showSymbolLogo: true,
            colorTheme: "light",
            isTransparent: false,
            displayMode: "adaptive",
            locale: "en"
        });
        currencyRatesContainer.appendChild(currencyScript);
    }

    // Crypto Prices
    const cryptoContainer = document.getElementById("crypto-prices");
    if (cryptoContainer) {
        cryptoContainer.innerHTML = '';
        const cryptoScript = document.createElement('script');
        cryptoScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        cryptoScript.async = true;
        cryptoScript.innerHTML = JSON.stringify({
            symbols: [
                { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
                { proName: "BINANCE:XRPUSDT", title: "Ripple" },
                { proName: "BINANCE:SOLUSDT", title: "Solana" }
            ],
            showSymbolLogo: true,
            colorTheme: "light",
            isTransparent: false,
            displayMode: "adaptive",
            locale: "en"
        });
        cryptoContainer.appendChild(cryptoScript);
    }

    // Market News
    const newsContainer = document.getElementById("market-news");
    if (newsContainer) {
        newsContainer.innerHTML = '';
        const newsScript = document.createElement('script');
        newsScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        newsScript.async = true;
        newsScript.innerHTML = JSON.stringify({
            feedMode: "all_symbols",
            colorTheme: "light",
            isTransparent: false,
            displayMode: "compact",
            width: "100%",
            height: "600",
            locale: "en"
        });
        newsContainer.appendChild(newsScript);
    }

    // Economic Calendar
    const calendarContainer = document.getElementById("economic-calendar");
    if (calendarContainer) {
        calendarContainer.innerHTML = '';
        const calendarScript = document.createElement('script');
        calendarScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        calendarScript.async = true;
        calendarScript.innerHTML = JSON.stringify({
            colorTheme: "light",
            isTransparent: false,
            width: "100%",
            height: "550",
            locale: "en",
            importanceFilter: "-1"
        });
        calendarContainer.appendChild(calendarScript);
    }
    
    console.log('✅ All TradingView widgets initialized');
}

// ============================================
// CURRENCY CONVERTER
// ============================================

async function convertCurrency() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const resultElement = document.getElementById('conversion-result');

    if (!amountInput || !fromCurrency || !toCurrency || !resultElement) return;

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0)
        return showNotification('Enter a valid positive amount.', false);

    if (!from || !to)
        return showNotification('Select both source and target currencies.', false);

    if (from === to)
        return showNotification('Source and target cannot be the same.', false);

    resultElement.innerHTML = `
        <div class="text-center">
            <div class="spinner-border spinner-border-sm text-umelusi-orange me-2"></div>
            Fetching live rates...
        </div>
    `;

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();

        if (!data || data.result !== "success") {
            throw new Error("Rate lookup failed");
        }

        const rate = data.rates[to];

        if (!rate) {
            throw new Error("Currency not supported");
        }

        const convertedAmount = (amount * rate).toFixed(2);

        showConversionResult(resultElement, amount, from, to, {
            rate,
            convertedAmount,
            demo: false
        });

        showNotification("Currency converted successfully!", true);

    } catch (error) {
        console.error("Currency conversion error:", error);

        resultElement.innerHTML = `
            <div class="text-danger">
                <i class="fas fa-exclamation-circle me-1"></i>
                Unable to fetch exchange rates
            </div>
        `;

        showNotification("Currency service temporarily unavailable.", false);
    }
}

// ============================================
// CAROUSEL MANAGEMENT
// ============================================

function initCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const cards = container.querySelectorAll(".carousel-card");
    const nextBtn = container.querySelector(".next-btn");
    const prevBtn = container.querySelector(".prev-btn");
    let current = 0;

    function update() {
        cards.forEach((card, i) => card.classList.toggle("active", i === current));
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => { 
            current = (current + 1) % cards.length; 
            update(); 
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener("click", () => { 
            current = (current - 1 + cards.length) % cards.length; 
            update(); 
        });
    }

    if (cards.length) update();
}

// ============================================
// PRESSROOM FILTERS
// ============================================

function setupPressroomFilters() {
    const searchInput = document.getElementById('press-search');
    const filterButtons = document.querySelectorAll('.press-filters .btn');
    const pressItems = document.querySelectorAll('.press-item');
    const noResults = document.querySelector('.no-results');
    const itemsPerPage = 6;
    const pagination = document.getElementById("pagination-controls");
    
    if (!searchInput || !filterButtons.length || !pressItems.length) return;

    let activeFilter = 'all';
    let searchQuery = '';
    let currentPage = 1;

    function filterItems() {
        let visibleItems = [];
        pressItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const title = item.querySelector('.press-title')?.textContent.toLowerCase() || "";
            const summary = item.querySelector('.press-summary')?.textContent.toLowerCase() || "";
            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = !searchQuery || title.includes(searchQuery) || summary.includes(searchQuery);

            item.style.display = (matchesFilter && matchesSearch) ? "block" : "none";
            if (matchesFilter && matchesSearch) visibleItems.push(item);
        });

        if (noResults) noResults.style.display = visibleItems.length ? "none" : "block";
        renderPagination(visibleItems);
    }

    function renderPagination(items) {
        if (!pagination) return;
        const totalPages = Math.ceil(items.length / itemsPerPage);
        pagination.innerHTML = "";
        
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === currentPage) li.classList.add("active");
            li.innerHTML = `<button class="page-link">${i}</button>`;
            li.addEventListener("click", () => { 
                currentPage = i; 
                showPage(items, currentPage); 
            });
            pagination.appendChild(li);
        }
        showPage(items, currentPage);
    }

    function showPage(items, page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        items.forEach((item, i) => {
            item.style.display = (i >= start && i < end) ? "block" : "none";
        });
    }

    searchInput.addEventListener('input', e => { 
        searchQuery = e.target.value.toLowerCase().trim(); 
        currentPage = 1; 
        filterItems(); 
    });
    
    filterButtons.forEach(btn => btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        currentPage = 1;
        filterItems();
    }));

    filterItems();
}

// ============================================
// RESOURCES & INSIGHTS TABS
// ============================================

function renderArticles(category) {
    const container = document.getElementById("tabs-content");
    if (!container) return;
    
    container.innerHTML = "";
    const items = (ARTICLES_DATA[category] || []).slice(0, 6);
    
    items.forEach(a => {
        const card = document.createElement("div");
        card.className = "article-card";
        card.innerHTML = `
            <img src="${a.image}" alt="${a.title}" loading="lazy">
            <div class="article-content">
                <h4>${a.title}</h4>
                <p>${a.description}</p>
            </div>`;
        container.appendChild(card);
    });
    
    const viewAllLink = document.getElementById("view-all-link");
    if (viewAllLink) {
        viewAllLink.href = `resources-${category}.html`;
        const labels = {
            retirement: "Retirement",
            business: "Business Consulting",
            wealth: "Wealth Building",
            investment: "Investment Strategies",
            finance: "Personal Finance",
            company: "Company News",
            perspectives: "News & Perspectives"
        };
        viewAllLink.textContent = `View all ${labels[category] || category} articles`;
    }
}

function setupResourcesTabs() {
    const tabButtons = document.querySelectorAll(".filter-tabs .filter-btn");
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(btn => btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderArticles(btn.getAttribute("data-category"));
    }));
    
    // Initial render
    renderArticles("retirement");
}

// ============================================
// BREADCRUMB TRAIL - Fixed Version
// ============================================

// Page titles are defined earlier in this file; reuse the existing PAGE_TITLES constant to avoid redeclaration.

function setupBreadcrumb() {
    const breadcrumbContainer = document.getElementById("breadcrumb-trail");
    if (!breadcrumbContainer) return;

    let currentPage = window.location.pathname.split("/").pop() || "index.html";
    if (!currentPage.endsWith(".html") && currentPage !== "") currentPage = "index.html"; // safety

    // Load trail from localStorage
    let trail = JSON.parse(localStorage.getItem("breadcrumbTrail") || "[]");

    // If on home and trail has items, optionally clear (or keep history)
    if (currentPage === "index.html") {
        trail = []; // Reset on home visit
    }

    // Remove duplicates of current page (in case of refresh)
    trail = trail.filter(p => p.file !== currentPage);

    // Add Home if not present and not on home
    if (currentPage !== "index.html" && !trail.some(p => p.file === "index.html")) {
        trail.unshift({ title: "Home", file: "index.html" });
    }

    // Add current page at the end
    trail.push({ 
        title: PAGE_TITLES[currentPage] || currentPage.replace(".html", "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), 
        file: currentPage 
    });

    // Limit trail length (optional, keep last 5 including current)
    if (trail.length > 5) trail = trail.slice(-5);

    // Save back to localStorage
    localStorage.setItem("breadcrumbTrail", JSON.stringify(trail));

    // Render breadcrumb
    breadcrumbContainer.innerHTML = trail.map((p, i) => {
        if (i === trail.length - 1) {
            return `<li class="breadcrumb-item active" aria-current="page">${p.title}</li>`;
        } else {
            return `<li class="breadcrumb-item"><a href="${p.file}">${p.title}</a></li>`;
        }
    }).join("");
}

// Run on page load
document.addEventListener("DOMContentLoaded", setupBreadcrumb);



// ============================================
// NETLIFY FORMS ENHANCEMENT
// ============================================

function enhanceNetlifyForms() {
    console.log('🔧 Enhancing Netlify forms UX...');
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('form') === 'success') {
        showNotification('Thank you! Your message has been sent successfully.', true);
        
        // Remove the parameter from URL without refreshing
        const url = new URL(window.location);
        url.searchParams.delete('form');
        window.history.replaceState({}, '', url);
    }
    
    // Add UX enhancements to all Netlify forms
    document.querySelectorAll('form[data-netlify="true"]').forEach(form => {
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (submitButton) {
            // Store original button text
            if (!submitButton.hasAttribute('data-original-text')) {
                submitButton.setAttribute('data-original-text', submitButton.innerHTML);
            }
            
            // Add loading state on submit
            form.addEventListener('submit', function() {
                const originalText = submitButton.getAttribute('data-original-text');
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
                submitButton.disabled = true;
                submitButton.classList.add('btn-loading');
                
                // Reset button after 10 seconds (in case form fails silently)
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('btn-loading');
                }, 10000);
            });
            
            // Add form validation styling
            form.addEventListener('invalid', function(e) {
                e.preventDefault();
                form.classList.add('was-validated');
            }, true);
            
            // Reset validation on input
            form.querySelectorAll('input, textarea, select').forEach(input => {
                input.addEventListener('input', function() {
                    this.classList.remove('is-invalid');
                    if (form.classList.contains('was-validated')) {
                        form.classList.remove('was-validated');
                    }
                });
            });
        }
    });
    
    console.log('✅ Netlify forms enhanced');
}

// ============================================
// FORM ANALYTICS
// ============================================

function setupFormAnalytics() {
    // Track form submissions
    document.querySelectorAll('form[data-netlify="true"]').forEach(form => {
        form.addEventListener('submit', function() {
            const formName = this.getAttribute('name') || 'unknown-form';
            console.log(`📝 Form submitted: ${formName}`);
            
            // You can add Google Analytics here later
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'form_submit', {
            //         'event_category': 'Form',
            //         'event_label': formName
            //     });
            // }
        });
    });
    
    console.log('✅ Form analytics initialized');
}

// ============================================
// NAVBAR SHRINK EFFECT
// ============================================

function setupNavbarShrink() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("navbar-shrink", window.scrollY > 30);
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function setupBackToTop() {
    const backToTop = document.getElementById("back-to-top");
    if (!backToTop) return;
    
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ============================================
// CURRENCY CONVERTER EVENTS
// ============================================

function setupCurrencyConverter() {
    const convertButton = document.getElementById("convert-btn");
    const amountInput = document.getElementById("amount");

    if (convertButton) {
        convertButton.addEventListener("click", e => {
            e.preventDefault();
            convertCurrency();
        });
    }

    if (amountInput) {
        amountInput.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                convertCurrency();
            }
        });
    }
}

// ============================================
// DEBUG TOOLS (Development Only)
// ============================================

function addDebugTools() {
    // Only add in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            const form = document.getElementById('contactForm');
            if (form) {
                const debugBtn = document.createElement('button');
                debugBtn.id = 'debugTestBtn';
                debugBtn.textContent = '🧪 TEST CONTACT FORM';
                debugBtn.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 99999;
                    background: #FF0000;
                    color: #fff;
                    padding: 15px 20px;
                    border-radius: 10px;
                    border: none;
                    font-weight: bold;
                    font-size: 16px;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                `;
                
                debugBtn.onclick = async () => {
                    const testData = { 
                        contactName: 'Debug Test User', 
                        contactEmail: 'debug@test.com', 
                        contactMessage: 'Test message from debug button.' 
                    };
                    
                    try {
                        const res = await fetch('http://localhost:3000/api/contact/submit', { 
                            method: 'POST', 
                            headers: {'Content-Type': 'application/json'}, 
                            body: JSON.stringify(testData) 
                        });
                        const result = await res.json();
                        alert(result.success ? `✅ SUCCESS!\n${result.message}` : `❌ FAILED\n${result.error}`);
                    } catch (err) {
                        alert(`💥 NETWORK ERROR\n${err.message}`);
                    }
                };
                
                document.body.appendChild(debugBtn);
            }
        }, 1000);
    }
}

// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log('🔧 DOM fully loaded, initializing scripts...');
    
    // Wait a bit to ensure all elements are ready
    setTimeout(() => {
        // Load TradingView widgets first
        loadTradingViewWidgets();
        
        // Initialize all components
        setupBackToTop();
        setupNavbarShrink();
        setupPressroomFilters();
        setupResourcesTabs();
        setupBreadcrumb();
        enhanceNetlifyForms();
        setupFormAnalytics();
        setupCurrencyConverter();
        
        // Initialize carousels
        initCarousel(".carousel-wrapper");
        initCarousel(".executive-carousel");
        
        // Debug tools (development only)
        addDebugTools();
        
        console.log('✅ All scripts initialized successfully');
    }, 100);
});

// =========================================================
// REPLACE "BRAND" / "Subsidiaries" TEXT WITH "SUBSIDIARY" / "SUBSIDIARIES"
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
    // Function to replace text in elements
    function replaceText(selector, oldText, newText) {
        document.querySelectorAll(selector).forEach(el => {
            if (el.textContent.includes(oldText)) {
                el.textContent = el.textContent.replace(new RegExp(oldText, 'g'), newText);
            }
        });
    }

    // Replace in navbar
    replaceText('.navbar .dropdown-toggle', 'Subsidiaries', 'Subsidiaries');
    replaceText('.navbar .dropdown-item', 'Brand', 'Subsidiary');

    // Replace in footer
    replaceText('footer h5', 'Subsidiaries', 'Subsidiaries');

    // Replace any other visible "Subsidiaries" text on page
    replaceText('h1, h2, h3, h4, h5, h6, p, li, span, a', 'Subsidiaries', 'Subsidiaries');
    replaceText('h1, h2, h3, h4, h5, h6, p, li, span, a', 'Brand', 'Subsidiary');
});

// ============================================
// WINDOW EVENT LISTENERS
// ============================================

// Expose functions to global scope if needed
window.showNotification = showNotification;
window.convertCurrency = convertCurrency;