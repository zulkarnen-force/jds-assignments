import request from "supertest";
import { app } from "../../src/application/app";

const supertestApp = request(app);
export default supertestApp;
