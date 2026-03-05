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
        name: "Weight Loss (Диета похудение)",
    }
];

// Core categories for inside a plan
const STANDARD_CATEGORIES = ["Breakfast", "Lunch", "Dinner 1", "Dinner 2"];

// App State Management
let plans = [];
let currentPlanId = null;

// DOM Element References
const planListEl = document.getElementById('plan-list');
const mainScreen = document.getElementById('main-screen');
const planScreen = document.getElementById('plan-screen');
const planTitleEl = document.getElementById('plan-title');
const categoriesContainer = document.getElementById('categories-container');

// Buttons / Layout elements
const backBtn = document.getElementById('back-btn');
const addPlanBtn = document.getElementById('add-plan-btn');
const addPlanModal = document.getElementById('add-plan-modal');
const newPlanNameInput = document.getElementById('new-plan-name');
const cancelPlanBtn = document.getElementById('cancel-plan-btn');
const savePlanBtn = document.getElementById('save-plan-btn');

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
    const plan = plans.find(p => p.id === id);
    if (!plan) return;

    planTitleEl.textContent = plan.name;
    categoriesContainer.innerHTML = '';

    // Render Categories
    STANDARD_CATEGORIES.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.className = 'category-card';
        catCard.setAttribute('data-type', cat);
        
        catCard.innerHTML = `
            <h3>${cat}</h3>
            <div class="food-stickers">
                <div class="sticker placeholder">+ Add Food</div>
                <!-- Future implementations can dynamically render actual food stickers here -->
                <div class="sticker">Example Item</div>
            </div>
        `;
        categoriesContainer.appendChild(catCard);
    });

    navigateTo('plan-screen');
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
}

// Start sequence
init();
