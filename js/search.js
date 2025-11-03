// Enhanced Search Functionality with Results
class SearchManager {
    constructor() {
        this.currentFilters = {
            searchTerm: '',
            category: '',
            budget: '',
            status: '',
            sortBy: 'newest'
        };
        this.searchResults = [];
        this.allCampaigns = [];
        this.init();
    }

    init() {
        this.loadCampaigns();
        this.bindEvents();
        this.displayAllCampaigns();
    }

    loadCampaigns() {
        // Sample campaign data - in real app, this would come from API
        this.allCampaigns = [
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
            },
            {
                id: 7,
                title: "DeFi Lending Protocol",
                description: "Decentralized lending platform offering competitive rates and flexible terms.",
                category: "defi",
                budget: "$45,000",
                image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                status: "active",
                date: "2025-03-08"
            },
            {
                id: 8,
                title: "NFT Gaming Marketplace",
                description: "Platform for trading in-game NFTs and digital assets from popular blockchain games.",
                category: "nft",
                budget: "$35,000",
                image: "https://images.unsplash.com/photo-1642784353723-64da3d3e5b94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                status: "active",
                date: "2025-03-05"
            }
        ];
    }

    bindEvents() {
        // Main search input
        const mainSearch = document.getElementById('mainSearch');
        const homeSearch = document.querySelector('.search-input');

        if (mainSearch) {
            mainSearch.addEventListener('input', (e) => {
                this.currentFilters.searchTerm = e.target.value;
                this.debouncedSearch();
            });

            // Enter key support
            mainSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        if (homeSearch) {
            homeSearch.addEventListener('input', (e) => {
                this.currentFilters.searchTerm = e.target.value;
                this.debouncedSearch();
            });

            homeSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        // Search buttons
        const searchButtons = document.querySelectorAll('.search-btn, .search-submit');
        searchButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        });

        // Clear search
        const clearSearch = document.getElementById('clearSearch');
        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // Filter changes
        const filters = ['categoryFilter', 'budgetFilter', 'statusFilter', 'sortBy'];
        filters.forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.currentFilters[this.getFilterKey(filterId)] = e.target.value;
                    this.performSearch();
                });
            }
        });

        // Quick tag buttons
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = btn.getAttribute('data-category');
                this.setActiveCategory(category);
            });
        });

        // Filter toggle for mobile
        const filterToggle = document.getElementById('filterToggle');
        if (filterToggle) {
            filterToggle.addEventListener('click', () => {
                this.toggleFilters();
            });
        }
    }

    getFilterKey(filterId) {
        const map = {
            'categoryFilter': 'category',
            'budgetFilter': 'budget',
            'statusFilter': 'status',
            'sortBy': 'sortBy'
        };
        return map[filterId] || filterId;
    }

    debouncedSearch() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.performSearch();
        }, 500);
    }

    performSearch() {
        this.filterCampaigns();
        this.displaySearchResults();
        this.updateActiveFilters();
        this.updateResultsCount();

        // Scroll to results if on homepage
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            const resultsSection = document.querySelector('.featured-ads');
            if (resultsSection && this.currentFilters.searchTerm) {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    filterCampaigns() {
        let filtered = [...this.allCampaigns];

        // Search term filter
        if (this.currentFilters.searchTerm) {
            const searchTerm = this.currentFilters.searchTerm.toLowerCase();
            filtered = filtered.filter(campaign =>
                campaign.title.toLowerCase().includes(searchTerm) ||
                campaign.description.toLowerCase().includes(searchTerm) ||
                campaign.category.toLowerCase().includes(searchTerm)
            );
        }

        // Category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(campaign =>
                campaign.category === this.currentFilters.category
            );
        }

        // Status filter
        if (this.currentFilters.status) {
            filtered = filtered.filter(campaign =>
                campaign.status === this.currentFilters.status
            );
        }

        // Budget filter (simplified)
        if (this.currentFilters.budget) {
            filtered = filtered.filter(campaign => {
                const budgetNum = parseInt(campaign.budget.replace(/[$,]/g, ''));
                switch(this.currentFilters.budget) {
                    case '0-10000': return budgetNum < 10000;
                    case '10000-50000': return budgetNum >= 10000 && budgetNum <= 50000;
                    case '50000-100000': return budgetNum >= 50000 && budgetNum <= 100000;
                    case '100000+': return budgetNum > 100000;
                    default: return true;
                }
            });
        }

        // Sort results
        filtered = this.sortCampaigns(filtered);

        this.searchResults = filtered;
    }

    sortCampaigns(campaigns) {
        switch(this.currentFilters.sortBy) {
            case 'newest':
                return campaigns.sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'popular':
                return campaigns.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
            case 'budget-high':
                return campaigns.sort((a, b) =>
                    parseInt(b.budget.replace(/[$,]/g, '')) - parseInt(a.budget.replace(/[$,]/g, ''))
                );
            case 'budget-low':
                return campaigns.sort((a, b) =>
                    parseInt(a.budget.replace(/[$,]/g, '')) - parseInt(b.budget.replace(/[$,]/g, ''))
                );
            default:
                return campaigns;
        }
    }

    displaySearchResults() {
        const campaignsGrid = document.getElementById('campaignsGrid');
        const sliderContainer = document.querySelector('.slider-container');

        if (campaignsGrid) {
            // Marketplace page
            this.renderCampaignsGrid(campaignsGrid);
        } else if (sliderContainer) {
            // Homepage - replace slider with search results
            this.renderHomepageResults(sliderContainer);
        }
    }

    renderCampaignsGrid(container) {
        container.innerHTML = '';

        if (this.searchResults.length === 0) {
            container.innerHTML = this.getNoResultsHTML();
            return;
        }

        this.searchResults.forEach(campaign => {
            const campaignCard = this.createCampaignCard(campaign);
            container.appendChild(campaignCard);
        });
    }

    renderHomepageResults(container) {
        const parentSection = container.closest('.ads-slider');
        const sliderControls = parentSection.querySelector('.slider-controls');

        if (this.currentFilters.searchTerm || this.currentFilters.category) {
            // Show search results
            parentSection.classList.add('search-results-active');
            container.innerHTML = '';

            if (this.searchResults.length === 0) {
                container.innerHTML = this.getNoResultsHTML();
            } else {
                this.searchResults.forEach(campaign => {
                    const campaignCard = this.createCampaignCard(campaign);
                    container.appendChild(campaignCard);
                });
            }

            // Hide slider controls during search
            if (sliderControls) {
                sliderControls.style.display = 'none';
            }

            // Show back to all button
            this.addBackToAllButton(parentSection);
        } else {
            // Show normal slider
            parentSection.classList.remove('search-results-active');
            this.displayAllCampaigns();

            if (sliderControls) {
                sliderControls.style.display = 'flex';
            }

            this.removeBackToAllButton();
        }
    }

    displayAllCampaigns() {
        const campaignsGrid = document.getElementById('campaignsGrid');
        const sliderContainer = document.querySelector('.slider-container');

        if (campaignsGrid) {
            this.renderCampaignsGrid(campaignsGrid);
        } else if (sliderContainer) {
            // Display first 4 campaigns in slider on homepage
            const firstFour = this.allCampaigns.slice(0, 4);
            sliderContainer.innerHTML = '';
            firstFour.forEach(campaign => {
                const slide = document.createElement('div');
                slide.className = 'slide';
                slide.innerHTML = this.createCampaignCardHTML(campaign);
                sliderContainer.appendChild(slide);
            });
        }
    }

    createCampaignCard(campaign) {
        const div = document.createElement('div');
        div.className = 'ad-card';
        div.innerHTML = this.createCampaignCardHTML(campaign);
        return div;
    }

    createCampaignCardHTML(campaign) {
        return `
            ${campaign.badge ? `<div class="ad-badge">${campaign.badge}</div>` : ''}
            <img src="${campaign.image}" alt="${campaign.title}" class="ad-image">
            <div class="ad-content">
                <h3>${campaign.title}</h3>
                <p>${campaign.description}</p>
                <div class="ad-meta">
                    <span class="ad-category">${campaign.category}</span>
                    <span class="ad-budget">${campaign.budget}</span>
                </div>
                <button class="btn btn-outline view-campaign" data-id="${campaign.id}">View Campaign</button>
            </div>
        `;
    }

    getNoResultsHTML() {
        return `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No campaigns found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                <button class="btn btn-primary" onclick="searchManager.clearSearch()">Clear Search</button>
            </div>
        `;
    }

    addBackToAllButton(parentSection) {
        if (!parentSection.querySelector('.back-to-all')) {
            const backButton = document.createElement('div');
            backButton.className = 'back-to-all-container';
            backButton.innerHTML = `
                <button class="btn btn-outline back-to-all">
                    <i class="fas fa-arrow-left"></i>
                    Back to All Campaigns
                </button>
            `;
            parentSection.appendChild(backButton);

            backButton.querySelector('.back-to-all').addEventListener('click', () => {
                this.clearSearch();
            });
        }
    }

    removeBackToAllButton() {
        const backButton = document.querySelector('.back-to-all-container');
        if (backButton) {
            backButton.remove();
        }
    }

    clearSearch() {
        const mainSearch = document.getElementById('mainSearch');
        const homeSearch = document.querySelector('.search-input');

        if (mainSearch) mainSearch.value = '';
        if (homeSearch) homeSearch.value = '';

        this.currentFilters = {
            searchTerm: '',
            category: '',
            budget: '',
            status: '',
            sortBy: 'newest'
        };

        // Reset filters
        const filters = ['categoryFilter', 'budgetFilter', 'statusFilter', 'sortBy'];
        filters.forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) element.value = '';
        });

        // Reset tag buttons
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.tag-btn[data-category="all"]').classList.add('active');

        this.performSearch();
    }

    setActiveCategory(category) {
        // Update tag buttons
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update category filter
        if (category === 'all') {
            this.currentFilters.category = '';
        } else {
            this.currentFilters.category = category;
        }

        // Update select element
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = this.currentFilters.category;
        }

        this.performSearch();
    }

    updateActiveFilters() {
        const activeFiltersContainer = document.getElementById('activeFilters');
        if (!activeFiltersContainer) return;

        activeFiltersContainer.innerHTML = '';

        Object.entries(this.currentFilters).forEach(([key, value]) => {
            if (value && key !== 'sortBy' && key !== 'searchTerm') {
                const filterElement = this.createActiveFilterElement(key, value);
                activeFiltersContainer.appendChild(filterElement);
            }
        });
    }

    createActiveFilterElement(key, value) {
        const div = document.createElement('div');
        div.className = 'active-filter';

        const label = this.getFilterLabel(key);
        const displayValue = this.getDisplayValue(key, value);

        div.innerHTML = `
            ${label}: ${displayValue}
            <button class="remove-filter" data-filter="${key}">
                <i class="fas fa-times"></i>
            </button>
        `;

        div.querySelector('.remove-filter').addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeFilter(key);
        });

        return div;
    }

    getFilterLabel(key) {
        const labels = {
            'category': 'Category',
            'budget': 'Budget',
            'status': 'Status'
        };
        return labels[key] || key;
    }

    getDisplayValue(key, value) {
        if (key === 'budget') {
            const ranges = {
                '0-10000': 'Under $10K',
                '10000-50000': '$10K - $50K',
                '50000-100000': '$50K - $100K',
                '100000+': 'Over $100K'
            };
            return ranges[value] || value;
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    removeFilter(key) {
        this.currentFilters[key] = '';

        const filterElement = document.getElementById(key + 'Filter');
        if (filterElement) {
            filterElement.value = '';
        }

        this.performSearch();
    }

    toggleFilters() {
        const filtersGrid = document.getElementById('filtersGrid');
        if (filtersGrid) {
            filtersGrid.classList.toggle('filters-visible');
        }
    }

    updateResultsCount() {
        const resultsInfo = document.querySelector('.search-results-info');
        if (resultsInfo) {
            const resultsCount = resultsInfo.querySelector('.results-count');
            if (resultsCount) {
                const total = this.allCampaigns.length;
                const showing = this.searchResults.length;
                resultsCount.textContent = `Showing ${showing} of ${total} campaigns`;
            }
        }
    }
}

// Initialize search manager when DOM is loaded
let searchManager;
document.addEventListener('DOMContentLoaded', function() {
    searchManager = new SearchManager();
});