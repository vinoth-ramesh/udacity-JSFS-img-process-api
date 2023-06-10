import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("GET /", () => {
    it("Success response with 200", async () => {
        const response = await request.get("/");
        expect(response.status).toBe(200);
    });
});