// ---------------- Recursive Version ----------------
class PolynomialPredictorRecursive {
  constructor(modelData) {
    this.degree = modelData.degree;
    this.coefficients = modelData.coefficients;
    this.intercept = modelData.intercept;
  }

  _generatePolynomialFeatures(inputs) {
    const features = [];
    const generate = (current, startIndex, degreeLeft) => {
      if (degreeLeft === 0) {
        let product = 1;
        current.forEach((index) => {
          product *= inputs[index];
        });
        features.push(product);
        return;
      }
      for (let i = startIndex; i < inputs.length; i++) {
        generate([...current, i], i, degreeLeft - 1);
      }
    };

    for (let d = 1; d <= this.degree; d++) {
      generate([], 0, d);
    }

    return features;
  }

  predict(heroLevel, deathTime) {
    const inputs = [heroLevel, deathTime];
    const polyFeatures = this._generatePolynomialFeatures(inputs);

    let result = this.intercept;
    for (let i = 0; i < this.coefficients.length; i++) {
      result += this.coefficients[i] * polyFeatures[i];
    }
    return result;
  }
}

// ---------------- Precomputed Powers Version ----------------
class PolynomialPredictorFast {
  constructor(modelData) {
    this.degree = modelData.degree;
    this.coefficients = modelData.coefficients;
    this.intercept = modelData.intercept;
  }

  _generatePolynomialFeatures([x0, x1]) {
    const x0Powers = Array(this.degree + 1).fill(1);
    const x1Powers = Array(this.degree + 1).fill(1);

    for (let d = 1; d <= this.degree; d++) {
      x0Powers[d] = x0Powers[d - 1] * x0;
      x1Powers[d] = x1Powers[d - 1] * x1;
    }

    const features = [];
    for (let d = 1; d <= this.degree; d++) {
      for (let a = d; a >= 0; a--) {
        const b = d - a;
        features.push(x0Powers[a] * x1Powers[b]);
      }
    }

    return features;
  }

  predict(heroLevel, deathTime) {
    const inputs = [heroLevel, deathTime];
    const polyFeatures = this._generatePolynomialFeatures(inputs);

    let result = this.intercept;
    for (let i = 0; i < this.coefficients.length; i++) {
      result += this.coefficients[i] * polyFeatures[i];
    }
    return result;
  }
}

// ---------------- Hardcoded Degree=4 Version ----------------
class PolynomialPredictorHardcoded {
  constructor(modelData) {
    this.coefficients = modelData.coefficients;
    this.intercept = modelData.intercept;
  }

  predict(x0, x1) {
    const c = this.coefficients;
    const b = this.intercept;

    const x0_2 = x0 * x0;
    const x0_3 = x0_2 * x0;
    const x0_4 = x0_3 * x0;

    const x1_2 = x1 * x1;
    const x1_3 = x1_2 * x1;
    const x1_4 = x1_3 * x1;

    const x0x1 = x0 * x1;
    const x0_2x1 = x0_2 * x1;
    const x0x1_2 = x0 * x1_2;
    const x0_3x1 = x0_3 * x1;
    const x0_2x1_2 = x0_2 * x1_2;
    const x0x1_3 = x0 * x1_3;

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

// ---------------- Compiled Degree=4 Version ----------------
class PolynomialPredictorCompiled {
  constructor(modelData) {
    const c = modelData.coefficients;
    const b = modelData.intercept;

    // Generate a specialized predict function at construction time
    this.predict = function (x0, x1) {
      const x0_2 = x0 * x0;
      const x0_3 = x0_2 * x0;
      const x0_4 = x0_3 * x0;

      const x1_2 = x1 * x1;
      const x1_3 = x1_2 * x1;
      const x1_4 = x1_3 * x1;

      const x0x1 = x0 * x1;
      const x0_2x1 = x0_2 * x1;
      const x0x1_2 = x0 * x1_2;
      const x0_3x1 = x0_3 * x1;
      const x0_2x1_2 = x0_2 * x1_2;
      const x0x1_3 = x0 * x1_3;

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
    };
  }
}

class PolynomialPredictorMaxSpeed {
  constructor() {
    // All constants baked directly; no arrays, no property lookups
    this.predict = function (x0, x1) {
      const b = 5.146036647203765;

      const x0_2 = x0 * x0;
      const x0_3 = x0_2 * x0;
      const x0_4 = x0_3 * x0;

      const x1_2 = x1 * x1;
      const x1_3 = x1_2 * x1;
      const x1_4 = x1_3 * x1;

      const x0x1 = x0 * x1;
      const x0_2x1 = x0_2 * x1;
      const x0x1_2 = x0 * x1_2;
      const x0_3x1 = x0_3 * x1;
      const x0_2x1_2 = x0_2 * x1_2;
      const x0x1_3 = x0 * x1_3;

      return (
        b +
        0.0525050593192322 * x0 +
        0.022661621848578065 * x1 +
        0.132734119221807 * x0_2 +
        0.005516791828984838 * x0x1 +
        -0.00006246633544858106 * x1_2 +
        0.040965580112540353 * x0_3 +
        -0.002948786521081691 * x0_2x1 +
        0.00004377475989431525 * x0x1_2 +
        -0.0000001825116838659892 * x1_3 +
        -0.00628777461644892 * x0_4 +
        0.0003717556924429965 * x0_3x1 +
        -0.000006947996705417397 * x0_2x1_2 +
        0.00000005131210676227239 * x0x1_3 +
        -0.00000000012526608569873865 * x1_4
      );
    };
  }
}

// ---------------- Benchmark Harness ----------------
const model = {
  degree: 4,
  coefficients: [
    0.0525050593192322, 0.022661621848578065, 0.132734119221807,
    0.005516791828984838, -6.246633544858106e-5, 0.040965580112540353,
    -0.002948786521081691, 4.377475989431525e-5, -1.825116838659892e-7,
    -0.00628777461644892, 0.0003717556924429965, -6.947996705417397e-6,
    5.131210676227239e-8, -1.2526608569873865e-10,
  ],
  intercept: 5.146036647203765,
};

const heroLevel = 6;
const deathTime = 221;
const iterations = 1e6;

const predictors = {
  Recursive: new PolynomialPredictorRecursive(model),
  Fast: new PolynomialPredictorFast(model),
  Hardcoded: new PolynomialPredictorHardcoded(model),
  Compiled: new PolynomialPredictorCompiled(model),
  MaxSpeed: new PolynomialPredictorMaxSpeed(),
};

// Warm-up run
for (const name in predictors) {
  predictors[name].predict(heroLevel, deathTime);
}

// Benchmark each
for (const name in predictors) {
  console.time(name);
  const predictor = predictors[name];
  for (let i = 0; i < iterations; i++) {
    predictor.predict(heroLevel, deathTime);
  }
  console.timeEnd(name);
}
