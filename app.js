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
                { id: "l1", text: "Buckwheat / Rice / Pasta + Tuna Salad", ingredients: [{ n: "Buckwheat/Rice/Pasta", a: 150, u: "g" }, { n: "Tuna", a: 130, u: "g" }, { n: "Lettuce", a: 100, u: "g" }, { n: "Vegetables", a: 200, u: "g" }, { n: "Eggs", a: 1, u: "pcs" }] },
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

// Supabase Configuration
const supabaseUrl = "https://jmdmnrhcuwgaaxwdilzj.supabase.co";
const supabaseKey = "sb_publishable_THkYfP-w3iB6jhITNczdnw_VtOBZ..."; // NOTE: Replace with full key from user
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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

// Date Planning & Editing Modals
const openDatePickerBtn = document.getElementById('open-date-picker-btn');
const datePickerModal = document.getElementById('date-picker-modal');
const cancelDateBtn = document.getElementById('cancel-date-btn');

const editMealModal = document.getElementById('edit-meal-modal');
const editMealText = document.getElementById('edit-meal-text');
const editMealIngredients = document.getElementById('edit-meal-ingredients');
const editMealCategory = document.getElementById('edit-meal-category');
const editMealId = document.getElementById('edit-meal-id');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const saveEditBtn = document.getElementById('save-edit-btn');

const addCategoryBtn = document.getElementById('add-category-btn');
const addCategoryModal = document.getElementById('add-category-modal');
const newCategoryName = document.getElementById('new-category-name');
const cancelCategoryBtn = document.getElementById('cancel-category-btn');
const saveCategoryBtn = document.getElementById('save-category-btn');

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
const editGuidelinesBtn = document.getElementById('edit-guidelines-btn');
const guidelinesDisplay = document.getElementById('guidelines-display');
const guidelinesEditor = document.getElementById('guidelines-editor');
const guidelinesActions = document.getElementById('guidelines-actions');
const cancelGuidelinesBtn = document.getElementById('cancel-guidelines-btn');
const saveGuidelinesBtn = document.getElementById('save-guidelines-btn');

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
const themeToggleBtn = document.getElementById('theme-toggle');

let currentlyViewingDate = null;

// Bootstrap Application
async function init() {
    initTheme();
    setupEventListeners();
    await loadData();
    renderMainScreen();
    setupRealtime();
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('platemate_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Sync Status UI
function setSyncStatus(isSynced) {
    const syncIcon = document.getElementById('sync-status-icon');
    if (syncIcon) {
        syncIcon.style.color = isSynced ? '#28a745' : '#dc3545';
        syncIcon.style.filter = isSynced ? 'drop-shadow(0 0 4px rgba(40, 167, 69, 0.6))' : 'none';
    }
}

// Setup Realtime
function setupRealtime() {
    supabase.channel('schema-db-changes')
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'diet_plans',
            },
            (payload) => {
                if (payload.new && payload.new.plans) {
                    plans = payload.new.plans;
                    
                    // Re-render based on active screen
                    if (document.getElementById('plan-screen').classList.contains('active')) {
                        renderPlanDetails();
                    } else if (document.getElementById('main-screen').classList.contains('active')) {
                        renderMainScreen();
                    }
                }
            }
        )
        .subscribe();
}

// Persist Data using Supabase
async function loadData() {
    try {
        setSyncStatus(false);
        const { data, error } = await supabase.from('diet_plans').select('*');
        if (error) throw error;
        
        if (data && data.length > 0) {
            // Load from cloud
            plans = data[0].plans || [];
            setSyncStatus(true);
        } else {
            // Table is empty, seed from local storage or defaults
            const stored = localStorage.getItem('platemate_plans');
            if (stored) {
                plans = JSON.parse(stored);
            } else {
                plans = [...defaultData];
            }
            await saveData();
        }
    } catch (e) {
        console.error("Supabase load error:", e);
        // Fallback to local storage
        const stored = localStorage.getItem('platemate_plans');
        if (stored) {
            plans = JSON.parse(stored);
        } else {
            plans = [...defaultData];
        }
    }
}

async function saveData() {
    // Local backup
    localStorage.setItem('platemate_plans', JSON.stringify(plans));
    try {
        setSyncStatus(false);
        const { data: existing } = await supabase.from('diet_plans').select('id');
        let error;
        
        if (existing && existing.length > 0) {
            const res = await supabase.from('diet_plans')
                .update({ plans: plans })
                .eq('id', existing[0].id);
            error = res.error;
        } else {
            const res = await supabase.from('diet_plans')
                .insert([{ plans: plans }]);
            error = res.error;
        }
        
        if (error) throw error;
        setSyncStatus(true);
    } catch (e) {
        console.error("Supabase save error:", e);
        setSyncStatus(false);
    }
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
                Object.keys(plan.categories).forEach(cat => {
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
        if (openDatePickerBtn) openDatePickerBtn.style.display = 'none';
        if (planDateInput) planDateInput.disabled = true;
        if (planDateBtn) planDateBtn.disabled = true;
    } else if (activePlanningControls) {
        activePlanningControls.style.display = 'none';
        if (openDatePickerBtn) openDatePickerBtn.style.display = 'block';
        if (planDateInput) planDateInput.disabled = false;
        if (planDateBtn) planDateBtn.disabled = false;
    }

    categoriesContainer.innerHTML = '';

    // Render Categories
    Object.keys(plan.categories).forEach(cat => {
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

        let addFoodHtml = `
            <div class="add-food-sticker" data-category-type="${cat}" style="display:flex; align-items:center; justify-content:center; border: 2px dashed var(--gray-light); background: transparent; color: var(--text-color); cursor: pointer; width: 100%; min-height: 48px; border-radius: 12px; margin-top: 12px; transition: all 0.2s ease;">
                <span style="font-weight: 600; font-size: 0.95rem;">+ Add Food</span>
            </div>
        `;

        catCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="margin: 0;">${cat}</h3>
                <button class="icon-btn delete-category-btn" data-category-type="${cat}" style="color: #dc3545; padding: 4px;">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
            <div class="food-stickers">
                ${stickersHtml}
            </div>
            ${addFoodHtml}
        `;
        categoriesContainer.appendChild(catCard);
    });
}

// Attach standard DOM Event Listeners
function setupEventListeners() {
    // Top-Level Event Delegation for Categories Container (Add food, delete category, edit/select variant)
    categoriesContainer.addEventListener('click', (e) => {
        // Delete Category check
        const delCatBtn = e.target.closest('.delete-category-btn');
        if (delCatBtn) {
            if (confirm("Delete this entire category and all its meals?")) {
                const catType = delCatBtn.getAttribute('data-category-type');
                const plan = plans.find(p => p.id === currentPlanId);
                if (plan && plan.categories[catType]) {
                    delete plan.categories[catType];
                    if (plan.schedule) {
                        for (let date in plan.schedule) {
                            if (plan.schedule[date][catType]) {
                                delete plan.schedule[date][catType];
                            }
                        }
                    }
                    if (tempSelections[catType]) delete tempSelections[catType];
                    saveData();
                    renderPlanDetails();
                }
            }
            return;
        }

        // Add Food check
        const addFoodBtn = e.target.closest('.add-food-sticker');
        if (addFoodBtn) {
            const catType = addFoodBtn.getAttribute('data-category-type');
            editMealCategory.value = catType;
            editMealId.value = 'new';
            editMealText.value = '';
            editMealIngredients.value = '';
            if (document.getElementById('delete-meal-btn')) document.getElementById('delete-meal-btn').style.display = 'none';
            editMealModal.classList.add('active');
            return;
        }

        // Edit variant check
        const editBtn = e.target.closest('.edit-sticker-btn');
        if (editBtn) {
            const sticker = editBtn.closest('.variant-sticker');
            if (sticker) {
                const variantId = sticker.getAttribute('data-variant-id');
                const catType = sticker.getAttribute('data-category-type');
                const plan = plans.find(p => p.id === currentPlanId);
                const variant = plan.categories[catType].find(v => v.id === variantId);

                editMealCategory.value = catType;
                editMealId.value = variantId;
                editMealText.value = variant.text;

                let ingsText = (variant.ingredients || []).map(ing => `${ing.n}: ${ing.a} ${ing.u}`).join('\n');
                editMealIngredients.value = ingsText;

                if (document.getElementById('delete-meal-btn')) document.getElementById('delete-meal-btn').style.display = 'block';
                editMealModal.classList.add('active');
            }
            return;
        }

        // Select variant check (only if planning mode)
        const sticker = e.target.closest('.variant-sticker');
        if (sticker) {
            if (!activePlanningDate) {
                // Completely disable click event interaction unless active planning mode
                return;
            }

            const variantId = sticker.getAttribute('data-variant-id');
            const catType = sticker.getAttribute('data-category-type');

            if (tempSelections[catType] === variantId) {
                tempSelections[catType] = null;
            } else {
                tempSelections[catType] = variantId;
            }

            renderPlanDetails();
        }
    });

    // Back navigation
    backBtn.addEventListener('click', () => {
        currentPlanId = null;
        navigateTo('main-screen');
    });

    // Theme Toggle Logic
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('platemate_theme', newTheme);
        });
    }

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
                name: name,
                schedule: {},
                categories: {},
                guidelines: ""
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
            const plan = plans.find(p => p.id === currentPlanId);
            if (plan) {
                guidelinesDisplay.textContent = plan.guidelines || "No custom guidelines set for this plan. Click Edit to add some.";
                guidelinesDisplay.style.display = 'block';
                guidelinesEditor.style.display = 'none';
                guidelinesActions.style.display = 'none';
                if (editGuidelinesBtn) editGuidelinesBtn.style.display = 'block';
            }
            guidelinesModal.classList.add('active');
        });
    }

    if (closeGuidelinesBtn) {
        closeGuidelinesBtn.addEventListener('click', () => {
            guidelinesModal.classList.remove('active');
        });
    }

    if (editGuidelinesBtn) {
        editGuidelinesBtn.addEventListener('click', () => {
            const plan = plans.find(p => p.id === currentPlanId);
            if (plan) {
                guidelinesEditor.value = plan.guidelines || "";
                guidelinesDisplay.style.display = 'none';
                editGuidelinesBtn.style.display = 'none';
                guidelinesEditor.style.display = 'block';
                guidelinesActions.style.display = 'flex';
            }
        });
    }

    if (cancelGuidelinesBtn) {
        cancelGuidelinesBtn.addEventListener('click', () => {
            guidelinesDisplay.style.display = 'block';
            guidelinesEditor.style.display = 'none';
            guidelinesActions.style.display = 'none';
            if (editGuidelinesBtn) editGuidelinesBtn.style.display = 'block';
        });
    }

    if (saveGuidelinesBtn) {
        saveGuidelinesBtn.addEventListener('click', () => {
            const plan = plans.find(p => p.id === currentPlanId);
            if (plan) {
                plan.guidelines = guidelinesEditor.value;
                saveData();
                guidelinesDisplay.textContent = plan.guidelines || "No custom guidelines set for this plan. Click Edit to add some.";
                guidelinesDisplay.style.display = 'block';
                guidelinesEditor.style.display = 'none';
                guidelinesActions.style.display = 'none';
                if (editGuidelinesBtn) editGuidelinesBtn.style.display = 'block';
            }
        });
    }

    guidelinesModal.addEventListener('click', (e) => {
        if (e.target === guidelinesModal) {
            guidelinesModal.classList.remove('active');
        }
    });

    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => {
            if (newCategoryName) newCategoryName.value = '';
            if (addCategoryModal) addCategoryModal.classList.add('active');
            if (newCategoryName) newCategoryName.focus();
        });
    }

    if (cancelCategoryBtn) {
        cancelCategoryBtn.addEventListener('click', () => {
            if (addCategoryModal) addCategoryModal.classList.remove('active');
        });
    }

    if (saveCategoryBtn) {
        saveCategoryBtn.addEventListener('click', () => {
            const plan = plans.find(p => p.id === currentPlanId);
            if (plan && newCategoryName) {
                const catName = newCategoryName.value.trim();
                if (catName && !plan.categories[catName]) {
                    plan.categories[catName] = [];
                    saveData();
                    renderPlanDetails();
                }
            }
            if (addCategoryModal) addCategoryModal.classList.remove('active');
        });
    }

    if (openDatePickerBtn) {
        openDatePickerBtn.addEventListener('click', () => {
            const today = new Date().toISOString().split('T')[0];
            if (planDateInput && !planDateInput.value) planDateInput.value = today;
            datePickerModal.classList.add('active');
        });
    }

    if (cancelDateBtn) {
        cancelDateBtn.addEventListener('click', () => {
            datePickerModal.classList.remove('active');
        });
    }

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
            datePickerModal.classList.remove('active');
            renderPlanDetails();
        });
    }

    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => {
            editMealModal.classList.remove('active');
        });
    }

    if (saveEditBtn) {
        saveEditBtn.addEventListener('click', () => {
            const plan = plans.find(p => p.id === currentPlanId);
            const variantId = editMealId.value;
            const catType = editMealCategory.value;

            const parsedIngs = parseIngredients(editMealIngredients.value);

            if (variantId === 'new') {
                const newVariant = {
                    id: 'v_' + ((window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString()),
                    text: editMealText.value || 'New Meal',
                    ingredients: parsedIngs
                };
                if (!plan.categories[catType]) plan.categories[catType] = [];
                plan.categories[catType].push(newVariant);
            } else {
                const variant = plan.categories[catType].find(v => v.id === variantId);
                if (variant) {
                    variant.text = editMealText.value;
                    variant.ingredients = parsedIngs;
                }
            }
            saveData();
            renderPlanDetails();
            editMealModal.classList.remove('active');
        });
    }

    const deleteMealBtn = document.getElementById('delete-meal-btn');
    if (deleteMealBtn) {
        deleteMealBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete this meal?")) {
                const plan = plans.find(p => p.id === currentPlanId);
                const variantId = editMealId.value;
                const catType = editMealCategory.value;

                if (plan && plan.categories[catType]) {
                    plan.categories[catType] = plan.categories[catType].filter(v => v.id !== variantId);

                    if (tempSelections[catType] === variantId) {
                        tempSelections[catType] = null;
                    }
                    if (plan.schedule) {
                        for (let date in plan.schedule) {
                            if (plan.schedule[date][catType] === variantId) {
                                delete plan.schedule[date][catType];
                            }
                        }
                    }
                }
                saveData();
                renderPlanDetails();
                editMealModal.classList.remove('active');
            }
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

            Object.keys(plan.categories).forEach(cat => {
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
                    listHtml += `<div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px;">
                        <input type="checkbox" style="transform: scale(1.2); flex: 0 0 30px;">
                        <span>${ing.n}</span>
                        <strong style="margin-left: auto;">${ing.a} ${ing.u}</strong>
                    </div>`;
                });

            if (!listHtml) listHtml = '<div style="margin-bottom: 8px;">No ingredients found</div>';
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

// Ingredient Parser logic for Edit Modal
function parseIngredients(text) {
    if (!text || !text.trim()) return [];
    const lines = text.split('\n');
    const ings = [];
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        // e.g. "Milk: 100 ml", "- Milk: 100ml", "Oats: 30g", or "Apple"
        line = line.replace(/^[-•*]\s*/, '');
        if (line.includes(':')) {
            const parts = line.split(':');
            const name = parts.shift().trim();
            const amountUnit = parts.join(':').trim();
            // Handle cases where number and unit don't have a space (e.g. 30g)
            const numMatch = amountUnit.match(/^([\d.,]+)\s*(.*)$/);
            if (numMatch) {
                const val = parseFloat(numMatch[1].replace(',', '.'));
                ings.push({ n: name, a: isNaN(val) ? 1 : val, u: numMatch[2] || 'unit' });
            } else {
                ings.push({ n: name, a: 1, u: amountUnit });
            }
        } else {
            // Malformed line fallback to prevent breaking shopping lists
            ings.push({ n: line, a: 1, u: 'serving' });
        }
    }
    return ings;
}

// Start sequence
init();
