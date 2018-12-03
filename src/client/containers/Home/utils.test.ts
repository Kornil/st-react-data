import { getPercentage } from "./utils";

it("returns right %", () => {
  const a = 100;
  const b = 50;

  expect(getPercentage(a,b)).toBe("50.00");
})