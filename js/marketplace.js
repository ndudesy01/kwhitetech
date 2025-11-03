// Marketplace campaigns data
const campaignsData = [
    {
        id: 1,
        title: "Quantum DeFi Protocol",
        description: "Next-generation decentralized finance platform with cross-chain liquidity and advanced yield farming mechanisms.",
        category: "defi",
        budget: "$50,000",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badge: "Hot",
        status: "active",
        date: "2025-03-15"
    },
    {
        id: 2,
        title: "MetaPunks NFT Collection",
        description: "Exclusive generative art collection with utility features, community rewards, and metaverse integration.",
        category: "nft",
        budget: "$25,000",
        image: "https://images.unsplash.com/photo-1642784353723-64da3d3e5b94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badge: "New",
        status: "active",
        date: "2025-03-14"
    },
    {
        id: 3,
        title: "SecureChain Wallet",
        description: "Multi-chain cryptocurrency wallet with advanced security features and seamless DeFi protocol integration.",
        category: "wallet",
        budget: "$75,000",
        image: "https://images.unsplash.com/photo-1516245834210-8e0b6e0f8e1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        status: "active",
        date: "2025-03-13"
    },
    {
        id: 4,
        title: "CryptoExchange Pro",
        description: "Advanced trading platform with low fees and high liquidity across multiple markets.",
        category: "exchange",
        budget: "$100,000",
        image: "https://images.unsplash.com/photo-1516245834210-8e0b6e0f8e1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        status: "upcoming",
        date: "2025-03-20"
    },
    {
        id: 5,
        title: "Web3 Gaming Platform",
        description: "Blockchain-based gaming ecosystem with play-to-earn mechanics and NFT asset ownership.",
        category: "gaming",
        budget: "$60,000",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badge: "Trending",
        status: "active",
        date: "2025-03-12"
    },
    {
        id: 6,
        title: "Metaverse Real Estate",
        description: "Virtual land development and NFT property sales in leading metaverse platforms.",
        category: "metaverse",
        budget: "$150,000",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        status: "active",
        date: "2025-03-10"
    }
];

// Initialize marketplace
document.addEventListener('DOMContentLoaded', function() {
    addResultsInfo();
});

function addResultsInfo() {
    const campaignsGrid = document.getElementById('campaignsGrid');
    if (!campaignsGrid) return;

    const resultsInfo = document.createElement('div');
    resultsInfo.className = 'search-results-info';
    resultsInfo.innerHTML = `
        <div class="results-count">Showing ${campaignsData.length} campaigns</div>
        <div class="results-sort">
            <label for="resultsSort">Sort by:</label>
            <select id="resultsSort" class="filter-select">
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="budget-high">Highest Budget</option>
                <option value="budget-low">Lowest Budget</option>
            </select>
        </div>
    `;

    campaignsGrid.parentNode.insertBefore(resultsInfo, campaignsGrid);

    // Add sort functionality
    const sortSelect = document.getElementById('resultsSort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // This will be handled by the search manager
            if (window.searchManager) {
                window.searchManager.currentFilters.sortBy = this.value;
                window.searchManager.performSearch();
            }
        });
    }
}