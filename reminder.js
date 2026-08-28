// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}


// Close mobile menu after clicking a link

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });

});


// =========================
// REMINDER
// =========================

const reminderCards = document.querySelectorAll(".reminder-card");
const reminderModal = document.getElementById("reminderModal");
const reminderClose = document.getElementById("reminderClose");
const reminderForm = document.getElementById("reminderForm");

const modalTitle = document.getElementById("modalTitle");
const savedReminders = document.getElementById("savedReminders");
const timeField = document.getElementById("timeField");

let selectedType = "";


// Open reminder form

reminderCards.forEach(function (card) {

    const button = card.querySelector(".reminder-btn");

    button.addEventListener("click", function () {

        selectedType = card.getAttribute("data-type");

        if (selectedType === "vaccination") {
            modalTitle.textContent = "Add Vaccination 💉";
            timeField.style.display = "none";
        }

        else if (selectedType === "medicine") {
            modalTitle.textContent = "Add Medicine 💊";
            timeField.style.display = "block";
        }

        else if (selectedType === "food") {
            modalTitle.textContent = "Add Food Schedule 🍖";
            timeField.style.display = "block";
        }

        reminderModal.style.display = "flex";
    });

});


// =========================
// CLOSE MODAL
// =========================

reminderClose.addEventListener("click", function () {

    reminderModal.style.display = "none";

});


reminderModal.addEventListener("click", function (event) {

    if (event.target === reminderModal) {
        reminderModal.style.display = "none";
    }

});


// =========================
// SAVE REMINDER
// =========================

reminderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const petName = document.getElementById("petName").value.trim();
    const reminderName = document.getElementById("reminderName").value.trim();
    const reminderDate = document.getElementById("reminderDate").value;
    const reminderTime = document.getElementById("reminderTime").value;


    const reminder = {
        id: Date.now(),
        type: selectedType,
        petName: petName,
        name: reminderName,
        date: reminderDate,
        time: reminderTime
    };


    let reminders =
        JSON.parse(localStorage.getItem("petReminders")) || [];


    reminders.push(reminder);


    localStorage.setItem(
        "petReminders",
        JSON.stringify(reminders)
    );


    reminderForm.reset();

    reminderModal.style.display = "none";

    displayReminders();

    alert("Reminder saved successfully! 🐾");

});


// =========================
// DISPLAY REMINDERS
// =========================

function displayReminders() {

    let reminders =
        JSON.parse(localStorage.getItem("petReminders")) || [];


    savedReminders.innerHTML = "";


    if (reminders.length === 0) {
        return;
    }


    const heading = document.createElement("h3");

    heading.textContent = "Your Reminders";

    savedReminders.appendChild(heading);


    reminders.forEach(function (reminder) {

        let icon = "🔔";


        if (reminder.type === "vaccination") {
            icon = "💉";
        }

        else if (reminder.type === "medicine") {
            icon = "💊";
        }

        else if (reminder.type === "food") {
            icon = "🍖";
        }


        const reminderBox = document.createElement("div");

        reminderBox.className = "saved-reminder";


        reminderBox.innerHTML = `
            <h4>${icon} ${reminder.name}</h4>

            <p>
                Pet: ${reminder.petName}<br>
                Date: ${reminder.date}
                ${reminder.time ? `<br>Time: ${reminder.time}` : ""}
            </p>

            <button
                class="delete-reminder"
                onclick="deleteReminder(${reminder.id})">
                Delete
            </button>
        `;


        savedReminders.appendChild(reminderBox);

    });

}


// =========================
// DELETE REMINDER
// =========================

function deleteReminder(id) {

    let reminders =
        JSON.parse(localStorage.getItem("petReminders")) || [];


    reminders = reminders.filter(function (reminder) {

        return reminder.id !== id;

    });


    localStorage.setItem(
        "petReminders",
        JSON.stringify(reminders)
    );


    displayReminders();

}


// =========================
// LOAD SAVED REMINDERS
// =========================

displayReminders();