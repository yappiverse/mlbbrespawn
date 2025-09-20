// Include the PolynomialPredictor class from script.js
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

// Test script to validate ML predictions vs expected values
console.log("=== MLBB Respawn Timer Prediction Test ===");

// Test cases based on actual game data
const testCases = [
  { level: 3, deathTime: 88, expected: 9 },
  { level: 15, deathTime: 912, expected: 44 },
  { level: 15, deathTime: 1011, expected: 45 },
  { level: 15, deathTime: 1660, expected: 76 },
  { level: 15, deathTime: 1776, expected: 79 },
  { level: 2, deathTime: 70, expected: 8 },
  { level: 10, deathTime: 510, expected: 28 },
  { level: 12, deathTime: 902, expected: 40 },
];

// Create predictor instance
const predictor = new PolynomialPredictor();

console.log("Testing ML predictions:");
console.log("Level | DeathTime | Predicted | Expected | Difference");
console.log("------|-----------|-----------|----------|-----------");

testCases.forEach((testCase) => {
  const predicted = predictor.predict(testCase.level, testCase.deathTime);
  const roundedPredicted = Math.round(predicted);
  const difference = Math.abs(roundedPredicted - testCase.expected);

  console.log(
    `${testCase.level.toString().padEnd(4)} | ${testCase.deathTime
      .toString()
      .padEnd(9)} | ${roundedPredicted
      .toString()
      .padEnd(9)} | ${testCase.expected.toString().padEnd(8)} | ${difference}`
  );
});

// Test edge cases
console.log("\n=== Edge Case Testing ===");
console.log("Testing level 15 with various death times:");

const edgeCases = [
  { level: 15, deathTime: 30 }, // Very early game
  { level: 15, deathTime: 300 }, // Mid game
  { level: 15, deathTime: 900 }, // Late game
  { level: 15, deathTime: 1800 }, // Very late game
];

edgeCases.forEach((testCase) => {
  const predicted = predictor.predict(testCase.level, testCase.deathTime);
  console.log(
    `Level ${testCase.level}, Death ${testCase.deathTime}s: ${predicted.toFixed(
      2
    )}s (rounded: ${Math.round(predicted)}s)`
  );
});

// Test fallback predictor
console.log("\n=== Fallback Predictor Test ===");
const fallback = new FallbackPredictor();

edgeCases.forEach((testCase) => {
  const predicted = fallback.predict(testCase.level, testCase.deathTime);
  console.log(
    `Fallback - Level ${testCase.level}, Death ${testCase.deathTime}s: ${predicted}s`
  );
});
