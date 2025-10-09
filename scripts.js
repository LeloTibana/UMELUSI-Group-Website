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

// Run market data update on load and every 5 seconds
document.addEventListener("DOMContentLoaded", () => {
    updateMarketData();
    setInterval(updateMarketData, 5000);
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


//Carousel Board of Directors

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".carousel-card");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  let current = 0;

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === current);
    });
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % cards.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  updateCarousel();
});


// Filter Functionality on Pressroom Page
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".press-filters .btn");
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
    const itemsPerPage = 6;
    const items = document.querySelectorAll(".press-item");
    const pagination = document.getElementById("pagination-controls");
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

  
// Search Filtering
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("press-search");
  if (!searchInput) return; // ✅ Safely exit if search bar isn't on this page

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll(".press-item");

    cards.forEach(card => {
      const title = card.querySelector(".press-title").innerText.toLowerCase();
      const summary = card.querySelector(".press-summary").innerText.toLowerCase();
      card.style.display = (title.includes(query) || summary.includes(query)) ? "block" : "none";
    });
  });
});


//Executive Message Carousel on Home Page
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".carousel-card");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  let current = 0;

  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove("active");
    });
    cards[current].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % cards.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  updateCarousel();
});


// Load TradingView widgets dynamically

// Global Indices
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
document.getElementById("global-indices").appendChild(indicesScript);

// Currency Rates
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
document.getElementById("currency-rates").appendChild(currencyScript);

// Economic Calendar
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
document.getElementById("economic-calendar").appendChild(calendarScript);

// Market News
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
document.getElementById("market-news").appendChild(newsScript);

// Crypto Prices
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
document.getElementById("crypto-prices").appendChild(cryptoScript);


//Resources and Insights Page
const articles = {
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
  viewAllLink.href = `resources-${category}.html`;
  viewAllLink.textContent = `View all ${getCategoryLabel(category)} articles`;
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");

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


// === Currency Converter ===
document.getElementById("convert-btn").addEventListener("click", async () => {
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!amount || amount <= 0) {
    document.getElementById("conversion-result").innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await response.json();

    if (data.result) {
      document.getElementById("conversion-result").innerText =
        `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    } else {
      document.getElementById("conversion-result").innerText = "Unable to fetch conversion rate.";
    }
  } catch (error) {
    document.getElementById("conversion-result").innerText = "Error fetching data. Please try again.";
  }
});
