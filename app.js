document
    const toggleSwitch = document.querySelector('#toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            document.body.classList.add('dark-mode');
            document.querySelectorAll('section').forEach(section => section.classList.add('dark-mode'));
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.querySelectorAll('section').forEach(section => section.classList.remove('dark-mode'));
            localStorage.setItem('theme', 'light-mode');
        }
    });
