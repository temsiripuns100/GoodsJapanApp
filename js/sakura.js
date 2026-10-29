/**
 * Goods Japan - Falling Sakura Petals Canvas Animation
 */

class SakuraEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'sakura-canvas';
        document.body.prepend(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.petals = [];
        this.maxPetals = 22; // subtle, not distracting

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.maxPetals; i++) {
            this.petals.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 8 + 6,
                speedX: Math.random() * 1.5 - 0.5,
                speedY: Math.random() * 1.2 + 0.8,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 2 - 1,
                opacity: Math.random() * 0.4 + 0.3
            });
        }
    }

    drawPetal(x, y, size, rotation, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate((rotation * Math.PI) / 180);
        this.ctx.fillStyle = `rgba(255, 183, 197, ${opacity})`;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
        this.ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
        this.ctx.fill();
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let petal of this.petals) {
            petal.x += petal.speedX;
            petal.y += petal.speedY;
            petal.rotation += petal.rotationSpeed;

            if (petal.y > this.height) {
                petal.y = -10;
                petal.x = Math.random() * this.width;
            }
            if (petal.x > this.width) {
                petal.x = -10;
            } else if (petal.x < -10) {
                petal.x = this.width;
            }

            this.drawPetal(petal.x, petal.y, petal.size, petal.rotation, petal.opacity);
        }

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Only run if canvas supported
    if (window.HTMLCanvasElement) {
        new SakuraEffect();
    }
});
