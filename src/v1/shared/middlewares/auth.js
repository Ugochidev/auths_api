import JwtClient from "../services/jwtClient";
import AppError from "../utils/appError";

const auth = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    throw new AppError("No token provided", 401);
  }

  token = token.replace("Bearer ", "");

  const user = JwtClient.verifyAccessToken(token);
  req.user = user.id;
  next();
};

export default auth;
