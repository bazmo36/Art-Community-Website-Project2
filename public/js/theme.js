document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.className = savedTheme;

  toggleBtn.addEventListener('click', () => {
    const newTheme = body.classList.contains('light') ? 'dark' : 'light';
    body.className = newTheme;

    // Save theme preference
    localStorage.setItem('theme', newTheme);

    // Change button icon
    toggleBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
  });
});
