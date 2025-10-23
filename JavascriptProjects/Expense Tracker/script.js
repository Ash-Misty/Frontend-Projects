// Function to get current month key (like "2025-09")

function getCurrentMonth() {
  // Create a new Date object for the current date and time
  const now = new Date();

  // Convert the date to an  string format: "2025-09-14T16:23:45.678Z"
  const isoString = now.toISOString();

  // Take only the first 7 characters to get "YYYY-MM"-"2025-09"
  const monthKey = isoString.slice(0, 7);

  // Return the month key
  return monthKey;
}

// Function to add income

function addIncome() {
  // Get the value from the input with id "incomeAmount" and convert it to a number
  // parseFloat converts string to decimal number, || 0 means if empty or invalid use 0
  const amount = parseFloat(document.getElementById("incomeAmount").value) || 0;

  // Get the current month key using the function above
  const currentMonth = getCurrentMonth();

  // Retrieve previously saved income data from localStorage
  // JSON.parse converts stored string back to JavaScript object
  // ||  if nothing is stored yet, start with empty object
  let incomeData = JSON.parse(localStorage.getItem("incomeData")) || {};

  // Check if income is already saved for this month
  if (incomeData[currentMonth]) {
    // Show an alert if income is already saved
    alert("Income already saved for this month. You can't re-enter.");

    // Redirect to home page after 100 milliseconds
    setTimeout(() => {
      window.location.href = "index.html";
    }, 100);

    return;
  }

  // Check if entered amount is valid (> 0)
  if (amount > 0) {
    // Save the income in the object using the current month as key
    incomeData[currentMonth] = amount;

    // Convert object to JSON string and store it in localStorage
    localStorage.setItem("incomeData", JSON.stringify(incomeData));

    // Show a success alert message
    alert("Income saved successfully ");

    // Redirect to home page after 100 milliseconds
    setTimeout(() => {
      window.location.href = "index.html";
    }, 100);
  } else {
    // If amount is invalid, show inline message in the page (not alert)
    document.getElementById("message").innerText = "Please enter a valid income.";
  }
}


// Function to add an expense

function addExpense() {
  // Get the expense name from input and remove extra spaces
  const name = document.getElementById("expenseName").value.trim();

  // Get the expense amount and convert to number
  const amount = parseFloat(document.getElementById("expenseAmount").value) || 0;

  // Get the current month key
  const currentMonth = getCurrentMonth();

  // Check if either name is empty or amount is invalid
  if (!name || amount <= 0) {
    // Show inline error message
    document.getElementById("message").innerText = "Please enter valid expense details.";
    return; // Stop function
  }

  // Retrieve previously saved expense data
  let expenseData = JSON.parse(localStorage.getItem("expenseData")) || {};

  // If no data exists for this month, create an empty array
  if (!expenseData[currentMonth]) expenseData[currentMonth] = [];

  // Add new expense as an object {name, amount} to the month's array
  expenseData[currentMonth].push({ name, amount });

  // Save updated data to localStorage as a JSON string
  localStorage.setItem("expenseData", JSON.stringify(expenseData));

  // Show success alert message
  alert("Expense  saved successfully!");

  // Redirect to home page after 100 milliseconds
  setTimeout(() => {
    window.location.href = "index.html";
  }, 100);
}

// Function to display balance and expenses
function displayBalance() {
  // Get current month key
  const currentMonth = getCurrentMonth();

  // Get saved income data
  const incomeData = JSON.parse(localStorage.getItem("incomeData")) || {};

  // Get saved expense data
  const expenseData = JSON.parse(localStorage.getItem("expenseData")) || {};

  // Get income for the current month, default 0
  const income = parseFloat(incomeData[currentMonth]) || 0;

  // Get expenses array for current month, default empty array
  const expenses = expenseData[currentMonth] || [];

  // Calculate total expenses by summing all amounts
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Calculate balance
  const balance = income - totalExpenses;

  // Update HTML elements with income, expenses, balance
  document.getElementById("incomeBox").innerText = `Income: ₹${income}`;
  document.getElementById("expenseBox").innerText = `Expenses: ₹${totalExpenses}`;
  document.getElementById("balanceBox").innerText = `Balance: ₹${balance}`;

  // Select container for individual expense cards
  const list = document.getElementById("expenseList");

  // Clear any previous expense cards
  list.innerHTML = "";

  // Loop through expenses and create a card for each
  expenses.forEach(e => {
    const div = document.createElement("div"); // Create a div element
    div.className = "expense-card"; // Assign CSS class for styling
    div.innerHTML = `<span>${e.name}</span> ₹${e.amount}`; // Fill content
    list.appendChild(div); // Add card to container
  });
}

// Run displayBalance when page loads
window.addEventListener("DOMContentLoaded", displayBalance);
