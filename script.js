const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
const baseNumPoints = 65;
const numLinesPerPoint = 3;
const maxDistance = 120;
const lineColor = 'rgba(255, 255, 255, 0.3)';
const cursorRadius = 50; 

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }
    }
}

function init() {
    points = [];
    const area = canvas.width * canvas.height;
    const densityFactor = area / (1920 * 1080);
    const numPoints = Math.max(10, Math.floor(baseNumPoints * densityFactor));
    
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        points.push(new Point(x, y));
    }
}

function connectPoints() {
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const distance = Math.sqrt((points[i].x - points[j].x) ** 2 + (points[i].y - points[j].y) ** 2);
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.strokeStyle = lineColor;
                    ctx.stroke();
                }
            }
        }
    }
}

function connectPointsWithCursor() {
    points.forEach(point => {
        const distance = Math.sqrt((point.x - cursorX) ** 2 + (point.y - cursorY) ** 2);
        if (distance < maxDistance) {
            for (let i = 0; i < numLinesPerPoint; i++) {
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(cursorX, cursorY);
                ctx.strokeStyle = lineColor;
                ctx.stroke();
            }
        }
    });
}

let cursorX = canvas.width / 2;
let cursorY = canvas.height / 2;

canvas.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    connectPoints();
    connectPointsWithCursor();
    points.forEach(point => {
        point.update();
        point.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
