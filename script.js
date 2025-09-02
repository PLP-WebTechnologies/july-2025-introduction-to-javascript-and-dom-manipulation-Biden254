const usernameInput = document.getElementById("username");
const budgetInput = document.getElementById("budget");
const welcomeMessage = document.getElementById("welcomeMessage");
const budgetStatus = document.getElementById("budgetStatus");

let username = "";
let budget = 0;
let shoppingList = [];

// Capture user input & display welcome message
document.getElementById("saveUserBtn").addEventListener("click", () => {
    username = usernameInput.value.trim();
    budget = parseFloat(budgetInput.value);

    if (!username || isNaN(budget) || budget <= 0) {
        welcomeMessage.textContent = "⚠️ Please enter valid details.";
        return;
    }

    welcomeMessage.textContent = `👋 Welcome, ${username}! Your budget is $${budget}.`;
});

// Function to calculate total cost
function calculateTotal() {
    let total = 0;
    shoppingList.forEach(item => total += item.price);
    return total;
}

// Function to update the budget status
function updateBudgetStatus() {
    const total = calculateTotal();
    if (total > budget) {
        budgetStatus.textContent = `⚠️ Over Budget! You've spent $${total}.`;
        budgetStatus.style.color = "red";
    } else {
        budgetStatus.textContent = `✅ Within Budget! You've spent $${total} out of $${budget}.`;
        budgetStatus.style.color = "green";
    }
}

const shoppingListElement = document.getElementById("shoppingList");
const totalCostElement = document.getElementById("totalCost");

// Add item to shopping list
document.getElementById("addItemBtn").addEventListener("click", () => {
    const name = document.getElementById("itemName").value.trim();
    const price = parseFloat(document.getElementById("itemPrice").value);

    if (!name || isNaN(price) || price <= 0) {
        alert("⚠️ Please enter valid item details.");
        return;
    }

    shoppingList.push({ name, price });
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";

    renderShoppingList();
});

// Render shopping list dynamically using a loop
function renderShoppingList() {
    shoppingListElement.innerHTML = "";
    shoppingList.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${item.name} - $${item.price}`;
        shoppingListElement.appendChild(li);
    });

    totalCostElement.textContent = `Total Cost: $${calculateTotal()}`;
    updateBudgetStatus();
}

document.getElementById("clearListBtn").addEventListener("click", () => {
    shoppingList = [];
    renderShoppingList();
});

document.getElementById("toggleThemeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
