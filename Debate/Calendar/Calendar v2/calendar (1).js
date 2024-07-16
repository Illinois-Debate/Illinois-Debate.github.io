document.addEventListener('DOMContentLoaded', function() {
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarDays = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const eventsList = document.getElementById('events-list');

    let currentDate = new Date();

    const events = [
        { date: '2024-07-15', title: 'Debate Tournament' },
        { date: '2024-07-22', title: 'Workshop' },
        { date: '2024-08-01', title: 'Seminar' }
    ];

    function renderCalendar(date) {
        calendarDays.innerHTML = '';
        eventsList.innerHTML = '';
        
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        
        calendarMonthYear.innerText = `${date.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        for (let i = firstDayOfMonth; i > 0; i--) {
            const day = document.createElement('div');
            day.classList.add('calendar-date');
            day.textContent = lastDayOfPrevMonth - i + 1;
            calendarDays.appendChild(day);
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('calendar-date');
            day.textContent = i;
            const eventDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const event = events.find(event => event.date === eventDate);
            if (event) {
                day.classList.add('has-event');
                const eventTitle = document.createElement('div');
                eventTitle.classList.add('event-title');
                eventTitle.textContent = event.title;
                day.appendChild(eventTitle);
                
                // Add event to the events list
                const eventListItem = document.createElement('li');
                eventListItem.textContent = `${event.title} - ${event.date}`;
                eventsList.appendChild(eventListItem);
            }
            calendarDays.appendChild(day);
        }

        const nextDays = 42 - firstDayOfMonth - lastDateOfMonth;
        for (let i = 1; i <= nextDays; i++) {
            const day = document.createElement('div');
            day.classList.add('calendar-date');
            day.textContent = i;
            calendarDays.appendChild(day);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
