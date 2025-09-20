// Polynomial Predictor Class (hardcoded with latest model)
class PolynomialPredictor {
  constructor() {
    this.coefficients = [
      0.0525050593192322, 0.022661621848578065, 0.132734119221807,
      0.005516791828984838, -6.246633544858106e-5, 0.040965580112540353,
      -0.002948786521081691, 4.377475989431525e-5, -1.825116838659892e-7,
      -0.00628777461644892, 0.0003717556924429965, -6.947996705417397e-6,
      5.131210676227239e-8, -1.2526608569873865e-10,
    ];
    this.intercept = 5.146036647203765;
  }

  predict(x0, x1) {
    const c = this.coefficients;
    const b = this.intercept;

    // precompute powers
    const x0_2 = x0 * x0;
    const x0_3 = x0_2 * x0;
    const x0_4 = x0_3 * x0;

    const x1_2 = x1 * x1;
    const x1_3 = x1_2 * x1;
    const x1_4 = x1_3 * x1;

    // precompute cross terms
    const x0x1 = x0 * x1;
    const x0_2x1 = x0_2 * x1;
    const x0x1_2 = x0 * x1_2;
    const x0_3x1 = x0_3 * x1;
    const x0_2x1_2 = x0_2 * x1_2;
    const x0x1_3 = x0 * x1_3;

    // return polynomial evaluation
    return (
      b +
      c[0] * x0 +
      c[1] * x1 +
      c[2] * x0_2 +
      c[3] * x0x1 +
      c[4] * x1_2 +
      c[5] * x0_3 +
      c[6] * x0_2x1 +
      c[7] * x0x1_2 +
      c[8] * x1_3 +
      c[9] * x0_4 +
      c[10] * x0_3x1 +
      c[11] * x0_2x1_2 +
      c[12] * x0x1_3 +
      c[13] * x1_4
    );
  }
}

// Game Timer Class
class GameTimer {
  constructor() {
    this.state = {
      gameTime: 0,
      heroLevel: 1,
      isPlaying: true,
      respawnTime: 0,
      deathTime: 0,
      predictor: new PolynomialPredictor(),
    };

    this.timerInterval = null;
    this.initializeElements();
    this.bindEvents();
    this.startTimer();
    this.updateUI();
  }

  initializeElements() {
    this.gameTimeEl = document.getElementById("gameTime");
    this.heroLevelEl = document.getElementById("heroLevel");
    this.respawnTimerEl = document.getElementById("respawnTimer");
    this.timerStatusEl = document.getElementById("timerStatus");
    this.progressFillEl = document.getElementById("progressFill");
    this.toggleTimerBtn = document.getElementById("toggleTimer");
    this.resetTimerBtn = document.getElementById("resetTimer");
    this.increaseLevelBtn = document.getElementById("increaseLevel");
    this.decreaseLevelBtn = document.getElementById("decreaseLevel");
  }

  bindEvents() {
    this.toggleTimerBtn.addEventListener("click", () => this.toggleTimer());
    this.resetTimerBtn.addEventListener("click", () => this.resetTimer());
    this.increaseLevelBtn.addEventListener("click", () => this.increaseLevel());
    this.decreaseLevelBtn.addEventListener("click", () => this.decreaseLevel());

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.state.isPlaying) {
        this.state.gameTime++;
        this.updateRespawnPrediction();
        this.updateUI();
        // this.animateProgressBar();
      }
    }, 1000);
  }

  toggleTimer() {
    this.state.isPlaying = !this.state.isPlaying;
    this.updateTimerStatus();
    this.animateButton(
      this.toggleTimerBtn,
      this.state.isPlaying ? "pause" : "play"
    );
  }

  resetTimer() {
    this.state.gameTime = 0;
    this.state.heroLevel = 1;
    this.state.isPlaying = true;
    this.updateRespawnPrediction();
    this.updateUI();
    this.animateButton(this.resetTimerBtn, "reset");
  }

  increaseLevel() {
    if (this.state.heroLevel < 15) {
      this.state.heroLevel++;
      this.updateRespawnPrediction();
      this.updateUI();
      this.animateButton(this.increaseLevelBtn, "success");
    } else {
      this.animateButton(this.increaseLevelBtn, "error");
    }
  }

  decreaseLevel() {
    if (this.state.heroLevel > 1) {
      this.state.heroLevel--;
      this.updateRespawnPrediction();
      this.updateUI();
      this.animateButton(this.decreaseLevelBtn, "warning");
    } else {
      this.animateButton(this.decreaseLevelBtn, "error");
    }
  }

  updateRespawnPrediction() {
    const totalSecondsDead = this.calculateDeathTime();
    let predictedRespawn = this.state.predictor.predict(
      this.state.heroLevel,
      totalSecondsDead
    );

    // Debug logging
    console.log(
      `Level: ${
        this.state.heroLevel
      }, Death Time: ${totalSecondsDead}s, Raw Prediction: ${predictedRespawn.toFixed(
        2
      )}s`
    );

    // Handle negative predictions - use fallback logic when ML model fails
    if (predictedRespawn < 5) {
      console.warn("ML prediction too low, using fallback logic");
      predictedRespawn = this.getFallbackPrediction(
        this.state.heroLevel,
        totalSecondsDead
      );
    }

    // Ensure respawn time is reasonable - based on game mechanics
    let finalRespawn = Math.max(5, Math.round(predictedRespawn));

    // Additional constraints based on game knowledge
    if (this.state.heroLevel >= 10) {
      // Higher level heroes should have longer respawn times
      finalRespawn = Math.max(
        finalRespawn,
        20 + (this.state.heroLevel - 10) * 2
      );
    }

    // Cap at reasonable maximum (based on data observations)
    finalRespawn = Math.min(finalRespawn, 90);

    this.state.respawnTime = finalRespawn;
  }

  getFallbackPrediction(heroLevel, deathTime) {
    // Smart fallback based on game mechanics
    let respawnTime = 0;

    // Base respawn time based on level
    if (heroLevel <= 5) {
      respawnTime = 8 + heroLevel * 0.5;
    } else if (heroLevel <= 10) {
      respawnTime = 12 + (heroLevel - 5) * 1.2;
    } else {
      respawnTime = 20 + (heroLevel - 10) * 2.5;
    }

    // Adjust based on game time progression (death time)
    const gameTimeFactor = Math.min(1.0, deathTime / 600); // Cap at 10 minutes
    respawnTime *= 1 + gameTimeFactor * 0.5; // Increase up to 50% based on game time

    return Math.max(5, Math.min(90, respawnTime));
  }

  calculateDeathTime() {
    // Calculate time since death based on current respawn time
    // This is a simplified calculation - adjust based on your game logic
    return Math.max(0, this.state.gameTime - this.state.deathTime);
  }

  updateUI() {
    // Update game time display
    const minutes = String(Math.floor(this.state.gameTime / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(this.state.gameTime % 60).padStart(2, "0");
    this.gameTimeEl.textContent = `${minutes}:${seconds}`;

    // Update hero level
    this.heroLevelEl.textContent = this.state.heroLevel;

    // Update respawn timer
    this.respawnTimerEl.textContent = this.state.respawnTime;

    // Update timer status
    this.updateTimerStatus();
  }

  updateTimerStatus() {
    if (this.state.isPlaying) {
      this.timerStatusEl.textContent = "▶ PLAYING";
      this.timerStatusEl.classList.remove("paused");
      this.toggleTimerBtn.textContent = "⏸ PAUSE";
    } else {
      this.timerStatusEl.textContent = "⏸ PAUSED";
      this.timerStatusEl.classList.add("paused");
      this.toggleTimerBtn.textContent = "▶ PLAY";
    }
  }

  animateProgressBar() {
    const progressPercentage = (1 - this.state.respawnTime / 60) * 100;
    this.progressFillEl.style.width = `${Math.max(
      0,
      Math.min(100, progressPercentage)
    )}%`;
  }

  animateButton(button, type) {
    button.classList.add("pulse");

    // Add type-specific styling
    if (type === "success") {
      button.style.backgroundColor = "var(--accent-green)";
      button.style.color = "var(--background-dark)";
    } else if (type === "warning") {
      button.style.backgroundColor = "var(--warning-red)";
      button.style.color = "var(--text-primary)";
    } else if (type === "error") {
      button.classList.add("shake");
    }

    // Remove animation classes after animation completes
    setTimeout(() => {
      button.classList.remove("pulse", "shake");
      button.style.backgroundColor = "";
      button.style.color = "";
    }, 500);
  }

  handleKeyPress(e) {
    switch (true) {
      case e.code === "ArrowRight" || e.key === ">":
        this.increaseLevel();
        break;

      case e.code === "ArrowLeft" || e.key === "<":
        this.decreaseLevel();
        break;

      case e.code === "Space" || e.key === " ":
        e.preventDefault();
        this.toggleTimer();
        break;

      case e.code === "KeyR" || e.key.toLowerCase() === "r":
        this.resetTimer();
        break;
    }
  }
}

// Initialize the game timer when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new GameTimer();
});

// Enhanced fallback predictor with better game mechanics
class FallbackPredictor {
  predict(heroLevel, deathTime) {
    // Based on observed game mechanics and data patterns
    let respawnTime = 0;

    // Base respawn time based on level
    if (heroLevel <= 5) {
      respawnTime = 8 + heroLevel * 0.5;
    } else if (heroLevel <= 10) {
      respawnTime = 12 + (heroLevel - 5) * 1.2;
    } else {
      respawnTime = 20 + (heroLevel - 10) * 2.5;
    }

    // Adjust based on game time progression (death time)
    const gameTimeFactor = Math.min(1.0, deathTime / 600); // Cap at 10 minutes
    respawnTime *= 1 + gameTimeFactor * 0.5; // Increase up to 50% based on game time

    return Math.max(5, Math.min(90, Math.round(respawnTime)));
  }
}

// Error handling and fallback
window.addEventListener("error", (e) => {
  console.error("Game timer error:", e.error);
  console.log("Switching to fallback predictor...");

  if (window.gameTimer) {
    window.gameTimer.state.predictor = new FallbackPredictor();
  }
});

// Also provide manual fallback option for testing
window.enableFallback = function () {
  if (window.gameTimer) {
    console.log("Manually enabling fallback predictor");
    window.gameTimer.state.predictor = new FallbackPredictor();
    window.gameTimer.updateRespawnPrediction();
    window.gameTimer.updateUI();
  }
};

window.enableML = function () {
  if (window.gameTimer) {
    console.log("Manually enabling ML predictor");
    window.gameTimer.state.predictor = new PolynomialPredictor();
    window.gameTimer.updateRespawnPrediction();
    window.gameTimer.updateUI();
  }
};
