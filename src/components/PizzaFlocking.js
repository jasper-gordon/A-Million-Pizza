import React, { useEffect, useRef } from 'react';

class PizzaSlice {
  constructor(x, y, canvas) {
    this.position = { x, y };
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    };
    this.maxSpeed = 2;
    this.size = 20;
    this.canvas = canvas;
    this.isMerged = false;
    this.mergeProgress = 0;
  }

  // Update position based on velocity
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Wrap around screen edges
    if (this.position.x < 0) this.position.x = this.canvas.width;
    if (this.position.x > this.canvas.width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = this.canvas.height;
    if (this.position.y > this.canvas.height) this.position.y = 0;
  }

  // Apply flocking behavior
  flock(pizzaSlices) {
    let separation = { x: 0, y: 0 };
    let alignment = { x: 0, y: 0 };
    let cohesion = { x: 0, y: 0 };
    let neighborCount = 0;
    let closeNeighbors = 0;

    pizzaSlices.forEach(slice => {
      const distance = Math.hypot(
        slice.position.x - this.position.x,
        slice.position.y - this.position.y
      );

      if (slice !== this && distance < 50) {
        // Count very close neighbors for merging behavior
        if (distance < 30) closeNeighbors++;

        // Separation
        const pushFactor = (50 - distance) / 50;
        separation.x += (this.position.x - slice.position.x) * pushFactor;
        separation.y += (this.position.y - slice.position.y) * pushFactor;

        // Alignment
        alignment.x += slice.velocity.x;
        alignment.y += slice.velocity.y;

        // Cohesion
        cohesion.x += slice.position.x;
        cohesion.y += slice.position.y;

        neighborCount++;
      }
    });

    // Handle merging behavior
    if (closeNeighbors >= 7 && !this.isMerged) {
      this.mergeProgress = Math.min(1, this.mergeProgress + 0.02);
    } else {
      this.mergeProgress = Math.max(0, this.mergeProgress - 0.02);
    }

    this.isMerged = this.mergeProgress > 0.9;

    if (neighborCount > 0) {
      // Average and apply forces
      alignment.x /= neighborCount;
      alignment.y /= neighborCount;
      cohesion.x = cohesion.x / neighborCount - this.position.x;
      cohesion.y = cohesion.y / neighborCount - this.position.y;

      // Update velocity based on flocking behaviors
      this.velocity.x += (separation.x * 0.05 + alignment.x * 0.05 + cohesion.x * 0.05);
      this.velocity.y += (separation.y * 0.05 + alignment.y * 0.05 + cohesion.y * 0.05);

      // Limit speed
      const speed = Math.hypot(this.velocity.x, this.velocity.y);
      if (speed > this.maxSpeed) {
        this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
        this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
      }
    }
  }

  // Draw pizza slice
  draw(ctx) {
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle);

    // Draw individual pizza slice
    ctx.beginPath();
    ctx.moveTo(this.size, 0);
    ctx.lineTo(-this.size/3, this.size * 0.7);
    ctx.lineTo(-this.size/3, -this.size * 0.7);
    ctx.closePath();

    // Fill with pizza color
    ctx.fillStyle = '#F6BC65';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add crust - now as a straight line
    ctx.beginPath();
    ctx.moveTo(-this.size/3, this.size * 0.7);
    ctx.lineTo(-this.size/3, -this.size * 0.7);
    ctx.strokeStyle = '#8B4513'; // Darker brown for crust
    ctx.lineWidth = 7.5; // Increased from 3 to 7.5
    ctx.stroke();

    // Add pepperoni
    ctx.beginPath();
    ctx.arc(this.size/3, 0, this.size/4, 0, Math.PI * 2);
    ctx.fillStyle = '#81171B';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

const PizzaFlocking = () => {
  const canvasRef = useRef(null);
  const pizzaSlicesRef = useRef([]);
  const animationFrameRef = useRef();
  const lastFrameTimeRef = useRef(0);
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  // Function to scatter pizza slices
  const scatterSlices = () => {
    pizzaSlicesRef.current.forEach(slice => {
      slice.position.x = Math.random() * canvasRef.current.width;
      slice.position.y = Math.random() * canvasRef.current.height;
      // Give them random velocities
      slice.velocity.x = (Math.random() - 0.5) * 4;
      slice.velocity.y = (Math.random() - 0.5) * 4;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 60; // Adjust for navbar
    };

    // Initialize pizza slices
    const initPizzaSlices = () => {
      pizzaSlicesRef.current = Array(30).fill().map(() => 
        new PizzaSlice(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          canvas
        )
      );
    };

    // Animation loop with frame rate limiting
    const animate = (currentTime) => {
      const elapsed = currentTime - lastFrameTimeRef.current;

      if (elapsed > frameInterval) {
        lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pizzaSlicesRef.current.forEach(slice => {
          slice.flock(pizzaSlicesRef.current);
          slice.update();
          slice.draw(ctx);
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle space bar press
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scroll
        scatterSlices();
      }
    };

    // Setup
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('keydown', handleKeyPress);
    initPizzaSlices();
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('keydown', handleKeyPress);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        backgroundColor: '#F6BC65',
        display: 'block'
      }}
    />
  );
};

export default PizzaFlocking; 