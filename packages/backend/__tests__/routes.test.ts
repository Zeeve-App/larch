import request from 'supertest';
import app from '../src/server'
// import app from '../src/index.js'


// router.use(healthRoute);
// test("should return a string initially", async () => {
//           await request(app).get("http://localhost:9999/healthz")
//           .expect(200)
//           // .expect(res.body).toEqual('{"message":"success from health api"}');
//         });

describe("GET /", () => {
    it("should return a string initially", async () => {
      const res = await request(app).get("/");
      console.log(res)
      expect(res.statusCode).toEqual(201);
    //   expect(res.body).toEqual('{"message":"success from health api"}');
    });
  });

