import { findRightData, getPercentage } from "./utils";

it("findRightData returns null if first value is undefined", () => {
  const date = new Date();
  expect(findRightData(undefined, [{date, gbps: 123}], [{date, gbps: 123}])).toBeNull()
})

it("getPercentage returns right %", () => {
  const a = 100;
  const b = 50;

  expect(getPercentage(a,b)).toBe("50.00");
})