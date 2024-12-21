const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseDate = document.getElementById('expense-date');
const expenseList = document.getElementById('expense-list');
const totalExpense = document.getElementById('total-expense');

// Load expenses from localStorage if available
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const date = expenseDate.value;

    if (!name || isNaN(amount) || !date) return;

    // Create expense object
    const expense = { name, amount, date };
    expenses.push(expense);

    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Update UI
    displayExpenses();
    updateTotalExpense();

    // Clear form
    expenseName.value = '';
    expenseAmount.value = '';
    expenseDate.value = '';
});

// Load expenses and display them
window.addEventListener('load', () => {
    displayExpenses();
    updateTotalExpense();
});

function displayExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name} - Pk${expense.amount.toFixed(2)} on ${expense.date}</span>
            <button class="delete" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

function updateTotalExpense() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpense.textContent = total.toFixed(2);
}

function deleteExpense(index) {
    expenses.splice(index, 1); // Remove the expense from the array
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Update localStorage
    displayExpenses(); // Re-display the updated list
    updateTotalExpense(); // Update the total expense
}
