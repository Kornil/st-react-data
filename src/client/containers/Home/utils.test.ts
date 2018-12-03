import { findRightData, getPercentage } from "./utils";

it("findRightData returns correct vaue if right params are provided", () => {
  const date = new Date();
  expect(
    findRightData(
      date,
      [{ date, gbps: 123 }, { date: new Date(), gbps: 111 }],
      [{ date, gbps: 345 }, { date: new Date(), gbps: 222 }]
    )
  ).toEqual({
    cdn: { date, gbps: 123 },
    p2p: { date, gbps: 345 }
  });
});

it("findRightData returns null if first value is undefined", () => {
  const date = new Date();
  expect(
    findRightData(undefined, [{ date, gbps: 123 }], [{ date, gbps: 123 }])
  ).toBeNull();
});

it("getPercentage returns right %", () => {
  const a = 100;
  const b = 50;

  expect(getPercentage(a, b)).toBe("50.00");
});

it("getPercentage returns 0.00 for wrong params", () => {
  const a = 0;
  const b = NaN;

  expect(getPercentage(a, b)).toBe("0.00");
});
