
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PART 1: Matter.js Setup ---
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Events = Matter.Events;

    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = 0; // Zero Gravity (Space Mode)

    // Create renderer
    const render = Render.create({
        element: document.getElementById('physics-world'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: 1, // Standard for performance
            background: 'transparent',
            wireframes: false
        }
    });

    // --- PART 2: Create Interactive Bodies ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Borders (Invisible walls so objects don't fly away)
    const walls = [
        Bodies.rectangle(width/2, -50, width, 100, { isStatic: true }), // Top
        Bodies.rectangle(width/2, height+50, width, 100, { isStatic: true }), // Bottom
        Bodies.rectangle(width+50, height/2, 100, height, { isStatic: true }), // Right
        Bodies.rectangle(-50, height/2, 100, height, { isStatic: true }) // Left
    ];
    Composite.add(engine.world, walls);

    // The Floating Shapes (Representing Data/Logic)
    const shapes = [];
    const colors = ['#FBBF24', '#38BDF8', '#F472B6', '#A3E635']; // Gold, Blue, Pink, Green
    
    for (let i = 0; i < 12; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 30 + 20;
        
        let body;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Randomly choose Circle or Polygon (Hexagon)
        if (Math.random() > 0.5) {
            body = Bodies.circle(x, y, size, {
                restitution: 0.9, // Bounciness
                frictionAir: 0.02, // Floating resistance
                render: { fillStyle: color, opacity: 0.8 }
            });
        } else {
            body = Bodies.polygon(x, y, 6, size + 10, {
                restitution: 0.9,
                frictionAir: 0.02,
                render: { fillStyle: 'transparent', strokeStyle: color, lineWidth: 2 }
            });
        }
        shapes.push(body);
    }
    Composite.add(engine.world, shapes);

    // --- PART 3: Interaction (Mouse Grabbing) ---
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with scrolling (if any)
    render.mouse = mouse;

    // Run the engine
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle Resize
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
    });
    
    // --- PART 4: Feather Icons ---
    if(typeof feather !== 'undefined') feather.replace();
});
