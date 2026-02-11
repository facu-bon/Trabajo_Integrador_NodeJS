import ENVIRONMENT from "../config/environment.js";
import jwt from "jsonwebtoken";

function authorizationMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: 'No se proporcionó un token de autenticación'
      })
    }
    const authToken = authHeader.split(' ')[1];
    if (!authToken) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: 'Token de autenticación no válido',
      });
    }

    const payload = jwt.verify(authToken, ENVIRONMENT.JWT_SECRET);
    req.user = payload;
    next();
  }
  catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error en el middleware de autorización',
      error: error.message
    })
  }
}

export default authorizationMiddleware;