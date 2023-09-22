export class Game {
  public svg!: SVGSVGElement;
  // private lastFrameTime!: number;
  private keys: { [key: string]: boolean } = {};

  private toggleElement = (element: string, state: boolean) => {
    const el = this.svg.querySelector(element);
    if (el) {
      if (state) {
        el.classList.add("show");
      } else {
        el.classList.remove("show");
      }
    }
  };

  init(): void {
    window.addEventListener("keydown", (event) => {
      this.keys[event.code] = true;
    });
    window.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;
    });
  }

  update(): void {
    // Update game state based on elapsed time
    // const currentTime = Date.now();
    // const deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convert to seconds

    // Modify SVG elements based on game state or other logic
    if (this.keys["Space"] != undefined) {
      this.toggleElement("#circle1", this.keys["Space"]);
    }

    // this.lastFrameTime = currentTime;
  }

  input(): void {
    // Handle user input, update game state based on input
  }

  gameLoop(): void {
    this.update();
    this.input();

    // Repeat the function for the next frame
    requestAnimationFrame(() => this.gameLoop());
  }

  start(): void {
    this.init();
    // this.lastFrameTime = Date.now();
    this.gameLoop();
  }
}

// const svg = document.getElementById('mySVG');
// const rect = document.getElementById('myRect');
// const circle = document.getElementById('myCircle');

// // Game loop
// function gameLoop() {
//   // Modify SVG elements every frame
//   rect.setAttribute('x', Math.random() * 100); // Random x position
//   circle.setAttribute('r', Math.random() * 30); // Random radius

//   // Repeat the function for the next frame
//   requestAnimationFrame(gameLoop);
// }

// // Start the game loop
// gameLoop();
