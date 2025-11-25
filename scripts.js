// ------------------------
// Simulated Market Data
// ------------------------

const marketIndices = [
    { name: "Dow Jones Global Index", initialValue: 12345.67 },
    { name: "NASDAQ Global Select Index", initialValue: 8901.23 },
    { name: "S&P Global 500", initialValue: 10123.45 },
    { name: "MSCI World Index", initialValue: 1234.56 }
];

// Function to update market data in the table
function updateMarketData() {
    const marketDataContainer = document.getElementById("market-data");

    if (!marketDataContainer) return;

    marketDataContainer.innerHTML = ""; // Clear old data

    marketIndices.forEach(index => {
        const change = (Math.random() - 0.5) * 200;
        const newValue = index.initialValue + change;

        const changeClass = change >= 0 ? "text-success" : "text-danger";
        const changeSymbol = change >= 0 ? "+" : "";
        const trendIcon = change >= 0 ? "📈" : "📉";

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = index.name;

        const valueCell = document.createElement("td");
        valueCell.textContent = newValue.toFixed(2);

        const changeCell = document.createElement("td");
        changeCell.className = changeClass;
        changeCell.textContent = `${trendIcon} ${changeSymbol}${change.toFixed(2)}`;

        row.appendChild(nameCell);
        row.appendChild(valueCell);
        row.appendChild(changeCell);

        marketDataContainer.appendChild(row);
    });
}

// Run market data update on load and every 5 seconds (Only runs if #market-data exists)
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("market-data")) {
        updateMarketData();
        setInterval(updateMarketData, 5000);
    }
});


// ------------------------
// Back to Top Button Logic
// ------------------------

document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.getElementById("back-to-top");

    if (!backToTopButton) return;

    window.addEventListener("scroll", () => {
        backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


// ---------------------------------
// Carousel Board of Directors (FIXED - Added Null Checks)
// ---------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const carouselWrapper = document.querySelector(".carousel-wrapper"); // Use a parent element check
  if (!carouselWrapper) return; // EXIT if element doesn't exist

  const cards = document.querySelectorAll(".carousel-card");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  let current = 0;

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === current);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        current = (current + 1) % cards.length;
        updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        current = (current - 1 + cards.length) % cards.length;
        updateCarousel();
    });
  }
  
  // Only call updateCarousel if cards exist to prevent error
  if (cards.length > 0) updateCarousel();
});


// ---------------------------------
// Filter Functionality on Pressroom Page (FIXED - Added Null Checks)
// ---------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.querySelector(".press-filters");
  if (!filterContainer) return; // EXIT if element doesn't exist

  const buttons = filterContainer.querySelectorAll(".btn");
  const items = document.querySelectorAll(".press-item");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Set active state
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      items.forEach(item => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});


// Navbar logo shrink when scrolling 
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const logo = document.getElementById("umelusi-logo");
  
    if (window.scrollY > 30) {
      navbar.classList.add("navbar-shrink");
    } else {
      navbar.classList.remove("navbar-shrink");
    }
  });


// Pagination System
document.addEventListener("DOMContentLoaded", () => {
    const pagination = document.getElementById("pagination-controls");
    if (!pagination) return; // EXIT if element doesn't exist

    const itemsPerPage = 6;
    const items = document.querySelectorAll(".press-item");
    let currentPage = 1;
  
    function showPage(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
  
      items.forEach((item, i) => {
        item.style.display = i >= start && i < end ? "block" : "none";
      });
  
      renderPaginationButtons(page);
    }
  
    function renderPaginationButtons(activePage) {
      const totalPages = Math.ceil(items.length / itemsPerPage);
      pagination.innerHTML = "";
  
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("li");
        btn.classList.add("page-item");
        if (i === activePage) btn.classList.add("active");
  
        btn.innerHTML = `<button class="page-link">${i}</button>`;
        btn.addEventListener("click", () => {
          currentPage = i;
          showPage(currentPage);
        });
  
        pagination.appendChild(btn);
      }
    }
  
    if (items.length > 0) {
      showPage(currentPage);
    }
});

  
// Search Filtering (FIXED - Added Null Checks)
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("press-search");
  if (!searchInput) return; // EXIT if element doesn't exist

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll(".press-item");

    cards.forEach(card => {
      // Safely check for elements before getting innerText
      const title = card.querySelector(".press-title")?.innerText.toLowerCase() || "";
      const summary = card.querySelector(".press-summary")?.innerText.toLowerCase() || "";
      
      card.style.display = (title.includes(query) || summary.includes(query)) ? "block" : "none";
    });
  });
});


//Executive Message Carousel on Home Page (FIXED - Added Null Checks)
// NOTE: This logic is nearly identical to the 'Carousel Board of Directors' block above.
// Consider combining them if they target the same element to avoid confusion.
document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".executive-carousel");
  if (!carouselContainer) return; // EXIT if element doesn't exist

  const cards = carouselContainer.querySelectorAll(".carousel-card");
  const nextBtn = carouselContainer.querySelector(".next-btn");
  const prevBtn = carouselContainer.querySelector(".prev-btn");
  let current = 0;

  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove("active");
    });
    cards[current].classList.add("active");
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        current = (current + 1) % cards.length;
        updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        current = (current - 1 + cards.length) % cards.length;
        updateCarousel();
    });
  }

  if (cards.length > 0) updateCarousel();
});


// Load TradingView widgets dynamically (No changes needed, as they check their own container)

// Global Indices
const indicesContainer = document.getElementById("global-indices");
if (indicesContainer) {
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

// Economic Calendar
const calendarContainer = document.getElementById("economic-calendar");
if (calendarContainer) {
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

// Market News
const newsContainer = document.getElementById("market-news");
if (newsContainer) {
    const newsScript = document.createElement('script');
    newsScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    newsScript.async = true;
    newsScript.innerHTML = JSON.stringify({
      feedMode: "all_symbols",
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      width: "100%",
      height: "600",
      locale: "en"
    });
    newsContainer.appendChild(newsScript);
}

// Crypto Prices
const cryptoContainer = document.getElementById("crypto-prices");
if (cryptoContainer) {
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


// ---------------------------------
// Resources and Insights Page (FIXED - Added Null Checks)
// ---------------------------------

const articles = {
  // ... (Article definitions unchanged)
  retirement: Array.from({ length: 20 }, (_, i) => ({
    title: `Retirement Article ${i + 1}`,
    description: "Helping you retire smarter.",
    image: "https://via.placeholder.com/300x180?text=Retirement"
  })),
  business: Array.from({ length: 10 }, (_, i) => ({
    title: `Business Consulting ${i + 1}`,
    description: "Business growth strategies and insights.",
    image: "https://via.placeholder.com/300x180?text=Business"
  })),
  wealth: Array.from({ length: 12 }, (_, i) => ({
    title: `Wealth Building ${i + 1}`,
    description: "Grow your wealth sustainably.",
    image: "https://via.placeholder.com/300x180?text=Wealth"
  })),
  investment: Array.from({ length: 8 }, (_, i) => ({
    title: `Investment Strategy ${i + 1}`,
    description: "Smart investing for a better future.",
    image: "https://via.placeholder.com/300x180?text=Investment"
  })),
  finance: Array.from({ length: 10 }, (_, i) => ({
    title: `Personal Finance ${i + 1}`,
    description: "Everyday financial tips and guides.",
    image: "https://via.placeholder.com/300x180?text=Finance"
  })),
  company: Array.from({ length: 6 }, (_, i) => ({
    title: `Company News ${i + 1}`,
    description: "Latest updates from Umelusi Group.",
    image: "https://via.placeholder.com/300x180?text=News"
  })),
  perspectives: Array.from({ length: 9 }, (_, i) => ({
    title: `Perspective ${i + 1}`,
    description: "Thought leadership and insights.",
    image: "https://via.placeholder.com/300x180?text=Perspective"
  }))
};

function getCategoryLabel(category) {
  const labels = {
    retirement: "Retirement",
    business: "Business Consulting",
    wealth: "Wealth Building",
    investment: "Investment Strategies",
    finance: "Personal Finance",
    company: "Company News",
    perspectives: "News & Perspectives"
  };
  return labels[category] || category;
}

function renderArticles(category) {
  const container = document.getElementById("tabs-content");
  if (!container) return; // FIX: Prevent crash if container is null

  container.innerHTML = "";

  const items = articles[category] || [];
  const paginatedItems = items.slice(0, 6); // Default 6 articles

  paginatedItems.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}" loading="lazy">
      <div class="article-content">
        <h4>${article.title}</h4>
        <p>${article.description}</p>
      </div>
    `;
    container.appendChild(card);
  });

  // Update view all link
  const viewAllLink = document.getElementById("view-all-link");
  if (viewAllLink) {
    viewAllLink.href = `resources-${category}.html`;
    viewAllLink.textContent = `View all ${getCategoryLabel(category)} articles`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const articleFilters = document.querySelector(".filter-tabs"); // Use a parent container check
  if (!articleFilters) return; // EXIT if element doesn't exist

  const buttons = articleFilters.querySelectorAll(".filter-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      renderArticles(category);
    });
  });

  // Load default category
  renderArticles("retirement");
});


// ---------------------------------
// Currency Converter (FIXED - Added Null Check)
// ---------------------------------

// !!! IMPORTANT !!! 
// Replace "YOUR_API_KEY_HERE" with your actual key from exchangerate-api.com

function convertCurrency() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultElement = document.getElementById('conversion-result');
    
    const amount = parseFloat(amountInput.value); 
    const API_KEY = "dcfb40c2085072dd2e65fa80"; 
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

    if (isNaN(amount) || amount <= 0 || !fromCurrency || !toCurrency) {
        showNotification('Please enter a valid amount and select currencies.', false);
        return;
    }

    resultElement.innerHTML = 'Fetching live rate...';

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.result === 'success') {
                const rate = data.conversion_rates[toCurrency]; 
                
                if (rate) {
                    const convertedAmount = amount * rate;
                    resultElement.innerHTML = `
                        <strong>${amount.toFixed(2)} ${fromCurrency}</strong> = 
                        <span style="color: var(--color-brand-primary); font-weight: bold;">
                            ${convertedAmount.toFixed(2)} ${toCurrency}
                        </span>
                    `;
                } else {
                    showNotification('Error: Conversion rate to the target currency is not available.', false);
                }
            } else {
                 showNotification(`API Error: ${data['error-type'] || 'Failed to retrieve data.'}`, false);
            }
        })
        .catch(error => {
            console.error('Error fetching currency data:', error);
            showNotification('Error: Could not retrieve live rates. Please check your API key and console for network details.', false);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const convertButton = document.getElementById("convert-btn");
    if (!convertButton) return; // FIX: Prevent crash if button is null

    convertButton.addEventListener("click", (e) => {
      e.preventDefault(); 
      convertCurrency();
    });
});


// ---------------------------------
// Dynamic Breadcrumb Trail System (FIXED - Prepending Home)
// ---------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const breadcrumbContainer = document.getElementById("breadcrumb-trail");
  if (!breadcrumbContainer) return;

  // Get current page filename
  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage || currentPage === "") currentPage = "index.html";

  const isHomePage = currentPage === "index.html";

  // Page title mappings
  const pageTitles = {
    "index.html": "Home",
    "about-company.html": "About Us",
    "pressroom.html": "Pressroom",
    "careers.html": "Career Opportunities",
    "hierarchy.html": "Hierarchy",
    "fund-managers.html": "Umelusi Fund Managers",
    "partners.html": "Umelusi Partners",
    "capital.html": "Umelusi Capital",
    "finserve.html": "Umelusi FinServe",
    "markets.html": "Markets",
    "resources.html": "Resources & Insights"
  };

  const currentTitle = pageTitles[currentPage] || currentPage.replace(".html", "");

  // Retrieve stored trail from localStorage
  let trail = JSON.parse(localStorage.getItem("breadcrumbTrail")) || [];

  // FIX: If trail is empty AND we are not on the home page, start the trail with Home.
  if (trail.length === 0 && !isHomePage) {
    trail.push({ title: "Home", file: "index.html" });
  }

  // Remove if current page already exists in trail (avoid duplicates)
  trail = trail.filter(page => page.file !== currentPage);

  // Add the new page at the end
  trail.push({ title: currentTitle, file: currentPage });

  // Optional: keep only last 5 visited pages
  if (trail.length > 5) trail = trail.slice(-5);

  // Save back to localStorage
  localStorage.setItem("breadcrumbTrail", JSON.stringify(trail));

  // Build breadcrumb HTML
  breadcrumbContainer.innerHTML = trail
    .map((page, index) => {
      if (index === trail.length - 1) {
        return `<li class="breadcrumb-item active" aria-current="page">${page.title}</li>`;
      }
      return `<li class="breadcrumb-item"><a href="${page.file}">${page.title}</a></li>`;
    })
    .join("");
});

// ---------------------------------
// TradingView Widget Loader: Umelusi Capital
// ---------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const widgetContainer = document.getElementById("capital-market-widget");
    
    // Check if the container exists on this page before running
    if (!widgetContainer) return;

    // Configuration object (the source of the red underline issue)
    const widgetConfig = {
        "colorTheme": "light",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "width": "100%",
        "height": "100%",
        "tabs": [
            {
            "title": "Global Equities",
            "symbols": [
                { "s": "INDEX:SPX", "d": "S&P 500" },
                { "s": "INDEX:COMP", "d": "NASDAQ Composite" },
                { "s": "INDEX:JSE", "d": "JSE All Share" },
                { "s": "INDEX:NGSEALL", "d": "NGX All Share" },
                { "s": "INDEX:UKX", "d": "FTSE 100" }
            ],
            "originalTitle": "Global Equities"
            },
            {
            "title": "Fixed Income",
            "symbols": [
                { "s": "CBOT:ZN1!", "d": "US 10Y T-Note" },
                { "s": "CBOT:ZB1!", "d": "US 30Y Bond" },
                { "s": "EUREX:FGBL1!", "d": "German Bund" }
            ],
            "originalTitle": "Fixed Income"
            }
        ],
        "isSymbolList": true
    };

    // 1. Create the <script> element
    const tvScript = document.createElement('script');
    tvScript.type = 'text/javascript';
    tvScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    tvScript.async = true;
    
    // 2. Set the innerHTML to the JSON configuration (this is the key for TradingView's unusual parser)
    tvScript.innerHTML = JSON.stringify(widgetConfig); 
    
    // 3. Append the script to the widget container
    widgetContainer.appendChild(tvScript);
});

// ---------------------------------
// Custom Notification System (Replaces alert() and confirm())
// ---------------------------------
function showNotification(message, isSuccess = true) {
    // This is a minimal implementation for non-blocking notifications.
    const notificationContainer = document.getElementById('notification-container');
    let container = notificationContainer;

    if (!container) {
        const body = document.body;
        const div = document.createElement('div');
        div.id = 'notification-container';
        div.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; padding: 10px 20px; border-radius: 5px; color: white; transition: opacity 0.5s, transform 0.5s; opacity: 0; transform: translateY(-50px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-family: \'Roboto\', sans-serif;';
        body.appendChild(div);
        container = div;
    }
    
    container.textContent = message;
    container.style.backgroundColor = isSuccess ? '#4CAF50' : '#F44336'; // Success (green) or Error (red)
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';

    setTimeout(() => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-50px)';
    }, 4000); // Hide after 4 seconds
}


// ---------------------------------
// Form Submission Handler (AJAX)
// ---------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // List all form IDs that need AJAX submission
    // 'finserveModalContactForm' is correctly included here.
    const formIds = ['mainContactForm', 'finserveMainContactForm', 'finserveModalContactForm'];

    formIds.forEach(id => {
        const form = document.getElementById(id);
        
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault(); // Stop the default page refresh

                const submitButton = form.querySelector('button[type="submit"]');
                
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // **THIS IS THE KEY PART**
                // 1. Find the closest Bootstrap modal parent element
                const modalElement = form.closest('.modal');
                
                try {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    
                    // Mock Fetch to the Node.js server endpoint
                    // Replace with your actual server URL in a real deployment
                    const response = await fetch('http://localhost:3000/submit', { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        showNotification('Thank you! Your message has been sent successfully.', true); // Success notification
                        form.reset();
                        
                        // 2. Close the modal if the form was inside one
                        if (modalElement) {
                            // Get the Bootstrap modal instance and hide it
                            // The 'bootstrap' object is made globally available by the Bootstrap JS bundle
                            const modalInstance = bootstrap.Modal.getInstance(modalElement);
                            if (modalInstance) {
                                modalInstance.hide(); // Closes the modal
                            }
                        }
                    } else {
                        const errorData = await response.json();
                        showNotification(`Submission Failed: ${errorData.message || 'Please check your server and try again.'}`, false); // Error notification
                    }
                } catch (error) {
                    console.error('Submission error:', error);
                    showNotification('A network error occurred. Please ensure the backend server is running.', false); // Network error notification
                } finally {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }
            });
        }
    });
});


