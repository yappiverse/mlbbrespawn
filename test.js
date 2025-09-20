class PolynomialPredictor {
  constructor(modelData) {
    this.coefficients = modelData.coefficients;
    this.intercept = modelData.intercept;
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

// Example usage
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

const predictor = new PolynomialPredictor(model);
console.log(predictor.predict(6, 221));
