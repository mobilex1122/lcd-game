import { Piezo } from "./sound";
export class Game {
  public svg!: SVGSVGElement;
  // private lastFrameTime!: number;
  private gameStartTime: number = 0;
  private keys: { [key: string]: boolean } = {};
  private playernow = "tl";
  // private playerbefore = "tr";
  private isUpdatePaused = false;

  private focus = false;

  private sound = new Piezo();

  private addeggTimeout = 0;
  private lasteggdir = "tl";
  private eggs: { dir: string; state: number; time: number }[] = [];

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
  private toggleElements = (element: string, state: boolean) => {
    const el = this.svg.querySelectorAll(element);
    el.forEach((ele) => {
      if (el) {
        if (state) {
          ele.classList.add("show");
        } else {
          ele.classList.remove("show");
        }
      }
    });
  };

  init(): void {
    window.addEventListener("keydown", (event) => {
      this.keys[event.code] = true;
    });
    window.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;
    });

    window.addEventListener("focus", () => {
      this.focus = true;
    });
    window.addEventListener("blur", () => {
      this.focus = false;
    });
  }

  update(): void {
    // Update game state based on elapsed time
    // const currentTime = Date.now();
    // const deltaTime = currentTime - this.lastFrameTime;

    if (this.addeggTimeout < Date.now()) {
      const directions = ["tl", "tr", "bl", "br"];
      let randomIndex = Math.floor(Math.random() * directions.length);

      while (
        directions[randomIndex] == this.lasteggdir &&
        this.addeggTimeout > Date.now() - 2000
      ) {
        randomIndex = Math.floor(Math.random() * directions.length);
      }
      this.eggs.push({
        dir: directions[randomIndex],
        state: 0,
        time: Date.now(),
      });
      this.lasteggdir = directions[randomIndex];
      this.addeggTimeout = Date.now() + (500 + Math.random() * 4000);
    }
    // Modify SVG elements based on game state or other logic

    if (this.keys["Space"] != undefined) {
      this.toggleElement("#circle1", this.keys["Space"]);
    }
    this.eggs.forEach((egg, i) => {
      if (egg.time < Date.now()) {
        egg.state++;
        egg.time = Date.now() + 1000;
        this.sound.play(300, 0.2);
      }

      if (egg.state > 4) {
        if (egg.dir == this.playernow) {
          this.addpoint();
          this.eggs.splice(i, 1);
        } else {
          this.eggs.splice(i, 1);
          this.broken(egg.dir[1]);
        }
      }
      this.toggleElement(`#egg-${egg.dir}-${egg.state}`, true);
      this.toggleElement(`#egg-${egg.dir}-${egg.state - 1}`, false);
    });

    this.toggleElements(`#player *`, false);
    this.toggleElement(`#player-${this.playernow}`, true);

    // this.lastFrameTime = currentTime;
  }

  broken(side: string) {
    this.toggleElement(`#egg-broken-${side}`, true);
    setTimeout(() => {
      this.toggleElement(`#egg-broken-${side}`, false);
    }, 1000);

    this.isUpdatePaused = true;

    window.setTimeout(() => {
      console.log("rest");

      this.isUpdatePaused = false;
    }, 2000);

    this.addeggTimeout = this.addeggTimeout + 2000;
    this.sound.play(400, 0.2);
  }

  addpoint() {
    console.log("Point!");
    this.addeggTimeout = this.addeggTimeout + 1000;
    this.sound.play(800, 0.2);
    this.isUpdatePaused = true;
    // Resume updates after the specified duration
    window.setTimeout(() => {
      console.log("rest point");
      this.isUpdatePaused = false;
    }, 1000);
  }

  slowUpdate() {}

  input(): void {
    if (this.keys["KeyW"]) {
      this.playernow = "tl";
    } else if (this.keys["KeyS"]) {
      this.playernow = "bl";
    } else if (this.keys["KeyO"]) {
      this.playernow = "tr";
    } else if (this.keys["KeyK"]) {
      this.playernow = "br";
    }
  }

  gameLoop(): void {
    if (!this.isUpdatePaused) {
      this.update();
    }
    this.input();

    // Repeat the function for the next frame
    requestAnimationFrame(() => this.gameLoop());
  }

  start(): void {
    this.init();
    // this.lastFrameTime = Date.now();
    this.gameStartTime = Date.now();
    console.log(this.gameStartTime);
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
