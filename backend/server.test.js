const request = require("supertest");
const express = require("express");
const axios = require("axios");
const app = require("./server"); // adjust if needed

jest.mock("axios");

describe("NASA API Routes", () => {
  describe("GET /api/apod", () => {
    it("should return APOD data", async () => {
      const mockData = { title: "Mock Title", url: "http://example.com" };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const res = await request(app).get("/api/apod");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });
    it("GET /api/apod returns error on failure", async () => {
      axios.get.mockRejectedValueOnce(new Error("Network Error"));
      const response = await request(app).get("/api/apod");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch APOD data" });
    });
  });

  describe("GET /api/apod/range", () => {
    it("should require start and end dates", async () => {
      const res = await request(app).get("/api/apod/range");
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Start and end dates are required");
    });

    it("should return APOD data for range", async () => {
      const mockData = [{ date: "2024-01-01", title: "APOD 1" }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const res = await request(app)
        .get("/api/apod/range")
        .query({ start: "2024-01-01", end: "2024-01-02" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });
    it("GET /api/apod/range returns error if start or end date is missing", async () => {
      const response = await request(app).get("/api/apod/range");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Start and end dates are required",
      });
    });
  });

  describe("GET /api/DONKI/IPS", () => {
    it("should return IPS data", async () => {
      const mockData = [{ activityID: "2024-IPS-001" }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const res = await request(app)
        .get("/api/DONKI/IPS")
        .query({ startDate: "2024-01-01", endDate: "2024-01-05" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });

    it("GET /api/DONKI/IPS returns error if start or end date is missing", async () => {
      const response = await request(app).get("/api/DONKI/IPS");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Start and end dates are required",
      });
    });
  });
  describe("GET /api/DONKI/SEP", () => {
    it("GET /api/DONKI/SEP returns SEP data", async () => {
      const mockData = [{ event: "SEP Event 1" }];
      axios.get.mockResolvedValueOnce({ data: mockData });
      const response = await request(app).get(
        "/api/DONKI/SEP?startDate=2023-01-01&endDate=2023-01-02"
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });
    it("GET /api/DONKI/SEP returns error if start or end date is missing", async () => {
      const response = await request(app).get("/api/DONKI/SEP");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Start and end dates are required",
      });
    });
  });
  describe("GET /api/asteroidList", () => {
    it("should return asteroid list", async () => {
      const mockData = { near_earth_objects: {} };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const res = await request(app)
        .get("/api/asteroidList")
        .query({ start_date: "2024-01-01", end_date: "2024-01-02" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });
    it("GET /api/asteroidList returns error on failure", async () => {
      axios.get.mockRejectedValueOnce(new Error("Network Error"));
      const response = await request(app)
        .get("/api/asteroidList")
        .query({ start_date: "2024-01-01", end_date: "2024-01-02" });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch Asteroid Data" });
    });
  });

  describe("GET /api/asteroid:id", () => {
    it("should return asteroid details", async () => {
      const mockData = { name: "Asteroid X" };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const res = await request(app).get("/api/asteroid/12345");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
    });

    it("should return 404 if asteroid not found", async () => {
      axios.get.mockRejectedValueOnce({
        response: { status: 404 },
      });

      const res = await request(app).get("/api/asteroid/99999");
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Asteroid not found.");
    });

    it("GET /api/asteroid/:id returns error on failure", async () => {
      axios.get.mockRejectedValueOnce(new Error("Network Error"));
      const response = await request(app).get("/api/asteroid/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to fetch asteroid data.",
      });
    });
  });
});
