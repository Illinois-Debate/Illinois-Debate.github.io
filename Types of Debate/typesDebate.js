const debateSections = document.querySelectorAll('.debate-type');

debateSections.forEach(section => {
    section.addEventListener('click', () => {
        const content = section.querySelector('.content');
        const isOpen = content.style.display === 'block';
        document.querySelectorAll('.content').forEach(c => c.style.display = 'none');
        content.style.display = isOpen ? 'none' : 'block';
    });
});
