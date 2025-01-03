const countdown = () => {
    const countDate = new Date('Jan 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;

    if (gap <= 0) {
        clearInterval(timerInterval);
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }

    const textHour = Math.floor(gap / hour);
    const textMinute = String(Math.floor((gap % hour) / minute)).padStart(2, '0');
    const textSecond = String(Math.floor((gap % minute) / second)).padStart(2, '0');

    document.getElementById('hours').innerText = textHour;
    document.getElementById('minutes').innerText = textMinute;
    document.getElementById('seconds').innerText = textSecond;
};

const timerInterval = setInterval(countdown, 1000);