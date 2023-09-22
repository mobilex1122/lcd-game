import "./style.css";
// import lcdImg from './lcd1.svg'
import { Game } from "./game/game";

fetch("./lcd.svg")
  .then((response) => response.text())
  .then((svgContent) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg") as SVGSVGElement;
    document.getElementById("game")?.appendChild(svgElement);

    const game = new Game();
    game.svg = svgElement;
    setTimeout(() => {
      game.start();
    }, 2000);
  })
  .catch((error) => console.error("Error loading SVG:", error));
