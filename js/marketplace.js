// Marketplace campaigns data
const campaignsData = [
    {
        id: 1,
        title: "Quantum DeFi Protocol",
        description: "Next-generation decentralized finance platform with cross-chain liquidity and advanced yield farming.",
        category: "defi",
        budget: "$50,000",
        image: "../images/ads/defi-protocol.jpg",
        badge: "Hot"
    },
    {
        id: 2,
        title: "MetaPunks NFT Collection",
        description: "Exclusive generative art collection with utility features and community rewards.",
        category: "nft",
        budget: "$25,000",
        image: "../images/ads/nft-collection.jpg",
        badge: "New"
    },
    {
        id: 3,
        title: "SecureChain Wallet",
        description: "Multi-chain cryptocurrency wallet with advanced security and DeFi integration.",
        category: "wallet",
        budget: "$75,000",
        image: "../images/ads/crypto-wallet.jpg"
    },
    {
        id: 4,
        title: "CryptoExchange Pro",
        description: "Advanced trading platform with low fees and high liquidity across multiple markets.",
        category: "exchange",
        budget: "$100,000",
        image: "../images/ads/exchange.jpg"
    },
    {
        id: 5,
        title: "Web3 Gaming Platform",
        description: "Blockchain-based gaming ecosystem with play-to-earn mechanics and NFT assets.",
        category: "gaming",
        budget: "$60,000",
        image: "../images/ads/gaming.jpg"
    },
    {
        id: 6,
        title: "Metaverse Real Estate",
        description: "Virtual land development and NFT property sales in leading metaverse platforms.",
        category: "metaverse",
        budget: "$150,000",
        image: "../images/ads/metaverse.jpg"
    }
];

// Initialize marketplace
document.addEventListener('DOMContentLoaded', function() {
    const campaignsGrid = document.getElementById('campaignsGrid');

    if (campaignsGrid) {
        renderCampaigns(campaignsData);
        setupFilters();
    }
});

function renderCampaigns(campaigns) {
    const campaignsGrid = document.getElementById('campaignsGrid');
    campaignsGrid.innerHTML = '';

    campaigns.forEach(campaign => {
        const campaignCard = document.createElement('div');
        campaignCard.className = 'ad-card';
        campaignCard.innerHTML = `
            ${campaign.badge ? `<div class="ad-badge">${campaign.badge}</div>` : ''}
            <img src="${campaign.image}" alt="${campaign.title}" class="ad-image">
            <div class="ad-content">
                <h3>${campaign.title}</h3>
                <p>${campaign.description}</p>
                <div class="ad-meta">
                    <span class="ad-category">${campaign.category}</span>
                    <span class="ad-budget">${campaign.budget}</span>
                </div>
                <button class="btn btn-outline">View Campaign</button>
            </div>
        `;
        campaignsGrid.appendChild(campaignCard);
    });
}

function setupFilters() {
    const searchInput = document.querySelector('.search-bar input');
    const categorySelect = document.querySelector('.filter-select');

    if (searchInput) {
        searchInput.addEventListener('input', filterCampaigns);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', filterCampaigns);
    }
}

function filterCampaigns() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    const category = document.querySelector('.filter-select').value;

    const filteredCampaigns = campaignsData.filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchTerm) ||
                            campaign.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || campaign.category === category;

        return matchesSearch && matchesCategory;
    });

    renderCampaigns(filteredCampaigns);
}