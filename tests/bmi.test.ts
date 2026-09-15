describe("BMI", () => {
  it("should calculate BMI correctly", () => {
    const weight = 81.5;
    const height = 180;

    const bmi = weight / ((height / 100) ** 2);

    expect(bmi).toBeCloseTo(25.15, 1);
  });
});
