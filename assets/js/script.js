document.getElementById('start-countdown').addEventListener('click', function () {
    const dateInput = document.getElementById('fixture-date').value;
    if (dateInput) {
        const nextFixtureDate = new Date(dateInput).getTime();
        startCountdown(nextFixtureDate);
    }
});

document.getElementById('reset-countdown').addEventListener('click', function () {
    resetCountdown();
});

function startCountdown(fixtureDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = fixtureDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days >= 0 ? days : '0';
        document.getElementById('hours').innerText = hours >= 0 ? hours : '0';
        document.getElementById('minutes').innerText = minutes >= 0 ? minutes : '0';
        document.getElementById('seconds').innerText = seconds >= 0 ? seconds : '0';

        if (timeRemaining < 0) {
            clearInterval(window.countdownInterval);
            document.querySelector('.countdown').innerHTML = `<p>Match has Started!</p>`;
            document.getElementById('reset-countdown').style.display = 'block';
        }
    }

    // Clear any existing intervals before starting a new one
    clearInterval(window.countdownInterval);

    // Update countdown every second
    window.countdownInterval = setInterval(updateCountdown, 1000);

    // Initialize countdown
    updateCountdown();
}

function resetCountdown() {
    document.querySelector('.countdown').innerHTML = `
        <article class="time">
            <span id="days">0</span>
            <span class="label">Days</span>
        </article>
        <article class="time">
            <span id="hours">0</span>
            <span class="label">Hours</span>
        </article>
        <article class="time">
            <span id="minutes">0</span>
            <span class="label">Minutes</span>
        </article>
        <article class="time">
            <span id="seconds">0</span>
            <span class="label">Seconds</span>
        </article>
    `;
    document.getElementById('reset-countdown').style.display = 'none';
}