document.addEventListener('DOMContentLoaded', function() {
    const gameLinks = document.querySelectorAll('.game-link');

    gameLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            const gameUrl = this.getAttribute('href');
            const gameName = this.textContent;

            if (confirm(`Do you want to play ${gameName}?`)) {
                window.location.href = gameUrl; // Redirect to the game URL
            }
        });
    });
});
