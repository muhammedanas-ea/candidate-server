import jwt from "jsonwebtoken";
import ENV from "../utils/lib/env.config.js";

export default function verifyJwt(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  console.log("req.cookies.jwt", req.cookies);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, ENV.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(err, decoded);
    if (err) return res.sendStatus(403);
    const payload = decoded;
    req.userId = payload.userId;
    req.role = payload.role;
    next();
  });
}
