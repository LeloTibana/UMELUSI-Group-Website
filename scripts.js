/// ============================================
// GLOBAL API CONFIG
// ============================================
const API_CONFIG = {
    baseUrl: 'http://localhost:3000', // Use production URL when live
    endpoints: {
        contact: '/api/contact/submit',
        form: '/api/form/submit',
        currency: '/api/currency/convert',
        health: '/api/health'
    }
};

// ============================================
// ✅ TRADINGVIEW WIDGETS - WORKING VERSION
// ============================================

function loadTradingViewWidgets() {
    console.log('🔧 Loading TradingView widgets...');
    
    // Global Indices
    const indicesContainer = document.getElementById("global-indices");
    if (indicesContainer) {
        indicesContainer.innerHTML = ''; // Clear any existing content
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
        console.log('✅ Global indices widget loaded');
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
        console.log('✅ Currency rates widget loaded');
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
        console.log('✅ Crypto prices widget loaded');
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
            displayMode: "compact", // Changed from "adaptive" to match your screenshot
            width: "100%",
            height: "600",
            locale: "en"
        });
        newsContainer.appendChild(newsScript);
        console.log('✅ Market news widget loaded');
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
        console.log('✅ Economic calendar widget loaded');
    }
    
    console.log('✅ All TradingView widgets initialized');
}

// ============================================
// ✅ INITIALIZE EVERYTHING ON DOM LOAD
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log('🔧 DOM fully loaded, initializing scripts...');
    
    // Wait a bit to ensure all elements are ready
    setTimeout(() => {
        // 1. Load TradingView widgets FIRST
        loadTradingViewWidgets();
        
        // 2. Then initialize all your other components...
        
        // Back to Top Button
        const backToTop = document.getElementById("back-to-top");
        if (backToTop) {
            window.addEventListener("scroll", () => {
                backToTop.style.display = window.scrollY > 300 ? "block" : "none";
            });
            backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
        }

        // Generic Carousel Handler
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

            if (nextBtn) nextBtn.addEventListener("click", () => { current = (current + 1) % cards.length; update(); });
            if (prevBtn) prevBtn.addEventListener("click", () => { current = (current - 1 + cards.length) % cards.length; update(); });

            if (cards.length) update();
        }

        initCarousel(".carousel-wrapper");
        initCarousel(".executive-carousel");

        // Pressroom Filters & Search
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
                    li.addEventListener("click", () => { currentPage = i; showPage(items, currentPage); });
                    pagination.appendChild(li);
                }
                showPage(items, currentPage);
            }

            function showPage(items, page) {
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                items.forEach((item, i) => item.style.display = (i >= start && i < end) ? "block" : "none");
            }

            searchInput.addEventListener('input', e => { searchQuery = e.target.value.toLowerCase().trim(); currentPage = 1; filterItems(); });
            filterButtons.forEach(btn => btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.getAttribute('data-filter');
                currentPage = 1;
                filterItems();
            }));

            filterItems();
        }
        setupPressroomFilters();

        // Navbar Logo Shrink
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            window.addEventListener("scroll", () => {
                navbar.classList.toggle("navbar-shrink", window.scrollY > 30);
            });
        }

        // Resources & Insights Tabs
        const articles = { /* your articles object */ };
        function renderArticles(category) {
            const container = document.getElementById("tabs-content");
            if (!container) return;
            container.innerHTML = "";
            const items = (articles[category] || []).slice(0, 6);
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
                    retirement: "Retirement", business: "Business Consulting", wealth: "Wealth Building",
                    investment: "Investment Strategies", finance: "Personal Finance",
                    company: "Company News", perspectives: "News & Perspectives"
                };
                viewAllLink.textContent = `View all ${labels[category] || category} articles`;
            }
        }

        const tabButtons = document.querySelectorAll(".filter-tabs .filter-btn");
        if (tabButtons.length > 0) {
            tabButtons.forEach(btn => btn.addEventListener("click", () => {
                tabButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderArticles(btn.getAttribute("data-category"));
            }));
            renderArticles("retirement");
        }

        // Breadcrumb Trail
        const breadcrumbContainer = document.getElementById("breadcrumb-trail");
        if (breadcrumbContainer) {
            let currentPage = window.location.pathname.split("/").pop() || "index.html";
            const pageTitles = {
                "index.html": "Home", "about-company.html": "About Us", "pressroom.html": "Pressroom",
                "careers.html": "Career Opportunities", "hierarchy.html": "Hierarchy",
                "fund-managers.html": "Umelusi Fund Managers", "partners.html": "Umelusi Partners",
                "capital.html": "Umelusi Capital", "finserve.html": "Umelusi FinServe",
                "markets.html": "Markets", "resources.html": "Resources & Insights"
            };
            let trail = JSON.parse(localStorage.getItem("breadcrumbTrail")) || [];
            if (!trail.length && currentPage !== "index.html") trail.push({ title: "Home", file: "index.html" });
            trail = trail.filter(p => p.file !== currentPage);
            trail.push({ title: pageTitles[currentPage] || currentPage.replace(".html", ""), file: currentPage });
            if (trail.length > 5) trail = trail.slice(-5);
            localStorage.setItem("breadcrumbTrail", JSON.stringify(trail));
            breadcrumbContainer.innerHTML = trail.map((p, i) =>
                i === trail.length - 1 ? `<li class="breadcrumb-item active">${p.title}</li>` : `<li class="breadcrumb-item"><a href="${p.file}">${p.title}</a></li>`
            ).join("");
        }

        // Contact Form Debug Button (optional)
        const form = document.getElementById('contactForm');
        if (form) {
            setTimeout(() => {
                const btn = document.createElement('button');
                btn.id = 'debugTestBtn';
                btn.textContent = '🧪 TEST CONTACT FORM';
                btn.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;background:#FF0000;color:#fff;padding:15px 20px;border-radius:10px;border:none;font-weight:bold;font-size:16px;cursor:pointer;box-shadow:0 4px 8px rgba(0,0,0,0.3);';
                btn.onclick = async () => {
                    const testData = { contactName: 'Debug Test User', contactEmail: 'debug@test.com', contactMessage: 'Test message from debug button.' };
                    try {
                        const res = await fetch('http://localhost:3000/api/contact/submit', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(testData) });
                        const result = await res.json();
                        alert(result.success ? `✅ SUCCESS!\n${result.message}` : `❌ FAILED\n${result.error}`);
                    } catch (err) {
                        alert(`💥 NETWORK ERROR\n${err.message}`);
                    }
                };
                document.body.appendChild(btn);
            }, 1000);
        }

        console.log('✅ All scripts initialized successfully');
        
    }, 100); // Small delay to ensure DOM is fully ready
});

// ============================================
// 2. ENHANCED NOTIFICATION SYSTEM
// ============================================
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

// ============================================
// 3. FORM SUBMISSION HANDLER (NODE.JS VERSION) - CLEANED
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🔧 Setting up forms for Node.js backend...');

    const formConfigs = {
        'mainContactForm': { endpoint: API_CONFIG.endpoints.contact, formType: 'general' },
        'contactForm': { endpoint: API_CONFIG.endpoints.contact, formType: 'contact' },
        'modalContactForm': { endpoint: API_CONFIG.endpoints.form, formType: 'modal' },
        'pressroomNewsletterForm': { endpoint: API_CONFIG.endpoints.form, formType: 'newsletter' },
        'advisorForm': { endpoint: API_CONFIG.endpoints.form, formType: 'advisor' },
        'modalFundManagersForm': { endpoint: API_CONFIG.endpoints.form, formType: 'fund' },
        'advisorContactForm': { endpoint: API_CONFIG.endpoints.form, formType: 'advisor' },
        'finserveMainContactForm': { endpoint: API_CONFIG.endpoints.form, formType: 'finserve' },
        'finserveModalContactForm': { endpoint: API_CONFIG.endpoints.form, formType: 'finserve' },
        'contact-partners-form': { endpoint: API_CONFIG.endpoints.form, formType: 'partners' }
    };

    Object.entries(formConfigs).forEach(([formId, config]) => {
        const form = document.getElementById(formId);
        if (!form) return console.log('Form not found:', formId);

        console.log('Setting up form:', formId);

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            e.stopPropagation();

            const submitButton = form.querySelector('button[type="submit"]');
            if (!submitButton) return console.error('Submit button not found:', formId);

            const originalButtonHTML = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitButton.disabled = true;

            try {
                // Collect and map form data
                let formData = mapToContactFields(Object.fromEntries(new FormData(form)));
                formData.formType = config.formType; // Ensure formType is set

                // Validate required fields
                const validation = validateContactForm(formData);
                if (!validation.isValid) {
                    showNotification(validation.errors.join('. '), false);
                    submitButton.innerHTML = originalButtonHTML;
                    submitButton.disabled = false;
                    return;
                }

                // Send to backend
                const response = await fetch(API_CONFIG.baseUrl + config.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    showFormSuccess(form, result, form.closest('.modal'));
                } else {
                    showFormError(form, result.error || 'Submission failed. Please try again.', 'Submission Error');
                    submitButton.innerHTML = originalButtonHTML;
                    submitButton.disabled = false;
                }

            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Network error. Please check your connection and try again.', false);
                submitButton.innerHTML = originalButtonHTML;
                submitButton.disabled = false;
            }
        });
    });

    console.log('✅ All forms setup complete');

    // Optional: check backend health
    fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.health)
        .then(r => r.json())
        .then(data => console.log('✅ Backend health:', data.status))
        .catch(err => console.warn('⚠️ Backend not reachable:', err.message));
});

// ============================================
// 4. ENHANCED FORM SUCCESS AND ERROR HANDLERS
// ============================================

function showFormSuccess(form, result, modalElement = null) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    const originalButtonClasses = submitButton.className;

    // Update button to show success
    submitButton.innerHTML = '<i class="fas fa-check me-2"></i>Sent Successfully!';
    submitButton.className = originalButtonClasses.replace('btn-primary', 'btn-success');
    submitButton.disabled = true;
    submitButton.style.animation = 'pulse 2s infinite';

    // Show global notification
    showNotification(result.message || 'Thank you! Your message has been sent successfully.', true);

    // Handle dedicated confirmation element if exists
    const confirmationElement = document.getElementById('confirmationMessage');
    if (confirmationElement) {
        form.classList.add('d-none');
        confirmationElement.classList.remove('d-none');
        confirmationElement.classList.add('success-animation');

        if (result.reference) {
            const refNumber = document.getElementById('refNumber');
            const refContainer = document.getElementById('referenceNumber');
            if (refNumber) refNumber.textContent = result.reference;
            if (refContainer) refContainer.classList.remove('d-none');
        }

        const resetTimeout = setTimeout(() => {
            resetFormToOriginal(form, submitButton, originalButtonHTML, originalButtonClasses, confirmationElement);
        }, 8000);

        form.resetTimeout = resetTimeout;

        confirmationElement.addEventListener('click', function manualClose(e) {
            if (!e.target.closest('.reference-number')) {
                clearTimeout(resetTimeout);
                resetFormToOriginal(form, submitButton, originalButtonHTML, originalButtonClasses, confirmationElement);
                this.removeEventListener('click', manualClose);
            }
        });
    } else {
        // Fallback: just reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            submitButton.innerHTML = originalButtonHTML;
            submitButton.className = originalButtonClasses;
            submitButton.disabled = false;
            submitButton.style.animation = '';
        }, 3000);
    }

    // Close modal if applicable
    if (modalElement) {
        setTimeout(() => {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
        }, 2000);
    }

    // Show reference notification separately
    if (result.reference) {
        setTimeout(() => {
            showNotification(`Reference: ${result.reference} - Please keep this for your records.`, true);
        }, 1000);
    }
}

function showFormError(form, message, title = 'Submission Error') {
    const errorElement = document.getElementById('errorMessage');
    const confirmationElement = document.getElementById('confirmationMessage');

    if (confirmationElement) confirmationElement.classList.add('d-none');

    if (errorElement) {
        const errorTitle = errorElement.querySelector('#errorTitle');
        const errorDetail = errorElement.querySelector('#errorDetail');

        if (errorTitle) errorTitle.textContent = title;
        if (errorDetail) errorDetail.textContent = message;

        errorElement.classList.remove('d-none');
        errorElement.classList.add('success-animation');

        setTimeout(() => {
            errorElement.classList.add('d-none');
            errorElement.classList.remove('success-animation');
        }, 10000);
    } else {
        showNotification(message, false);
    }
}

function resetFormToOriginal(form, button, originalHTML, originalClasses, confirmationElement) {
    form.reset();
    form.classList.remove('d-none');
    if (confirmationElement) {
        confirmationElement.classList.add('d-none');
        const refContainer = document.getElementById('referenceNumber');
        if (refContainer) refContainer.classList.add('d-none');
        confirmationElement.classList.remove('success-animation');
    }
    button.innerHTML = originalHTML;
    button.className = originalClasses;
    button.disabled = false;
    button.style.animation = '';
    form.classList.remove('was-validated');
    form.querySelectorAll('.invalid-feedback').forEach(el => (el.style.display = 'none'));
}

// ============================================
// 5. FORM VALIDATION HELPERS
// ============================================

function validateFormData(data, requiredFields = ['contactName', 'contactEmail', 'contactMessage']) {
    const errors = [];

    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            const fieldLabel = field
                .replace('contact', '')
                .replace(/([A-Z])/g, ' $1')
                .trim();
            errors.push(`${fieldLabel} is required`);
        }
    });

    if (data.contactEmail && !isValidEmail(data.contactEmail)) {
        errors.push('Please enter a valid email address');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

function isValidEmail(email) {
    // Basic RFC 5322 compliant regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// 6. FORM FIELD MAPPING UTILITIES
// ============================================

function mapFormDataToContactFields(data, formType = 'general') {
    const mapped = {
        contactName: '',
        contactEmail: '',
        contactMessage: '',
        contactPhone: '',
        contactInterest: '',
        contactOrganization: '',
        formType
    };

    // Map name fields
    mapped.contactName =
        data.contactName ||
        data.name ||
        (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}`.trim() : '') ||
        data.firstName ||
        data.lastName ||
        '';

    // Map email
    mapped.contactEmail = data.contactEmail || data.email || '';

    // Map message
    mapped.contactMessage = data.contactMessage || data.message || '';

    // Map phone
    mapped.contactPhone = data.contactPhone || data.phone || '';

    // Map interest / subject / service
    mapped.contactInterest = data.contactInterest || data.subject || data.service || '';

    // Map organization
    mapped.contactOrganization = data.contactOrganization || data.organization || '';

    // Remove empty fields
    Object.keys(mapped).forEach(key => {
        if (!mapped[key]) delete mapped[key];
    });

    return mapped;
}


// ============================================
// 3. REMOVE LEGACY PHP ACTIONS FROM ALL FORMS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Cleaning up PHP actions from forms...');
    
    document.querySelectorAll('form').forEach(form => {
        if (form.action && form.action.includes('.php')) {
            console.log(`Removing PHP action from form: ${form.id}`);
            form.removeAttribute('action');
            form.removeAttribute('method');
            form.onsubmit = null;
        }
        form.setAttribute('novalidate', 'novalidate'); // prevent default HTML5 submission
    });

    console.log('✅ PHP actions removed from all forms');
});



// ============================================
// 1. NOTIFICATION UTILITY
// ============================================
function showNotification(message, success = true) {
    const toast = document.createElement('div');
    toast.className = `alert ${success ? 'alert-success' : 'alert-danger'} position-fixed top-0 end-0 m-3`;
    toast.style.zIndex = 9999;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// ============================================
// 2. CURRENCY CONVERTER (FRONTEND ONLY FIX)
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
            <div class="spinner-border spinner-border-sm text-warning me-2"></div>
            Fetching live rates...
        </div>
    `;

    try {
        // ✅ FREE PUBLIC API – no backend required
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

// Initialize currency converter events
document.addEventListener("DOMContentLoaded", () => {
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
});


// ============================================
// 3. HEALTH CHECK
// ============================================
/* async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.health}`);
        const data = await response.json();
        console.log('Backend health:', data.status);
        return data.status === 'healthy';
    } catch (err) {
        console.warn('Backend health check failed:', err.message);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkBackendHealth().then(isHealthy => {
        if (!isHealthy) console.warn('⚠️ Backend server might not be running');
    });
}); */



// ============================================
// 5. GENERIC FORM HANDLER (CONTACT & OTHERS)
// ============================================
function setupForm(formId, endpoint) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        e.stopPropagation();

        form.classList.remove('was-validated');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            showNotification('Please fill in all required fields correctly.', false);
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Optional: process name fields
            const processedData = {
                name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : data.firstName || data.lastName || '',
                email: data.email || '',
                phone: data.phone || '',
                subject: data.subject || '',
                message: data.message || '',
                formType: formId
            };

            Object.keys(processedData).forEach(k => { if (!processedData[k]) delete processedData[k]; });

            const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processedData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showFormSuccess(form, result);
            } else {
                showNotification(result.error || 'Submission failed. Please try again.', false);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        } catch (err) {
            console.error('Form error:', err);
            showNotification('Network error. Please try again.', false);
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

function showFormSuccess(form, result) {
    const confirmation = document.getElementById('confirmationMessage');
    if (confirmation) {
        confirmation.classList.remove('d-none');
        if (result.reference) {
            let ref = confirmation.querySelector('#refNumber');
            if (!ref) {
                ref = document.createElement('div');
                ref.id = 'refNumber';
                ref.className = 'mt-2 small text-muted';
                confirmation.appendChild(ref);
            }
            ref.textContent = `Reference: ${result.reference}`;
        }
    } else {
        showNotification('Thank you! Your message has been sent.', true);
    }

    form.classList.add('d-none');
    setTimeout(() => {
        form.reset();
        form.classList.remove('d-none');
        if (confirmation) confirmation.classList.add('d-none');
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.innerHTML = 'Submit Inquiry <i class="fas fa-paper-plane ms-2"></i>';
            submitButton.disabled = false;
        }
    }, 8000);
}

// ============================================
// 6. INITIALIZE FORMS ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Initializing forms...');
    setupForm('contactForm', API_CONFIG.endpoints.contact);
    // Add other forms similarly:
    // setupForm('newsletterForm', API_CONFIG.endpoints.newsletter);
    console.log('✅ Forms initialized');
});


// ========================
// LAST PART REFACTORED
// ========================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------
  // Back to Top Button
  // ------------------------
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // ------------------------
  // Generic Carousel Handler
  // ------------------------
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

    if (nextBtn) nextBtn.addEventListener("click", () => { current = (current + 1) % cards.length; update(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { current = (current - 1 + cards.length) % cards.length; update(); });

    if (cards.length) update();
  }

  initCarousel(".carousel-wrapper");      // Board of Directors
  initCarousel(".executive-carousel");    // Executive Message

  // ------------------------
  // Pressroom Filters & Search
  // ------------------------
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
        li.addEventListener("click", () => { currentPage = i; showPage(items, currentPage); });
        pagination.appendChild(li);
      }
      showPage(items, currentPage);
    }

    function showPage(items, page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      items.forEach((item, i) => item.style.display = (i >= start && i < end) ? "block" : "none");
    }

    searchInput.addEventListener('input', e => { searchQuery = e.target.value.toLowerCase().trim(); currentPage = 1; filterItems(); });
    filterButtons.forEach(btn => btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      currentPage = 1;
      filterItems();
    }));

    filterItems();
  }
  setupPressroomFilters();

  // ------------------------
  // Navbar Logo Shrink
  // ------------------------
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.classList.toggle("navbar-shrink", window.scrollY > 30);
  });

  // ------------------------
  // Resources & Insights Tabs
  // ------------------------
  const articles = { /* same as your previous articles object */ };
  function renderArticles(category) {
    const container = document.getElementById("tabs-content");
    if (!container) return;
    container.innerHTML = "";
    const items = (articles[category] || []).slice(0, 6);
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
        retirement: "Retirement", business: "Business Consulting", wealth: "Wealth Building",
        investment: "Investment Strategies", finance: "Personal Finance",
        company: "Company News", perspectives: "News & Perspectives"
      };
      viewAllLink.textContent = `View all ${labels[category] || category} articles`;
    }
  }

  const tabButtons = document.querySelectorAll(".filter-tabs .filter-btn");
  tabButtons.forEach(btn => btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderArticles(btn.getAttribute("data-category"));
  }));
  renderArticles("retirement");

  // ------------------------
  // Breadcrumb Trail
  // ------------------------
  const breadcrumbContainer = document.getElementById("breadcrumb-trail");
  if (breadcrumbContainer) {
    let currentPage = window.location.pathname.split("/").pop() || "index.html";
    const pageTitles = {
      "index.html": "Home", "about-company.html": "About Us", "pressroom.html": "Pressroom",
      "careers.html": "Career Opportunities", "hierarchy.html": "Hierarchy",
      "fund-managers.html": "Umelusi Fund Managers", "partners.html": "Umelusi Partners",
      "capital.html": "Umelusi Capital", "finserve.html": "Umelusi FinServe",
      "markets.html": "Markets", "resources.html": "Resources & Insights"
    };
    let trail = JSON.parse(localStorage.getItem("breadcrumbTrail")) || [];
    if (!trail.length && currentPage !== "index.html") trail.push({ title: "Home", file: "index.html" });
    trail = trail.filter(p => p.file !== currentPage);
    trail.push({ title: pageTitles[currentPage] || currentPage.replace(".html", ""), file: currentPage });
    if (trail.length > 5) trail = trail.slice(-5);
    localStorage.setItem("breadcrumbTrail", JSON.stringify(trail));
    breadcrumbContainer.innerHTML = trail.map((p, i) =>
      i === trail.length - 1 ? `<li class="breadcrumb-item active">${p.title}</li>` : `<li class="breadcrumb-item"><a href="${p.file}">${p.title}</a></li>`
    ).join("");
  }



  // ------------------------
  // Contact Form Debug Button
  // ------------------------
  const form = document.getElementById('contactForm');
  if (form) {
    setTimeout(() => {
      const btn = document.createElement('button');
      btn.id = 'debugTestBtn';
      btn.textContent = '🧪 TEST CONTACT FORM';
      btn.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;background:#FF0000;color:#fff;padding:15px 20px;border-radius:10px;border:none;font-weight:bold;font-size:16px;cursor:pointer;box-shadow:0 4px 8px rgba(0,0,0,0.3);';
      btn.onclick = async () => {
        const testData = { contactName: 'Debug Test User', contactEmail: 'debug@test.com', contactMessage: 'Test message from debug button.' };
        try {
          const res = await fetch('http://localhost:3000/api/contact/submit', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(testData) });
          const result = await res.json();
          alert(result.success ? `✅ SUCCESS!\n${result.message}` : `❌ FAILED\n${result.error}`);
        } catch (err) {
          alert(`💥 NETWORK ERROR\n${err.message}`);
        }
      };
      document.body.appendChild(btn);
    }, 1000);
  }
});
