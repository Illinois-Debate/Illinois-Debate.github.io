document.addEventListener("DOMContentLoaded", function () {
  const calendarMonthYear = document.getElementById("calendar-month-year");
  const calendarDays = document.getElementById("calendar-days");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const eventsList = document.getElementById("events-list");
  const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");

  let currentDate = new Date();

  // Array of events with date and title
  const events = [
    { date: "2024-07-15", title: "Debate Tournament" },
    { date: "2024-07-22", title: "Workshop" },
    { date: "2024-08-01", title: "Seminar" },
  ];

  // Function to format dates as "Month Day, Year"
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  // Function to render the calendar
  function renderCalendar(date) {
    // Clear the calendar and events list
    calendarDays.innerHTML = "";
    eventsList.innerHTML = "";

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Update the header with the current month and year
    calendarMonthYear.innerText = `${date.toLocaleString("default", {
      month: "long",
    })} ${currentYear}`;

    // Render the previous month's days
    for (let i = firstDayOfMonth; i > 0; i--) {
      const day = document.createElement("div");
      day.classList.add("calendar-date");
      day.textContent = lastDayOfPrevMonth - i + 1;
      calendarDays.appendChild(day);
    }

    // Render the current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const day = document.createElement("div");
      day.classList.add("calendar-date");
      day.textContent = i;
      const eventDate = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(i).padStart(2, "0")}`;
      const event = events.find((event) => event.date === eventDate);
      if (event) {
        day.classList.add("has-event");
        const eventTitle = document.createElement("div");
        eventTitle.classList.add("event-title");
        eventTitle.textContent = event.title;
        day.appendChild(eventTitle);

        // Add event to the events list
        const eventListItem = document.createElement("li");
        eventListItem.textContent = `${event.title} - ${formatDate(
          event.date
        )}`;
        eventsList.appendChild(eventListItem);
      }
      calendarDays.appendChild(day);
    }

    // Render the next month's days
    const nextDays = 42 - firstDayOfMonth - lastDateOfMonth;
    for (let i = 1; i <= nextDays; i++) {
      const day = document.createElement("div");
      day.classList.add("calendar-date");
      day.textContent = i;
      calendarDays.appendChild(day);
    }
  }

  // Event listeners for navigation buttons
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Event listener for dark mode toggle
  toggleDarkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Initial render of the calendar
  renderCalendar(currentDate);
});
