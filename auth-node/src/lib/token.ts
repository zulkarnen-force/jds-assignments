import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
const privateKeyPath = path.join(__dirname, "oauth-private.key");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

export const verifyJwt = <T>(
  token: string,
  keyName?: "ACCESS_TOKEN_PUBLIC_KEY" | "REFRESH_TOKEN_PUBLIC_KEY"
): T | null => {
  try {
    const publicKey = Buffer.from(privateKey, "base64").toString("ascii");
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
