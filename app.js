/**
 * =====================================================================
 * Note requested regarding Plan.tsx structure and the dark background fix:
 * 
 * If you ever migrate this Vanilla JS app to React/React Native (e.g. Plan.tsx), 
 * ensure you handle theming so the text is legible against custom backgrounds.
 * 
 * Example Plan.tsx structure (ThemeProvider / inline styles):
 * 
 * import React from 'react';
 * import { View, Text, StyleSheet } from 'react-native';
 * // import { ThemeProvider } from 'styled-components'; // If using styled-components
 * 
 * export const Plan = ({ theme }) => {
 *   return (
 *     // FIX for dark background: use inline styles or a ThemeProvider to enforce 
 *     // contrasting text colors when the background is inverted.
 *     <View style={[styles.container, { backgroundColor: theme.background }]}>
 *       <Text style={[styles.title, { color: theme.text }]}>Weight Loss</Text>
 *     </View>
 *   );
 * };
 * 
 * const styles = StyleSheet.create({
 *   container: { flex: 1, padding: 16 },
 *   title: { fontSize: 24, fontWeight: 'bold' }
 * });
 * =====================================================================
 */

// Initial Seed Data
const defaultData = [
    {
        // Fallback for older browsers without crypto
        id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(),
        name: "Weight Loss Plan",
        schedule: {},
        categories: {
            "Breakfast": [
                { id: "b1", text: "Omelet (4 eggs) + Toast with Peanut Butter & Banana", ingredients: [{ n: "Eggs", a: 4, u: "pcs" }, { n: "Milk", a: 100, u: "ml" }, { n: "Bread", a: 30, u: "g" }, { n: "Peanut Paste", a: 15, u: "g" }, { n: "Banana", a: 80, u: "g" }] },
                { id: "b2", text: "Oatmeal with Nuts, Fruits, and Chia Seeds", ingredients: [{ n: "Oats", a: 50, u: "g" }, { n: "Milk", a: 70, u: "ml" }, { n: "Fruit", a: 100, u: "g" }, { n: "Peanut Paste", a: 15, u: "g" }, { n: "Nuts", a: 15, u: "g" }, { n: "Chia Seeds", a: 10, u: "g" }] }
            ],
            "Lunch": [
                { id: "l1", text: "Buckwheat/Rice/Pasta + Tuna Salad", ingredients: [{ n: "Buckwheat/Rice/Pasta", a: 150, u: "g" }, { n: "Tuna", a: 130, u: "g" }, { n: "Lettuce", a: 100, u: "g" }, { n: "Vegetables", a: 200, u: "g" }, { n: "Eggs", a: 1, u: "pcs" }] },
                { id: "l2", text: "Pasta with Eggs or Minced Meat + Zucchini", ingredients: [{ n: "Pasta", a: 150, u: "g" }, { n: "Minced Meat", a: 80, u: "g" }, { n: "Cheese", a: 25, u: "g" }, { n: "Oil", a: 1, u: "tsp" }, { n: "Zucchini", a: 100, u: "g" }] }
            ],
            "Dinner 1": [
                { id: "d1-1", text: "Steamed Chicken Patties + Fresh Vegetable Salad", ingredients: [{ n: "Minced Chicken", a: 200, u: "g" }, { n: "Onion/Carrot", a: 100, u: "g" }, { n: "Vegetables", a: 250, u: "g" }, { n: "Oil", a: 1, u: "tsp" }] },
                { id: "d1-2", text: "Salad with Chicken or Salmon + Avocado", ingredients: [{ n: "Vegetables", a: 150, u: "g" }, { n: "Chicken/Salmon", a: 100, u: "g" }, { n: "Avocado", a: 60, u: "g" }] }
            ],
            "Dinner 2": [
                { id: "d2-1", text: "Steamed Chicken Patties + Pasta", ingredients: [{ n: "Chicken Patties", a: 125, u: "g" }, { n: "Pasta", a: 150, u: "g" }] },
                { id: "d2-2", text: "Pancakes (Savory with ham/cheese or Sweet with fruit)", ingredients: [{ n: "Pancakes", a: 150, u: "g" }, { n: "Ham/Fish", a: 80, u: "g" }, { n: "Cheese", a: 30, u: "g" }] }
            ]
        }
    }
];

// Core categories for inside a plan
const STANDARD_CATEGORIES = ["Breakfast", "Lunch", "Dinner 1", "Dinner 2"];

// App State Management
let plans = [];
let currentPlanId = null;
let activePlanningDate = null;
let tempSelections = {};

// DOM Element References
const planListEl = document.getElementById('plan-list');
const mainScreen = document.getElementById('main-screen');
const planScreen = document.getElementById('plan-screen');
const planTitleEl = document.getElementById('plan-title');
const categoriesContainer = document.getElementById('categories-container');

// Date Planner DOM Elements
const planDateInput = document.getElementById('plan-date-input');
const planDateBtn = document.getElementById('plan-date-btn');
const activePlanningControls = document.getElementById('active-planning-controls');
const activePlanningDateDisplay = document.getElementById('active-planning-date-display');
const confirmMenuBtn = document.getElementById('confirm-menu-btn');
const cancelPlanningBtn = document.getElementById('cancel-planning-btn');
const scheduledDatesList = document.getElementById('scheduled-dates-list');

// Buttons / Layout elements
const backBtn = document.getElementById('back-btn');
const addPlanBtn = document.getElementById('add-plan-btn');
const addPlanModal = document.getElementById('add-plan-modal');
const newPlanNameInput = document.getElementById('new-plan-name');
const cancelPlanBtn = document.getElementById('cancel-plan-btn');
const savePlanBtn = document.getElementById('save-plan-btn');

const guidelinesBtn = document.getElementById('guidelines-btn');
const guidelinesModal = document.getElementById('guidelines-modal');
const closeGuidelinesBtn = document.getElementById('close-guidelines-btn');

// Menu & Shopping List Modals
const dailyMenuModal = document.getElementById('daily-menu-modal');
const closeDailyMenuBtn = document.getElementById('close-daily-menu-btn');
const dailyMenuTitle = document.getElementById('daily-menu-title');
const dailyMenuContent = document.getElementById('daily-menu-content');
const generateShoppingBtn = document.getElementById('generate-shopping-btn');

const shoppingListModal = document.getElementById('shopping-list-modal');
const closeShoppingListBtn = document.getElementById('close-shopping-list-btn');
const shoppingListContent = document.getElementById('shopping-list-content');
const copyShoppingBtn = document.getElementById('copy-shopping-btn');

let currentlyViewingDate = null;

// Bootstrap Application
function init() {
    loadData();
    renderMainScreen();
    setupEventListeners();
}

// Persist Data using LocalStorage
function loadData() {
    const stored = localStorage.getItem('platemate_plans');
    if (stored) {
        plans = JSON.parse(stored);
    } else {
        plans = [...defaultData];
        saveData();
    }
}

function saveData() {
    localStorage.setItem('platemate_plans', JSON.stringify(plans));
}

// Screen Navigation Utility
function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // Show target screen
    document.getElementById(screenId).classList.add('active');
}

// Render the main dashboard screen
function renderMainScreen() {
    planListEl.innerHTML = '';

    plans.forEach(plan => {
        const li = document.createElement('li');
        li.className = 'plan-card';
        li.innerHTML = `
            <h3>${plan.name}</h3>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#bbb" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        li.addEventListener('click', () => openPlan(plan.id));
        planListEl.appendChild(li);
    });
}

// Render specific Plan Screen and its Categories
function openPlan(id) {
    currentPlanId = id;
    activePlanningDate = null;
    tempSelections = {};
    const plan = plans.find(p => p.id === id);
    if (!plan) return;

    if (!plan.schedule) plan.schedule = {}; // backward compatibility

    planTitleEl.textContent = plan.name;

    // reset date input
    if (planDateInput) {
        const today = new Date().toISOString().split('T')[0]; // Simple local string approx
        planDateInput.value = today;
    }

    renderPlanDetails();
    navigateTo('plan-screen');
}

function renderPlanDetails() {
    const plan = plans.find(p => p.id === currentPlanId);
    if (!plan) return;

    // Render Schedule List
    if (scheduledDatesList) {
        scheduledDatesList.innerHTML = '';
        const sortedDates = Object.keys(plan.schedule || {}).sort();
        sortedDates.forEach(date => {
            const dateItem = document.createElement('div');
            dateItem.style.display = 'flex';
            dateItem.style.justifyContent = 'space-between';
            dateItem.style.alignItems = 'center';
            dateItem.style.padding = '12px';
            dateItem.style.background = 'var(--gray-light)';
            dateItem.style.borderRadius = '8px';

            // Formatting date safely
            let dateString = date;
            try {
                // Ensure timezone correct display by parsing parts
                const [y, m, d] = date.split('-');
                const dateObj = new Date(y, m - 1, d);
                dateString = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            } catch (e) { }

            dateItem.innerHTML = `
                <div style="flex-grow: 1; cursor: pointer; font-weight: 500; padding: 4px;" class="saved-date-label">Menu for ${dateString}</div>
                <button class="icon-btn delete-date-btn" aria-label="Delete" style="color: #dc3545;">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            `;

            dateItem.querySelector('.saved-date-label').addEventListener('click', () => {
                // View specific saved menu directly
                currentlyViewingDate = date;
                dailyMenuTitle.textContent = `Menu for ${dateString}`;

                let menuHtml = '';
                STANDARD_CATEGORIES.forEach(cat => {
                    const selId = plan.schedule[date][cat];
                    if (selId && plan.categories[cat]) {
                        const variant = plan.categories[cat].find(v => v.id === selId);
                        if (variant) {
                            menuHtml += `<div style="margin-bottom: 12px;"><strong>${cat}:</strong><br/> ${variant.text}</div>`;
                        }
                    }
                });
                if (!menuHtml) menuHtml = '<p>No meals planned for this date.</p>';

                dailyMenuContent.innerHTML = menuHtml;
                dailyMenuModal.classList.add('active');
            });

            dateItem.querySelector('.delete-date-btn').addEventListener('click', () => {
                delete plan.schedule[date];
                if (activePlanningDate === date) {
                    activePlanningDate = null;
                    tempSelections = {};
                }
                saveData();
                renderPlanDetails();
            });

            scheduledDatesList.appendChild(dateItem);
        });
    }

    // Toggle active planning controls
    if (activePlanningDate && activePlanningControls) {
        activePlanningControls.style.display = 'block';
        let dateString = activePlanningDate;
        try {
            const [y, m, d] = activePlanningDate.split('-');
            const dateObj = new Date(y, m - 1, d);
            dateString = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        } catch (e) { }
        activePlanningDateDisplay.textContent = dateString;
        if (planDateInput) planDateInput.disabled = true;
        if (planDateBtn) planDateBtn.disabled = true;
    } else if (activePlanningControls) {
        activePlanningControls.style.display = 'none';
        if (planDateInput) planDateInput.disabled = false;
        if (planDateBtn) planDateBtn.disabled = false;
    }

    categoriesContainer.innerHTML = '';

    // Render Categories
    STANDARD_CATEGORIES.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.className = 'category-card';
        catCard.setAttribute('data-type', cat);

        let stickersHtml = '';
        if (plan.categories && plan.categories[cat]) {
            plan.categories[cat].forEach(variant => {
                const isSelected = activePlanningDate && tempSelections[cat] === variant.id;
                const selectedClass = isSelected ? 'selected' : '';

                stickersHtml += `
                    <div class="sticker variant-sticker ${selectedClass}" data-variant-id="${variant.id}" data-category-type="${cat}">
                        <span class="sticker-text">${variant.text}</span>
                        <button class="icon-btn edit-sticker-btn" aria-label="Edit">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>
                `;
            });
        }

        catCard.innerHTML = `
                    <h3>${cat}</h3>
                        <div class="food-stickers">
                            ${stickersHtml}
                        </div>
                `;
        categoriesContainer.appendChild(catCard);
    });

    // Add event listeners for variant selection
    document.querySelectorAll('.variant-sticker').forEach(sticker => {
        sticker.addEventListener('click', (e) => {
            if (!activePlanningDate) {
                // If they click a sticker without a date picked
                alert("Please select a date and press 'Plan Date' first.");
                return;
            }
            if (e.target.closest('.edit-sticker-btn')) return;

            const variantId = sticker.getAttribute('data-variant-id');
            const catType = sticker.getAttribute('data-category-type');

            // Toggle or set selection for active date
            if (tempSelections[catType] === variantId) {
                tempSelections[catType] = null;
            } else {
                tempSelections[catType] = variantId;
            }

            renderPlanDetails();
        });
    });
}

// Attach standard DOM Event Listeners
function setupEventListeners() {
    // Back navigation
    backBtn.addEventListener('click', () => {
        currentPlanId = null;
        navigateTo('main-screen');
    });

    // Modal controls
    addPlanBtn.addEventListener('click', () => {
        newPlanNameInput.value = '';
        addPlanModal.classList.add('active');
        newPlanNameInput.focus();
    });

    cancelPlanBtn.addEventListener('click', () => {
        addPlanModal.classList.remove('active');
    });

    // Save a new plan
    savePlanBtn.addEventListener('click', () => {
        const name = newPlanNameInput.value.trim();
        if (name) {
            const newPlan = {
                id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(),
                name: name
            };
            plans.push(newPlan);
            saveData();
            renderMainScreen();
            addPlanModal.classList.remove('active');
        }
    });

    // Close modal if touched entirely outside the main contents
    addPlanModal.addEventListener('click', (e) => {
        if (e.target === addPlanModal) {
            addPlanModal.classList.remove('active');
        }
    });

    // Guidelines Modal Logic
    if (guidelinesBtn) {
        guidelinesBtn.addEventListener('click', () => {
            guidelinesModal.classList.add('active');
        });
    }

    if (closeGuidelinesBtn) {
        closeGuidelinesBtn.addEventListener('click', () => {
            guidelinesModal.classList.remove('active');
        });
    }

    guidelinesModal.addEventListener('click', (e) => {
        if (e.target === guidelinesModal) {
            guidelinesModal.classList.remove('active');
        }
    });

    if (planDateBtn) {
        planDateInput.addEventListener('input', () => {
            planDateBtn.disabled = !planDateInput.value;
        });

        planDateBtn.addEventListener('click', () => {
            const dateStr = planDateInput.value;
            if (!dateStr) {
                alert("Please select a valid date.");
                return;
            }
            activePlanningDate = dateStr;
            const plan = plans.find(p => p.id === currentPlanId);
            if (!plan.schedule) plan.schedule = {};
            tempSelections = plan.schedule[dateStr] ? { ...plan.schedule[dateStr] } : {};
            renderPlanDetails();
        });
    }

    if (cancelPlanningBtn) {
        cancelPlanningBtn.addEventListener('click', () => {
            activePlanningDate = null;
            tempSelections = {};
            renderPlanDetails();
        });
    }

    if (confirmMenuBtn) {
        confirmMenuBtn.addEventListener('click', () => {
            if (activePlanningDate && currentPlanId) {
                const plan = plans.find(p => p.id === currentPlanId);
                if (plan) {
                    if (!plan.schedule) plan.schedule = {};
                    plan.schedule[activePlanningDate] = { ...tempSelections };
                    saveData();
                    // Reset selection state after saving
                    activePlanningDate = null;
                    tempSelections = {};
                    // Just cleanly re-render
                    renderPlanDetails();
                }
            }
        });
    }

    // Modal Events mapping for Daily Menu and Shopping List
    if (closeDailyMenuBtn) closeDailyMenuBtn.addEventListener('click', () => dailyMenuModal.classList.remove('active'));
    dailyMenuModal.addEventListener('click', (e) => { if (e.target === dailyMenuModal) dailyMenuModal.classList.remove('active'); });

    if (closeShoppingListBtn) closeShoppingListBtn.addEventListener('click', () => shoppingListModal.classList.remove('active'));
    shoppingListModal.addEventListener('click', (e) => { if (e.target === shoppingListModal) shoppingListModal.classList.remove('active'); });

    // Generate Shopping List
    if (generateShoppingBtn) {
        generateShoppingBtn.addEventListener('click', () => {
            const plan = plans.find(p => p.id === currentPlanId);
            if (!plan || !currentlyViewingDate || !plan.schedule[currentlyViewingDate]) return;

            const selections = plan.schedule[currentlyViewingDate];
            const shoppingMap = {};

            STANDARD_CATEGORIES.forEach(cat => {
                const selId = selections[cat];
                if (selId && plan.categories[cat]) {
                    const variant = plan.categories[cat].find(v => v.id === selId);
                    if (variant && variant.ingredients) {
                        variant.ingredients.forEach(ing => {
                            const key = `${ing.n}_${ing.u}`;
                            if (!shoppingMap[key]) {
                                shoppingMap[key] = { n: ing.n, a: 0, u: ing.u };
                            }
                            shoppingMap[key].a += ing.a;
                        });
                    }
                }
            });

            let listHtml = '';
            Object.values(shoppingMap).sort((a, b) => a.n.localeCompare(b.n))
                .forEach(ing => {
                    listHtml += `<li style="margin-bottom: 6px;">
                    <label style="display:flex; align-items:center; gap:8px;">
                        <input type="checkbox" style="transform: scale(1.2);">
                            <span>${ing.n}: <strong>${ing.a} ${ing.u}</strong></span>
                    </label>
                    </li>`;
                });

            if (!listHtml) listHtml = '<li>No ingredients found</li>';
            shoppingListContent.innerHTML = listHtml;

            dailyMenuModal.classList.remove('active');
            shoppingListModal.classList.add('active');
        });
    }

    if (copyShoppingBtn) {
        copyShoppingBtn.addEventListener('click', () => {
            let text = "Shopping List:\n";
            shoppingListContent.querySelectorAll('li span').forEach(span => {
                text += "- " + span.textContent + "\n";
            });
            navigator.clipboard.writeText(text).then(() => {
                const originalText = copyShoppingBtn.textContent;
                copyShoppingBtn.textContent = "Copied!";
                setTimeout(() => { copyShoppingBtn.textContent = originalText; }, 2000);
            });
        });
    }
}

// Start sequence
init();
