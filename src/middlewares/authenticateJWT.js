import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(400).send("Auth header missing");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  try {
    req.token = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};

export default authenticateJWT;
