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
        // Fixed UUID to maintain a singleton DB row
        id: '00000000-0000-0000-0000-000000000000',
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
    },
    {
        id: '11111111-1111-1111-1111-111111111111',
        name: "Vik's Diet",
        guidelines: "Snacks: Fresh Celery sticks (for snacking), Pomelo (3-4 slices), Handful of almonds/walnuts, Green apple or pear, Carrot sticks.",
        schedule: {},
        categories: {
            "Breakfast": [
                { id: "vb1", text: "Egg Delight (2-3 eggs, 1/2 avocado, cucumber)", ingredients: [{ n: "Eggs", a: 3, u: "pcs" }, { n: "Avocado", a: 0.5, u: "pcs" }, { n: "Cucumber", a: 1, u: "pcs" }] },
                { id: "vb2", text: "Cottage Cheese Mix (Cottage cheese, nuts, green apple)", ingredients: [{ n: "Cottage Cheese", a: 150, u: "g" }, { n: "Nuts", a: 20, u: "g" }, { n: "Green Apple", a: 1, u: "pcs" }] },
                { id: "vb3", text: "Classic Oatmeal (Oats, 1/2 avocado or seeds)", ingredients: [{ n: "Oats", a: 50, u: "g" }, { n: "Avocado/Seeds", a: 0.5, u: "pcs" }] }
            ],
            "Lunch": [
                { id: "vl1", text: "Tuna & Rice (Tuna, brown rice, salad)", ingredients: [{ n: "Tuna", a: 130, u: "g" }, { n: "Brown Rice", a: 150, u: "g" }, { n: "Salad", a: 150, u: "g" }] },
                { id: "vl2", text: "Chicken & Buckwheat (Chicken fillet, buckwheat, red cabbage salad)", ingredients: [{ n: "Chicken Fillet", a: 150, u: "g" }, { n: "Buckwheat", a: 150, u: "g" }, { n: "Red Cabbage Salad", a: 150, u: "g" }] },
                { id: "vl3", text: "Veggie Stew (Eggplant, pepper, carrot, onion, 1 potato + fish/chicken)", ingredients: [{ n: "Veggie Stew", a: 200, u: "g" }, { n: "Fish/Chicken", a: 150, u: "g" }] },
                { id: "vl4", text: "Vietnamese Mix (Tofu, Pho noodles or brown rice)", ingredients: [{ n: "Tofu", a: 150, u: "g" }, { n: "Pho/Brown Rice", a: 150, u: "g" }] }
            ],
            "Dinner": [
                { id: "vd1", text: "Seafood Platter (Shrimp or squid, celery, cucumber)", ingredients: [{ n: "Shrimp/Squid", a: 150, u: "g" }, { n: "Celery", a: 50, u: "g" }, { n: "Cucumber", a: 100, u: "g" }] },
                { id: "vd2", text: "Protein Salad (Lettuce, tomato, 2 slices of cheese, tuna)", ingredients: [{ n: "Lettuce", a: 100, u: "g" }, { n: "Tomato", a: 100, u: "g" }, { n: "Cheese", a: 2, u: "slices" }, { n: "Tuna", a: 100, u: "g" }] },
                { id: "vd3", text: "Light Stew (Veggie stew without potato + tofu or tuna)", ingredients: [{ n: "Light Veggie Stew", a: 200, u: "g" }, { n: "Tofu/Tuna", a: 100, u: "g" }] }
            ]
        }
    }
];

// Core categories for inside a plan
const STANDARD_CATEGORIES = ["Breakfast", "Lunch", "Dinner 1", "Dinner 2"];
// Canonical display order for meal categories
const MEAL_ORDER = ["Breakfast", "Lunch", "Dinner", "Dinner 1", "Dinner 2"];

// Supabase Configuration
const supabaseUrl = "https://jmdmnrhcuwgaaxwdilzj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZG1ucmhjdXdnYWF4d2RpbHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMjMxNzksImV4cCI6MjA4ODg5OTE3OX0.ues1CEctWxhl_rJeuyjUapcJvyjWL_BFGcKdngXp5mM";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("Client Initialized. Attempting test query...");
supabaseClient.from('diet_plans').select('*').limit(1)
    .then(res => {
        if (res.error) console.error("Cloud Auth Failed:", res.error.message);
        else console.log("Cloud Auth Success! Connection is active.");
    });

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
const historyBackBtn = document.getElementById('history-back-btn');
const viewHistoryBtn = document.getElementById('view-history-btn');
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
const timeEditorModal = document.getElementById('time-editor-modal');
const timeEditorInput = document.getElementById('time-editor-input');
const timeEditorError = document.getElementById('time-editor-error');
const timeEditorCancel = document.getElementById('time-editor-cancel');
const timeEditorSave = document.getElementById('time-editor-save');

const extraSnacksList = document.getElementById('extra-snacks-list');
const snackNameInput = document.getElementById('snack-name-input');
const snackAmountInput = document.getElementById('snack-amount-input');
const addSnackBtn = document.getElementById('add-snack-btn');

function renderExtraSnacks(snacks) {
    if (!extraSnacksList) return;
    if (!snacks || snacks.length === 0) {
        extraSnacksList.innerHTML = '<span style="color: var(--gray); font-style: italic;">No extra snacks.</span>';
        return;
    }
    let html = '';
    snacks.forEach((snack, idx) => {
        const timeHtml = `<span class="edit-snack-time-btn" data-index="${idx}" style="color: var(--primary-blue); font-size: 0.85em; font-weight: 600; cursor: pointer; margin-left: 4px;">[${snack.time || '--:--'}]</span>`;
        html += `<div style="display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--gray-light); margin-bottom: 6px;">
            <span style="color: #333;"><strong>${snack.name}</strong> (${snack.amount})${timeHtml}</span>
            <button class="icon-btn remove-snack-btn" data-index="${idx}" style="color: #dc3545; padding: 4px; border: none; background: none; cursor: pointer;">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>`;
    });
    extraSnacksList.innerHTML = html;

    extraSnacksList.querySelectorAll('.remove-snack-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            const plan = plans.find(p => p.id === currentPlanId);
            if (plan && currentlyViewingDate && plan.schedule[currentlyViewingDate]) {
                plan.schedule[currentlyViewingDate].extraSnacks.splice(index, 1);
                saveData();
                renderExtraSnacks(plan.schedule[currentlyViewingDate].extraSnacks);
                if (document.getElementById('history-screen').classList.contains('active')) {
                    renderHistoryScreen();
                }
            }
        });
    });

    extraSnacksList.querySelectorAll('.edit-snack-time-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            const plan = plans.find(p => p.id === currentPlanId);
            if (!plan || !currentlyViewingDate || !plan.schedule[currentlyViewingDate]) return;
            
            const snack = plan.schedule[currentlyViewingDate].extraSnacks[index];
            if (!snack) return;

            timeEditorInput.value = snack.time || '';
            timeEditorError.textContent = '';
            timeEditorSave.onclick = () => {
                let val = timeEditorInput.value.trim();
                const regex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
                const match = val.match(regex);
                
                if (val !== '' && !match) return;

                if (match) {
                    const hh = match[1];
                    const mm = match[2];
                    val = `${hh}:${mm}`;
                } else {
                    val = null;
                }

                snack.time = val;
                saveData();
                timeEditorModal.classList.remove('active');
                renderExtraSnacks(plan.schedule[currentlyViewingDate].extraSnacks);
                if (document.getElementById('history-screen').classList.contains('active')) {
                    renderHistoryScreen();
                }
            };
            timeEditorModal.classList.add('active');
            timeEditorInput.focus();
        });
    });
}

// Bootstrap Application
async function init() {
    // Unregister any active service workers to prevent collisions
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
    }

    initTheme();
    setupEventListeners();
    setupLightbox();
    await loadData();
    await saveData(); // Manual push to align DB
    renderMainScreen();
    setupRealtime();

    // Check Connection
    supabaseClient.from('diet_plans').select('count', { count: 'exact', head: true })
        .then(res => {
            if (res.error) {
                console.error("Connection Failed:", res.error.message);
                setSyncStatus(false);
            } else {
                console.log("Supabase Connected Successfully!");
                setSyncStatus(true);
            }
        });
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
    const channel = supabaseClient.channel('schema-db-changes');
    channel.on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'diet_plans',
            },
            (payload) => {
                const incomingData = payload.new;
                if (!incomingData) return;

                const incomingPlan = {
                    id: incomingData.id || '00000000-0000-0000-0000-000000000000',
                    name: incomingData.name,
                    guidelines: incomingData.guidelines || "",
                    categories: incomingData.categories || {},
                    schedule: incomingData.schedule || {}
                };

                const index = plans.findIndex(p => p.id === incomingPlan.id);
                if (index !== -1) {
                    if (JSON.stringify(plans[index]) === JSON.stringify(incomingPlan)) return;
                    plans[index] = incomingPlan;
                } else {
                    plans.push(incomingPlan);
                }

                localStorage.setItem('platemate_plans', JSON.stringify(plans));

                // Re-render based on active screen
                if (document.getElementById('plan-screen').classList.contains('active')) {
                    renderPlanDetails();
                } else if (document.getElementById('main-screen').classList.contains('active')) {
                    renderMainScreen();
                }
            }
        )
        .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                setSyncStatus(true);
            } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                setSyncStatus(false);
                supabaseClient.removeChannel(channel);
            }
        });
}

// Persist Data using Supabase
async function loadData() {
    try {
        setSyncStatus(false);
        
        // One-time cleanup of duplicates in the cloud DB
        if (!localStorage.getItem('platemate_db_cleaned_v2')) {
            await supabaseClient.from('diet_plans').delete().neq('id', 'dummy_non_existent');
            localStorage.setItem('platemate_db_cleaned_v2', 'true');
        }

        const { data, error } = await supabaseClient.from('diet_plans').select('*');
        if (error) throw error;

        if (data && data.length > 0) {
            plans = data.map(row => ({
                id: row.id || '00000000-0000-0000-0000-000000000000',
                name: row.name,
                guidelines: row.guidelines || "",
                categories: row.categories || {},
                schedule: row.schedule || {}
            }));
        } else {
            // Table is empty, seed from local storage or defaults
            const stored = localStorage.getItem('platemate_plans');
            if (stored) {
                plans = JSON.parse(stored);
            } else {
                plans = JSON.parse(JSON.stringify(defaultData));
            }
        }
        
        // Ensure Vik's Diet is added if missing
        const viksPlanIdx = plans.findIndex(p => p.id === '11111111-1111-1111-1111-111111111111' || p.name === "Vik's Diet");
        if (viksPlanIdx === -1) {
            const viksDiet = defaultData.find(d => d.id === '11111111-1111-1111-1111-111111111111');
            if (viksDiet) {
                plans.push(JSON.parse(JSON.stringify(viksDiet)));
            }
        } else {
            // Force update guidelines to include new snack if missing
            if (!plans[viksPlanIdx].guidelines.includes("Fresh Celery sticks")) {
                plans[viksPlanIdx].guidelines = "Snacks: Fresh Celery sticks (for snacking), Pomelo (3-4 slices), Handful of almonds/walnuts, Green apple or pear, Carrot sticks.";
            }
        }

        localStorage.setItem('platemate_plans', JSON.stringify(plans));
        await saveData();
        setSyncStatus(true);
    } catch (e) {
        console.error("Supabase load error:", e);
        // Fallback to local storage
        const stored = localStorage.getItem('platemate_plans');
        if (stored) {
            plans = JSON.parse(stored);
            if(plans.length > 0) plans[0].id = '00000000-0000-0000-0000-000000000000';
        } else {
            plans = [...defaultData];
        }
    }
}

async function saveData() {
    // Local backup
    localStorage.setItem('platemate_plans', JSON.stringify(plans));
    
    // Support multiple plans
    if (!plans || plans.length === 0) return;

    try {
        setSyncStatus(false);
        const payloads = plans.map(p => ({
            id: p.id || '00000000-0000-0000-0000-000000000000',
            name: p.name,
            guidelines: p.guidelines || "",
            categories: p.categories || {},
            schedule: p.schedule || {}
        }));

        const { error } = await supabaseClient.from('diet_plans').upsert(payloads);

        if (!error) {
            setSyncStatus(true);
        } else {
            throw error;
        }
    } catch (e) {
        console.error("Supabase save error:", e);
        setSyncStatus(false);
    }
}

// Custom UI Confirm Modal Function
function showConfirm(message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirm-modal');
        const msgEl = document.getElementById('confirm-modal-message');
        const cancelBtn = document.getElementById('confirm-cancel-btn');
        const deleteBtn = document.getElementById('confirm-delete-btn');
        
        if (!modal) return resolve(window.confirm(message));

        msgEl.textContent = message;
        modal.classList.add('active');

        const cleanup = () => {
            cancelBtn.removeEventListener('click', onCancel);
            deleteBtn.removeEventListener('click', onDelete);
            modal.classList.remove('active');
        };

        const onCancel = () => { cleanup(); resolve(false); };
        const onDelete = () => { cleanup(); resolve(true); };

        cancelBtn.addEventListener('click', onCancel);
        deleteBtn.addEventListener('click', onDelete);
    });
}

// Screen Navigation Utility
function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // Show target screen
    document.getElementById(screenId).classList.add('active');
}

function toggleMealLibrary(forceState = null) {
    const content = document.getElementById('meal-library-content');
    const icon = document.getElementById('meal-library-icon');
    if (!content || !icon) return;

    if (forceState === null) {
        forceState = content.style.display === 'none';
    }

    if (forceState) {
        content.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        icon.style.transform = 'none';
    }
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

    const titleTextSpan = document.getElementById('plan-title-text');
    if (titleTextSpan) {
        titleTextSpan.textContent = plan.name;
    } else {
        planTitleEl.textContent = plan.name;
    }

    // reset date input
    if (planDateInput) {
        const today = new Date().toISOString().split('T')[0]; // Simple local string approx
        planDateInput.value = today;
    }

    toggleMealLibrary(false);
    renderPlanDetails();
    navigateTo('plan-screen');
}

function calculateStreak(plan) {
    if (!plan || !plan.schedule) return 0;
    
    // Normalize timestamps securely disregarding local user timezones
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const [ty, tm, td] = new Date().toISOString().split('T')[0].split('-'); 
    const todayObj = new Date(ty, tm - 1, td);
    const todayTime = todayObj.getTime();

    const relevantDates = Object.keys(plan.schedule).filter(date => {
        const [y, m, d] = date.split('-');
        return new Date(y, m - 1, d).getTime() <= todayTime;
    }).sort((a, b) => new Date(b) - new Date(a));

    if (relevantDates.length === 0) return 0;

    let streak = 0;
    let expectedTime = todayTime;
    let i = 0;
    
    // Evaluate if today exists and its fulfillment
    if (relevantDates[0]) {
        const [y, m, d] = relevantDates[0].split('-');
        if (new Date(y, m - 1, d).getTime() === todayTime) {
            const scheduleDay = plan.schedule[relevantDates[0]];
            let doneCount = 0;
            if (plan.categories) {
                Object.keys(plan.categories).forEach(cat => {
                    const sel = scheduleDay[cat];
                    if (sel && typeof sel === 'object' && sel.done) doneCount++;
                });
            }
            if (doneCount >= 3) {
                streak++;
                expectedTime -= ONE_DAY;
            } else {
                expectedTime -= ONE_DAY;
            }
            i++;
        } else {
            expectedTime -= ONE_DAY;
        }
    }

    // Traverse recursively backwards mapping the continuous chain
    for (; i < relevantDates.length; i++) {
        const [y, m, d] = relevantDates[i].split('-');
        const iterTime = new Date(y, m - 1, d).getTime();
        
        if (iterTime !== expectedTime) break;

        let doneCount = 0;
        if (plan.categories) {
            Object.keys(plan.categories).forEach(cat => {
                const sel = plan.schedule[relevantDates[i]][cat];
                if (sel && typeof sel === 'object' && sel.done) doneCount++;
            });
        }

        if (doneCount >= 3) {
            streak++;
            expectedTime -= ONE_DAY;
        } else break;
    }
    return streak;
}

function renderPlanDetails() {
    const plan = plans.find(p => p.id === currentPlanId);
    if (!plan) return;

    // Render Streak Logic
    const streakCounterContainer = document.getElementById('streak-counter-container');
    const streakCountText = document.getElementById('streak-count-text');
    if (streakCounterContainer && streakCountText) {
        const currentStreak = calculateStreak(plan);
        if (currentStreak > 0) {
            streakCountText.textContent = currentStreak + (currentStreak === 1 ? " day in mode" : " days in mode");
            streakCounterContainer.style.display = 'flex';
        } else {
            streakCounterContainer.style.display = 'none';
        }
    }

    // Render Schedule List
    if (scheduledDatesList) {
        scheduledDatesList.innerHTML = '';
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        const todayTime = todayDate.getTime();

        const sortedDates = Object.keys(plan.schedule || {}).filter(date => {
            const [y, m, d] = date.split('-');
            const dateObj = new Date(y, m - 1, d);
            return dateObj.getTime() >= todayTime;
        }).sort();

        if (sortedDates.length === 0) {
            scheduledDatesList.innerHTML = '<p style="text-align: center; color: var(--gray); font-style: italic; margin-top: 10px;">No plans made for today or the future.</p>';
        }

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
                openDailyMenuForDate(date);
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
        const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
        if (scrollToTopBtn) scrollToTopBtn.style.display = 'block';
    } else if (activePlanningControls) {
        activePlanningControls.style.display = 'none';
        if (openDatePickerBtn) openDatePickerBtn.style.display = 'block';
        if (planDateInput) planDateInput.disabled = false;
        if (planDateBtn) planDateBtn.disabled = false;
        const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
        if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
    }

    categoriesContainer.innerHTML = '';

    // Render Categories
    const orderedCategories = Object.keys(plan.categories).sort((a, b) => {
        const indexA = STANDARD_CATEGORIES.indexOf(a);
        const indexB = STANDARD_CATEGORIES.indexOf(b);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
    });

    orderedCategories.forEach(cat => {
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
    const mealLibraryHeader = document.getElementById('meal-library-header');
    if (mealLibraryHeader) {
        mealLibraryHeader.addEventListener('click', () => toggleMealLibrary());
    }

    // Top-Level Event Delegation for Categories Container (Add food, delete category, edit/select variant)
    categoriesContainer.addEventListener('click', async (e) => {
        // Delete Category check
        const delCatBtn = e.target.closest('.delete-category-btn');
        if (delCatBtn) {
            const confirmed = await showConfirm("Delete this entire category and all its meals?");
            if (confirmed) {
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

    if (historyBackBtn) {
        historyBackBtn.addEventListener('click', () => {
            navigateTo('plan-screen');
        });
    }

    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', () => {
            renderHistoryScreen();
            navigateTo('history-screen');
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            const plannerSection = document.querySelector('.planner-section');
            if (plannerSection) {
                plannerSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Edit Plan Title Name
    const editPlanTitleBtn = document.getElementById('edit-plan-title-btn');
    if (editPlanTitleBtn) {
        editPlanTitleBtn.addEventListener('click', () => {
            const plan = plans.find(p => p.id === currentPlanId);
            if (plan) {
                const newName = prompt("Enter new plan name:", plan.name);
                if (newName && newName.trim()) {
                    plan.name = newName.trim();
                    saveData();
                    const titleTextSpan = document.getElementById('plan-title-text');
                    if (titleTextSpan) titleTextSpan.textContent = plan.name;
                }
            }
        });
    }

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
            
            tempSelections = {};
            const savedDay = plan.schedule[dateStr] || {};
            Object.keys(savedDay).forEach(cat => {
                const sel = savedDay[cat];
                tempSelections[cat] = typeof sel === 'object' ? sel.id : sel;
            });
            
            datePickerModal.classList.remove('active');
            toggleMealLibrary(true);
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
        deleteMealBtn.addEventListener('click', async () => {
            const confirmed = await showConfirm("Are you sure you want to delete this meal?");
            if (confirmed) {
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
                            const sel = plan.schedule[date][catType];
                            const selId = typeof sel === 'object' ? sel.id : sel;
                            if (selId === variantId) {
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
            toggleMealLibrary(false);
            renderPlanDetails();
        });
    }

    if (confirmMenuBtn) {
        confirmMenuBtn.addEventListener('click', () => {
            if (activePlanningDate && currentPlanId) {
                const plan = plans.find(p => p.id === currentPlanId);
                if (plan) {
                    if (!plan.schedule) plan.schedule = {};
                    
                    const newSchedule = {};
                    Object.keys(tempSelections).forEach(cat => {
                        if (!tempSelections[cat]) return;
                        const existingSel = plan.schedule[activePlanningDate] ? plan.schedule[activePlanningDate][cat] : null;
                        const existingId = (existingSel && typeof existingSel === 'object') ? existingSel.id : existingSel;
                        const existingDone = (existingSel && typeof existingSel === 'object') ? existingSel.done : false;
                        const existingPhotoUrl = (existingSel && typeof existingSel === 'object') ? existingSel.photoUrl : null;
                        const existingCompletionTime = (existingSel && typeof existingSel === 'object') ? (existingSel.completionTime || null) : null;

                        // --- DATA SNAPSHOT: find the live variant and deep-copy text + ingredients ---
                        const variantId = tempSelections[cat];
                        let snapshotText = '';
                        let snapshotIngredients = [];
                        if (plan.categories && plan.categories[cat]) {
                            const liveVariant = plan.categories[cat].find(v => v.id === variantId);
                            if (liveVariant) {
                                snapshotText = liveVariant.text || '';
                                snapshotIngredients = JSON.parse(JSON.stringify(liveVariant.ingredients || []));
                            }
                        }

                        newSchedule[cat] = {
                            id: variantId,
                            text: snapshotText,
                            ingredients: snapshotIngredients,
                            done: (existingId === variantId) ? existingDone : false,
                            photoUrl: (existingId === variantId) ? existingPhotoUrl : null,
                            completionTime: (existingId === variantId) ? existingCompletionTime : null
                        };
                    });
                    
                    plan.schedule[activePlanningDate] = newSchedule;
                    saveData();
                    // Reset selection state after saving
                    activePlanningDate = null;
                    tempSelections = {};
                    toggleMealLibrary(false);
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

    if (addSnackBtn) {
        addSnackBtn.addEventListener('click', () => {
            const plan = plans.find(p => p.id === currentPlanId);
            if (!plan || !currentlyViewingDate || !plan.schedule[currentlyViewingDate]) return;
            
            const name = snackNameInput.value.trim();
            const amount = snackAmountInput.value.trim();
            if (!name) return;
            
            if (!plan.schedule[currentlyViewingDate].extraSnacks) {
                plan.schedule[currentlyViewingDate].extraSnacks = [];
            }
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            plan.schedule[currentlyViewingDate].extraSnacks.push({ 
                name, 
                amount: amount || '1 serving',
                time: timeStr
            });
            
            saveData();
            
            snackNameInput.value = '';
            snackAmountInput.value = '';
            renderExtraSnacks(plan.schedule[currentlyViewingDate].extraSnacks);
        });
    }

    // Generate Shopping List
    if (generateShoppingBtn) {
        generateShoppingBtn.addEventListener('click', () => {
            const plan = plans.find(p => p.id === currentPlanId);
            if (!plan || !currentlyViewingDate || !plan.schedule[currentlyViewingDate]) return;

            const selections = plan.schedule[currentlyViewingDate];
            const shoppingMap = {};

            // Gather all category keys from the schedule record (snapshot-aware)
            const shoppingCatKeys = new Set([
                ...Object.keys(selections).filter(k => k !== 'extraSnacks'),
                ...Object.keys(plan.categories)
            ]);
            shoppingCatKeys.forEach(cat => {
                const sel = selections[cat];
                if (!sel) return;
                const selId = typeof sel === 'object' ? sel.id : sel;
                if (!selId) return;

                // --- SNAPSHOT PRIORITY: use ingredients stored in the record ---
                const ingredients = (typeof sel === 'object' && sel.ingredients && sel.ingredients.length > 0) ? sel.ingredients
                    : (() => { const v = plan.categories[cat] && plan.categories[cat].find(v => v.id === selId); return v ? (v.ingredients || []) : []; })();

                ingredients.forEach(ing => {
                    const key = `${ing.n}_${ing.u}`;
                    if (!shoppingMap[key]) {
                        shoppingMap[key] = { n: ing.n, a: 0, u: ing.u };
                    }
                    shoppingMap[key].a += ing.a;
                });
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

    // Time Editor Modal Events
    if (timeEditorCancel) {
        timeEditorCancel.addEventListener('click', () => {
            timeEditorModal.classList.remove('active');
        });
    }

    if (timeEditorInput) {
        timeEditorInput.addEventListener('input', () => {
            let val = timeEditorInput.value.trim();
            
            // Auto-format 4 digits into HH:mm
            let digitsOnly = val.replace(/\D/g, '');
            if (digitsOnly.length === 4 && !val.includes(':')) {
                const hh = digitsOnly.slice(0, 2);
                const mm = digitsOnly.slice(2, 4);
                timeEditorInput.value = `${hh}:${mm}`;
                val = timeEditorInput.value;
            }

            const regex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
            if (val === '' || regex.test(val)) {
                timeEditorError.textContent = '';
                timeEditorSave.disabled = false;
            } else {
                timeEditorError.textContent = 'Invalid format. Use HH:mm or 4 digits.';
                timeEditorSave.disabled = true;
            }
        });
    }

    timeEditorModal.addEventListener('click', (e) => {
        if (e.target === timeEditorModal) timeEditorModal.classList.remove('active');
    });
}

function openDailyMenuForDate(date) {
    const plan = plans.find(p => p.id === currentPlanId);
    if (!plan || !plan.schedule[date]) return;

    currentlyViewingDate = date;
    
    let dateString = date;
    try {
        const [y, m, d] = date.split('-');
        const dateObj = new Date(y, m - 1, d);
        dateString = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (e) {}
    
    dailyMenuTitle.textContent = `Menu for ${dateString}`;

    if (!plan.schedule[date].extraSnacks) plan.schedule[date].extraSnacks = [];
    renderExtraSnacks(plan.schedule[date].extraSnacks);

    let menuHtml = '';
    const menuCatKeys = new Set([
        ...Object.keys(plan.schedule[date]).filter(k => k !== 'extraSnacks'),
        ...Object.keys(plan.categories)
    ]);
    const sortedMenuCats = [...menuCatKeys].sort((a, b) => {
        const ai = MEAL_ORDER.indexOf(a);
        const bi = MEAL_ORDER.indexOf(b);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return a.localeCompare(b);
    });

    sortedMenuCats.forEach(cat => {
        const sel = plan.schedule[date][cat];
        if (!sel) return;
        const selId = typeof sel === 'object' ? sel.id : sel;
        const isDone = typeof sel === 'object' && sel.done ? true : false;
        const displayText = (typeof sel === 'object' && sel.text) ? sel.text
            : (() => { const v = plan.categories[cat] && plan.categories[cat].find(v => v.id === selId); return v ? v.text : null; })();

        if (selId && displayText) {
            const doneStyle = isDone ? 'text-decoration: line-through; opacity: 0.6;' : '';
            const checkedAttr = isDone ? 'checked' : '';
            const photoUrl = typeof sel === 'object' && sel.photoUrl ? sel.photoUrl : null;
            const completionTime = (typeof sel === 'object' && sel.completionTime) ? sel.completionTime : null;

            const timeBadgeHtml = isDone
                ? `<span class="edit-time-btn" data-cat="${cat}" style="color: var(--primary-blue); font-size: 0.85em; font-weight: 600; cursor: pointer; margin-left: 4px;">[${completionTime || '--:--'}]</span>`
                : '';

            let photoHtml = '';
            if (photoUrl) {
                photoHtml = `
                    <div style="margin-top: 8px; position: relative; display: inline-block;">
                        <img src="${photoUrl}" style="max-width: 100px; max-height: 100px; border-radius: 8px; border: 1px solid var(--gray-light);" />
                        <button class="icon-btn delete-photo-btn" data-cat="${cat}" style="position: absolute; top: -8px; right: -8px; background: #dc3545; color: white; border-radius: 50%; padding: 4px; border: none; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                `;
            }

            menuHtml += `
                <div style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 12px; ${doneStyle}">
                    <input type="checkbox" class="meal-completed-checkbox" data-cat="${cat}" style="transform: scale(1.3); margin-top: 4px; flex: 0 0 20px;" ${checkedAttr}>
                    <div style="flex-grow: 1;">
                        <strong>${cat}:</strong> ${timeBadgeHtml}<br/> ${displayText}
                        ${photoHtml}
                    </div>
                    <button class="icon-btn photo-btn" data-cat="${cat}" style="color: var(--primary-blue); padding: 4px; margin-top: -2px;">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                    </button>
                </div>`;
        }
    });

    if (!menuHtml) menuHtml = '<p>No meals planned for this date.</p>';
    dailyMenuContent.innerHTML = menuHtml;

    // Listeners
    dailyMenuContent.querySelectorAll('.meal-completed-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const cat = e.target.getAttribute('data-cat');
            const isChecked = e.target.checked;
            const sel = plan.schedule[date][cat];
            const selId = typeof sel === 'object' ? sel.id : sel;
            
            let completionTime = (sel && typeof sel === 'object' && sel.completionTime) ? sel.completionTime : null;
            if (isChecked && !completionTime) {
                const now = new Date();
                completionTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            } else if (!isChecked) {
                completionTime = null;
            }

            saveData();
            openDailyMenuForDate(date); // Re-render instantly
            if (document.getElementById('history-screen').classList.contains('active')) {
                renderHistoryScreen();
            }
        });
    });

    dailyMenuContent.addEventListener('click', (e) => {
        const btn = e.target.closest('.edit-time-btn');
        if (btn) {
            const cat = btn.getAttribute('data-cat');
            const sel = plan.schedule[date][cat];
            if (!sel || typeof sel !== 'object') return;
            
            timeEditorInput.value = sel.completionTime || '';
            timeEditorError.textContent = '';
            timeEditorSave.onclick = () => {
                let val = timeEditorInput.value.trim();
                const regex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
                const match = val.match(regex);
                
                if (val !== '' && !match) return;

                // Ensure it's in HH:mm format for storage
                if (match) {
                    const hh = match[1];
                    const mm = match[2];
                    val = `${hh}:${mm}`;
                } else {
                    val = null;
                }

                sel.completionTime = val;
                saveData();
                timeEditorModal.classList.remove('active');
                openDailyMenuForDate(date); // Re-render instantly
                if (document.getElementById('history-screen').classList.contains('active')) {
                    renderHistoryScreen();
                }
            };
            timeEditorModal.classList.add('active');
            timeEditorInput.focus();
        }
        
        // Photo and other buttons...
        const photoBtn = e.target.closest('.photo-btn');
        if (photoBtn) handlePhotoUpload(photoBtn, plan, date);

        const deletePhotoBtn = e.target.closest('.delete-photo-btn');
        if (deletePhotoBtn) handleDeletePhoto(deletePhotoBtn, plan, date);
    });

    dailyMenuModal.classList.add('active');
}

async function handlePhotoUpload(btn, plan, date) {
    const cat = btn.getAttribute('data-cat');
    const fileInput = document.getElementById('meal-photo-input');
    if (!fileInput) return;
    
    const origHTML = btn.innerHTML;
    fileInput.value = '';
    fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        btn.style.pointerEvents = 'none';
        btn.innerHTML = `<span style="font-size:12px;">...</span>`;
        
        try {
            const compressedFile = await compressImage(file);
            const path = `uploads/${Date.now()}-${compressedFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
            const { data, error } = await supabaseClient.storage.from('meal-photos').upload(path, compressedFile);
            if (error) throw error;
            
            const { data: urlData } = supabaseClient.storage.from('meal-photos').getPublicUrl(path);
            const photoUrl = urlData.publicUrl;
            
            const sel = plan.schedule[date][cat];
            plan.schedule[date][cat] = {
                ...(typeof sel === 'object' ? sel : { id: sel }),
                photoUrl: photoUrl
            };
            await saveData();
            openDailyMenuForDate(date);
        } catch (err) {
            console.error('Upload Error:', err);
            alert("Upload failed.");
        } finally {
            btn.innerHTML = origHTML;
            btn.style.pointerEvents = 'auto';
        }
    };
    fileInput.click();
}

async function handleDeletePhoto(btn, plan, date) {
    const confirmed = await showConfirm("Remove this photo?");
    if (!confirmed) return;
    
    const cat = btn.getAttribute('data-cat');
    const sel = plan.schedule[date][cat];
    if (sel && typeof sel === 'object' && sel.photoUrl) {
        const urlParts = sel.photoUrl.split('/meal-photos/');
        if (urlParts.length > 1) {
            const path = urlParts[1];
            supabaseClient.storage.from('meal-photos').remove([path]).catch(console.error);
        }
        delete sel.photoUrl;
        await saveData();
        openDailyMenuForDate(date);
        if (document.getElementById('history-screen').classList.contains('active')) {
            renderHistoryScreen();
        }
    }
}

async function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX = 1200;
                if (width > height) { if (width > MAX) { height *= MAX / width; width = MAX; } }
                else { if (height > MAX) { width *= MAX / height; height = MAX; } }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpeg", { type: 'image/jpeg' }));
                    } else { reject(new Error('Canvas failed')); }
                }, 'image/jpeg', 0.7);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// History Screen logic
function renderHistoryScreen() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    historyList.innerHTML = '';

    const plan = plans.find(p => p.id === currentPlanId);
    if (!plan || !plan.schedule) {
        historyList.innerHTML = '<p>No history available.</p>';
        return;
    }

    const now = Date.now();
    const pastDates = Object.keys(plan.schedule).filter(date => {
        const [y, m, d] = date.split('-');
        const dateObj = new Date(y, m - 1, d);
        return dateObj.getTime() < now;
    }).sort((a, b) => new Date(b) - new Date(a));

    if (pastDates.length === 0) {
        historyList.innerHTML = '<p>No history available.</p>';
        return;
    }

    const groupedByMonth = {};
    pastDates.forEach(date => {
        const [y, m, d] = date.split('-');
        const dateObj = new Date(y, m - 1, d);
        const monthYear = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        if (!groupedByMonth[monthYear]) {
            groupedByMonth[monthYear] = [];
        }
        groupedByMonth[monthYear].push(date);
    });

    let renderedAny = false;

    Object.keys(groupedByMonth).forEach(monthYear => {
        const monthGroup = document.createElement('div');
        monthGroup.className = 'month-group';
        monthGroup.style.marginBottom = '20px';

        const monthHeader = document.createElement('div');
        monthHeader.style.display = 'flex';
        monthHeader.style.justifyContent = 'space-between';
        monthHeader.style.alignItems = 'center';
        monthHeader.style.padding = '12px';
        monthHeader.style.background = 'var(--secondary-bg)';
        monthHeader.style.border = '1px solid var(--gray-light)';
        monthHeader.style.borderRadius = '8px';
        monthHeader.style.cursor = 'pointer';
        monthHeader.style.fontWeight = 'bold';
        monthHeader.style.fontSize = '1.1em';
        monthHeader.innerHTML = `
            <span>${monthYear}</span>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="month-expand-icon">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        `;

        const daysContainer = document.createElement('div');
        daysContainer.style.display = 'none'; 
        daysContainer.style.paddingTop = '12px';

        let monthHasVisibleDays = false;

        groupedByMonth[monthYear].forEach(date => {
            let hasContent = false;
            let reportHtml = '';
            
            // Gather all category keys: from the schedule record itself (snapshot) + library
            const historyCatKeys = new Set([
                ...Object.keys(plan.schedule[date]).filter(k => k !== 'extraSnacks'),
                ...Object.keys(plan.categories)
            ]);
            const sortedHistoryCats = [...historyCatKeys].sort((a, b) => {
                const ai = MEAL_ORDER.indexOf(a);
                const bi = MEAL_ORDER.indexOf(b);
                if (ai !== -1 && bi !== -1) return ai - bi;
                if (ai !== -1) return -1;
                if (bi !== -1) return 1;
                return a.localeCompare(b);
            });
            sortedHistoryCats.forEach(cat => {
                const sel = plan.schedule[date][cat];
                if (!sel) return;
                const selId = typeof sel === 'object' ? sel.id : sel;
                const isDone = typeof sel === 'object' && sel.done ? true : false;
                const photoUrl = typeof sel === 'object' && sel.photoUrl ? sel.photoUrl : null;

                // --- SNAPSHOT PRIORITY: use text/ingredients stored in the record ---
                const displayText = (typeof sel === 'object' && sel.text) ? sel.text
                    : (() => { const v = plan.categories[cat] && plan.categories[cat].find(v => v.id === selId); return v ? v.text : null; })();
                const displayIngredients = (typeof sel === 'object' && sel.ingredients && sel.ingredients.length > 0) ? sel.ingredients
                    : (() => { const v = plan.categories[cat] && plan.categories[cat].find(v => v.id === selId); return v ? (v.ingredients || []) : []; })();

                if (selId && displayText) {
                    hasContent = true;
                    const completionTime = (typeof sel === 'object' && sel.completionTime) ? sel.completionTime : null;
                    const timeLabel = isDone && completionTime ? ` <span style="color: var(--primary-blue); font-size: 0.85em; font-weight: 600;">[${completionTime}]</span>` : '';
                    const doneText = isDone
                        ? `✅ <span style="color: #28a745;">Done</span>${timeLabel}`
                        : '❌ <span style="color: #dc3545;">Missed</span>';
                    let imgHtml = photoUrl ? `<img src="${photoUrl}" loading="lazy" style="width: 100%; border-radius: 12px; margin-top: 8px; border: 1px solid var(--gray-light);" />` : '';
                    
                    let ingredientsHtml = '';
                    if (displayIngredients && displayIngredients.length > 0) {
                        const ingList = displayIngredients.map(ing => `• ${ing.n} ${ing.a}${ing.u}`).join(', ');
                        ingredientsHtml = `<div style="font-size: 0.85em; color: var(--gray); margin-top: 4px; line-height: 1.4;">${ingList}</div>`;
                    }

                    reportHtml += `
                        <div style="margin-bottom: 16px;">
                            <strong>${cat}:</strong> ${displayText}
                            ${ingredientsHtml}
                            <div style="font-size: 0.9em; font-weight: 600; margin-top: 4px;">${doneText}</div>
                            ${imgHtml}
                        </div>
                    `;
                }
            });

            // incorporate Extra Snacks
            const snacks = plan.schedule[date].extraSnacks;
            if (snacks && snacks.length > 0) {
                hasContent = true;
                let listHtml = snacks.map(s => {
                    const timeLabel = s.time ? ` <span style="color: var(--primary-blue); font-size: 0.85em; font-weight: 600;">[${s.time}]</span>` : '';
                    return `• ${s.name} (${s.amount})${timeLabel}`;
                }).join('<br/>');
                
                reportHtml += `
                    <div style="margin-bottom: 16px;">
                        <strong style="color: var(--primary-blue);">Personal Snacks:</strong>
                        <div style="font-size: 0.9em; margin-top: 4px; line-height: 1.4;">${listHtml}</div>
                    </div>
                `;
            }

            if (!hasContent) {
                reportHtml = '<p style="color: var(--gray); font-style: italic; margin-bottom: 0;">Empty day - No meals planned or logged</p>';
            }

            monthHasVisibleDays = true;
            renderedAny = true;

            const [y, m, d] = date.split('-');
            const dateObj = new Date(y, m - 1, d);
            const dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });

            const dateBlock = document.createElement('div');
            dateBlock.className = 'card';
            dateBlock.style.marginBottom = '12px';
            
            dateBlock.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--gray-light); padding-bottom: 8px; margin-bottom: 12px; cursor: pointer;">
                    <h3 style="margin: 0; font-size: 1.05rem;">${dateString}</h3>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="day-expand-icon">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="history-details" style="display: none;">
                    ${reportHtml}
                </div>
            `;

            const detailsContainer = dateBlock.querySelector('.history-details');
            const dayExpandIcon = dateBlock.querySelector('.day-expand-icon');

            dateBlock.querySelector('div').addEventListener('click', () => {
                if (detailsContainer.style.display === 'none') {
                    detailsContainer.style.display = 'block';
                    dayExpandIcon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
                } else {
                    detailsContainer.style.display = 'none';
                    dayExpandIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
                }
            });

            daysContainer.appendChild(dateBlock);
        });

        if (monthHasVisibleDays) {
            monthHeader.addEventListener('click', () => {
                if (daysContainer.style.display === 'none') {
                    daysContainer.style.display = 'block';
                    monthHeader.querySelector('.month-expand-icon').innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
                } else {
                    daysContainer.style.display = 'none';
                    monthHeader.querySelector('.month-expand-icon').innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
                }
            });
            
            monthGroup.appendChild(monthHeader);
            monthGroup.appendChild(daysContainer);
            historyList.appendChild(monthGroup);
        }
    });

    if (!renderedAny) {
        historyList.innerHTML = '<p>No history available.</p>';
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

// Photo Viewer (Lightbox) Logic
function setupLightbox() {
    let currentScale = 1.0;
    let currentTranslateX = 0;
    let currentTranslateY = 0;
    let lastScale = 1.0;
    let touchStartX = 0;
    let touchStartY = 0;
    let isPanning = false;
    let initialPinchDistance = null;

    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;

    function updateImgTransform() {
        lightboxImg.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${currentScale})`;
    }

    // Delegation for opening images
    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && e.target.id !== 'lightbox-img' && !e.target.classList.contains('ignore-lightbox')) {
            lightboxImg.src = e.target.src;
            lightbox.style.display = 'flex';
            
            // reset transforms
            currentScale = 1.0;
            currentTranslateX = 0;
            currentTranslateY = 0;
            lastScale = 1.0;
            updateImgTransform();
        }
    });

    document.getElementById('close-lightbox-btn')?.addEventListener('click', () => {
        lightbox.style.display = 'none';
        isPanning = false;
    });

    lightbox.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialPinchDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        } else if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isPanning = true;
        }
    });

    lightbox.addEventListener('touchmove', (e) => {
        if (!isPanning && e.touches.length !== 2) return;
        e.preventDefault(); 

        if (e.touches.length === 2 && initialPinchDistance) {
            const distance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const delta = distance / initialPinchDistance;
            currentScale = Math.min(Math.max(1, lastScale * delta), 3);
            updateImgTransform();
        } else if (e.touches.length === 1 && isPanning) {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            const dx = touchX - touchStartX;
            const dy = touchY - touchStartY;
            
            if (currentScale > 1) {
                currentTranslateX += dx;
                currentTranslateY += dy;
                touchStartX = touchX;
                touchStartY = touchY;
                updateImgTransform();
            } else {
                if (dy > 50 && Math.abs(dy) > Math.abs(dx)) {
                    lightbox.style.display = 'none';
                    isPanning = false;
                }
            }
        }
    }, { passive: false });

    lightbox.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) {
            initialPinchDistance = null;
            lastScale = currentScale;
        }
        if (e.touches.length === 0) {
            isPanning = false;
        }
    });
}

// Start sequence
init();
