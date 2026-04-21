//Initialize lucide icons
// lucide.createIcons();

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // mobileMenu.classList.toggle('flex');
});


//state
const state = {
    vehicleType:'all',
    condition:'all',
    brand:'all',
    size:'',
    price:'all'
};

//DOM references
const grid = document.getElementById('tyre-grid');
const emptyState = document.getElementById('empty-state');
const resultsCount = document.getElementById('results-count');
const brandSelect = document.getElementById('brand-select');
const sizeInput = document.getElementById('size-input');
const priceSelect = document.getElementById('price-select');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

//load data
let allTyres = [];
//sho empty state on page load
emptyState.classList.remove('hidden');
resultsCount.textContent = '';

fetch('./src/tyres.json')
    .then(response => response.json())
    .then(data => {
        allTyres = data;
    })
    .catch(error => {
        console.error('Failed to load tyre data:', error);
        grid.innerHTML = '<p class="text-sm opacity-60">Failed to load tyres. Please try again.</p>';
    });

//render function
function renderTyres(tyres) {
    //clear existing cards
    grid.innerHTML = '';

    //show or hide empty state
    if (tyres.length === 0) {
        emptyState.classList.remove('hidden');
        resultsCount.textContent = '';
        return;
    }

    emptyState.classList.add('hidden');

    //update results count
    resultsCount.textContent = `Showing ${tyres.length} tyres${tyres.length === 1 ? '' : 's'}`;

    //build a card for each tyre
    tyres.forEach(tyre => {
        //create a div element in memory - not yet on the page
        const card = document.createElement('div');
        card.className = 'bg-page rounded-xl overflow-hidden border border-surface-dark/10 flex flex-col';

        //build the card's html using template literal
        card.innerHTML = `
            <div class="relative overflow-hidden bg-surface-dark/5 h-44">
            <img 
                src="${tyre.image}"
                alt=${tyre.brand} ${tyre.size} tyre"
                class="w-full h-full object-cover"
                onerror="this.src='/src/assets/Tyres/placeholder.svg'"
            >
            <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold
                ${tyre.condition === 'new'
                    ? 'bg-brand text-page'
                    : 'bg-surface-darker text-page'}">
                ${tyre.condition === 'new' ? 'New' : 'Used'}
            </span>
        </div>

        <div class="p-4 flex flex-col flex-1">
            <span class="text-xs text-brand font-bold uppercase tracking-wide mb-1">
                ${tyre.size}
            </span>
            <h3 class="font-bold text-surface-darker text-base mb-1">
                ${tyre.brand}
            </h3>
            <p class="text-xs opacity-60 mb-1 capitalize">
                ${tyre.vehicleType}
            </p>
            <p class="text-xs opacity-50 mb-3 leading-relaxed">
                ${tyre.description}
            </p>

            <div class="flex items-center justify-between mt-auto">
                <span class="font-bold text-brand-dark text-base">
                    Ksh ${tyre.price.toLocaleString()}
                </span>
                <a 
                    href="https://wa.me/254780362229?text=Hi!%20%F0%9F%91%8B%20I'm%20interested%20in%20the%20${encodeURIComponent(tyre.brand)}%20${encodeURIComponent(tyre.size)}%20tyre.%20Can%20you%20tell%20me%20about%20availability%20and%20if%20you%20have%20any%20discounts?%20Thanks!"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-whatsapp text-page text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-brand hover:text-page transition-colors duration-200">
                    Enquire
                </a>
            </div>
        </div>
        `;

        //Append finished card to the grid
        grid.appendChild(card);
    });

        // Re-initialize lucide after injecting new HTML
        lucide.createIcons();
}

//filter function
function filterTyres() {
    return allTyres.filter(tyre => {
        //vehicle type check
        //if state is 'all' skip this check entirely
        const vehicleMatch = state.vehicleType === 'all' || tyre.vehicleType === state.vehicleType;

        //condition check
        const conditionMatch = state.condition === 'all' || tyre.condition === state.condition;

        //brand check 
        const brandMatch = state.brand === 'all' || tyre.brand.toLowerCase() === state.brand.toLowerCase();

        //size check - partial match so "185" finds "185/70R14"
        //trim() to remove any accidental whitespace user may type
        const sizeMatch = state.size === '' || tyre.size.toLowerCase().includes(state.size.trim().toLowerCase());

        //price check
        let priceMatch = true;
        if (state.price === 'under-10k') {
            priceMatch = tyre.price < 10000;
        } else if (state.price === '10k-20k') {
            priceMatch = tyre.price >= 10000 && tyre.price <= 20000;
        } else if (state.price === 'over-20k') {
            priceMatch = tyre.price > 20000;
        }

        //ensure tyres pass all checks to appear in results
        return vehicleMatch && conditionMatch && brandMatch && sizeMatch && priceMatch;

    });
}

//button click handler
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterCategory = btn.dataset.filter;
        const filterValue = btn.dataset.value;

        //update state with the new selection
        state[filterCategory] = filterValue;

        //update active visual state on buttons
        //find all buttons in the same filter group
        //remove active style from siblings
        document.querySelectorAll(`[data-filter="${filterCategory}"]`).forEach(sibling => {
            sibling.classList.remove('bg-brand', 'text-page');
            sibling.classList.add('bg-page', 'text-surface-darker');

        });
        //add active style to the clicked button
        btn.classList.remove('bg-page', 'text-surface-darker');
        btn.classList.add('bg-brand', 'text-page');

        //re-render with new filters applied immediately
        //no need to press search for tab filters
        renderTyres(filterTyres());
    });
});

//search button handler
searchBtn.addEventListener('click', () => {
    state.brand = brandSelect.value;
    state.size = sizeInput.value;
    state.price = priceSelect.value;

    renderTyres(filterTyres());
});

//live size search
sizeInput.addEventListener('input', () => {
    state.size = sizeInput.value;
    renderTyres(filterTyres());
});

//reset button handler
resetBtn.addEventListener('click', () => {
    //reset state object
    state.vehicleType = 'all';
    state.condition = 'all';
    state.brand = 'all';
    state.size = '';
    state.price = 'all';

    //reset form controls
    brandSelect.value = 'all';
    sizeInput.value = '';
    priceSelect.value = 'all';

    //reset all tab buttons to inactive state
    filterBtns.forEach(btn => {
        btn.classList.remove('bg-brand', 'text-page');
        btn.classList.add('bg-page', 'text-surface-darker');
    });

    //Reactivate all All buttons
    document.querySelectorAll('[data-value="all"]').forEach(btn => {
        btn.classList.remove('bg-page', 'text-surface-darker');
        btn.classList.add('bg-brand', 'text-page');
    });
    
    //render full list
    renderTyres(allTyres);
});

// Auto-close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

//scroll to filter section on page load
window.addEventListener('load', () => {
    document.getElementById('products').scrollIntoView({behavior: 'smooth'});
});