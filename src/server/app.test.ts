import request from "supertest";

import app from "./app";

describe("Test server paths", () => {
  it("GET on / path", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("GET on /bandwidth", async () => {
    const response = await request(app).get("/bandwidth");
    expect(response.header["content-type"]).toMatch(/json/);
  });

  it("GET on /audience", async () => {
    const response = await request(app).get("/audience");
    expect(response.header["content-type"]).toMatch(/json/);
  })
});