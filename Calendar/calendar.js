document.addEventListener("DOMContentLoaded", function () {
  const calendarMonthYear = document.getElementById("calendar-month-year");
  const calendarDays = document.getElementById("calendar-days");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const eventsList = document.getElementById("events-list");

  let currentDate = new Date();

  // Array of events with date and title
  const events = [
    { date: "2024-09-21", title: "ICDA 1: Grayslake North" },
    { date: "2024-10-19", title: "ICDA 2: Wheeling" },
    { date: "2024-11-09", title: "ICDA 3: Conant" },
    { date: "2024-12-07", title: "ICDA 4: Lyons" },
    { date: "2025-1-18", title: "ICDA 5: Highland Park" },
    { date: "2025-2-22", title: "ICDA Championship: Harper" },
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

  // Initial render of the calendar
  renderCalendar(currentDate);
});
