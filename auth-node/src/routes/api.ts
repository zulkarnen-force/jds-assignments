import express from "express";
import v1 from "./../versions/v1";

export const router = express.Router();

router.use("/v1/", v1);

export default router;
