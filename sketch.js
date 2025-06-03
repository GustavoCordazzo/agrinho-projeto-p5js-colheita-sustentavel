let plant;
let stage = "selectSeed"; // Fases: selectSeed, planting, growing, harvested
let water = 0;
let growth = 0;
let maxGrowth = 100;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  plant = null;
}

function draw() {
  background(200, 255, 200); // cor do fundo (gramado)

  if (stage === "selectSeed") {
    fill(0);
    textSize(24);
    text("Escolha uma semente para plantar", width / 2, height / 2 - 40);
    drawSeedButtons();
  } else if (stage === "planting") {
    drawGarden();
    fill(0);
    textSize(16);
    text("Clique para plantar a semente", width / 2, 30);
  } else if (stage === "growing") {
    drawGarden();
    drawPlant();

    fill(0);
    text("Clique para regar a planta", width / 2, 30);

    // crescimento da planta baseado na água
    if (water > 0) {
      growth += 0.3;
      water -= 0.1;
    }

    // planta pronta para colheita
    if (growth >= maxGrowth) {
      stage = "harvested";
    }
  } else if (stage === "harvested") {
    drawGarden();
    drawPlant();
    fill(0, 100, 0);
    textSize(20);
    text("Parabéns! Você colheu com sucesso!", width / 2, 30);
  }

  drawUI();
}

function mousePressed() { 
// acontece algo se pressionar o mouse
  if (stage === "selectSeed") {
    if (mouseX > 150 && mouseX < 250 && mouseY > 250 && mouseY < 290) {
      plant = { type: "alface", x: width / 2, y: height / 2 };
      stage = "planting";
    }
    if (mouseX > 350 && mouseX < 450 && mouseY > 250 && mouseY < 290) {
      plant = { type: "cenoura", x: width / 2, y: height / 2 };
      stage = "planting";
    }
  } else if (stage === "planting") {
    if (plant) {
      stage = "growing";
    }
  } else if (stage === "growing") {
    water += 10; // cada clique adiciona água
  }
}

function drawSeedButtons() {
  fill(100, 200, 100);
  rect(150, 250, 100, 40);
  fill(0);
  text("Alface", 200, 270);

  fill(255, 165, 0);
  rect(350, 250, 100, 40);
  fill(0);
  text("Cenoura", 400, 270);
}

function drawGarden() {
  fill(139, 69, 19);
  rect(width / 2 - 50, height / 2, 100, 50); // canteiro de terra
}

function drawPlant() {
  if (!plant) return;

  let growHeight = map(growth, 0, maxGrowth, 0, 80);

  if (plant.type === "alface") {
    fill(0, 200, 0);
    ellipse(plant.x, plant.y - growHeight, 40, 40);
// cria o alface no cenario
  } else if (plant.type === "cenoura") {
    fill(255, 140, 0);
    ellipse(plant.x, plant.y - growHeight, 20, 60);
    fill(0, 150, 0);
    triangle(plant.x - 10, plant.y - growHeight - 30, plant.x + 10, plant.y - growHeight - 30, plant.x, plant.y - growHeight - 10);
// cria a cenoura no cenario
  }
}

function drawUI() {
  if (stage === "growing") {
    fill(0);
    textSize(14);
    text("Água: " + nf(water, 1, 1), 70, height - 20);
    text("Crescimento: " + int(growth) + "%", 200, height - 20);
  }
}
