import supertest from "supertest";
import app from '../../index';

const request = supertest(app);

describe('GET /api/listImages', (): void => {

    it("Success response with 200", async () => {
        const response = await request.get("/api/listImages");
        expect(response.status).toBe(200);
    });
});
